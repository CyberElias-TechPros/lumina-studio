# CEA Lesson Note — CEA-WEB-002 · Session 1: How the Web Works

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-002-S1       |
| Version     | 1.0 · Session 1 of 8 · Week 1 |
| Status      | Approved v1.0 — pending pilot |

## 0–10 · Review & warm-up

Ask the room: "Type google.com and hit Enter — who does what, in what order?" Vote; then trace aloud on board:
browser asks resolver → resolver finds the IP → browser fetches the HTML → browser paints → images/CSS/JS follow.

## 10–25 · Teaching block

**Websites vs web apps.** Website = pages that inform (read-mostly); web app = software in the browser (login, dashboards, state). You build the former in this course; the latter teased in CEA-WEB-003.
**The four nouns.** Domain = the human name (yourbrand.com.ng) · Hosting = the building with the generator and the security guard where files live · DNS = the phone book mapping name → IP · Browser = the reader that turns files into the thing your mother sees.
**Frontend vs backend.** Everything you SEE and CLICK = frontend; the vault, the database, the receipts = backend. You are here for the shop window — and it is honourable work.
**Cost reality.** Domain ₦5–15k/yr · hosting near-free for static sites (GitHub Pages / Netlify) · email separate. A ₦0 hosting plan is legitimate for a first business site.

## 25–45 · Guided demonstration

Live teardown of three real SME sites (one great, one broken, one invisible): open DevTools → Elements (HTML),
Network tab (who asked for what), View Source (the real files). Class spot-shouts dead links and missing titles.

## 45–70 · Guided practice

Pairs: pick one local business (or invent Mrs. Obi's event-decor atelier) and answer: what pages? what one CTA?
what domain name would you register? Present in 60 seconds each.

## 70–95 · Independent practice (A1 part 1)

Solo: **discovery sheet** — business name · audience · 5 pages with one-line jobs · domain ideas (3, with availability gut-check) · CTA · competitor site you admire + why. File to workbook.

## 95–110 · Correction & check

KC1: (1) What does DNS do? (2) Domain vs hosting, one line each. (3) What happens after Enter? (4) Frontend vs backend, shop-window/vault. (5) Website vs web app.

## 110–120 · Summary & next session

The web is a building with an address — you'll write the bricks next. S2: HTML.

## Answers — KC1

1. Maps human names to IP addresses. 2) Domain = name; hosting = the always-on computer holding files. 3) Browser asks DNS → gets IP → requests HTML → paints → fetches assets. 4) What you see vs the vault behind it. 5) Pages that inform vs software that works.

## Homework

Bring your discovery sheet; choose an editor tonight (VS Code recommended).
