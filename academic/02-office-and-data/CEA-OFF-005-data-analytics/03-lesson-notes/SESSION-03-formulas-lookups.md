# CEA Lesson Note — CEA-OFF-005 · Session 3: Formulas & Lookups

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-OFF-005-S3       |
| Version     | 1.0 · Session 3 of 8 · Week 2 |
| Status      | Draft — pending pilot         |

## 0–10 · Review & warm-up

The cleaning logs from S2 get a 30-second pair share; two volunteers read their weirdest fix aloud.

## 10–25 · Teaching block

**Conditional logic.** `IF(test, then, else)`; nested IF (use sparingly; IFS where available);
`AND`/`OR` for combined tests; `IFERROR` to present graceful output instead of #VALUE!.

**Lookups.** `XLOOKUP(lookup, lookup_range, return_range, [if_not_found])` (Excel 365 / Sheets);
`VLOOKUP(value, table, col_index, FALSE)` where XLOOKUP is unavailable. Horizontal: `HLOOKUP` (rare)
or `INDEX`/`MATCH` — the professional classic: `=INDEX(return, MATCH(key, key_col, 0))`.

**Date & text handling.** `TODAY()`, `EOMONTH`, `DATEDIF` (age in years), `YEAR()`, `MONTH()`,
text: `LEFT`/`RIGHT`/`MID`, `FIND`, `&` concatenation, `TEXT(value,"DD/MM/YYYY")`.

**Combining datasets.** Enrichment table (products + prices) onto a transaction table via lookup on
SKU — merge keys must match in type (text vs number trap again; standardise both with `TEXT()`).

## 25–45 · Guided demonstration

`grace-transactions-2025.xlsx`: add Unit price from `products.xlsx` via XLOOKUP (with IFNA fallback
"MISSING SKU"); compute line totals; `AGE IN YEARS` for patients in the clinic sheet via DATEDIF;
age band via nested IF; error notes where SKU missing.

## 45–70 · Guided practice

Pairs: join `outlet-staff.csv` to `sales-may.xlsx` via staff ID — pick lookup type, justify, build,
deliberately break it (wrong range) and fix. Report rows enriched and rows still missing (expected: 4).

## 70–95 · Independent practice

Solo: build **Grace Stores margin sheet** — cost from products, selling price from markup %, margin
per line, flag margin < 18% with conditional formatting and a note column. File to workbook (feeds A1).

## 95–110 · Correction & check

KC3: (1) XLOOKUP vs VLOOKUP — two reasons. (2) What does TRUE/FALSE mean as VLOOKUP's last argument?
(3) What does IFERROR do? (4) MATCH(value, range, 0) — what is 0? (5) Why must merge keys share a type?
Self-mark.

## 110–120 · Summary & next session

Lookups are the analyst's spanner. Next: pivot tables — 80% of "insights" in the real world, delivered
in ten minutes once data is clean.

## Answers — KC3

1. XLOOKUP: any direction, no column index counting, native if_not_found; VLOOKUP only right-looking,
   fragile to inserted columns. 2) FALSE = exact match (range_lookup off). 3) Substitutes a fallback
   for any error from the inner formula. 4) Exact match. 5) Lookup fails on 7 vs "7" — type mismatch
   returns not-found even for visually identical values.

## Homework (25 min)

Finish margin sheet; list to yourself three questions the merged data can now answer.
