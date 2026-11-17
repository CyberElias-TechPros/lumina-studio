# CEA Lesson Note — CEA-WEB-003 · Session 8: Forms, Validation & Dynamic UI

| Field       | Value                          |
| ----------- | ------------------------------ |
| Document ID | CEA-ACA-NOTE-WEB-003-S8        |
| Version     | 1.0 · Session 8 of 12 · Week 4 |

## 0–10 · Review & warm-up

Rule-of-three lists read aloud; room agrees the saddest bug is the silent form failure.

## 10–25 · Teaching block

**Validation philosophy.** Validate on blur for fields, on submit for the form; NEVER submit doomed data; server still re-checks (never trust the client).
**The three layers.** HTML5 attributes (required/type/min) · JS custom rules (Nigeria phone regex-lite: starts 0/+234 + 10 digits; email simple pattern) · friendly inline error text + aria-describedby + focus to first error.
**Dynamic UI patterns.** Modal open/close (focus trap, ESC, overlay click) · toast/confirmation (aria-live) · accordion FAQ (toggle + max-height) · disable-double-submit.
**Form libraries? Not today.** Hand-rolling teaches the model; frameworks come later.

## 25–45 · Guided demonstration

Live: project contact form fully wired — required+type attrs; JS: name non-empty, phone pattern with 0/+234, email pattern, terms checkbox MUST be checked; submit → success panel (aria-live) + form reset; modal demo with focus-visible flow; double-submit disabled.

## 45–70 · Guided practice

Pairs: wire their forms the same; break each other's (empty submit, 419 phone, XSS attempt in name) — all caught gracefully; modal keyboard-only tested end-to-end.

## 70–95 · Independent practice (A1 gate review)

Solo: **contact form production-grade** — HTML5 + JS layers + success state + modal/accordion one of the two. This is assignment A1 territory. Submit to LMS for instructor review.

## 95–110 · Correction & check

KC8: (1) Client vs server validation roles. (2) HTML5 freebies. (3) Focus-first-error rule. (4) Modal trio (open/ESC/overlay). (5) Double-submit fix.

## 110–120 · Summary & next session

Interactive shipped. Next: real project discipline — folders, reuse, git. S9.

## Answers — KC8

1. Client = UX speed/feedback; server = truth/security. 2) required, type=email/tel/number, min/max. 3) Keyboard users get error announced + focus moved to it. 4) Open with trigger, close with ESC and overlay click, focus returns to trigger. 5) disable button on submit; enable after response/failure.

## Homework (20 min)

Draw your project's folder tree — S9 restructures it properly.
