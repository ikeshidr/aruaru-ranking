import Link from 'next/link';

const navItems = [
  { label: 'ランキング', href: '/ranking' },
  { label: 'カテゴリー一覧', href: '/categories' },
  { label: '投稿する', href: '/submit' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-orange-100 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap lg:justify-between">
          <div className="min-w-0">
            <Link href="/" className="block text-xl font-black tracking-tight text-orange-500">
              あるあるランキング
            </Link>
            <p className="text-xs font-bold text-slate-500">みんなの『あるある』で毎日もっと楽しく！</p>
          </div>

          <nav className="order-3 flex w-full gap-2 overflow-x-auto text-sm font-black text-slate-600 lg:order-2 lg:w-auto lg:justify-center">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-full px-3 py-1.5 hover:bg-orange-50 hover:text-orange-500">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="order-2 ml-auto flex items-center gap-2 lg:order-3">
            <input
              className="hidden w-52 rounded-full border border-orange-100 bg-orange-50/40 px-4 py-2 text-sm font-bold outline-none ring-orange-200 placeholder:text-slate-400 focus:ring-2 md:block"
              placeholder="キーワードで検索"
            />
            <Link href="/submit" className="rounded-full bg-gradient-to-r from-orange-400 to-rose-400 px-4 py-2 text-sm font-black text-white shadow-sm">
              あるあるを投稿する
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
