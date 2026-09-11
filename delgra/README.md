# Delgra Ledger

Invoicing, waybills, stock and receivables for **DELGRA LTD** — a Nigerian
business trading in fairly-used industrial and IT equipment (UPS units,
generators, inverters, batteries, servers).

Built for the Cloudflare edge: the API is a Worker backed by D1, R2 and KV; the
UI is a React SPA on Vercel. No origin servers.

---

## What it does

| Area | What you can do |
| --- | --- |
| **Invoices** | Draft or send, per-line items from your stock, discounts, partial payments, void with a reason, PDF export |
| **Waybills** | Consignment notes linked to invoices, carrier tracking, proof-of-delivery uploads, a real state machine |
| **Customers** | Contact details, RC/TIN, per-customer billed / paid / outstanding |
| **Stock** | Used-equipment grading (`grade_a`–`grade_d`), serials, an append-only movement ledger, reorder alerts |
| **Suppliers & purchases** | Purchase orders, goods received, supplier payments, payables |
| **Expenses** | Categorized running costs that feed real margins |
| **Reports** | Profit & loss, receivables ageing, stock valuation, top customers, carrier performance, CSV export |
| **Client portal** | Tokenised share links — a customer sees *their* invoice and nothing else |
| **Team** | Four roles enforced server-side, full audit log |

### Where the identity came from

Confirmed by the owner: **DELGRA LTD** issues the invoices. From a real document
filename — `TechFarms_Invoice_FairlyUsed_UPS45k_DEL-2026-TF-01.pdf` — the rest
follows:

| Evidence | Reading | Confidence |
| --- | --- | --- |
| owner statement | issuer = DELGRA LTD | confirmed |
| `DEL-…` prefix | DELGRA's own invoice prefix | high |
| `…-TF-01` | series code; left configurable | medium |
| `TechFarms_…` | the **customer**, not the issuer | high |
| `FairlyUsed_UPS45k` | fairly-used 45 kVA UPS line item | high |

`TechFarms` is therefore seeded as a customer, and `DEL-2026-TF-01` is billed to
them — reproducing the real document. The invoice *layout* is still unconfirmed:
the PDF itself never arrived, so the visual design is a reconstruction.

## Status

Working and verified. Backend: `tsc --noEmit` clean, **160/160 tests passing**.
Frontend: typecheck clean, production build succeeds, every module served by the
dev server. See [docs/VERIFICATION.md](docs/VERIFICATION.md) for exactly what was
run and what came back.

---

## Quick start

Requires Node 20+ and a Cloudflare account (free tier is enough).

```bash
# 1. API
cd backend
npm install
npm run dev                 # wrangler dev --local on :8787

# 2. Database (local)
npm run db:migrate:local

# 3. Demo data — drives the real HTTP API, so it exercises numbering,
#    validation, totals and the stock ledger
npm run seed:local          # sign in: owner@delgra.test / Str0ngPass!2026

# 4. UI (separate shell)
cd ../frontend
npm install
npm run dev                 # vite on :5173, proxies /api -> :8787/v1
```

Open <http://localhost:5173>. In development the Vite proxy keeps the session
cookie same-origin, so there is no CORS or third-party-cookie problem.

> `npm run db:reset:local` deletes `.wrangler/state`. Stop `wrangler dev`
> first — a running Worker loses its database handle and starts returning 500s.

### The two things that only go wrong in production

Local development cannot show you either of these, because the Vite proxy rewrites
`/api` → `/v1` on its own and applies migrations to the local D1 for you:

1. **`VITE_API_URL` must include the `/v1` suffix.** `api/client.ts` appends it if
   you forget, but the variable should still be right.
2. **`npx wrangler d1 migrations apply DB --remote`.** `wrangler deploy` publishes
   code, never schema. An un-migrated database answers `/v1/bootstrap` with a
   503 (`service_unavailable`, naming the migration command) and `/v1/health`
   with `tables: 1`.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md#troubleshooting) for the failure modes
and the commands that confirm each one.

## Repository layout

```
delgra/
├── backend/                 Cloudflare Worker
│   ├── migrations/          0001_init.sql — 20 tables, one migration
│   ├── src/lib/             18 modules: auth, crypto, money, totals, stock,
│   │                        numbering, permissions, rate-limit, pdf, audit…
│   ├── src/routes/          15 route modules
│   ├── src/index.ts         app assembly, CORS, session gate, error envelope
│   ├── src/cron.ts          daily maintenance
│   ├── scripts/seed-demo.ts demo data via the public API
│   └── test/                8 suites, 160 tests
└── frontend/                React 19 + Vite + Tailwind 4 SPA
    ├── src/api/             client, hooks, response types
    ├── src/components/      primitives + app shell
    ├── src/pages/           18 screens
    └── vercel.json          SPA rewrite + caching/security headers
```

The two packages are independent — separate `package.json`s, no imports between
them, and nothing shared with anything else in this repository. The whole
`delgra/` directory can be lifted into its own repo with a single `git mv`.

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — data model, money handling,
  stock ledger, RBAC, state machines, error handling
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — step-by-step Cloudflare + Vercel
- [docs/VERIFICATION.md](docs/VERIFICATION.md) — what was actually run
- [docs/adr/](docs/adr/) — the decisions and their trade-offs
- [docs/KNOWN-LIMITATIONS.md](docs/KNOWN-LIMITATIONS.md) — what is not built yet

## Key design rules

1. **Money is integer kobo, in and out.** Never a float on the wire. The API
   rejects non-integer amounts. The UI converts at the boundary only.
2. **Derived state is derived.** `overdue` is computed from the due date; it is
   never stored, so it cannot go stale.
3. **The stock ledger is the truth.** `products.quantity` is a cached total
   re-derived in the same transaction. Voiding an invoice writes a compensating
   movement; history is never deleted.
4. **Authorization is server-side.** Capabilities are checked in the route
   handler, at the mutation site. The UI hiding a button is cosmetic.
5. **One database, one business.** Multi-tenancy is a documented decision, not a
   half-built feature.

## Security

PBKDF2-SHA256 (100k iterations, the Workers ceiling) with per-user salts and a
transparent rehash-on-login upgrade path. 256-bit session tokens stored only as
SHA-256 hashes. `HttpOnly; Secure; SameSite=None` cookies. Account lockout after
8 failures. KV-backed rate limiting on every sensitive route. Idempotency keys
on writes. A MIME allowlist with server-chosen file extensions. Security headers
on every response, with CSP tightened further on binary downloads. A full audit
log with credential redaction.

See [docs/ARCHITECTURE.md#security](docs/ARCHITECTURE.md#security).
