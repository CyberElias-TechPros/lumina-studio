# GSC audit and growth plan — November 2026

Source of truth: the Search Console top-queries table exported **2026-11-25**.
Roughly 150 queries, top entry `soc room` at 50 impressions, and **every single
row shows 0 clicks**.

That last number is the whole report. 210 lessons, 542 AI lessons, 10 tools and a
clean sitemap produced zero clicks from roughly 400 impressions. This is not a
traffic problem yet; it is a *conversion from impression to click* problem, and it
has three separate causes that need three separate fixes.

---

## 1. What the data actually says

### The corpus is already ranking

The 15 posts that were given hand-written `seoTitle` + `seoDescription` +
`learningObjectives` are, almost exactly, the posts that still draw impressions:

| Query cluster | Impressions | Post that ranks |
|---|---|---|
| SOC room | 50 | `the-soc-room` |
| KB / MB / GB (~40 phrasings) | ~150 | `kilobytes-and-megabytes`, `what-a-megabyte-is` |
| Naira sign on keyboard | 13 | `naira-and-accents` |
| Accept all / cookies | 6 | `cookies-and-accept-all` |
| Cloud (~11 phrasings) | ~11 | `the-cloud-in-ordinary-words` |
| Undo | 1 | `undo-and-redo` |
| Flight booking | 2 | `booking-a-flight-online` |
| Email signature | 3 | `an-email-signature` |
| PDF | 12 | `what-a-pdf-is-for` |

So metadata work was **effective at getting indexed**. It was not effective at
getting clicked. Something between the search result and the page is failing.

### The likely cause: nothing answers the question in the first sentence

I counted how all 210 lessons open:

| Opening pattern | Count |
|---|---|
| `This lesson …` (teaches / shows / explains) | **157** |
| `In this lesson …` | 25 |
| `Here you will learn …` | 25 |
| Any other opening | 3 |

**208 of 210 lessons open with a catalogue line about the lesson itself**, and only
2 open with an actual answer. A person who searched *"which is bigger mb or kb"*
and lands on `kilobytes-and-megabytes` reads:

> "This lesson explains what kilobytes, megabytes and gigabytes mean…"

They wanted *"MB is bigger."* Google is showing the snippet from a page whose first
sentence does not contain the answer, so the snippet reads as a course catalogue
entry, not an answer. On a phone — which is most of this traffic — the reader
bounces back to the results and picks a different blue link.

This also explains why the 15 optimised posts did not move. Their `seoTitle` was
written for the query, but the body still opened with a promise. Title promises an
answer; first paragraph withholds it; click never happens.

### Sameness is measurable and severe

`npm run audit:notes` reports all 210 lessons meet the warm-direct voice standard
(reading ease 79, 12.5-word sentences, 573 reassurance lines, 0 em dashes). The
*writing* is fine. The *architecture* is identical:

| Repeated heading | Count |
|---|---|
| `If it goes wrong` | 74 |
| `Your turn` / `Try it now` | 70 each |
| `Practice` | 70 |
| `Troubleshooting` / `When it fails` | 68 each |
| `Before you begin` / `Before you start` | 64 each |
| `What you will need` | 62 |

210 lessons with effectively one shape is the opposite of what Google's helpful
content guidance describes, and it makes every lesson feel like a numbered module
rather than an answer to a question.

`npm run audit:content` confirms there is no duplication problem (0 near-duplicate
pairs, 0 boilerplate 8-grams, median 750 words, none under 600). **Depth is not the
issue. Ordering is.**

### The AI-engineering gap is a discoverability bug, not a content gap

Several queries in the table look like missing content:

- `whisper fine tuning` (7), `fine-tune whisper` (6)
- `how to build a speaking pipeline` (7)
- `masked language modeling` (4)
- `cross-encoder reranker`, `RLHF sycophancy`, `litellm vs portkey vs kong`,
  `MCP`, `A2A`, `gradient checkpointing`, `outlines constrained decoding`,
  `voyage skill library`, `itl vs tpot`, `transformer attention diagram`

**All of this content already exists in the repo** and is better than most of what
is ranking:

- `src/content/ai-lessons/06-speech-and-audio/05-whisper-architecture-finetuning.md`
- `src/content/ai-lessons/06-speech-and-audio/12-voice-assistant-pipeline.md`
- `src/content/ai-lessons/19-capstone-projects/66-reranker-cross-encoder.md`

They cannot rank because of this line in `scripts/generate-sitemap.mjs`:

```js
// Individual /ai-engineering/<phase>/<lesson> pages mirror upstream MIT prose
// and are marked noIndex: true on the route so Google indexes CEA's original
// hubs (/ai-engineering, /ai-engineering/lessons, /open-curriculum) rather
// than 542 third-party lessons.
const aiLessonUrls = [];
```

and `noIndex: true` in `src/routes/ai-engineering.$phase.$lesson.tsx`.

**The reasoning was correct and should be kept.** Republishing 542 MIT-licensed
lessons and letting them index would put CEA in a direct duplicate-content fight
with the upstream project, and would risk the AdSense originality assessment. So
these should *not* simply be flipped to indexable.

The right fix is to write **CEA's own original companion articles** that link to
the no-indexed lesson. One article, one query cluster, one canonical CEA page.
That is workload item 3 below, and it is the highest-leverage item in this
document because the queries are already appearing in CEA's own data.

---

## 2. Interpretation: three fixes, in priority order

### Fix 1 — Answer first, in the first sentence (highest impact, lowest cost)

Add a `quickAnswer` field to `BlogPost`, rendered in a lead box above the body and
used as the meta description and an `FAQPage` entity when no hand-written
`seoDescription` exists.

**Done in this pass.** The field, the render, the head logic and the first 11
lessons are implemented. See section 4 for rollout status.

This is the single change most likely to move the 0-click number, because it
attacks the impression-to-click step directly, and because a lead box also gives
Google a clean, quotable snippet and a structured-data answer.

### Fix 2 — Break the single template

The repeated headings above should be replaced with query-shaped headings. A
lesson on file sizes should have `Which is bigger, KB or MB?` as a heading, because
that is the question being typed. Do this as part of the scheduled review cycle
(`reviewDueAt`), not as a mass rewrite: roughly 7 lessons come due per week under
the existing 180-day cycle, which is a sustainable pace and spreads the change.

### Fix 3 — Own the AI-engineering queries with original companion articles

Not by un-noindexing upstream lessons. By writing CEA's own article that answers
the query, with the upstream lesson linked as the deep-dive. The first three are
in section 3.

---

## 3. Proposed new content (articles and tools)

Ranked by (impressions already showing) ÷ (effort). Nothing here duplicates work
already in the repo.

### Tools — three shipped in this pass

| Tool | Route | Cluster served | Status |
|---|---|---|---|
| KB/MB/GB converter + "what fits" | `/tools/data-size-converter` | ~40 phrasings, ~150 impr | **Shipped** |
| Naira sign keyboard + amount in words | `/tools/naira-keyboard` | `naira sign` ×13, `write naira in words` | **Shipped** |
| What is the cloud — with data calculator | `/tools/cloud-explainer` | `what is the cloud` ×11 | **Shipped** |

All three are dependency-free, client-side only, and registered in
`tools.index.tsx`, `cea-lab-registry.ts` and `generate-sitemap.mjs`.

### Tools — next, in order

1. **`/tools/screenshot-and-shrink`** — queries: `screenshot` (1),
   `shrink photos for email` (1). Pure canvas resize + format conversion to under
   25 MB for Gmail. Genuinely useful, zero dependencies. The "shrink for email"
   query is one where every current result is an ad-heavy upload site.
2. **`/tools/wifi-and-router-names`** — queries: `elias wifi`, plus networking
   cluster. Explains what SSID, WPA2, 2.4 GHz and 5 GHz mean, and why the router
   label is on the back. Links to the existing networking chapter.
3. **`/tools/typing-test`** already exists and is *not* being found. The queries
   `hold the f/j key while typing this lesson` (5 impressions combined),
   `hands on keys meaning`, `wpm mon` all point at it. This is an internal-linking
   problem, not a new-tool problem — see section 5.

### Articles — next, in order

1. **`/blog/whisper-fine-tuning-in-plain-english`** — `whisper fine tuning` (7) +
   `fine-tune whisper` (6). CEA-original: what fine-tuning actually changes, what
   data you need (hours, not thousands of hours), the cost on a rented GPU, and
   the three reasons it fails. Links to the existing (noindexed) lesson 06/05 for
   depth. This is the best target in the whole list because 13 impressions already
   exist for a page that does not.
2. **`/blog/a-speaking-pipeline`** — `how to build a speaking pipeline` (7).
   Listen → transcribe → reason → speak, with the latency budget for each stage
   and why `itl` and `tpot` (both in the query table) decide whether it feels
   human. Links to phase 6 lesson 12.
3. **`/blog/which-is-bigger-mb-or-kb`** — the dedicated, query-shaped answer page
   for the largest cluster, with the converter embedded. `kilobytes-and-megabytes`
   already ranks but its title is editorial (`What KB, MB and GB actually mean`)
   while the queries are questions. A second, tightly-scoped page that ranks for
   the question itself, and cross-links, is the standard play here. Add a
   `Hindi` section: `kb ka matlab kya hota hai` and `kb का मतलब` both appear.
4. **`/blog/quiz-answer-dataset`** — `which of the statement below defines a
   dataset?` (5), plus `no sound multiple choice` (3) and the RAM multi-select
   (1). This is students pasting quiz questions into Google. There is no honest
   way to rank for a specific exam answer without becoming a cheat site, so the
   right play is a short, genuinely educational page on **what a dataset is**,
   which answers the concept and refuses to pose as a leaked answer key. Worth
   doing because it is 9 impressions for almost no competition.
5. **`/blog/canva-interface-tour`** — `canva interface` (1). No lesson exists
   (confirmed). Graphic Design course already teaches Canva; this fills a hole in
   the public surface.
6. **`/blog/switch-vs-router`** — `elias wifi`, networking cluster. No lesson
   exists (confirmed). Small but clean gap in the networking chapter (orders
   181–190).
7. **`/blog/small-business-cybersecurity`** — none in the query table, but the
   commerce cluster (`computer services` 2, `data entry` 2, `how can i apply`)
   shows commercial intent landing on the site. A security page aimed at a small
   shop converts better than another beginner lesson.

### Deliberately not proposed

- **`/blog/data-entry-career`** — `data entry` (2) is a commercial query, not an
  editorial one. Better served by strengthening `/classes` and
  `/opportunities/idice-skills-to-jobs`, which already target it.
- **Anything for the non-project noise** in the table (`127.0.0.1:5500`,
  `studyhub4.xyz`, `typingtest.com`, garbled PDF strings, `kore`/`transfusion`/
  `tmrope` tokens). That is not demand for CEA content; it is other people's
  systems and OCR failures.
- **Brand queries** (`elias prodigy school portal`, `elias wifi`, `elias school`,
  `cea voice`, `open ai cea`, `anthropic cea`). These are navigational and mostly
  belong to a different organisation (`elias prodigy school`). Do not chase them;
  a clear brand page and correct `Organization` schema is the whole answer.

---

## 4. What was implemented in this pass

### Code

| File | Change |
|---|---|
| `src/data/blog.ts` | `BlogPost.quickAnswer?: string` with a comment explaining why |
| `src/routes/blog.$slug.tsx` | Lead "The short answer" box above the body; `quickAnswer` as meta description fallback; `FAQPage` structured data |
| `src/data/cea-lab-registry.ts` | 3 new tool entries |
| `src/routes/tools.index.tsx` | 3 icons, 3 quick-jump links, 2 track subtitles |
| `scripts/generate-sitemap.mjs` | 3 new tool URLs |
| `src/components/tools/data-size-converter.tsx` | new |
| `src/components/tools/naira-keyboard-helper.tsx` | new |
| `src/components/tools/cloud-explainer.tsx` | new |
| `src/routes/tools.data-size-converter.tsx` | new |
| `src/routes/tools.naira-keyboard.tsx` | new |
| `src/routes/tools.cloud-explainer.tsx` | new |

Sitemap now generates 426 URLs (49 static, 210 notes, 22 courses, 142 lectures).

### `quickAnswer` written for 11 lessons

Chosen because they sit on clusters with live impressions, or because they are the
first lessons a new reader meets:

| Lesson | Why |
|---|---|
| `kilobytes-and-megabytes` | largest cluster, ~150 impressions |
| `the-soc-room` | largest single query (50) |
| `what-a-pdf-is-for` | 12 impressions, no `seoDescription` |
| `sitting-down-at-a-computer` | order 1 — first page most readers see |
| `files-and-folders` | order 2 |
| `your-hands-on-the-keyboard` | order 3, connects to typing tool |
| `the-internet-without-getting-lost` | order 4 |
| `your-first-email` | order 5 |
| `passwords-you-can-keep` | order 6, connects to password tool |
| `the-link-you-should-not-open` | order 7 |
| `printing-without-waste` | order 8 |

**187 lessons still need a `quickAnswer`.** Recommended pace: add one whenever a
lesson comes due for review (about 7 per week), and start with any post that has
`seoTitle` but no `quickAnswer` — those are the pages already being served for a
query and currently wasting the impression.

### Validation after the change

- `npm run validate:lessons` — 210 lessons, **0 contract errors**, warnings
  unchanged in kind (2-figure depth nudge, unrecorded review dates).
- `npm run audit:notes` — 210/210 still meet the voice standard.
- `npx tsc --noEmit` — clean, except the pre-existing
  `src/routes/app/library.tsx(43)` parse error, which is unrelated and untouched.

---

## 5. Two structural issues found while auditing

### The typing test has no inbound links from lessons

`/tools/typing-test` exists and is good. The queries
`hold the f/j key while typing this lesson` (5 impressions combined) and
`hands on keys meaning` show people looking for exactly it. But lessons 3–10 of
the Computer Basics chapter never link to it. Add a contextual link from
`your-hands-on-the-keyboard` and the `Practice` section of the typing lessons.
That is a five-minute change with a direct impression-to-click payoff.

### The 15 optimised posts prove metadata alone is not enough

Worth stating plainly so this does not get repeated: writing `seoTitle` for a query
and then opening the body with `This lesson explains…` did not produce a single
click across 400 impressions. The title has to be matched by an opening sentence
that gives the answer. That is what `quickAnswer` fixes, and why it is being
rolled out to the *body*, not just the metadata.

---

## 6. Measurement

Nothing in this report can be confirmed until the next export. When it arrives,
compare against these numbers:

| Metric | Now (2026-11-25) | What good looks like |
|---|---|---|
| Queries with ≥1 click | **0 of ~150** | ≥10 after the next 4 weeks |
| `soc room` CTR | 0% at 50 impressions | ≥3% (position 1–3 would give more) |
| KB/MB/GB cluster CTR | 0% at ~150 impressions | ≥2% |
| Tools indexed | 10 | 13 (verified in GSC coverage) |
| Lessons with `quickAnswer` | 11 / 210 | 40+ |

`npm run audit:content` is the guardrail for the rewrite: if the heading changes in
Fix 2 start producing near-duplicate pairs or boilerplate n-grams, it will say so.
