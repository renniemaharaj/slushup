# Banners and supplied media

`Banner` supplies the shared surface and composable leading, body, and action snippets. `PromotionBanner` and `CookieBanner` supply content; `BannerStack` owns ordering, timing, dismissals, and the artwork modal. The root layout mounts the system on every route. Bits UI dialogs provide focus trapping, Escape, backdrop dismissal, and focus restoration.

Edit promotions in `src/lib/content/promotions.ts`. Dates must include an explicit offset. Business display uses `America/Port_of_Spain` (UTC-04:00). Starts are inclusive and ends are exclusive: `2027-01-01T00:00:00-04:00` includes all of December 31, 2026. Higher priority appears first. The client checks precise schedule boundaries and refreshes on focus and visibility changes, so static builds do not freeze a promotion's eligibility. Increment `version` to show a revised promotion again; do not change IDs for ordinary edits.

Dismissals use `slushup:promotion:<id>:dismissed-version`. Cookie preferences use `slushup:cookie-consent:v1`, with independent analytics and marketing booleans. Invalid or absent consent means optional categories are off. Storage failures preserve choices for the current visit. Clearing browser site data resets local choices.

No optional tracking integrations are configured. Register future integrations in `src/lib/consent/optional-integrations.ts`. SDK imports and script injection belong inside `enable`, which runs only after the appropriate consent. Its returned cleanup must stop tracking and clear that integration's cookies when consent is withdrawn. Cleanup also runs if a delayed load finishes after withdrawal. Do not add tracking scripts to app HTML or load them through an unconditional import.

The announcement lane fits its visible banners, up to 216px on desktop and 360px below 901px. A single banner uses only its content height and padding; an empty lane collapses completely. Extra promotions scroll within this bounded area. The navigation follows the measured lane height until it scrolls offscreen, then stays at its usual top position. Reduced motion disables banner transitions.

Supplied artwork is retained at `src/lib/assets/originals/end-of-year-discount-2026.jpeg`, with a full uncropped copy and a small preview in `public/promotions/`. The three birthday photographs are retained with descriptive names in `src/lib/assets/originals/`, with JPEG display sources in `src/lib/assets/` and compatibility copies in `public/`. All three are included in the gallery, now 31 images (5 bars, 19 drinks, 7 moments).
