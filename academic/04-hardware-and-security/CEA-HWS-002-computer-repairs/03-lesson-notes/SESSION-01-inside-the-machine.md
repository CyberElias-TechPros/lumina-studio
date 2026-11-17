# CEA Lesson Note — CEA-HWS-002 · Session 1: Inside the Machine

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-002-S1       |
| Version     | 1.0 · Session 1 of 8 · Week 1 |
| Status      | Approved v1.0 — pending pilot |

## 0–10 · Review & warm-up

Ask: "What does a computer do first when you press power?" Collect answers (fans, lights, "wakes up");
reveal: the PSU converts wall power, the motherboard POST-checks, beeps or lights — then the CPU starts fetching instructions.

## 10–25 · Teaching block

**The core seven.** Motherboard (city grid) · CPU (brain — fetches/decodes/executes; heatsink+fan on top) ·
RAM (fast chalkboard — volatile; no persistent storage) · Storage (HDD spinning platters vs SSD flash — persistent) ·
GPU (graphics muscle; many CPUs have integrated) · PSU (wall 240V → 12/5/3.3V rails inside) · CMOS battery
(coin cell keeping clock/BIOS settings alive with no mains).

**Ports & slots.** USB-A/C, HDMI/DP/VGA, Ethernet, audio jacks, PCIe x16 (GPU), M.2 NVMe slot (modern SSDs),
RAM DIMM slots, SATA power+data, 24-pin ATX + 8-pin CPU power.

**Failure signatures preview.** Fans spin, no display → RAM/GPU/POST. Click-click-click → HDD dying. Won't power at all
→ PSU/motherboard/switch. Random reboots → heat/PSU. Slow boots → storage HDD/failing drive. Each we diagnose later.

## 25–45 · Guided demonstration

Instructor unboxes a donor desktop on the bench: powers off/unplug, opens side panel, narrates every component
(named, touched, photographed), tests PSU switch colour (red/black flip trick for "jump start" — demo only, reference-only).

## 45–70 · Guided practice

Pairs: **component scavenger hunt** — bench of dead machines (shells opened); identify CPU, RAM slots, M.2, CMOS battery,
PSU rails, SATA connectors; tag each with a flag sticker; compare with key sheet.

## 70–95 · Independent practice

Solo: label your **worksheet A** (blank motherboard line drawing) with 12 parts + one failure signature each. File to workbook.

## 95–110 · Correction & check

KC1: (1) RAM vs storage — volatile or not? (2) CMOS battery job. (3) M.2 slot function. (4) POST beeps mean what? (5) PSU does what conversion.

## 110–120 · Summary & next session

City grid + brain + chalkboard. Next: laptops differ — batteries, flex cables and heat pipes.

## Answers — KC1

1. RAM volatile, storage persistent. 2) Keeps BIOS settings + clock when unplugged. 3) Modern NVMe SSD — fast PCIe lanes. 4) POST = power-on self-test; beep codes name the missing/failed component. 5) AC mains → DC rails (12/5/3.3 V) for everything inside.

## Homework (15 min)

Open a case at home (unplugged!) and name three things without touching.
