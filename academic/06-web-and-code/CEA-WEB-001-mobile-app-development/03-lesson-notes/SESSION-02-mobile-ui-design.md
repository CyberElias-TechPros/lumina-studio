# CEA Lesson Note — CEA-WEB-001 · Session 2: Mobile UI Design

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-001-S2       |
| Version     | 1.0 · Session 2 of 8 · Week 1 |
| Status      | Approved v1.0 — pending pilot |

## 0–10 · Review & warm-up

Paper sketches passed one seat left; room rates thumb-reach vs crayon-art.

## 10–25 · Teaching block

**Screens & flows.** User flow map before pixels: Entry → Screen A → Screen B → Result + recovery paths (empty cart, error state, no-connection).
**Touch targets.** Minimum 44×44pt; spacing ≥ 8px; thumb-zone map: bottom third of screen is app country; top is reach-stretch; primary action lives bottom-centre.
**Typography & hierarchy on small screens.** Two type sizes (body + title), never five; one CTA colour; line clamp on long strings; images < 300KB.
**Navigation patterns.** Bottom tabs (3–5, persistent) · Stack (drill-in with back) · Modal (independent task) · Drawer only for settings. Platform back: Android hardware/gesture — NEVER trap users.
**Prototyping.** Fingers-on-paper first; Figma-class optional; Expo Snack beats polish when learning; states: default, loading, empty, error, success — every screen gets all five drawn NOW.

## 25–45 · Guided demonstration

Live: draw GoNowy flow (search → cart → receipt) on board with state squares under each screen (loading spinner, empty "no items", error retry, success toast) — class names missing states; instructor adds them.

## 45–70 · Guided practice

Pairs: convert paper sketches to flow map with all five states per screen; swap; partner hunts missing recovery paths (the #1 prototype killer: no empty state).

## 70–95 · Independent practice (A1 part 2)

Solo: **full flow map** — three screens × five states, drawn on paper/tool; annotated platform convention choices (why bottom tabs, why this font size). File to workbook.

## 95–110 · Correction & check

KC2: (1) Thumb-zone law. (2) Touch target minimum. (3) Five states per screen. (4) Tabs vs stack vs modal one-liners. (5) Trap-back failure mode.

## 110–120 · Summary & next session

The thumb is the CEO; the screen is their desk. Next: hands on the keys — S3 builds.

## Answers — KC2

1. Bottom third = primary actions. 2) 44×44pt. 3) Default, loading, empty, error, success. 4) Tabs = persistent destinations · stack = drill-in · modal = focused task. 5) Android back always escapes; trapping = users abandon the app in 10 seconds.

## Homework

Install Expo Go on the loaner phone (or your phone) — S3 starts with it.
