-- 0064_schools.sql
-- Schools programme (B2B): the schools you are talking to, their enquiries from
-- the public /schools page, and the proposals you generate and track.

CREATE TABLE IF NOT EXISTS schools (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  /** primary | secondary | mixed */
  level TEXT NOT NULL DEFAULT 'secondary',
  address TEXT,
  city TEXT DEFAULT 'Port Harcourt',
  /** School contact — the person who signs. */
  contact_name TEXT,
  contact_role TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  /** Rough student count, for fee-tier maths. */
  student_count INTEGER,
  /** prospect | contacted | proposal_sent | negotiating | won | lost */
  status TEXT NOT NULL DEFAULT 'prospect',
  notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_schools_status ON schools (status);

-- Enquiries from the public page. Kept separate from `schools` so a spam/typo
-- submission never becomes a record you have to clean up later.
CREATE TABLE IF NOT EXISTS school_inquiries (
  id TEXT PRIMARY KEY,
  school_name TEXT NOT NULL,
  /** primary | secondary | mixed */
  level TEXT NOT NULL DEFAULT 'secondary',
  contact_name TEXT NOT NULL,
  contact_role TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  student_count INTEGER,
  /** Free text: what they want, which term, constraints. */
  message TEXT,
  /** new | contacted | converted | spam */
  status TEXT NOT NULL DEFAULT 'new',
  /** schools.id once converted. */
  school_id TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_school_inquiries_status ON school_inquiries (status);

CREATE TABLE IF NOT EXISTS school_proposals (
  id TEXT PRIMARY KEY,
  /** Public share token — the school opens cea.ng/schools/proposal/<ref>. */
  ref TEXT NOT NULL UNIQUE,
  school_id TEXT NOT NULL,
  /** Snapshot of the school's details at generation time. */
  school_name TEXT NOT NULL,
  school_level TEXT NOT NULL,
  /** Term the programme starts (e.g. "First term, 2026/2027"). */
  term TEXT NOT NULL,
  students INTEGER NOT NULL,
  /** Naira per student per term, from the tier table. */
  rate_per_student INTEGER NOT NULL,
  total INTEGER NOT NULL,
  /** Per-term course plan: [{ term, course }]. */
  plan TEXT NOT NULL DEFAULT '[]',
  /** Extra services quoted separately. */
  extras TEXT NOT NULL DEFAULT '[]',
  /** 30 days default. */
  valid_until TEXT NOT NULL,
  /** draft | sent | viewed | accepted | declined | expired */
  status TEXT NOT NULL DEFAULT 'draft',
  sent_at TEXT,
  viewed_at TEXT,
  decided_at TEXT,
  /** Name + role typed by the school when accepting in place. */
  accepted_by TEXT,
  accepted_role TEXT,
  /** SHA-256 of the body at the moment of acceptance (tamper record). */
  accepted_hash TEXT,
  notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_school_proposals_school ON school_proposals (school_id);
CREATE INDEX IF NOT EXISTS idx_school_proposals_status ON school_proposals (status);
