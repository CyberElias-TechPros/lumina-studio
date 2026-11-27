# Demand lifecycle and season plan — November 2026

Answering three questions about demand, and separating them because they need
different answers:

1. What is trending now?
2. What has long, steady volume worth building on?
3. What is coming, seasonally, that we can prepare for?

The short version: **the Google Trends interface could not be reached**, so no
number in this document is a measured search volume. Everything here is dated
secondary reporting, published calendars, or our own Search Console export. That
distinction is the point of the document, not a disclaimer bolted onto it.

---

## What could not be measured, and why that matters

| Attempt | Result |
| --- | --- |
| `trends.google.com/trends/explore?geo=NG` | refused |
| `trends.google.com/trends/api/explore` | refused |
| `trends.google.com/trends/trendingsearches/daily/rss?geo=NG` | refused |
| `serpapi.com` (a paid proxy) | blocked |

Google Trends is JavaScript-rendered behind an endpoint that refuses automated
reads from here. There is no workaround available in this environment.

**What this costs us.** We cannot say "keyword X gets N searches a month". Any
such figure in a planning document from here is a guess wearing a number's
clothes. The planning below therefore ranks *direction and durability*, not
volume.

**What we do have.** Search Console measured against the real property, which is
a smaller but genuine dataset: 97 clicks, 6,609 impressions, 1.47% CTR, average
position 9.40 across 109 days (`src/data/editorial/search-performance.ts`). That
tells us what we are already close to winning, which is more actionable than a
national volume number would be.

---

## 1. Rising — real direction, unmeasured size

These come from Google's own Nigeria trend release for March 2026, carried by
Nigerian tech press in April 2026. They are quoted because they are dated and
attributable; they are not treated as volumes.

| Topic | Reported | Content decision |
| --- | --- | --- |
| Autonomous agents | +390% over 12 months | **Written.** `/blog/what-is-an-ai-agent-in-plain-words` |
| AI literacy | +840% per the press release, +84% per other coverage | **Cannot use the figure.** The two numbers are irreconcilable. The direction is used; the percentage is not. |
| AI tutor | "breakout" | Wait. It is a product query, not a learning query, and our Academy page already answers it. |
| AI + school / homework / chemistry | rising | Watch. This is exam-adjacent and collides with JAMB season below. |
| Vibe coding | rising per secondary commentary only | **Deliberately not written.** See the reject list. |
| Prompt engineering | falling | Do not build a pillar on it. |

### The one number we will not use

The AI literacy figure is reported as **+840%** in one version of the release and
**+84%** in another. The gap is a factor of ten. Until a primary source settles
it, neither appears in published copy, and `demand-signals.ts` marks it
`confidence: low` with both numbers recorded so nobody "tidies" it later by
picking one.

---

## 2. Steady — the pages that should earn for years

Steady demand is better than rising demand for a site like this, because a steady
term produces a page that keeps working. Our only real asset — the term we rank
**position 2.04** for with 172 impressions and zero clicks — is in this class.

| Topic | Evidence it is steady | Page |
| --- | --- | --- |
| Cybersecurity roles and hiring | 1,300+ vacancies listed in Nigeria in May 2025, concentrated in Lagos and Abuja; market forecast ~10.7% a year to 2029; 3MTT targets 3 million trained people by 2027 | `/blog/cybersecurity-jobs-and-what-they-pay` |
| Vulnerability assessment as a practice | Already ranking 2.04; the queries are definitional and repeat every intake | Served by the same page, plus `/tools/security-assessment` |
| Computer basics | Our own export: every impression cluster with real clicks is a basic-literacy task | The 210-lesson library |

**The strategic point.** We rank second for a term and convert none of it,
because the page that ranks is a definition and the person searching wants a job.
That is the single cheapest win available to this property, and it is why the
cybersecurity page was written this month rather than a page chasing a trend.

---

## 3. Forecast — scheduled demand, which is the only kind you can plan capacity against

This is the class with no guesswork in it, because exams happen on a calendar
whether or not anyone searches for them.

| Window | What happens | What we should have ready |
| --- | --- | --- |
| **Now → 18 Dec 2026** | Lagos first term ends 18 December. JAMB prep enquiries are already in their peak season (Oct–Mar). | Intake messaging and the Computer Basics Lab. Do not launch new course pages in the last two weeks of December. |
| **21 Dec – 8 Jan** | Christmas and New Year vacation. Lowest attention of the year for study content. | Have everything published *before* this window, not during it. |
| **11 Jan 2027** | Second term resumes. JAMB UTME registration opens January. This is the January reskilling peak. | Course pages, free practice tools, and the exam-prep path must already be live and indexed by the first week of January. |
| **15–25 Mar 2027** | JAMB UTME (provisional). | Deadline-driven traffic; the practice tools matter more than any article. |
| **11 May – 18 Jun 2027** | WAEC WASSCE (provisional). | Same. |

**Caveat, stated because it is easy to forget:** the March and May 2027 dates are
**provisional** in the sources. The January resumption date is firmer. Treat all
of them as planning assumptions and re-check in December.

**The honest limit on this table.** It says when demand is *scheduled*, not how
large it is. We know people prepare for JAMB in January because registration
opens then. We do not know how many of them will search for what we publish, and
no Trends interface is available to tell us.

---

## The reject list, and why it is the most useful part

Content plans usually record what to write. The value here is in what was
rejected and on what evidence.

| Rejected | Reason |
| --- | --- |
| "Vibe coding" page | Rising per secondary commentary only. No primary source, no Nigerian data, no corpus on the site to link it to. Editorial rules forbid targeting a phrase we cannot support. |
| A generic "How to learn AI" guide | Real demand, but the site holds **542 lessons** and a generic guide would compete with them for the same query rather than feed them. This is the exact mistake that got the SOC room article deleted. |
| "Prompt engineering as a career" | Reported as declining. Building a pillar on a falling term is how a content library dates itself. |
| A scaled-up "idice" play | The winning queries were `wootlab.ng/idicebpo` — a **partner's domain**. We cannot manufacture demand for a URL we do not own. |

---

## What this changes in the repo

`src/data/editorial/demand-signals.ts` now carries `TREND_SIGNALS`, typed by
lifecycle:

- `risingTopics()` — returns **only** `rising`, deliberately excluding
  `emerging`. An emerging term rests on thinner evidence by definition; if it
  were queued here it would be written the week it was noticed.
- `emergingTopics()` — watched, not written.
- `steadyTopics()` — the durable pages.
- `scheduledDemand()` — calendar-driven, the only class safe for capacity
  planning.

Six tests in `scripts/test/demand-signals.test.mjs` enforce that a low-confidence
topic cannot quietly acquire a content action, that cooling topics cannot become
pillars, and that anything labelled `forecast` really does rest on a published
calendar rather than a hunch.

---

## Next review

Revisit in **January 2027**, after the resumption peak, with two questions:

1. Did the January window produce impressions on the pages prepared for it?
   (Search Console will answer this; nothing else can.)
2. Has a primary source appeared for the AI literacy figure? If so, resolve it in
   `demand-signals.ts` and publish the number with its source.
