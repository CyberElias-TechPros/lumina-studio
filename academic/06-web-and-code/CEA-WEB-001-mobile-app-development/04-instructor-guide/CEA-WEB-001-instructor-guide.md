# CEA Instructor Guide — CEA-WEB-001 Mobile App Development

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-GUI-WEB-001           |
| Version     | 1.0 · **Instructor use**      |
| Status      | Approved v1.0 — pending pilot |

**Do not distribute.** Keys in Section 7.

## 1. What this course is

Scope-first mobile building. The bug that kills projects is fantasy scope, not syntax; referee the creep ruthlessly and the prototypes bloom.

## 2. Preparation

Node LTS, `create-expo-app` cached, three demo projects (empty / wired / fat), loaner Android phones (3),
Expo Go links, QR cards, hotspot fallback Wi-Fi, printed 44pt touch-target cards, flow-map sheets.

## 3. Delivery model

105 min: 0–10 demo-or-disaster · 10–25 teach at
whiteboard · 25–45 live build · 45–70 guided pair-build · 70–95 solo · 95–110 KC · 110–120 close.

## 4. Failure points

- S1: "my app like Instagram + WhatsApp" — hand back the job-story card until it fits three screens.
- S3: node version mismatch — verify machines BEFORE class; a dead toolchain eats the session.
- S5: keyExtractor={index} slips — break the list reorder live and let the room stare at the corruption.
- S7: demo-day Wi-Fi segmentation between laptops and phones — class hotspot brick as plan B.
- S8 gate: core loop runs without instructor hands near the machine — observation only, always.

## 5. Assessment guidance

A1 scope pack graded on specificity (screen inventory counts). Final: P1–P6 with absolute gate P4:
cold-launch → job → result, unaided, on device/emulator. Show-and-tell: reasoning, never flutter of hands.

## 6. Equity & access

Loaner phones; laptops available for home machine-less students 1:1; all examples offline-capable after first fetch-cache; large-print brief cards.

## 7. Knowledge-check keys

KC1: 1) Platform-native love vs one codebase everywhere-ish. 2) One user/job/≤3 screens. 3) "As… open… so…" 4) OTA + hot reload + no store limbo. 5) Scope defence artifact.
KC2: 1) Bottom third houses primary actions. 2) 44×44pt. 3) default/loading/empty/error/success. 4) Tabs destinations · stack drill-in · modal focused task. 5) Android back is sacred — never trap.
KC3: 1) View/Text/Image. 2) Notch/gesture-bar safety. 3) ~1s save→see cycle. 4) column. 5) Midnight-teammate readability.
KC4: 1) Navigation tree + history owner. 2) Data courier — never state store. 3) Props in UI out, no logic. 4) Colors, spacing, type scale. 5) Five.
KC5: 1) Local memory. 2) Two+ screens need same slice. 3) Index keys corrupt reorders. 4) setItem+JSON / getItem+parse on mount. 5) Submit-time beats keystroke nagging.
KC6: 1) HTTP 4xx/5xx aren't exceptions. 2) Loading, error+retry, empty. 3) Cached last-good with banner. 4) AbortController ~10s. 5) Small images + FlatList virtualisation.
KC7: 1) Reality beats emulator comfort. 2) Wi-Fi/VLAN · cache · firewall. 3) Avoids keyboard covering input. 4) Read the red screen aloud — line numbers are friends. 5) Confirm-exit modal.
KC8: 1) $25 / $99yr. 2) AAB delivery bundle · APK raw install. 3) Honest data form or rejection. 4) JS/assets only. 5) Internal → beta → public.

## 8. Expected outputs & calibration

S3: every pair on hot-reload by minute 20. S5: rehydrate JSON reads aloud by each pair. S8: two-witness gate + APK/Expo link filed.

## 9. Rubric (0–4)

0 does not boot · 1 boots, lost in flow · 2 completes with assist · 3 core loop unaided · 4 unaided + articulate trade-offs. Gate: core-loop unaided.
