# Actor: Parent / Guardian

## 1. Identity & Role Definition

**Actor Name:** Parent / Guardian  
**System Role ID:** `role_parent`  
**Description:** A parent, legal guardian, or family member of an enrolled current student. This actor has visibility into their child's academic journey — grades, attendance, financial obligations, communication — but limited write access. They are not enrolled students themselves but have a dedicated portal to monitor and support their child's education.

**Relationship Types:**

1. **Biological Parent** — Full access via verified relationship
2. **Legal Guardian** — Court-appointed, same access as parent
3. **Financial Sponsor** — May only see finance-related information
4. **Emergency Contact** — Limited to attendance/emergency info only

**Access Levels:**

- **Full Access:** Grades, attendance, assignments, messages, communication, finance
- **Financial Only:** Invoices, payments, payment methods
- **Emergency Only:** Attendance, emergency notifications

**Lifecycle:**

1. **Invited** — Parent receives invitation link from student account
2. **Registered** — Creates account, links to student
3. **Active** — Monitoring student progress regularly
4. **Inactive** — Student graduated/dropped, parent account archived

---

## 2. Primary Goals & Success KPIs

**Goal 1: Monitor Academic Progress**

- KPI: Parent checks gradebook ≥ 1x per week
- KPI: Grade drop alerts viewed within 24h
- KPI: Report card download rate per term

**Goal 2: Track Attendance & Participation**

- KPI: Attendance threshold alerts acknowledged
- KPI: Absence notifications opened rate ≥ 80%

**Goal 3: Manage Financial Obligations**

- KPI: On-time payment rate ≥ 98%
- KPI: Invoice viewed within 48h of issuance
- KPI: Payment method kept current (not expired)

**Goal 4: Communicate with Academy**

- KPI: Messages to instructors replied within 2 business days
- KPI: Parent-teacher conference attendance ≥ 1 per term
- KPI: Satisfaction survey completion rate

**Goal 5: Receive Timely Updates**

- KPI: Notification read rate ≥ 85%
- KPI: Weekly digest open rate ≥ 60%

---

## 3. Complete Screen Inventory

### Screen 3.1: Parent Dashboard (`/parent/dashboard`)

**Purpose:** At-a-glance overview of all linked students' status.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Parent Portal                                      [Profile]│
│  Welcome, Sarah!                                [Settings]  │
├─────────────────────────────────────────────────────────────┤
│  My Students (1)                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 👤 Alex Johnson — Cybersecurity Fundamentals         │  │
│  │  ⭐ GPA: 3.72    ✅ Attendance: 92%                  │  │
│  │  📝 Pending: Lab 4 (Due Fri)                        │  │
│  │  📊 Current term: Fall 2026                          │  │
│  │  [View Full Report →]  [Contact Advisor →]          │  │
│  └──────────────────────────────────────────────────────┘  │
├─────────────────┬──────────────────┬───────────────────────┤
│  Recent Grades  │  Upcoming        │  Alerts & Notices     │
│  ┌───────────┐  │  ┌───────────┐   │  ┌─────────────────┐ │
│  │ Cryptog.  │  │  │ Lab 4 due │   │  │ ⚠ Attendance   │ │
│  │ A (94%)   │  │  │ Nov 3     │   │  │ below 85% in   │ │
│  │ Networks  │  │  │ Midterm   │   │  │ Network Defense │ │
│  │ B+ (88%) │  │  │ Nov 15    │   │  ├─────────────────┤ │
│  │ Fndmntls  │  │  │ P-T Conf  │   │  │ 📬 New message  │ │
│  │ A- (91%)  │  │  │ Nov 20    │   │  │ from Prof.     │ │
│  └───────────┘  │  └───────────┘   │  │ Smith           │ │
│                 │                  │  └─────────────────┘ │
│  [View All →]   │  [Calendar →]   │                       │
└─────────────────┴──────────────────┴───────────────────────┘
│  Quick Actions:                                              │
│  [Message Instructor] [Download Report] [Make Payment]      │
│  [Schedule Conference] [View Schedule]                       │
└─────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/parent/dashboard`

**States:**

- **Loading:** Skeleton cards per student
- **Empty (no students linked):** "No students linked to your account. Contact admissions to link a student."
- **Error:** Dashboard fails → "Unable to load dashboard. [Retry]"
- **Multiple students:** Carousel or list of student cards

### Screen 3.2: Student Overview (`/parent/students/[id]/overview`)

**Purpose:** Deep dive into a single student's comprehensive status.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                                        │
│  Alex Johnson — Student Overview                            │
├─────────────────────────────────────────────────────────────┤
│  Student Info Card                                           │
│  [Photo] Alex Johnson                                       │
│  Student #: CEA-STU-2026-00421   | Program: Cybersecurity   │
│  Start: Sep 1, 2026 | Expected Grad: Jun 2027              │
│  Advisor: Prof. Smith | Cohort: CF-2026-Fall-A             │
├───────────────┬─────────────────────────────────────────────┤
│  Quick Stats  │  Grade Overview                             │
│  GPA: 3.72    │  ┌──────────────────────────────────────┐  │
│  Rank: Top 15%│  │ Course              │ Grd │ Ltr      │  │
│  Credits: 12  │  │ Network Defense     │ 88% │ B+       │  │
│  Completed: 6 │  │ Cryptography        │ 94% │ A        │  │
│  In Progress:4│  │ Security Found.     │ 91% │ A-       │  │
│  Attendance:  │  │ Ethics & Comp.      │ 85% │ B        │  │
│  92%          │  └──────────────────────────────────────┘  │
│  [Full Report]│  [View Detailed Gradebook →]               │
├───────────────┴─────────────────────────────────────────────┤
│  Recent Activity                                              │
│  ● Scored 92% on "Cryptography Quiz" — Oct 30              │
│  ● Submitted "Lab 3: Packet Analysis" — Oct 28              │
│  ● Attended "Network Defense Module 3" — Oct 30             │
│  ● Instructor posted "Week 4 Announcement" — Oct 29         │
├─────────────────────────────────────────────────────────────┤
│  Upcoming Deadlines                                           │
│  ● Lab 4 — Fri Nov 3, 11:59 PM                              │
│  ● Midterm Exam — Nov 15                                    │
│  ● Project 1 — Nov 22                                       │
└─────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/parent/students/:id/overview`

### Screen 3.3: Academic Progress / Gradebook (`/parent/students/[id]/grades`)

**Purpose:** Full gradebook view for a student.

**Wireframe:**

```
┌─────────────────────────────────────────────────────────────┐
│  Alex Johnson — Gradebook                                    │
│  Cumulative GPA: 3.72 | Term: Fall 2026                     │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Course: Network Defense              88.5%  B+     │  │
│  │ Assignment        │ Score │ Max │ %    │ Weight    │  │
│  │ Lab 1             │ 45    │ 50  │ 90%  │ 10%       │  │
│  │ Lab 2             │ 48    │ 50  │ 96%  │ 10%       │  │
│  │ Lab 3             │ 42    │ 50  │ 84%  │ 10%       │  │
│  │ Midterm Exam      │ 85    │ 100 │ 85%  │ 30%       │  │
│  │ Final Project     │ —     │ 100 │ —    │ 40%       │  │
│  └──────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Grade Trends (sparkline chart per course)                   │
│  [Line chart showing grade progression over time]           │
├─────────────────────────────────────────────────────────────┤
│  [Download Report Card (PDF)]  [View All Courses]           │
└─────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/parent/students/:id/grades`

### Screen 3.4: Attendance Report (`/parent/students/[id]/attendance`)

**Purpose:** Detailed attendance record.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Alex Johnson — Attendance                                   │
│  Overall: 92% (46/50 sessions) | Policy min: 85%           │
├─────────────────────────────────────────────────────────────┤
│  Attendance by Course                                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Network Defense: 90% (18/20)              [Details]  │  │
│  │ Cryptography: 95% (19/20)                 [Details]  │  │
│  │ Security Foundations: 100% (9/9)           [Details]  │  │
│  └──────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Recent Absences                                             │
│  ┌────────┬───────────┬────────┬──────────┬──────────────┐ │
│  │ Date   │ Course    │ Status │ Excused  │ Notes        │ │
│  ├────────┼───────────┼────────┼──────────┼──────────────┤ │
│  │ Oct 28 │ Network   │ Absent │ Yes      │ Doctor's     │ │
│  │        │ Defense   │        │          │ note attached│ │
│  └────────┴───────────┴────────┴──────────┴──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ⚠ Attendance Policy: Below 85% triggers advisor meeting    │
└─────────────────────────────────────────────────────────────┘
```

### Screen 3.5: Finance / Billing (`/parent/students/[id]/finance`)

**Purpose:** View and manage tuition, payments, invoices.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Alex Johnson — Finance & Billing                           │
├─────────────────────────────────────────────────────────────┤
│  Balance Due: $1,225.00 (Next payment due Nov 15, 2026)    │
│  [Make a Payment →] [Auto-Pay Setup]                        │
├─────────────────────────────────────────────────────────────┤
│  Payment Plan                                                 │
│  ████████████░░░░░░░░░░░░░░░░░░ 50% paid                     │
│  4-month installment · $4,900 total · $2,450 paid           │
│  Next: $1,225 due Nov 15                                    │
│  After: $1,225 due Dec 15                                   │
├─────────────────────────────────────────────────────────────┤
│  Invoice History                                              │
│  ┌────────────┬──────────┬──────────┬────────┬──────────┐  │
│  │ INV-2026   │ Oct 1    │ $1,225   │ Paid ✓ │ [PDF]   │  │
│  │ -001       │          │          │        │         │  │
│  │ INV-2026   │ Sep 1    │ $1,225   │ Paid ✓ │ [PDF]   │  │
│  │ -000       │          │          │        │         │  │
│  └────────────┴──────────┴──────────┴────────┴──────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Payment Methods                                              │
│  ● Visa ending in 4242 [Default]            [Edit] [Remove] │
│  [Add Payment Method]                                        │
├─────────────────────────────────────────────────────────────┤
│  Scholarships & Financial Aid                                 │
│  ● Merit Scholarship: $500/sem — Active                      │
└─────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/parent/students/:id/finance`

### Screen 3.6: Communication (`/parent/students/[id]/communication`)

**Purpose:** Message instructors, view message history, schedule conferences.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┤
│  Alex Johnson — Communication                                │
├─────────────────────────────────────────────────────────────┤
│  Contact Instructors                                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Prof. Smith — Network Defense                        │  │
│  │ Last message: Oct 30 — "Thank you for your help"     │  │
│  │ [Send Message] [Schedule Conference] [View History]  │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ Dr. Jones — Cryptography                             │  │
│  │ [Send Message] [Schedule Conference]                 │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ Academic Advisor — Prof. Smith                       │  │
│  │ [Send Message] [Schedule Appointment]                │  │
│  └──────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Message History (last 20 messages)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ [Oct 30] You: "Thank you for helping Alex with..."   │  │
│  │ [Oct 29] Prof. Smith: "Alex is doing well in..."     │  │
│  │ [Oct 20] You: "I'm concerned about the recent..."    │  │
│  └──────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Scheduled Conferences                                       │
│  ● Parent-Teacher Conference — Nov 20, 2026 @ 4:00 PM     │
│    [Join] [Reschedule] [Add to Calendar]                   │
└─────────────────────────────────────────────────────────────┘
```

### Screen 3.7: Reports (`/parent/students/[id]/reports`)

**Purpose:** Generate and download various academic reports.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Alex Johnson — Reports                                      │
├─────────────────────────────────────────────────────────────┤
│  Available Reports                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 📄 Term Progress Report (Midterm)          [Download] │  │
│  │ Generated: Oct 15, 2026                               │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ 📄 Full Academic History                     [Generate]│  │
│  │ Includes all terms, courses, grades, attendance       │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ 📄 Attendance Report                         [Generate]│  │
│  │ Date range: [Start ▼] to [End ▼]  [Generate]         │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ 📄 Financial Statement                       [Generate]│  │
│  │ All payments, outstanding balance, scholarship info   │  │
│  └──────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Report Schedule                                              │
│  ● Progress reports sent every 4 weeks                       │
│  ● Report cards at end of each term                          │
│  ● Custom reports available on demand                        │
│  [Configure Report Preferences]                              │
└─────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/parent/students/:id/reports` , `POST /api/parent/students/:id/reports/generate`

---

## 4. Full Database Schema (Additional to Shared Core)

### Table: `parents`

| Column                     | Type           | Constraints       | Default                                    | Description                                                             |
| -------------------------- | -------------- | ----------------- | ------------------------------------------ | ----------------------------------------------------------------------- |
| `id`                       | `UUID`         | PK, FK → users.id | —                                          | Same as user ID                                                         |
| `relationship_type`        | `VARCHAR(50)`  | NOT NULL          | —                                          | biological_parent, legal_guardian, financial_sponsor, emergency_contact |
| `access_level`             | `VARCHAR(50)`  | NOT NULL          | `'full'`                                   | full, financial_only, emergency_only                                    |
| `is_primary`               | `BOOLEAN`      | NOT NULL          | `false`                                    | Primary contact for emergencies                                         |
| `occupation`               | `VARCHAR(200)` | NULLABLE          | —                                          | —                                                                       |
| `preferred_language`       | `VARCHAR(10)`  | NOT NULL          | `'en'`                                     | —                                                                       |
| `notification_preferences` | `JSONB`        | NOT NULL          | `'{"email":true,"push":true,"sms":false}'` | —                                                                       |
| `report_frequency`         | `VARCHAR(50)`  | NOT NULL          | `'weekly'`                                 | daily, weekly, monthly, never                                           |
| `created_at`               | `TIMESTAMPTZ`  | NOT NULL          | `NOW()`                                    | —                                                                       |
| `updated_at`               | `TIMESTAMPTZ`  | NOT NULL          | `NOW()`                                    | —                                                                       |

### Table: `student_parent_links`

| Column                   | Type          | Constraints                     | Default     | Description                |
| ------------------------ | ------------- | ------------------------------- | ----------- | -------------------------- |
| `id`                     | `UUID`        | PK                              | —           | —                          |
| `student_id`             | `UUID`        | FK → students.id, NOT NULL      | —           | —                          |
| `parent_id`              | `UUID`        | FK → parents.id, NOT NULL       | —           | —                          |
| `relationship_type`      | `VARCHAR(50)` | NOT NULL                        | —           | —                          |
| `verification_status`    | `VARCHAR(50)` | NOT NULL                        | `'pending'` | pending, verified, revoked |
| `verified_at`            | `TIMESTAMPTZ` | NULLABLE                        | —           | —                          |
| `verified_by`            | `UUID`        | FK → users.id (admin), NULLABLE | —           | —                          |
| `invitation_sent_at`     | `TIMESTAMPTZ` | NULLABLE                        | —           | —                          |
| `invitation_accepted_at` | `TIMESTAMPTZ` | NULLABLE                        | —           | —                          |
| `is_emergency_contact`   | `BOOLEAN`     | NOT NULL                        | `false`     | —                          |
| `can_make_payments`      | `BOOLEAN`     | NOT NULL                        | `false`     | —                          |
| `can_receive_reports`    | `BOOLEAN`     | NOT NULL                        | `true`      | —                          |
| `created_at`             | `TIMESTAMPTZ` | NOT NULL                        | `NOW()`     | —                          |

**Indexes:** UNIQUE(student_id, parent_id)

### Table: `parent_messages`

| Column          | Type           | Constraints                   | Default | Description    |
| --------------- | -------------- | ----------------------------- | ------- | -------------- |
| `id`            | `UUID`         | PK                            | —       | —              |
| `parent_id`     | `UUID`         | FK → parents.id, NOT NULL     | —       | —              |
| `student_id`    | `UUID`         | FK → students.id, NOT NULL    | —       | —              |
| `instructor_id` | `UUID`         | FK → instructors.id, NOT NULL | —       | —              |
| `subject`       | `VARCHAR(255)` | NOT NULL                      | —       | —              |
| `content`       | `TEXT`         | NOT NULL                      | —       | —              |
| `direction`     | `VARCHAR(10)`  | NOT NULL                      | —       | sent, received |
| `read_at`       | `TIMESTAMPTZ`  | NULLABLE                      | —       | —              |
| `created_at`    | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()` | —              |

### Table: `parent_conferences`

| Column             | Type           | Constraints                   | Default       | Description                                  |
| ------------------ | -------------- | ----------------------------- | ------------- | -------------------------------------------- |
| `id`               | `UUID`         | PK                            | —             | —                                            |
| `parent_id`        | `UUID`         | FK → parents.id, NOT NULL     | —             | —                                            |
| `student_id`       | `UUID`         | FK → students.id, NOT NULL    | —             | —                                            |
| `instructor_id`    | `UUID`         | FK → instructors.id, NOT NULL | —             | —                                            |
| `scheduled_at`     | `TIMESTAMPTZ`  | NOT NULL                      | —             | —                                            |
| `duration_minutes` | `INTEGER`      | NOT NULL                      | `30`          | —                                            |
| `meeting_url`      | `VARCHAR(500)` | NULLABLE                      | —             | Zoom/Teams link                              |
| `status`           | `VARCHAR(50)`  | NOT NULL                      | `'scheduled'` | scheduled, completed, cancelled, rescheduled |
| `notes`            | `TEXT`         | NULLABLE                      | —             | —                                            |
| `created_at`       | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()`       | —                                            |

### Table: `parent_reports`

| Column         | Type           | Constraints                | Default | Description                                    |
| -------------- | -------------- | -------------------------- | ------- | ---------------------------------------------- |
| `id`           | `UUID`         | PK                         | —       | —                                              |
| `parent_id`    | `UUID`         | FK → parents.id, NOT NULL  | —       | —                                              |
| `student_id`   | `UUID`         | FK → students.id, NOT NULL | —       | —                                              |
| `report_type`  | `VARCHAR(50)`  | NOT NULL                   | —       | progress, attendance, financial, full_academic |
| `format`       | `VARCHAR(10)`  | NOT NULL                   | `'pdf'` | pdf, csv                                       |
| `generated_at` | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()` | —                                              |
| `file_url`     | `VARCHAR(500)` | NOT NULL                   | —       | R2 object URL                                  |
| `parameters`   | `JSONB`        | NULLABLE                   | —       | Report generation params                       |

---

## 5. Complete API Contract

### `GET /api/parent/dashboard`

**Auth:** Required (parent role)

**Response:**

```typescript
interface ParentDashboardResponse {
  parent: {
    id: string;
    firstName: string;
    lastName: string;
  };
  students: ParentStudentSummary[];
  alerts: ParentAlert[];
  recentGrades: RecentGradeEvent[];
  upcomingDeadlines: DeadlineItem[];
  unreadMessages: number;
}

interface ParentStudentSummary {
  id: string;
  firstName: string;
  lastName: string;
  programName: string;
  term: string;
  gpa: number;
  attendancePercentage: number;
  pendingAssignments: number;
  status: string;
}

interface ParentAlert {
  id: string;
  type: "grade_drop" | "attendance_warning" | "payment_overdue" | "message" | "behavior";
  severity: "info" | "warning" | "critical";
  message: string;
  link: string;
  createdAt: string;
}

interface RecentGradeEvent {
  courseName: string;
  assignmentName: string;
  score: number;
  maxScore: number;
  letterGrade: string;
  gradedAt: string;
}

interface DeadlineItem {
  title: string;
  dueAt: string;
  courseName: string;
  studentName: string;
}
```

### `GET /api/parent/students/:id/overview`

**Auth:** Required (parent, linked to student)

**Response:**

```typescript
interface StudentOverviewResponse {
  student: {
    id: string;
    firstName: string;
    lastName: string;
    photoUrl: string | null;
    studentNumber: string;
    programName: string;
    term: string;
    startDate: string;
    expectedGraduation: string | null;
    advisorName: string;
    advisorEmail: string;
    cohortName: string;
  };
  stats: {
    gpa: number;
    rank: string | null;
    creditsEarned: number;
    completedItems: number;
    inProgressItems: number;
    attendancePercentage: number;
  };
  courseGrades: CourseGradeSummary[];
  recentActivity: ActivityItem[];
  upcomingDeadlines: DeadlineItem[];
}
```

### `GET /api/parent/students/:id/grades`

**Auth:** Required (parent, linked)

**Response:**

```typescript
interface ParentGradesResponse {
  studentName: string;
  cumulativeGpa: number;
  courseGrades: CourseGradeDetail[];
  gradeTrend: { date: string; gpa: number }[];
}

interface CourseGradeDetail {
  courseId: string;
  courseTitle: string;
  averageScore: number;
  letterGrade: string | null;
  gradeItems: {
    id: string;
    title: string;
    type: string;
    score: number | null;
    maxScore: number;
    percentage: number | null;
    weight: number;
    gradedAt: string | null;
  }[];
}
```

### `GET /api/parent/students/:id/attendance`

**Auth:** Required (parent, linked)

**Response:**

```typescript
interface ParentAttendanceResponse {
  overallPercentage: number;
  policyThreshold: number;
  totalSessions: number;
  attendedSessions: number;
  excusedAbsences: number;
  unexcusedAbsences: number;
  courseRecords: {
    courseId: string;
    courseTitle: string;
    percentage: number;
    records: {
      date: string;
      status: "present" | "absent" | "excused" | "late";
      excused: boolean;
      notes: string | null;
    }[];
  }[];
  isBelowThreshold: boolean;
}
```

### `GET /api/parent/students/:id/finance`

**Auth:** Required (parent, linked, can_make_payments or financial_only access)

**Response:**

```typescript
interface ParentFinanceResponse {
  studentName: string;
  totalBalance: number;
  currency: string;
  paymentPlan: {
    type: string;
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    nextPayment: { amount: number; dueDate: string } | null;
  };
  invoices: InvoiceSummary[];
  paymentMethods: SavedPaymentMethod[];
  scholarships: { name: string; amount: number; status: string }[];
}
```

### `POST /api/parent/students/:id/finance/pay`

**Auth:** Required (parent, linked, can_make_payments)

**Request:**

```typescript
interface ParentPayRequest {
  invoiceId?: string; // Specific invoice or null for balance
  amount: number;
  paymentMethodId: string;
  savePaymentMethod?: boolean;
}
```

**Response:**

```typescript
interface ParentPayResponse {
  paymentIntentId: string;
  clientSecret: string; // Stripe client secret
  requiresAction: boolean; // 3D Secure
}
```

### `GET /api/parent/students/:id/communication`

**Auth:** Required (parent, linked)

**Response:**

```typescript
interface ParentCommunicationResponse {
  instructors: {
    id: string;
    name: string;
    courseName: string;
    title: string;
    email: string;
    avatarUrl: string | null;
    lastMessage: { content: string; createdAt: string; direction: string } | null;
  }[];
  messageHistory: {
    id: string;
    instructorId: string;
    instructorName: string;
    subject: string;
    content: string;
    direction: "sent" | "received";
    readAt: string | null;
    createdAt: string;
  }[];
  conferences: {
    id: string;
    instructorName: string;
    scheduledAt: string;
    durationMinutes: number;
    meetingUrl: string | null;
    status: string;
  }[];
}
```

### `POST /api/parent/students/:id/messages`

**Auth:** Required (parent, linked)

**Request:**

```typescript
interface SendParentMessageRequest {
  instructorId: string;
  subject: string;
  content: string;
}
```

**Response:** `{ message: ParentMessage }`

### `POST /api/parent/students/:id/conferences`

**Auth:** Required (parent, linked)

**Request:**

```typescript
interface ScheduleConferenceRequest {
  instructorId: string;
  scheduledAt: string; // ISO 8601
  durationMinutes?: number; // Default: 30
  notes?: string;
}
```

**Response:** `{ conference: ParentConference }`

### `GET /api/parent/students/:id/reports`

**Auth:** Required (parent, linked)

**Query:** `type?: string`

**Response:**

```typescript
interface ParentReportsResponse {
  availableReports: {
    id: string;
    type: string;
    label: string;
    generatedAt: string | null;
    fileUrl: string | null;
  }[];
}
```

### `POST /api/parent/students/:id/reports/generate`

**Auth:** Required (parent, linked)

**Request:**

```typescript
interface GenerateReportRequest {
  type: "progress" | "attendance" | "financial" | "full_academic";
  startDate?: string;
  endDate?: string;
  format?: "pdf" | "csv";
}
```

**Response:** `{ report: { id: string; fileUrl: string; generatedAt: string } }`

### `POST /api/parent/invitation/accept`

**Auth:** Required (parent)

**Request:**

```typescript
interface AcceptInvitationRequest {
  token: string; // Invitation token from email
  firstName?: string;
  lastName?: string;
  password?: string; // If new account; null if existing account linking
}
```

**Response:** `{ parent: ParentProfile; linkedStudent: StudentSummary }`

### `GET /api/parent/settings`

**Auth:** Required (parent)

**Response:**

```typescript
interface ParentSettingsResponse {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    preferredLanguage: string;
    occupation: string | null;
  };
  notificationPreferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
    gradeAlerts: boolean;
    attendanceAlerts: boolean;
    paymentAlerts: boolean;
    weeklyDigest: boolean;
    conferenceReminders: boolean;
  };
  reportPreferences: {
    frequency: "daily" | "weekly" | "monthly" | "never";
    format: "pdf" | "email_summary";
    includeAttendance: boolean;
    includeGrades: boolean;
    includeBehavior: boolean;
  };
}
```

### `PUT /api/parent/settings`

**Auth:** Required (parent)

**Request:** Partial update of settings

---

## 6. Component Tree

```
ParentLayout
├── ParentNavBar
│   ├── Logo (links to /parent/dashboard)
│   ├── StudentSwitcher (dropdown if multiple students)
│   ├── NotificationBell (alerts count)
│   ├── MessageIndicator (unread count)
│   └── ParentUserMenu (Settings, Help, Logout)
│
├── ParentDashboard
│   ├── WelcomeHeader
│   ├── StudentCardList
│   │   └── StudentCard[]
│   │       ├── StudentAvatar
│   │       ├── StudentName
│   │       ├── ProgramBadge
│   │       ├── GPAIndicator
│   │       ├── AttendanceIndicator
│   │       ├── PendingCount
│   │       ├── ViewFullReportButton
│   │       └── ContactAdvisorButton
│   ├── RecentGradesWidget
│   │   └── GradeEventRow[] (course, assignment, score, letter, date)
│   ├── UpcomingWidget
│   │   └── DeadlineItem[] (title, due, course)
│   ├── AlertsWidget
│   │   └── AlertItem[] (icon, message, severity, link, dismiss)
│   └── QuickActionsRow
│       ├── QuickActionButton("Message Instructor")
│       ├── QuickActionButton("Download Report")
│       ├── QuickActionButton("Make Payment")
│       └── QuickActionButton("Schedule Conference")
│
├── StudentOverviewPage
│   ├── BackButton
│   ├── StudentInfoCard (photo, name, number, program, advisor, cohort)
│   ├── QuickStatsGrid
│   │   ├── StatCard("GPA", value, trend)
│   │   ├── StatCard("Rank", value)
│   │   ├── StatCard("Credits", value)
│   │   ├── StatCard("Completed", value)
│   │   └── StatCard("Attendance", value, color)
│   ├── GradeOverviewTable (course, score, letter, link to details)
│   └── ActivityFeed
│       └── ActivityItem[] (icon, text, timestamp)
│
├── ParentGradebookPage
│   ├── StudentHeader
│   ├── CumulativeGpaDisplay
│   ├── CourseGradeAccordion[]
│   │   ├── CourseHeader (title, avg, letter)
│   │   └── GradeItemsTable (name, score, max, %, weight)
│   └── GradeTrendChart (sparkline)
│
├── ParentAttendancePage
│   ├── StudentHeader
│   ├── OverallAttendanceCircle (percentage + policy threshold)
│   ├── CourseAttendanceList
│   │   └── CourseAttendanceRow[]
│   │       ├── CourseTitle
│   │       ├── PercentageBar
│   │       └── AttendanceTable (date, status, excused, notes)
│   └── PolicyBanner (if below threshold)
│
├── ParentFinancePage
│   ├── StudentHeader
│   ├── BalanceCard (total, next due, pay button)
│   ├── PaymentPlanProgress (bar, paid/remaining)
│   ├── InvoiceTable (number, date, amount, status, PDF download)
│   ├── PaymentMethodsSection
│   │   ├── PaymentMethodCard[] (type, last4, expiry, default badge)
│   │   └── AddPaymentMethodButton
│   ├── StripePaymentForm (embedded Elements)
│   └── ScholarshipsCard (name, amount, status)
│
├── ParentCommunicationPage
│   ├── StudentHeader
│   ├── InstructorContactList
│   │   └── InstructorCard[]
│   │       ├── Avatar
│   │       ├── Name, Course, Title
│   │       ├── LastMessagePreview
│   │       ├── SendMessageButton
│   │       ├── ScheduleConferenceButton
│   │       └── ViewHistoryButton
│   ├── MessageHistoryPanel (scrollable list)
│   │   └── MessageBubble[] (content, timestamp, sent/received styling)
│   ├── ComposeMessageModal
│   │   ├── InstructorSelect
│   │   ├── SubjectInput
│   │   ├── RichTextEditor
│   │   └── SendButton
│   ├── ConferenceSchedulerModal
│   │   ├── InstructorSelect
│   │   ├── DatePicker (weekdays only, 9am-5pm)
│   │   ├── TimeSlotPicker (30-min slots)
│   │   ├── NotesTextArea
│   │   └── ScheduleButton
│   └── ConferenceList (scheduled, past)
│       └── ConferenceCard[] (instructor, date, time, status, join/reschedule)
│
├── ParentReportsPage
│   ├── StudentHeader
│   ├── ReportCard[]
│   │   ├── ReportIcon, Title
│   │   ├── Description
│   │   ├── DownloadButton (if exists) / GenerateButton
│   │   └── GeneratedDate
│   ├── CustomReportForm
│   │   ├── ReportTypeSelect
│   │   ├── DateRangePicker
│   │   ├── FormatSelect
│   │   └── GenerateButton
│   └── ReportPreferences
│       ├── FrequencySelect
│       ├── FormatToggle
│       └── SaveButton
│
├── ParentSettings
│   ├── ProfileSection (name, email, phone, language)
│   ├── NotificationPreferences (toggles per category)
│   ├── ReportPreferences (frequency, format, sections)
│   ├── PasswordSection (change password)
│   └── LinkedStudentsSection (list of linked students, relationship)
│
└── ParentHelpPage
    ├── FAQAccordion
    ├── ContactSupportForm
    └── KnowledgeBaseSearch
```

---

## 7. Exhaustive User Journeys

### Journey 7.1: Initial Account Setup & Linking

```
Prerequisite: Student is enrolled. Parent email on file.

Step 1: Parent receives invitation email:
  "You've been invited to monitor Alex Johnson's progress at Cyber Elias Academy"
  CTA: "Accept Invitation →"

Step 2: Parent clicks link → /parent/invitation/accept?token=abc123
  → System validates token (lookup student_parent_links where invitation token matches)
  → Token is valid → show account setup page

Step 3: Parent creates account:
  → Option A: "I'm new here" → registration form
    → Name, email (prefilled), password
    → Relationship: "Biological Parent"
    → Consent to terms
    → POST /api/auth/register + POST /api/parent/invitation/accept
  → Option B: "I already have an account" → login
    → POST /api/auth/login + POST /api/parent/invitation/accept

Step 4: Success → redirect to /parent/dashboard
  → Dashboard shows Alex's card with GPA, attendance, pending
  → Welcome modal: "You're all set! Here's what you can do..."
  → Notification: "Your account has been linked to Alex Johnson."

Alternative Paths:
  Step 2a: Token expired (72h window) → "This invitation has expired. Contact the academy to resend."
  Step 2b: Token invalid → "Invalid invitation link. Please check the URL or contact support."
  Step 2c: Already linked → "This student is already linked to your account." → redirect to dashboard
  Step 3a: Parent wants to link multiple students → repeat process or admin does mass link
```

### Journey 7.2: Regular Monitoring — Checking Grades

```
Step 1: Parent receives weekly email digest: "Alex's Weekly Progress Report"
  → Shows GPA: 3.72, New grades: 2, Attendance: 92%
  → CTA: "View Full Report →"

Step 2: Parent logs in → /parent/dashboard
  → Sees grade alert: "Alex scored 85% on Midterm Exam (Network Defense)"
  → Clicks "View Full Report →" on Alex's card

Step 3: /parent/students/{id}/overview
  → Sees GPA: 3.72, Course breakdown
  → Network Defense: 88.5% B+ — down from 91% last week
  → Clicks Network Defense → /parent/students/{id}/grades?courseId=net-defense

Step 4: Grade detail shows midterm 85/100 (85%)
  → Parent sees it dropped due to midterm
  → Concerned, clicks "Contact Instructor" button
  → Opens compose message modal, writes to Prof. Smith:
    "Hi Prof. Smith, I noticed Alex's midterm score was lower than expected. Any feedback?"
  → Clicks Send

Step 5: Prof. Smith replies (may be same day or next)
  → Parent receives notification → reads reply
  → "Alex performed well on labs but struggled with the encryption section. I've recommended review sessions."

Alternative Paths:
  Step 2a: No new grades → dashboard still shows current snapshot
  Step 4a: Parent clicks "Download Report" instead → PDF generated → downloaded
  Step 4b: Parent wants to discuss further → "Schedule Conference" → picks time slot
```

### Journey 7.3: Attendance Concern

```
Step 1: System detects Alex missed 3 sessions in Network Defense
  → Attendance drops to 82% (below 85% threshold)
  → Automated alert generated for parent

Step 2: Parent logs in → sees critical alert banner:
  "⚠ Attendance Alert: Alex's attendance in Network Defense is 82% (below 85% threshold)."

Step 3: Parent clicks alert → /parent/students/{id}/attendance
  → Sees overall 92% (good) but Network Defense at 82% (red)
  → Recent absences table: Oct 28 (absent, excused), Oct 21 (absent, unexcused), Oct 14 (absent, excused)

Step 4: Parent notes Oct 21 is unexcused
  → Clicks "Submit Excuse" → opens form:
    - Date: Oct 21 (prefilled)
    - Reason: dropdown (illness, appointment, family, other)
    - Note: "Alex had a doctor's appointment. Please excuse."
    - Attach: uploaded note.pdf
  → Submits → POST /api/student/attendance/:id/excuse

Step 5: Instructor reviews → marks as excused
  → Attendance recalculates to 85% (back at threshold)
  → Parent notified: "Excuse approved for Oct 21 absence."

Alternative:
  Step 3: Parent sees unexcused absences are valid → ignores → attendance continues to drop
  Step 4: No excuse available → schedules meeting with advisor
```

### Journey 7.4: Making a Tuition Payment

```
Step 1: Parent receives payment reminder email:
  "Your next payment of $1,225 is due Nov 15, 2026"
  CTA: "Make a Payment →"

Step 2: Parent clicks → /parent/students/{id}/finance
  → Shows balance: $1,225 due Nov 15
  → Payment plan progress: 50% paid
  → Saved cards: Visa ending in 4242

Step 3: Parent clicks "Make a Payment"
  → Selects amount: $1,225 (full due)
  → Selects payment method: Visa ending 4242
  → Checks "Save payment method for future" (default)
  → Clicks "Pay Now"

Step 4: Stripe payment form appears (3D Secure if needed)
  → Parent authenticates via bank app
  → Payment succeeds → POST /api/parent/students/:id/finance/pay

Step 5: Success!
  → Green success banner: "Payment of $1,225 successful!"
  → Invoice status updates to "Paid"
  → Receipt available for download
  → Email receipt sent

Alternative Paths:
  Step 3a: No saved card → "Add Payment Method" → Stripe elements → save card
  Step 4a: Payment fails → "Payment declined. Please try a different card."
  Step 4b: Insufficient funds → "Transaction declined by bank."
  Step 5a: Parent wants to pay partial → enter custom amount
  Step 5b: Parent sets up auto-pay → toggle on → future payments automatic
```

### Journey 7.5: Parent-Teacher Conference

```
Step 1: Parent sees "Parent-Teacher Conference" notice in dashboard
  → Clicks "Schedule Conference"

Step 2: /parent/students/{id}/communication → ConferenceSchedulerModal
  → Selects instructor: Prof. Smith
  → Date picker: Nov 20, 2026 (available weekday)
  → Time slots: 4:00 PM (30 min)
  → Note: "Would like to discuss Alex's midterm performance"
  → Clicks "Schedule"

Step 3: Conference created → appears in conference list
  → "Pending Confirmation" → instructor needs to confirm
  → Parent notified when confirmed

Step 4: Day of conference:
  → Reminder notification 24h before: "Conference with Prof. Smith tomorrow at 4:00 PM"
  → Reminder 15min before: "Join your conference"
  → Parent clicks "Join" → opens Zoom/Teams link

Step 5: Conference completed → survey: "How was your conference experience?"
  → Parent rates 5/5

Alternative:
  Step 2: No available slots → "No available slots. [Request alternative time]"
  Step 3: Instructor declines → "Prof. Smith has declined. [Reschedule]" with reason
  Step 4a: Parent can't make it → "Reschedule" → pick new time
  Step 5: Conference notes auto-saved in communication history
```

### Journey 7.6: Downloading a Report Card

```
Step 1: Parent navigates to /parent/students/{id}/reports
  → Sees available reports section

Step 2: Clicks "Generate" on Full Academic History
  → POST /api/parent/students/:id/reports/generate
  → Processing... spinner for 5-10 seconds
  → PDF generated via Puppeteer
  → File URL returned

Step 3: Download button active → clicks → PDF downloads
  → PDF includes: student info, all courses with grades, GPA, attendance summary

Step 4: Parent can also configure automatic reports
  → Sets frequency to "Monthly"
  → Format: PDF
  → Saves preferences

Alternative:
  Step 2: Term Progress Report already exists → "Download" immediately
  Step 2b: Report generation fails → "Unable to generate report. Please try again."
```

---

## 8. Business Rules Engine

### BR-PA-001: Parent-Student Link Verification

- Invitation links expire after 72 hours
- Two methods: email invitation (student-side) or admin verification (ID/document check)
- A student can have up to 4 linked parents/guardians
- Link can be revoked by admin at any time
- Parent must have verified email to accept link

### BR-PA-002: Access Level Enforcement

- `full`: All screens and data visible
- `financial_only`: Only finance page visible; other pages return 403
- `emergency_only`: Only attendance and emergency alerts; dashboard shows limited view
- Data is filtered at API level, not UI level

### BR-PA-003: Parent Payment Authority

- Parent can only make payments if `can_make_payments = true` in link record
- Payment receipts include both parent and student names
- Parent refunds go back to original payment method
- Auto-pay setup requires `can_make_payments` permission

### BR-PA-004: Grade Threshold Alerts

- Alert generated when any course grade drops ≥ 5 percentage points in one week
- Alert generated when GPA drops below 3.0, 2.5, 2.0 thresholds
- Alert generated when any course grade falls below passing (70%)
- Max 1 alert per course per week (dedup window)

### BR-PA-005: Attendance Alert Rules

- Warning at 85% threshold per course
- Critical at 75% (risk of intervention)
- Alert at 60% (risk of expulsion)
- Each threshold fires exactly once; subsequent alerts only if threshold worsens

### BR-PA-006: Conference Scheduling Rules

- Conferences available Mon-Fri, 9:00 AM - 5:00 PM in institution's timezone
- 30-minute default duration, configurable by instructor
- Max 2 conferences per parent per month (to prevent abuse)
- Cancellation allowed up to 4 hours before; otherwise marked as no-show
- Auto-reminders at 24h and 15min before

### BR-PA-007: Report Generation

- Reports are cached for 24 hours; regenerating overwrites
- Progress reports include: all grades, GPA, attendance, instructor comments
- Financial reports include: invoices, payments, balance, scholarships
- Full academic reports include: complete history across all terms
- PDF generation timeout: 30 seconds

### BR-PA-008: Weekly Digest Rules

- Sent every Monday at 8:00 AM (in parent's timezone)
- Includes: new grades (since last digest), attendance changes, upcoming deadlines, alerts
- If no changes → "All is well! No significant changes this week."
- Unsubscribe available in settings

### BR-PA-009: Data Privacy

- Parent sees only their linked student(s) data — no cross-student visibility
- Parent cannot see other parents' information
- Parent cannot see student's direct messages with peers
- Parent cannot modify academic records (grades, attendance status)
- Parent consent required for data sharing with third parties

---

## 9. Notification Specifications

### N-PA-01: Invitation to Link

| Field             | Value                                                                      |
| ----------------- | -------------------------------------------------------------------------- |
| **Trigger**       | Student enrollment confirmed, parent email on file                         |
| **Channel**       | Email                                                                      |
| **Template**      | `parent_invitation`                                                        |
| **Variables**     | `{{studentName}}`, `{{acceptLink}}`, `{{expiresHours}}`, `{{academyName}}` |
| **Frequency Cap** | Max 3 invitations; resend after 7 days if not accepted                     |

### N-PA-02: Weekly Progress Digest

| Field         | Value                                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Trigger**   | Every Monday 8:00 AM                                                                                                             |
| **Channel**   | Email + In-app                                                                                                                   |
| **Template**  | `weekly_digest`                                                                                                                  |
| **Variables** | `{{studentName}}`, `{{gpa}}`, `{{newGradesCount}}`, `{{attendance}}`, `{{upcomingDeadlines}}`, `{{alerts}}`, `{{dashboardLink}}` |

### N-PA-03: Grade Drop Alert

| Field         | Value                                                                                                             |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Trigger**   | Course grade drops ≥ 5% in one week                                                                               |
| **Channel**   | Email + Push + In-app critical alert                                                                              |
| **Template**  | `grade_drop`                                                                                                      |
| **Variables** | `{{studentName}}`, `{{courseName}}`, `{{previousGrade}}`, `{{currentGrade}}`, `{{dropPercent}}`, `{{detailLink}}` |

### N-PA-04: Attendance Warning

| Field         | Value                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------- |
| **Trigger**   | Attendance drops below 85% in any course                                                 |
| **Channel**   | Email + Push + In-app                                                                    |
| **Template**  | `attendance_warning`                                                                     |
| **Variables** | `{{studentName}}`, `{{courseName}}`, `{{percentage}}`, `{{threshold}}`, `{{detailLink}}` |

### N-PA-05: Payment Reminder

| Field         | Value                                                             |
| ------------- | ----------------------------------------------------------------- |
| **Trigger**   | 7 days before due date + 3 days before                            |
| **Channel**   | Email + In-app + Push                                             |
| **Template**  | `payment_reminder_parent`                                         |
| **Variables** | `{{studentName}}`, `{{amount}}`, `{{dueDate}}`, `{{paymentLink}}` |

### N-PA-06: Payment Overdue

| Field         | Value                                                                                |
| ------------- | ------------------------------------------------------------------------------------ |
| **Trigger**   | Due date passed                                                                      |
| **Channel**   | Email + In-app (persistent) + Push                                                   |
| **Template**  | `payment_overdue_parent`                                                             |
| **Variables** | `{{studentName}}`, `{{amount}}`, `{{daysOverdue}}`, `{{lateFee}}`, `{{paymentLink}}` |

### N-PA-07: New Message from Instructor

| Field         | Value                                                                             |
| ------------- | --------------------------------------------------------------------------------- |
| **Trigger**   | Instructor sends message to parent                                                |
| **Channel**   | Email + Push + In-app                                                             |
| **Template**  | `new_message_parent`                                                              |
| **Variables** | `{{instructorName}}`, `{{studentName}}`, `{{subject}}`, `{{preview}}`, `{{link}}` |

### N-PA-08: Conference Reminder

| Field         | Value                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------- |
| **Trigger**   | 24h before + 15min before conference                                                                |
| **Channel**   | Email (24h) + Push (15min)                                                                          |
| **Template**  | `conference_reminder`                                                                               |
| **Variables** | `{{instructorName}}`, `{{studentName}}`, `{{scheduledAt}}`, `{{meetingUrl}}`, `{{durationMinutes}}` |

### N-PA-09: Report Card Available

| Field         | Value                                                               |
| ------------- | ------------------------------------------------------------------- |
| **Trigger**   | Report card generated (end of term or manual)                       |
| **Channel**   | Email + In-app                                                      |
| **Template**  | `report_available`                                                  |
| **Variables** | `{{studentName}}`, `{{reportType}}`, `{{term}}`, `{{downloadLink}}` |

### N-PA-10: Significant Event

| Field         | Value                                                               |
| ------------- | ------------------------------------------------------------------- |
| **Trigger**   | Major academic event (probation, suspension, award)                 |
| **Channel**   | Email + Phone call (for severe) + In-app                            |
| **Template**  | `significant_event`                                                 |
| **Variables** | `{{studentName}}`, `{{eventType}}`, `{{details}}`, `{{actionLink}}` |

---

## 10. Permission Matrix

| Entity           | Action    | Parent (Full) | Parent (Financial) | Parent (Emergency) | Admin      | Instructor    |
| ---------------- | --------- | ------------- | ------------------ | ------------------ | ---------- | ------------- |
| Student Overview | Read      | ✅            | ❌                 | ✅ (limited)       | ✅         | ✅            |
| Grades           | Read      | ✅            | ❌                 | ❌                 | ✅         | ✅ (assigned) |
| Attendance       | Read      | ✅            | ❌                 | ✅                 | ✅         | ✅ (assigned) |
| Assignments      | Read      | ✅            | ❌                 | ❌                 | ✅         | ✅            |
| Assignments      | Submit    | ❌            | ❌                 | ❌                 | ✅ (proxy) | ❌            |
| Finance          | Read      | ✅            | ✅                 | ❌                 | ✅         | ❌            |
| Finance          | Pay       | ✅ (if perm)  | ✅ (if perm)       | ❌                 | ✅         | ❌            |
| Messages         | Send      | ✅            | ❌                 | ❌                 | ✅         | ✅            |
| Messages         | Read      | ✅            | ❌                 | ❌                 | ✅         | ✅            |
| Conferences      | Schedule  | ✅            | ❌                 | ❌                 | ✅         | ✅            |
| Reports          | Download  | ✅            | ✅ (financial)     | ❌                 | ✅         | ✅            |
| Reports          | Generate  | ✅            | ✅ (financial)     | ❌                 | ✅         | ✅            |
| Settings         | Edit own  | ✅            | ✅                 | ✅                 | ✅         | ✅            |
| Linked Students  | View list | ✅            | ✅                 | ✅                 | ✅         | ❌            |
| Other Students   | View      | ❌            | ❌                 | ❌                 | ✅         | ❌            |

---

## 11. State Management

### Redux Slices

```typescript
// Parent Slice
interface ParentState {
  dashboard: {
    data: ParentDashboardResponse | null;
    loading: boolean;
    error: string | null;
  };
  selectedStudentId: string | null;
  studentData: Record<
    string,
    {
      overview: StudentOverviewResponse | null;
      grades: ParentGradesResponse | null;
      attendance: ParentAttendanceResponse | null;
      finance: ParentFinanceResponse | null;
      communication: ParentCommunicationResponse | null;
      reports: ParentReportsResponse | null;
      loading: boolean;
      error: string | null;
    }
  >;
  composeMessage: {
    modalOpen: boolean;
    sending: boolean;
    error: string | null;
  };
  scheduleConference: {
    modalOpen: boolean;
    availableSlots: TimeSlot[];
    submitting: boolean;
  };
  reportGeneration: {
    generating: boolean;
    error: string | null;
  };
  settings: {
    data: ParentSettingsResponse | null;
    saving: boolean;
  };
}
```

### RTK Query Endpoints

```typescript
const parentApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/parent" }),
  tagTypes: [
    "Dashboard",
    "StudentOverview",
    "Grades",
    "Attendance",
    "Finance",
    "Communication",
    "Reports",
  ],
  endpoints: (builder) => ({
    getDashboard: builder.query<ParentDashboardResponse, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
      pollingInterval: 60000, // refresh every 60s
    }),
    getStudentOverview: builder.query<StudentOverviewResponse, string>({
      query: (id) => `/students/${id}/overview`,
      providesTags: (result, err, id) => [{ type: "StudentOverview", id }],
    }),
    getGrades: builder.query<ParentGradesResponse, string>({
      query: (id) => `/students/${id}/grades`,
      providesTags: (result, err, id) => [{ type: "Grades", id }],
    }),
    getAttendance: builder.query<ParentAttendanceResponse, string>({
      query: (id) => `/students/${id}/attendance`,
      providesTags: (result, err, id) => [{ type: "Attendance", id }],
    }),
    getFinance: builder.query<ParentFinanceResponse, string>({
      query: (id) => `/students/${id}/finance`,
      providesTags: (result, err, id) => [{ type: "Finance", id }],
    }),
    makePayment: builder.mutation<ParentPayResponse, { studentId: string; data: ParentPayRequest }>(
      {
        query: ({ studentId, data }) => ({
          url: `/students/${studentId}/finance/pay`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Finance"],
      },
    ),
    getCommunication: builder.query<ParentCommunicationResponse, string>({
      query: (id) => `/students/${id}/communication`,
      providesTags: (result, err, id) => [{ type: "Communication", id }],
    }),
    sendMessage: builder.mutation<
      ParentMessage,
      { studentId: string; data: SendParentMessageRequest }
    >({
      query: ({ studentId, data }) => ({
        url: `/students/${studentId}/messages`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Communication"],
    }),
    scheduleConference: builder.mutation<
      ParentConference,
      { studentId: string; data: ScheduleConferenceRequest }
    >({
      query: ({ studentId, data }) => ({
        url: `/students/${studentId}/conferences`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Communication"],
    }),
    getReports: builder.query<ParentReportsResponse, string>({
      query: (id) => `/students/${id}/reports`,
      providesTags: (result, err, id) => [{ type: "Reports", id }],
    }),
    generateReport: builder.mutation<
      { report: any },
      { studentId: string; data: GenerateReportRequest }
    >({
      query: ({ studentId, data }) => ({
        url: `/students/${studentId}/reports/generate`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),
    getSettings: builder.query<ParentSettingsResponse, void>({
      query: () => "/settings",
    }),
    updateSettings: builder.mutation<void, Partial<ParentSettingsResponse>>({
      query: (body) => ({ url: "/settings", method: "PUT", body }),
    }),
  }),
});
```

---

## 12. Form Schemas (Zod)

### Send Message to Instructor

```typescript
export const ParentMessageSchema = z.object({
  instructorId: z.string().uuid("Select an instructor"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(255, "Subject must be under 255 characters"),
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(10000, "Message must be under 10,000 characters"),
});
```

### Schedule Conference

```typescript
export const ScheduleConferenceSchema = z.object({
  instructorId: z.string().uuid("Select an instructor"),
  scheduledAt: z
    .string()
    .datetime("Invalid date format")
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      const day = date.getDay();
      const hours = date.getHours();
      return day >= 1 && day <= 5 && hours >= 9 && hours <= 17;
    }, "Conferences must be Mon-Fri, 9AM-5PM"),
  durationMinutes: z
    .number()
    .int()
    .min(15, "Minimum 15 minutes")
    .max(60, "Maximum 60 minutes")
    .default(30),
  notes: z.string().max(2000, "Notes must be under 2,000 characters").optional(),
});
```

### Parent Payment

```typescript
export const ParentPaymentSchema = z
  .object({
    invoiceId: z.string().uuid().optional(),
    amount: z
      .number()
      .positive("Amount must be positive")
      .max(100000, "Amount cannot exceed $100,000"),
    paymentMethodId: z.string().min(1, "Select a payment method"),
    savePaymentMethod: z.boolean().default(true),
  })
  .refine((data) => {
    // Amount must be <= total due
    return true; // Server validates against actual balance
  });
```

### Report Generation

```typescript
export const GenerateReportSchema = z
  .object({
    type: z.enum(["progress", "attendance", "financial", "full_academic"]),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    format: z.enum(["pdf", "csv"]).default("pdf"),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.startDate) < new Date(data.endDate);
      }
      return true;
    },
    { message: "Start date must be before end date", path: ["endDate"] },
  );
```

### Parent Settings

```typescript
export const ParentSettingsSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  phone: z
    .string()
    .regex(/^\+?1?\d{10,15}$/)
    .optional()
    .or(z.literal("")),
  preferredLanguage: z.enum(["en", "es", "fr", "zh", "ar", "pt"]).optional(),
  notificationPreferences: z
    .object({
      email: z.boolean(),
      push: z.boolean(),
      sms: z.boolean(),
      gradeAlerts: z.boolean(),
      attendanceAlerts: z.boolean(),
      paymentAlerts: z.boolean(),
      weeklyDigest: z.boolean(),
      conferenceReminders: z.boolean(),
    })
    .partial()
    .optional(),
  reportPreferences: z
    .object({
      frequency: z.enum(["daily", "weekly", "monthly", "never"]),
      format: z.enum(["pdf", "email_summary"]),
      includeAttendance: z.boolean(),
      includeGrades: z.boolean(),
      includeBehavior: z.boolean(),
    })
    .partial()
    .optional(),
});
```

---

## 13. Analytics Events

| Event                         | Properties                              | Trigger                  |
| ----------------------------- | --------------------------------------- | ------------------------ |
| `parent_login`                | `studentCount`, `accessLevel`           | Parent logs in           |
| `parent_dashboard_view`       | `studentCount`, `alertCount`            | Dashboard loaded         |
| `parent_student_select`       | `studentId`                             | Click student card       |
| `parent_overview_view`        | `studentId`                             | Overview page loaded     |
| `parent_gradebook_view`       | `studentId`, `courseCount`              | Gradebook page loaded    |
| `parent_grade_drop_view`      | `studentId`, `courseId`, `dropAmount`   | Grade drop alert clicked |
| `parent_attendance_view`      | `studentId`, `belowThreshold`           | Attendance page loaded   |
| `parent_finance_view`         | `studentId`, `balance`                  | Finance page loaded      |
| `parent_payment_initiated`    | `studentId`, `amount`, `methodType`     | Payment form opened      |
| `parent_payment_completed`    | `studentId`, `amount`, `success`        | Payment processed        |
| `parent_payment_failed`       | `studentId`, `amount`, `failureReason`  | Payment declined         |
| `parent_message_sent`         | `studentId`, `instructorId`             | Message sent             |
| `parent_conference_scheduled` | `studentId`, `instructorId`, `duration` | Conference scheduled     |
| `parent_conference_joined`    | `conferenceId`                          | Join button clicked      |
| `parent_report_downloaded`    | `studentId`, `reportType`, `format`     | Report downloaded        |
| `parent_report_generated`     | `studentId`, `reportType`               | Report generated         |
| `parent_settings_updated`     | `section`                               | Settings saved           |
| `parent_alert_dismissed`      | `alertId`, `alertType`                  | Alert dismissed          |

---

## 14. Accessibility Requirements

**Global:**

- `role="banner"` for header, `role="main"` for main content
- `aria-label="Parent portal"` on nav
- All tables use `<table>` with `<th>` scope="col" / "row"
- Color-coded alerts (red=critical, yellow=warning, blue=info) with text labels for screen readers
- Focus management: when modal opens, focus trapped; when route changes, focus heading

**Key Components:**

- StudentCard: `aria-label="Student: {{name}}, GPA: {{gpa}}, Attendance: {{percentage}}"`, Enter to navigate
- GradeTable: `role="table"`, `aria-label="Grade breakdown for {{course}}"`, sortable columns announced
- AlertBanner: `role="alert"`, `aria-live="assertive"` for critical, `aria-live="polite"` for info
- PaymentForm: `role="form"`, `aria-label="Payment form"`, card iframe handles own accessibility
- ConferenceScheduler: Date picker with `role="dialog"`, arrow key navigation, `aria-label="Schedule conference"`
- MessageComposer: `aria-label="Compose message to {{instructorName}}"`, send button `aria-label="Send message"`
- ReportCard: `aria-label="Report: {{type}}, generated {{date}}"`, download button `aria-label="Download {{type}} report"`

---

## 15. Error & Edge Case Catalog

| #   | Scenario                          | User Message                                                               | Recovery                                            |
| --- | --------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------- |
| E1  | No linked students                | "No students are linked to your account yet."                              | Contact admin or check invitation email             |
| E2  | Student link revoked              | "Your access to view {{studentName}} has been removed."                    | Contact academy if this is an error                 |
| E3  | Payment method expired            | "Your saved card (ending in {{last4}}) has expired. [Update]"              | Add new payment method                              |
| E4  | Conference slot taken             | "This time slot is no longer available. Please select another."            | Refresh available slots                             |
| E5  | Instructor not available          | "{{instructorName}} is not accepting new conferences at this time."        | Try another instructor or contact admin             |
| E6  | Report generation timeout         | "Report generation is taking longer than expected. We'll email it to you." | Background job → email when ready                   |
| E7  | Financial data access denied      | "You don't have permission to view financial information."                 | Contact admin for access upgrade                    |
| E8  | Multiple students confused        | Parent sees wrong student data                                             | Verify student switcher, check URL params           |
| E9  | Digest email not received         | "I didn't get my weekly digest."                                           | Check spam, verify email in settings, manual resend |
| E10 | Parent tries to submit assignment | "Parents cannot submit assignments. Please have {{studentName}} submit."   | Redirect to student login                           |
| E11 | Message to wrong instructor       | "Message sent to {{instructorName}}."                                      | No recall; can send follow-up correction            |
| E12 | Conference no-show                | Parent misses conference → marked as no-show                               | Reschedule with explanation                         |
| E13 | Language preference not applied   | Interface language doesn't match                                           | Check supported languages, default to English       |
| E14 | Invoice PDF not generating        | "Unable to generate invoice PDF. [Download] [Try again]"                   | Retry or contact billing                            |
| E15 | Account merged with existing      | Parent already had account under different email                           | Merge accounts via support                          |

---

_End of Parent Actor Plan — 03_
