import Link from 'next/link';
import { formatRelativeTime } from '@/lib/utils/format';
import { getCategoryPillClass } from '@/lib/utils/categoryColor';

type LatestPostRowProps = {
  post: {
    id: string;
    body: string;
    created_at: string;
    categories?: {
      slug: string;
      title: string;
      group_name?: string | null;
    } | null;
  };
};

export function LatestPostRow({ post }: LatestPostRowProps) {
  const pillClass = getCategoryPillClass({
    slug: post.categories?.slug,
    groupName: post.categories?.group_name,
  });

  return (
    <Link
      href={`/posts/${post.id}`}
      className="flex items-center gap-3 border-b border-slate-100 px-1 py-3 last:border-b-0 hover:bg-primary-soft/40"
    >
      <span className="inline-flex shrink-0 items-center rounded bg-[linear-gradient(135deg,#FF4D6D_0%,#FF1E50_100%)] px-2 py-0.5 text-xs font-black text-white">
        NEW
      </span>
      {post.categories ? (
        <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${pillClass}`}>
          {post.categories.title}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate text-sm font-extrabold text-text">{post.body}</span>
      <span className="shrink-0 text-xs font-normal text-text-muted">{formatRelativeTime(post.created_at)}</span>
    </Link>
  );
}
