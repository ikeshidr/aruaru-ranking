import { expect, test } from '@playwright/test';

const runMutatingCommentTests = process.env.RUN_MUTATING_E2E === 'true';

test.skip(!runMutatingCommentTests, 'RUN_MUTATING_E2E=true のときだけ実データへコメント投稿する');

test('公開投稿があれば投稿詳細ページでコメントを投稿できる', async ({ page }) => {
  await page.goto('/ranking');

  const postLink = page.locator('a[href^="/posts/"]').first();

  if ((await postLink.count()) === 0) {
    test.skip(true, '公開投稿リンクがないためコメント投稿テストをスキップ');
  }

  await postLink.click();

  await expect(page).toHaveURL(/\/posts\//);
  await expect(page.getByRole('heading', { name: 'コメントを投稿する' })).toBeVisible();

  const commentBody = `Playwright smoke comment ${Date.now()}`;
  await page.getByLabel('コメント').fill(commentBody);
  await page.getByRole('button', { name: 'コメントを投稿する' }).click();

  await expect(page.getByText('コメントを投稿しました。')).toBeVisible();
  await expect(page.getByText(commentBody)).toBeVisible();
});
