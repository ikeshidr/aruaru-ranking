import Link from 'next/link';
import { TagPill } from '@/components/ui/TagPill';
import { formatDate, formatNumber } from '@/lib/utils/format';

type PostDetailCardProps = {
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
      group_name: string;
    } | null;
  };
};

export function PostDetailCard({ post }: PostDetailCardProps) {
  return (
    <article className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {post.categories ? (
          <Link
            href={`/categories/${post.categories.slug}`}
            className="rounded-full bg-orange-50 px-4 py-2 text-sm font-black text-orange-600"
          >
            {post.categories.title}
          </Link>
        ) : null}
        <span className="text-sm font-bold text-slate-400">{formatDate(post.created_at)}</span>
      </div>

      <h1 className="text-2xl font-black leading-10 text-slate-950 sm:text-4xl sm:leading-[1.55]">{post.body}</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {(post.tags ?? []).map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>

      <div className="mt-8 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3">
        <button
          type="button"
          disabled
          className="rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 px-5 py-4 text-center font-black text-white opacity-70"
        >
          わかる！ {formatNumber(post.vote_count)}
        </button>
        <div className="rounded-2xl bg-slate-50 px-5 py-4 text-center font-black text-slate-600">
          コメント {formatNumber(post.comment_count)}
        </div>
        <div className="rounded-2xl bg-slate-50 px-5 py-4 text-center text-sm font-black text-slate-500">
          投稿者：{post.author_name ?? '匿名さん'}
        </div>
      </div>
    </article>
  );
}
