'use client';

import { useActionState, useState } from 'react';
import { reportPostAction } from '@/lib/actions/reports';
import { initialReportPostActionState } from '@/lib/reports/reportPostState';

const REASONS = [
  { value: 'spam', label: 'スパム・宣伝' },
  { value: 'abuse', label: '誹謗中傷・差別的表現' },
  { value: 'personal_info', label: '個人情報が含まれている' },
  { value: 'other', label: 'その他' },
] as const;

type ReportPostButtonProps = {
  postId: string;
};

export function ReportPostButton({ postId }: ReportPostButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    reportPostAction,
    initialReportPostActionState,
  );

  if (state.status === 'success') {
    return (
      <p className="text-center text-xs font-bold text-slate-400">{state.message}</p>
    );
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-xs font-bold text-slate-400 hover:text-rose-400"
      >
        通報する
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-sm font-black text-slate-700">通報理由を選択してください</p>
      <form action={formAction} className="mt-3 space-y-3">
        <input type="hidden" name="postId" value={postId} />
        <div className="space-y-2">
          {REASONS.map((reason) => (
            <label key={reason.value} className="flex cursor-pointer items-center gap-2 text-sm font-bold text-slate-600">
              <input
                type="radio"
                name="reason"
                value={reason.value}
                className="accent-orange-500"
                required
              />
              {reason.label}
            </label>
          ))}
        </div>

        {state.status === 'error' && (
          <p className="text-xs font-bold text-rose-500" role="alert">{state.message}</p>
        )}

        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-rose-500 px-4 py-2 text-xs font-black text-white hover:bg-rose-600 disabled:opacity-60"
          >
            {isPending ? '送信中...' : '送信する'}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-black text-slate-500 hover:bg-slate-100"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}
