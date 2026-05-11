import { expect, test } from '@playwright/test';

test('トップページが表示できる', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'あるあるランキング' })).toBeVisible();
});

test('ランキングページが表示できる', async ({ page }) => {
  await page.goto('/ranking');
  await expect(page.getByRole('heading', { name: '総合ランキング' })).toBeVisible();
});

test('カテゴリー一覧ページが表示できる', async ({ page }) => {
  await page.goto('/categories');
  await expect(page.getByRole('heading', { name: 'カテゴリー一覧' })).toBeVisible();
});

test('投稿ページが表示できる', async ({ page }) => {
  await page.goto('/submit');
  await expect(page.getByRole('heading', { name: 'あるあるを投稿する' })).toBeVisible();
});

test('公開投稿があれば投稿詳細ページでコメント欄が表示できる', async ({ page }) => {
  await page.goto('/ranking');

  const postLink = page.locator('a[href^="/posts/"]').first();

  if ((await postLink.count()) === 0) {
    test.skip(true, '公開投稿リンクがないため投稿詳細テストをスキップ');
  }

  await postLink.click();

  await expect(page).toHaveURL(/\/posts\//);
  const voteButton = page.getByRole('button', { name: /わかる！/ });
  await expect(voteButton).toHaveCount(1);
  await expect(voteButton).toBeVisible();
  await expect(voteButton).toBeEnabled();

  await expect(page.getByRole('heading', { name: 'コメントを投稿する' })).toBeVisible();
  await expect(page.getByLabel('コメント')).toBeVisible();
  await expect(page.getByLabel('お名前')).toBeVisible();
  await expect(page.getByRole('button', { name: 'コメントを投稿する' })).toBeVisible();
});

test('管理者ログインページが表示できる', async ({ page }) => {
  await page.goto('/admin/login');
  await expect(page.getByRole('heading', { name: '管理者ログイン' })).toBeVisible();
  await expect(page.getByRole('button', { name: '管理画面にログイン' })).toBeVisible();
});
