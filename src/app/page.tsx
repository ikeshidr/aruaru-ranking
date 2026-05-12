import Link from 'next/link';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { HomeHero } from '@/components/home/HomeHero';
import { SidebarAd } from '@/components/home/SidebarAd';
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

  const popularCategories = categories.slice(0, 6);
  const latestPosts = approvedPosts.slice(0, 5);
  const tags = Array.from(new Set(rankingPosts.flatMap((post) => post.tags ?? []))).slice(0, 12);

  return (
    <main className="bg-[#fffaf4]">
      <Container className="space-y-5 py-5 sm:space-y-6 sm:py-6">
        <HomeHero />

        <section>
          <div className="mb-3 flex items-center justify-between gap-4 px-1">
            <h2 className="flex items-center gap-2 text-xl font-black text-slate-950">
              <span>🔥</span> 人気カテゴリ
            </h2>
            <Link href="/categories" className="text-sm font-black text-sky-600 hover:text-orange-500">
              すべて見る ›
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {popularCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        <WideAd />

        <section className="grid gap-5 lg:grid-cols-[1fr_300px]">
          <SectionCard className="p-4 sm:p-5">
            <div className="mb-2 flex items-center justify-between gap-4">
              <h2 className="flex items-center gap-2 text-xl font-black text-slate-950">
                <span>👑</span> 総合ランキング
              </h2>
              <Link href="/ranking" className="text-sm font-black text-sky-600 hover:text-orange-500">
                もっと見る
              </Link>
            </div>
            <div>
              {rankingPosts.length === 0 ? (
                <p className="py-8 text-center font-bold text-slate-400">ランキング対象のあるあるはまだありません。</p>
              ) : (
                rankingPosts.slice(0, 5).map((post, index) => <RankingPostCard key={post.id} rank={index + 1} post={post} />)
              )}
            </div>
          </SectionCard>

          <aside>
            <SidebarAd />
          </aside>
        </section>

        <WideAd />

        <section className="grid gap-5 lg:grid-cols-2">
          <SectionCard className="p-4 sm:p-5">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-black text-slate-950">
              <span>🕒</span> 新着あるある
            </h2>
            <div className="space-y-4">
              {latestPosts.length === 0 ? (
                <p className="font-bold text-slate-400">新着あるあるはまだありません。</p>
              ) : (
                latestPosts.map((post) => <PostCard key={post.id} post={post} />)
              )}
            </div>
          </SectionCard>

          <SectionCard className="p-4 sm:p-5">
            <h2 className="mb-4 text-xl font-black text-slate-950">注目タグ</h2>
            <TagList tags={tags} />
          </SectionCard>
        </section>
      </Container>
    </main>
  );
}
