import Image from 'next/image';
import Link from 'next/link';

export function HomeHero() {
  return (
    <section className="px-4 pt-5 sm:pt-6">
      <div className="relative mx-auto max-w-screen-xl overflow-hidden rounded-[28px] bg-primary-soft">
        <Image
          src="/home-hero-people.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="z-0 object-cover object-right opacity-40 md:opacity-100"
        />

        <div className="relative z-10 max-w-full p-8 md:max-w-[480px] md:p-12">
          <h1 className="text-2xl font-black leading-[1.3] md:text-[26px]">
            <span className="block">
              みんなの
              <span className="text-primary">「あるあるw」</span>
              が
            </span>
            <span className="block">集まる共感ランキングサイト</span>
          </h1>
          <p className="mt-5 text-base font-medium text-text-muted">
            仕事・学校・日常・趣味まで、いろんな「あるある」を投稿・共感して、みんなで楽しもう！
          </p>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', marginTop: '24px' }}>
            <Link
              style={{ flexShrink: 0 }}
              href="/submit"
              className="inline-flex w-auto items-center gap-2 rounded-full bg-[linear-gradient(135deg,#FF8C42_0%,#FF6420_100%)] px-6 py-3 text-sm font-black text-white shadow-card transition hover:opacity-95"
            >
              <span aria-hidden="true" className="text-lg leading-none">＋</span>
              あるあるを投稿する
            </Link>
            <Link
              style={{ flexShrink: 0 }}
              href="/categories"
              className="inline-flex w-auto items-center gap-2 rounded-full border-2 border-primary bg-white px-6 py-3 text-sm font-black text-primary transition hover:bg-primary-soft"
            >
              <span aria-hidden="true" className="text-base leading-none">🏆</span>
              人気カテゴリを見る
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
