# CEA Lesson Note — CEA-HWS-003 · Session 5: Networks & Wi-Fi Security

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-003-S5       |
| Version     | 1.0 · Session 5 of 8 · Week 3 |

## 0–10 · Review & warm-up

Two phishing-text examples read out; room adds missing flags.

## 10–25 · Teaching block

**Your home/shop perimeter = one box and its password.** Router admin password (default admin/admin is an open door) · firmware current ·
WPS PIN disabled (8-digit brute force) · WPA2 strong/WPA3 · guest SSID isolated from till/POS · UPnP off (auto-port-opening party) · remote admin off ·
router UI check monthly (devices list — find the stranger).

**Public Wi-Fi.** Assume hostile: no banking on public Wi-Fi · HTTPS-only assumption (padlock) · VPN for anything sensitive ·
"Free Airport WiFi" twin SSIDs (evil twin) — captive portal looks same but logs all.

**Firewalls.** Router NAT is a basic firewall (unsolicited inbound dropped) · host firewall (Windows Defender Firewall) on always ·
application asked to accept inbound connection from internet = no, unless you know why.

**IP addresses & exposure.** Your public IP = your building's number — attackers scan the whole internet constantly;
port forwarding only for services you defend (none at home); carrier NAT saves some, but discipline saves the rest.

## 25–45 · Guided demonstration

Projected router UI: change admin password → disable WPS → check firmware → guest SSID on, isolated → UPnP off →
devices list with one stranger found → kick + rotate Wi-Fi password live.

## 45–70 · Guided practice

Pairs: **router hardening checklist** on printed sheets — score a projected screenshot-pack of a messy router page (find 10 faults) + one home router each on printed walkthrough photos.

## 70–95 · Independent practice

Solo A1 continuation: add **network section** to home audit — photos/checkmarks for the 8 hardening steps above; mark which can't apply (e.g. ISP routers) and why. File to workbook.

## 95–110 · Correction & check

KC5: (1) First router fix. (2) WPA3 vs WPA2 vs open. (3) Guest isolation means. (4) Evil twin definition. (5) UPnP risk.

## 110–120 · Summary & next session

The air is a shared wire — act like it. Next: locks on the wire itself — encryption.

## Answers — KC5

1. Change default admin password. 2) Encryption on (WPA3 best) > none; "open" = drive-by. 3) Guest cannot reach LAN devices/POS. 4) Fake AP cloning a legit SSID to harvest traffic. 5) Auto-opens ports for programs without consent — lateral movement paradise.

## Homework (10 min)

Check your own router against the 8-point checklist; photo what you fixed.
