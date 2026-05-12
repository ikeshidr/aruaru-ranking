import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';
import { getSeoSitemapCategories, getSeoSitemapPosts } from '@/lib/queries/seo';

const STATIC_ROUTES = ['/', '/ranking', '/categories', '/submit', '/terms', '/privacy', '/guidelines', '/contact'];

function toLastModified(value: string | null | undefined) {
  return value ? new Date(value) : new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === '/' || route === '/ranking' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));

  let categories: Awaited<ReturnType<typeof getSeoSitemapCategories>> = [];
  let posts: Awaited<ReturnType<typeof getSeoSitemapPosts>> = [];

  try {
    [categories, posts] = await Promise.all([getSeoSitemapCategories(), getSeoSitemapPosts()]);
  } catch {
    // Keep sitemap generation safe during local builds without Supabase env vars.
    // Deployments with Supabase configured include active categories and approved, non-deleted posts.
  }

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/categories/${category.slug}`),
    lastModified: toLastModified(category.updated_at),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/posts/${post.id}`),
    lastModified: toLastModified(post.updated_at ?? post.approved_at ?? post.created_at),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticEntries, ...categoryEntries, ...postEntries];
}
