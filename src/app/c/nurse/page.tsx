import { AdSlot } from '@/components/AdSlot';
import { PostCard } from '@/components/PostCard';
import { nursePosts, nurseTags } from '@/data/dummy';

export default function NursePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-5 p-4">
      <p className="text-sm text-slate-500">ホーム &gt; 職業あるある &gt; 看護師</p>
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-amber-100"><h1 className="text-2xl font-bold">看護師あるある</h1><p className="mt-1 text-sm text-slate-600">投稿数 1,240件 ・ 総投票 54,000票</p><button className="mt-4 rounded-full bg-orange-400 px-4 py-2 text-sm font-semibold text-white">このカテゴリに投稿する</button></section>
      <section className="flex flex-wrap gap-2">{['人気順','新着順','急上昇','殿堂入り'].map((t)=><button key={t} className="rounded-full border px-3 py-1 text-sm">{t}</button>)}</section>
      <section className="flex flex-wrap gap-2">{nurseTags.map((t)=><button key={t} className="rounded-full bg-amber-100 px-3 py-1 text-xs">{t}</button>)}</section>
      <section className="grid gap-6 lg:grid-cols-[1fr_300px]"><div className="space-y-4">{nursePosts.map((p)=><PostCard key={p.id} post={p} />)}</div><aside className="space-y-4"><div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-amber-100"><h3 className="font-semibold">カテゴリ内ランキング TOP5</h3><ol className="mt-2 list-decimal pl-4 text-sm text-slate-600"><li>ナースコール</li><li>休憩</li><li>人間関係</li></ol></div><AdSlot position="category-sidebar" size="300x250" /></aside></section>
    </main>
  );
}
