# CEA Lesson Note — CEA-WEB-002 · Session 4: CSS Layout

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-002-S4       |
| Version     | 1.0 · Session 4 of 8 · Week 2 |

## 0–10 · Review & warm-up

Printouts hung — the "cramped vs breathing" verdict is 10/10 obvious.

## 10–25 · Teaching block

**Display.** block (full line) / inline (words) / inline-block / none. 90% of "why won't it sit right" is this.
**Flexbox ladder.** Container: `display:flex; gap; justify-content; align-items; flex-wrap`.
Items: `flex: 1` = grow equally · width % · margin:auto pushes to edges.
**The holy trio.** Navbar (`space-between`: logo left, links right) · 3-up cards (`wrap` + `min-width: 260px`) · Footer (centered column on mobile).
**Reusable classes.** `.container { max-width:1200px; margin:auto; padding:0 1rem }` `.btn` `.card` `.section` — consistent spacing scale (8/16/24/48) beats eyeballing.
**Positioning (light touch).** relative/absolute/fixed for the sticky CTA WhatsApp bubble — that's all we bless today.

## 25–45 · Guided demonstration

Live (projector): restructure Mrs. Obi's page — container, flex navbar, hero as 60/40 flex row, services as 3-card flex wrap, WhatsApp bubble fixed bottom-right; break it on purpose (remove gap) → room spots asymmetry; fix.

## 45–70 · Guided practice

Pairs: convert last session's styled homepage to full flex layout — navbar, hero row, 3 cards, footer; `.container` applied; verify at 320px width in devtools.

## 70–95 · Independent practice

Solo: **layout-locked page** — every section flexed; spacing scale used once deliberately (`margin-block: 48px` on hero); works at 320px & 1280px. Screenshot both widths to workbook.

## 95–110 · Correction & check

KC4: (1) justify vs align one-liner each. (2) flex:1 means. (3) flex-wrap saves us from. (4) .container recipe. (5) fixed positioning use-case.

## 110–120 · Summary & next session

You now have a toolkit; next we assemble the full business site. S5: hero, services, gallery, contact — the greatest hits.

## Answers — KC4

1. justify = main axis spread; align = cross-axis centering. 2) Grow to fill equal share. 3) Overflow off tiny screens. 4) max-width + auto margins + side padding. 5) Sticky CTA bubble; rare is fine.

## Homework

Find one site where the whitespace teaches — bring its screenshot to S5.
