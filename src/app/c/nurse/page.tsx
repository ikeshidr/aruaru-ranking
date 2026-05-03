import { AdSlot } from '@/components/AdSlot';
import { PostCard } from '@/components/PostCard';
import { nursePosts, nurseTags } from '@/data/dummy';

export default function NursePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-7 px-4 py-8">
      <p className="text-sm text-slate-500">ホーム &gt; 職業あるある &gt; 看護師</p>
      <section className="rounded-[2rem] border border-rose-100 bg-gradient-to-br from-rose-100 via-pink-50 to-white p-7 shadow-lg shadow-rose-100/50">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-rose-700 md:text-4xl">看護師あるある</h1>
            <p className="mt-3 text-sm text-slate-600">夜勤・ナースコール・休憩あるあるなど、看護師の毎日に寄り添う共感ネタを楽しもう。</p>
            <button className="mt-5 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 px-5 py-2.5 text-sm font-bold text-white shadow">看護師あるあるを投稿する</button>
          </div>
          <div className="rounded-3xl bg-white/80 px-6 py-5 text-5xl shadow-sm">🩺 📋 💗</div>
        </div>
      </section>

      <section className="flex flex-wrap gap-2">{['ランキング', '新着順', 'コメントが多い順'].map((t, i) => <button key={t} className={`rounded-full px-4 py-2 text-sm font-semibold ${i === 0 ? 'bg-rose-500 text-white' : 'border border-rose-200 bg-white text-rose-600'}`}>{t}</button>)}</section>
      <section className="flex flex-wrap gap-2">{nurseTags.map((t) => <button key={t} className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">{t}</button>)}</section>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">{nursePosts.map((p) => <PostCard key={p.id} post={p} />)}</div>
        <aside className="space-y-4">
          <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-md"><h3 className="font-bold text-rose-700">看護師あるあるランキング</h3><ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-600"><li>ナースコールの幻聴</li><li>休憩に入ると急変</li><li>手袋外した瞬間に呼ばれる</li><li>申し送り後に思い出す</li><li>夜勤明けは変なテンション</li></ol></div>
          <AdSlot position="category-sidebar" size="300x250" />
          <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-md"><h3 className="font-bold text-rose-700">人気タグ</h3><p className="mt-2 text-sm text-slate-600">#夜勤 #ナースコール #人間関係 #患者さん #休憩</p></div>
        </aside>
      </section>
    </main>
  );
}
