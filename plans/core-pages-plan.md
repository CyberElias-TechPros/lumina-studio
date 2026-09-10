# Core Pages Plan — What Google (and Users) Should See

**Date:** 2026-09-10 · **Status:** Approved for implementation · **Companion:** `adsense-recovery-plan.md`, `blog-adsense-plan.md`

## 1. The idea in one paragraph

Google and the AdSense reviewer should see **one clear thing: a real tech academy in Port Harcourt** — its courses, its teachers, its classroom, its articles, and how to contact it. Nothing else. Every page that doesn't prove "real academy" is either hidden from search until it's ready, or removed from navigation. Users get the same focused experience: no maze, no software-product pages, no empty sections.

## 2. Tier 1 — The academy core (indexed, main navigation)

These ~20 pages are the site as far as Google is concerned. They must be excellent — real photos, real names, honest claims, fast loading.

| Page | URL | Why it exists | Must contain |
|---|---|---|---|
| Home | `/` | First impression: real school, real classroom | Classroom photo hero, proof section, programs, founder, WhatsApp |
| Programs | `/programs` | Course catalogue | All 8 programs, prices, durations, honest level guidance |
| Program detail ×8 | `/programs/$slug` | Convert interest → application | Curriculum, instructor, photos, sample lesson, FAQs, price |
| Admissions | `/admissions` | How to join | Steps, dates, requirements, fees, contact person |
| Apply | `/apply` | The application itself | Short honest form, what happens next |
| Pricing | `/pricing` | Money questions | Every price, instalment terms (only if true), no hidden fees |
| About | `/about` | Who you are | Founder story + photo, timeline, holiday-program proof |
| Team | `/team` | Who teaches | 6 real people, photos, roles, bios |
| Visit | `/visit` | Get feet through the door | Real address, map, photos, booking form |
| Contact | `/contact` | Talk to us | WhatsApp-first, phone, email, hours, named human |
| Events | `/events` | Proof of life | Real past events with photos + WhatsApp notification signup |
| Blog | `/blog` | Expertise + fresh content | Article index with authors, dates, realistic heroes |
| Articles ×25 | `/blog/$slug` | Rank + demonstrate teaching | Human voice, author photo, visuals, sources (see blog plan) |
| Services | `/services` | Business revenue line | Real services offered, process, WhatsApp quote CTA |
| FAQ | `/faq` | Objection handling | Real questions with short honest answers |

**Reviewer test for Tier 1:** open any 3 of these pages. Within 60 seconds you must know: this is a school, in Port Harcourt, run by named humans, with real classes and real photos. If any page fails that, it drops to Tier 3 until fixed.

## 3. Tier 2 — Supporting pages (indexed, footer/secondary nav)

Useful, honest, but not the main story. Linked from footer or contextually — never competing with Tier 1 in the main menu.

| Page | URL | Role |
|---|---|---|
| Career guides ×19 | `/career-guides`, `/career-guides/$slug` | Rank for career questions; each needs salary methodology + author (upgrade queued) |
| Resources ×12 | `/resources`, `/resources/$slug` | Downloadable templates/checklists (files must really exist) |
| Glossary index | `/glossary` | A–Z navigation hub (term pages stay hidden until merged into guides) |
| Compare programs | `/programs/compare` | Side-by-side program comparison |
| Verify certificate | `/certificates/verify` | Trust utility for employers |
| Privacy / Terms / Accessibility | `/privacy`, `/terms`, `/accessibility` | Legal trust (upgrade queued: dates, controller, cookies) |
| Visit subpages | `/visit/info`, `/visit/brochure`, `/visit/feedback` | Visit support flow |

## 4. Tier 3 — Hidden until real (noindexed, out of navigation)

Reachable by direct link for existing users, but **invisible to Google and absent from menus**. Each has a written relaunch gate — no page returns without meeting it.

| Page | Why hidden now | Relaunch gate |
|---|---|---|
| `/stories` | No graduate stories yet | ≥3 consented stories with photos + project links |
| `/work` | No published case studies | ≥3 real client write-ups with screenshots + results |
| `/alumni` | No alumni network yet | Real graduates + opt-in directory |
| `/community` | No live community surface | Real forum/groups activity or events cadence |
| `/marketplace` | No live gigs/jobs | Real listings with posters + fulfilment |
| `/partners` | No named partners | Named, logo-consented partners |
| `/careers` | Listed roles aren't real openings | Genuinely open roles with application path |
| `/scholarships` | Funding claims unverified | Founder confirms real, funded offers |
| `/library`, `/library/*` | Aggregated catalog, no visible curation | Staff-picks shelf with signed reviews |
| `/glossary/$slug` ×62 | Thin doorway-style pages | Merged into ~8 long-form concept guides |
| `/virtual-tour` | Tour of an unphotographed campus | Replaced by `/visit` with real photos (done — URL redirects next) |
| `/engines` | SaaS product page, off-mission | Stays hidden; academy is the product now |
| `/vizier` | VS Code extension page, off-mission | Stays hidden; unrelated to academy |

**Rule:** Tier 3 pages carry `noindex` (meta + server header), are excluded from the sitemap, and are not linked from header/footer. Internal links TO them from articles use plain links (they work for humans; they pass no index signal confusion).

## 5. The 60-second AdSense reviewer journey (design target)

1. **0–10s — Home:** photo of a real classroom, "Port Harcourt", programs, WhatsApp button. Verdict forming: *real place.*
2. **10–30s — About → Team:** founder face + story, 6 named humans with roles. Verdict: *real people.*
3. **30–50s — Blog → one article:** human voice, author photo, realistic photos, date. Verdict: *original content.*
4. **50–60s — Contact/Visit:** street address, map, phone, hours. Verdict: *verifiable business.*

If the reviewer instead lands on programs, pricing, or events first, the same signals repeat: photos, names, addresses, dates. **Every Tier 1 page independently proves all four: place, people, content, verifiability.**

## 6. Navigation map (final)

**Header:** Programs · Admissions · Pricing · Visit · Blog · About · Team · [More: Career Guides, Resources, Glossary, Events, Services, FAQ, Contact, legal]
**Footer:** Learn (Programs, Admissions, Pricing, Visit, Apply) · Resources (Blog, Guides, Templates, Glossary, Library*) · Academy (About, Team, Visit, Events, Services) · Support (Contact, FAQ, Privacy, Terms, Accessibility)
**Homepage CTAs:** WhatsApp (primary contact), Visit, Programs — never more than two per section.

*\*Library link stays only while the index page is honest about what it is; under review in the library rebuild.*

## 7. Implementation status

- [x] Tier 3 noindexed + removed from sitemap/nav (2026-09-10)
- [x] Tier 1 core rebuilt: home, about, team, contact, visit, events (2026-09-10)
- [x] Blog index + article template rebuilt; 8/25 articles rewritten (2026-09-10)
- [ ] Program pages: add instructor faces, sample lessons, honest seat status
- [ ] Admissions/pricing claims audit with founder (instalments? ISA? dates?)
- [ ] Career guides: salary methodology boxes + named reviewers
- [ ] Resources: verify every downloadable file exists
- [ ] Privacy/terms/cookies upgrade
- [ ] `/virtual-tour` → `/visit` redirect
- [ ] Tier 3 relaunch gates tracked per page (revisit monthly)
