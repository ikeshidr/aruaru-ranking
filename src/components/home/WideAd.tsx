type WideAdProps = {
  label?: string;
  className?: string;
  variant?: 'wide' | 'vertical';
};

export function WideAd({ label = '広告枠', className = '', variant = 'wide' }: WideAdProps) {
  if (variant === 'vertical') {
    return (
      <div
        className={`relative grid min-h-[470px] overflow-hidden rounded-[24px] border border-orange-100 bg-[radial-gradient(circle_at_22%_42%,rgba(253,186,116,0.34)_0,transparent_25%),linear-gradient(145deg,#fff7ed_0%,#fff_52%,#ffedd5_100%)] p-6 text-center shadow-sm ${className}`}
      >
        <div className="absolute right-5 top-5 rounded-full bg-white/75 px-3 py-1 text-xs font-black text-slate-400">広告</div>
        <div className="m-auto max-w-[220px]">
          <p className="text-2xl font-black leading-9 text-slate-950">あなたの「働きたい」を応援します！</p>
          <p className="mt-4 text-sm font-bold leading-6 text-slate-600">サイドバー広告枠</p>
          <div className="mt-7 rounded-2xl bg-white/80 p-4 text-left text-sm font-black text-slate-600 shadow-sm">
            <p>✓ 自然に見える広告枠</p>
            <p className="mt-3">✓ 300×600 placeholder</p>
          </div>
        </div>
        <div className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-200">{label}</div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-orange-100 bg-[linear-gradient(105deg,#eff6ff_0%,#fff7ed_48%,#fff1f2_100%)] p-5 shadow-sm ${className}`}
    >
      <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-black text-slate-400">スポンサー</span>
          <div>
            <p className="text-lg font-black text-slate-800">{label}</p>
            <p className="mt-1 text-xs font-bold text-slate-500">970×90 placeholder</p>
          </div>
        </div>
        <span className="rounded-full bg-sky-500 px-5 py-2 text-xs font-black text-white shadow-sm">詳しくはこちら</span>
      </div>
    </div>
  );
}
