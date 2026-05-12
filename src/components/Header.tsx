import Link from 'next/link';

const navItems = [
  { label: 'ホーム', href: '/', icon: '⌂' },
  { label: 'カテゴリ', href: '/categories', icon: '☷' },
  { label: 'ランキング', href: '/ranking', icon: '♕' },
  { label: '新着', href: '/ranking', icon: '♙' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-orange-100 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap lg:justify-between">
          <Link href="/" className="min-w-0 text-xl font-black tracking-tight text-orange-500 sm:text-2xl">
            あるあるランキング <span className="align-top text-sm text-amber-400">♕</span>
          </Link>

          <nav className="order-3 flex w-full gap-2 overflow-x-auto text-sm font-black text-slate-700 lg:order-2 lg:w-auto lg:justify-center">
            {navItems.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="flex shrink-0 items-center gap-1 whitespace-nowrap border-b-2 border-transparent px-3 py-2 hover:border-orange-500 hover:text-orange-500"
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="order-2 ml-auto flex items-center gap-2 lg:order-3">
            <Link
              href="/submit"
              className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-black text-white shadow-sm shadow-orange-200 transition hover:-translate-y-0.5"
            >
              ✎ 投稿する
            </Link>
            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-400 shadow-sm md:flex">
              <span>キーワードで検索</span>
              <span className="text-slate-800">⌕</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
