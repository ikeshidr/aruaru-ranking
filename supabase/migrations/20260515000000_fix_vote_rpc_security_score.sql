-- ===================================================
-- Fix 1: RLS bypass (votes_anyone_insert を廃止)
-- ===================================================
drop policy if exists "votes_anyone_insert" on public.votes;
revoke insert, update, delete on public.votes from anon, authenticated;

-- ===================================================
-- Fix 2: vote_post RPC 再定義
--   - SQL構文エラー修正 (and キーワード追加, エイリアス削除)
--   - score を wakaru_count * 2 で更新
-- ===================================================
create or replace function public.vote_post(
  p_post_id uuid,
  p_visitor_id text
)
returns table (vote_count integer, already_voted boolean)
language plpgsql
security definer
set search_path = public
as $$
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
      and status = 'approved'
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

revoke all on function public.vote_post(uuid, text) from public;
grant execute on function public.vote_post(uuid, text) to anon, authenticated;

-- ===================================================
-- Fix 3: 既存データの score をバックフィル
-- ===================================================
update public.posts
set score = wakaru_count * 2
where score = 0 and wakaru_count > 0;
