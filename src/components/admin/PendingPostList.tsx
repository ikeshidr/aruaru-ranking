import { approvePostAction, rejectPostAction } from '@/lib/actions/admin';
import { formatDate } from '@/lib/utils/format';

type PendingPost = {
  id: string;
  body: string;
  author_name: string | null;
  created_at: string;
  categories: {
    title: string;
    group_name: string;
  } | null;
};

type PendingPostListProps = {
  posts: PendingPost[];
};

export function PendingPostList({ posts }: PendingPostListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-orange-200 bg-orange-50/70 px-5 py-10 text-center">
        <h2 className="text-xl font-black text-slate-950">承認待ちの投稿はありません</h2>
        <p className="mt-3 text-sm font-bold leading-7 text-slate-500">新しい投稿が届くと、この画面に表示されます。</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article key={post.id} className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 text-xs font-black text-slate-400">
            <span className="rounded-full bg-orange-50 px-3 py-1 text-orange-500">承認待ち</span>
            <span>{post.categories ? `${post.categories.group_name} / ${post.categories.title}` : 'カテゴリー未設定'}</span>
            <span>{formatDate(post.created_at)}</span>
          </div>

          <p className="mt-4 whitespace-pre-wrap text-lg font-black leading-8 text-slate-900">{post.body}</p>
          <p className="mt-3 text-sm font-bold text-slate-500">投稿者：{post.author_name || '匿名さん'}</p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <form action={approvePostAction}>
              <input type="hidden" name="postId" value={post.id} />
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-orange-400 to-rose-400 px-6 py-3 text-sm font-black text-white shadow-md shadow-orange-500/20 hover:opacity-95 sm:w-auto"
              >
                承認して公開
              </button>
            </form>
            <form action={rejectPostAction}>
              <input type="hidden" name="postId" value={post.id} />
              <button
                type="submit"
                className="w-full rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-600 hover:bg-slate-50 sm:w-auto"
              >
                却下して非公開
              </button>
            </form>
          </div>
        </article>
      ))}
    </div>
  );
}
