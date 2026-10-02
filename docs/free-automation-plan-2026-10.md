# Free-automation implementation plan — running CEA on ₦0/month

**Date:** 2 October 2026
**Scope:** how to run the academy's sales, delivery, records and compliance on free
services **on top of the platform already in production** (www.cea.ng + CEA-OS +
the `cea-api` Worker).
**Read this first if you read nothing else:** §0 (the one decision), §6 (money /
UBA bank transfer) and §11 (CAC — time-critical).

---

## 0. The one decision that shapes everything

> **CEA-OS is the system of record. Free tools are edges, not systems.**

The stack in the brief (Wave, Google Forms, HubSpot, Sheets-as-CRM, Trello) was
written for a business that has _no_ software. CEA has software: ~300 routes, a
5-step enrollment form, a payment pipeline with signed webhooks, a finance module
with invoices/expenses/payroll, an admissions pipeline, a marketing suite with a
content calendar, an LMS with 142 published sessions, certificates with public
verification, and cron jobs already running in production.

So the rule for every tool below:

| Pattern     | Meaning                                                  | Example                                                        |
| ----------- | -------------------------------------------------------- | -------------------------------------------------------------- |
| **Adopt**   | It reaches students where the app can't                  | WhatsApp Business, Google Classroom, Google Meet, Drive        |
| **Mirror**  | Same fact, second copy, read-only, for phones/offline/VA | Google Sheets mirror of registrations                          |
| **Replace** | The app already does it better                           | Wave → CEA-OS finance; HubSpot → `registrations` + `leads`     |
| **Skip**    | Free tier won't work in Nigeria or adds a second truth   | Wave (US/Canada only — see §6.7), Trello/Notion as task master |

**Corollary:** no free tool may hold a fact the platform doesn't. Every tool is
either downstream (a copy), or upstream exactly once (an event that gets
ingested). The moment a student's payment status lives in two places, you are
reconciling instead of teaching.

---

## 1. What is already built (inventory against the 12 flows)

Verified in this repo, on the branch, today:

| #   | Flow from the brief        | What already exists                                                                                                                                                                                | Gap                                                                                                  |
| --- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 1   | Visitor → lead             | `src/routes/index.tsx`, program/blog/glossary SEO (214-URL sitemap), `POST /v1/contact` → `leads` table + acknowledgement email + `CONTACT_INBOX` notification                                     | "Enroll" CTAs exist; WhatsApp button is per-page not global                                          |
| 2   | Lead → enrollment          | `src/routes/apply/` 5-step form (course → schedule → payment → about you → review), Cloudflare Turnstile, rate limits, `POST /v1/enrollments`                                                      | Register form is the superset of the Google Form idea                                                |
| 3   | Payment                    | `POST /v1/enrollments/:ref/payments` (Paystack hosted checkout), HMAC webhook `POST /v1/enrollments/webhook`, `verify` + 15-min `reconcile-payments` cron, amount-mismatch flagging, receipt email | **Bank transfer has no account details and no confirmation path** — see §6                           |
| 4   | Onboarding                 | `stage` pipeline (`submitted → screening → assessment → interview → offer → enrolled`), events timeline, magic-link student portal                                                                 | Welcome pack is email-only; no Classroom/Meet/cohort data                                            |
| 5   | Delivery                   | LMS: courses, lessons, assignments, assessments, attendance; **142 sessions of notes published free on the site**; `RealtimeRoom` Durable Object for live rooms                                    | No cohort records, no Meet/Classroom join codes, client-side hardcoded ICS                           |
| 6   | Assessment & certification | `POST /v1/certificates`, public `GET /v1/certificates/verify`, `/certificates/verify` page                                                                                                         | No printable/PDF certificate page, no bulk issue at cohort completion                                |
| 7   | Alumni & referral          | Community engine, alumni dashboards, `referred_by` collected on the form                                                                                                                           | No referral credit tracking, no post-completion review/testimonial ask                               |
| 8   | Corporate / B2B            | Services engine, client workspace, proposals                                                                                                                                                       | No public corporate-training page or "Request proposal" form (Calendly free covers the booking half) |
| 9   | Finance & records          | `finance` routes (invoices, expenses, payment batches, payroll), accountant workspace (10 pages), `job_runs` audit                                                                                 | No expense **create** endpoint, no monthly P&L export, no bank reconciliation view                   |
| 10  | Marketing content          | Marketing suite (campaigns, content calendar, social, email, leads, SEO, landing pages), blog + glossary + career guides feeding SEO                                                               | No bulk content-pack export for scheduling; Brevo not connected                                      |
| 11  | Support                    | FAQ page with schema, contact form, `messages` module, realtime chat, WhatsApp deep links in the funnel                                                                                            | Quick-reply library + labels map not written down                                                    |
| 12  | Admin & compliance         | `government` workspace (filings, calendar, documents, audits), `data_requests`, NDPR erasure support                                                                                               | **`govt_filings` is demo seed data** — it shows a fabricated "Annual returns 2025 · Filed" — see §11 |

There is also `docs/enrollment-automation.md` (the funnel playbook: Sheets mirror
script, nurture drip, WhatsApp scripts, Paystack setup). This plan **extends** it
rather than replacing it.

---

## 2. Architecture: the three ways a free tool plugs in

```
                    ┌──────────────────────── CEA-OS (worker + D1 + R2) ────────────────────────┐
   student ─────▶  │  /apply form ─▶ registrations ─▶ payments ─▶ stage ─▶ LMS ─▶ certificates     │
                    │        │              │            │          │            │                │
   (1) PUSH OUT     │        └──▶ GOOGLE_SHEET_WEBHOOK_URL ──▶ Apps Script → Sheets / Brevo / WhatsApp alert
   (2) PULL IN      │  POST /v1/system/jobs/:job/run  ◀── free external scheduler (GH Actions / Apps Script)
                    │  POST /v1/inbound/email (HMAC)  ◀── webmail forwarder → Gmail → Apps Script
   (3) LINK OUT     │  wa.me/<ref> deep links · Meet links · Classroom codes · Calendly · certificate verify URL
                    └──────────────────────────────────────────────────────────────────────────────┘
```

- **(1) Push out** — already built for Sheets (`GOOGLE_SHEET_WEBHOOK_URL`, fired
  detached on every new registration, never blocks the request). Reuse this same
  shape for Brevo and WhatsApp alerts.
- **(2) Pull in** — the Worker already exposes a job runner
  (`backend/src/routes/system.ts` → `POST /v1/system/jobs/:job/run`, plus
  `GET /v1/system/jobs` for history). **It is currently admin-session-gated**, so
  an external scheduler would need a browser session. Small fix: accept a
  `X-Cron-Secret` header matching `CRON_SECRET` (the var is already declared in
  `backend/src/types.ts` but never checked) alongside the admin check. Then
  **GitHub Actions** (`schedule:` — the repo already runs CI there, free) or an
  Apps Script trigger can fire any job on any timetable, with logs and retries
  Cloudflare cron doesn't give you.
- **(3) Link out** — zero cost, zero integration, and the most reliable: the
  student opens WhatsApp/Meet/Classroom themselves.

### 2.1 The cron budget constraint (important, and currently at the limit)

`backend/wrangler.jsonc` declares **three** cron triggers:

| Schedule       | Jobs                                         |
| -------------- | -------------------------------------------- |
| `*/15 * * * *` | `reconcile-payments`, `assignment-reminders` |
| `0 * * * *`    | `enrollment-reminders`                       |
| `0 2 * * *`    | `cleanup`                                    |

Cloudflare caps cron triggers **per Worker** (~3 on the free plan, 5 on paid), so
you cannot just "add another cron" for every new automation. Two free ways out,
both already supported by the code:

1. **Multiplex** — `CRON_SCHEDULE` in `backend/src/jobs/scheduled.ts` is a map of
   _one expression → many jobs_. Adding a job to an existing tick costs nothing.
2. **External tick** — add jobs to the `JOBS` registry and call
   `POST /v1/system/jobs/<job>/run` from GitHub Actions (`schedule:`) with
   `CRON_SECRET`. Free, gives you logs and retries that Cloudflare cron doesn't.

**Subrequest budget:** the free plan allows ~50 outbound fetches per invocation.
The existing jobs use `LIMIT 50` and each reminder can cost 2–3 subrequests
(email + SMS + provider). Keep per-run batch sizes at or below current values —
do not raise the `LIMIT`s when adding jobs to the same tick.

---

## 3. Tool-by-tool verdict

| Proposed                  | Verdict                 | What to actually do                                                                                                                                                                                                                                                                |
| ------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Wave** (accounting)     | **Replace**             | Wave has been US/Canada-only for payments and payroll since 2020 and its free tier is narrowing. CEA-OS already has invoices, expenses, payment batches, payroll and reports. Use CEA-OS finance + a monthly CSV export for the accountant. Two ledgers = two truths for CAC/FIRS. |
| **OPay merchant**         | **Adopt (later)**       | Not ready — don't block on it. Model it as _a second bank account_, which the bank-transfer path (§6) already supports.                                                                                                                                                            |
| **Paystack**              | **Adopt (built)**       | Already wired: checkout, signed webhook, verify, reconciliation cron, receipts. Just confirm the keys + webhook URL are set (§13 Phase 0).                                                                                                                                         |
| **Google Forms → Sheets** | **Mirror**              | The 5-step form is a strict superset. Keep a **Sheets mirror** (already built) for phone/offline/VA access.                                                                                                                                                                        |
| **HubSpot free CRM**      | **Skip**                | `registrations` + `leads` + `registration_events` _is_ the CRM, with payment state attached — something HubSpot free would not have.                                                                                                                                               |
| **WhatsApp Business**     | **Adopt**               | The single highest-value free action this week. Business profile, catalogue, 11 quick replies (Appendix A), labels mapped to app stages. The app already generates `wa.me` deep links with the ref prefilled.                                                                      |
| **Google Classroom**      | **Adopt**               | Delivery layer. Needs cohort records + join codes in the app so the welcome email carries them automatically (§9).                                                                                                                                                                 |
| **Google Calendar**       | **Adopt**               | Already half-built: the funnel generates an ICS — but hardcoded to 2 Nov 2026. Replace with a server ICS endpoint driven by cohort data.                                                                                                                                           |
| **Google Meet**           | **Adopt with a rule**   | Free Meet caps group calls at 60 min; CEA sessions are 1.5–2 h. Structure every online session as **2 × 50 min + a 10-min break** (good practice anyway) and record the second block.                                                                                              |
| **Google Drive (15 GB)**  | **Adopt**               | Legal/records archive (CAC, FIRS, signed forms, receipts). R2 stays the app's storage. Folder structure in §11.4.                                                                                                                                                                  |
| **Brevo (300/day)**       | **Adopt**               | Marketing lists + nurture journeys. Transactional mail keeps its own path (Resend/Brevo) — see §7.                                                                                                                                                                                 |
| **Meta Business Suite**   | **Adopt**               | Weekly 60-min batch → schedule to FB/IG. Content pack generator (§10.1) makes the batch fast.                                                                                                                                                                                      |
| **Canva Free**            | **Adopt**               | Flyers + certificate artwork. Design the certificate template to print the **app-issued verify code and `cea.ng/certificates/verify` URL**, so the paper certificate is verifiable.                                                                                                |
| **Trello / Notion**       | **Skip as task master** | `/app/ops/tasks` and `/app/ops/automation` exist. Use Notion/Docs only if writing SOPs there is faster — but versioned SOPs in `docs/sops/` cost nothing and live with the code.                                                                                                   |

---

## 4. Workstream map

| WS  | Theme                                                                 | Urgency       | Code needed     |
| --- | --------------------------------------------------------------------- | ------------- | --------------- |
| WS1 | Bank transfer that confirms itself (UBA) + receipts + expense capture | **This week** | Yes (~1–2 days) |
| WS2 | Own your email: reply-to, provider ladder, inbound → CRM              | This week     | Yes (~1 day)    |
| WS3 | CRM discipline: stage SLAs, Sheets mirror, WhatsApp library           | Week 1        | Mostly config   |
| WS4 | Delivery: cohorts, Classroom/Meet, ICS, welcome pack                  | Week 2        | Yes (~1–2 days) |
| WS5 | Marketing: content pack, Brevo journeys, reviews/referrals            | Week 3        | Light           |
| WS6 | Compliance & records (CAC/NRS) + Drive archive                        | **Now**       | Yes (~1 day)    |
| WS7 | SOPs + the daily/weekly/monthly rhythm                                | Week 3–4      | No              |

---

## 5. Sequencing (do it in this order)

**Phase 0 — today, no code (≈3 hours of browser work)**

1. CAC portal: check the **actual** stated annual-return due date for Cyber Elias
   Academy Ltd (see §11 — the 15 Oct 2026 date needs verifying, and the answer may
   be "already past").
2. WhatsApp Business installed on the academy number; Business profile, catalogue,
   address, hours; paste the 11 quick replies (Appendix A); create the 6 labels.
3. Google Drive: create the five folders (§11.4) and move everything existing into them.
4. Google Classroom: one class per _active_ course; note the join codes.
5. Meta Business Suite: connect FB + IG pages; schedule the next 2 weeks.
6. Brevo: account + sender domain + one list (`Prospects`).
7. Turn the Sheets mirror on: set `GOOGLE_SHEET_WEBHOOK_URL` on the Worker and
   deploy the Apps Script web app from `docs/enrollment-automation.md` §4.

**Phase 1 — money (Week 1):** UBA details everywhere + bank-transfer proof +
staff confirmation + receipt numbers + expense create + monthly P&L CSV. _(§6)_

**Phase 2 — email identity (Week 1–2):** `replyTo`, `brevo` provider, optional
own-SMTP provider, DNS merge, inbound-mail → CRM. _(§7)_

**Phase 3 — delivery (Week 2–3):** cohorts table + admin CRUD, server ICS,
welcome pack with Classroom/Meet/WhatsApp links, session-note links per event. _(§9)_

**Phase 4 — compliance + growth (Week 3–4):** compliance deadlines + reminder
cron, content pack, Brevo journeys, review/referral loop. _(§10, §11)_

**Phase 5 — when money allows:** WhatsApp Cloud API (₦≈11/utility message) for
automated confirmations; Termii SMS for deadline-critical nudges only.

---

## 6. WS1 — Money: a bank transfer that closes itself

**The problem today:** the enrollment form offers `bank-transfer` as a payment
method, but **the UBA account number appears nowhere in the codebase**, and there
is no way for a student to prove payment or for you to confirm it. Bank-transfer
registrations currently fall into a manual hole — which is exactly the hole your
students will fall into while OPay is pending.

**Account (single source of truth):**

```
Account name:  Cyber Elias Academy Ltd
Bank:          United Bank for Africa (UBA)
Account no.:   1028649972
Currency:      NGN
```

### 6.1 Put the details in one place, then read them everywhere

Add a canonical config (Worker var for emails/API + one frontend module) —
never hardcode in components:

- `backend` var: `PAYMENT_BANK_TRANSFER` (JSON string, e.g.
  `{"accountName":"Cyber Elias Academy Ltd","bank":"UBA","accountNumber":"1028649972","currency":"NGN"}`)
  with a typed accessor in `backend/src/lib/` — plus a mirror constant in
  `src/data/academy/payment-details.ts` for the client.
- Surfaces to update: `src/components/enrollment/payment-step.tsx` (step 3),
  `review-step.tsx` (step 5 summary), `success-screen.tsx` (after submit),
  `src/routes/apply/status/$id.tsx` (the tracking page students bookmark),
  `receiptEmailHtml()` in `backend/src/routes/enrollments.ts`, the unpaid/balance
  reminder emails in `backend/src/jobs/scheduled.ts`, and the WhatsApp quick reply
  `/pay`.

### 6.2 Let the student prove the transfer

New public, ref-gated, rate-limited endpoint:

```
POST /v1/enrollments/:ref/payments/transfer     (multipart: proof file + amount + payer name + bank + date)
```

- Upload reuses the existing R2 upload rules (MIME allow-list, 10 MB streaming cap,
  per-user key scoping — safe because the ref is unguessable and the endpoint is
  rate-limited like the rest of the funnel).
- Writes a `registration_payments` row with `method='bank_transfer'`,
  `status='pending_review'` (extend the `status` CHECK) + a
  `registration_events` row (`payment_proof_uploaded`).
- Fires an email to `admission@cea.ng` + a `wa.me` link the student can tap to
  send the same proof on WhatsApp (belt and braces — Nigerians will do this anyway).

### 6.3 Confirmation reuses the existing payment engine

Admissions/finance opens a queue (`GET /v1/enrollments/admin?payment=pending_review`),
sees the proof image, and clicks **Confirm** → `PATCH /v1/enrollments/:ref` with
`{ payment: "confirm", reference }` → calls the **existing** `markPayment(ctx, ref,
"success")`. That already does the hard parts: sets `deposit_paid`/`paid`, logs the
event, computes the balance, and sends the receipt email. **No new payment logic.**

Reject path: `status='failed'` + reason + a re-upload link.

> **Automation-safe rule:** never auto-confirm a bank transfer on a screenshot
> alone. Auto-confirm only after a matching credit appears in the UBA statement
> (Phase 5: statement CSV import → fuzzy match on amount + customer name → propose,
> staff click once). Screenshots are forgeable; statements aren't.

### 6.4 Receipts with numbers (needed for CAC/FIRS)

- Add a `receipt_counters` table; issue `CEA-RCPT-<year>-<seq>` per successful payment.
- Include it in `receiptEmailHtml()` and add a printable
  `/apply/receipt/:ref` page (browser print → PDF = free, no PDF service).
- Every payment then has: reference (Paystack or transfer), receipt number,
  student, program, amount, plan, balance — the exact evidence set an accountant
  asks for.

### 6.5 Expense capture (the other half of the books)

`finance.ts` has `POST /invoices`, `PATCH /expenses/:id`, but **no `POST /expenses`**.
Add it (+ R2 receipt photo + spend category). Then the 5-minute daily habit:
log every outgo as it happens, photo attached. Two free ways to make it effortless:

1. The form in the accountant workspace (fast on phone).
2. Forward the receipt to `help@cea.ng` → inbound ingest (§7.4) creates a **draft**
   expense for you to confirm.

### 6.6 Monthly close (30 minutes, produces the CAC/FIRS inputs)

Add `GET /v1/finance/reports/monthly.csv?month=YYYY-MM` → income (registrations +
paid invoices), expenses by category, net, and outstanding balances. Save it to
`Drive/Finance/2026/`. That CSV, plus the receipts, is what a Nigerian accountant
needs for the annual return and the tax filing — no Wave round-trip.

### 6.7 Why not Wave (and what to use instead)

Wave is a fine free product, but it operates in **the US and Canada only** —
it stopped supporting users outside those two countries in 2020, and payroll is
US-only. For a Nigerian company that needs CAC and NRS-grade records, a
US-scoped ledger is a dead end, _and_ running it alongside CEA-OS creates a
reconciliation job you'd do every month forever.

**Use instead:** CEA-OS finance as the ledger (free, already built, includes
payroll and reports) + the monthly CSV + the Drive archive. If you want a
double-entry second opinion, your accountant can import that CSV into whatever
tool they already use — that's their problem, not your data-entry problem.

---

## 7. WS2 — Email: own the domain, keep it free ("mails that may expire")

You have the right instinct. The durable asset is **the address students know and
the mailbox you own** — `50.37.90.54`-hosted `mail.cea.ng` with
`admission@` / `hello@` / `help@` / `vizier@`. Free _senders_ can change terms;
your domain can't expire on someone else's roadmap.

So the design is a **ladder**, not a single dependency:

| Layer                     | What                                                                                                  | Cost                           | Expires?                    |
| ------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------ | --------------------------- |
| **Inbound (owned)**       | Your cPanel mailboxes on `cea.ng` stay the destination for every human reply                          | ₦0 (already paid with hosting) | No                          |
| **Outbound 1**            | Resend (100/day) or Brevo (300/day) HTTP API — already supported by `backend/src/lib/email.ts`        | ₦0                             | Free tier could change      |
| **Outbound 2 (fallback)** | Your **own cPanel SMTP** via Cloudflare Workers TCP sockets                                           | ₦0                             | No — your server, your mail |
| **Address stability**     | `EMAIL_FROM` / reply-to = `admission@cea.ng` — changing sender never changes the address students see | ₦0                             | No                          |

### 7.1 Minimum change with maximum effect: `replyTo`

`sendEmail()` currently sets no `Reply-To`, so a student replying to a receipt
email replies into the void. Add `replyTo?: string` to `EmailMessage` and pass it
through in `sendResend` / `sendMailgun` / a new `sendBrevo`. Set:

```
EMAIL_FROM   = "Cyber Elias Academy <admission@cea.ng>"
EMAIL_REPLY_TO = "admission@cea.ng"
```

Now every automated email (receipts, reminders, welcome packs, certificate
delivery, password resets) invites a reply that lands in **your own webmail**.
This single change is what makes the whole system feel like a real business.

### 7.2 Add a Brevo provider + optional own-SMTP provider

- **Brevo** (`POST https://api.brevo.com/v3/smtp/email`) — 300/day free, same
  `EmailProvider` shape as `resend`/`mailgun`, so it's a ~30-line addition and a
  one-var switch (`EMAIL_PROVIDER=brevo`). Brevo doubles as the marketing engine.
- **`smtp` provider (the "never expires" option)** — Cloudflare Workers support TCP
  via `cloudflare:sockets`, so a minimal SMTP client
  (`connect → STARTTLS (port 587) → AUTH LOGIN → MAIL FROM/RCPT TO/DATA`) against
  `mail.cea.ng` is feasible with no third-party service. Ship it **behind a flag**
  and test it manually before trusting it; cPanel hosts impose hourly send caps
  (typically a few hundred/hour — fine at CEA's volume). If it passes, you have a
  sending path that no free-tier policy change can take away.
- Keep `console` for local dev; the ladder means a provider outage is a one-var fix.

### 7.3 DNS: merge, never duplicate

Your zone is already correct for your own mail (MX `cea.ng`, DKIM `smarthost`,
DMARC `p=quarantine`, autodiscover/autoconfig). To add a sending provider safely:

- **One SPF record only.** Edit the existing one — never add a second:
  `v=spf1 +a +mx include:_spf.truehostcloud.com include:spf.brevo.com ~all`
  (or Resend's include instead of Brevo's).
- Add the provider's **DKIM** records (CNAME/TXT) as published by that provider.
- Leave DMARC at `p=quarantine`; add your own address to `rua=` so the reports
  come to you as well as truehost.
- Do not touch MX — receiving must keep going to `cea.ng` (TrueHost).
- Verify with a `dig`-style lookup or mail-tester before switching `EMAIL_FROM`.

### 7.4 Inbound mail → CRM (free)

Every enquiry currently sits in a mailbox. Bring it into the pipeline without
paying for an inbox API:

1. In cPanel, create a **forwarder** on each of the four mailboxes → one Gmail
   (or a dedicated Google account).
2. A Google **Apps Script** with a time-driven trigger reads labelled mail and
   POSTs it to a new endpoint:
   `POST /v1/inbound/email` — HMAC-signed with `INBOUND_EMAIL_SECRET` (same
   verify shape as the Paystack/webhook code in `backend/src/lib/webhooks.ts`),
   rate-limited, and writes a `leads` row (name/email/subject/snippet) plus an
   optional `messages` entry and a notification.
3. Now `/app/marketing/leads` and the daily worklist see WhatsApp-era enquiries
   alongside form leads.

Keep the mailboxes as the human reply channel; the app becomes the system of
record for the _fact_ that an enquiry arrived and its status.

---

## 8. WS3 — CRM & enrollment discipline

1. **Make the pipeline the worklist.** Add `next_action` + `next_action_at` +
   `owner` to `registrations` (a stage without a next action is how leads die).
   The daily 15 minutes becomes: open `/app/admissions/registrations`, sort by
   next action, work the list.
2. **Stage SLA nudges.** A weekly job digest: anything in `submitted` > 24 h with
   no contact, or `deposit_paid` with a balance > 30 days, gets flagged to
   admissions. (Add to the existing `0 * * * *` tick — no new cron slot.)
3. **Sheets mirror ON.** It's already built (worker var + Apps Script web app).
   Use it for: WhatsApp from your phone, offline, and eventually a VA. Read-only —
   never edit status in the Sheet and expect it to flow back.
4. **WhatsApp labels = app stages.** `New Lead → Paid → Student → Completed →
Alumni → Corporate`. Quick replies in Appendix A. The app already deep-links
   `wa.me/<academy number>` with the student's ref prefilled on the success and
   status pages — keep using that link (a student who messages first opens the
   free 72-hour conversation window if you later move to the Cloud API).
5. **Corporate/B2B is a separate pipeline.** Public page + "Request a proposal"
   form → `leads` with `kind=corporate` → discovery call booked through a free
   Calendly link → proposal template (Google Docs/Canva) → follow-up at day 3/7/14.
   Don't mix corporate deals into the student funnel.

---

## 9. WS4 — Delivery & scheduling (so teaching doesn't stop the business)

### 9.1 Cohorts become real records

New table `cohorts`: `id, program_slug, label, start_date, end_date, days_pattern
(standard|mwf|tss), time_slot, mode, capacity, classroom_code, meet_link,
whatsapp_group_link, instructor_id, status (planned|running|completed)`, plus
`registrations.cohort_id`. Admin CRUD on the admissions/courses side.

This one table unlocks: correct ICS dates, welcome packs with the join code,
attendance rosters, capacity warnings, and cohort-completion automation
(certificates + reviews + referral ask).

### 9.2 A real calendar endpoint (fix the hardcoded ICS)

`src/components/enrollment/success-screen.tsx` builds a data-URI ICS **hardcoded
to 2 Nov 2026** — wrong for every short course and for the Feb 2027 cohort. Replace
with:

```
GET /v1/enrollments/:ref/calendar.ics      → cohort dates (or rolling intake rules)
GET /v1/cohorts/:id/calendar.ics           → one subscription URL per batch
```

Each event carries: day/time (WAT), room or Meet link, the **exact session-note
URL** from the published curriculum, and "what to bring". Students add one URL to
Google Calendar and self-serve.

### 9.3 Redundancy is the point

Record short lessons (OBS/phone) → upload unlisted to YouTube or Drive → link them
on the lesson row. Then a missed session or a repeated question costs a link, not a
lecture. The site already publishes 142 sessions of notes — those are your free
"course materials" layer; the recordings are the paid layer.

### 9.4 Online delivery rules (free-tier shaped)

- Google Meet free: group calls cap at 60 min → **2 × 50 min with a break**,
  recorded where useful.
- One Classroom per course/batch; the join code ships in the welcome email
  automatically from `cohorts.classroom_code`.
- Per-batch WhatsApp group (free) = first-line support, with the app's realtime
  chat as the archived channel.

---

## 10. WS5 — Marketing on autopilot

### 10.1 Content pack generator (free, no infra)

The marketing suite already holds the content calendar, and the site already holds
a large body of blog/glossary/career-guide content. Add
`scripts/generate-content-pack.mjs` (runs with the existing prebuild scripts) that
emits `content-pack/<month>.csv|md`: date, channel, caption, asset name, link,
hashtags — built from the content calendar + repurposed blog posts. Then the
weekly 60-minute batch is: open Meta Business Suite, paste, schedule two weeks.

### 10.2 Brevo journeys

- Two lists: `Prospects` (unpaid / newsletter) and `Students` (paid — announcements only).
- Bridge: the **same Apps Script** that mirrors the Sheet pushes new rows into the
  right Brevo list (no worker changes, free). A worker-side `sync-brevo` job is the
  tidier alternative once volume grows.
- Journeys: `enrollment-unpaid` (T+24h, T+72h, T+7d), `student-welcome`,
  `post-completion` (review ask + referral + next-level course offer).
- **Never** drip a lead who has paid: the app knows `payment_status`; the Sheet
  bridge is what keeps Brevo honest. Tag on status, not on time alone.

### 10.3 The cheapest sale is a past student

At `stage=completed`: issue the certificate (app), ask for a review + testimonial,
post the certificate (with permission) as content, and offer the next-level course
with a referral credit (`referred_by` already exists; add a credit ledger).
Automate the _ask_; keep the conversation human.

---

## 11. WS6 — Compliance & records (do this today)

### 11.1 The urgent item, stated honestly

Your brief says the CAC annual return for accounts made up to **15/10/2025** is due
**15/10/2026**. That may be optimistic, and it's worth checking the portal before
anything else this week:

- Under CAMA 2020, a company files its annual return **within 42 days after its
  AGM**, and the AGM must be held **within 6 months of the financial year-end**.
- For a financial year ending **15 Oct 2025**, that implies the AGM by **15 Apr
  2026** and the return by roughly **27 May 2026** — i.e. potentially already past,
  not two weeks away.
- For the tax return, the general rule for companies is **6 months after the
  financial year-end** (≈15 Apr 2026).
- Companies with a 31 December year-end file by 30 June; yours is non-standard, so
  the CAC portal's stated due date for _this_ company is the authority.

**Action this week:** log into the CAC post-incorporation portal and the NRS
(formerly FIRS) TaxPro portal, screenshot the stated due dates, and put them in the
system (§11.2). If anything is already past, engage the accountant now — penalties
accrue and CAC can strike a company off the register for prolonged non-filing.

### 11.2 Replace the fabricated filings with tracked deadlines — _seed data fixed 2 Oct 2026_

`/app/government/filings` used to render seed rows like _"Annual returns 2025 ·
Filed Apr 02 · ref FED-2026-0089"_. That was demo data. A **false "Filed"** on a
compliance screen is more dangerous than an empty one.

**Done in this pass:** the fabricated rows are gone from `seeds/government-data.sql`
and its mirror (now: real RC/TIN/branch facts + neutral regulatory watch-items;
filings, audits, reports, threads, checks and certifications deliberately empty),
the invented claims were stripped from all eleven `/app/government/*` pages and the
mock registry, a cleanup script purges what earlier seeds already wrote to D1
(`seeds/compliance-fabricated-remove.sql`), and `backend/test/tier3-government.test.ts`
now fails if any of nine fabricated strings reappear. Run the cleanup against
production once:

```sh
cd backend && npx wrangler d1 execute DB --remote --file seeds/compliance-fabricated-remove.sql
```

The _real_ deadlines still need to exist — that is the `compliance_deadlines`
table below.

Build `compliance_deadlines`:
`id, obligation, authority (CAC|NRS|NDPC|State PAYE|Pension|SCUML), period,
due_at, owner, status (upcoming|in_progress|filed|overdue), evidence_key,
reminded_windows, sort_order`

- Cron job `compliance-reminders` (add it to the `0 2 * * *` tick or fire it from
  Actions): emails + SMS at **30 / 14 / 7 / 3 / 1 / 0 days** and on overdue, to the
  director and `admission@cea.ng`.
- Wire `/app/government/filings` and `/app/government/calendar` to it; seed the
  real obligations: CAC annual return, NRS annual return + TIN record, NDPA/NDPC
  registration if applicable, state PAYE remittance, pension (if staff), SCUML
  (if applicable).
- Evidence: attach the filing receipt to R2 and reference it from the row, then
  mirror to Drive (below).

### 11.3 FIRS/NRS records

The monthly P&L CSV (§6.6) + receipts + invoices + expense receipts, filed monthly
in Drive, gives an accountant everything for the annual return and tax filing —
and gives you clean books for any future funding, grant or corporate client that
asks.

### 11.4 Drive archive (free 15 GB, the "scan and file everything" folder set)

```
/CEA
  /01-CAC-and-Legal      incorporation, annual returns + receipts, TIN, NDPA, contracts
  /02-Finance            /2026/<month>/ P&L CSV, expense receipts, bank statements, invoices
  /03-Students           /<cohort>/ roster, signed forms, certificates issued
  /04-Courses            curriculum source, slides, recordings index, certificates template
  /05-Marketing          brand assets, flyers, photos, scheduled content pack, testimonials
  /06-People             staff/VA contracts, NDA, onboarding
```

Rule: if a document isn't in Drive and referenced from the app, it doesn't exist.

---

## 12. WS7 — SOPs and the operating rhythm

Versioned SOPs in `docs/sops/` (free, reviewable, and they live next to the code
that enforces them):

`sop-01-lead-handling` · `sop-02-payment-confirmation` (Paystack + transfer) ·
`sop-03-onboarding` · `sop-04-class-delivery` · `sop-05-certification` ·
`sop-06-marketing-batch` · `sop-07-finance-close` · `sop-08-compliance` ·
`sop-09-refunds-transfer` · `sop-10-va-handover`

Each SOP ends with: _which step is now automated, and what to check instead_.

**The rhythm (this is the whole point — ≈15 min/day):**

| Cadence   | Time   | What                                                                                                                                               |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Daily     | 15 min | Admissions worklist (next actions) · confirm bank transfers · check `/app/admin/operations` for failed jobs · answer WhatsApp                      |
| Weekly    | 60 min | Reconciliation (Paystack settlements + UBA statement vs the app) · 2-week content batch · follow-ups at day 3/7/14 · class admin                   |
| Monthly   | 90 min | P&L CSV + expense sweep → Drive · compliance deadline review · cohort completion (certificates/reviews/referrals) · test one automation end-to-end |
| Quarterly | 2 h    | Free-tier limits & provider health · SOP review · what to automate next                                                                            |

---

## 13. Implementation backlog (file-level, in build order)

| #            | Change                                                                                                                                                                                                     | Files                                                                                                                                                                                                                              |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1            | Bank-transfer config (typed accessor + var + frontend module)                                                                                                                                              | `backend/src/lib/*`, `backend/src/types.ts`, `src/data/academy/payment-details.ts`, `backend/wrangler.jsonc`                                                                                                                       |
| 2            | Surface account details at every pay point                                                                                                                                                                 | `src/components/enrollment/{payment-step,review-step,success-screen}.tsx`, `src/routes/apply/status/$id.tsx`, `receiptEmailHtml()` and reminder templates in `backend/src/routes/enrollments.ts` + `backend/src/jobs/scheduled.ts` |
| 3            | Migration `0059`: `registration_payments.method/proof_key/payer_name/reviewed_by`, `status` CHECK extension, `receipt_counters`, `cohorts`, `compliance_deadlines`, `registrations.cohort_id/next_action*` | `backend/migrations/0059_*.sql` (schema-only)                                                                                                                                                                                      |
| 4            | Proof upload + confirm/reject endpoints + receipt numbering + printable receipt                                                                                                                            | `backend/src/routes/enrollments.ts`, `src/routes/apply/receipt.$ref.tsx`                                                                                                                                                           |
| 5            | `POST /v1/expenses` + receipt photo                                                                                                                                                                        | `backend/src/routes/finance.ts`                                                                                                                                                                                                    |
| 6            | Monthly P&L CSV                                                                                                                                                                                            | `backend/src/routes/finance.ts`                                                                                                                                                                                                    |
| 7            | Email: `replyTo`, `brevo` provider, optional `smtp` provider                                                                                                                                               | `backend/src/lib/email.ts`, `backend/src/types.ts`                                                                                                                                                                                 |
| 8            | Inbound email ingest (HMAC + rate limit → `leads`)                                                                                                                                                         | `backend/src/routes/` new module, `backend/src/lib/rbac.ts` (public, signed)                                                                                                                                                       |
| 9            | Cohort CRUD + `/v1/cohorts` + ICS endpoints                                                                                                                                                                | `backend/src/routes/`, `src/routes/app/admissions/*`                                                                                                                                                                               |
| 10           | Compliance deadlines API + `compliance-reminders` job + real filings UI                                                                                                                                    | `backend/src/routes/`, `backend/src/jobs/scheduled.ts` + `CRON_SCHEDULE`, `src/routes/app/government/{filings,calendar}.tsx`, `src/lib/api/government.ts`, `src/lib/query/government.ts`                                           |
| 10b          | `CRON_SECRET` header on the job runner (so an external free scheduler can fire jobs)                                                                                                                       | `backend/src/routes/system.ts`, `backend/src/lib/rbac.ts`                                                                                                                                                                          |
| 11           | Content pack generator                                                                                                                                                                                     | `scripts/generate-content-pack.mjs`, `package.json` (prebuild)                                                                                                                                                                     |
| 12           | SOPs + rhythm docs                                                                                                                                                                                         | `docs/sops/*.md`                                                                                                                                                                                                                   |
| Every route  | Register in RBAC or it 403s                                                                                                                                                                                | `backend/src/lib/rbac.ts`                                                                                                                                                                                                          |
| Every change | Tests + typecheck + build                                                                                                                                                                                  | `backend/test/*`, `npx tsc --noEmit`, `npm run build`                                                                                                                                                                              |

**Seed updates:** `backend/seeds/government-data.sql` must stop presenting demo
filings as filed — either clearly labelled demo rows or replaced by the real
deadline seeds. Seeds are generated from `src/data/*` for some suites; keep both
layers in sync per `AGENTS.md`.

---

## 13a. Build ledger — shipped 2 October 2026

Everything below is **built, migrated and tested**; "Deploy" is the only step that
needs the operator (see §13b). Migrations `0061`–`0065`.

| #   | Item                                                                              | What shipped                                                                                                                                                                                                       | Where                                                                                  |
| --- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| 1   | Compliance deadline tracker (30/14/7/3/1/0-day reminders)                         | `compliance_deadlines` + `compliance_reminder_log`; CRUD with `daysUntil` and reminder buckets; annual rows roll forward a year when marked done; `compliance-reminders` job rides the existing `0 2 * * *` tick        | `backend/migrations/0061_*.sql`, `backend/src/routes/compliance.ts`, `backend/src/jobs/scheduled.ts`, `src/routes/app/deadlines.tsx` |
| 2   | School partnerships (`/schools`) + proposal generator with accept-in-place        | `schools`, `school_inquiries`, `school_proposals`; fee tiers ₦20k/17.5k/15k per student/term (min 20), ref `CEA-SCH-XXXXXX`, rate-limited public enquiry (5/h), public printable proposal that can be accepted online | `backend/migrations/0064_*.sql`, `backend/src/routes/schools.ts`, `src/routes/schools/{index,proposal.$ref}.tsx`, `src/routes/app/schools.tsx` |
| 3   | Assistant feedback loop (question log + weekly unanswered digest)                 | Every question logged with fallback flag + page; admin digest (7/30/90 days) with totals, repeats, unanswered list                                                                                                 | `backend/migrations/0065_*.sql`, `backend/src/routes/assistant.ts`, `src/routes/app/assistant-insights.tsx` |
| 4   | Public `/pay` page                                                                | "How to pay" + reference lookup that resolves a registration and shows its review state                                                                                                                            | `src/routes/pay.tsx`                                                                   |
| 5   | Sequential receipts + printable receipt                                           | `CEA-RCPT-<year>-<seq>` counters, receipt fields on `registration_payments`, public `GET /v1/enrollments/:ref/receipt`, print-ready page                                                                             | `backend/migrations/0062_*.sql`, `backend/src/routes/enrollments.ts`, `src/routes/apply/receipt.$ref.tsx` |
| 6   | Expenses ledger + monthly P&L CSV                                                 | `POST /v1/expenses`, `GET /v1/pnl.csv?month=YYYY-MM`, one-line entry form, month picker + download on Reports                                                                                                      | `backend/migrations/0062_*.sql`, `backend/src/routes/finance.ts`, `src/components/finance/expense-form.tsx`, `src/routes/app/accountant/{expenses,reports}.tsx` |
| 7   | Cohorts replace hardcoded intake dates                                            | `cohorts` + `registrations.cohort_id`; public list/next/ICS (WAT = UTC+1), admin CRUD seeded with the 2 Nov 2026 and 16 Feb 2027 web-dev intakes plus the IT diploma and rolling short-course intakes                   | `backend/migrations/0063_*.sql`, `backend/src/routes/cohorts.ts`, `backend/seeds/cohorts-data.sql`, `src/routes/app/admissions/cohorts.tsx` |
| 8   | Optional Turnstile on the chatbot                                                 | Human check on the *first* message of a conversation only, enforced **only** when `TURNSTILE_SECRET_KEY` is bound — costs nothing and stays off until keys exist                                                    | `backend/src/routes/assistant.ts`, `src/components/assistant/chat-widget.tsx`, `src/components/turnstile.tsx` |
| 9   | Housekeeping                                                                      | Stale e2e demo password corrected to the shipped seed; `/schools` in the header; Pay fees + Schools & partners in the footer; the new admin pages in the sidebar                                                      | `e2e/{helpers.ts,authz.spec.ts}`, `src/components/marketing/{site-header,site-footer}.tsx`, `src/components/app/app-shell.tsx` |

**Verification:** `backend/test/operations.test.ts` 15/15, `backend/test/assistant.test.ts` 13/13,
`backend/test/enrollments.test.ts` 22/22; backend `npm run typecheck`, root `npx tsc --noEmit`.

**Still open by design** (not defects):

- Tier-B prices in `docs/port-harcourt-competitor-pricing.md` are **not** wired into the catalogue
  or the assistant knowledge until you confirm them — say the word and I regenerate
  (`npm run gen:knowledge` in `backend/`).
- The CAC annual-return date is **not** guessed in code: the deadline row has to be entered from
  the portal. The reminders then do the counting.

## 13b. Deploying this batch (operator, ~15 minutes)

```
cd backend
npx wrangler login                                  # once per machine
npx wrangler secret put AI_API_KEY                  # NVIDIA key (rotated)
npx wrangler d1 migrations apply DB --remote        # 0061–0065
npm run db:compliance:remove-fabricated:remote      # delete the mock filings
cd ..
npm run deploy                                      # frontend to Vercel
```

Optional after that: `npm run db:seed:demo:remote` (role logins, password `Cea-Demo-2026!`)
and `npm run db:seed:cohorts:remote`.

---

## 14. Free-tier limits & risks (know the ceilings)

| Service                             | Free limit                                                                                     | Risk / mitigation                                                                               |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Cloudflare Workers                  | 100k req/day · **~3 cron triggers** · ~50 subrequests/invocation · 10 ms CPU/invocation (free) | Multiplex jobs into existing ticks; fire extras from GitHub Actions; don't raise batch `LIMIT`s |
| Cloudflare D1                       | 5 GB · 5M rows read/day · 100k rows written/day                                                | Fine for years at CEA volume; `cleanup` job already prunes ledgers                              |
| Cloudflare R2                       | 10 GB · no egress fees                                                                         | Proof images + scans fit easily                                                                 |
| Resend                              | 100 emails/day                                                                                 | Overflow risk on announcement days → Brevo is the second ladder rung                            |
| Brevo                               | 300 emails/day                                                                                 | Marketing only; transactional elsewhere                                                         |
| Google Meet                         | **60 min group cap**                                                                           | 2 × 50 min session structure                                                                    |
| Google Drive                        | 15 GB shared                                                                                   | Recordings go to YouTube unlisted, not Drive                                                    |
| Google Classroom / Calendar / Forms | Free                                                                                           | —                                                                                               |
| Meta Business Suite                 | Free scheduling                                                                                | API posting is not free-tier friendly; batch scheduling stays manual (60 min/week)              |
| Paystack                            | Per-transaction fee (educational rate on request)                                              | Keep bank transfer free of that fee                                                             |
| WhatsApp Cloud API                  | ≈₦11 per utility message                                                                       | Only adopt when volume justifies; Business app + click-to-chat is free                          |

---

## 15. What NOT to automate

- **Bank-transfer auto-confirmation from a screenshot.** Statements or nothing.
- **Refund/dispute replies.** Automate the _acknowledgement_, keep a human on the
  decision — refund policy is already published at `/refunds`.
- **Two ledgers.** One source of financial truth (CEA-OS finance).
- **Drip sequences that ignore payment state.** Paid students get the welcome
  journey, never the "still unpaid?" nudge.
- **WhatsApp API blasts** before volume pays for them.
- **Anything you can't see failing.** Every job writes to `job_runs`, and
  `/app/admin/operations` is the dashboard — if a job isn't logged, it isn't
  automated, it's just hoped for.

---

## 15b. What shipped in this pass (2 Oct 2026)

| Deliverable                                                                                                                                                                                         | Where                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| This plan                                                                                                                                                                                           | `docs/free-automation-plan-2026-10.md`                                                                                                                                                          |
| **Working logins for all 30 roles** (verified against the real `verifyPassword`)                                                                                                                    | `docs/demo-logins.md` · `backend/scripts/gen-demo-users.mjs` · `backend/seeds/demo-users.sql`                                                                                                   |
| **Email & DNS audit** with exact record changes (stray MX, SPF `+mx`, missing `mail.cea.ng`, proxied cPanel hosts, DMARC)                                                                           | `docs/email-dns-audit.md`                                                                                                                                                                       |
| **Schools & proposals programme** — data model, flow, proposal generator, Digital Skills Passport, capacity maths                                                                                   | `docs/schools-partnership-programme-plan.md`                                                                                                                                                    |
| **Canonical school proposal template** (front matter drives the generator)                                                                                                                          | `docs/proposals/schools-digital-skills.md`                                                                                                                                                      |
| **Reconciliation of your automation package** with the live platform (fees, address, emails, Wave, OPay, Apps Scripts) + corrected WhatsApp quick replies                                           | `docs/automation-package-reconciliation.md`                                                                                                                                                     |
| Compliance seed data made factual; fabricated filings/audits/certifications removed from seeds, mocks and eleven UI pages; cleanup script for production; regression tests                          | `backend/seeds/government-data.sql` · `backend/seeds/compliance-fabricated-remove.sql` · `src/lib/api/mocks/index.ts` · `src/routes/app/government/*` · `backend/test/tier3-government.test.ts` |
| **Public site assistant (free-tier chatbot)** — grounded on generated course facts; per-IP + global daily budget; kill-switch flag; widget on every marketing page; 12 tests                        | `docs/site-assistant.md` · `backend/src/routes/assistant.ts` · `backend/src/lib/assistant.ts` · `src/components/assistant/chat-widget.tsx`                                                      |
| **Bank-transfer proof flow** — students report a UBA transfer from the success/status pages; finance reviews a queue; confirmation runs through `markPayment()` (receipt + status), never automatic | `backend/migrations/0060_payment_proofs.sql` · `backend/src/routes/enrollments.ts` · `src/components/enrollment/success-screen.tsx` · `backend/test/enrollments.test.ts`                        |
| **Port Harcourt competitor pricing study** — 20+ published prices from PH providers, two-tier recommendation (crash vs full package) with per-course fees                                           | `docs/port-harcourt-competitor-pricing.md`                                                                                                                                                      |
| **Reply-To wired for transactional mail** (`EMAIL_REPLY_TO=help@cea.ng`, per-message override; Mailgun/Resend/SES paths)                                                                            | `backend/src/lib/email.ts` · `backend/wrangler.jsonc` · `backend/src/types.ts`                                                                                                                  |
| Address canonicalised to **24/26 Ebony Road** across the site, seeds, emails and docs; public contact email standardised on **help@cea.ng**                                                         | `src/data/site.ts` · `src/routes/*` · `backend/src/**`                                                                                                                                          |

Verification run: frontend `tsc --noEmit` clean · backend typecheck clean ·
backend **70 files / 795 tests** passing (assistant suite 12/12; enrolment suite
22/22 including the six bank-transfer cases) · 30/30 demo password hashes
accepted by the app's own verifier · the demo seed proved idempotent and unable
to overwrite a real account.

---

## 16. Decisions needed from you

1. **CAC/NRS:** what do the portals actually say the due date is? (Send a
   screenshot and I'll encode it as the first real deadline row in
   `/app/deadlines` — the reminders count down from it.)
2. **Email:** do you want the own-SMTP path as well as the Brevo provider, or
   `replyTo` + Brevo for now?
3. **Tier-B fees:** confirm the full-package table in
   `docs/port-harcourt-competitor-pricing.md` (Web Design ₦120k · Web Dev ₦150k ·
   Digital Marketing ₦140k · Graphic Design ₦100k · Data Analytics ₦180k ·
   Cybersecurity ₦200k · Mobile ₦180k · AI Productivity ₦250k · UI/UX ₦120k ·
   Cloud & DevOps ₦300k). Once confirmed they go into the catalogue and the
   assistant's facts, and the crash/theory tier stays where it is.

_(Resolved since the last pass: sequencing — everything shipped; `/corporate-training`
and `/pay` — `/pay` shipped, school enquiries now live at `/schools`.)_

---

## Appendix A — WhatsApp Business quick replies (paste into the app)

| Shortcut   | Message                                                                                                                                                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/greet`   | Good day 👋 Welcome to **Cyber Elias Academy**. Tell me which course you're interested in and I'll send fees, duration and the next start date.                                                                                              |
| `/courses` | We train in: Microsoft Office, Typing & Computer Basics, Data Entry, Graphic Design, Web Design, Web Development, Digital Marketing, Social Media, Computer Repairs, Cybersecurity (+ long-form diplomas). Full list & fees: cea.ng/programs |
| `/fees`    | Fees depend on the course: short courses ₦20,000–₦60,000 (2–6 weeks, 2 days/week); long-form diplomas ₦150,000–₦320,000 (3–6 months, 3 days/week). Which course? I'll send the exact fee and payment plan.                                   |
| `/pay`     | Pay online (card/transfer/USSD): cea.ng/apply — or bank transfer to **Cyber Elias Academy Ltd · UBA · 1028649972**. After paying, send your name + the receipt here and we confirm your seat same day.                                       |
| `/confirm` | Payment received ✅ Your seat is confirmed. You'll get an email with your class schedule, materials and the classroom code. Welcome to CEA!                                                                                                  |
| `/remind`  | Reminder: your class holds {day} at {time} at 24/26 Ebony Road (or online — link in your email). Bring your laptop and notebook. Reply here if you'll be late.                                                                               |
| `/cert`    | Certificates are issued on completion of your project. Each has a code you can verify at cea.ng/certificates/verify — shareable with any employer.                                                                                           |
| `/refer`   | Refer a friend and get a discount on your next course 🎁 Just ask them to put your name in "How did you hear about us" when they register.                                                                                                   |
| `/corp`    | We run corporate training (team upskilling, on-site or online) with a custom proposal. Send your company name, team size and the skills needed — proposal within 48 hours.                                                                   |
| `/support` | Tell me what's happening and send a screenshot if you can. I'll sort it — for class material issues we usually fix it within the hour during working hours.                                                                                  |
| `/away`    | Thanks for your message 🌙 Our office hours are Mon–Sat, 8:00–20:00 WAT. I'll reply first thing. For fees and registration you can start anytime: cea.ng/apply                                                                               |

**Labels:** `New Lead` · `Paid` · `Student` · `Completed` · `Alumni` · `Corporate`

## Appendix B — Sheets mirror columns (already scripted in `docs/enrollment-automation.md`)

`ref · created · name · email · phone · city · program · kind · fee · plan ·
method · payment_status · paid · balance · stage · mode · days · slot · goal ·
referred_by · has_laptop · link · next_action · next_action_at`

## Appendix C — Onboarding checklist (per paid student)

1. Welcome email (auto, on `stage=enrolled`): schedule, what to bring, notes links,
   Classroom code, Meet link, WhatsApp group link, certificate promise. _(§9)_
2. Add to the batch WhatsApp group.
3. Add to the cohort roster (attendance + certificates depend on it).
4. Calendar invite (ICS or Google Calendar).
5. Mark `onboarded` — the app's event timeline becomes the audit trail.

## Appendix D — Sources

- CAMA 2020 annual-return timing (42 days after AGM; AGM within 6 months of
  year-end): [Veraz Advocates](https://www.verazadvocates.com.ng/annual-returns-filing-with-cac-in-nigeria/),
  [EBC Consults](https://www.ebconsults.ng/cac-annual-returns-nigeria/),
  [SMARTSMS 2026 filing guide](https://smartsmssolutions.com/resources/blog/ng/ng-02-hub-cac-annual-returns)
- Wave geographic scope (US/Canada only; stopped non-US/CA support in 2020):
  [InvoiceMonk comparison](https://invoicemonk.com/en/compare/invoicemonk-vs-wave)
- Cloudflare cron-trigger caps: [runhooks](https://runhooks.app/blog/cloudflare-workers-cron-triggers-limits/)
