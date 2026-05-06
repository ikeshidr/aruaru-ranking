-- =========================================================
-- Phase 5: unify public comment status to published
-- =========================================================

alter table public.comments
  alter column status drop default;

alter table public.comments
  drop constraint if exists comments_status_check;

update public.comments
set status = 'published'
where status = 'public';

alter table public.comments
  add constraint comments_status_check
  check (status in ('published', 'hidden', 'deleted'));

alter table public.comments
  alter column status set default 'published';

drop policy if exists comments_public_read_public on public.comments;
drop policy if exists comments_public_read_published on public.comments;

create policy comments_public_read_published
on public.comments
for select
to anon, authenticated
using (
  status = 'published'
  and deleted_at is null
);

drop policy if exists comments_public_insert_public on public.comments;
drop policy if exists comments_public_insert_published on public.comments;

create policy comments_public_insert_published
on public.comments
for insert
to anon, authenticated
with check (
  status = 'published'
  and deleted_at is null
);

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
      and deleted_at is null
  )
  where id = target_post_id;
end;
$$;

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
    and c.deleted_at is null
  group by p.id
) as counts
where p.id = counts.post_id;
