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
      <div className="rounded-[28px] border border-dashed border-slate-200 bg-white p-6 text-center font-bold text-slate-400">
        まだコメントはありません。
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <article key={comment.id} className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
            <span>{comment.author_name ?? '匿名さん'}</span>
            <span>・</span>
            <span>{formatDate(comment.created_at)}</span>
          </div>
          <p className="font-bold leading-7 text-slate-700">{comment.body}</p>
        </article>
      ))}
    </div>
  );
}
