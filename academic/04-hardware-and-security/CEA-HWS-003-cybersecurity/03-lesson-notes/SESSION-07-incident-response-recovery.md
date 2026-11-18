# CEA Lesson Note — CEA-HWS-003 · Session 7: Incident Response & Recovery

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-003-S7       |
| Version     | 1.0 · Session 7 of 8 · Week 4 |

## 0–10 · Review & warm-up

Device-encryption screenshots waved; any holdouts get the 5-minute fix now.

## 10–25 · Teaching block

**The incident sequence (NIST-shaped).** Detect (alerts, weirdness, user reports) → Contain (disconnect network, disable account — stop the spread FIRST, forensics second) →
Eradicate (kill the malware/change creds) → Recover (restore from KNOWN-GOOD backup, monitor) → Learn (timeline, root cause, written after-action).

**What YOU do at 2am.** See strange transfer out? Disconnect internet (pull WAN/Wi-Fi, NOT power button yet) → call bank/IT →
change passwords from ANOTHER clean device → report to police-cybercrime if theft of funds · SIM swap suspected → call telco first, then bank.

**Backups that save lives.** 3-2-1 rule: 3 copies, 2 media, 1 offsite/offline · ransomware targets backups — offline copies survive ·
test restores quarterly (an untested backup is a lottery ticket) · WhatsApp chats export ≠ backup of phone; photos to cloud + external drive both.

**Reporting without shame.** Faster report = smaller blast radius; organizations reward reporters, punish hiders; for personal incidents: bank fraud line + police cybercrime portal + telco block for SIM.

## 25–45 · Guided demonstration

Projected tabletop: "Grace Stores' WhatsApp business line posts a betting link at 3am" — class walks it live: detect (customer call) → contain (phone offline) →
find cause (staff account + malicious APK) → eradicate (reinstall, rotate) → recover (restore contacts/catalog from backup) → learn (policy: no sideloaded apps).

## 45–70 · Guided practice

Pairs tabletop four cards: (A) laptop stolen with bank app · (B) fake login email consumed by staff · (C) ransomware note on shared drive · (D) Your own debit-alert you didn't make. Two minutes each; narrate the sequence; debrief.

## 70–95 · Independent practice

Solo: write **IR card** — your wallet-size plan for YOUR life: numbers for bank/telco/police cybercrime · backup map of your 5 critical data pools · one "first 3 moves" line per asset class. File to workbook.

## 95–110 · Correction & check

KC7: (1) Contain before forensics — why. (2) 3-2-1 backup rule. (3) Untested backup is? (4) SIM-swap first call. (5) After-action contains what.

## 110–120 · Summary & next session

Panic is the attacker's ally; sequence is yours. Next: the paperwork of trust — policies and your final assessment.

## Answers — KC7

1. Every minute connected costs more than any clue gained — stop the bleeding. 2) 3 copies, 2 media, 1 offsite. 3) A lottery ticket. 4) Your TELCO (block the SIM before bank). 5) Timeline, root cause, what changes, who signs off.

## Homework (10 min)

Find and verify one backup you already have — open it, restore one file.
