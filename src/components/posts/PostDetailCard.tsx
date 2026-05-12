import Link from 'next/link';
import { TagPill } from '@/components/ui/TagPill';
import { VotePostButton } from '@/components/voting/VotePostButton';
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
    <article className="relative overflow-hidden rounded-[36px] border border-white/80 bg-white/94 p-6 shadow-[0_24px_70px_rgba(251,146,60,0.14)] ring-1 ring-orange-100/60 sm:p-8">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rose-100/80 blur-3xl" />
      <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-orange-100/80 blur-3xl" />

      <div className="relative mb-5 flex flex-wrap items-center gap-2">
        {post.categories ? (
          <Link
            href={`/categories/${post.categories.slug}`}
            className="rounded-full bg-orange-50 px-4 py-2 text-sm font-black text-orange-600 shadow-sm shadow-orange-100/60 hover:bg-orange-100"
          >
            {post.categories.title}
          </Link>
        ) : null}
        <span className="text-sm font-bold text-slate-400">{formatDate(post.created_at)}</span>
      </div>

      <h1 className="relative text-2xl font-black leading-10 text-slate-950 sm:text-4xl sm:leading-[1.55]">{post.body}</h1>

      <div className="relative mt-6 flex flex-wrap gap-2">
        {(post.tags ?? []).map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>

      <div className="relative mt-8 grid gap-3 border-t border-orange-100/70 pt-5 sm:grid-cols-3">
        <VotePostButton postId={post.id} voteCount={post.vote_count} />
        <div className="rounded-2xl bg-slate-50/90 px-5 py-4 text-center font-black text-slate-600 ring-1 ring-slate-100">
          コメント {formatNumber(post.comment_count)}
        </div>
        <div className="rounded-2xl bg-slate-50/90 px-5 py-4 text-center text-sm font-black text-slate-500 ring-1 ring-slate-100">
          投稿者：{post.author_name ?? '匿名さん'}
        </div>
      </div>
    </article>
  );
}
