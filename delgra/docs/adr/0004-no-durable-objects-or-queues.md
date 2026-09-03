# 4. No Durable Objects, no Queues

**Status:** Accepted

## Context

The target stack makes Durable Objects, Queues and Cron available. It is tempting
to reach for them — they are there, and "production-grade" sounds like it should
use them.

## Decision

Use **D1, R2 and KV only**, plus a single daily Cron trigger. No Durable Objects.
No Queues.

## Reasoning

Each candidate use was examined against what the workload actually does:

**"Sequence generation needs a Durable Object."** It does not. Invoice numbers
come from a `counters` row updated inside the same `db.batch()` as the insert,
with a `UNIQUE` index as the final net. Two concurrent inserts racing for
`DEL-2026-TF-07` produce one success and one retryable 409. That is correct
behaviour, and it costs nothing.

**"PDF generation should be queued."** An invoice PDF renders in well under the
Worker CPU limit — measured at 2,645 bytes of PDF in 81 ms including the
database round trips. Queueing it would add latency to a user who is waiting, to
solve a problem that does not exist.

**"Email should be queued for retries."** Reasonable in general, but no email
provider is configured, and building a queue for a path that is currently skipped
is speculative infrastructure. When email is turned on, a retry can start as a
simple attempt with the failure logged.

**"Real-time collaboration needs a Durable Object."** There is no real-time
collaboration. Two staff editing one invoice is last-write-wins, which is
documented as a limitation rather than solved with infrastructure nobody asked
for.

**"Orphan cleanup needs a queue."** The Cron handler walks R2 at 5 pages per run
and skips `branding/`. Bounded, resumable, and finished.

## Consequences

**Good:** three bindings to reason about instead of five. No DO storage billing.
No queue consumer to monitor. Fewer ways to be wrong.

**Cost:** if the business ever needs genuinely asynchronous work — bulk import,
scheduled email reminders — that decision has to be revisited. It should be
revisited with a concrete requirement in hand, not before.
