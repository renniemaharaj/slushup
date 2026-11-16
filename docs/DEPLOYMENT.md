# Deployment and rollback

## Current state

This delivery is local. The live Cloudflare-backed website remains operational. No production deployment credentials, Nginx access, DNS changes, or externally hosted staging environment were supplied. `build/` is a complete static staging build, and `artifacts/slushup-staging.tar.gz` is the release archive. Do not deploy source files or `node_modules`.

## Verify and package

Use Node 24 LTS. `npm ci` reproduces the lockfile. Run from the repository root:

```sh
npm run release
```

For an isolated staging hostname, unpack the archive into a new release directory and point that hostname's document root there. Protect staging through the hosting platform's access control and send `X-Robots-Tag: noindex` there. Keep the production canonical URLs in the HTML. Verify the final HTTPS hostname before switching production.

The build minifies JavaScript and CSS and generates responsive AVIF/WebP images. Cloudflare Pages handles response compression, so build-time precompression is disabled. WebP is the fallback, avoiding redundant generated JPEG variants. Original public media URLs remain available. The archive contains only `build/` contents. Verify it from `artifacts/` with `sha256sum -c slushup-staging.tar.gz.sha256` before extraction.

## Cloudflare Pages

Upload the contents of `build/` directly to Cloudflare Pages. Pages serves compressed responses automatically; `.br` and `.gz` copies and the Nginx configuration are not needed for this deployment. The homepage metadata is already present in `build/index.html` before upload.

## Alternative Nginx/CDN hosting

`deploy/nginx.conf` is an HTTP origin configuration intended to sit behind a TLS-terminating CDN or reverse proxy. For direct Internet hosting, configure valid TLS certificates and an HTTP-to-HTTPS redirect in the infrastructure layer. Never expose this origin directly without the intended proxy/TLS arrangement.

Set the document root to `/var/www/slushup/current`. Serve real missing paths as 404s through the supplied `404.html`; do not configure an SPA fallback. Existing site URLs were `/`, section hashes and `?album=bars|drinks|moments`, all preserved. Original image and video paths remain available.

Hashed `/_app/immutable/` assets have a one-year immutable cache policy. HTML revalidates. Public compatibility media and local fonts cache for seven days. Enable CDN Brotli/gzip, or Nginx dynamic gzip as shown. Build-time precompression is disabled for the Cloudflare Pages deployment.

## Release switch

1. Keep the current production document root intact and record its target.
2. Create a fresh release directory, for example `/var/www/slushup/releases/2026-11-15-svelte`.
3. Verify the archive checksum and unpack the archive into that directory.
4. Validate on the staging hostname: navigation, mobile menu, carousel, all gallery filters/lightbox, Google Form, WhatsApp, social links, canonical/OG tags, sitemap, robots, 404s, and compressed responses.
5. Test Nginx configuration with `nginx -t` if its configuration changed.
6. Create a temporary symlink to the verified release, then atomically rename it over `/var/www/slushup/current`. Reload Nginx only if configuration changed.
7. Purge/revalidate HTML in the CDN. Keep old hashed assets available for already-open sessions: copy previous `/_app/immutable/` files into the new release without overwriting new files, or use a shared immutable asset store.
8. Check the public HTTPS page and repeat the critical booking/contact smoke tests without submitting a real booking.

## Rollback

Keep the prior release directory. Atomically switch `current` back to it and purge/revalidate HTML in the CDN. Retain the new assets temporarily for cached/open pages. No database or API changes exist to reverse.

The original source is at commit `9ba57e9` and branch `backup/react-before-svelte-2026-11-15`. Rebuild it in a separate worktree if needed, leaving this checkout and its audit evidence intact:

```sh
git worktree add ../slushup-react-rollback backup/react-before-svelte-2026-11-15
cd ../slushup-react-rollback
npm ci --ignore-scripts
npm run build
```

The original React output is `dist/`; the new Svelte output is `build/`. A local archive of the original production output was also saved in `/tmp/slushup-react-production` during migration; Git is the durable source of truth.

## Monitoring after release

Repeat Lighthouse against the real HTTPS origin after CDN warming. Field LCP/CLS/INP at the 75th percentile require real traffic; local Lighthouse cannot establish them. If the business enables analytics later, choose an approved privacy policy and consent approach first. No analytics or tracking scripts are introduced in this migration.
