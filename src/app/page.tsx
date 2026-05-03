import { AdSlot } from '@/components/AdSlot';
import { CategoryCard } from '@/components/CategoryCard';
import { PostCard } from '@/components/PostCard';
import { nursePosts, popularCategories } from '@/data/dummy';

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-4">
      <section className="rounded-3xl bg-gradient-to-br from-orange-100 to-amber-50 p-8 shadow-sm"><h1 className="text-3xl font-bold">みんなの共感ネタを投票でランキング！</h1><p className="mt-2 text-slate-600">あるある言いたい！を投稿して盛り上がろう。</p></section>
      <section><h2 className="mb-3 text-xl font-bold">人気カテゴリ</h2><div className="grid grid-cols-2 gap-3 md:grid-cols-3">{popularCategories.map((c)=><CategoryCard key={c} name={c} />)}</div></section>
      <AdSlot position="top-banner" size="970x90" />
      <section className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4"><h2 className="text-xl font-bold">総合ランキング / 今日の人気 / 新着あるある</h2>{nursePosts.map((p)=><PostCard key={p.id} post={p} />)}</div>
        <aside className="space-y-4"><AdSlot position="sidebar" size="300x600" /><div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-amber-100"><h3 className="mb-2 font-semibold">注目タグ</h3><p className="text-sm text-slate-600">#夜勤 #ナースコール #休憩 #人間関係</p></div></aside>
      </section>
    </main>
  );
}
