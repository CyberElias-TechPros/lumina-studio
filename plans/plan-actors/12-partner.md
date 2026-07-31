# Actor: Partner

## 1. Identity & Role Definition

- **ID:** `actor:partner`
- **Display Name:** Partner
- **Description:** Corporate or institutional partner that collaborates with Cyber Elias Academy through strategic agreements, joint programmes, referrals, resource sharing, and co-branded initiatives. Includes universities, training providers, industry consortiums, government agencies, and non-profits.
- **System Persona:** External collaborator managing a multi-faceted partnership. Focus on agreement compliance, collaboration tracking, referral management, shared resource access, and performance reporting. Values transparency, mutual benefit tracking, and streamlined coordination.
- **Authentication Level:** Tier 2 — TOTP MFA. SAML SSO available for institutional partners.
- **Session Timeout:** 30 minutes.
- **Default Landing:** `/partner/hub`

## 2. Primary Goals & Success KPIs

| Goal                             | KPI                      | Target             | Measurement     |
| -------------------------------- | ------------------------ | ------------------ | --------------- |
| Effective partnership management | Active collaborations    | >5 per partner     | CRM             |
| Referral revenue generation      | Referral conversion rate | >20%               | Referral system |
| Agreement compliance             | Milestones on track      | >90%               | Contract system |
| Mutual resource utilisation      | Resource access rate     | >70%               | Resource DB     |
| Partner satisfaction & retention | Partnership renewal rate | >85%               | CRM             |
| Joint programme effectiveness    | Programme enrolment      | >100 students/year | Academic DB     |
| Brand co-exposure                | Co-branded content views | >10K/year          | Analytics       |

## 3. Complete Screen Inventory

### 3.1 Partnership Hub — `/partner/hub`

**Wireframe:** Top bar: 5 KPI cards — Active Agreements, Ongoing Collaborations, Pending Referrals, Shared Resources, Unread Messages. Below: two-column layout — Left (activity feed + quick actions), Right (agreement health overview mini-cards, upcoming collaboration milestones, recent messages from CEA partnership managers, resource access quick-links).

**UI Fields / Components:**

- `PartnerStatCard` × 5 — icon, count, label, trend
- `ActivityFeed` — agreement signed, milestone reached, new collaboration started, referral converted, resource added
- `AgreementHealthCards` — each agreement: title, status, health colour, next milestone, days remaining
- `UpcomingCollabMilestones` — list of next collaboration checkpoints
- `QuickActions` — [New Collaboration] [Submit Referral] [Access Resources] [Schedule Review] [Send Message]
- `RecentMessagesWidget` — last 3 messages from CEA partnership team
- `ResourceQuickLinks` — shared drive, documentation portal, API access, marketing materials

**States:**

- **Loading:** Skeleton cards
- **Empty (new partner):** "Welcome to the CEA Partner Hub! Your partnership agreements and collaborations will appear here once established."
- **Error:** "Partnership hub unavailable. [Retry]"

### 3.2 Agreements — `/partner/agreements`

**Wireframe:** List view: agreement title, type (MOU, Joint Programme, Sponsorship, Resource Sharing, Revenue Share, Affiliation), status (Draft, Active, Expiring, Expired, Terminated), start/end dates, value/commitment, health indicator. Click → AgreementDetail.

**Agreement Detail View:**

- Header: title, reference number (e.g., `AGR-2026-0017`), type, status badge
- Parties: Partner Organisation (with address, contact) + CEA (with address, contact)
- Terms (collapsible sections): scope, duration, financial terms, IP rights, confidentiality, termination conditions, reporting requirements
- Milestones: table with milestone name, description, due date, completion date, status, verification evidence
- Financial Schedule: payment/commitment amounts, dates, status (if applicable)
- Amendments & Addenda: list with version, date, description, signed status
- Signature status: Partner (signed/pending/declined), CEA (signed/pending/declined)
- [Sign] [Request Amendment] [Download PDF] [View Report] buttons

**Sign Agreement Modal:**

- Review agreement summary
- Full legal name (type)
- Title/Role at organisation
- Checkbox: "I have authority to bind my organisation"
- [Sign Agreement] — audit capture: IP, user agent, timestamp

**States:**

- **Loading:** Skeleton list
- **Empty:** "No agreements yet. Agreements will appear once established with CEA."
- **Error:** "Agreements data unavailable. [Retry]"

### 3.3 Collaborations — `/partner/collaborations`

**Wireframe:** Tabbed view: [Active] [Completed] [Planned]. Each collaboration card: title, type (Joint Programme, Co-Branded Event, Research Project, Curriculum Development, Community Initiative), partner lead, CEA lead, status, start/end dates, progress %, health. Click → CollaborationDetail.

**Collaboration Detail View:**

- Header: title, type, reference number, status
- Description & objectives (rich text)
- Team: partner team members + CEA team members with roles
- Work plan: phases with tasks, assignees, dates, completion %
- Budget (if applicable): total, partner contribution, CEA contribution, spent
- Deliverables: table with name, due date, status, files
- Meeting notes: threaded list with date, participants, notes, action items
- Metrics: KPIs for this collaboration (pre-defined in agreement)
- [Update Progress] [Add Deliverable] [Schedule Meeting] [Send Message] [Mark Complete]

**States:**

- **Loading:** Skeleton
- **Empty (active):** "No active collaborations. Start a new collaboration or check planned ones."
- **Empty (completed):** "No completed collaborations yet."
- **Error:** "Collaborations data unavailable. [Retry]"

### 3.4 Referral Portal — `/partner/referrals`

**Wireframe:** Top bar: stats — Total Referrals, Converted, Pending Commission, Lifetime Earnings. Tab: [Submit Referral] [My Referrals] [Commission History]. Referral list: referral name, company, type (Student/Client/Partner), status (Sent, Contacted, Converted, Paid), date, commission amount, commission status.

**Submit Referral Form:**

- Referral type: Student Candidate / Client / Partner
- Referral name (required)
- Referral email (required)
- Referral phone (optional)
- Company/Organisation (required for client/partner)
- Notes about referral (text)
- Relationship to referrer: how do you know them?
- [Submit] — generates unique referral code/link

**Referral Detail:**

- Referral info (name, email, company, type)
- Status timeline: each status change with date and note
- Commission info (if converted): amount, payment date, status
- Tracking link: unique URL for sharing

**Commission History:**

- Table: referral name, converted date, commission amount, paid date, status (Pending, Approved, Paid)
- Total earned, pending, paid this year

**States:**

- **Loading:** Skeleton
- **Empty:** "No referrals yet. Submit your first referral to earn rewards."
- **Error:** "Referral portal unavailable. [Retry]"

### 3.5 Resources — `/partner/resources`

**Wireframe:** Library view with left category sidebar and right content grid. Categories: Marketing Materials, Curriculum, Research Papers, Brand Assets, Toolkits, API Documentation, Training Content. Each resource card: thumbnail/icon, title, type (PDF, DOC, image, video, link), description, download count, last updated.

**Resource Detail/Preview:**

- File preview (inline for supported types)
- Download button (with version info)
- Share link generator
- Related resources

**States:**

- **Loading:** Skeleton grid
- **Empty:** "No resources available yet. Resources will be added by CEA."
- **Error:** "Resource library unavailable. [Retry]"

### 3.6 Reports — `/partner/reports`

**Wireframe:** Tabbed view: [Partnership Performance] [Collaboration Analytics] [Referral Analytics] [Financial Summary] [Custom Reports].

**Partnership Performance:**

- Overall health score gauge (0-100)
- Agreement compliance rate (milestones on time)
- Collaboration completion rate
- Resource utilisation rate
- NPS/Feedback score trend
- Quarterly comparison table

**Collaboration Analytics:**

- Active collaborations by type (pie chart)
- Collaboration progress distribution (bar chart)
- Time-to-completion trend (line chart)
- Budget utilisation per collaboration

**Referral Analytics:**

- Referral funnel: Submitted → Contacted → Converted → Paid
- Conversion rate trend
- Commission earned (monthly bar chart)
- Top referral sources

**Financial Summary:**

- Total partnership value (agreements + collaborations)
- Revenue generated through partnership
- Costs incurred (partner contribution)
- Net value / ROI calculation
- Payment schedule (upcoming and past)

**Custom Reports:**

- Date range selector
- Metric/dimension picker
- [Generate Report] [Export PDF] [Schedule Email]

**States:**

- **Loading:** Skeleton charts
- **Empty:** "Not enough data to generate reports yet."
- **Error:** "Reports unavailable. [Retry]"

### 3.7 Messaging — `/partner/messages`

**Wireframe:** Same structure as Client messaging but with partner context: conversations with CEA partnership managers, collaboration team members. Left: conversation list. Right: chat view.

**States:**

- **Loading:** Skeleton
- **Empty:** "No messages yet. Your conversations with CEA teams will appear here."
- **Error:** "Messaging unavailable. [Retry]"

## 4. Full Database Schema

### Table: `partners`

```sql
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_name VARCHAR(500) NOT NULL,
  legal_name VARCHAR(500),
  organisation_type VARCHAR(50) NOT NULL CHECK (organisation_type IN (
    'university','college','training_provider','corporation','non_profit',
    'government','consortium','association','other'
  )),
  industry VARCHAR(100),
  website VARCHAR(500),
  size VARCHAR(20) CHECK (size IN ('1-10','11-50','51-200','201-1000','1000+','5000+')),
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  zip VARCHAR(20),
  country VARCHAR(100),
  tax_id VARCHAR(100),
  registration_number VARCHAR(100),
  primary_contact_id UUID REFERENCES auth_users(id),
  partnership_manager_id UUID REFERENCES auth_users(id),
  partnership_tier VARCHAR(20) DEFAULT 'basic' CHECK (partnership_tier IN ('platinum','gold','silver','basic','trial')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','inactive','suspended','closed')),
  lifetime_value DECIMAL(15,2) DEFAULT 0,
  rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_partners_manager (partnership_manager_id),
  INDEX idx_partners_tier (partnership_tier),
  INDEX idx_partners_status (status),
  INDEX idx_partners_type (organisation_type)
);
```

### Table: `partner_users`

```sql
CREATE TABLE partner_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  role VARCHAR(30) NOT NULL DEFAULT 'member' CHECK (role IN ('admin','manager','member','viewer')),
  can_sign_agreements BOOLEAN DEFAULT false,
  can_submit_referrals BOOLEAN DEFAULT true,
  can_manage_collaborations BOOLEAN DEFAULT true,
  can_view_reports BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(partner_id, user_id),
  INDEX idx_partner_users_partner (partner_id)
);
```

### Table: `partner_agreements`

```sql
CREATE TABLE partner_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number VARCHAR(50) NOT NULL UNIQUE,
  partner_id UUID NOT NULL REFERENCES partners(id),
  title VARCHAR(500) NOT NULL,
  agreement_type VARCHAR(50) NOT NULL CHECK (agreement_type IN (
    'mou','joint_programme','sponsorship','resource_sharing','revenue_share','affiliation','service_level'
  )),
  status VARCHAR(30) NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft','pending_partner','pending_cea','active','expiring','expired','terminated'
  )),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  auto_renew BOOLEAN DEFAULT false,
  value DECIMAL(15,2),
  currency VARCHAR(3) DEFAULT 'USD',
  scope_description TEXT,
  terms_conditions TEXT,
  partner_signed_at TIMESTAMPTZ,
  partner_signed_by UUID REFERENCES auth_users(id),
  partner_signature_ip VARCHAR(45),
  cea_signed_at TIMESTAMPTZ,
  cea_signed_by UUID REFERENCES auth_users(id),
  cea_signature_ip VARCHAR(45),
  document_key VARCHAR(500),
  document_hash VARCHAR(64),
  terminated_at TIMESTAMPTZ,
  termination_reason TEXT,
  created_by UUID NOT NULL REFERENCES auth_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_partner_agreements_partner (partner_id),
  INDEX idx_partner_agreements_status (status),
  INDEX idx_partner_agreements_type (agreement_type)
);
```

### Table: `partner_agreement_milestones`

```sql
CREATE TABLE partner_agreement_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agreement_id UUID NOT NULL REFERENCES partner_agreements(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  completed_at TIMESTAMPTZ,
  status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','in_progress','completed','missed')),
  verification_evidence VARCHAR(500),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_agreement_milestones_agreement (agreement_id),
  INDEX idx_agreement_milestones_due (due_date)
);
```

### Table: `partner_agreement_amendments`

```sql
CREATE TABLE partner_agreement_amendments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agreement_id UUID NOT NULL REFERENCES partner_agreements(id) ON DELETE CASCADE,
  version INT NOT NULL,
  description TEXT NOT NULL,
  changes TEXT NOT NULL,
  document_key VARCHAR(500),
  partner_signed_at TIMESTAMPTZ,
  cea_signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_agreement_amendments_agreement (agreement_id)
);
```

### Table: `collaborations`

```sql
CREATE TABLE collaborations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES partners(id),
  agreement_id UUID REFERENCES partner_agreements(id),
  title VARCHAR(500) NOT NULL,
  collaboration_type VARCHAR(50) NOT NULL CHECK (collaboration_type IN (
    'joint_programme','co_branded_event','research_project','curriculum_development',
    'community_initiative','workshop','exchange_programme','other'
  )),
  status VARCHAR(30) NOT NULL DEFAULT 'planned' CHECK (status IN ('planned','active','completed','cancelled','on_hold')),
  description TEXT,
  objectives TEXT,
  start_date DATE,
  end_date DATE,
  progress_percentage DECIMAL(5,2) DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  health VARCHAR(20) DEFAULT 'green' CHECK (health IN ('green','amber','red')),
  partner_lead_id UUID REFERENCES auth_users(id),
  cea_lead_id UUID REFERENCES auth_users(id),
  budget_total DECIMAL(15,2),
  budget_partner_contribution DECIMAL(15,2),
  budget_cea_contribution DECIMAL(15,2),
  budget_spent DECIMAL(15,2) DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_collaborations_partner (partner_id),
  INDEX idx_collaborations_agreement (agreement_id),
  INDEX idx_collaborations_status (status),
  INDEX idx_collaborations_type (collaboration_type)
);
```

### Table: `collaboration_tasks`

```sql
CREATE TABLE collaboration_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collaboration_id UUID NOT NULL REFERENCES collaborations(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES collaboration_phases(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  assignee_id UUID REFERENCES auth_users(id),
  due_date DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'todo' CHECK (status IN ('todo','in_progress','completed','blocked')),
  sort_order INT DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_collab_tasks_collaboration (collaboration_id)
);
```

### Table: `collaboration_phases`

```sql
CREATE TABLE collaboration_phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collaboration_id UUID NOT NULL REFERENCES collaborations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sort_order INT NOT NULL,
  start_date DATE,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','completed','delayed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_collab_phases_collaboration (collaboration_id)
);
```

### Table: `collaboration_deliverables`

```sql
CREATE TABLE collaboration_deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collaboration_id UUID NOT NULL REFERENCES collaborations(id) ON DELETE CASCADE,
  task_id UUID REFERENCES collaboration_tasks(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','submitted','approved','rejected')),
  submitted_by UUID REFERENCES auth_users(id),
  file_key VARCHAR(500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_collab_deliverables_collaboration (collaboration_id)
);
```

### Table: `collaboration_meeting_notes`

```sql
CREATE TABLE collaboration_meeting_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collaboration_id UUID NOT NULL REFERENCES collaborations(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  meeting_date TIMESTAMPTZ NOT NULL,
  participants JSONB NOT NULL DEFAULT '[]',
  notes TEXT NOT NULL,
  action_items JSONB DEFAULT '[]',
  created_by UUID NOT NULL REFERENCES auth_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_collab_meetings_collaboration (collaboration_id)
);
```

### Table: `referrals`

```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code VARCHAR(50) NOT NULL UNIQUE,
  partner_id UUID NOT NULL REFERENCES partners(id),
  referred_by UUID NOT NULL REFERENCES auth_users(id),
  referral_type VARCHAR(30) NOT NULL CHECK (referral_type IN ('student_candidate','client','partner')),
  referral_name VARCHAR(255) NOT NULL,
  referral_email VARCHAR(255) NOT NULL,
  referral_phone VARCHAR(50),
  referral_company VARCHAR(255),
  relationship_note TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'sent' CHECK (status IN ('sent','contacted','converted','paid','declined')),
  commission_amount DECIMAL(15,2),
  commission_currency VARCHAR(3) DEFAULT 'USD',
  commission_status VARCHAR(20) CHECK (commission_status IN ('pending','approved','paid')),
  commission_paid_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  tracking_link VARCHAR(500),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_referrals_partner (partner_id),
  INDEX idx_referrals_status (status),
  INDEX idx_referrals_type (referral_type),
  INDEX idx_referrals_created (created_at DESC)
);
```

### Table: `partner_resources`

```sql
CREATE TABLE partner_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(50) NOT NULL CHECK (category IN (
    'marketing_materials','curriculum','research_papers','brand_assets',
    'toolkits','api_docs','training_content','other'
  )),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_key VARCHAR(500),
  resource_type VARCHAR(20) NOT NULL CHECK (resource_type IN ('pdf','doc','image','video','link','spreadsheet','presentation','archive')),
  file_size_bytes BIGINT,
  mime_type VARCHAR(100),
  external_url VARCHAR(500),
  version VARCHAR(20) DEFAULT '1.0',
  download_count INT DEFAULT 0,
  partner_tier_access VARCHAR(20) DEFAULT 'basic' CHECK (partner_tier_access IN ('platinum','gold','silver','basic','trial','all')),
  is_public BOOLEAN DEFAULT false,
  uploaded_by UUID NOT NULL REFERENCES auth_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_partner_resources_category (category),
  INDEX idx_partner_resources_tier (partner_tier_access)
);
```

### Table: `partner_resource_downloads`

```sql
CREATE TABLE partner_resource_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id UUID NOT NULL REFERENCES partner_resources(id) ON DELETE CASCADE,
  partner_id UUID NOT NULL REFERENCES partners(id),
  user_id UUID NOT NULL REFERENCES auth_users(id),
  downloaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_resource_downloads_resource (resource_id),
  INDEX idx_resource_downloads_partner (partner_id)
);
```

### Table: `partner_messages`

```sql
CREATE TABLE partner_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  collaboration_id UUID REFERENCES collaborations(id),
  sender_id UUID NOT NULL REFERENCES auth_users(id),
  recipient_id UUID NOT NULL REFERENCES auth_users(id),
  content TEXT NOT NULL,
  has_attachments BOOLEAN DEFAULT false,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_partner_messages_partner (partner_id),
  INDEX idx_partner_messages_collab (collaboration_id),
  INDEX idx_partner_messages_recipient (recipient_id),
  INDEX idx_partner_messages_created (created_at DESC)
);
```

### Table: `partner_reviews`

```sql
CREATE TABLE partner_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  submitted_by UUID NOT NULL REFERENCES auth_users(id),
  overall_score INT NOT NULL CHECK (overall_score >= 1 AND overall_score <= 5),
  communication_score INT CHECK (communication_score >= 1 AND communication_score <= 5),
  collaboration_score INT CHECK (collaboration_score >= 1 AND collaboration_score <= 5),
  support_score INT CHECK (support_score >= 1 AND support_score <= 5),
  comments TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_partner_reviews_partner (partner_id)
);
```

## 5. Complete API Contract

### 5.1 Partnership Hub

```
GET /api/v1/partner/hub
Auth: Partner (all roles)
Response: {
  stats: { activeAgreements, activeCollaborations, pendingReferrals, sharedResources, unreadMessages };
  activityFeed: Array<{ id, type, summary, entityType, entityId, createdAt }>;
  agreementHealth: Array<{ id, title, status, health, nextMilestone, daysRemaining }>;
  upcomingMilestones: Array<{ id, collaborationTitle, milestone, dueDate }>;
  recentMessages: Array<{ id, senderName, preview, createdAt }>;
  resourceQuickLinks: Array<{ id, title, url }>;
}
```

### 5.2 Agreements

```
GET /api/v1/partner/agreements
Query: status?, type?, page, limit, sort_by
Auth: Partner (admin, manager)
Response: { data: Array<{
  id, referenceNumber, title, agreementType, status, startDate, endDate,
  value, currency, health, milestonesCompleted, milestonesTotal
}>, pagination }

GET /api/v1/partner/agreements/:id
Response: Full agreement with milestones, amendments, financial schedule

POST /api/v1/partner/agreements/:id/sign
Body: { fullName: string, title: string, authorityConfirmed: boolean }
Auth: Partner (can_sign_agreements=true)
Response: { status: 'pending_cea' | 'active', signedAt, auditData }

GET /api/v1/partner/agreements/:id/report
Query: from, to
Response: { complianceRate, milestoneSummary, financialSummary, metrics: Array<{ name, value }> }
```

### 5.3 Collaborations

```
GET /api/v1/partner/collaborations
Query: status?, type?, page, limit, sort_by
Auth: Partner (admin, manager, member)
Response: { data: Array<{
  id, title, collaborationType, status, startDate, endDate,
  progressPercentage, health, partnerLead: { id, name }, ceaLead: { id, name }
}>, pagination }

GET /api/v1/partner/collaborations/:id
Response: Full collaboration with phases, tasks, deliverables, meeting notes, metrics

POST /api/v1/partner/collaborations
Body: { title, collaborationType, agreementId?, description, objectives, startDate, endDate, partnerLeadId, ceaLeadId }
Response: { id, createdAt }

PUT /api/v1/partner/collaborations/:id
Body: Partial<CollaborationUpdate>
Response: { id, updatedAt }

POST /api/v1/partner/collaborations/:id/progress
Body: { progressPercentage: number, note?: string }
Response: { success: true }

POST /api/v1/partner/collaborations/:id/deliverables
Body: { name, description, dueDate, file? }
Response: { id, createdAt }

POST /api/v1/partner/collaborations/:id/meeting-notes
Body: { title, meetingDate, participants: string[], notes: string, actionItems: Array<{ assignee, item, dueDate }> }
Response: { id, createdAt }
```

### 5.4 Referrals

```
GET /api/v1/partner/referrals
Query: status?, type?, page, limit, sort_by
Auth: Partner (admin, manager, member)
Response: { data: Array<{
  id, referralCode, referralType, referralName, referralEmail, referralCompany,
  status, commissionAmount, commissionStatus, convertedAt, createdAt
}>, pagination, summary: { total, converted, pendingCommission, lifetimeEarnings } }

POST /api/v1/partner/referrals
Body: { referralType, referralName, referralEmail, referralPhone?, referralCompany?, relationshipNote? }
Response: { id, referralCode, trackingLink, createdAt }

GET /api/v1/partner/referrals/:id
Response: Full referral with status timeline, commission info, tracking link

GET /api/v1/partner/referrals/commission-history
Query: from, to, status?, page, limit
Response: { data: Array<{ referralName, convertedAt, commissionAmount, paidAt, status }>, summary: { earned, pending, paid } }
```

### 5.5 Resources

```
GET /api/v1/partner/resources
Query: category?, search, page, limit
Auth: Partner (all roles)
Response: { data: Array<{ id, title, description, resourceType, category, fileSizeBytes, downloadCount, version, updatedAt, thumbnailUrl }>, pagination }

GET /api/v1/partner/resources/:id
Response: Full resource with download URL, related resources

POST /api/v1/partner/resources/:id/download
Response: { downloadUrl: string, expiresIn: number }

GET /api/v1/partner/resources/categories
Response: Array<{ category, count }>
```

### 5.6 Reports

```
GET /api/v1/partner/reports/performance
Query: from, to
Auth: Partner (admin, can_view_reports)
Response: { healthScore, agreementComplianceRate, collaborationCompletionRate, resourceUtilizationRate, npsScore, quarterlyComparison: Array<{ quarter, metrics }> }

GET /api/v1/partner/reports/collaboration-analytics
Query: from, to
Response: { byType: Array<{ type, count, avgProgress }>, progressDistribution: Array<{ range, count }>, timeToCompletion: Array<{ month, avgDays }>, budgetUtilization: Array<{ collabId, total, spent }> }

GET /api/v1/partner/reports/referral-analytics
Query: from, to
Response: { funnel: Array<{ stage, count, conversionRate }>, conversionTrend: Array<{ month, rate }>, commissionEarned: Array<{ month, amount }>, topSources: Array<{ source, count }> }

GET /api/v1/partner/reports/financial
Query: from, to
Response: { totalValue, revenueGenerated, costsIncurred, netValue, roi, paymentSchedule: Array<{ date, amount, type, status }> }

POST /api/v1/partner/reports/custom
Body: { metrics: string[], dimensions: string[], dateRange: { from, to }, granularity }
Response: { columns, rows, executionTimeMs }
```

### 5.7 Messages

```
GET /api/v1/partner/messages
Query: collaboration_id?, page, limit, unread_only?
Auth: Partner (all roles)
Response: { data: Array<{ id, sender: { id, name, photoUrl }, content, hasAttachments, createdAt, isRead }>, pagination }

POST /api/v1/partner/messages
Body: { recipientId, collaborationId?, content, attachments? }
Response: { id, createdAt }

PUT /api/v1/partner/messages/:id/read
Response: { isRead: true, readAt }
```

## 6. Component Tree

```
PartnerShell
 ├── PartnerSidebar (Hub, Agreements, Collaborations, Referrals, Resources, Reports, Messages)
 ├── PartnerTopbar (search, notifications, user menu)
 └── MainContent

Pages:
 ├── PartnerHubPage
 │   ├── StatCardRow × 5
 │   ├── ActivityFeed
 │   ├── AgreementHealthMiniCards
 │   ├── UpcomingMilestonesWidget
 │   ├── QuickActionsGrid
 │   ├── RecentMessagesWidget
 │   └── ResourceQuickLinks

 ├── AgreementsPage
 │   ├── AgreementFilters (status, type, search)
 │   ├── AgreementList
 │   │   └── AgreementCard (title, type, status, dates, health, value, onClick)
 │   └── AgreementDetailView
 │       ├── AgreementHeader (title, ref, status, health)
 │       ├── PartiesBlock
 │       ├── TermsAccordion (scope, duration, financial, IP, confidentiality, termination)
 │       ├── MilestonesTable (with status indicators)
 │       ├── FinancialScheduleTable
 │       ├── AmendmentsList
 │       ├── SignatureStatusBlock
 │       └── AgreementActions (Sign, Request Amendment, Download, Report)

 ├── CollaborationsPage
 │   ├── CollaborationTabs (Active, Completed, Planned)
 │   ├── CollaborationFilters (type, health, search)
 │   ├── CollaborationList
 │   │   └── CollaborationCard (title, type, status, progress, health, leads)
 │   └── CollaborationDetailView
 │       ├── CollabHeader (title, type, status, progress bar, health)
 │       ├── DescriptionSection
 │       ├── TeamSection (partner + CEA teams)
 │       ├── WorkPlan (phases with task lists)
 │       ├── BudgetSection (if applicable)
 │       ├── DeliverablesTable
 │       ├── MeetingNotesList
 │       │   └── MeetingNoteCard (title, date, participants preview, expand)
 │       └── CollabActions (Update Progress, Add Deliverable, Add Meeting, Message, Complete)

 ├── ReferralsPage
 │   ├── ReferralStatsBar (total, converted, pending commission, lifetime)
 │   ├── ReferralTabs (Submit, My Referrals, Commission History)
 │   ├── SubmitReferralForm
 │   │   ├── ReferralTypeSelect
 │   │   ├── NameField
 │   │   ├── EmailField
 │   │   ├── PhoneField
 │   │   ├── CompanyField
 │   │   ├── RelationshipNoteField
 │   │   └── SubmitButton
 │   ├── ReferralList
 │   │   └── ReferralCard (name, type, status, commission, date)
 │   ├── ReferralDetailModal
 │   │   ├── ReferralInfo
 │   │   ├── StatusTimeline
 │   │   ├── CommissionInfo
 │   │   └── TrackingLinkDisplay
 │   └── CommissionHistoryTable

 ├── ResourcesPage
 │   ├── CategorySidebar (collapsible categories)
 │   ├── ResourceToolbar (search, sort)
 │   ├── ResourceGrid
 │   │   └── ResourceCard (icon, title, type, description, download count, date)
 │   ├── ResourceDetailModal
 │   │   ├── FilePreview
 │   │   ├── DownloadButton
 │   │   ├── ShareLinkModal
 │   │   └── RelatedResources
 │   └── BreadcrumbNav

 ├── ReportsPage
 │   ├── ReportTabs (Performance, Collaboration, Referral, Financial, Custom)
 │   ├── PerformanceDashboard
 │   │   ├── HealthScoreGauge
 │   │   ├── ComplianceRateCard
 │   │   ├── CollaborationsProgressChart
 │   │   ├── ResourceUtilisationCard
 │   │   └── QuarterlyComparisonTable
 │   ├── CollaborationAnalytics
 │   │   ├── TypePieChart
 │   │   ├── ProgressDistributionBar
 │   │   ├── TimeToCompletionTrend
 │   │   └── BudgetUtilisationChart
 │   ├── ReferralAnalytics
 │   │   ├── FunnelChart
 │   │   ├── ConversionRateTrend
 │   │   ├── CommissionEarnedChart
 │   │   └── TopSourcesTable
 │   ├── FinancialSummary
 │   │   ├── ValueSummaryCards
 │   │   ├── NetValueROICard
 │   │   └── PaymentScheduleTable
 │   └── CustomReportBuilder
 │       ├── MetricSelector
 │       ├── DimensionSelector
 │       ├── DateRangePicker
 │       ├── GranularitySelector
 │       └── GenerateButton

 └── MessagesPage
     ├── ConversationList
     │   └── ConversationItem (avatar, name, last message, unread badge, time)
     ├── ChatArea
     │   ├── MessageList
     │   │   └── MessageBubble
     │   ├── TypingIndicator
     │   └── MessageComposer
     └── ConversationInfoPanel

Shared Components:
 ├── StatusBadge
 ├── Modal
 ├── ConfirmDialog
 ├── Toast
 ├── Skeleton
 ├── EmptyState
 ├── ErrorBoundary
 ├── DataTable
 ├── Pagination
 ├── SearchBar
 ├── FileUpload
 ├── RichTextEditor
 ├── Avatar
 ├── ProgressBar
 ├── HealthIndicator (green/amber/red dot)
 └── DateRangePicker
```

## 7. Exhaustive User Journeys

### Journey 1: Partner Onboards & Reviews Agreement

1. CEA partnership team creates partner record → invitation email sent to partner primary contact
2. Email: "CEA welcomes {{organisation}} as a partner! Activate your portal access."
3. Partner clicks magic link → sets password + MFA → onboarding wizard:
   - Profile: verify organisation details, add team members
   - Review pending agreement
4. Lands on `/partner/hub` → sees "Welcome! You have 1 agreement pending your signature."
5. Navigates to `/partner/agreements` → sees agreement "MOU — Strategic Partnership 2026-2028"
6. Clicks agreement → reads full terms:
   - Scope: Joint programme development, research collaboration, student exchange
   - Duration: 2 years, auto-renew
   - Financial: Revenue share 15% on referred students
   - IP: Joint ownership of co-developed curriculum
   - 6 milestones with quarterly checkpoints
7. Clicks [Sign] → ESignatureModal:
   - Enter full name: "Dr. Maria Santos"
   - Title: "Director of Academic Partnerships"
   - Confirm authority checkbox
   - [Sign Agreement]
8. Status → "Pending CEA Signature" → CEA partnership manager notified to countersign
9. Email confirmation: "You've signed the agreement. We'll notify you when CEA countersigns."
10. When CEA signs → agreement becomes "Active" → partner receives notification

### Journey 2: Partner Creates & Manages Collaboration

1. Partner navigates to `/partner/collaborations`
2. Clicks [New Collaboration]
3. Form:
   - Title: "Joint Data Science Bootcamp — Summer 2026"
   - Type: "Joint Programme"
   - Agreement: selects active MOU
   - Description: "6-week intensive bootcamp co-developed and co-delivered"
   - Objectives: "Train 100 students, industry certification, job placement pipeline"
   - Partner Lead: selects self
   - CEA Lead: selects from directory
   - Budget: Total $50K, Partner $20K, CEA $30K
   - Timeline: Jun 1 - Aug 15, 2026
4. Clicks [Create] → collaboration created with status "Planned"
5. Adds phases via UI:
   - Phase 1: Curriculum Design (Jun 1-15)
   - Phase 2: Marketing & Recruitment (Jun 10-30)
   - Phase 3: Bootcamp Delivery (Jul 1 - Aug 10)
   - Phase 4: Evaluation & Certificates (Aug 10-15)
6. Adds tasks under each phase, assigns team members
7. Clicks [Activate] → status → "Active"
8. Throughout bootcamp:
   - Updates progress % weekly
   - Adds deliverables (curriculum PDF, marketing materials, attendance reports)
   - Logs meeting notes after weekly sync-ups
   - Marks tasks complete as work finishes
9. Collaboration completes → clicks [Mark Complete] → feedback survey pops up → rates partnership experience

### Journey 3: Partner Submits Referral

1. Partner navigates to `/partner/referrals`
2. Clicks [Submit Referral]
3. Selects referral type: "Student Candidate"
4. Fills:
   - Name: "James Wilson"
   - Email: "james.w@email.com"
   - Phone: "+1 555-0123"
   - Company: not applicable (student referral)
   - Relationship: "Former colleague's son, interested in data science"
5. Clicks [Submit] → referral created with unique code `REF-JW-2026-0042`
6. Copy tracking link: `app.cea.io/refer/REF-JW-2026-0042`
7. Referral status → "Sent"
8. One week later → James applies to CEA programme → referral status → "Contacted"
9. James enrols → status → "Converted"
10. Commission calculated ($500 per enrolled student referral) → status → "Approved" → "Paid" within 30 days
11. Partner views commission history → sees $500 paid on Aug 1

### Journey 4: Partner Accesses Resources & Downloads Materials

1. Partner navigates to `/partner/resources`
2. Browses categories → clicks "Marketing Materials"
3. Sees: "Co-Branded Brochure Template", "Programme Flyer Q3 2026", "Social Media Kit", "Success Stories PDF"
4. Clicks "Co-Branded Brochure Template" → detail modal:
   - Preview shows template layout
   - Description: "Editable InDesign template with co-branding guidelines"
   - Version: 2.1
   - Downloads: 45 (from other partners)
5. Clicks [Download] → system logs download → file downloads
6. Later, returns and uses template to create programme marketing materials
7. **Branch: Resource not available for tier** → partner sees "Available for Gold & Platinum partners" badge → requests upgrade

### Journey 5: Partner Reviews Performance Reports

1. Partner navigates to `/partner/reports`
2. Default view: Performance dashboard:
   - Health Score: 82/100 (green)
   - Agreement Compliance: 100% (all milestones on time)
   - Collaboration Completion Rate: 3 of 5 completed
   - Resource Utilisation: 67%
   - NPS: 4.5/5.0
3. Clicks [Collaboration Analytics] tab:
   - Pie chart: 60% Joint Programmes, 20% Research, 20% Events
   - Progress overview: 2 on track, 1 at risk, 2 completed
4. Clicks [Referral Analytics]:
   - Funnel: 12 submitted → 8 contacted → 5 converted → 4 paid
   - Conversion rate: 41.7%
   - Commission earned this year: $2,000
5. Clicks [Export PDF] → report generated and downloaded
6. Shares with internal stakeholders via email

## 8. Business Rules Engine

### Rule Set 1: Agreements

- **R1.1:** Agreements auto-expire 30 days after `end_date` if not renewed
- **R1.2:** 60-day renewal reminder sent before `end_date` for auto_renew agreements
- **R1.3:** Agreements cannot be signed by both parties on the same day (24h review period)
- **R1.4:** Only partner users with `can_sign_agreements = true` can sign
- **R1.5:** Amendments require both parties to sign before taking effect
- **R1.6:** Expired agreements archive all linked collaborations (read-only)

### Rule Set 2: Collaborations

- **R2.1:** At least one milestone must be completed every 90 days or collaboration health drops to "amber"
- **R2.2:** Collaboration progress = weighted average of phase progress
- **R2.3:** Budget spent cannot exceed budget total without amendment
- **R2.4:** Completed collaborations auto-trigger satisfaction survey
- **R2.5:** Collaborations on "on_hold" for > 60 days auto-cancel

### Rule Set 3: Referrals

- **R3.1:** Referral codes are valid for 12 months
- **R3.2:** Commission paid 30 days after student enrolment (to allow for drop-out period)
- **R3.3:** Commission only paid if student completes first 30 days of programme
- **R3.4:** Self-referral (same organisation as partner) is not eligible for commission
- **R3.5:** Referral tracking cookies expire after 30 days

### Rule Set 4: Resources

- **R4.1:** Resource access is tier-gated (Trial < Basic < Silver < Gold < Platinum)
- **R4.2:** Download links expire after 24 hours
- **R4.3:** Rate limit: max 50 downloads per partner per day
- **R4.4:** Uploaded resources require CEA approval before publishing

### Rule Set 5: Partnership Health

- **R5.1:** Partnership health score = (agreement compliance × 0.3) + (collaboration success × 0.3) + (feedback score × 0.2) + (resource utilisation × 0.1) + (referral activity × 0.1)
- **R5.2:** Score > 80 = green, 60-80 = amber, < 60 = red
- **R5.3:** Red health for > 90 days triggers partnership review meeting

## 9. Notification Specifications

### N1: Agreement Ready for Signature

- **Trigger:** New agreement requires partner signature
- **Channel:** In-app + Email
- **Template:** "Agreement '{{agreement_title}}' is ready for your signature."
- **Delivery:** Immediate

### N2: Agreement Signed by CEA

- **Trigger:** CEA countersigns agreement
- **Channel:** In-app + Email
- **Template:** "Agreement '{{agreement_title}}' is now fully executed and active."
- **Delivery:** Immediate

### N3: Agreement Expiring Soon

- **Trigger:** 60 days before agreement end_date
- **Channel:** In-app + Email
- **Template:** "Agreement '{{agreement_title}}' expires in {{days}} days. {{if auto_renew}}It will auto-renew{{else}}Please review for renewal{{/if}}."
- **Delivery:** Once

### N4: Collaboration Milestone Due

- **Trigger:** 7 days before milestone due_date
- **Channel:** In-app + Email (to partner + CEA leads)
- **Template:** "Milestone '{{milestone_name}}' for '{{collaboration_title}}' is due in {{days}} days."
- **Delivery:** Once, reminder at 1 day

### N5: Collaboration Health Change

- **Trigger:** Collaboration health changes colour
- **Channel:** In-app
- **Template:** "Collaboration '{{title}}' health changed to {{health}}."
- **Delivery:** Immediate

### N6: Referral Converted

- **Trigger:** Referred candidate/client converts
- **Channel:** In-app + Email
- **Template:** "Your referral {{referral_name}} has converted! Commission: {{amount}} {{currency}}."
- **Delivery:** Immediate

### N7: Commission Paid

- **Trigger:** Commission payment processed
- **Channel:** In-app + Email
- **Template:** "Commission of {{amount}} {{currency}} for referral {{referral_name}} has been paid."
- **Delivery:** Immediate

### N8: New Resource Available

- **Trigger:** Resource published in partner category
- **Channel:** In-app + Email digest
- **Template:** "New resource available: {{resource_title}} ({{category}})."
- **Delivery:** Weekly digest or immediate for high-priority resources

### N9: Review/Survey Request

- **Trigger:** Collaboration completed or quarterly review due
- **Channel:** In-app + Email
- **Template:** "We'd love your feedback! Rate your partnership experience with {{collaboration_title}}."
- **Delivery:** On completion, quarterly

## 10. Permission Matrix

| Entity                  | Partner Admin    | Partner Manager | Partner Member | Partner Viewer | CEA Admin | CEA Partnership Manager |
| ----------------------- | ---------------- | --------------- | -------------- | -------------- | --------- | ----------------------- |
| **Partner Profile**     | CRUD             | R               | R              | R              | CRUD      | CRUD                    |
| **Partner Users**       | CRUD             | R               | —              | —              | CRUD      | CRUD                    |
| **Agreements**          | R                | R               | R              | R              | CRUD      | CRUD                    |
| **Sign Agreement**      | Yes (if granted) | —               | —              | —              | —         | Yes                     |
| **Collaborations**      | CRUD             | CRUD            | CRUD           | R              | CRUD      | CRUD                    |
| **Referrals**           | CRUD             | CRUD            | CRUD           | R              | R         | R                       |
| **Referral Commission** | R                | R               | R              | R              | CRUD      | R                       |
| **Resources**           | R                | R               | R              | R              | CRUD      | CRUD                    |
| **Reports**             | R                | R               | R              | R (limited)    | R         | R                       |
| **Messages**            | CRUD             | CRUD            | CRUD           | R              | CRUD      | CRUD                    |
| **Reviews**             | CRUD             | CRUD            | CRUD           | —              | R         | R                       |

## 11. State Management

```typescript
const partnerApi = createApi({
  reducerPath: "partnerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/partner" }),
  tagTypes: [
    "Hub",
    "Agreements",
    "Collaborations",
    "Referrals",
    "Resources",
    "Reports",
    "Messages",
  ],
  endpoints: (builder) => ({
    getHub: builder.query<PartnerHubResponse, void>({
      query: () => "/hub",
      providesTags: ["Hub"],
      pollingInterval: 60000,
    }),
    getAgreements: builder.query<AgreementListResponse, AgreementListQuery>({
      query: (params) => ({ url: "/agreements", params }),
      providesTags: ["Agreements"],
    }),
    signAgreement: builder.mutation<SignResponse, { id: string; body: SignAgreementBody }>({
      query: ({ id, body }) => ({ url: `/agreements/${id}/sign`, method: "POST", body }),
      invalidatesTags: ["Agreements"],
    }),
    getCollaborations: builder.query<CollaborationListResponse, CollaborationListQuery>({
      query: (params) => ({ url: "/collaborations", params }),
      providesTags: ["Collaborations"],
    }),
    createCollaboration: builder.mutation<CreatedResponse, CreateCollaborationBody>({
      query: (body) => ({ url: "/collaborations", method: "POST", body }),
      invalidatesTags: ["Collaborations"],
    }),
    updateCollaboration: builder.mutation<
      { id: string },
      { id: string; body: Partial<CollaborationUpdate> }
    >({
      query: ({ id, body }) => ({ url: `/collaborations/${id}`, method: "PUT", body }),
      invalidatesTags: ["Collaborations"],
    }),
    getReferrals: builder.query<ReferralListResponse, ReferralListQuery>({
      query: (params) => ({ url: "/referrals", params }),
      providesTags: ["Referrals"],
    }),
    createReferral: builder.mutation<CreatedResponse, CreateReferralBody>({
      query: (body) => ({ url: "/referrals", method: "POST", body }),
      invalidatesTags: ["Referrals"],
    }),
    getResources: builder.query<ResourceListResponse, ResourceListQuery>({
      query: (params) => ({ url: "/resources", params }),
      providesTags: ["Resources"],
    }),
    downloadResource: builder.mutation<{ downloadUrl: string }, string>({
      query: (id) => ({ url: `/resources/${id}/download`, method: "POST" }),
    }),
    getPerformanceReport: builder.query<PerformanceReportResponse, DateRangeQuery>({
      query: (params) => ({ url: "/reports/performance", params }),
      providesTags: ["Reports"],
    }),
    getMessages: builder.query<MessageListResponse, MessageListQuery>({
      query: (params) => ({ url: "/messages", params }),
      providesTags: ["Messages"],
    }),
    sendMessage: builder.mutation<CreatedResponse, SendMessageBody>({
      query: (body) => ({ url: "/messages", method: "POST", body }),
      invalidatesTags: ["Messages"],
    }),
  }),
});
```

## 12. Form Schemas (Zod)

### Agreement Signature

```typescript
export const agreementSignatureSchema = z.object({
  fullName: z.string().min(2, "Enter your full legal name").max(255),
  title: z.string().min(2, "Enter your title/role").max(255),
  authorityConfirmed: z.literal(true, {
    errorMap: () => ({ message: "You must confirm your authority to bind the organisation" }),
  }),
});
```

### New Collaboration

```typescript
export const collaborationCreateSchema = z
  .object({
    title: z.string().min(5).max(500),
    collaborationType: z.enum([
      "joint_programme",
      "co_branded_event",
      "research_project",
      "curriculum_development",
      "community_initiative",
      "workshop",
      "exchange_programme",
      "other",
    ]),
    agreementId: z.string().uuid().optional(),
    description: z.string().min(20).max(10000),
    objectives: z.string().min(20).max(5000),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    partnerLeadId: z.string().uuid(),
    ceaLeadId: z.string().uuid(),
    budgetTotal: z.number().positive().optional().nullable(),
    budgetPartnerContribution: z.number().positive().optional().nullable(),
    budgetCeaContribution: z.number().positive().optional().nullable(),
  })
  .refine((data) => !data.endDate || new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  .refine(
    (data) => {
      if (data.budgetTotal && data.budgetPartnerContribution && data.budgetCeaContribution) {
        return data.budgetPartnerContribution + data.budgetCeaContribution === data.budgetTotal;
      }
      return true;
    },
    { message: "Partner + CEA contributions must equal total budget", path: ["budgetTotal"] },
  );
```

### Submit Referral

```typescript
export const referralCreateSchema = z.object({
  referralType: z.enum(["student_candidate", "client", "partner"], {
    errorMap: () => ({ message: "Select referral type" }),
  }),
  referralName: z.string().min(2, "Name required").max(255),
  referralEmail: z.string().email("Valid email required"),
  referralPhone: z.string().optional(),
  referralCompany: z.string().optional(),
  relationshipNote: z.string().max(1000).optional(),
});
```

### Add Meeting Notes

```typescript
export const meetingNotesSchema = z.object({
  title: z.string().min(3).max(255),
  meetingDate: z.string().datetime(),
  participants: z.array(z.string()).min(1, "Add at least 1 participant"),
  notes: z.string().min(10).max(10000),
  actionItems: z
    .array(
      z.object({
        assignee: z.string(),
        item: z.string().min(1),
        dueDate: z.string().datetime().optional(),
      }),
    )
    .optional(),
});
```

### Add Deliverable

```typescript
export const deliverableCreateSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().max(2000).optional(),
  dueDate: z.string().datetime(),
  file: z.instanceof(File).optional(),
});
```

## 13. Analytics Events

| Event                             | Properties                                | Destination        |
| --------------------------------- | ----------------------------------------- | ------------------ |
| `partner_login`                   | `{ partner_id, user_role }`               | Amplitude          |
| `agreement_viewed`                | `{ agreement_id, type, status }`          | Amplitude          |
| `agreement_signed`                | `{ agreement_id, type, value }`           | Amplitude, CRM     |
| `agreement_amendment_viewed`      | `{ agreement_id, version }`               | Amplitude          |
| `collaboration_created`           | `{ collaboration_id, type, has_budget }`  | Amplitude          |
| `collaboration_activated`         | `{ collaboration_id, phase_count }`       | Amplitude          |
| `collaboration_progress_updated`  | `{ collaboration_id, progress, health }`  | Amplitude          |
| `collaboration_completed`         | `{ collaboration_id, duration_days }`     | Amplitude          |
| `collaboration_meeting_added`     | `{ collaboration_id, action_item_count }` | Amplitude          |
| `collaboration_deliverable_added` | `{ collaboration_id, deliverable_type }`  | Amplitude          |
| `referral_submitted`              | `{ referral_type }`                       | Amplitude          |
| `referral_converted`              | `{ referral_id, referral_type }`          | Amplitude, CRM     |
| `referral_commission_paid`        | `{ referral_id, amount }`                 | Amplitude, Finance |
| `resource_viewed`                 | `{ resource_id, category }`               | Amplitude          |
| `resource_downloaded`             | `{ resource_id, category, file_size }`    | Amplitude          |
| `report_viewed`                   | `{ report_type: 'performance'             | 'collaboration'    | 'referral' | 'financial' }` | Amplitude |
| `report_exported`                 | `{ report_type, format }`                 | Amplitude          |
| `partner_review_submitted`        | `{ overall_score }`                       | Amplitude          |
| `message_sent`                    | `{ has_collaboration_context }`           | Amplitude          |

## 14. Accessibility Requirements

### Screen Reader

- Agreement health → colour + icon + text label
- Collaboration progress → `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Timeline visualisations → `aria-label` describing data
- Stat cards → `aria-live="polite"`
- Meeting notes → `role="article"` per note

### Keyboard Navigation

- Tab through agreement sections, Enter to expand/collapse terms accordion
- Signature: Tab through name, title, checkbox, sign button in logical order
- Resource grid: Arrow keys to navigate cards, Enter to open detail
- Report tabs: Arrow keys to switch tabs
- All modals: Esc to close, Tab cycle

### Focus Management

- Page nav → focus to `<h1>`
- Modal open → focus to close button or first input
- Modal close → return to trigger
- Signature complete → focus to confirmation message

## 15. Error & Edge Case Catalog

### E1: Agreement Not Yet Active

- **Condition:** Partner tries to create collaboration under non-active agreement
- **Response:** "This agreement is not yet active. Collaborations can only be created under active agreements."
- **Recovery:** Show agreement status; link to view agreement

### E2: Agreement Expired

- **Condition:** Partner accesses expired agreement
- **Response:** "This agreement expired on {{date}}. Please contact your partnership manager for renewal options."
- **Recovery:** Show contact information for partnership manager; [Request Renewal] button

### E3: Referral Duplicate

- **Condition:** Partner submits referral with email already in system
- **Response:** "This person has already been referred. Referral not created."
- **Recovery:** Show existing referral status; link to view

### E4: Commission Not Yet Eligible

- **Condition:** Partner views commission that hasn't vested
- **Response:** "Commission for {{referral_name}} will be eligible after {{date}} (30-day retention period)."
- **Recovery:** Show countdown timer

### E5: Resource Tier Restriction

- **Condition:** Partner tries to access resource above their tier
- **Response:** "This resource is available for {{required_tier}} partners and above. Your current tier: {{current_tier}}."
- **Recovery:** [Upgrade Tier] contact link

### E6: Collaboration Budget Overrun

- **Condition:** Partner tries to add expense exceeding remaining budget
- **Response:** "This would exceed the remaining budget (${{remaining}}). Please reduce the amount or request a budget amendment."
- **Recovery:** Show remaining budget; [Request Amendment] button

### E7: Signature Authority Validation

- **Condition:** User without `can_sign_agreements` tries to sign
- **Response:** "You don't have permission to sign agreements. Please contact your organisation admin."
- **Recovery:** Show admin contact info

### E8: Referral Tracking Link Expired

- **Condition:** Referral link clicked after 12 months
- **Response:** "This referral link has expired. Please request a new referral code from the referrer."
- **Recovery:** Show partner organisation contact info

### E9: Collaboration Completion Requirements Not Met

- **Condition:** Partner tries to mark collaboration complete with incomplete tasks
- **Response:** "Cannot mark complete — {{pending_count}} tasks and {{overdue_deliverables}} deliverables are still pending."
- **Recovery:** Show list of incomplete items with links

### E10: Meeting Note Edit Conflict

- **Condition:** Two partner users edit same meeting notes simultaneously
- **Response:** "These meeting notes were updated by another user. Please refresh and review."
- **Recovery:** Refresh to show latest version; show diff if available
