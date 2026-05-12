type TagListProps = {
  tags: string[];
};

export function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.length === 0 ? (
        <p className="rounded-2xl bg-orange-50/60 px-4 py-3 text-sm font-bold text-slate-400">表示できるタグがありません</p>
      ) : (
        tags.map((tag) => (
          <span key={tag} className="rounded-full border border-orange-100 bg-white/90 px-4 py-2 text-sm font-black text-slate-700 shadow-sm shadow-orange-100/50">
            #{tag}
          </span>
        ))
      )}
    </div>
  );
}
