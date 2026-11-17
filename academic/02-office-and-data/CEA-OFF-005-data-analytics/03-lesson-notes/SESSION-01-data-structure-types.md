# CEA Lesson Note — CEA-OFF-005 · Session 1: Data Structure & Types

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-OFF-005-S1       |
| Version     | 1.0 · Session 1 of 8 · Week 1 |
| Status      | Draft — pending pilot         |

## 0–10 · Review & warm-up

Ask: "Show of hands — who has a spreadsheet at home full of junk you're afraid to touch?" Today we
learn why it's junk and how to plan a dataset that never gets that way.

## 10–25 · Teaching block

**Tidy data principles.** One row per record, one column per variable, one table per file topic, real
types per field (text/number/date/boolean), no merged cells in data sheets, no blank spacer rows,
headers exactly once in row 1. Tidy data is computable data; anything else is a picture of data.

**Types that matter.** Numbers stay numbers (₦ format, not "₦-typed" strings), dates DD/MM/YYYY as
real dates (Excel internal serial), text ID codes with leading zeros as text, booleans yes/no.

**Sources of mess.** Manual re-typing (classic), exports from CRMs/accounting tools, imports pasted
into Excel (everything becomes text), merged cells with banner headings, footnotes in cells, units
mixed into values ("12 kg"), mixed locales (02/03 — Feb 3 or Mar 2?).

**Planning a dataset.** Before a single formula: decide grain (one row = one ___), fields, allowed
values per field, owner, refresh cadence. Write it as a 10-line data dictionary — the single most
professional artefact in analytics.

## 25–45 · Guided demonstration

Projected `hospital-no-shows.csv` (practice file): identify grain (one row = one appointment), mark
merged headers, find text-numbers, sniff locale, find units-in-cells, find blank rows. Class calls
out; instructor re-shapes live: separate banner → summary sheet; Table; types fixed; dictionary written.

## 45–70 · Guided practice

Pairs: on `raw-church-register.xlsx` — list every structural fault (merged cells, units-in-values,
text-numbers, blank spacer rows, banner) and propose the grain and dictionary for a clean version.
Debrief on screen.

## 70–95 · Independent practice

Solo: design a dataset plan for **Grace Stores weekly till reconciliation**: grain, fields, types,
allowed values, refresh. 10-line data dictionary filed to workbook. No computer needed (pen & paper).

## 95–110 · Correction & check

KC1: (1) Define tidy data in one sentence. (2) Two symptoms of a non-computable sheet.
(3) Why do dates land as text? (4) What is grain? (5) Name two fields that must be text.
Self-mark.

## 110–120 · Summary & next session

Messy in → garbage out. Next: cleaning and validation tools — TRIM, CLEAN, PROPER, de-dupe, missing values.

## Answers — KC1

1. One row per record, one column per variable, real types. 2) Any two: merged banners, text-numbers,
   spacer rows, units in values, mixed locales. 3) Export/import as text; locale mismatch; leading-zero
   preservation of IDs. 4) What one row represents — the unit of analysis. 5) Phone numbers, ID codes with
   leading zeros, ZIP-like postal codes.

## Homework (25 min)

Open any spreadsheet you own; write down its grain and three structural faults. Bring to S2.
