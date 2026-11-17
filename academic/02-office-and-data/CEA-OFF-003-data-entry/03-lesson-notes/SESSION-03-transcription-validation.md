# CEA Lesson Note — CEA-OFF-003 · Session 3: Transcription & Validation

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-OFF-003-S3       |
| Version     | 1.0                           |
| Session     | 3 of 4 · 105 minutes · Week 2 |
| Status      | Approved v1.0 — pending pilot |

## 0–10 · Review & warm-up

Project S2 cleanup results: 0 duplicates expectation vs actual. Quick recap question bank (Table
anchor, phone-as-text, TRIM). Anyone whose file broke — what broke?

## 10–25 · Teaching block

**Transcription.** Copying data from a source (paper form, PDF, receipt) into a system without
adding, dropping or swapping anything. Rules: source stays legible and untouched; type one field at
a time; look _at the cell after landing_, not at your fingers; no autocomplete guessing.

**Double-keying.** For critical registers (bank, hospital): two operators key the same source; the
computer compares; mismatches are checked against source by a third person. You'll see this in the
final assessment simulation.

**Validation.** Rules a value must satisfy: required (non-blank), format (date exists; phone = 11
digits; email contains @), range (age 0–120; qty ≥ 0), list (state ∈ the 36+FCT). Excel: Data ▸
Validation. Sheets: Data ▸ Data validation. Rejection with a message you write yourself beats silent
wrong data.

**Error checking.** Compare keyed data to source cell-by-cell (side-by-side, row ruler finger).
`=EXACT(A2,B2)` flags differences invisibly invisible to eye (case, trailing space). Count mismatches
on a scratch sheet: `=SUMPRODUCT(--(EXACT(range,range)=FALSE))`.

**File naming & folders.** Pattern: `YYYY-MM-DD-client-document-vN.ext` →
`2026-11-16-grace-members-register-v2.xlsx`. Folders by client/project, then year — never "New folder",
never "final-final-3.xlsx". A README.txt in the root says what lives where. If the client can't find
it, it doesn't exist.

## 25–45 · Guided demonstration

Instructor keys 6 rows from a projected **school admission form**, demonstrating: side-by-side
source window, field order discipline, post-cell verify, EXACT check cell, flag-yellow rule. Then
builds a folder tree `CEA-Practice\GraceStores\2026\Register\` with date-prefixed filenames and a
3-line README.txt.

## 45–70 · Guided practice

In pairs (A keys, B sources; roles swap every 6 rows): transcribe **Grace Stores suppliers form**
(12 rows) with a validation pass after: your partner runs the EXACT comparison and reads out mismatches;
fix or flag. Log start/end time.

## 70–95 · Independent practice

Solo under light time pressure: file-naming rescue — a messy USB drop of 15 files (`doc1.xlsx`,
`Doc (2).docx`, `registerFINAL.xlsx`…) — rename all to convention, sort into folders, write the
README. Then validation gauntlet: given `admission-forms-raw.xlsx` with 10 planted errors vs the
source scans (projected), find and flag them; count = your score.

## 95–110 · Correction & check

KC3: (1) Why is the source never marked up? (2) What does EXACT see that eyes miss?
(3) Name three validation rule types. (4) Deadline is one hour and three cells are unreadable — what do you do?
(5) Rewrite `final committee NEW updated 3.docx` as a convention-compliant name.
Self-mark.

## 110–120 · Summary & next session

Source → eyes → cell → verify, flag don't guess, name like the client must find it. Next session:
measured accuracy and speed, the final report — bring glasses, rest hands, no energy drinks.

## Answers — KC3

1. It is evidence; corrections must be traceable. 2) Case differences & trailing spaces. 3) Any
   three of required / format / range / list. 4) Yellow-flag all three, complete the rest, report —
   never invent. 5) `YYYY-MM-DD-committee-updated-vN.ext`, e.g. `2026-11-16-committee-updated-v3.docx`.

## Homework (20 min)

Print one real form from home (bills, receipts); bring it to S4 for a warm-up transcription drill.
