import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CategoryGlyph } from '@/components/categories/CategoryGlyph';
import { TagList } from '@/components/home/TagList';
import { PostCard } from '@/components/posts/PostCard';
import { RankingPostCard } from '@/components/posts/RankingPostCard';
import { Container } from '@/components/ui/Container';
import { SectionCard } from '@/components/ui/SectionCard';
import { getActiveCategories, getCategoryBySlug } from '@/lib/queries/categories';
import { getCategoryPosts } from '@/lib/queries/posts';
import { createPageMetadata, truncateDescription } from '@/lib/seo';

type CategoryDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return createPageMetadata({
      title: 'カテゴリーが見つかりません',
      description: '指定されたカテゴリーは見つかりませんでした。',
      path: `/categories/${slug}`,
    });
  }

  return createPageMetadata({
    title: `${category.title}のあるある`,
    description: truncateDescription(
      category.description ?? `${category.title}にまつわる「あるある」をランキングで見たり、投票・コメントで楽しめます。`,
    ),
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  const [posts, categories] = await Promise.all([getCategoryPosts(category.id), getActiveCategories()]);
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags ?? []))).slice(0, 12);

  return (
    <main>
      <Container className="space-y-8 py-8 sm:py-10">
        <section className="grid gap-6 overflow-hidden rounded-[38px] border border-white/80 bg-gradient-to-br from-[#fff4dd] via-white to-[#fff1f5] p-7 shadow-[0_24px_70px_rgba(251,146,60,0.14)] ring-1 ring-orange-100/60 sm:p-8 lg:grid-cols-[1fr_300px]">
          <div>
            <p className="text-sm font-black text-orange-500">{category.group_name}</p>
            <h1 className="mt-2 text-4xl font-black text-slate-950 sm:text-6xl">{category.title}</h1>
            <p className="mt-4 max-w-2xl font-bold leading-8 text-slate-600">
              {category.description ?? 'このカテゴリーのあるあるを見てみよう！'}
            </p>
            <div className="mt-6">
              <TagList tags={category.tags ?? []} />
            </div>
          </div>
          <div className="grid place-items-center rounded-[34px] border border-orange-100/70 bg-white/86 p-8 shadow-inner shadow-orange-100/70">
            <CategoryGlyph iconKey={category.icon_key} className="h-32 w-32 text-6xl" />
            <p className="mt-4 text-center text-sm font-bold text-slate-400">
              このカテゴリーの雰囲気をゆるく表現しています。
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-slate-950">{category.title}のランキング</h2>
            {posts.length === 0 ? (
              <p className="rounded-[30px] border border-dashed border-orange-200 bg-white/86 p-10 text-center font-bold text-slate-400 shadow-sm">このカテゴリーのあるあるはまだありません。</p>
            ) : (
              posts.map((post, index) =>
                index < 3 ? (
                  <RankingPostCard key={post.id} rank={index + 1} post={post} />
                ) : (
                  <PostCard key={post.id} post={post} />
                ),
              )
            )}
          </div>

          <aside className="space-y-5">
            <SectionCard>
              <h3 className="text-lg font-black text-slate-950">注目タグ</h3>
              <div className="mt-4">
                <TagList tags={tags} />
              </div>
            </SectionCard>

            <SectionCard>
              <h3 className="text-lg font-black text-slate-950">すべてのカテゴリーを見る</h3>
              <div className="mt-4 space-y-2">
                {categories.slice(0, 8).map((item) => (
                  <Link key={item.id} href={`/categories/${item.slug}`} className="block rounded-2xl bg-slate-50/90 px-4 py-3 text-sm font-black text-slate-600 ring-1 ring-slate-100 hover:bg-orange-50 hover:text-orange-600">
                    {item.title}
                  </Link>
                ))}
              </div>
            </SectionCard>
          </aside>
        </section>
      </Container>
    </main>
  );
}
