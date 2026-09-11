# Architecture

## Overview

```
                    ┌─────────────────────┐
      browser ────► │  Vercel (static SPA)│  React 19 + Vite + Tailwind 4
                    └──────────┬──────────┘
                               │ HTTPS + cookie
                    ┌──────────▼──────────┐
                    │ Cloudflare Worker   │  Hono, ~15 route modules
                    └─┬─────────┬───────┬─┘
                      │         │       │
              ┌───────▼──┐ ┌────▼───┐ ┌─▼──────────┐
              │ D1 (SQL) │ │ R2     │ │ KV         │
              │ 20 tables│ │ files  │ │ rate limit │
              └──────────┘ └────────┘ │ idempotency│
                                      └────────────┘
```

No origin server, no queue, no Durable Object. Nothing in this workload needs
them — see [adr/0004](adr/0004-no-durable-objects-or-queues.md).

**Bindings actually used:**

| Binding | Name | Purpose |
| --- | --- | --- |
| D1 | `DB` | All relational data |
| R2 | `UPLOADS` | PDFs, proof of delivery, the business logo |
| KV | `RATE_LIMIT` | Fixed-window counters and idempotency replays |

Cron runs daily at `15 6 * * *` for session expiry, orphaned-object pruning, and
the overdue / low-stock counts.

---

## Data model

20 tables in one migration (`backend/migrations/0001_init.sql`). UUID primary
keys throughout — they are generated in the Worker, so a client can build a
request without a round trip, and they carry no ordering information an attacker
could enumerate.

```
users ──< sessions
business              (single row, id = 'business')
counters              (numbering sequences, per kind per year)

customers ──< invoices ──< invoice_items
                  └─────< payments
                  └─────< waybills ──< waybill_items

suppliers ──< purchases ──< purchase_items
                    └─────< purchase_payments

products ──< stock_movements      (append-only ledger)
expenses
documents              (R2 metadata)
share_links            (public token access)
audit_log
```

`CHECK` constraints enforce every enum (`status`, `role`, `direction`,
`condition_grade`) and the invariants `quantity > 0` / `amount > 0` at the
storage layer, so a bug in application code cannot write nonsense.

### Money

**Integer kobo, in and out.** Every money column is `INTEGER`. Every Zod schema
uses a `kobo` type that rejects non-integers. `toKoboSafe()` guards every read
out of D1, because D1 can hand back a number that SQLite stored as a float after
an aggregate.

There is exactly one place a human-typed string becomes kobo:
`parseAmountToKobo()`. It is used by the UI and by CSV import, and it is the
only rounding point in the system.

The alternative — accepting `"45000.50"` as a decimal string and parsing it
server-side — was tried and rejected: `parseFloat` on user input silently loses
precision at the edges of `Number.MAX_SAFE_INTEGER`, and a rounding difference
between what the client displays and what the server stores is unrecoverable in
an accounting system.

### Totals

`lib/totals.ts::computeInvoiceTotals` is the only place invoice totals are
computed. Both `POST /invoices` and `PATCH /invoices/:id` call it. This matters:
a total computed in two places eventually disagrees, and the disagreement shows
up as a customer dispute.

Rules encoded there:

- Discount is capped at the subtotal — a discount cannot manufacture negative
  revenue.
- Tax is applied to the *discounted* subtotal, and ignored entirely when
  `taxEnabled` is false.
- Overpayment is clamped — `paidAmount` never exceeds `total`.

### `overdue` is derived, never stored

There is no `is_overdue` column. `displayStatus()` computes it from
`due_date`, `total` and `paid_amount` on every read. A stored flag would need a
nightly job to stay correct and would be wrong between runs.

### Stock

`stock_movements` is append-only and is the source of truth. `products.quantity`
is a cached total, re-derived from the ledger inside the same `db.batch()` as the
insert — so the cache and the ledger can never disagree.

- **Invoicing moves stock only when an invoice becomes `sent`.** A draft is an
  intention, not a shipment.
- **Voiding writes a compensating movement** (`invoice:reversal`). It never
  deletes the original, so the ledger still explains every balance.
- **An `adjust` movement records the delta**, not the new figure, for the same
  reason.

Verified end to end: seed 3 units → sell 2 on a sent invoice → quantity 1 →
void the invoice → quantity 3, with both movements still present.

### Numbering

`{PREFIX}-{YEAR}-{SERIES}-{SEQ}`, e.g. `DEL-2026-TF-01`. Sequences live in
`counters`, reset per year, zero-padded to two digits.

`allocateNumber()` returns `{ ensure, bump, fragment, fragmentParams }` so the
counter read, the row insert and the counter bump run in **one**
`db.batch([...])`. A `UNIQUE` index on `number` is the final net: if two workers
ever race, one insert fails and the route returns a retryable 409 rather than
issuing a duplicate number.

---

## Authorization

Roles: `owner | manager | staff | viewer`.

`lib/permissions.ts` maps roles to ~40 capabilities. `requireCap()` is called
inline in each route handler — **at the mutation site**, not only on the route.

That last point was a real bug, found and fixed: voiding an invoice was gated on
a dedicated path, but `PATCH /invoices/:id` accepted `status: "void"` and only
required `write:invoices`. Staff could therefore void customer-facing invoices.
The check now lives inside the PATCH handler. The general lesson, applied
throughout: **every destructive capability must be checked where the mutation
happens**, because generic update endpoints are a second door.

| Capability area | viewer | staff | manager | owner |
| --- | :-: | :-: | :-: | :-: |
| read everything | ✓ | ✓ | ✓ | ✓ |
| write core records | | ✓ | ✓ | ✓ |
| receive payments | | ✓ | ✓ | ✓ |
| delete / void / export | | | ✓ | ✓ |
| read users & audit | | | ✓ | ✓ |
| manage users & settings | | | | ✓ |

The session gate runs **before** route matching. An anonymous request to any
`/v1` path — including one that does not exist — gets `401`, not `404`. This is
deliberate: it prevents route enumeration.

Role changes and deactivation call `revokeAllSessions()`, so a demotion takes
effect on existing devices immediately rather than at the next login.

---

## State machines

**Invoices** — `canTransitionInvoice`:

```
draft ──► sent ──► paid ──► partial
  ▲         │        │
  │         ▼        ▼
  └────── void ◄─────┘
```

`partial` and `paid` are derived from payments; they are never set directly by a
client.

**Waybills** — `canTransitionWaybill`:

```
pending ──► in_transit ──► delivered   (terminal)
   │            │  ▲
   │            ▼  │
   │        exception
   │            │
   ▼            ▼
cancelled ◄─────┘        cancelled ──► pending
```

An illegal move returns `409` with a message naming both states. Verified:
`pending → delivered` is rejected; `pending → in_transit → delivered` succeeds.

A status-only update never touches line items — the PATCH handler replaces items
only when the client actually sent a non-empty array. Verified: items survive a
tracking-number update.

---

## Error handling

Every error becomes one envelope:

```json
{ "error": { "code": "...", "message": "...", "fields": {}, "requestId": "..." } }
```

Codes: `validation_failed | unauthorized | forbidden | not_found | conflict |
unprocessable | rate_limited | payload_too_large | unsupported_media_type |
internal_error`.

Zod field errors are flattened to dotted paths (`items.0.quantity`), which the UI
renders next to the right input instead of as a generic banner.

`requestId` is generated per request and echoed to the client, so a support
conversation can be tied to a log line.

Internal errors return a generic message. The stack stays server-side.

---

## Security

**Passwords.** PBKDF2-SHA256, 100 000 iterations, 16-byte random salt, stored as
`pbkdf2-sha256$<iter>$<salt>$<hash>`. Argon2 would be preferable but is not
available inside the Workers runtime, and 100k is the practical ceiling before
CPU-time limits bite. `needsRehash()` compares the stored iteration count, so
raising it later upgrades accounts transparently on their next login.

**Login.** Unknown-user and wrong-password return the *same* message, and the
unknown-user path burns a dummy hash so the two are not distinguishable by
timing. 8 failures lock an account for 15 minutes.

**Sessions.** 256-bit random tokens; only the SHA-256 hash is stored. The cookie
is `tf_session`, `HttpOnly; SameSite=None; Secure`. `GET /v1/auth/sessions`
never returns `token_hash`.

**Signup.** Closes once an owner exists (403). The first-run experience needs a
public signup endpoint; leaving one open forever would let anyone mint an owner.

**Rate limiting.** KV fixed window per route class: login 10/5 min, register
5/hour, password reset 5/15 min, share view 60/5 min, upload 60/10 min, write
240/min, export 20/5 min. Fails **open** on KV error — an outage of the rate
limiter should not take down the business.

**Idempotency.** `Idempotency-Key` (8–128 chars) replays the original response
from KV for 24 h, tagged `idempotent-replay: true`. A double-clicked submit or a
retried request cannot create two invoices.

**Uploads.** MIME allowlist (PDF, PNG, JPEG, WebP, CSV, XLSX, DOC, DOCX) mapped
to a **server-chosen** extension — the client's filename never forms part of the
storage key, so there is no path traversal and no `shell.html` disguised as an
image. Keys are `{entityType}/{entityId}/{uuid}.{ext}`. Downloads are served as
`attachment` with `default-src 'none'; sandbox`.

**CSP.** Security headers are set on every response. The global middleware sets
CSP only if the route has not already set one, so a route serving a binary can
apply a stricter policy without being clobbered.

**CORS.** Exact allowlist from `FRONTEND_ORIGINS`, credentials enabled, `Vary:
Origin` (emitted on every response, allowed or denied) so caches cannot
cross-contaminate. It is mounted on `*`, not `/v1/*`: an unmatched path must still
answer the preflight and carry the headers, or the browser reports an opaque "no
Access-Control-Allow-Origin" instead of the 404 it actually is. Preflights are
answered there too, before the session gate can 401 an `OPTIONS`.

**Audit.** Every state change is logged with actor, action, entity, IP and a
summary capped at 500 chars. `redact()` strips password / token / session /
authorization / cookie / card_number / cvv from payloads before they are stored.

---

## Frontend

React 19, React Router 7, TanStack Query 5, Tailwind 4.

- **One API client.** `api/client.ts` is the only place that calls `fetch`.
  It attaches credentials, converts non-2xx into a typed `ApiError`, and raises
  `SessionExpiredError` on 401 so the auth layer can redirect.
- **Kobo at the boundary.** `parseAmountToKobo` / `koboToInput` / `formatMoney`
  are the only money conversions. Component state never holds a float amount.
- **Query keys are centralised** in `api/hooks.ts::keys`, and every mutation
  declares which prefixes to invalidate.
- **Writes carry idempotency keys** automatically.
- **List filters live in the URL**, so a filtered view can be bookmarked, shared
  and stepped back through.
- **Capabilities hide controls** the server would reject anyway. This is UX, not
  security — the Worker re-checks everything.

In development Vite proxies `/api` → `http://127.0.0.1:8787/v1`, which keeps the
session cookie same-origin. In production the browser calls the Worker directly
using `VITE_API_URL`.

---

## What was deliberately not built

See [adr/](adr/) for the reasoning. In short: no multi-tenancy (single business
per database, by design), no Durable Objects, no Queues, no email delivery
beyond an optional Resend hook, no offline mode.
