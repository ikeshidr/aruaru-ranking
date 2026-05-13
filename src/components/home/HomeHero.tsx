import Link from 'next/link';

export function HomeHero() {
  return (
    <section className="relative grid min-h-[390px] items-center gap-8 overflow-hidden rounded-[34px] border border-orange-100 bg-[radial-gradient(circle_at_8%_18%,#fff0d6_0,transparent_24%),linear-gradient(120deg,#fffdf8_0%,#fff8ed_48%,#fff0f5_100%)] p-7 shadow-xl shadow-orange-100/60 md:grid-cols-[1.08fr_0.92fr] md:p-12">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <span className="absolute left-8 top-8 h-3 w-3 rounded-full bg-amber-300" />
        <span className="absolute left-[52%] top-11 text-2xl text-amber-400">★</span>
        <span className="absolute bottom-16 left-[47%] h-2.5 w-2.5 rotate-45 rounded-sm bg-rose-200" />
        <span className="absolute right-12 top-14 text-2xl text-amber-400">★</span>
      </div>

      <div className="relative z-10">
        <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl md:text-[54px]">
          みんなの
          <span className="text-orange-500">「あるあるw」</span>が
          <br />
          集まる共感ランキングサイト
        </h1>
        <p className="mt-5 max-w-2xl text-base font-bold leading-8 text-slate-700">
          仕事・学校・日常・趣味まで、いろんな「あるある」を投稿・共感して、みんなで楽しもう！
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/ranking"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-7 py-4 text-sm font-black text-white shadow-lg shadow-orange-200/80 hover:-translate-y-0.5"
          >
            🏆 ランキングを見る
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 rounded-full border-2 border-sky-400 bg-white px-7 py-4 text-sm font-black text-sky-600 shadow-sm hover:-translate-y-0.5 hover:bg-sky-50"
          >
            ✎ あるあるを投稿する
          </Link>
        </div>
      </div>

      <div className="relative z-10 min-h-[300px] rounded-[30px] bg-white/40 p-4">
        <div className="absolute left-6 top-8 rounded-[50%] border border-slate-200 bg-white px-5 py-3 text-center text-sm font-black text-slate-700 shadow-sm">
          めっちゃ
          <br />わかる〜!
        </div>
        <div className="absolute right-20 top-2 rounded-[50%] border border-slate-200 bg-white px-5 py-3 text-center text-sm font-black text-slate-700 shadow-sm">
          それな〜w
        </div>
        <div className="absolute right-3 top-24 rounded-[50%] border border-sky-100 bg-white px-5 py-3 text-center text-sm font-black text-slate-700 shadow-sm">
          あるある!
        </div>
        <div className="absolute left-[42%] top-24 grid h-14 w-14 place-items-center rounded-full border border-orange-100 bg-white text-2xl text-orange-500 shadow-sm">
          👍
        </div>
        <div className="absolute right-24 top-28 grid h-16 w-16 place-items-center rounded-full border border-amber-100 bg-white text-3xl shadow-sm">
          👑
        </div>
        <div className="absolute bottom-0 left-4 right-4 grid grid-cols-3 items-end gap-2">
          <div className="mx-auto w-full max-w-[130px] text-center">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-sky-100 text-6xl shadow-inner">👨🏻</div>
            <div className="-mt-3 h-24 rounded-t-[44px] bg-sky-400" />
          </div>
          <div className="mx-auto w-full max-w-[142px] text-center">
            <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-amber-100 text-7xl shadow-inner">👩🏻</div>
            <div className="-mt-3 h-28 rounded-t-[48px] bg-amber-300" />
          </div>
          <div className="mx-auto w-full max-w-[130px] text-center">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-rose-100 text-6xl shadow-inner">👩🏻‍🦰</div>
            <div className="-mt-3 h-24 rounded-t-[44px] bg-rose-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
