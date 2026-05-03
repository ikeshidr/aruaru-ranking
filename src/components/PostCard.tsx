import { Post } from './types';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-3xl border border-orange-100 bg-white p-5 shadow-md shadow-orange-100/30">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">#{post.rank}位</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{post.category}</span>
      </div>
      <p className="mb-3 text-lg font-bold leading-relaxed text-slate-800">{post.body}</p>
      <p className="mb-4 text-xs text-slate-500">{post.author} ・ {post.createdAt}</p>
      <div className="flex flex-wrap gap-2">
        <button className="rounded-full bg-orange-400 px-3 py-2 text-xs font-semibold text-white">あるあるw {post.aruaru}</button>
        <button className="rounded-full bg-rose-100 px-3 py-2 text-xs font-semibold text-rose-700">わかる！ {post.funny}</button>
        <button className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">ないないw {post.nai}</button>
        <button className="rounded-full bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-800">笑ったw</button>
        <button className="ml-auto rounded-full border border-rose-300 bg-rose-100 px-4 py-2 text-xs font-bold text-rose-700 shadow-sm">💬 コメント一覧を見る（{post.comments}件）</button>
      </div>
    </article>
  );
}
