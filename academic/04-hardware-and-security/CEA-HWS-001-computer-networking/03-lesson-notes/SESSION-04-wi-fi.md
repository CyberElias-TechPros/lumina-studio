# CEA Lesson Note — CEA-HWS-001 · Session 4: Wi-Fi

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-001-S4       |
| Version     | 1.0 · Session 4 of 6 · Week 2 |

## 0–10 · Review & warm-up

Firmware paths read out; two students already updated theirs — applause.

## 10–25 · Teaching block

**Standards & bands.** 802.11n/ac/ax (Wi-Fi 4/5/6); 2.4 GHz (range, wall-hugging, congested) vs 5 GHz (speed, less reach; band-steering hides choice). Channel: 1/6/11 non-overlapping on 2.4; 5 GHz picks least-used.

**SSID & security.** SSID = network name — hide it NOT (false security, client breakage); WPA2 minimum, WPA3 where supported, WPA/WEP = insult; strong random PSK for guest, separate WPA passphrase for staff, rotated yearly-ish; disable WPS PIN.

**Placement & coverage.** AP central, high, clear line-of-sight that matters; thick concrete/metal kills 5 GHz; walk test with a phone (signal dBm or app); one quality 5 GHz AP beats three cheap 2.4 extenders.

**Guest networks.** Client isolation ("AP isolation" — guests cannot see each other), bandwidth cap, separate VLAN from POS/till, login portal optional; perfection = staff fast + guests fed and corralled.

## 25–45 · Guided demonstration

Projected AP admin page: set SSID "GraceStores" WPA2 strong pass; enable guest SSID "GraceStores-Guest" isolated; captive-free simple PSK; channel scan; then a phone walks the room drawing the signal map on the whiteboard.

## 45–70 · Guided practice

Pairs: AP placement walk of the lab/academy floor — sketch best AP spot(s), worst corner, reposition simulated; propose guest SSID + VLAN tie-in consistent with S3 plan.

## 70–95 · Independent practice

Solo A1 finish: add Wi-Fi section to Grace Stores plan — SSIDs, passwords policy (role-based, not written on walls), placement, guest isolation, bandwidth note. File to workbook.

## 95–110 · Correction & check

KC4: (1) 2.4 vs 5 GHz trade. (2) Wi-Fi 5 = which 802.11? (3) SSID hiding myth. (4) WPA3 vs WPA2. (5) AP isolation purpose.

## 110–120 · Summary & next session

Radio is law-abiding physics. Next: the troubleshooting toolkit.

## Answers — KC4

1. 2.4 = range/walls, congested; 5 = speed/bandwidth, less reach. 2) 802.11ac. 3) Hidden SSIDs don't secure; they complicate clients and frustrate legitimate users. 4) WPA3 = modern auth + better key exchange; use where hardware allows; WPA2 acceptable with strong PSK. 5) Guests cannot reach each other or your LAN shares.

## Homework

Run a signal read around your home at 2 heights; note best/worst corners.
