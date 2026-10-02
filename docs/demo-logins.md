# Demo logins — testing every role workspace

Password logins for all 30 CEA-OS roles, so you can walk into `/app/admin`,
`/app/accountant`, `/app/admissions`, `/app/instructor` … without waiting for
magic-link email.

> **These are test accounts.** Delete them when you are done role-testing:
> `npm run db:remove:demo:remote` (from `backend/`).

---

## 1. Apply them

```sh
cd backend

# 1. (optional) choose your own password — at least 12 characters
node scripts/gen-demo-users.mjs --password="Your-Strong-Password-Here"

# 2. local (miniflare D1)
npm run db:migrate:local
npm run db:seed:local
npm run db:seed:demo:local

# 3. production / staging D1
npm run db:seed:demo:remote

# 4. make your OWN account an admin (so you can test /app/admin with your real login)
node scripts/gen-demo-users.mjs --password="Your-Strong-Password-Here" --promote=you@cea.ng
npm run db:seed:demo:remote
```

The seed is **idempotent**: re-running it updates only rows whose id starts with
`demo-`, so an existing real account is never touched or taken over — including
one that happens to sit on the same address (verified: the upsert's
`WHERE users.id LIKE 'demo-%'` guard skips it).
Regenerating with a new password rotates every demo login; re-running the same
file changes nothing.

Sign in at **https://www.cea.ng/auth/sign-in** with the email + the password you
passed.

## 2. The logins

Default password for the shipped seed: **`Cea-Demo-2026!`**
(change it before applying to production — see §1.)

| Role              | Email                           | Lands at                 |
| ----------------- | ------------------------------- | ------------------------ |
| student           | `student@demo.cea.ng`           | `/app/learn`             |
| instructor        | `instructor@demo.cea.ng`        | `/app/instructor`        |
| admissions        | `admissions@demo.cea.ng`        | `/app/admissions`        |
| finance           | `finance@demo.cea.ng`           | `/app/accountant`        |
| admin             | `admin@demo.cea.ng`             | `/app/admin`             |
| director          | `director@demo.cea.ng`          | `/app/director`          |
| hr                | `hr@demo.cea.ng`                | `/app/hr`                |
| ops               | `ops@demo.cea.ng`               | `/app/ops`               |
| it                | `it@demo.cea.ng`                | `/app/it`                |
| marketing         | `marketing@demo.cea.ng`         | `/app/marketing`         |
| growth            | `growth@demo.cea.ng`            | `/app/growth`            |
| design            | `design@demo.cea.ng`            | `/app/design`            |
| localization      | `localization@demo.cea.ng`      | `/app/localization`      |
| conversion-copy   | `conversion-copy@demo.cea.ng`   | `/app/conversion-copy`   |
| product-marketing | `product-marketing@demo.cea.ng` | `/app/product-marketing` |
| behavioral-design | `behavioral-design@demo.cea.ng` | `/app/behavioral-design` |
| department        | `department@demo.cea.ng`        | `/app/department`        |
| mentor            | `mentor@demo.cea.ng`            | `/app/mentor`            |
| alumni            | `alumni@demo.cea.ng`            | `/app/alumni`            |
| parent            | `parent@demo.cea.ng`            | `/app/parent`            |
| client            | `client@demo.cea.ng`            | `/app/client`            |
| employer          | `employer@demo.cea.ng`          | `/app/employer`          |
| partner           | `partner@demo.cea.ng`           | `/app/partner/hub`       |
| supplier          | `supplier@demo.cea.ng`          | `/app/supplier`          |
| ngo               | `ngo@demo.cea.ng`               | `/app/ngo`               |
| government        | `government@demo.cea.ng`        | `/app/government`        |
| receptionist      | `receptionist@demo.cea.ng`      | `/app/receptionist`      |
| intern            | `intern@demo.cea.ng`            | `/app/intern`            |
| volunteer         | `volunteer@demo.cea.ng`         | `/app/volunteer`         |
| dev               | `dev@demo.cea.ng`               | `/app/dev`               |

Emails live on `demo.cea.ng` (a subdomain, not your real mailboxes), so a demo
account can never shadow `admission@cea.ng` or any future staff address. Nothing
sends mail to that domain, so use password sign-in for these — magic-link e-mail
for a demo address will not arrive.

## 3. How the credentials are built (and why they're safe)

- Passwords are stored as **PBKDF2-SHA256, 100 000 iterations, 16-byte random
  salt**, in exactly the format `backend/src/lib/crypto.ts` writes and
  `verifyPassword()` accepts. The generator was checked against the real
  implementation: 30/30 hashes verify with the correct password and fail with a
  wrong one, and the salt is fresh per generation (so two demo users with the
  same password do not share a hash).
- This repo is **private**, so the seed file can live in `seeds/`. If the repo is
  ever made public, regenerate-and-delete first: the file contains password
  hashes for a shared, well-known password.
- Sign-in is rate-limited (10 attempts / 15 min per email+IP) and these accounts
  hold no elevated permissions beyond their role.
- Demo users have `status = 'active'` and `email_verified_at` set, so nothing in
  the auth path blocks them.

## 4. If you would rather not seed passwords

`POST /v1/admin/users` (admin only, UI at **/app/admin/users**) provisions an
account with **no password** — the person signs in by magic link. That is the
right path for real staff and instructors; it just needs working outbound email
(see `docs/email-dns-audit.md`) and one dialog per person. Use it for people, and
the demo seed for testing.

## 5. Cleanup

```sh
cd backend
npm run db:remove:demo:remote      # deletes demo-* users + their sessions
```

It never touches any other row. Re-check with:

```sh
cd backend
npx wrangler d1 execute DB --remote --command \
  "SELECT role_key, COUNT(*) FROM users GROUP BY role_key ORDER BY role_key;"
```
