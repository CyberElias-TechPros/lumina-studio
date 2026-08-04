# Role gap matrix + rollout plan

Audited 2026-08-03 against live deployment:
worker `https://cea-api.cyber-e54.workers.dev` (d1 live, secrets set: `AI_API_KEY`, `EMAIL_API_KEY`, `PAYSTACK_SECRET_KEY`, `JWT_SECRET`, `VAPID_*`, `APP_ENV`) and frontend `https://cea-os.vercel.app`.

Method: for every page under `src/routes/app/**`, grep for `@/lib/query`, `@/lib/api`, `@/data/`.
`wired` = uses ≥1 backend data source. `static` = pure JSX (hardcoded numbers, no data, no persisting actions).
Backend coverage = routes registered in `backend/src/lib/rbac.ts` (the full `/v1` map).

---

## Progress log

| Date | Change |
| --- | --- |
| 2026-08-03 | **Director suite 6/9 wired (composed reads)** — command-center (org health + alerts from finance/hr/marketing/recruitment/academic aggregates), finance (invoice/expense/payment pivots, live margin + receivables), hr (employees/leave/payroll/postings), marketing (campaign ROAS + funnel stages + leads → CAC), academic (course catalog completion + interview placement + at-risk gradebook), approvals (leave + payroll + overdue-invoice queue). `operations`/`okrs`/`reports` still static (no backend source). Also wired `accountant/audit` → `admin/audit-log` reuse (accountant now 9/10, banking only static). Typecheck + eslint green. |
| 2026-08-03 | **Tier 1 remaining clusters wired** — `hr` (attendance/onboarding/performance/reports + hub live via `hr/*` + `recruitment/postings`), `employer` hub/analytics/brand/feedback (recruitment counts/pipeline/interviews/talent), `alumni/jobs` (postings), `instructor` analytics + attendance (gradebook/submissions aggregates), `admin` config (flags), security (audit-log), roles (accounts) — monitoring + api-keys left static (no infra/key endpoints), `dev` feature-flags (`/v1/flags`). Typecheck + eslint green. |
| 2026-08-03 | **Accountant suite 8/10 wired** — index KPIs, billing (live invoice PATCH "Pay"), budgets (expense pivots), payroll (payroll-changes + employees), reports (aggregates); added `PATCH /v1/invoices/:id` + `/v1/expenses/:id` client mutations + mock handlers. Remaining static: `banking` (no reconciliation endpoint) and `audit` (could reuse `admin/audit-log` with role extension). |
| 2026-08-03 | **QueryState fix** (`src/components/ui/query-state.tsx`): infinite queries now flatten `pages[].items` before calling `children` — previously every paginated list page (hr/*, admin/*, accountant/*, design/*, employer/*, notifications, finance, …) passed the `{pages}` object to children and crashed on `.map` once data arrived. Also fixed `certificates.tsx` to pass `data: items`. |
| 2026-08-03 | **Public landing data seeded** — `jobs`, `gigs`, `events`, `caseStudies`, `testimonials` in `src/data/site.ts` now have real content; marketplace/events/community/work/services no longer render empty states. |
| 2026-08-04 | **Tier 2 backend shipped + deployed** — parent-scoped reads `GET /v1/parent/students(:id)` (`parent`/`admin` only, link via `parent_students`, derived GPA/outstanding), admissions admin `GET /v1/applications/admin(/?stage=)` + `/admin/stats` + pipeline `PATCH /:ref` (audit-logged), finance `POST /v1/payroll/run` (approves draft/sent changes → `payment_batches` row), mentor `GET /v1/mentor/profiles` + `POST /v1/mentor/match` (keyword-overlap scoring). DDL moved out of migrations into seed files (`0011_parent.sql`, `0012_mentorship.sql` + `parent-data.sql`/`mentor-data.sql`); applied to prod D1 + worker deployed (version `536a4715`). `backend/test/tier2.test.ts` 13/13 green; full suite 267 passed (3 pre-existing ai.test network timeouts). |
| 2026-08-04 | **Tier 2 frontend wired** — `parent` index/overview/grades now live (`/v1/parent/students*`), `admissions` hub + applications list + detail live (`/v1/applications/admin*` + PATCH advance), `accountant/payroll` gained "Run payroll" action + payroll-runs list (payroll run + payments batches). New clients `api/parent`, `api/mentor`, `query/admissions|parent|mentor`, finance `useRunPayroll`, matching mock handlers. Typecheck + eslint + build + prod deploy ✅. Mentor profiles/match clients exist but no learner-facing page consumes them yet (alumni/mentorship is a mentor sign-up form, not a match UI). |
| 2026-08-04 | **Tier 2 remainder wired (this phase, NOT yet committed/deployed)** — backend: `GET /v1/parent/students/:id/finance|attendance` (parent RBAC), migration `0013_attendance.sql` + `attendance-data.sql`/`attendance.ts`, parent seeds extended with student-bound invoices `INV-P01`/`INV-P02`, tier2 tests 13/13. Frontend: parent `$studentId.{finance,attendance,reports}` live, admissions `review/interviews/enrollment/reports` live (`?stage=` + stats), `accountant/banking` = payment ledger + settlement batches (`payments/history` + `finance/payments`), `admin/config` gained interactive feature-flag toggles (`useSetFlag`/`useResetFlag`; mock now merges overrides into `GET /v1/flags`), new `alumni/find` "Find a mentor" consuming `/v1/mentor/profiles` + `/v1/mentor/match` (hub tile added). Typecheck + eslint + build green. Kept static (no backend source): admissions `documents`/`communication`, parent `communication`/`invitation`, director `operations`/`okrs`/`reports` (drill-down surfaces; command-center carries the composed reads), admin `index`/`logs`. **Deployed** — prod D1 migration `0013` + attendance (25 rows) + invoice seeds (`INV-P01/P02`) applied via wrangler OAuth; worker redeployed (version `86ec1a74-4bdb-4060-b547-8351333ee318`); frontend prod build deployed to `cea-os.vercel.app` (deployment `dpl_6TGm9ExwCdJFJkABn6qDMaz3r7zU`). Commit `1a8cdac` pushed to main. |

---

## Headline

| Metric | Value |
| --- | --- |
| App pages under `src/routes/app/` | **283** |
| Wired to live backend | **~111** |
| Static dashboards (placeholder) | **~172** |
| Backend route suites live | **~20 domains + Tier 2: parent, mentor, applications admin, payroll run** (rbac.ts) |
| Backend suites NOT built yet | **~12 domains** (mentorship sessions/goals/requests, ops/inventory, IT/helpdesk, receptionist, government, behavioral, product-marketing, dev/CI, supplier, volunteer, partner, alumni-net) |
| Public/locale data | `jobs/gigs/events/caseStudies/testimonials` seeded in `src/data/site.ts` ✅ |

---

## Per-role status (pages wired / static)

| Role dir | Pages | Wired | Static | Backend coverage today |
| --- | ---: | ---: | ---: | --- |
| admin | 12 | 5 | 7 | `admin/*` (users, accounts, audit-log, flags) — config/security/roles live, monitoring/api-keys static (no infra endpoints) |
| accountant | 10 | 10 | 0 | `finance/*` + `hr/payroll-changes` + `admin/audit-log` + `payments/history` (banking = payment ledger + batches) ✅ |
| admissions | 9 | 7 | 2 | `applications` admin list + stats + pipeline PATCH ✅ (hub, applications, detail, review, interviews, enrollment, reports); documents/communication static (no source) |
| alumni | 8 | 2 | 6 | `recruitment/*` for jobs ✅; `mentor/profiles`+`match` via `find` (Find a mentor) ✅; network/events/stories none |
| assessments | 2 | 2 | 0 | `/v1/assessments/*` ✅ |
| assignments | 2 | 2 | 0 | `/v1/assignments/*` ✅ |
| behavioral-design | 9 | 0 | 9 | none |
| client | 8 | 2 | 6 | messages + shared client lib; contracts/documents/support missing |
| conversion-copy | 8 | 0 | 8 | none |
| department | 7 | 0 | 7 | none |
| design | 10 | 10 | 0 | `/v1/design/*` ✅ |
| dev | 12 | 1 | 11 | `flags` ✅; CI/CD/dev tooling none |
| director | 9 | 6 | 3 | composed reads: finance/invoice + hr/employee + recruitment + marketing + courses (command-center, finance, hr, marketing, academic, approvals); operations/okrs/reports static (no backend source) |
| employer | 8 | 8 | 0 | `recruitment/*` ✅ (hub, jobs, talent, pipeline, interviews, analytics, brand, feedback) |
| finance | 1 | 1 | 0 | `/v1/finance` ✅ |
| government | 11 | 0 | 11 | none |
| growth | 8 | 0 | 8 | none |
| hr | 10 | 8 | 2 | `/v1/hr/*` + `recruitment/postings` ✅ (hub, employees, leave, payroll + attendance/onboarding/performance/reports) |
| instructor | 13 | 6 | 7 | `/v1/instructor/*` (gradebook, courses, assignments, analytics, attendance); calendar/rest static |
| intern | 8 | 0 | 8 | none |
| it | 11 | 0 | 11 | none |
| lean | 3 | 3 | 0 | ✅ |
| live | 2 | 2 | 0 | ✅ |
| localization | 8 | 8 | 0 | ✅ |
| marketing | 10 | 10 | 0 | ✅ |
| mentor | 12 | 0 | 12 | profiles + match API live (`/v1/mentor/*`); match UI lives at `alumni/find` (browse + match); mentor-dashboard pages (sessions/goals/requests/resources) still static |
| ngo | 9 | 0 | 9 | none |
| ops | 7 | 0 | 7 | none (inventory, branches, facilities) |
| parent | 8 | 6 | 2 | parent-scoped reads `GET /v1/parent/students(:id)` + `:id/finance` + `:id/attendance` ✅ (index, overview, grades, finance, attendance, reports wired); communication/invitation static |
| partner | 7 | 0 | 7 | none |
| product-marketing | 9 | 0 | 9 | none |
| receptionist | 8 | 0 | 8 | none |
| supplier | 7 | 0 | 7 | none |
| volunteer | 6 | 0 | 6 | none |
| root files | 12 | 12 | 9 | mixed (portfolio, attendance, reports, marketplace) |

---

## Tier 1 — WIRE TO EXISTING ENDPOINTS (fast, high visibility)

Backend user-facing surface is done; these folders are blobs of hardcoded numbers.

| Target | Source endpoint(s) | Status |
| --- | --- | --- |
| account-holder invoices | `finance/invoices`, `/expenses`, `/payments` | ✅ done (accountant suite) |
| payroll-prep | `hr/payroll-changes` (GET) + draft batch, `payments` | ✅ done (accountant payroll) |
| budgeting/cashflow | `finance/invoices + expenses` pivot | ✅ done (accountant budgets) |
| alumni jobs | `recruitment/*` (jobs, applications) | ✅ done |
| employer analytics/feedback | `recruitment/*` aggregate counts | ✅ done |
| director suite | compose existing reads: `finance/* + hr/* + marketing/*`+ hand-derived KPI card set | ✅ done (6/9; operations/okrs/reports no source) |
| instructor analytics/attendance | `instructor/*` (gradebook, submissions) aggregate | ✅ done |
| admin config/security/monitoring | `/v1/admin/*` + `flags` + `payments/history` | ✅ config (interactive flag toggles)/security/roles; monitoring left static |
| parent (grades/calendar part) | `GET /v1/parent/students(:id)` (parent ACL via `parent_students`, derived GPA/outstanding) | ✅ done (Tier 2) |
| developer feature-flags | `/v1/flags` public GET + `PUT/DELETE :key` (admin) | ✅ done (read-only) |
| public landing | seed `jobs`, `gigs`, `events`, `caseStudies`, `testimonials` with real content (no backend change) | ✅ done |

---

## Tier 2 — SMALL BACKEND ADDITIONS

| Target | New API | Status |
| --- | --- | --- |
| Parent grades/attendance | `GET /v1/parent/students` + `GET /v1/parent/students/:id` + `:id/finance` + `:id/attendance` (parent ACL via `parent_students`, derived GPA + outstanding invoices) | ✅ done — prod D1: `0013_attendance.sql` + seeds applied, worker live |
| Admissions review & rules | `GET /v1/applications/admin` (+`?stage=`), `GET /v1/applications/admin/stats`, `PATCH /v1/applications/:ref` (pipeline, audit-logged) | ✅ done — `admin` role |
| Finance payroll run | `POST /v1/payroll/run` → apply draft/sent changes → `payment_batches` row | ✅ done — `finance`+`admin` roles |
| Mentor matchmaking | `GET /v1/mentor/profiles` + `POST /v1/mentor/match` (keyword-overlap scoring, top 3) | ✅ backend + client + mocks + `alumni/find` UI (browse + match) |

---

## Tier 3 — NEW SUITES (backend route + rbac + schema + seed + hooks + UI)

Recommended order (existing `/v1` naming style):
1. `ops` (inventory, branches, facilities, vendors, tasks) — also feeds supplier + receptionist
2. `it` (tickets/helpdesk, assets, knowledge-base, remote-support)
3. `mentor` (sessions, goals, requests, resources)
4. `intern` (tasks, timesheet→payroll hookup, evaluation)
5. `supplier` + `partner` (POs, agreements, referrals) — on ops
6. `volunteer` (opportunities, hours, impact)
7. `government` (filings, training, integrity) — legal-compliance
8. `behavioral-design` + `growth` + `product-marketing` (experiments/AB) — candidate builds against `marketing` when landing
9. `alumni` (network, stories, give‑back) — community-flavored
10. `dev` (deployments/CI hooks, api‑playground) — tools, low ROi

### Existing live domains that should stay (do NOT rebuild):
auth, courses/learn, assignments, assessments, students gradebook, messages/threads, notifications/push, calendar, library/catalog, certificates, payments/checkout, finance, hr employees/leave/payroll, instructor portal, admin/users, recruitment, marketing, design, localization, realtime chat, live classes, uploads, ai.

---

## Tier 4 — AUTOMATION LAYER (on top of Tier 1–3)

| Automation | Needed for |
| --- | --- |
| quote → invoice → payment reconciliation | finance/account + client collab |
| timesheet → payroll batch → Hm payroll-changes → email | payroll/account |
| job → AI shortlist ranking (mock → NIM) | employer/recruitment |
| event RSVP → calendar + reminder notification | alumni + events |
| auto-grade (NIM) + human confirm | assignments/instructor |
| nightly KPI digest email | admin/director/report |
| flags → onboarding toggle | admin |

Deploy-loop recipe (each role): `backend` change → `npx vitest run` → `npm run deploy`; frontend change → `npm run build` → `npx vercel deploy --prebuilt --prod --project cea-os` → smoke `/app/…`.

Gate: when wiring a static page, keep its existing spinner/handshake/styling; never copy pasted fake numbers into live.