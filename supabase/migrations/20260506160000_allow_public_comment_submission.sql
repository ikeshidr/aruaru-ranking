-- =========================================================
-- Phase 5: allow public comment submission
-- =========================================================

-- Comments are inserted by anon/authenticated users and are immediately
-- visible under the current Phase 3 public comment status model.

grant usage on schema public to anon, authenticated;

grant insert (
  post_id,
  body,
  author_name,
  visitor_id
) on public.comments to anon, authenticated;

drop policy if exists comments_public_insert_public on public.comments;

create policy comments_public_insert_public
on public.comments
for insert
to anon, authenticated
with check (
  status = 'public'
  and deleted_at is null
);
