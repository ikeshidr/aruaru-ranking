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
      className="block rounded-[24px] border border-slate-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-4 flex items-center gap-4">
        <CategoryGlyph iconKey={category.icon_key} className="h-16 w-16 text-3xl" />
        <div>
          <div className="text-xl font-black text-slate-900">{category.title}</div>
          <div className="mt-1 text-xs font-black text-slate-400">{category.group_name}</div>
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
