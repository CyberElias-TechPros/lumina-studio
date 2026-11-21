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

## 2. App-Wide Signature Craft Implemented

1. **5 Course-Family & Tool-Track Editorial Tokens (`src/lib/course-families.ts`):**
   - Consistent colour-coded top accent stripes and WCAG-accessible pills (paired with family labels + icons, never colour alone) across `Office & Data` (Amber), `Creative & Media` (Rose), `Web & Code` (Teal), `Hardware & Security` (Slate), and `Business & Freelance` (Emerald) on **`/`**, **`/classes`**, **`/classes/[courseSlug]`**, and **`/tools`**.
2. **"The Four Things" Interactive Hardware Blueprint (`src/components/marketing/four-things-diagram.tsx`):**
   - Bespoke two-colour SVG line diagram (`Monitor · System Unit · Keyboard · Mouse`) on `.cea-blueprint-grid` drafting paper, with interactive tab/hover inspection and Port Harcourt classroom notes deployed on **`/`** and **`/practice/computer-basics`**.
3. **The Printed Fee Receipt & A4 Print Stylesheet (`src/components/marketing/fee-receipt.tsx` + `src/styles.css`):**
   - Thermal/stationery perforated paper receipt (`RC 8413776 · 24 Ebony Road, PH`, itemized tabular figures, dashed rule, `"NO HIDDEN FEES"` badge, and one-click **"Print 1-page guide"**) paired with `@media print` A4 flyer styles on **every `/classes/[courseSlug]` page** and showcased on **`/`**.
4. **Lesson Reading Spine (`src/components/marketing/reading-spine.tsx`):**
   - Viewport top progress hairline, sticky lesson progress counter (`Lesson XX / 210 · XX% read`), and one-click **"Print notes"** worksheet button across all **210 `/blog/[slug]` lessons**.
5. **Authenticated Portal Polish (`src/components/app/app-shell.tsx`):**
   - Replaced emoji UI icons (`🔒`) with crisp `lucide-react` vector icons and raised sidebar micro-labels to readable `12px`.
