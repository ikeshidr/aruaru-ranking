import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const hasSiteUrl = Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/login'],
      },
    ],
    sitemap: hasSiteUrl ? absoluteUrl('/sitemap.xml') : undefined,
  };
}
