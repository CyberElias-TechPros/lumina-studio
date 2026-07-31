import { sqliteTable, text, integer, real, index } from "drizzle-orm/sqlite-core";

export const engines = sqliteTable("engines", {
  key: text("key").primaryKey(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull().default(""),
  description: text("description").notNull().default(""),
  gradient: text("gradient").notNull().default(""),
  text: text("text").notNull().default(""),
  bullets: text("bullets").notNull().default("[]"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const programs = sqliteTable(
  "programs",
  {
    slug: text("slug").primaryKey(),
    title: text("title").notNull(),
    category: text("category").notNull(),
    engineKey: text("engine_key").notNull().references(() => engines.key),
    level: text("level").notNull(),
    duration: text("duration").notNull(),
    mode: text("mode").notNull(),
    price: integer("price").notNull().default(0),
    rating: real("rating").notNull().default(0),
    learners: integer("learners").notNull().default(0),
    blurb: text("blurb").notNull().default(""),
    outcomes: text("outcomes").notNull().default("[]"),
    modules: text("modules").notNull().default("[]"),
    tools: text("tools").notNull().default("[]"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (t) => [index("idx_programs_engine").on(t.engineKey)],
);

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    phone: text("phone"),
    passwordHash: text("password_hash"),
    roleKey: text("role_key").notNull().default("student"),
    status: text("status").notNull().default("active"),
    avatarUrl: text("avatar_url"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (t) => [index("idx_users_email").on(t.email)],
);

export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    createdAt: text("created_at").notNull(),
    expiresAt: text("expires_at").notNull(),
    revokedAt: text("revoked_at"),
  },
  (t) => [index("idx_sessions_user").on(t.userId), index("idx_sessions_token_hash").on(t.tokenHash)],
);

export const magicLinks = sqliteTable(
  "magic_links",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    tokenHash: text("token_hash").notNull().unique(),
    createdAt: text("created_at").notNull(),
    expiresAt: text("expires_at").notNull(),
    consumedAt: text("consumed_at"),
  },
  (t) => [index("idx_magic_links_email").on(t.email), index("idx_magic_links_token_hash").on(t.tokenHash)],
);

export const applications = sqliteTable(
  "applications",
  {
    id: text("id").primaryKey(),
    ref: text("ref").notNull().unique(),
    userId: text("user_id").references(() => users.id),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    city: text("city"),
    programSlug: text("program_slug").references(() => programs.slug),
    experience: text("experience"),
    status: text("status").notNull().default("submitted"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (t) => [index("idx_applications_email").on(t.email), index("idx_applications_ref").on(t.ref)],
);

export const courses = sqliteTable(
  "courses",
  {
    slug: text("slug").primaryKey(),
    title: text("title").notNull(),
    subtitle: text("subtitle").notNull().default(""),
    cohort: text("cohort").notNull().default(""),
    instructor: text("instructor").notNull().default(""),
    tone: text("tone").notNull().default(""),
    modules: text("modules").notNull().default("[]"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
);

export const enrollments = sqliteTable(
  "enrollments",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseSlug: text("course_slug")
      .notNull()
      .references(() => courses.slug, { onDelete: "cascade" }),
    pct: integer("pct").notNull().default(0),
    enrolledAt: text("enrolled_at").notNull(),
  },
  (t) => [index("idx_enrollments_user").on(t.userId)],
);

export const lessonProgress = sqliteTable(
  "lesson_progress",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseSlug: text("course_slug")
      .notNull()
      .references(() => courses.slug, { onDelete: "cascade" }),
    lessonId: text("lesson_id").notNull(),
    status: text("status").notNull(),
    completedAt: text("completed_at"),
  },
  (t) => [index("idx_lesson_progress_user").on(t.userId, t.courseSlug)],
);

export const gradebook = sqliteTable(
  "gradebook",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseName: text("course_name").notNull(),
    units: integer("units").notNull().default(0),
    letter: text("letter").notNull().default(""),
    pct: real("pct").notNull().default(0),
    trend: text("trend").notNull().default("="),
    items: text("items").notNull().default("[]"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_gradebook_user").on(t.userId)],
);

export const studentStats = sqliteTable("student_stats", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  lessonsThisWeek: integer("lessons_this_week").notNull().default(0),
  lessonsGoal: integer("lessons_goal").notNull().default(8),
  studyHours: text("study_hours").notNull().default("0h"),
  streakDays: integer("streak_days").notNull().default(0),
  nextDeadlineDue: text("next_deadline_due"),
  nextDeadlineTitle: text("next_deadline_title"),
});
