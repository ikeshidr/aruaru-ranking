import { hidePostAction } from '@/lib/actions/admin';
import { formatDate } from '@/lib/utils/format';

type PublicPost = {
  id: string;
  body: string;
  author_name: string | null;
  created_at: string;
  categories: {
    title: string;
    group_name: string;
  } | null;
};

type ModeratePostListProps = {
  posts: PublicPost[];
  reportCounts: Record<string, number>;
};

export function ModeratePostList({ posts, reportCounts }: ModeratePostListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-orange-200 bg-orange-50/70 px-5 py-10 text-center">
        <h2 className="text-xl font-black text-slate-950">公開中の投稿はありません</h2>
        <p className="mt-3 text-sm font-bold leading-7 text-slate-500">
          投稿があるとこの画面に表示されます。
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article key={post.id} className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 text-xs font-black text-slate-400">
            <span className="rounded-full bg-green-50 px-3 py-1 text-green-600">公開中</span>
            {(reportCounts[post.id] ?? 0) > 0 && (
              <span className="rounded-full bg-rose-50 px-3 py-1 text-rose-600">
                通報 {reportCounts[post.id]} 件
              </span>
            )}
            <span>
              {post.categories
                ? `${post.categories.group_name} / ${post.categories.title}`
                : 'カテゴリー未設定'}
            </span>
            <span>{formatDate(post.created_at)}</span>
          </div>
          <p className="mt-4 whitespace-pre-wrap text-lg font-black leading-8 text-slate-900">
            {post.body}
          </p>
          <p className="mt-3 text-sm font-bold text-slate-500">
            投稿者：{post.author_name || '匿名さん'}
          </p>
          <div className="mt-5">
            <form action={hidePostAction}>
              <input type="hidden" name="postId" value={post.id} />
              <button
                type="submit"
                className="rounded-full border border-rose-200 bg-white px-6 py-3 text-sm font-black text-rose-600 hover:bg-rose-50"
              >
                非公開にする
              </button>
            </form>
          </div>
        </article>
      ))}
    </div>
  );
}
