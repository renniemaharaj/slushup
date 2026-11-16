# Migration checklist and audit

## Baseline: 15 November 2026

- Original commit: `9ba57e9`; preserved as branch `backup/react-before-svelte-2026-11-15`.
- React 19, Vite/rolldown 7, TypeScript 5.9, Tailwind 4, Framer Motion, Jotai, Radix. One route `/`, hash navigation; no application backend or router.
- Sections: hero, contact CTA, four expandable services, four occasions, benefits, filtered gallery, footer. Mobile navigation; query parameter `album=bars|drinks|moments`; gallery expansion.
- Gallery: 3 bars, 11 drinks, 6 moments. All source media retained. Full image dimensions recorded in `audit/before/media-inventory.txt`. Three MP4s, logo JPG, banner JPEG, favicon family; no bundled fonts.
- Booking: existing Google Form, ID `1HhmbzN6esy_Y-aFH37kuYePjXYxKx-KiR8Lh6tjUCws`. WhatsApp +1 868 784 7976. Instagram and Facebook URLs come from Premium.tsx. No email, physical address, approved testimonial, legal pages, or consultation scheduler supplied.
- Occasions: Birthday Parties, Corporate Events, Weddings, Professionals. Product launches are mentioned within corporate copy, not an additional category.
- Original SEO title/description/OG/Twitter saved in `audit/before/live-index.html`. No canonical or structured data. Live `/sitemap.xml` returns 404. Cloudflare provides robots content.
- Live HTML retrieved successfully via HTTPS; web reading tool could not access it. Browser captures and link inventory provide additional live evidence.
- Original production build passes: JS 358.89 KB (113.40 KB gzip), CSS 43.01 KB (6.94 KB gzip), HTML 2.43 KB. Lighthouse JSON and viewport screenshots are in `audit/before/`.
- Obsolete after migration verification: React, React DOM, Framer Motion, Jotai, Radix React, SWC React, old Tailwind/PostCSS configuration, React-specific TypeScript/ESLint files.

## Updated direction

User requested removal of Tailwind and root cleanup. The replacement uses scoped Svelte CSS and centralized CSS custom properties; no Tailwind dependency or utility classes.

## Execution

- [x] Repository, content, media, integrations and SEO audit
- [x] Preserve original source and build before replacement
- [x] SvelteKit 3 / Svelte 5 foundation, strict TypeScript, scoped CSS
- [x] Central tokens, local fonts, buttons, media and modal primitives
- [x] Hero, experience, services, occasions, gallery, benefits, booking, footer
- [x] Scoped motion, reduced-motion and no-JavaScript fallbacks
- [x] Production media processing, SEO and static output
- [x] Unit, interaction, accessibility, responsive and screenshot checks
- [x] Before/after Lighthouse and visual review
- [x] Architecture, staging, deployment and rollback documentation

## Version authority

Versions verified against npm registry and official documentation before installation. SvelteKit 3.2.0 requires Svelte >=5.57.1, TypeScript 6, Vite >=8.0.12 and Svelte Vite plugin 7. Enhanced-img 1.0.1 uses the same plugin/Vite generation. Node 24.19 satisfies engines.

Official references: https://svelte.dev/docs/kit/introduction, https://svelte.dev/docs/kit/adapter-static, https://svelte.dev/docs/kit/images, https://tailwindcss.com/docs/installation/using-vite, https://www.bits-ui.com/docs/components/dialog, https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/, https://github.com/darkroomengineering/lenis.
