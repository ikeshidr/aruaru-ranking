-- =========================================================
-- Phase 7: public comment target enforcement and counts
-- =========================================================

-- Public comments default to immediate public visibility. The insert policy
-- below still enforces that submitted rows resolve to public, visible comments.
alter table public.comments
  alter column status set default 'public';

-- Public comments may only be inserted for posts that are currently visible
-- to public visitors. This keeps the database rule aligned with the app-level
-- check without weakening public read policies.
drop policy if exists comments_public_insert_public on public.comments;

create policy comments_public_insert_public
on public.comments
for insert
to anon, authenticated
with check (
  status = 'public'
  and deleted_at is null
  and exists (
    select 1
    from public.posts p
    where p.id = comments.post_id
      and p.status = 'approved'
      and p.deleted_at is null
  )
);

-- Keep posts.comment_count in sync with visible public comments. The trigger
-- counts comments that visitors can see: status = 'public' and deleted_at is null.
create or replace function public.sync_post_comment_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    if new.status = 'public' and new.deleted_at is null then
      update public.posts
      set comment_count = coalesce(public.posts.comment_count, 0) + 1
      where id = new.post_id;
    end if;

    return new;
  end if;

  if tg_op = 'DELETE' then
    if old.status = 'public' and old.deleted_at is null then
      update public.posts
      set comment_count = greatest(coalesce(public.posts.comment_count, 0) - 1, 0)
      where id = old.post_id;
    end if;

    return old;
  end if;

  if tg_op = 'UPDATE' then
    if old.status = 'public' and old.deleted_at is null then
      update public.posts
      set comment_count = greatest(coalesce(public.posts.comment_count, 0) - 1, 0)
      where id = old.post_id;
    end if;

    if new.status = 'public' and new.deleted_at is null then
      update public.posts
      set comment_count = coalesce(public.posts.comment_count, 0) + 1
      where id = new.post_id;
    end if;

    return new;
  end if;

  return null;
end;
$$;

drop trigger if exists sync_post_comment_count_on_comments on public.comments;

create trigger sync_post_comment_count_on_comments
after insert or delete or update of post_id, status, deleted_at
on public.comments
for each row
execute function public.sync_post_comment_count();

update public.posts p
set comment_count = coalesce(comment_counts.visible_count, 0)
from (
  select
    p_inner.id as post_id,
    count(c.id)::integer as visible_count
  from public.posts p_inner
  left join public.comments c
    on c.post_id = p_inner.id
   and c.status = 'public'
   and c.deleted_at is null
  group by p_inner.id
) as comment_counts
where p.id = comment_counts.post_id;
