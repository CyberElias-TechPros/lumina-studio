# Actor: Current Student

## 1. Identity & Role Definition

**Actor Name:** Current Student  
**System Role ID:** `role_current_student`  
**Description:** An individual who has been accepted, enrolled, and is actively participating in one or more programs at Cyber Elias Academy. This actor is in the core "student" lifecycle — consuming content, completing assignments, taking assessments, communicating with peers and instructors, tracking progress, managing finances, and ultimately earning certificates.

**Key Characteristics:**

- Fully authenticated with multi-session support
- Enrolled in 1+ programs, each with courses, modules, lessons
- Has a cohort/class group, assigned instructors, peer network
- Tracks personal performance, progress, and portfolio
- Interacts with marketplace, community, calendar, messaging
- Manages payment plans, attendance, certification milestones

**Student Lifecycle States:**

1. **Pre-Start** — Enrolled, program hasn't started yet (orientation)
2. **Active** — Currently taking courses, attending classes
3. **On Leave** — Temporary pause (medical, personal, military)
4. **Graduated** — Completed all requirements, certificate issued
5. **Expelled** — Removed due to policy violation
6. **Dropped Out** — Voluntarily withdrew

---

## 2. Primary Goals & Success KPIs

**Goal 1: Consume Learning Content Effectively**

- KPI: Lesson completion rate ≥ 85%
- KPI: Avg time spent per week ≥ 8 hours
- KPI: Video lesson retention rate (25%/50%/75%/100% markers)

**Goal 2: Complete Assignments & Assessments**

- KPI: Assignment submission rate ≥ 95%
- KPI: On-time submission rate ≥ 80%
- KPI: Assessment average score ≥ 75%

**Goal 3: Track Academic Progress**

- KPI: Gradebook check frequency ≥ 1x per week
- KPI: Gradebook page views per session
- KPI: GPA awareness (quiz: "What's your current GPA?")

**Goal 4: Build Professional Portfolio**

- KPI: Portfolio items added per month ≥ 2
- KPI: Portfolio share/external link clicks
- KPI: Portfolio completion percentage (profile + projects + certs)

**Goal 5: Engage with Community**

- KPI: Forum posts per week ≥ 3
- KPI: Messages sent/received per week ≥ 5
- KPI: Study group membership ≥ 1

**Goal 6: Manage Finances Successfully**

- KPI: Payment on-time rate ≥ 95%
- KPI: Payment plan adherence
- KPI: Financial aid application rate

**Goal 7: Earn Certificates & Graduate**

- KPI: Module completion rate → program completion → graduation
- KPI: Certificate download rate within 30 days of issue

---

## 3. Complete Screen Inventory

### Screen 3.1: Student Dashboard (`/dashboard`)

**Purpose:** Central hub showing at-a-glance everything important — next class, pending assignments, recent grades, announcements.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] Dashboard  Learning  Community  ...  [Profile ▼]   │
├─────────────────────────────────────────────────────────────┤
│  Welcome back, Alex!     [Resume Learning →]               │
│  Program: Cybersecurity Fundamentals | Term: Fall 2026     │
├──────────────────┬──────────────────┬──────────────────────┤
│  Next Class      │  Pending Tasks   │  This Week's Stats   │
│  ┌────────────┐  │  ┌────────────┐  │  ┌────────────────┐  │
│  │ Network    │  │  │ Assignment │  │  │ ⏱ 12.5h spent │  │
│  │ Defense    │  │  │ Lab 4      │  │  │ 📊 88% avg    │  │
│  │ Module 3   │  │  │ Due: Fri   │  │  │ ✅ 6/8 done   │  │
│  │ 2:00 PM    │  │  │ [Start →]  │  │  │ 🏆 Top 15%   │  │
│  │ [Join]     │  │  └────────────┘  │  └────────────────┘  │
│  │            │  │  ┌────────────┐  │                      │
│  │            │  │  │ Quiz:     │  │  │                      │
│  │            │  │  │ Crypto    │  │  │                      │
│  └────────────┘  │  │ Due: Wed  │  │  │                      │
│                  │  │ [Start →] │  │  │                      │
│                  │  └────────────┘  │                      │
├──────────────────┴──────────────────┴──────────────────────┤
│  Recent Activity                                             │
│  ● Scored 92% on "Cryptography Quiz" — 2h ago              │
│  ● Submitted "Lab 3: Packet Analysis" — Yesterday           │
│  ● Instructor posted "Week 4 Announcement" — Yesterday      │
├──────────────────┬──────────────────────────────────────────┤
│  Quick Actions   │  Upcoming Deadlines                      │
│  [New Message]   │  ● Lab 4      — Fri 11:59 PM             │
│  [Browse Market] │  ● Project 1  — Nov 15                   │
│  [View Calendar] │  ● Exam 1     — Nov 22                   │
│  [Find Study Grp]│                                           │
└──────────────────┴──────────────────────────────────────────┘
```

**Data Sources:**

- `GET /api/student/dashboard` — aggregated dashboard data
- `GET /api/student/tasks?filter=pending`
- `GET /api/student/activity?limit=10`
- `GET /api/student/next-class`

**States:**

- **Loading:** 4 skeleton cards layout
- **Empty (no tasks):** "All caught up! 🎉 No pending tasks."
- **Empty (no activity):** "Your activity will show here once you start learning."
- **Error:** Dashboard card fails → inline error per card, rest of page still renders
- **Edge Cases:** Between terms → "Enjoy your break! Next term starts Jan 15." First day → "Welcome! Start with your first lesson."

### Screen 3.2: Learning Hub (`/learning`)

**Purpose:** Browse all enrolled programs, courses, modules, and lessons with progress tracking.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  My Learning                                                 │
├─────────────────────────────────────────────────────────────┤
│  Program: Cybersecurity Fundamentals (65% complete)        │
│  [████████████████░░░░░░░░░░░░░░░░░]                        │
│                                                             │
│  Modules:                                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ✅ Module 1: Foundations          100% ████████████  │  │
│  │  Lessons 1-6 complete                                │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ ✅ Module 2: Network Basics       100% ████████████  │  │
│  │  Lessons 7-12 complete                               │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ ◉ Module 3: Cryptography          42% ██████░░░░░░░  │  │
│  │  → Lesson 13: Symmetric Encryption [Resume] ←       │  │
│  │  → Lesson 14: Asymmetric Encryption                  │  │
│  │  → Lesson 15: Hashing (not started)                  │  │
│  │  → Quiz: Crypto Fundamentals (not started)           │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ ⬜ Module 4: Network Defense        0% ░░░░░░░░░░░░  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Archived Programs [▼]                                       │
└─────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/student/enrollments` → enrollments with nested modules/lessons/progress  
**States:** Loading (skeleton accordions), Empty ("No enrollments yet"), Error (retry banner)

### Screen 3.3: Lesson Viewer (`/learning/lessons/[lessonId]`)

**Purpose:** Consume lesson content — video player, article reader, interactive coding environment, quiz interface.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Module 3: Cryptography                           │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐    │
│  │  [Video Player / Article Content / Interactive]    │    │
│  │                                                     │    │
│  │  [▶ Play] | Speed: 1x | Captions: On | Quality: HD │    │
│  │  Progress: ████████████░░░░░░░ 65%                  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  Lesson: Symmetric Encryption                              │
│  Module 3 · Lesson 13 of 24 · Est. 35 min                 │
│                                                             │
│  Below the fold:                                            │
│  ┌────────────────────────────────────────────────────┐    │
│  │  📝 Key Takeaways                                  │    │
│  │  ● AES is a symmetric encryption algorithm         │    │
│  │  ● Uses same key for enc/dec                       │    │
│  │  ● Key sizes: 128, 192, 256 bits                   │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │  📄 Transcript (expandable)                        │    │
│  │  "Welcome to lesson 13. In this video we'll..."    │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  [Mark Complete] [Previous Lesson ←] [Next Lesson →]       │
└─────────────────────────────────────────────────────────────┘
```

**Content Types:** `video`, `article`, `quiz`, `coding_exercise`, `project`

**States:**

- **Loading:** Player skeleton, title placeholder
- **Error (404):** "Lesson not found"
- **Error (video fails):** "Video failed to load. [Refresh] [Download]"
- **Edge Cases:** Long video → auto-save progress every 10 seconds. Resize viewport → responsive player. Slow connection → adaptive bitrate streaming. Ad blockers (none, but may affect tracking).

### Screen 3.4: Assignments Center (`/assignments`)

**Purpose:** View all assignments across all courses, filtered by status.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Assignments                                                 │
│  [All] [Pending] [Submitted] [Graded] [Late]               │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ⚠ Lab 4: Packet Analysis                    Due Fri │  │
│  │ Course: Network Defense | Points: 100 | Est: 3h    │  │
│  │ Status: NOT STARTED                                  │  │
│  │ [Start Assignment →]                                 │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ 📝 Project 1: Security Audit                 Nov 15 │  │
│  │ Course: Fundamentals | Points: 250 | Est: 10h      │  │
│  │ Status: IN PROGRESS (35%)                           │  │
│  │ [Continue →]                                         │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ ✅ Lab 3: Packet Analysis                    90/100 │  │
│  │ Course: Network Defense | Submitted: Oct 28         │  │
│  │ Status: GRADED | Feedback: "Great analysis..."      │  │
│  │ [View Feedback] [Resubmit (if allowed)]             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/student/assignments?filter=pending|submitted|graded|late`

**States:**

- **Loading:** 3 skeleton cards
- **Empty filter:** "No assignments match this filter."
- **No assignments at all:** "Nothing assigned yet. Enjoy the break!"
- **Error:** Partial data shown if some courses fail

### Screen 3.5: Assignment Detail / Submission (`/assignments/[id]`)

**Purpose:** View full assignment description, rubric, submit work.

**Wireframe:**

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Assignments                                       │
├─────────────────────────────────────────────────────────────┤
│  Lab 4: Packet Analysis                                      │
│  Network Defense · Module 3 · Due: Fri Nov 3, 11:59 PM      │
├─────────────────────────────────────────────────────────────┤
│  Instructions:                                                │
│  "Using Wireshark, analyze the provided pcap file..."        │
│  [Download Assignment Files] [View Rubric]                   │
├─────────────────────────────────────────────────────────────┤
│  Resources:                                                   │
│  ● [Wireshark Guide PDF] ● [Sample Report Template]         │
├─────────────────────────────────────────────────────────────┤
│  Submission:                                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 📎 Drag & drop files or click to upload              │   │
│  │ Accepted: .pdf, .doc, .docx, .zip, .pcap            │   │
│  │ Max: 50MB total                                       │   │
│  │ Current files:                                        │   │
│  │ ✅ analysis_report.pdf (2.3MB)                [Remove]│   │
│  │ ✅ capture_analysis.pcap (15.1MB)            [Remove]│   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  Comments to Instructor (optional):                         │
│  [________________________________________________]        │
│                                                             │
│  [Submit Assignment] [Save as Draft]                        │
└─────────────────────────────────────────────────────────────┘
```

**States:** Loading, Not Found, Already Submitted (show submitted version + resubmit if allowed), Past Due (warn before submit), Empty (no files yet)

### Screen 3.6: Assessments / Quizzes (`/assessments` and `/assessments/[id]/take`)

**Purpose:** Take quizzes, exams, and timed assessments.

**Layout (taking a quiz):**

```
┌─────────────────────────────────────────────────────────────┐
│  Module 3 Quiz: Cryptography Fundamentals                   │
│  Question 4 of 15                     Timer: 12:34 remaining│
├─────────────────────────────────────────────────────────────┤
│  Question:                                                   │
│  Which of the following is a symmetric encryption algorithm? │
│                                                             │
│  ○ A) RSA                                                   │
│  ○ B) AES          ← Selected                               │
│  ○ C) Diffie-Hellman                                        │
│  ○ D) ECDSA                                                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Question Progress: ■■□■■□■■□□□□□                          │
│  [← Previous]                         [Next →]             │
│                                  [Submit Quiz]              │
└─────────────────────────────────────────────────────────────┘
```

**Question Types:** Multiple choice, multiple answer, true/false, short answer, code block, file upload, essay

**States:**

- **Loading:** Quiz structure loading
- **Not Started:** Instructions page with time limit + attempt count
- **In Progress:** Questions with timer
- **Submitted:** Score page with correct/incorrect breakdown
- **Timeout:** Auto-submit when timer reaches 0
- **Error:** Save fails → local persistence, retry on submit

### Screen 3.7: Gradebook (`/grades`)

**Purpose:** View all grades, running GPA, per-course breakdown.

**Wireframe:**

```
┌─────────────────────────────────────────────────────────────┐
│  Your Grades                                                 │
│  Overall GPA: 3.72 | Program: Cybersecurity Fundamentals    │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Course                │ Grade │ Weight │ Letter     │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ Network Defense       │ 88.5% │  25%   │ B+         │  │
│  │ Cryptography          │ 94.2% │  25%   │ A          │  │
│  │ Security Foundations  │ 91.0% │  25%   │ A-         │  │
│  │ Ethics & Compliance   │ 85.0% │  25%   │ B          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Network Defense - Grade Breakdown                   │  │
│  │ Assignment        │ Score │ Max │ %     │ Weight   │  │
│  │ Lab 1             │ 45    │ 50  │ 90%   │ 10%      │  │
│  │ Lab 2             │ 48    │ 50  │ 96%   │ 10%      │  │
│  │ Lab 3             │ 42    │ 50  │ 84%   │ 10%      │  │
│  │ Midterm Exam      │ 85    │ 100 │ 85%   │ 30%      │  │
│  │ Final Project     │ 0     │ 100 │ —     │ 40%      │  │
│  └──────────────────────────────────────────────────────┘  │
│  What-if GPA Calculator [▼]                                  │
└─────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/student/grades?courseId=optional`

**What-if Calculator:** Student can adjust future scores to see impact on final grade.

### Screen 3.8: Portfolio Builder (`/portfolio`)

**Purpose:** Build a professional portfolio showcasing projects, skills, certificates, and experience.

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  My Portfolio                                     [Share]   │
│  Public URL: cea.academy/portfolio/alex-johnson             │
├─────────────────────────────────────────────────────────────┤
│  Profile Section                                             │
│  [Avatar Upload] Alex Johnson                               │
│  Cybersecurity Student | Cyber Elias Academy                │
│  [Edit Bio] [Edit Contact Info]                              │
├─────────────────────────────────────────────────────────────┤
│  Skills (drag to reorder)                                    │
│  +------------------------+--------------------------------+ │
│  │ 🛡 Network Security    │ ⭐⭐⭐⭐⭐                       │ │
│  │ 🔐 Cryptography       │ ⭐⭐⭐⭐                        │ │
│  │ 🐍 Python             │ ⭐⭐⭐                          │ │
│  │ 📊 Wireshark          │ ⭐⭐⭐⭐⭐                       │ │
│  │ [Add Skill]           │                                │ │
│  +------------------------+--------------------------------+ │
├─────────────────────────────────────────────────────────────┤
│  Projects                                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🔒 Security Audit: ABC Corp                      🖊🗑 │  │
│  │ "Conducted full security audit for ABC Corp..."     │  │
│  │ Skills: Network Security, Compliance                │  │
│  │ [Edit] [Add Media] [View Live]                      │  │
│  └──────────────────────────────────────────────────────┘  │
│  [Add Project]                                              │
├─────────────────────────────────────────────────────────────┤
│  Certificates                                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🏆 Python for Cybersecurity — Issued Oct 2026       │  │
│  │ [View Certificate] [Download PDF] [Share on LinkedIn]│  │
│  └──────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Education & Experience                                     │
│  [Add Education] [Add Experience]                            │
└─────────────────────────────────────────────────────────────┘
```

**API:** `GET/PUT /api/student/portfolio` , `GET/POST/PUT/DELETE /api/student/portfolio/projects`

### Screen 3.9: Marketplace (`/marketplace`)

**Purpose:** Browse and purchase additional resources, tools, courses, mentoring sessions.

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Marketplace                                     🛒 Cart (2)│
│  [Search resources...]  [Categories ▼]                     │
├─────────────────────────────────────────────────────────────┤
│  Featured                                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │ $29      │ │ $99      │ │ $199     │ │ Free     │     │
│  │ Kali     │ │ Mentoring│ │ Advanced  │ │ Study    │     │
│  │ Linux    │ │ Session  │ │ Malware   │ │ Template │     │
│  │ Guide    │ │ (1-on-1) │ │ Analysis  │ │ Pack     │     │
│  │ [Add+]   │ │ [Add+]   │ │ [Add+]    │ │ [Add+]   │     │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
│                                                             │
│  My Purchases [▼]                                           │
└─────────────────────────────────────────────────────────────┘
```

**Cart checkout:** `POST /api/marketplace/checkout` → KV payment session → Stripe

### Screen 3.10: Community / Forum (`/community`)

**Purpose:** Discuss topics, ask questions, form study groups.

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Community                                   [New Post]     │
│  [All] [Q&A] [Study Groups] [Announcements] [Off-Topic]    │
├─────────────────────────────────────────────────────────────┤
│  🔍 [Search discussions...]                                  │
├─────────────────────────────────────────────────────────────┤
│  📌 Pinned: Welcome to the Community!                       │
│  📌 Pinned: Study Group Formation for Fall 2026             │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🔒 How do I configure Wireshark filters?             │  │
│  │ by jdoe · Q&A · 3h ago · 5 replies · 👁 24          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 📚 Study Group: Network Defense Exam Prep            │  │
│  │ by msmith · Study Groups · Yesterday · 12 members    │  │
│  │ [Join Group]                                          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 💡 Pro tip: Use nmap -sV for service detection       │  │
│  │ by instructor_kate · Tips · 2d ago · 18 upvotes     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Real-time:** WebSocket for new posts, replies, upvotes.  
**Pagination:** Cursor-based.

### Screen 3.11: Calendar (`/calendar`)

**Purpose:** Schedule view of classes, deadlines, events, office hours.

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Calendar                   [Month ▼] [Week ▼] [Day ▼]     │
│  ◀ November 2026 ▶                                          │
├────┬────┬────┬────┬────┬────┬───────────────────────────────┤
│ Sun│ Mon│ Tue│ Wed│ Thu│ Fri│ Sat                           │
├────┼────┼────┼────┼────┼────┼───────────────────────────────┤
│    │  1 │  2 │  3 │  4 │  5 │  6                            │
│    │    │    │ 📝 │    │ Lab│                               │
│    │    │    │Quiz│    │Due │                               │
│    │    │    │    │    │    │                               │
├────┼────┼────┼────┼────┼────┼───────────────────────────────┤
│  7 │  8 │  9 │ 10 │ 11 │ 12 │ 13                            │
│    │    │    │    │    │    │                               │
└────┴────┴────┴────┴────┴────┴───────────────────────────────┘
│  Upcoming Events:                                            │
│  ● Today 2:00 PM — Network Defense Class                    │
│  ● Wed Nov 3 — Quiz: Cryptography Fundamentals             │
│  ● Fri Nov 5 — Lab 4 Due                                   │
│  ● Mon Nov 8 — Office Hours: Prof. Smith                    │
└─────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/student/calendar?start=&end=`

### Screen 3.12: Messaging (`/messages`)

**Purpose:** Direct messaging with instructors, peers, study groups.

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Messages                                                    │
├───────────────┬─────────────────────────────────────────────┤
│  Conversations│  Chat: Prof. Smith                           │
│  🔍 Search    ├─────────────────────────────────────────────┤
│               │  Prof. Smith: Hi Alex, regarding your       │
│  📌 Prof.     │  question about Lab 4...                    │
│     Smith ✅  │                                             │
│  👤 Jane      │  You: Oh thanks! I was stuck on the         │
│     Doe       │  packet analysis step.                      │
│  👤 Study     │                                             │
│     Group:    │  Prof. Smith: Use filter "tcp.port==443"    │
│     Crypto    │                                             │
│  👤 Support   │  [Type a message...]                    [→] │
│  Bot          │                                             │
└───────────────┴─────────────────────────────────────────────┘
```

**Real-time:** WebSocket for instant messaging.  
**File sharing:** Image, document, code snippet upload.

### Screen 3.13: Finance (`/finance`)

**Purpose:** View tuition, payment plans, invoices, payment history.

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Finance & Billing                                           │
├─────────────────────────────────────────────────────────────┤
│  Total Balance: $2,450.00                    [Pay Now]      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Payment Plan: 4-month installment                   │  │
│  │ Next Payment: $1,225.00 — Due Nov 15, 2026         │  │
│  └──────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Recent Invoices                                             │
│  ┌────────────┬──────────┬──────────┬────────┬──────────┐  │
│  │ #INV-2026  │ Oct 1    │ $1,225   │ Paid   │ [PDF]   │  │
│  │ -001       │          │          │ ✅    │         │  │
│  ├────────────┼──────────┼──────────┼────────┼──────────┤  │
│  │ #INV-2026  │ Sep 1    │ $1,225   │ Paid   │ [PDF]   │  │
│  │ -000       │          │          │ ✅    │         │  │
│  └────────────┴──────────┴──────────┴────────┴──────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Payment Methods                                             │
│  ● Visa ending in 4242 (default)       [Edit] [Remove]      │
│  [Add Payment Method]                                        │
├─────────────────────────────────────────────────────────────┤
│  Financial Aid                                                │
│  ● Merit Scholarship: $500/semester — Active                 │
│  ● Need-Based Grant: Applied — Pending                       │
└─────────────────────────────────────────────────────────────┘
```

### Screen 3.14: Attendance (`/attendance`)

**Purpose:** View attendance record, absences, excused vs unexcused.

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Attendance                                                  │
│  Overall: 92% (46/50 sessions attended)     [View Policy]   │
├─────────────────────────────────────────────────────────────┤
│  Course: Network Defense                                     │
│  ┌────────┬────────┬──────────┬──────────┬────────────────┐ │
│  │ Date   │ Class  │ Status   │ Excused  │ Notes          │ │
│  ├────────┼────────┼──────────┼──────────┼────────────────┤ │
│  │ Oct 30 │ Module │ ✅ Present│ —        │                │ │
│  │        │ 3      │          │          │                │ │
│  │ Oct 28 │ Module │ ❌ Absent │ Yes      │ Doctor's note │ │
│  │        │ 2      │          │          │ attached       │ │
│  │ Oct 25 │ Module │ ✅ Present│ —        │                │ │
│  │        │ 2      │          │          │                │ │
│  └────────┴────────┴──────────┴──────────┴────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Attendance Policy Warning (if below threshold)              │
│  ⚠ Your attendance is below the 85% threshold. Continued    │
│    absences may affect your standing.                       │
└─────────────────────────────────────────────────────────────┘
```

### Screen 3.15: Certificates (`/certificates`)

**Purpose:** View and download earned certificates and credentials.

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  My Certificates                                             │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🏆 Python for Cybersecurity                          │  │
│  │ Issued: October 15, 2026 | Expires: Never            │  │
│  │ Credential ID: CEA-CERT-2026-00421                   │  │
│  │ [View Certificate] [Download PDF] [Share] [Verify]   │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🏆 Network Security Fundamentals                     │  │
│  │ Issued: September 1, 2026 | Expires: Never           │  │
│  │ [View Certificate] [Download PDF] [Share] [Verify]   │  │
│  └──────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  In Progress (earnable certificates)                         │
│  ● Cyber Defense Specialist — 65% complete                  │
│  ● Certified Ethical Hacker Prep — 30% complete             │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Full Database Schema (Additional to Shared Core)

### Table: `students`

| Column                  | Type           | Constraints                   | Default       | Description                                                   |
| ----------------------- | -------------- | ----------------------------- | ------------- | ------------------------------------------------------------- |
| `id`                    | `UUID`         | PK, FK → users.id             | —             | Same as user ID                                               |
| `student_number`        | `VARCHAR(20)`  | UNIQUE, NOT NULL              | —             | CEA-STU-YYYY-NNNNN                                            |
| `enrollment_status`     | `VARCHAR(50)`  | NOT NULL                      | `'pre_start'` | pre_start, active, on_leave, graduated, expelled, dropped_out |
| `cohort_id`             | `UUID`         | FK → cohorts.id, NULLABLE     | —             | Assigned cohort group                                         |
| `program_id`            | `UUID`         | FK → programs.id, NOT NULL    | —             | Primary program                                               |
| `enrollment_term`       | `VARCHAR(50)`  | NOT NULL                      | —             | Fall 2026, etc.                                               |
| `enrolled_at`           | `TIMESTAMPTZ`  | NOT NULL                      | —             | When enrolled                                                 |
| `start_date`            | `DATE`         | NULLABLE                      | —             | Program start                                                 |
| `expected_graduation`   | `DATE`         | NULLABLE                      | —             | —                                                             |
| `graduated_at`          | `TIMESTAMPTZ`  | NULLABLE                      | —             | —                                                             |
| `cumulative_gpa`        | `DECIMAL(3,2)` | NOT NULL                      | `0.00`        | 0.00-4.00                                                     |
| `total_credits_earned`  | `INTEGER`      | NOT NULL                      | `0`           | —                                                             |
| `attendance_percentage` | `DECIMAL(5,2)` | NOT NULL                      | `100.00`      | 0.00-100.00                                                   |
| `advisor_id`            | `UUID`         | FK → instructors.id, NULLABLE | —             | Academic advisor                                              |
| `portfolio_url`         | `VARCHAR(500)` | NULLABLE                      | —             | Public portfolio slug                                         |
| `created_at`            | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()`       | —                                                             |
| `updated_at`            | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()`       | —                                                             |

**Indexes:**

- `idx_students_number` ON `student_number`
- `idx_students_cohort` ON `cohort_id`
- `idx_students_program` ON `program_id`
- `idx_students_status` ON `enrollment_status`
- `idx_students_gpa` ON `cumulative_gpa`

### Table: `cohorts`

| Column       | Type           | Constraints                | Default | Description      |
| ------------ | -------------- | -------------------------- | ------- | ---------------- |
| `id`         | `UUID`         | PK                         | —       | —                |
| `name`       | `VARCHAR(200)` | NOT NULL                   | —       | "CF-2026-Fall-A" |
| `program_id` | `UUID`         | FK → programs.id, NOT NULL | —       | —                |
| `term`       | `VARCHAR(50)`  | NOT NULL                   | —       | —                |
| `start_date` | `DATE`         | NOT NULL                   | —       | —                |
| `end_date`   | `DATE`         | NOT NULL                   | —       | —                |
| `max_size`   | `INTEGER`      | NOT NULL                   | —       | —                |
| `created_at` | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()` | —                |

### Table: `enrollments`

| Column                | Type           | Constraints                | Default    | Description                |
| --------------------- | -------------- | -------------------------- | ---------- | -------------------------- |
| `id`                  | `UUID`         | PK                         | —          | —                          |
| `student_id`          | `UUID`         | FK → students.id, NOT NULL | —          | —                          |
| `course_id`           | `UUID`         | FK → courses.id, NOT NULL  | —          | —                          |
| `status`              | `VARCHAR(50)`  | NOT NULL                   | `'active'` | active, completed, dropped |
| `progress_percentage` | `INTEGER`      | NOT NULL                   | `0`        | 0-100                      |
| `started_at`          | `TIMESTAMPTZ`  | NULLABLE                   | —          | —                          |
| `completed_at`        | `TIMESTAMPTZ`  | NULLABLE                   | —          | —                          |
| `grade`               | `DECIMAL(5,2)` | NULLABLE                   | —          | 0-100                      |
| `letter_grade`        | `VARCHAR(2)`   | NULLABLE                   | —          | A, A-, B+, etc.            |
| `created_at`          | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()`    | —                          |

**Indexes:** UNIQUE(student_id, course_id)

### Table: `courses`

| Column          | Type           | Constraints                   | Default | Description        |
| --------------- | -------------- | ----------------------------- | ------- | ------------------ |
| `id`            | `UUID`         | PK                            | —       | —                  |
| `program_id`    | `UUID`         | FK → programs.id, NOT NULL    | —       | —                  |
| `title`         | `VARCHAR(255)` | NOT NULL                      | —       | —                  |
| `slug`          | `VARCHAR(200)` | UNIQUE                        | —       | —                  |
| `description`   | `TEXT`         | NOT NULL                      | —       | —                  |
| `instructor_id` | `UUID`         | FK → instructors.id, NULLABLE | —       | Primary instructor |
| `sort_order`    | `INTEGER`      | NOT NULL                      | —       | —                  |
| `credits`       | `INTEGER`      | NOT NULL                      | `3`     | —                  |
| `passing_grade` | `DECIMAL(5,2)` | NOT NULL                      | `70.00` | —                  |
| `created_at`    | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()` | —                  |

### Table: `modules`

| Column            | Type           | Constraints               | Default | Description |
| ----------------- | -------------- | ------------------------- | ------- | ----------- |
| `id`              | `UUID`         | PK                        | —       | —           |
| `course_id`       | `UUID`         | FK → courses.id, NOT NULL | —       | —           |
| `title`           | `VARCHAR(255)` | NOT NULL                  | —       | —           |
| `sort_order`      | `INTEGER`      | NOT NULL                  | —       | —           |
| `description`     | `TEXT`         | NULLABLE                  | —       | —           |
| `estimated_hours` | `DECIMAL(5,1)` | NOT NULL                  | —       | —           |
| `created_at`      | `TIMESTAMPTZ`  | NOT NULL                  | `NOW()` | —           |

### Table: `lessons`

| Column             | Type           | Constraints               | Default | Description                                       |
| ------------------ | -------------- | ------------------------- | ------- | ------------------------------------------------- |
| `id`               | `UUID`         | PK                        | —       | —                                                 |
| `module_id`        | `UUID`         | FK → modules.id, NOT NULL | —       | —                                                 |
| `title`            | `VARCHAR(255)` | NOT NULL                  | —       | —                                                 |
| `slug`             | `VARCHAR(200)` | NOT NULL                  | —       | —                                                 |
| `sort_order`       | `INTEGER`      | NOT NULL                  | —       | —                                                 |
| `content_type`     | `VARCHAR(50)`  | NOT NULL                  | —       | video, article, quiz, coding_exercise, assignment |
| `content_data`     | `JSONB`        | NOT NULL                  | —       | Type-specific content payload                     |
| `duration_minutes` | `INTEGER`      | NOT NULL                  | —       | —                                                 |
| `video_url`        | `VARCHAR(500)` | NULLABLE                  | —       | Mux/Cloudflare Stream URL                         |
| `video_duration`   | `INTEGER`      | NULLABLE                  | —       | In seconds                                        |
| `transcript`       | `TEXT`         | NULLABLE                  | —       | Full transcript                                   |
| `is_required`      | `BOOLEAN`      | NOT NULL                  | `true`  | —                                                 |
| `created_at`       | `TIMESTAMPTZ`  | NOT NULL                  | `NOW()` | —                                                 |
| `updated_at`       | `TIMESTAMPTZ`  | NOT NULL                  | `NOW()` | —                                                 |

### Table: `lesson_progress`

| Column                | Type           | Constraints                | Default         | Description                         |
| --------------------- | -------------- | -------------------------- | --------------- | ----------------------------------- |
| `id`                  | `UUID`         | PK                         | —               | —                                   |
| `student_id`          | `UUID`         | FK → students.id, NOT NULL | —               | —                                   |
| `lesson_id`           | `UUID`         | FK → lessons.id, NOT NULL  | —               | —                                   |
| `status`              | `VARCHAR(50)`  | NOT NULL                   | `'not_started'` | not_started, in_progress, completed |
| `progress_percentage` | `INTEGER`      | NOT NULL                   | `0`             | 0-100                               |
| `video_position`      | `INTEGER`      | NOT NULL                   | `0`             | Seconds                             |
| `completed_at`        | `TIMESTAMPTZ`  | NULLABLE                   | —               | —                                   |
| `attempts`            | `INTEGER`      | NOT NULL                   | `0`             | —                                   |
| `score`               | `DECIMAL(5,2)` | NULLABLE                   | —               | For quizzes/coding                  |
| `started_at`          | `TIMESTAMPTZ`  | NULLABLE                   | —               | —                                   |
| `updated_at`          | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()`         | —                                   |

**Indexes:** UNIQUE(student_id, lesson_id)

### Table: `assignments`

| Column                  | Type           | Constraints               | Default | Description                                     |
| ----------------------- | -------------- | ------------------------- | ------- | ----------------------------------------------- |
| `id`                    | `UUID`         | PK                        | —       | —                                               |
| `course_id`             | `UUID`         | FK → courses.id, NOT NULL | —       | —                                               |
| `module_id`             | `UUID`         | FK → modules.id, NULLABLE | —       | —                                               |
| `title`                 | `VARCHAR(255)` | NOT NULL                  | —       | —                                               |
| `description`           | `TEXT`         | NOT NULL                  | —       | Full instructions                               |
| `assignment_type`       | `VARCHAR(50)`  | NOT NULL                  | —       | lab, project, essay, coding_challenge, research |
| `points_possible`       | `INTEGER`      | NOT NULL                  | —       | —                                               |
| `weight`                | `DECIMAL(5,2)` | NOT NULL                  | —       | Percentage weight in course grade               |
| `due_at`                | `TIMESTAMPTZ`  | NOT NULL                  | —       | —                                               |
| `available_from`        | `TIMESTAMPTZ`  | NULLABLE                  | —       | —                                               |
| `available_until`       | `TIMESTAMPTZ`  | NULLABLE                  | —       | Hard cutoff                                     |
| `allow_late_submission` | `BOOLEAN`      | NOT NULL                  | `false` | —                                               |
| `late_penalty_percent`  | `DECIMAL(5,2)` | NULLABLE                  | —       | Per-day penalty %                               |
| `max_attempts`          | `INTEGER`      | NOT NULL                  | `1`     | Resubmission limit                              |
| `allow_resubmission`    | `BOOLEAN`      | NOT NULL                  | `false` | —                                               |
| `rubric`                | `JSONB`        | NULLABLE                  | —       | Criterias with max points                       |
| `attachment_urls`       | `JSONB`        | NULLABLE                  | —       | Resource files                                  |
| `created_at`            | `TIMESTAMPTZ`  | NOT NULL                  | `NOW()` | —                                               |

### Table: `submissions`

| Column            | Type           | Constraints                   | Default   | Description                        |
| ----------------- | -------------- | ----------------------------- | --------- | ---------------------------------- |
| `id`              | `UUID`         | PK                            | —         | —                                  |
| `assignment_id`   | `UUID`         | FK → assignments.id, NOT NULL | —         | —                                  |
| `student_id`      | `UUID`         | FK → students.id, NOT NULL    | —         | —                                  |
| `attempt_number`  | `INTEGER`      | NOT NULL                      | `1`       | —                                  |
| `status`          | `VARCHAR(50)`  | NOT NULL                      | `'draft'` | draft, submitted, graded, returned |
| `submission_text` | `TEXT`         | NULLABLE                      | —         | Rich text answer                   |
| `file_urls`       | `JSONB`        | NULLABLE                      | —         | Submitted file R2 keys             |
| `comments`        | `TEXT`         | NULLABLE                      | —         | Student note to instructor         |
| `submitted_at`    | `TIMESTAMPTZ`  | NULLABLE                      | —         | —                                  |
| `grade`           | `DECIMAL(5,2)` | NULLABLE                      | —         | 0-100                              |
| `letter_grade`    | `VARCHAR(2)`   | NULLABLE                      | —         | —                                  |
| `grader_id`       | `UUID`         | FK → instructors.id, NULLABLE | —         | —                                  |
| `graded_at`       | `TIMESTAMPTZ`  | NULLABLE                      | —         | —                                  |
| `feedback`        | `TEXT`         | NULLABLE                      | —         | Instructor feedback                |
| `rubric_scores`   | `JSONB`        | NULLABLE                      | —         | Per-criterion scores               |
| `penalty_points`  | `DECIMAL(5,2)` | NOT NULL                      | `0`       | —                                  |
| `created_at`      | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()`   | —                                  |

**Indexes:** UNIQUE(assignment_id, student_id, attempt_number)

### Table: `assessments`

| Column               | Type           | Constraints               | Default | Description                    |
| -------------------- | -------------- | ------------------------- | ------- | ------------------------------ |
| `id`                 | `UUID`         | PK                        | —       | —                              |
| `course_id`          | `UUID`         | FK → courses.id, NOT NULL | —       | —                              |
| `module_id`          | `UUID`         | FK → modules.id, NULLABLE | —       | —                              |
| `title`              | `VARCHAR(255)` | NOT NULL                  | —       | —                              |
| `assessment_type`    | `VARCHAR(50)`  | NOT NULL                  | —       | quiz, midterm, final, practice |
| `time_limit_minutes` | `INTEGER`      | NULLABLE                  | —       | Null = no limit                |
| `max_attempts`       | `INTEGER`      | NOT NULL                  | `1`     | —                              |
| `passing_score`      | `DECIMAL(5,2)` | NULLABLE                  | —       | —                              |
| `shuffle_questions`  | `BOOLEAN`      | NOT NULL                  | `true`  | —                              |
| `show_results`       | `BOOLEAN`      | NOT NULL                  | `true`  | Show correct answers after     |
| `questions`          | `JSONB`        | NOT NULL                  | —       | Array of question objects      |
| `created_at`         | `TIMESTAMPTZ`  | NOT NULL                  | `NOW()` | —                              |

### Table: `assessment_attempts`

| Column               | Type           | Constraints                   | Default         | Description                               |
| -------------------- | -------------- | ----------------------------- | --------------- | ----------------------------------------- |
| `id`                 | `UUID`         | PK                            | —               | —                                         |
| `assessment_id`      | `UUID`         | FK → assessments.id, NOT NULL | —               | —                                         |
| `student_id`         | `UUID`         | FK → students.id, NOT NULL    | —               | —                                         |
| `attempt_number`     | `INTEGER`      | NOT NULL                      | —               | —                                         |
| `status`             | `VARCHAR(50)`  | NOT NULL                      | `'in_progress'` | in_progress, submitted, timed_out, graded |
| `answers`            | `JSONB`        | NULLABLE                      | —               | Question_id → answer                      |
| `score`              | `DECIMAL(5,2)` | NULLABLE                      | —               | —                                         |
| `started_at`         | `TIMESTAMPTZ`  | NOT NULL                      | —               | —                                         |
| `submitted_at`       | `TIMESTAMPTZ`  | NULLABLE                      | —               | —                                         |
| `time_spent_seconds` | `INTEGER`      | NOT NULL                      | `0`             | —                                         |
| `created_at`         | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()`         | —                                         |

### Table: `grades`

| Column          | Type           | Constraints                | Default | Description                                    |
| --------------- | -------------- | -------------------------- | ------- | ---------------------------------------------- |
| `id`            | `UUID`         | PK                         | —       | —                                              |
| `student_id`    | `UUID`         | FK → students.id, NOT NULL | —       | —                                              |
| `course_id`     | `UUID`         | FK → courses.id, NOT NULL  | —       | —                                              |
| `gradable_type` | `VARCHAR(50)`  | NOT NULL                   | —       | assignment, assessment, participation, project |
| `gradable_id`   | `UUID`         | NOT NULL                   | —       | Polymorphic reference                          |
| `score`         | `DECIMAL(5,2)` | NOT NULL                   | —       | 0-100                                          |
| `max_score`     | `DECIMAL(5,2)` | NOT NULL                   | —       | —                                              |
| `weight`        | `DECIMAL(5,4)` | NOT NULL                   | —       | —                                              |
| `letter_grade`  | `VARCHAR(2)`   | NULLABLE                   | —       | —                                              |
| `created_at`    | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()` | —                                              |

**Indexes:** UNIQUE(student_id, course_id, gradable_type, gradable_id)

### Table: `portfolio_projects`

| Column        | Type           | Constraints                | Default | Description         |
| ------------- | -------------- | -------------------------- | ------- | ------------------- |
| `id`          | `UUID`         | PK                         | —       | —                   |
| `student_id`  | `UUID`         | FK → students.id, NOT NULL | —       | —                   |
| `title`       | `VARCHAR(255)` | NOT NULL                   | —       | —                   |
| `description` | `TEXT`         | NULLABLE                   | —       | —                   |
| `project_url` | `VARCHAR(500)` | NULLABLE                   | —       | Live demo link      |
| `github_url`  | `VARCHAR(500)` | NULLABLE                   | —       | Source code         |
| `media_urls`  | `JSONB`        | NULLABLE                   | —       | Screenshots, videos |
| `skills`      | `JSONB`        | NULLABLE                   | —       | Array of skill tags |
| `sort_order`  | `INTEGER`      | NOT NULL                   | `0`     | —                   |
| `is_public`   | `BOOLEAN`      | NOT NULL                   | `true`  | —                   |
| `created_at`  | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()` | —                   |
| `updated_at`  | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()` | —                   |

### Table: `portfolio_skills`

| Column        | Type           | Constraints                | Default | Description |
| ------------- | -------------- | -------------------------- | ------- | ----------- |
| `id`          | `UUID`         | PK                         | —       | —           |
| `student_id`  | `UUID`         | FK → students.id, NOT NULL | —       | —           |
| `name`        | `VARCHAR(100)` | NOT NULL                   | —       | —           |
| `proficiency` | `INTEGER`      | NOT NULL                   | `3`     | 1-5         |
| `sort_order`  | `INTEGER`      | NOT NULL                   | `0`     | —           |
| `created_at`  | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()` | —           |

**Indexes:** UNIQUE(student_id, name)

### Table: `certificates`

| Column             | Type           | Constraints                | Default | Description                                             |
| ------------------ | -------------- | -------------------------- | ------- | ------------------------------------------------------- |
| `id`               | `UUID`         | PK                         | —       | —                                                       |
| `student_id`       | `UUID`         | FK → students.id, NOT NULL | —       | —                                                       |
| `type`             | `VARCHAR(50)`  | NOT NULL                   | —       | course_completion, program_completion, micro_credential |
| `name`             | `VARCHAR(255)` | NOT NULL                   | —       | "Python for Cybersecurity"                              |
| `credential_id`    | `VARCHAR(100)` | UNIQUE, NOT NULL           | —       | CEA-CERT-YYYY-NNNNN                                     |
| `issued_at`        | `TIMESTAMPTZ`  | NOT NULL                   | —       | —                                                       |
| `expires_at`       | `TIMESTAMPTZ`  | NULLABLE                   | —       | If applicable                                           |
| `pdf_url`          | `VARCHAR(500)` | NOT NULL                   | —       | Generated PDF in R2                                     |
| `verification_url` | `VARCHAR(500)` | NOT NULL                   | —       | Public verify page                                      |
| `metadata`         | `JSONB`        | NULLABLE                   | —       | Skills, scores, etc.                                    |
| `created_at`       | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()` | —                                                       |

### Table: `marketplace_items`

| Column          | Type            | Constraints | Default | Description                                 |
| --------------- | --------------- | ----------- | ------- | ------------------------------------------- |
| `id`            | `UUID`          | PK          | —       | —                                           |
| `title`         | `VARCHAR(255)`  | NOT NULL    | —       | —                                           |
| `description`   | `TEXT`          | NOT NULL    | —       | —                                           |
| `price`         | `DECIMAL(10,2)` | NOT NULL    | —       | 0 = free                                    |
| `currency`      | `VARCHAR(3)`    | NOT NULL    | `'USD'` | —                                           |
| `category`      | `VARCHAR(100)`  | NOT NULL    | —       | resource, tool, mentoring, template, course |
| `thumbnail_url` | `VARCHAR(500)`  | NULLABLE    | —       | —                                           |
| `file_url`      | `VARCHAR(500)`  | NULLABLE    | —       | Digital download                            |
| `is_featured`   | `BOOLEAN`       | NOT NULL    | `false` | —                                           |
| `active`        | `BOOLEAN`       | NOT NULL    | `true`  | —                                           |
| `created_at`    | `TIMESTAMPTZ`   | NOT NULL    | `NOW()` | —                                           |

### Table: `purchases`

| Column                     | Type            | Constraints                         | Default       | Description                  |
| -------------------------- | --------------- | ----------------------------------- | ------------- | ---------------------------- |
| `id`                       | `UUID`          | PK                                  | —             | —                            |
| `student_id`               | `UUID`          | FK → students.id, NOT NULL          | —             | —                            |
| `item_id`                  | `UUID`          | FK → marketplace_items.id, NOT NULL | —             | —                            |
| `stripe_payment_intent_id` | `VARCHAR(255)`  | NOT NULL                            | —             | —                            |
| `amount`                   | `DECIMAL(10,2)` | NOT NULL                            | —             | —                            |
| `status`                   | `VARCHAR(50)`   | NOT NULL                            | `'completed'` | completed, refunded, pending |
| `purchased_at`             | `TIMESTAMPTZ`   | NOT NULL                            | `NOW()`       | —                            |

### Table: `forum_posts`

| Column            | Type           | Constraints             | Default | Description                                      |
| ----------------- | -------------- | ----------------------- | ------- | ------------------------------------------------ |
| `id`              | `UUID`         | PK                      | —       | —                                                |
| `author_id`       | `UUID`         | FK → users.id, NOT NULL | —       | —                                                |
| `category`        | `VARCHAR(50)`  | NOT NULL                | —       | qa, study_groups, announcements, off_topic, tips |
| `title`           | `VARCHAR(255)` | NOT NULL                | —       | —                                                |
| `content`         | `TEXT`         | NOT NULL                | —       | Rich text                                        |
| `is_pinned`       | `BOOLEAN`      | NOT NULL                | `false` | —                                                |
| `is_announcement` | `BOOLEAN`      | NOT NULL                | `false` | —                                                |
| `upvote_count`    | `INTEGER`      | NOT NULL                | `0`     | —                                                |
| `reply_count`     | `INTEGER`      | NOT NULL                | `0`     | —                                                |
| `view_count`      | `INTEGER`      | NOT NULL                | `0`     | —                                                |
| `created_at`      | `TIMESTAMPTZ`  | NOT NULL                | `NOW()` | —                                                |
| `updated_at`      | `TIMESTAMPTZ`  | NOT NULL                | `NOW()` | —                                                |

### Table: `forum_replies`

| Column         | Type          | Constraints                     | Default | Description      |
| -------------- | ------------- | ------------------------------- | ------- | ---------------- |
| `id`           | `UUID`        | PK                              | —       | —                |
| `post_id`      | `UUID`        | FK → forum_posts.id, NOT NULL   | —       | —                |
| `parent_id`    | `UUID`        | FK → forum_replies.id, NULLABLE | —       | Nested threading |
| `author_id`    | `UUID`        | FK → users.id, NOT NULL         | —       | —                |
| `content`      | `TEXT`        | NOT NULL                        | —       | —                |
| `upvote_count` | `INTEGER`     | NOT NULL                        | `0`     | —                |
| `is_solution`  | `BOOLEAN`     | NOT NULL                        | `false` | Marked as answer |
| `created_at`   | `TIMESTAMPTZ` | NOT NULL                        | `NOW()` | —                |

### Table: `messages`

| Column            | Type           | Constraints                     | Default  | Description             |
| ----------------- | -------------- | ------------------------------- | -------- | ----------------------- |
| `id`              | `UUID`         | PK                              | —        | —                       |
| `sender_id`       | `UUID`         | FK → users.id, NOT NULL         | —        | —                       |
| `conversation_id` | `UUID`         | FK → conversations.id, NOT NULL | —        | —                       |
| `content`         | `TEXT`         | NOT NULL                        | —        | —                       |
| `content_type`    | `VARCHAR(50)`  | NOT NULL                        | `'text'` | text, image, file, code |
| `file_url`        | `VARCHAR(500)` | NULLABLE                        | —        | —                       |
| `read_at`         | `TIMESTAMPTZ`  | NULLABLE                        | —        | —                       |
| `created_at`      | `TIMESTAMPTZ`  | NOT NULL                        | `NOW()`  | —                       |

### Table: `conversations`

| Column       | Type           | Constraints | Default    | Description                |
| ------------ | -------------- | ----------- | ---------- | -------------------------- |
| `id`         | `UUID`         | PK          | —          | —                          |
| `type`       | `VARCHAR(50)`  | NOT NULL    | `'direct'` | direct, group, study_group |
| `title`      | `VARCHAR(255)` | NULLABLE    | —          | For group chats            |
| `created_at` | `TIMESTAMPTZ`  | NOT NULL    | `NOW()`    | —                          |

### Table: `conversation_participants`

| Column            | Type          | Constraints                     | Default | Description |
| ----------------- | ------------- | ------------------------------- | ------- | ----------- |
| `conversation_id` | `UUID`        | FK → conversations.id, NOT NULL | —       | —           |
| `user_id`         | `UUID`        | FK → users.id, NOT NULL         | —       | —           |
| `last_read_at`    | `TIMESTAMPTZ` | NOT NULL                        | `NOW()` | —           |
| `joined_at`       | `TIMESTAMPTZ` | NOT NULL                        | `NOW()` | —           |

**PK:** (conversation_id, user_id)

### Table: `attendance`

| Column                  | Type           | Constraints                   | Default | Description                    |
| ----------------------- | -------------- | ----------------------------- | ------- | ------------------------------ |
| `id`                    | `UUID`         | PK                            | —       | —                              |
| `student_id`            | `UUID`         | FK → students.id, NOT NULL    | —       | —                              |
| `course_id`             | `UUID`         | FK → courses.id, NOT NULL     | —       | —                              |
| `session_date`          | `DATE`         | NOT NULL                      | —       | —                              |
| `status`                | `VARCHAR(50)`  | NOT NULL                      | —       | present, absent, excused, late |
| `excused_reason`        | `TEXT`         | NULLABLE                      | —       | —                              |
| `excuse_attachment_url` | `VARCHAR(500)` | NULLABLE                      | —       | —                              |
| `marked_by`             | `UUID`         | FK → instructors.id, NOT NULL | —       | —                              |
| `created_at`            | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()` | —                              |

**Indexes:** UNIQUE(student_id, course_id, session_date)

### Table: `calendar_events`

| Column        | Type           | Constraints                | Default | Description                                                   |
| ------------- | -------------- | -------------------------- | ------- | ------------------------------------------------------------- |
| `id`          | `UUID`         | PK                         | —       | —                                                             |
| `student_id`  | `UUID`         | FK → students.id, NULLABLE | —       | Null = global event                                           |
| `course_id`   | `UUID`         | FK → courses.id, NULLABLE  | —       | —                                                             |
| `title`       | `VARCHAR(255)` | NOT NULL                   | —       | —                                                             |
| `description` | `TEXT`         | NULLABLE                   | —       | —                                                             |
| `event_type`  | `VARCHAR(50)`  | NOT NULL                   | —       | class, office_hours, deadline, exam, study_group, appointment |
| `start_at`    | `TIMESTAMPTZ`  | NOT NULL                   | —       | —                                                             |
| `end_at`      | `TIMESTAMPTZ`  | NOT NULL                   | —       | —                                                             |
| `all_day`     | `BOOLEAN`      | NOT NULL                   | `false` | —                                                             |
| `location`    | `VARCHAR(255)` | NULLABLE                   | —       | Room or virtual link                                          |
| `meeting_url` | `VARCHAR(500)` | NULLABLE                   | —       | Zoom/Teams link                                               |
| `created_at`  | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()` | —                                                             |

### Table: `invoices`

| Column              | Type            | Constraints                | Default     | Description                                 |
| ------------------- | --------------- | -------------------------- | ----------- | ------------------------------------------- |
| `id`                | `UUID`          | PK                         | —           | —                                           |
| `student_id`        | `UUID`          | FK → students.id, NOT NULL | —           | —                                           |
| `invoice_number`    | `VARCHAR(50)`   | UNIQUE, NOT NULL           | —           | INV-YYYY-NNNNN                              |
| `description`       | `VARCHAR(500)`  | NOT NULL                   | —           | —                                           |
| `amount`            | `DECIMAL(10,2)` | NOT NULL                   | —           | —                                           |
| `currency`          | `VARCHAR(3)`    | NOT NULL                   | `'USD'`     | —                                           |
| `status`            | `VARCHAR(50)`   | NOT NULL                   | `'pending'` | pending, paid, overdue, cancelled, refunded |
| `due_date`          | `DATE`          | NOT NULL                   | —           | —                                           |
| `paid_at`           | `TIMESTAMPTZ`   | NULLABLE                   | —           | —                                           |
| `stripe_invoice_id` | `VARCHAR(255)`  | NULLABLE                   | —           | —                                           |
| `pdf_url`           | `VARCHAR(500)`  | NULLABLE                   | —           | —                                           |
| `created_at`        | `TIMESTAMPTZ`   | NOT NULL                   | `NOW()`     | —                                           |

### Table: `payments`

| Column                     | Type            | Constraints                | Default | Description                 |
| -------------------------- | --------------- | -------------------------- | ------- | --------------------------- |
| `id`                       | `UUID`          | PK                         | —       | —                           |
| `invoice_id`               | `UUID`          | FK → invoices.id, NOT NULL | —       | —                           |
| `student_id`               | `UUID`          | FK → students.id, NOT NULL | —       | —                           |
| `amount`                   | `DECIMAL(10,2)` | NOT NULL                   | —       | —                           |
| `stripe_payment_intent_id` | `VARCHAR(255)`  | NOT NULL                   | —       | —                           |
| `stripe_payment_method`    | `VARCHAR(50)`   | NULLABLE                   | —       | card, bank_transfer         |
| `status`                   | `VARCHAR(50)`   | NOT NULL                   | —       | succeeded, failed, refunded |
| `paid_at`                  | `TIMESTAMPTZ`   | NOT NULL                   | `NOW()` | —                           |

### Table: `study_groups`

| Column        | Type           | Constraints               | Default | Description |
| ------------- | -------------- | ------------------------- | ------- | ----------- |
| `id`          | `UUID`         | PK                        | —       | —           |
| `name`        | `VARCHAR(255)` | NOT NULL                  | —       | —           |
| `course_id`   | `UUID`         | FK → courses.id, NULLABLE | —       | —           |
| `created_by`  | `UUID`         | FK → users.id, NOT NULL   | —       | —           |
| `max_members` | `INTEGER`      | NOT NULL                  | `10`    | —           |
| `description` | `TEXT`         | NULLABLE                  | —       | —           |
| `created_at`  | `TIMESTAMPTZ`  | NOT NULL                  | `NOW()` | —           |

---

## 5. Complete API Contract

### `GET /api/student/dashboard`

**Auth:** Required (student role)

**Response:**

```typescript
interface DashboardResponse {
  welcome: { firstName: string; programName: string; term: string };
  nextClass: {
    courseName: string;
    moduleName: string;
    startTime: string; // ISO
    meetingUrl: string | null;
    instructorName: string;
  } | null;
  pendingTasks: {
    id: string;
    title: string;
    type: "assignment" | "assessment" | "project";
    dueAt: string;
    courseName: string;
    priority: "high" | "medium" | "low";
  }[];
  weeklyStats: {
    hoursSpent: number;
    averageScore: number;
    completedCount: number;
    totalCount: number;
    percentileRank: number | null;
  };
  recentActivity: {
    id: string;
    type: "grade" | "submission" | "announcement" | "forum";
    message: string;
    timestamp: string;
    link: string;
  }[];
  upcomingDeadlines: {
    id: string;
    title: string;
    dueAt: string;
    courseName: string;
  }[];
}
```

### `GET /api/student/enrollments`

**Auth:** Required (student)

**Response:**

```typescript
interface EnrollmentsResponse {
  enrollments: EnrollmentWithProgress[];
}

interface EnrollmentWithProgress {
  id: string;
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  instructorName: string;
  progressPercentage: number;
  grade: number | null;
  letterGrade: string | null;
  modules: ModuleWithLessons[];
}

interface ModuleWithLessons {
  id: string;
  title: string;
  sortOrder: number;
  progressPercentage: number;
  estimatedHours: number;
  lessons: LessonProgress[];
}

interface LessonProgress {
  id: string;
  title: string;
  sortOrder: number;
  contentType: string;
  durationMinutes: number;
  status: "not_started" | "in_progress" | "completed";
  progressPercentage: number;
  videoPosition: number;
  score: number | null;
}
```

### `GET /api/student/lessons/:id`

**Auth:** Required (student enrolled in course)

**Response:**

```typescript
interface LessonDetailResponse {
  lesson: {
    id: string;
    title: string;
    moduleTitle: string;
    courseTitle: string;
    contentType: "video" | "article" | "quiz" | "coding_exercise" | "assignment";
    contentData: Record<string, any>;
    videoUrl: string | null;
    transcript: string | null;
    durationMinutes: number;
    progress: {
      status: string;
      progressPercentage: number;
      videoPosition: number;
      score: number | null;
    };
  };
  navigation: {
    prevLesson: { id: string; title: string } | null;
    nextLesson: { id: string; title: string } | null;
    moduleIndex: number;
    lessonIndex: number;
    totalInModule: number;
  };
}
```

### `POST /api/student/lessons/:id/progress`

**Auth:** Required (student)

**Request:**

```typescript
interface UpdateLessonProgressRequest {
  progressPercentage?: number; // 0-100
  videoPosition?: number; // seconds
  status?: "in_progress" | "completed";
  score?: number; // for quizzes
}
```

**Response:** `{ progress: LessonProgress }`

### `GET /api/student/assignments`

**Auth:** Required (student)

**Query:** `filter?: 'pending' | 'submitted' | 'graded' | 'late'`

**Response:**

```typescript
interface AssignmentsResponse {
  assignments: AssignmentCard[];
}

interface AssignmentCard {
  id: string;
  title: string;
  courseName: string;
  courseId: string;
  moduleName: string;
  pointsPossible: number;
  weight: number;
  dueAt: string;
  status: "not_started" | "in_progress" | "submitted" | "graded" | "late" | "returned";
  submissionStatus: string | null;
  grade: number | null;
  letterGrade: string | null;
  submissionCount: number;
  maxAttempts: number;
  isLate: boolean;
  daysUntilDue: number;
  timeEstimate: string;
}
```

### `GET /api/student/assignments/:id`

**Auth:** Required (student)

**Response:**

```typescript
interface AssignmentDetailResponse {
  assignment: {
    id: string;
    title: string;
    description: string; // Rich HTML/MDX
    assignmentType: string;
    pointsPossible: number;
    weight: number;
    dueAt: string;
    availableUntil: string | null;
    allowLateSubmission: boolean;
    latePenaltyPercent: number | null;
    maxAttempts: number;
    allowResubmission: boolean;
    rubric: RubricCriterion[] | null;
    attachmentUrls: string[];
    resources: ResourceLink[];
  };
  mySubmissions: SubmissionSummary[];
  canSubmit: boolean;
  remainingAttempts: number;
}

interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
}

interface ResourceLink {
  title: string;
  url: string;
}
```

### `POST /api/student/assignments/:id/submit`

**Auth:** Required (student, enrolled)

**Request:** `multipart/form-data`

```typescript
interface SubmitAssignmentRequest {
  files?: File[];
  submissionText?: string;
  comments?: string;
}
```

**Response:**

```typescript
interface SubmitAssignmentResponse {
  submission: SubmissionSummary;
  message: string;
  remainingAttempts: number;
}
```

### `GET /api/student/grades`

**Auth:** Required (student)

**Query:** `courseId?: string`

**Response:**

```typescript
interface GradesResponse {
  overallGpa: number;
  programName: string;
  courseGrades: CourseGrade[];
}

interface CourseGrade {
  courseId: string;
  courseTitle: string;
  averageScore: number;
  letterGrade: string | null;
  weight: number;
  gradeItems: GradeItem[];
}

interface GradeItem {
  id: string;
  title: string;
  type: string;
  score: number | null;
  maxScore: number;
  percentage: number | null;
  weight: number;
  gradedAt: string | null;
}
```

### `GET /api/student/portfolio`

**Auth:** Required (student)

**Response:**

```typescript
interface PortfolioResponse {
  profile: {
    firstName: string;
    lastName: string;
    title: string;
    bio: string;
    avatarUrl: string;
    contactEmail: string;
    linkedinUrl: string | null;
    githubUrl: string | null;
    websiteUrl: string | null;
    publicUrl: string;
  };
  skills: { id: string; name: string; proficiency: number }[];
  projects: PortfolioProject[];
  certificates: PortfolioCertificate[];
  education: PortfolioEducation[];
  experience: PortfolioExperience[];
}
```

### `PUT /api/student/portfolio/profile`

**Auth:** Required (student)

**Request:**

```typescript
interface UpdatePortfolioProfileRequest {
  title?: string;
  bio?: string;
  contactEmail?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  avatar?: File; // multipart
}
```

### `GET /api/student/marketplace`

**Auth:** Required (student)

**Query:** `category?: string, search?: string`

### `POST /api/student/marketplace/checkout`

**Auth:** Required (student)

**Request:**

```typescript
interface CheckoutRequest {
  itemIds: string[];
  successUrl: string;
  cancelUrl: string;
}
```

**Response:**

```typescript
interface CheckoutResponse {
  sessionUrl: string; // Stripe Checkout URL
  sessionId: string;
}
```

### `GET /api/student/community`

**Auth:** Required (student)

**Query:** `category?: string, cursor?: string, limit?: number`

### `POST /api/student/community/posts`

**Auth:** Required (student)

**Request:**

```typescript
interface CreatePostRequest {
  category: string;
  title: string;
  content: string;
}
```

### `GET /api/student/conversations`

**Auth:** Required (student) — returns list of conversations with unread counts

### `POST /api/student/messages`

**Auth:** Required (student) — send message

**Request:**

```typescript
interface SendMessageRequest {
  conversationId: string;
  content: string;
  contentType?: "text" | "image" | "file" | "code";
  file?: File; // multipart
}
```

### `GET /api/student/calendar`

**Auth:** Required (student)

**Query:** `start: string (ISO), end: string (ISO)`

**Response:**

```typescript
interface CalendarResponse {
  events: CalendarEvent[];
}

interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  eventType: string;
  startAt: string;
  endAt: string;
  allDay: boolean;
  location: string | null;
  meetingUrl: string | null;
  courseName: string | null;
}
```

### `GET /api/student/finance`

**Auth:** Required (student)

**Response:**

```typescript
interface FinanceResponse {
  totalBalance: number;
  currency: string;
  paymentPlan: {
    type: string;
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    nextPayment: { amount: number; dueDate: string } | null;
  };
  invoices: Invoice[];
  paymentMethods: PaymentMethod[];
  scholarships: {
    name: string;
    amount: number;
    status: string;
  }[];
}
```

### `GET /api/student/attendance`

**Auth:** Required (student)

**Query:** `courseId?: string`

**Response:**

```typescript
interface AttendanceResponse {
  overallPercentage: number;
  totalSessions: number;
  attendedSessions: number;
  excusedAbsences: number;
  unexcusedAbsences: number;
  courseRecords: CourseAttendance[];
}

interface CourseAttendance {
  courseId: string;
  courseTitle: string;
  percentage: number;
  records: {
    date: string;
    status: string;
    excused: boolean;
    notes: string | null;
  }[];
}
```

### `GET /api/student/certificates`

**Auth:** Required (student)

**Response:**

```typescript
interface CertificatesResponse {
  earned: CertificateSummary[];
  inProgress: CertificateProgress[];
}

interface CertificateSummary {
  id: string;
  name: string;
  credentialId: string;
  issuedAt: string;
  expiresAt: string | null;
  pdfUrl: string;
  verificationUrl: string;
}

interface CertificateProgress {
  name: string;
  progressPercentage: number;
  requirements: { label: string; met: boolean }[];
}
```

---

## 6. Component Tree

```
StudentLayout
├── StudentNavBar
│   ├── Logo
│   ├── NavLinks (Dashboard, Learning, Assignments, Community, Marketplace)
│   ├── NotificationBell (with unread count badge)
│   ├── MessageIndicator (unread count)
│   └── UserMenu (Profile, Portfolio, Finance, Settings, Logout)
│
├── StudentDashboard
│   ├── WelcomeHeader (name, program, resume button)
│   ├── DashboardGrid
│   │   ├── NextClassCard
│   │   │   ├── CourseName, ModuleName, Time
│   │   │   ├── InstructorName
│   │   │   └── JoinButton
│   │   ├── PendingTasksCard
│   │   │   └── TaskItem[] (title, due, type icon, start button)
│   │   └── WeeklyStatsCard
│   │       ├── StatCircle (hours)
│   │       ├── StatCircle (avg score)
│   │       ├── StatRow (completed/total)
│   │       └── Badge (top percentile)
│   ├── RecentActivityFeed
│   │   └── ActivityItem[] (icon, message, timestamp, link)
│   ├── QuickActions
│   │   ├── QuickActionButton("New Message")
│   │   ├── QuickActionButton("Browse Market")
│   │   ├── QuickActionButton("View Calendar")
│   │   └── QuickActionButton("Find Study Group")
│   └── UpcomingDeadlines
│       └── DeadlineItem[] (title, date, course)
│
├── LearningHub
│   ├── PageHeader (title + overview progress)
│   ├── ProgramProgressBar (overall %)
│   ├── ModuleList (accordion)
│   │   └── ModuleAccordion[]
│   │       ├── ModuleHeader (title, progress bar, status icon)
│   │       └── LessonItem[] (title, type icon, duration, status, score, resume button)
│   └── ArchivedEnrollments (collapsible)
│
├── LessonViewer
│   ├── LessonBreadcrumb
│   ├── LessonHeader (title, module, position, estimated time)
│   ├── ContentRenderer (switches by contentType)
│   │   ├── VideoPlayer (Mux/Cloudflare Stream)
│   │   │   ├── PlayPauseButton, SeekBar, VolumeControl
│   │   │   ├── SpeedSelector, QualitySelector, CaptionsToggle
│   │   │   ├── PictureInPictureButton, FullscreenButton
│   │   │   └── ProgressTracker (auto-saves position)
│   │   ├── ArticleRenderer (MDX content, code highlighting)
│   │   ├── QuizRenderer (see assessment)
│   │   ├── CodingExercise (monaco editor + test runner)
│   │   └── ProjectViewer (instructions + submission form)
│   ├── KeyTakeaways (expandable)
│   ├── TranscriptPanel (expandable, searchable)
│   ├── LessonNavigation (Mark Complete, Prev, Next buttons)
│   └── LessonSidebar (module lesson list, scroll spy)
│
├── AssignmentsCenter
│   ├── FilterTabs (All, Pending, Submitted, Graded, Late)
│   ├── AssignmentCard[] (title, course, due, status badge, score, action button)
│   └── EmptyState (per filter)
│
├── AssignmentDetail
│   ├── AssignmentHeader (title, course, due date, points)
│   ├── InstructionsPanel (rich HTML content)
│   ├── ResourcesPanel (downloadable files)
│   ├── RubricTable (criterion, max points, score if graded)
│   ├── SubmissionPanel
│   │   ├── FileUploader (drag & drop, list, remove)
│   │   ├── RichTextEditor (submission text)
│   │   ├── CommentsTextArea
│   │   ├── SubmitButton
│   │   └── SubmitConfirmationModal
│   ├── PreviousSubmissions (accordion of past attempts)
│   └── GradedFeedback (if graded: score, letter, feedback text, rubric scores)
│
├── AssessmentEngine
│   ├── AssessmentList (upcoming, available, completed)
│   ├── AssessmentInstructions (time limit, attempts, passing score)
│   ├── QuizTaker
│   │   ├── TimerBar (auto-submit warning at 1 min)
│   │   ├── QuestionRenderer (type switch)
│   │   │   ├── MultipleChoiceQuestion
│   │   │   ├── MultipleAnswerQuestion
│   │   │   ├── TrueFalseQuestion
│   │   │   ├── ShortAnswerQuestion
│   │   │   ├── CodingQuestion (monaco editor)
│   │   │   └── EssayQuestion (rich text)
│   │   ├── QuestionNavigator (numbered grid, color-coded)
│   │   ├── NavigationButtons (Prev/Next/Submit)
│   │   └── SubmitModal (review unanswered)
│   └── AssessmentResult
│       ├── ScoreDisplay (percentage, bar, pass/fail)
│       ├── QuestionReview[] (correct/incorrect, correct answer)
│       └── RetryButton (if attempts remain)
│
├── Gradebook
│   ├── OverallGpaCard (GPA, program, rank)
│   ├── CourseGradeList
│   │   └── CourseGradeRow[]
│   │       ├── CourseHeader (title, avg, letter, weight)
│   │       ├── GradeItemsTable (name, score, max, %, weight, letter)
│   │       └── ExpandToggle
│   └── WhatIfCalculator
│       ├── GradeAdjustSlider (per item)
│       ├── ProjectedGpa
│       └── ResetButton
│
├── PortfolioBuilder
│   ├── ProfileSection (avatar, name, title, bio, links, edit mode)
│   ├── SkillsManager
│   │   ├── SkillChip[] (name, stars, remove)
│   │   ├── AddSkillForm (name + proficiency slider)
│   │   └── DragSortContainer
│   ├── ProjectsSection
│   │   ├── ProjectCard[] (title, desc, links, media, skills, edit/delete)
│   │   ├── AddProjectButton → ProjectFormModal
│   │   └── ProjectFormModal (title, desc, URL, media upload, skills multi-select)
│   ├── CertificatesSection (read-only list from certificates table)
│   ├── EducationSection (add/edit/delete education entries)
│   └── ExperienceSection (add/edit/delete work experience)
│
├── Marketplace
│   ├── SearchBar
│   ├── CategoryFilter
│   ├── ProductGrid
│   │   └── ProductCard[] (title, price, thumbnail, category, add to cart button)
│   ├── ShoppingCart (slide-out drawer)
│   │   ├── CartItem[] (title, price, quantity, remove)
│   │   ├── CartTotal
│   │   └── CheckoutButton
│   └── PurchasesList (my purchases, download links)
│
├── CommunityPage
│   ├── CategoryTabs
│   ├── SearchInput
│   ├── PinnedPosts (top)
│   ├── PostList (cursor paginated)
│   │   └── PostCard[] (title, author badge, category, reply count, upvotes, time)
│   ├── NewPostButton → NewPostModal
│   └── PostDetail
│       ├── PostContent (title, author, content, upvote)
│       ├── ReplyList (nested threading)
│       │   └── ReplyCard[] (author, content, upvote, isSolution badge)
│       ├── ReplyForm (rich text + submit)
│       └── SharePostButton
│
├── CalendarPage
│   ├── ViewToggle (month/week/day)
│   ├── CalendarHeader (month nav + today button)
│   ├── CalendarGrid (month view with event dots)
│   ├── WeekView / DayView (time slots)
│   ├── EventDetail (popover on click: title, time, description, link)
│   └── UpcomingList (sidebar list)
│
├── MessagingPage
│   ├── ConversationList (sidebar)
│   │   ├── SearchConversations
│   │   └── ConversationItem[] (avatar, name, last message, time, unread badge)
│   ├── MessageArea
│   │   ├── ConversationHeader (name, online status, actions)
│   │   ├── MessageList (scrollable, auto-scroll to bottom)
│   │   │   └── MessageBubble[] (content, time, read receipt, file preview)
│   │   ├── MessageInput
│   │   │   ├── TextArea (auto-resize)
│   │   │   ├── FileAttachButton
│   │   │   ├── CodeSnippetButton
│   │   │   ├── EmojiPicker
│   │   │   └── SendButton
│   │   └── TypingIndicator
│   └── NewConversationModal (search users, multi-select)
│
├── FinancePage
│   ├── BalanceOverview (total, next payment, pay now button)
│   ├── PaymentPlanCard (type, progress bar, remaining)
│   ├── InvoiceTable (number, date, amount, status, PDF download)
│   ├── PaymentMethods (saved cards, add new)
│   ├── PaymentForm (Stripe Elements)
│   ├── ScholarshipList (name, amount, status)
│   └── TransactionHistory
│
├── AttendancePage
│   ├── OverallStatCircle (percentage, color-coded)
│   ├── CourseAttendanceList (per course table)
│   ├── AttendancePolicyBanner (if below threshold)
│   └── ExcuseFormModal (reason, file attach)
│
├── CertificatesPage
│   ├── EarnedSection
│   │   └── CertificateCard[] (name, date, ID, actions: view/download/share/verify)
│   └── InProgressSection
│       └── CertificateProgressItem[] (name, progress bar, requirement checklist)
│
└── StudentSettings
    ├── ProfileSettings (name, email, phone, password)
    ├── NotificationPreferences (email, push, SMS toggles per category)
    ├── PrivacySettings (portfolio visibility, online status)
    └── ThemeSettings (light/dark/system)
```

---

## 7. Exhaustive User Journeys

### Journey 7.1: First Login & Dashboard

```
Prerequisite: Student enrolled, program start date has arrived or imminent

Step 1: Student receives welcome email: "Your classroom is ready!"
  → CTA: "Go to Dashboard" → https://cea.academy/dashboard
  → Student logs in (POST /api/auth/login)

Step 2: Dashboard loads
  → System fetches GET /api/student/dashboard
  → Shows "Welcome back, Alex!"
  → Shows next class: Network Defense, Module 3, 2:00 PM today
  → Shows pending tasks: Lab 4 (due Fri), Quiz (due Wed)
  → Shows weekly stats: 12.5h spent, 88% avg, 6/8 done

Step 3: Student clicks pending task "Lab 4"
  → Navigates to /assignments/{id}
  → System loads assignment detail
  → Student reads instructions, downloads assignment files
  → Starts working

Alternative Path:
  Step 2a: Student clicks "Resume Learning" → redirects to learning hub
  Step 2b: Student clicks "Join" on next class → opens meeting URL in new tab
  Step 2c: No next class today → card shows "No classes scheduled" with calendar link
```

### Journey 7.2: Consuming a Video Lesson

```
Step 1: Student navigates to /learning → sees module 3 at 42%
  → Clicks "Resume" on Lesson 13: Symmetric Encryption

Step 2: Lesson viewer loads with video player
  → Video starts from last position (saved via lesson_progress.video_position)
  → Student watches video, pauses, rewinds
  → System saves progress every 10s (POST /api/student/lessons/:id/progress)

Step 3: Student reaches 100% of video
  → "Mark Complete" button becomes active
  → Student clicks "Mark Complete"
  → API call: progress { status: 'completed', progressPercentage: 100 }
  → Module progress recalculates from 42% → 57%
  → "Next Lesson →" button appears
  → Confetti micro-animation

Step 4: Student clicks "Next Lesson"
  → Navigates to Lesson 14

Alternative Path:
  Step 3a: Student doesn't mark complete → navigates away → progress saved at 85%
  Step 3b: Video fails midway → "Video playback error. [Refresh] [Download]"
  Step 3c: Student watches on mobile → responsive player, limited quality options
```

### Journey 7.3: Submitting an Assignment

```
Step 1: Student sees pending assignment in dashboard → clicks "Start →"
  → Navigates to /assignments/{id}

Step 2: Assignment instructions loaded
  → Student reads "Analyze packet capture with Wireshark"
  → Downloads assignment files (PCAP + template)
  → Views rubric: 4 criteria × 25 points = 100 total

Step 3: Student works offline, returns to submit
  → Drags analysis_report.pdf and capture_analysis.pcap to upload zone
  → Files upload with progress bar (POST /api/upload per file)
  → Adds comment: "Please check my analysis in section 3"

Step 4: Clicks "Submit Assignment"
  → Confirmation modal: "Submit Lab 4? You have 1 attempt remaining."
  → Student confirms → POST /api/student/assignments/:id/submit
  → Success: status changes to 'submitted'
  → Toast: "Submitted successfully! Waiting for grade."
  → Redirect back to assignments list

Alternative Paths:
  Step 4a: File too large (50MB limit) → "File exceeds 50MB limit"
  Step 4b: Network fails during submit → queue in IndexedDB, retry on reconnect
  Step 4c: Past due → warning "This assignment is X days late. Late penalty applies."
  Step 4d: Last attempt → warning "This is your final submission attempt."
  Step 4e: Resubmission allowed → student can submit again
```

### Journey 7.4: Taking a Timed Quiz

```
Step 1: Student clicks quiz link from learning hub or assignments
  → Assessment instructions page: "Cryptography Fundamentals"
  → Shows: 15 questions, 30-minute time limit, 2 attempts, 70% passing

Step 2: Student clicks "Start Quiz"
  → POST /api/student/assessments/:id/attempt
  → First question renders, timer starts counting down

Step 3: Student answers questions
  → Q1: Multiple choice → selects "AES"
  → Q4: Multiple answer → checks 3/4 correct options
  → Q7: True/False → selects "True"
  → Q10: Short answer → types "Symmetric encryption uses one key"

Step 4: Student uses question navigator
  → Answered: green, Unanswered: red, Current: blue
  → Sees questions 12, 14 unanswered
  → Goes back to Q12, answers it

Step 5: Student clicks "Submit Quiz"
  → Modal: "You have 2 unanswered questions. Submit anyway?"
  → Student confirms
  → POST /api/student/assessments/:id/attempt/submit
  → Auto-graded immediately
  → Score: 13/15 = 86.7% → Passed!

Step 6: Results page shows
  → Score: 86.7% (passing: 70%) → Green "Passed" badge
  → Per-question breakdown: which correct/incorrect, correct answer shown
  → Q3 wrong: "The correct answer was Diffie-Hellman (asymmetric)."
  → "Attempt 1 of 2 used. You can retry for a higher score."

Alternative Paths:
  Step 5a: Timer reaches 0 → auto-submit with whatever answered
  Step 5b: Student runs out of attempts → "No attempts remaining. Final score: 86.7%"
  Step 5c: Student closes browser mid-quiz → on return, resume from where left off
  Step 5d: Student fails (<70%) → "You scored 60%. Review the material and try again."
```

### Journey 7.5: Checking Grades

```
Step 1: Student clicks "Grades" in nav → /grades

Step 2: Overall GPA card shows 3.72
  → 4 courses listed with grade bars
  → Network Defense: 88.5% (B+)
  → Cryptography: 94.2% (A)

Step 3: Student expands Network Defense
  → Sees 5 grade items:
    → Lab 1: 45/50 (90%)
    → Lab 2: 48/50 (96%)
    → Lab 3: 42/50 (84%)
    → Midterm: 85/100 (85%)
    → Final Project: 0/100 (not yet graded)

Step 4: Student opens "What-if Calculator"
  → Adjusts Final Project slider to 90%
  → Projected grade updates: 88.5% → 89.5% (still B+)
  → Adjusts to 95% → sees it would bump to A-
  → Closes calculator
```

### Journey 7.6: Building Portfolio

```
Step 1: Student navigates to /portfolio
  → Currently empty profile

Step 2: Student edits profile
  → Uploads avatar
  → Sets title: "Cybersecurity Student"
  → Writes bio: "Passionate about network security..."
  → Adds GitHub link

Step 3: Adds skills
  → "Network Security" → 5 stars
  → "Cryptography" → 4 stars
  → "Python" → 3 stars

Step 4: Adds project
  → Title: "Security Audit: ABC Corp"
  → Description: "Conducted full penetration test..."
  → GitHub URL: https://github.com/...
  → Uploads 3 screenshots
  → Tags skills: Network Security, Compliance

Step 5: Shares portfolio
  → Clicks "Share" → copies public URL
  → Posts to LinkedIn

Alternative Paths:
  Step 4a: Accepts auto-import from completed assignments → pre-populated projects
  Step 4b: Certificate auto-appears from completed courses
```

### Journey 7.7: Messaging an Instructor

```
Step 1: Student clicks Messages icon → /messages

Step 2: Conversation list shows Prof. Smith (unread), Jane Doe, Study Group

Step 3: Student clicks Prof. Smith
  → Previous messages loaded (WebSocket connects for real-time)

Step 4: Student types: "Hi Prof. Smith, I'm stuck on Lab 4 step 3. The packets aren't showing up with the filter you mentioned."
  → Clicks Send → message sent via WebSocket

Step 5: Prof. Smith is online → replies within 2 min
  → "Hi Alex, try using 'tcp.port==443' instead. The traffic is HTTPS."

Step 6: Student tries filter → works! → replies: "Got it, thank you!"
  → Marks conversation as resolved

Alternative:
  Step 2: Student clicks "New Message" → searches "Jane Doe" → sends direct message
  Step 2b: Student receives file from instructor → image preview or file download
  Step 5: Prof. Smith offline → message delivered, push notification sent
```

### Journey 7.8: Making a Purchase in Marketplace

```
Step 1: Student clicks Marketplace → /marketplace

Step 2: Browses featured items
  → Sees "Kali Linux Guide" ($29), "Mentoring Session" ($99)

Step 3: Student clicks "Add+" on Kali Linux Guide
  → Item added to cart
  → Cart badge shows (1)

Step 4: Clicks cart icon → slide-out drawer shows:
  → Kali Linux Guide - $29
  → Subtotal: $29
  → [Checkout]

Step 5: Clicks "Checkout"
  → POST /api/student/marketplace/checkout
  → Returns Stripe Checkout session URL
  → Redirected to Stripe Checkout

Step 6: Student enters card info → payment succeeds
  → Webhook: stripe → POST /api/webhooks/stripe → creates purchase record
  → Redirect back to marketplace → success toast
  → Item available in "My Purchases" for download

Alternative:
  Step 5: Free item → no checkout → immediate access
  Step 6: Payment fails → "Payment failed. Please try a different card."
```

---

## 8. Business Rules Engine

### BR-CS-001: Grade Calculation

**Formula:** `course_grade = Σ(grade_items[i].score / grade_items[i].maxScore * grade_items[i].weight)` where `Σ weight = 1.0`  
**Letter Grade Mapping:** A (93-100), A- (90-92), B+ (87-89), B (83-86), B- (80-82), C+ (77-79), C (73-76), C- (70-72), D+ (67-69), D (63-66), D- (60-62), F (<60)  
**GPA:** A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D+=1.3, D=1.0, F=0.0

### BR-CS-002: Late Submission Penalty

- Late submissions penalized `late_penalty_percent` per day (default: 10%/day)
- Cap at 50% max penalty
- Assignments with `allow_late_submission=false`: cannot submit after due date
- Grace period: 15-minute window after due time (not counted as late)

### BR-CS-003: Attendance Policy

- Minimum attendance: 85% per course
- Below 85% → warning banner on dashboard + email
- Below 75% → mandatory meeting with advisor
- Below 60% → risk of expulsion
- Excused absences: require documentation (doctor's note, etc.)

### BR-CS-004: Assessment Retake Policy

- Students may retake assessments if `max_attempts > 1`
- Best score counts (not average, not last)
- Retakes must wait 24 hours between attempts
- Timed assessments: remaining time resets on retake (new random questions from pool)

### BR-CS-005: Minimum Progress Requirement

- Students must complete ≥ 25% of weekly assigned work to remain in good standing
- Tracked per week, rolling 4-week window
- Below threshold → advisor notification + study plan meeting

### BR-CS-006: Portfolio Auto-Population

- Completed assignments with grade ≥ 80% are auto-suggested as portfolio projects
- Certificates auto-appear upon course/program completion
- Skills auto-suggest from completed courses (instructor-defined)

### BR-CS-007: Certificate Issuance

- Course certificate: issued when course grade ≥ passing_grade
- Program certificate: issued when all courses passed with cumulative GPA ≥ 2.0
- PDF generated via Puppeteer → stored in R2 → `certificates.pdf_url`
- Blockchain hash stored for verification (optional)

### BR-CS-008: Marketplace Refund Policy

- Digital downloads: no refund after download
- Mentoring sessions: refund up to 24h before scheduled time
- Physical goods (if any): 30-day return window

### BR-CS-009: Community Guidelines Enforcement

- 3 strikes per semester for policy violations
- Strike 1: warning + content hidden
- Strike 2: 7-day posting suspension
- Strike 3: permanent community ban (can still access learning content)
- Automated flagging: spam detection, profanity filter

### BR-CS-010: Academic Integrity

- Plagiarism detection on all text submissions (Turnitin API)
- First offense: score of 0 on assignment + warning
- Second offense: course failure + academic probation
- Third offense: expulsion

---

## 9. Notification Specifications

### N-CS-01: New Assignment Available

| Field         | Value                                                              |
| ------------- | ------------------------------------------------------------------ |
| **Trigger**   | Assignment published or available_from passes                      |
| **Channel**   | Email + In-app + Push                                              |
| **Template**  | `new_assignment`                                                   |
| **Variables** | `{{title}}`, `{{course}}`, `{{dueDate}}`, `{{points}}`, `{{link}}` |

### N-CS-02: Assignment Due Soon (24h)

| Field         | Value                                                      |
| ------------- | ---------------------------------------------------------- |
| **Trigger**   | 24 hours before due date                                   |
| **Channel**   | Email + Push + In-app banner on dashboard                  |
| **Template**  | `assignment_due_soon`                                      |
| **Variables** | `{{title}}`, `{{course}}`, `{{timeRemaining}}`, `{{link}}` |

### N-CS-03: Assignment Graded

| Field         | Value                                                                                  |
| ------------- | -------------------------------------------------------------------------------------- |
| **Trigger**   | Submission graded                                                                      |
| **Channel**   | Email + In-app + Push                                                                  |
| **Template**  | `assignment_graded`                                                                    |
| **Variables** | `{{title}}`, `{{score}}`, `{{maxScore}}`, `{{percentage}}`, `{{feedback}}`, `{{link}}` |

### N-CS-04: New Course Content

| Field         | Value                                                         |
| ------------- | ------------------------------------------------------------- |
| **Trigger**   | New lesson/module published for enrolled course               |
| **Channel**   | Email (digest, max 1/day) + In-app                            |
| **Template**  | `new_content`                                                 |
| **Variables** | `{{course}}`, `{{moduleName}}`, `{{lessonCount}}`, `{{link}}` |

### N-CS-05: Quiz/Exam Reminder

| Field         | Value                                                    |
| ------------- | -------------------------------------------------------- |
| **Trigger**   | Assessment available or 1h before due                    |
| **Channel**   | Push + In-app                                            |
| **Template**  | `assessment_reminder`                                    |
| **Variables** | `{{title}}`, `{{timeLimit}}`, `{{attempts}}`, `{{link}}` |

### N-CS-06: Grade Threshold Alert

| Field         | Value                                                           |
| ------------- | --------------------------------------------------------------- |
| **Trigger**   | Course grade drops below 70% (C-)                               |
| **Channel**   | Email + In-app + Push                                           |
| **Template**  | `grade_alert`                                                   |
| **Variables** | `{{course}}`, `{{currentGrade}}`, `{{advisorName}}`, `{{link}}` |

### N-CS-07: Attendance Warning

| Field         | Value                                         |
| ------------- | --------------------------------------------- |
| **Trigger**   | Attendance drops below 85%                    |
| **Channel**   | Email + In-app banner                         |
| **Template**  | `attendance_warning`                          |
| **Variables** | `{{percentage}}`, `{{threshold}}`, `{{link}}` |

### N-CS-08: Certificate Earned

| Field         | Value                                                      |
| ------------- | ---------------------------------------------------------- |
| **Trigger**   | Certificate issued                                         |
| **Channel**   | Email + In-app (confetti)                                  |
| **Template**  | `certificate_earned`                                       |
| **Variables** | `{{name}}`, `{{credentialId}}`, `{{link}}`, `{{shareUrl}}` |

### N-CS-09: New Message

| Field         | Value                                                     |
| ------------- | --------------------------------------------------------- |
| **Trigger**   | New message received (user not currently in conversation) |
| **Channel**   | In-app + Push + Email (if offline > 15min)                |
| **Template**  | `new_message`                                             |
| **Variables** | `{{sender}}`, `{{preview}}`, `{{link}}`                   |

### N-CS-10: Payment Reminder

| Field         | Value                                   |
| ------------- | --------------------------------------- |
| **Trigger**   | 7 days before payment due date          |
| **Channel**   | Email + In-app                          |
| **Template**  | `payment_reminder`                      |
| **Variables** | `{{amount}}`, `{{dueDate}}`, `{{link}}` |

### N-CS-11: Payment Received

| Field         | Value                                                       |
| ------------- | ----------------------------------------------------------- |
| **Trigger**   | Payment successful                                          |
| **Channel**   | Email (receipt)                                             |
| **Template**  | `payment_receipt`                                           |
| **Variables** | `{{amount}}`, `{{invoiceNumber}}`, `{{date}}`, `{{pdfUrl}}` |

### N-CS-12: Payment Overdue

| Field         | Value                                                      |
| ------------- | ---------------------------------------------------------- |
| **Trigger**   | Payment due date passed                                    |
| **Channel**   | Email + In-app (persistent banner) + Push                  |
| **Template**  | `payment_overdue`                                          |
| **Variables** | `{{amount}}`, `{{daysOverdue}}`, `{{lateFee}}`, `{{link}}` |

### N-CS-13: Study Group Invite

| Field         | Value                                        |
| ------------- | -------------------------------------------- |
| **Trigger**   | Added to study group                         |
| **Channel**   | In-app + Email                               |
| **Template**  | `study_group_invite`                         |
| **Variables** | `{{groupName}}`, `{{invitedBy}}`, `{{link}}` |

### N-CS-14: Forum Reply

| Field         | Value                                                     |
| ------------- | --------------------------------------------------------- |
| **Trigger**   | Someone replies to your post or a post you replied to     |
| **Channel**   | In-app + Email (digest)                                   |
| **Template**  | `forum_reply`                                             |
| **Variables** | `{{postTitle}}`, `{{replier}}`, `{{preview}}`, `{{link}}` |

---

## 10. Permission Matrix

| Entity       | Action            | Student         | Instructor    | Admin           | Parent          |
| ------------ | ----------------- | --------------- | ------------- | --------------- | --------------- |
| Courses      | Read enrolled     | ✅              | ✅ (assigned) | ✅              | ❌              |
| Courses      | Read not enrolled | ❌              | ✅            | ✅              | ❌              |
| Lessons      | Read              | ✅ (enrolled)   | ✅            | ✅              | ❌              |
| Lessons      | Update progress   | ✅ (own)        | ❌            | ❌              | ❌              |
| Assignments  | Read              | ✅ (own course) | ✅ (assigned) | ✅              | ❌              |
| Assignments  | Submit            | ✅ (own)        | ❌            | ❌              | ❌              |
| Assignments  | Grade             | ❌              | ✅            | ✅              | ❌              |
| Assessments  | Take              | ✅ (own)        | ❌            | ✅ (as student) | ❌              |
| Grades       | Read own          | ✅              | ✅ (assigned) | ✅              | ✅ (child)      |
| Portfolio    | CRUD own          | ✅              | ❌            | ❌              | ❌              |
| Portfolio    | Read public       | ✅              | ✅            | ✅              | ✅              |
| Marketplace  | Browse            | ✅              | ✅            | ✅              | ❌              |
| Marketplace  | Purchase          | ✅              | ✅            | ❌              | ❌              |
| Community    | Read              | ✅              | ✅            | ✅              | ❌              |
| Community    | Post              | ✅              | ✅            | ✅              | ❌              |
| Community    | Moderate          | ❌              | ✅            | ✅              | ❌              |
| Messages     | Send              | ✅              | ✅            | ✅              | ❌ (restricted) |
| Calendar     | Read own          | ✅              | ✅            | ✅              | ❌              |
| Finance      | Read own          | ✅              | ❌            | ✅              | ✅ (child)      |
| Finance      | Pay               | ✅              | ❌            | ✅              | ✅              |
| Attendance   | Read own          | ✅              | ✅ (assigned) | ✅              | ✅ (child)      |
| Certificates | Read own          | ✅              | ✅            | ✅              | ✅ (child)      |
| Profile      | Read own          | ✅              | ✅            | ✅              | ❌              |
| Profile      | Update own        | ✅              | ✅            | ✅              | ❌              |

---

## 11. State Management

### Redux Slices

```typescript
// Dashboard Slice
interface DashboardState {
  data: DashboardResponse | null;
  loading: boolean;
  error: string | null;
}

// Learning Slice
interface LearningState {
  enrollments: EnrollmentWithProgress[];
  currentLesson: LessonDetailResponse | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
}

// Assignment Slice
interface AssignmentState {
  list: AssignmentCard[];
  currentAssignment: AssignmentDetailResponse | null;
  submitting: boolean;
  submitError: string | null;
  filter: string;
}

// Assessment Slice
interface AssessmentState {
  currentAttempt: AssessmentAttemptData | null;
  answers: Record<string, any>;
  timeRemaining: number;
  status: "idle" | "starting" | "in_progress" | "submitted";
}

// Grade Slice
interface GradeState {
  data: GradesResponse | null;
  whatIfAdjustments: Record<string, number>;
  loading: boolean;
}

// Portfolio Slice
interface PortfolioState {
  data: PortfolioResponse | null;
  editing: boolean;
  saving: boolean;
}

// Messages Slice
interface MessagesState {
  conversations: ConversationSummary[];
  activeConversationId: string | null;
  messages: Record<string, Message[]>;
  connected: boolean; // WebSocket status
  typingUsers: Record<string, string[]>;
}
```

### RTK Query Endpoints

```typescript
const studentApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/student" }),
  tagTypes: [
    "Dashboard",
    "Enrollments",
    "Lessons",
    "Assignments",
    "Grades",
    "Portfolio",
    "Certificates",
  ],
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
    getEnrollments: builder.query<EnrollmentWithProgress[], void>({
      query: () => "/enrollments",
      providesTags: ["Enrollments"],
    }),
    getLesson: builder.query<LessonDetailResponse, string>({
      query: (id) => `/lessons/${id}`,
      providesTags: (result, err, id) => [{ type: "Lessons", id }],
    }),
    updateLessonProgress: builder.mutation<
      LessonProgress,
      { id: string; data: UpdateLessonProgressRequest }
    >({
      query: ({ id, data }) => ({ url: `/lessons/${id}/progress`, method: "POST", body: data }),
      invalidatesTags: ["Enrollments", "Dashboard"],
      optimisticUpdate: true,
    }),
    getAssignments: builder.query<AssignmentCard[], string | void>({
      query: (filter) => `/assignments${filter ? `?filter=${filter}` : ""}`,
      providesTags: ["Assignments"],
    }),
    getAssignmentDetail: builder.query<AssignmentDetailResponse, string>({
      query: (id) => `/assignments/${id}`,
      providesTags: (result, err, id) => [{ type: "Assignments", id }],
    }),
    submitAssignment: builder.mutation<SubmitAssignmentResponse, { id: string; data: FormData }>({
      query: ({ id, data }) => ({ url: `/assignments/${id}/submit`, method: "POST", body: data }),
      invalidatesTags: ["Assignments", "Dashboard", "Grades"],
    }),
    getGrades: builder.query<GradesResponse, string | void>({
      query: (courseId) => `/grades${courseId ? `?courseId=${courseId}` : ""}`,
      providesTags: ["Grades"],
    }),
    getPortfolio: builder.query<PortfolioResponse, void>({
      query: () => "/portfolio",
      providesTags: ["Portfolio"],
    }),
    updatePortfolioProfile: builder.mutation<PortfolioResponse, FormData>({
      query: (data) => ({ url: "/portfolio/profile", method: "PUT", body: data }),
      invalidatesTags: ["Portfolio"],
    }),
    getCertificates: builder.query<CertificatesResponse, void>({
      query: () => "/certificates",
      providesTags: ["Certificates"],
    }),
    getCalendar: builder.query<CalendarEvent[], { start: string; end: string }>({
      query: (params) => ({ url: "/calendar", params }),
    }),
    getFinance: builder.query<FinanceResponse, void>({
      query: () => "/finance",
    }),
    getAttendance: builder.query<AttendanceResponse, string | void>({
      query: (courseId) => `/attendance${courseId ? `?courseId=${courseId}` : ""}`,
    }),
  }),
});
```

**Cache & WebSocket Strategy:**

- Dashboard: re-fetches every 60s, or on focus
- Lesson progress: immediate optimistic update, server sync every 10s
- Messages: WebSocket for real-time, localStorage backup
- Grades: cached 5 min, invalidated on new submission/grade
- Portfolio: cached 30 min, stale-while-revalidate
- Calendar: cached until tab changes

---

## 12. Form Schemas (Zod)

### Assignment Submission

```typescript
import { z } from "zod";

export const AssignmentSubmissionSchema = z.object({
  submissionText: z
    .string()
    .max(50000, "Submission text must be under 50,000 characters")
    .optional(),
  comments: z.string().max(2000, "Comments must be under 2,000 characters").optional(),
  files: z
    .array(z.instanceof(File))
    .max(5, "Maximum 5 files")
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true;
      const totalSize = files.reduce((sum, f) => sum + f.size, 0);
      return totalSize <= 50 * 1024 * 1024; // 50MB
    }, "Total file size must not exceed 50MB"),
});

export const AssignmentDraftSchema = AssignmentSubmissionSchema.extend({
  saveAsDraft: z.literal(true),
});
```

### Portfolio Project

```typescript
export const PortfolioProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().max(5000).optional(),
  projectUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  skills: z.array(z.string()).max(20).optional(),
  isPublic: z.boolean().default(true),
  media: z.array(z.instanceof(File)).max(10).optional(),
});

export const PortfolioProfileSchema = z.object({
  title: z.string().max(200).optional(),
  bio: z.string().max(2000).optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  websiteUrl: z.string().url().optional().or(z.literal("")),
});

export const PortfolioSkillSchema = z.object({
  name: z.string().min(1).max(100),
  proficiency: z.number().int().min(1).max(5),
});
```

### New Forum Post

```typescript
export const ForumPostSchema = z.object({
  category: z.enum(["qa", "study_groups", "announcements", "off_topic", "tips"]),
  title: z.string().min(5, "Title must be at least 5 characters").max(255),
  content: z.string().min(10, "Content must be at least 10 characters").max(50000),
});

export const ForumReplySchema = z.object({
  content: z.string().min(1, "Reply cannot be empty").max(10000),
  parentId: z.string().uuid().optional(),
});
```

### New Message

```typescript
export const NewMessageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty").max(10000),
  contentType: z.enum(["text", "image", "file", "code"]).default("text"),
  conversationId: z.string().uuid(),
  file: z.instanceof(File).optional(),
});
```

### Study Group Creation

```typescript
export const StudyGroupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(255),
  description: z.string().max(2000).optional(),
  courseId: z.string().uuid().optional(),
  maxMembers: z.number().int().min(2).max(50).default(10),
});
```

---

## 13. Analytics Events

| Event                    | Properties                                                           | Trigger                     |
| ------------------------ | -------------------------------------------------------------------- | --------------------------- |
| `student_dashboard_view` | `enrollmentCount`, `pendingTaskCount`                                | Dashboard loaded            |
| `lesson_start`           | `lessonId`, `moduleId`, `courseId`, `contentType`                    | Lesson viewer opened        |
| `lesson_progress`        | `lessonId`, `progressPercent`, `videoPosition`                       | Every 10s/10% during lesson |
| `lesson_complete`        | `lessonId`, `timeSpentMinutes`                                       | Marked complete             |
| `assignment_start`       | `assignmentId`, `courseId`                                           | Assignment detail opened    |
| `assignment_submit`      | `assignmentId`, `fileCount`, `textLength`, `isLate`, `attemptNumber` | Assignment submitted        |
| `assessment_start`       | `assessmentId`, `type`, `timeLimit`                                  | Quiz started                |
| `assessment_answer`      | `assessmentId`, `questionNumber`, `questionType`                     | Per answer (sampled)        |
| `assessment_submit`      | `assessmentId`, `score`, `timeSpent`, `attemptNumber`                | Quiz submitted              |
| `gradebook_view`         | `courseCount`, `gpa`                                                 | Gradebook loaded            |
| `whatif_calculate`       | `courseCount`, `adjustedItems`                                       | What-if used                |
| `portfolio_edit`         | `section` (profile/skills/projects)                                  | Portfolio section edited    |
| `portfolio_share`        | `method` (link/linkedin/twitter)                                     | Share clicked               |
| `marketplace_view`       | `category`                                                           | Marketplace loaded          |
| `marketplace_add_cart`   | `itemId`, `price`                                                    | Added to cart               |
| `marketplace_checkout`   | `itemIds[]`, `totalAmount`                                           | Checkout started            |
| `marketplace_purchase`   | `itemIds[]`, `amount`, `stripeStatus`                                | Purchase completed          |
| `community_post_create`  | `category`                                                           | New post created            |
| `community_reply_create` | `postId`, `isSolution`                                               | Reply posted                |
| `message_send`           | `conversationType`                                                   | Message sent                |
| `calendar_view`          | `viewType` (month/week/day)                                          | Calendar viewed             |
| `calendar_event_click`   | `eventType`                                                          | Event clicked               |
| `certificate_download`   | `certificateId`                                                      | PDF downloaded              |
| `certificate_share`      | `certificateId`, `platform`                                          | Shared on LinkedIn          |

---

## 14. Accessibility Requirements

**Global:**

- Skip to content link at top of every page
- All headings use proper h1-h6 hierarchy
- Color contrast ratios ≥ 4.5:1 (normal text), ≥ 3:1 (large text)
- Focus indicators visible on all interactive elements
  -aria-live regions for dynamic content updates

**Key Components:**

- VideoPlayer: `aria-label="Video lesson: {{title}}"`, keyboard shortcuts (Space=pause, arrows=seek)
- QuizTaker: `role="form"`, `aria-label="Quiz: {{title}}"`, `aria-required="true"` on questions
- QuestionNavigator: `role="list"`, `aria-label="Question navigation"`, `aria-current="true"` on current
- Timer: `aria-live="polite"` announces time at 5min, 1min, 30s remaining
- FileUploader: `role="button"`, `aria-label="Upload files"`, `aria-describedby="file-formats"`
- MessageInput: `aria-label="Message input"`, Enter to send, Shift+Enter for newline
- Dashboard cards: `role="region"`, `aria-label="Card title"` per card
- Calendar: `role="grid"`, `aria-label="Calendar {{month}} {{year}}"`, arrow keys navigation
- Gradebook: `role="table"`, `aria-label="Grade breakdown for {{course}}"`

---

## 15. Error & Edge Case Catalog

| #   | Scenario                                 | User Message                                                          | Recovery                                 |
| --- | ---------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------- |
| E1  | Lesson video fails to load               | "Video failed to load. [Refresh] [Download]"                          | Switch to lower quality, download option |
| E2  | Quiz auto-submit due to timeout          | "Time's up! Your quiz was auto-submitted."                            | Show results, option to review           |
| E3  | Assignment submission network error      | "Submission failed. Your work has been saved locally. [Retry]"        | IndexedDB save, sync when online         |
| E4  | Grade calculation discrepancy            | Contact support via form                                              | Admin recalculates                       |
| E5  | Payment method declined                  | "Payment declined. Please try another card."                          | Choose different card, retry             |
| E6  | Course not found (removed)               | "This course is no longer available."                                 | Redirect to learning hub                 |
| E7  | Portfolio public URL not found           | "Portfolio not found."                                                | 404 page with search                     |
| E8  | Marketplace item out of stock            | "This item is currently unavailable."                                 | Notify me when available                 |
| E9  | Community post deleted                   | "This post has been removed."                                         | Redirect to community                    |
| E10 | Conversation deleted by other party      | "This conversation is no longer available."                           | Close conversation                       |
| E11 | Concurrent session (logged in elsewhere) | "You've been logged out from another session."                        | Re-login, review active sessions         |
| E12 | File upload virus detected               | "File flagged as potentially unsafe. Please upload a different file." | Scan via ClamAV, reject                  |
| E13 | Calendar sync conflict                   | "An event was modified by your instructor."                           | Refresh to get latest                    |
| E14 | Certificate verification fails           | "Unable to verify this certificate at this time."                     | Retry or contact support                 |
| E15 | Study group full                         | "This study group is full (max {{max}} members)."                     | Join waitlist, create new group          |

---

_End of Current Student Actor Plan — 02_
