# Schools partnership programme — plan for the term-based Digital Skills pathway

**What this covers:** turning the proposal you already wrote into a repeatable,
partly-automated school programme inside CEA-OS — one digital skill per term, per
student, in primary and secondary schools — with proposals, contracts, per-term
rosters, per-student billing, certificates and the Digital Skills Passport.

**Read with:** `docs/free-automation-plan-2026-10.md` (the free-tool stack and
the money/compliance workstreams) and `docs/enrollment-automation.md` (the
individual-student funnel).

---

## 1. The shape of the business (why this is worth building)

The proposal you drafted is a good product. Three things make it structurally
better than the short-course funnel:

|                | Short courses               | School programme                                              |
| -------------- | --------------------------- | ------------------------------------------------------------- |
| Sales cycle    | Days, one learner at a time | Weeks, but **one decision buys 30–300 students**              |
| Cash           | Per student, per course     | **Per term, per cohort, recurring**                           |
| Delivery       | Off-peak teaching hours     | Inside school hours, recurring, timetabled                    |
| Marketing cost | Continuous                  | Near zero after year one                                      |
| Risk           | Empty cohorts               | Concentration on a few schools + a fixed timetable commitment |

**₦15,000 × 120 students × 3 terms = ₦5.4M/year** from **one** school, before a
second school or a higher fee tier. That is the prize. The cost of getting it
wrong is a term's worth of instructor hours committed to a timetable you cannot
fill — which is why §5 (fees, minimums and the capacity check) matters as much
as the curriculum.

**One honest caution about the two proposals** you pasted: they disagree with the
live site on the address (**24 vs 26 Ebony Road**), and both fee lists differ
from the published catalogue. Those contradictions must be fixed _before_ this
goes to a school head, because a school business officer will check. Details and
the exact lines to change: `docs/automation-package-reconciliation.md`.

---

## 2. What to build in CEA-OS (data model)

Five new tables. Everything else reuses engines that already exist.

```sql
-- The customer: a school (or any institution buying training for its people).
CREATE TABLE institutions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,                    -- "Rumuola Model Secondary School"
  kind TEXT NOT NULL DEFAULT 'school',   -- school | college | university | ngo | corporate | government
  level TEXT,                            -- primary | secondary | tertiary | mixed
  address TEXT, city TEXT, state TEXT,
  contact_name TEXT, contact_role TEXT,  -- "Head Teacher", "ICT Coordinator", "Proprietor"
  contact_phone TEXT, contact_email TEXT,
  student_count INTEGER,                 -- total enrolment, for fee-tier maths
  -- sales pipeline
  stage TEXT NOT NULL DEFAULT 'prospect'
    CHECK (stage IN ('prospect','contacted','meeting','proposal_sent','negotiating',
                     'won','lost','alumni')),
  next_action TEXT, next_action_at TEXT, owner_user_id TEXT,
  referred_by TEXT,
  created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);

-- One row per term of the programme at a school (the contract's unit of work).
CREATE TABLE school_terms (
  id TEXT PRIMARY KEY,
  institution_id TEXT NOT NULL REFERENCES institutions (id),
  academic_year TEXT NOT NULL,           -- "2026/2027"
  term TEXT NOT NULL,                    -- first | second | third
  course_slug TEXT NOT NULL,             -- the ONE skill taught this term
  level_group TEXT NOT NULL,             -- primary | secondary | mixed
  -- agreed delivery
  sessions_per_week INTEGER NOT NULL DEFAULT 1,
  minutes_per_session INTEGER NOT NULL DEFAULT 90,
  weekdays TEXT,                         -- "Wednesdays" / "Tue,Thu"
  time_slot TEXT,                        -- "during school hours" / "after school"
  venue TEXT,                            -- school lab | CEA centre | online
  instructor_user_id TEXT,
  capacity INTEGER,                      -- students covered by the agreed fee
  fee_per_student INTEGER NOT NULL,
  minimum_students INTEGER NOT NULL DEFAULT 20,
  starts_on TEXT, ends_on TEXT,
  status TEXT NOT NULL DEFAULT 'proposed'
    CHECK (status IN ('proposed','signed','scheduled','running','completed','cancelled')),
  invoice_id TEXT,                       -- finance module
  created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);

-- One row per participating student, per term. This is the roster.
CREATE TABLE school_students (
  id TEXT PRIMARY KEY,
  school_term_id TEXT NOT NULL REFERENCES school_terms (id),
  full_name TEXT NOT NULL,
  guardian_name TEXT, guardian_phone TEXT,
  class_level TEXT,                      -- "JSS2", "Primary 5"
  student_user_id TEXT,                  -- set when they get a portal account (optional)
  certificate_code TEXT,                 -- issued at the end of the term
  passport_code TEXT,                    -- the Digital Skills Passport (see §7)
  attendance_pct INTEGER,
  project_title TEXT,
  project_url TEXT,                      -- uploaded photo/link of what they built
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active','withdrawn','completed')),
  created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);

-- The proposal itself: a versioned artefact with a public link and an accept action.
CREATE TABLE proposals (
  id TEXT PRIMARY KEY,
  ref TEXT NOT NULL UNIQUE,              -- CEA-P-2026-0007
  institution_id TEXT NOT NULL REFERENCES institutions (id),
  title TEXT NOT NULL,
  audience TEXT NOT NULL DEFAULT 'students',  -- students | staff | management
  terms_json TEXT NOT NULL DEFAULT '[]', -- the 3-term plan: courses, fees, projects
  scope_json TEXT NOT NULL DEFAULT '[]', -- what the school provides / what CEA provides
  fee_per_student INTEGER, fee_currency TEXT NOT NULL DEFAULT 'NGN',
  valid_until TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','sent','viewed','accepted','declined','expired')),
  body_markdown TEXT NOT NULL,           -- rendered from the template, editable
  share_token TEXT NOT NULL UNIQUE,      -- /proposals/<token> — no login for the school
  sent_at TEXT, viewed_at TEXT, accepted_at TEXT,
  accepted_by_name TEXT, accepted_by_role TEXT, accepted_signature TEXT,
  converted_term_ids TEXT NOT NULL DEFAULT '[]',
  created_by TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);

-- Append-only audit of the proposal lifecycle (who saw it, when, and what they agreed to).
CREATE TABLE proposal_events (
  id TEXT PRIMARY KEY,
  proposal_ref TEXT NOT NULL,
  event TEXT NOT NULL,                   -- created | sent | viewed | commented | accepted | declined
  detail TEXT NOT NULL DEFAULT '',
  actor TEXT,                            -- user id, or "school:Head Teacher"
  at TEXT NOT NULL
);
```

Plus one column on the existing tables:

```sql
ALTER TABLE registrations ADD COLUMN institution_id TEXT;   -- staff/teacher enrolments
ALTER TABLE invoices      ADD COLUMN institution_id TEXT;   -- group invoices
```

**Why this shape.** `institutions` is the CRM record (one school = one pipeline
card, not 120 leads). `school_terms` is where money, timetable and curriculum
meet — and it's the only thing an invoice references, so a school with three
year groups in two levels invoices cleanly. `school_students` is a roster, _not_
a `users` row: 120 pupils do not need logins, and creating accounts for minors
means handling parental consent. Give a login only to a student who continues
into the paid public courses (§8).

### Reuse, don't rebuild

| Need                      | Existing component                                                                            |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| The offer / deal pipeline | `institutions.stage` mirrors the `registrations` pipeline                                     |
| Proposals                 | Services engine (`client` workspace, proposals) — extend, don't duplicate                     |
| Invoicing                 | `finance` module: `POST /v1/invoices` (add `institution_id`)                                  |
| Take payment              | Paystack enrollment route, one invoice per school per term                                    |
| Certificates              | `certificates` module + public `/certificates/verify`                                         |
| Curriculum                | `src/data/academy/catalog.ts` (short courses) — the school courses are remapped versions      |
| Learner materials         | the 142 published session notes at `cea.ng/classes/...`                                       |
| Guardians                 | `parent` role workspace (for the small number of schools wanting parent visibility)           |
| Government/compliance     | `/app/government` — a school partnership is a paper trail: signed proposal, invoice, receipts |

---

## 3. The end-to-end flow (and what gets automated)

```
1 PROSPECT      School identified (walk-in, referral, LinkedIn, cold visit, .edu.ng list)
      ↳ institutions row, stage=prospect, next_action set
2 FIRST CONTACT Free 20-minute meeting booked (Calendly free) or a physical visit
      ↳ stage=contacted → meeting; notes + next_action
3 DISCOVERY     Students, levels, labs, timetable windows, fee sensitivity, decision maker
      ↳ fills: student_count, level, venue, capacity preview
4 PROPOSAL      Generated from the template in §4 → ref CEA-P-2026-XXXX
      ↳ PDF + a no-login link; stage=proposal_sent; reminder at day 3 / 7 / 14
5 ACCEPTANCE    Head teacher/proprietor reviews the link, types name + role, clicks Accept
      ↳ stage=won; accepted_signature stored; proposal_events audit trail
6 CONTRACT      school_term rows created from the accepted terms; invoice per term
      ↳ invoice via finance → Paystack link (or bank transfer, see plan §6)
7 SCHEDULING    Term dates → Google Calendar (as a subscription URL) + instructor assignment
      ↳ capacity check: instructor available? lab available? fee covers hours?
8 ROSTER        School sends the class list (CSV/XLSX) → imported into school_students
      ↳ one row per pupil; guardian phone for absence follow-up
9 DELIVERY      Weekly sessions, attendance taken in CEA-OS (existing attendance module)
      ↳ project recorded per student; photos become marketing content (with permission)
10 REPORTING    Mid-term progress note + end-of-term report to the school (auto-generated)
      ↳ attendance, projects, completions — the school's justification to parents
11 CERTIFY      One certificate per student per term + the Digital Skills Passport builds up
      ↳ /certificates/verify codes; printed PDFs for a prize day (Canva + the app's codes)
12 RENEW        Two weeks before term end: next term's course proposed at the current fee
      ↳ the cheapest sale in the business: stage=won → new school_term, no re-selling needed
13 ALUMNI       Pupils who finish school and want to continue → the public course funnel,
                with their Digital Skills Passport as evidence of prior learning
```

**Automated (free, in-app):** proposal generation, day 3/7/14 follow-ups, term
invoices and reminders, calendar subscription, absence follow-ups to guardians
(WhatsApp click-to-chat → later SMS), mid/end-of-term reports, certificate
issuing, renewal prompt, revenue reporting per school.

**Stays human:** the first school visit, the discovery meeting, the fee
negotiation, the first session at a new school, and any conversation with a
school that is unhappy. Those are the moments the business is actually won.

---

## 4. The proposal generator (the highest-leverage piece)

You already have the content. What the app should do is make it a **30-second job
with the school's details already in it**, and make it **trackable**.

### 4.1 Store the master template in the repo

```
docs/proposals/schools-digital-skills.md      ← the canonical proposal (your text,
                                                 cleaned: real address, real fees,
                                                 no invented claims)
```

Front matter drives generation:

```yaml
---
title: Practical Digital Skills Programme for Students
audience: students
course: "" # filled per school
feePerStudent: 0 # filled per school / tier
validDays: 30
termStructure:
  [
    { term: first, course: Computer & Digital Literacy },
    { term: second, course: Microsoft Office },
    { term: third, course: Graphic Design },
  ]
whatSchoolProvides: [timetable window, access to students, room/space, coordination]
whatCeaProvides: [curriculum, instructors, materials, assessment, projects, certificates, reporting]
---
```

### 4.2 Generate, render, share

- `POST /v1/proposals` (admissions/admin) → renders markdown → HTML using the
  school's name, level, student count and the agreed fee; stores `body_markdown`
  and a `share_token`.
- `GET /proposals/<share_token>` — public, no login, print-ready (browser → PDF,
  ₦0). Add `?print=1` for a clean print stylesheet.
- The page records `viewed_at` on first open → you know when the head teacher has
  actually read it (currently you'd be guessing).
- **Accept in place:** name + role + a typed signature line → `accepted`,
  timestamped, with the IP and the exact version hash of the body rendered. That
  is a stronger record than a scanned signature, and it costs nothing.
- Store the rendered HTML/PDF in R2 and mirror to
  `Drive/05-Marketing/Proposals/` and `Drive/01-CAC-and-Legal/Contracts/`.

### 4.3 The three things a school actually checks

From the proposal itself, these are the questions that decide yes/no:

1. **"What does it cost us?"** — put the fee, the minimum cohort size and what
   happens if fewer students enrol at the _top_ of the document, not in §14.
2. **"What do we have to do?"** — the school's obligations (§16/§17 in your
   draft) belong on page one as a 6-line checklist. Schools say no because they
   fear hidden workload.
3. **"What do we show parents?"** — the Digital Skills Passport, the termly
   report and the certificate are the answer. Lead with those.

### 4.4 Fee tiers (a suggestion you can change)

| Cohort size        | Fee / student / term | Notes                                                            |
| ------------------ | -------------------- | ---------------------------------------------------------------- |
| 20–39              | ₦20,000              | Minimum viable: one instructor, one weekly session               |
| 40–79              | ₦17,500              | Two sessions or a second class group                             |
| 80+                | ₦15,000              | Requires 2+ instructors or a full day on site                    |
| Additional service | Quoted               | Teacher training, ICT lab advice, evening club, holiday bootcamp |

Non-negotiables to quote in the proposal: **minimum 20 paying students**, a
**50% deposit before the first session**, the balance by **mid-term**, and
**payment for the full term** if the school cancels inside two weeks of the start
date. Naming these up front protects you from the classic school failure mode:
the programme runs for six weeks and the invoice is "still with the bursar".

---

## 5. Capacity: what each new school costs you

Be honest with yourself here, because this is the constraint that will break the
programme before demand does.

| Per school, per term | Reality                                                 |
| -------------------- | ------------------------------------------------------- |
| Instructor time      | ~12 sessions × 1.5 h + travel + prep ≈ **30 hours**     |
| Admin time           | Roster, attendance, reports, certificates ≈ **6 hours** |
| Site visits          | 1 sales + 2 check-ins ≈ **5 hours**                     |
| **Total**            | **≈ 41 hours per school per term**                      |

If you teach the sessions yourself, you can run **2–3 schools per term** before
the public courses starve. So the hiring trigger is arithmetic, not ambition:

- 1 school → you teach it.
- 2 schools → still you, if timetables don't clash (they usually do).
- 3rd school / 4th group → **recruit one instructor** (~₦80k–₦150k/term per
  school, or a per-session rate) and keep ~60–70% margin.

Put this in the app: `school_terms.instructor_user_id` + a dashboard warning when
an instructor's term hours exceed a threshold, and a `capacity` check at proposal
time (don't promise a school a day you're already booked).

---

## 6. Curriculum mapping (your courses → CEA-OS slugs)

Your proposal lists 7 primary and 11 secondary courses. Map them onto what the
repository already teaches so materials, lesson plans and certificates come free:

| School course                           | Maps to                            | Notes                                     |
| --------------------------------------- | ---------------------------------- | ----------------------------------------- |
| Computer & Digital Literacy             | `computer-basics-typing`           | Add a pupil-friendly variant of the notes |
| Microsoft Office for Kids               | `microsoft-office`                 | Same syllabus, simpler projects           |
| Creative Graphic Design                 | `graphic-design`                   | Canva-first, school-event projects        |
| Scratch & Creative Coding               | **new**                            | Needs authoring — see below               |
| Digital Storytelling & Content Creation | `video-editing` / content lessons  |                                           |
| Internet & Cyber Safety                 | `cybersecurity` (first 4 sessions) | Age-appropriate cut                       |
| Introduction to Artificial Intelligence | `ai-productivity` (first sessions) |                                           |
| Web Design                              | `web-design`                       |                                           |
| Web Development & Programming           | `web-development` (+ Python)       | Slower pace, 3 terms                      |
| Digital Marketing                       | `digital-marketing`                | Imaginary-business campaign project       |
| Social Media Management                 | `social-media-management`          |                                           |
| Video & Content Creation                | `video-editing`                    |                                           |
| Cybersecurity & Digital Safety          | `cybersecurity`                    |                                           |
| Data & Excel                            | `excel` / `data-entry`             |                                           |
| AI & Prompt Skills                      | `ai-productivity`                  |                                           |
| Freelancing & Digital Entrepreneurship  | `freelancing` (if present) / new   | Age-appropriate framing                   |

**Work required:** two genuinely new roadmaps — **Scratch & creative coding** and
**freelancing/entrepreneurship for teens** — plus a _primary-school reading level_
pass over the existing notes (the current material assumes an adult learner). Each
new roadmap follows `docs/tutorial-master-prompt.md`: one node at a time, taught
to independent use.

**The Digital Skills Passport** (§7) then becomes the natural certificate model:
one certificate per course, per student, accumulating into a passport — which is
exactly how the `certificates` table already works (one row per user per course).

---

## 7. The Digital Skills Passport (the feature that sells the programme)

Your proposal's best idea. Make it real in the app rather than a graphic on a
slide:

- **`GET /passport/<code>`** — public, no login. Shows the student's first name +
  initial, school, the skills completed (with the term), the projects they built,
  and a verify link per course certificate.
- Codes are already in the family `CEA-XXXX-XXXX`; a passport code is
  `CEA-PS-XXXXXX` and links to the `certificates` rows for that student.
- Print-ready (A4, one page) so schools can include it in prize-giving packs.
- Growth loop: the passport URL is shareable on WhatsApp and LinkedIn (for the
  secondary cohort) — same mechanic as the certificate verify page, which is
  already a lead channel.
- **Guardian-facing, minor-safe:** first name + initial, no photos without
  written permission, no address, no phone, no full date of birth. Store the
  consent flag on `school_students`, and honour it in the renderer.

---

## 8. Pricing, invoicing and cash flow

- **Invoice per school per term** (`finance` module), 50% deposit upfront.
- Paystack link on the invoice email; bank transfer (UBA) documented in the
  proposal itself, with the proof-of-transfer flow from
  `docs/free-automation-plan-2026-10.md` §6.
- **Never start delivering without the deposit.** Automate the reminder, not the
  exception: deposit unpaid 48 h before start → the term's start date moves.
- Record the school's fee, per student, in `school_terms.fee_per_student` so
  revenue reporting can answer "which school, which course, which margin".
- Receipts = the same receipt numbering as individual payments (plan §6.4), with
  `institution_id` set. FIRS/CAC-ready from day one.

## 9. Reporting: the thing that renews the contract

Two generated documents, both free, both reused for marketing:

1. **Mid-term note (1 page):** attendance to date, the project each student is
   building, one problem you need the school to fix. Send by email; it prevents
   end-of-term surprises.
2. **End-of-term report (2–3 pages):** attendance, completions, certificates
   issued, projects (photos, with permission), and a suggestion for next term.
   This is what a head teacher shows the proprietor, and it is what re-signs the
   contract.

Both are markdown/HTML rendered from the term's data and print to PDF in the
browser. The end-of-term report doubles as a leave-behind for the _next_ school.

## 10. Build order

| Phase  | What ships                                                                                                                     | Why first                                                                    |
| ------ | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| **P1** | `institutions` + `proposals` (create → share link → view tracking → accept) + the §4.1 template file, cleaned of the conflicts | You can convert a school with what exists today; everything else is delivery |
| **P2** | `school_terms` + `school_students` + invoice per term + roster CSV import                                                      | The moment a school says yes                                                 |
| **P3** | Attendance + project capture + mid/end-of-term report generation                                                               | Renewals                                                                     |
| **P4** | Certificates per term + Digital Skills Passport page                                                                           | The thing schools brag about                                                 |
| **P5** | Renewal automation (T-14 days), capacity/instructor dashboard, revenue per school                                              | Scale to 3+ schools                                                          |
| **P6** | New curricula (Scratch, teen entrepreneurship) + primary-level notes pass                                                      | Fills the two real content gaps                                              |

## 11. Decisions I need from you

1. **Address:** is it **24** or **26 Ebony Road**? The site, the FAQ, the map and
   the app all say 26; the proposal and the automation package say 24. One of
   them is wrong in front of customers.
2. **Fees:** the automation package quotes Web Development at ₦150,000/8 weeks,
   Cybersecurity ₦200,000/10 weeks, UI/UX ₦120,000/6 weeks — none of which match
   the published catalogue (₦20k–₦60k short courses; ₦150k–₦320k long-form
   diplomas). **Which list is current?** Every quick reply and email template
   that quotes the old numbers must be corrected before it goes out.
3. **The Director's name** in the templates: "Graham Ellis Dennis"? The app's
   admissions script signs off as "Ellis"; the WhatsApp `/greet` in the package
   says "I'm Graham, the Director". Pick one form and I'll standardise it.
4. **Is `cyberelias.tk@gmail.com` still in use?** It appears as the support
   address in the payment-confirmation template. It should be an `@cea.ng`
   mailbox.
5. **Do you want the school proposal to state a minimum cohort (20)?** It is the
   single clause that protects your margin, and schools rarely push back when it
   is presented as "the minimum for a dedicated instructor".
