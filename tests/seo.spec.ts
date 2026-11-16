import { expect, test } from '@playwright/test';

const origin = 'https://slushuptt.com';

for (const [provider, userAgent] of [
  ['Facebook', 'facebookexternalhit/1.1'],
  ['X', 'Twitterbot/1.0'],
  ['LinkedIn', 'LinkedInBot/1.0']
]) {
  test(`${provider} receives complete sharing metadata without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, userAgent });
    const page = await context.newPage();
    await page.goto('/?utm_source=social');

    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    const image = `${origin}/og-slushup.jpg`;
    expect(title).toContain('Trinidad & Tobago');
    expect(description).toContain('cocktails, mocktails and frozen treats');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}/`);

    const properties = {
      'og:type': 'website',
      'og:site_name': 'SlushUp',
      'og:locale': 'en_TT',
      'og:url': `${origin}/`,
      'og:title': title,
      'og:description': description!,
      'og:image': image,
      'og:image:secure_url': image,
      'og:image:type': 'image/jpeg',
      'og:image:width': '1200',
      'og:image:height': '630'
    };

    for (const [property, value] of Object.entries(properties)) {
      const tag = page.locator(`meta[property="${property}"]`);
      await expect(tag).toHaveCount(1);
      await expect(tag).toHaveAttribute('content', value);
    }

    const names = {
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description!,
      'twitter:image': image
    };

    for (const [name, value] of Object.entries(names)) {
      const tag = page.locator(`meta[name="${name}"]`);
      await expect(tag).toHaveCount(1);
      await expect(tag).toHaveAttribute('content', value);
    }

    const alt = await page.locator('meta[property="og:image:alt"]').getAttribute('content');
    expect(alt).toBeTruthy();
    await expect(page.locator('meta[name="twitter:image:alt"]')).toHaveAttribute('content', alt!);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    const response = await page.request.get('/og-slushup.jpg');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(/^image\/jpeg/);
    const dimensions = await page.evaluate(async (url) => {
      const response = await fetch(url);
      const image = await createImageBitmap(await response.blob());
      const dimensions = { width: image.width, height: image.height };
      image.close();
      return dimensions;
    }, '/og-slushup.jpg');
    expect(dimensions).toEqual({ width: 1200, height: 630 });

    const data = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
    const nodes = new Map<string, Record<string, unknown>>(
      data['@graph'].map((node: Record<string, unknown>) => [String(node['@id']), node])
    );
    expect(data['@context']).toBe('https://schema.org');
    expect(nodes.get(`${origin}/#organization`)).toMatchObject({
      '@type': 'Organization',
      name: 'SlushUp',
      telephone: '+18687847976',
      logo: `${origin}/slushup-logo-512.webp`,
      areaServed: { name: 'Trinidad and Tobago' }
    });
    expect(nodes.get(`${origin}/#website`)).toMatchObject({
      '@type': 'WebSite',
      url: `${origin}/`,
      publisher: { '@id': `${origin}/#organization` }
    });
    expect(nodes.get(`${origin}/#webpage`)).toMatchObject({
      '@type': 'WebPage',
      name: title,
      primaryImageOfPage: { '@id': `${origin}/#sharing-image` }
    });
    expect(nodes.get(`${origin}/#sharing-image`)).toMatchObject({
      '@type': 'ImageObject',
      contentUrl: image,
      width: dimensions.width,
      height: dimensions.height
    });
    await context.close();
  });
}
