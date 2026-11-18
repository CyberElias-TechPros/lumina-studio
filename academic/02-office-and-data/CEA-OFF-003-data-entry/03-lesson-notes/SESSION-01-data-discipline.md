# CEA Lesson Note — CEA-OFF-003 · Session 1: Data Discipline

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-OFF-003-S1       |
| Version     | 1.0                           |
| Session     | 1 of 4 · 105 minutes · Week 1 |
| Status      | Approved v1.0 — pending pilot |

## 0–10 · Review & warm-up

Welcome. Quick demo: two typists race 30 seconds on a messy register excerpt at the board. Class
counts errors in each. Takeaway: this course is about being trusted with records, not fast fingers.

## 10–25 · Teaching block

**What data entry is.** Someone captures information into a system so it can be found, computed and
trusted: bank tellers posting deposits, clinics recording vitals, schools capturing marks, shops
invoicing, churches running membership registers. The work is the same everywhere: source →
structured record → verification.

**Fields & records.** A register table: each row is a record (one person, one invoice), each column
is a field (surname, phone, date joined). Never merge cells in a raw data sheet. Never leave a blank
where a field belongs — flag it.

**Data types.** Text (names, addresses, phone numbers with leading zeros — always text!), number
(quantities, amounts — no "₦" typed into the cell; format does the symbol), date (DD/MM/YYYY in
our locale; Excel stores internally as a serial number), boolean/yes-no (paid? yes/no, not maybe).
Wrong type = poisoned data downstream: "0123456789" stored as number becomes 123456789.

**Accuracy mindset & detail discipline.** 98% accuracy is the professional bar — 2 errors per 100
cells hidden in a thousand-row sheet is still 20 wrong phone numbers. Habits: eyes source→cell,
fingers land, verify by reading back; one record at a time; flag & move on; never "fix" by guessing.

**Speed is the third skill, not the first.** Professional data-entry roles quote 40–70 WPM. Speed
comes from rhythm and posture, learned after accuracy is automatic.

## 25–45 · Guided demonstration

Instructor demonstrates a 10-row entry from a paper form at deliberate pace, narrating eye
movements. Then converts a copied "bad register" on screen into field-consistent rows: surname
separated from first name, phone as text with leading zero, date as real date.

## 45–70 · Guided practice

In pairs on machines: type the 12-row **Grace Stores stock-card** paper sheet into Excel. Then,
as a class, find all 7 planted problems in the projected answer (two missing phones, one date in
MM/DD, one capitalised all-caps name, one ₦ typed into a number cell, one merged cell, one blank
row used as "spacing").

## 70–95 · Independent practice

Solo: your **neighbourhood-shop inventory** sheet (course practice file) — 25 rows, six fields.
Instructor circulates with the yellow-flag rule: unsure → yellow fill → move on → raise hand at end.

## 95–110 · Correction & check

KC1: (1) A record and a field — define each. (2) Why is a phone number text, not a number?
(3) 98% accuracy means what in a 500-row sheet? (4) What do you do with a cell you can't read?
(5) Name two reasons speed comes after accuracy. Self-mark; discuss Q4.

## 110–120 · Summary & next session

Accuracy first, verifiable second, fast third. Next: the spreadsheet home of data entry — formatting,
sort, filter and de-duplication.

## Answers — KC1

1. Record = one row/one entity. Field = one attribute column. 2) Leading zeros + never computed
   on; Excel strips leading zero from numbers. 3) Up to 10 wrong cells — sounds small, is a bad address
   book. 4) Yellow-flag it; never guess; raise at end. 5) Bad data costs more to fix than slow entry;
   speed built on wrong habits compounds errors.

## Homework (30 min)

Type your own grocery list (10+ items) into a fresh sheet with fields Item/Qty/Price/Date; bring
it to S2.
