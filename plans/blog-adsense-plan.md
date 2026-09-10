# Blog AdSense Plan — Making Every Article Worthy

**Date:** 2026-09-10 · **Status:** In progress (8/25 rewritten, heroes swapping to stock) · **Companion:** `core-pages-plan.md`

## 1. What "AdSense-worthy" means for an article

A reviewer (or reader) opening any post must conclude within 30 seconds: *a real teacher wrote this from experience, and I can't get this exact article anywhere else.* Concretely, every post must have:

1. **A named human author** with photo, role, and a team page to back them up. ✅ Done for all 25.
2. **Original value** — classroom stories, local specifics (naira, PH, Nigerian employers), opinions, real examples. No generic advice anyone could generate.
3. **Human voice** — first person, short paragraphs, concrete details, honest trade-offs. No "in today's fast-paced digital landscape".
4. **Realistic visuals** — stock photography or real campus photos, never illustrations presented as reality. Hero + 1–2 in-article figures per post. 🔄 In progress.
5. **Honest dates** — published + last-updated, visible on page and in schema. ✅ Done.
6. **Right length** — 800–1,200 words of dense value. Longer only if every paragraph earns it.
7. **Clean exit** — related articles, one soft CTA (visit/programs/WhatsApp). No aggressive funnels, no fake newsletter.

## 2. Current state of all 25 indexed posts

**Tier A — rewritten, flagship quality (8):** these set the bar.

| Post | Author | Image status |
|---|---|---|
| Starting a tech career in Nigeria (2026) | Ellis | stock hero (this turn) |
| Bootcamp vs university | Ellis | stock hero (this turn) |
| First web portfolio | Ellis | stock hero (this turn) |
| Tech resume for Nigerian employers | Ellis | stock hero (this turn) |
| Freelancing from Nigeria | Ellis | stock hero (this turn) |
| Imposter syndrome | Ellis | stock hero (this turn) |
| Python for beginners | Ellis | stock hero (this turn) |
| Cohort vs self-paced | Ellis | stock hero (this turn) |

**Tier B — needs human rewrite (10, high traffic value, rewrite next):** writing order by impact.

1. `portfolio-that-gets-you-hired` — overlaps Tier A portfolio post; merge or sharply differentiate
2. `writing`… (done above) — next: `data-analytics-nigeria-career`, `mobile-app-development-nigeria` (Peter), `ui-ux-design-african-users` (Allison), `digital-marketing-nigerian-business`, `cloud-computing-for-nigerian-businesses`, `api-development-nodejs` (Peter), `react-hooks-explained` (Peter), `version-control-with-git` (Peter), `tech-community-nigeria`

**Tier C — needs human rewrite (7, lower priority):** `cybersecurity-for-small-business-nigeria`, `building-a-soc-on-a-budget`, `devops-for-small-teams`, `product-management-nigeria`, `networking-for-tech-career`, `nigeria-tech-talent-2026`, `hiring-junior-engineers`

**Hidden (1):** `why-we-are-building-cea-os` — noindexed, off-mission; rewrite as founder story or delete.

## 3. Rewrite template (every Tier B/C post follows the Tier A shape)

- **Hook (1–2 short paragraphs):** a real scene — someone who walked in, asked, struggled. Name the place.
- **2–4 `##` sections:** each makes ONE point with a concrete example, number, or story.
- **1 pull-quote (`> `):** the single most quotable honest sentence.
- **1 list:** steps, mistakes, checks — scannable value.
- **1–2 figures (`![caption](src)`):** real campus photo where it fits; stock where it doesn't. Captions must be honest (never "our students" under a stock photo).
- **Close (1 paragraph):** encouragement + soft next step. No hard sell.
- **Sources box (when numbers appear):** salary/regulatory claims get named source + date, inline.

## 4. Image plan — realistic & stock-first (replaces all illustrations)

**Rules:**
- Heroes: realistic stock photography (Pexels/Unsplash-grade), 1600px wide max, ≤400KB, descriptive filenames + alt text.
- Real CEA photos (campus/team/events) always win where they fit; stock everywhere else.
- People in stock photos should reflect Nigerian/African contexts where the post is people-centric.
- **Never:** AI/illustrated heroes presented as photos; stock faces captioned as CEA students/staff; watermarked images; random decor that contradicts the text.
- Credits: every stock file recorded in `public/images/blog/CREDITS.md` with source URL + licence.
- Old illustrations: deleted once their post has a stock hero (kept in git history).

**Per-post hero queries (Tier A — executing now):**

| File | Query direction |
|---|---|
| `tech-career-nigeria.jpg` | young African developer at laptop, modern office |
| `bootcamp-vs-university.jpg` | African graduate with laptop / study crossroads |
| `web-portfolio.jpg` | laptop showing website design, desk workspace |
| `tech-resume.jpg` | writing CV / job application close-up |
| `freelancing-nigeria.jpg` | African freelancer, home office laptop |
| `imposter-syndrome.jpg` | confident African professional portrait |
| `python-beginners.jpg` | code on screen close-up |
| `cohort-vs-selfpaced.jpg` | African students at computers, classroom |
| `cybersecurity.jpg` | security analyst / server monitors |
| `data-analytics.jpg` | charts & graphs analysis on laptop |

**Tier B/C heroes (next batch):** one unique stock hero per remaining post — `cloud-computing.jpg`, `digital-marketing.jpg`, `mobile-apps.jpg`, `ui-design.jpg`, plus unique picks for the rest so no two posts share art.

## 5. E-E-A-T wiring (blog-specific)

- Author bylines link to `/team` anchors (author profile pages if the blog grows past 40 posts).
- Every data-bearing post gets inline sources (job boards, CBN/NDPC docs) with access dates.
- `Article` schema carries author Person + dateModified (done in template).
- Fix the auto-related links to prefer same-category posts (queued, small change).
- About-page link from the blog index ("written by the people who teach here" → `/team`).

## 6. Publishing & freshness cadence

- **2 posts/month minimum**, each tied to real academy life (build nights, capstone showcases, employer visits, curriculum notes, student interviews with consent).
- **Quarterly freshness pass:** update dates, salaries, tool versions; `updated` field bumped only when content really changed.
- **Never publish to hit quota.** One honest post beats four thin ones — the Tier B/C queue exists so we rewrite before we expand.

## 7. Per-post QA gate (definition of done)

- [ ] Passes the "only CEA could write this" test (≥1 classroom/local/original element)
- [ ] Named author + photo renders; date + updated date correct
- [ ] Stock/real hero + 1–2 figures; all have alt text; no illustration files referenced
- [ ] No banned claims (salaries without source, fake outcomes, "guaranteed")
- [ ] No lorem/TODO; links work; mobile layout checked
- [ ] Reading time honest (auto-computed); excerpt matches content
- [ ] Added to sitemap (automatic) and linked from ≥1 related post

## 8. Execution log

- 2026-09-10: template + bylines + dates shipped; 8 Tier A rewrites live; stock swap batch 1 (10 heroes) in progress.
