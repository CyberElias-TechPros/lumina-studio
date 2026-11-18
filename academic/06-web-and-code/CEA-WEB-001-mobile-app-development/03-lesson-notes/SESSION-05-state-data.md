# CEA Lesson Note — CEA-WEB-001 · Session 5: State & Data

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-001-S5       |
| Version     | 1.0 · Session 5 of 8 · Week 3 |

## 0–10 · Review & warm-up

Two "must remember" lists read out — cart contents and last-search top them both.

## 10–25 · Teaching block

**State.** `useState` for local slice (`const [items, setItems] = useState([])`); lift state up when two screens need it (or Context — one per real need, not fashion).
**Events → state.** Every Pressable/TextInput writes through setState; render maps state → UI; the loop is the whole React story.
**Lists.** `FlatList data={items} renderItem={…} keyExtractor` — keyExtractor ALWAYS stable (id, not index); empty state renders when data.length === 0.
**Local storage.** `@react-native-async-storage/async-storage`: `setItem('cart', JSON.stringify(items))` on every change; `getItem` on mount (useEffect) to rehydrate; uninstall-reinstall wipes it (expected).
**Input validation.** Name non-empty, qty ≥ 1, price numeric — validate on submit, not on every keystroke (annoyance); show one-line error under field.

## 25–45 · Guided demonstration

Live: cart screen — add item → FlatList shows row → total recomputes → setItem on every tap → force-kill app → relaunch → cart restored; "empty cart" state flashed; validation rejects qty −3.

## 45–70 · Guided practice

Pairs: build their list + storage rehydrate end-to-end for exactly one data slice; log out the rehydration JSON; swap phones and try to break it with empty/garbage input.

## 70–95 · Independent practice

Solo: **stateful core** — your headline data slice across screens, persisted; empty state correct; one validation rule live; commit #3; phone proof.

## 95–110 · Correction & check

KC5: (1) useState job. (2) Lifting state up when. (3) keyExtractor stable why. (4) AsyncStorage recipe (set/get). (5) Validate on submit why.

## 110–120 · Summary & next session

Memory that survives the back button. Next: the world outside — APIs, loading, failure.

## Answers — KC5

1. Local component remembering. 2) Two+ screens share the same slice → move it to the common parent/context. 3) Index keys re-render wrong rows on reorder — data corruption in lists. 4) setItem(key, JSON.stringify(v)) / getItem → parse on mount. 5) Real-time nagging loses users; submit-time errors are contextually earned.

## Homework (10 min)

Find one PUBLIC API you'd love your app to eat (e.g. exchange rates, football fixtures, news) — S6 consumes it.
