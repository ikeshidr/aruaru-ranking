import type { PostgrestError } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';

function throwQueryError(error: PostgrestError | null, context: string) {
  if (error) throw new Error(`${context}: ${error.message}`);
}

export async function getSeoSitemapCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('categories')
    .select('slug, updated_at')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  throwQueryError(error, 'Failed to fetch sitemap categories');

  return data ?? [];
}

export async function getSeoSitemapPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts')
    .select('id, updated_at, approved_at, created_at')
    .eq('status', 'approved')
    .is('deleted_at', null)
    .order('updated_at', { ascending: false });

  throwQueryError(error, 'Failed to fetch sitemap posts');

  return data ?? [];
}
