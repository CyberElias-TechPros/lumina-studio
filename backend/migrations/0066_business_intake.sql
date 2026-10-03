-- 0066_business_intake.sql
-- Public project enquiries and partner applications, with a private review trail.

CREATE TABLE IF NOT EXISTS project_inquiries (
  id TEXT PRIMARY KEY,
  ref TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  project_type TEXT NOT NULL,
  brief TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  timeline TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'reviewing', 'scoping', 'proposal_sent', 'won', 'declined')),
  staff_note TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT 'public_site',
  consented_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_project_inquiries_created
  ON project_inquiries (created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_project_inquiries_status
  ON project_inquiries (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_inquiries_email
  ON project_inquiries (email);

CREATE TABLE IF NOT EXISTS project_inquiry_events (
  id TEXT PRIMARY KEY,
  inquiry_id TEXT NOT NULL REFERENCES project_inquiries(id) ON DELETE CASCADE,
  actor_email TEXT NOT NULL DEFAULT 'system',
  action TEXT NOT NULL,
  from_status TEXT,
  to_status TEXT,
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_project_inquiry_events_record
  ON project_inquiry_events (inquiry_id, created_at DESC);

CREATE TABLE IF NOT EXISTS partner_applications (
  id TEXT PRIMARY KEY,
  ref TEXT NOT NULL UNIQUE,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT NOT NULL,
  website TEXT,
  partnership_type TEXT NOT NULL,
  region TEXT NOT NULL,
  capabilities TEXT NOT NULL,
  proposal TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'reviewing', 'interview', 'approved', 'declined', 'admitted')),
  staff_note TEXT NOT NULL DEFAULT '',
  portal_user_id TEXT REFERENCES users(id),
  consented_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_partner_applications_created
  ON partner_applications (created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_partner_applications_status
  ON partner_applications (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_partner_applications_email
  ON partner_applications (email);

CREATE TABLE IF NOT EXISTS partner_application_events (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL REFERENCES partner_applications(id) ON DELETE CASCADE,
  actor_email TEXT NOT NULL DEFAULT 'system',
  action TEXT NOT NULL,
  from_status TEXT,
  to_status TEXT,
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_partner_application_events_record
  ON partner_application_events (application_id, created_at DESC);
