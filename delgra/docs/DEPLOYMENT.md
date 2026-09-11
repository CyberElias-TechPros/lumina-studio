# Deployment

Two services: a Cloudflare Worker (API) and a Vercel static site (UI). Both run
on free-tier allowances at this scale.

---

## 1. Cloudflare: create the resources

Log in, then:

```bash
cd backend
npm install
npx wrangler login
```

Create D1, R2 and KV, and copy the IDs it prints:

```bash
npx wrangler d1 create delgra-db
npx wrangler r2 bucket create delgra-uploads
npx wrangler kv namespace create RATE_LIMIT
```

Paste the three IDs into `backend/wrangler.jsonc`:

```jsonc
{
  "d1_databases": [{ "binding": "DB", "database_name": "delgra-db", "database_id": "<D1 ID>" }],
  "r2_buckets":   [{ "binding": "UPLOADS", "bucket_name": "delgra-uploads" }],
  "kv_namespaces":[{ "binding": "RATE_LIMIT", "id": "<KV ID>" }],
  "vars": {
    "APP_ENV": "production",
    "FRONTEND_ORIGINS": "https://ledger.yourdomain.com",
    "APP_URL": "https://ledger.yourdomain.com",
    "COOKIE_SECURE": "true"
  }
}
```

`FRONTEND_ORIGINS` is an exact-match allowlist (comma-separated). A wildcard will
not work — that is intentional, since credentials are sent.

## 2. Apply migrations to the remote database

```bash
npx wrangler d1 migrations apply DB --remote
```

Confirm:

```bash
npx wrangler d1 execute DB --remote --command "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
```

You should see 23 rows (20 tables plus SQLite's internal bookkeeping).

## 3. Deploy the Worker

```bash
npm run typecheck     # must exit 0
npm test              # must be 160/160
npm run deploy
```

Wrangler prints a `*.workers.dev` URL. Check it:

```bash
curl https://<your-subdomain>.<account>.workers.dev/v1/health
# {"status":"ok","database":"connected","tables":23,...}
```

### Custom domain (recommended)

A `workers.dev` URL works, but the session cookie is `SameSite=None; Secure`,
which browsers treat more strictly on unfamiliar domains. Binding your own
domain avoids surprises:

```bash
npx wrangler deploy   # after adding "routes" to wrangler.jsonc
```

Then update `APP_URL` and `FRONTEND_ORIGINS` to match, and redeploy.

## 4. Vercel: the frontend

```bash
cd ../frontend
npm install
npm run build         # must succeed
```

Create a Vercel project pointed at this directory. Set one environment variable:

| Variable | Value |
| --- | --- |
| `VITE_API_URL` | `https://api.yourdomain.com/v1` |

**The `/v1` suffix is part of the value, not part of the path.** Every route on
the Worker is mounted under `/v1`, so a base URL of just
`https://api.yourdomain.com` makes the browser call `/bootstrap` and
`/auth/session`, which match nothing. Build command `npm run build`, output
directory `dist`. `vercel.json` already handles the SPA rewrite, cache headers
and security headers.

Because `VITE_API_URL` is inlined at build time, changing it requires a redeploy —
an env var edit alone does nothing.

`api/client.ts` now appends the missing `/v1` itself if the variable is set to a
bare origin, and logs a warning naming the value it used. That is a safety net for
a symptom that is otherwise invisible in devtools, not a licence to leave the
variable wrong: fix it and the warning disappears.

## 5. First account

Open the site. With an empty database the app offers **Set up your workspace**;
the first account becomes `owner`. Signup then closes permanently — further users
are added from **Team** by the owner.

To confirm signup closed:

```bash
curl -X POST https://api.yourdomain.com/v1/auth/register \
  -H 'content-type: application/json' \
  -d '{"businessName":"x","name":"y","email":"a@b.c","password":"Str0ngPass!2026"}'
# 403 — "This workspace already has an owner."
```

## 6. Configure the business

Sign in and go to **Settings**. Set the trading name, address, bank details, and
the numbering prefixes. The default series produces `DEL-{YEAR}-TF-{SEQ}`.

Upload a logo if you have one — it appears on PDFs.

## 7. Cron

`wrangler.jsonc` declares `"15 6 * * *"`. It expires stale sessions, prunes
orphaned R2 objects, and recomputes the overdue and low-stock counts. Nothing to
configure; confirm it fired:

```bash
npx wrangler tail --format pretty
```

---

## Environment variables

| Variable | Required | Default | Notes |
| --- | :-: | --- | --- |
| `APP_ENV` | ✓ | `production` | Anything other than `production` enables the demo-login route |
| `FRONTEND_ORIGINS` | ✓ | — | Exact-match CORS allowlist, comma-separated |
| `APP_URL` | ✓ | — | Used to build share-link URLs |
| `COOKIE_SECURE` | ✓ | — | `true` in production, `false` for local dev |
| `SESSION_TTL_MINUTES` | | `10080` | 7 days |
| `MAX_UPLOAD_BYTES` | | `10485760` | 10 MB |
| `RESEND_API_KEY` | | — | Optional. Absent, email is skipped rather than failing |
| `EMAIL_FROM` | | — | Required alongside `RESEND_API_KEY` |

Secrets go through `wrangler secret put`, never into `wrangler.jsonc`.

## Verification checklist

Run these before pointing real traffic at it:

```bash
curl -s https://api.yourdomain.com/v1/health                      # database: connected
curl -s -o /dev/null -w '%{http_code}\n' https://api.yourdomain.com/v1/invoices   # 401
curl -s -o /dev/null -w '%{http_code}\n' https://api.yourdomain.com/v1/nope       # 401 (not 404)
```

`/v1/health` also reports the table count — this is the fastest check that
migrations reached the **remote** database, which `wrangler deploy` never does for
you:

```bash
curl -s https://api.yourdomain.com/v1/health
# {"status":"ok","database":"connected","tables":23,...}
```

`tables: 1` means the schema is not applied remotely at all. Every database-backed
route — including `/v1/bootstrap`, which the sign-in screen calls before you are
authenticated — fails until you run `npx wrangler d1 migrations apply DB --remote`.
`/v1/bootstrap` names the problem itself in that state: a 503 with
`code: "service_unavailable"` and a message quoting the migration command, which
the sign-in screen shows instead of a login form that could never succeed.
`needsOwner: true` from `/v1/bootstrap` is what a healthy, empty workspace looks
like.

Then confirm CORS from the browser's point of view (an `Origin` header is what the
browser sends, so send one):

```bash
curl -si -X OPTIONS https://api.yourdomain.com/v1/bootstrap \
  -H 'Origin: https://app.yourdomain.com' \
  -H 'Access-Control-Request-Method: GET' | grep -i '^access-control'
# access-control-allow-origin: https://app.yourdomain.com
# access-control-allow-credentials: true
```

If the origin is missing from that output, it is not in `FRONTEND_ORIGINS` — and
note that `wrangler deploy` pushes the `vars` block in `wrangler.jsonc`, which
overrides anything edited in the Cloudflare dashboard. Keep the two in sync or
expect the allowlist to revert on the next deploy.

---

## Troubleshooting

### "No 'Access-Control-Allow-Origin' header is present"

The console says CORS; the cause is usually not CORS. Three things produce that
exact message, in the order they bite:

1. **The base URL lost its `/v1`.** Requests land on `/bootstrap` instead of
   `/v1/bootstrap`, match no route, and the 404 arrives without CORS headers
   because the origin never got as far as a real endpoint. Check the Network tab:
   if the failing request path has no `/v1` in it, this is it. The Worker now
   answers CORS on every path and the 404 body names the prefix, so the real
   reason is visible instead of masked; the frontend also self-corrects the base.
2. **The origin is not allowlisted.** `FRONTEND_ORIGINS` must contain the exact
   `Origin` value — scheme, host, no trailing slash, no path. `https://app.example`
   and `https://app.example/` are the same entry as of this writing; `*` is not a
   wildcard and matches nothing, deliberately, because credentials are sent.
3. **The Worker threw before responding.** A 500 (typically `no such table: users`)
   still carries the CORS headers now, but the browser will show a failed fetch, so
   read the status code in the Network tab before assuming anything about CORS.

### The sign-in screen never gets past "Sign in" on a `workers.dev` API

CORS can be entirely correct and the session still won't stick: the cookie is
`SameSite=None; Secure` set by a *different registrable domain* than the page, so
Safari and other ITP-style blockers drop it. This is why the docs recommend a
custom domain. The cheapest fix is to put both halves under one registrable
domain — `delgra.freegameplay.site` for the UI and `api.freegameplay.site` for the
Worker: that is still cross-origin, so CORS still applies, but it is same-*site*,
so the cookie is first-party and every browser sends it.

### 401 immediately after a successful login

`Set-Cookie` was accepted but not sent back. Confirm the cookie name
(`tf_session`), that `COOKIE_SECURE` is not `false` in production over HTTPS or
`true` on http://localhost, and — if the frontend is deployed anywhere under a
path rather than a bare origin — that the Worker is being asked to set the cookie
on a host the browser will echo back.

## Rollback

Workers keep the previous version:

```bash
npx wrangler rollback
```

Migrations are additive. This project has one migration; if you add more, write
them so the previous Worker still runs against the new schema (add columns,
don't rename or drop in the same release).

## Costs

At free-tier limits: D1 5 million row-reads/day, R2 10 GB, KV 100k reads/day,
Workers 100k requests/day. A single-branch trading business will not approach
these. The first thing to grow is D1 storage if you attach many PDFs — but PDFs
are generated on demand and only *uploaded* documents land in R2.
