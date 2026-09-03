# Lumina Studio — CEA-OS

**The digital operating system for [Cyber Elias Academy](https://cea.ng)** — a Nigerian tech skills academy. One platform, five engines (Learning, Career, Services, ERP, Community), ~30 role workspaces, and a public marketing + content site.

| Layer      | Stack                                                                                              |
| ---------- | -------------------------------------------------------------------------------------------------- |
| Frontend   | React 19 · TanStack Start (SSR) · Vite · Tailwind v4 · shadcn/ui · Motion · TanStack Query          |
| Backend    | Cloudflare Workers · Hono · Zod                                                                    |
| Data       | Cloudflare D1 (SQLite) · R2 (uploads) · KV (flags, rate limits) · Durable Objects (realtime rooms)  |
| Deployment | Frontend → Vercel (SSR via Nitro) · Backend → Cloudflare Workers (`cea-api.cyber-e54.workers.dev`)   |

> The original project sketch said "Next.js" — the repo actually builds on **TanStack Start** (React 19 + Vite). All UI is framework-agnostic React; only route files and data-loading wrappers would change in a port.

---

## What's in here

```
src/                    Frontend
├── routes/             ~300 routes: marketing pages, auth, /app/** role dashboards
├── components/         app shell, marketing shell, motion primitives, shadcn/ui
├── lib/api/            typed API client + per-domain modules (+ offline mock registry)
├── lib/query/          TanStack Query hooks per domain
├── lib/auth/           session + role/permission hooks
└── data/               canonical content (programs, blog, glossary, career guides, library)

backend/                Cloudflare Worker (Hono)
├── src/routes/         /v1 API: auth, LMS, finance, HR, IT, ops, 25+ role dashboards
├── src/lib/            rbac, auth, crypto, rate-limit, origin/CORS, validation
├── src/durable/        RealtimeRoom (chat / live classes fan-out)
├── migrations/         D1 schema (0000–0054), safe to apply in order on a fresh DB
├── seeds/              idempotent D1 seed data (INSERT OR IGNORE)
└── test/               71 vitest files / 713 tests (Cloudflare Workers pool)

e2e/                    Playwright specs (public pages, auth, authz, roles)
docs/                   audits, gap matrices, user flows, content style guide
plans/                  the original CEA-OS master plan + 32 actor plans
```

### The five engines

1. **Learning** — LMS: courses, lessons, assignments, assessments, attendance, certificates
2. **Career** — mentorship, portfolio, recruitment, employer pipeline, alumni network
3. **Services** — client engagements, projects, proposals, support tickets
4. **ERP** — finance, invoicing, payroll, HR, IT, operations, facilities
5. **Community** — events, volunteering, NGOs, partners, guilds

### Roles (server-enforced RBAC)

`student`, `instructor`, `mentor`, `parent`, `admissions`, `accountant`/`finance`, `hr`, `it`, `ops`, `admin`, `director`, `department`, `receptionist`, `intern`, `supplier`, `partner`, `volunteer`, `ngo`, `government`, `client`, `employer`, `alumni`, `dev`, `marketing`, `growth`, `conversion-copy`, `product-marketing`, `behavioral-design`, `localization`, `design`.

Every `/v1` route is registered in `backend/src/lib/rbac.ts`; unlisted routes are **denied by default**, and role mismatches return 403. Permissions are issued server-side with the session.

---

## Local development

**Frontend** (mock mode — no backend needed):

```sh
npm install
npm run dev          # http://localhost:5173, uses the offline mock registry
```

**Frontend + real backend**:

```sh
cd backend
npm install
npm run db:migrate:local   # apply D1 migrations to the local miniflare DB
npm run db:seed:local      # idempotent seeds (re-runnable)
npm run dev                # wrangler dev → http://localhost:8787

# from the repo root
VITE_API_URL=http://localhost:8787 npm run dev
```

Copy `.env.example` → `.env` for public site keys (API URL, Turnstile, Paystack public key, VAPID public key). **Mock mode**: leaving `VITE_API_URL` empty runs against `src/lib/api/mocks` — fine for development; production builds should always set `VITE_API_URL` (mocks are opt-in via `VITE_ENABLE_MOCKS=true` only).

### Quality gates

```sh
npm run typecheck    # frontend TypeScript
npm run build        # production build (Vercel preset)
npm run lint         # ESLint (react-refresh warnings are non-blocking)
cd backend && npm run typecheck
cd backend && npx vitest run --exclude test/ai.test.ts   # 713 tests, no network
cd backend && npx vitest run test/ai.test.ts             # live AI suite (needs AI_API_KEY)
npx playwright test                                      # e2e vs E2E_BASE_URL (default https://cea.ng)
```

CI (`.github/workflows/ci.yml`) runs frontend typecheck + build, backend typecheck + tests, and the live AI suite when the `AI_API_KEY` secret is configured.

---

## Deployment

### Backend → Cloudflare

```sh
cd backend
npx wrangler d1 migrations apply DB --remote        # schema
# seeds (idempotent):
npx wrangler d1 execute DB --remote --file seeds/<file>-data.sql   # per suite, or db:seed:local's remote equivalent
npx wrangler secret put AI_API_KEY                  # + EMAIL_API_KEY, PAYSTACK_SECRET_KEY, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY
npx wrangler deploy
```

Bindings are declared in `backend/wrangler.jsonc`: D1 (`DB`), R2 (`UPLOADS`), KV (`FLAGS`, `RATE_LIMIT`), Durable Object (`REALTIME_ROOMS`). Vars include `APP_ENV=production` (Secure/None cookies, no dev tokens, strict CORS) and `FRONTEND_ORIGINS`.

> **Note on production D1 drift:** the production database's `d1_migrations` ledger currently only records migrations through `0016`; later migrations were applied with `wrangler d1 execute --remote --file`. Before using `wrangler d1 migrations apply` against production, reconcile the ledger (insert the missing rows into `d1_migrations`) or keep using `execute --file` per the same procedure the rollout logs used.

### Frontend → Vercel

The build emits the Vercel Build Output API preset (`.vercel/output`). Connect the repo, set:

- `VITE_API_URL` = `https://cea-api.cyber-e54.workers.dev`
- `VITE_APP_ENV` = `prod`
- `VITE_TURNSTILE_SITE_KEY`, `VITE_PAYSTACK_PUBLIC_KEY`, `VITE_VAPID_PUBLIC_KEY` as configured

Headers for `sw.js` / `manifest.webmanifest` / caches are configured in `nitro.config.ts` + `vercel.json`.

Production: **www.cea.ng** (frontend, Vercel) · **cea-api.cyber-e54.workers.dev** (API).

---

## Architecture notes

- **API boundary**: single Worker, everything under `/v1`. Central `rbacGuard` middleware — public routes are explicit, everything else requires a session cookie (or bearer token), role-gated per rule. Non-GET browser requests must carry a trusted `Origin` (CSRF defense).
- **Sessions**: opaque 32-byte tokens, stored hashed (SHA-256) in D1, delivered as `HttpOnly` cookies (`Secure; SameSite=None` in production). MFA (TOTP + recovery codes) supported; password auth uses PBKDF2.
- **Payments**: Paystack checkout; the webhook verifies HMAC-SHA512 signatures (timing-safe) and refuses unsigned events in production.
- **Uploads**: R2 with per-user key scoping (`/:userId/…`), MIME allow-list, 10 MB streaming limit; presigned URLs when configured, worker proxy otherwise.
- **Realtime**: Durable Object per room (`chat:<id>`, `live:<classId>`); hibernatable WebSockets; history in D1.
- **Offline mock mode**: the same typed API client resolves against `src/lib/api/mocks` when no API URL is set — the mock chunk is dynamically imported and never fetched in real deployments.
- **SEO**: SSR + per-route `head()` (titles, canonical, OG/Twitter with 1200×630 PNGs), JSON-LD (Organization, LocalBusiness, WebSite, FAQPage, Article, HowTo, Course, DefinedTerm), build-generated `sitemap.xml` (214 URLs), `robots.txt`, `ads.txt`.

## More documentation

- `AGENTS.md` — build/quality commands + content-system status
- `docs/user-flows.md` — the 32 actor journeys
- `docs/role-gap-matrix.md` — wiring status per role suite (all `/app/**` pages live)
- `docs/audit-mock-data-gaps.md` — mock-data audit + remediation log
- `plans/CEA_OS_MASTER_PLAN.md` — the original product master plan
# Lumina Studio — Cyber Elias Academy (CEA)

Production web platform for **Cyber Elias Academy** (cea.ng), a Nigerian digital
skills academy and technology studio. One codebase serves the public marketing
site and **CEA-OS**, the academy's operating system: role-based workspaces for
students, instructors, parents, alumni, mentors, employers, clients, and every
academy department (admin, finance, HR, admissions, operations, IT, marketing,
growth, design, government compliance, and more).

## Architecture

| Layer | Technology | Hosting |
| --- | --- | --- |
| Frontend | TanStack Start (React 19, file-based routing) + TanStack Router/Query, Tailwind CSS v4, Radix UI components, motion | **Vercel** (Nitro Build Output API) |
| Backend API | Hono on Cloudflare Workers (`/v1/*`) | **Cloudflare Workers** |
| Database | Cloudflare D1 (SQL migrations + generated seeds) | **Cloudflare D1** |
| Cache / config / feature flags | Cloudflare KV (`FLAGS`, `RATE_LIMIT`) | Cloudflare |
| Object storage | Cloudflare R2 (`UPLOADS`) | Cloudflare |
| Real-time rooms | Durable Object `RealtimeRoom` (WebSockets) | Cloudflare |

The frontend never talks to a traditional Node server; it talks to the Worker
API over HTTPS. All `/v1/*` requests pass a declarative RBAC guard
(`backend/src/lib/rbac.ts`) before reaching route handlers.

## Repository layout

```
src/                    Frontend (TanStack Start)
  routes/               File-based routes: public marketing, auth, /app/* workspaces
  routes/app/           CEA-OS role dashboards (297 route files)
  components/           UI (ui = Radix primitives, app = shell, marketing, motion, art)
  lib/api/              Typed API client + offline mock registry (src/lib/api/mocks)
  lib/query/            TanStack Query hooks, one module per API domain
  lib/auth/             Session hooks (cookie session, role/permission helpers)
  data/                 Canonical content/seeds: programs, blogs, glossary, library,
                        RBAC roles — feeds mock mode AND backend seed generation
backend/                Cloudflare Worker API (own package, Hono)
  migrations/           0050+.sql migrations applied to D1
  seeds/                *-data.sql + *-data.ts wrappers (generated from src/data)
  src/routes/           Hono route modules per domain
  test/                 Vitest suites running in the Workers runtime (64 files)
e2e/                    Playwright specs (target the deployed site by default)
docs/                   Engineering/product audits, gap matrix, user flows
plans/                  Product plans (CEA-OS master plan, actor plans)
scripts/                Prebuild generators: sitemap, library catalog snapshot
```

## Local development

Requires Node.js ≥ 20 and npm. The backend requires Cloudflare bindings; local
Worker runs go through `wrangler` (no Cloudflare account needed for `--local`).

```sh
# Frontend (mock mode)
npm ci
cp .env.example .env        # leave VITE_API_URL empty for offline mock mode
npm run dev                 # http://localhost:8080

# Frontend quality gates
npx tsc --noEmit
npm run build               # prebuild generates sitemap + library snapshot

# Backend
cd backend
npm ci
npm run typecheck
npm test                    # 713 tests across 64 suites (ai.test.ts excluded:
                            #   it needs a live NVIDIA API key)
# Local Worker + D1 (first time: apply migrations then seeds)
npm run db:migrate:local
npm run db:seed:local
npm run dev                 # wrangler dev --local  → http://localhost:8787
```

### Mock mode vs live mode

`VITE_API_URL` decides the data layer at build time (see `src/lib/env.ts`):

- **Mock mode** (`VITE_API_URL` empty, non-production): every API call resolves
  against the in-memory registry (`src/lib/api/mocks/*`) seeded from
  `src/data/*`. You are always signed in and can preview every role via the
  role switcher in the CEA-OS sidebar.
- **Live mode** (`VITE_API_URL` set, e.g. `https://cea-api.cyber-e54.workers.dev`):
  real Worker API, HttpOnly cookie sessions, D1 data.

### Environment variables

All variables are documented in `.env.example`. None are secret on the
frontend (public keys only); backend secrets live in Cloudflare as
`wrangler secret put` values — never commit them.

## Deployment

- **Frontend (Vercel):** `npm run build` produces `.vercel/output` (Nitro
  Build Output API). Configure `VITE_API_URL` (+ public keys) as Vercel env
  vars for production. `vercel.json`/`nitro.config.ts` carry the static/asset
  headers (PWA, robots, immutable assets).
- **Backend (Cloudflare Workers):** from `backend/`:

  ```sh
  wrangler d1 migrations apply DB            # remote DB migrations
  npm run deploy                             # wrangler deploy
  ```

  `wrangler.jsonc` declares the D1/KV/R2/Durable Object bindings and static
  vars; secrets (email, AI, VAPID, webhook auth) are injected via
  `wrangler secret put`. The Worker is configured with `APP_ENV=production`;
  the Vitest pool overrides that only inside tests (`backend/vitest.config.ts`).

## CI

`.github/workflows/ci.yml` runs: frontend build, frontend lint (non-blocking),
backend typecheck, and the full backend Vitest suite.

## Testing

- **Backend:** Workers-runtime integration suites in `backend/test/` — they
  apply all migrations + seeds to an isolated D1 and exercise real HTTP routes
  (auth, RBAC, CRUD per domain, payments, uploads, realtime, push).
- **E2E:** Playwright specs in `e2e/` exercise the deployed product
  (`E2E_BASE_URL`, demo accounts from `e2e/helpers.ts`) — run manually against
  a preview/production deployment.
- **Smoke:** run `npm run dev`, then curl any route — TanStack Start renders
  pages server-side, so an SSR 200 + clean HTML is a fast sanity check.

## Documentation

- `docs/user-flows.md` — every user flow, API call, permission, and outcome
- `docs/role-gap-matrix.md` — feature → API/backend/UI wiring matrix by role
- `docs/audit-mock-data-gaps.md` — data-layer architecture and mock inventory
- `docs/content-style-guide.md`, `docs/competitor-gap-analysis.md` — SEO/content
- `plans/` — CEA-OS master plan, grand master plan (P1–P3), actor plans
