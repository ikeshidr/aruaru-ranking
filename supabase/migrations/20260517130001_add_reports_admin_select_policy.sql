-- 管理者ユーザーが reports を閲覧できるポリシーを追加
create policy "Admin users can read reports"
  on public.reports for select
  using (
    exists (
      select 1 from public.admin_users
      where user_id = auth.uid()
    )
  );
