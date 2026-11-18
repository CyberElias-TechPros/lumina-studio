# CEA Lesson Note — CEA-WEB-001 · Session 7: Testing on Devices

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-001-S7       |
| Version     | 1.0 · Session 7 of 8 · Week 4 |

## 0–10 · Review & warm-up

Failure videos screened — the most instructive three errors celebrated (red screens teach faster than green ones gossip).

## 10–25 · Teaching block

**Device > emulator (usually).** Real touch, glare, CPU heat, patchy network — the truth-teller. Emulator fast for iteration; phone for verdicts.
**Expo Go golden path.** Same Wi-Fi, QR scan, `npm start` — if it "works on my laptop but not my phone": different network, stale cache (clear expo cache), firewall, VPN.
**Debug toolkit.** `console.log` in terminal mode · React Native Debugger/Chrome devtools · yellow/red screens read ALOUD · Flipper for state · React DevTools Profiler · shake-to-menu (dev builds).
**Common mobile bugs.** Keyboard covering input (KeyboardAvoidingView) · Android back closing app (confirm exit modal) · flex overflow on small phones (test psudeo-SE 320px) · SafeArea misses · fetch on 3G reveals your skeleton's shame.

## 25–45 · Guided demonstration

Live: instructor's app fails on the loaner phone in front of everyone — network mismatch found in 60 seconds (different VLAN); fix; then a safe-area miss spotted on Android — correct; class chants "test on the actual device".

## 45–70 · Guided practice

Pairs: swap phones — every pair tests the partner's app: 10-minute script (cold launch, add item, kill, relaunch, airplane mode, back-button at root); write the three worst bugs found.

## 70–95 · Independent practice

Solo: **bug hunt** on your own app from the pair report + fix top three; commit #5; before/after screenshots.

## 95–110 · Correction & check

KC7: (1) Device over emulator why. (2) "Works on mine" trio of suspects. (3) KeyboardAvoidingView job. (4) Red screen ritual. (5) Root-back behaviour fix.

## 110–120 · Summary & next session

Phones forgive nothing — good. Next: shipping him into the world's pockets — publishing concepts.

## Answers — KC7

1. Real input/network/glare/heat reveal what emulators romanticise. 2) Different Wi-Fi/VLAN · stale cache · firewall/VPN. 3) Pushes inputs above the software keyboard. 4) Read it aloud; line numbers are friends not verdicts. 5) Exit-confirmation modal instead of silent death.

## Homework

Record 20s screen-capture of your core loop — S8 opens with it.
