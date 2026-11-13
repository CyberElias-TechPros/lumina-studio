# Cyber Elias Academy — Cinematic Digital Academy blueprint

**Status:** Design proposal, not an implemented redesign<br>
**Date:** 12 November 2026<br>
**Scope:** Public website, admissions journey and the boundary with the learner portal

## 1. The brief in one sentence

Create an unmistakably CEA experience that makes a beginner feel both inspired and oriented: what can I learn, what will I make, what will it cost, and how do I start?

**Brand idea:** A new dimension of digital learning.<br>
**Human promise:** From Zero to Expert, Together — a long-term learning philosophy, not a promise of expertise after a short course.<br>
**Creative balance:** cinematic first impression, editorial storytelling, clear course information, restrained technological detail and purposeful motion. No fabricated scale, results, testimonials, spaces or people.

### Address confirmed

The owner confirmed on 12 November 2026 that **24 Ebony Road, off Rumuola Road, Port Harcourt** is correct. Keep it consistent across public copy, structured data, admissions, communications and business listings. Some signage has previously said 26; check physical signage separately.

## 2. Current foundations and constraints

- The current site is **Next.js 15 App Router**, React and Tailwind, not Vite. Source routes live in `src/routes/` and explicit Next routes are generated. Public pages are server-rendered; preserve URLs, metadata, structured data and the route-generation contract. Moving to Vite would be a separate migration with SEO, deployment and application risks, not a prerequisite for this design.
- Reuse the existing Radix-based components, marketing shell and `motion` dependency. Material UI and Three.js are not requirements; introduce neither without a proven need and a measured budget. Cloudflare Worker/D1 and Vercel already exist. R2 is a possible media choice, not an assumed existing integration.
- The course catalogue in `src/data/academy/catalog.ts` distinguishes 13 flyer courses from rotating courses. Availability and schedules must not be inferred from a category name. `CourseFinder` already offers task and experience choices. Extend these foundations rather than inventing prices or duplicating catalogue data.
- The actual classroom photos are catalogued in `src/data/academy/media.ts`; a founder portrait component already exists. Confirm permissions, accuracy and appropriate captions before reuse. Do not represent stock or AI-generated images as the academy, its learners or their work.
- `/apply` currently explains that application is free and payment is not requested until CEA confirms a deliverable timetable, equipment arrangement and place; unscheduled courses collect interest. Preserve that distinction. Payment, access and status screens must reflect the actual backend state rather than an idealised automated funnel.
- Existing UI and content have SEO, editorial, ads, accessibility, security and role-based access constraints documented in `AGENTS.md`. A visual redesign must not weaken them.

## 3. Identity system

### Signature: the CEA learning trace

Use a single fine, interrupted line that moves through six labelled nodes: **Learn → Practice → Create → Solve → Present → Certify**. The line is a visual metaphor for progress, not a fake technical dashboard. It can frame a hero image, connect methodology steps and mark progress in editorial diagrams. It never replaces text or conveys application status. Before adopting the six labels publicly, the academy must approve them: the current catalogue describes a different teaching loop (Learn, Practice, Create, Correct, Repeat, Demonstrate). Do not imply certification is automatic; state actual assessment and award conditions.

Build recognition through the trace, numbered editorial chapters, a consistent type system and genuine images—not through a constant neon effect. Maximum two signature elements per page; the portal uses neither decorative trace nor cinematic transitions.

### Colour tokens (proposed, verify contrast in implementation)

| Token         | Value     | Role                                             |
| ------------- | --------- | ------------------------------------------------ |
| Midnight      | `#101923` | Dark hero, closing panel, primary ink            |
| Deep blue     | `#163B7A` | Links and interactive text on light surfaces     |
| Electric blue | `#326FF5` | Primary actions on dark surfaces, active details |
| Cyan          | `#74D7E7` | Small highlights and trace nodes, not body copy  |
| Ivory         | `#F6F5F0` | Main editorial canvas                            |
| Paper         | `#FFFFFF` | Cards, fields and reading surfaces               |
| Silver        | `#66717C` | Supporting text on light backgrounds             |
| Light rule    | `#D7DCE0` | Dividers and card boundaries                     |

Dark sections should use near-white text; light sections use midnight text. Verify all real pairings against WCAG AA: normal text 4.5:1, large text 3:1, meaningful controls and focus indicators 3:1 against adjacent colours. In particular, do not assume white text on electric blue or silver on ivory passes; choose a darker action fill or dark text where needed. Keep accents sparse. Light surfaces dominate reading and forms; dark sections are deliberate bookends.

### Typography and structure

- Use the existing locally packaged **Geist** variable for interface and body; **Bricolage Grotesque** for display headings; **Geist Mono** only for chapter numbers, data labels and small technical annotations. An occasional Instrument Serif quotation may be used for a genuine founder statement, never for critical form content.
- Desktop hero: `clamp(3rem, 5.6vw, 5.5rem)`, line-height 0.98–1.05, max 12–14 words per line group. Section headings: `clamp(2rem, 3.5vw, 3.5rem)`. Body: 16–18px / 1.55–1.7. Labels at least 12px; no tiny low-contrast decorative text.
- 12-column desktop grid, 8-column tablet, 4-column mobile; max content width 1200px, reading width 65–72ch. Outer gutters 24–48px desktop, 24px tablet, 16–20px phone. Use a 4px spacing base; section padding 64–120px desktop, 48–72px mobile.
- Forms use 8px corners; editorial cards 12–16px; image frames 16px. Thin rules and whitespace create hierarchy. Avoid glass panels, stacked gradients and persistent decorative overlays.

### Image direction

Real places and people lead the story: natural classroom light, hands working, wide context, an instructor demonstrating, details of equipment and permission-cleared student work. Use captions describing what is actually shown; record consent and provenance. Keep abstract artwork clearly abstract and distinct from documentary photography. If approved project examples or portraits are unavailable, show a text-based course deliverable or omit the module—never manufacture proof. Establish image crops and alternative text per asset, not generic labels.

## 4. Navigation and information architecture

| Visitor label     | Proposed destination            | Existing foundation / decision                                                                                                                                                                             |
| ----------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home              | `/`                             | Preserve                                                                                                                                                                                                   |
| Academy / Courses | `/classes`                      | Course index and finder already exist                                                                                                                                                                      |
| IT Services       | `/services`                     | Existing service overview; `/request-project` for enquiries                                                                                                                                                |
| Tech Hub          | TBD                             | No established `/tech-hub` route identified; publish only after owner verifies offer, access and destination. Until then link to `/visit` for the real centre, without calling it a fully operational hub. |
| Free Learning     | `/blog` and `/classes`          | Link to actual lessons; `/resources` currently redirects to `/classes`, so do not label it a separate resource library without changing that deliberately.                                                 |
| About             | `/about`                        | Link onward to `/team`, `/visit`, `/contact`                                                                                                                                                               |
| Student Portal    | Existing sign-in / `/app` entry | Confirm exact role-aware entry during implementation; keep app shell separate.                                                                                                                             |
| Apply Now         | `/apply`                        | Persistent primary action; preserve direct course selection when supported.                                                                                                                                |

Desktop: logo left, primary links centre, portal and Apply right. If space is tight, group secondary links in a labelled menu rather than shrinking text. Mobile: logo, Apply, menu; menu exposes the same destinations in a logical order. The existing Shop, Notes, Admissions, schools, contact and opportunity links must remain discoverable through navigation or footer; do not remove an active time-sensitive opportunity without confirming its status. Do not break legacy URLs or redirects when labels change.

## 5. Homepage composition

The following wireframes describe hierarchy and proportion rather than final pixel-perfect mockups. All content is HTML, not baked into the artwork. Total rhythm: **dark → light → dark accent → light → dark close**. The first viewport must explain the offer even if the image fails.

### 01 / Opening — dark cinematic hero

```
┌ CEA / CYBER ELIAS ACADEMY ── Courses  Services  Free learning  About ── Portal  Apply ┐
│ PORT HARCOURT  /  PRACTICAL DIGITAL SKILLS                                            │
│                                                                                       │
│ The future is built             ┌──────────────────────────────────────┐              │
│ by those who learn              │ Real classroom photograph, gently    │              │
│ to create it.                   │ framed by the CEA learning trace     │              │
│                                 │                                      │              │
│ Practical digital skills.       │ [caption: actual place/activity]     │              │
│ Real-world projects.            └──────────────────────────────────────┘              │
│ Beginner-friendly training.                                                            │
│ [Explore courses ↗]  [Discover CEA ↓]                                                 │
│ Training centre · Port Harcourt    /    Fees and outcomes visible before you apply    │
└───────────────────────────────────────────────────────────────────────────────────────┘
```

Use approximately 6/6 columns on desktop; text remains primary. Hero image is an authentic still, not autoplay video; an original abstract trace may supply depth. Secondary link targets the introduction. On mobile, headline → copy → both CTAs → photograph → caption, with no forced full-screen height. Use the confirmed address above.

### 02 / What CEA is — ivory editorial introduction

```
01 / THE ACADEMY       Practical learning for the digital world.
                       CEA teaches useful digital skills through guided practice
                       and also discusses technology projects with organisations.
                       [How we teach ↗]       [Explore IT services ↗]
```

A narrow chapter label beside a wider text column. One concise explanation precedes institutional language. Mention only services that are actually offered.

### 03 / Find your path — light modular section

Heading: **Find the skill you want to build.** Short supporting line: “New to computers? Start there. Already know your goal? Choose a path.” Place the existing task-and-experience finder above the categories, with a skip link to all courses. Two inputs and an explicit “Show suggestions” button; suggestions show why, price, duration and output, then link to actual course details. No account required.

Eight proposed visitor-facing categories can be filters or curated collections: Digital Foundations; Office & Productivity; Creative & Media; Web & Software Development; Networking & Hardware; Cybersecurity; Data & Analytics; Digital Business & Marketing. Map them explicitly to existing course slugs, rather than equating them with the five existing `CourseCategory` values. Courses may appear in more than one collection. Only show populated categories; identify rotating or unscheduled courses honestly. Do not create empty course landing pages or imply availability. Show featured cards with title, listed fee in naira, duration, entry level/requirements, concrete output and availability when verified. Source values from the catalogue and operational availability, not manually duplicated copy.

```
02 / LEARNING PATHS       Find the skill you want to build.       [All courses ↗]
[ What do you want to do? ▼ ] [ Your experience ▼ ] [ Show suggestions ]
┌ Digital foundations ──┐ ┌ Office & productivity ┐ ┌ Creative & media ──┐
│ relevant real courses  │ │ relevant real courses │ │ relevant courses   │
└────────────────────────┘ └───────────────────────┘ └────────────────────┘
┌ Microsoft Office ────────────┐  ┌ Graphic Design ───────────────────────┐
│ ₦30,000 · 3 weeks            │  │ [catalogue fee] · [catalogue length]  │
│ Absolute beginner            │  │ [entry requirement from catalogue]    │
│ Make documents, sheets,      │  │ [actual course deliverable]           │
│ and a presentation.          │  │ [View course ↗]                       │
│ [View course ↗]              │  └───────────────────────────────────────┘
└──────────────────────────────┘
```

The Office values above illustrate the current source record, not a guarantee of future pricing. Update from the canonical record at render time.

### 04 / Learning in action — photography-led

Use a large, captioned image of the actual room alongside two smaller real details or outputs, when consented and verified. Headline: **Learning happens at the keyboard.** Explain what is visible, not staged numbers. Link to `/visit` for the centre; a photo gallery is not a 360° virtual tour. If imagery is insufficient, use one authentic photograph and an informative text block instead of placeholders posing as reality.

### 05 / Method — dark technical interval

A restrained trace connects six numbered steps with short plain-language explanations. Static list on small screens; optional click/tap expansion for detail, with all key content available without hover. Pending teaching-team approval, retain the current verified loop rather than silently replacing it. Any certificate statement must reflect real requirements and available verification, not promise every applicant a certificate.

### 06 / Beyond the classroom — light ecosystem bento

Four uneven but readable cards: Academy (courses), IT Services (project enquiry), Tech Hub (only if operational details are confirmed), Digital Solutions (link to services or projects, not an invented separate entity). Mark future initiatives as planned or omit them. No fabricated clients, partner logos, statistics or case studies. Distinguish a training centre from its aspirations.

### 07 / People — editorial trust section

Use the existing founder portrait where permission allows; include name, current role, a short verified account of why CEA teaches this way, and a link to `/about` or `/team`. Additional instructors appear only with approved biographies and portraits. Avoid invented quotes and credentials. Pair with a real classroom image rather than an agency-style stock portrait.

### 08 / Free learning — light reading shelf

Three actual lessons or notes with subject, title, short description and direct links. Clearly distinguish a full lesson from an outline using the existing resolved course data. “Read a free lesson” should not require sign-in. Link to the existing notes and class pages, not to a fictional free-learning product.

### 09 / Closing — dark conversion panel and useful footer

**Your journey into the digital world starts here.**<br>
“Explore courses, find your starting point, and apply when you are ready.”<br>
Primary: **Explore courses** → `/classes`. Secondary: **How to enrol** → `/admissions`. Also offer contact and portal links. Footer contains verified contact details, address, legal links, accessibility, course and content links. No false urgency or unverified intake dates.

## 6. Page-by-page design briefs

| Area / route                                       | Visual treatment and order                                                                                            | Primary action / proof                                                                                                  |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| About `/about`, `/team`                            | Ivory editorial masthead → founder story → teaching approach → real people → visit                                    | Meet the academy; verified roles and real portraits                                                                     |
| Academy `/classes`                                 | Light bento index → task finder → filters → core courses → rotating courses → help                                    | Compare courses; visible fee, duration, requirements, output and truthful availability                                  |
| Course `/classes/<slug>`                           | Editorial title → facts/fee receipt → requirements → output → syllabus → free notes → admissions FAQ                  | Apply for this course or register interest, depending on real status; fee and schedule are never hidden behind WhatsApp |
| Admissions `/admissions` and `/apply`              | Quiet, light, form-first; requirements and fee first → progress → details → review → confirmation                     | Complete free application; clearly state that confirmation precedes payment                                             |
| Student portal `/app/*`                            | Application UI, compact navigation, stable layouts, functional status and accessible controls; no marketing animation | Continue learning; retain `AppShell`, RBAC and API behaviour                                                            |
| Free learning `/blog`, `/classes/<slug>/<session>` | Reading-first editorial template, generous text and table of contents; show published/outline status                  | Read and continue learning; preserve editorial provenance and dates policy                                              |
| IT services `/services`, `/request-project`        | Restrained dark/light technical composition → problems solved → process → genuine work where approved → enquiry       | Submit a project brief; no implied clients or delivery claims                                                           |
| Tech Hub                                           | Experiential introduction only once operational offer is verified; otherwise use `/visit`                             | Visit or enquire; state access and facilities accurately                                                                |
| Work `/work`                                       | Project stories with problem, process, actual outcome, permissions and attribution                                    | View work or request a project; omit unsupported case studies                                                           |
| Contact `/contact`, `/visit`                       | Minimal contact details, confirmed address, hours if verified, directions and practical help                          | Call, email or arrange a visit; WhatsApp is optional support, not the information gate                                  |

### Course page detail

On desktop, pair the introduction with a high-contrast facts panel; on mobile it follows the introduction before lengthy copy. Show fee, duration, session cadence, experience level, equipment/entry requirements, intended deliverable and current availability. Where a fact is unknown, say “To be confirmed,” not a guessed date. Explain assessment and certificate conditions with verified wording. Show actual syllabus and free materials; include the course-specific application action when supported by the existing route contract. A printable facts view is a useful later enhancement.

## 7. Component library and states

| Component          | Specification                                                        | Required states / behaviour                                                                           |
| ------------------ | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Site header        | Clear labels, visible Apply and portal                               | Desktop, mobile, focus, open, escape/close, scroll; no obstruction of content                         |
| Editorial hero     | Eyebrow, H1, explanation, 1–2 actions, optional authentic image      | Text readable without image; image has caption and alt                                                |
| Section heading    | Chapter number, title, summary, optional link                        | Number decorative or meaningfully labelled; logical heading order                                     |
| Course card        | Title, fee, duration, requirements/level, output, availability, link | Hover/focus, unavailable/interest-only, missing data; entire target has a clear accessible name       |
| Course finder      | Goal and experience fields, submit, recommendation with reason       | Initial, validation, results, no match, reset; keyboard operable, announced results, no dark patterns |
| Fee receipt        | Definition list with source-backed facts and apply/interest action   | Known, to-be-confirmed and unscheduled; not a payment demand                                          |
| Learning trace     | Numbered ordered list with optional details                          | Static, expanded/collapsed, keyboard, reduced motion; not application progress                        |
| Photo/story module | Image, factual caption, optional link                                | Real photo, approved crop, missing-asset text fallback                                                |
| Forms and progress | Labels, help, field errors, step heading, review                     | Autofill, keyboard, error summary, pending, failure, success and safe resume if actually supported    |
| Consent and help   | Existing consent and contextual support                              | Must not obscure content, forms, focus or sticky controls on a small screen                           |

Use existing Radix primitives and design tokens as the starting point. Buttons, links, fields and focus styles must be consistent; never use colour alone for status. Target touch controls of at least 44×44 CSS px. Any sticky mobile action must not cover a field, browser UI, chat widget or the page footer.

## 8. Motion, responsiveness and performance

- Entry: hero text fades or rises no more than 12px over 400–600ms; trace draws once over at most 800ms. Content is visible immediately if JavaScript or animation fails.
- Section reveals: opacity and ≤12px translation, 250–400ms, once, never on critical forms or essential course information. Hover: border/colour or ≤2px lift over 150–200ms. Avoid parallax, scroll hijacking, custom cursors and animation tied to input completion.
- Respect `prefers-reduced-motion`: no drawing, translation, autoplay or smooth scrolling; show final state immediately. Touch devices never depend on hover. Do not loop decorative motion.
- 320–639px: single column, minimum 16px body text, full-width form controls, vertically stacked cards and trace. 640–1023px: two-column grids where content permits. ≥1024px: 12-column editorial layouts. Test 320, 375, 768, 1024 and 1440px, 200% zoom, and long course titles without horizontal overflow.
- Performance targets for a representative mobile page on a slow network: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at the 75th percentile when measured in real-user data; Lighthouse is a diagnostic, not proof of field performance. Reserve image dimensions, prioritize only the hero image, lazy-load below-fold media, provide responsive WebP/AVIF with appropriate fallback, and self-host existing fonts. Initial target: hero image ≤250KB at its delivered mobile size; avoid adding a 3D runtime without an independently justified budget and fallback. Test with JavaScript disabled and on a low-end device.

## 9. The visitor-to-student journey

1. **Arrive:** identify CEA as a practical digital-skills academy in Port Harcourt; see courses and free learning immediately.
2. **Discover:** pick a task and experience level, or browse the catalogue. Suggestions explain their reasoning; the visitor can bypass the finder.
3. **Compare:** view source-backed fee, duration, requirements, outcome and known availability. Unknown start dates are labelled, never invented.
4. **Decide:** read the syllabus and a free lesson, understand the application and payment sequence, ask a question or visit.
5. **Apply:** carry course choice into the existing form where supported. Validate accessibly, show a review, then an unambiguous application/interest confirmation and reference if actually issued. Do not represent interest as an accepted place.
6. **Confirmation and payment:** CEA confirms timetable, equipment and place before requesting payment. Show only methods and payment status supported by the actual system. Handle failed, pending and bank-transfer verification states without claiming a pending transfer is paid.
7. **Learner access:** explain the real next step for accessing the portal once eligible; link to existing sign-in and help. Do not claim automatic account provisioning or enrollment unless verified end to end.

Analytics, if enabled under the existing consent policy, should measure aggregate finder use, course-detail views, application starts/completions and drop-off by step. Never include names, contact details, sensitive form values or payment data in events. Establish a baseline before setting conversion targets; test the entire journey with a first-time learner, not just click counts.

## 10. Delivery and acceptance gates

**Phase 0 — Decisions and content:** confirm address, course fees/status, teaching-loop terminology and certification, services/hub reality, photo permissions and admissions behaviour. Owner approves a single source of truth and the content inventory. No unsupported claims ship.

**Phase 1 — Design:** produce high-fidelity desktop and mobile compositions from §5, component states from §7, and a clickable journey prototype. Test with at least three first-time learners: each should locate a fee, a requirement, a deliverable and how to apply without help. Resolve issues before implementation. Confirm the identity is CEA's rather than a reproduction of a reference site.

**Phase 2 — Build:** implement tokens and reusable public components in the existing Next architecture; redesign homepage and catalogue first, then course/admissions pages and supporting routes. Preserve source routes, generated route mechanics, metadata, existing URLs, API contracts and application state. Keep the portal independent. Add no 3D or UI framework merely to match the brief.

**Phase 3 — Verify:** run `npm run build`, `npm run typecheck`, relevant lint and public/admissions Playwright tests; exercise mobile, keyboard, reduced-motion, image failure, form errors, consent and payment-state handling. Verify structured data against visible content; preserve editorial and ad policy checks. If address changes, add cross-surface assertions and verify backend messages as well as public metadata. Check core web vitals and image weights against §8; record real results rather than declaring targets met.

**Phase 4 — Release:** owner signs off on factual content and photos, an admissions operator walks through the real flow in a safe test environment, then deploy through the existing pipeline. Validate the deployed pages, metadata, links, form and payment handoff independently; monitor errors and performance, with rollback available.

## 11. Approval checklist

- [x] Owner confirmed **24 Ebony Road** on 12 November 2026; retain it consistently.
- [ ] Approve or revise the six-stage learning trace against actual instruction and certificate policy.
- [ ] Confirm which courses are currently scheduled, which collect interest, current fees and required equipment.
- [ ] Confirm the real Tech Hub offer, if any, and the scope of services and project examples that may be published.
- [ ] Approve real photographs, captions, consent and founder/team biographies.
- [ ] Confirm portal entry and actual application → confirmation → payment → learner-access behaviour.
- [ ] Approve high-fidelity compositions and usability test findings before coding.
