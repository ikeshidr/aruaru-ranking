import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CategoryGlyph } from '@/components/categories/CategoryGlyph';
import { CategorySortTabs } from '@/components/categories/CategorySortTabs';
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
  searchParams: Promise<{ sort?: string }>;
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
    title: category.title,
    description: truncateDescription(
      category.description ?? `${category.title}にまつわる「あるある」をランキングで見たり、投票・コメントで楽しめます。`,
    ),
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryDetailPage({ params, searchParams }: CategoryDetailPageProps) {
  const { slug } = await params;
  const { sort: rawSort } = await searchParams;
  const sort = rawSort === 'new' || rawSort === 'commented' ? rawSort : 'popular';
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  const [posts, categories] = await Promise.all([getCategoryPosts(category.id, sort), getActiveCategories()]);
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags ?? []))).slice(0, 12);

  return (
    <main>
      <Container className="space-y-8 py-8">
        <section className="grid gap-6 rounded-[36px] border border-[#f5eadc] bg-gradient-to-br from-[#fff4dd] via-white to-[#fff1f5] p-8 shadow-sm lg:grid-cols-[1fr_300px]">
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
          <div className="grid place-items-center rounded-[32px] bg-white p-8 shadow-inner">
            <CategoryGlyph slug={category.slug} variant="hero" className="h-32 w-32 text-6xl" />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950">{category.title}のランキング</h2>
            <CategorySortTabs slug={category.slug} currentSort={sort} />
            {posts.length === 0 ? (
              <p className="rounded-[28px] bg-white p-8 text-center font-bold text-slate-400">このカテゴリーのあるあるはまだありません。</p>
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
                  <Link key={item.id} href={`/categories/${item.slug}`} className="block rounded-2xl bg-slate-50 px-4 py-3 text-sm font-black text-slate-600 hover:bg-orange-50 hover:text-orange-600">
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
