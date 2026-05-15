import Link from 'next/link';

const socialLinks = [
  {
    label: 'X',
    href: '#',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'YouTube',
    href: '#',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
];

export function Footer() {
  return (
    <footer className="mt-10 border-t border-amber-100 bg-white px-6 py-8 text-sm font-medium text-text-muted">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 md:flex-row md:justify-between">
        <Link href="/" aria-label="ホーム" className="text-2xl font-black text-primary">
          あるあるランキング
        </Link>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/terms" className="hover:text-primary">利用規約</Link>
          <Link href="/privacy" className="hover:text-primary">プライバシーポリシー</Link>
          <Link href="/guidelines" className="hover:text-primary">ガイドライン</Link>
          <Link href="/contact" className="hover:text-primary">お問い合わせ</Link>
        </div>
        <div className="flex items-center gap-2">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-text-muted transition hover:bg-primary hover:text-white"
            >
              <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={social.path} />
              </svg>
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-5 max-w-7xl text-center text-xs font-normal">
        © 2026 あるあるランキング
      </div>
    </footer>
  );
}
