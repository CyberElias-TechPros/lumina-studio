# CEA Lesson Note — CEA-WEB-003 · Session 5: JavaScript Basics

| Field       | Value                          |
| ----------- | ------------------------------ |
| Document ID | CEA-ACA-NOTE-WEB-003-S5        |
| Version     | 1.0 · Session 5 of 12 · Week 3 |

## 0–10 · Review & warm-up

"Remember between visits" lists read — three favourite answers get mini-whiteboards: cart, form values, theme.

## 10–25 · Teaching block

**Where JS lives.** `<script>` before `</body>` or `defer` in head — the page must exist before we touch it. DevTools Console = our practice arena.
**Variables & types.** `const` default, `let` when reassigning, never `var`; string · number · boolean · undefined · null · bigint/symbol awareness; `typeof`.
**Operators.** `+ - * / % **` · comparisons `=== !== > <` (ALWAYS ===, never ==) · logical `&& || !` · template literals (backticks).
**Conditions.** if/else if/else · ternary for one-liners · switch for literal menus. Truthiness traps: 0, "", null, undefined, NaN are falsy.
**First interactivity.** `document.querySelector('#id').textContent = 'Hello'` — the aha-moment, engineered carefully.

## 25–45 · Guided demonstration

Live: console playground — swap heading text on click (`addEventListener('click', …)` previewed); build a mini tip-calculator in console (amount × 15%); deliberate `==` bug shown with string "5" == 5 → `===` fixes.

## 45–70 · Guided practice

Pairs: console-drills pack (10 ops printed); build `greet(name)` in console; wire one button to change the hero tagline between two phrases; swap & verify.

## 70–95 · Independent practice

Solo: **interactive trio** — (1) button changes tagline, (2) live clock-ish line (date), (3) a hidden panel toggles (first taste of dynamic UI). File screenshots/snippets to workbook.

## 95–110 · Correction & check

KC5: (1) const vs let. (2) === vs ==. (3) Template literal syntax. (4) Three falsy values. (5) defer meaning.

## 110–120 · Summary & next session

The page obeys — now make it compute. S6: functions, arrays, objects, loops.

## Answers — KC5

1. const = fixed binding; let = reassignable. 2) === strict; == coerces — bug farm. 3) `Hello, ${name}!` backticks. 4) 0, "", null/undefined/NaN. 5) JS downloads now, runs after HTML parse.

## Homework

List three things a calculator for YOUR project must do — S6 builds it.
