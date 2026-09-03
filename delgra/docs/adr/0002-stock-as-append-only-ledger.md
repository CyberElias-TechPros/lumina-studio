# 2. Stock is an append-only ledger, with a cached balance

**Status:** Accepted

## Context

DELGRA LTD holds used equipment. Quantity matters for three different reasons at
once: what can be sold today, what the business is worth at cost, and explaining
*why* a number is what it is when a unit goes missing. A single `quantity` column
that gets incremented and decremented answers the first two and silently destroys
the third.

## Decision

`stock_movements` is the source of truth. It is append-only: rows are inserted,
never updated, never deleted.

`products.quantity` is a **cached total**, re-derived from the ledger inside the
same `db.batch()` as the movement insert. Cache and ledger are written together
or not at all.

- Invoicing moves stock **only when an invoice becomes `sent`**. A draft is an
  intention, not a shipment.
- Voiding an invoice inserts a compensating movement (`invoice:reversal`). The
  original movement stays.
- A manual `adjust` records the *delta* needed to reach the new figure, not the
  new figure itself, for the same reason.

## Consequences

**Good:** every balance is explainable — the movement history says exactly where
it came from. Voiding cannot corrupt history. A count discrepancy is
investigable rather than mysterious.

**Verified end to end:** seed 3 units → sell 2 on a sent invoice → quantity 1 →
void → quantity 3, with all three movements still present
(`in 2 invoice:reversal`, `out 2 invoice`, `in 3 manual`).

**Cost:** computing a balance from scratch is O(movements). Not a problem at this
scale — the cached column serves reads, and the ledger is only walked for a
single product's history (capped at 50 rows in the API).

## Rejected alternative

Mutating `products.quantity` directly and keeping movements as an optional log.
Cheaper, but the log and the column drift apart the first time a write fails
halfway — and then you have two numbers and no way to tell which is true.
