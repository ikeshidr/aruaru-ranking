import type { ReactNode } from 'react';
import Link from 'next/link';

function Bubble({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div className={`absolute rounded-[999px] border bg-white/90 px-4 py-2 text-sm font-black shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Person({ className, face, body }: { className: string; face: string; body: string }) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-white bg-[#ffe1c8] text-3xl shadow-sm">{face}</div>
      <div className={`-mt-2 h-28 w-24 rounded-t-[42px] ${body} shadow-sm`} />
      <div className="absolute top-24 h-10 w-14 rounded-2xl border border-slate-100 bg-white shadow-sm" />
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-orange-100 bg-white p-6 shadow-xl shadow-orange-100/50 md:p-10 lg:min-h-[360px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_16%,#fff0d7_0_4%,transparent_5%),radial-gradient(circle_at_92%_0%,#e2f4ff_0_11%,transparent_12%),linear-gradient(135deg,#fffaf2,white_42%,#fff1f5)]" />
      <div className="absolute left-6 top-8 h-2 w-2 rounded-full bg-orange-200" />
      <div className="absolute left-10 top-28 h-3 w-3 rotate-45 rounded-sm bg-rose-100" />
      <div className="absolute right-10 top-20 text-2xl text-amber-300">★</div>
      <div className="absolute right-32 bottom-12 h-2 w-2 rounded-full bg-sky-200" />

      <div className="relative grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-black text-orange-500 shadow-sm">
            <span>👑</span> みんなの共感ランキング
          </p>
          <h1 className="text-4xl font-black leading-[1.18] tracking-tight text-slate-950 sm:text-5xl lg:text-[52px]">
            みんなの
            <span className="text-orange-500">「あるあるw」</span>が
            <br />
            集まる共感ランキングサイト
          </h1>
          <p className="mt-5 max-w-xl text-base font-bold leading-8 text-slate-700">
            仕事・学校・日常・趣味まで、いろんな「あるある」を投稿・共感して、みんなで楽しもう！
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-4 text-sm font-black text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:shadow-orange-300"
            >
              <span>✎</span> あるあるを投稿する
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-sky-400 bg-white px-7 py-4 text-sm font-black text-sky-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-50"
            >
              人気カテゴリを見る <span>›</span>
            </Link>
          </div>
        </div>

        <div className="relative hidden min-h-[280px] lg:block">
          <Bubble className="left-6 top-8 border-slate-200 text-slate-700">めっちゃ<br />わかる〜!</Bubble>
          <Bubble className="left-52 top-0 border-slate-200 text-slate-700">それな〜w</Bubble>
          <Bubble className="right-3 top-16 border-sky-100 text-slate-700">あるある!</Bubble>
          <div className="absolute left-28 top-20 grid h-11 w-11 place-items-center rounded-full border-2 border-orange-100 bg-white text-orange-500 shadow-sm">👍</div>
          <div className="absolute right-24 top-28 grid h-14 w-14 place-items-center rounded-full border-2 border-amber-100 bg-white text-2xl shadow-sm">👑</div>
          <div className="absolute bottom-0 right-0 flex items-end gap-4">
            <Person className="translate-y-4" face="😊" body="bg-sky-400" />
            <Person className="z-10" face="😄" body="bg-amber-300" />
            <Person className="translate-y-5" face="☺️" body="bg-rose-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
