# Actor: System Administrator

## 1. Identity & Role Definition

**Actor ID:** `system_administrator`  
**Display Name:** System Administrator  
**Description:** Oversees all technical infrastructure, user accounts, security, system configuration, backups, integrations, and audit compliance for CEA-OS. Highest level of system access with full control over all modules.  
**System Role:** `sysadmin`  
**Hierarchy:** Reports to CTO / Director of Technology  
**Session Timeout:** 30 minutes of inactivity (enforced MFA required for all sessions)  
**Concurrent Sessions:** 1 max (security policy)  
**MFA:** Required — TOTP or FIDO2/WebAuthn hardware key

## 2. Primary Goals & Success KPIs

| Goal                       | KPI                                             | Target                 |
| -------------------------- | ----------------------------------------------- | ---------------------- |
| System availability        | Platform uptime (excluding planned maintenance) | > 99.95%               |
| User management accuracy   | Orphaned/inactive account cleanup rate          | Monthly review         |
| Security incident response | Time to acknowledge security alert              | < 15 min               |
| Backup integrity           | Successful backup restore test rate             | 100% monthly           |
| Audit compliance           | Audit log completeness                          | 100% of actions logged |
| Integration reliability    | Webhook delivery success rate                   | > 99.5%                |
| Configuration consistency  | Config drift between environments               | 0%                     |
| Vulnerability management   | Critical vulnerability patch time               | < 48 hours             |

## 3. Complete Screen Inventory

### 3.1 Admin Hub (`/admin`)

**Wireframe:** Central administration dashboard with system health, security summary, recent audit events, and quick-navigation tiles.

**Top Section — System Health Bar:**

- Overall status: Operational / Degraded / Critical
- Uptime this month: percentage
- Active services: X of Y healthy
- Active users (current): count
- API requests today: count

**Summary Cards Row:**

- Registered Users (total + change), Active Sessions (current), Pending Invitations, Open Support Tickets
- System Alerts (count, severity breakdown)

**Security Summary Widget:**

- Failed login attempts (last 24h): count
- MFA adoption rate: percentage
- Users with admin roles: count
- Recent security events: last 5 with severity, timestamp, description

**Recent Audit Events Feed:**

- Last 20 audit log entries: Timestamp, Actor, Action, Resource, IP Address
- "View All →" link to full audit log

**Quick Navigation Tiles (Grid):**

- User Management, Roles & Permissions, Security Dashboard, Audit Log, System Config, Monitoring, Backups, Integrations/Webhooks, Logs

**Data Bindings:**

- `GET /api/admin/dashboard/summary`
- `GET /api/admin/dashboard/security-summary`
- `GET /api/admin/dashboard/audit-events?limit=20`

**States:**

| State          | Behavior                                                      |
| -------------- | ------------------------------------------------------------- |
| Loading        | Full-page skeleton                                            |
| Empty          | "System is freshly deployed." with setup checklist            |
| Critical alert | Red banner: "Critical: [alert message]. [View] [Acknowledge]" |
| Degraded       | Yellow banner: "Degraded performance on [services]. [View]"   |

### 3.2 User Management (`/admin/users`)

**Wireframe:** Complete user directory with advanced search, CRUD operations, bulk actions, and detailed user management.

**User Table (Virtualized, pageable):**

- Columns: Avatar, Full Name, Email, Role(s), Department, Status (Active/Inactive/Suspended/Pending), Last Login, MFA (yes/no icon), Created, Actions
- Sortable: Name, Email, Role, Last Login, Created
- **Bulk Actions Toolbar:** Set Status, Assign Role, Delete, Export CSV, Send Email, Reset Password

**Advanced Filters (Expandable):**

- Role (multi-select), Status, Department, MFA status, Date range (created), Last login range, Email domain
- Search: Name, Email, ID

**Create User Modal / Page:**

- Personal Info: First Name (required), Last Name (required), Email (required, unique), Phone, Department
- Account: Username (auto-generated from email), Role (dropdown), Send Welcome Email toggle
- Additional: Employee/Student ID, Title/Position, Location
- "Create Account" button

**User Detail Page (`/admin/users/{id}`):**

- **Profile Tab:** All personal info (editable), photo upload, account status badge
- **Account Tab:**
  - Account status toggle: Active / Suspended (reason required) / Deactivated (reason required)
  - MFA status: Enabled / Disabled, "Reset MFA" button
  - Password: "Force Password Reset" button (user must change on next login)
  - Sessions: Active sessions list (device, IP, last active, "Terminate" button)
  - API Keys: list, "Generate API Key", "Revoke" buttons
- **Roles Tab:**
  - Assigned roles list with source (direct / group inheritance)
  - "Assign Role" button → role selector dropdown
  - Role effective permissions summary
- **Activity Tab:** Full audit trail for this user (login, actions, changes)
- **Related Data Tab:** Support tickets created, applications (if student), owned assets

**Data Bindings:**

- List: `GET /api/admin/users?search={q}&role={role}&status={status}&limit={limit}&offset={offset}`
- Create: `POST /api/admin/users`
- Detail: `GET /api/admin/users/{id}`
- Update: `PATCH /api/admin/users/{id}`
- Status: `POST /api/admin/users/{id}/status`
- Reset password: `POST /api/admin/users/{id}/reset-password`
- Sessions: `GET /api/admin/users/{id}/sessions`
- Terminate session: `POST /api/admin/users/{id}/sessions/{sessionId}/terminate`

**States:**

| State                | Behavior                                         |
| -------------------- | ------------------------------------------------ |
| Loading              | Virtualized table skeleton                       |
| Empty                | "No users found matching your criteria."         |
| Suspended user       | Row highlighted, badge icon, tooltip with reason |
| Bulk action progress | "Updating {n} users..." progress bar             |
| User create success  | "User created. Welcome email sent to [email]."   |

### 3.3 Roles & Permissions (`/admin/roles`)

**Wireframe:** Role management with permission matrix editor.

**Role List (Left Panel):**

- System roles: Super Admin, Admin, Manager, Staff, Student, etc.
- Custom roles (created by admin): listed below
- Each role: Name, User count, Description
- "➕ Create Role" button

**Role Detail (Center Panel):**

- **Header:** Role name (editable), Description, User count
- **Permissions Grid:**
  - Rows: Modules (Admissions, Marketing, IT, Dev, System, Users, etc.) with expandable sub-sections
  - Columns: View, Create, Edit, Delete, Admin
  - Toggle switches per cell: On/Off (with "Inherited from [parent]" tooltip if applicable)
  - "Select All" per row/per column checkboxes
  - Visual override indicators (bold if directly set vs inherited)
- **Assigned Users:** Table of users with this role, "Remove" action
- **Role Hierarchy:** Parent role (inherits permissions from), Child roles
- **Actions:** Save, Duplicate, Delete (disabled if users assigned)

**Create/Edit Role Modal:**

- Name (required, unique), Description, Parent role (optional, for inheritance)
- Initial permissions (copy from existing role or start fresh)

**Data Bindings:**

- Roles: `GET /api/admin/roles`
- Create: `POST /api/admin/roles`
- Detail: `GET /api/admin/roles/{id}`
- Update permissions: `PUT /api/admin/roles/{id}/permissions`
- Assign: `POST /api/admin/roles/{id}/assign` (userId)
- Remove: `POST /api/admin/roles/{id}/remove` (userId)

**States:**

| State                          | Behavior                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------ |
| Loading                        | Role list skeleton + permission grid skeleton                                  |
| Empty (no custom roles)        | "No custom roles. Create roles to define granular permissions."                |
| Unsaved changes                | "You have unsaved permission changes. [Save] [Discard]"                        |
| Delete protected (system role) | Delete button hidden for system roles; hover: "System roles cannot be deleted" |
| Role in use                    | Warning on delete: "X users are assigned this role. Reassign before deleting." |

### 3.4 Security Dashboard (`/admin/security`)

**Wireframe:** Real-time security monitoring dashboard with threat detection, authentication analytics, and security controls.

**Security Score:** Overall security posture score (0-100) with breakdown categories

**Authentication Tab:**

- Login attempts chart (success/failure, 24h/7d/30d)
- Failed login by IP (top 10): bar chart
- Failed login by user (top 10)
- MFA adoption rate: pie chart (enabled vs disabled)
- "Force MFA for All Users" button (with confirmation)
- Passwordless login adoption rate

**Threat Detection Tab:**

- Active threats: Table of detected suspicious activities
  - Columns: Timestamp, Type (Brute Force, Impossible Travel, Suspicious IP, Anomalous Access, etc.), User, IP, Location, Severity, Status, Actions
  - Actions: Acknowledge, Investigate, Block IP, Suspend User, Ignore
- Threat timeline chart
- Blocked IPs list: IP, Reason, Blocked by, Blocked at, Expires at, "Unblock" button

**Security Policies Tab:**

- Password Policy: Min length, Complexity (uppercase/lowercase/digit/special), Expiry days, History count, Lockout threshold, Lockout duration
- Session Policy: Max session duration, Idle timeout, Concurrent sessions limit, Remember device days
- MFA Policy: Required for roles (multi-select), Grace period days, Remember device days
- IP Allowlist: IP ranges/CIDR, Description, Created by
- IP Blocklist: Same structure as allowlist
- Each policy: Edit button → inline editor or modal

**Data Bindings:**

- Score: `GET /api/admin/security/score`
- Authentication: `GET /api/admin/security/authentication?period={period}`
- Threats: `GET /api/admin/security/threats?status={status}`
- Block IP: `POST /api/admin/security/threats/{id}/block`
- Policies: `GET /api/admin/security/policies`
- Update policy: `PUT /api/admin/security/policies/{id}`

**States:**

| State                       | Behavior                                                                 |
| --------------------------- | ------------------------------------------------------------------------ |
| Loading                     | Score skeleton + chart shimmers                                          |
| High security score (>80)   | Green check, "Good security posture" message                             |
| Low security score          | Red alert: "Security posture needs improvement. [View Recommendations]"  |
| Active brute force detected | Red alert card: "Brute force attack detected from {n} IPs. [Auto-Block]" |

### 3.5 Audit Log (`/admin/audit`)

**Wireframe:** Full audit log viewer with advanced search, export, and retention management.

**Search & Filters (Top Bar):**

- Date range picker (default: Last 7 days)
- Actor: User or "system" dropdown
- Action: Type filter dropdown (create, update, delete, read, login, logout, permission_change, etc.)
- Resource: Module/resource type filter
- Status: Success, Failure, All
- Search: Free text across all fields
- "Saved Searches" dropdown

**Audit Log Table:**

- Columns: Timestamp, Actor (name + avatar), Action (with icon), Resource (type + name/ID), Details (truncated), IP Address, Status (Success/Failure), Actions
- Each row expandable → shows full JSON payload of the change
- Virtualized scrolling for large datasets
- Export button: CSV, JSON, PDF

**Audit Detail Modal (on row click):**

- Full details in formatted layout:
  - Timestamp, Actor, IP, User Agent, Session ID
  - Action, Resource Type, Resource ID, Resource Name
  - Changes: Old value → New value (diff view)
  - Metadata: Correlation ID, Request ID
- "View Related Events" button (same actor, same resource, same session)

**Retention Settings:**

- Configure auto-deletion after: 90 days / 180 days / 1 year / 2 years / 7 years / Never
- Current log count and size
- "Archive Now" button → exports and compresses old logs to R2
- "Purge Now" button → deletes logs older than retention period

**Data Bindings:**

- Logs: `GET /api/admin/audit?startDate={iso}&endDate={iso}&actor={id}&action={action}&resource={type}&status={status}&search={q}&limit={limit}&offset={offset}`
- Detail: `GET /api/admin/audit/{id}`
- Export: `GET /api/admin/audit/export?format=csv|json|pdf`
- Retention: `GET /api/admin/audit/retention`
- Update retention: `PUT /api/admin/audit/retention`
- Archive: `POST /api/admin/audit/archive`
- Purge: `POST /api/admin/audit/purge`

**States:**

| State              | Behavior                                                                   |
| ------------------ | -------------------------------------------------------------------------- |
| Loading            | Table skeleton (10 rows)                                                   |
| Empty              | "No audit events match your filters for the selected period."              |
| Export in progress | "Exporting {n} events..." with progress bar, download button when ready    |
| Archive processing | "Archiving events older than {date}..." background task                    |
| Large result set   | "Showing 100 of 12,432 results. Refine filters for more specific results." |

### 3.6 System Configuration (`/admin/config`)

**Wireframe:** Hierarchical key-value configuration editor with environment awareness.

**Configuration Categories (Left Sidebar):**

- General (site name, logo, timezone, locale)
- Authentication (SSO providers, OAuth config, SAML)
- Email (SMTP settings, from address, bcc all)
- Storage (R2 bucket, CDN URL, file limits)
- API (rate limits, CORS origins, JWT expiry)
- Features (feature flags toggles)
- Notifications (default channels, rate limits)
- Integrations (API keys for third-party services)

**Config Editor (Center Panel):**

- Grouped setting cards
- Each setting: Key (monospace), Description, Current value (typed input: string, number, boolean, JSON), Environment override indicator (if different per env)
- "Override for [Environment]" toggle
- Change history: last updated, updated by
- "Reset to Default" button per setting

**Feature Flags Sub-tab:**

- Table: Flag name, Description, Enabled (Dev/Staging/Production), Owner, Created
- Toggle per environment with confirmation
- Gradual rollout percentage (for some flags)

**Data Bindings:**

- Config: `GET /api/admin/config?category={category}`
- Update: `PUT /api/admin/config/{key}`
- Reset: `DELETE /api/admin/config/{key}`
- Feature flags: `GET /api/admin/config/feature-flags`
- Toggle flag: `PATCH /api/admin/config/feature-flags/{name}`

**States:**

| State                    | Behavior                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------- |
| Loading                  | Category skeleton + setting shimmers                                                    |
| Empty category           | "No settings in this category."                                                         |
| Dirty state              | "*" indicator on categories with unsaved changes                                        |
| Invalid value            | Inline validation: "Value must be a valid URL" / "Value must be a number between 0-100" |
| Changed by another admin | "This setting was modified by [Name] [time]. [Reload] [Overwrite]"                      |

### 3.7 Monitoring (`/admin/monitoring`)

**Wireframe:** Full infrastructure monitoring with server metrics, service health, and alerting.

**Overview Tab:**

- Infrastructure: CPU, Memory, Disk, Network (aggregated graphs per server/function)
- Cloudflare Workers: Invocations, CPU time, Duration, Errors
- D1 Database: Queries, Rows read, Rows written, Storage size, Writes per second
- R2 Storage: Total objects, Total size, Requests per second
- KV: Read/Write operations, Keys count, Storage used

**Services Tab:** Same as IT Support monitoring but with infrastructure focus

- Workers list with invocation count, error rate, memory usage
- Durable Objects: Active objects, Request rate, Storage
- Queues: Messages in, Processed, Retried, Failed

**Alerts Tab:**

- Alert rules: Name, Metric, Condition (>, <, =), Threshold, Duration, Severity, Status (Active/Paused), Last triggered
- "➕ Create Alert" button → Alert rule form
- Alert history: Triggered at, Rule, Value, Duration, Acknowledged by, Resolved at

**Data Bindings:**

- Metrics: `GET /api/admin/monitoring/metrics?period={period}`
- Services: `GET /api/admin/monitoring/services`
- Alert rules: `GET /api/admin/monitoring/alerts/rules`
- Alert history: `GET /api/admin/monitoring/alerts/history`
- Create rule: `POST /api/admin/monitoring/alerts/rules`

**States:**

| State        | Behavior                                                |
| ------------ | ------------------------------------------------------- |
| Loading      | Chart skeletons (6 blocks)                              |
| No data      | "No monitoring data available for the selected period." |
| High usage   | CPU > 80%: warning highlight; > 95%: red                |
| Alert firing | Red badge on Alerts tab, notification                   |

### 3.8 Backups (`/admin/backups`)

**Wireframe:** Backup configuration, schedule, history, and restore management.

**Backup Overview Cards:**

- Last backup: timestamp, status (success/failed), size
- Next scheduled backup: timestamp
- Total backups stored: count, total size
- Last restore test: timestamp, result

**Backup Sources:**

- D1 Database, R2 Storage (config backup), KV Namespaces, System Configuration
- Each source: name, last backup, size, schedule, retention

**Backup Schedule:**

- Per source: Frequency (Hourly/Daily/Weekly/Monthly), Time, Day of week (if weekly), Day of month (if monthly), Retention count (number of backups to keep)
- "Create Backup Now" button (manual trigger)

**Backup History Table:**

- Columns: ID, Source, Type (Auto/Manual), Status (Running/Success/Failed), Size, Started, Completed, Duration, Actions
- Actions: Download, Restore, Delete
- Click row → backup detail: list of files/objects, metadata

**Restore Modal:**

- Select backup (pre-selected), environment (staging first, then production), options (restore to point-in-time)
- Warning: "This will overwrite current data. Running in [environment]. [I understand the risks]"
- "Start Restore" button
- Progress: "Restoring..." with step-by-step status

**Data Bindings:**

- Overview: `GET /api/admin/backups/overview`
- Sources: `GET /api/admin/backups/sources`
- History: `GET /api/admin/backups/history?source={source}&limit=20`
- Create: `POST /api/admin/backups/trigger?source={source}`
- Restore: `POST /api/admin/backups/{id}/restore`
- Delete: `DELETE /api/admin/backups/{id}`
- Schedule: `PUT /api/admin/backups/schedule`

**States:**

| State               | Behavior                                               |
| ------------------- | ------------------------------------------------------ |
| Loading             | Cards skeleton + table shimmer                         |
| No backups          | "No backups exist. Configure backup sources to begin." |
| Backup in progress  | Animated status, progress bar                          |
| Restore in progress | "Restoring from backup {id}. Do not close this page."  |
| Restore complete    | "Restore completed. Verify data integrity."            |
| Last backup failed  | Red alert: "Last backup failed. [View Logs] [Retry]"   |

### 3.9 Integrations & Webhooks (`/admin/integrations`)

**Wireframe:** Third-party integration management and webhook endpoint configuration.

**Integrations Tab:**

- Grid of integration cards:
  - Email (SendGrid/SES): Connected status, daily send limit, remaining
  - SMS (Twilio): Connected status, account balance
  - Storage (R2): Bucket name, region
  - SSO (Google/Microsoft/Azure AD): Connected status, domains allowed
  - Payment (Stripe): Connected status, account ID
  - Analytics (PostHog/Amplitude): Host, API key masked
  - Monitoring (Sentry): DSN masked, environment
  - Slack: Connected workspace, channels
- Each card: Status icon, Name, Description, "Configure" / "Disconnect" button
- "➕ Add Integration" button → integration catalog modal

**Integration Configuration Modal:**

- Provider-specific fields (API keys, secrets, endpoints, scopes)
- "Test Connection" button
- Save / Cancel

**Webhooks Tab:**

- Webhook endpoints table:
  - Columns: Name, URL, Events (badge count), Status (Active/Paused/Failed), Last triggered, Last success, Actions
  - Actions: Edit, Test, Pause/Resume, Delete
- "➕ Add Webhook" button

**Add/Edit Webhook Form:**

- Name, Description, Payload URL (validated), Secret (HMAC signing), Events (multi-select tree: module > action)
  - e.g., admissions.application.created, marketing.lead.captured
- Filter conditions (optional JSON): only fire when condition matches
- Retry policy: Max retries (0-5), Retry interval (1m/5m/15m/1h)
- Format dropdown: JSON / Form-encoded
- Active toggle

**Webhook Delivery History:**

- Table: Timestamp, Event, Status (Success/Failed/Retrying), Response status, Duration, Retry count
- Click → full request/response detail
- "Redeliver" button

**Data Bindings:**

- Integrations: `GET /api/admin/integrations`
- Configure: `PUT /api/admin/integrations/{id}`
- Test: `POST /api/admin/integrations/{id}/test`
- Webhooks: `GET /api/admin/webhooks`
- Create webhook: `POST /api/admin/webhooks`
- Update: `PUT /api/admin/webhooks/{id}`
- Delete: `DELETE /api/admin/webhooks/{id}`
- History: `GET /api/admin/webhooks/{id}/history`
- Redeliver: `POST /api/admin/webhooks/history/{id}/redeliver`
- Test fire: `POST /api/admin/webhooks/{id}/test`

**States:**

| State                    | Behavior                                                        |
| ------------------------ | --------------------------------------------------------------- |
| Loading                  | Integration card skeletons (6) + webhook table skeleton         |
| Empty integrations       | "No integrations configured. Connect third-party services."     |
| Empty webhooks           | "No webhook endpoints. Create one to receive real-time events." |
| Integration disconnected | Card shows "Disconnected", "Reconnect" button                   |
| Webhook failing          | "Last 5 deliveries failed. [View History] [Disable]"            |
| Secret shown one time    | "Copy your secret now. You won't be able to see it again."      |

### 3.10 Logs (`/admin/logs`)

**Wireframe:** Centralized log viewer for all system components with real-time streaming.

**Log Source Selector:**

- Workers logs, API logs, Database logs, Auth logs, Queue logs, System logs (Cloudflare), CDN logs
- Multi-select for cross-referencing

**Log Viewer:**

- Real-time streaming (WebSocket/SSE) with pause/resume
- Historical search with date range
- Filter bar: Level (error/warn/info/debug), Source, Query string, Request ID, User ID, IP
- Log line format: Timestamp (localized), Level badge, Source, Message, JSON metadata (expandable)
- Highlight: Errors in red, Warnings in yellow
- "Copy Line" button, "View Context" (surrounding lines ±5)

**Saved Searches:**

- Save current filters as named search
- Quick-access dropdown

**Data Bindings:**

- Search: `POST /api/admin/logs/search` (with query DSL)
- Stream: WebSocket `wss://{host}/api/admin/logs/stream`
- Export: `POST /api/admin/logs/export`

**States:**

| State      | Behavior                                               |
| ---------- | ------------------------------------------------------ |
| Loading    | "Connecting to log stream..." spinner                  |
| No results | "No log entries match your query."                     |
| Streaming  | "Streaming live logs. [Pause]" with live indicator dot |
| Paused     | "Paused — showing historical results. [Resume]"        |

## 4. Full Database Schema

```typescript
// ============================================================
// schema/admin/index.ts
// ============================================================
import { sqliteTable, text, integer, real, uniqueIndex, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ─────────────────────────────────────────────
// 1. USERS (core user — may reference auth system)
// ─────────────────────────────────────────────
export const users = sqliteTable("admin_users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  avatarUrl: text("avatar_url"),
  department: text("department"),
  jobTitle: text("job_title"),
  employeeId: text("employee_id"),
  // Account
  status: text("status", { enum: ["active", "inactive", "suspended", "pending"] })
    .notNull()
    .default("pending"),
  statusReason: text("status_reason"),
  emailVerified: integer("email_verified", { mode: "boolean" }).default(false),
  mfaEnabled: integer("mfa_enabled", { mode: "boolean" }).default(false),
  mfaMethod: text("mfa_method", { enum: ["totp", "webauthn", "sms", "email"] }),
  lastLoginAt: text("last_login_at"),
  lastLoginIp: text("last_login_ip"),
  lastPasswordChangedAt: text("last_password_changed_at"),
  passwordHistory: text("password_history", { mode: "json" }).$type<string[]>().default([]),
  // Metadata
  createdById: text("created_by_id").references((): typeof users => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
  deletedAt: text("deleted_at"),
});

// ─────────────────────────────────────────────
// 2. ROLES
// ─────────────────────────────────────────────
export const roles = sqliteTable("admin_roles", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
  description: text("description"),
  parentId: text("parent_id").references((): typeof roles => roles.id),
  isSystem: integer("is_system", { mode: "boolean" }).default(false), // cannot delete
  permissions: text("permissions", { mode: "json" }).$type<PermissionMap>().default({}),
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
// 3. USER ROLES (junction table)
// ─────────────────────────────────────────────
export const userRoles = sqliteTable(
  "admin_user_roles",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    roleId: text("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    assignedById: text("assigned_by_id").references(() => users.id),
    assignedAt: text("assigned_at")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (table) => ({
    userRoleIdx: uniqueIndex("idx_admin_user_role").on(table.userId, table.roleId),
  }),
);

// ─────────────────────────────────────────────
// 4. AUDIT LOGS
// ─────────────────────────────────────────────
export const auditLogs = sqliteTable("admin_audit_logs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  timestamp: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
  actorId: text("actor_id").references(() => users.id),
  actorName: text("actor_name").notNull(),
  actorEmail: text("actor_email"),
  action: text("action").notNull(), // "user.created", "role.updated", etc.
  actionGroup: text("action_group"), // "user", "role", "config", "security", "backup", etc.
  resourceType: text("resource_type"),
  resourceId: text("resource_id"),
  resourceName: text("resource_name"),
  details: text("details", { mode: "json" }).$type<Record<string, unknown>>(),
  changes: text("changes", { mode: "json" }).$type<ChangeRecord[]>(),
  status: text("status", { enum: ["success", "failure"] })
    .notNull()
    .default("success"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  sessionId: text("session_id"),
  correlationId: text("correlation_id"),
  requestId: text("request_id"),
});

// ─────────────────────────────────────────────
// 5. SYSTEM CONFIG
// ─────────────────────────────────────────────
export const systemConfig = sqliteTable("admin_system_config", {
  key: text("key").primaryKey(),
  value: text("value", { mode: "json" }).notNull(),
  description: text("description"),
  category: text("category", {
    enum: [
      "general",
      "authentication",
      "email",
      "storage",
      "api",
      "features",
      "notifications",
      "integrations",
    ],
  })
    .notNull()
    .default("general"),
  type: text("type", { enum: ["string", "number", "boolean", "json"] })
    .notNull()
    .default("string"),
  environmentOverrides: text("environment_overrides", { mode: "json" })
    .$type<Record<string, unknown>>()
    .default({}),
  isSecret: integer("is_secret", { mode: "boolean" }).default(false),
  updatedById: text("updated_by_id").references(() => users.id),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 6. FEATURE FLAGS
// ─────────────────────────────────────────────
export const featureFlags = sqliteTable("admin_feature_flags", {
  name: text("name").primaryKey(),
  description: text("description"),
  enabled: text("enabled", { mode: "json" }).$type<EnvironmentFlags>().notNull(), // {dev: true, staging: true, production: false}
  rolloutPercentage: integer("rollout_percentage").default(100), // for gradual rollout
  ownerId: text("owner_id").references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 7. BACKUPS
// ─────────────────────────────────────────────
export const backups = sqliteTable("admin_backups", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  source: text("source", { enum: ["database", "storage", "kv", "config"] }).notNull(),
  type: text("type", { enum: ["auto", "manual"] })
    .notNull()
    .default("auto"),
  status: text("status", { enum: ["running", "success", "failed"] })
    .notNull()
    .default("running"),
  size: integer("size"), // bytes
  fileCount: integer("file_count"),
  storageKey: text("storage_key"), // R2 key
  startedAt: text("started_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  completedAt: text("completed_at"),
  duration: integer("duration"), // seconds
  errorMessage: text("error_message"),
  triggeredById: text("triggered_by_id").references(() => users.id),
  metadata: text("metadata", { mode: "json" }).$type<Record<string, unknown>>().default({}),
});

// ─────────────────────────────────────────────
// 8. BACKUP SCHEDULES
// ─────────────────────────────────────────────
export const backupSchedules = sqliteTable("admin_backup_schedules", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  source: text("source", { enum: ["database", "storage", "kv", "config"] })
    .notNull()
    .unique(),
  frequency: text("frequency", { enum: ["hourly", "daily", "weekly", "monthly"] })
    .notNull()
    .default("daily"),
  time: text("time").default("02:00"), // HH:mm
  dayOfWeek: integer("day_of_week"), // 0=Sun, for weekly
  dayOfMonth: integer("day_of_month"), // for monthly
  retention: integer("retention").default(30), // number of backups to keep
  enabled: integer("enabled", { mode: "boolean" }).default(true),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 9. WEBHOOKS
// ─────────────────────────────────────────────
export const webhooks = sqliteTable("admin_webhooks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description"),
  url: text("url").notNull(),
  secret: text("secret"),
  events: text("events", { mode: "json" }).$type<string[]>().notNull(),
  filterConditions: text("filter_conditions", { mode: "json" })
    .$type<Record<string, unknown>>()
    .default({}),
  format: text("format", { enum: ["json", "form"] })
    .notNull()
    .default("json"),
  maxRetries: integer("max_retries").default(3),
  retryInterval: integer("retry_interval").default(60), // seconds
  status: text("status", { enum: ["active", "paused", "failed"] })
    .notNull()
    .default("active"),
  createdById: text("created_by_id").references(() => users.id),
  lastTriggeredAt: text("last_triggered_at"),
  lastSuccessAt: text("last_success_at"),
  lastFailureAt: text("last_failure_at"),
  consecutiveFailures: integer("consecutive_failures").default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 10. WEBHOOK DELIVERY HISTORY
// ─────────────────────────────────────────────
export const webhookHistory = sqliteTable("admin_webhook_history", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  webhookId: text("webhook_id")
    .notNull()
    .references(() => webhooks.id, { onDelete: "cascade" }),
  event: text("event").notNull(),
  payload: text("payload", { mode: "json" }).notNull(),
  responseStatus: integer("response_status"),
  responseBody: text("response_body"),
  status: text("status", { enum: ["success", "failed", "retrying"] }).notNull(),
  attempts: integer("attempts").default(1),
  duration: integer("duration"), // ms
  errorMessage: text("error_message"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 11. SECURITY EVENTS / THREATS
// ─────────────────────────────────────────────
export const securityEvents = sqliteTable("admin_security_events", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  eventType: text("event_type", {
    enum: [
      "brute_force",
      "impossible_travel",
      "suspicious_ip",
      "anomalous_access",
      "new_device",
      "mass_action",
      "api_abuse",
      "other",
    ],
  }).notNull(),
  severity: text("severity", { enum: ["low", "medium", "high", "critical"] }).notNull(),
  userId: text("user_id").references(() => users.id),
  ipAddress: text("ip_address"),
  location: text("location"), // geoip
  userAgent: text("user_agent"),
  details: text("details", { mode: "json" }).$type<Record<string, unknown>>().default({}),
  status: text("status", { enum: ["new", "investigating", "resolved", "ignored"] })
    .notNull()
    .default("new"),
  actionTaken: text("action_taken"), // "blocked_ip", "suspended_user", "none"
  resolvedById: text("resolved_by_id").references(() => users.id),
  resolvedAt: text("resolved_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 12. INTEGRATIONS
// ─────────────────────────────────────────────
export const integrations = sqliteTable("admin_integrations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  provider: text("provider", {
    enum: [
      "sendgrid",
      "ses",
      "twilio",
      "stripe",
      "posthog",
      "amplitude",
      "sentry",
      "slack",
      "google_sso",
      "microsoft_sso",
      "azure_sso",
      "other",
    ],
  })
    .notNull()
    .unique(),
  displayName: text("display_name").notNull(),
  status: text("status", { enum: ["connected", "disconnected", "error"] })
    .notNull()
    .default("disconnected"),
  config: text("config", { mode: "json" }).$type<Record<string, unknown>>().default({}),
  lastTestedAt: text("last_tested_at"),
  testResult: text("test_result"),
  errorMessage: text("error_message"),
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
// Indexes
// ─────────────────────────────────────────────
export const auditTimestampIdx = index("idx_admin_audit_timestamp").on(auditLogs.timestamp);
export const auditActorIdx = index("idx_admin_audit_actor").on(auditLogs.actorId);
export const auditActionIdx = index("idx_admin_audit_action").on(auditLogs.action);
export const auditResourceIdx = index("idx_admin_audit_resource").on(
  auditLogs.resourceType,
  auditLogs.resourceId,
);
export const auditCorrelationIdx = index("idx_admin_audit_correlation").on(auditLogs.correlationId);
export const backupSourceIdx = index("idx_admin_backup_source").on(backups.source);
export const backupStatusIdx = index("idx_admin_backup_status").on(backups.status);
export const webhookStatusIdx = index("idx_admin_webhook_status").on(webhooks.status);
export const webhookHistoryWebhookIdx = index("idx_admin_webhook_history_webhook").on(
  webhookHistory.webhookId,
);
export const securityEventStatusIdx = index("idx_admin_security_status").on(securityEvents.status);
export const securityEventTypeIdx = index("idx_admin_security_type").on(securityEvents.eventType);
export const userStatusIdx = index("idx_admin_user_status").on(users.status);
export const userEmailIdx = uniqueIndex("idx_admin_user_email").on(users.email);
export const roleNameIdx = uniqueIndex("idx_admin_role_name").on(roles.name);

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface PermissionMap {
  [module: string]: {
    [action: string]: boolean; // view, create, edit, delete, admin
  };
}

export interface ChangeRecord {
  field: string;
  oldValue: unknown;
  newValue: unknown;
}

export interface EnvironmentFlags {
  development: boolean;
  staging: boolean;
  production: boolean;
}
```

## 5. Complete API Contract (Selected Endpoints)

#### `GET /api/admin/users` — List users with filters, pagination

#### `POST /api/admin/users` — Create user, returns `{ id, email }`

#### `GET /api/admin/users/{id}` — Full user detail with roles, MFA, sessions

#### `PATCH /api/admin/users/{id}` — Update user fields

#### `POST /api/admin/users/{id}/status` — Suspend/activate with reason

#### `POST /api/admin/users/{id}/reset-password` — Force password reset

#### `POST /api/admin/users/{id}/sessions/{sessionId}/terminate` — Kill session

#### `GET /api/admin/roles` — List all roles with user count

#### `POST /api/admin/roles` — Create role (`{ name, description, parentId, permissions }`)

#### `PUT /api/admin/roles/{id}/permissions` — Full permission map replacement

#### `POST /api/admin/roles/{id}/assign` — Assign user to role

#### `POST /api/admin/roles/{id}/remove` — Remove user from role

#### `GET /api/admin/audit` — Query audit logs with filters, pagination, export

#### `GET /api/admin/config?category=X` — Get config for category

#### `PUT /api/admin/config/{key}` — Update config value

#### `GET /api/admin/backups/overview` — Backup summary

#### `POST /api/admin/backups/trigger` — Manual backup

#### `POST /api/admin/backups/{id}/restore` — Restore from backup

#### `GET /api/admin/webhooks` — List webhooks

#### `POST /api/admin/webhooks` — Create webhook

#### `POST /api/admin/webhooks/{id}/test` — Fire test event

#### `GET /api/admin/webhooks/{id}/history` — Delivery history

#### `POST /api/admin/webhooks/history/{id}/redeliver` — Retry delivery

#### `GET /api/admin/logs/search` — Query logs with DSL

#### `GET /api/admin/security/score` — Security posture score

#### `GET /api/admin/security/threats` — Active threats

#### `POST /api/admin/security/threats/{id}/block` — Block IP

#### `PUT /api/admin/security/policies` — Update security policies

## 6. Component Tree

```
<AdminLayout>
  ├── <AdminHub>
  │   ├── <SystemHealthBar />
  │   ├── <SummaryCardGrid />
  │   ├── <SecuritySummaryWidget />
  │   ├── <RecentAuditFeed />
  │   └── <QuickNavTiles />
  │
  ├── <UserManagement>
  │   ├── <UserTable />
  │   ├── <UserFilters />
  │   ├── <CreateUserModal />
  │   └── <UserDetailPage>
  │       ├── <ProfileTab />
  │       ├── <AccountTab>
  │       │   ├── <StatusToggle />
  │       │   ├── <MfaSection />
  │       │   ├── <PasswordSection />
  │       │   └── <ActiveSessions />
  │       ├── <RolesTab />
  │       ├── <ActivityTab />
  │       └── <RelatedDataTab />
  │
  ├── <RolesPermissions>
  │   ├── <RoleList />
  │   ├── <RoleDetail>
  │   │   ├── <PermissionMatrix />
  │   │   └── <AssignedUsers />
  │   └── <CreateRoleModal />
  │
  ├── <SecurityDashboard>
  │   ├── <SecurityScore />
  │   ├── <AuthTab />
  │   ├── <ThreatDetectionTab />
  │   └── <SecurityPoliciesTab />
  │
  ├── <AuditLogViewer>
  │   ├── <AuditFilters />
  │   ├── <AuditTable />
  │   ├── <AuditDetailModal />
  │   └── <RetentionSettings />
  │
  ├── <SystemConfig>
  │   ├── <ConfigCategoryNav />
  │   ├── <ConfigEditor />
  │   └── <FeatureFlagsTab />
  │
  ├── <MonitoringPage>
  │   ├── <InfrastructureMetrics />
  │   ├── <ServicesStatus />
  │   └── <AlertsManager />
  │
  ├── <BackupManager>
  │   ├── <BackupOverview />
  │   ├── <BackupHistory />
  │   ├── <BackupScheduler />
  │   └── <RestoreModal />
  │
  ├── <IntegrationsPage>
  │   ├── <IntegrationGrid />
  │   ├── <IntegrationConfigModal />
  │   ├── <WebhookTable />
  │   ├── <WebhookForm />
  │   └── <WebhookHistory />
  │
  └── <LogViewer>
      ├── <LogSourceSelector />
      ├── <LogStream />
      ├── <LogFilters />
      └── <SavedSearches />
```

## 7-15. (Key Specifications)

**Business Rules:**

1. Cannot delete yourself from admin role or suspend your own account
2. System roles (Super Admin, Admin) cannot be deleted or renamed
3. Audit logs are append-only; no deletion except via retention policy purge
4. Configuration changes logged to audit with old/new values
5. Backup before any restore operation; restore requires confirmation from 2 admins
6. Webhook secrets shown only once at creation; stored hashed
7. Password policy changes only apply to new/reset passwords, not existing
8. Security events auto-create support ticket if severity = critical
9. Rate limiting: Admin API has 30 req/min per user (higher than regular users)
10. All admin actions require audit log entry (failure to log = action rolled back)

**Notifications:**

- N-A01: New user registered → in-app
- N-A02: Suspicious login detected → email + Slack (critical)
- N-A03: Backup failed → email + in-app
- N-A04: Backup restored → email to requester + all admins
- N-A05: Webhook consecutive failures (5+) → in-app + email
- N-A06: Security policy change → email to all admins
- N-A07: SSL certificate expiring (30/14/7 days) → email + in-app
- N-A08: Storage usage > 80% → in-app alert
- N-A09: Failed login rate spike > 100/hr → Slack + email
- N-A10: Daily audit summary → email (contains unusual events)

**Permissions:**

| Feature      | View | Create | Edit     | Delete      | Admin            |
| ------------ | ---- | ------ | -------- | ----------- | ---------------- |
| Users        | All  | ✅     | All      | All         | All              |
| Roles        | All  | ✅     | All      | All         | All              |
| Audit Logs   | All  | ❌     | ❌       | ❌          | ❌ (append-only) |
| Config       | All  | ✅     | All      | Reset       | All              |
| Backups      | All  | ✅     | Schedule | All         | All              |
| Webhooks     | All  | ✅     | All      | All         | All              |
| Integrations | All  | ✅     | All      | All         | All              |
| Security     | Self | ✅     | Policies | Blocklist   | All              |
| Monitoring   | All  | Alerts | Alerts   | ❌          | All              |
| Logs         | All  | ❌     | ❌       | Export only | All              |

**Error Catalog:**

- E01: Role still has assigned users → cannot delete
- E02: Email already exists → 409 on user create
- E03: Audit export too large (>100K events) → request async generation
- E04: Backup source not configured → cannot trigger backup
- E05: Restore from incompatible backup version → reject
- E06: Webhook URL not responding → mark as failed after retries exhausted
- E07: Concurrent config edit detected → last-write-wins with audit trail
- E08: Security policy violation by admin action → double confirmation required
- E09: Session limit reached for user → prevent login; notify
- E10: Feature flag name collision → reject creation

### 3.11 Additional Screen: API Keys & Service Tokens (`/admin/api-keys`)

**Wireframe:** Management of internal and external API keys used by the system.

**API Keys Table:**

- Columns: Key Name, Prefix (first 8 chars), Scope/Roles, Created, Expires, Last Used, Status (Active/Expired/Revoked), Created By, Actions
- "➕ Generate API Key" button

**Generate API Key Modal:**

- Name (required), Expiration (30d/90d/180d/1yr/No expiry), Scopes (multi-select: admissions.read, admissions.write, marketing.read, etc.)
- "Generate Key" button → shows full key once with warning: "Copy this key now. It will not be shown again."
- Key stored as bcrypt hash; only prefix stored in plaintext for identification

**Revoke/Delete:**

- Revoke: immediate invalidation, confirmation required
- Delete: removes record entirely

**Service Tokens (Machine-to-Machine):**

- Table: Token Name, Service, Permissions, Last Rotated, Status
- "Rotate Token" button → generates new token, invalidates old

**Data Bindings:**

- `GET /api/admin/api-keys`
- `POST /api/admin/api-keys`
- `DELETE /api/admin/api-keys/{id}`
- `POST /api/admin/api-keys/{id}/revoke`

### 3.12 Additional Screen: Rate Limiting & Throttling (`/admin/rate-limits`)

**Wireframe:** Rate limit configuration per endpoint, role, or IP range.

**Rate Limit Rules Table:**

- Columns: Rule Name, Scope (Global/Endpoint/Role/IP), Pattern/Identifier, Requests, Window (seconds), Status (Active/Inactive), Last Triggered, Actions
- "➕ Add Rule" button

**Add Rule Form:**

- Name, Description
- Scope: Global (all endpoints), Endpoint (specific path + method), Role (specific user role), IP (CIDR range)
- Limit: Max requests, Window duration (seconds)
- Action: Block / Throttle (slow down)
- Response: Status code (429 default), Retry-After header
- Active toggle

**Rate Limit Analytics:**

- Chart: Requests blocked vs allowed per hour
- Top blocked IPs table
- Most throttled endpoints table

**Data Bindings:**

- `GET /api/admin/rate-limits`
- `POST /api/admin/rate-limits`
- `PATCH /api/admin/rate-limits/{id}`

## 4.1 Extended Schema: API Keys, Rate Limits

```typescript
export const apiKeys = sqliteTable("admin_api_keys", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  keyPrefix: text("key_prefix").notNull(), // first 8 chars for identification
  keyHash: text("key_hash").notNull(), // bcrypt hash of full key
  scopes: text("scopes", { mode: "json" }).$type<string[]>().default([]),
  expiresAt: text("expires_at"),
  lastUsedAt: text("last_used_at"),
  status: text("status", { enum: ["active", "expired", "revoked"] })
    .notNull()
    .default("active"),
  createdById: text("created_by_id").references(() => users.id),
  revokedAt: text("revoked_at"),
  revokedById: text("revoked_by_id").references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

export const rateLimitRules = sqliteTable("admin_rate_limit_rules", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description"),
  scope: text("scope", { enum: ["global", "endpoint", "role", "ip"] }).notNull(),
  pattern: text("pattern"), // path pattern for endpoint, role name, CIDR for IP
  method: text("method"), // GET/POST/PATCH/etc for endpoint scope
  maxRequests: integer("max_requests").notNull(),
  windowSeconds: integer("window_seconds").notNull(),
  action: text("action", { enum: ["block", "throttle"] })
    .notNull()
    .default("block"),
  status: text("status", { enum: ["active", "inactive"] })
    .notNull()
    .default("active"),
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

## 5.1 Extended API Endpoints

#### `GET /api/admin/api-keys` — List all API keys

#### `POST /api/admin/api-keys` — `{ name, expiresIn, scopes[] }` → `{ id, keyPrefix, fullKey }` (fullKey only once)

#### `DELETE /api/admin/api-keys/{id}` — Delete key record

#### `POST /api/admin/api-keys/{id}/revoke` — Revoke key immediately

#### `GET /api/admin/rate-limits` — List rules

#### `POST /api/admin/rate-limits` — `{ name, scope, pattern, method, maxRequests, windowSeconds, action }`

#### `PATCH /api/admin/rate-limits/{id}` — Update rule

#### `DELETE /api/admin/rate-limits/{id}` — Delete rule

## 7.1 Extended User Journeys

### Journey 4: Security Incident Response

1. **SysAdmin** sees critical security alert on dashboard: "Impossible travel detected for user jsmith"
2. Opens Security Dashboard → Threats tab
3. Details: User logged in from New York at 9:00 AM and from Lagos at 9:15 AM
4. Current status: "investigating"
5. Checks user's active sessions → sees 2 sessions: one from NY, one from Lagos IP
6. **SysAdmin** terminates Lagos session
7. Reviews audit log for user's recent activity → no data access after second login
8. Blocks Lagos IP: `POST /api/admin/security/threats/{id}/block`
9. Changes user status to "suspended" pending investigation
10. Calls user to verify → user confirms they are in NY, did not log in from Lagos
11. Forces password reset, enables MFA for user
12. Sets threat status → "resolved", action taken "blocked_ip, suspended_user, password_reset"
13. Writes incident report in docs: "Incident Report IR-2026-0042: Account Takeover Attempt"

### Journey 5: New Integration Setup

1. **SysAdmin** → Integrations → "➕ Add Integration"
2. Selects "Slack" from provider list
3. Enters Slack Webhook URL, channel name "#cea-alerts"
4. Clicks "Test Connection" → system sends test message → "Connected successfully"
5. Configures which events send to Slack: Deployments, Error alerts, Security threats
6. Saves integration → status "connected"
7. Tests by deploying to staging → Slack notification received in #cea-alerts

### Journey 6: Backup Restore Test

1. **SysAdmin** navigates to Backups → Reviews last backup: "Success, 2 hours ago, 1.2GB"
2. Clicks backup row → "Restore" button
3. Selects environment: "staging" (never production first)
4. Checks "Restore to point-in-time" → selects time
5. Reads warning → checks "I understand the risks"
6. Clicks "Start Restore" → progress begins
7. Restore completes in 4 minutes → verification step
8. Verifies data integrity: sample records, row counts match
9. Marks restore test as successful in system
10. Logs result: "Monthly restore test completed successfully on staging environment"

## 8.1 Extended Business Rules

| Rule                                | Detail                                                                                              |
| ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| RB01 — API Key Permissions          | Keys inherit permissions of creating user, cannot exceed them                                       |
| RB02 — Key Rotation                 | Keys with "no expiry" auto-flagged for review every 90 days                                         |
| RB03 — Rate Limit Priority          | IP rules > Role rules > Endpoint rules > Global rules                                               |
| RB04 — Backup Retention             | Hourly backups retained for 7 days; daily for 30 days; weekly for 6 months; monthly for 2 years     |
| RB05 — Restore Requirements         | Production restore requires 2 SysAdmin approvals; always restore to staging first                   |
| RB06 — Security Event Auto-Response | 5 failed logins from same IP in 10 min → auto-block for 1 hour                                      |
| RB07 — MFA Enforcement              | New admin users have 7-day grace period to enable MFA; after that, access restricted                |
| RB08 — Audit Log Integrity          | Audit logs are append-only at DB level (INSERT-only permissions); deletion via retention purge only |
| RB09 — Configuration Change Window  | Production config changes logged and require confirmation; no rollback for secrets                  |
| RB10 — Session Limits               | SysAdmin limited to 1 concurrent session; other roles follow role config                            |

## 9.1 Extended Notifications

| Code  | Trigger                               | Channel                |
| ----- | ------------------------------------- | ---------------------- |
| N-A11 | API key created                       | In-app                 |
| N-A12 | API key expiring (7 days)             | Email                  |
| N-A13 | Rate limit rule triggered frequently  | In-app + Email         |
| N-A14 | New integration connected             | In-app                 |
| N-A15 | Integration connection lost           | In-app + Email + Slack |
| N-A16 | Backup failed                         | Email + SMS            |
| N-A17 | Backup restore completed              | Email + In-app         |
| N-A18 | Security auto-block triggered         | In-app + Email + Slack |
| N-A19 | Rate limit threshold approached (80%) | In-app                 |
| N-A20 | API key scope change                  | Email audit alert      |

## 11.1 State Management — Extended

```typescript
const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin" }),
  tagTypes: [
    "Dashboard",
    "Users",
    "User",
    "Roles",
    "Audit",
    "Config",
    "Backups",
    "Integrations",
    "Webhooks",
    "Security",
    "Logs",
    "ApiKeys",
    "RateLimits",
  ],
  endpoints: (builder) => ({
    getUsers: builder.query<UserList, UserQuery>({
      query: (params) => ({ url: "/users", params }),
      providesTags: ["Users"],
    }),
    createUser: builder.mutation<{ id: string; email: string }, CreateUserRequest>({
      query: (body) => ({ url: "/users", method: "POST", body }),
      invalidatesTags: ["Users"],
    }),
    getUser: builder.query<UserDetail, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    updateUserStatus: builder.mutation<void, { id: string; status: string; reason: string }>({
      query: ({ id, ...body }) => ({ url: `/users/${id}/status`, method: "POST", body }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }, "Users"],
    }),
    resetUserPassword: builder.mutation<void, string>({
      query: (id) => ({ url: `/users/${id}/reset-password`, method: "POST" }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
    getRoles: builder.query<Role[], void>({
      query: () => "/roles",
      providesTags: ["Roles"],
    }),
    createRole: builder.mutation<{ id: string }, CreateRoleRequest>({
      query: (body) => ({ url: "/roles", method: "POST", body }),
      invalidatesTags: ["Roles"],
    }),
    updatePermissions: builder.mutation<void, { id: string; permissions: PermissionMap }>({
      query: ({ id, permissions }) => ({
        url: `/roles/${id}/permissions`,
        method: "PUT",
        body: permissions,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Roles", id }],
    }),
    getAuditLogs: builder.query<AuditList, AuditQuery>({
      query: (params) => ({ url: "/audit", params }),
      providesTags: ["Audit"],
    }),
    getConfig: builder.query<ConfigCategory[], string>({
      query: (category) => ({ url: "/config", params: { category } }),
      providesTags: ["Config"],
    }),
    updateConfig: builder.mutation<void, { key: string; value: unknown }>({
      query: ({ key, value }) => ({ url: `/config/${key}`, method: "PUT", body: { value } }),
      invalidatesTags: ["Config"],
    }),
    getBackups: builder.query<BackupList, void>({
      query: () => "/backups/history",
      providesTags: ["Backups"],
    }),
    triggerBackup: builder.mutation<{ id: string }, string>({
      query: (source) => ({ url: "/backups/trigger", method: "POST", params: { source } }),
      invalidatesTags: ["Backups"],
    }),
    restoreBackup: builder.mutation<{ id: string }, { id: string; environment: string }>({
      query: ({ id, environment }) => ({
        url: `/backups/${id}/restore`,
        method: "POST",
        body: { environment },
      }),
      invalidatesTags: ["Backups"],
    }),
    getIntegrations: builder.query<Integration[], void>({
      query: () => "/integrations",
      providesTags: ["Integrations"],
    }),
    getWebhooks: builder.query<Webhook[], void>({
      query: () => "/webhooks",
      providesTags: ["Webhooks"],
    }),
    createWebhook: builder.mutation<{ id: string }, CreateWebhookRequest>({
      query: (body) => ({ url: "/webhooks", method: "POST", body }),
      invalidatesTags: ["Webhooks"],
    }),
    getApiKeys: builder.query<ApiKey[], void>({
      query: () => "/api-keys",
      providesTags: ["ApiKeys"],
    }),
    generateApiKey: builder.mutation<
      { id: string; fullKey: string; keyPrefix: string },
      GenerateApiKeyRequest
    >({
      query: (body) => ({ url: "/api-keys", method: "POST", body }),
      invalidatesTags: ["ApiKeys"],
    }),
  }),
});
```

## 12.1 Form Schemas (Zod) — Extended

```typescript
export const createUserSchema = z.object({
  firstName: z.string().min(1, "First name required").max(100),
  lastName: z.string().min(1, "Last name required").max(100),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  department: z.string().max(100).optional(),
  jobTitle: z.string().max(100).optional(),
  employeeId: z.string().max(50).optional(),
  roleId: z.string().uuid("Select a role"),
  sendWelcomeEmail: z.boolean().default(true),
});

export const createRoleSchema = z.object({
  name: z
    .string()
    .min(1, "Role name required")
    .max(100)
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, hyphens, underscores"),
  description: z.string().max(500).optional(),
  parentId: z.string().uuid().optional(),
  permissions: z.record(z.record(z.boolean())).default({}),
});

export const generateApiKeySchema = z.object({
  name: z.string().min(1, "Key name required").max(100),
  expiresIn: z.enum(["30d", "90d", "180d", "1yr", "never"]).default("90d"),
  scopes: z.array(z.string()).min(1, "Select at least one scope"),
});

export const createWebhookSchema = z.object({
  name: z.string().min(1, "Name required").max(200),
  description: z.string().max(500).optional(),
  url: z
    .string()
    .url("Must be a valid URL")
    .refine((url) => url.startsWith("https://"), "URL must use HTTPS"),
  secret: z.string().min(16, "Secret must be at least 16 characters").max(256).optional(),
  events: z.array(z.string()).min(1, "Select at least one event"),
  format: z.enum(["json", "form"]).default("json"),
  maxRetries: z.number().int().min(0).max(5).default(3),
  retryInterval: z.number().int().min(10).max(3600).default(60),
});

export const createBackupScheduleSchema = z.object({
  source: z.enum(["database", "storage", "kv", "config"]),
  frequency: z.enum(["hourly", "daily", "weekly", "monthly"]),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid time (HH:mm)"),
  dayOfWeek: z.number().int().min(0).max(6).optional(),
  dayOfMonth: z.number().int().min(1).max(31).optional(),
  retention: z.number().int().min(1).max(365).default(30),
});
```

## 13.1 Analytics Events — Extended

| Event                            | Properties                    | Trigger                    |
| -------------------------------- | ----------------------------- | -------------------------- |
| `admin_user_created`             | userId, roleId, createdBy     | User account created       |
| `admin_user_suspended`           | userId, reason, suspendedBy   | User suspended             |
| `admin_user_deleted`             | userId, deletedBy             | User deleted (soft)        |
| `admin_role_created`             | roleId, name, isSystem        | Role created               |
| `admin_permission_changed`       | roleId, permissions           | Permissions updated        |
| `admin_config_changed`           | key, category, environment    | Config value changed       |
| `admin_backup_triggered`         | backupId, source, type        | Backup started             |
| `admin_backup_restored`          | backupId, source, environment | Restore executed           |
| `admin_webhook_created`          | webhookId, eventCount         | Webhook endpoint created   |
| `admin_webhook_delivered`        | webhookId, event, status      | Webhook delivery attempted |
| `admin_integration_connected`    | integrationId, provider       | Integration configured     |
| `admin_security_threat_detected` | threatId, type, severity      | Security event created     |
| `admin_ip_blocked`               | ipAddress, reason, blockedBy  | IP blocked                 |
| `admin_rate_limit_rule_created`  | ruleId, scope, pattern        | Rate limit rule added      |
| `admin_api_key_generated`        | keyId, scopes, expiry         | API key created            |
| `admin_api_key_revoked`          | keyId, revokedBy              | API key revoked            |

## 14.1 Accessibility — Extended

- **User Management Table:** Virtual scrolling with `role="rowgroup"`; each row has `aria-label` with user name and status; sortable column headers are buttons with `aria-sort` attribute.
- **Permissions Matrix:** Grid with `role="grid"`, cells are `role="gridcell"` with checkbox inputs; keyboard navigation with arrow keys; row/column header `aria-label` for context.
- **Audit Log Viewer:** Expandable rows use `aria-expanded` on toggle; diff view shows old/new values with proper heading labels.
- **Backup Restore Flow:** Step-by-step wizard with `aria-current="step"` on active step; confirmation checkbox required before restore starts.
- **Webhook Secret Display:** Secret shown in a `role="alert"` dialog with warning text; copy button has `aria-label="Copy secret to clipboard"`.
- **Security Dashboard:** Real-time alerts use `aria-live="assertive"` for critical and `aria-live="polite"` for warnings.
- **Monitoring Charts:** `role="img"` with `aria-label` summarizing data; accompanying data table below each chart for screen reader users.
- All admin forms have `aria-required="true"` on required fields, `aria-invalid` and `aria-describedby` for error messages.

## 15.1 Error & Edge Case Catalog — Extended

| #   | Error                                               | Message                                                                         | Recovery                      |
| --- | --------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------- |
| E11 | Role name already exists                            | "Role name [name] is already in use."                                           | Choose different name         |
| E12 | Cannot delete role with assigned users              | "This role has [n] assigned users. Reassign before deleting."                   | Reassign users first          |
| E13 | API key generation fails (hash collision)           | "Key collision detected, regenerating..."                                       | Auto-retry with new key       |
| E14 | Webhook URL timeout (>5s on test)                   | "Webhook URL did not respond within 5 seconds. [Retry] [Save Anyway]"           | Fix URL or increase timeout   |
| E15 | Configuration value validation failed               | "Invalid value for [key]: [reason]. [Edit Value]"                               | Correct the value             |
| E16 | Backup storage (R2) unavailable                     | "Backup storage unavailable. Automatic retry in 30 minutes."                    | Check R2 configuration        |
| E17 | Audit export memory limit exceeded                  | "Export too large for real-time generation. Request queued for async export."   | Will receive email when ready |
| E18 | Rate limit rule conflicts with existing rule        | "Rule conflicts with existing rule [name]. [View Conflict] [Override]"          | Adjust pattern or priority    |
| E19 | Integration test connection fails                   | "Connection test failed: [error]. [Edit Configuration] [Retry]"                 | Check API keys/endpoints      |
| E20 | Cannot restore backup from different schema version | "Backup schema version ([v1]) differs from current ([v2]). Migration required." | Contact development team      |
| E21 | User email change conflicts with existing           | "Email [email] is already in use by another user."                              | Verify email ownership        |
| E22 | Session termination fails (already expired)         | "Session already expired or terminated."                                        | Refresh session list          |
| E23 | Webhook payload too large (>1MB)                    | "Webhook payload exceeds 1MB limit. Consider filtering events."                 | Add filter conditions         |
| E24 | Concurrent backup for same source already running   | "A backup for [source] is already in progress. [View Progress]"                 | Wait for completion           |

---

_End of Actor Plan — System Administrator_
