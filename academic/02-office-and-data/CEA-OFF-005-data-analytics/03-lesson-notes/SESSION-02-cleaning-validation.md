# CEA Lesson Note — CEA-OFF-005 · Session 2: Cleaning & Validation

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-OFF-005-S2       |
| Version     | 1.0 · Session 2 of 8 · Week 1 |
| Status      | Approved v1.0 — pending pilot |

## 0–10 · Review & warm-up

Three volunteers read their home-spreadsheet faults aloud; room confirms or sharpens each diagnosis.

## 10–25 · Teaching block

**Text functions.** `TRIM` (strip trailing/leading/double spaces), `CLEAN` (remove non-printables),
`PROPER` (Title Case names), `UPPER` (uniform keys), `LOWER` (email keys). Chain: `=PROPER(TRIM(CLEAN(A2)))`.

**Numbers & coercion.** Text-numbers that look numeric: `VALUE()` or multiply by 1; thousands
separators, stray currency signs: Find & Replace all `₦`, `,` — careful with genuine commas.

**Duplicates.** Data ▸ Remove Duplicates (choose key columns). Before deleting: count — `=A2=A1` under
sort, or conditional formatting duplicates. Deleting 400 real duplicates of different rows is the
classic weekend-shame.

**Missing values.** Blanks vs 0 vs "N/A" vs "?" — pick one sentinel; document it. Blanks break AVERAGE
silently (averages ignore blanks; zeros poison means). For categorical: "UNKNOWN" beats gaps.

**Validation rules.** Required · format (date exists, email has @, phone 11 digits) · range (0–120
age) · list (state from the 36+FCT). Excel Data ▸ Validation with a clear error message beats silent
bad data.

## 25–45 · Guided demonstration

Live-clean `grace-dump-1200.csv`: TRIM+PROPER chain column; `₦` wipe via replace; locale-uniform dates
(`DATEVALUE` audit); duplicate count before/after (screen counter); missing-value audit with
`COUNTBLANK`; set three validation rules. Instructor narrates judgement calls.

## 45–70 · Guided practice

Pairs clean their own copy in parallel; instructor circulates with a checklist: texts trimmed, names
proper-case, dates ISO-ish, duplicates counted, blanks mapped. Checkpoint: raise hand when counters show
0 duplicates and 0 unknown-format dates.

## 70–95 · Independent practice

Solo: `hospital-no-shows.csv` — full clean per checklist + a 6-line **cleaning log**: rows out,
duplicates removed, blanks sentinelled, rules added. File in workbook (feeds A1).

## 95–110 · Correction & check

KC2: (1) What does TRIM not fix? (2) Why delete duplicates AFTER sorting key columns?
(3) Why is a blank worse than "UNKNOWN"? (4) What does CLEAN remove? (5) Two validations for a phone field.
Self-mark.

## 110–120 · Summary & next session

Clean data is a product — log what you changed. Next: lookups and conditional logic.

## Answers — KC2

1. Inner double spaces (trims ends only). 2) You see what you're deleting; keys chosen consciously.
2. AVERAGE ignores blanks but counts zeros; gaps hide; UNKNOWN is queryable. 4) Non-printable characters
   (line breaks, tabs from imports). 5) 11 digits; text type; digits-only; list/regex-style pattern (any 2).

## Homework (30 min)

Finish the cleaning log; bring both files.
