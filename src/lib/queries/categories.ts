import { getSupabaseClient } from '@/lib/supabase/client';

export async function getPublishedCategories() {
  const { data, error } = await getSupabaseClient()
    .from('categories')
    .select('*')
    .eq('status', 'active')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}
