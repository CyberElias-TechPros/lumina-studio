# AdSense rejection decoded — what "low value content" actually means for cea.ng

Date: 26 October 2026 · Companion: [`adsense-approval-playbook.md`](./adsense-approval-playbook.md) · [`chatgpt-blueprint-review-2026-10-25.md`](./chatgpt-blueprint-review-2026-10-25.md)
Tooling: `npm run audit:content`, `npm run validate:lessons`, `npm run audit:images`, `npm run check:ads`

---

## Status — implemented 26 October 2026

The parts of this plan that belong in code are now in code and enforced in CI. The parts
that need a human are listed separately and are the only things standing between this
site and a credible reapplication.

| Deliverable | State | Where |
|---|---|---|
| Lesson publication/review dates, evidence-gated | ✅ built | `scripts/generate-lesson-editorial.mjs` → `src/data/editorial/lesson-dates.generated.json` |
| Reviewer byline + "review due" schedule on every lesson | ✅ built | `src/routes/blog.$slug.tsx` |
| `datePublished` / `dateModified` / `reviewedBy` in schema, only when evidenced | ✅ built | `src/lib` via `lessonEditorialIso()` |
| Public change log | ✅ published | `/editorial/changelog` |
| Public corrections log + policy | ✅ published | `/editorial/corrections` |
| Standing ethical-use notice on security lessons | ✅ built | `src/data/editorial/policies.ts` |
| Lesson contract validator (depth, figures, captions, images, dates) | ✅ CI gate | `npm run validate:lessons -- --strict` |
| Ad placement policy as code + guardrail | ✅ CI gate | `src/lib/ads/slots.ts`, `npm run check:ads` |
| Image provenance registry + report | ✅ built, **unresolved** | `src/data/editorial/image-provenance.json`, `docs/image-provenance-report.md` |
| Content-quality measurement | ✅ built | `npm run audit:content` |
| 13 course pages to the §5 standard | ⬜ owner + writers | — |
| Image provenance for 471 lesson images | ⬜ **owner only** — nobody else can say where they came from | — |
| Google Business Profile, citations, video, partners | ⬜ owner | — |
| 60–90 days of interest data | ⬜ runs with the calendar | — |

### How the dates work (and why they cannot be faked)

`publishedAt` is derived from the git commit that first introduced a lesson's slug — a
fact, not a claim. `reviewedAt` comes only from `src/data/editorial/lesson-reviews.json`,
which a person edits after actually reading the page. The generator never writes a review.

Two consequences worth knowing:

1. **A publication date is only shown when it can be evidenced.** In a shallow clone the
   derived date is suppressed rather than displayed, because it describes the checkout,
   not the publication. To publish one honest date for the whole corpus, set
   `seriesPublishedAt` in `lesson-reviews.json` once you can evidence it; all 210 lessons
   then inherit it.
2. **The lesson page shows a "review due" date instead of a fake review.** That is a
   forward-looking schedule, and `/editorial/corrections` lists a reviewer only after a
   review has happened.

### Operating the review cycle

1. Pick lessons in review-due order (`npm run validate:lessons` warns on each).
2. Read the page, fix what is wrong, and record `{ "reviewedAt": "YYYY-MM-DD", "reviewer": "Name" }`
   in `lesson-reviews.json`. Add a changelog entry the same week.
3. Run `npm run generate:editorial && npm run validate:lessons -- --strict`.
4. If a correction changed an instruction a reader may already have followed, also add a
   `corrections.ts` entry — that log is permanent.



---

## 0. The rejection you received is not the old boilerplate

The text you pasted is the **newer site-quality rejection**, and it says five distinct things. Read it as five requirements, not one:

| # | Clause (verbatim) | What it is actually asking for |
|---|---|---|
| 1 | "Provides **authentic, high-quality information, tools, or services**" | Original pages with real substance and real authorship |
| 2 | "Exhibits **ongoing curation and structural maintenance**" | Evidence the site is *maintained*: dates, corrections, updates, pruning, a changelog of some kind |
| 3 | "Establishes a **consistent presence on the web**" | An external footprint — business profile, citations, social/community activity, mentions — that a company actually exists and is findable off-site |
| 4 | "Generates and **sustains genuine user interest**" | Actual people arriving and returning, not an intended audience |
| 5 | "**We found some policy violations**" (header) | A separate, specific compliance problem — copyright, restricted content, or misrepresentation |

The old version of this message only really discussed #1. This one makes #2, #3 and #4 explicit, and keeps the policy header on top.

**This corrects something I told you earlier.** My playbook said — accurately, per Google's published policy — that there is no minimum traffic requirement for approval. That remains true as a published threshold, but a rejection that names *user interest* and *consistent presence* means a site can be perfectly written and still fail while nobody is reading it. Plan for demonstrable demand, not just defensible content.

**The most important consequence:** if you respond to this rejection by writing more lessons, you will be answering clause 1 — the one you have already won. You need to answer 2, 3, 4 and 5.

---

## 1. First, the measurement that changes the argument

I built an audit (`scripts/adsense-content-quality.mjs`) and ran it against the live corpus in `src/data/blog.ts`. It measures what a reviewer notices: depth, structural sameness, duplication, boilerplate, opening formulas and heading reuse.

```
210 published lessons
words per lesson:   min 617 · p10 734 · median 839 · p90 1049 · max 1303
under 300 words: 0        under 600 words: 0
lessons with 0 figures: 0
near-duplicate pairs (5-word shingle Jaccard ≥ 0.10): 0
8-word boilerplate phrases appearing in ≥5% of lessons: 0
distinct block structures: 84 for 210 lessons (largest group 14%)
distinct cover images: 210 · figure images: 436 distinct across 439 slots
```

Read that honestly: **this is not a thin-content site.** It is a 210-page corpus with a median of 839 words and no duplicated text — better than most sites that get approved. Any consultant who tells you to "publish 25–40 quality articles of 800–2,000 words" is describing a problem you solved at five times their recommended scale, months ago.

So the rejection is not a verdict on your writing. It is a verdict on **signals the site does not emit**. Three of them are structural, one is a compliance question, and all four are fixable without writing a single new lesson.

---

## 2. Gap 1 — There is no visible evidence of maintenance (clause 2)

This is the most likely single cause, and the easiest to fix.

| Signal a reviewer looks for | Current state |
|---|---|
| `datePublished` on lesson schema | **Absent.** `blog.$slug.tsx` builds an `Article` schema with headline, author, publisher — no dates |
| `dateModified` on lesson schema | **Absent** on lessons (present only on `/classes/*` session pages) |
| A visible "last reviewed" line | **Absent** on lessons |
| A corrections log | Not published |
| A changelog or "what changed this month" | Not published |
| Reviewer other than the author | Author only (`Ellis Dennis Graham`); no named technical reviewer |
| Retirement/merge history | Internal only (`/library` → `/classes`, `/stories` → `/about` redirects show pruning happened, but invisibly) |
| Sitemap `lastmod` | Generated at build — accurate for build time, which is not the same as editorial revision |

A 210-page corpus with **no dates anywhere** reads, to both a reviewer and a classifier, as either freshly generated or abandoned. Neither impression survives scrutiny. `/editorial` exists — that is good — but a policy page is a promise; dates are the proof.

### The fix: make maintenance legible (days, not weeks)

1. Add `datePublished` and `dateModified` to `BlogPost`, backfill from a real editorial record (use the oldest verifiable date per lesson; where unknown, use the chapter's publication date — never invent precision).
2. Render a byline block on every lesson: *"Written by Ellis Dennis Graham · Reviewed by {name} · Last updated {date}"*, with `dateModified` in schema matching what is displayed. Build the `dateModified` value from source, never hand-typed.
3. Publish a **`/editorial/changelog`** page: one entry per month — lessons added, lessons revised, lessons merged or retired, corrections received and resolved. Ten lines a month. This single page is the most direct possible answer to "ongoing curation and structural maintenance".
4. Publish a **corrections log** (even when empty, with a "no corrections outstanding — {date}" line and the reporting route).
5. Adopt a **180-day review cycle** with the review date visible. Review means *read it, correct it, re-date it* — not a bulk `dateModified` bump. Bulk-bumping dates is the kind of thing that reads as manipulation; don't.

---

## 3. Gap 2 — The site has no presence or interest signals (clauses 3 and 4)

Nothing in the codebase can fix this, and no amount of content will either. It is the part most publishers skip, and it is named twice in your rejection text.

| Signal | Typical current state | Target before reapplying |
|---|---|---|
| Google Business Profile | Incomplete or unposted | Verified, correct NAP (24 Ebony Road), 10+ photos, weekly post, 5+ genuine reviews |
| Citations | Few | 8–10 consistent listings (VConnect, BusinessList.com.ng, Finelib, Bing Places, Apple Maps, school/NGO partner pages) |
| Off-site publishing | Little | 8+ videos on one channel; each lesson embeds its video |
| Community | WhatsApp-centric, unmeasured | Answer library, ≤2h response, WhatsApp Channel or broadcast list |
| Email | No list | A real opt-in list (paste-a-guide lead magnet), monthly digest |
| Brand search | Near zero | People typing "Cyber Elias Academy" and "CEA Port Harcourt" in Search Console |
| Returning visitors | Unknown | 7-day returning user rate visible in GA4 |
| Partnerships | Ad hoc | 5 schools/NGOs/employers linking to or naming CEA |
| Search Console data history | Possibly thin | 60–90 days of impressions, clicks, queries, indexed counts |

**Why this matters more than it sounds:** clauses 3 and 4 are how Google distinguishes "a real institution with a website" from "a website with content on it". A physical academy in Port Harcourt has a structural advantage here that most publishers do not — you can satisfy this in weeks with real activity, not years of SEO.

**Do not** manufacture this with paid traffic, click exchanges, bot visits, or asking WhatsApp groups to visit. That converts a recoverable quality rejection into an invalid-traffic enforcement, which is far harder to undo.

---

## 4. Gap 3 — "Policy violations": four candidates to audit and clear

The header is separate from the low-value paragraph, so treat it as a real finding rather than boilerplate. In order of likelihood for this site:

### 4.1 Image provenance (highest risk, unknown today)

There are **439 JPEGs** under `public/images/blog` (median 171 KB) and a further set under `public/images/campus` and `public/images/team`. `scripts/import-ebony-photos.sh` copies campus/founder photos from an uploads folder — those are presumably the owner's own. The 439 lesson images have **no recorded source or licence** anywhere in the repo, and their dimensions (1672×941, 1376×768, 1408×768, 1536×864) are consistent with batch-generated or batch-downloaded assets.

Unlicensed imagery is a listed AdSense policy violation ("copyrighted material"), and it is the kind of finding that produces exactly the header you received.

**Audit method (one afternoon):** for every image in `public/images/**`, record one of — *photographed by CEA (date, photographer)*, *generated by {tool} on {date} under {terms}*, *licensed from {source}, licence #{id}*, or *unknown*. Then: replace every `unknown`. Keep the record as `docs/image-provenance.md`. Plain AI-generated imagery is not itself a violation; unlicensed third-party imagery is.

### 4.2 Security / "hacking" content framing (restricted-content risk)

AdSense restricts instructional material that teaches intrusion or exploitation. The corpus mentions hacking terms only ~8 times across all files, so this is probably fine — but `cybersecurity*.ts` lessons need a check that nothing reads as a how-to for unauthorised access.

**Fix (cheap and defensible):** put a standing ethical-use notice at the top of every security lesson — *"These lessons are for defending your own accounts and systems, or systems you have written permission to test. Nothing here authorises accessing anyone else's device or account."* Link it from the course page. This is good teaching as well as good compliance, and it is the one genuinely valuable idea in the second ChatGPT answer you pasted.

### 4.3 Misrepresentative claims

`docs/academy-site-redesign-report.md` already documents the institutional-claim problem (placement promises, invented cohort stats, flagship programme pages for tracks not running). If `/programs/*` and `/engines` still present unbuilt tracks as delivered offerings, that is "misrepresentative content" territory.

**Fix:** either demote those pages to honest "planned programme" status with a date, or `noindex` them until they describe something that exists. The claims register from the blueprint is the permanent fix.

### 4.4 Incomplete or advertorial sections

Good news: `/library` and `/stories` now **redirect** to `/classes` and `/about` rather than rendering empty — that remediation is already in. Verify in a crawl that nothing else renders an empty listing, a "coming soon" panel, or a page whose only content is a form.

**One check worth running:** confirm the sitemap and `robots.txt` describe only the routes that actually render content, and that no URL in the sitemap returns a redirect. A reviewer hitting a redirecting sitemap entry is a "site unavailable/unfinished" signal.

---

## 5. Gap 4 — The editorial half is strong; the commercial half is thin

Clause 1 covers the whole site, and a reviewer samples across it. The 210 lessons are excellent. The **13 course pages** are the weaker half, and they are also the pages that matter commercially.

Every course page should carry, in this order:

1. Who it is for, and **who should choose a different course** (honesty converts).
2. What you must already be able to do.
3. Module-by-module outline, each module one line of real substance.
4. Duration, sessions per week, session length, delivery mode.
5. Fee, what it includes, instalment terms — the receipt module.
6. The **deliverable** you leave with, photographed if possible.
7. Available start dates, or a plain "confirmed at application" with the next intake.
8. Instructor name and relevant experience.
9. 6–8 real FAQs (fee, laptop, missed sessions, refunds, certificate, level).
10. Two free lessons from the same subject, linked — "read before you pay".
11. One primary action.

That is 700–1,100 words per course, all of it verifiable. This is where new writing should go — not into lesson #211.

---

## 6. So what does "content that befits AdSense" actually mean?

The standard, stated so it can be checked. A page counts as **substantial unique value** when all of these are true:

| Requirement | Threshold | Enforced by |
|---|---|---|
| Depth | ≥ 600 words of body text (lessons: 800–1,400) | Audit script |
| Originality | 0 shingle-similar pairs; no boilerplate repeated across pages | Audit script |
| Specificity | At least 3 Nigeria/Port Harcourt-specific details a global page could not have | Editor review |
| Visual evidence | ≥ 1 original figure or photograph with a caption that teaches | Validator |
| Authorship | Named author + named reviewer + datePublished + dateModified | Validator (schema) |
| Verification | Sources or a "how this was checked" line for technical claims | Fact-checker |
| Self-test | A check-the-reader section (lessons) | Validator |
| Navigation | ≥ 3 internal links, in and out, to hub + siblings + glossary | Audit script |
| Maintenance | Reviewed within 180 days; retirement/merge decision recorded | Changelog |

And the corpus-level rules, which are what clause 2 really asks about:

- **Publish less, refresh more.** Target 60% of monthly editorial hours on revising existing lessons, 25% on new pages, 15% on merging/retiring. You have 210 lessons for a market where 30 excellent ones would carry the site; the marginal value of lesson #211 is close to zero, and the marginal value of the 30 least-clicked lessons being consolidated is real.
- **Retire publicly.** If two lessons cover the same ground, merge them into one stronger page, 301 the weaker URL to the stronger, and record it in the changelog. Visible curation beats invisible accumulation.
- **Never re-date without re-reading.** Bulk `dateModified` bumps are detectable and treat the maintenance clause as a checkbox, which is exactly how it will be judged.
- **Keep one page per real question.** The corpus already does this; protect it. No keyword-variant twins, no "2026 edition" duplicates.

---

## 7. The reapplication gate (do not submit before this)

Reapplying without change is the one move that hardens a refusal. Submit only when all nine are true, with evidence files dated and archived:

| # | Gate | Evidence |
|---|---|---|
| 1 | Lessons carry real dates + reviewer + schema | Screenshot of rendered byline + Rich Results test |
| 2 | `/editorial/changelog` and corrections log published | URLs |
| 3 | At least one full curation cycle completed and recorded | Changelog entry showing revisions + merges |
| 4 | Image provenance recorded; zero `unknown` | `docs/image-provenance.md` |
| 5 | Security lessons carry ethical-use notices | URLs |
| 6 | Unbuilt programme claims demoted or `noindex`ed | Crawl table |
| 7 | 13 course pages meet §5 | 13 URLs, word counts |
| 8 | 60–90 days of real interest data | GSC: impressions, clicks, brand queries; GA4: returning users, organic non-brand |
| 9 | Off-site presence live | GBP link with reviews, 8 videos, 8+ citations, email list size |

**Timing:** gates 1–7 are a few focused weeks. Gate 8 requires the calendar — count from when the site became visibly maintained and findable, not from today. Practical answer: earliest credible reapplication is **6–10 weeks after gates 1–7 land**, provided the demand work starts now and runs continuously.

---

## 8. What to do this week

1. Run `node scripts/adsense-content-quality.mjs --csv /tmp/lessons.csv` and keep the output as the baseline.
2. Add `datePublished`/`dateModified` and a reviewer byline to the `BlogPost` type and the lesson template; backfill only verifiable dates.
3. Publish `/editorial/changelog` (start with an honest "maintenance begins here" entry and the 180-day schedule).
4. Publish the corrections log and the reporting route.
5. Start `docs/image-provenance.md` and triage all 439 lesson images into the four categories; replace every `unknown`.
6. Add ethical-use notices to the cybersecurity lessons and the course page.
7. Crawl the sitemap and fix any entry that redirects or renders an empty listing.
8. Demote or `noindex` `/programs/*` and `/engines` claims that describe unbuilt delivery.
9. Claim/complete the Google Business Profile: correct address, hours, 10 photos, weekly post.
10. Write the claims register (one page) so nothing else on the site can drift.

## 9. What not to do

- **Do not write 25–40 more articles.** You are 5× past that advice and it is not the failing clause.
- **Do not** bulk-edit `dateModified`, add fake reviewer names, or fabricate an update history.
- **Do not** buy traffic, join click exchanges, or ask groups to "visit and click" to build interest signals.
- **Do not** resubmit until gates 1–7 are green and gate 8 has real data behind it.
- **Do not** rebuild the site, replatform it, or change URLs. The indexing repair is working; do not trade it for a redesign.
- **Do not** add a second ad network, a popup, or any interstitial to look "more commercial".

---

## 10. Appendix — reading the audit output

| Metric | What it means | Good |
|---|---|---|
| `words` | Body words incl. captions | ≥ 600 |
| `signature` | One letter per block (`p`/`h`/`u`/`f`) — the page's shape | Variety across the corpus is healthy; a single dominant shape across >50% is templating |
| Near-duplicate pairs | 5-word shingle Jaccard between lessons | 0 pairs ≥ 0.10 |
| Boilerplate n-grams | 8-word phrases in ≥5% of lessons | 0 |
| Opening formulas | Repeated first-four-word patterns | Few repeats |
| Repeated headings | Identical `h2`s across lessons | Individually justified only |

Current baseline (26 Oct 2026): depth healthy, duplication zero, boilerplate zero, structure varied (84 shapes / 210 lessons), **dates and maintenance absent**, **presence and interest unmeasured**. Fix the second half and the rejection reason no longer describes the site.
