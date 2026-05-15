import Link from 'next/link';
import { RankMedal } from '@/components/ui/RankMedal';
import { formatNumber } from '@/lib/utils/format';
import { getCategoryPillClass } from '@/lib/utils/categoryColor';

type RankingPostCardProps = {
  rank: number;
  post: {
    id: string;
    body: string;
    vote_count: number;
    categories?: {
      slug: string;
      title: string;
      group_name?: string | null;
    } | null;
  };
};

export function RankingPostCard({ rank, post }: RankingPostCardProps) {
  const pillClass = getCategoryPillClass({
    slug: post.categories?.slug,
    groupName: post.categories?.group_name,
  });

  return (
    <article className="grid items-center gap-3 border-b border-slate-100 bg-white px-4 py-4 last:border-b-0 sm:grid-cols-[auto_1fr_auto] sm:gap-4">
      <div className="flex items-center gap-3">
        <RankMedal rank={rank} />
        {post.categories ? (
          <Link
            href={`/categories/${post.categories.slug}`}
            className={`min-w-20 rounded-full px-3 py-1 text-center text-xs font-bold transition hover:opacity-80 ${pillClass}`}
          >
            {post.categories.title}
          </Link>
        ) : null}
      </div>

      <div className="min-w-0">
        <Link
          href={`/posts/${post.id}`}
          className="line-clamp-2 text-base font-extrabold leading-7 text-text hover:text-primary"
        >
          {post.body}
        </Link>
      </div>

      <div className="flex items-center gap-1.5 sm:justify-end">
        <span aria-hidden="true" className="text-base leading-none">👍</span>
        <span className="whitespace-nowrap text-base font-black text-primary">{formatNumber(post.vote_count)}</span>
      </div>
    </article>
  );
}
