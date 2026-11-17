# CEA Lesson Note — CEA-HWS-002 · Session 5: Power, Display & Heat Faults

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-002-S5       |
| Version     | 1.0 · Session 5 of 8 · Week 3 |

## 0–10 · Review & warm-up

`msinfo32` screenshots shown; three students already found their empty slot — curiosity achieved.

## 10–25 · Teaching block

**No power at all.** Ladder: wall socket (known-good lamp/tester!) → IEC cord → PSU switch → front-panel switch (LED?) → PSU fan twitch/no-twitch (death rattle fans don't spin) →
24-pin wiggle → paperclip test on any 24-pin PSU (green to any black — fan spins = alive, safely demoed only) → dead PSU (swap) vs board (burnt smell, bulged caps, no 3.3/5/12V rails).

**Fans spin, no display.** Reseat RAM (click both) → one-stick mode → CMOS reset (remove battery 30s) → GPU reseat / onboard video test → listen for DRAM beeps → PSU amber light vs green.

**Overheating.** Symptoms: slow then sudden shutdown at 90–100°C, loud fans, visible crust on fins. Causes: dust dam, dead fan (hand-test spin after unplug), dried paste,
blocked vents. Fixes: clean (S3), repaste, fan swap; verify with HWMonitor before/after; if shutdowns persist on bench — board issue, escalate.

**Power supply triage unplugged truth.** Never hands inside a plugged PSU; swap-test is the professional answer to "is it the PSU?"; suspect PSU + no fan = do not poke deeper.

## 25–45 · Guided demonstration

Three bench faults: (A) unplugged IEC (the room laughs, then respects it), (B) RAM half-seated — POST beeps → reseat → boot, (C) heat-fault donor laptop with crusted fins → clean → temps drop 15°C.

## 45–70 · Guided practice

Pairs rotate benches A/B/C with fault sheets; log each diagnosis (symptom → hypothesis → change → verify) — swap after each card.

## 70–95 · Independent practice

Solo: write **fault story #1** — a real-or-practice power/display case in the four-line format (symptom/hypothesis/fix/proof). File to workbook.

## 95–110 · Correction & check

KC5: (1) First no-power step. (2) Paperclip test purpose + safety. (3) RAM reseat trick — two words. (4) 90°C shutdown likely cause. (5) PSU smelling burnt — action.

## 110–120 · Summary & next session

Measure, don't poke. Next: storage, memory and the boot chain.

## Answers — KC5

1. Known-good socket + IEC cord — 50% of "power faults" die here. 2) Short PSU green-to-black to check fan spins; demo-only, unplugged, no touching internals. 3) Click, both ends. 4) Heat — dust dam, dead fan or dried paste. 5) Recycle, never open; power it away from combustibles.

## Homework (10 min)

Check your machine's CPU temp at idle (HWMonitor/BIOS) and write it down.
