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
