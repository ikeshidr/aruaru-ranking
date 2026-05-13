import { CategoryCard } from '@/components/categories/CategoryCard';
import { HomeHero } from '@/components/home/HomeHero';
import { WideAd } from '@/components/home/WideAd';
import { PostCard } from '@/components/posts/PostCard';
import { RankingPostCard } from '@/components/posts/RankingPostCard';
import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { getActiveCategories } from '@/lib/queries/categories';
import { getApprovedPosts, getRankingPosts } from '@/lib/queries/posts';

import { createPageMetadata } from '@/lib/seo';
export const metadata = createPageMetadata({
  title: 'あるあるランキング',
  description: '職業・学校・動物・趣味など、みんなの「あるある」を投稿・投票・コメントで楽しめるランキングサイトです。',
  path: '/',
});

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [categories, rankingPosts, approvedPosts] = await Promise.all([
    getActiveCategories(),
    getRankingPosts(10),
    getApprovedPosts(),
  ]);

  const popularCategories = categories.slice(0, 6);
  const todayPopular = rankingPosts.slice(5, 10);
  const latestPosts = approvedPosts.slice(0, 5);

  return (
    <main>
      <Container className="space-y-7 py-5 sm:py-6">
        <HomeHero />

        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[0.18em] text-orange-500">POPULAR CATEGORIES</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">人気カテゴリー</h2>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {popularCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        <WideAd label="広告バナー" />

        <section className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <SectionCard className="p-0 sm:p-0">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-black tracking-[0.18em] text-orange-500">RANKING</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">総合ランキング</h2>
              </div>
            </div>
            <div>
              {rankingPosts.slice(0, 5).map((post, index) => (
                <RankingPostCard key={post.id} rank={index + 1} post={post} />
              ))}
            </div>
          </SectionCard>

          <aside>
            <WideAd label="広告バナー" variant="vertical" className="h-full" />
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <SectionCard className="p-0 sm:p-0">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="text-xl font-black text-slate-950">🔥 今日の人気あるある</h2>
            </div>
            <div>
              {todayPopular.length === 0 ? (
                <p className="p-5 text-sm font-bold text-slate-400">該当する人気あるあるがありません</p>
              ) : (
                todayPopular.map((post, index) => <RankingPostCard key={post.id} rank={index + 1} post={post} compact />)
              )}
            </div>
          </SectionCard>

          <SectionCard>
            <h2 className="mb-4 text-xl font-black text-slate-950">🕒 新着あるある</h2>
            <div className="space-y-4">
              {latestPosts.length === 0 ? (
                <p className="font-bold text-slate-400">新着あるあるはまだありません。</p>
              ) : (
                latestPosts.map((post) => <PostCard key={post.id} post={post} />)
              )}
            </div>
          </SectionCard>
        </section>
      </Container>
    </main>
  );
}
