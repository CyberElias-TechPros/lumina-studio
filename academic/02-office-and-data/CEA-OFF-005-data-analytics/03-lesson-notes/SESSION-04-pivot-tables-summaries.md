# CEA Lesson Note — CEA-OFF-005 · Session 4: Pivot Tables & Summaries

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-OFF-005-S4       |
| Version     | 1.0 · Session 4 of 8 · Week 2 |
| Status      | Draft — pending pilot         |

## 0–10 · Review & warm-up

Two volunteers describe what their merged margin sheet revealed about Grace Stores (>18% flagged? which line?).

## 10–25 · Teaching block

**Pivot tables** summarise millions of rows in seconds: drag field → Rows (categories), Values
(Σ/Count/Avg), Columns (split), Filters (slice a subset). Right-click → Group (dates by month/quarter,
numbers into bands), Value Field Settings (Sum/Count/Avg/Max/Min + % of column/row/grand total).

**Calculated fields/items.** Field: new virtual column from existing (`Margin = [Revenue]-[Cost]`).
Item: new row/column computed from existing buckets (advanced — demo only, then practise basics).

**Summary statistics, honestly.** Mean vs median (skewed income-like distributions), mode for counts;
counts vs sums ("average basket ₦4,200 across 380 transactions, median ₦1,950 — many small baskets,
a few bulk buyers"); always report n.

**Reading a pivot out loud.** Template: "Across [n] records in [period], [top finding], [second
finding], [what's missing]." Practice until automatic — S7 needs it.

## 25–45 · Guided demonstration

Live on `grace-sales-2025.csv`: pivot — SKU × outlet revenue (rows/cols/values), group dates by month,
% of grand total, top-5 filters, value field → average basket. Instructor narrates every drag.

## 45–70 · Guided practice

Pairs: build (a) monthly revenue by outlet; (b) average transaction value by payment type; (c) count of
transactions by stockout flag. Screenshot each with slicers attached (preview for S6).

## 70–95 · Independent practice

Solo: produce **the A1 summary** — three pivot tables on the cleaned dataset answering the three
questions you wrote at S3 homework + one paragraph of findings each. File to workbook.

## 95–110 · Correction & check

KC4: (1) Rows vs Values vs Filters in a pivot. (2) What does grouping dates buy?
(3) Sum vs Count — which shows number of transactions? (4) Mean vs median — when split apart?
(5) n=12 grouped baskets read as "typical" — what's the lie?

## 110–120 · Summary & next session

Pivots turn data into answers in minutes. Next: charts — honest ones.

## Answers — KC4

1. Rows = categories down the side; Values = aggregations computed in cells; Filters = subset slice.
2. Free aggregation by day/month/quarter/year without helper columns. 3) Count (of records).
3. Skewed distributions — median resists outliers (e.g., salary, basket). 5) Tiny samples
   spread out: one odd month dominates; never quote averages of <~30 without hedging.

## Homework

A1 draft: three pivots + one paragraph each. Print for S5.
