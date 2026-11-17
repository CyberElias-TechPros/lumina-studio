# CEA Lesson Note — CEA-HWS-003 · Session 6: Encryption & Web Security

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-003-S6       |
| Version     | 1.0 · Session 6 of 8 · Week 3 |

## 0–10 · Review & warm-up

Router photos passed around; three real homes already hardened this week — applause.

## 10–25 · Teaching block

**What encryption is.** Math that scrambles so only keys unscramble. Symmetric (one shared secret — bulk speed) +
Asymmetric (public/private pair — keys to the castle) · HTTPS = TLS wrapping: the padlock means the pipe is encrypted + the site proved identity with a certificate — NOT that the site is honest.

**HTTPS habits.** Padlock + correct spelling of the domain = proceed · padlock + typo domain = danger sign with a lock ON — certificate proves identity, not intent ·
HTTP forms that ask passwords = walk away · browser warnings ("your connection is not private") — click back, not through · HSTS preload awareness.

**Common web security.** XSS (someone else's script runs in your session — never paste into console), CSRF (forged request from your logged-in browser),
insecure cookies, session theft via public Wi-Fi, outdated plugins (update your CMS/browser/apps!), downloads from repackaged sites ("free" paid software = malware buffet).

**File & device encryption.** Phone full-disk on by default on modern devices — verify · Windows BitLocker / device encryption on laptops ·
WhatsApp/Signal end-to-end by default (good) · email usually NOT e2e — assume it can be read on the path.

## 25–45 · Guided demonstration

Projected browser tour: lock icon → certificate viewer (issuer, expiry) · a padlocked-typo-domain example (bbc.co vs bbc.com clones) · an HTTP login → capture nothing needed to feel wrong · F12 security tab;
then devtools console warning game: "paste this" = never, class chant.

## 45–70 · Guided practice

Pairs: **site-check relay** — 12 projected URLs sorted SAFE / SUSPICIOUS / HTTP-DISQUALIFIED with delegates explaining each verdict in ≤20 seconds; instructor scores the reasoning aloud.

## 70–95 · Independent practice

Solo A1 finish: write your **personal HTTPS/encryption habits page** — three behaviour changes you'll lock in; attach three screenshots of settings (browser padlock, phone encryption on, update page). File to workbook.

## 95–110 · Correction & check

KC6: (1) HTTPS guarantees what — and not what. (2) Padlock + typo domain means. (3) Symmetric vs asymmetric one-liner. (4) "Paste this in console" = ? (5) Email confidentiality truth.

## 110–120 · Summary & next session

Padlocks are for pipes; judgment is for destinations. Next: when it happens anyway — incident response.

## Answers — KC6

1. Encrypted pipe + domain identity — NOT honest intentions. 2) Well-formed impostor; no trust despite lock. 3) Symmetric = same key both ways (fast); asymmetric = public/private pair (solves key exchange). 4) Self-xss — the #1 "hack yourself" trick; never. 5) Usually NOT e2e; assume readable; encrypt attachments deliberately for sensitive docs.

## Homework (10 min)

Enable device encryption on your laptop if off; bring the setting screenshot.
