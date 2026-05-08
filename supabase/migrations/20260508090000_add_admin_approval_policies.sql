begin;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists admin_users_admin_read on public.admin_users;
create policy admin_users_admin_read
on public.admin_users
for select
to authenticated
using (public.is_admin());

drop policy if exists posts_admin_read_all on public.posts;
create policy posts_admin_read_all
on public.posts
for select
to authenticated
using (public.is_admin());

drop policy if exists posts_admin_moderate_pending on public.posts;
create policy posts_admin_moderate_pending
on public.posts
for update
to authenticated
using (
  public.is_admin()
  and status = 'pending'
  and deleted_at is null
)
with check (
  public.is_admin()
  and status in ('approved', 'rejected')
  and deleted_at is null
);

drop policy if exists moderation_logs_admin_insert on public.moderation_logs;
create policy moderation_logs_admin_insert
on public.moderation_logs
for insert
to authenticated
with check (public.is_admin());

commit;
