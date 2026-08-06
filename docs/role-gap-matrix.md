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
| 2026-08-05 | **Tier 3 starts: ops suite shipped** — backend: migration `0014_ops.sql` (inventory_items, purchase_orders, branches, facility_rooms, maintenance_jobs, vendors, vendor_contracts, ops_tasks, workflows), seeds `ops-data.sql`/`ops.ts`, `backend/src/routes/ops.ts` (9 paginated GET lists: inventory, purchase-orders, branches, rooms, maintenance, vendors, contracts, tasks, workflows), RBAC `roles: ["admin","instructor"]`, registered in index.ts; `backend/test/tier3-ops.test.ts` 12/12 (403 for non-staff + lists + camelCase mapping + cursor pagination); full suite 283 passed (3 pre-existing ai.test network timeouts). Frontend: `api/ops` + `query/ops` (9 collections) + mock handlers (mirrors seeds); all 7 `app/ops/*` pages wired — inventory (stock levels + reorder badges + open POs), branches (utilization + capacity KPIs), facilities (rooms + maintenance queue), vendors (ratings + contracts), tasks (ops board + workflows), reports (per-branch seat-day cost from branches), automation (workflow builder). Typecheck + eslint + build green. |
| 2026-08-05 | **Tier 3 ops deployed** — prod D1 migration `0014` + `ops-data.sql` seeds applied via wrangler OAuth (81 rows); worker redeployed (version `ccdd3719-cb30-4969-8056-93a305b9bcf7`); frontend prod build deployed to `cea-os.vercel.app` (deployment `dpl_H2QGALryAyEgffYpWb5GJrGvPVmv`). Smoke: `/v1/flags` 200, `/v1/ops/inventory` 401 unauthenticated (RBAC gate live). Commit `4db8042` pushed to main. |
| 2026-08-05 | **Tier 3 IT suite shipped** — backend: migration `0015_it.sql` (it_tickets, it_ticket_events, it_articles, it_assets, it_licenses, it_services, it_windows, it_sessions, it_templates, it_accounts + indexes), seeds `it-data.sql`/`it.ts`, `backend/src/routes/it.ts` (9 paginated GET lists + `GET /tickets/:id` with camelCase `events[]`), RBAC `roles: ["admin","instructor"]`, registered in index.ts; `backend/test/tier3-it.test.ts` 12/12 (403 non-staff, lists, detail + events, 404 unknown); full suite 294 passed (4 pre-existing ai.test network timeouts). Frontend: `api/it` + `query/it` (9 collections + `useTicketDetail`) + mock handlers; all 11 `app/it/*` pages wired — tickets (queue + SLA + open→detail link), tickets/$id (activity timeline + resolution), knowledge-base, assets, licenses (seat utilization), monitoring (degraded badges), maintenance, remote-support, templates, users, reports (derived ticket KPIs). Typecheck + eslint + build green. |
| 2026-08-05 | **Tier 3 IT deployed** — prod D1 migration `0015` + `it-data.sql` seeds applied via wrangler OAuth; worker redeployed (version `adc69460-cd18-4557-8e75-ad2b4ec79c82`); frontend prod build deployed to `cea-os.vercel.app` (deployment `dpl_5ab8UV8qzfApAZnpk18o2ggNkmP1`). Smoke: `/v1/flags` 200, `/v1/it/tickets` 401 unauthenticated (RBAC gate live). Commits `42404a8` + `fad318f` pushed to main. |
| 2026-08-06 | **Tier 3 mentor dashboard suite shipped** — backend: migration `0016_mentor_dashboard.sql` (mnt_mentees, mnt_sessions, mnt_session_actions, mnt_goals, mnt_requests, mnt_availability, mnt_resources, mnt_portfolio, mnt_skills, mnt_applications, mnt_conversations, mnt_threads + indexes), seeds `mentor-dashboard-data.sql`/`mentor-dashboard.ts`, `backend/src/routes/mentorDashboard.ts` (7 paginated lists + resources + session/mentee/conversation details incl. `:id/portfolio|skills|career`), RBAC `roles: ["admin","instructor","mentor"]`, registered in index.ts at `/v1/mentor-dashboard` (distinct from legacy `/v1/mentor/*`); test user `mentor@cea.ng` added to domain seeds; `backend/test/tier3-mentor-dashboard.test.ts` 15/15 (403 non-staff, lists, details, 404 unknown); full suite 309 passed (4 pre-existing ai.test network timeouts). Frontend: `api/mentorDashboard` + `query/mentorDashboard` (7 collections + 6 detail fetchers) + mock handlers (mirrors seeds, ids `mn-*`/`ms-*`/`mg-*`…); all 12 `app/mentor/*` pages wired — index (mentees + goals in flight + unread), sessions (queue + real-id links to detail), goals (KPIs + all goals), analytics (per-mentee avg goal progress), requests, messages (conversations + thread), resources, settings (weekly availability), mentees/$menteeId (goals + portfolio), portfolio (projects + skill endorsements), career (application pipeline), sessions/$sessionId (notes + action items). Typecheck + eslint + build green. |
| 2026-08-06 | **Tier 3 mentor dashboard deployed** — prod D1 migration `0016` + `mentor-dashboard-data.sql` seeds applied (50 changes); `domain-data.sql` applied (324 queries, mentor@cea.ng user + demo password hash `cea-demo-pass-2026` live, `has_pw=1`); worker redeployed (version `3300e15f-7821-418a-87e6-dde061a9dd90`); frontend prod build deployed to `cea-os.vercel.app` (deployment `dpl_DVGo8zr86Xfsu49xdNYGs3RRXKHq`). Smoke: `/v1/mentor-dashboard/mentees` 401 unauthenticated (RBAC gate live), sign-in as `mentor@cea.ng` → 200 `roleKey: mentor` + `mentorship:manage`; mentees/sessions/goals/requests/conversations/portfolio all 200 with seed data; all 12 mentor pages + 3 detail routes (`mentees/:id`, `:id/portfolio`, `:id/career`, `sessions/:id`) 200 on prod. |
| 2026-08-06 | **Tier 3 intern suite shipped** — backend: migration `0017_intern.sql` (int_tasks, int_timesheets, int_mentor_sessions, int_milestones, int_skills, int_resources, int_evaluations, int_projects incl. `views`, int_conversations, int_threads + indexes), seeds `intern-data.sql`/`intern.ts`, `backend/src/routes/internDashboard.ts` (9 paginated lists: tasks, timesheets, mentor-sessions, milestones, skills, resources, evaluations, projects, conversations + `GET /conversations/:id` with `thread[]`), RBAC `roles: ["admin","instructor","student"]`, registered in index.ts at `/v1/intern-dashboard`; `backend/test/tier3-intern.test.ts` 16/16 (403 for mentor, lists, camelCase, timesheet hours numeric, evaluations scores, projects artifacts/views, conversation detail, 404 unknown); full suite 325 passed (4 pre-existing ai.test network timeouts). Frontend: `api/internDashboard` + `query/internDashboard` (9 collections + `useConversationDetail`) + mock handlers (mirrors seeds, ids `it-*`); all 8 `app/intern/*` pages wired — index (derived KPIs: open tasks, hours logged, on-time rate, next session), tasks (status badges + KPIs), timesheet (weekly log + approval rate vs 40h target), mentorship (sessions + hours mentored + goals), learning-plan (milestone progress bars + skills/resources), evaluation (self/supervisor/combined scores), portfolio (projects with artifacts/views), messages (conversation list + thread). Typecheck + eslint + build green. |

---

## Headline

| Metric | Value |
| --- | --- |
| App pages under `src/routes/app/` | **283** |
| Wired to live backend | **~129** |
| Static dashboards (placeholder) | **~154** |
| Backend route suites live | **~23 domains + Tier 2/3: parent, mentor, applications admin, payroll run, ops, it, mentor-dashboard, intern-dashboard** (rbac.ts) |
| Backend suites NOT built yet | **~9 domains** (receptionist, government, behavioral, product-marketing, dev/CI, supplier, volunteer, partner, alumni-net) |
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
| intern | 8 | 8 | 0 | `/v1/intern-dashboard/*` (tasks, timesheets, mentor-sessions, milestones, skills, resources, evaluations, projects, conversations + threads) ✅ |
| it | 11 | 11 | 0 | `/v1/it/*` (tickets + events, articles, assets, licenses, services, windows, sessions, templates, accounts) ✅ |
| lean | 3 | 3 | 0 | ✅ |
| live | 2 | 2 | 0 | ✅ |
| localization | 8 | 8 | 0 | ✅ |
| marketing | 10 | 10 | 0 | ✅ |
| mentor | 12 | 12 | 0 | `/v1/mentor-dashboard/*` (mentees, sessions + actions, goals, requests, availability, resources, portfolio, skills, career, conversations + threads) ✅ + `/v1/mentor/*` profiles/match at `alumni/find` |
| ngo | 9 | 0 | 9 | none |
| ops | 7 | 7 | 0 | `/v1/ops/*` (inventory, purchase-orders, branches, rooms, maintenance, vendors, contracts, tasks, workflows) ✅ |
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
1. `ops` (inventory, branches, facilities, vendors, tasks) — also feeds supplier + receptionist — **✅ done 2026-08-05 (`/v1/ops/*`, migration 0014, seeds, 7/7 pages wired)**
2. `it` (tickets/helpdesk, assets, knowledge-base, remote-support) — **✅ done 2026-08-05 (`/v1/it/*`, migration 0015, seeds, 11/11 pages wired)**
3. `mentor` (sessions, goals, requests, resources) — **✅ done 2026-08-06 (`/v1/mentor-dashboard/*`, migration 0016, seeds, 12/12 pages wired)**
4. `intern` (tasks, timesheet→payroll hookup, evaluation) — **✅ done 2026-08-06 (`/v1/intern-dashboard/*`, migration 0017, seeds, 8/8 pages wired)**
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