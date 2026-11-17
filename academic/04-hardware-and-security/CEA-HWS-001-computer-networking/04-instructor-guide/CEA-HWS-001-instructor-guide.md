# CEA Instructor Guide — CEA-HWS-001 Computer Networking

| Field       | Value                    |
| ----------- | ------------------------ |
| Document ID | CEA-ACA-GUI-HWS-001      |
| Version     | 1.0 · **Instructor use** |
| Status      | Draft — pending pilot    |

**Do not distribute.** Keys in Section 7.

## 1. What this course is

A cabling-and-addressing rehearsal studio. The final is twenty minutes of pressure; the six sessions exist so
faces stay calm in it. Fix your lab before class every time — a dead lab humiliates nobody but wastes everybody.

## 2. Preparation

Bench: 1 managed 8-port switch, 1 router/AP combo, 2 test laptops, cables + crimping kit + cable testers,
printed fault cards (A/B/C), floor plan, ladder poster, T568B poster, firmware screenshots, spare power.

## 3. Delivery model

105 min: 0–10 war story · 10–25 teach (whiteboard) · 25–45 demo · 45–70 guided lab · 70–95 solo/sim · 95–110 KC · 110–120 close.

## 4. Failure points

- S2: subnet arithmetic meltdown — worksheet first paper-only, machines after.
- S3: unmanaged switch used for VLANs — the demo silently fails; verify gear before class.
- S4: student PSKs weak ("password123") — enforce the strong-pass rule visibly.
- S5/S6: students skip physical layer — the ladder poster goes up; no ladder, no tools.

## 5. Assessment guidance

A1 plan: completeness (addressing, VLANs, Wi-Fi, guest) judged; final lab gate by connectivity tests +
fault card sheet; two assessors witness the gate; never coach during the fault card — observation only.

## 6. Equity & access

Low-vision: large-print rack labels; left-handed crimping positions; hearing-impaired can follow visual testers fully; no colour-only pass/fail without a tone.

## 7. Knowledge-check keys

KC1: 1) LAN private/local, WAN carrier links LANs. 2) App→Transport→Network→Link→Physical. 3) 100 m. 4) W/O, O, W/G, Bl. 5) Bandwidth + no EMI + distance.
KC2: 1) A.B.C.D each 0–255. 2) /24 = 8 host bits, 254 usable. 3) DHCP auto lease; reservation = fixed IP per device. 4) Many privates share one public outbound. 5) Any two: 10/8, 172.16–31/12, 192.168/16.
KC3: 1) L2 vs L3. 2) Broadcast + security boundary. 3) Unpatched = owned. 4) 8-digit brute-force. 5) 2am call starts there.
KC4: 1) 2.4 range/5 speed. 2) 802.11ac. 3) Hidden ≠ secure. 4) WPA3 preferred; WPA2 w/ strong PSK OK. 5) Guests isolated from each other + LAN.
KC5: 1) Physical/link lights. 2) APIPA — no DHCP. 3) DNS. 4) Drop + re-request lease. 5) Public IP present? uptime/reboots.
KC6: 1) Physical→link→gateway→8.8.8.8→DNS→app. 2) Falsify cheap/fast. 3) Isolate cause. 4) Symptom gone AT THE USER'S SEAT. 5) Next tech / future-you.

## 8. Expected outputs & calibration

S3: VLAN isolation witnessed per pair. S6: gate witnessed; fault-sheet timing recorded; disagreement → third assessor.

## 9. Rubric (0–4)

0 cannot · 1 heavy prompts · 2 completes with errors · 3 unaided correct · 4 unaided correct + explains layers why. Gate: end-to-end + fault card.
