import type { PostgrestError } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';

function throwQueryError(error: PostgrestError | null, context: string) {
  if (error) throw new Error(`${context}: ${error.message}`);
}

export async function getPublicComments(postId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('comments')
    .select('id, post_id, author_name, body, status, deleted_at, created_at, updated_at')
    .eq('post_id', postId)
    .eq('status', 'public')
    .is('deleted_at', null)
    .order('created_at', { ascending: true });

  throwQueryError(error, 'Failed to fetch public comments');
  return data ?? [];
}
