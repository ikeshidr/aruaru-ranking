import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-14 border-t border-amber-100/80 bg-white/82 px-6 py-10 text-center text-sm font-bold text-slate-500 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <div className="text-left sm:text-center">
          <p className="font-black text-orange-500">あるあるランキング</p>
          <p className="mt-1 text-xs text-slate-400">© 2026 あるあるランキング</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link href="/terms" className="hover:text-orange-500">利用規約</Link>
          <Link href="/privacy" className="hover:text-orange-500">プライバシーポリシー</Link>
          <Link href="/guidelines" className="hover:text-orange-500">ガイドライン</Link>
          <Link href="/contact" className="hover:text-orange-500">お問い合わせ</Link>
        </div>
      </div>
    </footer>
  );
}
