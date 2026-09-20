# Cyber Elias Academy — Public Site & Learner App

## What is possible, without implementing anything yet

**Date:** 18 September 2026  
**Status:** Design and product report only. No code, no copy rewrite, no visual redesign in this pass.  
**Purpose:** Show how the existing Lumina / CEA-OS codebase can become a **regular digital academy website and webapp** — neat, standard, professional, and free of hype — rather than a cinematic “operating system” brand.

This report is written against two facts that must stay in the same room:

1. **What CEA actually is today:** an emerging Port Harcourt academy with a short, practical computer-skills offering (the holiday programme and the 13 flyer courses), not a multi-year institution with placement statistics.
2. **Who will look at cea.ng:** parents, learners, schools, employers — and, if the iDICE bid proceeds, Wootlab and programme evaluators. The public site is evidence. It cannot contradict a truthful proposal.

---

## 1. The problem in one sentence

The platform already has the bones of a serious academy (courses, admissions, LMS, certificates, payments). The **face** of the product currently presents CEA as a dark, cinematic tech studio with an operating system, five engines, live-cohort widgets, placement promises, and career tracks CEA has not yet delivered.

That look is neither “neat” nor “standard.” It is hype — visual hype and institutional hype — and it is the wrong costume for a new academy.

---

## 2. What the current site actually is

The live product is **Lumina Studio / CEA-OS**: a public marketing site plus ~30 role workspaces on TanStack Start, talking to a Cloudflare Worker API.

### 2.1 What is already real and useful

These pieces should be **kept**, not rebuilt:

| Layer | What exists | Why it belongs in a regular academy |
| --- | --- | --- |
| Short-course catalogue | 13 flyer courses: Microsoft Office, Computer Basics & Typing, Graphic Design, Web Design, Web Development, Digital Marketing, Social Media, Data Entry, Computer Repairs, Cybersecurity (intro), Content Creation, Online Teaching, Business & Freelancing | This *is* the academy. Fees, weeks, sessions, and deliverables are concrete. |
| Class notes | Session-level lectures under `/classes/...` | A standard academy publishes a syllabus. This is the strongest honest proof of teaching quality. |
| Admissions | Apply flow, contact, visit, FAQ | Normal school operations. |
| Auth | Sign-in, sign-up, magic link, MFA, password reset | Required for any learner portal. |
| LMS core | Courses, lessons, assignments, assessments, attendance, grades, certificates | This is the webapp a digital academy actually needs. |
| Payments | Paystack, instalments | Standard for Nigerian tuition. |
| Certificate verify | Public verification page | Quiet trust signal. Evaluators and employers use this. |
| Legal / trust | Privacy, terms, accessibility, cookie consent, address at 26 Ebony Road | Expected of any registered training organisation. |
| Engineering | SSR, SEO, RBAC, D1, tests | Keep the stack. Change the **product surface**, not the infrastructure. |

### 2.2 What currently reads as hype

These are the things a parent, a Wootlab reviewer, or a careful employer would notice — and discount.

**Visual / motion**

- Dark-first “LUMINA” identity: giant outline watermark, film grain, aurora orbs, scramble text, magnetic buttons, 3D tilt cards, custom cursor, vertical coordinate labels (`04°48′N`).
- Hero type at ~9.5rem: “Learn *tech.* Build *real work.* Get hired.”
- Numbered editorial chapters, hairline motifs, glass-strong panels, ink finales.
- Default dark theme on a school website. Standard academies are light, paper-like, and readable in daylight on a phone.

None of this is “wrong” as art. It is wrong as **the public face of a small training centre**. It looks like a design studio pitching itself, not like a place that teaches Word, Excel, and computer repairs on Ebony Road.

**Institutional claims the site currently makes**

| On the site today | Why it is a problem |
| --- | --- |
| “Placement promise included” in the home header | A promise CEA cannot yet evidence. |
| Floating widget: “LIVE COHORT — 24 active — Full-Stack · Week 14 — 87% completion” | Invented operational theatre. |
| “3 offers this week — Frontend, Cloud, Security” | Fabricated placement activity. |
| Principle section stats: 87% avg. completion, 6 deployed projects, 1:8 mentor ratio | Numbers without a cohort history behind them. |
| Eight long programmes (5–9 months, ₦480k–₦980k): Full-Stack, Cybersecurity Analyst, Cloud/DevOps, Data Science & AI, Product Design, Digital Marketing & Growth, Networking & IT Support, Mobile | Curriculum *plans*, presented as running flagship tracks. |
| Five engines (Learning, Career, Services, ERP, Community) and ~30 workspaces | Internal product architecture, sold as the academy itself. |
| Marketplace jobs/gigs (Novon Energy, Kudia Fintech, etc.) | Demo data on a public surface. |
| About page: “Digital Skills Factory”, “From Zero to Expert, Together”, nine education domains, twenty “beginning areas”, school + factory + marketplace + technology company | Vision document published as current identity. |
| Events, alumni mixer, “stories”, employer network | Pages that imply a history CEA does not yet have. |

The content style guide already bans this kind of claim. The visual layer and several marketing pages violate that guide.

**Information architecture**

Primary nav today: Classes · Programs · Admissions · Pricing · Student Work · Community · About — plus a mega-menu of ~30 extra links (engines, marketplace, library of 1,958 items, glossary, career guides, scholarships, alumni…).

A regular academy nav is closer to:

**Courses · How it works · Admissions · About · Contact · Sign in**

Everything else is either a sub-page or not public yet.

---

## 3. What “regular, neat, professional, no hype” actually means

Not a cheaper version of Lumina. A different product posture.

### 3.1 Reference posture (not clones)

A standard digital academy website, anywhere in the world, does roughly the same job:

1. Say who you are and where you are.
2. Show the courses, with duration, fee, schedule, and what the learner leaves with.
3. Explain how to enrol.
4. Let enrolled people log in and do classwork.
5. Look calm enough that a parent, a school, or a government partner would trust it.

Think of the *discipline* of a well-run centre — New Horizons / NIIT-style clarity, a polytechnic short-course page, a British Council skills microsite, a quiet Coursera institution page — **not** their colours. White (or near-white) canvas, one brand colour, real photographs or none, cards with fees, a timetable, a map, a phone number.

What those sites never do on the homepage:

- Announce an operating system.
- Animate a live-cohort fake.
- Promise placement.
- Lead with AI / DevOps / 9-month software engineering if they have not run it.
- Hide the address behind atmosphere.

### 3.2 Design principles for CEA

| Principle | In practice |
| --- | --- |
| **Light by default** | Paper-white or warm off-white public site. Dark mode optional, never the first impression. |
| **One brand colour** | Keep the burgundy `#7c1034` as the only accent. Retire five-engine rainbows, gold/ember theatre, gradient text on every heading. |
| **Type that sits still** | One sans for UI and headings (Geist or Montserrat). No outline display, no italic serif punch-words, no scramble, no 9rem heroes. Homepage H1 around 2–2.5rem on mobile, ~3rem on desktop. |
| **Motion is courtesy, not identity** | Fade/slide of 200ms on page load is enough. No magnetic CTAs, tilt, parallax orbs, grain, custom cursor, or full-viewport marquees. |
| **Whitespace over texture** | Section padding, hairline borders, simple cards. No glass stacks, vignettes, or rule-grids behind copy. |
| **Photography or nothing** | Real photos of the Ebony Road room, machines, and a class (when you have them). Until then: clean typography and a course grid — not generated “scene art” pretending to be a campus. |
| **Copy names things** | “Microsoft Office — 3 weeks — ₦15,000.” Not “Pick the track that changes your next five years.” |
| **Numbers only if documented** | If we cannot attach a register, we do not put a statistic on the page. |
| **Scope matches maturity** | Public site = training centre. Learner app = class operations. CEA-OS engines stay internal until there is a reason to show them. |

That is “neat.” Neat is not minimalist-for-fashion. Neat is **nothing extra**.

---

## 4. Recommended public website

A small, complete school site. Roughly 12–18 public pages. Not 200.

### 4.1 Site map

```
/                     Home
/courses              All courses (today’s /classes)
/courses/:slug        Course detail + syllabus
/admissions           How to apply, dates, requirements, fees overview
/apply                Application form
/about                Who we are, where we are, how we teach
/contact              Address, phone, email, map, hours
/faq                  Short, practical
/privacy  /terms      Legal
/certificates/verify  Public certificate check
/auth/sign-in         Learner / staff login
```

**Optional, only if content is real:**

- `/visit` — hours, how to find 26 Ebony Road, what to bring
- `/team` — named people with real roles (not a faculty grid of placeholders)
- `/news` or `/blog` — only when there is something that happened

**Not on the public nav, and not linked as if they are live products:**

- `/engines`, `/marketplace`, `/services`, `/work` (as a studio)
- `/alumni`, `/stories`, `/events` (until they exist)
- `/programs` long-track catalogue (Full-Stack, Cloud, Data Science…) as current offering
- Library of 1,958 items, glossary-as-SEO-farm, career-guide mill — these can stay in the repo for later; they should not dominate the academy’s face

### 4.2 Homepage — the only layout that matters

A standard academy home is about **one screen of truth**, then courses.

**Header (always visible)**  
Logo wordmark “Cyber Elias Academy” · Courses · Admissions · About · Contact · Sign in · **Apply** (solid burgundy button). Phone number in a thin utility bar is acceptable and professional.

**Hero (not full-viewport, not cinematic)**  
Eyebrow: Port Harcourt · Digital skills training  
H1: **Practical computer and digital-skills training**  
One paragraph, ~40 words: who it is for, that classes are short and hands-on, campus + online where true.  
Two actions only: **View courses** · **Apply**.  
Facts as text, not counters: “13 short courses · two sessions a week · 26 Ebony Road, Port Harcourt.”

No live-cohort card. No “placement promise.” No LUMINA watermark. No showreel button unless a real 42-second video exists.

**Courses**  
A filterable grid (category chips: Office & Data · Creative · Web · Hardware · Business). Each card:

- Course name  
- Level (e.g. Absolute beginner)  
- Duration (e.g. 3 weeks, 2 sessions/week)  
- Fee in naira  
- One-line outcome (“A formatted document, a working spreadsheet and a presentation”)  
- Link: View course

This is the catalogue you already have in `src/data/academy/catalog.ts`. It is the most honest object in the whole product. Put it first.

**How a class runs**  
Four quiet steps, not a manifesto: Learn → Practise → Produce → Certificate on the work. One sentence each. Mention the teaching loop only as a timetable fact (two sessions a week, 1.5–2 hours).

**Who it is for**  
Three short audience notes — school leavers and NYSC, office/church/NGO staff, small-business owners — without “from zero to expert.”

**Campus**  
Address, a map embed, operating hours, a photo when you have one. “Visit” as a secondary link.

**FAQ**  
Five questions: prior experience, working while studying, payment, certificates, location. The existing FAQ answers are mostly usable if we strip Career Engine / employer-network language.

**Footer**  
Four columns: Courses, Academy, Legal, Contact. CAC / RC number when you want it public. No five-colour engine strip.

### 4.3 Course page (the workhorse)

This is where professionalism is won.

1. Title, fee, duration, level, category, next start date (or “enrolments open — dates confirmed on application”).
2. Who it is for.
3. What you will be able to do (the existing outcomes list).
4. Week-by-week outline.
5. Session list, each linking to the published lecture if we keep that ungated.
6. Requirements (laptop vs academy machine — already in the data).
7. Certificate: awarded for the named deliverable, not for attendance alone.
8. Apply / Enquire.

Tone: syllabus, not sales letter. The current course data is already closer to this than the homepage is.

### 4.4 About page — cut to a school story

Replace the current about (pillars, nine domains, factory/marketplace, global ambition) with four sections:

1. **What CEA is** — a digital-skills training centre in Port Harcourt, registered in Nigeria, teaching practical computer and workplace-digital skills in short courses.
2. **How we teach** — small groups, machines in front of learners, a published syllabus, a certificate tied to a piece of work.
3. **Where we are** — 26 Ebony Road; what the room contains when we have an inventory (computers, power, internet).
4. **Where we are in our life as an organisation** — one honest paragraph: the academy is at an early stage; programmes and facilities are being built in the open; we do not claim a multi-year institutional record.

That last paragraph is not a weakness on a school website. It is the difference between a centre people trust and a centre people google-check and bounce from.

### 4.5 Admissions / apply

Keep the form. Make the page look like a registrar’s desk:

- Who can apply  
- What we ask (motivation, schedule — not a technical exam for beginner courses)  
- Fees and instalments, stated as they actually work  
- What happens after you submit (acknowledgement, conversation, offer)  
- Contact if the form is the wrong channel  

No “cohorts fill fast” unless a cohort is actually capped and filling.

---

## 5. Recommended webapp (the learner / staff product)

A digital academy webapp is not 30 role cockpits. It is **the school’s classroom, office, and register**, behind a login.

### 5.1 What to put in front of users now

A single signed-in shell. Calm top bar, left nav, white content.

**Learner**

- Home: my courses, next session, outstanding work, fee status  
- Course room: sessions, notes, assignments, submit  
- Timetable / calendar  
- Attendance  
- Grades  
- Certificates  
- Messages (instructor ↔ learner)  
- Payments / receipts  
- Profile  

**Instructor**

- My courses / cohorts  
- Session register (attendance)  
- Submissions / gradebook  
- Announcements  
- Simple course materials upload  

**Admin / admissions / accounts** (one “office” workspace is enough at this size)

- Applications  
- Enrolment  
- Timetable  
- Learner records  
- Fees  
- Certificates issued  
- Users & roles  

This maps onto LMS routes and APIs **already in the backend**. The work is subtracting surface area, not inventing a new stack.

### 5.2 What to keep built but not present as the product

The five engines, employer marketplace, client studio, HR/payroll, NGO/government/volunteer portals, growth/marketing dashboards, mentorship matching, alumni network — these can remain in the repo as internal tools for later.

On a professional academy site they should not:

- appear in public navigation,
- appear in the signed-in default home,
- be described on About as if they are how CEA currently operates.

A Wootlab evaluator who logs into a demo and lands on “ERP Engine / Community Engine / 30 workspaces” will not read “capable.” They will read “unfocused.”

### 5.3 Visual language of the app

Standard SaaS-for-schools:

- Light grey canvas, white cards, 1px borders  
- Burgundy for primary actions and the active nav tick  
- Tables for registers, not kanban theatre  
- Empty states that say “No assignments yet,” not brand copy  
- No grain, no aurora, no engine colour-coding until there is one product, not five  

The current `AppShell` can be restyled into this. The information architecture of the student/instructor routes is already close.

---

## 6. Content rules (so the redesign cannot re-introduce hype)

These are mechanical. If a block fails one, it does not ship.

1. **No statistic without a source document** (register, certificate log, payment ledger).
2. **No “live,” “open cohort,” or “places limited” unless that cohort exists on the timetable.**
3. **No placement, employer network, or job-offer language** until there is a named partner and a real process.
4. **No long programme (5–9 months) on the public catalogue** until CEA has run at least one short course in that family and can name an instructor with the relevant years.
5. **Banned words unless they are in a quote from a real person:** world-class, ecosystem, operating system, factory, pipeline, flagship, transformative, from zero to expert, leading, cutting-edge, robust, vibrant.
6. **One H1, one primary button per view.**
7. **Fees in naira, durations in weeks, location as a street address.**
8. **Vision belongs in a one-paragraph “Looking ahead” on About**, not in the hero, not in the nav, not in the course cards.

The 13 flyer courses already obey most of this. The homepage, about, programs, marketplace, and engines pages do not.

---

## 7. What we would actually change in this codebase

No implementation in this pass. This is the work package, so you can see it is feasible on the existing tree.

### 7.1 Do not rebuild

- Backend, auth, RBAC, D1, Paystack, certificate verification  
- `src/data/academy/*` (the real catalogue and lectures)  
- Apply form, contact, legal pages (copy-edit only)  
- Student/instructor LMS routes (simplify chrome, do not delete capability)

### 7.2 Restyle (design system)

- Public site **light-first**; burgundy as the only brand colour  
- Drop cinematic utilities from marketing pages: grain, vignette, text-outline, scramble, magnetic, tilt, light-fields, big marquee, custom cursor  
- Header: ordinary sticky bar, text links, solid Apply button  
- Cards: white, 12px radius, 1px border, fee + duration meta, no 3D  
- Homepage H1 and section titles in the existing body/display sans at school-site sizes  

### 7.3 Re-architect information (routes stay, prominence changes)

| Today (public) | After |
| --- | --- |
| `/` cinematic Lumina home | School home as in §4.2 |
| `/classes` + `/programs` as two catalogues | `/courses` = flyer courses only; long programmes unpublished or clearly labelled “in development,” not enrolable |
| `/engines` `/marketplace` `/services` | Unlinked from public nav; 404 or staff-only later |
| `/about` vision essay | School about as in §4.4 |
| `/work` `/stories` `/alumni` `/events` | Hidden until there is evidence |
| App default = role universe | App default = learner or instructor home |

### 7.4 Copy pass (short)

Rewrite hero, nav labels, about, homepage sections, FAQ answers that mention Career Engine / employer network / placement. Leave course syllabus text largely as-is — it is already the right voice.

### 7.5 Evidence, when you have it

The site gets *better* as CEA documents real work, not as we add more pages:

- Holiday-programme case study (true numbers, true dates, photos if they exist)  
- Room photographs and a simple centre-readiness list  
- Named instructors with real CVs  
- A timetable of the next short course  

That is also the iDICE evidence pack. The website and the bid should tell the same story.

---

## 8. How this serves the iDICE application (without turning the site into a bid brochure)

Evaluators will visit cea.ng. The site should look like the organisation described in a truthful proposal:

| Bid positioning (already agreed) | What the site should therefore show |
| --- | --- |
| Emerging academy, Rivers State | Port Harcourt address, modest about, no fake history |
| Foundational digital skills, 4–6 week shape | The 13 short courses, Office / data entry / digital productivity first |
| Capacity scoped to what we can run | No 50,000-beneficiary language, no 9-month specialised tracks as current |
| Wootlab curriculum + ToT | We do not need to publish an iDICE-standard curriculum of our own |
| Qualified trainers + facility | Team and visit pages only when those people and that room are documentable |
| Honest | No 87%, no 24 active, no three offers this week |

A quiet professional site is itself a piece of **organisational capacity**: it shows CEA can present information, take applications, run a learner login, and verify a certificate. A cinematic OS site with demo jobs does the opposite.

We should **not** add an “iDICE Training Partner” banner unless and until selected. Bidding is not a public claim.

---

## 9. What we would not do

- Would not throw away the LMS, auth, or course data.  
- Would not invent a new visual identity from scratch — burgundy + clean sans + light canvas is enough, and it is already in the tokens.  
- Would not clone another academy’s layout pixel-for-pixel.  
- Would not “just tone down the animations” and leave the fake stats and five engines. Hype is content and IA, not only motion.  
- Would not put long specialised programmes on the home grid to look bigger.  
- Would not generate campus photography or student testimonials.  
- Would not ship a 30-role demo as the public product.

---

## 10. Suggested delivery, when you say go

Three visible slices. Each one should look finished on its own.

| Slice | What you would see | Effort shape |
| --- | --- | --- |
| **A. Public school site** | New home, courses index + detail, about, admissions, contact, FAQ, header/footer. Light, quiet, honest. Long programmes and engines off-nav. | Mostly marketing routes + `shell` / header / footer / tokens. Catalogue data reused. |
| **B. Learner & instructor app chrome** | Light school portal on top of existing LMS routes. Default homes as in §5.1. Other roles reachable but not advertised. | App shell + nav + a few home pages. APIs unchanged. |
| **C. Evidence pages as materials arrive** | Holiday-programme write-up, visit/centre page with real inventory, team bios. | Content, not architecture. |

Slice A is the one that changes how CEA is perceived. Slice B makes the “digital academy” part true in use. Slice C is paced by real documents, not by design.

---

## 11. Bottom line

**Yes — this codebase can be a regular digital academy website and webapp.** It already contains the hard parts: a real short-course catalogue, syllabi, admissions, login, class operations, payments, and certificate checks.

What it needs is not more product. It needs a **school face**:

- light, still, burgundy-on-white,  
- courses and address first,  
- learner portal for classwork,  
- every other engine and cinematic device put in the cupboard until CEA has the history to match them.

That is neat. That is befitting a training centre on Ebony Road. That is standard. That is professional. And it does not require claiming anything CEA has not done.

When you want to proceed, the next step is Slice A only — still no bid-writing, still no invented numbers — unless you prefer to lock copy and page list with you first.
