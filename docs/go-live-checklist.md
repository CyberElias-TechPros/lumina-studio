# Go-live checklist — keys & switches

Everything below is already implemented in code. Going live is configuration
only. Status is visible to admins at **/app/admin/operations** (booleans only —
secret values are never exposed).

## 1. Backend secrets (`cd backend && npx wrangler secret put <NAME>`)

| Secret                                         | Required    | Unlocks                                                                                                                                                                                                                                                  |
| ---------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PAYSTACK_SECRET_KEY`                          | **Yes**     | Checkout, signed webhooks (fail closed without it), server-side verify, 15-min reconciliation job                                                                                                                                                        |
| `EMAIL_API_KEY`                                | **Yes**     | Magic links, password reset, email verification codes, receipts, reminders, contact acknowledgements (provider via `EMAIL_PROVIDER` var: `resend` / `mailgun`)                                                                                           |
| `TURNSTILE_SECRET_KEY`                         | Recommended | Bot protection on sign-up, magic link, forgot password, contact/visit forms, applications, enrollments                                                                                                                                                   |
| `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY`       | Optional    | Web push notifications                                                                                                                                                                                                                                   |
| `AI_API_KEY`                                   | Optional    | AI tutor / grading / recommendations                                                                                                                                                                                                                     |
| `SENTRY_DSN`                                   | Recommended | Server error reporting (5xx + failed cron jobs)                                                                                                                                                                                                          |
| `SMS_API_KEY` (+ `SMS_PROVIDER`, `SMS_SENDER`) | Optional    | Payment-reminder and assignment-deadline SMS. Termii by default; Twilio uses `SID:TOKEN`. Only users who enable SMS in notification settings and have a phone get texts (quiet hours 21:00–08:00 WAT). Test via Operations → `POST /v1/system/sms/test`. |
| `CONTACT_INBOX`                                | Recommended | Staff notification for every contact/newsletter submission (can also be a `vars` entry)                                                                                                                                                                  |

## 2. Frontend env (Vercel project settings)

| Var                        | Must match                                                                               |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`             | Worker URL (e.g. `https://api.cea.ng`) — **required**, otherwise builds refuse live mode |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Same Paystack account as `PAYSTACK_SECRET_KEY`                                           |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`  | Same Turnstile widget as `TURNSTILE_SECRET_KEY` — **set both or neither**                |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY`    | Same as the Worker's `VAPID_PUBLIC_KEY`                                                  |
| `NEXT_PUBLIC_APP_ENV`             | `prod`                                                                                   |

## 3. Provider dashboards

- **Paystack** → Settings → API Keys & Webhooks → webhook URL:
  `https://<worker>/v1/enrollments/webhook` (enrollment funnel). The generic
  checkout uses `/v1/payments/webhook`; Paystack allows one URL per account, so
  point it at the enrollments URL unless you use the generic checkout too.
  Both handlers are idempotent and verify the charged amount.
- **Resend/Mailgun** → verify the `cea.ng` sending domain (SPF + DKIM) so mail
  from `EMAIL_FROM` isn't spam-filtered.
- **Turnstile** → add `cea.ng` and `www.cea.ng` to the widget's hostnames.

## 4. Database

```sh
cd backend
npx wrangler d1 execute DB --remote --file migrations/0056_production_ops.sql
```

(Production's `d1_migrations` ledger stops at 0016 — see README; use
`execute --file` as for previous migrations, or reconcile the ledger first.)

## 5. Cron triggers

Declared in `backend/wrangler.jsonc` → `triggers.crons`; `wrangler deploy`
registers them automatically:

| Schedule       | Job                    | What it does                                                                           |
| -------------- | ---------------------- | -------------------------------------------------------------------------------------- |
| `*/15 * * * *` | `reconcile-payments`   | Verifies stuck `pending` Paystack sessions (missed webhooks) and settles them          |
| `0 * * * *`    | `enrollment-reminders` | One reminder for registrations unpaid after 24h; weekly balance nudges after a deposit |
| `0 2 * * *`    | `cleanup`              | Purges expired magic links/codes, old sessions, 90-day-old webhook/job ledgers         |

Admins can run any job on demand and see run history at `/app/admin/operations`.

## 6. Smoke test after deploy

1. `GET /v1/health` → `{ ok: true }`.
2. Sign up → receive a 6-digit code → verify on `/auth/verify-email`.
3. Contact form → acknowledgement to sender + notification to `CONTACT_INBOX`.
4. Enrollment → Paystack test card → receipt email; status page shows paid.
5. `/app/admin/operations` → "Production ready" badge; run `cleanup` → `ok`.

## Migration 0057 (assignment deadlines, SMS log)

Apply `backend/migrations/0057_due_dates_sms_portal.sql` to production the same way as 0056:

```sh
cd backend && npx wrangler d1 execute <DB_NAME> --remote --file migrations/0057_due_dates_sms_portal.sql
```

The `assignment-reminders` job backfills `due_at` for legacy assignments whose due text is an absolute date; relative text such as "Today 23:59" is left unset rather than guessed. Instructors publish new work from **Instructor → Assignments → Publish assignment**.
