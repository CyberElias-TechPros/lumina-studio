# Cyber Elias Academy — Digital Operating System

# GRAND MASTER PLAN

> **The unified blueprint incorporating all 32 actors, 55+ modules, and every business process of CEA-OS.**
>
> **Frontend:** Vercel (Next.js 19, TypeScript, Tailwind, shadcn/ui, Redux Toolkit, Framer Motion, TanStack Table, Recharts)
> **Design Language:** Premium hybrid of digitalskillsacademy.org (clean professional structure) à— dskillacademy.com.ng (vibrant gradient richness) — see `CEA_OS_DESIGN_LANGUAGE.md`
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
                                  â”‚
                    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                    â”‚      Cloudflare DNS        â”‚
                    â”‚    (cea.ng domain)     â”‚
                    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                  â”‚
                    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                    â”‚    Cloudflare Turnstile      â”‚
                    â”‚   (Bot protection on all     â”‚
                    â”‚    public forms)             â”‚
                    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                  â”‚
              â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
              â–¼                  â–¼                  â–¼
     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
     â”‚   VERCEL EDGE  â”‚ â”‚  CLOUDFLARE    â”‚ â”‚  CLOUDFLARE    â”‚
     â”‚   (Frontend)   â”‚ â”‚  WORKERS (API) â”‚ â”‚  PAGES (Docs)  â”‚
     â”‚                â”‚ â”‚                â”‚ â”‚                â”‚
     â”‚  cea.ng   â”‚ â”‚  api.cea.acad  â”‚ â”‚  docs.cea.acad â”‚
     â”‚  *.vercel.app  â”‚ â”‚  auth.cea.acad â”‚ â”‚                â”‚
     â””â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚  ws.cea.acad   â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
             â”‚          â”‚  cdn.cea.acad  â”‚
             â”‚          â””â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”˜
             â”‚                  â”‚
             â”‚     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
             â”‚     â–¼            â–¼          â–¼           â–¼
             â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
             â”‚  â”‚ D1   â”‚  â”‚  KV   â”‚  â”‚  R2  â”‚  â”‚ Queues   â”‚
             â”‚  â”‚(SQL) â”‚  â”‚(Cache,â”‚  â”‚(Files,â”‚  â”‚(Email,   â”‚
             â”‚  â”‚      â”‚  â”‚Sess.) â”‚  â”‚Images)â”‚  â”‚ Notifs)  â”‚
             â”‚  â””â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
             â”‚                  â”‚           â”‚
             â”‚                  â–¼           â–¼
             â”‚          â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
             â”‚          â”‚  Durable   â”‚ â”‚  Workflows   â”‚
             â”‚          â”‚  Objects   â”‚ â”‚ (Long-runningâ”‚
             â”‚          â”‚ (Real-time)â”‚ â”‚  processes)  â”‚
             â”‚          â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
             â”‚
             â–¼
     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
     â”‚            THIRD-PARTY INTEGRATIONS                  â”‚
     â”‚  Stripe â”‚ SendGrid/Resend â”‚ Twilio â”‚ Google/Outlook â”‚
     â”‚  Zoom/Meet â”‚ Social APIs â”‚ Payment Gateways        â”‚
     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Data Flow Layers

```
L0: Edge (Vercel + Cloudflare)
  â”œâ”€â”€ Static assets (Vercel Edge Cache)
  â”œâ”€â”€ Public pages (ISR, revalidate every 60s)
  â”œâ”€â”€ Turnstile challenge (Edge)
  â””â”€â”€ Auth token verification (Worker Edge)

L1: API Layer (Cloudflare Workers)
  â”œâ”€â”€ Hono router â†’ middleware stack:
  â”‚   â”œâ”€â”€ AuthMiddleware (JWT verify)
  â”‚   â”œâ”€â”€ RBACMiddleware (permission check)
  â”‚   â”œâ”€â”€ AuditMiddleware (log action)
  â”‚   â”œâ”€â”€ RateLimitMiddleware (per-user/IP)
  â”‚   â””â”€â”€ ValidationMiddleware (Zod)
  â””â”€â”€ Route handlers â†’ service layer

L2: Service Layer (Workers)
  â”œâ”€â”€ UserService â”‚ CourseService â”‚ AssessmentService
  â”œâ”€â”€ FinanceService â”‚ HRService â”‚ CRMService
  â”œâ”€â”€ NotificationService â”‚ AnalyticsService
  â””â”€â”€ WorkflowService â”‚ AIService

L3: Data Layer (D1/R2/KV/DO)
  â”œâ”€â”€ D1: All relational data (Drizzle ORM)
  â”œâ”€â”€ R2: File uploads, images, backups
  â”œâ”€â”€ KV: Sessions, cache, config, rate limit counters
  â”œâ”€â”€ Queues: Async jobs
  â””â”€â”€ DO: Real-time state (chat, collab)

L4: External Integrations (via Queues or direct)
  â”œâ”€â”€ Stripe (payments, subscriptions)
  â”œâ”€â”€ SendGrid/Resend (email)
  â”œâ”€â”€ Twilio (SMS)
  â”œâ”€â”€ Google Calendar API (sync)
  â”œâ”€â”€ Zoom/Meet API (video)
  â””â”€â”€ Social media APIs
```

## 1.2 Network & DNS Map

| Record                | Type  | Target                | Service            |
| --------------------- | ----- | --------------------- | ------------------ |
| `cea.ng`         | A     | Vercel proxy          | Frontend (Next.js) |
| `www.cea.ng`     | CNAME | `cea.ng`         | Redirect           |
| `api.cea.ng`     | CNAME | Cloudflare Worker     | API server         |
| `auth.cea.ng`    | CNAME | Cloudflare Worker     | Auth service       |
| `ws.cea.ng`      | CNAME | Cloudflare Worker     | WebSocket/DO       |
| `cdn.cea.ng`     | CNAME | Cloudflare Worker     | R2 proxy           |
| `docs.cea.ng`    | CNAME | Cloudflare Pages      | Developer docs     |
| `admin.cea.ng`   | CNAME | Vercel via Zero Trust | Admin portal       |
| `_vercel.cea.ng` | TXT   | Vercel verification   | Domain ownership   |

### Subdomain Routing Strategy

- `cea.ng/` â†’ Public pages (landing, courses, blog, about)
- `cea.ng/learn` â†’ Student learning portal
- `cea.ng/dashboard` â†’ Role-based dashboard (redirects by role)
- `cea.ng/admin` â†’ Admin functions (behind Zero Trust)
- `api.cea.ng/v1/` â†’ All REST endpoints
- `api.cea.ng/graphql` â†’ GraphQL endpoint (for complex queries)
- `auth.cea.ng/` â†’ Auth endpoints (login, register, refresh, logout, MFA)
- `ws.cea.ng/chat/{roomId}` â†’ Real-time chat
- `ws.cea.ng/live/{classId}` â†’ Live class
- `cdn.cea.ng/{bucket}/{key}` â†’ File/Image delivery

## 1.3 Security Architecture

### Defense in Depth

```
Layer 1: Cloudflare Global Network
  â”œâ”€â”€ DDoS protection (L3/L4/L7)
  â”œâ”€â”€ WAF (OWASP rules, custom rules)
  â”œâ”€â”€ Bot management (Turnstile + ML)
  â”œâ”€â”€ Rate limiting (per IP, per endpoint group)
  â””â”€â”€ SSL/TLS (Full strict, minimum TLS 1.3)

Layer 2: Vercel Edge
  â”œâ”€â”€ Security headers (CSP, HSTS, X-Frame-Options, etc.)
  â”œâ”€â”€ Environment variables (encrypted at rest)
  â””â”€â”€ Preview deployments (isolated)

Layer 3: Cloudflare Workers
  â”œâ”€â”€ JWT access tokens (15min expiry)
  â”œâ”€â”€ Refresh tokens (7 day, rotated, stored in KV)
  â”œâ”€â”€ RBAC middleware on every protected route
  â”œâ”€â”€ Input validation (Zod schemas on every endpoint)
  â”œâ”€â”€ SQL injection protection (Drizzle parameterized queries)
  â”œâ”€â”€ CSRF token validation (stateful operations)
  â””â”€â”€ Audit logging (every mutation logged)

Layer 4: Data Layer
  â”œâ”€â”€ D1: Encrypted at rest, parameterized queries only
  â”œâ”€â”€ R2: Server-side encryption, presigned URLs with expiry
  â”œâ”€â”€ KV: Encrypted at rest, access restricted to Workers
  â””â”€â”€ Backups: Encrypted, stored in separate R2 bucket

Layer 5: Authentication
  â”œâ”€â”€ Password: bcrypt (cost factor 12) + peppered
  â”œâ”€â”€ MFA: TOTP (authenticator app) or SMS backup
  â”œâ”€â”€ OAuth: Google, GitHub, Microsoft (PKCE flow)
  â”œâ”€â”€ Magic link: One-time use, 15min expiry
  â”œâ”€â”€ Session: JWT in HttpOnly cookie + KV session store
  â””â”€â”€ Device tracking: Known devices, new device alerts
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
| 1   | Prospective Student | Admissions pipeline | Lead â†’ Applicant     |
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
Prospective Student â—„â”€â”€â–º Admissions Officer  (application process)
Prospective Student â—„â”€â”€â–º Marketing Officer    (inquiry â†’ lead)
Current Student     â—„â”€â”€â–º Instructor          (learning delivery)
Current Student     â—„â”€â”€â–º Mentor              (career guidance)
Current Student     â—„â”€â”€â–º Department Head     (academic oversight)
Current Student     â—„â”€â”€â–º Intern              (peer, if applicable)
Current Student     â—„â”€â”€â–º Alumni              (mentorship, networking)
Current Student     â—„â”€â”€â–º Employer            (job placement)
Current Student     â—„â”€â”€â–º Parent              (progress sharing)
Parent              â—„â”€â”€â–º Instructor          (parent-teacher)
Parent              â—„â”€â”€â–º Accountant          (fee inquiries)
Intern              â—„â”€â”€â–º Mentor              (supervision)
Intern              â—„â”€â”€â–º HR Officer          (onboarding/evaluation)
Alumni              â—„â”€â”€â–º Employer            (job board)
Alumni              â—„â”€â”€â–º Current Student     (mentorship)
Instructor          â—„â”€â”€â–º Department Head     (management)
Instructor          â—„â”€â”€â–º Mentor              (student support coordination)
Department Head     â—„â”€â”€â–º Director            (strategy)
Department Head     â—„â”€â”€â–º Operations Manager  (resource planning)
Operations Manager  â—„â”€â”€â–º Supplier            (procurement)
Operations Manager  â—„â”€â”€â–º Accountant          (budget execution)
Operations Manager  â—„â”€â”€â–º IT Support          (infrastructure)
Receptionist        â—„â”€â”€â–º Visitor             (check-in)
Receptionist        â—„â”€â”€â–º Prospective Student (walk-in)
Receptionist        â—„â”€â”€â–º All Staff           (deliveries, messages)
IT Support          â—„â”€â”€â–º All Actors          (tickets)
System Admin        â—„â”€â”€â–º All Actors          (user management)
System Admin        â—„â”€â”€â–º Developer           (deployments, access)
Developer           â—„â”€â”€â–º All Actors          (feature delivery)
Accountant          â—„â”€â”€â–º HR Officer          (payroll)
Accountant          â—„â”€â”€â–º Client              (invoicing)
Accountant          â—„â”€â”€â–º Supplier            (payments)
HR Officer          â—„â”€â”€â–º All Employees       (lifecycle)
Marketing Officer   â—„â”€â”€â–º Prospective Student (lead generation)
Marketing Officer   â—„â”€â”€â–º Alumni              (ambassador program)
Marketing Officer   â—„â”€â”€â–º Partner             (co-marketing)
Conversion Copywriter â—„â”€â”€â–º Marketing Officer (campaign copy)
Conversion Copywriter â—„â”€â”€â–º Visual/UX Designer (landing page copy + design)
Conversion Copywriter â—„â”€â”€â–º Growth Specialist (A/B test copy variants)
Conversion Copywriter â—„â”€â”€â–º Global/Nigerian-market Copywriter (localized variants)
Product Marketing Manager â—„â”€â”€â–º Director (GTM strategy)
Product Marketing Manager â—„â”€â”€â–º Department Head (program positioning)
Product Marketing Manager â—„â”€â”€â–º Conversion Copywriter (messaging briefs)
Product Marketing Manager â—„â”€â”€â–º Marketing Officer (campaign alignment)
Behavioral Designer  â—„â”€â”€â–º Instructor (engagement intervention design)
Behavioral Designer  â—„â”€â”€â–º Student (nudge/behavioral flows)
Behavioral Designer  â—„â”€â”€â–º Product Marketing Manager (adoption strategy)
Growth Specialist    â—„â”€â”€â–º Marketing Officer (channel experiments)
Growth Specialist    â—„â”€â”€â–º Product Marketing Manager (growth experiments)
Growth Specialist    â—„â”€â”€â–º Developer (experiment implementation)
Global/Nigerian-market Copywriter â—„â”€â”€â–º Conversion Copywriter (localization handoff)
Global/Nigerian-market Copywriter â—„â”€â”€â–º Marketing Officer (market-specific campaigns)
Global/Nigerian-market Copywriter â—„â”€â”€â–º Partner (local partnership content)
Visual/UX Designer   â—„â”€â”€â–º Developer (design handoff, component specs)
Visual/UX Designer   â—„â”€â”€â–º System Admin (design system tokens)
Visual/UX Designer   â—„â”€â”€â–º All Actors (UI/UX across every screen)
Visual/UX Designer   â—„â”€â”€â–º Behavioral Designer (behavioral UI patterns)
Partner             â—„â”€â”€â–º Director            (partnership strategy)
Partner             â—„â”€â”€â–º Marketing Officer   (co-branded campaigns)
NGO                 â—„â”€â”€â–º Director            (strategic alignment)
NGO                 â—„â”€â”€â–º Volunteer           (program delivery)
NGO                 â—„â”€â”€â–º Community           (impact)
Government Rep      â—„â”€â”€â–º Director            (compliance)
Government Rep      â—„â”€â”€â–º Department Head     (accreditation data)
Client              â—„â”€â”€â–º Project Manager     (delivery)
Client              â—„â”€â”€â–º Accountant          (invoices)
Client              â—„â”€â”€â–º IT Support          (tickets)
Employer            â—„â”€â”€â–º Career Services     (placement)
Employer            â—„â”€â”€â–º Current Student     (hiring)
Employer            â—„â”€â”€â–º Alumni              (experienced hires)
Volunteer           â—„â”€â”€â–º Community Manager   (coordination)
Volunteer           â—„â”€â”€â–º NGO                 (program delivery)
```

## 2.3 Cross-Actor Business Processes

Each business process involves multiple actors working in sequence. Below is the master catalog:

| Process ID | Process Name                       | Actors Involved (in order)                                                                  | Phase |
| ---------- | ---------------------------------- | ------------------------------------------------------------------------------------------- | ----- |
| BP-001     | Prospect â†’ Student Admission       | Prospective Student â†’ Marketing Officer â†’ Admissions Officer â†’ Accountant â†’ Current Student | 1     |
| BP-002     | Course Delivery Lifecycle          | Department Head â†’ Instructor â†’ Current Student â†’ Instructor â†’ Current Student               | 1     |
| BP-003     | Student Assessment & Grading       | Instructor â†’ Current Student â†’ Instructor â†’ Department Head                                 | 1     |
| BP-004     | Student Portfolio to Job Placement | Current Student â†’ Mentor â†’ Alumni â†’ Employer â†’ Current Student                              | 2     |
| BP-005     | Freelance Gig Lifecycle            | Employer â†’ Current Student/Alumni â†’ Employer â†’ Accountant                                   | 2     |
| BP-006     | Client Service Delivery            | Marketing Officer â†’ Client â†’ Project Team â†’ Client â†’ Accountant                             | 3     |
| BP-007     | Support Ticket Resolution          | Client â†’ IT Support â†’ Client                                                                | 3     |
| BP-008     | Employee Onboarding                | HR Officer â†’ System Admin â†’ IT Support â†’ Department Head â†’ Employee                         | 4     |
| BP-009     | Procurement & Payment              | Operations Manager â†’ Supplier â†’ Accountant â†’ Supplier                                       | 4     |
| BP-010     | Community Program Execution        | NGO â†’ Community Manager â†’ Volunteer â†’ NGO                                                   | 5     |
| BP-011     | Alumni Mentorship                  | Alumni â†’ Current Student â†’ Mentor                                                           | 5     |
| BP-012     | Accreditation/Compliance Review    | Government Rep â†’ Director â†’ Department Head â†’ Government Rep                                | 5     |

---

# 3. Unified Data Universe

## 3.1 Complete Entity-Relationship Diagram

```
                            CEA-OS MASTER DATA MODEL

CORE
organizations â”€â”€1:Nâ”€â”€ branches â”€â”€1:Nâ”€â”€ departments â”€â”€1:Nâ”€â”€ teams
users â”€â”€N:Mâ”€â”€ roles â”€â”€N:Mâ”€â”€ permissions
users â”€â”€1:1â”€â”€ user_profiles
users â”€â”€1:Nâ”€â”€ user_devices
users â”€â”€1:Nâ”€â”€ audit_logs
users â”€â”€1:Nâ”€â”€ notifications

LEARNING
departments â”€â”€1:Nâ”€â”€ programs â”€â”€1:Nâ”€â”€ courses â”€â”€1:Nâ”€â”€ modules â”€â”€1:Nâ”€â”€ lessons
courses â”€â”€N:Mâ”€â”€ instructors (via course_assignments)
courses â”€â”€N:Mâ”€â”€ students (via enrollments)
lessons â”€â”€1:Nâ”€â”€ lesson_materials
enrollments â”€â”€1:Nâ”€â”€ progress_tracking
enrollments â”€â”€1:Nâ”€â”€ attendance_records

ASSESSMENTS
modules â”€â”€1:Nâ”€â”€ assignments
modules â”€â”€1:Nâ”€â”€ assessments (quizzes/exams)
assignments â”€â”€1:Nâ”€â”€ submissions
assessments â”€â”€1:Nâ”€â”€ assessment_questions
assessments â”€â”€1:Nâ”€â”€ assessment_attempts
assessment_attempts â”€â”€1:Nâ”€â”€ assessment_responses
submissions/attempts â”€â”€1:Nâ”€â”€ grades

FINANCE
organizations â”€â”€1:Nâ”€â”€ accounts (chart of accounts)
accounts â”€â”€1:Nâ”€â”€ transactions
invoices â”€â”€1:Nâ”€â”€ invoice_line_items
invoices â”€â”€1:Nâ”€â”€ payments
users â”€â”€1:Nâ”€â”€ expense_claims
budgets â”€â”€1:Nâ”€â”€ budget_lines
payroll_runs â”€â”€1:Nâ”€â”€ payroll_items

HR
users â”€â”€1:1â”€â”€ employee_records
employee_records â”€â”€1:Nâ”€â”€ leave_requests
employee_records â”€â”€1:Nâ”€â”€ attendance_logs
employee_records â”€â”€1:Nâ”€â”€ performance_reviews
employee_records â”€â”€1:Nâ”€â”€ training_records

CRM
contacts (polymorphic: prospective_student, client, partner, etc.)
contacts â”€â”€1:Nâ”€â”€ interactions
contacts â”€â”€1:Nâ”€â”€ deals/pipeline_stages
contacts â”€â”€N:Mâ”€â”€ campaigns

PROJECTS
clients â”€â”€1:Nâ”€â”€ projects
projects â”€â”€1:Nâ”€â”€ project_tasks
projects â”€â”€1:Nâ”€â”€ project_milestones
projects â”€â”€1:Nâ”€â”€ time_entries
projects â”€â”€1:Nâ”€â”€ contracts
contracts â”€â”€1:Nâ”€â”€ proposals

MARKETPLACE
employers â”€â”€1:Nâ”€â”€ job_listings
job_listings â”€â”€1:Nâ”€â”€ job_applications
users â”€â”€1:Nâ”€â”€ portfolios
portfolios â”€â”€1:Nâ”€â”€ portfolio_projects

ADMISSIONS
prospective_students â”€â”€1:Nâ”€â”€ applications
applications â”€â”€1:1â”€â”€ application_documents
applications â”€â”€1:Nâ”€â”€ application_notes
applications â”€â”€1:Nâ”€â”€ interviews

COMMUNITY
forum_categories â”€â”€1:Nâ”€â”€ forum_threads â”€â”€1:Nâ”€â”€ forum_posts
events â”€â”€1:Nâ”€â”€ event_registrations
groups â”€â”€N:Mâ”€â”€ group_members
scholarships â”€â”€1:Nâ”€â”€ scholarship_applications
volunteer_opportunities â”€â”€1:Nâ”€â”€ volunteer_signups
partners â”€â”€1:Nâ”€â”€ partner_agreements

INVENTORY
branches â”€â”€1:Nâ”€â”€ warehouses
warehouses â”€â”€1:Nâ”€â”€ inventory_items
inventory_items â”€â”€1:Nâ”€â”€ stock_movements
suppliers â”€â”€1:Nâ”€â”€ purchase_orders
purchase_orders â”€â”€1:Nâ”€â”€ po_line_items

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
| `branches`         | `id: text`  | organizationId, name, code, type, capacity, operatingHours, facilities, status                                                                                         | code (unique)                                   | organizationId â†’ organizations.id                                                  |
| `departments`      | `id: text`  | branchId, name, code, headUserId, parentDepartmentId, description, budgetId, status                                                                                    | code (unique)                                   | branchId â†’ branches.id, headUserId â†’ users.id, parentDepartmentId â†’ departments.id |
| `users`            | `id: text`  | email, passwordHash, firstName, lastName, avatarUrl, phone, emailVerified, twoFactorEnabled, status, lastLoginAt, loginAttempts, lockoutUntil, preferences, timestamps | email (unique)                                  | —                                                                                  |
| `roles`            | `id: text`  | name, slug, description, hierarchy, isSystem, isAssignable                                                                                                             | name (unique), slug (unique)                    | —                                                                                  |
| `permissions`      | `id: text`  | resource, action, description, conditions                                                                                                                              | —                                               | —                                                                                  |
| `role_permissions` | `id: text`  | roleId, permissionId, constraints                                                                                                                                      | —                                               | roleId â†’ roles.id, permissionId â†’ permissions.id                                   |
| `user_roles`       | `id: text`  | userId, roleId, scopeType, scopeId, assignedById, expiresAt, isActive                                                                                                  | —                                               | userId â†’ users.id, roleId â†’ roles.id                                               |
| `sessions`         | `id: text`  | userId, token, refreshToken, deviceInfo, ipAddress, isMfaVerified, expiresAt, refreshExpiresAt, revokedAt                                                              | token (unique), refreshToken (unique)           | userId â†’ users.id                                                                  |
| `audit_logs`       | `id: text`  | userId, sessionId, action, resource, resourceId, details, ipAddress, userAgent, severity, immutable                                                                    | idx_user, idx_resource, idx_action, idx_created | userId â†’ users.id                                                                  |
| `user_preferences` | `id: text`  | userId, theme, language, timezone, dateFormat, timeFormat, notificationPreferences, emailDigest, sidebarCollapsed, dashboardLayout                                     | userId (unique)                                 | userId â†’ users.id                                                                  |

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

