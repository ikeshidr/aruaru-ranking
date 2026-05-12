export function AdSlot({ position, size }: { position: string; size: string }) {
  return (
    <div className="rounded-[30px] border border-dashed border-amber-200/90 bg-gradient-to-r from-white/95 via-amber-50/90 to-rose-50/70 p-5 text-center text-sm text-slate-500 shadow-[0_14px_35px_rgba(251,191,36,0.14)] ring-1 ring-white/80">
      <p className="mb-1 font-black text-slate-600">広告枠 ({position})</p>
      <p className="text-xs font-bold text-slate-400">{size} Placeholder</p>
    </div>
  );
}
