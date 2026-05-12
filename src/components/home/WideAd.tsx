type WideAdProps = {
  label?: string;
  size?: string;
  className?: string;
};

export function WideAd({ label = '広告バナー', size = '970×90', className = '' }: WideAdProps) {
  return (
    <div
      className={`grid min-h-[72px] place-items-center rounded-2xl border border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-100 px-5 py-4 text-center text-slate-500 shadow-inner ${className}`}
      aria-label={`${label} ${size}`}
    >
      <p className="text-sm font-black tracking-wide">
        {label} <span className="text-slate-400">（{size}）</span>
      </p>
    </div>
  );
}
