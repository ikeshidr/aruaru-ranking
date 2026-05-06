'use server';

import { revalidatePath } from 'next/cache';
import type { SubmitCommentActionState } from '@/lib/comments/commentState';
import { createClient } from '@/lib/supabase/server';
import { getOrCreateVisitorId } from '@/lib/visitor/visitor-id';
import { validateSubmitComment } from '@/lib/validators/comment';

const GENERIC_COMMENT_ERROR_MESSAGE = 'コメント投稿に失敗しました。時間をおいて再度お試しください。';

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

export async function submitCommentAction(
  _previousState: SubmitCommentActionState,
  formData: FormData,
): Promise<SubmitCommentActionState> {
  const validation = validateSubmitComment({
    postId: getFormValue(formData, 'postId'),
    body: getFormValue(formData, 'body'),
    authorName: getFormValue(formData, 'authorName'),
  });

  if (!validation.success) {
    return {
      status: 'error',
      message: '入力内容を確認してください。',
      fieldErrors: validation.fieldErrors,
      values: validation.values,
    };
  }

  const supabase = await createClient();

  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('id')
    .eq('id', validation.data.postId)
    .eq('status', 'approved')
    .is('deleted_at', null)
    .maybeSingle();

  if (postError) {
    console.error('Failed to verify comment target post', postError);

    return {
      status: 'error',
      message: GENERIC_COMMENT_ERROR_MESSAGE,
      fieldErrors: {},
      values: validation.data,
    };
  }

  if (!post) {
    return {
      status: 'error',
      message: 'コメント対象の投稿が見つかりません。',
      fieldErrors: {
        postId: '公開中の投稿にのみコメントできます。',
      },
      values: validation.data,
    };
  }

  const visitorId = await getOrCreateVisitorId();

  const { error: insertError } = await supabase.from('comments').insert({
    post_id: validation.data.postId,
    body: validation.data.body,
    author_name: validation.data.authorName,
    visitor_id: visitorId,
  });

  if (insertError) {
    console.error('Failed to insert public comment', insertError);

    return {
      status: 'error',
      message: GENERIC_COMMENT_ERROR_MESSAGE,
      fieldErrors: {},
      values: validation.data,
    };
  }

  revalidatePath(`/posts/${validation.data.postId}`);

  return {
    status: 'success',
    message: 'コメントを投稿しました。',
    fieldErrors: {},
    values: {
      postId: validation.data.postId,
      body: '',
      authorName: '',
    },
  };
}
