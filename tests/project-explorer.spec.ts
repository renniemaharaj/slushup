import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('project gallery expands, combines filters with search, and recovers from no results', async ({
  page
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/projects/go-api-kit/#all-projects');
  const gallery = page.getByRole('region', { name: 'All projects' });
  const cards = gallery.locator('.project-card');

  await expect(cards).toHaveCount(9);
  await expect(gallery.locator('[aria-current="page"]')).toContainText('Go API Kit');
  const expand = gallery.getByRole('button', { name: 'View all 11 projects' });
  await expand.click();
  await expect(cards).toHaveCount(11);
  await expect(gallery.getByRole('button', { name: 'Show fewer projects' })).toHaveAttribute(
    'aria-expanded',
    'true'
  );
  await expect(cards.filter({ hasText: 'JVMS' })).toContainText('Contribution');
  await expect(cards.filter({ hasText: 'Frappe Docker' })).toHaveAttribute(
    'href',
    '/projects/frappe-docker/'
  );
  await expect(cards.filter({ hasText: 'KJV Bible' })).toHaveAttribute(
    'href',
    'https://github.com/renniemaharaj/kjv-bible'
  );

  await gallery.getByRole('button', { name: 'Infrastructure (3)', exact: true }).click();
  await expect(cards).toHaveCount(3);
  const search = gallery.getByRole('searchbox', { name: 'Search projects' });
  await search.fill(' QEMU ');
  await expect(cards).toHaveCount(1);
  await expect(cards).toContainText('Windows VM');
  await search.fill('nothing-matches-this');
  await expect(cards).toHaveCount(0);
  await expect(gallery.getByRole('heading', { name: 'No projects found' })).toBeVisible();
  await gallery.getByRole('button', { name: 'Clear filters' }).click();
  await expect(search).toHaveValue('');
  await expect(cards).toHaveCount(11);
  await expect(gallery.getByRole('button', { name: 'All (11)', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true'
  );

  await gallery.getByRole('button', { name: 'Show fewer projects' }).click();
  await expect(cards).toHaveCount(9);
  await search.fill('SHA-512');
  await expect(cards).toHaveCount(1);
  await expect(cards).toContainText('KJV Bible');
  expect(errors).toEqual([]);
});

test('project gallery fits small screens and remains accessible with active filters', async ({
  page
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/projects/go-api-kit/#all-projects');
  const gallery = page.getByRole('region', { name: 'All projects' });
  await gallery.getByRole('searchbox').fill('Docker');
  await expect(gallery.locator('.project-card')).toHaveCount(3);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(
    (
      await new AxeBuilder({ page })
        .include('#all-projects')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations
  ).toEqual([]);
});

test('all project destinations remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  try {
    await page.goto('/projects/go-api-kit/#all-projects');
    const gallery = page.getByRole('region', { name: 'All projects' });
    await expect(gallery.locator('.project-card')).toHaveCount(11);
    await expect(gallery.getByRole('searchbox')).toHaveCount(0);
    await gallery.getByRole('link').filter({ hasText: 'Frappe Docker' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Frappe Docker');
  } finally {
    await context.close();
  }
});
