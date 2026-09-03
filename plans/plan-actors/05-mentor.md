# Actor: Mentor

## 1. Identity & Role Definition

**Actor Name:** Mentor  
**System Role ID:** `role_mentor`  
**Description:** A career mentor who guides students through professional development, career planning, job placement preparation, networking, and goal setting. Mentors are industry professionals, alumni, or dedicated career coaches who work one-on-one or in small groups with students to bridge the gap between academic learning and industry readiness.

**Mentor Types:**

1. **Career Mentor** — Industry professional focused on job readiness, resume review, interview prep, networking
2. **Academic Mentor** — Provides supplemental academic support, study strategies, course selection advice
3. **Peer Mentor** — Senior student or recent graduate helping new students navigate the program
4. **Alumni Mentor** — Graduate of the academy giving back through career guidance
5. **Industry Mentor** — External professional from partner company providing industry insights

**Mentor States:**

1. **Pending Onboarding** — Profile created, background check pending
2. **Active** — Available for student assignments
3. **At Capacity** — Max mentee load reached
4. **On Break** — Temporarily unavailable
5. **Inactive** — No longer mentoring

**Mentorship Relationship States:**

1. **Requested** — Student requested, pending mentor approval
2. **Active** — Mentor-student relationship active
3. **Paused** — Temporary hiatus
4. **Completed** — Goals achieved, relationship ended successfully
5. **Terminated** — Ended early by either party or admin

---

## 2. Primary Goals & Success KPIs

**Goal 1: Guide Student Career Development**

- KPI: Mentee career readiness score improvement â‰¥ 30% over relationship
- KPI: Mentee portfolio completion rate â‰¥ 85%
- KPI: Mentee resume quality score â‰¥ 4/5 post-review

**Goal 2: Facilitate Job Placement**

- KPI: Mentee interview rate within 3 months of graduation â‰¥ 60%
- KPI: Mentee job offer rate within 6 months of graduation â‰¥ 75%
- KPI: Average time from graduation to job offer â‰¤ 90 days

**Goal 3: Track Progress & Goals**

- KPI: Goal completion rate per mentee â‰¥ 70%
- KPI: Session attendance rate â‰¥ 90%
- KPI: Mentee satisfaction score â‰¥ 4.5/5 per session

**Goal 4: Maintain Quality Engagement**

- KPI: Avg session duration â‰¥ 30 min
- KPI: Response time to mentee messages â‰¤ 24 hours
- KPI: Session frequency â‰¥ 2x per month per active mentee

**Goal 5: Build Professional Network**

- KPI: Industry connections shared per month â‰¥ 5
- KPI: Guest speaker sessions hosted per quarter â‰¥ 1
- KPI: Company partnerships initiated per term â‰¥ 2

---

## 3. Complete Screen Inventory

### Screen 3.1: Mentor Dashboard (`/mentor/dashboard`)

**Purpose:** Central hub — upcoming sessions, mentee overview, pending requests, recent activity.

**Wireframe Layout:**

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Mentor Hub                                                  [Profile]â”‚
â”‚  Welcome, Sarah Chen — Career Mentor                        [Settings]â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  My Mentees (8)  â”‚  Upcoming Sessions   â”‚  Pending Requests (2)     â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”‚
â”‚  â”‚ Alex       â”‚  â”‚  â”‚ Today 3PM      â”‚  â”‚  â”‚ ðŸ‘¤ Mike Brown     â”‚   â”‚
â”‚  â”‚ Johnson    â”‚  â”‚  â”‚ Alex Johnson   â”‚  â”‚  â”‚ "Looking for help â”‚   â”‚
â”‚  â”‚ CS: 78% â–¶ â”‚  â”‚  â”‚ Career roadmap  â”‚  â”‚  â”‚  with resume"     â”‚   â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚  â”‚ [Join →]       â”‚  â”‚  â”‚ [Accept][Decline] â”‚   â”‚
â”‚  â”‚ Jane Doe   â”‚  â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤   â”‚
â”‚  â”‚ CS: 62% âš  â”‚  â”‚  â”‚ Tomorrow 10AM  â”‚  â”‚  â”‚ ðŸ‘¤ Lisa Park      â”‚   â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚  â”‚ Jane Doe       â”‚  â”‚  â”‚ "Interview prep   â”‚   â”‚
â”‚  â”‚ John Smith â”‚  â”‚  â”‚ Mock interview  â”‚  â”‚  â”‚  for Google"      â”‚   â”‚
â”‚  â”‚ CS: 91% â˜… â”‚  â”‚  â”‚ [Prepare →]    â”‚  â”‚  â”‚ [Accept][Decline] â”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â”‚  [View All →]    â”‚  [View Calendar →]  â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Quick Stats                                                           â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ Active   â”‚ Sessions â”‚ Avg      â”‚ Resume   â”‚ Interviewâ”‚ Job      â”‚  â”‚
â”‚  â”‚ Mentees  â”‚ This Mo  â”‚ Rating   â”‚ Reviews  â”‚ Preps    â”‚ Placementsâ”‚  â”‚
â”‚  â”‚ 8        â”‚ 24       â”‚ 4.8/5    â”‚ 12       â”‚ 6        â”‚ 3        â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Recent Activity                                                        â”‚
â”‚  â— Reviewed Alex's resume — 2h ago                                   â”‚
â”‚  â— Completed session with Jane Doe — Yesterday                        â”‚
â”‚  â— Sent career resources to John Smith — Yesterday                    â”‚
â”‚  â— Approved mentorship request from Mike Brown — 2 days ago           â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Data Sources:**

- `GET /api/mentor/dashboard` — aggregated dashboard data
- `GET /api/mentor/mentees` — mentee list with readiness scores
- `GET /api/mentor/sessions?upcoming=true` — upcoming sessions
- `GET /api/mentor/requests/pending` — pending mentorship requests

**States:**

- **Loading:** 6 skeleton cards in grid layout
- **Empty (no mentees):** "You haven't been assigned any mentees yet. [Browse Available Students →]"
- **Empty (no requests):** "No pending mentorship requests."
- **Empty (no sessions):** "No upcoming sessions. [Schedule a Session →]"
- **Error:** Dashboard fails → inline error per card, rest renders
- **Edge Cases:** Mentor at capacity → banner "You've reached your maximum mentee load (10)."
- **New mentor:** Welcome wizard prompt on first login

### Screen 3.2: Mentee Overview (`/mentor/mentees/[id]`)

**Purpose:** Comprehensive view of a single mentee's profile, progress, goals, and history.

**Wireframe Layout:**

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  â† Back to My Mentees                                                â”‚
â”‚  Mentee Profile: Alex Johnson                          [Actions â–¼]  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Profile Card                                                          â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”â”‚
â”‚  â”‚ [Avatar] Alex Johnson — Cybersecurity Fundamentals              â”‚â”‚
â”‚  â”‚ Student #: CEA-STU-2026-00421 | Term: Fall 2026                â”‚â”‚
â”‚  â”‚ Program Progress: 65% | GPA: 3.72                              â”‚â”‚
â”‚  â”‚ Career Goal: "Security Engineer at a FAANG company"            â”‚â”‚
â”‚  â”‚ Relationship: Active since Sep 1, 2026 (89 days)               â”‚â”‚
â”‚  â”‚ [Edit Notes]  [End Mentorship]  [Flag Concern]                 â”‚â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Career Readiness Score  â”‚  Goals Progress                            â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ Overall: 78%       â”‚  â”‚  â”‚ ðŸŽ¯ Complete certification          â”‚  â”‚
â”‚  â”‚  ðŸ”´ Resume: 65%   â”‚  â”‚  â”‚   85% â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–‘â–‘â–‘ [Update]     â”‚  â”‚
â”‚  â”‚  ðŸŸ¡ Portfolio: 70%â”‚  â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚
â”‚  â”‚  ðŸŸ¢ Linkedin: 90% â”‚  â”‚  â”‚ ðŸŽ¯ Apply to 5 internships          â”‚  â”‚
â”‚  â”‚  ðŸŸ¡ Skills: 75%   â”‚  â”‚  â”‚   40% â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘ [Update]       â”‚  â”‚
â”‚  â”‚  ðŸ”´ Networking: 50%â”‚  â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚
â”‚  â”‚  [View Breakdown] â”‚  â”‚  â”‚ ðŸŽ¯ Build network of 10 connections  â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚  â”‚   20% â–ˆâ–ˆâ–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘ [Update]         â”‚  â”‚
â”‚                          â”‚  â”‚                                     â”‚  â”‚
â”‚                          â”‚  â”‚  [Add Goal]  [View All Goals →]    â”‚  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Session History                                                        â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ Date      â”‚ Type      â”‚ Duration â”‚ Rating â”‚ Topics            â”‚  â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚
â”‚  â”‚ Oct 30    â”‚ Career    â”‚ 45 min   â”‚ 5/5    â”‚ Resume review     â”‚  â”‚
â”‚  â”‚           â”‚ Roadmap   â”‚          â”‚        â”‚                   â”‚  â”‚
â”‚  â”‚ Oct 20    â”‚ Mock      â”‚ 60 min   â”‚ 5/5    â”‚ Technical q's    â”‚  â”‚
â”‚  â”‚           â”‚ Interview â”‚          â”‚        â”‚                   â”‚  â”‚
â”‚  â”‚ Oct 10    â”‚ Goal      â”‚ 30 min   â”‚ 4/5    â”‚ Set career goals  â”‚  â”‚
â”‚  â”‚           â”‚ Setting   â”‚          â”‚        â”‚                   â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚  [Schedule Session]  [View Notes]  [Export Report]                     â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**API:** `GET /api/mentor/mentees/:id` — full mentee profile with readiness, goals, sessions

**Sub-tabs:** Overview | Goals | Sessions | Portfolio | Career Track | Messages | Notes

**States:**

- **Loading:** Profile card skeleton + 2 column skeleton
- **Error (404):** "Mentee not found or no longer in your roster."
- **Error (network):** "Failed to load mentee data. [Retry]"
- **Edge Cases:** Mentee on leave → banner "Mentee is currently on academic leave until [date]"
- Mentorship ended → archived view, read-only

### Screen 3.3: Session Hub (`/mentor/sessions` and `/mentor/sessions/[id]`)

**Purpose:** Schedule, manage, and conduct mentorship sessions (in-person or virtual).

**Wireframe Layout (List View):**

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Session Hub                                             [+ New]    â”‚
â”‚  [Upcoming] [Past] [Cancelled] [All]                               â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Today — Nov 1, 2026                                                  â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ â° 3:00 PM — Alex Johnson — Career Roadmap (45 min)       â”‚  â”‚
â”‚  â”‚ ðŸ“ Virtual: [Zoom Link]  [Join]  [Reschedule]  [Cancel]   â”‚  â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚
â”‚  â”‚ ðŸ“ Prep notes: "Review Alex's updated resume, discuss      â”‚  â”‚
â”‚  â”‚    security engineering career path, identify target        â”‚  â”‚
â”‚  â”‚    companies"                                               â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚                                                                       â”‚
â”‚  Tomorrow — Nov 2, 2026                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ â° 10:00 AM — Jane Doe — Mock Interview (60 min)          â”‚  â”‚
â”‚  â”‚ ðŸ“ In-person: Room 204                                      â”‚  â”‚
â”‚  â”‚ [Prepare] [Reschedule] [Cancel]                              â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚                                                                       â”‚
â”‚  Nov 5, 2026                                                          â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ â° 2:00 PM — John Smith — Portfolio Review (30 min)        â”‚  â”‚
â”‚  â”‚ ðŸ“ Virtual: [Zoom Link]                                      â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Wireframe Layout (Session Detail / In-Session):**

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  â† Back to Sessions                                                  â”‚
â”‚  Session with Alex Johnson                              [End Session]â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Session Info                                                          â”‚
â”‚  Type: Career Roadmap | Duration: 45 min | Started: 3:02 PM         â”‚
â”‚  Timer: 00:38:12 remaining                                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Agenda & Notes                                                        â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ â–¡ 1. Review updated resume (5 min)                          â”‚  â”‚
â”‚  â”‚ â–¡ 2. Discuss security engineering career path (15 min)      â”‚  â”‚
â”‚  â”‚ â–¡ 3. Identify target companies (10 min)                     â”‚  â”‚
â”‚  â”‚ â–¡ 4. Set next steps & action items (10 min)                  â”‚  â”‚
â”‚  â”‚ â–¡ 5. Q&A (5 min)                                            â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚                                                                       â”‚
â”‚  Live Notes:                                                           â”‚
â”‚  [Alex wants to focus on cloud security roles. Target               â”‚
â”‚   companies: AWS, Google Cloud, Microsoft. Need to                 â”‚
â”‚   identify relevant certifications (CCSP, AWS Security)            â”‚
â”‚  ]                                                                  â”‚
â”‚                                                                       â”‚
â”‚  Action Items:                                                         â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ âž• [Add Action Item]                                        â”‚  â”‚
â”‚  â”‚ â–¡ Alex: Research AWS Security cert requirements [Due: Nov 8]â”‚  â”‚
â”‚  â”‚ â–¡ Mentor: Send list of cloud security job postings          â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Session Feedback (post-session)                                      â”‚
â”‚  Mentee rating: [â­â­â­â­â­]   Notes: [____________________]          â”‚
â”‚  Topics covered: [Resume] [Career Path] [Certifications] [Gol...]   â”‚
â”‚  [Save Session Notes]  [End Session]                                  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**API:** `GET /api/mentor/sessions`, `POST /api/mentor/sessions`, `PUT /api/mentor/sessions/:id`, `POST /api/mentor/sessions/:id/complete`

**Session Types:** career_roadmap, mock_interview, resume_review, portfolio_review, goal_setting, networking_strategy, skills_assessment, general_mentorship

**States:**

- **Loading (list):** 3 session card skeletons
- **Empty (upcoming):** "No upcoming sessions. [Schedule One Now →]"
- **Empty (past):** "No past sessions yet."
- **In-session:** Active timer, green live indicator
- **Completed:** Feedback form, summary view
- **Cancelled:** Greyed out with cancellation reason
- **Error:** Session load fails → inline error

### Screen 3.4: Portfolio Reviewer (`/mentor/mentees/[id]/portfolio`)

**Purpose:** Review and provide feedback on a mentee's portfolio — projects, skills, certifications, experience.

**Wireframe Layout:**

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  â† Alex Johnson — Portfolio                                         â”‚
â”‚  Portfolio Review                                        [Export]    â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Public URL: cea.ng/portfolio/alex-johnson                     â”‚
â”‚  Overall Score: 70%  ðŸ”¶ Needs improvement                          â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Sections Feedback                                                     â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ Profile Section                                          âœ… â”‚  â”‚
â”‚  â”‚ Bio: "Cybersecurity student..." — Good, add more specifics â”‚  â”‚
â”‚  â”‚ Avatar: âœ“ | Contact: âœ“ | Social Links: âœ“                  â”‚  â”‚
â”‚  â”‚ [Approve] [Request Changes] [Add Comment]                  â”‚  â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚
â”‚  â”‚ Skills Section                                          âš  â”‚  â”‚
â”‚  â”‚ ðŸ›¡ Network Security — â­â­â­â­  (Validated: Yes)              â”‚  â”‚
â”‚  â”‚ ðŸ” Cryptography — â­â­â­  (Validated: Course completed)       â”‚  â”‚
â”‚  â”‚ ðŸ Python — â­â­â­  (Validated: No)                          â”‚  â”‚
â”‚  â”‚ [Suggest Skill Additions]  [Validate Skills]                â”‚  â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚
â”‚  â”‚ Projects Section                                        âš  â”‚  â”‚
â”‚  â”‚ ðŸ”’ Security Audit: ABC Corp — 80% complete, needs media    â”‚  â”‚
â”‚  â”‚      Comment: "Great project! Add screenshots of findings" â”‚  â”‚
â”‚  â”‚ ðŸ”¬ Malware Analysis Lab — 60% complete, needs description â”‚  â”‚
â”‚  â”‚ [Approve] [Request Changes]                                   â”‚  â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚
â”‚  â”‚ Certifications Section                                   âœ… â”‚  â”‚
â”‚  â”‚ ðŸ† Python for Cybersecurity — Verified âœ“                    â”‚  â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚
â”‚  â”‚ Education & Experience                                  ðŸ”¶ â”‚  â”‚
â”‚  â”‚ Missing work experience — suggest adding internships        â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚                                                                       â”‚
â”‚  [Submit Overall Feedback]  [Mark as Reviewed]  [Share with Mentee] â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**API:** `GET /api/mentor/mentees/:id/portfolio`, `POST /api/mentor/mentees/:id/portfolio/feedback`, `POST /api/mentor/mentees/:id/portfolio/approve`

**States:**

- **Loading:** Section skeleton with 4 placeholder cards
- **Empty (no portfolio):** "This mentee hasn't started building their portfolio yet. [Encourage them to start]"
- **Already reviewed:** "Portfolio last reviewed on Oct 25, 2026. [View Previous Feedback] [Review Again]"
- **Error:** "Unable to load portfolio. [Retry]"

### Screen 3.5: Career Tracking (`/mentor/mentees/[id]/career` and `/mentor/career-tracking`)

**Purpose:** Track career milestones — job applications, interviews, offers, placements.

**Wireframe Layout:**

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  â† Alex Johnson — Career Track                                      â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Career Goal: Security Engineer at FAANG company                    â”‚
â”‚  Target Timeline: Graduation + 3 months                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Job Search Pipeline                                                   â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ Applied (5)     â”‚ Interview (2) â”‚ Offer (0)   â”‚ Rejected (1)â”‚  â”‚
â”‚  â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚  â”‚
â”‚  â”‚ â”‚ AWS         â”‚ â”‚ â”‚ Google   â”‚  â”‚ â”‚         â”‚ â”‚ â”‚ Meta    â”‚ â”‚  â”‚
â”‚  â”‚ â”‚ Security    â”‚ â”‚ â”‚ Security â”‚  â”‚ â”‚         â”‚ â”‚ â”‚ (Ghosted)â”‚ â”‚  â”‚
â”‚  â”‚ â”‚ Engineer    â”‚ â”‚ â”‚ Engineer â”‚  â”‚ â”‚         â”‚ â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚  â”‚
â”‚  â”‚ â”‚ Applied:10/1â”‚ â”‚ â”‚ Stage:   â”‚  â”‚ â”‚         â”‚ â”‚             â”‚ â”‚  â”‚
â”‚  â”‚ â”‚ [Update]    â”‚ â”‚ â”‚ Phone    â”‚  â”‚ â”‚         â”‚ â”‚             â”‚ â”‚  â”‚
â”‚  â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚             â”‚ â”‚  â”‚
â”‚  â”‚ â”‚ Microsoft   â”‚ â”‚ â”‚ Cloud    â”‚  â”‚ â”‚         â”‚ â”‚             â”‚ â”‚  â”‚
â”‚  â”‚ â”‚ Security    â”‚ â”‚ â”‚flare Inc â”‚  â”‚ â”‚         â”‚ â”‚             â”‚ â”‚  â”‚
â”‚  â”‚ â”‚ [Update]    â”‚ â”‚ â”‚ Stage:   â”‚  â”‚ â”‚         â”‚ â”‚             â”‚ â”‚  â”‚
â”‚  â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ â”‚ Tech    â”‚  â”‚ â”‚         â”‚ â”‚             â”‚ â”‚  â”‚
â”‚  â”‚                 â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚             â”‚ â”‚  â”‚
â”‚  â”‚ [Add Application]  [Add Interview] [Add Offer]â”‚             â”‚ â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Skills Gap Analysis                                                    â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ Required for Security Engineer vs Current                    â”‚  â”‚
â”‚  â”‚ â— Cloud Security (AWS/GCP)        â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–‘â–‘â–‘â–‘ 80% — Good  â”‚  â”‚
â”‚  â”‚ â— Incident Response               â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–‘â–‘â–‘â–‘â–‘â–‘ 60% — Needs â”‚  â”‚
â”‚  â”‚ â— Compliance Frameworks           â–ˆâ–ˆâ–ˆâ–ˆâ–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘ 40% — Weak  â”‚  â”‚
â”‚  â”‚ â— Scripting (Python/Bash)         â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ 95% — Strongâ”‚  â”‚
â”‚  â”‚ [Recommend Resources to Fill Gaps]                           â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Career Milestones                                                     â”‚
â”‚  âœ… Resume approved by mentor — Oct 15                               â”‚
â”‚  âœ… LinkedIn profile optimized — Oct 20                             â”‚
â”‚  ðŸ”„ Applied to 10+ positions — 5/10 (in progress)                   â”‚
â”‚  â¬œ Completed 5 mock interviews — 2/5                                â”‚
â”‚  [Add Milestone]  [Mark Complete]                                     â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**API:** `GET /api/mentor/mentees/:id/career`, `POST /api/mentor/mentees/:id/career/applications`, `PUT /api/mentor/mentees/:id/career/applications/:appId`

**States:**

- **Loading:** Pipeline kanban skeleton, skills chart skeleton
- **Empty (no career data):** "Start tracking Alex's job search journey. [Add First Application]"
- **No goal set:** "Career goal not yet defined. [Set Career Goal with Mentee]"

### Screen 3.6: Goal Management (`/mentor/mentees/[id]/goals` and `/mentor/goals`)

**Purpose:** Create, track, and update SMART goals for each mentee.

**Wireframe Layout:**

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  â† Alex Johnson — Goals                                             â”‚
â”‚                                       [New Goal]  [View All Goals]  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Active Goals                                                          â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ ðŸŽ¯ Complete CompTIA Security+ certification                  â”‚  â”‚
â”‚  â”‚ ðŸ“… Target: Dec 31, 2026 | Status: ðŸ”„ In Progress            â”‚  â”‚
â”‚  â”‚ Progress: 85% â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–‘â–‘                                  â”‚  â”‚
â”‚  â”‚ Milestones:                                                  â”‚  â”‚
â”‚  â”‚  âœ… Passed practice test 1 (85%) — Oct 15                    â”‚  â”‚
â”‚  â”‚  âœ… Completed study guide — Oct 28                           â”‚  â”‚
â”‚  â”‚  ðŸ”„ Final review — 2 weeks remaining                        â”‚  â”‚
â”‚  â”‚ [Update Progress] [Add Milestone] [Mark Complete] [Edit]     â”‚  â”‚
â”‚  â”‚ Mentor notes: "Alex is on track. Recommending additional     â”‚  â”‚
â”‚  â”‚   practice exams from MeasureUp."                            â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ ðŸŽ¯ Apply to 5 cybersecurity internships                     â”‚  â”‚
â”‚  â”‚ ðŸ“… Target: Nov 30, 2026 | Status: ðŸ”„ In Progress            â”‚  â”‚
â”‚  â”‚ Progress: 40% â–ˆâ–ˆâ–ˆâ–ˆâ–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘                                   â”‚  â”‚
â”‚  â”‚ â–¡ 1. AWS Security Intern — Applied âœ“                        â”‚  â”‚
â”‚  â”‚ â–¡ 2. Google Security Intern — Applied âœ“                    â”‚  â”‚
â”‚  â”‚ â–¡ 3. Microsoft Security Intern — Drafting                    â”‚  â”‚
â”‚  â”‚ â–¡ 4. Cloudflare — Researching                                â”‚  â”‚
â”‚  â”‚ â–¡ 5. Palo Alto Networks — Researching                        â”‚  â”‚
â”‚  â”‚ [Update Progress] [Add Milestone]                             â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Completed Goals                                                       â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ âœ… Build LinkedIn profile with all sections filled           â”‚  â”‚
â”‚  â”‚   Completed: Oct 20, 2026                                    â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Goal Categories:** certification, job_application, networking, skill_development, portfolio, resume, interview_prep, personal_development

**API:** `GET /api/mentor/mentees/:id/goals`, `POST /api/mentor/goals`, `PUT /api/mentor/goals/:id`, `POST /api/mentor/goals/:id/progress`

**States:**

- **Loading:** Goal card skeletons (2-3)
- **Empty:** "No goals set yet. [Create first goal →]"
- **All completed:** "All goals achieved! ðŸŽ‰ [Celebrate] [Set new goals →]"
- **Error:** "Could not load goals. [Retry]"

### Screen 3.7: Messaging (`/mentor/messages`)

**Purpose:** Communicate with mentees, share resources, send reminders.

**Wireframe Layout:**

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Messages                                                     [Compose]â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Conversations â”‚  Chat: Alex Johnson                                 â”‚
â”‚  ðŸ” Search     â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                 â”‚  Alex Johnson: Hi Sarah! I updated my resume      â”‚
â”‚  ðŸ“Œ Alex       â”‚  based on your feedback. Can you take a look?     â”‚
â”‚     Johnson  â— â”‚                                                   â”‚
â”‚  ðŸ‘¤ Jane       â”‚  You: Sure! I see the changes. The summary        â”‚
â”‚     Doe        â”‚  section looks much stronger now.                 â”‚
â”‚  ðŸ‘¤ John       â”‚                                                   â”‚
â”‚     Smith      â”‚  You: One suggestion: quantify your impact in     â”‚
â”‚  ðŸ‘¤ Mike       â”‚  the experience section (e.g., "Reduced vuln-    â”‚
â”‚     Brown      â”‚  erabilities by 30%")                              â”‚
â”‚                 â”‚                                                   â”‚
â”‚  âž• New Chat   â”‚  Alex Johnson: Great idea! I'll update that.      â”‚
â”‚                 â”‚                                                   â”‚
â”‚                 â”‚  ðŸ“Ž Shared Resource: resume_template_2026.pdf    â”‚
â”‚                 â”‚                                                   â”‚
â”‚                 â”‚  [Type a message...]                        [ðŸ“Ž→] â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Real-time:** WebSocket for instant messaging  
**Resource Sharing:** Upload PDFs, links, images — stored in R2  
**Templates:** Quick message templates for common scenarios

**API:** `GET /api/mentor/messages` (conversations list), `GET /api/mentor/messages/:conversationId`, `POST /api/mentor/messages/:conversationId`, `POST /api/mentor/messages/new`

**States:**

- **Loading:** Split pane skeleton
- **Empty (no conversations):** "No conversations yet. [Message a Mentee →]"
- **Empty (no messages in thread):** "Start a conversation with Alex."
- **Error:** "Unable to load messages. [Retry]"

### Screen 3.8: Resources Library (`/mentor/resources`)

**Purpose:** Curate and share career resources, templates, articles, job boards, courses.

**Wireframe Layout:**

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Resource Library                                           [+ Add]  â”‚
â”‚  [All] [Resume Templates] [Interview Prep] [Courses] [Job Boards]  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  ðŸ” [Search resources...]                                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  My Shared Resources                                                   â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ ðŸ“„ Resume Template for Cybersecurity Roles                  â”‚  â”‚
â”‚  â”‚ Shared with: Alex J, Jane D, John S | Used: 8 times         â”‚  â”‚
â”‚  â”‚ [Edit] [Share with Mentee â–¼] [Remove]                       â”‚  â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚
â”‚  â”‚ ðŸ”— Top 20 Cybersecurity Job Boards                          â”‚  â”‚
â”‚  â”‚ Shared with: All mentees | Used: 5 times                    â”‚  â”‚
â”‚  â”‚ [Edit] [Share]                                              â”‚  â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚
â”‚  â”‚ ðŸŽ“ AWS Security Certification Study Guide                  â”‚  â”‚
â”‚  â”‚ Shared with: Alex J | Used: 2 times                         â”‚  â”‚
â”‚  â”‚ [Edit] [Share]                                              â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Recommended Resources (from Academy)                                 â”‚
â”‚  â— [Career Readiness Workshop Series — Starts Nov 15]               â”‚
â”‚  â— [Tech Interview Prep Bootcamp — Dec 1-5]                        â”‚
â”‚  â— [Networking Event: Cybersecurity Mixer — Nov 20]                 â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**API:** `GET /api/mentor/resources`, `POST /api/mentor/resources`, `DELETE /api/mentor/resources/:id`

### Screen 3.9: Analytics & Reports (`/mentor/analytics`)

**Purpose:** See aggregate impact metrics, mentee progress trends, session analytics.

**Wireframe Layout:**

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Mentor Impact Analytics                                             â”‚
â”‚  Period: [This Month â–¼] [This Term â–¼] [All Time â–¼]                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Impact Summary                                                       â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”â”‚
â”‚  â”‚ Total    â”‚ Avg      â”‚ Sessions â”‚ Career   â”‚ Resume   â”‚ Job      â”‚â”‚
â”‚  â”‚ Mentees  â”‚ Readinessâ”‚ Conductedâ”‚ Readinessâ”‚ Reviews  â”‚ Placementsâ”‚â”‚
â”‚  â”‚ 8        â”‚ +12%     â”‚ 24       â”‚ +15%     â”‚ 12       â”‚ 3        â”‚â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Readiness Score Trend                                                â”‚
â”‚  [Line chart: Avg readiness score over time across all mentees]     â”‚
â”‚  75% â”¤        â•±â•²                                                     â”‚
â”‚  70% â”¤      â•±â•± â•²â•²                                                   â”‚
â”‚  65% â”¤ â•±â•±â•±â•±    â•²â•²â•²                                                 â”‚
â”‚  60% â”¤â•±           â•²â•²â•²___                                            â”‚
â”‚      â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€                             â”‚
â”‚      Sep 1        Oct 1        Nov 1                                 â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Mentee Breakdown                                                      â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”â”‚
â”‚  â”‚ Mentee     â”‚ Start    â”‚ Current  â”‚ Sessions â”‚ Goals    â”‚ Notes â”‚â”‚
â”‚  â”‚            â”‚ Score    â”‚ Score    â”‚ This Mo  â”‚ Complete â”‚       â”‚â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”¤â”‚
â”‚  â”‚ Alex J     â”‚ 65%      â”‚ 78%      â”‚ 3        â”‚ 2/4      â”‚ â˜…     â”‚â”‚
â”‚  â”‚ Jane D     â”‚ 50%      â”‚ 62%      â”‚ 4        â”‚ 1/3      â”‚ âš     â”‚â”‚
â”‚  â”‚ John S     â”‚ 85%      â”‚ 91%      â”‚ 2        â”‚ 5/5      â”‚ â˜…     â”‚â”‚
â”‚  â”‚ Mike B     â”‚ 40%      â”‚ 55%      â”‚ 2        â”‚ 1/2      â”‚ New  â”‚â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”˜â”‚
â”‚  [Export Report CSV]                                                   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**API:** `GET /api/mentor/analytics`

### Screen 3.10: Availability & Settings (`/mentor/settings`)

**Purpose:** Manage availability schedule, notification preferences, profile settings.

**Wireframe Layout:**

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Settings                                                             â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Profile Section                                                       â”‚
â”‚  [Avatar Upload]  Name: Sarah Chen                                  â”‚
â”‚  Title: [Career Mentor â–¼]                                           â”‚
â”‚  Bio: [Industry professional with 10+ years in cybersecurity...]    â”‚
â”‚  Company: [CyberDefense Inc.]  Job Title: [Security Architect]      â”‚
â”‚  LinkedIn: [https://linkedin.com/in/sarahchen]                      â”‚
â”‚  Expertise Tags: [Cloud Security] [Pen Testing] [Compliance] [×]   â”‚
â”‚  [Add Tag]                                                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Availability Schedule                                                  â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ Day       â”‚ Available â”‚ Start â”‚ End   â”‚ Max Slots/Day       â”‚  â”‚
â”‚  â”‚ Monday    â”‚ âœ…        â”‚ 9:00  â”‚ 17:00 â”‚ 4                   â”‚  â”‚
â”‚  â”‚ Tuesday   â”‚ âœ…        â”‚ 10:00 â”‚ 16:00 â”‚ 3                   â”‚  â”‚
â”‚  â”‚ Wednesday â”‚ âŒ        â”‚ —     â”‚ —     â”‚ 0                   â”‚  â”‚
â”‚  â”‚ Thursday  â”‚ âœ…        â”‚ 9:00  â”‚ 17:00 â”‚ 4                   â”‚  â”‚
â”‚  â”‚ Friday    â”‚ âœ…        â”‚ 9:00  â”‚ 14:00 â”‚ 2                   â”‚  â”‚
â”‚  â”‚ Saturday  â”‚ âŒ        â”‚ —     â”‚ —     â”‚ 0                   â”‚  â”‚
â”‚  â”‚ Sunday    â”‚ âŒ        â”‚ —     â”‚ —     â”‚ 0                   â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚  Session Duration: [30 min â–¼]  [45 min â–¼]  [60 min â–¼]            â”‚
â”‚  Virtual Meeting Link: [https://zoom.us/j/...]                    â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Mentee Capacity                                                       â”‚
â”‚  Current Load: 8 / 10 mentees                                       â”‚
â”‚  Max Capacity: [10]  (adjustable, subject to admin approval)       â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Notification Preferences                                              â”‚
â”‚  â–¡ Email: Session reminders, mentee messages                        â”‚
â”‚  â–¡ Push: New mentee requests, session starting                      â”‚
â”‚  â–¡ SMS: Urgent mentee messages (daily 8AM-8PM)                     â”‚
â”‚  â— Weekly summary every Monday                                      â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  [Save Settings]                                                       â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**API:** `GET/PUT /api/mentor/settings`

---

## 4. Full Database Schema

### Table: `mentors`

| Column                     | Type           | Constraints       | Default     | Description                                      |
| -------------------------- | -------------- | ----------------- | ----------- | ------------------------------------------------ |
| `id`                       | `UUID`         | PK, FK → users.id | —           | Same as user ID                                  |
| `mentor_type`              | `VARCHAR(50)`  | NOT NULL          | `'career'`  | career, academic, peer, alumni, industry         |
| `employee_id`              | `VARCHAR(20)`  | UNIQUE, NULLABLE  | —           | CEA-MNT-YYYY-NNNNN                               |
| `title`                    | `VARCHAR(200)` | NOT NULL          | —           | "Career Mentor", "Industry Mentor"               |
| `company`                  | `VARCHAR(200)` | NULLABLE          | —           | Current employer                                 |
| `job_title`                | `VARCHAR(200)` | NULLABLE          | —           | Current position                                 |
| `bio`                      | `TEXT`         | NULLABLE          | —           | Professional background                          |
| `avatar_url`               | `VARCHAR(500)` | NULLABLE          | —           | Profile photo                                    |
| `linkedin_url`             | `VARCHAR(500)` | NULLABLE          | —           | LinkedIn profile                                 |
| `expertise_tags`           | `JSONB`        | NULLABLE          | —           | Array of expertise areas                         |
| `max_mentees`              | `INTEGER`      | NOT NULL          | `10`        | Maximum capacity                                 |
| `current_mentees`          | `INTEGER`      | NOT NULL          | `0`         | Active mentee count                              |
| `session_duration_minutes` | `INTEGER`      | NOT NULL          | `45`        | Default session length                           |
| `virtual_meeting_url`      | `VARCHAR(500)` | NULLABLE          | —           | Default Zoom/Teams link                          |
| `status`                   | `VARCHAR(50)`  | NOT NULL          | `'pending'` | pending, active, at_capacity, on_break, inactive |
| `total_sessions`           | `INTEGER`      | NOT NULL          | `0`         | Lifetime session count                           |
| `avg_rating`               | `DECIMAL(2,1)` | NULLABLE          | —           | 1.0-5.0 computed rating                          |
| `total_placements`         | `INTEGER`      | NOT NULL          | `0`         | Number of mentees placed                         |
| `created_at`               | `TIMESTAMPTZ`  | NOT NULL          | `NOW()`     | —                                                |
| `updated_at`               | `TIMESTAMPTZ`  | NOT NULL          | `NOW()`     | —                                                |

**Indexes:**

- `idx_mentors_type` ON `mentor_type`
- `idx_mentors_status` ON `status`
- `idx_mentors_company` ON `company`

### Table: `mentor_availability`

| Column        | Type          | Constraints               | Default | Description              |
| ------------- | ------------- | ------------------------- | ------- | ------------------------ |
| `id`          | `UUID`        | PK                        | —       | —                        |
| `mentor_id`   | `UUID`        | FK → mentors.id, NOT NULL | —       | —                        |
| `day_of_week` | `INTEGER`     | NOT NULL                  | —       | 0=Sun, 1=Mon, ..., 6=Sat |
| `start_time`  | `TIME`        | NOT NULL                  | —       | Available from           |
| `end_time`    | `TIME`        | NOT NULL                  | —       | Available until          |
| `max_slots`   | `INTEGER`     | NOT NULL                  | `4`     | Max sessions this day    |
| `is_active`   | `BOOLEAN`     | NOT NULL                  | `true`  | —                        |
| `created_at`  | `TIMESTAMPTZ` | NOT NULL                  | `NOW()` | —                        |

**Indexes:** UNIQUE(mentor_id, day_of_week)

### Table: `mentorship_relationships`

| Column                    | Type           | Constraints                | Default             | Description                                      |
| ------------------------- | -------------- | -------------------------- | ------------------- | ------------------------------------------------ |
| `id`                      | `UUID`         | PK                         | `gen_random_uuid()` | —                                                |
| `mentor_id`               | `UUID`         | FK → mentors.id, NOT NULL  | —                   | —                                                |
| `student_id`              | `UUID`         | FK → students.id, NOT NULL | —                   | —                                                |
| `relationship_type`       | `VARCHAR(50)`  | NOT NULL                   | —                   | career, academic, peer                           |
| `status`                  | `VARCHAR(50)`  | NOT NULL                   | `'requested'`       | requested, active, paused, completed, terminated |
| `requested_by`            | `VARCHAR(20)`  | NOT NULL                   | —                   | student, admin, mentor                           |
| `requested_at`            | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()`             | —                                                |
| `accepted_at`             | `TIMESTAMPTZ`  | NULLABLE                   | —                   | When mentor approved                             |
| `paused_at`               | `TIMESTAMPTZ`  | NULLABLE                   | —                   | —                                                |
| `paused_reason`           | `VARCHAR(500)` | NULLABLE                   | —                   | —                                                |
| `completed_at`            | `TIMESTAMPTZ`  | NULLABLE                   | —                   | —                                                |
| `completion_reason`       | `VARCHAR(500)` | NULLABLE                   | —                   | goals_achieved, graduated, transferred, other    |
| `terminated_at`           | `TIMESTAMPTZ`  | NULLABLE                   | —                   | —                                                |
| `terminated_by`           | `VARCHAR(20)`  | NULLABLE                   | —                   | mentor, student, admin                           |
| `termination_reason`      | `VARCHAR(500)` | NULLABLE                   | —                   | —                                                |
| `career_goal`             | `TEXT`         | NULLABLE                   | —                   | Mentee's stated career goal                      |
| `initial_readiness_score` | `INTEGER`      | NULLABLE                   | —                   | 0-100 at start                                   |
| `current_readiness_score` | `INTEGER`      | NULLABLE                   | `0`                 | 0-100 current                                    |
| `created_at`              | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()`             | —                                                |
| `updated_at`              | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()`             | —                                                |

**Indexes:**

- `idx_mr_mentor` ON `mentor_id`, `status`
- `idx_mr_student` ON `student_id`
- UNIQUE(mentor_id, student_id) WHERE status IN ('requested', 'active')

### Table: `mentor_sessions`

| Column                | Type           | Constraints                                | Default             | Description                                                                                                                               |
| --------------------- | -------------- | ------------------------------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `UUID`         | PK                                         | `gen_random_uuid()` | —                                                                                                                                         |
| `mentor_id`           | `UUID`         | FK → mentors.id, NOT NULL                  | —                   | —                                                                                                                                         |
| `mentee_id`           | `UUID`         | FK → students.id, NOT NULL                 | —                   | —                                                                                                                                         |
| `relationship_id`     | `UUID`         | FK → mentorship_relationships.id, NOT NULL | —                   | —                                                                                                                                         |
| `session_type`        | `VARCHAR(50)`  | NOT NULL                                   | —                   | career_roadmap, mock_interview, resume_review, portfolio_review, goal_setting, networking_strategy, skills_assessment, general_mentorship |
| `title`               | `VARCHAR(255)` | NOT NULL                                   | —                   | Session title                                                                                                                             |
| `description`         | `TEXT`         | NULLABLE                                   | —                   | Session description/purpose                                                                                                               |
| `status`              | `VARCHAR(50)`  | NOT NULL                                   | `'scheduled'`       | scheduled, in_progress, completed, cancelled, no_show                                                                                     |
| `scheduled_at`        | `TIMESTAMPTZ`  | NOT NULL                                   | —                   | Start time                                                                                                                                |
| `duration_minutes`    | `INTEGER`      | NOT NULL                                   | `45`                | Planned duration                                                                                                                          |
| `actual_started_at`   | `TIMESTAMPTZ`  | NULLABLE                                   | —                   | When session actually started                                                                                                             |
| `actual_ended_at`     | `TIMESTAMPTZ`  | NULLABLE                                   | —                   | When session ended                                                                                                                        |
| `location_type`       | `VARCHAR(50)`  | NOT NULL                                   | `'virtual'`         | virtual, in_person                                                                                                                        |
| `location_details`    | `VARCHAR(500)` | NULLABLE                                   | —                   | Room number or meeting URL                                                                                                                |
| `meeting_url`         | `VARCHAR(500)` | NULLABLE                                   | —                   | Override default URL                                                                                                                      |
| `agenda_items`        | `JSONB`        | NULLABLE                                   | —                   | Array of agenda items {title, duration, completed}                                                                                        |
| `live_notes`          | `TEXT`         | NULLABLE                                   | —                   | Notes taken during session                                                                                                                |
| `action_items`        | `JSONB`        | NULLABLE                                   | —                   | Array of action items {text, assignedTo: mentor                                                                                           | mentee, dueDate, completed} |
| `topics_covered`      | `JSONB`        | NULLABLE                                   | —                   | Array of topic tags                                                                                                                       |
| `mentee_rating`       | `INTEGER`      | NULLABLE                                   | —                   | 1-5 mentee feedback                                                                                                                       |
| `mentee_feedback`     | `TEXT`         | NULLABLE                                   | —                   | Mentee's session feedback                                                                                                                 |
| `mentor_notes`        | `TEXT`         | NULLABLE                                   | —                   | Private mentor notes                                                                                                                      |
| `cancelled_at`        | `TIMESTAMPTZ`  | NULLABLE                                   | —                   | —                                                                                                                                         |
| `cancellation_reason` | `VARCHAR(500)` | NULLABLE                                   | —                   | —                                                                                                                                         |
| `cancelled_by`        | `VARCHAR(20)`  | NULLABLE                                   | —                   | mentor, mentee, system                                                                                                                    |
| `created_at`          | `TIMESTAMPTZ`  | NOT NULL                                   | `NOW()`             | —                                                                                                                                         |
| `updated_at`          | `TIMESTAMPTZ`  | NOT NULL                                   | `NOW()`             | —                                                                                                                                         |

**Indexes:**

- `idx_ms_mentor_date` ON `mentor_id`, `scheduled_at`
- `idx_ms_mentee_status` ON `mentee_id`, `status`
- `idx_ms_status` ON `status`

### Table: `mentor_goals`

| Column                | Type           | Constraints                                | Default             | Description                                                                                                            |
| --------------------- | -------------- | ------------------------------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `UUID`         | PK                                         | `gen_random_uuid()` | —                                                                                                                      |
| `relationship_id`     | `UUID`         | FK → mentorship_relationships.id, NOT NULL | —                   | —                                                                                                                      |
| `mentor_id`           | `UUID`         | FK → mentors.id, NOT NULL                  | —                   | —                                                                                                                      |
| `mentee_id`           | `UUID`         | FK → students.id, NOT NULL                 | —                   | —                                                                                                                      |
| `category`            | `VARCHAR(50)`  | NOT NULL                                   | —                   | certification, job_application, networking, skill_development, portfolio, resume, interview_prep, personal_development |
| `title`               | `VARCHAR(255)` | NOT NULL                                   | —                   | Goal description                                                                                                       |
| `description`         | `TEXT`         | NULLABLE                                   | —                   | Detailed goal                                                                                                          |
| `target_date`         | `DATE`         | NULLABLE                                   | —                   | Target completion                                                                                                      |
| `progress_percentage` | `INTEGER`      | NOT NULL                                   | `0`                 | 0-100                                                                                                                  |
| `status`              | `VARCHAR(50)`  | NOT NULL                                   | `'active'`          | active, completed, cancelled, archived                                                                                 |
| `completed_at`        | `TIMESTAMPTZ`  | NULLABLE                                   | —                   | —                                                                                                                      |
| `mentor_notes`        | `TEXT`         | NULLABLE                                   | —                   | Private notes                                                                                                          |
| `sort_order`          | `INTEGER`      | NOT NULL                                   | `0`                 | —                                                                                                                      |
| `created_at`          | `TIMESTAMPTZ`  | NOT NULL                                   | `NOW()`             | —                                                                                                                      |
| `updated_at`          | `TIMESTAMPTZ`  | NOT NULL                                   | `NOW()`             | —                                                                                                                      |

**Indexes:**

- `idx_mg_relationship` ON `relationship_id`
- `idx_mg_status` ON `status`

### Table: `mentor_goal_milestones`

| Column         | Type           | Constraints                    | Default | Description           |
| -------------- | -------------- | ------------------------------ | ------- | --------------------- |
| `id`           | `UUID`         | PK                             | —       | —                     |
| `goal_id`      | `UUID`         | FK → mentor_goals.id, NOT NULL | —       | —                     |
| `title`        | `VARCHAR(255)` | NOT NULL                       | —       | Milestone description |
| `completed`    | `BOOLEAN`      | NOT NULL                       | `false` | —                     |
| `completed_at` | `TIMESTAMPTZ`  | NULLABLE                       | —       | —                     |
| `sort_order`   | `INTEGER`      | NOT NULL                       | `0`     | —                     |
| `created_at`   | `TIMESTAMPTZ`  | NOT NULL                       | `NOW()` | —                     |

### Table: `mentor_portfolio_reviews`

| Column                   | Type          | Constraints                                | Default   | Description                                                    |
| ------------------------ | ------------- | ------------------------------------------ | --------- | -------------------------------------------------------------- |
| `id`                     | `UUID`        | PK                                         | —         | —                                                              |
| `relationship_id`        | `UUID`        | FK → mentorship_relationships.id, NOT NULL | —         | —                                                              |
| `mentor_id`              | `UUID`        | FK → mentors.id, NOT NULL                  | —         | —                                                              |
| `mentee_id`              | `UUID`        | FK → students.id, NOT NULL                 | —         | —                                                              |
| `overall_score`          | `INTEGER`     | NULLABLE                                   | —         | 0-100 computed score                                           |
| `overall_feedback`       | `TEXT`        | NULLABLE                                   | —         | General feedback                                               |
| `section_scores`         | `JSONB`       | NULLABLE                                   | —         | {profile, skills, projects, certifications, experience} scores |
| `section_feedback`       | `JSONB`       | NULLABLE                                   | —         | Per-section comments                                           |
| `status`                 | `VARCHAR(50)` | NOT NULL                                   | `'draft'` | draft, submitted, approved, changes_requested                  |
| `submitted_at`           | `TIMESTAMPTZ` | NULLABLE                                   | —         | —                                                              |
| `mentee_acknowledged_at` | `TIMESTAMPTZ` | NULLABLE                                   | —         | When mentee saw feedback                                       |
| `created_at`             | `TIMESTAMPTZ` | NOT NULL                                   | `NOW()`   | —                                                              |
| `updated_at`             | `TIMESTAMPTZ` | NOT NULL                                   | `NOW()`   | —                                                              |

**Indexes:** UNIQUE(relationship_id) — one active review per relationship

### Table: `mentor_career_applications`

| Column            | Type           | Constraints                                | Default     | Description                                                                                                                      |
| ----------------- | -------------- | ------------------------------------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | `UUID`         | PK                                         | —           | —                                                                                                                                |
| `relationship_id` | `UUID`         | FK → mentorship_relationships.id, NOT NULL | —           | —                                                                                                                                |
| `mentee_id`       | `UUID`         | FK → students.id, NOT NULL                 | —           | —                                                                                                                                |
| `company_name`    | `VARCHAR(255)` | NOT NULL                                   | —           | —                                                                                                                                |
| `job_title`       | `VARCHAR(255)` | NOT NULL                                   | —           | —                                                                                                                                |
| `job_url`         | `VARCHAR(500)` | NULLABLE                                   | —           | —                                                                                                                                |
| `stage`           | `VARCHAR(50)`  | NOT NULL                                   | `'applied'` | applied, screening, phone_interview, technical_interview, onsite_interview, reference_check, offer, rejected, withdrawn, ghosted |
| `applied_at`      | `DATE`         | NULLABLE                                   | —           | —                                                                                                                                |
| `last_updated_at` | `TIMESTAMPTZ`  | NULLABLE                                   | —           | —                                                                                                                                |
| `notes`           | `TEXT`         | NULLABLE                                   | —           | —                                                                                                                                |
| `created_at`      | `TIMESTAMPTZ`  | NOT NULL                                   | `NOW()`     | —                                                                                                                                |
| `updated_at`      | `TIMESTAMPTZ`  | NOT NULL                                   | `NOW()`     | —                                                                                                                                |

**Indexes:** `idx_mca_mentee` ON `mentee_id`, `idx_mca_stage` ON `stage`

### Table: `mentor_career_milestones`

| Column            | Type           | Constraints                                | Default | Description                                                   |
| ----------------- | -------------- | ------------------------------------------ | ------- | ------------------------------------------------------------- |
| `id`              | `UUID`         | PK                                         | —       | —                                                             |
| `relationship_id` | `UUID`         | FK → mentorship_relationships.id, NOT NULL | —       | —                                                             |
| `title`           | `VARCHAR(255)` | NOT NULL                                   | —       | —                                                             |
| `category`        | `VARCHAR(50)`  | NOT NULL                                   | —       | resume, linkedin, applications, interviews, networking, offer |
| `completed`       | `BOOLEAN`      | NOT NULL                                   | `false` | —                                                             |
| `completed_at`    | `TIMESTAMPTZ`  | NULLABLE                                   | —       | —                                                             |
| `sort_order`      | `INTEGER`      | NOT NULL                                   | `0`     | —                                                             |
| `created_at`      | `TIMESTAMPTZ`  | NOT NULL                                   | `NOW()` | —                                                             |

### Table: `mentor_resources`

| Column                | Type           | Constraints               | Default     | Description                                                        |
| --------------------- | -------------- | ------------------------- | ----------- | ------------------------------------------------------------------ |
| `id`                  | `UUID`         | PK                        | —           | —                                                                  |
| `mentor_id`           | `UUID`         | FK → mentors.id, NOT NULL | —           | Owner                                                              |
| `title`               | `VARCHAR(255)` | NOT NULL                  | —           | —                                                                  |
| `description`         | `TEXT`         | NULLABLE                  | —           | —                                                                  |
| `resource_type`       | `VARCHAR(50)`  | NOT NULL                  | —           | pdf, link, video, article, template, course, job_board             |
| `url`                 | `VARCHAR(500)` | NULLABLE                  | —           | External URL                                                       |
| `file_key`            | `VARCHAR(500)` | NULLABLE                  | —           | R2 key if uploaded                                                 |
| `file_name`           | `VARCHAR(255)` | NULLABLE                  | —           | Original filename                                                  |
| `category`            | `VARCHAR(100)` | NOT NULL                  | `'general'` | resume, interview, career_path, skills, networking, certifications |
| `tags`                | `JSONB`        | NULLABLE                  | —           | Array of tags                                                      |
| `shared_count`        | `INTEGER`      | NOT NULL                  | `0`         | Times shared                                                       |
| `is_academy_resource` | `BOOLEAN`      | NOT NULL                  | `false`     | Curated by academy                                                 |
| `created_at`          | `TIMESTAMPTZ`  | NOT NULL                  | `NOW()`     | —                                                                  |
| `updated_at`          | `TIMESTAMPTZ`  | NOT NULL                  | `NOW()`     | —                                                                  |

### Table: `mentor_messages`

| Column            | Type           | Constraints                            | Default  | Description                       |
| ----------------- | -------------- | -------------------------------------- | -------- | --------------------------------- |
| `id`              | `UUID`         | PK                                     | —        | —                                 |
| `conversation_id` | `UUID`         | FK → mentor_conversations.id, NOT NULL | —        | —                                 |
| `sender_id`       | `UUID`         | FK → users.id, NOT NULL                | —        | —                                 |
| `sender_type`     | `VARCHAR(20)`  | NOT NULL                               | —        | mentor, mentee                    |
| `content`         | `TEXT`         | NOT NULL                               | —        | Message body                      |
| `content_type`    | `VARCHAR(50)`  | NOT NULL                               | `'text'` | text, image, file, resource_share |
| `attachment_url`  | `VARCHAR(500)` | NULLABLE                               | —        | File URL if attachment            |
| `attachment_name` | `VARCHAR(255)` | NULLABLE                               | —        | —                                 |
| `read_at`         | `TIMESTAMPTZ`  | NULLABLE                               | —        | —                                 |
| `created_at`      | `TIMESTAMPTZ`  | NOT NULL                               | `NOW()`  | —                                 |

### Table: `mentor_conversations`

| Column                 | Type           | Constraints                                | Default | Description |
| ---------------------- | -------------- | ------------------------------------------ | ------- | ----------- |
| `id`                   | `UUID`         | PK                                         | —       | —           |
| `mentor_id`            | `UUID`         | FK → mentors.id, NOT NULL                  | —       | —           |
| `student_id`           | `UUID`         | FK → students.id, NOT NULL                 | —       | —           |
| `relationship_id`      | `UUID`         | FK → mentorship_relationships.id, NOT NULL | —       | —           |
| `last_message_at`      | `TIMESTAMPTZ`  | NULLABLE                                   | —       | —           |
| `last_message_preview` | `VARCHAR(200)` | NULLABLE                                   | —       | —           |
| `unread_count_mentor`  | `INTEGER`      | NOT NULL                                   | `0`     | —           |
| `created_at`           | `TIMESTAMPTZ`  | NOT NULL                                   | `NOW()` | —           |

**Indexes:** UNIQUE(mentor_id, student_id)

### Table: `mentor_readiness_assessments`

| Column                | Type          | Constraints                                | Default | Description |
| --------------------- | ------------- | ------------------------------------------ | ------- | ----------- |
| `id`                  | `UUID`        | PK                                         | —       | —           |
| `relationship_id`     | `UUID`        | FK → mentorship_relationships.id, NOT NULL | —       | —           |
| `assessed_at`         | `TIMESTAMPTZ` | NOT NULL                                   | `NOW()` | —           |
| `overall_score`       | `INTEGER`     | NOT NULL                                   | —       | 0-100       |
| `resume_score`        | `INTEGER`     | NULLABLE                                   | —       | 0-100       |
| `portfolio_score`     | `INTEGER`     | NULLABLE                                   | —       | 0-100       |
| `linkedin_score`      | `INTEGER`     | NULLABLE                                   | —       | 0-100       |
| `skills_score`        | `INTEGER`     | NULLABLE                                   | —       | 0-100       |
| `networking_score`    | `INTEGER`     | NULLABLE                                   | —       | 0-100       |
| `interview_readiness` | `INTEGER`     | NULLABLE                                   | —       | 0-100       |
| `assessed_by`         | `UUID`        | FK → mentors.id, NOT NULL                  | —       | —           |
| `notes`               | `TEXT`        | NULLABLE                                   | —       | —           |
| `created_at`          | `TIMESTAMPTZ` | NOT NULL                                   | `NOW()` | —           |

**Indexes:** UNIQUE(relationship_id, assessed_at)

---

## 5. Complete API Contract

### `GET /api/mentor/dashboard`

**Auth:** Required (mentor role)

**Response:**

```typescript
interface MentorDashboardResponse {
  mentor: {
    id: string;
    name: string;
    mentorType: string;
    currentMentees: number;
    maxMentees: number;
    avgRating: number | null;
  };
  mentees: MenteeSummary[];
  upcomingSessions: MentorSessionSummary[];
  pendingRequests: MentorshipRequest[];
  quickStats: {
    activeMentees: number;
    sessionsThisMonth: number;
    avgRating: number;
    resumeReviews: number;
    interviewPreps: number;
    jobPlacements: number;
  };
  recentActivity: MentorActivityItem[];
}

interface MenteeSummary {
  id: string;
  name: string;
  programName: string;
  readinessScore: number;
  lastSessionDate: string | null;
  nextSessionDate: string | null;
  unreadMessages: number;
  goalsCompleted: number;
  goalsTotal: number;
  status: string;
}

interface MentorSessionSummary {
  id: string;
  menteeName: string;
  menteeId: string;
  sessionType: string;
  title: string;
  scheduledAt: string;
  durationMinutes: number;
  locationType: string;
  meetingUrl: string | null;
  status: string;
}

interface MentorshipRequest {
  id: string;
  studentId: string;
  studentName: string;
  programName: string;
  reason: string;
  requestedAt: string;
}

interface MentorActivityItem {
  type: string;
  description: string;
  timestamp: string;
  link: string | null;
}
```

**Error Codes:**

| Code              | HTTP | Message                        |
| ----------------- | ---- | ------------------------------ |
| `FORBIDDEN`       | 403  | "Mentor access required"       |
| `INACTIVE_MENTOR` | 403  | "Mentor account is not active" |

### `GET /api/mentor/mentees`

**Auth:** Required (mentor)

**Query:** `status?: string` (active, completed, all), `search?: string`

**Response:**

```typescript
interface GetMenteesResponse {
  mentees: MenteeDetail[];
  pagination: Pagination;
}

interface MenteeDetail extends MenteeSummary {
  avatarUrl: string | null;
  studentNumber: string;
  term: string;
  gpa: number;
  careerGoal: string | null;
  relationshipId: string;
  relationshipSince: string;
  sessionCount: number;
  goalsCompleted: number;
  goalsTotal: number;
}
```

### `GET /api/mentor/mentees/:id`

**Auth:** Required (mentor, assigned to this mentee)

**Response:**

```typescript
interface MenteeDetailResponse {
  mentee: MenteeFullProfile;
  readiness: ReadinessAssessment | null;
  goals: MentorGoal[];
  recentSessions: MentorSessionSummary[];
  careerProgress: CareerProgress;
  portfolioStatus: PortfolioReviewStatus;
}

interface MenteeFullProfile {
  id: string;
  name: string;
  avatarUrl: string | null;
  studentNumber: string;
  programName: string;
  programId: string;
  term: string;
  gpa: number;
  programProgress: number;
  careerGoal: string | null;
  relationshipStatus: string;
  relationshipSince: string;
  daysActive: number;
}

interface ReadinessAssessment {
  overallScore: number;
  resumeScore: number | null;
  portfolioScore: number | null;
  linkedinScore: number | null;
  skillsScore: number | null;
  networkingScore: number | null;
  lastAssessedAt: string | null;
}

interface CareerProgress {
  applications: { total: number; stages: Record<string, number> };
  milestones: CareerMilestone[];
  skillsGap: SkillGapAnalysis[];
}

interface SkillGapAnalysis {
  skill: string;
  requiredLevel: number;
  currentLevel: number;
  gap: number;
  recommendations: string[];
}

interface PortfolioReviewStatus {
  lastReviewedAt: string | null;
  overallScore: number | null;
  sectionsComplete: number;
  sectionsTotal: number;
}
```

### `GET /api/mentor/sessions`

**Auth:** Required (mentor)

**Query:** `status?: 'upcoming' | 'past' | 'cancelled' | 'all'`, `menteeId?: string`, `from?: string`, `to?: string`

**Response:**

```typescript
interface GetSessionsResponse {
  sessions: MentorSessionFull[];
  pagination: Pagination;
}

interface MentorSessionFull {
  id: string;
  menteeId: string;
  menteeName: string;
  menteeAvatar: string | null;
  sessionType: string;
  title: string;
  description: string | null;
  status: string;
  scheduledAt: string;
  durationMinutes: number;
  actualStartedAt: string | null;
  actualEndedAt: string | null;
  locationType: string;
  locationDetails: string | null;
  meetingUrl: string | null;
  agendaItems: AgendaItem[];
  liveNotes: string | null;
  actionItems: ActionItem[];
  topicsCovered: string[];
  menteeRating: number | null;
  menteeFeedback: string | null;
  cancellationReason: string | null;
}

interface AgendaItem {
  title: string;
  duration: number;
  completed: boolean;
}

interface ActionItem {
  text: string;
  assignedTo: "mentor" | "mentee";
  dueDate: string | null;
  completed: boolean;
}
```

### `POST /api/mentor/sessions`

**Auth:** Required (mentor)

**Request:**

```typescript
interface CreateSessionRequest {
  menteeId: string;
  sessionType: string;
  title: string;
  description?: string;
  scheduledAt: string;
  durationMinutes?: number;
  locationType?: "virtual" | "in_person";
  locationDetails?: string;
  meetingUrl?: string;
  agendaItems?: { title: string; duration: number }[];
}
```

**Response:** `201 { session: MentorSessionFull }`

**Error Codes:**

| Code                  | HTTP | Condition                        |
| --------------------- | ---- | -------------------------------- |
| `MENTEE_NOT_ASSIGNED` | 400  | Mentee not in mentor's roster    |
| `SLOT_UNAVAILABLE`    | 409  | Mentor has conflicting session   |
| `PAST_DATE`           | 400  | Cannot schedule in the past      |
| `MAX_SLOTS`           | 400  | Mentor has max sessions that day |

### `PUT /api/mentor/sessions/:id`

**Auth:** Required (mentor, owner)

**Request:** Partial session update

### `POST /api/mentor/sessions/:id/start`

**Auth:** Required (mentor, owner)

**Response:** `{ session: MentorSessionFull }` — status changes to `in_progress`, `actualStartedAt` set

### `POST /api/mentor/sessions/:id/complete`

**Auth:** Required (mentor, owner)

**Request:**

```typescript
interface CompleteSessionRequest {
  liveNotes?: string;
  actionItems?: { text: string; assignedTo: "mentor" | "mentee"; dueDate?: string }[];
  topicsCovered?: string[];
  menteeRating?: number;
  menteeFeedback?: string;
  mentorNotes?: string;
}
```

**Response:** `{ session: MentorSessionFull }`

### `POST /api/mentor/sessions/:id/cancel`

**Auth:** Required (mentor or mentee)

**Request:**

```typescript
interface CancelSessionRequest {
  reason: string;
  notifyMentee?: boolean;
}
```

### `GET /api/mentor/requests/pending`

**Auth:** Required (mentor)

**Response:**

```typescript
interface PendingRequestsResponse {
  requests: MentorshipRequest[];
}
```

### `POST /api/mentor/requests/:id/accept`

**Auth:** Required (mentor)

**Response:** `{ relationship: MentorshipRelationship }` — status → `active`

**Error Codes:**

| Code             | HTTP | Condition                      |
| ---------------- | ---- | ------------------------------ |
| `AT_CAPACITY`    | 400  | Mentor has reached max mentees |
| `ALREADY_ACTIVE` | 409  | Relationship already active    |

### `POST /api/mentor/requests/:id/decline`

**Auth:** Required (mentor)

**Request:**

```typescript
interface DeclineRequestRequest {
  reason?: string;
}
```

### `GET /api/mentor/mentees/:id/portfolio`

**Auth:** Required (mentor, assigned)

**Response:**

```typescript
interface PortfolioResponse {
  portfolio: {
    publicUrl: string;
    profileComplete: boolean;
    sections: PortfolioSection[];
  };
  lastReview: MentorPortfolioReview | null;
}

interface PortfolioSection {
  id: string;
  name: string;
  score: number;
  items: any[];
  feedback: string | null;
  status: "incomplete" | "needs_improvement" | "good" | "approved";
}
```

### `POST /api/mentor/mentees/:id/portfolio/review`

**Auth:** Required (mentor)

**Request:**

```typescript
interface SubmitPortfolioReviewRequest {
  overallScore: number;
  overallFeedback: string;
  sectionScores: Record<string, number>;
  sectionFeedback: Record<string, string>;
  status: "approved" | "changes_requested";
}
```

### `GET /api/mentor/mentees/:id/goals`

**Auth:** Required (mentor)

**Query:** `status?: 'active' | 'completed' | 'all'`

**Response:**

```typescript
interface GetGoalsResponse {
  goals: MentorGoalDetail[];
}

interface MentorGoalDetail {
  id: string;
  category: string;
  title: string;
  description: string | null;
  targetDate: string | null;
  progressPercentage: number;
  status: string;
  milestones: GoalMilestone[];
  mentorNotes: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### `POST /api/mentor/goals`

**Auth:** Required (mentor)

**Request:**

```typescript
interface CreateGoalRequest {
  menteeId: string;
  category: string;
  title: string;
  description?: string;
  targetDate?: string;
  milestones?: { title: string }[];
}
```

### `PUT /api/mentor/goals/:id`

**Auth:** Required (mentor, owner)

### `POST /api/mentor/goals/:id/progress`

**Auth:** Required (mentor or mentee)

**Request:**

```typescript
interface UpdateGoalProgressRequest {
  progressPercentage: number;
  completedMilestoneIds?: string[];
  mentorNotes?: string;
}
```

### `POST /api/mentor/goals/:id/complete`

**Auth:** Required (mentor)

### `GET /api/mentor/mentees/:id/career`

**Auth:** Required (mentor)

**Response:**

```typescript
interface CareerTrackResponse {
  careerGoal: string | null;
  targetTimeline: string | null;
  pipeline: {
    applied: CareerApplication[];
    interviewing: CareerApplication[];
    offer: CareerApplication[];
    rejected: CareerApplication[];
  };
  milestones: CareerMilestone[];
  skillsGap: SkillGapAnalysis[];
}
```

### `POST /api/mentor/mentees/:id/career/applications`

**Auth:** Required (mentor or mentee)

**Request:**

```typescript
interface AddApplicationRequest {
  companyName: string;
  jobTitle: string;
  jobUrl?: string;
  appliedAt?: string;
  notes?: string;
}
```

### `PUT /api/mentor/mentees/:id/career/applications/:appId`

**Auth:** Required (mentor or mentee)

**Request:**

```typescript
interface UpdateApplicationRequest {
  stage: string;
  notes?: string;
}
```

### `GET /api/mentor/messages`

**Auth:** Required (mentor)

**Response:**

```typescript
interface MentorMessagesResponse {
  conversations: MentorConversationSummary[];
}

interface MentorConversationSummary {
  conversationId: string;
  menteeId: string;
  menteeName: string;
  menteeAvatar: string | null;
  lastMessage: string;
  lastMessageAt: string;
  lastMessageSender: "mentor" | "mentee";
  unreadCount: number;
}
```

### `GET /api/mentor/messages/:conversationId`

**Auth:** Required (mentor, participant)

**Query:** `before?: string` (cursor), `limit?: number`

**Response:**

```typescript
interface ConversationMessagesResponse {
  messages: MentorMessage[];
  hasMore: boolean;
}

interface MentorMessage {
  id: string;
  senderId: string;
  senderType: "mentor" | "mentee";
  content: string;
  contentType: string;
  attachmentUrl: string | null;
  attachmentName: string | null;
  readAt: string | null;
  createdAt: string;
}
```

### `POST /api/mentor/messages/:conversationId`

**Auth:** Required (mentor)

**Request:**

```typescript
interface SendMentorMessageRequest {
  content: string;
  contentType?: "text" | "resource_share";
  resourceId?: string; // If sharing a resource
  attachmentUrl?: string;
  attachmentName?: string;
}
```

### `POST /api/mentor/messages/new`

**Auth:** Required (mentor)

**Request:**

```typescript
interface StartConversationRequest {
  menteeId: string;
  content: string;
}
```

### `GET /api/mentor/resources`

**Auth:** Required (mentor)

**Query:** `category?: string`, `search?: string`

**Response:**

```typescript
interface GetResourcesResponse {
  resources: MentorResource[];
}

interface MentorResource {
  id: string;
  title: string;
  description: string | null;
  resourceType: string;
  url: string | null;
  category: string;
  tags: string[];
  sharedCount: number;
  isAcademyResource: boolean;
  createdAt: string;
}
```

### `POST /api/mentor/resources`

**Auth:** Required (mentor)

**Request:** `multipart/form-data` or JSON

### `POST /api/mentor/resources/:id/share`

**Auth:** Required (mentor, owner)

**Request:**

```typescript
interface ShareResourceRequest {
  menteeIds: string[];
  message?: string;
}
```

### `GET /api/mentor/analytics`

**Auth:** Required (mentor)

**Query:** `period?: 'month' | 'term' | 'year' | 'all'`

**Response:**

```typescript
interface MentorAnalyticsResponse {
  impactSummary: {
    totalMentees: number;
    avgReadinessImprovement: number;
    sessionsConducted: number;
    careerReadinessImprovement: number;
    resumeReviews: number;
    jobPlacements: number;
  };
  readinessTrend: { date: string; avgScore: number }[];
  menteeBreakdown: {
    menteeId: string;
    menteeName: string;
    startScore: number;
    currentScore: number;
    sessionsThisMonth: number;
    goalsCompleted: number;
    goalsTotal: number;
    status: string;
  }[];
}
```

### `GET /api/mentor/settings`

**Auth:** Required (mentor)

**Response:**

```typescript
interface MentorSettingsResponse {
  profile: {
    name: string;
    email: string;
    mentorType: string;
    company: string | null;
    jobTitle: string | null;
    bio: string | null;
    avatarUrl: string | null;
    linkedinUrl: string | null;
    expertiseTags: string[];
  };
  availability: MentorAvailabilitySlot[];
  capacity: {
    currentMentees: number;
    maxMentees: number;
  };
  preferences: {
    defaultSessionDuration: number;
    virtualMeetingUrl: string | null;
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    weeklySummary: boolean;
  };
}
```

### `PUT /api/mentor/settings`

**Auth:** Required (mentor)

**Request:** Partial update of settings

---

## 6. Component Tree

```
MentorLayout
â”œâ”€â”€ MentorNavBar
â”‚   â”œâ”€â”€ Logo
â”‚   â”œâ”€â”€ NavLinks (Dashboard, Mentees, Sessions, Resources, Analytics)
â”‚   â”œâ”€â”€ NotificationBell (pending requests, session reminders)
â”‚   â”œâ”€â”€ MessageIndicator (unread conversation count)
â”‚   â””â”€â”€ MentorUserMenu (Settings, Availability, Help, Logout)
â”‚
â”œâ”€â”€ MentorDashboard
â”‚   â”œâ”€â”€ WelcomeHeader
â”‚   â”‚   â”œâ”€â”€ MentorName, MentorType, MenteeLoadIndicator (X/Y)
â”‚   â”‚   â””â”€â”€ OnboardingWizardBanner (if new mentor)
â”‚   â”œâ”€â”€ MenteeMiniList (scrollable horizontal)
â”‚   â”‚   â””â”€â”€ MenteeMiniCard[]
â”‚   â”‚       â”œâ”€â”€ Avatar + Name
â”‚   â”‚       â”œâ”€â”€ ReadinessScoreRing (color-coded)
â”‚   â”‚       â”œâ”€â”€ StatusBadge (active, at-risk, etc.)
â”‚   â”‚       â””â”€â”€ NextSessionDate
â”‚   â”œâ”€â”€ UpcomingSessionsWidget
â”‚   â”‚   â””â”€â”€ SessionCard[] (time, mentee, type, join/prepare/reschedule actions)
â”‚   â”œâ”€â”€ PendingRequestsWidget
â”‚   â”‚   â””â”€â”€ RequestCard[] (student name, program, reason, accept/decline buttons)
â”‚   â”œâ”€â”€ QuickStatsGrid
â”‚   â”‚   â”œâ”€â”€ StatCard("Active Mentees", count)
â”‚   â”‚   â”œâ”€â”€ StatCard("Sessions This Month", count)
â”‚   â”‚   â”œâ”€â”€ StatCard("Avg Rating", stars, value)
â”‚   â”‚   â”œâ”€â”€ StatCard("Resume Reviews", count)
â”‚   â”‚   â”œâ”€â”€ StatCard("Interview Preps", count)
â”‚   â”‚   â””â”€â”€ StatCard("Job Placements", count)
â”‚   â””â”€â”€ RecentActivityFeed
â”‚       â””â”€â”€ ActivityItem[] (icon, text, timestamp, link)
â”‚
â”œâ”€â”€ MenteeOverviewPage
â”‚   â”œâ”€â”€ BackButton
â”‚   â”œâ”€â”€ MenteeProfileCard
â”‚   â”‚   â”œâ”€â”€ Avatar + Name + StudentNumber
â”‚   â”‚   â”œâ”€â”€ ProgramBadge + Term
â”‚   â”‚   â”œâ”€â”€ GPA + ProgressBar
â”‚   â”‚   â”œâ”€â”€ CareerGoalText
â”‚   â”‚   â”œâ”€â”€ RelationshipMeta (active since, days count)
â”‚   â”‚   â””â”€â”€ ActionMenu (Edit Notes, End Mentorship, Flag)
â”‚   â”œâ”€â”€ ReadinessScoreCard (radial chart, sub-scores)
â”‚   â”œâ”€â”€ GoalsWidget
â”‚   â”‚   â”œâ”€â”€ GoalCard[] (title, progress bar, milestones, update/mark complete)
â”‚   â”‚   â””â”€â”€ AddGoalButton
â”‚   â”œâ”€â”€ RecentSessionsTable
â”‚   â”‚   â””â”€â”€ SessionRow[] (date, type, duration, rating, topics)
â”‚   â”œâ”€â”€ ScheduleSessionButton
â”‚   â””â”€â”€ TabNavigation (Overview | Goals | Sessions | Portfolio | Career | Messages | Notes)
â”‚       â”œâ”€â”€ GoalsTab
â”‚       â”œâ”€â”€ SessionsTab
â”‚       â”œâ”€â”€ PortfolioTab
â”‚       â”‚   â”œâ”€â”€ PortfolioSections (profile, skills, projects, certs, experience)
â”‚       â”‚   â”œâ”€â”€ SectionFeedbackCard (score, mentor comment, approve/request changes)
â”‚       â”‚   â””â”€â”€ SubmitReviewButton
â”‚       â”œâ”€â”€ CareerTab
â”‚       â”‚   â”œâ”€â”€ CareerGoalDisplay
â”‚       â”‚   â”œâ”€â”€ PipelineKanban (Applied | Interview | Offer | Rejected)
â”‚       â”‚   â”‚   â””â”€â”€ ApplicationCard[] (company, title, stage, date, actions)
â”‚       â”‚   â”œâ”€â”€ SkillsGapChart (radar or bar chart)
â”‚       â”‚   â””â”€â”€ CareerMilestonesList
â”‚       â”‚       â””â”€â”€ MilestoneItem[] (title, completed, date)
â”‚       â”œâ”€â”€ MessagesTab (embedded chat)
â”‚       â””â”€â”€ NotesTab
â”‚           â””â”€â”€ RichTextEditor + SaveNotesButton
â”‚
â”œâ”€â”€ SessionHubPage
â”‚   â”œâ”€â”€ TabBar (Upcoming | Past | Cancelled | All)
â”‚   â”œâ”€â”€ DateGroupList
â”‚   â”‚   â””â”€â”€ DateGroup[]
â”‚   â”‚       â””â”€â”€ SessionCard[]
â”‚   â”‚           â”œâ”€â”€ TimeBadge
â”‚   â”‚           â”œâ”€â”€ MenteeInfo (avatar, name)
â”‚   â”‚           â”œâ”€â”€ SessionMeta (type, duration)
â”‚   â”‚           â”œâ”€â”€ LocationInfo (virtual/in-person with link or room)
â”‚   â”‚           â”œâ”€â”€ PrepNotesSection (collapsible)
â”‚   â”‚           â”œâ”€â”€ ActionButtons (Join, Prepare, Reschedule, Cancel, End)
â”‚   â”‚           â””â”€â”€ StatusBadge (scheduled, in_progress, completed, cancelled)
â”‚   â””â”€â”€ NewSessionButton → SessionSchedulerModal
â”‚       â”œâ”€â”€ MenteeSelect
â”‚       â”œâ”€â”€ SessionTypeSelect
â”‚       â”œâ”€â”€ DateTimePicker
â”‚       â”œâ”€â”€ DurationSelect
â”‚       â”œâ”€â”€ LocationToggle (virtual/in-person)
â”‚       â”œâ”€â”€ AgendaBuilder (add/remove items with durations)
â”‚       â””â”€â”€ CreateButton
â”‚
â”œâ”€â”€ SessionDetailPage (In-Session View)
â”‚   â”œâ”€â”€ SessionHeader (mentee info, timer, session type)
â”‚   â”œâ”€â”€ AgendaTracker (checkbox list with timer per item)
â”‚   â”œâ”€â”€ LiveNotesEditor (rich text, auto-saves)
â”‚   â”œâ”€â”€ ActionItemsPanel
â”‚   â”‚   â”œâ”€â”€ ActionItemInput (text, assignee, due date)
â”‚   â”‚   â””â”€â”€ ActionItemList (checkable)
â”‚   â”œâ”€â”€ ResourceSharingBar (quick-share from resources)
â”‚   â”œâ”€â”€ PostSessionFeedbackForm
â”‚   â”‚   â”œâ”€â”€ RatingStars (1-5)
â”‚   â”‚   â”œâ”€â”€ TopicsMultiSelect
â”‚   â”‚   â”œâ”€â”€ MenteeFeedbackTextArea (optional)
â”‚   â”‚   â””â”€â”€ MentorPrivateNotesTextArea
â”‚   â””â”€â”€ EndSessionButton
â”‚
â”œâ”€â”€ PortfolioReviewPage
â”‚   â”œâ”€â”€ MenteeHeader
â”‚   â”œâ”€â”€ OverallScoreDisplay
â”‚   â”œâ”€â”€ SectionList
â”‚   â”‚   â””â”€â”€ PortfolioSectionCard[]
â”‚   â”‚       â”œâ”€â”€ SectionName
â”‚   â”‚       â”œâ”€â”€ ScoreIndicator (color bar)
â”‚   â”‚       â”œâ”€â”€ ItemsPreview
â”‚   â”‚       â”œâ”€â”€ FeedbackTextArea (per section)
â”‚   â”‚       â””â”€â”€ ApproveButton / RequestChangesButton
â”‚   â””â”€â”€ OverallFeedbackEditor + SubmitButton
â”‚
â”œâ”€â”€ CareerTrackingPage
â”‚   â”œâ”€â”€ MenteeHeader
â”‚   â”œâ”€â”€ CareerGoalSection (view/edit goal, target timeline)
â”‚   â”œâ”€â”€ PipelineKanbanBoard
â”‚   â”‚   â”œâ”€â”€ KanbanColumn("Applied") → ApplicationCard[]
â”‚   â”‚   â”œâ”€â”€ KanbanColumn("Interviewing") → ApplicationCard[]
â”‚   â”‚   â”œâ”€â”€ KanbanColumn("Offer") → ApplicationCard[]
â”‚   â”‚   â””â”€â”€ KanbanColumn("Rejected/Closed") → ApplicationCard[]
â”‚   â”‚       â””â”€â”€ ApplicationCard (company, title, stage, date, drag to update stage)
â”‚   â”œâ”€â”€ AddApplicationModal (company, title, url, date)
â”‚   â”œâ”€â”€ SkillsGapRadarChart
â”‚   â”œâ”€â”€ CareerMilestonesList
â”‚   â”‚   â””â”€â”€ MilestoneItem[] + AddMilestoneButton
â”‚   â””â”€â”€ ExportButton
â”‚
â”œâ”€â”€ GoalManagementPage
â”‚   â”œâ”€â”€ MenteeSelector (if viewing cross-mentee)
â”‚   â”œâ”€â”€ ActiveGoalsSection
â”‚   â”‚   â””â”€â”€ GoalCard[] (category badge, title, progress, milestones, actions)
â”‚   â”œâ”€â”€ CompletedGoalsSection (collapsible)
â”‚   â””â”€â”€ NewGoalModal
â”‚       â”œâ”€â”€ MenteeSelect
â”‚       â”œâ”€â”€ GoalCategorySelect
â”‚       â”œâ”€â”€ TitleInput, DescriptionArea
â”‚       â”œâ”€â”€ TargetDatePicker
â”‚       â”œâ”€â”€ MilestonesBuilder (add milestone items)
â”‚       â””â”€â”€ CreateButton
â”‚
â”œâ”€â”€ MessagingPage
â”‚   â”œâ”€â”€ ConversationList (left pane)
â”‚   â”‚   â”œâ”€â”€ SearchInput
â”‚   â”‚   â”œâ”€â”€ ConversationItem[] (avatar, name, last message preview, unread badge, time)
â”‚   â”‚   â””â”€â”€ NewChatButton
â”‚   â””â”€â”€ ChatPane (right pane)
â”‚       â”œâ”€â”€ ChatHeader (mentee name, profile link)
â”‚       â”œâ”€â”€ MessageList (scrollable, auto-scroll to bottom)
â”‚       â”‚   â””â”€â”€ MessageBubble[] (content, timestamp, attachment, sent/received styling)
â”‚       â”œâ”€â”€ MessageInput
â”‚       â”‚   â”œâ”€â”€ RichTextInput
â”‚       â”‚   â”œâ”€â”€ AttachmentButton (file upload)
â”‚       â”‚   â”œâ”€â”€ ResourceShareButton (pick from resources)
â”‚       â”‚   â””â”€â”€ SendButton
â”‚       â””â”€â”€ TypingIndicator
â”‚
â”œâ”€â”€ ResourcesLibrary
â”‚   â”œâ”€â”€ CategoryFilterTabs
â”‚   â”œâ”€â”€ SearchInput
â”‚   â”œâ”€â”€ ResourceGrid
â”‚   â”‚   â””â”€â”€ ResourceCard[] (type icon, title, description, share count, share with mentee)
â”‚   â”œâ”€â”€ AddResourceButton → AddResourceModal
â”‚   â”‚   â”œâ”€â”€ ResourceTypeSelect
â”‚   â”‚   â”œâ”€â”€ TitleInput, DescriptionInput
â”‚   â”‚   â”œâ”€â”€ FileUpload / URLInput
â”‚   â”‚   â”œâ”€â”€ CategorySelect, TagsInput
â”‚   â”‚   â””â”€â”€ SaveButton
â”‚   â””â”€â”€ ShareResourceModal (select mentees, optional message)
â”‚
â”œâ”€â”€ MentorAnalyticsPage
â”‚   â”œâ”€â”€ PeriodSelector
â”‚   â”œâ”€â”€ ImpactSummaryCards
â”‚   â”œâ”€â”€ ReadinessTrendChart (line chart)
â”‚   â”œâ”€â”€ MenteeBreakdownTable
â”‚   â”‚   â””â”€â”€ MenteeAnalyticsRow[] (name, start/current score, sessions, goals, notes)
â”‚   â””â”€â”€ ExportCSVButton
â”‚
â”œâ”€â”€ MentorSettingsPage
â”‚   â”œâ”€â”€ ProfileSection (avatar, name, title, bio, company, linkedin, expertise)
â”‚   â”œâ”€â”€ AvailabilitySchedule (day-by-day editor)
â”‚   â”‚   â””â”€â”€ AvailabilityDayRow[] (day toggle, start/end time, max slots)
â”‚   â”œâ”€â”€ CapacitySlider
â”‚   â”œâ”€â”€ NotificationPreferences (toggles per channel)
â”‚   â”œâ”€â”€ MeetingLinkInput
â”‚   â””â”€â”€ SaveButton
â”‚
â””â”€â”€ MentorHelpPage
    â”œâ”€â”€ FAQAccordion
    â”œâ”€â”€ QuickGuide (mentoring best practices)
    â””â”€â”€ ContactSupportForm
```

---

## 7. Exhaustive User Journeys

### Journey 7.1: Mentor Onboarding & Profile Setup

```
Prerequisite: Mentor invited by admin, account created.

Step 1: First login → redirected to /mentor/settings?welcome=true
  → Welcome modal: "Welcome to the Mentor Hub! Let's get your profile set up."

Step 2: Mentor fills profile:
  - Mentor type: "Career Mentor"
  - Bio, company, job title, LinkedIn URL
  - Expertise tags: "Cloud Security", "Penetration Testing", "Compliance"
  - Uploads avatar
  → Auto-saves as they type

Step 3: Sets availability schedule:
  - Monday-Friday, 9AM-5PM
  - Max 4 slots per day
  - Default session duration: 45 min
  - Virtual meeting link: Zoom URL
  → Clicks "Save Availability"

Step 4: Sets capacity:
  - Max mentees: 10 (default)
  → Clicks "Complete Setup"

Step 5: Redirected to dashboard
  → "Your profile is complete! You can now receive mentee requests."
  → Status changes to "Active"

Alternative:
  Step 2a: Skips profile setup → incomplete profile banner persists
  Step 4a: Requests capacity > 10 → pending admin approval
```

### Journey 7.2: Accepting a Mentorship Request

```
Step 1: Notification badge appears on dashboard: "2 pending requests"
  → Mentor clicks notification → opens pending requests

Step 2: Review request from Mike Brown:
  - Student: Mike Brown — Cybersecurity Fundamentals
  - Reason: "Looking for help with resume and career guidance"
  - Requested: 2 days ago

Step 3: Mentor clicks "Accept"
  → Confirmation dialog: "Accept mentorship with Mike Brown?"
  → Clicks "Confirm"
  → POST /api/mentor/requests/:id/accept → 200
  → Mike added to mentee roster
  → Auto-generated welcome message sent to Mike
  → Capacity: 8/10 → 9/10

Step 4: Mentor clicks "Decline" on another request
  → Reason dropdown: "At capacity" → "Not aligned with expertise" → "Other"
  → Selects "Not aligned with expertise"
  → POST /api/mentor/requests/:id/decline
  → Student notified: "Your mentorship request was declined. Reason: Not aligned with expertise."

Alternative:
  Step 3a: Mentor at capacity (10/10) → accept disabled, "Increase capacity in settings"
  Step 3b: Mentor wants to review student profile first → clicks student name → profile opens in new tab
  Step 4a: Defers decision → request stays pending, reminder in 48h
```

### Journey 7.3: Conducting a Mentorship Session

```
Step 1: Dashboard shows "Today 3:00 PM — Alex Johnson — Career Roadmap"
  → Mentor clicks "Prepare" → opens session with prep notes from last session

Step 2: At session time, clicks "Join" → meeting URL opens in new tab
  → Session becomes "In Progress" via POST /api/mentor/sessions/:id/start

Step 3: Mentor follows agenda:
  â–¡ Review updated resume (5 min) → checks off
  â–¡ Discuss career path (15 min) → types live notes:
    "Alex interested in cloud security. Discussed AWS, GCP, Azure paths.
     Recommended CCSP certification. Alex concerned about experience requirements."
  â–¡ Identify target companies (10 min) → adds action items
  â–¡ Set next steps (10 min) → adds action items

Step 4: Adds action items:
  - Alex: Research AWS Security cert requirements [Due: Nov 8]
  - Alex: Update LinkedIn headline [Due: Nov 5]
  - Mentor: Send list of cloud security job postings [Due: Nov 3]

Step 5: Shares a resource:
  → Clicks "Share Resource"
  → Selects "Top 20 Cybersecurity Job Boards"
  → Sends to Alex via chat
  → Resource shared_count increments

Step 6: Ends session
  → POST /api/mentor/sessions/:id/complete
  → Feedback form appears:
    - Topics covered: [Resume] [Career Path] [Certifications] [Networking]
    - Mentee rating: 5/5
    - Mentor notes: "Good session. Alex is motivated and focused on cloud security."
  → Submits
  → Session marked as completed

Alternative:
  Step 2a: Mentee doesn't show → wait 10 min → "Mark as No Show" → status: no_show
  Step 3a: Mentor goes off-agenda → adjusts on the fly
  Step 5a: Session ends early → complete with shorter duration
  Step 6a: Mentor wants to add notes later → saves draft → completes later
```

### Journey 7.4: Portfolio Review & Feedback

```
Step 1: Mentor navigates to Alex's profile → Portfolio tab
  → Portfolio loaded: profile complete, skills listed, 2 projects, 1 cert

Step 2: Mentor reviews each section:
  - Profile: "Bio is good but could mention specific interests. [Request Changes]"
  - Skills: Python needs validation evidence → "Add course completion proof"
  - Projects: "Security Audit" project needs screenshots → comment added
  - Certifications: Verified âœ“

Step 3: Mentor enters overall score: 70/100
  → Overall feedback: "Solid foundation! Focus on adding project media and
    validating skills with course completions. Your LinkedIn section is excellent."

Step 4: Submits review → POST /api/mentor/mentees/:id/portfolio/review
  → Status: "changes_requested"
  → Alex notified: "Your mentor has reviewed your portfolio. [View Feedback]"

Step 5: Alex makes changes, marks as ready for re-review
  → Mentor notified: "Alex updated portfolio — ready for re-review"
  → Mentor reviews again → approves
  → Portfolio section scores updated in readiness assessment

Alternative:
  Step 2a: Portfolio is excellent → "Approve" directly
  Step 4a: Mentor marks as "Approved" → portfolio readiness score improves
  Step 5a: Alex doesn't make changes → mentor nudges via message
```

### Journey 7.5: Career Pipeline Tracking

```
Step 1: Mentor opens Alex's Career tab
  → Pipeline shows: 2 applied, 1 interviewing, 0 offers

Step 2: Mentor adds new application:
  - Company: "Cloudflare"
  - Title: "Security Engineer Intern"
  - URL: careers.cloudflare.com/...
  - Applied: Oct 28
  → POST /api/mentor/mentees/:id/career/applications

Step 3: Updates interview stage for Google application:
  → Drags "Google Security Engineer" from "Applied" to "Interviewing"
  → Modal: Stage: "Phone Interview", Date: Nov 10
  → PUT /api/mentor/mentees/:id/career/applications/:appId

Step 4: Reviews skills gap section
  → Sees "Incident Response" at 60% (needs work)
  → Clicks "Recommend Resources"
  → Selects resource: "Incident Response Guide for Beginners"
  → Shares with Alex → notification sent

Step 5: Mark milestone complete: "Applied to 10+ positions" → 5/10 → progress updated

Alternative:
  Step 2a: Alex adds application themselves → mentor sees it in pipeline
  Step 3a: Offer received → drag to "Offer" column → mentor celebrates with Alex
  Step 4a: Skills gap minimal → mentor notes "Ready for interviews"
```

### Journey 7.6: Goal Setting & Tracking

```
Step 1: Mentor opens Goals tab → "No goals set yet. [Create first goal →]"

Step 2: Clicks "New Goal"
  → Mentee: Alex Johnson (pre-selected)
  → Category: "Certification"
  → Title: "Complete CompTIA Security+ certification"
  → Target: Dec 31, 2026
  → Milestones:
    1. Purchase study materials
    2. Complete online course
    3. Pass practice test 1 (>80%)
    4. Pass practice test 2 (>85%)
    5. Schedule exam
    6. Pass exam
  → Clicks "Create Goal"

Step 3: Two weeks later, mentor updates progress:
  → Opens goal → marks milestones 1-3 complete
  → Progress: 50% → manually adjusts slider to 50%
  → Adds note: "Alex passed first practice test with 85%. On track!"

Step 4: Goal nears completion:
  → Milestone 6 complete → progress: 100%
  → Clicks "Mark Complete"
  → Goal moved to "Completed" section
  → Readiness score recalculated (+5%)

Alternative:
  Step 3a: Goal is off-track → mentor adjusts target date, adds extra milestones
  Step 4a: Goal cancelled → select reason, archived
```

### Journey 7.7: Resource Sharing & Communication

```
Step 1: Mentor notices Alex needs resume help while reviewing dashboard
  → Opens Messaging → selects Alex's conversation

Step 2: Types quick message or selects template:
  "Hi Alex! I came across this resource that might help with [topic].
   Check it out: [link]"

Step 3: Clicks resource share button → selects "Resume Template for Cybersecurity"
  → Message sends with resource attached
  → Resource shared_count increments

Step 4: Alex replies: "Thanks Sarah! This is exactly what I needed."
  → Mentor gets push notification
  → Unread badge increments

Step 5: Mentor continues conversation → offers quick feedback

Alternative:
  Step 2a: Mentor uses template library for common messages
  Step 3a: Mentor uploads new file directly in chat
  Step 4a: Mentor sets up scheduled message → "Send this tip next week"
```

---

## 8. Business Rules Engine

### BR-ME-001: Mentorship Capacity

- Maximum mentees per mentor: configurable (default 10, max 25)
- Mentor can accept new requests only if `current_mentees < max_mentees`
- Admin can override capacity limit temporarily for high-demand mentors
- When at capacity, requests are auto-declined with "At capacity" message

### BR-ME-002: Session Scheduling Rules

- Sessions must be scheduled at least 2 hours in advance
- Max 6 sessions per mentor per day
- Sessions cannot overlap (based on duration)
- Rescheduling allowed up to 1 hour before; otherwise must cancel and rebook
- No-show after 10 minutes past start time
- Auto-cancel if mentee doesn't join within 15 minutes

### BR-ME-003: Session Completion Requirements

- Session notes must be saved within 24 hours to count toward metrics
- Mentee rating requires both mentor and mentee input (otherwise shows pending)
- Sessions < 10 minutes are flagged as "too short" and don't count as completed
- Minimum 2 sessions per month per active relationship to maintain active status

### BR-ME-004: Readiness Score Calculation

- Readiness = weighted average of sub-scores:
  - Resume (25%)
  - Portfolio (20%)
  - LinkedIn (10%)
  - Skills Assessment (25%)
  - Networking (10%)
  - Interview Readiness (10%)
- Recalculated after each portfolio review, new assessment, or career milestone
- Score ranges: 0-39 (Critical), 40-59 (Needs Work), 60-79 (Developing), 80-100 (Ready)

### BR-ME-005: Goal Setting Rules

- Each active relationship must have â‰¥ 1 active goal
- Goals must have a target date â‰¤ 6 months from creation
- Max 5 active goals per relationship
- Goals with no progress update for 60 days → auto-archived
- Progress percentage auto-calculated from milestone completion if milestones > 0

### BR-ME-006: Career Pipeline Rules

- Application stages are sequential: applied → screening → phone → technical → onsite → offer
- Cannot skip stages (e.g., applied → offer without intermediate)
- Rejected/withdrawn/ghosted are terminal stages
- Max 1 offer tracking per company (dedup by company+title)

### BR-ME-007: Portfolio Review Rules

- Each relationship can have one active portfolio review
- Submitting a new review overwrites the previous
- Section scores must be 0-100 integers
- At least 3 sections must be scored for overall score to be valid
- Reviews with "changes_requested" status auto-nudge mentee after 7 days

### BR-ME-008: Mentor Availability Rules

- Availability must include at least 3 days per week
- Minimum 4 hours total availability per week
- Slots are 30/45/60 minute increments
- Availability changes take effect immediately for future scheduling
- Mentor can block dates (vacation) → no sessions those days

### BR-ME-009: Mentorship Relationship Duration

- Minimum commitment: 1 term (12 weeks)
- Automatic review at 12 weeks → option to continue or end
- If inactive for 60+ days (no sessions), relationship auto-paused
- Paused relationships resume with a "check-in" session
- Terminated relationships archived after 30 days

### BR-ME-010: Communication Guidelines

- Mentor must respond to mentee messages within 24 hours (business days)
- After 48 hours of no response, system sends gentle reminder
- Inappropriate content → report to admin, auto-flag, relationship review
- Resource sharing limited to 10 per day (anti-spam)
- Message attachments max 25MB per file

---

## 9. Notification Specifications

### N-ME-01: New Mentorship Request

| Field             | Value                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| **Trigger**       | Student submits mentorship request                                                                         |
| **Channel**       | In-app (badge) + Push + Email (daily digest)                                                               |
| **Template**      | `mentorship_request`                                                                                       |
| **Variables**     | `{{studentName}}`, `{{programName}}`, `{{reason}}`, `{{requestedAt}}`, `{{acceptLink}}`, `{{declineLink}}` |
| **Frequency Cap** | Max 5 push/day; email digest if >5 pending                                                                 |

### N-ME-02: Session Reminder (24h)

| Field         | Value                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| **Trigger**   | 24 hours before scheduled session                                                                               |
| **Channel**   | Push + In-app + Email                                                                                           |
| **Template**  | `session_reminder_24h`                                                                                          |
| **Variables** | `{{menteeName}}`, `{{sessionType}}`, `{{scheduledAt}}`, `{{durationMinutes}}`, `{{meetingUrl}}`, `{{prepLink}}` |

### N-ME-03: Session Reminder (15min)

| Field         | Value                              |
| ------------- | ---------------------------------- |
| **Trigger**   | 15 minutes before session          |
| **Channel**   | Push + In-app                      |
| **Template**  | `session_reminder_15min`           |
| **Variables** | `{{menteeName}}`, `{{meetingUrl}}` |

### N-ME-04: Session Completed

| Field         | Value                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------- |
| **Trigger**   | Mentor completes session with notes                                                       |
| **Channel**   | In-app + Email summary                                                                    |
| **Template**  | `session_completed`                                                                       |
| **Variables** | `{{menteeName}}`, `{{sessionType}}`, `{{duration}}`, `{{actionItems}}`, `{{ratingGiven}}` |

### N-ME-05: New Message from Mentee

| Field         | Value                                                          |
| ------------- | -------------------------------------------------------------- |
| **Trigger**   | Mentee sends message                                           |
| **Channel**   | In-app (badge) + Push + Email (if offline >30min)              |
| **Template**  | `new_mentee_message`                                           |
| **Variables** | `{{menteeName}}`, `{{messagePreview}}`, `{{conversationLink}}` |

### N-ME-06: Goal Update Request

| Field         | Value                                             |
| ------------- | ------------------------------------------------- |
| **Trigger**   | Student requests goal progress update             |
| **Channel**   | In-app                                            |
| **Template**  | `goal_update_request`                             |
| **Variables** | `{{menteeName}}`, `{{goalTitle}}`, `{{goalLink}}` |

### N-ME-07: Mentee Portfolio Ready for Review

| Field         | Value                                      |
| ------------- | ------------------------------------------ |
| **Trigger**   | Mentee marks portfolio as ready for review |
| **Channel**   | In-app + Push                              |
| **Template**  | `portfolio_review_ready`                   |
| **Variables** | `{{menteeName}}`, `{{portfolioLink}}`      |

### N-ME-08: Career Milestone Achieved

| Field         | Value                                                                |
| ------------- | -------------------------------------------------------------------- |
| **Trigger**   | Mentee gets interview, offer, or job                                 |
| **Channel**   | In-app (celebration) + Push + Email                                  |
| **Template**  | `career_milestone`                                                   |
| **Variables** | `{{menteeName}}`, `{{milestoneType}}`, `{{company}}`, `{{jobTitle}}` |

### N-ME-09: Weekly Summary

| Field         | Value                                                                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Trigger**   | Every Monday 9:00 AM                                                                                                                   |
| **Channel**   | Email                                                                                                                                  |
| **Template**  | `mentor_weekly_summary`                                                                                                                |
| **Variables** | `{{sessionsCompleted}}`, `{{sessionsUpcoming}}`, `{{pendingRequests}}`, `{{unreadMessages}}`, `{{menteeUpdates}}`, `{{dashboardLink}}` |

### N-ME-10: Relationship Inactivity Warning

| Field         | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| **Trigger**   | No session for 45 days                                           |
| **Channel**   | In-app + Email                                                   |
| **Template**  | `relationship_inactivity`                                        |
| **Variables** | `{{menteeName}}`, `{{daysSinceLastSession}}`, `{{scheduleLink}}` |

### N-ME-11: Mentor Status Change

| Field         | Value                                               |
| ------------- | --------------------------------------------------- |
| **Trigger**   | Mentor status changes (at_capacity, on_break, etc.) |
| **Channel**   | In-app + Email (to admin)                           |
| **Template**  | `mentor_status_change`                              |
| **Variables** | `{{mentorName}}`, `{{oldStatus}}`, `{{newStatus}}`  |

---

## 10. Permission Matrix

| Entity               | Action            | Mentor        | Mentee   | Admin | Instructor    | Parent      |
| -------------------- | ----------------- | ------------- | -------- | ----- | ------------- | ----------- |
| Own Profile          | Read/Update       | âœ…            | âŒ       | âœ…    | âŒ            | âŒ          |
| Own Mentees          | List              | âœ…            | âŒ       | âœ…    | âŒ            | âŒ          |
| Mentee Detail        | Read              | âœ… (assigned) | âœ… (own) | âœ…    | âœ… (assigned) | âœ… (linked) |
| Mentee Career Goal   | Read/Update       | âœ…            | âœ…       | âœ…    | âŒ            | âŒ          |
| Sessions             | Create (own)      | âœ…            | âŒ       | âœ…    | âŒ            | âŒ          |
| Sessions             | Read (own)        | âœ…            | âœ… (own) | âœ…    | âŒ            | âŒ          |
| Sessions             | Update/Complete   | âœ…            | âŒ       | âœ…    | âŒ            | âŒ          |
| Sessions             | Cancel            | âœ…            | âœ… (own) | âœ…    | âŒ            | âŒ          |
| Session Notes        | Read              | âœ…            | âœ… (own) | âœ…    | âŒ            | âŒ          |
| Goals                | CRUD (own mentee) | âœ…            | âœ… (own) | âœ…    | âŒ            | âŒ          |
| Goal Milestones      | CRUD              | âœ…            | âœ… (own) | âœ…    | âŒ            | âŒ          |
| Portfolio            | Read              | âœ… (assigned) | âœ…       | âœ…    | âœ…            | âœ…          |
| Portfolio            | Review/Score      | âœ…            | âŒ       | âœ…    | âŒ            | âŒ          |
| Portfolio            | Edit              | âŒ            | âœ…       | âœ…    | âŒ            | âŒ          |
| Career Applications  | CRUD              | âœ…            | âœ…       | âœ…    | âŒ            | âŒ          |
| Readiness Assessment | Create            | âœ…            | âŒ       | âœ…    | âŒ            | âŒ          |
| Readiness Score      | Read              | âœ… (assigned) | âœ…       | âœ…    | âŒ            | âŒ          |
| Messages             | Send/Read (own)   | âœ…            | âœ…       | âœ…    | âŒ            | âŒ          |
| Resources            | CRUD (own)        | âœ…            | âŒ       | âœ…    | âŒ            | âŒ          |
| Resources            | Share             | âœ…            | âŒ       | âœ…    | âŒ            | âŒ          |
| Analytics            | View (own)        | âœ…            | âŒ       | âœ…    | âŒ            | âŒ          |
| Availability         | Set (own)         | âœ…            | âŒ       | âœ…    | âŒ            | âŒ          |
| Settings             | Edit (own)        | âœ…            | âŒ       | âœ…    | âŒ            | âŒ          |
| Mentor Requests      | Accept/Decline    | âœ…            | âŒ       | âœ…    | âŒ            | âŒ          |
| All Mentors          | List              | âŒ            | âŒ       | âœ…    | âŒ            | âŒ          |
| Assign Mentor        | Create            | âŒ            | âŒ       | âœ…    | âŒ            | âŒ          |

---

## 11. State Management

### Redux Slice

```typescript
interface MentorState {
  dashboard: {
    data: MentorDashboardResponse | null;
    loading: boolean;
    error: string | null;
  };
  selectedMenteeId: string | null;
  mentees: {
    data: MenteeDetail[];
    loading: boolean;
    error: string | null;
  };
  menteeDetail: Record<
    string,
    {
      profile: MenteeFullProfile | null;
      readiness: ReadinessAssessment | null;
      goals: MentorGoalDetail[];
      sessions: MentorSessionFull[];
      portfolio: PortfolioResponse | null;
      career: CareerTrackResponse | null;
      loading: boolean;
      error: string | null;
    }
  >;
  sessions: {
    upcoming: MentorSessionFull[];
    past: MentorSessionFull[];
    loading: boolean;
    error: string | null;
  };
  activeSession: {
    data: MentorSessionFull | null;
    timer: number; // seconds remaining
    isRunning: boolean;
    saving: boolean;
  };
  requests: {
    pending: MentorshipRequest[];
    loading: boolean;
    error: string | null;
  };
  messaging: {
    conversations: MentorConversationSummary[];
    activeConversationId: string | null;
    messages: MentorMessage[];
    messagesLoading: boolean;
    sending: boolean;
  };
  goals: {
    active: MentorGoalDetail[];
    completed: MentorGoalDetail[];
    saving: boolean;
    error: string | null;
  };
  resources: {
    items: MentorResource[];
    loading: boolean;
    sharing: boolean;
  };
  analytics: {
    data: MentorAnalyticsResponse | null;
    period: string;
    loading: boolean;
  };
  settings: {
    data: MentorSettingsResponse | null;
    saving: boolean;
  };
}
```

### RTK Query Endpoints

```typescript
const mentorApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/mentor" }),
  tagTypes: [
    "Dashboard",
    "Mentees",
    "MenteeDetail",
    "Sessions",
    "Requests",
    "Goals",
    "Portfolio",
    "Career",
    "Messages",
    "Resources",
    "Analytics",
    "Settings",
  ],
  endpoints: (builder) => ({
    getDashboard: builder.query<MentorDashboardResponse, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
      pollingInterval: 30000,
    }),
    getMentees: builder.query<MenteeDetail[], string | void>({
      query: (params) => ({ url: "/mentees", params: params ? { status: params } : {} }),
      providesTags: ["Mentees"],
    }),
    getMenteeDetail: builder.query<MenteeDetailResponse, string>({
      query: (id) => `/mentees/${id}`,
      providesTags: (result, err, id) => [{ type: "MenteeDetail", id }],
    }),
    getSessions: builder.query<MentorSessionFull[], { status?: string; menteeId?: string }>({
      query: (params) => ({ url: "/sessions", params }),
      providesTags: ["Sessions"],
    }),
    createSession: builder.mutation<MentorSessionFull, CreateSessionRequest>({
      query: (body) => ({ url: "/sessions", method: "POST", body }),
      invalidatesTags: ["Sessions", "Dashboard"],
    }),
    updateSession: builder.mutation<MentorSessionFull, { id: string; data: any }>({
      query: ({ id, data }) => ({ url: `/sessions/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Sessions"],
    }),
    startSession: builder.mutation<MentorSessionFull, string>({
      query: (id) => ({ url: `/sessions/${id}/start`, method: "POST" }),
      invalidatesTags: ["Sessions"],
    }),
    completeSession: builder.mutation<
      MentorSessionFull,
      { id: string; data: CompleteSessionRequest }
    >({
      query: ({ id, data }) => ({ url: `/sessions/${id}/complete`, method: "POST", body: data }),
      invalidatesTags: ["Sessions", "Dashboard", "MenteeDetail"],
    }),
    cancelSession: builder.mutation<void, { id: string; data: CancelSessionRequest }>({
      query: ({ id, data }) => ({ url: `/sessions/${id}/cancel`, method: "POST", body: data }),
      invalidatesTags: ["Sessions"],
    }),
    getPendingRequests: builder.query<MentorshipRequest[], void>({
      query: () => "/requests/pending",
      providesTags: ["Requests"],
    }),
    acceptRequest: builder.mutation<void, string>({
      query: (id) => ({ url: `/requests/${id}/accept`, method: "POST" }),
      invalidatesTags: ["Requests", "Mentees", "Dashboard"],
    }),
    declineRequest: builder.mutation<void, { id: string; data: DeclineRequestRequest }>({
      query: ({ id, data }) => ({ url: `/requests/${id}/decline`, method: "POST", body: data }),
      invalidatesTags: ["Requests"],
    }),
    getPortfolio: builder.query<PortfolioResponse, string>({
      query: (menteeId) => `/mentees/${menteeId}/portfolio`,
      providesTags: (result, err, id) => [{ type: "Portfolio", id }],
    }),
    submitPortfolioReview: builder.mutation<
      void,
      { menteeId: string; data: SubmitPortfolioReviewRequest }
    >({
      query: ({ menteeId, data }) => ({
        url: `/mentees/${menteeId}/portfolio/review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Portfolio", "MenteeDetail"],
    }),
    getGoals: builder.query<MentorGoalDetail[], { menteeId: string; status?: string }>({
      query: ({ menteeId, ...params }) => ({ url: `/mentees/${menteeId}/goals`, params }),
      providesTags: (result, err, { menteeId }) => [{ type: "Goals", id: menteeId }],
    }),
    createGoal: builder.mutation<void, CreateGoalRequest>({
      query: (body) => ({ url: "/goals", method: "POST", body }),
      invalidatesTags: ["Goals", "MenteeDetail"],
    }),
    updateGoalProgress: builder.mutation<void, { id: string; data: UpdateGoalProgressRequest }>({
      query: ({ id, data }) => ({ url: `/goals/${id}/progress`, method: "POST", body: data }),
      invalidatesTags: ["Goals"],
    }),
    completeGoal: builder.mutation<void, string>({
      query: (id) => ({ url: `/goals/${id}/complete`, method: "POST" }),
      invalidatesTags: ["Goals", "MenteeDetail"],
    }),
    getCareer: builder.query<CareerTrackResponse, string>({
      query: (menteeId) => `/mentees/${menteeId}/career`,
      providesTags: (result, err, id) => [{ type: "Career", id }],
    }),
    addApplication: builder.mutation<void, { menteeId: string; data: AddApplicationRequest }>({
      query: ({ menteeId, data }) => ({
        url: `/mentees/${menteeId}/career/applications`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Career"],
    }),
    updateApplication: builder.mutation<
      void,
      { menteeId: string; appId: string; data: UpdateApplicationRequest }
    >({
      query: ({ menteeId, appId, data }) => ({
        url: `/mentees/${menteeId}/career/applications/${appId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Career"],
    }),
    getConversations: builder.query<MentorConversationSummary[], void>({
      query: () => "/messages",
      providesTags: ["Messages"],
    }),
    getMessages: builder.query<MentorMessage[], string>({
      query: (conversationId) => `/messages/${conversationId}`,
      providesTags: (result, err, id) => [{ type: "Messages", id }],
    }),
    sendMessage: builder.mutation<void, { conversationId: string; data: SendMentorMessageRequest }>(
      {
        query: ({ conversationId, data }) => ({
          url: `/messages/${conversationId}`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Messages"],
      },
    ),
    startConversation: builder.mutation<{ conversationId: string }, StartConversationRequest>({
      query: (data) => ({ url: "/messages/new", method: "POST", body: data }),
      invalidatesTags: ["Messages"],
    }),
    getResources: builder.query<MentorResource[], void>({
      query: () => "/resources",
      providesTags: ["Resources"],
    }),
    createResource: builder.mutation<void, FormData>({
      query: (body) => ({ url: "/resources", method: "POST", body }),
      invalidatesTags: ["Resources"],
    }),
    shareResource: builder.mutation<void, { id: string; data: ShareResourceRequest }>({
      query: ({ id, data }) => ({ url: `/resources/${id}/share`, method: "POST", body: data }),
      invalidatesTags: ["Resources"],
    }),
    getAnalytics: builder.query<MentorAnalyticsResponse, string | void>({
      query: (period) => ({ url: "/analytics", params: period ? { period } : {} }),
      providesTags: ["Analytics"],
    }),
    getSettings: builder.query<MentorSettingsResponse, void>({
      query: () => "/settings",
      providesTags: ["Settings"],
    }),
    updateSettings: builder.mutation<void, Partial<MentorSettingsResponse>>({
      query: (body) => ({ url: "/settings", method: "PUT", body }),
      invalidatesTags: ["Settings"],
    }),
  }),
});
```

---

## 12. Form Schemas (Zod)

### Mentor Profile Settings

```typescript
export const MentorProfileSchema = z.object({
  mentorType: z.enum(["career", "academic", "peer", "alumni", "industry"]),
  title: z.string().min(2, "Title is required").max(200),
  company: z.string().max(200).optional().or(z.literal("")),
  jobTitle: z.string().max(200).optional().or(z.literal("")),
  bio: z.string().max(5000).optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  expertiseTags: z.array(z.string().max(50)).max(20).default([]),
});
```

### Availability Schedule

```typescript
export const AvailabilityDaySchema = z
  .object({
    dayOfWeek: z.number().int().min(0).max(6),
    isAvailable: z.boolean(),
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)")
      .optional(),
    endTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .optional(),
    maxSlots: z.number().int().min(1).max(10).optional(),
  })
  .refine(
    (data) => {
      if (data.isAvailable && data.startTime && data.endTime) {
        return data.startTime < data.endTime;
      }
      return true;
    },
    { message: "End time must be after start time", path: ["endTime"] },
  );

export const AvailabilitySchema = z
  .object({
    days: z.array(AvailabilityDaySchema).length(7),
    defaultSessionDuration: z.number().int().min(15).max(120).default(45),
    virtualMeetingUrl: z.string().url().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      const availableDays = data.days.filter((d) => d.isAvailable);
      return availableDays.length >= 3;
    },
    { message: "Must be available at least 3 days per week", path: ["days"] },
  );
```

### Create Session

```typescript
export const CreateSessionSchema = z.object({
  menteeId: z.string().uuid("Select a mentee"),
  sessionType: z.enum([
    "career_roadmap",
    "mock_interview",
    "resume_review",
    "portfolio_review",
    "goal_setting",
    "networking_strategy",
    "skills_assessment",
    "general_mentorship",
  ]),
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  description: z.string().max(2000).optional(),
  scheduledAt: z
    .string()
    .datetime("Invalid date format")
    .refine((val) => {
      return new Date(val) > new Date(Date.now() + 2 * 60 * 60 * 1000);
    }, "Sessions must be at least 2 hours from now"),
  durationMinutes: z.number().int().min(15).max(120).default(45),
  locationType: z.enum(["virtual", "in_person"]).default("virtual"),
  locationDetails: z.string().max(500).optional(),
  meetingUrl: z.string().url().optional(),
  agendaItems: z
    .array(
      z.object({
        title: z.string().min(1).max(200),
        duration: z.number().int().min(1).max(120),
      }),
    )
    .max(20)
    .optional(),
});
```

### Complete Session

```typescript
export const CompleteSessionSchema = z.object({
  liveNotes: z.string().max(10000).optional(),
  actionItems: z
    .array(
      z.object({
        text: z.string().min(1).max(500),
        assignedTo: z.enum(["mentor", "mentee"]),
        dueDate: z.string().datetime().optional(),
      }),
    )
    .max(20)
    .optional(),
  topicsCovered: z.array(z.string()).max(10).optional(),
  menteeRating: z.number().int().min(1).max(5).optional(),
  menteeFeedback: z.string().max(5000).optional(),
  mentorNotes: z.string().max(10000).optional(),
});
```

### Create Goal

```typescript
export const CreateGoalSchema = z.object({
  menteeId: z.string().uuid(),
  category: z.enum([
    "certification",
    "job_application",
    "networking",
    "skill_development",
    "portfolio",
    "resume",
    "interview_prep",
    "personal_development",
  ]),
  title: z.string().min(3, "Title is required").max(255),
  description: z.string().max(2000).optional(),
  targetDate: z
    .string()
    .datetime()
    .refine((val) => {
      return new Date(val) <= new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
    }, "Target date must be within 6 months")
    .optional(),
  milestones: z
    .array(
      z.object({
        title: z.string().min(1).max(255),
      }),
    )
    .max(20)
    .optional(),
});
```

### Portfolio Review

```typescript
export const PortfolioReviewSchema = z
  .object({
    overallScore: z.number().int().min(0).max(100),
    overallFeedback: z.string().max(5000),
    sectionScores: z.record(z.string(), z.number().int().min(0).max(100)),
    sectionFeedback: z.record(z.string(), z.string().max(2000)),
    status: z.enum(["approved", "changes_requested"]),
  })
  .refine(
    (data) => {
      return Object.keys(data.sectionScores).length >= 3;
    },
    { message: "At least 3 sections must be scored", path: ["sectionScores"] },
  );
```

### Career Application

```typescript
export const CareerApplicationSchema = z.object({
  companyName: z.string().min(1, "Company is required").max(255),
  jobTitle: z.string().min(1, "Job title is required").max(255),
  jobUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  appliedAt: z.string().datetime().optional(),
  notes: z.string().max(2000).optional(),
});
```

### Mentor Message

```typescript
export const MentorMessageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty").max(10000),
  contentType: z.enum(["text", "resource_share"]).default("text"),
  resourceId: z.string().uuid().optional(),
  attachmentUrl: z.string().url().optional(),
  attachmentName: z.string().max(255).optional(),
});
```

### Resource Creation

```typescript
export const MentorResourceSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().max(2000).optional(),
  resourceType: z.enum(["pdf", "link", "video", "article", "template", "course", "job_board"]),
  url: z.string().url().optional().or(z.literal("")),
  category: z
    .enum([
      "resume",
      "interview",
      "career_path",
      "skills",
      "networking",
      "certifications",
      "general",
    ])
    .default("general"),
  tags: z.array(z.string().max(50)).max(10).optional(),
});
```

---

## 13. Analytics Events

| Event                               | Properties                                                 | Trigger                    |
| ----------------------------------- | ---------------------------------------------------------- | -------------------------- |
| `mentor_login`                      | `mentorType`, `menteeCount`                                | Mentor logs in             |
| `mentor_dashboard_view`             | `menteeCount`, `pendingSessions`, `pendingRequests`        | Dashboard loaded           |
| `mentor_profile_setup`              | `mentorType`, `completionPercentage`                       | Profile setup completed    |
| `mentor_availability_set`           | `daysAvailable`, `totalSlots`                              | Availability saved         |
| `mentor_request_accepted`           | `menteeId`, `menteeProgram`                                | Request accepted           |
| `mentor_request_declined`           | `reason`                                                   | Request declined           |
| `mentor_mentee_view`                | `menteeId`, `tab`                                          | Mentee profile viewed      |
| `mentor_session_created`            | `sessionType`, `duration`, `locationType`                  | Session created            |
| `mentor_session_started`            | `sessionId`, `sessionType`                                 | Session started            |
| `mentor_session_completed`          | `sessionId`, `duration`, `topicsCount`, `actionItemsCount` | Session completed          |
| `mentor_session_cancelled`          | `reason`, `byWhom`                                         | Session cancelled          |
| `mentor_session_no_show`            | `menteeId`                                                 | Mentee no-show             |
| `mentor_portfolio_reviewed`         | `menteeId`, `overallScore`, `status`                       | Portfolio review submitted |
| `mentor_goal_created`               | `category`, `hasMilestones`                                | Goal created               |
| `mentor_goal_completed`             | `category`, `weeksToComplete`                              | Goal marked complete       |
| `mentor_goal_progress_updated`      | `goalId`, `newProgress`                                    | Progress updated           |
| `mentor_career_application_added`   | `company`, `stage`                                         | Application added          |
| `mentor_career_application_updated` | `appId`, `oldStage`, `newStage`                            | Stage changed              |
| `mentor_career_milestone`           | `type`, `company`                                          | Milestone achieved         |
| `mentor_skills_gap_viewed`          | `menteeId`                                                 | Skills gap tab opened      |
| `mentor_message_sent`               | `conversationId`, `contentType`                            | Message sent               |
| `mentor_resource_created`           | `resourceType`, `category`                                 | Resource created           |
| `mentor_resource_shared`            | `resourceId`, `menteeCount`                                | Resource shared            |
| `mentor_analytics_viewed`           | `period`, `menteeCount`                                    | Analytics page loaded      |
| `mentor_relationship_ended`         | `reason`, `durationWeeks`                                  | Relationship ended         |
| `mentor_settings_updated`           | `section`                                                  | Settings saved             |

---

## 14. Accessibility Requirements

**Global:**

- `role="navigation"` on sidebar with `aria-label="Mentor navigation"`
- Skip-to-content link: "Skip to main content"
- All interactive elements focusable via keyboard
- Color-coded readiness scores (green â‰¥80%, yellow 60-79%, orange 40-59%, red <40%) with text labels
- Consistent heading hierarchy (h1-h6)

**Key Components:**

- MenteeCard: `aria-label="Mentee: {{name}}, Readiness: {{score}}%, Status: {{status}}"`
- ReadinessScoreRing: SVG with `role="img"`, `aria-label="Readiness score {{score}}%"`
- SessionCard: `aria-label="Session with {{menteeName}}, {{sessionType}}, {{time}}"`
- AgendaTracker: `aria-label="Session agenda, {{completed}} of {{total}} items done"`
- LiveNotesEditor: `aria-label="Session notes"`, `aria-describedby="auto-saving status"`
- ActionItemsList: `role="list"`, each item `aria-label="Action: {{text}}, assigned to {{assignee}}, due {{date}}"`
- PipelineKanban: `role="list"`, each column `aria-label="{{stage}} stage, {{count}} items"`
- ApplicationCard: `role="listitem"`, `aria-label="{{company}} - {{title}}, {{stage}}"`
- GoalCard: `aria-label="Goal: {{title}}, progress {{progress}}%, category {{category}}"`
- PortfolioSection: `aria-label="Portfolio section: {{name}}, score {{score}}"`
- MessageBubble: `aria-label="Message from {{sender}}: {{preview}}"`, sent/received styling with text
- ResourceCard: `aria-label="Resource: {{title}}, type {{type}}, category {{category}}"`
- MentorAnalyticsChart: `role="img"`, `aria-label="Readiness trend chart"`, data table fallback
- Timer in session: `aria-live="polite"`, announces remaining time every 5 minutes
- AvailabilityEditor: Day rows with `aria-label="{{day}} availability"`, time inputs labeled

---

## 15. Error & Edge Case Catalog

| #   | Scenario                               | User Message                                                  | Recovery                                            |
| --- | -------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------- |
| E1  | Dashboard fails to load                | "Unable to load dashboard. [Retry]"                           | Retry with exponential backoff                      |
| E2  | Mentee list fails to load              | "Failed to load mentee list. [Retry]"                         | Show cached data if available                       |
| E3  | Mentee profile not found (404)         | "Mentee not found or no longer in your roster."               | Back to mentee list                                 |
| E4  | Session create conflicts with existing | "You already have a session scheduled at this time."          | Show overlapping session, suggest alternatives      |
| E5  | Session create in the past             | "Cannot schedule a session in the past."                      | Reset date picker to future                         |
| E6  | Session start fails (already started)  | "This session was already started by another device."         | Reload session state                                |
| E7  | Session complete fails (already ended) | "This session has already been completed."                    | Reload, view summary                                |
| E8  | Mentee no-show at session              | "{{menteeName}} didn't join. Mark as no-show?"                | Auto-detect after 15 min, offer reschedule          |
| E9  | Accept request when at capacity        | "Cannot accept: you've reached your maximum mentee capacity." | Increase capacity in settings or decline            |
| E10 | Portfolio review save fails            | "Failed to save portfolio review. [Retry]"                    | Auto-save draft, recover on reload                  |
| E11 | Goal target date too far               | "Goal target date must be within 6 months."                   | Adjust date                                         |
| E12 | Duplicate goal title                   | "A goal with this title already exists for this mentee."      | Modify title                                        |
| E13 | Career application duplicate           | "An application for {{company}} - {{title}} already exists."  | Update existing instead                             |
| E14 | Resource file too large                | "File must be under 25MB."                                    | Compress or choose different file                   |
| E15 | Message send fails                     | "Failed to send message. [Retry]"                             | Save to local drafts, retry                         |
| E16 | Session timer drifts                   | Timer doesn't match actual elapsed time                       | Sync with server on each tick                       |
| E17 | Mentor goes on break mid-relationship  | "Your mentees will be notified that you're on break."         | Auto-reply message, reassign?                       |
| E18 | Mentee relationship ends unexpectedly  | Mentee graduates, drops, or transfers                         | Archive relationship, notify admin for reassignment |
| E19 | Analytics insufficient data            | "Not enough data to show trends. Continue having sessions!"   | Show placeholder chart                              |
| E20 | Meeting URL invalid                    | "The meeting link appears to be invalid. [Update]"            | Update in settings                                  |
| E21 | Multiple tabs open (conflict)          | "You have this session open in another tab."                  | Sync state across tabs                              |
| E22 | Network disconnected during session    | "You're offline. Notes will be saved when reconnected."       | LocalStorage buffer, sync on reconnect              |
| E23 | Mentee requests to end relationship    | "{{menteeName}} has requested to end this mentorship."        | Review and confirm/decline                          |
| E24 | Mentor account deactivated             | "Your mentor account has been deactivated. Contact admin."    | Show reason, contact support                        |

---

_End of Mentor Actor Plan — 05_

