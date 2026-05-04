type TagListProps = {
  tags: string[];
};

export function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.length === 0 ? (
        <p className="text-sm font-bold text-slate-400">表示できるタグがありません</p>
      ) : (
        tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[#f7f9fc] px-4 py-2 text-sm font-black text-slate-700">
            #{tag}
          </span>
        ))
      )}
    </div>
  );
}
