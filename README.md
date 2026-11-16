# SlushUp

Premium mobile bar, cocktails, mocktails, and frozen treats. A prerendered SvelteKit 3 website using Svelte 5 runes, strict TypeScript, and scoped CSS. No React or Tailwind.

## Develop

Use Node 24 LTS and npm.

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm run check
npm test
npm run build
npm run test:e2e
```

Playwright uses `/usr/bin/chromium` by default. Set `PLAYWRIGHT_CHROMIUM_PATH` to another installed Chromium binary when necessary. To use Playwright's downloaded browser, set that variable to its executable path. Visual regression baselines cover 390, 768 and 1440 pixels; functional checks cover 360 through 1920 pixels.

```sh
npm run preview -- --port 4174
npm run audit:performance
node scripts/capture.mjs
```

`build/` is the deployable static website. No Node server, database, credentials, or form-processing backend is required. Booking goes directly to the existing Google Form; contact uses the existing WhatsApp number.

Run `npm run release` to check types, run unit tests, build, run browser checks, and package the verified output as `artifacts/slushup-staging.tar.gz` with a SHA-256 checksum. JavaScript and CSS are minified, and responsive images use AVIF with a WebP fallback. Cloudflare Pages handles response compression; the build does not generate `.br` or `.gz` copies. Original public media URLs remain available.

## Repository

- `src/routes/`: prerendered page, document metadata and layout.
- `src/lib/components/`: page sections and shared UI.
- `src/lib/content/`: verified business destinations, service/occasion copy, gallery and media inventory.
- `src/lib/styles/`: CSS tokens, typography, shared layout and accessibility defaults.
- `src/lib/motion/`: lazy Embla action and scoped GSAP/Lenis lifecycle.
- `src/lib/assets/`: local sources processed by enhanced-img.
- `public/`: original media URLs, local licensed font, SEO files and video.
- `tests/`: migration contracts, browser interactions, axe checks and visual baselines.
- `scripts/`: repeatable screenshots, performance audits and staging packaging.
- `docs/`: migration audit, architecture, deployment and before/after evidence.
- `deploy/`: Nginx configuration.

See [architecture](docs/ARCHITECTURE.md), [migration audit](docs/MIGRATION.md), [quality report](docs/QA.md) and [deployment/rollback](docs/DEPLOYMENT.md).

The original React application is preserved at Git commit `9ba57e9` and branch `backup/react-before-svelte-2026-11-15`. The migration has not changed the live production website.
