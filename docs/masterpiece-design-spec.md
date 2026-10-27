# CEA site — Masterpiece Design Spec

Companion to [`../plans/CEA_MASTERPIECE_BLUEPRINT_2026-10.md`](../plans/CEA_MASTERPIECE_BLUEPRINT_2026-10.md) and [`../plans/role-activation-matrix.md`](../plans/role-activation-matrix.md).

**Status:** specification for the public site (`/`, `/classes`, `/blog`, `/glossary`, `/apply`, trust pages). The `/app/*` workspaces keep their own language and are out of scope here except where shared tokens are touched.

---

## 0. Design thesis

> **A school should look like a place you can walk into at 10 a.m. and be helped.**

The site is not a startup pitch. It is the room on Ebony Road, rendered in type and light: warm paper, deep ink, one ember accent, real photographs, plain sentences, published prices. Nothing decorative that isn't doing work; nothing shy where confidence is deserved.

Three consequences, each with a test:

| Principle | Meaning | Test |
|---|---|---|
| **Daylight** | Light-first public pages; dark theme available and correct, never the default for learners | Screenshot at 40% brightness on a cheap phone: is the body text comfortable? |
| **Paper, not glass** | Edges, rules, captions, marginalia — print logic, not frosted sci-fi panels | Remove all animation: does the page still feel designed? |
| **Proof beats adjective** | A photo of the actual lab outperforms any adjective | For each section: is there a fact, a face, a fee or a photograph in it? |

---

## 1. Foundations (extends the existing token sheet in `src/styles.css`)

### 1.1 Typography

| Role | Face | Use | Rules |
|---|---|---|---|
| Display | **Bricolage Grotesque** (variable) | H1/H2, chapter numerals, big statements | Weight 600–750; `letter-spacing: -0.02em` above 40px; never below 24px; never all-caps |
| Body | **Geist** (variable) | Paragraphs, lists, UI text | 17–19px mobile, 18–20px desktop; line-height 1.6–1.75; max 70ch |
| Human aside | **Instrument Serif** | Pull quotes, the founder's voice, captions of feeling | Italic for asides; never for body-length text |
| Label | **Geist Mono** | Fees, durations, dates, lesson numbers, breadcrumbs | Uppercase only ≤ 14px with `letter-spacing: 0.08em`; tabular numbers for all money |

**Fluid scale** (add to existing `text-h3` ladder):

| Token | Mobile | Desktop | Use |
|---|---|---|---|
| `text-display` | 2.5rem | 4.25rem | Home H1 only |
| `text-h1` | 2rem | 3rem | Page titles |
| `text-h2` | 1.5rem | 2rem | Section headings |
| `text-h3` | 1.25rem | 1.5rem | Card titles, course names |
| `text-body` | 1.0625rem | 1.125rem | Reading text |
| `text-small` | 0.9375rem | 0.9375rem | Captions, meta |
| `text-label` | 0.75rem | 0.75rem | Mono labels |

**Rules:** one H1 per page; headings never skip levels; no justified text; no text over busy photography without a scrim ≥ 60% opacity; line length 62–72ch for lessons, 40–55ch for hero copy; hyphenation off; orphans/widows handled with `text-wrap: pretty` where supported and `balance` on headings.

### 1.2 Colour

Keep the existing `oklch` token system (ink + ember). Public pages use **paper-first** values; `/app/*` may stay dark-first.

| Token intent | Where used | Contrast requirement |
|---|---|---|
| `--background` (paper) | Page ground | — |
| `--foreground` (ink) | Body text | ≥ 7:1 on background |
| `--muted-foreground` | Secondary text | ≥ 4.5:1 |
| `--primary` (ember/burgundy, e.g. `#7a2434` family) | Primary action, active state | ≥ 4.5:1 with white text |
| `--accent` (ochre/clay) | Highlights, "free" markers, chapter numerals | ≥ 4.5:1 when used as text |
| `--border` / `--rule` | Hairlines, table rules | ≥ 1.5:1, decorative only |

**Course-family wayfinding** (from `plans/CEA_OS_DESIGN_LANGUAGE.md`, used sparingly, never as the only cue):

| Family | Cue | Courses |
|---|---|---|
| Office & Data | Ochre | Microsoft Office, Typing & Basics, Data Entry |
| Creative & Media | Clay/rose | Graphic Design, Content Creation, Social Media |
| Web & Code | Deep teal | Web Design, Web Development |
| Hardware & Security | Slate | Computer Repairs, Cybersecurity |
| Business & Freelance | Emerald | Business & Freelancing, Digital Marketing, Online Teaching |

**Never:** colour as the only signal (pair with a label or icon); pure black text on pure white (`#000` on `#fff` is harsh on cheap LCDs — use ink at ~90% lightness); gradients behind body text; more than one accent family visible at once in a reading column.

### 1.3 Space, grid, shape

- Base unit **4px**; spacing scale 4/8/12/16/24/32/48/64/96/128.
- Grid: 4 columns mobile (<640), 8 tablet, 12 desktop; max content width 1200px; reading column 68ch centred with a 220px marginalia column ≥1120px.
- Section rhythm: `clamp(56px, 8vw, 112px)` vertical; never two full-bleed sections back to back without a rule or caption.
- Radii: 4px (inputs/labels), 12px (cards), 20px (photo frames), full (pills). One radius family per component; no mixed radii inside a card.
- Elevation: hairline rule → 1px border → `shadow-lift` (interactive only). No drop shadows on static cards.
- Density: course tables and fee blocks are dense; reading pages are generous. Never dense reading pages.

### 1.4 Iconography & diagram language

- 24px grid, 1.5px stroke, round caps, no filled icons except status dots.
- Icons always accompanied by a word (low-literacy audience).
- Diagrams are **original line art** (see §5), never screenshots of software that was not actually captured — this is already policy in `AGENTS.md`.

---

## 2. Signature moments (what people remember and describe)

Each is a designed, reusable component — not a one-off flourish — and each must survive reduced motion, 360px, and 3G.

1. **"The four things" hero.** A restrained line diagram naming monitor, tower/laptop, keyboard, mouse — the same four objects the first lesson names. On pointer devices, a subtle 2px hairline follows the pointer across the diagram; with reduced motion or touch, it is simply a beautiful static figure with labels. Caption: *"Four things. That is the whole machine."*
2. **The fee receipt.** A printed-receipt motif on every course page: `Course`, `Weeks`, `Sessions/week`, `Fee`, `You bring`, `You leave with`. Mono type, tabular figures, a dashed rule, a "no hidden fees" line. It is the most-screenshotted element on the site and the single strongest conversion device.
3. **The deliverable gallery.** Real learner outputs (a formatted CV, a spreadsheet, a flyer, a published page, a serviced machine) photographed on the actual desk, with the learner's permission and first name only. This is the honest replacement for every "success story" the market fakes.
4. **The six-beat class rail.** Learn → Practice → Create → Correct → Repeat → Demonstrate, as a horizontal rail that also reads as a vertical list on mobile; each beat opens a two-sentence explanation. Answers "what actually happens in the room".
5. **The reading spine.** On lesson pages, a thin left-margin spine marks progress and holds the lesson number; chapter links stack beside it. It remembers position locally (no account needed), and it is decorative-but-accessible: `aria-hidden` with a real table of contents above.
6. **"Ask the notes" search.** `⌘K`/tap, searches lessons + glossary with Nigerian-English synonyms: *NEPA/power, flash/drive, browse/internet, typing/keyboard, MS Word/Word, folder/directory, bundle/data*. Empty state suggests three popular lessons instead of "no results".
7. **The printable guide.** A print stylesheet turns any course page into a one-page A4 flyer a learner can print at a business centre for ₦50 and take home to a parent. This is a distribution channel disguised as CSS.
8. **The founder's letter.** Instrument Serif, generous leading, a real photograph, signature. No marketing voice. It is the trust page that does the work of ten testimonials.
9. **Local object illustrations.** Generator, NEPA outage, POS terminal, data bundle, keke, market stall ledger — drawn in a two-colour risograph style, used to illustrate lessons and never as decoration.
10. **The verification card.** `/certificates/verify` returns a quiet, official-looking card: name, course, deliverable, date, verification code — and almost nothing else (privacy by default).
11. **The classroom map.** A small, hand-drawn-style map of 24 Ebony Road with the nearest landmark and a "how to find us" note, plus the honest line: *"If you reach the junction and are unsure, call — someone will come out."*
12. **WhatsApp-first help card.** Context-aware message with a pre-filled question (course name, page title), plus the honest response window. Never a floating bubble that covers content on mobile.

**Signature-moment budget:** no page carries more than two. The home page carries #1 and #2 (or #3); course pages carry #2 and #3; lessons carry #5 and #9; `/about` carries #8 and #11.

---

## 3. Page-by-page briefs

Format: **job** · primary action · required modules · proof · words · art · schema.

### 3.1 Home `/`
- **Job:** a stranger decides in ten seconds whether this is a real place that teaches what they need, at a price they can plan.
- **Action:** `View courses` (primary), `Apply` (secondary), `Read a free lesson` (tertiary).
- **Modules (in order):** value line + location line + three facts (fee from ₦20,000 · 2–4 weeks · 2 sessions/week) → primary/secondary CTA → the four-things figure or hero photo → "start with the task you want to do" course finder → 6 featured courses with fee/weeks/deliverable → how a class runs (six-beat rail) → proof band (real photo, founder quote, address) → 3 latest lessons → "who it is for" (3 cards) → closing CTA with the receipt-style fee honesty line.
- **Proof:** real photograph with caption + date, founder's face, address, published fees.
- **Words:** ≥ 700 rendered.
- **Art:** 1 hero image (≤ 220 KB AVIF/WebP, `srcset`), 1 diagram, 3 lesson thumbnails.
- **Schema:** `EducationalOrganization`, `LocalBusiness`, `WebSite`, `ItemList` of courses.

### 3.2 Classes index `/classes`
- **Job:** match a named task to a course without reading 13 pages.
- **Action:** open a course; secondary filter by "what I want to do" and "where I'm starting from".
- **Modules:** one-line promise → task-based finder (from existing `course-finder`) → course grid with fee/weeks/level/deliverable on the card → rotating specialist courses → "not sure? two questions" helper → fee-range honesty note → apply CTA.
- **Words:** ≥ 600.
- **Schema:** `ItemList`, `BreadcrumbList`, `FAQPage` for "how do I choose".

### 3.3 Course page `/classes/<slug>`
- **Job:** the applicant can answer fee, duration, schedule, requirements, outcome and location without contacting anyone.
- **Action:** `Apply for this course` (sticky on mobile, never covered by ads or chat bubble).
- **Modules:** title + one-line outcome → **fee receipt** → who it's for / requirements → what you will produce (deliverable, photographed if possible) → session-by-session list (linked to lectures) → schedule + next start date → what happens after you apply (3 steps) → FAQ (5–8 real questions) → **read before you pay** (2 free lessons from the same subject) → apply CTA.
- **Words:** 700–1,100.
- **Art:** 1 course image, 1 deliverable photo, optional diagram.
- **Schema:** `Course` with `offers` (NGN, availability, url), `CourseInstance` (start date, sessions), `FAQPage`, `BreadcrumbList`.

### 3.4 Lesson `/blog/<slug>`
- **Job:** teach one real thing in one sitting, completely, in a voice that respects the reader.
- **Action:** continue to the next lesson; secondary: the course that goes further.
- **Modules:** breadcrumb + lesson number → promise in the first 40 words → body with 2–4 figures → "if this went wrong" → 60-second self-check → sources + reviewed date + reviewer byline → next/previous + chapter links → reading spine + table of contents (desktop) → related course card (one, honest).
- **Words:** 900–1,400. **Reading time computed, never authored.**
- **Art:** 2–4 original figures; ≤ 100 KB each after compression.
- **Schema:** `Article`/`LearningResource` with `author`, `reviewer`, `datePublished`, `dateModified`, `educationalLevel`, `inLanguage: en-NG`, `BreadcrumbList`. No `HowTo` unless the steps are genuinely a procedure.

### 3.5 Glossary `/glossary/<term>`
- **Job:** be the canonical, Nigeria-specific definition that a lesson links to.
- **Modules:** definition in the first 2 sentences → why it matters → one worked example in a local context → lessons that use it → the course that teaches it → related terms.
- **Words:** 150–400 (short by design; depth lives in the lessons). **Schema:** `DefinedTerm` + `DefinedTermSet`.

### 3.6 Apply `/apply`
- **Job:** convert without friction or trickery. No account required to start; no phone-number gate before the fee is visible.
- **Modules:** what you need before you start (2 lines) → step indicator → course + session choice → details → payment (Paystack + bank transfer with receipt instructions) → confirmation with next steps and a WhatsApp link.
- **Non-negotiables:** visible progress, save-and-resume, honest errors, keyboard-complete, autofill attributes, no dark patterns (no pre-ticked consent, no fake urgency).
- **Words:** ≥ 250 in surrounding support copy (this page is legitimately form-centric).
- **Schema:** none needed; keep `noindex` optional per marketing decision — currently indexable, keep it but with support copy.

### 3.7 Trust pages `/about`, `/team`, `/editorial`, `/stories`, `/work`, `/certificates/verify`
- **Job:** make the academy verifiable by a sceptical stranger.
- **`/about`:** the founder's letter, the room, the honest history, the address and map, what CEA is *not* (no placement guarantees, no fabricated statistics).
- **`/team`:** real names, roles, one-line credentials, photographs (or initials when someone prefers not to be photographed).
- **`/editorial`:** standards, bylines, review dates, AI policy, corrections policy with SLA, advertising-independence statement, contact for corrections.
- **`/stories`:** learner stories **only** with written consent; first name + course + what they made; never invented. If there are no stories yet, publish the honest "we are collecting the first ones" note with a form — not an empty grid.
- **`/work`:** the academy's own projects/partnerships with dates and outcomes.
- **`/certificates/verify`:** minimal data, clear failure state, anti-enumeration rate limit.
- **Schema:** `Person` for staff, `AboutPage`, `ContactPoint`.

### 3.8 Money pages `/pricing`, `/scholarships`, `/refunds`
- **Job:** remove financial anxiety. Publish every fee, what it includes, instalment terms, refund conditions in plain sentences, and scholarship criteria with dates.
- **Rule:** if a fee exists, it appears here in a table with the same numbers as the course page — one source of truth (`src/data/academy/catalog.ts`).

### 3.9 Contact `/contact`, `/visit/*`
- **Job:** make it easy and safe to reach a human.
- **Modules:** WhatsApp, phone (tap-to-call), email, hours, address + map + landmark, response-time promise, what to bring on a visit, accessibility note.
- **Never:** a contact form as the only channel.

### 3.10 Blog index `/blog`
- **Job:** let a reader find the lesson for the task they have right now.
- **Modules:** search + chapter list + "start here" three lessons + latest + a plain table of all lessons by number (crawlable, scannable) → course CTA.
- **Words:** ≥ 600 besides listings.

---

## 4. Motion spec

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 120ms | Hover, press, focus ring |
| `--duration-normal` | 200ms | Reveal of small blocks, chip toggles |
| `--duration-slow` | 320ms | Panel and page transitions |
| `--ease-out-expo` | existing token | Entrances |
| `--ease-in-out-soft` | existing token | Layout shifts, accordions |

**Rules.**
- Entrances happen **once**, on first view, ≤ 12px translate, opacity 0→1; nothing animates on every scroll pass.
- No parallax on text; no scroll-jacking; no autoplay video with sound; no marquee on reading content (keep `Marquee` for a label band at most).
- Every animation has an equivalent under `prefers-reduced-motion: reduce` — usually none, and the page must remain complete and legible (existing `Reveal`/`StaggerGroup` already handle this; new components must too).
- Focus and hover states are never animated beyond 120ms.
- View transitions may be used for route changes, cross-fade 240ms out / 320ms in, disabled under reduced motion.
- Animation must not cause layout shift or delay LCP; never animate the hero's largest element on the critical path.
- Sticky elements: at most one per page (the apply bar *or* the header, not both plus a chat bubble).

---

## 5. Image and illustration direction

### 5.1 Photography (art direction)

**What we photograph:** the room, machines, hands, the whiteboard, the wall screen, the chair line, the doorway with the signboard, the street landmark, the teacher mid-sentence, a learner's finished work on the desk.

**How:** natural or neutral light; no coloured gels; no heavy bokeh; shoot at f/2.8–f/4 for context; 3:2 and 4:5 crops; faces with consent; hands are as important as faces.

**Never:** stock photography of any kind; laptops on white desks with coffee; "diverse team in a glass office"; learners photographed from behind as anonymous subjects of charity; unsourced flags or fake awards; watermarked images.

**Caption format:** *What is happening · where · when.* e.g. *"Morning session at 24 Ebony Road: the Office group on the third week's spreadsheet task. Photographed 12 October 2026."* Captions are real content (good for search and for trust), and alt text says what the image teaches, not "photo of classroom".

**Technical:** AVIF with WebP fallback, `srcset` at 360/720/1080/1440, explicit `width`/`height`, `loading="lazy"` below the fold, `fetchpriority="high"` for the LCP image only, ≤ 220 KB hero / ≤ 100 KB inline.

### 5.2 Illustration system

- Two-colour (ink + one family colour) risograph texture; 1.5px uniform strokes; no gradients; no 3D.
- Subject bank: computer parts, cables and sockets, folders and files, keyboard home row, browser address bar, email envelope, generator, POS, data bundle, market ledger, padlock, socket strip, printer.
- Used to explain, never to decorate. Every figure has a caption stating what it shows.
- Source files kept under `public/images/classes/` (existing convention) with a manifest of what each depicts.

### 5.3 Shot list (first shoot, 24 frames)
1. Frontage with signboard and street. 2. Doorway from inside. 3. The room empty, chairs aligned. 4. Wall screen mid-lesson. 5. Whiteboard with a real diagram. 6. Teacher's hands on a keyboard. 7. A learner's hands on a mouse. 8. Over-the-shoulder of a spreadsheet. 9. A learner thinking, not posing. 10. Two learners helping each other. 11. A serviced machine open on the bench. 12. A printed certificate held up. 13. A finished flyer on screen. 14. A published website on screen. 15. The fee list on the wall, if it exists. 16. A notebook with handwritten steps. 17. The data bundle/phone on the desk. 18. A generator or power note by the window. 19. The founder teaching, not portrait. 20. The founder portrait (for bylines). 21. The noticeboard. 22. The street landmark from the junction. 23. A learner's finished document on paper. 24. End-of-class, chairs pushed in.

All frames: consent form on file, name/date in the asset manifest.

---

## 6. The Nigerian-device reality (design constraints, not disclaimers)

| Constraint | Design response |
|---|---|
| 360×640 is the floor, 360×800 common | Design mobile-first at 360; nothing important below 900px scroll depth on the home page except the CTA |
| 3G / unstable data | Initial HTML+CSS+critical fonts ≤ 180 KB; no video hero; lazy images; system fallback while fonts swap |
| ₦ data bundles, cost-sensitive users | No autoplay anything; no third-party embeds on reading pages; a "data saver" mode that defers non-critical images |
| Cheap Android, low RAM | ≤ 180 KB JS on reading pages; no heavy client components on `/blog/*`; test on a Tecno/Infinix-class device |
| Cracked screens, sunlight | High contrast, generous tap targets (≥ 44px for primary actions), no thin grey-on-grey |
| WhatsApp is the real inbox | Every page offers a WhatsApp path with a sensible pre-filled message; phone numbers tap-to-call |
| Cash and transfer, not cards | Publish bank details and receipt steps; show the payment confirmation path clearly |
| Power interruptions | PWA offline reading for lessons (public only), resumable apply form |
| Low confidence with English formality | Plain language, Grade 8 reading level, no legalese in body copy; legal pages plain-language summary at the top |
| Learners share on WhatsApp | OG images that read at thumbnail size: fee, weeks, one line, logo, > 60% of the frame is text at legible size |

---

## 7. Accessibility (WCAG 2.2 AA) — the component contract

| Area | Requirement |
|---|---|
| Contrast | Body ≥ 7:1; large text ≥ 4.5:1; UI borders/icons ≥ 3:1; focus ring ≥ 3:1 against both adjacent colours |
| Focus | Visible ≥ 2px, offset 2px, never removed; logical order; skip link first in DOM |
| Targets | ≥ 24×24 px minimum (WCAG 2.2), ≥ 44×44 px for primary actions |
| Keyboard | Course finder, apply, search, cookie banner, accordions, dialogs fully operable; no traps; escape closes |
| Forms | Real `<label>`; `autocomplete`; errors inline + summarised + announced; `aria-describedby` for hints; no placeholder-as-label |
| Semantics | One H1; landmarks; lists as lists; tables with `<th scope>`; buttons are buttons, links are links |
| Motion | Reduced-motion parity; no flashing; nothing auto-advancing |
| Media | Captions + transcripts; audio description noted where needed |
| Language | `lang="en-NG"` where Nigerian English is intended; jargon glossed on first use |
| Zoom | Usable at 200% and 320px wide without horizontal scroll |
| Cognitive | Consistent navigation; no timed actions; plain language; one idea per paragraph |
| Images | Alt states the teaching point; decorative images `alt=""` |

Verification per release: axe-core zero serious/critical on 5 templates × 2 viewports, plus a documented keyboard-and-TalkBack walkthrough of apply and one lesson.

---

## 8. Performance budgets and enforcement

| Page | JS (gz) | Fonts | Images | LCP | INP | CLS |
|---|---|---|---|---|---|---|
| Home | ≤ 180 KB | 2 preloaded | ≤ 220 KB | ≤ 1.8 s | ≤ 120 ms | ≤ 0.02 |
| Course | ≤ 160 KB | 2 | ≤ 300 KB | ≤ 1.8 s | ≤ 120 ms | ≤ 0.02 |
| Lesson | ≤ 140 KB | 2 | ≤ 350 KB | ≤ 2.0 s | ≤ 150 ms | ≤ 0.02 |
| Apply | ≤ 200 KB | 2 | 0 | ≤ 2.0 s | ≤ 150 ms | ≤ 0.02 |

**Enforcement:** Lighthouse CI on 6 URLs at mobile throttling; bundle-size diff on PR; image weight check in CI; Speed Insights reviewed weekly; any exception recorded with an expiry date.

**Known enemies of this budget:** carousels, third-party chat widgets, ad scripts before consent, un-subset fonts, icon libraries imported wholesale, animation libraries on reading pages, unused Radix packages in the public bundle.

---

## 9. Component acceptance checklist (definition of done for any UI change)

- [ ] Works at 360px, 768px, 1440px, and at 200% zoom.
- [ ] Keyboard operable; focus visible; order sensible; escape works.
- [ ] Empty, loading, error, and long-content states designed (not left to defaults).
- [ ] Copy: plain language, no jargon without a gloss, no "click here".
- [ ] Contrast verified for all text and interactive states.
- [ ] Reduced-motion behaviour defined; nothing essential depends on animation.
- [ ] Within the page's JS/image budget; no new client component without justification.
- [ ] Server-rendered content is the real content (no skeleton-only first paint for indexable material).
- [ ] Images have dimensions, alt text, and a caption where they teach something.
- [ ] Tokens only — no raw colours, no arbitrary spacing.
- [ ] Works with JS slow to arrive and with JS disabled for reading pages.
- [ ] Analytics event (if any) verified in debug view.
- [ ] Not blocked by ads, chat bubbles, or cookie banners at any viewport.
- [ ] Screenshot attached to the PR at 360px and 1440px.

---

## 10. Microcopy standards

| Situation | Write this | Not this |
|---|---|---|
| Primary CTA | `Apply for this course` | `Get started` / `Submit` |
| Fee | `₦30,000 · 3 weeks · 2 sessions a week` | `Affordable pricing` |
| Empty state | `No lessons match “flash”. Try “USB drive”, or browse the first sitting.` | `No results found.` |
| Error | `That phone number is missing a digit. Nigerian numbers are 11 digits, like 0803 123 4567.` | `Invalid input.` |
| Consent | `We use essential cookies. Analytics and ads are optional.` + two equally prominent buttons | Pre-ticked boxes, "by continuing you agree" |
| Response promise | `We reply within 2 hours, Monday to Saturday, 9am–6pm.` | `We'll get back to you shortly.` |
| Unknown/unavailable | `This course is not running this month. The next start is 4 November — ask us to hold a seat.` | `Coming soon!` |

Tone: warm, direct, specific, never condescending, never hyped. British/Nigerian spelling (`organise`, `programme` for a programme of study, `program` only in software names). Numbers in Naira with thousands separators. Dates as `4 November 2026`.

---

## 11. Print and share

- **Print stylesheet:** course pages print as a one-page A4 flyer (title, fee receipt, weeks, schedule, address, phone, QR to the page); lessons print clean with figures and captions; no nav, no ads, no cookie banner.
- **OG/social cards:** per course and per lesson, generated from data (title, fee or lesson number, one-line promise, logo). Text must survive a 300px-wide thumbnail. Add `og:image:width/height`, and an `alt`.
- **WhatsApp share text:** a `wa.me/?text=` link on course and lesson pages with a short, honest message including the fee.

---

## 12. Visual anti-patterns (reject on sight)

1. Stock photography of any kind.
2. Carousels and auto-rotating testimonials.
3. "Placeholder" ad boxes, dashed rectangles, or "Advertisement" frames before ads exist (existing `AdSlot` correctly renders `null` — keep it).
4. Fabricated numbers, ratings, badges, award logos, or "as seen in".
5. Chat bubbles that cover the apply CTA on mobile.
6. Cookie banners that block reading and have no equal-weight decline.
7. Giant hero type that pushes the fee and the location below two screens.
8. Multi-colour gradients as decoration behind text.
9. Scroll-jacked storytelling on transactional pages.
10. Dark-mode-only public pages.
11. Icons without words.
12. Video heroes with sound, or any autoplay on a data-sensitive audience.
13. Loading spinners where server-rendered content could have existed.
14. Emoji as UI iconography.
15. More than two signature moments on one page.
