# CEA Lesson Note — CEA-WEB-003 · Session 1: Semantic HTML

| Field       | Value                          |
| ----------- | ------------------------------ |
| Document ID | CEA-ACA-NOTE-WEB-003-S1        |
| Version     | 1.0 · Session 1 of 12 · Week 1 |
| Status      | Approved v1.0 — pending pilot  |

## 0–10 · Review & warm-up

WEB-002 alumni: one-line HTML recap quiz. Newcomers: pair up with a graduate — we build the habit of asking early.

## 10–25 · Teaching block

**Semantics = meaning.** Tags carry meaning, not looks: `header/nav/main/footer/section/article/aside/h1–h6/p/ul/table/figure/figcaption`.
Screen readers, search engines and your future teammate navigate by these — div soup is a locked room.
**The landmark set.** One `header`, one `nav`, one `main`, one `footer`; `section` per theme; `article` for self-contained units (a listing, a post); `aside` for side-notes.
**Discipline.** One h1; h2 = section, h3 = sub-item; heading levels never skipped. Lists for lists. `<time datetime>` for dates.

## 25–45 · Guided demonstration

Live: project "before" div-soup page → room calls out meaning → instructor refactors to landmarks live → W3C validator green → outline view in DevTools shows the tree clean.

## 45–70 · Guided practice

Pairs: refactor the printed div-soup handout into semantic HTML; swap; partner red-pens meaning, not looks.

## 70–95 · Independent practice

Solo: **semantic rebuild** of your page skeleton from WEB-002 shortcuts (or a fresh handout) — all landmarks, one h1, correct hierarchy, validated. File to workbook.

## 95–110 · Correction & check

KC1: (1) Semantic = ? (2) div-soup problem. (3) One h1 rule. (4) article vs section. (5) Validation does.

## 110–120 · Summary & next session

Meaning is the foundation — build it. S2: forms that humans can actually fill.

## Answers — KC1

1. Tags that carry meaning to machines & humans. 2) No navigable meaning — invisible to AT/SEO. 3) Outline clarity for screen readers/SEO. 4) article = self-contained unit; section = thematic grouping. 5) Catches structural errors browsers silently forgive.

## Homework

Bring one site with a bad form — S2 autopsies it.
