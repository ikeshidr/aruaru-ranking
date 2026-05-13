import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-10 border-t border-amber-100 bg-white px-6 py-8 text-center text-sm font-bold text-slate-500">
      <div className="flex flex-wrap justify-center gap-4">
        <span>© 2026 あるあるランキング</span>
        <Link href="/terms" className="hover:text-orange-500">利用規約</Link>
        <Link href="/privacy" className="hover:text-orange-500">プライバシーポリシー</Link>
        <Link href="/guidelines" className="hover:text-orange-500">ガイドライン</Link>
        <Link href="/contact" className="hover:text-orange-500">お問い合わせ</Link>
      </div>
    </footer>
  );
}
