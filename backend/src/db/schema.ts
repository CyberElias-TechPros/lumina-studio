import {
  sqliteTable,
  text,
  integer,
  real,
  index,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/sqlite-core";

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
    emailVerifiedAt: text("email_verified_at"),
    mfaSecret: text("mfa_secret"),
    mfaEnabled: integer("mfa_enabled").notNull().default(0),
    recoveryCodes: text("recovery_codes").notNull().default("[]"),
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
    deviceLabel: text("device_label").notNull().default(""),
    createdIp: text("created_ip").notNull().default(""),
    mfaPending: integer("mfa_pending").notNull().default(0),
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
    kind: text("kind").notNull().default("magic-link"),
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
    note: text("note").notNull().default(""),
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
    submittedAt: text("submitted_at"),
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
    assignmentId: text("assignment_id"),
    studentUserId: text("student_user_id"),
    feedback: text("feedback").notNull().default(""),
    gradedBy: text("graded_by"),
    gradedAt: text("graded_at"),
  },
  (t) => [
    index("idx_submissions_user").on(t.userId),
    index("idx_submissions_assignment").on(t.assignmentId),
  ],
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

export const invoices = sqliteTable(
  "invoices",
  {
    id: text("id").primaryKey(),
    party: text("party").notNull(),
    amount: integer("amount").notNull().default(0),
    due: text("due").notNull().default(""),
    status: text("status").notNull().default("pending"),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_invoices_user").on(t.userId)],
);

export const expenses = sqliteTable("expenses", {
  id: text("id").primaryKey(),
  category: text("category").notNull(),
  amount: integer("amount").notNull().default(0),
  status: text("status").notNull().default("pending"),
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

export const payrollChanges = sqliteTable("payroll_changes", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default(""),
  detail: text("detail").notNull().default(""),
  status: text("status").notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const paymentBatches = sqliteTable("payment_batches", {
  id: text("id").primaryKey(),
  batch: text("batch").notNull().default(""),
  amount: integer("amount").notNull().default(0),
  count: integer("count").notNull().default(0),
  date: text("date").notNull().default(""),
  status: text("status").notNull().default("pending"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const payments = sqliteTable(
  "payments",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    reference: text("reference").notNull(),
    email: text("email").notNull().default(""),
    amount: integer("amount").notNull().default(0),
    currency: text("currency").notNull().default("NGN"),
    status: text("status").notNull().default("pending"),
    provider: text("provider").notNull().default("paystack"),
    description: text("description").notNull().default(""),
    paidAt: text("paid_at"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [
    uniqueIndex("idx_payments_reference").on(t.reference),
    index("idx_payments_user").on(t.userId),
  ],
);

export const notifications = sqliteTable(
  "notifications",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull().default(""),
    body: text("body").notNull().default(""),
    time: text("time").notNull().default(""),
    engine: text("engine").notNull().default(""),
    readAt: text("read_at"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_notifications_user").on(t.userId)],
);

export const notificationReads = sqliteTable(
  "notification_reads",
  {
    notificationId: text("notification_id")
      .notNull()
      .references(() => notifications.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    readAt: text("read_at").notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.notificationId, t.userId] }),
    index("idx_notification_reads_user").on(t.userId),
  ],
);

/* ---------------- Phase 4: recruitment ---------------- */

export const jobPostings = sqliteTable("job_postings", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default(""),
  applicants: integer("applicants").notNull().default(0),
  views: integer("views").notNull().default(0),
  posted: text("posted").notNull().default(""),
  status: text("status").notNull().default("active"),
  detail: text("detail").notNull().default(""),
  tone: text("tone").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const pipelineCandidates = sqliteTable(
  "pipeline_candidates",
  {
    id: text("id").primaryKey(),
    jobId: text("job_id").notNull().default(""),
    name: text("name").notNull().default(""),
    stage: text("stage").notNull().default(""),
    detail: text("detail").notNull().default(""),
    score: integer("score").notNull().default(0),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_pipeline_candidates_job").on(t.jobId)],
);

export const interviews = sqliteTable("interviews", {
  id: text("id").primaryKey(),
  candidate: text("candidate").notNull().default(""),
  role: text("role").notNull().default(""),
  date: text("date").notNull().default(""),
  mode: text("mode").notNull().default(""),
  status: text("status").notNull().default("pending"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const talentCandidates = sqliteTable("talent_candidates", {
  id: text("id").primaryKey(),
  name: text("name").notNull().default(""),
  program: text("program").notNull().default(""),
  score: integer("score").notNull().default(0),
  stage: text("stage").notNull().default(""),
  match: integer("match").notNull().default(0),
  skills: text("skills").notNull().default("[]"),
  available: text("available").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

/* ---------------- Phase 4: marketing ---------------- */

export const marketingKpis = sqliteTable("marketing_kpis", {
  id: text("id").primaryKey(),
  page: text("page").notNull().default(""),
  label: text("label").notNull().default(""),
  value: text("value").notNull().default(""),
  delta: text("delta").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const campaigns = sqliteTable("campaigns", {
  id: text("id").primaryKey(),
  name: text("name").notNull().default(""),
  channel: text("channel").notNull().default(""),
  spend: integer("spend").notNull().default(0),
  leads: integer("leads").notNull().default(0),
  roas: real("roas").notNull().default(0),
  status: text("status").notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const emailCampaigns = sqliteTable("email_campaigns", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default(""),
  recipients: integer("recipients").notNull().default(0),
  openRate: integer("open_rate").notNull().default(0),
  status: text("status").notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const socialPosts = sqliteTable("social_posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default(""),
  channel: text("channel").notNull().default(""),
  date: text("date").notNull().default(""),
  status: text("status").notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const landingPages = sqliteTable("landing_pages", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default(""),
  conversion: real("conversion").notNull().default(0),
  status: text("status").notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const seoKeywords = sqliteTable("seo_keywords", {
  id: text("id").primaryKey(),
  keyword: text("keyword").notNull().default(""),
  position: integer("position").notNull().default(0),
  delta: text("delta").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const contentCalendar = sqliteTable("content_calendar", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default(""),
  channel: text("channel").notNull().default(""),
  date: text("date").notNull().default(""),
  status: text("status").notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  name: text("name").notNull().default(""),
  score: integer("score").notNull().default(0),
  detail: text("detail").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const marketingReports = sqliteTable("marketing_reports", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default(""),
  published: text("published").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const funnelStages = sqliteTable("funnel_stages", {
  id: text("id").primaryKey(),
  stage: text("stage").notNull().default(""),
  value: integer("value").notNull().default(0),
  pct: real("pct").notNull().default(0),
  sortOrder: integer("sort_order").notNull().default(0),
});

/* ---------------- Phase 4: design ---------------- */

export const designComponents = sqliteTable(
  "design_components",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    detail: text("detail").notNull().default(""),
    states: integer("states").notNull().default(0),
    usage: integer("usage").notNull().default(0),
    status: text("status").notNull().default("draft"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_design_components_status").on(t.status)],
);

export const designFlows = sqliteTable(
  "design_flows",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    stepsCount: integer("steps_count").notNull().default(0),
    decisionsCount: integer("decisions_count").notNull().default(0),
    status: text("status").notNull().default("draft"),
    flowSteps: text("flow_steps").notNull().default("[]"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_design_flows_status").on(t.status)],
);

export const designPrototypes = sqliteTable(
  "design_prototypes",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    version: text("version").notNull().default(""),
    status: text("status").notNull().default("draft"),
    feedbackCount: integer("feedback_count").notNull().default(0),
    owner: text("owner").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_design_prototypes_status").on(t.status)],
);

export const designTokens = sqliteTable(
  "design_tokens",
  {
    id: text("id").primaryKey(),
    kind: text("kind").notNull().default("color"),
    name: text("name").notNull(),
    value: text("value").notNull().default(""),
    hex: text("hex").notNull().default(""),
    family: text("family").notNull().default(""),
    deprecated: integer("deprecated").notNull().default(0),
    status: text("status").notNull().default("Active"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_design_tokens_kind").on(t.kind)],
);

export const designVersions = sqliteTable(
  "design_versions",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    change: text("change").notNull().default(""),
    editor: text("editor").notNull().default(""),
    when: text("when").notNull().default(""),
    status: text("status").notNull().default("Stable"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_design_versions_status").on(t.status)],
);

export const collaborationThreads = sqliteTable(
  "collaboration_threads",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    detail: text("detail").notNull().default(""),
    author: text("author").notNull().default(""),
    status: text("status").notNull().default("Open"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_collaboration_threads_status").on(t.status)],
);

export const designExports = sqliteTable(
  "design_exports",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    format: text("format").notNull().default(""),
    size: text("size").notNull().default(""),
    owner: text("owner").notNull().default(""),
    status: text("status").notNull().default("Queued"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_design_exports_status").on(t.status)],
);

export const systemComponents = sqliteTable(
  "system_components",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    variants: integer("variants").notNull().default(0),
    states: integer("states").notNull().default(0),
    usage: integer("usage").notNull().default(0),
    status: text("status").notNull().default("draft"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_system_components_status").on(t.status)],
);

export const designKpis = sqliteTable(
  "design_kpis",
  {
    id: text("id").primaryKey(),
    value: integer("value").notNull().default(0),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_design_kpis_sort").on(t.sortOrder)],
);

/* ---------------- Phase 4.5: realtime + live ---------------- */

export const realtimeRooms = sqliteTable(
  "realtime_rooms",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull().default(""),
    kind: text("kind").notNull().default("chat"),
    createdAt: text("created_at").notNull().default(""),
    createdBy: text("created_by").references(() => users.id, { onDelete: "set null" }),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_realtime_rooms_kind").on(t.kind)],
);

export const realtimeMessages = sqliteTable(
  "realtime_messages",
  {
    id: text("id").primaryKey(),
    roomId: text("room_id").notNull().default(""),
    channel: text("channel").notNull().default("chat"),
    userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
    userName: text("user_name").notNull().default(""),
    body: text("body").notNull().default(""),
    createdAt: text("created_at").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_realtime_messages_room").on(t.roomId, t.sortOrder)],
);

export const liveSessions = sqliteTable("live_sessions", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default(""),
  instructor: text("instructor").notNull().default(""),
  cohort: text("cohort").notNull().default(""),
  status: text("status").notNull().default("scheduled"),
  startsAt: text("starts_at").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const livePolls = sqliteTable(
  "live_polls",
  {
    id: text("id").primaryKey(),
    classId: text("class_id").notNull().default(""),
    question: text("question").notNull().default(""),
    options: text("options").notNull().default("[]"),
    status: text("status").notNull().default("open"),
    createdBy: text("created_by").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_live_polls_class").on(t.classId)],
);

export const livePollVotes = sqliteTable(
  "live_poll_votes",
  {
    id: text("id").primaryKey(),
    pollId: text("poll_id").notNull().default(""),
    userId: text("user_id").notNull().default(""),
    option: text("option").notNull().default(""),
    createdAt: text("created_at").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [
    uniqueIndex("idx_live_poll_votes_unique").on(t.pollId, t.userId),
    index("idx_live_poll_votes_poll").on(t.pollId),
  ],
);

export const liveWhiteboardOps = sqliteTable(
  "live_whiteboard_ops",
  {
    id: text("id").primaryKey(),
    classId: text("class_id").notNull().default(""),
    userId: text("user_id").notNull().default(""),
    userName: text("user_name").notNull().default(""),
    op: text("op").notNull().default("{}"),
    opOrder: integer("op_order").notNull().default(0),
    createdAt: text("created_at").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_live_whiteboard_class").on(t.classId, t.sortOrder)],
);

/* ---------------- Phase 4: localization ---------------- */

export const localizationProjects = sqliteTable("localization_projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull().default(""),
  description: text("description").notNull().default(""),
  path: text("path").notNull().default(""),
  tone: text("tone").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const glossaryTerms = sqliteTable("glossary_terms", {
  id: text("id").primaryKey(),
  term: text("term").notNull().default(""),
  definition: text("definition").notNull().default(""),
  usage: text("usage").notNull().default(""),
  culturalNotes: text("cultural_notes").notNull().default(""),
  status: text("status").notNull().default("In review"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const styleGuides = sqliteTable("style_guides", {
  id: text("id").primaryKey(),
  market: text("market").notNull().default(""),
  dos: text("dos").notNull().default("[]"),
  donts: text("donts").notNull().default("[]"),
  status: text("status").notNull().default("In review"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const translationMemory = sqliteTable(
  "translation_memory",
  {
    id: text("id").primaryKey(),
    source: text("source").notNull().default(""),
    target: text("target").notNull().default(""),
    locale: text("locale").notNull().default(""),
    matchPct: integer("match_pct").notNull().default(0),
    status: text("status").notNull().default("Draft"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_translation_memory_locale").on(t.locale)],
);

export const dialectGroups = sqliteTable(
  "dialect_groups",
  {
    id: text("id").primaryKey(),
    groupName: text("group_name").notNull().default(""),
    variants: text("variants").notNull().default("[]"),
    coverage: integer("coverage").notNull().default(0),
    status: text("status").notNull().default("Draft"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_dialect_groups_status").on(t.status)],
);

export const copyVariants = sqliteTable(
  "copy_variants",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull().default(""),
    code: text("code").notNull().default(""),
    toneNotes: text("tone_notes").notNull().default(""),
    status: text("status").notNull().default("Draft"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_copy_variants_code").on(t.code)],
);

export const localizationMarkets = sqliteTable("localization_markets", {
  id: text("id").primaryKey(),
  name: text("name").notNull().default(""),
  conversion: text("conversion").notNull().default(""),
  engagement: text("engagement").notNull().default(""),
  pct: integer("pct").notNull().default(0),
  trend: text("trend").notNull().default(""),
  tone: text("tone").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const previewBlocks = sqliteTable("preview_blocks", {
  id: text("id").primaryKey(),
  en: text("en").notNull().default(""),
  yo: text("yo").notNull().default(""),
  enSub: text("en_sub").notNull().default(""),
  yoSub: text("yo_sub").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const localizationStats = sqliteTable(
  "localization_stats",
  {
    id: text("id").primaryKey(),
    page: text("page").notNull().default(""),
    label: text("label").notNull().default(""),
    value: text("value").notNull().default(""),
    delta: text("delta").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_localization_stats_page").on(t.page)],
);

export const certificates = sqliteTable(
  "certificates",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseSlug: text("course_slug").notNull().default(""),
    title: text("title").notNull().default(""),
    code: text("code").notNull().unique(),
    issuedAt: text("issued_at").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_certificates_user").on(t.userId)],
);

export const libraryItems = sqliteTable(
  "library_items",
  {
    id: text("id").primaryKey(),
    sourceKey: text("source_key").notNull().default("library"),
    folderPath: text("folder_path").notNull().default(""),
    name: text("name").notNull(),
    kind: text("kind").notNull().default("file"),
    mimeType: text("mime_type").notNull().default(""),
    driveFileId: text("drive_file_id").notNull().default(""),
    url: text("url").notNull().default(""),
    sizeBytes: integer("size_bytes").notNull().default(0),
    isProtected: integer("is_protected").notNull().default(0),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [
    index("idx_library_items_source_path").on(t.sourceKey, t.folderPath),
    index("idx_library_items_protected").on(t.isProtected),
  ],
);

export const parentStudents = sqliteTable(
  "parent_students",
  {
    parentId: text("parent_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    studentId: text("student_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => [
    primaryKey({ columns: [t.parentId, t.studentId] }),
    index("idx_parent_students_parent").on(t.parentId),
    index("idx_parent_students_student").on(t.studentId),
  ],
);

export const mentorProfiles = sqliteTable(
  "mentor_profiles",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
    name: text("name").notNull().default(""),
    focus: text("focus").notNull().default(""),
    bio: text("bio").notNull().default(""),
    skills: text("skills").notNull().default("[]"),
    areas: text("areas").notNull().default("[]"),
    availability: text("availability").notNull().default("open"),
    rating: real("rating").notNull().default(0),
    sessionsCount: integer("sessions_count").notNull().default(0),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_mentor_profiles_user").on(t.userId)],
);

export const mentorRequests = sqliteTable(
  "mentor_requests",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().default(""),
    studentName: text("student_name").notNull().default(""),
    goal: text("goal").notNull().default(""),
    program: text("program").notNull().default(""),
    status: text("status").notNull().default("pending"),
    createdAt: text("created_at").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [
    index("idx_mentor_requests_user").on(t.userId),
    index("idx_mentor_requests_status").on(t.status),
  ],
);
