# Actor: Client

## 1. Identity & Role Definition

- **ID:** `actor:client`
- **Display Name:** Client
- **Description:** Business client who purchases services from Cyber Elias Academy (corporate training, consulting, recruitment, custom programmes). Manages proposals, projects, invoices, support tickets, contracts, and documents through a dedicated client portal.
- **System Persona:** External B2B customer. Needs clear visibility into project status, financial transactions, and support. Self-service oriented with minimal friction. High expectation of professionalism and transparency.
- **Authentication Level:** Tier 2 — requires TOTP MFA (Google Authenticator / Authy). Optional SSO (SAML/OIDC) for enterprise clients.
- **Session Timeout:** 30 minutes of inactivity.
- **Default Landing:** `/client/portal`

## 2. Primary Goals & Success KPIs

| Goal                                  | KPI                        | Target   | Measurement     |
| ------------------------------------- | -------------------------- | -------- | --------------- |
| Fast proposal-to-project turnaround   | Proposal acceptance rate   | >60%     | CRM             |
| Real-time project visibility          | Portal login frequency     | >2x/week | Analytics       |
| On-time project delivery satisfaction | Projects on schedule       | >90%     | PM system       |
| Hassle-free billing experience        | Invoice dispute rate       | <2%      | Finance DB      |
| Responsive support                    | Ticket first-response time | <4h      | Support system  |
| Contract compliance                   | Signed contracts rate      | 100%     | Document system |
| Client retention                      | Repeat engagement rate     | >70%     | CRM             |

## 3. Complete Screen Inventory

### 3.1 Client Portal Home — `/client/portal`

**Wireframe:** Top hero banner with welcome message + quick stats row: Active Projects, Open Invoices, Pending Proposals, Open Tickets. Below: two-column layout — Left (wider): Recent Activity feed + Quick Actions. Right (sidebar): Upcoming Milestones calendar, Support Quick-Contact card, Resource links.

**UI Fields/Components:**

- `WelcomeBanner` — `Hello, {{company_name}}!` with CTA button based on most urgent action
- `StatCard` × 4 — icon, count, label, trend arrow, link to full view
- `ActivityFeed` — icon per type (proposal, project, invoice, ticket, contract, document), timestamp, summary, link
- `MilestoneTimeline` — next 3 upcoming project milestones with date, project name, status
- `QuickActions` — [New Proposal Request] [Submit Ticket] [Upload Document] [Make Payment] [Schedule Meeting]
- `SupportCard` — "Need help? Contact your account manager" with name, photo, email, phone, "Send Message" button
- `ResourceLinks` — Knowledge base, API docs, Training catalog, FAQ

**States:**

- **Loading:** Skeleton for stat cards, shimmer for feed
- **Empty (new client):** "Welcome to the CEA Client Portal! To get started, request a proposal for your first project."
- **Empty (no activity):** "No recent activity. Your projects and interactions will appear here."
- **Error:** "Unable to load portal data. [Retry]" — each section degrades independently
- **Edge Cases:** Multiple active projects from different departments shown together; milestone overdue highlighted in red

### 3.2 Proposals — `/client/proposals`

**Wireframe:** Top bar: [New Proposal Request] button + search bar + filter chips (status: Draft, Sent, Under Review, Accepted, Declined, Expired). Main: card list view (default) or table toggle. Each card: title, status badge, value, date, department, preview snippet. Click → opens ProposalDetail.

**Proposal Detail View:**

- Header: title, status, reference number (e.g., `PROP-2026-0042`), created date, valid until
- Body: scope of work (rich text), deliverables list, timeline table (phase, description, dates, cost)
- Pricing table: line items (description, qty, unit price, total), subtotal, tax, discount, grand total
- Terms & conditions (collapsible)
- Action bar: [Accept] [Decline] [Request Revision] [Download PDF] [Share] — depending on status

**States:**

- **Loading:** Card skeleton list
- **Empty:** "No proposals yet. Click 'New Proposal Request' to get started."
- **Empty (filtered):** "No proposals match your filters. [Clear Filters]"
- **Error:** "Proposal data unavailable. [Retry]"

### 3.3 Project Dashboard — `/client/projects/[id]`

**Wireframe:** Top: project name, status badge, client reference number. Horizontal tabs: [Overview] [Timeline] [Team] [Deliverables] [Budget] [Files] [Messages].

**Overview Tab:**

- Project KPIs: progress % (ring chart), days elapsed / remaining, budget used %
- Status timeline (vertical): key milestones with dates, completion status
- Current phase card: phase name, description, start/end dates, % complete
- Next deliverable card: name, due date, assignee, status

**Timeline Tab:**

- Gantt chart: phases / tasks as horizontal bars, dependency arrows, milestones as diamonds
- Legend: colour-coded by status (not started, in progress, completed, delayed)
- Zoom controls: day/week/month view

**Team Tab:**

- Team roster: photo, name, role, email, availability status
- Contact buttons: [Send Message] [Schedule Meeting]
- Org chart overlay for larger teams

**Deliverables Tab:**

- Table: Deliverable | Description | Due Date | Status | Assigned To | Files | Actions
- Status: Not Started / In Progress / Submitted / Approved / Rejected
- Download submitted deliverables as ZIP
- Revision request button

**Budget Tab:**

- Budget breakdown: total, used, remaining
- Cost table by phase / category
- Timesheet summary (hours logged by team member)
- Pending expenses list

**Files Tab:**

- Folder structure (project documents, deliverables, contracts, invoices, meeting notes)
- File list: name, size, type, uploaded by, date, download icon
- Upload button (drag & drop)

**Messages Tab:**

- Threaded conversation with project team
- Message bubble: sender, avatar, timestamp, content, attachments
- Reply field with file attachment support

**States:**

- **Loading:** Skeleton per tab
- **Empty (overview):** "Project data loading..."
- **Empty (deliverables):** "No deliverables defined yet."
- **Empty (files):** "No files uploaded yet. Drag & drop to share."
- **Empty (messages):** "No messages yet. Start a conversation with your project team."
- **Error:** Per-tab error with retry
- **Edge Cases:** Project completed → congratulations banner with "Leave a Review" CTA; Project on hold → yellow banner "Project is on hold pending [reason]"

### 3.4 Task Board — `/client/projects/[id]/tasks`

**Wireframe:** Kanban board (columns: To Do, In Progress, Under Review, Done). Cards: title, assignee avatar, due date, priority label, attachment count, comment count. Drag & drop to change status. Top bar: [Create Task] [Filter] [Search] [View: Board/List].

**Task Detail Modal (click card):**

- Title, description (rich text), priority (low/medium/high/critical), status
- Assignee, reporter, due date, created date, last updated
- Checklist (sub-tasks with checkboxes)
- Comments thread
- Attachment list
- Activity log
- [Edit] [Delete] [Change Status] buttons

**States:**

- **Loading:** Board skeleton with empty columns
- **Empty:** "No tasks yet. Create your first task to get started."
- **Error:** "Task board unavailable. [Retry]"

### 3.5 Invoices & Payments — `/client/invoices`

**Wireframe:** Top: outstanding balance card (total due), payment method card (saved card/bank), [Make Payment] button. Below: table — Invoice # | Date | Due Date | Description | Amount | Status (Paid/Unpaid/Overdue/Partially Paid) | [View] [Download PDF] [Pay Now].

**Invoice Detail View:**

- Header: invoice number, invoice date, due date, payment terms, status
- From/To addresses
- Line items: description, qty, unit price, amount
- Summary: subtotal, tax (rate + amount), discount, shipping, total
- Payment history table: date, method, amount, reference
- [Pay Now] [Download PDF] [Print] [Dispute]

**Payment Modal:**

- Amount (pre-filled from invoice, editable for partial)
- Payment method selector (saved card, bank transfer, new card)
- Card form: number, expiry, CVC, name on card (Stripe Elements)
- Billing address
- [Pay $X] button
- "Secured by Stripe" badge

**States:**

- **Loading:** Skeleton table
- **Empty:** "No invoices yet. Invoices will appear here when your projects are billed."
- **Empty (paid all):** "All invoices paid. Great job!" with green checkmark
- **Error:** "Invoice data unavailable. [Retry]"
- **Edge Cases:** Overdue invoice → red row highlight + late fee line; Partially paid → yellow row; Invoice with credit note → negative line item

### 3.6 Support Tickets — `/client/support`

**Wireframe:** Top: [New Ticket] button + search + filter chips (Open, In Progress, Waiting on Client, Resolved, Closed). List view: ticket ID, subject, status badge, priority, last updated, assigned agent. Click → TicketDetail.

**Ticket Detail View:**

- Header: ID, subject, status, priority, created date
- Description (original request)
- Comment thread (agent + client messages), with file attachments
- Response time SLA shown: "First response within 4 hours"
- [Reply] [Close Ticket] [Reopen] buttons
- Satisfaction survey (when resolved): 1-5 stars + optional comment

**New Ticket Form:**

- Subject (required)
- Category: dropdown (Billing, Technical, Project, General, Complaint)
- Priority: low/medium/high/critical
- Description: rich text (required, min 20 chars)
- Attachment upload (max 5 files, 10MB each)
- [Submit] [Cancel]

**States:**

- **Loading:** Skeleton list
- **Empty:** "No support tickets. We're here to help! Click 'New Ticket' to get started."
- **Error:** "Support system unavailable. [Retry]"

### 3.7 Contracts — `/client/contracts`

**Wireframe:** List: contract title, type (MSA, SOW, NDA, License), status (Draft, Pending Signature, Active, Expired, Terminated), start/end dates, value. Click → ContractDetail.

**Contract Detail View:**

- Header: title, reference number, type, status, dates
- Parties: Client Company (with address, tax ID) + CEA (with address, tax ID)
- Key terms (collapsible sections): scope, duration, termination, payment, confidentiality, IP, liability
- Signature status: [Client] Pending / Signed (date) | [CEA] Pending / Signed (date)
- [Sign Now] [Download PDF] [Request Amendment] buttons
- Amendment history table: version, date, description, signed by

**E-Signature Modal:**

- Review document summary
- Name field (typed signature — legal name)
- Checkbox: "I agree to the terms and conditions"
- [Sign Document] button
- Audit trail: IP address, timestamp, browser fingerprint

**States:**

- **Loading:** Skeleton
- **Empty:** "No contracts yet. Contracts will appear when engagements are formalised."
- **Error:** "Contract data unavailable. [Retry]"
- **Edge Cases:** Expired contract → red badge with [Renew] CTA; Contract pending client signature → yellow badge with urgency indicator

### 3.8 Documents — `/client/documents`

**Wireframe:** Folder tree (left sidebar) + file list (right). Supported views: Grid / List. Top: [Upload] [New Folder] [Search] breadcrumb nav. File card: icon by type, name, size, modified date, modified by, [Download] [Share] [Delete].

**Document Preview Modal:**

- Inline preview for PDF, images, text, markdown, video (HLS), audio
- Download button
- Share link generation (time-limited, password optional)
- Version history (if applicable)

**States:**

- **Loading:** Skeleton file list
- **Empty (folder):** "This folder is empty. Upload files or create a new folder."
- **Empty (no root):** "No documents yet. Upload your first document to get started."
- **Error:** "Document service unavailable. [Retry]"

### 3.9 Messaging — `/client/messages`

**Wireframe:** Left: conversation list (avatar, name/company, last message preview, unread count badge, timestamp). Right: chat area with message thread. Top: search conversations.

**Chat View:**

- Message bubbles: sender, avatar, text, timestamp, read receipts (✓✓)
- File/image attachment support (thumbnail previews)
- Emoji picker
- Typing indicator
- [Send] button (Enter to send, Shift+Enter for newline)
- Conversation info panel: participants, shared files, pinned messages

**States:**

- **Loading:** Skeleton chat
- **Empty (no conversations):** "No conversations yet. Messages from your project team will appear here."
- **Error:** "Messaging service unavailable. [Retry]"

## 4. Full Database Schema

### Table: `clients`

```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255) NOT NULL,
  legal_name VARCHAR(500) NOT NULL,
  tax_id VARCHAR(100),
  registration_number VARCHAR(100),
  industry VARCHAR(100),
  company_size VARCHAR(20) CHECK (company_size IN ('1-10','11-50','51-200','201-1000','1000+')),
  website VARCHAR(500),
  phone VARCHAR(50),
  billing_address_line1 VARCHAR(255),
  billing_address_line2 VARCHAR(255),
  billing_city VARCHAR(100),
  billing_state VARCHAR(100),
  billing_zip VARCHAR(20),
  billing_country VARCHAR(100),
  shipping_address_same_as_billing BOOLEAN DEFAULT true,
  shipping_address_line1 VARCHAR(255),
  shipping_address_line2 VARCHAR(255),
  shipping_city VARCHAR(100),
  shipping_state VARCHAR(100),
  shipping_zip VARCHAR(20),
  shipping_country VARCHAR(100),
  primary_contact_id UUID REFERENCES auth_users(id),
  account_manager_id UUID REFERENCES auth_users(id),
  payment_terms VARCHAR(50) DEFAULT 'net30' CHECK (payment_terms IN ('due_on_receipt','net15','net30','net45','net60','net90')),
  currency VARCHAR(3) DEFAULT 'USD',
  credit_limit DECIMAL(15,2),
  current_balance DECIMAL(15,2) DEFAULT 0,
  lifetime_value DECIMAL(15,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','inactive','suspended','closed')),
  onboarding_completed BOOLEAN DEFAULT false,
  portal_language VARCHAR(10) DEFAULT 'en',
  portal_theme VARCHAR(20) DEFAULT 'light',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_clients_account_manager (account_manager_id),
  INDEX idx_clients_status (status),
  INDEX idx_clients_created (created_at DESC)
);
```

### Table: `client_users`

```sql
CREATE TABLE client_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin','billing','project_viewer','signatory','viewer')),
  is_primary_contact BOOLEAN DEFAULT false,
  can_approve_proposals BOOLEAN DEFAULT false,
  can_sign_contracts BOOLEAN DEFAULT false,
  can_make_payments BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(client_id, user_id),
  INDEX idx_client_users_client (client_id),
  INDEX idx_client_users_user (user_id)
);
```

### Table: `proposals`

```sql
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number VARCHAR(50) NOT NULL UNIQUE,
  client_id UUID NOT NULL REFERENCES clients(id),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  scope_of_work TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','sent','under_review','accepted','declined','expired','revised')),
  version INT NOT NULL DEFAULT 1,
  currency VARCHAR(3) DEFAULT 'USD',
  subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
  tax_rate DECIMAL(5,2) DEFAULT 0,
  tax_amount DECIMAL(15,2) DEFAULT 0,
  discount_percent DECIMAL(5,2) DEFAULT 0,
  discount_amount DECIMAL(15,2) DEFAULT 0,
  total DECIMAL(15,2) NOT NULL DEFAULT 0,
  valid_until DATE NOT NULL,
  terms_and_conditions TEXT,
  created_by UUID NOT NULL REFERENCES auth_users(id),
  accepted_by UUID REFERENCES auth_users(id),
  accepted_at TIMESTAMPTZ,
  declined_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_proposals_client (client_id),
  INDEX idx_proposals_status (status),
  INDEX idx_proposals_created (created_at DESC)
);
```

### Table: `proposal_line_items`

```sql
CREATE TABLE proposal_line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  description VARCHAR(500) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(15,2) NOT NULL,
  unit VARCHAR(50) DEFAULT 'unit',
  total DECIMAL(15,2) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_proposal_items_proposal (proposal_id)
);
```

### Table: `proposal_revisions`

```sql
CREATE TABLE proposal_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  version INT NOT NULL,
  requested_by UUID REFERENCES auth_users(id),
  reason TEXT NOT NULL,
  changes_summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_proposal_revisions_proposal (proposal_id)
);
```

### Table: `projects`

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES proposals(id),
  client_id UUID NOT NULL REFERENCES clients(id),
  name VARCHAR(500) NOT NULL,
  description TEXT,
  reference_number VARCHAR(50) NOT NULL UNIQUE,
  status VARCHAR(30) NOT NULL DEFAULT 'planning' CHECK (status IN (
    'planning','in_progress','on_hold','completed','cancelled'
  )),
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low','medium','high','critical')),
  start_date DATE,
  end_date DATE,
  estimated_hours DECIMAL(10,2),
  actual_hours DECIMAL(10,2) DEFAULT 0,
  budget DECIMAL(15,2),
  budget_used DECIMAL(15,2) DEFAULT 0,
  progress_percentage DECIMAL(5,2) DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  project_manager_id UUID REFERENCES auth_users(id),
  department_lead_id UUID REFERENCES auth_users(id),
  client_health VARCHAR(20) DEFAULT 'green' CHECK (client_health IN ('green','amber','red')),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_projects_client (client_id),
  INDEX idx_projects_status (status),
  INDEX idx_projects_pm (project_manager_id)
);
```

### Table: `project_phases`

```sql
CREATE TABLE project_phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sort_order INT NOT NULL,
  start_date DATE,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','completed','delayed')),
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_project_phases_project (project_id)
);
```

### Table: `deliverables`

```sql
CREATE TABLE deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES project_phases(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','submitted','approved','rejected')),
  assigned_to UUID REFERENCES auth_users(id),
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  file_key VARCHAR(500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_deliverables_project (project_id),
  INDEX idx_deliverables_phase (phase_id),
  INDEX idx_deliverables_status (status)
);
```

### Table: `invoices`

```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number VARCHAR(50) NOT NULL UNIQUE,
  client_id UUID NOT NULL REFERENCES clients(id),
  project_id UUID REFERENCES projects(id),
  proposal_id UUID REFERENCES proposals(id),
  status VARCHAR(30) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','sent','paid','overdue','partially_paid','cancelled','refunded','disputed')),
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  paid_date DATE,
  payment_terms VARCHAR(50) DEFAULT 'net30',
  currency VARCHAR(3) DEFAULT 'USD',
  subtotal DECIMAL(15,2) NOT NULL,
  tax_rate DECIMAL(5,2) DEFAULT 0,
  tax_amount DECIMAL(15,2) DEFAULT 0,
  discount_amount DECIMAL(15,2) DEFAULT 0,
  total DECIMAL(15,2) NOT NULL,
  amount_paid DECIMAL(15,2) DEFAULT 0,
  balance_due DECIMAL(15,2) GENERATED ALWAYS AS (total - amount_paid) STORED,
  late_fee DECIMAL(15,2) DEFAULT 0,
  notes TEXT,
  invoice_pdf_key VARCHAR(500),
  stripe_invoice_id VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_invoices_client (client_id),
  INDEX idx_invoices_status (status),
  INDEX idx_invoices_due (due_date),
  INDEX idx_invoices_project (project_id)
);
```

### Table: `invoice_line_items`

```sql
CREATE TABLE invoice_line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description VARCHAR(500) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(15,2) NOT NULL,
  total DECIMAL(15,2) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_invoice_items_invoice (invoice_id)
);
```

### Table: `payments`

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id),
  client_id UUID NOT NULL REFERENCES clients(id),
  amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('credit_card','bank_transfer','ach','wire','check','internal')),
  payment_reference VARCHAR(255),
  stripe_payment_intent_id VARCHAR(100),
  stripe_charge_id VARCHAR(100),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','completed','failed','refunded','partially_refunded')),
  failure_reason TEXT,
  paid_by UUID REFERENCES auth_users(id),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_payments_invoice (invoice_id),
  INDEX idx_payments_client (client_id),
  INDEX idx_payments_status (status)
);
```

### Table: `support_tickets`

```sql
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number VARCHAR(20) NOT NULL UNIQUE,
  client_id UUID NOT NULL REFERENCES clients(id),
  subject VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('billing','technical','project','general','complaint')),
  priority VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low','medium','high','critical')),
  status VARCHAR(30) NOT NULL DEFAULT 'open' CHECK (status IN ('open','in_progress','waiting_on_client','resolved','closed')),
  assigned_to UUID REFERENCES auth_users(id),
  created_by UUID NOT NULL REFERENCES auth_users(id),
  resolved_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,
  satisfaction_score INT CHECK (satisfaction_score >= 1 AND satisfaction_score <= 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_tickets_client (client_id),
  INDEX idx_tickets_status (status),
  INDEX idx_tickets_priority (priority),
  INDEX idx_tickets_assigned (assigned_to)
);
```

### Table: `ticket_comments`

```sql
CREATE TABLE ticket_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth_users(id),
  content TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_ticket_comments_ticket (ticket_id)
);
```

### Table: `contracts`

```sql
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_number VARCHAR(50) NOT NULL UNIQUE,
  client_id UUID NOT NULL REFERENCES clients(id),
  title VARCHAR(500) NOT NULL,
  contract_type VARCHAR(50) NOT NULL CHECK (contract_type IN ('msa','sow','nda','license','partnership','service_level')),
  status VARCHAR(30) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','pending_client','pending_cea','active','expired','terminated')),
  start_date DATE,
  end_date DATE,
  value DECIMAL(15,2),
  currency VARCHAR(3) DEFAULT 'USD',
  auto_renew BOOLEAN DEFAULT false,
  renewal_term_days INT,
  client_signed_at TIMESTAMPTZ,
  cea_signed_at TIMESTAMPTZ,
  client_signed_by UUID REFERENCES auth_users(id),
  cea_signed_by UUID REFERENCES auth_users(id),
  client_signature_ip VARCHAR(45),
  cea_signature_ip VARCHAR(45),
  document_key VARCHAR(500) NOT NULL,
  document_hash VARCHAR(64) NOT NULL,
  terms_summary TEXT,
  created_by UUID NOT NULL REFERENCES auth_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_contracts_client (client_id),
  INDEX idx_contracts_status (status),
  INDEX idx_contracts_type (contract_type)
);
```

### Table: `contract_amendments`

```sql
CREATE TABLE contract_amendments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  version INT NOT NULL,
  description TEXT NOT NULL,
  changes TEXT NOT NULL,
  document_key VARCHAR(500),
  signed_by_cea UUID REFERENCES auth_users(id),
  signed_by_client UUID REFERENCES auth_users(id),
  signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_contract_amendments_contract (contract_id)
);
```

### Table: `client_documents`

```sql
CREATE TABLE client_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id),
  folder_id UUID REFERENCES client_folders(id),
  name VARCHAR(255) NOT NULL,
  file_key VARCHAR(500) NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  version INT NOT NULL DEFAULT 1,
  uploaded_by UUID NOT NULL REFERENCES auth_users(id),
  is_shared BOOLEAN DEFAULT false,
  share_token VARCHAR(100),
  share_expires_at TIMESTAMPTZ,
  share_password_hash VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_client_documents_client (client_id),
  INDEX idx_client_documents_project (project_id),
  INDEX idx_client_documents_folder (folder_id)
);
```

### Table: `client_folders`

```sql
CREATE TABLE client_folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES client_folders(id),
  name VARCHAR(255) NOT NULL,
  created_by UUID NOT NULL REFERENCES auth_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(client_id, parent_id, name),
  INDEX idx_client_folders_parent (parent_id),
  INDEX idx_client_folders_client (client_id)
);
```

### Table: `client_messages`

```sql
CREATE TABLE client_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id),
  sender_id UUID NOT NULL REFERENCES auth_users(id),
  content TEXT NOT NULL,
  has_attachments BOOLEAN DEFAULT false,
  reply_to UUID REFERENCES client_messages(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_client_messages_client (client_id),
  INDEX idx_client_messages_project (project_id),
  INDEX idx_client_messages_sender (sender_id),
  INDEX idx_client_messages_created (created_at DESC)
);
```

### Table: `client_message_attachments`

```sql
CREATE TABLE client_message_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES client_messages(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_key VARCHAR(500) NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Table: `client_message_read_receipts`

```sql
CREATE TABLE client_message_read_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES client_messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth_users(id),
  read_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(message_id, user_id)
);
```

### Table: `payment_methods`

```sql
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  stripe_payment_method_id VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('card','bank_account')),
  brand VARCHAR(50),
  last_four VARCHAR(4),
  exp_month INT,
  exp_year INT,
  cardholder_name VARCHAR(255),
  billing_zip VARCHAR(20),
  is_default BOOLEAN DEFAULT false,
  is_expired BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_payment_methods_client (client_id)
);
```

## 5. Complete API Contract

### 5.1 Client Portal

```
GET /api/v1/client/portal
Auth: Client (all roles)
Response: {
  companyName: string;
  stats: { activeProjects: number; openInvoices: number; pendingProposals: number; openTickets: number };
  recentActivity: Array<{ id, type, summary, entityType, entityId, createdAt }>;
  upcomingMilestones: Array<{ id, projectName, milestone, dueDate, status }>;
  accountManager: { id, name, email, phone, photoUrl };
  hasUnreadMessages: boolean;
}
```

### 5.2 Proposals

```
GET /api/v1/client/proposals
Query: status?, sort_by, order, page, limit, search
Auth: Client (admin, billing, project_viewer)
Response: { data: Array<{
  id, referenceNumber, title, status, total, currency, validUntil,
  createdBy: { name }, createdAt, revisionCount
}>, pagination }

GET /api/v1/client/proposals/:id
Auth: Client (admin, billing, project_viewer)
Response: Full proposal with line items, revisions, terms

POST /api/v1/client/proposals/:id/accept
Auth: Client (can_approve_proposals=true)
Body: { acceptedBy: UUID }
Response: { status: 'accepted', acceptedAt }

POST /api/v1/client/proposals/:id/decline
Body: { reason: string (required, min 10 chars) }
Response: { status: 'declined' }

POST /api/v1/client/proposals/:id/request-revision
Body: { reason: string (required), changesRequested: string }
Response: { status: 'revised', version incremented }
```

### 5.3 Projects

```
GET /api/v1/client/projects
Query: status?, page, limit, sort_by
Auth: Client (all roles)
Response: { data: Array<{
  id, referenceNumber, name, status, priority, progressPercentage,
  startDate, endDate, projectManager: { name, email },
  clientHealth, budget, budgetUsed
}>, pagination }

GET /api/v1/client/projects/:id
Auth: Client (all roles)
Response: Full project with phases, team, budget summary

GET /api/v1/client/projects/:id/overview
Response: { kpis: { progress, daysElapsed, daysRemaining, budgetUsedPct }, currentPhase, nextDeliverable, milestones: Array<{...}> }

GET /api/v1/client/projects/:id/timeline
Response: Array<{ phaseId, name, startDate, endDate, status, progress, tasks: Array<{...}> }>

GET /api/v1/client/projects/:id/team
Response: Array<{ userId, name, role, email, photoUrl, availability }>

GET /api/v1/client/projects/:id/deliverables
Query: status?, page, limit
Response: { data: Array<{ id, name, description, dueDate, status, assignedTo, hasFiles }>, pagination }

GET /api/v1/client/projects/:id/budget
Response: { total, used, remaining, byPhase: Array<{ phase, budget, spent }>, expenses: Array<{...}>, timesheetSummary: { totalHours, hoursByMember: Array<{...}> } }

GET /api/v1/client/projects/:id/files
Query: folder_id?
Response: Array<{ id, name, fileSize, mimeType, uploadedBy, createdAt, downloadUrl }>

POST /api/v1/client/projects/:id/files/upload
Body: multipart/form-data with file
Response: { id, name, downloadUrl }

GET /api/v1/client/projects/:id/messages
Query: cursor?, limit
Response: { data: Array<{ id, sender: { id, name, role }, content, hasAttachments, createdAt, readBy }>, nextCursor?, hasMore }

POST /api/v1/client/projects/:id/messages
Body: { content: string, attachments?: File[] }
Response: { id, createdAt }
```

### 5.4 Tasks (Kanban)

```
GET /api/v1/client/projects/:projectId/tasks
Query: status?, assignee?, priority?, label?, page, limit
Auth: Client (project_viewer or higher)
Response: { data: Array<{
  id, title, description, status, priority, dueDate, assignee: { id, name, photoUrl },
  reporter: { id, name }, attachmentCount, commentCount, checklistProgress
}>, pagination }

GET /api/v1/client/projects/:projectId/tasks/board
Response: {
  todo: Array<TaskCard>,
  inProgress: Array<TaskCard>,
  underReview: Array<TaskCard>,
  done: Array<TaskCard>
}

PUT /api/v1/client/projects/:projectId/tasks/:taskId/status
Body: { status: string }
Auth: Client (can edit project)
Response: { id, status, updatedAt }

POST /api/v1/client/projects/:projectId/tasks
Body: { title, description?, priority?, dueDate?, assigneeId? }
Response: { id, createdAt }
```

### 5.5 Invoices & Payments

```
GET /api/v1/client/invoices
Query: status?, project_id?, from, to, page, limit, sort_by
Auth: Client (admin, billing)
Response: { data: Array<{
  id, invoiceNumber, invoiceDate, dueDate, description, total, amountPaid, balanceDue, status, lateFee, pdfUrl
}>, pagination, summary: { totalOutstanding, overdueAmount, totalPaid } }

GET /api/v1/client/invoices/:id
Response: Full invoice with line items, payment history, pdfUrl

POST /api/v1/client/invoices/:id/pay
Body: { amount: number, paymentMethodId: UUID }
Auth: Client (can_make_payments=true)
Response: { paymentId, status: 'processing' | 'completed' | 'failed', redirectUrl? (for 3DS) }

GET /api/v1/client/payment-methods
Response: Array<{ id, type, brand, lastFour, expMonth, expYear, isDefault }>

POST /api/v1/client/payment-methods
Body: { stripePaymentMethodId: string, isDefault?: boolean }
Response: { id, createdAt }

DELETE /api/v1/client/payment-methods/:id
Response: { success: true }

GET /api/v1/client/invoices/:id/dispute
Body: { reason: string (required), details?: string }
Response: { status: 'disputed', createdAt }
```

### 5.6 Support Tickets

```
GET /api/v1/client/support/tickets
Query: status?, category?, priority?, page, limit, search
Auth: Client (all roles)
Response: { data: Array<{ id, ticketNumber, subject, status, priority, category, assignedTo: { name }, lastUpdated, createdAt }>, pagination }

GET /api/v1/client/support/tickets/:id
Response: Full ticket with comments (both client and agent), attachments

POST /api/v1/client/support/tickets
Body: { subject, category, priority?, description, attachments?: File[] }
Response: { id, ticketNumber, createdAt }

POST /api/v1/client/support/tickets/:id/reply
Body: { content: string, attachments?: File[] }
Response: { id, createdAt }

POST /api/v1/client/support/tickets/:id/close
Response: { status: 'closed', closedAt }

POST /api/v1/client/support/tickets/:id/reopen
Response: { status: 'open', updatedAt }

POST /api/v1/client/support/tickets/:id/satisfaction
Body: { score: 1-5, comment?: string }
Response: { success: true }
```

### 5.7 Contracts

```
GET /api/v1/client/contracts
Query: status?, type?, page, limit
Auth: Client (admin, signatory)
Response: { data: Array<{ id, contractNumber, title, type, status, startDate, endDate, value, currency, clientSignedAt, ceaSignedAt }>, pagination }

GET /api/v1/client/contracts/:id
Response: Full contract with terms, signature status, amendments

POST /api/v1/client/contracts/:id/sign
Body: { fullName: string (legal name), agreedToTerms: boolean }
Auth: Client (can_sign_contracts=true)
Response: { status: 'pending_cea' | 'active', signedAt, auditData: { ipAddress, userAgent, timestamp } }
```

### 5.8 Documents

```
GET /api/v1/client/documents
Query: folder_id?, project_id?, sort_by, page, limit
Auth: Client (all roles)
Response: { folders: Array<{ id, name, parentId, itemCount }>, files: Array<{ id, name, fileSize, mimeType, uploadedBy, version, createdAt, downloadUrl }>, pagination }

POST /api/v1/client/documents/folders
Body: { name: string, parentId?: UUID }
Response: { id, name, createdAt }

POST /api/v1/client/documents/upload
Body: multipart/form-data with file + folderId?
Response: { id, name, downloadUrl }

GET /api/v1/client/documents/:id/download
Response: File stream with Content-Disposition

POST /api/v1/client/documents/:id/share
Body: { expiresInHours?: number, password?: string }
Response: { shareUrl: string, shareToken: string, expiresAt }
```

### 5.9 Messaging

```
GET /api/v1/client/messages/conversations
Query: project_id?
Auth: Client (all roles)
Response: Array<{ conversationId, projectId?, projectName?, participants: Array<{ id, name, photoUrl }>, lastMessage: { preview, timestamp, senderName }, unreadCount }>

GET /api/v1/client/messages/conversations/:conversationId
Query: cursor?, limit
Response: { data: Array<{ id, sender: { id, name, role, photoUrl }, content, hasAttachments, attachments: Array<{...}>, createdAt, readBy: Array<{ userId, readAt }> }>, nextCursor?, hasMore }

POST /api/v1/client/messages/conversations/:conversationId
Body: { content: string, attachments?: File[] }
Response: { id, createdAt }
```

## 6. Component Tree

```
ClientShell
 ├── ClientSidebar
 │   ├── SidebarLogo (CEA logo + "Client Portal" text)
 │   ├── SidebarNavItem (Portal, Proposals, Projects, Invoices, Support, Contracts, Documents, Messages)
 │   ├── SidebarCompanyInfo (company name, industry)
 │   └── SidebarProfileMenu (avatar, name, role, settings, logout)
 ├── ClientTopbar
 │   ├── WelcomeText ("Hello, {{company}}")
 │   ├── SearchBar (global search across proposals, projects, invoices, tickets, documents)
 │   ├── NotificationBell (unread notifications, messages)
 │   └── UserMenu (profile, account settings, help, logout)
 └── MainContent

Pages:
 ├── PortalPage
 │   ├── WelcomeBanner
 │   │   └── CTAActionButton (based on most urgent item)
 │   ├── StatCardRow
 │   │   └── StatCard × 4 (icon, count, label, onClick link)
 │   ├── RecentActivityFeed
 │   │   └── ActivityItem (icon, summary, timestamp, link)
 │   ├── MilestoneTimeline
 │   │   └── MilestoneItem (dot, title, date, status indicator)
 │   ├── QuickActionGrid
 │   │   └── QuickActionCard (icon, label, onClick)
 │   ├── SupportContactCard
 │   └── ResourceLinks

 ├── ProposalsPage
 │   ├── ProposalFilters
 │   │   ├── SearchBar
 │   │   ├── StatusFilterChips
 │   │   ├── SortSelector
 │   │   └── NewProposalRequestButton
 │   ├── ProposalListView / ProposalGridView toggle
 │   │   └── ProposalCard (title, status badge, value, date, dept, onClick)
 │   └── ProposalDetailModal / Page
 │       ├── ProposalHeader (ref number, status badge, dates)
 │       ├── ProposalContent (scope, deliverables, timeline)
 │       ├── PricingTable (line items, totals)
 │       ├── TermsAndConditions (collapsible)
 │       └── ProposalActions (Accept, Decline, Request Revision, Download PDF)

 ├── ProjectListPage
 │   ├── ProjectTable (sortable columns: name, status, progress, dates, PM)
 │   └── ProjectCard (for mobile)

 ├── ProjectDetailPage
 │   ├── ProjectHeader (name, status, ref number, actions)
 │   ├── ProjectTabs
 │   │   ├── OverviewTab
 │   │   │   ├── KPIRingChart (progress, days, budget)
 │   │   │   ├── MilestoneTimeline
 │   │   │   ├── CurrentPhaseCard
 │   │   │   └── NextDeliverableCard
 │   │   ├── TimelineTab
 │   │   │   ├── GanttChart (interactive, zoomable)
 │   │   │   └── TimelineLegend
 │   │   ├── TeamTab
 │   │   │   ├── TeamMemberCard (photo, name, role, contact buttons)
 │   │   │   └── TeamOrgChart
 │   │   ├── DeliverablesTab
 │   │   │   ├── DeliverableTable (sortable, filterable)
 │   │   │   └── DeliverableDetailModal
 │   │   ├── BudgetTab
 │   │   │   ├── BudgetSummaryCard
 │   │   │   ├── BudgetByPhaseChart
 │   │   │   ├── ExpenseTable
 │   │   │   └── TimesheetSummary
 │   │   ├── FilesTab
 │   │   │   ├── FolderTree
 │   │   │   ├── FileList
 │   │   │   └── FileUploader (drag-and-drop)
 │   │   └── MessagesTab
 │   │       ├── MessageThread
 │   │       │   └── MessageBubble (sender, content, timestamp, read receipt)
 │   │       └── MessageComposer (textarea, file attach, send button)
 │   └── ProjectActionMenu (dropdown: report issue, request change, etc.)

 ├── TaskBoardPage
 │   ├── TaskBoardToolbar (Create Task, Filter, Search, View toggle)
 │   ├── KanbanBoard
 │   │   └── KanbanColumn (header + card list)
 │   │       └── TaskCard (title, assignee, due date, priority, attachments count)
 │   ├── TaskListView
 │   │   └── TaskTable (sortable, filterable)
 │   └── TaskDetailModal
 │       ├── TaskHeader (title, status, priority)
 │       ├── TaskDescription (rich text)
 │       ├── Checklist (sub-tasks)
 │       ├── CommentThread
 │       ├── AttachmentList
 │       └── ActivityLog

 ├── InvoicesPage
 │   ├── OutstandingBalanceCard (amount due, [Pay All] button)
 │   ├── PaymentMethodCard (saved method, [Manage] link)
 │   ├── InvoiceFilters (status, date, search)
 │   ├── InvoiceTable (sortable)
 │   └── InvoiceDetailModal
 │       ├── InvoiceHeader (number, dates, status)
 │       ├── AddressBlock (from/to)
 │       ├── InvoiceLineItemsTable
 │       ├── InvoiceSummary (subtotal, tax, total)
 │       ├── PaymentHistoryTable
 │       ├── InvoiceActions (Pay Now, Download PDF, Dispute)
 │       └── PaymentModal
 │           ├── AmountInput
 │           ├── PaymentMethodSelector
 │           ├── CardForm (Stripe Elements)
 │           ├── BillingAddress
 │           └── PayButton

 ├── SupportPage
 │   ├── NewTicketButton
 │   ├── TicketFilters (status, category, priority, search)
 │   ├── TicketList
 │   │   └── TicketCard (id, subject, status badge, priority, date, agent)
 │   ├── TicketDetailView
 │   │   ├── TicketHeader (id, subject, status, priority)
 │   │   ├── TicketDescription
 │   │   ├── TicketComments
 │   │   │   └── TicketComment (author, content, timestamp, attachments)
 │   │   ├── TicketReplyForm (rich text + file upload)
 │   │   ├── TicketActions (Close, Reopen)
 │   │   └── SatisfactionSurvey (stars + comment)
 │   └── NewTicketModal
 │       ├── SubjectField
 │       ├── CategorySelect
 │       ├── PrioritySelect
 │       ├── DescriptionField (rich text)
 │       └── FileUpload

 ├── ContractsPage
 │   ├── ContractFilters (status, type, search)
 │   ├── ContractList
 │   │   └── ContractCard (title, type, status, dates, value)
 │   ├── ContractDetailView
 │   │   ├── ContractHeader (title, ref number, status)
 │   │   ├── PartiesBlock
 │   │   ├── TermsAccordion (scope, duration, payment, IP, liability)
 │   │   ├── SignatureStatus (client + CEA, signed/pending)
 │   │   ├── AmendmentHistory
 │   │   └── ContractActions (Sign Now, Download PDF, Request Amendment)
 │   └── ESignatureModal
 │       ├── DocumentSummary
 │       ├── FullNameField
 │       ├── AgreeCheckbox
 │       └── SignButton

 ├── DocumentsPage
 │   ├── FolderTree (sidebar, collapsible)
 │   ├── BreadcrumbNav
 │   ├── DocumentToolbar (Upload, New Folder, Search, View toggle)
 │   ├── DocumentGrid / DocumentList
 │   │   └── DocumentCard (icon, name, size, date, actions)
 │   ├── DocumentPreviewModal
 │   │   ├── FilePreview (PDF, image, video, etc.)
 │   │   ├── DownloadButton
 │   │   ├── ShareLinkModal (expiry, password options)
 │   │   └── VersionHistory
 │   └── UploadModal (drag-drop zone, file list, progress)

 └── MessagesPage
     ├── ConversationList (filterable, searchable)
     │   └── ConversationItem (avatar, name, last message, unread badge, time)
     ├── ChatArea
     │   ├── ChatHeader (participant names, info button)
     │   ├── MessageList
     │   │   └── MessageBubble (sender, text, time, read receipts)
     │   ├── TypingIndicator
     │   └── MessageComposer (input, emoji, file attach, send)
     └── ConversationInfoPanel (participants, shared files, pinned)

Shared Components:
 ├── StatusBadge (color-coded by entity type)
 ├── Modal (focus trap, esc close, backdrop)
 ├── ConfirmDialog
 ├── Toast
 ├── Skeleton
 ├── EmptyState
 ├── ErrorBoundary
 ├── DataTable (sortable, paginated, selectable rows)
 ├── Pagination
 ├── SearchBar
 ├── FileUpload (drag-and-drop with preview)
 ├── RichTextEditor (Tiptap-based)
 ├── Avatar (with fallback initials)
 └── Breadcrumb
```

## 7. Exhaustive User Journeys

### Journey 1: Client Signs Up & Onboards

1. CEA sales team creates client record in CRM → invitation email sent to client's primary contact
2. Email: "Welcome to CEA Client Portal! Set your password to get started." with magic link
3. Client clicks link → lands on `/auth/setup` with valid token
4. Fills: full name, password (min 12, must have uppercase, number, special), phone number
5. Sets up MFA: scans QR code with Authenticator app → enters code to verify
6. Completes onboarding wizard:
   - Step 1: Company profile (verify legal name, tax ID, industry, size, website)
   - Step 2: Billing address (enter or verify)
   - Step 3: Payment method (optional, skip for now)
   - Step 4: User permissions (invite additional team members: enter email + role)
7. Onboarding complete → redirects to `/client/portal`
8. **Branch: Magic link expired** → "Link expired. Request a new invitation." → sends new email
9. **Branch: Already registered** → redirect to login with message "You already have an account. Please log in."

### Journey 2: Client Reviews & Accepts a Proposal

1. Notification arrives: in-app + email "You have a new proposal from CEA: 'Data Science Training Programme — Q4'"
2. Client navigates to `/client/proposals` → sees proposal card with status "Sent"
3. Clicks card → opens ProposalDetail
4. Reads scope of work, deliverables, timeline, pricing:
   - Line items: "Curriculum Design (40h × $150)" = $6,000, "Instructor Training (16h × $200)" = $3,200, "Materials & Licenses" = $2,500, "Project Management (10% )" = $1,170
   - Total: $12,870
   - Valid until: Aug 30, 2026
5. **Branch: Wants changes** → clicks [Request Revision]
   - Form: "We need the curriculum to cover Python 3.11 features and add 8 more hours of hands-on labs."
   - Clicks Submit → email sent to CEA sales team → proposal goes to "revised" status
   - CEA team updates proposal, increments version → client notified of new version
   - Client reviews revised proposal → proceeds to accept
6. **Main path: Ready to accept**
   - Clicks [Accept] → confirmation dialog: "Accept proposal for $12,870? This will initiate the project."
   - Confirms → `POST /api/v1/client/proposals/:id/accept`
   - Success → toast "Proposal accepted! Project will be initiated within 24 hours."
   - Proposal status → "Accepted"
   - New project created in background (Queued job) → client sees "Data Science Training Programme — Q4" in Active Projects within 5 minutes
7. **Branch: Decline** → clicks [Decline] → must provide reason → "Budget not approved for this quarter. Will revisit next quarter."
   - Status → "Declined"
   - CEA sales team notified → can follow up

### Journey 3: Client Monitors Project Progress

1. Client navigates to `/client/projects` → sees project with 65% progress
2. Clicks into project → ProjectDetail opens on Overview tab
3. Sees:
   - Ring chart: 65% complete, 23 days elapsed of 45 total, $8,400 spent of $12,870 budget
   - Current phase: "Delivery Phase" (in progress, 70% complete)
   - Next deliverable: "Final Course Materials" due Sep 15, assigned to lead instructor
   - Milestone timeline: 3 of 5 milestones completed
4. Clicks [Timeline] tab → Gantt chart shows all phases with dependencies
   - Phase 1 (completed): Discovery & Planning
   - Phase 2 (completed): Curriculum Design
   - Phase 3 (in progress): Content Development (green bar)
   - Phase 4 (upcoming): Pilot Delivery (orange bar)
   - Phase 5 (upcoming): Evaluation & Handoff (grey bar)
5. Clicks [Deliverables] tab → sees table:
   - "Syllabus Draft" — Submitted (awaiting client approval)
   - "Course Materials" — In Progress (due Sep 15)
   - "Assessment Framework" — Not Started (due Sep 30)
6. Clicks "Syllabus Draft" → preview modal → reviews the PDF
7. **Branch: Client approves deliverable** → clicks [Approve] → status changes to "Approved" → team notified
8. **Branch: Client requests revision** → clicks [Request Revision] → enters feedback → team notified to revise
9. Switches to [Files] tab → uploads reference documents for the team → drags PDF into upload zone → sees progress bar → uploaded
10. Switches to [Messages] tab → sends message: "Great work on the syllabus! Please see the reference docs I uploaded."

### Journey 4: Client Makes a Payment

1. Client receives email: "Invoice INV-2026-0089 is due in 7 days — $12,870"
2. Client navigates to `/client/invoices`
3. Sees:
   - Outstanding balance: $12,870 (1 invoice overdue, 1 upcoming)
   - Invoice table: INV-2026-0089 — $12,870 — Due: Aug 15 — Status: Unpaid (yellow)
4. Clicks invoice → InvoiceDetail:
   - Line items match proposal
   - Payment history: empty
   - [Pay Now] button prominent
5. Clicks [Pay Now] → PaymentModal opens:
   - Amount: $12,870 (pre-filled) — can change to partial amount
   - Payment method: saved Visa ending in 4242
   - Option: "Add new card"
   - Billing address: pre-filled from client record
   - "Secured by Stripe" badge
6. Clicks [Pay $12,870] → loading state with spinner
7. **Branch: 3D Secure required** → redirects to bank's authentication page → completes challenge → returns
8. **Branch: Payment succeeds** → toast "Payment successful! $12,870 paid." → invoice status → "Paid" (green)
   - Payment confirmation email sent
   - Invoice PDF available with "PAID" watermark
9. **Branch: Payment fails** → toast "Payment failed: [reason]. Please try another payment method."
   - Error details: "Card declined by issuer" or "Insufficient funds"
   - Option to retry with different card
10. **Branch: Partial payment** → client enters $5,000 → pays → invoice shows "Partially Paid" with $5,000 paid, $7,870 balance
11. **Branch: Dispute** → client clicks [Dispute] → form: "I was charged twice for the same item" → submitted → invoice status → "Disputed"
    - CEA finance team notified → manual review

### Journey 5: Client Submits Support Ticket

1. Client has a technical issue with the learning platform → clicks "Get Help" on portal or navigates to `/client/support`
2. Clicks [New Ticket]
3. Fills:
   - Subject: "Cannot access course materials for Data Science programme"
   - Category: "Technical"
   - Priority: "High" (because training starts next week)
   - Description: "When I click on the course link in my dashboard, I get a 404 error. I've tried clearing cache and using different browsers." (expands via rich text editor)
   - Attachment: screenshots of error
4. Clicks [Submit] → `POST /api/v1/client/support/tickets`
   - Success: "Ticket #TKT-2026-1423 created. We'll respond within 4 hours."
5. 30 minutes later, client receives notification: "Agent Alex replied to ticket #TKT-2026-1423"
6. Clicks notification → opens ticket detail:
   - Agent reply: "Hi! Sorry for the issue. It appears the course materials were moved to a new server. I've updated the links. Can you please try again? Let me know if it works."
7. Client tests → works now → replies: "All good, working now. Thank you!"
8. Clicks [Resolve Ticket] → optional satisfaction survey pops up:
   - Star rating: 5/5
   - Comment: "Quick and helpful response!"
9. Ticket → "Resolved"
10. **Branch: Not satisfied** → score 2/5 → ticket re-opens automatically for management review
11. **Branch: Client doesn't respond in 72h** → auto-close with "Closed due to inactivity"

### Journey 6: Client Signs a Contract

1. Client receives notification: "Contract for Data Science Training Programme is ready for your signature"
2. Navigates to `/client/contracts` → sees contract "MSA — Data Science Training" with status "Pending Client Signature"
3. Clicks into contract → ContractDetail:
   - Type: MSA
   - Parties: Client Company + Cyber Elias Academy
   - Start: Sep 1, 2026 | End: Aug 31, 2027
   - Value: $150,000
   - Terms: 12-month agreement, auto-renew, Net30 payment terms
   - Signature status: CEA: Signed (Jul 15); Client: Pending
4. Reviews terms via collapsible sections:
   - Scope of Services
   - Payment Terms
   - Confidentiality Clause
   - IP Ownership
   - Limitation of Liability
   - Termination Conditions
5. Clicks [Sign Now] → ESignatureModal:
   - Reviews document summary
   - Enters full legal name: "Jane Smith"
   - Checks: "I agree to the terms and conditions"
   - Clicks [Sign Document]
6. System records: IP address, user agent, timestamp, user ID
   - Contract status → "Active" (since CEA already signed)
   - Toast: "Contract signed successfully. A copy has been emailed to you."
   - Email sent with signed PDF attached
7. **Branch: CEA hasn't signed yet** → after client signs, status → "Pending CEA Signature" → CEA team notified to countersign
8. **Branch: Client wants changes** → clicks [Request Amendment] → form with proposed changes → CEA legal reviews

## 8. Business Rules Engine

### Rule Set 1: Proposals

- **R1.1:** Proposals expire after `valid_until` date passes — status auto-changes to "expired"
- **R1.2:** Accepted proposals automatically create a Project and an Invoice for the initial payment
- **R1.3:** Proposals can be revised at most 3 times; after 3 revisions, a new proposal must be created
- **R1.4:** Proposal total = SUM(line_items.total) × (1 - discount_percent/100) × (1 + tax_rate/100)
- **R1.5:** Only users with `can_approve_proposals = true` can accept proposals
- **R1.6:** Proposal acceptance requires at least one team member with signatory role to view before acceptance

### Rule Set 2: Invoicing & Payments

- **R2.1:** Invoices become "overdue" when due_date passes and balance_due > 0
- **R2.2:** Late fee = 1.5% of overdue amount per month, capped at 15% of invoice total
- **R2.3:** Payment terms from client record apply to all invoices unless overridden
- **R2.4:** Credit card payments are processed via Stripe; 2.9% + $0.30 fee absorbed by CEA for invoices < $10K
- **R2.5:** Bank transfer payments require manual reconciliation (flagged for finance team)
- **R2.6:** Disputed invoices freeze collection activity until resolved
- **R2.7:** Clients with balance_due > $50K AND > 60 days overdue are auto-suspended (portal access limited)

### Rule Set 3: Projects

- **R3.1:** Project progress = weighted average of phase progress × phase weight
- **R3.2:** If a milestone is > 7 days overdue, project health changes from "green" to "amber"
- **R3.3:** If budget_used > budget by > 10%, alert goes to project manager and account manager
- **R3.4:** Projects can be "on hold" for max 30 days before auto-cancellation
- **R3.5:** Deliverable approval requires explicit client action (not auto-approved)
- **R3.6:** Client can only see their own projects

### Rule Set 4: Support

- **R4.1:** Priority determines SLA: critical = 1h response, high = 4h, medium = 8h, low = 24h
- **R4.2:** SLA clock runs business hours (9 AM - 6 PM, Mon-Fri) unless critical priority (24/7)
- **R4.3:** Tickets auto-close after 72h of client inactivity on "waiting_on_client" status
- **R4.4:** Satisfaction survey triggered only on first resolution (not on reopens)
- **R4.5:** Complaint tickets are auto-flagged for account manager review

### Rule Set 5: Contracts

- **R5.1:** Contracts with `auto_renew = true` generate a renewal reminder 60 days before expiry
- **R5.2:** E-signature audit captures: full name, IP, user agent, timestamp, document hash
- **R5.3:** Contract amendments require both parties to sign
- **R5.4:** Expired contracts with no renewal → status "expired", all associated projects flagged
- **R5.5:** Only users with `can_sign_contracts = true` can e-sign

### Rule Set 6: Document Access

- **R6.1:** Shared document links default to 7-day expiry, extendable to 30 days
- **R6.2:** Password-protected shares require the password to be transmitted out-of-band
- **R6.3:** Documents in shared folders inherit folder permissions
- **R6.4:** Deleted documents are soft-deleted for 30 days (trash bin viewable by admin)

## 9. Notification Specifications

### N1: Proposal Received

- **Trigger:** New proposal sent to client
- **Channel:** In-app + Email
- **In-app:** "New proposal from CEA: {{proposal_title}} — ${{total}}"
- **Email:** Subject: "New Proposal: {{proposal_title}} — ${{total}}" | Body: "You have received a new proposal. [View Proposal]"
- **Delivery:** Immediate

### N2: Proposal Accepted (To CEA)

- **Trigger:** Client accepts proposal
- **Channel:** In-app + Email (to sales team)
- **Template:** "{{client_name}} has accepted proposal {{proposal_title}} (${{total}})."
- **Delivery:** Immediate

### N3: Invoice Generated

- **Trigger:** New invoice created
- **Channel:** In-app + Email
- **Email:** Subject: "Invoice {{invoice_number}} from CEA — ${{total}} due {{due_date}}"
- **Delivery:** Immediate

### N4: Payment Received (To Client)

- **Trigger:** Payment successfully processed
- **Channel:** In-app + Email
- **Email:** Subject: "Payment Confirmed — ${{amount}} paid on invoice {{invoice_number}}"
- **Delivery:** Immediate

### N5: Payment Failed

- **Trigger:** Payment attempt fails
- **Channel:** In-app + Email
- **Template:** "Payment of ${{amount}} failed: {{failure_reason}}. Please update your payment method."
- **Delivery:** Immediate, retry reminder after 48h

### N6: Invoice Overdue

- **Trigger:** Invoice becomes overdue
- **Channel:** In-app + Email (day 1, day 7, day 14, day 21, day 30)
- **Template:** "Invoice {{invoice_number}} (${{balance_due}}) is {{days_overdue}} days overdue."
- **Delivery:** Escalating frequency

### N7: Ticket Reply

- **Trigger:** Agent replies to client's ticket
- **Channel:** In-app + Email
- **Template:** "{{agent_name}} replied to ticket #{{ticket_number}}: {{preview_text}}"
- **Delivery:** Immediate

### N8: Ticket Resolved

- **Trigger:** Ticket status changes to "resolved"
- **Channel:** In-app + Email
- **Template:** "Your ticket #{{ticket_number}} has been resolved. Please rate your experience."
- **Delivery:** Immediate

### N9: Contract Ready for Signature

- **Trigger:** Contract requires client signature
- **Channel:** In-app + Email
- **Template:** "{{contract_title}} is ready for your signature. [Sign Now]"
- **Delivery:** Immediate, reminder after 7 days

### N10: Contract Signed

- **Trigger:** Both parties have signed
- **Channel:** In-app + Email
- **Template:** "{{contract_title}} is now fully executed and active."
- **Delivery:** Immediate

### N11: Project Milestone Reached

- **Trigger:** Milestone completed
- **Channel:** In-app
- **Template:** "Milestone '{{milestone_name}}' completed for {{project_name}}."
- **Delivery:** Immediate

### N12: Daily Digest

- **Trigger:** End of business day (5 PM)
- **Channel:** Email
- **Template:** "Your CEA Daily Digest: {{project_updates}} projects updated, {{new_messages}} new messages, {{invoices_due}} invoices due"
- **Delivery:** Daily M-F

## 10. Permission Matrix

| Entity              | Client Admin | Client Billing | Client Project Viewer | Client Signatory | Client Viewer | CEA Admin | CEA PM | CEA Sales |
| ------------------- | ------------ | -------------- | --------------------- | ---------------- | ------------- | --------- | ------ | --------- |
| **Client Profile**  | CRUD         | R              | R                     | R                | R             | CRUD      | R      | R         |
| **Client Users**    | CRUD         | R              | R                     | R                | R             | CRUD      | R      | R         |
| **Proposals**       | CRUD         | R              | R                     | Accept           | R             | CRUD      | R      | CRUD      |
| **Projects**        | R            | R              | R                     | R                | R (basic)     | CRUD      | CRUD   | R         |
| **Project Tasks**   | CRUD         | R              | R                     | R                | R (view)      | CRUD      | CRUD   | R         |
| **Invoices**        | CRUD         | CRUD           | R                     | R                | R             | CRUD      | R      | R         |
| **Payments**        | Pay          | Pay            | —                     | Pay              | —             | CRUD      | —      | —         |
| **Support Tickets** | CRUD         | CRUD           | CRUD                  | CRUD             | CRUD          | CRUD      | R      | R         |
| **Contracts**       | CRUD         | R              | R                     | Sign             | R             | CRUD      | R      | R         |
| **Documents**       | CRUD         | CRUD           | CRUD                  | CRUD             | CRUD          | CRUD      | CRUD   | CRUD      |
| **Messages**        | CRUD         | CRUD           | CRUD                  | CRUD             | R             | CRUD      | CRUD   | CRUD      |
| **Payment Methods** | CRUD         | CRUD           | —                     | —                | —             | R         | —      | —         |

## 11. State Management

```typescript
const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/client" }),
  tagTypes: [
    "Portal",
    "Proposals",
    "Projects",
    "Tasks",
    "Invoices",
    "Payments",
    "Tickets",
    "Contracts",
    "Documents",
    "Messages",
  ],
  endpoints: (builder) => ({
    getPortal: builder.query<ClientPortalResponse, void>({
      query: () => "/portal",
      providesTags: ["Portal"],
      pollingInterval: 60000,
    }),
    getProposals: builder.query<ProposalListResponse, ProposalListQuery>({
      query: (params) => ({ url: "/proposals", params }),
      providesTags: ["Proposals"],
    }),
    acceptProposal: builder.mutation<
      { status: string },
      { id: string; body: { acceptedBy: string } }
    >({
      query: ({ id, body }) => ({ url: `/proposals/${id}/accept`, method: "POST", body }),
      invalidatesTags: ["Proposals", "Projects"],
      optimisticUpdate: true,
    }),
    getProjects: builder.query<ProjectListResponse, ProjectListQuery>({
      query: (params) => ({ url: "/projects", params }),
      providesTags: ["Projects"],
    }),
    getProjectDetail: builder.query<ProjectDetailResponse, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: "Projects", id }],
    }),
    getInvoices: builder.query<InvoiceListResponse, InvoiceListQuery>({
      query: (params) => ({ url: "/invoices", params }),
      providesTags: ["Invoices"],
    }),
    payInvoice: builder.mutation<PaymentResponse, { id: string; body: PayInvoiceBody }>({
      query: ({ id, body }) => ({ url: `/invoices/${id}/pay`, method: "POST", body }),
      invalidatesTags: ["Invoices", "Payments"],
    }),
    getTickets: builder.query<TicketListResponse, TicketListQuery>({
      query: (params) => ({ url: "/support/tickets", params }),
      providesTags: ["Tickets"],
    }),
    createTicket: builder.mutation<CreatedResponse, CreateTicketBody>({
      query: (body) => ({ url: "/support/tickets", method: "POST", body }),
      invalidatesTags: ["Tickets"],
    }),
    getContracts: builder.query<ContractListResponse, ContractListQuery>({
      query: (params) => ({ url: "/contracts", params }),
      providesTags: ["Contracts"],
    }),
    signContract: builder.mutation<SignResponse, { id: string; body: SignContractBody }>({
      query: ({ id, body }) => ({ url: `/contracts/${id}/sign`, method: "POST", body }),
      invalidatesTags: ["Contracts"],
    }),
    getDocuments: builder.query<DocumentListResponse, DocumentListQuery>({
      query: (params) => ({ url: "/documents", params }),
      providesTags: ["Documents"],
    }),
    uploadDocument: builder.mutation<CreatedResponse, FormData>({
      query: (body) => ({ url: "/documents/upload", method: "POST", body }),
      invalidatesTags: ["Documents"],
    }),
    getConversations: builder.query<ConversationListResponse, { projectId?: string }>({
      query: (params) => ({ url: "/messages/conversations", params }),
      providesTags: ["Messages"],
    }),
    sendMessage: builder.mutation<CreatedResponse, { conversationId: string; content: string }>({
      query: ({ conversationId, content }) => ({
        url: `/messages/conversations/${conversationId}`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});
```

## 12. Form Schemas (Zod)

### Proposal Request Form

```typescript
export const proposalRequestSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(500),
  description: z.string().min(20, "Describe your requirements (min 20 chars)").max(5000),
  preferredTimeline: z.enum(["asap", "1_month", "3_months", "6_months", "flexible"]),
  budget: z.enum(["under_5k", "5k_10k", "10k_25k", "25k_50k", "50k_plus", "not_sure"]),
  serviceType: z.enum(["training", "consulting", "recruitment", "custom_programme", "other"]),
  additionalInfo: z.string().max(2000).optional(),
  attachments: z.array(z.instanceof(File)).max(5).optional(),
});
```

### New Support Ticket

```typescript
export const supportTicketSchema = z.object({
  subject: z.string().min(5, "Subject required (min 5 chars)").max(200),
  category: z.enum(["billing", "technical", "project", "general", "complaint"], {
    errorMap: () => ({ message: "Select a category" }),
  }),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  description: z.string().min(20, "Describe your issue (min 20 chars)").max(10000),
  attachments: z.array(z.instanceof(File)).max(5, "Max 5 files").optional(),
});
```

### Invoice Payment

```typescript
export const paymentSchema = z
  .object({
    amount: z.number().positive("Amount must be positive").max(9999999.99),
    paymentMethodId: z.string().uuid("Select a payment method"),
    savePaymentMethod: z.boolean().default(false),
    billingAddress: z
      .object({
        line1: z.string().min(1),
        line2: z.string().optional(),
        city: z.string().min(1),
        state: z.string().optional(),
        zip: z.string().min(3),
        country: z.string().length(2),
      })
      .optional(),
  })
  .refine((data) => data.amount <= 9999999.99, {
    message: "Amount exceeds maximum",
    path: ["amount"],
  });
```

### Contract Signature

```typescript
export const contractSignatureSchema = z.object({
  fullName: z.string().min(2, "Enter your full legal name").max(255),
  agreedToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});
```

### Add New Payment Method

```typescript
export const paymentMethodSchema = z.object({
  stripePaymentMethodId: z.string().min(1),
  isDefault: z.boolean().default(false),
});
```

### Message Send

```typescript
export const messageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty").max(5000),
  attachments: z.array(z.instanceof(File)).max(5).optional(),
});
```

## 13. Analytics Events

| Event                            | Properties                                          | Destination       |
| -------------------------------- | --------------------------------------------------- | ----------------- |
| `client_login`                   | `{ client_id, role, mfa_type }`                     | Amplitude         |
| `portal_viewed`                  | `{ client_id, active_projects, proposals_pending }` | Amplitude         |
| `proposal_viewed`                | `{ proposal_id, status, total }`                    | Amplitude         |
| `proposal_accepted`              | `{ proposal_id, total, response_time_hours }`       | Amplitude, CRM    |
| `proposal_declined`              | `{ proposal_id, reason }`                           | Amplitude, CRM    |
| `proposal_revision_requested`    | `{ proposal_id, version }`                          | Amplitude         |
| `project_viewed`                 | `{ project_id, tab_viewed }`                        | Amplitude         |
| `deliverable_approved`           | `{ deliverable_id, project_id }`                    | Amplitude         |
| `deliverable_revision_requested` | `{ deliverable_id, project_id }`                    | Amplitude         |
| `invoice_viewed`                 | `{ invoice_id, status, amount }`                    | Amplitude         |
| `payment_initiated`              | `{ invoice_id, amount, method }`                    | Amplitude, Stripe |
| `payment_completed`              | `{ invoice_id, amount, method, success }`           | Amplitude         |
| `payment_failed`                 | `{ invoice_id, amount, failure_reason }`            | Amplitude, Sentry |
| `ticket_created`                 | `{ category, priority }`                            | Amplitude         |
| `ticket_resolved`                | `{ ticket_id, satisfaction_score }`                 | Amplitude         |
| `contract_viewed`                | `{ contract_id, type, value }`                      | Amplitude         |
| `contract_signed`                | `{ contract_id, type, value }`                      | Amplitude, CRM    |
| `document_uploaded`              | `{ file_type, file_size, folder }`                  | Amplitude         |
| `document_downloaded`            | `{ document_id, file_type }`                        | Amplitude         |
| `message_sent`                   | `{ conversation_id, has_attachment }`               | Amplitude         |
| `search_performed`               | `{ query, result_count, location }`                 | Amplitude         |

## 14. Accessibility Requirements

### Screen Reader

- Portal stats: `aria-live="polite"` for auto-updating values
- Activity feed: `role="log"`, `aria-live="polite"`
- Invoice table: proper `<th>`, `aria-sort` on sortable columns
- Kanban board: `role="list"` for columns, `role="listitem"` for cards, `aria-grabbed` for drag state
- Chat: `role="log"` for message list, `aria-label="Chat messages"`
- E-signature: clear instructions announced, confirmation of signed document

### Keyboard Navigation

- Tab through invoice table rows; Enter to view detail
- Kanban: Tab to card → Space to pick up → Arrow keys to move column → Space to drop
- Chat: Enter to send (configurable), Shift+Enter for newline
- All modals: Esc to close, Tab cycle, Shift+Tab reverse
- Proposal cards: `A` for accept, `D` for decline when card focused

### Focus Management

- Page navigation → focus to `<h1>`
- Modal open → focus to first focusable element
- Modal close → focus returns to trigger element
- Toast notifications: `role="alert"`, focus stays on current element

### Colour & Contrast

- All status colours have text labels (not colour alone)
- Colour-blind friendly palette for charts
- Focus indicators: 2px outline with offset
- WCAG 2.1 AA contrast ratios met throughout

## 15. Error & Edge Case Catalog

### E1: Proposal Expired

- **Condition:** Client clicks [Accept] on expired proposal
- **Response:** Error message "This proposal expired on {{valid_until}}. Please request a new proposal."
- **Recovery:** [Request New Proposal] button creates a copy with updated dates

### E2: Invoice Already Paid

- **Condition:** Client clicks [Pay Now] on already-paid invoice
- **Response:** "This invoice has already been paid in full on {{paid_date}}."
- **Recovery:** Redirect to payment history, hide pay button

### E3: Payment Method Invalid

- **Condition:** Saved card is expired or invalid
- **Response:** "Your saved payment method is no longer valid. Please add a new card."
- **Recovery:** Open payment method manager, require new card before proceeding

### E4: 3D Secure Authentication Failed

- **Condition:** Bank rejects 3DS challenge
- **Response:** "Authentication failed. Your bank declined the transaction. Please try another card or contact your bank."
- **Recovery:** Return to payment method selection

### E5: Stripe API Error

- **Condition:** Stripe experiences downtime
- **Response:** "Payment service temporarily unavailable. Please try again in a few minutes."
- **Recovery:** Retry button with exponential backoff; alternative: "Pay by bank transfer" option

### E6: Contract Already Signed

- **Condition:** Client tries to sign already-signed contract
- **Response:** "This contract has already been signed by you on {{date}}."
- **Recovery:** Download signed PDF, hide sign button

### E7: File Too Large

- **Condition:** Client uploads file > 25MB (documents) or > 10MB (ticket attachments)
- **Response:** "File too large. Maximum file size is {{limit}}MB."
- **Recovery:** Show current file size, suggest compression

### E8: Invalid File Type

- **Condition:** Client uploads disallowed file type (.exe, .bat, etc.)
- **Response:** "File type not supported. Allowed types: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, GIF, ZIP."
- **Recovery:** Remove file from upload queue, show allowed types

### E9: Message Send Failure

- **Condition:** Message fails to send (network error)
- **Response:** "Failed to send message. [Retry]" — message saved as draft locally
- **Recovery:** Auto-retry on reconnection, show "Sending..." indicator

### E10: Ticket Submission Rate Limited

- **Condition:** Client submits > 5 tickets in 1 hour
- **Response:** "You've reached the maximum of 5 tickets per hour. Please wait before submitting another."
- **Recovery:** Show time until limit resets

### E11: Document Share Link Expired

- **Condition:** Recipient clicks expired share link
- **Response:** "This share link has expired. Please request a new link from the document owner."
- **Recovery:** Provide contact email for document owner

### E12: Account Suspended

- **Condition:** Client tries to access portal while suspended (overdue invoices)
- **Response:** "Your account has been suspended due to outstanding balance. Please contact billing to restore access."
- **Recovery:** Show billing contact info + [Pay Now] for outstanding invoices (limited access)

### E13: Concurrent Session Limit

- **Condition:** Client logs in from 4th device (limit is 3)
- **Response:** "You've reached the maximum of 3 concurrent sessions. Please log out from another device."
- **Recovery:** Show active sessions list with [Log Out] option

### E14: Browser Back/Forward Cache Mismatch

- **Condition:** Client navigates back to stale data
- **Response:** Silent re-fetch of data on page focus. If data changed, subtle badge "Updated"
- **Recovery:** Auto-refresh on focus

### E15: Proposal Acceptance Without Signatory

- **Condition:** Client has no user with signatory role when trying to accept
- **Response:** "Your account does not have permission to accept proposals. Please contact your company admin."
- **Recovery:** Link to invite signatory user

### E16: Invoice PDF Generation Failure

- **Condition:** PDF service fails to generate invoice PDF
- **Response:** "Invoice PDF unavailable. Please try again later."
- **Recovery:** Background retry job; notify client when PDF ready
