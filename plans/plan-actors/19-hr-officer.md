# Actor: HR Officer

## 1. Identity & Role Definition

- **Actor ID**: `hr_officer`
- **Display Name**: HR Officer
- **Description**: Human Resources professional managing the full employee lifecycle at Cyber Elias Academy. Responsibilities include recruitment, employee database management, leave administration, attendance tracking, performance reviews, payroll input, onboarding/offboarding, training records, and HR reporting.
- **User Type**: `hr_officer` in `users.role` enum
- **Auth Level**: Authenticated (JWT), elevated session for PII data access
- **Sub-roles**: HR Manager, Recruiter, Payroll Liaison, Training Coordinator
- **Scope**: All employee data with PII handling compliance (GDPR/CCPA)

---

## 2. Primary Goals & Success KPIs

| Goal                                 | KPI                           | Measurement                                                     |
| ------------------------------------ | ----------------------------- | --------------------------------------------------------------- |
| Fill open positions efficiently      | Time-to-fill                  | Average days from job posting to accepted offer                 |
| Maintain accurate employee records   | Data accuracy score           | % of employee records updated within 7 days of change           |
| Process leave requests within SLA    | Leave processing time         | Average hours from request to decision                          |
| Track attendance and punctuality     | Attendance rate               | `(total_days - absences) / total_days * 100`                    |
| Complete performance reviews on time | Review completion rate        | `reviews_completed_by_deadline / total_reviews * 100`           |
| Ensure smooth onboarding/offboarding | Onboarding satisfaction score | New hire survey average (1–5)                                   |
| Maintain training compliance         | Training completion rate      | `employees_completed_required_training / total_employees * 100` |

---

## 3. Complete Screen Inventory

### 3.1 HR Hub (Dashboard)

**Wireframe**: HR command center with employee stats, pending actions, upcoming events, and quick access links.

**UI Fields / Components**:

- `HRStatsRow` — 6 metric cards: `totalEmployees`, `activeOpenings`, `pendingLeaveRequests` (with overdue count), `pendingReviews`, `newHiresThisMonth`, `turnoverRate` (YTD)
- `EmployeeHeadcountGauge` — Donut chart: by department, by employment type (full-time/part-time/contract)
- `PendingActionsList` — Prioritized: "3 leave requests awaiting approval", "2 performance reviews overdue", "1 onboarding incomplete"
- `UpcomingEventsCalendar` — Mini calendar: birthdays, work anniversaries, review deadlines, training sessions
- `BirthdayWidget` — "This month: 4 birthdays" with names and dates
- `WorkAnniversaryWidget` — celebrations: X years at CEA
- `QuickActionsBar` — [New Job Posting], [Add Employee], [Process Leave], [Start Review Cycle], [Run Report]
- `ComplianceAlerts` — Expiring certifications, missing training, visa/work permit expiry
- `EmployeeMoodPulse` — Optional: recent survey results or sentiment snapshot

**Data Bindings**:

- `GET /api/hr/dashboard` — aggregated HR data
- `GET /api/hr/dashboard/pending` — pending action counts
- `GET /api/hr/dashboard/upcoming-events?month=current`
- `GET /api/hr/headcount?department=all`

**States**:

- **Loading**: 6 metric skeletons + calendar skeleton
- **Empty — New system**: "Welcome to HR Hub! Start by adding employees or posting a job."
- **Error**: Dashboard unavailable with retry, cached data shown if available
- **Edge — 0 employees**: "No employees in the system. Add your first employee to get started."
- **Edge — High turnover (> 20%)**: Red alert: "Turnover rate is high — consider exit interview analysis"

### 3.2 Recruitment Screen

**Wireframe**: Full recruitment lifecycle: job postings, candidate pipeline, interview scheduling, offer management.

**UI Fields / Components**:

- `JobPostingList` — Kanban or list view: `jobTitle`, `department`, `status` (draft/published/closed), `applicantCount`, `daysOpen`, `hiringManager`, `priority`
- `JobPostingForm` — Fields: `title`, `department`, `employmentType` (full-time/part-time/contract/internship), `location`, `salaryRange` (min/max), `description` (rich text), `requirements` (bullets), `responsibilities` (bullets), `skills` (tags), `publishDate`, `closingDate`, `hiringManager`, `reviewers`
- `CandidatePipeline` — Kanban columns: New → Screening → Interviewing → Offer → Hired → Rejected
- `CandidateCard` — `name`, `position`, `stage`, `rating` (stars), `appliedDate`, `source`, `resumeScore`
- `CandidateProfile` — Full detail: `contactInfo`, `resume` (PDF viewer), `coverLetter`, `applicationHistory`, `interviewFeedback`, `communications`, `statusHistory`
- `InterviewScheduler` — Calendar with hiring manager availability, time slot picker, send invite
- `InterviewFeedbackForm` — Per-interviewer: `rating` (1-5), `strengths`, `weaknesses`, `hireRecommendation` (yes/no/maybe)
- `OfferLetterGenerator` — Template-based: `candidateName`, `position`, `salary`, `startDate`, `benefits`, `offerExpiryDate`. Generate PDF + send.
- `SourceTracking` — Dropdown per candidate: LinkedIn, Indeed, Referral, Website, Agency, Campus Recruitment
- `RecruitmentAnalytics` — Charts: time-to-fill, source effectiveness, offer acceptance rate, pipeline conversion

**Data Bindings**:

- `GET /api/hr/recruitment/jobs?page=1&limit=20&status=published`
- `POST /api/hr/recruitment/jobs` — create job posting
- `PATCH /api/hr/recruitment/jobs/:id` — update
- `GET /api/hr/recruitment/jobs/:id/candidates?page=1&limit=20&stage=screening`
- `PATCH /api/hr/recruitment/candidates/:id/stage` — move stage
- `POST /api/hr/recruitment/candidates/:id/feedback` — add interview feedback
- `POST /api/hr/recruitment/offers` — generate offer letter
- `PATCH /api/hr/recruitment/offers/:id` — update offer status (accepted/declined)
- `GET /api/hr/recruitment/analytics?startDate=2025-01-01&endDate=2025-06-30`

**States**:

- **Loading**: Pipeline skeleton with column placeholders
- **Empty — No jobs**: "No active job postings. Create your first posting to start recruiting."
- **Empty — No candidates**: "No candidates yet. Share the job posting to attract applicants."
- **Error**: "Recruitment data unavailable" with retry
- **Edge — Job posting expiring in 7 days**: Warning banner "This posting closes in 7 days"
- **Edge — Offer declined**: Auto-move candidate to "Declined", notify hiring manager
- **Edge — Duplicate candidate (same email)**: Warning "Candidate already in pipeline for this position"

### 3.3 Employee Database Screen

**Wireframe**: Searchable, filterable employee directory with detailed profile view. Master data management.

**UI Fields / Components**:

- `EmployeeSearchBar` — Global search: name, email, department, position
- `EmployeeFilterPanel` — `department` (multi-select), `employmentType`, `status` (active/inactive/on_leave/terminated), `location`, `manager`, `team`
- `EmployeeListView` — Table: `photo`, `firstName`, `lastName`, `employeeId`, `department`, `position`, `email`, `phone`, `status` badge, `startDate`
- `EmployeeProfile` — Tabbed detail: `PersonalInfo` (name, DOB, gender, ethnicity — confidential), `ContactInfo` (email, phone, address, emergencyContact), `EmploymentInfo` (employeeId, department, position, manager, startDate, employmentType, probationEndDate), `Compensation` (salary, payFrequency, bankInfo — encrypted), `Documents` (contract, offer letter, NDAs, signed policies), `Dependents` (name, relation, DOB for benefits), `History` (position changes, salary changes, status changes)
- `EmployeeCreateForm` — Wizard: Personal → Employment → Compensation → Documents → Review
- `BulkImportEmployees` — CSV/Excel upload with template download
- `EmployeeExport` — Export filtered list to CSV/Excel
- `OrganizationChart` — Interactive org chart with expandable manager → reports structure

**Data Bindings**:

- `GET /api/hr/employees?page=1&limit=25&department=engineering&status=active&search=john`
- `GET /api/hr/employees/:id` — full profile
- `POST /api/hr/employees` — create employee
- `PUT /api/hr/employees/:id` — update employee
- `PATCH /api/hr/employees/:id/status` — change status (active/terminated/on_leave)
- `PATCH /api/hr/employees/:id/compensation` — update salary/bank info
- `POST /api/hr/employees/:id/documents` — upload document
- `POST /api/hr/employees/bulk-import` — CSV upload
- `GET /api/hr/employees/org-chart` — org chart data
- `GET /api/hr/employees/export?format=csv`

**States**:

- **Loading**: Table skeleton (10 rows)
- **Empty — No employees**: "No employees found matching your criteria."
- **Empty — New system**: "Add your first employee to start building your HR database."
- **Error**: "Employee database unavailable" with retry
- **Edge — Terminated employee**: Greyed out row, "Terminated on {date}" badge
- **Edge — Missing required documents**: Warning "Employment contract not uploaded"
- **Edge — Probation ending soon**: "Probation ends in 15 days — schedule review"
- **Edge — Duplicate employee ID**: Block creation, show "Employee ID already in use"

### 3.4 Leave Management Screen

**Wireframe**: Leave calendar, request list, balance tracking, and policy configuration.

**UI Fields / Components**:

- `LeaveCalendar` — Month view with colored indicators: vacation (blue), sick (red), personal (green), other (gray)
- `LeaveRequestList` — Table: `employeeName`, `leaveType`, `startDate`, `endDate`, `duration`, `status` (pending/approved/rejected/cancelled), `approver`, `submittedDate`
- `LeaveRequestDetail` — Employee info, leave reason, attachments (doctor note), approval history, balance impact
- `LeaveBalanceCard` — Per employee: `vacationRemaining` / `allocation`, `sickRemaining`, `personalRemaining`
- `LeaveApprovalModal` — [Approve] [Reject] buttons with comment field, forward to next approver
- `LeavePolicyConfig` — Configurable: `vacationDaysPerYear`, `sickDays`, `personalDays`, `carryOverLimit`, `approvalHierarchy`, `minNotice`, `maxConsecutiveDays`
- `TeamLeaveCalendar` — View by department/team: see who's off to plan coverage
- `LeaveAnalytics` — Charts: leave utilization by department, absenteeism trend, most common leave types
- `HolidayCalendar` — Configure company holidays, auto-block on leave calendar

**Data Bindings**:

- `GET /api/hr/leave?page=1&limit=20&status=pending&department=sales&startDate=2025-06-01&endDate=2025-06-30`
- `GET /api/hr/leave/:id` — leave request detail
- `PATCH /api/hr/leave/:id/approve` — approve
- `PATCH /api/hr/leave/:id/reject` — reject
- `GET /api/hr/leave/balances?employeeId=xxx` — leave balances
- `PATCH /api/hr/leave/balances/:id` — adjust balance (manual override)
- `GET /api/hr/leave/policy` — current policy
- `PUT /api/hr/leave/policy` — update policy
- `POST /api/hr/leave/holidays` — add holiday
- `GET /api/hr/leave/calendar?department=engineering&month=2025-06`

**States**:

- **Loading**: Calendar skeleton + list skeleton
- **Empty**: "No leave requests for this period."
- **Error**: "Leave data unavailable" with retry
- **Edge — Insufficient balance**: Warning on approval: "Employee will have negative balance"
- **Edge — Back-to-back leave**: "Another leave request exists on adjacent dates"
- **Edge — Peak season blackout**: "Leave not available during {event} (blackout period)"
- **Edge — No remaining sick days**: Policy shows unpaid sick leave after exhaustion

### 3.5 Attendance Screen

**Wireframe**: Attendance register with clock-in/out data, late/missing punch tracking, and reports.

**UI Fields / Components**:

- `AttendanceDatePicker` — Select date for attendance view
- `AttendanceRegister` — Table per day: `employeeName`, `department`, `clockIn`, `clockOut`, `totalHours`, `status` (present/late/absent/half-day/holiday), `lateMinutes`, `earlyDepartureMinutes`
- `MissingPunchList` — Employees without clock-in/out: flag with "Missing Punch" warning
- `AttendanceSummaryCards` — Today's stats: `present`, `absent`, `late`, `onLeave`, `workingRemote`
- `WeeklySummaryTable` — Per employee: Mon-Sun hours, total, overtime, anomalies
- `ManualPunchAdjustment` — Form: `employee`, `date`, `clockIn`, `clockOut`, `reason`, `approvedBy`
- `AttendanceReportExport` — Export daily/weekly/monthly attendance to Excel/CSV
- `AttendancePolicyConfig` — `workStartTime`, `gracePeriodMinutes`, `lateThreshold`, `earlyDepartureThreshold`, `autoDeductLunch`
- `BiometricIntegrationStatus` — Connected hardware status: fingerprint/face scanner online/offline
- `OvertimeTracking` — Hours worked beyond standard, approved overtime vs unapproved

**Data Bindings**:

- `GET /api/hr/attendance?date=2025-06-16`
- `GET /api/hr/attendance/weekly?startDate=2025-06-16&endDate=2025-06-22`
- `GET /api/hr/attendance/monthly?employeeId=xxx&month=2025-06`
- `POST /api/hr/attendance/adjustment` — manual punch correction
- `GET /api/hr/attendance/summary/today` — today's stats
- `GET /api/hr/attendance/report?format=excel&startDate=&endDate=`

**States**:

- **Loading**: Register skeleton (10 rows)
- **Empty — No data for date**: "No attendance records for this date."
- **Error**: "Attendance data unavailable. Check biometric system connection."
- **Edge — Weekend/public holiday**: "No regular attendance expected — holiday"
- **Edge — System offline (biometric)**: Banner "Biometric system offline — manual attendance enabled"
- **Edge — Suspicious pattern**: "Employee clocked in 3 minutes after previous clock-out — possible error"

### 3.6 Performance Reviews Screen

**Wireframe**: Review cycle management, individual review forms, rating distribution, and feedback compilation.

**UI Fields / Components**:

- `ReviewCycleList` — Table: `cycleName`, `period`, `status` (upcoming/in_progress/complete), `participantCount`, `completionPercent`, `deadline`
- `ReviewCycleForm` — Create/edit: `name`, `startDate`, `endDate`, `reviewType` (self/manager/360/peer), `ratingScale` (1-5/1-10), `competencies` (multi-select), `questions` (custom)
- `EmployeeReviewList` — Per cycle: `employeeName`, `reviewType`, `selfCompleted`, `managerCompleted`, `overallRating`, `status`, `daysUntilDeadline`
- `ReviewForm` — Sections: `employeeInfo`, `competencyRatings` (grid: competency → self rating → manager rating → gap), `goalProgress` (previous goals), `newGoals` (next period), `overallComment`, `developmentPlan`
- `ReviewDetailView` — Side-by-side: self-assessment vs manager assessment, calculated gap
- `RatingDistributionChart` — Histogram of ratings across department/org
- `PerformanceImprovementPlanForm` — `planName`, `employee`, `areasOfConcern`, `goals`, `timeline`, `checkInFrequency`, `resources`, `successCriteria`
- `ReviewReminderSender` — Bulk send reminders to pending reviewers
- `ReviewExport` — Export reviews to PDF/Excel

**Data Bindings**:

- `GET /api/hr/performance/cycles?page=1&limit=10`
- `POST /api/hr/performance/cycles` — create cycle
- `GET /api/hr/performance/cycles/:id` — cycle detail with employee reviews
- `GET /api/hr/performance/reviews/:id` — review form data
- `PUT /api/hr/performance/reviews/:id` — save/update review
- `POST /api/hr/performance/reviews/:id/submit` — submit completed review
- `GET /api/hr/performance/ratings-distribution?cycleId=xxx&department=yyy`
- `POST /api/hr/performance/pip` — create PIP
- `PATCH /api/hr/performance/pip/:id` — update PIP status
- `POST /api/hr/performance/reminders` — send bulk reminders

**States**:

- **Loading**: Cycle list skeleton
- **Empty — No cycles**: "No review cycles created. Start a new performance review cycle."
- **Error**: "Performance review data unavailable"
- **Edge — Review overdue**: Red badge, "Overdue by 14 days"
- **Edge — Self vs manager gap > 2**: Warning "Significant gap between self and manager rating"
- **Edge — PIP in progress**: Orange badge, "Active PIP — due {date}"
- **Edge — Low rating (1-2)**: Auto-trigger PIP recommendation, notify HR manager

### 3.7 Payroll Input Screen

**Wireframe**: HR-side payroll data preparation: timesheet validation, change submissions, and handoff to accounting.

**UI Fields / Components**:

- `PayrollPeriodSelector` — Current open period with close date
- `TimesheetValidationPanel` — List: `employeeName`, `hoursLogged`, `approved`, `exceptions` (missing/over/overtime)
- `PayrollChangeForm` — Employee-level adjustments: `oneTimeBonus`, `commissionAdjustment`, `reimbursement`, `deductionOverride`, `reason`, `effectiveDate`
- `PayrollApprovalSummary` — Total changes, net payroll impact, affected employee count
- `PayrollHandoffButton` — Submit approved payroll to Accountant for processing
- `ChangeHistory` — Log of all payroll input changes with timestamps and user
- `EmployeePayRateList` — Current pay rates per employee for verification

**Data Bindings**:

- `GET /api/hr/payroll/current-period` — current open period
- `GET /api/hr/payroll/timesheet-status?periodId=xxx` — timesheet validation summary
- `POST /api/hr/payroll/adjustments` — submit adjustment
- `GET /api/hr/payroll/adjustments?periodId=xxx` — list adjustments
- `POST /api/hr/payroll/handoff` — submit to accounting
- `GET /api/hr/payroll/pay-rates` — employee pay rate list

**States**:

- **Loading**: Validation panel skeleton
- **Empty — No open period**: "No open payroll period. Accounting will create periods."
- **Error**: "Payroll input data unavailable"
- **Edge — Timesheet not approved for X employees**: Warning "X employees have unapproved timesheets"
- **Edge — Handoff already completed**: "Payroll already submitted to accounting for this period"
- **Edge — Adjustment exceeds threshold**: "Adjustment exceeds 20% of base pay — requires manager approval"

### 3.8 Onboarding/Offboarding Checklists Screen

**Wireframe**: Configurable checklists with task assignment, progress tracking, and completion verification.

**UI Fields / Components**:

- `OnboardingList` — Table: `newHireName`, `position`, `startDate`, `progressPercent`, `buddyName`, `status` (not_started/in_progress/completed)
- `OnboardingChecklistTemplate` — Sections: `IT Setup` (email, laptop, software, access), `HR Setup` (contract signed, payroll enrolled, benefits selected, policies acknowledged), `Facilities` (desk, keys, badge), `Training` (orientation, compliance, safety), `Team Integration` (team intro, buddy assignment, 30/60/90 day plans)
- `OnboardingTaskList` — Per employee: checklist items with assignee, due date, status, completion evidence
- `OnboardingProgressBar` — Visual progress: "12 of 18 tasks complete (67%)"
- `OffboardingList` — Table: `employeeName`, `lastWorkingDay`, `progressPercent`, `status`
- `OffboardingChecklistTemplate` — Sections: `IT` (laptop return, email deactivation, access revoke), `HR` (exit interview, final paycheck, COBRA, benefits termination), `Facilities` (badge return, key return, desk clearance), `Knowledge Transfer` (documentation, handoff meetings)
- `OffboardingExitInterviewForm` — `reasonForLeaving`, `feedback`, `improvementSuggestions`, `wouldReturn` (yes/no)
- `AssetReturnTracking` — Track returned items: laptop, monitor, phone, badge, keys, access card
- `ChecklistBuilder` — Drag-and-drop checklist template editor for HR admin
- `TaskAssigneeSelector` — Assign tasks to IT, Facilities, HR, Manager

**Data Bindings**:

- `GET /api/hr/onboarding?page=1&limit=20&status=in_progress`
- `GET /api/hr/onboarding/:id` — employee onboarding detail with tasks
- `PATCH /api/hr/onboarding/tasks/:id` — complete task
- `POST /api/hr/onboarding/templates` — create template
- `GET /api/hr/onboarding/templates` — list templates
- `GET /api/hr/offboarding?page=1&limit=20`
- `POST /api/hr/offboarding` — initiate offboarding
- `PATCH /api/hr/offboarding/tasks/:id` — complete task
- `POST /api/hr/offboarding/exit-interview` — submit
- `POST /api/hr/assets/return` — log asset return

**States**:

- **Loading**: Checklist skeletons
- **Empty — No active onboarding**: "No employees currently being onboarded."
- **Empty — No active offboarding**: "No employees currently being offboarded."
- **Error**: "Onboarding/offboarding data unavailable"
- **Edge — StartDate is today**: "New hire starts today!" with urgent task highlight
- **Edge — Last day passed, tasks incomplete**: "Offboarding overdue — {remaining} tasks incomplete"
- **Edge — Asset not returned**: Flag "Laptop not returned — follow up required"

### 3.9 Training Records Screen

**Wireframe**: Training catalog, employee training records, compliance tracking, and gap analysis.

**UI Fields / Components**:

- `TrainingCatalog` — Grid/list of available trainings: `title`, `provider`, `type` (online/in-person/certification), `duration`, `cost`, `required` badge, `expiryPeriod`
- `EmployeeTrainingRecord` — Per employee: `trainingName`, `completedDate`, `score`, `certificateUrl`, `expiryDate`, `status` (completed/pending/expired/overdue)
- `ComplianceReport` — Required vs completed per employee: `trainingName`, `totalRequired`, `completed`, `overdue`, `compliancePercent`
- `TrainingAssignmentForm` — Select employees + select training + due date + assign
- `TrainingReminderSender` — Bulk send reminders to employees with expired/overdue training
- `TrainingAnalytics` — Charts: completion rate by department, most popular trainings, compliance trends
- `ExternalTrainingApprovalForm` — `employee`, `trainingName`, `cost`, `benefitJustification`, `managerApproval`
- `CertificationTracker` — Track professional certs: CEH, CISSP, CompTIA, etc. with expiry alerts
- `TrainingCalendar` — Upcoming training sessions with registration

**Data Bindings**:

- `GET /api/hr/training/catalog?page=1&limit=20&type=required`
- `POST /api/hr/training/assign` — assign training to employees
- `GET /api/hr/training/employees/:id/records` — employee training records
- `GET /api/hr/training/compliance?department=engineering`
- `POST /api/hr/training/approve-external` — approve external training request
- `GET /api/hr/training/expiring?days=30` — certs expiring in 30 days
- `POST /api/hr/training/reminders` — send bulk reminders

**States**:

- **Loading**: Catalog skeleton
- **Empty — No trainings**: "No training programs configured. Add trainings to the catalog."
- **Empty — No records for employee**: "No training records for this employee."
- **Error**: "Training data unavailable"
- **Edge — Certification expired**: "CISSP certification expired — employee must recertify"
- **Edge — Low compliance (< 60%)**: Red alert, "Department compliance at 45% — escalation needed"
- **Edge — External training pending approval**: "3 external training requests pending approval"

### 3.10 HR Reports Screen

**Wireframe**: Report center for headcount, turnover, diversity, compliance, and custom HR reports.

**UI Fields / Components**:

- `ReportTypeGrid` — Cards: `HeadcountReport`, `TurnoverReport`, `DiversityReport`, `LeaveReport`, `AttendanceReport`, `TrainingCompliance`, `SalarySummary`, `EmployeeDirectory`, `CustomReport`
- `ReportParameterForm` — Date range, department filter, grouping (department/location/employmentType), format (PDF/Excel/CSV)
- `ReportViewer` — Table/chart view with export
- `ScheduledReports` — Configure recurring reports with email distribution
- `ReportHistory` — Previously generated reports

**Data Bindings**:

- `POST /api/hr/reports/generate` — generate report with params
- `GET /api/hr/reports/:id` — get report data
- `POST /api/hr/reports/schedule` — schedule recurring
- `GET /api/hr/reports/scheduled` — list schedules

---

## 4. Full Database Schema

```typescript
// ---- drizzle/schema/hr.ts ----

import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./users";
import { departments } from "./departments";

// ──────────────────────────────────────────────
// EMPLOYEES
// ──────────────────────────────────────────────
export const employees = sqliteTable("employees", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .unique()
    .references(() => users.id, { onDelete: "set null" }),
  employeeId: text("employee_id").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  middleName: text("middle_name"),
  preferredName: text("preferred_name"),
  dateOfBirth: text("date_of_birth"),
  gender: text("gender", { enum: ["male", "female", "non_binary", "prefer_not_to_say"] }),
  ethnicity: text("ethnicity"),
  personalEmail: text("personal_email"),
  workEmail: text("work_email").notNull(),
  phone: text("phone"),
  addressLine1: text("address_line1"),
  addressLine2: text("address_line2"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  country: text("country").default("US"),
  emergencyContactName: text("emergency_contact_name"),
  emergencyContactPhone: text("emergency_contact_phone"),
  emergencyContactRelation: text("emergency_contact_relation"),
  departmentId: text("department_id").references(() => departments.id),
  position: text("position").notNull(),
  managerId: text("manager_id").references(() => employees.id),
  employmentType: text("employment_type", {
    enum: ["full_time", "part_time", "contract", "internship", "temporary"],
  }).notNull(),
  status: text("status", { enum: ["active", "on_leave", "terminated", "suspended"] })
    .notNull()
    .default("active"),
  startDate: text("start_date").notNull(),
  probationEndDate: text("probation_end_date"),
  terminationDate: text("termination_date"),
  terminationReason: text("termination_reason"),
  baseSalary: real("base_salary"),
  payFrequency: text("pay_frequency", { enum: ["weekly", "biweekly", "semi_monthly", "monthly"] }),
  bankAccountName: text("bank_account_name"),
  bankAccountNumber: text("bank_account_number"), // encrypted
  bankRoutingNumber: text("bank_routing_number"), // encrypted
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const employeeDocuments = sqliteTable("employee_documents", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  employeeId: text("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  documentType: text("document_type", {
    enum: [
      "contract",
      "offer_letter",
      "nda",
      "policy_acknowledgement",
      "w4",
      "i9",
      "direct_deposit",
      "performance_review",
      "disciplinary",
      "other",
    ],
  }).notNull(),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size"),
  signedAt: text("signed_at"),
  expiryDate: text("expiry_date"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// RECRUITMENT
// ──────────────────────────────────────────────
export const jobPostings = sqliteTable("job_postings", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  departmentId: text("department_id").references(() => departments.id),
  employmentType: text("employment_type", {
    enum: ["full_time", "part_time", "contract", "internship"],
  }).notNull(),
  location: text("location"),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  description: text("description").notNull(),
  requirements: text("requirements"), // JSON array
  responsibilities: text("responsibilities"), // JSON array
  skills: text("skills"), // JSON array
  status: text("status", { enum: ["draft", "published", "on_hold", "filled", "closed"] })
    .notNull()
    .default("draft"),
  publishDate: text("publish_date"),
  closingDate: text("closing_date"),
  hiringManagerId: text("hiring_manager_id").references(() => employees.id),
  applicantCount: integer("applicant_count").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const candidates = sqliteTable("candidates", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  jobPostingId: text("job_posting_id")
    .notNull()
    .references(() => jobPostings.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  resumeUrl: text("resume_url"),
  coverLetterUrl: text("cover_letter_url"),
  source: text("source", {
    enum: ["linkedin", "indeed", "referral", "website", "agency", "campus", "other"],
  }),
  stage: text("stage", {
    enum: ["new", "screening", "interviewing", "offer", "hired", "rejected", "withdrawn"],
  })
    .notNull()
    .default("new"),
  rating: integer("rating"), // 1-5
  appliedDate: text("applied_date")
    .notNull()
    .default(sql`current_date`),
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const interviewFeedback = sqliteTable("interview_feedback", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  candidateId: text("candidate_id")
    .notNull()
    .references(() => candidates.id, { onDelete: "cascade" }),
  interviewerId: text("interviewer_id")
    .notNull()
    .references(() => users.id),
  round: integer("round").notNull(),
  rating: integer("rating").notNull(), // 1-5
  strengths: text("strengths"),
  weaknesses: text("weaknesses"),
  recommendation: text("recommendation", { enum: ["yes", "no", "maybe"] }).notNull(),
  notes: text("notes"),
  submittedAt: text("submitted_at").default(sql`current_timestamp`),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const offers = sqliteTable("offers", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  candidateId: text("candidate_id")
    .notNull()
    .references(() => candidates.id, { onDelete: "cascade" }),
  baseSalary: real("base_salary").notNull(),
  bonus: real("bonus"),
  benefitsSummary: text("benefits_summary"),
  startDate: text("start_date").notNull(),
  offerExpiryDate: text("offer_expiry_date").notNull(),
  status: text("status", { enum: ["draft", "sent", "accepted", "declined", "expired"] })
    .notNull()
    .default("draft"),
  sentAt: text("sent_at"),
  respondedAt: text("responded_at"),
  declineReason: text("decline_reason"),
  offerPdfUrl: text("offer_pdf_url"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// LEAVE MANAGEMENT
// ──────────────────────────────────────────────
export const leaveRequests = sqliteTable("leave_requests", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  employeeId: text("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  leaveType: text("leave_type", {
    enum: [
      "vacation",
      "sick",
      "personal",
      "maternity",
      "paternity",
      "bereavement",
      "jury_duty",
      "unpaid",
    ],
  }).notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  durationDays: real("duration_days").notNull(),
  reason: text("reason"),
  attachmentUrl: text("attachment_url"), // doctor's note
  status: text("status", { enum: ["pending", "approved", "rejected", "cancelled"] })
    .notNull()
    .default("pending"),
  approvedById: text("approved_by_id").references(() => users.id),
  approvedAt: text("approved_at"),
  rejectionReason: text("rejection_reason"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const leaveBalances = sqliteTable("leave_balances", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  employeeId: text("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  leaveType: text("leave_type", { enum: ["vacation", "sick", "personal"] }).notNull(),
  totalAllocated: real("total_allocated").notNull(),
  totalUsed: real("total_used").notNull().default(0),
  totalPending: real("total_pending").notNull().default(0),
  carryOverFromPrior: real("carry_over_from_prior").default(0),
  year: integer("year").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const leavePolicy = sqliteTable("leave_policy", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  leaveType: text("leave_type", { enum: ["vacation", "sick", "personal"] })
    .notNull()
    .unique(),
  daysPerYear: real("days_per_year").notNull(),
  carryOverLimit: real("carry_over_limit").notNull().default(0),
  minNoticeDays: integer("min_notice_days").notNull().default(1),
  maxConsecutiveDays: integer("max_consecutive_days").notNull().default(20),
  requiresApproval: integer("requires_approval", { mode: "boolean" }).notNull().default(true),
  isPaid: integer("is_paid", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const holidays = sqliteTable("holidays", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  date: text("date").notNull(),
  isRecurring: integer("is_recurring", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// ATTENDANCE
// ──────────────────────────────────────────────
export const attendanceRecords = sqliteTable("attendance_records", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  employeeId: text("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  date: text("date").notNull(),
  clockIn: text("clock_in"),
  clockOut: text("clock_out"),
  totalHours: real("total_hours"),
  status: text("status", {
    enum: ["present", "late", "absent", "half_day", "holiday", "on_leave"],
  }).notNull(),
  lateMinutes: integer("late_minutes").default(0),
  earlyDepartureMinutes: integer("early_departure_minutes").default(0),
  overtimeHours: real("overtime_hours").default(0),
  isOvertimeApproved: integer("is_overtime_approved", { mode: "boolean" }).default(false),
  source: text("source", { enum: ["biometric", "manual", "adjustment"] })
    .notNull()
    .default("biometric"),
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const attendanceAdjustments = sqliteTable("attendance_adjustments", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  employeeId: text("employee_id")
    .notNull()
    .references(() => employees.id),
  date: text("date").notNull(),
  originalClockIn: text("original_clock_in"),
  originalClockOut: text("original_clock_out"),
  adjustedClockIn: text("adjusted_clock_in"),
  adjustedClockOut: text("adjusted_clock_out"),
  reason: text("reason").notNull(),
  approvedBy: text("approved_by").references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// PERFORMANCE REVIEWS
// ──────────────────────────────────────────────
export const reviewCycles = sqliteTable("review_cycles", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  reviewType: text("review_type", { enum: ["self", "manager", "360", "peer"] }).notNull(),
  ratingScale: integer("rating_scale").notNull().default(5),
  competencies: text("competencies"), // JSON array
  status: text("status", { enum: ["upcoming", "in_progress", "complete"] })
    .notNull()
    .default("upcoming"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const performanceReviews = sqliteTable("performance_reviews", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  cycleId: text("cycle_id")
    .notNull()
    .references(() => reviewCycles.id, { onDelete: "cascade" }),
  employeeId: text("employee_id")
    .notNull()
    .references(() => employees.id),
  reviewerId: text("reviewer_id")
    .notNull()
    .references(() => users.id),
  ratings: text("ratings"), // JSON: { competency: score }
  overallRating: real("overall_rating"),
  strengths: text("strengths"),
  areasForImprovement: text("areas_for_improvement"),
  goals: text("goals"), // JSON array of next period goals
  developmentPlan: text("development_plan"),
  overallComment: text("overall_comment"),
  status: text("status", { enum: ["draft", "submitted", "acknowledged"] })
    .notNull()
    .default("draft"),
  submittedAt: text("submitted_at"),
  acknowledgedAt: text("acknowledged_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const performanceImprovementPlans = sqliteTable("performance_improvement_plans", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  employeeId: text("employee_id")
    .notNull()
    .references(() => employees.id),
  planName: text("plan_name").notNull(),
  areasOfConcern: text("areas_of_concern").notNull(),
  goals: text("goals").notNull(), // JSON array
  timeline: text("timeline"), // JSON: startDate, endDate, checkInFrequency
  resources: text("resources"), // JSON array
  successCriteria: text("success_criteria"),
  status: text("status", { enum: ["active", "completed", "failed", "cancelled"] })
    .notNull()
    .default("active"),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// ONBOARDING / OFFBOARDING
// ──────────────────────────────────────────────
export const onboardingRecords = sqliteTable("onboarding_records", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  employeeId: text("employee_id")
    .notNull()
    .unique()
    .references(() => employees.id, { onDelete: "cascade" }),
  startDate: text("start_date").notNull(),
  buddyId: text("buddy_id").references(() => employees.id),
  templateId: text("template_id"),
  progressPercent: integer("progress_percent").notNull().default(0),
  status: text("status", { enum: ["not_started", "in_progress", "completed"] })
    .notNull()
    .default("not_started"),
  completedAt: text("completed_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const onboardingTasks = sqliteTable("onboarding_tasks", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  onboardingId: text("onboarding_id")
    .notNull()
    .references(() => onboardingRecords.id, { onDelete: "cascade" }),
  taskName: text("task_name").notNull(),
  category: text("category", { enum: ["it", "hr", "facilities", "training", "team"] }).notNull(),
  assigneeId: text("assignee_id").references(() => employees.id),
  dueDate: text("due_date"),
  status: text("status", { enum: ["pending", "in_progress", "completed"] })
    .notNull()
    .default("pending"),
  completionEvidence: text("completion_evidence"), // URL or notes
  completedAt: text("completed_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const offboardingRecords = sqliteTable("offboarding_records", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  employeeId: text("employee_id")
    .notNull()
    .unique()
    .references(() => employees.id, { onDelete: "cascade" }),
  lastWorkingDay: text("last_working_day").notNull(),
  reason: text("reason"),
  exitInterviewCompleted: integer("exit_interview_completed", { mode: "boolean" })
    .notNull()
    .default(false),
  progressPercent: integer("progress_percent").notNull().default(0),
  status: text("status", { enum: ["not_started", "in_progress", "completed"] })
    .notNull()
    .default("not_started"),
  completedAt: text("completed_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const offboardingTasks = sqliteTable("offboarding_tasks", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  offboardingId: text("offboarding_id")
    .notNull()
    .references(() => offboardingRecords.id, { onDelete: "cascade" }),
  taskName: text("task_name").notNull(),
  category: text("category", { enum: ["it", "hr", "facilities", "knowledge_transfer"] }).notNull(),
  assigneeId: text("assignee_id").references(() => employees.id),
  dueDate: text("due_date"),
  status: text("status", { enum: ["pending", "in_progress", "completed"] })
    .notNull()
    .default("pending"),
  completedAt: text("completed_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const assetReturns = sqliteTable("asset_returns", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  offboardingId: text("offboarding_id")
    .notNull()
    .references(() => offboardingRecords.id, { onDelete: "cascade" }),
  assetType: text("asset_type", {
    enum: ["laptop", "monitor", "phone", "badge", "key", "access_card", "other"],
  }).notNull(),
  assetIdentifier: text("asset_identifier"), // serial number
  returnedDate: text("returned_date"),
  confirmedBy: text("confirmed_by").references(() => users.id),
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// TRAINING
// ──────────────────────────────────────────────
export const trainings = sqliteTable("trainings", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  provider: text("provider"),
  type: text("type", { enum: ["online", "in_person", "certification", "workshop"] }).notNull(),
  category: text("category"),
  description: text("description"),
  duration: text("duration"), // e.g., "2 hours", "3 days"
  cost: real("cost").default(0),
  isRequired: integer("is_required", { mode: "boolean" }).notNull().default(false),
  expiryPeriod: integer("expiry_period"), // months
  certificationName: text("certification_name"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const employeeTraining = sqliteTable("employee_training", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  employeeId: text("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  trainingId: text("training_id")
    .notNull()
    .references(() => trainings.id),
  status: text("status", { enum: ["assigned", "in_progress", "completed", "expired", "overdue"] })
    .notNull()
    .default("assigned"),
  assignedDate: text("assigned_date")
    .notNull()
    .default(sql`current_date`),
  dueDate: text("due_date"),
  completedDate: text("completed_date"),
  score: real("score"),
  certificateUrl: text("certificate_url"),
  expiryDate: text("expiry_date"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const externalTrainingRequests = sqliteTable("external_training_requests", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  employeeId: text("employee_id")
    .notNull()
    .references(() => employees.id),
  trainingTitle: text("training_title").notNull(),
  provider: text("provider"),
  cost: real("cost"),
  justification: text("justification"),
  status: text("status", { enum: ["pending", "approved", "rejected"] })
    .notNull()
    .default("pending"),
  reviewedBy: text("reviewed_by").references(() => users.id),
  reviewedAt: text("reviewed_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});
```

---

## 5-15. Remaining Sections (Abbreviated for length)

**API Contract**: All endpoints follow `/api/hr/{entity}` pattern with JWT auth. Key endpoints: employee CRUD, recruitment pipeline motion, leave approval, attendance query, review submission, training assignment, onboarding task completion. All paginated with filters.

**Component Tree**: `<HRLayout>` with sidebar linking to all modules. Each screen follows the pattern: FilterBar → ListView → Detail/Panel → ActionModal. OrgChart uses D3.js. Kanban uses @hello-pangea/dnd.

**User Journeys**:

1. **Hire Employee**: Create job posting → publish → review candidates → interview → offer → accept → onboard
2. **Process Leave**: Employee submits → HR approves → balance deducted → calendar updated → payroll notified
3. **Performance Review**: Create cycle → assign employees → self review → manager review → submit → report
4. **Terminate Employee**: Initiate offboarding → IT revokes access → return assets → exit interview → final paycheck → deactivate

**Business Rules**: Leave balance validation, probation period tracking, review deadline enforcement, training expiry alerts, duplicate candidate detection, overtime threshold flagging.

**Notifications**: Leave request pending/approved/rejected, review due/overdue, training assigned/expired, onboarding task assigned, offboarding task overdue, certification expiry, birthday/anniversary.

**Permissions**: HR full access to all employee data. Recruiter: recruitment only. Managers: their team's data. Employees: self-service view. Payroll liaison: compensation + timesheet.

**State Management**: Redux Toolkit with RTK Query. Tags per entity group. Optimistic updates for leave approval, task completion. WebSocket for real-time attendance updates.

**Zod Schemas**: Employee create/update, job posting, leave request, attendance adjustment, performance review, training assignment, onboarding task.

**Analytics**: Employee count, hire/loss, leave utilization, review completion, training compliance, time-to-fill, diversity metrics to PostHog.

**Accessibility**: Data tables with ARIA, keyboard nav for kanban drag-drop, form validation announcements, calendar with screen reader support, document viewer keyboard access.

**Error Catalog** (50+): Employee not found, duplicate employee ID, leave balance insufficient, review cycle locked, attendance already entered, training already assigned, offer expired, onboarding already completed, offboarding assets not returned, payslip generation failed, etc.

### Detailed Error & Edge Case Catalog

| Error Code | Condition                               | HTTP Status | System Response     | User Message                                                            | Recovery Action            |
| ---------- | --------------------------------------- | ----------- | ------------------- | ----------------------------------------------------------------------- | -------------------------- |
| HR-001     | Employee not found                      | 404         | ID lookup           | "Employee not found in the system."                                     | Check employee ID          |
| HR-002     | Duplicate employee ID                   | 409         | Unique constraint   | "Employee ID {id} is already assigned."                                 | Use different ID           |
| HR-003     | Duplicate email                         | 409         | Email unique        | "Email already exists in the system."                                   | Use different email        |
| HR-004     | Employee already terminated             | 400         | Status check        | "This employee has already been terminated."                            | View termination details   |
| HR-005     | Cannot delete active employee           | 400         | Status validation   | "Cannot delete an active employee. Terminate first."                    | Change status              |
| HR-006     | Leave balance insufficient              | 400         | Balance check       | "Insufficient {type} leave balance ({remaining} days remaining)."       | Use unpaid leave           |
| HR-007     | Leave request overlap                   | 409         | Date range check    | "Employee already has a leave request overlapping these dates."         | Adjust dates               |
| HR-008     | Leave exceeds max consecutive           | 400         | Policy check        | "Maximum {max} consecutive days allowed for {type} leave."              | Split request              |
| HR-009     | Cannot approve own leave                | 403         | Self-approval check | "You cannot approve your own leave request."                            | Forward to manager         |
| HR-010     | Candidate not found                     | 404         | Candidate lookup    | "Candidate record not found."                                           | Check candidate ID         |
| HR-011     | Duplicate candidate (same email)        | 409         | Email+job check     | "A candidate with this email already exists for this position."         | View existing              |
| HR-012     | Job posting not found                   | 404         | ID lookup           | "Job posting not found."                                                | Check job ID               |
| HR-013     | Cannot publish without requirements     | 400         | Validation          | "Job posting must have requirements and description before publishing." | Complete form              |
| HR-014     | Offer expired                           | 410         | Offer expiry check  | "This offer has expired. Create a new offer."                           | Generate new offer         |
| HR-015     | Offer already accepted                  | 400         | Status check        | "This offer has already been accepted."                                 | Proceed to onboarding      |
| HR-016     | Review cycle locked                     | 403         | Status check        | "This review cycle is closed for submissions."                          | Open new cycle             |
| HR-017     | Review already submitted                | 409         | Duplicate check     | "You have already submitted a review for this employee."                | Edit submitted review      |
| HR-018     | Attendance already recorded             | 409         | Date+employee check | "Attendance for this date already exists."                              | Use adjustment             |
| HR-019     | Cannot adjust past attendance (> 30d)   | 400         | Date range          | "Cannot adjust attendance older than 30 days."                          | Contact admin              |
| HR-020     | Training already assigned               | 409         | Duplicate check     | "Employee already assigned to this training."                           | View training status       |
| HR-021     | Training not found                      | 404         | ID lookup           | "Training program not found."                                           | Check training ID          |
| HR-022     | Certification expired                   | 410         | Expiry check        | "Certification {name} expired on {date}."                               | Schedule recertification   |
| HR-023     | Onboarding already completed            | 400         | Status check        | "Onboarding for this employee is already complete."                     | View onboarding summary    |
| HR-024     | Offboarding already in progress         | 409         | Status check        | "Offboarding already initiated for this employee."                      | Continue offboarding       |
| HR-025     | Asset return already logged             | 409         | Duplicate asset     | "This asset has already been returned."                                 | Check asset log            |
| HR-026     | Document upload failed                  | 500         | Upload error        | "Document could not be uploaded. Try again."                            | Retry upload               |
| HR-027     | File type not accepted                  | 400         | MIME check          | "Accepted formats: PDF, DOCX, JPG, PNG."                                | Convert file               |
| HR-028     | File exceeds size limit                 | 413         | Size check          | "File exceeds 10MB limit."                                              | Compress file              |
| HR-029     | Probation not yet ended                 | 400         | Date check          | "Employee probation period ends on {date}."                             | Schedule review after date |
| HR-030     | Cannot terminate without exit interview | 400         | Policy check        | "Exit interview must be completed before termination."                  | Schedule interview         |
| HR-031     | Session expired                         | 401         | JWT expired         | "Session expired. Please log in again."                                 | Redirect to login          |
| HR-032     | Network offline                         | —           | Connectivity        | "You are offline. Changes saved locally."                               | Queue and sync             |
| HR-033     | Rate limit exceeded                     | 429         | Throttle            | "Too many requests. Please wait."                                       | Retry after shown delay    |
| HR-034     | Access denied (PII)                     | 403         | Permission check    | "You do not have permission to view this confidential data."            | Request access             |
| HR-035     | Bulk import invalid format              | 400         | CSV validation      | "CSV format invalid. Download the template."                            | Use template               |
| HR-036     | Bulk import partial failure             | 207         | Row validation      | "{success} imported, {failed} failed. Download error report."           | Fix rows, retry failed     |

### Complete Notification Specifications

| Notification             | Trigger                | Channel       | Template Variables                                     | Delivery Rules          |
| ------------------------ | ---------------------- | ------------- | ------------------------------------------------------ | ----------------------- |
| Leave request submitted  | Employee submits leave | In-app, Email | `{employeeName}, {leaveType}, {startDate}, {duration}` | Immediate to manager    |
| Leave approved           | Manager approves       | In-app, Email | `{leaveType}, {startDate}, {endDate}`                  | Immediate               |
| Leave rejected           | Manager rejects        | In-app, Email | `{leaveType}, {startDate}, {reason}`                   | Immediate with reason   |
| Leave balance low        | Balance < 20%          | In-app, Email | `{leaveType}, {remaining}, {year}`                     | Monthly                 |
| Attendance missing       | No clock-in by 10am    | In-app, Push  | `{employeeName}, {date}`                               | Daily at 10am           |
| Attendance anomaly       | Suspicious pattern     | In-app        | `{employeeName}, {pattern}`                            | On detection            |
| Review cycle started     | New cycle created      | In-app, Email | `{cycleName}, {deadline}`                              | Immediate               |
| Review due reminder      | 7 days before deadline | In-app, Email | `{employeeName}, {cycleName}, {deadline}`              | 7d, 3d, 1d before       |
| Review overdue           | Past deadline          | In-app, Email | `{employeeName}, {cycleName}, {daysOverdue}`           | Daily until complete    |
| Review submitted         | Review completed       | In-app        | `{employeeName}, {cycleName}`                          | Immediate               |
| PIP created              | New PIP initiated      | In-app, Email | `{employeeName}, {planName}, {endDate}`                | Immediate               |
| PIP status changed       | PIP updated            | In-app        | `{employeeName}, {newStatus}`                          | Immediate               |
| Training assigned        | Training assigned      | In-app, Email | `{employeeName}, {trainingTitle}, {dueDate}`           | Immediate               |
| Training due reminder    | 7 days before due      | In-app, Email | `{employeeName}, {trainingTitle}, {dueDate}`           | 7d, 3d, 1d before       |
| Training overdue         | Past due date          | In-app, Email | `{employeeName}, {trainingTitle}, {daysOverdue}`       | Weekly                  |
| Training completed       | Employee completes     | In-app        | `{employeeName}, {trainingTitle}, {score}`             | Immediate               |
| Certification expiring   | 30 days before expiry  | In-app, Email | `{employeeName}, {certName}, {expiryDate}`             | 30d, 14d, 7d, 1d before |
| Onboarding task assigned | Task created           | In-app, Email | `{taskName}, {newHireName}, {dueDate}`                 | Immediate               |
| Onboarding task overdue  | Past due, incomplete   | In-app, Email | `{taskName}, {newHireName}, {daysOverdue}`             | Daily                   |
| Offboarding initiated    | Employee terminated    | In-app, Email | `{employeeName}, {lastDay}`                            | Immediate               |
| Offboarding task overdue | Task past due          | In-app, Email | `{taskName}, {employeeName}`                           | Daily                   |
| Birthday                 | Employee's birthday    | In-app, Email | `{employeeName}`                                       | On the day at 9am       |
| Work anniversary         | Anniversary date       | In-app, Email | `{employeeName}, {years}`                              | On the day              |
| Probation ending         | 14 days before end     | In-app, Email | `{employeeName}, {endDate}`                            | 14d, 7d before          |
| Document expiring        | Visa/contract expiry   | In-app, Email | `{employeeName}, {docType}, {expiryDate}`              | 30d, 14d, 7d before     |

### Complete Permission Matrix

| Entity              | Operation     | HR Officer      | HR Manager | Recruiter   | Manager  | Employee | Admin |
| ------------------- | ------------- | --------------- | ---------- | ----------- | -------- | -------- | ----- |
| Employee Profile    | Create        | ✓               | ✓          | ✗           | ✗        | ✗        | ✓     |
| Employee Profile    | Read          | ✓               | ✓          | ✓           | ✓ (team) | ✓ (own)  | ✓     |
| Employee Profile    | Update        | ✓               | ✓          | ✗           | ✓ (team) | ✗        | ✓     |
| Employee Profile    | Delete        | ✗               | ✓          | ✗           | ✗        | ✗        | ✓     |
| Employee Documents  | Upload        | ✓               | ✓          | ✗           | ✗        | ✓ (own)  | ✓     |
| Employee Documents  | View          | ✓               | ✓          | ✗           | ✓ (team) | ✓ (own)  | ✓     |
| Compensation        | View          | ✓               | ✓          | ✗           | ✓ (team) | ✓ (own)  | ✓     |
| Compensation        | Update        | ✓               | ✓          | ✗           | ✗        | ✗        | ✓     |
| Job Postings        | Create        | ✓               | ✓          | ✓           | ✓        | ✗        | ✓     |
| Job Postings        | Publish       | ✓               | ✓          | ✓           | ✗        | ✗        | ✓     |
| Candidates          | View          | ✓               | ✓          | ✓           | ✓ (team) | ✗        | ✓     |
| Candidates          | Move stage    | ✓               | ✓          | ✓           | ✓ (team) | ✗        | ✓     |
| Offers              | Create/Send   | ✓               | ✓          | ✗           | ✓        | ✗        | ✓     |
| Offers              | Approve       | ✓ (up to limit) | ✓          | ✗           | ✗        | ✗        | ✓     |
| Leave Requests      | View          | ✓               | ✓          | ✗           | ✓ (team) | ✓ (own)  | ✓     |
| Leave Requests      | Approve       | ✓               | ✓          | ✗           | ✓ (team) | ✗        | ✗     |
| Leave Balances      | Adjust        | ✓               | ✓          | ✗           | ✗        | ✗        | ✓     |
| Attendance          | View          | ✓               | ✓          | ✗           | ✓ (team) | ✓ (own)  | ✓     |
| Attendance          | Adjust        | ✓               | ✓          | ✗           | ✓ (team) | ✗        | ✓     |
| Performance Reviews | Create Cycle  | ✓               | ✓          | ✗           | ✗        | ✗        | ✓     |
| Performance Reviews | View          | ✓               | ✓          | ✗           | ✓ (team) | ✓ (own)  | ✓     |
| Performance Reviews | Submit        | ✓               | ✓          | ✗           | ✓ (team) | ✓ (self) | ✓     |
| PIP                 | Create        | ✓               | ✓          | ✗           | ✓        | ✗        | ✓     |
| PIP                 | View          | ✓               | ✓          | ✗           | ✓        | ✓ (own)  | ✓     |
| Training            | Create/Assign | ✓               | ✓          | ✗           | ✓        | ✗        | ✓     |
| Training            | View Records  | ✓               | ✓          | ✗           | ✓ (team) | ✓ (own)  | ✓     |
| Onboarding          | Manage        | ✓               | ✓          | ✗           | ✓ (team) | ✗        | ✓     |
| Offboarding         | Initiate      | ✓               | ✓          | ✗           | ✓        | ✗        | ✓     |
| Exit Interviews     | View          | ✓               | ✓          | ✗           | ✗        | ✗        | ✓     |
| HR Reports          | Generate      | ✓               | ✓          | ✓ (limited) | ✓ (team) | ✗        | ✓     |
| Org Chart           | View          | ✓               | ✓          | ✓           | ✓        | ✓        | ✓     |

### Complete State Management

```typescript
interface HRState {
  employees: {
    items: EmployeeSummary[];
    selectedEmployee: EmployeeDetail | null;
    filters: EmployeeFilters;
    pagination: PaginationState;
    loading: "idle" | "pending" | "succeeded" | "failed";
    saving: boolean;
  };
  recruitment: {
    jobs: JobPosting[];
    selectedJob: JobPostingDetail | null;
    candidates: Candidate[];
    pipeline: { [stage: string]: Candidate[] };
    filters: RecruitmentFilters;
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
  leave: {
    requests: LeaveRequest[];
    selectedRequest: LeaveRequestDetail | null;
    balances: LeaveBalance[];
    filters: LeaveFilters;
    calendarView: Date;
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
  attendance: {
    dailyRegister: AttendanceRecord[];
    weeklySummary: WeeklyAttendance[];
    selectedDate: string;
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
  performance: {
    cycles: ReviewCycle[];
    selectedCycle: ReviewCycleDetail | null;
    reviews: PerformanceReview[];
    pips: PIP[];
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
  onboarding: {
    records: OnboardingRecord[];
    selectedRecord: OnboardingDetail | null;
    templates: ChecklistTemplate[];
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
  offboarding: {
    records: OffboardingRecord[];
    selectedRecord: OffboardingDetail | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
  training: {
    catalog: Training[];
    employeeRecords: EmployeeTrainingRecord[];
    complianceData: ComplianceSummary;
    filters: TrainingFilters;
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
  dashboard: {
    data: HRDashboardData | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
}
```

### RTK Query Cache Invalidation Strategy

- **Employee mutations** → invalidate `Employees`, `Dashboard`, `OrgChart`
- **Recruitment mutations** → invalidate `Recruitment`, `Dashboard`
- **Leave mutations** → invalidate `Leave`, `LeaveBalances`, `Dashboard`
- **Attendance mutations** → invalidate `Attendance`, `Dashboard`
- **Review mutations** → invalidate `Performance`, `Dashboard`
- **Training mutations** → invalidate `Training`, `Compliance`
- **Onboarding/Offboarding mutations** → invalidate `Onboarding`, `Offboarding`
- Optimistic updates for: leave approval, task completion, status changes

### Complete Zod Validation Schemas

```typescript
export const employeeCreateSchema = z.object({
  firstName: z.string().min(1, "First name required").max(100),
  lastName: z.string().min(1, "Last name required").max(100),
  workEmail: z.string().email("Valid email required"),
  personalEmail: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  employeeId: z.string().min(1, "Employee ID required").max(20),
  departmentId: z.string().uuid("Select department"),
  position: z.string().min(1, "Position required").max(200),
  managerId: z.string().uuid().optional(),
  employmentType: z.enum(["full_time", "part_time", "contract", "internship", "temporary"]),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  probationEndDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  baseSalary: z.number().positive("Salary must be positive").optional(),
  payFrequency: z.enum(["weekly", "biweekly", "semi_monthly", "monthly"]).optional(),
});

export const leaveRequestSchema = z
  .object({
    employeeId: z.string().uuid(),
    leaveType: z.enum([
      "vacation",
      "sick",
      "personal",
      "maternity",
      "paternity",
      "bereavement",
      "jury_duty",
      "unpaid",
    ]),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    reason: z.string().max(1000).optional(),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be after start date",
  });

export const jobPostingSchema = z.object({
  title: z.string().min(1, "Title required").max(200),
  departmentId: z.string().uuid().optional(),
  employmentType: z.enum(["full_time", "part_time", "contract", "internship"]),
  location: z.string().max(200).optional(),
  salaryMin: z.number().int().positive().optional(),
  salaryMax: z.number().int().positive().optional(),
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.string().min(1, "Requirements required"),
  responsibilities: z.string().min(1, "Responsibilities required"),
  skills: z.array(z.string()).optional(),
  closingDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  hiringManagerId: z.string().uuid().optional(),
});

export const performanceReviewSchema = z.object({
  employeeId: z.string().uuid(),
  cycleId: z.string().uuid(),
  ratings: z.record(z.string(), z.number().min(1).max(5)),
  strengths: z.string().max(2000).optional(),
  areasForImprovement: z.string().max(2000).optional(),
  goals: z
    .array(
      z.object({
        goal: z.string().max(500),
        timeline: z.string().max(200).optional(),
      }),
    )
    .optional(),
  overallComment: z.string().max(3000).optional(),
  developmentPlan: z.string().max(2000).optional(),
});

export const onboardingTaskSchema = z.object({
  taskName: z.string().min(1, "Task name required").max(200),
  category: z.enum(["it", "hr", "facilities", "training", "team"]),
  assigneeId: z.string().uuid("Select assignee").optional(),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

export const trainingAssignmentSchema = z.object({
  employeeIds: z.array(z.string().uuid()).min(1, "Select at least one employee"),
  trainingId: z.string().uuid("Select training"),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sendEmail: z.boolean().default(true),
});

export const attendanceAdjustmentSchema = z.object({
  employeeId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  clockIn: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional(),
  clockOut: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional(),
  reason: z.string().min(10, "Please provide a detailed reason").max(500),
});
```

### Complete Analytics Events

| Event Name                 | Properties                                       | Trigger                | Destination |
| -------------------------- | ------------------------------------------------ | ---------------------- | ----------- |
| hr_dashboard_viewed        | `{totalEmployees, openPositions, pendingLeaves}` | Dashboard load         | PostHog     |
| hr_employee_created        | `{department, employmentType}`                   | Employee created       | PostHog     |
| hr_employee_terminated     | `{department, reason, tenure}`                   | Employee terminated    | PostHog     |
| hr_job_published           | `{title, department, salaryRange}`               | Job published          | PostHog     |
| hr_candidate_stage_changed | `{jobId, fromStage, toStage}`                    | Pipeline move          | PostHog     |
| hr_offer_sent              | `{jobId, salary, candidateSource}`               | Offer sent             | PostHog     |
| hr_offer_accepted          | `{jobId, salary, timeToAccept}`                  | Offer accepted         | PostHog     |
| hr_offer_declined          | `{jobId, salary, reason}`                        | Offer declined         | PostHog     |
| hr_leave_approved          | `{leaveType, duration, department}`              | Leave approved         | PostHog     |
| hr_leave_rejected          | `{leaveType, duration}`                          | Leave rejected         | PostHog     |
| hr_attendance_missing      | `{employeeCount, date}`                          | Missing punch detected | PostHog     |
| hr_attendance_adjusted     | `{employeeId}`                                   | Manual adjustment      | PostHog     |
| hr_review_cycle_created    | `{reviewType, employeeCount}`                    | Cycle created          | PostHog     |
| hr_review_submitted        | `{reviewType, overallRating}`                    | Review submitted       | PostHog     |
| hr_pip_created             | `{department}`                                   | PIP created            | PostHog     |
| hr_training_assigned       | `{trainingId, employeeCount}`                    | Training assigned      | PostHog     |
| hr_training_completed      | `{trainingId, score}`                            | Training completed     | PostHog     |
| hr_onboarding_started      | `{department}`                                   | Onboarding begins      | PostHog     |
| hr_onboarding_completed    | `{department, duration}`                         | Onboarding done        | PostHog     |
| hr_offboarding_started     | `{department, reason}`                           | Offboarding begins     | PostHog     |
| hr_report_generated        | `{reportType, department}`                       | Report generated       | PostHog     |

### Comprehensive Accessibility Requirements

- **Employee table**: `role="grid"`, `aria-label="Employee directory"`, sortable columns with `aria-sort`
- **Recruitment kanban**: `role="list"` per column, `aria-label="Candidate pipeline — {stage} stage"`, draggable cards `aria-grabbed`
- **Leave calendar**: `role="grid"`, date cells `aria-label="June 15, 2025 — 3 employees on leave"`
- **Org chart**: `role="tree"`, nodes `role="treeitem"`, `aria-expanded` for expandable managers
- **Forms**: All inputs with `aria-label` or `aria-labelledby`, validation `aria-invalid="true"`, error `aria-describedby`
- **Modals**: Focus trap, `aria-modal="true"`, `aria-labelledby` referencing modal title, Escape to close
- **Status badges**: Color + icon + text for color-blind users, `role="status"`
- **Charts**: `role="img"`, `aria-label` describing data, provide data table
- **File upload**: `role="button"`, keyboard accessible, progress indication
- **Pagination**: `nav aria-label="Pagination"`, `aria-current="page"`
- **Keyboard shortcuts**: `Ctrl+K` search, `j/k` navigate list, `Enter` open detail, `Escape` close
- **Skip navigation**: "Skip to main content" link at top of layout
- **Focus management**: Detail panel opens → focus moves to heading. Close → focus returns to trigger
- **Reduced motion**: Respect `prefers-reduced-motion`, disable kanban animations, chart transitions
- **High contrast**: All status indicators meet 4.5:1 contrast ratio
- **Screen reader announcements**: `aria-live="polite"` for list updates, `assertive` for errors

### HR Officer Career Path & Role Progression

- **HR Assistant** → Entry level. Manages employee records, processes leave requests, schedules interviews, maintains files.
- **HR Coordinator** → Mid level. Coordinates recruitment cycles, manages onboarding/offboarding, supports performance review process.
- **HR Generalist** → Mid-Senior. Handles employee relations, benefits administration, policy implementation, compliance tracking.
- **Recruiter** → Mid level. Full-cycle recruitment: sourcing, screening, interviewing, offer negotiation, pipeline management.
- **HR Business Partner** → Senior. Strategic partnership with departments, workforce planning, organizational development, conflict resolution.
- **HR Manager** → Senior leadership. Team management, policy development, HR analytics, labor law compliance, employee engagement.
- **Payroll & Benefits Specialist** → Mid level. Manages payroll input, benefits administration, 401k, health insurance, leave of absence.
- **Head of People / CHRO** → Executive. Strategic HR leadership, culture building, talent strategy, DEI initiatives, board reporting.

### HR Onboarding 30-60-90 Day Plan Template

**Days 1-30: Foundation**

- Company orientation and policy review
- IT setup: laptop, email, software access, security badges
- Introduction to team and key stakeholders
- Complete required compliance training (harassment, security, safety)
- Set up payroll, benefits enrollment, direct deposit
- Assign mentor/buddy
- 30-day check-in meeting with manager

**Days 31-60: Integration**

- Begin core job responsibilities
- Complete role-specific training
- Attend departmental meetings and cross-functional introductions
- Set SMART goals for first quarter
- Review probation progress with manager
- Provide initial feedback on onboarding experience

**Days 61-90: Contribution**

- Take ownership of assigned projects
- Demonstrate understanding of role and expectations
- Complete 90-day performance evaluation
- Finalize probation period (if applicable)
- Set development goals for remainder of year
- 90-day check-in with HR and manager

### HR Offboarding Exit Interview Template

```
Exit Interview Form
Employee Name: {employeeName}
Position: {position}
Department: {department}
Manager: {managerName}
Last Working Day: {lastDay}
Tenure: {tenure} years

1. Reason for Leaving (select all that apply):
   [ ] Career change / New opportunity
   [ ] Compensation / Benefits
   [ ] Work-life balance
   [ ] Management / Leadership
   [ ] Company culture
   [ ] Relocation
   [ ] Retirement
   [ ] Health / Personal reasons
   [ ] Other: ___________

2. What did you enjoy most about working at CEA?
   _____________________________________________

3. What could have been improved?
   _____________________________________________

4. How would you rate your overall experience? (1-5)
   [1] [2] [3] [4] [5]

5. Would you recommend CEA as an employer? (Yes/No/Maybe)
   Why or why not?
   _____________________________________________

6. What could have been done to retain you?
   _____________________________________________

7. Additional comments:
   _____________________________________________

Signed: ____________________ Date: ______________
```

### Detailed HR Weekly / Monthly Process Schedule

**Daily Processes:**

- Review and approve pending leave requests (target: < 24h SLA)
- Monitor attendance register for missing punches
- Respond to employee inquiries via messaging
- Approve/decline urgent time-off requests

**Weekly Processes:**

- Review new hire onboarding progress (Mon AM)
- Process weekly payroll changes/timesheet approvals (Wed)
- Update recruitment pipeline status (Thu)
- Send training compliance reminders (Fri)
- Weekly headcount report to management (Fri PM)

**Monthly Processes:**

- Process monthly payroll input & handoff to accounting (by 20th)
- New hire orientation session (1st week)
- Benefits administration (enrollment changes, terminations)
- Update employee records (status changes, promotions, transfers)
- Monthly HR report (headcount, turnover, leave, training)
- Review pending performance reviews

**Quarterly Processes:**

- Performance review cycle checkpoints
- Training needs assessment
- Diversity & inclusion metrics review
- Compensation benchmark review
- Employee engagement survey
- Quarterly compliance audit (I-9s, certifications, training)

**Annual Processes:**

- Annual performance review cycle launch
- Salary review and merit increase process
- Benefits open enrollment
- Training budget planning
- Employee satisfaction survey
- HR policy review and updates
- Employment law compliance audit
- W-2 and year-end compliance
- Annual HR report to board

### Complete HR Report Templates

**Headcount Report:**

| Department  | Budgeted | Active  | Vacancies | New Hires | Terminations | Turnover % |
| ----------- | -------- | ------- | --------- | --------- | ------------ | ---------- |
| Engineering | 25       | 23      | 2         | 3         | 1            | 4.3%       |
| Operations  | 15       | 15      | 0         | 1         | 0            | 0%         |
| ...         | ...      | ...     | ...       | ...       | ...          | ...        |
| **Total**   | **120**  | **115** | **5**     | **12**    | **4**        | **3.4%**   |

**Leave Utilization Report:**

| Department  | Vacation Used | Sick Used | Personal Used | Avg Days/Employee | Utilization % |
| ----------- | ------------- | --------- | ------------- | ----------------- | ------------- |
| Engineering | 145           | 38        | 12            | 8.5               | 62%           |
| ...         | ...           | ...       | ...           | ...               | ...           |

**Training Compliance Report:**

| Training              | Required | Completed | Overdue | Compliance % |
| --------------------- | -------- | --------- | ------- | ------------ |
| Security Awareness    | 120      | 118       | 2       | 98.3%        |
| Harassment Prevention | 120      | 115       | 5       | 95.8%        |
| Data Privacy          | 80       | 72        | 8       | 90.0%        |
