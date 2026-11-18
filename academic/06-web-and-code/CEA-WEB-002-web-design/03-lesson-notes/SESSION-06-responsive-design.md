# CEA Lesson Note — CEA-WEB-002 · Session 6: Responsive Design

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-002-S6       |
| Version     | 1.0 · Session 6 of 8 · Week 3 |

## 0–10 · Review & warm-up

First-breaking-section confessions: "gallery blew sideways", "hero text overflowed the button". Write them on the board — they're today's curriculum.

## 10–25 · Teaching block

**Mobile-first truth.** Design for 320–480px first; scale UP with `min-width` media queries — never shrink DOWN (desktop-first creates mausoleum sites).
**Breakpoints that matter.** ≤600px phone single-column · ≤900px tablet 2-up · >900px desktop 3–4-up. One or two queries per page is usually enough.
**Media query mechanics.** `@media (min-width: 700px) { … }` — override, don't rewrite; flex-wrap does 70% of the work before queries exist.
**Fluid images & media.** `img { max-width:100%; height:auto }`; hero images sized for mobile first (<300KB); `picture`/srcset awareness.
**Touch targets.** ≥44×44px with spacing — fat fingers, fat phones, fewer mis-taps; bottom-nav for thumb reach.
**Test protocol.** DevTools responsive mode → 320/375/414/768/1024 → then ONE real phone passed around → rotate landscape once.

## 25–45 · Guided demonstration

Live: phone-first Mrs. Obi — hero stacks (image over text), cards single-column with wrap, nav collapses to 3-line NOT hamburger-JS (CSS checkbox trick shown, JS forbidden today); test on classroom loaner phone; landscape pass.

## 45–70 · Guided practice

Pairs: mobile-first pass on their full homepage — queries at 600/900px; every section audited at 320px; tap-targets measured with devtools ruler tool; screenshot 320px + 375px + desktop.

## 70–95 · Independent practice

Solo: **responsive lock** — all three widths screenshotted; worst-case content (longest service name, four-line hero sub) survives; phone real-device photo of the site open for workbook proof.

## 95–110 · Correction & check

KC6: (1) Mobile-first why. (2) Three widths to test. (3) flex-wrap vs media queries share of work. (4) img fluid recipe. (5) Tap target size+why.

## 110–120 · Summary & next session

Responsive done means client-ready — now make it FINDABLE and USABLE. S7: UX, accessibility, SEO.

## Answers — KC6

1. Most Nigerian traffic is mobile-Safari/Chrome; desktop is the bonus screen. 2) 320 / 375 / 768+ (or 1024). 3) Wrap first, query only for structure changes. 4) max-width:100%; height:auto. 5) 44×44px — mis-taps cost trust and orders.

## Homework (10 min)

Google your own business name — what shows? S7 fixes some of that for free.
