# Quality and migration evidence

## Verified application

- SvelteKit 3.2.0, Svelte 5.57.3, Vite 8.3.8, TypeScript 6.0.3. No React, React DOM, Tailwind, React adapters or compatibility layers.
- Strict type check: zero errors and warnings. Three Vitest content migration contracts pass.
- Twenty-three Chromium checks pass, including direction-preserving wheel scrolling and anchor navigation during inertia: navigation, external booking destination, mobile focus trap/Escape, filter query URLs, gallery expansion, lightbox looping/keyboard/focus return, occasion arrows/keyboard, service details and controls, actual touch swipe, six responsive widths, reduced motion, no-JavaScript rendering/booking, WCAG 2.2 AA in page and dialog states, deferred setup video and SEO/404 responses.
- Visual regression at 390, 768 and 1440 pixels passes against inspected baselines, including a separate verification run without snapshot updates.
- The two new scroll regressions also pass in both Firefox and WebKit.
- Six Firefox checks and six WebKit checks previously passed during migration: navigation, menu focus, filters/lightbox, occasion controls, no-JavaScript content and the accessibility sweep.
- All requested widths (360, 390, 768, 1024, 1440, 1920) pass horizontal overflow checks before and after section navigation.
- Desktop, tablet and mobile screenshot diagnostics report no runtime errors, overflow or broken images.
- Original Google Form resolves through its redirect to HTTP 200. Booking navigation is intercepted in automated tests to verify the precise destination without sending an enquiry. WhatsApp number and original social URLs are preserved; no messages or bookings were sent.

## Visual review

Every completed section was captured at 390, 768 and 1440 pixels in `audit/after/`. Full-page before/after captures are available in `audit/before/` and `audit/after/`. The design follows the supplied forest-green/ivory/lime direction, rounded navigation, photographic hero, overlapping experience composition, four service cards, editorial occasion carousel and curved section transitions. Actual SlushUp photography replaces the reference's illustrative drinks. The full gallery is retained rather than reduced to the reference's narrow gallery strip. All eight subsequently supplied photographs are included, bringing the gallery to 28 entries; new imagery also appears in the experience and occasion sections. The supplied Premium Drinks Bar logo replaces the previous header/footer mark and is included in structured data and browser/touch icons. The unsupported testimonial, scheduling action and legal links are omitted.

The typography refinement raises reading copy to 16px, lead copy to 16–18px and supporting text/controls to at least 14px. Repeated uppercase labels, decorative service/menu numbering and per-section rise transforms were removed. The scroll regression records animation-frame positions as the pointer crosses carousel cards and plain section space in both directions. Before the fix, this reproduced a 243px backward snap during downward scrolling. Horizontal carousel viewports now share the page's vertical wheel handling, and native anchors cancel pending wheel inertia without a second header offset.

Visual QA corrected decorative-ring overflow on mobile, a low-contrast small accent, caption contrast during opacity reveals, scaling applied to Embla's positioning element, and a track margin that caused snapshot alignment to shift. Reduced motion also disables Embla's programmed scrolling duration.

## Performance

Final comparable measurements are recorded in `audit/before/performance-summary.json` and `audit/after/performance-summary.json`, with complete Lighthouse JSON beside them. Runs are serial on the same machine, Chromium build and Lighthouse version, using compressed production outputs. Mobile uses Lighthouse's default simulated mobile conditions; desktop uses its official desktop config, including screen emulation and throttling. Scores are diagnostics from local synthetic tests, not real-user percentiles.

The original build contains a single 358.89 KB JavaScript bundle (113.40 KB gzip) and 43.01 KB CSS (6.94 KB gzip). The migrated primary route module is approximately 45 KB before compression (15 KB gzip); shared Svelte/Bits UI runtime chunks are additional and must not be omitted when considering total JavaScript. GSAP, Lenis, Embla and lightbox interactions are split into feature chunks. Mobile and reduced-motion users do not load GSAP/Lenis. Zod runs during prerendering rather than in the browser.

No field INP or 75th-percentile LCP/CLS claims can be established before deployment and real traffic. Lab total blocking time is reported separately; it is not an INP measurement.

Comparable final lab results:

| Profile | Version         | Performance | Accessibility | Best practices | SEO | LCP   | CLS   |
| ------- | --------------- | ----------- | ------------- | -------------- | --- | ----- | ----- |
| Mobile  | React baseline  | 96          | 91            | 100            | 100 | 1.7 s | 0.006 |
| Mobile  | Svelte redesign | 98          | 100           | 100            | 100 | 2.0 s | 0     |
| Desktop | React baseline  | 100         | 91            | 100            | 100 | 0.2 s | 0.001 |
| Desktop | Svelte redesign | 100         | 100           | 100            | 100 | 0.5 s | 0     |

The typography/scroll refinement was re-audited on the compressed static output before the final eight-photo import (the hero is unchanged): mobile 98 (LCP 2.0s, CLS 0, TBT 80ms), desktop 100 (LCP 0.5s, CLS 0, TBT 40ms), with accessibility, best practices and SEO at 100 in both profiles. Preliminary Vite-preview runs scored 81–89 on mobile; those are not the comparable static-host measurements used in the table.

The photographic redesign adds visual content while staying inside the requested LCP and CLS budgets. Initial exploratory Lighthouse runs returned lower performance scores while audits ran concurrently; the table uses the comparable serial runs, not those preliminary figures.

## Remaining verification limits

WebKit's six core checks passed using an isolated copy of Playwright WebKit 27.2 with official Ubuntu ICU 74 and libxml2 compatibility libraries extracted under `/tmp/slushup-webkit-compat`. No system library or desktop configuration was changed. Chromium and Firefox use their normal installed runtimes. These are automated engine checks, not physical iPhone/iPad validation. On a supported CI host, use Playwright's standard browser/dependency installation rather than relying on the temporary compatibility runtime.

Nginx configuration is supplied for alternative hosting; Nginx is not installed here, so `nginx -t` must run on that deployment host if used. The current Cloudflare Pages deployment handles response compression automatically, and build-time gzip/Brotli copies are disabled. Local staging HTML, robots, sitemap, sharing image and error document are present. Production was not changed.

The full npm advisory audit reports eight low-severity dependency entries, all rooted in a deepmerge prototype-poisoning advisory. The affected paths include Svelte build tooling and Bits UI helpers. Registry suggestions involve incompatible downgrades, so no automatic downgrade was applied. The deployed release has no server endpoints or untrusted option-object merging. The advisory remains documented for dependency-update review. No moderate, high or critical advisory was reported. See `audit/after/dependency-audit.json`; the production-filtered report is saved separately.

## Reproduce

```sh
npm ci
npm run check
npm test
npm run format:check
npm run build
npm run test:e2e
npm run test:visual
PLAYWRIGHT_BROWSER=firefox npx playwright test tests/site.spec.ts --grep 'renders cleanly|mobile menu|filters deep-link|occasion carousel|without JavaScript' --workers=1
npm run preview -- --port 4174
# In another terminal:
npm run audit:performance
node scripts/capture.mjs
npm run stage
```

To repeat WebKit checks on a supported host, install Playwright's WebKit browser/dependencies and run the same interaction suite with `PLAYWRIGHT_BROWSER=webkit`. Keep visual snapshots specific to the documented Chromium environment; Firefox/WebKit font rendering differs.
