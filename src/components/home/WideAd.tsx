import Link from 'next/link';
import Script from 'next/script';

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? '';

type WideAdProps = {
  /** 広告枠の AdSense data-ad-slot 値 */
  adSlot?: string;
  label?: string;
  variant?: 'horizontal' | 'vertical';
  className?: string;
};

/**
 * 広告枠コンポーネント
 *
 * - NEXT_PUBLIC_ADSENSE_CLIENT_ID が設定済み → AdSense 広告を描画
 * - 未設定（開発環境等） → 自社プロモのダミーバナーを描画
 */
export function WideAd({
  adSlot,
  label = '広告',
  variant = 'horizontal',
  className = '',
}: WideAdProps) {
  const isProduction = Boolean(ADSENSE_CLIENT_ID);
  const heightClass = variant === 'vertical' ? 'min-h-[600px]' : 'min-h-[90px]';

  if (isProduction && adSlot) {
    return (
      <>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <div
          aria-label={`広告枠: ${label}`}
          className={`overflow-hidden rounded-[24px] ${heightClass} ${className}`}
        >
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={ADSENSE_CLIENT_ID}
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
            }}
          />
        </div>
      </>
    );
  }

  // フォールバック: 自社プロモのダミーバナー
  if (variant === 'vertical') {
    return (
      <Link
        href="/submit"
        className={[
          'flex flex-col items-center justify-center gap-3 rounded-[24px]',
          'border border-primary-light bg-primary-soft p-6 text-center',
          'transition hover:bg-primary-light',
          heightClass,
          className,
        ].join(' ')}
      >
        <span aria-hidden="true" className="text-5xl">✨</span>
        <p className="text-2xl font-black leading-snug text-text">
          あるあるを<br />投稿しよう
        </p>
        <p className="text-sm font-medium text-text-muted">無料で参加できます</p>
        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary px-5 py-2.5 text-sm font-black text-white shadow-sm">
          今すぐ投稿 →
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/submit"
      className={[
        'flex items-center justify-between gap-4 rounded-[24px]',
        'border border-amber-100 bg-gradient-to-r from-amber-100 to-orange-50',
        'px-5 py-4 transition hover:from-amber-200 hover:to-orange-100',
        heightClass,
        className,
      ].join(' ')}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span aria-hidden="true" className="shrink-0 text-2xl">🏆</span>
        <p className="truncate text-sm font-bold leading-snug text-text sm:text-base">
          みんなの「あるある」を投稿して、ランキング上位を目指そう！
        </p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-black text-white shadow-sm">
        投稿する →
      </span>
    </Link>
  );
}
