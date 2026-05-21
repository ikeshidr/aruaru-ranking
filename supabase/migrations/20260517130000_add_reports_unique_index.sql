-- 同一訪問者が同一投稿に重複通報しないよう部分 unique index を追加
create unique index if not exists reports_post_visitor_unique
  on public.reports(post_id, reporter_anonymous_id)
  where reporter_anonymous_id is not null
    and target_type = 'post';
