'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { getOrCreateVisitorId } from '@/lib/visitor/visitor-id';
import { DEFAULT_AUTHOR_NAME, type SubmitPostFieldErrors, validateSubmitPost } from '@/lib/validators/post';

export type SubmitPostActionState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  fieldErrors: SubmitPostFieldErrors;
  values: {
    categoryId: string;
    body: string;
    authorName: string;
  };
};

export const initialSubmitPostActionState: SubmitPostActionState = {
  status: 'idle',
  message: '',
  fieldErrors: {},
  values: {
    categoryId: '',
    body: '',
    authorName: '',
  },
};

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

export async function submitPostAction(
  _previousState: SubmitPostActionState,
  formData: FormData,
): Promise<SubmitPostActionState> {
  const validation = validateSubmitPost({
    categoryId: getFormValue(formData, 'categoryId'),
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

  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('id')
    .eq('id', validation.data.categoryId)
    .eq('is_active', true)
    .maybeSingle();

  if (categoryError) {
    return {
      status: 'error',
      message: `カテゴリー確認に失敗しました: ${categoryError.message}`,
      fieldErrors: {},
      values: validation.data,
    };
  }

  if (!category) {
    return {
      status: 'error',
      message: '選択したカテゴリーが見つかりません。',
      fieldErrors: {
        categoryId: '有効なカテゴリーを選択してください。',
      },
      values: validation.data,
    };
  }

  const visitorId = await getOrCreateVisitorId();

  const { error: insertError } = await supabase.from('posts').insert({
    category_id: validation.data.categoryId,
    body: validation.data.body,
    author_name: validation.data.authorName || DEFAULT_AUTHOR_NAME,
    tags: [],
    visitor_id: visitorId,
  });

  if (insertError) {
    return {
      status: 'error',
      message: `投稿に失敗しました: ${insertError.message}`,
      fieldErrors: {},
      values: validation.data,
    };
  }

  revalidatePath('/submit');

  return {
    status: 'success',
    message: '投稿を受け付けました。管理者確認後に公開されます。',
    fieldErrors: {},
    values: {
      categoryId: '',
      body: '',
      authorName: '',
    },
  };
}
