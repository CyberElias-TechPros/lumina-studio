# Actor: Department Head

## 1. Identity & Role Definition

**Actor Name:** Department Head  
**System Role ID:** `role_department_head`  
**Description:** An academic or administrative leader responsible for overseeing an entire department at Cyber Elias Academy. The Department Head manages curriculum quality, instructor performance, student outcomes, budget planning, accreditation compliance, and strategic initiatives. This actor bridges faculty, administration, and external stakeholders.

**Department Types:**

1. **Cybersecurity Fundamentals** — Core introductory programs
2. **Penetration Testing** — Offensive security focus
3. **Network Defense** — Defensive security and infrastructure
4. **Digital Forensics** — Investigation and incident response
5. **Cloud Security** — Cloud architecture and security
6. **Governance & Compliance** — Policy, risk, and compliance
7. **Research & Development** — Advanced research programs

**Employment States:**

1. **Active** — Currently leading department
2. **On Leave** — Temporarily away (sabbatical, medical)
3. **Interim** — Temporarily filling the role
4. **Inactive** — No longer department head

---

## 2. Primary Goals & Success KPIs

**Goal 1: Ensure Curriculum Quality & Relevance**

- KPI: Curriculum review cycle ≤ 12 months per program
- KPI: Industry alignment score (external review) ≥ 85%
- KPI: Program learning outcomes achievement rate ≥ 80%

**Goal 2: Manage Instructor Performance**

- KPI: Instructor observation completion rate ≥ 90% per term
- KPI: Instructor satisfaction score ≥ 4.0/5
- KPI: Professional development participation ≥ 80%

**Goal 3: Drive Student Success**

- KPI: Department-wide graduation rate ≥ 85%
- KPI: Department-wide placement rate ≥ 80%
- KPI: Student satisfaction score ≥ 4.2/5 per program

**Goal 4: Maintain Accreditation & Compliance**

- KPI: Accreditation milestones met on time — 100%
- KPI: Compliance audit pass rate — 100%
- KPI: Documentation completeness score ≥ 95%

**Goal 5: Optimize Budget & Resources**

- KPI: Budget variance ≤ ±5%
- KPI: Resource utilization rate ≥ 85%
- KPI: Cost per student within target

**Goal 6: Strategic Growth**

- KPI: New program proposals submitted per year ≥ 2
- KPI: Enrollment growth YoY ≥ 10%
- KPI: Industry partnership MOUs signed ≥ 3 per year

---

## 3. Complete Screen Inventory

### Screen 3.1: Department Overview Dashboard (`/dept/dashboard`)

**Purpose:** Executive summary of department performance, alerts, and key metrics.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Department Head — Cybersecurity Fundamentals                        │
│  Overview                                                    [Period ▼]│
├──────────────┬──────────────┬──────────────┬──────────────┬─────────┤
│  Students    │ Instructors  │ Programs     │ Avg Grade    │ Budget  │
│  342         │ 18           │ 4            │ 84.2%        │ $2.4M   │
│  ↑ +12% YoY │ 3 pending QA │ All active   │ ↑ 2.1%       │ 92% util│
├──────────────┴──────────────┴──────────────┴──────────────┴─────────┤
│  Alerts (3)                                                           │
│  ⚠ Instructor QA: Prof. Jones observation overdue (14 days)        │
│  ⚠ Program "Network Defense" accreditation review in 30 days       │
│  ⚠ Budget alert: Lab equipment fund at 95% of annual allocation    │
├─────────────────────────────────────────────────────────────────────┤
│  Quick Stats                                                           │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐│
│  │ Graduat'n│ Placement│ Retention│ Instructor│ Course   │ Satisf. ││
│  │ Rate     │ Rate     │ Rate     │ Satisf.  │ Pass Rate│ Score   ││
│  │ 87%      │ 82%      │ 91%      │ 4.2/5    │ 92%      │ 4.3/5   ││
│  └──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  Recent Activity                                                        │
│  ● Prof. Smith published "Advanced Malware Analysis" course — 2h ago│
│  ● Curriculum committee approved "Cloud Security" v2.0 — Yesterday  │
│  ● 3 new instructor applications received — Yesterday               │
│  ● Monthly department report generated — 2 days ago                  │
├─────────────────────────────────────────────────────────────────────┤
│  Quick Actions:                                                        │
│  [Schedule QA Review] [Approve Curriculum] [Generate Report]         │
│  [View Budget] [Manage Instructors] [Review Accreditation Status]    │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/dept/dashboard`

**States:**

- **Loading:** 6 stat card skeletons + alert skeleton
- **Error:** "Failed to load department overview. [Retry]"
- **Empty (new department):** "Welcome! Set up your department profile to get started."
- **No alerts:** Clean dashboard with green "All clear" banner
- **Edge Cases:** Multiple departments → department switcher in header

### Screen 3.2: Curriculum Manager (`/dept/curriculum`)

**Purpose:** Design, review, approve, and version-control all program curricula.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Curriculum Manager                                       [+ New Version]│
│  Program: [Cybersecurity Fundamentals ▼]    Status: Published v3.2  │
├─────────────────────────────────────────────────────────────────────┤
│  Program Settings                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Title: Cybersecurity Fundamentals                           │  │
│  │ Description: [Core program covering...]                     │  │
│  │ Category: [Cybersecurity ▼]  Level: [Beginner ▼]           │  │
│  │ Credits: 30  |  Duration: 24 weeks  |  Format: [Hybrid ▼]    │  │
│  │ Learning Outcomes:                                          │  │
│  │ □ 1. [Analyze network vulnerabilities]                    │  │
│  │ □ 2. [Implement security controls]                        │  │
│  │ □ 3. [Conduct risk assessments]                           │  │
│  │ [Add Outcome]  [Reorder]                                    │  │
│  │ Version: 3.2 | Last updated: Oct 15, 2026 | By: Prof. Smith│  │
│  │ Change log: "Updated Module 4 to include cloud security"    │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Course List                                                           │
│  ┌──────┬──────────────┬──────────┬────────┬──────────┬──────────┐ │
│  │ Ord  │ Course       │ Credits  │ Instr. │ Status   │ Actions  │ │
│  ├──────┼──────────────┼──────────┼────────┼──────────┼──────────┤ │
│  │ 1    │ Network      │ 6        │ Smith  │ Published│ [Edit]   │ │
│  │      │ Defense      │          │        │ ✅       │ [View]   │ │
│  │ 2    │ Cryptography │ 4        │ Jones  │ Published│ [Edit]   │ │
│  │ 3    │ Sec. Found.  │ 4        │ Lee    │ Draft    │ [Review] │ │
│  │ 4    │ Ethics       │ 3        │ Davis  │ Published│ [Edit]   │ │
│  └──────┴──────────────┴──────────┴────────┴──────────┴──────────┘ │
│  [Add Course]  [Reorder Courses]  [Import from Template]            │
├─────────────────────────────────────────────────────────────────────┤
│  Version History                                                       │
│  ┌────────────┬──────────┬────────────┬────────────┬──────────────┐ │
│  │ Version    │ Date     │ Author     │ Status     │ Changes      │ │
│  ├────────────┼──────────┼────────────┼────────────┼──────────────┤ │
│  │ v3.2       │ Oct 15   │ Smith      │ Current    │ Updated M4  │ │
│  │ v3.1       │ Aug 1    │ Jones      │ Archived   │ Added labs   │ │
│  │ v3.0       │ Jun 1    │ Admin      │ Archived   │ Major rev.  │ │
│  │ v2.0       │ Jan 2026 │ Smith      │ Archived   │ Initial     │ │
│  └────────────┴──────────┴────────────┴────────────┴──────────────┘ │
│  [Compare Versions]  [Rollback to vX.X]  [Export Curriculum]        │
├─────────────────────────────────────────────────────────────────────┤
│  Accreditation Crosswalk                                                │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Standard              │ Requirement    │ Coverage            │  │
│  │ NICE Cybersecurity   │ Work Role:     │ Module 2, 3, 5      │  │
│  │ Workforce Framework  │ Cyber Defense  │                     │  │
│  │ ABET Computing       │ Student        │ Course 1-4 meet     │  │
│  │ Accreditation        │ Outcomes 3-7   │ 100%                │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  [Add Standard]  [Run Coverage Report]                               │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/dept/curriculum`, `PUT /api/dept/curriculum/programs/:id`, `POST /api/dept/curriculum/versions`

**States:**

- **Loading:** Program skeleton, course table skeleton
- **Empty:** "No programs in this department yet. [Create Program →]"
- **Draft mode:** Yellow banner "You are editing a draft. Publish to make live."
- **Error:** "Failed to load curriculum. [Retry]"

### Screen 3.3: Instructor Management (`/dept/instructors`)

**Purpose:** Manage instructor roster, assignments, performance reviews, professional development.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Instructor Management                                      [+ Add]  │
│  [All] [Active] [On Leave] [Pending] [Inactive]   🔍 [Search...]  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌────────────┬──────────┬───────────┬────────┬────────┬──────────┐│
│  │ Instructor │ Dept Role │ Status    │ Course │ QA Due │ Rating   ││
│  ├────────────┼──────────┼───────────┼────────┼────────┼──────────┤│
│  │ Prof.     │ Lead     │ Active    │ NetDef │ Overdue│ 4.5/5    ││
│  │ Smith     │          │           │        │ ⚠14d   │ ★★★★★   ││
│  │ Dr. Jones │ Senior   │ Active    │ Crypto │ Dec 15 │ 4.2/5    ││
│  │ Prof. Lee │ Asst.    │ Active    │ Found. │ Done ✓ │ 3.8/5    ││
│  │ Prof.     │ TA       │ On Leave  │ —      │ —      │ 4.0/5    ││
│  │ Davis     │          │ (medical) │        │        │          ││
│  │ Dr. Wang  │ Guest    │ Pending   │ —      │ —      │ —        ││
│  └────────────┴──────────┴───────────┴────────┴────────┴──────────┘│
│  [Bulk Actions ▼]  [Export Roster]  [Assign Courses]               │
├─────────────────────────────────────────────────────────────────────┤
│  Instructor Performance Overview                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Performance Distribution                                     │  │
│  │ ★★★★★  Excellent (4.5+): 4                                  │  │
│  │ ★★★★  Good (4.0-4.4): 8                                    │  │
│  │ ★★★  Needs Improvement (3.0-3.9): 4                        │  │
│  │ ★★  At Risk (<3.0): 2                                      │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Selected: Prof. Smith                                                 │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Profile: 15 years exp | PhD | Specialization: Network Sec    │  │
│  │ Courses: Network Defense (lead), Capstone (co-lead)          │  │
│  │ Student Rating: 4.5/5  |  Peer Review: 4.2/5 | Self: 4.0/5  │  │
│  │ QA Observations: 2 due, 1 completed (score: 88%)             │  │
│  │ Professional Dev: "Cloud Security Cert" in progress          │  │
│  │ [Schedule QA] [View Full Profile] [Send Message] [Edit]     │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/dept/instructors`, `GET /api/dept/instructors/:id`, `POST /api/dept/instructors`

### Screen 3.4: Quality Assurance (`/dept/quality`)

**Purpose:** Manage QA observations, course evaluations, peer reviews, and improvement plans.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Quality Assurance                                        [+ New QA]│
│  [Observations] [Course Evaluations] [Peer Reviews] [Improvements]  │
├─────────────────────────────────────────────────────────────────────┤
│  QA Observations (2 pending, 1 overdue)                               │
│  ┌────────────┬──────────┬─────────┬────────┬──────────┬──────────┐│
│  │ Instructor │ Date     │ Course  │ Status │ Score    │ Actions  ││
│  ├────────────┼──────────┼─────────┼────────┼──────────┼──────────┤│
│  │ Prof.     │ Oct 30   │ NetDef  │ Pending│ —        │ [Schedule│
│  │ Smith     │ (overdue)│         │ 🔴     │          │  Now]    ││
│  │ Dr. Jones │ Nov 15   │ Crypto  │ Planned│ —        │ [Confirm]││
│  │ Prof. Lee │ Dec 1    │ Found.  │ Planned│ —        │ [Confirm]││
│  └────────────┴──────────┴─────────┴────────┴──────────┴──────────┘│
│  [Schedule Observation] [Bulk Schedule Quarterly]                   │
├─────────────────────────────────────────────────────────────────────┤
│  Course Evaluation Summary (Fall 2026)                                 │
│  ┌──────────┬────────┬────────┬────────┬────────┬─────────────────┐│
│  │ Course   │ Overall│ Content│ Instruct│ Assess-│ Responses       ││
│  │          │        │        │ or      │ ments  │                 ││
│  ├──────────┼────────┼────────┼────────┼────────┼─────────────────┤│
│  │ NetDef   │ 4.3    │ 4.2    │ 4.5     │ 4.1    │ 22/24           ││
│  │ Crypto   │ 4.1    │ 4.0    │ 4.2     │ 4.0    │ 16/18           ││
│  │ Found.   │ 4.5    │ 4.6    │ 4.5     │ 4.4    │ 20/24           ││
│  │ Ethics   │ 3.8    │ 3.5    │ 4.0     │ 3.7    │ 8/12 ⚠ low     ││
│  └──────────┴────────┴────────┴────────┴────────┴─────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  Improvement Plans                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 📋 Course: Ethics & Compliance — Plan: Revise assessments   │  │
│  │   Status: In Progress | Target: Dec 31, 2026                │  │
│  │   [View Plan] [Update Progress]                             │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/dept/quality/observations`, `GET /api/dept/quality/evaluations`, `POST /api/dept/quality/observations`

### Screen 3.5: Reports & Analytics (`/dept/reports`)

**Purpose:** Generate, view, and export department-wide reports with drill-downs.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Department Reports                                      [Generate]  │
│  [Standard Reports] [Custom Reports] [Scheduled Reports]           │
├─────────────────────────────────────────────────────────────────────┤
│  Standard Reports                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 📊 Monthly Department Performance Report                   │  │
│  │  Includes: enrollments, grades, attrition, satisfaction     │  │
│  │  Last generated: Oct 31, 2026 | Schedule: 1st of month     │  │
│  │  [View] [Download PDF] [Download CSV] [Edit Schedule]       │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ 📊 Instructor Performance Summary                          │  │
│  │  Includes: ratings, QA scores, PD hours, course outcomes    │  │
│  │  [Generate]  [View Last]                                     │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ 📊 Program Outcome Achievement Report                      │  │
│  │  [Generate]  [View Last]                                     │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ 📊 Accreditation Readiness Report                          │  │
│  │  [Generate]  [View Last]                                     │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ 📊 Budget vs Actual Report                                 │  │
│  │  [Generate]  [View Last]                                     │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Analytics Dashboard (embedded)                                       │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐│
│  │ Enroll-   │ Attrition│ Grade    │ Satisf.  │ Faculty  │ Cost/   ││
│  │ ment      │ Rate     │ Dist.    │ Score    │ per Stu  │ Student ││
│  │ 342       │ 8.5%     │ [Chart]  │ 4.3/5    │ 1:19     │ $7,012  ││
│  └──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘│
│  [Drill Down →] [Set Benchmarks] [Configure Dashboard]              │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/dept/reports`, `POST /api/dept/reports/generate`

### Screen 3.6: Approvals (`/dept/approvals`)

**Purpose:** Review and approve curriculum changes, budget requests, instructor hires, policy exceptions.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Approvals (Pending: 7)                                    [Filter ▼]│
│  [All] [Curriculum] [Budget] [Personnel] [Policy] [Other]         │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 🔵 Curriculum v3.2 — Cybersecurity Fundamentals             │  │
│  │  Proposed by: Prof. Smith | Oct 28, 2026                   │  │
│  │  Summary: Updated Module 4 to include cloud security topics │  │
│  │  Impact: 120 students, 3 instructors affected              │  │
│  │  [View Changes] [Compare with v3.1] [Approve] [Reject]     │  │
│  │  ⏳ Pending: 5 days | Urgency: Medium                       │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ 🔴 Budget Request — Lab Equipment Upgrade ($45,000)        │  │
│  │  Requested by: Prof. Lee | Oct 25, 2026 | Due: Nov 1      │  │
│  │  Justification: "Current lab VMs are outdated..."          │  │
│  │  Budget Impact: Reallocation from travel funds             │  │
│  │  [View Details] [View Budget Impact] [Approve] [Reject]     │  │
│  │  ⏳ Pending: 8 days | Urgency: High                         │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ 🟢 New Instructor Hire — Dr. Wang (Guest Lecturer)        │  │
│  │  Requested by: HR | Oct 20, 2026                           │  │
│  │  Specialization: Cloud Security | Rate: $150/hr            │  │
│  │  [View CV] [Approve] [Reject]                              │  │
│  │  ⏳ Pending: 13 days | Urgency: Low                        │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Approval History                                                      │
│  ┌────────────┬────────────┬────────────┬────────┬────────────────┐│
│  │ Item       │ Type       │ Submitted  │ Status │ Decision Date  ││
│  ├────────────┼────────────┼────────────┼────────┼────────────────┤│
│  │ Course     │ Curriculum │ Oct 20     │ ✅     │ Oct 22         ││
│  │ Draft      │            │            │Approved│                ││
│  │ Travel     │ Budget     │ Oct 15     │ ❌     │ Oct 18         ││
│  │ Request    │            │            │Rejected│                ││
│  └────────────┴────────────┴────────────┴────────┴────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/dept/approvals`, `POST /api/dept/approvals/:id/approve`, `POST /api/dept/approvals/:id/reject`

**States:**

- **Loading:** Approval card skeletons
- **Empty:** "No pending approvals. You're all caught up!"
- **Error:** "Failed to load approvals. [Retry]"

### Screen 3.7: Calendar (`/dept/calendar`)

**Purpose:** Department events — meetings, QA observations, deadlines, accreditation milestones.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Department Calendar                                      [+ Event]  │
│  ◀ November 2026 ▶                     [Month] [Week] [Day] [Agenda]│
├────┬────┬────┬────┬────┬────┬───────────────────────────────────────┤
│ Sun│ Mon│ Tue│ Wed│ Thu│ Fri│ Sat                                   │
├────┼────┼────┼────┼────┼────┼───────────────────────────────────────┤
│    │  1 │  2 │  3 │  4 │  5 │  6                                    │
│    │Dep  │    │ QA │Curr│    │                                      │
│    │Mtng │    │ Smt│ Com│    │                                      │
│    │10AM │    │ h  │ mit│    │                                      │
│    │     │    │ 2PM│ 3PM│    │                                      │
├────┼────┼────┼────┼────┼────┼───────────────────────────────────────┤
│  7 │  8 │  9 │ 10 │ 11 │ 12 │ 13                                    │
│    │    │Accr│    │    │Budg│                                      │
│    │    │Subm│    │    │et  │                                      │
│    │    │it  │    │    │Rev │                                      │
│    │    │Due │    │    │10AM│                                      │
└────┴────┴────┴────┴────┴────┴───────────────────────────────────────┘
│  Today's Events:                                                      │
│  ● 10:00 AM — Weekly Department Meeting (Room 301)                  │
│  ● 2:00 PM — QA Observation: Prof. Smith                            │
│  ● All Day — Budget Reports Due                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/dept/calendar?start=&end=`

### Screen 3.8: Program Enrollment (`/dept/enrollment`)

**Purpose:** View and analyze enrollment trends, capacity, and projections.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Enrollment Management                                                │
│  [Overview] [Trends] [Capacity] [Projections]                       │
├─────────────────────────────────────────────────────────────────────┤
│  Current Enrollment: 342 students (across 4 programs)               │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Program               │ Enrolled │ Capacity │ Available │ %  │  │
│  │ Cybersecurity Found.  │ 120      │ 150      │ 30        │ 80%│  │
│  │ Network Defense       │ 85       │ 100      │ 15        │ 85%│  │
│  │ Cryptography          │ 72       │ 80       │ 8         │ 90%│  │
│  │ Ethics & Compliance   │ 65       │ 100      │ 35        │ 65%│  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Weekly Trend (This Term)                                               │
│  [Line chart: Enrollment over time, with projection line]          │
├─────────────────────────────────────────────────────────────────────┤
│  Capacity Alerts                                                       │
│  ⚠ Cryptography at 90% capacity — consider increasing cohort size    │
│  ⚠ Ethics & Compliance at 65% — consider marketing push             │
├─────────────────────────────────────────────────────────────────────┤
│  [Set Capacity] [Export] [View Applications Pipeline]                │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/dept/enrollment`

---

## 4. Full Database Schema

### Table: `departments`

| Column                     | Type            | Constraints                        | Default             | Description                     |
| -------------------------- | --------------- | ---------------------------------- | ------------------- | ------------------------------- |
| `id`                       | `UUID`          | PK                                 | `gen_random_uuid()` | —                               |
| `name`                     | `VARCHAR(255)`  | UNIQUE, NOT NULL                   | —                   | Department name                 |
| `slug`                     | `VARCHAR(200)`  | UNIQUE, NOT NULL                   | —                   | URL-friendly ID                 |
| `code`                     | `VARCHAR(20)`   | UNIQUE, NOT NULL                   | —                   | "CSF", "NET", "FOR"             |
| `description`              | `TEXT`          | NULLABLE                           | —                   | —                               |
| `head_id`                  | `UUID`          | FK → department_heads.id, NULLABLE | —                   | Current department head         |
| `budget_annual`            | `DECIMAL(12,2)` | NOT NULL                           | `0`                 | Annual budget in USD            |
| `budget_fiscal_year`       | `VARCHAR(20)`   | NOT NULL                           | —                   | "FY2026"                        |
| `student_count`            | `INTEGER`       | NOT NULL                           | `0`                 | Current enrolled                |
| `instructor_count`         | `INTEGER`       | NOT NULL                           | `0`                 | Current active instructors      |
| `program_count`            | `INTEGER`       | NOT NULL                           | `0`                 | Active programs                 |
| `avg_graduation_rate`      | `DECIMAL(5,2)`  | NULLABLE                           | —                   | Computed                        |
| `avg_placement_rate`       | `DECIMAL(5,2)`  | NULLABLE                           | —                   | Computed                        |
| `avg_student_satisfaction` | `DECIMAL(2,1)`  | NULLABLE                           | —                   | 1.0-5.0                         |
| `status`                   | `VARCHAR(50)`   | NOT NULL                           | `'active'`          | active, inactive, restructuring |
| `created_at`               | `TIMESTAMPTZ`   | NOT NULL                           | `NOW()`             | —                               |
| `updated_at`               | `TIMESTAMPTZ`   | NOT NULL                           | `NOW()`             | —                               |

### Table: `department_heads`

| Column              | Type           | Constraints                   | Default    | Description                         |
| ------------------- | -------------- | ----------------------------- | ---------- | ----------------------------------- |
| `id`                | `UUID`         | PK, FK → users.id             | —          | —                                   |
| `department_id`     | `UUID`         | FK → departments.id, NOT NULL | —          | —                                   |
| `employee_id`       | `VARCHAR(20)`  | UNIQUE, NOT NULL              | —          | CEA-DH-YYYY-NNNNN                   |
| `title`             | `VARCHAR(200)` | NOT NULL                      | —          | "Department Head"                   |
| `academic_rank`     | `VARCHAR(100)` | NOT NULL                      | —          | Professor, Associate, Assistant     |
| `credentials`       | `JSONB`        | NULLABLE                      | —          | Degrees, certifications             |
| `specialization`    | `JSONB`        | NULLABLE                      | —          | Array of areas                      |
| `appointment_start` | `DATE`         | NOT NULL                      | —          | When appointed                      |
| `appointment_end`   | `DATE`         | NULLABLE                      | —          | If term-limited                     |
| `status`            | `VARCHAR(50)`  | NOT NULL                      | `'active'` | active, on_leave, interim, inactive |
| `created_at`        | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()`    | —                                   |
| `updated_at`        | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()`    | —                                   |

### Table: `program_versions`

| Column                  | Type          | Constraints                        | Default   | Description                            |
| ----------------------- | ------------- | ---------------------------------- | --------- | -------------------------------------- |
| `id`                    | `UUID`        | PK                                 | —         | —                                      |
| `program_id`            | `UUID`        | FK → programs.id, NOT NULL         | —         | —                                      |
| `version`               | `VARCHAR(20)` | NOT NULL                           | —         | "3.2"                                  |
| `status`                | `VARCHAR(50)` | NOT NULL                           | `'draft'` | draft, published, archived, superseded |
| `change_log`            | `TEXT`        | NULLABLE                           | —         | Description of changes                 |
| `approved_by`           | `UUID`        | FK → department_heads.id, NULLABLE | —         | —                                      |
| `approved_at`           | `TIMESTAMPTZ` | NULLABLE                           | —         | —                                      |
| `published_at`          | `TIMESTAMPTZ` | NULLABLE                           | —         | —                                      |
| `learning_outcomes`     | `JSONB`       | NULLABLE                           | —         | Array of outcome descriptions          |
| `accreditation_mapping` | `JSONB`       | NULLABLE                           | —         | Standards → courses mapping            |
| `created_by`            | `UUID`        | FK → users.id, NOT NULL            | —         | —                                      |
| `created_at`            | `TIMESTAMPTZ` | NOT NULL                           | `NOW()`   | —                                      |

**Indexes:** UNIQUE(program_id, version)

### Table: `instructor_qa_observations`

| Column                  | Type          | Constraints                   | Default       | Description                                                                     |
| ----------------------- | ------------- | ----------------------------- | ------------- | ------------------------------------------------------------------------------- |
| `id`                    | `UUID`        | PK                            | —             | —                                                                               |
| `instructor_id`         | `UUID`        | FK → instructors.id, NOT NULL | —             | —                                                                               |
| `observed_by`           | `UUID`        | FK → department_heads.id      | —             | —                                                                               |
| `course_id`             | `UUID`        | FK → courses.id               | —             | —                                                                               |
| `observation_type`      | `VARCHAR(50)` | NOT NULL                      | —             | scheduled, random, peer, improvement_followup                                   |
| `scheduled_date`        | `DATE`        | NOT NULL                      | —             | —                                                                               |
| `completed_at`          | `TIMESTAMPTZ` | NULLABLE                      | —             | —                                                                               |
| `score`                 | `INTEGER`     | NULLABLE                      | —             | 0-100                                                                           |
| `scores_detail`         | `JSONB`       | NULLABLE                      | —             | {content_delivery, engagement, assessment, communication, classroom_management} |
| `strengths`             | `TEXT`        | NULLABLE                      | —             | —                                                                               |
| `areas_for_improvement` | `TEXT`        | NULLABLE                      | —             | —                                                                               |
| `action_items`          | `JSONB`       | NULLABLE                      | —             | Array of follow-up items                                                        |
| `status`                | `VARCHAR(50)` | NOT NULL                      | `'scheduled'` | scheduled, completed, cancelled, rescheduled                                    |
| `created_at`            | `TIMESTAMPTZ` | NOT NULL                      | `NOW()`       | —                                                                               |
| `updated_at`            | `TIMESTAMPTZ` | NOT NULL                      | `NOW()`       | —                                                                               |

**Indexes:** `idx_qa_instructor` ON `instructor_id`, `idx_qa_status` ON `status`

### Table: `course_evaluations`

| Column                | Type           | Constraints               | Default | Description        |
| --------------------- | -------------- | ------------------------- | ------- | ------------------ |
| `id`                  | `UUID`         | PK                        | —       | —                  |
| `course_id`           | `UUID`         | FK → courses.id, NOT NULL | —       | —                  |
| `term`                | `VARCHAR(50)`  | NOT NULL                  | —       | "Fall 2026"        |
| `response_count`      | `INTEGER`      | NOT NULL                  | `0`     | —                  |
| `enrolled_count`      | `INTEGER`      | NOT NULL                  | `0`     | —                  |
| `overall_score`       | `DECIMAL(2,1)` | NULLABLE                  | —       | 1.0-5.0            |
| `content_score`       | `DECIMAL(2,1)` | NULLABLE                  | —       | —                  |
| `instructor_score`    | `DECIMAL(2,1)` | NULLABLE                  | —       | —                  |
| `assessment_score`    | `DECIMAL(2,1)` | NULLABLE                  | —       | —                  |
| `engagement_score`    | `DECIMAL(2,1)` | NULLABLE                  | —       | —                  |
| `open_ended_feedback` | `JSONB`        | NULLABLE                  | —       | Anonymous comments |
| `generated_at`        | `TIMESTAMPTZ`  | NOT NULL                  | `NOW()` | —                  |
| `created_at`          | `TIMESTAMPTZ`  | NOT NULL                  | `NOW()` | —                  |

**Indexes:** UNIQUE(course_id, term)

### Table: `improvement_plans`

| Column                | Type           | Constraints                   | Default    | Description                              |
| --------------------- | -------------- | ----------------------------- | ---------- | ---------------------------------------- |
| `id`                  | `UUID`         | PK                            | —          | —                                        |
| `department_id`       | `UUID`         | FK → departments.id, NOT NULL | —          | —                                        |
| `title`               | `VARCHAR(255)` | NOT NULL                      | —          | —                                        |
| `description`         | `TEXT`         | NOT NULL                      | —          | —                                        |
| `scope_type`          | `VARCHAR(50)`  | NOT NULL                      | —          | course, program, instructor, process     |
| `scope_id`            | `UUID`         | NOT NULL                      | —          | FK to relevant entity                    |
| `priority`            | `VARCHAR(20)`  | NOT NULL                      | `'medium'` | low, medium, high, critical              |
| `target_date`         | `DATE`         | NULLABLE                      | —          | —                                        |
| `status`              | `VARCHAR(50)`  | NOT NULL                      | `'draft'`  | draft, in_progress, completed, cancelled |
| `progress_percentage` | `INTEGER`      | NOT NULL                      | `0`        | —                                        |
| `action_steps`        | `JSONB`        | NULLABLE                      | —          | Array of steps with status               |
| `created_by`          | `UUID`         | FK → users.id, NOT NULL       | —          | —                                        |
| `created_at`          | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()`    | —                                        |
| `updated_at`          | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()`    | —                                        |

### Table: `approval_requests`

| Column           | Type           | Constraints                        | Default             | Description                                  |
| ---------------- | -------------- | ---------------------------------- | ------------------- | -------------------------------------------- |
| `id`             | `UUID`         | PK                                 | `gen_random_uuid()` | —                                            |
| `department_id`  | `UUID`         | FK → departments.id, NOT NULL      | —                   | —                                            |
| `request_type`   | `VARCHAR(50)`  | NOT NULL                           | —                   | curriculum, budget, personnel, policy, other |
| `title`          | `VARCHAR(255)` | NOT NULL                           | —                   | —                                            |
| `description`    | `TEXT`         | NOT NULL                           | —                   | —                                            |
| `request_data`   | `JSONB`        | NOT NULL                           | —                   | Type-specific payload                        |
| `requested_by`   | `UUID`         | FK → users.id, NOT NULL            | —                   | —                                            |
| `requested_at`   | `TIMESTAMPTZ`  | NOT NULL                           | `NOW()`             | —                                            |
| `status`         | `VARCHAR(50)`  | NOT NULL                           | `'pending'`         | pending, approved, rejected, withdrawn       |
| `reviewed_by`    | `UUID`         | FK → department_heads.id, NULLABLE | —                   | —                                            |
| `reviewed_at`    | `TIMESTAMPTZ`  | NULLABLE                           | —                   | —                                            |
| `decision_notes` | `TEXT`         | NULLABLE                           | —                   | Reason for decision                          |
| `priority`       | `VARCHAR(20)`  | NOT NULL                           | `'medium'`          | low, medium, high, urgent                    |
| `due_date`       | `DATE`         | NULLABLE                           | —                   | Response deadline                            |
| `created_at`     | `TIMESTAMPTZ`  | NOT NULL                           | `NOW()`             | —                                            |
| `updated_at`     | `TIMESTAMPTZ`  | NOT NULL                           | `NOW()`             | —                                            |

**Indexes:** `idx_ar_status` ON `status`, `idx_ar_type` ON `request_type`, `idx_ar_department` ON `department_id`

### Table: `accreditation_standards`

| Column             | Type           | Constraints                   | Default       | Description                                       |
| ------------------ | -------------- | ----------------------------- | ------------- | ------------------------------------------------- |
| `id`               | `UUID`         | PK                            | —             | —                                                 |
| `name`             | `VARCHAR(255)` | NOT NULL                      | —             | "ABET Computing"                                  |
| `organization`     | `VARCHAR(255)` | NOT NULL                      | —             | "ABET", "NICE"                                    |
| `version`          | `VARCHAR(50)`  | NOT NULL                      | —             | "2025-2026"                                       |
| `requirements`     | `JSONB`        | NOT NULL                      | —             | Array of standards                                |
| `department_id`    | `UUID`         | FK → departments.id, NOT NULL | —             | —                                                 |
| `next_review_date` | `DATE`         | NULLABLE                      | —             | —                                                 |
| `last_review_date` | `DATE`         | NULLABLE                      | —             | —                                                 |
| `status`           | `VARCHAR(50)`  | NOT NULL                      | `'compliant'` | compliant, at_risk, non_compliant, pending_review |
| `created_at`       | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()`       | —                                                 |

### Table: `budget_line_items`

| Column             | Type            | Constraints                   | Default    | Description                                           |
| ------------------ | --------------- | ----------------------------- | ---------- | ----------------------------------------------------- |
| `id`               | `UUID`          | PK                            | —          | —                                                     |
| `department_id`    | `UUID`          | FK → departments.id, NOT NULL | —          | —                                                     |
| `fiscal_year`      | `VARCHAR(20)`   | NOT NULL                      | —          | —                                                     |
| `category`         | `VARCHAR(100)`  | NOT NULL                      | —          | salary, equipment, software, travel, facilities, misc |
| `description`      | `VARCHAR(500)`  | NOT NULL                      | —          | —                                                     |
| `allocated_amount` | `DECIMAL(12,2)` | NOT NULL                      | —          | Budgeted                                              |
| `spent_amount`     | `DECIMAL(12,2)` | NOT NULL                      | `0`        | Actual spent                                          |
| `committed_amount` | `DECIMAL(12,2)` | NOT NULL                      | `0`        | Approved but not yet spent                            |
| `status`           | `VARCHAR(50)`   | NOT NULL                      | `'active'` | active, frozen, closed                                |
| `notes`            | `TEXT`          | NULLABLE                      | —          | —                                                     |
| `created_at`       | `TIMESTAMPTZ`   | NOT NULL                      | `NOW()`    | —                                                     |
| `updated_at`       | `TIMESTAMPTZ`   | NOT NULL                      | `NOW()`    | —                                                     |

**Indexes:** `idx_budget_dept` ON `department_id`, `fiscal_year`

### Table: `department_events`

| Column            | Type           | Constraints                   | Default | Description                                                                  |
| ----------------- | -------------- | ----------------------------- | ------- | ---------------------------------------------------------------------------- |
| `id`              | `UUID`         | PK                            | —       | —                                                                            |
| `department_id`   | `UUID`         | FK → departments.id, NOT NULL | —       | —                                                                            |
| `title`           | `VARCHAR(255)` | NOT NULL                      | —       | —                                                                            |
| `description`     | `TEXT`         | NULLABLE                      | —       | —                                                                            |
| `event_type`      | `VARCHAR(50)`  | NOT NULL                      | —       | meeting, qa_observation, deadline, accreditation_milestone, workshop, social |
| `start_at`        | `TIMESTAMPTZ`  | NOT NULL                      | —       | —                                                                            |
| `end_at`          | `TIMESTAMPTZ`  | NULLABLE                      | —       | —                                                                            |
| `all_day`         | `BOOLEAN`      | NOT NULL                      | `false` | —                                                                            |
| `location`        | `VARCHAR(255)` | NULLABLE                      | —       | —                                                                            |
| `meeting_url`     | `VARCHAR(500)` | NULLABLE                      | —       | —                                                                            |
| `is_recurring`    | `BOOLEAN`      | NOT NULL                      | `false` | —                                                                            |
| `recurrence_rule` | `VARCHAR(255)` | NULLABLE                      | —       | RRULE format                                                                 |
| `created_by`      | `UUID`         | FK → users.id, NOT NULL       | —       | —                                                                            |
| `created_at`      | `TIMESTAMPTZ`  | NOT NULL                      | `NOW()` | —                                                                            |

---

## 5. Complete API Contract

### `GET /api/dept/dashboard`

**Auth:** Required (department_head role)

**Response:**

```typescript
interface DeptDashboardResponse {
  department: {
    id: string;
    name: string;
    code: string;
    headName: string;
  };
  metrics: {
    studentCount: number;
    studentChangeYoY: number;
    instructorCount: number;
    instructorQAPending: number;
    programCount: number;
    avgGrade: number;
    avgGradeChange: number;
    budgetAnnual: number;
    budgetUtilization: number;
    graduationRate: number;
    placementRate: number;
    retentionRate: number;
    instructorSatisfaction: number;
    coursePassRate: number;
    studentSatisfaction: number;
  };
  alerts: DepartmentAlert[];
  recentActivity: DeptActivityItem[];
  quickActions: QuickAction[];
}

interface DepartmentAlert {
  id: string;
  type: "warning" | "critical" | "info";
  category: string;
  message: string;
  link: string;
  createdAt: string;
}

interface DeptActivityItem {
  type: string;
  description: string;
  timestamp: string;
  link: string | null;
}
```

### `GET /api/dept/curriculum`

**Auth:** Required (department_head)

**Response:**

```typescript
interface CurriculumResponse {
  programs: ProgramCurriculumSummary[];
  versionHistory: ProgramVersion[];
}

interface ProgramCurriculumSummary {
  id: string;
  title: string;
  slug: string;
  currentVersion: string;
  status: "draft" | "published" | "archived";
  courses: CourseCurriculumItem[];
  learningOutcomes: string[];
  accreditationStandards: string[];
}

interface CourseCurriculumItem {
  id: string;
  title: string;
  sortOrder: number;
  credits: number;
  instructorName: string;
  status: "draft" | "published";
  modules: number;
}

interface ProgramVersion {
  id: string;
  programId: string;
  version: string;
  status: string;
  changeLog: string;
  approvedBy: string | null;
  approvedAt: string | null;
  publishedAt: string | null;
  createdAt: string;
}
```

### `PUT /api/dept/curriculum/programs/:id`

**Auth:** Required (department_head)

**Request:**

```typescript
interface UpdateProgramCurriculumRequest {
  title?: string;
  description?: string;
  category?: string;
  level?: string;
  credits?: number;
  durationWeeks?: number;
  format?: string;
  learningOutcomes?: string[];
  accreditationMapping?: Record<string, string[]>;
}
```

### `POST /api/dept/curriculum/programs/:id/versions`

**Auth:** Required (department_head)

**Request:**

```typescript
interface CreateCurriculumVersionRequest {
  version: string;
  changeLog: string;
  learningOutcomes?: string[];
  accreditationMapping?: Record<string, string[]>;
}
```

### `POST /api/dept/curriculum/programs/:id/versions/:versionId/publish`

**Auth:** Required (department_head)

### `GET /api/dept/instructors`

**Auth:** Required (department_head)

**Query:** `status?: string`, `search?: string`, `page?: number`, `limit?: number`

**Response:**

```typescript
interface InstructorsResponse {
  instructors: DeptInstructorSummary[];
  stats: {
    total: number;
    active: number;
    onLeave: number;
    pending: number;
    inactive: number;
    avgRating: number;
    ratingDistribution: Record<string, number>;
  };
  pagination: Pagination;
}

interface DeptInstructorSummary {
  id: string;
  name: string;
  title: string;
  departmentRole: string;
  status: string;
  courses: string[];
  nextQADue: string | null;
  qaOverdue: boolean;
  rating: number;
  isAtRisk: boolean;
}
```

### `GET /api/dept/instructors/:id`

**Auth:** Required (department_head)

**Response:**

```typescript
interface InstructorFullProfileResponse {
  instructor: {
    id: string;
    name: string;
    employeeId: string;
    title: string;
    departmentRole: string;
    status: string;
    credentials: string[];
    specializations: string[];
    yearsExperience: number;
    bio: string | null;
    avatarUrl: string | null;
  };
  assignments: {
    courseId: string;
    courseTitle: string;
    role: string;
    currentStudents: number;
    avgGrade: number;
  }[];
  performance: {
    studentRating: number;
    peerReview: number;
    selfRating: number;
    qaScores: { score: number; date: string; type: string }[];
    recentTrend: "up" | "stable" | "down";
  };
  qaObservations: QAObservationSummary[];
  professionalDev: {
    course: string;
    status: string;
    completedAt: string | null;
  }[];
}
```

### `GET /api/dept/quality/observations`

**Auth:** Required (department_head)

**Query:** `status?: string`, `instructorId?: string`

**Response:**

```typescript
interface QAObservationsResponse {
  observations: QAObservationFull[];
  stats: {
    scheduled: number;
    completed: number;
    overdue: number;
    avgScore: number;
  };
}

interface QAObservationFull {
  id: string;
  instructorId: string;
  instructorName: string;
  courseName: string;
  observationType: string;
  scheduledDate: string;
  completedAt: string | null;
  score: number | null;
  scoresDetail: Record<string, number> | null;
  strengths: string | null;
  areasForImprovement: string | null;
  actionItems: { text: string; status: string }[];
  status: string;
}
```

### `POST /api/dept/quality/observations`

**Auth:** Required (department_head)

**Request:**

```typescript
interface CreateQAObservationRequest {
  instructorId: string;
  courseId?: string;
  observationType: "scheduled" | "random" | "peer";
  scheduledDate: string;
}
```

### `PUT /api/dept/quality/observations/:id`

**Auth:** Required (department_head)

**Request:**

```typescript
interface CompleteQAObservationRequest {
  score: number;
  scoresDetail: {
    contentDelivery: number;
    engagement: number;
    assessment: number;
    communication: number;
    classroomManagement: number;
  };
  strengths: string;
  areasForImprovement: string;
  actionItems?: { text: string }[];
}
```

### `GET /api/dept/quality/evaluations`

**Auth:** Required (department_head)

**Query:** `term?: string`, `courseId?: string`

**Response:**

```typescript
interface CourseEvaluationsResponse {
  evaluations: CourseEvaluationSummary[];
}

interface CourseEvaluationSummary {
  courseId: string;
  courseTitle: string;
  instructorName: string;
  term: string;
  overallScore: number;
  contentScore: number;
  instructorScore: number;
  assessmentScore: number;
  engagementScore: number;
  responseRate: number;
  responseCount: number;
  enrolledCount: number;
}
```

### `GET /api/dept/approvals`

**Auth:** Required (department_head)

**Query:** `status?: 'pending' | 'history'`, `type?: string`

**Response:**

```typescript
interface ApprovalsResponse {
  pending: ApprovalRequestDetail[];
  stats: {
    total: number;
    byType: Record<string, number>;
    urgentCount: number;
    overdueCount: number;
  };
}

interface ApprovalRequestDetail {
  id: string;
  type: string;
  title: string;
  description: string;
  requestData: any;
  requestedByName: string;
  requestedAt: string;
  status: string;
  priority: string;
  dueDate: string | null;
  daysPending: number;
  urgency: "low" | "medium" | "high";
}
```

### `POST /api/dept/approvals/:id/approve`

**Auth:** Required (department_head)

**Request:**

```typescript
interface ApproveRequest {
  notes?: string;
}
```

### `POST /api/dept/approvals/:id/reject`

**Auth:** Required (department_head)

**Request:**

```typescript
interface RejectRequest {
  reason: string;
}
```

### `GET /api/dept/reports`

**Auth:** Required (department_head)

**Query:** `type?: string`, `format?: 'pdf' | 'csv'`

### `POST /api/dept/reports/generate`

**Auth:** Required (department_head)

**Request:**

```typescript
interface GenerateDepartmentReportRequest {
  type:
    | "monthly_performance"
    | "instructor_summary"
    | "program_outcomes"
    | "accreditation_readiness"
    | "budget_vs_actual"
    | "custom";
  format?: "pdf" | "csv";
  parameters?: Record<string, any>;
}
```

### `GET /api/dept/enrollment`

**Auth:** Required (department_head)

**Response:**

```typescript
interface EnrollmentResponse {
  totalEnrolled: number;
  totalCapacity: number;
  programs: ProgramEnrollmentData[];
  trend: { date: string; count: number }[];
  alerts: EnrollmentAlert[];
}

interface ProgramEnrollmentData {
  programId: string;
  programTitle: string;
  enrolled: number;
  capacity: number;
  available: number;
  utilization: number;
}
```

### `GET /api/dept/calendar`

**Auth:** Required (department_head)

**Query:** `start: string`, `end: string`

**Response:**

```typescript
interface DeptCalendarResponse {
  events: DeptCalendarEvent[];
}

interface DeptCalendarEvent {
  id: string;
  title: string;
  description: string | null;
  eventType: string;
  startAt: string;
  endAt: string;
  allDay: boolean;
  location: string | null;
  meetingUrl: string | null;
  isRecurring: boolean;
}
```

### `GET /api/dept/settings`

**Auth:** Required (department_head)

**Response:**

```typescript
interface DeptSettingsResponse {
  department: {
    name: string;
    code: string;
    description: string | null;
    budgetAnnual: number;
    fiscalYear: string;
  };
  head: {
    name: string;
    title: string;
    academicRank: string;
    appointmentStart: string;
    appointmentEnd: string | null;
  };
  preferences: {
    qaFrequency: "quarterly" | "semesterly" | "annually";
    defaultObservationType: string;
    evaluationPeriod: string;
    reportSchedule: string[];
    notificationPreferences: {
      deadlineReminders: boolean;
      pendingApprovals: boolean;
      qaOverdue: boolean;
      budgetAlerts: boolean;
      weeklyDigest: boolean;
    };
  };
}
```

---

## 6. Component Tree

```
DeptHeadLayout
├── DeptNavBar
│   ├── Logo
│   ├── DepartmentSwitcher (if multiple departments)
│   ├── NavLinks (Dashboard, Curriculum, Instructors, Quality, Approvals, Reports, Calendar)
│   ├── AlertBadge (approval count, overdue QA)
│   └── UserMenu (Settings, Help, Logout)
│
├── DeptDashboard
│   ├── PeriodSelector
│   ├── WelcomeHeader (department name, head name, status)
│   ├── MetricCardsGrid (6-8 stat cards)
│   │   ├── MetricCard("Students", count, change%, icon)
│   │   ├── MetricCard("Instructors", count, qaPending, icon)
│   │   ├── MetricCard("Programs", count, icon)
│   │   ├── MetricCard("Avg Grade", value, trend%, icon)
│   │   ├── MetricCard("Budget", amount, util%, icon)
│   │   ├── MetricCard("Graduation Rate", %, icon)
│   │   ├── MetricCard("Placement", %, icon)
│   │   └── MetricCard("Satisfaction", score, icon)
│   ├── AlertsWidget
│   │   └── AlertItem[] (icon, message, link, dismiss)
│   ├── QuickStatsRow
│   │   └── StatBox[]
│   ├── ActivityFeed
│   │   └── ActivityItem[] (icon, text, timestamp)
│   └── QuickActionsRow
│       └── ActionButton[]
│
├── CurriculumManagerPage
│   ├── ProgramSelector
│   ├── ProgramSettingsPanel
│   │   ├── ProgramForm (title, description, category, level, credits, duration)
│   │   ├── LearningOutcomesEditor (add/remove/reorder outcomes)
│   │   └── VersionInfo (current version, change log, status)
│   ├── CourseTable (order, title, credits, instructor, status, actions)
│   ├── VersionHistoryTimeline
│   │   └── VersionNode[] (version, date, author, status, compare/rollback)
│   └── AccreditationCrosswalkTable (standard, requirement, course coverage)
│
├── InstructorManagementPage
│   ├── TabBar (All, Active, On Leave, Pending, Inactive)
│   ├── SearchInput
│   ├── InstructorTable (name, role, status, courses, qa due, rating, actions)
│   ├── BulkActionBar (select, assign courses, schedule QA)
│   ├── PerformanceDistributionChart (bar chart)
│   └── SelectedInstructorPanel (slide-over)
│       ├── InstructorProfileHeader
│       ├── CourseAssignmentsList
│       ├── RatingBreakdown (student, peer, self)
│       ├── QAObservationHistory
│       │   └── QAItem[] (date, type, score, details)
│       ├── ProfessionalDevList
│       └── QuickActions (Schedule QA, Send Message, Edit Profile)
│
├── QualityAssurancePage
│   ├── TabBar (Observations, Evaluations, Peer Reviews, Improvement Plans)
│   ├── QAObservationSection
│   │   ├── ObservationTable (instructor, date, course, status, score, actions)
│   │   ├── ScheduleObservationButton → ScheduleModal
│   │   │   ├── InstructorSelect
│   │   │   ├── CourseSelect
│   │   │   ├── DatePicker
│   │   │   └── TypeSelect
│   │   └── CompleteObservationForm (scores, strengths, improvements, action items)
│   ├── CourseEvaluationSection
│   │   ├── EvaluationTable (course, overall, sub-scores, response rate)
│   │   └── DrillDownModal (per-question breakdown, comments)
│   └── ImprovementPlanSection
│       └── PlanCard[] (title, scope, priority, target, progress, actions)
│
├── ApprovalsPage
│   ├── FilterBar (All, Curriculum, Budget, Personnel, Policy)
│   ├── ApprovalCard[]
│   │   ├── PriorityBadge (urgent/high/medium/low)
│   │   ├── TypeIcon
│   │   ├── Title + Description
│   │   ├── Meta (requested by, date, days pending)
│   │   ├── ActionButtons (Approve, Reject, View Details)
│   │   └── ExpandableDetailsPanel (full request data, comparison)
│   ├── ApprovalHistoryTable (item, type, submitted, status, decision date)
│   └── BulkActionBar (approve selected, reject selected)
│
├── ReportsPage
│   ├── TabBar (Standard, Custom, Scheduled)
│   ├── StandardReportList
│   │   └── ReportCard[] (title, description, last generated, schedule, download)
│   ├── CustomReportBuilder
│   │   ├── ReportTypeSelect
│   │   ├── DateRangePicker
│   │   ├── SectionSelector (checkboxes for which sections)
│   │   ├── FormatToggle (PDF/CSV)
│   │   └── GenerateButton
│   ├── EmbeddedAnalyticsDashboard
│   │   ├── MetricCards
│   │   ├── GradeDistributionChart
│   │   ├── EnrollmentTrendChart
│   │   └── DrillDownLink
│   └── ScheduledReportsManager (cron schedule, recipients, format)
│
├── EnrollmentPage
│   ├── TabBar (Overview, Trends, Capacity, Projections)
│   ├── ProgramCapacityTable (program, enrolled, capacity, available, util%)
│   ├── TrendChart (line chart with projection)
│   ├── CapacityAlertList
│   └── CapacitySettings (set capacity per program)
│
├── DeptCalendar
│   ├── ViewToggle (Month/Week/Day/Agenda)
│   ├── CalendarGrid
│   ├── EventPopover (title, time, location, description, edit/delete)
│   └── AddEventModal (title, type, date, time, location, recurring)
│
└── DeptSettingsPage
    ├── DepartmentProfile (name, description, code, budget)
    ├── HeadProfile (title, rank, appointment dates)
    ├── QASettings (frequency, default type)
    ├── ReportSchedules (manage scheduled reports)
    └── NotificationPreferences (toggles)
```

---

## 7. Exhaustive User Journeys

### Journey 7.1: Curriculum Version Update

```
Step 1: Dept Head opens /dept/curriculum
  → Selects program: "Cybersecurity Fundamentals"
  → Current version: v3.1 (Published)

Step 2: Clicks "New Version"
  → Version: 3.2 (auto-incremented)
  → Change log: "Updated Module 4 to include cloud security topics"
  → Modifies learning outcomes: adds "Analyze cloud security architectures"

Step 3: Edits course list
  → Modifies "Network Defense" course description
  → Adds new course order
  → Saves draft

Step 4: Reviews accreditation crosswalk
  → NICE Framework mapping still covers all requirements
  → Runs coverage report → 100% coverage

Step 5: Clicks "Publish Version"
  → Confirmation: "Publish v3.2? This will become the active curriculum."
  → Confirms → POST /api/dept/curriculum/programs/:id/versions/:vid/publish
  → Status: Published
  → Instructors notified: "Curriculum v3.2 published for Cybersecurity Fundamentals"

Alternative:
  Step 4a: Coverage gap found → updates courses to fill gap → recheck
  Step 5a: Saves as draft → schedule publication for later date
  Step 5b: Rolls back to previous version if issues found post-publish
```

### Journey 7.2: Instructor QA Observation

```
Step 1: Dashboard shows "Prof. Smith observation overdue (14 days)"
  → Clicks alert → /dept/quality

Step 2: Clicks "Schedule Observation"
  → Instructor: Prof. Smith (pre-selected)
  → Course: Network Defense
  → Type: Scheduled
  → Date: Nov 5, 2026
  → Clicks "Schedule"

Step 3: On scheduled date, Dept Head attends class (or reviews recording)
  → Opens observation form

Step 4: Completes observation:
  - Content Delivery: 88%
  - Engagement: 85%
  - Assessment: 90%
  - Communication: 92%
  - Classroom Management: 85%
  → Overall Score: 88%
  → Strengths: "Excellent communication, real-world examples"
  → Improvement: "Increase student participation in discussions"
  → Action items: "Implement think-pair-share activities"

Step 5: Submits → POST /api/dept/quality/observations/:id
  → Prof. Smith notified: "QA Observation completed. Score: 88%"
  → Prof. Smith can view full results and action plan

Alternative:
  Step 3a: Low score (< 70%) → auto-triggers improvement plan
  Step 4a: Dept Head wants peer review instead → assigns peer reviewer
  Step 5a: Reschedules if emergency → observation marked as rescheduled
```

### Journey 7.3: Budget Approval Workflow

```
Step 1: Dashboard notification: "Budget request pending — Lab Equipment ($45,000)"
  → Clicks → /dept/approvals

Step 2: Reviews budget request detail:
  - Requested by: Prof. Lee
  - Category: Equipment
  - Amount: $45,000
  - Justification: "Current lab VMs outdated, need upgraded infrastructure"
  - Budget impact: Reallocation from travel funds ($45k available)

Step 3: Clicks "View Budget Impact"
  → Sees travel budget: $50,000 allocated, $5,000 spent, $45,000 remaining
  → Reallocation would leave travel at $0 for remainder of year

Step 4: Makes decision:
  → Option A: Approve with reallocation
    → Clicks "Approve" → notes: "Approved. Reallocate from travel budget."
    → POST /api/dept/approvals/:id/approve
  → Option B: Partial approval ($30,000 from equipment reserve)
  → Option C: Reject with reason

Step 5: Item moves to approval history
  → Prof. Lee notified: "Budget request approved"
  → Budget line items updated

Alternative:
  Step 4a: Needs more info → "Request More Info" → message sent to requester
  Step 4b: Multiple approvals needed → forward to higher authority
  Step 5a: Budget insufficient → reject with recommendation for next cycle
```

### Journey 7.4: Monthly Report Generation

```
Step 1: Dept Head opens /dept/reports
  → Clicks "Monthly Department Performance Report"

Step 2: Clicks "Generate"
  → Report builds (5-10 seconds)
  → Shows: enrollments, grades, attrition, satisfaction, budget utilization
  → Includes: charts, tables, comparison to previous months

Step 3: Reviews generated report
  → Spots attrition rate increase (8.5% vs 6.2% last month)
  → Drills down: Ethics & Compliance course has 15% attrition

Step 4: Clicks "Create Improvement Plan" from report
  → Auto-populates: course = Ethics & Compliance, issue = high attrition
  → Sets target: "Reduce attrition to < 10% by end of term"
  → Adds action steps:
    1. Review course content difficulty
    2. Add weekly check-ins with at-risk students
    3. Schedule instructor meeting to discuss pedagogy
  → Creates plan

Step 5: Downloads PDF report
  → Shares with dean via email
  → Schedules automated report for 1st of each month

Alternative:
  Step 3a: All metrics healthy → no action needed, just share
  Step 4a: Creates improvement plan directly from alert
  Step 5a: Schedules CSV export for data analysis in Excel
```

### Journey 7.5: New Instructor Onboarding

```
Step 1: HR sends notification: "New instructor Dr. Wang pending approval"
  → Opens /dept/approvals → sees personnel request

Step 2: Reviews Dr. Wang's CV, specialization, proposed rate ($150/hr)
  → View full profile → confirms expertise aligns with department needs

Step 3: Clicks "Approve"
  → Notes: "Approved as Guest Lecturer for Cloud Security"
  → Dr. Wang status changes to active
  → HR notified to proceed with contracting

Step 4: Navigates to /dept/instructors
  → Sees Dr. Wang in roster (status: Pending → Active)
  → Assigns to "Cloud Security" course

Step 5: Sends welcome message:
  "Welcome to the department, Dr. Wang! I've assigned you to Cloud Security.
   Please complete your profile and set up office hours."

Alternative:
  Step 3a: Rate too high → reject or negotiate via HR
  Step 4a: No course available → place in pool for next term
  Step 5a: Schedules onboarding meeting via calendar
```

### Journey 7.6: Accreditation Review Preparation

```
Step 1: Calendar reminder: "ABET accreditation review in 30 days"
  → Opens /dept/curriculum → Accreditation tab

Step 2: Runs "Coverage Report"
  → Shows: NICE Framework standards mapped to courses
  → Finds: Standard "K0060" (Cryptography concepts) has 60% coverage

Step 3: Reviews gap
  → Cryptography course covers most, but needs reinforcement in Network Defense
  → Edits Network Defense course → adds cryptography module
  → Creates curriculum version 3.2

Step 4: Generates Accreditation Readiness Report
  → Shows 100% coverage after update
  → Downloads PDF for submission

Step 5: Schedules mock review
  → Calendar: "Mock Accreditation Review — Nov 20"
  → Invites: Dean, Quality Assurance team, 2 peer reviewers

Alternative:
  Step 2a: Coverage at 100% → no changes needed
  Step 3a: Gap cannot be filled → request extension, document rationale
  Step 5a: External reviewer scheduled → coordinates visit
```

---

## 8. Business Rules Engine

### BR-DH-001: Curriculum Versioning

- Each program must have ≥ 1 version published
- Version format: major.minor (incremented automatically)
- Major version: significant restructuring (≥30% courses changed)
- Minor version: incremental updates (<30% courses changed)
- Only published versions are available to instructors/students
- Archived versions kept for 5 years for accreditation purposes

### BR-DH-002: QA Observation Requirements

- Each instructor must be observed ≥ 1x per semester
- New instructors: observed within first 4 weeks of teaching
- Low performers (<70%): observed every 4 weeks with improvement plan
- Observation must span ≥ 50% of class session duration
- Results shared with instructor within 48 hours

### BR-DH-003: Approval Authority Limits

- Dept Head can approve budget requests up to $50,000
- Requests > $50,000 require dean approval
- Curriculum changes: no monetary limit
- New instructor hires: approval required for rate > $100/hr
- Dept Head cannot approve own requests (separate chain)

### BR-DH-004: Enrollment Capacity Rules

- Programs can operate at 0-100% capacity
- At 90% capacity: warning generated, consider expansion
- At 100% capacity: waitlist auto-activated, new enrollments waitlisted
- Capacity adjustments require 1 week notice before term start
- Over-enrollment (>100%) requires dean approval

### BR-DH-005: Course Evaluation Collection

- Minimum response rate for valid evaluation: 60%
- Evaluations open last 2 weeks of term
- Anonymous responses guaranteed (not visible until after grade posting)
- Results visible to instructor after Department Head reviews
- Scores < 3.0 trigger automatic improvement plan

### BR-DH-006: Budget Management

- Budget is locked 2 months before fiscal year end
- Reallocations between categories allowed up to 20% of source budget
- Unspent budget > 10% at year-end triggers review
- Equipment purchases > $5,000 require 3 quotes
- Travel budget cannot exceed 10% of total department budget

### BR-DH-007: Accreditation Compliance

- Standards must be mapped to ≥ 1 course with ≥ 80% coverage
- Compliance review every 6 months
- Non-compliance triggers improvement plan within 30 days
- External accreditation visits must be prepared 90 days in advance
- Mock reviews conducted 60 days before external visit

### BR-DH-008: Instructor Performance Thresholds

- Rating 4.5+: Excellence award eligible
- Rating 3.5-4.4: Satisfactory, standard QA cadence
- Rating 2.5-3.4: Needs improvement, increased QA frequency
- Rating < 2.5: At risk, improvement plan + mentorship
- Two consecutive terms < 2.5: termination review

### BR-DH-009: Report Generation

- Monthly reports auto-generated on 1st of month
- Reports cached for 24 hours
- Custom reports timeout after 60 seconds
- Scheduled reports delivered via email to configured recipients
- Historical reports retained for 7 years

### BR-DH-010: Alert Thresholds

- Budget utilization > 90%: warning alert
- Budget utilization > 100%: critical alert
- QA observation overdue > 7 days: warning
- QA observation overdue > 14 days: critical
- Student satisfaction < 3.5: warning
- Student satisfaction < 3.0: critical
- Course pass rate < 70%: warning
- Attrition rate > 10%: warning
- Attrition rate > 15%: critical

---

## 9. Notification Specifications

### N-DH-01: Approval Request Received

| Field         | Value                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------- |
| **Trigger**   | New approval request submitted                                                               |
| **Channel**   | In-app (badge) + Push (urgent) + Email (daily digest)                                        |
| **Template**  | `dept_approval_request`                                                                      |
| **Variables** | `{{requestType}}`, `{{title}}`, `{{requestedBy}}`, `{{priority}}`, `{{dueDate}}`, `{{link}}` |
| **Frequency** | Per request; urgent ones push immediately                                                    |

### N-DH-02: QA Observation Overdue

| Field         | Value                                                                    |
| ------------- | ------------------------------------------------------------------------ |
| **Trigger**   | QA observation not completed by scheduled date + 7 days                  |
| **Channel**   | In-app (warning) + Email                                                 |
| **Template**  | `qa_overdue`                                                             |
| **Variables** | `{{instructorName}}`, `{{scheduledDate}}`, `{{daysOverdue}}`, `{{link}}` |

### N-DH-03: Budget Alert

| Field         | Value                                                                           |
| ------------- | ------------------------------------------------------------------------------- |
| **Trigger**   | Category utilization crosses 90%                                                |
| **Channel**   | In-app + Email                                                                  |
| **Template**  | `budget_alert`                                                                  |
| **Variables** | `{{category}}`, `{{allocated}}`, `{{spent}}`, `{{remaining}}`, `{{percentage}}` |

### N-DH-04: Curriculum Published

| Field         | Value                                                                            |
| ------------- | -------------------------------------------------------------------------------- |
| **Trigger**   | Curriculum version published                                                     |
| **Channel**   | In-app + Email (to all instructors in department)                                |
| **Template**  | `curriculum_published`                                                           |
| **Variables** | `{{programName}}`, `{{version}}`, `{{changeLog}}`, `{{publishedBy}}`, `{{link}}` |

### N-DH-05: Enrollment Threshold Warning

| Field         | Value                                                               |
| ------------- | ------------------------------------------------------------------- |
| **Trigger**   | Program enrollment reaches 90% capacity                             |
| **Channel**   | In-app + Email                                                      |
| **Template**  | `enrollment_threshold`                                              |
| **Variables** | `{{programName}}`, `{{enrolled}}`, `{{capacity}}`, `{{percentage}}` |

### N-DH-06: Instructor At-Risk Alert

| Field         | Value                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------- |
| **Trigger**   | Instructor rating drops below 2.5 or performance trend drops                             |
| **Channel**   | In-app + Email                                                                           |
| **Template**  | `instructor_at_risk`                                                                     |
| **Variables** | `{{instructorName}}`, `{{currentRating}}`, `{{previousRating}}`, `{{trend}}`, `{{link}}` |

### N-DH-07: Accreditation Reminder

| Field         | Value                                                                               |
| ------------- | ----------------------------------------------------------------------------------- |
| **Trigger**   | 90, 60, 30, 14, 7 days before accreditation milestone                               |
| **Channel**   | In-app + Email + Push (at 30/14/7)                                                  |
| **Template**  | `accreditation_reminder`                                                            |
| **Variables** | `{{standard}}`, `{{milestone}}`, `{{daysRemaining}}`, `{{actionItems}}`, `{{link}}` |

### N-DH-08: Monthly Digest

| Field         | Value                                                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Trigger**   | 1st of each month                                                                                                                                                                    |
| **Channel**   | Email                                                                                                                                                                                |
| **Template**  | `dept_monthly_digest`                                                                                                                                                                |
| **Variables** | `{{deptName}}`, `{{studentCount}}`, `{{avgGrade}}`, `{{attritionRate}}`, `{{satisfaction}}`, `{{budgetUtilization}}`, `{{pendingApprovals}}`, `{{qaOverdueCount}}`, `{{reportLink}}` |

### N-DH-09: Course Evaluation Available

| Field         | Value                                                                            |
| ------------- | -------------------------------------------------------------------------------- |
| **Trigger**   | Course evaluation results generated for a term                                   |
| **Channel**   | In-app + Email                                                                   |
| **Template**  | `course_evaluation_ready`                                                        |
| **Variables** | `{{courseName}}`, `{{term}}`, `{{overallScore}}`, `{{responseRate}}`, `{{link}}` |

### N-DH-10: Instructor Onboarding Complete

| Field         | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| **Trigger**   | New instructor approved and status set to active                 |
| **Channel**   | In-app                                                           |
| **Template**  | `instructor_onboarded`                                           |
| **Variables** | `{{instructorName}}`, `{{specialization}}`, `{{assignedCourse}}` |

---

## 10. Permission Matrix

| Entity                 | Action              | Dept Head     | Instructor    | Admin | Student |
| ---------------------- | ------------------- | ------------- | ------------- | ----- | ------- |
| Department Profile     | Read/Update         | ✅            | ❌            | ✅    | ❌      |
| Curriculum (own dept)  | Read                | ✅            | ✅            | ✅    | ❌      |
| Curriculum (own dept)  | Edit                | ✅            | ❌            | ✅    | ❌      |
| Curriculum             | Publish version     | ✅            | ❌            | ✅    | ❌      |
| Curriculum             | Rollback            | ✅            | ❌            | ✅    | ❌      |
| Programs (own dept)    | CRUD                | ✅            | ❌            | ✅    | ❌      |
| Courses (own dept)     | Read                | ✅            | ✅ (assigned) | ✅    | ❌      |
| Courses (own dept)     | Edit settings       | ✅            | ❌            | ✅    | ❌      |
| Instructors (own dept) | List                | ✅            | ❌            | ✅    | ❌      |
| Instructors (own dept) | Assign courses      | ✅            | ❌            | ✅    | ❌      |
| Instructors            | Performance data    | ✅ (own dept) | ✅ (own)      | ✅    | ❌      |
| QA Observations        | Schedule            | ✅            | ❌            | ✅    | ❌      |
| QA Observations        | Complete            | ✅            | ❌            | ✅    | ❌      |
| QA Observations        | View results        | ✅            | ✅ (own)      | ✅    | ❌      |
| Course Evaluations     | View                | ✅            | ✅ (own)      | ✅    | ❌      |
| Improvement Plans      | CRUD                | ✅            | ✅ (own)      | ✅    | ❌      |
| Approvals              | View pending        | ✅            | ❌            | ✅    | ❌      |
| Approvals              | Approve/Reject      | ✅            | ❌            | ✅    | ❌      |
| Budget (own dept)      | Read                | ✅            | ❌            | ✅    | ❌      |
| Budget (own dept)      | Edit line items     | ✅            | ❌            | ✅    | ❌      |
| Enrollment Data        | Read                | ✅            | ❌            | ✅    | ❌      |
| Reports                | Generate (own dept) | ✅            | ❌            | ✅    | ❌      |
| Reports                | View all            | ✅            | ❌            | ✅    | ❌      |
| Accreditation          | Manage              | ✅            | ❌            | ✅    | ❌      |
| Calendar               | CRUD (dept events)  | ✅            | ✅            | ✅    | ❌      |
| Settings (own dept)    | Edit                | ✅            | ❌            | ✅    | ❌      |

---

## 11. State Management

### Redux Slice

```typescript
interface DeptHeadState {
  departmentId: string | null;
  dashboard: {
    data: DeptDashboardResponse | null;
    loading: boolean;
    error: string | null;
  };
  curriculum: {
    programs: ProgramCurriculumSummary[];
    selectedProgramId: string | null;
    currentVersion: ProgramVersion | null;
    loading: boolean;
    saving: boolean;
    publishLoading: boolean;
    error: string | null;
  };
  instructors: {
    list: DeptInstructorSummary[];
    selectedInstructor: InstructorFullProfileResponse | null;
    loading: boolean;
    error: string | null;
    filter: string;
    search: string;
  };
  quality: {
    observations: QAObservationFull[];
    evaluations: CourseEvaluationSummary[];
    loading: boolean;
    saving: boolean;
    error: string | null;
  };
  approvals: {
    pending: ApprovalRequestDetail[];
    history: ApprovalRequestDetail[];
    loading: boolean;
    processingId: string | null;
    error: string | null;
  };
  reports: {
    generating: boolean;
    lastReportUrl: string | null;
    error: string | null;
  };
  enrollment: {
    data: EnrollmentResponse | null;
    loading: boolean;
  };
  calendar: {
    events: DeptCalendarEvent[];
    loading: boolean;
  };
  settings: {
    data: DeptSettingsResponse | null;
    saving: boolean;
  };
}
```

### RTK Query Endpoints

```typescript
const deptApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/dept" }),
  tagTypes: [
    "Dashboard",
    "Curriculum",
    "Instructors",
    "QA",
    "Evaluations",
    "Approvals",
    "Reports",
    "Enrollment",
    "Calendar",
    "Settings",
  ],
  endpoints: (builder) => ({
    getDashboard: builder.query<DeptDashboardResponse, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
      pollingInterval: 60000,
    }),
    getCurriculum: builder.query<CurriculumResponse, void>({
      query: () => "/curriculum",
      providesTags: ["Curriculum"],
    }),
    updateProgram: builder.mutation<void, { id: string; data: UpdateProgramCurriculumRequest }>({
      query: ({ id, data }) => ({ url: `/curriculum/programs/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Curriculum"],
    }),
    createVersion: builder.mutation<
      void,
      { programId: string; data: CreateCurriculumVersionRequest }
    >({
      query: ({ programId, data }) => ({
        url: `/curriculum/programs/${programId}/versions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Curriculum"],
    }),
    publishVersion: builder.mutation<void, { programId: string; versionId: string }>({
      query: ({ programId, versionId }) => ({
        url: `/curriculum/programs/${programId}/versions/${versionId}/publish`,
        method: "POST",
      }),
      invalidatesTags: ["Curriculum"],
    }),
    getInstructors: builder.query<InstructorsResponse, string | void>({
      query: (params) => ({ url: "/instructors", params: params ? { status: params } : {} }),
      providesTags: ["Instructors"],
    }),
    getInstructorDetail: builder.query<InstructorFullProfileResponse, string>({
      query: (id) => `/instructors/${id}`,
      providesTags: (result, err, id) => [{ type: "Instructors", id }],
    }),
    getQAObservations: builder.query<QAObservationsResponse, string | void>({
      query: (params) => ({
        url: "/quality/observations",
        params: params ? { status: params } : {},
      }),
      providesTags: ["QA"],
    }),
    createQAObservation: builder.mutation<void, CreateQAObservationRequest>({
      query: (data) => ({ url: "/quality/observations", method: "POST", body: data }),
      invalidatesTags: ["QA", "Dashboard"],
    }),
    completeQAObservation: builder.mutation<
      void,
      { id: string; data: CompleteQAObservationRequest }
    >({
      query: ({ id, data }) => ({ url: `/quality/observations/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["QA", "Dashboard", "Instructors"],
    }),
    getEvaluations: builder.query<CourseEvaluationSummary[], string | void>({
      query: (params) => ({ url: "/quality/evaluations", params: params ? { term: params } : {} }),
      providesTags: ["Evaluations"],
    }),
    getApprovals: builder.query<ApprovalsResponse, string | void>({
      query: (params) => ({ url: "/approvals", params: params ? { status: params } : {} }),
      providesTags: ["Approvals"],
      pollingInterval: 30000,
    }),
    approveRequest: builder.mutation<void, { id: string; data: ApproveRequest }>({
      query: ({ id, data }) => ({ url: `/approvals/${id}/approve`, method: "POST", body: data }),
      invalidatesTags: ["Approvals", "Dashboard"],
    }),
    rejectRequest: builder.mutation<void, { id: string; data: RejectRequest }>({
      query: ({ id, data }) => ({ url: `/approvals/${id}/reject`, method: "POST", body: data }),
      invalidatesTags: ["Approvals"],
    }),
    generateReport: builder.mutation<{ reportUrl: string }, GenerateDepartmentReportRequest>({
      query: (data) => ({ url: "/reports/generate", method: "POST", body: data }),
      invalidatesTags: ["Reports"],
    }),
    getEnrollment: builder.query<EnrollmentResponse, void>({
      query: () => "/enrollment",
      providesTags: ["Enrollment"],
    }),
    getCalendar: builder.query<DeptCalendarEvent[], { start: string; end: string }>({
      query: ({ start, end }) => `/calendar?start=${start}&end=${end}`,
      providesTags: ["Calendar"],
    }),
    createEvent: builder.mutation<void, Partial<DeptCalendarEvent>>({
      query: (data) => ({ url: "/calendar", method: "POST", body: data }),
      invalidatesTags: ["Calendar"],
    }),
    getSettings: builder.query<DeptSettingsResponse, void>({
      query: () => "/settings",
      providesTags: ["Settings"],
    }),
    updateSettings: builder.mutation<void, Partial<DeptSettingsResponse>>({
      query: (body) => ({ url: "/settings", method: "PUT", body }),
      invalidatesTags: ["Settings"],
    }),
  }),
});
```

---

## 12. Form Schemas (Zod)

### Program Curriculum

```typescript
export const ProgramSettingsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  description: z.string().min(10).max(10000),
  category: z.string().min(1),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  credits: z.number().int().min(1).max(60),
  durationWeeks: z.number().int().min(4).max(104),
  format: z.enum(["online", "in_person", "hybrid"]),
  learningOutcomes: z
    .array(z.string().min(5).max(500))
    .min(1, "At least 1 outcome required")
    .max(20),
  accreditationMapping: z.record(z.string(), z.array(z.string())).optional(),
});

export const CurriculumVersionSchema = z.object({
  version: z.string().regex(/^\d+\.\d+$/, "Format: major.minor (e.g., 3.2)"),
  changeLog: z.string().min(10, "Describe the changes made").max(5000),
  learningOutcomes: z.array(z.string().min(5)).max(20).optional(),
  accreditationMapping: z.record(z.string(), z.array(z.string())).optional(),
});
```

### QA Observation

```typescript
export const QAScheduleSchema = z.object({
  instructorId: z.string().uuid("Select an instructor"),
  courseId: z.string().uuid("Select a course"),
  observationType: z.enum(["scheduled", "random", "peer"]),
  scheduledDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
});

export const QACompleteSchema = z.object({
  score: z.number().int().min(0).max(100),
  scoresDetail: z.object({
    contentDelivery: z.number().int().min(0).max(100),
    engagement: z.number().int().min(0).max(100),
    assessment: z.number().int().min(0).max(100),
    communication: z.number().int().min(0).max(100),
    classroomManagement: z.number().int().min(0).max(100),
  }),
  strengths: z.string().min(10, "Describe at least one strength").max(2000),
  areasForImprovement: z.string().min(10, "Describe areas for improvement").max(2000),
  actionItems: z
    .array(
      z.object({
        text: z.string().min(1).max(500),
      }),
    )
    .max(10)
    .optional(),
});
```

### Approval Decision

```typescript
export const ApproveRequestSchema = z.object({
  notes: z.string().max(2000).optional(),
});

export const RejectRequestSchema = z.object({
  reason: z.string().min(10, "Please provide a reason for rejection").max(5000),
});
```

### Improvement Plan

```typescript
export const ImprovementPlanSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10).max(5000),
  scopeType: z.enum(["course", "program", "instructor", "process"]),
  scopeId: z.string().uuid(),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  targetDate: z.string().datetime().optional(),
  actionSteps: z
    .array(
      z.object({
        text: z.string().min(1).max(500),
        assignee: z.string().uuid().optional(),
        dueDate: z.string().datetime().optional(),
      }),
    )
    .min(1)
    .max(20),
});
```

### Custom Report

```typescript
export const GenerateReportSchema = z.object({
  type: z.enum([
    "monthly_performance",
    "instructor_summary",
    "program_outcomes",
    "accreditation_readiness",
    "budget_vs_actual",
    "custom",
  ]),
  format: z.enum(["pdf", "csv"]).default("pdf"),
  parameters: z
    .object({
      startDate: z.string().datetime().optional(),
      endDate: z.string().datetime().optional(),
      includeCharts: z.boolean().default(true),
      sectionIds: z.array(z.string()).optional(),
    })
    .optional(),
});
```

### Capacity Setting

```typescript
export const CapacitySettingSchema = z.object({
  programId: z.string().uuid(),
  capacity: z.number().int().min(1).max(1000),
  reason: z.string().min(10).optional(),
});
```

---

## 13. Analytics Events

| Event                             | Properties                                | Trigger                   |
| --------------------------------- | ----------------------------------------- | ------------------------- |
| `dept_dashboard_view`             | `departmentId`, `metricsCount`            | Dashboard loaded          |
| `dept_curriculum_view`            | `programId`, `versionCount`               | Curriculum page loaded    |
| `dept_curriculum_edit`            | `programId`, `fieldChanged`               | Curriculum setting edited |
| `dept_curriculum_version_created` | `programId`, `version`, `courseChanges`   | Version created           |
| `dept_curriculum_published`       | `programId`, `version`, `changeLogLength` | Version published         |
| `dept_curriculum_rolled_back`     | `programId`, `fromVersion`, `toVersion`   | Rollback performed        |
| `dept_instructor_list_view`       | `filter`, `resultCount`                   | Instructor list loaded    |
| `dept_instructor_detail_view`     | `instructorId`                            | Instructor profile opened |
| `dept_instructor_assigned`        | `instructorId`, `courseId`                | Course assignment changed |
| `dept_qa_scheduled`               | `instructorId`, `type`                    | QA observation scheduled  |
| `dept_qa_completed`               | `instructorId`, `score`                   | QA observation completed  |
| `dept_qa_overdue_view`            | `overdueCount`                            | Overdue QA viewed         |
| `dept_evaluation_view`            | `courseId`, `term`, `overallScore`        | Evaluation results opened |
| `dept_improvement_plan_created`   | `scopeType`, `priority`                   | Plan created              |
| `dept_improvement_plan_updated`   | `planId`, `newProgress`                   | Progress updated          |
| `dept_approval_view`              | `pendingCount`, `urgentCount`             | Approvals page loaded     |
| `dept_approval_approved`          | `requestType`, `daysToDecide`             | Request approved          |
| `dept_approval_rejected`          | `requestType`                             | Request rejected          |
| `dept_report_generated`           | `type`, `format`, `sectionsCount`         | Report generated          |
| `dept_report_scheduled`           | `type`, `frequency`                       | Report schedule set       |
| `dept_enrollment_view`            | `programCount`, `totalEnrolled`           | Enrollment page loaded    |
| `dept_capacity_updated`           | `programId`, `oldCapacity`, `newCapacity` | Capacity changed          |
| `dept_calendar_event_created`     | `eventType`                               | Event created             |
| `dept_settings_updated`           | `section`                                 | Settings saved            |
| `dept_accreditation_review`       | `standard`, `coveragePct`                 | Accreditation check run   |

---

## 14. Accessibility Requirements

**Global:**

- `role="navigation"` on department sidebar, `aria-label="Department navigation"`
- Skip-to-main-content link at top
- All metric cards in dashboard: `role="group"`, `aria-label="{{metric}}: {{value}}, trend {{trend}}"`
- Data tables: `<caption>`, `<th scope="col">`, `<th scope="row">` for first column
- Approval cards: `role="article"`, `aria-label="Approval: {{title}}, status {{status}}"`
- Color-coded statuses with text labels (not just color)

**Key Components:**

- CourseTable: `aria-label="Course listing for {{program}}"`, each row `aria-label="Course {{order}}: {{title}}, {{credits}} credits, {{status}}"`
- VersionTimeline: `role="list"`, each version `aria-label="Version {{version}}, published {{date}}, by {{author}}"`
- InstructorTable: `aria-label="Instructor roster"`, sorting announced by `aria-sort`
- QAObservationForm: Score sliders with `aria-label="{{criterion}} score, current {{value}} out of 100"`
- ApprovalCard: `aria-expanded="true/false"` for expandable details
- ReportViewer: PDF viewer with `aria-label="Report: {{title}}"`, download button `aria-label="Download {{format}}"`
- EnrollmentChart: `role="img"`, `aria-label="Enrollment trend chart"`, data table fallback
- CalendarEvents: `aria-label="Event: {{title}}, {{start}} to {{end}}, {{location}}"`, events keyboard navigable
- BudgetTable: `aria-label="Budget line items for {{fiscalYear}}"`, each row has cell-specific labels
- Curriculum Editor: Form fields `aria-describedby` for validation hints

---

## 15. Error & Edge Case Catalog

| #   | Scenario                          | User Message                                                             | Recovery                                     |
| --- | --------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------- |
| E1  | Dashboard fails to load           | "Unable to load department overview. [Retry]"                            | Retry with backoff, show cached snapshot     |
| E2  | Curriculum not found              | "Program not found."                                                     | Back to curriculum list                      |
| E3  | Version publish fails             | "Failed to publish curriculum version. [Retry]"                          | Check for incomplete data, retry             |
| E4  | Curriculum rollback conflict      | "Cannot rollback: newer version has active enrollments."                 | Must create new version instead              |
| E5  | QA observation schedule conflict  | "Instructor already has an observation scheduled on this date."          | Show existing, suggest alternative           |
| E6  | QA observation overdue escalation | "This observation is 14+ days overdue. Escalated to dean."               | Auto-escalate, notify admin                  |
| E7  | Instructor list empty             | "No instructors found matching your filter."                             | Clear filter or add instructor               |
| E8  | Approval already processed        | "This request was already {{decision}} by {{user}} on {{date}}."         | Show current status                          |
| E9  | Budget exceeds limit              | "Total budget allocation exceeds available funds by ${{amount}}."        | Reduce allocations                           |
| E10 | Report generation times out       | "Report generation is taking longer. We'll email it when ready."         | Background job → email notification          |
| E11 | Report data insufficient          | "Not enough data to generate this report for the selected period."       | Extend date range                            |
| E12 | Enrollment data unavailable       | "Enrollment data is being synced. Check back shortly."                   | Retry in 5 minutes                           |
| E13 | Capacity change blocked           | "Cannot reduce capacity below current enrollment ({{count}})."           | Increase or waitlist students                |
| E14 | Accreditation mapping incomplete  | "Some standards are not mapped to any course. Coverage: {{pct}}%"        | Add course mappings                          |
| E15 | Instructor assignment conflict    | "{{instructor}} is already assigned to {{course}} this term."            | Change role or reassign                      |
| E16 | Budget approval exception         | "This request exceeds your approval limit ($50,000). Forward to dean?"   | Forward with recommendation                  |
| E17 | Calendar event overlap            | "An event already exists at this time."                                  | Show overlapping events                      |
| E18 | Multiple departments role         | Dept head manages >1 department                                          | Department switcher shows combined alerts    |
| E19 | Instructor on leave               | Cannot schedule QA for instructor on leave                               | Status shows "On Leave", scheduling disabled |
| E20 | Evaluation low response           | "Course evaluation response rate is low ({{pct}}%). Consider extending." | Auto-extend by 1 week if < 50%               |
| E21 | Improvement plan overdue          | "Improvement plan target date has passed ({{days}} days overdue)."       | Escalate, auto-reminder weekly               |
| E22 | Session timeout during approval   | Session expires while reviewing approval                                 | Save draft decision, restore on relogin      |
| E23 | Concurrent approval conflict      | "{{user}} approved this request while you were reviewing."               | Reload, show updated status                  |
| E24 | Fiscal year closed                | "Budget changes cannot be made: fiscal year {{year}} is closed."         | Wait for next fiscal year or admin override  |

---

_End of Department Head Actor Plan — 06_
