type RankMedalProps = {
  rank: number;
};

export function RankMedal({ rank }: RankMedalProps) {
  if (rank > 3) {
    return (
      <div className="relative grid h-11 w-11 place-items-center rounded-full bg-gray-100 text-sm font-black text-gray-500">
        {rank}
      </div>
    );
  }

  const gradient =
    rank === 1
      ? 'var(--medal-gold)'
      : rank === 2
        ? 'var(--medal-silver)'
        : 'var(--medal-bronze)';

  return (
    <div
      className="relative grid h-11 w-11 place-items-center rounded-full font-black text-white shadow-md"
      style={{ background: gradient }}
    >
      {rank === 1 ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-3.5 left-1/2 -translate-x-1/2 text-sm leading-none"
        >
          👑
        </span>
      ) : null}
      {rank}
    </div>
  );
}
