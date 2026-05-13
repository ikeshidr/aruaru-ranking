import type { ReactNode } from 'react';
import Link from 'next/link';

function SpeechBubble({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[50%] border border-slate-200 bg-white px-4 py-3 text-center text-xs font-black leading-5 text-slate-800 shadow-sm sm:text-sm ${className}`}>
      {children}
      <span className="absolute bottom-[-7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-slate-200 bg-white" />
    </div>
  );
}

function Character({ face, color, accent, tall = false }: { face: string; color: string; accent: string; tall?: boolean }) {
  return (
    <div className="relative flex min-w-0 flex-1 flex-col items-center justify-end">
      <div className={`relative z-10 grid ${tall ? 'h-24 w-24 sm:h-28 sm:w-28' : 'h-20 w-20 sm:h-24 sm:w-24'} place-items-center rounded-full ${accent} text-5xl shadow-inner sm:text-6xl`}>
        {face}
      </div>
      <div className={`-mt-3 w-full max-w-[132px] rounded-t-[46px] ${tall ? 'h-28' : 'h-24'} ${color} shadow-sm`} />
      <div className="absolute bottom-7 z-20 h-12 w-8 rounded-lg border border-slate-200 bg-slate-700 shadow-sm before:absolute before:left-1/2 before:top-1 before:h-1 before:w-3 before:-translate-x-1/2 before:rounded-full before:bg-slate-500" />
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-[30px] border border-orange-100 bg-white p-6 shadow-xl shadow-orange-100/70 sm:p-9 lg:p-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_2%_12%,#fff1d6_0,transparent_15%),radial-gradient(circle_at_97%_14%,#e0f2fe_0,transparent_18%),radial-gradient(circle_at_96%_88%,#ffe4f1_0,transparent_20%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <span className="absolute left-10 top-8 text-xl text-amber-300">✦</span>
        <span className="absolute left-[50%] top-12 text-xl text-amber-400">★</span>
        <span className="absolute bottom-20 left-[48%] h-2.5 w-2.5 rotate-45 rounded-sm bg-rose-200" />
        <span className="absolute right-36 top-9 text-2xl text-amber-400">★</span>
        <span className="absolute right-8 top-40 h-3 w-3 rounded-full bg-sky-200" />
        <span className="absolute bottom-10 left-7 h-3 w-3 rotate-45 rounded-sm bg-orange-100" />
      </div>

      <div className="relative z-10 grid min-h-[350px] items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <h1 className="text-[34px] font-black leading-[1.28] tracking-tight text-slate-950 sm:text-5xl lg:text-[48px]">
            みんなの<span className="text-orange-500">“あるあるw”</span>が
            <br />
            集まる共感ランキングサイト
          </h1>
          <p className="mt-5 whitespace-pre-line text-base font-black leading-8 text-slate-700 sm:text-lg">
            職業別・趣味別・動物あるあるまで、{`\n`}投稿して投票して楽しもう
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-rose-500 px-7 py-4 text-sm font-black text-white shadow-lg shadow-orange-200/80 hover:-translate-y-0.5 sm:text-base"
            >
              ✎ あるあるを投稿する
            </Link>
            <Link
              href="/#popular-categories"
              className="inline-flex items-center gap-2 rounded-full border-2 border-sky-400 bg-white px-7 py-4 text-sm font-black text-sky-600 shadow-sm hover:-translate-y-0.5 hover:bg-sky-50 sm:text-base"
            >
              人気カテゴリを見る 〉
            </Link>
          </div>
        </div>

        <div className="relative min-h-[310px] overflow-hidden rounded-[28px] bg-white/20 lg:min-h-[330px]">
          <SpeechBubble className="absolute left-1 top-8 z-20 sm:left-8">めっちゃ<br />わかる〜!</SpeechBubble>
          <SpeechBubble className="absolute left-[42%] top-1 z-20">それな〜w</SpeechBubble>
          <SpeechBubble className="absolute right-0 top-12 z-20 sm:right-5">あるある!</SpeechBubble>
          <div className="absolute left-[35%] top-24 z-20 grid h-12 w-12 place-items-center rounded-full border border-orange-100 bg-white text-xl text-orange-500 shadow-sm sm:h-14 sm:w-14 sm:text-2xl">👍</div>
          <div className="absolute right-[30%] top-28 z-20 grid h-14 w-14 place-items-center rounded-full border border-amber-100 bg-white text-2xl shadow-sm sm:h-16 sm:w-16 sm:text-3xl">♛</div>
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-2 px-1 sm:gap-3">
            <Character face="👨🏻" accent="bg-sky-100" color="bg-sky-400" />
            <Character face="👩🏻" accent="bg-amber-100" color="bg-amber-300" tall />
            <Character face="👩🏻‍🦰" accent="bg-rose-100" color="bg-rose-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
