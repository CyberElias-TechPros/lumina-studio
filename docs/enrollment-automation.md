# Enrollment funnel — free-services automation playbook

**Scope.** Everything that happens between "a stranger sees cea.ng" and "the fee
( or deposit) is in the account" — for both short courses (2–6 weeks, 2 sessions/week)
and long-form trainings (3–6 months, **3 days/week**) — built on services that cost
**₦0 to set up and run** at CEA's volume, with the single exception of Paystack's
per-transaction fee (free to start; educational-institution rate 0.7% on local cards,
capped at ₦1,500 — see [Paystack pricing](https://support.paystack.com/en/articles/2130306)).

---

## 1. What was built in this repository

| Piece                    | Where                                                          | What it does                                                                                                      |
| ------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 5-step registration form | `src/routes/apply/index.tsx`                                   | Course → Schedule → Payment → About you → Review & submit, with a live "at a glance" panel                        |
| Long-form program data   | `src/data/academy/longform.ts`                                 | 5 trainings, 3 days/week, market-anchored fees, payment plans, cohort dates                                       |
| Public enrollment API    | `backend/src/routes/enrollments.ts`                            | Create registration, start Paystack session, verify, webhook, public status, admin pipeline                       |
| Schema                   | `backend/migrations/0055_enrollments.sql`                      | `registrations`, `registration_payments`, `registration_events` (mirrors into the legacy `applications` pipeline) |
| Pay-return page          | `src/routes/apply/pay.tsx`                                     | Landing after the Paystack redirect; auto-verifies                                                                |
| Status tracking          | `src/routes/apply/status/$id.tsx` + `GET /v1/enrollments/:ref` | Ref-based tracking with events + payment state                                                                    |
| Tests                    | `backend/test/enrollments.test.ts`                             | 15 tests covering validation, plans, checkout, verify, pipeline                                                   |

### The full form — information **given to the student** (shown at every step)

- Fee for the exact programme, with plan maths (discount, deposit, balance)
- No application fee; deposit refund/transfer policy (7-day refund, one transfer)
- Start dates: short = rolling intake (next start ≤ 2 weeks); long = fixed cohorts (2 Nov 2026, 16 Feb 2027)
- Schedule: days, time slot, onsite/online/hybrid; 1.5–2 h practical sessions
- **What they leave with** (the deliverable) + certificate verified at `cea.ng/certificates/verify`
- **What to bring**: laptop (or academy machines for Typing & Computer Basics), notebook, data
- Delivery promise: every class note published online _before_ they pay
- Visit/contact: 24/26 Ebony Road, +234 905 862 8386, Mon–Sat 8:00–20:00 WAT
- "What happens next" timeline on the success screen (instant email → 24 h contact → pay → welcome pack)

### The full form — information **collected from the student**

| Step      | Fields                                                                                                                                                                                          |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Course    | programme slug (short or long)                                                                                                                                                                  |
| Schedule  | days (`standard`/`mwf`/`tss`), time slot, mode (onsite/online/hybrid), preferred start date                                                                                                     |
| Payment   | plan (`full`/`50-50`/`deposit-monthly`/`full-10-off`), method (Paystack / bank transfer)                                                                                                        |
| About you | first & last name, email, WhatsApp phone, city/state, birth year, gender (optional), education level, experience, goal (why), current job/school/business, has laptop, how they heard about CEA |
| Consent   | privacy policy, terms of sale, WhatsApp contact (opt-in)                                                                                                                                        |
| System    | Cloudflare Turnstile token, client IP, event timeline                                                                                                                                           |

---

## 2. Pricing & periods (market-anchored, September 2026)

Short courses keep the published fees (₦20,000–₦60,000, 2–6 weeks, 2 sessions/week).
Long-form trainings are priced at the **average** Nigerian market rate for
_part-time, non-immersive_ tech training — not bootcamp-immersive rates:

| Programme                    | Duration | Rhythm      | Fee      | Deposit       | Market context                                |
| ---------------------------- | -------- | ----------- | -------- | ------------- | --------------------------------------------- |
| IT Professional Diploma      | 6 months | 3 days/week | ₦300,000 | ₦90,000 (30%) | —                                             |
| Web Development Professional | 6 months | 3 days/week | ₦320,000 | ₦96,000 (30%) | Lagos bootcamps ₦300k–₦1.5M (3–12 mo)         |
| Data Analytics & AI          | 6 months | 3 days/week | ₦300,000 | ₦90,000 (30%) | Structured online courses ₦20k–₦300k          |
| Cybersecurity Foundations    | 3 months | 3 days/week | ₦160,000 | ₦48,000 (30%) | 6-mo immersive up to ₦1.2M (full-time campus) |
| Digital Business Bootcamp    | 3 months | 3 days/week | ₦150,000 | ₦45,000 (30%) | —                                             |

Sources: [MCTaba 2026 Lagos coding options comparison](https://www.mctaba.com/learn/nigeria/learn-to-code-in-lagos-options)
(bootcamps NGN 300k–1.5M), [Albanny cost guide](https://albannytechnologies.com/cost-to-learn-full-stack-web-development-in-nigeria/)
(online ₦20k–₦300k; bootcamps ₦100k–₦1.5M), [ITSkillsCenter](https://www.itskillscentre.com.ng/)
(6-mo immersive ₦1.2M). CEA sits in the affordable middle: part-time, no boarding,
Port Harcourt base, certificate on a real deliverable.

**Payment plans** (enforced server-side per programme kind):

- **Short courses** — `full` (100% before start) or `50-50` (50% deposit now, 50% at mid-course).
- **Long-form** — `deposit-monthly` (30% deposit, balance in equal monthly instalments) or
  `full-10-off` (pay the whole fee, **10% discount** — the anchor that makes the deposit plan look fair).

Every session is 1.5–2 hours at a machine; long-form runs 3 days/week
(Mon·Wed·Fri or Tue·Thu·Sat; morning/afternoon/evening blocks).

---

## 3. The automated funnel (stage by stage)

```
visit ──▶ form ──▶ submitted ──▶ contacted ──▶ deposit paid ──▶ welcome pack ──▶ class 1 ──▶ completion
  │         │          │              │               │                │
GA4+Clarity Turnstile  instant email  24h WhatsApp    Paystack webhook welcome email  attendance
rate limits   (free)   + Sheets       + nurture seq   (auto receipt)   + Meet invite   + certificate
```

### Stage 0 — Visit → start form (free)

| Automation                           | Service (free)                                                        | Setup                                                                                                                                                                                                                                     |
| ------------------------------------ | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Human verification / spam & bot wall | **Cloudflare Turnstile**                                              | Create a widget in Cloudflare dashboard → set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (frontend) + `TURNSTILE_SECRET_KEY` (worker secret). The form already renders the widget on step 5 and the API already verifies the token when the secret is set. |
| Form-abandonment insight             | **Google Analytics 4** + **Microsoft Clarity** (session replay, free) | Drop both snippets into `src/routes/__root.tsx` head (GA4 via `gtag`, Clarity via `clarity` script). Clarity shows exactly which step people quit at.                                                                                     |
| Anti-spam rate limits                | Cloudflare Workers KV (already in use)                                | Done — 10 submissions/h/IP, 10 payments/h/IP.                                                                                                                                                                                             |

### Stage 1 — Submit → instant confirmation (free)

| Automation                                                          | Service (free)                                                                 | Status                                                                                                                                                                                                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Confirmation email with ref, fee summary, next steps                | Worker `sendEmail` (Resend **free 100 e-mails/day** or Brevo **free 300/day**) | **Built** — `POST /v1/enrollments` fires it; set `EMAIL_PROVIDER=resend` + `EMAIL_API_KEY` + `EMAIL_FROM`.                                                                                                    |
| Lead lands in Google Sheets (admissions + finance see it in Google) | **Google Sheets + Apps Script** (free)                                         | **Built-in ready** — mirror endpoint optional; simplest: run the script in §4 which polls `GET /v1/enrollments/admin` (or receive via webhook) and appends a row.                                             |
| WhatsApp nudge (student-initiated, always free)                     | Click-to-WhatsApp link pre-filled with their ref                               | **Built** — success screen + status page deep-link into `wa.me/2349058628386` with the ref in the message. Student messages first ⇒ the 72-hour free conversation window applies if/when you move to the API. |
| Admissions alert                                                    | **WhatsApp Business app** (free) + the Sheets row                              | The Sheets row (or a Zap) pings the admissions phone. Zero API cost.                                                                                                                                          |

### Stage 2 — Follow-up drip on unpaid leads (free)

1. **Email nurture (Brevo free 300/day or Kit free 10k subscribers):**
   - _T+0 h_: confirmation (already automatic).
   - _T+24 h_: "Your seat is still open" — fee summary, deposit link (the tracking page URL with ref), answer the top 3 FAQ from `/faq`.
   - _T+72 h_: "What to bring + class photos + how a session runs" (link the free notes).
   - _T+7 d_: "Last chance before the next cohort / seats released" — works better for long-form (cohort dates create scarcity honestly).
     Implementation: Brevo _journeys_ (automation) on the free tier, subscriber tag = `enrollment-unpaid`. One-time export of unpaid leads from `GET /v1/enrollments/admin?stage=submitted` (or the Sheets column) into the Brevo audience.
2. **WhatsApp follow-up (free tier):** WhatsApp Business app on the admissions phone;
   the Sheets mirror gives a printable/contactable list. Script in §5. Move to
   **WhatsApp Cloud API** only when volume demands (utility messages ≈ ₦11 each —
   not free, but the cheapest per-message channel in Nigeria; 72 h free window after
   any student message).

### Stage 3 — Payment (free to set up; per-tx fee only)

| Automation                      | Service                                                                                                                                    | Status                                                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Checkout for deposit / full fee | **Paystack** hosted checkout (no setup or monthly fee; educational rate 0.7% local card, capped ₦1,500; flat ₦300 transfer/USSD)           | **Built** — `POST /v1/enrollments/:ref/payments`; set `PAYSTACK_SECRET_KEY` (worker) + `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`.                                  |
| Instant status update + receipt | Paystack webhook `POST /v1/enrollments/webhook` (HMAC-verified) → marks paid/deposit_paid → auto receipt email + `payment_confirmed` event | **Built**. In the Paystack dashboard set the webhook URL to `https://<your-worker>/v1/enrollments/webhook` (events: charge.success, charge.failed). |
| Bank-transfer path              | Free — account details on WhatsApp, staff confirms in Sheets                                                                               | Offered as `bank-transfer` method in the form; confirmation is a 2-minute manual step.                                                              |
| Payment reminders               | Reuse the nurture journey tag `payment-pending` (Brevo) + WhatsApp from Sheets                                                             | Free.                                                                                                                                               |

### Stage 4 — Deposit → first class (free)

| Automation                    | Service (free)                                                                      | Notes                                                                                                                                                                                     |
| ----------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Student portal account        | CEA-OS auth (magic-link e-mail, existing infra)                                     | When admission moves the stage to `enrolled`, send the magic link to the student's e-mail — they land in a portal with their course, notes and timetable.                                 |
| Online/hybrid sessions        | **Google Meet** (free, 100 participants) or Zoom free (40 min) — Google recommended | Class links go in the welcome pack + calendar event.                                                                                                                                      |
| Calendar invites              | **Google Calendar** API (free) or the ICS already generated on the success screen   | Long-form: invite to the cohort start day (built). Short: admission adds the confirmed dates.                                                                                             |
| Welcome pack e-mail           | `sendEmail` (Resend/Brevo free)                                                     | Schedule, what to bring, notes links, Meet link, ref. Trigger: stage → `enrolled` (admin action in the admissions workspace) or a scheduled run over `stage=enrolled AND welcome_sent=0`. |
| Pre-start reminder (T−2 days) | Brevo journey / manual WhatsApp from Sheets                                         | "Your first session: day, time, what to bring." Cuts no-shows.                                                                                                                            |

### Stage 5 — In class → completion (free)

- **Attendance + session feedback**: existing CEA-OS attendance module; per-session
  3-question **Google Form** link in the calendar event (free, straight to Sheets).
- **Certificates**: issued on the deliverable; verified publicly at
  `cea.ng/certificates/verify` (already built) — students share the verify link,
  which is itself a lead channel.
- **Alumni**: existing Community engine (free infra) — graduate group on WhatsApp
  (free), referrals earn a credit on the next course (tracked with the
  `referred_by` field the form now collects).

### Optional near-free upgrades (only when volume justifies)

| Service                             | Cost                             | When                                                       |
| ----------------------------------- | -------------------------------- | ---------------------------------------------------------- |
| WhatsApp Cloud API utility messages | ≈ ₦10.89/message (Naira billing) | > ~200 confirmations/month                                 |
| Make.com no-code glue               | Free 1,000 ops/month             | If you'd rather not touch the worker for the Sheets mirror |
| Uplink free tier                    | Free                             | Deeper funnel analytics                                    |

---

## 4. Google Sheets mirror (free, ~5 minutes to set up)

1. Create a Google Sheet: **CEA Leads**. Columns:
   `ref | created | name | email | phone | city | program | kind | fee | plan | method | payment_status | paid | balance | stage | mode | days | slot | goal | referred_by | has_laptop | link`
2. _Extensions → Apps Script_, paste:

```js
// CEA enrollment mirror — polls the admin API every 15 min (Runs → Triggers).
const API = "https://cea-api.cyber-e54.workers.dev"; // your worker
const SHEET = "CEA Leads";
const TOKEN = PropertiesService.getScriptProperties().getProperty("CEA_ADMIN_TOKEN");

function syncEnrollments() {
  const res = UrlFetchApp.fetch(API + "/v1/enrollments/admin?limit=100", {
    headers: { Authorization: "Bearer " + TOKEN, "Content-Type": "application/json" },
    muteHttpExceptions: true,
  });
  const body = JSON.parse(res.getContentText());
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET);
  const existing = new Set(
    sheet
      .getDataRange()
      .getValues()
      .map((r) => r[0]),
  );
  for (const e of body.items) {
    if (existing.has(e.ref)) continue;
    sheet.appendRow([
      e.ref,
      e.createdAt,
      e.student.fullName,
      e.student.email,
      e.student.phone,
      e.student.city,
      e.programTitle,
      e.programKind,
      e.feeTotal,
      e.payment.plan,
      e.payment.method,
      e.payment.status,
      e.payment.paidAmount,
      e.payment.amountDue,
      e.stage,
      e.student.mode,
      e.student.scheduleDays,
      e.student.timeSlot,
      e.student.goal,
      e.student.referredBy,
      e.student.hasLaptop,
      "https://cea.ng/apply/status/" + e.ref,
    ]);
  }
}
```

3. Store your CEA-OS admin session token in _Script Properties_ (`CEA_ADMIN_TOKEN`).
   (Token from your browser devtools → application → cookies → session; refresh
   monthly, or swap to a service account later.)
4. _Triggers → Add trigger_: `syncEnrollments` → time-driven → every 15 minutes.
   New lead appears in Google within 15 minutes — and Brevo's free e-mail
   notification-on-sheet-change (or a second script `onEdit`) can ping WhatsApp.

**Built-in real-time push (no token needed):** set the worker var
`GOOGLE_SHEET_WEBHOOK_URL` to a Google Apps Script _web app_ URL and the worker
pushes every new registration there the moment it is created (detached,
best-effort — it never blocks or fails the registration). Deploy the script as
a web app (*Deploy → New deployment → Web app → "Anyone") with:

```js
function doPost(e) {
  const l = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET);
  sheet.appendRow([
    l.ref,
    l.createdAt,
    l.fullName,
    l.email,
    l.phone,
    l.city,
    l.programTitle,
    l.kind,
    l.feeTotal,
    l.plan,
    l.method,
    l.paymentStatus,
    l.depositAmount,
    l.stage,
    l.mode,
    l.scheduleDays,
    l.timeSlot,
    l.goal,
    l.referredBy,
    l.hasLaptop,
    l.statusUrl,
  ]);
  return ContentService.createTextOutput("ok");
}
```

Use the polling script above instead when you want the same sheet populated
from an existing token — both write the same columns.

---

## 5. WhatsApp scripts (free — WhatsApp Business app)

- **T+24 h (admissions calls/messages):**
  "Good day {first name}, this is Ellis at Cyber Elias Academy. We received your
  registration for {course} (ref {ref}). Classes run {days}, {time slot}.
  Your seat is held for 14 days — the {deposit} deposit confirms it.
  Shall we lock in the {start date}?"
- **T+72 h (if unpaid):**
  "{first name}, quick one — your {course} seat is still open. Easiest way in:
  {pay link}. Reply here with any question, or I can call you today."
- **T−2 days (pre-start):**
  "See you {day} at {time}! {address}. Bring: {what to bring}.
  Class notes: {link}. If you'll be late, just reply here."
- **Post-payment (auto-ish, after webhook):**
  "Payment of {amount} received for {course} — ref {ref}. Receipt is in your
  email. Welcome to CEA! 🎉"

---

## 6. Setup checklist (order matters)

1. **Deploy the code** (frontend Vercel + backend Worker) — existing recipes in
   `AGENTS.md`. Migration `0055` applies automatically with the usual
   `wrangler d1 migrations apply DB`.
2. **Paystack** (paystack.com — free account, ~15 min for a training centre):
   - set worker secret `PAYSTACK_SECRET_KEY`, frontend `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
   - dashboard → webhooks → add `…/v1/enrollments/webhook` (charge.success, charge.failed)
   - enable the **educational institution fee** (support ticket; 0.7% local card)
3. **Turnstile** (dash.cloudflare.com → Turnstile — free):
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, worker `TURNSTILE_SECRET_KEY`
4. **E-mail** (Resend free 100/day or Brevo free 300/day):
   - worker `EMAIL_PROVIDER`, `EMAIL_API_KEY`, `EMAIL_FROM` (e.g. `CEA Admissions <admissions@cea.ng>`)
5. **Google Sheets mirror** — §4 (15 min)
6. **GA4 + Clarity** snippets in the site head — 10 min
7. **Brevo journey** for the 24 h / 72 h / 7 d drip (tag `enrollment-unpaid`) — 30 min
8. **Google Meet** room + calendar template for cohorts — 10 min
9. Test the whole path once with a ₦100 test transaction (Paystack sandbox keys
   work against the same endpoints).

## 7. Measuring the funnel

All counts already in D1 — one SQL query gives the full funnel:

```sql
SELECT
  COUNT(*) AS submitted,
  SUM(payment_status != 'unpaid') AS paid_anything,
  SUM(payment_status = 'paid') AS fully_paid,
  SUM(stage IN ('offer','enrolled')) AS enrolled,
  ROUND(100.0 * SUM(payment_status != 'unpaid') / COUNT(*), 1) AS pay_rate_pct
FROM registrations;
```

Watch: step-drop-off (Clarity), pay_rate_pct by kind (short vs long),
time submitted→paid (event timestamps), and `referred_by` to see which
channel is actually bringing students.
