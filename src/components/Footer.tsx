import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-10 border-t border-amber-100 bg-white px-6 py-8 text-sm font-bold text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 md:flex-row md:justify-between">
        <Link href="/" className="text-2xl font-black text-orange-500">
          あるあるランキング <span className="align-top text-sm text-amber-400">♕</span>
        </Link>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/terms" className="hover:text-orange-500">利用規約</Link>
          <Link href="/privacy" className="hover:text-orange-500">プライバシーポリシー</Link>
          <Link href="/guidelines" className="hover:text-orange-500">ガイドライン</Link>
          <Link href="/contact" className="hover:text-orange-500">お問い合わせ</Link>
        </div>
        <span>© 2026 Aruaru Ranking</span>
      </div>
    </footer>
  );
}
