# CEA Lesson Note — CEA-OFF-005 · Session 6: Dashboards

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-OFF-005-S6       |
| Version     | 1.0 · Session 6 of 8 · Week 3 |
| Status      | Draft — pending pilot         |

## 0–10 · Review & warm-up

Panel plans reviewed in pairs: two volunteers get a 30-second room critique each.

## 10–25 · Teaching block

**Dashboard = one-glance answer to a fixed question.** Not a report dump. Design rules: 5–8 panels max,
hierarchy (answer first, detail below), consistent scales, one filter set (slicers) wired to ALL
pivots/charts, no decimals beyond usefulness, title on every panel, "as of ⟨date⟩" caption.

**Building blocks.** PivotCharts linked to pivot tables · slicers (list/date/timeline) ·
conditional formatting (3-icon / colour scale / data bars — sparingly) · INDEX/MATCH KPI cards
(total revenue, vs last month, top outlet) · camera tool/linked picture (advanced; skip if time).

**Speed & refresh.** Data → Tables → pivot from Tables; refresh on open (or a Refresh button);
formulas referencing tables recalc instantly; avoid volatile whole-column references; keep the source
sheet in the same workbook; ≤1 MB unless scope demands.

## 25–45 · Guided demonstration

Instructor builds a live 4-panel Grace Stores dashboard from S5 panels: monthly revenue line, top-5
SKU bar, payment-share pie, KPI cards row; adds outlet slicer + month timeline wired to all charts;
sets conditional format on the "low margin" flag; refreshes; shows freeze-and-print-fit landscape.

## 45–70 · Guided practice

Pairs assemble their own dashboard from their own cleaned data + pivots (may reuse practice file if
theirs isn't ready): 4 panels, ≥1 slicer, ≥1 conditional-formatted cell, insight-titled panels.

## 70–95 · Independent practice

Solo Polish Pass: strip decimals, align edges, uniform fonts, add source-caption, freeze top row,
landscape A4 fit-width, print preview check. Name the file `CEA-OFF-005-<name>-dashboard.xlsx`.

## 95–110 · Correction & check

KC6: (1) What is a dashboard for? (2) How many panels, and why? (3) What does a slicer do?
(4) Why avoid whole-column volatile references? (5) One honesty check every dashboard needs.

## 110–120 · Summary & next session

Dashboards answer one question fast. Next: reading numbers — correlation, causation, sample honesty.

## Answers — KC6

1. Fixed question, one glance, decision-ready. 2) 5–8; cognitive load — beyond that, it's a report not
   a dashboard. 3) Slices every linked pivot/chart simultaneously by category. 4) They recalc the whole
   sheet — seconds turn to minutes; tables self-limit ranges. 5) Every number traceable to a named source
   and n disclosed.

## Homework

Bring your dashboard 95% complete to S7 (polish gap = homework).
