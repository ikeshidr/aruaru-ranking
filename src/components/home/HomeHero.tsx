import Image from 'next/image';
import Link from 'next/link';

export function HomeHero() {
  return (
    <section className="px-4 pt-5 sm:pt-6">
      <div className="mx-auto max-w-screen-xl rounded-[28px] bg-[linear-gradient(135deg,#FFF4E6_0%,#FFE8D6_100%)] p-10 md:p-14">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="md:order-2">
            <Image
              src="/hero-illustration.png"
              alt="あるあるを共有する3人のキャラクター"
              width={2172}
              height={724}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-auto w-full"
            />
          </div>

          <div className="md:order-1">
            <h1 className="text-4xl font-black leading-tight md:text-5xl">
              みんなの<span className="text-primary">「あるあるw」</span>が集まる共感ランキングサイト
            </h1>
            <p className="mt-5 text-base text-text-muted">
              仕事・学校・日常・趣味まで、いろんな「あるある」を投稿・共感して、みんなで楽しもう！
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#FF8C42_0%,#FF6420_100%)] px-6 py-3 text-sm font-black text-white shadow-card transition hover:opacity-95"
              >
                <span aria-hidden="true" className="text-lg leading-none">＋</span>
                あるあるを投稿する
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-white px-6 py-3 text-sm font-black text-primary transition hover:bg-primary-soft"
              >
                <span aria-hidden="true" className="text-base leading-none">🏆</span>
                人気カテゴリを見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
