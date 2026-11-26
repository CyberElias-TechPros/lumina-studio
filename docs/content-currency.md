# Staying current: the content loop

This document describes the machinery that keeps the site's 210 learning notes
current and tells us what to write next. It exists because the site had a review
policy and no way to run it, which is how a review policy quietly becomes a
fiction.

Read this alongside `docs/editorial-content-operations.md`, which governs *what*
may be published. This document governs *when* and *why*.

**The measurement this loop answers to** is
[`gsc-search-console-audit-2026-11.md`](./gsc-search-console-audit-2026-11.md) —
six months of real Search Console data. Read that before acting on anything here.
It found that the site's largest problem is not missing content but 601 impressions
landing on URLs that permanently redirect, and that one partner page earned 57.7%
of every click the property received.

## The problem this loop solves

Before this loop existed, the site had three defects that all had the same shape:
a promise made in public, with no mechanism behind it.

| Promise made on the site | What was actually true | Consequence |
|---|---|---|
| "Last reviewed" appears once a review is recorded | 0 of 210 lessons had ever been reviewed; 34 were past their scheduled date | The review cycle was a schedule nobody could discharge |
| Structured data describes the page | Every publication date is an estimate, so `datePublished` was suppressed everywhere; `dateModified` never emitted | The site served **no freshness signal at all** to search engines |
| The changelog records real work | It was accurate — but the *decision* of what work to do next was made by guessing | Effort went to whatever was most recently discussed, not to the largest gap |

None of these was a writing problem. They were all the same bug: **a plan with no
mechanism**. The fix is not more content. It is a loop that runs whether or not
anyone remembers it.

## The loop

```
    ┌──────────────────────────────────────────────────────────┐
    │                                                          │
    ▼                                                          │
 DISCOVER ──────────► CHOOSE ──────────► WRITE ──────────► RECORD
 (backlog.ts)      (one item, by      (the editorial     (review date,
 npm run           impact)             standard)          changelog)
 content:backlog                                                │
    ▲                                                           │
    └───────────────────────────────────────────────────────────┘
```

Each stage has exactly one command and one source of truth. Nothing is decided in
a meeting that cannot be reproduced from the repository.

### 1. Discover — `npm run content:backlog`

Computes the ranked list of everything the site already knows is wrong or missing.
Deterministic: same repository, same output. Six→four signals, each one traceable
to a data source:

| Signal | Source | What it means |
|---|---|---|
| `query-gap` | `QUERY_GAPS` in `backlog.ts` | A query Google already showed us for, with no page that answers it |
| `review-due` | `lesson-dates.generated.json` | A lesson past its 180-day review date |
| `missing-quick-answer` | `blog.ts` vs `quickAnswer` | The lesson still opens with a catalogue line |
| `thin-chapter` | `blog.ts` grouped by `note-chapters.ts` | A chapter short of its planned ten lessons |

Two signals were designed and then deleted: `tool-gap` and `stale-tool`. Both
needed a practice-tool registry with a "last checked" field, and the repository has
no such registry — tools are pages, not data. A signal that cannot compute would
have printed a permanent zero, which reads as "no work needed" when the truth is
"not measured". A test asserts they stay deleted.

### 2. Choose — one item

Pick **one** item from the top of the list. Not five. The list is ranked so that
impact dominates, then evidence, then effort as the tie-break, so quick wins
surface above long jobs of equal worth.

If the top item is `review-due`, the work is not writing. Run the review queue
instead:

```bash
npm run review:list
npm run review:lesson -- --slug <slug> --reviewer "<name>" --check
```

### 3. Write — to the editorial standard

`docs/editorial-content-operations.md` governs this stage and is not restated
here. The short version: name the learner's task, state the assumptions, say what
is uncertain, show how to practise, link primary sources for anything that
changes, and never invent a date or a measured outcome.

When the item closes a `query-gap`, quote the query on the page. That is what
makes the next export falsifiable: either the page earns the impression or it does
not.

### 4. Record — a real review, then a schema date

```bash
npm run review:lesson -- --slug <slug> --reviewer "<name>" \
  --confirm-accuracy --confirm-links --confirm-screens --write
```

The three confirmations are the three things that actually rot: the instructions,
the links, and the screenshots. The tool refuses to record without all three and a
named reviewer, because an unattributed review becomes a machine-readable claim
served to Google.

Recording a review does two things automatically:

1. Sets `reviewedAt` and rolls `reviewDueAt` forward 180 days.
2. Causes `dateModified` to appear in the page's structured data, which is the
   first time this site has ever emitted a freshness signal.

## The freshness contract

This is the most important rule in the system, and it is enforced by a test:

> **A date appears in structured data only when a person recorded it.**

All 210 publication dates are currently `precision: "estimated"`, so
`datePublished` is suppressed on every lesson. That is correct and deliberate —
the dates are ordered, not evidenced. `lesson-dates.generated.json` says so in the
header of the generator: "This script never invents a review."

`dateModified` is likewise absent until `reviewedAt` exists. The site therefore
publishes **no freshness signal** today. That is an honest state, and it is the
one thing in this document that is a live defect rather than a design choice: a
review cycle that has never been run cannot produce freshness. The fix is labour,
not code — 34 reviews are overdue right now.

Do not "fix" this by manufacturing dates. A fabricated `dateModified` is the one
SEO shortcut that is also a lie told in a format machines read.

## Cadence

| When | Command | Why |
|---|---|---|
| Weekly | `npm run review:list` | Work the overdue queue. A few lessons, not all 34 |
| Monthly | `npm run content:backlog -- --write` | Refreshes `docs/content-backlog.md`; items that vanish are done |
| Per Search Console export | Replace the `QUERY_GAPS` array | It is replaced wholesale, never appended to |
| Per published item | `changelog.ts`, only if the month's work warrants it | That file asks for one entry per month of real work, not per deploy |

## What this loop deliberately does not do

- **It does not publish anything.** Every item is a suggestion with a reason. The
  editorial standard still decides what goes live.
- **It does not invent dates.** See the freshness contract.
- **It does not use a model.** `backlog.ts` is deterministic and has no network
  call, so the ranking can be argued with and reproduced.
- **It does not gate the build on backlog size.** `--check` reports and exits 0.
  A check that is red forever is a check people learn to ignore.

## Known gaps

- `QUERY_GAPS` is hand-maintained and only knows what the last export showed.
- The backlog cannot see whether a lesson is *correct* — only whether it is due.
- Nothing here reads competitors or third-party keyword tools; every signal comes
  from our own data.
- The review queue has no assignment. Whoever runs `review:list` picks up what
  they can. That is fine at 210 lessons and will not be fine at 1,000.

---

# Appendix: what the national demand data says

Added after a review of Google's published Nigerian search trends. The structured
form of this is `src/data/editorial/demand-signals.ts`; this appendix explains how
to read it. **The data file is the source of truth.** If the two disagree, the file
wins and this appendix is wrong.

## Read this before quoting any number

The figures are **year-on-year changes in Google search interest in Nigeria**, as
published by Google and reported by the Nigerian press that covered the releases.
They are **not search volumes**. Google does not publish the base a percentage is
measured from, so +300% on a small base can be less traffic than +80% on a large
one. A test enforces that no volume claim sneaks into the file.

One metric is **contested**: AI-literacy growth in Nigeria appears as **+84%** in
Google's March 2026 release and as **+840%** in a release reported in April 2026
quoting a Google executive. One is wrong, or they measure different things and the
distinction was lost in reporting. We do not know which. The file records both,
marks confidence `low`, and a test fails if the caveat is removed. **Never quote
+840% on its own.** It is the more impressive number and it appeared in more
outlets, which is precisely why it needs the caveat.

## The finding that matters

The fastest-growing demand is **not** for what this site's advanced material
teaches.

| Trend | Growth | Can we serve it? |
|---|---|---|
| how to learn AI | +160% | **Half** — 542 AI lessons, but they open at "Dev Environment" |
| how to learn computer step by step | +160% | **Yes, well** |
| how to learn Excel | +160% | **Yes, well** |
| how to learn Photoshop | +180% | Half — we teach design, not the tool |
| how to start freelancing with no experience | +90% | **Yes, well** |
| how to learn forex trade | +300% | **No — declined** |
| how to learn make up | +270% | **No — declined** |
| learn Italian / Japanese | +130% | **No — gap** |

Three things fall out of that table.

**1. The AI gap is a doorway problem, not a content problem.** The site owns 542 AI
lessons and they begin at phase 00, lesson 01 — *Dev Environment*: Git, GPU setup,
API keys, Jupyter. That is a developer on-ramp. The person searching "how to learn
AI" in Nigeria in 2026 is, on Google's own description, most often a student or a
small-business owner on a phone. They will never reach the material. And because
`/ai-engineering/$phase/$lesson` is `noIndex`, none of the 542 can rank either.

Note the temptation and why it is wrong: flipping `noIndex` off would make 542
pages indexable overnight and look like a huge SEO win. It would also put a
duplicate of an upstream MIT-derived project into Google under our domain, which is
the duplicate-content problem that AdSense already flagged. The honest fix is one
original landing page that belongs to us and leads into the course.

**2. Most of the growth is already served — and wasted.** "Learn computer step by
step", "learn Excel" and "start freelancing" are answered by courses that are live
and indexed. They still do not convert, because 199 lessons open with a catalogue
line instead of an answer. The demand data does not argue for more content here; it
argues for finishing the content that exists.

**3. The biggest number is the one to leave alone.** Forex is +300%, the fastest
"how to learn" query in the dataset and the highest intent per searcher. It is also
a regulated activity where the plausible reader outcome is losing money to a
scheme. CEA is not a licensed adviser. Writing a "learn forex" page would be the
single most profitable-looking and least defensible thing this site could do. The
adjacent honest move is a consumer-protection piece on recognising an investment
scheme — which serves the same searcher without pretending to be a trading school.

## What this changes

Nothing is added to the backlog that was not already justified by the site's own
data. Four half-served trends now appear as `market-signal` items with their
evidence attached. Everything else is recorded so the decision can be re-examined
instead of rediscovered.

The honest summary: **the trend data does not say "write more". It says "finish
what you started, and build one door for the audience you already have but cannot
reach."**

## Known limits of this analysis

- Google's releases are national aggregates. They cannot tell us about Lagos
  specifically, or about the age band this site actually serves.
- The press coverage is reporting on a Google presentation; we have not seen the
  underlying export. Treat the citations as secondary sources.
- No competitor data was used. We know what people search for; we do not know who
  currently answers it or how well.
- Popularity is not the same as suitability. Four trends here are large and
  deliberately unserved, and that is the analysis working, not failing.
