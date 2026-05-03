import { getSupabaseClient } from '@/lib/supabase/client';

export async function getPublishedCategories() {
  const { client, error: clientError } = getSupabaseClient();

  if (!client) {
    throw new Error(clientError ?? 'Supabase client is not initialized.');
  }

  const { data, error } = await client
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
