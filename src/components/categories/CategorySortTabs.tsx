import Link from 'next/link';

const SORT_TABS = [
  { value: 'popular', label: '🏆 人気順' },
  { value: 'new',     label: '🕒 新着順' },
  { value: 'commented', label: '💬 コメント順' },
] as const;

type SortValue = typeof SORT_TABS[number]['value'];

type CategorySortTabsProps = {
  slug: string;
  currentSort: SortValue;
};

export function CategorySortTabs({ slug, currentSort }: CategorySortTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="並び替え">
      {SORT_TABS.map((tab) => {
        const isActive = tab.value === currentSort;
        return (
          <Link
            key={tab.value}
            href={`/categories/${slug}?sort=${tab.value}`}
            role="tab"
            aria-selected={isActive}
            className={[
              'shrink-0 rounded-full px-4 py-2 text-sm font-black transition',
              isActive
                ? 'bg-orange-500 text-white shadow-sm shadow-orange-200'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:text-orange-500',
            ].join(' ')}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
