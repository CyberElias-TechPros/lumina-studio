# CEA Lesson Note — CEA-WEB-003 · Session 2: Forms & Accessibility

| Field       | Value                          |
| ----------- | ------------------------------ |
| Document ID | CEA-ACA-NOTE-WEB-003-S2        |
| Version     | 1.0 · Session 2 of 12 · Week 1 |

## 0–10 · Review & warm-up

Bad-form autopsies: placeholder-as-label villainy celebrated with dramatic readings.

## 10–25 · Teaching block

**label + input.** `for`↔`id` pairing; the label IS the click-target — small screens demand it. Placeholder is a hint, never a label.
**Input zoo (the eight we bless).** text · email · tel · number · password · date · select · textarea — pick the type, the phone gives you the right keyboard for free.
**Group & announce.** fieldset+legend for radio groups · required + aria-describedby for help/error text · autocomplete attributes — browsers auto-fill and users weep with joy.
**A11y baseline.** Focus order = source order; visible focus; errors announced (aria-live for dynamic); never color-only error cues.

## 25–45 · Guided demonstration

Live: build a 5-field enquiry form with proper labels, autocomplete, tel pattern, fieldset radio ("Preferred contact: call/WhatsApp/email"), aria-describedby error note — submit to a free FormSubmit-class endpoint; confirmation state shown.

## 45–70 · Guided practice

Pairs: rebuild the worst form brought today — labels, types, autocomplete, validation hints, error text; keyboard-Tab through both forms; submit round-trip on the sandbox endpoint.

## 70–95 · Independent practice (+ project start)

Solo: **accessible contact/enquiry block** for your own project + start the multi-section project markup (hero/services/contact at minimum). File both to workbook. (This project grows through S12.)

## 95–110 · Correction & check

KC2: (1) Placeholder-as-label crime. (2) label/for pair. (3) `tel` type gift. (4) aria-describedby for. (5) aria-live for.

## 110–120 · Summary & next session

Forms are contracts — write them so humans can sign. S3: the box model, mastered.

## Answers — KC2

1. Placeholder disappears on typing; AT may never announce it. 2) Click-target + programmatic label. 3) Digit keyboard on mobile. 4) Associating help/error text with the field. 5) Announcing dynamic messages (errors/toasts) to screen readers.

## Homework (15 min)

Draw your project's homepage wireframe on paper — S4 turns it responsive.
