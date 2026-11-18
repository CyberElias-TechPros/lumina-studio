# CEA Lesson Note — CEA-WEB-001 · Session 4: Navigation & Components

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-001-S4       |
| Version     | 1.0 · Session 4 of 8 · Week 2 |

## 0–10 · Review & warm-up

File-name audit aloud — "HomeScreen.js, SearchScreen.js, ReceiptScreen.js" — two students admitted guilt; forgiven.

## 10–25 · Teaching block

**React Navigation.** `npm i @react-navigation/native @react-navigation/native-stack` + peer deps (gesture-handler, screens…) —
expo install keeps versions synced. `NavigationContainer` wraps all. `createNativeStackNavigator()` for drill-ins; `bottom-tabs` for 3–5 destinations.
**Wiring.** `<Stack.Screen name="Home" component={HomeScreen}/>` ×3; `navigation.navigate('Cart', {items})` with params; params are READ-ONLY data couriers, never stores.
**Reusable components.** `<PrimaryButton/>`, `<ListRow/>`, `<EmptyState message="…"/>` — write once, use everywhere; props in, UI out; no business logic inside dumb components.
**Styling systems.** One `theme.js` (colors/spacing/typography); every screen imports it; design tokens > hex sprawl.

## 25–45 · Guided demonstration

Live: wire Home → Search → Receipt with params; create `<PrimaryButton>` and swap three Pressables to it; prove theme import; hot-reload walk among screens on phone.

## 45–70 · Guided practice

Pairs: wire their three screens stack-wise; pass a fake `item` param forward to the result screen; screenshot navigation on phone for workbook.

## 70–95 · Independent practice

Solo: **navigation live** — full trio navigable, params delivered, two reusable components extracted, theme.js in place; commit #2; phone video proof (10s screencast).

## 95–110 · Correction & check

KC4: (1) NavigationContainer does. (2) Params job + prohibition. (3) Dumb component definition. (4) Theme file contents. (5) Bottom tabs max-ish.

## 110–120 · Summary & next session

Screens talk; apps walk. Next: data that persists past the back button — state & storage.

## Answers — KC4

1. Owns the navigation tree & history. 2) Carry identifiers/payloads between screens; never a state store. 3) Props in → UI out, zero data logic. 4) Colors, spacing, type scale. 5) Five; beyond five = drawer or rethink.

## Homework

List the two pieces of data your app must remember after close (S5 will use them).
