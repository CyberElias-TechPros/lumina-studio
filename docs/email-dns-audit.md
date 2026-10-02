# Email & DNS audit — cea.ng (2 October 2026)

Sources: the cPanel zone, the Cloudflare zone you pasted, and the live code in
this repository. Everything below is either a finding (with the reason) or an
exact record change. Nothing here requires downtime.

**TL;DR — four real problems, in order of urgency:**

1. **A second MX is live that nobody remembers adding** — Mailgun's inbound
   host (`inbound-smtp.ap-northeast-1.amazonaws.com`, priority 10). Any mail it
   accepts is not in a mailbox you can read.
2. **SPF authorises that same Amazon SES path** via `+mx`. Combined with
   `aspf=s` in DMARC, this is exactly the setup that lets a forged sender pass
   as you.
3. **`mail.cea.ng` has no Cloudflare A record**, so your own mail hostname —
   which every mailbox, phone and desktop client connects to — does not resolve
   from Cloudflare DNS.
4. **cPanel hostnames are orange-clouded (proxied)** in Cloudflare. Webmail,
   WHM, cPanel, webdisk and ftp behind Cloudflare's proxy is a documented source
   of breakage (both for you and for mail clients), and it hides your origin
   without any benefit for these hosts.

There is also one **good** problem: your DNS already contains **three** DKIM
setups (TrueHost `smarthost`, `resend`) and four mailboxes that are perfectly
capable of becoming the real, permanent home of CEA's email — that is the
foundation for the "own your email" plan, and it is better than most businesses
your size have.

---

## 1. Current state: what each name actually does

| Name                                                                                                    | Type        | Value                                                                     | Purpose                                 | Verdict                                                         |
| ------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------- |
| `cea.ng`                                                                                                | A           | `54.37.90.54`                                                             | cPanel host                             | Keep (DNS-only)                                                 |
| `www.cea.ng`                                                                                            | CNAME       | `…vercel-dns-017.com`                                                     | Vercel production site                  | Keep (proxied is fine)                                          |
| `cea.ng`                                                                                                | MX 0        | `mail.cea.ng`                                                             | Mailbox delivery (TrueHost cPanel)      | **Keep — this is your mail**                                    |
| `cea.ng`                                                                                                | MX 0        | `cea.ng`                                                                  | Same host, redundant entry              | Redundant; harmless but tidy up                                 |
| `cea.ng`                                                                                                | MX 10       | `inbound-smtp.ap-northeast-1.amazonaws.com`                               | **Mailgun/SES inbound**                 | **DELETE** — see §2                                             |
| `mail.cea.ng`                                                                                           | MX 0        | `mail.cea.ng`                                                             | Self MX for the mail host               | Fine                                                            |
| `mails.cea.ng`                                                                                          | MX 10 + TXT | `feedback-smtp…amazonses.com`, `v=spf1 include:amazonses.com`             | Resend/SES bounce/feedback subdomain    | Keep (that's how Resend does bounce handling)                   |
| `mail.cea.ng`                                                                                           | CNAME       | → `cea.ng`                                                                | Mailbox host                            | **Needs an A record in Cloudflare (missing)**                   |
| `webmail` / `cpanel` / `whm` / `webdisk` / `autodiscover` / `autoconfig` / `cpcontacts` / `cpcalendars` | A           | `54.37.90.54`                                                             | cPanel services                         | **Un-proxy (grey cloud)**                                       |
| `ftp.cea.ng`                                                                                            | CNAME       | → `cea.ng`                                                                | FTP                                     | DNS-only already                                                |
| `cea.ng`                                                                                                | TXT         | `v=spf1 +a +mx include:_spf.truehostcloud.com include:amazonses.com ~all` | Sender authorisation                    | **Fix — remove `+mx`, drop `amazonses` unless Resend needs it** |
| `smarthost._domainkey`                                                                                  | TXT         | DKIM (TrueHost)                                                           | Signing your cPanel-sent mail           | Keep                                                            |
| `resend._domainkey`                                                                                     | TXT         | DKIM (Resend)                                                             | Signing Resend-sent mail                | Keep                                                            |
| `_dmarc`                                                                                                | TXT         | `v=DMARC1;p=quarantine;…aspf=s…rua=truehost`                              | Policy + reporting                      | **Improve — add your own rua, review `aspf=s`**                 |
| `*autodiscover.tcp`                                                                                     | SRV         | cPanel discovery                                                          | Let clients auto-configure              | Keep                                                            |
| `*caldavs.tcp`, `*carddavs.tcp`                                                                         | SRV+TXT     | `cea.ng:2080`, `path=/`                                                   | Calendar/contacts sync (CalDAV/CardDAV) | Keep — free contact & calendar sync for staff                   |
| `cea.ng`                                                                                                | TXT         | `google-site-verification=…`                                              | Search Console                          | Keep                                                            |
| `www.cea.ng`                                                                                            | TXT         | `yandex-verification: …`                                                  | Yandex verification                     | Optional                                                        |

---

## 2. Finding 1 — an inbound mail path you don't control (fix today)

`cea.ng MX 10 → inbound-smtp.ap-northeast-1.amazonaws.com`

This is Mailgun's (or a similar SES-based) **inbound** endpoint. When it was
added, somebody intended mail to be _received_ by that service and probably
forwarded onward. Two facts make it a problem now:

- Mail is routed **lowest priority number first**, so `mail.cea.ng` (0) wins for
  everything it accepts — but anything that host rejects or that is addressed to
  a domain routed to the `10` record can be swallowed by AWS instead. It is a
  second receiving system that no one is watching.
- The record also makes your **SPF** claim `+mx`, i.e. "hosts in my MX list may
  send as me". So `inbound-smtp.ap-northeast-1.amazonaws.com` is currently
  authorised to send mail as `@cea.ng`. That is a spoofer's dream, and with
  `aspf=s` (strict SPF alignment) in your DMARC, alignment mistakes turn into
  quarantined mail for your own students.

**Do:**

```dns
DELETE  cea.ng  MX 10 inbound-smtp.ap-northeast-1.amazonaws.com
DELETE  cea.ng  MX 0  cea.ng            ; redundant duplicate of mail.cea.ng
```

Then re-check that mail still arrives at all four mailboxes, and that
`dmarc-reports@truehostcloud.com` reports show SPF pass for your real senders.

⚠️ Before deleting: if you _deliberately_ forward `hello@cea.ng` into a Mailgun
route for an app (you don't — nothing in this repo references Mailgun inbound;
the worker's mail lib only _sends_), export the routes first. Nothing in the
codebase depends on it.

## 3. Finding 2 — SPF: one record, only real senders

Current:

```
v=spf1 +a +mx include:_spf.truehostcloud.com include:amazonses.com ~all
```

Problems:

- `+mx` → authorises every MX host to send (see §2). **Remove.**
- `+a` → authorises `cea.ng`'s A record (the cPanel host) — that's the same
  server as `mail.cea.ng`, and TrueHost's include already covers it. Harmless,
  but it stays only if you keep sending through cPanel.
- `include:amazonses.com` → **any** Amazon SES customer in that region. If
  Resend sends for you, use **Resend's own include** (it is narrower), or keep
  Amazon SES only if you send through SES directly.
- `~all` (softfail) is a fine choice while you are still tuning.
- **One SPF record only.** If Cloudflare already has one, edit it — a second TXT
  record starting `v=spf1` invalidates both.

Recommended target (adjust the provider include to the one you actually use):

```dns
cea.ng TXT "v=spf1 a include:_spf.truehostcloud.com include:spf.brevo.com ~all"
```

If you keep Resend as the transactional provider instead, swap the Brevo include
for the include Resend gives you in its dashboard.

## 4. Finding 3 — DKIM: keep three, add one

You already have:

- `smarthost._domainkey.cea.ng` → TrueHost/cPanel signing. **Keep** (this is what
  makes mail sent from your own mailboxes authentic).
- `resend._domainkey.cea.ng` → Resend signing. **Keep** (the worker's
  `EMAIL_PROVIDER=resend` uses it).
- `mails.cea.ng` SPF + MX → Resend/SES bounce handling. **Keep.**

To add **Brevo** (recommended as the marketing/second rung):

```dns
; Values come from Brevo → Senders & Domains → your domain → DKIM.
; Brevo gives 2 CNAMEs (mail._domainkey) — add exactly what the dashboard shows.
mail._domainkey.cea.ng   CNAME   <brevo gives you this>.
; and Brevo's own bounce host (Brevo publishes this too)
```

Do **not** create a fourth `_domainkey` selector by hand — copy what the provider
shows, because the selector name must match what their servers sign with.

## 5. Finding 4 — DMARC: right instinct, two adjustments

```
v=DMARC1;p=quarantine;sp=quarantine;adkim=r;aspf=s;pct=100;fo=0;rf=afrf;ri=86400;
rua=mailto:dmarc-reports@truehostcloud.com;ruf=mailto:dmarc-reports@truehostcloud.com
```

- `p=quarantine` is a strong, sensible policy — keep it (that's what stops
  spoofed invoices hitting your students' inboxes).
- `aspf=s` (strict SPF alignment) is **risky with `Reply-To`-style workflows**:
  if the visible From domain must match the SPF domain _exactly_, then sending
  from a subdomain (e.g. `mails.cea.ng`) while displaying `@cea.ng` will
  fail alignment. Since you send from both the cPanel host and Resend/Amazon,
  switch to **`aspf=r` (relaxed)** until every sender is verified, then tighten.
- `rua`/`ruf` currently go **only** to TrueHost. Add your own mailbox so you see
  the abuse and alignment reports:

```dns
_dmarc.cea.ng TXT "v=DMARC1;p=quarantine;sp=quarantine;adkim=r;aspf=r;pct=100;fo=0;rf=afrf;ri=86400;rua=mailto:dmarc-reports@truehostcloud.com,mailto:help@cea.ng;ruf=mailto:dmarc-reports@truehostcloud.com"
```

Reports are useful for one more reason: they will tell you who is sending as
`@cea.ng` (including the SES path, before you delete it).

## 6. Finding 5 — Cloudflare proxy and the missing mail record

**Un-proxy these** (orange → grey, "DNS only"):

```
webmail.cea.ng      A 54.37.90.54   DNS only
cpanel.cea.ng       A 54.37.90.54   DNS only
whm.cea.ng          A 54.37.90.54   DNS only
webdisk.cea.ng      A 54.37.90.54   DNS only
```

Why: Cloudflare's proxy only handles HTTP(S) on standard ports. Webmail login
sessions, WebDAV (webdisk), cPanel's password-protected subrequests and port
2083/2087 traffic break or degrade behind it. There's nothing to gain by proxying
a control panel.

**Add the missing record** — `mail.cea.ng` currently exists as a CNAME to
`cea.ng` in the cPanel zone but is absent from the Cloudflare zone:

```dns
mail.cea.ng   A   54.37.90.54   DNS only
```

Every phone and desktop mail client (and the MX record itself) points at
`mail.cea.ng`. If it doesn't resolve, mail clients fail intermittently — exactly
the kind of "my email is down" afternoon you don't have time for.

Also confirm these exist (they're in the cPanel zone; Cloudflare shows them, so
they're fine): `autodiscover`, `autoconfig`, `cpcontacts`, `cpcalendars` → DNS
only.

**Keep proxied:** `www.cea.ng` (Vercel) — that's the production site, and the
proxy gives you TLS, caching and bot protection for free.

---

## 7. What this means for the app

The worker sends through `backend/src/lib/email.ts`
(`EMAIL_PROVIDER=resend`, `EMAIL_FROM` in `wrangler.jsonc`). Two small changes
make the whole platform feel like a business instead of a form:

1. **Set a reply address that lands in your mailbox.**

   ```sh
   cd backend
   npx wrangler secret put EMAIL_REPLY_TO   # or add to vars: admission@cea.ng
   ```

   `sendEmail()` currently sets no `Reply-To`. Right now a student who replies to
   a receipt replies into the void. `admission@cea.ng` is already a mailbox you
   own and read (77 KB used, unrestricted), it is on the same domain, and it
   matches the address shown in the funnel — so alignment is preserved.

2. **Keep the From domain aligned.** `no-reply@cea.ng` is fine technically, but
   a no-reply address on transactional mail reads as untrustworthy to a Nigerian
   audience that is (rightly) wary of scam mail. Prefer:

   ```
   EMAIL_FROM = "Cyber Elias Academy <admission@cea.ng>"
   EMAIL_REPLY_TO = "admission@cea.ng"
   ```

   Mailbox plan (you already have all four, 1 GB each, nearly empty):

   | Mailbox            | Use                                                                                    |
   | ------------------ | -------------------------------------------------------------------------------------- |
   | `admission@cea.ng` | Admissions & enrollment — From/Reply-To for transactional mail, registration enquiries |
   | `hello@cea.ng`     | General enquiries, the address printed on the site and proposal                        |
   | `help@cea.ng`      | Support, and `rua` for DMARC reports                                                   |
   | `vizier@cea.ng`    | Vizier/product or a future role — currently unused                                     |

3. **Verify before announcing.** After changing records, send a test from the
   worker and check: SPF pass, DKIM pass, DMARC pass (a free check on
   mail-tester.com or the headers themselves), then re-check that a reply to
   `admission@cea.ng` appears in webmail. Only then change the site's contact
   copy everywhere.

---

## 8. Apply-order checklist

```text
1. Cloudflare → DNS:
   a. DELETE  cea.ng MX 10 inbound-smtp.ap-northeast-1.amazonaws.com
   b. DELETE  cea.ng MX 0  cea.ng                      (duplicate)
   c. ADD     mail.cea.ng  A 54.37.90.54  — DNS only
   d. UNPROXY webmail, cpanel, whm, webdisk            (grey cloud)
   e. EDIT    cea.ng SPF  → v=spf1 a include:_spf.truehostcloud.com include:<provider> ~all
   f. EDIT    _dmarc      → aspf=r, add mailto:help@cea.ng to rua
   g. ADD     Brevo DKIM CNAMEs (only what Brevo's dashboard shows)
2. Wait for TTL (14400s = 4h; Cloudflare proxy changes are instant).
3. Test: send to hello@ from Gmail → arrives in webmail?
         send from the worker → SPF/DKIM/DMARC all pass?
         reply to a transactional email → lands in admission@?
4. Then: set EMAIL_REPLY_TO in the worker, redeploy, run the smoke test in
   docs/go-live-checklist.md §6.
5. Then: print the right address on the site, proposal template and receipts.
```

## 9. Open questions for you

1. **Where did the Mailgun/SES inbound route come from?** If it forwards mail
   somewhere you use, tell me and we'll keep a route but point it at a mailbox
   you read. If it's a leftover from a trial, delete it (§2) — it is the single
   riskiest record in the zone.
2. **Which transactional sender do you want to keep long-term** — Resend (100/day,
   already wired) or Brevo (300/day, doubles as marketing)? The SPF include and
   DKIM set follow from that answer. My recommendation: Brevo for marketing
   lists, Resend for transactional, both signed, both in the SPF include list.
3. **Do you want the own-SMTP fallback built** (worker → `mail.cea.ng:587` via
   Cloudflare TCP sockets), so sending doesn't depend on any free tier? It's
   cheap to add behind a flag and it is the only path that cannot expire.
4. **Is `cyberelias.tk@gmail.com` still in use?** Your Brevo templates reference
   it as the support address. It should disappear from all student-facing copy in
   favour of `admission@cea.ng` / `help@cea.ng` — a free Gmail address on a
   `@cea.ng`-branded business reads as improvised, and it can't be recovered if
   the account is lost.
