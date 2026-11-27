# Search Console export, six months to 23 November 2026 — what it actually says

This is the first time the raw export has been available. Everything below is
measured from `Queries-7`/`Pages-7` as supplied, and it **supersedes** the
aggregated figures in `src/data/editorial/search-performance.ts` where the two
disagree.

## The totals

| | Queries tab | Pages tab |
| --- | --- | --- |
| Rows | 451 | 433 |
| Clicks | **11** | **109** |
| Impressions | 1,927 | 8,301 |

The pages tab is the true total. **The queries tab sums to 11 clicks because
Search Console only reveals a query when volume is high enough** — 98 of 109
clicks are unattributed. Any query-level strategy built on this export is
reasoning about 10% of the data, which is exactly what the audit document warns
about.

## The finding that matters: 73% of impressions earn nothing

| Cohort | Pages | Impressions | Clicks | CTR |
| --- | --- | --- | --- | --- |
| Pages with zero clicks | 403 | 6,060 | 0 | 0% |
| …of those, ranking in the top ten | 292 | 4,838 | 0 | 0% |

Against industry CTR at the same positions, 8,301 impressions should produce
roughly **340 clicks**. The property produces **109 — 32% of expected.**

By position band:

| Position | Pages | Impressions | Clicks | CTR |
| --- | --- | --- | --- | --- |
| 1–3 | 22 | 211 | **0** | **0.00%** |
| 3–5 | 57 | 702 | 28 | 3.99% |
| 5–8 | 136 | 2,870 | 71 | 2.47% |
| 8–11 | 105 | 3,272 | **4** | **0.12%** |
| 11–15 | 34 | 477 | 3 | 0.63% |

**Position 1–3 producing zero clicks across 211 impressions is not a CTR
problem. It is a broken path.** And it has a single cause:

| | Impressions at position <3.5 |
| --- | --- |
| `/glossary/vulnerability-assessment` (pos 2.04) | 172 |
| Everything else combined | 87 |

**174 of 259 top-3 impressions were the glossary.**

## The redirect in front of the ranking

`/glossary/$slug` 301'd unconditionally to `/classes` — a course list. Every
glossary URL was served, indexed, ranked, shown in results, and then refused the
reader. 29 URLs, 506 impressions, 0 clicks, including:

| URL | Impressions | Position |
| --- | --- | --- |
| `/glossary/zero-trust` | 189 | 4.13 |
| `/glossary/vulnerability-assessment` | 172 | **2.04** |
| `/glossary/digital-signature` | 35 | 3.91 |
| `/glossary/agile-methodology` | 30 | 10.6 |

### What was done, and what was not

**Not done: un-redirecting the glossary.** The removal was deliberate quality
control during AdSense low-value remediation. Re-publishing 62 short term pages
to chase impressions would restore the problem that removal fixed.

**Done: the destination now depends on the term.** Six terms route to companion
articles that already answer them, all of which are indexable and in the sitemap:

| Term | Now goes to |
| --- | --- |
| `zero-trust` | `/blog/zero-trust-in-plain-words` |
| `vulnerability-assessment` | `/blog/what-a-vulnerability-assessment-is` |
| `digital-signature` | `/blog/signed-or-just-a-picture` |
| `pki` | `/blog/digital-vs-electronic-signature` |
| `siem`, `soc` | `/blog/the-soc-room` |

Unmapped terms keep the neutral fallback. That is deliberate: pointing them
somewhere merely adjacent is the same defect with a newer address. The gaps are
recorded in `GLOSSARY_DESTINATIONS_TODO` so nobody "fixes" them by guessing.

**Metric to watch:** this change should move 506 impressions from 0 clicks to
something non-zero. If CTR on `/blog/vulnerability-assessment-*` stays at zero
after re-indexing, the problem is the SERP, not the redirect, and the next move
is different.

## Where the clicks actually come from

| Source | Clicks | Share |
| --- | --- | --- |
| `/opportunities/idice-skills-to-jobs` | 60 | 55% |
| Homepage | 15 | 14% |
| **Everything else (431 pages)** | **34** | **31%** |

Two pages carry 69% of all clicks. One of them is a partner programme page whose
traffic comes from people searching the partner's domain
(`wootlab.ng/idicebpo`, 120 impressions, 11 clicks) — demand we cannot
manufacture and do not control.

## The pages losing the most

| Page | Impressions | Position | Problem |
| --- | --- | --- | --- |
| `/blog/kilobytes-and-megabytes` | 823 | 10.1 | Title serialised "What KB, MB and GB actually mean" — does not contain "which is bigger", which is what 38 impressions of the cluster use. **Retitled.** |
| `/blog/the-soc-room` | 271 | 10.4 | Answers "what is a SOC". The query is "soc room", and 15 impressions at **position 1.0** are an interior-design question. **New article answers the first and names the second.** |
| `/blog/what-a-megabyte-is` | 230 | 9.52 | Duplicates the same cluster. |
| `/glossary/zero-trust` | 189 | 4.13 | The redirect. **Fixed.** |
| `/ai-engineering/08-.../09-inpainting` | 235 | 9.45 | `noIndex` lesson earning nothing by design. |

## New articles written from the export

| Article | Query it answers | Evidence |
| --- | --- | --- |
| `what-a-soc-room-is` | "soc room" | 190 imp, pos 12.97, 0 clicks |
| `where-your-files-actually-are` | "what is the cloud" cluster | 94 imp across 23 queries, pos 15–34 |
| `what-kb-mb-gb-stand-for` | "kb ka matlab kya hota hai" and the full-form queries | 33 imp across three languages |
| `how-to-type-the-naira-sign` | "how to type naira sign" | 64 imp across 14 queries, pos 6.2–12.8 |
| `what-agile-methodology-means` | "agile methodology" | 30 imp, pos 10.6 |

Each is answer-first, carries a `quickAnswer`, states a recovery step, and has
no invented figure. A test now fails the build if any companion post points at an
image that does not exist, quotes a naira figure without a stated sample, or
omits its recovery paragraph.

## What this export cannot tell us

- **87% of clicks are unattributed to a query.** Do not build a keyword plan on
  the queries tab alone.
- **No volume.** Impressions are not searches, and Search Console reports only
  the positions where we appeared.
- **One period, no trend.** The `Chart` file is a single series; a ranking that
  rose because a competitor dropped is indistinguishable from one that rose
  because of a change here.

## Next measurement

Re-export in **February 2027** and check three numbers:

1. Did position 1–3 CTR move off 0.00%?
2. Did `/blog/vulnerability-assessment-*` earn clicks?
3. Did the five new articles appear in the export at all?

If the answer to (1) is still zero, the redirect was not the whole cause and the
next hypothesis should be that the snippets are being outranked by Google's own
answers — which is a different fix entirely.
