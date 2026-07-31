# Actor: NGO (Non-Governmental Organization Partner)

## 1. Identity & Role Definition

**Actor ID:** `ngo_partner`  
**Display Name:** NGO Partner  
**Description:** External non-profit partner organization that collaborates with Cyber Elias Academy on scholarship programs, community outreach, volunteer coordination, and shared initiatives. Manages partnership data, scholarship awards, volunteer activities, impact reporting, and donation tracking.  
**System Role:** `ngo_partner`  
**Hierarchy:** External — partners with Community Engagement department  
**Session Timeout:** 30 minutes of inactivity  
**Concurrent Sessions:** 3 max  
**Onboarding:** Requires partnership agreement signed; organization verified

## 2. Primary Goals & Success KPIs

| Goal                                    | KPI                                         | Target               |
| --------------------------------------- | ------------------------------------------- | -------------------- |
| Manage scholarship programs effectively | Scholarship utilization rate                | > 85%                |
| Coordinate volunteers successfully      | Volunteer hours logged per quarter          | Target per agreement |
| Track community program impact          | Program completion rate                     | > 80%                |
| Maintain accurate donation records      | Donation reconciliation accuracy            | 100%                 |
| Report on partnership outcomes          | Quarterly report submission rate            | 100% on time         |
| Engage with academy effectively         | Response time to partnership communications | < 24 hours           |
| Expand community reach                  | Number of beneficiaries served              | +15% year-over-year  |
| Ensure fund utilization compliance      | Funds used for intended purpose             | 100%                 |

## 3. Complete Screen Inventory

### 3.1 Partnership Hub (`/ngo`)

**Wireframe:** Central dashboard for NGO partner showing partnership status, active programs, upcoming events, and key metrics.

**Top Section — Partnership Header:**

- Organization logo, name, partnership type (Strategic / Programmatic / Community)
- Partnership status: Active / Inactive / Pending Renewal
- Partnership start date, current period end date
- Account manager (institution contact): name, email, phone

**KPI Cards Row:**

- Active Scholarship Recipients (count)
- Volunteers Currently Active (count)
- Programs Running (count)
- Total Donations This Year (amount)
- Beneficiaries Served This Year (count)
- Funds Utilized vs Allocated (percentage + progress bar)

**Active Programs Widget:**

- Cards for currently running programs
- Each: Program name, Status (Active/Completed/Paused), Start/End dates, Progress bar, Participant count

**Upcoming Events Widget:**

- Next 5 events: Name, Date, Type (Volunteer Day / Workshop / Meeting / Fundraiser), Location, RSVP status

**Recent Activity Feed:**

- Last 10 actions: scholarship awarded, volunteer signed up, report submitted, donation recorded

**Quick Actions:**

- "🎓 Manage Scholarships" → `/ngo/scholarships`
- "🤝 Volunteer Coordination" → `/ngo/volunteers`
- "📊 Impact Reports" → `/ngo/reports`
- "💰 Record Donation" → donation modal
- "✉️ Message Academy" → `/ngo/messaging`

**Data Bindings:**

- `GET /api/ngo/dashboard/summary`
- `GET /api/ngo/dashboard/programs`
- `GET /api/ngo/dashboard/events`
- `GET /api/ngo/dashboard/activity`

**States:**

| State                       | Behavior                                                                                |
| --------------------------- | --------------------------------------------------------------------------------------- |
| Loading                     | Skeleton header, KPI card shimmers, widget skeletons                                    |
| Empty                       | "Welcome to your Partnership Hub! Your dashboard will populate as programs are set up." |
| Partnership pending renewal | Yellow banner: "Your partnership agreement expires in [X] days. [Contact Academy]"      |
| Inactive partnership        | Red banner: "Partnership is inactive. Contact your account manager."                    |

### 3.2 Scholarship Management (`/ngo/scholarships`)

**Wireframe:** Full scholarship lifecycle management — programs, applications, awards, and reporting.

**Scholarship Programs Tab:**

- Table: Program Name, Total Fund Amount, Amount Awarded, Remaining, Recipients Count, Status (Active/Closed/Pending), Period
- "➕ New Scholarship Program" button (subject to partner agreement)
- Click row → scholarship program detail

**Scholarship Program Detail:**

- **Header:** Program name, total fund, awarded, remaining, status
- **Criteria Section:** Eligibility requirements (JSON: min GPA, field of study, year, financial need, demographics)
- **Application Period:** Open date, Close date, Review date, Award date
- **Application Management:**
  - Table: Applicant Name, Email, Program, GPA, Essay Score, Recommendation Score, Total Score, Status (Pending/Approved/Rejected/Awarded), Actions
  - Actions: View Application, Approve, Reject, Award
  - Filters: Status, Score range, Program
- **Awarded Recipients:** Table: Name, Email, Amount, Award Date, Disbursement Status (Pending/Disbursed/Confirmed), Thank You Received

**Scholarship Application Review Modal:**

- Applicant info (read-only), academic info, essay, recommendation letters
- Scoring form: GPA (0-30), Essay (0-40), Recommendation (0-20), Extracurricular (0-10) → Total 0-100
- Approve / Reject with notes

**Award Scholarship Modal:**

- Select recipient, amount (must be ≤ remaining fund), award date, disbursement method (Direct to Institution / Direct to Student)
- Notes
- "Award Scholarship" button

**Scholarship Reporting:**

- Utilization report: Amount allocated vs awarded vs disbursed
- Demographic breakdown of recipients
- Academic performance of recipients (if data shared)
- Export: CSV, PDF

**Data Bindings:**

- Programs: `GET /api/ngo/scholarships/programs`
- Program detail: `GET /api/ngo/scholarships/programs/{id}`
- Applications: `GET /api/ngo/scholarships/programs/{id}/applications`
- Review application: `POST /api/ngo/scholarships/applications/{id}/review`
- Award: `POST /api/ngo/scholarships/programs/{id}/award`
- Create program: `POST /api/ngo/scholarships/programs`
- Reports: `GET /api/ngo/scholarships/reports`

**States:**

| State                       | Behavior                                                                     |
| --------------------------- | ---------------------------------------------------------------------------- |
| Loading                     | Table skeletons + detail shimmers                                            |
| Empty (no programs)         | "No scholarship programs yet. Create one to start awarding."                 |
| Empty (applications)        | "No applications received for this program yet."                             |
| Fund exhausted              | "This scholarship program has fully utilized its funds." (progress bar 100%) |
| Application deadline passed | "Application period closed on [date]." (read-only)                           |

### 3.3 Community Programs (`/ngo/programs`)

**Wireframe:** Management interface for community outreach programs run jointly between NGO and Academy.

**Program List:**

- Table/Cards: Program Name, Type (Workshop / Mentorship / Outreach / Awareness / Training), Status, Start Date, End Date, Participants Count, Budget, Beneficiaries, Progress
- "➕ New Program" button

**Program Create/Edit Form (Modal/Page):**

- Name (required), Description, Type (dropdown)
- Start/End dates, Location (or Virtual), Target audience
- Participant capacity, Current participants
- Budget allocated, Budget spent
- Goals & Objectives (rich text)
- Key activities (list)
- Expected outcomes
- Program leads (from NGO + Academy)

**Program Detail Page:**

- **Header:** Name, type badges, status, progress bar
- **Overview:** Description, Goals, Activities, Timeline
- **Participants:** Table of enrolled participants (name, contact, status), "Add Participant" button
- **Budget Tracking:** Allocated, Spent, Remaining (with transaction log)
- **Sessions/Events:** Linked events within this program (calendar view or list)
- **Outcomes:** Pre/post assessments, surveys, success stories
- **Documents:** Program-related documents (curriculum, materials, reports)

**Data Bindings:**

- Programs: `GET /api/ngo/programs?status={status}`
- Create: `POST /api/ngo/programs`
- Detail: `GET /api/ngo/programs/{id}`
- Update: `PATCH /api/ngo/programs/{id}`
- Participants: `GET /api/ngo/programs/{id}/participants`

**States:**

| State             | Behavior                                                |
| ----------------- | ------------------------------------------------------- |
| Loading           | Program card skeletons                                  |
| Empty             | "No community programs yet. Launch your first program." |
| Program completed | "Completed on [date]. [View Final Report]"              |
| Budget exceeded   | Warning: "Program has exceeded its budget by $X."       |

### 3.4 Volunteer Coordination (`/ngo/volunteers`)

**Wireframe:** Volunteer management — recruitment, scheduling, tracking, and reporting.

**Volunteer Overview:**

- Total active volunteers, Hours logged this month, Volunteers needed (open positions), Upcoming volunteer events

**Volunteer Directory:**

- Table: Name, Email, Phone, Skills/Interests, Status (Active/Inactive/Pending), Total Hours, Last Activity, Programs assigned
- Filter: Status, Skill, Program, Availability
- Search: name, email
- "➕ Add Volunteer" button

**Volunteer Detail Side Panel:**

- **Profile:** Name, Email, Phone, Address, Emergency Contact, Skills, Interests, Availability (days/times), Languages
- **Activity:** Hours log (table: date, program, hours, description), total hours this month/year/all
- **Events:** Upcoming and past volunteer events registered
- **Documents:** Signed waiver, background check, training certificates
- **Notes:** Internal notes
- **Actions:** Deactivate, Send Email, Assign to Program

**Volunteer Signup Flow (if NGO adds manually):**

- Fill profile form, skills assessment, availability calendar
- Signed waiver upload
- Background check status tracking

**Volunteer Hours Logging:**

- Quick log modal: Volunteer select, Program, Date, Hours (decimal, max 16), Description
- Bulk hours import via CSV

**Volunteer Events (Shift Scheduling):**

- Calendar view showing events needing volunteers
- Event detail: Name, Date/time, Location, Roles needed, Volunteers signed up
- Assign volunteers to shifts

**Data Bindings:**

- Overview: `GET /api/ngo/volunteers/overview`
- Directory: `GET /api/ngo/volunteers?status={status}&skill={skill}`
- Detail: `GET /api/ngo/volunteers/{id}`
- Create: `POST /api/ngo/volunteers`
- Log hours: `POST /api/ngo/volunteers/hours`
- Events: `GET /api/ngo/volunteers/events`

**States:**

| State                    | Behavior                                                          |
| ------------------------ | ----------------------------------------------------------------- |
| Loading                  | Stats skeletons + table shimmer                                   |
| Empty                    | "No volunteers registered. Add volunteers to get started."        |
| Volunteer inactive       | Gray badge, "Last active: [date]"                                 |
| Background check expired | Warning: "Background check expired for [name]. [Request Renewal]" |

### 3.5 Impact Reports (`/ngo/reports`)

**Wireframe:** Impact assessment and reporting interface for partnership outcomes.

**Dashboard:**

- Key impact metrics: Beneficiaries reached, Scholarships awarded, Volunteer hours, Programs completed, Funds deployed
- Comparison: Current period vs previous period
- Target progress bars

**Pre-built Reports:**

- Quarterly Impact Report (Q1/Q2/Q3/Q4)
- Annual Partnership Report
- Scholarship Impact Report
- Volunteer Program Report
- Community Reach Report
- Financial Utilization Report
- Custom Report Builder

**Report Builder:**

- Select sections to include (scholarships, volunteers, programs, financial, stories)
- Date range / period selector
- Add narrative (rich text sections)
- Upload photos / testimonials
- Preview report
- "Generate Report" → PDF download
- "Submit to Academy" → sends to institution for review

**Success Stories Section:**

- Story cards: Title, Beneficiary name (with consent), Summary, Photo, Date
- "➕ Add Success Story" → form: Title, Story (rich text), Photo upload, Beneficiary consent checkbox
- Table: All stories with publish status

**Data Bindings:**

- Metrics: `GET /api/ngo/reports/impact-metrics`
- Generate: `POST /api/ngo/reports/generate`
- Success stories: `GET /api/ngo/reports/success-stories`
- Create story: `POST /api/ngo/reports/success-stories`
- Submit report: `POST /api/ngo/reports/{id}/submit`

**States:**

| State            | Behavior                                                        |
| ---------------- | --------------------------------------------------------------- |
| Loading          | Metric skeleton + report card shimmers                          |
| Empty            | "No reports yet. Generate your first impact report."            |
| Report generated | "Report ready for download. [Download PDF] [Submit to Academy]" |
| Report submitted | "Report submitted to Cyber Elias Academy on [date]."            |

### 3.6 Donations Tracking (`/ngo/donations`)

**Wireframe:** Donation recording, tracking, and reconciliation for funds received and deployed.

**Donation Overview:**

- Total donations this year, Total donations all time, Number of donors, Average donation amount
- Funds deployed to programs: amount, percentage

**Donation Records Table:**

- Columns: Date, Donor Name (can be anonymous), Amount, Payment Method (Bank Transfer / Check / Cash / Online), Campaign/Fund, Program Allocation, Receipt Issued (yes/no), Notes, Actions
- Filter: Date range, Amount range, Campaign, Program, Receipt status
- Search: donor name, reference number
- "➕ Record Donation" button
- "📥 Import Donations" button (CSV)

**Record Donation Modal:**

- Donor Name (required), Donor Email, Donor Phone, Donor Address
- Amount (required, > 0), Currency (USD default)
- Payment Method (dropdown), Reference/Transaction ID
- Date Received (default today)
- Campaign/Fund (dropdown), Program Allocation (dropdown)
- Anonymous checkbox
- Issue Receipt checkbox
- Notes
- "Record Donation" button

**Receipt Generation:**

- Auto-generated receipt PDF on recording (if checked)
- Tax receipt format (with NGO's tax ID, charity number)
- Email receipt to donor button

**Reconciliation Tab:**

- Bank statement upload (CSV)
- Auto-matching: system attempts to match bank transactions to recorded donations
- Unmatched transactions table
- Reconciliation status: Balanced / Unbalanced (difference amount)

**Data Bindings:**

- Overview: `GET /api/ngo/donations/overview`
- Records: `GET /api/ngo/donations?startDate={iso}&endDate={iso}`
- Record: `POST /api/ngo/donations`
- Receipt: `POST /api/ngo/donations/{id}/receipt`
- Import: `POST /api/ngo/donations/import`
- Reconciliation: `POST /api/ngo/donations/reconcile`

**States:**

| State                      | Behavior                                             |
| -------------------------- | ---------------------------------------------------- |
| Loading                    | Stats skeleton + table shimmer                       |
| Empty                      | "No donations recorded. Record your first donation." |
| Receipt generated          | "Receipt generated and emailed to donor."            |
| Reconciliation in progress | "Reconciling {n} transactions..."                    |
| Unbalanced reconciliation  | Warning: "Difference of $X.XX found. [View Details]" |

### 3.7 Messaging (`/ngo/messaging`)

**Wireframe:** Secure communication with Cyber Elias Academy partnership team.

**Layout:** Similar to government representative messaging but scoped to partnership contacts.

**Contact List (Left):**

- Academy contacts: Account Manager, Community Engagement Director, Finance Liaison, Program Coordinators
- Each contact: Name, Title, Department, Email, Phone, Last contact date
- Online status indicator (if available)

**Conversation Panel (Center):**

- Threaded messaging with selected contact
- Message: sender, timestamp, body (rich text), attachments
- Reply box: Rich text editor, file attachment (max 25MB)
- "Send" button

**New Message:**

- To: Select from contact list
- Subject, Body, Priority (Normal/High), Attachments

**Templates:**

- Pre-defined message templates: Quarterly Report Submission, Volunteer Request, Scholarship Inquiry, Partnership Renewal, General Inquiry

**Data Bindings:**

- Contacts: `GET /api/ngo/messaging/contacts`
- Conversations: `GET /api/ngo/messaging/conversations`
- Send: `POST /api/ngo/messaging/send`

## 4. Full Database Schema

```typescript
// ============================================================
// schema/ngo/index.ts
// ============================================================
import { sqliteTable, text, integer, real, uniqueIndex, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ─────────────────────────────────────────────
// 1. NGO PARTNERS (organization record)
// ─────────────────────────────────────────────
export const ngoPartners = sqliteTable("ngo_partners", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  organizationName: text("organization_name").notNull(),
  registrationNumber: text("registration_number").notNull().unique(),
  taxId: text("tax_id"),
  partnershipType: text("partnership_type", {
    enum: ["strategic", "programmatic", "community"],
  }).notNull(),
  status: text("status", { enum: ["active", "inactive", "pending_renewal"] })
    .notNull()
    .default("active"),
  logoUrl: text("logo_url"),
  website: text("website"),
  address: text("address"),
  city: text("city"),
  country: text("country"),
  phone: text("phone"),
  email: text("email").notNull(),
  primaryContactName: text("primary_contact_name"),
  primaryContactEmail: text("primary_contact_email"),
  primaryContactPhone: text("primary_contact_phone"),
  partnershipStartDate: text("partnership_start_date").notNull(),
  partnershipEndDate: text("partnership_end_date"),
  accountManagerId: text("account_manager_id"), // institution staff
  agreementKey: text("agreement_key"), // R2 key for signed MOU
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

// ─────────────────────────────────────────────
// 2. SCHOLARSHIP PROGRAMS
// ─────────────────────────────────────────────
export const scholarshipPrograms = sqliteTable("ngo_scholarship_programs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  ngoPartnerId: text("ngo_partner_id")
    .notNull()
    .references(() => ngoPartners.id),
  name: text("name").notNull(),
  description: text("description"),
  totalFundAmount: real("total_fund_amount").notNull().default(0),
  amountAwarded: real("amount_awarded").default(0),
  currency: text("currency").default("USD"),
  status: text("status", { enum: ["active", "closed", "pending"] })
    .notNull()
    .default("pending"),
  criteria: text("criteria", { mode: "json" }).$type<ScholarshipCriteria>().default({}),
  applicationOpenDate: text("application_open_date"),
  applicationCloseDate: text("application_close_date"),
  reviewDate: text("review_date"),
  awardDate: text("award_date"),
  maxAwardAmount: real("max_award_amount"),
  minAwardAmount: real("min_award_amount"),
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
// 3. SCHOLARSHIP APPLICATIONS
// ─────────────────────────────────────────────
export const scholarshipApplications = sqliteTable("ngo_scholarship_applications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  programId: text("program_id")
    .notNull()
    .references(() => scholarshipPrograms.id),
  applicantName: text("applicant_name").notNull(),
  applicantEmail: text("applicant_email").notNull(),
  applicantPhone: text("applicant_phone"),
  programEnrolled: text("program_enrolled"), // academic program
  gpa: real("gpa"),
  essayUrl: text("essay_url"),
  recommendationUrls: text("recommendation_urls", { mode: "json" }).$type<string[]>().default([]),
  financialNeed: text("financial_need"),
  // Scoring
  gpaScore: integer("gpa_score"), // 0-30
  essayScore: integer("essay_score"), // 0-40
  recommendationScore: integer("recommendation_score"), // 0-20
  extracurricularScore: integer("extracurricular_score"), // 0-10
  totalScore: integer("total_score"), // 0-100
  status: text("status", { enum: ["pending", "approved", "rejected", "awarded"] })
    .notNull()
    .default("pending"),
  reviewedById: text("reviewed_by_id"),
  reviewedAt: text("reviewed_at"),
  awardAmount: real("award_amount"),
  awardDate: text("award_date"),
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 4. COMMUNITY PROGRAMS
// ─────────────────────────────────────────────
export const communityPrograms = sqliteTable("ngo_community_programs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  ngoPartnerId: text("ngo_partner_id")
    .notNull()
    .references(() => ngoPartners.id),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type", {
    enum: ["workshop", "mentorship", "outreach", "awareness", "training", "other"],
  }).notNull(),
  status: text("status", { enum: ["planning", "active", "completed", "cancelled"] })
    .notNull()
    .default("planning"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  location: text("location"),
  isVirtual: integer("is_virtual", { mode: "boolean" }).default(false),
  participantCapacity: integer("participant_capacity"),
  participantCount: integer("participant_count").default(0),
  beneficiaryCount: integer("beneficiary_count").default(0),
  budgetAllocated: real("budget_allocated").default(0),
  budgetSpent: real("budget_spent").default(0),
  goals: text("goals"), // rich text
  keyActivities: text("key_activities"), // JSON array or text
  expectedOutcomes: text("expected_outcomes"),
  programLeadNgo: text("program_lead_ngo"),
  programLeadAcademy: text("program_lead_academy"),
  outcomes: text("outcomes"),
  finalReportKey: text("final_report_key"), // R2 key
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
// 5. VOLUNTEERS
// ─────────────────────────────────────────────
export const volunteers = sqliteTable("ngo_volunteers", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  ngoPartnerId: text("ngo_partner_id")
    .notNull()
    .references(() => ngoPartners.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address"),
  emergencyContactName: text("emergency_contact_name"),
  emergencyContactPhone: text("emergency_contact_phone"),
  skills: text("skills", { mode: "json" }).$type<string[]>().default([]),
  interests: text("interests", { mode: "json" }).$type<string[]>().default([]),
  availability: text("availability", { mode: "json" }).$type<Availability>().default({}),
  languages: text("languages", { mode: "json" }).$type<string[]>().default([]),
  status: text("status", { enum: ["active", "inactive", "pending"] })
    .notNull()
    .default("pending"),
  totalHours: real("total_hours").default(0),
  waiverSigned: integer("waiver_signed", { mode: "boolean" }).default(false),
  waiverKey: text("waiver_key"), // R2 key
  backgroundCheckStatus: text("background_check_status", {
    enum: ["not_required", "pending", "cleared", "failed", "expired"],
  }).default("not_required"),
  backgroundCheckDate: text("background_check_date"),
  backgroundCheckKey: text("background_check_key"),
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

// ─────────────────────────────────────────────
// 6. VOLUNTEER HOURS LOG
// ─────────────────────────────────────────────
export const volunteerHours = sqliteTable("ngo_volunteer_hours", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  volunteerId: text("volunteer_id")
    .notNull()
    .references(() => volunteers.id, { onDelete: "cascade" }),
  programId: text("program_id").references(() => communityPrograms.id),
  date: text("date").notNull(),
  hours: real("hours").notNull(), // decimal, max 16
  description: text("description"),
  verifiedById: text("verified_by_id"),
  verifiedAt: text("verified_at"),
  loggedById: text("logged_by_id"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 7. DONATIONS
// ─────────────────────────────────────────────
export const donations = sqliteTable("ngo_donations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  ngoPartnerId: text("ngo_partner_id")
    .notNull()
    .references(() => ngoPartners.id),
  donorName: text("donor_name").notNull(),
  donorEmail: text("donor_email"),
  donorPhone: text("donor_phone"),
  donorAddress: text("donor_address"),
  amount: real("amount").notNull(),
  currency: text("currency").default("USD"),
  paymentMethod: text("payment_method", {
    enum: ["bank_transfer", "check", "cash", "online", "other"],
  }).notNull(),
  referenceNumber: text("reference_number"),
  campaign: text("campaign"),
  programAllocation: text("program_allocation").references(() => communityPrograms.id),
  dateReceived: text("date_received")
    .notNull()
    .default(sql`(current_timestamp)`),
  isAnonymous: integer("is_anonymous", { mode: "boolean" }).default(false),
  receiptIssued: integer("receipt_issued", { mode: "boolean" }).default(false),
  receiptKey: text("receipt_key"), // R2 key
  notes: text("notes"),
  reconciled: integer("reconciled", { mode: "boolean" }).default(false),
  reconciledAt: text("reconciled_at"),
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
// 8. SUCCESS STORIES
// ─────────────────────────────────────────────
export const successStories = sqliteTable("ngo_success_stories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  ngoPartnerId: text("ngo_partner_id")
    .notNull()
    .references(() => ngoPartners.id),
  programId: text("program_id").references(() => communityPrograms.id),
  title: text("title").notNull(),
  story: text("story").notNull(), // rich text
  photoUrl: text("photo_url"),
  beneficiaryName: text("beneficiary_name"),
  beneficiaryConsentGiven: integer("beneficiary_consent_given", { mode: "boolean" }).default(false),
  consentFormKey: text("consent_form_key"),
  status: text("status", { enum: ["draft", "published", "archived"] })
    .notNull()
    .default("draft"),
  publishedAt: text("published_at"),
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
// 9. IMPACT METRICS (aggregated, computed periodically)
// ─────────────────────────────────────────────
export const impactMetrics = sqliteTable(
  "ngo_impact_metrics",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    ngoPartnerId: text("ngo_partner_id")
      .notNull()
      .references(() => ngoPartners.id),
    period: text("period").notNull(), // "2026-Q1", "2026-Q2", etc.
    totalBeneficiaries: integer("total_beneficiaries").default(0),
    scholarshipsAwarded: integer("scholarships_awarded").default(0),
    scholarshipAmountTotal: real("scholarship_amount_total").default(0),
    volunteerCount: integer("volunteer_count").default(0),
    volunteerHoursTotal: real("volunteer_hours_total").default(0),
    programsCompleted: integer("programs_completed").default(0),
    totalDonations: real("total_donations").default(0),
    fundsDeployed: real("funds_deployed").default(0),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (table) => ({
    partnerPeriodIdx: uniqueIndex("idx_ngo_impact_partner_period").on(
      table.ngoPartnerId,
      table.period,
    ),
  }),
);

// ─────────────────────────────────────────────
// Indexes
// ─────────────────────────────────────────────
export const ngoEmailIdx = uniqueIndex("idx_ngo_email").on(ngoPartners.email);
export const ngoRegNumberIdx = uniqueIndex("idx_ngo_registration").on(
  ngoPartners.registrationNumber,
);
export const scholarshipProgramNgoIdx = index("idx_ngo_scholarship_ngo").on(
  scholarshipPrograms.ngoPartnerId,
);
export const scholarshipAppProgramIdx = index("idx_ngo_scholarship_app_program").on(
  scholarshipApplications.programId,
);
export const scholarshipAppStatusIdx = index("idx_ngo_scholarship_app_status").on(
  scholarshipApplications.status,
);
export const programNgoIdx = index("idx_ngo_program_ngo").on(communityPrograms.ngoPartnerId);
export const programStatusIdx = index("idx_ngo_program_status").on(communityPrograms.status);
export const volunteerNgoIdx = index("idx_ngo_volunteer_ngo").on(volunteers.ngoPartnerId);
export const volunteerStatusIdx = index("idx_ngo_volunteer_status").on(volunteers.status);
export const volunteerEmailIdx = index("idx_ngo_volunteer_email").on(volunteers.email);
export const hoursVolunteerIdx = index("idx_ngo_hours_volunteer").on(volunteerHours.volunteerId);
export const hoursDateIdx = index("idx_ngo_hours_date").on(volunteerHours.date);
export const donationNgoIdx = index("idx_ngo_donation_ngo").on(donations.ngoPartnerId);
export const donationDateIdx = index("idx_ngo_donation_date").on(donations.dateReceived);
export const donationReceiptIdx = index("idx_ngo_donation_receipt").on(donations.receiptIssued);
export const storiesNgoIdx = index("idx_ngo_stories_ngo").on(successStories.ngoPartnerId);
export const storiesStatusIdx = index("idx_ngo_stories_status").on(successStories.status);

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface ScholarshipCriteria {
  minimumGpa?: number;
  fieldsOfStudy?: string[];
  academicYear?: string[];
  financialNeedRequired?: boolean;
  demographics?: string[];
  otherRequirements?: string[];
}

export interface Availability {
  weekdays?: string[]; // "monday", "tuesday", etc.
  timeOfDay?: string[]; // "morning", "afternoon", "evening"
  weekends?: boolean;
  remoteOnly?: boolean;
}
```

## 5. Complete API Contract (Key Endpoints)

#### `GET /api/ngo/dashboard/summary` — Partnership KPIs

#### `GET /api/ngo/scholarships/programs` — List scholarship programs

#### `POST /api/ngo/scholarships/programs` — Create program (if permitted)

#### `GET /api/ngo/scholarships/programs/{id}` — Program detail

#### `GET /api/ngo/scholarships/programs/{id}/applications` — Applications for program

#### `POST /api/ngo/scholarships/applications/{id}/review` — `{ status, scores, notes }`

#### `POST /api/ngo/scholarships/programs/{id}/award` — `{ applicationId, amount, notes }`

#### `GET /api/ngo/programs` — List community programs

#### `POST /api/ngo/programs` — Create program

#### `GET /api/ngo/programs/{id}` — Program detail

#### `PATCH /api/ngo/programs/{id}` — Update program

#### `GET /api/ngo/programs/{id}/participants` — Participant list

#### `GET /api/ngo/volunteers` — List volunteers

#### `POST /api/ngo/volunteers` — Add volunteer

#### `GET /api/ngo/volunteers/{id}` — Volunteer detail

#### `POST /api/ngo/volunteers/hours` — Log hours `{ volunteerId, programId, date, hours, description }`

#### `GET /api/ngo/donations` — List donations

#### `POST /api/ngo/donations` — Record donation

#### `POST /api/ngo/donations/{id}/receipt` — Generate/email receipt

#### `POST /api/ngo/donations/import` — Bulk import CSV

#### `GET /api/ngo/reports/impact-metrics` — Impact dashboard data

#### `POST /api/ngo/reports/generate` — `{ period, sections[], narrative }` → `{ downloadUrl }`

#### `POST /api/ngo/reports/{id}/submit` — Submit to academy

#### `GET /api/ngo/reports/success-stories` — List success stories

#### `POST /api/ngo/reports/success-stories` — Create story

#### `GET /api/ngo/messaging/conversations` — Message threads

#### `POST /api/ngo/messaging/send` — Send message

## 6. Component Tree

```
<NgoLayout>
  ├── <PartnershipHub>
  │   ├── <PartnershipHeader />
  │   ├── <KpiCardGrid />
  │   ├── <ActiveProgramsWidget />
  │   ├── <UpcomingEventsWidget />
  │   ├── <ActivityFeed />
  │   └── <QuickActions />
  │
  ├── <ScholarshipManagement>
  │   ├── <ScholarshipProgramList />
  │   ├── <ScholarshipProgramDetail>
  │   │   ├── <FundProgressBar />
  │   │   ├── <CriteriaSection />
  │   │   ├── <ApplicationTable />
  │   │   ├── <ApplicationReviewModal />
  │   │   └── <AwardModal />
  │   └── <ScholarshipReports />
  │
  ├── <CommunityPrograms>
  │   ├── <ProgramList />
  │   ├── <ProgramCreateForm />
  │   └── <ProgramDetail>
  │       ├── <ProgramOverview />
  │       ├── <ParticipantsList />
  │       ├── <BudgetTracker />
  │       ├── <SessionsCalendar />
  │       └── <OutcomesSection />
  │
  ├── <VolunteerCoordination>
  │   ├── <VolunteerOverview />
  │   ├── <VolunteerDirectory />
  │   ├── <VolunteerDetailPanel />
  │   ├── <HoursLogModal />
  │   └── <VolunteerEventsCalendar />
  │
  ├── <ImpactReports>
  │   ├── <ImpactDashboard />
  │   ├── <ReportCardGrid />
  │   ├── <ReportBuilder>
  │   │   ├── <SectionSelector />
  │   │   ├── <NarrativeEditor />
  │   │   ├── <PhotoUpload />
  │   │   └── <PreviewPanel />
  │   └── <SuccessStoriesList />
  │
  ├── <DonationsTracking>
  │   ├── <DonationOverview />
  │   ├── <DonationTable />
  │   ├── <RecordDonationModal />
  │   └── <ReconciliationTab />
  │
  └── <Messaging>
      ├── <ContactList />
      ├── <ConversationPanel />
      └── <ComposeMessage />
```

## 7-15. (Key Specifications)

**Business Rules:**

1. Scholarship awards cannot exceed remaining fund balance
2. Scholarship minimum award = $500, maximum = defined per program
3. Volunteer hours max 16 per day per volunteer; verified hours require supervisor sign-off
4. Donation receipts auto-generated with unique receipt number; tax receipt format per local regulations
5. Impact metrics computed monthly via cron job from actual data
6. Success stories require beneficiary consent (checkbox + optional consent form upload)
7. Programs cannot exceed budget by more than 10% without academy approval
8. Volunteer background checks valid for 2 years; auto-flag when expired
9. Partnership auto-renewal notification 90 days before expiry
10. Message attachments scanned for malware; encrypted in transit and at rest

**Notifications:**

- N-N01: New scholarship application received → in-app + email
- N-N02: Scholarship awarded → email to NGO + institution
- N-N03: Volunteer hours threshold reached (100/500/1000) → congratulatory in-app
- N-N04: Program nearing end date (30/14/7 days) → in-app reminder
- N-N05: Budget utilization alert (80%/90%/100%) → in-app + email
- N-N06: Donation recorded → in-app confirmation + receipt
- N-N07: Impact report due → email reminder (quarterly)
- N-N08: New message from academy → in-app (real-time) + email digest
- N-N09: Partnership renewal upcoming → email 90/60/30 days before
- N-N10: Background check expiring → in-app alert

**Permissions:**

| Entity                   | NGO Partner           | Institution Admin | System Admin |
| ------------------------ | --------------------- | ----------------- | ------------ |
| Partnership Profile      | View, Edit basic      | Full CRUD         | Full CRUD    |
| Scholarship Programs     | View, Create, Close   | Full CRUD         | Full CRUD    |
| Scholarship Applications | View, Review, Award   | View              | View         |
| Community Programs       | Full CRUD (own)       | Full CRUD         | Full CRUD    |
| Volunteers               | Full CRUD (own)       | View              | View         |
| Volunteer Hours          | Create, View          | View              | View         |
| Donations                | Full CRUD (own)       | View              | View         |
| Impact Reports           | Generate, Submit      | Review            | View         |
| Success Stories          | Full CRUD             | View, Publish     | View         |
| Messages                 | Academy contacts only | NGO contacts      | View (audit) |

**Error Catalog:**

- E01: Scholarship fund exhausted → "Cannot award. Remaining fund: $X. Award amount: $Y. [Increase Fund] [Reduce Amount]"
- E02: Volunteer email already exists → "A volunteer with this email is already registered. [View Profile]"
- E03: Donation amount exceeds program budget → "Donation exceeds remaining program budget by $X."
- E04: Duplicate receipt number → auto-incremented, collision probability < 10^-12
- E05: Impact report generation timeout (>5 min) → queued, email notification when ready
- E06: Volunteer hours for future date → "Cannot log hours for a future date."
- E07: Program end date before start date → validation error
- E08: Partnership expired → redirect to contact page, all write operations disabled
- E09: Success story photo too large (>10MB) → resize and retry
- E10: Message attachment exceeds 25MB → "Attachment too large. Max 25MB."

### 3.8 Additional Screen: Program Budget & Expenses (`/ngo/programs/{id}/budget`)

**Wireframe:** Detailed budget tracking for each community program with transaction logs and forecasting.

**Budget Overview Cards:**

- Total Budget, Total Spent, Remaining, % Used (progress bar)
- Budget vs Actual chart (bar chart: budgeted vs actual per category)

**Expense Transactions Table:**

- Columns: Date, Description, Category (Supplies/Personnel/Travel/Food/Venue/Marketing/Other), Amount, Payment Method, Receipt Uploaded (yes/no/icon), Recorded By, Actions
- Filter: Category, Date range, Amount range
- Search by description/vendor
- "➕ Add Expense" button
- "📥 Import Expenses" button (CSV)

**Add Expense Modal:**

- Date (default today), Description (required), Category (dropdown), Amount (required, > 0)
- Payment Method (Cash/Bank Transfer/Credit Card/Check)
- Vendor/ Payee name
- Receipt upload (drag & drop, PDF/PNG/JPG, max 10MB)
- Notes
- "Add Expense" button

**Budget Forecasting:**

- Projected total spend based on current burn rate
- Days remaining vs days funded
- Alert if projected to exceed budget

**Data Bindings:**

- `GET /api/ngo/programs/{id}/budget`
- `GET /api/ngo/programs/{id}/expenses`
- `POST /api/ngo/programs/{id}/expenses`
- `POST /api/ngo/programs/{id}/expenses/import`

### 3.9 Additional Screen: Partner Reports & Analytics (`/ngo/analytics`)

**Wireframe:** Advanced analytics dashboard for NGO partner with custom report builder.

**Pre-built Dashboards:**

- **Scholarship Analytics:** Awards by program, demographic breakdown, utilization trends
- **Volunteer Analytics:** Hours by program, retention rates, skill distribution
- **Program Analytics:** Completion rates, budget utilization, participant demographics
- **Donation Analytics:** Revenue trends, donor retention, campaign performance
- **Impact Analytics:** Beneficiaries by program, outcome metrics, year-over-year comparison

**Custom Report Builder:**

- Drag & drop metrics from available data sources
- Chart type selector: Bar, Line, Pie, Donut, Table, Heatmap, Scatter
- Filters: Date range, Program, Volunteer, Donor
- Group by: Month, Quarter, Year, Category, Program
- "Generate Report" → displays chart + data table
- Export: PNG, PDF, CSV

**Data Bindings:**

- `GET /api/ngo/analytics/{dashboardType}?period={period}`
- `POST /api/ngo/analytics/custom` — `{ metrics[], filters{}, groupBy, chartType }`

## 4.1 Extended Schema: Expenses, Analytics

```typescript
export const programExpenses = sqliteTable("ngo_program_expenses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  programId: text("program_id")
    .notNull()
    .references(() => communityPrograms.id, { onDelete: "cascade" }),
  date: text("date").notNull(),
  description: text("description").notNull(),
  category: text("category", {
    enum: ["supplies", "personnel", "travel", "food", "venue", "marketing", "other"],
  }).notNull(),
  amount: real("amount").notNull(),
  currency: text("currency").default("USD"),
  paymentMethod: text("payment_method", {
    enum: ["cash", "bank_transfer", "credit_card", "check"],
  }).notNull(),
  vendorName: text("vendor_name"),
  receiptKey: text("receipt_key"), // R2 key
  notes: text("notes"),
  recordedById: text("recorded_by_id"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

export const programParticipants = sqliteTable("ngo_program_participants", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  programId: text("program_id")
    .notNull()
    .references(() => communityPrograms.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  age: integer("age"),
  gender: text("gender"),
  status: text("status", { enum: ["enrolled", "active", "completed", "withdrawn"] })
    .notNull()
    .default("enrolled"),
  enrolledAt: text("enrolled_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  completedAt: text("completed_at"),
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

export type ProgramExpense = typeof programExpenses.$inferSelect;
export type ProgramParticipant = typeof programParticipants.$inferSelect;
```

## 5.1 Extended API Endpoints

#### `GET /api/ngo/programs/{id}/budget` — Budget overview for program

#### `GET /api/ngo/programs/{id}/expenses` — Expense list with filters

#### `POST /api/ngo/programs/{id}/expenses` — Record expense

#### `POST /api/ngo/programs/{id}/expenses/import` — Bulk import expenses CSV

#### `GET /api/ngo/programs/{id}/participants` — List participants

#### `POST /api/ngo/programs/{id}/participants` — Add participant

#### `PATCH /api/ngo/programs/{id}/participants/{pid}` — Update participant status

#### `GET /api/ngo/analytics/{dashboardType}` — Pre-built analytics dashboard

#### `POST /api/ngo/analytics/custom` — Custom report generation

## 6.1 Extended Component Tree

```
├── <ProgramBudget>
│   ├── <BudgetOverviewCards />
│   ├── <BudgetVsActualChart />
│   ├── <ExpenseTable />
│   ├── <AddExpenseModal />
│   ├── <ReceiptUpload />
│   └── <BudgetForecast />
│
├── <ProgramParticipants>
│   ├── <ParticipantTable />
│   ├── <AddParticipantModal />
│   └── <ParticipantStatusDropdown />
│
└── <PartnerAnalytics>
    ├── <DashboardTypeSelector />
    ├── <PrebuiltDashboard>
    │   ├── <AnalyticsChart />
    │   └── <DataTable />
    ├── <CustomReportBuilder>
    │   ├── <MetricSelector />
    │   ├── <FilterBuilder />
    │   ├── <ChartTypeSelector />
    │   └── <PreviewPane />
    └── <ExportActions />
```

## 7.1 Extended User Journeys

### Journey 4: Full Scholarship Lifecycle

1. **NGO partner** creates scholarship program "STEM Excellence Fund" with $50,000 budget
2. Application period opens → 24 applications received over 4 weeks
3. **NGO partner** reviews each application:
   - Opens application → reads essay, reviews transcript, checks recommendations
   - Scores: GPA (25/30), Essay (35/40), Recommendations (18/20), Extracurricular (8/10) = 86/100
   - Status: "Approved"
4. After all reviews → selects 5 recipients
5. Awards: $10,000 each × 5 = $50,000 (fully utilized)
6. Disbursement: "Direct to Institution" → funds sent to academy
7. Recipients confirmed → scholarship program status "Closed"
8. Generates scholarship impact report for quarterly filing

### Journey 5: Volunteer Event Coordination

1. **NGO partner** creates event "Community Clean-Up Day" in volunteer calendar
2. Sets date: June 15, 9 AM - 1 PM, location: Downtown Park
3. Needs 20 volunteers → sends notification to active volunteers
4. 18 volunteers sign up via response
5. **NGO partner** assigns roles: 5 registration, 10 clean-up, 3 supplies
6. Day of event → checks in volunteers via system (mobile-friendly)
7. Event ends → logs hours for all 18 volunteers: 4 hours each = 72 total
8. Takes photos, uploads to success stories
9. Generates event impact: 72 volunteer hours, 45 bags of trash collected, 2 acres cleaned

### Journey 6: Quarterly Impact Report Submission

1. **NGO partner** → Impact Reports → clicks "Generate Quarterly Report"
2. Selects: Q2 2026, all programs
3. System auto-populates metrics:
   - Scholarships awarded: 8 ($45,000)
   - Volunteer hours: 340
   - Programs active: 4
   - Beneficiaries: 215
4. **NGO partner** writes narrative sections:
   - "This quarter we launched our mentorship program pairing 30 students with industry professionals..."
   - "Community workshop series reached 120 participants..."
5. Uploads 3 success stories with photos (consent obtained)
6. Previews report → looks good
7. Clicks "Submit to Academy" → report sent, institution notified
8. Receives confirmation: "Report Q2 2026 submitted successfully"

## 8.1 Extended Business Rules

| Rule                            | Detail                                                                                    |
| ------------------------------- | ----------------------------------------------------------------------------------------- |
| RB01 — Expense Approval         | Expenses > $1,000 require program lead approval; > $5,000 require institution approval    |
| RB02 — Scholarship Disbursement | Disbursements only after award letter signed by recipient; max 2 disbursements per award  |
| RB03 — Volunteer Age            | Volunteers under 18 require parental consent form on file                                 |
| RB04 — Program Capacity         | Cannot exceed participant_capacity by more than 10% without approval                      |
| RB05 — Budget Transfer          | Max 15% of budget can be transferred between categories without approval                  |
| RB06 — Receipt Requirement      | All expenses require receipt upload within 7 days; exceptions need notes                  |
| RB07 — Report Frequency         | Impact reports due within 15 days of quarter end; late reports flagged to account manager |
| RB08 — Donor Privacy            | Anonymous donations cannot be linked to donor identity in any report                      |
| RB09 — Participant Data         | Participant personal data retained for 3 years, then anonymized                           |
| RB10 — Partnership Renewal      | Renewal application opens 90 days before expiry; requires updated MOU                     |

## 9.1 Extended Notifications

| Code  | Trigger                              | Channel                          |
| ----- | ------------------------------------ | -------------------------------- |
| N-N11 | New expense requires approval        | In-app + Email (to program lead) |
| N-N12 | Budget utilization > 80%             | In-app warning                   |
| N-N13 | Expense receipt missing (7 days)     | In-app reminder                  |
| N-N14 | Volunteer signed up for event        | In-app                           |
| N-N15 | Participant completed program        | In-app                           |
| N-N16 | Quarterly report due in 7 days       | Email                            |
| N-N17 | Impact report reviewed by academy    | In-app + Email                   |
| N-N18 | Donation milestone (total > $10K)    | In-app celebration               |
| N-N19 | Volunteer hours milestone (500/1000) | In-app + Email                   |
| N-N20 | Partnership renewal available        | Email (90/60/30 days)            |
| N-N21 | Program nearing end date             | In-app (30/14/7 days)            |
| N-N22 | New participant enrolled in program  | In-app                           |

## 11.1 State Management — Extended

```typescript
const ngoApi = createApi({
  reducerPath: "ngoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/ngo" }),
  tagTypes: [
    "Dashboard",
    "Scholarships",
    "Scholarship",
    "Applications",
    "Programs",
    "Program",
    "Volunteers",
    "Volunteer",
    "Hours",
    "Donations",
    "Reports",
    "Stories",
    "Messages",
    "Expenses",
    "Participants",
    "Analytics",
  ],
  endpoints: (builder) => ({
    getDashboard: builder.query<NgoDashboard, void>({
      query: () => "/dashboard/summary",
      providesTags: ["Dashboard"],
    }),
    getScholarshipPrograms: builder.query<ScholarshipProgram[], void>({
      query: () => "/scholarships/programs",
      providesTags: ["Scholarships"],
    }),
    createScholarshipProgram: builder.mutation<{ id: string }, CreateScholarshipRequest>({
      query: (body) => ({ url: "/scholarships/programs", method: "POST", body }),
      invalidatesTags: ["Scholarships", "Dashboard"],
    }),
    getScholarshipApplications: builder.query<Application[], string>({
      query: (programId) => `/scholarships/programs/${programId}/applications`,
      providesTags: (result, error, programId) => [{ type: "Applications", id: programId }],
    }),
    reviewApplication: builder.mutation<void, { id: string; body: ReviewRequest }>({
      query: ({ id, body }) => ({
        url: `/scholarships/applications/${id}/review`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Applications"],
    }),
    awardScholarship: builder.mutation<void, { programId: string; body: AwardRequest }>({
      query: ({ programId, body }) => ({
        url: `/scholarships/programs/${programId}/award`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { programId }) => [
        { type: "Scholarship", id: programId },
        "Scholarships",
        "Dashboard",
      ],
    }),
    getPrograms: builder.query<CommunityProgram[], ProgramQuery>({
      query: (params) => ({ url: "/programs", params }),
      providesTags: ["Programs"],
    }),
    createProgram: builder.mutation<{ id: string }, CreateProgramRequest>({
      query: (body) => ({ url: "/programs", method: "POST", body }),
      invalidatesTags: ["Programs", "Dashboard"],
    }),
    getProgram: builder.query<ProgramDetail, string>({
      query: (id) => `/programs/${id}`,
      providesTags: (result, error, id) => [{ type: "Program", id }],
    }),
    updateProgram: builder.mutation<void, { id: string; body: Partial<CreateProgramRequest> }>({
      query: ({ id, body }) => ({ url: `/programs/${id}`, method: "PATCH", body }),
      invalidatesTags: (result, error, { id }) => [{ type: "Program", id }, "Programs"],
    }),
    getVolunteers: builder.query<Volunteer[], VolunteerQuery>({
      query: (params) => ({ url: "/volunteers", params }),
      providesTags: ["Volunteers"],
    }),
    createVolunteer: builder.mutation<{ id: string }, CreateVolunteerRequest>({
      query: (body) => ({ url: "/volunteers", method: "POST", body }),
      invalidatesTags: ["Volunteers"],
    }),
    logHours: builder.mutation<void, LogHoursRequest>({
      query: (body) => ({ url: "/volunteers/hours", method: "POST", body }),
      invalidatesTags: ["Hours", "Dashboard"],
    }),
    getDonations: builder.query<Donation[], DonationQuery>({
      query: (params) => ({ url: "/donations", params }),
      providesTags: ["Donations"],
    }),
    recordDonation: builder.mutation<{ id: string }, RecordDonationRequest>({
      query: (body) => ({ url: "/donations", method: "POST", body }),
      invalidatesTags: ["Donations", "Dashboard"],
    }),
    generateReceipt: builder.mutation<{ url: string }, string>({
      query: (id) => ({ url: `/donations/${id}/receipt`, method: "POST" }),
      invalidatesTags: (result, error, id) => [{ type: "Donations", id }],
    }),
    getImpactMetrics: builder.query<ImpactMetrics, string>({
      query: (period) => ({ url: "/reports/impact-metrics", params: { period } }),
      providesTags: ["Reports"],
    }),
    generateReport: builder.mutation<
      { id: string; downloadUrl?: string },
      GenerateNgoReportRequest
    >({
      query: (body) => ({ url: "/reports/generate", method: "POST", body }),
      invalidatesTags: ["Reports"],
    }),
    submitReport: builder.mutation<void, string>({
      query: (id) => ({ url: `/reports/${id}/submit`, method: "POST" }),
      invalidatesTags: (result, error, id) => [{ type: "Reports", id }],
    }),
    getSuccessStories: builder.query<SuccessStory[], void>({
      query: () => "/reports/success-stories",
      providesTags: ["Stories"],
    }),
    createSuccessStory: builder.mutation<{ id: string }, CreateStoryRequest>({
      query: (body) => ({ url: "/reports/success-stories", method: "POST", body }),
      invalidatesTags: ["Stories"],
    }),
    getExpenses: builder.query<Expense[], { programId: string; params?: Record<string, unknown> }>({
      query: ({ programId, params }) => ({ url: `/programs/${programId}/expenses`, params }),
      providesTags: (result, error, { programId }) => [{ type: "Expenses", id: programId }],
    }),
    addExpense: builder.mutation<{ id: string }, { programId: string; body: AddExpenseRequest }>({
      query: ({ programId, body }) => ({
        url: `/programs/${programId}/expenses`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { programId }) => [
        { type: "Expenses", id: programId },
        { type: "Program", id: programId },
      ],
    }),
    getParticipants: builder.query<Participant[], string>({
      query: (programId) => `/programs/${programId}/participants`,
      providesTags: (result, error, programId) => [{ type: "Participants", id: programId }],
    }),
    addParticipant: builder.mutation<
      { id: string },
      { programId: string; body: AddParticipantRequest }
    >({
      query: ({ programId, body }) => ({
        url: `/programs/${programId}/participants`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { programId }) => [
        { type: "Participants", id: programId },
        { type: "Program", id: programId },
      ],
    }),
  }),
});
```

## 12.1 Form Schemas (Zod) — Extended

```typescript
export const createProgramSchema = z
  .object({
    name: z.string().min(1, "Program name required").max(200),
    description: z.string().min(1, "Description required").max(5000),
    type: z.enum(["workshop", "mentorship", "outreach", "awareness", "training", "other"]),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
    location: z.string().max(200).optional(),
    isVirtual: z.boolean().default(false),
    participantCapacity: z.number().int().min(1).optional(),
    budgetAllocated: z.number().min(0).default(0),
    goals: z.string().max(10000).optional(),
    keyActivities: z.string().max(10000).optional(),
    expectedOutcomes: z.string().max(5000).optional(),
  })
  .refine((d) => new Date(d.endDate) > new Date(d.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export const addExpenseSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  description: z.string().min(1, "Description required").max(500),
  category: z.enum(["supplies", "personnel", "travel", "food", "venue", "marketing", "other"]),
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().default("USD"),
  paymentMethod: z.enum(["cash", "bank_transfer", "credit_card", "check"]),
  vendorName: z.string().max(200).optional(),
  notes: z.string().max(1000).optional(),
});

export const addParticipantSchema = z.object({
  firstName: z.string().min(1, "First name required").max(100),
  lastName: z.string().min(1, "Last name required").max(100),
  email: z.string().email("Valid email").optional().or(z.literal("")),
  phone: z.string().max(20).optional().or(z.literal("")),
  age: z.number().int().min(1).max(120).optional(),
  gender: z.string().max(50).optional(),
  notes: z.string().max(1000).optional(),
});

export const recordDonationSchema = z.object({
  donorName: z.string().min(1, "Donor name required").max(200),
  donorEmail: z.string().email("Valid email").optional().or(z.literal("")),
  donorPhone: z.string().max(20).optional().or(z.literal("")),
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().default("USD"),
  paymentMethod: z.enum(["bank_transfer", "check", "cash", "online", "other"]),
  referenceNumber: z.string().max(100).optional(),
  campaign: z.string().max(200).optional(),
  programAllocation: z.string().uuid().optional(),
  isAnonymous: z.boolean().default(false),
  issueReceipt: z.boolean().default(true),
  notes: z.string().max(1000).optional(),
});

export const createSuccessStorySchema = z
  .object({
    title: z.string().min(1, "Title required").max(200),
    story: z.string().min(1, "Story required").max(10000),
    programId: z.string().uuid().optional(),
    beneficiaryName: z.string().max(200).optional(),
    beneficiaryConsentGiven: z.boolean().default(false),
  })
  .refine((d) => !d.beneficiaryName || d.beneficiaryConsentGiven, {
    message: "Consent required when beneficiary name is provided",
    path: ["beneficiaryConsentGiven"],
  });
```

## 13.1 Analytics Events — Extended

| Event                             | Properties                        | Trigger                       |
| --------------------------------- | --------------------------------- | ----------------------------- |
| `ngo_program_created`             | programId, type, budget           | New program created           |
| `ngo_program_completed`           | programId, completionRate         | Program marked completed      |
| `ngo_participant_enrolled`        | programId, participantId          | Participant added to program  |
| `ngo_participant_completed`       | programId, participantId          | Participant completed program |
| `ngo_expense_recorded`            | programId, amount, category       | Expense added                 |
| `ngo_expense_receipt_uploaded`    | expenseId, fileSize               | Receipt attached to expense   |
| `ngo_scholarship_program_created` | programId, totalFund              | Scholarship program created   |
| `ngo_scholarship_awarded`         | programId, amount, recipientCount | Scholarship awarded           |
| `ngo_volunteer_registered`        | volunteerId                       | New volunteer added           |
| `ngo_volunteer_hours_logged`      | volunteerId, hours, programId     | Hours logged                  |
| `ngo_donation_recorded`           | donationId, amount, paymentMethod | Donation recorded             |
| `ngo_donation_receipt_issued`     | donationId                        | Receipt generated             |
| `ngo_report_generated`            | reportId, period, sections        | Impact report generated       |
| `ngo_report_submitted`            | reportId, period                  | Report submitted to academy   |
| `ngo_success_story_created`       | storyId, programId                | Success story added           |
| `ngo_message_sent`                | threadId, recipientType           | Message sent to academy       |

## 14.1 Accessibility — Extended

- **Scholarship Application Reviews:** Tab order follows logical review flow; score inputs are number fields with `aria-valuemin`/`aria-valuemax`; essay preview has proper heading structure.
- **Volunteer Directory:** Table with `role="grid"`; sortable columns with `aria-sort`; inline status change uses `aria-live="polite"` for confirmation.
- **Donation Recording:** Currency input with `aria-label="Amount in USD"`; receipt checkbox linked to receipt preview link via `aria-describedby`.
- **Program Budget:** Budget progress bar has `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, and text label.
- **Expense Receipt Upload:** Drag-and-drop zone has hidden input; screen reader instructions: "Drop file here or press Enter to select a file."
- **Impact Report Builder:** Custom report sections keyboard draggable; chart preview has `aria-label` with data summary.
- **Participant List:** Add participant modal has `aria-labelledby` referencing modal title; focus returns to add button on close.
- All NGO pages support reduced motion preference (`prefers-reduced-motion: reduce`).
- Error messages use `role="alert"` and are connected to inputs via `aria-describedby`.

## 15.1 Error & Edge Case Catalog — Extended

| #   | Error                                                      | Message                                                                                               | Recovery                          |
| --- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------- |
| E11 | Expense budget exceeded (over 100%)                        | "This expense would exceed the program budget by $X. [Reduce Amount] [Request Budget Increase]"       | Reduce or request increase        |
| E12 | Volunteer hours exceed daily max (16)                      | "Hours cannot exceed 16 per day for a single volunteer. Entered: [hours]."                            | Reduce hours or split across days |
| E13 | Duplicate volunteer email                                  | "A volunteer with email [email] already exists. [View Existing] [Add Anyway]"                         | Add with different email or merge |
| E14 | Scholarship award exceeds remaining fund                   | "Award amount ($X) exceeds remaining fund ($Y). [Reduce Award] [Increase Fund]"                       | Adjust award or add funds         |
| E15 | Donation import CSV format invalid                         | "CSV format error at row [n]: [detail]. [Download Template]"                                          | Fix CSV and re-upload             |
| E16 | Program end date cannot be in the past (on create)         | "Program end date is in the past. Please set a future date."                                          | Adjust date                       |
| E17 | Receipt file is not an image or PDF                        | "Receipt must be PDF, PNG, or JPG. Selected: [type]."                                                 | Convert and retry                 |
| E18 | Participant already enrolled in program                    | "Participant [name] is already enrolled in this program."                                             | Update existing enrollment        |
| E19 | Anonymous donation cannot be linked to identifiable report | "This donation is anonymous. It will be aggregated in reports only."                                  | Confirm aggregate-only reporting  |
| E20 | Impact report already submitted for this period            | "A report for [period] has already been submitted. Draft a new version?"                              | Create new version                |
| E21 | Success story photo too large (>10MB)                      | "Photo exceeds 10MB limit. Please compress and re-upload."                                            | Compress image                    |
| E22 | Volunteer background check expired                         | "[Name]'s background check expired [date]. Request renewal before assigning to programs with minors." | Request new background check      |
| E23 | Partnership agreement not signed                           | "Partnership agreement has not been signed. Some features limited."                                   | Sign agreement via portal         |
| E24 | Program capacity reached                                   | "Program capacity (max [n]) has been reached. [Waitlist] [Increase Capacity]"                         | Add to waitlist or increase cap   |

---

_End of Actor Plan — NGO Partner_
