# Actor: Instructor

## 1. Identity & Role Definition

**Actor Name:** Instructor  
**System Role ID:** `role_instructor`  
**Description:** A faculty member who teaches courses, creates content, assesses students, marks attendance, and monitors academic analytics at Cyber Elias Academy. This actor is the primary driver of the educational experience — responsible for curriculum delivery, student evaluation, and academic guidance.

**Instructor Types:**

1. **Lead Instructor** — Full ownership of a course: creates lessons, assessments, grades, manages TAs
2. **Teaching Assistant (TA)** — Assists with grading, office hours, discussions; limited content creation
3. **Guest Lecturer** — Temporary, assigned specific lessons; no grading access
4. **Academic Advisor** — Not teaching but assigned students for guidance

**Employment States:**

1. **Active** — Currently teaching
2. **On Leave** — Temporarily not teaching (sabbatical, medical)
3. **Inactive** — No longer employed
4. **Pending Onboarding** — Hired but not yet assigned courses

---

## 2. Primary Goals & Success KPIs

**Goal 1: Deliver High-Quality Course Content**

- KPI: Course completion rate ≥ 80%
- KPI: Student satisfaction score (end-of-course survey) ≥ 4.5/5
- KPI: Content update frequency (lessons updated per term)

**Goal 2: Fair & Timely Assessment**

- KPI: Assignment grading turnaround ≤ 48 hours
- KPI: Assessment auto-grading accuracy (for quizzes) ≥ 99%
- KPI: Grade disputes resolved within 5 business days

**Goal 3: Engage & Support Students**

- KPI: Office hours utilization rate ≥ 60%
- KPI: Forum response time ≤ 4 hours (business hours)
- KPI: At-risk student interventions per term ≥ 5

**Goal 4: Maintain Academic Integrity**

- KPI: Plagiarism detection flags reviewed within 24h
- KPI: Academic integrity cases resolved per term

**Goal 5: Continuous Improvement**

- KPI: Curriculum revisions based on analytics
- KPI: Professional development hours logged
- KPI: Peer review participation rate

---

## 3. Complete Screen Inventory

### Screen 3.1: Instructor Dashboard (`/instructor/dashboard`)

**Purpose:** Central command center — upcoming classes, pending grading, student alerts, course performance.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Instructor Portal                                         │
│  Welcome, Prof. Smith                          [Profile ▼] │
├──────────────────┬──────────────────┬───────────────────────┤
│  My Courses (2)  │  Pending Grading  │  At-Risk Students    │
│  ┌────────────┐  │  ┌────────────┐  │  ┌────────────────┐  │
│  │ Network    │  │  │ Lab 4     │  │  │ ⚠ Jane Doe     │  │
│  │ Defense    │  │  │ 12 submis-│  │  │  GPA: 2.1     │  │
│  │ 24 students│  │  │ sions     │  │  │  ↓ 15% this wk │  │
│  │ [Manage →] │  │  │ [Grade →] │  │  ├────────────────┤  │
│  ├────────────┤  │  ├────────────┤  │  │ ⚠ John Smith  │  │
│  │ Cryptog.  │  │  │ Quiz 3   │  │  │  Attendance:72%│  │
│  │ 18 students│  │  │ 18 auto-  │  │  │  [Intervene →] │  │
│  │ [Manage →] │  │  │ graded ✓ │  │  └────────────────┘  │
│  └────────────┘  │  └────────────┘  │                      │
│  [Create Course] │  Total: 12       │  View All →         │
├──────────────────┴──────────────────┴──────────────────────┤
│  Today's Schedule                                            │
│  ● 10:00 AM - 11:30 AM — Network Defense (Module 3)       │
│  ● 2:00 PM - 3:30 PM — Cryptography (Module 2)             │
│  ● 4:00 PM - 5:00 PM — Office Hours                        │
├──────────────────┬──────────────────────────────────────────┤
│  Recent Activity  │  Quick Stats                            │
│  ● Graded Lab 3  │  📊 Avg class grade: 84.2%              │
│  ● Posted ann.  │  📝 Submissions pending: 12              │
│  ● Replied forum │  👥 Total students: 42                  │
│  ● Held office  │  ⏱ Office hours this week: 3h           │
└──────────────────┴──────────────────────────────────────────┘
```

**API:** `GET /api/instructor/dashboard`

**States:**

- **Loading:** Course cards skeleton, grading queue skeleton
- **Empty (no courses):** "You haven't been assigned any courses yet. Contact admin."
- **Empty (no pending grading):** "All caught up! No pending submissions."
- **Empty (no at-risk):** "All students are in good standing."
- **Error:** Dashboard fails → "Unable to load dashboard. [Retry]"

### Screen 3.2: Course Builder (`/instructor/courses` and `/instructor/courses/[id]`)

**Purpose:** Create and manage courses — structure modules, set grading weights, publish.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Course Builder — Network Defense                           │
│  Status: Published ✅                        [Preview]      │
├─────────────────────────────────────────────────────────────┤
│  Course Settings                                              │
│  Title: [Network Defense                          ]         │
│  Slug: network-defense                                      │
│  Description: [This course covers firewall...     ]         │
│  Category: [Cybersecurity ▼]                               │
│  Level: [Intermediate ▼]                                   │
│  Credits: [3]  |  Passing Grade: [70]%                     │
│  Thumbnail: [📷 Upload] | Banner: [📷 Upload]             │
│  Instructor: Prof. Smith                                    │
├─────────────────────────────────────────────────────────────┤
│  Grading Breakdown (must sum to 100%)                       │
│  Assignments: [40]% | Assessments: [30]%                   │
│  Projects: [20]% | Participation: [10]%                    │
│  ⚠ Total: 100% ✅                                           │
├─────────────────────────────────────────────────────────────┤
│  Modules: [Add Module]                                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Module 1: Foundations (6 lessons, 2 weeks)     🖊🗑  │  │
│  │   → 1.1 Intro to Network Defense          🖊 [▷]    │  │
│  │   → 1.2 OSI Model Review                  🖊 [▷]    │  │
│  │   → 1.3 Common Threats                    🖊 [▷]    │  │
│  │   → 1.4 Quiz: Foundations                 🖊 [▷]    │  │
│  │   → 1.5 Lab: Network Mapping              🖊 [▷]    │  │
│  │   [Add Lesson]                                        │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ Module 2: Firewall Configuration                      │  │
│  │ (3 lessons, 1 week) — coming soon             🖊🗑   │  │
│  └──────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  [Save Draft]  [Publish]  [Unpublish]  [Archive Course]    │
└─────────────────────────────────────────────────────────────┘
```

**API:** `GET/PUT /api/instructor/courses/:id`, `POST /api/instructor/courses`

### Screen 3.3: Lesson Creator (`/instructor/lessons/create` or `edit/[id]`)

**Purpose:** Author lesson content — video, article, quiz, coding exercise, assignment.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Lesson Creator — Edit: Symmetric Encryption                │
│  Course: Cryptography > Module 3 > Lesson 13                │
├─────────────────────────────────────────────────────────────┤
│  Content Type: [📹 Video ▼]                                 │
├─────────────────────────────────────────────────────────────┤
│  Title: [Symmetric Encryption                       ]     │
│  Description: [Covers AES, DES, and key management   ]    │
│  Duration (min): [35]                                      │
│  Is Required: [✅]  |  Is Preview: [⬜]                    │
├─────────────────────────────────────────────────────────────┤
│  Video Section                                               │
│  [Upload Video] or [Import URL] [___________]              │
│  Current: symmetric_encryption_v2.mp4 (245MB)              │
│  [Replace]  [Remove]  [Generate Transcript]                │
│  Captions: [Upload SRT] [Auto-Generate]                    │
├─────────────────────────────────────────────────────────────┤
│  Key Takeaways                                               │
│  1. [AES is a symmetric encryption algorithm          ] [×] │
│  2. [Uses same key for encryption and decryption     ] [×] │
│  3. [Key sizes: 128, 192, 256 bits                   ] [×] │
│  [Add Takeaway]                                             │
├─────────────────────────────────────────────────────────────┤
│  Attachments                                                 │
│  [Upload File] — PDF, ZIP, code files, etc.                │
│  ● slides_symmetric_encryption.pdf                  [Remove]│
├─────────────────────────────────────────────────────────────┤
│  [Save Draft]  [Publish]  [Preview Lesson]  [Delete]       │
└─────────────────────────────────────────────────────────────┘
```

**Content Type Switching:**

- Video: upload to Mux/Cloudflare Stream, transcript, captions, key takeaways
- Article: Rich text editor (TipTap/Quill), code syntax highlighting, images
- Quiz: Question editor (add/edit/reorder questions, set correct answers)
- Coding Exercise: Code editor setup, test cases, expected output
- Assignment: Instructions, rubric builder, file attachments, due date

### Screen 3.4: Assignment Center (`/instructor/assignments`)

**Purpose:** Create, manage, and grade all assignments across courses.

**Wireframe:**

```
┌─────────────────────────────────────────────────────────────┐
│  Assignment Center                              [New +]     │
│  [All] [Network Defense] [Cryptography]                    │
├─────────────────────────────────────────────────────────────┤
│  Published Assignments                                       │
│  ┌────────────┬──────────┬────────┬─────────┬───────────┐  │
│  │ Title      │ Course   │ Due    │ Submis- │ Graded    │  │
│  ├────────────┼──────────┼────────┼─────────┼───────────┤  │
│  │ Lab 4      │ Network  │ Nov 3  │ 12/24   │ 0/12      │  │
│  │            │ Defense  │        │         │ [Grade →] │  │
│  │ Quiz 3     │ Crypto   │ Oct 30 │ 18/18   │ 18/18 ✓   │  │
│  │ Lab 3      │ Network  │ Oct 28 │ 24/24   │ 24/24 ✓   │  │
│  └────────────┴──────────┴────────┴─────────┴───────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Draft Assignments                                           │
│  ● Final Project — Network Defense — Due Dec 15             │
│    [Continue Editing] [Publish]                             │
└─────────────────────────────────────────────────────────────┘
```

### Screen 3.5: Assignment Grader (`/instructor/assignments/[id]/grade`)

**Purpose:** Grade submissions with rubric, give feedback, track progress.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Assignments                                       │
│  Grading: Lab 4 — Packet Analysis                           │
│  Student: Alex Johnson                     [3 of 12] ◀ ▶   │
├────────────────┬────────────────────────────────────────────┤
│  Submission    │  Grading Panel                             │
│  ┌──────────┐  │  Rubric                                    │
│  │ Files:   │  │  ┌─────────────────────────────────────┐  │
│  │  • analy-│  │  │ Criterion            │Max│Score     │  │
│  │  sis.pdf │  │  │ Packet Capture       │25 │ [20]     │  │
│  │  • packet│  │  │ Analysis Quality     │25 │ [22]     │  │
│  │  .pcap   │  │  │ Report Structure     │25 │ [18]     │  │
│  ├──────────┤  │  │ Recommendations      │25 │ [15]     │  │
│  │ Preview  │  │  │ Total: 100           │   │ 75       │  │
│  │ [pdf.js] │  │  └─────────────────────────────────────┘  │
│  └──────────┘  │  Grade: 75/100 (75%) — C                  │
│                 │  Letter Grade: [C ▼] (auto-calculated)    │
│                 │                                            │
│                 │  Feedback:                                  │
│                 │  [Good analysis but your recommend-       │
│                 │   ations section needs more detail...     │
│                 │                                        ]  │
│                 │                                            │
│                 │  Resubmit Allowed: [⬜]                    │
│                 │                                            │
│                 │  [Save Draft]  [Submit Grade]  [Skip]     │
└─────────────────┴────────────────────────────────────────────┘
```

**Rubric Auto-Calc:** Sum of criterion scores = total grade, letter grade auto-mapped.

**States:**

- **Loading:** Submission and grading panel skeletons
- **Empty (no submissions):** "No submissions to grade."
- **All graded:** "All submissions graded for this assignment."
- **Error:** "Failed to load submission. [Retry] [Skip to next]"

### Screen 3.6: Assessment Engine (`/instructor/assessments`)

**Purpose:** Create quizzes/exams, review results, manage question banks.

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Assessment Manager                             [New Quiz]  │
├─────────────────────────────────────────────────────────────┤
│  Question Bank                                                │
│  [All] [Multiple Choice] [Multiple Answer] [Code] [Essay]   │
│  🔍 [Search questions...]                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Q: "Which is symmetric encryption?"  MC  Crypto   🖊🗑│  │
│  │ Q: "Explain the Diffie-Hellman..."  Essay Crypto  🖊🗑│  │
│  └──────────────────────────────────────────────────────┘  │
│  [Add Question]  [Import from Bank]                        │
├─────────────────────────────────────────────────────────────┤
│  Active Assessments                                          │
│  ┌────────────┬────────┬────────┬────────┬───────────────┐  │
│  │ Title      │ Course │ Due    │ Avgs   │ Actions       │  │
│  ├────────────┼────────┼────────┼────────┼───────────────┤  │
│  │ Quiz 3     │ Crypto │ Oct 30 │ 86.7%  │ [Results]     │  │
│  │ Midterm    │ NetDef │ Nov 15 │ —      │ [Schedule →]  │  │
│  └────────────┴────────┴────────┴────────┴───────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Screen 3.7: Gradebook Management (`/instructor/gradebook`)

**Purpose:** View and manage all student grades, adjust weights, handle disputes.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Gradebook — Network Defense                                │
│  Course Avg: 84.2% | Median: 86% | Std Dev: 12.3           │
├─────────────────────────────────────────────────────────────┤
│  [Adjust Grading Weights]  [Export CSV]  [Post Grades]     │
├─────────────────────────────────────────────────────────────┤
│  Student │  Lab1 │ Lab2 │ Lab3 │ Mid │ Final│ Total │ Ltr │
│  Alex J  │ 90%  │ 96%  │ 84%  │ 85% │ —    │ 88.5% │ B+  │
│  Jane D  │ 70%  │ 65%  │ 72%  │ 68% │ —    │ 68.8% │ D+ ⚠│
│  John S  │ 100% │ 95%  │ 98%  │ 92% │ —    │ 96.3% │ A   │
├─────────────────────────────────────────────────────────────┤
│  ⚠ Grade Disputes (2)                                       │
│  ● Jane Doe — Lab 2 score: claims grading error       [Review]│
│  ● Mike Brown — Midterm: alleges incorrect scoring    [Review]│
└─────────────────────────────────────────────────────────────┘
```

### Screen 3.8: Attendance Marker (`/instructor/attendance`)

**Purpose:** Take attendance for live/online sessions.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Attendance — Network Defense                                │
│  Session: Module 3 — Oct 30, 2026 2:00 PM                   │
├─────────────────────────────────────────────────────────────┤
│  Student List (24)                                            │
│  🔍 [Search student...]                                      │
│  ┌──────────────┬──────────┬──────────────────────────────┐ │
│  │ Student Name │ Status   │ Notes                        │ │
│  ├──────────────┼──────────┼──────────────────────────────┤ │
│  │ Alex Johnson │ ✅ Present│                              │ │
│  │ Jane Doe     │ ❌ Absent │ [Submit Excuse]             │ │
│  │ John Smith   │ ⏳ Late   │ Arrived 2:10 PM             │ │
│  │ Sarah Lee    │ ✅ Present│                              │ │
│  │ Mike Brown   │ ❌ Absent │ No show                      │ │
│  └──────────────┴──────────┴──────────────────────────────┘ │
│  Bulk Actions: [Mark All Present] [Mark All Absent]         │
│  [Save Attendance]  [Cancel Session]                        │
└─────────────────────────────────────────────────────────────┘
```

**Auto-save:** Status changes saved immediately via API.  
**Integration:** For online classes, attendance can auto-mark based on login/join-time.

### Screen 3.9: Analytics (`/instructor/analytics`)

**Purpose:** Data-driven insights on student performance, engagement, content effectiveness.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Analytics — Network Defense                                 │
│  [Overview] [Engagement] [Performance] [Content]           │
├─────────────────────────────────────────────────────────────┤
│  Course Overview                                             │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │ Avg Grade│ Pass Rate│ Drop Off │ Retention│ Satis.   │  │
│  │ 84.2%    │ 92%      │ 8%       │ 95%      │ 4.6/5    │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Grade Distribution (histogram)                              │
│  ■■■■■■■■■■ A: 6                                            │
│  ■■■■■■■ B: 5                                               │
│  ■■■■■■ C: 4                                                │
│  ■■■■■■■■ D/F: 2                                            │
├─────────────────────────────────────────────────────────────┤
│  Lesson Drop-off Analysis                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Lesson 13: Crypto — 85% watch to 50%, 62% to 100%   │  │
│  │ Lesson 14: Crypto — 92% watch to 50%, 78% to 100%   │  │
│  └──────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  At-Risk Predictions                                         │
│  ● Jane Doe — 94% probability of course failure             │
│  ● Mike Brown — 72% probability of dropping out            │
└─────────────────────────────────────────────────────────────┘
```

### Screen 3.10: Calendar (`/instructor/calendar`)

**Purpose:** Manage teaching schedule, office hours, events.

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Calendar                        [+ New Event]              │
│  ◀ November 2026 ▶              [Week] [Month] [Day]       │
├────┬────┬────┬────┬────┬────┬───────────────────────────────┤
│ Sun│ Mon│ Tue│ Wed│ Thu│ Fri│ Sat                           │
├────┼────┼────┼────┼────┼────┼───────────────────────────────┤
│    │  1 │  2 │  3 │  4 │  5 │  6                            │
│    │ 10a│    │ Qu│    │Lab │                               │
│    │ Net│    │ iz│    │Due │                               │
│    │ Def│    │   │    │    │                               │
├────┼────┼────┼────┼────┼────┼───────────────────────────────┤
│    │  8 │  9 │ 10 │ 11 │ 12 │ 13                            │
│    │Office│  │    │    │    │                               │
│    │Hours│   │    │    │    │                               │
└────┴────┴────┴────┴────┴────┴───────────────────────────────┘
│  Today: 10:00 AM — Network Defense, 2:00 PM — Crypto       │
│  Office Hours: Mon 4-5 PM, Wed 3-4 PM                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Full Database Schema (Additional to Shared Core)

### Table: `instructors`

| Column              | Type           | Constraints       | Default    | Description                         |
| ------------------- | -------------- | ----------------- | ---------- | ----------------------------------- |
| `id`                | `UUID`         | PK, FK → users.id | —          | —                                   |
| `employee_id`       | `VARCHAR(20)`  | UNIQUE, NOT NULL  | —          | CEA-INST-YYYY-NNNNN                 |
| `title`             | `VARCHAR(100)` | NOT NULL          | —          | Professor, Lecturer, TA, etc.       |
| `department`        | `VARCHAR(100)` | NULLABLE          | —          | —                                   |
| `specialization`    | `JSONB`        | NULLABLE          | —          | Array of specializations            |
| `bio`               | `TEXT`         | NULLABLE          | —          | Public biography                    |
| `avatar_url`        | `VARCHAR(500)` | NULLABLE          | —          | —                                   |
| `office_location`   | `VARCHAR(200)` | NULLABLE          | —          | Room number or virtual              |
| `office_hours`      | `JSONB`        | NULLABLE          | —          | {day: start-end} schedule           |
| `max_courses`       | `INTEGER`      | NOT NULL          | `3`        | —                                   |
| `employment_status` | `VARCHAR(50)`  | NOT NULL          | `'active'` | active, on_leave, inactive, pending |
| `rating`            | `DECIMAL(2,1)` | NULLABLE          | —          | Computed from student surveys       |
| `created_at`        | `TIMESTAMPTZ`  | NOT NULL          | `NOW()`    | —                                   |
| `updated_at`        | `TIMESTAMPTZ`  | NOT NULL          | `NOW()`    | —                                   |

### Table: `course_instructors`

| Column          | Type          | Constraints                   | Default  | Description     |
| --------------- | ------------- | ----------------------------- | -------- | --------------- |
| `course_id`     | `UUID`        | FK → courses.id, NOT NULL     | —        | —               |
| `instructor_id` | `UUID`        | FK → instructors.id, NOT NULL | —        | —               |
| `role`          | `VARCHAR(50)` | NOT NULL                      | `'lead'` | lead, ta, guest |
| `created_at`    | `TIMESTAMPTZ` | NOT NULL                      | `NOW()`  | —               |

**PK:** (course_id, instructor_id)

### Table: `lesson_attachments`

| Column            | Type           | Constraints               | Default | Description |
| ----------------- | -------------- | ------------------------- | ------- | ----------- |
| `id`              | `UUID`         | PK                        | —       | —           |
| `lesson_id`       | `UUID`         | FK → lessons.id, NOT NULL | —       | —           |
| `file_name`       | `VARCHAR(255)` | NOT NULL                  | —       | —           |
| `file_size_bytes` | `INTEGER`      | NOT NULL                  | —       | —           |
| `mime_type`       | `VARCHAR(100)` | NOT NULL                  | —       | —           |
| `r2_key`          | `VARCHAR(500)` | NOT NULL                  | —       | —           |
| `sort_order`      | `INTEGER`      | NOT NULL                  | `0`     | —           |
| `created_at`      | `TIMESTAMPTZ`  | NOT NULL                  | `NOW()` | —           |

### Table: `question_bank`

| Column           | Type           | Constraints                   | Default    | Description                                                               |
| ---------------- | -------------- | ----------------------------- | ---------- | ------------------------------------------------------------------------- |
| `id`             | `UUID`         | PK                            | —          | —                                                                         |
| `instructor_id`  | `UUID`         | FK → instructors.id, NOT NULL | —          | Owner                                                                     |
| `course_id`      | `UUID`         | FK → courses.id, NULLABLE     | —          | Null = shared                                                             |
| `question_type`  | `VARCHAR(50)`  | NOT NULL                      | —          | multiple_choice, multiple_answer, true_false, short_answer, coding, essay |
| `question_text`  | `TEXT`         | NOT NULL                      | —          | Rich text                                                                 |
| `options`        | `JSONB`        | NULLABLE                      | —          | For MC/MA: array of {id, text, correct}                                   |
| `correct_answer` | `JSONB`        | NULLABLE                      | —          | Flexible format per type                                                  |
| `explanation`    | `TEXT`         | NULLABLE                      | —          | Shown after quiz                                                          |
| `points`         | `DECIMAL(5,2)` | NOT NULL                      | `1.00`     | Default point value                                                       |
| `difficulty`     | `VARCHAR(20)`  | NOT NULL                      | `'medium'` | easy, medium, hard                                                        |
| `tags`           | `JSONB`        | NULLABLE                      | —          | Array of tags for search                                                  |
| `usage_count`    | `INTEGER`      | NOT NULL                      | `0`        | Times used in quizzes                                                     |
| `created_at`     | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()`    | —                                                                         |
| `updated_at`     | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()`    | —                                                                         |

### Table: `assessment_questions` (junction for assessments)

| Column          | Type           | Constraints                     | Default | Description         |
| --------------- | -------------- | ------------------------------- | ------- | ------------------- |
| `assessment_id` | `UUID`         | FK → assessments.id, NOT NULL   | —       | —                   |
| `question_id`   | `UUID`         | FK → question_bank.id, NOT NULL | —       | —                   |
| `sort_order`    | `INTEGER`      | NOT NULL                        | —       | —                   |
| `points`        | `DECIMAL(5,2)` | NOT NULL                        | —       | Overrides default   |
| `shuffle_order` | `INTEGER`      | NULLABLE                        | —       | Randomized position |

### Table: `grade_overrides`

| Column           | Type           | Constraints                   | Default | Description           |
| ---------------- | -------------- | ----------------------------- | ------- | --------------------- |
| `id`             | `UUID`         | PK                            | —       | —                     |
| `grade_item_id`  | `UUID`         | FK → grades.id, NOT NULL      | —       | —                     |
| `instructor_id`  | `UUID`         | FK → instructors.id, NOT NULL | —       | —                     |
| `previous_score` | `DECIMAL(5,2)` | NOT NULL                      | —       | —                     |
| `new_score`      | `DECIMAL(5,2)` | NOT NULL                      | —       | —                     |
| `reason`         | `TEXT`         | NOT NULL                      | —       | Why override was made |
| `created_at`     | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()` | —                     |

### Table: `course_analytics`

| Column             | Type           | Constraints               | Default | Description      |
| ------------------ | -------------- | ------------------------- | ------- | ---------------- |
| `id`               | `UUID`         | PK                        | —       | —                |
| `course_id`        | `UUID`         | FK → courses.id, NOT NULL | —       | —                |
| `date`             | `DATE`         | NOT NULL                  | —       | Snapshot date    |
| `avg_grade`        | `DECIMAL(5,2)` | NULLABLE                  | —       | —                |
| `pass_rate`        | `DECIMAL(5,2)` | NULLABLE                  | —       | —                |
| `drop_off_rate`    | `DECIMAL(5,2)` | NULLABLE                  | —       | —                |
| `retention_rate`   | `DECIMAL(5,2)` | NULLABLE                  | —       | —                |
| `engagement_score` | `DECIMAL(5,2)` | NULLABLE                  | —       | Composite metric |
| `at_risk_count`    | `INTEGER`      | NULLABLE                  | —       | —                |
| `created_at`       | `TIMESTAMPTZ`  | NOT NULL                  | `NOW()` | —                |

**Indexes:** UNIQUE(course_id, date)

### Table: `lesson_analytics`

| Column               | Type           | Constraints               | Default | Description |
| -------------------- | -------------- | ------------------------- | ------- | ----------- |
| `id`                 | `UUID`         | PK                        | —       | —           |
| `lesson_id`          | `UUID`         | FK → lessons.id, NOT NULL | —       | —           |
| `date`               | `DATE`         | NOT NULL                  | —       | —           |
| `total_views`        | `INTEGER`      | NOT NULL                  | `0`     | —           |
| `unique_viewers`     | `INTEGER`      | NOT NULL                  | `0`     | —           |
| `avg_completion_pct` | `DECIMAL(5,2)` | NOT NULL                  | `0`     | —           |
| `avg_watch_time_sec` | `INTEGER`      | NULLABLE                  | —       | For video   |
| `drop_off_25pct`     | `INTEGER`      | NOT NULL                  | `0`     | —           |
| `drop_off_50pct`     | `INTEGER`      | NOT NULL                  | `0`     | —           |
| `drop_off_75pct`     | `INTEGER`      | NOT NULL                  | `0`     | —           |
| `drop_off_100pct`    | `INTEGER`      | NOT NULL                  | `0`     | —           |
| `created_at`         | `TIMESTAMPTZ`  | NOT NULL                  | `NOW()` | —           |

### Table: `announcements`

| Column          | Type           | Constraints                   | Default    | Description               |
| --------------- | -------------- | ----------------------------- | ---------- | ------------------------- |
| `id`            | `UUID`         | PK                            | —          | —                         |
| `course_id`     | `UUID`         | FK → courses.id, NOT NULL     | —          | —                         |
| `instructor_id` | `UUID`         | FK → instructors.id, NOT NULL | —          | —                         |
| `title`         | `VARCHAR(255)` | NOT NULL                      | —          | —                         |
| `content`       | `TEXT`         | NOT NULL                      | —          | —                         |
| `priority`      | `VARCHAR(20)`  | NOT NULL                      | `'normal'` | normal, important, urgent |
| `is_pinned`     | `BOOLEAN`      | NOT NULL                      | `false`    | —                         |
| `published_at`  | `TIMESTAMPTZ`  | NULLABLE                      | —          | —                         |
| `created_at`    | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()`    | —                         |
| `updated_at`    | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()`    | —                         |

### Table: `office_hours_slots`

| Column          | Type           | Constraints                   | Default | Description         |
| --------------- | -------------- | ----------------------------- | ------- | ------------------- |
| `id`            | `UUID`         | PK                            | —       | —                   |
| `instructor_id` | `UUID`         | FK → instructors.id, NOT NULL | —       | —                   |
| `day_of_week`   | `INTEGER`      | NOT NULL                      | —       | 0=Sun, 1=Mon, ...   |
| `start_time`    | `TIME`         | NOT NULL                      | —       | —                   |
| `end_time`      | `TIME`         | NOT NULL                      | —       | —                   |
| `location`      | `VARCHAR(200)` | NULLABLE                      | —       | Room or meeting URL |
| `max_students`  | `INTEGER`      | NOT NULL                      | `5`     | Per slot            |
| `is_active`     | `BOOLEAN`      | NOT NULL                      | `true`  | —                   |
| `created_at`    | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()` | —                   |

---

## 5. Complete API Contract

### `GET /api/instructor/dashboard`

**Auth:** Required (instructor role)

**Response:**

```typescript
interface InstructorDashboardResponse {
  instructor: {
    id: string;
    name: string;
    title: string;
  };
  courses: InstructorCourseSummary[];
  pendingGrading: {
    assignmentId: string;
    assignmentTitle: string;
    courseName: string;
    submissionCount: number;
    gradedCount: number;
  }[];
  atRiskStudents: {
    id: string;
    name: string;
    courseName: string;
    riskType: "grade" | "attendance";
    metric: number;
    trend: "down" | "up" | "stable";
  }[];
  todaySchedule: CalendarEvent[];
  recentActivity: ActivityItem[];
  quickStats: {
    avgClassGrade: number;
    pendingSubmissions: number;
    totalStudents: number;
    officeHoursThisWeek: number;
  };
}

interface InstructorCourseSummary {
  id: string;
  title: string;
  studentCount: number;
  role: "lead" | "ta" | "guest";
  status: string;
}
```

### `GET /api/instructor/courses`

**Auth:** Required (instructor)

**Response:** `{ courses: InstructorCourseDetail[] }`

### `GET /api/instructor/courses/:id`

**Auth:** Required (instructor assigned or admin)

**Response:**

```typescript
interface CourseDetailResponse {
  course: CourseSettings;
  modules: ModuleWithLessonsInstructor[];
  gradingBreakdown: GradingBreakdown;
  students: StudentEnrollmentBrief[];
}

interface CourseSettings {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  level: string;
  credits: number;
  passingGrade: number;
  thumbnailUrl: string | null;
  bannerUrl: string | null;
  status: "draft" | "published" | "archived";
  instructorId: string;
  instructorName: string;
}

interface GradingBreakdown {
  assignments: number; // percentage
  assessments: number;
  projects: number;
  participation: number;
  total: number; // must equal 100
}

interface ModuleWithLessonsInstructor {
  id: string;
  title: string;
  sortOrder: number;
  estimatedHours: number;
  lessons: LessonSummary[];
}

interface LessonSummary {
  id: string;
  title: string;
  sortOrder: number;
  contentType: string;
  durationMinutes: number;
  isRequired: boolean;
  isPreview: boolean;
  status: "draft" | "published";
  studentCompletionRate: number | null;
}
```

### `POST /api/instructor/courses`

**Auth:** Required (instructor)

**Request:**

```typescript
interface CreateCourseRequest {
  title: string;
  description: string;
  category: string;
  level: string;
  credits?: number;
  passingGrade?: number;
  gradingBreakdown: GradingBreakdown;
}
```

### `PUT /api/instructor/courses/:id`

**Auth:** Required (instructor, owner)

**Request:** Partial update of course settings

### `POST /api/instructor/courses/:id/modules`

**Auth:** Required (instructor)

**Request:**

```typescript
interface CreateModuleRequest {
  title: string;
  description?: string;
  estimatedHours?: number;
  afterModuleId?: string; // Insert after this module
}
```

### `POST /api/instructor/lessons`

**Auth:** Required (instructor)

**Request:**

```typescript
interface CreateLessonRequest {
  moduleId: string;
  title: string;
  contentType: "video" | "article" | "quiz" | "coding_exercise" | "assignment";
  contentData?: Record<string, any>;
  durationMinutes?: number;
  isRequired?: boolean;
  isPreview?: boolean;
  afterLessonId?: string;
}
```

### `PUT /api/instructor/lessons/:id`

**Auth:** Required (instructor, course owner)

**Request:**

```typescript
interface UpdateLessonRequest {
  title?: string;
  contentData?: Record<string, any>;
  durationMinutes?: number;
  isRequired?: boolean;
  isPreview?: boolean;
  videoUrl?: string;
  transcript?: string;
  keyTakeaways?: string[];
  attachments?: File[];
}
```

### `POST /api/instructor/lessons/:id/publish`

**Auth:** Required (instructor)

**Response:** `{ lesson: LessonSummary }`

### `GET /api/instructor/assignments`

**Auth:** Required (instructor)

**Query:** `courseId?: string, filter?: 'pending' | 'published' | 'draft'`

**Response:**

```typescript
interface InstructorAssignmentsResponse {
  assignments: {
    id: string;
    title: string;
    courseName: string;
    courseId: string;
    dueAt: string;
    totalSubmissions: number;
    gradedSubmissions: number;
    status: "draft" | "published";
    avgScore: number | null;
  }[];
}
```

### `GET /api/instructor/assignments/:id/submissions`

**Auth:** Required (instructor)

**Query:** `page?: number, status?: 'submitted' | 'graded'`

**Response:**

```typescript
interface SubmissionsResponse {
  assignment: {
    id: string;
    title: string;
    rubric: RubricCriterion[] | null;
    pointsPossible: number;
  };
  submissions: SubmissionForGrading[];
  pagination: Pagination;
}

interface SubmissionForGrading {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string | null;
  attemptNumber: number;
  submittedAt: string;
  status: "submitted" | "graded" | "returned";
  files: { name: string; url: string; size: number }[];
  submissionText: string | null;
  comments: string | null;
  grade: number | null;
  letterGrade: string | null;
}
```

### `POST /api/instructor/assignments/:id/submissions/:submissionId/grade`

**Auth:** Required (instructor)

**Request:**

```typescript
interface GradeSubmissionRequest {
  rubricScores?: Record<string, number>; // criterionId → score
  totalScore: number;
  maxScore: number;
  feedback: string;
  allowResubmission?: boolean;
  status: "graded" | "returned";
}
```

**Response:** `{ submission: SubmissionForGrading }`

### `POST /api/instructor/assessments`

**Auth:** Required (instructor)

**Request:**

```typescript
interface CreateAssessmentRequest {
  courseId: string;
  moduleId?: string;
  title: string;
  assessmentType: "quiz" | "midterm" | "final" | "practice";
  timeLimitMinutes?: number;
  maxAttempts?: number;
  passingScore?: number;
  shuffleQuestions?: boolean;
  showResults?: boolean;
  questionIds: { questionId: string; points: number; sortOrder: number }[];
}
```

### `GET /api/instructor/assessments/:id/results`

**Auth:** Required (instructor)

**Response:**

```typescript
interface AssessmentResultsResponse {
  assessment: { title: string; type: string; maxScore: number };
  results: {
    studentId: string;
    studentName: string;
    attemptNumber: number;
    score: number;
    percentage: number;
    passed: boolean;
    timeSpentSeconds: number;
    submittedAt: string;
    answers: { questionId: string; answer: any; correct: boolean; points: number }[];
  }[];
  statistics: {
    avgScore: number;
    medianScore: number;
    highestScore: number;
    lowestScore: number;
    stdDev: number;
    passRate: number;
  };
}
```

### `GET /api/instructor/gradebook`

**Auth:** Required (instructor)

**Query:** `courseId: string`

**Response:**

```typescript
interface InstructorGradebookResponse {
  course: {
    id: string;
    title: string;
    avgGrade: number;
    medianGrade: number;
    stdDev: number;
  };
  gradebook: GradebookRow[];
  disputes: GradeDispute[];
}

interface GradebookRow {
  studentId: string;
  studentName: string;
  grades: Record<string, number | null>; // assignmentId → score
  totalScore: number;
  letterGrade: string | null;
  isAtRisk: boolean;
}

interface GradeDispute {
  id: string;
  studentId: string;
  studentName: string;
  assignmentTitle: string;
  reason: string;
  openedAt: string;
  status: "open" | "resolved";
}
```

### `POST /api/instructor/gradebook/disputes/:id/resolve`

**Auth:** Required (instructor)

**Request:**

```typescript
interface ResolveDisputeRequest {
  resolution: "upheld" | "overturned" | "partial";
  newScore?: number;
  notes: string;
}
```

### `POST /api/instructor/gradebook/override`

**Auth:** Required (instructor)

**Request:**

```typescript
interface GradeOverrideRequest {
  gradeItemId: string;
  newScore: number;
  reason: string;
}
```

### `POST /api/instructor/attendance`

**Auth:** Required (instructor)

**Request:**

```typescript
interface MarkAttendanceRequest {
  courseId: string;
  sessionDate: string; // ISO date
  records: {
    studentId: string;
    status: "present" | "absent" | "excused" | "late";
    notes?: string;
  }[];
}
```

### `GET /api/instructor/attendance/:courseId`

**Auth:** Required (instructor)

**Query:** `date?: string`

### `GET /api/instructor/analytics/:courseId`

**Auth:** Required (instructor)

**Query:** `period?: 'week' | 'month' | 'term'`

**Response:**

```typescript
interface AnalyticsResponse {
  overview: {
    avgGrade: number;
    passRate: number;
    dropOffRate: number;
    retentionRate: number;
    satisfactionScore: number | null;
  };
  gradeDistribution: { letter: string; count: number; percentage: number }[];
  lessonAnalytics: {
    lessonId: string;
    lessonTitle: string;
    avgCompletionPct: number;
    dropOffs: { at25: number; at50: number; at75: number; at100: number };
  }[];
  atRiskPredictions: {
    studentId: string;
    studentName: string;
    riskScore: number; // 0-1
    riskFactors: string[];
  }[];
  trends: { date: string; avgGrade: number; engagement: number }[];
}
```

### `POST /api/instructor/announcements`

**Auth:** Required (instructor)

**Request:**

```typescript
interface CreateAnnouncementRequest {
  courseId: string;
  title: string;
  content: string;
  priority?: "normal" | "important" | "urgent";
  isPinned?: boolean;
}
```

### `POST /api/instructor/courses/:id/publish`

**Auth:** Required (instructor)

### `POST /api/instructor/lessons/:id/reorder`

**Auth:** Required (instructor)

**Request:** `{ newOrder: number }`

### `POST /api/instructor/modules/:id/reorder`

**Auth:** Required (instructor)

**Request:** `{ newOrder: number }`

---

## 6. Component Tree

```
InstructorLayout
├── InstructorNavBar
│   ├── Logo
│   ├── NavLinks (Dashboard, Courses, Assignments, Assessments, Gradebook, Analytics)
│   ├── NotificationBell (grading queue count, alerts)
│   └── InstructorUserMenu (Profile, Availability, Settings, Logout)
│
├── InstructorDashboard
│   ├── WelcomeHeader
│   ├── CourseCards (horizontal scroll)
│   │   └── InstructorCourseCard[] (title, student count, role, status, manage button)
│   ├── PendingGradingWidget
│   │   └── GradingQueueItem[] (assignment, course, count, grade button)
│   ├── AtRiskStudentsWidget
│   │   └── AtRiskCard[] (name, course, risk type, metric, trend, intervene button)
│   ├── TodaySchedule (timeline view)
│   ├── QuickStatsGrid
│   │   ├── StatBox("Avg grade")
│   │   ├── StatBox("Pending submissions")
│   │   ├── StatBox("Total students")
│   │   └── StatBox("Office hours")
│   └── RecentActivity
│
├── CourseBuilderPage
│   ├── CourseSettingsForm
│   │   ├── TextInput("title"), TextInput("slug")
│   │   ├── RichTextEditor("description")
│   │   ├── Select("category"), Select("level")
│   │   ├── NumberInput("credits"), NumberInput("passingGrade")
│   │   ├── ImageUpload("thumbnail"), ImageUpload("banner")
│   │   └── GradingBreakdownEditor (4 sliders that sum to 100)
│   ├── ModuleList (drag-and-drop sortable)
│   │   └── ModuleCard[]
│   │       ├── ModuleHeader (title, lesson count, est hours, drag handle, edit/delete)
│   │       └── LessonList (nested sortable)
│   │           └── LessonItem[] (title, type icon, duration, status, drag, edit, delete)
│   ├── AddModuleButton, AddLessonButton
│   └── PublishBar (draft status, publish/unpublish/archive buttons)
│
├── LessonCreatorPage
│   ├── Breadcrumb (Course > Module > Lesson)
│   ├── ContentTypeSelector (tab bar)
│   ├── LessonForm
│   │   ├── TextInput("title"), TextArea("description")
│   │   ├── NumberInput("duration"), Toggle("isRequired"), Toggle("isPreview")
│   │   └── ConditionalContentForm
│   │       ├── VideoForm (uploader, caption upload, transcript, key takeaways)
│   │       ├── ArticleForm (rich text editor, code blocks)
│   │       ├── QuizForm (question editor, answer options, correct answer)
│   │       ├── CodingExerciseForm (code template, test cases, expected output)
│   │       └── AssignmentForm (instructions, rubric builder, file attachments)
│   ├── AttachmentsManager (drag-drop file upload, list, remove)
│   └── ActionBar (save draft, publish, preview, delete)
│
├── AssignmentCenter
│   ├── CourseFilterTabs
│   ├── AssignmentTable (title, course, due, submissions, graded, action)
│   │   └── AssignmentRow[]
│   ├── DraftSection (collapsible)
│   └── NewAssignmentButton
│
├── AssignmentGraderPage
│   ├── AssignmentHeader (title, course)
│   ├── StudentNavigator (prev/next + progress indicator X/12)
│   ├── SplitPane
│   │   ├── SubmissionPreview (left)
│   │   │   ├── FilePreviewer (PDF, image, code, text)
│   │   │   └── SubmissionTextPanel
│   │   └── GradingPanel (right)
│   │       ├── RubricTable (criteria, max points, score input per row)
│   │       ├── TotalScoreDisplay (auto-calc, letter grade)
│   │       ├── FeedbackEditor (rich text)
│   │       ├── ResubmitToggle
│   │       └── ActionButtons (save draft, submit grade, skip)
│   └── GradeHistory (show any overrides)
│
├── AssessmentEnginePage
│   ├── QuestionBankPanel
│   │   ├── SearchInput
│   │   ├── TypeFilter
│   │   ├── QuestionList (question text, type, tags, actions)
│   │   └── AddQuestionButton → QuestionEditorModal
│   ├── ActiveAssessments
│   │   └── AssessmentCard[] (title, course, due, avg, results button, edit)
│   └── AssessmentResultsModal
│       ├── StatisticsSummary (avg, median, high, low, std dev, pass rate)
│       ├── StudentResultTable (student, score, time, passed)
│       └── PerQuestionAnalysis (difficulty index, discrimination index)
│
├── InstructorGradebookPage
│   ├── CourseSelector
│   ├── GradebookStats (avg, median, std dev)
│   ├── GradebookTable
│   │   ├── ColumnHeaders (student name, assignment columns, total, letter)
│   │   ├── DataRows (click cell to override, color-coded)
│   │   └── FrozenFirstColumn (student names)
│   ├── DisputesPanel
│   │   └── DisputeCard[] (student, assignment, reason, open date, resolve button)
│   ├── OverrideModal (student, item, previous score, new score input, reason)
│   └── ExportButton (CSV download)
│
├── AttendanceMarkerPage
│   ├── SessionSelector (course, date, start time)
│   ├── StudentStatusList
│   │   └── StudentAttendanceRow[]
│   │       ├── Avatar + Name
│   │       ├── StatusButtonGroup (present/absent/late/excused)
│   │       └── NotesInput (optional)
│   ├── BulkActionBar (mark all present, mark all absent)
│   ├── QuickFilter (show absent only, show present only)
│   └── SaveButton
│
├── AnalyticsPage
│   ├── CourseSelector
│   ├── PeriodSelector (week/month/term)
│   ├── OverviewCards (avg grade, pass rate, drop off, retention, satisfaction)
│   ├── GradeDistributionChart (bar chart)
│   ├── LessonDropOffChart (horizontal bar, per lesson)
│   ├── AtRiskPredictionsTable
│   │   └── AtRiskRow[] (name, risk score, factors, intervene button)
│   └── TrendChart (line chart over time)
│
├── InstructorCalendar
│   ├── ViewToggle (month/week/day)
│   ├── CalendarGrid
│   ├── EventPopover (details, edit/delete)
│   ├── OfficeHoursEditor (day, start/end time, location, max students)
│   └── AddEventModal (title, date, time, type, location)
│
└── InstructorSettings
    ├── ProfileSettings (name, title, bio, avatar, office location)
    ├── OfficeHoursManager (weekly schedule grid)
    ├── NotificationPreferences
    ├── AvailabilityCalendar (block out dates)
    └── AccountSettings (password, 2FA)
```

---

## 7. Exhaustive User Journeys

### Journey 7.1: Creating a New Course

```
Step 1: Instructor clicks "Create Course" on dashboard
  → Navigates to /instructor/courses/create

Step 2: Fills course settings:
  - Title: "Advanced Malware Analysis"
  - Category: "Cybersecurity"
  - Level: "Advanced"
  - Credits: 4
  - Passing Grade: 70%
  - Grading: Assignments 30%, Assessments 30%, Projects 30%, Participation 10%
  → Clicks "Create Course"
  → POST /api/instructor/courses → 201

Step 3: Navigates to course builder
  → Clicks "Add Module" → Module 1: "Introduction to Malware"
  → Clicks "Add Lesson" in Module 1
    → Content type: "Video"
    → Title: "Malware Classification"
    → Duration: 45 min
    → Uploads video (POST /api/upload → R2)
    → Adds 3 key takeaways
    → Clicks "Publish"

Step 4: Adds Module 2: "Reverse Engineering"
  → Adds lesson: "Static Analysis" (Article type)
  → Writes rich article content with code blocks
  → Adds quiz: "Reverse Engineering Quiz" (5 questions)
    → Creates multiple choice questions
    → Sets correct answers
    → Clicks "Publish"

Step 5: Adds final project assignment
  → Sets instructions, rubric (4 criteria × 25 pts)
  → Sets due date: Dec 15
  → Attaches sample malware sample (sandboxed ZIP)
  → Clicks "Publish"

Step 6: Reviews course
  → Clicks "Publish Course" → POST /api/instructor/courses/:id/publish
  → Course is now live
  → Students notified via email

Alternative:
  Step 3a: Clones existing course → "Clone from Network Defense" → copies all modules/lessons
  Step 4a: Reorders modules/lessons via drag-and-drop
  Step 5a: Saves as draft → publishes later
```

### Journey 7.2: Grading Assignments

```
Step 1: Instructor sees dashboard notification: "12 submissions pending for Lab 4"
  → Clicks "Grade →" → /instructor/assignments/{id}/grade

Step 2: Grader loads
  → First student: Alex Johnson
  → Left panel: submission preview (PDF shown in-browser)
  → Right panel: rubric with score inputs

Step 3: Instructor reviews submission
  → Reads analysis report, opens pcap in embedded viewer
  → Scores rubric:
    - Packet Capture: 22/25
    - Analysis Quality: 20/25
    - Report Structure: 18/25
    - Recommendations: 15/25
    → Total: 75/100 → auto-calc: C
  → Writes feedback: "Good analysis but recommendations need more depth."
  → Clicks "Submit Grade" → POST /api/instructor/assignments/:id/submissions/:sid/grade

Step 4: Auto-advances to next student (Jane Doe)
  → Reviews Jane's submission
  → Notices possible plagiarism (similar text to Alex)
  → Clicks "Flag for Review" → plagiarism flag created
  → Skips for now → "Skip"

Step 5: Returns to grading queue later
  → 12/12 graded
  → Dashboard pending count: 0

Alternative Paths:
  Step 3a: Saves draft → comes back later
  Step 3b: Resubmit allowed → checks toggle → student can resubmit
  Step 4a: Grade dispute later → student claims error → instructor reviews in gradebook
  Step 4b: Bulk actions: "Mark all as ..." (not supported for grades)
```

### Journey 7.3: Taking Attendance

```
Step 1: Instructor opens /instructor/attendance
  → Selects course: "Network Defense"
  → Date: Oct 30, 2026 (default: today)
  → Session time: 2:00 PM

Step 2: Student list loads (24 students)
  → Most students present
  → Jane Doe: absent → clicks "Absent"
  → John Smith: arrived late → clicks "Late" → adds note "Arrived 2:10 PM"
  → Mike Brown: absent → clicks "Absent"

Step 3: Bulk actions
  → Clicks "Mark All Present" → all students set to present
  → Then marks specific students as absent/late

Step 4: Instructor adds excuse for Jane
  → Clicks "Submit Excuse" → modal: reason, attach doctor's note
  → Submits → marks as "Excused"

Step 5: Clicks "Save Attendance"
  → POST /api/instructor/attendance
  → Success toast: "Attendance saved for Oct 30"

Alternative:
  Step 2a: Auto-attendance via Zoom login → system pre-marks online attendees
  Step 3a: Student added mid-session → update with correct status
  Step 4a: Student contacts later for excuse → instructor edits attendance record
```

### Journey 7.4: Reviewing Quiz Results

```
Step 1: Quiz 3 auto-graded (all 18 students completed)
  → Instructor opens /instructor/assessments
  → Clicks "Results" on Quiz 3

Step 2: Results modal opens
  → Statistics: Avg 86.7%, Median 88%, High 100%, Low 60%, Pass Rate 89%
  → Grade Distribution: A:8, B:5, C:3, D/F:2

Step 3: Per-question analysis
  → Q3: "Which is symmetric encryption?" — 72% correct (hard)
  → Q7: "Key size of AES-256?" — 45% correct (very hard)
  → Instructor notes Q7 needs review

Step 4: Instructor clicks Q7
  → Sees answer distribution: 45% correct, 30% chose "128 bits", 25% chose "512 bits"
  → Decides to add explanation to lesson material

Step 5: Clicks "Send Feedback to All"
  → Composes: "Regarding Q7: AES-256 uses 256-bit keys. This is covered in Lesson 13."
  → Sends → all students receive notification

Alternative:
  Step 4a: Instructor adjusts scores manually → override for specific students
  Step 5a: Instructor contacts low-scoring students individually → "Reach out →" sends message
```

### Journey 7.5: Using Analytics to Identify At-Risk Students

```
Step 1: Instructor opens /instructor/analytics
  → Selects course: "Network Defense"
  → Period: "This Term"

Step 2: Overview cards show:
  - Avg Grade: 84.2% (solid)
  - Pass Rate: 92% (good)
  - At-Risk Count: 2 students

Step 3: At-Risk Predictions table
  - Jane Doe: 94% risk of failure
    Factors: Grade 68.8% (D+), Attendance 72%, Missing assignments: 1
  - Mike Brown: 72% risk
    Factors: Grade 72%, Attendance 88%, Low engagement

Step 4: Instructor clicks "Intervene" on Jane Doe
  → Opens intervention modal:
    - Sends message to student: "Hi Jane, I noticed your grades are slipping..."
    - Schedules mandatory meeting with advisor
    - Assigns remedial work
    - Logs intervention for tracking

Step 5: Lesson drop-off analysis
  → Sees Lesson 13 has 62% completion rate (low)
  → Decides to re-record video or add more engaging content
  → Updates lesson with new examples

Alternative:
  Step 4a: Instructor goes to gradebook → manually adjusts grade weights to help class
  Step 5a: Exports analytics to CSV → shares with department chair
```

### Journey 7.6: Handling a Grade Dispute

```
Step 1: Notification: "Grade dispute opened — Jane Doe — Lab 2"
  → Instructor opens /instructor/gradebook
  → Sees dispute card: "Jane Doe claims Lab 2 score of 32/50 is incorrect; expects 40/50"

Step 2: Instructor clicks "Review"
  → Opens Jane's submission for Lab 2
  → Reviews work again → notices rubric scoring was partially incorrect
  → Criterion 3 should be 18/25 not 10/25

Step 3: Instructor resolves dispute
  → Opens override modal:
    - Previous score: 32/50 (65%)
    - New score: 40/50 (80%)
    - Reason: "Recalculated rubric; Criterion 3 was scored incorrectly"
  → Clicks "Resolve" → POST /api/instructor/gradebook/disputes/:id/resolve
  → Status: 'resolved', outcome: 'overturned'

Step 4: Jane notified: "Your grade dispute has been resolved. Score updated to 40/50."
  → Jane's course grade recalculated

Alternative:
  Step 3a: Instructor finds no error → resolve as 'upheld' → "After review, the original grade stands"
  Step 3b: Partial resolution → 35/50 (was partially wrong)
```

---

## 8. Business Rules Engine

### BR-IN-001: Grading Turnaround SLA

- Assignments must be graded within 48 hours of submission deadline
- Auto-escalation: if ungraded after 72h, department chair notified
- Bulk grading: >20 submissions → extended to 72h
- Quizzes: auto-graded immediately (except essay questions)

### BR-IN-002: Course Publishing Gates

- Course must have ≥ 1 module with ≥ 3 lessons to publish
- Grading breakdown must sum to exactly 100%
- At least one assessment must be defined
- At least one assignment must be defined
- Title, description, category, level are required

### BR-IN-003: Content Versioning

- Every lesson update creates a version snapshot
- Students currently viewing are served the old version until next session
- Instructors can revert to previous versions (max 10 versions stored)
- Version history includes: editor, timestamp, change summary

### BR-IN-004: Academic Integrity

- Text submissions auto-scanned by plagiarism detection (Turnitin API)
- Similarity score > 50% → automatic flag for instructor review
- Code submissions checked via MOSS (Measure Of Software Similarity)
- Flagged submissions: instructor must review within 24h
- First offense: grade of 0 + warning; Second: course failure; Third: expulsion

### BR-IN-005: Grade Override Audit

- Every grade override is logged with before/after values and reason
- Overrides changing grade by > 10 percentage points require department chair approval
- Max 5 overrides per student per term (prevents grade inflation)
- Override history visible to admin auditors

### BR-IN-006: Attendance Auto-Marking

- For online classes: system marks Present if student was logged into Zoom/Teams for ≥ 50% of session duration
- Late: joined after 15 minutes
- Absent: never joined
- Instructor can override auto-marked attendance
- Attendance must be finalized within 24h of session

### BR-IN-007: Assessment Security

- Questions shuffle for each student if `shuffleQuestions = true`
- Options within each MC question also shuffle
- Random question subsets if question pool > assessment size
- Browser lockdown: fullscreen required, tab switch detection (logs warning)
- IP logging for suspicious activity

### BR-IN-008: Office Hours Allocation

- Each instructor must offer ≥ 3 hours/week of office hours
- Slots auto-scheduled from instructor's availability
- Max 5 students per 30-min slot
- No-shows after 10 minutes → slot released to others

### BR-IN-009: Announcement Delivery

- Normal: appears in-student dashboard, notification with 1h delay
- Important: in-app notification + email within 15 minutes
- Urgent: in-app + email + push notification immediately
- Max 2 urgent announcements per week per course
- Pinned announcements stay at top of course feed

---

## 9. Notification Specifications

### N-IN-01: New Submission Received

| Field         | Value                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------- |
| **Trigger**   | Student submits assignment                                                                  |
| **Channel**   | In-app + Push (if away > 15min)                                                             |
| **Template**  | `submission_received`                                                                       |
| **Variables** | `{{studentName}}`, `{{assignmentTitle}}`, `{{courseName}}`, `{{attemptNumber}}`, `{{link}}` |
| **Frequency** | Per submission; dedup for bulk                                                              |

### N-IN-02: Grade Dispute Opened

| Field         | Value                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| **Trigger**   | Student opens grade dispute                                                                                |
| **Channel**   | In-app + Email                                                                                             |
| **Template**  | `grade_dispute`                                                                                            |
| **Variables** | `{{studentName}}`, `{{assignmentTitle}}`, `{{currentScore}}`, `{{claimedScore}}`, `{{reason}}`, `{{link}}` |

### N-IN-03: Grading Overdue

| Field         | Value                                           |
| ------------- | ----------------------------------------------- |
| **Trigger**   | Submission ungraded for > 48h (72h for bulk)    |
| **Channel**   | In-app (warning) + Email (at 72h)               |
| **Template**  | `grading_overdue`                               |
| **Variables** | `{{count}}`, `{{oldestSubmission}}`, `{{link}}` |

### N-IN-04: Student At-Risk Alert

| Field         | Value                                                                           |
| ------------- | ------------------------------------------------------------------------------- |
| **Trigger**   | ML model predicts student at risk (score > 0.8)                                 |
| **Channel**   | In-app + Email                                                                  |
| **Template**  | `at_risk_alert`                                                                 |
| **Variables** | `{{studentName}}`, `{{riskScore}}`, `{{factors}}`, `{{courseName}}`, `{{link}}` |

### N-IN-05: Course Published Notification

| Field         | Value                                                               |
| ------------- | ------------------------------------------------------------------- |
| **Trigger**   | Course published                                                    |
| **Channel**   | Email to enrolled students (generated by system)                    |
| **Template**  | `course_published`                                                  |
| **Variables** | `{{courseName}}`, `{{instructorName}}`, `{{startDate}}`, `{{link}}` |

### N-IN-06: Office Hours Booking

| Field         | Value                                                     |
| ------------- | --------------------------------------------------------- |
| **Trigger**   | Student books office hour slot                            |
| **Channel**   | In-app + Email (calendar invite)                          |
| **Template**  | `office_hours_booked`                                     |
| **Variables** | `{{studentName}}`, `{{date}}`, `{{time}}`, `{{location}}` |

### N-IN-07: Plagiarism Flag

| Field         | Value                                                                     |
| ------------- | ------------------------------------------------------------------------- |
| **Trigger**   | Similarity > 50% on submission                                            |
| **Channel**   | In-app (immediate) + Email                                                |
| **Template**  | `plagiarism_flag`                                                         |
| **Variables** | `{{studentName}}`, `{{assignmentTitle}}`, `{{similarityPct}}`, `{{link}}` |

### N-IN-08: Student Low Score Alert

| Field         | Value                                                                   |
| ------------- | ----------------------------------------------------------------------- |
| **Trigger**   | Student scores < 60% on assessment                                      |
| **Channel**   | In-app                                                                  |
| **Template**  | `low_score`                                                             |
| **Variables** | `{{studentName}}`, `{{assessmentTitle}}`, `{{score}}`, `{{courseName}}` |

### N-IN-09: Conference with Parent Scheduled

| Field         | Value                                                       |
| ------------- | ----------------------------------------------------------- |
| **Trigger**   | Parent schedules conference                                 |
| **Channel**   | In-app + Email (calendar invite)                            |
| **Template**  | `parent_conference`                                         |
| **Variables** | `{{parentName}}`, `{{studentName}}`, `{{date}}`, `{{time}}` |

### N-IN-10: System-Generated Analytics Report

| Field         | Value                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------ |
| **Trigger**   | End of each week, auto-generated                                                           |
| **Channel**   | Email                                                                                      |
| **Template**  | `weekly_analytics`                                                                         |
| **Variables** | `{{courseName}}`, `{{avgGrade}}`, `{{passRate}}`, `{{atRiskCount}}`, `{{engagementTrend}}` |

---

## 10. Permission Matrix

| Entity                   | Action            | Lead Instructor | TA               | Guest Lecturer | Admin | Student  |
| ------------------------ | ----------------- | --------------- | ---------------- | -------------- | ----- | -------- |
| Courses (own)            | Create            | ✅              | ❌               | ❌             | ✅    | ❌       |
| Courses (own)            | Edit settings     | ✅              | ❌               | ❌             | ✅    | ❌       |
| Courses (own)            | Publish           | ✅              | ❌               | ❌             | ✅    | ❌       |
| Courses (own)            | Delete            | ❌              | ❌               | ❌             | ✅    | ❌       |
| Courses (assigned)       | Read              | ✅              | ✅               | ✅             | ✅    | ❌       |
| Courses (not assigned)   | Read              | ❌              | ❌               | ❌             | ✅    | ❌       |
| Modules                  | CRUD (own course) | ✅              | ❌               | ❌             | ✅    | ❌       |
| Lessons                  | CRUD (own course) | ✅              | ❌               | ✅ (read only) | ✅    | ❌       |
| Lessons                  | Publish           | ✅              | ❌               | ❌             | ✅    | ❌       |
| Assignments              | Create/Edit       | ✅              | ❌               | ❌             | ✅    | ❌       |
| Assignments              | Grade             | ✅              | ✅ (if assigned) | ❌             | ✅    | ❌       |
| Assignments              | View submissions  | ✅              | ✅               | ❌             | ✅    | ❌       |
| Assessments              | Create/Edit       | ✅              | ❌               | ❌             | ✅    | ❌       |
| Assessments              | View results      | ✅              | ✅               | ❌             | ✅    | ❌       |
| Question Bank            | CRUD              | ✅              | ✅ (own)         | ❌             | ✅    | ❌       |
| Gradebook                | Read              | ✅ (assigned)   | ✅ (assigned)    | ❌             | ✅    | ❌       |
| Gradebook                | Override grades   | ✅              | ❌               | ❌             | ✅    | ❌       |
| Gradebook                | Export            | ✅              | ❌               | ❌             | ✅    | ❌       |
| Attendance               | Mark              | ✅              | ✅               | ❌             | ✅    | ❌       |
| Attendance               | Read              | ✅              | ✅               | ❌             | ✅    | ✅ (own) |
| Analytics                | View (own course) | ✅              | ✅ (limited)     | ❌             | ✅    | ❌       |
| Announcements            | Post              | ✅              | ✅               | ❌             | ✅    | ❌       |
| Calendar                 | View              | ✅              | ✅               | ❌             | ✅    | ❌       |
| Office Hours             | Set               | ✅              | ❌               | ❌             | ✅    | ❌       |
| Messages (with students) | Send/Read         | ✅              | ✅               | ❌             | ✅    | ✅       |
| Messages (with parents)  | Send/Read         | ✅              | ❌               | ❌             | ✅    | ❌       |
| Grade Disputes           | Resolve           | ✅              | ❌               | ❌             | ✅    | ❌       |

---

## 11. State Management

### Redux Slices

```typescript
interface InstructorState {
  dashboard: {
    data: InstructorDashboardResponse | null;
    loading: boolean;
    error: string | null;
  };
  currentCourse: {
    data: CourseDetailResponse | null;
    loading: boolean;
    saving: boolean;
    publishLoading: boolean;
    error: string | null;
  };
  lessonEditor: {
    currentLesson: LessonDetail | null;
    saving: boolean;
    publishLoading: boolean;
    error: string | null;
    attachments: FileAttachment[];
  };
  grading: {
    assignment: AssignmentWithSubmissions | null;
    currentIndex: number;
    currentSubmission: SubmissionForGrading | null;
    gradingDraft: GradingDraft;
    loading: boolean;
    submitting: boolean;
  };
  gradebook: {
    data: InstructorGradebookResponse | null;
    disputeResolution: {
      loading: boolean;
      error: string | null;
    };
  };
  analytics: {
    data: AnalyticsResponse | null;
    period: "week" | "month" | "term";
    loading: boolean;
  };
}
```

### RTK Query Endpoints

```typescript
const instructorApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/instructor" }),
  tagTypes: [
    "Dashboard",
    "Courses",
    "Lessons",
    "Assignments",
    "Submissions",
    "Gradebook",
    "Analytics",
  ],
  endpoints: (builder) => ({
    getDashboard: builder.query<InstructorDashboardResponse, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
      pollingInterval: 30000,
    }),
    getCourses: builder.query<InstructorCourseDetail[], void>({
      query: () => "/courses",
      providesTags: ["Courses"],
    }),
    getCourse: builder.query<CourseDetailResponse, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (result, err, id) => [{ type: "Courses", id }],
    }),
    createCourse: builder.mutation<CourseSettings, CreateCourseRequest>({
      query: (body) => ({ url: "/courses", method: "POST", body }),
      invalidatesTags: ["Courses"],
    }),
    updateCourse: builder.mutation<CourseSettings, { id: string; data: Partial<CourseSettings> }>({
      query: ({ id, data }) => ({ url: `/courses/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Courses"],
    }),
    publishCourse: builder.mutation<void, string>({
      query: (id) => ({ url: `/courses/${id}/publish`, method: "POST" }),
      invalidatesTags: ["Courses"],
    }),
    createModule: builder.mutation<Module, { courseId: string; data: CreateModuleRequest }>({
      query: ({ courseId, data }) => ({
        url: `/courses/${courseId}/modules`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Courses"],
    }),
    createLesson: builder.mutation<LessonSummary, CreateLessonRequest>({
      query: (data) => ({ url: "/lessons", method: "POST", body: data }),
      invalidatesTags: ["Courses"],
    }),
    updateLesson: builder.mutation<LessonSummary, { id: string; data: FormData }>({
      query: ({ id, data }) => ({ url: `/lessons/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Courses", "Lessons"],
    }),
    publishLesson: builder.mutation<LessonSummary, string>({
      query: (id) => ({ url: `/lessons/${id}/publish`, method: "POST" }),
      invalidatesTags: ["Courses", "Lessons"],
    }),
    getAssignments: builder.query<InstructorAssignment[], string | void>({
      query: (params) => ({ url: "/assignments", params: params ? { courseId: params } : {} }),
      providesTags: ["Assignments"],
    }),
    getSubmissions: builder.query<SubmissionsResponse, string>({
      query: (id) => `/assignments/${id}/submissions`,
      providesTags: (result, err, id) => [{ type: "Submissions", id }],
    }),
    gradeSubmission: builder.mutation<
      SubmissionForGrading,
      { assignmentId: string; submissionId: string; data: GradeSubmissionRequest }
    >({
      query: ({ assignmentId, submissionId, data }) => ({
        url: `/assignments/${assignmentId}/submissions/${submissionId}/grade`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Assignments", "Submissions", "Gradebook", "Dashboard"],
    }),
    getGradebook: builder.query<InstructorGradebookResponse, string>({
      query: (courseId) => `/gradebook?courseId=${courseId}`,
      providesTags: ["Gradebook"],
    }),
    overrideGrade: builder.mutation<void, GradeOverrideRequest>({
      query: (data) => ({ url: "/gradebook/override", method: "POST", body: data }),
      invalidatesTags: ["Gradebook"],
    }),
    resolveDispute: builder.mutation<void, { id: string; data: ResolveDisputeRequest }>({
      query: ({ id, data }) => ({
        url: `/gradebook/disputes/${id}/resolve`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Gradebook"],
    }),
    markAttendance: builder.mutation<void, MarkAttendanceRequest>({
      query: (data) => ({ url: "/attendance", method: "POST", body: data }),
    }),
    getAnalytics: builder.query<AnalyticsResponse, { courseId: string; period?: string }>({
      query: ({ courseId, period }) => ({
        url: `/analytics/${courseId}`,
        params: period ? { period } : {},
      }),
      providesTags: ["Analytics"],
    }),
    createAnnouncement: builder.mutation<Announcement, CreateAnnouncementRequest>({
      query: (data) => ({ url: "/announcements", method: "POST", body: data }),
      invalidatesTags: ["Dashboard"],
    }),
  }),
});
```

---

## 12. Form Schemas (Zod)

### Course Settings

```typescript
export const CourseSettingsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  description: z.string().min(10, "Description must be at least 10 characters").max(10000),
  category: z.string().min(1, "Category is required"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  credits: z.number().int().min(1).max(20).default(3),
  passingGrade: z.number().min(0).max(100).default(70),
  gradingBreakdown: z
    .object({
      assignments: z.number().min(0).max(100),
      assessments: z.number().min(0).max(100),
      projects: z.number().min(0).max(100),
      participation: z.number().min(0).max(100),
    })
    .refine(
      (data) => data.assignments + data.assessments + data.projects + data.participation === 100,
      {
        message: "Grading breakdown must sum to 100%",
        path: ["total"],
      },
    ),
});
```

### Lesson Content

```typescript
export const LessonVideoSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  durationMinutes: z.number().int().min(1).max(480),
  isRequired: z.boolean().default(true),
  isPreview: z.boolean().default(false),
  videoUrl: z.string().url().optional(),
  transcript: z.string().max(50000).optional(),
  keyTakeaways: z.array(z.string().max(500)).max(10).optional(),
});

export const LessonArticleSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  content: z.string().min(10).max(100000), // MDX content
  durationMinutes: z.number().int().min(1).max(480),
  isRequired: z.boolean().default(true),
  isPreview: z.boolean().default(false),
});

export const QuestionSchema = z.object({
  questionType: z.enum([
    "multiple_choice",
    "multiple_answer",
    "true_false",
    "short_answer",
    "coding",
    "essay",
  ]),
  questionText: z.string().min(1, "Question text is required").max(5000),
  options: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
        correct: z.boolean(),
      }),
    )
    .optional(),
  correctAnswer: z.any().optional(),
  explanation: z.string().max(2000).optional(),
  points: z.number().positive().default(1),
  difficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
  tags: z.array(z.string()).max(10).optional(),
});

export const LessonQuizSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  questions: z.array(QuestionSchema).min(1, "At least 1 question required").max(100),
  durationMinutes: z.number().int().min(1).max(480),
  isRequired: z.boolean().default(true),
  passingScore: z.number().min(0).max(100).optional(),
  maxAttempts: z.number().int().min(1).max(10).default(1),
  shuffleQuestions: z.boolean().default(true),
  showResults: z.boolean().default(true),
});

export const AssignmentGradingSchema = z
  .object({
    rubricScores: z.record(z.string(), z.number()).optional(),
    totalScore: z.number().min(0).max(999),
    maxScore: z.number().positive(),
    feedback: z.string().max(10000).optional(),
    allowResubmission: z.boolean().default(false),
    status: z.enum(["graded", "returned"]),
  })
  .refine((data) => data.totalScore <= data.maxScore, {
    message: "Score cannot exceed maximum",
    path: ["totalScore"],
  });
```

### Attendance

```typescript
export const AttendanceRecordSchema = z.object({
  courseId: z.string().uuid(),
  sessionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  records: z
    .array(
      z.object({
        studentId: z.string().uuid(),
        status: z.enum(["present", "absent", "excused", "late"]),
        notes: z.string().max(500).optional(),
      }),
    )
    .min(1),
});
```

### Announcement

```typescript
export const AnnouncementSchema = z.object({
  courseId: z.string().uuid(),
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "Content is required").max(50000),
  priority: z.enum(["normal", "important", "urgent"]).default("normal"),
  isPinned: z.boolean().default(false),
});
```

### Grade Override

```typescript
export const GradeOverrideSchema = z.object({
  gradeItemId: z.string().uuid(),
  newScore: z.number().min(0).max(100),
  reason: z.string().min(10, "Please provide a reason for the override").max(2000),
});
```

### Dispute Resolution

```typescript
export const DisputeResolutionSchema = z.object({
  resolution: z.enum(["upheld", "overturned", "partial"]),
  newScore: z.number().min(0).max(100).optional(),
  notes: z.string().min(1).max(2000),
});
```

---

## 13. Analytics Events

| Event                       | Properties                                  | Trigger                 |
| --------------------------- | ------------------------------------------- | ----------------------- |
| `instructor_dashboard_view` | `courseCount`, `pendingGradingCount`        | Dashboard loaded        |
| `course_create`             | `courseTitle`, `category`, `level`          | Course created          |
| `course_publish`            | `courseId`, `lessonCount`, `moduleCount`    | Course published        |
| `lesson_create`             | `courseId`, `contentType`                   | Lesson created          |
| `lesson_publish`            | `lessonId`, `contentType`, `duration`       | Lesson published        |
| `lesson_update`             | `lessonId`, `changeType`                    | Lesson updated          |
| `assignment_create`         | `courseId`, `dueInDays`, `pointsPossible`   | Assignment created      |
| `grading_start`             | `assignmentId`, `totalCount`                | Grading session started |
| `grading_submit`            | `assignmentId`, `score`, `timeSpentSeconds` | Grade submitted         |
| `grading_batch_complete`    | `assignmentId`, `count`, `avgScore`         | All graded              |
| `assessment_create`         | `courseId`, `type`, `questionCount`         | Assessment created      |
| `assessment_results_view`   | `assessmentId`, `avgScore`                  | Results viewed          |
| `grade_override`            | `courseId`, `delta`                         | Grade overridden        |
| `grade_dispute_resolve`     | `courseId`, `resolution`                    | Dispute resolved        |
| `attendance_marked`         | `courseId`, `presentCount`, `absentCount`   | Attendance saved        |
| `analytics_view`            | `courseId`, `period`, `section`             | Analytics loaded        |
| `at_risk_intervention`      | `studentId`, `courseId`, `action`           | Intervention taken      |
| `announcement_post`         | `courseId`, `priority`                      | Announcement posted     |
| `office_hours_set`          | `slotCount`                                 | Office hours updated    |
| `content_reorder`           | `moduleId`, `lessonId`, `direction`         | Drag-reorder content    |

---

## 14. Accessibility Requirements

**Global:**

- `role="navigation"` on sidebar, `aria-label="Instructor navigation"`
- All forms have proper `<label>` elements, `aria-describedby` for help text
- Color-coded grade statuses (green ≥ 90%, yellow ≥ 70%, red < 70%) with text labels
- Data tables: `<caption>`, `<th scope>`, `aria-sort` on sortable columns

**Key Components:**

- GradingPanel: `aria-label="Grading panel for {{student}}"`, rubric inputs `aria-label="Score for {{criterion}}"`
- RubricTable: `aria-label="Rubric for {{assignment}}"`, each row has `aria-label="Criterion: {{name}}, max {{points}}"`
- StudentNavigator: `aria-label="Student {{current}} of {{total}}"`, prev/next buttons labeled
- AttendanceMarker: `role="list"`, each student row `aria-label="{{name}}: {{status}}"`, status buttons as `aria-pressed`
- AnalyticsCharts: `aria-label="Grade distribution chart"`, data table fallback for screen readers
- Drag-and-drop: `aria-roledescription="sortable list"`, keyboard reorder via Alt+Arrow keys
- CourseBuilder: Module accordion `aria-expanded`, lesson list `aria-label="Lessons in {{module}}"`
- QuestionEditor: Each question `aria-label="Question {{n}}: {{type}}"`, correct answer marked with `aria-current="true"`

---

## 15. Error & Edge Case Catalog

| #   | Scenario                                    | User Message                                                                 | Recovery                               |
| --- | ------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------- |
| E1  | Course save fails (network)                 | "Failed to save changes. [Retry]"                                            | Auto-retry with backoff                |
| E2  | Video upload fails                          | "Video upload failed. [Retry] [Cancel]"                                      | Retry with chunked upload              |
| E3  | Video encoding delayed                      | "Your video is being processed. You'll be notified when ready."              | Background encoding job → notification |
| E4  | Grading conflict (two graders)              | "This submission was graded by {{name}} while you were reviewing. [Refresh]" | Reload latest grade                    |
| E5  | Student unenrolled mid-grading              | "{{studentName}} is no longer enrolled in this course."                      | Skip to next student                   |
| E6  | Assignment due date passed while creating   | "This assignment's due date is in the past."                                 | Set future date or publish anyway      |
| E7  | Duplicate lesson title                      | "A lesson with this title already exists in this module."                    | Add suffix or change title             |
| E8  | Analytics data insufficient                 | "Not enough data to generate analytics yet."                                 | Wait for more student activity         |
| E9  | Bulk attendance save conflict               | "Attendance for this session was already saved. [Overwrite] [Cancel]"        | Load current state, confirm overwrite  |
| E10 | Question bank import fails                  | "Failed to import questions. File format may be invalid."                    | Check format (JSON/CSV), retry         |
| E11 | Gradebook export fails                      | "Failed to export gradebook. [Retry] [Download as alternative format]"       | Retry or choose CSV instead of Excel   |
| E12 | Student limit reached for course            | "Course is full ({{max}} students). Cannot add more."                        | Increase capacity or waitlist          |
| E13 | Content type change (e.g., video → article) | "Changing content type will discard existing content. Continue?"             | Confirm dialog with warning            |
| E14 | Office hours overlapping                    | "Office hours overlap with existing slot on {{day}}."                        | Adjust time or confirm override        |
| E15 | Plagiarism check pending                    | "Plagiarism check is running. Results will appear shortly."                  | Check back later via notification      |

---

_End of Instructor Actor Plan — 04_
