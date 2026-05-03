import { getSupabaseClient } from '@/lib/supabase/client';

export async function getPublishedPostsByCategory(categoryId: string) {
  const { client, error: clientError } = getSupabaseClient();

  if (!client) {
    throw new Error(clientError ?? 'Supabase client is not initialized.');
  }

  const { data, error } = await client
    .from('posts')
    .select('*')
    .eq('category_id', categoryId)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}
