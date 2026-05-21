'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'ホーム', href: '/', icon: '🏠' },
  { label: 'カテゴリ', href: '/categories', icon: '📂' },
  { label: 'ランキング', href: '/ranking', icon: '🏆' },
  { label: '新着', href: '/new', icon: '✨' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-orange-100/80 bg-white/95 shadow-sm shadow-orange-100/30 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap lg:justify-between">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logo.png"
              alt="あるあるランキング"
              width={48}
              height={48}
              priority
              className="h-12 w-12 object-contain"
            />
          </Link>

          <nav className="order-3 flex w-full gap-1 overflow-x-auto text-sm font-bold lg:order-2 lg:w-auto lg:justify-center">
            {navItems.map((item) => {
              const active = isActive(pathname ?? '/', item.href);
              const classes = active
                ? 'bg-primary-light text-primary'
                : 'text-gray-600 hover:bg-primary-soft hover:text-primary';
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 transition ${classes}`}
                >
                  <span aria-hidden>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="order-2 ml-auto flex items-center gap-2 lg:order-3">
            {/* デスクトップ：インライン検索フォーム */}
            <form action="/search" method="get" className="relative hidden md:block">
              <label>
                <span className="sr-only">キーワードで検索</span>
                <input
                  type="search"
                  name="q"
                  className="w-56 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-bold outline-none ring-orange-200 placeholder:text-slate-400 focus:border-orange-200 focus:ring-2"
                  placeholder="キーワードで検索"
                  maxLength={100}
                />
              </label>
              <button type="submit" aria-label="検索" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500">
                🔍
              </button>
            </form>

            {/* モバイル：検索ページへのリンク */}
            <Link
              href="/search"
              aria-label="検索"
              className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-slate-500 hover:border-orange-200 hover:text-orange-500 md:hidden"
            >
              🔍
            </Link>

            <Link
              href="/submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-orange-200/70 hover:-translate-y-0.5"
            >
              <span aria-hidden>✎</span>
              投稿する
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
