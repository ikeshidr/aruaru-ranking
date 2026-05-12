type SidebarAdProps = {
  label?: string;
};

export function SidebarAd({ label = '広告バナー' }: SidebarAdProps) {
  return (
    <div className="grid min-h-[320px] place-items-center rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 text-center text-slate-500 shadow-inner lg:min-h-[360px]">
      <div>
        <p className="text-lg font-black">{label}</p>
        <p className="mt-2 text-base font-bold text-slate-400">（300×600）</p>
      </div>
    </div>
  );
}
