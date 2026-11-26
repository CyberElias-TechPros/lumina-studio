# Search Console audit — six months to 23 November 2026

Raw exports: `gsc-reports.local/` (gitignored; re-exported each quarter).
Typed aggregates: `src/data/editorial/search-performance.ts`.
Period: 2026-08-07 → 2026-11-23, web search, 109 days.

## The one-paragraph version

The site received **97 clicks from 6,609 impressions** in six months, a 1.47% CTR at
an average position of 9.4. That is not a content-quality problem, and it is
mostly not a ranking problem either: 257 pages already sit in positions 4–10. The
problem is that **a third of the impressions land on pages that cannot be entered,
or that answer a question in a shape that loses before the click**. Meanwhile the
asset the site actually has — 210 notes on beginner computer skills — holds 61% of
impressions and converts at **0.22%**.

Most sites with this data would respond by writing more. The data says the opposite:
nothing is missing that is more valuable than what is already being wasted.

## Caveat before any number is quoted

**76% of impressions have no query attribution.** The chart totals 6,609
impressions; `Queries.csv` accounts for 1,614 of them. Search Console withholds
rare queries, so query-level rows describe a visible quarter of the picture.

Consequence for how this audit is worded: we can say *"we have no evidence anyone
searches for X"*. We **cannot** say *"nobody searches for X"*. Every claim below is
phrased the first way.

Page-level data is well attributed (103% of the chart total, normal because one
impression can populate several page rows), so page and cohort conclusions are the
sound ones.

## 1. The shape of the period is the finding

Weekly impressions, from the export:

```
2026-08-10      7
2026-09-14     39
2026-10-19    194
2026-11-02    422
2026-11-09   1369
2026-11-16   2881   <-- 400x the August weeks
2026-11-23    694
```

The site did not grow; it appeared. Something began indexing in the week of 9
November. Because no publication dates are recorded (all 210 are `precision:
"estimated"` — see `docs/content-currency.md`), **we cannot tell from this data
whether that was new pages, a sitemap change, or a ranking shift.** That is not a
gap in the export. It is the cost of never having recorded dates, and it is the
clearest practical argument for the review recorder built last commit.

## 2. Geography: you are right, it is not just Nigeria

| | Impressions | Share | Clicks | CTR |
|---|---|---|---|---|
| Nigeria | 2,399 | 36.3% | 84 | 3.50% |
| Rest of world | 4,210 | **63.7%** | 13 | 0.31% |

Nigeria converts 11× better than everywhere else combined. The international
traffic is real but thin, and it is concentrated:

| Country | Impressions | Clicks | CTR | Avg position |
|---|---|---|---|---|
| United States | 1,051 | 1 | 0.10% | 12.89 |
| India | 502 | 4 | 0.80% | 9.15 |
| United Kingdom | 257 | 0 | 0% | 10.30 |
| Ethiopia | 212 | 0 | 0% | 9.33 |
| Philippines | 190 | 1 | 0.53% | 9.63 |

**The United States is the second-largest source of impressions and produces one
click in six months.** At position 12.89 the site is on the second page — close
enough to be counted, far enough never to be chosen. India ranks at 9.15, on page
one, and still converts at 0.8%.

Two honest readings:

1. **This is a dilution problem, not an international opportunity.** 63.7% of
   impressions produce 13% of clicks. The site is being *shown* to people it was not
   built for, on queries like definitional English-language terms, and the answer it
   offers is written for a Nigerian reader.
2. **Or it is a real opening that the site is not yet equipped to take.** The
   queries that earn international impressions are the most generic ones —
   "what is zero trust security", "vulnerability assessment", "megabyte data". Those
   are the same queries a global reader types. What does *not* travel is the framing:
   a page that explains Zero Trust in terms of CBN requirements reads as local.

Which reading is true cannot be settled from this export alone, because we cannot
see country × query. **Do not build an international strategy on this data.** Do the
thing that serves both readings at once: make the high-ranking generic pages
answerable, then add the local context as a section rather than as the frame.

### The non-English signal

Small, and the only direct evidence of intent outside English:

- Hindi queries for "what does KB mean" — 8 queries, 45 impressions
  (`kb ka matlab kya hota hai`, `kb का मतलब क्या होता है`). **These are variations of
  a page that already exists** and already ranks at ~8.5.
- Spanish: 1 query, 1 impression. French: 1 query, 5 impressions.

A translation strategy cannot be justified on 51 impressions. But the Hindi cluster
is a hint that the megabyte page's *topic* travels even when the site's framing does
not.

## 3. The redirect trap — the largest structural defect

`vercel.json` contains 59 permanent redirects. Ten of them collapse whole content
trees into `/classes`:

```json
{ "source": "/glossary/:path*",     "destination": "/classes", "permanent": true }
{ "source": "/programs/:path*",     "destination": "/classes", "permanent": true }
{ "source": "/library/:path*",      "destination": "/classes", "permanent": true }
{ "source": "/resources/:path*",    "destination": "/classes", "permanent": true }
{ "source": "/career-guides/:path*","destination": "/classes", "permanent": true }
```

Meanwhile `/glossary/*` still ranks — extremely well:

| URL | Impressions | Avg position | Clicks |
|---|---|---|---|
| `/glossary/vulnerability-assessment` | 172 | **2.04** | 0 |
| `/glossary/zero-trust` | 189 | **4.13** | 0 |
| `/glossary/digital-signature` | 35 | 3.91 | 0 |
| `/glossary/agile-methodology` | 30 | 10.60 | 0 |

**49 URLs in these trees hold 601 impressions and earned 1 click.** For comparison,
`/classes` — their destination — earned 34 impressions and 3 clicks in the same
period. The redirects are 1,768% more visible than where they point.

This matters more than a normal redirect because of what it does to a searcher. The
glossary page is served, indexed, ranked, and shown in results — and then
unconditionally 301s anyone who clicks it to a page about something else. The user
has been *answered* by Google and *refused* by the site.

### What not to do about it

The obvious fix — un-redirect `/glossary/*` — is the wrong one, and the repository
already thought this through. `docs/academy-site-redesign-report.md` describes the
glossary as an "SEO farm" and the library as "1,958 items", and the removal was a
deliberate act of quality control, not an accident. `docs/adsense-low-value-remediation.md`
exists because thin, high-volume pages were a real problem. Re-publishing 49 thin
term pages to catch 601 impressions would trade a fixed problem for an older one.

### What to do instead

The glossary entries are *good*. `vulnerability-assessment` at position 2.04 is the
single best ranking this property owns. The content is not the defect; the container
is. Two options, in order of preference:

1. **Fold the winners into the corpus.** Take the 5–10 glossary terms that actually
   rank, and give each one a real lesson-shaped page at `/blog/*` — the format that
   already holds 61% of impressions and has a place in the learning order. Retire
   the glossary entries and point the redirects at the new pages. The knowledge
   survives, the thin-page problem does not return, and the ranking transfers.
2. **Promote only the top three.** If a full migration is too much, `zero-trust`,
   `vulnerability-assessment` and `digital-signature` are worth the effort on their
   own: 396 impressions and two top-five rankings between them.

Either way, **do not leave a 301 in front of a page Google is ranking**. That is the
only unambiguous finding in this audit.

## 4. The corpus is ranking and losing

| Cohort | Clicks | Impressions | CTR | Avg position |
|---|---|---|---|---|
| 210 notes (`/blog/`) | 9 | 4,016 | **0.22%** | 9.1 |
| Glossary (`/glossary/`) | 0 | 506 | 0% | 4.2 |
| Legacy trees (301ing) | 1 | 601 | 0.17% | 19.1 |
| AI Engineering lessons | 3 | 797 | 0.38% | — |
| `/opportunities/idice-skills-to-jobs` | 56 | 701 | 7.99% | 5.5 |
| Homepage | 14 | 92 | 15.22% | 4.0 |

Two facts stand out.

**One partner page earned 57.7% of all clicks on the site.** `/opportunities/idice-skills-to-jobs`
is not content and not a course. Whatever it is doing, it is doing the job the
academy's own pages cannot. That page deserves to be studied before anything else is
written — it is the only proof on the property that a CEA URL can convert.

**Position is not the constraint.** 257 pages sit in positions 4–10 and produce a
1.97% CTR. That band is where the site lives, and it is losing there.

### The megabyte cluster — where the standard answer does not fit

The largest content theme in the export: **82 distinct queries, 276 impressions, zero
clicks**, all about KB/MB/GB. They land on `/blog/kilobytes-and-megabytes` (650
impressions, position 10.48) and `/blog/what-a-megabyte-is` (205 impressions).

The `short-answer` thesis would predict this page fails because it opens with a
catalogue line. **It does not.** That page's `quickAnswer` already reads: *"From
smallest to largest: KB, then MB, then GB, then TB..."* — precisely the answer the
queries want. Its title is "KB vs MB vs GB: Which Is Bigger?" — precisely the query
shape.

So the standard fix has already been applied and did not work. The likely cause is
that the answer is **fully printed on the search result**: Google's own unit
conversion and instant answers satisfy "which is bigger, KB or MB" without a click.
That is a query class where the click is decided before the page is ever visited, and
no amount of improvement to the page will recover it.

**Implication:** this cluster is a bad place to spend effort. It is also a warning
against generalising the short-answer result — the 0.22% blog CTR is driven partly by
one theme that cannot be won.

### Where the short-answer thesis still holds

Pages that rank between 4 and 10 with zero clicks on queries that are *not*
instant-answerable:

| URL | Impressions | Position |
|---|---|---|
| `/blog/an-email-signature` | 201 | 9.26 |
| `/blog/the-soc-room` | 177 | 13.23 |
| `/blog/sitting-down-at-a-computer` | 147 | 8.53 |
| `/blog/naira-and-accents` | 129 | 6.06 |
| `/blog/undo-and-redo` | 124 | 7.50 |
| `/blog/drag-and-drop` | 120 | 8.62 |
| `/blog/searching-for-a-lost-file` | 118 | 10.46 |
| `/blog/when-there-is-no-sound` | 117 | 9.24 |

That is 14 pages holding **2,584 impressions** (39% of the site) for zero clicks.
These are the real target — not the megabyte cluster, and not new articles.

## 5. Mobile is not the problem it usually is

| Device | Clicks | Impressions | CTR | Avg position |
|---|---|---|---|---|
| Mobile | 69 | 3,413 | **2.02%** | 7.75 |
| Desktop | 28 | 3,081 | 0.91% | 11.19 |
| Tablet | 0 | 115 | 0% | 8.12 |

Mobile ranks better *and* converts 2.2× better than desktop. This is unusual and it
is a genuine strength: the site is built for the device its audience actually uses.
Do not "optimise for mobile" — that work is done.

## 6. What this changes in the plan

Compared with `docs/gsc-audit-2026-11.md`, which was written from inference:

| Previous assumption | What the data says |
|---|---|
| The gap is discoverability; fix by linking and answer-first | Half right. Discoverability is fine — 257 pages are on page one. The gap is **destination** (301s) and **click-worthiness** on non-instant queries. |
| Nigeria-first | Nigeria is 36.3% of impressions but 87% of clicks. The site is shown worldwide and converts locally. |
| The short-answer defect explains the low CTR | Partly. It explains `/blog/an-email-signature`; it does **not** explain the megabyte cluster, which already opens with its answer. |
| More content would fix it | The data argues the opposite. 8.8% of impressions are on pages that are turned off, and 39% are on pages that answer but do not convert. |

### Revised order of work

1. **Resolve the redirect rankings.** 601 impressions, 2 top-five positions, currently
   thrown away. Cheapest real win on the property.
2. **Study `/opportunities/idice-skills-to-jobs`.** The only converting page. Understand
   why before writing anything else.
3. **Fix the 14 zero-click pages listed above.** 2,584 impressions already ranking.
4. **Leave the megabyte cluster alone** unless a test shows position moving above the
   instant answer.
5. **Do not build an international strategy yet.** Add generic framing to pages that
   already rank worldwide; do not open new markets.
6. **Record dates.** The November spike cannot be explained without them.

## What this audit cannot see

- **Country × query.** The most consequential missing cross-tab. US conversations
  would change the international reading entirely.
- **76% of queries.** Thresholded out. Any "no demand" conclusion is unsupported.
- **Clicks that left immediately.** A 0.22% CTR could be a click failing to happen or
  a bounce making the next impression irrelevant. GSC cannot tell them apart.
- **Whether the November spike was new pages or new rankings** — the publication
  dates were never recorded.
- **Branded vs unbranded.** `elias academy` appears at 8 impressions; everything else
  looks unbranded, but the data does not label it.
