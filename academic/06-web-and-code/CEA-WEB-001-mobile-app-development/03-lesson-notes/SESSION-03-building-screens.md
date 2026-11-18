# CEA Lesson Note — CEA-WEB-001 · Session 3: Building Screens

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-001-S3       |
| Version     | 1.0 · Session 3 of 8 · Week 2 |

## 0–10 · Review & warm-up

Expo Go alive on three loaner phones — everyone scans the instructor's demo QR and watches the app hot-reload as they watch.

## 10–25 · Teaching block

**Toolchain in 15 minutes.** Node LTS + npm + `npx create-expo-app@latest` + `npm start` → QR → Expo Go. Web preview as fallback; Android Studio emulator optional power-move.
**Components.** Everything is a component: `View` (flex box), `Text` (all words), `Image`, `ScrollView`, `Pressable`, `TextInput`. Function components + hooks only — no class archaeology.
**Layout on small screens.** Flexbox-first (`flexDirection: 'row' | 'column'`), safe-area padding top notch, 100% widths by default, `"cover"` images, `...StyleSheet.create` at the bottom — no inline jungles.
**Project hygiene.** `src/screens/`, `src/components/`, `assets/`; one concern per file; `.gitignore` from day one; commit on green.

## 25–45 · Guided demonstration

Live on projector: scaffold app; write `HomeScreen` with header + list placeholder + CTA; save; phone hot-reloads mid-sentence; instructor breaks flexDirection on purpose — room diagnoses; fix; commit.

## 45–70 · Guided practice

Pairs: scaffold own app; build one screen matching their flow map's Screen A (layout only, no data); swap phones; partner taps everything and reports dead zones.

## 70–95 · Independent practice

Solo: **Screen A lifted** — real layout, safe area, header, one Pressable with `console.log`, hot-reload proven; commit #1. File screenshot to workbook.

## 95–110 · Correction & check

KC3: (1) Three core components. (2) Safe area why. (3) Hot reload superpower. (4) Flexbox default direction. (5) One concern per file — why.

## 110–120 · Summary & next session

First pixels beat first meetings. Next: the map between screens — navigation.

## Answers — KC3

1. View, Text, Image (any three incl. Pressable/TextInput). 2) Notches/gesture bars must never cover content. 3) Save→see on phone in ~1s — iteration orbit here, not in store reviews. 4) column. 5) Readability at midnight by your teammate — or you, next month.

## Homework (15 min)

Name your component files tonight — `ScreenA.js` is forbidden at S4.
