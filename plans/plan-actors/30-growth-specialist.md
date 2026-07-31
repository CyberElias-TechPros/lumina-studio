# Actor: Growth Specialist

## 1. Identity & Role Definition

**Actor ID:** `growth_specialist`
**Display Name:** Growth Specialist
**Description:** Owns acquisition, activation, retention, referral, and revenue growth through data-driven experiments across all channels. Drives the growth engine for Cyber Elias Academy — designing, running, and analyzing experiments to improve every stage of the student lifecycle from first touch to advocacy.
**System Role:** `growth_staff`
**Hierarchy:** Reports to Head of Growth / Director of Marketing
**Location:** Web dashboard only
**Session Timeout:** 45 minutes of inactivity
**Concurrent Sessions:** 3 max

## 2. Primary Goals & Success KPIs

| Goal                            | KPI                                    | Target    |
| ------------------------------- | -------------------------------------- | --------- |
| Accelerate new user acquisition | New user signups per week              | +20% WoW  |
| Improve activation rate         | Activation rate (completed onboarding) | > 60%     |
| Boost retention                 | D30/D7 retention ratio                 | > 0.5     |
| Grow referral volume            | Referral signups per month             | +30% MoM  |
| Increase revenue                | Monthly recurring revenue (MRR) growth | > 15% MoM |
| Optimize funnel conversion      | End-to-end funnel conversion rate      | > 5%      |
| Experiment velocity             | Experiments run per quarter            | > 20      |
| Improve channel ROI             | Blended CAC payback period             | < 90 days |

## 3. Complete Screen Inventory

### 3.1 Growth Dashboard (`/growth`)

**Wireframe:** North-star metrics dashboard with growth model, KPI cards, experiment pipeline, and channel performance overview.

**UI Fields/Components:**

- **Header:** "Growth Dashboard" with last refresh timestamp
- **North Star Metric Display:** "Weekly Active Learners" — big number with trend, sparkline
- **KPI Cards Row (6):** New Signups (7d), Activation Rate, D7 Retention, Referral Signups, MRR, Blended CAC
  - Each: Value, % change, period selector (7d/30d/90d)
- **Growth Model Section:** Input fields + output chart — shows how changes to acquisition/activation/retention/revenue per user affect overall growth trajectory
  - Input: New visitors/day, Signup rate, Activation rate, D7 retention, D30 retention, Avg revenue per user
  - Output: Projected active users, MRR, LTV over 12 months (line chart)
- **Experiment Pipeline:** Kanban-style view of experiments — Ideation -> Design -> Running -> Analysis -> Implemented
  - Cards: Experiment name, hypothesis summary, metric, status, owner
- **Channel Performance:** Horizontal bar chart — CAC by channel, with conversion rate overlay
- **Quick Actions:** "New Experiment", "View Funnel", "Cohort Analysis", "Growth Model"

**Data Bindings:**

- `GET /api/growth/dashboard/summary`
- `GET /api/growth/dashboard/growth-model`
- `GET /api/growth/dashboard/experiment-pipeline`
- `GET /api/growth/dashboard/channel-performance`

**States:**

| State   | Behavior                                                          |
| ------- | ----------------------------------------------------------------- |
| Loading | Full skeleton with KPIs, chart placeholders                       |
| Empty   | "Welcome to Growth Dashboard. Start tracking your first metrics." |
| Error   | "Could not load growth data. [Retry]"                             |

### 3.2 Experiment Builder (`/growth/experiments`)

**Wireframe:** Full-cycle experiment management system — ideation, design, implementation tracking, results analysis, and documentation.

**UI Fields/Components:**

- **Experiment List (table):** Name, Hypothesis tagline, Metric, Type (A/B/n / Multi-variant / Product Change / Process Change), Status (Idea / Design / Running / Analysis / Implemented / Reverted), Owner, Start date, End date, Lift, Confidence
- **Experiment Detail (`/growth/experiments/{id}`):**
  - **Header:** Name, Status badge, "Launch Experiment" / "Stop Experiment" / "Revert" buttons
  - **Section 1 — ICE Score:** Impact (1-10), Confidence (1-10), Ease (1-10) -> ICE Score (computed)
  - **Section 2 — Hypothesis:** Structured format: "If we [change] for [user segment], then [metric] will [improve by X] because [rationale]."
  - **Section 3 — Design:** Description of change (rich text), Screenshots/mockups, Technical requirements, Implementation PR link
  - **Section 4 — Setup:** Target metric, Secondary metrics, Minimum detectable effect, Significance threshold (default 95%), Traffic allocation, Segment filter, Duration (days or "until significance"), Sample size calculation
  - **Section 5 — Results:**
    - Variant comparison table (if A/B test): Variant, Visitors, Conversions, Rate, Lift, Confidence, Probability Best
    - Pre/post chart if product change: Metric trend with annotation for experiment start/end
    - Statistical significance indicator
    - "Declare Winner" / "Mark as Implemented" / "Revert" buttons
  - **Section 6 — Learnings:** Structured post-experiment form: What worked, What didn't, Surprising insights, Next steps, Related experiments
  - **Attachments / Notes / Activity log**

**Data Bindings:**

- `GET /api/growth/experiments`
- `POST /api/growth/experiments`
- `GET /api/growth/experiments/{id}`
- `PUT /api/growth/experiments/{id}`
- `POST /api/growth/experiments/{id}/launch`
- `POST /api/growth/experiments/{id}/stop`
- `POST /api/growth/experiments/{id}/implement`
- `POST /api/growth/experiments/{id}/revert`

**States:**

| State                | Behavior                                                           |
| -------------------- | ------------------------------------------------------------------ |
| Loading              | Table skeleton                                                     |
| Empty                | "No experiments yet. Start your first growth experiment."          |
| Running experiment   | Live badge with elapsed time, sample size counter                  |
| Significance reached | Green banner: "Statistical significance reached! [Review Results]" |

### 3.3 Funnel Analyzer (`/growth/funnel`)

**Wireframe:** Multi-stage funnel visualization with segment filtering, trend analysis, and anomaly detection.

**UI Fields/Components:**

- **Funnel Builder:** Select funnel type (Acquisition / Activation / Engagement / Conversion / Retention / Referral) or create custom
- **Default Funnel Stages:**
  - Acquisition: Visitor -> Landing Page View -> Signup Start -> Signup Complete -> Email Verified
  - Activation: Signup Complete -> Profile Created -> First Course Enrolled -> First Lesson Completed -> First Week Active
  - Conversion: Trial Start -> Payment Method Added -> First Payment -> Recurring Active
  - Retention: N-Day retention curves per cohort
- **Funnel Visualization:** Horizontal bars with stage name, user count, % of total, drop-off count and rate between stages
- **Segment Overlay:** Overlay multiple segments (by channel, course, device, location)
- **Trend Mode:** Toggle to show funnel conversion rate over time (line chart)
- **Anomaly Detection:** Highlights stages with statistically significant drops/improvements vs baseline
- **Filter Bar:** Date range, Segment, Channel, Course, Device

**Data Bindings:**

- `GET /api/growth/funnel/{funnelType}`
- `GET /api/growth/funnel/{funnelType}/segments`
- `GET /api/growth/funnel/{funnelType}/trend`
- `GET /api/growth/funnel/anomalies`

**States:**

| State            | Behavior                                                                           |
| ---------------- | ---------------------------------------------------------------------------------- |
| Loading          | Funnel bar skeleton                                                                |
| No data          | "Select a funnel type to view conversion data."                                    |
| Anomaly detected | Red/yellow badge on stage with tooltip: "Conversion dropped {X}% vs last {period}" |

### 3.4 Cohort Retention Dashboard (`/growth/cohorts`)

**Wireframe:** Cohort retention analysis with weekly/daily retention tables and curves, segmented by acquisition date, channel, course, and user attributes.

**UI Fields/Components:**

- **Retention Type Selector:** Daily / Weekly / Monthly
- **Cohort Table:** Classic retention grid — rows = cohorts (by week), columns = periods (week 0, week 1, etc.), cells = retention percentage with color heatmap
- **Retention Curve:** Line chart — retention over time, multiple cohort lines, baseline overlay
- **Segment Filter:** Filter cohorts by channel, course type, location, device
- **Comparison Mode:** Compare two segments side by side (e.g., organic vs paid cohorts)
- **Key Metrics:** D1, D7, D30, D60, D90 retention rates for selected cohort range
- **Rolling Retention:** 7-day rolling average retention (smoothed line)
- **Export:** "Export Cohort Data" CSV

**Data Bindings:**

- `GET /api/growth/cohorts?type={daily|weekly|monthly}&from={date}&to={date}&segment={id}`
- `GET /api/growth/cohorts/comparison?segmentA={id}&segmentB={id}`

**States:**

| State                | Behavior                                                                             |
| -------------------- | ------------------------------------------------------------------------------------ |
| Loading              | Retention grid skeleton + chart placeholder                                          |
| No data              | "No cohort data for selected period."                                                |
| Small sample warning | Yellow banner: "Cohort sample sizes are small (< 50 users). Interpret with caution." |

### 3.5 Referral Program Manager (`/growth/referrals`)

**Wireframe:** End-to-end management of the referral program — program config, rewards, referral links, performance analytics, and fraud detection.

**UI Fields/Components:**

- **Program Settings:**
  - Reward type: Discount (%) / Free month / Free course / Cash / Points
  - Reward amount/value (configurable)
  - Referrer reward: What the referrer gets
  - Referee reward: What the referred person gets
  - Referral limit per user (max referrals)
  - Reward delivery timing (immediate / after referee qualifies — e.g., first payment)
  - Qualification rules: Referee must sign up, verify email, enroll in paid course, complete first lesson, etc.
  - Program terms text (rich text, displayed to users)
  - Program status: Active / Paused / Disabled
- **Referral Links:**
  - List of referral codes/links generated per user
  - Columns: User, Code/Link, Total referrals, Successful referrals, Reward earned
  - "Generate Bulk Links" for campaigns
  - QR code generator for each link
- **Performance Dashboard:**
  - KPIs: Total referrals, Successful referrals, Conversion rate of referrals, Revenue from referrals, Cost (rewards given), ROI
  - Chart: Referral signups over time
  - Top referrers leaderboard
  - Channel breakdown (shared via email, social, direct link, QR code)
- **Fraud Detection:**
  - Flagged referrals: Same IP, Same device, Same payment method, Rapid succession signups
  - Manual review queue with "Approve / Reject / Flag" actions

**Data Bindings:**

- `GET /api/growth/referrals/settings`
- `PUT /api/growth/referrals/settings`
- `GET /api/growth/referrals/links`
- `POST /api/growth/referrals/links/generate`
- `GET /api/growth/referrals/performance`
- `GET /api/growth/referrals/fraud-queue`
- `POST /api/growth/referrals/fraud-queue/{id}/action`

**States:**

| State       | Behavior                                                           |
| ----------- | ------------------------------------------------------------------ |
| Loading     | Settings + performance skeleton                                    |
| Empty       | "Referral program not configured. Set up your first program."      |
| Fraud alert | Red badge count on sidebar: "{N} flagged referrals pending review" |

### 3.6 Channel Attribution (`/growth/attribution`)

**Wireframe:** Multi-touch attribution dashboard showing how marketing channels contribute to conversions, with customizable attribution models.

**UI Fields/Components:**

- **Attribution Model Selector:** Last Touch / First Touch / Linear / Time Decay / U-Shaped / Custom
- **Attribution Summary:** Donut/report showing percentage of conversions attributed to each channel
- **Channel Detail Table:** Channel, Touch count, % of touches, Conversions, Attributed conversions, Cost, CAC, ROAS
- **Journey Timeline:** Sample user journeys showing touch sequence and attributed channel highlighted
- **Lookback Window:** Configurable (7d / 14d / 30d / 90d)
- **Comparison Mode:** Compare two attribution models side by side
- **Export:** "Export Attribution Report" CSV/PDF

**Data Bindings:**

- `GET /api/growth/attribution?model={model}&lookback={days}`
- `GET /api/growth/attribution/channels`
- `GET /api/growth/attribution/sample-journeys`

**States:**

| State            | Behavior                                             |
| ---------------- | ---------------------------------------------------- |
| Loading          | Donut chart + table skeleton                         |
| No data          | "No attribution data for selected model and period." |
| Model comparison | Side-by-side charts                                  |

### 3.7 Growth Model / Simulator (`/growth/simulator`)

**Wireframe:** Interactive spreadsheet-like growth model where the user inputs current metrics and projected improvements, and the system projects future growth.

**UI Fields/Components:**

- **Input Section (table):**
  - Row 1: Traffic (visitors/day) — current value, projected growth %
  - Row 2: Signup rate (% of visitors) — current, projected
  - Row 3: Activation rate (%) — current, projected
  - Row 4: D7 Retention (%) — current, projected
  - Row 5: D30 Retention (%) — current, projected
  - Row 6: Paid conversion rate (%) — current, projected
  - Row 7: Avg revenue per user ($) — current, projected
  - Row 8: Fixed costs ($/month) — current, projected
  - Row 9: Variable cost per user ($) — current, projected
- **Output Section:**
  - Projected Monthly Active Users (line chart, 12 months)
  - Projected MRR (line chart, 12 months)
  - Projected LTV/CAC ratio (line chart, 12 months)
  - Summary table: Current vs Projected at month 12 — MAU, MRR, ARPU, LTV, CAC, LTV/CAC
- **Scenario Saving:** "Save Scenario" button with name, "Load Scenario" dropdown, "Compare Scenarios" (overlay multiple scenario lines)
- **Export:** "Export Model" CSV

**Data Bindings:**

- `POST /api/growth/simulator/calculate` (takes inputs, returns projections)
- `GET /api/growth/simulator/scenarios`
- `POST /api/growth/simulator/scenarios`
- `DELETE /api/growth/simulator/scenarios/{id}`

**States:**

| State                  | Behavior                                                 |
| ---------------------- | -------------------------------------------------------- |
| Loading                | Input skeleton                                           |
| Empty (no projections) | "Enter values and click 'Calculate' to see projections." |
| Scenario comparison    | Multiple colored lines with legend                       |

### 3.8 SEO Content Planner (`/growth/seo`)

**Wireframe:** SEO content strategy manager — keyword research, content calendar, article tracker, ranking monitoring, and traffic analytics.

**UI Fields/Components:**

- **Keyword Research:**
  - Keyword table: Keyword, Volume, Difficulty, Current rank, Target page, Priority score
  - "Add Keywords" form (manual or bulk upload CSV)
  - Keyword grouping/tagging
  - Suggested keywords (from integration with SEMrush/Ahrefs API)
- **Content Calendar:**
  - Calendar/gantt view: Articles/landing pages scheduled with dates, status, author, target keyword
  - Content brief: Keyword, Target audience, Suggested structure, Internal linking, Competitor URLs
- **Article Tracker:**
  - Table: Title, Target keyword, URL, Status (Draft / Published / Updated), Publish date, Current rank, Traffic, Clicks, Impressions, CTR
  - Search Console integration for ranking and traffic data
- **SEO Performance Dashboard:**
  - KPIs: Organic traffic, Total keywords ranking, Keywords in top 3 / top 10 / top 50, Avg position, Click-through rate
  - Chart: Organic traffic trend (daily/weekly)
  - Top pages by organic traffic
  - Keyword position distribution (pie chart)
- **Competitor SEO Analysis:** Domain comparison, keyword gap analysis, content gap analysis

**Data Bindings:**

- `GET /api/growth/seo/keywords`
- `POST /api/growth/seo/keywords`
- `GET /api/growth/seo/content-calendar`
- `POST /api/growth/seo/content-calendar`
- `GET /api/growth/seo/articles`
- `PUT /api/growth/seo/articles/{id}`
- `GET /api/growth/seo/performance`
- `GET /api/growth/seo/competitor-analysis`

**States:**

| State          | Behavior                                              |
| -------------- | ----------------------------------------------------- |
| Loading        | Dashboard skeleton                                    |
| Empty          | "No keywords tracked. Add your first keyword target." |
| API disconnect | "SEO tool integration disconnected. [Reconnect]"      |

## 4. Full Database Schema

```typescript
// --- Growth Schema (growth_) ---

export const growthExperiments = pgTable('growth_experiments', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  hypothesis: text('hypothesis'),
  icScore: jsonb('ic_score').default('{}'), // { impact, confidence, ease, total }
  experimentType: varchar('experiment_type', { length: 50 }).notNull(), // ab_test,multi_variant,product_change,process_change
  status: varchar('status', { length: 30 }).default('idea'), // idea,design,running,analysis,implemented,reverted
  targetMetric: varchar('target_metric', { length: 100 }),
  secondaryMetrics: text('secondary_metrics').array(),
  minimumDetectableEffect: numeric('minimum_detectable_effect', { precision: 4, scale: 2 }),
  significanceThreshold: numeric('significance_threshold', { precision: 4, scale: 3 }).default('0.95'),
  trafficAllocation: jsonb('traffic_allocation').default('{}'),
  segmentFilter: jsonb('segment_filter').default('{}'),
  durationDays: integer('duration_days'),
  durationType: varchar('duration_type', { length: 30 }).default('significance'),
  sampleSize: integer('sample_size'),
  designDescription: text('design_description'),
  implementationPrUrl: varchar('implementation_pr_url', { length: 500 }),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  winnerVariant: varchar('winner_variant', { length: 10 }),
  achievedLift: numeric('achieved_lift', { precision: 6, scale: 2 }),
  confidenceLevel: numeric('confidence_level', { precision: 5, scale: 3 }),
  learnings: jsonb('learnings').default('{}'), // { worked, didntWork, surprises, nextSteps }
  ownerId: uuid('owner_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const growthExperimentVariants = pgTable('growth_experiment_variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  experimentId: uuid('experiment_id').references(() => growthExperiments.id).notNull(),
  label: varchar('label', { length: 10 }).notNull(),
  isControl: boolean('is_control').default(false),
  description: text('description'),
  config: jsonb('config').default('{}'),
  sampleSize: integer('sample_size').default(0),
  conversions: integer('conversions').default(0),
  conversionRate: numeric('conversion_rate', { precision: 8, scale: 5 }),
  liftOverControl: numeric('lift_over_control', { precision: 6, scale: 2 }),
  probabilityBest: numeric('probability_best', { precision: 5, scale: 3 }),
});

export const growthReferralProgram = pgTable('growth_referral_program', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  rewardType: varchar('reward_type', { length: 50 }).notNull(), // discount,free_month,free_course,cash,points
  rewardValue: numeric('reward_value', { precision: 10, scale: 2 }),
  referrerReward: jsonb('referrer_reward').default('{}'),
  refereeReward: jsonb('referee_reward').default('{}'),
  maxReferralsPerUser: integer('max_referrals_per_user').default(0),
  rewardDeliveryTiming: varchar('reward_delivery_timing', { length: 50 }).default('immediate'), // immediate,after_qualification
  qualificationRules: jsonb('qualification_rules').default('{}'),
  termsText: text('terms_text'),
  status: varchar('status', { length: 30 }).default('disabled'),
  totalReferrals: integer('total_referrals').default(0),
  successfulReferrals: integer('successful_referrals').default(0),
  revenueAttributed: numeric('revenue_attributed', { precision: 14, scale: 2 }).default('0'),
  costInRewards: numeric('cost_in_rewards', { precision: 12, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const growthReferralLinks = pgTable('growth_referral_links', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  code: varchar('code', { length: 50 }).unique().notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  source: varchar('source', { length: 50 }).default('direct'), // direct,email,social,campaign
  campaignId: varchar('campaign_id', { length: 100 }),
  totalClicks: integer('total_clicks').default(0),
  totalReferrals: integer('total_referrals').default(0),
  successfulReferrals: integer('successful_referrals').default(0),
  rewardEarned: numeric('reward_earned', { precision: 10, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastClickedAt: timestamp('last_clicked_at'),
});

export const growthReferralFraudFlags = pgTable('growth_referral_fraud_flags', {
  id: uuid('id').defaultRandom().primaryKey(),
  referralLinkId: uuid('referral_link_id').references(() => growthReferralLinks.id).notNull(),
  refereeUserId: uuid('referee_user_id').references(() => users.id).notNull(),
  reason: varchar('reason', { length: 100 }).notNull(), // same_ip,same_device,same_payment_method,rapid_succession,other
  details: jsonb('details').default('{}'),
  status: varchar('status', { length: 30 }).default('flagged'), // flagged,approved,rejected
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  reviewedAt: timestamp('reviewed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const growthAttributionLog = pgTable('growth_attribution_log', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  sessionId: varchar('session_id', { length: 255 }),
  source: varchar('source', { length: 100 }),
  medium: varchar('medium', { length: 100 }),
  campaign: varchar('campaign', { length: 255 }),
  channel: varchar('channel', { length: 100 }),
  touchTimestamp: timestamp('touch_timestamp').defaultNow().notNull(),
  touchType: varchar('touch_type', { length: 30 }), // first,last,intermediate
  converted: boolean('converted').default(false),
  conversionValue: numeric('conversion_value', { precision: 12, scale: 2 }),
});

export const growthSeoKeywords = pgTable('growth_seo_keywords', {
  id: uuid('id').defaultRandom().primaryKey(),
  keyword: varchar('keyword', { length: 255 }).notNull(),
  volume: integer('volume'),
  difficulty: integer('difficulty'), // 0-100
  currentRank: integer('current_rank'),
  targetUrl: varchar('target_url', { length: 500 }),
  priorityScore: numeric('priority_score', { precision: 4, scale: 1 }),
  tags: text('tags').array(),
  groupId: uuid('group_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const growthSeoContentCalendar = pgTable('growth_seo_content_calendar', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  keywordId: uuid('keyword_id').references(() => growthSeoKeywords.id),
  targetUrl: varchar('target_url', { length: 500 }),
  contentType: varchar('content_type', { length: 50 }), // blog,landing_page,guide,case_study,comparison
  status: varchar('status', { length: 30 }).default('planned'), // planned,in_progress,published,updated
  assigneeId: uuid('assignee_id').references(() => users.id),
  publishDate: timestamp('publish_date'),
  wordCount: integer('word_count'),
  traffic: integer('traffic').default(0),
  clicks: integer('clicks').default(0),
  impressions: integer('impressions').default(0),
  avgPosition: numeric('avg_position', { precision: 4, scale: 1 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const growthSavedScenarios = pgTable('growth_saved_scenarios', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  inputs: jsonb('inputs').notNull(),
  outputs: jsonb('outputs').notNull(),
  ownerId: uuid('owner_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

CREATE INDEX idx_growth_experiments_status ON growth_experiments(status);
CREATE INDEX idx_growth_experiments_owner ON growth_experiments(owner_id);
CREATE INDEX idx_growth_referral_links_user ON growth_referral_links(user_id);
CREATE INDEX idx_growth_referral_fraud_status ON growth_referral_fraud_flags(status);
CREATE INDEX idx_growth_attribution_user ON growth_attribution_log(user_id);
CREATE INDEX idx_growth_attribution_source ON growth_attribution_log(source);
CREATE INDEX idx_growth_seo_keywords_keyword ON growth_seo_keywords(keyword);
CREATE INDEX idx_growth_seo_content_status ON growth_seo_content_calendar(status);
```

## 5. Complete API Contract

### Endpoints

```
GET    /api/v1/growth/dashboard/summary
GET    /api/v1/growth/dashboard/growth-model
GET    /api/v1/growth/dashboard/experiment-pipeline
GET    /api/v1/growth/dashboard/channel-performance

GET    /api/v1/growth/experiments
POST   /api/v1/growth/experiments
GET    /api/v1/growth/experiments/{id}
PUT    /api/v1/growth/experiments/{id}
DELETE /api/v1/growth/experiments/{id}
POST   /api/v1/growth/experiments/{id}/launch
POST   /api/v1/growth/experiments/{id}/stop
POST   /api/v1/growth/experiments/{id}/implement
POST   /api/v1/growth/experiments/{id}/revert
POST   /api/v1/growth/experiments/{id}/variants
PUT    /api/v1/growth/experiments/{id}/variants/{vid}

GET    /api/v1/growth/funnel/{type}
GET    /api/v1/growth/funnel/{type}/segments
GET    /api/v1/growth/funnel/{type}/trend
GET    /api/v1/growth/funnel/anomalies

GET    /api/v1/growth/cohorts
GET    /api/v1/growth/cohorts/comparison

GET    /api/v1/growth/referrals/settings
PUT    /api/v1/growth/referrals/settings
GET    /api/v1/growth/referrals/performance
POST    /api/v1/growth/referrals/links/generate
GET    /api/v1/growth/referrals/links
GET    /api/v1/growth/referrals/fraud-queue
POST   /api/v1/growth/referrals/fraud-queue/{id}/action

GET    /api/v1/growth/attribution
GET    /api/v1/growth/attribution/channels
GET    /api/v1/growth/attribution/sample-journeys

POST   /api/v1/growth/simulator/calculate
GET    /api/v1/growth/simulator/scenarios
POST   /api/v1/growth/simulator/scenarios
DELETE /api/v1/growth/simulator/scenarios/{id}

GET    /api/v1/growth/seo/keywords
POST   /api/v1/growth/seo/keywords
GET    /api/v1/growth/seo/content-calendar
POST   /api/v1/growth/seo/content-calendar
GET    /api/v1/growth/seo/articles/{id}
PUT    /api/v1/growth/seo/articles/{id}
GET    /api/v1/growth/seo/performance
GET    /api/v1/growth/seo/competitor-analysis
```

**Types:**

```typescript
interface GrowthExperiment {
  id: string;
  name: string;
  hypothesis: string | null;
  experimentType: string;
  status: "idea" | "design" | "running" | "analysis" | "implemented" | "reverted";
  targetMetric: string | null;
  icScore: { impact: number; confidence: number; ease: number; total: number };
  variants: ExperimentVariant[];
  achievedLift: number | null;
  confidenceLevel: number | null;
  learnings: Record<string, unknown> | null;
  startDate: string | null;
  endDate: string | null;
}

interface ExperimentVariant {
  id: string;
  label: string;
  isControl: boolean;
  description: string | null;
  sampleSize: number;
  conversions: number;
  conversionRate: number | null;
  liftOverControl: number | null;
  probabilityBest: number | null;
}

interface ReferralSettings {
  rewardType: string;
  rewardValue: string;
  maxReferralsPerUser: number;
  rewardDeliveryTiming: string;
  qualificationRules: Record<string, unknown>;
  status: string;
}

interface ReferralLink {
  id: string;
  userId: string;
  code: string;
  url: string;
  source: string;
  totalClicks: number;
  totalReferrals: number;
  successfulReferrals: number;
}

interface FraudFlagEntry {
  id: string;
  refereeUser: { id: string; name: string; email: string };
  reason: string;
  details: Record<string, unknown>;
  status: "flagged" | "approved" | "rejected";
}

interface CohortData {
  cohorts: Array<{
    date: string;
    size: number;
    retention: number[];
  }>;
}

interface FunnelData {
  stages: Array<{
    name: string;
    count: number;
    percentage: number;
    dropoff: number;
    dropoffRate: number;
  }>;
}

interface AttributionSummary {
  model: string;
  lookbackDays: number;
  channels: Array<{
    name: string;
    touchCount: number;
    attributedConversions: number;
    attributedRevenue: string;
    cost: string;
    cac: string;
    roas: number;
  }>;
}

interface GrowthModelInput {
  visitorsPerDay: number;
  visitorGrowthPct: number;
  signupRate: number;
  activationRate: number;
  d7Retention: number;
  d30Retention: number;
  paidConversionRate: number;
  avgRevenuePerUser: number;
  fixedCostsMonthly: number;
  variableCostPerUser: number;
}

interface GrowthModelOutput {
  projectedMau: Array<{ month: number; value: number }>;
  projectedMrr: Array<{ month: number; value: number }>;
  projectedLtvCac: Array<{ month: number; value: number }>;
  summary: {
    currentMau: number;
    projectedMau: number;
    currentMrr: string;
    projectedMrr: string;
    ltvCac: number;
  };
}
```

**Error Codes:**

| Code   | HTTP | Meaning                                   |
| ------ | ---- | ----------------------------------------- |
| GR_001 | 400  | Invalid experiment configuration          |
| GR_002 | 400  | Referral program validation error         |
| GR_003 | 404  | Experiment not found                      |
| GR_004 | 409  | Experiment already running                |
| GR_005 | 422  | Insufficient sample size for significance |
| GR_006 | 422  | Referral code already exists              |
| GR_007 | 429  | Referral generation rate limit exceeded   |
| GR_008 | 500  | Attribution data processing failure       |

## 6. Component Tree

```
App
+-- GrowthModule
    +-- GrowthLayout (shell)
    |   +-- Sidebar (Dashboard, Experiments, Funnel, Cohorts, Referrals, Attribution, Simulator, SEO)
    |   +-- Breadcrumb
    |
    +-- GrowthDashboard
    |   +-- NorthStarMetric { label, value, trend }
    |   +-- KpiCardRow
    |   |   +-- KpiCard { label, value, change, period }
    |   +-- GrowthModelPreview { inputs, chart }
    |   +-- ExperimentPipeline { kanban columns }
    |   |   +-- ExperimentCard { name, metric, status, owner }
    |   +-- ChannelPerformanceBar
    |
    +-- ExperimentPage
    |   +-- ExperimentList { table }
    |   |   +-- ExperimentRow { name, metric, status, lift, confidence }
    |   +-- ExperimentDetail
    |   |   +-- ExperimentHeader { name, status, actions }
    |   |   +-- ICEVitals
    |   |   |   +-- ICESlider { label, value, onChange }
    |   |   +-- HypothesisSection
    |   |   +-- DesignSection
    |   |   +-- SetupSection
    |   |   |   +-- MetricSelector
    |   |   |   +-- VariantConfig { variants[], onUpdate }
    |   |   |   +-- SampleSizeCalculator
    |   |   |   +-- DurationConfig
    |   |   +-- ResultsSection
    |   |   |   +-- VariantComparisonTable
    |   |   |   +-- ResultsChart
    |   |   |   +-- DecisionActions
    |   |   +-- LearningsSection
    |   |   +-- ActivityLog
    |   +-- NewExperimentWizard
    |       +-- StepIdea
    |       +-- StepHypothesis
    |       +-- StepDesign
    |       +-- StepSetup
    |       +-- StepReview
    |
    +-- FunnelAnalyzer
    |   +-- FunnelTypeSelector
    |   +-- FunnelChart { stages }
    |   +-- SegmentOverlayToggle
    |   +-- TrendChart
    |   +-- AnomalyBadge { stage, severity }
    |
    +-- CohortPage
    |   +-- RetentionTypeSelector
    |   +-- CohortTable { rows, columns, heatmap }
    |   +-- RetentionCurve { lines }
    |   +-- SegmentFilter
    |   +-- ComparisonMode { toggle, segment selectors }
    |   +-- RetentionKpiCards
    |
    +-- ReferralManager
    |   +-- ProgramSettings
    |   |   +-- RewardConfig
    |   |   +-- QualificationRules
    |   |   +-- ProgramStatusToggle
    |   +-- ReferralLinkList
    |   |   +-- LinkRow { user, code, referrals, earned }
    |   |   +-- GenerateLinksForm
    |   +-- PerformanceDashboard
    |   |   +-- ReferralKpis
    |   |   +-- ReferralTrendChart
    |   |   +-- TopReferrers { leaderboard }
    |   +-- FraudQueue
    |       +-- FraudFlagRow { user, reason, details, actions }
    |
    +-- AttributionPage
    |   +-- ModelSelector
    |   +-- AttributionPieChart
    |   +-- ChannelTable
    |   +-- JourneyTimeline { sampleUserJourneys }
    |   +-- ComparisonView
    |
    +-- GrowthSimulator
    |   +-- InputTable { rows with current + projected }
    |   +-- ProjectionCharts { MAU, MRR, LTV/CAC }
    |   +-- ScenarioControls { save, load, compare }
    |   +-- SummaryTable { current vs projected }
    |
    +-- SEOPlanner
        +-- KeywordResearch
        |   +-- KeywordTable { keyword, volume, difficulty, rank }
        |   +-- AddKeywordForm
        |   +-- KeywordSuggestions
        +-- ContentCalendar
        |   +-- CalendarView { gantt }
        |   +-- ContentBriefForm
        +-- ArticleTracker
        |   +-- ArticleTable { title, keyword, rank, traffic }
        +-- SEODashboard
            +-- SEOKpis
            +-- TrafficTrendChart
            +-- KeywordDistributionPie
            +-- CompetitorAnalysis
```

## 7. Exhaustive User Journeys

### Journey 1: Full Experiment Lifecycle — Optimize Signup Form

1. Growth specialist notices 42% drop-off between "Start Signup" and "Complete Signup" in Funnel Analyzer
2. Opens Experiment Builder, creates new experiment "Simplify Signup Form"
3. Fills ICE scores: Impact=8, Confidence=7, Ease=9 -> ICE Score = 24
4. Hypothesis: "If we reduce signup form fields from 8 to 4 (name, email, password, goal) for all new visitors, then signup completion rate will increase by 15% because fewer fields reduces friction."
5. Design section: Describes removing "phone, company, referral source, bio" + adding social login buttons
6. Setup: Target metric = signup completion rate, MDE = 5%, significance = 95%, traffic = 50/50, segment = all new visitors
7. Sample size calculator: 2,400 users per variant needed, estimated 5 days
8. Saves as Draft, shares with dev team for implementation
9. Dev completes PR, growth specialist links PR URL in experiment
10. Launches experiment -> status changes to "Running"
11. After 7 days (2 days beyond minimum), checks results:

- Control: 4,200 visitors, 1,860 signups, 44.3% rate
- Variant (simplified): 4,150 visitors, 2,490 signups, 60.0% rate
- Lift: +35.4%, Confidence: 99.7% -> significant!

12. Declares winner (simplified form), marks as "Implemented"
13. Fills learning section: "Worked: Fewer fields dramatically improved conversion. Surprise: Social login accounted for 40% of variant signups. Next: Test adding progress indicator to multi-step flow."
14. Monitors funnel over next week -> signup completion rate stabilized at 58%

### Journey 2: Launch and Optimize Referral Program

1. Opens Referral Program Manager, configures program:
   - Reward: 20% discount for referrer + 20% discount for referee
   - Max referrals: 10 per user
   - Qualification: Referee must enroll in a paid course
   - Reward delivery: After qualification
2. Enables program -> system generates referral links for existing students
3. After 30 days: 450 referrals, 80 successful, $12,000 revenue attributed
4. Checks fraud queue: 12 flagged referrals (same IP)
5. Reviews each: approves 8 legitimate (family members same household), rejects 4 (gaming system)
6. Analyzes top referrers: sends personal thank-you to top 5
7. A/B tests reward amount: $20 cash vs 25% discount -> cash wins 2:1

### Journey 3: Use Growth Model for Annual Planning

1. Opens Growth Simulator, loads current metrics
2. Inputs target improvements for next quarter:
   - Traffic: +30% (SEO + paid campaigns)
   - Signup rate: +10% (from signup experiment)
   - Activation rate: +15% (new onboarding flow)
   - D7 retention: +10% (behavioral interventions)
   - Paid conversion: +5%
3. Clicks Calculate -> sees projected MAU growing from 5,000 to 8,200 in 12 months
4. Saves scenario as "Q3 Growth Plan"
5. Creates second scenario "Aggressive Growth" with higher targets
6. Compares scenarios side by side, chooses balanced approach for executive presentation

## 8. Business Rules Engine

| Rule ID   | Description                                         | Priority | Message                                                         |
| --------- | --------------------------------------------------- | -------- | --------------------------------------------------------------- |
| GR-BR-001 | Experiment must have a complete hypothesis          | Error    | "Complete the hypothesis statement before launching."           |
| GR-BR-002 | Experiment requires at least 2 variants             | Error    | "Experiments need at least 2 variants (control + test)."        |
| GR-BR-003 | ICE scores must be between 1-10                     | Error    | "Each ICE score must be between 1 and 10."                      |
| GR-BR-004 | Significance threshold must be 80-99%               | Error    | "Set significance threshold between 80% and 99%."               |
| GR-BR-005 | Sample size must be >= 100 per variant              | Warning  | "Very small sample sizes may produce unreliable results."       |
| GR-BR-006 | Referral reward cannot exceed course price          | Error    | "Referral reward cannot exceed the referred course price."      |
| GR-BR-007 | Max referrals per user must be >= 1                 | Error    | "Set max referrals to at least 1."                              |
| GR-BR-008 | Experiment cannot run for more than 90 days         | Warning  | "Long-running experiments may be impacted by external factors." |
| GR-BR-009 | SEO keyword volume must be > 0                      | Warning  | "Zero-volume keywords will not drive traffic."                  |
| GR-BR-010 | Growth model inputs must be positive numbers        | Error    | "All growth model inputs must be positive numbers."             |
| GR-BR-011 | Fraud referral review requires action within 7 days | Warning  | "Flagged referrals older than 7 days pending review."           |
| GR-BR-012 | Experiment with no results for 30 days auto-stops   | Info     | "Experiment auto-stopped due to inactivity."                    |

## 9. Notification Specifications

| Trigger Event                                     | Channel                  | Template Variables                                  | Delivery Rules           |
| ------------------------------------------------- | ------------------------ | --------------------------------------------------- | ------------------------ |
| Experiment launched                               | In-app                   | `{{experiment_name}}`, `{{target_metric}}`          | To growth team           |
| Experiment reached significance                   | In-app, Email            | `{{experiment_name}}`, `{{lift}}`, `{{confidence}}` | To experiment owner      |
| Experiment auto-stopped                           | In-app                   | `{{experiment_name}}`, `{{reason}}`                 | Immediate                |
| Experiment implemented                            | In-app                   | `{{experiment_name}}`                               | To growth team           |
| Referral program fraud flag                       | In-app, Email            | `{{count}}`, `{{review_url}}`                       | Daily if > 5 pending     |
| Referral milestone (1000 referrals)               | In-app                   | `{{total_referrals}}`                               | To growth team           |
| SEO keyword ranking changed (top 10 movement)     | In-app                   | `{{keyword}}`, `{{old_rank}}` -> `{{new_rank}}`     | Weekly digest            |
| Funnel anomaly detected                           | In-app, Email (critical) | `{{funnel}}`, `{{stage}}`, `{{drop}}`               | Immediate for > 20% drop |
| Growth model scenario shared                      | In-app                   | `{{scenario_name}}`, `{{shared_by}}`                | To recipient             |
| Cohort retention drop (D7 > 10% relative decline) | In-app, Email            | `{{cohort_date}}`, `{{old_rate}}`, `{{new_rate}}`   | Weekly                   |
| Attribution model calculation complete            | In-app                   | `{{model_name}}`, `{{date_range}}`                  | When ready               |

## 10. Permission Matrix

| Entity                | Action           | Growth Specialist | Marketing Officer | PMM | Admin |
| --------------------- | ---------------- | ----------------- | ----------------- | --- | ----- |
| growthExperiments     | Create/Edit      | ✓                 | ✓                 | ✓   | ✓     |
| growthExperiments     | Launch           | ✓                 | -                 | -   | ✓     |
| growthExperiments     | Implement/Revert | ✓                 | -                 | -   | ✓     |
| growthExperiments     | View All         | ✓                 | ✓                 | ✓   | ✓     |
| growthReferralProgram | Configure        | ✓                 | -                 | -   | ✓     |
| growthReferralLinks   | View             | ✓                 | ✓                 | ✓   | ✓     |
| growthReferralFraud   | Review           | ✓                 | -                 | -   | ✓     |
| growthFunnel          | View             | ✓                 | ✓                 | ✓   | ✓     |
| growthCohorts         | View             | ✓                 | ✓                 | ✓   | ✓     |
| growthAttribution     | View             | ✓                 | ✓                 | ✓   | ✓     |
| growthSimulator       | Use              | ✓                 | -                 | ✓   | ✓     |
| growthSimulator       | Save Scenarios   | ✓                 | -                 | -   | ✓     |
| growthSeoKeywords     | Manage           | ✓                 | ✓                 | -   | ✓     |
| growthSeoContent      | Manage           | ✓                 | ✓                 | ✓   | ✓     |

## 11. State Management

### Redux Slice: `growthSlice`

```typescript
interface GrowthState {
  dashboard: { summary: GrowthSummary | null; model: GrowthModelPreview | null; loading: boolean };
  experiments: {
    items: GrowthExperiment[];
    current: GrowthExperiment | null;
    loading: boolean;
    filters: Record<string, unknown>;
  };
  funnel: {
    data: FunnelData | null;
    segments: FunnelData[];
    loading: boolean;
    selectedFunnel: string;
  };
  cohorts: {
    data: CohortData | null;
    comparison: { a: CohortData | null; b: CohortData | null };
    loading: boolean;
  };
  referrals: {
    settings: ReferralSettings | null;
    performance: ReferralPerformance | null;
    links: ReferralLink[];
    fraudQueue: FraudFlagEntry[];
    loading: boolean;
  };
  attribution: { data: AttributionSummary | null; channels: ChannelData[]; loading: boolean };
  simulator: {
    inputs: GrowthModelInput;
    outputs: GrowthModelOutput | null;
    scenarios: SavedScenario[];
    loading: boolean;
  };
  seo: {
    keywords: SeoKeyword[];
    content: SeoArticle[];
    performance: SeoPerformance | null;
    loading: boolean;
  };
}
```

### RTK Query Endpoints

- `getDashboardSummary` - cache 60s
- `getExperiments` - cache 30s
- `getExperiment` - cache 15s (polling when running)
- `getFunnelData` - cache 300s
- `getCohortData` - cache 600s
- `getReferralPerformance` - cache 300s
- `getAttribution` - cache 600s
- `calculateModel` - no cache (compute on demand)
- `getSeoPerformance` - cache 600s

### Optimistic Updates

- Experiment variant updates -> immediate chart refresh
- Fraud queue action (approve/reject) -> immediate status change
- Referral setting save -> optimistic update, rollback on error

## 12. Form Schemas (Zod)

```typescript
import { z } from "zod";

export const createExperimentSchema = z.object({
  name: z.string().min(1, "Experiment name is required").max(255),
  hypothesis: z.string().max(2000).optional(),
  experimentType: z.enum(["ab_test", "multi_variant", "product_change", "process_change"]),
  icScore: z
    .object({
      impact: z.number().int().min(1).max(10),
      confidence: z.number().int().min(1).max(10),
      ease: z.number().int().min(1).max(10),
    })
    .optional(),
  targetMetric: z.string().max(100).optional(),
  secondaryMetrics: z.array(z.string()).optional(),
  minimumDetectableEffect: z.number().min(0.01).max(0.5).default(0.05),
  significanceThreshold: z.number().min(0.8).max(0.99).default(0.95),
  variants: z
    .array(
      z.object({
        label: z.enum(["A", "B", "C", "D"]),
        isControl: z.boolean(),
        description: z.string().max(2000).optional(),
        config: z.record(z.unknown()),
      }),
    )
    .min(2)
    .max(4),
  durationType: z.enum(["significance", "fixed_date"]).optional(),
  durationDays: z.number().int().min(1).max(90).optional(),
  segmentFilter: z.record(z.unknown()).optional(),
  designDescription: z.string().max(5000).optional(),
});

export const updateReferralSettingsSchema = z.object({
  rewardType: z.enum(["discount", "free_month", "free_course", "cash", "points"]),
  rewardValue: z.number().positive("Reward must be positive"),
  maxReferralsPerUser: z.number().int().min(1).default(10),
  rewardDeliveryTiming: z.enum(["immediate", "after_qualification"]),
  qualificationRules: z.object({
    requiredActions: z
      .array(
        z.enum(["signup", "email_verify", "enroll_paid", "complete_first_lesson", "first_payment"]),
      )
      .min(1),
    minimumDaysSinceSignup: z.number().int().min(0).optional(),
  }),
  termsText: z.string().max(10000).optional(),
});

export const growthModelSchema = z.object({
  visitorsPerDay: z.number().positive(),
  visitorGrowthPct: z.number().min(-100).max(1000),
  signupRate: z.number().min(0).max(100),
  activationRate: z.number().min(0).max(100),
  d7Retention: z.number().min(0).max(100),
  d30Retention: z.number().min(0).max(100),
  paidConversionRate: z.number().min(0).max(100),
  avgRevenuePerUser: z.number().positive(),
  fixedCostsMonthly: z.number().min(0),
  variableCostPerUser: z.number().min(0),
});

export const seoKeywordSchema = z.object({
  keyword: z.string().min(1).max(255),
  volume: z.number().int().min(0).optional(),
  difficulty: z.number().int().min(0).max(100).optional(),
  targetUrl: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string().max(50)).max(10).optional(),
  priorityScore: z.number().min(0).max(10).optional(),
});

export const seoContentSchema = z.object({
  title: z.string().min(1).max(255),
  keywordId: z.string().uuid().optional().nullable(),
  targetUrl: z.string().url().optional().or(z.literal("")),
  contentType: z.enum(["blog", "landing_page", "guide", "case_study", "comparison"]),
  assigneeId: z.string().uuid().optional().nullable(),
  publishDate: z.string().datetime().optional().nullable(),
});

export const referralFraudActionSchema = z.object({
  action: z.enum(["approve", "reject"]),
  reason: z.string().max(500).optional(),
});

export const experimentLearningsSchema = z.object({
  worked: z.string().max(2000),
  didntWork: z.string().max(2000).optional(),
  surprises: z.string().max(2000).optional(),
  nextSteps: z.string().max(2000).optional(),
  relatedExperiments: z.array(z.string().uuid()).optional(),
});
```

## 13. Analytics Events

| Event                                  | Properties                             | Destination |
| -------------------------------------- | -------------------------------------- | ----------- |
| growth_experiment_created              | `{ experimentId, type, targetMetric }` | PostHog     |
| growth_experiment_launched             | `{ experimentId, variantCount, mde }`  | PostHog     |
| growth_experiment_significance_reached | `{ experimentId, lift, confidence }`   | PostHog     |
| growth_experiment_implemented          | `{ experimentId, lift }`               | PostHog     |
| growth_experiment_reverted             | `{ experimentId }`                     | PostHog     |
| growth_referral_program_configured     | `{ rewardType, rewardValue }`          | PostHog     |
| growth_referral_link_generated         | `{ count }`                            | PostHog     |
| growth_referral_fraud_reviewed         | `{ action, count }`                    | PostHog     |
| growth_funnel_viewed                   | `{ funnelType }`                       | PostHog     |
| growth_funnel_anomaly_acknowledged     | `{ funnelType, stage }`                | PostHog     |
| growth_cohort_exported                 | `{ format, period }`                   | PostHog     |
| growth_attribution_model_changed       | `{ model }`                            | PostHog     |
| growth_scenario_saved                  | `{ scenarioName }`                     | PostHog     |
| growth_scenario_compared               | `{ scenarioA, scenarioB }`             | PostHog     |
| growth_seo_keyword_added               | `{ count, source }`                    | PostHog     |
| growth_seo_content_scheduled           | `{ contentType, publishDate }`         | PostHog     |
| growth_analytics_exported              | `{ format, reportType }`               | PostHog     |

## 14. Accessibility Requirements

| Requirement               | Implementation                                                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Experiment builder wizard | Step indicator with `aria-label="Step {n} of {total}"`, `role="progressbar"`, keyboard navigation between steps   |
| Funnel chart              | `aria-label="Funnel chart: {stage} has {count} users ({pct}%)"`, data table below                                 |
| Cohort retention grid     | `role="grid"`, `aria-label="Retention by cohort"`, cells with `aria-label="Cohort {week}, Week {n}: {rate}%"`     |
| Growth model simulator    | Input fields with `aria-label`, output charts with accessible data tables, `aria-live="polite"` on results update |
| ICE score sliders         | `role="slider"`, `aria-valuemin="1"`, `aria-valuemax="10"`, `aria-valuenow={value}`                               |
| Referral fraud queue      | Action buttons with clear `aria-label`, status with `aria-live="polite"` on review complete                       |
| SEO content calendar      | Calendar navigation keyboard accessible, `aria-label` for each content item                                       |
| Drag-and-drop (if any)    | Keyboard reorder via Up/Down arrows, `aria-grabbed` states                                                        |
| Charts                    | All charts have `aria-label` descriptions, hidden data tables for screen readers                                  |
| Color coding              | Never rely on color alone — patterns/icons/text labels always accompany color indicators                          |

## 15. Error & Edge Case Catalog

| Code       | Scenario                                                 | Response               | User Message                                                                         | Recovery                      |
| ---------- | -------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------ | ----------------------------- |
| GR-ERR-001 | Experiment launch fails (validation)                     | Front-end validation   | "Fix the following before launching: {errors}"                                       | Fix listed items              |
| GR-ERR-002 | Experiment significance never reached after max duration | Auto-stop              | "Experiment did not reach significance within {duration} days. No clear winner."     | Review and iterate            |
| GR-ERR-003 | Referral link generation fails (rate limit)              | Queue for batch        | "Generating {count} links. This may take a moment."                                  | Background job                |
| GR-ERR-004 | Cohort data insufficient for date range                  | Return partial data    | "Limited data for selected period. Expand range for better analysis."                | Adjust date range             |
| GR-ERR-005 | Attribution model with insufficient touch data           | Fallback to last-touch | "Insufficient touch data for {model} model. Using Last Touch as fallback."           | Switch models                 |
| GR-ERR-006 | SEO API integration disconnected                         | Service degradation    | "SEO tool integration disconnected. Data may be stale. [Reconnect]"                  | Reconnect API key             |
| GR-ERR-007 | Growth model division by zero (e.g., 0 visitors)         | Validation error       | "Input values must be positive and non-zero."                                        | Correct inputs                |
| GR-ERR-008 | Experiment traffic allocation must sum to 100%           | Validation             | "Traffic allocation must total 100%."                                                | Adjust sliders                |
| GR-ERR-009 | Referral code collision                                  | Auto-generate new code | "A conflict occurred. A new code has been generated."                                | Use new code                  |
| GR-ERR-010 | Funnel data processing timeout                           | Return cached data     | "Funnel data is being refreshed. Showing previous data."                             | Wait and retry                |
| GR-ERR-011 | Duplicate experiment name                                | Validation             | "An experiment with this name already exists."                                       | Use unique name               |
| GR-ERR-012 | SEO keyword bulk upload format error                     | Per-row error report   | "{X} of {Y} keywords imported. {Z} failed: {errors}"                                 | Fix and re-upload failed rows |
| GR-ERR-013 | Referral reward value exceeds budget                     | Warning                | "Total projected referral cost ({cost}) exceeds monthly referral budget ({budget})." | Adjust reward or budget       |
