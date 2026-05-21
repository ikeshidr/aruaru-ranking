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
    title,
    group_name
  )
`;

function throwQueryError(error: PostgrestError | null, context: string) {
  if (error) {
    console.error(`${context}:`, error);
    throw new Error('データの取得に失敗しました');
  }
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

const MODERATION_LIMIT = 50;

export async function getPublicPostsForModeration() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(PENDING_POST_SELECT)
    .eq('status', 'approved')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(MODERATION_LIMIT);

  throwQueryError(error, 'Failed to fetch public posts for moderation');

  return data ?? [];
}

export async function getReportCountsByPostId(postIds: string[]) {
  if (postIds.length === 0) return {} as Record<string, number>;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('reports')
    .select('post_id')
    .eq('target_type', 'post')
    .in('post_id', postIds);

  if (error) {
    console.error('Failed to fetch report counts', error);
    return {} as Record<string, number>;
  }

  return (data ?? []).reduce<Record<string, number>>((acc, row) => {
    if (!row.post_id) return acc;
    acc[row.post_id] = (acc[row.post_id] ?? 0) + 1;
    return acc;
  }, {});
}
