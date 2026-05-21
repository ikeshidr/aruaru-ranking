'use client';

import Image from 'next/image';
import { useState } from 'react';

type CategoryGlyphProps = {
  slug: string;
  /** flat = 一覧用フラットアイコン、hero = 個別ページ用ウォーターカラーキャラ */
  variant?: 'flat' | 'hero';
  className?: string;
};

const DEFAULT_FALLBACK = '/icons/categories/default.svg';

export function CategoryGlyph({ slug, variant = 'flat', className }: CategoryGlyphProps) {
  const initialSrc =
    variant === 'hero'
      ? `/icons/categories/${slug}-hero.png`
      : `/icons/categories/${slug}.png`;

  const [src, setSrc] = useState(initialSrc);

  const handleError = () => {
    // hero variant のとき、-hero.png が無ければ通常 .png に降格
    if (variant === 'hero' && src.endsWith('-hero.png')) {
      setSrc(`/icons/categories/${slug}.png`);
      return;
    }
    // 通常 .png も無ければ default.svg に
    if (src !== DEFAULT_FALLBACK) {
      setSrc(DEFAULT_FALLBACK);
    }
  };

  const size = variant === 'hero' ? 160 : 80;

  return (
    <div className={className}>
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        onError={handleError}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
