# Architecture

## Rendering and content

SvelteKit 3.2 and Svelte 5.57 prerender `/` through adapter-static. The generated HTML contains all primary page sections, semantic navigation, headings, metadata, media sources, and real booking/contact anchors. Native service details work without JavaScript. Gallery enhancement reads the preserved `album` query parameter after mount because a static document cannot depend on per-request query parameters.

Zod validates business destinations during prerendering, so validation code is not shipped to the browser. Business URLs live in `src/lib/content/business.ts`. No form backend existed, so none is introduced: the original Google Form remains the booking system. WhatsApp has been upgraded from HTTP to HTTPS while preserving the number. Social profiles retain the original URLs. New copy draws on the supplied business content; no prices, customer quotes, unsupported legal credentials, physical address, or email have been invented. No legal links are added without approved legal documents.

## Design system

Plain CSS replaces Tailwind at the user's request. `global.css` centralizes brand colours, overlays, spacing, typography, focus, motion timing, layout containers and dialog surfaces. Components own their local composition styles. Manrope's Latin variable WOFF2 is local, preloaded and licensed under OFL; Georgia provides the restrained hero and brand-statement accent without a second font request. Shared type roles establish 16px body copy, fluid 16–18px leads and 14px minimum secondary text and controls. See `DESIGN-REFINEMENT.md` for the refinement plan.

`Button` is the shared link/button implementation, with four variants, three sizes, icons and loading/disabled states. `Media` owns responsive picture sources, dimensions, priority and lazy loading. `Brand`, `Wave`, `ServiceCard` and `SocialIcon` are other shared primitives. Bits UI owns focus trapping, Escape, background inertness and body scroll locking in the mobile menu, setup film and gallery lightbox. Lightbox restores focus to the originating photograph.

## Media

All original public media paths remain available for old links. Source photographs in `src/lib/assets/` are processed at build time by official enhanced-img into AVIF/WebP/JPEG sources with intrinsic dimensions and responsive widths. Nothing is fetched from stock-photo services. Below-fold images are lazy; the static hero is eager with high fetch priority. The gallery is initially limited to six items; all twenty original gallery photos and eight newly supplied photos are available through expansion and filtering. The new PNG originals are retained under `src/lib/assets/originals/`; high-quality JPEG display sources enter the same enhanced-img pipeline. The supplied Premium Drinks Bar logo is used in navigation, footer, structured data and browser/touch icons. Full-screen lightbox code loads on first use.

The 2.83-second setup film uses the original video stream with audio removed, preserving the original file separately. Native controls, inline playback, a poster and a descriptive track are provided. Video is mounted only while its modal is open; closing the modal removes playback and requests. There is no background autoplay, video hero, custom streaming engine or third-party video embed.

## Interactions and motion

Svelte 5 `$state`, `$derived`, `$props`, and `$bindable` manage component state. Embla's official Svelte action loads near a carousel through IntersectionObserver. The services action also waits for the mobile breakpoint, including when resizing from desktop. Desktop services use a regular four-column composition; mobile services swipe with Embla. The mobile services track has its own compositing hint and a positioned viewport so Embla measures slides in a consistent coordinate system. Service detail panels use opaque gradients without backdrop filters, and card painting is contained. Failed enhancement leaves native horizontal scrolling available. Occasions loop, with adjacent previews, controls and keyboard navigation. Scaled presentation lives inside the slide so it cannot compete with Embla's positioning.

The booking pill sits inside a zero-height sticky wrapper after the banner region. CSS moves it with the banners until the wrapper reaches the viewport top; the pill retains its mobile or desktop inset. Banner dismissal and resizing adjust normal document flow without measuring banner height or writing scroll positions to root CSS properties. The header therefore follows native scrolling without waiting for JavaScript scroll events, and the wrapper reserves no extra space above the hero.

The page dynamically imports GSAP/ScrollTrigger/Lenis after the desktop critical rendering period. Mobile and reduced-motion users skip that dependency path. Lightweight CSS establishes the hero reading order without hiding content. `gsap.matchMedia()` owns desktop/mobile preference changes and reverts scoped animations. Lenis runs on desktop only, from the GSAP ticker; cleanup removes the ticker and destroys Lenis. Wheel smoothing applies consistently across horizontal carousels. Native browser/SvelteKit anchors use the shared CSS scroll padding; a scoped capture handler cancels pending wheel inertia before an anchor navigates. Lenis does not independently handle anchors or add another header offset. Only the hero photograph uses scroll-driven parallax; sections remain stationary as they enter. Header appearance uses IntersectionObserver, not individual scroll listeners. No content depends on entrance animation completing, and animation import failure leaves native scrolling and content intact. No pinning is used because these sections do not justify it.

## Dependencies and configuration

SvelteKit 3 configuration lives in `vite.config.ts`, and TypeScript extends `$app/tsconfig`. `#lib/*` is a native package import alias. TypeScript 6 and Vite 8 match Kit 3's published compatibility requirements. Lucide's current Svelte package is `@lucide/svelte`; the older `lucide-svelte` name is deprecated. SVG brand icons remain local because the current Lucide library excludes brand marks.

Vitest checks content migration contracts. Playwright covers actual navigation, destination routing, filters, modals, focus, carousel state, SSR without JavaScript, reduced motion and six responsive widths. Axe checks WCAG 2.2 AA in page and dialog states. Visual snapshots are stored under `tests/visual.spec.ts-snapshots/`; screenshot artifacts and Lighthouse reports are in `docs/audit/`.

Official references used during implementation:

- https://svelte.dev/docs/kit/migrating-to-sveltekit-3
- https://svelte.dev/docs/kit/adapter-static
- https://svelte.dev/docs/kit/images
- https://www.bits-ui.com/docs/components/dialog
- https://github.com/davidjerleke/embla-carousel
- https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- https://github.com/darkroomengineering/lenis
