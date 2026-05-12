type WideAdProps = {
  label?: string;
};

export function WideAd({ label = '広告枠' }: WideAdProps) {
  return (
    <div className="group rounded-[30px] border border-dashed border-amber-200/90 bg-gradient-to-r from-white/90 via-amber-50/90 to-rose-50/70 p-5 text-center shadow-[0_14px_35px_rgba(251,191,36,0.12)] ring-1 ring-white/80">
      <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-amber-300" />
        <p className="text-sm font-black text-slate-500">{label}</p>
      </div>
      <p className="mt-2 text-xs font-bold text-slate-400">Sponsor / 970×90 placeholder</p>
    </div>
  );
}
