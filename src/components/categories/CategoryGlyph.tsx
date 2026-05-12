type CategoryGlyphProps = {
  iconKey: string | null | undefined;
  className?: string;
};

const iconMap: Record<string, string> = {
  nurse: '🏥',
  care: '🤝',
  beauty: '✂️',
  sales: '💼',
  food: '🍴',
  factory: '🏭',
  truck: '🚚',
  animal: '🐾',
  cat: '🐈',
  student: '🎓',
};

export function CategoryGlyph({ iconKey, className = 'h-14 w-14 text-3xl' }: CategoryGlyphProps) {
  const icon = iconKey ? iconMap[iconKey] : undefined;

  return (
    <div className={`grid place-items-center rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/70 ring-1 ring-white/80 ${className}`}>
      <span aria-hidden>{icon ?? '✨'}</span>
    </div>
  );
}
