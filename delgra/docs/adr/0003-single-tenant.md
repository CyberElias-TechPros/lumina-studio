# 3. One database per business (single-tenant)

**Status:** Accepted

## Context

The app could be built multi-tenant — one Worker, one D1 database, a `tenant_id`
on every table — and then sold to other businesses. That is a plausible future,
so it deserves an explicit decision rather than an accident.

## Decision

**Single-tenant.** One D1 database holds exactly one business. The `business`
table is a single row with the literal id `'business'`. No table has a
`tenant_id` column, and no query filters by one.

A second business means a second deployment with a second database.

## Consequences

**Good:**

- No query can leak across tenants, because there is no way to express it. An
  IDOR bug can expose a record to the wrong *role*; it cannot expose it to the
  wrong *company*.
- Every query is simpler, and the indexes are smaller.
- Backups, restores and deletion are per-customer by construction — relevant if
  a business ever asks for its data to be erased.

**Cost:** a second branch with separate books needs a second deployment.
Operating ten businesses means ten Workers.

## Rejected alternative

Multi-tenant with `tenant_id` everywhere. It is the right call for a SaaS
product, but it imposes a tax on every single query forever, and one forgotten
`WHERE tenant_id = ?` is a cross-company data breach. For a tool built for one
specific business, the isolation guarantee of separate databases is worth more
than the operational convenience of one deployment.

If multi-tenancy is ever needed, the migration path is to add `tenant_id` with a
`NOT NULL` default, backfill, and add the filter to every route — a deliberate
project, not something to leave half-done.
