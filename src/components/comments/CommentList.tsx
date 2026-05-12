import { formatDate } from '@/lib/utils/format';

type CommentListProps = {
  comments: Array<{
    id: string;
    author_name: string | null;
    body: string;
    created_at: string;
  }>;
};

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="rounded-[30px] border border-dashed border-orange-200 bg-white/86 p-8 text-center shadow-sm ring-1 ring-white/80">
        <p className="text-3xl">💭</p>
        <p className="mt-3 font-black text-slate-600">まだコメントはありません。</p>
        <p className="mt-2 text-sm font-bold text-slate-400">最初の「わかる！」を気軽に残してみませんか？</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <article key={comment.id} className="rounded-[26px] border border-white/80 bg-white/92 p-5 shadow-[0_14px_35px_rgba(251,146,60,0.07)] ring-1 ring-orange-100/50">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
            <span className="rounded-full bg-orange-50 px-3 py-1 font-black text-orange-500">{comment.author_name ?? '匿名さん'}</span>
            <span>{formatDate(comment.created_at)}</span>
          </div>
          <p className="font-bold leading-7 text-slate-700">{comment.body}</p>
        </article>
      ))}
    </div>
  );
}
