type WideAdProps = {
  label?: string;
  className?: string;
  variant?: 'wide' | 'vertical';
};

export function WideAd({ label = '広告枠', className = '', variant = 'wide' }: WideAdProps) {
  if (variant === 'vertical') {
    return (
      <div
        className={`grid min-h-[360px] place-items-center rounded-[20px] border border-slate-100 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 text-center shadow-sm ${className}`}
      >
        <div>
          <p className="text-lg font-black text-slate-500">{label}</p>
          <p className="mt-2 text-sm font-bold text-slate-400">300×600 placeholder</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 p-5 text-center shadow-sm ${className}`}>
      <p className="text-base font-black text-slate-500">{label}</p>
      <p className="mt-1 text-xs font-bold text-slate-400">970×90 placeholder</p>
    </div>
  );
}
