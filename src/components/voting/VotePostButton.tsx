'use client';

import { useActionState } from 'react';
import { votePostAction } from '@/lib/actions/voting';
import { initialVotePostActionState } from '@/lib/voting/votePostState';
import { formatNumber } from '@/lib/utils/format';

type VotePostButtonProps = {
  postId: string;
  voteCount: number;
};

export function VotePostButton({ postId, voteCount }: VotePostButtonProps) {
  const [state, formAction, isPending] = useActionState(votePostAction, initialVotePostActionState);
  const displayedVoteCount = state.voteCount ?? voteCount;

  return (
    <form action={formAction} className="w-full space-y-2">
      <input type="hidden" name="postId" value={postId} />
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 px-5 py-4 text-center font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-wait disabled:opacity-70"
      >
        {isPending ? '投票中…' : `わかる！ ${formatNumber(displayedVoteCount)}`}
      </button>
      {state.message ? (
        <p
          className={`text-center text-xs font-bold ${state.status === 'success' ? 'text-orange-600' : 'text-slate-500'}`}
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
