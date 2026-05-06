-- =========================================================
-- Phase 5: synchronize posts.comment_count from public comments
-- =========================================================

alter table public.comments
  alter column status drop default;

alter table public.comments
  drop constraint if exists comments_status_check;

update public.comments
set status = 'public'
where status = 'published';

alter table public.comments
  add constraint comments_status_check
  check (status in ('public', 'hidden', 'deleted'));

alter table public.comments
  alter column status set default 'public';

drop policy if exists comments_public_read_published on public.comments;
drop policy if exists comments_public_read_public on public.comments;

create policy comments_public_read_public
on public.comments
for select
to anon, authenticated
using (
  status = 'public'
  and deleted_at is null
);

drop policy if exists comments_public_insert_published on public.comments;
drop policy if exists comments_public_insert_public on public.comments;

create policy comments_public_insert_public
on public.comments
for insert
to anon, authenticated
with check (
  status = 'public'
  and deleted_at is null
);

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
      and status = 'public'
      and deleted_at is null
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

drop trigger if exists comments_comment_count_sync on public.comments;
drop trigger if exists comments_sync_post_comment_count on public.comments;

create trigger comments_sync_post_comment_count
after insert or update or delete on public.comments
for each row
execute function public.sync_post_comment_count_from_comment();

update public.posts p
set comment_count = (
  select count(*)::int
  from public.comments c
  where c.post_id = p.id
    and c.status = 'public'
    and c.deleted_at is null
);
