# Cyber Elias Academy — Digital Operating System (CEA-OS)

# Master Actor & App Plan

> **Frontend:** Vercel (Next.js/React 19, TypeScript, Tailwind, shadcn/ui, Redux Toolkit, Framer Motion)
> **Design Language:** Hybrid of digitalskillsacademy.org (clean professional) à— dskillacademy.com.ng (vibrant gradients) — see `CEA_OS_DESIGN_LANGUAGE.md`
> **Backend:** Cloudflare Workers + Hono + D1 + R2 + KV + Queues + Durable Objects  
> **Academy Focus:** General digital/tech skills academy — from scratch to advanced in software dev, networking, cloud, cybersecurity, digital marketing, AI, data science, UI/UX, mobile, hardware, IT support.
> **Philosophy:** One platform. Multiple engines. Every actor connected.

---

## Table of Contents

1. [Actor Plans](#1-actor-plans)
   - [Prospective Student](#11-prospective-student)
   - [Current Student](#12-current-student)
   - [Parent](#13-parent)
   - [Instructor](#14-instructor)
   - [Mentor](#15-mentor)
   - [Department Head](#16-department-head)
   - [Receptionist](#17-receptionist)
   - [Operations Manager](#18-operations-manager)
   - [Director](#19-director)
   - [Client](#110-client)
   - [Employer](#111-employer)
   - [Partner](#112-partner)
   - [Volunteer](#113-volunteer)
   - [Intern](#114-intern)
   - [Alumni](#115-alumni)
   - [Visitor](#116-visitor)
   - [Supplier](#117-supplier)
   - [Accountant](#118-accountant)
   - [HR Officer](#119-hr-officer)
   - [Admissions Officer](#120-admissions-officer)
   - [Marketing Officer](#121-marketing-officer)
   - [IT Support](#122-it-support)
   - [Developer](#123-developer)
   - [System Administrator](#124-system-administrator)
   - [Government Representative](#125-government-representative)
   - [NGO](#126-ngo)
   - [Conversion Copywriter](#127-conversion-copywriter)
   - [Product Marketing Manager](#128-product-marketing-manager)
   - [Behavioral Designer](#129-behavioral-designer)
   - [Growth Specialist](#130-growth-specialist)
   - [Global/Nigerian-market Copywriter](#131-globalnigerian-market-copywriter)
   - [Visual/UX Designer](#132-visualux-designer)
2. [Grand App Plan](#2-grand-app-plan)
   - [Architecture Overview](#21-architecture-overview)
   - [Module Inventory](#22-module-inventory)
   - [Phase-by-Phase Build Plan](#23-phase-by-phase-build-plan)
   - [Data Flow & Integration Map](#24-data-flow--integration-map)
   - [Permission Matrix (RBAC)](#25-permission-matrix-rbac)
   - [Infrastructure Map (Vercel + Cloudflare)](#26-infrastructure-map-vercel--cloudflare)
   - [Implementation Order](#27-implementation-order)

---

# 1. Actor Plans

## 1.1 Prospective Student

**Tagline:** "I want to know if this place is right for me."

### Goals

- Discover courses and programs offered
- Understand the academy's value proposition
- Apply for admission easily
- Track application status without calling
- Explore financial aid / scholarship options

### Dashboard

- **Landing Zone:** Public course catalog with filtering
- **Application Hub:** Single application form, document upload, status tracker
- **Explore Section:** Virtual tour, testimonials, success stories, blog
- **Comparison Tool:** Side-by-side course/program comparison

### Modules & Permissions

| Module                            | Access Level                            |
| --------------------------------- | --------------------------------------- |
| Public CMS (courses, blog, about) | Read                                    |
| Admissions                        | Create (application), Read Own (status) |
| Knowledge Base                    | Read (FAQs, guides)                     |
| Community                         | Read (public forums)                    |

### Key User Journeys

1. **Discovery → Application:** Browses courses → Reads curriculum → Applies online → Uploads documents → Receives confirmation → Tracks status
2. **Scholarship Inquiry:** Visits scholarship page → Checks eligibility → Applies for scholarship → Attached to application
3. **Pre-Enrollment:** Gets accepted → Receives offer letter → Accepts → Makes initial payment → Onboarded as Current Student

### Notifications

- Application received (email + SMS)
- Missing documents reminder
- Status change (shortlisted, accepted, rejected)
- Interview/entrance exam schedule
- Orientation date

---

## 1.2 Current Student

**Tagline:** "My entire learning and career journey in one place."

### Goals

- Access all courses, lessons, and materials
- Submit assignments and take assessments
- Track grades and progress
- Build a professional portfolio
- Find freelance and job opportunities
- Connect with peers, mentors, and instructors
- Manage schedule and attendance

### Dashboard

- **Home:** Upcoming classes, pending assignments, recent grades, announcements
- **Learning Hub:** Enrolled courses, modules, lessons, progress bars, completion status
- **Assessments:** Upcoming exams, past results, practice tests
- **Portfolio Builder:** Projects, certifications, skills, experience, CV generator
- **Marketplace:** Browse freelance jobs, apply, manage active gigs
- **Community:** Forum posts, study groups, events
- **Calendar:** Class schedule, deadlines, events, mentor sessions
- **Messaging:** DMs with instructors, mentors, peers, group chats
- **Finance:** Tuition payments, invoices, receipts
- **Attendance:** Check-in history, live QR check-in

### Modules & Permissions

| Module       | Access Level                                                  |
| ------------ | ------------------------------------------------------------- |
| Learning     | Read (courses), Create (assignment submissions)               |
| Assessments  | Read (scheduled), Create (exam responses), Read Own (results) |
| Projects     | Create (portfolio), Read (assigned), Update                   |
| Marketplace  | Read (jobs), Create (applications), Read Own (gigs)           |
| Community    | Read, Create (posts, comments)                                |
| Calendar     | Read, Create (personal events)                                |
| Messaging    | Full (own conversations)                                      |
| Finance      | Read (own invoices/payments)                                  |
| Portfolio    | Full (own portfolio)                                          |
| Certificates | Read (own issued)                                             |
| Attendance   | Read Own                                                      |

### Key User Journeys

1. **Daily Learning:** Login → Dashboard shows next class → Attend → Access materials → Submit assignment → Check grade
2. **Taking an Exam:** Notification → Enter assessment portal → Read instructions → Answer questions → Submit → View result
3. **Building Portfolio:** Add project → Describe role/tech → Upload screenshots → Link to certificate → Publish → Share link
4. **Freelance Job Hunt:** Browse marketplace → Filter by skill → Apply → Get hired → Deliver work → Get paid → Get reviewed
5. **Career Coaching:** Schedule mentor session → Prepare questions → Attend → Follow up → Update goals

### Notifications

- Class starting soon
- Assignment deadline approaching (24h, 1h)
- Grade published
- New course material available
- New job match
- Mentor session reminder
- Payment due
- Certificate issued

---

## 1.3 Parent

**Tagline:** "I want to know my child is progressing and well-cared for."

### Goals

- Monitor child's academic progress
- View attendance records
- Track payments and fees
- Communicate with instructors/admissions
- Receive reports and updates

### Dashboard

- **Student Overview:** Child's name, program, current term, overall progress
- **Academic Progress:** Grades per course, completed vs pending assignments
- **Attendance:** Monthly calendar with present/absent markings
- **Finance:** Fee structure, payment history, upcoming dues
- **Communication:** Direct messaging with instructors and admin
- **Reports:** Download term reports, progress summaries

### Modules & Permissions

| Module     | Access Level                  |
| ---------- | ----------------------------- |
| Learning   | Read (ward's courses, grades) |
| Attendance | Read (ward's)                 |
| Finance    | Read (ward's invoices)        |
| Messaging  | Create (to instructors/staff) |
| Reports    | Read (ward's)                 |

### Key User Journeys

1. **Progress Check:** Login → See child's dashboard → Review grades → Contact instructor if concern
2. **Fee Payment:** View invoice → Pay online → Download receipt
3. **Meeting Request:** Schedule parent-teacher meeting → Confirm → Attend

### Notifications

- Low attendance alert
- Grade published
- Fee due reminder
- Meeting scheduled
- Disciplinary notification

---

## 1.4 Instructor

**Tagline:** "I teach. The platform handles the rest."

### Goals

- Create and manage courses, lessons, and materials
- Create and grade assignments and assessments
- Track student performance
- Mark attendance
- Communicate with students and department
- Manage teaching schedule

### Dashboard

- **Home:** Today's classes, pending grading, student queries, announcements
- **Course Management:** Course builder (modules, lessons, resources), publish/draft
- **Assignment Center:** Create assignments, set deadlines, view submissions, grade
- **Assessment Engine:** Create quizzes/exams, auto-grade (MCQ), manual review (essays)
- **Gradebook:** All students, all courses, filter by assignment/exam
- **Attendance:** Mark attendance per class, view history
- **Analytics:** Student performance trends, class averages, at-risk students
- **Messaging:** DMs with students, department group chats
- **Calendar:** Schedule classes, office hours

### Modules & Permissions

| Module      | Access Level                                |
| ----------- | ------------------------------------------- |
| Learning    | Full (own courses), Read (assigned courses) |
| Assessments | Full (own assessments), Grade               |
| Projects    | Read (assigned students' projects)          |
| Attendance  | Create, Read                                |
| Analytics   | Read (own students)                         |
| Calendar    | Create (own events)                         |
| Messaging   | Full (own conversations)                    |
| Grades      | Create, Update, Read                        |

### Key User Journeys

1. **Course Creation:** New course → Add modules → Upload materials → Set prerequisites → Publish
2. **Daily Teaching:** Start class → Mark attendance → Deliver lesson → Post materials → Remind of assignments
3. **Grading:** Open assignment → View submissions → Grade → Add feedback → Publish → Notify students
4. **Exam Day:** Open assessment → Monitor live submissions → Auto-grade runs → Review flagged answers → Publish results
5. **Student Intervention:** View analytics → Identify low performer → Message student → Schedule extra session

### Notifications

- New assignment submission (for grading)
- Student query
- Class starting
- Department meeting
- Curriculum change request

---

## 1.5 Mentor

**Tagline:** "I shape careers, not just skills."

### Goals

- Guide students through career development
- Review portfolios and provide feedback
- Conduct one-on-one sessions
- Track mentee progress and milestones
- Connect students with industry opportunities

### Dashboard

- **Mentees Overview:** List of assigned mentees, their status, last interaction
- **Session Hub:** Schedule/view sessions, notes per session, action items
- **Portfolio Review:** View mentee projects, give feedback, endorse skills
- **Career Tracking:** Resume/CV drafts, job applications, interview prep progress
- **Goals:** Set milestones with mentees, track completion
- **Messaging:** Communicate with mentees and coordinator

### Modules & Permissions

| Module     | Access Level                               |
| ---------- | ------------------------------------------ |
| Mentorship | Full (assigned mentees)                    |
| Portfolio  | Read (assigned mentees), Create (feedback) |
| Projects   | Read (assigned mentees)                    |
| Calendar   | Create (sessions)                          |
| Messaging  | Full (assigned mentees)                    |
| Analytics  | Read (mentee progress)                     |

### Key User Journeys

1. **First Session:** Review mentee profile → Schedule first meeting → Prepare talking points → Conduct session → Log notes → Set goals
2. **Portfolio Review:** Mentee shares portfolio → Review projects → Write feedback → Suggest improvements → Approve
3. **Career Checkpoint:** Monthly check-in → Review progress → Update goals → Suggest resources → Log session

### Notifications

- New mentee assigned
- Session reminder
- Mentee milestone achieved
- Mentee struggling (alert)
- Portfolio ready for review

---

## 1.6 Department Head

**Tagline:** "I ensure academic quality and department success."

### Goals

- Oversee curriculum and course quality
- Manage instructors and their workloads
- Monitor department KPIs
- Approve curriculum changes
- Generate department reports

### Dashboard

- **Department Overview:** Programs, courses, instructors, students enrolled
- **Curriculum Manager:** View all courses, propose/approve changes
- **Instructor Management:** Workload distribution, performance metrics
- **Quality Assurance:** Course reviews, student feedback, audit trail
- **Reports:** Enrollment trends, pass rates, instructor evaluations, budget
- **Approvals:** Curriculum changes, new courses, instructor leave
- **Calendar:** Department meetings, academic calendar

### Modules & Permissions

| Module    | Access Level                           |
| --------- | -------------------------------------- |
| Learning  | Full (department courses)              |
| HR        | Read (instructor info, leave requests) |
| Analytics | Full (department data)                 |
| Reports   | Full (department)                      |
| Approvals | Process (curriculum, courses)          |
| Calendar  | Create (department events)             |
| Feedback  | Read (course evaluations)              |

### Key User Journeys

1. **Curriculum Review:** Review course feedback → Identify gaps → Propose changes → Discuss with instructors → Submit for approval → Implement
2. **Instructor Evaluation:** View performance metrics → Review student feedback → Conduct review meeting → Log evaluation → Set improvement plan
3. **End of Term:** Generate department report → Analyze pass rates → Identify trends → Present to Director

### Notifications

- New course approval request
- Instructor leave request
- Low student satisfaction alert
- Term report ready
- Budget submission deadline

---

## 1.7 Receptionist

**Tagline:** "I am the first face of the academy."

### Goals

- Manage visitor check-in/out
- Handle phone calls and inquiries
- Schedule appointments
- Process walk-in admissions inquiries
- Manage physical mail and deliveries

### Dashboard

- **Front Desk Hub:** Today's visitors, appointments, calls log
- **Visitor Management:** Check-in form, badge printing, check-out
- **Appointment Scheduler:** View/create appointments for staff
- **Inquiry Log:** Walk-in inquiries, capture leads → route to admissions
- **Phone System:** Log calls, take messages, route to staff
- **Delivery Log:** Incoming packages, notify recipients, pickup tracking
- **Directory:** Staff contact list, department directory

### Modules & Permissions

| Module             | Access Level                                     |
| ------------------ | ------------------------------------------------ |
| Visitor Management | Full                                             |
| CRM                | Create (leads from walk-ins)                     |
| Calendar           | Read (staff availability), Create (appointments) |
| Messaging          | Create (notify staff of visitors/deliveries)     |

### Key User Journeys

1. **Visitor Check-in:** Guest arrives → Capture ID → Notify host → Print badge → Check-out on departure
2. **Walk-in Inquiry:** Prospect arrives → Capture details → Explain programs → Route to admissions → Log in CRM
3. **Phone Call:** Call comes in → Take message → Log call → Route to appropriate staff → Follow up

### Notifications

- Visitor arrived for staff member
- Package received
- Appointment reminder for tomorrow
- Staff on leave (don't schedule)

---

## 1.8 Operations Manager

**Tagline:** "Everything runs smoothly, every day."

### Goals

- Oversee day-to-day operations across branches
- Manage facilities, inventory, and resources
- Monitor operational KPIs
- Streamline processes and workflows
- Handle vendor and supplier relationships

### Dashboard

- **Operations Hub:** Active tasks, pending approvals, alerts
- **Branch Management:** Multi-branch view, resource utilization
- **Inventory:** Stock levels, reorder alerts, purchase orders
- **Facilities:** Room booking, maintenance requests, asset tracking
- **Task Management:** Assign tasks, track progress, workflows
- **Process Automation:** Define/trigger automated workflows
- **Reports:** Operational efficiency, cost per branch, utilization rates
- **Vendor Management:** Supplier list, contracts, performance

### Modules & Permissions

| Module      | Access Level               |
| ----------- | -------------------------- |
| Inventory   | Full                       |
| Facilities  | Full                       |
| Procurement | Create, Approve            |
| HR          | Read (staff schedules)     |
| Finance     | Read (operational budgets) |
| Reports     | Full (operations)          |
| Automation  | Full (define workflows)    |
| Supplier    | Full                       |

### Key User Journeys

1. **Inventory Reorder:** Stock low alert → Review supplier → Create PO → Approve → Send to supplier → Track delivery → Update inventory
2. **Facility Issue:** Maintenance request submitted → Assign technician → Track repair → Verify completion → Close ticket
3. **End of Month:** Generate ops report → Review costs → Compare branches → Identify savings → Report to Director

### Notifications

- Low inventory alert
- Maintenance request
- PO approval needed
- Vendor contract expiring
- Branch utilization low

---

## 1.9 Director

**Tagline:** "I steer the ship. Data guides me."

### Goals

- See the big picture across all departments
- Monitor KPIs and strategic goals
- Make data-driven decisions
- Approve major decisions (budgets, hires, partnerships)
- Communicate vision and direction

### Dashboard

- **Executive Command Center:** Real-time KPIs, revenue, enrollment, graduation rate, NPS
- **Financial Overview:** Revenue, expenses, profit, cash flow, forecasts
- **Academic Overview:** Enrollment trends, completion rates, job placement
- **Operations Overview:** Branch performance, utilization, efficiency
- **HR Overview:** Headcount, turnover, satisfaction
- **Marketing Overview:** CAC, conversion funnel, campaign ROI
- **Approvals:** Pending approvals (budgets, hires, partnerships, large POs)
- **Strategic Planning:** Goal setting, OKRs, progress tracking
- **Reports:** Any report across any department, drill-down capability

### Modules & Permissions

| Module      | Access Level         |
| ----------- | -------------------- |
| All modules | Read (cross-entity)  |
| Finance     | Full (global)        |
| HR          | Full (global)        |
| Approvals   | Process (high-level) |
| Analytics   | Full (global)        |
| Governance  | Full                 |

### Key User Journeys

1. **Morning Review:** Login → View executive dashboard → Check revenue → Review enrollment → Scan alerts → Drill down on anomaly
2. **Budget Approval:** Receive budget request → Review justification → Compare with forecast → Approve/decline → Notify finance
3. **Quarterly Review:** Generate Q report → Analyze vs OKRs → Identify gaps → Adjust strategy → Communicate to team
4. **Crisis Response:** Alert triggers (e.g., low enrollment) → Drill into data → Convene meeting → Decide action → Track response

### Notifications

- KPI threshold breached
- Major approval pending
- Weekly summary report
- Critical system alert
- Board meeting reminder

---

## 1.10 Client

**Tagline:** "I need results delivered, not process explained."

### Goals

- Engage academy for technology services
- Receive and review proposals/quotations
- Track project progress transparently
- Communicate with project team
- Pay invoices and manage account
- Submit support tickets

### Dashboard

- **Client Portal:** Active projects, recent invoices, support tickets
- **Proposals:** View received proposals, accept/reject, negotiate
- **Projects:** Timeline, milestones, deliverables, progress %, team
- **Task Board:** View project tasks, comment, approve deliverables
- **Invoices:** View, pay online, download receipts, payment history
- **Support:** Create ticket, track status, view resolution
- **Contracts:** View active contracts, terms, renewals
- **Messaging:** Communicate with project manager and team
- **Documents:** Shared files, contracts, SOW, reports

### Modules & Permissions

| Module    | Access Level                     |
| --------- | -------------------------------- |
| CRM       | Read Own (profile, history)      |
| Projects  | Read (own projects), Comment     |
| Finance   | Read (own invoices), Pay         |
| Support   | Create, Read Own, Update         |
| Contracts | Read Own                         |
| Documents | Read Own (shared), Upload        |
| Messaging | Full (own project conversations) |

### Key User Journeys

1. **Project Kickoff:** Sign contract → Kickoff meeting → Access project board → See milestones → Receive welcome kit
2. **Project Tracking:** Login → View project dashboard → Check progress → Review deliverables → Approve → Next milestone
3. **Issue Reporting:** Problem occurs → Create support ticket → Describe issue → Track resolution → Confirm closure
4. **Invoice Payment:** Receive invoice notification → View details → Pay via card/bank → Download receipt

### Notifications

- New proposal received
- Project milestone reached
- Invoice issued
- Payment received (confirmation)
- Ticket status changed
- Contract expiry reminder
- New deliverable ready for review

---

## 1.11 Employer

**Tagline:** "I need skilled talent, ready to contribute."

### Goals

- Post job openings and internships
- Browse student/alumni portfolios
- Receive candidate recommendations
- Schedule interviews
- Provide feedback on hires
- Build pipeline of future talent

### Dashboard

- **Employer Hub:** Active listings, candidate pipeline, past hires
- **Job Management:** Post, edit, close listings; view applications
- **Talent Search:** Search by skill, experience, certification; view portfolios
- **Candidate Pipeline:** Review matched candidates, shortlist, reject
- **Interview Scheduler:** Propose times, confirm, video call integration
- **Feedback:** Rate candidates post-interview, rate hires post-placement
- **Analytics:** Hiring metrics, time-to-hire, retention of hires
- **Brand Page:** Company profile for students to view

### Modules & Permissions

| Module      | Access Level                     |
| ----------- | -------------------------------- |
| Marketplace | Create (jobs), Read (candidates) |
| Portfolios  | Read (student/alumni)            |
| Messaging   | Full (candidate conversations)   |
| Calendar    | Create (interviews)              |
| Analytics   | Read Own                         |

### Key User Journeys

1. **Post a Job:** Create listing → Define role/skills/compensation → Set visibility → Publish → Receive applications → Review
2. **Find Talent:** Search by skill → View portfolios → Shortlist → Message candidates → Schedule interviews
3. **Hire & Feedback:** Conduct interviews → Select candidate → Notify → Fill placement survey → Track retention

### Notifications

- New applications for your job
- Student/skill match alert
- Interview reminder
- Candidate accepted offer
- Hire anniversary / feedback request

---

## 1.12 Partner

**Tagline:** "Together we achieve more."

### Goals

- Establish and manage partnership agreements
- Collaborate on joint initiatives (events, bootcamps, programs)
- Track partnership ROI and impact
- Access co-branded resources
- Refer students/clients to academy

### Dashboard

- **Partnership Hub:** Active partnerships, agreements, status
- **Agreements:** View/upload MOUs, contracts, terms
- **Collaborations:** Co-branded events, programs, content
- **Referral Portal:** Track referrals, rewards, payouts
- **Resources:** Co-branded materials, logos, guidelines
- **Reports:** Partnership impact, student referrals, revenue share
- **Messaging:** Communicate with partnership manager

### Modules & Permissions

| Module    | Access Level                     |
| --------- | -------------------------------- |
| CRM       | Read Own (partner profile)       |
| Community | Create (events, content)         |
| Marketing | Read (co-branded materials)      |
| Reports   | Read Own (partnership metrics)   |
| Finance   | Read Own (revenue share/payouts) |
| Messaging | Full (partnership conversations) |

### Key User Journeys

1. **Onboarding:** Sign agreement → Access partner portal → Upload logo → Set up referral link → Start collaboration
2. **Joint Event:** Propose event → Agree on format → Co-brand materials → Promote to both audiences → Execute → Report impact
3. **Referral Tracking:** Send referral link → Candidate applies/enrolls → Track status → Receive payout → Review performance

### Notifications

- Partnership agreement expiry
- New referral converted
- Payout issued
- Collaboration opportunity
- Report ready

---

## 1.13 Volunteer

**Tagline:** "I want to contribute my time and skills meaningfully."

### Goals

- Find volunteer opportunities
- Sign up and track hours
- Connect with volunteer community
- Receive certificates of appreciation
- Build volunteer portfolio

### Dashboard

- **Opportunities:** List of open volunteer roles (events, teaching, admin, community)
- **My Volunteering:** Current sign-ups, past activities, hours logged
- **Hours Tracker:** Clock in/out for events, manual logging with approval
- **Community:** Volunteer group chat, forums
- **Certificates:** Download appreciation certificates
- **Impact:** Visual of contributions (hours, people helped, events)

### Modules & Permissions

| Module       | Access Level                         |
| ------------ | ------------------------------------ |
| Community    | Read, Create (posts)                 |
| Events       | Read, Create (sign-up)               |
| Attendance   | Create (own hours, pending approval) |
| Certificates | Read Own                             |
| Profile      | Update Own                           |

### Key User Journeys

1. **Sign Up:** Browse opportunities → Read description → Register → Receive confirmation → Attend → Log hours → Get certificate
2. **Event Volunteering:** Volunteer for event → Receive briefing → Check in at event → Perform duties → Check out → Hours approved
3. **Community Contribution:** Join volunteer group → Participate in discussions → Suggest ideas → Lead initiative → Earn recognition

### Notifications

- New volunteer opportunity
- Event reminder
- Hours approved
- Certificate available
- Volunteer appreciation event

---

## 1.14 Intern

**Tagline:** "I gain real experience while I learn."

### Goals

- Complete assigned tasks and projects
- Track timesheets
- Receive mentorship and feedback
- Build professional portfolio
- Get evaluation and recommendation

### Dashboard

- **Intern Hub:** Active tasks, mentor info, project timeline
- **Tasks:** View assigned tasks, submit deliverables, track status
- **Timesheet:** Log hours, submit weekly, approved by supervisor
- **Mentorship:** Mentor contact, session schedule, session notes
- **Learning Plan:** Skills to develop, resources assigned, progress
- **Evaluation:** Self-assessment, supervisor evaluations, final review
- **Portfolio:** Projects completed, skills gained, recommendation letters
- **Messaging:** Communicate with supervisor and team

### Modules & Permissions

| Module     | Access Level                                      |
| ---------- | ------------------------------------------------- |
| Projects   | Read (assigned), Create (deliverables)            |
| HR         | Create (timesheet), Read Own                      |
| Mentorship | Read (assigned mentor), Create (session requests) |
| Portfolio  | Create Own                                        |
| Calendar   | Read (schedule), Create (own events)              |
| Messaging  | Full (team conversations)                         |

### Key User Journeys

1. **Onboarding:** Accept offer → Complete paperwork → Set up accounts → Meet team → Review learning plan → Start tasks
2. **Daily Work:** Check tasks → Work on deliverables → Log hours → Ask mentor questions → Submit work → Get feedback
3. **Mid/End Review:** Self-evaluation → Supervisor evaluation → Review session → Receive feedback → Get recommendation letter

### Notifications

- New task assigned
- Timesheet due
- Mentor session scheduled
- Evaluation due
- Task overdue
- Internship completion / extension

---

## 1.15 Alumni

**Tagline:** "Once an Elias, always an Elias."

### Goals

- Stay connected with the academy community
- Access networking and career opportunities
- Mentor current students
- Participate in alumni events
- Give back (donations, guest talks, referrals)

### Dashboard

- **Alumni Hub:** Updates, events, networking opportunities
- **Network:** Search other alumni, connect, message
- **Mentorship:** Sign up to mentor current students
- **Jobs:** Access job board, refer jobs
- **Events:** View/sign up for alumni events, reunions
- **Give Back:** Donation portal, guest lecture sign-up, sponsorship
- **Success Stories:** Share your journey, get featured
- **Profile:** Update professional info, employment, achievements

### Modules & Permissions

| Module      | Access Level                    |
| ----------- | ------------------------------- |
| Community   | Full                            |
| Events      | Read, Create (sign-up)          |
| Marketplace | Read (jobs), Create (referrals) |
| Mentorship  | Create (offer mentorship)       |
| CRM         | Update Own Profile              |
| Giving      | Create (donations)              |
| Content     | Create (success stories)        |

### Key User Journeys

1. **Stay Connected:** Update profile → Browse news → RSVP for reunion → Connect with classmates → Share job referral
2. **Give Back:** Sign up as mentor → Get matched with student → Conduct sessions → Guide career → Celebrate their success
3. **Career Update:** Got a promotion → Update profile → Share success story → Featured on alumni page → Inspire students

### Notifications

- Alumni event invitation
- New mentorship opportunity
- Donation drive
- Student seeking mentor in your field
- Alumni spotlight request

---

## 1.16 Visitor

**Tagline:** "I'm just visiting. Make it easy."

### Goals

- Schedule a campus visit
- Check in quickly on arrival
- Get basic information
- Leave feedback

### Dashboard (Minimal)

- **Visit Request:** Form to schedule visit with date/time/purpose
- **Check-in:** QR code for quick check-in on arrival
- **Info:** Digital brochure, campus map, FAQ

### Modules & Permissions

| Module             | Access Level           |
| ------------------ | ---------------------- |
| Visitor Management | Create (visit request) |
| Public CMS         | Read                   |

### Key User Journeys

1. **Schedule Visit:** Fill form → Select date/time → Receive confirmation QR → Arrive → Scan QR → Get badge → Visit → Check out
2. **Walk-in:** Arrive → Reception logs you → Get visitor badge → Complete visit → Check out

### Notifications

- Visit confirmed
- Visit reminder
- Post-visit feedback request

---

## 1.17 Supplier

**Tagline:** "Reliable partner for the academy's needs."

### Goals

- Receive and fulfill purchase orders
- Submit invoices for payment
- Track delivery status
- Maintain business profile
- Communicate with procurement

### Dashboard

- **Orders:** View POs, status, history
- **Deliveries:** Schedule deliveries, mark as delivered
- **Invoices:** Submit invoices, track payment status
- **Profile:** Company info, certifications, product catalog
- **Messaging:** Communicate with procurement team
- **Performance:** Delivery ratings, payment punctuality

### Modules & Permissions

| Module      | Access Level                      |
| ----------- | --------------------------------- |
| Procurement | Read (own POs), Create (invoices) |
| Inventory   | Read (relevant)                   |
| Finance     | Read Own (payment status)         |
| Messaging   | Full (procurement conversations)  |

### Key User Journeys

1. **Order Fulfillment:** Receive PO → Confirm → Prepare goods → Deliver → Mark delivered → Submit invoice → Track payment
2. **Profile Update:** Update catalog → Add certifications → Respond to RFP → Get new orders

### Notifications

- New PO received
- Delivery reminder
- Payment issued
- Contract renewal
- Performance review

---

## 1.18 Accountant

**Tagline:** "Every cent tracked. Every report accurate."

### Goals

- Manage accounts payable and receivable
- Process invoices and payments
- Generate financial reports
- Manage budgets and forecasts
- Ensure compliance with tax regulations

### Dashboard

- **Finance Hub:** Summary of AR, AP, cash flow, bank balance
- **Invoicing:** Create invoices, send to clients, track payments
- **Billing:** Receive supplier invoices, approve for payment
- **Payments:** Process payments (manual/batch), reconcile
- **Expenses:** Employee expense claims, approve, reimburse
- **Payroll:** Process salaries, deductions, payslips
- **Budgets:** Department budgets, track vs actual
- **Reports:** P&L, balance sheet, cash flow, tax reports
- **Banking:** Bank account reconciliation, transaction import
- **Audit:** Transaction log, audit trail export

### Modules & Permissions

| Module      | Access Level                  |
| ----------- | ----------------------------- |
| Finance     | Full                          |
| HR          | Read (payroll data)           |
| Procurement | Read (POs for reconciliation) |
| Reports     | Full (financial)              |
| Governance  | Read (audit logs)             |

### Key User Journeys

1. **Monthly Closing:** Reconcile bank → Review AR/AP → Post adjustments → Run P&L → Review with Director → Close period
2. **Invoice Client:** Create invoice → Send to client → Track → Receive payment → Reconcile → Mark paid
3. **Payroll Run:** Verify timesheets → Calculate salaries → Deductions → Process payments → Generate payslips → Distribute

### Notifications

- Payment overdue
- Invoice received for approval
- Budget threshold exceeded
- Payroll due
- Bank reconciliation mismatch
- Audit request

---

## 1.19 HR Officer

**Tagline:** "Great people make a great academy."

### Goals

- Manage employee lifecycle (hire to retire)
- Handle recruitment and onboarding
- Manage leave and attendance
- Conduct performance reviews
- Maintain employee records
- Ensure compliance with labor laws

### Dashboard

- **HR Hub:** Headcount, open positions, pending leave, upcoming reviews
- **Recruitment:** Job postings, applications, interview scheduling, offers
- **Employee Database:** Full directory, contracts, documents, history
- **Leave Management:** Leave requests, balances, calendar
- **Attendance:** Staff attendance, lateness, absenteeism
- **Performance:** Review cycles, goals, appraisals, feedback
- **Payroll:** Input changes, verify, send to finance
- **Onboarding/Offboarding:** Checklists, IT setup, document collection
- **Training:** Staff training records, certifications
- **Reports:** Turnover, satisfaction, diversity, compliance

### Modules & Permissions

| Module      | Access Level                              |
| ----------- | ----------------------------------------- |
| HR          | Full                                      |
| Recruitment | Full                                      |
| Finance     | Read (payroll input)                      |
| Reports     | Full (HR)                                 |
| Documents   | Full (employee)                           |
| Automation  | Create (onboarding/offboarding workflows) |

### Key User Journeys

1. **Recruitment:** Open requisition → Post job → Screen applications → Schedule interviews → Evaluate → Extend offer → Contract signed → Onboard
2. **Leave Management:** Employee submits request → Verify balance → Approve/decline → Update calendar → Notify team
3. **Performance Review:** Open review cycle → Send self-assessments → Schedule manager reviews → Compile results → Identify top/low performers → Plan development

### Notifications

- New job application
- Leave request pending
- Contract expiry
- Review cycle start
- New hire start date approaching
- Employee complaint/incident

---

## 1.20 Admissions Officer

**Tagline:** "From prospect to student — I guide the journey."

### Goals

- Process incoming applications
- Communicate with prospective students
- Schedule interviews and entrance exams
- Verify documents
- Manage enrollment and intake numbers
- Track conversion metrics

### Dashboard

- **Admissions Hub:** Application volume, conversion funnel, targets
- **Applications:** List view, filter by status, stage, program
- **Review Pipeline:** Review applications, mark shortlist/reject, add notes
- **Interviews:** Schedule, conduct (or mark as conducted), log results
- **Document Verification:** Checklist per applicant, upload verified docs
- **Communication:** Send offer letters, rejection emails, follow-ups
- **Enrollment:** Accepted students, paid vs pending, orientation
- **Reports:** Conversion rates, source analysis, demographics

### Modules & Permissions

| Module        | Access Level                      |
| ------------- | --------------------------------- |
| Admissions    | Full                              |
| CRM           | Full (prospects)                  |
| Communication | Full (mass email, templates)      |
| Documents     | Read (applicant), Update (verify) |
| Reports       | Full (admissions)                 |
| Calendar      | Create (interview schedules)      |

### Key User Journeys

1. **Application Review:** New application alert → Review profile → Check documents → Shortlist or reject → Schedule interview → Log decision
2. **Interview Day:** View interview schedule → Access applicant info → Interview → Record assessment → Update status → Send follow-up
3. **Enrollment Conversion:** Accepted student → Send offer → Follow up → Payment received → Confirm enrollment → Hand off to student services

### Notifications

- New application received
- Documents pending verification
- Interview scheduled
- Offer accepted/rejected
- Enrollment target update
- New inquiry received from website

---

## 1.21 Marketing Officer

**Tagline:** "Fill the pipeline. Build the brand."

### Goals

- Drive enrollment inquiries and applications
- Manage campaigns across channels
- Create and publish marketing content
- Track leads and attribution
- Analyze campaign performance and ROI

### Dashboard

- **Marketing Hub:** Campaign performance, leads, conversion funnel
- **Campaigns:** Multi-channel campaigns (email, social, ads, events)
- **Content Calendar:** Blog posts, social media, emails, videos
- **Email Marketing:** Create campaigns, manage lists, track opens/clicks
- **Landing Pages:** Build and A/B test landing pages (Vercel)
- **Lead Management:** View leads from all sources, score, route
- **SEO:** Keyword tracking, rank monitoring, content suggestions
- **Social Media:** Schedule posts, engagement metrics
- **Analytics:** CAC, ROAS, conversion by channel, attribution
- **Reports:** Marketing performance, enrollment source analysis

### Modules & Permissions

| Module     | Access Level                            |
| ---------- | --------------------------------------- |
| Marketing  | Full                                    |
| CRM        | Create (leads), Read, Update            |
| CMS        | Full (public content)                   |
| Analytics  | Full (marketing)                        |
| Community  | Create (promoted content)               |
| Reports    | Full (marketing)                        |
| Automation | Create (email sequences, nurture flows) |

### Key User Journeys

1. **Campaign Launch:** Define target audience → Create landing page → Set up email sequence → Launch ads → Track leads → Optimize → Report
2. **Content Creation:** Plan content → Write blog → Publish (CMS) → Promote (social/email) → Track engagement → Iterate
3. **Lead Nurturing:** New lead enters CRM → Score → Route to admissions → Follow-up email sequence → Track conversion → Attribute source

### Notifications

- Lead conversion milestone
- Campaign budget threshold
- SEO ranking change
- Social mention/engagement spike
- Enrollment target vs actual gap

---

## 1.22 IT Support

**Tagline:** "When something breaks, I fix it."

### Goals

- Respond to and resolve technical issues
- Manage IT assets and inventory
- Monitor system health
- Support user onboarding/offboarding
- Maintain documentation

### Dashboard

- **Ticket Hub:** Open tickets, priority queue, SLA status
- **Ticket Management:** Create, assign, resolve, escalate tickets
- **Asset Management:** Hardware inventory, assignment, lifecycle
- **System Monitoring:** Service status, uptime, incident alerts
- **Knowledge Base:** Internal IT docs, troubleshooting guides
- **User Management:** Account creation, password reset, access review
- **Remote Support:** Screen sharing, remote control tools
- **Reports:** Ticket volume, resolution time, common issues

### Modules & Permissions

| Module          | Access Level                                    |
| --------------- | ----------------------------------------------- |
| Support         | Full                                            |
| Inventory       | Read (IT assets), Update                        |
| HR              | Read (employee list for onboarding/offboarding) |
| Knowledge Base  | Create, Update                                  |
| System Settings | Read (monitoring)                               |
| User Management | Create (accounts), Reset passwords              |

### Key User Journeys

1. **Ticket Resolution:** Ticket assigned → Review issue → Diagnose → Fix → Log resolution → Close ticket → Request feedback
2. **New Hire Setup:** Receive onboarding notice → Create accounts → Assign hardware → Configure access → Deliver to employee → Log assets
3. **System Outage:** Alert received → Assess impact → Communicate status → Fix → Verify → Post-mortem → Update docs

### Notifications

- New high-priority ticket
- SLA breach warning
- System down alert
- Asset warranty expiring
- New hire setup due

---

## 1.23 Developer

**Tagline:** "I build and integrate. The platform evolves through me."

### Goals

- Develop features and fix bugs
- Access API documentation and test endpoints
- Deploy code to staging/production
- Monitor application performance
- Collaborate with team on code reviews

### Dashboard

- **Dev Hub:** Assigned tasks, PRs, deployments, monitoring
- **API Playground:** Interactive API docs (Swagger/OpenAPI), test endpoints
- **Deployments:** Deployment history, rollback option, status
- **Monitoring:** Error tracking, performance metrics, logs
- **Tasks:** Assigned dev tasks from project management
- **Git Integration:** PR status, CI/CD pipeline status
- **Documentation:** Internal dev docs, architecture, coding standards
- **Team:** Code review queue, team chat

### Modules & Permissions

| Module             | Access Level                  |
| ------------------ | ----------------------------- |
| API                | Full (internal access)        |
| System Settings    | Read (config, env vars)       |
| Project Management | Read (assigned tasks), Update |
| Monitoring         | Read                          |
| Documentation      | Full (dev docs)               |

### Key User Journeys

1. **Feature Development:** Pick task → Branch → Code → Test locally → Push → Create PR → Code review → Merge → Deploy → Monitor
2. **Bug Fix:** Bug report → Reproduce → Debug → Fix → Write test → PR → Deploy → Verify fix → Close ticket
3. **API Integration:** Read API docs → Generate key → Test endpoint → Integrate → Deploy → Monitor

### Notifications

- PR review requested
- Build failing
- Deployment complete
- Error spike detected
- New API version released

---

## 1.24 System Administrator

**Tagline:** "The platform is secure, fast, and available."

### Goals

- Manage users, roles, and permissions across the system
- Ensure system security and compliance
- Monitor performance and uptime
- Manage backups and disaster recovery
- Configure system settings and integrations

### Dashboard

- **Admin Hub:** System health, active users, security alerts
- **User Management:** Create/edit users, assign roles, suspend/delete
- **Role & Permissions:** RBAC configuration, role templates, audit
- **Security:** Login attempts, 2FA config, API keys, IP whitelist
- **Audit Log:** All system activities, search, export
- **System Config:** Global settings, feature flags, maintenance mode
- **Monitoring:** CPU, memory, requests, error rate
- **Backups:** Schedule, run, restore test, retention policy
- **Integrations:** Webhooks, third-party API keys, OAuth config
- **Logs:** Application logs, error logs, access logs

### Modules & Permissions

| Module          | Access Level |
| --------------- | ------------ |
| All modules     | Read         |
| User Management | Full         |
| System Settings | Full         |
| Security        | Full         |
| Audit           | Full         |
| Monitoring      | Full         |
| Governance      | Full         |

### Key User Journeys

1. **New User Setup:** Request received → Create user → Assign role → Set permissions → Notify user → Log action
2. **Security Review:** Check audit log → Review failed logins → Verify 2FA adoption → Check API key usage → Generate security report → Recommend changes
3. **System Maintenance:** Enable maintenance mode → Backup DB → Deploy update → Run migrations → Test → Disable maintenance → Verify

### Notifications

- Failed login spike
- New user registration (approval needed)
- Backup failure
- Storage threshold
- SSL cert expiry
- Suspicious activity detected

---

## 1.25 Government Representative

**Tagline:** "I verify compliance and accredit quality."

### Goals

- Verify the academy meets regulatory standards
- Access compliance reports and documentation
- Review accreditation data
- Conduct audits (remote/onsite)
- Receive required filings

### Dashboard

- **Compliance Portal:** Accreditation status, compliance score
- **Institutional Data:** Student enrollment, graduation rates, faculty data
- **Reports (Regulatory):** Pre-built reports for submission
- **Documentation:** Policies, procedures, certificates on file
- **Audit Module:** Schedule audit, upload findings, track remediation
- **Filings:** Required filings, deadlines, submission history
- **Messaging:** Communicate with compliance officer

### Modules & Permissions

| Module     | Access Level                    |
| ---------- | ------------------------------- |
| Governance | Read (compliance data)          |
| Reports    | Read (regulatory reports)       |
| Analytics  | Read (institutional data)       |
| Documents  | Read (policies, certificates)   |
| Messaging  | Full (compliance conversations) |

### Key User Journeys

1. **Annual Compliance Review:** Receive access → Review institutional data → Check documentation → Run compliance report → Submit findings → Schedule follow-up
2. **Accreditation Audit:** Announce audit → Access all required docs → Conduct review → Identify gaps → Share report → Track remediation → Certify

### Notifications

- Filing deadline approaching
- Report ready for review
- Audit scheduled
- Remediation overdue
- Accreditation renewal

---

## 1.26 NGO

**Tagline:** "Education changes communities. Let's partner."

### Goals

- Partner with academy on community initiatives
- Manage scholarship programs
- Track community impact
- Coordinate volunteers and outreach
- Access reports for donors

### Dashboard

- **Partnership Hub:** Active programs, impact metrics
- **Scholarships:** Create/manage scholarship funds, recipient selection
- **Community Programs:** Outreach events, beneficiaries, impact
- **Volunteers:** Manage volunteer deployment, hours tracking
- **Reports:** Impact reports, beneficiary data, financial usage
- **Messaging:** Communicate with community engagement team
- **Donations:** Track donations from NGO to academy

### Modules & Permissions

| Module       | Access Level                  |
| ------------ | ----------------------------- |
| Community    | Full (program management)     |
| Scholarships | Create, Manage                |
| Events       | Create, Manage                |
| Volunteers   | Read, Coordinate              |
| Reports      | Read (impact)                 |
| Finance      | Read (scholarship fund usage) |
| Messaging    | Full                          |

### Key User Journeys

1. **Scholarship Program:** Define criteria → Allocate funds → Receive applications → Select recipients → Disburse → Track progress → Report impact
2. **Community Outreach:** Plan event → Coordinate with academy → Recruit volunteers → Execute → Track beneficiaries → Report to donors
3. **Impact Reporting:** Compile data → Generate impact report → Share with donors → Celebrate results → Plan next initiative

### Notifications

- Scholarship application deadline
- Event milestone
- Volunteer hours logged
- Impact report ready
- Fund utilization threshold

---

# 2. Grand App Plan

## 2.1 Architecture Overview

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                    VERCEL (Frontend)                  â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚           Next.js Application (React 19)         â”‚ â”‚
â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚ â”‚
â”‚  â”‚  â”‚Publicâ”‚ â”‚Studentâ”‚ â”‚Admin â”‚ â”‚ Dynamic Role   â”‚ â”‚ â”‚
â”‚  â”‚  â”‚Pages â”‚ â”‚Portal â”‚ â”‚Portalâ”‚ â”‚ Dashboard      â”‚ â”‚ â”‚
â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ â”‚
â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚ â”‚
â”‚  â”‚  â”‚   Shared Component Library (shadcn/ui)       â”‚ â”‚ â”‚
â”‚  â”‚  â”‚   State: Redux Toolkit + RTK Query           â”‚ â”‚ â”‚
â”‚  â”‚  â”‚   Forms: React Hook Form + Zod              â”‚ â”‚ â”‚
â”‚  â”‚  â”‚   Tables: TanStack Table                    â”‚ â”‚ â”‚
â”‚  â”‚  â”‚   Charts: Recharts                          â”‚ â”‚ â”‚
â”‚  â”‚  â”‚   Animations: Framer Motion                 â”‚ â”‚ â”‚
â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                       â”‚ HTTPS
                       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                CLOUDFLARE WORKERS (API Gateway)       â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚                  Hono API Server                 â”‚ â”‚
â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â” â”‚ â”‚
â”‚  â”‚  â”‚Auth RW â”‚ â”‚  RBAC    â”‚ â”‚  Rate  â”‚ â”‚  Audit â”‚ â”‚ â”‚
â”‚  â”‚  â”‚Middlewareâ”‚ â”‚Middlewareâ”‚ â”‚ Limiterâ”‚ â”‚ Logger â”‚ â”‚ â”‚
â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
           â”‚          â”‚          â”‚          â”‚
           â–¼          â–¼          â–¼          â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  D1 (SQL) â”‚ â”‚ KV (Cache)â”‚ â”‚R2 (Files)â”‚ â”‚ Queues    â”‚
â”‚ (Drizzle  â”‚ â”‚ (Session)â”‚ â”‚(Images,  â”‚ â”‚ (Email,   â”‚
â”‚  ORM)     â”‚ â”‚ (Config) â”‚ â”‚ Docs)    â”‚ â”‚  Notifs)  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
           â”‚                     â”‚
           â–¼                     â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Durable Objects   â”‚ â”‚ Cloudflare Workflows          â”‚
â”‚ (Real-time: chat, â”‚ â”‚ (Long-running: onboarding,    â”‚
â”‚  collaboration)   â”‚ â”‚  admissions pipeline)         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Frontend (Vercel — Next.js)

- **Why Vercel:** Optimal Next.js hosting, edge functions, ISR, preview deployments
- **App Structure:** Monorepo with `apps/web` (Next.js) and `packages/ui` (shared components)
- **Routing:** App Router with role-based route groups `(public)/`, `(student)/`, `(staff)/`, `(admin)/`
- **Authentication:** OAuth (Google, GitHub) + Email/Password via Cloudflare + Magic Link
- **Deployment:** Automatic deploys from `main` branch, preview deploys for PRs

### Backend (Cloudflare Workers — Hono)

- **Why Cloudflare:** Global edge distribution, zero cold starts (Workers), integrated ecosystem
- **API:** RESTful + GraphQL (for complex queries), Hono framework
- **Database:** D1 (SQLite-compatible, distributed) with Drizzle ORM for type safety
- **File Storage:** R2 (S3-compatible, no egress fees)
- **Cache/Sessions:** KV for session tokens, cache, config
- **Async Tasks:** Queues for email, notifications, background processing
- **Real-time:** Durable Objects for chat, collaborative editing, live class streams
- **Workflows:** Cloudflare Workflows for multi-step processes (admissions, onboarding, leave approval)

---

## 2.2 Module Inventory

| #   | Module                      | Description                                             | Primary Actors               | Phase |
| --- | --------------------------- | ------------------------------------------------------- | ---------------------------- | ----- |
| 1   | **Authentication**          | Login, register, SSO, MFA, password reset, session mgmt | All                          | 0     |
| 2   | **RBAC / Permissions**      | Role definitions, permission policies, access control   | System Admin                 | 0     |
| 3   | **User Management**         | CRUD users, profile, preferences                        | System Admin, HR             | 0     |
| 4   | **Audit Trail**             | All system actions logged, searchable, exportable       | System Admin, Director       | 0     |
| 5   | **Notifications**           | In-app, email, SMS, push, templates, preferences        | All                          | 0     |
| 6   | **CMS (Public)**            | Public pages, blog, course catalog, about, contact      | Marketing Officer, Visitor   | 0     |
| 7   | **Analytics Engine**        | Event tracking, metrics, dashboards                     | Director, All (limited)      | 0     |
| 8   | **AI Infrastructure**       | AI service abstraction, prompt mgmt, usage tracking     | All (via features)           | 0     |
| 9   | **Automation Engine**       | Workflow builder, triggers, actions, scheduled tasks    | Operations, System Admin     | 0     |
| 10  | **Learning**                | Courses, modules, lessons, materials, progress tracking | Student, Instructor          | 1     |
| 11  | **Assessments**             | Quizzes, exams, auto-grading, manual grading, results   | Student, Instructor          | 1     |
| 12  | **Assignments**             | Homework, projects, submission, grading, feedback       | Student, Instructor          | 1     |
| 13  | **Attendance**              | Class check-in, tracking, reports                       | Student, Instructor          | 1     |
| 14  | **Certificates**            | Issuance, templates, verification, download             | Student, Admin               | 1     |
| 15  | **Calendar**                | Events, schedules, deadlines, sync                      | All                          | 1     |
| 16  | **Messaging**               | DMs, group chat, announcements, read receipts           | All                          | 1     |
| 17  | **Grades / Gradebook**      | Score tracking, GPA, transcripts                        | Student, Instructor          | 1     |
| 18  | **Portfolio**               | Projects, skills, experience, CV builder, share         | Student, Alumni              | 2     |
| 19  | **Marketplace (Freelance)** | Job posts, applications, hiring, payments               | Student, Employer            | 2     |
| 20  | **Job Board**               | Full-time roles, internships, applications              | Student, Employer, Alumni    | 2     |
| 21  | **Recruitment**             | Candidate mgmt, interviews, offers                      | Employer, HR                 | 2     |
| 22  | **CRM**                     | Contact mgmt, lead scoring, pipeline, history           | Admissions, Marketing, Sales | 3     |
| 23  | **Client Portal**           | Proposals, projects, invoices, support                  | Client, Project Manager      | 3     |
| 24  | **Proposals & Quotations**  | Create, send, approve/reject, versioning                | Sales, Client                | 3     |
| 25  | **Project Management**      | Tasks, milestones, timelines, team, deliverables        | PM, Client, Team             | 3     |
| 26  | **Support Tickets**         | Create, assign, resolve, SLA, knowledge base            | Client, IT Support, All      | 3     |
| 27  | **Contracts**               | Templates, signing, storage, expiry tracking            | Legal, Client, Partner       | 3     |
| 28  | **Finance**                 | Invoicing, payments, expenses, budgets, reconciliation  | Accountant, Director         | 4     |
| 29  | **Payroll**                 | Salary, deductions, payslips, tax filings               | Accountant, HR               | 4     |
| 30  | **HR**                      | Employee records, attendance, leave, performance        | HR, Employee                 | 4     |
| 31  | **Inventory**               | Stock, assets, check-in/out, reorder, suppliers         | Operations, IT Support       | 4     |
| 32  | **Procurement**             | POs, vendor management, delivery tracking               | Operations, Supplier         | 4     |
| 33  | **Branches**                | Multi-branch management, distribution                   | Operations, Director         | 4     |
| 34  | **Admissions**              | Applications, reviews, interviews, enrollment, offers   | Admissions Officer, Prospect | 4     |
| 35  | **Community**               | Forums, groups, events, discussions                     | All (esp. Community)         | 5     |
| 36  | **Events**                  | Create, promote, register, check-in, feedback           | Community, Marketing         | 5     |
| 37  | **Scholarships**            | Funds, applications, selection, disbursement            | NGO, Admissions              | 5     |
| 38  | **Alumni**                  | Directory, networking, mentoring, giving                | Alumni                       | 5     |
| 39  | **Partners**                | MOUs, collaborations, referrals, revenue share          | Partner, Business Dev        | 5     |
| 40  | **Volunteers**              | Opportunities, sign-up, hours, certificates             | Volunteer, Community         | 5     |
| 41  | **AI Assessment**           | Auto-grade essays, plagiarism check, feedback gen       | Instructor, Student          | 6     |
| 42  | **AI Recommendations**      | Course, career, mentor recommendations                  | Student                      | 6     |
| 43  | **AI Teaching Assistant**   | Q&A, tutoring, content explanation                      | Student, Instructor          | 6     |
| 44  | **AI Content Generator**    | Lesson plans, quiz generation, summaries                | Instructor                   | 6     |
| 45  | **Business Intelligence**   | Predictive analytics, trend detection, forecasting      | Director, Department Head    | 6     |
| 46  | **Visitor Management**      | Pre-registration, check-in, badge, host notifications   | Receptionist, Visitor        | 0     |
| 47  | **Knowledge Base**          | FAQs, guides, troubleshooting, searchable               | All                          | 1     |
| 48  | **Governance / Compliance** | Policies, regulatory filings, audit support             | Director, Gov. Rep           | 5     |
| 49  | **Mobile (PWA)**            | Offline support, push notifications, mobile-first UI    | All                          | 0     |
| 50  | **API**                     | Public API, webhooks, developer docs                    | Developer, Third-party       | 0     |

---

## 2.3 Phase-by-Phase Build Plan

### Phase 0 — Foundation (Months 1-2)

**Goal:** Scaffold the platform. No business features yet. Just the chassis.

**Deliverables:**

- [x] Next.js project scaffold with App Router
- [x] Cloudflare Workers API scaffold with Hono
- [x] D1 database setup + Drizzle schema for users, roles, permissions
- [x] Authentication (email/password + OAuth) via Workers
- [x] RBAC system (roles, permissions, middleware)
- [x] User profile CRUD
- [x] Audit trail on all mutations
- [x] Notification system (in-app + email via Queues)
- [x] Public CMS (pages, blog, course catalog)
- [x] Analytics event capture infrastructure
- [x] Basic component library (shadcn/ui) in monorepo
- [x] Dark/light mode
- [x] PWA setup (manifest, service worker for offline)
- [x] Visitor management (basic check-in)
- [x] AI infrastructure (API abstraction layer)
- [x] Automation engine (simple workflow builder)
- [x] CI/CD pipelines (Vercel + Cloudflare)
- [x] Monitoring and error tracking

**Actors enabled:** Visitor, System Admin, Developer

### Phase 1 — Education Engine (Months 3-5)

**Goal:** Core learning functionality live.

**Deliverables:**

- [x] Course builder (modules, lessons, materials)
- [x] Student enrollment in courses
- [x] Lesson viewer (video, PDF, text, embedded)
- [x] Assignment submission and grading
- [x] Quiz/exam engine with auto-grading (MCQ, true/false)
- [x] Gradebook for students and instructors
- [x] Attendance tracking (QR code check-in)
- [x] Certificate generation and verification
- [x] Progress tracking per course
- [x] Calendar integration
- [x] Messaging system (DMs, group chats)
- [x] Knowledge base (FAQs, student guides)

**Actors enabled:** Current Student, Instructor

### Phase 2 — Career Engine (Months 5-7)

**Goal:** Bridge learning to earning.

**Deliverables:**

- [x] Portfolio builder (projects, skills, endorsements)
- [x] CV/resume generator
- [x] Freelance marketplace (post jobs, apply, hire)
- [x] Job board (full-time, internships)
- [x] Employer portal (search talent, manage listings)
- [x] Candidate matching and recommendations
- [x] Interview scheduling
- [x] Placement tracking and analytics

**Actors enabled:** Employer, Alumni

### Phase 3 — Technology Services (Months 7-10)

**Goal:** Client-facing business operations.

**Deliverables:**

- [x] CRM (contacts, pipeline, lead scoring)
- [x] Client portal
- [x] Proposal and quotation generator
- [x] Project management (tasks, milestones, Gantt)
- [x] Client project dashboards
- [x] Support ticket system with SLA
- [x] Contract management (templates, e-sign)
- [x] Invoicing and online payments

**Actors enabled:** Client, Partner

### Phase 4 — Academy ERP (Months 10-14)

**Goal:** Run the company on the platform.

**Deliverables:**

- [x] Admissions pipeline (application → enrollment)
- [x] Finance (full AR/AP, invoicing, reconciliation)
- [x] Payroll processing
- [x] HR (employee records, leave, attendance)
- [x] Performance management (reviews, goals)
- [x] Inventory management
- [x] Procurement and supplier portal
- [x] Asset tracking
- [x] Branch management (multi-campus)
- [x] Budgeting and forecasting

**Actors enabled:** Admissions Officer, Accountant, HR Officer, Receptionist, Supplier, Operations Manager, Department Head

### Phase 5 — Community Engine (Months 14-17)

**Goal:** Build the ecosystem.

**Deliverables:**

- [x] Community forums (topics, posts, moderation)
- [x] Groups (study groups, interest groups)
- [x] Events (create, promote, register, attend)
- [x] Scholarship management
- [x] Alumni network and directory
- [x] Partnership management (MOUs, co-branded)
- [x] Volunteer portal (opportunities, hours)
- [x] NGO partnership programs
- [x] Mentorship matching

**Actors enabled:** Volunteer, NGO, Government Representative

### Phase 6 — AI Engine (Months 17-20)

**Goal:** Intelligence layer across everything.

**Deliverables:**

- [x] AI grading assistant (essays, open-ended)
- [x] Plagiarism detection
- [x] Course recommendations (personalized)
- [x] Career path recommendations
- [x] AI teaching assistant (Q&A bot)
- [x] Content summarization and generation
- [x] Predictive analytics (at-risk students)
- [x] Business intelligence dashboards
- [x] Sentiment analysis (feedback, forums)
- [x] Automated report generation

**Actors enabled:** Director (enhanced), All (enhanced)

---

## 2.4 Data Flow & Integration Map

### Core Data Entities (D1 Tables)

```
Users â”€â”€â–º Roles â”€â”€â–º Permissions
  â”‚
  â”œâ”€â”€â–º Students â”€â”€â–º Enrollments â”€â”€â–º Courses â”€â”€â–º Modules â”€â”€â–º Lessons
  â”‚       â”‚            â”‚
  â”‚       â”‚            â”œâ”€â”€â–º Assignments â”€â”€â–º Submissions â”€â”€â–º Grades
  â”‚       â”‚            â”œâ”€â”€â–º Assessments â”€â”€â–º Attempts â”€â”€â–º Results
  â”‚       â”‚            â””â”€â”€â–º Attendance
  â”‚       â”‚
  â”‚       â”œâ”€â”€â–º Portfolio â”€â”€â–º Projects
  â”‚       â”œâ”€â”€â–º Marketplace â”€â”€â–º Applications â”€â”€â–º Contracts
  â”‚       â””â”€â”€â–º Certificates
  â”‚
  â”œâ”€â”€â–º Instructors â”€â”€â–º Course Assignments
  â”‚       â””â”€â”€â–º Gradebook
  â”‚
  â”œâ”€â”€â–º Staff â”€â”€â–º HR Records â”€â”€â–º Leave â”€â”€â–º Attendance
  â”‚       â”œâ”€â”€â–º Payroll
  â”‚       â””â”€â”€â–º Performance Reviews
  â”‚
  â”œâ”€â”€â–º Clients â”€â”€â–º Projects â”€â”€â–º Tasks
  â”‚       â”œâ”€â”€â–º Invoices â”€â”€â–º Payments
  â”‚       â”œâ”€â”€â–º Support Tickets
  â”‚       â”‚â”€â”€â–º Proposals
  â”‚       â””â”€â”€â–º Contracts
  â”‚
  â”œâ”€â”€â–º Employers â”€â”€â–º Job Listings â”€â”€â–º Applications
  â”‚       â””â”€â”€â–º Hires
  â”‚
  â”œâ”€â”€â–º Partners â”€â”€â–º Agreements â”€â”€â–º Collaborations
  â”‚       â””â”€â”€â–º Referrals
  â”‚
  â””â”€â”€â–º Prospects â”€â”€â–º Applications â”€â”€â–º Enrollments

Organizations â”€â”€â–º Branches â”€â”€â–º Departments
  â””â”€â”€â–º Inventory â”€â”€â–º Assets
  â””â”€â”€â–º Suppliers â”€â”€â–º POs

Community â”€â”€â–º Forums â”€â”€â–º Posts â”€â”€â–º Comments
  â”œâ”€â”€â–º Events â”€â”€â–º Registrations
  â”œâ”€â”€â–º Groups â”€â”€â–º Members
  â””â”€â”€â–º Scholarships â”€â”€â–º Applications

Notifications â”€â”€â–º Templates â”€â”€â–º Queue
AuditLog
```

### Integration Points

| Integration               | Direction            | Technology          | Purpose                      |
| ------------------------- | -------------------- | ------------------- | ---------------------------- |
| Email (SendGrid / Resend) | CEA → External       | Cloudflare Queues   | Notifications, marketing     |
| SMS (Twilio)              | CEA → External       | Cloudflare Queues   | Alerts, OTP                  |
| Cloudflare Images         | CEA â†” R2             | R2 + Presigned URLs | User uploads, course media   |
| Payment (Paystack)         | CEA â†” Paystack        | Paystack API         | Tuition, client invoices     |
| Calendar Sync             | CEA â†” Google/Outlook | OAuth + API         | Two-way calendar sync        |
| Video (Zoom/Meet)         | CEA â†” External       | OAuth + API         | Class, meeting, interview    |
| Social Media              | CEA â†” Social APIs    | Queue + API         | Scheduled posting, analytics |
| CDN (Vercel)              | Vercel → Edge        | Next.js ISR         | Public content, images       |

---

## 2.5 Permission Matrix (RBAC)

This is a simplified matrix. Each cell = Read (R), Create (C), Update (U), Delete (D), or — (none).

| Module        | Student    | Instructor | Dept Head | Ops Mgr  | Director | Accountant | HR      | Sys Admin |
| ------------- | ---------- | ---------- | --------- | -------- | -------- | ---------- | ------- | --------- |
| Auth          | Own        | Own        | Own       | Own      | Own      | Own        | Own     | Full      |
| User Profile  | Own        | Own        | Own       | Own      | Own      | Own        | Own     | Full      |
| Learning      | R          | CRUD Own   | CRUD Dept | —        | R        | —          | —       | —         |
| Assessments   | R/C Own    | CRUD Own   | R Dept    | —        | R        | —          | —       | —         |
| Grades        | R Own      | CRUD Own   | R Dept    | —        | R        | —          | —       | —         |
| Attendance    | R Own      | CRUD       | R Dept    | R        | R        | —          | R       | —         |
| Certificates  | R Own      | C          | —         | —        | —        | —          | —       | —         |
| Portfolio     | CRUD Own   | R Mentee   | —         | —        | —        | —          | —       | —         |
| Marketplace   | R/C        | —          | —         | —        | R        | —          | —       | —         |
| CRM           | —          | —          | —         | —        | R        | —          | —       | —         |
| Client Portal | —          | —          | —         | —        | R        | R          | —       | —         |
| Projects      | R Assigned | R Assigned | R Dept    | R        | R        | —          | —       | —         |
| Support       | C          | C          | —         | —        | R        | —          | —       | Full      |
| Contracts     | —          | —          | —         | —        | R        | —          | —       | —         |
| Finance       | R Own      | —          | R Budget  | R Budget | Full     | Full       | —       | —         |
| Payroll       | —          | —          | —         | —        | R        | CRUD       | R Input | —         |
| HR            | —          | —          | R Dept    | —        | Full     | R Payroll  | Full    | —         |
| Inventory     | —          | —          | —         | Full     | R        | —          | —       | R         |
| Procurement   | —          | —          | —         | CRUD     | R        | R          | —       | —         |
| Admissions    | —          | —          | —         | —        | R        | —          | —       | —         |
| Community     | CRUD       | CRUD       | R         | R        | R        | —          | —       | Full      |
| Events        | R/C        | R/C        | R         | CRUD     | R        | —          | —       | —         |
| Alumni        | CRUD Own   | —          | —         | —        | R        | —          | —       | —         |
| Partners      | —          | —          | —         | —        | R        | —          | —       | —         |
| Reports       | R Own      | R Own      | R Dept    | R Ops    | Full     | Full Fin   | R HR    | Full      |
| Audit         | —          | —          | —         | —        | R        | R          | —       | Full      |
| System Config | —          | —          | —         | —        | —        | —          | —       | Full      |
| User Mgmt     | —          | —          | —         | —        | —        | —          | R Org   | Full      |
| Analytics     | R Own      | R Own      | R Dept    | R Ops    | Full     | R Fin      | R HR    | Full      |
| Governance    | —          | —          | —         | —        | Full     | —          | —       | Full      |

---

## 2.6 Infrastructure Map (Vercel + Cloudflare)

### Vercel (Frontend)

```
vercel.json
{
  "framework": "nextjs",
  "regions": ["iad1", "hkg1", "lhr1"],
  "functions": {
    "api/*": { "maxDuration": 30 }
  },
  "headers": [
    { "source": "/(.*)", "headers": [
      { "key": "X-Frame-Options", "value": "DENY" },
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
    ]}
  ]
}
```

**Deployment Strategy:**

- Production: `main` branch → auto-deploy to `cea.ng`
- Preview: every PR → unique preview URL
- Staging: `staging` branch → `staging.cea.ng`
- Environment variables: managed in Vercel dashboard per environment

### Cloudflare (Backend)

```
Workers:
  api.cea.ng/*          → Hono API server (all REST endpoints)
  auth.cea.ng/*          → Authentication service
  ws.cea.ng/*            → Durable Objects (WebSocket)
  cdn.cea.ng/*           → R2 asset proxy (images, files)

D1:
  cea-db-prod                 → Primary database
  cea-db-staging              → Staging database

R2:
  cea-uploads                 → User-uploaded files
  cea-assets                  → System assets (logos, templates)
  cea-backups                 → Database backups

KV:
  cea-sessions                → Session tokens
  cea-cache                   → API response cache
  cea-config                  → Feature flags, global config

Queues:
  cea-email-queue             → Email sending
  cea-notif-queue             → Push notifications
  cea-webhook-queue           → Outgoing webhooks
  cea-background-queue        → Heavy processing tasks

Durable Objects:
  cea-chat-room               → Real-time messaging rooms
  cea-collab-doc              → Collaborative document editing
  cea-live-class              → Live streaming / whiteboard

Workflows:
  admissions-pipeline         → Multi-step admissions process
  employee-onboarding         → New hire onboarding steps
  leave-approval              → Leave request approval chain
  invoice-collection          → Automated invoice follow-up

Cloudflare Pages:
  docs.cea.ng            → Developer documentation (public)

Cloudflare Images:
  cea-images                  → Optimized image delivery

Cloudflare Turnstile:
  cea-turnstile               → Bot protection on forms

Cloudflare Zero Trust:
  cea-internal                → Internal staff app access (zero-trust)
```

### DNS

```
cea.ng          â†’ Vercel (frontend)
api.cea.ng      â†’ Cloudflare Worker (API)
auth.cea.ng     â†’ Cloudflare Worker (Auth)
ws.cea.ng       â†’ Cloudflare Worker (WebSocket)
cdn.cea.ng      â†’ Cloudflare R2 (assets)
docs.cea.ng     â†’ Cloudflare Pages (docs)
admin.cea.ng    â†’ Vercel (admin route — or protected via Zero Trust)
```

### Security Architecture

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Browser â”‚â”€â”€â”€â”€â–¶â”‚ Cloudflare   â”‚â”€â”€â”€â”€â–¶â”‚ Vercel Edge      â”‚
â”‚  (User)  â”‚     â”‚ Turnstile    â”‚     â”‚ (Next.js)        â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                               â”‚
                                        â”Œâ”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                                        â”‚ Cloudflare       â”‚
                                        â”‚ Worker (API)     â”‚
                                        â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
                                        â”‚ â”‚ JWT Verify   â”‚ â”‚
                                        â”‚ â”‚ RBAC Check   â”‚ â”‚
                                        â”‚ â”‚ Rate Limit   â”‚ â”‚
                                        â”‚ â”‚ Audit Log    â”‚ â”‚
                                        â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
                                        â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                                 â”‚
                               â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                               â–¼                 â–¼              â–¼
                          â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                          â”‚   D1    â”‚     â”‚    KV    â”‚   â”‚    R2    â”‚
                          â”‚ (SQL)   â”‚     â”‚ (Cache)  â”‚   â”‚ (Files)  â”‚
                          â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## 2.7 Implementation Order

### Recommended Build Sequence (by business value)

| Priority | Module Group                        | Why First                               |
| -------- | ----------------------------------- | --------------------------------------- |
| **P0**   | Foundation, Auth, RBAC, CMS, Audit  | Everything depends on this              |
| **P1**   | Learning, Assessments, Gradebook    | Core product — students enroll for this |
| **P2**   | Admissions, CRM                     | Fill the pipeline — you need students   |
| **P3**   | Finance, Invoicing, Payments        | Get paid — sustainability               |
| **P4**   | Client Portal, Projects, Support    | Revenue diversification                 |
| **P5**   | Portfolio, Marketplace, Jobs        | Student outcomes — your brand           |
| **P6**   | HR, Payroll, Inventory, Procurement | Internal efficiency — scale             |
| **P7**   | Community, Events, Alumni, Partners | Ecosystem — moat                        |
| **P8**   | AI features                         | Differentiation — competitive advantage |

### Quick Start (First 2 Weeks)

```
Week 1:
  â”œâ”€â”€ Scaffold monorepo (packages/app, packages/ui)
  â”œâ”€â”€ Set up Vercel project + Cloudflare Workers
  â”œâ”€â”€ Initialize D1 + Drizzle schema (users, roles, permissions)
  â”œâ”€â”€ Implement auth (register, login, JWT)
  â””â”€â”€ Deploy "Hello World" end-to-end

Week 2:
  â”œâ”€â”€ Build RBAC middleware
  â”œâ”€â”€ Create admin user management
  â”œâ”€â”€ Set up audit logging
  â”œâ”€â”€ Build public CMS (landing page, course catalog)
  â”œâ”€â”€ Create base component library (Button, Card, Input, etc.)
  â””â”€â”€ Deploy with dark/light mode + PWA manifest
```

---

> **This is the blueprint for the Cyber Elias Academy Digital Operating System.**
>
> Every actor has a purpose. Every module connects. Every phase builds on the last.
>
> Start with Foundation. Ship fast. Iterate. Never build a feature without knowing which actor needs it and what business objective it serves.
>
> **One platform. Multiple engines. Every actor connected.**

