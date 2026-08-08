# CEA-OS User Flows — Complete Walkthrough

Every flow in the app, per user, per scenario. Covers the public site, auth,
the student app, every role portal, and system-level flows (payments, push,
realtime, uploads, flags). Each section lists the exact API calls made, the
permission rules enforced, and what happens in every outcome (success, error,
mock mode).

---

## 0. How the app works (read this first)

**Two runtime modes, decided at build time by `VITE_API_URL`:**

| Mode | Trigger | What happens |
|---|---|---|
| **Mock** | `VITE_API_URL` unset | Every `src/lib/api` call is served by in-memory mocks (`src/lib/api/mocks/*`) seeded from `src/data/*`. You are always "signed in" as `Adaeze Okafor / student@cea.ng / student`, session 24h. Paystack checkout returns a fake URL, flags return defaults. |
| **Live** | `VITE_API_URL` set | All calls hit the Cloudflare worker at `https://cea-api.cyber-e54.workers.dev` (currently configured in `.env`). Cookie-based sessions, real D1 data, real Paystack. |

**Deployed reality (today):** frontend `https://cea-os.vercel.app` runs live
mode against `https://cea-api.cyber-e54.workers.dev`; the worker runs with
`APP_ENV=production` and live Paystack + VAPID secrets. Feature flags flipped
on: `payments.paystack`, `realtime.chat`, `realtime.live-class`, `uploads.r2`,
`pwa.push`. All `ai.*` flags off.

**Auth model (short version):** password sign-in/sign-up are **real**
(password hashed with Argon2id, BCrypt-style verification via libsodium
compat); a **magic-link** path also exists for password-less sign-in. Sessions
are single opaque bearer tokens stored in an HttpOnly cookie (`cea_session`),
7-day sliding expiry, rotated on every refresh, revoked on sign-out. Users
with **MFA enabled** get a challenge step after password sign-in. Seeded
accounts: `student@cea.ng`, `instructor@cea.ng`, `admin@cea.ng`, `hr@cea.ng`,
`finance@cea.ng` (all seeded with the password `cea-demo-pass-2026`, MFA off).

**Every API response** is either data or the error envelope
`{ "error": { "code", "message", "fieldErrors?" } }`. Codes: `FIELD_VALIDATION`
400, `UNAUTHORIZED` 401, `FORBIDDEN` 403, `NOT_FOUND` 404, `CONFLICT` 409,
`INVALID_MAGIC_TOKEN` 400, `MFA_REQUIRED` 401, `PAYMENT_PROVIDER_ERROR` 502,
`PAYMENT_PROVIDER_UNAVAILABLE` 503, `PUSH_UNAVAILABLE` 503,
`UPGRADE_REQUIRED` 426, `INTERNAL` 500.

**Security rules worth knowing:**
- Every `/v1/*` request passes the RBAC guard (`backend/src/lib/rbac.ts`).
  Unregistered paths → **403** (not 404). Public rules skip auth; rules with
  `roles` reject mismatched roles with 403; the rest need any valid session.
- CORS: only origins in `FRONTEND_ORIGINS` (currently `localhost:5173`,
  `127.0.0.1:5173`, `https://cea-os.vercel.app`) — or *any* origin if that
  var is empty. Cookies: `HttpOnly; SameSite=None; Secure` in production.
- All list endpoints are paginated: `?limit=` (default 20, max 50) and
  `?cursor=`; responses are `{ items, nextCursor?, total }`.
- Rate limiting (in-memory per worker, KV-backed `cea-rate-limit`):
  sign-in 5/min per email+IP, magic-link 3/15min, forgot/reset 5/15min per
  email, contact 5/10min per IP. 429 with `Retry-After`.
- Uploads: ownership-scoped keys, MIME allowlist (jpg/png/webp/gif/pdf/txt),
  10MB cap, presigned or proxy mode.

---

## 1. Visitor (anonymous) flows — public site

The public marketing site (home, programs, pricing, blog, events, about,
contact, careers, scholarships, partners, alumni, stories, virtual tour, visit,
services, work, marketplace, community, faq, engines) is **fully static** —
rendered from `src/data/site.ts`, no API calls. The backend does expose a
public `GET /v1/programs` and `GET /v1/programs/:slug` (seeded catalogue,
pagination), but **the frontend never calls them** — the `/programs` pages
render static data instead.

### 1.1 Apply to a program — `/apply` (LIVE)
- 4-step wizard (program → profile → assessment → financing); the profile
  step collects first/last name + email.
- Submit → `POST /v1/applications` (public) with
  `{ fullName, email, programSlug }`.
  - 400 `FIELD_VALIDATION` if missing/invalid; 400 `PROGRAM_NOT_FOUND` if the
    slug doesn't match a program in D1.
  - Success → `201 { application: { id, ref, status: "submitted" } }`; the
    success screen shows the **application reference** (`CEA-<year>-<6 chars>`)
    and links to `/apply/status`.
  - **No email, no notification, no user created, no auto-enrollment** (by
    design — a human reviews each application).

### 1.2 Track application — `/apply/status` (STATIC MOCK)
- Enter an ID → static mock state only.
- **Real equivalent (public):** `GET /v1/applications/:ref` → status +
  stage list (`submitted → screening → assessment → interview → offer →
  enrolled`, each stage `done`/`active`). 404 if the ref is unknown.
- **Advancement (admin only):** `PATCH /v1/applications/:ref` `{ status }` —
  rejects backwards moves (400), 404 unknown ref, writes an audit log entry.

### 1.3 Certificate verification — `/certificates/verify` (LIVE)
- Code input (or `?code=` search param) → `GET /v1/certificates/verify?code=`
  (public, code uppercased server-side).
  - < 8 chars → 400. Unknown code → `{ valid: false, message }`.
  - Valid → `{ valid: true, certificate: { code, title, issuedAt } }`; the
    page renders a "Valid credential" card with title, code and issue date.
- Verified codes only exist once a certificate has been issued (§3.12).

### 1.4 Contact & newsletter — `/contact` (LIVE)
- The contact form posts `POST /v1/contact` (public, rate-limited 5/10min
  per IP): `{ name, email, message, kind: "contact" | "newsletter" }`.
  - 400 `FIELD_VALIDATION` on bad input; 429 when rate-limited.
  - Success → `201 { ok: true, kind }`; row written to the marketing `leads`
    table so the marketing suite sees real submissions.
- Footer newsletter form: none exists (no duplicate capture point).

---

## 2. Account lifecycle (every user)

### 2.1 Sign up — `/auth/sign-up` (LIVE)
- Posts `POST /v1/auth/sign-up` `{ name, email, password }` (public,
  rate-limited per IP).
  - 400 `FIELD_VALIDATION`; 409 `EMAIL_TAKEN` if the email exists.
  - Success → `201 { user, expiresAt }` + `cea_session` cookie; navigates
    straight to `/app`. Role is always `student`.

### 2.2 Sign in — `/auth/sign-in` (LIVE)
Two tabs on the page:
- **Password tab (real):** posts `POST /v1/auth/sign-in`
  `{ email, password, remember }` (rate-limited 5/min per email+IP).
  - Wrong email/password → **401** (same message either way — no user
    enumeration).
  - Suspended user → 403.
  - No MFA on the account → `200 { user, expiresAt }` → navigate `/app`.
  - **MFA enabled** → `200 { mfaRequired: true, expiresAt }` (no `user`).
    The frontend detects this and navigates to `/auth/mfa`.
- **Magic link tab:** enter email →
  1. `POST /v1/auth/magic-link` (public, rate-limited 3/15min). Stores a
     hashed token in D1 `magic_links`, **expires 15 minutes, single-use**.
      Returns `201 { ok: true }`; in non-production also `devToken` shown as
      an "Open sign-in link (dev)" button. **Production sends no email** —
      external email delivery (Resend) is configured in vars but
      `EMAIL_API_KEY` is not set yet (set it as a Worker secret to enable).
  2. `GET /v1/auth/magic-link/verify?token=` (public) — marks consumed,
     finds-or-creates the user (new users become `student`), creates the
     session, sets the cookie, returns the session payload.
- Social buttons (Google/Microsoft) remain non-functional placeholders.

### 2.3 MFA challenge — `/auth/mfa` (LIVE)
- Shown after password sign-in when the account has MFA enabled (the
  pending session cookie `cea_session` carries the half-auth state).
- Two methods on the page: **app code** or **recovery key** →
  `POST /v1/auth/mfa/verify` `{ code }`.
  - Wrong code → 401 `MFA_INVALID`. Valid → `200 { user, expiresAt }` and
    the pending flag on the session is cleared → navigate `/app`.
- MFA setup lives on the security page (§2.6); recovery keys are 24-char,
  single-use each.

### 2.4 Forgot / reset password (LIVE)
- `/auth/forgot-password` → `POST /v1/auth/forgot-password` `{ email }`
  (public, rate-limited). Always `200 { ok: true, sent }` (no enumeration);
  when a token is produced (dev), the response carries it for the demo.
- `/auth/reset-password?token=` → `POST /v1/auth/reset-password`
  `{ token, password }` (public, rate-limited). Validates the token
  (unknown/expired → 400 `INVALID_RESET_TOKEN`), enforces password strength
  (8+ chars, uppercase, number/symbol), hashes and stores the new password.
  Success → success state → link to sign-in.

### 2.5 Session lifecycle (automatic, client-side)
- Session lives only in the HttpOnly cookie; react-query caches it under
  `["session"]`. Every API call sends `credentials: "include"`.
- On a **401**, the client fires a single-flight `POST /v1/auth/refresh`
  (any authenticated user): rotates the session token in place, **resets
  expiry to +7 days** (sliding window), sets a new cookie. If refresh fails,
  the user is signed out in the UI.
- **Sign-out:** the AppShell sidebar button (and header avatar area) calls
  `POST /v1/auth/sign-out` → revokes the session, clears the cookie,
  navigates home. The AppShell also **redirects signed-out visitors** away
  from `/app/*` to `/auth/sign-in` in live mode (mock mode is unaffected).

### 2.6 Account security — `/auth/new-device` (LIVE)
Renamed in purpose to an account-security page:
- **Devices:** `GET /v1/auth/devices` (any authenticated) — your sessions
  (label, IP, created, active, `current` flag). Revoke:
  `POST /v1/auth/devices/:id/revoke` (own devices only; 403 otherwise).
- **MFA:** "Set up" → `POST /v1/auth/mfa/setup` → `{ secret, otpauth,
  recoveryCodes, enabled }`. Enter a 6-digit code →
  `POST /v1/auth/mfa/enable` `{ code }` (wrong → 400) → MFA on. Disable
  requires the current code: `POST /v1/auth/mfa/disable`. Recovery keys are
  shown with copy buttons + a downloadable text file.

---

## 3. Student flows (role: `student`)

App shell sidebar: Home, Learning Hub, Assignments, Assessments, Grades,
Portfolio, Calendar, Messages, Chat, AI Assistant, Finance, Attendance,
Certificates, Notifications (bell in the header). Pages live under
`/app/*`, all inside `AppShell`. The shell now shows the **real signed-in
user** (name/email/initials) and redirects signed-out visitors to sign-in
in live mode; the "Viewing as" role switcher remains a demo affordance.

### 3.1 Dashboard — `/app` and `/app/learn`
- `/app` (STATIC): hard-coded "Good morning, Ada" dashboard, static KPIs,
  onboarding tour (4 steps, `localStorage`, gated by `onboarding.tours`).
- `/app/learn` (LIVE): `GET /v1/dashboard/student` (**student role only**):
  KPIs (enrolled, overall progress, lessons this week vs goal, study hours,
  streak), next-up lesson, per-course progress.

### 3.2 Courses — `/app/learn/$courseId`, `/app/learn/$courseId/lessons/$lessonId`
- `GET /v1/courses` (any authenticated); `GET /v1/courses/:slug` (404 for
  unknown). Enrollment exists only from seeds/DB.
- **New:** `POST /v1/courses/:slug/enroll` (**student only**) and
  `POST /v1/courses/:slug/lessons/:lessonId/complete` (**student only**,
  updates progress in `student_stats`). Lesson pages remain static shells
  around course data.

### 3.3 Grades — `/app/grades`
- `GET /v1/courses/gradebook` (**student only**): own gradebook rows.

### 3.4 Assignments & assessments
- `GET /v1/assignments`, `GET /v1/assignments/:id` (**student only**, own
  rows). **New:** `POST /v1/assignments/:id/submit` (accepts `{ note?,
  url? }` and uploads via multipart or body text) and
  `GET /v1/assignments/:id/submission` (own submission).
- `GET /v1/assessments`, `GET /v1/assessments/:id` (**student only**).
- The "Take" screens remain static — **no assessment answer-save endpoint**.

### 3.5 Calendar / Messages / Notifications
- `GET /v1/calendar/events` (any authenticated).
- `GET /v1/messages/threads`, `GET /v1/messages/threads/:id` (any
  authenticated, own threads only). **New:** `POST /v1/messages/threads/:id/messages`
  `{ body }` — send a message to your own thread.
- Notifications (**any authenticated**):
  - `GET /v1/notifications` — yours + broadcasts (`user_id IS NULL`).
  - `POST /v1/notifications/:id/read` — mark one read (own only).
  - `POST /v1/notifications/read-all` — mark all read.
  - `/app/notifications` wires both: unread rows show a dot, clicking an
    unread row marks it read; "Mark all read" button in the header actions.
  - Written by the payments webhook ("Payment received"/"Payment failed").

### 3.6 Payments — `/app/finance` (LIVE)
1. "Pay now" posts `{ amount: 140000, description, redirectUrl:
   <origin>/app/finance/pay-verify }` → `POST /v1/payments/checkout`
   (any authenticated). Amount must be whole NGN 1–10,000,000; description
   ≤ 120 chars; `redirectUrl` must be an https URL → else 400.
2. A `payments` row is inserted: `reference = cea_<16 hex>`, `status =
   "pending"`, `provider = "paystack"`.
3. **Real mode:** Paystack `transaction/initialize` with `amount * 100` and
   `callback_url = <redirectUrl>?reference=<reference>`. Success → `201
   { reference, authorizationUrl, accessCode, mock: false }`; Paystack
   failure → 502 `PAYMENT_PROVIDER_ERROR`. **Mock mode** (no secret):
   `201 { authorizationUrl: https://checkout.paystack.com/<reference>,
   mock: true }`.
4. Frontend: live mode opens Paystack in a new tab — the Paystack tab
   redirects to the **verify page** on completion; mock mode navigates
   straight to the verify page.
5. **Verify page — `/app/finance/pay-verify?reference=`** (LIVE):
   `GET /v1/payments/verify/:reference` (own record only; 404 unknown,
   403 other users). If still `pending` and a Paystack secret exists it
   queries Paystack `transaction/verify` and syncs the status. Renders
   success / failed / pending states with a link back to `/app/finance`.
6. History `GET /v1/payments/history` (own rows; webhook keeps them fresh).
7. The invoices card, "Balance: ₦0" badge and receipt buttons remain
   hard-coded/static.

**Paystack dashboard setup:** webhook URL
`https://cea-api.cyber-e54.workers.dev/v1/payments/webhook`; callback is
now set per-checkout via `redirect_url` (see step 1).

### 3.7 Realtime chat — `/app/chat` (LIVE, REST-polled)
- `GET /v1/realtime/chat/rooms`; `POST /v1/realtime/chat/rooms`
  `{ name, kind? }`; `GET/POST /v1/realtime/chat/rooms/:id/messages`
  (history paginated; post persists to D1).
- The UI polls via REST (react-query invalidation on send) — the WebSocket
  fan-out exists in the Durable Object but no page opens a socket yet.

### 3.8 Live classes — `/app/live`, `/app/live/$classId` (LIVE)
- `GET /v1/live/classes` (any authenticated).
- **New (instructor/admin only):** `POST /v1/live/classes` `{ title,
  cohort?, status? }` (creates a session) and `PATCH /v1/live/classes/:id`
  `{ status }` (live/ended transitions).
- Class page: chat `GET/POST /v1/live/classes/:id/chat`; polls
  `GET/POST .../polls`, vote `POST .../polls/:pollId/vote` (one vote per
  user, closed polls → 409); whiteboard ops `GET` (any) / `POST`
  (instructor/admin). WS upgrades exist for fan-out; UI doesn't open them.

### 3.9 AI assistant — `/app/ai` (LIVE, deterministic unless keyed)
- `GET /v1/ai/recommendations`; `POST /v1/ai/ask` `{ question }`;
  `POST /v1/ai/generate` `{ kind, topic }`; `POST /v1/ai/grade` `{ rubric }`
  (**instructor/admin only**).
- When `AI_API_KEY` is set the `ask`/`generate` endpoints call the OpenAI-
  compatible `chatCompletion` (vars `AI_BASE_URL`, `AI_MODEL=gpt-4o-mini`);
  **without a key** they return deterministic template answers with
  `mock: true`. Key is not set in production yet.

### 3.10 Uploads (LIVE, proxy mode)
- `POST /v1/uploads/presign` `{ filename?, contentType? }` (any
  authenticated). Key = `<userId>/<uuid>.<ext>`; MIME allowlist
  (jpg/png/webp/gif/pdf/txt), 10MB cap → 400/413 otherwise.
- `UPLOADS_PRESIGN_URL` is empty → returns the **worker proxy** path
  `uploadUrl: /v1/uploads/<key>`, `mock: true`.
- `PUT /v1/uploads/:key` streams to R2 (201 + size); `GET` streams back;
  `DELETE` removes. **Ownership enforced:** the key must start with
  `<userId>/` → else 403.

### 3.11 Push notifications
- Auto-subscribe on load when `pwa.push` on + VAPID present + permission:
  `POST /v1/push/subscriptions` (validates endpoint/p256dh/auth), upsert per
  endpoint. List: `GET /v1/push/subscriptions`; remove: `DELETE .../:id`
  (own only).
- Send: `POST /v1/push/send` `{ title, body, url?, userId? }` — anyone to
  self; **admin/instructor** to any user (403 otherwise). No VAPID → 503.
  Dead endpoints auto-removed; response `{ sent, removed }`.
- **UI (live):** "Send a push" card on `/app/notifications` — title, message,
  optional open-link URL; admin/instructor pick the recipient (candidates
  list), everyone else sends to their own devices. Sends via
  `POST /v1/push/send`; result shows devices reached + stale subscriptions
  pruned. (Push *receiving* still needs a subscribed browser: the
  auto-subscribe hook fires only when the `pwa.push` flag is on and the
  browser grants permission.)

### 3.12 Certificates — `/app/certificates` (LIVE)
- `GET /v1/certificates/mine` (any authenticated) — own certificates with
  their verification codes, listed on the page with a verify link that
  pre-fills the public checker (`/certificates/verify?code=`).
- Issue: **"Issue a certificate" card** shown to `instructor`/`admin`
  roles. Picks the recipient from `GET /v1/certificates/candidates` (active
  users, instructor/admin only) and the course from the catalog, auto-fills
  the title (editable), then `POST /v1/certificates`
  `{ userId, courseSlug, title }` (duplicate → 409). The returned code is
  shown inline and can be verified publicly immediately.

---

## 4. Instructor flows (role: `instructor`)

Sidebar: `/app/instructor/*` — gradebook, courses, assignments, and (new)
**live-class controls**.
- `GET /v1/instructor/gradebook` — own `instructor_gradebook` rows.
- `GET /v1/instructor/courses` — own `instructor_courses`; `GET .../:slug`
  matches by row `id`.
- `GET /v1/instructor/assignments`, `GET .../:id` — own submissions.
- **New (instructor-only):** `POST /v1/instructor/submissions/:id` — grade
  or return a submission `{ action: "grade"|"return", score?, feedback? }`;
  `GET /v1/instructor/submissions/:id` — submission detail.
- Live classes: create/patch sessions, create polls, whiteboard ops (§3.8).
- AI grading (`POST /v1/ai/grade`) and push-to-anyone (§3.11).
- Admin is **not** allowed on instructor routes.

---

## 5. HR flows (roles: `hr`, `admin`)

Pages under `/app/hr/*`. **New write actions:**
- `GET /v1/hr/employees` — all employees.
- `GET /v1/hr/leave-requests` + **`PATCH /v1/hr/leave-requests/:id`**
  `{ status: "approved"|"rejected" }` — decide a request.
- `GET /v1/hr/payroll-changes` + **`POST /v1/hr/payroll-changes`**
  `{ title, detail? }` (create a change) + **`PATCH .../:id`**
  `{ status: "approved"|"rejected" }`.
- All HR routes role-gated `["hr", "admin"]`; writes are audited.

---

## 6. Finance flows (roles: `finance`, `admin`)

Pages under `/app/accountant/*`. **New write actions:**
- `GET /v1/invoices` + **`PATCH /v1/invoices/:id`** `{ status:
  "paid"|"overdue"|"cancelled" }`.
- `GET /v1/expenses` + **`PATCH /v1/expenses/:id`** `{ status:
  "approved"|"rejected" }`.
- `GET /v1/payments` → `payment_batches` (payout list; separate from the
  consumer payments router).
- Finance users also have a normal account and can use student flows (§3.6).

---

## 7. Employer / recruitment flows (any authenticated user)

Pages under `/app/employer/*`. **New write actions:**
- `GET /v1/recruitment/postings` + **`POST /v1/recruitment/postings`**
  `{ title, detail? }` + **`PATCH /v1/recruitment/postings/:id`**
  `{ status: "published"|"paused"|"closed" }` — all role-gated
  `["employer", "hr", "admin"]` (the GET is open to any authenticated user).
- `GET /v1/recruitment/postings/:id/candidates` + **`PATCH
  .../candidates/:candidateId`** `{ stage }` (advance a candidate through
  applied → screening → interview → offer).
- `GET /v1/recruitment/interviews` + **`POST /v1/recruitment/interviews`**
  `{ candidate, role, date, mode? }` (role-gated).
- `GET /v1/recruitment/talent`.

---

## 8. Admin flows (role: `admin`)

Pages under `/app/admin/*`:
- `GET /v1/admin/users` → the **`admin_users`** table (separate from
  `users`).
- **`GET /v1/admin/accounts`** — the real `users` table with role/status
  (the audit trail for provisioning).
- **New (admin only):** `POST /v1/admin/users` `{ name, email, roleKey,
  password? }` (creates a user, hashed password, audit log) and
  `PATCH /v1/admin/users/:id` `{ status: "active"|"suspended", roleKey? }`
  (suspend/activate/change role, audited). Suspended users lose sessions.
- `GET /v1/admin/audit-log` — audit_log (now written by every admin/HR/
  finance/instructor write action).
- **Feature flags:** `PUT/DELETE /v1/flags/:key` (**admin only**, KV
  overrides). No client UI — use curl or `wrangler kv`.
- Admin also has: instructor live-class controls, AI grading, push to any
  user, HR + finance access. Admin is **excluded** from `instructor` routes.

---

## 9. System-level flows

### 9.1 Paystack webhook — `POST /v1/payments/webhook` (public)
1. With a secret: requires `x-paystack-signature` (missing/bad → 401),
   HMAC-SHA512 of the raw body, constant-time compare. No secret +
   `APP_ENV=production` → 503; dev → signature skipped.
2. `charge.success` → row `success`, amount corrected, `paid_at` set,
   "Payment received" notification (first transition only); `charge.failed`
   → `failed` + notification; unknown → `{ ok: true }`.
3. Configured at `https://cea-api.cyber-e54.workers.dev/v1/payments/webhook`.

### 9.2 Health — `GET /v1/health` (public) — `SELECT 1` on D1.

### 9.3 Flags — `GET /v1/flags` (public) — defaults + KV `overrides`.

### 9.4 Current live flag state
| Flag | State | Effect |
|---|---|---|
| `onboarding.tours` | on (default) | onboarding tour on `/app` |
| `pwa.push` | **on (override)** | auto push-subscribe on load |
| `payments.paystack` | **on (override)** | real Paystack checkout |
| `realtime.chat` | **on (override)** | chat UI available |
| `realtime.live-class` | **on (override)** | live classes UI available |
| `uploads.r2` | **on (override)** | uploads UI available |
| `ai.grading` / `ai.recommendations` / `ai.assistant` / `ai.content-gen` | off | AI falls back to deterministic mock (no key set) |

---

## 10. Flows that don't exist yet (honest list)

1. **Email delivery of magic links / reset tokens** — `EMAIL_API_KEY` (Resend)
   is now set as a Worker secret; magic-link/reset emails will send. Dev still
   shows the dev token in the UI.
2. **AI in production** — `AI_API_KEY` (NVIDIA NIM) is now set as a Worker
   secret; `ask`/`generate`/`recommendations` hit real models. Falls back to
   deterministic answers only if the key is missing or the provider errors.
3. **Assessment answer-save, attendance mark, portfolio, employer
   applications** — read-only/static screens (no write endpoints yet).
4. **WebSocket UI** — chat/live pages poll REST; fan-out exists but nothing
   opens a socket.
5. **Push receiving in a real browser** — the send UI exists, but push
   subscription/auto-subscribe only activates in browsers that grant
   permission while the `pwa.push` flag is on.
6. **OAuth (Google/Microsoft) sign-in** — dead buttons.
7. **Notification preferences, quiet hours** — static badges.

---

## 11. Role & permission reference

| Role key | Server-gated routes (summary) |
|---|---|
| `student` | dashboard/student, courses gradebook/enroll/complete, assignments, assessments |
| `instructor` | `/v1/instructor/*` (only role), AI grade, live classes/polls/whiteboard, push to anyone |
| `admin` | `/v1/admin/*`, flags PUT/DELETE, HR, finance, applications PATCH, live instructor ops, AI grade, push to anyone |
| `hr` | `/v1/hr/*` (with admin) |
| `finance` | `/v1/invoices`, `/v1/expenses`, `/v1/payments` batches (with admin) |
| `employer` | recruitment postings/interviews writes (with hr, admin) |
| others (`mentor`, `alumni`, `product-marketing`, `behavioral-design`, `growth`, `localization`, `design`) | no role-scoped endpoints; their portals are static mockups |

Seeded accounts (password `cea-demo-pass-2026`, MFA off):
`student@cea.ng`, `instructor@cea.ng`, `admin@cea.ng`, `hr@cea.ng`,
`finance@cea.ng`. The password is hashed (PBKDF2-SHA256, 100k iterations)
into the seeds and applied to production D1.

---

## 12. Live-mode flow checklist (what actually happens on cea-os.vercel.app today)

1. Visitor browses static marketing pages; can apply (`/apply` → real
   `POST /v1/applications`, gets a reference), verify certificates (real
   public lookup), and send the contact form (real lead write).
2. Signs up with email+password (real, hashed) or signs in as a seeded
   account; users with MFA enabled complete the `/auth/mfa` challenge.
3. Student lands on `/app`, reads real dashboard/courses/assignments/
   grades/calendar/messages/notifications; marks notifications read.
4. Pays via finance page → Paystack tab → callback to
   `/app/finance/pay-verify?reference=` (real verification) → history +
   notification update via webhook.
5. Chats in `/app/chat` (REST, D1), joins live-class chat/polls.
6. Staff roles (admin/hr/finance/instructor/employer) can perform the new
   write actions (provision, decide leave, approve invoices/expenses,
   advance applications/candidates, schedule classes, issue certificates,
   grade submissions) — all audited.
7. Account security page: list/revoke devices, enable/disable MFA.
8. Notifications centre: mark read / mark all read; admin/instructor send
   browser pushes from the same page.
9. Certificates page: live list of issued credentials; instructor/admin
   issue new ones (recipient + course) that verify instantly.
8. Browser auto-subscribes to push (flag on); staff can send via API.
9. Every other portal page renders static mockups; role-gated API calls
   outside your role 403 cleanly.
