import { supabaseClient } from '@/lib/supabase/client';

export async function getPublishedPostsByCategory(categoryId: string) {
  const { data, error } = await supabaseClient
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
