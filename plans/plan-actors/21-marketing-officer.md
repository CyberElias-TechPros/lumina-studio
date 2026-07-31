# Actor: Marketing Officer

## 1. Identity & Role Definition

**Actor ID:** `marketing_officer`  
**Display Name:** Marketing Officer  
**Description:** Manages all marketing operations for Cyber Elias Academy — digital campaigns, content strategy, email marketing, landing pages, lead generation, SEO, social media, and performance analytics. Owns the marketing funnel from awareness through lead conversion to enrollment handoff.  
**System Role:** `marketing_staff`  
**Hierarchy:** Reports to Director of Marketing (role: `marketing_director`)  
**Location:** Web dashboard only  
**Session Timeout:** 45 minutes of inactivity  
**Concurrent Sessions:** 3 max

## 2. Primary Goals & Success KPIs

| Goal                             | KPI                                      | Target         | Measurement                            |
| -------------------------------- | ---------------------------------------- | -------------- | -------------------------------------- |
| Generate qualified leads         | Cost per lead (CPL)                      | < $15          | `marketing_campaign_leads` + cost data |
| Convert leads to applicants      | Lead-to-application conversion rate      | > 8%           | `leads` → `applications` matching      |
| Optimize campaign ROI            | Return on ad spend (ROAS)                | > 4:1          | Revenue tracking ÷ ad spend            |
| Grow organic reach               | Organic traffic month-over-month         | +15%           | `seo_dashboard_metrics`                |
| Engage audience via content      | Content engagement rate (clicks, shares) | > 5%           | Content analytics                      |
| Email marketing effectiveness    | Email open rate                          | > 25%          | `email_campaign_stats`                 |
| Social media growth              | Follower growth rate                     | +10%/month     | Social API integrations                |
| Reduce customer acquisition cost | CAC trend                                | Decreasing MoM | `analytics_cac`                        |

## 3. Complete Screen Inventory

### 3.1 Marketing Hub (`/marketing`)

**Wireframe:** Central dashboard with KPI cards, campaign performance sparklines, recent activity, and quick-create toolbar.

**UI Fields/Components:**

- **Header:** "Marketing Hub" with breadcrumb (Home > Marketing)
- **KPI Cards Row:**
  - Total Leads (count, trend), Cost Per Lead (amount, trend), Conversion Rate (%, trend), Active Campaigns (count)
  - Each card: Icon, Title, Value, Sparkline chart (7-day), Change indicator
- **Campaign Performance Widget:** Top 5 campaigns by spend with progress bars (spent vs budget, leads generated)
- **Content Calendar Preview:** Upcoming 5 days of scheduled content with type icon, title, date
- **Recent Activity Feed:** Last 15 actions (campaign launched, email sent, lead captured, etc.)
- **Quick Actions:**
  - "➕ New Campaign" → `/marketing/campaigns/new`
  - "📧 Create Email" → `/marketing/email/new`
  - "📄 New Landing Page" → `/marketing/landing-pages/new`
  - "📊 View Analytics" → `/marketing/analytics`

**Data Bindings:**

- KPI cards: `GET /api/marketing/dashboard/kpis`
- Campaign sparklines: `GET /api/marketing/dashboard/top-campaigns`
- Content preview: `GET /api/marketing/content-calendar/preview`
- Activity: `GET /api/marketing/dashboard/activity`

**States:**

| State   | Behavior                                                                           |
| ------- | ---------------------------------------------------------------------------------- |
| Loading | Skeleton KPIs (5 shimmer blocks), sparkline placeholders                           |
| Empty   | First-time: "Welcome to Marketing Hub! Launch your first campaign to get started." |
| Error   | "Unable to load marketing dashboard. [Retry]" with stale cache fallback            |

### 3.2 Campaigns (`/marketing/campaigns`)

**Wireframe:** Campaign list in table/grid view with status filter tabs and campaign creation flow.

**Top Section:**

- **Filter Tabs:** All, Active, Draft, Paused, Completed, Archived
- **Search:** Campaign name, ID
- **Sort:** Created (desc default), Budget, Spend, Leads
- **"➕ New Campaign" button**

**Campaign Table:**

- Columns: Campaign Name, Type (Social/Email/Search/Display/Content), Status badge, Budget (planned), Spend (actual), Budget Used (%), Start - End Dates, Leads Generated, ROAS, Actions (Edit, Pause, Duplicate, Archive)
- Row click → campaign detail page

**Campaign Creation Wizard (Modal/Page):**

- **Step 1 — Details:** Name, Type, Objective (Awareness/Consideration/Conversion/Retention), Budget (planned), Start/End dates, Description
- **Step 2 — Targeting:** Audience (JSON builder: age range, location, interests, behaviors), Lookalike source (if applicable), Exclusions
- **Step 3 — Channels:** Channel-specific settings (e.g., Facebook Ad Account, Google Ads CID, LinkedIn Campaign Group)
- **Step 4 — Creatives:** Upload assets (images, video, copy), A/B test variants (max 3)
- **Step 5 — Review & Launch:** Summary of all settings, "Save as Draft"/"Launch Campaign"

**Campaign Detail Page (`/marketing/campaigns/{id}`):**

- **Header:** Campaign name, status badge, edit button
- **Performance Charts:** Impressions, Clicks, CTR, Conversions, Spend (daily bar chart, cumulative line overlay)
- **Audience Breakdown:** Demographics pie, device/OS/geography tables
- **Creative Performance:** Per-variant stats (impressions, clicks, CTR, conversions)
- **Lead List:** Leads attributed to this campaign with source, date, status
- **Actions:** Pause/Resume, Duplicate, Edit Budget, End Campaign

**Data Bindings:**

- List: `GET /api/marketing/campaigns?status={status}&search={q}&sort={field}&order={asc|desc}`
- Create: `POST /api/marketing/campaigns`
- Detail: `GET /api/marketing/campaigns/{id}`
- Update: `PATCH /api/marketing/campaigns/{id}`
- Pause/Resume: `POST /api/marketing/campaigns/{id}/toggle`

**States:**

| State                | Behavior                                                                  |
| -------------------- | ------------------------------------------------------------------------- |
| Loading              | Table skeleton (8 rows)                                                   |
| Empty (no campaigns) | "No campaigns yet. Create your first campaign to start generating leads." |
| Empty (filtered)     | "No campaigns match your filters. [Clear Filters]"                        |
| Campaign paused      | Row shows "Paused" badge with "Resume" action                             |
| Budget exceeded      | Warning: "Campaign has spent 100% of budget. [Increase Budget] [Pause]"   |

### 3.3 Content Calendar (`/marketing/content-calendar`)

**Wireframe:** Month calendar grid with content items as cards. Side panel for detail/create.

**Calendar View:**

- Month/Week/List toggles (top)
- Navigation: Prev/Next month, "Today" button
- Each day cell: allows dropping content items, shows count badge if >3 items
- Content Card: Time (if scheduled), Title, Type icon (Blog/Social/Email/Video/Infographic), Status color (Draft=gray, Scheduled=blue, Published=green), Platform icon

**Content Create/Edit Modal:**

- Title, Type dropdown, Platform (Instagram/Facebook/LinkedIn/Twitter/TikTok/YouTube/Blog/Email), Scheduled Date/Time
- Content body (rich text for blogs, short text for social)
- Media upload (images, video, carousel)
- Tags, Campaign association
- Status: Draft / Schedule / Publish Now
- Approver selection (if approval workflow enabled)

**Content Detail Side Panel:**

- Full content preview, publish history, engagement metrics (if published)
- Edit, Duplicate, Archive actions
- Approval status (if applicable)

**Data Bindings:**

- Calendar: `GET /api/marketing/content-calendar?month={yyyy-mm}`
- Create: `POST /api/marketing/content-calendar`
- Update: `PATCH /api/marketing/content-calendar/{id}`
- Publish: `POST /api/marketing/content-calendar/{id}/publish`

**States:**

| State                              | Behavior                                                   |
| ---------------------------------- | ---------------------------------------------------------- |
| Loading                            | Calendar grid skeleton (28-31 shimmer day cells)           |
| Empty month                        | No content items, "Drag content ideas here" placeholder    |
| Date in past                       | Warning on scheduled dates: "Selected date is in the past" |
| Conflict (same time same platform) | "Content already scheduled for [platform] at this time"    |

### 3.4 Email Marketing (`/marketing/email`)

**Wireframe:** Email campaign management — list view with status, composer with drag-drop editor, analytics.

**Email Campaigns List:**

- Table: Name, Subject, Status (Draft/Scheduled/Sending/Sent), List size, Open rate, Click rate, Bounce rate, Sent date, Actions
- "➕ New Email" button

**Email Composer (full page):**

- **Settings sidebar:** Sender name, Sender email, Reply-to, List selection (from segments), Suppression list
- **Subject line input** with A/B test toggle (variant B subject)
- **Preheader text input**
- **Drag-drop Builder:**
  - Blocks: Header, Text, Image, Button, Divider, Spacer, Social Icons, Footer, HTML embed
  - Each block: click to edit properties (alignment, padding, background, font)
  - Drag to reorder blocks
- **Preview Tabs:** Desktop preview, Mobile preview, Plain text preview
- **Send Test button** → sends to test email list
- **Schedule Send:** Date/time picker with timezone
- **Send Now / Save Draft**

**Email Campaign Detail:**

- Performance stats: Sent, Delivered, Bounced, Opened, Clicked, Unsubscribed, Spam complaints
- Timeline chart of opens/clicks over time
- Click map (which links got most clicks)
- List breakdown by segment
- A/B test results (if applicable)

**Data Bindings:**

- Campaigns: `GET /api/marketing/email?status={status}`
- Create: `POST /api/marketing/email`
- Detail: `GET /api/marketing/email/{id}`
- Stats: `GET /api/marketing/email/{id}/stats`
- Send test: `POST /api/marketing/email/{id}/test`
- Lists: `GET /api/marketing/email/lists`

**States:**

| State                  | Behavior                                                                |
| ---------------------- | ----------------------------------------------------------------------- |
| Loading                | List skeleton + composer loading                                        |
| Empty lists            | "No email lists. Create a list from imported contacts."                 |
| Sending in progress    | Progress bar: "Sending to {sent}/{total} recipients"                    |
| High bounce rate (>5%) | Warning: "Bounce rate is {n}%. Review your list for invalid addresses." |

### 3.5 Landing Page Builder (`/marketing/landing-pages`)

**Wireframe:** List of landing pages with status, builder with live preview, publish controls.

**Landing Page List:**

- Table: Page Name, URL slug, Status (Draft/Published/Archived), Campaign, Views, Conversions, Conversion Rate, Last Modified, Actions
- "➕ New Landing Page" button

**Landing Page Builder:**

- **Left Panel:** Component palette (Hero, Features, Testimonials, Pricing, FAQ, CTA Button, Form, Image, Video, Footer)
- **Center:** Live preview (drag components from palette, resize, reorder)
- **Properties Panel (right):** Component-specific settings (text, colors, images, padding, animation)
- **Top bar:** Device preview toggle (Desktop/Tablet/Mobile), Undo/Redo, Save, Publish
- **SEO Section:** Page title, Meta description, OG image, Custom URL slug
- **Form builder (within page):** Add form fields (Name, Email, Phone, Program Interest, etc.), set thank-you page/message, integration with CRM/email
- **Tracking:** Google Analytics ID, Facebook Pixel, Custom JS/CSS head/footer

**Data Bindings:**

- Pages list: `GET /api/marketing/landing-pages`
- Create: `POST /api/marketing/landing-pages`
- Detail: `GET /api/marketing/landing-pages/{id}`
- Save: `PUT /api/marketing/landing-pages/{id}/content`
- Publish: `POST /api/marketing/landing-pages/{id}/publish`
- Unpublish: `POST /api/marketing/landing-pages/{id}/unpublish`

**States:**

| State            | Behavior                                                    |
| ---------------- | ----------------------------------------------------------- |
| Loading          | Builder skeleton with placeholder preview                   |
| Empty page (new) | Blank canvas with "Drag components here" hint               |
| Autosave         | "Saving..." → "Saved" indicator every 30s                   |
| Publish conflict | "This page has unpublished changes. [View Draft] [Publish]" |

### 3.6 Lead Management (`/marketing/leads`)

**Wireframe:** Lead database table with filters, lead detail side panel, import/export.

**Lead Table:**

- Columns: Name, Email, Phone, Source (campaign/channel), Program Interest, Status (New/Contacted/Qualified/Converted/Lost), Score, Created Date, Last Activity
- Bulk select → Assign To, Change Status, Export, Add to Campaign
- Filters: Source, Status, Program Interest, Date Range, Score Range
- Search: name, email, phone
- **"➕ Add Lead" button** → manual entry form
- **"📥 Import" button** → CSV/Excel import modal with field mapping
- **"📤 Export" button** → Export filtered leads

**Lead Detail Side Panel:**

- **Info:** Name, Email, Phone, Company/Institution, Title/Role
- **Source Attribution:** Campaign, Channel, Landing Page, UTM parameters
- **Activity Timeline:** Page visits, email opens, form submissions, calls
- **Status Workflow:** Dropdown + notes required for certain transitions
- **Score:** Lead score (0-100) with breakdown (demographic + behavior + engagement)
- **Notes:** Internal notes (textarea, with "@mentions" for team)
- **Tasks:** Create follow-up task (type, due date, assignee)
- **Communication:** Send email directly, log call, log meeting

**Data Bindings:**

- Leads list: `GET /api/marketing/leads?filters`
- Create: `POST /api/marketing/leads`
- Detail: `GET /api/marketing/leads/{id}`
- Update: `PATCH /api/marketing/leads/{id}`
- Import: `POST /api/marketing/leads/import` (multipart CSV)
- Export: `GET /api/marketing/leads/export?format=csv`

**States:**

| State               | Behavior                                                        |
| ------------------- | --------------------------------------------------------------- |
| Loading             | Table skeleton + panel shimmer                                  |
| Empty               | "No leads yet. Leads will appear when campaigns generate them." |
| Import processing   | Progress: "Importing {count} leads..." with real-time row count |
| Duplicate on import | "Skipped {n} duplicate emails. [Download Duplicates Report]"    |

### 3.7 SEO Dashboard (`/marketing/seo`)

**Wireframe:** SEO analytics dashboard with keyword rankings, site audit, page performance, recommendations.

**Top Section — Overview Cards:**

- Organic Traffic (visits, change %), Keyword Rankings (avg position, total tracked), Indexed Pages, Backlinks
- Each card: sparkline 30-day trend

**Keyword Rankings Tab:**

- Table: Keyword, Position (current + change arrow), Volume, CPC, URL ranking, Last Updated
- Filters: Position range (1-3, 4-10, 11-20, 21-50, 50+), Search engine (Google, Bing)
- "➕ Add Keyword" button → modal to add keywords to track
- "📤 Export" button

**Site Audit Tab:**

- Audit score (0-100) with color
- Issues grouped by severity: Critical, Warning, Notice
- Per issue: Title, Description, Affected URL, Recommendation
- "Run Audit" button → triggers new audit (may take 1-5 min)
- Last audit date

**Page Performance Tab:**

- Table: Page URL, Title, Impressions, Clicks, CTR, Avg Position, Last Crawl
- Sorted by clicks (desc default)
- Click → detail modal with page-specific recommendations

**Content Recommendations Tab:**

- AI-generated suggestions: Title, Target keyword, Current gap, Expected impact (High/Med/Low)
- Based on content gap analysis vs competitor domains
- "Create Content" button → pre-fills content calendar with recommendation

**Data Bindings:**

- Overview: `GET /api/marketing/seo/overview`
- Keywords: `GET /api/marketing/seo/keywords`
- Audit: `GET /api/marketing/seo/audit`
- Run audit: `POST /api/marketing/seo/audit/run`
- Pages: `GET /api/marketing/seo/pages`
- Recommendations: `GET /api/marketing/seo/recommendations`

**States:**

| State                  | Behavior                                                    |
| ---------------------- | ----------------------------------------------------------- |
| Loading                | KPI skeletons + chart placeholders                          |
| No keywords tracked    | "Start tracking keywords by adding your first keyword."     |
| Audit in progress      | "Audit in progress. ETA ~3 minutes." with animated progress |
| Audit failed           | "Audit failed: [reason]. [Retry]"                           |
| No data (first 7 days) | "Collecting SEO data. Check back in [X] days for insights." |

### 3.8 Social Media Scheduler (`/marketing/social`)

**Wireframe:** Connected accounts manager, post composer, publishing queue, engagement dashboard.

**Connected Accounts:**

- Grid of platform cards: Facebook Page, Instagram, LinkedIn, Twitter/X, TikTok, YouTube
- Each card: Platform icon, Account name, Connection status (Connected/Expired/Error), "Connect"/"Reconnect" button
- "➕ Connect Account" button → OAuth flow

**Post Composer:**

- Platform selector (multi-select: post to multiple platforms at once)
- Post type: Image, Video, Carousel, Text, Link, Story (if Instagram/Facebook)
- Content input (rich text with emoji picker, hashtag suggestions)
- Media upload (image 1080x1080 recommended, video < 60s, < 100MB)
- Link preview (auto-fetches og:tags)
- Hashtag suggestions (AI-powered, trending)
- Location tag (optional)
- Schedule time / Post Now / Save as Draft
- Preview: Platform-specific preview (shows how it looks on each platform)
- Character counter per platform

**Publishing Queue:**

- Calendar/List view of scheduled posts
- Each item: Platform(s), Content preview (truncated), Schedule time, Status (Scheduled/Published/Failed)
- Drag to reschedule, Edit, Delete, Post Now override
- Filters: Platform, Status, Date Range

**Engagement Dashboard:**

- Aggregated metrics: Total followers, Total posts this month, Avg engagement rate, Top post
- Per-platform: Followers, Growth, Posts, Likes, Comments, Shares, Saves, Engagement rate
- Best time to post (AI analysis of past engagement data)

**Data Bindings:**

- Accounts: `GET /api/marketing/social/accounts`
- Connect: `GET /api/marketing/social/accounts/connect/{platform}` (OAuth redirect)
- Create post: `POST /api/marketing/social/posts`
- Queue: `GET /api/marketing/social/queue`
- Publish: `POST /api/marketing/social/posts/{id}/publish`
- Engagement: `GET /api/marketing/social/engagement`

**States:**

| State                  | Behavior                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------- |
| Loading                | Account card skeletons + composer disabled                                         |
| No accounts connected  | Empty state: "Connect your social accounts to start posting." with connect buttons |
| Token expired          | Account card shows "Expired — Reconnect"                                           |
| Upload too large       | "Video exceeds 100MB limit. Compress and retry."                                   |
| Post failed to publish | "Failed to publish to [Platform]. Error: [reason]. [Retry] [Edit]"                 |

### 3.9 Analytics (`/marketing/analytics`)

**Wireframe:** Full analytics suite with date comparison, channel breakdown, funnel visualization, and export.

**Global Filters (persistent across analytics tabs):**

- Date Range: Presets (Last 7d, 30d, 90d, This Year, Custom)
- Comparison: Off / Previous Period / Year Over Year
- Channel filter: All, Paid Search, Organic Search, Social, Email, Direct, Referral
- Campaign filter

**Overview Tab:**

- Sessions, Users, Page Views, Bounce Rate, Avg Session Duration
- Line charts: Sessions over time, Users over time
- Top channels pie chart
- Top landing pages table

**Campaign Performance Tab:**

- Campaign comparison table: Impressions, Clicks, CTR, Conversions, Cost, CPC, CPA, ROAS
- Scatter plot: CPA vs Conversion Volume (bubble size = spend)
- Attribution model selector (Last Click, First Click, Linear, Time Decay, Position Based)

**CAC & ROAS Tab:**

- Customer Acquisition Cost: Total marketing spend / New customers (time series chart)
- Return on Ad Spend: Revenue / Ad spend (time series chart)
- CAC by channel (bar chart)
- ROAS by channel (bar chart)
- LTV:CAC ratio (if customer lifetime value data available)

**Attribution Tab:**

- Attribution path: Sankey diagram showing touchpoint sequences
- Time to conversion: Histogram of days from first touch to conversion
- Multi-touch attribution table: Channel, First Touch %, Last Touch %, Linear %, Time Decay %, Position Based %

**Funnel Tab:**

- Marketing funnel: Visit → Lead → MQL → SQL → Opportunity → Customer
- Conversion rates between each stage
- Drop-off analysis
- Funnel by channel/segment

**Data Bindings:**
All analytics endpoints under `GET /api/marketing/analytics/{section}` with query params for filters.

**States:**

| State         | Behavior                                                        |
| ------------- | --------------------------------------------------------------- |
| Loading       | Full chart skeletons (5-6 skeleton blocks)                      |
| No data       | "No data available for the selected filters and date range."    |
| Large dataset | Chart auto-aggregates (daily → weekly → monthly based on range) |
| Export        | "Exporting [format]..." → download file                         |

### 3.10 Reports (`/marketing/reports`)

**Wireframe:** Pre-built and custom report templates with scheduling.

**Report Types:**

- Monthly Marketing Performance Report
- Campaign ROI Analysis
- Lead Source Report
- Email Marketing Performance
- Social Media Monthly Report
- SEO Monthly Report
- Content Performance Report
- Custom Report Builder

**Report Builder:**

- Drag-drop widget selection: Charts, Tables, KPIs, Text blocks
- Widget configuration: Data source, Date range, Filters, Chart type, Size
- Preview mode
- Save as template / Generate now / Schedule recurring

**Schedule Report Modal:**

- Report template, Format (PDF/CSV/HTML), Recipients (email list), Frequency (Daily/Weekly/Monthly/Quarterly), Day of week/month, Time, Active toggle

**Data Bindings:**

- Templates: `GET /api/marketing/reports/templates`
- Generate: `POST /api/marketing/reports/generate`
- Schedule: `POST /api/marketing/reports/schedule`
- Scheduled list: `GET /api/marketing/reports/schedules`

## 4. Full Database Schema

```typescript
// ============================================================
// schema/marketing/index.ts
// ============================================================
import { sqliteTable, text, integer, real, uniqueIndex, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ─────────────────────────────────────────────
// 1. CAMPAIGNS
// ─────────────────────────────────────────────
export const campaigns = sqliteTable("marketing_campaigns", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  type: text("type", {
    enum: ["social", "email", "search", "display", "content", "event", "other"],
  }).notNull(),
  objective: text("objective", {
    enum: ["awareness", "consideration", "conversion", "retention"],
  }).notNull(),
  status: text("status", { enum: ["draft", "active", "paused", "completed", "archived"] })
    .notNull()
    .default("draft"),
  // Budget
  plannedBudget: real("planned_budget").default(0),
  actualSpend: real("actual_spend").default(0),
  currency: text("currency").default("USD"),
  // Schedule
  startDate: text("start_date"), // ISO date
  endDate: text("end_date"), // ISO date
  // Targeting (JSON)
  targeting: text("targeting", { mode: "json" }).$type<CampaignTargeting>().default({}),
  // Channel config (JSON)
  channelConfig: text("channel_config", { mode: "json" })
    .$type<Record<string, unknown>>()
    .default({}),
  // Creatives (JSON array)
  creatives: text("creatives", { mode: "json" }).$type<CampaignCreative[]>().default([]),
  // Performance snapshot (cached)
  impressions: integer("impressions").default(0),
  clicks: integer("clicks").default(0),
  conversions: integer("conversions").default(0),
  leadsGenerated: integer("leads_generated").default(0),
  roas: real("roas").default(0),
  // Metadata
  description: text("description"),
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
// 2. LEADS
// ─────────────────────────────────────────────
export const leads = sqliteTable("marketing_leads", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  jobTitle: text("job_title"),
  // Source attribution
  source: text("source", {
    enum: [
      "social_media",
      "email",
      "search",
      "referral",
      "website",
      "event",
      "paid_ad",
      "partner",
      "other",
    ],
  }),
  sourceDetail: text("source_detail"),
  campaignId: text("campaign_id").references(() => campaigns.id),
  landingPageId: text("landing_page_id").references(() => landingPages.id),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmContent: text("utm_content"),
  utmTerm: text("utm_term"),
  // Profile
  programInterest: text("program_interest"),
  country: text("country"),
  city: text("city"),
  // Status
  status: text("status", { enum: ["new", "contacted", "qualified", "converted", "lost"] })
    .notNull()
    .default("new"),
  leadScore: integer("lead_score").default(0),
  scoreBreakdown: text("score_breakdown", { mode: "json" }).$type<ScoreBreakdown>().default({}),
  assignedToId: text("assigned_to_id").references(() => users.id),
  // Activity
  lastActivityAt: text("last_activity_at"),
  emailOpened: integer("email_opened", { mode: "boolean" }).default(false),
  emailClicked: integer("email_clicked", { mode: "boolean" }).default(false),
  websiteVisits: integer("website_visits").default(0),
  formSubmissions: integer("form_submissions").default(0),
  // Timestamps
  convertedAt: text("converted_at"),
  applicationId: text("application_id"), // linked application if converted
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
// 3. LANDING PAGES
// ─────────────────────────────────────────────
export const landingPages = sqliteTable("marketing_landing_pages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  title: text("title"),
  status: text("status", { enum: ["draft", "published", "archived"] })
    .notNull()
    .default("draft"),
  // Content (JSON — full page structure)
  content: text("content", { mode: "json" }).$type<PageContent>().default({}),
  // SEO
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ogImageUrl: text("og_image_url"),
  // Tracking
  gaId: text("ga_id"),
  fbPixelId: text("fb_pixel_id"),
  customHead: text("custom_head"),
  customFooter: text("custom_footer"),
  // Stats
  views: integer("views").default(0),
  conversions: integer("conversions").default(0),
  conversionRate: real("conversion_rate").default(0),
  // Metadata
  campaignId: text("campaign_id").references(() => campaigns.id),
  publishedAt: text("published_at"),
  publishedById: text("published_by_id").references(() => users.id),
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
// 4. EMAIL CAMPAIGNS
// ─────────────────────────────────────────────
export const emailCampaigns = sqliteTable("marketing_email_campaigns", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  subjectB: text("subject_b"), // A/B test variant
  preheader: text("preheader"),
  senderName: text("sender_name").notNull(),
  senderEmail: text("sender_email").notNull(),
  replyTo: text("reply_to"),
  // Content (JSON — drag-drop builder structure)
  content: text("content", { mode: "json" }).$type<EmailContent>().default({}),
  // List
  listId: text("list_id").references(() => emailLists.id),
  suppressionListIds: text("suppression_list_ids", { mode: "json" }).$type<string[]>().default([]),
  // Status
  status: text("status", { enum: ["draft", "scheduled", "sending", "sent", "paused", "failed"] })
    .notNull()
    .default("draft"),
  scheduledSendAt: text("scheduled_send_at"),
  sentAt: text("sent_at"),
  // Stats
  totalRecipients: integer("total_recipients").default(0),
  deliveredCount: integer("delivered_count").default(0),
  bouncedCount: integer("bounced_count").default(0),
  openedCount: integer("opened_count").default(0),
  clickedCount: integer("clicked_count").default(0),
  unsubscribedCount: integer("unsubscribed_count").default(0),
  spamCount: integer("spam_count").default(0),
  openRate: real("open_rate").default(0),
  clickRate: real("click_rate").default(0),
  bounceRate: real("bounce_rate").default(0),
  // A/B test
  winningVariant: text("winning_variant", { enum: ["a", "b"] }),
  aTestSize: integer("a_test_size").default(0), // percentage of list for test
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
// 5. EMAIL LISTS / SEGMENTS
// ─────────────────────────────────────────────
export const emailLists = sqliteTable("marketing_email_lists", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description"),
  totalContacts: integer("total_contacts").default(0),
  // Segment criteria (JSON — filter conditions)
  criteria: text("criteria", { mode: "json" }).$type<SegmentCriteria>().default({}),
  isDynamic: integer("is_dynamic", { mode: "boolean" }).default(true), // auto-updated vs static
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
// 6. EMAIL CONTACTS (list membership)
// ─────────────────────────────────────────────
export const emailContacts = sqliteTable("marketing_email_contacts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  // Custom fields (JSON)
  customFields: text("custom_fields", { mode: "json" })
    .$type<Record<string, unknown>>()
    .default({}),
  // Status
  subscribed: integer("subscribed", { mode: "boolean" }).default(true),
  bounced: integer("bounced", { mode: "boolean" }).default(false),
  complained: integer("complained", { mode: "boolean" }).default(false),
  unsubscribedAt: text("unsubscribed_at"),
  // Consent
  consentGiven: integer("consent_given", { mode: "boolean" }).default(true),
  consentGivenAt: text("consent_given_at"),
  consentSource: text("consent_source"), // "landing_page", "import", "manual", "api"
  // Timestamps
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 7. SOCIAL MEDIA ACCOUNTS
// ─────────────────────────────────────────────
export const socialAccounts = sqliteTable("marketing_social_accounts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  platform: text("platform", {
    enum: ["facebook", "instagram", "linkedin", "twitter", "tiktok", "youtube"],
  }).notNull(),
  accountName: text("account_name").notNull(),
  accountId: text("account_id").notNull(), // platform user/page ID
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  tokenExpiresAt: text("token_expires_at"),
  status: text("status", { enum: ["connected", "expired", "error"] })
    .notNull()
    .default("connected"),
  followers: integer("followers").default(0),
  profileUrl: text("profile_url"),
  avatarUrl: text("avatar_url"),
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
// 8. SOCIAL MEDIA POSTS
// ─────────────────────────────────────────────
export const socialPosts = sqliteTable("marketing_social_posts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  accountIds: text("account_ids", { mode: "json" }).$type<string[]>().notNull(),
  content: text("content").notNull(),
  postType: text("post_type", { enum: ["image", "video", "carousel", "text", "link", "story"] })
    .notNull()
    .default("text"),
  mediaUrls: text("media_urls", { mode: "json" }).$type<string[]>().default([]),
  linkUrl: text("link_url"),
  hashtags: text("hashtags", { mode: "json" }).$type<string[]>().default([]),
  location: text("location"),
  status: text("status", { enum: ["draft", "scheduled", "published", "failed"] })
    .notNull()
    .default("draft"),
  scheduledAt: text("scheduled_at"),
  publishedAt: text("published_at"),
  // Engagement stats
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  shares: integer("shares").default(0),
  saves: integer("saves").default(0),
  impressions: integer("impressions").default(0),
  reach: integer("reach").default(0),
  engagementRate: real("engagement_rate").default(0),
  // Error tracking
  errorMessage: text("error_message"),
  // Metadata
  createdById: text("created_by_id").references(() => users.id),
  campaignId: text("campaign_id").references(() => campaigns.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 9. CONTENT CALENDAR
// ─────────────────────────────────────────────
export const contentCalendar = sqliteTable("marketing_content_calendar", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  type: text("type", {
    enum: ["blog", "social", "email", "video", "infographic", "podcast", "webinar", "other"],
  }).notNull(),
  platform: text("platform"), // specific social platform or "blog", "email", etc.
  content: text("content"),
  mediaUrls: text("media_urls", { mode: "json" }).$type<string[]>().default([]),
  scheduledDate: text("scheduled_date").notNull(),
  scheduledTime: text("scheduled_time"),
  status: text("status", { enum: ["idea", "draft", "scheduled", "published", "archived"] })
    .notNull()
    .default("idea"),
  publishedUrl: text("published_url"),
  tags: text("tags", { mode: "json" }).$type<string[]>().default([]),
  campaignId: text("campaign_id").references(() => campaigns.id),
  // Approval
  requiresApproval: integer("requires_approval", { mode: "boolean" }).default(false),
  approvedById: text("approved_by_id").references(() => users.id),
  approvedAt: text("approved_at"),
  // Engagement (post-publish)
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  shares: integer("shares").default(0),
  comments: integer("comments").default(0),
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
// 10. SEO KEYWORDS
// ─────────────────────────────────────────────
export const seoKeywords = sqliteTable("marketing_seo_keywords", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  keyword: text("keyword").notNull(),
  currentPosition: integer("current_position"),
  previousPosition: integer("previous_position"),
  bestPosition: integer("best_position"),
  volume: integer("volume"),
  cpc: real("cpc"),
  difficulty: integer("difficulty"), // 0-100
  url: text("url"),
  searchEngine: text("search_engine").default("google"),
  lastUpdated: text("last_updated"),
  isTracked: integer("is_tracked", { mode: "boolean" }).default(true),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 11. SEO AUDITS
// ─────────────────────────────────────────────
export const seoAudits = sqliteTable("marketing_seo_audits", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  score: integer("score"), // 0-100
  status: text("status", { enum: ["running", "completed", "failed"] })
    .notNull()
    .default("running"),
  issues: text("issues", { mode: "json" }).$type<SeoIssue[]>().default([]),
  startedAt: text("started_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  completedAt: text("completed_at"),
  errorMessage: text("error_message"),
});

// ─────────────────────────────────────────────
// 12. MARKETING ANALYTICS (aggregated daily)
// ─────────────────────────────────────────────
export const analyticsDaily = sqliteTable(
  "marketing_analytics_daily",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    date: text("date").notNull(),
    channel: text("channel", {
      enum: [
        "paid_search",
        "organic_search",
        "social",
        "email",
        "direct",
        "referral",
        "display",
        "other",
      ],
    }).notNull(),
    // Metrics
    impressions: integer("impressions").default(0),
    clicks: integer("clicks").default(0),
    ctr: real("ctr").default(0),
    sessions: integer("sessions").default(0),
    pageViews: integer("page_views").default(0),
    bounceRate: real("bounce_rate").default(0),
    avgSessionDuration: real("avg_session_duration").default(0), // seconds
    leads: integer("leads").default(0),
    conversions: integer("conversions").default(0),
    conversionRate: real("conversion_rate").default(0),
    cost: real("cost").default(0),
    revenue: real("revenue").default(0),
    roas: real("roas").default(0),
    cpc: real("cpc").default(0),
    cpa: real("cpa").default(0),
    cac: real("cac").default(0),
    // Unique constraint on (date, channel)
  },
  (table) => ({
    dateChannelIdx: uniqueIndex("idx_analytics_date_channel").on(table.date, table.channel),
  }),
);

// ─────────────────────────────────────────────
// Indexes
// ─────────────────────────────────────────────
export const leadsEmailIdx = uniqueIndex("idx_mktg_leads_email").on(leads.email);
export const leadsStatusIdx = index("idx_mktg_leads_status").on(leads.status);
export const leadsCampaignIdx = index("idx_mktg_leads_campaign").on(leads.campaignId);
export const leadsScoreIdx = index("idx_mktg_leads_score").on(leads.leadScore);
export const campaignsStatusIdx = index("idx_mktg_campaigns_status").on(campaigns.status);
export const campaignsTypeIdx = index("idx_mktg_campaigns_type").on(campaigns.type);
export const contentDateIdx = index("idx_mktg_content_date").on(contentCalendar.scheduledDate);
export const contentStatusIdx = index("idx_mktg_content_status").on(contentCalendar.status);
export const seoKeywordsIdx = index("idx_mktg_seo_keywords").on(seoKeywords.keyword);
export const emailStatusIdx = index("idx_mktg_email_status").on(emailCampaigns.status);
export const socialAccountPlatformIdx = index("idx_mktg_social_platform").on(
  socialAccounts.platform,
);
export const socialPostsStatusIdx = index("idx_mktg_social_posts_status").on(socialPosts.status);
export const analyticsDateIdx = index("idx_mktg_analytics_date").on(analyticsDaily.date);

// ─────────────────────────────────────────────
// TypeScript Types
// ─────────────────────────────────────────────
export interface CampaignTargeting {
  ageRange?: { min: number; max: number };
  genders?: string[];
  locations?: { country: string; city?: string; radius?: number }[];
  interests?: string[];
  behaviors?: string[];
  lookalikeSource?: string;
  exclusions?: { interests?: string[]; customAudiences?: string[] };
  customAudiences?: string[];
}

export interface CampaignCreative {
  id: string;
  type: "image" | "video" | "carousel" | "text";
  headline?: string;
  body?: string;
  cta?: string;
  mediaUrl?: string;
  destinationUrl?: string;
  variantLabel?: string; // A, B, C
}

export interface PageContent {
  components: PageComponent[];
  globalStyles?: Record<string, unknown>;
}

export interface PageComponent {
  id: string;
  type:
    | "hero"
    | "features"
    | "testimonials"
    | "pricing"
    | "faq"
    | "cta"
    | "form"
    | "image"
    | "video"
    | "text"
    | "footer";
  props: Record<string, unknown>;
  children?: string[];
}

export interface EmailContent {
  blocks: EmailBlock[];
  globalStyles?: Record<string, unknown>;
}

export interface EmailBlock {
  id: string;
  type:
    "header" | "text" | "image" | "button" | "divider" | "spacer" | "social" | "footer" | "html";
  props: Record<string, unknown>;
}

export interface SegmentCriteria {
  conditions: SegmentCondition[];
  logic: "and" | "or";
}

export interface SegmentCondition {
  field: string;
  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "greater_than"
    | "less_than"
    | "in"
    | "not_in"
    | "is_set"
    | "is_not_set";
  value: unknown;
}

export interface SeoIssue {
  id: string;
  type: "critical" | "warning" | "notice";
  title: string;
  description: string;
  affectedUrl?: string;
  recommendation: string;
}

export interface ScoreBreakdown {
  demographic: number;
  behavioral: number;
  engagement: number;
  total: number;
}
```

## 5. Complete API Contract

### 5.1 Campaign Endpoints

#### `GET /api/marketing/campaigns`

**Auth:** `marketing_staff` or `marketing_director`

**Query:**

```typescript
{ status?: string; search?: string; type?: string; sort?: string; order?: string; limit?: number; offset?: number; }
```

**Response `200`:**

```typescript
interface CampaignListResponse {
  items: CampaignListItem[];
  total: number;
  hasMore: boolean;
}

interface CampaignListItem {
  id: string;
  name: string;
  type: string;
  objective: string;
  status: string;
  plannedBudget: number;
  actualSpend: number;
  budgetUsedPercent: number;
  startDate?: string;
  endDate?: string;
  impressions: number;
  clicks: number;
  leadsGenerated: number;
  roas: number;
  createdAt: string;
}
```

#### `POST /api/marketing/campaigns`

**Request:**

```typescript
interface CreateCampaignRequest {
  name: string; // min 1, max 200
  type: string;
  objective: string;
  plannedBudget?: number; // >= 0
  currency?: string;
  startDate?: string;
  endDate?: string;
  targeting?: CampaignTargeting;
  channelConfig?: Record<string, unknown>;
  creatives?: CampaignCreative[];
  description?: string;
}
```

**Response `201`: `{ id: string; }`**

### 5.2 Lead Endpoints

#### `GET /api/marketing/leads`

**Query:**

```typescript
{ status?: string; source?: string; campaignId?: string; programInterest?: string; search?: string; scoreMin?: number; scoreMax?: number; dateFrom?: string; dateTo?: string; limit?: number; offset?: number; }
```

**Response `200`:**

```typescript
interface LeadListResponse {
  items: LeadListItem[];
  total: number;
  hasMore: boolean;
}

interface LeadListItem {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  source?: string;
  campaignName?: string;
  programInterest?: string;
  status: string;
  leadScore: number;
  createdAt: string;
  lastActivityAt?: string;
  assignedTo?: { id: string; name: string };
}
```

#### `POST /api/marketing/leads/import`

**Request:** `multipart/form-data` with CSV file  
**Response `200`:**

```typescript
{
  imported: number;
  skipped: number;
  errors: {
    row: number;
    message: string;
  }
  [];
}
```

### 5.3 Landing Page Endpoints

#### `POST /api/marketing/landing-pages`

**Request:**

```typescript
{ name: string; slug: string; title?: string; campaignId?: string; }
```

**Response `201`: `{ id: string; }`**

#### `PUT /api/marketing/landing-pages/{id}/content`

**Request:**

```typescript
{ content: PageContent; metaTitle?: string; metaDescription?: string; ogImageUrl?: string; gaId?: string; fbPixelId?: string; customHead?: string; customFooter?: string; }
```

**Response `200`: `{ success: true; }`**

### 5.4 Email Endpoints

#### `POST /api/marketing/email`

**Request:**

```typescript
interface CreateEmailCampaignRequest {
  name: string;
  subject: string;
  subjectB?: string;
  preheader?: string;
  senderName: string;
  senderEmail: string;
  replyTo?: string;
  content: EmailContent;
  listId: string;
  suppressionListIds?: string[];
  scheduledSendAt?: string;
  aTestSize?: number; // 0-50 (percentage)
}
```

**Response `201`: `{ id: string; }`**

#### `GET /api/marketing/email/{id}/stats`

**Response `200`:**

```typescript
interface EmailStatsResponse {
  totalRecipients: number;
  deliveredCount: number;
  deliveredRate: number;
  bouncedCount: number;
  bounceRate: number;
  openedCount: number;
  openRate: number;
  clickedCount: number;
  clickRate: number;
  unsubscribedCount: number;
  unsubscribedRate: number;
  spamCount: number;
  spamRate: number;
  clickMap: { link: string; clicks: number }[];
  timeline: { date: string; opens: number; clicks: number }[];
  aTestResult?: {
    variantA: { openRate: number; clickRate: number };
    variantB: { openRate: number; clickRate: number };
    winner: "a" | "b" | "tie";
  };
}
```

### 5.5 Social Endpoints

#### `POST /api/marketing/social/posts`

**Request:**

```typescript
interface CreateSocialPostRequest {
  accountIds: string[];
  content: string;
  postType: string;
  mediaUrls?: string[];
  linkUrl?: string;
  hashtags?: string[];
  location?: string;
  scheduledAt?: string; // omit for immediate post
}
```

**Response `201: `{ id: string; status: string; }`**

### 5.6 SEO Endpoints

#### `GET /api/marketing/seo/overview`

**Response `200`:**

```typescript
interface SeoOverviewResponse {
  organicTraffic: number;
  organicTrafficChange: number;
  avgKeywordPosition: number;
  keywordsTracked: number;
  indexedPages: number;
  backlinks: number;
  auditScore?: number;
}
```

### 5.7 Analytics Endpoints

#### `GET /api/marketing/analytics/overview`

**Query:**

```typescript
{ startDate: string; endDate: string; compare?: string; channel?: string; }
```

**Response `200`:**

```typescript
interface AnalyticsOverviewResponse {
  sessions: number;
  users: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  sessionsChart: { date: string; value: number }[];
  usersChart: { date: string; value: number }[];
  topChannels: { channel: string; sessions: number; percentage: number }[];
  topLandingPages: { url: string; views: number }[];
}
```

### 5.8 Report Endpoints

#### `POST /api/marketing/reports/generate`

**Request:**

```typescript
interface GenerateReportRequest {
  templateId: string;
  format: "pdf" | "csv" | "html";
  filters?: Record<string, string>;
}
```

**Response `200: `{ downloadUrl: string; expiresAt: string; }`**

## 6. Component Tree

```
<MarketingLayout>
  ├── <MarketingHub />
  │   ├── <MarketingKpiCardGrid>
  │   │   └── <KpiCard *ngFor />
  │   ├── <TopCampaignsWidget />
  │   ├── <ContentCalendarPreview />
  │   ├── <MarketingActivityFeed />
  │   └── <QuickActionsToolbar />
  │
  ├── <CampaignsPage>
  │   ├── <CampaignFilters />
  │   ├── <CampaignTable />
  │   ├── <CampaignCreateWizard>
  │   │   ├── <WizardStepDetails />
  │   │   ├── <WizardStepTargeting />
  │   │   ├── <WizardStepChannels />
  │   │   ├── <WizardStepCreatives />
  │   │   └── <WizardStepReview />
  │   └── <CampaignDetail>
  │       ├── <CampaignHeader />
  │       ├── <CampaignPerformanceChart />
  │       ├── <AudienceBreakdown />
  │       ├── <CreativePerformanceTable />
  │       └── <CampaignLeadList />
  │
  ├── <ContentCalendarPage>
  │   ├── <CalendarToolbar />
  │   ├── <CalendarGrid />
  │   ├── <ContentCreateEditModal />
  │   └── <ContentDetailPanel />
  │
  ├── <EmailMarketingPage>
  │   ├── <EmailCampaignList />
  │   ├── <EmailComposer>
  │   │   ├── <EmailSettingsSidebar />
  │   │   ├── <SubjectLineInput />
  │   │   ├── <DragDropBuilder />
  │   │   └── <EmailPreview />
  │   └── <EmailCampaignDetail>
  │       ├── <EmailStatsCards />
  │       ├── <EmailTimelineChart />
  │       └── <ClickMap />
  │
  ├── <LandingPageBuilder>
  │   ├── <LandingPageList />
  │   └── <PageBuilder>
  │       ├── <ComponentPalette />
  │       ├── <LivePreview />
  │       ├── <PropertiesPanel />
  │       └── <SeoSettings />
  │
  ├── <LeadManagementPage>
  │   ├── <LeadTable />
  │   ├── <LeadImportModal />
  │   └── <LeadDetailPanel>
  │       ├── <LeadInfo />
  │       ├── <LeadActivityTimeline />
  │       ├── <LeadScoreDisplay />
  │       ├── <LeadNotes />
  │       └── <LeadTasks />
  │
  ├── <SeoDashboard>
  │   ├── <SeoOverviewCards />
  │   ├── <KeywordTrackerTable />
  │   ├── <SiteAuditPanel />
  │   ├── <PagePerformanceTable />
  │   └── <ContentRecommendations />
  │
  ├── <SocialMediaScheduler>
  │   ├── <ConnectedAccounts />
  │   ├── <SocialPostComposer />
  │   ├── <PublishingQueue />
  │   └── <EngagementDashboard />
  │
  ├── <MarketingAnalytics>
  │   ├── <AnalyticsOverview />
  │   ├── <CampaignPerformance />
  │   ├── <CacRoasTab />
  │   ├── <AttributionTab />
  │   └── <FunnelTab />
  │
  └── <MarketingReports>
      ├── <ReportTemplateGrid />
      ├── <ReportBuilder />
      └── <ScheduleReportModal />
```

## 7. Exhaustive User Journeys

### Journey 1: Launch a Multi-Channel Campaign

1. **MO** logs in → `/marketing` hub → KPIs show current performance
2. **MO** clicks "➕ New Campaign"
3. Step 1: Name "Summer Enrollment Push 2026", Type "Social + Search", Objective "Conversion"
4. Budget: $15,000, Start July 1 — Aug 31
5. Step 2: Targeting — Age 18-35, Locations US/Canada/UK, Interests "Online Education, Career Change"
6. Step 3: Channels — Facebook Ads (Ad Account #123), Google Ads (CID #456)
7. Step 4: Creatives — Upload 3 image variants, 2 headline variants
8. Step 5: Review → "Launch Campaign"
9. Campaign status → "active", appears in campaigns list
10. Pixels fire, leads start flowing into Lead Management

### Journey 2: Email Campaign Creation and Analysis

1. **MO** → `/marketing/email` → "➕ New Email"
2. Selects list "Website Leads Q3 2026"
3. Subject: "Unlock Your Future at Cyber Elias Academy", Preheader: "Scholarships available"
4. Builds email: Hero image → Text block → CTA Button "Apply Now" → Footer
5. Sends test to self → reviews mobile preview → adjusts padding
6. Schedules for Tuesday 10:00 AM EST
7. Campaign sends → real-time stats: 40% open, 12% click rate
8. Analyzes click map → most clicked link is "Scholarship Details"
9. Creates follow-up email focused on scholarships

### Journey 3: Lead Nurture and Handoff

1. **MO** → `/marketing/leads` → filters by "New" status
2. Reviews lead "Jane Smith" — scored 78 (demographic 25, behavioral 30, engagement 23)
3. Opens detail: Jane visited landing page 3 times, opened 2 emails, clicked 1 link
4. Program Interest: "Computer Science"
5. **MO** changes status to "Qualified" → notes: "High intent, ready for admissions contact"
6. System assigns to admissions team via webhook
7. Application created in admissions system → lead status → "Converted"
8. Lead score updated with conversion data

## 8. Business Rules Engine

1. **Campaign Budget:** Cannot exceed monthly cap ($50,000 default, configurable); alerts at 80%, 90%, 100% used
2. **Lead Scoring:** Demographic (40%) + Behavioral (35%) + Engagement (25%):
   - Demographic: Country (0-10), Program interest match (0-10), Age range fit (0-10), Source quality (0-10)
   - Behavioral: Website visits (0-15), Form submissions (0-10), Email engagement (0-10)
   - Engagement: Recency (0-15), Frequency (0-10)
3. **Email Compliance:** All emails must include unsubscribe link; CAN-SPAM compliance enforced; sending limited to 9 AM-8 PM recipient timezone
4. **Landing Page:** Custom domain TLS required; forms must include privacy policy checkbox; GDPR consent capture for EU visitors
5. **Social Media:** Posts to same platform limited to 3/day; content must not include competitor mentions; hashtag limit 30 on Instagram, 2 on LinkedIn
6. **SEO Audit Threshold:** Score < 50 triggers notification; monthly auto-audit scheduled via cron
7. **Data Retention:** Lead data retained 5 years; email engagement data 2 years; analytics aggregated data kept indefinitely

## 9. Notification Specifications

- **N-M01:** Campaign Budget Alert (80%/90%/100%) → In-app + email
- **N-M02:** New Lead Captured → In-app toast to assigned officer
- **N-M03:** Email Campaign Sent → In-app + summary email
- **N-M04:** High Bounce Rate (>5%) → Alert email
- **N-M05:** Social Post Failed → In-app error toast
- **N-M06:** SEO Audit Complete → In-app + report link
- **N-M07:** Weekly Performance Digest → Email (Monday 8 AM)
- **N-M08:** Landing Page Published → In-app notification
- **N-M09:** Lead Converted to Application → In-app to MO and Admissions
- **N-M10:** Content Calendar — Due Tomorrow → In-app reminder

## 10. Permission Matrix

| Entity          | View     | Create   | Edit     | Delete     | Publish/Activate                |
| --------------- | -------- | -------- | -------- | ---------- | ------------------------------- |
| Campaigns       | Own+Team | ✅       | Own      | ❌         | ✅ (Director for budget > $10K) |
| Leads           | All      | ✅       | Own      | ❌         | Status change (limited)         |
| Landing Pages   | All      | ✅       | Own      | Director   | ✅                              |
| Email Campaigns | Own      | ✅       | Own      | Draft only | ✅                              |
| Social Posts    | All      | ✅       | Own      | Own        | ✅                              |
| SEO Data        | ✅       | ❌       | ❌       | ❌         | ❌ (read-only)                  |
| Analytics       | ✅       | ❌       | ❌       | ❌         | ❌                              |
| Reports         | ✅       | ✅       | Own      | Own        | Schedule                        |
| Templates       | ✅       | Director | Director | Director   | Director                        |
| Settings        | ✅       | ❌       | ❌       | ❌         | ❌                              |

## 11. State Management

**Redux Slice:** `marketing`
**RTK Query Tags:** `Campaigns`, `Campaign`, `Leads`, `LandingPages`, `EmailCampaigns`, `SocialPosts`, `ContentCalendar`, `Seo`, `Analytics`, `Reports`
**Cache Policy:** Dashboard KPIs refreshed every 60s; campaign lists 30s; lead table on mutation; analytics on date range change
**Optimistic Updates:** Lead status changes; campaign pause/resume; content calendar drag-reschedule

## 12. Form Schemas (Zod)

```typescript
export const createCampaignSchema = z
  .object({
    name: z.string().min(1, "Name required").max(200),
    type: z.enum(["social", "email", "search", "display", "content", "event", "other"]),
    objective: z.enum(["awareness", "consideration", "conversion", "retention"]),
    plannedBudget: z.number().min(0, "Budget must be >= 0").optional(),
    startDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    description: z.string().max(2000).optional(),
  })
  .refine((d) => !d.startDate || !d.endDate || new Date(d.endDate) > new Date(d.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export const createLeadSchema = z.object({
  email: z.string().email("Invalid email"),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  source: z.string().optional(),
  programInterest: z.string().optional(),
});

export const createSocialPostSchema = z.object({
  accountIds: z.array(z.string().uuid()).min(1, "Select at least one platform"),
  content: z.string().min(1, "Content required").max(5000),
  postType: z.enum(["image", "video", "carousel", "text", "link", "story"]),
  mediaUrls: z.array(z.string().url()).max(10).optional(),
  linkUrl: z.string().url().optional(),
  hashtags: z.array(z.string().max(100)).max(30).optional(),
  scheduledAt: z.string().datetime().optional(),
});
```

## 13. Analytics Events

| Event                              | Properties                          |
| ---------------------------------- | ----------------------------------- |
| `marketing_campaign_created`       | campaignId, type, objective, budget |
| `marketing_campaign_launched`      | campaignId, type, budget            |
| `marketing_campaign_paused`        | campaignId                          |
| `marketing_lead_captured`          | leadId, source, campaignId          |
| `marketing_lead_converted`         | leadId, applicationId               |
| `marketing_email_sent`             | emailId, listSize, hasABTest        |
| `marketing_email_opened`           | emailId (tracking pixel)            |
| `marketing_landing_page_published` | pageId, slug, campaignId            |
| `marketing_social_post_scheduled`  | postId, platforms, postType         |
| `marketing_social_post_published`  | postId, platforms                   |
| `marketing_seo_audit_run`          | auditId, score                      |
| `marketing_report_generated`       | templateId, format                  |

## 14. Accessibility

- All forms use `<label>` with `htmlFor`; error messages linked via `aria-describedby`
- Campaign drag-drop has keyboard alternative (move up/down buttons)
- Charts use `role="img"` with `aria-label` describing data; data table available below
- Color-blind friendly palette (CVD-safe) on all charts and status indicators
- Social post composer shows char count with screen reader live region
- Email builder: focus management between palette, preview, and properties
- All modals: focus trap, `aria-modal="true"`, `role="dialog"`, `aria-labelledby`

## 15. Error & Edge Case Catalog

| #   | Error                               | Message                                                                  | Recovery                    |
| --- | ----------------------------------- | ------------------------------------------------------------------------ | --------------------------- |
| E01 | Ad platform API rate limited        | "Ad platform is rate-limiting requests. Retrying in 30s."                | Auto-retry with backoff     |
| E02 | Email list import — column mismatch | "Column mapping incomplete. Map all required fields."                    | Re-map in import UI         |
| E03 | Landing page slug taken             | "Slug already in use. Try [suggested-slug-2]"                            | Accept suggestion or change |
| E04 | Social media token expired          | "Facebook connection expired. Reconnect to continue posting."            | OAuth re-auth flow          |
| E05 | Analytics data delayed (>24h)       | "Analytics data may be delayed up to 24 hours."                          | N/A — data processing lag   |
| E06 | Campaign budget overspend           | "Campaign has exceeded budget by $X. [Pause] [Increase Budget]"          | Pause or increase           |
| E07 | Email sending rate exceeded         | "Email provider rate limit reached. Queue paused, will resume in X min." | Auto-resume                 |
| E08 | Lead duplicate detected             | "A lead with this email already exists. [View Existing] [Merge]"         | Merge or skip               |
| E09 | Content calendar conflict           | "Content already scheduled on this date and platform."                   | Reschedule one              |
| E10 | SEO audit timeout                   | "Audit took longer than expected. [Retry]"                               | Retry or contact support    |

---

_End of Actor Plan — Marketing Officer_
