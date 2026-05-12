type RankMedalProps = {
  rank: number;
  mini?: boolean;
};

export function RankMedal({ rank, mini = false }: RankMedalProps) {
  const sizeClass = mini ? 'h-9 w-9 rounded-xl text-sm' : 'h-12 w-12 rounded-2xl text-lg';
  const colorClass =
    rank === 1
      ? 'bg-gradient-to-br from-amber-300 to-orange-400 text-white shadow-amber-200/70'
      : rank === 2
        ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-slate-200/70'
        : rank === 3
          ? 'bg-gradient-to-br from-orange-300 to-rose-400 text-white shadow-orange-200/70'
          : 'bg-gradient-to-br from-slate-50 to-orange-50 text-slate-500 shadow-orange-100/60';

  return (
    <div className={`relative grid shrink-0 place-items-center font-black shadow-lg ring-4 ring-white ${sizeClass} ${colorClass}`}>
      {!mini && rank === 1 ? <span className="absolute -top-4 text-[15px] drop-shadow-sm">👑</span> : null}
      <span className="drop-shadow-sm">{rank}</span>
    </div>
  );
}
