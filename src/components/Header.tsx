import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-amber-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 p-4">
        <Link href="/" className="text-lg font-bold text-orange-500">あるあるランキング</Link>
        <nav className="hidden gap-4 text-sm md:flex">
          <Link href="/">ホーム</Link><Link href="/c/nurse">カテゴリ</Link><a>ランキング</a><a>新着</a>
        </nav>
        <button className="rounded-full bg-orange-400 px-4 py-2 text-sm font-semibold text-white">投稿する</button>
      </div>
    </header>
  );
}
