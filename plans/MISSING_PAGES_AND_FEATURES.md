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
| [ ] Portfolio Builder (projects, skills, CV generator, share)                        | `/portfolio`                   |
| [ ] Calendar (classes, deadlines, events, mentor sessions)                           | `/calendar`                    |
| [ ] Messaging (DMs, group chats)                                                     | `/messages`                    |
| [ ] Finance (tuition, invoices, receipts)                                            | `/finance`                     |
| [ ] Attendance (history, QR check-in)                                                | `/attendance`                  |
| [ ] Certificates (view, verify, share)                                               | `/certificates`                |
| [ ] Live class (video + chat + whiteboard + polls + hand-raise)                      | `/live/[classId]`              |

## 4. Parent Portal (`03-parent.md`)

| Page                                                                   | Route                                 |
| ---------------------------------------------------------------------- | ------------------------------------- |
| [ ] Parent Dashboard                                                   | `/parent/dashboard`                   |
| [ ] Student Overview                                                   | `/parent/students/[id]/overview`      |
| [ ] Academic Progress / Gradebook                                      | `/parent/students/[id]/grades`        |
| [ ] Attendance Report                                                  | `/parent/students/[id]/attendance`    |
| [ ] Finance / Billing (pay online)                                     | `/parent/students/[id]/finance`       |
| [ ] Communication (message instructors/staff, parent-teacher meetings) | `/parent/students/[id]/communication` |
| [ ] Reports (term reports, progress summaries)                         | `/parent/students/[id]/reports`       |
| [ ] Parent invitation accept                                           | `/parent/invitation/accept`           |

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
| [ ] Mentor Dashboard                               | `/mentor/dashboard`                                      |
| [ ] Mentee Overview                                | `/mentor/mentees/[id]`                                   |
| [ ] Session Hub (schedule, notes, action items)    | `/mentor/sessions`, `/mentor/sessions/[id]`              |
| [ ] Portfolio Reviewer (feedback, endorse skills)  | `/mentor/mentees/[id]/portfolio`                         |
| [ ] Career Tracking (applications, interview prep) | `/mentor/mentees/[id]/career`, `/mentor/career-tracking` |
| [ ] Goal Management (milestones, progress)         | `/mentor/mentees/[id]/goals`, `/mentor/goals`            |
| [ ] Messaging                                      | `/mentor/messages`                                       |
| [ ] Resources Library                              | `/mentor/resources`                                      |
| [ ] Analytics & Reports                            | `/mentor/analytics`                                      |
| [ ] Availability & Settings                        | `/mentor/settings`                                       |
| [ ] Mentorship request inbox (accept/decline)      | `/mentor/requests`                                       |

## 7. Department Head Portal (`06-department-head.md`)

| Page                                                 | Route               |
| ---------------------------------------------------- | ------------------- |
| [ ] Department Overview Dashboard                    | `/dept/dashboard`   |
| [ ] Curriculum Manager (program versions, approvals) | `/dept/curriculum`  |
| [ ] Instructor Management (workload, performance)    | `/dept/instructors` |
| [ ] Quality Assurance (observations, evaluations)    | `/dept/quality`     |
| [ ] Reports & Analytics                              | `/dept/reports`     |
| [ ] Approvals (curriculum, courses, leave)           | `/dept/approvals`   |
| [ ] Calendar (department events, academic calendar)  | `/dept/calendar`    |
| [ ] Program Enrollment overview                      | `/dept/enrollment`  |

## 8. Receptionist Portal (`07-receptionist.md`)

| Page                                                  | Route                        |
| ----------------------------------------------------- | ---------------------------- |
| [ ] Front Desk Hub                                    | `/receptionist/dashboard`    |
| [ ] Visitor Check-In (ID capture, badge, notify host) | `/receptionist/check-in`     |
| [ ] Visitor Check-Out                                 | `/receptionist/check-out`    |
| [ ] Appointment Scheduler                             | `/receptionist/appointments` |
| [ ] Inquiry Log (walk-ins → CRM leads)                | `/receptionist/inquiries`    |
| [ ] Phone Log                                         | `/receptionist/phone-log`    |
| [ ] Delivery Log                                      | `/receptionist/deliveries`   |
| [ ] Staff Directory                                   | `/receptionist/directory`    |
| [ ] Shift & Task Management                           | `/receptionist/tasks`        |

## 9. Operations Manager Portal (`08-operations-manager.md`)

| Page                                                       | Route             |
| ---------------------------------------------------------- | ----------------- |
| [ ] Operations Hub                                         | `/ops/dashboard`  |
| [ ] Branch Management (multi-branch, resource utilization) | `/ops/branches`   |
| [ ] Inventory Management (stock, reorder alerts, POs)      | `/ops/inventory`  |
| [ ] Facilities Management (room booking, maintenance)      | `/ops/facilities` |
| [ ] Task Management (assign, track, workflows)             | `/ops/tasks`      |
| [ ] Process Automation (workflow builder)                  | `/ops/automation` |
| [ ] Vendor Management (contracts, performance)             | `/ops/vendors`    |
| [ ] Reports & Analytics (efficiency, cost per branch)      | `/ops/reports`    |

## 10. Director Portal (`09-director.md`)

| Page                                                      | Route                      |
| --------------------------------------------------------- | -------------------------- |
| [ ] Executive Command Center (real-time KPIs, NPS)        | `/director/command-center` |
| [ ] Financial Overview (revenue, expenses, forecasts)     | `/director/finance`        |
| [ ] Academic Overview (enrollment, completion, placement) | `/director/academic`       |
| [ ] Operations Overview (branch performance)              | `/director/operations`     |
| [ ] HR Overview (headcount, turnover, satisfaction)       | `/director/hr`             |
| [ ] Marketing Overview (CAC, funnel, campaign ROI)        | `/director/marketing`      |
| [ ] Approvals (budgets, hires, partnerships, POs)         | `/director/approvals`      |
| [ ] Strategic Planning / OKRs                             | `/director/okrs`           |
| [ ] Reports Drill-Down (any module, any department)       | `/director/reports`        |

## 11. Client Portal (`10-client.md`)

| Page                                                       | Route                         |
| ---------------------------------------------------------- | ----------------------------- |
| [ ] Client Portal Home                                     | `/client/portal`              |
| [ ] Proposals (view, accept/reject, negotiate)             | `/client/proposals`           |
| [ ] Project Dashboard (timeline, milestones, deliverables) | `/client/projects/[id]`       |
| [ ] Task Board (comment, approve deliverables)             | `/client/projects/[id]/tasks` |
| [ ] Invoices & Payments (pay online, receipts)             | `/client/invoices`            |
| [ ] Support Tickets (create, track, SLA)                   | `/client/support`             |
| [ ] Contracts (view, terms, renewals)                      | `/client/contracts`           |
| [ ] Documents (shared files, SOW, reports)                 | `/client/documents`           |
| [ ] Messaging (with project team)                          | `/client/messages`            |

## 12. Employer Portal (`11-employer.md`)

| Page                                                 | Route                        |
| ---------------------------------------------------- | ---------------------------- |
| [ ] Employer Hub                                     | `/employer/hub`              |
| [ ] Job Management (post, edit, close, applications) | `/employer/jobs`             |
| [ ] Talent Search (browse portfolios by skill/cert)  | `/employer/talent`           |
| [ ] Candidate Pipeline (shortlist, reject)           | `/employer/pipeline/[jobId]` |
| [ ] Interview Scheduler                              | `/employer/interviews`       |
| [ ] Feedback & Reviews (post-interview, post-hire)   | `/employer/feedback`         |
| [ ] Analytics (time-to-hire, retention)              | `/employer/analytics`        |
| [ ] Brand Page (company profile)                     | `/employer/brand`            |

## 13. Partner Portal (`12-partner.md`)

| Page                                             | Route                     |
| ------------------------------------------------ | ------------------------- |
| [ ] Partnership Hub                              | `/partner/hub`            |
| [ ] Agreements (MOUs, contracts, terms)          | `/partner/agreements`     |
| [ ] Collaborations (co-branded events, programs) | `/partner/collaborations` |
| [ ] Referral Portal (track referrals, payouts)   | `/partner/referrals`      |
| [ ] Resources (co-branded materials, logos)      | `/partner/resources`      |
| [ ] Reports (impact, revenue share)              | `/partner/reports`        |
| [ ] Messaging                                    | `/partner/messages`       |

## 14. Volunteer Portal (`13-volunteer.md`)

| Page                                       | Route                        |
| ------------------------------------------ | ---------------------------- |
| [ ] Opportunities                          | `/volunteer/opportunities`   |
| [ ] My Volunteering (sign-ups, history)    | `/volunteer/my-volunteering` |
| [ ] Hours Tracker (clock in/out, approval) | `/volunteer/hours`           |
| [ ] Community (group chat, forums)         | `/volunteer/community`       |
| [ ] Certificates (appreciation)            | `/volunteer/certificates`    |
| [ ] Impact Dashboard                       | `/volunteer/impact`          |

## 15. Intern Portal (`14-intern.md`)

| Page                                            | Route                   |
| ----------------------------------------------- | ----------------------- |
| [ ] Intern Hub (Dashboard)                      | `/intern`               |
| [ ] Tasks (assigned, submit deliverables)       | `/intern/tasks`         |
| [ ] Timesheet (log hours, approval)             | `/intern/timesheet`     |
| [ ] Mentorship (sessions, notes)                | `/intern/mentorship`    |
| [ ] Learning Plan                               | `/intern/learning-plan` |
| [ ] Evaluation (self, supervisor, final review) | `/intern/evaluation`    |
| [ ] Portfolio                                   | `/intern/portfolio`     |
| [ ] Messaging                                   | `/intern/messages`      |

## 16. Alumni Portal (`15-alumni.md`)

| Page                                              | Route                |
| ------------------------------------------------- | -------------------- |
| [ ] Alumni Hub (Dashboard)                        | `/alumni/hub`        |
| [ ] Network Directory (search, connect, message)  | `/alumni/network`    |
| [ ] Mentorship Sign-Up (offer to mentor)          | `/alumni/mentorship` |
| [ ] Job Board (browse, refer jobs)                | `/alumni/jobs`       |
| [ ] Events (reunions, RSVP)                       | `/alumni/events`     |
| [ ] Give Back / Donations                         | `/alumni/give-back`  |
| [ ] Success Stories (share journey, get featured) | `/alumni/stories`    |
| [ ] Profile (employment, achievements)            | `/alumni/profile`    |

## 17. Supplier Portal (`17-supplier.md`)

| Page                                           | Route                   |
| ---------------------------------------------- | ----------------------- |
| [ ] Supplier Hub (Dashboard)                   | `/supplier`             |
| [ ] Orders / Purchase Orders (confirm, status) | `/supplier/orders`      |
| [ ] Deliveries (schedule, mark delivered)      | `/supplier/deliveries`  |
| [ ] Invoices (submit, track payment)           | `/supplier/invoices`    |
| [ ] Company Profile (catalog, certifications)  | `/supplier/profile`     |
| [ ] Messaging (procurement)                    | `/supplier/messages`    |
| [ ] Performance Ratings                        | `/supplier/performance` |

## 18. Accountant Portal (`18-accountant.md`)

| Page                                              | Route                |
| ------------------------------------------------- | -------------------- |
| [ ] Finance Hub (AR, AP, cash flow, bank balance) | `/finance/hub`       |
| [ ] Invoicing (create, send, track)               | `/finance/invoicing` |
| [ ] Billing / Accounts Payable                    | `/finance/billing`   |
| [ ] Payments (manual/batch, reconcile)            | `/finance/payments`  |
| [ ] Expenses (claims, approve, reimburse)         | `/finance/expenses`  |
| [ ] Payroll (salaries, deductions, payslips)      | `/finance/payroll`   |
| [ ] Budgets (dept budgets vs actual)              | `/finance/budgets`   |
| [ ] Reports (P&L, balance sheet, cash flow, tax)  | `/finance/reports`   |
| [ ] Banking Reconciliation                        | `/finance/banking`   |
| [ ] Audit Log                                     | `/finance/audit`     |

## 19. HR Officer Portal (`19-hr-officer.md`)

| Page                                                         | Route               |
| ------------------------------------------------------------ | ------------------- |
| [ ] HR Hub (headcount, open positions, leave, reviews)       | `/hr`               |
| [ ] Recruitment (postings, applications, interviews, offers) | `/hr/recruitment`   |
| [ ] Employee Database (contracts, documents, history)        | `/hr/employees`     |
| [ ] Leave Management (requests, balances, calendar)          | `/hr/leave`         |
| [ ] Attendance (staff, lateness, absenteeism)                | `/hr/attendance`    |
| [ ] Performance Reviews (cycles, goals, appraisals)          | `/hr/performance`   |
| [ ] Payroll Input (changes → finance)                        | `/hr/payroll-input` |
| [ ] Onboarding/Offboarding Checklists                        | `/hr/onboarding`    |
| [ ] Training Records                                         | `/hr/training`      |
| [ ] HR Reports (turnover, satisfaction, compliance)          | `/hr/reports`       |

## 20. Admissions Officer Portal (`20-admissions-officer.md`)

| Page                                                       | Route                           |
| ---------------------------------------------------------- | ------------------------------- |
| [ ] Admissions Hub (volume, funnel, targets)               | `/admissions/hub`               |
| [ ] Applications Pipeline (filter by status/stage/program) | `/admissions/applications`      |
| [ ] Application Detail View                                | `/admissions/applications/[id]` |
| [ ] Review Pipeline (shortlist/reject, notes)              | `/admissions/review`            |
| [ ] Interview Scheduler                                    | `/admissions/interviews`        |
| [ ] Document Verification (checklists)                     | `/admissions/documents`         |
| [ ] Communication Center (offer letters, templates)        | `/admissions/communication`     |
| [ ] Enrollment Tracker (paid vs pending, orientation)      | `/admissions/enrollment`        |
| [ ] Reports (conversion, sources, demographics)            | `/admissions/reports`           |

## 21. Marketing Officer Portal (`21-marketing-officer.md`)

| Page                                                 | Route                         |
| ---------------------------------------------------- | ----------------------------- |
| [ ] Marketing Hub                                    | `/marketing`                  |
| [ ] Campaigns (multi-channel, budget, ROI)           | `/marketing/campaigns`        |
| [ ] Content Calendar                                 | `/marketing/content-calendar` |
| [ ] Email Marketing (campaigns, lists, opens/clicks) | `/marketing/email`            |
| [ ] Landing Page Builder (+A/B testing)              | `/marketing/landing-pages`    |
| [ ] Lead Management (score, route)                   | `/marketing/leads`            |
| [ ] SEO Dashboard (keywords, rank tracking)          | `/marketing/seo`              |
| [ ] Social Media Scheduler                           | `/marketing/social`           |
| [ ] Analytics (CAC, ROAS, attribution)               | `/marketing/analytics`        |
| [ ] Reports                                          | `/marketing/reports`          |

## 22. IT Support Portal (`22-it-support.md`)

| Page                                      | Route                |
| ----------------------------------------- | -------------------- |
| [ ] Ticket Hub (queue, SLA timers)        | `/it/tickets`        |
| [ ] Ticket Management                     | `/it/tickets/[id]`   |
| [ ] Asset Management (hardware lifecycle) | `/it/assets`         |
| [ ] System Monitoring                     | `/it/monitoring`     |
| [ ] Knowledge Base (internal IT docs)     | `/it/knowledge-base` |
| [ ] User Management (accounts, resets)    | `/it/users`          |
| [ ] Remote Support                        | `/it/remote-support` |
| [ ] Reports                               | `/it/reports`        |
| [ ] Ticket Templates                      | `/it/templates`      |
| [ ] Scheduled Maintenance                 | `/it/maintenance`    |
| [ ] Software License Management           | `/it/licenses`       |

## 23. Developer Portal (`23-developer.md`)

| Page                                                 | Route                 |
| ---------------------------------------------------- | --------------------- |
| [ ] Dev Hub                                          | `/dev`                |
| [ ] API Playground (Swagger/OpenAPI, test endpoints) | `/dev/api-playground` |
| [ ] Deployments (history, rollback)                  | `/dev/deployments`    |
| [ ] Monitoring & Errors                              | `/dev/monitoring`     |
| [ ] Tasks                                            | `/dev/tasks`          |
| [ ] Git/PR Status                                    | `/dev/git`            |
| [ ] Documentation (internal dev docs)                | `/dev/docs`           |
| [ ] Team / Code Review Queue                         | `/dev/reviews`        |
| [ ] Environment Variables                            | `/dev/env`            |
| [ ] Background Jobs / Queues                         | `/dev/queues`         |
| [ ] Service Dependencies                             | `/dev/dependencies`   |
| [ ] Feature Flags                                    | `/dev/feature-flags`  |

## 24. System Administrator Portal (`24-system-administrator.md`)

| Page                                                            | Route                 |
| --------------------------------------------------------------- | --------------------- |
| [ ] Admin Hub (system health, security alerts)                  | `/admin`              |
| [ ] User Management                                             | `/admin/users`        |
| [ ] Roles & Permissions (RBAC config, audit)                    | `/admin/roles`        |
| [ ] Security Dashboard (logins, 2FA, API keys, IP whitelist)    | `/admin/security`     |
| [ ] Audit Log (search, export)                                  | `/admin/audit`        |
| [ ] System Configuration (settings, feature flags, maintenance) | `/admin/config`       |
| [ ] Monitoring (CPU, memory, error rate)                        | `/admin/monitoring`   |
| [ ] Backups (schedule, restore, retention)                      | `/admin/backups`      |
| [ ] Integrations & Webhooks                                     | `/admin/integrations` |
| [ ] Logs (app, error, access)                                   | `/admin/logs`         |
| [ ] API Keys & Service Tokens                                   | `/admin/api-keys`     |
| [ ] Rate Limiting & Throttling                                  | `/admin/rate-limits`  |

## 25. Government Representative Portal (`25-government-representative.md`)

| Page                                                | Route                     |
| --------------------------------------------------- | ------------------------- |
| [ ] Compliance Portal (accreditation status, score) | `/compliance`             |
| [ ] Institutional Data                              | `/compliance/institution` |
| [ ] Regulatory Reports                              | `/compliance/reports`     |
| [ ] Documentation Library (policies, certificates)  | `/compliance/documents`   |
| [ ] Audit Module (schedule, findings, remediation)  | `/compliance/audit`       |
| [ ] Filings & Timeline                              | `/compliance/filings`     |
| [ ] Messaging                                       | `/compliance/messaging`   |
| [ ] Compliance Calendar                             | `/compliance/calendar`    |
| [ ] Data Integrity Verification                     | `/compliance/integrity`   |
| [ ] Compliance Training & Certifications            | `/compliance/training`    |
| [ ] Regulatory Change Log                           | `/compliance/changelog`   |

## 26. NGO Portal (`26-ngo.md`)

| Page                                                        | Route                       |
| ----------------------------------------------------------- | --------------------------- |
| [ ] Partnership Hub                                         | `/ngo`                      |
| [ ] Scholarship Management (funds, selection, disbursement) | `/ngo/scholarships`         |
| [ ] Community Programs (outreach, beneficiaries)            | `/ngo/programs`             |
| [ ] Volunteer Coordination                                  | `/ngo/volunteers`           |
| [ ] Impact Reports                                          | `/ngo/reports`              |
| [ ] Donations Tracking                                      | `/ngo/donations`            |
| [ ] Messaging                                               | `/ngo/messaging`            |
| [ ] Program Budget & Expenses                               | `/ngo/programs/[id]/budget` |
| [ ] Partner Reports & Analytics                             | `/ngo/analytics`            |

## 27. Conversion Copywriter (`27-conversion-copywriter.md`)

| Page                         | Route                                 |
| ---------------------------- | ------------------------------------- |
| [ ] Copy Asset Library       | `/conversion-copy/library`            |
| [ ] Landing Page Copy Editor | `/conversion-copy/landing-pages/[id]` |
| [ ] Email Sequence Builder   | `/conversion-copy/email-sequences`    |
| [ ] Ad Copy Manager          | `/conversion-copy/ads`                |
| [ ] A/B Test Copy Dashboard  | `/conversion-copy/ab-tests`           |
| [ ] Conversion Analytics     | `/conversion-copy/analytics`          |
| [ ] Style Guide              | `/conversion-copy/style-guide`        |
| [ ] Brief Intake             | `/conversion-copy/briefs`             |

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
| [ ] Notification bell + in-app/email/SMS/push delivery                     | 40+ notification templates (`P3 §9.2`)           |
| [ ] Notification preferences + quiet hours                                 | `P3 §9.3`                                        |
| [ ] Command palette (Cmd+K)                                                | `P2 §5.3`                                        |
| [ ] Calendar sync (Google/Outlook)                                         | Two-way sync                                     |
| [ ] Payment integration (Stripe)                                           | Tuition, invoices, donations, marketplace escrow |
| [ ] File uploads (R2 presigned URLs)                                       | `P2 §4.3`                                        |
| [ ] Certificate PDF generation + QR verification                           |                                                  |
| [ ] Analytics event tracking infra                                         | `P3 §12.1` taxonomy                              |
| [ ] Dashboards: Executive, Academics, Finance, Marketing                   | `P3 §12.2`                                       |
| [ ] Self-service Report Builder                                            | `P3 §12.3`                                       |
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
