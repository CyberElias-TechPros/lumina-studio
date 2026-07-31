# Actor: Admissions Officer

## 1. Identity & Role Definition

**Actor ID:** `admissions_officer`  
**Display Name:** Admissions Officer  
**Description:** Responsible for managing the entire student admissions lifecycle — from application intake through enrollment confirmation. Works within the CEA-OS Admissions Module to review applications, schedule interviews, verify documents, communicate decisions, and track enrollment pipeline.  
**System Role:** `admissions_staff`  
**Hierarchy:** Reports to Director of Admissions (role: `admissions_director`)  
**Location:** Primarily web dashboard; limited mobile access for approvals  
**Session Timeout:** 60 minutes of inactivity  
**Concurrent Sessions:** 2 max  
**IP Whitelist:** Optional, configured by System Administrator

## 2. Primary Goals & Success KPIs

| Goal                                    | KPI                                                  | Target            | Measurement                            |
| --------------------------------------- | ---------------------------------------------------- | ----------------- | -------------------------------------- |
| Process applications efficiently        | Average review time per application                  | < 4 hours         | Tracked in `application_reviews` table |
| Maintain healthy application pipeline   | Applications in "In Review" stage                    | < 50 at any time  | Pipeline kanban count                  |
| Schedule interviews promptly            | Days from "Review Complete" to "Interview Scheduled" | < 3 business days | `interview_schedules` timestamps       |
| Verify documents accurately             | Document verification accuracy rate                  | > 99%             | Manual audit sampling                  |
| Convert applicants to enrolled students | Offer acceptance rate                                | > 65%             | `enrollment_tracker` data              |
| Meet enrollment targets                 | Enrolled students vs target per intake               | ±5% of target     | Reports module                         |
| Communication turnaround                | Response time to applicant inquiries                 | < 24 hours        | `communication_log` timestamps         |
| Data accuracy                           | Application data error rate                          | < 1%              | Periodic data quality audits           |

## 3. Complete Screen Inventory

### 3.1 Admissions Hub (`/admissions`)

**Wireframe:** Central landing page with summary cards, recent activity feed, and quick-action toolbar.

**UI Fields/Components:**

- **Header:** "Admissions Hub" with breadcrumb (Home > Admissions)
- **Summary Cards Row:** (4 cards in a horizontal grid)
  - `TotalApplicationsCard` — count, % change vs last period, trend arrow (up/down/flat)
  - `PendingReviewCard` — count needing review, color-coded (green < 10, yellow 10-30, red > 30)
  - `InterviewsScheduledCard` — today's interview count, upcoming this week
  - `EnrolledThisMonthCard` — enrolled count, target progress bar (%)
- **Pipeline Health Widget:** Mini kanban showing counts per stage (New, Screening, Review, Interview, Decision, Enrolled, Rejected)
- **Recent Activity Feed:** `ActivityFeed` component, last 20 actions, infinite scroll
  - Each item: actor avatar, action text, timestamp, entity link
- **Quick Actions Toolbar:**
  - "➕ New Application" button → opens `ApplicationForm` modal
  - "📋 Import Applications" button → file upload modal (CSV/Excel)
  - "📊 View Reports" button → navigates to `/admissions/reports`
  - "⚙️ Settings" icon → admissions settings modal
- **Search & Filter Bar:**
  - Search input (search by applicant name, email, ID, phone)
  - Filter dropdowns: Status, Intake Period, Program, Source
  - Date range picker
  - "Clear Filters" link

**Data Bindings:**

- Summary cards: `GET /api/admissions/dashboard/summary`
- Pipeline health: `GET /api/admissions/dashboard/pipeline`
- Activity feed: `GET /api/admissions/dashboard/activity?limit=20&offset={offset}`
- Filters: URL query params via `useRouter`

**States:**

| State             | Behavior                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| Loading           | Skeleton cards (4 shimmer blocks), activity feed skeleton list (3 items)                                     |
| Empty             | First-time use: "Welcome to Admissions Hub! Get started by creating your first application." with CTA button |
| Error             | Error banner: "Unable to load dashboard data. [Retry]" with fallback to cached stale data                    |
| Edge — Large Data | Cards show compact counts (>999 shows "1K+"); activity feed virtualized after 50 items                       |
| Edge — Offline    | "You are offline. Showing cached data from [timestamp]." Banner at top, disable write operations             |

### 3.2 Applications Pipeline (`/admissions/applications`)

**Wireframe:** Kanban board view with toggle to switch to list/table view. Draggable cards between columns.

**Views:**

- **Kanban View (default):**
  - Columns: New (blue), Screening (purple), Review (orange), Interview (teal), Decision (green/red), Enrolled (green), Rejected (red), Withdrawn (gray)
  - Each column: Header (stage name + count), cards list (max 50 per column, scroll), "Collapse" button
  - Each card: Applicant photo (24x24), Full Name trunc, Program, Submission Date (relative), Priority badge (High/Med/Low), Attachment indicator paperclip icon
- **List View:** Sortable data table
  - Columns: Select checkbox, Name, Email, Program, Stage (badge), Priority, Submitted, Assigned To, Actions (View, Edit, Delete)
  - Sorting: Click column header to sort asc/desc
  - Bulk actions toolbar: Change Stage, Assign To, Delete, Export CSV
- **Table View:** Same as list but compact, more columns visible

**Filters (shared across views):**

- Stage (multi-select dropdown)
- Program (multi-select dropdown, fetched from `GET /api/programs`)
- Intake Period (dropdown: Fall 2026, Spring 2027, etc.)
- Priority (High/Med/Low/None)
- Assigned To (dropdown: Me, Unassigned, Specific Officer)
- Date Range (Submitted date)
- Search (name, email, ID, phone)

**Data Bindings:**

- Kanban: `GET /api/admissions/applications?stage={stage}&...`
- Drag update: `PATCH /api/admissions/applications/{id}/stage`
- List view: `GET /api/admissions/applications/list?sort={field}&order={asc|desc}&...`
- Bulk actions: `POST /api/admissions/applications/bulk`

**States:**

| State                           | Behavior                                                                                                   |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Loading                         | Kanban skeleton with column shapes, shimmer on cards                                                       |
| Empty per column                | "No applications in [Stage Name]" with ghost illustration                                                  |
| Empty all stages                | "No applications found matching your filters." with "Clear Filters" button                                 |
| Error                           | Toast: "Failed to load applications. [Retry]"                                                              |
| Edge — 500+ cards in one column | Column shows "Show All (523)" link; lazy loads 50 at a time                                                |
| Edge — Drag and drop            | Optimistic update; revert on API failure with error toast                                                  |
| Edge — Real-time update         | WebSocket push when another officer moves an application; show toast "[Name] moved [Applicant] to [Stage]" |

### 3.3 Application Detail View (`/admissions/applications/{id}`)

**Wireframe:** Three-panel layout: left sidebar (nav), center (main content), right (activity & actions).

**Left Sidebar (Navigation):**

- Application ID badge (e.g., "APP-2026-0042")
- Stages stepper (vertical timeline, completed/current/upcoming)
- Quick links: Overview, Documents, Interview, Communication, History

**Center Panel — Main Content:**

**Tab 1: Overview**

- **Personal Information Section:**
  - Photo (upload area), Full Name, Date of Birth, Gender, Nationality, Phone, Email, Current Address
  - Fields: editable inline on click
- **Academic History Section:**
  - Previous Institutions table: Institution Name, Degree, Field of Study, GPA (Scale), Start Date, End Date, Attended (checkbox)
  - "+ Add Institution" button
- **Program Selection Section:**
  - Primary Program (dropdown, from `GET /api/programs`), Secondary Program (optional)
  - Intake Period (dropdown)
  - Application Type (New, Transfer, Re-admission, International)
- **Documents Checklist:**
  - List of required documents per program: Document Type, Status (Not Uploaded, Uploaded, Verified, Rejected), Upload Date, Verified By, Actions (View, Verify, Reject)
  - Progress bar: X of Y documents verified
- **Test Scores Section:**
  - Table: Test Name (SAT/ACT/IELTS/TOEFL/GRE/GMAT), Score, Date Taken, Verified (yes/no), Document Link
  - "+ Add Test Score" button

**Tab 2: Documents**

- Full document viewer with thumbnails
- Upload new document (drag & drop zone)
- Per document: Verify button, Reject with reason textarea, Download, Delete

**Tab 3: Interview**

- Interview status badge (Not Scheduled, Scheduled, Completed, Cancelled, No-Show)
- Schedule Interview form:
  - Interview Type (In-Person, Video Call, Phone Call)
  - Date/Time picker (with timezone selector)
  - Duration (30/45/60/90 min)
  - Interviewer(s) (multi-select from staff list)
  - Location/Video Link (text input)
  - Notes (textarea)
- Reschedule/Cancel buttons
- Completed interview feedback form:
  - Rating (1-5 stars), Strengths (textarea), Weaknesses (textarea), Recommendation (Strong Yes / Yes / Maybe / No)
  - Interviewer signature

**Tab 4: Communication**

- Email composer (To: applicant email, CC, BCC, Subject, Body with rich text editor)
- SMS composer (To: applicant phone, Message body)
- Template selector (dropdown from communication templates)
- Sent messages history (table: Type, Subject/Preview, Sent Date, Status, Open/Click tracking)
- Offer letter generator:
  - Template selector
  - Conditional fields: Scholarship Award (yes/no, amount), Program, Start Date, Acceptance Deadline
  - Preview PDF button
  - "Send Offer Letter" button
  - "Download PDF" button
- Rejection letter generator:
  - Template selector, Reason category dropdown, Custom message

**Tab 5: History**

- Full audit log: Timestamp, Actor, Action, Field Changed (old value → new value), IP Address
- Filterable by action type, date range

**Right Panel — Actions & Activity:**

- **Status Actions Dropdown:** Change Stage (with reason required for certain transitions)
- **Priority Selector:** High / Medium / Low / None
- **Assign To:** Current assignee + change button (opens staff selector modal)
- **Tags:** Multi-select tags (e.g., "Athlete", "Scholarship", "Legacy", "International")
- **Notes Widget:** Sticky notes (create, edit, delete, pin)
- **Recent Activity:** Last 10 actions on this application, mini feed

**Data Bindings:**

- Application: `GET /api/admissions/applications/{id}`
- Update: `PATCH /api/admissions/applications/{id}`
- Documents: `GET /api/admissions/applications/{id}/documents`
- Upload document: `POST /api/admissions/applications/{id}/documents` (multipart/form-data)
- Verify document: `PATCH /api/admissions/applications/{id}/documents/{docId}/verify`
- Schedule interview: `POST /api/admissions/applications/{id}/interviews`
- Communication: `GET /api/admissions/applications/{id}/messages`
- Send email: `POST /api/admissions/applications/{id}/communication/email`
- Offer letter: `POST /api/admissions/applications/{id}/offer-letter`
- Activity: `GET /api/admissions/applications/{id}/activity`

**States:**

| State                   | Behavior                                                                                                    |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| Loading                 | Full-page skeleton with 3-panel layout shimmer                                                              |
| Not Found               | "Application #{id} not found. It may have been deleted or you don't have permission." with "Go Back" button |
| Error                   | Error toast + inline error on failed sections                                                               |
| Saving                  | Save button shows spinner, field disabled during save                                                       |
| Dirty state             | Unsaved changes warning: "You have unsaved changes. Discard?" on navigate away                              |
| Document uploading      | Upload progress bar per file                                                                                |
| Document verify success | Toast: "Document verified successfully" + checklist updates                                                 |
| Offer letter generated  | "Offer letter generated. [Preview] [Send] [Download]"                                                       |

### 3.4 Review Pipeline (`/admissions/review`)

**Wireframe:** Side-by-side layout: left panel is a queue list, right panel shows selected application in read-only review mode with scoring rubric.

**Left Panel — Review Queue:**

- Filterable/sortable list of applications in "Screening" and "Review" stages
- Each item: Name, Program, Submitted Date, Priority, Reviewer (self/other), Score (if already scored)
- Auto-refresh every 60 seconds (toggleable)
- "Claim for Review" button on unassigned items

**Right Panel — Review Workspace:**

- **Application Snapshot:** Read-only view of applicant info, academic history, documents (verified ones green, unverified yellow, missing red)
- **Scoring Rubric:**
  - Section scores: Academic (0-40), Extracurricular (0-20), Essay (0-20), Recommendations (0-10), Interview (0-10) — total 100
  - Auto-calculated total with color grade (90-100: Green, 75-89: Yellow, <75: Red)
  - Per section: Score input (number or slider), Notes textarea
  - Weighted score formula: `sum(section_score * section_weight) / sum(weights) * 100`
- **Recommendation Section:**
  - Decision recommendation: Strong Admit / Admit / Waitlist / Deny
  - Confidence level (1-5)
  - Internal notes (rich text, only visible to admissions staff)
- **Actions:**
  - Save Draft (button)
  - Submit Review (button) — moves to "Decision" stage, triggers notification to Director if recommendation is "Deny"
  - "Request Additional Info" — sends automated email to applicant with custom message
  - "Mark as Incomplete" — moves back to "Screening" with reason required

**Data Bindings:**

- Queue: `GET /api/admissions/review/queue?stage=screening,review`
- Claim: `POST /api/admissions/review/{id}/claim`
- Rubric: `GET /api/admissions/review/{id}/rubric`
- Save score: `PUT /api/admissions/review/{id}/rubric`
- Submit: `POST /api/admissions/review/{id}/submit`

**States:**

| State              | Behavior                                                                                            |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| Loading            | Dual skeleton panels                                                                                |
| Empty queue        | "No applications awaiting review. 🎉" with confetti animation                                       |
| Unclaimable        | If another officer claimed it: "This application is being reviewed by [Name]" with disabled buttons |
| Score out of range | Inline validation: "Score must be between 0 and {max}" for each section                             |
| Submit warning     | Modal: "Are you sure? This action cannot be undone."                                                |

### 3.5 Interview Scheduler (`/admissions/interviews`)

**Wireframe:** Calendar view (week/month toggle) with time slots. Sidebar showing pending interviews.

**Main View — Calendar:**

- **Calendar Component:** Month/Week/Agenda views (toggle)
- Each interview slot shown as colored block: Green (confirmed interview), Yellow (pending confirmation), Red (cancelled), Gray (completed)
- Click slot → opens interview detail modal
- "Schedule Interview" floating button → opens schedule form modal

**Sidebar:**

- **Pending Interviews:** List of interviews awaiting confirmation from applicant
- **Today's Interviews:** List with time, applicant name, interview type, status
- **Quick Stats:** Total today, completed, pending, no-shows

**Schedule Interview Modal:**

- Applicant search/select (with autocomplete)
- Interview Type: In-Person, Video Call, Phone Call
- Date picker + Time slot selector (shows available slots based on interviewer availability)
- Duration: 30/45/60/90 minutes
- Interviewer(s): Multi-select from staff
- Location/Meeting Link: Text input
- Send Confirmation toggle (sends email/SMS to applicant)
- Notes: Textarea

**Interview Detail Modal:**

- All schedule fields (read-only unless rescheduling)
- Status: Scheduled / Confirmed / Completed / Cancelled / No-Show
- Mark Complete button → opens feedback form
- Mark No-Show button
- Cancel button (reason required)
- Reschedule button → opens reschedule form

**Data Bindings:**

- Calendar: `GET /api/admissions/interviews?start={iso}&end={iso}`
- Schedule: `POST /api/admissions/interviews`
- Update: `PATCH /api/admissions/interviews/{id}`
- Cancel: `POST /api/admissions/interviews/{id}/cancel`
- Mark complete: `POST /api/admissions/interviews/{id}/complete`

**States:**

| State             | Behavior                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------ |
| Loading           | Calendar skeleton (grid shimmer)                                                           |
| Empty             | "No interviews scheduled for this period."                                                 |
| Slot conflict     | Error toast: "This time slot conflicts with an existing interview for [Interviewer Name]." |
| Past date warning | "Selected date is in the past. Are you sure?" warning                                      |
| No-show marked    | Application auto-moved to "Re-Contact" stage                                               |

### 3.6 Document Verification (`/admissions/documents`)

**Wireframe:** Queue-based document verification interface. Left panel: document queue. Right panel: document viewer + verification actions.

**Left Panel — Document Queue:**

- Filter tabs: All Pending, Verified, Rejected, Flagged
- Search by applicant name or document ID
- Sort by: Submission Date (asc/desc), Priority
- List items: Applicant Name, Document Type, Submitted Date, Verification Status badge
- Auto-refresh toggle

**Right Panel — Document Viewer:**

- **Document Preview:** Rendered PDF/image (using PDF.js or image viewer), zoom controls (+, -, fit), rotate, fullscreen
- **Document Metadata:** File Name, File Size, File Type, Upload Date, Uploaded By, Page Count
- **Verification Actions:**
  - "✅ Verify" button — marks as verified, logs actor
  - "❌ Reject" button — opens reason dropdown + optional comment, marks as rejected, sends notification to applicant
  - "🚩 Flag" button — flags for supervisor review, opens notes textarea
  - "⬇️ Download Original" button
- **Verification History:** Table of all verification actions on this document

**Data Bindings:**

- Queue: `GET /api/admissions/documents?status=pending&limit=20&offset={offset}`
- Verify: `POST /api/admissions/documents/{id}/verify`
- Reject: `POST /api/admissions/documents/{id}/reject`
- Flag: `POST /api/admissions/documents/{id}/flag`
- Download: `GET /api/admissions/documents/{id}/download`

**States:**

| State                | Behavior                                                                  |
| -------------------- | ------------------------------------------------------------------------- |
| Loading              | Dual skeleton panels                                                      |
| Empty queue          | "All documents verified! 🎉" with illustration                            |
| Document not loading | "Unable to preview this document. [Download] to view locally."            |
| Large file warning   | "File is large ({size}). Loading may take a moment." with loading spinner |
| Batch verify         | Multi-select documents, bulk verify/reject                                |

### 3.7 Communication Center (`/admissions/communication`)

**Wireframe:** Email-like interface. Left sidebar: folders. Center: message list. Right: message content/compose.

**Left Sidebar — Folders:**

- Inbox (applicant replies)
- Sent
- Drafts (autosaved every 30 seconds)
- Templates (communication templates)
- Trash

**Center — Message List:**

- Table: Select (checkbox), Sender/Recipient, Subject (truncated), Preview (first 50 chars), Date, Status (Sent/Draft/Failed), Attachment indicator
- Sort by: Date (default desc), Subject, Status
- Filter by: Type (Email/SMS), Status, Date Range
- Search: Full-text search across subject and body
- Infinite scroll

**Right — Message Detail / Compose:**

- **Message Detail:** Full message view with headers (From, To, CC, BCC, Date, Subject), body rendered HTML, attachments download links
- **Compose (Email):** To, CC, BCC (with autocomplete from applicants), Subject, Body (rich text editor — TipTap/TinyMCE), Attachments (drag & drop), Template selector, Schedule Send (date/time picker), Send / Save Draft
- **Compose (SMS):** To (phone number input), Message body (character counter, max 160 chars standard, auto-split into multi-part for longer), Send button
- **Offer Letter Generator:**
  - Template selector (dropdown: "Standard Offer", "Scholarship Offer", "Athletic Offer", "International Offer")
  - Preview panel (PDF rendered in iframe)
  - Fields: Applicant Name (auto-filled), Program (auto-filled), Scholarship Amount (conditional), Start Date, Acceptance Deadline, Custom Paragraph (rich text)
  - "Generate PDF" button → generates and shows download link
  - "Send Offer Letter" button → sends via email + SMS, logs in communication history
  - "Print" button
- **Rejection Letter Generator:**
  - Template selector
  - Reason category (Academic Requirements Not Met, Program Full, Competitive Pool, Incomplete Application, Other)
  - Custom message (rich text)
  - "Generate & Send" button

**Data Bindings:**

- Messages list: `GET /api/admissions/communication?folder={folder}&limit=50&offset={offset}`
- Message detail: `GET /api/admissions/communication/{id}`
- Send email: `POST /api/admissions/communication/email`
- Send SMS: `POST /api/admissions/communication/sms`
- Save draft: `POST /api/admissions/communication/drafts`
- Templates: `GET /api/admissions/communication/templates`
- Offer letter: `POST /api/admissions/communication/offer-letter`
- Rejection letter: `POST /api/admissions/communication/rejection-letter`

**States:**

| State                  | Behavior                                                            |
| ---------------------- | ------------------------------------------------------------------- |
| Loading                | Skeleton list + detail panel                                        |
| Empty folder           | "No messages in [Folder Name]."                                     |
| Send success           | Toast: "Message sent successfully!" + auto-close compose pane       |
| Send failure           | Toast: "Failed to send message. [Retry]" — draft auto-saved         |
| Template preview       | Load template, replace variables, show preview before sending       |
| Offer letter generated | Modal: "Offer letter generated. [Download PDF] [Send to Applicant]" |

### 3.8 Enrollment Tracker (`/admissions/enrollment`)

**Wireframe:** Dashboard-style view showing enrollment funnel, upcoming intake targets, and individual enrollment records.

**Top Section — Funnel Visualization:**

- Horizontal funnel: Offers Sent → Offers Accepted → Documents Submitted → Tuition Deposited → Enrolled
- Each stage: count, conversion rate (%), comparison to target
- Color gradient: green (on track), yellow (slightly behind), red (behind target)

**Middle Section — Intake Selector + Summary Cards:**

- Intake Period dropdown (Fall 2026, Spring 2027, etc.)
- Summary cards: Target Enrollment, Current Enrolled, Remaining Slots, Waitlist Count
- Deposit Deadline countdown (if upcoming)

**Bottom Section — Enrollment Records Table:**

- Columns: Applicant Name, Application ID, Program, Offer Sent, Offer Accepted, Documents Status, Deposit Status, Enrollment Status, Actions
- Enrollment Status badges: Not Started, Documents Pending, Deposit Pending, Deposit Received, Enrolled, Deferred, Withdrawn
- Filterable by: Program, Status, Intake Period
- Search by name/ID
- Bulk actions: Send Reminder, Send Welcome Package, Defer Enrollment, Withdraw
- Row click → opens enrollment detail side panel

**Enrollment Detail Side Panel:**

- Personal info snapshot
- Enrollment checklist: Document Submission ✓, Tuition Deposit, Registration, Orientation RSVP, Housing Application (if applicable)
- Status update dropdown: Enroll, Defer, Withdraw (reason required for defer/withdraw)
- Notes (textarea)
- Communication history related to enrollment

**Data Bindings:**

- Funnel data: `GET /api/admissions/enrollment/funnel?intake={id}`
- Summary: `GET /api/admissions/enrollment/summary?intake={id}`
- Records: `GET /api/admissions/enrollment/records?intake={id}&status={status}&program={program}&search={q}`
- Update status: `PATCH /api/admissions/enrollment/{id}/status`
- Send reminder: `POST /api/admissions/enrollment/{id}/reminder`
- Send welcome: `POST /api/admissions/enrollment/{id}/welcome-package`

**States:**

| State                   | Behavior                                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| Loading                 | Funnel skeleton + cards shimmer + table skeleton                                          |
| Empty                   | "No enrollment data for this intake period."                                              |
| On track                | Green highlights, confetti if target met                                                  |
| Behind target           | Red highlights on funnel, warning banner: "Enrollment is {n} behind target for {Program}" |
| Deposit deadline passed | "Deposit deadline was {date}. {n} applicants have not deposited." warning                 |

### 3.9 Reports (`/admissions/reports`)

**Wireframe:** Reports dashboard with report type cards, date range selector, export options.

**Report Type Cards (Grid):**

- Conversion Funnel Report
- Application Sources Report
- Program Demand Report
- Interview Statistics Report
- Document Verification Report
- Enrollment vs Target Report
- Officer Performance Report
- Demographic Analysis Report

**Each Report Page:**

- Date range selector (presets: Last 30 Days, This Quarter, This Year, Custom)
- Intake Period filter
- Program filter
- Chart(s): Bar/Line/Pie/Donut (configurable using Recharts)
  - Hover tooltips showing exact values
  - Legend toggle
  - Download chart as PNG
- Data table below chart (sortable, pageable)
- Export buttons: Export CSV, Export PDF, Export Excel
- Schedule Report: "Send this report to my email every [Daily/Weekly/Monthly]"

**Conversion Funnel Report Specifics:**

- Stages: Applications Received → Screened → Reviewed → Interviewed → Offer Sent → Offer Accepted → Enrolled
- Waterfall chart showing drop-off at each stage
- Conversion rate per stage
- Comparison to previous period overlay
- Breakdown by Program (table)

**Application Sources Report:**

- Pie chart: Social Media, Referral, Website, Email Campaign, Partner Organization, Walk-in, Other
- Cost per acquisition per source (if cost data available)
- Trend line over time
- Source quality (conversion rate) table

**Officer Performance Report:**

- Per officer: Applications Reviewed, Average Review Time, Interviews Conducted, Offers Extended, Conversion Rate
- Bar chart comparing officers
- Table with sortable columns

**Data Bindings:**

- Report data: `GET /api/admissions/reports/{reportType}?startDate={iso}&endDate={iso}&intake={id}&program={id}`
- Scheduled report: `POST /api/admissions/reports/schedule`
- Export: `GET /api/admissions/reports/export/{reportType}?format=csv|pdf|xlsx`

**States:**

| State             | Behavior                                                             |
| ----------------- | -------------------------------------------------------------------- |
| Loading           | Chart skeleton (animated placeholder) + table skeleton               |
| Empty             | "No data available for the selected filters."                        |
| Large dataset     | Chart aggregates to monthly buckets, table paginated at 100 rows     |
| Export processing | "Generating export..." with progress bar, download prompt when ready |

## 4. Full Database Schema

```typescript
// ============================================================
// schema/admissions/index.ts — Drizzle ORM Schema
// ============================================================
import { sqliteTable, text, integer, real, uniqueIndex, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ─────────────────────────────────────────────
// 1. APPLICATIONS — Core applications table
// ─────────────────────────────────────────────
export const applications = sqliteTable("admissions_applications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  applicationNumber: text("application_number").notNull().unique(),
  // Personal Info
  firstName: text("first_name").notNull(),
  middleName: text("middle_name"),
  lastName: text("last_name").notNull(),
  dateOfBirth: text("date_of_birth").notNull(), // ISO 8601 date
  gender: text("gender", { enum: ["male", "female", "non-binary", "prefer-not-to-say", "other"] }),
  nationality: text("nationality"),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  currentAddress: text("current_address"),
  city: text("city"),
  state: text("state"),
  postalCode: text("postal_code"),
  country: text("country"),
  // Academic
  previousInstitutions: text("previous_institutions", { mode: "json" })
    .$type<PreviousInstitution[]>()
    .default([]),
  // Program
  primaryProgramId: text("primary_program_id")
    .notNull()
    .references(() => programs.id),
  secondaryProgramId: text("secondary_program_id").references(() => programs.id),
  intakePeriodId: text("intake_period_id")
    .notNull()
    .references(() => intakePeriods.id),
  applicationType: text("application_type", {
    enum: ["new", "transfer", "readmission", "international"],
  })
    .notNull()
    .default("new"),
  // Status & Workflow
  stage: text("stage", {
    enum: [
      "new",
      "screening",
      "review",
      "interview",
      "decision",
      "enrolled",
      "rejected",
      "withdrawn",
      "deferred",
    ],
  })
    .notNull()
    .default("new"),
  priority: text("priority", { enum: ["high", "medium", "low", "none"] }).default("none"),
  assignedToId: text("assigned_to_id").references(() => users.id),
  tags: text("tags", { mode: "json" }).$type<string[]>().default([]),
  source: text("source", {
    enum: ["social_media", "referral", "website", "email_campaign", "partner", "walk_in", "other"],
  }),
  sourceDetail: text("source_detail"), // campaign name, referrer name, etc.
  // Review Scores
  totalScore: integer("total_score"), // 0-100
  reviewDecision: text("review_decision", { enum: ["strong_admit", "admit", "waitlist", "deny"] }),
  reviewSubmittedAt: text("review_submitted_at"),
  reviewSubmittedById: text("review_submitted_by_id").references(() => users.id),
  // Communication
  lastContactedAt: text("last_contacted_at"),
  communicationCount: integer("communication_count").default(0),
  // Timestamps
  submittedAt: text("submitted_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
  isArchived: integer("is_archived", { mode: "boolean" }).default(false),
  archivedAt: text("archived_at"),
});

// ─────────────────────────────────────────────
// 2. APPLICATION DOCUMENTS
// ─────────────────────────────────────────────
export const applicationDocuments = sqliteTable("admissions_application_documents", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  applicationId: text("application_id")
    .notNull()
    .references(() => applications.id, { onDelete: "cascade" }),
  documentType: text("document_type", {
    enum: [
      "transcript",
      "diploma",
      "test_score",
      "recommendation_letter",
      "essay",
      "passport",
      "visa",
      "financial_statement",
      "medical_record",
      "other",
    ],
  }).notNull(),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(), // bytes
  mimeType: text("mime_type").notNull(),
  storageKey: text("storage_key").notNull(), // R2 object key
  verificationStatus: text("verification_status", {
    enum: ["pending", "verified", "rejected", "flagged"],
  })
    .notNull()
    .default("pending"),
  verifiedById: text("verified_by_id").references(() => users.id),
  verifiedAt: text("verified_at"),
  rejectionReason: text("rejection_reason"),
  flagNotes: text("flag_notes"),
  uploadedById: text("uploaded_by_id").references(() => users.id),
  uploadedAt: text("uploaded_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  pageCount: integer("page_count"),
  isArchived: integer("is_archived", { mode: "boolean" }).default(false),
});

// ─────────────────────────────────────────────
// 3. INTERVIEW SCHEDULES
// ─────────────────────────────────────────────
export const interviewSchedules = sqliteTable("admissions_interview_schedules", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  applicationId: text("application_id")
    .notNull()
    .references(() => applications.id, { onDelete: "cascade" })
    .unique(),
  interviewType: text("interview_type", {
    enum: ["in_person", "video_call", "phone_call"],
  }).notNull(),
  scheduledDate: text("scheduled_date").notNull(), // ISO 8601
  scheduledTime: text("scheduled_time").notNull(), // HH:mm
  timezone: text("timezone").notNull().default("UTC"),
  duration: integer("duration").notNull(), // minutes
  interviewerIds: text("interviewer_ids", { mode: "json" }).$type<string[]>().notNull(),
  location: text("location"), // physical location
  meetingLink: text("meeting_link"), // video call URL
  status: text("status", { enum: ["scheduled", "confirmed", "completed", "cancelled", "no_show"] })
    .notNull()
    .default("scheduled"),
  confirmationSent: integer("confirmation_sent", { mode: "boolean" }).default(false),
  confirmedAt: text("confirmed_at"),
  cancelledAt: text("cancelled_at"),
  cancellationReason: text("cancellation_reason"),
  // Feedback
  rating: integer("rating"), // 1-5
  strengths: text("strengths"),
  weaknesses: text("weaknesses"),
  recommendation: text("recommendation", { enum: ["strong_yes", "yes", "maybe", "no"] }),
  interviewerFeedback: text("interviewer_feedback"),
  completedById: text("completed_by_id").references(() => users.id),
  completedAt: text("completed_at"),
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 4. REVIEW RUBRICS
// ─────────────────────────────────────────────
export const reviewRubrics = sqliteTable("admissions_review_rubrics", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  applicationId: text("application_id")
    .notNull()
    .references(() => applications.id, { onDelete: "cascade" })
    .unique(),
  // Section scores
  academicScore: integer("academic_score"), // 0-40
  academicNotes: text("academic_notes"),
  extracurricularScore: integer("extracurricular_score"), // 0-20
  extracurricularNotes: text("extracurricular_notes"),
  essayScore: integer("essay_score"), // 0-20
  essayNotes: text("essay_notes"),
  recommendationScore: integer("recommendation_score"), // 0-10
  recommendationNotes: text("recommendation_notes"),
  interviewScore: integer("interview_score"), // 0-10
  interviewNotes: text("interview_notes"),
  // Computed
  totalScore: integer("total_score"), // 0-100, computed
  weightedScore: real("weighted_score"), // computed with weights
  // Decision
  recommendation: text("recommendation", { enum: ["strong_admit", "admit", "waitlist", "deny"] }),
  confidenceLevel: integer("confidence_level"), // 1-5
  internalNotes: text("internal_notes"),
  // Metadata
  reviewedById: text("reviewed_by_id").references(() => users.id),
  isDraft: integer("is_draft", { mode: "boolean" }).default(true),
  submittedAt: text("submitted_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 5. OFFER LETTERS
// ─────────────────────────────────────────────
export const offerLetters = sqliteTable("admissions_offer_letters", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  applicationId: text("application_id")
    .notNull()
    .references(() => applications.id, { onDelete: "cascade" }),
  templateId: text("template_id").references(() => communicationTemplates.id),
  // Offer details
  programId: text("program_id")
    .notNull()
    .references(() => programs.id),
  startDate: text("start_date").notNull(), // ISO date
  acceptanceDeadline: text("acceptance_deadline").notNull(), // ISO date
  scholarshipAwarded: integer("scholarship_awarded", { mode: "boolean" }).default(false),
  scholarshipAmount: real("scholarship_amount"),
  scholarshipName: text("scholarship_name"),
  customParagraph: text("custom_paragraph"),
  // Status
  status: text("status", { enum: ["draft", "generated", "sent", "accepted", "declined"] })
    .notNull()
    .default("draft"),
  sentAt: text("sent_at"),
  sentById: text("sent_by_id").references(() => users.id),
  respondedAt: text("responded_at"),
  response: text("response", { enum: ["accepted", "declined"] }),
  // File
  generatedPdfKey: text("generated_pdf_key"), // R2 key
  // Timestamps
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 6. REJECTION LETTERS
// ─────────────────────────────────────────────
export const rejectionLetters = sqliteTable("admissions_rejection_letters", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  applicationId: text("application_id")
    .notNull()
    .references(() => applications.id, { onDelete: "cascade" })
    .unique(),
  templateId: text("template_id").references(() => communicationTemplates.id),
  reasonCategory: text("reason_category", {
    enum: [
      "academic_requirements",
      "program_full",
      "competitive_pool",
      "incomplete_application",
      "other",
    ],
  }).notNull(),
  customMessage: text("custom_message"),
  status: text("status", { enum: ["draft", "sent"] })
    .notNull()
    .default("draft"),
  sentAt: text("sent_at"),
  sentById: text("sent_by_id").references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 7. COMMUNICATION LOG
// ─────────────────────────────────────────────
export const communicationLog = sqliteTable("admissions_communication_log", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  applicationId: text("application_id").references(() => applications.id, { onDelete: "set null" }),
  type: text("type", {
    enum: ["email", "sms", "offer_letter", "rejection_letter", "system_notification"],
  }).notNull(),
  direction: text("direction", { enum: ["outbound", "inbound"] }).notNull(),
  subject: text("subject"),
  body: text("body"),
  senderId: text("sender_id").references(() => users.id),
  recipientEmail: text("recipient_email"),
  recipientPhone: text("recipient_phone"),
  status: text("status", { enum: ["draft", "sent", "delivered", "failed", "opened", "clicked"] })
    .notNull()
    .default("sent"),
  templateId: text("template_id").references(() => communicationTemplates.id),
  externalMessageId: text("external_message_id"), // SES/SendGrid message ID
  trackingOpened: integer("tracking_opened", { mode: "boolean" }).default(false),
  trackingOpenedAt: text("tracking_opened_at"),
  trackingClicked: integer("tracking_clicked", { mode: "boolean" }).default(false),
  trackingClickedAt: text("tracking_clicked_at"),
  errorMessage: text("error_message"),
  scheduledSendAt: text("scheduled_send_at"),
  sentAt: text("sent_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 8. COMMUNICATION TEMPLATES
// ─────────────────────────────────────────────
export const communicationTemplates = sqliteTable("admissions_communication_templates", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  type: text("type", { enum: ["email", "sms", "offer_letter", "rejection_letter"] }).notNull(),
  subject: text("subject"), // for email/offer
  body: text("body").notNull(), // HTML with {{variable}} placeholders
  variables: text("variables", { mode: "json" }).$type<string[]>().default([]), // list of expected vars
  category: text("category", {
    enum: ["general", "offer", "rejection", "reminder", "follow_up", "other"],
  }).default("general"),
  isDefault: integer("is_default", { mode: "boolean" }).default(false),
  createdById: text("created_by_id").references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
  isArchived: integer("is_archived", { mode: "boolean" }).default(false),
});

// ─────────────────────────────────────────────
// 9. ENROLLMENT TRACKER
// ─────────────────────────────────────────────
export const enrollmentTracker = sqliteTable("admissions_enrollment_tracker", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  applicationId: text("application_id")
    .notNull()
    .references(() => applications.id, { onDelete: "cascade" })
    .unique(),
  intakePeriodId: text("intake_period_id")
    .notNull()
    .references(() => intakePeriods.id),
  // Status
  enrollmentStatus: text("enrollment_status", {
    enum: [
      "not_started",
      "documents_pending",
      "deposit_pending",
      "deposit_received",
      "enrolled",
      "deferred",
      "withdrawn",
    ],
  })
    .notNull()
    .default("not_started"),
  // Checklist
  documentsSubmitted: integer("documents_submitted", { mode: "boolean" }).default(false),
  documentsSubmittedAt: text("documents_submitted_at"),
  tuitionDepositReceived: integer("tuition_deposit_received", { mode: "boolean" }).default(false),
  tuitionDepositReceivedAt: text("tuition_deposit_received_at"),
  tuitionDepositAmount: real("tuition_deposit_amount"),
  registrationCompleted: integer("registration_completed", { mode: "boolean" }).default(false),
  registrationCompletedAt: text("registration_completed_at"),
  orientationRsvp: text("orientation_rsvp", {
    enum: ["not_sent", "sent", "confirmed", "declined"],
  }).default("not_sent"),
  orientationRsvpAt: text("orientation_rsvp_at"),
  housingApplied: integer("housing_applied", { mode: "boolean" }).default(false),
  // Deferral
  deferredToIntakeId: text("deferred_to_intake_id").references(() => intakePeriods.id),
  deferralReason: text("deferral_reason"),
  deferralApprovedById: text("deferral_approved_by_id").references(() => users.id),
  // Withdrawal
  withdrawalReason: text("withdrawal_reason"),
  withdrawalApprovedById: text("withdrawal_approved_by_id").references(() => users.id),
  // Welcome package
  welcomePackageSent: integer("welcome_package_sent", { mode: "boolean" }).default(false),
  welcomePackageSentAt: text("welcome_package_sent_at"),
  // Notes
  notes: text("notes"),
  // Timestamps
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 10. INTAKE PERIODS
// ─────────────────────────────────────────────
export const intakePeriods = sqliteTable("admissions_intake_periods", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(), // e.g., "Fall 2026"
  code: text("code").notNull().unique(), // e.g., "F2026"
  startDate: text("start_date").notNull(), // ISO date
  endDate: text("end_date").notNull(),
  applicationDeadline: text("application_deadline").notNull(),
  depositDeadline: text("deposit_deadline"),
  enrollmentTarget: integer("enrollment_target").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdById: text("created_by_id").references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 11. PROGRAMS
// ─────────────────────────────────────────────
export const programs = sqliteTable("admissions_programs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  department: text("department"),
  degreeLevel: text("degree_level", {
    enum: ["certificate", "associate", "bachelor", "master", "doctorate", "diploma"],
  }).notNull(),
  durationYears: integer("duration_years").notNull(),
  description: text("description"),
  requirements: text("requirements", { mode: "json" }).$type<ProgramRequirement[]>().default([]),
  requiredDocuments: text("required_documents", { mode: "json" }).$type<string[]>().default([]),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 12. APPLICATION NOTES
// ─────────────────────────────────────────────
export const applicationNotes = sqliteTable("admissions_application_notes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  applicationId: text("application_id")
    .notNull()
    .references(() => applications.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  isPinned: integer("is_pinned", { mode: "boolean" }).default(false),
  createdById: text("created_by_id").references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 13. ACTIVITY LOG
// ─────────────────────────────────────────────
export const activityLog = sqliteTable("admissions_activity_log", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  applicationId: text("application_id").references(() => applications.id, { onDelete: "cascade" }),
  actorId: text("actor_id").references(() => users.id),
  actorName: text("actor_name").notNull(),
  action: text("action").notNull(), // e.g., "application.created", "application.stage_changed", "document.verified"
  entityType: text("entity_type"), // "application", "document", "interview", etc.
  entityId: text("entity_id"),
  details: text("details", { mode: "json" }).$type<Record<string, unknown>>(),
  oldValue: text("old_value"),
  newValue: text("new_value"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// Indexes
// ─────────────────────────────────────────────
export const applicationsStageIdx = index("idx_applications_stage").on(applications.stage);
export const applicationsAssignedIdx = index("idx_applications_assigned").on(
  applications.assignedToId,
);
export const applicationsIntakeIdx = index("idx_applications_intake").on(
  applications.intakePeriodId,
);
export const applicationsEmailIdx = index("idx_applications_email").on(applications.email);
export const applicationsNumberIdx = uniqueIndex("idx_applications_number").on(
  applications.applicationNumber,
);
export const documentsApplicationIdx = index("idx_documents_application").on(
  applicationDocuments.applicationId,
);
export const documentsStatusIdx = index("idx_documents_status").on(
  applicationDocuments.verificationStatus,
);
export const interviewsApplicationIdx = uniqueIndex("idx_interviews_application").on(
  interviewSchedules.applicationId,
);
export const interviewsDateIdx = index("idx_interviews_date").on(interviewSchedules.scheduledDate);
export const enrollmentIntakeIdx = index("idx_enrollment_intake").on(
  enrollmentTracker.intakePeriodId,
);
export const enrollmentStatusIdx = index("idx_enrollment_status").on(
  enrollmentTracker.enrollmentStatus,
);
export const activityApplicationIdx = index("idx_activity_application").on(
  activityLog.applicationId,
);
export const activityCreatedIdx = index("idx_activity_created").on(activityLog.createdAt);
export const commLogApplicationIdx = index("idx_comm_log_application").on(
  communicationLog.applicationId,
);
export const commLogStatusIdx = index("idx_comm_log_status").on(communicationLog.status);

// ─────────────────────────────────────────────
// TypeScript Types for JSON columns
// ─────────────────────────────────────────────
export interface PreviousInstitution {
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  gpa: number;
  gpaScale: number; // 4.0 or 5.0
  startDate: string; // ISO date
  endDate?: string; // ISO date
  attended: boolean;
  isCurrent: boolean;
}

export interface ProgramRequirement {
  name: string;
  type: "document" | "test_score" | "minimum_gpa" | "prerequisite_course" | "other";
  description: string;
  isRequired: boolean;
  minimumValue?: string | number;
}
```

## 5. Complete API Contract

### 5.1 Dashboard Endpoints

#### `GET /api/admissions/dashboard/summary`

**Auth:** `admissions_staff` or `admissions_director`

**Response `200`:**

```typescript
interface DashboardSummaryResponse {
  totalApplications: number;
  totalApplicationsChange: number; // percentage vs last period
  pendingReview: number;
  pendingReviewChange: number;
  interviewsToday: number;
  interviewsThisWeek: number;
  enrolledThisMonth: number;
  enrolledTarget: number;
  enrolledPercentage: number;
  conversionRate: number; // percentage
  averageReviewTime: number; // hours
}
```

#### `GET /api/admissions/dashboard/pipeline`

**Query:**

```typescript
interface PipelineQuery {
  intakeId?: string;
}
```

**Response `200`:**

```typescript
interface PipelineResponse {
  stages: {
    stage: string;
    count: number;
    limit: number; // column card limit
  }[];
}
```

#### `GET /api/admissions/dashboard/activity`

**Query:**

```typescript
interface ActivityQuery {
  limit?: number; // default 20
  offset?: number; // default 0
  actions?: string[]; // filter by action types
}
```

**Response `200`:**

```typescript
interface ActivityResponse {
  items: ActivityItem[];
  total: number;
  hasMore: boolean;
}

interface ActivityItem {
  id: string;
  actorName: string;
  actorAvatar?: string;
  action: string;
  actionLabel: string; // human-readable
  entityType: string;
  entityId: string;
  entityLabel: string;
  applicationId?: string;
  details?: Record<string, unknown>;
  createdAt: string; // ISO
}
```

### 5.2 Applications CRUD

#### `GET /api/admissions/applications`

**Query:**

```typescript
interface ApplicationsListQuery {
  stage?: string | string[];
  program?: string | string[];
  intakeId?: string;
  priority?: string;
  assignedTo?: string;
  search?: string;
  dateFrom?: string; // ISO
  dateTo?: string;
  limit?: number;
  offset?: number;
}
```

**Response `200`:**

```typescript
type ApplicationsListResponse = ApplicationCard[];
// Paginated via Link header
interface ApplicationCard {
  id: string;
  applicationNumber: string;
  fullName: string;
  email: string;
  program: { id: string; name: string };
  stage: string;
  priority: string;
  submittedAt: string;
  assignedTo?: { id: string; name: string };
  hasDocuments: boolean;
  hasInterviewScheduled: boolean;
  totalScore?: number;
}
```

#### `GET /api/admissions/applications/{id}`

**Response `200`:**

```typescript
interface ApplicationDetailResponse {
  id: string;
  applicationNumber: string;
  // Personal
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender?: string;
  nationality?: string;
  phone: string;
  email: string;
  currentAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  // Academic
  previousInstitutions: PreviousInstitution[];
  // Program
  primaryProgram: { id: string; name: string; code: string };
  secondaryProgram?: { id: string; name: string; code: string };
  intakePeriod: { id: string; name: string };
  applicationType: string;
  // Workflow
  stage: string;
  priority: string;
  assignedTo?: { id: string; name: string; email: string };
  tags: string[];
  source?: string;
  sourceDetail?: string;
  // Review
  totalScore?: number;
  reviewDecision?: string;
  reviewSubmittedAt?: string;
  reviewSubmittedBy?: { id: string; name: string };
  // Stats
  submittedAt: string;
  lastContactedAt?: string;
  communicationCount: number;
  createdAt: string;
  updatedAt: string;
}
```

**Error `404`:**

```typescript
{ error: "not_found", message: "Application not found" }
```

#### `POST /api/admissions/applications`

**Request:**

```typescript
interface CreateApplicationRequest {
  firstName: string; // min 1, max 100
  middleName?: string; // max 100
  lastName: string; // min 1, max 100
  dateOfBirth: string; // ISO date, must be >= 15 years ago
  gender?: string;
  nationality?: string;
  phone: string; // E.164 format validation
  email: string; // valid email, unique check
  currentAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  previousInstitutions?: PreviousInstitution[];
  primaryProgramId: string; // must exist and be active
  secondaryProgramId?: string;
  intakePeriodId: string; // must exist and be active
  applicationType: string;
  source?: string;
  sourceDetail?: string;
}
```

**Response `201`:**

```typescript
{
  id: string;
  applicationNumber: string;
}
```

**Error `400`:**

```typescript
{ error: "validation_error", message: "Validation failed", fields: { email: "Email already exists in system" } }
```

#### `PATCH /api/admissions/applications/{id}`

**Request:**

```typescript
interface UpdateApplicationRequest {
  // All fields optional, only provided fields updated
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  currentAddress?: string;
  // ... etc
  stage?: string; // with transition validation
  priority?: string;
  assignedToId?: string;
  tags?: string[];
  // ...
}
```

**Response `200:**

```typescript
{
  success: true;
}
```

#### `PATCH /api/admissions/applications/{id}/stage`

**Request:**

```typescript
interface StageChangeRequest {
  stage: string;
  reason?: string; // required for reject, withdraw, defer
}
```

**Response `200:**

```typescript
{
  success: true;
  previousStage: string;
  newStage: string;
}
```

**Error `422:**

```typescript
{ error: "invalid_transition", message: "Cannot transition from 'new' to 'enrolled'", allowedTransitions: ["screening", "rejected", "withdrawn"] }
```

#### `DELETE /api/admissions/applications/{id}`

**Auth:** `admissions_director` only  
**Response `204`:**
**Error `403:**

```typescript
{ error: "forbidden", message: "Only admissions directors can delete applications" }
```

### 5.3 Documents Endpoints

#### `GET /api/admissions/applications/{appId}/documents`

**Response `200`:**

```typescript
interface DocumentsListResponse {
  items: DocumentItem[];
  total: number;
  verifiedCount: number;
  pendingCount: number;
}

interface DocumentItem {
  id: string;
  documentType: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  verificationStatus: string;
  verifiedBy?: { id: string; name: string };
  verifiedAt?: string;
  uploadedBy: { id: string; name: string };
  uploadedAt: string;
  pageCount?: number;
}
```

#### `POST /api/admissions/applications/{appId}/documents`

**Request:** `multipart/form-data`

- `file`: File (max 25MB, allowed types: PDF, PNG, JPG, DOC, DOCX)
- `documentType`: string

**Response `201:**

```typescript
{
  id: string;
  fileName: string;
}
```

**Error `413:**

```typescript
{ error: "file_too_large", message: "File exceeds maximum size of 25MB", maxSize: 26214400 }
```

#### `PATCH /api/admissions/documents/{id}/verify`

**Response `200:**

```typescript
{
  success: true;
  status: "verified";
  verifiedById: string;
  verifiedAt: string;
}
```

#### `PATCH /api/admissions/documents/{id}/reject`

**Request:**

```typescript
{ reason: string; comment?: string; }
```

**Response `200:**

```typescript
{
  success: true;
  status: "rejected";
}
```

#### `GET /api/admissions/documents/{id}/download`

**Response `302`** — Redirects to presigned R2 URL (expires in 60 seconds)

### 5.4 Interview Endpoints

#### `GET /api/admissions/interviews`

**Query:**

```typescript
{ start: string; end: string; status?: string; interviewerId?: string; }
```

**Response `200:**

```typescript
interface InterviewsCalendarResponse {
  items: InterviewCalendarItem[];
}

interface InterviewCalendarItem {
  id: string;
  applicationId: string;
  applicantName: string;
  interviewType: string;
  scheduledDate: string;
  scheduledTime: string;
  timezone: string;
  duration: number;
  interviewerIds: string[];
  interviewers: { id: string; name: string }[];
  status: string;
  location?: string;
  meetingLink?: string;
}
```

#### `POST /api/admissions/interviews`

**Request:**

```typescript
interface CreateInterviewRequest {
  applicationId: string;
  interviewType: string;
  scheduledDate: string; // ISO date
  scheduledTime: string; // HH:mm
  timezone: string;
  duration: number; // 30|45|60|90
  interviewerIds: string[];
  location?: string;
  meetingLink?: string;
  sendConfirmation: boolean;
  notes?: string;
}
```

**Response `201:**

```typescript
{
  id: string;
}
```

**Error `409:**

```typescript
{ error: "conflict", message: "Time slot conflicts with existing interview", conflictingInterviews: [...ids] }
```

#### `POST /api/admissions/interviews/{id}/cancel`

**Request:**

```typescript
{
  reason: string;
  notifyApplicant: boolean;
}
```

**Response `200:**

```typescript
{
  success: true;
}
```

#### `POST /api/admissions/interviews/{id}/complete`

**Request:**

```typescript
interface InterviewCompleteRequest {
  rating: number; // 1-5
  strengths?: string;
  weaknesses?: string;
  recommendation: string; // strong_yes|yes|maybe|no
  feedback?: string;
}
```

**Response `200:**

```typescript
{
  success: true;
}
```

### 5.5 Communication Endpoints

#### `GET /api/admissions/communication`

**Query:**

```typescript
{ folder: string; limit: number; offset: number; type?: string; status?: string; }
```

**Response `200:**

```typescript
interface CommunicationListResponse {
  items: CommunicationItem[];
  total: number;
  hasMore: boolean;
}
```

#### `POST /api/admissions/communication/email`

**Request:**

```typescript
interface SendEmailRequest {
  applicationId?: string;
  to: string; // email
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string; // HTML
  attachments?: string[]; // document IDs
  templateId?: string;
  scheduledSendAt?: string;
  saveAsDraft: boolean;
}
```

**Response `201:**

```typescript
{
  id: string;
  status: "sent" | "draft" | "scheduled";
}
```

#### `POST /api/admissions/communication/offer-letter`

**Request:**

```typescript
interface GenerateOfferLetterRequest {
  applicationId: string;
  templateId: string;
  startDate: string;
  acceptanceDeadline: string;
  scholarshipAwarded: boolean;
  scholarshipAmount?: number;
  scholarshipName?: string;
  customParagraph?: string;
  sendNow: boolean; // false = generate only
}
```

**Response `201:**

```typescript
{ id: string; status: "generated" | "sent"; pdfUrl?: string; }
```

### 5.6 Enrollment Endpoints

#### `GET /api/admissions/enrollment/funnel`

**Query:**

```typescript
{
  intakeId: string;
}
```

**Response `200:**

```typescript
interface FunnelResponse {
  stages: {
    name: string;
    count: number;
    target: number;
    conversionRate: number; // percentage from previous stage
  }[];
}
```

#### `PATCH /api/admissions/enrollment/{id}/status`

**Request:**

```typescript
interface UpdateEnrollmentStatusRequest {
  status: string; // enrolled|deferred|withdrawn
  reason?: string; // required for deferred, withdrawn
  deferredToIntakeId?: string; // for deferred
}
```

**Response `200:**

```typescript
{
  success: true;
}
```

### 5.7 Reports Endpoints

#### `GET /api/admissions/reports/{reportType}`

**Query:**

```typescript
{ startDate: string; endDate: string; intakeId?: string; programId?: string; }
```

**Response `200:**

```typescript
// Depends on report type
type ReportResponse =
  | ConversionFunnelReport
  | ApplicationSourcesReport
  | ProgramDemandReport
  | InterviewStatisticsReport
  | DocumentVerificationReport
  | EnrollmentVsTargetReport
  | OfficerPerformanceReport
  | DemographicAnalysisReport;
```

### Error Codes (All Endpoints)

| HTTP Status | Code                 | Description                                    |
| ----------- | -------------------- | ---------------------------------------------- |
| 400         | `validation_error`   | Request body validation failed                 |
| 401         | `unauthenticated`    | Missing or invalid auth token                  |
| 403         | `forbidden`          | Insufficient permissions                       |
| 404         | `not_found`          | Resource not found                             |
| 409         | `conflict`           | Resource conflict (e.g., duplicate, time slot) |
| 413         | `file_too_large`     | Upload exceeds size limit                      |
| 422         | `invalid_transition` | Invalid stage transition                       |
| 429         | `rate_limited`       | Too many requests                              |
| 500         | `internal_error`     | Server error                                   |

## 6. Component Tree

```
<AdmissionsLayout>                         // Layout with sidebar navigation
  ├── <AdmissionsHub />                    // /admissions
  │   ├── <SummaryCardGrid>
  │   │   ├── <SummaryCard icon="clipboard-list" title="Total Applications" bind={totalApplications} change={...} />
  │   │   ├── <SummaryCard icon="clock" title="Pending Review" bind={pendingReview} color={statusColor} />
  │   │   ├── <SummaryCard icon="calendar" title="Interviews Today" bind={interviewsToday} subtitle={`${interviewsThisWeek} this week`} />
  │   │   └── <SummaryCard icon="graduation-cap" title="Enrolled This Month" bind={enrolledThisMonth} progress={percentage} />
  │   ├── <PipelineHealthWidget stages={pipelineStages} />
  │   ├── <ActivityFeed items={activities} hasMore={hasMore} onLoadMore={...} />
  │   └── <QuickActionsToolbar>
  │       ├── <NewApplicationButton onClick={openCreateModal} />
  │       ├── <ImportButton onClick={openImportModal} />
  │       ├── <ReportsButton href="/admissions/reports" />
  │       └── <SettingsButton onClick={openSettings} />
  │
  ├── <ApplicationsPipeline />             // /admissions/applications
  │   ├── <PipelineFilters>
  │   │   ├── <SearchInput />
  │   │   ├── <StageFilter />
  │   │   ├── <ProgramFilter />
  │   │   ├── <IntakeFilter />
  │   │   ├── <PriorityFilter />
  │   │   ├── <AssigneeFilter />
  │   │   └── <DateRangeFilter />
  │   ├── <ViewToggle activeView={kanban|list|table} />
  │   ├── <KanbanView>
  │   │   └── <KanbanColumn *ngFor>
  │   │       ├── <ColumnHeader name={stage} count={count} onCollapse={...} />
  │   │       └── <DraggableCard *ngFor>
  │   │           ├── <ApplicantAvatar />
  │   │           ├── <CardBody name, program, submittedAt, priority />
  │   │           └── <AttachmentIndicator />
  │   ├── <ListView> (alternative view)
  │   │   └── <DataTable columns={...} data={...} sortable />
  │   └── <BulkActionsToolbar />
  │
  ├── <ApplicationDetail />                // /admissions/applications/{id}
  │   ├── <ApplicationSidebar>
  │   │   ├── <ApplicationIdBadge />
  │   │   ├── <StageStepper />
  │   │   └── <QuickLinks />
  │   ├── <OverviewTab>
  │   │   ├── <PersonalInfoSection>
  │   │   │   └── <InlineEditableField *ngFor />
  │   │   ├── <AcademicHistorySection>
  │   │   │   ├── <InstitutionTable />
  │   │   │   └── <AddInstitutionButton />
  │   │   ├── <ProgramSelectionSection />
  │   │   ├── <DocumentsChecklist>
  │   │   │   ├── <ProgressBar />
  │   │   │   └── <DocumentStatusItem *ngFor />
  │   │   └── <TestScoresSection />
  │   ├── <DocumentsTab>
  │   │   ├── <DocumentViewer />
  │   │   ├── <DocumentUploadDropzone />
  │   │   └── <DocumentActionButtons />
  │   ├── <InterviewTab>
  │   │   ├── <InterviewStatusBadge />
  │   │   ├── <ScheduleInterviewForm />
  │   │   ├── <InterviewFeedbackForm />
  │   │   └── <RescheduleCancelButtons />
  │   ├── <CommunicationTab>
  │   │   ├── <EmailComposer />
  │   │   ├── <SmsComposer />
  │   │   ├── <TemplateSelector />
  │   │   ├── <MessageHistoryTable />
  │   │   ├── <OfferLetterGenerator />
  │   │   └── <RejectionLetterGenerator />
  │   ├── <HistoryTab>
  │   │   ├── <AuditLogTable />
  │   │   └── <AuditLogFilters />
  │   └── <ActionPanel>
  │       ├── <StatusActionsDropdown />
  │       ├── <PrioritySelector />
  │       ├── <AssigneeModal />
  │       ├── <TagsMultiSelect />
  │       └── <NotesWidget>
  │           └── <StickyNote *ngFor />
  │
  ├── <ReviewPipeline />                   // /admissions/review
  │   ├── <ReviewQueue>
  │   │   ├── <QueueFilters />
  │   │   ├── <QueueItem *ngFor />
  │   │   └── <AutoRefreshToggle />
  │   └── <ReviewWorkspace>
  │       ├── <ApplicationSnapshot />
  │       ├── <ScoringRubric>
  │       │   ├── <ScoreSection *ngFor (academic, extracurricular, etc.) />
  │       │   ├── <TotalScoreDisplay />
  │       │   └── <WeightedScoreDisplay />
  │       └── <RecommendationSection>
  │           ├── <DecisionSelector />
  │           ├── <ConfidenceSlider />
  │           └── <InternalNotesEditor />
  │
  ├── <InterviewScheduler />               // /admissions/interviews
  │   ├── <CalendarView>
  │   │   ├── <CalendarHeader />
  │   │   ├── <CalendarGrid month|week />
  │   │   └── <CalendarEvent *ngFor />
  │   ├── <InterviewSidebar>
  │   │   ├── <PendingList />
  │   │   ├── <TodayList />
  │   │   └── <QuickStats />
  │   ├── <ScheduleInterviewModal />
  │   └── <InterviewDetailModal />
  │
  ├── <DocumentVerification />             // /admissions/documents
  │   ├── <DocumentQueue>
  │   │   ├── <FilterTabs />
  │   │   ├── <SearchInput />
  │   │   └── <DocumentQueueItem *ngFor />
  │   └── <VerificationWorkspace>
  │       ├── <DocumentPreview />
  │       ├── <DocumentMetadataPanel />
  │       ├── <VerificationActions />
  │       └── <VerificationHistory />
  │
  ├── <CommunicationCenter />              // /admissions/communication
  │   ├── <FolderSidebar />
  │   ├── <MessageList />
  │   ├── <MessageDetail />
  │   ├── <EmailComposer />
  │   ├── <SmsComposer />
  │   ├── <OfferLetterGeneratorPanel />
  │   └── <RejectionLetterGeneratorPanel />
  │
  ├── <EnrollmentTracker />                // /admissions/enrollment
  │   ├── <EnrollmentFunnel />
  │   ├── <IntakeSelector />
  │   ├── <EnrollmentSummaryCards />
  │   └── <EnrollmentRecordsTable>
  │       └── <EnrollmentDetailPanel />
  │
  └── <ReportsOverview />                  // /admissions/reports
      ├── <ReportCardGrid>
      │   └── <ReportCard *ngFor />
      ├── <ReportDetail>
      │   ├── <ReportFilters />
      │   ├── <Chart />
      │   ├── <DataTable />
      │   └── <ExportActions />
      └── <ScheduleReportModal />
```

## 7. Exhaustive User Journeys

### Journey 1: New Application Intake

1. **AO** logs in → redirected to `/admissions` (Admissions Hub)
2. **AO** clicks "➕ New Application"
3. System shows `CreateApplicationModal` with `ApplicationForm`
4. **AO** fills in personal info section:
   - First Name: required, validated for alphabetic only
   - Last Name: required
   - Email: required, validates format, checks uniqueness via debounced API call
   - Phone: required, E.164 format, country code auto-detected from IP
   - If email exists → show warning: "An application already exists for this email. [View Existing]"
5. **AO** fills academic history:
   - Clicks "➕ Add Institution"
   - Fills: Institution Name (required), Degree (required), Field of Study (required), GPA (0.00-4.00), Dates
   - Can add multiple institutions; can mark "Currently Attending"
6. **AO** selects program:
   - Primary Program: dropdown loaded from `GET /api/programs?isActive=true`
   - Intake Period: dropdown of active periods
   - Application Type: radio group
7. **AO** clicks "Submit"
8. System validates all required fields → shows inline errors for missing fields
9. On success → `POST /api/admissions/applications` → returns `{id, applicationNumber}`
10. System shows success toast: "Application APP-2026-0042 created successfully"
11. Modal closes, application appears in kanban "New" column
12. System triggers notification: applicant receives "Application Received" email (via `POST /api/communication/email`)

**Error Recovery:**

- Network failure: "Unable to save application. [Retry]" — form state preserved, auto-saves to localStorage
- Validation error: Inline error messages on specific fields
- Duplicate email: Warning with link to existing application

### Journey 2: Document Verification Flow

1. **AO** navigates to `/admissions/documents`
2. System loads pending documents: `GET /api/admissions/documents?status=pending`
3. **AO** clicks on first document in queue
4. Right panel loads document preview and metadata
5. **AO** reviews document:
   - Zooms in/out using toolbar
   - Rotates if needed
   - Compares to checklist requirements
6. **AO** clicks "✅ Verify"
7. System shows confirmation dialog: "Verify this document as authentic?"
8. **AO** confirms → `POST /api/admissions/documents/{id}/verify`
9. System updates status to "verified", logs action in activity log
10. Checklist on application overview updates progress
11. Auto-advances to next pending document in queue
12. If all documents now verified → system auto-updates enrollment tracker:
    - `enrollmentTracker.documentsSubmitted = true`
    - Sends notification: "All documents verified for APP-{number}"

**Branching:**

- If document appears fraudulent → **AO** clicks "🚩 Flag" → enters notes → document flagged, supervisor notified
- If document is incorrect type → **AO** clicks "❌ Reject" → selects reason → applicant notified via email with instructions to re-upload
- If applicant uploaded wrong document → reject with reason "Incorrect Document Type"

### Journey 3: Interview Lifecycle

1. **AO** reviews application → scores 85+ → recommendation "Admit" → submits review
2. Application moves to "Interview" stage
3. **AO** navigates to `/admissions/interviews`
4. **AO** clicks "Schedule Interview"
5. Modal opens:
   - Searches for applicant by ID (auto-filled from context)
   - Selects "Video Call" type
   - Date picker: selects next Tuesday
   - Time slots: shows available slots (calculated from interviewer availability)
   - Selects 45 min duration
   - Selects 2 interviewers from staff list
   - Pastes Zoom link
   - Checks "Send Confirmation"
6. Clicks "Schedule" → `POST /api/admissions/interviews`
7. System checks for time conflicts → none found → creates interview record
8. Confirmation email sent to applicant with meeting link and calendar attachment (.ics)
9. Interview appears on calendar as yellow (pending confirmation)
10. Applicant confirms → status → "confirmed", turns green
11. Day of interview:
    - System sends reminder 24h before (automated via Cron/Queue)
    - System sends reminder 1h before
12. After interview, **AO** opens interview details → clicks "Mark Complete"
13. **AO** fills feedback form: rating 4/5, strengths, weaknesses, recommendation "Strong Yes"
14. Submits → `POST /api/admissions/interviews/{id}/complete`
15. Application moves to "Decision" stage
16. Score updated with interview score

**Error Recovery:**

- Time conflict: Error shown with conflicting interviewer names/times
- Applicant no-show: Mark "No-Show" → application returns to "Interview" stage → reschedule required
- Interviewer unavailable last minute: AO can reassign or cancel

### Journey 4: Offer Letter Generation and Send

1. **AO** is on Application Detail → Communication tab
2. **AO** clicks "Offer Letter Generator"
3. Selects template "Standard Offer with Scholarship"
4. System pre-fields: Applicant Name, Program
5. **AO** sets: Start Date (Sep 1, 2026), Acceptance Deadline (Aug 1, 2026)
6. **AO** toggles "Scholarship Awarded" → Yes → enters amount "$10,000", name "Merit Scholarship"
7. **AO** adds custom paragraph: "We were impressed by your extracurricular achievements..."
8. Clicks "Preview" → system generates PDF preview (using Puppeteer/PDF generation service)
9. Preview shown in modal/iframe
10. **AO** clicks "Send Offer Letter"
11. System: `POST /api/admissions/communication/offer-letter` with `sendNow: true`
12. Offer letter PDF generated and stored in R2
13. Email sent to applicant with PDF attachment
14. SMS sent: "Congratulations! Your offer letter from Cyber Elias Academy has been sent to your email."
15. Offer letter status → "sent"
16. Application stage → "decision"
17. Enrollment tracker created with status "not_started"
18. Activity logged

**Branching:**

- If "Save as Draft" → status = "draft", can return to edit later
- If applicant accepts → `PATCH /api/admissions/applications/{id}/stage` to "enrolled"
- If applicant declines → stage to "rejected" with reason "applicant_declined"

### Journey 5: Enrollment Confirmation

1. Applicant accepts offer → system handles acceptance webhook/email reply
2. **AO** sees notification on dashboard: "APP-0042 — Offer Accepted"
3. **AO** navigates to `/admissions/enrollment`
4. Finds applicant in funnel at "Offers Accepted → Offers Sent" stage
5. Opens enrollment detail side panel
6. Sees checklist: Documents ❌, Deposit ❌, Registration ❌, Orientation ❌
7. **AO** monitors over time:
   - Documents submitted → checklist updates automatically
   - Deposit received → finance system webhook → enrollment tracker updated
   - Once deposit received → **AO** clicks "Send Welcome Package"
   - Registration completed → system confirms
   - Orientation RSVP → AO can send manual reminder if needed
8. When all checklist items complete → **AO** updates status to "Enrolled"
9. System sends "Welcome to Cyber Elias Academy!" email with next steps
10. Student account created in student management system (via integration)
11. Enrollment count incremented on intake target

### Journey 6: Application Rejection Flow

1. **AO** reviews application → determines not suitable
2. **AO** selects recommendation "Deny"
3. System shows warning: "Deny recommendation will require Director approval"
4. **AO** submits → review submitted with "deny" + confidence level
5. System routes to Director's approval queue
6. Director approves → application moves to "Rejected" stage automatically
7. **AO** notified: "Director approved denial for APP-0042"
8. **AO** navigates to Communication tab → Rejection Letter Generator
9. Selects template "Standard Rejection"
10. Selects reason "Competitive Pool"
11. Adds custom message: "We received a record number of applications this year..."
12. Clicks "Generate & Send"
13. Rejection letter sent to applicant
14. Activity logged with full audit trail

## 8. Business Rules Engine

### Rule Set 1: Application Stage Transitions

| From      | To        | Allowed                           | Conditions                                                 |
| --------- | --------- | --------------------------------- | ---------------------------------------------------------- |
| new       | screening | Always                            | Auto-assigned if intake is active                          |
| new       | rejected  | Director only                     | Requires reason                                            |
| new       | withdrawn | Applicant action                  | Via portal                                                 |
| screening | review    | Must have ≥1 document verified    | Auto-assign reviewer                                       |
| screening | new       | Incomplete application            | Requires reason                                            |
| review    | interview | Review submitted + score ≥ 50     | Auto-schedule reminder                                     |
| review    | decision  | Review submitted                  | If score < 50, auto-route to director                      |
| review    | screening | Request additional info           | Requires AO action                                         |
| interview | decision  | Interview completed               | Auto-calculate weighted score                              |
| interview | review    | No-show                           | Requires reschedule within 5 days                          |
| decision  | enrolled  | Offer accepted                    | System or AO action                                        |
| decision  | rejected  | Offer declined OR director denial | Logs reason                                                |
| enrolled  | deferred  | AO action                         | Reason required, director approval needed if >10% of class |
| enrolled  | withdrawn | AO or applicant                   | Reason required                                            |
| rejected  | any       | Never                             | Immutable (except sysadmin override)                       |

### Rule Set 2: Auto-Assignment Logic

1. New applications in "new" stage auto-assigned to AO with fewest active applications (round-robin)
2. Applications returning to "screening" (incomplete) re-assigned to original AO
3. Director override: any AO can be manually assigned regardless of load

### Rule Set 3: Score Calculation

```
Total Raw Score = academicScore + extracurricularScore + essayScore + recommendationScore + interviewScore
Max Raw Score = 100

Weighted Score = (
  (academicScore * 0.35) +
  (extracurricularScore * 0.20) +
  (essayScore * 0.25) +
  (recommendationScore * 0.10) +
  (interviewScore * 0.10)
) / 1.0 * 100

Score Color:
  >= 90: Green (Excellent)
  >= 75: Yellow (Good)
  < 75: Red (Needs Improvement)
```

### Rule Set 4: Document Requirements Per Program

Each program defines required documents in `programs.requiredDocuments` (JSON array):

- Transcript → required for all
- Diploma → required for all
- Test Score → conditional per program (e.g., Engineering requires SAT/ACT)
- Essay → required for bachelor's programs
- Recommendation Letters → required for master's/doctorate (min 2)
- Passport → required for international applicants
- Financial Statement → required for international applicants
- Visa → conditional on acceptance

### Rule Set 5: Communication Rules

1. All outbound communications logged in `communicationLog`
2. Offer letters must specify acceptance deadline (min 14 days, max 60 days from send)
3. Rejection letters cannot be sent without an associated denial in `reviewRubrics`
4. Mass emails (bulk > 50) must be approved by Director and use template only
5. SMS messages limited to 10 per applicant per day
6. Email tracking pixels automatically added (opt-out available per template)
7. Auto-reply: if applicant replies to offer email → tagged as "responded" in system

### Rule Set 6: Enrollment Rules

1. Enrollment cannot exceed intake target by more than 5% without Director approval
2. Deferral limited to maximum 2 intake periods
3. Withdrawal after deposit → refund policy enforced by finance system integration
4. Welcome package auto-sent 24h after deposit received
5. Orientation RSVP reminder sent 7 days before event, then 24h before

### Rule Set 7: Data Retention & Privacy

1. Rejected application data retained for 2 years after decision, then anonymized
2. Enrolled student data transferred to student management system, admissions data retained for 5 years
3. Withdrawn applications retained for 3 years
4. Audit logs retained for 7 years (regulatory compliance)

## 9. Notification Specifications

### N-01: Application Received

- **Trigger:** New application created
- **Channel:** Email to applicant
- **Template:** `application_received`
- **Variables:** `{{applicantName}}`, `{{applicationNumber}}`, `{{programName}}`, `{{intakeName}}`
- **Delivery:** Immediate
- **Priority:** High

### N-02: Document Verified

- **Trigger:** Document verification status → "verified"
- **Channel:** Email to applicant + SMS (if opt-in)
- **Template:** `document_verified`
- **Variables:** `{{applicantName}}`, `{{documentType}}`, `{{applicationNumber}}`
- **Delivery:** Immediate

### N-03: Document Rejected

- **Trigger:** Document verification status → "rejected"
- **Channel:** Email to applicant
- **Template:** `document_rejected`
- **Variables:** `{{applicantName}}`, `{{documentType}}`, `{{reason}}`, `{{applicationNumber}}`
- **Delivery:** Immediate

### N-04: Interview Scheduled

- **Trigger:** Interview created with `sendConfirmation: true`
- **Channel:** Email + SMS to applicant
- **Template:** `interview_scheduled`
- **Variables:** `{{applicantName}}`, `{{date}}`, `{{time}}`, `{{timezone}}`, `{{meetingLink}}`, `{{location}}`, `{{interviewerNames}}`
- **Delivery:** Immediate
- **Attachment:** `.ics` calendar file

### N-05: Interview Reminder (24h)

- **Trigger:** Cron job, 24 hours before scheduled interview
- **Channel:** Email + SMS
- **Template:** `interview_reminder_24h`
- **Variables:** Same as N-04
- **Suppression:** Not sent if status = "cancelled" or "completed"

### N-06: Interview Reminder (1h)

- **Trigger:** Cron job, 1 hour before scheduled interview
- **Channel:** SMS only
- **Template:** `interview_reminder_1h`
- **Variables:** `{{applicantName}}`, `{{time}}`, `{{meetingLink}}`

### N-07: Interview Completed

- **Trigger:** Interview status → "completed"
- **Channel:** Internal notification to AO (in-app)
- **Template:** N/A (in-app toast)
- **Variables:** `{{applicantName}}`, `{{applicationNumber}}`
- **Audience:** Assigned AO + creator

### N-08: Offer Letter Sent

- **Trigger:** Offer letter status → "sent"
- **Channel:** Email + SMS to applicant
- **Template:** `offer_letter`
- **Variables:** `{{applicantName}}`, `{{programName}}`, `{{acceptanceDeadline}}`, `{{scholarshipAmount}}`, `{{pdfLink}}`
- **Delivery:** Immediate

### N-09: Offer Accepted

- **Trigger:** Applicant accepts offer (via portal or email reply)
- **Channel:** Email confirmation to applicant + in-app notification to AO
- **Template:** `offer_accepted`
- **Variables:** `{{applicantName}}`, `{{programName}}`, `{{nextSteps}}`

### N-10: Offer Declined

- **Trigger:** Applicant declines offer
- **Channel:** Internal notification to AO
- **Template:** N/A (in-app)
- **Variables:** `{{applicantName}}`, `{{programName}}`

### N-11: Deposit Received

- **Trigger:** Finance system webhook → deposit recorded
- **Channel:** Email confirmation to applicant + in-app to AO
- **Template:** `deposit_received`
- **Variables:** `{{applicantName}}`, `{{amount}}`, `{{programName}}`

### N-12: Enrollment Complete

- **Trigger:** Enrollment status → "enrolled"
- **Channel:** Email to applicant (Welcome)
- **Template:** `welcome_package`
- **Variables:** `{{applicantName}}`, `{{programName}}`, `{{startDate}}`, `{{orientationDate}}`, `{{studentPortalLink}}`

### N-13: Application Flagged for Review

- **Trigger:** Document flagged OR denial recommendation submitted
- **Channel:** In-app notification + email to Director of Admissions
- **Template:** `flag_for_review`
- **Variables:** `{{actorName}}`, `{{applicantName}}`, `{{applicationNumber}}`, `{{reason}}`

### N-14: Daily Digest

- **Trigger:** Cron job, daily at 8:00 AM
- **Channel:** Email to AO
- **Template:** `daily_digest_admissions`
- **Variables:** `{{newApplications}}`, `{{pendingReviews}}`, `{{interviewsToday}}`, `{{offersSent}}`, `{{enrolled}}`

## 10. Permission Matrix

| Entity             | Action         | Admissions Officer  | Admissions Director | System Admin |
| ------------------ | -------------- | ------------------- | ------------------- | ------------ |
| **Application**    | Create         | ✅                  | ✅                  | ✅           |
|                    | Read (own)     | ✅                  | ✅                  | ✅           |
|                    | Read (all)     | ❌                  | ✅                  | ✅           |
|                    | Update (basic) | ✅                  | ✅                  | ✅           |
|                    | Update (stage) | Limited (see rules) | ✅                  | ✅           |
|                    | Delete         | ❌                  | ✅                  | ✅           |
|                    | Assign         | ✅                  | ✅                  | ✅           |
| **Document**       | Upload         | ✅                  | ✅                  | ✅           |
|                    | Verify         | ✅                  | ✅                  | ✅           |
|                    | Reject         | ✅                  | ✅                  | ✅           |
|                    | Flag           | ✅                  | ✅                  | ✅           |
|                    | Delete         | ❌                  | ✅                  | ✅           |
| **Interview**      | Schedule       | ✅                  | ✅                  | ✅           |
|                    | Cancel         | ✅                  | ✅                  | ✅           |
|                    | Complete       | ✅                  | ✅                  | ✅           |
|                    | Reschedule     | ✅                  | ✅                  | ✅           |
| **Offer Letter**   | Generate       | ✅                  | ✅                  | ✅           |
|                    | Send           | ✅                  | ✅                  | ✅           |
|                    | Void           | ❌                  | ✅                  | ✅           |
| **Enrollment**     | Read           | ✅                  | ✅                  | ✅           |
|                    | Update status  | Limited             | ✅                  | ✅           |
|                    | Defer          | ✅                  | ✅                  | ✅           |
|                    | Withdraw       | ✅                  | ✅                  | ✅           |
| **Communication**  | Send email     | ✅                  | ✅                  | ✅           |
|                    | Send SMS       | ✅                  | ✅                  | ✅           |
|                    | View all       | Own only            | All                 | All          |
| **Templates**      | View           | ✅                  | ✅                  | ✅           |
|                    | Create/Edit    | ❌                  | ✅                  | ✅           |
|                    | Delete         | ❌                  | ✅                  | ✅           |
| **Reports**        | View           | ✅                  | ✅                  | ✅           |
|                    | Export         | ✅                  | ✅                  | ✅           |
|                    | Schedule       | ✅                  | ✅                  | ✅           |
| **Intake Periods** | View           | ✅                  | ✅                  | ✅           |
|                    | Create/Edit    | ❌                  | ✅                  | ✅           |
| **Programs**       | View           | ✅                  | ✅                  | ✅           |
|                    | Create/Edit    | ❌                  | ✅                  | ✅           |
| **Settings**       | View           | ✅                  | ✅                  | ✅           |
|                    | Edit           | ❌                  | ❌                  | ✅           |

## 11. State Management

### Redux Store Structure

```typescript
// store/admissions/index.ts
interface AdmissionsState {
  // Dashboard
  dashboard: {
    summary: DashboardSummary | null;
    pipeline: PipelineStage[] | null;
    activity: ActivityItem[];
    activityPagination: { offset: number; hasMore: boolean };
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  // Applications
  applications: {
    items: Record<string, ApplicationDetail>; // normalized by ID
    kanbanColumns: Record<string, ApplicationCard[]>; // stage -> cards
    list: { items: ApplicationCard[]; total: number };
    filters: ApplicationsFilters;
    selectedId: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    optimisticUpdates: OptimisticUpdate[];
    dirtyFields: Record<string, Partial<ApplicationDetail>>;
  };
  // Documents
  documents: {
    queue: DocumentItem[];
    queueFilters: DocumentQueueFilters;
    selectedId: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
  };
  // Interviews
  interviews: {
    calendarItems: InterviewCalendarItem[];
    calendarView: "month" | "week" | "agenda";
    dateRange: { start: string; end: string };
    status: "idle" | "loading" | "succeeded" | "failed";
  };
  // Communication
  communication: {
    messages: CommunicationItem[];
    folder: string;
    selectedId: string | null;
    composeState: "closed" | "email" | "sms" | "offer_letter" | "rejection_letter";
    status: "idle" | "loading" | "succeeded" | "failed";
  };
  // Enrollment
  enrollment: {
    funnel: FunnelStage[];
    records: EnrollmentRecord[];
    selectedId: string | null;
    filters: EnrollmentFilters;
    status: "idle" | "loading" | "succeeded" | "failed";
  };
}
```

### RTK Query Endpoints

```typescript
// api/admissions.ts
const admissionsApi = createApi({
  reducerPath: "admissionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admissions" }),
  tagTypes: [
    "Dashboard",
    "Applications",
    "Application",
    "Documents",
    "Document",
    "Interviews",
    "Communication",
    "Enrollment",
    "Reports",
  ],
  endpoints: (builder) => ({
    // Dashboard
    getDashboardSummary: builder.query<DashboardSummary, void>({
      query: () => "/dashboard/summary",
      providesTags: ["Dashboard"],
    }),
    getDashboardPipeline: builder.query<PipelineStage[], string | undefined>({
      query: (intakeId) => `/dashboard/pipeline${intakeId ? `?intakeId=${intakeId}` : ""}`,
      providesTags: ["Dashboard"],
    }),
    getDashboardActivity: builder.query<ActivityResponse, ActivityQuery>({
      query: (params) => ({ url: "/dashboard/activity", params }),
      providesTags: ["Dashboard"],
    }),
    // Applications
    getApplications: builder.query<ApplicationCard[], ApplicationsListQuery>({
      query: (params) => ({ url: "/applications", params }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Applications" as const, id })), "Applications"]
          : ["Applications"],
    }),
    getApplication: builder.query<ApplicationDetail, string>({
      query: (id) => `/applications/${id}`,
      providesTags: (result, error, id) => [{ type: "Application", id }],
    }),
    createApplication: builder.mutation<
      { id: string; applicationNumber: string },
      CreateApplicationRequest
    >({
      query: (body) => ({ url: "/applications", method: "POST", body }),
      invalidatesTags: ["Applications", "Dashboard"],
    }),
    updateApplication: builder.mutation<void, { id: string; data: UpdateApplicationRequest }>({
      query: ({ id, data }) => ({ url: `/applications/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Application", id },
        "Applications",
        "Dashboard",
      ],
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        // Optimistic update
        const patchResult = dispatch(
          admissionsApi.util.updateQueryData("getApplication", id, (draft) => {
            Object.assign(draft, data);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateApplicationStage: builder.mutation<
      { previousStage: string; newStage: string },
      { id: string; stage: string; reason?: string }
    >({
      query: ({ id, stage, reason }) => ({
        url: `/applications/${id}/stage`,
        method: "PATCH",
        body: { stage, reason },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Application", id },
        "Applications",
        "Dashboard",
      ],
    }),
    // Documents
    getDocuments: builder.query<DocumentsListResponse, string>({
      query: (appId) => `/applications/${appId}/documents`,
      providesTags: (result, error, appId) => [{ type: "Documents", id: appId }],
    }),
    uploadDocument: builder.mutation<
      { id: string; fileName: string },
      { appId: string; file: File; documentType: string }
    >({
      query: ({ appId, file, documentType }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("documentType", documentType);
        return { url: `/applications/${appId}/documents`, method: "POST", body: formData };
      },
      invalidatesTags: (result, error, { appId }) => [
        { type: "Documents", id: appId },
        { type: "Application", id: appId },
      ],
    }),
    verifyDocument: builder.mutation<void, string>({
      query: (id) => ({ url: `/documents/${id}/verify`, method: "PATCH" }),
      invalidatesTags: ["Documents", "Application"],
    }),
    rejectDocument: builder.mutation<void, { id: string; reason: string; comment?: string }>({
      query: ({ id, reason, comment }) => ({
        url: `/documents/${id}/reject`,
        method: "PATCH",
        body: { reason, comment },
      }),
      invalidatesTags: ["Documents", "Application"],
    }),
    // Interviews
    getInterviews: builder.query<InterviewCalendarItem[], { start: string; end: string }>({
      query: (params) => ({ url: "/interviews", params }),
      providesTags: ["Interviews"],
    }),
    scheduleInterview: builder.mutation<{ id: string }, CreateInterviewRequest>({
      query: (body) => ({ url: "/interviews", method: "POST", body }),
      invalidatesTags: ["Interviews", "Application"],
    }),
    completeInterview: builder.mutation<void, { id: string; data: InterviewCompleteRequest }>({
      query: ({ id, data }) => ({ url: `/interviews/${id}/complete`, method: "POST", body: data }),
      invalidatesTags: ["Interviews", "Application"],
    }),
    // Communication
    getMessages: builder.query<
      CommunicationListResponse,
      { folder: string; limit: number; offset: number }
    >({
      query: (params) => ({ url: "/communication", params }),
      providesTags: ["Communication"],
    }),
    sendEmail: builder.mutation<{ id: string; status: string }, SendEmailRequest>({
      query: (body) => ({ url: "/communication/email", method: "POST", body }),
      invalidatesTags: ["Communication", "Application"],
    }),
    generateOfferLetter: builder.mutation<
      { id: string; status: string; pdfUrl?: string },
      GenerateOfferLetterRequest
    >({
      query: (body) => ({ url: "/communication/offer-letter", method: "POST", body }),
      invalidatesTags: ["Communication", "Application"],
    }),
    // Enrollment
    getEnrollmentFunnel: builder.query<FunnelStage[], string>({
      query: (intakeId) => `/enrollment/funnel?intakeId=${intakeId}`,
      providesTags: ["Enrollment"],
    }),
    updateEnrollmentStatus: builder.mutation<
      void,
      { id: string; data: UpdateEnrollmentStatusRequest }
    >({
      query: ({ id, data }) => ({ url: `/enrollment/${id}/status`, method: "PATCH", body: data }),
      invalidatesTags: ["Enrollment", "Application", "Dashboard"],
    }),
    // Reports
    getReport: builder.query<
      ReportResponse,
      { reportType: string; params: Record<string, string> }
    >({
      query: ({ reportType, params }) => ({ url: `/reports/${reportType}`, params }),
      providesTags: ["Reports"],
    }),
  }),
});
```

## 12. Form Schemas (Zod)

```typescript
// schemas/admissions.ts
import { z } from "zod";

// ─────────────────────────────────────────────
// Application Form
// ─────────────────────────────────────────────
export const previousInstitutionSchema = z
  .object({
    institutionName: z.string().min(1, "Institution name is required").max(200),
    degree: z.string().min(1, "Degree is required").max(100),
    fieldOfStudy: z.string().min(1, "Field of study is required").max(100),
    gpa: z.number().min(0, "GPA must be ≥ 0").max(5.0, "GPA must be ≤ 5.0").optional(),
    gpaScale: z.number().min(1).max(5).default(4.0),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
      .optional(),
    isCurrent: z.boolean().default(false),
  })
  .refine((data) => data.isCurrent || !!data.endDate, {
    message: "End date is required if not currently attending",
    path: ["endDate"],
  });

export const createApplicationSchema = z.object({
  // Personal Info
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100)
    .regex(
      /^[\p{L}\s'-]+$/u,
      "First name must contain only letters, spaces, hyphens, and apostrophes",
    ),
  middleName: z.string().max(100).optional().or(z.literal("")),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100)
    .regex(/^[\p{L}\s'-]+$/u, "Last name must contain only letters"),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date (YYYY-MM-DD)")
    .refine((val) => {
      const dob = new Date(val);
      const now = new Date();
      const age = now.getFullYear() - dob.getFullYear();
      return age >= 15;
    }, "Applicant must be at least 15 years old"),
  gender: z.enum(["male", "female", "non-binary", "prefer-not-to-say", "other"]).optional(),
  nationality: z.string().max(100).optional().or(z.literal("")),
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/, "Phone must be in E.164 format (e.g., +1234567890)"),
  email: z.string().email("Invalid email address").max(255),
  currentAddress: z.string().max(500).optional().or(z.literal("")),
  city: z.string().max(100).optional().or(z.literal("")),
  state: z.string().max(100).optional().or(z.literal("")),
  postalCode: z.string().max(20).optional().or(z.literal("")),
  country: z.string().max(100).optional().or(z.literal("")),
  // Academic
  previousInstitutions: z.array(previousInstitutionSchema).default([]),
  // Program
  primaryProgramId: z.string().uuid("Invalid program selection"),
  secondaryProgramId: z.string().uuid().optional().or(z.literal("")),
  intakePeriodId: z.string().uuid("Invalid intake period"),
  applicationType: z.enum(["new", "transfer", "readmission", "international"]),
  // Source
  source: z
    .enum(["social_media", "referral", "website", "email_campaign", "partner", "walk_in", "other"])
    .optional(),
  sourceDetail: z.string().max(200).optional().or(z.literal("")),
});

export type CreateApplicationFormData = z.infer<typeof createApplicationSchema>;

// ─────────────────────────────────────────────
// Interview Schedule Form
// ─────────────────────────────────────────────
export const scheduleInterviewSchema = z
  .object({
    applicationId: z.string().uuid(),
    interviewType: z.enum(["in_person", "video_call", "phone_call"], {
      required_error: "Interview type is required",
    }),
    scheduledDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date")
      .refine(
        (val) => new Date(val) >= new Date(new Date().toDateString()),
        "Date cannot be in the past",
      ),
    scheduledTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid time (HH:mm)"),
    timezone: z.string().min(1, "Timezone is required"),
    duration: z
      .enum(["30", "45", "60", "90"], { required_error: "Duration is required" })
      .transform(Number),
    interviewerIds: z.array(z.string().uuid()).min(1, "At least one interviewer is required"),
    location: z.string().max(200).optional().or(z.literal("")),
    meetingLink: z.string().url("Invalid URL").optional().or(z.literal("")),
    sendConfirmation: z.boolean().default(true),
    notes: z.string().max(2000).optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.interviewType === "in_person" && !data.location) return false;
      if (
        (data.interviewType === "video_call" || data.interviewType === "phone_call") &&
        !data.meetingLink
      )
        return false;
      return true;
    },
    {
      message: "Location (in-person) or meeting link (video/phone) is required",
      path: ["location"],
    },
  );

// ─────────────────────────────────────────────
// Interview Feedback Form
// ─────────────────────────────────────────────
export const interviewFeedbackSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  strengths: z.string().max(2000).optional().or(z.literal("")),
  weaknesses: z.string().max(2000).optional().or(z.literal("")),
  recommendation: z.enum(["strong_yes", "yes", "maybe", "no"], {
    required_error: "Recommendation is required",
  }),
  feedback: z.string().max(5000).optional().or(z.literal("")),
});

// ─────────────────────────────────────────────
// Offer Letter Form
// ─────────────────────────────────────────────
export const offerLetterSchema = z
  .object({
    templateId: z.string().uuid("Template is required"),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
    acceptanceDeadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
    scholarshipAwarded: z.boolean().default(false),
    scholarshipAmount: z.number().positive("Amount must be positive").optional().nullable(),
    scholarshipName: z.string().max(200).optional().or(z.literal("")),
    customParagraph: z.string().max(5000).optional().or(z.literal("")),
    sendNow: z.boolean().default(true),
  })
  .refine(
    (data) => {
      if (data.scholarshipAwarded && (!data.scholarshipAmount || data.scholarshipAmount <= 0))
        return false;
      return true;
    },
    {
      message: "Scholarship amount is required when scholarship is awarded",
      path: ["scholarshipAmount"],
    },
  )
  .refine(
    (data) => {
      const deadline = new Date(data.acceptanceDeadline);
      const start = new Date(data.startDate);
      return deadline < start;
    },
    { message: "Acceptance deadline must be before start date", path: ["acceptanceDeadline"] },
  );

// ─────────────────────────────────────────────
// Document Rejection Form
// ─────────────────────────────────────────────
export const documentRejectionSchema = z.object({
  reason: z.enum(
    [
      "illegible",
      "expired",
      "incorrect_document_type",
      "forged_or_tampered",
      "incomplete",
      "wrong_language",
      "not_notarized",
      "other",
    ],
    { required_error: "Rejection reason is required" },
  ),
  comment: z.string().max(1000).optional().or(z.literal("")),
});

// ─────────────────────────────────────────────
// Email Communication Form
// ─────────────────────────────────────────────
export const sendEmailSchema = z.object({
  to: z.string().email("Invalid recipient email"),
  cc: z.array(z.string().email()).default([]),
  bcc: z.array(z.string().email()).default([]),
  subject: z.string().min(1, "Subject is required").max(200),
  body: z.string().min(1, "Body is required").max(50000),
  templateId: z.string().uuid().optional(),
  scheduledSendAt: z.string().datetime().optional(),
  saveAsDraft: z.boolean().default(false),
});
```

## 13. Analytics Events

| Event Name                             | Properties                                                            | Destination              | Trigger                   |
| -------------------------------------- | --------------------------------------------------------------------- | ------------------------ | ------------------------- |
| `admissions_application_created`       | `applicationId`, `programId`, `intakeId`, `source`, `applicationType` | PostHog, Amplitude       | New application submitted |
| `admissions_application_stage_changed` | `applicationId`, `fromStage`, `toStage`, `actorId`                    | PostHog, Amplitude       | Stage transition          |
| `admissions_application_reviewed`      | `applicationId`, `reviewerId`, `score`, `recommendation`              | PostHog, Amplitude       | Review submitted          |
| `admissions_document_uploaded`         | `documentId`, `applicationId`, `documentType`, `fileSize`             | PostHog, S3              | Document upload           |
| `admissions_document_verified`         | `documentId`, `applicationId`, `verifierId`                           | PostHog                  | Document verified         |
| `admissions_document_rejected`         | `documentId`, `applicationId`, `reason`                               | PostHog, Amplitude       | Document rejected         |
| `admissions_interview_scheduled`       | `interviewId`, `applicationId`, `type`, `duration`                    | PostHog, Google Calendar | Interview scheduled       |
| `admissions_interview_completed`       | `interviewId`, `applicationId`, `rating`, `recommendation`            | PostHog                  | Interview completed       |
| `admissions_interview_no_show`         | `interviewId`, `applicationId`                                        | PostHog                  | No-show marked            |
| `admissions_offer_sent`                | `offerLetterId`, `applicationId`, `hasScholarship`, `amount`          | PostHog, Amplitude       | Offer sent                |
| `admissions_offer_accepted`            | `offerLetterId`, `applicationId`, `acceptanceDuration`                | PostHog, Amplitude       | Offer accepted            |
| `admissions_offer_declined`            | `offerLetterId`, `applicationId`                                      | PostHog                  | Offer declined            |
| `admissions_enrollment_completed`      | `enrollmentId`, `applicationId`, `intakeId`, `programId`              | PostHog, Amplitude, CRM  | Enrollment confirmed      |
| `admissions_enrollment_deferred`       | `enrollmentId`, `applicationId`, `reason`                             | PostHog                  | Enrollment deferred       |
| `admissions_enrollment_withdrawn`      | `enrollmentId`, `applicationId`, `reason`                             | PostHog                  | Enrollment withdrawn      |
| `admissions_reports_exported`          | `reportType`, `format`, `filters`                                     | PostHog                  | Report export             |
| `admissions_communication_sent`        | `communicationId`, `type`, `templateId`, `applicationId`              | PostHog, Amplitude       | Communication sent        |
| `admissions_search_performed`          | `searchQuery`, `resultCount`, `filters`                               | PostHog                  | Search in listings        |
| `admissions_error_occurred`            | `errorCode`, `endpoint`, `message`                                    | Sentry, PostHog          | API/UI error              |

## 14. Accessibility Requirements

### 14.1 ARIA Labels & Landmarks

```typescript
// Component-level ARIA attributes
interface AriaLabels {
  // Navigation
  admissionsSidebar: "Admissions module navigation";
  stageStepper: "Application progress stages";
  quickActionsToolbar: "Quick actions toolbar";

  // Data display
  summaryCard: (title: string) => `${title}: ${value}`;
  kanbanColumn: (stage: string) => `${stage} applications column, ${count} items`;
  applicationCard: (name: string) => `Application for ${name}, in ${stage} stage`;
  pipelineWidget: "Admissions pipeline health overview";
  activityFeed: "Recent admissions activity";

  // Actions
  dragHandle: "Drag to change application stage";
  newApplicationButton: "Create new application";
  scheduleInterviewButton: "Schedule new interview";
  verifyDocumentButton: "Verify this document";
  rejectDocumentButton: "Reject this document with reason";

  // Forms
  applicationForm: "New application form";
  interviewForm: "Schedule interview form";
  documentUploadZone: "Drag and drop files here or click to upload";
  emailComposer: "Compose email message";
  offerLetterForm: "Generate offer letter";

  // Feedback
  saveIndicator: "Changes saved";
  errorMessage: (field: string) => `Error in ${field} field`;
  loadingIndicator: "Loading content";
  emptyState: (resource: string) => `No ${resource} available`;
}
```

### 14.2 Keyboard Navigation

| Key            | Action                             | Context            |
| -------------- | ---------------------------------- | ------------------ |
| `Tab`          | Move to next focusable element     | Global             |
| `Shift+Tab`    | Move to previous focusable element | Global             |
| `Enter/Space`  | Activate focused button/link       | Global             |
| `Escape`       | Close modal/dropdown/menu          | Modal open         |
| `Arrow Keys`   | Navigate kanban cards, table rows  | Kanban/List view   |
| `Ctrl+F`       | Focus search input                 | All list views     |
| `Ctrl+N`       | New application                    | Admissions Hub     |
| `Ctrl+S`       | Save current form                  | Detail/edit views  |
| `Ctrl+Shift+P` | Print current view                 | Document view      |
| `/`            | Focus global search                | Global             |
| `?`            | Show keyboard shortcuts modal      | Global             |
| `g + h`        | Go to Admissions Hub               | Global (after `g`) |
| `g + a`        | Go to Applications Pipeline        | Global (after `g`) |
| `g + i`        | Go to Interview Scheduler          | Global (after `g`) |
| `g + d`        | Go to Document Verification        | Global (after `g`) |
| `g + c`        | Go to Communication Center         | Global (after `g`) |
| `g + e`        | Go to Enrollment Tracker           | Global (after `g`) |
| `g + r`        | Go to Reports                      | Global (after `g`) |

### 14.3 Screen Reader Announcements

- **Loading changes:** "Loading applications" / "Updating application status"
- **Drag and drop:** "Application moved from Review to Interview stage"
- **Bulk action:** "3 applications assigned to Jane Smith"
- **Real-time updates:** "New application received from John Doe" (polite announcement)
- **Error:** "Error: Unable to save changes. Press Escape to dismiss."
- **Success:** "Application created successfully. Application number APP-2026-0042."
- **Empty state:** "No applications match your current filters. Press Escape to clear filters."
- **Notification:** "1 new notification. Go to notifications panel to review."

### 14.4 Focus Management

1. **Modal open:** Focus trap within modal, first focusable element receives focus
2. **Modal close:** Focus returns to trigger element
3. **Page navigation:** Focus moves to `<h1>` heading
4. **Inline edit:** Focus moves to editable field; on save, focus returns to display text
5. **Error validation:** Focus moves to first invalid field with error announcement
6. **Toast notification:** Focusable "Close" button on toast; auto-dismiss after 8 seconds
7. **Kanban drag:** Focus stays on card during drag; after drop, focus on card in new column
8. **Infinite scroll:** "Load more" button receives focus; after load, keyboard focus on first new item

## 15. Error & Edge Case Catalog

| #   | Error/Edge Case                                 | System Response                                                       | User Message                                                                              | Recovery Action                                    |
| --- | ----------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------- |
| E01 | Network timeout on dashboard load               | Retry 3x with exponential backoff (1s, 2s, 4s), then show cached data | "Unable to load latest data. Showing data from [time]. [Retry]"                           | Click Retry or manual refresh                      |
| E02 | Application save conflict (another user edited) | Return 409 Conflict with server version                               | "This application was modified by [Name] while you were editing. [Reload] [Overwrite]"    | Reload = discard changes; Overwrite = force save   |
| E03 | File upload exceeds 25MB limit                  | Reject with 413                                                       | "File too large. Maximum size is 25MB. Selected file: [size]."                            | Resize/compress file and retry                     |
| E04 | Invalid file type uploaded                      | Client-side + server-side validation                                  | "Invalid file type. Accepted: PDF, PNG, JPG, DOC, DOCX."                                  | Select correct file type                           |
| E05 | Duplicate email on application creation         | Debounced check on email field                                        | "An application already exists for this email address. [View Existing]"                   | View existing application or use different email   |
| E06 | Interview time slot conflict                    | Backend checks all interviewers' schedules                            | "Time conflict: [Interviewer Name] has [existing event] at this time."                    | Select different time or interviewer               |
| E07 | Stage transition not allowed                    | Backend validates workflow rules                                      | "Cannot move from [current stage] to [requested stage]. Allowed: [list]."                 | Select valid target stage                          |
| E08 | Offer letter deadline past start date           | Zod validation                                                        | "Acceptance deadline must be before the program start date."                              | Adjust deadline or start date                      |
| E09 | Database query timeout (>5s)                    | Return 504, log to Sentry                                             | "Request timed out. Please try again or narrow your search."                              | Retry with more specific filters                   |
| E10 | R2 storage unavailable for document download    | Return 503, health check triggers alert                               | "Document storage is temporarily unavailable. [Try Again] [Contact Support]"              | Retry; if persists, notify system admin            |
| E11 | Email delivery failure (SES/SendGrid bounce)    | Webhook updates status to "failed", retry queue                       | "Email delivery failed. [View Details] [Resend]"                                          | Check recipient email, resend                      |
| E12 | SMS gateway failure                             | Fallback to email-only, log error                                     | "SMS delivery failed. Email sent as fallback."                                            | Notify IT Support                                  |
| E13 | Concurrent enrollment limit reached             | Check against intake target                                           | "Enrollment target for [Program/Intake] has been reached. [Waitlist] [View Alternatives]" | Create waitlist entry or offer alternative program |
| E14 | Deleted application attempted to access         | 404 on any endpoint                                                   | "Application not found. It may have been deleted or archived."                            | Navigate back to list                              |
| E15 | Rate limit exceeded (>100 req/min)              | 429 with Retry-After header                                           | "Too many requests. Please wait [seconds] seconds before trying again."                   | Wait and retry                                     |
| E16 | Invalid UUID in URL parameter                   | 400 validation                                                        | "Invalid application ID format."                                                          | Verify the URL is correct                          |
| E17 | Session expired during long form fill           | Token refresh fails → redirect to login                               | "Your session has expired. Your work has been saved as a draft."                          | Login, return to draft                             |
| E18 | Browser back button after unsaved changes       | beforeunload event + React Router blocker                             | "You have unsaved changes. Are you sure you want to leave?"                               | Stay (cancel navigation) or leave (discard)        |
| E19 | Zero applications in system (first use)         | Show empty state with onboarding                                      | "Welcome to Admissions! Start by creating your first application."                        | Click "New Application" CTA                        |
| E20 | 5000+ applications in database                  | Pagination, virtual scrolling, lazy load                              | N/A (design handles scale)                                                                | N/A                                                |
| E21 | Applicant withdraws application mid-review      | WebSocket push → application moves to "withdrawn"                     | "APP-0042 has been withdrawn by the applicant."                                           | Review note left for audit                         |
| E22 | Document flagged as potentially forged          | Supervisor notification, application paused                           | "Document flagged for review. Application placed on hold."                                | Supervisor reviews within 24h                      |
| E23 | Bulk operation partially fails                  | Process items individually, report per-item status                    | "5 of 20 applications updated. 3 failed: [reasons]. [Retry Failed]"                       | Retry failed items                                 |
| E24 | Calendar sync fails with external calendar API  | Log error, fall back to manual link sharing                           | "Unable to sync with external calendar. Meeting link shared via email."                   | Manual calendar entry                              |

---

_End of Actor Plan — Admissions Officer_
