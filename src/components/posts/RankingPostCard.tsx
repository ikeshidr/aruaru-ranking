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

export function RankingPostCard({ rank, post, compact = false }: RankingPostCardProps) {
  return (
    <article className="grid items-center gap-3 border-b border-slate-100 bg-white px-3 py-3 last:border-b-0 sm:grid-cols-[auto_1fr_auto] sm:gap-4">
      <div className="flex items-center gap-3">
        <RankMedal rank={rank} mini={compact || rank > 3} />
        {post.categories ? (
          <Link
            href={`/categories/${post.categories.slug}`}
            className="min-w-20 rounded-full bg-orange-50 px-3 py-1 text-center text-xs font-black text-orange-500 hover:bg-orange-100"
          >
            {post.categories.title}
          </Link>
        ) : null}
      </div>

      <div className="min-w-0">
        <Link
          href={`/posts/${post.id}`}
          className={`${compact ? 'text-sm' : 'text-base'} line-clamp-2 font-black leading-7 text-slate-900 hover:text-orange-500`}
        >
          {post.body}
        </Link>
        {!compact ? <p className="mt-1 text-xs font-bold text-slate-400">by {post.author_name ?? '匿名さん'} ・ コメント {formatNumber(post.comment_count)}</p> : null}
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <span className="whitespace-nowrap text-sm font-black text-slate-700">👍 {formatNumber(post.vote_count)}</span>
        <Link
          href={`/posts/${post.id}`}
          className="whitespace-nowrap rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-black text-orange-500 hover:bg-orange-500 hover:text-white"
        >
          あるあるw
        </Link>
      </div>
    </article>
  );
}
