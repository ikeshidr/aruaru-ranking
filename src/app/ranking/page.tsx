import { RankingPostCard } from '@/components/posts/RankingPostCard';
import { Container } from '@/components/ui/Container';
import { WideAd } from '@/components/home/WideAd';
import { getRankingPosts } from '@/lib/queries/posts';

import { createPageMetadata } from '@/lib/seo';
export const metadata = createPageMetadata({
  title: '総合ランキング',
  description: 'みんなの共感を集めた「あるある」を全カテゴリー横断でランキング表示します。人気の投稿に投票やコメントで参加できます。',
  path: '/ranking',
});

export const dynamic = 'force-dynamic';

export default async function RankingPage() {
  const posts = await getRankingPosts();

  return (
    <main>
      <Container className="space-y-8 py-8 sm:py-10">
        <section className="rounded-[36px] border border-white/80 bg-gradient-to-br from-[#fff4dd] via-white to-[#fff1f5] p-7 shadow-[0_20px_55px_rgba(251,146,60,0.12)] ring-1 ring-orange-100/60 sm:p-10">
          <p className="text-sm font-black text-orange-500">ALL CATEGORY RANKING</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-5xl">総合ランキング</h1>
          <p className="mt-4 max-w-2xl font-bold leading-8 text-slate-600">
            全カテゴリー横断で、共感数が多いあるあるをランキング表示しています。投票機能はPhase 4以降で接続します。
          </p>
        </section>

        <WideAd label="ランキング上部 広告枠" />

        <div className="space-y-5">
          {posts.length === 0 ? (
            <p className="rounded-[30px] border border-dashed border-orange-200 bg-white/86 p-10 text-center font-bold text-slate-400 shadow-sm">ランキング対象のあるあるがありません。</p>
          ) : (
            posts.map((post, index) => <RankingPostCard key={post.id} rank={index + 1} post={post} />)
          )}
        </div>
      </Container>
    </main>
  );
}
