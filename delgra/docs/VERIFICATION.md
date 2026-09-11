# Verification

What was actually run, and what came back. Nothing here is asserted without a
command behind it.

---

## Backend

```
$ cd delgra/backend
$ npx tsc --noEmit
(exit 0, no output)

$ npx vitest run
 Test Files  9 passed (9)
      Tests  163 passed (163)
```

Per file:

| Suite | Tests |
| --- | --- |
| `money.test.ts` | 33 |
| `smoke.test.ts` | 2 |
| `operations2.test.ts` | 15 |
| `auth.test.ts` | 20 |
| `rbac.test.ts` | 22 |
| `invoices.test.ts` | 27 |
| `operations.test.ts` | 30 |
| `cors.test.ts` | 11 |
| `bootstrap.test.ts` | 3 |

12 tests are skipped (email delivery, which needs a live Resend key).

These run inside `@cloudflare/vitest-pool-workers` — a real workerd runtime with
real D1, R2 and KV — not a mock.

## Frontend

```
$ cd delgra/frontend
$ npx tsc --noEmit
(exit 0, no output)

$ npm run build
✓ 1727 modules transformed.
dist/index.html                   0.58 kB │ gzip:   0.35 kB
dist/assets/index-BpTMfKU0.css   24.74 kB │ gzip:   5.61 kB
dist/assets/index-DLl6hPYK.js   395.30 kB │ gzip: 114.08 kB
✓ built in 3.23s
```

All 27 source modules were then requested individually through the running Vite
dev server and every one transformed without error — which catches import
resolution and JSX problems a typecheck cannot.

## Live end-to-end run

`wrangler dev --local` plus `vite`, exercised over HTTP. Each line below is a
real request and the real response.

**Bootstrap and auth**

```
GET  /v1/bootstrap                     → needsOwner: true, signupOpen: true
POST /v1/auth/register                 → 201, owner with capabilities[]
GET  /v1/auth/session                  → 200, same user
```

**Business flow**

```
POST /v1/customers                     → 201
POST /v1/products (3 units, ₦45,000)   → 201
POST /v1/invoices (2 × ₦45,000 + ₦2,500 delivery, ₦1,000 discount, status=sent)
   subtotal 9,250,000 kobo = ₦92,500
   discount   100,000 kobo = ₦1,000
   total    9,150,000 kobo = ₦91,500      ✓ arithmetic reconciles

GET  /v1/products/:id                  → quantity 1 (was 3)
   ledger: [out 2 ref=invoice] [in 3 ref=manual "Opening stock"]   ✓

POST /v1/invoices/:id/payments (₦50,000)
GET  /v1/invoices/:id                  → status partial, paid 5,000,000,
                                          balance 4,150,000        ✓
```

**Stock reversal on void**

```
PATCH /v1/invoices/:id {status: void}  → 200
GET  /v1/products/:id                  → quantity 3 (restored)
   ledger: [in 2 ref=invoice:reversal] [out 2 ref=invoice] [in 3 ref=manual]
```

The reversal is a *compensating* movement. The original `out 2` is still there —
history is never rewritten.

**Waybill state machine**

```
POST /v1/waybills/:id/status {delivered}     → 409 "Cannot move a waybill
                                                 from \"pending\" to \"delivered\"."
POST /v1/waybills/:id/status {in_transit}    → 200
POST /v1/waybills/:id/status {delivered}     → 200, deliveredAt set
GET  /v1/waybills/:id                        → items intact (1 item, serial
                                                UPS-45-88213, 180 kg)
```

Items survive status-only updates — the PATCH handler replaces them only when the
client sends a non-empty array.

**Public share link**

```
GET  /v1/invoices/:id/pdf                    → 200 application/pdf, 2,645 bytes
POST /v1/share-links                         → 201, token issued
GET  /v1/share/:token  (no cookie)           → 200, business + document only
GET  /v1/share/deadbeefdeadbeef              → 404
```

**Authorization**

Staff capabilities, read back from `GET /v1/auth/session`:

```
void:invoices    False        write:invoices   True
delete:invoices  False        export:data      False
read:users       False        manage:settings  False
read:audit       False
```

Then the enforcement, not just the declaration:

```
PATCH /v1/invoices/:id {status: void}  as staff → 403
   "Your role (staff) cannot void invoices."
GET   /v1/users                        as staff → 403
DELETE /v1/invoices/:id                as staff → 403
GET   /v1/invoices                     anon     → 401
GET   /v1/definitely-not-a-route       anon     → 401  (not 404)
PATCH /v1/invoices/:id {status: void}  as owner → 200  (control)
```

The last line matters: the same request succeeds for the owner, so the 403 is a
permission decision and not a broken route.

`401` for a nonexistent route is intentional — the session gate runs before route
matching, so anonymous callers cannot enumerate the API surface.

**SPA**

```
GET  http://localhost:5173/                  → 200, <title>Delgra Ledger</title>
GET  http://localhost:5173/api/bootstrap     → 200 (proxied to Worker /v1)
GET  http://localhost:5173/invoices/new      → 200 (deep link, SPA fallback)
GET  http://localhost:5173/src/main.tsx      → 200, transformed module
```

## Money conversion

The shipped `src/lib/money.ts` was imported directly (not reimplemented) and run
against 10 cases:

```
ok  parseAmountToKobo("45000")      = 4500000
ok  parseAmountToKobo("45,000")     = 4500000
ok  parseAmountToKobo("45000.50")   = 4500050
ok  parseAmountToKobo("45,000.50")  = 4500050
ok  parseAmountToKobo("₦45,000.00") = 4500000
ok  parseAmountToKobo("1,234,567.89") = 123456789
ok  parseAmountToKobo("0")          = 0
ok  parseAmountToKobo("abc")        = null
ok  parseAmountToKobo("")           = null
ok  parseAmountToKobo("1.234")      = 123

koboToInput(4500000) = "45000.00"
koboToInput(0)       = ""          (keeps the input box empty)
formatMoney(9150000) = ₦91,500.00
formatMoney(-4150000) = -₦41,500.00
addDaysIso("2026-09-01", 14) = 2026-09-15

ALL MONEY CASES PASS
```

## Demo data integrity

`npm run seed:local` produced 25 records through the public API. Checked
afterwards:

```
DEL-2026-TF-01   2 × ₦45,000 + ₦15,000 install − ₦5,000 discount
  sum of line amounts : ₦105,000.00
  subtotal (server)   : ₦105,000.00   → match: True
  − discount          : ₦5,000.00
  = total (server)    : ₦100,000.00   → match: True
  paid ₦100,000.00 ⇒ balance ₦0.00 | status paid
  → balance consistent: True

PO-2026-TF-01   12 × ₦950 = ₦11,400, paid ₦5,000 ⇒ balance ₦6,400

Reports:  billed ₦236,300 | cogs ₦90,300 | opex ₦12,005
          gross ₦146,000 (61.8%) | net ₦133,995 (56.7%)
          unmapped cost lines: 0
Receivables: Kaduna State Water Board ₦49,500 (overdue bucket)
             Delta Power Systems ₦37,500 (current bucket)
             total ₦87,000 — agrees with the dashboard figure
```

Gross profit reconciles: 236,300 − 90,300 = 146,000. Net reconciles:
146,000 − 12,005 = 133,995.

## What was *not* verified

- **Real Cloudflare deployment.** Everything above ran against `wrangler dev
  --local`. The remote bindings in `wrangler.jsonc` are placeholders
  (`REPLACE_WITH_D1_DATABASE_ID` etc.), so `wrangler deploy` has not been run.
- **Email.** `RESEND_API_KEY` is absent, so those paths are skipped in the suite
  and were not exercised live.
- **Browser interaction.** The SPA was verified to serve, proxy and transform,
  and its API contracts were checked against the live Worker. No automated
  browser test clicks through the UI — there is no Playwright suite for this app.
- **Load.** No performance testing beyond the cron's page-bounded pruning.
