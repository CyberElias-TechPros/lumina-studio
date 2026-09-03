# Known limitations

Things that are genuinely not built, or built with a boundary you should know
about. Listed so nobody discovers them at the wrong moment.

---

## Not built

**No multi-tenancy.** One D1 database = one business. There is no `tenant_id`
column anywhere, and no code path that filters by one. Adding another business
means deploying a second Worker with a second database. This was a deliberate
choice — see [adr/0003](adr/0003-single-tenant.md) — not an oversight, but it is
a real limit if DELGRA LTD ever needs a second branch with separate books.

**No email delivery in practice.** The code path exists behind
`RESEND_API_KEY` / `EMAIL_FROM`, but no key is configured, and when it is absent
the send is skipped rather than queued. So today "send invoice to customer"
means *share a link or attach a PDF*, not "the customer gets an email". The 12
skipped tests are these paths.

**No browser tests.** There is no Playwright suite. The SPA was verified to
build, serve, proxy and transform, and its API calls were checked against the
live Worker, but nothing clicks through the UI automatically. A visual
regression would not be caught by CI.

**No password self-service.** An owner can reset someone's password from
**Team**, and a `passwordReset` rate-limit bucket exists, but there is no
user-facing "forgot password" flow — it needs working email, which needs the
item above.

**No soft-delete for customers or products.** `DELETE` is a real delete, guarded
by referential checks (you cannot delete a customer with invoices). Deactivating
is the normal path.

**No offline mode and no real-time updates.** Two staff on the same invoice will
overwrite each other; last write wins. There is no optimistic-concurrency token
on `PATCH`. For a small team this is acceptable, but it is a genuine limit if the
business grows past a couple of people issuing invoices simultaneously.

## Boundaries worth knowing

**Waybill PDFs use `pdf-lib` with WinAnsi encoding.** That codepage has no naira
sign, so `pdfText()` substitutes `NGN ` in generated PDFs. On screen the symbol
renders normally. Fixing it means embedding a Unicode font (~1 MB in the bundle).

**Ratings of `overdue` are computed per read.** Correct, but a list of a few
thousand invoices does that work on every page load. Fine at this scale; would
want an indexed generated column much later.

**Rate limiting fails open.** If KV is unavailable, requests are allowed rather
than blocked. That is the right trade for a business tool — you would rather
serve an invoice than 503 — but it does mean the limiter is not a hard security
boundary during a KV outage.

**Share links are bearer tokens.** Anyone holding the URL sees that document
until it expires or is revoked. They are rate-limited (60 views / 5 min) and
revocable, and the view is logged, but there is no second factor. Treat them
like a physical copy of the invoice.

**`Idempotency-Key` replays are scoped to a user and path.** Correct for retry
safety, but it does not deduplicate across users.

**CSV export is invoices-only.** `GET /v1/reports/invoices.csv`. Customers,
expenses and stock have no export endpoint yet.

**Logo upload is a single slot.** `branding/logo.{ext}` — no history, no
variants, no favicon pipeline.

## Things that look like bugs but are not

**`GET /v1/definitely-not-a-route` returns `401`, not `404`.** The session gate
runs before route matching so anonymous callers cannot enumerate the API.

**You cannot void a `paid` invoice directly.** The state machine requires
`paid → partial` first (by deleting a payment), then `partial → void`. That is
deliberate: an invoice someone has paid should not silently disappear.

**A purchase never reaches `paid` through `PATCH`.** The status enum for updates
is `draft | ordered | received | cancelled`; `paid` is derived by the payment
route when `paidAmount >= total`.

**`APP_ENV` is `production` in local dev too.** `wrangler dev` inherits it from
`wrangler.jsonc`. The only thing it gates is the demo-login route, which stays
off. Override with `--var APP_ENV:development` if you want it.
