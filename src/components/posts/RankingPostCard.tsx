import Link from 'next/link';
import { RankMedal } from '@/components/ui/RankMedal';
import { TagPill } from '@/components/ui/TagPill';
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
    <article className="flex gap-4 rounded-[28px] border border-slate-100 bg-white p-5 shadow-sm">
      <RankMedal rank={rank} />
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {post.categories ? (
            <Link href={`/categories/${post.categories.slug}`} className="text-xs font-black text-orange-500">
              {post.categories.title}
            </Link>
          ) : null}
          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-black text-rose-500">
            わかる！ {formatNumber(post.vote_count)}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
            💬 {formatNumber(post.comment_count)}
          </span>
        </div>

        <Link href={`/posts/${post.id}`} className="block text-lg font-black leading-8 text-slate-900 hover:text-orange-500">
          {post.body}
        </Link>

        <div className="mt-3 flex flex-wrap gap-2">
          {(post.tags ?? []).slice(0, 3).map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>

        <p className="mt-3 text-xs font-bold text-slate-400">by {post.author_name ?? '匿名さん'}</p>
      </div>
    </article>
  );
}
