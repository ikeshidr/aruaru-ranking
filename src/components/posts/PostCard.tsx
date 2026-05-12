import Link from 'next/link';
import { formatDate, formatNumber } from '@/lib/utils/format';
import { TagPill } from '@/components/ui/TagPill';

type PostCardProps = {
  post: {
    id: string;
    body: string;
    author_name: string | null;
    vote_count: number;
    comment_count: number;
    tags: string[] | null;
    created_at: string;
    categories?: {
      slug: string;
      title: string;
    } | null;
  };
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-[30px] border border-white/80 bg-white/92 p-5 shadow-[0_16px_42px_rgba(251,146,60,0.08)] ring-1 ring-orange-100/50 transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(251,146,60,0.14)]">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {post.categories ? (
          <Link
            href={`/categories/${post.categories.slug}`}
            className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-600 hover:bg-orange-100"
          >
            {post.categories.title}
          </Link>
        ) : null}
        <span className="text-xs font-bold text-slate-400">{formatDate(post.created_at)}</span>
      </div>

      <Link href={`/posts/${post.id}`} className="block">
        <p className="text-lg font-black leading-8 text-slate-900 group-hover:text-orange-500">{post.body}</p>
      </Link>

      <div className="mt-4 flex flex-wrap gap-2">
        {(post.tags ?? []).slice(0, 4).map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-orange-100/70 pt-4">
        <button
          type="button"
          disabled
          className="rounded-full bg-gradient-to-r from-orange-400 to-rose-400 px-4 py-2 text-sm font-black text-white opacity-80 shadow-md shadow-orange-200/60"
        >
          わかる！ {formatNumber(post.vote_count)}
        </button>
        <Link href={`/posts/${post.id}`} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-600 hover:bg-orange-50 hover:text-orange-600">
          コメント {formatNumber(post.comment_count)}
        </Link>
        <span className="ml-auto text-xs font-bold text-slate-400">by {post.author_name ?? '匿名さん'}</span>
      </div>
    </article>
  );
}
