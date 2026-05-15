'use client';

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
          <Link href="/" className="group flex min-w-0 items-center gap-2 text-2xl font-black tracking-tight text-primary">
            <span className="relative whitespace-nowrap">
              あるあるランキング
              <span aria-hidden className="absolute -right-5 -top-3 rotate-12 text-lg text-amber-400 transition group-hover:-translate-y-0.5">
                ♛
              </span>
            </span>
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
            <label className="relative hidden md:block">
              <span className="sr-only">キーワードで検索</span>
              <input
                className="w-56 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-bold outline-none ring-orange-200 placeholder:text-slate-400 focus:border-orange-200 focus:ring-2"
                placeholder="キーワードで検索"
              />
              <span aria-hidden className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                🔍
              </span>
            </label>
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
