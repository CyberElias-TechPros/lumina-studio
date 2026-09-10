# CEA.ng AdSense Recovery Plan — From "Low Value Content" to High-Value Human Academy

**Date:** 2026-09-10 · **Status:** Phase 0–2 implemented (this branch) — see implementation log at §12 · **Goal:** Get cea.ng approved for AdSense by overhauling the site from a SaaS-product-feeling template into a genuinely human, high-value Nigerian tech academy site.

---

## 1. Executive summary

AdSense rejected the site for **Low value content**, which in practice means a human reviewer looked at cea.ng and concluded: *this site does not yet demonstrate original, trustworthy, people-first content worth monetising.* That verdict is consistent with what a cold audit of this repo shows. The site's problems stack on top of each other:

| # | Problem | AdSense lens |
|---|---------|--------------|
| 1 | **Zero real photography.** Every visual is an SVG gradient (`SceneArt` / `ProgramArt`). No faces, no campus, no classrooms, no humans anywhere. | Looks templated / auto-generated; fails the "real business" sniff test |
| 2 | **SaaS-product voice, not school voice.** "Five engines. One academy." "CEA-OS." "32 actors." "Product preview." The homepage hero is a fake dashboard mock with invented stats ("42 peers", "96% match"). | Reads as a software landing page, not an institution a parent would trust with school fees |
| 3 | **Walls of low-utility text.** Blog posts are very long but generic and repetitive (classic AI-article shape). The About page is ~950 lines of manifesto. | "Thin content" isn't just short content — it's content with no original value per paragraph |
| 4 | **Programmatic content at scale with no E-E-A-T.** ~62 glossary pages × 3 short generic paragraphs, 19 career guides, 1,958 library items, all by "Team CEA", no author bios, no credentials, no photos, no citations. | Doorway-page / content-farm footprint |
| 5 | **Indexed empty-state pages.** `/stories` ("first stories still being written"), `/work` (no real client work — "focus areas"), `/events` with past/hypothetical events, `/alumni` with no alumni, `/virtual-tour` of a campus with no photos. | Placeholder content = low value by definition |
| 6 | **Visible "Ad space" placeholder boxes** (`src/components/marketing/ad-slots.tsx`) rendered on live pages. | Literally signals "made for AdSense" to the reviewer |
| 7 | **Trust signals are thin.** One founder, initials-avatar, no photo. Address is just "Port Harcourt, Rivers State". No CAC/registration info, no real team, no verifiable facts. | No Experience/Expertise/Authoritativeness/Trustworthiness |

**The fix is not "add more text". It is: fewer pages, more proof, real humans, real photos, real authorship — then reapply.** This plan proposes exactly that, in 6 phases, sequenced so the highest-risk items die first.

**Guiding principle for every change:** *Would a skeptical parent in Port Harcourt, holding ₦850,000 in school fees, trust this page?* If not, it doesn't ship.

---

## 2. What "high value" means for AdSense here (translated to actions)

Google's publisher guidance boils down to five tests. Here's each test, the current verdict, and the target:

1. **Unique, original content** — *Now:* generic explainers anyone could generate; glossary/library look aggregated. *Target:* every indexed page contains something only CEA could publish (local data, real teaching experience, real projects, real people).
2. **Good user experience / clear purpose** — *Now:* SaaS maze; users can't tell if it's a school, a software product, or a blog farm. *Target:* within 5 seconds a visitor knows "this is a tech school in Port Harcourt, these are the courses, this is how to apply."
3. **Sufficient content** — *Now:* paradoxically both bloated and empty (hundreds of thin URLs + placeholder pages). *Target:* fewer URLs, each one substantial (see §6 word-count bars).
4. **Trustworthy / transparent ownership** — *Now:* near-anonymous. *Target:* named humans with faces, bios, credentials; real address; real contact; legal pages with teeth.
5. **Policy-clean** — *Now:* ad placeholders, possibly misleading claims ("placement promise", invented dashboard stats, hypothetical events presented as real). *Target:* zero placeholders, zero unverifiable claims, full privacy/terms/cookies compliance.

---

## 3. Evidence audit (page by page, with file paths)

### 3.1 Homepage — `src/routes/index.tsx` (584 lines)
- Hero sells "Learn tech. Build real work. Get hired." then shows a **fake product dashboard** ("Student dashboard · preview", invented progress bars, "42 peers", "Job match 96%"). A school homepage should show **students, teachers, classrooms** — not a SaaS screenshot.
- "Five engines. One academy." + "Built for 32 actors" + "Preview the dashboards" — pure dev-tool positioning. No parent or student thinks in "engines/actors".
- "Stories we're yet to earn" testimonial section — honest, but it's a **testimonial section with no testimonials**; reviewers count this as filler.
- Partner marquee ("We're building relationships with…") with no named partners = implication without evidence. **Kill or name real ones.**

### 3.2 About — `src/routes/about.tsx` (952 lines, the longest page on the site)
- A ~5,000-word manifesto: 20 "beginning areas", 9 education domains × ~7 topics, 5 pillars, 17 services, 11 initiatives, 8 centre roles, 8 platform features, 7 principles, 10 journey steps, 8 success questions, 14 audiences. It's ~90% **badge walls and lists**, ~0% verifiable fact, zero photos.
- AdSense reviewers (and users) experience this as text-stuffing. A great About page is: who founded it, why, who's here now (faces), where you are (photos/map), what you've actually done, what's next. ~800–1,200 words + media.

### 3.3 Team — `src/routes/team.tsx`
- One person, initials avatar ("ED" in a coloured box), no photo, no LinkedIn, no credentials, no story. "Advisors" section actually contains two **department descriptions with no humans** ("Engineering & Curriculum", "Business Development") — this reads as fabricated team padding. Either show real humans or cut the section.

### 3.4 Stories — `src/routes/stories.tsx` / Work — `src/routes/work.tsx`
- `/stories`: an empty page with 4 paragraphs explaining *why* it's empty + an "editorial standard". Honest, but **an indexed page whose content is "we have no content"**. Must be `noindex` until ≥3 real stories exist.
- `/work`: meta description claims "logistics platforms, security overhauls, multi-campus ERPs… delivered by CEA" but the page shows generic "focus areas" with no client names, screenshots, results, or dates. **The meta description is a verifiability liability — rewrite immediately.** Same treatment: noindex until ≥3 real case studies, or convert to an honest "Services" capabilities page with no delivery claims.

### 3.5 Blog — `src/routes/blog.*` + `src/data/site.ts` (blogPosts) + `src/data/blog-posts-new.ts`
- ~10–14 posts, all by "Cyber Elias Academy / Team CEA". No author pages, no bios, no headshots, no credentials.
- Body text is extremely long but low-density: repetitive generic advice ("share your work publicly" appears in many forms across posts), Nigeria-name-dropping without local data, no interviews, no original research, no screenshots, no code that was actually run, no dates/versions on facts. This is the exact shape reviewers associate with mass-produced AI content.
- Fix: fewer posts, each with a named human author, original material (student work, real numbers, real screenshots, real quotes), hero images, "last updated" dates, sources.

### 3.6 Glossary — `src/routes/glossary*.tsx` + `src/data/glossary.ts` (62 terms)
- Each term ≈ 3 short paragraphs (~120 words). 62 near-identical thin pages = the single biggest **doorway-page risk** on the site.
- Fix options (pick one in Phase 3): (a) massively expand each term to 600–1,000 words with examples/diagrams and cut count to ~25 genuinely useful terms; or (b) merge into ~8 long-form "concept guides" and redirect/noindex the rest; or (c) noindex all term pages and keep only the index. Recommendation: (b).

### 3.7 Career guides — `src/routes/career-guides*.tsx` + `src/data/career-guides.ts` (~19 guides)
- Better depth than glossary, but same authorship problem ("Team CEA"), no salary-data sourcing (ranges like ₦150k–₦400k stated without source/methodology/date), no photos, no interviews with people in the roles.
- Fix: add methodology box ("How we estimated salaries: 24 job posts reviewed Aug 2026 + 6 practitioner interviews"), named author, reviewer credit, 1 interview quote per guide, hero image. Cut any guide that can't meet the bar.

### 3.8 Resources / Library / Marketplace / Events / Alumni / Community / Partners / Scholarships
- **Library** (`src/data/library.ts`, 59k lines, "1,958 items"): an aggregated catalog with no evidence of human curation on-page. Highest-risk "scraped/aggregated content" signal. Fix: either prove curation (staff picks with signed mini-reviews, "added by X on Y because Z") or noindex the catalog and keep a small human "Staff picks" shelf (see §6.5).
- **Resources** (12 templates): genuinely useful format, but "download" templates must actually exist as files, not just text descriptions. Every resource page needs the real downloadable file + preview image.
- **Events** (`events` in site.ts): dates in Aug/Sep 2026 with specific venues. If these events didn't actually happen, **remove them now** — fabricated events are a trust-killer. Replace with: one real upcoming event (even small) + past events only with photos/recaps.
- **Alumni / Community / Partners / Scholarships / Marketplace / Virtual-tour**: audit each against the rule "no page may promise what doesn't exist yet." Virtual tour of an unphotographed campus must go (replace with real photo gallery when photos exist, else a "Visit us" page with map + real visiting info).

### 3.9 Programs & Pricing — `src/routes/programs*`, `src/routes/pricing.tsx`, `src/routes/admissions.tsx`
- Structurally the strongest section (real curricula, modules, FAQs, prices in naira). Keep, but humanise: instructor names + faces per program, real classroom photos, sample lesson video or slides, capstone examples with screenshots, honest cohort status ("Cohort 01: applications open, 24 seats" — only if true).
- Pricing page: ensure every price, instalment claim, and "Income Share Agreement" mention is currently true and explained. Remove aspirational financing products.

### 3.10 Trust/legal/contact plumbing
- Contact page (`src/routes/contact.tsx`) is decent (real phone, emails, hours) — but address is city-only. Add street address + map embed + photos of the entrance once available. "Talk to a human" headline with zero human faces on the page is ironic — add the actual admissions person's name + photo.
- Privacy/Terms exist — verify they mention AdSense/cookies correctly (see §8), add "last updated" dates, add a real data-controller contact.
- `public/ads.txt` exists (good). `robots.txt`/`sitemap.xml` are sane — but the sitemap currently submits thin/empty URLs for indexing; prune it in Phase 5.

### 3.11 The ad placeholders — `src/components/marketing/ad-slots.tsx`
- Dashed "Ad space — enable via ADSENSE_CLIENT" boxes rendered on public pages. **Remove from all renders immediately** (keep the component file, render nothing until approval). A reviewer seeing empty ad boxes concludes "built to carry ads, content is filler". This is a day-one fix.

---

## 4. Strategy: the repositioning

**From:** "CEA-OS — a digital operating system / SaaS platform with five engines and 32 actors that also runs an academy."
**To:** "Cyber Elias Academy — a real tech school in Port Harcourt with real teachers, real students, and real work. (Powered internally by our own platform, CEA-OS — mentioned once in the footer, not sold on the homepage.)"

Concretely:

| SaaS element (demote or remove from public site) | Human replacement (promote) |
|---|---|
| "Five engines / 32 actors / dashboards" hero | Students learning, teachers teaching, campus, Port Harcourt |
| Fake dashboard preview with invented stats | Real photos + one honest stat band (only true numbers) |
| `SceneArt`/`ProgramArt` SVG gradients everywhere | Real photography (shot list in §5) + a small set of custom illustrations |
| "Product preview" badges | "Cohort 01 · Applications open" + real seat count/deadline |
| CEA-OS as the product being sold | CEA-OS as backstage infra; move `/engines` + `/app` previews out of main nav, noindex `/app/*` (already disallowed — verify headers) |
| Anonymous "Team CEA" authorship | Named authors with faces, bios, credentials |
| Manifesto-length pages | Shorter pages where every section earns its place; depth moves into genuinely useful guides |
| Placeholder/empty pages indexed | Aggressive noindex + prune until real substance exists |

**No full rewrite of the app is needed.** The `/app/*` dashboards, backend, and RBAC stay as-is (they're the real product for enrolled users). The overhaul targets the **public marketing + content surface only** (~35 routes + data files). Design system (Tailwind/shadcn) stays; we change imagery, copy, IA, and content depth.

---

## 5. Photography & media plan (the single highest-leverage workstream)

Nothing else in this plan matters as much as real photos. A school with no photos of people or place cannot pass a human review.

### 5.1 Minimum viable photo set (need before reapplying)
1. **Founder portrait** — Ellis Dennis Graham, natural light, campus or office. Used on: About, Team, blog author byline, contact ("talk to us").
2. **Team/instructor portraits** — every instructor and staff member named on the site (even if it's 2–3 people). Consistent style: same background treatment, 800×800+.
3. **Campus proof** — building exterior with signage, entrance, reception, 2–3 classroom/lab shots *with people in them*, students collaborating (2–3 candids). Minimum 8–10 images.
4. **Teaching in action** — instructor at whiteboard/screen, students at workstations, code review / pair work. 4–6 images.
5. **Program hero images** — one real or realistic image per flagship program (6 programs). Classroom/lab shots can double here with different crops.
6. **Blog/guide heroes** — one image per kept article (reuse campus shots + author photos; no stock faces pretending to be staff).
7. **Contact/visit** — entrance photo, map embed, "how to find us" (bus stop / landmark description — genuinely useful local content).

### 5.2 How to get them (pick one track this week)
- **Track A — Real shoot (strongly preferred):** one half-day shoot at the campus with a Port Harcourt photographer. Shot list above + 2 short video clips (30–60s: founder intro, classroom minute). Cost: typically ₦50k–₦150k. This is the fastest trust upgrade available.
- **Track B — Founder-shot interim:** smartphone, daylight, landscape, uncluttered backgrounds. Good enough to start; replace with Track A later. Rules: no filters, no AI faces, no stock passed off as real.
- **Track C — Stock (limited, labelled):** only for generic blog heroes, only from Pexels/Unsplash with Nigerian/African representation, always credited, **never** used for team/campus/students/testimonials. Any page implying "this is us" must use real photos.
- **Never:** AI-generated faces, stock "testimonial" headshots, fake dashboard screenshots presented as product, watermarked images.

### 5.3 Media engineering tasks
- Add `public/images/...` structure (`team/`, `campus/`, `programs/`, `blog/`) with descriptive filenames + alt text on every image.
- Replace `SceneArt`/`ProgramArt` usage on public routes with `<OptimizedImage>` (add responsive `srcset`, lazy-loading below fold, explicit width/height to protect CLS).
- Add real Open Graph images per section (replace/augment `og-default.png` etc. with photo-based cards).
- Add `ImageObject` schema where it helps (author photos, campus photos) and keep EXIF/location out of uploads.

---

## 6. Content overhaul (page-by-page build spec)

### 6.1 New editorial bar (applies to every indexed page)
- **Named human author** with bio + photo + credentials; "Reviewed by X" where relevant; published + "Last updated" dates.
- **Original-value test:** each page must contain ≥1 thing only CEA could publish: local data, practitioner quote, student artifact, real screenshot, real photo, methodology, or first-hand experience.
- **Length bars:** cornerstone guides ≥1,500 words; blog posts ≥1,000 words (and cut ruthlessly if a post can't justify it — length without density is the current disease); program pages ≥800 words of *specific* curriculum detail; glossary-style explainers either ≥600 words or merged away.
- **Voice:** concrete, Nigerian, first-person-plural where honest ("we teach…", "our students…"), no "leverage cutting-edge synergies" SaaS-ese. Kill: "engine", "actor", "ecosystem", "OS", "supercharge", "seamless", "cutting-edge" from public copy except where technically accurate.
- **Citations:** salary figures, market claims, and regulatory claims (CBN, NDPC) get named sources + dates. Add a "Sources & methodology" box on data-bearing pages.
- **Freshness:** every content page shows last-updated; commit to a quarterly review pass (there's already `content-freshness.tsx` — wire it to real dates).

### 6.2 Homepage rebuild (`src/routes/index.tsx`)
New structure (7 sections max):
1. **Hero:** photo of real teaching/learning; H1 "Practical tech training in Port Harcourt — from zero to hired."; sub: what, where, for whom, next cohort date; two CTAs (View programs / Apply); trust microcopy (real address, real phone).
2. **Proof band:** ONLY true numbers (e.g., programs count, instructors, cohort seats — no invented alumni/salary stats. If Cohort 01 hasn't run, say "Cohort 01 · Applications open" — honesty is the brand).
3. **Programs grid** (keep, with real images + instructor names).
4. **How it works** (3–4 steps: Apply → Learn by building → Capstone → Career support) with photos.
5. **From the classroom** — real artifacts: student project screenshots, code, designs (even founder-built examples labelled honestly as "example capstone standard").
6. **Latest from the blog** (3 real posts with authors + faces).
7. **Visit / Apply CTA** with map + photo.
Delete: fake dashboard, engines grid, "32 actors", partner marquee (until named), empty testimonials, SaaS feature cards.

### 6.3 About rewrite (`src/routes/about.tsx`) — cut ~85%
New structure (~1,000 words): founder story with photo → why Port Harcourt (with local specifics) → who we are today (team photos, roles, credentials) → what we've actually done (dated milestones — small is fine) → where we're going (short, no fantasy) → visit CTA. Move the full vision manifesto to a **single** clearly-labelled "Our vision" sub-page or founder's letter (bylined, dated) if you want to keep it — not as the About page.

### 6.4 Team (`src/routes/team.tsx`) + new author pages
- Real photos, real bios (background, credentials, what they teach/do), LinkedIn links, "ask me about X".
- Delete fake "advisors" cards or replace with real advisors (named, consented, photographed).
- Add `/about/founder` or author profile pages (`/authors/ellis`) reused as blog bylines. Author page = E-E-A-T gold: credentials, experience, contact, all articles.

### 6.5 Library decision (highest-risk content asset)
- **Recommended:** noindex the full catalog (`/library/*` detail pages), keep one indexed `/library` "Staff picks" shelf: ~24 items, each with a 100–200-word signed mini-review ("Why we recommend it", "Who it's for", "What to skip"), reviewer face + date. That converts an aggregation liability into original curation.
- Remove the "1,958 items" claim from all public copy.
- Revisit full-catalog indexing only after approval + proven curation depth.

### 6.6 Glossary decision — merge into concept guides
- Replace 62 thin term pages with ~8 long-form guides, e.g. "SIEM & SOC careers in Nigeria: tools, salaries, how to start" (1,500+ words, diagrams, practitioner quote, local job-post data). 301-redirect term URLs → parent guide anchors. Keep a lightweight A–Z index page for UX (noindex or index the index only).
- If any term page already earns search traffic, expand it in place instead of merging (check Search Console first).

### 6.7 Career guides (keep, upgrade to flagship standard)
- Each kept guide gets: named author + reviewer, hero image, salary methodology box with sources + date, ≥1 practitioner interview quote, real job-post examples (anonymised), "last updated", FAQ schema only where genuinely useful.
- Cut or merge guides that overlap or can't meet the bar. 8 excellent guides beat 19 thin ones.

### 6.8 Blog (prune to quality, then rebuild cadence)
- Audit every post against the editorial bar; **unpublish or noindex anything that fails** (better 5 strong posts than 14 forgettable ones).
- Rewrite survivors with: named author, original material (photos, screenshots, real numbers, quotes), hero image, sources, updated date.
- New cadence: 2 posts/month, each tied to real academy life (build nights, capstone showcases, employer visits, curriculum notes, student interviews). Every post must pass "could only CEA have written this?"
- Kill the fake "Subscribe → /contact" newsletter CTA; either run a real newsletter (with archive page proving it) or drop it.

### 6.9 Programs, Admissions, Pricing, Contact, Visit (keep + humanise)
- Per program: instructor face + bio, classroom photos, sample lesson artifact (slides/video/exercise), example capstone with screenshots, honest schedule/seats/status, 3–5 real FAQs.
- Admissions: clear steps, real dates, real fees, real contact person with photo. Every claim verifiable.
- Replace `/virtual-tour` with `/visit`: real photos, map, transport guidance, open-day info, book-a-tour form. Noindex the old URL.
- Contact: add street address, map, entrance photo, named admissions contact with photo.

### 6.10 Noindex / unpublish list (until real substance exists)
`/stories`, `/work`, `/alumni` (if empty), `/events` (unless ≥1 real upcoming + recaps with photos), `/marketplace`, `/community` (unless real activity), `/partners` (unless named + logo-consented), `/virtual-tour`, `/library/*` detail, `/glossary/*` term pages (post-merge), all `/app/*`, `/portal/*`, `/auth/*` (already disallowed — verify noindex headers too). Serve with `noindex, follow` + remove from sitemap. Each gets a **relaunch checklist** (e.g., Stories relaunches at ≥3 consented, photographed, artifact-linked stories).

---

## 7. Information architecture (new public sitemap)

**Primary nav (7 max):** Programs · Admissions (incl. Pricing, Scholarships, Apply) · Campus/Visit · Stories (only when relaunched) · Blog · Resources (Guides, Glossary-guides, Templates) · Contact. About + Team in footer + Contact-adjacent.

**Indexed URL target:** ~40–60 URLs (down from hundreds). Every indexed URL must pass the editorial bar. Sitemap regenerates from the allowlist (`scripts/generate-sitemap.mjs` — update to exclude noindexed routes automatically).

**Redirect map:** glossary term URLs → parent guides; `/virtual-tour` → `/visit`; removed pages → closest surviving parent (never mass-redirect to `/`).

---

## 8. Policy, trust & technical compliance checklist

- [ ] Remove all `AdSlot` renders from public pages (keep component; render `null` until approval). No "advertisement" labels, no empty boxes anywhere.
- [ ] Rewrite misleading meta descriptions (`/work`, any "delivered/placement promise" claims). Site-wide claim audit: every number, date, partner, employer, salary, and outcome claim must be true + provable.
- [ ] Privacy policy: add last-updated date, data controller (name, address, email), cookies section covering AdSense/analytics consent, data-subject rights, retention. Terms: add governing law (Nigeria), refunds/deferrals policy for fees, IP, contact.
- [ ] Cookie consent (`cookie-consent.tsx`): verify it actually gates non-essential scripts pre-consent; add "manage preferences" + link in footer.
- [ ] Contact truth: street address, map, real hours, named humans. Add `LocalBusiness`/`EducationalOrganization` schema with same details (NAP consistency).
- [ ] Schema hygiene: keep FAQ/Article/Course/Program schema only where content is genuine; add `author`/`Person` + `dateModified`; drop schema from noindexed pages.
- [ ] E-E-A-T pages: About (real), Team (real), Author pages, Contact (real), Privacy, Terms, Corrections policy ("Found an error? email…"), Editorial standards page (publish the bar from §6.1 publicly — reviewers love this).
- [ ] Accessibility/perf: alt text everywhere, colour contrast on gradient text, LCP < 2.5s on 4G (photos optimised, no 900KB PNGs), CLS guarded (image dimensions), mobile-tested. Run Lighthouse on Home/Programs/Blog post/Guide and record scores.
- [ ] Traffic readiness: confirm no bot-manipulation, no purchased traffic; ensure analytics + Search Console clean (no manual actions, no security issues) before reapplying.

---

## 9. Execution plan (phases, owners, exit criteria)

### Phase 0 — Stop the bleeding (Days 1–3)
- Remove `AdSlot` renders; rewrite `/work` meta + any unverifiable claims; noindex empty/thin routes (§6.10); prune sitemap; remove fake events / past-dated events; delete partner marquee; delete or gate "Subscribe" CTA.
- **Exit:** zero placeholders, zero unverifiable claims, sitemap contains only keeper URLs.

### Phase 1 — Humans & trust foundation (Weeks 1–3, parallel with Phase 2)
- Photo shoot (Track A) or interim phone set (Track B); founder bio + credentials; team page rebuild; author pages; contact/visit truth (address, map, photos); legal pages upgrade; corrections + editorial-standards pages.
- **Exit:** every public page shows real humans/photos; NAP consistent; legal complete.

### Phase 2 — Core pages overhaul (Weeks 2–4)
- Homepage rebuild (§6.2); About rewrite (§6.3); Programs/Admissions/Pricing/Contact/Visit humanisation (§6.9); nav/footer IA (§7); kill SaaS copy site-wide (find/replace pass on engines/actors/OS language).
- **Exit:** 5-second test passes; Lighthouse green-ish; zero SVG-people vibes.

### Phase 3 — Content flagship rebuild (Weeks 3–6)
- Library → staff picks; glossary → 8 concept guides + redirects; career guides upgrade; blog prune + rewrite survivors; resources get real downloadable files.
- **Exit:** every indexed content URL passes §6.1 bar; redirects verified; updated-dates live.

### Phase 4 — Proof engine (Weeks 4–8, ongoing)
- Run/document ≥1 real event with photos + recap post; publish ≥3 stories OR keep noindexed (no faking); ≥1 real case study OR keep `/work` noindexed; start 2-posts/month cadence; collect consented testimonials with faces.
- **Exit:** "proof" sections contain proof; publishing cadence demonstrated ≥6 weeks.

### Phase 5 — Technical & policy hardening (Week 7–8)
- §8 checklist complete; Search Console clean; sitemap final; performance pass; full-site QA (mobile, broken links, forms actually deliver, no lorem/placeholder text anywhere — grep the repo for lorem/TODO/example.com).
- **Exit:** site frozen for 2+ weeks of stability before reapplying.

### Phase 6 — Reapply (Week 9+)
- Request review with a short note pointing at what's new (real academy, real authors, original guides). If rejected again, treat the new feedback as gold — it almost always names the remaining gap.

**Realistic timeline:** 6–9 weeks to a credible reapplication. Rushing reapplication on a half-fixed site risks a longer penalty box; the 2-week stability freeze matters.

---

## 10. What success looks like (reviewer walk-through)

A reviewer lands on cea.ng and within 60 seconds sees: a real school in Port Harcourt (photos, address, map), real named teachers (faces, bios), real courses with curricula and prices, real articles by real authors with dates and sources, and honest framing about being early-stage ("Cohort 01") backed by visible proof (classroom photos, event recaps, student artifacts). No empty ad boxes, no fake dashboards, no badge-wall manifestos, no anonymous content farm. That's a site that reads as **high value** — and, not coincidentally, one that converts parents and students too.

---

## 11. Open decisions (need founder input)

1. **Photo track:** A (pro shoot), B (phone interim), or B→A? This gates Phase 1.
2. **Glossary:** merge into 8 guides (recommended) vs. expand-in-place vs. full noindex?
3. **Library:** staff-picks shelf (recommended) vs. full noindex of catalog?
4. **Events:** did the listed Aug/Sep 2026 events actually happen? Keep-with-recaps or delete?
5. **Team reality:** who (names + roles + credentials) can appear with photos in the next 3 weeks?
6. **Claims audit:** which of these are true today — instalment plans, ISA option, employer network, placement support, scholarships? Untrue ones get cut immediately.
7. **Newsletter:** run it for real (with archive) or drop the CTA?

---

*Appendix — files touched by this plan: `src/routes/index.tsx`, `about.tsx`, `team.tsx`, `stories.tsx`, `work.tsx`, `blog.*`, `career-guides*`, `glossary*`, `resources*`, `library*`, `programs*`, `pricing.tsx`, `admissions.tsx`, `contact.tsx`, `visit/*`, `virtual-tour.tsx`, `events.tsx`, `alumni.tsx`, `community.tsx`, `partners.tsx`, `marketplace.tsx`, `scholarships.tsx`; `src/data/site.ts`, `glossary.ts`, `career-guides.ts`, `resources.ts`, `library.ts`, `blog-posts-new.ts`; `src/components/marketing/*` (header, footer, ad-slots, shell), `src/components/art/*`; `scripts/generate-sitemap.mjs`; `public/*` (images, sitemap, robots); `nitro.config.ts` (noindex headers).*

---

## 12. Implementation log — 2026-09-10 (this branch)

### Done
- **Phase 0:** ad-slot placeholders render nothing; 14 thin/empty routes noindexed (meta + `x-robots-tag`); sitemap pruned (35→24 static URLs, library/glossary terms + 1 off-mission post excluded); `/work` meta rewritten honestly; fabricated events replaced with the real Aug 2026 holiday program; fake stats band replaced with honest numbers; partner marquee deleted from homepage; scholarships/careers delisted from nav pending claims confirmation.
- **Photos pipeline:** `public/images/` structure + manifest (`public/images/README.md`); `SiteImage` (graceful labelled fallback until files land) and `Portrait` components. ⚠️ **User's attached photos did not arrive in the workspace** — founder must drop files per the manifest (exact filenames listed there).
- **WhatsApp-first contact:** `src/lib/contact.ts` single source of truth; floating WhatsApp button on every page; footer WhatsApp CTA; WhatsApp CTAs on home, about, team, contact, visit, events; all `wa.me/2349058628386` deep links with pre-filled messages.
- **Nav/IA:** header trimmed to Programs · Admissions · Pricing · Visit · Blog · About · Team + slim More menu; footer columns rewritten (SaaS links removed); footer tagline humanised.
- **Pages rebuilt:** `/` (real-photo hero, classroom proof, how-it-works, founder strip, latest posts), `/about` (952 lines → ~250, founder story + holiday proof + timeline), `/team` (6 real people), `/contact` (WhatsApp-first, real address), `/visit` (real address, photos, honest visit types + booking), `/events` (holiday program recap + WhatsApp notifications).
- **Blog:** new `ArticleBody` mini-markdown (subheads, figures, pull-quotes, lists); hero image + author photo + updated-date on every article; 8 flagship posts rewritten in human educator voice; all 26 posts attributed to real humans (Ellis/Allison/Peter) with photo bylines; 10 editorial hero illustrations generated (`public/images/blog/`); off-mission `why-we-are-building-cea-os` noindexed + hidden from index page.
- Verified: `tsc --noEmit` clean, `vite build` passes, SSR smoke-tested (home, stories noindex, article, team, events).

### Still to do (next turns)
- **Founder action:** upload real photos per `public/images/README.md` (team ×6, campus ×8, events ×2).
- Generate 4 remaining blog heroes (cloud, digital-marketing, mobile-apps, ui-design) — hit 10-image turn cap; 4 posts temporarily reuse adjacent heroes.
- Rewrite remaining 18 blog posts in human voice (bylines/heroes done, bodies still original).
- Library → staff-picks shelf; glossary 62 terms → ~8 concept guides + redirects; career-guide salary methodology boxes.
- Claims audit answers (instalments? ISA? employer network? scholarships?) → relist or cut.
- Privacy/terms/cookies upgrade; program pages (instructor faces, sample lessons); `/stories` + `/work` relaunch checklists; final QA + reapply.
