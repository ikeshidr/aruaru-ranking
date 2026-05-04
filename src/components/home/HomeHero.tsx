import Link from 'next/link';

export function HomeHero() {
  return (
    <section className="grid items-center gap-8 overflow-hidden rounded-[36px] border border-[#f5eadc] bg-gradient-to-br from-[#fff4dd] via-white to-[#fff1f5] p-7 shadow-sm md:grid-cols-[1.1fr_0.9fr] md:p-10">
      <div>
        <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-orange-500 shadow-sm">
          みんなの共感ランキング
        </p>
        <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
          あるあるで、
          <br />ちょっと笑える毎日へ。
        </h1>
        <p className="mt-5 max-w-xl text-base font-bold leading-8 text-slate-600">
          職業、学校、動物、日常の「わかる！」を投稿・閲覧・ランキング化。まずは人気のあるあるを眺めてみよう。
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/ranking" className="rounded-full bg-gradient-to-r from-orange-400 to-rose-400 px-6 py-3 text-sm font-black text-white shadow-sm">
            ランキングを見る
          </Link>
          <Link href="/submit" className="rounded-full bg-white px-6 py-3 text-sm font-black text-slate-700 shadow-sm">
            あるあるを投稿する
          </Link>
        </div>
      </div>

      <div className="relative min-h-72 rounded-[32px] bg-white p-6 shadow-inner">
        <div className="absolute left-6 top-6 rounded-full bg-rose-100 px-4 py-2 text-sm font-black text-rose-600">それなw</div>
        <div className="absolute right-7 top-20 rounded-full bg-sky-100 px-4 py-2 text-sm font-black text-sky-600">わかる〜</div>
        <div className="absolute bottom-7 left-10 rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-700">あるある！</div>
        <div className="mx-auto mt-10 grid h-40 w-40 place-items-center rounded-full bg-gradient-to-br from-orange-100 to-rose-100 text-6xl shadow-sm">💬</div>
        <div className="mx-auto -mt-3 h-20 w-56 rounded-[999px] bg-orange-100/70" />
      </div>
    </section>
  );
}
