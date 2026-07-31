# Actor: Director

## 1. Identity & Role Definition

- **ID:** `actor:director`
- **Display Name:** Director
- **Description:** Top-level executive with full cross-departmental visibility and control. Responsible for strategic direction, financial oversight, operational governance, and organisational performance across Cyber Elias Academy.
- **System Persona:** Executive command user — reads aggregated real-time KPIs, approves/rejects high-stakes requests, sets OKRs, drills into department-level analytics, and manages confidential data.
- **Authentication Level:** Tier 3 (highest) — requires YubiKey hardware MFA + biometric + session-pinning.
- **Session Timeout:** 15 minutes of inactivity; forced re-auth on any approval or financial action.
- **Impersonation:** Director may view any other actor's dashboard in read-only shadow mode (audit logged).
- **Default Landing:** `/director/command-center`

## 2. Primary Goals & Success KPIs

| Goal                                            | KPI                      | Target        | Measurement          |
| ----------------------------------------------- | ------------------------ | ------------- | -------------------- |
| Real-time visibility into organisational health | Dashboard load time      | <800ms P95    | Grafana RT monitor   |
| Fast approval cycles for critical requests      | Approval turnaround      | <4h avg       | Audit log timestamps |
| Strategic planning & execution                  | OKR completion rate      | >75% q-on-q   | OKR system           |
| Financial control & budget adherence            | Budget variance          | <±5% per dept | ERP integration      |
| Academic quality assurance                      | Student success rate     | >85%          | Academic DB          |
| Operational efficiency                          | Process cycle time       | -20% yoy      | Operations DB        |
| Data-driven decisions                           | Ad-hoc report generation | <30s          | Analytics engine     |

## 3. Complete Screen Inventory

### 3.1 Executive Command Center — `/director/command-center`

**Wireframe:** Full-screen real-time cockpit. Top row: 6 KPI metric cards (revenue, active students, burn rate, NPS, staff headcount, pipeline value). Middle: dual line charts (revenue vs cost 12m, enrolment trend 12m). Bottom: scrollable activity feed (latest 50 events) + quick-action toolbar.

**UI Fields / Components:**

- `KpiCard` × 6 — each with: label, current value, previous period delta (%, up/down arrow), sparkline (7d), on-click drill to detail report
- `TimeRangeSelector` — preset buttons: 24h / 7d / 30d / 90d / 1y / Custom (date range picker)
- `DualLineChart` — revenue (green) vs cost (red) with tooltip crosshair; Y-axis currency, X-axis month
- `BarChart` — enrolment by programme stacked by cohort
- `DonutChart` — revenue by department
- `ActivityFeed` — infinite-scroll list with event type icon, timestamp, summary, link to detail
- `QuickActions` — floating toolbar: [New Approval] [New OKR] [Generate Report] [Broadcast Message] [Emergency Alert]
- `AlertBanner` — dismissible top bar for system-wide notifications (e.g., "RDS failover occurred at 14:03")

**Data Bindings:**

- `GET /api/v1/director/command-center` → `DirectorDashboardResponse`
- Real-time WebSocket (Durable Object `CommandCenterDO`) for live KPI updates every 5s
- Activity feed paginated via cursor: `GET /api/v1/activity-feed?cursor=xxx&limit=50`

**States:**

- **Loading:** Skeleton screens for each card/chart. KPIs show shimmer placeholders. Charts render empty canvas with spinner overlay.
- **Empty:** First-run state — "Welcome to CEA-OS Command Center. Connect your data sources to see KPIs." + setup wizard CTA.
- **Error:** Banner: "Unable to load command center data. [Retry]" — each card/chart degrades independently. WebSocket disconnect → "Live updates paused. Reconnecting..." with a reconnect button.
- **Edge Cases:**
  - Browser tab backgrounded → WebSocket heartbeat paused; on focus, fast-replay last 30s of events.
  - KPI value overflow: revenue > 999B → show ">999B" with tooltip exact value.
  - Zero-delta: show "—" instead of "0.0%".
  - Partial data: some departments not reporting → "Data pending from [dept]" chip on affected card.
  - Mobile: cards stack vertically, charts become full-width stacked.

### 3.2 Financial Overview — `/director/finance`

**Wireframe:** Top: 4 KPI cards (Total Revenue, Net Income, Burn Rate, ARPU). Below: tabs — [P&L] [Balance Sheet] [Cash Flow] [Budget vs Actual] [Departmental Spend]. Right sidebar: actionable Alerts (e.g., "Marketing 23% over budget").

**Sub-screens:**

#### 3.2.1 P&L (Profit & Loss)

- Month/year selector + fiscal year toggle
- Line items: Revenue streams (tuition, corporate training, grants, merchandise, investments) vs Expenses (salary, infra, marketing, ops, R&D, misc)
- Each line: current period, prior period, YTD, budget, variance, trend arrow
- Expandable rows to drill into sub-categories
- Export button → PDF/CSV/XLSX
- Data: `GET /api/v1/finance/pl?period=2026-07&type=actual`

#### 3.2.2 Balance Sheet

- Assets (current, fixed, intangible) / Liabilities (current, long-term) / Equity
- Period comparison side-by-side
- Key ratios card: Current Ratio, Debt-to-Equity, Working Capital

#### 3.2.3 Cash Flow

- Operating / Investing / Financing sections
- Net cash change + opening/closing balance
- Burn rate projection chart (forecast 90d based on current run-rate)

#### 3.2.4 Budget vs Actual

- Department-level budget vs actual by month
- Traffic-light indicators: green (≤5% var), amber (5-15%), red (>15%)
- Click row → drill into department cost lines
- `POST /api/v1/finance/budget/alert-ack` to dismiss an over-budget alert

#### 3.2.5 Departmental Spend

- Treemap visualisation by department
- Top 5 vendors by spend table
- Anomaly detection alerts (e.g., "3x normal AWS spend detected")

**States:**

- **Loading:** Tab-specific skeleton. Chart placeholder.
- **Empty:** "No financial data for this period. Sync your accounting system." + connection wizard.
- **Error:** "Finance module unavailable. Data may be stale (last synced: [timestamp])." + retry.
- **Edge Cases:**
  - Fiscal year-end adjustments in flight → "Provisional — subject to audit adjustment" watermark.
  - Multi-currency → all converted to base currency (USD) with exchange rate timestamp.
  - Negative values → shown in parentheses with red colour.

### 3.3 Academic Overview — `/director/academic`

**Wireframe:** Top KPI row: Total Students, Active Enrolments, Graduation Rate (cohort), Average Grade, Student Satisfaction (NPS), Instructor Count. Below: tabs — [Enrolment Trends] [Programme Performance] [Faculty Metrics] [Student Demographics] [Course Analytics].

**Sub-screens:**

#### 3.3.1 Enrolment Trends

- Line chart: new enrolments vs dropouts by month (12m)
- Stacked bar: enrolments by programme
- Funnel: Application → Accepted → Enrolled → Active → Graduated
- Filters: programme, cohort, date range

#### 3.3.2 Programme Performance

- Table: Programme | Enrolled | Grad Rate | Avg Grade | NSS Score | Revenue | Cost | Margin
- Sortable, filterable, searchable
- Click → detail modal with trend charts, instructor list, student feedback summary

#### 3.3.3 Faculty Metrics

- Table: Instructor | Courses | Students | Avg Rating | Avg Grade | Workload (hrs)
- Workload heatmap (day × week)
- Student-to-faculty ratio gauge

#### 3.3.4 Student Demographics

- Charts: Age distribution, geographic map (country), gender, prior education, employment status
- Filters: programme, cohort, intake year

#### 3.3.5 Course Analytics

- Per-course: completion rate, avg grade, avg time spent, drop-off points, rating distribution
- Bottom-performing courses highlighted

**States:**

- **Loading:** Per-tab skeleton, chart placeholder.
- **Empty:** "No academic data. Ensure student records are imported." + import wizard link.
- **Error:** "Academic data source unreachable. Contact IT." + retry.
- **Edge Cases:**
  - Small cohorts (<5 students) → data suppressed for privacy, shown as "*"
  - Mid-semester data → "In-progress — not final" badge
  - Multiple academic calendars → normalised to system fiscal calendar

### 3.4 Operations Overview — `/director/operations`

**Wireframe:** Top KPI row: Active Projects, On-Time Rate, Avg Resolution Time, System Uptime, Ticket Volume, SLA Compliance %. Below: tabbed sections — [Projects] [IT/Security] [Facilities] [Process Audit].

**Sub-screens:**

#### 3.4.1 Projects

- Gantt chart of all active projects with milestones
- Status board: On Track / At Risk / Behind / Completed
- Resource allocation bar (used vs available FTE)
- Filter by department, priority, PM

#### 3.4.2 IT / Security

- System health cards: each service (API, DB, CDN, Email, etc.) with status (up/down/degraded), uptime %, last incident
- Security scorecard: vulnerabilities by severity, days since last audit, compliance status (ISO 27001, SOC2, GDPR)
- Open incident count by priority

#### 3.4.3 Facilities

- Building occupancy (current vs capacity)
- Room utilisation heatmap
- Maintenance requests: open vs resolved (30d)
- Energy consumption trend

#### 3.4.4 Process Audit

- Process compliance rate per dept
- Non-conformities by category
- Audit schedule timeline
- CAPA (Corrective & Preventive Action) tracking

**States:**

- **Loading:** Skeleton, chart placeholders.
- **Empty:** "No operational data. Connect your project management and monitoring tools."
- **Error:** Degraded state per sub-system.

### 3.5 HR Overview — `/director/hr`

**Wireframe:** Top KPI row: Headcount (active), New Hires (30d), Turnover Rate (annualised), Avg Tenure, Open Positions, Employee Satisfaction. Below: tabs — [Org Chart] [Headcount Trends] [Compensation] [Performance] [Recruitment].

**Sub-screens:**

#### 3.5.1 Org Chart

- Interactive org tree with photos, titles, direct reports count
- Click employee → mini profile card (role, dept, tenure, manager)
- Export org chart as PDF/PNG

#### 3.5.2 Headcount Trends

- Line chart: active headcount by month (24m)
- Stacked bar: hires vs departures
- Department headcount breakdown
- FTE vs contractor split

#### 3.5.3 Compensation

- Salary distribution histogram by role
- Total compensation by department
- Benefits cost breakdown
- Compensation ratio vs market benchmark

#### 3.5.4 Performance

- Rating distribution pie chart
- Top performers list (rating ≥4.5)
- Low performers list (rating ≤2.5) with PIP status
- 9-box grid scatter plot

#### 3.5.5 Recruitment

- Funnel: Applications → Screened → Interviewed → Offered → Hired
- Time-to-hire trend
- Source-of-hire breakdown
- Open positions with days-open, applications count

**States:**

- **Loading:** Skeleton per section.
- **Empty:** "HR data pending. Connect your HRIS system."
- **Error:** "HR module unavailable. Data cached as of [timestamp]."

### 3.6 Marketing Overview — `/director/marketing`

**Wireframe:** Top KPI row: MQLs, SQLs, Conversion Rate, CAC, Marketing ROI, Pipeline Generated. Below: tabs — [Campaign Performance] [Channel Mix] [Lead Funnel] [Content Analytics] [Brand Health].

**Sub-screens:**

#### 3.6.1 Campaign Performance

- Table: Campaign | Spend | Impressions | Clicks | CTR | Conversions | CPA | ROAS
- Sortable, filterable by date range, channel
- Top/bottom performers flagged

#### 3.6.2 Channel Mix

- Pie chart: spend by channel
- Stacked bar: leads by channel and stage
- Table: Channel | Spend | Leads | SQLs | CAC | ROAS

#### 3.6.3 Lead Funnel

- Funnel: Website Visits → MQL → SQL → Opportunity → Won
- Conversion rates at each stage
- Drop-off analysis

#### 3.6.4 Content Analytics

- Top content pieces by views, engagement, conversions
- Content gap analysis
- SEO performance: organic traffic, keyword rankings, backlinks

#### 3.6.5 Brand Health

- NPS trend (12m)
- Social mention volume and sentiment
- Share of voice vs competitors
- PR coverage timeline

**States:**

- **Loading:** Skeleton.
- **Empty:** "Connect your marketing platforms (Google Ads, Meta, HubSpot)."
- **Error:** Partial data from disconnected sources.

### 3.7 Approvals — `/director/approvals`

**Wireframe:** Tabbed views — [Pending My Action] [My History] [All Pending (delegated)]. Each approval card: type icon, title, requester, amount (if financial), department, urgency flag, date, preview snippet, [Approve] [Reject] [Delegate] buttons.

**Sub-states:**

- **Pending:** Awaiting director decision
- **Approved:** Green checkmark, timestamp, processed by
- **Rejected:** Red X, reason required
- **Delegated:** Grey, shows delegate name
- **Expired:** Auto-denied after deadline

**Approval Types:**

- Budget increase request (% and absolute)
- New position / hire
- Vendor contract > $50K
- Marketing campaign > $10K
- Travel request > $5K
- Policy exception
- Academic programme change
- Strategic partnership MOU
- Emergency expenditure

**Data:** `GET /api/v1/approvals?status=pending&type=all&page=1`
`POST /api/v1/approvals/:id/approve` / `reject` / `delegate`

**States:**

- **Loading:** Card skeleton list
- **Empty:** "No pending approvals. You're all caught up!" + confetti (optional fireworks toggle)
- **Error:** "Approval service unavailable. [Retry]"

### 3.8 Strategic Planning / OKRs — `/director/okrs`

**Wireframe:** Left sidebar: OKR cycles (FY2026-H1, FY2026-H2...). Main: nested Objective → Key Results with progress bars (0-100%). Each KR: title, owner, progress %, confidence level (high/medium/low), last updated. Top bar: [New Objective] [Import from Template] [Align] [Scorecard].

**Sub-screens:**

#### 3.8.1 OKR Detail View

- Objective title, description, owner, period
- List of Key Results: each with title, description, measurement type (% / number / boolean), baseline, target, current value, progress bar, owner, confidence level
- Check-in history timeline for each KR
- Comments thread per KR

#### 3.8.2 OKR Alignment Map

- Tree/network visual showing how objectives cascade across departments
- Conflicts (overlapping or contradictory KRs) highlighted in red

#### 3.8.3 Scorecard

- All objectives with: progress, health (on-track/at-risk/behind), owner
- Filter by department, quarter, health
- Export to PDF/Excel

**States:**

- **Loading:** Skeleton.
- **Empty (first cycle):** "No OKRs defined. Start by creating your first objective."
- **Empty (during cycle):** "No OKRs for this period. Import from previous cycle or create new."
- **Error:** "OKR module unavailable."

### 3.9 Reports Drill-Down — `/director/reports`

**Wireframe:** Left panel: report library tree (folders: Financial, Academic, Operations, HR, Marketing, Custom). Main: report builder / viewer. Toggle between [Builder Mode] and [View Mode].

**Features:**

- Drag-and-drop metrics / dimensions / filters
- Chart type selector: line, bar, stacked bar, pie, table, heatmap, scatter, funnel, gauge
- Date range, comparison period
- Save as named report, schedule email delivery (cron: daily/weekly/monthly)
- Export: PDF, PNG, CSV, XLSX, Google Sheets (via OAuth)
- Drill-down: click data point → open detail modal

**Data Sources available:**

- All previous screens' data tables
- Raw event stream (audit log, page views, API calls)
- Student DB, Finance DB, HR DB, CRM DB, LMS DB
- Custom SQL mode (superuser only, logged)

**States:**

- **Loading:** Report builder loads. Query execution shows spinner with elapsed time.
- **Empty:** "No reports yet. Create a new report or explore the template gallery."
- **Error:** "Query execution failed: [error detail]. Check your formula and fields."
- **Edge Cases:**
  - Query > 30s: timeout with "Query too complex. Add filters or reduce date range."
  - Result > 10K rows: "Result set truncated to 10K rows. Export full data to CSV."
  - Schema changed: "Some fields may be outdated. Refresh report definition."

## 4. Full Database Schema

### Table: `director_bookmarks`

```sql
CREATE TABLE director_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  director_id UUID NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('report','approval','okr','kpi','dashboard','student','employee')),
  entity_id UUID NOT NULL,
  label VARCHAR(255) NOT NULL,
  metadata JSONB DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(director_id, entity_type, entity_id),
  INDEX idx_director_bookmarks_director (director_id),
  INDEX idx_director_bookmarks_type (entity_type)
);
```

### Table: `director_annotations`

```sql
CREATE TABLE director_annotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  director_id UUID NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  content TEXT NOT NULL,
  is_private BOOLEAN DEFAULT true,
  pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_director_annotations_entity (entity_type, entity_id),
  INDEX idx_director_annotations_director (director_id)
);
```

### Table: `approval_requests`

```sql
CREATE TABLE approval_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type VARCHAR(50) NOT NULL CHECK (request_type IN (
    'budget_increase','new_position','vendor_contract','campaign',
    'travel','policy_exception','programme_change','partnership','emergency'
  )),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  requester_id UUID NOT NULL REFERENCES auth_users(id),
  department_id UUID NOT NULL REFERENCES departments(id),
  urgency VARCHAR(20) NOT NULL CHECK (urgency IN ('low','medium','high','critical')),
  amount DECIMAL(15,2),
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','delegated','expired')),
  assigned_to UUID REFERENCES auth_users(id),
  delegated_to UUID REFERENCES auth_users(id),
  approved_at TIMESTAMPTZ,
  rejected_at TIMESTAMPTZ,
  rejection_reason TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_approval_status (status),
  INDEX idx_approval_assignee (assigned_to),
  INDEX idx_approval_type (request_type),
  INDEX idx_approval_created (created_at DESC)
);
```

### Table: `approval_comments`

```sql
CREATE TABLE approval_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  approval_id UUID NOT NULL REFERENCES approval_requests(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth_users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_approval_comments_approval (approval_id)
);
```

### Table: `approval_attachments`

```sql
CREATE TABLE approval_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  approval_id UUID NOT NULL REFERENCES approval_requests(id) ON DELETE CASCADE,
  file_name VARCHAR(500) NOT NULL,
  file_key VARCHAR(500) NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  uploaded_by UUID NOT NULL REFERENCES auth_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_approval_attachments_approval (approval_id)
);
```

### Table: `okr_cycles`

```sql
CREATE TABLE okr_cycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  fiscal_year INT NOT NULL,
  period VARCHAR(10) NOT NULL CHECK (period IN ('h1','h2','q1','q2','q3','q4','annual')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','active','closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_okr_cycles_status (status),
  UNIQUE(fiscal_year, period)
);
```

### Table: `okr_objectives`

```sql
CREATE TABLE okr_objectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cycle_id UUID NOT NULL REFERENCES okr_cycles(id) ON DELETE CASCADE,
  parent_objective_id UUID REFERENCES okr_objectives(id),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL REFERENCES auth_users(id),
  department_id UUID REFERENCES departments(id),
  weight DECIMAL(5,2) DEFAULT 1.0 CHECK (weight >= 0 AND weight <= 1),
  progress DECIMAL(5,2) DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  health VARCHAR(20) DEFAULT 'on_track' CHECK (health IN ('on_track','at_risk','behind','not_started')),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_okr_objectives_cycle (cycle_id),
  INDEX idx_okr_objectives_owner (owner_id),
  INDEX idx_okr_objectives_dept (department_id)
);
```

### Table: `okr_key_results`

```sql
CREATE TABLE okr_key_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  objective_id UUID NOT NULL REFERENCES okr_objectives(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  measurement_type VARCHAR(20) NOT NULL CHECK (measurement_type IN ('percentage','number','boolean','currency')),
  baseline_value DECIMAL(15,2) DEFAULT 0,
  target_value DECIMAL(15,2) NOT NULL,
  current_value DECIMAL(15,2) DEFAULT 0,
  unit VARCHAR(50),
  owner_id UUID NOT NULL REFERENCES auth_users(id),
  confidence VARCHAR(10) DEFAULT 'medium' CHECK (confidence IN ('high','medium','low')),
  progress DECIMAL(5,2) DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_okr_krs_objective (objective_id)
);
```

### Table: `okr_checkins`

```sql
CREATE TABLE okr_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key_result_id UUID NOT NULL REFERENCES okr_key_results(id) ON DELETE CASCADE,
  value DECIMAL(15,2) NOT NULL,
  confidence VARCHAR(10) NOT NULL CHECK (confidence IN ('high','medium','low')),
  note TEXT,
  created_by UUID NOT NULL REFERENCES auth_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_okr_checkins_kr (key_result_id),
  INDEX idx_okr_checkins_created (created_at DESC)
);
```

### Table: `director_dashboard_config`

```sql
CREATE TABLE director_dashboard_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  director_id UUID NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  layout JSONB NOT NULL DEFAULT '[]',
  pinned_kpis VARCHAR(50)[] DEFAULT '{}',
  theme VARCHAR(20) DEFAULT 'light' CHECK (theme IN ('light','dark','system')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(director_id)
);
```

### Table: `kpi_definitions`

```sql
CREATE TABLE kpi_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN ('financial','academic','operations','hr','marketing','strategic')),
  unit VARCHAR(50),
  formula TEXT,
  data_source VARCHAR(100),
  refresh_interval_seconds INT DEFAULT 300,
  min_value DECIMAL(15,2),
  max_value DECIMAL(15,2),
  higher_is_better BOOLEAN DEFAULT true,
  warning_threshold DECIMAL(5,2),
  critical_threshold DECIMAL(5,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_kpi_definitions_category (category)
);
```

### Table: `kpi_snapshots`

```sql
CREATE TABLE kpi_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kpi_id UUID NOT NULL REFERENCES kpi_definitions(id) ON DELETE CASCADE,
  value DECIMAL(15,2) NOT NULL,
  previous_value DECIMAL(15,2),
  delta DECIMAL(15,2),
  delta_percentage DECIMAL(7,2),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  INDEX idx_kpi_snapshots_kpi (kpi_id),
  INDEX idx_kpi_snapshots_recorded (recorded_at DESC)
);
```

### Table: `director_scheduled_reports`

```sql
CREATE TABLE director_scheduled_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  director_id UUID NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  report_config JSONB NOT NULL,
  schedule_cron VARCHAR(100) NOT NULL,
  recipients VARCHAR(500)[] NOT NULL,
  format VARCHAR(20) NOT NULL DEFAULT 'pdf' CHECK (format IN ('pdf','csv','xlsx','html')),
  enabled BOOLEAN DEFAULT true,
  last_sent_at TIMESTAMPTZ,
  next_send_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_scheduled_reports_director (director_id)
);
```

### Table: `activity_events`

```sql
CREATE TABLE activity_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL,
  actor_id UUID NOT NULL REFERENCES auth_users(id),
  actor_name VARCHAR(255) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  summary TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  severity VARCHAR(20) DEFAULT 'info' CHECK (severity IN ('info','warning','critical')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_activity_events_type (event_type),
  INDEX idx_activity_events_actor (actor_id),
  INDEX idx_activity_events_created (created_at DESC),
  INDEX idx_activity_events_severity (severity)
);
```

## 5. Complete API Contract

### 5.1 Command Center

```
GET /api/v1/director/command-center
Auth: Director (Tier 3)
Response:
{
  kpis: Array<{
    id: string;
    code: string;
    name: string;
    value: number;
    previousValue: number;
    delta: number;
    deltaPercentage: number;
    unit: string;
    sparklineData: Array<{ date: string; value: number }>;
    trend: 'up' | 'down' | 'flat';
    status: 'normal' | 'warning' | 'critical';
  }>;
  revenueVsCost: Array<{ month: string; revenue: number; cost: number }>;
  enrolmentTrend: Array<{ month: string; value: number; programme: string }>;
  revenueByDepartment: Array<{ department: string; value: number }>;
  alerts: Array<{ id: string; type: string; message: string; severity: string }>;
}
Error codes: 401, 403, 500, 503
```

```
WebSocket wss://api.cea.io/ws/command-center
Event: kpi:update { kpiId, value, previousValue, delta, timestamp }
Event: alert:new { alertId, message, severity }
Event: activity:new { event }
Heartbeat: every 10s, expect pong within 5s or reconnect
```

### 5.2 Finance

```
GET /api/v1/finance/pl
Query: period (YYYY-MM), fiscal_year (int), type ('actual'|'budget'|'forecast')
Auth: Director, Finance Manager
Response: { lineItems: Array<{ category, subcategory, current, prior, ytd, budget, variance, variancePct }>, summary: { totalRevenue, totalExpenses, netIncome } }

GET /api/v1/finance/balance-sheet
Query: as_of_date (ISO date)
Response: { assets: Array<{ category, subcategory, value, priorValue }>, liabilities: [...], equity: [...], ratios: { currentRatio, deRatio, workingCapital } }

GET /api/v1/finance/cash-flow
Query: from, to (ISO dates)
Response: { operating: Array<{ line, value }>, investing: [...], financing: [...], netChange, openingBalance, closingBalance, burnRate, runwayDays }

GET /api/v1/finance/budget-vs-actual
Query: fiscal_year, department_id (optional)
Response: Array<{ deptId, deptName, budget, actual, variance, variancePct, status }>

POST /api/v1/finance/budget/alert-ack
Body: { alertId: string, note?: string }
Response: { success: boolean }
```

### 5.3 Academic

```
GET /api/v1/academic/overview
Query: programme_id?, cohort?, from, to
Auth: Director, Academic Manager
Response: { totalStudents, activeEnrolments, graduationRate, avgGrade, nps, instructorCount }

GET /api/v1/academic/enrolment-trend
Query: programme_id?, from, to, granularity (month|quarter)
Response: Array<{ period, newEnrolments, dropouts, netChange, programme }>

GET /api/v1/academic/programme-performance
Query: programme_id?, sort_by, order, page, limit
Response: { data: Array<{ programmeId, programmeName, enrolled, gradRate, avgGrade, nssScore, revenue, cost, margin }>, pagination: { page, limit, total, totalPages } }

GET /api/v1/academic/faculty-metrics
Query: department_id?, sort_by
Response: Array<{ instructorId, name, coursesCount, studentsCount, avgRating, avgGrade, workloadHrs }>

GET /api/v1/academic/student-demographics
Query: programme_id?, cohort
Response: { ageDistribution: Array<{ range, count }>, geographicMap: Array<{ country, count }>, gender: Array<{ label, count }>, priorEducation: Array<{ type, count }>, employment: Array<{ status, count }> }

GET /api/v1/academic/course-analytics
Query: programme_id?, sort_by, page, limit
Response: { data: Array<{ courseId, courseName, completionRate, avgGrade, avgTimeSpent, dropOffRate, ratingDistribution }>, pagination }
```

### 5.4 Operations

```
GET /api/v1/operations/overview
Auth: Director, Ops Manager
Response: { activeProjects, onTimeRate, avgResolutionTime, systemUptime, ticketVolume, slaCompliance }

GET /api/v1/operations/projects
Query: status?, department_id?, priority?, page, limit
Response: { data: Array<{ projectId, name, status, progress, deadline, pm, department, priority, resourceUtilization }>, pagination }

GET /api/v1/operations/it-security
Response: { services: Array<{ name, status, uptimePct, lastIncident }>, security: { vulnsBySeverity, daysSinceLastAudit, complianceStatus }, openIncidents: number }

GET /api/v1/operations/facilities
Response: { occupancy: { current, capacity, pct }, roomUtilisation: Array<{ room, pct }>, maintenanceRequests: { open, resolved30d }, energyTrend: Array<{ month, kwh }> }

GET /api/v1/operations/process-audit
Response: { complianceRate, nonConformities: Array<{ category, count }>, upcomingAudits: Array<{ date, scope, status }>, capaTracking: Array<{ id, title, status, deadline }> }
```

### 5.5 HR

```
GET /api/v1/hr/overview
Auth: Director, HR Manager
Response: { headcount, newHires30d, turnoverRate, avgTenure, openPositions, employeeSatisfaction }

GET /api/v1/hr/org-chart
Response: Array<{ employeeId, name, title, photoUrl, department, managerId, directReports: Array<{...}> }>

GET /api/v1/hr/headcount-trend
Query: from, to, granularity (month|quarter)
Response: { trend: Array<{ period, active, hires, departures }>, departmentBreakdown: Array<{ dept, count }>, fteContractorSplit: { fte, contractor } }

GET /api/v1/hr/compensation
Response: { salaryDistribution: Array<{ range, count }>, byDepartment: Array<{ dept, total, avg }>, benefitsCost: Array<{ type, total }>, marketRatio: number }

GET /api/v1/hr/performance
Response: { ratingDistribution: Array<{ rating, count }>, topPerformers: Array<{ employeeId, name, rating, dept }>, lowPerformers: Array<{...}>, nineBoxGrid: Array<{ employeeId, name, potential, performance }> }

GET /api/v1/hr/recruitment
Query: from, to
Response: { funnel: { applications, screened, interviewed, offered, hired }, timeToHireTrend: Array<{ month, avgDays }>, sourceBreakdown: Array<{ source, count }>, openPositions: Array<{ id, title, daysOpen, applications, status }> }
```

### 5.6 Marketing

```
GET /api/v1/marketing/overview
Auth: Director, Marketing Manager
Response: { mqls, sqls, conversionRate, cac, marketingRoi, pipelineGenerated }

GET /api/v1/marketing/campaigns
Query: from, to, channel?, sort_by, page, limit
Response: { data: Array<{ campaignId, name, spend, impressions, clicks, ctr, conversions, cpa, roas }>, pagination }

GET /api/v1/marketing/channel-mix
Query: from, to
Response: { spendBreakdown: Array<{ channel, amount, pct }>, leadBreakdown: Array<{ channel, leads, sqls, cac, roas }> }

GET /api/v1/marketing/lead-funnel
Query: from, to
Response: { stages: Array<{ stage, count, conversionRate }> }

GET /api/v1/marketing/content-analytics
Query: from, to, sort_by
Response: Array<{ contentId, title, views, engagement, conversions }>

GET /api/v1/marketing/brand-health
Response: { npsTrend: Array<{ month, score }>, socialVolume: number, sentiment: number, shareOfVoice: number, prTimeline: Array<{ date, source, headline, sentiment }> }
```

### 5.7 Approvals

```
GET /api/v1/approvals
Query: status (pending|approved|rejected|delegated|expired), type, page, limit, sort_by, order
Auth: Director, Department Heads
Response: { data: Array<{
  id, requestType, title, description, requester: { id, name, email, photoUrl },
  department: { id, name }, urgency, amount, currency, status, assignedTo, delegatedTo,
  approvedAt, rejectedAt, rejectionReason, expiresAt, hasAttachments, commentCount,
  createdAt
}>, pagination: { page, limit, total, totalPages } }

GET /api/v1/approvals/:id
Response: Full approval detail with comments and attachments

POST /api/v1/approvals/:id/approve
Auth: Director, Delegated Approver
Body: { comment?: string, notifyRequester?: boolean }
Response: { success: true, status: 'approved', approvedAt: string }
Errors: 400 (already actioned), 403 (not authorised), 404, 409 (expired)

POST /api/v1/approvals/:id/reject
Body: { reason: string (required), comment?: string }
Response: { success: true, status: 'rejected' }
Errors: 400 (reason required), 403, 404, 409

POST /api/v1/approvals/:id/delegate
Body: { delegateTo: UUID, reason?: string }
Response: { success: true, status: 'delegated' }
Errors: 400 (invalid delegate), 403, 404

POST /api/v1/approvals
Body: ApprovalRequestCreate (full type)
Response: { id, status: 'pending', createdAt }

GET /api/v1/approvals/stats
Response: { pending: number, awaitingMe: number, avgApprovalTime: number, approvalRate: number, byType: Array<{ type, count }> }
```

### 5.8 OKRs

```
GET /api/v1/okrs/cycles
Auth: Director, All Managers
Response: Array<{ id, name, fiscalYear, period, startDate, endDate, status }>

GET /api/v1/okrs/cycle/:id
Response: Full cycle with objectives, key results, progress aggregates
{
  cycle: { id, name, period, status },
  objectives: Array<{
    id, title, description, owner, department, weight, progress, health,
    keyResults: Array<{ id, title, measurementType, baseline, target, current, unit, owner, confidence, progress }>,
    comments: Array<{ id, author, content, createdAt }>
  }>,
  summary: { avgProgress, healthDistribution: { onTrack, atRisk, behind, notStarted } }
}

POST /api/v1/okrs/objectives
Body: { cycleId, title, description, ownerId, departmentId, weight, parentObjectiveId? }
Response: { id, createdAt }

PUT /api/v1/okrs/objectives/:id
Body: Partial<ObjectiveUpdate>
Response: { id, updatedAt }

POST /api/v1/okrs/key-results
Body: { objectiveId, title, measurementType, baselineValue, targetValue, unit, ownerId }
Response: { id, createdAt }

PUT /api/v1/okrs/key-results/:id
Body: Partial<KeyResultUpdate>
Response: { id, updatedAt }

POST /api/v1/okrs/checkins
Body: { keyResultId, value, confidence, note? }
Response: { id, createdAt }
Effect: Recalculates KR and objective progress

GET /api/v1/okrs/alignment-map
Query: cycleId
Response: Tree structure of cascaded objectives

GET /api/v1/okrs/scorecard
Query: cycleId, department_id?, health?, sort_by
Response: { data: Array<{ objective, progress, health, owner, department }>, summary }
```

### 5.9 Reports

```
GET /api/v1/reports/library
Auth: Director (Can access all)
Response: Array<{ id, name, category, folder, createdAt, lastRunAt, isScheduled }>

POST /api/v1/reports/execute
Body: { dataSource, metrics: string[], dimensions: string[], filters: Array<{ field, op, value }>, dateRange: { from, to }, granularity, chartType }
Response: { columns: Array<{ key, label, type }>, rows: Array<Record<string, any>>, rowCount, executionTimeMs, cachedAt? }

POST /api/v1/reports/save
Body: { name, category, folder?, config: ReportConfig, isScheduled?, scheduleCron?, recipients? }
Response: { id, createdAt }

GET /api/v1/reports/:id
Response: Full report definition

DELETE /api/v1/reports/:id
Response: { success: true }

POST /api/v1/reports/:id/schedule
Body: { cron, recipients, format, enabled }
Response: { id, nextSendAt }

GET /api/v1/reports/data-sources
Response: Array<{ id, name, tables: Array<{ name, columns: Array<{ name, type }> }> }>
```

### 5.10 Activity Feed

```
GET /api/v1/activity-feed
Query: cursor?, limit (max 100), event_types?, severity?, from, to
Response: { data: Array<{ id, eventType, actorName, summary, entityType, entityId, severity, createdAt, metadata }>, nextCursor?, hasMore }
```

## 6. Component Tree

```
Layout
 ├── DirectorShell (sidebar + topbar + main)
 │   ├── Sidebar
 │   │   ├── SidebarNavItem (link + icon + badge for pending count)
 │   │   ├── SidebarSectionHeader ("Favourites")
 │   │   └── SidebarProfileCard (avatar, name, role, logout)
 │   ├── Topbar
 │   │   ├── CommandPaletteTrigger (Cmd+K)
 │   │   ├── TimeRangeSelector
 │   │   ├── AlertBell (unread count)
 │   │   │   └── AlertDropdown (list of recent alerts)
 │   │   └── ProfileMenu (settings, shadow-mode toggle, impersonation indicator)
 │   └── MainContent (routes render here)

Pages (routes):
 ├── CommandCenterPage
 │   ├── DashboardGrid (drag-and-drop layout, persisted)
 │   │   ├── KpiCard (metric, delta, sparkline, onClick drill)
 │   │   ├── DualLineChart (revenue vs cost)
 │   │   ├── BarChart (enrolment by programme)
 │   │   ├── DonutChart (revenue by dept)
 │   │   ├── ActivityFeedWidget (last 10 events)
 │   │   └── QuickActionToolbar
 │   └── AlertBanner

 ├── FinancePage
 │   ├── FinanceKPIBar
 │   ├── FinanceTabs (P&L, BalanceSheet, CashFlow, BudgetVsActual, DeptSpend)
 │   │   ├── PnLTable (expandable rows)
 │   │   ├── BalanceSheetTable (side-by-side periods)
 │   │   ├── CashFlowTable (with burn rate chart)
 │   │   ├── BudgetVsActualTable (with traffic-light dots)
 │   │   └── DeptSpendTreemap
 │   └── FinanceAlertPanel (sidebar)

 ├── AcademicPage
 │   ├── AcademicKPIBar
 │   ├── AcademicTabs (Enrolment, Programme, Faculty, Demographics, Course)
 │   │   ├── EnrolmentTrendChart
 │   │   ├── EnrolmentFunnel
 │   │   ├── ProgrammePerformanceTable (sortable, with drill-down modal)
 │   │   ├── FacultyMetricsTable
 │   │   ├── FacultyWorkloadHeatmap
 │   │   ├── DemographicsCharts (pie, map, bar)
 │   │   └── CourseAnalyticsTable (with rating distribution)
 │   └── ProgrammeDetailModal (full programme breakdown)

 ├── OperationsPage
 │   ├── OperationsKPIBar
 │   ├── OperationsTabs (Projects, ITSecurity, Facilities, ProcessAudit)
 │   │   ├── ProjectGanttChart
 │   │   ├── ProjectStatusBoard
 │   │   ├── SystemHealthCards
 │   │   ├── SecurityScorecard
 │   │   ├── OccupancyGauge
 │   │   ├── RoomUtilisationHeatmap
 │   │   └── ProcessAuditTable
 │   └── ProjectDetailModal

 ├── HRPage
 │   ├── HRKPIBar
 │   ├── HRTabs (OrgChart, Headcount, Compensation, Performance, Recruitment)
 │   │   ├── OrgTree (interactive, zoomable, pannable)
 │   │   ├── EmployeeProfileCard (popover on click)
 │   │   ├── HeadcountTrendChart
 │   │   ├── HeadcountDepartmentBar
 │   │   ├── SalaryDistributionHistogram
 │   │   ├── CompensationByDeptTable
 │   │   ├── RatingDistributionPie
 │   │   ├── NineBoxGrid (scatter)
 │   │   ├── RecruitmentFunnel
 │   │   └── TimeToHireTrend
 │   └── EmployeeDetailModal

 ├── MarketingPage
 │   ├── MarketingKPIBar
 │   ├── MarketingTabs (Campaigns, Channel, Funnel, Content, Brand)
 │   │   ├── CampaignPerformanceTable
 │   │   ├── ChannelMixPie
 │   │   ├── ChannelPerformanceTable
 │   │   ├── LeadFunnelChart
 │   │   ├── ContentAnalyticsTable
 │   │   ├── NPSTrendChart
 │   │   ├── SentimentGauge
 │   │   └── PRTimeline
 │   └── CampaignDetailModal

 ├── ApprovalsPage
 │   ├── ApprovalTabs (Pending, MyHistory, AllPending)
 │   ├── ApprovalFilters (type, urgency, department, date)
 │   ├── ApprovalCard (icon, title, requester, amount, urgency, date, action buttons)
 │   │   ├── ApprovalPreviewSnippet
 │   │   └── ApprovalActions (Approve/Reject/Delegate)
 │   ├── ApprovalDetailModal (full detail, comments, attachments)
 │   │   ├── ApprovalCommentList
 │   │   ├── ApprovalCommentForm
 │   │   └── ApprovalAttachmentList
 │   └── ApprovalStatsCard

 ├── OKRPage
 │   ├── OKRSidebar (cycle list + new button)
 │   ├── OKRMainPanel
 │   │   ├── ObjectiveCard (title, description, owner, progress bar, health badge)
 │   │   │   └── KeyResultRow (title, progress, confidence, check-in button)
 │   │   ├── OKRAlignmentMap (d3.js force-directed graph)
 │   │   ├── OKRScorecardTable
 │   │   └── CheckInModal (value input, confidence selector, note)
 │   ├── ObjectiveFormModal (create/edit)
 │   └── KeyResultFormModal (create/edit)

 ├── ReportsPage
 │   ├── ReportLibraryTree (folder browser)
 │   ├── ReportViewer
 │   │   ├── ReportChart (dynamic chart type)
 │   │   ├── ReportTable (data grid, sortable, paginated)
 │   │   └── DrillDownModal (on click data point)
 │   ├── ReportBuilder
 │   │   ├── MetricSelector (multi-select dropdown)
 │   │   ├── DimensionSelector (multi-select dropdown)
 │   │   ├── FilterBuilder (add/remove filter rows)
 │   │   ├── DateRangePicker
 │   │   ├── GranularitySelector
 │   │   ├── ChartTypeSelector
 │   │   ├── PreviewPane (live preview)
 │   │   └── SaveForm (name, category, folder, scheduling)
 │   └── ScheduledReportList

Shared / Reusable Components:
 ├── KpiCard (metric, delta, trend, sparkline, onClick)
 ├── DataChart (wrapper for recharts/chart.js, handles loading/empty/error)
 ├── DataTable (sortable, filterable, paginated, with column resizing)
 ├── StatusBadge (color-coded status indicator)
 ├── Modal (portal-based, focus trap, esc close, backdrop)
 ├── FormField (label, error, help text, required indicator)
 ├── Pagination (page numbers, prev/next, total count)
 ├── SearchBar (debounced search with suggestions)
 ├── DateRangePicker (calendar presets + custom range)
 ├── ConfirmDialog (destructive action confirmation)
 ├── Toast (success/error/warning/info, auto-dismiss)
 ├── FileUpload (drag-and-drop, progress, preview)
 ├── EmptyState (icon, title, description, CTA)
 ├── ErrorBoundary (fallback UI with retry)
 └── Skeleton (shimmer placeholder)
```

## 7. Exhaustive User Journeys

### Journey 1: Director Logs In & Reviews Command Center

1. Director navigates to `app.cea.io/login`
2. Enters email + password → hits `POST /api/v1/auth/login`
3. MFA challenge: YubiKey tap + biometric (Windows Hello / Face ID)
4. System validates hardware-bound token → issues session (Tier 3, 15min TTL)
5. Redirects to `/director/command-center`
6. `GET /api/v1/director/command-center` fires; WebSocket connects to `/ws/command-center`
7. **Loading state:** 6 skeleton KPI cards shimmer, chart containers show spinner
8. Data arrives → KPIs animate from 0 to value (count-up animation)
9. Charts render with transition animation
10. Alert banner checks for unread critical alerts → if any, show red banner at top
11. **Branch: First-time user** → onboarding tooltip appears: "Welcome! Here's your command center. Pin your most-watched KPIs."
12. Director clicks a KPI card (e.g., "Active Students") → navigates to `/director/academic` with that KPI highlighted
13. **Branch: WebSocket disconnect** → after 5s, show "Live updates paused" banner, auto-reconnect with exponential backoff (1s, 2s, 4s, 8s, max 30s)
14. **Branch: Session idle > 12min** → warning toast "Your session will expire in 3 minutes"
15. **Branch: Session expired** → modal "Your session has expired. Please log in again." → redirect to login

### Journey 2: Director Approves a Budget Increase

1. Director receives critical-urgency email notification: "Budget increase request from Marketing: $25,000 for Q3 ad campaign"
2. Director clicks "Review in CEA-OS" link in email (deep link: `/director/approvals?id=xxx`)
3. Director is authenticated (or re-auth if session expired)
4. Landing on `/director/approvals` — filter auto-applied to show this specific request
5. **Loading state:** Approval card skeleton
6. Data loads → full approval card: type "Budget Increase", urgency "Critical", requested by "Sarah Chen (Marketing)", amount "$25,000", department "Marketing", deadline "Aug 2, 2026 (2d left)"
7. Director clicks card → `GET /api/v1/approvals/:id` → opens ApprovalDetailModal
8. Modal shows: full description, supporting attachments (campaign plan PDF), comment thread (2 comments from Finance dept), approval history
9. Director reviews attached PDF inline via embedded viewer
10. **Branch: Needs more info** → clicks [Request Info] button →
    - Comment form appears → types "What's the expected ROAS on this spend?"
    - Clicks Send → system creates comment, notifies requester (in-app + email)
    - Status changes to "pending_info" with requester pinged
    - Director moves to next approval; returns later when requester replies
11. **Main path: Ready to approve**
    - Clicks [Approve]
    - Confirm dialog: "Approve $25,000 budget increase for Marketing? [Add comment (optional)] [Notify requester] ✓"
    - Director adds comment: "Approved. Let's track ROAS closely."
    - Clicks Confirm → `POST /api/v1/approvals/:id/approve`
    - **Loading:** Button shows spinner "Processing..."
    - Success → status changes to "Approved" with green checkmark and timestamp
    - Toast: "Budget increase approved. Requester notified."
    - Requester receives in-app notification + email: "Your budget increase of $25,000 has been approved by [Director Name]"
    - Finance system receives webhook → budget line updated
12. **Branch: Reject**
    - Clicks [Reject]
    - Rejection reason required (text area, min 10 chars)
    - Types "Not aligned with current fiscal priorities. Please resubmit for FY2027."
    - Clicks Confirm → `POST /api/v1/approvals/:id/reject`
    - Success → status "Rejected" with red X
    - Requester notified with rejection reason
13. **Branch: Delegate**
    - Clicks [Delegate]
    - Search/select user (autocomplete from org chart)
    - Select "Alex Rivera (Deputy Director)"
    - Add reason: "Out of office Aug 1-5"
    - Clicks Delegate → `POST /api/v1/approvals/:id/delegate`
    - Approval assigned to Alex; Director still has read-only view
    - Alex receives notification: "Director has delegated an approval to you. Please review."
14. **Branch: Approval expired** → if deadline passes without action, status auto-changes to "expired", system sends alert "Approval request EXPIRED: [title]" to both requester and director

### Journey 3: Director Creates & Tracks OKRs

1. From command center, Director clicks [New OKR] in Quick Actions or navigates to `/director/okrs`
2. Sees current OKR cycle (FY2026-H2, Jul-Dec 2026) — cycle is in "draft" status
3. Clicks [New Objective] → ObjectiveFormModal opens
4. Fills:
   - Title: "Achieve 92% student satisfaction score across all programmes"
   - Description: "Improve NPS from current 88 to 92 by end of FY2026-H2 through enhanced support services."
   - Owner: Search → selects "Dr. Emily Watson (Dean of Students)"
   - Department: "Academic Affairs"
   - Weight: 1.0 (highest priority)
   - Parent Objective: (none — this is a company-level objective)
5. Clicks Save → `POST /api/v1/okrs/objectives` → success toast
6. Now adds Key Results to this objective:
   - Covers [Add Key Result] → KeyResultFormModal
   - KR 1: "Increase NPS from 88 to 92" | type: number | baseline: 88 | target: 92 | unit: "points" | owner: Dr. Watson
   - KR 2: "Reduce average complaint resolution time from 48h to 24h" | type: number | baseline: 48 | target: 24 | unit: "hours" | owner: "Mike Ops"
   - KR 3: "Launch student advisory board" | type: boolean | baseline: 0 | target: 1 | owner: Dr. Watson
7. Saves each → each KR appears under the objective with 0% progress
8. Director navigates to Alignment Map tab → sees visual tree
9. **Branch: Conflict detected** → system warns "KR conflicts: Objective 'Reduce cost per enrolment' targets opposite direction from 'Increase enrolment marketing spend'"
10. Director resolves by adjusting weight or flagging for discussion
11. When ready, Director clicks [Publish Cycle] → confirms → status changes from "draft" to "active"
12. All objective owners receive notifications: "OKR cycle FY2026-H2 is now live. Your objectives are due for check-in by [date]."
13. **Weekly check-in:** Director receives push notification: "3 OKRs due for check-in" → opens OKR page → sees progress bars:
    - KR1 is at 45% (current value 89.8) — confidence: high
    - KR2 is at 30% (current 36h) — confidence: medium
    - KR3 is at 100% (launched!) — complete
14. Director clicks [Check In] on KR2 → modal: current value 36, confidence medium, note: "Working on automation; expected to hit target by Oct"
15. Saves → progress bar updates

### Journey 4: Director Runs an Ad-Hoc Report

1. Director navigates to `/director/reports`
2. Clicks [New Report] → ReportBuilder loads
3. Selects data source: "Academic DB"
4. Adds metrics: "Enrolled Students", "Graduation Rate", "Revenue per Student"
5. Adds dimensions: "Programme Name", "Cohort Year", "Department"
6. Adds filter: "Cohort Year >= 2024" AND "Programme Status = Active"
7. Sets date range: "Jul 2025 - Jun 2026"
8. Granularity: "Quarter"
9. Chart type: "Stacked Bar"
10. Clicks [Run] → PreviewPane shows spinner with "Executing query..."
11. After 2.3s, data loads → stacked bar chart showing trends by programme
12. Director hovers over a bar → tooltip: "Data Science | Q3 2025 | Enrolled: 142 | Grad Rate: 89% | Rev/Student: $12,450"
13. Clicks bar → DrillDownModal opens with detail table for that programme-quarter
14. **Branch: Query timeout (30s)** → system shows "Query complexity too high. Please add filters or reduce date range."
15. Director narrows filter to single department → re-runs → succeeds
16. Clicks [Save] → SaveForm:
    - Name: "Programme Performance by Cohort (FY2026)"
    - Category: "Academic"
    - Folder: "Executive Reports"
    - Schedule: toggle ON
    - Cron: "0 9 1 * *" (1st of month at 9 AM)
    - Recipients: director@cea.io, dean@cea.io
    - Format: PDF
17. Clicks Save → `POST /api/v1/reports/save` + `POST /api/v1/reports/:id/schedule`
18. Success toast: "Report saved and scheduled for monthly delivery."
19. Director can also [Export] directly as CSV, XLSX, or PDF with one-click

### Journey 5: Director Reviews Departmental Performance (Drill-Down)

1. On Command Center, Director sees Marketing ROAS is amber (4.2x, below target of 5x)
2. Clicks the Marketing ROAS KPI card → navigates to `/director/marketing` with ROAS pre-selected
3. Marketing Overview loads → ROAS trend chart shows decline over last 3 months
4. Director clicks [Campaigns] tab → sorted by ROAS ascending → sees bottom performers
5. Clicks worst-performing campaign → CampaignDetailModal:
   - Campaign: "Summer Sale 2026" | Spend: $45,000 | Conversions: 23 | CPA: $1,956
   - System AI note: "This campaign's CPA is 3.2x above average. Consider pausing and reallocating budget."
6. Director flags campaign — clicks [Flag for Review] → notifies Marketing Manager
7. Then switches to [Channel Mix] tab → sees LinkedIn spend is 60% but only generating 20% of leads
8. Takes screenshot (via system's annotation tool) → adds annotation: "Revisit LinkedIn strategy — poor ROI"
9. Annotation saved to `director_annotations` with `entity_type='dashboard'`, `entity_id='marketing-channel-mix'`
10. Later, other director can see this annotation when viewing the same view

### Journey 6: Director Sets Up Their Dashboard

1. Director navigates to Command Center
2. Clicks [Customise Dashboard] → enters edit mode
3. Grid becomes draggable; each card has drag handle + resize handle (2-col / 3-col / full)
4. Director drags "Revenue vs Cost" chart to top-left, makes it full-width
5. Removes "Enrolment by Programme" (clicks X)
6. Clicks [Add Widget] → WidgetGallery modal:
   - Available widgets: All KPI cards, all charts from all departments, activity feed, alert list, approval stats, OKR summary, weather widget (office location), clock widget (multiple timezones)
   - Director selects: "Pending Approvals Count", "OKR Progress Summary", "System Health"
7. New widgets appear at bottom of grid
8. Director clicks [Save Layout] → `PUT /api/v1/director/command-center/layout` → layout JSON persisted
9. Every subsequent load uses this custom layout

## 8. Business Rules Engine

### Rule Set 1: Approval Deadlines & Escalation

- **R1.1:** Approval requests with urgency "critical" must be acted upon within 24 hours or auto-escalate to next-level approver.
- **R1.2:** Approval requests with urgency "high" expire in 48 hours.
- **R1.3:** Approval requests with urgency "medium" expire in 5 business days.
- **R1.4:** Approval requests with urgency "low" expire in 10 business days.
- **R1.5:** If an approval expires, status changes to "expired", originator is notified, and request must be resubmitted.
- **R1.6:** Financial approvals > $100K require two signatures (Director + CFO or Board designee).
- **R1.7:** Delegated approvals inherit the original deadline.
- **R1.8:** Approvals cannot be delegated more than once (no chain-delegation).
- **R1.9:** Directors cannot approve requests where they are the requester.

### Rule Set 2: OKR Rules

- **R2.1:** Each objective must have at least 2 and at most 5 key results.
- **R2.2:** Key result progress = (current - baseline) / (target - baseline) × 100, clamped to [0, 100].
- **R2.3:** Objective progress = weighted average of child KR progress × KR weight.
- **R2.4:** If any KR is "behind" for 2 consecutive check-ins, objective health changes to "at_risk".
- **R2.5:** OKR cycles cannot be closed if any objective has progress < 50% and health "behind".
- **R2.6:** OKR check-ins are due every 2 weeks. Missing 2 consecutive check-ins auto-drops confidence to "low".
- **R2.7:** Objectives can be aligned (parent-child) only within the same cycle.
- **R2.8:** Objective owners can be changed mid-cycle but require director approval.

### Rule Set 3: Financial Visibility

- **R3.1:** Revenue data is shown in base currency (USD) with exchange rate timestamp for multi-currency conversions.
- **R3.2:** Budget variance > 15% triggers automatic alert to Director and Department Head.
- **R3.3:** Financial projections beyond 90 days require Monte Carlo simulation confidence intervals.
- **R3.4:** Any single transaction > $50K must appear in the Director's activity feed within 15 minutes.
- **R3.5:** Burn rate = (total operating expenses) / (days in period). Runway = cash reserves / daily burn rate.

### Rule Set 4: HR & Data Privacy

- **R4.1:** Salary data is visible to Director only — HR Manager sees aggregated data only.
- **R4.2:** Individual employee satisfaction scores are anonymised for cohorts < 10.
- **R4.3:** Org chart shows all employees but Director can toggle "hide terminated".
- **R4.4:** Performance ratings < 2.0 automatically flag for director review.
- **R4.5:** Headcount projections cannot exceed board-approved hiring plan without re-authorisation.

### Rule Set 5: Data Freshness & Staleness

- **R5.1:** KPI data is considered "fresh" if updated within the last 5 minutes.
- **R5.2:** Data older than 1 hour shows "stale" badge.
- **R5.3:** Data older than 24 hours shows "severely stale" badge + warning toast.
- **R5.4:** If a data source is disconnected > 24h, the affected widgets show "Data source offline" and are dimmed.
- **R5.5:** Real-time KPIs flash updated values with a green pulse animation.

### Rule Set 6: Shadow Mode (Impersonation)

- **R6.1:** Director can enter shadow mode to view any actor's dashboard as that actor would see it.
- **R6.2:** Shadow mode is read-only — no actions (approve, create, edit) can be performed.
- **R6.3:** All shadow mode sessions are logged to immutable audit trail.
- **R6.4:** A persistent purple banner reads "SHADOW MODE — Viewing as [Actor Name]" — cannot be dismissed.
- **R6.5:** Shadow mode auto-exits after 30 minutes or on explicit exit.

## 9. Notification Specifications

### N1: Approval Request (To Director)

- **Trigger:** New approval request created where `assigned_to` = director
- **Channel:** In-app (AlertBell + Toast) + Email + Push (mobile)
- **In-app template:** `{{requester_name}} requests {{request_type}}: {{amount}} ({{urgency}})`
- **Email template:** Subject: `[CEA-OS] {{urgency|upper}} Approval: {{request_type}} from {{requester_name}} — {{amount}}` | Body: Full card with [Review] link
- **Delivery rules:** Critical urgency → push immediately; High → within 5 min; Medium/Low → digest every 4h

### N2: Approval Expired (To Director + Requester)

- **Trigger:** Approval deadline passed without action
- **Channel:** In-app + Email
- **Template:** `Approval request "{{title}}" has expired. {{if director}}The request was auto-cancelled.{{/if}}`
- **Delivery rules:** Immediately upon expiry

### N3: Approval Actioned (To Requester)

- **Trigger:** Director approves/rejects/delegates an approval
- **Channel:** In-app + Email
- **Template:** `Your {{request_type}} request has been {{status}}{{if approved}} by {{approver_name}}{{/if}}{{if rejected}} — Reason: {{reason}}{{/if}}`
- **Delivery rules:** Immediately

### N4: Budget Alert (To Director)

- **Trigger:** Department budget variance > 15%
- **Channel:** In-app (AlertBanner) + Email (daily digest if > 3 alerts)
- **Template:** `{{dept_name}} is {{variance_pct}}% over budget ({{overspend_amount}}).`
- **Delivery rules:** Immediately for variance > 20%; daily digest for 15-20%

### N5: OKR Check-in Due (To Director + Owners)

- **Trigger:** 3 days before check-in deadline
- **Channel:** In-app + Push + Email
- **Template:** `OKR check-in due: {{objective_title}} — {{days_remaining}} days left`
- **Delivery rules:** Once per day until completed

### N6: OKR Behind (To Director)

- **Trigger:** Any objective health changes to "behind" or "at_risk"
- **Channel:** In-app + Email
- **Template:** `OKR at risk: {{objective_title}} ({{owner_name}}) — progress: {{progress}}%, last check-in: {{date}}`
- **Delivery rules:** Immediately

### N7: System Critical Alert (To Director)

- **Trigger:** Any service goes down (uptime < 99.9%) or security incident detected
- **Channel:** In-app (persistent banner) + SMS + Push + Email (PagerDuty-style escalation)
- **Template:** `CRITICAL: {{service_name}} is DOWN. Incident #{{incident_id}}. Impact: {{impact_description}}.`
- **Delivery rules:** Within 1 minute, escalate every 15min if unacknowledged

### N8: Scheduled Report Generated (To Recipients)

- **Trigger:** Cron job triggers scheduled report
- **Channel:** Email with attachment
- **Template:** Subject: `[CEA-OS Report] {{report_name}} — {{period}}` | Body: Summary text + attachment
- **Delivery rules:** At scheduled time; retry 3x on failure (15min interval)

### N9: Activity Feed Digest (To Director)

- **Trigger:** End of business day (configurable, default 6 PM)
- **Channel:** Email
- **Template:** `Your CEA-OS Daily Digest: {{count}} activities, {{approval_count}} pending approvals, {{alert_count}} alerts`
- **Delivery rules:** Daily M-F; skip if no activity

## 10. Permission Matrix

| Entity                | Director        | Department Head       | Finance Manager | HR Manager   | Regular User  |
| --------------------- | --------------- | --------------------- | --------------- | ------------ | ------------- |
| **Approval Requests** | CRUD all        | CRUD own dept         | R all financial | R own dept   | R own         |
| **OKR Cycles**        | CRUD            | R                     | R               | R            | R             |
| **OKR Objectives**    | CRUD all        | CRUD own dept         | R               | R            | R own         |
| **OKR Key Results**   | CRUD all        | CRUD own              | R               | R            | R own         |
| **Financial Data**    | CRUD            | R own dept            | R all           | R aggregated | —             |
| **Academic Data**     | CRUD            | R own dept            | —               | —            | R own courses |
| **HR Data**           | CRUD individual | R own dept aggregated | —               | CRUD all     | R own         |
| **KPI Definitions**   | CRUD            | R                     | R               | R            | R             |
| **Reports**           | CRUD all        | CRUD own dept         | CRUD own        | CRUD own     | R assigned    |
| **Activity Feed**     | R all           | R own dept            | R own           | R own        | R own         |
| **Org Chart**         | R full          | R own branch          | R exec only     | R full       | R public      |
| **Compensation Data** | R individual    | —                     | R aggregated    | R full       | —             |
| **Dashboard Layout**  | CRUD own        | CRUD own              | CRUD own        | CRUD own     | CRUD own      |
| **Scheduled Reports** | CRUD all        | CRUD own              | CRUD own        | CRUD own     | CRUD own      |
| **Annotations**       | CRUD all        | CRUD own              | CRUD own        | CRUD own     | —             |
| **Shadow Mode**       | Enabled         | —                     | —               | —            | —             |

## 11. State Management

### RTK Query Endpoints

```typescript
// Director API slice
const directorApi = createApi({
  reducerPath: "directorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/director" }),
  tagTypes: ["CommandCenter", "Approvals", "OKRs", "Reports", "KPIs"],
  endpoints: (builder) => ({
    getCommandCenter: builder.query<DirectorDashboardResponse, void>({
      query: () => "/command-center",
      providesTags: ["CommandCenter"],
      pollingInterval: 30000, // Re-fetch every 30s as backup to WebSocket
    }),
    getApprovals: builder.query<ApprovalListResponse, ApprovalListQuery>({
      query: (params) => ({ url: "/approvals", params }),
      providesTags: ["Approvals"],
      serializeQueryArgs: ({ queryArgs }) => {
        const { page, ...rest } = queryArgs;
        return rest;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) return newItems;
        currentCache.data.push(...newItems.data);
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    approveRequest: builder.mutation<ApprovalActionResponse, { id: string; body: ApproveBody }>({
      query: ({ id, body }) => ({ url: `/approvals/${id}/approve`, method: "POST", body }),
      invalidatesTags: ["Approvals"],
      optimisticUpdate: true,
    }),
    rejectRequest: builder.mutation<ApprovalActionResponse, { id: string; body: RejectBody }>({
      query: ({ id, body }) => ({ url: `/approvals/${id}/reject`, method: "POST", body }),
      invalidatesTags: ["Approvals"],
      optimisticUpdate: true,
    }),
    getOKRCycle: builder.query<OKRCycleResponse, string>({
      query: (id) => `/okrs/cycle/${id}`,
      providesTags: ["OKRs"],
    }),
    createObjective: builder.mutation<CreatedResponse, CreateObjectiveBody>({
      query: (body) => ({ url: "/okrs/objectives", method: "POST", body }),
      invalidatesTags: ["OKRs"],
    }),
    createKeyResult: builder.mutation<CreatedResponse, CreateKeyResultBody>({
      query: (body) => ({ url: "/okrs/key-results", method: "POST", body }),
      invalidatesTags: ["OKRs"],
    }),
    checkIn: builder.mutation<CreatedResponse, CheckInBody>({
      query: (body) => ({ url: "/okrs/checkins", method: "POST", body }),
      invalidatesTags: ["OKRs"],
      optimisticUpdate: true,
    }),
    executeReport: builder.mutation<ReportResult, ReportConfig>({
      query: (body) => ({ url: "/reports/execute", method: "POST", body }),
    }),
    saveReport: builder.mutation<CreatedResponse, SaveReportBody>({
      query: (body) => ({ url: "/reports/save", method: "POST", body }),
      invalidatesTags: ["Reports"],
    }),
    getReports: builder.query<ReportListResponse, void>({
      query: () => "/reports/library",
      providesTags: ["Reports"],
    }),
    getActivityFeed: builder.query<ActivityFeedResponse, ActivityFeedQuery>({
      query: (params) => ({ url: "/activity-feed", params }),
      serializeQueryArgs: ({ queryArgs }) => {
        const { cursor, ...rest } = queryArgs;
        return rest;
      },
      merge: (current, incoming) => {
        current.data.push(...incoming.data);
        current.nextCursor = incoming.nextCursor;
        current.hasMore = incoming.hasMore;
      },
    }),
  }),
});
```

### Real-time WebSocket Handler

```typescript
class CommandCenterSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectDelay = 30000;

  connect() {
    this.ws = new WebSocket("wss://api.cea.io/ws/command-center");

    this.ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      switch (payload.type) {
        case "kpi:update":
          dispatch(kpiUpdated(payload));
          break;
        case "alert:new":
          dispatch(alertReceived(payload));
          break;
        case "activity:new":
          dispatch(activityReceived(payload));
          break;
        case "pong":
          clearTimeout(this.pingTimeout);
          break;
      }
    };

    this.ws.onclose = () => {
      dispatch(connectionStatusChanged("disconnected"));
      this.scheduleReconnect();
    };

    // Ping every 10s
    this.pingInterval = setInterval(() => {
      this.ws?.send(JSON.stringify({ type: "ping" }));
      this.pingTimeout = setTimeout(() => {
        this.ws?.close();
      }, 5000);
    }, 10000);
  }
}
```

### Redux Slice

```typescript
const directorSlice = createSlice({
  name: "director",
  initialState: {
    activeTab: "command-center",
    selectedApprovalId: null,
    selectedOKRCycleId: null,
    commandCenterLayout: [],
    isShadowMode: false,
    shadowActorId: null,
    connectionStatus: "connected" as "connected" | "disconnected" | "reconnecting",
    theme: "light",
    sidebarCollapsed: false,
  },
  reducers: {
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
    setSelectedApproval(state, action: PayloadAction<string | null>) {
      state.selectedApprovalId = action.payload;
    },
    setSelectedOKRCycle(state, action: PayloadAction<string>) {
      state.selectedOKRCycleId = action.payload;
    },
    updateLayout(state, action: PayloadAction<LayoutItem[]>) {
      state.commandCenterLayout = action.payload;
    },
    enterShadowMode(state, action: PayloadAction<string>) {
      state.isShadowMode = true;
      state.shadowActorId = action.payload;
    },
    exitShadowMode(state) {
      state.isShadowMode = false;
      state.shadowActorId = null;
    },
    setConnectionStatus(state, action: PayloadAction<string>) {
      state.connectionStatus = action.payload as any;
    },
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    kpiUpdated(state, action: PayloadAction<KPIUpdate>) {},
    alertReceived(state, action: PayloadAction<AlertEvent>) {},
    activityReceived(state, action: PayloadAction<ActivityEvent>) {},
  },
});
```

## 12. Form Schemas (Zod)

### Approval Create Form

```typescript
import { z } from "zod";

export const approvalCreateSchema = z.object({
  requestType: z.enum(
    [
      "budget_increase",
      "new_position",
      "vendor_contract",
      "campaign",
      "travel",
      "policy_exception",
      "programme_change",
      "partnership",
      "emergency",
    ],
    { errorMap: () => ({ message: "Select an approval type" }) },
  ),
  title: z.string().min(5, "Title must be at least 5 characters").max(500),
  description: z.string().min(10, "Description must be at least 10 characters").max(5000),
  departmentId: z.string().uuid("Select a department"),
  urgency: z.enum(["low", "medium", "high", "critical"]),
  amount: z.number().positive("Amount must be positive").nullable().optional(),
  currency: z.enum(["USD", "EUR", "GBP", "CAD", "AUD"]).default("USD"),
  attachments: z
    .array(
      z.object({
        fileName: z.string(),
        fileSize: z.number().max(10485760, "File too large (max 10MB)"),
        mimeType: z.string(),
        fileKey: z.string(),
      }),
    )
    .max(10, "Maximum 10 attachments")
    .optional(),
  assignedTo: z.string().uuid("Select assignee").nullable().optional(),
});

export type ApprovalCreateForm = z.infer<typeof approvalCreateSchema>;
```

### Objective Create Form

```typescript
export const objectiveCreateSchema = z.object({
  cycleId: z.string().uuid("Select a cycle"),
  title: z.string().min(5, "Title required (min 5 chars)").max(500),
  description: z.string().max(5000).optional(),
  ownerId: z.string().uuid("Select an owner"),
  departmentId: z.string().uuid("Select a department"),
  weight: z.number().min(0).max(1).default(1),
  parentObjectiveId: z.string().uuid().nullable().optional(),
});

export const keyResultCreateSchema = z
  .object({
    objectiveId: z.string().uuid(),
    title: z.string().min(5).max(500),
    description: z.string().max(5000).optional(),
    measurementType: z.enum(["percentage", "number", "boolean", "currency"]),
    baselineValue: z.number().default(0),
    targetValue: z.number(),
    unit: z.string().max(50).optional(),
    ownerId: z.string().uuid("Select an owner"),
  })
  .refine((data) => data.targetValue !== data.baselineValue, {
    message: "Target must differ from baseline",
    path: ["targetValue"],
  });

export const checkInSchema = z.object({
  keyResultId: z.string().uuid(),
  value: z.number(),
  confidence: z.enum(["high", "medium", "low"]),
  note: z.string().max(2000).optional(),
});
```

### Report Builder Form

```typescript
export const reportConfigSchema = z.object({
  dataSource: z.string().min(1, "Select a data source"),
  metrics: z.array(z.string()).min(1, "Select at least one metric").max(20),
  dimensions: z.array(z.string()).max(10),
  filters: z
    .array(
      z.object({
        field: z.string(),
        operator: z.enum(["eq", "neq", "gt", "gte", "lt", "lte", "in", "between", "contains"]),
        value: z.union([z.string(), z.number(), z.array(z.string())]).nullable(),
      }),
    )
    .max(20)
    .optional(),
  dateRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }),
  granularity: z.enum(["hour", "day", "week", "month", "quarter", "year"]).optional(),
  chartType: z.enum([
    "line",
    "bar",
    "stacked_bar",
    "pie",
    "doughnut",
    "table",
    "heatmap",
    "scatter",
    "funnel",
    "gauge",
  ]),
  limit: z.number().min(1).max(10000).default(1000),
});

export const saveReportSchema = reportConfigSchema.extend({
  name: z.string().min(3, "Report name required").max(255),
  category: z.string().min(1),
  folder: z.string().optional(),
  schedule: z.boolean().default(false),
  scheduleCron: z.string().optional(),
  recipients: z.array(z.string().email()).optional(),
  format: z.enum(["pdf", "csv", "xlsx"]).default("pdf"),
});
```

## 13. Analytics Events

| Event                    | Properties                                                                                     | Destination         |
| ------------------------ | ---------------------------------------------------------------------------------------------- | ------------------- |
| `director_login`         | `{ method, mfa_type, session_id }`                                                             | Amplitude, PostHog  |
| `command_center_viewed`  | `{ load_time_ms, kpis_loaded, alerts_count }`                                                  | Amplitude, PostHog  |
| `kpi_card_clicked`       | `{ kpi_code, kpi_name, value }`                                                                | Amplitude           |
| `time_range_changed`     | `{ range: '24h'\|'7d'\|'30d'\|'90d'\|'1y'\|'custom', from, to }`                               | Amplitude           |
| `approval_viewed`        | `{ approval_id, type, urgency, amount }`                                                       | Amplitude, Mixpanel |
| `approval_approved`      | `{ approval_id, type, amount, response_time_ms }`                                              | Amplitude, Mixpanel |
| `approval_rejected`      | `{ approval_id, type, amount, rejection_reason }`                                              | Amplitude           |
| `approval_delegated`     | `{ approval_id, delegate_to }`                                                                 | Amplitude           |
| `okr_cycle_viewed`       | `{ cycle_id, cycle_name, objective_count }`                                                    | Amplitude           |
| `okr_objective_created`  | `{ cycle_id, department_id, has_parent }`                                                      | Amplitude           |
| `okr_key_result_created` | `{ objective_id, measurement_type }`                                                           | Amplitude           |
| `okr_checkin_submitted`  | `{ key_result_id, value, confidence }`                                                         | Amplitude           |
| `okr_cycle_published`    | `{ cycle_id, objective_count, kr_count }`                                                      | Amplitude, PostHog  |
| `report_executed`        | `{ data_source, metrics_count, dimensions_count, chart_type, execution_time_ms, result_rows }` | Amplitude           |
| `report_saved`           | `{ has_schedule, format, category }`                                                           | Amplitude           |
| `report_exported`        | `{ format, row_count }`                                                                        | Amplitude           |
| `dashboard_layout_saved` | `{ widget_count }`                                                                             | Amplitude           |
| `shadow_mode_entered`    | `{ target_actor_id, target_role }`                                                             | Amplitude (audit)   |
| `shadow_mode_exited`     | `{ duration_seconds }`                                                                         | Amplitude           |
| `finance_tab_viewed`     | `{ tab: 'pl'\|'balance_sheet'\|'cash_flow'\|'budget'\|'dept_spend' }`                          | Amplitude           |
| `error_displayed`        | `{ screen, error_code, error_message }`                                                        | Sentry, Amplitude   |
| `search_performed`       | `{ query_length, result_count, search_location }`                                              | Amplitude           |
| `approval_comment_added` | `{ approval_id, has_attachment }`                                                              | Amplitude           |

## 14. Accessibility Requirements

### Screen Reader Support

- All charts must have `role="img"` with `aria-label` describing the chart type and summary of data
- KPI cards: `aria-live="polite"` for auto-updating values — announce only on significant change (>5% delta)
- Activity feed: `role="log"` with `aria-live="polite"` for new items
- Tables: proper `<th>` scope, `aria-sort` for sortable columns, `aria-rowindex` for large tables
- Modals: focus trap with `aria-modal="true"`, `role="dialog"`, `aria-labelledby` pointing to title
- Toast notifications: `role="alert"` with `aria-live="assertive"`
- Loading skeletons: `aria-hidden="true"` with `role="presentation"`

### Keyboard Navigation

- All interactive elements must be reachable via Tab in logical order
- Command palette: `Cmd+K` / `Ctrl+K` opens; arrow keys to navigate; Enter to select; Esc to close
- Tab panels: Arrow keys (left/right) to switch tabs when focused on tablist
- Data tables: Arrow keys to navigate cells; Enter to drill-down; Esc to exit drill-down
- Approval actions: `A` key for Approve, `R` for Reject, `D` for Delegate when card is focused
- Charts: Tab to chart → Enter to enter navigation mode → arrow keys to traverse data points → Esc to exit
- Sidebar: `[` to collapse/expand; arrow keys to navigate items
- Modals: `Esc` always closes; Tab cycles through focusable elements; Shift+Tab for reverse

### Focus Management

- On page navigation → focus moves to `<h1>` of the new page
- On modal open → focus moves to first focusable element (usually close button or primary action)
- On modal close → focus returns to element that triggered the modal
- On toast → focus remains on current element (toast is non-intrusive)
- On error state → focus moves to error message area
- On loading complete → focus remains where user was (do not auto-move)

### Colour & Contrast

- All text meets WCAG 2.1 AA minimum contrast ratio (4.5:1 normal, 3:1 large)
- Charts: patterns + labels in addition to colour (colour-blind friendly palette)
- Status indicators: icon + colour + text (e.g., green checkmark + "Approved" + checkmark icon)
- Alert levels: use icon + colour + text label (not colour alone)
- Focus indicators: 2px solid outline with 3px offset, high-contrast mode support

## 15. Error & Edge Case Catalog

### E1: Network Failure

- **Error:** API request fails (network offline, DNS failure)
- **System Response:** Retry with exponential backoff (3 attempts)
- **User Message:** "Unable to connect. Check your internet connection." + [Retry] button
- **Recovery:** On retry success, dismiss error. If offline, show persistent offline banner with "Working offline — data may be stale."

### E2: Server Error (500)

- **Error:** Backend returns 500 Internal Server Error
- **System Response:** Log error to Sentry with trace ID
- **User Message:** "Something went wrong. Our team has been notified. Reference: [trace_id]"
- **Recovery:** Show [Retry] button. If persists > 3 attempts, suggest "Please try again later."

### E3: Rate Limited (429)

- **Error:** Too many requests
- **System Response:** Backoff and retry with Retry-After header
- **User Message:** "You're moving too fast! Please wait [retry_after] seconds before trying again."
- **Recovery:** Auto-retry after specified delay

### E4: Unauthorized (401)

- **Error:** Session expired or invalid token
- **System Response:** Clear auth state, redirect to login
- **User Message:** "Your session has expired. Please log in again."
- **Recovery:** Redirect to `/login` with return URL

### E5: Forbidden (403)

- **Error:** User lacks permission for action
- **System Response:** Log audit event
- **User Message:** "You don't have permission to perform this action. Contact your administrator if you need access."
- **Recovery:** Disable the action button permanently for this session

### E6: Approval Already Actioned (409)

- **Error:** Attempting to approve/reject an already-actioned approval
- **System Response:** Return current status
- **User Message:** "This request has already been [approved/rejected] by [user] on [date]."
- **Recovery:** Refresh list to show updated status

### E7: Approval Expired (409)

- **Error:** Trying to act on expired approval
- **System Response:** Return 409 Conflict
- **User Message:** "This approval request has expired. The requester must resubmit."
- **Recovery:** Disable action buttons, show "Expired" badge

### E8: Data Source Offline

- **Error:** A data source (finance DB, academic DB) is unreachable
- **System Response:** KPI cards show "Data pending" with last known value
- **User Message:** "[Source Name] is currently unavailable. Showing cached data from [timestamp]. Data may be stale."
- **Recovery:** Auto-retry connection every 30s. On reconnect, refresh all dependent widgets.

### E9: WebSocket Connection Lost

- **Error:** Real-time connection drops
- **System Response:** Attempt reconnect with exponential backoff (1s, 2s, 4s, 8s, max 30s)
- **User Message:** Banner: "Live updates paused. Reconnecting..." with animated dots. After 30s: "Unable to reconnect. Please refresh the page."
- **Recovery:** On successful reconnect, replay missed events from last 30s. Refresh all KPI values.

### E10: Query Timeout

- **Error:** Report query takes > 30s
- **System Response:** Cancel query, return timeout error
- **User Message:** "Query timed out. Try adding filters, reducing date range, or selecting fewer metrics."
- **Recovery:** User can save the query config and run later as a scheduled report.

### E11: Result Too Large

- **Error:** Query returns > 10,000 rows
- **System Response:** Truncate to 10K rows, warn user
- **User Message:** "Results truncated to 10,000 rows. Export full dataset to CSV for complete data."
- **Recovery:** Export button available — on click, run full query server-side and generate downloadable file.

### E12: Empty Search Results

- **Error:** Search/filter returns zero results
- **System Response:** Show empty state
- **User Message:** "No results found. Try adjusting your search terms or filters."
- **Recovery:** [Clear Filters] button. If no data exists at all, show "No data yet" with link to data source setup.

### E13: Concurrent Edit Conflict

- **Error:** Two users try to update the same OKR/approval simultaneously
- **System Response:** Last write wins with conflict detection
- **User Message:** "This item was modified by another user. Your changes have been saved but may conflict. Please review."
- **Recovery:** Refresh the item to see latest state. Show diff if available.

### E14: Invalid Form Submission

- **Error:** Form validation fails
- **System Response:** Return field-level errors from server (422) or client-side Zod errors
- **User Message:** Inline error messages per field with red border + message
- **Recovery:** Scroll to first error field, focus it. Allow user to correct.

### E15: Browser Tab Hidden (Backgrounded)

- **Error:** User switches to another tab for > 5 minutes
- **System Response:** Pause WebSocket, pause polling, reduce animation. On return, fast-replay last 30s of events.
- **User Message:** None (silent recovery)
- **Recovery:** On visible, immediately fetch fresh command center data, reconnect WebSocket.

### E16: Large Screen / Small Screen

- **Edge Case:** Viewport changes
- **System Response:** Responsive grid — 4-column on > 1440px, 3-column 1024-1440, 2-column 768-1024, 1-column < 768
- **User Message:** None
- **Recovery:** Layout adapts in real-time on resize. Custom layouts are device-aware (different config per breakpoint).

### E17: Offline Mode (PWA)

- **Error:** User loses internet entirely
- **System Response:** Show cached data (last known state from service worker)
- **User Message:** "You're offline. Showing data from [timestamp]. Changes will sync when you're back online."
- **Recovery:** When online detected, sync any queued mutations, refresh all data. Show "Back online — data refreshed" toast.

### E18: Browser Incompatibility

- **Error:** User opens CEA-OS in unsupported browser (IE, old Safari)
- **System Response:** Check User-Agent, show upgrade prompt
- **User Message:** "Your browser is not supported. Please use Chrome, Firefox, Safari (14+), or Edge (Chromium)."
- **Recovery:** Block rendering of app, show static upgrade page with download links.

### E19: OTP / MFA Failure

- **Error:** MFA challenge fails repeatedly
- **System Response:** After 5 failed attempts, lock account for 15 minutes
- **User Message:** "Authentication failed. If you've lost access to your MFA device, contact IT support to reset."
- **Recovery:** Show recovery codes prompt. If no recovery codes, contact support link.

### E20: Data Privacy (Small Cohort)

- **Error:** Attempting to view demographic data for cohort < 5 students
- **System Response:** Suppress data points, show asterisks
- **User Message:** "Data hidden to protect privacy (cohort too small)."
- **Recovery:** Available when cohort grows or when aggregated with larger group.
