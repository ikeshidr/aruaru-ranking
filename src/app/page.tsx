import { AdSlot } from '@/components/AdSlot';
import { CategoryCard } from '@/components/CategoryCard';
import { PostCard } from '@/components/PostCard';
import { getHomeFeedData } from '@/lib/queries/home-feed';

export default async function Home() {
  const homeFeed = await getHomeFeedData();

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-8">
      {homeFeed.errorMessage ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <p className="font-bold">データ取得はフォールバック表示中です</p>
          <p className="mt-1">{homeFeed.errorMessage}</p>
        </div>
      ) : null}
      <section className="grid items-center gap-8 rounded-[2rem] bg-gradient-to-br from-orange-100 via-amber-50 to-white p-7 shadow-lg shadow-orange-100/60 md:grid-cols-2 md:p-10">
        <div>
          <h1 className="text-3xl font-black leading-tight text-slate-800 md:text-5xl">みんなの「あるある」で、
            <br />毎日をちょっと楽しく。</h1>
          <p className="mt-4 text-slate-600">投稿して、共感して、笑って、つながる。気軽に参加できる共感ランキングサイトです。</p>
        </div>
        <div className="relative rounded-[2rem] border border-orange-100 bg-white p-6 shadow-md">
          <div className="mx-auto h-32 w-32 rounded-full bg-amber-100" />
          <div className="mx-auto -mt-4 h-24 w-40 rounded-[999px] bg-orange-200" />
          <p className="absolute left-2 top-4 rounded-full bg-rose-100 px-3 py-1 text-sm font-bold text-rose-700">それなw</p>
          <p className="absolute right-4 top-14 rounded-full bg-sky-100 px-3 py-1 text-sm font-bold text-sky-700">わかる〜</p>
          <p className="absolute left-8 bottom-4 rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-800">あるある！</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-black">人気カテゴリ</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {homeFeed.categories.map((c) => (
            <CategoryCard key={c.name} name={c.name} count={c.count} />
          ))}
        </div>
      </section>

      <AdSlot position="top-banner" size="970x90" />

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <h2 className="text-2xl font-black">総合ランキング</h2>
          {homeFeed.posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
          <AdSlot position="ranking-bottom" size="970x90" />
        </div>
        <aside className="space-y-4">
          <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-md">
            <h3 className="mb-2 text-lg font-bold">今日の人気あるある</h3>
            <ol className="space-y-2 text-sm text-slate-600">
              <li>1. ナースコールの幻聴</li><li>2. 休憩突入で急変コール</li><li>3. 手袋を外した瞬間に呼ばれる</li>
            </ol>
          </div>
          <AdSlot position="sidebar" size="300x600" />
        </aside>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <section className="rounded-3xl border border-orange-100 bg-white p-6 shadow-md"><h3 className="mb-3 text-xl font-bold">新着あるある</h3><ul className="space-y-2 text-sm text-slate-600"><li>・申し送り直後に思い出す伝達事項</li><li>・白衣のポケットが小物でパンパン</li><li>・夜勤明けはテンションが逆に高い</li><li>・点滴準備中に別件コールが重なる</li></ul></section>
        <section className="rounded-3xl border border-orange-100 bg-white p-6 shadow-md"><h3 className="mb-3 text-xl font-bold">注目のタグ</h3><p className="text-sm text-slate-600">#夜勤 #人間関係 #患者さん #休憩 #新人教育 #シフト #ナースコール #申し送り</p></section>
      </section>

      <AdSlot position="sponsor-banner" size="970x90" />
    </main>
  );
}
