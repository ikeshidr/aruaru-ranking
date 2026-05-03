export function AdSlot({ position, size }: { position: string; size: string }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-white p-4 text-center text-sm text-slate-500 shadow-sm">
      <p className="mb-1 font-semibold text-slate-700">広告枠 ({position})</p>
      <p>{size} Placeholder</p>
    </div>
  );
}
