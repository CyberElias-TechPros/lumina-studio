# 5. Capability checks inline in handlers, not a route table

**Status:** Accepted

## Context

Four roles (`owner | manager | staff | viewer`) with meaningfully different
powers. The obvious implementation is a route-to-permission allowlist: one table
mapping `PATCH /invoices/:id` to `write:invoices`, checked by middleware.

## Decision

A capability model in `lib/permissions.ts` — `ROLE_CAPABILITIES`, `can(role,
cap)` — with `requireCap("…")` called **inline in each handler**, plus a
capability list returned to the client so the UI can hide what the server would
reject.

The session gate (`requireSession`) runs before route matching.

## Why not a route table

A route table answers "may this role call this endpoint?" It cannot answer "may
this role perform *this particular mutation* through this endpoint?"

That distinction is not theoretical — it was a real vulnerability in this
codebase, found and fixed:

> Voiding an invoice was gated behind a dedicated capability. But
> `PATCH /invoices/:id` accepted `status: "void"` and required only
> `write:invoices`. **Staff could void customer-facing invoices**, and the ledger
> would reverse stock on a document a customer had already received.

A route table would have listed `PATCH /invoices/:id → write:invoices` and been
perfectly satisfied. The bug is only visible at the mutation site.

So the rule adopted is: **every destructive capability is checked where the
mutation happens**, even when the endpoint is already gated. The PATCH handler
now calls `can(user.role, "void:invoices")` before honouring a `void` status.

Verified live:

```
PATCH /v1/invoices/:id {status: void}  as staff → 403 "cannot void invoices"
PATCH /v1/invoices/:id {status: void}  as owner → 200        (control)
```

The control case matters — it proves the 403 is a permission decision and not a
broken route.

## Consequences

**Good:** the check sits next to the code it protects, so it is visible when
reading the handler and hard to forget when adding a branch. No second table to
keep in sync with the router.

**Cost:** there is no single place to read off "what can staff do?" That is
answered by `ROLE_CAPABILITIES` plus the 22 tests in `rbac.test.ts`.

**Discipline required:** every new destructive branch on an existing endpoint
needs its own `can()` check. This is the price of the model, and it is the point.
