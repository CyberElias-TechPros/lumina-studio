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
    engineKey: text("engine_key")
      .notNull()
      .references(() => engines.key),
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
  (t) => [
    index("idx_sessions_user").on(t.userId),
    index("idx_sessions_token_hash").on(t.tokenHash),
  ],
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
  (t) => [
    index("idx_magic_links_email").on(t.email),
    index("idx_magic_links_token_hash").on(t.tokenHash),
  ],
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

export const courses = sqliteTable("courses", {
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
});

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

export const assignments = sqliteTable(
  "assignments",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    course: text("course").notNull().default(""),
    description: text("description").notNull().default(""),
    due: text("due").notNull().default(""),
    status: text("status").notNull().default("pending"),
    score: integer("score"),
    max: integer("max").notNull().default(100),
    weight: integer("weight").notNull().default(0),
    submissions: text("submissions").notNull().default("[]"),
    rubric: text("rubric").notNull().default("[]"),
  },
  (t) => [index("idx_assignments_user").on(t.userId)],
);

export const assessments = sqliteTable(
  "assessments",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    course: text("course").notNull().default(""),
    kind: text("kind").notNull().default("quiz"),
    questions: integer("questions").notNull().default(0),
    duration: text("duration").notNull().default(""),
    due: text("due").notNull().default(""),
    status: text("status").notNull().default("scheduled"),
    score: integer("score"),
    max: integer("max"),
    attempts: integer("attempts").notNull().default(1),
    attemptsLeft: integer("attempts_left").notNull().default(0),
    window: text("window").notNull().default(""),
  },
  (t) => [index("idx_assessments_user").on(t.userId)],
);

export const calendarEvents = sqliteTable("calendar_events", {
  id: text("id").primaryKey(),
  date: text("date").notNull(),
  day: text("day").notNull(),
  title: text("title").notNull(),
  kind: text("kind").notNull().default("event"),
  time: text("time").notNull().default(""),
  location: text("location").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const messageThreads = sqliteTable(
  "message_threads",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    role: text("role").notNull().default(""),
    unread: integer("unread").notNull().default(0),
    lastText: text("last_text").notNull().default(""),
    lastTime: text("last_time").notNull().default(""),
    lastMine: integer("last_mine").notNull().default(0),
    messages: text("messages").notNull().default("[]"),
  },
  (t) => [index("idx_message_threads_user").on(t.userId)],
);

export const instructorCourses = sqliteTable(
  "instructor_courses",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    cohort: text("cohort").notNull().default(""),
    status: text("status").notNull().default("draft"),
    modules: text("modules").notNull().default("[]"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_instructor_courses_user").on(t.userId)],
);

export const submissions = sqliteTable(
  "submissions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    student: text("student").notNull(),
    title: text("title").notNull().default(""),
    submitted: text("submitted").notNull().default(""),
    status: text("status").notNull().default("pending"),
    score: integer("score"),
    late: integer("late").notNull().default(0),
    file: text("file").notNull().default(""),
    size: text("size").notNull().default(""),
  },
  (t) => [index("idx_submissions_user").on(t.userId)],
);

export const instructorGradebook = sqliteTable(
  "instructor_gradebook",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    student: text("student").notNull(),
    quiz: integer("quiz").notNull().default(0),
    lab: integer("lab").notNull().default(0),
    assignment: integer("assignment").notNull().default(0),
    midterm: integer("midterm").notNull().default(0),
    total: integer("total").notNull().default(0),
    letter: text("letter").notNull().default(""),
    atRisk: integer("at_risk").notNull().default(0),
  },
  (t) => [index("idx_instructor_gradebook_user").on(t.userId)],
);

export const employees = sqliteTable("employees", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull().default(""),
  dept: text("dept").notNull().default(""),
  status: text("status").notNull().default("active"),
  joined: text("joined").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const leaveRequests = sqliteTable("leave_requests", {
  id: text("id").primaryKey(),
  employee: text("employee").notNull(),
  type: text("type").notNull().default(""),
  fromDate: text("from_date").notNull().default(""),
  toDate: text("to_date").notNull().default(""),
  status: text("status").notNull().default("pending"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const invoices = sqliteTable("invoices", {
  id: text("id").primaryKey(),
  party: text("party").notNull(),
  amount: integer("amount").notNull().default(0),
  due: text("due").notNull().default(""),
  status: text("status").notNull().default("pending"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const expenses = sqliteTable("expenses", {
  id: text("id").primaryKey(),
  category: text("category").notNull(),
  amount: integer("amount").notNull().default(0),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const adminUsers = sqliteTable("admin_users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().default(""),
  role: text("role").notNull().default(""),
  status: text("status").notNull().default("active"),
  lastSeen: text("last_seen").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const auditLog = sqliteTable("audit_log", {
  id: text("id").primaryKey(),
  actor: text("actor").notNull().default(""),
  action: text("action").notNull().default(""),
  time: text("time").notNull().default(""),
  severity: text("severity").notNull().default("info"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const notifications = sqliteTable(
  "notifications",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull().default(""),
    body: text("body").notNull().default(""),
    time: text("time").notNull().default(""),
    engine: text("engine").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_notifications_user").on(t.userId)],
);
