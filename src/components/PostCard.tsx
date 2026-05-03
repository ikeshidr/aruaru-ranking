import { Post } from './types';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-amber-100">
      <div className="mb-3 flex items-center justify-between"><span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">#{post.rank}位</span><span className="text-xs text-slate-500">{post.category}</span></div>
      <p className="mb-3 text-base font-medium leading-relaxed">{post.body}</p>
      <p className="mb-4 text-xs text-slate-500">{post.author} ・ {post.createdAt}</p>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <button className="rounded-full bg-orange-400 px-3 py-2 text-xs font-semibold text-white">あるあるw {post.aruaru}</button>
        <button className="rounded-full bg-rose-100 px-3 py-2 text-xs">笑った {post.funny}</button>
        <button className="rounded-full bg-slate-100 px-3 py-2 text-xs">ないない {post.nai}</button>
        <button className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs">💬 コメント一覧 ({post.comments})</button>
      </div>
    </article>
  );
}
