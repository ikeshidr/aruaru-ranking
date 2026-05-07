-- =========================================================
-- Phase 6: public post voting through RPC
-- =========================================================

begin;

-- MVP voting is one vote per public post per anonymous visitor.
-- The legacy unique index included vote_type, so add a post-level guard for
-- the cookie-based anonymous identifier used by the web app.
create unique index if not exists votes_unique_anonymous_post_vote
on public.votes(post_id, anonymous_id)
where anonymous_id is not null;

create or replace function public.vote_post(
  p_post_id uuid,
  p_visitor_id text
)
returns table (
  vote_count integer,
  already_voted boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  next_vote_count integer;
  did_insert boolean;
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
      p.status::text = 'approved'
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
      vote_count = vote_count + 1,
      wakaru_count = wakaru_count + 1
    where id = p_post_id
    returning public.posts.vote_count into next_vote_count;
  else
    select posts.vote_count
    into next_vote_count
    from public.posts
    where id = p_post_id;
  end if;

  return query select next_vote_count, not did_insert;
end;
$$;

revoke all on function public.vote_post(uuid, text) from public;
grant execute on function public.vote_post(uuid, text) to anon, authenticated;

commit;
