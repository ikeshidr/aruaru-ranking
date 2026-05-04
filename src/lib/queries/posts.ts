import type { PostgrestError } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';

export type CategoryPostSort = 'popular' | 'new' | 'commented';

const POST_WITH_CATEGORY_SELECT = `
  id,
  category_id,
  body,
  author_name,
  status,
  vote_count,
  comment_count,
  tags,
  approved_at,
  deleted_at,
  created_at,
  updated_at,
  categories (
    id,
    slug,
    name,
    title,
    group_name,
    description,
    icon_key,
    tags,
    sort_order
  )
`;

function throwQueryError(error: PostgrestError | null, context: string) {
  if (error) throw new Error(`${context}: ${error.message}`);
}

export async function getApprovedPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts')
    .select(POST_WITH_CATEGORY_SELECT)
    .eq('status', 'approved')
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  throwQueryError(error, 'Failed to fetch approved posts');
  return data ?? [];
}

export async function getRankingPosts(limit?: number) {
  const supabase = await createClient();

  let query = supabase
    .from('posts')
    .select(POST_WITH_CATEGORY_SELECT)
    .eq('status', 'approved')
    .is('deleted_at', null)
    .order('vote_count', { ascending: false })
    .order('created_at', { ascending: false });

  if (typeof limit === 'number' && limit > 0) query = query.limit(limit);

  const { data, error } = await query;
  throwQueryError(error, 'Failed to fetch ranking posts');
  return data ?? [];
}

export async function getCategoryPosts(categoryId: string, sort: CategoryPostSort = 'popular') {
  const supabase = await createClient();

  let query = supabase
    .from('posts')
    .select(POST_WITH_CATEGORY_SELECT)
    .eq('category_id', categoryId)
    .eq('status', 'approved')
    .is('deleted_at', null);

  if (sort === 'new') {
    query = query.order('created_at', { ascending: false });
  } else if (sort === 'commented') {
    query = query.order('comment_count', { ascending: false }).order('created_at', { ascending: false });
  } else {
    query = query.order('vote_count', { ascending: false }).order('created_at', { ascending: false });
  }

  const { data, error } = await query;
  throwQueryError(error, 'Failed to fetch category posts');
  return data ?? [];
}

export async function getPostDetail(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts')
    .select(POST_WITH_CATEGORY_SELECT)
    .eq('id', id)
    .eq('status', 'approved')
    .is('deleted_at', null)
    .maybeSingle();

  throwQueryError(error, 'Failed to fetch post detail');
  return data ?? null;
}
