import Link from 'next/link';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { HomeHero } from '@/components/home/HomeHero';
import { WideAd } from '@/components/home/WideAd';
import { RankingPostCard } from '@/components/posts/RankingPostCard';
import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { getActiveCategories } from '@/lib/queries/categories';
import { getApprovedPosts, getRankingPosts } from '@/lib/queries/posts';
import { formatDate, formatNumber } from '@/lib/utils/format';

import { createPageMetadata } from '@/lib/seo';
export const metadata = createPageMetadata({
  title: 'あるあるランキング',
  description: '職業・学校・動物・趣味など、みんなの「あるある」を投稿・投票・コメントで楽しめるランキングサイトです。',
  path: '/',
});

export const dynamic = 'force-dynamic';

const categoryColor = (index: number) => {
  const colors = [
    'bg-sky-100 text-sky-600',
    'bg-rose-100 text-rose-500',
    'bg-emerald-100 text-emerald-600',
    'bg-violet-100 text-violet-600',
    'bg-orange-100 text-orange-500',
  ];

  return colors[index % colors.length];
};

export default async function Home() {
  const [categories, rankingPosts, approvedPosts] = await Promise.all([
    getActiveCategories(),
    getRankingPosts(10),
    getApprovedPosts(),
  ]);

  const popularCategories = categories.slice(0, 6);
  const todayPopular = rankingPosts.slice(5, 10);
  const latestPosts = approvedPosts.slice(0, 5);
  const postCountsByCategory = approvedPosts.reduce<Map<string, number>>((counts, post) => {
    const slug = post.categories?.slug;
    if (!slug) return counts;
    counts.set(slug, (counts.get(slug) ?? 0) + 1);
    return counts;
  }, new Map());

  return (
    <main>
      <Container className="space-y-4 py-4 sm:py-5">
        <HomeHero />

        <section id="popular-categories" className="pt-1">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="text-lg font-black text-slate-950"><span className="text-orange-500">🔥</span> 人気カテゴリ</h2>
            <Link href="/categories" className="text-sm font-black text-sky-600 hover:text-orange-500">
              すべて見る 〉
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {popularCategories.map((category) => (
              <CategoryCard key={category.id} category={category} postCount={postCountsByCategory.get(category.slug) ?? 0} />
            ))}
          </div>
        </section>

        <WideAd label="広告バナー" />

        <section className="grid gap-5 lg:grid-cols-[1fr_280px]">
          <SectionCard className="overflow-hidden p-0 sm:p-0">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
              <h2 className="text-lg font-black text-slate-950"><span className="text-amber-400">♕</span> 総合ランキング</h2>
              <Link href="/ranking" className="text-sm font-black text-sky-600 hover:text-orange-500">
                もっと見る
              </Link>
            </div>
            <div>
              {rankingPosts.slice(0, 5).map((post, index) => (
                <RankingPostCard key={post.id} rank={index + 1} post={post} />
              ))}
            </div>
          </SectionCard>

          <aside>
            <WideAd label="広告バナー" variant="vertical" className="h-full min-h-[330px] lg:min-h-[0]" />
          </aside>
        </section>

        <section id="latest" className="grid gap-5 lg:grid-cols-2">
          <SectionCard className="overflow-hidden p-0 sm:p-0">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
              <h2 className="text-lg font-black text-slate-950"><span className="text-orange-500">🔥</span> 今日の人気</h2>
              <Link href="/ranking" className="text-sm font-black text-sky-600 hover:text-orange-500">
                もっと見る 〉
              </Link>
            </div>
            <div>
              {todayPopular.length === 0 ? (
                <p className="p-5 text-sm font-bold text-slate-400">該当する人気あるあるがありません</p>
              ) : (
                todayPopular.map((post, index) => <RankingPostCard key={post.id} rank={index + 1} post={post} compact />)
              )}
            </div>
          </SectionCard>

          <SectionCard className="overflow-hidden p-0 sm:p-0">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
              <h2 className="text-lg font-black text-slate-950"><span className="text-sky-500">◴</span> 新着あるある</h2>
              <Link href="/ranking" className="text-sm font-black text-sky-600 hover:text-orange-500">
                もっと見る 〉
              </Link>
            </div>
            <div>
              {latestPosts.length === 0 ? (
                <p className="p-5 text-sm font-bold text-slate-400">新着あるあるはまだありません。</p>
              ) : (
                latestPosts.map((post, index) => (
                  <article key={post.id} className="grid items-center gap-2 border-b border-slate-100 bg-white px-3 py-2.5 last:border-b-0 sm:grid-cols-[52px_86px_1fr_auto] sm:gap-3 sm:px-4">
                    <span className="w-fit rounded-full bg-orange-500 px-2 py-1 text-[10px] font-black text-white">NEW</span>
                    {post.categories ? (
                      <Link
                        href={`/categories/${post.categories.slug}`}
                        className={`w-fit min-w-20 rounded-full px-3 py-1 text-center text-xs font-black hover:opacity-80 ${categoryColor(index)}`}
                      >
                        {post.categories.title}
                      </Link>
                    ) : (
                      <span />
                    )}
                    <Link href={`/posts/${post.id}`} className="min-w-0 line-clamp-1 text-sm font-black leading-6 text-slate-900 hover:text-orange-500">
                      {post.body}
                    </Link>
                    <span className="whitespace-nowrap text-xs font-bold text-slate-400">
                      {formatDate(post.created_at)} ・ 👍 {formatNumber(post.vote_count)}
                    </span>
                  </article>
                ))
              )}
            </div>
          </SectionCard>
        </section>
      </Container>
    </main>
  );
}
