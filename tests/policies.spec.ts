import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { policies } from '../src/lib/content/policies';

test('all policy pages are prerendered, linked in the footer, and fit mobile screens', async ({
  page,
  request
}) => {
  await page.goto('/');
  const footerPolicies = page.getByRole('navigation', { name: 'Legal and policies' });

  for (const policy of policies) {
    await expect(
      footerPolicies.getByRole('link', { name: policy.title, exact: true })
    ).toHaveAttribute('href', `/${policy.slug}/`);
    const response = await request.get(`/${policy.slug}/`);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain(policy.summary);
    await page.setViewportSize({ width: 360, height: 844 });
    await page.goto(`/${policy.slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(policy.title);
    await expect(
      page
        .getByRole('navigation', { name: 'Policies', exact: true })
        .getByRole('link', { name: policy.title, exact: true })
    ).toHaveAttribute('aria-current', 'page');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://thewriterco.com/${policy.slug}/`
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  }

  await page.goto('/privacy-policy/');
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations
  ).toEqual([]);
});

test('policy navigation updates the page and also works without JavaScript', async ({
  page,
  browser,
  request
}) => {
  await page.goto('/privacy-policy/');
  await page
    .getByRole('navigation', { name: 'Policies', exact: true })
    .getByRole('link', { name: 'Cookie Policy', exact: true })
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cookie Policy');
  await expect(page).toHaveURL(/\/cookie-policy\/$/);

  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  try {
    await staticPage.goto('/service-policy/');
    await staticPage
      .getByRole('navigation', { name: 'Policies', exact: true })
      .getByRole('link', { name: 'Terms & Conditions', exact: true })
      .click();
    await expect(staticPage.getByRole('heading', { level: 1 })).toHaveText('Terms & Conditions');
  } finally {
    await context.close();
  }

  expect((await request.get('/unknown-policy/')).status()).toBe(404);
});
