import Link from 'next/link';

export function HomeHero() {
  return (
    <section className="relative grid items-center gap-8 overflow-hidden rounded-[40px] border border-white/80 bg-gradient-to-br from-[#fff1d5] via-white to-[#ffeef4] p-6 shadow-[0_24px_70px_rgba(251,146,60,0.16)] ring-1 ring-orange-100/60 md:grid-cols-[1.1fr_0.9fr] md:p-10">
      <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-black text-orange-500 shadow-sm ring-1 ring-orange-100">
          <span className="h-2 w-2 rounded-full bg-orange-400" />
          みんなの共感ランキング
        </p>
        <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
          あるあるで、
          <br />ちょっと笑える毎日へ。
        </h1>
        <p className="mt-5 max-w-xl text-base font-bold leading-8 text-slate-600 sm:text-lg">
          職業、学校、動物、日常の「わかる！」を投稿・閲覧・ランキング化。まずは人気のあるあるを眺めてみよう。
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/ranking" className="inline-flex justify-center rounded-full bg-gradient-to-r from-orange-400 to-rose-400 px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-300/40 hover:-translate-y-0.5 hover:shadow-orange-300/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300">
            ランキングを見る
          </Link>
          <Link href="/submit" className="inline-flex justify-center rounded-full border border-orange-100 bg-white px-7 py-3.5 text-sm font-black text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-orange-200 hover:text-orange-500 hover:shadow-md">
            あるあるを投稿する
          </Link>
        </div>
      </div>

      <div className="relative min-h-72 rounded-[34px] border border-orange-100/70 bg-white/82 p-6 shadow-inner shadow-orange-100/60">
        <div className="absolute left-6 top-6 rotate-[-5deg] rounded-full bg-rose-100 px-4 py-2 text-sm font-black text-rose-600 shadow-sm">それなw</div>
        <div className="absolute right-7 top-20 rotate-3 rounded-full bg-sky-100 px-4 py-2 text-sm font-black text-sky-600 shadow-sm">わかる〜</div>
        <div className="absolute bottom-7 left-10 rotate-[-2deg] rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-700 shadow-sm">あるある！</div>
        <div className="mx-auto mt-10 grid h-40 w-40 place-items-center rounded-full bg-gradient-to-br from-orange-100 to-rose-100 text-6xl shadow-lg shadow-orange-100/80 ring-8 ring-white/80">💬</div>
        <div className="mx-auto -mt-3 h-20 w-56 rounded-[999px] bg-orange-100/70 blur-[1px]" />
      </div>
    </section>
  );
}
