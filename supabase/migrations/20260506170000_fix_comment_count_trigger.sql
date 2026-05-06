-- =========================================================
-- Phase 5: keep posts.comment_count in sync with published comments
-- =========================================================

create or replace function public.refresh_post_comment_count(target_post_id uuid)
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
    where post_id = target_post_id
      and status = 'published'
  )
  where id = target_post_id;
end;
$$;

create or replace function public.handle_comments_comment_count()
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
    perform public.refresh_post_comment_count(old.post_id);
    perform public.refresh_post_comment_count(new.post_id);
    return new;
  end if;

  return null;
end;
$$;

drop trigger if exists comments_comment_count_sync on public.comments;

create trigger comments_comment_count_sync
after insert or update or delete on public.comments
for each row
execute function public.handle_comments_comment_count();

update public.posts as p
set comment_count = counts.actual_comment_count
from (
  select
    p.id as post_id,
    count(c.id)::int as actual_comment_count
  from public.posts as p
  left join public.comments as c
    on c.post_id = p.id
    and c.status = 'published'
  group by p.id
) as counts
where p.id = counts.post_id;
