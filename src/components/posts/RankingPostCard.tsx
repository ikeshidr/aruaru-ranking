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
};

export function RankingPostCard({ rank, post }: RankingPostCardProps) {
  return (
    <article className="flex items-center gap-3 border-b border-slate-100 bg-white px-1 py-3 last:border-b-0 sm:gap-4 sm:px-2">
      <RankMedal rank={rank} mini={rank > 3} />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          {post.categories ? (
            <Link
              href={`/categories/${post.categories.slug}`}
              className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-500"
            >
              {post.categories.title}
            </Link>
          ) : null}
          <span className="text-xs font-bold text-slate-400">💬 {formatNumber(post.comment_count)}</span>
        </div>
        <Link href={`/posts/${post.id}`} className="line-clamp-2 block text-base font-black leading-7 text-slate-900 hover:text-orange-500">
          {post.body}
        </Link>
      </div>
      <button
        type="button"
        disabled
        className="shrink-0 rounded-full px-2 py-1 text-sm font-black text-orange-500 opacity-90 sm:px-3"
        aria-label={`あるあるw ${formatNumber(post.vote_count)}`}
      >
        👍 <span className="hidden sm:inline">あるあるw</span> {formatNumber(post.vote_count)}
      </button>
    </article>
  );
}
