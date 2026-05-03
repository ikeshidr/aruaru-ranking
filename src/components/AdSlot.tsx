export function AdSlot({ position, size }: { position: string; size: string }) {
  return (
    <div className="rounded-3xl border border-amber-200 bg-gradient-to-r from-white via-amber-50 to-white p-4 text-center text-sm text-slate-500 shadow-md shadow-amber-100/40">
      <p className="mb-1 font-semibold text-slate-700">広告枠 ({position})</p>
      <p className="text-xs">{size} Placeholder</p>
    </div>
  );
}
