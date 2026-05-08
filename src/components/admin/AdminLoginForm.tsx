'use client';

import { useActionState } from 'react';
import { adminLoginAction } from '@/lib/actions/admin';
import { initialAdminLoginActionState } from '@/lib/admin/adminActionState';

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(adminLoginAction, initialAdminLoginActionState);

  return (
    <form action={formAction} className="space-y-5">
      {state.message ? (
        <div className="rounded-[24px] border border-rose-100 bg-rose-50 px-5 py-4 text-sm font-black text-rose-600" role="status">
          {state.message}
        </div>
      ) : null}

      <label className="block">
        <span className="text-sm font-black text-slate-700">メールアドレス</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={state.values.email}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700 outline-none ring-orange-200 placeholder:text-slate-300 focus:ring-2"
          placeholder="admin@example.com"
          disabled={isPending}
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-black text-slate-700">パスワード</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700 outline-none ring-orange-200 placeholder:text-slate-300 focus:ring-2"
          placeholder="パスワード"
          disabled={isPending}
          required
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-gradient-to-r from-orange-400 to-rose-400 px-6 py-4 text-sm font-black text-white shadow-md shadow-orange-500/20 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'ログイン中...' : '管理画面にログイン'}
      </button>
    </form>
  );
}
