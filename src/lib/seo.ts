import type { Metadata } from 'next';

export const SITE_NAME = 'あるあるランキング';

export const DEFAULT_SITE_DESCRIPTION =
  '職業・学校・動物・趣味などの「あるある」を投稿・投票・コメントできるランキングサイト';

export function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!siteUrl) {
    return new URL('http://localhost:3000');
  }

  try {
    return new URL(siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`);
  } catch {
    return new URL('http://localhost:3000');
  }
}

export function absoluteUrl(path = '/') {
  return new URL(path, getSiteUrl()).toString();
}

export function createPageMetadata({
  title,
  description,
  path = '/',
  type = 'website',
}: {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'ja_JP',
      type,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export function truncateDescription(text: string, maxLength = 120) {
  const normalized = text.replace(/\s+/g, ' ').trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1)}…`;
}
