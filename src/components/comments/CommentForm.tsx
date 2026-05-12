'use client';

import { useActionState, useEffect, useRef } from 'react';
import { submitCommentAction } from '@/lib/actions/comments';
import { initialSubmitCommentActionState } from '@/lib/comments/commentState';
import { MAX_COMMENT_AUTHOR_NAME_LENGTH, MAX_COMMENT_BODY_LENGTH } from '@/lib/validators/comment';

type CommentFormProps = {
  postId: string;
};

export function CommentForm({ postId }: CommentFormProps) {
  const [state, formAction, isPending] = useActionState(submitCommentAction, {
    ...initialSubmitCommentActionState,
    values: {
      ...initialSubmitCommentActionState.values,
      postId,
    },
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="mt-5 rounded-[28px] border border-orange-100/80 bg-gradient-to-br from-orange-50/80 to-rose-50/50 p-5 shadow-inner shadow-orange-100/50 sm:p-6">
      <input type="hidden" name="postId" value={postId} />

      {state.message ? (
        <div
          className={`mb-4 rounded-[22px] border px-4 py-3 text-sm font-black shadow-sm ${
            state.status === 'success'
              ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
              : 'border-rose-100 bg-rose-50 text-rose-600'
          }`}
          role="status"
        >
          {state.message}
        </div>
      ) : null}

      {state.fieldErrors?.postId ? <p className="mb-3 text-sm font-bold text-rose-500">{state.fieldErrors.postId}</p> : null}

      <label className="block">
        <span className="text-sm font-black text-slate-700">コメント</span>
        <textarea
          name="body"
          defaultValue={state.values.body}
          maxLength={MAX_COMMENT_BODY_LENGTH}
          className="mt-2 h-32 w-full resize-none rounded-2xl border border-orange-100 bg-white/95 p-4 text-sm font-bold leading-7 text-slate-700 outline-none ring-orange-200 placeholder:text-slate-300 focus:border-orange-200 focus:ring-2"
          placeholder="このあるある、わかる！など気軽にコメントできます"
          disabled={isPending}
          required
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-400">
          <span>1〜{MAX_COMMENT_BODY_LENGTH}文字で入力してください。</span>
          {state.fieldErrors?.body ? <span className="text-rose-500">{state.fieldErrors.body}</span> : null}
        </div>
      </label>

      <label className="mt-4 block">
        <span className="text-sm font-black text-slate-700">お名前</span>
        <input
          name="authorName"
          defaultValue={state.values.authorName}
          maxLength={MAX_COMMENT_AUTHOR_NAME_LENGTH}
          className="mt-2 w-full rounded-2xl border border-orange-100 bg-white/95 px-4 py-3 text-sm font-bold text-slate-700 outline-none ring-orange-200 placeholder:text-slate-300 focus:border-orange-200 focus:ring-2"
          placeholder="匿名さん"
          disabled={isPending}
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-400">
          <span>未入力の場合は「匿名さん」で投稿されます。</span>
          {state.fieldErrors?.authorName ? <span className="text-rose-500">{state.fieldErrors.authorName}</span> : null}
        </div>
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="mt-5 w-full rounded-full bg-gradient-to-r from-orange-400 to-rose-400 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-300/35 hover:-translate-y-0.5 hover:shadow-orange-300/55 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
      >
        {isPending ? '投稿中...' : 'コメントを投稿する'}
      </button>
    </form>
  );
}
