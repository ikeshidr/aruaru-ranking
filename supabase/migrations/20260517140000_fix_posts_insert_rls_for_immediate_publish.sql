-- =========================================================
-- 即時公開化: 投稿は submit 時点で status='approved' で保存される
-- 旧 pending フロー前提の INSERT 制約を、approved フロー対応に置き換える
-- =========================================================

-- status と approved_at の column-level INSERT を anon / authenticated に許可する
grant insert (
  category_id,
  body,
  author_name,
  tags,
  visitor_id,
  status,
  approved_at
) on public.posts to anon, authenticated;

-- 旧 pending 用ポリシー（with check: status='pending' AND approved_at IS NULL）を撤去
drop policy if exists posts_public_insert_pending on public.posts;

-- 0001 初期スキーマ由来の status='published' 用ポリシーも未使用のため撤去
drop policy if exists "posts_anyone_insert_published" on public.posts;

-- 新ポリシー: 即時 approved 投稿を許可（投票/コメントカウントはすべてゼロでなければならない）
create policy posts_public_insert_approved
on public.posts
for insert
to anon, authenticated
with check (
  status = 'approved'
  and deleted_at is null
  and rejected_at is null
  and vote_count = 0
  and comment_count = 0
  and aruaru_count = 0
  and wakaru_count = 0
  and funny_count = 0
  and nai_count = 0
  and report_count = 0
  and score = 0
);
