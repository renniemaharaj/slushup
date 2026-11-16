# Verification

The portfolio is verified against the isolated feature branch. The client `main` remains at `c24ed65`.

## Automated checks

Svelte's strict type check reports zero errors and warnings. Three unit tests cover README media URL resolution, rejection of unsafe media protocols, and preservation of the last working content snapshot during a GitHub outage. The deliberate live reference refresh retrieved all twelve configured repositories successfully.

The browser suite checks six widths from 360 to 1920 pixels, correct phone/email links, absence of Instagram, mobile menu focus and Escape behavior, keyboard service disclosure, gallery filters, all six prerendered project routes, no-JavaScript content, reduced motion, canonical/social metadata, sitemap, credits, and real 404 responses. Automated WCAG 2.2 AA checks cover the desktop homepage, mobile menu, and mobile Aircon detail page. Three visual baselines cover 390, 768, and 1440 pixels.

## Visual review

The homepage was captured at desktop, tablet, and mobile widths. The hero, project media, expertise section, and Chronicle detail composition were inspected. Images are actual repository captures or the supplied portrait, retain their proportions, and include the documented media attribution. Architecture diagrams are explicitly labeled and are not presented as screenshots. No invented projects, testimonials, prices, or adoption metrics appear.

Local screenshots are ignored under `artifacts/screenshots`. Lazy screenshots are decoded before final capture. Browser checks use installed Chromium; these results do not establish physical-device or Safari/Firefox coverage.

## Local performance diagnostics

Serial Lighthouse profiles on the production Vite preview returned:

| Profile | Performance | Accessibility | Best practices | SEO | LCP   | CLS | TBT    |
| ------- | ----------: | ------------: | -------------: | --: | ----- | --: | ------ |
| Mobile  |          97 |           100 |            100 | 100 | 0.9 s |   0 | 200 ms |
| Desktop |         100 |           100 |            100 | 100 | 0.5 s |   0 | 0 ms   |

Reports are in ignored `artifacts/performance`. These are local synthetic diagnostics, not real-user percentiles or a promise of identical production scores. Content and fonts are served locally; the ordinary site does not call GitHub, an external font service, analytics, or a contact backend.

## Deployment limits

The portfolio is packaged as a static site for a separate private review deployment. The existing client deployment and thewriterco.com domain configuration have not been changed. The Nginx example requires validation on an Nginx deployment host if used. A saved source version, static output archive, and retained Git history support rollback.
