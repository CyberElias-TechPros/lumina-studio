# CEA Lesson Note — CEA-OFF-003 · Session 2: Spreadsheets for Data Work

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-OFF-003-S2       |
| Version     | 1.0                           |
| Session     | 2 of 4 · 105 minutes · Week 1 |
| Status      | Draft — pending pilot         |

## 0–10 · Review & warm-up

Show KC1 results. Spot-check three homework grocery lists projected: who used a number format? Who
typed "₦" inside cells? Quick fix demo.

## 10–25 · Teaching block

**Rows & columns as a system.** Row 1 is _always_ the header row. One row per record, one column per
field, no gaps, no merged cells, no title banner above the header in a working data sheet (banner
belongs on a summary sheet). Convert range → **Table** (Ctrl+T): banded rows, filter arrows,
structured references, grows safely.

**Data formatting rules.** Date: DD/MM/YYYY, one locale throughout — mixed MM/DD/YY dates are the
#1 silent killer (February 3rd vs March 2nd). Phone: text, leading zero kept (format cells as text
before entry, or prefix with `'`). Amounts: number with currency format — never typed "₦"-strings.
Names: Title Case, one name per field where feasible (first / last). Trim trailing spaces — `=TRIM()`.

**Sorting & filtering.** Sort A→Z / Z→A on one field; multi-level sort (surname, then first). Filter
to show only rows meeting criteria (e.g. "Ilanga branch only"). Sort preserves whole rows; a sort on
a single column with unsorted others scrambles data — always Table-convert or select all columns
before sorting.

**Removing duplicates.** Data ▸ Remove Duplicates (select key columns!). Planted duplicates in the
practice sheet: catch pairs that differ only by trailing space or case — `=TRIM()` + `=UPPER()` helper
columns expose them; case-insensitive compare with `=A2=B2` after TRIM.

**Freeze panes.** Freeze row 1 so headers stay visible on scroll.

## 25–45 · Guided demonstration

Open `GraceStores-200-customers.xlsx` (practice file) with planted: 12 duplicates, 4 dates in wrong
locale, 6 phone-as-number cells, 1 merged header row. Instructor narrates every fix: Header row →
Table; sort by surname; helper columns TRIM/UPPER; conditional flags; de-dupe; date column → Date
format; phone column → Text.

## 45–70 · Guided practice

Class follows on their machines; half the room works column A→D, other half E→H on the same file,
then swap and verify. Target: 0 duplicates (de-dupe counter shown on screen), all dates uniform.

## 70–95 · Independent practice

Solo: `Church-register-messy.xlsx` — 120 rows: mixed date locales, all-caps names, 8 duplicates,
one column of amounts with "₦" typed inline. Deliver a clean Table with a **Cue card** of what you
changed (cell counts, duplicates removed).

## 95–110 · Correction & check

KC2: (1) Why is row 1 always the header row? (2) How do you keep "08031234567" exactly as typed?
(3) What does `=TRIM("  Ade  Lawal ")` return? (4) Sort or Filter — which hides rows without deleting
them? (5) Two safe habits before sorting a sheet. Self-mark.

## 110–120 · Summary & next session

Structure survives growth: headers, Tables, one locale, text phones. Next: transcription discipline,
validation and file naming for client work.

## Answers — KC2

1. Sort/filter/Table anchor — software reads row 1 as field names. 2) Format column as Text before
   entry (or leading apostrophe). 3) "Ade Lawal" — trims ends only (inner double space remains).
2. Filter. 5) Select all columns / convert to Table; back up or undo-able single change at a time.

## Homework (30 min)

Re-open your S1 grocery sheet: convert to Table, add a `Total` with SUM, freeze row 1.
