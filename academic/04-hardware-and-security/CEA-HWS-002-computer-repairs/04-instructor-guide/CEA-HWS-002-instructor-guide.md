# CEA Instructor Guide — CEA-HWS-002 Computer Repairs

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-GUI-HWS-002           |
| Version     | 1.0 · **Instructor use**      |
| Status      | Approved v1.0 — pending pilot |

**Do not distribute.** Keys in Section 7.

## 1. What this course is

A live repair bench with a pause button. The lab stops being scary in S2 and becomes trusted craft by S3.
Every delta between success and bench-fire is preparation — your morning bench checklist is the course.

## 2. Preparation

Donor machines (desktops + laptops, varied), bench PSU, PSU tester, thermal paste, isopropyl 99%, lint-free,
air dusters, ESD straps + mats, screw trays, labels, USB installers pre-built, printed intake/job cards, camera for documentation.

## 3. Delivery model

105 min: 0–10 story · 10–25 teach at bench · 25–45 demo · 45–70 guided bench · 70–95 solo · 95–110 KC · 110–120 close.

## 4. Failure points

- S3: fans span with unregulated air — demonstrate "hand-hold fan while blowing".
- S4: "Buddy grabs the same-gen laptop stick for the desktop" — DIMM/SO-DIMM forever confused without the notch demo.
- S5: paperclip test attempted by students unsupervised — DEMO ONLY, you do it, they watch.
- S6: reinstall-before-cable-check — the cardinal sin; role-play the humiliation of that phone call.
- S8 gate: hands on open mains-powered machine = gate stop, every time.

## 5. Assessment guidance

A1: reasoning quality of diagnosed logs — not parts lists. Final: P1–P6 safety-anchored; gate = safety witnessed

- machine works OR honest documented triage (an honest "unrepairable this bench" with reasons is a competent outcome; an unsafe repaired one is not).

## 6. Equity & access

Fine motor challenges: seat desktop boards with trays; magnifier lamps; left-handed screwdriver sets; every step checkable verbally.

## 7. Knowledge-check keys

KC1: 1) Volatile vs persistent. 2) BIOS/clock keeper. 3) Fast NVMe SSD slot. 4) Self-test with beep/error codes. 5) AC→DC rails.
KC2: 1) Remove battery, verify dead. 2) Silently. 3) Never open — replace as unit. 4) Laptop vs desktop form factor. 5) Tab, not wire.
KC3: 1) Plugs + photos first. 2) Short bursts, aim dust out. 3) Wipe all old paste to bare metal. 4) Count out = count in. 5) Before case close.
KC4: 1) Generation notch. 2) Slowest common speed. 3) PCIe lanes ~6× faster. 4) Clone → verify → wipe. 5) BIOS capacity + health tool.
KC5: 1) Known-good socket. 2) Green-to-black fan test; demo-only. 3) Click-click-both-sides. 4) Heat. 5) Recycle it.
KC6: 1) Swap SATA leads. 2) Mechanical death. 3) Bad stick — retire. 4) Boot configuration rewrite. 5) Newest first — roll back.
KC7: 1) Official media. 2) Chipset→LAN→GPU→audio→peripherals. 3) Open two files before wipe. 4) Standard. 5) Any fake-fix named.
KC8: 1) Intake→diagnose→fix/verify→service→handover. 2) Data-risk acknowledgement signed. 3) Power/display/heat. 4) 3-month labour. 5) Plain words, no oversell.

## 8. Expected outputs & calibration

S3: cleaning logs with before/after temps. S6: fault cards by rotation, sheets filed. S8: two-witness gate sign-offs.

## 9. Rubric (0–4)

0 unsafe/cannot · 1 heavy prompts · 2 completes with errors · 3 unaided correct · 4 unaided correct + teaches safety aloud. Gate: safety witnessed, absolute.
