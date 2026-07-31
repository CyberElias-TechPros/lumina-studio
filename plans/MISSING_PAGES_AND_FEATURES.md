# CEA-OS / Lumina Studio — Missing Pages & Features Checklist

> Every page/feature specified in the `.md` plan files that is **not yet implemented** in the app.
> Generated from: `CEA_OS_MASTER_PLAN.md`, `CEA_OS_GRAND_MASTER_PLAN_P1-P3.md`, `CEA_OS_DESIGN_LANGUAGE.md`, and all `plan-actors/*.md`.
> Sources are cited per item (`<plan file>`). Status legend: `[ ]` not started.

---

## 0. Current State

### Existing routes (`src/routes/`) — all placeholder stubs

| Route                           | File                                       | Notes                                 |
| ------------------------------- | ------------------------------------------ | ------------------------------------- |
| `/`                             | `index.tsx`                                | Landing (only page with real content) |
| `/about`                        | `about.tsx`                                | Stub                                  |
| `/admissions`                   | `admissions.tsx`                           | Stub                                  |
| `/alumni`                       | `alumni.tsx`                               | Stub                                  |
| `/app`                          | `app.index.tsx`                            | Stub — no role dashboards             |
| `/auth/sign-in`                 | `auth.sign-in.tsx`                         | Stub                                  |
| `/auth/sign-up`                 | `auth.sign-up.tsx`                         | Stub                                  |
| `/auth/forgot-password`         | `auth.forgot-password.tsx`                 | Stub                                  |
| `/blog` + `/blog/:slug`         | `blog.index.tsx`, `blog.$slug.tsx`         | Stubs                                 |
| `/community`                    | `community.tsx`                            | Stub                                  |
| `/contact`                      | `contact.tsx`                              | Stub                                  |
| `/engines`                      | `engines.tsx`                              | Stub                                  |
| `/events`                       | `events.tsx`                               | Stub                                  |
| `/marketplace`                  | `marketplace.tsx`                          | Stub                                  |
| `/partners`                     | `partners.tsx`                             | Stub                                  |
| `/pricing`                      | `pricing.tsx`                              | Stub                                  |
| `/programs` + `/programs/:slug` | `programs.index.tsx`, `programs.$slug.tsx` | Stubs                                 |
| `/services`                     | `services.tsx`                             | Stub                                  |
| `/work`                         | `work.tsx`                                 | Stub                                  |

---

## 1. Public / Marketing Pages

| Page                                            | Route                         | Source                                                           |
| ----------------------------------------------- | ----------------------------- | ---------------------------------------------------------------- |
| [ ] Multi-step application form                 | `/apply` and `/apply/[step]`  | `01-prospective-student.md` §3.4                                 |
| [ ] Application status tracker                  | `/apply/status/[id]`          | `01-prospective-student.md` §3.5                                 |
| [ ] Scholarship inquiry & eligibility estimator | `/scholarships`               | `01-prospective-student.md` §3.6, `26-ngo.md`                    |
| [ ] Virtual campus tour                         | `/virtual-tour`               | `01-prospective-student.md` §3.7                                 |
| [ ] Program comparison tool                     | `/programs/compare?ids=a,b,c` | `01-prospective-student.md` §3.8                                 |
| [ ] Public certificate verification             | `/certificates/verify`        | `02-current-student.md`, `site.ts` FAQ                           |
| [ ] Public FAQ / knowledge base                 | `/faq` or `/knowledge-base`   | `CEA_OS_MASTER_PLAN.md` (Module 47), `01-prospective-student.md` |
| [ ] Visitor visit request + QR check-in         | `/visit`                      | `16-visitor.md` §3.1–3.2                                         |
| [ ] Visitor brochure / campus map               | `/visit/info`                 | `16-visitor.md` §3.3                                             |
| [ ] Visitor post-visit feedback                 | `/visit/feedback`             | `16-visitor.md` §3.4                                             |
| [ ] Success stories / testimonials page         | `/stories`                    | `15-alumni.md` §3.7                                              |
| [ ] Academy careers page (staff jobs)           | `/careers`                    | `19-hr-officer.md`                                               |
| [ ] Newsletter subscribe (form + API)           | anywhere                      | `01-prospective-student.md` (`POST /api/newsletter/subscribe`)   |
| [ ] Digital brochure / campus map for walk-ins  | `/visit/brochure`             | `16-visitor.md` §3.3                                             |

## 2. Authentication (Master Plan §1.3 / Phase 0)

| Page                                     | Route                  | Notes                                 |
| ---------------------------------------- | ---------------------- | ------------------------------------- |
| [ ] Email verification                   | `/auth/verify-email`   | Resend flow                           |
| [ ] Password reset (actual reset form)   | `/auth/reset-password` | Only forgot-password stub exists      |
| [ ] MFA setup / TOTP verification        | `/auth/mfa`            | Authenticator app + SMS backup        |
| [ ] OAuth (Google/GitHub/Microsoft) flow | —                      | PKCE, in sign-in/sign-up              |
| [ ] Magic link flow                      | —                      | One-time use, 15min expiry            |
| [ ] Role selection at sign-up            | `/auth/sign-up`        | student / employer / client / parent… |
| [ ] New-device login alert screen        | —                      | Security notification                 |

## 3. Student Portal (`02-current-student.md`)

| Page                                                                                 | Route                          |
| ------------------------------------------------------------------------------------ | ------------------------------ |
| [ ] Student Dashboard (upcoming classes, pending assignments, grades, announcements) | `/dashboard`                   |
| [ ] Learning Hub (enrolled courses, modules, progress)                               | `/learning`                    |
| [ ] Lesson Viewer (video/text/materials/prev-next)                                   | `/learning/lessons/[lessonId]` |
| [ ] Assignments Center                                                               | `/assignments`                 |
| [ ] Assignment Detail / Submission                                                   | `/assignments/[id]`            |
| [ ] Assessments / Quiz list                                                          | `/assessments`                 |
| [ ] Assessment Player (timer, navigation, proctoring)                                | `/assessments/[id]/take`       |
| [ ] Gradebook                                                                        | `/grades`                      |
| [x] Portfolio Builder (projects, skills, CV generator, share)                        | `/portfolio`                   |
| [ ] Calendar (classes, deadlines, events, mentor sessions)                           | `/calendar`                    |
| [ ] Messaging (DMs, group chats)                                                     | `/messages`                    |
| [x] Finance (tuition, invoices, receipts)                                            | `/finance`                     |
| [x] Attendance (history, QR check-in)                                                | `/attendance`                  |
| [x] Certificates (view, verify, share)                                               | `/certificates`                |
| [x] Live class (video + chat + whiteboard + polls + hand-raise)                      | `/live/[classId]`              |

## 4. Parent Portal (`03-parent.md`)

| Page                                                                   | Route                                 |
| ---------------------------------------------------------------------- | ------------------------------------- |
| [x] Parent Dashboard                                                   | `/parent/dashboard`                   |
| [x] Student Overview                                                   | `/parent/students/[id]/overview`      |
| [x] Academic Progress / Gradebook                                      | `/parent/students/[id]/grades`        |
| [x] Attendance Report                                                  | `/parent/students/[id]/attendance`    |
| [x] Finance / Billing (pay online)                                     | `/parent/students/[id]/finance`       |
| [x] Communication (message instructors/staff, parent-teacher meetings) | `/parent/students/[id]/communication` |
| [x] Reports (term reports, progress summaries)                         | `/parent/students/[id]/reports`       |
| [x] Parent invitation accept                                           | `/parent/invitation/accept`           |

## 5. Instructor Portal (`04-instructor.md`)

| Page                                                        | Route                                                         |
| ----------------------------------------------------------- | ------------------------------------------------------------- |
| [ ] Instructor Dashboard                                    | `/instructor/dashboard`                                       |
| [ ] Course Builder (modules, lessons, reorder, publish)     | `/instructor/courses`, `/instructor/courses/[id]`             |
| [ ] Lesson Creator                                          | `/instructor/lessons/create`, `/instructor/lessons/edit/[id]` |
| [ ] Assignment Center                                       | `/instructor/assignments`                                     |
| [ ] Assignment Grader (rubric, feedback)                    | `/instructor/assignments/[id]/grade`                          |
| [ ] Assessment Engine (quizzes/exams, auto-grade)           | `/instructor/assessments`                                     |
| [ ] Gradebook Management (inline edit, overrides, disputes) | `/instructor/gradebook`                                       |
| [ ] Attendance Marker (QR + manual + bulk)                  | `/instructor/attendance`                                      |
| [ ] Analytics (performance trends, at-risk students)        | `/instructor/analytics`                                       |
| [ ] Calendar (classes, office hours)                        | `/instructor/calendar`                                        |
| [ ] Announcements                                           | —                                                             |

## 6. Mentor Portal (`05-mentor.md`)

| Page                                               | Route                                                    |
| -------------------------------------------------- | -------------------------------------------------------- |
| [x] Mentor Dashboard                               | `/mentor/dashboard`                                      |
| [x] Mentee Overview                                | `/mentor/mentees/[id]`                                   |
| [x] Session Hub (schedule, notes, action items)    | `/mentor/sessions`, `/mentor/sessions/[id]`              |
| [x] Portfolio Reviewer (feedback, endorse skills)  | `/mentor/mentees/[id]/portfolio`                         |
| [x] Career Tracking (applications, interview prep) | `/mentor/mentees/[id]/career`, `/mentor/career-tracking` |
| [x] Goal Management (milestones, progress)         | `/mentor/mentees/[id]/goals`, `/mentor/goals`            |
| [ ] Messaging                                      | `/mentor/messages`                                       |
| [x] Resources Library                              | `/mentor/resources`                                      |
| [x] Analytics & Reports                            | `/mentor/analytics`                                      |
| [x] Availability & Settings                        | `/mentor/settings`                                       |
| [x] Mentorship request inbox (accept/decline)      | `/mentor/requests`                                       |

## 7. Department Head Portal (`06-department-head.md`)

| Page                                                 | Route               |
| ---------------------------------------------------- | ------------------- |
| [x] Department Overview Dashboard                    | `/dept/dashboard`   |
| [x] Curriculum Manager (program versions, approvals) | `/dept/curriculum`  |
| [x] Instructor Management (workload, performance)    | `/dept/instructors` |
| [x] Quality Assurance (observations, evaluations)    | `/dept/quality`     |
| [x] Reports & Analytics                              | `/dept/reports`     |
| [x] Approvals (curriculum, courses, leave)           | `/dept/approvals`   |
| [x] Calendar (department events, academic calendar)  | `/dept/calendar`    |
| [x] Program Enrollment overview                      | `/dept/enrollment`  |

## 8. Receptionist Portal (`07-receptionist.md`)

| Page                                                  | Route                        |
| ----------------------------------------------------- | ---------------------------- |
| [x] Front Desk Hub                                    | `/receptionist/dashboard`    |
| [x] Visitor Check-In (ID capture, badge, notify host) | `/receptionist/check-in`     |
| [x] Visitor Check-Out                                 | `/receptionist/check-out`    |
| [x] Appointment Scheduler                             | `/receptionist/appointments` |
| [x] Inquiry Log (walk-ins → CRM leads)                | `/receptionist/inquiries`    |
| [x] Phone Log                                         | `/receptionist/phone-log`    |
| [x] Delivery Log                                      | `/receptionist/deliveries`   |
| [x] Staff Directory                                   | `/receptionist/directory`    |
| [x] Shift & Task Management                           | `/receptionist/tasks`        |

## 9. Operations Manager Portal (`08-operations-manager.md`)

| Page                                                       | Route             |
| ---------------------------------------------------------- | ----------------- |
| [x] Operations Hub                                         | `/ops/dashboard`  |
| [x] Branch Management (multi-branch, resource utilization) | `/ops/branches`   |
| [x] Inventory Management (stock, reorder alerts, POs)      | `/ops/inventory`  |
| [x] Facilities Management (room booking, maintenance)      | `/ops/facilities` |
| [x] Task Management (assign, track, workflows)             | `/ops/tasks`      |
| [x] Process Automation (workflow builder)                  | `/ops/automation` |
| [x] Vendor Management (contracts, performance)             | `/ops/vendors`    |
| [x] Reports & Analytics (efficiency, cost per branch)      | `/ops/reports`    |

## 10. Director Portal (`09-director.md`)

| Page                                                      | Route                      |
| --------------------------------------------------------- | -------------------------- |
| [x] Executive Command Center (real-time KPIs, NPS)        | `/director/command-center` |
| [x] Financial Overview (revenue, expenses, forecasts)     | `/director/finance`        |
| [x] Academic Overview (enrollment, completion, placement) | `/director/academic`       |
| [x] Operations Overview (branch performance)              | `/director/operations`     |
| [x] HR Overview (headcount, turnover, satisfaction)       | `/director/hr`             |
| [x] Marketing Overview (CAC, funnel, campaign ROI)        | `/director/marketing`      |
| [x] Approvals (budgets, hires, partnerships, POs)         | `/director/approvals`      |
| [x] Strategic Planning / OKRs                             | `/director/okrs`           |
| [x] Reports Drill-Down (any module, any department)       | `/director/reports`        |

## 11. Client Portal (`10-client.md`)

| Page                                                       | Route                         |
| ---------------------------------------------------------- | ----------------------------- |
| [x] Client Portal Home                                     | `/client/portal`              |
| [x] Proposals (view, accept/reject, negotiate)             | `/client/proposals`           |
| [x] Project Dashboard (timeline, milestones, deliverables) | `/client/projects/[id]`       |
| [x] Task Board (comment, approve deliverables)             | `/client/projects/[id]/tasks` |
| [x] Invoices & Payments (pay online, receipts)             | `/client/invoices`            |
| [x] Support Tickets (create, track, SLA)                   | `/client/support`             |
| [x] Contracts (view, terms, renewals)                      | `/client/contracts`           |
| [x] Documents (shared files, SOW, reports)                 | `/client/documents`           |
| [x] Messaging (with project team)                          | `/client/messages`            |

## 12. Employer Portal (`11-employer.md`)

| Page                                                 | Route                        |
| ---------------------------------------------------- | ---------------------------- |
| [x] Employer Hub                                     | `/employer/hub`              |
| [x] Job Management (post, edit, close, applications) | `/employer/jobs`             |
| [x] Talent Search (browse portfolios by skill/cert)  | `/employer/talent`           |
| [x] Candidate Pipeline (shortlist, reject)           | `/employer/pipeline/[jobId]` |
| [x] Interview Scheduler                              | `/employer/interviews`       |
| [x] Feedback & Reviews (post-interview, post-hire)   | `/employer/feedback`         |
| [x] Analytics (time-to-hire, retention)              | `/employer/analytics`        |
| [x] Brand Page (company profile)                     | `/employer/brand`            |

## 13. Partner Portal (`12-partner.md`)

| Page                                             | Route                     |
| ------------------------------------------------ | ------------------------- |
| [x] Partnership Hub                              | `/partner/hub`            |
| [x] Agreements (MOUs, contracts, terms)          | `/partner/agreements`     |
| [x] Collaborations (co-branded events, programs) | `/partner/collaborations` |
| [x] Referral Portal (track referrals, payouts)   | `/partner/referrals`      |
| [x] Resources (co-branded materials, logos)      | `/partner/resources`      |
| [x] Reports (impact, revenue share)              | `/partner/reports`        |
| [x] Messaging                                    | `/partner/messages`       |

## 14. Volunteer Portal (`13-volunteer.md`)

| Page                                       | Route                        |
| ------------------------------------------ | ---------------------------- |
| [x] Opportunities                          | `/volunteer/opportunities`   |
| [x] My Volunteering (sign-ups, history)    | `/volunteer/my-volunteering` |
| [x] Hours Tracker (clock in/out, approval) | `/volunteer/hours`           |
| [x] Community (group chat, forums)         | `/volunteer/community`       |
| [x] Certificates (appreciation)            | `/volunteer/certificates`    |
| [x] Impact Dashboard                       | `/volunteer/impact`          |

## 15. Intern Portal (`14-intern.md`)

| Page                                            | Route                   |
| ----------------------------------------------- | ----------------------- |
| [x] Intern Hub (Dashboard)                      | `/intern`               |
| [x] Tasks (assigned, submit deliverables)       | `/intern/tasks`         |
| [x] Timesheet (log hours, approval)             | `/intern/timesheet`     |
| [x] Mentorship (sessions, notes)                | `/intern/mentorship`    |
| [x] Learning Plan                               | `/intern/learning-plan` |
| [x] Evaluation (self, supervisor, final review) | `/intern/evaluation`    |
| [x] Portfolio                                   | `/intern/portfolio`     |
| [x] Messaging                                   | `/intern/messages`      |

## 16. Alumni Portal (`15-alumni.md`)

| Page                                              | Route                |
| ------------------------------------------------- | -------------------- |
| [x] Alumni Hub (Dashboard)                        | `/alumni/hub`        |
| [x] Network Directory (search, connect, message)  | `/alumni/network`    |
| [ ] Mentorship Sign-Up (offer to mentor)          | `/alumni/mentorship` |
| [x] Job Board (browse, refer jobs)                | `/alumni/jobs`       |
| [x] Events (reunions, RSVP)                       | `/alumni/events`     |
| [x] Give Back / Donations                         | `/alumni/give-back`  |
| [ ] Success Stories (share journey, get featured) | `/alumni/stories`    |
| [ ] Profile (employment, achievements)            | `/alumni/profile`    |

## 17. Supplier Portal (`17-supplier.md`)

| Page                                           | Route                   |
| ---------------------------------------------- | ----------------------- |
| [x] Supplier Hub (Dashboard)                   | `/supplier`             |
| [x] Orders / Purchase Orders (confirm, status) | `/supplier/orders`      |
| [x] Deliveries (schedule, mark delivered)      | `/supplier/deliveries`  |
| [x] Invoices (submit, track payment)           | `/supplier/invoices`    |
| [x] Company Profile (catalog, certifications)  | `/supplier/profile`     |
| [x] Messaging (procurement)                    | `/supplier/messages`    |
| [x] Performance Ratings                        | `/supplier/performance` |

## 18. Accountant Portal (`18-accountant.md`)

| Page                                              | Route                |
| ------------------------------------------------- | -------------------- |
| [x] Finance Hub (AR, AP, cash flow, bank balance) | `/finance/hub`       |
| [x] Invoicing (create, send, track)               | `/finance/invoicing` |
| [x] Billing / Accounts Payable                    | `/finance/billing`   |
| [x] Payments (manual/batch, reconcile)            | `/finance/payments`  |
| [x] Expenses (claims, approve, reimburse)         | `/finance/expenses`  |
| [x] Payroll (salaries, deductions, payslips)      | `/finance/payroll`   |
| [x] Budgets (dept budgets vs actual)              | `/finance/budgets`   |
| [x] Reports (P&L, balance sheet, cash flow, tax)  | `/finance/reports`   |
| [x] Banking Reconciliation                        | `/finance/banking`   |
| [x] Audit Log                                     | `/finance/audit`     |

## 19. HR Officer Portal (`19-hr-officer.md`)

| Page                                                         | Route               |
| ------------------------------------------------------------ | ------------------- |
| [x] HR Hub (headcount, open positions, leave, reviews)       | `/hr`               |
| [x] Recruitment (postings, applications, interviews, offers) | `/hr/recruitment`   |
| [x] Employee Database (contracts, documents, history)        | `/hr/employees`     |
| [x] Leave Management (requests, balances, calendar)          | `/hr/leave`         |
| [x] Attendance (staff, lateness, absenteeism)                | `/hr/attendance`    |
| [x] Performance Reviews (cycles, goals, appraisals)          | `/hr/performance`   |
| [x] Payroll Input (changes → finance)                        | `/hr/payroll-input` |
| [x] Onboarding/Offboarding Checklists                        | `/hr/onboarding`    |
| [x] Training Records                                         | `/hr/training`      |
| [x] HR Reports (turnover, satisfaction, compliance)          | `/hr/reports`       |

## 20. Admissions Officer Portal (`20-admissions-officer.md`)

| Page                                                       | Route                           |
| ---------------------------------------------------------- | ------------------------------- |
| [x] Admissions Hub (volume, funnel, targets)               | `/admissions/hub`               |
| [x] Applications Pipeline (filter by status/stage/program) | `/admissions/applications`      |
| [x] Application Detail View                                | `/admissions/applications/[id]` |
| [x] Review Pipeline (shortlist/reject, notes)              | `/admissions/review`            |
| [x] Interview Scheduler                                    | `/admissions/interviews`        |
| [x] Document Verification (checklists)                     | `/admissions/documents`         |
| [x] Communication Center (offer letters, templates)        | `/admissions/communication`     |
| [x] Enrollment Tracker (paid vs pending, orientation)      | `/admissions/enrollment`        |
| [x] Reports (conversion, sources, demographics)            | `/admissions/reports`           |

## 21. Marketing Officer Portal (`21-marketing-officer.md`)

| Page                                                 | Route                         |
| ---------------------------------------------------- | ----------------------------- |
| [x] Marketing Hub                                    | `/marketing`                  |
| [x] Campaigns (multi-channel, budget, ROI)           | `/marketing/campaigns`        |
| [x] Content Calendar                                 | `/marketing/content-calendar` |
| [x] Email Marketing (campaigns, lists, opens/clicks) | `/marketing/email`            |
| [x] Landing Page Builder (+A/B testing)              | `/marketing/landing-pages`    |
| [x] Lead Management (score, route)                   | `/marketing/leads`            |
| [x] SEO Dashboard (keywords, rank tracking)          | `/marketing/seo`              |
| [x] Social Media Scheduler                           | `/marketing/social`           |
| [x] Analytics (CAC, ROAS, attribution)               | `/marketing/analytics`        |
| [x] Reports                                          | `/marketing/reports`          |

## 22. IT Support Portal (`22-it-support.md`)

| Page                                      | Route                |
| ----------------------------------------- | -------------------- |
| [x] Ticket Hub (queue, SLA timers)        | `/it/tickets`        |
| [x] Ticket Management                     | `/it/tickets/[id]`   |
| [x] Asset Management (hardware lifecycle) | `/it/assets`         |
| [x] System Monitoring                     | `/it/monitoring`     |
| [x] Knowledge Base (internal IT docs)     | `/it/knowledge-base` |
| [x] User Management (accounts, resets)    | `/it/users`          |
| [x] Remote Support                        | `/it/remote-support` |
| [x] Reports                               | `/it/reports`        |
| [x] Ticket Templates                      | `/it/templates`      |
| [x] Scheduled Maintenance                 | `/it/maintenance`    |
| [x] Software License Management           | `/it/licenses`       |

## 23. Developer Portal (`23-developer.md`)

| Page                                                 | Route                 |
| ---------------------------------------------------- | --------------------- |
| [x] Dev Hub                                          | `/dev`                |
| [x] API Playground (Swagger/OpenAPI, test endpoints) | `/dev/api-playground` |
| [x] Deployments (history, rollback)                  | `/dev/deployments`    |
| [x] Monitoring & Errors                              | `/dev/monitoring`     |
| [x] Tasks                                            | `/dev/tasks`          |
| [x] Git/PR Status                                    | `/dev/git`            |
| [x] Documentation (internal dev docs)                | `/dev/docs`           |
| [x] Team / Code Review Queue                         | `/dev/reviews`        |
| [x] Environment Variables                            | `/dev/env`            |
| [x] Background Jobs / Queues                         | `/dev/queues`         |
| [x] Service Dependencies                             | `/dev/dependencies`   |
| [x] Feature Flags                                    | `/dev/feature-flags`  |

## 24. System Administrator Portal (`24-system-administrator.md`)

| Page                                                            | Route                 |
| --------------------------------------------------------------- | --------------------- |
| [x] Admin Hub (system health, security alerts)                  | `/admin`              |
| [x] User Management                                             | `/admin/users`        |
| [x] Roles & Permissions (RBAC config, audit)                    | `/admin/roles`        |
| [x] Security Dashboard (logins, 2FA, API keys, IP whitelist)    | `/admin/security`     |
| [x] Audit Log (search, export)                                  | `/admin/audit`        |
| [x] System Configuration (settings, feature flags, maintenance) | `/admin/config`       |
| [x] Monitoring (CPU, memory, error rate)                        | `/admin/monitoring`   |
| [x] Backups (schedule, restore, retention)                      | `/admin/backups`      |
| [x] Integrations & Webhooks                                     | `/admin/integrations` |
| [x] Logs (app, error, access)                                   | `/admin/logs`         |
| [x] API Keys & Service Tokens                                   | `/admin/api-keys`     |
| [x] Rate Limiting & Throttling                                  | `/admin/rate-limits`  |

## 25. Government Representative Portal (`25-government-representative.md`)

| Page                                                | Route                     |
| --------------------------------------------------- | ------------------------- |
| [x] Compliance Portal (accreditation status, score) | `/compliance`             |
| [x] Institutional Data                              | `/compliance/institution` |
| [x] Regulatory Reports                              | `/compliance/reports`     |
| [x] Documentation Library (policies, certificates)  | `/compliance/documents`   |
| [x] Audit Module (schedule, findings, remediation)  | `/compliance/audit`       |
| [x] Filings & Timeline                              | `/compliance/filings`     |
| [x] Messaging                                       | `/compliance/messaging`   |
| [x] Compliance Calendar                             | `/compliance/calendar`    |
| [x] Data Integrity Verification                     | `/compliance/integrity`   |
| [x] Compliance Training & Certifications            | `/compliance/training`    |
| [x] Regulatory Change Log                           | `/compliance/changelog`   |

## 26. NGO Portal (`26-ngo.md`)

| Page                                                        | Route                       |
| ----------------------------------------------------------- | --------------------------- |
| [x] Partnership Hub                                         | `/ngo`                      |
| [x] Scholarship Management (funds, selection, disbursement) | `/ngo/scholarships`         |
| [x] Community Programs (outreach, beneficiaries)            | `/ngo/programs`             |
| [x] Volunteer Coordination                                  | `/ngo/volunteers`           |
| [x] Impact Reports                                          | `/ngo/reports`              |
| [x] Donations Tracking                                      | `/ngo/donations`            |
| [x] Messaging                                               | `/ngo/messaging`            |
| [x] Program Budget & Expenses                               | `/ngo/programs/[id]/budget` |
| [x] Partner Reports & Analytics                             | `/ngo/analytics`            |

## 27. Conversion Copywriter (`27-conversion-copywriter.md`)

| Page                         | Route                                 |
| ---------------------------- | ------------------------------------- |
| [x] Copy Asset Library       | `/conversion-copy/library`            |
| [x] Landing Page Copy Editor | `/conversion-copy/landing-pages/[id]` |
| [x] Email Sequence Builder   | `/conversion-copy/email-sequences`    |
| [x] Ad Copy Manager          | `/conversion-copy/ads`                |
| [x] A/B Test Copy Dashboard  | `/conversion-copy/ab-tests`           |
| [x] Conversion Analytics     | `/conversion-copy/analytics`          |
| [x] Style Guide              | `/conversion-copy/style-guide`        |
| [x] Brief Intake             | `/conversion-copy/briefs`             |

## 28. Product Marketing Manager (`28-product-marketing-manager.md`)

| Page                              | Route                                |
| --------------------------------- | ------------------------------------ |
| [ ] Product Marketing Hub         | `/product-marketing`                 |
| [ ] GTM Planner                   | `/product-marketing/gtm`             |
| [ ] Product Positioning Dashboard | `/product-marketing/positioning`     |
| [ ] Competitive Intelligence Hub  | `/product-marketing/competitive`     |
| [ ] Launch Calendar               | `/product-marketing/launch-calendar` |
| [ ] Market Research Repository    | `/product-marketing/research`        |
| [ ] Messaging Matrix              | `/product-marketing/messaging`       |
| [ ] Campaign Brief Builder        | `/product-marketing/briefs`          |
| [ ] Performance Analytics         | `/product-marketing/analytics`       |

## 29. Behavioral Designer (`29-behavioral-designer.md`)

| Page                               | Route                                |
| ---------------------------------- | ------------------------------------ |
| [ ] Behavioral Design Hub          | `/behavioral-design`                 |
| [ ] Intervention Library           | `/behavioral-design/interventions`   |
| [ ] Engagement Flow Designer       | `/behavioral-design/flow-designer`   |
| [ ] Nudge Campaign Builder         | `/behavioral-design/nudge-campaigns` |
| [ ] A/B Test Designer (Behavioral) | `/behavioral-design/ab-tests`        |
| [ ] Funnel Analysis Dashboard      | `/behavioral-design/funnels`         |
| [ ] Habit Tracker                  | `/behavioral-design/habits`          |
| [ ] Intervention Analytics         | `/behavioral-design/analytics`       |
| [ ] User Segment Explorer          | `/behavioral-design/segments`        |

## 30. Growth Specialist (`30-growth-specialist.md`)

| Page                           | Route                 |
| ------------------------------ | --------------------- |
| [ ] Growth Dashboard           | `/growth`             |
| [ ] Experiment Builder         | `/growth/experiments` |
| [ ] Funnel Analyzer            | `/growth/funnel`      |
| [ ] Cohort Retention Dashboard | `/growth/cohorts`     |
| [ ] Referral Program Manager   | `/growth/referrals`   |
| [ ] Channel Attribution        | `/growth/attribution` |
| [ ] Growth Model / Simulator   | `/growth/simulator`   |
| [ ] SEO Content Planner        | `/growth/seo`         |

## 31. Global/Nigerian-market Copywriter (`31-global-nigerian-market-copywriter.md`)

| Page                               | Route                              |
| ---------------------------------- | ---------------------------------- |
| [ ] Content Localization Dashboard | `/localization`                    |
| [ ] Market-Specific Copy Variants  | `/localization/variants`           |
| [ ] Translation Memory             | `/localization/translation-memory` |
| [ ] Cultural Glossary              | `/localization/glossary`           |
| [ ] Style Guide Per Market         | `/localization/style-guides`       |
| [ ] Localized Landing Page Preview | `/localization/preview`            |
| [ ] Dialect Variant Manager        | `/localization/dialects`           |
| [ ] Market Performance Analytics   | `/localization/analytics`          |

## 32. Visual/UX Designer (`32-visual-ux-designer.md`)

| Page                             | Route                   |
| -------------------------------- | ----------------------- |
| [ ] Design System Manager        | `/design/system`        |
| [ ] Component Explorer           | `/design/components`    |
| [ ] Prototype Viewer             | `/design/prototypes`    |
| [ ] User Flow Diagrammer         | `/design/flows`         |
| [ ] Design Token Editor          | `/design/tokens`        |
| [ ] Asset Export Center          | `/design/exports`       |
| [ ] Collaboration / Feedback Hub | `/design/collaboration` |
| [ ] Version History              | `/design/versions`      |

---

## 33. Cross-Cutting Features (no dedicated page)

Source: `CEA_OS_GRAND_MASTER_PLAN_P1-P3.md`, `CEA_OS_MASTER_PLAN.md`

| Feature                                                                    | Notes                                            |
| -------------------------------------------------------------------------- | ------------------------------------------------ |
| [ ] Role-based `/dashboard` redirect + AppShell layout                     | Sidebar + topbar + role sections (P1 §1.2)       |
| [ ] AppShell / Sidebar / Topbar / MobileNav layouts                        | `P2 §5.5`                                        |
| [ ] Real-time messaging (WebSocket / Durable Objects)                      | ChatRoom, presence, typing indicators            |
| [ ] Live class (video + chat + whiteboard + polls)                         | LiveClass DO                                     |
| [x] Notification bell + in-app/email/SMS/push delivery                     | 40+ notification templates (`P3 §9.2`)           |
| [x] Notification preferences + quiet hours                                 | `P3 §9.3`                                        |
| [ ] Command palette (Cmd+K)                                                | `P2 §5.3`                                        |
| [ ] Calendar sync (Google/Outlook)                                         | Two-way sync                                     |
| [ ] Payment integration (Stripe)                                           | Tuition, invoices, donations, marketplace escrow |
| [ ] File uploads (R2 presigned URLs)                                       | `P2 §4.3`                                        |
| [ ] Certificate PDF generation + QR verification                           |                                                  |
| [ ] Analytics event tracking infra                                         | `P3 §12.1` taxonomy                              |
| [ ] Dashboards: Executive, Academics, Finance, Marketing                   | `P3 §12.2`                                       |
| [x] Self-service Report Builder                                            | `P3 §12.3`                                       |
| [ ] Automation / Workflow builder UI                                       | Ops + Sys Admin                                  |
| [ ] AI features: grading, recommendations, teaching assistant, content gen | Phase 6                                          |
| [ ] PWA manifest + service worker                                          | Phase 0 (not present in repo)                    |
| [ ] Dark/light mode toggle                                                 | Phase 0                                          |
| [ ] Onboarding tours / empty states / loading states                       | `P2 §5.3`                                        |
| [ ] RBAC permission gating on all routes                                   | Phase 0                                          |

---

## Totals

- Public/marketing pages missing: **15**
- Auth pages missing: **7**
- Portal pages missing (32 actor plans): **~230**
- Cross-cutting features missing: **20**

**Grand total: ~270 pages/features to build.**

> Source files: `plans/CEA_OS_MASTER_PLAN.md`, `plans/CEA_OS_GRAND_MASTER_PLAN_P1.md`, `plans/CEA_OS_GRAND_MASTER_PLAN_P2.md`, `plans/CEA_OS_GRAND_MASTER_PLAN_P3.md`, `plans/CEA_OS_DESIGN_LANGUAGE.md`, `plans/plan-actors/*.md` (32 files).
