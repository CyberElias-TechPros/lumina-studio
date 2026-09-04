# 1. Money is integer kobo, in and out

**Status:** Accepted

## Context

The business trades in naira and kobo. An invoice line is `₦45,000.00`; a
payment can be `₦12,900.50`. Totals must reconcile exactly — a customer dispute
over a kobo is still a dispute, and a report that does not add to its own
subtotals destroys trust in the whole system.

## Decision

Every money value is an **integer number of kobo** at every boundary: in D1
columns, in Zod schemas, in JSON on the wire, and in frontend component state.

- The API **rejects** non-integer money. `{"amount": 450.5}` is a 400, not a
  value that gets rounded on the way in.
- One function, `parseAmountToKobo()`, converts human-typed text (`"45,000.50"`,
  `"₦45,000.00"`) to kobo. It is the **only** rounding point.
- `toKoboSafe()` guards every read out of D1, because SQLite aggregates can hand
  back a float.
- The UI formats from kobo (`formatMoney`) and parses to kobo at the input
  boundary (`parseAmountToKobo`). No component holds a float amount.

## Consequences

**Good:** totals are exact. There is one place to audit for rounding. A client
cannot smuggle in a value the server would interpret differently.

**Cost:** every new money field must remember to use the `kobo` type. Forgetting
means a `z.number()` that accepts floats — which the test suite is written to
catch (`money.test.ts`, 33 cases).

## Rejected alternative

Accepting decimal strings (`"45000.50"`) and parsing server-side. This was
actually implemented first and removed. `parseFloat` on user input loses
precision near `Number.MAX_SAFE_INTEGER`, and worse, the client and server could
round differently — producing an invoice whose displayed total did not match its
stored total. In an accounting system that failure mode is unrecoverable, because
you cannot tell afterwards which one was right.
