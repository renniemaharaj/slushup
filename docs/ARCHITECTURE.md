# Architecture

The personal site adapts the client implementation from commit `c24ed65` on an isolated branch. It retains SvelteKit's static adapter, Svelte 5 runes, strict TypeScript, CSS tokens, locally served Manrope, rounded sticky navigation, Bits UI focus management, shared Button behavior, and lazy GSAP/Lenis lifecycle.

## Content and routes

Profile, navigation, services, capabilities, and case studies are separate typed content modules. `projects.json` is the presentation source for all six featured projects. One dynamic route uses generated entries to prerender `/projects/[slug]/`; no runtime API is needed. Project visuals distinguish original application captures from explanatory architecture compositions. News-Go and Aircon are described as experimental where documented; JVMS explicitly identifies Rennie as a contributor.

`github-cache.json` is a checked-in reference snapshot maintained by `scripts/sync-github.ts`. Presentation edits remain independent of repository refreshes. The credits route reads only the retrieval date through its server load function, keeping full README text out of browser bundles. Ordinary builds and page views make no GitHub requests. Network failures during an intentional refresh preserve existing repository entries; writes use a temporary file followed by atomic rename.

## Interaction and motion

The desktop header remains sticky using CSS, with a Bits UI dialog for the mobile menu. The dialog manages focus, Escape, and background interaction. Services use native named disclosure elements, so they work without JavaScript. Additional project filters use Svelte state with pressed-button semantics and a live count. Every project remains linked from the prerendered home page.

Desktop motion is loaded after the initial render only when reduced motion is off. GSAP applies small entrance offsets without concealing content; ScrollTrigger adds a restrained portrait movement. Lenis owns enhanced wheel scrolling and cancels pending inertia before native anchors navigate. Mobile and reduced-motion users retain native scrolling. Cleanup runs when the home route unmounts.

## Delivery

Static output is `build/`. WebP screenshots have explicit dimensions; all below-fold project images are lazy-loaded and retain their proportions. The portrait has responsive candidates. Fonts are local. The site has no third-party embeds or analytics. Shared SEO includes canonical metadata, social cards, and person information; each case study has its own title, description, canonical URL, and contributor data. Prerendered errors return a real 404.

The Sites hosting manifest declares the static output for a private review deployment. The Nginx example supports a separate thewriterco.com installation. Neither deployment requires a Node process, secret store, database, or browser-visible GitHub token.
