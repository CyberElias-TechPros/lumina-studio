# CEA Lesson Note — CEA-WEB-002 · Session 2: HTML Structure

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-002-S2       |
| Version     | 1.0 · Session 2 of 8 · Week 1 |

## 0–10 · Review & warm-up

Open last week's terrible business websites on a projector — class inventories: no hours, no location, no WhatsApp link. Today we never build that.

## 10–25 · Teaching block

**The skeleton.** `<!DOCTYPE html>` → `<html lang="en">` → `<head>` (meta, title, charset) → `<body>` (the visible life). Every page: exactly one h1; one `<main>`; semantic landmarks (`header/nav/main/footer`).
**Text & structure.** h1–h6 hierarchy (h2 for sections, h3 for cards) · p for prose · ul/ol for lists · strong/em for emphasis · hr for section breaks.
**Links & images.** `<a href="…">` — relative vs absolute; `<img src alt>` — ALWAYS alt (what a blind customer hears); width/height to stop layout jumping.
**Tables vs divs.** Tables are for tabular data (price lists, timetables) — NEVER for layout (1999 called, it wants its `<table>` back).
**Forms.** label+input pairs (id/for), action/method, required attributes — every form needs a human-readable confirmation state.

## 25–45 · Guided demonstration

Live: project builds skeleton from blank `.html` in VS Code → fills Mrs. Obi's hero h1, about h2/p, services list, footer with address — Validate with W3C validator live; errors shown aloud as "typos the browser forgave".

## 45–70 · Guided practice

Pairs: write the full HTML skeleton of your discovery sheet's homepage — semantic landmarks, one h1, services `<ul>`, footer with address + phone `tel:` link, `<img>` with alt.

## 70–95 · Independent practice

Solo: **complete semantic homepage** — all landmarks; one table (price list OR hours); one five-field enquiry form with labels; alt text everywhere; validated W3C-clean (or noted fix-later). File to workbook.

## 95–110 · Correction & check

KC2: (1) One h1 rule why. (2) alt does two jobs. (3) Table rule. (4) label/for pair for. (5) head vs body.

## 110–120 · Summary & next session

Meaning first, decoration later. S3: paint the wall — CSS.

## Answers — KC2

1. Accessibility + SEO parse hierarchy from h1; multiples confuse screen readers. 2) Describes image to the blind + SEO. 3) Tabular data only — never layout. 4) Clicking label focuses input — small-screen mercy for fat thumbs. 5) head = metadata for machines; body = everything humans see.

## Homework

Style-steal one site you love: screenshot its colours + type sizes — S3 uses them.
