# Deployment and rollback

Build this feature branch independently of the client site:

```sh
npm ci
npm run quality
npm run stage
```

Deploy the contents of `build/` to a static host. Enable directory indexes so `/projects/aircon/` serves its prerendered `index.html`. Serve `404.html` with HTTP 404 for unknown routes. Do not configure an SPA fallback returning the homepage for missing pages.

## Custom domain

The source uses `https://thewriterco.com` for canonical URLs, sitemap entries, sharing metadata, and structured data. The supplied `deploy/nginx.conf` is an example origin behind a TLS-terminating proxy. Validate its configuration on the target server and replace the filesystem root as needed. Nginx is not required when using a managed static host.

Point the custom domain at the selected deployment only as a separate hosting operation. The private Sites review URL does not attach or modify the domain, and its source-repository synchronization is separate from the client GitHub repository. Keep the client branch and client-domain production deployment intact.

## Caching and headers

Use long-lived immutable caching for `/_app/immutable/`, revalidation for HTML, and moderate caching for the deliberately named public images. Enable compression at the CDN or origin. `public/_headers` supplies standard static-host security headers; equivalent Nginx directives are included. No cross-origin isolation is required.

## Rollback

Keep the previous static deployment or release archive, then redeploy it if necessary. The original client implementation is retained on `main` at `c24ed65`. Roll back the personal site by selecting the previous saved personal-site version, not by changing the client branch. No database migrations or mutable application state are involved.
