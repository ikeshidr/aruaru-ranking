import Link from 'next/link';

const navItems = [
  { label: 'ホーム', href: '/', icon: '⌂' },
  { label: 'カテゴリ', href: '/categories', icon: '▦' },
  { label: 'ランキング', href: '/ranking', icon: '♕' },
  { label: '新着', href: '/#latest', icon: '◴' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-orange-100/80 bg-white/95 shadow-sm shadow-orange-100/30 backdrop-blur">
      <div className="mx-auto max-w-[1160px] px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap lg:justify-between">
          <Link href="/" className="group flex min-w-0 items-center gap-2 text-[22px] font-black tracking-tight text-orange-500 sm:text-2xl">
            <span className="relative whitespace-nowrap drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
              あるあるランキング
              <span aria-hidden className="absolute -right-5 -top-3 rotate-12 text-lg text-amber-400 transition group-hover:-translate-y-0.5">
                ♛
              </span>
            </span>
          </Link>

          <nav className="order-3 flex w-full gap-2 overflow-x-auto text-sm font-black text-slate-800 lg:order-2 lg:w-auto lg:justify-center">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex shrink-0 items-center gap-1.5 border-b-2 px-2.5 py-2 transition hover:border-orange-500 hover:text-orange-500 ${
                  index === 0 ? 'border-orange-500 text-orange-500' : 'border-transparent'
                }`}
              >
                <span aria-hidden>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="order-2 ml-auto flex items-center gap-2 lg:order-3">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-rose-500 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-orange-200/80 hover:-translate-y-0.5"
            >
              <span aria-hidden>✎</span>
              投稿する
            </Link>
            <label className="relative hidden md:block">
              <span className="sr-only">キーワードで検索</span>
              <input
                className="w-56 rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-bold outline-none ring-orange-200 placeholder:text-slate-400 focus:border-orange-200 focus:ring-2"
                placeholder="キーワードで検索"
              />
              <span aria-hidden className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700">
                ⌕
              </span>
            </label>
          </div>
        </div>
      </div>
    </header>
  );
}
