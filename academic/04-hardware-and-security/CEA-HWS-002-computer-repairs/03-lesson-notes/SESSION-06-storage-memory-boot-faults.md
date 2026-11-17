# CEA Lesson Note — CEA-HWS-002 · Session 6: Storage, Memory & Boot Faults

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-002-S6       |
| Version     | 1.0 · Session 6 of 8 · Week 3 |

## 0–10 · Review & warm-up

Idle temps read out; one student's 78°C announcement saved their own machine — applause again.

## 10–25 · Teaching block

**Storage faults.** Click-click-click (mechanical death) · SSD SMART attr Reallocated Sectors > 0 = countdown ·
"disk not detected" — SATA data cable swap FIRST (50% fix), power lead next, then bench test in another machine;
noDetect ≠ dead drive, EVERY time.

**Memory faults.** Random crashes, blue screens with different stop codes, faults that move between addresses (same app, different beehive) → reseat, one stick at a time, MemTest86 (one error = bad stick, retire it); mixing gens sometimes seats but never POSTs.

**Windows boot chain.** Power → firmware (BIOS/UEFI, F2/DEL) → boot device order → bootloader (rewrite with `bcdboot C:\Windows /s C:` from recovery USB if "no bootable device") → kernel → sign-in.
Recovery boot: F11/F8/Shift+Restart → Startup Repair; `chkdsk /f`; `sfc /scannow`; `DISM`; restore point; last resort clean reinstall (BACKUP FIRST — remind every cohort, forever).

**Driver faults.** Device Manager yellow bangs; roll back recent driver first; vendor site > generic Windows drivers for GPU/chipset; `devmgmt.msc` — bookmark it.

## 25–45 · Guided demonstration

Three bench cases: (A) SATA data cable swap — dead drive alive; (B) one RAM stick MemTest86 error — retiring it fixes the crash lottery;
(C) "no bootable device" → recovery USB → `bcdboot` → normal boot. All projected.

## 45–70 · Guided practice

Pairs rotate fault cards A/B/C (cable, RAM, boot) with sheets; swap after each; debrief on classic wrong turns ("I reinstalled Windows before checking the cable — never again").

## 70–95 · Independent practice

Solo: write **A1** — diagnosis essays on three provided recorded fault logs (event viewer + photos), each 150–250 words with reasoning chains. File to workbook.

## 95–110 · Correction & check

KC6: (1) First storage-fault move. (2) Click-click-click means? (3) One memtest error = ? (4) bcdboot job. (5) Roll-back-driver rule of thumb.

## 110–120 · Summary & next session

Cables before formats, memory before motherboards. Next: the OS side — install, drivers, backup, accounts.

## Answers — KC6

1. Swap SATA data + power leads; bench-test elsewhere; check BIOS detection. 2) Mechanical head/platter failure — image the data NOW, then replace. 3) Bad stick — remove and retire. 4) Writes a fresh Windows boot configuration to the system partition. 5) Newest driver broke it — roll back first, update second, reinstall last.

## Homework (10 min)

Run `sfc /scannow` on your own machine if it is healthy; screenshot the result.
