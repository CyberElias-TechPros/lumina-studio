# CEA Course Specification — CEA-HWS-001 Computer Networking

| Field          | Value                                                                         |
| -------------- | ----------------------------------------------------------------------------- |
| Institution    | Cyber Elias Academy                                                           |
| Document ID    | CEA-ACA-SPEC-HWS-001 · Course CEA-HWS-001                                     |
| Version        | 1.0                                                                           |
| Status         | Approved v1.0 — pending pilot                                                 |
| Prepared by    | CEA academic development                                                      |
| Reviewed by    | Cyber Elias (Owner), 2026-11-16 · Approved by Cyber Elias (Owner), 2026-11-16 |
| Effective date | 2026-11-16 · Review date 2027-02-16                                           |

## 1. Identity

- **Title:** Computer Networking · **Department:** Hardware & Security · **Level:** Intermediate
- **Duration:** 3 weeks · 6 sessions · 2/week · 105 min · **630 guided minutes**
- **Fee:** ₦50,000 · **Cohort:** max 12 (hands-on limit)
- **Delivery:** On-site lab; unmanaged and semi-managed switches, access-point/router lab units, patch panels, cabling kits, test laptops

## 2. Description

From "the internet is down" to a documented, addressed, secured mini-office network you built yourself:
LAN/WAN concepts, cabling, IPv4 addressing and subnetting basics, router/switch configuration, Wi-Fi
standards and security, guest networks, and systematic troubleshooting with ping/tracert/DNS/DHCP tools.

## 3. Purpose

Every office runs on a network someone had to think about. This course produces the deliberate thinker — the
person who can wire, address, segment and fix a 10-person shop without guessing.

## 4. Audience

IT support staff formalising knowledge · repairs technicians expanding services · office admins inheriting network duty · serious homelabbers.

## 5. Entry requirements

CEA-HWS-004 or strong computer-repairs foundation helpful, not mandatory · basic TCP/IP vocabulary intro supplied in week 1.

## 6. Learning outcomes

1. Explain packet journey in plain terms on LAN, WAN, NAT and the layered model.
2. Plan and implement an addressing scheme with subnet masks, DHCP ranges and static reservations.
3. Configure a small-office router/switch (VLANs, ports, SSIDs, guest network) and secure Wi-Fi.
4. Troubleshoot systematically: ping, tracert, DNS, DHCP, router status pages; document faults and fixes.

## 7. Competency map

| #   | Competency                     | Taught | Assessed by         |
| --- | ------------------------------ | ------ | ------------------- |
| C1  | Network concepts & media       | S1     | KC1; workbook       |
| C2  | Addressing & subnetting        | S2     | KC2; practical test |
| C3  | Router/switch & VLANs          | S3     | KC3; lab            |
| C4  | Wi-Fi & security               | S4     | KC4; lab            |
| C5  | Troubleshooting tools & method | S5–S6  | Final project       |

## 8. Session breakdown

| #   | Week | Title                             | Slug                              |
| --- | ---- | --------------------------------- | --------------------------------- |
| 1   | 1    | Network Fundamentals              | network-fundamentals              |
| 2   | 1    | IP Addressing                     | ip-addressing                     |
| 3   | 2    | Routers & Switches                | routers-switches                  |
| 4   | 2    | Wi-Fi                             | wi-fi                             |
| 5   | 3    | Troubleshooting Tools             | troubleshooting-tools             |
| 6   | 3    | Network Troubleshooting Practical | network-troubleshooting-practical |

Week themes (site-aligned): Fundamentals · Configuration · Troubleshooting.

## 9. Practical exercises

Cabling and crimping lab (S1) · addressing plan studio (S2) · VLAN wiring (S3) · AP site-survey walk (S4) · fault gauntlet (S5–S6).

## 10. Assessment

| Component                                                                        | Weight |
| -------------------------------------------------------------------------------- | ------ |
| Knowledge checks (6 × 5)                                                         | 10%    |
| Workbook practicals                                                              | 25%    |
| Assignment A1 — addressing scheme + Wi-Fi plan for a fictitious 12-person office | 15%    |
| Final practical — build + troubleshoot the lab network (observed, fault cards)   | 40%    |
| Show-and-tell — fault you fixed and how you knew                                 | 10%    |

**Critical gate:** the final lab network must pass end-to-end connectivity tests (wired + Wi-Fi + guest isolation) with a fault card resolved unaided; failure = reassess once.

## 11. Critical behaviors

Never guess in a fault call — measure · change one thing at a time · document while doing · leave defaults changed and labels on ports.

## 12. Learning barriers

Subnet arithmetic anxiety; magic-box mentality (router as totem); fear of breaking things — lab exists for exactly that.

## 13–16. Delivery · QA · Resources · Completion

Dedicated lab bench; labelled fault cards; documented golden configs. Completion: attendance ≥ 4/6; gate passed; A1 + lab documentation filed; feedback form before certificate.
