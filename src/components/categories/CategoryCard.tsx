import Link from 'next/link';
import { CategoryGlyph } from '@/components/categories/CategoryGlyph';
import { formatNumber } from '@/lib/utils/format';

type CategoryCardProps = {
  category: {
    slug: string;
    name: string;
    title: string;
    group_name: string;
    description: string | null;
    icon_key: string | null;
    tags: string[] | null;
  };
  postCount?: number;
};

export function CategoryCard({ category, postCount = 0 }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block rounded-[14px] border border-slate-100 bg-white px-3 py-4 text-center shadow-[0_8px_22px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-100/70"
    >
      <CategoryGlyph iconKey={category.icon_key} className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-orange-50 via-rose-50 to-sky-50 text-4xl" />
      <div className="mt-3 truncate text-base font-black text-slate-900 group-hover:text-orange-500">{category.title}</div>
      <p className="mt-1 text-sm font-bold text-slate-500">{formatNumber(postCount)}件</p>
    </Link>
  );
}
