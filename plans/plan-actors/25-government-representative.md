# Actor: Government Representative

## 1. Identity & Role Definition

**Actor ID:** `government_rep`  
**Display Name:** Government Representative  
**Description:** External government/regulatory user who accesses CEA-OS to review compliance data, regulatory reports, institutional information, and audit documentation. Also manages filings, timelines, and secure messaging with the institution. Has read-only access to most data with specific write capabilities for filings and messaging.  
**System Role:** `government_official`  
**Hierarchy:** External — no internal reporting line  
**Session Timeout:** 15 minutes of inactivity (high-security)  
**Concurrent Sessions:** 1 max  
**MFA:** Required — TOTP + hardware key (FIDO2)  
**IP Restriction:** Whitelist-only (government IP ranges)

## 2. Primary Goals & Success KPIs

| Goal                                  | KPI                                     | Target               |
| ------------------------------------- | --------------------------------------- | -------------------- |
| Verify regulatory compliance          | Compliance score across all standards   | > 95%                |
| Review institutional data accuracy    | Data discrepancy rate in filings        | < 0.5%               |
| Process filings on time               | Filing submission rate before deadlines | 100%                 |
| Monitor audit readiness               | Audit finding closure rate              | > 90% within 30 days |
| Access documentation efficiently      | Average document retrieval time         | < 2 minutes          |
| Communicate securely with institution | Response time to queries                | < 48 hours           |
| Track regulatory timeline             | Missed regulatory deadline count        | 0                    |
| Oversee institutional changes         | Change notification acknowledgment rate | 100%                 |

## 3. Complete Screen Inventory

### 3.1 Compliance Portal (`/compliance`)

**Wireframe:** Personalized compliance dashboard showing overall status, upcoming deadlines, recent filings, and alerts.

**Top Banner:** Institution name, Representative name, Last login timestamp, "This is a secure government system" notice

**Overall Compliance Score:** Large circular gauge (0-100%) with color (green >90, yellow 70-90, red <70)

- Breakdown by category: Academic, Financial, Administrative, Facility, Safety

**Upcoming Deadlines Widget:**

- List: Filing name, Due date (countdown), Status (Not Started / In Progress / Submitted), Priority
- Click → filing detail page
- "View All Deadlines" link

**Recent Filings Widget:**

- Last 5 filings submitted with status (Under Review / Approved / Returned for Revisions)
- Click → filing detail

**Alerts & Notifications Widget:**

- Institutional alerts (e.g., "Change in leadership — requires notification filing")
- System notifications (e.g., "New compliance report available")

**Quick Actions:**

- "📄 New Filing" button
- "📊 View Institutional Data" button
- "📁 Document Library" button
- "✉️ Message Institution" button
- "📋 Run Audit Report" button

**Data Bindings:**

- `GET /api/compliance/dashboard/summary`
- `GET /api/compliance/dashboard/deadlines`
- `GET /api/compliance/dashboard/recent-filings`
- `GET /api/compliance/dashboard/alerts`

**States:**

| State                               | Behavior                                                                               |
| ----------------------------------- | -------------------------------------------------------------------------------------- |
| Loading                             | Gauge skeleton, deadline list shimmer, filing skeletons                                |
| Empty                               | "Welcome to the Compliance Portal. Your dashboard will populate as data is submitted." |
| Critical deadline approaching (<7d) | Red highlight, pulse animation on deadline item                                        |
| Score below threshold               | Warning message with improvement suggestions                                           |
| No active compliance period         | "No active compliance period. Contact your institution liaison."                       |

### 3.2 Institutional Data (`/compliance/institution`)

**Wireframe:** Read-only view of all institutional data organized by category with export capability.

**Category Navigation (Left Tabs):**

- General Information
- Academic Programs
- Faculty & Staff
- Student Enrollment
- Financial Data
- Facilities & Infrastructure
- Accreditations
- Governance & Leadership

**Each Category Page:**

**General Information:**

- Institution Name, Address, Phone, Website, President/CEO, Year Established, Institution Type (Public/Private/Non-profit), Religious Affiliation, Campus Size (acres), Accreditation Body, License Number, Tax ID

**Academic Programs:**

- Table: Program Name, Code, Level, Department, Duration, Delivery Mode (On-Campus/Online/Hybrid), Accreditation Status, Student Capacity, Current Enrollment
- Total program count, total enrolled students summary

**Faculty & Staff:**

- Counts: Full-time faculty, Part-time faculty, Adjunct faculty, Administrative staff, Support staff
- Student-to-faculty ratio
- Faculty qualifications: PhD %, Master's %, Bachelor's %
- Diversity metrics (if available)

**Student Enrollment:**

- Current enrollment by program table
- Enrollment history chart (last 5 years)
- Demographics: Gender, Age, Nationality, Residency
- Retention rates: 1st year, 2nd year, Graduation rate
- Application/admission/enrollment funnel data

**Financial Data:**

- Annual budget (current year)
- Revenue breakdown: Tuition, Government funding, Donations, Grants, Other
- Expenditure breakdown: Salaries, Facilities, Technology, Student services, Other
- Tuition fees by program
- Scholarship disbursement total
- Audit status (last audit date, findings)

**Facilities & Infrastructure:**

- Campus buildings count, total square footage
- Classroom count, Lab count, Library details
- Student housing capacity
- IT infrastructure summary
- Safety compliance (fire inspections, accessibility)

**Accreditations:**

- Table: Accreditation Body, Status, Valid From, Valid Until, Last Review, Next Review
- File attachments for certificates

**Governance & Leadership:**

- Board of Trustees / Directors table
- Executive leadership table
- Organizational chart (if available)

**Data Bindings:**

- All data: `GET /api/compliance/institution/{category}`
- Export: `GET /api/compliance/institution/export?format=pdf|csv`

**States:**

| State              | Behavior                                                                    |
| ------------------ | --------------------------------------------------------------------------- |
| Loading            | Category skeleton                                                           |
| Empty category     | "No data available for [category]."                                         |
| Stale data warning | "Data last updated [date]. Contact institution if more recent data needed." |
| Export in progress | "Generating export..."                                                      |

### 3.3 Regulatory Reports (`/compliance/reports`)

**Wireframe:** Library of regulatory reports with generation, viewing, and submission capabilities.

**Report Library (Grid/List):**

- Pre-defined report types:
  - Annual Compliance Report
  - Financial Audit Report
  - Enrollment Report (semester/annual)
  - Faculty Qualification Report
  - Program Outcome Assessment
  - Student Achievement Report
  - Facility Safety Report
  - IT Security Compliance Report
  - Accreditation Self-Study Report
  - Custom Report (generated from selected data)
- Each card: Report name, Description, Period (e.g., "2025-2026"), Status (Not Generated / Draft / Submitted / Approved / Returned), Last generated, Action buttons

**Report Generation:**

- Select report type
- Select period (academic year / semester / custom date range)
- Preview: Shows data that will be included, allows exclusions
- "Generate Report" button → progress indicator
- Once generated: Preview (PDF rendered in-browser), Download, Submit

**Report Detail Page:**

- **Header:** Report name, Period, Status badge, Generated at, Submitted at
- **Report Content:** Rendered PDF with navigation (pages, zoom, search)
- **Metadata:** Report type, Generated by, Period covered, Data sources
- **Status History:** Draft → Submitted → Under Review → Approved / Returned
- **Actions:** Download PDF, Download Excel Source Data, Submit (if draft), Resubmit (if returned), View Return Comments
- **Return Comments Section:** If returned: reason, requested changes, due date for resubmission

**Data Bindings:**

- Reports: `GET /api/compliance/reports?type={type}&status={status}`
- Generate: `POST /api/compliance/reports/generate`
- Report: `GET /api/compliance/reports/{id}`
- Submit: `POST /api/compliance/reports/{id}/submit`
- Download: `GET /api/compliance/reports/{id}/download`

**States:**

| State                      | Behavior                                                              |
| -------------------------- | --------------------------------------------------------------------- |
| Loading                    | Report card skeletons                                                 |
| Empty                      | "No reports available. Generate your first report."                   |
| Generation in progress     | Progress bar: "Generating report... This may take a few minutes."     |
| Report returned            | Red banner: "Report returned for revisions. [View Comments]"          |
| Submission deadline passed | Warning: "Submission deadline was [date]. Please submit immediately." |

### 3.4 Documentation Library (`/compliance/documents`)

**Wireframe:** Document repository with categories, search, version history, and secure access.

**Category Tree (Left):**

- Institution Policies
- Accreditation Documents
- Financial Records
- Legal Documents
- Meeting Minutes
- Compliance Certificates
- Licenses & Permits
- Archived Documents

**Document List (Center):**

- Search bar: full-text across document names and metadata
- Filter: Category, Date range, Document type (PDF/DOC/XLS/IMG), Upload date
- Sort: Name, Date, Size
- Table: Name, Category, Type icon, Size, Upload date, Expiry date (if applicable), Status (Current/Expiring/Expired), Actions
- Actions: View, Download, Version History

**Document Viewer (Modal/New Tab):**

- Embedded PDF/image viewer
- Document metadata: Title, Description, Category, Tags, Version, Effective date, Expiry date, Uploaded by, Uploaded at, Last updated
- Version history: Table of versions with dates, uploader, change notes
- Download button

**Upload Document (Government Rep can upload supporting docs):**

- Drag & drop zone, File selector
- Document type dropdown, Category, Title, Description, Expiry date (optional)
- Tags (optional)
- "Upload" button

**Data Bindings:**

- Documents: `GET /api/compliance/documents?category={id}&search={q}`
- Upload: `POST /api/compliance/documents` (multipart/form-data)
- Download: `GET /api/compliance/documents/{id}/download`
- Version history: `GET /api/compliance/documents/{id}/versions`

**States:**

| State                    | Behavior                                           |
| ------------------------ | -------------------------------------------------- |
| Loading                  | Category tree skeleton + document list skeleton    |
| Empty category           | "No documents in this category."                   |
| Search no results        | "No documents match your search."                  |
| Document expiring (<30d) | Yellow warning icon, tooltip: "Expires in 14 days" |
| Document expired         | Red icon, "EXPIRED" badge                          |

### 3.5 Audit Module (`/compliance/audit`)

**Wireframe:** Audit management interface for scheduling, tracking, and reviewing compliance audits.

**Audit Overview:**

- Next scheduled audit: date, scope, status
- Last audit: date, score, findings count
- Open findings: count by severity (Critical/Major/Minor/Observation)
- Overall audit readiness score

**Audit Schedule (Calendar/List):**

- All scheduled and completed audits
- Each: Audit name, Type (Internal/External/Regulatory), Scope, Scheduled date, Status (Planned/In Progress/Completed), Lead auditor
- Click → audit detail

**Audit Detail Page:**

- **Header:** Audit name, Type, Status, Date, Lead auditor
- **Scope:** Description of what is being audited (programs, departments, processes)
- **Audit Team:** List of auditors with roles
- **Findings Table:**
  - Finding ID, Description, Severity (Critical/Major/Minor/Observation), Category, Status (Open/In Progress/Closed), Target closure date, Closed date, Responsible party
  - Click → finding detail with evidence, corrective action plan
- **Evidence Section:** Uploaded documents, photos, interview notes
- **Audit Report:** Link to generated audit report

**Finding Detail Modal:**

- Full description, severity, category, status
- Evidence attachments
- Corrective action plan: Description, Responsible person, Target date, Status, Progress notes
- Closure verification: Evidence of correction, Verified by, Verified date

**Data Bindings:**

- Overview: `GET /api/compliance/audit/overview`
- Schedule: `GET /api/compliance/audit/schedule`
- Detail: `GET /api/compliance/audit/{id}`
- Findings: `GET /api/compliance/audit/{id}/findings`
- Update finding: `PATCH /api/compliance/audit/findings/{findingId}`

**States:**

| State                      | Behavior                                                    |
| -------------------------- | ----------------------------------------------------------- |
| Loading                    | Overview skeleton + schedule skeleton                       |
| Empty                      | "No audits scheduled."                                      |
| Audit in progress          | "In Progress" banner, live status updates                   |
| Finding overdue            | Red highlight on overdue findings                           |
| Multiple critical findings | Red alert: "Critical findings require immediate attention." |

### 3.6 Filings & Timeline (`/compliance/filings`)

**Wireframe:** Regulatory filing management with submission deadlines, status tracking, and historical timeline.

**Filing Calendar View (Top):**

- Year/month timeline showing filing deadlines as markers
- Color-coded: Green (submitted), Yellow (in progress), Red (overdue), Gray (upcoming)
- Click marker → filing detail

**Filings List (Bottom):**

- Table: Filing Name, Regulation/Statute, Due Date, Submitted Date, Status (Not Started / Draft / Submitted / Under Review / Approved / Returned), Filed By, Actions
- Filter by: Year, Status, Filing category
- Search by filing name

**Filing Detail Page (`/compliance/filings/{id}`):**

- **Header:** Filing name, Regulation reference, Due date, Status badge
- **Form Fields:** Pre-populated from institutional data, editable by government rep
  - Fields vary by filing type (e.g., Annual Report, Enrollment Filing, Financial Disclosure)
  - Each field: Label, Data source indicator (auto-filled from institution / manual entry), Last updated
- **Attachments Section:** Upload supporting documents per filing
- **Submission History:**
  - Version tracking (each submission is a version)
  - Table: Version, Submitted at, Submitted by, Status, Notes
- **Comments Section:** Internal notes for the representative
- **Actions:** Save Draft, Submit Filing, Download Submitted Version, View Return Comments

**Filing Submission Flow:**

1. Rep reviews pre-filled data
2. Makes any necessary corrections
3. Uploads required attachments
4. Clicks "Submit Filing"
5. Warning: "This submission is legally binding. Confirm accuracy."
6. Confirm → filing submitted, status → "Under Review"
7. Institution receives notification with filing data

**Data Bindings:**

- Filings: `GET /api/compliance/filings?year={year}&status={status}`
- Filing: `GET /api/compliance/filings/{id}`
- Update: `PATCH /api/compliance/filings/{id}`
- Submit: `POST /api/compliance/filings/{id}/submit`
- Attachments: `POST /api/compliance/filings/{id}/attachments`

**States:**

| State                   | Behavior                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| Loading                 | Calendar skeleton + table shimmer                                                        |
| Empty                   | "No filings for this year."                                                              |
| Filing overdue          | Red badge with days overdue count                                                        |
| Filing submitted today  | "Filed today" indicator                                                                  |
| Filing returned         | "Returned for revision. Reason: [comment]. Due: [date]"                                  |
| Submission confirmation | Modal: "Filing submitted successfully. Reference #: [ID]. Confirmation sent to [email]." |

### 3.7 Messaging (`/compliance/messaging`)

**Wireframe:** Secure messaging system for communication between government representative and institution.

**Layout:** Email-like interface with threading

**Left Sidebar — Conversations:**

- List of conversation threads
- Each: Other party name (institution liaison / department), Subject preview, Last message preview, Timestamp, Unread badge (count)
- "➕ New Message" button

**Center — Message Thread:**

- Subject line (top)
- Message bubbles: Sender avatar, Name, Timestamp, Body (rich text), Attachments
- Secure indicator: "This conversation is encrypted and logged for audit purposes"
- Reply box: Rich text editor, Attachment upload, "Send Secure Message" button

**Compose New Message:**

- To: Dropdown of institution contacts (Liaison, Compliance Officer, President's Office, IT Security, etc.)
- Subject: Text input
- Body: Rich text editor
- Priority: Normal / High (High = institution notified via SMS)
- Attachments: Drag & drop, file selector
- "Send" button

**Message Search:**

- Full-text search across all messages
- Filter by: Date range, Sender, Priority, Has attachments

**Data Bindings:**

- Conversations: `GET /api/compliance/messages?folder={folder}`
- Thread: `GET /api/compliance/messages/thread/{threadId}`
- Send: `POST /api/compliance/messages/send`
- Search: `GET /api/compliance/messages/search?q={query}`

**States:**

| State             | Behavior                                                  |
| ----------------- | --------------------------------------------------------- |
| Loading           | Skeleton conversation list + thread shimmer               |
| Empty inbox       | "No messages. Start a conversation with the institution." |
| New message alert | Toast notification (real-time via WebSocket)              |
| Send failure      | "Message failed to send. [Retry]. Saved as draft."        |

## 4. Full Database Schema

```typescript
// ============================================================
// schema/compliance/index.ts
// ============================================================
import { sqliteTable, text, integer, real, uniqueIndex, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ─────────────────────────────────────────────
// 1. INSTITUTION DATA (snapshot per period)
// ─────────────────────────────────────────────
export const institutionData = sqliteTable(
  "compliance_institution_data",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    periodId: text("period_id")
      .notNull()
      .references(() => compliancePeriods.id),
    category: text("category", {
      enum: [
        "general",
        "academic",
        "faculty",
        "enrollment",
        "financial",
        "facilities",
        "accreditation",
        "governance",
      ],
    }).notNull(),
    data: text("data", { mode: "json" }).notNull(), // full category data
    dataHash: text("data_hash").notNull(), // SHA-256 for integrity verification
    certifiedBy: text("certified_by"),
    certifiedAt: text("certified_at"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(current_timestamp)`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`(current_timestamp)`)
      .$onUpdate(() => sql`(current_timestamp)`),
  },
  (table) => ({
    periodCategoryIdx: uniqueIndex("idx_compliance_period_category").on(
      table.periodId,
      table.category,
    ),
  }),
);

// ─────────────────────────────────────────────
// 2. COMPLIANCE PERIODS
// ─────────────────────────────────────────────
export const compliancePeriods = sqliteTable("compliance_periods", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(), // e.g., "2025-2026 Academic Year"
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(false),
  status: text("status", { enum: ["upcoming", "active", "closed"] })
    .notNull()
    .default("upcoming"),
  createdById: text("created_by_id"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 3. REGULATORY REPORTS
// ─────────────────────────────────────────────
export const regulatoryReports = sqliteTable("compliance_regulatory_reports", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  reportType: text("report_type", {
    enum: [
      "annual_compliance",
      "financial_audit",
      "enrollment",
      "faculty_qualification",
      "program_outcome",
      "student_achievement",
      "facility_safety",
      "it_security",
      "accreditation_self_study",
      "custom",
    ],
  }).notNull(),
  periodId: text("period_id").references(() => compliancePeriods.id),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status", { enum: ["not_generated", "draft", "submitted", "approved", "returned"] })
    .notNull()
    .default("not_generated"),
  generatedById: text("generated_by_id"),
  generatedAt: text("generated_at"),
  submittedById: text("submitted_by_id"),
  submittedAt: text("submitted_at"),
  approvedById: text("approved_by_id"),
  approvedAt: text("approved_at"),
  returnedReason: text("returned_reason"),
  returnedAt: text("returned_at"),
  fileKey: text("file_key"), // R2 key for generated PDF
  sourceDataKey: text("source_data_key"), // R2 key for Excel source data
  dataIncluded: text("data_included", { mode: "json" }).$type<string[]>().default([]),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 4. FILINGS
// ─────────────────────────────────────────────
export const filings = sqliteTable("compliance_filings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  filingNumber: text("filing_number").notNull().unique(), // FLNG-YYYY-XXXX
  name: text("name").notNull(),
  regulation: text("regulation"), // governing regulation/statute
  periodId: text("period_id").references(() => compliancePeriods.id),
  dueDate: text("due_date").notNull(),
  submittedAt: text("submitted_at"),
  status: text("status", {
    enum: ["not_started", "draft", "submitted", "under_review", "approved", "returned"],
  })
    .notNull()
    .default("not_started"),
  filedById: text("filed_by_id"),
  formData: text("form_data", { mode: "json" }).$type<Record<string, unknown>>().default({}),
  returnReason: text("return_reason"),
  returnActionDue: text("return_action_due"),
  version: integer("version").default(1),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 5. FILING VERSIONS
// ─────────────────────────────────────────────
export const filingVersions = sqliteTable("compliance_filing_versions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  filingId: text("filing_id")
    .notNull()
    .references(() => filings.id, { onDelete: "cascade" }),
  version: integer("version").notNull(),
  formData: text("form_data", { mode: "json" }).notNull(),
  submittedById: text("submitted_by_id"),
  submittedAt: text("submitted_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  notes: text("notes"),
  fileKey: text("file_key"), // R2 key for submitted PDF
});

// ─────────────────────────────────────────────
// 6. AUDITS
// ─────────────────────────────────────────────
export const audits = sqliteTable("compliance_audits", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  type: text("type", { enum: ["internal", "external", "regulatory"] }).notNull(),
  scope: text("scope"),
  scopeCategories: text("scope_categories", { mode: "json" }).$type<string[]>().default([]),
  scheduledDate: text("scheduled_date"),
  completedDate: text("completed_date"),
  status: text("status", { enum: ["planned", "in_progress", "completed", "cancelled"] })
    .notNull()
    .default("planned"),
  leadAuditor: text("lead_auditor"),
  auditTeam: text("audit_team", { mode: "json" }).$type<string[]>().default([]),
  overallScore: integer("overall_score"), // 0-100
  findingsCount: integer("findings_count").default(0),
  reportKey: text("report_key"), // R2 key
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 7. AUDIT FINDINGS
// ─────────────────────────────────────────────
export const auditFindings = sqliteTable("compliance_audit_findings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  auditId: text("audit_id")
    .notNull()
    .references(() => audits.id, { onDelete: "cascade" }),
  findingNumber: text("finding_number").notNull(), // FNDG-001
  description: text("description").notNull(),
  severity: text("severity", { enum: ["critical", "major", "minor", "observation"] }).notNull(),
  category: text("category"),
  status: text("status", { enum: ["open", "in_progress", "closed"] })
    .notNull()
    .default("open"),
  targetClosureDate: text("target_closure_date"),
  closedDate: text("closed_date"),
  responsibleParty: text("responsible_party"),
  correctiveActionPlan: text("corrective_action_plan"),
  correctiveActionNotes: text("corrective_action_notes"),
  closureEvidence: text("closure_evidence_key"), // R2 key
  verifiedById: text("verified_by_id"),
  verifiedAt: text("verified_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 8. COMPLIANCE DOCUMENTS
// ─────────────────────────────────────────────
export const complianceDocuments = sqliteTable("compliance_documents", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  category: text("category", {
    enum: [
      "policies",
      "accreditation",
      "financial",
      "legal",
      "meeting_minutes",
      "certificates",
      "licenses",
      "archived",
      "other",
    ],
  }).notNull(),
  documentType: text("document_type"), // PDF, DOC, XLS, IMG
  description: text("description"),
  fileKey: text("file_key").notNull(),
  fileSize: integer("file_size"),
  mimeType: text("mime_type"),
  version: integer("version").default(1),
  effectiveDate: text("effective_date"),
  expiryDate: text("expiry_date"),
  tags: text("tags", { mode: "json" }).$type<string[]>().default([]),
  uploadedById: text("uploaded_by_id"),
  isArchived: integer("is_archived", { mode: "boolean" }).default(false),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 9. SECURE MESSAGES
// ─────────────────────────────────────────────
export const secureMessages = sqliteTable("compliance_secure_messages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  threadId: text("thread_id").notNull(),
  senderId: text("sender_id").notNull(),
  senderName: text("sender_name").notNull(),
  senderRole: text("sender_role"),
  body: text("body").notNull(),
  attachments: text("attachments", { mode: "json" }).$type<MessageAttachment[]>().default([]),
  priority: text("priority", { enum: ["normal", "high"] }).default("normal"),
  readAt: text("read_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 10. MESSAGE THREADS
// ─────────────────────────────────────────────
export const messageThreads = sqliteTable("compliance_message_threads", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  subject: text("subject").notNull(),
  participants: text("participants", { mode: "json" }).$type<string[]>().notNull(),
  lastMessageAt: text("last_message_at"),
  messageCount: integer("message_count").default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// Indexes
// ─────────────────────────────────────────────
export const filingsStatusIdx = index("idx_compliance_filings_status").on(filings.status);
export const filingsDueDateIdx = index("idx_compliance_filings_due").on(filings.dueDate);
export const filingsNumberIdx = uniqueIndex("idx_compliance_filings_number").on(
  filings.filingNumber,
);
export const reportsStatusIdx = index("idx_compliance_reports_status").on(regulatoryReports.status);
export const reportsPeriodIdx = index("idx_compliance_reports_period").on(
  regulatoryReports.periodId,
);
export const auditStatusIdx = index("idx_compliance_audit_status").on(audits.status);
export const findingsAuditIdx = index("idx_compliance_findings_audit").on(auditFindings.auditId);
export const findingsStatusIdx = index("idx_compliance_findings_status").on(auditFindings.status);
export const findingsSeverityIdx = index("idx_compliance_findings_severity").on(
  auditFindings.severity,
);
export const documentsCategoryIdx = index("idx_compliance_documents_category").on(
  complianceDocuments.category,
);
export const documentsExpiryIdx = index("idx_compliance_documents_expiry").on(
  complianceDocuments.expiryDate,
);
export const messagesThreadIdx = index("idx_compliance_messages_thread").on(
  secureMessages.threadId,
);
export const messagesCreatedIdx = index("idx_compliance_messages_created").on(
  secureMessages.createdAt,
);

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface MessageAttachment {
  fileName: string;
  fileSize: number;
  mimeType: string;
  storageKey: string;
}
```

## 5. Complete API Contract

#### `GET /api/compliance/dashboard/summary` — Compliance score, deadlines count, alerts

#### `GET /api/compliance/institution/{category}` — Institution data by category

#### `GET /api/compliance/institution/export?format=pdf|csv` — Export all institution data

#### `POST /api/compliance/reports/generate` — `{ reportType, periodId, dataIncluded[] }` → `{ id, status }`

#### `GET /api/compliance/reports/{id}` — Report detail with PDF URL

#### `POST /api/compliance/reports/{id}/submit` — Submit for review

#### `GET /api/compliance/filings` — List filings with filters

#### `GET /api/compliance/filings/{id}` — Filing detail with form data

#### `PATCH /api/compliance/filings/{id}` — Update filing form data

#### `POST /api/compliance/filings/{id}/submit` — Submit filing (creates version)

#### `POST /api/compliance/filings/{id}/attachments` — Upload attachment

#### `GET /api/compliance/audit/overview` — Audit summary

#### `GET /api/compliance/audit/{id}` — Audit detail with findings

#### `PATCH /api/compliance/audit/findings/{id}` — Update finding status

#### `GET /api/compliance/documents` — List documents

#### `POST /api/compliance/documents` — Upload document

#### `GET /api/compliance/documents/{id}/download` — Download document

#### `GET /api/compliance/messages` — List message threads

#### `GET /api/compliance/messages/thread/{id}` — Thread messages

#### `POST /api/compliance/messages/send` — `{ threadId?, subject, body, attachments[], priority, recipientId }`

## 6. Component Tree

```
<ComplianceLayout>
  ├── <CompliancePortal>
  │   ├── <ComplianceScoreGauge />
  │   ├── <DeadlinesWidget />
  │   ├── <RecentFilingsWidget />
  │   ├── <AlertsWidget />
  │   └── <QuickActionsToolbar />
  │
  ├── <InstitutionalData>
  │   ├── <CategoryNav />
  │   ├── <DataCategoryView>
  │   │   ├── <GeneralInfo />
  │   │   ├── <AcademicProgramsTable />
  │   │   ├── <FacultyStats />
  │   │   ├── <EnrollmentSection />
  │   │   ├── <FinancialData />
  │   │   ├── <FacilitiesSection />
  │   │   ├── <AccreditationsTable />
  │   │   └── <GovernanceSection />
  │   └── <ExportButton />
  │
  ├── <RegulatoryReports>
  │   ├── <ReportCardGrid />
  │   ├── <ReportGenerator />
  │   └── <ReportDetail>
  │       ├── <ReportViewer />
  │       ├── <ReportMetadata />
  │       ├── <StatusHistory />
  │       └── <ReturnComments />
  │
  ├── <DocumentLibrary>
  │   ├── <CategoryTree />
  │   ├── <DocumentList />
  │   ├── <DocumentViewer />
  │   ├── <DocumentUploadModal />
  │   └── <VersionHistory />
  │
  ├── <AuditModule>
  │   ├── <AuditOverview />
  │   ├── <AuditSchedule />
  │   ├── <AuditDetail>
  │   │   ├── <AuditHeader />
  │   │   ├── <FindingsTable />
  │   │   └── <FindingDetailModal />
  │   └── <AuditReport />
  │
  ├── <FilingsTimeline>
  │   ├── <FilingCalendar />
  │   ├── <FilingsTable />
  │   └── <FilingDetail>
  │       ├── <FilingForm />
  │       ├── <AttachmentsSection />
  │       ├── <SubmissionHistory />
  │       └── <SubmitActions />
  │
  └── <SecureMessaging>
      ├── <ConversationList />
      ├── <MessageThread />
      ├── <ComposeMessage />
      └── <SearchMessages />
```

## 7-15. (Specifications Summary)

**Business Rules:**

1. All data transmission encrypted at TLS 1.3 minimum; data integrity via SHA-256 hashing
2. Government representatives cannot modify institutional data (read-only); can flag discrepancies via messaging
3. Filings are legally binding — submission requires explicit confirmation checkbox; logged with timestamp and IP
4. Audit trail: every action (view, export, download, submit) logged with actor, timestamp, and purpose
5. Session timeout 15 min; automatic logout warning at 12 min
6. Document access logged with audit; sensitive documents require additional purpose justification
7. Filing deadlines are hard-coded per regulation; no extension possible via UI (requires offline process)
8. Compliance score calculated as weighted average of category scores (Academic 25%, Financial 25%, Faculty 15%, Enrollment 15%, Facilities 10%, Governance 10%)
9. Report generation can take up to 5 minutes for large datasets; async processing with queue
10. Messages flagged as high-priority trigger SMS notification to institution's compliance officer

**Notifications (Government Rep):**

- N-G01: Filing deadline approaching (30/14/7/1 day) → email + in-app
- N-G02: Filing returned for revision → email + in-app
- N-G03: Filing approved → email + in-app
- N-G04: New audit scheduled → email + in-app
- N-G05: Finding overdue → email weekly digest
- N-G06: New document uploaded by institution → in-app
- N-G07: New secure message received → in-app (real-time) + email
- N-G08: Compliance score change → email monthly
- N-G09: Institution data updated → in-app notification
- N-G10: Session about to expire → in-app warning (3 min before)

**Permissions:**

| Entity             | Government Rep          | Institution Admin      | System Admin      |
| ------------------ | ----------------------- | ---------------------- | ----------------- |
| Institutional Data | Read-only               | Full CRUD              | Full CRUD         |
| Reports            | Generate, Submit        | View, Return           | Full CRUD         |
| Filings            | Create, Submit, Edit    | View                   | Admin             |
| Audit Data         | View all                | View + Manage findings | Full CRUD         |
| Documents          | View, Download, Upload  | Full CRUD              | Full CRUD         |
| Messages           | Full (institution only) | Full (gov only)        | View (audit only) |
| Compliance Periods | View                    | Create, Edit           | Full CRUD         |

**Accessibility:** All pages keyboard navigable; document viewer with screen reader support; forms with proper labels and error announcements; high-contrast mode available; focus indicators on all interactive elements; ARIA live regions for deadline countdowns and status changes.

**Error Catalog:**

- E01: Filing submission after midnight on due date → allowed (grace period until 11:59 PM local time)
- E02: Institution data not yet certified for current period → "Data pending certification. Contact institution."
- E03: Report generation fails due to missing data → "Report generation failed. Required data missing: [list]."
- E04: Document upload exceeds size limit (50MB) → "File too large. Maximum size: 50MB."
- E05: Filing version limit reached (max 50 versions) → "Archive older versions before submitting."
- E06: Concurrent session limit reached → "Already logged in from another device. End other session?"
- E07: Expired security token → "Session expired. Please log in again."
- E08: Message to non-approved recipient → "Recipient not in approved contact list."
- E09: Audit export too large → "Request queued. You will receive an email when ready."
- E10: IP not in allowed range → "Access denied. Your IP is not in the authorized range."

### 3.8 Additional Screen: Compliance Calendar (`/compliance/calendar`)

**Wireframe:** Full regulatory calendar showing all deadlines, audits, filing periods, and key dates.

**Calendar View:**

- Year/Month/Week toggles
- Events shown as color-coded markers: Filing deadlines (red), Audits (blue), Report due (orange), Period start/end (green)
- Click event → event detail popover

**Event Detail Popover:**

- Event name, Type, Date/time, Description, Status, Related entity (filing/audit/report)
- "View Details" link → navigates to relevant page
- "Add to Calendar" button → downloads .ics file

**Legend:**

- Color key for event types
- Statistical summary: X filings due, Y audits scheduled, Z reports pending

**Data Bindings:**

- `GET /api/compliance/calendar?year={yyyy}&month={mm}`

### 3.9 Additional Screen: Data Integrity Verification (`/compliance/integrity`)

**Wireframe:** Tool for verifying the integrity of institution-submitted data against source systems.

**Data Integrity Dashboard:**

- Overall integrity score (percentage)
- Last verification date
- Number of checks passed/failed

**Integrity Checks Table:**

- Check Name, Description, Status (Passed/Failed/Pending), Last Run, Next Scheduled Run, Action
- Checks include: Row count match, Hash verification, Date range validity, Cross-reference consistency
- "Run All Checks" button
- "Run Check" per row

**Check Detail Modal:**

- Check name, description, criteria
- Result: Expected vs Actual values
- Diffs: Table of discrepancies
- "Export Discrepancies" button
- "Acknowledge" button (for known discrepancies)

**Data Bindings:**

- `GET /api/compliance/integrity/summary`
- `GET /api/compliance/integrity/checks`
- `POST /api/compliance/integrity/checks/{id}/run`
- `POST /api/compliance/integrity/checks/run-all`

## 4.1 Extended Schema: Compliance Calendar, Integrity Checks

```typescript
export const complianceCalendarEvents = sqliteTable("compliance_calendar_events", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  type: text("type", {
    enum: ["filing_deadline", "audit", "report_due", "period_start", "period_end", "other"],
  }).notNull(),
  date: text("date").notNull(),
  endDate: text("end_date"),
  description: text("description"),
  relatedEntityType: text("related_entity_type"), // "filing", "audit", "report", "period"
  relatedEntityId: text("related_entity_id"),
  status: text("status", { enum: ["upcoming", "completed", "overdue", "cancelled"] })
    .notNull()
    .default("upcoming"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

export const integrityChecks = sqliteTable("compliance_integrity_checks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description"),
  checkType: text("check_type", {
    enum: ["row_count", "hash", "date_range", "cross_reference", "schema_validation", "custom"],
  }).notNull(),
  status: text("status", { enum: ["passed", "failed", "pending"] })
    .notNull()
    .default("pending"),
  criteria: text("criteria", { mode: "json" }).$type<Record<string, unknown>>().default({}),
  result: text("result", { mode: "json" }).$type<Record<string, unknown>>().default({}),
  discrepancies: text("discrepancies", { mode: "json" }).$type<Discrepancy[]>().default([]),
  lastRunAt: text("last_run_at"),
  scheduleCron: text("schedule_cron"), // cron expression for auto-run
  acknowledged: integer("acknowledged", { mode: "boolean" }).default(false),
  acknowledgedById: text("acknowledged_by_id"),
  acknowledgedAt: text("acknowledged_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

export interface Discrepancy {
  field: string;
  expectedValue: unknown;
  actualValue: unknown;
  severity: "critical" | "major" | "minor";
  description: string;
}
```

## 5.1 Extended API Endpoints

#### `GET /api/compliance/calendar?year=2026&month=7` — Calendar events for month

#### `GET /api/compliance/integrity/summary` — Overall integrity score and stats

#### `GET /api/compliance/integrity/checks` — List all integrity checks

#### `POST /api/compliance/integrity/checks/{id}/run` — Run single check (async)

#### `POST /api/compliance/integrity/checks/run-all` — Run all pending checks (async)

#### `POST /api/compliance/integrity/checks/{id}/acknowledge` — Acknowledge discrepancies

## 6.1 Extended Component Tree

```
├── <ComplianceCalendar>
│   ├── <CalendarView month|week />
│   ├── <EventPopover />
│   ├── <CalendarLegend />
│   └── <AddToCalendarButton />
│
└── <DataIntegrity>
    ├── <IntegrityScore />
    ├── <IntegrityChecksTable />
    ├── <CheckDetailModal />
    └── <DiscrepancyExport />
```

## 7.1 Extended User Journeys

### Journey 4: Annual Compliance Report Submission

1. **GovRep** logs in → Compliance Portal → sees notification: "Annual Compliance Report 2025-2026 due in 30 days"
2. Opens `/compliance/reports` → finds "Annual Compliance Report" card with status "Not Generated"
3. Clicks "Generate Report" → selects period "2025-2026 Academic Year"
4. System compiles data from institutional data tables (3 min processing)
5. Report generated → preview opens in browser
6. **GovRep** reviews report: enrollment numbers, faculty qualifications, financial statements
7. Spots discrepancy: enrollment number (1,247) differs from previous filing (1,312)
8. Uses Messaging to contact institution liaison: "Please verify enrollment figure for AY 2025-2026"
9. Receives response with explanation: "Correction: 1,247 includes satellite campus; 1,312 was main campus only"
10. Notes this for record → submits report with note about discrepancy
11. Report status → "Submitted", institution notified for review
12. Downloads PDF copy for local filing

### Journey 5: Audit Review Process

1. **GovRep** opens `/compliance/audit` → sees scheduled audit: "Academic Program Audit 2026"
2. Scheduled for August 15 → today is August 10 → status "Planned"
3. Views audit detail: scope includes 12 programs, 3 auditors
4. Audit starts → status "In Progress" → **GovRep** monitors via dashboard
5. Auditor submits finding: "CS Program lacks required industry advisory board" — severity "Major"
6. **GovRep** views finding → institution responds with corrective action plan
7. Institution uploads evidence: signed advisory board charter, meeting schedule
8. **GovRep** reviews evidence → satisfied → marks finding as "Closed"
9. All findings closed → audit completes → score = 92/100
10. Audit report generated → **GovRep** downloads and files

### Journey 6: Filing Return and Resubmission

1. **GovRep** submits "Enrollment Filing Q3 2026" → status "Under Review"
2. Institution reviewer finds error: "International student count does not match visa records"
3. Filing status → "Returned" with comment: "Please reconcile international enrollment with SEVIS records"
4. **GovRep** sees red banner on filing: "Returned for revision. Due: August 20"
5. Opens filing detail → reads comments section
6. Contacts institution to get corrected data
7. Updates form fields: international_student_count → corrected value
8. Uploads supporting document: "SEVIS Reconciliation Report.pdf"
9. Clicks "Resubmit" → confirmation dialog: "This will replace the previous submission"
10. Confirms → new version created (v2) → status "Under Review"
11. Institution approves → filing complete

## 8.1 Extended Business Rules

| Rule                            | Detail                                                                            |
| ------------------------------- | --------------------------------------------------------------------------------- |
| RB01 — Filing Version Limit     | Max 50 versions per filing; oldest auto-archived                                  |
| RB02 — Late Filing Grace        | 24-hour grace period after deadline; after that, auto-escalate to regulatory body |
| RB03 — Data Immutability        | Submitted filings cannot be edited; only new versions can be created              |
| RB04 — Report Generation Time   | Reports > 500 pages generated async; email notification when ready                |
| RB05 — Calendar Event Sync      | Events auto-created when filing period/audit/report is scheduled                  |
| RB06 — Integrity Check Schedule | Automated checks run weekly; critical checks run daily                            |
| RB07 — Document Expiry          | Documents with expiry date auto-flagged 30/14/7 days before                       |
| RB08 — Message Encryption       | All messages encrypted at rest (AES-256) and in transit (TLS 1.3)                 |
| RB09 — Audit Trail              | Every action (view, download, submit) logged with purpose field                   |
| RB10 — IP Restriction           | Only IPs in government allowlist can access; VPN required for remote              |

## 9.1 Extended Notifications

| Code  | Trigger                           | Channel                  |
| ----- | --------------------------------- | ------------------------ |
| N-G11 | Integrity check failed            | Email + In-app           |
| N-G12 | Data discrepancy found            | Email + In-app           |
| N-G13 | Calendar event approaching        | Email (weekly digest)    |
| N-G14 | Filing returned for revision      | In-app + Email           |
| N-G15 | Report generated                  | Email with download link |
| N-G16 | Audit finding closed              | In-app                   |
| N-G17 | New compliance period starts      | In-app banner            |
| N-G18 | Document about to expire          | Email (30/14/7 days)     |
| N-G19 | Message received from institution | In-app real-time + Email |
| N-G20 | Data integrity auto-check failed  | In-app + Email           |

## 11.1 State Management — Extended

```typescript
const complianceApi = createApi({
  reducerPath: "complianceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/compliance" }),
  tagTypes: [
    "Dashboard",
    "InstitutionData",
    "Reports",
    "Report",
    "Filings",
    "Filing",
    "Audits",
    "Audit",
    "Findings",
    "Documents",
    "Messages",
    "Calendar",
    "Integrity",
  ],
  endpoints: (builder) => ({
    getDashboard: builder.query<ComplianceDashboard, void>({
      query: () => "/dashboard/summary",
      providesTags: ["Dashboard"],
    }),
    getInstitutionData: builder.query<InstitutionData, string>({
      query: (category) => `/institution/${category}`,
      providesTags: ["InstitutionData"],
    }),
    getReports: builder.query<ReportList, ReportQuery>({
      query: (params) => ({ url: "/reports", params }),
      providesTags: ["Reports"],
    }),
    generateReport: builder.mutation<{ id: string }, GenerateReportRequest>({
      query: (body) => ({ url: "/reports/generate", method: "POST", body }),
      invalidatesTags: ["Reports"],
    }),
    submitReport: builder.mutation<void, string>({
      query: (id) => ({ url: `/reports/${id}/submit`, method: "POST" }),
      invalidatesTags: (result, error, id) => [{ type: "Report", id }, "Reports"],
    }),
    getFilings: builder.query<FilingList, FilingQuery>({
      query: (params) => ({ url: "/filings", params }),
      providesTags: ["Filings"],
    }),
    getFiling: builder.query<FilingDetail, string>({
      query: (id) => `/filings/${id}`,
      providesTags: (result, error, id) => [{ type: "Filing", id }],
    }),
    updateFiling: builder.mutation<void, { id: string; data: Record<string, unknown> }>({
      query: ({ id, data }) => ({ url: `/filings/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (result, error, { id }) => [{ type: "Filing", id }, "Filings"],
    }),
    submitFiling: builder.mutation<void, string>({
      query: (id) => ({ url: `/filings/${id}/submit`, method: "POST" }),
      invalidatesTags: (result, error, id) => [{ type: "Filing", id }, "Filings", "Calendar"],
    }),
    getAudits: builder.query<AuditList, void>({
      query: () => "/audit/schedule",
      providesTags: ["Audits"],
    }),
    getAudit: builder.query<AuditDetail, string>({
      query: (id) => `/audit/${id}`,
      providesTags: (result, error, id) => [{ type: "Audit", id }],
    }),
    updateFinding: builder.mutation<void, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/audit/findings/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Findings"],
    }),
    getDocuments: builder.query<DocumentList, DocumentQuery>({
      query: (params) => ({ url: "/documents", params }),
      providesTags: ["Documents"],
    }),
    uploadDocument: builder.mutation<{ id: string }, FormData>({
      query: (body) => ({ url: "/documents", method: "POST", body }),
      invalidatesTags: ["Documents"],
    }),
    getMessages: builder.query<MessageList, void>({
      query: () => "/messages",
      providesTags: ["Messages"],
    }),
    sendMessage: builder.mutation<{ id: string }, SendMessageRequest>({
      query: (body) => ({ url: "/messages/send", method: "POST", body }),
      invalidatesTags: ["Messages"],
    }),
    getCalendar: builder.query<CalendarEvent[], { year: number; month: number }>({
      query: (params) => ({ url: "/calendar", params }),
      providesTags: ["Calendar"],
    }),
    getIntegritySummary: builder.query<IntegritySummary, void>({
      query: () => "/integrity/summary",
      providesTags: ["Integrity"],
    }),
    runIntegrityCheck: builder.mutation<void, string>({
      query: (id) => ({ url: `/integrity/checks/${id}/run`, method: "POST" }),
      invalidatesTags: ["Integrity"],
    }),
  }),
});
```

## 12.1 Form Schemas (Zod) — Extended

```typescript
export const filingUpdateSchema = z.object({
  // Dynamic fields based on filing type — using record as base
  formData: z.record(z.unknown()),
  notes: z.string().max(2000).optional(),
});

export const documentUploadSchema = z
  .object({
    title: z.string().min(1, "Title required").max(200),
    category: z.enum([
      "policies",
      "accreditation",
      "financial",
      "legal",
      "meeting_minutes",
      "certificates",
      "licenses",
      "archived",
      "other",
    ]),
    description: z.string().max(1000).optional(),
    effectiveDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    expiryDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    tags: z.array(z.string().max(50)).max(20).optional(),
  })
  .refine(
    (d) => !d.expiryDate || !d.effectiveDate || new Date(d.expiryDate) > new Date(d.effectiveDate),
    {
      message: "Expiry date must be after effective date",
      path: ["expiryDate"],
    },
  );

export const sendMessageSchema = z.object({
  recipientId: z.string().uuid("Select a recipient"),
  subject: z.string().min(1, "Subject required").max(200),
  body: z.string().min(1, "Message body required").max(10000),
  priority: z.enum(["normal", "high"]).default("normal"),
  attachments: z.array(z.string().uuid()).max(5).optional(),
});

export const integrityAcknowledgeSchema = z.object({
  checkId: z.string().uuid(),
  notes: z.string().max(500).optional(),
});
```

## 13.1 Analytics Events — Extended

| Event                              | Properties                  | Trigger                         |
| ---------------------------------- | --------------------------- | ------------------------------- |
| `compliance_report_generated`      | reportId, type, period      | Report generation complete      |
| `compliance_report_submitted`      | reportId, type, period      | Report submitted to institution |
| `compliance_filing_created`        | filingId, type              | New filing started              |
| `compliance_filing_submitted`      | filingId, type, version     | Filing submitted                |
| `compliance_filing_returned`       | filingId, reason            | Filing returned for revision    |
| `compliance_filing_approved`       | filingId                    | Filing approved                 |
| `compliance_audit_viewed`          | auditId                     | Audit detail opened             |
| `compliance_finding_updated`       | findingId, status, severity | Finding status changed          |
| `compliance_document_uploaded`     | documentId, category        | Document uploaded               |
| `compliance_document_viewed`       | documentId                  | Document opened/viewed          |
| `compliance_message_sent`          | threadId, priority          | Secure message sent             |
| `compliance_data_exported`         | category, format            | Institution data exported       |
| `compliance_integrity_check_run`   | checkId, result             | Integrity check executed        |
| `compliance_calendar_event_viewed` | eventId, type               | Calendar event popover opened   |
| `compliance_search_performed`      | query, resultCount, section | Search across compliance        |

## 14.1 Accessibility — Extended

- **Compliance Score Gauge:** `role="img"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, and text label for score value.
- **Calendar Events:** Each event marker is a focusable button with `aria-label="[event type]: [title], [date]"`.
- **Report Viewer:** PDF viewer with keyboard shortcuts (PgUp/PgDn for page navigation, Ctrl+F for search). Fallback text content provided for screen readers.
- **Filing Forms:** Grouped fieldsets with `<legend>`; error summary at top linked to fields via `aria-describedby`.
- **Audit Findings Table:** Expandable rows with `aria-expanded`; severity badges have `aria-label="Severity: [level]"`.
- **Document Library:** File upload zone supports keyboard activation; progress bar has `aria-valuenow` attributes.
- **Integrity Checks:** Pass/fail status has `aria-label` in addition to color indicator; discrepancies list uses `role="list"`.
- All compliance pages have skip-to-content links; high-contrast mode support; text resizing up to 200% without loss of functionality.
- Session timeout warning accessible via `role="alertdialog"` with focus trap.

## 15.1 Error & Edge Case Catalog — Extended

| #   | Error                                                   | Message                                                                                                 | Recovery                              |
| --- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| E11 | Filing submission during maintenance window             | "System is under maintenance. Filing cannot be submitted. [View Schedule]"                              | Wait for maintenance window to end    |
| E12 | Report data contains PII without consent                | "Report contains personal data without consent flag. [Review] [Exclude]"                                | Exclude PII or add consent            |
| E13 | Institution data not refreshed (stale > 7 days)         | "Institution data last refreshed [date]. Consider requesting update."                                   | Request data refresh from institution |
| E14 | Calendar event overlaps with existing event             | "Event overlaps with [existing event]. [Reschedule] [Create Anyway]"                                    | Choose different date                 |
| E15 | File type not accepted for document upload              | "File type [type] not accepted. Accepted: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG."                         | Convert and retry                     |
| E16 | Message contains suspicious content (flagged by filter) | "Message content flagged for security review. Will be delivered after clearance."                       | Message delayed until reviewed        |
| E17 | Integrity check requires institution data access        | "Integrity check cannot run: institution data not available for this period."                           | Ensure data is submitted first        |
| E18 | Concurrent filing edit by another user                  | "Filing is being edited by [user]. Changes may conflict."                                               | Coordinate with other user            |
| E19 | Attachment virus detected                               | "Attachment [name] failed security scan. Please upload a clean file."                                   | Scan file locally and retry           |
| E20 | Session expires during long report review               | "Your session has expired due to inactivity. Saved progress is preserved."                              | Log in again, resume from draft       |
| E21 | Filing reference number generation fails                | "Unable to generate filing number. [Retry]"                                                             | Rare error; manual override available |
| E22 | Report generation includes zero rows of data            | "Report generated with no data for selected period. [Check Filters] [Submit Anyway]"                    | Verify period/filters are correct     |
| E23 | Government representative email changed                 | "Your profile email has been updated. Verification required."                                           | Verify new email via OTP              |
| E24 | Cross-reference integrity check fails on all records    | "Critical: Data source mismatch — all records failed cross-reference. Contact institution immediately." | Urgent institution notification       |

### 3.10 Additional Screen: Compliance Training & Certifications (`/compliance/training`)

**Wireframe:** Training module tracking for government-required compliance training completions.

**Training Programs List:**

- Table: Training Name, Provider, Frequency (Annual/Biannual/One-time), Due Date, Status (Completed/Pending/Overdue), Completed Date, Certificate, Actions
- "📥 Upload Certificate" button

**Training Detail:**

- Name, Description, Provider, Duration, Mode (Online/In-Person)
- Assigned personnel (from institution)
- Completion tracking per person: Name, Completed Date, Score (if applicable), Certificate link
- Overall completion rate: X of Y (%)

**Certificate Upload:**

- Drag & drop certificate file (PDF only, max 25MB)
- Effective date, Expiry date (if applicable)
- "Upload Certificate" button

**Data Bindings:**

- `GET /api/compliance/training`
- `POST /api/compliance/training/upload`

### 3.11 Additional Screen: Regulatory Change Log (`/compliance/changelog`)

**Wireframe:** Log of regulatory changes and their impact on required filings.

**Change Log Table:**

- Columns: Date, Regulation Name, Change Type (New/Amended/Repealed), Description, Impact Level (High/Medium/Low), Affected Filings, Effective Date, Status (Acknowledged/Reviewed/Actioned)
- Sortable by date, impact level
- "➕ Log Change" button (manual entry for regulator)

**Add Change Entry:**

- Date of change, Regulation name/number, Change type, Description of change
- Impact assessment, Effective date
- Link to affected filings
- "Save Entry" button

**Data Bindings:**

- `GET /api/compliance/changelog`
- `POST /api/compliance/changelog`
- `PATCH /api/compliance/changelog/{id}`

## 4.2 Extended Schema: Training & Changelog

```typescript
export const complianceTraining = sqliteTable("compliance_training", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description"),
  provider: text("provider"),
  frequency: text("frequency", { enum: ["annual", "biannual", "one_time"] }).notNull(),
  dueDate: text("due_date"),
  status: text("status", { enum: ["completed", "pending", "overdue"] })
    .notNull()
    .default("pending"),
  completedDate: text("completed_date"),
  certificateKey: text("certificate_key"),
  notes: text("notes"),
  createdById: text("created_by_id"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

export const trainingAssignments = sqliteTable("compliance_training_assignments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  trainingId: text("training_id")
    .notNull()
    .references(() => complianceTraining.id, { onDelete: "cascade" }),
  personName: text("person_name").notNull(),
  personEmail: text("person_email"),
  completedDate: text("completed_date"),
  score: integer("score"),
  certificateKey: text("certificate_key"),
  status: text("status", { enum: ["assigned", "in_progress", "completed"] })
    .notNull()
    .default("assigned"),
});

export const regulatoryChangelog = sqliteTable("compliance_regulatory_changelog", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  changeDate: text("change_date").notNull(),
  regulationName: text("regulation_name").notNull(),
  changeType: text("change_type", { enum: ["new", "amended", "repealed"] }).notNull(),
  description: text("description").notNull(),
  impactLevel: text("impact_level", { enum: ["high", "medium", "low"] }).notNull(),
  effectiveDate: text("effective_date"),
  affectedFilingIds: text("affected_filing_ids", { mode: "json" }).$type<string[]>().default([]),
  status: text("status", { enum: ["acknowledged", "reviewed", "actioned"] })
    .notNull()
    .default("acknowledged"),
  createdById: text("created_by_id"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});
```

## 5.2 Extended API: Training & Changelog

#### `GET /api/compliance/training` — List training records

#### `POST /api/compliance/training/upload` — Upload certificate (multipart)

#### `GET /api/compliance/changelog` — List regulatory changes

#### `POST /api/compliance/changelog` — Add change entry

#### `PATCH /api/compliance/changelog/{id}` — Update entry status

## 6.2 Extended Component Tree

```
├── <ComplianceTraining>
│   ├── <TrainingTable />
│   ├── <TrainingDetail />
│   └── <CertificateUploadModal />
│
└── <RegulatoryChangelog>
    ├── <ChangelogTable />
    └── <AddChangeEntryForm />
```

## 7.2 Extended User Journeys

### Journey 7: Regulatory Change Impact Assessment

1. **GovRep** opens `/compliance/changelog` → clicks "➕ Log Change"
2. Enters: "New Data Privacy Regulation (DPR-2026)" — Change type "New" — Impact "High"
3. Effective date: January 1, 2027
4. Links affected filings: "Annual Data Protection Filing", "IT Security Compliance Report"
5. Saves entry → affected filings flagged with "Action Required"
6. **GovRep** reviews impact → updates filing templates to include new DPR requirements
7. Notifies institution via messaging about upcoming changes
8. Marks changelog entry as "Actioned"

### Journey 8: Training Certificate Submission

1. **GovRep** completes "Regulatory Compliance Update 2026" training (external)
2. Logs into CEA-OS → `/compliance/training`
3. Finds training → clicks "📥 Upload Certificate"
4. Selects PDF certificate file, enters completion date, expiry date
5. Uploads → certificate stored in R2, status updated to "Completed"
6. Training record shows certificate link for audit purposes

## 8.2 Extended Business Rules

| Rule                                  | Detail                                                              |
| ------------------------------------- | ------------------------------------------------------------------- |
| RB11 — Training Frequency             | Annual training must be renewed within 14 months of last completion |
| RB12 — Changelog Impact               | High-impact changes auto-flag affected filings for revision         |
| RB13 — Certificate Validity           | Uploaded certificates auto-verified for expiration within 30 days   |
| RB14 — Regulatory Change Notification | All active GovReps notified when high-impact change logged          |
| RB15 — Filing Template Versioning     | Templates auto-versioned when linked regulation changes             |

## 9.2 Extended Notifications

| Code  | Trigger                              | Channel              |
| ----- | ------------------------------------ | -------------------- |
| N-G21 | Training due in 30 days              | Email                |
| N-G22 | Training overdue                     | Email + In-app       |
| N-G23 | Certificate expiring (30 days)       | Email                |
| N-G24 | High-impact regulatory change logged | Email + In-app alert |
| N-G25 | Filing affected by regulatory change | In-app + Email       |

---

_End of Actor Plan — Government Representative_
