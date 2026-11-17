# CEA Lesson Note — CEA-OFF-005 · Session 5: Choosing & Building Charts

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-OFF-005-S5       |
| Version     | 1.0 · Session 5 of 8 · Week 3 |
| Status      | Draft — pending pilot         |

## 0–10 · Review & warm-up

Show two projected charts of the same data — one honest, one stretched axis (restart at 37, not 0).
Vote which CEO would love which. Debrief: axis starts matter.

## 10–25 · Teaching block

**Pick the chart for the comparison.** Part-of-whole → stacked bar/pie (pie ≤ 6 slices, start at 12)
· change over time → line (bar if few periods) · ranking/magnitude → sorted bar · distribution →
histogram · correlation → scatter with honesty (correlation ≠ causation) · geography → map only with
a real base map. If unsure: bar. Bars never lie about magnitude.

**Chart hygiene.** Title states the insight ("June dip driven by SKU G-114"), axis starts at 0 for
bars (never truncated), labels readable, one accent colour, gridlines minimal, no 3-D, no chartjunk,
data labels only when they help, legend where colours appear, caption with source line & date.

**What misleads.** Truncated axes, dual axes with opposite directions, cherry-picked windows,
cumulative lines hiding variance, pie explosions, mixed-unit bars, "averages" without n.
Class drill: you will spot all of these today.

## 25–45 · Guided demonstration

Instructor builds the honest trio from S4 pivots: line (monthly revenue), sorted bar (top SKUs), pie
(payment share ≤6) — then edits each for insight-title + zero-baseline bar + source line; screenshots
go into a "chart shelf" as models.

## 45–70 · Guided practice

Pairs chart each other's A1 pivots; swap and "red-team" with the misleading-chart checklist — must
catch ≥2 flaws per chart; revise. Instructor circulates scoring honesty, not beauty.

## 70–95 · Independent practice

Solo: design the **four panels** of your future dashboard (which chart, which pivot, what insight as
title, which slicer applies) on the dashboard-planning sheet (practice file). No build yet.

## 95–110 · Correction & check

KC5: (1) Chart for change over time. (2) Pie chart max slices rule. (3) Why do bar axes start at 0?
(4) Best chart for two-variable correlation. (5) Name three chart-lying techniques.

## 110–120 · Summary & next session

Charts are arguments. Next: the interactive dashboard — slicers, conditional formatting, speed.

## Answers — KC5

1. Line (bar if few periods). 2) Six, start at 12 o'clock, explode nothing. 3) Bars encode value by
   length — truncated axis inflates trivial differences. 4) Scatter (with r and caution note). 5) Truncated
   axis / dual axis / cherry-picked window / cumulative hiding variance / no-n averaging.

## Homework

Print your panel plan; bring to S6.
