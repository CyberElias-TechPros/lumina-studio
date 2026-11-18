# CEA Lesson Note — CEA-HWS-001 · Session 3: Routers & Switches

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-001-S3       |
| Version     | 1.0 · Session 3 of 6 · Week 2 |

## 0–10 · Review & warm-up

Three paper readouts: room says classful/private/whatever — every answer defended.

## 10–25 · Teaching block

**Switches (L2).** Learn MAC addresses per port; forward frames only where needed; flood unknowns;
loop prevention (STP) awareness; PoE for phones/APs; managed vs unmanaged.

**Routers (L3).** Connect LANs to WAN/internet; NAT; DHCP server; firewall-lite; Wi-Fi in combo units.
Own your default gateway or it owns your shop.

**Configuration walkthrough.** Admin page conventions: LAN/DHCP, WAN (PPPoE vs DHCP vs static ISP), port forwarding, firmware update FIRST (security), change default admin password, disable WPS PIN (brute-force bait).

**VLANs (concept + demo).** Logical LAN split on one physical switch — staff VLAN 10, guest VLAN 20, cameras VLAN 30; ports assigned tagged/untagged; inter-VLAN only via router (or L3 switch); why: broadcast control + security + sanity when the printer gossips.

## 25–45 · Guided demonstration

Lab bench: 8-port managed switch; configure VLAN 10 (ports 1–4) and VLAN 20 (ports 5–8); trunk to router; verify no ping between VLANs; change admin password; firmware check; reboot.

## 45–70 · Guided practice

Pairs on the lab bench: replicate the two VLANs, patch two laptops into them, attempt cross-VLAN ping (must FAIL), then router-allow it and re-test (must PASS). Log configs on the paper sheet.

## 70–95 · Independent practice

Solo: label a printed switch faceplate for the Grace Stores plan (which port = which VLAN + two spare) + write the config checklist (factory reset → password → firmware → VLANs → DHCP → save). File to workbook.

## 95–110 · Correction & check

KC3: (1) Switch works at which layer? Router? (2) VLAN 10 vs VLAN 20 isolation — why? (3) First firmware-before-anything rule. (4) WPS PIN risk. (5) Why document ports.

## 110–120 · Summary & next session

Packets need addressed roads, not just roads. Next: the radio — Wi-Fi done properly.

## Answers — KC3

1. Switch Layer 2, router Layer 3. 2) Separate broadcast domains and security boundaries — guest cannot see till PCs. 3) Unpatched gear = known exploits on day one. 4) 8-digit brute force — disable it, always. 5) The 2am fault call starts with "which port is till-PC?"

## Homework (15 min)

Check your home router's firmware version and note the menu path.
