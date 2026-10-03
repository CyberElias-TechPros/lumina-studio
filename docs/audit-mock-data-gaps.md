# Functionality Gaps & Mock Data Audit

Audit date: 2026-08-16
Scope: every file in `src/` (601 files), `backend/src` (Cloudflare Worker), `backend/seeds`, and project root docs.

> **Status: remediation pass applied 2026-08-16.** All fabricated numbers shown to real users have been removed; the app now renders real API data or honest empty states. See §7 (Remediation log).

> TL;DR: The app is architecturally **real** — 293/295 app screens are wired to a live API via query hooks, the backend is 51/54 D1-backed, and the public marketing site is static-but-honest (zeroed ratings, no fake testimonials). The mock data lives in **two deliberate layers**: (1) `src/data/*` — the canonical seed/mock collections that drive *both* offline mock mode and the D1 seed generator, and (2) `src/lib/api/mocks/*` — the offline API registry. The genuine **gaps** were a small set of hardcoded screens, a handful of backend issues, and large but legitimate static content files.

---

## 1. Architecture: how data flows (important context)

- **Real mode** (production): `NEXT_PUBLIC_API_URL` is set → `src/lib/api/client.ts` fetches from the Cloudflare Worker (`/v1/*`). Confirmed by `.env`: `NEXT_PUBLIC_API_URL` is populated.
- **Mock mode** (offline/dev): `NEXT_PUBLIC_API_URL` empty → `src/lib/api/client.ts` resolves every call against `src/lib/api/mocks/*` (5,679-line registry in `index.ts`).
- **Seed layer**: `backend/scripts/gen-*.ts` generate `backend/seeds/*-data.sql` from `src/data/*` — the intended D1 seed source. Migrations (`backend/migrations/*.sql`, 41 files) are schema-only (no `INSERT` seed statements found).

This means `src/data/*` is **not dead weight** — it feeds mock mode AND the D1 seeds. But it is still full of fabricated business data (fake people, fake invoices, fake KPIs) that will become real DB rows when seeded.

---

## 2. MOCK DATA INVENTORY

### 2.1 `src/data/dashboard.ts` (926 lines) — fabricated role personas + fake business records
- `roles` — 12 personas with fake names/titles: `Chiamaka Obi` (Student), `Ifeanyi Duru` (Lead Instructor), `Ngozi Bello` (Head of Cybersecurity), `Aisha Bakare` (Head of Operations), `Tolu Ajayi` (Admissions Officer), `Musa Ibrahim` (Accountant), etc.
- Collections imported by the mock registry and seeded to D1: `invoices`, `expenses`, `employees`, `leaveRequests`, `payments`, `paymentBatches`, `payrollChanges`, `auditLog`, `systemUsers`, `notifications` — all hardcoded records with fabricated references, amounts, dates.

### 2.2 `src/data/learning.ts` (959 lines) — fake course catalog
- `learningCourses` — `Full-Stack Software Development` ("Cohort 15 A · Week 12 of 38", instructor `Prof. Adaeze Okafor`, 78% progress), plus modules/lessons/durations. Fake instructor name, fabricated cohort and progress.
- Also: `gradebook`, `assignments`, `assessments`, `calendarEvents`, `threads`, `courseBuilder`, `submissions`, `instructorGradebook` — all hardcoded.
- **Encoding bug**: line 18 shows `"PostgreSQL �?"` — corrupted/mojibake characters (em-dash broken). Same `�?` corruption exists in `src/data/marketing.ts` (`�,�96k`, `�,�1.4m`) and `.env.example`.

### 2.3 `src/data/marketing.ts` (222 lines) — fabricated marketing KPIs
- `marketingKpis` — invented numbers: `Leads (MTD) 412`, `CAC ₦96k`, `ROAS 4.2x`, `Spend ₦1.4m`, `Subscribers 12k`, `Open rate 71%`, `Followers 32k`.
- `campaigns` — fabricated ad campaigns ("Q3 digital ads", "Referral program"...) with spend/leads/ROAS.
- Also `leads`, `emailCampaigns`, `socialPosts`, `landingPages`, `seoKeywords`, `contentCalendar`, `funnel`, `reports`.
- **Mojibake**: Naira sign rendered as `�,�` throughout — these strings would render corrupted if surfaced.

### 2.4 `src/data/design.ts` (269 lines) — fabricated design-system catalog
- `designComponents`, `designTokens`, `designFlows`, `designPrototypes`, `designVersions`, `collaboration`, `exports`, `systemComponents`, `designKpis` — hardcoded design work items.

### 2.5 `src/data/localization.ts` (442 lines) — fabricated localization catalog
- Translations/locales with hardcoded content, plus `localizationKpis`.

### 2.6 `src/data/recruitment.ts` (162 lines) — fabricated jobs
- `jobPostings`, `jobCandidates` — invented roles ("Senior Product Designer at a fintech..." etc.) with fake candidates.

### 2.7 `src/data/site.ts` (807 lines) — public marketing content (mostly honest, some fabricated)
- `engines` (5), `programs` — **all have `rating: 0`** (honest placeholders, not fake scores). Some fields contain invented numbers: `"Meet 25+ employers..."` (line 434).
- `stats` — `9 training domains`, `5 ecosystem pillars`, `30+ CEA-OS workspaces`, `10 journey stages` (structural, defensible).
- `events` (line 415+) — fabricated events with 2026 dates ("Career Talent Fair 2026", "Alumni Mixer & Mentor Matching"...).
- `partnersList` — generic categories (not fake named partners).
- `blogPosts` — 20 fabricated blog posts (see 2.8).
- `jobs`/`gigs` (if present) — check; `formatNaira` util is real.

### 2.8 `src/data/blog-posts-new.ts` (388 lines) + blogPosts — 20 fabricated blog posts
- Full articles (titles, slugs, dates, bodies) — original writing but **not real business events/team**; dates are in the future relative to today (2026). These are authored content, acceptable for SEO but presented as factual.

### 2.9 `src/data/external-links.ts` (19,564 lines) — static external-resource directory
- ~8,000 curated external links (learning resources, competitions/hackathons, scholarships...). Content is real links but huge and static; feeds mock mode and `external-links-data.sql` (693 KB seed).

### 2.10 `src/data/library.ts` (59,294 lines) — massive static library catalog
- ~20k+ library items. Feeds `library-data.sql` (2.7 MB seed). Content appears curated/real (titles, authors) but is a static dataset, not live data.

### 2.11 `src/lib/api/mocks/index.ts` (5,679 lines) + siblings
- `MOCK_USER` = `Adaeze Okafor` / `student@cea.ng`, `MOCK_SESSION`, fake `mockAdmissions` (Tola Bakare, Musa Danjuma, Ngozi Eze...), plus `register*Mocks` for ai, design, localization, marketing, realtime, recruitment, uploads, live.
- Entire mock API surface that makes the app runnable offline.

### 2.12 `src/data/rbac.ts` (102 lines) — real config (NOT mock)
- Role/permission definitions — this is intended configuration, not fabricated data.

---

## 3. FUNCTIONALITY GAPS

### 3.1 Hardcoded screens (should query API but don't)
| Screen | Evidence |
|---|---|
| `src/routes/app/finance.tsx` | **Lines 31–60**: hardcoded `invoices` array (`INV-2026-0142`, ₦140,000 Term 1/2/3, "Laptop deposit"). **Line 99**: `subtitle="... Scholarship: Merit 50%"` hardcoded claim. **Line 102**: `Balance: ₦0` hardcoded. **Lines 114–132**: hardcoded stat cards (`Balance due ₦0`, `Next instalment ₦140,000`, `Paid this year`). This screen *imports* `usePaymentHistory` but renders static numbers instead of its own data. |
| `src/routes/app/admin/config.tsx` | **Lines 37–56**: hardcoded `settings` array ("Maintenance window: Next: Sat 02:00–03:00 WAT", "Enrollment open: Cohort 17 applications", "Fee payment window: Term 2 closes Aug 30") — fabricated system state not backed by any API. |
| `src/routes/app/index.tsx` (`app.index.tsx`) | **Lines 37–59**: hardcoded `courses` array (`Full-Stack 78% · Lesson 24`, `Cloud 54% · Lesson 12`, `Product 31% · Lesson 7`) — fabricated learner progress. This is the `/app/` landing hub. |

### 3.2 Feature flags defaulted OFF (features exist but are gated)
`src/lib/flags.ts` lines 9–20 defaults: `ai.grading=false`, `ai.recommendations=false`, `ai.assistant=false`, `ai.content-gen=false`, `realtime.chat=false`, `realtime.live-class=false`, `payments.paystack=false`, `uploads.r2=false`, `pwa.push=false`; only `onboarding.tours=true`. So AI, realtime, live class, Paystack, R2 uploads, and push are **off by default** and will only light up when KV flags are flipped. The AI backend (`backend/src/routes/ai.ts`) additionally returns **deterministic mock output** (lines 63–218: `mockGrade`, `mockRecommendations`, mock answers, `mockGenerated`) whenever `AI_API_KEY` is unset — documented (`mock` flag in every response) but the AI features are effectively demo-only without the key.

### 3.3 Backend issues found
| File | Issue |
|---|---|
| `backend/src/routes/auth.ts` | L53/L300: `signUpSchema.roleKey` accepted but INSERT **hardcodes `'student'`** — the client-supplied role is silently ignored. L44: `remember` parsed but never used (no short-lived session). L220–246: **magic-link sign-in does not check `users.status`** — a suspended account can get a session via magic link (only `/sign-in` checks status). L596–607: `mfa/verify` re-implements token parsing instead of reusing `lib/auth`'s `getSessionToken`. Dev `devToken` echo path present. |
| `backend/src/routes/payments.ts` | Mock checkout when no Paystack secret is set (`mock` flag) — documented but real-money flows silently no-op in dev. |
| `backend/src/routes/realtime.ts` | L68/L89: `connected: 0` hardcoded on room create/join. |
| `backend/src/routes/uploads.ts` | Falls back to worker proxy PUT when R2 presign unavailable (`mock: true`) — documented. |
| `backend/src/routes/recruitment.ts` | Schema mismatch: writes `created_by` that doesn't match expected columns (from audit). |
| `backend/src/routes/ai.ts` | Full deterministic mock fallback for grade/recommendations/ask/generate when no `AI_API_KEY`. |
| `backend/src/index.ts` | `v1.use("*", rbacGuard)` — any registered handler missing an `RBAC_RULES` entry is 403; all current routes have rules, but this is a footgun for new endpoints. |

### 3.4 Public marketing site — static content, honest numbers
- All marketing pages (`src/routes/*.tsx`) render hardcoded content from `src/data/site.ts` (programs, events, jobs, blog). This is expected for a brochure site; the risky parts are the **fabricated events** (`site.ts` line 415+) and blog posts presented as fact.
- Program `rating: 0` everywhere is honest (no fake reviews).
- Contact form **is real**: `src/routes/contact.tsx` → `submitContact` → `POST /v1/contact` (verified). Apply form is real (`submitApplication`).

### 3.5 Dead links / broken references
- Internal `to=` links were checked against the route definitions in `src/routes/`; the Next.js generator now creates an explicit App Router page for each supported definition.
- `/visit` referenced in ~10 files (`about`, `contact`, `events`, `virtual-tour`, `receptionist`, `brochure`, `feedback`, `info`, sitemap) — **route exists** at `src/routes/visit/index.tsx` (directory route), so no gap.
- All `/app/...` links resolve to existing files.

### 3.6 Data-encoding corruption (mojibake)
- `src/data/learning.ts:18` — `"PostgreSQL �?"`
- `src/data/marketing.ts` — `�,�96k`, `�,�1.4m`, `�,�90k`, `�^'8%` etc.
- `.env.example` — `�?"` (em-dash corruption)
These files were written with a broken encoding (likely UTF-8 content saved as Windows-1252 or similar). If these strings render anywhere, they display corruption.

---

## 4. WHAT'S GENUINELY REAL (so the gaps are seen in proportion)

- **295 app screens**: 293 use real query hooks (`@/lib/query/*`) → real backend endpoints. Only `admin/config.tsx` and `dev/feature-flags.tsx` have no `@/lib/query` import — and both use `useFlags()` (real KV-backed). Only the 3 screens in §3.1 render hardcoded data.
- **Backend**: 51/54 route files use D1 (`env.DB.prepare`). Auth, courses, gradebook, assignments, assessments, HR, finance, admin, notifications, certificates, payments, push, and all 30+ role dashboards query real tables.
- **Auth/session**: real session provider, MFA, magic link, devices, refresh flow (`src/lib/auth/*`).
- **PWA/push**: `src/lib/pwa.ts` real service-worker registration + push subscription; correctly no-ops in mock mode.
- **Analytics**: real GA4 (`src/lib/ga4.ts`), error capture (`src/lib/error-capture.ts`), AdSense in root head.
- **Sitemap/SEO/legal**: functional.

---

## 5. RECOMMENDATIONS (priority order)

1. **Fix the 3 hardcoded screens** (§3.1) — `app/finance.tsx`, `app/admin/config.tsx`, `app/index.tsx` — to render their own query data (or show honest empty states). These are the "too many mock numbers" a user actually sees.
2. **Decide the fate of `src/data/*` as seed source** — it's currently both mock data and D1 seed generator input. If D1 is seeded in prod from these, the DB contains fabricated personas (`Adaeze Okafor`, `Ifeanyi Duru`, etc.). Recommend: keep as *fixtures* for offline dev only, and generate **real** seed data (real student names, real invoices) for staging/prod, or keep D1 empty until real users sign up.
3. **Strip or flag fabricated marketing claims**: invented events (`site.ts` L415+), "25+ employers", blog posts dated in the future. Either remove or mark clearly as demo/sample.
4. **Fix mojibake** in `src/data/learning.ts`, `src/data/marketing.ts`, `.env.example`.
5. **Backend**: enforce `users.status` check in magic-link (auth.ts L220–246); honor `signUpSchema.roleKey` or remove it; wire `remember` or remove the field; remove `connected: 0` hardcoding in realtime.
6. **AI/payments/uploads mocks**: acceptable as documented fallbacks, but gate UI behind the existing `mock` flags so users never see fake AI output as real.
7. **Consider trimming**: `external-links.ts` (19.5k lines), `library.ts` (59k lines) are static blobs — moving them fully into D1 seeds/API and out of the client bundle would shrink the frontend and remove "mock data" surface.

---

## 6. FILES WITH NO ISSUES (checked, verified real)
Full list is large; highlights: `src/lib/api/*` (real fetch client + typed endpoints), `src/lib/query/*` (all real hooks), `src/lib/auth/*`, `src/lib/ga4.ts`, `src/lib/error-capture.ts`, `src/lib/pwa.ts`, `src/components/app/*`, all `src/routes/app/**` screens except the 3 in §3.1, all auth routes, contact/apply forms, sitemap, all backend routes except those flagged in §3.3, `src/data/rbac.ts`.

---

## 7. REMEDIATION LOG (2026-08-16)

All items below have been **fixed and verified** (frontend typecheck + build + eslint, backend typecheck + full test suite 689 passing).

### Fixed: fabricated numbers users actually saw
| Item | Change |
|---|---|
| `src/routes/app/finance.tsx` | Removed hardcoded `invoices` array, "Scholarship: Merit 50%" subtitle, "Balance: ₦0" badge, and the "Merit 50% covers instalments 1–6" financial-aid card. The screen now renders **real payment history** (`usePaymentHistory`) with derived KPIs (total paid, pending, count), an honest empty state, and an editable-amount Pay now button (no fabricated invoice refs). |
| `src/routes/app/admin/config.tsx` | Removed fabricated `settings` array ("Maintenance window", "Enrollment open Cohort 17", "Fee payment window") and the fake "2h/wk Saturdays" + "Unsynced 0" KPI cards. Now shows only **real KV-backed feature flags** + counts derived from them. |
| `src/routes/app.index.tsx` | Removed the fabricated student persona ("Good morning, Ada", GPA 4.2, 18/22 assignments, 94% attendance, 78%/54%/31% course progress, "ahead of 68% of your cohort", fake assignments list). Now greets the **real signed-in user** by first name and links to the actual workspaces (learning, assignments, gradebook, messages) + quick links. |
| `src/routes/app/chat.tsx` | Replaced the fabricated `{room.connected} online` counter (always `0` from the REST API) with an honest room-kind label ("Chat room" / "Live class"). |
| `src/data/site.ts` | Removed the invented "Meet **25+ employers**" claim from the Career & Talent Fair event blurb. |

### Fixed: fabricated/unwired backend data
| Item | Change |
|---|---|
| `backend/src/routes/realtime.ts` | Removed the always-`0` `connected` field from `ApiRealtimeRoom` (create/list handlers). The real per-room count remains available on the Durable Object (`getWebSockets().length`). Updated the mock registry, frontend type, and `test/realtime.test.ts` accordingly. |
| `backend/src/routes/auth.ts` — magic link | Added the missing `users.status` check to magic-link sign-in — a **suspended account can no longer get a session via magic link** (403 "This account has been suspended"), matching password sign-in. |
| `backend/src/routes/auth.ts` — sign-up | Removed the silently-ignored `roleKey` field from `signUpSchema` — clients could no longer *think* they chose a role; sign-ups always create a `student` (server-side only now). |
| `backend/src/routes/auth.ts` — `remember` | The `remember` flag was parsed but never used. It now controls session TTL: **24h** when unchecked, **7 days** when checked (was always 7 days). |
| `backend/src/routes/recruitment.ts` | Audited the flagged `created_by` schema mismatch — resolved by migration `0039_ownership.sql` (columns added; route INSERTs already match the post-0039 schema). No change needed. |

### Re-verified: NOT real issues
| Report | Finding |
|---|---|
| "Mojibake corruption" (§3.6) | **False alarm.** `src/data/learning.ts`, `src/data/marketing.ts`, `.env.example` were flagged for `�` characters. Raw-byte inspection shows valid UTF-8 (`E2 82 A6` = ₦, `E2 80 94` = em-dash); the replacement characters only appear when the files are decoded with the wrong codepage (Windows console / some editors). Files are clean; no U+FFFD exists anywhere in `src/`. |
| AI / payments / uploads mock fallbacks | **Intentional, documented** (`mock` flag in every response). Real when keys/secrets are configured; deterministic otherwise. Left as-is — gating UI behind the mock flags is a product decision, not a defect. |
| Feature flags defaulted off | **Intentional safety default** for AI/realtime/Paystack/R2/push. Left as-is. |

### Remaining recommendations (not code changes)
- Decide the fate of `src/data/*` as the D1 seed source (fabricated personas like `Adaeze Okafor`, `Ifeanyi Duru` become DB rows when seeded). Keep as offline fixtures; generate real seed data for staging/prod, or keep D1 empty until real users sign up.
- `external-links.ts` (19.5k lines) and `library.ts` (59k lines) are static blobs — moving them fully behind the API would shrink the client bundle.
- The public marketing pages (`events`, `jobs`, `gigs`) are static copy — future events/jobs render as scheduled; flag any that are demos rather than confirmed.
