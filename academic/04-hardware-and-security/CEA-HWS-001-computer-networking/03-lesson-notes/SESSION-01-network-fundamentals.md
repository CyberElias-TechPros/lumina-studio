# CEA Lesson Note — CEA-HWS-001 · Session 1: Network Fundamentals

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-001-S1       |
| Version     | 1.0 · Session 1 of 6 · Week 1 |
| Status      | Draft — pending pilot         |

## 0–10 · Review & warm-up

Ask: "Internet down — who does what, in what order, here in this room?" Collect board answers; note how few involve measure-first.

## 10–25 · Teaching block

**LAN/WAN/internet.** LAN = your building (Ethernet/Wi-Fi, few hops) · WAN = connects LANs across towns/countries (fibre, microwave, leased line) · Internet = the LANs of LANs held together by peering — nobody "owns" it; providers buy and sell transit.

**The layered model (plain).** App → transport (process-to-process, ports) → network (addressing/routing, IP) → link (next-hop delivery, MAC) → physical (cables/radio). A page loading = ~100 layers of handshake you'll never see; troubleshooting walks these layers top-down.

**Cables & media.** Cat5e/6 UTP (1/10 Gbps, ≤100m), RJ45, straight-vs-crossover (auto-MDI-X today), fibre (long haul/high bandwidth), coax (legacies), Wi-Fi radio. Crimping: wire order T568B — practice on Thursday-class tooling.

## 25–45 · Guided demonstration

Instructor crimps two RJ45 plugs live (B standard), tests with a cable tester (pass/fail pairs shown), plugs into switch, pings its link-partner. Class calls out every wrong move they spot (often "cut the cable too long" first).

## 45–70 · Guided practice

Pairs crimp 2 cables each; test them; label with date + ends. Then map a printed office floorplan with cable runs and access-point spots (drafting before touching is the pro move).

## 70–95 · Independent practice

Solo: draw YOUR home or shop network — devices, uplinks, ISP point, Wi-Fi coverage guess; annotate weak spots. File to workbook.

## 95–110 · Correction & check

KC1: (1) LAN vs WAN. (2) Layer order, app to physical. (3) Cat6 max distance. (4) T568B first four wire colours. (5) Why fibre beats copper cross-campus.

## 110–120 · Summary & next session

Signals, media and miles. Next: the numbers that make them route — IP addressing.

## Answers — KC1

1. LAN = local building, few hops, privately owned; WAN = connects LANs across distance (carrier-built). 2) Application → Transport → Network → Link → Physical. 3) 100 m. 4) White-orange, orange, white-green, blue. 5) Bandwidth + distance without amplification + immunity to EMI.

## Homework (20 min)

Bring your ISP router brand/model to S2.
