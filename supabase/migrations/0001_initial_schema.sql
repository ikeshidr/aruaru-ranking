-- Task 2: Initial Supabase schema for あるあるランキング
-- Date: 2026-05-03

begin;

-- Extensions
create extension if not exists pgcrypto;

-- =========================================================
-- Enums
-- =========================================================
create type public.category_type as enum ('occupation', 'animal', 'region', 'hobby', 'school', 'parenting', 'fishing', 'other');
create type public.category_status as enum ('active', 'hidden', 'archived');
create type public.post_status as enum ('pending', 'published', 'hidden', 'deleted');
create type public.comment_status as enum ('published', 'hidden', 'deleted');
create type public.vote_type as enum ('aruaru', 'wakaru', 'nai', 'funny');
create type public.report_target_type as enum ('post', 'comment');
create type public.report_reason as enum ('spam', 'abuse', 'discrimination', 'personal_info', 'adult', 'other');
create type public.report_status as enum ('open', 'resolved', 'ignored');

-- =========================================================
-- Common helper for updated_at
-- =========================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =========================================================
-- profiles (future login compatibility)
-- =========================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'user' check (role in ('user', 'admin', 'moderator')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- =========================================================
-- categories
-- parent-child generic structure
-- =========================================================
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id) on delete set null,
  type public.category_type not null,
  name text not null,
  slug text not null unique,
  description text,
  icon_url text,
  sort_order int not null default 0,
  status public.category_status not null default 'active',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_name_not_blank check (char_length(trim(name)) > 0),
  constraint categories_slug_not_blank check (char_length(trim(slug)) > 0)
);

create index categories_parent_sort_idx on public.categories(parent_id, sort_order, created_at desc);
create index categories_type_status_idx on public.categories(type, status, sort_order);

create trigger set_categories_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

-- =========================================================
-- posts
-- =========================================================
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete restrict,
  user_id uuid references auth.users(id) on delete set null,
  anonymous_id text,
  session_id text,
  body text not null,
  author_name text,
  status public.post_status not null default 'published',
  report_count int not null default 0 check (report_count >= 0),
  aruaru_count int not null default 0 check (aruaru_count >= 0),
  wakaru_count int not null default 0 check (wakaru_count >= 0),
  funny_count int not null default 0 check (funny_count >= 0),
  nai_count int not null default 0 check (nai_count >= 0),
  comment_count int not null default 0 check (comment_count >= 0),
  score int not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint posts_body_len check (char_length(trim(body)) between 2 and 500),
  constraint posts_author_name_len check (author_name is null or char_length(author_name) between 1 and 40),
  constraint posts_anonymous_id_not_blank check (anonymous_id is null or char_length(trim(anonymous_id)) > 0),
  constraint posts_session_id_not_blank check (session_id is null or char_length(trim(session_id)) > 0)
);

create index posts_category_status_created_idx on public.posts(category_id, status, created_at desc);
create index posts_status_score_idx on public.posts(status, score desc, created_at desc);
create index posts_status_published_idx on public.posts(status, published_at desc nulls last);
create index posts_user_id_idx on public.posts(user_id);
create index posts_anonymous_id_idx on public.posts(anonymous_id) where anonymous_id is not null;

create trigger set_posts_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

-- =========================================================
-- votes
-- =========================================================
create table public.votes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  anonymous_id text,
  session_id text,
  vote_hash text,
  vote_type public.vote_type not null,
  created_at timestamptz not null default now(),
  constraint votes_identity_present check (
    user_id is not null
    or anonymous_id is not null
    or session_id is not null
    or vote_hash is not null
  ),
  constraint votes_anonymous_id_not_blank check (anonymous_id is null or char_length(trim(anonymous_id)) > 0),
  constraint votes_session_id_not_blank check (session_id is null or char_length(trim(session_id)) > 0),
  constraint votes_vote_hash_not_blank check (vote_hash is null or char_length(trim(vote_hash)) > 0),
  constraint votes_single_primary_identity check (
    ((case when user_id is null then 0 else 1 end)
    + (case when anonymous_id is null then 0 else 1 end)
    + (case when session_id is null then 0 else 1 end)
    + (case when vote_hash is null then 0 else 1 end)) = 1
  )
);

-- multi-vote prevention (same post + same type + same identity)
create unique index votes_unique_user_vote
  on public.votes(post_id, vote_type, user_id)
  where user_id is not null;

create unique index votes_unique_anonymous_vote
  on public.votes(post_id, vote_type, anonymous_id)
  where anonymous_id is not null;

create unique index votes_unique_session_vote
  on public.votes(post_id, vote_type, session_id)
  where session_id is not null;

create unique index votes_unique_hash_vote
  on public.votes(post_id, vote_type, vote_hash)
  where vote_hash is not null;

create index votes_post_created_idx on public.votes(post_id, created_at desc);
create index votes_type_created_idx on public.votes(vote_type, created_at desc);

-- =========================================================
-- comments
-- =========================================================
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  anonymous_id text,
  session_id text,
  body text not null,
  author_name text,
  status public.comment_status not null default 'published',
  report_count int not null default 0 check (report_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint comments_body_len check (char_length(trim(body)) between 1 and 300),
  constraint comments_author_name_len check (author_name is null or char_length(author_name) between 1 and 40),
  constraint comments_anonymous_id_not_blank check (anonymous_id is null or char_length(trim(anonymous_id)) > 0),
  constraint comments_session_id_not_blank check (session_id is null or char_length(trim(session_id)) > 0)
);

create index comments_post_status_created_idx on public.comments(post_id, status, created_at desc);
create index comments_status_created_idx on public.comments(status, created_at desc);
create index comments_user_id_idx on public.comments(user_id);

create trigger set_comments_updated_at
before update on public.comments
for each row execute function public.set_updated_at();

-- =========================================================
-- reports (post/comment both)
-- =========================================================
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  target_type public.report_target_type not null,
  post_id uuid references public.posts(id) on delete cascade,
  comment_id uuid references public.comments(id) on delete cascade,
  reporter_user_id uuid references auth.users(id) on delete set null,
  reporter_anonymous_id text,
  reporter_session_id text,
  reason public.report_reason not null,
  detail text,
  status public.report_status not null default 'open',
  handled_by uuid references auth.users(id) on delete set null,
  handled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reports_target_consistency check (
    (target_type = 'post' and post_id is not null and comment_id is null)
    or
    (target_type = 'comment' and comment_id is not null and post_id is null)
  ),
  constraint reports_reporter_identity_present check (
    reporter_user_id is not null
    or reporter_anonymous_id is not null
    or reporter_session_id is not null
  ),
  constraint reports_reporter_anonymous_id_not_blank check (
    reporter_anonymous_id is null or char_length(trim(reporter_anonymous_id)) > 0
  ),
  constraint reports_reporter_session_id_not_blank check (
    reporter_session_id is null or char_length(trim(reporter_session_id)) > 0
  )
);

create index reports_status_created_idx on public.reports(status, created_at desc);
create index reports_target_post_idx on public.reports(post_id) where post_id is not null;
create index reports_target_comment_idx on public.reports(comment_id) where comment_id is not null;

create trigger set_reports_updated_at
before update on public.reports
for each row execute function public.set_updated_at();

-- =========================================================
-- tags / post_tags
-- =========================================================
create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tags_name_not_blank check (char_length(trim(name)) > 0),
  constraint tags_slug_not_blank check (char_length(trim(slug)) > 0)
);

create index tags_name_idx on public.tags(name);

create trigger set_tags_updated_at
before update on public.tags
for each row execute function public.set_updated_at();

create table public.post_tags (
  post_id uuid not null references public.posts(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, tag_id)
);

create index post_tags_tag_id_idx on public.post_tags(tag_id);

-- =========================================================
-- moderation logs (optional but useful for admin audit)
-- =========================================================
create table public.moderation_logs (
  id uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('post', 'comment', 'report', 'category', 'tag')),
  target_id uuid not null,
  action text not null,
  note text,
  actor_user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index moderation_logs_target_idx on public.moderation_logs(target_type, target_id, created_at desc);
create index moderation_logs_actor_idx on public.moderation_logs(actor_user_id, created_at desc);

-- =========================================================
-- Row Level Security (initial policy set)
-- =========================================================
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.votes enable row level security;
alter table public.comments enable row level security;
alter table public.reports enable row level security;
alter table public.tags enable row level security;
alter table public.post_tags enable row level security;
alter table public.moderation_logs enable row level security;

-- Public read-only objects (only active/published)
create policy "categories_public_read_active"
  on public.categories for select
  using (status = 'active' and is_active = true);

create policy "tags_public_read"
  on public.tags for select
  using (true);

create policy "post_tags_public_read"
  on public.post_tags for select
  using (true);

create policy "posts_public_read_published"
  on public.posts for select
  using (status = 'published');

create policy "comments_public_read_published"
  on public.comments for select
  using (
    status = 'published'
    and exists (
      select 1
      from public.posts p
      where p.id = comments.post_id
        and p.status = 'published'
    )
  );

-- Anonymous posting/voting/reporting (MVP)
create policy "posts_anyone_insert_published"
  on public.posts for insert
  with check (
    status = 'published'
    and report_count = 0
    and aruaru_count = 0
    and wakaru_count = 0
    and funny_count = 0
    and nai_count = 0
    and comment_count = 0
    and score = 0
    and published_at is null
    and exists (
      select 1
      from public.categories c
      where c.id = posts.category_id
        and c.status = 'active'
        and c.is_active = true
    )
  );

create policy "votes_anyone_insert"
  on public.votes for insert
  with check (
    user_id is not null
    or anonymous_id is not null
    or session_id is not null
    or vote_hash is not null
  );

create policy "comments_anyone_insert_published"
  on public.comments for insert
  with check (
    status = 'published'
    and report_count = 0
    and exists (
      select 1
      from public.posts p
      where p.id = comments.post_id
        and p.status = 'published'
        and p.report_count = 0
    )
  );

create policy "reports_anyone_insert"
  on public.reports for insert
  with check (
    status = 'open'
    and handled_by is null
    and handled_at is null
  );

-- No public update/delete for content tables by default.
-- Admin policies should be added in Task 3/Task 9 with Supabase Auth roles.

-- =========================================================
-- Seed data draft (commented; execute manually when needed)
-- =========================================================
/*
insert into public.categories (type, parent_id, name, slug, description, sort_order)
values
  ('occupation', null, '職業あるある', 'occupation', '仕事にまつわるあるあるを集めたカテゴリ', 1),
  ('animal', null, '動物あるある', 'animal', '動物好きのあるあるカテゴリ', 2),
  ('region', null, '地域あるある', 'region', '地域特有のあるあるカテゴリ', 3);

-- child category example (nurse)
insert into public.categories (type, parent_id, name, slug, description, sort_order)
select
  'occupation', c.id, '看護師', 'nurse', '看護師の共感ネタ', 1
from public.categories c
where c.slug = 'occupation';

insert into public.tags (name, slug) values
  ('夜勤', 'yakin'),
  ('ナースコール', 'nurse-call'),
  ('人間関係', 'relationships');
*/

commit;
