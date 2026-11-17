# CEA Lesson Note — CEA-WEB-003 · Session 3: CSS Box Model & Typography

| Field       | Value                          |
| ----------- | ------------------------------ |
| Document ID | CEA-ACA-NOTE-WEB-003-S3        |
| Version     | 1.0 · Session 3 of 12 · Week 2 |

## 0–10 · Review & warm-up

Wireframe swap; partners annotate "this gap is margin or padding?" — the eternal confusion, answered.

## 10–25 · Teaching block

**The box, memorised.** content → padding (inside, brand-coloured breathing room) → border (the frame) → margin (outside, neighbour distance). `box-sizing:border-box` ONCE globally.
**Selectors with manners.** class-first architecture · descendant sparingly · specificity ladder (element < class < id) · the `!important` confession booth — avoid.
**Type that reads.** One family (system or two-weight Google) · 16px base · line-length 45–75ch · line-height 1.5 · h-scale ~1.25 · never justify body text on narrow screens.
**Colour discipline.** Variables: `--brand`, `--ink`, `--paper`, `--cta`; 60-30-10; contrast ≥4.5:1 body, ≥3:1 large type.

## 25–45 · Guided demonstration

Live: style the S2 project — container 1100px, brand vars, h-scale, body 1.125rem/1.6, cta button + hover + focus-visible — devtools box-model panel overlay shown per element; class toggles padding vs margin visibly.

## 45–70 · Guided practice

Pairs: apply the type scale + colour variables to the project; swap machines; partner inspects ONE element's box model in devtools and reports its computed padding — accountability exercise.

## 70–95 · Independent practice

Solo: **style foundation locked** — vars, container, h1–h3 scale, button, link style, focus-visible; contrast audit passes AA for body text. Screenshot to workbook.

## 95–110 · Correction & check

KC3: (1) margin vs padding. (2) border-box. (3) specificity ladder. (4) 45–75ch why. (5) CSS variables benefit.

## 110–120 · Summary & next session

The box is mastered — next it flexes. S4: flexbox, grid, and the end of float hacks.

## Answers — KC3

1. padding = inside the box; margin = outside it. 2) Width/height include padding+border — sane math. 3) element < class < id (!important = last resort). 4) Reading comfort/speed on long lines. 5) One edit re-skins the site; dark-mode teaser.

## Homework

Screenshot one site whose type makes you calm — annotate why (line-length? contrast?).
