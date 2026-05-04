type RankMedalProps = {
  rank: number;
  mini?: boolean;
};

export function RankMedal({ rank, mini = false }: RankMedalProps) {
  const sizeClass = mini ? 'h-9 w-9 rounded-xl text-sm' : 'h-12 w-12 rounded-2xl text-lg';
  const colorClass =
    rank === 1
      ? 'bg-[#f5bf17] text-white'
      : rank === 2
        ? 'bg-[#9fb2c9] text-white'
        : rank === 3
          ? 'bg-[#ef9a45] text-white'
          : 'bg-slate-100 text-slate-500';

  return (
    <div className={`relative grid place-items-center font-black shadow-sm ${sizeClass} ${colorClass}`}>
      {!mini && rank === 1 ? <span className="absolute -top-3 text-[14px]">👑</span> : null}
      {rank}
    </div>
  );
}
