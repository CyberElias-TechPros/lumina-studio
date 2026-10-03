<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Build & Quality
- `npm run build` — Next.js 15 App Router production build, must pass
- `npx tsc --noEmit` — TypeScript check, must pass
- `npm run lint` — ESLint, slow on full repo; run selectively
- **Backend**: `cd backend && npm run typecheck && npm test` (Vitest + Workers runtime, 66 suites / 747 tests)
- **Production**: www.cea.ng (Vercel), backend: cea-api.cyber-e54.workers.dev (Cloudflare Worker, D1)

## Product Overview

Cyber Elias Academy's platform: a public marketing/admissions site plus CEA-OS,
a role-based operating system for the whole academy. Public content (programs,
blog, glossary, career guides, resources, library) is static + SEO-complete and
server-rendered; every `/app/*` workspace talks to the `/v1/*` Worker API.

## Data Architecture (do not break these invariants)

1. **Two runtime modes** decided by `NEXT_PUBLIC_API_URL` at build time (`src/lib/env.ts`):
   - Mock (unset): `src/lib/api/client.ts` serves every call from
     `src/lib/api/mocks/*`, seeded by `src/data/*`; role switcher is visible.
   - Live (set): real Worker + D1; server-issued `role_key` is authoritative.
2. **RBAC is enforced server-side.** `backend/src/lib/rbac.ts` is a declarative
   allowlist of every `/v1` route (`public` | `roles` | any-session). New
   backend routes MUST be added there or they 403. UI gating (`Gate`,
   role-scoped AppShell nav, workspace-restricted state) is convenience only.
3. **Auth**: password + magic link; Argon2id password hashes; opaque session
   tokens in the `cea_session` HttpOnly cookie (SameSite=None + Secure in
   production); MFA (TOTP) challenge for opted-in users; sessions rotate on
   refresh and revoke on sign-out/reset. Never expose `devToken` paths in
   production (they are gated on `APP_ENV !== "production"`).
4. **Seeds are generated from `src/data/*`** (`backend/scripts/gen-*.ts` →
   `backend/seeds/*-data.sql`). Keep the two layers in sync when adding demo
   records; migrations live in `backend/migrations/*.sql` and are schema-only.
5. **Testing**: `backend/vitest.config.ts` pins `APP_ENV="test"` in the Workers
   pool (production `wrangler.jsonc` vars would otherwise disable the dev
   magic-link tokens every suite depends on). Do not "fix" the tests by
   re-enabling dev tokens in production code.

## Frontend Conventions
- Route definitions stay under `src/routes/`; `scripts/generate-next-routes.mjs` creates one explicit App Router page per route under the ignored `src/app/(generated)/` directory. Run it through `npm run dev`, `npm run typecheck`, or `npm run build`. A `head` export per page carries SEO title/description/structured data (`src/lib/seo.ts` helpers); `src/lib/next-compat/` adapts legacy links and route hooks.
- Components: `PageShell`, `PageHero`, `SectionHeading`, `CTASection`
  (`src/components/marketing/shell`); `Reveal`/`StaggerGroup` from
  `src/components/motion`; Radix-based UI in `src/components/ui`.
- Query hooks live in `src/lib/query/` (one module per API domain) and always
  use the shared `useApiQuery`/`apiFetch` plumbing — no ad-hoc fetch.
- Role workspaces: every `/app/<role>` page renders inside `AppShell`
  (`src/components/app/app-shell.tsx`), which owns signed-out redirects,
  role-scoped navigation, the workspace-restricted screen, and mock role
  switching. Role URL stubs without a dashboard at the exact path redirect
  (e.g. `/app/partner` → `/app/partner/hub`).

## Deployment Recipes
- Frontend: `npm run build` (Next.js production build), deploy to Vercel with `NEXT_PUBLIC_*` env vars set. Rebuild regenerates the sitemap (400 URLs).
- Backend: `cd backend && npm run typecheck && npm test`, apply migrations
  (`wrangler d1 migrations apply DB`), then `npm run deploy`.

## Current Status: Production Candidate — platform complete, hardening phase
- Public SEO/content layer: 400-URL sitemap, blog/glossary/career
  guides/resources/module pages, AdSense-ready, honest content (no fabricated
  ratings/testimonials).
- CEA-OS: ~46 role workspaces wired to the Worker API through typed
  client/query modules; 55 D1 migrations; per-domain seeds; full RBAC.
- Backend test suite: 713 tests green (Vitest + Workers runtime).
- Remaining known work is tracked in `docs/` and `plans/` (cross-cutting
  automations, growth of test coverage on new endpoints, monitoring polish).

## Routing invariant
`src/routes/` remains the source of route definitions, but Next.js owns URL
matching. `scripts/generate-next-routes.mjs` normalizes each `createFileRoute`
path into an explicit App Router page; generated output is ignored and rebuilt
before dev, typecheck, and production builds. Preserve explicit route paths and
update the generator when adding new public static-parameter data.

## Tutorial production

New learner-facing lessons follow `docs/tutorial-master-prompt.md` — one roadmap
node at a time, taught to independent use, not summarized. Do not thin a node
to finish a roadmap in one pass.

Optional fields on `SessionLecture` (`learningPath`, `figures`, `troubleshooting`,
`exercises`, `mastery`, `safetyNotes`, `sources`, `reviewed`) render on the
class page when present. Older classroom lectures stay valid without them.
Figures are original diagrams under `public/images/classes/`, never presented
as screenshots of software that was not captured.

Published exemplars: Typing & Computer Basics session 1, and Web Development
session 1 (`/classes/web-development/semantic-html`) — code samples render as
selectable `LectureCode` blocks, not images.

## Key Data Files
- `src/data/site.ts` — programs, engines, FAQs, landing stats
- `src/data/academy/` — the practical digital skills curriculum: `catalog.ts`
  (22 courses / 142 sessions from the course flyer), `lessons/*.ts` (one full
  class lecture per session), `index.ts` (resolution + reading-time helpers).
  Adding a lecture = add its key to `sessionLectures` in `index.ts`.
- `src/data/blog-posts-new.ts`, `glossary.ts`, `module-details.ts`,
  `career-guides.ts`, `resources.ts`, `library-catalog.json`
- `src/data/rbac.ts` — canonical role keys, aliases, default permissions
- `backend/migrations/*.sql` + `backend/seeds/*` — D1 schema and data
- `src/lib/api/mocks/index.ts` — offline API registry

## Documentation
- `README.md` — architecture, local dev, deployment, testing
- `docs/user-flows.md`, `docs/role-gap-matrix.md`, `docs/audit-mock-data-gaps.md`
- `plans/` — product plans and per-actor specs
