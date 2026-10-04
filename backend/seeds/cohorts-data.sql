-- Cohorts — dates entered by admissions. Public date displays must use a
-- course-specific scheduled row from this table; generic rolling-intake rows
-- and development mocks are not confirmed start dates. Update when admissions
-- confirms a date. The public API and ICS invites read this table.
INSERT OR IGNORE INTO cohorts
  (id, program_slug, label, kind, start_date, end_date, days, time_slot, mode, capacity, notes, status, created_at, updated_at)
VALUES
  ('cohort-wdp-2026-11', 'web-development-professional', 'Web Development Professional — November 2026 cohort', 'long',
   '2026-11-02', '2027-04-30', 'Mon/Wed/Fri', 'evening', 'hybrid', 20,
   'Next intake after this one: 16 February 2027.', 'scheduled',
   '2026-10-02T00:00:00.000Z', '2026-10-02T00:00:00.000Z'),
  ('cohort-wdp-2027-02', 'web-development-professional', 'Web Development Professional — February 2027 cohort', 'long',
   '2027-02-16', '2027-08-13', 'Mon/Wed/Fri', 'evening', 'hybrid', 20,
   'One cohort per training; confirm the exact dates with admissions.', 'scheduled',
   '2026-10-02T00:00:00.000Z', '2026-10-02T00:00:00.000Z'),
  ('cohort-itp-2026-11', 'it-professional-diploma', 'IT Professional Diploma — November 2026 cohort', 'long',
   '2026-11-02', '2027-04-30', 'Mon/Wed/Fri', 'morning', 'onsite', 20,
   'Runs alongside the web development cohort.', 'scheduled',
   '2026-10-02T00:00:00.000Z', '2026-10-02T00:00:00.000Z'),
  -- Generic rolling-intake marker only; no course-specific short-course start date.
  ('cohort-short-rolling', '', 'Short courses — rolling intake', 'short',
   '2026-10-02', NULL, 'rolling', 'any', 'onsite', NULL,
   'No course-specific start date is recorded. Admissions must confirm availability and dates.', 'running',
   '2026-10-02T00:00:00.000Z', '2026-10-02T00:00:00.000Z');
