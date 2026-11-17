# CEA Lesson Note — CEA-HWS-004 · Session 2: Structured Troubleshooting

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-004-S2       |
| Version     | 1.0 · Session 2 of 6 · Week 1 |

## 0–10 · Review & warm-up

Two stories read out; room names the missing structured step in each.

## 10–25 · Teaching block

**The ladder.** (1) REPRODUCE — make it fail again in front of you; if you can't, the ticket is half-solved verbally. (2) ISOLATE — what changed? (updates, new software, Wednesday's thunderstorm) — breadth diagonally sources: user, machine, network, service. (3) FIX — smallest change first: restart, cable, profile, reinstall. (4) CONFIRM — prove it at THEIR seat on THEIR account, then watch THEM do it once. (5) NOTE — the ticket fields matter.

**Five classic isolating questions.** When? (after what happened) · Who/what else affected? · What changed? · Error message, exactly? · Tried anything? (never mock "did you restart?").

**One-change rule.** Two changes at once = never knowing which fixed it = tomorrow's mystery.

## 25–45 · Guided demonstration

Projected ticket: "Accountant says the shared drive vanishes every 11:30" — instructor walks the ladder live: reproduce (drive map gone) → isolate (11:30 backup job locks file) → fix (exclude mapped drive / reschedule backup) → confirm (tomorrow's 11:30 check with her) → note.

## 45–70 · Guided practice

Pairs: three practice tickets ("Wi-Fi drops when microwave runs", "POS freezes after Sunday update", "New user can't see the printer") — reproduce-isolate-fix-confirm on paper, swap, critique the isolation breadth.

## 70–95 · Independent practice

Solo: build **your personal 3-ask card** — the first three questions you will ask for ANY ticket, tailored to offices you know. File to workbook.

## 95–110 · Correction & check

KC2: (1) Four ladder steps. (2) Why reproduce before fixing. (3) "What changed?" — three change classes. (4) Confirm definition. (5) Escalate when?

## 110–120 · Summary & next session

Sequence beats smarts. Next: the humans — voices, fears and the infamous "it worked yesterday".

## Answers — KC2

1. Reproduce, isolate, fix, confirm. 2) A fix without reproduction is superstition; you cannot verify a cure you never saw needed. 3) Software update · hardware/cabling event · environment (power/network/season). 4) Working at the user's seat, their account, witnessed by them. 5) When two diagnosed-attempt cycles fail, or anything security/legal touches, or your SLA will breach.

## Homework (10 min)

Tomorrow, listen to ONE person describe their IT problem and count your urges to interrupt.
