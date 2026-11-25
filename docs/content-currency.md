# Staying current: the content loop

This document describes the machinery that keeps the site's 210 learning notes
current and tells us what to write next. It exists because the site had a review
policy and no way to run it, which is how a review policy quietly becomes a
fiction.

Read this alongside `docs/editorial-content-operations.md`, which governs *what*
may be published. This document governs *when* and *why*.

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
