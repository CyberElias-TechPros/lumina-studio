# CEA Lesson Note — CEA-WEB-002 · Session 3: CSS Fundamentals

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-002-S3       |
| Version     | 1.0 · Session 3 of 8 · Week 2 |

## 0–10 · Review & warm-up

Colour screenshots compared — "red means danger AND CTA today"; agree: CTA-red is fine, body-text-red is not.

## 10–25 · Teaching block

**How CSS attaches.** Inline (never) · `<style>` head (ok) · external `.css` file (always). `link rel=stylesheet` in head.
**Selectors ladder.** Element (`h1`) → class (`.card` — the workhorse) → id (`#contact` — one per page, JS hooks). Specificity war stories: `.nav a` beats `a`; never reach for `!important` — it's the sledgehammer sold as aspirin.
**The box model.** content → padding → border → margin. `box-sizing: border-box` globally, forever, no exceptions — it makes width mean width.
**Type & colour.** System font stack ("Segoe UI", Roboto…) or Google Fonts one family max; two weights; 16px base; line-height 1.5; one CTA accent colour; 60-30-10 rule; contrast ≥ 4.5:1.
**Backgrounds & borders.** Solid brand colour · subtle two-stop gradient · border-radius 8px cards · box-shadow tiny — restraint reads expensive.

## 25–45 · Guided demonstration

Live: attach external stylesheet to Mrs. Obi's page → set body font/max-width/margin auto → colour the h1 → cards with padding+radius+shadow → emergency contrast fix (grey text on white fails at 12px — bump to #444).

## 45–70 · Guided practice

Pairs: style their homepage skeleton — global font + measure, CTA button in brand colour, card styling for three services; class literally cannot skip the 4.5:1 check (contrast checker projected).

## 70–95 · Independent practice

Solo: **brand trio** — 60-30-10 palette + two-size type scale applied page-wide; button hover state; all contrasts pass. Screenshot to workbook.

## 95–110 · Correction & check

KC3: (1) border-box why. (2) Specificity order. (3) 60-30-10. (4) 4.5:1 for what. (5) Why external CSS.

## 110–120 · Summary & next session

Colours by law, layout next. S4: flexbox — the end of float-hacks.

## Answers — KC3

1. Width includes padding/border — math you can trust. 2) class > element; id > class; !important > everything (don't). 3) 60% base, 30% secondary, 10% accent. 4) Text-to-background contrast for readability incl. low-vision users. 5) Cache one file for all pages; edit once.

## Homework

Print tonight's page at 100% zoom — margins must breathe; bring the printout.
