# CEA Content Style Guide — How We Beat the Standard

Research basis: live fetches of GeeksforGeeks, Programiz, TechCabal and TechNext24 on 2026-08-24.
This document defines how every new CEA content page is written so each one is measurably better
than the equivalent page on any AdSense-approved competitor.

---

## Part 0 — What the competitors actually do (verified data)

### GeeksforGeeks (GFG)

**Verified samples analysed:** SQL Tutorial hub, "Advantages and Disadvantages of Machine Learning",
"How to Become a Data Analyst in 2025".

| Attribute | What they do |
|---|---|
| Article length | 700–1,100 words |
| Structure | H1 title → short intro → numbered H3s under H2 sections → conclusion |
| Formatting | Bold key terms, bullet lists with bold lead-ins ("Data Collection:", "Step 1:") |
| Paragraph style | Short, 2–4 sentences, definition-first |
| Internal links | 87–213 per page; near-zero external links. Every noun links to another GFG page |
| External links | Essentially none — they never cite sources |
| Freshness signal | "Last Updated" date stamp at top |
| Tone | Encyclopedic, impersonal, third person |
| Audience framing | Global generic student; examples are US-centric ("e-commerce platforms") |
| Weaknesses observed | Wall-of-text density; no local context anywhere; generic advice that ignores cost/reality differences between markets; no author byline on many articles; heavy ad clutter mid-content; conclusions are one flat paragraph |

### Programiz

**Verified samples:** Python Keywords & Identifiers reference, tutorial index pages.

| Attribute | What they do |
|---|---|
| Lesson length | ~800–1,200 words |
| Structure | Title → "What is X?" → syntax block → worked example → output → explanation → related topics |
| Code-first teaching | 19–22 code blocks per lesson; every concept shown in runnable code |
| Interactive elements | Embedded online compilers ("Try it yourself") |
| Progression | Explicit course index sidebar showing where you are in a sequence |
| Tone | Friendly second person ("you will learn"), patient, beginner-assuming |
| Internal links | ~181–377 per page including persistent course-index rail |
| Weaknesses observed | Examples are abstract (foo/bar) with no real-world anchoring; no career or salary context; upsell interruptions to Programiz PRO mid-lesson |

### TechCabal (Nigerian tech news)

**Verified sample:** Moniepoint $110M funding article.

| Attribute | What they do |
|---|---|
| Article length | 400–800 words for news |
| Structure | Headline with numbers → lede (who/what/how much) → body with quotes → context → related posts |
| Local specificity | Naira/dollar amounts, named companies, named people, dates — every fact anchored |
| Schema | NewsArticle JSON-LD complete with author Person entity |
| Bylines | Named authors with author pages |
| Tone | Business-journalistic, punchy, assumes savvy reader |
| Weaknesses observed | No educational depth (they report, never explain); articles age fast; no learning paths; nothing actionable for a learner |

### TechNext24 (Nigerian tech news)

**Verified samples:** homepage + news category pages.

| Attribute | What they do |
|---|---|
| Volume play | 74+ articles visible, high-frequency publishing |
| Length | ~545 words average |
| Style | WordPress news template; headline → summary → embeds |
| Weaknesses observed | Thin articles; little original analysis; SEO-driven aggregation tone; weak internal linking compared to GFG |

### Cross-competitor synthesis — the standard we must beat

1. **Depth ceiling:** The best education competitors cap out around 1,000–1,200 words per page. Most pages are shorter.
2. **Context blindness:** Nobody writes specifically for Nigerian learners. Salary figures are USD; degree advice assumes US systems; tool recommendations ignore local market reality (e.g., which BI tools Nigerian banks actually use).
3. **Actionability gap:** Content explains concepts but rarely tells readers what to *do this week*.
4. **Linking extremes:** GFG over-links (200+ links = noise); TechCabal/TechNext24 under-link (news articles link nowhere). Nobody does curated, purposeful linking.
5. **Trust signals:** Few bylines, no review process claims, stale dates, no transparent methodology.
6. **Formatting:** Either wall-of-text (GFG) or thin listicles (TechNext24). Nobody does clean modern layouts with callouts, tables and honest caveats.
7. **No conversion-aware structure:** Educational content ends flat. No "here's what doing this with us looks like."

---

## Part 1 — CEA house style (applies to ALL content types)

### Voice & tone

- **Second person, direct:** "You will spend your first month…" not "Students spend…"
- **Honest, never hypey:** state trade-offs, name hard parts, admit what we don't know. This is our brand differentiator — competitors can't copy it credibly because their business model depends on overpromising.
- **Nigerian-specific by default:** naira amounts, local employers (Moniepoint, Paystack, Flutterwave, banks, telcos, FMCG), NYSC, JAMB/HND context, power/internet realities, Power-BI-vs-Tableau local dynamics.
- **Practitioner authority:** write as people who run cohorts, build CEA-OS, hire graduates. Reference lived specifics ("in our Port Harcourt lab", "capstones we have graded").

### Universal structural rules

1. **Every page answers three questions in the first screen:** What is this? Who is it for? What will you get? (One-sentence answer each, above the fold of the text.)
2. **Section length:** 60–120 words per section. Never more than 150. Competitor walls-of-text lose readers; scannable rhythm wins.
3. **Every H2 section must be able to stand alone** if someone lands on it from a search jump — open with the point, then support it.
4. **Concrete > abstract always.** A number, a name, a naira figure, a date beats an adjective. Ban these words unless quantified: "robust", "cutting-edge", "world-class", "comprehensive", "dynamic".
5. **Bold sparingly:** only the term being defined or the single key takeaway per section. GFG bolds everything; we bold the one thing.
6. **Tables for comparisons, lists for sequences, prose for reasoning.** Each format has one job.
7. **Honest caveats section near the end of every substantial piece** ("What this doesn't cover / When this advice is wrong"). No competitor does this consistently; it builds disproportionate trust.
8. **End every page with a specific next action**, matched to reader readiness: read next piece → try exercise → view program → apply. Never a dead end, never a generic "contact us".

### Linking policy (the anti-GFG, anti-TechNext24 middle path)

- **In-body internal links: 4–8 per page.** Each link must pass the "would a curious reader genuinely click this?" test. Anchor text describes the destination ("how SOC analysts triage alerts"), never "click here".
- **First mention links, repeats don't.**
- **Every content page links to exactly one program page maximum** — placed after value is delivered (bottom third), framed as relevance not sales. Over-linking to programs reads as advertorial and hurts both AdSense review and reader trust.
- **External links: 2–4 per page to authoritative non-competing sources** (official docs, NBS, CBN, NITDA, standards bodies). This is a trust signal competitors skip entirely. Never link to another academy's marketing pages.
- **Related-content block at bottom of every article:** 3 items max, same content type preferred (article→articles, glossary→glossary).

### SEO patterns

- **Title format:** `{Primary keyword}: {specific benefit or angle}` under 60 chars. e.g., "SIEM explained: detection engineering for Nigerian teams" not "What is SIEM — Everything You Need To Know!!"
- **Meta description:** 140–155 chars, includes primary keyword once, states the concrete takeaway, no fluff.
- **Slug:** short, hyphenated, keyword-led (`/library/glossary/siem`).
- **One H1 only; H2 for major sections; H3 under H2.** Question-style H2s where natural ("How much does a SOC analyst earn in Nigeria?") — captures featured snippets.
- **Schema:** Article/BlogPosting on guides; DefinedTerm on glossary entries; Course+FAQPage on program pages; BreadcrumbList everywhere.
- **E-E-A-T block on every guide:** author name + role + last-reviewed date + reviewer if applicable. Add `reviewedBy` when a practitioner checked facts. This alone puts us ahead of most competitors.

### Images & media

- Minimum one relevant image/diagram per 400 words on guides.
- Alt text describes the image's informational content, never "image of".
- Prefer tables/diagrams we generate (mermaid-style flows, comparison tables) over stock photos.
- Code samples: fenced blocks with language tag; include output as comment or separate block.

---

## Part 2 — Content-type playbooks

Each playbook covers: purpose → competitor benchmark → our superseding formula → skeleton → length targets → checklist.

---

### 2.1 Glossary entries (target: 50–100 pages)

**Purpose:** Build indexable volume fast; capture definitional search queries ("what is SIEM", "CI/CD meaning"); funnel beginners toward programs and guides.

**Competitor benchmark:** GFG definitions exist but bury the definition under navigation and ads; Programiz references are code-only with no business context; nobody offers Nigeria-relevant examples.

**Superseding formula — the 90-second answer:**

Every entry gives a complete, satisfying answer in under two minutes of reading:

1. **Plain-language definition** (1–2 sentences, zero jargon — a bright 15-year-old could repeat it).
2. **Why it matters** (2–3 sentences tying it to jobs, money, or decisions).
3. **How it actually shows up in Nigerian workplaces** (the killer differentiator — 2–4 sentences with named local context).
4. **Common confusion** (this term vs. the term people mix it up with — captures "X vs Y" searches).
5. **Where to go deeper** (links to one guide + one program module where relevant).

**Skeleton:**

```markdown
# {Term}

{One-sentence plain definition.}

## Why it matters
{Jobs/money/decisions angle.}

## {Term} in Nigerian workplaces
{Named-context example: banks, fintechs, telcos, SMEs.}

## {Term} vs {commonly-confused term}
{Two-column comparison table.}

## Where to learn more
- Guide: [{related guide}](link)
- Taught in: [{program}](link, max one)
```

**Length target:** 250–450 words. Dense, no padding.
**Frequency of publication:** batch 10–20 per month.
**Internal links:** 2–4 out (guides, one program); inbound from every guide that uses the term (link first mention).
**Schema:** DefinedTerm + BreadcrumbList.
**Checklist before publish:**
- [ ] Definition passes the "explain to a smart teenager" test
- [ ] Nigerian workplace example present with at least one named sector/company type
- [ ] Confusion-pair table included where applicable
- [ ] First mentions of other glossary terms link to them
- [ ] Reviewed-date set

**Sample titles:** "What is a SIEM?", "Idempotency explained", "What does 'offline-first' mean?", "USSD payments, defined", "RAG (Retrieval-Augmented Generation)", "MTTR vs MTTD", "Design system", "Git rebase vs merge".

---

### 2.2 Module detail pages (target: 40 pages — 8 programs × 5 modules)

**Purpose:** Deepen program sections into individually indexable curriculum pages; capture long-tail queries ("what do you learn in a cybersecurity bootcamp week by week"); give applicants genuine decision-making material.

**Competitor benchmark:** Bootcamp competitors (AltSchool, HyperionDev) publish module *names*, sometimes lesson counts — almost never actual curriculum detail. GFG tutorials cover similar skills generically with zero structure/accountability framing.

**Superseding formula — the syllabus competitors won't publish:**

Each module page publishes what competitors hide:

1. **What this module covers** — honest scope, including what it deliberately skips (trust through boundaries).
2. **Week-by-week arc** — the actual shape of the module across its weeks/hours.
3. **What you'll build** — the concrete deliverables/artifacts, named.
4. **Skills checklist** — observable abilities on completion ("can write parameterized SQL joining 3+ tables").
5. **Who struggles here** — honest difficulty notes and prerequisites that actually matter.
6. **How it's assessed** — grading approach, what the practitioner-reviewers look for.

**Skeleton:**

```markdown
# Module M: {Title} — {Program}

{2–3 sentence scope summary incl. hours/lessons.}

## What this module covers (and what it doesn't)
...

## The week-by-week arc
Table: Week | Focus | Deliverable

## What you'll build
- {artifact 1}
- {artifact 2}

## Skills you'll demonstrate
Checklist of observable abilities.

## Who thrives here, who struggles
Honest difficulty notes.

## How you're assessed
Rubric summary + who grades it.

[Related: full {program} curriculum] (single program link)
```

**Length target:** 500–800 words each (40 pages × ~650 avg = ~26,000 words of new indexable content).
**Internal links:** up to sibling modules (prev/next), parent program (one), 2–3 glossary terms.
**Schema:** Course (isPartOf program course) + BreadcrumbList.
**Checklist:**
- [ ] Names real tools/versions taught
- [ ] Includes at least one "what this module deliberately skips"
- [ ] Week-by-week table present
- [ ] Assessment described honestly (who grades, against what)
- [ ] Links to prev/next module

---

### 2.3 Career path guides (target: 20 pages)

**Purpose:** Capture decision-stage searches ("data analyst salary in nigeria", "how to become a cloud engineer"); serve the highest-intent audience; feed admissions.

**Competitor benchmark:** GFG's "How to Become a Data Analyst" (verified 1,112 words): generic step-listing, US-degree assumptions, no salary data, no market context, flat conclusion. TechCabal reports on hiring trends but never explains how to enter. **Nobody writes these for the Nigerian market properly. This is our biggest offensive opportunity.**

**Superseding formula — the decision-grade guide:**

1. **The role in one honest paragraph** — what the day actually looks like (not the job-ad fantasy).
2. **The Nigerian market reality** — who hires (named sectors/companies), current salary bands in naira (with the caveat that ranges shift; state source period), remote-market comparison.
3. **Entry routes ranked honestly** — degree vs bootcamp vs self-taught vs internal transfer, with real trade-offs for THIS market (NYSC timing, HND discrimination realities, cost comparisons in naira).
4. **The skill stack, ordered** — what to learn first and why that order; time estimates per stage.
5. **A 90-day starter plan** — week-by-week actions someone can start Monday. (The actionability gap no competitor fills.)
6. **Interview reality** — what Nigerian interviews for this role actually test.
7. **Failure modes** — the three ways people stall in this path and how to avoid each.
8. **If you want structure** — one program link, positioned last.

**Skeleton:**

```markdown
# How to Become a {Role} in Nigeria ({Year})

{Honest one-paragraph summary incl. realistic timeline to employability.}

## What the job actually involves day-to-day
## The Nigerian market: who hires and what they pay
Salary band table (naira, dated, sourced from postings we see).
## Entry routes compared (degree / bootcamp / self-taught / transfer)
Comparison table with cost, time, risk columns.
## The skill stack, in order
Numbered stages with time estimates.
## Your first 90 days: a week-by-week plan
## What interviews here actually test
## Three ways people stall (and how to avoid each)
## Where CEA fits (optional path, placed last)
```

**Length target:** 900–1,400 words — deliberately exceeding GFG's ~1,100 while staying scannable.
**Internal links:** 5–8 out (module pages, blog posts, glossary terms); one program link.
**Schema:** Article + FAQPage (add 3–4 common questions per guide: salary, degree necessity, timeline) + BreadcrumbList.
**Freshness:** reviewed quarterly; visible "last reviewed" date; salary tables dated explicitly.
**Checklist:**
- [ ] Salary figures in naira WITH as-of date
- [ ] At least 3 named Nigerian employer categories/companies
- [ ] Entry-route comparison table includes costs in naira
- [ ] 90-day plan has ≥12 concrete weekly actions
- [ ] Failure-modes section present
- [ ] FAQPage JSON-LD rendered

**Priority order (by search demand × our authority):**
1. Data Analyst · 2. Cybersecurity/SOC Analyst · 3. Cloud Engineer · 4. Frontend Developer · 5. Backend Developer · 6. UI/UX Designer · 7. DevOps Engineer · 8. Product Manager · 9. Digital Marketer · 10. IT Support Technician · 11. Mobile Developer · 12. Data Scientist · 13. QA Tester · 14. Technical Writer · 15. Scrum Master · 16. Database Administrator · 17. Network Engineer · 18. ML Engineer · 19. Growth Marketer · 20. Tech Sales Engineer

---

### 2.4 Resource/template pages (target: 10–15 pages)

**Purpose:** High-share practical assets; capture "template/checklist/example" searches; give library public value (see Part 3).

**Competitor benchmark:** Competitors gate templates behind email capture or paywalls. GFG has cheat sheets buried in articles. **Free, ungated, genuinely usable resources are an open lane.**

**Superseding formula — ungated quality:**

1. **Use-it-now framing:** the resource renders fully on-page (copyable, printable) — no email wall, ever. Our anti-gate stance IS the marketing.
2. **Before/after or filled-example:** show the template AND a completed Nigerian-context example.
3. **Customization notes:** how to adapt it to three common situations.
4. **Common mistakes** people make using this template.
5. **Download/print affordances** without capture.

**Resource backlog (initial 12):**
1. Junior developer CV template (Nigerian format + ATS notes)
2. Data analyst portfolio case study outline
3. SOC analyst interview question bank (30 questions w/ guidance)
4. Learning roadmap: zero-to-job-ready frontend (printable)
5. Excel-to-SQL translation cheat sheet
6. Freelancer rate calculator worksheet (naira/dollar)
7. Incident response first-hour checklist
8. Design portfolio critique rubric (self-review)
9. Stakeholder update email templates (status/risk/ask)
10. Git commit message convention card
11. Cloud cost estimation worksheet for SMEs
12. NDPA compliance basics checklist for small products

**Length target:** 600–1,000 words around the asset (asset itself excluded).
**Schema:** Article + HowTo where step-based.
**Checklist:**
- [ ] Resource fully usable without signup
- [ ] Completed example included
- [ ] Common-mistakes section present
- [ ] Print/copy affordance works
- [ ] Related resources block (3)

---

### 2.5 Blog posts (ongoing cadence: 3–4/month)

Our existing 26 posts establish voice. Going forward, apply the house style plus these upgrades:

1. **Add the E-E-A-T block** (author, role, reviewed date) to every post — currently missing sitewide.
2. **Add "What this doesn't cover" honesty section** to guides.
3. **Strengthen endings:** every post ends with one specific next action + related reading block (already partially in place).
4. **Series architecture:** group posts into named series (e.g., "Field Notes: Hiring Managers Speak") with series landing pages — creates hub-and-spoke structure competitors lack.
5. **Data-backed posts quarterly:** we sit on unique data (applications, placement conversations, CEA-OS telemetry). Anonymized, aggregated, honestly-caveated original data posts earn links competitors can't match. Example: "What 500 applications to Nigerian fintechs taught our careers team this quarter."
6. **Response posts within 72h** of major local tech news (CBN policy, major funding, NDPA enforcement): news sites break it, we explain what it means for careers/businesses. This is the TechCabal gap — they inform, we interpret for practitioners.

---

## Part 3 — Public library (authentication removed)

**Change:** Library content becomes publicly readable. Signed-in students additionally see enrolled-program protected materials; everything else is open.

**Implementation notes:**

- Default visibility: public read. Protected flag remains available per item for licensed/third-party materials only.
- Rationale: ungated content (a) increases indexable pages immediately, (b) demonstrates teaching quality to prospects better than any marketing claim, (c) matches the resource philosophy above — our competitors' gating is our opportunity.
- Each public library item gets: descriptive page (what it is, who it's for, how to use it), the content itself, related-items block, and one contextual program link where genuinely relevant.

---

## Part 4 — Publication workflow (quality gate)

Every piece passes through this before publish:

1. **Draft against the playbook skeleton** (no skeleton, no draft).
2. **Specificity pass:** count named entities (companies, tools, naira figures, laws). Under 5 named specifics = rewrite.
3. **Honesty pass:** does it contain at least one trade-off, limitation, or failure mode? Pure-positive content is banned.
4. **Link pass:** 4–8 in-body internal links, 2–4 external authorities, ≤1 program link, related-block set.
5. **SEO pass:** title/meta/slug/schema per patterns; question-H2s where natural.
6. **Read-aloud intro test:** read first 100 words aloud — would you keep listening?
7. **Review + date:** author + reviewer + last-reviewed date visible on page.
8. **Interlink backfill:** add links to the new page from 3–5 existing pages (first-mention anchors).

## Part 5 — Measurement

Track monthly in Search Console + analytics:

| Metric | Baseline (2026-08) | 3-month target |
|---|---|---|
| Indexed pages | 66 | 220+ |
| Pages with ≥600 words | 26 | 120+ |
| Internal links per content page | ~3 | 6–8 |
| External authority citations | ~0 | 2–4/page on guides |
| Non-brand organic clicks | minimal | +300% |
| Glossary entries live | 0 | 50+ |
| Career guides live | 0 | 20 |
| Module pages live | 0 | 40 |

The compounding effect: glossary terms interlink with guides, guides interlink with module pages, module pages anchor to programs — every new piece strengthens every old piece. That web is what neither the volume players (thin news) nor the depth players (generic tutorials) build, and it is how each CEA page outranks equivalents from AdSense-approved competitors.
