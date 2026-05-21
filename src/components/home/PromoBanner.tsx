import Link from 'next/link';

export function PromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-orange-400 to-rose-400 px-6 py-5 shadow-lg shadow-orange-100">
      {/* スポンサーラベル */}
      <span className="absolute left-4 top-3 rounded-full bg-white/30 px-2 py-0.5 text-[10px] font-black tracking-widest text-white">
        PR
      </span>

      <div className="mt-3 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        {/* テキスト */}
        <div className="space-y-1">
          <p className="text-xl font-black leading-snug text-white sm:text-2xl">
            あなたの「あるある」、みんなに共感してもらおう！
          </p>
          <p className="text-sm font-bold text-orange-100">
            職業・動物・趣味など、どんなジャンルでも投稿できます。今すぐ無料で参加しよう。
          </p>
        </div>

        {/* CTAボタン */}
        <Link
          href="/submit"
          className="shrink-0 rounded-2xl bg-white px-6 py-3 text-sm font-black text-orange-500 shadow-md hover:bg-orange-50 active:scale-95"
        >
          ✎ あるあるを投稿する
        </Link>
      </div>
    </div>
  );
}
