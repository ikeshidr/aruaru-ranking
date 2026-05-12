import { CategoryCard } from '@/components/categories/CategoryCard';
import { Container } from '@/components/ui/Container';
import { getActiveCategories } from '@/lib/queries/categories';

import { createPageMetadata } from '@/lib/seo';
export const metadata = createPageMetadata({
  title: 'カテゴリー一覧',
  description: '職業・学校・動物・趣味など、いろいろなカテゴリーのあるあるを探せるカテゴリー一覧ページです。',
  path: '/categories',
});

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await getActiveCategories();

  return (
    <main>
      <Container className="space-y-8 py-8">
        <section className="rounded-[32px] border border-[#f5eadc] bg-[#fffaf2] p-8 shadow-sm">
          <p className="text-sm font-black text-orange-500">CATEGORIES</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-5xl">カテゴリー一覧</h1>
          <p className="mt-4 max-w-2xl font-bold leading-8 text-slate-600">
            職業だけでなく、動物・猫・大学生など、いろいろなカテゴリーのあるあるを探せます。
          </p>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.length === 0 ? (
            <p className="rounded-[28px] bg-white p-8 text-center font-bold text-slate-400 sm:col-span-2 lg:col-span-3">
              表示できるカテゴリーがありません。
            </p>
          ) : (
            categories.map((category) => <CategoryCard key={category.id} category={category} />)
          )}
        </div>
      </Container>
    </main>
  );
}
