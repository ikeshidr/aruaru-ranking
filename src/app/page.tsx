import { CategoryCard } from '@/components/categories/CategoryCard';
import { HomeHero } from '@/components/home/HomeHero';
import { TagList } from '@/components/home/TagList';
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

  const popularCategories = categories.slice(0, 8);
  const todayPopular = rankingPosts.slice(5, 9);
  const latestPosts = approvedPosts.slice(0, 5);
  const tags = Array.from(new Set(rankingPosts.flatMap((post) => post.tags ?? []))).slice(0, 12);

  return (
    <main>
      <Container className="space-y-12 py-8 sm:py-10">
        <HomeHero />

        <section>
          <div className="mb-5 flex items-end justify-between gap-4 px-1">
            <div>
              <p className="text-sm font-black text-orange-500">POPULAR CATEGORIES</p>
              <h2 className="text-2xl font-black text-slate-950">人気カテゴリー</h2>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popularCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        <WideAd label="ホーム上部 広告枠" />

        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <div className="px-1">
              <p className="text-sm font-black text-orange-500">RANKING</p>
              <h2 className="text-2xl font-black text-slate-950">総合ランキング</h2>
            </div>
            {rankingPosts.slice(0, 5).map((post, index) => (
              <RankingPostCard key={post.id} rank={index + 1} post={post} />
            ))}
          </div>

          <aside className="space-y-5">
            <SectionCard>
              <h3 className="text-lg font-black text-slate-950">今日の人気あるある</h3>
              <div className="mt-4 space-y-3">
                {todayPopular.length === 0 ? (
                  <p className="rounded-2xl bg-orange-50/60 p-4 text-sm font-bold text-slate-400">該当する人気あるあるがありません</p>
                ) : (
                  todayPopular.map((post, index) => (
                    <RankingPostCard key={post.id} rank={index + 6} post={post} />
                  ))
                )}
              </div>
            </SectionCard>
            <WideAd label="サイドバー広告枠" />
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <SectionCard>
            <h2 className="mb-4 text-2xl font-black text-slate-950">新着あるある</h2>
            <div className="space-y-4">
              {latestPosts.length === 0 ? (
                <p className="rounded-2xl bg-orange-50/60 p-5 text-center font-bold text-slate-400">新着あるあるはまだありません。</p>
              ) : (
                latestPosts.map((post) => <PostCard key={post.id} post={post} />)
              )}
            </div>
          </SectionCard>

          <SectionCard>
            <h2 className="mb-4 text-2xl font-black text-slate-950">注目タグ</h2>
            <TagList tags={tags} />
          </SectionCard>
        </section>

        <WideAd label="ホーム下部 広告枠" />
      </Container>
    </main>
  );
}
