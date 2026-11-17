# CEA Lesson Note — CEA-WEB-002 · Session 7: Quality — UX, Accessibility & SEO

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-002-S7       |
| Version     | 1.0 · Session 7 of 8 · Week 4 |

## 0–10 · Review & warm-up

Google-search results read aloud for fictional businesses — some show nothing; class agrees: today moves the dial for free.

## 10–25 · Teaching block

**UX basics.** Scan-readable (F-pattern) · one job per screen · CTA above the fold · words: plain Nigerian-English-friendly — "Book a visit" beats "Leverage our concierge ecosystem" · error messages say what + how to fix.
**Accessibility fundamentals.** Semantic HTML = free a11y · alt text · label/for · focus-visible outlines (NEVER remove without replacement) · contrast 4.5:1 · skip-link for keyboard users · `prefers-reduced-motion` awareness.
**SEO fundamentals.** `<title>` unique per page (business + service + city) · meta description 150 chars · one h1 · descriptive filenames (`aso-ebi-lace.jpg` not `IMG_4021.jpg`) · compress images (<200KB hero) · free tools: Google Search Console + Business Profile.
**Image optimisation.** Compress (squoosh-class) · WebP/JPEG quality 75–80 · dimensions match display size · lazy-loading for below-fold galleries.
**Testing.** W3C validator · Lighthouse (aim ≥80 on mobile before launch) · keyboard-only navigation trial · phone glare test.

## 25–45 · Guided demonstration

Live (projector): Lighthouse before (mobile score 54 — red) → compress hero (1.8MB→180KB) + alt text + title/meta → re-run (84 — green) — the single most persuasive demo of the course; keyboard Tab-through the contact form shown aloud.

## 45–70 · Guided practice

Pairs: Lighthouse run + fix top three findings on their sites; add title/meta/alt to all pages; note score before/after in workbook; Tab-test the form together.

## 70–95 · Independent practice

Solo: **quality pass** — Lighthouse ≥80 on your homepage; title+meta+alt everywhere; image weight audit; three a11y wins applied (focus styles, labels, skip-link optional). Screenshot Lighthouse result to workbook.

## 95–110 · Correction & check

KC7: (1) Title formula. (2) Meta description length + purpose. (3) 4.5:1 covers whom. (4) Hero image weight target. (5) Never-do-with-outline rule.

## 110–120 · Summary & next session

You have a site machines and humans both love; tomorrow the whole internet sees it. S8: launch.

## Answers — KC7

1. Business + service + city. 2) ~150 chars — the pitch under your title in search results. 3) Low-vision users incl. sunlight on phone screens. 4) ≤200KB. 5) Never remove focus indicator without a visible replacement.

## Homework

Create a free Netlify/GitHub account — S8 deploys with it tonight.
