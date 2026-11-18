# CEA Lesson Note — CEA-WEB-001 · Session 1: App Concepts & Scoping

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-001-S1       |
| Version     | 1.0 · Session 1 of 8 · Week 1 |
| Status      | Approved v1.0 — pending pilot |

## 0–10 · Review & warm-up

Show a beautiful app concept screenshot; ask "what would make this v1?" — room guesses features;
reveal: v1 = ONE job done end-to-end; everything else is v2+.

## 10–25 · Teaching block

**What apps actually are.** Native (Kotlin/Swift — platform love, double work), hybrid/cross-platform
(React Native, Flutter — one codebase, near-native), web apps in wrappers (PWA — cheapest, fastest to learn).
We build with React Native + Expo: one codebase, hot reload, real devices fast.
**The v1 law.** One user (not "everyone") · one job ("find today's market prices", not "run my shop") · three screens maximum in v1 (home, act, result).
**Scoping ritual.** Write the job story: "As a ___, I open the app to ___, so I can ___." Cut until it survives a drunk review at 1am — no features for friends-of-friends.
**Platform conventions preview.** iOS HIG vs Android Material: tabs bottom both, back-gesture vs back-button, typography scale, safe areas — respect both, never fight them.

## 25–45 · Guided demonstration

Instructor scopes "GoNowy — my market runner app" live on board: 40-feature fantasy → cut-cut-cut →
job story → three screens (search / cart / receipt) → v1 ship-list of 9 bullets and a NOT-list of 20.

## 45–70 · Guided practice

Pairs: draft job story + three-screen flow for one idea each (ride-hailing, church dues tracker, tailor order book); swap; partner attacks with "cut it" until only v1 remains; re-vote.

## 70–95 · Independent practice (A1 part 1)

Solo: your **v1 job story + screen trio** for YOUR app idea; one paragraph of NOT-list with reasons. File to workbook.

## 95–110 · Correction & check

KC1: (1) Native vs cross-platform in one line each. (2) v1 law (user/job/screens). (3) Job story template. (4) Expo's gift. (5) NOT-list purpose.

## 110–120 · Summary & next session

Do less, better, live sooner. Next: screens that respect the thumb — mobile UI design.

## Answers — KC1

1. Native = one platform deep love; cross-platform = one codebase, most platforms, near-native. 2) One user, one job, ≤3 screens. 3) "As a X I open it to Y so I can Z." 4) Hot reload + OTA + device testing without store limbo. 5) Scope defence — it's where apps live or die.

## Homework

Sketch your three screens on paper (phone-sized) — bring to S2.
