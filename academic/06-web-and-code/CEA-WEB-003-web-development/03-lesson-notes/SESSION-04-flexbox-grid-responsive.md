# CEA Lesson Note — CEA-WEB-003 · Session 4: Flexbox, Grid & Responsive Layout

| Field       | Value                          |
| ----------- | ------------------------------ |
| Document ID | CEA-ACA-NOTE-WEB-003-S4        |
| Version     | 1.0 · Session 4 of 12 · Week 2 |

## 0–10 · Review & warm-up

Calm-type screenshots presented — room guesses the technique before the owner speaks; usually contrast + measure.

## 10–25 · Teaching block

**Flexbox for 1-D.** Rows/columns; `justify-content` (main) · `align-items` (cross) · `gap` · `flex-wrap` · `flex:1` distribution. Navbar = `space-between`; cards = wrap + min-width; footer = centered column.
**Grid for 2-D.** `display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap` — the gallery/dashboard killer; `grid-template-areas` for page skeletons.
**Responsive law.** Mobile-first, `min-width` queries at 600/900px; fluid images; touch ≥44px; container queries awareness.
**Transitions (light).** `transition: transform .2s` on hover lifts and focus states — motion with restraint.

## 25–45 · Guided demonstration

Live: project skeleton page — header flex · services `auto-fit` grid · contact 60/40 → stack < 900px · hover lift on cards; devtools toggles device toolbar 320→1280; room votes the ugliest width and we fix it.

## 45–70 · Guided practice

Pairs: rebuild project layout grid+flex; screenshots at 320/768/1200; peer tests keyboard focus visible on every interactive element.

## 70–95 · Independent practice (Project milestone)

Solo: **responsive two-way wireframe built** — mobile & desktop parity; no horizontal scroll at 320; images fluid; transitions on 2 elements. Screenshots to workbook.

## 95–110 · Correction & check

KC4: (1) flex main vs cross. (2) auto-fit minmax recipe. (3) mobile-first why. (4) gap vs margins. (5) transition restraint rule.

## 110–120 · Summary & next session

Layout is structure; structure meets logic next. S5: JavaScript — the language that makes pages think.

## Answers — KC4

1. justify = axis; align = cross. 2) Responsive columns without queries. 3) Majority traffic is phones; enhance up. 4) gap = spacing between tracks only. 5) 150–250ms transform/opacity — nothing that delays input.

## Homework

Write on paper: "three things my page must remember between visits" — S5 meets events.
