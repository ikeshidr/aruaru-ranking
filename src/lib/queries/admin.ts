import type { PostgrestError } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';

const PENDING_POST_SELECT = `
  id,
  category_id,
  body,
  author_name,
  status,
  vote_count,
  comment_count,
  tags,
  approved_at,
  rejected_at,
  deleted_at,
  created_at,
  updated_at,
  categories (
    id,
    slug,
    name,
    title,
    group_name
  )
`;

function throwQueryError(error: PostgrestError | null, context: string) {
  if (error) throw new Error(`${context}: ${error.message}`);
}

export async function getCurrentAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');

  if (adminError) {
    console.error('Failed to check admin user', adminError);
    return null;
  }

  return isAdmin ? user : null;
}

export async function getPendingPostsForAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(PENDING_POST_SELECT)
    .eq('status', 'pending')
    .is('deleted_at', null)
    .order('created_at', { ascending: true });

  throwQueryError(error, 'Failed to fetch pending posts');

  return data ?? [];
}
