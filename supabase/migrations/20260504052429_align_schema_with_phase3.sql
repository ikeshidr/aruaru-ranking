-- =========================================================
-- Align existing initial schema with Phase 3 public query schema
-- =========================================================

-- =========================================================
-- Drop legacy policies that depend on status columns
-- =========================================================

do $$
declare
  policy_record record;
begin
  for policy_record in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in ('posts', 'comments')
  loop
    execute format(
      'drop policy if exists %I on %I.%I',
      policy_record.policyname,
      policy_record.schemaname,
      policy_record.tablename
    );
  end loop;
end;
$$;

-- categories
alter table public.categories
  add column if not exists title text,
  add column if not exists group_name text,
  add column if not exists icon_key text,
  add column if not exists tags text[] not null default '{}',
  add column if not exists updated_at timestamptz not null default now();

update public.categories
set title = coalesce(nullif(title, ''), name)
where title is null or title = '';

update public.categories
set group_name = coalesce(nullif(group_name, ''), 'カテゴリー')
where group_name is null or group_name = '';

update public.categories
set icon_key = coalesce(icon_key, nullif(icon_url, ''))
where icon_key is null;

alter table public.categories
  alter column title set not null,
  alter column title set default '',
  alter column group_name set not null,
  alter column group_name set default 'カテゴリー';

-- posts
alter table public.posts
  add column if not exists vote_count integer not null default 0,
  add column if not exists tags text[] not null default '{}',
  add column if not exists visitor_id text,
  add column if not exists ip_hash text,
  add column if not exists user_agent_hash text,
  add column if not exists approved_at timestamptz,
  add column if not exists rejected_at timestamptz,
  add column if not exists deleted_at timestamptz;

-- Convert legacy enum status to text so Phase 0-1 status policy can be enforced.
alter table public.posts
  alter column status drop default,
  alter column status type text using status::text;

update public.posts
set status = 'approved'
where status = 'published';

update public.posts
set status = 'pending'
where status not in ('pending', 'approved', 'rejected');

update public.posts
set vote_count = aruaru_count
where vote_count = 0
  and aruaru_count is not null;

update public.posts
set approved_at = published_at
where status = 'approved'
  and approved_at is null
  and published_at is not null;

alter table public.posts
  alter column status set default 'pending';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'posts_status_check'
      and conrelid = 'public.posts'::regclass
  ) then
    alter table public.posts
      add constraint posts_status_check
      check (status in ('pending', 'approved', 'rejected'));
  end if;
end;
$$;

-- comments
alter table public.comments
  add column if not exists visitor_id text,
  add column if not exists ip_hash text,
  add column if not exists user_agent_hash text,
  add column if not exists report_count integer not null default 0,
  add column if not exists deleted_at timestamptz;

alter table public.comments
  alter column status drop default,
  alter column status type text using status::text;

update public.comments
set status = 'public'
where status = 'published';

update public.comments
set status = 'hidden'
where status = 'rejected';

update public.comments
set status = 'public'
where status not in ('public', 'hidden', 'deleted');

alter table public.comments
  alter column status set default 'public';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'comments_status_check'
      and conrelid = 'public.comments'::regclass
  ) then
    alter table public.comments
      add constraint comments_status_check
      check (status in ('public', 'hidden', 'deleted'));
  end if;
end;
$$;

-- Phase 3 query indexes
create index if not exists idx_categories_slug
on public.categories(slug);

create index if not exists idx_posts_category_status
on public.posts(category_id, status, deleted_at);

create index if not exists idx_posts_ranking
on public.posts(status, deleted_at, vote_count desc, created_at desc);

create index if not exists idx_posts_created
on public.posts(status, deleted_at, created_at desc);

create index if not exists idx_comments_post_public
on public.comments(post_id, status, deleted_at, created_at asc);

create index if not exists idx_posts_tags_gin
on public.posts
using gin(tags);

create index if not exists idx_categories_tags_gin
on public.categories
using gin(tags);

-- =========================================================
-- Phase 3 compatible RLS policies
-- =========================================================

alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;

drop policy if exists categories_public_read_active on public.categories;
create policy categories_public_read_active
on public.categories
for select
to anon, authenticated
using (is_active = true);

drop policy if exists posts_public_read_approved on public.posts;
create policy posts_public_read_approved
on public.posts
for select
to anon, authenticated
using (
  status = 'approved'
  and deleted_at is null
);

drop policy if exists comments_public_read_public on public.comments;
create policy comments_public_read_public
on public.comments
for select
to anon, authenticated
using (
  status = 'public'
  and deleted_at is null
);