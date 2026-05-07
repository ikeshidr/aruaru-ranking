'use server';

import { revalidatePath } from 'next/cache';
import type { VotePostActionState } from '@/lib/voting/votePostState';
import { createClient } from '@/lib/supabase/server';
import { getOrCreateVisitorId } from '@/lib/visitor/visitor-id';

const GENERIC_VOTE_ERROR_MESSAGE = '投票に失敗しました。時間をおいて再度お試しください。';
const ALREADY_VOTED_MESSAGE = 'この投稿にはすでに「わかる！」しています。';
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type VotePostRpcResult = {
  vote_count: number;
  already_voted: boolean;
};

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

function isDuplicateVoteError(error: { code?: string; message?: string }) {
  return error.code === '23505' || /duplicate|unique/i.test(error.message ?? '');
}

export async function votePostAction(
  _previousState: VotePostActionState,
  formData: FormData,
): Promise<VotePostActionState> {
  const postId = getFormValue(formData, 'postId');

  if (!UUID_PATTERN.test(postId)) {
    return {
      status: 'error',
      message: '投票対象の投稿が見つかりません。',
      voteCount: null,
    };
  }

  const visitorId = await getOrCreateVisitorId();
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('vote_post', {
    p_post_id: postId,
    p_visitor_id: visitorId,
  });

  if (error) {
    console.error('Failed to vote post through RPC', error);

    return {
      status: 'error',
      message: isDuplicateVoteError(error) ? ALREADY_VOTED_MESSAGE : GENERIC_VOTE_ERROR_MESSAGE,
      voteCount: null,
    };
  }

  const result = Array.isArray(data) ? (data[0] as VotePostRpcResult | undefined) : undefined;

  revalidatePath(`/posts/${postId}`);
  revalidatePath('/ranking');

  if (result?.already_voted) {
    return {
      status: 'error',
      message: ALREADY_VOTED_MESSAGE,
      voteCount: result.vote_count,
    };
  }

  return {
    status: 'success',
    message: '「わかる！」しました。',
    voteCount: result?.vote_count ?? null,
  };
}
