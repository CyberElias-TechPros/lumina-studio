# Cyber Elias Academy — Digital Operating System

# GRAND MASTER PLAN

> **The unified blueprint incorporating all 32 actors, 55+ modules, and every business process of CEA-OS.**
>
> **Frontend:** Vercel (Next.js 19, TypeScript, Tailwind, shadcn/ui, Redux Toolkit, Framer Motion, TanStack Table, Recharts)
> **Design Language:** Premium hybrid of digitalskillsacademy.org (clean professional structure) × dskillacademy.com.ng (vibrant gradient richness) — see `CEA_OS_DESIGN_LANGUAGE.md`
> **Backend:** Cloudflare Workers (Hono, Drizzle ORM, D1, R2, KV, Queues, Durable Objects, Workflows, Images, Turnstile, Zero Trust, Analytics)
> **Philosophy:** One platform. Multiple engines. Every actor connected. Every process automated. Every decision data-driven.
> **Academy Focus:** General digital/tech skills academy — software dev, networking, cloud, cybersecurity, digital marketing, AI, automation, data science, UI/UX, mobile dev, hardware, IT support. From scratch to advanced.

---

## Table of Contents

**Part 1**

- [1. Architectural Universe](#1-architectural-universe)
- [2. Unified Actor Map](#2-unified-actor-map)
- [3. Unified Data Universe](#3-unified-data-universe)

**Part 2**

- [4. Unified API Surface](#4-unified-api-surface)
- [5. Unified Component Library](#5-unified-component-library)
- [6. Permissions Cosmos](#6-permissions-cosmos)
- [7. Unified State Management](#7-unified-state-management)

**Part 3**

- [8. Cross-Actor Workflows](#8-cross-actor-workflows)
- [9. Unified Notifications Matrix](#9-unified-notifications-matrix)
- [10. Infrastructure & Deployment Plan](#10-infrastructure--deployment-plan)
- [11. Phased Implementation Roadmap](#11-phased-implementation-roadmap)
- [12. Analytics & Business Intelligence](#12-analytics--business-intelligence)
- [13. Cost Projection & Scaling](#13-cost-projection--scaling)
- [14. Disaster Recovery & Business Continuity](#14-disaster-recovery--business-continuity)
- [15. Appendix: All Actor File Index](#15-appendix-all-actor-file-index)

---

# 1. Architectural Universe

## 1.1 Complete System Topology

```
                              INTERNET
                                  │
                    ┌─────────────┴─────────────┐
                    │      Cloudflare DNS        │
                    │    (cea.academy domain)     │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │    Cloudflare Turnstile      │
                    │   (Bot protection on all     │
                    │    public forms)             │
                    └─────────────┬─────────────┘
                                  │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
     ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
     │   VERCEL EDGE  │ │  CLOUDFLARE    │ │  CLOUDFLARE    │
     │   (Frontend)   │ │  WORKERS (API) │ │  PAGES (Docs)  │
     │                │ │                │ │                │
     │  cea.academy   │ │  api.cea.acad  │ │  docs.cea.acad │
     │  *.vercel.app  │ │  auth.cea.acad │ │                │
     └───────┬────────┘ │  ws.cea.acad   │ └────────────────┘
             │          │  cdn.cea.acad  │
             │          └───────┬────────┘
             │                  │
             │     ┌────────────┼──────────────────────┐
             │     ▼            ▼          ▼           ▼
             │  ┌──────┐  ┌───────┐  ┌──────┐  ┌──────────┐
             │  │ D1   │  │  KV   │  │  R2  │  │ Queues   │
             │  │(SQL) │  │(Cache,│  │(Files,│  │(Email,   │
             │  │      │  │Sess.) │  │Images)│  │ Notifs)  │
             │  └──────┘  └───────┘  └──────┘  └──────────┘
             │                  │           │
             │                  ▼           ▼
             │          ┌────────────┐ ┌──────────────┐
             │          │  Durable   │ │  Workflows   │
             │          │  Objects   │ │ (Long-running│
             │          │ (Real-time)│ │  processes)  │
             │          └────────────┘ └──────────────┘
             │
             ▼
     ┌────────────────────────────────────────────────────┐
     │            THIRD-PARTY INTEGRATIONS                  │
     │  Stripe │ SendGrid/Resend │ Twilio │ Google/Outlook │
     │  Zoom/Meet │ Social APIs │ Payment Gateways        │
     └────────────────────────────────────────────────────┘
```

### Data Flow Layers

```
L0: Edge (Vercel + Cloudflare)
  ├── Static assets (Vercel Edge Cache)
  ├── Public pages (ISR, revalidate every 60s)
  ├── Turnstile challenge (Edge)
  └── Auth token verification (Worker Edge)

L1: API Layer (Cloudflare Workers)
  ├── Hono router → middleware stack:
  │   ├── AuthMiddleware (JWT verify)
  │   ├── RBACMiddleware (permission check)
  │   ├── AuditMiddleware (log action)
  │   ├── RateLimitMiddleware (per-user/IP)
  │   └── ValidationMiddleware (Zod)
  └── Route handlers → service layer

L2: Service Layer (Workers)
  ├── UserService │ CourseService │ AssessmentService
  ├── FinanceService │ HRService │ CRMService
  ├── NotificationService │ AnalyticsService
  └── WorkflowService │ AIService

L3: Data Layer (D1/R2/KV/DO)
  ├── D1: All relational data (Drizzle ORM)
  ├── R2: File uploads, images, backups
  ├── KV: Sessions, cache, config, rate limit counters
  ├── Queues: Async jobs
  └── DO: Real-time state (chat, collab)

L4: External Integrations (via Queues or direct)
  ├── Stripe (payments, subscriptions)
  ├── SendGrid/Resend (email)
  ├── Twilio (SMS)
  ├── Google Calendar API (sync)
  ├── Zoom/Meet API (video)
  └── Social media APIs
```

## 1.2 Network & DNS Map

| Record                | Type  | Target                | Service            |
| --------------------- | ----- | --------------------- | ------------------ |
| `cea.academy`         | A     | Vercel proxy          | Frontend (Next.js) |
| `www.cea.academy`     | CNAME | `cea.academy`         | Redirect           |
| `api.cea.academy`     | CNAME | Cloudflare Worker     | API server         |
| `auth.cea.academy`    | CNAME | Cloudflare Worker     | Auth service       |
| `ws.cea.academy`      | CNAME | Cloudflare Worker     | WebSocket/DO       |
| `cdn.cea.academy`     | CNAME | Cloudflare Worker     | R2 proxy           |
| `docs.cea.academy`    | CNAME | Cloudflare Pages      | Developer docs     |
| `admin.cea.academy`   | CNAME | Vercel via Zero Trust | Admin portal       |
| `_vercel.cea.academy` | TXT   | Vercel verification   | Domain ownership   |

### Subdomain Routing Strategy

- `cea.academy/` → Public pages (landing, courses, blog, about)
- `cea.academy/learn` → Student learning portal
- `cea.academy/dashboard` → Role-based dashboard (redirects by role)
- `cea.academy/admin` → Admin functions (behind Zero Trust)
- `api.cea.academy/v1/` → All REST endpoints
- `api.cea.academy/graphql` → GraphQL endpoint (for complex queries)
- `auth.cea.academy/` → Auth endpoints (login, register, refresh, logout, MFA)
- `ws.cea.academy/chat/{roomId}` → Real-time chat
- `ws.cea.academy/live/{classId}` → Live class
- `cdn.cea.academy/{bucket}/{key}` → File/Image delivery

## 1.3 Security Architecture

### Defense in Depth

```
Layer 1: Cloudflare Global Network
  ├── DDoS protection (L3/L4/L7)
  ├── WAF (OWASP rules, custom rules)
  ├── Bot management (Turnstile + ML)
  ├── Rate limiting (per IP, per endpoint group)
  └── SSL/TLS (Full strict, minimum TLS 1.3)

Layer 2: Vercel Edge
  ├── Security headers (CSP, HSTS, X-Frame-Options, etc.)
  ├── Environment variables (encrypted at rest)
  └── Preview deployments (isolated)

Layer 3: Cloudflare Workers
  ├── JWT access tokens (15min expiry)
  ├── Refresh tokens (7 day, rotated, stored in KV)
  ├── RBAC middleware on every protected route
  ├── Input validation (Zod schemas on every endpoint)
  ├── SQL injection protection (Drizzle parameterized queries)
  ├── CSRF token validation (stateful operations)
  └── Audit logging (every mutation logged)

Layer 4: Data Layer
  ├── D1: Encrypted at rest, parameterized queries only
  ├── R2: Server-side encryption, presigned URLs with expiry
  ├── KV: Encrypted at rest, access restricted to Workers
  └── Backups: Encrypted, stored in separate R2 bucket

Layer 5: Authentication
  ├── Password: bcrypt (cost factor 12) + peppered
  ├── MFA: TOTP (authenticator app) or SMS backup
  ├── OAuth: Google, GitHub, Microsoft (PKCE flow)
  ├── Magic link: One-time use, 15min expiry
  ├── Session: JWT in HttpOnly cookie + KV session store
  └── Device tracking: Known devices, new device alerts
```

### Data Classification

| Classification | Examples                                   | Storage        | Encryption             |
| -------------- | ------------------------------------------ | -------------- | ---------------------- |
| Public         | Course catalog, blog, testimonials         | D1, R2         | TLS only               |
| Internal       | Employee directory, operational metrics    | D1             | AES-256                |
| Confidential   | Student grades, HR records, financial data | D1             | AES-256 + field-level  |
| Restricted     | Payment info (PCI), PII, credentials       | D1 (tokenized) | AES-256 + tokenization |
| Regulated      | Government compliance data, audit logs     | D1 (immutable) | AES-256 + Write-Once   |

### Compliance Standards Target

- **GDPR** (if EU students)
- **POPIA** (if South African students)
- **PCI DSS** (if handling credit cards — use Stripe, never store raw)
- **SOC 2 Type II** (for client services)
- **Local education authority regulations**

---

# 2. Unified Actor Map

## 2.1 Actor Categorization

### External Actors (Public / Pre-Engagement)

| #   | Actor               | Primary Domain      | Engagement Stage     |
| --- | ------------------- | ------------------- | -------------------- |
| 16  | Visitor             | Physical campus     | Pre-lead             |
| 1   | Prospective Student | Admissions pipeline | Lead → Applicant     |
| 3   | Parent              | Student support     | Accompanying student |

### Learner Actors

| #   | Actor           | Primary Domain           | Engagement Stage |
| --- | --------------- | ------------------------ | ---------------- |
| 2   | Current Student | Education                | Active learning  |
| 14  | Intern          | Work-integrated learning | Active intern    |
| 15  | Alumni          | Community                | Post-graduation  |

### Educator Actors

| #   | Actor      | Primary Domain  | Engagement Stage |
| --- | ---------- | --------------- | ---------------- |
| 4   | Instructor | Course delivery | Active faculty   |
| 5   | Mentor     | Career guidance | Active mentor    |

### Management Actors

| #   | Actor              | Primary Domain        | Engagement Stage |
| --- | ------------------ | --------------------- | ---------------- |
| 6   | Department Head    | Academic leadership   | Management       |
| 8   | Operations Manager | Operational oversight | Management       |
| 9   | Director           | Executive leadership  | Executive        |

### Operations Actors

| #   | Actor                | Primary Domain    | Engagement Stage |
| --- | -------------------- | ----------------- | ---------------- |
| 7   | Receptionist         | Front desk        | Support staff    |
| 22  | IT Support           | Technical support | Support staff    |
| 24  | System Administrator | System operations | Support staff    |
| 23  | Developer            | Engineering       | Support staff    |

### Business Actors

| #   | Actor    | Primary Domain     | Engagement Stage  |
| --- | -------- | ------------------ | ----------------- |
| 10  | Client   | Services revenue   | Active engagement |
| 11  | Employer | Talent acquisition | Active engagement |
| 12  | Partner  | Strategic alliance | Active engagement |
| 17  | Supplier | Procurement        | Active engagement |

### Marketing & Growth Actors

| #   | Actor                             | Primary Domain            | Engagement Stage |
| --- | --------------------------------- | ------------------------- | ---------------- |
| 21  | Marketing Officer                 | Growth campaigns          | Admin staff      |
| 27  | Conversion Copywriter             | Conversion optimization   | Marketing        |
| 28  | Product Marketing Manager         | Product positioning & GTM | Marketing        |
| 30  | Growth Specialist                 | Acquisition & retention   | Marketing        |
| 31  | Global/Nigerian-market Copywriter | Localized content         | Marketing        |

### Design & Behavioral Actors

| #   | Actor               | Primary Domain                | Engagement Stage |
| --- | ------------------- | ----------------------------- | ---------------- |
| 29  | Behavioral Designer | Student engagement psychology | UX/Design        |
| 32  | Visual/UX Designer  | UI design & design system     | UX/Design        |

### Administrative Actors

| #   | Actor              | Primary Domain | Engagement Stage |
| --- | ------------------ | -------------- | ---------------- |
| 18  | Accountant         | Financial      | Admin staff      |
| 19  | HR Officer         | People         | Admin staff      |
| 20  | Admissions Officer | Enrollment     | Admin staff      |

### Community & External Stakeholders

| #   | Actor                     | Primary Domain    | Engagement Stage     |
| --- | ------------------------- | ----------------- | -------------------- |
| 13  | Volunteer                 | Community service | Active participation |
| 25  | Government Representative | Regulation        | Compliance           |
| 26  | NGO                       | Social impact     | Partnership          |

## 2.2 Actor-to-Actor Relationships

```
Prospective Student ◄──► Admissions Officer  (application process)
Prospective Student ◄──► Marketing Officer    (inquiry → lead)
Current Student     ◄──► Instructor          (learning delivery)
Current Student     ◄──► Mentor              (career guidance)
Current Student     ◄──► Department Head     (academic oversight)
Current Student     ◄──► Intern              (peer, if applicable)
Current Student     ◄──► Alumni              (mentorship, networking)
Current Student     ◄──► Employer            (job placement)
Current Student     ◄──► Parent              (progress sharing)
Parent              ◄──► Instructor          (parent-teacher)
Parent              ◄──► Accountant          (fee inquiries)
Intern              ◄──► Mentor              (supervision)
Intern              ◄──► HR Officer          (onboarding/evaluation)
Alumni              ◄──► Employer            (job board)
Alumni              ◄──► Current Student     (mentorship)
Instructor          ◄──► Department Head     (management)
Instructor          ◄──► Mentor              (student support coordination)
Department Head     ◄──► Director            (strategy)
Department Head     ◄──► Operations Manager  (resource planning)
Operations Manager  ◄──► Supplier            (procurement)
Operations Manager  ◄──► Accountant          (budget execution)
Operations Manager  ◄──► IT Support          (infrastructure)
Receptionist        ◄──► Visitor             (check-in)
Receptionist        ◄──► Prospective Student (walk-in)
Receptionist        ◄──► All Staff           (deliveries, messages)
IT Support          ◄──► All Actors          (tickets)
System Admin        ◄──► All Actors          (user management)
System Admin        ◄──► Developer           (deployments, access)
Developer           ◄──► All Actors          (feature delivery)
Accountant          ◄──► HR Officer          (payroll)
Accountant          ◄──► Client              (invoicing)
Accountant          ◄──► Supplier            (payments)
HR Officer          ◄──► All Employees       (lifecycle)
Marketing Officer   ◄──► Prospective Student (lead generation)
Marketing Officer   ◄──► Alumni              (ambassador program)
Marketing Officer   ◄──► Partner             (co-marketing)
Conversion Copywriter ◄──► Marketing Officer (campaign copy)
Conversion Copywriter ◄──► Visual/UX Designer (landing page copy + design)
Conversion Copywriter ◄──► Growth Specialist (A/B test copy variants)
Conversion Copywriter ◄──► Global/Nigerian-market Copywriter (localized variants)
Product Marketing Manager ◄──► Director (GTM strategy)
Product Marketing Manager ◄──► Department Head (program positioning)
Product Marketing Manager ◄──► Conversion Copywriter (messaging briefs)
Product Marketing Manager ◄──► Marketing Officer (campaign alignment)
Behavioral Designer  ◄──► Instructor (engagement intervention design)
Behavioral Designer  ◄──► Student (nudge/behavioral flows)
Behavioral Designer  ◄──► Product Marketing Manager (adoption strategy)
Growth Specialist    ◄──► Marketing Officer (channel experiments)
Growth Specialist    ◄──► Product Marketing Manager (growth experiments)
Growth Specialist    ◄──► Developer (experiment implementation)
Global/Nigerian-market Copywriter ◄──► Conversion Copywriter (localization handoff)
Global/Nigerian-market Copywriter ◄──► Marketing Officer (market-specific campaigns)
Global/Nigerian-market Copywriter ◄──► Partner (local partnership content)
Visual/UX Designer   ◄──► Developer (design handoff, component specs)
Visual/UX Designer   ◄──► System Admin (design system tokens)
Visual/UX Designer   ◄──► All Actors (UI/UX across every screen)
Visual/UX Designer   ◄──► Behavioral Designer (behavioral UI patterns)
Partner             ◄──► Director            (partnership strategy)
Partner             ◄──► Marketing Officer   (co-branded campaigns)
NGO                 ◄──► Director            (strategic alignment)
NGO                 ◄──► Volunteer           (program delivery)
NGO                 ◄──► Community           (impact)
Government Rep      ◄──► Director            (compliance)
Government Rep      ◄──► Department Head     (accreditation data)
Client              ◄──► Project Manager     (delivery)
Client              ◄──► Accountant          (invoices)
Client              ◄──► IT Support          (tickets)
Employer            ◄──► Career Services     (placement)
Employer            ◄──► Current Student     (hiring)
Employer            ◄──► Alumni              (experienced hires)
Volunteer           ◄──► Community Manager   (coordination)
Volunteer           ◄──► NGO                 (program delivery)
```

## 2.3 Cross-Actor Business Processes

Each business process involves multiple actors working in sequence. Below is the master catalog:

| Process ID | Process Name                       | Actors Involved (in order)                                                                  | Phase |
| ---------- | ---------------------------------- | ------------------------------------------------------------------------------------------- | ----- |
| BP-001     | Prospect → Student Admission       | Prospective Student → Marketing Officer → Admissions Officer → Accountant → Current Student | 1     |
| BP-002     | Course Delivery Lifecycle          | Department Head → Instructor → Current Student → Instructor → Current Student               | 1     |
| BP-003     | Student Assessment & Grading       | Instructor → Current Student → Instructor → Department Head                                 | 1     |
| BP-004     | Student Portfolio to Job Placement | Current Student → Mentor → Alumni → Employer → Current Student                              | 2     |
| BP-005     | Freelance Gig Lifecycle            | Employer → Current Student/Alumni → Employer → Accountant                                   | 2     |
| BP-006     | Client Service Delivery            | Marketing Officer → Client → Project Team → Client → Accountant                             | 3     |
| BP-007     | Support Ticket Resolution          | Client → IT Support → Client                                                                | 3     |
| BP-008     | Employee Onboarding                | HR Officer → System Admin → IT Support → Department Head → Employee                         | 4     |
| BP-009     | Procurement & Payment              | Operations Manager → Supplier → Accountant → Supplier                                       | 4     |
| BP-010     | Community Program Execution        | NGO → Community Manager → Volunteer → NGO                                                   | 5     |
| BP-011     | Alumni Mentorship                  | Alumni → Current Student → Mentor                                                           | 5     |
| BP-012     | Accreditation/Compliance Review    | Government Rep → Director → Department Head → Government Rep                                | 5     |

---

# 3. Unified Data Universe

## 3.1 Complete Entity-Relationship Diagram

```
                            CEA-OS MASTER DATA MODEL

CORE
organizations ──1:N── branches ──1:N── departments ──1:N── teams
users ──N:M── roles ──N:M── permissions
users ──1:1── user_profiles
users ──1:N── user_devices
users ──1:N── audit_logs
users ──1:N── notifications

LEARNING
departments ──1:N── programs ──1:N── courses ──1:N── modules ──1:N── lessons
courses ──N:M── instructors (via course_assignments)
courses ──N:M── students (via enrollments)
lessons ──1:N── lesson_materials
enrollments ──1:N── progress_tracking
enrollments ──1:N── attendance_records

ASSESSMENTS
modules ──1:N── assignments
modules ──1:N── assessments (quizzes/exams)
assignments ──1:N── submissions
assessments ──1:N── assessment_questions
assessments ──1:N── assessment_attempts
assessment_attempts ──1:N── assessment_responses
submissions/attempts ──1:N── grades

FINANCE
organizations ──1:N── accounts (chart of accounts)
accounts ──1:N── transactions
invoices ──1:N── invoice_line_items
invoices ──1:N── payments
users ──1:N── expense_claims
budgets ──1:N── budget_lines
payroll_runs ──1:N── payroll_items

HR
users ──1:1── employee_records
employee_records ──1:N── leave_requests
employee_records ──1:N── attendance_logs
employee_records ──1:N── performance_reviews
employee_records ──1:N── training_records

CRM
contacts (polymorphic: prospective_student, client, partner, etc.)
contacts ──1:N── interactions
contacts ──1:N── deals/pipeline_stages
contacts ──N:M── campaigns

PROJECTS
clients ──1:N── projects
projects ──1:N── project_tasks
projects ──1:N── project_milestones
projects ──1:N── time_entries
projects ──1:N── contracts
contracts ──1:N── proposals

MARKETPLACE
employers ──1:N── job_listings
job_listings ──1:N── job_applications
users ──1:N── portfolios
portfolios ──1:N── portfolio_projects

ADMISSIONS
prospective_students ──1:N── applications
applications ──1:1── application_documents
applications ──1:N── application_notes
applications ──1:N── interviews

COMMUNITY
forum_categories ──1:N── forum_threads ──1:N── forum_posts
events ──1:N── event_registrations
groups ──N:M── group_members
scholarships ──1:N── scholarship_applications
volunteer_opportunities ──1:N── volunteer_signups
partners ──1:N── partner_agreements

INVENTORY
branches ──1:N── warehouses
warehouses ──1:N── inventory_items
inventory_items ──1:N── stock_movements
suppliers ──1:N── purchase_orders
purchase_orders ──1:N── po_line_items

SYSTEM
feature_flags
system_config
audit_log
notification_templates
email_templates
workflow_definitions
workflow_instances
```

## 3.2 Master Schema (All Tables)

All tables use Drizzle ORM for Cloudflare D1 (SQLite-compatible). Full schemas with every column, type, constraint, and index are documented exhaustively in the individual actor plan files. Below is a comprehensive reference catalog.

### Core Tables

| Table              | Primary Key | Key Columns                                                                                                                                                            | Indexes                                         | FK References                                                                      |
| ------------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| `organizations`    | `id: text`  | name, slug, registrationNumber, taxId, logoUrl, website, email, phone, address fields, timezone, locale, status, type, metadata, timestamps                            | slug (unique)                                   | —                                                                                  |
| `branches`         | `id: text`  | organizationId, name, code, type, capacity, operatingHours, facilities, status                                                                                         | code (unique)                                   | organizationId → organizations.id                                                  |
| `departments`      | `id: text`  | branchId, name, code, headUserId, parentDepartmentId, description, budgetId, status                                                                                    | code (unique)                                   | branchId → branches.id, headUserId → users.id, parentDepartmentId → departments.id |
| `users`            | `id: text`  | email, passwordHash, firstName, lastName, avatarUrl, phone, emailVerified, twoFactorEnabled, status, lastLoginAt, loginAttempts, lockoutUntil, preferences, timestamps | email (unique)                                  | —                                                                                  |
| `roles`            | `id: text`  | name, slug, description, hierarchy, isSystem, isAssignable                                                                                                             | name (unique), slug (unique)                    | —                                                                                  |
| `permissions`      | `id: text`  | resource, action, description, conditions                                                                                                                              | —                                               | —                                                                                  |
| `role_permissions` | `id: text`  | roleId, permissionId, constraints                                                                                                                                      | —                                               | roleId → roles.id, permissionId → permissions.id                                   |
| `user_roles`       | `id: text`  | userId, roleId, scopeType, scopeId, assignedById, expiresAt, isActive                                                                                                  | —                                               | userId → users.id, roleId → roles.id                                               |
| `sessions`         | `id: text`  | userId, token, refreshToken, deviceInfo, ipAddress, isMfaVerified, expiresAt, refreshExpiresAt, revokedAt                                                              | token (unique), refreshToken (unique)           | userId → users.id                                                                  |
| `audit_logs`       | `id: text`  | userId, sessionId, action, resource, resourceId, details, ipAddress, userAgent, severity, immutable                                                                    | idx_user, idx_resource, idx_action, idx_created | userId → users.id                                                                  |
| `user_preferences` | `id: text`  | userId, theme, language, timezone, dateFormat, timeFormat, notificationPreferences, emailDigest, sidebarCollapsed, dashboardLayout                                     | userId (unique)                                 | userId → users.id                                                                  |

### Learning Tables

| Table                | Key Columns                                                                                                                                                                                                                                   | Key Indexes                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `programs`           | departmentId, code, name, duration, credentialType, level, learningOutcomes, prerequisites, price, currency, maxStudents, status                                                                                                              | code (unique)                                                                                              |
| `courses`            | programId, code, name, slug, description, category, difficulty, durationHours, learningObjectives, syllabus, price, isFree, hasCertificate, passThreshold, maxStudents, enrollmentStart/End, startDate, endDate, status, version, createdById | code (unique), slug (unique)                                                                               |
| `course_instructors` | courseId, userId, role, isActive                                                                                                                                                                                                              | —                                                                                                          |
| `modules`            | courseId, title, description, orderIndex, estimatedDuration, isRequired, status                                                                                                                                                               | —                                                                                                          |
| `lessons`            | moduleId, title, contentType, videoUrl, articleBody, embedUrl, orderIndex, estimatedDuration, isFreePreview, status, createdById                                                                                                              | —                                                                                                          |
| `lesson_materials`   | lessonId, type, title, fileUrl, fileSize, mimeType, orderIndex, isRequired                                                                                                                                                                    | —                                                                                                          |
| `enrollments`        | userId, courseId, type, status, enrolledAt, startedAt, completedAt, progress (0-100), finalGrade, passed, certificateIssued, paymentStatus, feePaid                                                                                           | idx_user (userId), idx_course (courseId), idx_status (status), idx_user_course (userId, courseId - unique) |
| `progress_tracking`  | enrollmentId, lessonId, status, progress, timeSpent, lastAccessedAt, completedAt, score, attempts                                                                                                                                             | idx_enrollment (enrollmentId), idx_enrollment_lesson (enrollmentId, lessonId - unique)                     |

### Assessment Tables

| Table                  | Key Columns                                                                                                                                                                                                                                                                | Key Indexes                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `assignments`          | moduleId, title, description, type, pointsPossible, passingPoints, weight, dueDate, availableFrom/Until, submissionType, allowedFileTypes, maxFileSize, maxAttempts, isGroupAssignment, rubric, latePenaltyPercent, plagiarismCheck, aiGradingEnabled, status, createdById | —                                                                                            |
| `submissions`          | assignmentId, userId, attempt, status, content, files, textEntry, url, codeRepoUrl, submittedAt, isLate, lateMinutes, plagiarismScore, aiGradeScore                                                                                                                        | idx_assignment (assignmentId), idx_user (userId), idx_assignment_user (assignmentId, userId) |
| `grades`               | enrollmentId, gradedItemId, gradedItemType, graderId, score, pointsPossible, percentage, letterGrade, feedback, isPassing, isFinal, gradedAt                                                                                                                               | —                                                                                            |
| `assessments`          | moduleId, title, type, timeLimit, maxAttempts, shuffleQuestions/Options, showResults, passThreshold, questionsPerPage, allowNavigation, allowPause, proctoringRequired, totalPoints, weight, dueDate, availableFrom/Until, status, createdById                             | —                                                                                            |
| `assessment_questions` | assessmentId, type, questionText, options, correctAnswer, points, orderIndex, difficulty, tags, explanation                                                                                                                                                                | —                                                                                            |
| `assessment_attempts`  | assessmentId, userId, attempt, status, startedAt, submittedAt, timeSpent, score, totalPoints, percentage, passed, proctoringLog                                                                                                                                            | —                                                                                            |
| `assessment_responses` | attemptId, questionId, response, isCorrect, pointsAwarded, aiFeedback, graderId, graderFeedback, timeSpent                                                                                                                                                                 | —                                                                                            |

### Attendance Tables

| Table                | Key Columns                                                                                                                                                                   | Key Indexes                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `attendance_records` | enrollmentId, sessionDate, status [present/absent/late/excused/holiday], checkInTime, checkOutTime, checkInMethod, checkInLatitude/Longitude, lateMinutes, markedById, reason | idx_enrollment (enrollmentId), idx_date (sessionDate), idx_enrollment_date (enrollmentId, sessionDate - unique) |

### Finance Tables

| Table                | Key Columns                                                                                                                                                                                                                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accounts`           | organizationId, code, name, type [asset/liability/equity/revenue/expense], category, isActive, parentAccountId, balance, currency                                                                                                                                                                                  |
| `transactions`       | organizationId, accountId, type [debit/credit], amount, currency, description, reference, referenceType, referenceId, transactionDate, postedAt, isReconciled, createdById                                                                                                                                         |
| `invoices`           | organizationId, invoiceNumber (unique), type [tuition/client_service/product/donation], status [draft/sent/viewed/partial/paid/overdue], billTo fields, issueDate, dueDate, subtotal, taxRate, taxAmount, discountPercent, total, amountPaid, balanceDue, currency, notes, paymentLink, stripeInvoiceId, recurring |
| `invoice_line_items` | invoiceId, description, quantity, unitPrice, discountPercent, taxPercent, lineTotal, type, startDate, endDate                                                                                                                                                                                                      |
| `payments`           | invoiceId, amount, currency, method [credit_card/bank_transfer/cash/stripe], status [pending/completed/failed/refunded], stripePaymentIntentId, receiptUrl, paidAt, refundAmount                                                                                                                                   |
| `expense_claims`     | userId, title, totalAmount, status [draft/submitted/approved/rejected/paid], submittedAt, approvedById, paidAt                                                                                                                                                                                                     |
| `expense_items`      | claimId, category [travel/meals/supplies/equipment], description, amount, receiptUrl, expenseDate, isBillable                                                                                                                                                                                                      |

### CRM Tables

| Table             | Key Columns                                                                                                                                                                                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contacts`        | organizationId, type [lead/prospect/client/partner/supplier], source, userId, company, firstName, lastName, email, phone, leadScore, leadStatus [new/contacted/qualified/proposal/won/lost], assignedToId, tags, customFields, lastContactedAt, nextFollowUpAt |
| `interactions`    | contactId, type [call/email/meeting/note/task/chat], subject, description, direction, outcome, duration, scheduledAt, completedAt, createdById                                                                                                                 |
| `pipeline_stages` | organizationId, name, orderIndex, probability, color                                                                                                                                                                                                           |
| `deals`           | contactId, pipelineStageId, name, value, currency, probability, expectedCloseDate, actualCloseDate, status [open/won/lost], assignedToId                                                                                                                       |

### Community Tables

| Table                 | Key Columns                                                                                                                                                                                                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `forum_categories`    | name, slug (unique), description, orderIndex, isActive                                                                                                                                                                                                                                                        |
| `forum_threads`       | categoryId, title, slug, content, isPinned, isLocked, isAnnouncement, viewCount, replyCount, lastPostAt, lastPostUserId, status, createdById                                                                                                                                                                  |
| `forum_posts`         | threadId, parentPostId, content, isSolution, isEdited, voteCount, status, createdById                                                                                                                                                                                                                         |
| `events`              | organizationId, title, slug (unique), description, type [workshop/bootcamp/seminar/webinar/social/career_fair], format [in_person/virtual/hybrid], startDate, endDate, timezone, location, virtualMeetingUrl, maxAttendees, registrationDeadline, requiresApproval, price, coverImageUrl, status, createdById |
| `event_registrations` | eventId, userId, status [registered/approved/waitlisted/cancelled/attended/no_show], checkedInAt                                                                                                                                                                                                              |
| `groups`              | name, slug (unique), description, type [study/interest/project/alumni/volunteer], coverImageUrl, isPrivate, requiresApproval, memberCount, createdById                                                                                                                                                        |
| `group_members`       | groupId, userId, role [member/moderator/admin], joinedAt, leftAt                                                                                                                                                                                                                                              |

### Additional Tables (Detailed in Actor Files)

| Table                 | Defined In                 | Purpose                                                           |
| --------------------- | -------------------------- | ----------------------------------------------------------------- |
| `portfolios`          | `02-current-student.md`    | Student portfolio with headline, bio, skills, experience          |
| `portfolio_projects`  | `02-current-student.md`    | Projects within portfolio with technologies, screenshots, URLs    |
| `certificates`        | `02-current-student.md`    | Issued certificates with verification codes, templates            |
| `mentorship_sessions` | `05-mentor.md`             | Mentor-mentee session logs with notes and action items            |
| `visitor_logs`        | `07-receptionist.md`       | Physical visitor check-in/out records                             |
| `job_listings`        | `11-employer.md`           | Job posts with description, skills, salary, type                  |
| `job_applications`    | `11-employer.md`           | Job applications with status, interview, offer                    |
| `purchase_orders`     | `17-supplier.md`           | Purchase orders with line items, delivery tracking                |
| `applications`        | `20-admissions-officer.md` | Full admissions application with documents, interviews, decisions |
| `tickets`             | `22-it-support.md`         | Support tickets with SLA, priority, assignment                    |
| `employee_records`    | `19-hr-officer.md`         | Employee HR records with contract, position, department           |
| `leave_requests`      | `19-hr-officer.md`         | Leave requests with type, dates, approval chain                   |
| `partner_agreements`  | `12-partner.md`            | Partnership agreements with terms, revenue share                  |
| `scholarships`        | `26-ngo.md`                | Scholarship funds with criteria, deadlines, disbursement          |
| `volunteer_hours`     | `13-volunteer.md`          | Volunteer hour tracking with approval                             |
| `performance_reviews` | `19-hr-officer.md`         | Employee performance evaluations                                  |
| `training_records`    | `19-hr-officer.md`         | Staff training and certifications                                 |
| `proposals`           | `10-client.md`             | Client proposals with versions, approvals                         |
| `contracts`           | `10-client.md`             | Legal contracts with e-sign, expiry                               |
| `time_entries`        | `10-client.md`             | Project time tracking for billing                                 |

## 3.3 Shared Reference Data

### Global Enums

```typescript
type Gender = "male" | "female" | "non_binary" | "prefer_not_to_say";
type IdType = "national_id" | "passport" | "drivers_license" | "other";
type NotificationChannel = "in_app" | "email" | "sms" | "push" | "whatsapp";
type Priority = "low" | "medium" | "high" | "urgent" | "critical";
type Currency = "ZAR" | "USD" | "EUR" | "GBP";
type Language = "en" | "af" | "zu" | "xh" | "st" | "tn";
type AcademicPeriod =
  "term_1" | "term_2" | "term_3" | "term_4" | "semester_1" | "semester_2" | "full_year";
type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

// Status enum used across all entities
type RecordStatus = "active" | "inactive" | "draft" | "archived" | "deleted";
```

### Common Value Lists

```
Countries: ISO 3166-1 alpha-2 (default: ZA)
Provinces (SA): EC, FS, GT, KZN, LP, MP, NW, NC, WC
Phone Country Codes: +27 (ZA), +1 (US), +44 (UK)
Timezones: Africa/Johannesburg (default), Africa/Cairo, Europe/London, America/New_York
Date Formats: YYYY-MM-DD, DD/MM/YYYY, MM/DD/YYYY
Time Formats: 12h, 24h
```

---
