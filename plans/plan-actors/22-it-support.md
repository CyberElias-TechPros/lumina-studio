# Actor: IT Support

## 1. Identity & Role Definition

**Actor ID:** `it_support`  
**Display Name:** IT Support Specialist  
**Description:** Provides technical support to all CEA system users — students, faculty, staff. Manages support tickets, assets, system monitoring, knowledge base, and user account lifecycle. First line of defense for technical issues and escalation management.  
**System Role:** `it_support_staff`  
**Hierarchy:** Reports to IT Support Lead (role: `it_support_lead`)  
**Session Timeout:** 30 minutes of inactivity  
**Concurrent Sessions:** 4 max

## 2. Primary Goals & Success KPIs

| Goal                       | KPI                                  | Target    |
| -------------------------- | ------------------------------------ | --------- |
| Resolve tickets quickly    | Average resolution time (ART)        | < 4 hours |
| First contact resolution   | FCR rate                             | > 70%     |
| User satisfaction          | CSAT score (post-resolution survey)  | > 4.5/5   |
| Ticket volume management   | Tickets resolved per day             | > 10      |
| Knowledge base utilization | KB article views / ticket count      | > 30%     |
| Asset tracking accuracy    | Asset inventory accuracy             | > 98%     |
| System uptime              | Systems monitored with < 5 min alert | > 99.9%   |
| Account provisioning time  | Time to create/reset accounts        | < 15 min  |

## 3. Complete Screen Inventory

### 3.1 Ticket Hub (`/it/tickets`)

**Wireframe:** Full-page queue manager with real-time updates, filters, and quick actions.

**Top Bar:**

- Unassigned count badge (red), New count badge (blue), Overdue count badge (orange)
- Refresh button, Auto-refresh toggle (15s interval)
- "➕ New Ticket" button

**Filters Row:**

- Status: All, New, Open, In Progress, Waiting on Customer, Resolved, Closed
- Priority: All, Critical, High, Medium, Low
- Category: Hardware, Software, Network, Account, Access, Email, Printing, Other
- Assignee: Me, Unassigned, Specific Tech
- Search: ticket ID, title, user name, email

**Ticket Table:**

- Columns: ID (#TICK-xxxx), Title, Status badge, Priority badge (Critical=red, High=orange, Med=yellow, Low=gray), Category, Requester (name+avatar), Assignee, Created (relative), Last Updated, SLA timer (color-coded)
- Sortable by all columns
- Row click → ticket detail
- Bulk select: Assign, Change Status, Delete

**Real-time Updates:**

- WebSocket push for new tickets, status changes, @mentions
- Toast: "New ticket #TICK-0042 from John Doe: 'Can't access email'"

**Data Bindings:**

- `GET /api/it/tickets?status={status}&priority={priority}&assignee={id}&search={q}&limit={limit}&offset={offset}`
- `PATCH /api/it/tickets/bulk` (bulk operations)

**States:**

| State                     | Behavior                                           |
| ------------------------- | -------------------------------------------------- |
| Loading                   | Table skeleton (10 shimmer rows)                   |
| Empty                     | "No tickets match your filters."                   |
| Empty (unassigned)        | "No unassigned tickets. You're all caught up!"     |
| New ticket real-time      | Slide-in toast with ticket preview, "Claim" button |
| High volume (50+ visible) | Virtualized rows, auto-hide less urgent columns    |

### 3.2 Ticket Management (`/it/tickets/{id}`)

**Wireframe:** Three-column layout: ticket info (left), conversation (center), actions (right).

**Left Column — Ticket Info:**

- **Header:** Ticket ID, Title (editable), Status badge, Priority badge
- **Requester Section:** Name, Email, Phone, Department/Role, User since date
- **Device/Asset Section:** Asset tag (if linked), Device type, OS, IP address, Location
- **Categorization:** Category, Subcategory, Impact (Individual/Department/All), Urgency
- **Timestamps:** Created, First Response, Last Updated, Resolved, SLA deadline
- **Tags:** Multi-select (e.g., "vpn", "mac", "new-hire", "recurring")

**Center Column — Conversation:**

- Threaded messages (oldest first)
- Each message: Author avatar+name, Timestamp, Body (rich text, code blocks, images)
- Internal notes: Background color, "INTERNAL" badge, only visible to IT staff
- Attachments: file name, size, download link, image preview
- **Reply Box:**
  - Rich text editor (TipTap)
  - Attachment upload (drag & drop, max 25MB)
  - "Reply to Customer" toggle vs "Internal Note" toggle
  - Quick response template selector (dropdown)
  - "Resolve & Reply" checkbox
  - Submit button

**Right Column — Actions:**

- **Status Workflow:**
  - New → Open (auto on first reply)
  - Open → In Progress (when tech starts working)
  - In Progress → Waiting on Customer (for more info)
  - In Progress → Resolved (solution provided)
  - Waiting on Customer → Open (customer replied)
  - Resolved → Closed (auto after 3 days no response, or manual)
- **Priority Change:** Dropdown with reason required for escalation
- **Assignment:** Current assignee, "Assign to Me" button, Reassign dropdown
- **SLA Info:** Deadline time, countdown, breached indicator
- **Linked Assets:** Manage asset associations
- **Related Tickets:** List with links (same requester, same issue)
- **Time Tracking:** Start/Stop timer, manual time entry, total time logged
- **Solution Field:** Internal solution notes (markdown, only visible to IT)
- **Email Notify Requester:** Toggle per action

**Data Bindings:**

- Detail: `GET /api/it/tickets/{id}`
- Update: `PATCH /api/it/tickets/{id}`
- Reply: `POST /api/it/tickets/{id}/replies`
- Status change: `POST /api/it/tickets/{id}/status`
- Assign: `POST /api/it/tickets/{id}/assign`

**States:**

| State                     | Behavior                                                             |
| ------------------------- | -------------------------------------------------------------------- |
| Loading                   | 3-column skeleton                                                    |
| Not found                 | "Ticket not found. It may have been deleted."                        |
| Saving reply              | Button shows spinner, disable form                                   |
| File upload               | Progress bar per file                                                |
| SLA breached              | Red banner: "SLA breach! This ticket is overdue by 2h 15m."          |
| Waiting on customer > 72h | Warning: "Customer hasn't responded in 3 days. [Resolve] [Escalate]" |

### 3.3 Asset Management (`/it/assets`)

**Wireframe:** Asset inventory table with categories, detail drawer, lifecycle management.

**Top Bar:**

- Search (asset tag, name, serial number, user)
- Filter: Type (Laptop, Desktop, Monitor, Printer, Phone, Tablet, Server, Network, Software License, Accessory), Status (In Use, In Stock, Under Repair, Retired, Lost), Location, Assigned To
- "➕ Add Asset" button, "📥 Import" button, "📤 Export" button
- Quick stats: Total Assets, In Use, Available, Under Repair

**Asset Table:**

- Columns: Asset Tag (#AST-xxxx), Name/Model, Type icon, Serial Number, Status badge, Assigned To (user name), Location, Purchase Date, Warranty End (color-coded: green=future, yellow=within 30d, red=expired), Last Audit, Actions
- Row click → Asset Detail Drawer

**Asset Detail Drawer (Right Panel):**

- **Header:** Asset tag, Name, Edit button
- **Details Tab:**
  - Type, Manufacturer, Model, Serial Number, Asset Tag
  - Purchase Date, Purchase Price, Vendor, PO Number
  - Warranty: Start, End, Provider, Support Contract #
  - Status, Location, Room/Building
  - Assigned To: User name, Department, Assignment Date
  - Operating System / Version (for IT equipment)
  - IP Address, MAC Address (for network devices)
  - Notes (textarea)
- **History Tab:**
  - Assignment history: User, From, To, Reason
  - Repair history: Date, Description, Cost, Vendor
  - Audit history: Date, Auditor, Condition notes
- **Documents Tab:**
  - Upload purchase invoice, warranty certificate, user manual
- **Actions:** Edit, Assign/Unassign, Mark as Retired, Mark as Lost, Send to Repair

**Add Asset Form (Modal):**

- Type, Manufacturer, Model, Serial Number (required, unique)
- Asset Tag (auto-generated or manual)
- Purchase Date, Purchase Price, Vendor, PO Number
- Warranty Info
- Location, Assigned To (optional — can assign later)
- Notes

**Data Bindings:**

- List: `GET /api/it/assets?type={type}&status={status}&search={q}`
- Create: `POST /api/it/assets`
- Detail: `GET /api/it/assets/{id}`
- Update: `PATCH /api/it/assets/{id}`
- Assign: `POST /api/it/assets/{id}/assign`
- History: `GET /api/it/assets/{id}/history`
- Import: `POST /api/it/assets/import`

**States:**

| State             | Behavior                                                       |
| ----------------- | -------------------------------------------------------------- |
| Loading           | Table skeleton + stats shimmer                                 |
| Empty             | "No assets in inventory. Add your first asset."                |
| Warranty expiring | Row highlighted yellow, tooltip: "Warranty expires in 14 days" |
| Warranty expired  | Row highlighted red                                            |

### 3.4 System Monitoring (`/it/monitoring`)

**Wireframe:** Real-time dashboard of system health, services, and infrastructure metrics.

**Top Section — Overall Status:**

- Global status badge: All Systems Operational / Degraded Performance / Partial Outage / Major Outage
- Last updated timestamp
- "Acknowledge All" button for active incidents

**Services Grid:**

- Cards for each service: Web App, API, Database, Email, File Storage, Authentication, CMS, Analytics
- Each card: Service name, Status icon (green=operational, yellow=degraded, red=down, gray=maintenance), Uptime %, Response time (ms), Incidents count (last 24h)
- Click → service detail modal with metrics charts

**Real-time Metrics:**

- CPU Usage (avg, per-server if applicable)
- Memory Usage
- Disk Usage
- Network I/O
- Error Rate (5xx per minute)
- Active Users (concurrent)
- Request Rate (per second)

**Active Incidents Panel (Right Sidebar):**

- List of current active incidents
- Each: Incident ID, Title, Severity (Critical/Major/Minor), Service affected, Started at, Duration, Acknowledged by
- "➕ Report Incident" button

**Incident Detail Modal:**

- Title, Description, Severity, Service, Status (Investigating/Identified/Monitoring/Resolved)
- Timeline of updates
- Affected components
- Root cause analysis (post-mortem)
- Resolved at timestamp

**Data Bindings:**

- Status: `GET /api/it/monitoring/status`
- Services: `GET /api/it/monitoring/services`
- Metrics: `GET /api/it/monitoring/metrics`
- Incidents: `GET /api/it/monitoring/incidents`
- Create incident: `POST /api/it/monitoring/incidents`
- Update incident: `PATCH /api/it/monitoring/incidents/{id}`

**States:**

| State       | Behavior                                                                    |
| ----------- | --------------------------------------------------------------------------- |
| Loading     | Status skeleton + service card shimmers                                     |
| All green   | "All Systems Operational" with green checkmark                              |
| Degraded    | Yellow banner: "Degraded performance on [Service]"                          |
| Outage      | Red banner: "Major outage detected on [Service]" with auto-created incident |
| Maintenance | Gray banner: "Scheduled maintenance on [Service]"                           |

### 3.5 Knowledge Base (`/it/knowledge-base`)

**Wireframe:** Article listing with categories, search, and article viewer/editor.

**Left Panel — Categories:**

- Category tree: Getting Started, Account & Login, Email & Calendar, Software, Hardware, Network & VPN, Printing, Security, FAQ
- Each category: Name, Article count
- "Manage Categories" button (Admin)

**Center Panel — Article List:**

- Search bar (full-text search across titles and content)
- Sort: Recently Updated, Most Viewed, Most Helpful
- List: Title, Category, Author, Last Updated, Views, Helpful count, Status (Published/Draft)
- "➕ New Article" button

**Article Viewer/Editor:**

- **View Mode:** Rendered article with Table of Contents (auto-generated from headings), body content, attachments, related articles
- **Feedback:** "Was this helpful?" (Yes/No) with optional comment
- **Edit Mode:** Title, Category, Content (rich text editor), Tags, Status (Draft/Published), Attachments
- **Metadata:** Author, Created, Updated, View count, Helpful count (%), Last reviewed date

**Data Bindings:**

- Categories: `GET /api/it/knowledge-base/categories`
- Articles: `GET /api/it/knowledge-base/articles?category={id}&search={q}`
- Article: `GET /api/it/knowledge-base/articles/{id}`
- Create: `POST /api/it/knowledge-base/articles`
- Update: `PATCH /api/it/knowledge-base/articles/{id}`
- Feedback: `POST /api/it/knowledge-base/articles/{id}/feedback`

**States:**

| State             | Behavior                                              |
| ----------------- | ----------------------------------------------------- |
| Loading           | Skeleton article list                                 |
| Empty category    | "No articles in this category yet."                   |
| Article not found | "Article not found or has been removed."              |
| No search results | "No articles match your search. [Create New Article]" |

### 3.6 User Management (`/it/users`)

**Wireframe:** User directory with creation/reset flows, search, and bulk operations.

**Top Section:**

- Search: Name, Email, Student ID / Employee ID, Department
- Filter: Role/Type (Student, Faculty, Staff, Admin), Status (Active, Inactive, Suspended), Department
- "➕ Create User" button, "📥 Import Users" button

**User Table:**

- Columns: Name, Email, Role, Department, Status badge, Last Login, MFA Enabled (yes/no/icon), Created, Actions
- Row click → User Detail Panel

**User Detail Panel (Right Side):**

- **Profile Section:** Name, Email, Role, Department, Phone, Photo
- **Account Status:** Active / Suspended / Inactive toggle, reason required for suspend
- **Actions:**
  - "Reset Password" → confirmation modal → sends reset email to user
  - "Enable/Disable MFA"
  - "Impersonate User" (logs in as user for debugging, with audit trail)
  - "Send Welcome Email"
  - "View Login History" → recent logins with IP, device, timestamp
  - "View Ticket History" → count, link to filtered ticket list
- **Groups/Roles:** Member of groups, assigned roles (read-only or edit)
- **Activity Log:** Recent actions on this user account

**Create User Modal:**

- First Name, Last Name, Email, Role (Student/Faculty/Staff/Admin)
- Department (optional), Phone (optional)
- "Send Welcome Email" toggle (includes setup instructions)
- "Create Account" button

**Bulk Import Modal:**

- Download CSV template, Upload CSV, Field mapping preview
- Summary: X new, Y skipped (duplicates), Z errors

**Data Bindings:**

- Users: `GET /api/it/users?role={role}&status={status}&search={q}`
- Create: `POST /api/it/users`
- Detail: `GET /api/it/users/{id}`
- Update: `PATCH /api/it/users/{id}`
- Reset password: `POST /api/it/users/{id}/reset-password`
- Suspend/activate: `POST /api/it/users/{id}/status`
- Import: `POST /api/it/users/import`

**States:**

| State                 | Behavior                                           |
| --------------------- | -------------------------------------------------- |
| Loading               | Table skeleton                                     |
| Empty                 | "No users found matching your search."             |
| User creation success | Toast: "User account created. Welcome email sent." |
| Password reset sent   | "Password reset link sent to user's email."        |
| Suspended user        | Row has strikethrough on name, dark gray badge     |
| Import in progress    | Progress modal with row-by-row status              |

### 3.7 Remote Support (`/it/remote-support`)

**Wireframe:** Remote session management with connection details, active sessions list.

**Active Sessions:**

- Table: Session ID, User Name, Device Name, Connection Type (VNC/RDP/SSH), Started, Duration, Status (Connected/Disconnected), Actions (Join/End)
- "🔗 Start New Session" button

**Start Session Form:**

- User search/select (auto-fills device info)
- Device: Select from user's registered devices or enter IP/hostname
- Connection Type: RDP, VNC, SSH, TeamViewer, AnyDesk
- Authentication: Password field, Key file upload, or "Use stored credential"
- Permissions: "Request user permission before connecting" toggle (mandatory for student devices)
- Session notes

**Session Viewer (Embedded):**

- Iframe/web-based RDP/VNC viewer (using Apache Guacamole or similar)
- Toolbar: Fullscreen, Send Ctrl+Alt+Del, File Transfer (upload/download), Chat, End Session, Record toggle
- Session recording indicator (red dot)
- Chat panel for communicating with end user during session

**Data Bindings:**

- Active sessions: `GET /api/it/remote-sessions`
- Start: `POST /api/it/remote-sessions`
- End: `POST /api/it/remote-sessions/{id}/end`
- Recordings: `GET /api/it/remote-sessions/{id}/recording`

**States:**

| State              | Behavior                                                                             |
| ------------------ | ------------------------------------------------------------------------------------ |
| Loading            | Session list skeleton                                                                |
| No active sessions | "No active remote sessions. Start a new session."                                    |
| Connection failed  | "Unable to connect to remote device. Error: [message]. [Retry] [Alternative Method]" |
| Permission denied  | "Remote connection request was denied by the user."                                  |
| Session ended      | Toast: "Remote session ended. Duration: 23m 15s."                                    |

### 3.8 Reports (`/it/reports`)

**Wireframe:** IT analytics and report generation center.

**Report Types:**

- Ticket Volume Report (trends, by category, by priority)
- Resolution Time Report (average, by category, by tech)
- CSAT Report (average score, trends, by tech)
- Asset Inventory Report
- User Account Report (active, created, suspended)
- System Uptime Report (service-by-service monthly uptime)
- Knowledge Base Report (most viewed, least viewed, feedback)

**Each Report:**

- Date range selector
- Chart (Recharts: bar, line, pie)
- Data table with pagination, export (CSV/PDF)

**Dashboard Widgets (configurable):**

- Tickets created today vs resolved today gauge
- Open tickets by priority (stacked bar)
- Top 5 knowledge base articles
- System health summary

**Data Bindings:**

- Reports: `GET /api/it/reports/{type}?startDate={iso}&endDate={iso}`
- Dashboard: `GET /api/it/reports/dashboard`

## 4. Full Database Schema

```typescript
// ============================================================
// schema/it/index.ts
// ============================================================
import { sqliteTable, text, integer, real, uniqueIndex, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ─────────────────────────────────────────────
// 1. TICKETS
// ─────────────────────────────────────────────
export const tickets = sqliteTable("it_tickets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  ticketNumber: text("ticket_number").notNull().unique(), // TICK-XXXX
  title: text("title").notNull(),
  description: text("description").notNull(),
  // Requester
  requesterId: text("requester_id").references(() => users.id),
  requesterName: text("requester_name").notNull(),
  requesterEmail: text("requester_email").notNull(),
  requesterPhone: text("requester_phone"),
  // Assignment
  assignedToId: text("assigned_to_id").references(() => users.id),
  // Status & Priority
  status: text("status", {
    enum: ["new", "open", "in_progress", "waiting_on_customer", "resolved", "closed"],
  })
    .notNull()
    .default("new"),
  priority: text("priority", { enum: ["critical", "high", "medium", "low"] })
    .notNull()
    .default("medium"),
  // Categorization
  category: text("category", {
    enum: ["hardware", "software", "network", "account", "access", "email", "printing", "other"],
  })
    .notNull()
    .default("other"),
  subcategory: text("subcategory"),
  impact: text("impact", { enum: ["individual", "department", "all"] }).default("individual"),
  urgency: text("urgency", { enum: ["low", "medium", "high"] }).default("medium"),
  // SLA
  slaDeadline: text("sla_deadline"), // ISO datetime
  slaBreached: integer("sla_breached", { mode: "boolean" }).default(false),
  firstResponseAt: text("first_response_at"),
  resolvedAt: text("resolved_at"),
  closedAt: text("closed_at"),
  resolution: text("resolution"), // internal solution notes
  // Satisfaction
  csatScore: integer("csat_score"), // 1-5
  csatFeedback: text("csat_feedback"),
  csatSurveySent: integer("csat_survey_sent", { mode: "boolean" }).default(false),
  // Time tracking
  totalTimeSpent: integer("total_time_spent").default(0), // minutes
  // Metadata
  tags: text("tags", { mode: "json" }).$type<string[]>().default([]),
  source: text("source", { enum: ["portal", "email", "phone", "chat", "walk_in", "api"] }).default(
    "portal",
  ),
  createdById: text("created_by_id").references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
  isArchived: integer("is_archived", { mode: "boolean" }).default(false),
});

// ─────────────────────────────────────────────
// 2. TICKET REPLIES
// ─────────────────────────────────────────────
export const ticketReplies = sqliteTable("it_ticket_replies", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  ticketId: text("ticket_id")
    .notNull()
    .references(() => tickets.id, { onDelete: "cascade" }),
  authorId: text("author_id").references(() => users.id),
  authorName: text("author_name").notNull(),
  body: text("body").notNull(),
  isInternal: integer("is_internal", { mode: "boolean" }).default(false),
  attachments: text("attachments", { mode: "json" }).$type<Attachment[]>().default([]),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 3. ASSETS
// ─────────────────────────────────────────────
export const assets = sqliteTable("it_assets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  assetTag: text("asset_tag").notNull().unique(), // AST-XXXX
  name: text("name").notNull(),
  type: text("type", {
    enum: [
      "laptop",
      "desktop",
      "monitor",
      "printer",
      "phone",
      "tablet",
      "server",
      "network_device",
      "software_license",
      "accessory",
      "other",
    ],
  }).notNull(),
  manufacturer: text("manufacturer"),
  model: text("model"),
  serialNumber: text("serial_number"),
  // Status
  status: text("status", { enum: ["in_use", "in_stock", "under_repair", "retired", "lost"] })
    .notNull()
    .default("in_use"),
  // Assignment
  assignedToId: text("assigned_to_id").references(() => users.id),
  assignedAt: text("assigned_at"),
  // Purchase
  purchaseDate: text("purchase_date"),
  purchasePrice: real("purchase_price"),
  vendor: text("vendor"),
  poNumber: text("po_number"),
  // Warranty
  warrantyStart: text("warranty_start"),
  warrantyEnd: text("warranty_end"),
  warrantyProvider: text("warranty_provider"),
  warrantyContract: text("warranty_contract"),
  // Location
  location: text("location"),
  building: text("building"),
  room: text("room"),
  // Network (for IT equipment)
  ipAddress: text("ip_address"),
  macAddress: text("mac_address"),
  os: text("os"),
  osVersion: text("os_version"),
  // Notes
  notes: text("notes"),
  // Metadata
  createdById: text("created_by_id").references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 4. ASSET HISTORY
// ─────────────────────────────────────────────
export const assetHistory = sqliteTable("it_asset_history", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  assetId: text("asset_id")
    .notNull()
    .references(() => assets.id, { onDelete: "cascade" }),
  action: text("action", {
    enum: [
      "assigned",
      "unassigned",
      "repaired",
      "audited",
      "retired",
      "lost",
      "status_changed",
      "updated",
    ],
  }).notNull(),
  previousValue: text("previous_value"),
  newValue: text("new_value"),
  performedById: text("performed_by_id").references(() => users.id),
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 5. KNOWLEDGE BASE ARTICLES
// ─────────────────────────────────────────────
export const kbArticles = sqliteTable("it_kb_articles", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(), // HTML/markdown
  categoryId: text("category_id").references(() => kbCategories.id),
  tags: text("tags", { mode: "json" }).$type<string[]>().default([]),
  status: text("status", { enum: ["draft", "published", "archived"] })
    .notNull()
    .default("draft"),
  authorId: text("author_id").references(() => users.id),
  viewCount: integer("view_count").default(0),
  helpfulCount: integer("helpful_count").default(0),
  notHelpfulCount: integer("not_helpful_count").default(0),
  helpfulPercent: real("helpful_percent").default(0),
  lastReviewedAt: text("last_reviewed_at"),
  publishedAt: text("published_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 6. KNOWLEDGE BASE CATEGORIES
// ─────────────────────────────────────────────
export const kbCategories = sqliteTable("it_kb_categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  parentId: text("parent_id").references((): typeof kbCategories => kbCategories.id),
  sortOrder: integer("sort_order").default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 7. SYSTEM MONITORING — SERVICE STATUS
// ─────────────────────────────────────────────
export const serviceStatus = sqliteTable("it_service_status", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  serviceName: text("service_name").notNull().unique(),
  displayName: text("display_name").notNull(),
  status: text("status", { enum: ["operational", "degraded", "down", "maintenance"] })
    .notNull()
    .default("operational"),
  uptimePercent: real("uptime_percent").default(100),
  responseTime: integer("response_time"), // ms
  lastCheckedAt: text("last_checked_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 8. MONITORING INCIDENTS
// ─────────────────────────────────────────────
export const monitoringIncidents = sqliteTable("it_monitoring_incidents", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  severity: text("severity", { enum: ["critical", "major", "minor"] }).notNull(),
  serviceId: text("service_id").references(() => serviceStatus.id),
  status: text("status", { enum: ["investigating", "identified", "monitoring", "resolved"] })
    .notNull()
    .default("investigating"),
  acknowledgedById: text("acknowledged_by_id").references(() => users.id),
  acknowledgedAt: text("acknowledged_at"),
  resolvedAt: text("resolved_at"),
  rootCause: text("root_cause"),
  timeline: text("timeline", { mode: "json" }).$type<IncidentTimelineEntry[]>().default([]),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 9. REMOTE SESSIONS
// ─────────────────────────────────────────────
export const remoteSessions = sqliteTable("it_remote_sessions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  deviceName: text("device_name"),
  connectionType: text("connection_type", {
    enum: ["rdp", "vnc", "ssh", "teamviewer", "anydesk"],
  }).notNull(),
  status: text("status", { enum: ["connecting", "connected", "disconnected", "ended", "failed"] })
    .notNull()
    .default("connecting"),
  startedAt: text("started_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  endedAt: text("ended_at"),
  duration: integer("duration"), // seconds
  recordingKey: text("recording_key"), // R2 key for session recording
  notes: text("notes"),
  initiatedById: text("initiated_by_id").references(() => users.id),
  isRecorded: integer("is_recorded", { mode: "boolean" }).default(false),
});

// ─────────────────────────────────────────────
// Indexes
// ─────────────────────────────────────────────
export const ticketsStatusIdx = index("idx_it_tickets_status").on(tickets.status);
export const ticketsPriorityIdx = index("idx_it_tickets_priority").on(tickets.priority);
export const ticketsAssigneeIdx = index("idx_it_tickets_assignee").on(tickets.assignedToId);
export const ticketsRequesterIdx = index("idx_it_tickets_requester").on(tickets.requesterId);
export const ticketsCreatedIdx = index("idx_it_tickets_created").on(tickets.createdAt);
export const ticketsNumberIdx = uniqueIndex("idx_it_tickets_number").on(tickets.ticketNumber);
export const repliesTicketIdx = index("idx_it_replies_ticket").on(ticketReplies.ticketId);
export const assetsTypeIdx = index("idx_it_assets_type").on(assets.type);
export const assetsStatusIdx = index("idx_it_assets_status").on(assets.status);
export const assetsAssigneeIdx = index("idx_it_assets_assignee").on(assets.assignedToId);
export const assetsTagIdx = uniqueIndex("idx_it_assets_tag").on(assets.assetTag);
export const assetsSerialIdx = uniqueIndex("idx_it_assets_serial").on(assets.serialNumber);
export const assetHistoryAssetIdx = index("idx_it_asset_history_asset").on(assetHistory.assetId);
export const kbCategoryIdx = index("idx_it_kb_category").on(kbArticles.categoryId);
export const kbSlugIdx = uniqueIndex("idx_it_kb_slug").on(kbArticles.slug);
export const kbCategorySlugIdx = uniqueIndex("idx_it_kb_category_slug").on(kbCategories.slug);
export const incidentsServiceIdx = index("idx_it_incidents_service").on(
  monitoringIncidents.serviceId,
);
export const incidentsStatusIdx = index("idx_it_incidents_status").on(monitoringIncidents.status);

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface Attachment {
  fileName: string;
  fileSize: number;
  mimeType: string;
  storageKey: string;
  uploadedAt: string;
}

export interface IncidentTimelineEntry {
  timestamp: string;
  status: string;
  message: string;
  updatedById: string;
}
```

## 5. Complete API Contract

### 5.1 Ticket Endpoints

#### `GET /api/it/tickets`

**Query:**

```typescript
{ status?: string | string[]; priority?: string | string[]; category?: string; assignee?: string; search?: string; requesterId?: string; limit?: number; offset?: number; }
```

**Response `200`:** Paginated ticket list with `items`, `total`, `hasMore`

#### `POST /api/it/tickets`

**Request:**

```typescript
{ title: string; description: string; requesterId?: string; requesterName: string; requesterEmail: string; requesterPhone?: string; priority?: string; category?: string; subcategory?: string; source?: string; }
```

**Response `201`: `{ id: string; ticketNumber: string; }`**

#### `GET /api/it/tickets/{id}`

**Response `200`: Full ticket detail with replies, linked assets, time entries**

#### `POST /api/it/tickets/{id}/replies`

**Request:**

```typescript
{ body: string; isInternal?: boolean; attachments?: File[]; }
```

**Response `201`: `{ id: string; }`**

#### `POST /api/it/tickets/{id}/status`

**Request:**

```typescript
{ status: string; resolution?: string; }
```

**Response `200`: `{ success: true; }`**

**Transition validation:** Returns 422 if invalid transition

### 5.2 Asset Endpoints

#### `GET /api/it/assets`

**Query:**

```typescript
{ type?: string; status?: string; search?: string; assignedTo?: string; location?: string; limit?: number; offset?: number; }
```

#### `POST /api/it/assets`

**Request:**

```typescript
{ name: string; type: string; manufacturer?: string; model?: string; serialNumber?: string; purchaseDate?: string; purchasePrice?: number; vendor?: string; warrantyStart?: string; warrantyEnd?: string; location?: string; notes?: string; }
```

**Response `201`: `{ id: string; assetTag: string; }`**

#### `POST /api/it/assets/{id}/assign`

**Request:**

```typescript
{ userId: string; notes?: string; }
```

**Response `200`: `{ success: true; }`**

### 5.3 Knowledge Base Endpoints

#### `GET /api/it/knowledge-base/articles`

**Query:**

```typescript
{ categoryId?: string; search?: string; status?: string; }
```

#### `POST /api/it/knowledge-base/articles`

**Request:**

```typescript
{ title: string; content: string; categoryId: string; tags?: string[]; status?: string; }
```

### 5.4 Monitoring Endpoints

#### `GET /api/it/monitoring/status`

**Response `200`:**

```typescript
{
  globalStatus: string;
  lastChecked: string;
  services: {
    id: string;
    name: string;
    status: string;
    uptime: number;
    responseTime: number;
  }
  [];
}
```

#### `POST /api/it/monitoring/incidents`

**Request:**

```typescript
{ title: string; description?: string; severity: string; serviceId: string; }
```

### 5.5 Remote Session Endpoints

#### `POST /api/it/remote-sessions`

**Request:**

```typescript
{ userId: string; deviceName?: string; connectionType: string; authMethod?: string; password?: string; isRecorded?: boolean; notes?: string; }
```

**Response `201`: `{ id: string; connectionDetails: { host: string; port: number; protocol: string; }; }`**

## 6. Component Tree

```
<ItLayout>
  ├── <TicketHub>
  │   ├── <TicketHeaderStats />
  │   ├── <TicketFilters />
  │   ├── <TicketTable>
  │   │   └── <TicketRow *ngFor />
  │   └── <BulkActionBar />
  │
  ├── <TicketDetail>
  │   ├── <TicketInfoPanel>
  │   │   ├── <TicketHeader />
  │   │   ├── <RequesterInfo />
  │   │   ├── <LinkedAssets />
  │   │   ├── <Categorization />
  │   │   └── <Timestamps />
  │   ├── <TicketConversation>
  │   │   ├── <MessageThread />
  │   │   │   └── <MessageBubble *ngFor />
  │   │   └── <ReplyComposer>
  │   │       ├── <RichTextEditor />
  │   │       ├── <FileDropzone />
  │   │       ├── <TemplateSelector />
  │   │       └── <ReplyOptions />
  │   └── <TicketActions>
  │       ├── <StatusWorkflow />
  │       ├── <PriorityChanger />
  │       ├── <AssignmentPanel />
  │       ├── <SlaCountdown />
  │       ├── <TimeTracker />
  │       └── <ResolutionField />
  │
  ├── <AssetManagement>
  │   ├── <AssetStats />
  │   ├── <AssetFilters />
  │   ├── <AssetTable />
  │   │   └── <AssetRow *ngFor />
  │   ├── <AssetDetailDrawer>
  │   │   ├── <AssetDetailsTab />
  │   │   ├── <AssetHistoryTab />
  │   │   └── <AssetDocumentsTab />
  │   └── <AddAssetModal />
  │
  ├── <SystemMonitoring>
  │   ├── <GlobalStatusBanner />
  │   ├── <ServiceGrid>
  │   │   └── <ServiceCard *ngFor />
  │   ├── <MetricsCharts />
  │   ├── <ActiveIncidentsPanel>
  │   │   └── <IncidentCard *ngFor />
  │   └── <IncidentDetailModal />
  │
  ├── <KnowledgeBase>
  │   ├── <CategoryTree />
  │   ├── <ArticleList />
  │   ├── <ArticleViewer />
  │   └── <ArticleEditor />
  │
  ├── <UserManagement>
  │   ├── <UserFilters />
  │   ├── <UserTable />
  │   │   └── <UserRow *ngFor />
  │   ├── <UserDetailPanel>
  │   │   ├── <UserProfileSection />
  │   │   ├── <AccountActions />
  │   │   └── <UserActivityLog />
  │   ├── <CreateUserModal />
  │   └── <ImportUsersModal />
  │
  ├── <RemoteSupport>
  │   ├── <ActiveSessionsTable />
  │   ├── <StartSessionForm />
  │   └── <SessionViewer>
  │       ├── <RemoteDesktop />
  │       ├── <Toolbar />
  │       └── <ChatPanel />
  │
  └── <ItReports>
      ├── <ReportTypeSelector />
      ├── <ReportDateRange />
      ├── <ReportChart />
      ├── <ReportTable />
      └── <ExportActions />
```

## 7-15. (Sections condensed due to length — full detail in codebase)

**Business Rules:** SLA = 1h for Critical, 4h for High, 8h for Medium, 24h for Low. Automatic ticket closure after 3 days resolved no response. CSAT survey sent on every resolution. Password resets require identity verification via email OTP.

**Permissions:** IT Support can view all tickets, edit own, reassign to any support staff. Asset management full CRUD. User management limited to basic account actions (password reset, suspend). Cannot delete users or modify roles.

**Notification Specs:** New ticket email to unassigned pool; @mention in-app notification; SLA breach alert (in-app + email at 75%, 90%, 100% of deadline); CSAT survey email upon resolution; ticket reassignment notification.

**Error Catalog:** E01-Duplicate ticket number (auto-generated, collision 1:10^12); E02-Asset serial number duplicate; E03-Remote session connection refused; E04-SLA breached auto-escalation; E05-Knowledge base article slug conflict; E06-User not found for assignment; E07-File upload size exceeded (25MB max); E08-Bulk operation partial failure; E09-Email notification delivery failure; E10-Monitoring service unreachable.

### 3.9 Additional Screen: Ticket Templates (`/it/templates`)

**Wireframe:** Library of response templates for quick ticket replies and macros.

**Template List:**

- Table: Template Name, Category, Body preview (truncated), Created by, Last used, Usage count
- Filters: Category (Password Reset / Network Issue / Software Install / Account Access / General), Sort by usage
- "➕ New Template" button

**Template Editor (Modal):**

- Name, Category, Body (rich text with {{variable}} placeholders)
- Variables helper: inserts {{name}}, {{email}}, {{ticket_id}}, {{asset_tag}}, {{link}}
- "Save Template" button

### 3.10 Additional Screen: Scheduled Maintenance (`/it/maintenance`)

**Wireframe:** Maintenance window scheduling and communication.

**Maintenance Events Table:**

- Columns: Title, Scope/Systems affected, Start (date/time), End, Status (Scheduled/In Progress/Completed/Cancelled), Notified Users
- "➕ Schedule Maintenance" button

**Schedule Maintenance Form:**

- Title, Description, Systems affected (multi-select from services)
- Start date/time, End date/time, Timezone
- User notification: "Notify all users" toggle, Custom message (rich text)
- Approval required toggle (if scope is broad)

**Active Maintenance Banner:** When maintenance is in progress, system-wide banner shows on dashboard.

**Data Bindings:**

- `GET /api/it/maintenance`
- `POST /api/it/maintenance`
- `PATCH /api/it/maintenance/{id}`

## 4.1 Extended Schema: Maintenance Windows

```typescript
export const maintenanceWindows = sqliteTable("it_maintenance_windows", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  affectedServices: text("affected_services", { mode: "json" }).$type<string[]>().default([]),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  timezone: text("timezone").default("UTC"),
  status: text("status", { enum: ["scheduled", "in_progress", "completed", "cancelled"] })
    .notNull()
    .default("scheduled"),
  notificationSent: integer("notification_sent", { mode: "boolean" }).default(false),
  notifiedUserCount: integer("notified_user_count").default(0),
  customMessage: text("custom_message"),
  approvedById: text("approved_by_id").references(() => users.id),
  createdById: text("created_by_id").references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});
```

## 5.1 Extended API: Maintenance Endpoints

#### `GET /api/it/maintenance` — List maintenance windows

**Query:** `{ status?: string; from?: string; to?: string; }`

#### `POST /api/it/maintenance` — Create maintenance window

**Request:**

```typescript
{ title: string; description?: string; affectedServices: string[]; startDate: string; endDate: string; timezone?: string; notifyUsers?: boolean; customMessage?: string; }
```

#### `PATCH /api/it/maintenance/{id}` — Update status or details

## 6.1 Extended Component Tree

```
├── <TicketTemplates>
│   ├── <TemplateList />
│   ├── <TemplateEditor />
│   └── <VariableHelper />
│
├── <ScheduledMaintenance>
│   ├── <MaintenanceTable />
│   ├── <ScheduleForm />
│   └── <ActiveBanner />
```

## 7.1 Extended User Journeys

### Journey 4: Ticket Lifecycle (End-to-End)

1. User submits ticket via portal → status "new", assigned by auto-routing to least busy tech
2. **IT Support** sees ticket in hub → clicks to open detail
3. Reads description: "Cannot access email since this morning"
4. Checks requester's account status → user is active, last login 2h ago
5. Checks email service status → all operational
6. Tries resetting mailbox → error
7. Checks user's license → expired
8. **IT Support** replies: "Your email license has expired. I've renewed it. Please try logging out and back in." → sets status "resolved"
9. User replies: "Working now, thank you!"
10. System sends CSAT survey automatically
11. **IT Support** adds solution to knowledge base: "Email license expiration resolution"

### Journey 5: Asset Lifecycle Management

1. New employee hired → HR system webhook creates user in CEA-OS
2. **IT Support** sees notification: "New hire: Jane Smith, CS Department"
3. Opens Asset Management → finds available laptop (in stock)
4. Assigns laptop to Jane: `POST /api/it/assets/{id}/assign`
5. Status → "in_use", assignment history logged
6. Purchases new laptop to replenish stock → clicks "Add Asset"
7. Fills: Dell Latitude 5540, Serial SN12345, Purchase $1,299, Warranty 3yr
8. Asset created with tag AST-0422, status "in_stock"
9. 2 years later → laptop has hardware failure
10. **IT Support** marks asset "under_repair", logs repair history
11. Sends to vendor → 1 week later, marks "in_use" again
12. 4 years later → laptop retired, marked "retired", data wiped per policy

### Journey 6: Knowledge Base Contribution

1. **IT Support** identifies recurring issue: "Students can't reset password using the portal"
2. Creates KB article: "Password Reset Troubleshooting Guide"
3. Selects category "Account & Login", adds tags: password, reset, login, portal
4. Writes step-by-step guide with screenshots
5. Sets status "published"
6. Over next month: 340 views, 45 helpful votes, 5 not-helpful
7. Helpfulness score = 90% → article surface in search results
8. When users submit tickets about password reset → auto-suggest KB article
9. Ticket deflection rate improves by 12%

## 8.1 Extended Business Rules

| Rule                         | Detail                                                                   |
| ---------------------------- | ------------------------------------------------------------------------ |
| RB01 — Ticket Auto-Routing   | New tickets assigned to tech with fewest open tickets in same category   |
| RB02 — SLA Calculation       | Critical=1h, High=4h, Medium=8h, Low=24h from ticket creation            |
| RB03 — SLA Breach Escalation | If SLA breached → auto-escalate to IT Support Lead, re-prioritize        |
| RB04 — CSAT Survey           | Auto-sent 1h after ticket resolved; 1 reminder after 48h if unanswered   |
| RB05 — Auto-Close            | Resolved tickets auto-close after 3 days of no customer response         |
| RB06 — Asset Depreciation    | Laptop=3yr, Desktop=4yr, Server=5yr, Printer=4yr straight-line           |
| RB07 — Warranty Alert        | 30 days before expiry: yellow; expired: red; notification to asset owner |
| RB08 — KB Article Review     | Unreviewed for 6 months → flag for review; 12 months → auto-archive      |
| RB09 — Password Reset Limit  | Max 3 password resets per user per 24 hours; alert if exceeded           |
| RB10 — Bulk Action Rollback  | Bulk operations create audit trail; ability to reverse last bulk action  |

## 9.1 Extended Notifications

| Code   | Trigger                    | Channel                           | Template                 |
| ------ | -------------------------- | --------------------------------- | ------------------------ |
| N-IT01 | New ticket created         | In-app + Email (to assigned tech) | `ticket_assigned`        |
| N-IT02 | Ticket escalated           | In-app + Email + SMS (to lead)    | `ticket_escalated`       |
| N-IT03 | SLA breached               | In-app + Email + SMS (critical)   | `sla_breach`             |
| N-IT04 | Customer replied           | In-app toast                      | `customer_replied`       |
| N-IT05 | Asset warranty expiring    | Email (weekly digest)             | `warranty_expiry`        |
| N-IT06 | Maintenance starting in 1h | In-app global banner              | `maintenance_soon`       |
| N-IT07 | KB article needs review    | In-app + Email (to author)        | `kb_review_needed`       |
| N-IT08 | CSAT survey response (<3)  | In-app alert to resolver          | `csat_negative`          |
| N-IT09 | Password reset requested   | In-app (to IT)                    | `password_reset_request` |
| N-IT10 | New software request       | In-app + Email                    | `software_request`       |

## 11.1 State Management — RTK Query

```typescript
const itApi = createApi({
  reducerPath: "itApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/it" }),
  tagTypes: ["Tickets", "Ticket", "Assets", "Asset", "KB", "Maintenance", "Sessions"],
  endpoints: (builder) => ({
    getTickets: builder.query<TicketListResponse, TicketQuery>({
      query: (params) => ({ url: "/tickets", params }),
      providesTags: ["Tickets"],
    }),
    getTicket: builder.query<TicketDetail, string>({
      query: (id) => `/tickets/${id}`,
      providesTags: (result, error, id) => [{ type: "Ticket", id }],
    }),
    replyToTicket: builder.mutation<
      { id: string },
      { id: string; body: string; isInternal?: boolean }
    >({
      query: ({ id, ...body }) => ({ url: `/tickets/${id}/replies`, method: "POST", body }),
      invalidatesTags: (result, error, { id }) => [{ type: "Ticket", id }],
    }),
    updateTicketStatus: builder.mutation<void, { id: string; status: string; resolution?: string }>(
      {
        query: ({ id, ...body }) => ({ url: `/tickets/${id}/status`, method: "POST", body }),
        invalidatesTags: (result, error, { id }) => [{ type: "Ticket", id }, "Tickets"],
      },
    ),
    getAssets: builder.query<AssetListResponse, AssetQuery>({
      query: (params) => ({ url: "/assets", params }),
      providesTags: ["Assets"],
    }),
    createAsset: builder.mutation<{ id: string; assetTag: string }, CreateAssetRequest>({
      query: (body) => ({ url: "/assets", method: "POST", body }),
      invalidatesTags: ["Assets"],
    }),
    assignAsset: builder.mutation<void, { id: string; userId: string }>({
      query: ({ id, ...body }) => ({ url: `/assets/${id}/assign`, method: "POST", body }),
      invalidatesTags: (result, error, { id }) => [{ type: "Asset", id }, "Assets"],
    }),
  }),
});
```

## 12.1 Form Schemas (Zod) — Extended

```typescript
export const createTicketSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required").max(10000),
  requesterName: z.string().min(1, "Name is required").max(100),
  requesterEmail: z.string().email("Invalid email"),
  requesterPhone: z.string().optional(),
  priority: z.enum(["critical", "high", "medium", "low"]).default("medium"),
  category: z.enum([
    "hardware",
    "software",
    "network",
    "account",
    "access",
    "email",
    "printing",
    "other",
  ]),
  subcategory: z.string().optional(),
  source: z.enum(["portal", "email", "phone", "chat", "walk_in", "api"]).default("portal"),
});

export const createAssetSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(200),
    type: z.enum([
      "laptop",
      "desktop",
      "monitor",
      "printer",
      "phone",
      "tablet",
      "server",
      "network_device",
      "software_license",
      "accessory",
      "other",
    ]),
    manufacturer: z.string().max(100).optional(),
    model: z.string().max(100).optional(),
    serialNumber: z.string().max(100).optional(),
    purchaseDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    purchasePrice: z.number().min(0).optional(),
    vendor: z.string().max(200).optional(),
    warrantyStart: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    warrantyEnd: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    location: z.string().max(200).optional(),
    notes: z.string().max(2000).optional(),
  })
  .refine(
    (d) =>
      !d.warrantyStart || !d.warrantyEnd || new Date(d.warrantyEnd) > new Date(d.warrantyStart),
    {
      message: "Warranty end must be after start",
      path: ["warrantyEnd"],
    },
  );

export const maintenanceSchema = z
  .object({
    title: z.string().min(1, "Title required").max(200),
    description: z.string().max(5000).optional(),
    affectedServices: z.array(z.string()).min(1, "Select at least one service"),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Invalid datetime"),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Invalid datetime"),
    timezone: z.string().default("UTC"),
    notifyUsers: z.boolean().default(true),
    customMessage: z.string().max(2000).optional(),
  })
  .refine((d) => new Date(d.endDate) > new Date(d.startDate), {
    message: "End must be after start",
    path: ["endDate"],
  });
```

## 13.1 Analytics Events — Extended

| Event Name                  | Properties                           | Trigger                   |
| --------------------------- | ------------------------------------ | ------------------------- |
| `it_ticket_created`         | ticketId, category, priority, source | New ticket created        |
| `it_ticket_assigned`        | ticketId, assigneeId, prevAssignee   | Ticket assigned           |
| `it_ticket_resolved`        | ticketId, resolutionTime, category   | Ticket resolved           |
| `it_ticket_sla_breached`    | ticketId, slaDeadline, priority      | SLA deadline passed       |
| `it_ticket_csat_received`   | ticketId, score, category            | CSAT survey submitted     |
| `it_asset_created`          | assetId, type, purchasePrice         | New asset added           |
| `it_asset_assigned`         | assetId, userId                      | Asset assigned            |
| `it_asset_retired`          | assetId, lifespan                    | Asset retired             |
| `it_kb_article_created`     | articleId, category                  | KB article published      |
| `it_kb_article_viewed`      | articleId, category, helpful         | Article viewed + feedback |
| `it_maintenance_scheduled`  | maintenanceId, services, duration    | Maintenance created       |
| `it_maintenance_completed`  | maintenanceId, actualDuration        | Maintenance ended         |
| `it_remote_session_started` | sessionId, connectionType            | Remote session initiated  |
| `it_remote_session_ended`   | sessionId, duration                  | Remote session ended      |
| `it_user_password_reset`    | userId, resetMethod                  | Password reset performed  |

## 14.1 Accessibility — Extended

- **Ticket Hub:** Quick nav using `role="listbox"` with `aria-activedescendant` for keyboard ticket selection
- **Asset Table:** Virtual scrolling uses `role="rowgroup"` with proper `aria-rowindex`
- **Knowledge Base:** Articles use proper heading hierarchy (h1 > h2 > h3); table of contents nav has `aria-label="Table of contents"`
- **Remote Session Chat:** Live region `aria-live="polite"` for new chat messages; keyboard shortcut `Ctrl+Enter` to send
- **Maintenance Banner:** `role="alert"` with `aria-live="assertive"` for active maintenance notifications
- **File Upload:** Drag-and-drop zone has hidden file input triggered by Enter/Space; status announcements via live region
- **Session Timeout Warning:** `role="alertdialog"` with `aria-describedby` for timeout countdown
- All icons have `aria-hidden="true"` with text alternatives via `aria-label` on parent interactive elements
- Color is never the sole indicator of status (text/icon indicators accompany color badges)
- Focus order follows logical reading order (left to right, top to bottom) in all ticket/asset layouts

## 15.1 Error & Edge Case Catalog — Extended

| #   | Error                                        | Message                                                                          | Recovery                                  |
| --- | -------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------- |
| E11 | Ticket reply lost on network failure         | "Reply not sent. [Retry] [Save as Draft]"                                        | Retry or retrieve from localStorage       |
| E12 | Asset QR code label print fails              | "Label printer not responding. [Retry] [Download PDF instead]"                   | Download and print manually               |
| E13 | Remote session dropped unexpectedly          | "Connection to remote device lost. [Reconnect] [End Session]"                    | Reconnect or start new session            |
| E14 | KB article image fails to load               | "Image could not be loaded. [View Original]"                                     | Open image URL directly                   |
| E15 | Concurrent ticket edit by multiple techs     | "This ticket was modified by [Name] at [time]. [Reload]"                         | Reload to see latest changes              |
| E16 | Asset import CSV column mismatch             | "Column mapping required. Mapping: [preview]. [Confirm] [Re-map]"                | Confirm mapping or re-map columns         |
| E17 | Bulk ticket action partially succeeds        | "{n} of {m} tickets updated. Failed: [reasons]. [Retry Failed]"                  | Select and retry failed items             |
| E18 | Email notification to user bounces           | "Notification delivery failed: [error]. Ticket updated without notification."    | Manually contact user                     |
| E19 | Asset assigned to deleted user               | "User no longer active. [Reassign] [Mark as Unassigned]"                         | Reassign or unassign asset                |
| E20 | Search index not yet built for new tickets   | "Search results may be incomplete. Index last updated [time]."                   | Wait for index refresh (cron every 5 min) |
| E21 | Software license count exhausted             | "All licenses are in use. [Revoke from user] [Purchase additional]"              | Revoke or purchase more                   |
| E22 | Maintenance window overlaps existing         | "Overlapping maintenance window detected: [title] at same time."                 | Reschedule one of the windows             |
| E23 | CSAT survey link expired                     | "Survey link expired. Surveys are available for 7 days after ticket resolution." | N/A                                       |
| E24 | Agent desktop (remote support) not installed | "Remote support agent not detected on target device. [Install Instructions]"     | Send installation guide                   |

### 3.11 Additional Screen: Software License Management (`/it/licenses`)

**Wireframe:** Track software licenses, allocations, renewals, and compliance.

**License Overview Cards:**

- Total Licenses, Allocated, Available, Expiring Soon (30 days)

**License Table:**

- Columns: Software Name, Vendor, License Type (Perpetual/Subscription/Volume/OEM), Total Seats, Used Seats, Available, Purchase Date, Expiry Date, Cost, Status (Active/Expiring/Expired), Actions
- "➕ Add License" button

**License Detail Modal:**

- Software Name, Version, Vendor, License Key (masked), Purchase Date, Cost, PO Number
- Type, Total Seats, Used Seats
- Support Contract: Provider, Start, End, Contact
- Allocated to: Table of users/devices using this license
- Renewal History, Attachments (license file, invoice)

**Compliance Check:**

- "Run Compliance Check" button → verifies installed usage matches purchased licenses
- Results: Compliant / Over-licensed / Under-licensed (with details)

**Data Bindings:**

- `GET /api/it/licenses`
- `POST /api/it/licenses`
- `PATCH /api/it/licenses/{id}`
- `POST /api/it/licenses/{id}/compliance-check`

### 3.12 Additional Screen: IT Reports Dashboard (`/it/reports/dashboard`)

**Wireframe:** Configurable IT reporting dashboard with widgets.

**Widgets (drag-drop configurable):**

- Ticket Volume (last 30 days — bar chart)
- Resolution Time Trend (line chart)
- Top Categories (pie chart)
- CSAT Trend (line chart with target line)
- Asset Inventory Summary (cards)
- Open Tickets by Priority (stacked bar)
- Technician Performance (table: name, resolved, avg time, CSAT)
- System Uptime (last 30 days — gauge)

**Date Range Selector (applied to all widgets):**

- Presets: Today, Last 7 Days, Last 30 Days, This Quarter, Custom

**Export:**

- "Export Dashboard as PDF" button
- "Schedule Weekly Email" toggle

**Data Bindings:**

- `GET /api/it/reports/dashboard?startDate={iso}&endDate={iso}`

## 4.2 Extended Schema: Software Licenses

```typescript
export const softwareLicenses = sqliteTable("it_software_licenses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  softwareName: text("software_name").notNull(),
  version: text("version"),
  vendor: text("vendor").notNull(),
  licenseType: text("license_type", {
    enum: ["perpetual", "subscription", "volume", "oem"],
  }).notNull(),
  licenseKey: text("license_key"), // encrypted
  totalSeats: integer("total_seats").notNull(),
  usedSeats: integer("used_seats").default(0),
  purchaseDate: text("purchase_date"),
  cost: real("cost"),
  currency: text("currency").default("USD"),
  poNumber: text("po_number"),
  expiryDate: text("expiry_date"),
  supportProvider: text("support_provider"),
  supportStart: text("support_start"),
  supportEnd: text("support_end"),
  supportContact: text("support_contact"),
  status: text("status", { enum: ["active", "expiring", "expired"] })
    .notNull()
    .default("active"),
  lastComplianceCheck: text("last_compliance_check"),
  complianceStatus: text("compliance_status", {
    enum: ["compliant", "over_licensed", "under_licensed", "not_checked"],
  }).default("not_checked"),
  notes: text("notes"),
  createdById: text("created_by_id").references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// License allocations (junction)
export const licenseAllocations = sqliteTable("it_license_allocations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  licenseId: text("license_id")
    .notNull()
    .references(() => softwareLicenses.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => users.id),
  assetId: text("asset_id").references(() => assets.id),
  allocatedAt: text("allocated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  allocatedById: text("allocated_by_id").references(() => users.id),
  revokedAt: text("revoked_at"),
});
```

## 5.2 Extended API: License Endpoints

#### `GET /api/it/licenses` — List software licenses

**Query:** `{ status?: string; vendor?: string; search?: string; }`

#### `POST /api/it/licenses` — Add license

**Request:**

```typescript
{ softwareName: string; version?: string; vendor: string; licenseType: string; licenseKey?: string; totalSeats: number; purchaseDate?: string; cost?: number; poNumber?: string; expiryDate?: string; notes?: string; }
```

#### `PATCH /api/it/licenses/{id}` — Update license details

#### `DELETE /api/it/licenses/{id}` — Delete license

#### `POST /api/it/licenses/{id}/compliance-check` — Run compliance check (async)

#### `POST /api/it/licenses/{id}/allocate` — `{ userId?: string; assetId?: string; }`

#### `POST /api/it/licenses/{id}/revoke` — `{ allocationId: string; }`

## 7.2 Extended User Journeys

### Journey 7: Software Request & License Allocation

1. User requests "Adobe Creative Cloud" via support ticket
2. **IT Support** opens ticket → checks license pool
3. Finds "Adobe Creative Cloud — 2 of 5 seats used, 3 available"
4. Allocates license to user: `POST /api/it/licenses/{id}/allocate`
5. Sends user installation instructions from KB article
6. Ticket resolved → user installs software
7. License used seat count increments to 3/5

### Journey 8: Monthly IT Reporting

1. **IT Support** opens `/it/reports/dashboard`
2. Sets date range: "Last 30 Days"
3. Reviews Ticket Volume chart: 142 tickets created, 138 resolved
4. CSAT Trend: 4.6/5 average → good, target 4.5 met
5. Technician Performance: Shows self at 47 tickets resolved, 3.2h avg time, 4.7 CSAT
6. Notices spike in "Account" category tickets → investigates root cause
7. Finds pattern: password reset requests increased after policy change
8. Creates KB article: "New Password Requirements Guide"
9. Exports dashboard as PDF for weekly team meeting

## 8.2 Extended Business Rules — Licenses

| Rule                            | Detail                                                       |
| ------------------------------- | ------------------------------------------------------------ |
| RB11 — License Allocation Limit | Cannot allocate if usedSeats >= totalSeats; waitlist created |
| RB12 — Software Compliance      | Monthly auto-scan; under-licensed alerts to IT lead          |
| RB13 — License Renewal          | 60/30/7 day email alerts before expiry                       |
| RB14 — Subscription Audit       | Quarterly review of active subscriptions; flag unused        |
| RB15 — Open Source Policy       | All open source software usage logged in separate registry   |

---

_End of Actor Plan — IT Support_
