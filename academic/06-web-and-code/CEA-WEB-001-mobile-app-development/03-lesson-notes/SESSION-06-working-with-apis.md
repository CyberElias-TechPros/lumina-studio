# CEA Lesson Note — CEA-WEB-001 · Session 6: Working with APIs

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-001-S6       |
| Version     | 1.0 · Session 6 of 8 · Week 3 |

## 0–10 · Review & warm-up

Three API picks read aloud; two are gorgeous (exchange rates, waec-ish news feed). Lock yours in.

## 10–25 · Teaching block

**Fetch basics.** `const res = await fetch(url); const json = await res.json();` — wrap in try/catch ALWAYS; check `res.ok` not just no-throw (404 is a "successful fetch, failed request").
**Loading/error/empty discipline.** Three states mandatory: loading (spinner/skeleton) · error (message + Retry button) · empty ("Nothing here — yet"). Apps that skip these feel haunted.
**Offline & slow.** Airplane-mode test; timeout ~10s with AbortController; cached-last-good snapshot in AsyncStorage as fallback banner ("Showing last saved data").
**Performance on low-end devices.** Images downscaled, lists virtualised (FlatList does), no giant base64 blobs in state, re-renders audited with React DevTools Profiler if time allows.

## 25–45 · Guided demonstration

Live: fetch `https://api.frankfurter.dev/latest?from=USD` (free, no key) into a rates screen projected; kill Wi-Fi live → error state shown → Retry restores; Airplane mode → cached banner renders.

## 45–70 · Guided practice

Pairs: wire their chosen API into one screen with all three states + retry; deliberately break the URL once to prove the error UI; airplane-mode pass on phone.

## 70–95 · Independent practice

Solo: **API-graded screen** — your app consuming real data; three states proven; failure demo recorded as 20s video for portfolio; commit #4.

## 95–110 · Correction & check

KC6: (1) res.ok why. (2) Three mandatory states. (3) Offline fallback pattern. (4) Timeout tool. (5) Low-end rule #1.

## 110–120 · Summary & next session

Networks die; good apps degrade gracefully. Next: the proving ground — devices.

## Answers — KC6

1. HTTP errors aren't exceptions; you must ask. 2) Loading, error (+retry), empty (+success obviously). 3) Show last cached data with a banner — never a blank void. 4) AbortController with setTimeout (~10s). 5) Images small + lists virtualised; memory dies before CPUs on low-end.

## Homework

Charge everything. S7 is device-test day.
