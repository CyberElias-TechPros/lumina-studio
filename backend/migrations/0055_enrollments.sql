-- 0055: Enrollment funnel v2.
--
-- Full-funnel student enrollment records (short courses + long-form
-- trainings), payment sessions against them, and an event timeline.
--
-- Every enrollment also mirrors a row into `applications` (same ref) so
-- the existing admissions pipeline, hub stats and admin workflows keep
-- working untouched.

CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY,
  ref TEXT NOT NULL UNIQUE,
  program_slug TEXT NOT NULL,
  program_kind TEXT NOT NULL CHECK (program_kind IN ('short', 'long')),
  program_title TEXT NOT NULL,
  fee_total INTEGER NOT NULL,
  -- schedule
  schedule_days TEXT NOT NULL DEFAULT 'standard',
  time_slot TEXT NOT NULL DEFAULT 'any',
  mode TEXT NOT NULL DEFAULT 'onsite' CHECK (mode IN ('onsite', 'online', 'hybrid')),
  preferred_start TEXT,
  -- student
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  birth_year INTEGER,
  gender TEXT,
  education_level TEXT,
  experience_level TEXT,
  goal TEXT,
  employer TEXT,
  has_laptop INTEGER NOT NULL DEFAULT 1,
  referred_by TEXT,
  -- payment
  payment_plan TEXT NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'paystack',
  deposit_amount INTEGER NOT NULL DEFAULT 0,
  payment_status TEXT NOT NULL DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid', 'deposit_paid', 'paid', 'failed')),
  payment_ref TEXT,
  paid_amount INTEGER NOT NULL DEFAULT 0,
  paid_at TEXT,
  -- pipeline (mirrors applications status stages)
  stage TEXT NOT NULL DEFAULT 'submitted'
    CHECK (stage IN ('submitted', 'screening', 'assessment', 'interview', 'offer', 'enrolled', 'declined')),
  note TEXT NOT NULL DEFAULT '',
  -- anti-abuse / audit
  turnstile_passed INTEGER NOT NULL DEFAULT 0,
  source_ip TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations (email);
CREATE INDEX IF NOT EXISTS idx_registrations_stage ON registrations (stage);
CREATE INDEX IF NOT EXISTS idx_registrations_program ON registrations (program_slug);

CREATE TABLE IF NOT EXISTS registration_payments (
  id TEXT PRIMARY KEY,
  registration_ref TEXT NOT NULL REFERENCES registrations (ref),
  reference TEXT NOT NULL UNIQUE,
  kind TEXT NOT NULL CHECK (kind IN ('deposit', 'balance', 'full')),
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'NGN',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
  created_at TEXT NOT NULL,
  paid_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_registration_payments_ref ON registration_payments (registration_ref);

CREATE TABLE IF NOT EXISTS registration_events (
  id TEXT PRIMARY KEY,
  registration_ref TEXT NOT NULL REFERENCES registrations (ref),
  event TEXT NOT NULL,
  detail TEXT NOT NULL DEFAULT '',
  at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_registration_events_ref ON registration_events (registration_ref);
