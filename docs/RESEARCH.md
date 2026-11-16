# Rennie portfolio research

Retrieved public GitHub sources 2026-11-16. No private employer repositories accessed. Application and branches unchanged by research.

## Contact and identity

- Profile README: https://github.com/renniemaharaj/renniemaharaj/blob/main/README.md
- GitHub: https://github.com/renniemaharaj
- LinkedIn from README: https://linkedin.com/in/renniemaharaj
- Email: rvesprey@gmail.com
- Website: https://thewriterco.com
- Portrait: https://avatars.githubusercontent.com/u/13787979?v=4 (downloaded media/rennie-avatar.jpg, 460 × 460); visually matches user-supplied portrait.
- Public README identifies Software Engineer & Integrations Consultant, HRTM Consulting Inc. (2024–Present); TeleStaff automation/import/validation, reporting/analytics, ERPNext/Frappe/payroll integrations. This confirms supplied experience wording; no private implementation details accessed.

## Ownership and license distinctions

All featured repositories below are owned under renniemaharaj and GitHub metadata says fork:false, except JVMS is upstream ystyle/jvms. Rennie contributed merged PRs there; never describe him as sole author/maintainer of JVMS or author of Frappe, ERPNext, Apache Superset, QEMU, Windows or third-party AI models.

- go-web-framework: verified MIT LICENSE, copyright 2026 Go Web Framework contributors.
- aircon: verified MIT LICENSE, copyright 2026 Aircon contributors.
- chronicle: verified MIT LICENSE, copyright 2026 renniemaharaj.
- go-api-kit: verified MIT LICENSE, copyright 2026 Renniemaharaj.
- frappe: verified MIT LICENSE, copyright 2026 renniemaharaj; this licenses Rennie's Compose environment, not automatically all upstream software/branding.
- superset-docker: verified MIT LICENSE, copyright 2026 renniemaharaj; README specifically preserves Apache Superset licensing/trademarks.
- google-gemini-pool: verified MIT LICENSE, copyright 2025 The Writer Company (TheWriterCo).
- windowsvm: no GitHub-detected license, no root license file, README does not claim license. Display “License not specified.”
- news-go: README says MIT, but root has no standalone license and GitHub license:null. Display “MIT stated in README” if needed, or omit badge.
- kjv-bible: README says MIT, but root has no standalone license and GitHub license:null. KJV text provenance/rights separate; README says public domain in many jurisdictions. Avoid blanket worldwide public-domain claims.
- ystyle/jvms: verified MIT LICENSE on default branch new, exact file has placeholder copyright “Copyright (c) <year> <copyright holders>”. Preserve full license as supplied if copying. LICENSE source: https://github.com/ystyle/jvms/blob/new/LICENSE
  Full license texts downloaded here as *-license.txt.

## Featured case studies

### Go Web Framework

Repo https://github.com/renniemaharaj/go-web-framework (main).
README https://github.com/renniemaharaj/go-web-framework/blob/main/README.md
Multi-tenant application platform with separate PostgreSQL databases per tenant, namespaced Redis, domain-based nginx routing and Go grengo CLI managing tenant lifecycle/scaling/configuration.
Stack documented: React 19, TypeScript, Vite, Jotai, TipTap, Monaco; Go, chi/v5, gorilla/websocket, lib/pq; PostgreSQL 16, Redis 7, Stripe v82, nginx, Docker Compose.
Features: CMS/page builder, forums, commerce, inbox, notifications, RBAC, WebSocket presence/chat, server-injected SEO and sitemap. Optional WebSocket rerouter supports selected REST endpoints, preserving HTTP authorization/response boundaries. Do not imply all endpoints are rerouted.
Engineering narrative: one codebase supporting separate tenant data/feature configuration, real-time updates and searchable public pages.
README screenshots from real running app, synthetic content and custom branding, Chromium capture 2026-11-10. No real accounts/customer content/credentials; source https://github.com/renniemaharaj/go-web-framework/blob/main/assets/README.md.
Media:

- media/go-web-framework-landing.png 1440×1160; source raw.githubusercontent.com/renniemaharaj/go-web-framework/main/assets/landing-page.png
- media/go-web-framework-builder.png 1440×1260; source raw.githubusercontent.com/renniemaharaj/go-web-framework/main/assets/page-builder.png
- media/go-web-framework-forums.png 1440×1080; source raw.githubusercontent.com/renniemaharaj/go-web-framework/main/assets/forums.png
  Other authentic README images assets/site-drawer.png, custom-pages.png, custom-page.png, store.png.

### Aircon

Repo https://github.com/renniemaharaj/aircon (main).
README https://github.com/renniemaharaj/aircon/blob/main/README.md
Docs https://github.com/renniemaharaj/aircon/blob/main/docs/README.md
Shared Go core with Android Kotlin/Compose + gomobile bridge and Linux daemon/CLI/Bubble Tea TUI; SQLite; Go/Python SDKs. Nearby Wi-Fi/Wi-Fi Direct connections without internet, Bluetooth or central accounts.
Identity/approval/encryption shared by platforms; pinned Noise XX, X25519, ChaCha20-Poly1305. Direct encrypted messages, guest chats, groups, media, permission-controlled files and attendance checks.
Status explicitly experimental. Multi-hop currently serves files; chat/sensors/internet use direct connections. Groups have direct host that can read messages. No independent security audit. Native Linux Wi-Fi P2P negotiation depends on adapters and failed tested path; Android owner group + Linux managed client validated. Avoid “fully decentralized secure mesh chat” or production security claims.
Architecture evidence https://github.com/renniemaharaj/aircon/blob/main/docs/architecture.md (downloaded aircon-architecture.txt).
Image source/license evidence https://github.com/renniemaharaj/aircon/blob/main/docs/images/README.md: original documentation artwork MIT; screenshots unmodified prior physical Android test captures, test content, no pairing QR credentials; current UI may differ.
Media:

- media/aircon-guest-messaging.png 720×1610
- media/aircon-communities.png 720×1610
- media/aircon-attendance.png 720×1610
- media/aircon-mesh.svg original topology diagram (does not imply measured radio range)
  All source paths docs/images/{basename}, except mesh basename aircon-mesh.svg.

### Chronicle

Repo https://github.com/renniemaharaj/chronicle (main).
README https://github.com/renniemaharaj/chronicle/blob/main/README.md
Architecture https://github.com/renniemaharaj/chronicle/blob/main/docs/architecture.md
Local research workspace automatically planning investigation, searching sources/retrieving passages via MCP, and assembling inspectable historical records with timelines, graph, maps and narrated story playback.
One Go process serves static SvelteKit application. Svelte 5/TypeScript, Svelte Flow, Leaflet. Canonical domain entities/events/claims/sources/evidence/conflicts separated from graph UI projections. Historical dates use explicit calendars/precision/uncertainty and signed astronomical years rather than JavaScript Date. Owner-only atomic files or PostgreSQL (normalized records + versioned snapshot in same transaction). Ollama and compatible chat-completions providers through small model interface. Checkpointed research plan/request/tools/audit records; secrets excluded from logs/settings responses.
Avoid treating AI-generated histories as verified ground truth; research standards retain uncertainty and inspectable evidence.
Asset proof/credits https://github.com/renniemaharaj/chronicle/blob/main/docs/assets.md (downloaded chronicle-credits.txt).
Five repository screenshots are user's original unedited interface captures.
Use Rome images to avoid subject portrait:

- media/chronicle-rome.png (1877×905) from docs/images/chronicle-rome-story-republic.png
- media/chronicle-colosseum.png (1880×910) from docs/images/chronicle-rome-story-colosseum.png
  Maps use OpenStreetMap contributors; keep screenshot attribution visible and include linked text https://www.openstreetmap.org/copyright.
  Downloaded media/chronicle-story.png shows Céline Dion portrait: photograph “Celine Dion Live 2017” by Egghead06, CC BY-SA 4.0; source https://commons.wikimedia.org/wiki/File:Celine_Dion_Live_2017.jpg; license https://creativecommons.org/licenses/by-sa/4.0/. The repo says portrait is cropped in app frame. Avoid using this image unless crediting photo/crop/license. The Céline story-mode image may contain same profile portrait; avoid all Céline screenshots if minimizing rights complexity. Video-collection image contains official archive thumbnails, rights not blanket MIT; omitted from downloads.

### Go API Kit

Repo https://github.com/renniemaharaj/go-api-kit (main).
README https://github.com/renniemaharaj/go-api-kit/blob/main/README.md
A small HTTP toolkit using chi internally while public Router/HandlerFunc stay compatible with net/http. Handlers can register directly; optional grouping/policies; ergonomic JSON/text/HTML/file helpers; environment-driven startup/middleware; optional frontend directory, explicit routes first; health endpoint; optional generic loading cache with bounded LRU/TTL/scopes/invalidation.
Architecture packages kit (router/HTTP/helpers/middleware/runtime/safe files), v8 (startup/health/frontend), data (optional independent cache), internal (bounded cache/env/files).
Middleware source https://github.com/renniemaharaj/go-api-kit/blob/main/docs/middleware.md verifies shared IP token bucket, request deadlines, optional exact-origin CORS, JWT HS256/RS256, roles/subject policies, fail startup invalid config. Rate limits process-local; default timeout doesn't support streaming/hijacking.
Design narrative: minimal working server without mandatory repository/service abstractions, with optional features as application needs grow.
Only README image is actual application mark media/go-api-kit-icon.png 1254×1254 transparent; source docs path dist/assets/v8.png. No authentic UI screenshot documented; use small icon or custom code/architecture composition, never pretend generic screenshot is application.

### Frappe Docker

Correct repo https://github.com/renniemaharaj/frappe (main), not frappe_docker nor HRTM private project.
README https://github.com/renniemaharaj/frappe/blob/main/README.md
Unofficial Compose development environment automates sites/apps driven by instance.json. Frappe/ERPNext with MariaDB, Redis cache/queue/socketio, persistent bind mounts. Go-based goftw entrypoint applies configuration to runtime; Shell alternative handles instance.json too. App install/alignment/migration and health dependencies; production/development modes.
Ownership: Rennie's environment and provisioning, not Frappe/ERPNext core. Do not surface employer-specific app names/config examples in marketing.
One README illustration media/frappe-explained.png 1000×420, generic “Frappe Framework Explained” graphic, source docs/images/frappe-framework-explained.png. No dedicated attribution/source record found, not an app screenshot. Recommended avoid publishing this asset; draw own topology using verified services instead.

### JVMS contributions

Upstream https://github.com/ystyle/jvms, default branch new, Go Java version manager originally Windows-oriented. README https://github.com/ystyle/jvms/blob/new/README.md. Repository owner ystyle. Rennie's contribution work extends provider plumbing; don't promise SDKMAN support already shipped (PR 78 says future follow-up).
All four PRs verified closed and merged; author renniemaharaj:

- #75 “Feat: Tui, jdk version caching and cleanup” https://github.com/ystyle/jvms/pull/75 — interactive installation/switching picker, 24h fetched-version cache, legacy commands preserved.
- #76 “Fix: invalidate cache race & cleanup” https://github.com/ystyle/jvms/pull/76 — shared getJdkLock coordinates invalidation/background preload and reuses newly fetched versions.
- #77 “Jdk Provider Standardization & streaming” https://github.com/ystyle/jvms/pull/77 — separate provider implementations, streaming and error propagation for slower providers.
- #78 “refactor: introduce platform provider architecture” https://github.com/ystyle/jvms/pull/78 — platform.Provider abstraction, CLI provider routing, config cleanup/direct-path switching/provider-aware TUI/testing/tooling. SDKMAN explicitly follow-up.
  Own contribution screenshot from PR75 media/jvms-tui.png 1485×757; source https://github.com/user-attachments/assets/e0c5af8f-f4f3-41e5-b8e1-855a278b3370
  Three more own screenshots in same PR:
  https://github.com/user-attachments/assets/3067863a-808c-4e07-bdf3-bd3df026253e
  https://github.com/user-attachments/assets/f835a4b3-3971-4a20-b5ac-660d86ce7a93
  https://github.com/user-attachments/assets/40a1f800-35fc-4e7d-8a75-7a3581d00d99
  These screenshots posted by Rennie; credit as contributor's JVMS TUI screenshot with link PR75. Link upstream MIT; don't attribute upstream ownership to him.

## Additional projects

- Windows VM exact slug windowsvm: https://github.com/renniemaharaj/windowsvm. QEMU/KVM Windows 11 launcher for Linux; SPICE text clipboard, Intel HD Audio/PipeWire, Samba transfer, MCP lifecycle/guest PowerShell/file/audio tools with one-time elevated guest install. Python/Shell/Go/PowerShell. Experimental GPU passthrough explicitly fails Code 43 on tested laptop; don't promote as working GPU acceleration. No README image.
- Superset Docker https://github.com/renniemaharaj/superset-docker. Custom container deployment, Python slim base, Gunicorn threads, PostgreSQL persistence, Redis, Nginx, Google BigQuery drivers/key mounting; required/optional Docker layers. Deployment authored by Rennie, Apache Superset upstream. media/superset-dashboard.png 1024×624 depicts generic World Bank sample dashboard, not client work or self-authored Superset UI. Source raw.githubusercontent.com/renniemaharaj/superset-docker/main/docs/images/world-bank-dashboard.png. Image provenance beyond repo unverified; prefer neutral architecture composition if uncertain.
- Google Gemini Pool https://github.com/renniemaharaj/google-gemini-pool. Concurrent-safe Go key pool/load scheduling for multiple Gemini API keys, rate-limit allocation/queueing, automatic retries/validation. MIT verified. No README images.
- News-Go https://github.com/renniemaharaj/news-go. Go/Python channel-based concurrent search/scrape/transform pipeline with local GGUF LLM and structured JSON reports, explicitly Christian/KJV worldview evaluation. Label an experiment; avoid presenting it as neutral fact-checking. README says MIT, no root license file. No README images.
- KJV Bible https://github.com/renniemaharaj/kjv-bible. Machine-readable 66-book chapter/verse JSON corpus plus separate marker DTOs, strict structural audits, SHA-512 manifest/fingerprint and staged-snapshot Git hook. Python/TypeScript/Shell. Exact hash proves snapshot equality, not textual historical correctness; do not claim otherwise. README MIT statement, no standalone file. No images in README.

## Research artifacts

- github.json: full original READMEs plus public repo metadata, licenses/topics and per-language byte counts (for 10 owned projects; never hardcode changing star/follower metrics into UI).
- media-sources.json: original URLs for all downloaded media.
- media/: downloaded authentic assets, include only those appropriate above.
- *-license.txt: full upstream license texts.
- jvms-pr-75.txt / jvms-pr-76.txt: raw PR metadata.
- chronicle-credits.txt, go-framework-assets.txt, aircon-architecture.txt: documentary evidence.
