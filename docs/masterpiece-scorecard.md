# Masterpiece Scorecard — measuring "excellent" instead of arguing about it

Companion to [`../plans/CEA_MASTERPIECE_BLUEPRINT_2026-10.md`](../plans/CEA_MASTERPIECE_BLUEPRINT_2026-10.md).

Two tools, used together:

- **Rubric (§1–§2):** fifteen dimensions, five levels each. Gives a shared language and a monthly trend.
- **Gates (§4):** twelve binary checks. Gates override the score: a site cannot be called a masterpiece while any gate is red, whatever the average.

Scores below are a **source-based assessment on 25 October 2026** (repository + production reading), not a certified audit. Re-score monthly with evidence links. Owner: product director; verification: risk & QA governor.

---

## 1. Levels

| Level | Name | Meaning |
|---|---|---|
| 1 | **Absent** | The dimension exists in nobody's job description; problems are discovered by users. |
| 2 | **Attempted** | There is a page, a policy, or a habit — but it is inconsistent, unevidenced, or unowned. |
| 3 | **Sound** | Consistently present and correct; would pass a reasonable professional review; no formal evidence trail. |
| 4 | **Strong** | Deliberate, measured, documented; survives a sceptical reviewer; regressions are caught by a process. |
| 5 | **Masterpiece** | Better than the best competitor in the category; generates trust and word-of-mouth by itself; a standard others copy. |

**A 5 requires external evidence** (a user quote, a benchmark comparison, an audit report), not just internal confidence.

---

## 2. The fifteen dimensions

### 1. Purpose & message clarity — weight 8%
| | |
|---|---|
| 1 | Visitor cannot tell what is taught, where, or for how much. |
| 2 | Value line exists but is generic ("Unlock your potential"). |
| 3 | First screen states what/where/how much/who for, in plain words. |
| 4 | First screen + three facts + one proof element; a stranger can repeat it accurately after 10 seconds. |
| 5 | Same clarity holds on every entry page (course, lesson, search landing), and the copy reads like a person, not a brand. |
| **Current** | **4** — homepage is unusually clear (location, fees, sessions). Course pages vary. |
| **Target (90d)** | 5 · **Measure:** 5-second test with 8 strangers; ≥ 7 correct restatements. |

### 2. Enrolment journey — weight 10%
| | |
|---|---|
| 1 | No path from interest to application. |
| 2 | Form exists; fee/start date discovered only after contact. |
| 3 | Course → apply works; fee visible before any personal data is requested; progress shown. |
| 4 | Instrumented at every step; abandonment understood weekly; honest errors; resume; WhatsApp assist. |
| 5 | Apply completes in < 4 minutes on 3G, ≥ 60% completion, and applicants arrive already knowing fee and address. |
| **Current** | **3** — flow exists and is real; instrumentation and CRO discipline incomplete. |
| **Target** | 4 by 90 days (`apply_started → application_submitted` ≥ 45%), 5 by 6 months. |

### 3. Content authority & depth — weight 12%
| | |
|---|---|
| 1 | A handful of thin pages. |
| 2 | Volume exists; several pages under 300 words; structures inconsistent. |
| 3 | 200+ lessons with a template; every page has substance. |
| 4 | 900–1,400-word lessons with figures, self-check, sources, reviewed dates; chapter hubs; glossary graph; zero thin indexable pages. |
| 5 | The definitive beginner-computer corpus for Nigeria; cited and linked by others; readers return without a campaign. |
| **Current** | **4** on the corpus (the voice is genuinely distinctive), **2–3** on course pages and several utility pages. Report as **3**. |
| **Target** | 4 within 90 days (Gate: zero thin indexable pages), 5 within 12 months. |

### 4. Editorial integrity & proof — weight 9%
| | |
|---|---|
| 1 | Claims are made with nothing behind them. |
| 2 | Some real facts; some unverifiable numbers or stock imagery. |
| 3 | Founder byline, real address, published fees, corrections page. |
| 4 | Claims register, reviewer bylines on every technical lesson, AI policy, learner proof with consent, dated photographs. |
| 5 | A sceptical journalist or evaluator can verify every claim from the site alone, in ten minutes. |
| **Current** | **3** — real photos, real fees, founder voice; no claims register, no learner proof yet. |
| **Target** | 4 by 60 days. |

### 5. Visual craft & brand coherence — weight 8%
| | |
|---|---|
| 1 | Default template look; inconsistent type and spacing. |
| 2 | Distinct palette/type, but mixed radii, inconsistent rhythm, some stock imagery. |
| 3 | Coherent token system, four-family type scale, consistent layout grammar. |
| 4 | Print-quality detail: hairlines, captions, marginalia, tabular figures, one accent used with restraint; two pages side by side feel like the same place. |
| 5 | Recognisable at a glance and unmistakably this school — a design others in the Nigerian training market imitate. |
| **Current** | **4** — the token system and type pairing are strong; some page compositions are still skeletal. |
| **Target** | 5 by 6 months after the page-brief pass. |

### 6. Motion & feel — weight 4%
| | |
|---|---|
| 1 | Janky or absent feedback. |
| 2 | Motion present but inconsistent; some infinite decoration. |
| 3 | Consistent durations/easings; reveals once; reduced-motion respected. |
| 4 | Motion communicates hierarchy and continuity; never blocks input; no CWV cost; disabled cleanly. |
| 5 | Feels calm and responsive at once; the "settling surface" quality is noticed unprompted. |
| **Current** | **4** — a real motion system with reduced-motion parity. |
| **Target** | Keep 4; never trade INP for flourish. |

### 7. Mobile & low-bandwidth experience — weight 9%
| | |
|---|---|
| 1 | Desktop-first; horizontal scroll; heavy media. |
| 2 | Responsive but heavy; video or large imagery on mobile. |
| 3 | Usable at 360px; images optimised; readable in sunlight. |
| 4 | Budgeted; real-device tested (Tecno/Infinix class); data-saver; offline lessons verified; WhatsApp share cards legible. |
| 5 | Better on a cheap phone than most competitors are on a laptop; a learner on a 3G connection never waits without feedback. |
| **Current** | **3** — PWA/offline work exists; no field baseline or device matrix. |
| **Target** | 4 by 60 days. |

### 8. Accessibility (WCAG 2.2 AA) — weight 8%
| | |
|---|---|
| 1 | Keyboard traps, missing labels, low contrast. |
| 2 | Some semantic care; no audit. |
| 3 | axe-clean on core templates; focus visible; labels real. |
| 4 | Manual keyboard + screen-reader walkthroughs of apply and a lesson; target sizes; plain language; captions; written evidence. |
| 5 | A learner using TalkBack or a cracked screen can learn and apply without assistance, and says so. |
| **Current** | **3** — good intent, no documented audit. |
| **Target** | 4 by 90 days. |

### 9. Performance & resilience — weight 8%
| | |
|---|---|
| 1 | Seconds of blocking; no monitoring. |
| 2 | Lab-only numbers; no budgets. |
| 3 | Reasonable CWV; no enforcement. |
| 4 | Field p75 within budget; CI enforces; error budget and rollback proven. |
| 5 | p75 LCP < 1.8 s on mobile in Nigeria, with a public record of the numbers. |
| **Current** | **2** — no recorded field baseline. |
| **Target** | 4 by 60 days. |

### 10. Technical SEO & discoverability — weight 9%
| | |
|---|---|
| 1 | No sitemap, canonical errors, nothing indexed. |
| 2 | Sitemap exists; redirect chains; canonical host issues. |
| 3 | Clean canonicals, sitemap, titles/descriptions, schema basics. |
| 4 | Schema matrix validated; hub/internal-link rules enforced; weekly index drift review; zero orphan pages. |
| 5 | Dominates its niche locally; pages rank for the task language real people use. |
| **Current** | **4** — canonical host fixed, 400-URL sitemap, per-page metadata; internal linking discipline is the gap. |
| **Target** | Keep 4 with a weekly drift review; 5 within 12 months. |

### 11. Local & external presence — weight 7%
| | |
|---|---|
| 1 | Nothing outside the website. |
| 2 | Social profiles exist, unmaintained. |
| 3 | GBP complete and posting; consistent NAP; a few reviews. |
| 4 | School partnerships, local press, 8-video library, WhatsApp answer culture, full citations. |
| 5 | "Computer training Port Harcourt" returns CEA in maps, search and word-of-mouth; partners approach you. |
| **Current** | **2** — foundations only. |
| **Target** | 4 by 6 months. |

### 12. Trust, legal & privacy — weight 8%
| | |
|---|---|
| 1 | No policies; unclear ownership. |
| 2 | Policies present but generic or inconsistent with practice. |
| 3 | Privacy, terms, refunds, accessibility, cookie consent, real address. |
| 4 | Vendors listed; consent gated; DPO contact; DSAR path; advertised claims lawful; plain-language summaries. |
| 5 | A lawyer or regulator would find the disclosure model exemplary for a small academy. |
| **Current** | **4** — unusually complete for the market; CMP and vendor list outstanding. |
| **Target** | Keep 4 and close the CMP gap. |

### 13. Monetisation readiness (AdSense) — weight 5%
| | |
|---|---|
| 1 | No `ads.txt`, no policy, no consent. |
| 2 | Partial plumbing; thin pages in the index. |
| 3 | All seven gates in `docs/adsense-approval-playbook.md` green. |
| 4 | Approved; ads only on reading pages; CLS-neutral; policy-clean 90 days. |
| 5 | Advertising demonstrably subsidises free lessons without touching enrolment or trust. |
| **Current** | **2** — plumbing deliberate and correct, gates not green. |
| **Target** | 3 by week 12, 4 by month 5. |

### 14. Measurement & operations — weight 6%
| | |
|---|---|
| 1 | No analytics; decisions by opinion. |
| 2 | Analytics installed, no taxonomy, no weekly review. |
| 3 | Tracking plan; core events verified; one dashboard. |
| 4 | Weekly triage with decisions and owners; experiments logged; gates evidenced. |
| 5 | Every change is traceable to a metric; the team can explain the funnel's constraint at any moment. |
| **Current** | **2** — instrumentation exists; operating rhythm does not. |
| **Target** | 3 by 30 days, 4 by 90. |

### 15. Signature & memorability — weight 7%
| | |
|---|---|
| 1 | Interchangeable with any template site. |
| 2 | Some personality in copy. |
| 3 | One or two distinctive elements (lesson voice, course finder, six-beat rail). |
| 4 | A coherent set of signature moments (fee receipt, deliverable gallery, reading spine, printable guide) that people screenshot and share. |
| 5 | People describe the site to a friend by describing one thing it does. |
| **Current** | **3** — the lesson voice is the standout; most signature moments are unbuilt. |
| **Target** | 4 by 90 days. |

---

## 3. Scoring

Weighted average of the fifteen dimensions (weights above sum to 100%).

| Band | Meaning | Posture |
|---|---|---|
| 1.0–1.9 | Not yet a real product | Fix fundamentals only |
| 2.0–2.9 | Attempted | No new features; complete what exists |
| 3.0–3.4 | Sound | Defensible; close the gates |
| 3.5–4.2 | Strong | Invest in signature and presence |
| 4.3–4.7 | Masterpiece candidate | Protect it; publish the standard |
| ≥ 4.8 with all gates green | Masterpiece | Maintain and teach others |

**Estimated position on 25 October 2026: ≈ 3.2 / 5** — a genuinely strong foundation with a distinctive content voice, held back by unmeasured performance, absent learner proof, thin utility pages, and no operating rhythm. That is a better starting position than most sites in the category ever reach. The distance to 4.3 is process, not invention.

**Target trajectory:** 3.6 by day 30 · 4.0 by day 60 · 4.3 by day 90 · 4.6 by month 6.

---

## 4. Gates (binary, override the score)

| # | Gate | Test | Owner |
|---|---|---|---|
| G1 | No thin indexable page | Crawl: every indexable URL ≥600 words or a real listing or `noindex` | SEO manager |
| G2 | Every claim evidenced | Claims register: 100% coverage, no unsupported numeric promise | Executive sponsor |
| G3 | Apply flow works unaided | 5 first-time users complete `/apply` on their own phone; ≥ 4 succeed without help | UX researcher |
| G4 | Performance in budget | Field p75 LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.05 on 6 templates | Performance engineer |
| G5 | Accessibility pass | axe zero serious/critical on 5 templates + keyboard/TalkBack walkthrough of apply | A11y specialist |
| G6 | Legal & consent complete | Reviewed policies; consent gated; vendors listed; CMP decision implemented | DPO |
| G7 | Proof layer live | 3 consented learner deliverables, 24 dated photographs, founder letter, staff bylines | Alumni mgr + art director |
| G8 | Editorial transparency live | `/editorial` with standards, AI policy, corrections SLA, reviewer names. **Editorial machinery shipped 26 Oct 2026** (`/editorial/changelog`, `/editorial/corrections`, evidence-gated dates, CI contract). Remaining: named reviewers recorded as the 180-day cycle runs. | Editor-in-chief |
| G9 | Indexing hygiene | Zero `noindex` leaks, zero orphan pages, zero broken internal links | SEO manager |
| G10 | Release discipline | Every deploy has revision proof, rollback tested, 24h watch recorded | DevOps |
| G11 | Measurement verified | All launch events verified in debug view; one dashboard; weekly triage held 4 weeks running | Analytics lead |
| G12 | AdSense pre-flight | All seven gates in the AdSense playbook green, logged with screenshots | Monetisation mgr |

**Rule:** a red gate freezes *new* work in the area it covers and blocks the word "masterpiece" from any internal or external description of the site.

---

## 5. Monthly scorecard record (copy this block each month)

```
Month:                  Assessor:
Weighted score:         Prev month:          Delta:

Dimension              Score  Evidence link                         Owner
1  Purpose               _    ______________________________        ______
2  Enrolment            _    ______________________________        ______
3  Content authority    _    ______________________________        ______
4  Editorial integrity  _    ______________________________        ______
5  Visual craft         _    ______________________________        ______
6  Motion               _    ______________________________        ______
7  Mobile/low-bandwidth _    ______________________________        ______
8  Accessibility        _    ______________________________        ______
9  Performance          _    ______________________________        ______
10 Technical SEO        _    ______________________________        ______
11 Presence             _    ______________________________        ______
12 Trust/legal/privacy  _    ______________________________        ______
13 Monetisation         _    ______________________________        ______
14 Measurement/ops      _    ______________________________        ______
15 Signature            _    ______________________________        ______

Gates red:              _    Which, and why:
Three decisions this month:
1. ____________________________  owner: ______
2. ____________________________  owner: ______
3. ____________________________  owner: ______
Score changed because (one sentence, evidence-based): ___________________
```

---

## 6. The single question

If the score, the gates and the evidence are ever in conflict, ask the one question the whole plan exists to serve:

> **Would a nervous beginner on a 3G phone in Rumuola trust this site enough to walk into 24 Ebony Road?**

When the answer is yes — and it is provably yes, with evidence anyone could re-check — the site is a masterpiece. Not before, and not because it looks impressive.
