# CEA Instructor Guide — CEA-OFF-005 Data Analytics

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-GUI-OFF-005           |
| Version     | 1.0 · **Instructor use**      |
| Status      | Approved v1.0 — pending pilot |

**Do not distribute.** Keys in Section 7.

## 1. What this course is

End-to-end analytics discipline: clean → join → summarise → chart → decide → communicate. Students
want "dashboards"; make them earn it with cleaning discipline first. Intermediate level — the room
knows OFF-002 basics; watch for shaky formulas and re-teach INDEX/MATCH slowly once.

## 2. Preparation

Datasets versioned per term: `grace-dump-1200.csv`, `grace-transactions-2025.xlsx`, `hospital-no-shows.csv`,
`products.xlsx`, `outlet-staff.csv`, `sales-may.xlsx`, dashboard plan sheet. Printer for one-pagers
(S7–S8). Stopwatch for presentations.

## 3. Delivery model

105 min: 0–10 hook · 10–25 teach · 25–45 demo · 45–70 guided · 70–95 build/solo · 95–110 KC · 110–120 close.
Demos live with deliberate errors shown and fixed.

## 4. Failure points

- S2: students delete first, think later — enforce count-before/after counters on screen; undo saves.
- S3: merge-key type mismatch ("7" vs 7) — make the "identical values, not identical types" line explicit.
- S5: chartjunk seduction — spend the time; it pays in S6/S8.
- S7: causation leakage — the word "caused" in a note = automatic note rewrite; coached phrasing: "associated with", "consistent with".
- S8: manager-role softballing — press the three questions; award the gate only on P-gate criteria.

## 5. Assessment guidance

A1: cleaned dataset + three pivots, marks on correctness (spot formulas) and the cleaning log.
Final: observed dashboard gate (live slicers, no hardcoded numbers, insight titles) + presentation + note.
Show-and-tell judged on the "acted on it?" question.

## 6. Equity & access

Colour-safe conditional formats (icons not hue alone). Print-large datasets for low-vision. All files offline.

## 7. Knowledge-check keys

KC1: 1) 1 row/record, 1 col/variable, real types. 2) Any 2: banners, text-numbers, spacer rows, units-in-cells, mixed locales. 3) Text export from source apps; leading-zero IDs. 4) What one row represents. 5) Phones, zeroed IDs, postal codes.
KC2: 1) Inner double spaces. 2) See what you delete; choose keys consciously. 3) AVERAGE ignores blanks (zeros poison); blanks hide. 4) Non-printables (tabs, line breaks from imports). 5) 11 digits / text type / digits-only (any 2).
KC3: 1) Direction-any, no column index, native not-found handling. 2) FALSE = exact match. 3) Fallback for inner-formula errors. 4) Exact match. 5) "7" ≠ 7 to lookup functions.
KC4: 1) Rows=categories; Values=aggregations; Filters=subset. 2) Month/quarter/year grouping without helper columns. 3) Count. 4) Skewed distributions (basket, salary). 5) Tiny n dominates the average; hedge or drop.
KC5: 1) Line. 2) Six max, start at 12, no explosion. 3) Bars encode value by length. 4) Scatter. 5) Truncated axis / dual axis / cherry-pick window / no n / cumulative hiding variance.
KC6: 1) One fixed question, one glance, decision-ready. 2) 5–8; beyond = report, not dashboard. 3) Slices all linked pivots/charts at once. 4) They recalc the sheet — seconds to minutes; use Tables. 5) n disclosed beside every stat; sources named.
KC7: 1) Co-movement only. 2) E.g., weekend footfall. 3) n<30 descriptive only + hedge. 4) Percent without base misleads. 5) Question · data & n · findings · action (owner/date) · limitation · confidence.
KC8: 1) Decision hook with the number. 2) Unowned undated actions don't happen. 3) Cost / source / n. 4) Any number pre-decision. 5) Limitations + honest confidence.

## 8. Expected outputs & calibration

S2: every pair produces count-before/after evidence. S4: three pivots screenshotted for A1. S6:
print-preview landscape fit verified by instructor signature. S8: P-gate absolute; two-assessor agree.

## 9. Rubric (0–4)

0 cannot · 1 heavy prompts · 2 completes with errors · 3 unaided correct · 4 unaided correct + explains.
Gate: P-gate absolute.
