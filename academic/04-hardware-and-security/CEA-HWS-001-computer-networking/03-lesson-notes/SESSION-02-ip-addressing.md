# CEA Lesson Note — CEA-HWS-001 · Session 2: IP Addressing

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-001-S2       |
| Version     | 1.0 · Session 2 of 6 · Week 1 |

## 0–10 · Review & warm-up

ISP reconnaissance: 3 findings read aloud (brand, default gateway sticker, Wi-Fi label).

## 10–25 · Teaching block

**IPv4.** `A.B.C.D` dotted-quad, each 0–255 (32 bits); private ranges 10/8, 172.16/12, 192.168/16 (your LAN lives here). IPv6 — the big one: 128-bit, hextets, written with "::" compression; only awareness needed here, your ISP may deploy both (dual-stack).

**Subnet masks.** `/24` (255.255.255.0) = 254 usable hosts; `/16` = ~65k; `/30` = point-to-point link pair. Splitting networks: one /24 into two /25s gives two 126-host networks — the arithmetic clicks with the printed worksheet (practice, not panic).

**DHCP.** Router hands out addresses dynamically (lease time, range, gateway, DNS). Static reservation = same address always for servers/printers. Static = typed by hand for gear that must never move (router itself, NAS).

**NAT.** Private range hides behind ONE public address at the router; every home shares it. Port forwarding/DMZ concepts awareness; NAT is why Nigeria has 2 addresses and your laptop has a home address.

## 25–45 · Guided demonstration

Projected router admin page: DHCP range set 192.168.1.100–199; reservation for "accountant-PC" → .150; gateway .1; DNS auto → verify from a laptop `ipconfig` / `ip addr` (Windows & Linux views).

## 45–70 · Guided practice

Pairs: subnet worksheet — given 192.168.10.0/24, carve three /26 networks; assign gateway, DHCP start/end; verify on paper then on lab router.

## 70–95 · Independent practice

Solo A1 start: design addressing for **Grace Stores 12-person office** (router .1; servers two statics; DHCP pool .100–.250; guest VLAN separate). File scaffold to workbook.

## 95–110 · Correction & check

KC2: (1) Dotted quad, four decimal ranges. (2) What /24 means. (3) DHCP vs static reservation. (4) NAT's one-line job. (5) Two private ranges.

## 110–120 · Summary & next session

Numbers with passports. Next: routers, switches, VLANs — the traffic police.

## Answers — KC2

1. A.B.C.D, each 0–255. 2) 24 bits network, 8 bits host (255.255.255.0), 254 usable. 3) DHCP = automatic leased; reservation = same IP each time for a named MAC/device. 4) Many private addresses share one public address outbound. 5) Any two: 192.168.x.x, 10.x.x.x, 172.16–31.x.x.

## Homework

Find your home PC's IP, gateway and DNS (ipconfig) — write them on paper, bring to S3.
