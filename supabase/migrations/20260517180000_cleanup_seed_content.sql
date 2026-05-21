-- 全投稿を削除（関連する votes / comments / reports も cascade で消える）
delete from public.posts;

-- シードで追加した新カテゴリーを削除
delete from public.categories
where slug in (
  'caregiver', 'beautician', 'sales',
  'restaurant', 'factory', 'office',
  'nursery', 'driver'
);
