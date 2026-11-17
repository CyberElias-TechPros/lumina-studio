# CEA Lesson Note — CEA-HWS-003 · Session 2: Authentication & Awareness

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-003-S2       |
| Version     | 1.0 · Session 2 of 8 · Week 1 |

## 0–10 · Review & warm-up

Homework recitals; one asset map read aloud (voluntary); class rates its weakest link.

## 10–25 · Teaching block

**Two different keys.** Authentication = proving who you ARE (password, fingerprint, code) · Authorization = what you're ALLOWED to do after that (roles, permissions).
Buying fuel with another man's key is authentication bypassed, not authorization bypassed — but building both correctly is defence.

**Defence in depth.** One weak control never save you; layers do: MFA + manager + updates + backup = attacker must beat four things, not one.

**Least privilege.** Every account gets the minimum needed — staff bank app ≠ treasury powers; kids' accounts standard; shared shop laptop Windows standard users; admin account used only to install, then back to standard.

**Security awareness beats tools.** The 10-second rule: sender expected? language odd? urgency+threat = red flag ritual ("your account will close in 2 hours" — banks never text-close; they phone or branch-letter). Verify out-of-band: call the known number, never the one in the message.

## 25–45 · Guided demonstration

Live show of account takeover chain (projected slides): password reuse → leak from some shopping site → credential stuffing into Gmail → bank-app reset → drained. Then the same chain dead-stopped at THREE points with manager + unique pass + MFA. Freeze-frame discussion.

## 45–70 · Guided practice

Pairs sort 12 "claim cards" ("verify your BVN", "congratulations, you won N500,000"…) into TRUST / VERIFY / SCAM with reasons; debrief the trickiest three as a class.

## 70–95 · Independent practice

Solo: **account inventory table** — your top 10 accounts: MFA on? unique password? recovery email/phone current? Against the master checklist; mark three you'll fix tonight. File to workbook.

## 95–110 · Correction & check

KC2: (1) Authn vs authz, plain difference. (2) Defence in depth — one sentence. (3) Least privilege example. (4) Urgency smells: one example each of phishing framing. (5) Out-of-band verification: what/why.

## 110–120 · Summary & next session

Identity is a stack, not a password. Next: build yours — managers and MFA.

## Answers — KC2

1. Who you are vs what you may do. 2) Independent layers; attacker must beat all. 3) Shop laptop standard users; admin only for installs. 4) "Account closing in 2 hours" / "You owe ₦X or arrest". 5) Call the number you already know (bank back of card), never reply to the message — kills impersonation.

## Homework (10 min)

Turn on MFA for your email tonight. Bring the green tick to S3.
