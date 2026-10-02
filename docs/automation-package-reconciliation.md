# Reconciling the "Complete Free Automation Package" with the live platform

Your pasted package (flowchart + WhatsApp replies + Brevo templates + Apps
Scripts + SOPs) was written for a business with **no software** and a **Google
Form as the system of record**. CEA has neither: the 5-step enrollment form,
Paystack pipeline, finance module, LMS, certificates and cron jobs are already
live.

This document does three things:

1. **Flags what in the package contradicts your own live site** — the dangerous
   part, because those contradictions would go out to students (fees, address,
   contact email). Fix these before pasting anything.
2. **Maps every flowchart node onto what already exists**, so you don't rebuild
   working software in a spreadsheet.
3. **Gives you the corrected, copy-paste versions** of the assets that are
   genuinely still needed (WhatsApp quick replies, Brevo templates, the one Apps
   Script worth keeping).

---

## 1. Contradictions to fix before this goes out (highest risk first)

### 1.1 Fees: the package quotes prices that are not on your site

| Course                 | Package says            | Live site says                                                              | Course page                        |
| ---------------------- | ----------------------- | --------------------------------------------------------------------------- | ---------------------------------- |
| Web Development        | **₦150,000** (8 weeks)  | **₦60,000** (6 weeks)                                                       | `/programs/web-development`        |
| Cybersecurity          | **₦200,000** (10 weeks) | **₦50,000** (4 weeks)                                                       | `/programs/cybersecurity`          |
| Mobile App Development | **₦180,000** (8 weeks)  | **₦60,000**                                                                 | `/programs/mobile-app-development` |
| Cloud Computing        | **₦170,000** (8 weeks)  | — not offered as a course                                                   | —                                  |
| AI / Machine Learning  | **₦250,000** (12 weeks) | **₦30,000** (AI Productivity) or **₦300,000** (Data Analytics & AI diploma) | `/programs/ai-productivity`        |
| Digital Marketing      | **₦100,000** (6 weeks)  | **₦40,000** (4 weeks)                                                       | `/programs/digital-marketing`      |
| UI/UX Design           | **₦120,000** (6 weeks)  | — not in the catalogue                                                      | —                                  |
| Data Science           | **₦180,000** (8 weeks)  | **₦50,000** (Data Analytics)                                                | `/programs/data-analytics`         |

**The canonical list** (from `src/data/academy/catalog.ts`, 22 courses):

| Course                                                                                                                                                          | Fee     | Duration  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------- |
| Typing & Computer Basics · Data Entry                                                                                                                           | ₦20,000 | 2 weeks   |
| Microsoft Office · Social Media Management · Business & Freelancing · Content Creation · Online Teaching · Digital Productivity · AI Productivity · Photography | ₦30,000 | 2–3 weeks |
| Graphic Design · Digital Marketing · Video Editing · WordPress · IT Support                                                                                     | ₦40,000 | 4 weeks   |
| Web Design · Computer Repairs · Cybersecurity · Data Analytics · Computer Networking                                                                            | ₦50,000 | 4 weeks   |
| Web Development · Mobile App Development                                                                                                                        | ₦60,000 | 6 weeks   |

**Long-form diplomas** (3 days/week, `src/data/academy/longform.ts`):
IT Professional Diploma ₦300,000 · Web Development Professional ₦320,000 ·
Data Analytics & AI ₦300,000 · Cybersecurity Foundations ₦160,000 ·
Digital Business Bootcamp ₦150,000 — with 30% deposit plans and a 10% pay-in-full
discount.

**Why this matters more than a typo:** a student who was quoted ₦200,000 for
Cybersecurity and then sees ₦50,000 on the site (or vice versa) either thinks the
site is fake or thinks you are inflating prices. Both cost the sale. Decide which
list is current — if the package's numbers are the _new_ prices, the site data,
the enrollment form's `PROGRAMS` map (`backend/src/routes/enrollments.ts`) and
the fee summary emails must change together, and I'll do that as one change.

### 1.2 Address: 24 vs 26 Ebony Road

| Source                                                                                 | Says                                     |
| -------------------------------------------------------------------------------------- | ---------------------------------------- |
| Site FAQ, contact page, long-form data, enrolment success screen, ICS invite, receipts | **26 Ebony Road**                        |
| Package `/greet` quick reply and Brevo template 1                                      | **24 Ebony Road, Rumuchita**             |
| Both school proposals                                                                  | **24 Ebony Road** (one says "Rumuchita") |

One is wrong. Confirm which, then it must be corrected in: `src/data/site.ts`,
`src/data/academy/longform.ts`, `backend/src/routes/enrollments.ts` (receipt
footer + ICS), the WhatsApp quick replies and both proposal documents.

### 1.3 Identity and contact details

| Item            | Package                                                    | Reality / recommendation                                                                                                                                                                 |
| --------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Director's name | "Graham Ellis Dennis, Director"                            | The admissions WhatsApp script in `docs/enrollment-automation.md` signs off as "Ellis"; the site says "From Zero to Expert, Together". Pick one form and I'll standardise it everywhere. |
| Support email   | `cyberelias.tk@gmail.com` (Brevo template 2)               | **Remove.** Use `help@cea.ng` (you already own it, 1 GB, unrestricted). A free Gmail address on a registered company's onboarding email reads as improvised.                             |
| Sender address  | `[YOUR PAYSTACK LINK]`, `[YOUR BANK DETAILS]` placeholders | Real values exist now: UBA **1028649972** (Cyber Elias Academy Ltd) and the in-app Paystack checkout. Never publish a template with placeholders in it — that's how they get sent.       |
| RC / TIN        | RC 8413776, TIN 1086525399                                 | **Correct** — and the site footer already shows RC 8413776. The compliance dashboard used to show a _wrong_ RC (1423784); that has now been fixed in the seeds, mocks and UI (see §6).   |
| Office hours    | Package `/away` says Mon–Fri 9–6, Sat 10–2                 | The site says **Mon–Sat 8:00–20:00**. Reconcile.                                                                                                                                         |

### 1.4 Tools that can't do the job

| Tool                                                                    | Problem                                                                                                                                                                                                                                                                                      | Use instead                                                                                                                                 |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Wave** ("free forever", SOP 6, flowchart "PAYMENT → WAVE ACCOUNTING") | Wave operates in the **US and Canada only** (it stopped supporting other countries in 2020; payroll is US-only). It cannot produce records for a Nigerian CAC/FIRS filing, and running it beside CEA-OS finance gives you two sets of books.                                                 | CEA-OS finance (`/app/accountant`) + a monthly P&L CSV + the Drive archive. See `docs/free-automation-plan-2026-10.md` §6.                  |
| **OPay merchant** as the primary rail                                   | Not ready yet (your words). The `/pay` quick reply and flowchart both assume it.                                                                                                                                                                                                             | Paystack (already live in the app) + **UBA bank transfer with proof upload** — the flow in plan §6.                                         |
| **Google Form as the enrollment route**                                 | The app's 5-step form is a strict superset: it prices the plan, enforces per-programme payment rules, runs Turnstile, writes to `registrations`, mirrors to `applications`, and fires the confirmation email. A Google Form would be a **second front door** with no payment state attached. | Keep the app form as the only front door. If you need capture at an event/offline, use the same fields in a Sheet and import rows as leads. |
| **Google Sheets as the CRM**                                            | Two-way sync doesn't exist; if the Sheet is the CRM, the app's admissions pipeline goes stale.                                                                                                                                                                                               | Sheet as a **read-only mirror** (already built: `GOOGLE_SHEET_WEBHOOK_URL`). CRM = `registrations` + `leads` in D1.                         |
| **Four separate Apps Scripts** driving email                            | The Worker already sends confirmation, payment, reminder, balance, welcome and certificate emails, with an event timeline and idempotency. Scripts 1 and 4 would _duplicate_ those emails from a second source — students would get two.                                                     | One Apps Script (the Sheets mirror) + the Worker's cron jobs. See §5.                                                                       |

### 1.5 Referral programme

The package promises **₦10,000 credit or ₦5,000 cash** per referral. The school
proposal promises nothing, and the app collects `referred_by` but has no credit
ledger. Decide the number once, then encode it (`referral_code`, `reward`,
`status` on an existing `leads`/`registrations` link) so it is tracked and
redeemable rather than remembered.

---

## 2. The flowchart, node by node

| Flowchart node                                                                               | Status                | What to do                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Traffic sources (IG/FB, Google, WhatsApp, walk-in)                                           | ✅ real               | Add UTM links per channel so `referred_by`/source attribution is honest                                                                                                                |
| **HUB: www.cea.ng** — course pages + testimonials + Pay Now + WhatsApp chat                  | ✅ real               | Pay-now exists (in-app checkout). Add the **floating WhatsApp button** with a pre-filled course-specific message, and a testimonials section fed by real, permissioned student results |
| Google Form (embedded)                                                                       | ⛔ replace            | The app's `/apply` form (see §1.4). Embed _that_ everywhere instead                                                                                                                    |
| WhatsApp chat button → business app                                                          | ✅ real               | Already deep-linked from the success/status pages with the ref prefilled                                                                                                               |
| **GOOGLE SHEETS CRM** (formulas, dropdowns, auto-WhatsApp links)                             | 🔄 mirror only        | Turn on the existing mirror; keep the formulas for offline/VA use, but never let the Sheet be the truth                                                                                |
| **GOOGLE APPS SCRIPT** (welcome email, calendar invites, daily reminders, weekly follow-ups) | ⛔ replace            | All four are already in `backend/src/jobs/scheduled.ts` + `enrollments.ts` (idempotent, logged in `job_runs`, visible at `/app/admin/operations`)                                      |
| Brevo email (welcome, payment confirmation, certificate delivery)                            | 🔄 adopt, re-scoped   | Brevo keeps **marketing to non-students**. Transactional mail stays in the Worker so it's tied to real payment events. Journeys in §4                                                  |
| **PAYSTACK / OPAY** payment page, auto-receipts                                              | ✅ real (Paystack)    | Paystack live; OPay pending → UBA transfer path (plan §6)                                                                                                                              |
| **WAVE ACCOUNTING** — "log every payment, run P&L monthly"                                   | ⛔ replace            | CEA-OS finance + monthly CSV (plan §6). Wave cannot serve a Nigerian company                                                                                                           |
| **GOOGLE CLASSROOM** materials/assignments/grades                                            | 🔄 adopt              | Needs `cohorts` records (§9 of the plan) so join codes ship automatically in the welcome email                                                                                         |
| **GOOGLE CALENDAR** recurring events + auto-reminders                                        | 🔄 adopt, fix         | The app's ICS is hardcoded to 2 Nov 2026 — replace with `GET /v1/enrollments/:ref/calendar.ics`                                                                                        |
| **GOOGLE MEET / YOUTUBE** live + recordings                                                  | 🔄 adopt with rules   | Meet free caps group calls at **60 min**; CEA sessions are 1.5–2 h → structure as 2 × 50 min with a break. Recordings unlisted on YouTube (not Drive — 15 GB won't last)               |
| Certificate (Canva → PDF, email)                                                             | ✅ partly real        | The app issues a certificate with a **verify code**; design the Canva template to print that code + `cea.ng/certificates/verify`                                                       |
| Referral programme ₦10,000 credit                                                            | ⚠️ decide             | See §1.5 — pick the number, then encode it                                                                                                                                             |
| Alumni list, next-course upsell, 10% discount                                                | ✅ real               | Alumni workspace exists; make the 10% a tracked offer, not a habit                                                                                                                     |
| Google review / testimonial capture                                                          | ✅ real (add the ask) | Add a post-completion email with the review link + a one-question form                                                                                                                 |
| **Marketing engine** (Meta Suite, Canva, GA4, Content Calendar)                              | ✅ real               | The app has the content calendar; GA4/Clarity snippets still need adding to `__root.tsx`                                                                                               |
| Daily routine (15 min)                                                                       | ✅                    | Rewrite it around the app: admissions worklist, transfer confirmations, `/app/admin/operations`, WhatsApp. See plan §12                                                                |

---

## 3. Corrected WhatsApp quick replies

Your package's replies quote the wrong fees, the wrong address and an unready
payment rail. Below are the corrected versions, built from the canonical data.
Paste these into WhatsApp Business → Business tools → Quick replies.

| Shortcut   | Message                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/greet`   | Good day 👋 Welcome to **Cyber Elias Academy**. Tell me which skill you want to learn and I'll send the fee, duration and next start date. We are at 26 Ebony Road, Port Harcourt · cea.ng                                                                                                                                                                                                                                             |
| `/fees`    | Our current fees: short courses **₦20,000–₦60,000** (2–6 weeks, 2 days/week) and long-form diplomas **₦150,000–₦320,000** (3–6 months, 3 days/week, deposit plan available). Which course? I'll send the exact fee and payment plan. Full list: cea.ng/programs                                                                                                                                                                        |
| `/courses` | We train in Microsoft Office, Typing & Computer Basics, Data Entry, Graphic Design, Web Design, Web Development, Digital Marketing, Social Media Management, Content Creation, Video Editing, Photography, WordPress, Computer Repairs, Networking, IT Support, Data Analytics, Cybersecurity, AI Productivity, Online Teaching, Business & Freelancing, Mobile App Development, Digital Productivity. Details & fees: cea.ng/programs |
| `/pay`     | Two ways to pay: (1) card/transfer/USSD on our site — cea.ng/apply, or (2) bank transfer to **Cyber Elias Academy Ltd · UBA · 1028649972**. After paying, send your name and the receipt here and we confirm your seat the same day.                                                                                                                                                                                                   |
| `/confirm` | Payment received ✅ Your seat is confirmed. You'll get an email with your class schedule, materials and classroom code. Welcome to CEA!                                                                                                                                                                                                                                                                                                |
| `/remind`  | Reminder: your class holds {day} at {time} at **26 Ebony Road** (or online — the link is in your email). Bring your laptop and notebook. Reply here if you'll be late.                                                                                                                                                                                                                                                                 |
| `/cert`    | Certificates are issued when you complete your project. Each has a code any employer can verify at cea.ng/certificates/verify                                                                                                                                                                                                                                                                                                          |
| `/refer`   | Refer a friend 🎁 Ask them to put your name in "How did you hear about us" when they register — once they pay, your reward on the next course is processed.                                                                                                                                                                                                                                                                            |
| `/corp`    | We run corporate and school programmes (team upskilling, term-based digital skills for schools) with a custom proposal. Send your organisation name, number of people and the skills needed — proposal within 48 hours.                                                                                                                                                                                                                |
| `/schools` | **New:** for primary and secondary schools we run a term-based Digital Skills Programme — one practical skill per term, taught in your school, with projects, termly reports and a Digital Skills Passport for every student. ₦15,000–₦20,000 per student per term. cea.ng/schools                                                                                                                                                     |
| `/support` | Tell me what's happening and send a screenshot if you can — I'll sort it. During working hours, material problems are usually fixed within the hour.                                                                                                                                                                                                                                                                                   |
| `/away`    | Thanks for your message 🌙 Our office hours are Mon–Sat, 8:00–20:00 WAT. I'll reply first thing. You can start registering any time: cea.ng/apply                                                                                                                                                                                                                                                                                      |

**Labels:** `New Lead` · `Paid` · `Student` · `Completed` · `Alumni` · `School` · `Corporate`

---

## 4. Email: what the app already sends, and what Brevo should send

| Template in your package             | Already sent by the Worker?                                    | Action                                                                                                                                                                    |
| ------------------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Welcome (on enquiry)              | ✅ contact + enrollment confirmation                           | Keep the Worker version (it carries the ref, fee summary and plan maths). Put the _inspirational_ version in Brevo as a marketing welcome for newsletter subscribers only |
| 2. Payment confirmation & onboarding | ✅ `markPayment()` receipt email                               | Enhance: add the Classroom code, Meet link and WhatsApp group link from `cohorts` (plan §9)                                                                               |
| 3. Class reminder (24 h before)      | ✅ `assignment-reminders` (24 h + 1 h)                         | Add session reminders tied to `cohorts`/calendar, not just assignments                                                                                                    |
| 4. Certificate delivery              | ⚠️ certificate issuance exists; the _email_ is manual          | Add: on certificate issue → email with the verify link + review request + next-course offer                                                                               |
| 5. Re-engagement (unpaid leads)      | ✅ `enrollment-reminders` (T+24 h, then weekly balance nudges) | Keep the Worker dials; use Brevo only for the T+72 h and T+7 d **content** emails (they are marketing, not transactional)                                                 |

**Rule:** if it must not be missed, it goes through the Worker (idempotent, logged,
auditable). If it is persuasion, it goes through Brevo. Never send the same email
from both.

---

## 5. The Apps Scripts: what to keep

| Script                                                          | Verdict           | Why                                                                                                                                 |
| --------------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1 — auto-welcome on form submit                                 | ⛔ drop           | The Worker already emails on registration; a second sender means duplicate mails from a Gmail address                               |
| 2 — bulk calendar invite                                        | 🔄 keep a version | Useful for a batch of students where `cohorts` isn't wired yet; otherwise the ICS endpoint replaces it                              |
| 3 — daily class reminder (8 AM)                                 | ⛔ drop           | Already in the cron jobs (assignment + enrollment reminders) — and Gmail's free sending limits are far below what the Worker can do |
| 4 — payment follow-up                                           | ⛔ drop           | `enrollment-reminders` already does unpaid + balance nudges, with a ledger so nobody gets two                                       |
| **The Sheets mirror** (from `docs/enrollment-automation.md` §4) | ✅ **keep**       | This is the one script worth having: a read-only mirror of registrations for your phone, offline use and any future VA              |

---

## 6. What was actually changed in the repo today

1. **Compliance seed data is no longer fabricated.** `seeds/government-data.sql`
   and its mirror now carry verifiable facts only (RC 8413776, TIN 1086525399,
   one branch) plus neutral regulatory watch-items. Filings, audits, reports,
   threads, checks and staff certifications are **empty on purpose** — a false
   "Annual returns 2025 · Filed" on a compliance screen is worse than an empty
   one.
2. **The fabricated claims were removed from the UI too:** the "Accredited"
   badge, the "Full accreditation · score 92/100" card, and eleven invented
   subtitles across `/app/government/*` ("14 filings this year · 0 overdue",
   "Federal Ministry of Education · read-only access", "64 documents · digitally
   signed", "NUC + internal", …).
3. **A cleanup script** (`seeds/compliance-fabricated-remove.sql`) purges what
   earlier seeds already wrote to your production database — deleting rows from
   the seed file does _not_ remove them from D1.
4. **Tests now enforce it.** `backend/test/tier3-government.test.ts` asserts the
   real RC/TIN, asserts filings/audits/reports/threads/checks/courses are empty,
   and fails if any of nine fabricated strings reappear anywhere in the suite.
5. **Role logins** exist for all 30 roles — see `docs/demo-logins.md`.
6. **Email/DNS audit** with exact record changes — see `docs/email-dns-audit.md`.

---

## 7. What I'd still fix in the source documents

The two proposal drafts (markdown and Word) are ~95% ready. Before they go to a
school:

1. Replace `[SCHOOL NAME]` — and add a one-line personalisation in the intro that
   names the school and its level.
2. Fix the address (§1.2) and the fee band (₦15,000–₦20,000 is consistent, but
   state the **minimum cohort of 20** and the deposit terms).
3. Delete the duplicated "Proposed Courses" table in the markdown version (it
   appears twice with different layouts) and keep the second, better-structured
   one.
4. Add the **Digital Skills Passport sample** as an image — it's the most
   concrete promise in the document.
5. Add a **one-page annexure**: what the school provides, what CEA provides,
   term dates, and the acceptance signature block. That annexure becomes the
   contract in the app (see `docs/schools-partnership-programme-plan.md` §4).
