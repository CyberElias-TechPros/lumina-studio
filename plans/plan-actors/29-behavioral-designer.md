# Actor: Behavioral Designer

## 1. Identity & Role Definition

**Actor ID:** `behavioral_designer`
**Display Name:** Behavioral Designer
**Description:** Applies behavioral science (nudge theory, habit formation, motivation design, loss aversion, commitment devices, social proof, gamification) to improve student engagement, course completion rates, learning outcomes, and platform adoption across all Cyber Elias Academy programs.
**System Role:** `behavioral_designer`
**Hierarchy:** Reports to VP of Learning / Director of Product
**Location:** Web dashboard only
**Session Timeout:** 45 minutes of inactivity
**Concurrent Sessions:** 3 max

## 2. Primary Goals & Success KPIs

| Goal                               | KPI                                             | Target                  |
| ---------------------------------- | ----------------------------------------------- | ----------------------- |
| Improve course completion          | Course completion rate                          | > 75% (baseline 40-50%) |
| Increase daily active users        | DAU/MAU ratio                                   | > 40%                   |
| Boost learning habit formation     | Average sessions per user per week              | > 4                     |
| Reduce dropout                     | Dropout rate at each module                     | < 10%                   |
| Increase engagement depth          | Average time-on-platform per session            | > 25 min                |
| Improve intervention effectiveness | Conversion rate of behavioral nudges            | > 20%                   |
| Increase commitment follow-through | Commitment device completion rate               | > 80%                   |
| Social accountability engagement   | Study group / peer accountability participation | > 35% of active users   |

## 3. Complete Screen Inventory

### 3.1 Behavioral Design Hub (`/behavioral-design`)

**Wireframe:** Central dashboard with key engagement metrics, active interventions status, nudge campaign performance, and funnel dropout alerts.

**UI Fields/Components:**

- **Header:** "Behavioral Design Hub" with breadcrumb
- **KPI Cards Row:** Course Completion Rate, DAU/MAU Ratio, Active Interventions, Avg Sessions/User/Week, Nudge Conversion Rate
- **Funnel Dropout Alerts:** Pipeline visualization showing where students drop off most (e.g., Module 2 of course X has 45% dropout) with "Create Intervention" CTA
- **Active Interventions Status:** Table of currently running nudges/commitment devices with name, type, target metric, start date, current lift, status (Active / Paused / Completed)
- **Habit Formation Score (per cohort):** Weekly trend chart of habit strength score
- **Quick Actions:** "New Nudge Campaign", "New Intervention", "Design Flow", "View Segments", "A/B Test"

**Data Bindings:**

- `GET /api/behavioral-design/dashboard/summary`
- `GET /api/behavioral-design/dashboard/funnel-alerts`
- `GET /api/behavioral-design/dashboard/active-interventions`

**States:**

| State   | Behavior                                                                                          |
| ------- | ------------------------------------------------------------------------------------------------- |
| Loading | KPI skeleton cards + chart shimmer                                                                |
| Empty   | "Welcome to Behavioral Design Hub. Create your first intervention to start improving engagement." |
| Error   | "Could not load dashboard. [Retry]"                                                               |

### 3.2 Behavioral Intervention Library (`/behavioral-design/interventions`)

**Wireframe:** Searchable, filterable library of all behavioral interventions with type taxonomy, effectiveness ratings, tags, and duplicate/create-from-template.

**UI Fields/Components:**

- **Search & Filter Bar:** Full-text search, Type filter (Nudge / Commitment Device / Habit Trigger / Social Accountability / Gamification / Loss Aversion / Scarcity / Framing / Anchoring), Status (Active / Draft / Archived), Target behavior (Course Completion / Daily Login / Assignment Submission / Community Participation / Review Completion / Payment), Effectiveness rating (1-5), Tags, Date range
- **Intervention Cards (grid):** Name, Type icon, Short description, Target behavior tag, Effectiveness rating (stars), Status badge, Lift percentage (if tested), Last used date
- **Intervention Detail (`/behavioral-design/interventions/{id}`):**
  - **Overview:** Name, Type, Description of behavioral mechanism, Target outcome, Status
  - **Design Details:**
    - Behavioral technique(s) used (multi-select from taxonomy: Nudge/Default/Reciprocity/Scarcity/Social Proof/Authority/Liking/Commitment/Consistency/Loss Aversion/Habit Stacking/Temptation Bundling/Implementation Intention)
    - Trigger condition (what event/condition triggers the intervention)
    - Action/Message content (the actual nudge copy, UI element, or flow)
    - Timing rules (when does this fire — immediately / delay X hours / at specific time / on specific event)
    - Frequency cap (max X times per user per day/week)
    - Audience targeting (segment rules)
  - **Performance Metrics:** Total exposed, Total converted, Conversion rate, Lift vs control, Statistical significance, A/B test history
  - **Version History:** Previous versions with changelog
  - **Clone/Copy button:** Create new intervention from this template
- **"New Intervention" button:** Opens creation wizard

**Data Bindings:**

- `GET /api/behavioral-design/interventions`
- `POST /api/behavioral-design/interventions`
- `GET /api/behavioral-design/interventions/{id}`
- `PUT /api/behavioral-design/interventions/{id}`
- `POST /api/behavioral-design/interventions/{id}/clone`

**States:**

| State      | Behavior                                                                    |
| ---------- | --------------------------------------------------------------------------- |
| Loading    | Card grid skeleton                                                          |
| Empty      | "Intervention library is empty. Design your first behavioral intervention." |
| No results | "No interventions match your filters. [Clear filters]"                      |

### 3.3 Engagement Flow Designer (`/behavioral-design/flow-designer`)

**Wireframe:** Visual drag-and-drop flowchart designer for building multi-step engagement flows with behavioral triggers, actions, conditions, branching, and timing.

**UI Fields/Components:**

- **Canvas (center):** Drag-and-drop flowchart editor
  - Node palette (right sidebar): Trigger nodes, Action nodes, Condition/Branch nodes, Delay nodes, Goal nodes
  - Trigger nodes: Login, Course Start, Module Complete, Quiz Fail, Quiz Pass, Session End, Payment, Enrollment Anniversary, Inactivity X days, Milestone Reached, Custom Event
  - Action nodes: Send Notification (in-app/push/email), Show UI Component (banner/modal/tooltip/badge/progress bar), Update Gamification (award points/badge/unlock), Trigger Email Sequence, Update Profile Field, Add to Segment
  - Condition/Branch nodes: If/Then/Else based on user attributes, behavior history, segment membership, A/B test variant
  - Delay nodes: Wait X minutes/hours/days, Wait until specific time/day, Wait for event
  - Goal nodes: Define desired outcome (complete course / submit assignment / X sessions / Y days streak)
- **Node Configuration Panel (opens on click):** Sidebar with form fields specific to node type
- **Flow Settings (top bar):** Flow name, Status (Draft / Active / Paused / Archived), Start/End dates, Entry criteria, Exit criteria, Max participants
- **Validation:** Auto-check for unreachable nodes, infinite loops, missing required fields
- **Save / Activate / Pause buttons**
- **Version history:** Timeline of flow edits

**Data Bindings:**

- `GET /api/behavioral-design/flows`
- `POST /api/behavioral-design/flows`
- `GET /api/behavioral-design/flows/{id}`
- `PUT /api/behavioral-design/flows/{id}`
- `POST /api/behavioral-design/flows/{id}/activate`
- `POST /api/behavioral-design/flows/{id}/pause`

**States:**

| State            | Behavior                                                                |
| ---------------- | ----------------------------------------------------------------------- |
| Loading          | Canvas skeleton with node palette                                       |
| Empty flow       | "Start building your flow by dragging a trigger node onto the canvas."  |
| Validation error | Red node border + tooltip with specific error                           |
| Cycle detected   | Warning banner: "Flow contains a cycle. This may cause infinite loops." |

### 3.4 Nudge Campaign Builder (`/behavioral-design/nudge-campaigns`)

**Wireframe:** Campaign management for scheduled/triggered nudge messages across channels (in-app, push, email, SMS) with targeting, scheduling, content editor, and performance tracking.

**UI Fields/Components:**

- **Campaign List (table):** Name, Nudge type, Channel, Status, Runs (total triggered), Conversion rate, Lift, Last run
- **Campaign Builder (wizard):**
  - **Step 1 — Setup:** Name, Nudge type (Motivation / Reminder / Social Proof / Scarcity / Loss Aversion / Feedback / Personalization), Channel(s), Campaign goal (select target behavior)
  - **Step 2 — Content:** Message editor with WYSIWYG (in-app banner/popup/tooltip) or text editor (push/email/SMS), Variable insertion (student name, course name, progress, days remaining, etc.), Multiple variants for A/B testing
  - **Step 3 — Targeting:** Segment selection (from user segments), Specific courses/programs, Behavioral conditions (e.g., "has not logged in for 5 days", "at risk of dropping out", "completed module X")
  - **Step 4 — Schedule:** Run once vs recurring, Start/end dates, Timezone, Frequency cap, Cool-down period
  - **Step 5 — Review & Launch:** Summary, estimated reach, "Save Draft" / "Launch Now" / "Schedule"
- **Performance Tab (per campaign):** Exposed, Converted, Conversion rate, Lift vs control, Statistics (chi-squared, confidence), Channel breakdown, Timeline chart

**Data Bindings:**

- `GET /api/behavioral-design/nudge-campaigns`
- `POST /api/behavioral-design/nudge-campaigns`
- `GET /api/behavioral-design/nudge-campaigns/{id}`
- `PUT /api/behavioral-design/nudge-campaigns/{id}`
- `POST /api/behavioral-design/nudge-campaigns/{id}/launch`
- `POST /api/behavioral-design/nudge-campaigns/{id}/pause`

**States:**

| State          | Behavior                                                      |
| -------------- | ------------------------------------------------------------- |
| Loading        | Table skeleton                                                |
| Empty          | "No nudge campaigns yet. Create your first behavioral nudge." |
| Campaign ended | "Campaign completed on {date}. {metric}% lift achieved."      |

### 3.5 A/B Test Designer (Behavioral) (`/behavioral-design/ab-tests`)

**Wireframe:** A/B/n test builder specialized for behavioral interventions — test nudge variants, timing, framing, channel, and frequency with behavioral metrics as success criteria.

**UI Fields/Components:**

- **Test List (table):** Name, Hypothesis, Target metric, Variants (count), Status, Sample size, Significance, Winner
- **Test Builder:**
  - **Hypothesis:** "If we [intervention] for [user segment], then [metric] will improve by [X%] because [behavioral rationale]."
  - **Variants:** Control (no intervention), Variant A, B, C (different nudge content, timing, channel, framing)
  - **Target Metric Selection:** Course completion rate / Session frequency / Assignment submission rate / Time-on-task / Streak length / Social engagement / Revenue
  - **Sample Size Calculator:** Input baseline rate, minimum detectable effect, significance threshold -> calculates required sample per variant
  - **Traffic Allocation:** Auto (equal) or manual (custom percentages)
  - **Duration:** Fixed end date or "run until significance reached" (auto-stop)
  - **Segment Targeting:** Optional — restrict to specific user segment
- **Results View:** Per variant comparison, cumulative chart, Bayesian probability of being best, expected loss
- **Decision:** "Declare Winner", "Stop Test", "Apply to All Users"

**Data Bindings:**

- `GET /api/behavioral-design/ab-tests`
- `POST /api/behavioral-design/ab-tests`
- `GET /api/behavioral-design/ab-tests/{id}`
- `POST /api/behavioral-design/ab-tests/{id}/start`
- `POST /api/behavioral-design/ab-tests/{id}/stop`
- `POST /api/behavioral-design/ab-tests/{id}/declare-winner`

**States:**

| State                          | Behavior                                                                 |
| ------------------------------ | ------------------------------------------------------------------------ |
| Loading                        | Test list skeleton                                                       |
| Empty                          | "No behavioral A/B tests created. Test your first nudge."                |
| Running (significance reached) | Green banner: "Significance reached! [Declare Winner]"                   |
| Running (inconclusive)         | Yellow banner: "Test still running. Estimated {X} more days needed."     |
| Auto-stopped                   | "Test auto-stopped. Winning variant: {variant} with {conf}% confidence." |

### 3.6 Funnel Analysis Dashboard (`/behavioral-design/funnels`)

**Wireframe:** Behavioral funnel analysis showing user progression through key journeys with dropout rates, intervention impact overlays, and segment comparisons.

**UI Fields/Components:**

- **Funnel Selector:** Pre-built funnels (Course Enrollment to Completion / Free Trial to Paid / First Login to Habit Formation / Module Progression / Assignment Workflow / Community Onboarding)
- **Funnel Visualization (horizontal bar chart):** Each stage as a bar showing remaining users, dropout count, dropout percentage between stages
- **Intervention Impact Overlay:** Toggle on/off to show where active interventions are placed in the funnel and their measured lift at each stage
- **Segment Comparison:** Overlay multiple segments (e.g., with intervention vs without, by course type, by cohort)
- **Funnel Settings:** Date range, Segment filter, Course/program filter, Event-based funnels (custom event sequences)
- **Export:** "Export Funnel Data" as CSV

**Data Bindings:**

- `GET /api/behavioral-design/funnels/{funnelId}`
- `GET /api/behavioral-design/funnels/{funnelId}/segments`

**States:**

| State              | Behavior                                    |
| ------------------ | ------------------------------------------- |
| Loading            | Funnel chart skeleton                       |
| No data            | "Select a funnel to view progression data." |
| Segment comparison | Dual funnel bars side by side               |

### 3.7 Habit Tracker (`/behavioral-design/habits`)

**Wireframe:** Dashboard tracking habit formation metrics — streak lengths, habit strength scores, adoption curves, and habit-related interventions.

**UI Fields/Components:**

- **Habit Overview KPIs:** Average Streak Length, Habit Strength Index (composite), % Users in "Automatic" phase, Active Habits Tracked
- **Habit Strength Curve:** Chart showing users progressing through habit formation phases (Conscious -> Action -> Maintenance -> Automatic) over time
- **Streak Distribution:** Histogram of current streak lengths across all users
- **Per-Habit Detail (expandable):** Habit name (e.g., "Daily login", "Complete one lesson per day", "Post in forum weekly"), Target behavior, Users enrolled, Avg streak, Success rate, Associated interventions
- **Habit Adoption Curve:** Cumulative adoption of target habit over days since enrollment
- **Intervention Association:** Which interventions are driving which habits (table with lift data)
- **"Create Habit Intervention" button:** Quick-create from habit tracker

**Data Bindings:**

- `GET /api/behavioral-design/habits/summary`
- `GET /api/behavioral-design/habits/curves`
- `GET /api/behavioral-design/habits/streak-distribution`

**States:**

| State     | Behavior                                                              |
| --------- | --------------------------------------------------------------------- |
| Loading   | KPI skeletons                                                         |
| No habits | "No habits tracked. Define key behaviors to measure habit formation." |

### 3.8 Intervention Analytics (`/behavioral-design/analytics`)

**Wireframe:** Comprehensive analytics dashboard for all behavioral interventions — aggregate performance, compare by type, channel, segment, and time.

**UI Fields/Components:**

- **Date Range Selector**
- **KPI Row:** Total Interventions Run, Total Users Exposed, Avg Conversion Rate, Avg Lift, Total Impact (attributed completions/revenue)
- **Performance by Type:** Bar chart showing conversion rate by intervention type (Nudge / Commitment / Gamification / Social / Loss Aversion)
- **Performance by Channel:** Bar chart showing conversion rate by channel (In-app / Push / Email / SMS / UI Component)
- **Top 10 Interventions:** Table — Name, Type, Exposed, Converted, Rate, Lift, Confidence
- **Impact Attribution:** Lift chart showing how interventions shifted key metrics over time
- **Segment Analysis:** Heatmap showing intervention effectiveness across user segments
- **Export:** "Export Report" as PDF/CSV

**Data Bindings:**

- `GET /api/behavioral-design/analytics/summary`
- `GET /api/behavioral-design/analytics/by-type`
- `GET /api/behavioral-design/analytics/by-channel`
- `GET /api/behavioral-design/analytics/top-interventions`
- `GET /api/behavioral-design/analytics/attribution`

**States:**

| State        | Behavior                                                    |
| ------------ | ----------------------------------------------------------- |
| Loading      | Multi-chart skeleton                                        |
| No data      | "Run interventions to see analytics data."                  |
| Partial data | "Data might be delayed up to 2 hours for real-time events." |

### 3.9 User Segment Explorer (`/behavioral-design/segments`)

**Wireframe:** Segment builder and explorer for defining behavioral user segments — by engagement patterns, risk status, habit phase, persona, and custom rules.

**UI Fields/Components:**

- **Segment List:** Name, Rule count, Estimated users, Last refreshed, Status
- **Segment Builder:**
  - **Rule groups (AND/OR nesting):**
    - Engagement rules: Last login (X days ago), Sessions (count in time period), Time on platform (total/avg), Courses enrolled, Courses completed
    - Behavioral rules: Streak length, Habit phase, Nudge response rate, Dropout risk score, Assignment submission rate, Quiz score avg
    - Demographic rules: Age range, Location, Device type, Language
    - Academic rules: Program enrolled, Module progress, Certificate earned
    - Custom rules: Any event count, attribute value, date range
  - **Preview:** Show estimated users matching, sample user table (name, email, matching rules)
  - **Save / Update buttons**
- **Segment Detail:** Name, Description, Rules (read-only view), User count, Last refreshed, "Export Users" CSV, "Use in Intervention" quick-create
- **Segmented Analytics:** Quick-view of key metrics for this segment (completion rate, avg streak, etc.)

**Data Bindings:**

- `GET /api/behavioral-design/segments`
- `POST /api/behavioral-design/segments`
- `GET /api/behavioral-design/segments/{id}`
- `PUT /api/behavioral-design/segments/{id}`
- `POST /api/behavioral-design/segments/{id}/estimate`
- `DELETE /api/behavioral-design/segments/{id}`

**States:**

| State                  | Behavior                                                            |
| ---------------------- | ------------------------------------------------------------------- |
| Loading                | Segment list skeleton                                               |
| Empty                  | "No custom segments created. Create your first behavioral segment." |
| Estimation in progress | "Estimating segment size..." with spinner                           |
| Estimate timeout       | "Segment estimation is taking longer than expected. [Retry]"        |

## 4. Full Database Schema

```typescript
// --- Behavioral Design Schema (bd_) ---

export const bdInterventions = pgTable('bd_interventions', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  type: varchar('type', { length: 50 }).notNull(), // nudge,commitment_device,habit_trigger,social_accountability,gamification,loss_aversion,scarcity,framing,anchoring
  targetBehavior: varchar('target_behavior', { length: 100 }), // course_completion,daily_login,assignment_submission,community_participation,review_completion,payment
  behavioralTechniques: text('behavioral_techniques').array(), // ['nudge','default','reciprocity','scarcity','social_proof',...]
  triggerCondition: jsonb('trigger_condition').default('{}'),
  actionConfig: jsonb('action_config').default('{}'),
  timingRules: jsonb('timing_rules').default('{}'),
  frequencyCap: integer('frequency_cap').default(1),
  frequencyCapUnit: varchar('frequency_cap_unit', { length: 20 }).default('day'),
  audienceRules: jsonb('audience_rules').default('{}'),
  status: varchar('status', { length: 30 }).default('draft'),
  effectivenessRating: integer('effectiveness_rating').default(0),
  totalExposed: integer('total_exposed').default(0),
  totalConverted: integer('total_converted').default(0),
  conversionRate: numeric('conversion_rate', { precision: 6, scale: 4 }),
  liftPercentage: numeric('lift_percentage', { precision: 6, scale: 2 }),
  tags: text('tags').array(),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bdInterventionVersions = pgTable('bd_intervention_versions', {
  id: uuid('id').defaultRandom().primaryKey(),
  interventionId: uuid('intervention_id').references(() => bdInterventions.id).notNull(),
  versionNumber: integer('version_number').notNull(),
  snapshot: jsonb('snapshot').notNull(),
  changeNotes: text('change_notes'),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const bdEngagementFlows = pgTable('bd_engagement_flows', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 30 }).default('draft'),
  nodes: jsonb('nodes').default('[]'),
  edges: jsonb('edges').default('[]'),
  entryCriteria: jsonb('entry_criteria').default('{}'),
  exitCriteria: jsonb('exit_criteria').default('{}'),
  maxParticipants: integer('max_participants'),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  totalEnrolled: integer('total_enrolled').default(0),
  totalCompleted: integer('total_completed').default(0),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bdNudgeCampaigns = pgTable('bd_nudge_campaigns', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  nudgeType: varchar('nudge_type', { length: 50 }).notNull(), // motivation,reminder,social_proof,scarcity,loss_aversion,feedback,personalization
  channel: varchar('channel', { length: 50 }).notNull(), // in_app,push,email,sms
  goal: varchar('goal', { length: 100 }),
  content: jsonb('content').default('{}'),
  variants: jsonb('variants').default('[]'),
  targetingRules: jsonb('targeting_rules').default('{}'),
  scheduleConfig: jsonb('schedule_config').default('{}'),
  status: varchar('status', { length: 30 }).default('draft'),
  totalExposed: integer('total_exposed').default(0),
  totalConverted: integer('total_converted').default(0),
  conversionRate: numeric('conversion_rate', { precision: 6, scale: 4 }),
  liftPercentage: numeric('lift_percentage', { precision: 6, scale: 2 }),
  confidenceLevel: numeric('confidence_level', { precision: 5, scale: 3 }),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bdABTests = pgTable('bd_ab_tests', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  hypothesis: text('hypothesis'),
  targetMetric: varchar('target_metric', { length: 100 }).notNull(),
  baselineRate: numeric('baseline_rate', { precision: 6, scale: 4 }),
  minimumDetectableEffect: numeric('minimum_detectable_effect', { precision: 4, scale: 2 }),
  significanceThreshold: numeric('significance_threshold', { precision: 4, scale: 3 }).default('0.95'),
  trafficAllocation: jsonb('traffic_allocation').default('{}'),
  durationType: varchar('duration_type', { length: 30 }).default('significance'), // fixed_date,significance
  durationDays: integer('duration_days'),
  segmentId: uuid('segment_id').references(() => bdSegments.id),
  status: varchar('status', { length: 30 }).default('draft'),
  startedAt: timestamp('started_at'),
  stoppedAt: timestamp('stopped_at'),
  winnerVariantId: uuid('winner_variant_id'),
  confidenceLevel: numeric('confidence_level', { precision: 5, scale: 3 }),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bdABTestVariants = pgTable('bd_ab_test_variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  testId: uuid('test_id').references(() => bdABTests.id).notNull(),
  label: varchar('label', { length: 10 }).notNull(),
  isControl: boolean('is_control').default(false),
  interventionConfig: jsonb('intervention_config').notNull(),
  sampleSize: integer('sample_size').default(0),
  conversions: integer('conversions').default(0),
  conversionRate: numeric('conversion_rate', { precision: 8, scale: 5 }),
  liftOverControl: numeric('lift_over_control', { precision: 6, scale: 2 }),
  probabilityBest: numeric('probability_best', { precision: 5, scale: 3 }),
});

export const bdSegments = pgTable('bd_segments', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  rules: jsonb('rules').default('{}'),
  estimatedUsers: integer('estimated_users'),
  status: varchar('status', { length: 30 }).default('active'),
  lastEstimatedAt: timestamp('last_estimated_at'),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bdHabits = pgTable('bd_habits', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  targetBehavior: varchar('target_behavior', { length: 100 }).notNull(),
  description: text('description'),
  targetFrequency: varchar('target_frequency', { length: 50 }), // daily, 3x_week, weekly
  targetCount: integer('target_count').default(1),
  successDefinition: text('success_definition'),
  associatedInterventionIds: uuid('associated_intervention_ids').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bdHabitTracking = pgTable('bd_habit_tracking', {
  id: uuid('id').defaultRandom().primaryKey(),
  habitId: uuid('habit_id').references(() => bdHabits.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  currentStreak: integer('current_streak').default(0),
  longestStreak: integer('longest_streak').default(0),
  totalCompletions: integer('total_completions').default(0),
  habitPhase: varchar('habit_phase', { length: 30 }).default('conscious'), // conscious,action,maintenance,automatic
  habitStrength: numeric('habit_strength', { precision: 4, scale: 2 }).default('0'),
  lastCompletedAt: timestamp('last_completed_at'),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bdInterventionExposures = pgTable('bd_intervention_exposures', {
  id: uuid('id').defaultRandom().primaryKey(),
  interventionId: uuid('intervention_id').references(() => bdInterventions.id).notNull(),
  campaignId: uuid('campaign_id').references(() => bdNudgeCampaigns.id),
  flowId: uuid('flow_id').references(() => bdEngagementFlows.id),
  userId: uuid('user_id').references(() => users.id).notNull(),
  exposedAt: timestamp('exposed_at').defaultNow().notNull(),
  variant: varchar('variant', { length: 10 }).default('A'),
  converted: boolean('converted').default(false),
  convertedAt: timestamp('converted_at'),
  metadata: jsonb('metadata').default('{}'),
});

CREATE INDEX idx_bd_interventions_type ON bd_interventions(type);
CREATE INDEX idx_bd_interventions_status ON bd_interventions(status);
CREATE INDEX idx_bd_interventions_target ON bd_interventions(target_behavior);
CREATE INDEX idx_bd_engagement_flows_status ON bd_engagement_flows(status);
CREATE INDEX idx_bd_nudge_campaigns_status ON bd_nudge_campaigns(status);
CREATE INDEX idx_bd_ab_tests_status ON bd_ab_tests(status);
CREATE INDEX idx_bd_exposures_user ON bd_intervention_exposures(user_id);
CREATE INDEX idx_bd_exposures_intervention ON bd_intervention_exposures(intervention_id);
CREATE INDEX idx_bd_habit_tracking_user ON bd_habit_tracking(user_id);
CREATE INDEX idx_bd_habit_tracking_phase ON bd_habit_tracking(habit_phase);
```

## 5. Complete API Contract

### Endpoints

```
GET    /api/v1/behavioral-design/interventions
POST   /api/v1/behavioral-design/interventions
GET    /api/v1/behavioral-design/interventions/{id}
PUT    /api/v1/behavioral-design/interventions/{id}
DELETE /api/v1/behavioral-design/interventions/{id}
POST   /api/v1/behavioral-design/interventions/{id}/clone

GET    /api/v1/behavioral-design/flows
POST   /api/v1/behavioral-design/flows
GET    /api/v1/behavioral-design/flows/{id}
PUT    /api/v1/behavioral-design/flows/{id}
DELETE /api/v1/behavioral-design/flows/{id}
POST   /api/v1/behavioral-design/flows/{id}/activate
POST   /api/v1/behavioral-design/flows/{id}/pause
POST   /api/v1/behavioral-design/flows/{id}/validate

GET    /api/v1/behavioral-design/nudge-campaigns
POST   /api/v1/behavioral-design/nudge-campaigns
GET    /api/v1/behavioral-design/nudge-campaigns/{id}
PUT    /api/v1/behavioral-design/nudge-campaigns/{id}
POST   /api/v1/behavioral-design/nudge-campaigns/{id}/launch
POST   /api/v1/behavioral-design/nudge-campaigns/{id}/pause

GET    /api/v1/behavioral-design/ab-tests
POST   /api/v1/behavioral-design/ab-tests
GET    /api/v1/behavioral-design/ab-tests/{id}
PUT    /api/v1/behavioral-design/ab-tests/{id}
POST   /api/v1/behavioral-design/ab-tests/{id}/start
POST   /api/v1/behavioral-design/ab-tests/{id}/stop
POST   /api/v1/behavioral-design/ab-tests/{id}/declare-winner
GET    /api/v1/behavioral-design/ab-tests/{id}/results

GET    /api/v1/behavioral-design/segments
POST   /api/v1/behavioral-design/segments
GET    /api/v1/behavioral-design/segments/{id}
PUT    /api/v1/behavioral-design/segments/{id}
DELETE /api/v1/behavioral-design/segments/{id}
POST   /api/v1/behavioral-design/segments/{id}/estimate

GET    /api/v1/behavioral-design/habits
POST   /api/v1/behavioral-design/habits
GET    /api/v1/behavioral-design/habits/summary
GET    /api/v1/behavioral-design/habits/curves
GET    /api/v1/behavioral-design/habits/streak-distribution

GET    /api/v1/behavioral-design/funnels
GET    /api/v1/behavioral-design/funnels/{id}
GET    /api/v1/behavioral-design/funnels/{id}/segments

GET    /api/v1/behavioral-design/analytics/summary
GET    /api/v1/behavioral-design/analytics/by-type
GET    /api/v1/behavioral-design/analytics/by-channel
GET    /api/v1/behavioral-design/analytics/top-interventions
GET    /api/v1/behavioral-design/analytics/attribution

GET    /api/v1/behavioral-design/dashboard/summary
GET    /api/v1/behavioral-design/dashboard/funnel-alerts
GET    /api/v1/behavioral-design/dashboard/active-interventions
```

**Types:**

```typescript
interface Intervention {
  id: string;
  name: string;
  description: string | null;
  type: string;
  targetBehavior: string | null;
  behavioralTechniques: string[];
  status: string;
  effectivenessRating: number;
  totalExposed: number;
  totalConverted: number;
  conversionRate: number | null;
  liftPercentage: number | null;
  tags: string[];
  createdAt: string;
}

interface EngagementFlow {
  id: string;
  name: string;
  status: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  totalEnrolled: number;
  totalCompleted: number;
}

interface FlowNode {
  id: string;
  type: "trigger" | "action" | "condition" | "delay" | "goal";
  config: Record<string, unknown>;
  position: { x: number; y: number };
}

interface FlowEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  label?: string;
  condition?: string;
}

interface NudgeCampaign {
  id: string;
  name: string;
  nudgeType: string;
  channel: string;
  goal: string | null;
  status: string;
  totalExposed: number;
  totalConverted: number;
  conversionRate: number | null;
  liftPercentage: number | null;
}

interface BDABTest {
  id: string;
  name: string;
  hypothesis: string | null;
  targetMetric: string;
  baselineRate: number | null;
  status: string;
  variants: BDABTestVariant[];
  confidenceLevel: number | null;
  winnerVariantId: string | null;
}

interface BDABTestVariant {
  id: string;
  label: string;
  isControl: boolean;
  sampleSize: number;
  conversions: number;
  conversionRate: number | null;
  liftOverControl: number | null;
  probabilityBest: number | null;
}

interface BDSegment {
  id: string;
  name: string;
  description: string | null;
  rules: Record<string, unknown>;
  estimatedUsers: number | null;
}
```

**Error Codes:**

| Code   | HTTP | Meaning                                           |
| ------ | ---- | ------------------------------------------------- |
| BD_001 | 400  | Invalid flow node configuration                   |
| BD_002 | 400  | Segment rule validation failed                    |
| BD_003 | 404  | Intervention not found                            |
| BD_004 | 409  | Flow validation error (cycles, unreachable nodes) |
| BD_005 | 422  | A/B test insufficient sample size target          |
| BD_006 | 422  | Nudge campaign missing content                    |
| BD_007 | 429  | Intervention frequency cap exceeded               |
| BD_008 | 500  | Exposure tracking write failure                   |

## 6. Component Tree

```
App
+-- BehavioralDesignModule
    +-- BDLayout (shell)
    |   +-- Sidebar (Dashboard, Interventions, Flows, Nudge Campaigns, A/B Tests, Funnels, Habits, Segments, Analytics)
    |   +-- Breadcrumb
    |
    +-- BDHub
    |   +-- KpiCards { items: KpiData[] }
    |   +-- FunnelAlertsWidget { alerts: FunnelAlert[] }
    |   +-- ActiveInterventionsTable { interventions: Intervention[] }
    |   +-- HabitScoreChart { cohort, score }
    |   +-- QuickActionBar
    |
    +-- InterventionLibrary
    |   +-- SearchFilterBar
    |   +-- InterventionGrid
    |   |   +-- InterventionCard { name, type, rating, status, lift, onSelect }
    |   +-- InterventionDetail
    |   |   +-- InterventionOverview
    |   |   +-- BehaviorTechniquesTags { techniques[] }
    |   |   +-- TriggerConfigEditor
    |   |   +-- ActionConfigEditor
    |   |   +-- TimingRulesEditor
    |   |   +-- FrequencyCapEditor
    |   |   +-- PerformanceMetrics { exposed, converted, rate, lift }
    |   |   +-- VersionHistory
    |   +-- NewInterventionWizard
    |       +-- StepTypeSelect
    |       +-- StepBehaviorConfig
    |       +-- StepTriggerConfig
    |       +-- StepActionConfig
    |       +-- StepTimingConfig
    |       +-- StepAudienceConfig
    |       +-- StepReview
    |
    +-- EngagementFlowDesigner
    |   +-- FlowToolbar { name, status, save, activate }
    |   +-- FlowCanvas
    |   |   +-- NodePalette { nodeTypes[] }
    |   |   +-- CanvasArea { nodes, edges }
    |   |   |   +-- TriggerNode { config }
    |   |   |   +-- ActionNode { config }
    |   |   |   +-- ConditionNode { branches }
    |   |   |   +-- DelayNode { duration }
    |   |   |   +-- GoalNode { target }
    |   |   +-- ValidationOverlay { errors[] }
    |   +-- NodeConfigPanel { nodeType, config, onUpdate }
    |   +-- FlowVersionHistory
    |
    +-- NudgeCampaignPage
    |   +-- CampaignList { table }
    |   |   +-- CampaignRow { name, type, channel, status, rate }
    |   +-- CampaignBuilderWizard
    |   |   +-- StepSetup
    |   |   +-- StepContentEditor
    |   |   |   +-- VariableInserter
    |   |   |   +-- VariantManager
    |   |   +-- StepTargeting
    |   |   +-- StepSchedule
    |   |   +-- StepReview
    |   +-- CampaignDetail
    |       +-- CampaignOverview
    |       +-- PerformanceTab
    |       |   +-- PerformanceChart
    |       |   +-- ChannelBreakdown
    |       +-- ExposuresTable
    |
    +-- BDABTestPage
    |   +-- TestList { table }
    |   +-- TestBuilder
    |   |   +-- HypothesisInput
    |   |   +-- VariantEditor { variants[], onUpdate }
    |   |   +-- MetricSelector
    |   |   +-- SampleSizeCalculator { baseline, mde, significance }
    |   |   +-- DurationConfig
    |   +-- TestResults
    |       +-- VariantComparisonTable
    |       +-- CumulativeChart
    |       +-- BayesianProbabilityDisplay
    |       +-- DecisionActions
    |
    +-- FunnelAnalysisPage
    |   +-- FunnelSelector
    |   +-- FunnelChart { stages[], dropoffs }
    |   +-- InterventionOverlay { toggle, interventions[] }
    |   +-- SegmentComparison { segments[], metrics }
    |
    +-- HabitTrackerPage
    |   +-- HabitKpiCards
    |   +-- HabitStrengthCurve { chart }
    |   +-- StreakDistribution { histogram }
    |   +-- HabitList
    |       +-- HabitDetail { name, streak, phase, interventions }
    |
    +-- BDSegmentExplorer
    |   +-- SegmentList
    |   +-- SegmentBuilder
    |   |   +-- RuleGroupEditor { rules, operator (AND/OR) }
    |   |   |   +-- RuleRow { field, operator, value }
    |   |   +-- SegmentPreview { estimatedUsers, sample[] }
    |   +-- SegmentDetail
    |       +-- SegmentOverview
    |       +-- SegmentAnalytics
    |
    +-- BDAnalyticsPage
        +-- DateRangeSelector
        +-- KpiRow
        +-- PerformanceByTypeChart
        +-- PerformanceByChannelChart
        +-- TopInterventionsTable
        +-- ImpactAttributionChart
        +-- SegmentEffectivenessHeatmap
```

## 7. Exhaustive User Journeys

### Journey 1: Design and Deploy a Dropout Prevention Nudge

1. Behavioral designer checks Funnel Analysis Dashboard and sees Module 2 of "Full-Stack Web Development" has 52% dropout rate
2. Clicks "Create Intervention" on the alert -> routed to Intervention Library new item
3. Names intervention "Module 2 Milestone Nudge", type = Nudge, target behavior = Course Completion
4. Behavioral technique: Social Proof + Scarcity ("87% of students who complete Module 2 finish the entire course")
5. Trigger: When student completes Module 1 (event-based)
6. Action: In-app banner with personalized message "Great job finishing Module 1! Did you know 87% of students who continue to Module 2 complete the full course? Keep your momentum going."
7. Timing: 24 hours after Module 1 completion, max 3 times per week
8. Saves as Draft
9. Opens Engagement Flow Designer, creates flow: Trigger (Module 1 Complete) -> Delay 24h -> Condition (has started Module 2? yes->goal; no->send nudge) -> Action (send nudge) -> Delay 48h -> Condition (started Module 2? yes->exit; no->send reminder) -> Action (send stronger nudge with loss aversion)
10. Activates flow -> system begins enrolling eligible students
11. After 2 weeks, checks performance: 28% lift in Module 2 start rate, 18% lift in overall completion

### Journey 2: Build Cross-Course Habit Formation Campaign

1. Goes to Habit Tracker, sees average daily login streak is only 3 days
2. Defines target habit: "Daily Login" -> target: login 5 out of 7 days per week
3. Creates a Commitment Device intervention: "7-Day Login Streak Challenge"
4. Action: At enrollment, user gets prompt "Commit to logging in daily for 7 days. If you miss a day, you lose your streak." (loss aversion + commitment)
5. Designs flow: Trigger (New Enrollment) -> Action (Show commitment prompt) -> Condition (accepted? yes->track habit; no->exit) -> Trigger (Daily Login) -> Track habit -> Condition (streak lost? yes->show "You lost your streak! Start again?" -> Action (Send recovery nudge))
6. Nudge campaign: Daily reminder push at 7pm for users who haven't logged in yet: "Your learning streak is on the line. One quick lesson keeps it alive."
7. After 30 days: Average streak increased from 3 to 8 days, DAU/MAU ratio up 22%

### Journey 3: A/B Test Framing for Payment Nudge

1. Hypothesis: "If we frame the annual plan as 'losing $200' vs 'saving $200', more users will choose annual"
2. Creates A/B test: Control (save framing), Variant A (loss aversion framing), Variant B (social proof framing)
3. Target metric: Annual plan selection rate
4. Sets minimum detectable effect: 5%, significance: 95%
5. Auto-calculates: 1,200 users per variant needed
6. Segment: Users viewing pricing page
7. Launches test, runs for 14 days
8. Result: Variant B (social proof) wins with 97% confidence, 12% lift over control
9. Declares winner, applies to all users

## 8. Business Rules Engine

| Rule ID   | Description                                                          | Priority | Message                                                                  |
| --------- | -------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------ |
| BD-BR-001 | Interventions must have at least one behavioral technique            | Error    | "Select at least one behavioral technique."                              |
| BD-BR-002 | Flow must have at least one trigger and one action node              | Error    | "Flow must contain at least one trigger and one action."                 |
| BD-BR-003 | Flow cannot contain cycles (validation enforced)                     | Error    | "Cycle detected in flow. Cycles may cause infinite loops."               |
| BD-BR-004 | A/B test requires minimum 2 variants                                 | Error    | "A/B tests need at least 2 variants."                                    |
| BD-BR-005 | Nudge campaign requires at least one channel                         | Error    | "Select at least one delivery channel."                                  |
| BD-BR-006 | Segment rule must have at least one condition                        | Error    | "Add at least one condition to the segment."                             |
| BD-BR-007 | Frequency cap must be >= 1                                           | Error    | "Frequency cap must be at least 1."                                      |
| BD-BR-008 | Intervention cannot target itself (self-reference)                   | Error    | "Intervention cannot reference itself."                                  |
| BD-BR-009 | Habit target frequency must be achievable                            | Warning  | "Target frequency may be too high for new users."                        |
| BD-BR-010 | A/B test minimum sample size must be >= 100 per variant              | Warning  | "Small sample sizes may lead to unreliable results."                     |
| BD-BR-011 | Nudge content must include at least one variable                     | Warning  | "Personalized nudges perform better. Add a variable like {{name}}."      |
| BD-BR-012 | Commitment devices must have a defined success condition             | Error    | "Define what counts as a successful commitment completion."              |
| BD-BR-013 | Exposure to more than 5 active interventions may cause nudge fatigue | Warning  | "Users in this segment may already be exposed to {count} interventions." |

## 9. Notification Specifications

| Trigger Event                                  | Channel          | Template Variables                                       | Delivery Rules            |
| ---------------------------------------------- | ---------------- | -------------------------------------------------------- | ------------------------- |
| Flow auto-activated                            | In-app           | `{{flow_name}}`                                          | To creator                |
| Flow validation error                          | In-app           | `{{flow_name}}`, `{{error_count}}`                       | Immediate on save attempt |
| A/B test reached significance                  | In-app, Email    | `{{test_name}}`, `{{winning_variant}}`, `{{confidence}}` | To test owner             |
| A/B test auto-stopped (inconclusive)           | In-app           | `{{test_name}}`                                          | Daily digest              |
| Nudge campaign completed                       | In-app           | `{{campaign_name}}`, `{{conversion_rate}}`               | To campaign owner         |
| Intervention effectiveness threshold crossed   | In-app           | `{{intervention_name}}`, `{{lift}}`                      | When lift > 20%           |
| Nudge fatigue alert for segment                | In-app           | `{{segment_name}}`, `{{active_interventions}}`           | Weekly                    |
| Segment estimation complete                    | In-app           | `{{segment_name}}`, `{{user_estimate}}`                  | Background job complete   |
| Habit milestone (e.g., 30-day streak achieved) | In-app (to user) | `{{user_name}}`, `{{habit_name}}`, `{{streak}}`          | Gamification notification |

## 10. Permission Matrix

| Entity            | Action              | Behavioral Designer | Instructor  | Marketing Officer | Admin |
| ----------------- | ------------------- | ------------------- | ----------- | ----------------- | ----- |
| bdInterventions   | Create/Edit         | ✓                   | -           | -                 | ✓     |
| bdInterventions   | Activate/Deactivate | ✓                   | -           | -                 | ✓     |
| bdInterventions   | View                | ✓                   | ✓ (limited) | ✓ (limited)       | ✓     |
| bdInterventions   | Delete              | -                   | -           | -                 | ✓     |
| bdEngagementFlows | Full CRUD           | ✓                   | -           | -                 | ✓     |
| bdNudgeCampaigns  | Full CRUD           | ✓                   | -           | ✓                 | ✓     |
| bdABTests         | Create/Edit         | ✓                   | -           | -                 | ✓     |
| bdABTests         | Declare Winner      | ✓                   | -           | -                 | ✓     |
| bdSegments        | Full CRUD           | ✓                   | -           | ✓                 | ✓     |
| bdHabits          | Create/Edit         | ✓                   | ✓           | -                 | ✓     |
| bdFunnels         | View                | ✓                   | ✓           | ✓                 | ✓     |
| bdAnalytics       | View                | ✓                   | ✓ (limited) | ✓ (limited)       | ✓     |
| bdAnalytics       | Export              | ✓                   | -           | -                 | ✓     |

## 11. State Management

### Redux Slice: `behavioralDesignSlice`

```typescript
interface BehavioralDesignState {
  interventions: {
    items: Intervention[];
    current: Intervention | null;
    loading: boolean;
    filters: Record<string, unknown>;
  };
  flows: {
    items: EngagementFlow[];
    current: EngagementFlow | null;
    loading: boolean;
    canvasState: { nodes: FlowNode[]; edges: FlowEdge[] };
  };
  nudgeCampaigns: { items: NudgeCampaign[]; current: NudgeCampaign | null; loading: boolean };
  abTests: {
    items: BDABTest[];
    current: BDABTest | null;
    loading: boolean;
    results: BDABTestResults | null;
  };
  segments: { items: BDSegment[]; current: BDSegment | null; loading: boolean };
  habits: { summary: HabitSummary | null; items: Habit[]; loading: boolean };
  funnels: { items: Funnel[]; current: Funnel | null; loading: boolean };
  analytics: {
    summary: BDAnalyticsSummary | null;
    byType: ChartData[];
    byChannel: ChartData[];
    loading: boolean;
  };
}
```

### RTK Query Endpoints

- `getInterventions` - cache 60s
- `getFlows` - cache 60s
- `getNudgeCampaigns` - cache 60s
- `getBDABTests` - cache 30s (polling when running)
- `getSegments` - cache 300s
- `getHabitSummary` - cache 120s
- `getFunnelData` - cache 300s
- `getBDAnalytics` - cache 300s

### Optimistic Updates

- Segment estimation -> immediate "Estimating..." status, poll for completion
- Flow node add/remove -> immediate canvas update, persist on save
- A/B test winner declaration -> immediate status change

## 12. Form Schemas (Zod)

```typescript
import { z } from "zod";

export const createInterventionSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().max(2000).optional(),
  type: z.enum([
    "nudge",
    "commitment_device",
    "habit_trigger",
    "social_accountability",
    "gamification",
    "loss_aversion",
    "scarcity",
    "framing",
    "anchoring",
  ]),
  targetBehavior: z.string().max(100).optional(),
  behavioralTechniques: z.array(z.string()).min(1, "Select at least one technique"),
  triggerCondition: z
    .object({
      type: z.enum(["event", "time", "condition"]),
      eventName: z.string().optional(),
      delayMinutes: z.number().int().min(0).optional(),
      schedule: z.string().optional(),
    })
    .optional(),
  actionConfig: z.object({
    channel: z.enum(["in_app", "push", "email", "sms", "ui_component"]),
    content: z.string().max(5000),
    uiComponent: z.string().optional(),
  }),
  timingRules: z
    .object({
      delayMinutes: z.number().int().min(0).optional(),
      repeatInterval: z.number().int().min(0).optional(),
      repeatUnit: z.enum(["minutes", "hours", "days"]).optional(),
      maxRepetitions: z.number().int().min(1).optional(),
    })
    .optional(),
  frequencyCap: z.number().int().min(1).default(3),
  audienceRules: z
    .object({
      segmentId: z.string().uuid().optional(),
      courses: z.array(z.string().uuid()).optional(),
      behavioralConditions: z.array(z.string()).optional(),
    })
    .optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
});

export const createFlowSchema = z.object({
  name: z.string().min(1, "Flow name is required").max(255),
  description: z.string().max(2000).optional(),
  entryCriteria: z.object({
    type: z.enum(["all_users", "segment", "event", "manual"]),
    segmentId: z.string().uuid().optional(),
    eventName: z.string().optional(),
  }),
  exitCriteria: z
    .object({
      type: z.enum(["goal_completed", "date_reached", "max_exposures", "manual"]),
      goalNodeId: z.string().uuid().optional(),
      endDate: z.string().datetime().optional(),
      maxExposures: z.number().int().optional(),
    })
    .optional(),
  maxParticipants: z.number().int().positive().optional(),
});

export const createNudgeCampaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required").max(255),
  nudgeType: z.enum([
    "motivation",
    "reminder",
    "social_proof",
    "scarcity",
    "loss_aversion",
    "feedback",
    "personalization",
  ]),
  channel: z.enum(["in_app", "push", "email", "sms"]),
  goal: z.string().max(100).optional(),
  content: z.object({
    title: z.string().max(200).optional(),
    body: z.string().min(1, "Content body is required").max(2000),
    ctaText: z.string().max(50).optional(),
    ctaUrl: z.string().url().optional().or(z.literal("")),
    imageUrl: z.string().url().optional().or(z.literal("")),
  }),
  targetingRules: z.object({
    segmentId: z.string().uuid().optional(),
    courseIds: z.array(z.string().uuid()).optional(),
    behavioralFilters: z
      .array(
        z.object({
          event: z.string(),
          operator: z.enum(["eq", "gt", "lt", "gte", "lte", "in"]),
          value: z.union([z.string(), z.number()]),
        }),
      )
      .optional(),
  }),
  scheduleConfig: z.object({
    startDate: z.string().datetime(),
    endDate: z.string().datetime().optional(),
    timezone: z.string().max(50).optional(),
    frequencyCap: z.number().int().min(1).default(1),
    coolDownHours: z.number().int().min(0).default(24),
    sendWindowStart: z.string().optional(),
    sendWindowEnd: z.string().optional(),
  }),
});

export const createBDABTestSchema = z.object({
  name: z.string().min(1, "Test name is required").max(255),
  hypothesis: z.string().max(2000).optional(),
  targetMetric: z.enum([
    "course_completion_rate",
    "session_frequency",
    "assignment_submission_rate",
    "time_on_task",
    "streak_length",
    "social_engagement",
    "revenue",
  ]),
  baselineRate: z.number().min(0).max(1).optional(),
  minimumDetectableEffect: z.number().min(0.01).max(0.5).default(0.05),
  significanceThreshold: z.number().min(0.8).max(0.99).default(0.95),
  variants: z
    .array(
      z.object({
        label: z.enum(["A", "B", "C"]),
        isControl: z.boolean(),
        interventionConfig: z.record(z.unknown()),
      }),
    )
    .min(2)
    .max(4),
  durationType: z.enum(["significance", "fixed_date"]).optional(),
  durationDays: z.number().int().min(1).max(365).optional(),
  segmentId: z.string().uuid().optional().nullable(),
});

export const createSegmentSchema = z.object({
  name: z.string().min(1, "Segment name is required").max(255),
  description: z.string().max(2000).optional(),
  rules: z.object({
    operator: z.enum(["AND", "OR"]),
    groups: z
      .array(
        z.object({
          operator: z.enum(["AND", "OR"]),
          conditions: z
            .array(
              z.object({
                field: z.string(),
                operator: z.enum([
                  "eq",
                  "neq",
                  "gt",
                  "gte",
                  "lt",
                  "lte",
                  "in",
                  "not_in",
                  "contains",
                  "not_contains",
                  "between",
                ]),
                value: z.union([
                  z.string(),
                  z.number(),
                  z.array(z.union([z.string(), z.number()])),
                ]),
              }),
            )
            .min(1),
        }),
      )
      .min(1),
  }),
});

export const createHabitSchema = z.object({
  name: z.string().min(1, "Habit name is required").max(255),
  targetBehavior: z.string().max(100),
  description: z.string().max(2000).optional(),
  targetFrequency: z.enum(["daily", "3x_week", "weekly", "custom"]),
  targetCount: z.number().int().min(1).default(1),
  successDefinition: z.string().max(500).optional(),
});
```

## 13. Analytics Events

| Event                      | Properties                                         | Destination                    |
| -------------------------- | -------------------------------------------------- | ------------------------------ |
| bd_intervention_created    | `{ interventionId, type, techniques[] }`           | PostHog                        |
| bd_intervention_activated  | `{ interventionId, type }`                         | PostHog                        |
| bd_intervention_exposed    | `{ interventionId, userId, variant, campaignId? }` | PostHog (tracked per exposure) |
| bd_intervention_converted  | `{ interventionId, userId, variant }`              | PostHog                        |
| bd_flow_created            | `{ flowId, nodeCount, triggerType }`               | PostHog                        |
| bd_flow_activated          | `{ flowId }`                                       | PostHog                        |
| bd_nudge_campaign_launched | `{ campaignId, nudgeType, channel, targetSize }`   | PostHog                        |
| bd_ab_test_created         | `{ testId, targetMetric, variantCount }`           | PostHog                        |
| bd_ab_test_winner_declared | `{ testId, winningVariant, confidence }`           | PostHog                        |
| bd_segment_created         | `{ segmentId, ruleCount }`                         | PostHog                        |
| bd_habit_defined           | `{ habitId, targetFrequency }`                     | PostHog                        |
| bd_analytics_exported      | `{ format, reportType }`                           | PostHog                        |

## 14. Accessibility Requirements

| Requirement                 | Implementation                                                                                                                          |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Flow designer canvas        | `role="application"`, keyboard drag-and-drop (Tab to select node, arrow keys to move, Enter to open config), `aria-label="Flow canvas"` |
| Node palette                | `role="listbox"`, `aria-label="Node types"`, each node `role="option"`                                                                  |
| Intervention library grid   | `role="grid"`, card actions keyboard accessible                                                                                         |
| Segment builder rule groups | `role="group"`, each rule `aria-label` describing the field/operator/value                                                              |
| A/B test results chart      | Data table below chart for screen readers, `aria-label="Cumulative conversion chart"`                                                   |
| Funnel visualization        | `aria-label="Funnel: Stage {name}, {count} users, {dropoff}% dropoff"`                                                                  |
| Nudge preview (in-app)      | Preview renders in `role="dialog"` with `aria-modal="true"`, focus trapped                                                              |
| Engagement flow validation  | Error nodes get `aria-invalid="true"`, error list with `role="alert"`                                                                   |
| Color in charts             | Patterns + labels in addition to color, never rely on color alone                                                                       |
| Keyboard navigation         | All screens navigable via Tab, Shift+Tab, Enter, Escape                                                                                 |
| Focus management            | Modal opens -> focus first input, modal closes -> return focus to trigger                                                               |

## 15. Error & Edge Case Catalog

| Code       | Scenario                                             | Response                        | User Message                                                                           | Recovery                      |
| ---------- | ---------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------- |
| BD-ERR-001 | Flow save fails due to network                       | Preserve canvas in localStorage | "Could not save flow. Local copy preserved. [Retry]"                                   | Auto-retry                    |
| BD-ERR-002 | Flow validation detects cycle                        | Front-end + server validation   | "Flow contains a cycle. Remove the cycle before saving."                               | Identify and fix cycle        |
| BD-ERR-003 | Nudge campaign send fails downstream                 | Queue for retry                 | "Some nudges failed to send. Retry queued."                                            | Background retry              |
| BD-ERR-004 | Segment estimation exceeds processing threshold      | Async estimation                | "Segment estimation in progress. Results may take a few minutes."                      | Poll for completion           |
| BD-ERR-005 | A/B test traffic allocation exceeds available users  | Validation error                | "Not enough users in segment for desired sample size. Reduce MDE or increase segment." | Adjust parameters             |
| BD-ERR-006 | Intervention deleted while referenced by active flow | Soft-block delete               | "Intervention is in use by active flow '{name}'. Deactivate flow first."               | Deactivate flow, then delete  |
| BD-ERR-007 | Habit tracking event missing definition              | Log warning                     | "Tracking event '{event}' not found in system events."                                 | Create event or map correctly |
| BD-ERR-008 | Funnel data unavailable for selected date range      | Empty state                     | "No funnel data for selected date range."                                              | Adjust date range             |
| BD-ERR-009 | A/B test inconclusive after max duration             | Auto-stop                       | "Test did not reach significance within {duration} days. No clear winner."             | Review hypothesis, iterate    |
| BD-ERR-010 | Nudge campaign targeting 0 users                     | Validation warning              | "Campaign targets 0 users with current rules. Adjust targeting."                       | Expand targeting rules        |
| BD-ERR-011 | Exposure event write backlog                         | Queue slow warning              | "Intervention tracking is experiencing delays."                                        | Scale tracking infrastructure |
| BD-ERR-012 | Duplicate intervention name                          | Validation                      | "An intervention with this name already exists."                                       | Use a different name          |
