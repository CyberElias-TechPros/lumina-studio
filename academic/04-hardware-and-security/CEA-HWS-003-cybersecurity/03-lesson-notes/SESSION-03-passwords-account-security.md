# CEA Lesson Note — CEA-HWS-003 · Session 3: Passwords & Account Security

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-003-S3       |
| Version     | 1.0 · Session 3 of 8 · Week 2 |

## 0–10 · Review & warm-up

MFA green-tick census — half the room already did it; the rest typed secretly.

## 10–25 · Teaching block

**What strong means now.** Length > complexity theater. Diceware passphrases: 4–5 random words ("mountain-go-father-soup-31") ~30 chars, memorable, uncrackable by force.
Never: birthdays, names, phone digits, "password1", "1234567890", single-keyboard-row walks; unique per site (reuse = one leak, all leaks).

**Password managers.** Bitwarden/1Password-class: one master passphrase (memorise it), everything else generated and stored · autofill defeats fake-login pages (it won't autofill the wrong domain — a feature to teach, not a bug) · family/business sharing instead of sending passwords by WhatsApp.

**MFA everywhere.** App-based (authenticator) > SMS (SIM-swap/interception real in Nigeria) > nothing. Hardware keys for the crown jewels (email, bank) if given. Backup codes printed, offline, envelope.

**Email = master key audit.** Your inbox resets everything else: recovery phone/email current · forwarding rules checked monthly (attackers ADD rules silently) · recent activity page read · sessions logged out that aren't yours.

## 25–45 · Guided demonstration

Project master-password setup: generate passphrase (dice on screen!) · save in manager · login two sites via autofill · show "forwarding rule" page and remove a staged one · print backup codes · store in the imaginary envelope.

## 45–70 · Guided practice

Pairs: each sets up a manager in sandbox (Bitwarden free) — master passphrase, 3 generated logins, export-and-delete lesson NOT done (demo only), tour the security-insights page (weak/reused counts).

## 70–95 · Independent practice

Solo A1 start: **home hardening audit** — walk your own phone/laptop: MFA on email? screen lock? auto-lock? app permissions sane? app-store-only installs? Update state? Photo evidence page for A1.

## 95–110 · Correction & check

KC3: (1) Passphrase formula. (2) Manager kills what two sins. (3) MFA ranking. (4) Forwarding-rule check — why. (5) SIM-swap defence.

## 110–120 · Summary & next session

You can't memorise what you invented — so generate it. Next: spotting the messages that want your key anyway.

## Answers — KC3

1. 4–5 random words + number — length beats soup. 2) Weak passwords + reuse. 3) App > SMS > nothing. 4) Silent exfiltration of reset codes/invoices by intruders who already own the inbox. 5) App-based MFA (not SMS) + bank app re-pin + 2FA on email (reset chain).

## Homework (10 min)

Fix your three worst accounts from the S2 inventory before sleep.
