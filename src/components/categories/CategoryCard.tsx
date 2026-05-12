import Link from 'next/link';
import { CategoryGlyph } from '@/components/categories/CategoryGlyph';

const tintClasses = [
  'bg-rose-50 text-rose-500',
  'bg-sky-50 text-sky-500',
  'bg-amber-50 text-amber-500',
  'bg-emerald-50 text-emerald-500',
  'bg-violet-50 text-violet-500',
  'bg-orange-50 text-orange-500',
];

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
  const tintClass = tintClasses[Math.abs(category.slug.length) % tintClasses.length];

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-md shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`mx-auto mb-3 grid h-24 w-24 place-items-center rounded-full ${tintClass} transition group-hover:scale-105`}>
        <CategoryGlyph iconKey={category.icon_key} className="h-20 w-20 text-4xl" />
      </div>
      <div className="text-base font-black text-slate-900">{category.title}</div>
      <div className="mt-1 text-sm font-bold text-slate-500">{category.group_name}</div>
    </Link>
  );
}
