# CEA Lesson Note — CEA-HWS-001 · Session 6: Network Troubleshooting Practical

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-001-S6       |
| Version     | 1.0 · Session 6 of 6 · Week 3 |
| Status      | Draft — pending pilot         |

## 0–10 · Review & warm-up

Ladder recital in pairs — 30 seconds, no paper. Verify both can recite app-to-physical blind.

## 10–25 · Teaching block (briefing)

**The drill.** Three benches, three fault universes: (A) cable/physical — cut or untwisted pair (visual detect + tester); (B) addressing/DHCP — dead pool or wrong gateway; (C) DNS/WAN — wrong DNS or ISP dead. Rules: ladder only; change one thing at a time; say your hypothesis aloud before touching anything; 8 minutes per card; write each step on the fault sheet.

**Documentation = service.** A fault you cannot write down gets re-fixed next Tuesday. Sheet fields: symptom, ladder steps, hypothesis, change made, verification, time. Photograph configs where allowed.

## 25–90 · Practical rounds (observed)

Pairs rotate through fault cards; assessor scores P1–P6 per round; solo re-test for any failed card after rotation; hardest card doubled.

## 90–110 · Debrief & final KC

Board post-mortem: which card ate the most time; why; what reading would have saved it. KC6: (1) Ladder six steps. (2) Hypothesis-before-touch rule rationale. (3) One-change-at-a-time rationale. (4) Verification definition. (5) Documentation audience.

## 110–120 · Course close

Certificate gate: end-to-end connectivity + one blind fault card unaided. Portfolio: A1 plan, lab documentation, ladder card. Alumni: cybersecurity (network security hardening), IT support deep-dive.

## Answers — KC6

1. Physical → link/NIC → gateway ping → internet ping → DNS → app. 2) Stops guess-thrash; makes you falsify fast and cheap. 3) Two changes at once = which one fixed it, forever unknown. 4) Proving the reported symptom is gone at the user's seat — not merely your bench ping. 5) The replacement tech next Tuesday; future-you at 2am.

## Homework

None. Your network at home just became legacy — maintain it like a professional.
