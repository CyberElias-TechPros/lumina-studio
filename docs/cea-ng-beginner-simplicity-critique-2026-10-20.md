# cea.ng — Radical-Simplicity Critique from Every Role (20 October 2026)

> **Evidence/implementation update:** This is a source-led heuristic review plus a fetched homepage, not an exhaustive rendered-site, WCAG, security or usability certification. No authenticated production workflows or real payments were exercised. Role perspectives are review lenses, not interviews. Image-directory size is not page transfer size; page weight, Core Web Vitals, contrast outside the changed float, and device behaviour require measurement. Findings not backed by an inspected implementation are hypotheses/test tasks, not confirmed defects.
>
> Four approved web fixes are now implemented locally: manifest branding/public shortcuts, application draft recovery (7-day rolling expiry, clear button, fresh consent, storage-failure warnings), consent-banner gating/float contrast, and wizard heading/error focus. Application drafts contain personal data: shared-device disclosure and clearing are essential; localStorage is not encrypted or cross-device recovery. Source changes are not deployment.
>
> **Security corrections:** A reference plus phone digits must NEVER unlock private status, receipt or payment data. Any alternative recovery needs verified OTP or controlled staff-assisted identity verification. Keep existing email checks until that work is approved and implemented. Public Merchant Center IDs/feed URLs are not credentials by themselves; treat `/merchant` as an information-architecture review, not a demonstrated security vulnerability. Never blanket-cache private lesson, application or receipt HTML for offline use. The revised Android plan supersedes earlier instant-parity and schedule claims.


- **Scope:** the live public site (www.cea.ng, homepage fetched 20 Oct 2026) judged against its source of truth in this repo at `234e6bd` — `src/routes/*`, `src/data/*`, `src/components/*`, `public/*`.
- **Question asked:** *can the most non-tech-savvy, computer-newbie person in Port Harcourt use this site/app completely on their own?* Every finding below is written against that bar, not a designer's bar.
- **Relationship to existing docs:** this complements, and does not repeat, [`plans/CEA_AUDIT_RESPONSE_2026-10-17.md`](../plans/CEA_AUDIT_RESPONSE_2026-10-17.md) (operational truth / payment-to-learning), [`docs/ux-reliability-hardening-2026-10-03.md`](ux-reliability-hardening-2026-10-03.md), [`docs/human-teaching-audit.md`](human-teaching-audit.md) (voice), and the visual-design critiques. Those cover *truth and craft*; this covers *comprehension by the least skilled user*, plus Android readiness.
- **Companion:** [`docs/android-app-plan-2026-10-20.md`](android-app-plan-2026-10-20.md) — the Android app that must inherit every rule below.

---

## 0. Verdict in one paragraph

The public offer is unusually honest and concrete for a Nigerian academy site — real fees, real address, real photos, a named founder, task-first course finder, and free Notes written at a genuinely beginner level ("Sitting down at a computer for the first time" is the right Lesson 1). The bones are good. But the site is currently written for *the owner's mental model*, not the beginner's: internal words leak into user-facing copy ("13 core **flyer** short courses"), the apply form can be destroyed by one accidental refresh (no draft saving), recovery of an application requires an email magic link in a WhatsApp-first market, photos ship unoptimised (~170 KB JPEGs, plain `<img>`, 76 MB image directory) on expensive mobile data, a cookie banner gates tracking that is switched off while covering the WhatsApp button, and the installable app brands itself "**Lumina**" instead of CEA. None of this is a redesign; all of it is fixable in-place, and the fix list at the end is ordered so the beginner-critical items come first.

**No numerical usability score is justified yet.** Measure unaided task completion, errors and recovery with novice participants before and after changes.

---

## 1. The Radical Simplicity Charter (applies to site AND Android app)

Ten rules. Every review, PR and screen should be checked against them.

1. **Grade-5 language on all beginner surfaces.** If a 12-year-old can't read the sentence aloud and act on it, rewrite it. Banned without inline explanation: *admissions, deliverable, cohort, enrol, curriculum, portal, dashboard, specialist, unscheduled, preference, verify*.
2. **One primary action per screen.** Everything else is visually quieter. The action is a verb the user would say: "Apply", "Chat on WhatsApp", "Start Lesson 1" — never "Submit", "Proceed", "Explore".
3. **Nothing is ever lost.** Any form the user typed survives refresh, browser close, dead battery, and network drop (localStorage + resumable link). Any reference code is saved, shareable, and re-findable without email.
4. **WhatsApp is the universal escape hatch.** Every screen where a user might be stuck shows a "Stuck? Chat with us" button that prefills *what they were doing* (course name, step, reference). The academy already lives on WhatsApp; meet the user there.
5. **Phone-first identity.** Phone number is the primary key for a beginner. Email is optional wherever legally possible; never the only recovery path.
6. **Data is money.** Page weight budget: ≤ 350 KB above the fold, ≤ 1 MB total on marketing pages. Images are AVIF/WebP with real `width`/`height`; the Notes must be readable on 2G and cacheable for offline.
7. **Big fingers, old eyes.** Minimum tap target 48×48 px; minimum body text 16 px on mobile (no 10–11 px meta text on beginner surfaces); contrast ≥ 4.5:1 for all text that must be read.
8. **Say what happens next, in the button.** "Continue to your details", "Send my application (free)" — the user should never wonder what a tap costs or does. Money and time are stated before the tap: "Applying is free · about 5 minutes".
9. **Teach the machine, not the jargon.** When the site must use a technical word (HTML, Paystack, Turnstile), it says what it *does* for the user in the same breath: "a short check that you are a person, not a robot".
10. **Test with one real newbie per release.** A person who has never used a laptop performs: find a course → understand the fee → apply → find their reference again. If they ask for help at any step, that step is a bug. (This is the acceptance test for everything below.)

---

## 2. Role-by-role critique

Format per role: **What they need → What breaks or confuses (evidence) → Fix.**
Priority: **P0** = blocks a beginner or loses money/trust now; **P1** = materially hurts the core journey; **P2** = polish/edge.

### Group A — The public, first-time visitors

#### A1. The absolute beginner (never used a computer) — the target persona
**Needs:** to not feel stupid; to find "computer basics" without knowing the word "course catalogue".
**What works:** the task-first `CourseFinder` ("What would you like to learn to do?" → "Get comfortable using a computer") is exactly right, and the privacy note ("your selections are not submitted or stored") is kind. Notes Lesson 1–6 are written for this person.
**What breaks:**
- The finder is *step 1 task, step 2 experience level*. A true beginner doesn't yet know which task they want — they know they "don't know computer". The question that identifies them ("Have you used a computer before?") comes second. (`src/components/marketing/course-finder.tsx`)
- Task labels still carry jargon: "Build a website with **HTML and CSS**", "Plan **digital campaigns** and understand how to **measure them**", "Build a **content calendar**". The beginner reads these and self-excludes. (same file, `tasks[]`)
- Homepage hero leads with "Learn digital skills by doing real work" + two CTAs ("View courses", "Apply"). For this persona the correct first-screen offer is the free path: "Never used a computer? Start free — Lesson 1" (the paid path can be second).
- The word "**Admissions**" in the primary nav (`site-header.tsx`) is school-admin jargon; the beginner wants "Apply" or "Join".
- Notes are labelled "Notes" in nav, "lessons" in homepage copy, and live at `/blog` — three names for one thing. A beginner cannot build a mental model from inconsistent naming.
**Fix (P1):** flip the finder to ask experience first; when "I am new" is chosen, short-circuit straight to *Typing & Computer Basics* + *Lesson 1* with one big button each. De-jargon the 13 task labels (say what you'll *make*, not the technology). Rename nav: "Courses · Free Lessons · Apply · Visit us · About". Pick ONE word for the free content ("Lessons") and use it everywhere; keep `/blog` URL with copy saying "Lessons".

#### A2. Low-literacy / Pidgin-first reader
**Needs:** short sentences; recognition over recall; possibly audio.
**What breaks:** every beginner surface is dense Standard English. Examples from live copy: "Share your preferences, review the fee and apply for free. No payment is requested until CEA confirms a deliverable timetable, equipment arrangement and place. Unscheduled courses collect interest only." (`src/routes/apply/index.tsx` hero) — 3 abstract nouns in one sentence. FAQ answers run 50–80 words (`classes.index.tsx` `HUB_FAQS`).
**Fix (P1, then P2):** write a "Simple mode" copy layer for the five beginner screens (home, /classes, course page, /apply, /contact): ≤ 8-word sentences, active voice, ₦ amounts always visible. P2: a 🔊 "Read this to me" button per section using the Web Speech API (free, offline-capable, zero backend) — for a site teaching computer beginners, being read-to is a dignity feature, not a novelty. P2+: Pidgin/Igbo/Yoruba/Hausa toggles — the CEA-OS `localization` role workspace already exists; wire it to this.

#### A3. Older learner / low vision / low dexterity
**Needs:** big text, high contrast, forgiving taps, no time pressure.
**What breaks:** course-card meta text is `text-[11px]` and the card index number uses `text-foreground/45` (45% opacity) (`classes.index.tsx` CourseCard); disclaimers are `text-xs` at `muted-foreground` (e.g. the finder's privacy note, apply footer). These are below comfortable reading size and at contrast risk against WCAG AA 4.5:1.
**What works:** skip-to-content link (`shell.tsx`), `tel:` and `mailto:` links, light theme default, reduced-motion handling (per existing docs).
**Fix (P1):** floor beginner-surface text at 13 px (meta) / 16 px (body); audit `/45`–`/70` opacity text against the actual palette and raise to AA. (P2, app): a text-size setting (Normal/Large/Largest) persisted locally.

#### A4. Screen-reader / keyboard user (also see D2 WCAG auditor)
**Needs:** focus never lost, everything labelled, errors announced.
**What breaks:** in the apply wizard, advancing a step calls `window.scrollTo` but never moves focus — a screen-reader user stays at the old position and hears nothing (`apply/index.tsx` `next()`); the 5-step progress rail is not operable (you can only "Back" one step at a time, no jumping to a completed step); field errors are set as text but there's no `aria-live` summary or focus-to-first-error (validation just silently blocks Continue — the user doesn't know why).
**What works:** finder recommendation has `aria-live="polite"` + `sr-only` (`course-finder.tsx` L276-279); Radix primitives give accordions/dropdowns correct semantics; icons are `aria-hidden`.
**Fix (P0 for a11y):** on step change, focus the step's `<h2>` (add `tabIndex={-1}`); render an error summary with `role="alert"` and focus the first invalid field; make completed steps clickable buttons in the rail.

#### A5. Low-end Android + expensive-data user (the majority of real traffic)
**Needs:** fast first paint, tiny payload, works on 3G and flaky Wi-Fi.
**What breaks:**
- Photos are raw JPEGs through plain `<img>` tags — `public/images` is **76 MB**, individual blog/campus JPEGs ~160–180 KB; `photos.tsx` (L67, L88) renders them directly and `next.config.mjs` has **no `images` configuration**. Homepage = hero-adjacent campus photo + 6 course-card covers + 3 lesson thumbs + footer imagery → easily **1 MB+ of images** per visit. On a ₦-metered data plan that's real money and multi-second waits.
- The service worker caches only the app shell (`/`, `/offline.html`, icons) — no lesson text, no course data (`public/sw.js`). A returning learner on the bus re-downloads everything.
**Fix (P0):** generate AVIF/WebP renditions at the 3 used sizes (card 16:9, thumb, hero) with `width`/`height` attributes and `loading="lazy"` below the fold; or adopt `next/image` with a local loader. Budget: ≤ 60 KB per card image. (P1) extend sw.js to cache `/blog/*`, `/classes/*` HTML and the JSON-ish content they need (stale-while-revalidate) — this doubles as the Android offline story.

#### A6. WhatsApp-first user (has no/ignores email)
**Needs:** to apply, pay, and recover everything through a phone number and a chat.
**What breaks:** the apply form **requires** email with regex validation (`apply/index.tsx` L107-109), and re-opening an application later requires an **email magic link** (`src/components/enrollment/applicant-access.tsx` — "Use the email on your application"). If the beginner typed a typo'd email, borrowed a sibling's, or never opens email, their application and receipt are effectively unreachable — the reference code alone "cannot reveal" anything (correct security posture, wrong recovery surface for this market).
**What works:** floating WhatsApp button sitewide with prefilled enquiry; success screen has a WhatsApp link that prefills the reference (`success-screen.tsx` L81).
**Fix (P0):** (a) allow phone-only applications — email optional when a valid NG phone is present (owner policy call; the backend stores phone, but that alone does not make email optional in account/notification flows); (b) add a verified-phone OTP or staff-assisted identity-recovery flow as a second recovery path; (c) until (b) ships, make the success screen scream: "Save this code. Send it to your own WhatsApp now." with a `wa.me/…?text=CEA-XXXX` self-share button — the user becomes their own backup.

#### A7. Walk-in visitor ("I heard about you, where is the place?")
**Needs:** address, opening hours, what to expect, reassurance it's real.
**What works:** `/visit` exists, footer address + hours (Mon–Sat 8:00–20:00), real campus photos, "Call or visit during opening hours if you want to see the room before you enrol" — excellent trust copy; the 24-vs-26 Ebony Road signboard issue is documented and resolved in copy (per the 17 Oct audit).
**What breaks:** no embedded map / "Open in Google Maps" deep link on the pages where the decision happens (footer address is plain text); "Plan a visit" CTA is below the fold on home.
**Fix (P1):** make the footer address a Google Maps link (`https://maps.google.com/?q=24+Ebony+Road+Port+Harcourt`); add "Get directions" + "Call now" buttons to `/visit` header and the apply InfoPanel. (P2) a 3-photo "what the front of the building looks like" strip — first-timers fear the wrong door.

#### A8. Parent/guardian paying for a child
**Needs:** fee certainty, safety signals, receipt they can keep, who to call.
**What breaks:** the pay story is scattered across `/pay`, `/apply/pay`, bank-transfer form, and "Do not pay until CEA confirms… an offer" copy — correct commercially, but a parent reading quickly can't tell *when* they will be asked for money and *what proves* payment. The consent checkbox "Accept the terms of sale" links to legal text written for lawyers.
**Fix (P1):** one plain-money page ("How payment works: 1. You apply free → 2. We confirm your place and the exact fee → 3. You pay by card or bank transfer → 4. You get a receipt page you can print. We will never ask for payment on WhatsApp without your reference code.") linked from apply step 3 and the FAQ. Add an anti-fraud line — payment scams targeting school fees are rampant in NG; saying "we never ask for PINs" is trust gold.

#### A9. NYSC member / school leaver hunting for a job edge
**Needs:** proof this converts to income; time-flexible scheduling.
**What works:** "Who it is for" section names them; evening/Saturday slots mentioned in FAQ; iDICE free opportunity banner.
**What breaks:** outcomes are honest ("a base to build on", not "become a professional") — good — but there's no *path* visual: finish Computer Basics → Office → then what? The honest certificate FAQ ("not a government licence") is great; a "what learners did next" page is missing (and per policy, must stay evidence-based, no invented testimonials).
**Fix (P2):** a "Learning paths" block on /classes chaining 2–3 courses with total ₦ and total weeks (data already exists in `catalog.ts`).

#### A10. Small-business owner (invoices, flyers, web presence)
**Needs:** price, turnaround, "can you just do it for me?"
**What works:** `/services` and the shop's one-time digital products (invoice/stock sheet, content planner) answer both "teach me" and "sell me the file".
**What breaks:** the split between *learning a skill*, *buying a template*, and *hiring CEA* is never explained in one place; nav puts "Shop" second — commerce before learning — which muddies the academy identity for this visitor.
**Fix (P1):** reorder nav (Courses · Free Lessons · Apply · More); one "Three ways we help" strip on the home page (Learn it / Buy the file / Hire us) with plain labels.

### Group B — The money & trust journey

#### B1. The applicant mid-form (the 5-step wizard)
**Needs:** to finish without losing work or confidence.
**What breaks — the worst single finding in this audit:**
- **At the reviewed baseline, the draft was memory-only (now addressed locally).** `apply/index.tsx` holds the entire 5-step draft in `useState`; there is **zero** `localStorage` usage in `src/routes/apply/` or `src/components/enrollment/` (verified by grep). One accidental pull-to-refresh, one Chrome "tab discarded" on a low-RAM Android, one network blip during submit → everything retyped. For the exact demographic this site serves, this will silently kill applications.
- Submission failure copy is generic: "Something went wrong submitting your registration. Please try again." — no WhatsApp escape, no "your answers are saved".
- Step labels: "Fee & plan", "Schedule", "Review & submit" — mild jargon; the mobile rail shows *numbers only* (labels `sm:hidden`), so a beginner sees 5 mysterious boxes.
- Progress rail is not clickable (see A4); no "Step 2 of 5" plain-text announcement.
- The step-1 explainer — "This form is for the 13 core flyer short courses. Specialist-course availability and longer-programme enquiries go to admissions." — leaks the internal word "**flyer**" (from the course-flyer data source) and sends the non-listed-course user to a dead end ("go to admissions" = where? no link in that sentence).
- `birthYear` validation caps at 2012 — fine, but the field's purpose is unexplained ("why do you need my age?").
**Fix (P0):** persist the draft to `localStorage` on every `update()` (keyed, with a 30-day expiry) and restore on mount with a "We saved your answers — continue where you left off" note; on submit failure, keep the draft and show "Your answers are saved on this phone" + WhatsApp button with prefilled step/course. Relabel steps: "1 Choose course · 2 Choose days · 3 See the fee · 4 Your details · 5 Check & send". Show "Step 2 of 5" text. Link "other courses" to `/contact` explicitly. One-line reason under optional-but-sensitive fields ("We use your birth year only to place you in the right group.").

#### B2. The anxious payer (Paystack card / bank transfer)
**Needs:** certainty that money and place are linked; no double-payment fear.
**What works:** `/apply/pay` verifies with the backend and distinguishes paid / deposit / pending / failed honestly; magic-link gate on 401/403 instead of leaking state; ApplicantAccess says "Do not submit or pay again".
**What breaks:** the **pending** state is the anxiety peak and gets the least support — no "your money is safe, bank confirmations take up to X minutes", no auto-retry countdown (single 600 ms-delayed check + a manual Refresh button), no WhatsApp CTA with the reference. Receipt recovery (`/apply/receipt/$ref`) is again email-gated.
**Fix (P1):** pending screen = plain-language reassurance + auto re-verify every 15 s for 2 minutes + "Still pending? Send us your reference on WhatsApp" (prefilled). Print/save receipt must be reachable with reference+phone once B1's recovery path exists.

#### B3. The lost applicant (returns 3 days later, different phone)
**Needs:** "find my application" in ≤ 2 steps.
**What breaks:** the only signposted route is `/apply/status` → reference + email magic link (A6/B1 findings). A beginner who saved nothing is stranded; the realistic behaviour is a frustrated WhatsApp message to the academy — which the 17-Oct audit explicitly wants to reduce.
**Fix (P0 with A6):** success screen forces a save/share moment; status page offers verified-phone recovery only after an OTP/identity-verification flow is approved; add "Find my application" to the footer under "Study with us".

#### B4. Shop customer (digital templates)
**What works:** one-time products, emailed files, delivery/refunds pages exist, checkout + return routes.
**What breaks:** shop trust is thin for first-time buyers: no sample preview of the file, no "what exactly do I get" list on the product card.
**Fix (P2):** one screenshot preview + a 3-bullet "you get" list per product; state the email-delivery window in the buy button area ("Pay once · file emailed within 1 business day" — already in meta description, promote it onto the page).

#### B5. Employer verifying a certificate
**What works:** public `/certificates/verify` exists; honest FAQ about what the certificate is.
**Fix (P2):** put the verify link where certificates are discussed (course pages, FAQ answer) — currently only in the footer's Legal column, which is a strange home for it.

### Group C — The people who run CEA (internal roles)

#### C1. Solo founder / admissions officer
**Needs:** every applicant self-served; exceptions surfaced, not discovered.
**What breaks:** because of A6/B1/B3, predictable routine WhatsApp traffic ("I applied but I lost my reference", "my form refreshed and I lost everything", "I can't open the link in my email") will continue — exactly the interventions the 17-Oct plan targets. The owner worklist (`owner-worklist.tsx`) exists but the *public* side keeps manufacturing avoidable support load.
**Fix:** the P0s above are simultaneously founder-time-savers. Additionally: log a funnel event at each apply step (analytics infra exists but "no public funnel event calls were found" per the 17-Oct audit) so abandonment is visible without guessing.

#### C2. Instructor
**Needs:** the published lecture to match what's taught; session pages that learners can follow on a phone.
**What works:** the tutorial production standard (`docs/tutorial-master-prompt.md`) and exemplar lectures are strong; session links labelled lecture-vs-outline (honest).
**What breaks:** long lecture pages have no in-page "on this page" nav or progress marker for learners mid-lesson on mobile; figures are original diagrams (good) but there's no zoom affordance for small screens.
**Fix (P2):** sticky mini-TOC on lesson pages; tap-to-zoom figures; a "Mark as read / Next lesson" footer control (state can be local-only for logged-out readers).

#### C3. Accountant / finance
Covered by the 17-Oct audit's R1–R4 ledger findings — not repeated here. Beginner-UX angle only: receipts must state in plain words what was paid, for which course, and what remains ("You paid ₦10,000 deposit. Remaining: ₦20,000 before week 2."). Check `receipt.$ref.tsx` copy against that bar. (P1)

#### C4. Receptionist / front desk
**Needs:** a walk-in can be enrolled on the reception laptop in 2 minutes.
**What breaks:** the public apply form is visitor-shaped (consents, Turnstile, magic links). There is no "enrol someone standing in front of me" fast path in the public site; the CEA-OS admissions workspace is the right home for it.
**Fix (P2):** document/verify the assisted-enrolment path inside `/app/admissions` and train it as *the* walk-in procedure (do not bolt a second form onto the public site).

#### C5. IT / developer maintaining this repo
**Needs:** the simplicity fixes above to not fight the architecture.
**Notes:** they don't — draft persistence is 20 lines in `apply/index.tsx`; image renditions are a build script (a `scripts/` generator pattern already exists); manifest rename is 2 lines; cookie-banner gating is an env check already present in `ga4.ts`/`adsense.ts` (render `CookieConsent` only when `NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING === "true"`). The generated-routes pipeline (`scripts/generate-next-routes.mjs`) means nav/label changes stay single-source. (All P0/P1 fixes are backend-free except phone-based recovery.)

### Group D — Specialist critics

#### D1. UX / behavioural-design critic
- **Choice overload:** homepage presents Courses, Finder, 6 course cards, Notes, 6 lesson cards, visit, FAQ, apply CTA — good rhythm, but the *decision* the beginner must make (paid course vs free lessons vs WhatsApp question) is never framed as an explicit 3-way choice. Frame it once, near the top: "Learn free · Join a class · Ask us on WhatsApp". (P1)
- **Loss aversion misuse:** the "Free · Opportunity" iDICE banner can be misread as "courses are free". Add "(this programme is free; our courses have listed fees)" or scope the banner to the opportunity page + a small home strip. (P1)
- **Peak-end rule:** the application's *end* (success screen) is decent (ref + copy + WhatsApp), but the *peak anxiety* moment (pending payment) is the weakest screen (B2). Fix the peak, keep the end. (P1)
- **Friction audit:** Turnstile on submit = keep (bots are real); theme toggle in header = harmless but is the least useful control for this audience on mobile — fine to keep, don't add more toggles. (P2)
- **Naming discipline:** "Notes" / "lessons" / "blog" (A1) and "Lumina Studio" residue (D4) violate the one-name-one-thing rule. (P1)

#### D2. Accessibility (WCAG 2.2 AA) auditor
Beyond A3/A4: verify focus-visible rings on the custom step rail and finder task rows (they're divs/labels — confirm they're real radio inputs with labels; `course-finder.tsx` uses `aria-hidden` decoration but the selection mechanism must be keyboard-operable); check `text-foreground/45` contrast (course-card index), `muted-foreground` on `bg-muted/30` footer, and the WhatsApp-green button's white text (≈2.2:1 for #25D366 vs white text? — the float uses `text-white` on `#25D366`, which **fails** AA for normal text; darken to ~#128C4A or use dark text). Accordion (Radix) and dropdown semantics are fine. `lang="en"` is set — needed for the promised Nigerian-language work later (`lang` switching). Run one full axe + keyboard pass before claiming AA on `/accessibility`. (P0 for the contrast items, P1 for the rest.)

#### D3. Performance / Core Web Vitals engineer
- Images (A5) are the whole story on mobile: no `next/image`, no `srcset`, 76 MB library, ~170 KB JPEGs. LCP on the homepage is an image on 3G. (P0)
- JS: full client components for finder/apply are acceptable; check the generated-routes build isn't shipping the mock registry to production (README says dynamic import — verify bundle with `@next/bundle-analyzer` once). (P2)
- Fonts: Bricolage variable preloaded — good; confirm `font-display: swap` and that only used weights ship. (P2)
- The honest `offline.html` + network-first SW is the right architecture; extend to content caching (A5). (P1)

#### D4. Security auditor
- **`/merchant` is a public page** exposing Google Merchant Center configuration and feed URLs (Merchant ID 656455813). This is internal operational data; gate it behind a role workspace or delete from the public surface. (P2 — review intended audience; public identifiers are not secrets)
- Sessions/RBAC/CSRF/origin design is solid per README and the 17-Oct audit; dev-token paths are correctly env-gated (`applicant-access.tsx` shows `devToken` only when `NODE_ENV !== "production"`).
- Magic-link recovery is secure-by-default (reference alone reveals nothing) — the A6 fix must preserve this: phone-based recovery must verify ownership before revealing any private status or personal data. (P0 constraint on the fix)
- Turnstile on submit and magic links: keep. Rate limits exist (KV). For the Android app: bearer-token auth is already supported by `rbacGuard` — use it with secure storage, never WebView cookie sharing with third-party origins. (see app plan)

#### D5. Privacy / legal reviewer (NDPA 2023)
- Cookie consent exists and is *currently gating nothing* (tracking paused) while still collecting a consent state — see D6. When tracking is enabled, the banner must appear **before** GA4/AdSense initialise (verify `grantConsent` ordering) and must not overlap the WhatsApp float (it does: consent is `fixed inset-x-0 bottom-0 z-[100]`, float is `bottom-4 right-4 z-50` — on a 360×640 screen the banner covers the float entirely). (P1)
- Applying collects birth year, gender, city, employer, goal — each needs a one-line purpose statement at the field (some exist per the InfoPanel pattern); minors' enrolment rules flagged in the 17-Oct audit still apply.
- `/accessibility`, `/privacy`, `/terms`, `/refunds`, `/shipping` exist — good hygiene; ensure the privacy policy names WhatsApp as a data channel (it is one — prefilled messages carry references). (P2)

#### D6. SEO / Google reviewer
- Strong: 400-URL sitemap, JSON-LD everywhere (Organization, LocalBusiness, Course, FAQPage, HowTo), canonicals, honest titles, legacy redirects (`/pricing`, `/programs`, `/marketplace`, `/vizier`, `/work`, `/careers`, `/stories`, `/virtual-tour` all redirect — clean).
- Fix: the homepage says "Explore all **210** lessons" — derived from `blogPosts.length` (good, no drift), but `/classes` hub FAQ derives "X of Y sessions published" separately; keep both derived (they are) and never hardcode. The name "Notes" vs `/blog` vs "lessons" costs branded-search clarity: a beginner told "go to CEA lessons" searches "CEA lessons", lands on a page titled "Notes". Align titles/H1s to "Free computer lessons (Notes)". (P2)
- `/merchant` should also be `noindex`d until gated (D4). (P0 pair)

#### D7. Conversion / marketing analyst
- The funnel is untracked (17-Oct audit: no public funnel events). Until events exist, every CTA debate is opinion. Ship 6 events: finder_complete, apply_step_viewed(1–5), apply_submitted, apply_failed, whatsapp_click, pay_pending_viewed. GA4 is consent-gated but the internal `track()` queue can feed first-party counts without cookies. (P1)
- Homepage CTA stack ("View courses" primary + "Apply" secondary) is fine *if* the finder is directly beneath (it is). The missing CTA is the free-lessons path for the unready visitor — "Not ready for a class? Read Lesson 1 free" converts the biggest segment (curious beginners) instead of losing them. (P1)
- WhatsApp float prefill is generic ("I would like to make an enquiry") — prefill *context* (page title + course slug) so the founder's first message back is already informed; conversion-wise this is the single cheapest win in the list. (P1)

#### D8. Localization / Nigerian-market reviewer
- ₦ pricing everywhere, WAT hours, +234 formatting, RC number, real PH photos, "off Rumuola Road" local-landmark addressing — genuinely well localised already.
- Phone input: validation accepts `+?[0-9\s-()]{7,20}` but the field should *auto-format* to `+234 …` and accept the ubiquitous `0803…` local format by normalising (a beginner types `08031234567`; current regex accepts it, good — but no formatting feedback increases typo risk). Add `inputMode="tel"` + as-you-type formatting. (P1)
- Paystack is the right processor; bank transfer with proof upload matches actual Nigerian behaviour; USSD is missing — Paystack supports USSD *902* etc.; listing "Pay with your bank app / USSD" in plain words on the payment step matches how people actually pay. (P2)
- Data-saver reality (A5) *is* the Nigerian localisation issue; it's covered there.

#### D9. Competitor analyst (PH coding academies & computer centres)
- CEA's differentiators are already the right ones: published fees, published full lectures (nobody else shows the actual teaching), honest outcomes, small practical cohorts. The 210 free lessons are a moat — competitors gate everything.
- Gap: competitors win walk-ins with *street-level* clarity ("start any Monday"). CEA's "we confirm dates with you" is honest but reads as uncertainty; once real cohort dates exist (17-Oct plan), show "Next class starts: Mon 3 Nov — 4 seats left" on course pages. Until then, "Classes start every month — apply and we'll confirm your dates" is the honest maximum. (P1 pending cohort data)

#### D10. Government / iDICE programme reviewer
- The iDICE page + banner position is good; ensure the opportunity page states eligibility in 3 bullets max, the application steps, and a physical-visit alternative (not every applicant is online-fluent). (P2)
- Certificate honesty FAQ protects credibility with reviewers. Keep.

#### D11. QA tester (real devices & networks)
- Test matrix that must pass before any "simple to use" claim: Tecno/Infinix-class Android (2 GB RAM) on Chrome; 3G throttle; apply flow with a forced refresh at step 4 (currently fails — B1); WhatsApp float + cookie banner overlap at 360×640 (currently fails — D5); form recovery without email (currently fails — A6); lesson page offline after one visit (currently fails — A5). Every P0 above is expressible as one of these five tests. (P0, ongoing)

#### D12. Content editor
- The human-teaching audit's voice rules are being followed in Notes (the lesson excerpts are warm and concrete). The *transactional* pages (apply, pay, status) have not had that pass — they still speak in system nouns ("preferences", "deliverable timetable", "programme enquiries"). Run the same voice standard over the five money pages. (P1)
- One-name-one-thing: "Notes"/"lessons"/"blog", "course"/"class"/"programme" (the finder says "course", `/classes` URL says classes, legacy "programmes" survives in code slugs `programSlug` — user-facing copy must settle on ONE word: **course**). (P1)

#### D13. The installed-app user (PWA → bridge to Android)
- **The manifest installs as "Lumina"** (`"name": "Lumina Studio — Cyber Elias Academy"`, `"short_name": "Lumina"`, `public/manifest.webmanifest`) — an internal codename on the user's home screen. (P0, two-line fix: "Cyber Elias Academy" / "CEA".)
- Manifest shortcuts point at `/app/learn` and `/app/messages` — signed-in routes; a freshly installed, signed-out user tapping a shortcut hits a redirect to sign-in with no explanation. Shortcuts should target public value (Free lessons, Courses, Apply) until auth state can be checked. (P0)
- `theme_color` `#7a2434` matches the brand; icons exist in 192/512/maskable — good; add `screenshots` (Play Store + Chrome install prompt both use them). (P2)

---

## 3. Prioritised fix list (the "make it newbie-proof" backlog)

### P0 — do before promoting the site/app further (days, not weeks)
| # | Fix | Where | Effort |
|---|-----|-------|--------|
| 1 | Persist apply draft in localStorage; restore with "we saved your answers" | `src/routes/apply/index.tsx` | S |
| 2 | Manifest rename → "Cyber Elias Academy"/"CEA"; shortcuts → public pages | `public/manifest.webmanifest` | XS |
| 3 | WhatsApp-green float contrast fix; cookie banner hidden while tracking disabled; when enabled, never overlap the float | `whatsapp-float.tsx`, `providers.tsx`, `cookie-consent.tsx` | S |
| 4 | Image renditions (AVIF/WebP, sized, lazy, width/height) for home + course cards + lesson thumbs | `photos.tsx`, build script, `public/images` | M |
| 5 | Focus the step heading on wizard step change; `role="alert"` error summary + focus first error; clickable completed steps | `apply/index.tsx` | S |
| 6 | Gate or `noindex` `/merchant` | `src/routes/merchant.tsx` | XS |
| 7 | Success screen: "Save your code" moment — self-share to WhatsApp + copy + printed receipt link | `success-screen.tsx` | S |
| 8 | Phone-only application + reference+phone status recovery (backend: registrations already store phone; add verified-phone ownership checks, rate limits and anti-enumeration protections) | `apply`, `applicant-access.tsx`, backend `enrollments`/`applications` | L |

### P1 — the comprehension layer (1–2 weeks alongside P0)
| # | Fix | Where |
|---|-----|-------|
| 9 | Copy pass to Charter Rule 1 on: home hero, finder labels, apply hero+steps, pay/pending, status. Kill "flyer", "deliverable timetable", "collect interest only", "Admissions" nav label | routes above |
| 10 | Finder: experience question first; "I am new" short-circuits to Basics + Lesson 1; one big action in the result + WhatsApp alt | `course-finder.tsx` |
| 11 | Nav/order: Courses · Free Lessons · Apply · Visit · About; "Three ways we help" strip; free-lessons CTA in hero area | `site-header.tsx`, `index.tsx` |
| 12 | Pending-payment screen: reassurance copy + auto-retry 15 s×8 + WhatsApp prefilled with reference | `apply/pay.tsx` |
| 13 | WhatsApp float prefill carries page/course context | `whatsapp-float.tsx` |
| 14 | Footer address → Google Maps link; "Get directions"/"Call now" on `/visit` + InfoPanel | footer, visit, enrollment |
| 15 | Phone field auto-format (+234), `inputMode="tel"` | `details-step.tsx` |
| 16 | Extend sw.js to stale-while-revalidate `/blog/*`, `/classes/*` (offline lessons) | `public/sw.js` |
| 17 | Contrast sweep: `foreground/45`, `text-[10px]`/`[11px]` meta on beginner surfaces → ≥13 px & AA | classes, finder, footer notes |
| 18 | 6 funnel events via existing `track()` | apply, finder, float, pay |
| 19 | One plain-money explainer page ("How payment works", anti-fraud line) linked from apply step 3 | new route |
| 20 | iDICE banner scope clarification ("this programme is free; courses have listed fees") | banner |

### P2 — differentiation & delight
- "Simple mode" copy layer + 🔊 read-aloud (Web Speech API) on lessons and the five money pages.
- Nigerian-language toggles via the existing `localization` workspace pipeline.
- Learning-paths chaining on /classes; certificate verify link surfaced on course pages.
- Lesson pages: sticky mini-TOC, tap-to-zoom figures, local "Next lesson" control.
- Text-size setting (Normal/Large/Largest) — ship first in the Android app.
- Manifest `screenshots`; USSD/bank-app payment wording; cohort-date display once real schedules exist.

### The five-test acceptance gate (run on a Tecno-class Android, 3G)
1. First visit → finds "never used a computer" path → reaches Lesson 1 in ≤ 2 taps.
2. Starts apply, kills the browser at step 4, returns → draft intact, finishes, saves reference without email.
3. Pays (test mode) → pending screen explains itself → resolves or offers WhatsApp with reference.
4. Reads a lesson offline after one online visit.
5. Every screen's primary action is nameable by the tester in their own words afterwards.

---

## 4. What is already good (protect these in every fix)

- Task-first finder and honest "this guide is private to your browser" note.
- Published fees, durations, deliverables, and full lectures — radical transparency competitors don't match.
- Honest certificate & duration claims ("No, and we will not pretend otherwise").
- Real address, RC number, founder face, campus photos, WhatsApp, tel/mailto.
- Network-first SW with an honest offline page; privacy-filtered Vercel Analytics; consent-gated GA4/AdSense (currently off).
- Server-enforced RBAC, hashed sessions, signed Paystack webhooks, R2-scoped uploads — the platform under the simplicity work is genuinely well built.

The simplicity programme is not a redesign. It is: **save their work, speak their words, shrink the bytes, widen the recovery paths, and never let a beginner reach a dead end without a WhatsApp button.**
