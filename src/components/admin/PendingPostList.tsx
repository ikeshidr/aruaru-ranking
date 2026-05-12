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
      <div className="rounded-[30px] border border-dashed border-orange-200 bg-white/86 px-5 py-10 text-center shadow-sm ring-1 ring-white/80">
        <p className="text-3xl">☕</p>
        <h2 className="mt-3 text-xl font-black text-slate-950">承認待ちの投稿はありません</h2>
        <p className="mt-3 text-sm font-bold leading-7 text-slate-500">新しい投稿が届くと、この画面に表示されます。</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article key={post.id} className="rounded-[30px] border border-white/80 bg-white/92 p-5 shadow-[0_16px_42px_rgba(251,146,60,0.08)] ring-1 ring-orange-100/50">
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
                className="w-full rounded-full bg-gradient-to-r from-orange-400 to-rose-400 px-6 py-3 text-sm font-black text-white shadow-lg shadow-orange-300/35 hover:-translate-y-0.5 hover:shadow-orange-300/55 sm:w-auto"
              >
                承認して公開
              </button>
            </form>
            <form action={rejectPostAction}>
              <input type="hidden" name="postId" value={post.id} />
              <button
                type="submit"
                className="w-full rounded-full border border-orange-100 bg-white px-6 py-3 text-sm font-black text-slate-600 shadow-sm hover:-translate-y-0.5 hover:bg-orange-50 hover:text-orange-600 sm:w-auto"
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
