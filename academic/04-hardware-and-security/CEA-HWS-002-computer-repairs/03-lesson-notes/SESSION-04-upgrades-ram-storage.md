# CEA Lesson Note — CEA-HWS-002 · Session 4: Upgrades: RAM & Storage

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-002-S4       |
| Version     | 1.0 · Session 4 of 8 · Week 2 |

## 0–10 · Review & warm-up

Upgrade pitches read aloud; room grades feasibility + price-reason.

## 10–25 · Teaching block

**RAM.** Compatibility first: DDR generation (DDR4 vs DDR5 — notch position), speed (MHz), form factor (DIMM/SO-DIMM),
max capacity in board manual; mixed sticks run at slowest common speed (sometimes refuse entirely); slot order A1/B1 etc.;
reseat doubles as a diagnostic (clean gold fingers with rubber eraser).

**Storage.** HDD → SSD swap = biggest single felt upgrade ever; SATA SSD clones with Macrium-class free tools;
NVMe M.2 on modern boards (check lanes: Gen3 vs Gen4); NVMe > SATA always when the slot exists; clone THEN verify boot
BEFORE wiping the old drive — never trade a working boot for a gamble.

**Verification.** After upgrade: BIOS sees new RAM/SSD (capacity listed) · stress memory (MemTest86 USB or Windows Memory Diagnostic) ·
CrystalDiskInfo health % · boot from new drive, then re-verify after reformat if cloned · document the serials swapped.

## 25–45 · Guided demonstration

Open a donor: check DDR gen (notch), speed label, available slots → install 8GB SO-DIMM/DIMM; boot POST shows amount;
check NVMe slot → clone SATA→NVMe (projected) with free cloning tool; boot new drive; benchmark boot time before/after on the whiteboard.

## 45–70 · Guided practice

Pairs: RAM reseat drill on two boards (spot the bent contacts), install provided sticks; SSD clone on a VM-less bench using
prepared image (no personal data); verify capacity in BIOS + health tool.

## 70–95 · Independent practice

Solo A-prep: write **upgrade quote** — two quotes (RAM+SSD vs SSD-only) for a customer with a 4-year-old laptop;
include parts + labour + warranty line ("3 months on the work"). File to workbook.

## 95–110 · Correction & check

KC4: (1) DDR notch trick. (2) Mixed sticks run how? (3) NVMe vs SATA. (4) Clone-then-verify order. (5) Two post-upgrade verifications.

## 110–120 · Summary & next session

New memory, old machine — miracle optional. Next: the faults — power, display, heat.

## Answers — KC4

1. DDR gen ≠ compatible generations interchangeable — notch positions differ physically OUT both ways. 2) At the slowest common speed; sometimes the pair refuses — match pairs when possible. 3) NVMe rides PCIe lanes (~3–7 GB/s), SATA caps ~550 MB/s. 4) Clone, verify boots, ONLY then erase/retire old drive. 5) BIOS capacity listing + MemTest/CrystalDiskInfo health; occasional stress for stability.

## Homework (10 min)

Check `msinfo32` / Task Manager for YOUR machine's RAM amount, speed, slots used.
