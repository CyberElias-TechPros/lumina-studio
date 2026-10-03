# Business project and partner intake

The public routes `/services`, `/request-project`, `/partners`, and
`/partners/apply` feed two separate private pipelines. Project briefs are not
written into the general marketing-leads table, so scope and budget details
remain available only to administrators.

## Project enquiries

1. A prospective client submits a brief with a project type, budget band,
   timeline, contact details, and explicit permission to follow up.
2. The API validates the fields, consumes the IP rate limit, checks the hidden
   honeypot, and verifies Cloudflare Turnstile whenever its secret is set.
3. The brief and initial event are committed to `project_inquiries` and
   `project_inquiry_events`. The response contains a `PROJ-...` reference.
4. Best-effort email sends an internal alert and a receipt to the requester.
   Admins review the queue at `/app/admin/intake`, contact the requester, move
   the work through New → Reviewing → Scoping → Proposal sent → Won/Declined,
   and save private handover notes. Each change is recorded in the event and
   audit logs.

## Partner applications and admission

1. A prospective partner describes the organisation, focus, relevant
   capability, location, and a concrete proposed collaboration. Submission is
   not approval; the receipt explicitly says so.
2. The application is stored separately in `partner_applications` and its
   review events. Admins screen it at `/app/admin/intake`, record private
   notes, and move it through New → Reviewing → Conversation → Approved or
   Declined.
3. Only an administrator can run **Admit and provision account**, and only
   after the status is Approved. The operation creates an active `partner`
   user or reuses an already-active partner account. It never changes an
   existing non-partner or suspended account. Admission is audited and the
   applicant receives the `/auth/sign-in` link if transactional email is
   available; they use the admitted email and the one-time sign-in option. Admins
   can resend those instructions from the queue if the first delivery fails or
   is missed; resend attempts are recorded in the application and audit logs.

## Retention

The existing daily cleanup job removes project enquiries that have had no review
activity for two years unless they were marked Won. It also removes partner
applications with no review activity for two years unless they were Admitted;
related review events cascade with the parent record. Won project and admitted
partner records remain as business/account records and should be handled under
the academy's active-contract, account and legal-retention process.

## Production configuration

The intake flows reuse existing platform configuration; they add no new
secrets:

- Run `npm run db:migrate:local` in `backend/` for local development, and apply
  `backend/migrations/0066_business_intake.sql` to the production D1 database
  before deploying the Worker.
- Set `CONTACT_INBOX` to the monitored business-intake mailbox. If it is not
  set, alerts use `EMAIL_REPLY_TO`, then `help@cea.ng` as a final fallback.
- Configure the existing transactional mail provider (`EMAIL_PROVIDER`,
  `EMAIL_API_KEY`, and the provider's sender/domain settings). The existing
  Operations → Integration readiness screen reports email and inbox readiness.
  Database writes succeed even if email delivery is unavailable; notifications
  are intentionally best-effort and failures are logged.
- Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the Worker `TURNSTILE_SECRET_KEY`
  together to enforce human verification. With neither key set, the form still
  works and the API rate limits remain active.
- Ensure the deployed frontend origin is listed in `FRONTEND_ORIGINS` if the
  Worker is hosted on a separate origin. No new origin is required when the
  current production frontend/API configuration is retained.

Keep intake access limited to administrators: the API uses explicit admin RBAC,
private rows are excluded from the general marketing-leads endpoint, and the
admin pages inherit the existing `/app/*` `noindex` policy. Do not place
secrets, payment details, or sensitive personal information in the free-text
briefs.
