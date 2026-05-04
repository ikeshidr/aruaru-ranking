type TagPillProps = {
  tag: string;
};

export function TagPill({ tag }: TagPillProps) {
  return (
    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">
      #{tag}
    </span>
  );
}
