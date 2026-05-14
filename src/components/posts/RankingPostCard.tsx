import Link from 'next/link';
import { RankMedal } from '@/components/ui/RankMedal';
import { formatNumber } from '@/lib/utils/format';

type RankingPostCardProps = {
  rank: number;
  post: {
    id: string;
    body: string;
    author_name: string | null;
    vote_count: number;
    comment_count: number;
    tags: string[] | null;
    categories?: {
      slug: string;
      title: string;
    } | null;
  };
  compact?: boolean;
};

const categoryColor = (rank: number) => {
  const colors = [
    'bg-rose-100 text-rose-500',
    'bg-sky-100 text-sky-600',
    'bg-emerald-100 text-emerald-600',
    'bg-violet-100 text-violet-600',
    'bg-orange-100 text-orange-500',
  ];

  return colors[(rank - 1) % colors.length];
};

export function RankingPostCard({ rank, post, compact = false }: RankingPostCardProps) {
  return (
    <article className="grid items-center gap-2 border-b border-slate-100 bg-white px-3 py-2.5 last:border-b-0 sm:grid-cols-[46px_96px_1fr_auto_auto] sm:gap-3 sm:px-4">
      <RankMedal rank={rank} mini={compact || rank > 3} />

      {post.categories ? (
        <Link
          href={`/categories/${post.categories.slug}`}
          className={`w-fit min-w-20 rounded-full px-3 py-1 text-center text-xs font-black hover:opacity-80 ${categoryColor(rank)}`}
        >
          {post.categories.title}
        </Link>
      ) : (
        <span />
      )}

      <Link
        href={`/posts/${post.id}`}
        className={`${compact ? 'text-sm' : 'text-[15px]'} min-w-0 line-clamp-1 font-black leading-6 text-slate-900 hover:text-orange-500`}
      >
        {post.body}
      </Link>

      <span className="whitespace-nowrap text-sm font-black text-slate-700">👍 {formatNumber(post.vote_count)}</span>
      <Link
        href={`/posts/${post.id}`}
        className="w-fit whitespace-nowrap rounded-full border border-orange-200 bg-white px-3 py-1.5 text-xs font-black text-orange-500 hover:bg-orange-500 hover:text-white"
      >
        あるあるw
      </Link>
    </article>
  );
}
