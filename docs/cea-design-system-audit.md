# Designing Cyber Elias Academy (`cea.ng`) Using the UI/UX, Anti-AI-Slop & CRO Skill Repositories

**Date:** 2026-11-21  
**Branch:** `arena/d7714903-lumina-studio`  
**Skill Benchmarks Applied:**
- `nextlevelbuilder/ui-ux-pro-max-skill` (MIT — UX priority rules, contrast/typography minimum floors, touch targets, LMS/education clarity)
- `alchaincyf/huashu-design`, `taste-skill`, `hallmark` (Anti-AI-slop rules: strip generic SaaS aurora/glow orbs, floating glass chips, `01/02/03` eyebrow numbering, diamond marquees, and cliché headlines)
- `zanwei/design-dna` (3-dimension token/style/effects consistency: warm daylight paper + deep navy ink + real classroom photography)
- `coreyhaines31/marketingskills` (`cro` & `copywriting` — 5-second value proposition clarity, specific proof above the fold, zero duplicate CTAs)

---

## 1. Visual Diagnosis: What Needed to Change on `cea.ng`

| Area | Before (Generic AI-SaaS Drift) | After (CEA Daylight Design System) | Skill Rule Applied |
|---|---|---|---|
| **Homepage Hero** | Dark-purple `bg-aurora` + `blur-[120px]` neon orbs + `ShinyText` + vague headline *"The future is built by those who learn to create it."* | Warm paper **Daylight Hero** (`bg-background`), crisp Port Harcourt badge, direct H1 (*"Practical digital skills, taught in person in Port Harcourt"*), and **4-metric proof strip** (`From ₦20,000`, `2–4 weeks`, `210 notes`, `10 labs`) | `huashu-design` + `marketingskills` CRO #1 & #2 |
| **Classroom Photo (`Fig. 01`)** | Two `animate-float backdrop-blur-xl` chips obscuring the left and right edges of the photo | Unobstructed classroom photo (`CampusImg id="lab-1"`) with a clean printed caption bar below | `hallmark` + `docs/masterpiece-design-spec.md` ("Proof beats adjective") |
| **Below-Hero Band** | Decorative diamond-separator marquee (`Microsoft Office ◆ Graphic Design ◆ ...`) | 4 actionable **Visitor Quick Paths** (`Courses & fees`, `Free browser labs`, `210 self-study notes`, `Visit the centre`) | `ui-ux-pro-max` Navigation + `marketingskills` CRO |
| **Section Eyebrows & Labels** | `01 —`, `02 —`, ..., `07 —` numbered pills at `8px–9px` (`text-[8px]` / `text-[9px]`) | Clean subject labels without artificial `01/02` numbering; minimum **`12px` (`text-xs`)** for labels, badges, and metadata | `ui-ux-pro-max` Typography Rule #6 + `huashu-design` |
| **Dark Contrast Band & Footer** | Purple aurora glow (`bg-aurora-soft`) and `#61759a` muted text on `#070d1d` + **two stacked CTA banners** (`cea-cta-finale` + `SiteFooter` finale) | Clean `#0b172a` navy ink surface, `#cddcf2`/`#b8cbe6` WCAG AA+ contrast text, removed redundant `cea-cta-finale` section on `/` | `ui-ux-pro-max` Accessibility Rule #1 + `marketingskills` CTA hierarchy |
| **Homepage FAQs** | Closed Radix `<Accordion>` hid FAQ answers from crawlers in SSR HTML | Semantic SSR `<details>` disclosure rows matching `/faq` & `/opportunities/idice-skills-to-jobs` | `ui-ux-pro-max` + Technical SEO |
| **Header Navigation (`SiteHeader`)** | `/tools` hidden inside the `"More"` dropdown | `"Free labs"` (`/tools`) promoted directly into primary desktop & mobile navigation; removed redundant `animate-ping` dot | `ui-ux-pro-max` Touch & Navigation (`44px+` targets) |

---

## 2. Files Updated in This Design Pass
- `src/routes/index.tsx` — Daylight editorial hero, 4-fact tabular proof strip, 4-card visitor quick paths, unobstructed classroom photography, clean navy ink teaching-loop section, tabular-nums course fee cards, SSR `<details>` FAQ block, and removal of the redundant bottom orbital CTA.
- `src/components/marketing/shell.tsx` — Upgraded `Eyebrow` (`text-xs`, no neon glow shadow), simplified `PageHero`, and accessible high-contrast `CTASection` (no orbital rings or sub-12px `#61759a` text).
- `src/components/marketing/site-header.tsx` — Promoted `"Free labs"` (`/tools`) into primary nav, raised subtitle & tag typography to readable `11px–12px`, and removed `animate-ping` noise.
- `src/components/marketing/site-footer.tsx` — Improved contrast (`#b6c9e4`) and alignment with the non-duplicated CTA hierarchy.
- `src/components/marketing/note-card.tsx` — Raised chapter badge to `text-xs`.

---

## 3. Recommended Next Visual Iteration (Wave 2)
1. **Course-Family Subtle Wayfinding Accent:** Apply the 5 subtle course-family border/badge cues from `docs/masterpiece-design-spec.md` (`Office & Data`, `Creative & Media`, `Web & Code`, `Hardware & Security`, `Business & Freelance`) paired with icons (never colour alone).
2. **Printable A4 Course Sheet (`@media print`):** Add a clean print stylesheet on `/classes/[courseSlug]` so prospective learners can print a 1-page Naira fee receipt + syllabus flyer at any Port Harcourt business centre.
3. **Original Classroom & Device Line Diagrams:** Expand the custom risograph-style line illustrations for `/blog` beginner lessons so the remaining `unknown` image-provenance slots can be replaced cleanly.
