-- =========================================================
-- vote_post RPC の "column reference vote_count is ambiguous" を修正
-- OUT カラム名 vote_count が posts.vote_count と衝突するため、
-- PL/pgSQL の名前解決を column 優先に切り替える
-- =========================================================

create or replace function public.vote_post(
  p_post_id uuid,
  p_visitor_id text
)
returns table (vote_count integer, already_voted boolean)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  next_vote_count integer;
  did_insert      boolean;
begin
  if p_visitor_id is null
    or char_length(trim(p_visitor_id)) < 16
    or char_length(p_visitor_id) > 128
  then
    raise exception 'Invalid visitor id' using errcode = '22023';
  end if;

  if not exists (
    select 1
    from public.posts
    where id = p_post_id
      and status::text = 'approved'
      and deleted_at is null
  ) then
    raise exception 'Post is not available for voting' using errcode = 'P0002';
  end if;

  insert into public.votes (post_id, anonymous_id, vote_type)
  values (p_post_id, p_visitor_id, 'wakaru')
  on conflict do nothing;

  did_insert := found;

  if did_insert then
    update public.posts
    set
      vote_count   = vote_count + 1,
      wakaru_count = wakaru_count + 1,
      score        = (wakaru_count + 1) * 2
    where id = p_post_id
    returning public.posts.vote_count into next_vote_count;
  else
    select posts.vote_count into next_vote_count
    from public.posts where id = p_post_id;
  end if;

  return query select next_vote_count, not did_insert;
end;
$$;
