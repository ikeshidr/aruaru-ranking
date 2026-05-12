import { expect, test } from '@playwright/test';

const staticPages = [
  { path: '/terms', heading: '利用規約' },
  { path: '/privacy', heading: 'プライバシーポリシー' },
  { path: '/guidelines', heading: '投稿ガイドライン' },
  { path: '/contact', heading: 'お問い合わせ' },
];

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
    return;
  }

  const postHref = await postLink.getAttribute('href');

  if (!postHref) {
    test.skip(true, '公開投稿リンクの href がないため投稿詳細テストをスキップ');
    return;
  }

  await page.goto(postHref);

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

test('sitemap.xml が公開ページだけを返す', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);

  const sitemap = await response.text();
  expect(sitemap).toContain('<urlset');
  expect(sitemap).toContain('<loc>');
  expect(sitemap).not.toContain('/admin');
  expect(sitemap).not.toContain('/admin/login');
});

test('robots.txt が管理画面をクロール対象外にする', async ({ request }) => {
  const response = await request.get('/robots.txt');
  expect(response.status()).toBe(200);

  const robots = await response.text();
  expect(robots).toContain('User-Agent: *');
  expect(robots).toContain('Allow: /');
  expect(robots).toContain('Disallow: /admin');
});

for (const { path, heading } of staticPages) {
  test(`${path} が表示でき、主要見出しが見える`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  });
}

test('管理画面系ページに noindex metadata が設定されている', async ({ page }) => {
  await page.goto('/admin/login');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);

  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin(?:\/login)?/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});
