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

---

## Headline

| Metric | Value |
| --- | --- |
| App pages under `src/routes/app/` | **283** |
| Wired to live backend | **~98** |
| Static dashboards (placeholder) | **~185** |
| Backend route suites live | **~20 domains** (rbac.ts) |
| Backend suites NOT built yet | **~12 domains** (mentorship, ops/inventory, IT/helpdesk, receptionist, government, behavioral, product-marketing, dev/CI, supplier, volunteer, partner, alumni-net) |
| Public/locale data | `jobs/gigs/events/caseStudies/testimonials` seeded in `src/data/site.ts` ✅ |

---

## Per-role status (pages wired / static)

| Role dir | Pages | Wired | Static | Backend coverage today |
| --- | ---: | ---: | ---: | --- |
| admin | 12 | 5 | 7 | `admin/*` (users, accounts, audit-log, flags) — config/security/roles live, monitoring/api-keys static (no infra endpoints) |
| accountant | 10 | 9 | 1 | `finance/*` + `hr/payroll-changes` + `admin/audit-log` (audit wired) ✅; `banking` static (no reconciliation endpoint) |
| admissions | 9 | 0 | 9 | `applications` (public submit, admin PATCH) — needs review/decision API |
| alumni | 8 | 1 | 7 | `recruitment/*` for jobs ✅; network/events/stories none |
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
| mentor | 12 | 0 | 12 | none (mentorship, goals, requests) |
| ngo | 9 | 0 | 9 | none |
| ops | 7 | 0 | 7 | none (inventory, branches, facilities) |
| parent | 8 | 3 | 5 | gradebook/course reads exist (student access only) — needs parent-scoped reads |
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
| admin config/security/monitoring | `/v1/admin/*` + `flags` + `payments/history` | ✅ config/security/roles; monitoring left static |
| parent (grades/calendar part) | `courses/gradebook` (needs parent ACL), `calendar/events` | ⏳ needs parent ACL (Tier 2) |
| developer feature-flags | `/v1/flags` public GET + `PUT/DELETE :key` (admin) | ✅ done (read-only) |
| public landing | seed `jobs`, `gigs`, `events`, `caseStudies`, `testimonials` with real content (no backend change) | ✅ done |

---

## Tier 2 — SMALL BACKEND ADDITIONS

| Target | New API | Notes |
| --- | --- | --- |
| Parent grades/attendance | `GET /v1/parent/students/:id` (+ grade/attendance query) | use enrollments link; role-claim parent |
| Admissions review & rules | `GET /v1/applications?stage=`, `PATCH :id` w/ admissions role, `GET /v1/admissions/stats` | extend `applications` rbac + route |
| Finance payroll run | `POST /v1/finance/payroll/run` → rows + draft approve + batch | automates Tier-1 accountant write path |
| Mentor matchmaking | `POST /v1/mentor/match` (rule/AI) | Tier 3 mentor needs at least this |

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