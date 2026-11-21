# CEA Editorial Standard, GSC Opportunity Plan & Design Skills Assessment

**Date:** 2026-11-21  
**Branch:** `arena/d7714903-lumina-studio`

---

## 1. Address Verification (`24 Ebony Road` vs `26 Ebony Road`)

Verified across the entire repository (`grep -rn "Ebony Road" src/ scripts/ public/`):
- **Every source file in `src/` uses `24 Ebony Road`** (`0` hits for `26 Ebony` in `src/`).
- Per `docs/automation-package-reconciliation.md` and `docs/cea-cinematic-redesign-blueprint-2026-11.md`, **24 Ebony Road, Off Rumuola Road, Port Harcourt** was confirmed twice by the owner from utility bills (17 October and 12 November 2026). Earlier physical signage carried `26`, which caused confusion in external reviews — keep `24 Ebony Road` canonical across all web, schema, GBP, and admissions copy, and update physical signage separately if needed.

---

## 2. CEA Learning Publication Standard (CEA-LPS) — Implemented in Code

Rather than keeping CEA-LPS purely on paper, the core structure is now wired directly into `src/data/editorial/publication-standard.ts`, `/blog`, `/blog/[slug]`, `/editorial`, and `scripts/validate-lessons.mjs`:

| Component | Implementation |
|---|---|
| **12 Subject Categories** | `CEA_CATEGORIES` in `src/data/editorial/publication-standard.ts`, filterable on `/blog` (`?category=...`) |
| **12 Article Types** | `CEA_ARTICLE_TYPES` (`Practical Tutorial`, `Explainer`, `Reference / Cheat Sheet`, `Troubleshooting Guide`, `Comparison`, `Workshop`, `News`, `Editorial`, `Checklist`, `Practice`, `Career Guide`, `Resource Collection`) |
| **5 Difficulty Levels** | `Beginner`, `Basic`, `Intermediate`, `Advanced`, `Expert` |
| **Public vs Internal Status** | **Fixed live leak:** `/blog/[slug]` no longer prints past-due `"Review due 27 October 2026"` on public pages; internal `needs-review` stays in `validate-lessons.mjs` while public pages display `Published`, `Updated & Reviewed`, or `Active · Periodic Review` |
| **Master Article Anatomy** | `src/routes/blog.$slug.tsx` now renders category/difficulty/type pills, optional **"What you will learn"** objectives, auto-generated **"In this lesson"** Table of Contents (`>=3` headings), responsive `table` blocks, contextual **CEA Lab** practice links (`/tools/*`), and enriched `Article` JSON-LD (`articleSection`, `educationalLevel`, `learningResourceType`) |
| **100-Point Quality Rubric** | `scoreLessonQuality()` in `src/data/editorial/publication-standard.ts`, evaluated across all 210 lessons during `npm run validate:lessons` |

---

## 3. Google Search Console (GSC) Performance Diagnosis & Implemented Fixes

### Why High-Ranking Pages Had 0% CTR
CEA already ranks on **Page 1 (#1–#10)** for dozens of high-intent queries, yet almost all clicks went exclusively to `wootlab.ng/idicebpo` (`1,210` combined impressions, `59` clicks). Why? Because poetic/internal chapter titles (e.g., *"Zero trust: the gate that trusts nobody"*, *"The vulnerability assessment: checking the fence"*, *"What KB, MB and GB actually mean"*) did not echo the searcher's exact question in the Google `<title>` and `<meta description>`.

### Implemented Immediate Wins (Without Altering Natural On-Page H1 Voice)
Added optional `seoTitle`, `seoDescription`, `learningObjectives`, and structured `table` comparison blocks (`src/data/blog.ts` + `src/lib/next-compat/metadata.ts`):

| GSC Query Cluster | Impressions / Pos (GSC) | Target CEA Route | Implemented Upgrade |
|---|---|---|---|
| `what is zero trust security` | 189 imp · pos 4.13 · 0 clicks | `/blog/zero-trust-gate` | `seoTitle`: *"What Is Zero Trust Security? Principles, 3 Checks & Examples"* + learning objectives |
| `vulnerability assessment` | 172 imp · pos 2.04 · 0 clicks | `/blog/vulnerability-assessment-fence` | `seoTitle`: *"What Is a Vulnerability Assessment? Steps, Severity Scores & Report"* |
| `soc room` | 105 imp · pos 17.26 · 0 clicks | `/blog/the-soc-room` | `seoTitle`: *"What Is a SOC Room? Security Operations Centre Tiers & Shift Guide"* |
| `what is a digital signature` | 35 imp · pos 3.91 · 0 clicks | `/blog/digital-signature-meaning` | `seoTitle`: *"What Is a Digital Signature? How It Works vs a Scanned Signature"* |
| `agile methodology` / `devops practices` | 60 imp · pos 4.3–10.6 · 0 clicks | `/blog/agile-and-devops` | `seoTitle`: *"Agile Methodology & DevOps Practices Explained in Plain English"* |
| `siem meaning` | 30 imp · pos 14.67 · 0 clicks | `/blog/siem-in-ordinary-words` | `seoTitle`: *"SIEM Meaning in Cybersecurity: How Log Collection & Alerts Work"* |
| `what are 5 careers in cyber security?` | 30 imp · pos 6.0 · 0 clicks | `/blog/the-cybersecurity-analyst-at-work` | Added explicit **5-career comparison table** + targeted `seoTitle` |
| `kb / mb / gb` cluster (`which is bigger mb or kb on phones`, `difference between kb mb and gb`, `megabyte data`) | ~150+ imp · pos 7–16 · 0 clicks | `/blog/kilobytes-and-megabytes` & `/blog/what-a-megabyte-is` | Added clear **"GB > MB > KB" answer lead + KB/MB/GB/TB conversion table** + targeted `seoTitle` |
| `how to type naira sign on keyboard on laptop` | 40 imp · pos 6.25 · 0 clicks | `/blog/naira-and-accents` | Added **Windows / Word (`20A6`+`Alt+X`) / Mobile shortcut table** + targeted `seoTitle` |
| `what does accept all cookies mean` / `accept all` | 45+ imp · pos 8.3–31 | `/blog/cookies-and-accept-all` | Query-matched `seoTitle` & `seoDescription` |
| `cloud` / `what is the cloud` / `how to use the cloud` | 60+ imp · pos 9–35 | `/blog/the-cloud-in-ordinary-words` | Query-matched `seoTitle` & `seoDescription` |
| `how to book for a flight online` | 20 imp · pos 3.0 | `/blog/booking-a-flight-online` | Query-matched `seoTitle` & `seoDescription` |
| `signature at the bottom of email` | 30+ imp · pos 5.5 | `/blog/an-email-signature` | Query-matched `seoTitle` & `seoDescription` |
| `undo ctrl z redo` / `how do i undo` | 20+ imp · pos 1–15 | `/blog/undo-and-redo` | Query-matched `seoTitle` & `seoDescription` |
| `it courses list and fees` | 40 imp · pos 5.25 · 0 clicks | `/classes` | `title`: *"IT Courses List & Fees in Nigeria (₦20,000–₦50,000) — Digital Skills"* |
| `color palette generator and contrast checker` | 20 imp · pos 1.0 · 0 clicks | `/tools/color-contrast` | `title`: *"Free Color Palette Generator & WCAG Contrast Checker"* |
| `wootlab.ng/idicebpo` | 1,210 imp · pos 6.09 · 59 clicks | `/opportunities/idice-skills-to-jobs` | Converted FAQ Radix `Accordion` to SSR `<details>` so all 7 answers index cleanly |

### Next GSC Content Opportunities (Phase 2)
1. **Dedicated guides for high-volume non-lesson queries:** `switch and router` (pos 9), `canva interface` (pos 7), `small business cybersecurity` (pos 5), `how to build mobile app in nigeria` (pos 86 — currently weak match), `data entry` (pos 9.5), and `owasp meaning in cyber security` (pos 9).
2. **Capture typing-test search intent (`hold the j key while typing this lesson`, `hold the f key`):** Add dedicated beginner home-row (`F`/`J` bump) guided drills on `/tools/typing-test` so learners searching home-row lessons convert straight into interactive practice.
3. **Internal linking from iDICE (`wootlab.ng/idicebpo`):** Since `/opportunities/idice-skills-to-jobs` is CEA's top traffic magnet, ensure its next-step links cleanly route South-South applicants into `/tools/assess`, `/tools/typing-test`, `/blog`, and `/classes`.

---

## 4. Assessment of Design & Marketing Skills Repositories

Checked live on GitHub via `gh api`:

| Repository | Stars | Licence | What It Actually Is | How CEA Should Use It |
|---|---:|---|---|---|
| `nextlevelbuilder/ui-ux-pro-max-skill` | 152,474 | **MIT** | AI design-intelligence skill + curated CSV datasets (`colors.csv`, `typography.csv`, `ux-guidelines.csv`, `ui-reasoning.csv`, `react-performance.csv`, `charts.csv`) | **Adopt patterns & MIT datasets:** Use `ux-guidelines.csv` & `colors.csv` as reference checklists for CEA's frontend polish, and optionally power a **Wave 2 Student UI/UX Palette & Typography Inspector** inside `/tools/color-contrast` |
| `coreyhaines31/marketingskills` | 61,862 | **MIT** | AI marketing/CRO/SEO skill library (`seo-audit`, `copywriting`, `copy-editing`, `cro`, `schema`, `site-architecture`, `ai-seo`) | **Adopt methodology:** Matches the exact SERP snippet / CTR optimization and CRO clarity fixes applied above to `/classes`, `/tools/color-contrast`, and `/blog/*` |
| `ComposioHQ/awesome-claude-skills` | 80,004 | No repo SPDX | Curated directory of Claude agent skills | **Reference index only** — review individual skill licences before copying anything |
| `quemsah/awesome-claude-plugins` | 1,657 | No repo SPDX | Automated star/adoption tracker for Claude Code plugins | **Reference leaderboard only** (`taste-skill`, `hallmark`, `Superpowers`) |
| `alchaincyf/huashu-design` & `zanwei/design-dna` | — | Check repo | Prompt-driven HTML/Design-DNA extraction skills for AI coding agents | **Workflow tools, not student labs:** Useful when designing new CEA landing/course pages; do not embed directly as student tools |

**Key Architectural Distinction:** These repositories are **coding-agent skill prompts & design-system datasets** (improving how *we* design and write `cea.ng`), not drop-in student software libraries like `sql.js` or `CodeMirror`. Using `ui-ux-pro-max-skill` (MIT) and `marketingskills` (MIT) to audit scannability, TOC navigation, accessible tables, contrast ratios, and high-CTR meta snippets delivers immediate product value on `cea.ng`.
