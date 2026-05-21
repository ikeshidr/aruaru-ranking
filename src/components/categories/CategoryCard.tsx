import Link from 'next/link';
import { CategoryGlyph } from '@/components/categories/CategoryGlyph';

const compactDescription = (description: string | null) => {
  if (!description) return 'このカテゴリーのあるあるを見てみよう！';
  return description.length > 28 ? `${description.slice(0, 28)}…` : description;
};

type CategoryCardProps = {
  category: {
    slug: string;
    title: string;
    group_name: string;
    description: string | null;
    icon_key: string | null;
    tags: string[] | null;
  };
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block rounded-[18px] border border-slate-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-100/70"
    >
      <CategoryGlyph slug={category.slug} className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-orange-50 to-rose-50 text-4xl" />
      <div className="mt-3 text-base font-black text-slate-900 group-hover:text-orange-500">{category.title}</div>
      <p className="mx-auto mt-1 line-clamp-2 min-h-[40px] max-w-[13rem] text-xs font-bold leading-5 text-slate-500">
        {compactDescription(category.description)}
      </p>
    </Link>
  );
}
