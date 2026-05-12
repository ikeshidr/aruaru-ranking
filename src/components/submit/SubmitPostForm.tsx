'use client';

import { useActionState, useEffect, useRef } from 'react';
import { submitPostAction } from '@/lib/actions/posts';
import { initialSubmitPostActionState } from '@/lib/submit/submitPostState';
import { MAX_POST_AUTHOR_NAME_LENGTH, MAX_POST_BODY_LENGTH, MIN_POST_BODY_LENGTH } from '@/lib/validators/post';

type SubmitPostFormProps = {
  categories: Array<{
    id: string;
    title: string;
    group_name: string;
  }>;
};

const emptyValues = {
  categoryId: '',
  body: '',
  authorName: '',
};

export function SubmitPostForm({ categories }: SubmitPostFormProps) {
  const [state, formAction, isPending] = useActionState(submitPostAction, initialSubmitPostActionState);
  const formRef = useRef<HTMLFormElement>(null);
  const values = state.values ?? emptyValues;

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      {state.message ? (
        <div
          className={`rounded-[24px] border px-5 py-4 text-sm font-black shadow-sm ${
            state.status === 'success'
              ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
              : 'border-rose-100 bg-rose-50 text-rose-600'
          }`}
          role="status"
        >
          {state.message}
        </div>
      ) : null}

      <label className="block rounded-[24px] bg-orange-50/45 p-4 ring-1 ring-orange-100/70">
        <span className="text-sm font-black text-slate-700">カテゴリー</span>
        <select
          name="categoryId"
          defaultValue={values.categoryId}
          className="mt-2 w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 font-bold text-slate-700 shadow-sm outline-none ring-orange-200 focus:border-orange-200 focus:ring-2"
          disabled={isPending}
          required
        >
          <option value="">カテゴリーを選択</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.group_name} / {category.title}
            </option>
          ))}
        </select>
        {state.fieldErrors?.categoryId ? (
          <p className="mt-2 text-sm font-bold text-rose-500">{state.fieldErrors.categoryId}</p>
        ) : null}
      </label>

      <label className="block rounded-[24px] bg-orange-50/45 p-4 ring-1 ring-orange-100/70">
        <span className="text-sm font-black text-slate-700">あるある本文</span>
        <textarea
          name="body"
          defaultValue={values.body}
          minLength={MIN_POST_BODY_LENGTH}
          maxLength={MAX_POST_BODY_LENGTH}
          className="mt-2 h-44 w-full resize-none rounded-2xl border border-orange-100 bg-white px-4 py-3 font-bold leading-7 text-slate-700 shadow-sm outline-none ring-orange-200 placeholder:text-slate-300 focus:border-orange-200 focus:ring-2"
          placeholder="例：休憩に入った瞬間だけ急に忙しくなる"
          disabled={isPending}
          required
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-400">
          <span>
            {MIN_POST_BODY_LENGTH}〜{MAX_POST_BODY_LENGTH}文字で入力してください。
          </span>
          {state.fieldErrors?.body ? <span className="text-rose-500">{state.fieldErrors.body}</span> : null}
        </div>
      </label>

      <label className="block rounded-[24px] bg-orange-50/45 p-4 ring-1 ring-orange-100/70">
        <span className="text-sm font-black text-slate-700">投稿者名</span>
        <input
          name="authorName"
          defaultValue={values.authorName}
          maxLength={MAX_POST_AUTHOR_NAME_LENGTH}
          className="mt-2 w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 font-bold text-slate-700 shadow-sm outline-none ring-orange-200 placeholder:text-slate-300 focus:border-orange-200 focus:ring-2"
          placeholder="匿名さん"
          disabled={isPending}
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-400">
          <span>未入力の場合は「匿名さん」で投稿されます。</span>
          {state.fieldErrors?.authorName ? <span className="text-rose-500">{state.fieldErrors.authorName}</span> : null}
        </div>
      </label>

      <div className="rounded-[24px] border border-orange-100 bg-gradient-to-r from-orange-50 to-rose-50 px-5 py-4 text-sm font-bold leading-7 text-orange-700 shadow-sm">
        投稿はすぐには公開されません。管理者確認後、問題がなければランキングやカテゴリー画面に表示されます。
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-gradient-to-r from-orange-400 to-rose-400 px-7 py-4 text-sm font-black text-white shadow-lg shadow-orange-300/40 hover:-translate-y-0.5 hover:shadow-orange-300/60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
      >
        {isPending ? '投稿中...' : '承認待ちとして投稿する'}
      </button>
    </form>
  );
}
