# CEA Lesson Note — CEA-WEB-004 · Session 6: Security, Backups & Launch

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-004-S6       |
| Version     | 1.0 · Session 6 of 6 · Week 3 |

## 0–10 · Review & warm-up

Checklist drafts swapped — room highlights the most overlooked item ("backups" wins; it always wins).

## 10–25 · Teaching block

**Security baseline.** Updates: core auto + weekly theme/plugin check · strong admin creds + 2FA plugin · limit login attempts · hide file editor (`DISALLOW_FILE_EDIT` in wp-config) · Wordfence-class scanner optional · SSL enforced (Really Simple SSL) · least-privilege roles.
**Backups (the sermon).** Files + DATABASE — both or nothing. Frequency: before EVERY update/launch; automatic daily on hosts that offer it; off-site copy (Drive/email vault); RESTORE TEST quarterly — an untested backup is a love letter to disaster.
**Performance basics.** Caching plugin (WP Super Cache-class) · compress images · lazy loading · one bloat audit (plugins page-load hooks) — target Lighthouse ≥70 mobile acceptable for launch.
**Launch & handover.** Pre-flight checklist → flip coming-soon off → final backup (labelled "pre-launch") → Search Console live → credentials handover SHEET (user/pass URL, backup location, update cadence, monthly retainer) — never verbal handover; the client relationship lives or dies here.

## 25–45 · Guided demonstration

Live: wp-config constant added; 2FA enrolment; full UpdraftPlus-class backup run — file + DB zips verified; simulate restore INTO A FRESH SANDBOX (the money moment — the room sees a dead site come back in 90 seconds); handover sheet filled aloud for a fictional client.

## 45–70 · Guided practice

Pairs: security pass on sandbox (2FA + hide editor + strong creds); backup run; partner verifies both archives exist & sizes sane; disable cache; Lighthouse score noted before/after.

## 70–95 · Final demonstrations (observed)

Per student: live site load (assessor's phone, fresh browser) · contact form round-trip · WhatsApp button · admin login with 2FA · PRODUCE the backup file on demand (this is the gate) · 2-minute handover role-play to "the client" (instructor).

## 95–110 · Correction & check

KC6: (1) Backup includes what. (2) Restore test cadence. (3) 2FA purpose. (4) DISALLOW_FILE_EDIT does. (5) Handover sheet contents.

## 110–120 · Course close

Certificates after gate (live + backup) passes. Your retainer is whatever you and the client agree — but the FIRST maintenance invoice should go out within 30 days of handover.

## Answers — KC6

1. Files + database. 2) Quarterly minimum; before every risky change. 3) Even stolen passwords don't open the door. 4) Disables theme/plugin editor in dashboard — attackers love it. 5) URLs, creds, backup location, update cadence + retainer terms.

## Homework

None. Raise your rate for the next build — you earned it.
