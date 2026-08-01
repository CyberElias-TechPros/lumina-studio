-- 0001_lms.sql — Phase 2 LMS core schema
-- Course content (modules/lessons) is stored as JSON on courses, mirroring the
-- programs pattern. Per-user state lives in enrollments + lesson_progress;
-- gradebook and student_stats are per-user. Lesson status in the API is
-- computed: lesson_progress overrides, else 'preview' passthrough, else 'locked'.

CREATE TABLE courses (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  cohort TEXT NOT NULL DEFAULT '',
  instructor TEXT NOT NULL DEFAULT '',
  tone TEXT NOT NULL DEFAULT '',
  modules TEXT NOT NULL DEFAULT '[]',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE enrollments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_slug TEXT NOT NULL REFERENCES courses(slug) ON DELETE CASCADE,
  pct INTEGER NOT NULL DEFAULT 0,
  enrolled_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  UNIQUE (user_id, course_slug)
);
CREATE INDEX idx_enrollments_user ON enrollments(user_id);

CREATE TABLE lesson_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_slug TEXT NOT NULL REFERENCES courses(slug) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('done', 'in-progress')),
  completed_at TEXT,
  UNIQUE (user_id, course_slug, lesson_id)
);
CREATE INDEX idx_lesson_progress_user ON lesson_progress(user_id, course_slug);

CREATE TABLE gradebook (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_name TEXT NOT NULL,
  units INTEGER NOT NULL DEFAULT 0,
  letter TEXT NOT NULL DEFAULT '',
  pct REAL NOT NULL DEFAULT 0,
  trend TEXT NOT NULL DEFAULT '=',
  items TEXT NOT NULL DEFAULT '[]',
  sort_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE (user_id, course_name)
);
CREATE INDEX idx_gradebook_user ON gradebook(user_id);

CREATE TABLE student_stats (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  lessons_this_week INTEGER NOT NULL DEFAULT 0,
  lessons_goal INTEGER NOT NULL DEFAULT 8,
  study_hours TEXT NOT NULL DEFAULT '0h',
  streak_days INTEGER NOT NULL DEFAULT 0,
  next_deadline_due TEXT,
  next_deadline_title TEXT
);
