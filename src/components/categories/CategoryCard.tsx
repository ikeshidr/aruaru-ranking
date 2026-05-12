import Link from 'next/link';
import { CategoryGlyph } from '@/components/categories/CategoryGlyph';
import { TagPill } from '@/components/ui/TagPill';

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
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block rounded-[28px] border border-white/80 bg-white/92 p-5 text-left shadow-[0_16px_42px_rgba(251,146,60,0.08)] ring-1 ring-orange-100/50 transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(251,146,60,0.14)]"
    >
      <div className="mb-4 flex items-center gap-4">
        <CategoryGlyph iconKey={category.icon_key} className="h-16 w-16 text-3xl shadow-md shadow-orange-100/70 transition group-hover:scale-105" />
        <div className="min-w-0">
          <div className="text-xl font-black text-slate-900 group-hover:text-orange-500">{category.title}</div>
          <div className="mt-1 inline-flex rounded-full bg-orange-50 px-2.5 py-1 text-xs font-black text-orange-500">{category.group_name}</div>
        </div>
      </div>

      <p className="line-clamp-2 text-sm font-bold leading-6 text-slate-600">
        {category.description ?? 'このカテゴリーのあるあるを見てみよう！'}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(category.tags ?? []).slice(0, 3).map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>
    </Link>
  );
}
