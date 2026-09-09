# Production Readiness Audit & Hardening — 2026-09-09

Full-loop autonomous audit pass (discover → audit → prioritize → fix → verify →
document) over the CEA-OS platform: frontend (TanStack Start on Vercel), backend
(Cloudflare Worker: Hono + D1 + R2 + KV + Durable Objects), SEO layer, security
model, data layer, and deployment configuration.

## Product reconstruction (summary)

- **What it is**: the public marketing/admissions site + operating system
  ("CEA-OS") for Cyber Elias Academy, a Nigerian tech-skills academy — five
  engines (Learning, Career, Services, ERP, Community), ~46 role workspaces,
  ~300 routes, 58 API route groups, 55 D1 migrations.
- **Category**: education platform + vertical ERP (primary), marketplace
  (career services) and content/SEO site (secondary).
- **Maturity entering this pass**: production candidate. Baseline verified:
  `tsc` green on both sides, **713/713 backend tests passing (715 after this pass)**, production
  build green, 0 broken internal links, 214-URL sitemap fully reconciled with
  the route tree, 404s answered with real HTTP 404.

## Findings and dispositions

### HIGH — Stored active content served from the API origin (`backend/src/routes/uploads.ts`)

- **Evidence**: `GET /v1/uploads/:key` served allowlisted objects with
  `Content-Disposition: inline`, and `image/svg+xml` is in the allowlist. The
  Worker origin carries the `cea_session` cookie (`SameSite=None; Secure`), so
  a malicious authenticated user's SVG (embedded `<script>`) opened as a
  document executes **in the API origin with session cookies attached**.
- **Root cause**: serving user-controlled bytes inline without origin-isolation
  headers.
- **Fix**: scriptable types (SVG; text/html defensively) are now served
  `attachment` + `Content-Security-Policy: sandbox`; all responses get
  `X-Content-Type-Options: nosniff`. Raster/PDF/text preview behavior is
  unchanged (`<img>` ignores `Content-Disposition`).
- **Result**: 2 regression tests added (`test/uploads.test.ts`, 7/7 green).
- **Note**: if `UPLOADS_PRESIGN_URL` is ever enabled, R2-served objects bypass
  these Worker headers — the bucket domain must then carry equivalent policy
  (or presign stays off; it is currently `""`).

### MEDIUM — Production CORS config shipped localhost origins (`backend/wrangler.jsonc`)

- **Evidence**: deployed `vars.FRONTEND_ORIGINS` included
  `http://localhost:5173/8081` (and the same file is the only config), so the
  production Worker accepted localhost browser origins with credentials.
- **Fix**: top-level (deployed) config = production origins only
  (`cea.ng`, `www.cea.ng`, Vercel preview). New `env.dev` block carries
  localhost origins + `APP_ENV=development` (dev magic-link tokens), full
  binding re-declaration (wrangler does not inherit bindings/vars into
  environments), and a `console` email provider. `npm run dev` uses
  `-e dev`; `wrangler deploy` is unchanged. Verified: local `--local` D1 state
  is shared across environments (migrations list identical), so dev DB recipes
  keep working.
- **Result**: full backend suite 713/713 green after the change.

### MEDIUM — Private surfaces relied on robots.txt only

- **Evidence**: ~250 `/app/**`, `/auth/**`, `/portal`, `/apply/status*` routes
  were only `Disallow`ed; blocked-but-indexable URL entries remained possible
  and per-route meta tags could drift (only 12/250 app routes have a `head`).
- **Fix**: server-level `X-Robots-Tag` via nitro `routeRules` (compiled into
  `.vercel/output/config.json` — verified in build output), plus robots.txt
  extended (`/portal/`, `/apply/status`, param disallow unified across bot
  sections) with a pointer comment to the header as the invariant.

### LOW — Structured-data entity inconsistency + dead SearchAction (`src/lib/seo.ts`)

- **Evidence**: `Organization.sameAs` / `twitter:site` used non-existent
  `@cea_ng` handles while the live footer links to `x.com/cybeliasacademy`,
  `instagram.com/cyberelias.tk`, `youtube/@CyberEliasAcademy`, facebook,
  linkedin. `WebSite.potentialAction` advertised
  `/search?q={search_term_string}` — no `/search` route exists (verified by the
  link audit: the only way to find a URL for it was via this schema).
- **Fix**: sameAs + handle aligned to the footer's real profiles (single source
  of truth with a sync comment); SearchAction removed with rationale noted
  (Google discontinued the sitelinks search box; false promises hurt trust).

## Verified-sound areas (no change needed)

| Area                   | Evidence checked                                                                                                                             | Verdict            |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| RBAC completeness      | script-diffed 58 mounts vs 128 rules; deny-by-default middleware                                                                             | ✓                  |
| Rate limiting          | magic-link 5/10min, sign-in 10/15min, sign-up 10/hr, forgot 3/10min, contact 5/10min, applications/IP limit; KV + hashed identifiers         | ✓                  |
| Session security       | HttpOnly cookie, SHA-256 token hash lookup + index, rotation on refresh, revoke on sign-out, MFA `mfa_pending` gate handled in-guard         | ✓                  |
| Error surface          | envelope-only errors; `console.error` server-side; generic 500 text; Retry-After honored client-side with exponential backoff                | ✓                  |
| Upload chain           | auth-scoped `ownsKey`, MIME allowlist with server-derived extension, 10 MB streamed cap + chunked-body enforcement                           | ✓ (hardened above) |
| Mock/live split        | `isMockMode` compiled to `false` in live builds; 2.7 MB mock chunk is never fetched (dynamic-import gated)                                   | ✓                  |
| Link integrity         | script audit: 0 internal links to nonexistent routes; 0 sitemap orphans of 214                                                               | ✓                  |
| SSR status codes       | unknown paths → HTTP 404 + branded not-found UI (verified on dev server)                                                                     | ✓                  |
| Canonicals/OG          | per-page canonical via `buildSeo`; consistent `https://cea.ng` host in repo (canonical host is site.ts/seo.ts/sitemap/robots/APP_URL = apex) | ✓\*                |
| PWA worker             | network-first HTML, cache-first hashed assets, no-cache sw.js, never intercepts `/v1/*`                                                      | ✓                  |
| DB hygiene             | 243 indexes incl. session token lookups; migrations 0000–0054 apply clean to fresh local D1 (just re-verified)                               | ✓                  |
| Accessibility baseline | skip link, focus-visible global, reduced-motion (CSS + `MotionConfig`), disclosure nav menu, aria-current — from the 2026-09-09 design pass  | ✓                  |

\* **Deployment-side requirement** (cannot be fixed in-repo): Vercel must 301
`www.cea.ng → cea.ng` (or the reverse, then flip the four canonical spots).
Both hosts are in `FRONTEND_ORIGINS`, so either topology is CORS-safe today.

## Out of scope / documented, not patched

- **Turnstile**: env vars + glossary copy reference it, but there is no widget
  component and no backend verification. Not half-wired: it needs site+secret
  keys and UI work on contact/apply/signup. Tracked as an optional hardening
  (rate limits already bound abuse).
- **`delgra/`**: an unrelated product (Delgra Ledger — invoicing/stock for a
  different company) committed in this repo. Not CEA-OS code; left untouched.
  Recommend moving to its own repository to keep build/lint/CI surfaces clean.
- **Seeded demo personas** (`src/data/dashboard.ts` etc.): intentional,
  documented in `docs/audit-mock-data-gaps.md` as seed/mock layer feeding both
  mock mode and D1 seeds. Public marketing pages stay honest (zeroed ratings,
  "stories we're yet to earn").
- **Entry bundle 406 KB gz**: route-level code splitting is already in place;
  further trimming (Montserrat subset, moving shared content modules into
  route chunks) is optimization backlog, not production risk.

## Status labels (honesty pass — §89)

| Item                        | Status                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------- |
| Upload hardening            | Implemented + verified (7/7 targeted, 713/713 full suite)                             |
| CORS environment split      | Implemented + verified (suite green, `wrangler` config validated, local state shared) |
| X-Robots-Tag index control  | Implemented + verified in built Vercel output config                                  |
| Entity SEO fix              | Implemented + verified (build green)                                                  |
| README dev recipes          | Updated to match the new `-e dev` flow                                                |
| www↔apex canonical redirect | **Environment-dependent** — Vercel domain setting required                            |
| Turnstile                   | **Not implemented** — requires keys (documented gap)                                  |
| E2E (Playwright)            | **Not verified** — browser download blocked in sandbox; 33 spec functions exist       |

## Verification run

```
npm run typecheck            ✓ (frontend)
npm run build                ✓ (Nitro → .vercel/output; headers verified)
backend npm run typecheck    ✓
backend npm test             ✓ 715/715 (64 suites; ai.test.ts excluded by design)
backend uploads suite         ✓ 7/7 (incl. 2 new regression tests)
wrangler d1 migrations (fresh local D1) ✓ 0000–0054 apply clean
link/sitemap audit script     ✓ 0 broken internal links, 214/214 reconciled
```
