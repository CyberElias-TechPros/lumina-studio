# CEA Lesson Note — CEA-HWS-001 · Session 5: Troubleshooting Tools

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-001-S5       |
| Version     | 1.0 · Session 5 of 6 · Week 3 |

## 0–10 · Review & warm-up

Signal walks read out; two placement stories shared.

## 10–25 · Teaching block

**The ladder, always.** (1) Physical — cable in? Link lights on? (2) Link layer — NIC talking (ipconfig shows 169.254.x.x = APIPA = no DHCP!). (3) Local IP — can I ping my gateway? (4) Internet — ping 8.8.8.8. (5) DNS — ping google.com (fails with IP-ping-OK = DNS broken). (6) Application/service. Never skip step 1 to fix step 5.

**ping & tracert.** `ping 192.168.1.1` (gateway) → `ping 8.8.8.8` → `ping google.com`. tracert (Win) / traceroute (Linux) — where packets stop; first dead hop localises half your problem.

**DNS problems.** Symptoms: IP-ping works, name-ping fails; one site down vs all sites down; fix: change DNS to 1.1.1.1/8.8.8.8 test; flush `ipconfig /flushdns`; router DNS field may hold dead ISP DNS.

**DHCP problems.** 169.254.x.x on the laptop; fix: `ipconfig /release` → `/renew`; check router DHCP pool not exhausted (only 40 leases taught); Scope exhausted = raise range or shorten lease.

**Reading router status pages.** WAN IP (public, dynamic or static?) · uptime (reboots?) · connected devices list (find the stranger) · logs (disconnect storms) · firmware · DHCP leases table (your friend when hunting an abusive MAC).

## 25–45 · Guided demonstration

Instructor faults the lab: unplug WAN → diagnose by ladder → replug → flush DNS → renew lease → re-ping. Then second fault: DNS set to 192.0.2.1 → symptom shown → fix shown. Narration strictly ladder-ordered.

## 45–70 · Guided practice

Pairs: three fault cards on isolated lab benches — (A) unplugged cable, (B) 169.254 address, (C) DNS dead — each pair works by ladder, logs time per step, checks with the shell tools, clears and cards reset.

## 70–95 · Independent practice

Solo: write your **personal ladder card** (pocket-size) for YOUR home/shop: exact commands, exact expected outputs, exact first moves. File to workbook.

## 95–110 · Correction & check

KC5: (1) First step of any fault ladder. (2) 169.254.x.x means? (3) IP-pings-OK name-fails = ? (4) ipconfig /release+renew does? (5) Router WAN IP page tells two things.

## 110–120 · Summary & next session

Measure, then move. Next session: controlled fault chaos — the final practical.

## Answers — KC5

1. Physical/link lights. 2) No DHCP reached — APIPA fallback address. 3) DNS failure. 4) Drops lease and asks fresh from DHCP. 5) Whether the router has a public address at all + uptime/reboot history.

## Homework

Sleep well — S6 is hands-on and your hands are the tool.
