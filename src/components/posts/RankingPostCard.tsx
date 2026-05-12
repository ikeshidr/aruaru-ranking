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
  const isPodium = rank <= 3;

  return (
    <article className={`group flex gap-4 rounded-[30px] border bg-white/92 p-5 shadow-[0_16px_42px_rgba(251,146,60,0.08)] ring-1 ring-orange-100/50 transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(251,146,60,0.14)] ${isPodium ? 'border-orange-100 bg-gradient-to-br from-white via-white to-orange-50/70' : 'border-white/80'}`}>
      <RankMedal rank={rank} />
      <div className="min-w-0 flex-1">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {post.categories ? (
            <Link href={`/categories/${post.categories.slug}`} className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-600 hover:bg-orange-100">
              {post.categories.title}
            </Link>
          ) : null}
          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-black text-rose-500 shadow-sm shadow-rose-100/60">
            わかる！ {formatNumber(post.vote_count)}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
            💬 {formatNumber(post.comment_count)}
          </span>
        </div>

        <Link href={`/posts/${post.id}`} className="block text-lg font-black leading-8 text-slate-900 group-hover:text-orange-500 sm:text-xl">
          {post.body}
        </Link>

        <div className="mt-4 flex flex-wrap gap-2">
          {(post.tags ?? []).slice(0, 3).map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>

        <p className="mt-4 text-xs font-bold text-slate-400">by {post.author_name ?? '匿名さん'}</p>
      </div>
    </article>
  );
}
