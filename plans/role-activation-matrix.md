# Role Activation Matrix — every role the CEA masterpiece needs

Companion to [`CEA_MASTERPIECE_BLUEPRINT_2026-10.md`](./CEA_MASTERPIECE_BLUEPRINT_2026-10.md).

**How to read this.** A role exists when a *judgment* exists that no one else is making. The matrix below names 40 such judgments, gives each a charter (the decision it owns), a week-one deliverable (the artifact that proves the role is live), a KPI (the number that says it is working), and an excellence test (the question that cannot be argued around). On a lean team one person holds several roles — that is fine, provided every role is *held by name* and its artifact exists. A role with no artifact is a costume.

**Rule of the matrix:** no role may approve its own claim. Editorial cannot approve legal copy, growth cannot approve its own tracking, engineering cannot approve its own accessibility, monetisation cannot approve its own placements.

---

## Pod 0 — Direction & governance

| Role | Charter (the decision it owns) | Week-1 deliverable | KPI | Excellence test |
|---|---|---|---|---|
| **Executive sponsor** (Founder) | Final authority on what the academy claims, charges and promises. Signs the claims register. | Claims register v1: every number/promise on the public site + its evidence + owner. | Zero unsupported claims found in monthly audit. | Would you say this sentence to a parent's face, with the evidence in your hand? |
| **Product director** | Priority order and release gates; says no to features. | Quarterly plan with one goal per phase and a gate per goal. | Gates closed on time; ≤ 1 wip goal per pod. | Can every team member name this quarter's single most important outcome? |
| **Academy operations lead** | Timetable, capacity and intake reality — what the site is allowed to advertise. | Published class calendar with start dates, seats and session times, mirrored on the site. | Zero advertised intakes that do not exist. | Does the site's schedule match the room's schedule this week? |
| **Finance & business manager** | Fees, margins, payment rails, refunds, AdSense payee/payout readiness. | Fee model (cost per learner per course) + refund flow + payout checklist. | Fees reconciled within 24h; refunds within policy SLA. | Can you state the margin per course, including teacher time? |
| **Legal counsel (NG)** | Consumer, education, advertising and contract language. | Reviewed terms/privacy/refunds with advertising clauses. | Zero unresolved legal flags on release. | Would this hold if a learner disputed it publicly? |
| **Data protection officer** | Lawful basis, consent, retention, DSARs, third-party vendors. | Records of processing + consent matrix (analytics, ads, WhatsApp, payments). | DSAR answered within statutory window; consent state accurate. | Can you name every processor and why it has the data it has? |
| **Risk & QA governor** | Gate discipline; keeps the evidence log honest. | Gate log with owner, test, evidence link for each gate. | 100% of shipped changes traceable to a gate or metric. | Could a sceptical outsider re-verify every green light from the log alone? |

---

## Pod 1 — Brand, research & design

| Role | Charter | Week-1 deliverable | KPI | Excellence test |
|---|---|---|---|---|
| **Design director** | Coherence of the whole visual argument, and the critique bar. | Design principles (6 lines) + critique template + first critique of the home template. | Every template critiqued before launch. | Do two different pages feel like the same place? |
| **Brand & identity designer** | Logo system, palette, type, marks, usage rules. | Brand sheet: tokens, usage, do/don't, favicon/OG/PWA icon family. | Zero hardcoded colours outside tokens. | Would the brand survive being printed in one colour on a flyer? |
| **UX researcher (novice learners)** | What real beginners do, fear and misread. | 8 moderated sessions (2 with first-time smartphone users), clips + findings. | ≥ 3 findings converted into shipped changes per quarter. | Has a real nervous first-timer completed `/apply` unassisted while you watched? |
| **Information architect** | URL, navigation, taxonomy, findability, redirects. | Sitemap + nav model + redirect map + "one job per URL" table. | Zero orphan pages; zero dead-end pages. | Can a stranger reach any course in ≤ 2 clicks? |
| **UI / visual designer** | Composition, hierarchy, spacing, states. | Page comps for home, course, lesson, apply (mobile first). | Design QA pass rate ≥ 95% against comps. | Does the page still read correctly in greyscale at 360px? |
| **Motion & interaction designer** | Feel: transitions, feedback, scroll behaviour. | Motion spec with durations/easings + reduced-motion parity table. | Zero motion that blocks input; INP within budget. | With motion off, is anything *missing* rather than just still? |
| **Art director (photo & illustration)** | The honest image of the room and the illustration system. | 24-shot list + 3 test photographs + consent forms. | All public imagery original and dated. | Could a reviewer match every photo to a real place on Ebony Road? |
| **Accessibility specialist** | WCAG 2.2 AA across templates, assistive-tech flows. | Audit of 5 templates + prioritised ticket list. | Zero serious/critical axe violations at release. | Can the whole apply flow be completed with a screen reader and keyboard only? |
| **Content designer (UX writer)** | Microcopy: buttons, errors, empty states, confirmations. | Copy deck for all 5 core templates incl. 12 error states. | Zero ambiguous CTA labels; zero "click here". | Does the error message tell the person what to do next, in their words? |

---

## Pod 2 — Frontend craft

| Role | Charter | Week-1 deliverable | KPI | Excellence test |
|---|---|---|---|---|
| **Frontend lead** | Architecture, review bar, performance budgets. | ADR set (rendering, data, budgets) + PR checklist. | All PRs meet checklist; no budget regressions. | Can a new contributor ship safely in week one? |
| **Next.js/React engineer** | Pages, components, data wiring, correctness. | Two template rebuilds to spec with tests. | Zero hydration/console errors in production. | Does it work with JS slow to arrive and with JS off? |
| **Design-systems engineer** | Tokens, primitives, drift prevention. | Token contract doc + lint rule against raw values. | 0 raw colour/size literals in new code. | Could you re-theme the site in a day? |
| **Performance engineer** | CWV field + lab, JS/image/font budgets. | Baseline field/lab report + budget config in CI. | LCP p75 < 1.8 s mobile; CLS < 0.02. | Does it feel instant on a Tecno/Infinix-class device on 3G? |
| **Technical SEO engineer** | Rendering, canonical, schema, crawlability. | Schema matrix + crawl diff tooling + validation run. | Zero canonical/noindex/schema errors in weekly diff. | Would Google's own tools show this page as it looks to a person? |
| **Accessibility engineer** | Semantic markup, focus order, ARIA correctness. | axe CI on 5 templates + focus-order fixtures. | Zero serious violations; no positive tabindex. | Does keyboard focus always visibly go somewhere sensible? |
| **Content-tooling engineer** | Authoring pipeline for 200+ lessons and all data. | Validator: word count, figures, self-check, reading time, links. | Zero lessons failing the lesson contract at build. | Could a teacher publish a compliant lesson without touching code? |

---

## Pod 3 — Platform, security & reliability

| Role | Charter | Week-1 deliverable | KPI | Excellence test |
|---|---|---|---|---|
| **Backend engineer (Workers/Hono)** | `/v1` correctness, RBAC, payment verification. | RBAC allowlist audit: every route classified. | 100% routes listed; 403 on mismatch. | Can an unauthorised role reach anything? |
| **Data engineer (D1)** | Schema, migrations, seeds, integrity, ledger honesty. | Migration ledger reconciliation plan + seed parity check. | Zero drift between seeds and `src/data`. | Could you rebuild production from the repo alone? |
| **DevOps / release manager** | Deploy safety, rollback, env parity, revision proof. | Release checklist with rollback step + revision verification. | Every release has recorded revision; rollback tested. | If this deploy is bad, how long until it is undone — and do you know it worked? |
| **Security engineer** | Auth, sessions, secrets, headers, threat model. | Threat model + CSP (report-only → enforce plan). | Zero secrets in client; CSP enforced. | Would you be comfortable publishing the threat model? |
| **SRE / observability** | Uptime, error rates, p75 latency, alerting. | Sentry + uptime + Lagos-based synthetic check. | Alert → acknowledge < 15 min business hours. | Would you know before a learner told you? |
| **QA automation engineer** | Playwright suites, visual regression, release confidence. | Suite for 3 templates × 2 viewports + auth flow. | Green CI required to merge. | Can you ship on a Friday without dread? |
| **Test-data steward** | Seeds/mocks that never lie or leak. | Demo-data manifest + redaction checks. | Zero real personal data in seeds. | Would a demo account ever be mistaken for a real learner? |

---

## Pod 4 — Curriculum & editorial (the moat)

| Role | Charter | Week-1 deliverable | KPI | Excellence test |
|---|---|---|---|---|
| **Editor-in-chief** | Voice, standards, publish/no-publish, corrections. | House standard one-pager + 3 read-back notes on existing lessons. | 100% published lessons meet the template. | Would you sign your name to every published lesson today? |
| **Instructional designer** | Session → lesson → assessment alignment. | Learning-objective map for 3 courses. | Every session has an objective and a check. | Does the lesson teach the *thing the certificate claims*? |
| **Subject teachers** (Office, Design, Web, Repairs, Security) | Technical truth of each lesson, in classroom voice. | 4 voice memos → 4 corrected lessons. | Every technical lesson has a teacher byline. | Would you teach this exact sequence tomorrow? |
| **Copy editor** | House style, Nigerian English, plain language. | Style sheet + reading-level check on 10 lessons. | Reading level ≤ Grade 8; zero unexplained jargon. | Can a reader who left school at 16 follow every paragraph? |
| **Localisation lead** | Naira, NEPA, POS, data bundles, WhatsApp, idiom. | Localisation glossary (60 terms + phrases). | Every example uses a recognisable local object. | Does the example feel like it happened in Port Harcourt? |
| **Content operations manager** | Calendar, pipeline, SLAs, freshness queue. | Production board + 4-week queue + 180-day refresh list. | ≥ 4 lessons/week; 0 lessons past review date. | Is there ever a day with nothing ready to publish? |
| **Multimedia producer** | Photo/video/audio, captions, rights, compression. | Asset library structure + 3 captioned clips. | Every video captioned; ≤ 350 KB per lesson image set. | Would this load on a 3G phone without buffering twice? |
| **Fact-checker / curriculum reviewer** | Independent verification before publish. | Review checklist + 6 lessons signed off. | 100% of technical claims sourced. | Could a rival teacher find an error in this lesson? |
| **Reference editor** | Glossary, canonical definitions, internal links. | 30 new terms + link graph rules. | ≥ 1 glossary link per lesson; zero duplicate definitions. | Does the glossary answer the question the lesson raised? |
| **SEO content strategist** | Topic map, intent, briefs, competitive gaps. | Cluster map: 30 chapters × lessons + 20 brief backlog. | ≥ 80% of new pages target a real query. | Would you personally search this query? |

---

## Pod 5 — Growth & digital presence

| Role | Charter | Week-1 deliverable | KPI | Excellence test |
|---|---|---|---|---|
| **Head of growth** | Funnel model, channel mix, experiment cadence. | Funnel model with baseline conversion at each step. | ≥ 2 experiments live at all times. | Can you name the constraint and the next test? |
| **SEO manager** | Rankings, indexing, technical + content SEO ops. | GSC baseline + weekly review template. | Indexed quality pages up; impressions up month on month. | Are the pages you care about actually indexed this week? |
| **Local SEO / GBP manager** | Maps, reviews, citations, NAP consistency. | GBP audit + citation list + photo calendar. | 4 GBP posts/month; 2 new honest reviews/month. | Does Maps show the correct address, hours and photos? |
| **Community manager (WhatsApp-first)** | Groups, DMs, answer quality, response SLAs. | Answer library (30 questions) + SLA policy. | ≤ 2h first response in business hours. | Would you screenshot any of your replies? |
| **Social & video producer** | YouTube/TikTok/IG, captions, repurposing. | 8-video outline + 1 published captioned video. | 1 video/week; watch-through ≥ 40%. | Does the video teach something in the first 15 seconds? |
| **Lifecycle / email marketer** | Welcome, nurture, re-engage, lesson digest. | 6-email onboarding sequence + signup form. | ≥ 35% open, ≥ 3% click on digest. | Would you stay subscribed after the first email? |
| **Partnerships lead (schools/NGOs/employers)** | Institutional pipeline and delivery proof. | One-pager + 20-school target list. | 5 signed school clinics in 90 days. | Do partners renew without being chased? |
| **PR & reputation lead** | Local press, awards, crisis comms. | Press kit + 5 story angles + crisis line. | 3 real placements/quarter. | Would a journalist quote the site without checking twice? |
| **Paid media buyer** | Search/social acquisition with stop-loss discipline. | Channel budget + CAC model + kill rules. | Cost per application ≤ fee/5. | Can you justify every naira spent, per channel? |
| **Analytics & measurement lead** | Event taxonomy, dashboards, truth. | Tracking plan + verified events in debug view. | 100% of launch events verified. | Would you bet money on this number? |
| **CRO / experimentation lead** | Page-level conversion, honest tests. | Test backlog + 1 A/B on the fee/evidence block. | ≥ 1 winning test/quarter. | Was the last winner bigger than the noise? |
| **Referral & ambassador manager** | Word-of-mouth mechanics, alumni kit. | Referral rules + alumni share kit. | Referrals ≥ 15% of enrolments by month 6. | Would an alumnus share this without being asked twice? |

---

## Pod 6 — Monetisation & commerce

| Role | Charter | Week-1 deliverable | KPI | Excellence test |
|---|---|---|---|---|
| **AdSense / monetisation manager** | Policy compliance, placement map, reporting, no self-harm. | Placement map + pre-flight checklist + policy lint rule. | Zero policy violations; ads only on eligible pages. | Would you defend every ad position to the learner reading that page? |
| **Sponsorship & partnership revenue** | Clearly-labelled local sponsorships. | Rate card + disclosure standard. | 1 sponsor/quarter, labelled. | Is the label bigger than the logo? |
| **Commerce ops** | Shop/merchant feeds, fulfilment honesty. | Catalogue audit + returns copy + feed validation. | Zero unfulfillable listings. | Does the product page tell the truth about delivery time? |
| **Pricing analyst** | Fee tiers, instalments, scholarships, price clarity. | Price architecture + scholarship criteria. | Zero price disputes; published criteria. | Could someone calculate their total cost without asking? |

---

## Pod 7 — Admissions, success & proof

| Role | Charter | Week-1 deliverable | KPI | Excellence test |
|---|---|---|---|---|
| **Admissions counsellor** | Reply speed, honest guidance, course fit. | Response templates + fit questions + booking flow. | ≤ 2h first reply; ≥ 45% application completion. | Does the applicant know the fee and start date before the call ends? |
| **Student success / onboarding** | First-week experience, attendance, confidence. | Onboarding script + day-1 checklist. | ≥ 85% attendance week 1. | Does a nervous learner know exactly where to sit on day one? |
| **Support operations** | Queues, escalations, SLAs, tone. | SLA matrix + escalation tree + macros. | ≥ 90% within SLA. | Is there any channel nobody answers? |
| **Certificate & verification officer** | Public verification correctness and privacy. | Verification runbook + display rules (minimal data). | 100% of public verifications accurate. | Does verification reveal nothing it shouldn't? |
| **Alumni community manager** | Stories, referrals, employer links, consent. | Consent pack + 3 alumni interviews scheduled. | 3 stories/quarter. | Did the alumnus approve the exact words and photo used? |

---

## Pod 8 — Agentic/AI roles: how they are allowed to work

The RBAC roles `marketing`, `growth`, `conversion-copy`, `product-marketing`, `behavioral-design`, `localization`, `design` map to the pods above as **assistive functions**, with three hard rules:

1. **Human signer.** No AI-authored page ships without a named human byline and reviewer. The `/editorial` AI policy states this publicly.
2. **Fact discipline.** AI may not introduce a number, testimonial, salary figure, statistic or claim. Facts come from the claims register or are cut.
3. **Voice discipline.** AI drafts in the house voice but is edited by the copy editor; localisation examples must be checked by someone who lives in Port Harcourt.

Use them where they are strongest: first drafts from a teacher's voice memo, alt-text drafts, schema/sitemap generation, translation drafts for glossary terms, variant copy for tests (with human approval), and content lint repair. Never: choose fees, invent proof, write legal copy, publish unsupervised.

---

## Handoff contracts (the interfaces that keep quality from leaking)

| From → To | The artifact that crosses the boundary | Rejected if |
|---|---|---|
| Teacher → Editor | Voice memo + marked-up draft + "what goes wrong" notes | It reads like a manual, not a classroom |
| Editor → Fact-checker | Final draft + source list + claims touched | Uncited numbers |
| Design → Frontend | Comps + token references + states (empty/loading/error) | No mobile or no error states |
| Frontend → QA | Preview URL + list of changed templates + budget report | No performance numbers |
| Content → SEO | URL + title + description + internal link targets | Duplicate or under-length meta |
| SEO → Crawl ops | New URL + lastmod + hub link | Orphan URL |
| Monetisation → DPO | Placement map + vendors + consent dependencies | Ads on ineligible path |
| Admissions → Product | Weekly reasons people did not apply (verbatim) | Aggregate-only feedback |
| QA → Release manager | Green suite + a11y + perf evidence | Any red or unknown |
| Release manager → Sponsor | Deployed revision + rollback proof + 24h watch result | Healthy old revision presented as proof |

---

## Lean staffing map (what a solo founder + AI actually activates, in order)

| Wave | Roles activated | Why now |
|---|---|---|
| **1 (week 1–2)** | Executive sponsor, product director, DPO, risk/QA governor, editor-in-chief, SEO manager, frontend lead, performance engineer, admissions counsellor | These are the roles that *decide and verify*; without them everything else drifts |
| **2 (week 3–6)** | Instructional designer, copy editor, content ops, accessibility specialist, frontend engineer, technical SEO, analytics lead, art director | Content engine + the gates that make the public site trustworthy |
| **3 (week 7–12)** | Localisation lead, multimedia producer, fact-checker, community manager, partnerships lead, lifecycle marketer, CRO, alumni manager | Presence and compounding |
| **4 (post-approval)** | Monetisation manager (≤ 1 day/month), sponsorships, commerce ops, pricing analyst | Upside, kept deliberately small |
| **Fractional, as revenue allows** | Design director, security engineer, SRE, QA automation, legal counsel, SRE, researcher | Buy the judgment, not the headcount |

**A role is only "active" when its week-one artifact exists in the repo or the drive.** Track activation in a simple table with a link per artifact — that table is the real staffing plan.

---

## RACI for the eight decisions that shape the site

| Decision | R | A | C | I |
|---|---|---|---|---|
| What the academy claims publicly | Editor-in-chief | Executive sponsor | Legal, finance, teachers | Everyone |
| Fee and offer structure | Finance | Executive sponsor | Pricing analyst, operations | Growth, admissions |
| Which pages are indexable | SEO manager | Product director | Editor, IA | Frontend |
| Visual direction of a template | UI designer | Design director | A11y, frontend, art director | Growth |
| Performance/a11y release gate | Performance + a11y engineers | Frontend lead | QA, design | Product director |
| Data/consent model | DPO | Executive sponsor | Security, legal, analytics | Growth, monetisation |
| Ad placements and eligibility | Monetisation manager | Product director | DPO, design, editor | Finance |
| What gets built next | Product director | Executive sponsor | All pod leads | Partners |

---

## The role audit question (run monthly)

For each of the 40 roles, answer three things in one line each: **artifact exists? evidence linked? number moving?** Any role failing two of three is either given to someone else or formally retired this month. Retiring a role honestly is better than keeping a title that produces nothing — and that discipline, more than any individual hire, is what makes the site a masterpiece.
