import { RankingPostCard } from '@/components/posts/RankingPostCard';
import { Container } from '@/components/ui/Container';
import { WideAd } from '@/components/home/WideAd';
import { getRankingPosts } from '@/lib/queries/posts';

export default async function RankingPage() {
  const posts = await getRankingPosts();

  return (
    <main>
      <Container className="space-y-8 py-8">
        <section className="rounded-[32px] border border-[#f5eadc] bg-[#fffaf2] p-8 shadow-sm">
          <p className="text-sm font-black text-orange-500">ALL CATEGORY RANKING</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-5xl">総合ランキング</h1>
          <p className="mt-4 max-w-2xl font-bold leading-8 text-slate-600">
            全カテゴリー横断で、共感数が多いあるあるをランキング表示しています。投票機能はPhase 4以降で接続します。
          </p>
        </section>

        <WideAd label="ランキング上部 広告枠" />

        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="rounded-[28px] bg-white p-8 text-center font-bold text-slate-400">ランキング対象のあるあるがありません。</p>
          ) : (
            posts.map((post, index) => <RankingPostCard key={post.id} rank={index + 1} post={post} />)
          )}
        </div>
      </Container>
    </main>
  );
}
