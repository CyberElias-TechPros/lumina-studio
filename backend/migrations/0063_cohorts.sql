-- 0063_cohorts.sql
-- Cohorts: the real start dates behind "next intake", so the site, the ICS
-- invite and the assistant all read one row instead of three hardcoded strings.

CREATE TABLE IF NOT EXISTS cohorts (
  id TEXT PRIMARY KEY,
  /** Matches a longform program slug, or "" for short-course rolling intakes. */
  program_slug TEXT NOT NULL DEFAULT '',
  label TEXT NOT NULL,
  /** short | long */
  kind TEXT NOT NULL DEFAULT 'long',
  /** YYYY-MM-DD — first class day. */
  start_date TEXT NOT NULL,
  /** YYYY-MM-DD — last class day. */
  end_date TEXT,
  /** "Mon/Wed/Fri" | "Tue/Thu/Sat" | "standard" | "rolling" */
  days TEXT NOT NULL DEFAULT 'standard',
  /** morning | afternoon | evening | any */
  time_slot TEXT NOT NULL DEFAULT 'any',
  /** onsite | online | hybrid */
  mode TEXT NOT NULL DEFAULT 'onsite',
  /** Null = no cap recorded. */
  capacity INTEGER,
  notes TEXT,
  /** scheduled | running | completed | cancelled */
  status TEXT NOT NULL DEFAULT 'scheduled',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_cohorts_start ON cohorts (start_date);
CREATE INDEX IF NOT EXISTS idx_cohorts_program ON cohorts (program_slug);

-- Optional link from a registration to the cohort the student was placed in.
ALTER TABLE registrations ADD COLUMN cohort_id TEXT;
CREATE INDEX IF NOT EXISTS idx_registrations_cohort ON registrations (cohort_id);
