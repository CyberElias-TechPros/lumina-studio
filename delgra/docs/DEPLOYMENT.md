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
npm test              # must be 149/149
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

Build command `npm run build`, output directory `dist`. `vercel.json` already
handles the SPA rewrite, cache headers and security headers.

Because `VITE_API_URL` is inlined at build time, changing it requires a redeploy.

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

Then, signed in as the owner: create a customer, create and send an invoice with
a stock line, confirm stock decremented, record a partial payment, confirm the
invoice reads `partial`, download the PDF, create a share link and open it in a
private window.

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
