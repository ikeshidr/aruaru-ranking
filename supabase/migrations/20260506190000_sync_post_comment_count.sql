-- =========================================================
-- Phase 5: synchronize posts.comment_count from published comments
-- =========================================================

create or replace function public.refresh_post_comment_count(p_post_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.posts
  set comment_count = (
    select count(*)::int
    from public.comments
    where post_id = p_post_id
      and status = 'published'
  )
  where id = p_post_id;
end;
$$;

create or replace function public.sync_post_comment_count_from_comment()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    perform public.refresh_post_comment_count(new.post_id);
    return new;
  end if;

  if tg_op = 'DELETE' then
    perform public.refresh_post_comment_count(old.post_id);
    return old;
  end if;

  if tg_op = 'UPDATE' then
    if old.post_id is distinct from new.post_id then
      perform public.refresh_post_comment_count(old.post_id);
      perform public.refresh_post_comment_count(new.post_id);
    else
      perform public.refresh_post_comment_count(new.post_id);
    end if;

    return new;
  end if;

  return null;
end;
$$;

-- Drop older Phase 5 trigger variants so exactly one comment-count sync trigger runs.
drop trigger if exists comments_comment_count_sync on public.comments;
drop trigger if exists comments_sync_post_comment_count on public.comments;

create trigger comments_sync_post_comment_count
after insert or delete or update of status, post_id
on public.comments
for each row
execute function public.sync_post_comment_count_from_comment();

update public.posts p
set comment_count = (
  select count(*)::int
  from public.comments c
  where c.post_id = p.id
    and c.status = 'published'
);
