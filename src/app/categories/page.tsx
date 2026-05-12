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
      <Container className="space-y-8 py-8 sm:py-10">
        <section className="rounded-[36px] border border-white/80 bg-gradient-to-br from-[#fff4dd] via-white to-[#fff1f5] p-7 shadow-[0_20px_55px_rgba(251,146,60,0.12)] ring-1 ring-orange-100/60 sm:p-10">
          <p className="text-sm font-black text-orange-500">CATEGORIES</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-5xl">カテゴリー一覧</h1>
          <p className="mt-4 max-w-2xl font-bold leading-8 text-slate-600">
            職業だけでなく、動物・猫・大学生など、いろいろなカテゴリーのあるあるを探せます。
          </p>
        </section>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.length === 0 ? (
            <p className="rounded-[30px] border border-dashed border-orange-200 bg-white/86 p-10 text-center font-bold text-slate-400 shadow-sm sm:col-span-2 lg:col-span-3">
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
