# CEA Lesson Note — CEA-WEB-003 · Session 7: The DOM

| Field       | Value                          |
| ----------- | ------------------------------ |
| Document ID | CEA-ACA-NOTE-WEB-003-S7        |
| Version     | 1.0 · Session 7 of 12 · Week 4 |

## 0–10 · Review & warm-up

20-card handwriting confession — "my wrist died around card 11"; the DOM is the cure.

## 10–25 · Teaching block

**The DOM tree.** Browser's in-memory model of your HTML; every tag a node; we READ and WRITE it.
**Selecting.** `querySelector('.card')` · `querySelectorAll('.card')` → NodeList + `forEach`; prefer classes; never `document.all` archaeology.
**Writing.** textContent (safe) vs innerHTML (powerful, dangerous — XSS if fed user input; use textContent unless you own every character). style.x toggles (sparingly) · classList.add/remove/toggle (always).
**Creating.** `createElement` → `appendChild(container)`; build list items from arrays; sanitize user input by never injecting it.
**Events.** click · input · submit · keydown (Enter-to-open) · delegation for dynamic lists (listen on parent, match e.target).

## 25–45 · Guided demonstration

Live: project services rendered from JS array into grid; "show only Catering" filter button via classList toggle; live-search input filters instantly; deliberate innerHTML XSS with `<img onerror>` pasted to prove the scare — then textContent saves us.

## 45–70 · Guided practice

Pairs: render portfolio/services from array; add live filter input; swap; partner injects hostile string — inspect safety together.

## 70–95 · Independent practice (Project milestone)

Solo: **dynamic filtering shipped** — data array + render + one filter + one toggle-panel (pricing? FAQ?) all via DOM; no page reload. Workbook screenshots + snippet.

## 95–110 · Correction & check

KC7: (1) DOM in one line. (2) querySelector vs querySelectorAll. (3) textContent vs innerHTML. (4) classList.toggle. (5) Delegation pattern.

## 110–120 · Summary & next session

Pages that think are half the battle — now make forms behave. S8: validation & dynamic UI.

## Answers — KC7

1. The live tree model of your HTML the browser lets you read/write. 2) One first match vs all matches. 3) textContent = plain text; innerHTML = parsed HTML (XSS risk). 4) Toggles class on/off — the state switch. 5) One listener on the parent; e.target tells who was clicked — scales to dynamic children.

## Homework

List your form's three must-pass rules — S8 enforces them.
