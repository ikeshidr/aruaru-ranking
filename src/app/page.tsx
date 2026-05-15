import Link from 'next/link';

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
  const latestPosts = approvedPosts.slice(0, 5);

  return (
    <main className="bg-[linear-gradient(180deg,#fffdf8_0%,#fff8ed_48%,#fffdf8_100%)]">
      <Container className="space-y-7 py-5 sm:py-6">
        <HomeHero />

        <section className="rounded-[28px] bg-orange-50/55 p-4 sm:p-6">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[0.18em] text-orange-500">POPULAR CATEGORIES</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">人気カテゴリーから探す</h2>
            </div>
            <Link href="/categories" className="hidden text-sm font-black text-sky-500 hover:text-sky-600 sm:inline-flex">
              すべて見る ›
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {popularCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            <SectionCard className="overflow-hidden p-0 sm:p-0">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                <div>
                  <p className="text-xs font-black tracking-[0.18em] text-orange-500">RANKING</p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950">総合ランキング</h2>
                </div>
                <Link href="/ranking" className="text-sm font-black text-sky-500 hover:text-sky-600">
                  すべて見る ›
                </Link>
              </div>
              <div>
                {rankingPosts.slice(0, 5).map((post, index) => (
                  <RankingPostCard key={post.id} rank={index + 1} post={post} />
                ))}
              </div>
            </SectionCard>

            <WideAd label="広告バナー" />
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <WideAd label="広告バナー" variant="vertical" />
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <SectionCard>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-black text-slate-950">🕒 新着あるある</h2>
              <Link href="/ranking" className="text-sm font-black text-sky-500 hover:text-sky-600">
                もっと見る ›
              </Link>
            </div>
            <div className="space-y-4">
              {latestPosts.length === 0 ? (
                <p className="font-bold text-slate-400">新着あるあるはまだありません。</p>
              ) : (
                latestPosts.map((post) => <PostCard key={post.id} post={post} />)
              )}
            </div>
          </SectionCard>

          <SectionCard>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-black text-slate-950">注目のタグ</h2>
              <Link href="/categories" className="text-sm font-black text-sky-500 hover:text-sky-600">
                もっと見る ›
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              {['夜勤', '新人', '上司', 'クレーム', '社会人', '学生', 'あるあるw', '仕事疲れ', '休日', '接客', '動物', '子育て'].map((tag) => (
                <span key={tag} className="rounded-full bg-orange-50 px-4 py-2 text-sm font-black text-slate-600">
                  # {tag}
                </span>
              ))}
            </div>
          </SectionCard>
        </section>
      </Container>
    </main>
  );
}
