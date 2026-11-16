# Homepage metadata

`src/lib/content/seo.ts` is the homepage's source for the title, description,
canonical URL, locale and sharing image. `src/routes/+page.svelte` renders it into
the prerendered HTML head. Social crawlers receive the complete metadata without
running JavaScript. Tracking query parameters do not change the canonical URL.

| Group      | Fields                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Search     | Title, description, author, canonical URL, robots index/follow and preview permissions                                                      |
| Open Graph | Type, site name, locale, title, description, canonical URL, image, secure image URL, MIME type, width, height and alt text                  |
| X cards    | Large-image card type, title, description, image and image alt text                                                                         |
| JSON-LD    | Linked Organization, WebSite, WebPage and ImageObject nodes; business logo, telephone, social profiles, service country and booking contact |
| Document   | English language for Trinidad and Tobago, UTF-8, responsive viewport, theme colour, favicon and Apple touch icon                            |

The sharing image is the existing `/og-slushup.jpg`: a public 1200 x 630 JPEG of
the actual drinks. No X account, Facebook app ID, street address, prices or review
ratings are invented. Policy pages retain their own titles, descriptions and
canonical URLs.

Open Graph image properties follow the [protocol specification](https://ogp.me/).
The WebSite node provides the site identity described in Google's
[site-name guidance](https://developers.google.com/search/docs/appearance/site-names).
Structured data and metadata supply information; providers control the final
preview and may cache older versions after deployment.

## Skaia comparison

The inspected package is at
`/home/renniem/Workspace/docker/skaia/backend/internal/seo`, rather than the
frontend path supplied in the request.

Skaia's `handler.go` loads branding and global SEO configuration, resolves public
route content from the database, and caches semantic metadata. `helpers.go`
prefers route-specific titles, descriptions and images, then falls back to global
SEO values and branding. It strips HTML from text and limits page descriptions
to 160 characters. Regular routes cache for 24 hours, missing routes for five
minutes, and live routes are not cached.

`meta.go` renders the title and description into standard, Open Graph and X tags.
It also supplies canonical/OG URLs, the sharing image and alt text, favicon,
website type, site name and large-image card type. It supports image dimensions,
but the current `imageMetaFromReference` helper only infers the MIME type from
the filename. `url.go` produces absolute URLs using the configured public origin;
`injection.go` inserts escaped metadata into the SPA's HTML placeholders before
the response is sent. Missing/private routes receive noindex/nofollow metadata.

SlushUp uses that same initial-HTML approach at build time, with its static
business content and known image dimensions. It also adds locale, a secure image
URL, preview permissions and linked structured data.

## Verification

After `npm run build`, run:

```sh
npx playwright test tests/seo.spec.ts
```

The checks use Facebook, X and LinkedIn crawler user agents with JavaScript
disabled. They check tag consistency and uniqueness, canonical URLs, structured
data, and the sharing image's HTTP status, MIME type and decoded dimensions.
They verify crawler input, rather than posting to external social services.
