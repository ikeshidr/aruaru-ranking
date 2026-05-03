import { supabaseClient } from '@/lib/supabase/client';

export async function getPublishedCategories() {
  const { data, error } = await supabaseClient
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
