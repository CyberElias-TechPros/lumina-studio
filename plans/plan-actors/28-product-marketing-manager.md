# Actor: Product Marketing Manager

## 1. Identity & Role Definition

**Actor ID:** `product_marketing_manager`
**Display Name:** Product Marketing Manager
**Description:** Owns product positioning, messaging, go-to-market strategy, competitive analysis, and product launches for all Cyber Elias Academy programs, courses, and services. Acts as the bridge between product development, marketing, and sales — ensuring every offering is positioned for maximum market impact and enrollment conversion.
**System Role:** `product_marketing_staff`
**Hierarchy:** Reports to Director of Marketing / VP of Marketing
**Location:** Web dashboard only
**Session Timeout:** 45 minutes of inactivity
**Concurrent Sessions:** 3 max

## 2. Primary Goals & Success KPIs

| Goal                        | KPI                                              | Target    |
| --------------------------- | ------------------------------------------------ | --------- |
| Successful product launches | Launch-to-first-100-enrollments time             | < 30 days |
| Clear product positioning   | Positioning document completion rate per program | 100%      |
| Competitive differentiation | Win rate vs identified competitors               | > 60%     |
| Effective messaging         | Message recall in user surveys                   | > 70%     |
| Sales enablement            | Sales team NPS on enablement materials           | > 8/10    |
| Market awareness            | Unaided brand awareness for new programs         | > 25%     |
| GTM execution               | GTM plan milestones on-time rate                 | > 90%     |
| Research cadence            | Market research studies completed per quarter    | > 4       |

## 3. Complete Screen Inventory

### 3.1 Product Marketing Hub (`/product-marketing`)

**Wireframe:** Central dashboard with launch countdown, KPI cards, upcoming milestones, recent competitive alerts, and quick-create actions.

**UI Fields/Components:**

- **Header:** "Product Marketing Hub" with breadcrumb (Home > Product Marketing)
- **Launches Countdown Widget:** Next upcoming launch with program name, target date, days remaining, status progress bar (Planning > Development > Launch Prep > Launched)
- **KPI Cards Row:**
  - Programs Launched (YTD), Avg Days to 100 Enrollments, Competitive Win Rate, Active GTM Plans
  - Each: Value, trend, sparkline
- **Upcoming Milestones (timeline):** Next 5 key milestones across all active launches with date and owner
- **Competitive Alerts Feed:** Recent competitor moves (new course, pricing change, feature launch) with severity and suggested response
- **Quick Actions:**
  - "New GTM Plan" -> `/product-marketing/gtm/new`
  - "New Research" -> `/product-marketing/research/new`
  - "Create Brief" -> `/product-marketing/briefs/new`
  - "Add Competitor" -> `/product-marketing/competitive/new`

**Data Bindings:**

- `GET /api/product-marketing/dashboard/summary`
- `GET /api/product-marketing/dashboard/upcoming-milestones`
- `GET /api/product-marketing/dashboard/competitive-alerts`

**States:**

| State   | Behavior                                                                       |
| ------- | ------------------------------------------------------------------------------ |
| Loading | Skeleton dashboard with KPI card shimmer                                       |
| Empty   | "Welcome to Product Marketing Hub. Create your first GTM plan to get started." |
| Error   | "Could not load dashboard data. [Retry]"                                       |

### 3.2 GTM Planner (`/product-marketing/gtm`)

**Wireframe:** Kanban/timeline view of all go-to-market plans with phases, tasks, deliverables, and cross-functional team assignments.

**UI Fields/Components:**

- **View Toggle:** Timeline / Kanban / Table
- **GTM Plan Cards/List:** Name, Program/Course, Launch Date, Status (Draft / Planning / In Progress / On Hold / Launched / Post-Launch), Phase
- **GTM Plan Detail (`/product-marketing/gtm/{id}`):**
  - **Header:** Plan name, program association, launch date, status badge, "Edit" / "Mark as Launched" buttons
  - **Phases (expandable sections):**
    - Phase 1: Strategy & Research (Weeks -12 to -8) — Tasks: Market analysis, Target persona definition, Positioning workshop, Competitive review
    - Phase 2: Positioning & Messaging (Weeks -8 to -6) — Tasks: Positioning statement, Messaging hierarchy, Value proposition, Key differentiators
    - Phase 3: Content & Collateral (Weeks -6 to -3) — Tasks: Sales deck, One-pager, Case study, Webinar script, Blog posts, Email sequence
    - Phase 4: Launch Execution (Weeks -3 to 0) — Tasks: Launch announcement, Social campaign, PR outreach, Webinar, Paid ads, Influencer outreach
    - Phase 5: Post-Launch (Weeks 0 to +4) — Tasks: Performance review, Metrics analysis, Retrospective, Iteration
    - Each phase: Task list with assignee, due date, status (Not Started / In Progress / Complete), checkbox, drag-and-drop reorder, comment thread
  - **Checklist:** Deliverable checklist with percent complete, owner per item
  - **Team Section:** List of cross-functional stakeholders (Product, Engineering, Marketing, Sales, Support) with role and contact info
  - **Attachments:** File upload per deliverable
  - **Notes/Comments:** Activity feed

**Data Bindings:**

- `GET /api/product-marketing/gtm-plans`
- `POST /api/product-marketing/gtm-plans`
- `GET /api/product-marketing/gtm-plans/{id}`
- `PUT /api/product-marketing/gtm-plans/{id}`
- `POST /api/product-marketing/gtm-plans/{id}/tasks`
- `PUT /api/product-marketing/gtm-plans/{id}/tasks/{taskId}`
- `POST /api/product-marketing/gtm-plans/{id}/launch`

**States:**

| State                         | Behavior                                                  |
| ----------------------------- | --------------------------------------------------------- |
| Loading                       | Kanban/timeline skeleton                                  |
| Empty                         | "No GTM plans yet. Launch your first program."            |
| Past launch date not launched | Red banner: "Launch date was {date}. Update plan status." |

### 3.3 Product Positioning Dashboard (`/product-marketing/positioning`)

**Wireframe:** Structured document editor for creating and managing product positioning — positioning statements, messaging hierarchies, value propositions, and persona-definition for each program.

**UI Fields/Components:**

- **Program Selector:** Dropdown of all CEA programs/courses with search
- **Positioning Canvas:**
  - **Positioning Statement Builder (structured fields):**
    - For [target customer] who [customer need], [product name] is a [category] that [key benefit]. Unlike [competitor alternative], our product [unique differentiator].
    - Field 1: Target Customer (text area, persona reference)
    - Field 2: Customer Need (text area)
    - Field 3: Product Name (auto-populated from program)
    - Field 4: Category (dropdown: Bootcamp / Course / Certification / Workshop / Service)
    - Field 5: Key Benefit (text area)
    - Field 6: Competitive Alternative (text)
    - Field 7: Unique Differentiator (text area)
  - **Messaging Hierarchy (nested):**
    - Level 1: Value Proposition (1 sentence)
    - Level 2: Supporting Pillars (3-5) — each: Title, Description, Proof points (repeating text list), Links to evidence (testimonials, stats, case studies)
    - Level 3: Features & Benefits (expandable list per pillar): Feature, Benefit, Proof
  - **Persona Mapping:** Select linked personas from existing personas module or create inline
  - **Status:** Draft / Review / Approved / Published
  - **Version History:** Sidebar with version list, compare mode, restore
- **"Export Positioning Deck" button:** Generates PDF

**Data Bindings:**

- `GET /api/product-marketing/positioning?programId={id}`
- `PUT /api/product-marketing/positioning/{id}`
- `POST /api/product-marketing/positioning/{id}/publish`

**States:**

| State           | Behavior                                                                              |
| --------------- | ------------------------------------------------------------------------------------- |
| Loading         | Document skeleton with section placeholders                                           |
| No positioning  | "No positioning document for this program. Create one to define how we go to market." |
| Version compare | Side-by-side diff view showing additions/deletions                                    |

### 3.4 Competitive Intelligence Hub (`/product-marketing/competitive`)

**Wireframe:** Repository of competitor profiles, market landscape analysis, battle cards, competitive alerts, win/loss analysis, and shareable reports.

**UI Fields/Components:**

- **Sidebar:** Competitor list (with logo, name, market share indicator), Landscape Analysis, Battle Cards, Win/Loss Reports, Alerts Feed
- **Competitor Profile Page:**
  - **Overview:** Logo, Name, Website, HQ Location, Founded Year, Employee Count, Estimated Revenue, Funding
  - **Product/Service Offering:** Table of their programs vs ours — columns: Offering, Their Price, Our Price, Their Features, Our Features, Our Advantage
  - **Positioning & Messaging:** Their tagline, value prop, target audience, key messages (with source URL)
  - **Strengths & Weaknesses:** Categorized list
  - **Recent Activity (alerts):** Feed of changes (new course launch, price change, hiring spree, funding, partnership, acquisition)
  - **Competitive Scorecard:** Ratings across dimensions (Product Quality, Pricing, Brand Strength, Market Share, Innovation) — 1-5 scale
- **Battle Card Builder:**
  - Select competitor, select program, generate comparison table
  - Sections: Common objections, Our response, Key differentiators, Proof points, "How to win" notes
  - Download as PDF or share link
- **Win/Loss Analysis:**
  - Table: Deal/opportunity name, Prospect, Competitor, Won/Lost, Date, Amount, Reason (dropdown + notes), Sales rep
  - Analytics: Win rate by competitor, by reason, by program
  - "Add Entry" form
- **Alerts Feed:** Real-time/list view of competitor movements, RSS feeds, webhook data, manual entries

**Data Bindings:**

- `GET /api/product-marketing/competitors`
- `POST /api/product-marketing/competitors`
- `GET /api/product-marketing/competitors/{id}`
- `PUT /api/product-marketing/competitors/{id}`
- `GET /api/product-marketing/competitive/battle-cards?competitorId={id}&programId={id}`
- `GET /api/product-marketing/competitive/win-loss`
- `POST /api/product-marketing/competitive/win-loss`
- `GET /api/product-marketing/competitive/alerts`

**States:**

| State      | Behavior                                                                 |
| ---------- | ------------------------------------------------------------------------ |
| Loading    | Profile skeleton with tabs                                               |
| Empty      | "No competitors tracked. Add your first competitor to start monitoring." |
| Stale data | "Last updated {date}. [Refresh]"                                         |

### 3.5 Launch Calendar (`/product-marketing/launch-calendar`)

**Wireframe:** Calendar/gantt view of all product launches with milestones, dependencies, and cross-program visibility.

**UI Fields/Components:**

- **View Toggle:** Month / Quarter / Gantt
- **Calendar Grid:** Each program launch as a bar spanning its phases, color-coded by status
- **Launch Detail (tooltip/modal on click):** Program name, Launch date, Phase, GTM plan link, Status, Key milestone summary
- **Filter:** Program type, Status, Quarter, Owner
- **Legend:** Colors by status (Planning=blue, In Progress=yellow, On Hold=gray, Launched=green, Post-Launch=teal)
- **Dependency Lines:** Arrows between milestones that depend on prior completion
- **"Export Calendar"** button: ICS or CSV
- **Milestone List (below calendar):** Table of all upcoming milestones sorted by date, with completion checkbox, owner, overdue indicator

**Data Bindings:**

- `GET /api/product-marketing/launch-calendar?quarter={q}&year={y}`
- `GET /api/product-marketing/launch-calendar/milestones?from={date}&to={date}`

**States:**

| State             | Behavior                                                             |
| ----------------- | -------------------------------------------------------------------- |
| Loading           | Calendar skeleton with placeholder bars                              |
| Empty             | "No launches scheduled. Create a GTM plan to populate the calendar." |
| Overdue milestone | Red milestone dot with tooltip "Overdue by X days"                   |

### 3.6 Market Research Repository (`/product-marketing/research`)

**Wireframe:** Library of market research studies, surveys, analyst reports, industry data, and custom research with tagging, search, and synthesis tools.

**UI Fields/Components:**

- **Research Library (table/grid):**
  - Columns: Title, Type (Survey / Analyst Report / Internal Study / Industry Data / Competitive Intel / Trend Analysis), Status (Draft / Complete / Published), Date Published, Lead Researcher, Tags
  - Search: Title, tags, content
  - Filters: Type, Status, Date range, Tags, Lead
- **Research Detail Page:**
  - **Header:** Title, status, author, published date
  - **Executive Summary:** Rich text
  - **Methodology:** Text describing approach, sample size, dates, limitations
  - **Key Findings:** Ordered list with highlights
  - **Data Visualizations:** Embedded charts (bar, line, pie, tables) generated from research data
  - **Attachments:** PDF, CSV, PPT, links to source data
  - **Tags & Categories**
  - **Related Research:** Links to other related studies
- **New Research Form:**
  - Title, Type, Methodology (rich text)
  - Upload data file (CSV/Excel) -> auto-generate charts
  - Executive Summary, Key Findings
  - Tags, Related programs
  - Publish toggle

**Data Bindings:**

- `GET /api/product-marketing/research`
- `POST /api/product-marketing/research`
- `GET /api/product-marketing/research/{id}`
- `PUT /api/product-marketing/research/{id}`
- `DELETE /api/product-marketing/research/{id}`

**States:**

| State            | Behavior                                                             |
| ---------------- | -------------------------------------------------------------------- |
| Loading          | Library skeleton                                                     |
| Empty            | "No research studies yet. Upload your first market research report." |
| Chart generation | "Generating visualizations from data..." with progress               |

### 3.7 Messaging Matrix (`/product-marketing/messaging`)

**Wireframe:** Tabular matrix mapping target personas + customer journey stages to specific messages, tones, channels, and proof points.

**UI Fields/Components:**

- **Matrix Grid:** Rows = Personas (e.g., Career Switcher, IT Pro, Student, Corporate Client), Columns = Journey Stages (Awareness, Consideration, Decision, Onboarding, Retention, Advocacy)
- **Cell Content (click to edit):**
  - Headline Message (text)
  - Supporting Message (text)
  - Tone (dropdown based on style guide)
  - Channel Priority (ordered list: Social, Email, Web, Sales, etc.)
  - Proof Point (linked from positioning)
  - CTA (text)
  - Status (Approved / Draft / Needs Review)
- **Filters:** Persona group filter, Stage filter, Status filter, Program filter
- **"Export Matrix" button:** CSV or PDF
- **Notes/Comments:** Threaded per cell or global

**Data Bindings:**

- `GET /api/product-marketing/messaging-matrix?programId={id}`
- `PUT /api/product-marketing/messaging-matrix/{id}/cells`
- `POST /api/product-marketing/messaging-matrix/{id}/publish`

**States:**

| State   | Behavior                                                                  |
| ------- | ------------------------------------------------------------------------- |
| Loading | Matrix skeleton with placeholder cells                                    |
| Empty   | "Create a messaging matrix to map your messaging to personas and stages." |

### 3.8 Campaign Brief Builder (`/product-marketing/briefs`)

**Wireframe:** Structured form to create campaign briefs that bridge product marketing insights with execution teams.

**UI Fields/Components:**

- **Brief List:** Table of all campaign briefs with title, program, type, status, due date, owner
- **Brief Form (multi-step):**
  - **Section 1 — Campaign Overview:** Campaign name, Program/product association, Campaign type (Launch / Awareness / Consideration / Conversion / Retention / Event), Budget, Start/End dates
  - **Section 2 — Audience:** Primary persona, Secondary persona, Audience size estimate, Segmentation notes
  - **Section 3 — Positioning & Messaging:** Value proposition (pre-populated from positioning doc if linked), Key message, Call to action, Tone, Competitive angle
  - **Section 4 — Channels & Tactics:** Channel selection (checkboxes: Email, Social, Paid Search, Display, Content, Events, Direct Mail, SMS), Budget allocation per channel, Tactics per channel
  - **Section 5 — Creative Requirements:** Key visual direction, Copy guidelines, Required assets, Brand references, Do/Don't notes
  - **Section 6 — Success Metrics:** Primary KPI, Secondary KPIs, Target values, Reporting cadence
  - **Section 7 — Approvals:** Required approvers (roles), Approval deadline, Notes
- **"Save Draft" / "Submit Brief"** buttons
- **Status workflow:** Draft -> Review -> Approved -> In Production -> Complete

**Data Bindings:**

- `GET /api/product-marketing/campaign-briefs`
- `POST /api/product-marketing/campaign-briefs`
- `GET /api/product-marketing/campaign-briefs/{id}`
- `PUT /api/product-marketing/campaign-briefs/{id}`
- `POST /api/product-marketing/campaign-briefs/{id}/submit`

**States:**

| State   | Behavior                                                                  |
| ------- | ------------------------------------------------------------------------- |
| Loading | Form skeleton with fields                                                 |
| Empty   | "No campaign briefs yet. Create your first brief to kick off a campaign." |

### 3.9 Performance Analytics (`/product-marketing/analytics`)

**Wireframe:** Analytics dashboard showing program-level performance, launch impact, messaging effectiveness, and competitive positioning metrics.

**UI Fields/Components:**

- **Program Performance Table:** Program name, Launch date, Enrollments (total, 30d, 90d), Revenue, Conversion rate, Cost per enrollment, NPS, Competitor win rate
- **Launch Impact Analysis:** Pre/post launch metrics (traffic, leads, enrollments, revenue) with annotated launch date line
- **Messaging Effectiveness:** Survey results on message recall, clarity, persuasiveness per program (bar chart)
- **Positioning Health Score:** Composite score based on differentiation, clarity, relevance, memorability (per program)
- **Competitive Position Map:** 2D bubble chart (Price vs Quality/Features) with CEA and competitors plotted
- **Filter:** Program, Date range, Segment
- **Export:** "Export Report" -> PDF or CSV

**Data Bindings:**

- `GET /api/product-marketing/analytics/programs`
- `GET /api/product-marketing/analytics/launch-impact?programId={id}`
- `GET /api/product-marketing/analytics/messaging-scorecard`
- `GET /api/product-marketing/analytics/positioning-health`

**States:**

| State   | Behavior                                                    |
| ------- | ----------------------------------------------------------- |
| Loading | Chart skeletons + table shimmer                             |
| No data | "Analytics data will populate after programs are launched." |

## 4. Full Database Schema

```typescript
// --- Product Marketing Schema (product_mktg) ---

export const pmGtmPlans = pgTable('pm_gtm_plans', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  programId: uuid('program_id').references(() => programs.id).notNull(),
  launchDate: timestamp('launch_date').notNull(),
  status: varchar('status', { length: 30 }).default('draft').notNull(),
  phases: jsonb('phases').default('[]'),
  progressPct: integer('progress_pct').default(0),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  launchNotes: text('launch_notes'),
  retrospectiveUrl: varchar('retrospective_url', { length: 500 }),
});

export const pmGtmTasks = pgTable('pm_gtm_tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  planId: uuid('plan_id').references(() => pmGtmPlans.id).notNull(),
  phaseIndex: integer('phase_index').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  assigneeId: uuid('assignee_id').references(() => users.id),
  dueDate: timestamp('due_date'),
  status: varchar('status', { length: 30 }).default('not_started'),
  completedAt: timestamp('completed_at'),
  completedBy: uuid('completed_by').references(() => users.id),
  sortOrder: integer('sort_order').default(0),
  dependOnTaskIds: uuid('depend_on_task_ids').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const pmPositioning = pgTable('pm_positioning', {
  id: uuid('id').defaultRandom().primaryKey(),
  programId: uuid('program_id').references(() => programs.id).notNull().unique(),
  status: varchar('status', { length: 30 }).default('draft'),
  targetCustomer: text('target_customer'),
  customerNeed: text('customer_need'),
  category: varchar('category', { length: 50 }),
  keyBenefit: text('key_benefit'),
  competitiveAlternative: text('competitive_alternative'),
  uniqueDifferentiator: text('unique_differentiator'),
  fullStatement: text('full_statement'),
  valueProposition: varchar('value_proposition', { length: 300 }),
  messagingPillars: jsonb('messaging_pillars').default('[]'),
  personaIds: uuid('persona_ids').array(),
  version: integer('version').default(1).notNull(),
  publishedAt: timestamp('published_at'),
  publishedBy: uuid('published_by').references(() => users.id),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const pmPositioningVersions = pgTable('pm_positioning_versions', {
  id: uuid('id').defaultRandom().primaryKey(),
  positioningId: uuid('positioning_id').references(() => pmPositioning.id).notNull(),
  versionNumber: integer('version_number').notNull(),
  snapshot: jsonb('snapshot').notNull(),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  changeNotes: text('change_notes'),
});

export const pmCompetitors = pgTable('pm_competitors', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  website: varchar('website', { length: 500 }),
  logoUrl: varchar('logo_url', { length: 500 }),
  hqLocation: varchar('hq_location', { length: 200 }),
  foundedYear: integer('founded_year'),
  employeeCount: integer('employee_count'),
  estimatedRevenue: varchar('estimated_revenue', { length: 100 }),
  fundingInfo: varchar('funding_info', { length: 500 }),
  marketShare: numeric('market_share', { precision: 4, scale: 1 }),
  tagline: varchar('tagline', { length: 255 }),
  valueProposition: text('value_proposition'),
  targetAudience: text('target_audience'),
  keyMessages: text('key_messages').array(),
  strengths: text('strengths').array(),
  weaknesses: text('weaknesses').array(),
  scorecard: jsonb('scorecard').default('{}'),
  overallScore: numeric('overall_score', { precision: 3, scale: 1 }),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const pmCompetitorOfferings = pgTable('pm_competitor_offerings', {
  id: uuid('id').defaultRandom().primaryKey(),
  competitorId: uuid('competitor_id').references(() => pmCompetitors.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  ourEquivalent: varchar('our_equivalent', { length: 255 }),
  theirPrice: varchar('their_price', { length: 100 }),
  ourPrice: varchar('our_price', { length: 100 }),
  theirFeatures: text('their_features').array(),
  ourFeatures: text('our_features').array(),
  ourAdvantage: text('our_advantage'),
  notes: text('notes'),
});

export const pmCompetitorAlerts = pgTable('pm_competitor_alerts', {
  id: uuid('id').defaultRandom().primaryKey(),
  competitorId: uuid('competitor_id').references(() => pmCompetitors.id).notNull(),
  alertType: varchar('alert_type', { length: 50 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  severity: varchar('severity', { length: 20 }).default('info'),
  sourceUrl: varchar('source_url', { length: 500 }),
  sourceType: varchar('source_type', { length: 50 }),
  detectedAt: timestamp('detected_at').defaultNow().notNull(),
  acknowledgedAt: timestamp('acknowledged_at'),
  acknowledgedBy: uuid('acknowledged_by').references(() => users.id),
  relatedAction: text('related_action'),
});

export const pmWinLossEntries = pgTable('pm_win_loss_entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  opportunityName: varchar('opportunity_name', { length: 255 }).notNull(),
  prospectName: varchar('prospect_name', { length: 255 }),
  competitorId: uuid('competitor_id').references(() => pmCompetitors.id),
  programId: uuid('program_id').references(() => programs.id),
  result: varchar('result', { length: 10 }).notNull(),
  dealValue: numeric('deal_value', { precision: 12, scale: 2 }),
  reason: varchar('reason', { length: 100 }),
  reasonNotes: text('reason_notes'),
  salesRepId: uuid('sales_rep_id').references(() => users.id),
  dealDate: timestamp('deal_date').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
});

export const pmBattleCards = pgTable('pm_battle_cards', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  competitorId: uuid('competitor_id').references(() => pmCompetitors.id).notNull(),
  programId: uuid('program_id').references(() => programs.id).notNull(),
  content: jsonb('content').default('{}'),
  status: varchar('status', { length: 30 }).default('draft'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
});

export const pmResearch = pgTable('pm_research', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  status: varchar('status', { length: 30 }).default('draft'),
  executiveSummary: text('executive_summary'),
  methodology: text('methodology'),
  keyFindings: text('key_findings').array(),
  tags: text('tags').array(),
  programIds: uuid('program_ids').array(),
  dataFiles: jsonb('data_files').default('[]'),
  charts: jsonb('charts').default('[]'),
  leadResearcherId: uuid('lead_researcher_id').references(() => users.id),
  publishedAt: timestamp('published_at'),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const pmMessagingMatrix = pgTable('pm_messaging_matrix', {
  id: uuid('id').defaultRandom().primaryKey(),
  programId: uuid('program_id').references(() => programs.id).notNull(),
  status: varchar('status', { length: 30 }).default('draft'),
  cells: jsonb('cells').default('[]'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  publishedAt: timestamp('published_at'),
});

export const pmCampaignBriefs = pgTable('pm_campaign_briefs', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  programId: uuid('program_id').references(() => programs.id),
  campaignType: varchar('campaign_type', { length: 50 }).notNull(),
  status: varchar('status', { length: 30 }).default('draft'),
  budget: numeric('budget', { precision: 12, scale: 2 }),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  primaryPersonaId: uuid('primary_persona_id'),
  secondaryPersonaId: uuid('secondary_persona_id'),
  audienceSize: integer('audience_size'),
  segmentationNotes: text('segmentation_notes'),
  valueProposition: text('value_proposition'),
  keyMessage: text('key_message'),
  callToAction: varchar('call_to_action', { length: 255 }),
  tone: varchar('tone', { length: 50 }),
  competitiveAngle: text('competitive_angle'),
  channels: text('channels').array(),
  budgetAllocation: jsonb('budget_allocation').default('{}'),
  creativeBrief: jsonb('creative_brief').default('{}'),
  primaryKpi: varchar('primary_kpi', { length: 100 }),
  secondaryKpis: jsonb('secondary_kpis').default('[]'),
  targetValues: jsonb('target_values').default('{}'),
  requiredApprovers: jsonb('required_approvers').default('[]'),
  approvedAt: timestamp('approved_at'),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

CREATE INDEX idx_pm_gtm_plans_program ON pm_gtm_plans(program_id);
CREATE INDEX idx_pm_gtm_plans_status ON pm_gtm_plans(status);
CREATE INDEX idx_pm_gtm_tasks_plan ON pm_gtm_tasks(plan_id);
CREATE INDEX idx_pm_gtm_tasks_assignee ON pm_gtm_tasks(assignee_id);
CREATE INDEX idx_pm_positioning_program ON pm_positioning(program_id);
CREATE INDEX idx_pm_competitor_alerts_competitor ON pm_competitor_alerts(competitor_id);
CREATE INDEX idx_pm_competitor_alerts_severity ON pm_competitor_alerts(severity);
CREATE INDEX idx_pm_win_loss_competitor ON pm_win_loss_entries(competitor_id);
CREATE INDEX idx_pm_research_type ON pm_research(type);
CREATE INDEX idx_pm_campaign_briefs_status ON pm_campaign_briefs(status);
```

## 5. Complete API Contract

### Endpoints

```
GET    /api/v1/product-marketing/gtm-plans
POST   /api/v1/product-marketing/gtm-plans
GET    /api/v1/product-marketing/gtm-plans/{id}
PUT    /api/v1/product-marketing/gtm-plans/{id}
DELETE /api/v1/product-marketing/gtm-plans/{id}
POST   /api/v1/product-marketing/gtm-plans/{id}/tasks
PUT    /api/v1/product-marketing/gtm-plans/{id}/tasks/{tid}
DELETE /api/v1/product-marketing/gtm-plans/{id}/tasks/{tid}
POST   /api/v1/product-marketing/gtm-plans/{id}/launch

GET    /api/v1/product-marketing/positioning?programId={id}
PUT    /api/v1/product-marketing/positioning/{id}
POST   /api/v1/product-marketing/positioning/{id}/publish
GET    /api/v1/product-marketing/positioning/{id}/versions
GET    /api/v1/product-marketing/positioning/{id}/versions/{v}

GET    /api/v1/product-marketing/competitors
POST   /api/v1/product-marketing/competitors
GET    /api/v1/product-marketing/competitors/{id}
PUT    /api/v1/product-marketing/competitors/{id}
DELETE /api/v1/product-marketing/competitors/{id}
POST   /api/v1/product-marketing/competitors/{id}/offerings
PUT    /api/v1/product-marketing/competitors/{id}/offerings/{o}

GET    /api/v1/product-marketing/competitive/alerts
POST   /api/v1/product-marketing/competitive/alerts
POST   /api/v1/product-marketing/competitive/alerts/{id}/ack

GET    /api/v1/product-marketing/competitive/win-loss
POST   /api/v1/product-marketing/competitive/win-loss
GET    /api/v1/product-marketing/competitive/win-loss/summary

GET    /api/v1/product-marketing/competitive/battle-cards
POST   /api/v1/product-marketing/competitive/battle-cards
GET    /api/v1/product-marketing/competitive/battle-cards/{id}
PUT    /api/v1/product-marketing/competitive/battle-cards/{id}

GET    /api/v1/product-marketing/launch-calendar
GET    /api/v1/product-marketing/launch-calendar/milestones

GET    /api/v1/product-marketing/research
POST   /api/v1/product-marketing/research
GET    /api/v1/product-marketing/research/{id}
PUT    /api/v1/product-marketing/research/{id}
DELETE /api/v1/product-marketing/research/{id}

GET    /api/v1/product-marketing/messaging-matrix?programId={}
PUT    /api/v1/product-marketing/messaging-matrix/{id}
POST   /api/v1/product-marketing/messaging-matrix/{id}/publish

GET    /api/v1/product-marketing/campaign-briefs
POST   /api/v1/product-marketing/campaign-briefs
GET    /api/v1/product-marketing/campaign-briefs/{id}
PUT    /api/v1/product-marketing/campaign-briefs/{id}
POST   /api/v1/product-marketing/campaign-briefs/{id}/submit

GET    /api/v1/product-marketing/analytics/programs
GET    /api/v1/product-marketing/analytics/launch-impact
GET    /api/v1/product-marketing/analytics/messaging-scorecard
GET    /api/v1/product-marketing/analytics/positioning-health

GET    /api/v1/product-marketing/dashboard/summary
GET    /api/v1/product-marketing/dashboard/upcoming-milestones
GET    /api/v1/product-marketing/dashboard/competitive-alerts
```

**Types:**

```typescript
interface GtmPlan {
  id: string;
  name: string;
  programId: string;
  launchDate: string;
  status: string;
  phases: Array<{
    name: string;
    startWeek: number;
    endWeek: number;
    tasks: GtmTask[];
  }>;
  progressPct: number;
  createdAt: string;
}

interface GtmTask {
  id: string;
  planId: string;
  phaseIndex: number;
  title: string;
  description: string | null;
  assigneeId: string | null;
  dueDate: string | null;
  status: string;
  sortOrder: number;
}

interface Positioning {
  id: string;
  programId: string;
  status: string;
  targetCustomer: string | null;
  customerNeed: string | null;
  category: string | null;
  keyBenefit: string | null;
  competitiveAlternative: string | null;
  uniqueDifferentiator: string | null;
  fullStatement: string | null;
  messagingPillars: Array<{
    title: string;
    description: string;
    proofPoints: string[];
    featureBenefits: Array<{ feature: string; benefit: string; proof: string }>;
  }>;
  version: number;
}

interface Competitor {
  id: string;
  name: string;
  website: string | null;
  logoUrl: string | null;
  scorecard: Record<string, number>;
  overallScore: number | null;
  strengths: string[];
  weaknesses: string[];
  createdAt: string;
}

interface CompetitiveAlert {
  id: string;
  competitorId: string;
  competitorName: string;
  alertType: string;
  title: string;
  severity: string;
  sourceUrl: string | null;
  detectedAt: string;
  acknowledged: boolean;
}

interface WinLossSummary {
  totalDeals: number;
  wonDeals: number;
  lostDeals: number;
  winRate: number;
  byCompetitor: Array<{
    competitorId: string;
    competitorName: string;
    winRate: number;
    deals: number;
  }>;
  byReason: Array<{ reason: string; count: number; pct: number }>;
}

interface CampaignBrief {
  id: string;
  name: string;
  programId: string | null;
  campaignType: string;
  status: string;
  budget: string | null;
  channels: string[];
  primaryKpi: string | null;
  createdAt: string;
}

interface MessagingMatrixCell {
  personaId: string;
  stageId: string;
  headline: string;
  supportingMessage: string;
  tone: string;
  channelPriority: string[];
  proofPoint: string;
  cta: string;
  status: string;
}
```

**Error Codes:**

| Code   | HTTP | Meaning                                          |
| ------ | ---- | ------------------------------------------------ |
| PM_001 | 400  | Invalid GTM plan phase data                      |
| PM_002 | 400  | Missing required positioning field               |
| PM_003 | 404  | Program not found                                |
| PM_004 | 404  | GTM plan not found                               |
| PM_005 | 409  | Positioning version conflict                     |
| PM_006 | 422  | Launch date must be in the future                |
| PM_007 | 422  | Battle card requires both competitor and program |
| PM_008 | 500  | Competitive data sync failure                    |

## 6. Component Tree

```
App
+-- ProductMarketingModule
    +-- PMLayout (shell)
    |   +-- Sidebar (GTM Planner, Positioning, Competitive, Launch Calendar, Research, Messaging, Briefs, Analytics)
    |   +-- Breadcrumb
    |
    +-- ProductMarketingHub
    |   +-- KpiCardRow
    |   +-- LaunchCountdownWidget
    |   +-- MilestoneTimeline
    |   +-- CompetitiveAlertsFeed
    |
    +-- GTMPage
    |   +-- GTMPlanList
    |   |   +-- ViewToggle (timeline/kanban/table)
    |   |   +-- GTMPlanCard { name, date, status, progress }
    |   +-- GTMPlanDetail
    |       +-- PlanHeader { name, status, launchDate }
    |       +-- PhaseList
    |       |   +-- PhaseSection { phase, index }
    |       |       +-- TaskRow { task, onToggle, onAssign, onDrag }
    |       +-- GlobalChecklist { progress, items[] }
    |       +-- TeamSection { stakeholders[] }
    |       +-- ActivityFeed
    |
    +-- PositioningPage
    |   +-- ProgramSelector
    |   +-- PositioningCanvas
    |   |   +-- PositioningStatementBuilder
    |   |   +-- MessagingHierarchyEditor
    |   |   |   +-- PillarEditor { pillar, onUpdate }
    |   |   |       +-- FeatureBenefitRow { fb, onUpdate }
    |   |   +-- PersonaMapper
    |   |   +-- StatusControls
    |   +-- VersionSidebar
    |   |   +-- VersionEntry { number, date, author, onRestore }
    |   +-- ExportButton
    |
    +-- CompetitiveIntelligencePage
    |   +-- CompetitorSidebar { list, active, onSelect }
    |   +-- CompetitorProfile
    |   |   +-- CompetitorOverview { name, logo, details }
    |   |   +-- OfferingsTable
    |   |   +-- StrengthWeaknessMatrix
    |   |   +-- Scorecard { dimensions[], ratings }
    |   |   +-- RecentAlerts
    |   |   +-- RelatedBattleCards
    |   +-- BattleCardBuilder
    |   |   +-- CompetitionSelector
    |   |   +-- ObjectionEditor (repeating)
    |   |   +-- DifferentiatorList
    |   |   +-- ProofPointSelector
    |   +-- WinLossDashboard
    |   |   +-- WinLossTable
    |   |   +-- WinRateChart
    |   |   +-- AddEntryForm
    |   +-- AlertsFeed
    |       +-- AlertItem { type, title, severity, source }
    |
    +-- LaunchCalendarPage
    |   +-- CalendarViewToggle
    |   +-- LaunchGanttChart
    |   |   +-- LaunchBar { program, status, phases, onClick }
    |   +-- FilterBar
    |   +-- MilestoneList
    |   |   +-- MilestoneRow { title, date, owner, status }
    |   +-- ExportButton
    |
    +-- ResearchPage
    |   +-- ResearchLibrary { grid/table }
    |   |   +-- ResearchCard { title, type, status, date, tags }
    |   +-- SearchFilterBar
    |   +-- ResearchDetail
    |       +-- ResearchSummary
    |       +-- KeyFindingsList
    |       +-- ChartViewer
    |       +-- AttachmentsList
    |
    +-- MessagingMatrixPage
    |   +-- ProgramSelector
    |   +-- MatrixGrid
    |   |   +-- MatrixRow (persona)
    |   |   |   +-- MatrixCell { personaId, stageId, content, status }
    |   |   +-- MatrixColumn (stage header)
    |   +-- CellEditorModal { fields per cell }
    |   +-- ExportButton
    |
    +-- CampaignBriefPage
    |   +-- BriefList { table }
    |   |   +-- BriefRow { name, type, status, dueDate, owner }
    |   +-- BriefBuilder
    |       +-- SectionOverview
    |       +-- SectionAudience
    |       +-- SectionMessaging
    |       +-- SectionChannels
    |       +-- SectionCreativeRequirements
    |       +-- SectionMetrics
    |       +-- SectionApprovals
    |
    +-- PMAnalyticsPage
        +-- ProgramPerformanceTable
        +-- LaunchImpactChart
        +-- MessagingScorecard
        +-- PositioningHealthScore
        +-- CompetitivePositionMap
```

## 7. Exhaustive User Journeys

### Journey 1: Full Go-to-Market Launch for a New Program

1. PMM identifies market demand for "AI for Product Managers" course through research
2. Opens GTM Planner -> "New GTM Plan" -> links to program, sets launch date 12 weeks out
3. Phase 1 (Weeks -12 to -8): Creates tasks for market sizing, customer interviews, competitor analysis. Assigns tasks to self and research analyst. Completes market analysis, uploads to Research Repository
4. Phase 2 (Weeks -8 to -6): Opens Positioning Dashboard, fills positioning statement: "For product managers who want to leverage AI, AI for PMs is the only practical course that teaches you to build AI features without coding. Unlike generic AI courses, we focus specifically on product management use cases." Defines 4 messaging pillars: Practical Application, PM-Specific, No-Code, Career Impact. Maps personas
5. Phase 3 (Weeks -6 to -3): Creates Campaign Brief for content team. Generates competitive battle cards vs competitors. Analyzes win/loss from similar past launches
6. Phase 4 (Weeks -3 to 0): Briefs conversion copywriter on landing page. Coordinates with marketing officer on email sequence, social, paid ads. Tracks milestones on Launch Calendar
7. Launch Day: Clicks "Mark as Launched" on GTM plan. System notifies stakeholders, updates calendar
8. Phase 5 (Weeks 0 to +4): Monitors Performance Analytics (enrollments, revenue, conversion rate). Runs retrospective, documents learnings. Updates competitive intel

### Journey 2: Competitive Threat Response

1. Dashboard shows "HIGH severity: Competitor SkillForge launched Zero-to-AI Engineer at $299"
2. Clicks acknowledge -> alert marked as reviewed
3. Opens SkillForge profile -> reviews offering, pricing, positioning
4. Updates offerings table with new course, notes price and features
5. Creates response plan: updates battle card with new objection handling, creates competitive alert with suggested response, briefs copywriter to update landing page
6. Adds win/loss entry for related opportunity

### Journey 3: Create and Publish a Messaging Matrix

1. Selects program "Full-Stack Web Development Bootcamp"
2. Identifies personas: Career Switcher, Recent Grad, IT Pro, Corporate Client
3. Maps stages: Awareness, Consideration, Decision, Onboarding, Retention, Advocacy
4. Fills Awareness > Career Switcher: "Launch a new career in tech in 12 weeks. No experience needed."
5. Fills Consideration > Corporate Client: "Upskill your team with our corporate training program. Volume discounts available."
6. Validates each cell references proof points from positioning doc
7. Publishes matrix -> available for copywriters and campaign managers

## 8. Business Rules Engine

| Rule ID   | Description                                             | Priority | Message                                                         |
| --------- | ------------------------------------------------------- | -------- | --------------------------------------------------------------- |
| PM-BR-001 | GTM plan must have launch date in the future            | Error    | "Launch date must be at least 2 weeks from today."              |
| PM-BR-002 | Positioning statement requires all 7 fields             | Error    | "Complete all positioning statement fields before publishing."  |
| PM-BR-003 | Messaging hierarchy requires at least 3 pillars         | Warning  | "Consider defining at least 3 messaging pillars."               |
| PM-BR-004 | Battle card must reference an active competitor         | Error    | "Competitor must exist before creating a battle card."          |
| PM-BR-005 | Win/loss reason required when outcome is lost           | Error    | "Specify the reason for losing this deal."                      |
| PM-BR-006 | Research with no key findings cannot be published       | Warning  | "Add key findings before publishing."                           |
| PM-BR-007 | GTM plan phases must be completed sequentially          | Info     | "Complete Phase {n} before starting Phase {n+1}."               |
| PM-BR-008 | Campaign brief over $10K requires director approval     | Error    | "Campaigns over $10K require Director of Marketing approval."   |
| PM-BR-009 | Launch date within 2 weeks of another major launch      | Warning  | "Another launch is scheduled within 2 weeks of this date."      |
| PM-BR-010 | Published positioning is immutable                      | Error    | "Published positioning cannot be edited. Create a new version." |
| PM-BR-011 | Competitor needs at least one offering                  | Warning  | "Add at least one offering to this competitor profile."         |
| PM-BR-012 | Messaging matrix needs 50%+ cells filled before publish | Warning  | "Publish requires at least 50% of cells to have content."       |

## 9. Notification Specifications

| Trigger Event                         | Channel                       | Template Variables                                                   | Delivery Rules                                       |
| ------------------------------------- | ----------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------- |
| GTM plan task assigned                | In-app, Email                 | `{{task_title}}`, `{{plan_name}}`, `{{due_date}}`, `{{assigned_by}}` | Immediate                                            |
| GTM plan milestone overdue            | In-app, Email                 | `{{milestone_title}}`, `{{plan_name}}`, `{{days_overdue}}`           | Daily until resolved                                 |
| Positioning published                 | In-app                        | `{{program_name}}`, `{{version}}`                                    | To marketing team                                    |
| Competitor alert detected             | In-app, Email (critical only) | `{{competitor_name}}`, `{{alert_type}}`, `{{severity}}`              | Immediate for high/critical, daily digest for others |
| Win/loss entry added                  | In-app                        | `{{opportunity_name}}`, `{{result}}`, `{{competitor}}`               | To PMM only                                          |
| Campaign brief submitted for approval | In-app, Email                 | `{{brief_name}}`, `{{submitted_by}}`, `{{budget}}`                   | To required approvers                                |
| Campaign brief approved               | In-app                        | `{{brief_name}}`, `{{approved_by}}`                                  | To brief creator                                     |
| Launch date approaching (7 days)      | In-app, Email                 | `{{program_name}}`, `{{launch_date}}`, `{{incomplete_tasks}}`        | 7 days before launch                                 |
| Launch completed                      | In-app                        | `{{program_name}}`                                                   | To all stakeholders                                  |
| Research published                    | In-app                        | `{{title}}`, `{{type}}`                                              | To product marketing team                            |
| Messaging matrix published            | In-app                        | `{{program_name}}`                                                   | To content team                                      |

## 10. Permission Matrix

| Entity             | Action      | PMM | Dir of Marketing | Copywriter   | Marketing Officer | Admin |
| ------------------ | ----------- | --- | ---------------- | ------------ | ----------------- | ----- |
| pmGtmPlans         | Create/Edit | ✓   | ✓                | -            | -                 | ✓     |
| pmGtmPlans         | Delete      | -   | ✓                | -            | -                 | ✓     |
| pmGtmPlans         | View        | ✓   | ✓                | ✓ (assigned) | ✓                 | ✓     |
| pmPositioning      | Create/Edit | ✓   | ✓                | -            | -                 | ✓     |
| pmPositioning      | Publish     | -   | ✓                | -            | -                 | ✓     |
| pmPositioning      | View        | ✓   | ✓                | ✓            | ✓                 | ✓     |
| pmCompetitors      | Full CRUD   | ✓   | ✓                | -            | ✓                 | ✓     |
| pmCompetitorAlerts | Acknowledge | ✓   | ✓                | -            | ✓                 | ✓     |
| pmWinLoss          | Create/View | ✓   | ✓                | -            | -                 | ✓     |
| pmBattleCards      | Full CRUD   | ✓   | ✓                | -            | -                 | ✓     |
| pmResearch         | Create/Edit | ✓   | ✓                | -            | ✓                 | ✓     |
| pmResearch         | Publish     | ✓   | ✓                | -            | ✓                 | ✓     |
| pmMessagingMatrix  | Edit        | ✓   | ✓                | -            | ✓                 | ✓     |
| pmMessagingMatrix  | Publish     | ✓   | ✓                | -            | -                 | ✓     |
| pmCampaignBriefs   | Create/Edit | ✓   | ✓                | -            | ✓                 | ✓     |
| pmCampaignBriefs   | Approve     | -   | ✓                | -            | -                 | ✓     |
| pmAnalytics        | View        | ✓   | ✓                | ✓            | ✓                 | ✓     |
| pmAnalytics        | Export      | ✓   | ✓                | ✓            | ✓                 | ✓     |

## 11. State Management

### Redux Slice: `productMarketingSlice`

```typescript
interface ProductMarketingState {
  gtmPlans: {
    items: GtmPlan[];
    current: GtmPlan | null;
    loading: boolean;
    error: string | null;
  };
  positioning: {
    current: Positioning | null;
    loading: boolean;
    saving: boolean;
    versions: PositioningVersion[];
  };
  competitors: {
    items: Competitor[];
    current: Competitor | null;
    loading: boolean;
    alerts: CompetitiveAlert[];
  };
  winLoss: {
    items: WinLossEntry[];
    summary: WinLossSummary | null;
    loading: boolean;
  };
  research: {
    items: Research[];
    current: Research | null;
    loading: boolean;
  };
  messaging: {
    matrix: MessagingMatrix | null;
    loading: boolean;
  };
  briefs: {
    items: CampaignBrief[];
    current: CampaignBrief | null;
    loading: boolean;
  };
  analytics: {
    programs: ProgramPerformance[];
    launchImpact: LaunchImpact | null;
    loading: boolean;
  };
  calendar: {
    launches: LaunchCalendarEntry[];
    milestones: Milestone[];
    loading: boolean;
  };
}
```

### RTK Query Endpoints

- `getGtmPlans` - cache 60s
- `getGtmPlan` - cache 120s
- `getPositioning` - cache 300s
- `getCompetitors` - cache 120s
- `getCompetitiveAlerts` - cache 30s (polling)
- `getWinLossSummary` - cache 300s
- `getResearch` - cache 300s
- `getMessagingMatrix` - cache 300s
- `getCampaignBriefs` - cache 60s
- `getAnalyticsPrograms` - cache 600s
- `getLaunchCalendar` - cache 300s

### Optimistic Updates

- Task status toggle in GTM plan -> immediate UI update, rollback on error
- Competitor alert acknowledge -> immediate badge update
- Brief status transitions -> immediate status change

## 12. Form Schemas (Zod)

```typescript
import { z } from "zod";

export const createGtmPlanSchema = z.object({
  name: z.string().min(1, "Plan name is required").max(255),
  programId: z.string().uuid("Program is required"),
  launchDate: z.string().datetime("Valid date is required"),
  description: z.string().max(2000).optional(),
});

export const createGtmTaskSchema = z.object({
  title: z.string().min(1, "Task title is required").max(255),
  phaseIndex: z.number().int().min(0).max(4),
  assigneeId: z.string().uuid().optional().nullable(),
  dueDate: z.string().datetime().optional().nullable(),
  description: z.string().max(2000).optional(),
});

export const updatePositioningSchema = z.object({
  targetCustomer: z.string().max(2000).optional(),
  customerNeed: z.string().max(2000).optional(),
  category: z.enum(["bootcamp", "course", "certification", "workshop", "service"]).optional(),
  keyBenefit: z.string().max(2000).optional(),
  competitiveAlternative: z.string().max(2000).optional(),
  uniqueDifferentiator: z.string().max(2000).optional(),
  valueProposition: z.string().max(300).optional(),
  messagingPillars: z
    .array(
      z.object({
        title: z.string().max(255),
        description: z.string().max(2000),
        proofPoints: z.array(z.string().max(500)).max(20),
        featureBenefits: z
          .array(
            z.object({
              feature: z.string().max(255),
              benefit: z.string().max(500),
              proof: z.string().max(500),
            }),
          )
          .max(10),
      }),
    )
    .min(3)
    .max(5)
    .optional(),
  personaIds: z.array(z.string().uuid()).optional(),
});

export const createCompetitorSchema = z.object({
  name: z.string().min(1, "Competitor name is required").max(255),
  website: z.string().url().optional().or(z.literal("")),
  logoUrl: z.string().url().optional().or(z.literal("")),
  hqLocation: z.string().max(200).optional(),
  foundedYear: z.number().int().min(1900).max(2030).optional(),
  tagline: z.string().max(255).optional(),
  strengths: z.array(z.string().max(500)).max(20).optional(),
  weaknesses: z.array(z.string().max(500)).max(20).optional(),
  scorecard: z
    .object({
      productQuality: z.number().min(1).max(5).optional(),
      pricing: z.number().min(1).max(5).optional(),
      brandStrength: z.number().min(1).max(5).optional(),
      marketShare: z.number().min(1).max(5).optional(),
      innovation: z.number().min(1).max(5).optional(),
    })
    .optional(),
});

export const createWinLossSchema = z.object({
  opportunityName: z.string().min(1, "Opportunity name is required").max(255),
  prospectName: z.string().max(255).optional(),
  competitorId: z.string().uuid().optional().nullable(),
  programId: z.string().uuid().optional().nullable(),
  result: z.enum(["won", "lost"]),
  dealValue: z.number().positive().optional(),
  reason: z.string().max(100).optional(),
  reasonNotes: z.string().max(2000).optional(),
  salesRepId: z.string().uuid().optional(),
});

export const createResearchSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  type: z.enum([
    "survey",
    "analyst_report",
    "internal_study",
    "industry_data",
    "competitive_intel",
    "trend_analysis",
  ]),
  executiveSummary: z.string().max(10000).optional(),
  methodology: z.string().max(5000).optional(),
  keyFindings: z.array(z.string().max(1000)).max(20).optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
  programIds: z.array(z.string().uuid()).optional(),
});

export const createCampaignBriefSchema = z.object({
  name: z.string().min(1, "Brief name is required").max(255),
  programId: z.string().uuid().optional().nullable(),
  campaignType: z.enum([
    "launch",
    "awareness",
    "consideration",
    "conversion",
    "retention",
    "event",
  ]),
  budget: z.number().positive().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  primaryPersonaId: z.string().uuid().optional().nullable(),
  channels: z
    .array(
      z.enum([
        "email",
        "social",
        "paid_search",
        "display",
        "content",
        "events",
        "direct_mail",
        "sms",
      ]),
    )
    .min(1),
  primaryKpi: z.string().max(100).optional(),
  valueProposition: z.string().max(500).optional(),
  keyMessage: z.string().max(1000).optional(),
  callToAction: z.string().max(255).optional(),
  tone: z.string().max(50).optional(),
});

export const updateBattleCardSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  content: z
    .object({
      objections: z
        .array(
          z.object({
            objection: z.string().max(500),
            response: z.string().max(2000),
          }),
        )
        .max(20)
        .optional(),
      differentiators: z.array(z.string().max(500)).max(10).optional(),
      proofPoints: z.array(z.string().max(500)).max(10).optional(),
      winNotes: z.string().max(2000).optional(),
    })
    .optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
});

export const createMessagingCellSchema = z.object({
  personaId: z.string().uuid(),
  stageId: z.string().uuid(),
  headline: z.string().max(200).optional(),
  supportingMessage: z.string().max(500).optional(),
  tone: z.string().max(50).optional(),
  channelPriority: z.array(z.string()).max(8).optional(),
  proofPoint: z.string().max(500).optional(),
  cta: z.string().max(200).optional(),
  status: z.enum(["draft", "approved", "needs_review"]).optional(),
});
```

## 13. Analytics Events

| Event                            | Properties                                       | Destination |
| -------------------------------- | ------------------------------------------------ | ----------- |
| pm_gtm_plan_created              | `{ planId, programId, launchDate }`              | PostHog     |
| pm_gtm_plan_launched             | `{ planId, programId, totalPhases, totalTasks }` | PostHog     |
| pm_gtm_task_completed            | `{ taskId, planId, phaseIndex }`                 | PostHog     |
| pm_positioning_saved             | `{ programId, version }`                         | PostHog     |
| pm_positioning_published         | `{ programId, version }`                         | PostHog     |
| pm_competitor_added              | `{ competitorId, name }`                         | PostHog     |
| pm_competitor_alert_acknowledged | `{ alertId, competitorId, severity }`            | PostHog     |
| pm_win_loss_entry_created        | `{ result, competitorId? }`                      | PostHog     |
| pm_battle_card_created           | `{ cardId, competitorId, programId }`            | PostHog     |
| pm_research_created              | `{ researchId, type }`                           | PostHog     |
| pm_messaging_matrix_published    | `{ programId, filledCells, totalCells }`         | PostHog     |
| pm_campaign_brief_submitted      | `{ briefId, campaignType, budget }`              | PostHog     |
| pm_campaign_brief_approved       | `{ briefId, campaignType }`                      | PostHog     |
| pm_analytics_exported            | `{ format, reportType }`                         | PostHog     |

## 14. Accessibility Requirements

| Requirement                   | Implementation                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Gantt/calendar view           | Full keyboard navigation (arrow keys move between dates, Space to select), `role="grid"`, `aria-label` on each launch bar |
| Drag-and-drop task reorder    | Keyboard reorder via Alt+Up/Down arrows, `role="listbox"`, `aria-grabbed`                                                 |
| Positioning statement builder | Form fields with proper labels, `aria-describedby` for help text, `role="form"`                                           |
| Messaging matrix              | `role="grid"`, `aria-label` per cell, `aria-readonly` when published                                                      |
| Competitive scorecard         | Accessible star ratings with text fallback, `aria-label="Rating: 4 out of 5"`                                             |
| Charts & visualizations       | Data tables below charts as screen reader fallback, `aria-hidden="true"` on decorative SVG                                |
| Calendar launch bars          | `role="region"`, `aria-label="Launch timeline"`, `aria-live="polite"` on view changes                                     |
| Campaign brief form           | Step indicator `aria-label="Step 2 of 7: Audience"`, error summary with `role="alert"`                                    |
| Interactive tables            | Sortable headers with `aria-sort`, `role="columnheader"`, `aria-label="Sort by [column]"`                                 |
| Color meaning                 | Never color alone for status — use icons + text + color, `aria-label="Status: Launched"`                                  |
| Focus management              | Tab order follows visual order, skip link to main content, focus trap in modals                                           |
| Keyboard shortcuts            | Global shortcuts: `?` opens shortcut help, `g` then `t` for GTM Planner, `g` then `p` for Positioning                     |

## 15. Error & Edge Case Catalog

| Code       | Scenario                                     | Response                  | User Message                                                            | Recovery                      |
| ---------- | -------------------------------------------- | ------------------------- | ----------------------------------------------------------------------- | ----------------------------- |
| PM-ERR-001 | GTM plan save fails                          | Content preserved locally | "Could not save plan. Local copy saved. [Retry]"                        | Auto-retry on reconnect       |
| PM-ERR-002 | Positioning version conflict                 | Server returns 409        | "Positioning was updated by another user. [Reload]"                     | Reload to get latest          |
| PM-ERR-003 | Competitor data fetch fails                  | Show stale cache          | "Could not load competitor data. Showing cached version. [Retry]"       | Manual retry                  |
| PM-ERR-004 | Launch date set in past                      | Front-end validation      | "Launch date must be in the future."                                    | Pick a future date            |
| PM-ERR-005 | Calendar too many launches in view           | Server paginates          | "Showing X of Y launches. [Load more]"                                  | Infinite scroll or pagination |
| PM-ERR-006 | Research file upload fails                   | Validation error          | "File must be CSV or Excel. Max size 50MB."                             | Re-upload valid file          |
| PM-ERR-007 | Campaign brief budget exceeds limit          | Validation error          | "Budget over $10K requires Director approval. Add required approver."   | Add director to approvers     |
| PM-ERR-008 | Messaging matrix save with invalid persona   | Validation error          | "Persona '#name' no longer exists. Select a different persona."         | Re-select persona             |
| PM-ERR-009 | Battle card PDF export fails                 | Server error              | "Could not export battle card. [Retry]"                                 | Retry or download as text     |
| PM-ERR-010 | Competitive intel sync (RSS) fails           | Partial failure           | "Alert feed partially loaded. Some sources are unavailable."            | Retry failed sources          |
| PM-ERR-011 | Analytics program data not yet available     | Empty state               | "Analytics for newly launched programs may take 24 hours to appear."    | Check back later              |
| PM-ERR-012 | Win/loss entry references deleted competitor | Soft reference warning    | "Referenced competitor may have been removed. Data preserved."          | Update entry or ignore        |
| PM-ERR-013 | Duplicate GTM plan name                      | Validation error          | "A GTM plan with this name already exists for this program."            | Use a different name          |
| PM-ERR-014 | Browser tab close with unsaved positioning   | beforeunload warning      | "You have unsaved changes in positioning document."                     | Cancel or confirm leave       |
| PM-ERR-015 | Launch calendar ICS export > 100 events      | Async export job          | "Exporting large calendar. You will receive a download link via email." | Wait for email                |
