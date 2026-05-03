const icons: Record<string, string> = {
  看護師: '🩺',
  介護士: '🧡',
  美容師: '✂️',
  営業職: '💼',
  飲食店バイト: '🍽️',
  工場勤務: '🏭',
  トラック運転手: '🚚',
  動物: '🐾'
};

export function CategoryCard({ name, count }: { name: string; count: number }) {
  return (
    <div className="rounded-3xl border border-amber-100 bg-gradient-to-br from-white to-orange-50 p-5 shadow-md shadow-orange-100/40 transition hover:-translate-y-1">
      <div className="mb-3 inline-flex rounded-2xl bg-white px-3 py-2 text-2xl shadow-sm">{icons[name] ?? '✨'}</div>
      <div className="font-bold text-slate-700">{name}</div>
      <p className="mt-1 text-xs text-slate-500">投稿 {count.toLocaleString()}件</p>
    </div>
  );
}
