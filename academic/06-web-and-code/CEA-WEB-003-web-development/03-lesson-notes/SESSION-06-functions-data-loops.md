# CEA Lesson Note — CEA-WEB-003 · Session 6: Functions, Data & Loops

| Field       | Value                          |
| ----------- | ------------------------------ |
| Document ID | CEA-ACA-NOTE-WEB-003-S6        |
| Version     | 1.0 · Session 6 of 12 · Week 3 |

## 0–10 · Review & warm-up

Calculator wish-lists read; the room negotiates one class calculator spec: amount + people + tip % → per-person split.

## 10–25 · Teaching block

**Functions.** Declaration vs arrow `const f = (x) => …`; parameters, return, single-responsibility; name by verb (`calcSplit`). Default params. Pure when possible.
**Arrays.** `push/pop/shift` · `length` · iterating `for…of` · `map` (transform) · `filter` (subset) · `reduce` (aggregate) — show ONE real use each.
**Objects.** `{ name, price, qty }` literals · dot/bracket access · arrays of objects = every real table on the web; destructure in parameters.
**Loops.** for/while when index matters; for…of over arrays; never `for` with `< length` recomputed in hot loops (micro-point, mention only).
**Events (bridge).** `addEventListener('input'|'click'|'submit')` — events carry data (`e.target.value`).

## 25–45 · Guided demonstration

Live: build the bill-splitter as pure functions (`splitBill(total, people, tipPct)`), then wrap into the page: two inputs + button → per-person result rendered; array example: `SERVICES` object list rendered via map (preview of templating).

## 45–70 · Guided practice

Pairs: finish the splitter (edge: people=0 → friendly error; tip 0% allowed); render three SERVICES prices via template literals; swap & break each other's edge cases.

## 70–95 · Independent practice (Project milestone)

Solo: **data-driven section** — your services/portfolios array rendered into the page by JS (no hand-written repeat cards); one calculation for your domain live (quote estimator-ish). Workbook screenshots.

## 95–110 · Correction & check

KC6: (1) Arrow function syntax. (2) map vs filter vs reduce. (3) Array of objects why everywhere. (4) addEventListener args. (5) Destructure what it buys.

## 110–120 · Summary & next session

Functions are the grammar of interactivity. S7: we finally meet the DOM properly.

## Answers — KC6

1. `const f = (a) => a * 2;` 2) map=transform each · filter=keep matching · reduce=fold to one value. 3) API responses & local datasets are tables = arrays of objects. 4) ('type', handler(event){}). 5) Shorter, named extraction — fewer dots, fewer typos.

## Homework

Console-print the HTML you'd regret writing by hand — 20 identical cards.
