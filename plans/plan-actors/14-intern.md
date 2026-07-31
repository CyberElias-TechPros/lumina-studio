# Actor: Intern

## 1. Identity & Role Definition

- **Actor ID**: `intern`
- **Display Name**: Intern
- **Description**: An enrolled student at Cyber Elias Academy pursuing a cybersecurity or digital forensics program. Interns are the primary end-users of the CEA-OS learning and operations platform. They consume course content, submit assignments, log hours, interact with mentors, build portfolios, and communicate with staff and peers.
- **User Type**: `intern` in `users.role` enum
- **Auth Level**: Authenticated, session-based (JWT + refresh token)
- **Onboarding Status**: Must complete onboarding wizard before full access
- **Typical Age Range**: 16–30
- **Program Types**: Cybersecurity Fundamentals, Ethical Hacking, Digital Forensics, Network Defense, Cloud Security, SOC Analyst

---

## 2. Primary Goals & Success KPIs

| Goal                                     | KPI                           | Measurement                                               |
| ---------------------------------------- | ----------------------------- | --------------------------------------------------------- |
| Complete assigned tasks on time          | Task completion rate          | `completed_tasks / assigned_tasks * 100`                  |
| Log accurate billable/non-billable hours | Timesheet accuracy score      | % of timesheets approved without revision                 |
| Progress through learning plan           | Curriculum completion %       | `completed_modules / total_modules * 100`                 |
| Receive positive mentor evaluations      | Average evaluation score      | 1–5 scale average across evaluation periods               |
| Build a compelling portfolio             | Portfolio completeness score  | % of required sections filled                             |
| Improve skill gaps                       | Skill gap closure rate        | `(pretest_score - posttest_score) / pretest_score * 100`  |
| Maintain communication responsiveness    | Response time SLA             | Average hours to reply to mentor/staff messages           |
| Graduate with employable skills          | Job placement readiness score | Combined score from evaluations + portfolio + assessments |

---

## 3. Complete Screen Inventory

### 3.1 Intern Hub (Dashboard)

**Wireframe**: Full-screen dashboard with 6 card widgets in a 3×2 responsive grid. Top header shows intern avatar, name, program name, current phase. Left sidebar (collapsible) with navigation.

**UI Fields / Components**:

- `WelcomeBanner` — Greeting with time-of-day logic, motivational quote from API
- `ProgressRing` — Circular SVG ring showing overall curriculum completion % (0–100)
- `TaskSummaryCard` — Counts: `pendingTasks`, `overdueTasks`, `completedToday`, `totalAssigned`
- `UpcomingDeadlines` — List of next 5 tasks sorted by `dueDate` ASC where `status != 'completed'`
- `NextSessionCard` — Next scheduled class/mentorship session: `title`, `startTime`, `endTime`, `location` or `meetingLink`, `attendeeCount`
- `RecentMessages` — Last 3 unread messages from `messaging` module, truncate at 80 chars
- `QuickActionBar` — Buttons: [Log Hours], [View Tasks], [Message Mentor], [Submit Work]
- `AchievementBadges` — Horizontal scroll of earned badges with tooltips
- `AlertBanner` — `<div role="alert">` for overdue tasks or unsubmitted timesheets

**Data Bindings**:

- `GET /api/intern/dashboard` — returns aggregated payload
- `GET /api/intern/tasks?limit=5&sort=dueDate:asc&filter=status!=completed`
- `GET /api/intern/messages?unreadOnly=true&limit=3`

**States**:

- **Loading**: Skeleton loaders for each card (6 skeleton placeholders)
- **Empty**: "Welcome! Start your journey by exploring the learning plan." with CTA button
- **Error**: "Could not load dashboard. [Retry]" with `aria-live="polite"`
- **Edge — No tasks assigned**: Show "No tasks yet — enjoy the calm" with confetti animation
- **Edge — All tasks completed**: Show congratulatory banner with next-phase prompt

### 3.2 Tasks Screen

**Wireframe**: Split-pane layout. Left pane is filterable task list. Right pane is task detail view (opens on selection). Top has "+ New Task" button (staff-created, interns can view only).

**UI Fields / Components**:

- `TaskFilterBar` — Filters: `status` (dropdown: all/pending/in_progress/completed/overdue), `priority` (all/low/medium/high/critical), `search` (text input, debounced 300ms), `dateRange` (date picker start/end)
- `TaskListView` — Virtualized list. Each row: `checkbox` (mark complete), `title` (link), `priorityBadge`, `dueDate`, `statusBadge`, `phaseTag`
- `TaskDetailPanel` — Sections: `TaskHeader` (title, status, priority), `Description` (markdown rendered), `AttachmentList` (files with download links), `SubmissionArea` (file upload + text notes + Submit button), `ActivityFeed` (status changes, comments, timestamps)
- `TaskCreateModal` — Only visible to staff; interns see read-only
- `EmptyState`: "No tasks match your filters" with illustration
- `TaskCountBadge`: "Showing X of Y tasks" in top-right

**Data Bindings**:

- `GET /api/intern/tasks?page=1&limit=20&status=in_progress&priority=high&search=keyword&startDate=2025-01-01&endDate=2025-12-31`
- `GET /api/intern/tasks/:id` — full task detail
- `PATCH /api/intern/tasks/:id/submit` — submit work

**States**:

- **Loading**: Skeleton list rows (8 rows)
- **Empty**: "No tasks found. Try adjusting filters." with reset filter button
- **Error**: "Failed to load tasks" with retry button
- **Edge — 0 results after filter**: "No tasks match your current filters" with "Clear All Filters" link
- **Edge — Task with no description**: Show "No description provided" in italics
- **Edge — Past dueDate**: Row highlighted red, `overdue` badge, tooltip "Due was {relativeTime}"

### 3.3 Timesheet Screen

**Wireframe**: Weekly timesheet grid view (Mon–Sun columns, activity category rows). Top bar has week selector (prev/next arrows + "This Week" button). Bottom has summary totals.

**UI Fields / Components**:

- `WeekPicker` — `currentWeekStart` display, left/right arrows, "Today" quick-jump button
- `TimesheetGrid` — Table with columns: `Activity Category` (row header), Mon–Sun (input cells). Each cell is an `<input type="number" min="0" max="24" step="0.5" />` with `aria-label="Hours for {day} {category}"`
- `CategoryRow` — Predefined: `Classroom`, `Lab Work`, `Self Study`, `Mentorship Session`, `Project Work`, `Extracurricular`, `Other`
- `DayTotalRow` — Auto-sum per day column
- `WeekTotalRow` — Auto-sum of all cells, display in footer
- `TimesheetStatusBadge` — `draft` (gray), `submitted` (blue), `approved` (green), `rejected` (red) with `approvedBy` / `rejectedReason` tooltip
- `SubmitButton` — "Submit for Approval" — disabled if total hours = 0
- `RecurringHoursTemplate` — "Apply Last Week" button to copy previous week's hours
- `NotesField` — Per-day textarea optional note `<textarea maxLength={500} />`

**Data Bindings**:

- `GET /api/intern/timesheet?weekStart=2025-06-16` — returns week data
- `POST /api/intern/timesheet` — create/update week sheet
- `GET /api/intern/timesheet/history?page=1&limit=12` — paginated week summaries
- `GET /api/intern/timesheet/templates` — saved templates
- `POST /api/intern/timesheet/submit` — change status to `submitted`

**States**:

- **Loading**: Skeleton table 8 rows × 8 columns
- **Empty (no entries yet)**: Show empty grid with "Click a cell to log hours" tooltip
- **Error**: "Timesheet failed to load" with retry
- **Edge — Week total > 168**: Show warning "Total hours exceed 168 (total hours in a week)"
- **Edge — Single day > 24**: Cell turns red, tooltip "Cannot exceed 24 hours in a day"
- **Edge — Already approved week**: All cells read-only, show lock icon, "Approved — contact HR for changes"
- **Edge — Past week (previous pay period)**: Cells read-only unless admin override

### 3.4 Mentorship Screen

**Wireframe**: Two-tab layout: "My Mentor" and "Sessions". "My Mentor" shows assigned mentor card with bio, availability, contact. "Sessions" shows past and upcoming session calendar.

**UI Fields / Components**:

- `MentorProfileCard` — `avatar`, `fullName`, `title`, `department`, `bio` (max 500 chars), `expertiseTags` (comma-separated), `rating` (star display), `sessionCount`, `email` link, `calendarLink`
- `ScheduleSessionModal` — Fields: `mentorId` (hidden), `datePicker`, `timeSlot` (15-min interval select), `duration` (30/60/90 min), `topic` (text, required, max 200), `notes` (textarea, optional), `meetingType` (radio: in-person/video/phone)
- `SessionList` — Accordion list grouped by month. Each item: `date`, `time`, `duration`, `topic`, `status` (`scheduled` / `completed` / `cancelled` / `no_show`), `actions` (Join, Reschedule, Cancel), `feedbackGiven` boolean indicator
- `SessionFeedbackForm` — Post-session form: `rating` (1–5 stars), `feedbackText` (textarea, required, max 2000), `topicsCovered` (multi-select tags), `actionItems` (text, optional)
- `MentorshipProgressBar` — Shows completed vs total sessions this quarter

**Data Bindings**:

- `GET /api/intern/mentorship` — mentor assignment + sessions
- `GET /api/intern/mentorship/mentor` — mentor profile
- `GET /api/intern/mentorship/sessions?page=1&limit=20&status=upcoming`
- `POST /api/intern/mentorship/sessions` — create session request
- `PATCH /api/intern/mentorship/sessions/:id/reschedule` — change date/time
- `DELETE /api/intern/mentorship/sessions/:id` — cancel
- `POST /api/intern/mentorship/sessions/:id/feedback` — submit feedback
- `GET /api/mentors/:id/availability?date=2025-06-16` — available slots

**States**:

- **Loading**: Profile skeleton + calendar skeleton
- **Empty — No mentor assigned**: "You haven't been assigned a mentor yet. Your program coordinator will assign one soon." with contact coordinator button
- **Empty — No sessions**: "No mentorship sessions yet. Schedule your first session!"
- **Error**: "Could not load mentorship data" with retry
- **Edge — Mentor unresponsive > 7 days**: Warning banner "Your mentor hasn't responded to your last session request. Contact coordinator."
- **Edge — Session in past with no feedback**: Reminder banner "Please provide feedback for your session on {date}"

### 3.5 Learning Plan Screen

**Wireframe**: Vertical curriculum tree with expandable phases/modules/lessons. Progress indicators at each level. Right panel shows lesson detail when selected.

**UI Fields / Components**:

- `PhaseList` — Collapsible accordion of phases (`phaseName`, `phaseNumber`, `progressBar`, `estimatedDuration`)
- `ModuleList` — Nested under each phase: `moduleName`, `completionStatus` (icon: check/circle/hourglass), `lessonCount`, `creditHours`
- `LessonDetail` — `title`, `contentType` (video/article/quiz/assignment/lab), `duration`, `contentUrl`, `completionButton`, `downloadableResources`
- `CurriculumProgressBar` — Top-level: `X of Y modules complete (Z%)`
- `PrerequisiteWarning` — If module has unmet prerequisites, show lock icon + "Complete {moduleName} first" tooltip
- `AssessmentCard` — For assessment-type lessons: `score`, `passingScore`, `attemptsRemaining`, `retakeButton`
- `EstimatedCompletion` — AI-predicted completion date based on pace

**Data Bindings**:

- `GET /api/intern/learning-plan/phases` — full curriculum tree
- `GET /api/intern/learning-plan/modules/:id` — module detail
- `GET /api/intern/learning-plan/lessons/:id` — lesson content
- `POST /api/intern/learning-plan/lessons/:id/complete` — mark complete
- `GET /api/intern/learning-plan/progress` — progress summary

**States**:

- **Loading**: Tree skeleton (10 lines with indentation)
- **Empty — No learning plan**: "Your learning plan is being created. Check back soon."
- **Error**: "Curriculum data unavailable" with retry
- **Edge — All modules completed**: "Congratulations! You've completed all modules." with certificate CTA
- **Edge — Module with 0 lessons**: Show "Content coming soon" badge
- **Edge — Retake exhausted**: "No attempts remaining — contact your instructor"

### 3.6 Evaluation Screen

**Wireframe**: Tabbed layout: "Self Assessment", "Mentor Evaluations", "Skill Assessments", "Overall Progress". Charts and score cards.

**UI Fields / Components**:

- `SelfAssessmentForm` — Per-competency rating (1–5 Likert scale) with comment field. Competencies: `technicalSkills`, `analyticalThinking`, `communication`, `teamwork`, `initiative`, `timeManagement`
- `MentorEvaluationList` — Table: `period`, `overallScore`, `competencyBreakdown` (radar chart), `strengths` (text), `areasForImprovement` (text), `status` (draft/published)
- `SkillAssessmentGrid` — Cards for each skill assessment taken: `skillName`, `date`, `score`, `percentile`, `badgeEarned`
- `OverallProgressRadar` — SVG radar chart comparing self vs mentor scores across competencies
- `EvaluationTimeline` — Horizontal timeline showing evaluation periods with score dots
- `GoalSettingForm` — SMART goals: `goalTitle` (required, max 200), `description`, `targetDate`, `metrics`, `status` (not_started/in_progress/achieved)

**Data Bindings**:

- `GET /api/intern/evaluations/self` — current self-assessment form
- `GET /api/intern/evaluations/mentor?page=1&limit=10`
- `GET /api/intern/evaluations/skills`
- `GET /api/intern/evaluations/overview`
- `POST /api/intern/evaluations/self` — submit self-assessment
- `POST /api/intern/evaluations/goals` — create goal
- `PATCH /api/intern/evaluations/goals/:id` — update goal progress

**States**:

- **Loading**: Score skeletons × 4, chart placeholder
- **Empty — No evaluations yet**: "Your first evaluation will be available after 30 days"
- **Empty — No goals set**: "Set your first SMART goal to track growth" with button
- **Error**: "Evaluation data unavailable" with retry
- **Edge — Self-assessment score deviates > 2 from mentor score**: Warning "Noticeable gap between self-assessment and mentor evaluation — consider discussing with your mentor"

### 3.7 Portfolio Screen

**Wireframe**: Personal portfolio builder with sections: Profile, Projects, Certifications, Skills, Work Samples, Resume. Preview mode and public share link.

**UI Fields / Components**:

- `PortfolioProfileSection` — `photo` (image upload, max 5MB, png/jpg), `bio` (textarea, max 1000), `headline` (text, max 100), `location`, `linkedInUrl`, `githubUrl`, `personalWebsite`
- `ProjectCardList` — Each card: `projectTitle`, `description`, `technologies` (tag list), `screenshots` (image gallery), `liveUrl`, `repoUrl`, `startDate`, `endDate`, `highlights` (bullet list)
- `CertificationList` — `certName`, `issuingOrg`, `issueDate`, `expiryDate`, `credentialId`, `credentialUrl`, `certImage` (upload)
- `SkillTags` — Editable tag list with proficiency level (beginner/intermediate/advanced/expert)
- `WorkSampleGallery` — Grid of uploads with `title`, `description`, `fileType` badge, `downloadCount`
- `ResumeUploader` — PDF upload, max 10MB, auto-convert to preview
- `PortfolioPreview` — Full preview of how public view looks
- `ShareControls` — Toggle: `isPublic` (switch), `shareLink` (copy button), `qrCode` (SVG)
- `CompletenessScore` — Progress bar: "Your portfolio is X% complete" with checklist of missing items

**Data Bindings**:

- `GET /api/intern/portfolio` — full portfolio data
- `PUT /api/intern/portfolio/profile` — update profile section
- `POST /api/intern/portfolio/projects` — add project
- `PATCH /api/intern/portfolio/projects/:id` — update project
- `DELETE /api/intern/portfolio/projects/:id` — remove project
- `POST /api/intern/portfolio/certifications`
- `DELETE /api/intern/portfolio/certifications/:id`
- `POST /api/intern/portfolio/skills`
- `DELETE /api/intern/portfolio/skills/:id`
- `POST /api/intern/portfolio/samples` — file upload (multipart)
- `PUT /api/intern/portfolio/resume` — file upload
- `PATCH /api/intern/portfolio/visibility` — toggle public/private

**States**:

- **Loading**: Section skeleton layout
- **Empty — Fresh portfolio**: "Build your portfolio to showcase your skills to employers" with "Get Started" wizard
- **Error**: "Portfolio save failed" with retry and auto-save draft indicator
- **Edge — Portfolio not filled in 60 days**: Nudge notification "Your portfolio is empty — take 5 minutes to add your first project"
- **Edge — Upload > 10MB**: "File too large. Max 10MB" with file size display
- **Edge — Unsupported file type**: "Accepted formats: PDF, DOCX, PNG, JPG, ZIP"

### 3.8 Messaging Screen

**Wireframe**: Three-pane layout: Conversation list (left), Message thread (center), Contact/Detail pane (right, collapsible).

**UI Fields / Components**:

- `ConversationList` — Search input + list. Each item: `avatar`, `participantName`, `lastMessagePreview` (truncated 60 chars), `timestamp` (relative), `unreadBadge` count, `statusDot` (online/away/offline)
- `MessageThread` — Scrollable message bubbles. Own messages right-aligned (blue), others left-aligned (gray). Each bubble: `text`, `timestamp`, `readReceipt` (check/read). System messages (e.g., "Task completed") in center, italic, smaller font.
- `MessageComposer` — `textarea` (auto-resize, max 2000 chars), `fileAttachment` button (paperclip), `emojiPicker`, `sendButton` (Enter to send, Shift+Enter newline), typing indicator
- `ContactDetailPane` — `fullName`, `role`, `department`, `email`, `phone`, `quickActions` (Schedule Meeting, View Profile)
- `SearchMessagesInput` — Searches within conversation, highlights matching text
- `AttachmentPreview` — Modal showing file preview before send
- `ReplyQuote` — Quoted message context when replying to specific message

**Data Bindings**:

- `GET /api/intern/messages/conversations?page=1&limit=20`
- `GET /api/intern/messages/conversations/:id?page=1&limit=50`
- `POST /api/intern/messages/conversations/:id/messages` — send message
- `POST /api/intern/messages/conversations` — create new conversation (participants, subject)
- `PATCH /api/intern/messages/conversations/:id/read` — mark as read
- `GET /api/intern/messages/search?q=term&conversationId=xxx`
- `POST /api/intern/messages/conversations/:id/typing` — typing indicator
- WebSocket `wss://api.cea.dev/messages` — real-time updates

**States**:

- **Loading**: Skeleton left pane (8 items), skeleton center pane (5 bubbles)
- **Empty — No conversations**: "No conversations yet. Message your mentor or coordinator to get started." with "New Message" button
- **Empty — No messages in thread**: "Start a conversation. Be respectful and professional."
- **Error**: "Failed to load messages" with retry
- **Edge — Very long message (> 2000 chars)**: Character counter turns red at 1800, blocks send at 2000
- **Edge — Offline**: "You're offline. Messages will send when reconnected." with offline indicator icon
- **Edge — Blocked user**: Messages show "This user cannot receive messages" instead of composer

---

## 4. Full Database Schema

```typescript
// ---- drizzle/schema/interns.ts ----

import { sqliteTable, text, integer, real, blob } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./users";
import { phases, modules, lessons } from "./curriculum";
import { staff } from "./staff";

// ──────────────────────────────────────────────
// INTERN PROFILE
// ──────────────────────────────────────────────
export const internProfiles = sqliteTable("intern_profiles", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  programId: text("program_id")
    .notNull()
    .references(() => programs.id),
  cohortId: text("cohort_id").references(() => cohorts.id),
  enrollmentDate: text("enrollment_date")
    .notNull()
    .default(sql`current_date`),
  expectedGraduation: text("expected_graduation"),
  currentPhaseId: text("current_phase_id").references(() => phases.id),
  status: text("status", { enum: ["active", "suspended", "graduated", "withdrawn", "on_leave"] })
    .notNull()
    .default("active"),
  onboardingCompleted: integer("onboarding_completed", { mode: "boolean" })
    .notNull()
    .default(false),
  onboardingStep: integer("onboarding_step").notNull().default(0),
  portfolioCompleteness: integer("portfolio_completeness").notNull().default(0),
  overallProgress: real("overall_progress").notNull().default(0),
  skillLevel: integer("skill_level").notNull().default(1),
  totalXp: integer("total_xp").notNull().default(0),
  emergencyContactName: text("emergency_contact_name"),
  emergencyContactPhone: text("emergency_contact_phone"),
  emergencyContactRelation: text("emergency_contact_relation"),
  dietaryRestrictions: text("dietary_restrictions"),
  tshirtSize: text("tshirt_size", { enum: ["XS", "S", "M", "L", "XL", "2XL", "3XL"] }),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// TASKS
// ──────────────────────────────────────────────
export const tasks = sqliteTable("tasks", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  internId: text("intern_id")
    .notNull()
    .references(() => internProfiles.id, { onDelete: "cascade" }),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  phaseId: text("phase_id").references(() => phases.id),
  moduleId: text("module_id").references(() => modules.id),
  priority: text("priority", { enum: ["low", "medium", "high", "critical"] })
    .notNull()
    .default("medium"),
  status: text("status", {
    enum: ["pending", "in_progress", "submitted", "completed", "overdue", "cancelled"],
  })
    .notNull()
    .default("pending"),
  dueDate: text("due_date"),
  completedAt: text("completed_at"),
  estimatedHours: real("estimated_hours"),
  actualHours: real("actual_hours"),
  submissionText: text("submission_text"),
  submissionFileUrls: text("submission_file_urls"), // JSON array of URLs
  feedbackText: text("feedback_text"),
  feedbackRating: integer("feedback_rating"),
  feedbackAt: text("feedback_at"),
  isRecurring: integer("is_recurring", { mode: "boolean" }).notNull().default(false),
  recurrenceRule: text("recurrence_rule"), // RRULE string
  tags: text("tags"), // JSON array
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const taskAttachments = sqliteTable("task_attachments", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  taskId: text("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: text("mime_type").notNull(),
  uploadedBy: text("uploaded_by")
    .notNull()
    .references(() => users.id),
  uploadedAt: text("uploaded_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const taskComments = sqliteTable("task_comments", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  taskId: text("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  content: text("content").notNull(),
  parentId: text("parent_id"), // for threaded replies
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// TIMESHEET
// ──────────────────────────────────────────────
export const timesheets = sqliteTable("timesheets", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  internId: text("intern_id")
    .notNull()
    .references(() => internProfiles.id, { onDelete: "cascade" }),
  weekStart: text("week_start").notNull(), // ISO date of Monday
  weekEnd: text("week_end").notNull(), // ISO date of Sunday
  status: text("status", { enum: ["draft", "submitted", "approved", "rejected"] })
    .notNull()
    .default("draft"),
  totalHours: real("total_hours").notNull().default(0),
  submittedAt: text("submitted_at"),
  approvedBy: text("approved_by").references(() => users.id),
  approvedAt: text("approved_at"),
  rejectionReason: text("rejection_reason"),
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const timesheetEntries = sqliteTable("timesheet_entries", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  timesheetId: text("timesheet_id")
    .notNull()
    .references(() => timesheets.id, { onDelete: "cascade" }),
  date: text("date").notNull(), // ISO date
  category: text("category", {
    enum: [
      "classroom",
      "lab_work",
      "self_study",
      "mentorship_session",
      "project_work",
      "extracurricular",
      "other",
    ],
  }).notNull(),
  hours: real("hours").notNull().default(0),
  description: text("description"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const timesheetTemplates = sqliteTable("timesheet_templates", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  internId: text("intern_id")
    .notNull()
    .references(() => internProfiles.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  entries: text("entries").notNull(), // JSON array of {category, hours} defaults
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// MENTORSHIP
// ──────────────────────────────────────────────
export const mentorshipAssignments = sqliteTable("mentorship_assignments", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  internId: text("intern_id")
    .notNull()
    .references(() => internProfiles.id, { onDelete: "cascade" }),
  mentorId: text("mentor_id")
    .notNull()
    .references(() => staff.id),
  assignmentType: text("assignment_type", { enum: ["primary", "secondary", "temporary"] })
    .notNull()
    .default("primary"),
  startDate: text("start_date")
    .notNull()
    .default(sql`current_date`),
  endDate: text("end_date"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  reason: text("reason"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const mentorshipSessions = sqliteTable("mentorship_sessions", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  internId: text("intern_id")
    .notNull()
    .references(() => internProfiles.id, { onDelete: "cascade" }),
  mentorId: text("mentor_id")
    .notNull()
    .references(() => staff.id),
  scheduledDate: text("scheduled_date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  topic: text("topic").notNull(),
  notes: text("notes"),
  meetingType: text("meeting_type", { enum: ["in_person", "video", "phone"] })
    .notNull()
    .default("video"),
  meetingLink: text("meeting_link"),
  location: text("location"),
  status: text("status", {
    enum: ["scheduled", "confirmed", "completed", "cancelled", "no_show", "rescheduled"],
  })
    .notNull()
    .default("scheduled"),
  cancelReason: text("cancel_reason"),
  rescheduledFromId: text("rescheduled_from_id"),
  feedbackRating: integer("feedback_rating"),
  feedbackText: text("feedback_text"),
  feedbackSubmittedAt: text("feedback_submitted_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// LEARNING PLAN PROGRESS
// ──────────────────────────────────────────────
export const learningProgress = sqliteTable("learning_progress", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  internId: text("intern_id")
    .notNull()
    .references(() => internProfiles.id, { onDelete: "cascade" }),
  lessonId: text("lesson_id")
    .notNull()
    .references(() => lessons.id, { onDelete: "cascade" }),
  status: text("status", { enum: ["not_started", "in_progress", "completed"] })
    .notNull()
    .default("not_started"),
  score: real("score"),
  attempts: integer("attempts").notNull().default(0),
  timeSpentMinutes: integer("time_spent_minutes").notNull().default(0),
  completedAt: text("completed_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// EVALUATIONS
// ──────────────────────────────────────────────
export const selfAssessments = sqliteTable("self_assessments", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  internId: text("intern_id")
    .notNull()
    .references(() => internProfiles.id, { onDelete: "cascade" }),
  evaluationPeriod: text("evaluation_period").notNull(), // e.g. "2025-Q2"
  technicalSkills: integer("technical_skills").notNull(),
  analyticalThinking: integer("analytical_thinking").notNull(),
  communication: integer("communication").notNull(),
  teamwork: integer("teamwork").notNull(),
  initiative: integer("initiative").notNull(),
  timeManagement: integer("time_management").notNull(),
  overallComment: text("overall_comment"),
  submittedAt: text("submitted_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const mentorEvaluations = sqliteTable("mentor_evaluations", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  internId: text("intern_id")
    .notNull()
    .references(() => internProfiles.id, { onDelete: "cascade" }),
  mentorId: text("mentor_id")
    .notNull()
    .references(() => staff.id),
  evaluationPeriod: text("evaluation_period").notNull(),
  overallScore: real("overall_score").notNull(),
  technicalSkills: integer("technical_skills").notNull(),
  analyticalThinking: integer("analytical_thinking").notNull(),
  communication: integer("communication").notNull(),
  teamwork: integer("teamwork").notNull(),
  initiative: integer("initiative").notNull(),
  timeManagement: integer("time_management").notNull(),
  strengths: text("strengths"),
  areasForImprovement: text("areas_for_improvement"),
  status: text("status", { enum: ["draft", "published"] })
    .notNull()
    .default("draft"),
  publishedAt: text("published_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const internshipGoals = sqliteTable("internship_goals", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  internId: text("intern_id")
    .notNull()
    .references(() => internProfiles.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  targetDate: text("target_date"),
  metrics: text("metrics"), // JSON array of success metrics
  status: text("status", { enum: ["not_started", "in_progress", "achieved", "cancelled"] })
    .notNull()
    .default("not_started"),
  progressPercent: integer("progress_percent").notNull().default(0),
  achievedAt: text("achieved_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// PORTFOLIO
// ──────────────────────────────────────────────
export const portfolios = sqliteTable("portfolios", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  internId: text("intern_id")
    .notNull()
    .unique()
    .references(() => internProfiles.id, { onDelete: "cascade" }),
  headline: text("headline"),
  bio: text("bio"),
  location: text("location"),
  linkedInUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  personalWebsite: text("personal_website"),
  resumeUrl: text("resume_url"),
  isPublic: integer("is_public", { mode: "boolean" }).notNull().default(false),
  shareSlug: text("share_slug").unique(),
  viewCount: integer("view_count").notNull().default(0),
  completenessScore: integer("completeness_score").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const portfolioProjects = sqliteTable("portfolio_projects", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  portfolioId: text("portfolio_id")
    .notNull()
    .references(() => portfolios.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  technologies: text("technologies"), // JSON array
  liveUrl: text("live_url"),
  repoUrl: text("repo_url"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  highlights: text("highlights"), // JSON array of strings
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const portfolioCertifications = sqliteTable("portfolio_certifications", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  portfolioId: text("portfolio_id")
    .notNull()
    .references(() => portfolios.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  issuingOrg: text("issuing_org").notNull(),
  issueDate: text("issue_date").notNull(),
  expiryDate: text("expiry_date"),
  credentialId: text("credential_id"),
  credentialUrl: text("credential_url"),
  certImageUrl: text("cert_image_url"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const portfolioSkills = sqliteTable("portfolio_skills", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  portfolioId: text("portfolio_id")
    .notNull()
    .references(() => portfolios.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  category: text("category", { enum: ["technical", "soft", "language", "tool"] })
    .notNull()
    .default("technical"),
  proficiency: text("proficiency", { enum: ["beginner", "intermediate", "advanced", "expert"] })
    .notNull()
    .default("beginner"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const portfolioSamples = sqliteTable("portfolio_samples", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  portfolioId: text("portfolio_id")
    .notNull()
    .references(() => portfolios.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  fileUrl: text("file_url").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: integer("file_size").notNull(),
  downloadCount: integer("download_count").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
});
```

---

## 5. Complete API Contract

### 5.1 Dashboard

```typescript
// GET /api/intern/dashboard
// Auth: JWT (role: intern)
// Response 200:
interface DashboardResponse {
  intern: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
    programName: string;
    currentPhase: string;
    enrollmentDate: string;
    expectedGraduation: string | null;
  };
  progress: {
    overallPercent: number;
    completedModules: number;
    totalModules: number;
    currentPhaseProgress: number;
  };
  tasks: {
    pending: number;
    overdue: number;
    completedToday: number;
    totalAssigned: number;
    upcomingDeadlines: Array<{
      id: string;
      title: string;
      dueDate: string;
      priority: "low" | "medium" | "high" | "critical";
      status: string;
    }>;
  };
  nextSession: {
    id: string;
    title: string;
    type: "class" | "mentorship" | "workshop" | "event";
    startTime: string;
    endTime: string;
    location: string | null;
    meetingLink: string | null;
  } | null;
  unreadMessages: number;
  recentMessages: Array<{
    id: string;
    senderName: string;
    senderAvatar: string | null;
    preview: string;
    timestamp: string;
  }>;
  badges: Array<{
    id: string;
    name: string;
    iconUrl: string;
    earnedAt: string;
  }>;
  alerts: Array<{
    type: "warning" | "error" | "info" | "success";
    message: string;
    actionLabel: string | null;
    actionUrl: string | null;
  }>;
}
// 401: Unauthorized
// 403: Forbidden (not intern)
// 500: Internal server error
```

### 5.2 Tasks

```typescript
// GET /api/intern/tasks
// Query: page, limit, status, priority, search, startDate, endDate, sortBy, sortOrder
// Response 200:
interface TaskListResponse {
  data: Array<{
    id: string;
    title: string;
    description: string | null;
    priority: "low" | "medium" | "high" | "critical";
    status: "pending" | "in_progress" | "submitted" | "completed" | "overdue" | "cancelled";
    dueDate: string | null;
    phaseName: string | null;
    moduleName: string | null;
    hasSubmission: boolean;
    hasFeedback: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

// GET /api/intern/tasks/:id
// Response 200:
interface TaskDetailResponse {
  id: string;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high" | "critical";
  status: string;
  dueDate: string | null;
  completedAt: string | null;
  estimatedHours: number | null;
  actualHours: number | null;
  submissionText: string | null;
  submissionFiles: Array<{ id: string; fileName: string; fileUrl: string; fileSize: number }>;
  feedbackText: string | null;
  feedbackRating: number | null;
  attachments: Array<{
    id: string;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
  }>;
  comments: Array<{
    id: string;
    userId: string;
    userName: string;
    userAvatar: string | null;
    content: string;
    parentId: string | null;
    createdAt: string;
  }>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// PATCH /api/intern/tasks/:id/submit
// Auth: JWT (intern)
// Body:
interface TaskSubmitRequest {
  submissionText?: string; // max 5000 chars
  files?: Array<{ fileName: string; fileData: string; mimeType: string }>; // base64 encoded, max 5 files, 10MB each
}
// Response 200: TaskDetailResponse
// 400: Task already completed, task already submitted
// 404: Task not found
// 413: File too large

// PATCH /api/intern/tasks/:id/status
// Body:
interface TaskStatusUpdate {
  status: "in_progress" | "completed";
}
// Response 200: TaskDetailResponse
```

### 5.3 Timesheet

```typescript
// GET /api/intern/timesheet?weekStart=2025-06-16
// Response 200:
interface TimesheetResponse {
  id: string | null; // null if no timesheet exists for this week
  weekStart: string;
  weekEnd: string;
  status: "draft" | "submitted" | "approved" | "rejected";
  totalHours: number;
  entries: Array<{
    id: string;
    date: string;
    category: string;
    hours: number;
    description: string | null;
  }>;
  submittedAt: string | null;
  approvedBy: string | null;
  approvedAt: string | null;
  rejectionReason: string | null;
  notes: string | null;
}

// POST /api/intern/timesheet
// Body:
interface TimesheetUpsertRequest {
  weekStart: string; // ISO Monday
  entries: Array<{
    date: string;
    category: string;
    hours: number;
    description?: string;
  }>;
  notes?: string;
}
// Response 200: TimesheetResponse
// 400: Invalid weekStart (must be Monday), hours exceed 24 per day

// POST /api/intern/timesheet/submit
// Body: { timesheetId: string }
// Response 200: TimesheetResponse
// 400: Timesheet already submitted, total hours = 0

// GET /api/intern/timesheet/history?page=1&limit=12
// Response:
interface TimesheetHistoryResponse {
  data: Array<{
    id: string;
    weekStart: string;
    weekEnd: string;
    totalHours: number;
    status: string;
  }>;
  pagination: { page: number; limit: number; total: number; totalPages: number };
}
```

### 5.4 Mentorship

```typescript
// GET /api/intern/mentorship/mentor
// Response 200:
interface MentorResponse {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  title: string;
  department: string;
  bio: string | null;
  expertiseTags: string[];
  rating: number;
  sessionCount: number;
  email: string;
  availability: Array<{ dayOfWeek: number; startTime: string; endTime: string }>;
}

// GET /api/intern/mentorship/sessions?page=1&limit=20&status=upcoming
// Response 200:
interface SessionListResponse {
  data: Array<{
    id: string;
    mentorName: string;
    mentorAvatar: string | null;
    scheduledDate: string;
    startTime: string;
    endTime: string;
    durationMinutes: number;
    topic: string;
    meetingType: string;
    meetingLink: string | null;
    location: string | null;
    status: string;
    feedbackGiven: boolean;
  }>;
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

// POST /api/intern/mentorship/sessions
// Body:
interface CreateSessionRequest {
  mentorId: string;
  scheduledDate: string;
  startTime: string;
  durationMinutes: 30 | 60 | 90;
  topic: string; // required, max 200
  notes?: string;
  meetingType: "in_person" | "video" | "phone";
}
// Response 201: { id: string; status: 'scheduled'; ... }
// 409: Time slot already booked

// PATCH /api/intern/mentorship/sessions/:id/reschedule
// Body: { scheduledDate: string; startTime: string; durationMinutes: number }
// Response 200: updated session

// DELETE /api/intern/mentorship/sessions/:id
// 200: { message: 'Session cancelled' }
// 400: Cannot cancel session starting within 1 hour

// POST /api/intern/mentorship/sessions/:id/feedback
// Body:
interface SessionFeedbackRequest {
  rating: number; // 1-5
  feedbackText: string; // max 2000, required
  topicsCovered?: string[];
  actionItems?: string;
}
// Response 200: { message: 'Feedback recorded' }
```

### 5.5 Learning Plan

```typescript
// GET /api/intern/learning-plan
// Response:
interface LearningPlanResponse {
  phases: Array<{
    id: string;
    name: string;
    number: number;
    progressPercent: number;
    estimatedDuration: string;
    modules: Array<{
      id: string;
      name: string;
      status: "locked" | "available" | "in_progress" | "completed";
      lessonCount: number;
      completedCount: number;
      creditHours: number;
      prerequisites: string[];
    }>;
  }>;
  overallProgress: { completedModules: number; totalModules: number; percent: number };
  estimatedCompletion: string | null;
}

// GET /api/intern/learning-plan/lessons/:id
// Response:
interface LessonDetailResponse {
  id: string;
  title: string;
  contentType: "video" | "article" | "quiz" | "assignment" | "lab";
  duration: number; // minutes
  contentUrl: string;
  resources: Array<{ name: string; url: string; type: string }>;
  progress: { status: string; score: number | null; attempts: number; timeSpent: number };
}

// POST /api/intern/learning-plan/lessons/:id/complete
// Body: { timeSpentMinutes?: number }
// Response: { status: 'completed'; xpGained: 50 }
```

### 5.6 Evaluations

```typescript
// GET /api/intern/evaluations/overview
// Response:
interface EvaluationOverview {
  currentPeriod: string;
  selfAssessment: { submitted: boolean; scores: Record<string, number> } | null;
  latestMentorEvaluation: { overallScore: number; period: string } | null;
  recentSkillAssessments: Array<{ skillName: string; score: number; date: string }>;
  goals: Array<{ id: string; title: string; status: string; progressPercent: number }>;
}

// POST /api/intern/evaluations/self
// Body:
interface SelfAssessmentRequest {
  technicalSkills: number; // 1-5
  analyticalThinking: number;
  communication: number;
  teamwork: number;
  initiative: number;
  timeManagement: number;
  overallComment?: string;
}
// Response 200: { id: string; submittedAt: string }
// 400: Period already has self-assessment submitted
```

### 5.7 Portfolio

```typescript
// GET /api/intern/portfolio
// Response: Full portfolio object with projects, certifications, skills, samples

// PUT /api/intern/portfolio/profile
// Body: { headline?: string; bio?: string; location?: string; linkedInUrl?: string; githubUrl?: string; personalWebsite?: string }

// PATCH /api/intern/portfolio/visibility
// Body: { isPublic: boolean }
// Response 200: { isPublic: boolean; shareSlug: string; shareUrl: string }

// POST /api/intern/portfolio/projects
// Body: { title: string; description?: string; technologies?: string[]; liveUrl?: string; repoUrl?: string; startDate?: string; endDate?: string; highlights?: string[] }

// POST /api/intern/portfolio/resume
// Content-Type: multipart/form-data
// Body: resume (file, PDF, max 10MB)
// Response: { resumeUrl: string }
// 413: File too large
```

### 5.8 Messaging

```typescript
// GET /api/intern/messages/conversations
// Response:
interface ConversationsResponse {
  data: Array<{
    id: string;
    participants: Array<{ id: string; name: string; avatar: string | null; role: string }>;
    lastMessage: { text: string; timestamp: string; senderId: string } | null;
    unreadCount: number;
    isOnline: boolean;
    updatedAt: string;
  }>;
}

// GET /api/intern/messages/conversations/:id?page=1&limit=50
// Response:
interface ConversationMessagesResponse {
  data: Array<{
    id: string;
    senderId: string;
    text: string;
    attachments: Array<{ name: string; url: string; type: string }>;
    createdAt: string;
    readAt: string | null;
  }>;
  pagination: { page: number; limit: number; total: number; hasMore: boolean };
}

// POST /api/intern/messages/conversations
// Body: { participantIds: string[]; subject?: string; initialMessage: string }
// Response 201: Conversation

// POST /api/intern/messages/conversations/:id/messages
// Body: { text: string; attachments?: Array<{ name: string; data: string; type: string }> }
// Response 201: Message
```

---

## 6. Component Tree

```
<InternLayout>
  <Sidebar>
    <SidebarNavItem icon="dashboard" label="Hub" href="/intern" />
    <SidebarNavItem icon="tasks" label="Tasks" href="/intern/tasks" badge={pendingCount} />
    <SidebarNavItem icon="clock" label="Timesheet" href="/intern/timesheet" />
    <SidebarNavItem icon="users" label="Mentorship" href="/intern/mentorship" />
    <SidebarNavItem icon="book" label="Learning Plan" href="/intern/learning-plan" />
    <SidebarNavItem icon="clipboard" label="Evaluations" href="/intern/evaluations" />
    <SidebarNavItem icon="folder" label="Portfolio" href="/intern/portfolio" />
    <SidebarNavItem icon="messageCircle" label="Messages" href="/intern/messages" badge={unreadCount} />
  </Sidebar>
  <TopBar>
    <Breadcrumbs />
    <GlobalSearch />
    <NotificationBell count={alertCount} />
    <UserAvatarMenu />
  </TopBar>
  <main>{children}</main>
</InternLayout>

<!-- Screens -->
<InternHub>
  <WelcomeBanner />
  <DashboardGrid>
    <ProgressRingCard />
    <TaskSummaryCard />
    <UpcomingDeadlinesCard />
    <NextSessionCard />
    <RecentMessagesCard />
    <BadgesCard />
  </DashboardGrid>
  <QuickActionBar />
  <AlertBanner />
</InternHub>

<TasksScreen>
  <TaskFilterBar>
    <StatusDropdown />
    <PriorityDropdown />
    <SearchInput />
    <DateRangePicker />
  </TaskFilterBar>
  <TaskListView>
    <TaskRow /> (virtualized, repeated)
  </TaskListView>
  <TaskDetailPanel>
    <TaskHeader />
    <MarkdownRenderer content={description} />
    <AttachmentList />
    <SubmissionArea>
      <FileUploader />
      <TextEditor />
      <SubmitButton />
    </SubmissionArea>
    <ActivityFeed>
      <StatusChangeBadge />
      <CommentThread />
    </ActivityFeed>
  </TaskDetailPanel>
</TasksScreen>

<TimesheetScreen>
  <WeekPicker />
  <TimesheetGrid>
    <CategoryLabelRow />
    <DayColumnHeader /> (×7)
    <TimesheetCell /> (repeated per category×day)
    <DayTotalRow />
    <WeekTotalRow />
  </TimesheetGrid>
  <TimesheetActions>
    <SaveDraftButton />
    <SubmitButton />
    <ApplyTemplateButton />
  </TimesheetActions>
  <StatusBadge />
</TimesheetScreen>

<MentorshipScreen>
  <Tabs value="mentor" | "sessions">
    <MentorProfileCard />
    <SessionList>
      <SessionMonthGroup>
        <SessionCard /> (repeated)
      </SessionMonthGroup>
    </SessionList>
  </Tabs>
  <ScheduleSessionModal />
  <SessionFeedbackModal />
</MentorshipScreen>

<LearningPlanScreen>
  <CurriculumProgressBar />
  <PhaseAccordion>
    <PhaseHeader expandable />
    <ModuleList>
      <ModuleCard />
    </ModuleList>
    <LessonDetailPanel />
  </PhaseAccordion>
</LearningPlanScreen>

<EvaluationScreen>
  <Tabs value="self" | "mentor" | "skills" | "goals">
    <SelfAssessmentForm>
      <LikertScaleRow /> (per competency)
      <SubmitAssessmentButton />
    </SelfAssessmentForm>
    <MentorEvaluationList>
      <EvaluationCard />
    </MentorEvaluationList>
    <SkillAssessmentGrid>
      <SkillCard />
    </SkillAssessmentGrid>
    <GoalList>
      <GoalCard />
      <AddGoalButton />
    </GoalList>
  </Tabs>
  <RadarChart />
  <EvaluationTimeline />
</EvaluationScreen>

<PortfolioScreen>
  <PortfolioEditor>
    <ProfileSection />
    <ProjectsSection>
      <ProjectCard /> (repeated, editable)
      <AddProjectButton />
    </ProjectsSection>
    <CertificationsSection />
    <SkillsSection />
    <SamplesSection />
    <ResumeSection />
  </PortfolioEditor>
  <CompletenessScore />
  <ShareControls />
  <PortfolioPreviewModal />
</PortfolioScreen>

<MessagingScreen>
  <ConversationList>
    <SearchInput />
    <ConversationItem /> (repeated)
  </ConversationList>
  <MessageThread>
    <MessageBubble /> (repeated)
    <SystemMessage /> (for status updates)
    <TypingIndicator />
    <DateDivider />
  </MessageThread>
  <MessageComposer>
    <AutoResizeTextarea />
    <FileAttachmentButton />
    <EmojiPickerPopover />
    <SendButton />
  </MessageComposer>
  <ContactDetailPane />
</MessagingScreen>
```

---

## 7. Exhaustive User Journeys

### Journey 1: Daily Dashboard Check-in

1. Intern logs in via `/auth/login` (email + password or SSO)
2. System verifies JWT, redirects to `/intern`
3. `GET /api/intern/dashboard` loads (skeleton loaders shown)
4. Dashboard renders with progress ring at 42%, 3 pending tasks, 1 overdue
5. AlertBanner shows "You have 1 overdue task — Review now"
6. Intern clicks "Review now" → navigates to `/intern/tasks` with `?status=overdue` filter
7. Overdue task highlighted in red with `dueDate` in past
8. Intern opens task, reads description, uploads submission file
9. Clicks "Submit" → `PATCH /api/intern/tasks/:id/submit` called
10. Success toast: "Task submitted! Waiting for review."
11. Navigates back to dashboard — task count updated, overdue count now 0

### Journey 2: Weekly Timesheet Submission

1. Intern navigates to `/intern/timesheet`
2. WeekPicker shows current week (Mon–Sun)
3. If no entries exist, empty grid shown with hint tooltip
4. Intern clicks cell for Monday Classroom → enters `4`
5. Cell validates `hours ≤ 24`, sum updates in DayTotalRow
6. Intern fills remaining days: 6 categories × 7 days (partial fill)
7. Click "Apply Last Week" → copies previous week's template
8. Reviews totals at bottom: `Week Total: 32.5h`
9. Clicks "Submit for Approval"
10. `POST /api/intern/timesheet/submit` called
11. Validation: total must be > 0, no cell > 24, all dates within week
12. Status changes to `submitted`, submit button disabled, badge turns blue
13. **Error recovery**: If validation fails, inline errors shown on offending cells

### Journey 3: Schedule Mentorship Session

1. Intern navigates to `/intern/mentorship`
2. Sees assigned mentor profile card with rating 4.8, 12 sessions completed
3. Clicks "Schedule Session" button
4. Modal opens: `ScheduleSessionForm`
5. Selects date from DatePicker (future dates only, not weekends if mentor unavailable)
6. Selects time slot from available slots loaded from `GET /api/mentors/:id/availability?date=...`
7. Chooses duration: 30 min, topic: "Career guidance in Cloud Security"
8. Selects meeting type: "video"
9. Clicks "Schedule"
10. `POST /api/intern/mentorship/sessions` called
11. **Success**: Modal closes, session appears in Upcoming list with "Confirmed" badge
12. Calendar invite sent via email notification
13. **Error**: "Time slot not available" if another session booked in that slot
14. **Edge — Mentor has no availability that week**: Show "No available slots this week" with "Next Week" button

### Journey 4: Complete Learning Module

1. Intern opens `/intern/learning-plan`, sees Phase 1: "Foundations of Cybersecurity" at 60%
2. Expands Phase 1 accordion, sees Module 3: "Network Fundamentals" highlighted as next
3. Clicks Module 3 → Lesson list loads
4. Opens Lesson 3.4: "TCP/IP Protocol Deep Dive" (video, 45min)
5. Video player loads in lesson detail panel
6. Intern watches video, `POST /api/intern/learning-plan/lessons/:id/progress` called every 30s
7. After completing, clicks "Mark Complete"
8. `POST /api/intern/learning-plan/lessons/:id/complete` called with `timeSpentMinutes: 42`
9. System awards 50 XP, progress bar updates to 65%, confetti animation
10. Next lesson automatically highlighted

### Journey 5: Submit Self-Assessment & Set Goals

1. Navigate to `/intern/evaluations`
2. "Self Assessment" tab shows form with 6 competency Likert scales
3. Intern rates: Technical Skills 4, Analytical Thinking 4, Communication 3, Teamwork 3, Initiative 4, Time Management 3
4. Adds comment: "Working on my presentation skills. Need more group project exposure."
5. Clicks "Submit Assessment"
6. `POST /api/intern/evaluations/self` called
7. Success toast, form becomes read-only
8. Switches to "Goals" tab → creates SMART goal: "Complete CompTIA Security+ by end of quarter"
9. Sets target date, adds metric: "Pass practice test with 85%+"
10. Goal appears with "Not Started" status

### Journey 6: Build Portfolio

1. Navigate to `/intern/portfolio`
2. Completeness score shows 15% — "Add 5 more items to reach 50%"
3. Intern edits profile: adds headline "Aspiring SOC Analyst", bio, GitHub URL
4. Clicks "Add Project" → modal with form fields
5. Fills: "Network Intrusion Detection System", techs ["Python", "Snort", "Wireshark"], GitHub link
6. Saves — project card appears in grid with drag-to-reorder
7. Uploads resume PDF via ResumeUploader
8. Toggles "Make Portfolio Public" → share link generated
9. Copies share link, sends to potential employer

### Journey 7: Message Mentor

1. Navigate to `/intern/messages`
2. Conversation list shows 3 conversations: mentor (2 unread), coordinator, group chat
3. Click on mentor conversation — messages load, unread badge resets
4. `PATCH /api/intern/messages/conversations/:id/read` called
5. Types message in composer: "Hi mentor, I'm stuck on the SQL injection lab. Can we review it?"
6. Attaches screenshot file (4.2MB PNG)
7. Presses Enter → message sent via WebSocket
8. Message appears in thread with blue bubble, timestamp, single check (sent)
9. Mentor is offline — indicator shows "Last seen 2 hours ago"
10. When mentor reads, check turns double-blue (read)
11. Real-time notification arrives when mentor responds

### Journey 8: Error Recovery — Task Submission Failure

1. Intern submits task with large file (12MB)
2. Client-side validation catches `fileSize > 10MB` before API call
3. Shows inline error: "File too large. Maximum 10MB per file."
4. Intern compresses file to 8MB, retries
5. API call succeeds
6. **Edge — Network failure mid-submit**: Toast "Connection lost. Your submission is saved as draft."
7. On reconnect, auto-retry with exponential backoff (3 attempts)
8. After 3 failures: "Submission failed. Please try again or contact support."

### Journey 9: Timesheet Rejection Recovery

1. Intern submits timesheet → status: submitted
2. Mentor/HR reviews, rejects with reason: "Missing lab hours for Wednesday"
3. Email notification sent: "Your timesheet for Jun 16–22 was rejected"
4. Intern opens timesheet, sees red "Rejected" badge with rejection reason tooltip
5. Cells are editable again (re-opened)
6. Intern adds 3 hours for Wednesday Lab
7. Resubmits → re-enters approval workflow

---

## 8. Business Rules Engine

| Rule ID  | Name                      | Condition                                                                                               | Action                                                  |
| -------- | ------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| INT-R001 | Task auto-overdue         | `dueDate < now() AND status NOT IN ('completed','cancelled')`                                           | Auto-set status to `overdue`, notify intern + mentor    |
| INT-R002 | Timesheet cutoff          | `currentDay > weekEnd + 3 days`                                                                         | Lock timesheet editing, require admin override          |
| INT-R003 | Max daily hours           | `sum(entries WHERE date = X) > 24`                                                                      | Block save, show inline error                           |
| INT-R004 | Min session notice        | `session.scheduledDate - now() < 1 hour`                                                                | Block cancellation, show "Too late to cancel"           |
| INT-R005 | Mentor session limit      | `count(sessions WHERE mentorId=X AND status=scheduled AND date=Y) >= 8`                                 | Block new session booking                               |
| INT-R006 | Weekly session limit      | `count(sessions WHERE internId=X AND status=scheduled AND weekStart=Y AND weekEnd=Y+7) >= 3`            | Block booking beyond 3 per week                         |
| INT-R007 | Feedback window           | `session.status=completed AND now() - session.endTime > 72 hours`                                       | Close feedback form, require override                   |
| INT-R008 | Self-assessment frequency | `exists(selfAssessments WHERE period=currentPeriod)`                                                    | Block duplicate, show "Already submitted"               |
| INT-R009 | Portfolio auto-unlock     | `onboardingCompleted=true`                                                                              | Enable portfolio access                                 |
| INT-R010 | Phase progression         | `allModulesCompleted(currentPhaseId) AND currentPhaseId.hasNext`                                        | Auto-advance to next phase                              |
| INT-R011 | XP calculation            | `XP earned = lessonDuration * 2 + assessmentScore * 10 + taskEarlyBonus`                                | Accumulate XP on completion                             |
| INT-R012 | Skill level up            | `totalXp >= level * 1000`                                                                               | Auto-level up, award badge, notify                      |
| INT-R013 | Timesheet auto-approve    | `totalHours <= 40 AND noEntry > 24 AND mentorApproved`                                                  | Auto-approve without HR review                          |
| INT-R014 | Portfolio completeness    | `Completeness = sum(weight: profile=25%, projects=25%, skills=15%, certs=15%, samples=10%, resume=10%)` | Recalculate on every portfolio change                   |
| INT-R015 | Messaging rate limit      | `messagesPerMinute > 20`                                                                                | Throttle to 1 message per 3 seconds, notify "Slow down" |

---

## 9. Notification Specifications

| Notification                 | Trigger                                  | Channel                      | Template Variables                                          | Delivery Rules                              |
| ---------------------------- | ---------------------------------------- | ---------------------------- | ----------------------------------------------------------- | ------------------------------------------- |
| Task assigned                | Staff creates task for intern            | In-app, Email, Push          | `{taskTitle, dueDate, priority, staffName}`                 | Immediate, no digest                        |
| Task overdue                 | Status changed to `overdue`              | In-app, Email, Push (urgent) | `{taskTitle, dueDate, daysOverdue}`                         | Immediate, escalate to mentor after 24h     |
| Task submission received     | Intern submits task                      | In-app (mentor), Email       | `{internName, taskTitle, submittedAt}`                      | Immediate                                   |
| Task feedback received       | Mentor submits feedback                  | In-app, Email                | `{taskTitle, rating, feedbackPreview}`                      | Immediate                                   |
| Timesheet reminder           | `currentDay = weekEnd AND status=draft`  | In-app, Email                | `{weekStart, weekEnd}`                                      | Daily at 6pm, until submitted               |
| Timesheet approved           | Status changed to `approved`             | In-app, Email                | `{weekStart, weekEnd, totalHours}`                          | Immediate                                   |
| Timesheet rejected           | Status changed to `rejected`             | In-app, Email, Push          | `{weekStart, weekEnd, reason}`                              | Immediate                                   |
| Mentorship session reminder  | `session.date = today AND 1 hour before` | In-app, Email, Push          | `{mentorName, time, meetingType, meetingLink}`              | 1 hour before, 15 min before                |
| Mentorship session cancelled | Mentor cancels session                   | In-app, Email                | `{mentorName, topic, date}`                                 | Immediate                                   |
| Mentorship feedback request  | Session completed 1 hour ago             | In-app, Email                | `{mentorName, date}`                                        | Once, 1 hour post-session                   |
| Learning milestone           | Module completed                         | In-app, Push                 | `{moduleName, phaseName, xpGained}`                         | Immediate                                   |
| Certification earned         | Assessment passed with 80%+              | In-app, Email                | `{certName, score}`                                         | Immediate                                   |
| Portfolio public             | Intern makes portfolio public            | In-app                       | `{shareUrl}`                                                | Immediate                                   |
| Message received             | New message in conversation              | In-app, Email (digest), Push | `{senderName, messagePreview}`                              | In-app immediate, email every 15min if away |
| Evaluation published         | Mentor publishes evaluation              | In-app, Email                | `{period, overallScore}`                                    | Immediate                                   |
| Weekly progress report       | Every Sunday 6pm                         | In-app, Email                | `{tasksCompleted, hoursLogged, xpGained, modulesCompleted}` | Weekly digest                               |
| Inactivity alert             | No login for 7 days                      | Email                        | `{fullName, daysSinceLogin}`                                | Day 7, Day 14, Day 21 (escalation)          |
| Phase unlocked               | All prerequisites met                    | In-app, Push                 | `{phaseName}`                                               | Immediate                                   |

---

## 10. Permission Matrix

| Entity        | Operation        | Intern            | Mentor      | Coordinator | Admin | HR  |
| ------------- | ---------------- | ----------------- | ----------- | ----------- | ----- | --- |
| Task          | Create           | ✗                 | ✓           | ✓           | ✓     | ✗   |
| Task          | Read own         | ✓                 | ✓           | ✓           | ✓     | ✓   |
| Task          | Read all         | ✗                 | ✓ (mentees) | ✓ (program) | ✓     | ✓   |
| Task          | Update status    | ✓ (own)           | ✓           | ✓           | ✓     | ✗   |
| Task          | Submit           | ✓                 | ✗           | ✗           | ✗     | ✗   |
| Task          | Delete           | ✗                 | ✗           | ✓           | ✓     | ✗   |
| Timesheet     | Create           | ✓                 | ✗           | ✗           | ✓     | ✓   |
| Timesheet     | Read own         | ✓                 | ✓ (mentees) | ✓           | ✓     | ✓   |
| Timesheet     | Approve          | ✗                 | ✗           | ✓           | ✓     | ✓   |
| Timesheet     | Submit           | ✓                 | ✗           | ✗           | ✗     | ✗   |
| Mentorship    | View assignments | ✓                 | ✓           | ✓           | ✓     | ✓   |
| Mentorship    | Book session     | ✓                 | ✓           | ✓           | ✓     | ✗   |
| Mentorship    | Cancel session   | ✓                 | ✓           | ✓           | ✓     | ✗   |
| Mentorship    | Feedback         | ✓                 | ✓           | ✗           | ✓     | ✗   |
| Portfolio     | Edit             | ✓                 | ✗           | ✗           | ✓     | ✗   |
| Portfolio     | View own         | ✓                 | ✓           | ✓           | ✓     | ✓   |
| Portfolio     | View public      | ✓                 | ✓           | ✓           | ✓     | ✓   |
| Learning Plan | View             | ✓                 | ✓           | ✓           | ✓     | ✗   |
| Learning Plan | Mark complete    | ✓                 | ✗           | ✓           | ✓     | ✗   |
| Evaluation    | Self-assess      | ✓                 | ✗           | ✗           | ✗     | ✗   |
| Evaluation    | Mentor eval      | ✗                 | ✓           | ✓           | ✓     | ✓   |
| Messaging     | Send             | ✓ (allowed users) | ✓ (mentees) | ✓           | ✓     | ✓   |
| Messaging     | Read own         | ✓                 | ✓           | ✓           | ✓     | ✓   |

---

## 11. State Management

### Redux Slice Structure

```typescript
// internSlice.ts
interface InternState {
  profile: InternProfile | null;
  dashboard: DashboardData | null;
  tasks: {
    items: Task[];
    selectedId: string | null;
    filters: TaskFilters;
    pagination: PaginationState;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
  };
  timesheet: {
    current: Timesheet | null;
    history: TimesheetSummary[];
    templates: TimesheetTemplate[];
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
  mentorship: {
    mentor: MentorProfile | null;
    sessions: MentorshipSession[];
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
  learningPlan: {
    phases: Phase[];
    currentLesson: LessonDetail | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
  portfolio: Portfolio | null;
}
```

### RTK Query Endpoints

```typescript
const internApi = createApi({
  reducerPath: "internApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/intern", credentials: "include" }),
  tagTypes: ["Dashboard", "Tasks", "Timesheet", "Mentorship", "Learning", "Portfolio"],
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
    getTasks: builder.query<TaskListResponse, TaskFilters>({
      query: (filters) => ({ url: "/tasks", params: filters }),
      providesTags: ["Tasks"],
    }),
    getTask: builder.query<TaskDetailResponse, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, error, id) => [{ type: "Tasks", id }],
    }),
    submitTask: builder.mutation<TaskDetailResponse, { id: string; body: TaskSubmitRequest }>({
      query: ({ id, body }) => ({ url: `/tasks/${id}/submit`, method: "PATCH", body }),
      invalidatesTags: ["Tasks", "Dashboard"],
    }),
    getTimesheet: builder.query<TimesheetResponse, string>({
      query: (weekStart) => `/timesheet?weekStart=${weekStart}`,
      providesTags: ["Timesheet"],
    }),
    saveTimesheet: builder.mutation<TimesheetResponse, TimesheetUpsertRequest>({
      query: (body) => ({ url: "/timesheet", method: "POST", body }),
      invalidatesTags: ["Timesheet", "Dashboard"],
    }),
    submitTimesheet: builder.mutation<TimesheetResponse, string>({
      query: (id) => ({ url: "/timesheet/submit", method: "POST", body: { timesheetId: id } }),
      invalidatesTags: ["Timesheet", "Dashboard"],
    }),
    getMentor: builder.query<MentorResponse, void>({
      query: () => "/mentorship/mentor",
    }),
    getSessions: builder.query<SessionListResponse, SessionFilters>({
      query: (filters) => ({ url: "/mentorship/sessions", params: filters }),
      providesTags: ["Mentorship"],
    }),
    createSession: builder.mutation<MentorshipSession, CreateSessionRequest>({
      query: (body) => ({ url: "/mentorship/sessions", method: "POST", body }),
      invalidatesTags: ["Mentorship"],
    }),
    getLearningPlan: builder.query<LearningPlanResponse, void>({
      query: () => "/learning-plan",
      providesTags: ["Learning"],
    }),
    completeLesson: builder.mutation<
      { status: string; xpGained: number },
      { id: string; timeSpent?: number }
    >({
      query: ({ id, timeSpent }) => ({
        url: `/learning-plan/lessons/${id}/complete`,
        method: "POST",
        body: { timeSpentMinutes: timeSpent },
      }),
      invalidatesTags: ["Learning", "Dashboard"],
    }),
    getPortfolio: builder.query<Portfolio, void>({
      query: () => "/portfolio",
      providesTags: ["Portfolio"],
    }),
    updatePortfolioProfile: builder.mutation<Portfolio, Partial<PortfolioProfile>>({
      query: (body) => ({ url: "/portfolio/profile", method: "PUT", body }),
      invalidatesTags: ["Portfolio"],
    }),
  }),
});
```

### Cache Policy

- Dashboard: SWR, revalidate every 60s, stale-while-revalidate
- Tasks: Cache until mutation, refetch on focus
- Timesheet: Cache until week changes or mutation
- Mentorship sessions: SWR 30s
- Portfolio: Cache until mutation, longer TTL (5 min)
- Learning Plan: Cache until mutation, moderate TTL (2 min)

### Optimistic Updates

- Task status change: Immediately update local state, roll back on error
- Timesheet cell edit: Debounce 1s save, local state immediate
- Message send: Show message immediately (grey/unsent), confirm with WebSocket ack
- Portfolio edit: Show saved indicator immediately, roll back on 400

---

## 12. Form Schemas (Zod)

```typescript
import { z } from "zod";

// Timesheet entry
export const timesheetEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  category: z.enum([
    "classroom",
    "lab_work",
    "self_study",
    "mentorship_session",
    "project_work",
    "extracurricular",
    "other",
  ]),
  hours: z
    .number()
    .min(0, "Hours must be >= 0")
    .max(24, "Hours cannot exceed 24")
    .multipleOf(0.5, "Hours must be in 0.5 increments"),
  description: z.string().max(500, "Max 500 characters").optional(),
});

export const timesheetSchema = z
  .object({
    weekStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
    entries: z.array(timesheetEntrySchema).min(1, "At least one entry required"),
    notes: z.string().max(2000).optional(),
  })
  .refine(
    (data) =>
      data.entries.every((e) => {
        const dayHours = data.entries
          .filter((x) => x.date === e.date)
          .reduce((sum, x) => sum + x.hours, 0);
        return dayHours <= 24;
      }),
    { message: "Total hours per day cannot exceed 24" },
  );

// Mentorship session
export const createSessionSchema = z.object({
  mentorId: z.string().uuid("Invalid mentor"),
  scheduledDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((val) => new Date(val) > new Date(), "Date must be in the future"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Use HH:MM format"),
  durationMinutes: z.union([z.literal(30), z.literal(60), z.literal(90)]),
  topic: z.string().min(1, "Topic is required").max(200, "Max 200 characters"),
  notes: z.string().max(1000).optional(),
  meetingType: z.enum(["in_person", "video", "phone"]),
});

// Self-assessment
export const selfAssessmentSchema = z.object({
  technicalSkills: z.number().int().min(1, "Required").max(5),
  analyticalThinking: z.number().int().min(1).max(5),
  communication: z.number().int().min(1).max(5),
  teamwork: z.number().int().min(1).max(5),
  initiative: z.number().int().min(1).max(5),
  timeManagement: z.number().int().min(1).max(5),
  overallComment: z.string().max(2000).optional(),
});

// Portfolio project
export const portfolioProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(5000).optional(),
  technologies: z.array(z.string()).max(20, "Max 20 technologies").optional(),
  liveUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  repoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  highlights: z.array(z.string().max(500)).max(10).optional(),
});

// Portfolio profile
export const portfolioProfileSchema = z.object({
  headline: z.string().max(100, "Max 100 characters").optional(),
  bio: z.string().max(1000, "Max 1000 characters").optional(),
  location: z.string().max(100).optional(),
  linkedInUrl: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  personalWebsite: z.string().url("Invalid URL").optional().or(z.literal("")),
});

// Messaging
export const sendMessageSchema = z.object({
  text: z.string().min(1, "Message cannot be empty").max(2000, "Max 2000 characters"),
  attachments: z
    .array(
      z.object({
        name: z.string().max(255),
        data: z.string(), // base64
        type: z.string(),
      }),
    )
    .max(5, "Max 5 attachments")
    .optional(),
});

// Task submission
export const taskSubmissionSchema = z.object({
  submissionText: z.string().max(5000, "Max 5000 characters").optional(),
  files: z
    .array(
      z.object({
        fileName: z.string().max(255),
        fileData: z.string(),
        mimeType: z.string(),
      }),
    )
    .max(5, "Max 5 files")
    .optional(),
});

// Intern SMART goal
export const goalSchema = z.object({
  title: z.string().min(1, "Goal title is required").max(200),
  description: z.string().max(2000).optional(),
  targetDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  metrics: z.array(z.string()).max(5).optional(),
});
```

---

## 13. Analytics Events

| Event Name                   | Properties                                      | Trigger                                 | Destination       |
| ---------------------------- | ----------------------------------------------- | --------------------------------------- | ----------------- |
| intern_dashboard_viewed      | `{internId, programId, phase, progressPercent}` | Dashboard page load                     | PostHog, GA4      |
| intern_task_viewed           | `{internId, taskId, status, priority}`          | Task detail opened                      | PostHog           |
| intern_task_submitted        | `{internId, taskId, hasFiles, charCount}`       | Task submit                             | PostHog           |
| intern_timesheet_opened      | `{internId, weekStart, existingEntries}`        | Timesheet page load                     | PostHog           |
| intern_timesheet_cell_edited | `{internId, date, category, hours, prevHours}`  | Cell value change                       | PostHog           |
| intern_timesheet_submitted   | `{internId, weekStart, totalHours, entryCount}` | Submit click                            | PostHog           |
| intern_session_scheduled     | `{internId, mentorId, duration, meetingType}`   | Session created                         | PostHog, Calendly |
| intern_session_cancelled     | `{internId, mentorId, reason}`                  | Session cancelled                       | PostHog           |
| intern_session_feedback      | `{internId, mentorId, rating, sessionCount}`    | Feedback submitted                      | PostHog           |
| intern_lesson_completed      | `{internId, lessonId, contentType, timeSpent}`  | Lesson marked complete                  | PostHog           |
| intern_module_completed      | `{internId, moduleId, phaseId}`                 | All lessons complete                    | PostHog, Email    |
| intern_self_assessment       | `{internId, period, avgScore}`                  | Self-assessment submit                  | PostHog           |
| intern_goal_created          | `{internId, hasTargetDate, hasMetrics}`         | Goal created                            | PostHog           |
| intern_portfolio_edited      | `{internId, sectionEdited, completenessAfter}`  | Portfolio save                          | PostHog           |
| intern_portfolio_published   | `{internId, completenessScore}`                 | Toggle public                           | PostHog           |
| intern_message_sent          | `{internId, recipientRole, hasAttachment}`      | Message send                            | PostHog           |
| intern_message_read          | `{internId, conversationId, messageCount}`      | Thread opened                           | PostHog           |
| intern_search_performed      | `{internId, searchFrom ('tasks'                 | 'messages'), queryLength, resultCount}` | Search executed   | PostHog |
| intern_onboarding_step       | `{internId, step, stepName}`                    | Onboarding step                         | PostHog           |
| intern_xp_level_up           | `{internId, newLevel, totalXp}`                 | Level threshold                         | PostHog, Push     |

---

## 14. Accessibility Requirements

- All interactive elements must have `aria-label` or `aria-labelledby`
- Timesheet grid cells: `role="gridcell"`, `aria-describedby` for category+day
- Status badges: `role="status"` with `aria-live="polite"` for dynamic updates
- Dashboard skeleton loaders: `aria-busy="true"`, `aria-label="Loading dashboard"`
- Task list: `role="listbox"`, task items `role="option"` with `aria-selected`
- Filter dropdowns: `aria-expanded`, `aria-controls`, keyboard navigation with arrow keys
- Modal dialogs: `role="dialog"`, `aria-modal="true"`, focus trap, `aria-labelledby` referencing title, Escape to close
- Form validation: `aria-invalid="true"` on error fields, `aria-describedby` for error messages
- Toast notifications: `role="alert"`, `aria-live="assertive"` for action-affirming, `polite` for info
- File upload: `role="button"`, `aria-label="Upload file"`, keyboard accessible
- Progress rings: `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- Charts (radar): `role="img"`, `aria-label` describing data, provide data table fallback
- Color: All status colors have associated text/icon indicators (not color-only)
- Focus management: Focus moves to first focusable element in new panel, back to trigger on close
- Skip navigation: "Skip to main content" link at top of layout
- Message composer: `aria-multiline="true"`, Enter sends, Shift+Enter newline documented in tooltip
- Keyboard shortcuts: `Ctrl+Enter` send, `Escape` close detail, `Ctrl+K` search
- Reduced motion: Respect `prefers-reduced-motion`, disable animations/transitions
- Screen reader announcements: Task count updates, timesheet auto-saves, message delivery confirmations
- Zoom: All layouts responsive up to 200% zoom without horizontal scroll

---

## 15. Error & Edge Case Catalog

| Error Code | Condition                         | HTTP Status | System Response             | User Message                                                                    | Recovery Action                  |
| ---------- | --------------------------------- | ----------- | --------------------------- | ------------------------------------------------------------------------------- | -------------------------------- |
| TASK-001   | Task not found                    | 404         | Log warning                 | "Task not found. It may have been removed."                                     | Navigate to task list            |
| TASK-002   | Task already submitted            | 400         | Reject request              | "This task has already been submitted."                                         | View submission status           |
| TASK-003   | Task overdue > 30 days            | 400         | Soft-block submit           | "This task is overdue by more than 30 days. Please contact your mentor."        | Contact mentor via messaging     |
| TASK-004   | File upload virus detected        | 422         | Reject, log security event  | "File failed security scan. Please upload a clean file."                        | Scan file locally, retry         |
| TS-001     | Timesheet week not Monday         | 400         | Reject                      | "Week start must be a Monday."                                                  | Adjust date picker               |
| TS-002     | Timesheet already approved        | 400         | Reject                      | "This timesheet has already been approved. Contact HR to reopen."               | Contact HR                       |
| TS-003     | Duplicate entry same day+category | 409         | Merge hours                 | "You already have an entry for this day and category. Hours have been updated." | Review merged value              |
| TS-004     | Total exceeds 168                 | 400         | Reject                      | "Total hours cannot exceed 168 per week."                                       | Reduce hours                     |
| MS-001     | Mentor unavailable                | 409         | Check calendar              | "Your mentor is not available at this time."                                    | Show alternative slots           |
| MS-002     | Session conflict                  | 409         | Check intern schedule       | "You already have a session scheduled for this time."                           | Show conflicting session         |
| MS-003     | Min cancellation window           | 400         | Lock cancel                 | "Cannot cancel less than 1 hour before start."                                  | Show "Contact mentor directly"   |
| LP-001     | Prerequisite not met              | 403         | Block access                | "Complete {moduleName} first to unlock this module."                            | Link to prerequisite             |
| LP-002     | Max retakes exhausted             | 403         | Block attempt               | "No retakes remaining for this assessment."                                     | Contact instructor               |
| PF-001     | Portfolio not found               | 404         | Create empty                | "Portfolio not yet created. Let's build one!"                                   | Redirect to portfolio builder    |
| PF-002     | File type not allowed             | 400         | Reject                      | "Only PDF, PNG, JPG files are accepted."                                        | Convert file, retry              |
| PF-003     | File exceeds size limit           | 413         | Reject                      | "File too large. Maximum size is 10MB."                                         | Compress file, retry             |
| PF-004     | Resume already exists             | 409         | Confirm overwrite           | "A resume already exists. Replace it?"                                          | Show confirm dialog              |
| MSG-001    | Cannot message blocked user       | 403         | Block send                  | "This user cannot receive messages."                                            | Show alternative contact         |
| MSG-002    | Rate limit exceeded               | 429         | Throttle                    | "You're sending messages too quickly. Please wait a moment."                    | Disable send button 3s           |
| MSG-003    | Conversation not found            | 404         | Log                         | "This conversation no longer exists."                                           | Refresh conversation list        |
| AUTH-001   | Session expired                   | 401         | Clear tokens                | "Your session has expired. Please log in again."                                | Redirect to login                |
| AUTH-002   | Account suspended                 | 403         | Log security                | "Your account has been suspended. Contact support."                             | Show support contact             |
| NET-001    | Network offline                   | —           | Detect via navigator.onLine | "You're offline. Changes will be saved locally."                                | Queue actions, sync on reconnect |
| NET-002    | API timeout                       | 504         | Retry 3x with backoff       | "Request timed out. Please try again."                                          | Show retry button with countdown |
| GEN-001    | Unexpected error                  | 500         | Log with trace ID           | "Something went wrong. Please try again. (Ref: {traceId})"                      | Show traceId for support         |
| GEN-002    | Rate limit (general)              | 429         | Throttle                    | "Too many requests. Please slow down."                                          | Retry-After header displayed     |
