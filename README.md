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
