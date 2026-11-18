# CEA Lesson Note — CEA-WEB-003 · Session 10: Debugging & Quality

| Field       | Value                           |
| ----------- | ------------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-003-S10        |
| Version     | 1.0 · Session 10 of 12 · Week 5 |

## 0–10 · Review & warm-up

Broken-project confessions; instructor pins three specimen bugs on the board: the 404 image, the silent JS error, the mobile overflow.

## 10–25 · Teaching block

**DevTools is the debugger.** Console (errors/logs) · Elements (inspect/box-model) · Network (status codes: 200/301/404/500; red = your friend today) · Application (localStorage!) · Lighthouse.
**A debugging ritual.** Reproduce → read the first console error → fix ONE thing → re-test → read again. Never fix two things at once — you won't know which confessed.
**Console archaeology.** `console.log` with labels, `console.table` for arrays, `console.assert`; breakpoints in Sources (and the magic of `debugger;`) — step through once in the demo and watch eyes open.
**Quality gates.** HTML validate · Lighthouse mobile ≥80 · no 404s · images compressed · a11y quick-wins (alt, labels, focus, contrast) · SEO basics (title/meta) · performance budget (hero ≤200KB).

## 25–45 · Guided demonstration

Live: instructor's specimen site — console shows `Uncaught TypeError: Cannot read properties of null`; fix = script moved before DOM (defer); Network shows 404 hero → filename typo (case-sensitivity!) — Linux hosting is case-sensitive, Windows isn't, classic Monday; Lighthouse 58→84 after image compress + alt; mobile overflow fixed via `flex-wrap` + `max-width:100%`.

## 45–70 · Guided practice

Pairs: swap projects; run the specimen checklist end-to-end; log every issue found on the quality sheet; fix at least two together; verify on the loaner phone.

## 70–95 · Independent practice

Solo: **quality pass shipped** — console clean; no 404s; Lighthouse ≥80; contrast AA; README updated with known-issues honest list (there's always one). Workbook screenshots.

## 95–110 · Correction & check

KC10: (1) First debugging step. (2) Network tab red row meaning. (3) Case-sensitivity trap. (4) console.table use. (5) Lighthouse ≥80 gate.

## 110–120 · Summary & next session

Clean machine, clean code. S11: shipping it to the world properly.

## Answers — KC10

1. Reproduce, then READ the first error. 2) Failed request — URL/path/server. 3) Windows hides it, Linux hosting breaks it — always lowercase-kebab filenames. 4) Dumping arrays of objects readably. 5) The Academy's bar for "publishable without embarrassment".

## Homework

Make a Netlify account + verify `git push` works to GitHub; S11 deploys in anger.
