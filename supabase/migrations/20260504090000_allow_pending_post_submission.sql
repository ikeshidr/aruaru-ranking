-- =========================================================
-- Phase 4: allow anonymous pending post submission
-- =========================================================

-- /submit posts are inserted by anon/authenticated users and must stay pending
-- until an admin approves them in a later phase.

grant usage on schema public to anon, authenticated;

grant insert (
  category_id,
  body,
  author_name,
  tags,
  visitor_id
) on public.posts to anon, authenticated;

drop policy if exists posts_public_insert_pending on public.posts;

create policy posts_public_insert_pending
on public.posts
for insert
to anon, authenticated
with check (
  status = 'pending'
  and deleted_at is null
  and vote_count = 0
  and comment_count = 0
  and approved_at is null
  and rejected_at is null
);
