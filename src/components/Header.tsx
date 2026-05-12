import Link from 'next/link';

const navItems = [
  { label: 'ランキング', href: '/ranking' },
  { label: 'カテゴリー一覧', href: '/categories' },
  { label: '投稿する', href: '/submit' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-orange-100/80 bg-white/88 shadow-sm shadow-orange-100/30 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-3.5">
        <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap lg:justify-between">
          <div className="min-w-0">
            <Link href="/" className="group inline-flex items-center gap-2 text-xl font-black tracking-tight text-orange-500">
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-orange-300 to-rose-300 text-base text-white shadow-md shadow-orange-200/70 group-hover:scale-105">あ</span>
              <span>あるあるランキング</span>
            </Link>
            <p className="mt-0.5 text-xs font-bold text-slate-500">みんなの『あるある』で毎日もっと楽しく！</p>
          </div>

          <nav className="order-3 -mx-1 flex w-full gap-2 overflow-x-auto px-1 text-sm font-black text-slate-600 lg:order-2 lg:mx-0 lg:w-auto lg:justify-center lg:px-0">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-full px-4 py-2 hover:bg-orange-50 hover:text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="order-2 ml-auto flex items-center gap-2 lg:order-3">
            <input
              className="hidden w-52 rounded-full border border-orange-100 bg-orange-50/50 px-4 py-2.5 text-sm font-bold outline-none ring-orange-200 placeholder:text-slate-400 focus:border-orange-200 focus:ring-2 md:block"
              placeholder="キーワードで検索"
            />
            <Link href="/submit" className="rounded-full bg-gradient-to-r from-orange-400 to-rose-400 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-orange-300/35 hover:-translate-y-0.5 hover:shadow-orange-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300">
              あるあるを投稿する
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
