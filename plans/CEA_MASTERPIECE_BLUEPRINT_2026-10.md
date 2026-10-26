# Cyber Elias Academy — Masterpiece Blueprint

**A build plan for www.cea.ng that is excellent on purpose, not by accident.**

Date: 25 October 2026 · Branch: `arena/9ba9816e-lumina-studio` · Status: planning document (no production change in this pass)
Companions: [`role-activation-matrix.md`](./role-activation-matrix.md) · [`../docs/masterpiece-design-spec.md`](../docs/masterpiece-design-spec.md) · [`../docs/adsense-approval-playbook.md`](../docs/adsense-approval-playbook.md) · [`../docs/masterpiece-scorecard.md`](../docs/masterpiece-scorecard.md) · [`../docs/chatgpt-blueprint-review-2026-10-25.md`](../docs/chatgpt-blueprint-review-2026-10-25.md) (second-opinion review and the four changes it produced)

---

## 0. The one-page version

**What the site is for.** It exists so that a person in Port Harcourt who is afraid of a computer can, on a cheap Android phone over patchy data, (1) see a course that names a real task they want to do, (2) see the fee, the weeks, the address and the final deliverable without asking anyone, (3) read a free lesson that teaches them something true in the next four minutes, and (4) apply — and so that a school, employer or programme evaluator can verify all of that in public.

**What "masterpiece" means here.** Not "impressive". A masterpiece for this site is a site where *nothing is unaccounted for*: every public URL has a reason to exist and enough substance to survive a stranger's judgment; every claim is checkable; every screen works on the worst phone the audience actually owns; every role that touches the site has a charter, an artifact and a number. The scorecard in [`docs/masterpiece-scorecard.md`](../docs/masterpiece-scorecard.md) makes "masterpiece" measurable instead of rhetorical.

**The three engines, in priority order.**

| # | Engine | Job | North-star signal |
|---|--------|-----|-------------------|
| 1 | **Enrolment** | Turn consideration into a booked applicant | Verified enrolments / week |
| 2 | **Authority** | Be the most useful, most honest beginner-computer corpus written *for Nigeria* | Organic sessions to `/blog` + `/glossary` growing month on month; returning readers |
| 3 | **Trust** | Make the academy verifiable — address, fees, staff, certificates, corrections | Applications that arrive already knowing the fee and the address |

Everything else — CEA-OS, monetisation, social, apps — is support or upside. If a decision trades engine 1 or 3 for engine 2's vanity or engine 4's pennies, the decision is wrong.

**The single sentence to test every change against.**

> A stranger on a 3G phone in Rumuola should be able to tell, within ten seconds, what CEA teaches, what it costs, where it is, and that a real person will answer.

**The honest strategic call on AdSense.** AdSense is worth having as a *small, clean subsidy* on the educational corpus — and it is a terrible thing to optimise the site around. Realistic Nigerian informational RPMs mean a successful AdSense approval is worth tens of dollars a month, while one extra enrolled learner is ₦20,000–₦50,000. So: qualify properly, place ads only where they cannot damage enrolment or trust, and never let ad inventory influence editorial or page structure. The full reasoning, gates and placement map are in [`docs/adsense-approval-playbook.md`](../docs/adsense-approval-playbook.md).

---

## 1. Where the site actually stands (evidence, not impression)

| Layer | State today | Verdict |
|---|---|---|
| Frontend | Next.js 15 App Router, SSR/SSG, ~400 sitemap URLs, 63 route files generated into App Router pages by `scripts/generate-next-routes.mjs`, Tailwind v4 token system, motion primitives, mock-mode preview harness (`NEXT_PUBLIC_API_URL` unset) | **Strong foundation** — IA changes are code changes + a generator update, never CMS clicks |
| Mobile | Two apps: `apps/android` (Capacitor) and `apps/android-native` (native, Play AAB + direct APK workflows, FCM, offline lesson bundling) | **Built, under-activated** — the gap is store presence and onboarding, not engineering |
| Public content | 210 self-paced lessons, 13 live courses (22-course catalog / 142 sessions in `src/data/academy`), glossary, career guides, library, editorial policy | **Genuinely differentiated** — the lesson voice (see `/blog/sitting-down-at-a-computer`) is the best asset on the site |
| Proof | Real classroom photography, real address, published fees, founder byline, certificate verification | **Rare for the category**; still under-used in layout |
| SEO | Canonical host fixed to `www.cea.ng`, static sitemap, per-page head helpers, JSON-LD org/business/website | **Solid**, needs hub/internal-link discipline and indexing ops |
| AdSense plumbing | `/ads.txt` with `pub-9117572925263537`, `google-adsense-account` meta, privacy policy §6 on advertising, consent banner, `src/lib/adsense.ts` with path exclusions, `AdSlot` components deliberately rendering `null` | **Correctly cautious** — tag off by default, no fake ad boxes |
| Monetisation gaps | No Google-certified CMP, no ad unit spec, no policy lint, thin/empty public pages still indexed, application state undocumented | **Blocks clean approval** |
| Product depth | ~30 role workspaces, RBAC server-side, 55+ migrations, 878 backend tests | **Far ahead of the public site** — the public site is now the bottleneck on the business |
| Known risks | Thin utility pages (`/stories`, `/marketplace`, `/library` empty-state), reliance on one founder, no measured Core Web Vitals baseline, no CMP, no documented AdSense application history | **Manageable, listed in §9** |

**The strategic asymmetry:** CEA has already built far more platform than its market can currently see. The next unit of effort does not belong in new features. It belongs in making the *visible* site undeniably excellent — proof, clarity, speed, and a body of writing nobody else in the market can match. This plan spends effort there.

---

## 2. Purpose, positioning and promise

### 2.1 Positioning statement (internal)

> For adults in Port Harcourt who need digital skill they can use at work next week, **Cyber Elias Academy** is the training centre that teaches one real task at a time, publishes the fee, the weeks and the deliverable before you pay, and certifies the *thing you made* — not the hours you sat. Unlike course marketplaces and online video libraries, CEA is a room on Ebony Road with machines, a teacher, and a free written curriculum you can read before you ever walk in.

### 2.2 The promises the site is allowed to make

| Promise | Where it must be evidenced | Never say |
|---|---|---|
| "You will produce a named deliverable" | Course page deliverable block + certificate page | "Guaranteed job", "placement promise" |
| "Fees are published before you apply" | Fee card on every course page and `/classes` | "Affordable" without a number |
| "Two sessions a week, at a machine" | Schedule block, photographed classroom | "Flexible learning" |
| "Free lessons you can read now" | 210-lesson corpus, no signup | "Premium content" |
| "A real person answers" | Contact SLAs, WhatsApp, named staff | "24/7 support" |
| "We correct our mistakes" | `/editorial` corrections policy, dated reviews | Silent edits |

### 2.3 Audience segments (design must serve all five, in this order)

1. **The nervous beginner** (school leaver, trader, church admin) — 360px Android, 3G, low confidence, reads slowly, fears being laughed at. *Design for this person first; everyone else is easier.*
2. **The working adult upgrading** (office staff, NYSC, small-business owner) — needs evening-friendly schedule and a fee they can plan for.
3. **The parent/sponsor** paying — needs legitimacy, address, staff names, safety, refund policy.
4. **The institutional buyer** (school, NGO, iDICE/Wootlab evaluator, employer) — needs curriculum depth, verifiable certificates, capacity, reporting.
5. **The self-learner who will never enrol** — the AdSense/authority audience, and the largest top-of-funnel source of word-of-mouth.

### 2.4 Success metrics (the operating dashboard)

| Metric | Definition | Source | 90-day target | 12-month target |
|---|---|---|---|---|
| Verified enrolments / week | Paid or confirmed intake records | D1 `enrolments` | baseline +40% | 3× baseline |
| Apply-page conversion | `apply_started → application_submitted` | GA4 + Worker events | 45% | 60% |
| Course page → apply click | Outbound to `/apply` per course page | GA4 | 12% | 20% |
| Organic sessions | GSC + GA4, non-brand share | GA4 | +80% | 4× |
| Indexed-quality pages | Pages ≥600 rendered words, indexable | weekly crawl | 60 | 120+ |
| Lesson reach | Sessions on `/blog/*` | GA4 | 35% of organic | 50% |
| LCP p75 (mobile) | Field data | Vercel Speed Insights / CrUX | < 2.5 s | < 1.8 s |
| INP p75 | Field data | same | < 200 ms | < 120 ms |
| CLS p75 | Field data | same | < 0.05 | < 0.02 |
| Accessibility | Template-level WCAG 2.2 AA audit | manual + axe CI | 5 templates pass | all templates pass |
| Return readers | 7-day returning users on `/blog` | GA4 | 8% | 15% |
| AdSense | Status | AdSense console | application filed with all gates green | approved + policy-clean 90 days |

Guardrails (never trade against): no fabricated proof, no dark patterns, no ad near a conversion control, no page shipped without an owner.

---

## 3. The full cast: every role this site conceivably needs

Forty roles across nine pods. The point of naming all forty is not to hire forty people — it is to make sure that for every kind of judgment the site requires, *somebody* owns it. On a lean team one person wears four hats; the hats still exist, and the checklist still applies. Full charters, week-one deliverables, rituals and KPIs are in [`role-activation-matrix.md`](./role-activation-matrix.md).

### Pod 0 — Direction & governance
| Role | Owns | Signature artifact |
|---|---|---|
| Executive sponsor (Founder) | Purpose, truth of claims, final call on fees/offers | Signed "claims register" |
| Product director | Roadmap, prioritisation, release gates | Quarterly plan + scorecard |
| Academy operations lead | Timetable, capacity, intake reality | Live class calendar synced to site |
| Finance & business manager | Fees, margins, payment flows, AdSense payee | Fee model + monthly P&L view |
| Legal counsel (NG) | Consumer, education, advertising and data law | Reviewed terms/privacy/refunds |
| Data protection officer | Consent, retention, DSARs | Records of processing + consent matrix |
| Risk & QA governor | Gate discipline, audit cadence | Gate log with evidence links |

### Pod 1 — Brand, research & design
| Role | Owns | Signature artifact |
|---|---|---|
| Design director | Coherence of the whole visual argument | Design principles + critique notes |
| Brand & identity designer | Logo system, palette, type, tone marks | Brand sheet (tokens + usage) |
| UX researcher (novice learners) | What real beginners can and cannot do | 8 moderated session clips + findings |
| Information architect | URL, nav, taxonomy, findability | Sitemap + nav model + redirect map |
| UI / visual designer | Page-level composition | Component specs + page comps |
| Motion & interaction designer | Feel, transitions, feedback | Motion spec + reduced-motion parity |
| Art director (photo & illustration) | Real classroom imagery, captioned honestly | Shot list + illustration system |
| Accessibility specialist | WCAG 2.2 AA, assistive-tech flows | Audit report + remediation tickets |
| Content designer (UX writer) | Microcopy, errors, empty states | Copy deck per template |

### Pod 2 — Frontend craft
| Role | Owns | Signature artifact |
|---|---|---|
| Frontend lead | Architecture, code review bar, budgets | ADRs + budget enforcement |
| Next.js/React engineers | Pages, components, data wiring | Shipped routes |
| Design-systems engineer | Tokens, primitives, drift prevention | `styles.css` token contract |
| Performance engineer | CWV, JS/image budgets | Budget report per release |
| Technical SEO engineer | Rendering, schema, crawlability | Schema matrix + crawl diff |
| Accessibility engineer | Semantic markup, focus, ARIA correctness | axe-clean templates |
| Content-tooling engineer | CMS/data pipeline for 210+ lessons | Authoring workflow + validators |

### Pod 3 — Platform, security & reliability
| Role | Owns | Signature artifact |
|---|---|---|
| Backend engineer (Workers/Hono) | `/v1` correctness, RBAC | Route allowlist + tests |
| Data engineer (D1) | Schema, migrations, seeds, integrity | Migration ledger + seed parity |
| DevOps / release manager | Deploy safety, rollback, env parity | Release checklist + revision proof |
| Security engineer | Auth, sessions, secrets, headers | Threat model + CSP |
| SRE / observability | Uptime, errors, p75 latency | Dashboards + alert routes |
| QA automation engineer | Playwright suites, visual regression | Green CI on 3 templates × 2 viewports |
| Test-data steward | Seeds/mocks that never lie | Demo-data manifest |

### Pod 4 — Curriculum & editorial (the moat)
| Role | Owns | Signature artifact |
|---|---|---|
| Editor-in-chief | Voice, standards, publish/no-publish | Style guide + read-back notes |
| Instructional designer | Session → lesson → assessment alignment | Learning-objective map |
| Subject teachers (Office, Design, Web, Repairs, Security) | Technical truth of each lesson | Reviewed lesson with byline |
| Copy editor | House style, Nigerian English, plain language | Edited draft + reading level |
| Localisation lead | Naira, NEPA, POS, WhatsApp, local idiom | Localisation glossary |
| Content operations manager | Calendar, pipeline, SLAs, freshness | Production board + 180-day refresh queue |
| Multimedia producer | Photo/video/audio, captions, consent | Asset library with rights |
| Fact-checker / curriculum reviewer | Independent verification before publish | Review sign-off per lesson |
| Reference editor | Glossary, internal links, canonical definitions | Glossary graph |
| SEO content strategist | Topic map, intent, internal links | Cluster map + brief backlog |

### Pod 5 — Growth & digital presence
| Role | Owns | Signature artifact |
|---|---|---|
| Head of growth | Funnel model, experiments, channel mix | Growth model + test log |
| SEO manager | Rankings, indexing, technical+content SEO | Weekly GSC review |
| Local SEO / GBP manager | Maps, reviews, citations, NAP | GBP posting calendar |
| Community manager (WhatsApp-first) | Groups, DMs, response SLAs | Answer library + SLA report |
| Social & video producer | YouTube, TikTok, IG, captions | 8-video series + repurposing map |
| Lifecycle / email marketer | Welcome, nurture, re-engage | 6-email onboarding sequence |
| Partnerships lead (schools, NGOs, employers) | Institutional pipeline | Partner one-pager + pipeline |
| PR & reputation lead | Local press, awards, crisis comms | Press kit + 5 story angles |
| Paid media buyer | Search/social acquisition with stop-loss | Channel budget + CAC log |
| Analytics & measurement lead | Event taxonomy, dashboards, truth | Tracking plan + dashboard |
| CRO / experimentation lead | Page-level conversion tests | Test backlog + results |
| Referral & ambassador manager | Word-of-mouth engine | Referral mechanics + alumni kit |

### Pod 6 — Monetisation & commerce
| Role | Owns | Signature artifact |
|---|---|---|
| AdSense / monetisation manager | Policy compliance, placements, reporting | Placement map + policy lint |
| Sponsorship & partnership revenue | Clearly-labelled local sponsors | Rate card + disclosure rules |
| Commerce ops | Shop/merchant feeds, fulfilment honesty | Catalogue + returns policy |
| Pricing analyst | Fee tiers, instalments, scholarships | Price architecture |

### Pod 7 — Admissions, success & proof
| Role | Owns | Signature artifact |
|---|---|---|
| Admissions counsellor | Reply speed, honest guidance, booking | Response templates + SLA |
| Student success / onboarding | First-week experience, attendance | Onboarding script |
| Support operations | Tickets, WhatsApp queues, escalations | SLA + escalation matrix |
| Certificate & verification officer | Public verification correctness | Verification runbook |
| Alumni community manager | Stories, referrals, employer links | Alumni story consent pack |

### Pod 8 — Agentic & AI roles (already encoded in RBAC)
`marketing`, `growth`, `conversion-copy`, `product-marketing`, `behavioral-design`, `localization`, `design` exist as roles in `src/data/rbac.ts`. They are useful as **assistants with a human signer**, never as authors of record: AI drafts, a named human reviews and is credited. Disclosure lives on `/editorial`. Any AI-produced copy that states a fact must cite a human-verified source or be cut.

---

## 4. Information architecture of excellence

### 4.1 Route doctrine (applies to all ~400 URLs)

| Rule | Test |
|---|---|
| **One job per URL** | You can state the page's single job in one sentence, and the page's primary action matches it. |
| **One address forever** | `/classes` and `/blog` are permanent. A rename needs keyword-demand evidence **and** a tested one-to-one 301 map. The canonical-host indexing incident (`docs/search-console-indexing-2026-10.md`) already cost this site 197 URLs; do not re-open that class of failure for a prettier path name. |
| **No orphan pages** | Every indexable URL is linked from at least one hub and one sibling. |
| **No dead ends** | Every page ends with a next step (course, lesson, apply, contact), never a bare footer. |
| **No empty shells in the index** | If a page needs an API that may fail, it ships a server-rendered fallback with real content, or it is `noindex` until it does. |
| **Depth over count** | A page under ~600 rendered words is either (a) a form/utility page, (b) a hub with real listings, or (c) not indexable. |
| **Truth in the title** | Titles describe what's on the page; no keyword stuffing, no year-spam. |

### 4.2 The hub-and-spine model

```
Home (promise + proof + 3 entry paths)
├── /classes ──────────────── 13 course pages (fee, weeks, deliverable, FAQ, apply)
│   ├── /classes/<course> ─── course detail
│   └── /classes/<course>/<session> ─ 142 class lectures
├── /blog ────────────────── 210-lesson corpus, chapter hubs
│   ├── chapter hubs (e.g. /blog?chapter=the-first-sitting)
│   └── lesson pages (byline, reviewed date, figures, self-check)
├── /glossary ─────────────── canonical definitions, linked from every lesson
├── /career-guides ────────── what the skill is for, in Nigeria
├── /library, /resources ──── free toolkits, worksheets, printable guides
├── /about, /team, /editorial, /stories, /work ─ proof and accountability
├── /pricing, /scholarships, /refunds ─ money, plainly
├── /visit, /contact, /faq, /certificates/verify ─ reassurance and verification
└── /apply ────────────────── the one conversion form
```

**Home page doctrine.** In the first screenful on a 360px phone: what CEA is, where it is, the three most-asked facts (fee range, weeks, sessions/week), and two buttons (`View courses`, `Apply`). Proof below the fold: real classroom photo with a real caption, the deliverable idea, the founder's face and voice, one lesson sample. No carousel, no autoplay, no stock imagery, no "welcome to excellence" filler.

### 4.3 Internal linking rules

- Each lesson links to **3 siblings** (previous/next/chapter), **1 glossary term minimum**, **1 relevant course page**, and its **chapter hub**.
- Each course page links to **2 free lessons from its own subject** ("read before you pay") — this is both honesty and conversion.
- Each glossary term links to the lessons that use it and the course that teaches it.
- Anchor text is literal ("spreadsheet formulas", not "click here"); no exact-match anchor farms.
- Every page has breadcrumbs rendered visually **and** in `BreadcrumbList` schema.

---

## 5. The design argument (summary)

The full art direction lives in [`docs/masterpiece-design-spec.md`](../docs/masterpiece-design-spec.md). The thesis in five lines:

1. **Daylight, not cinema.** Light-first public pages; ink and ember already in the tokens; dark theme available, never the default for learners. A school should look like a place you can walk into at 10am.
2. **Type does the work.** Bricolage for display, Geist for body, Instrument Serif for the human aside, Geist Mono for labels and fees. Reading measure 62–72ch, body ≥17px mobile, line-height ≥1.6.
3. **Photograph the real room.** Six to twenty-four honest, dated, captioned photographs of Ebony Road — machines, hands, whiteboard — replace every stock image. Never photograph a learner as a subject of pity.
4. **Fees are a design feature.** A receipt-like module on every course page: what you pay, what you bring, what you leave with. Tabular numbers, no rounding theatre.
5. **Motion is a courtesy, not a show.** 120–320ms, enters only on first view, fully disabled under `prefers-reduced-motion`, never blocks reading or input, and never costs a Core Web Vital.

**Signature moments** (the things people describe to a friend): the "four things" hero diagram; the deliverable gallery of real learner work; the six-beat class rhythm rail; the reading-position spine on lessons; the printable course guide; "ask the notes" search that understands *NEPA*, *flash*, *browse*; the receipt-style fee card; the founder's letter in his own voice.

---

## 6. The content engine (the moat, and the AdSense asset)

### 6.1 Thesis

Own one territory: **"the beginner's computer, in Nigeria, explained without condescension."** Not "tech in Africa". Not "learn coding". The specific, under-served, high-intent space where somebody types *"how to type fast on computer"*, *"what is a folder"*, *"how to use Excel for shop records"* — in Nigerian English, at Port Harcourt prices, by a teacher with a classroom.

### 6.2 Corpus targets

| Content type | Today | 30 days | 90 days | Notes |
|---|---|---|---|---|
| Lessons (`/blog/*`) | 210 | 225 | 260 | 900–1,400 words each; 4/week sustainable |
| Chapter hubs | partial | 24 | 30 | Each hub: 400-word orientation + ordered list + "start here" |
| Course pages | 13 | 13 | 13 (deepened) | Add modules, schedule, FAQ, deliverable, pre-read lesson |
| Glossary terms | 120-ish | 150 | 200 | Each with a lesson link and one worked example |
| Career guides | ~12 | 12 | 18 | Nigerian salary ranges **only if sourced**; else omit |
| Proof pages | thin | strong | strong | Real photos, real learner work (consented), founder letter, corrections log |
| Printable worksheets | few | 15 | 30 | PDF, ≤2 pages, usable offline — also earns links |

### 6.3 Lesson template (non-negotiable elements)

1. Plain-language promise in the first 40 words ("By the end you will be able to…").
2. A named human situation (as in the existing lesson voice) — never a fictional statistic.
3. Numbered, screenshot-free steps that assume the reader can only see words.
4. **2–4 original figures** (`public/images/classes/…`, diagrams not fake screenshots).
5. A **"if this went wrong"** section (the black screen, the dead mouse, the wrong folder).
6. A **60-second self-check** with answers.
7. **Sources and reviewed date** with the reviewer's name.
8. **Next step**: the sibling lesson + the course that goes further.
9. Reading time computed from the body (never hand-written).

### 6.4 Editorial integrity (this is also AdSense's trust test)

- Author page for every teacher/editor with credentials and photo; reviewer byline on every technical lesson.
- `/editorial` states the standards, the AI policy, the corrections policy and how to report an error, with a response SLA.
- A **claims register** (owner: executive sponsor) listing every factual/numeric claim on the public site and its evidence. Nothing on the site exists outside the register.
- Advertising independence clause: ads are never placed to imply endorsement, and editorial decisions are made before ad inventory exists.
- Refresh every lesson at 180 days; show `reviewed` dates publicly.

### 6.5 Production cadence (lean but real)

| Day | Work | Owner |
|---|---|---|
| Mon | Brief 4 lessons from the queue; assign SME | Content ops |
| Mon–Tue | SME voice memo (10 min) → draft | Teacher + AI assist |
| Wed | Instructional review + localisation pass | Instructional designer |
| Thu | Copy edit, figures, links, self-check | Editor + art |
| Fri | Independent fact-check → publish + schedule social | Fact-checker |
| Fri | 30-minute metrics + queue triage | Product director |

Never thin a lesson to hit a number. `docs/tutorial-master-prompt.md` already states this rule; the scorecard enforces it (word count + figure count + self-check presence checked by script).

---

## 7. Technical excellence: the gates that make it feel effortless

### 7.1 Performance budgets (mobile p75, Nigerian networks)

| Page type | LCP | INP | CLS | JS (gz) | Images | Fonts |
|---|---|---|---|---|---|---|
| Home | ≤ 1.8 s | ≤ 120 ms | ≤ 0.02 | ≤ 180 KB | ≤ 220 KB | 2 preloaded |
| Course page | ≤ 1.8 s | ≤ 120 ms | ≤ 0.02 | ≤ 160 KB | ≤ 300 KB | 2 |
| Lesson (long) | ≤ 2.0 s | ≤ 150 ms | ≤ 0.02 | ≤ 140 KB | ≤ 350 KB total | 2 |
| Apply | ≤ 2.0 s | ≤ 150 ms | ≤ 0.02 | ≤ 200 KB | 0 | 2 |

Enforcement: Lighthouse CI on 6 templates, Vercel Speed Insights field data reviewed weekly, a bundle-size check in CI, and a hard rule that no new client component ships without a measured justification.

### 7.2 Accessibility (WCAG 2.2 AA) — template-level, not page-level

Mandatory: keyboard-complete flows for course finder, apply, search and cookie banner; visible focus ≥ 2px; target size ≥ 24×24px; contrast body 7:1 / large 4.5:1 / non-text 3:1; form errors announced and linked to fields; no motion without a reduced-motion alternative; captions and transcripts for every video; plain-language reading level (target Grade 8); alt text that says what the image teaches, not "image".

Verification: axe-core in Playwright on 5 templates × 2 viewports (zero serious/critical), a quarterly manual keyboard + TalkBack pass, and a screen-reader script kept in the repo.

### 7.3 SEO engineering

- Canonical host `https://www.cea.ng` everywhere (already fixed) — verify in sitemap, JSON-LD, emails and redirects after every release.
- Sitemap index (sections: pages, classes, lessons, glossary) with accurate `lastmod`; `robots.txt` sitemap pointer; no `noindex` leaks (weekly check).
- Schema matrix: `EducationalOrganization` + `LocalBusiness` (with `geo`, `openingHoursSpecification`, `priceRange`, `hasMap`), `WebSite` + `SearchAction`, `Course` per course with `offers` in NGN, `Article`/`LearningResource` for lessons with `author`, `reviewedBy`, `dateModified`, `BreadcrumbList` site-wide, `FAQPage` only where FAQs are visible, `VideoObject` for each video, `Person` for staff, `ImageObject` for classroom photos. Validate in Rich Results Test before release.
- Indexing operations: weekly GSC review (indexed vs published drift, queries, CTR), a monthly crawl diff to catch accidental `noindex`, and first-party linking for every new URL the same day it ships.

### 7.4 Reliability, privacy and security

- Error budget and alert routing (Sentry + uptime check from Lagos); a public `/status`-style honesty at the support level, not a fake page.
- Consent-gated analytics and ads; no third-party script may load before consent; CSP with explicit allowlists; HSTS; no secrets in client bundles.
- Deployment proof: record the exact commit + revision in release notes; a healthy old deployment is not evidence of a new one (already policy — keep it).
- Annual: dependency audit, penetration test, restore drill, DSAR dry run.

---

## 8. Digital presence: how the site becomes findable, shareable and talked about

### 8.1 Owned
| Asset | Standard | Cadence |
|---|---|---|
| Website + PWA | Offline-readable lessons, installable | Continuous |
| Google Business Profile | Real photos weekly, correct categories, services, Q&A seeded, posts | Weekly |
| YouTube | 8-video beginner series, screen-recorded, captioned, embedded in lessons | 1/week |
| WhatsApp Channel + admissions number | Answer library, ≤2h response in business hours, no spam | Daily |
| Email list | 6-email onboarding, monthly lesson digest | Monthly |
| Alumni network | Stories, referrals, employer leads | Monthly |

### 8.2 Earned (the compounding channel for a local academy)
1. **School partnerships** — free digital-literacy clinic for SS3/NYSC; the school links to the free curriculum. Target 5 schools in 90 days, each with a named contact and a scheduled date.
2. **Local press** — five real story angles: the free 210-lesson curriculum; iDICE Skills-to-Jobs delivery; what Port Harcourt employers actually ask for; the Ebony Road classroom; a learner's own story (with consent).
3. **Programme credibility** — iDICE/Wootlab, Rivers State ICT bodies, NITDA/Nigeria Digital Economy channels: get listed as a delivery partner where true, and publish the evidence.
4. **Citations/NAP** — VConnect, BusinessList.com.ng, Finelib, Nigeria Business Directory, Google Maps, Bing Places, Apple Maps. Identical name, address, phone.
5. **Utility links** — printable worksheets and the free curriculum get linked by teachers, blogs and Facebook groups because they are genuinely useful.

### 8.3 Paid (small, measurable, disposable)
- Google Search: exact-intent terms only (*computer training Port Harcourt*, *graphic design school Port Harcourt*, *Excel training Port Harcourt*), ₦ budget capped weekly, stop-loss if cost per application exceeds one course fee / 5.
- Meta/WhatsApp click-to-message within 15 km radius, creative = real classroom photo + fee + start date.
- Never buy display traffic. Never buy clicks. (Also an AdSense policy requirement.)

### 8.4 Measurement discipline
One tracking plan, one dashboard, one weekly review. Events: `lesson_view_50`, `lesson_complete`, `course_view`, `fee_block_view`, `apply_start`, `apply_step`, `application_submitted`, `whatsapp_click`, `call_click`, `certificate_verify`, `guide_download`. Nothing is "launched" until its event is verified in debug view.

---

## 9. Risk register (top 12)

| # | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| 1 | AdSense rejected repeatedly, wasting weeks | Med | Med | Gate-first application (see playbook); do not re-apply without material change; log each attempt | Monetisation mgr |
| 2 | Site perceived as AI-generated content | Med | High | Named human bylines + reviewer + real photos + voice memos in the pipeline; publish AI policy | Editor-in-chief |
| 3 | Ad revenue disappoints and distracts | High | Med | Treat as subsidy; cap effort at 1 day/month post-approval; enrolment is the business | Founder |
| 4 | Thin/empty pages still indexed | Med | High | Page doctrine + weekly crawl; `noindex` until content exists | SEO manager |
| 5 | No learner proof to show | High | High | Consent pipeline + photo/video releases + deliverable gallery; start this week | Alumni mgr |
| 6 | Single-founder bus factor | High | High | Documented runbooks, second editor trained, credential escrow, delegation of replies | Founder |
| 7 | Payment friction (transfers, POS, receipts) | Med | High | Publish bank + receipt steps, WhatsApp confirmation, Paystack fallback, 24h reconciliation SLA | Finance |
| 8 | Poor performance on cheap Android | Med | High | Budgets + real-device test matrix (Tecno/Infinix/itel class) each release | Perf engineer |
| 9 | Accessibility regressions | Med | Med | axe CI + quarterly manual pass + PR checklist | A11y engineer |
| 10 | Programme pages over-claim and damage trust | Low | High | Claims register + reviewer sign-off; "never say" column in §2.2 | Sponsor |
| 11 | WhatsApp/Facebook dependency | Med | Med | Own the email list and the site; use platforms as channels only | Growth |
| 12 | Security/privacy incident | Low | High | CSP, consent gating, pen test, incident runbook, DPO review | Security |

---

## 10. Roadmap: 16 weeks to a defensible, approvable, beautiful site

Every phase has a **gate** — a binary test with evidence linked in the gate log. No phase starts until the previous gate is green.

### Phase 0 — Evidence freeze (weeks 1–2)
- Record the baseline: CWV field data, crawl of all public URLs with word counts, broken links, indexed count, quality issues, AdSense account state and any past rejection reasons.
- Decide and write down: ads strategy (corpus-only), consent approach, ad placement map.
- Publish nothing new; only measure.
**Gate 0:** a single baseline report exists, signed, with numbers for every metric in §2.4.

### Phase 1 — Trust and completeness (weeks 3–6)
- Every indexable public page either has ≥600 words of real substance or is `noindex` until it does (`/library`, `/stories`, `/marketplace`, `/virtual-tour`, `/work`, `/alumni`, `/programs/compare` first in queue).
- Course pages: deliverable, fee card, weeks, sessions, requirements, schedule, FAQ, "read before you pay" lesson, apply CTA.
- Proof layer: 24 real photos with captions; founder's letter; staff pages with credentials; certificate verification explained; refunds and privacy rewritten for advertising.
- **Authoring pipeline (P0):** lesson bodies move to MDX/JSON with a typed schema, plus a CI validator (words, figures, self-check, sources, reviewer, computed reading time, internal links) and a preview route — so a teacher publishes a compliant lesson without touching TypeScript. See `docs/chatgpt-blueprint-review-2026-10-25.md` §2.1.
- Performance pass to budget on 6 templates; axe-clean on 5 templates. Add Lighthouse CI, axe and a bundle budget to the pipeline (CI currently gates build, lint and backend tests only).
**Gate 1:** zero thin indexable pages; LCP p75 < 2.5 s; zero serious a11y violations; every claim in the register evidenced.

### Phase 2 — Authority (weeks 7–12)
- 4 lessons/week to 225; 24 chapter hubs; 30 new glossary terms; internal-link pass across the corpus.
- Author pages, `/editorial` AI + corrections policy live; 180-day review queue running.
- Digital presence: GBP discipline, 8 videos, 5 school partnerships, 3 local press pieces, citations complete.
- Email onboarding + monthly digest live; WhatsApp answer library with SLAs.
**Gate 2:** 60+ indexable pages ≥600 words; 40+ referring domains; organic non-brand sessions up ≥80% from baseline; 8 videos published; 5 partner schools signed.

### Phase 3 — AdSense (weeks 13–16)
- Run the playbook pre-flight; wire the certified CMP (or Google's consent message); implement ad units with reserved space and lazy load; policy lint in CI.
- Apply, then **freeze the content model** for the review window (no mass changes, no new networks).
- Draft the rejection-response plan before it is needed.
**Gate 3:** approval, or a documented remediation cycle with every rejection reason mapped to a completed change.

### Phase 4 — Compounding (months 5–6)
- Ads live only on eligible pages; 30-day policy-clean streak; revenue reported monthly, capped effort.
- CRO on `/classes` → `/apply` → paid (test fee module, evidence block, WhatsApp assist).
- Learner stories and a consented deliverable gallery; alumni referral mechanic.
- Offline PWA lessons verified on a real device; print stylesheet for the course guide.
- Second language exploration only after English corpus stabilises; otherwise deepen.
**Gate 4:** enrolments 3× baseline; LCP < 1.8 s; ads policy-clean; scorecard average ≥ 4.0/5.

---

## 10b. Scope guard and procurement rules

### The do-not-build list (until a gate proves otherwise)

A custom LMS · a second mobile app (two exist) · a bespoke video platform · a 3D or cinematic hero · an AI tutor · a new visual identity or palette change · URL restructuring (`/classes` → `/courses`, `/blog` → `/learn`) · replatforming (WordPress or any CMS migration) · mass content expansion before the existing corpus is deepened. Each of these has a plausible champion and no evidence behind it yet.

### If external help is hired

- Pay against **accepted deliverables with evidence**, not calendar dates (e.g. 15% discovery · 20% design approval · 30% working staging · 20% content/SEO/QA · 15% launch handover).
- Contract for: IP ownership, access transfer, handover documentation, warranty, third-party costs, change-request process.
- The academy — not the vendor — signs off factual claims (the procurement form of the claims register).
- No lock-in: CEA owns domain, hosting, repository and all accounts at every point.
- Reject any proposal whose scope includes work already in this repository: see `docs/chatgpt-blueprint-review-2026-10-25.md` §3.3 before approving a budget.

## 11. Resourcing: what it actually takes

### 11.1 Lean reality (solo founder + AI + 2 part-time)
| Capability | Allocation | Monthly cost band (NGN, planning estimate) |
|---|---|---|
| Founder (all Pod 0 hats + admissions) | 25 h/week | — |
| Instructional editor / copy editor | 20 h/week | 150,000–300,000 |
| Teacher-SME reviews (per lesson) | 4 × ₦15,000 | 60,000 |
| Photo/video (half-day monthly) | 1 shoot/month | 80,000–150,000 |
| Frontend contractor (sprints) | 30 h/month | 200,000–400,000 |
| Tools (Vercel, Sentry, GA4, CMP, design) | — | ≈$60–120 (₦90,000–180,000) |
| **Total** | | **≈₦600,000–1,100,000 / month** |

### 11.2 Full pod (when revenue supports it)
Add: design director (fractional), performance engineer (fractional), SEO manager, community manager, partnerships lead, analytics lead, DPO (fractional/legal retainer), QA automation. Budget ≈₦2.5–4.5m/month, and only once enrolment revenue can carry it.

### 11.3 Founder's weekly time budget (the honest version)
- 6 h — teaching & class reality (this is the content source)
- 5 h — editorial: one lesson reviewed personally, claims register
- 4 h — admissions replies and conversion
- 3 h — growth: one partnership call, one post, one press follow-up
- 2 h — review: metrics, gate log, scorecard
- *Zero hours* — dashboards that do not change a decision.

---

## 12. Governance and cadence

| Ritual | When | Output | Owner |
|---|---|---|---|
| Metrics triage | Mon, 30 min | 3 decisions max, each with an owner | Product director |
| Design critique | Fortnightly, 45 min | Notes on one template, shipped changes | Design director |
| Content board | Weekly, 30 min | Queue, blockers, publish list | Content ops |
| Gate review | End of phase | Gate log entry with evidence links | Risk & QA governor |
| Scorecard review | Monthly | Scores, deltas, two improvement actions | Product director |
| Full audit | Quarterly | Accessibility + content freshness + security | Risk & QA governor |

**Decision rules.** (1) If a change cannot be tied to a metric or a gate, it waits. (2) If a claim cannot be evidenced, it is cut, not softened. (3) If a page cannot be finished this month, it is not indexed this month. (4) Ads never move editorial, layout of reading content, or conversion controls. (5) Anything shipped without an owner is deleted in the next sprint.

---

## 13. Definition of masterpiece (the test the whole plan exists to pass)

1. A nervous beginner finds a course for a task she can name, sees the fee before she is asked for her phone number, and applies in under four minutes on a 3G phone.
2. Every fact on the site has a source, a date and an owner.
3. The free lessons are good enough that a stranger would pay for them, and they are given away.
4. The photographs are of the actual room, taken this year, captioned with what happens there.
5. The site is fast on the worst phone the audience owns, and readable by someone using a screen reader or a cracked screen.
6. Nothing on the site claims a result the academy has not produced.
7. A reviewer — human or Google — sampling any ten pages finds substance, clarity and a next step on all ten.
8. The one number that matters (verified enrolments) moves, and the team can explain why.
9. Ads earn a small honest subsidy without costing a single enrolment or a single point of trust.
10. Someone who visits once describes it to a friend in a sentence that is true.

---

## Appendix A — Immediate next ten actions (this week)

1. Run the baseline crawl and record every metric in §2.4 (evidence, dated).
2. List every indexable URL under 600 rendered words; decide content-or-`noindex` for each, with a date.
3. Start the learner-proof pipeline: one consent form, one photo release, three deliverable photos.
4. Fix the six highest-traffic templates to the performance budget; measure before/after.
5. Write and publish `/editorial` (standards, AI policy, corrections, reviewer bylines).
6. Build the claims register (every number and promise on the public site, with evidence).
7. Wire the consent decision: Google consent message or certified CMP, integrated with the existing banner (one prompt, not two).
8. Implement the ad placement map in code behind a flag, with reserved space and lazy load — no live units until approval.
9. Freeze a 4-week content queue (16 lessons, 4 hubs, 10 glossary terms) with named owners.
10. Book the first school clinic and the first local press conversation.

## Appendix B — Related documents in this repository

- `docs/tutorial-master-prompt.md` — how a lesson must be taught (keep as the authoring law).
- `docs/content-style-guide.md` — house voice and formatting.
- `docs/adsense-content-audit.md` — the 2026-08 crawl findings and remediation history.
- `docs/competitor-gap-analysis.md` — market benchmarks.
- `docs/product-readiness-review-2026-10-21.md` — platform gates (do not regress these while improving the public site).
- `docs/go-live-checklist.md` — deployment and secrets procedure.
- `src/lib/seo.ts`, `scripts/generate-sitemap.mjs` — the SEO machinery this plan assumes.
