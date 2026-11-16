# Rennie Maharaj · TheWriterCo

Personal engineering portfolio and consulting website for [thewriterco.com](https://thewriterco.com), built with SvelteKit 3, Svelte 5, TypeScript, scoped CSS, and the original client application's local Manrope font, rounded navigation, buttons, and GSAP/Lenis motion infrastructure.

## Branches

`feat/rennie-personal-website` starts at the client design overhaul, `c24ed65`. The original client implementation remains on `main`; the personal portfolio changes are isolated to the feature branch. The older React implementation remains in Git history and its existing backup branch. The two older TheWriterCo React editor checkouts were not modified.

## Develop & verify

Use Node 24 LTS (minimum supported Node 22.18) and npm.

```sh
npm ci
npm run dev
npm run check
npm test
npm run format:check
npm run build
npm run test:e2e
```

Playwright starts a fresh production preview at `127.0.0.1:4181`. It uses `/usr/bin/chromium`; override `PLAYWRIGHT_CHROMIUM_PATH` if needed. Avoid starting a separate server on that test port. `build/` contains the independently deployable static site, including all six case-study routes and the credits page. Hosting does not require Node or GitHub credentials.

## Content

- `src/lib/content/profile.ts`: identity, contact details, navigation.
- `src/lib/content/projects.json`: independently editable case studies and media references.
- `src/lib/content/projects.ts`: typed project schema and additional repositories.
- `src/lib/content/services.ts`: services and engineering capabilities.
- `src/lib/content/github-cache.json`: checked-in public GitHub reference snapshot; imported on the server only.
- `src/lib/components/`: shared presentation, layout, and interaction components.
- `src/routes/projects/[slug]/`: reusable, prerendered project detail pages.
- `public/projects/`: optimized original interface captures, portrait, and retained license notices.
- `docs/RESEARCH.md`: source evidence, media provenance, license and ownership distinctions.

Contact uses mailto and tel links. The phone is +1 (868) 579-9523; email is rvesprey@gmail.com. There is no Instagram link, contact-processing endpoint, tracker, or analytics script.

## Refresh GitHub references

```sh
npm run sync:github
```

This deliberately refreshes public metadata, README text, and normalized README image candidates. It supports relative Markdown images, HTML image tags, reference-style images, GitHub blob URLs, user attachments, SVGs, GIFs, and external HTTPS sources. No API call occurs on a page view or ordinary build. Partial failures retain per-repository cached content, and snapshot writes are atomic. Per-repository retrieval dates remain available when only some references refresh.

`GITHUB_TOKEN` is optional and used only by the local synchronization process; no token is written into the snapshot or sent to the browser. The sync never changes presentation copy or downloads newly discovered media automatically. Review documentation and media rights, then deliberately update `projects.json` and the published assets. Do not treat a code license as blanket permission for third-party imagery.

## Screenshots & performance

```sh
npm run preview -- --port 4181
# In a second terminal:
node scripts/capture.mjs
npm run audit:performance
```

Screenshots and synthetic Lighthouse reports are ignored under `artifacts/`. Local Lighthouse scores are diagnostics, not real-user performance claims. The mobile and reduced-motion experiences skip GSAP and Lenis. All meaningful content and native service disclosure controls remain usable without JavaScript.

## Deployment

See [deployment and rollback](docs/DEPLOYMENT.md), [architecture](docs/ARCHITECTURE.md), and [verification](docs/QA.md). `npm run stage` packages `build/` as `artifacts/thewriterco-staging.tar.gz` with a SHA-256 checksum. The Sites manifest is separate from the custom-domain hosting configuration. Publishing the private review site does not change the existing thewriterco.com DNS or hosting.
