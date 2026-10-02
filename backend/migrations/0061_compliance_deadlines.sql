-- 0061_compliance_deadlines.sql
-- Real regulatory deadlines (CAC annual returns, FIRS/NRS filings, licences).
--
-- The compliance screens previously showed seeded "Filed" rows that were not
-- facts. This table is the opposite: rows are entered by a human from what the
-- portal actually says, and the reminder job computes the warning buckets from
-- `due_on` — nothing is invented.

CREATE TABLE IF NOT EXISTS compliance_deadlines (
  id TEXT PRIMARY KEY,
  /** What the deadline is (e.g. "CAC annual return — accounts to 15 Oct 2025"). */
  title TEXT NOT NULL,
  /** CAC | FIRS | NRS | Rivers State | other */
  authority TEXT NOT NULL DEFAULT 'other',
  /** annual_return | tax | licence | report | other */
  category TEXT NOT NULL DEFAULT 'other',
  /** YYYY-MM-DD — the date the portal states. */
  due_on TEXT NOT NULL,
  /** none | annual | quarterly | monthly — what happens after it is completed. */
  recurrence TEXT NOT NULL DEFAULT 'none',
  notes TEXT,
  /** open | done | waived */
  status TEXT NOT NULL DEFAULT 'open',
  completed_on TEXT,
  completed_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_compliance_deadlines_due ON compliance_deadlines (due_on);
CREATE INDEX IF NOT EXISTS idx_compliance_deadlines_status ON compliance_deadlines (status);

-- Which reminder buckets have already gone out, so a daily tick sends each one
-- exactly once per deadline (30/14/7/3/1/0 days).
CREATE TABLE IF NOT EXISTS compliance_reminder_log (
  deadline_id TEXT NOT NULL,
  /** Day-count bucket: 30 | 14 | 7 | 3 | 1 | 0 */
  bucket INTEGER NOT NULL,
  sent_at TEXT NOT NULL,
  PRIMARY KEY (deadline_id, bucket)
);
