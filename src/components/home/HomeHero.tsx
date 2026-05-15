import Image from 'next/image';
import Link from 'next/link';

export function HomeHero() {
  return (
    <section className="relative grid min-h-[420px] items-center gap-6 overflow-hidden rounded-[32px] border border-orange-100 bg-[radial-gradient(circle_at_12%_18%,rgba(255,237,213,0.95)_0,transparent_28%),linear-gradient(115deg,#fffdf7_0%,#fff7e8_50%,#fff0e7_100%)] px-5 py-8 shadow-xl shadow-orange-100/60 sm:px-8 md:grid-cols-[0.95fr_1.05fr] md:px-12 md:py-10">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <span className="absolute left-8 top-8 h-3 w-3 rounded-full bg-amber-300" />
        <span className="absolute left-[49%] top-11 text-2xl text-amber-400">★</span>
        <span className="absolute bottom-16 left-[45%] h-2.5 w-2.5 rotate-45 rounded-sm bg-rose-200" />
        <span className="absolute right-12 top-14 text-2xl text-amber-400">★</span>
        <span className="absolute right-[8%] bottom-12 h-3 w-3 rounded-full bg-sky-200" />
      </div>

      <div className="relative z-10 max-w-2xl py-2">
        <p className="mb-4 inline-flex rounded-full border border-orange-200 bg-white/85 px-4 py-2 text-xs font-black tracking-[0.16em] text-orange-500 shadow-sm">
          MINNA NO ARUARU
        </p>
        <h1 className="text-[2.35rem] font-black leading-[1.18] tracking-tight text-slate-950 sm:text-5xl md:text-[52px]">
          共感して、笑って、
          <br />
          つながる！
          <br />
          みんなの<span className="text-orange-500">「あるある」</span>
          <br className="hidden sm:block" />ランキングサイト
        </h1>
        <p className="mt-5 max-w-xl text-base font-bold leading-8 text-slate-700">
          職業・学校・日常・趣味まで、いろんなジャンルの「あるある」を投稿＆投票して楽しもう！
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 px-7 py-4 text-sm font-black text-white shadow-lg shadow-orange-200/80 hover:-translate-y-0.5"
          >
            ✎ あるあるを投稿する
          </Link>
          <Link
            href="/ranking"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-orange-200 bg-white px-7 py-4 text-sm font-black text-orange-500 shadow-sm hover:-translate-y-0.5 hover:bg-orange-50"
          >
            👑 ランキングを見る
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex min-h-[280px] items-end justify-center md:min-h-[340px]">
        <div className="absolute inset-x-4 bottom-2 h-24 rounded-[999px] bg-orange-100/45 blur-2xl" />
        <Image
          src="/images/home-hero-people.png"
          alt="スマートフォンを見ながらあるあるで盛り上がる人たちのイラスト"
          width={1672}
          height={941}
          priority
          className="relative h-auto max-h-[360px] w-full object-contain object-bottom drop-shadow-[0_18px_28px_rgba(251,146,60,0.14)]"
          sizes="(min-width: 768px) 52vw, 92vw"
        />
      </div>
    </section>
  );
}
