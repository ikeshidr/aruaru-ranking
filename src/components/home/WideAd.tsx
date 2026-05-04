type WideAdProps = {
  label?: string;
};

export function WideAd({ label = '広告枠' }: WideAdProps) {
  return (
    <div className="rounded-[28px] border border-dashed border-amber-200 bg-gradient-to-r from-white via-amber-50 to-white p-5 text-center shadow-sm">
      <p className="text-sm font-black text-slate-500">{label}</p>
      <p className="mt-1 text-xs font-bold text-slate-400">Sponsor / 970×90 placeholder</p>
    </div>
  );
}
