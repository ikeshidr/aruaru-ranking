type TagPillProps = {
  tag: string;
};

export function TagPill({ tag }: TagPillProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50/90 px-3 py-1 text-xs font-black text-sky-600 shadow-sm shadow-sky-100/50">
      #{tag}
    </span>
  );
}
