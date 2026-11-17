# CEA Lesson Note — CEA-HWS-004 · Session 4: Hardware & Software Support

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-004-S4       |
| Version     | 1.0 · Session 4 of 6 · Week 2 |

## 0–10 · Review & warm-up

Two home role-play reports read out; gentle laughter, learned something, applies.

## 10–25 · Teaching block

**Printers (the eternal boss battle).** Ladder: USB? power? toner? driver stuck in queue (cancel ALL, restart spooler `services.msc`) · IP-change of network printer (needs re-add) · print test page from printer panel to isolate PC vs printer · default printer set on the user's account (not yours!) · share permissions.
**Software installs & updates.** Admin needed (that's by design) · approved sources only · silent-install flags awareness (/S, /quiet) · post-install verification ON THE USER'S ACCOUNT · patch Tuesday sanity — schedule, announce, backup line ready · rollback plan (uninstall previous version).
**Accounts & permissions (depth).** Group membership (Staff vs Finance) · NTFS vs share permissions · "access denied" — check their groups before their attitude · expiry of ex-staff accounts same-day.
**Common fault pattern recognition.** 80% of calls: printers, Wi-Fi drops, "can't find file", password expiries, storage full (clear temp, move files), slow machines (reboot + startup apps), "the internet" (it is usually DNS or one bad cable).

## 25–45 · Guided demonstration

Live: stuck print queue cleared via spooler restart → test page printed → default printer re-set on user account → group membership check surfaces hidden cause of "can't open finance folder".

## 45–70 · Guided practice

Pairs on seeded benches: printer queue jam card · permission-denied card · storage-full card · each diagnosed in ≤8 minutes on paper+machine; swap; compare diagnoses.

## 70–95 · Independent practice

Solo: write **five knowledge-base articles** drafts (one each: printer queue, slow PC, storage full, permission denied, can't find file) in the KB template (problem, cause, steps, verify, escalate-if). File to workbook.

## 95–110 · Correction & check

KC4: (1) First printer step. (2) Spooler restart command path. (3) Default printer per-user rule. (4) Patch-Tuesday sane practice. (5) "Access denied" two checks before attitude.

## 110–120 · Summary & next session

Printers respect power, not pleading. Next: writing the ghost notes — documentation.

## Answers — KC4

1. USB/power/toner, then queue. 2) services.msc → Print Spooler → Restart. 3) Each account carries its own default — user checks while logged in as them. 4) Scheduled, announced, with a rollback plan ready — never Friday 4:45pm. 5) Group membership (NTFS + share) and account status before blaming the user.

## Homework (10 min)

Find the oldest print job on any printer you use; clear it.
