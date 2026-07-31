# Actor: Conversion Copywriter

## 1. Identity & Role Definition

**Actor ID:** `conversion_copywriter`
**Display Name:** Conversion Copywriter
**Description:** Writes persuasive, conversion-focused copy for landing pages, email sequences, ad creative, sales pages, and onboarding flows to convert prospective students and B2B clients into enrolled learners and contracted customers. Owns the tone, voice, and persuasive architecture of all direct-response copy across the Cyber Elias Academy digital ecosystem.
**System Role:** `content_creator`
**Hierarchy:** Reports to Director of Marketing / Head of Growth
**Location:** Web dashboard only
**Session Timeout:** 60 minutes of inactivity
**Concurrent Sessions:** 3 max

## 2. Primary Goals & Success KPIs

| Goal                             | KPI                                  | Target                |
| -------------------------------- | ------------------------------------ | --------------------- |
| Improve landing page conversion  | Landing page conversion rate         | > 12% (baseline 5-8%) |
| Increase email sequence revenue  | Email sequence revenue per recipient | > $4.50               |
| Boost ad click-through rate      | Ad creative CTR                      | > 3.5%                |
| Increase sales page conversion   | Sales page conversion rate           | > 15%                 |
| Reduce time-to-first-enrollment  | Average days from lead to enrollment | < 14 days             |
| Improve A/B test win rate        | Winning variant lift over control    | > 20%                 |
| Maintain brand voice consistency | Style guide adherence score          | > 95%                 |
| Speed up copy production         | Average brief-to-publish cycle       | < 48 hours            |

## 3. Complete Screen Inventory

### 3.1 Copy Asset Library (`/conversion-copy/library`)

**Wireframe:** Searchable, filterable grid/table of all copy assets with status indicators, version tracking, and quick-edit access.

**UI Fields/Components:**

- **Header:** "Copy Asset Library" with breadcrumb (Home > Conversion Copy > Library)
- **Search Bar:** Full-text search across asset name, content, tags, brief title
- **Filter Bar:** Type (Landing Page / Email / Ad / Sales Page / Onboarding / SMS / Social), Status (Draft / Review / Approved / Published / Archived), Project, Date range (created/updated), Tags (multi-select), Owner
- **Sort Controls:** Updated (default desc), Created, Name, Type, Status
- **Asset Grid/Table:**
  - Card view: Thumbnail/preview snippet, Name, Type icon, Status badge, Last updated, Version count
  - Table view: Name, Type, Status, Version, Words, Last Modified, Modified By, Actions (Edit, Duplicate, Archive, Copy to clipboard)
- **"➕ New Asset" button** → dropdown by type
- **Bulk Actions:** Select multiple → Export (CSV/PDF), Archive, Change Status, Assign Reviewer
- **Pagination:** Page X of Y, Rows per page (20/50/100)

**Data Bindings:**

- `GET /api/conversion-copy/assets?search={q}&type={type}&status={status}&tags={tags}&page={n}&limit={n}&sort={field}&order={asc|desc}`
- `POST /api/conversion-copy/assets` (create new)
- `DELETE /api/conversion-copy/assets/bulk`

**States:**

| State      | Behavior                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------- |
| Loading    | Grid skeleton (12 skeleton cards with shimmer)                                               |
| Empty      | "Your copy library is empty. Write your first asset to get started." with "Create Asset" CTA |
| No results | "No assets match your filters. [Clear filters]" with empty illustration                      |
| Error      | "Could not load library. [Retry]"                                                            |

### 3.2 Landing Page Copy Editor (`/conversion-copy/landing-pages/{id}`)

**Wireframe:** Split-screen editor — left pane: live preview of landing page with copy hotspots; right pane: field-based copy editor with SEO metadata, variant management, and version history.

**UI Fields/Components:**

- **Top Bar:** Page name (editable), Status badge, Auto-save indicator, "View Live" link, Version dropdown, Variant selector (Control / Variant A / Variant B)
- **Left Pane — Live Preview:** Rendered landing page iframe with clickable overlay zones that highlight when hovered
- **Right Pane — Copy Editor (tabbed):**
  - **Tab: Content**
    - Hero Section: Headline (text input, max 100 chars), Subheadline (textarea, max 200 chars), CTA Button Text (text input, max 40 chars), CTA Subtext (text input, optional)
    - Value Props (repeating): Title, Description, Icon (select from icon set)
    - Social Proof Section: Stats (number + label, repeating), Testimonials (repeating: quote, author name, title, photo URL, star rating)
    - Feature Breakdown: Feature name, Description, Benefit statement
    - FAQ Section (repeating): Question, Answer (rich text)
    - Footer CTA: Headline, Subheadline, Button Text
  - **Tab: SEO**
    - Meta Title (text, max 70 chars, character counter), Meta Description (textarea, max 160 chars, character counter), Canonical URL, Open Graph Title, OG Description, OG Image URL, Twitter Card fields
  - **Tab: Settings**
    - Conversion Pixel/Facebook Pixel ID, Google Analytics Event Name, Thank You Page URL (after conversion), Exit Intent Popup toggle, Scarcity Timer (enabled/countdown text)
  - **Tab: Version History**
    - Timeline list: Version number, timestamp, editor name, word count change, "Restore" button
- **Bottom Bar:** "Save Draft", "Submit for Review", "Publish" buttons, Auto-save status ("Saved at 14:32" / "Unsaved changes")

**Data Bindings:**

- `GET /api/conversion-copy/landing-pages/{id}`
- `PUT /api/conversion-copy/landing-pages/{id}`
- `POST /api/conversion-copy/landing-pages/{id}/variants` (create variant)
- `GET /api/conversion-copy/landing-pages/{id}/versions`
- `POST /api/conversion-copy/landing-pages/{id}/publish`

**States:**

| State              | Behavior                                                   |
| ------------------ | ---------------------------------------------------------- |
| Loading            | Split-pane skeleton                                        |
| Not found          | "Landing page not found." with link back to library        |
| Auto-save conflict | "Another editor has made changes. [Reload] [Discard mine]" |
| Publish error      | "Publish failed: [reason]. [Retry]"                        |

### 3.3 Email Sequence Builder (`/conversion-copy/email-sequences`)

**Wireframe:** Visual email sequence builder with drag-and-drop flow editor, individual email editor, trigger conditions, and performance metrics per step.

**UI Fields/Components:**

- **Sequence List (left sidebar):** All sequences with name, trigger type (Time delay / Action / Date), active status toggle, email count, total recipients
- **Sequence Canvas (center):** Visual flow chart — nodes for each email with delay/trigger labels, connector lines, drag-and-drop reorder
- **Email Editor (right pane when email selected):**
  - Header: Subject line (text, emoji picker), Preview text (text, max 150 chars), Sender name, Reply-to address
  - Body: Rich text editor with variables insertion ({{first_name}}, {{course_name}}, {{link}}, etc.), WYSIWYG toolbar (bold, italic, links, images, buttons, dividers, spacing)
  - Send Conditions: Delay (X hours/days after trigger), Additional condition (e.g., "only if not opened previous email", "only if clicked link X")
  - A/B Test Settings (per email): Subject line variants (max 3), Body variants (max 2), Test split (50/50 or 70/30), Winner selection (auto after X hours / manual)
- **Sequence Settings Panel (right sidebar):**
  - Trigger Type, Trigger Event (specific tag applied / form submitted / course started / payment received / date field matches), Start/End dates, Suppression list, Daily sending cap, Timezone for send window
- **Performance Tab (per sequence):**
  - Overview: Sent, Delivered, Opened (rate), Clicked (rate), Unsubscribed, Revenue attributed
  - Per-email: Subject, Send date, Delivered, Opens, Unique Opens, Clicks, CTR, Unsubscribes, Revenue, A/B test winner
  - Chart: Open rate / click rate over time (line chart)

**Data Bindings:**

- `GET /api/conversion-copy/email-sequences`
- `POST /api/conversion-copy/email-sequences`
- `GET /api/conversion-copy/email-sequences/{id}`
- `PUT /api/conversion-copy/email-sequences/{id}`
- `POST /api/conversion-copy/email-sequences/{id}/duplicate`
- `GET /api/conversion-copy/email-sequences/{id}/performance`

**States:**

| State            | Behavior                                                             |
| ---------------- | -------------------------------------------------------------------- |
| Loading          | Sequence skeleton with canvas placeholder                            |
| Empty            | "No email sequences created. Build your first nurture sequence."     |
| Canvas error     | "Could not load sequence flow. [Retry]"                              |
| Missing variable | Red highlight on `{{variable}}` if variable is not defined in system |

### 3.4 Ad Copy Manager (`/conversion-copy/ads`)

**Wireframe:** Table of all ad copy variants across platforms (Facebook, Google, LinkedIn, TikTok, Twitter) with platform-specific field mapping, performance data, and creative preview.

**UI Fields/Components:**

- **Top Bar:** Platform filter tabs (All / Facebook / Google / LinkedIn / TikTok / Twitter), Status filter (Active / Draft / Review / Rejected), Campaign filter
- **Ad Copy Table:**
  - Columns: Ad Name, Platform icon, Campaign, Ad Set, Status, Headline, Primary Text, CTR, CPC, CVR, Spend, Impressions, Last Updated
  - Expandable row → full platform-specific fields preview
- **Ad Editor (modal):**
  - Platform selector (determines field schema)
  - Facebook fields: Primary Text (textarea, max 125 chars), Headline (text, max 40 chars), Description (text, max 30 chars), CTA button (dropdown), Link URL, Display Link, Image/Video URL
  - Google fields: Headlines (up to 30, max 30 chars each), Descriptions (up to 5, max 90 chars each), Final URL, Path fields (2), Business Name, Call-to-action
  - LinkedIn fields: Headline, Text, Descriptive Text, CTA, Company Name, Destination URL
  - TikTok fields: Ad Text, Headline, CTA, Display URL
  - Twitter fields: Tweet Text (max 280 chars), Headline, Card Image
  - Variant management: "Add Variant" duplicates with A/B label
- **Performance Columns:** CTR, CPC (cost per click), CVR (conversion rate), CPA (cost per acquisition), ROAS, Quality Score (Google)
- **Actions:** Edit, Duplicate, Archive, Export as CSV

**Data Bindings:**

- `GET /api/conversion-copy/ads?platform={p}&status={s}&campaign={c}`
- `POST /api/conversion-copy/ads`
- `PUT /api/conversion-copy/ads/{id}`
- `POST /api/conversion-copy/ads/{id}/duplicate`

**States:**

| State          | Behavior                                        |
| -------------- | ----------------------------------------------- |
| Loading        | Table skeleton (10 rows)                        |
| Empty          | "No ad copy yet. Create your first ad variant." |
| Platform error | "Could not sync fields for [platform]. [Retry]" |

### 3.5 A/B Test Copy Dashboard (`/conversion-copy/ab-tests`)

**Wireframe:** Dashboard listing all running, completed, and draft A/B copy tests with statistical significance indicators, winner declarations, and variant performance comparisons.

**UI Fields/Components:**

- **Filter Tabs:** Running, Completed, Draft, All
- **Test Cards (each card):**
  - Test Name, Type (Headline / CTA / Body / Subject Line / Full Page), Status badge (Running / Stopped / Draft / Winner Declared)
  - Variants preview: Variant A (copy snippet), Variant B (copy snippet), Variant C (if exists)
  - Metrics: Sample size, Confidence level, Conversion rate per variant, Lift over control
  - Progress bar (target sample size achieved)
  - "View Details" → modal/expanded
- **Test Detail Modal:**
  - **Setup:** Hypothesis (textarea), Primary metric (Conversion / Click / Open / Revenue), Minimum detectable effect, Significance threshold (default 95%), Traffic allocation (50/50 or 70/30)
  - **Results:** Table per variant → Visitors, Conversions, Conversion Rate, Improvement vs Control, Probability of being best, Status icon (leading/losing/unknown)
  - **Chart:** Cumulative conversion rate over time per variant (line chart with shaded confidence intervals)
  - **Decision:** "Declare Winner" (auto if significance reached), "Stop Test", "Apply Winning Variant"
- **"➕ New A/B Test" button** → test creation wizard

**Data Bindings:**

- `GET /api/conversion-copy/ab-tests`
- `POST /api/conversion-copy/ab-tests`
- `GET /api/conversion-copy/ab-tests/{id}`
- `POST /api/conversion-copy/ab-tests/{id}/declare-winner`
- `POST /api/conversion-copy/ab-tests/{id}/stop`

**States:**

| State               | Behavior                                                               |
| ------------------- | ---------------------------------------------------------------------- |
| Loading             | Card skeleton grid (6 cards)                                           |
| Empty               | "No A/B tests created yet. Run your first experiment."                 |
| Running test detail | Real-time polling every 30s for new data                               |
| Inconclusive        | Warning badge: "Test has not yet reached significance. [View details]" |

### 3.6 Conversion Analytics (`/conversion-copy/analytics`)

**Wireframe:** Full analytics dashboard showing funnel performance by copy asset, conversion rate trends, attribution data, and revenue impact of copy changes.

**UI Fields/Components:**

- **Date Range Selector:** Presets (7d / 30d / 90d / Custom)
- **KPI Row:**
  - Total Conversions, Conversion Rate (overall), Revenue Attributed, Average Order Value, Cost per Conversion
  - Each: Value, % change period-over-period, trend arrow
- **Conversion Funnel Chart:** Impression → Visit → Engage → Convert → Enroll (funnel bars with drop-off %)
- **Asset Performance Table:**
  - Columns: Asset Name, Type, Views, Clicks, CTR, Conversions, Conv. Rate, Revenue, ROAS
  - Sortable, filterable by type/date
  - "View" link → opens asset editor
- **Attribution Model:** First-Touch vs Last-Touch conversion count per asset (bar chart)
- **Heatmap (if integrated):** Click heatmap for landing pages (scroll depth, button clicks, form interactions)
- **Export:** "Export Report" → CSV/PDF

**Data Bindings:**

- `GET /api/conversion-copy/analytics/summary?from={date}&to={date}`
- `GET /api/conversion-copy/analytics/funnel?from={date}&to={date}`
- `GET /api/conversion-copy/analytics/assets?from={date}&to={date}&sort={field}&order={dir}`
- `GET /api/conversion-copy/analytics/attribution?from={date}&to={date}`

**States:**

| State      | Behavior                                                                 |
| ---------- | ------------------------------------------------------------------------ |
| Loading    | Skeleton KPIs + chart placeholder                                        |
| No data    | "No conversion data for this period. Launch campaigns to see analytics." |
| Stale data | "Data is from [time]. Last sync: [timestamp]. [Refresh]"                 |

### 3.7 Style Guide (`/conversion-copy/style-guide`)

**Wireframe:** Living document of brand voice, tone, terminology, formatting rules, do/don't examples, and accessibility guidelines for copy.

**UI Fields/Components:**

- **Sidebar Navigation (by section):**
  - Brand Voice: Description, Personality traits (3-5 adjectives), Voice vs competitor comparison
  - Tone Matrix: Situations (e.g., Onboarding / Error / Sale / Support) with tone directive per situation
  - Terminology: Term, Allowed (yes/no), Preferred term, Notes table
  - Grammar & Mechanics: Rule, Example, Exception
  - Do/Don't Examples: Context, Do (copy example), Don't (copy example)
  - Accessibility: Plain language guidelines, Reading level target (e.g., Grade 8), Contrast ratios for text, Alt text requirements
  - Formatting: Headers, bullet usage, bolding rules, link styling, capitalization rules
  - Translations/Localization Notes
- **Edit Mode:** Inline editing with "Save Section", "Discard Changes" per section, version tracking
- **"Export PDF" button** — compiles full style guide

**Data Bindings:**

- `GET /api/conversion-copy/style-guide`
- `PUT /api/conversion-copy/style-guide/{section}`
- `GET /api/conversion-copy/style-guide/export?format=pdf`

**States:**

| State        | Behavior                                                |
| ------------ | ------------------------------------------------------- |
| Loading      | Section skeleton with sidebar                           |
| Empty        | "Style guide is empty. Add your first brand guideline." |
| Export error | "Could not export PDF. [Retry]"                         |

### 3.8 Brief Intake (`/conversion-copy/briefs`)

**Wireframe:** Form-based intake system where marketing managers submit copy briefs and copywriters receive structured assignments with requirements, assets, deadlines, and context.

**UI Fields/Components:**

- **Brief List (table):** Title, Project/Campaign, Asset Type, Priority (High/Medium/Low), Status (New / In Progress / Review / Complete), Due Date, Assignee, Actions
- **Brief Detail/Creation Form:**
  - Project/Campaign (linked to marketing_campaigns), Asset Type dropdown
  - Title, Description/Context (rich text)
  - Target Audience description, Desired action/conversion goal
  - Key message, Unique selling points (repeating text inputs)
  - Tone/Persuasion approach (dropdown: Urgency/Authority/Social Proof/Scarcity/Benefit-led/Problem-led)
  - Word count target, Format specifications (e.g., "Include 3 variations of headline")
  - Required elements: Keywords to include (tags), CTA phrasing mandate, Competitor examples (URLs)
  - Attachments: File upload (multiple, max 20MB each)
  - Deadline (datetime), Priority
  - Reviewers (assign users), Approval workflow setting
  - "Submit Brief" / "Save as Draft" buttons
- **Status Workflow:** New → Accepted → In Progress → Review → Revisions Requested → Approved → Published
  - Transition comments required on Revisions Requested and Rejected

**Data Bindings:**

- `GET /api/conversion-copy/briefs?status={s}&assignee={id}&project={id}`
- `POST /api/conversion-copy/briefs`
- `GET /api/conversion-copy/briefs/{id}`
- `PUT /api/conversion-copy/briefs/{id}`
- `POST /api/conversion-copy/briefs/{id}/transition` (status changes)

**States:**

| State          | Behavior                                             |
| -------------- | ---------------------------------------------------- |
| Loading        | Table + filter skeleton                              |
| Empty          | "No briefs yet. Create a brief to assign copy work." |
| Overdue        | Red badge: "⚠ Overdue by X days"                     |
| Pending review | Yellow badge: "Awaiting your review"                 |

## 4. Full Database Schema

```typescript
// --- Conversion Copy Schema (conversion_copy) ---
// Extension of existing marketing module. Tables prefixed with cc_.

export const ccAssets = pgTable('cc_assets', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  updatedBy: uuid('updated_by').references(() => users.id),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'landing_page','email','ad','sales_page','onboarding','sms','social'
  status: varchar('status', { length: 30 }).default('draft').notNull(), // draft,review,approved,published,archived
  projectId: uuid('project_id').references(() => marketingProjects.id),
  campaignId: uuid('campaign_id').references(() => marketingCampaigns.id),
  wordCount: integer('word_count').default(0),
  currentVersion: integer('current_version').default(1).notNull(),
  styleGuideVersion: uuid('style_guide_version'),
  tags: text('tags').array(), // string[]
  metadata: jsonb('metadata').default('{}'), // flexible per-type metadata
});

export const ccContentVersions = pgTable('cc_content_versions', {
  id: uuid('id').defaultRandom().primaryKey(),
  assetId: uuid('asset_id').references(() => ccAssets.id).notNull(),
  versionNumber: integer('version_number').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  content: jsonb('content').notNull(), // full structured content object per type
  wordCount: integer('word_count').default(0),
  changeNotes: text('change_notes'),
  publishedAt: timestamp('published_at'),
  isApproved: boolean('is_approved').default(false),
  approvedBy: uuid('approved_by').references(() => users.id),
  approvedAt: timestamp('approved_at'),
});

export const ccLandingPages = pgTable('cc_landing_pages', {
  id: uuid('id').defaultRandom().primaryKey(),
  assetId: uuid('asset_id').references(() => ccAssets.id).notNull().unique(),
  headline: varchar('headline', { length: 100 }),
  subheadline: varchar('subheadline', { length: 200 }),
  ctaText: varchar('cta_text', { length: 40 }),
  ctaSubtext: varchar('cta_subtext', { length: 80 }),
  valueProps: jsonb('value_props').default('[]'), // [{title, description, icon}]
  socialProof: jsonb('social_proof').default('[]'), // [{type, value}] type: stat|testimonial
  faq: jsonb('faq').default('[]'), // [{question, answer}]
  heroImageUrl: varchar('hero_image_url', { length: 500 }),
  thankYouUrl: varchar('thank_you_url', { length: 500 }),
  exitIntentEnabled: boolean('exit_intent_enabled').default(false),
  scarcityTimerEnabled: boolean('scarcity_timer_enabled').default(false),
  scarcityText: varchar('scarcity_text', { length: 100 }),
  seoMetaTitle: varchar('seo_meta_title', { length: 70 }),
  seoMetaDescription: varchar('seo_meta_description', { length: 160 }),
  ogTitle: varchar('og_title', { length: 100 }),
  ogDescription: varchar('og_description', { length: 200 }),
  ogImageUrl: varchar('og_image_url', { length: 500 }),
  canonicalUrl: varchar('canonical_url', { length: 500 }),
  pixelId: varchar('pixel_id', { length: 100 }),
  gaEventName: varchar('ga_event_name', { length: 100 }),
  publishedUrl: varchar('published_url', { length: 500 }),
  templateId: uuid('template_id'),
});

export const ccEmailSequences = pgTable('cc_email_sequences', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  triggerType: varchar('trigger_type', { length: 50 }).notNull(), // 'time_delay','action','date'
  triggerConfig: jsonb('trigger_config').default('{}'), // { event, field, conditions }
  status: varchar('status', { length: 30 }).default('draft').notNull(), // draft,active,paused,archived
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  dailySendingCap: integer('daily_sending_cap'),
  sendWindowStart: time('send_window_start'),
  sendWindowEnd: time('send_window_end'),
  timezone: varchar('timezone', { length: 50 }).default('UTC'),
  suppressionListIds: uuid('suppression_list_ids').array(),
  totalRecipients: integer('total_recipients').default(0),
  totalRevenue: numeric('total_revenue', { precision: 12, scale: 2 }).default('0'),
});

export const ccSequenceEmails = pgTable('cc_sequence_emails', {
  id: uuid('id').defaultRandom().primaryKey(),
  sequenceId: uuid('sequence_id').references(() => ccEmailSequences.id).notNull(),
  stepOrder: integer('step_order').notNull(),
  subjectLine: varchar('subject_line', { length: 200 }),
  previewText: varchar('preview_text', { length: 150 }),
  senderName: varchar('sender_name', { length: 100 }),
  replyToAddress: varchar('reply_to_address', { length: 255 }),
  bodyContent: text('body_content'), // HTML content
  plainTextContent: text('plain_text_content'),
  delayValue: integer('delay_value'),
  delayUnit: varchar('delay_unit', { length: 20 }).default('hours'), // minutes,hours,days,weeks
  conditionJson: jsonb('condition_json').default('{}'), // conditions to send
  abTestEnabled: boolean('ab_test_enabled').default(false),
  abTestSubjectVariants: text('ab_test_subject_variants').array(), // alternative subjects
  abTestBodyVariants: text('ab_test_body_variants').array(),
  abTestSplit: integer('ab_test_split').default(50), // percentage for primary
  abTestWinnerSelection: varchar('ab_test_winner_selection', { length: 20 }).default('manual'), // auto,manual
  abTestDeclaredAt: timestamp('ab_test_declared_at'),
  abTestWinnerId: uuid('ab_test_winner_id'),
  sentCount: integer('sent_count').default(0),
  deliveredCount: integer('delivered_count').default(0),
  openedCount: integer('opened_count').default(0),
  clickedCount: integer('clicked_count').default(0),
  unsubscribedCount: integer('unsubscribed_count').default(0),
  revenueAttributed: numeric('revenue_attributed', { precision: 12, scale: 2 }).default('0'),
});

export const ccAdCopy = pgTable('cc_ad_copy', {
  id: uuid('id').defaultRandom().primaryKey(),
  assetId: uuid('asset_id').references(() => ccAssets.id).notNull().unique(),
  platform: varchar('platform', { length: 30 }).notNull(), // facebook,google,linkedin,tiktok,twitter
  campaignId: varchar('campaign_id', { length: 100 }), // external platform campaign ID
  adSetId: varchar('ad_set_id', { length: 100 }),
  headline: varchar('headline', { length: 200 }),
  primaryText: text('primary_text'),
  description: varchar('description', { length: 200 }),
  ctaButton: varchar('cta_button', { length: 50 }),
  linkUrl: varchar('link_url', { length: 500 }),
  displayUrl: varchar('display_url', { length: 255 }),
  imageUrl: varchar('image_url', { length: 500 }),
  videoUrl: varchar('video_url', { length: 500 }),
  businessName: varchar('business_name', { length: 100 }),
  path1: varchar('path1', { length: 30 }),
  path2: varchar('path2', { length: 30 }),
  additionalFields: jsonb('additional_fields').default('{}'), // platform-specific extras
  status: varchar('status', { length: 30 }).default('draft'), // draft,active,rejected,archived
  platformStatus: varchar('platform_status', { length: 30 }), // from ad platform API
  impressions: integer('impressions').default(0),
  clicks: integer('clicks').default(0),
  ctr: numeric('ctr', { precision: 6, scale: 4 }),
  cpc: numeric('cpc', { precision: 10, scale: 4 }),
  conversions: integer('conversions').default(0),
  conversionRate: numeric('conversion_rate', { precision: 6, scale: 4 }),
  spend: numeric('spend', { precision: 12, scale: 2 }).default('0'),
  roas: numeric('roas', { precision: 6, scale: 2 }),
});

export const ccABTests = pgTable('cc_ab_tests', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  assetId: uuid('asset_id').references(() => ccAssets.id),
  hypothesis: text('hypothesis'),
  testType: varchar('test_type', { length: 50 }).notNull(), // headline,cta,body,subject_line,full_page
  primaryMetric: varchar('primary_metric', { length: 50 }).notNull(), // conversion,click,open,revenue
  minimumDetectableEffect: numeric('minimum_detectable_effect', { precision: 4, scale: 2 }), // as decimal
  significanceThreshold: numeric('significance_threshold', { precision: 4, scale: 2 }).default('0.95'),
  trafficAllocation: jsonb('traffic_allocation').default('{"A":50,"B":50}'),
  status: varchar('status', { length: 30 }).default('draft'), // draft,running,stopped,winner_declared
  startedAt: timestamp('started_at'),
  stoppedAt: timestamp('stopped_at'),
  winnerVariantId: uuid('winner_variant_id'),
  confidenceLevel: numeric('confidence_level', { precision: 5, scale: 3 }),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const ccABTestVariants = pgTable('cc_ab_test_variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  testId: uuid('test_id').references(() => ccABTests.id).notNull(),
  label: varchar('label', { length: 10 }).notNull(), // A, B, C
  isControl: boolean('is_control').default(false),
  content: jsonb('content').notNull(), // variant content snapshot
  sampleSize: integer('sample_size').default(0),
  conversions: integer('conversions').default(0),
  conversionRate: numeric('conversion_rate', { precision: 8, scale: 5 }),
  revenue: numeric('revenue', { precision: 12, scale: 2 }).default('0'),
  probabilityBest: numeric('probability_best', { precision: 5, scale: 3 }), // bayesian probability
});

export const ccStyleGuide = pgTable('cc_style_guide', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  version: integer('version').default(1).notNull(),
  brandVoice: jsonb('brand_voice').default('{}'), // {description, traits[], competitorComparison}
  toneMatrix: jsonb('tone_matrix').default('[]'), // [{situation, tone, directive}]
  terminology: jsonb('terminology').default('[]'), // [{term, allowed, preferred, notes}]
  grammarRules: jsonb('grammar_rules').default('[]'), // [{rule, example, exception}]
  doDontExamples: jsonb('do_dont_examples').default('[]'), // [{context, doExample, dontExample}]
  accessibilityGuidelines: jsonb('accessibility_guidelines').default('{}'),
  formattingRules: jsonb('formatting_rules').default('{}'),
  localizationNotes: jsonb('localization_notes').default('[]'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  updatedBy: uuid('updated_by').references(() => users.id),
  publishedAt: timestamp('published_at'),
});

export const ccBriefs = pgTable('cc_briefs', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  campaignId: uuid('campaign_id').references(() => marketingCampaigns.id),
  projectId: uuid('project_id').references(() => marketingProjects.id),
  assetType: varchar('asset_type', { length: 50 }).notNull(),
  status: varchar('status', { length: 30 }).default('new').notNull(), // new,accepted,in_progress,review,revisions_requested,approved,published
  priority: varchar('priority', { length: 10 }).default('medium'), // low,medium,high,urgent
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  assigneeId: uuid('assignee_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  dueDate: timestamp('due_date'),
  targetAudience: text('target_audience'),
  desiredAction: varchar('desired_action', { length: 500 }),
  keyMessage: text('key_message'),
  uniqueSellingPoints: text('unique_selling_points').array(),
  persuasionAngle: varchar('persuasion_angle', { length: 50 }), // urgency,authority,social_proof,scarcity,benefit,problem
  wordCountTarget: integer('word_count_target'),
  formatSpecs: text('format_specs'),
  requiredKeywords: text('required_keywords').array(),
  ctaMandate: varchar('cta_mandate', { length: 255 }),
  competitorExamples: text('competitor_examples').array(),
  attachments: jsonb('attachments').default('[]'), // [{name, url, size, type}]
  reviewerIds: uuid('reviewer_ids').array(),
  completedAt: timestamp('completed_at'),
  transitionComment: text('transition_comment'), // latest status transition comment
});

export const ccBriefHistory = pgTable('cc_brief_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  briefId: uuid('brief_id').references(() => ccBriefs.id).notNull(),
  fromStatus: varchar('from_status', { length: 30 }),
  toStatus: varchar('to_status', { length: 30 }).notNull(),
  changedBy: uuid('changed_by').references(() => users.id).notNull(),
  changedAt: timestamp('changed_at').defaultNow().notNull(),
  comment: text('comment'),
});

// Indexes
CREATE INDEX idx_cc_assets_type ON cc_assets(type);
CREATE INDEX idx_cc_assets_status ON cc_assets(status);
CREATE INDEX idx_cc_assets_campaign ON cc_assets(campaign_id);
CREATE INDEX idx_cc_content_versions_asset ON cc_content_versions(asset_id);
CREATE INDEX idx_cc_sequence_emails_sequence ON cc_sequence_emails(sequence_id);
CREATE INDEX idx_cc_ad_copy_platform ON cc_ad_copy(platform);
CREATE INDEX idx_cc_ab_tests_status ON cc_ab_tests(status);
CREATE INDEX idx_cc_briefs_status ON cc_briefs(status);
CREATE INDEX idx_cc_briefs_assignee ON cc_briefs(assignee_id);
```

## 5. Complete API Contract

### Endpoints

#### Assets

```
GET    /api/v1/conversion-copy/assets                    # List all copy assets
POST   /api/v1/conversion-copy/assets                    # Create new asset
GET    /api/v1/conversion-copy/assets/{id}               # Get asset details
PUT    /api/v1/conversion-copy/assets/{id}               # Update asset
DELETE /api/v1/conversion-copy/assets/{id}               # Archive asset
POST   /api/v1/conversion-copy/assets/bulk-archive       # Bulk archive assets
POST   /api/v1/conversion-copy/assets/{id}/duplicate     # Duplicate asset
```

**Types:**

```typescript
interface Asset {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string | null;
  name: string;
  slug: string;
  type: "landing_page" | "email" | "ad" | "sales_page" | "onboarding" | "sms" | "social";
  status: "draft" | "review" | "approved" | "published" | "archived";
  projectId: string | null;
  campaignId: string | null;
  wordCount: number;
  currentVersion: number;
  tags: string[];
  metadata: Record<string, unknown>;
}

interface ListAssetsQuery {
  search?: string;
  type?: string;
  status?: string;
  tags?: string[];
  projectId?: string;
  campaignId?: string;
  createdBy?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sort?: "name" | "created_at" | "updated_at" | "type" | "status";
  order?: "asc" | "desc";
}

interface ListAssetsResponse {
  data: Asset[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

interface CreateAssetPayload {
  name: string;
  type: Asset["type"];
  projectId?: string;
  campaignId?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
}
```

#### Landing Pages

```
GET    /api/v1/conversion-copy/landing-pages/{id}        # Get landing page detail
PUT    /api/v1/conversion-copy/landing-pages/{id}        # Update landing page content
POST   /api/v1/conversion-copy/landing-pages/{id}/publish # Publish landing page
POST   /api/v1/conversion-copy/landing-pages/{id}/preview # Generate preview URL
```

```typescript
interface LandingPage {
  id: string;
  assetId: string;
  headline: string | null;
  subheadline: string | null;
  ctaText: string | null;
  ctaSubtext: string | null;
  valueProps: Array<{ title: string; description: string; icon: string }>;
  socialProof: Array<{ type: "stat" | "testimonial"; value: unknown }>;
  faq: Array<{ question: string; answer: string }>;
  heroImageUrl: string | null;
  thankYouUrl: string | null;
  exitIntentEnabled: boolean;
  scarcityTimerEnabled: boolean;
  scarcityText: string | null;
  seoMetaTitle: string | null;
  seoMetaDescription: string | null;
  publishedUrl: string | null;
  templateId: string | null;
}

interface UpdateLandingPagePayload {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaSubtext?: string;
  valueProps?: LandingPage["valueProps"];
  socialProof?: LandingPage["socialProof"];
  faq?: LandingPage["faq"];
  heroImageUrl?: string;
  thankYouUrl?: string;
  exitIntentEnabled?: boolean;
  scarcityTimerEnabled?: boolean;
  scarcityText?: string;
  seoFields?: {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImageUrl?: string;
    canonicalUrl?: string;
  };
}
```

#### Email Sequences

```
GET    /api/v1/conversion-copy/email-sequences                   # List sequences
POST   /api/v1/conversion-copy/email-sequences                   # Create sequence
GET    /api/v1/conversion-copy/email-sequences/{id}              # Get sequence with emails
PUT    /api/v1/conversion-copy/email-sequences/{id}              # Update sequence
DELETE /api/v1/conversion-copy/email-sequences/{id}              # Archive sequence
POST   /api/v1/conversion-copy/email-sequences/{id}/duplicate    # Duplicate
POST   /api/v1/conversion-copy/email-sequences/{id}/activate     # Activate sequence
POST   /api/v1/conversion-copy/email-sequences/{id}/pause        # Pause sequence
GET    /api/v1/conversion-copy/email-sequences/{id}/performance  # Sequence performance
POST   /api/v1/conversion-copy/email-sequences/{id}/emails       # Add email to sequence
PUT    /api/v1/conversion-copy/email-sequences/{id}/emails/{eid} # Update email in sequence
DELETE /api/v1/conversion-copy/email-sequences/{id}/emails/{eid} # Remove email
POST   /api/v1/conversion-copy/email-sequences/{id}/reorder      # Reorder emails
```

```typescript
interface EmailSequence {
  id: string;
  name: string;
  description: string | null;
  triggerType: "time_delay" | "action" | "date";
  triggerConfig: Record<string, unknown>;
  status: "draft" | "active" | "paused" | "archived";
  emails: SequenceEmail[];
  totalRecipients: number;
  totalRevenue: string;
  createdAt: string;
}

interface SequenceEmail {
  id: string;
  stepOrder: number;
  subjectLine: string | null;
  previewText: string | null;
  senderName: string | null;
  bodyContent: string | null;
  delayValue: number | null;
  delayUnit: string;
  conditionJson: Record<string, unknown>;
  abTestEnabled: boolean;
  stats: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    unsubscribed: number;
    revenue: string;
  };
}

interface SequencePerformance {
  overview: {
    sent: number;
    delivered: number;
    opened: number;
    openRate: number;
    clicked: number;
    clickRate: number;
    unsubscribed: number;
    revenue: string;
  };
  perEmail: Array<SequenceEmail & { stats: SequenceEmail["stats"] }>;
  chart: Array<{ date: string; openRate: number; clickRate: number }>;
}
```

#### Ad Copy

```
GET    /api/v1/conversion-copy/ads                    # List ad copy
POST   /api/v1/conversion-copy/ads                    # Create ad copy
GET    /api/v1/conversion-copy/ads/{id}               # Get ad copy detail
PUT    /api/v1/conversion-copy/ads/{id}               # Update ad copy
DELETE /api/v1/conversion-copy/ads/{id}               # Archive ad copy
POST   /api/v1/conversion-copy/ads/{id}/duplicate     # Duplicate ad copy
POST   /api/v1/conversion-copy/ads/{id}/sync-status   # Sync status from ad platform
```

#### A/B Tests

```
GET    /api/v1/conversion-copy/ab-tests                      # List tests
POST   /api/v1/conversion-copy/ab-tests                      # Create test
GET    /api/v1/conversion-copy/ab-tests/{id}                 # Get test detail
PUT    /api/v1/conversion-copy/ab-tests/{id}                 # Update test config
POST   /api/v1/conversion-copy/ab-tests/{id}/start           # Start test
POST   /api/v1/conversion-copy/ab-tests/{id}/stop            # Stop test
POST   /api/v1/conversion-copy/ab-tests/{id}/declare-winner  # Declare winner
GET    /api/v1/conversion-copy/ab-tests/{id}/results         # Detailed results
```

```typescript
interface ABTest {
  id: string;
  name: string;
  hypothesis: string | null;
  testType: string;
  primaryMetric: string;
  status: "draft" | "running" | "stopped" | "winner_declared";
  variants: ABTestVariant[];
  confidenceLevel: number | null;
  winnerVariantId: string | null;
  startedAt: string | null;
}

interface ABTestVariant {
  id: string;
  label: string;
  isControl: boolean;
  content: Record<string, unknown>;
  sampleSize: number;
  conversions: number;
  conversionRate: number;
  probabilityBest: number | null;
}

interface DeclareWinnerPayload {
  variantId: string;
  reason?: string;
}
```

#### Analytics

```
GET /api/v1/conversion-copy/analytics/summary?from={date}&to={date}
GET /api/v1/conversion-copy/analytics/funnel?from={date}&to={date}
GET /api/v1/conversion-copy/analytics/assets?from={date}&to={date}
GET /api/v1/conversion-copy/analytics/attribution?from={date}&to={date}
```

```typescript
interface AnalyticsSummary {
  totalConversions: number;
  conversionRate: number;
  revenueAttributed: string;
  averageOrderValue: string;
  costPerConversion: string;
  periodOverPeriod: {
    conversions: number;
    conversionRate: number;
    revenue: number;
  };
}

interface FunnelData {
  stages: Array<{
    name: string;
    count: number;
    dropOffRate: number;
  }>;
}
```

#### Style Guide

```
GET  /api/v1/conversion-copy/style-guide                    # Get latest style guide
PUT  /api/v1/conversion-copy/style-guide/{section}          # Update section
POST /api/v1/conversion-copy/style-guide/versions           # Create new version
GET  /api/v1/conversion-copy/style-guide/versions           # List versions
GET  /api/v1/conversion-copy/style-guide/versions/{v}       # Get specific version
```

#### Briefs

```
GET    /api/v1/conversion-copy/briefs                     # List briefs
POST   /api/v1/conversion-copy/briefs                     # Create brief
GET    /api/v1/conversion-copy/briefs/{id}                # Get brief detail
PUT    /api/v1/conversion-copy/briefs/{id}                # Update brief
DELETE /api/v1/conversion-copy/briefs/{id}                # Delete brief
POST   /api/v1/conversion-copy/briefs/{id}/transition     # Change status
GET    /api/v1/conversion-copy/briefs/{id}/history        # Get status change history
```

```typescript
interface Brief {
  id: string;
  title: string;
  description: string | null;
  campaignId: string | null;
  assetType: string;
  status:
    | "new"
    | "accepted"
    | "in_progress"
    | "review"
    | "revisions_requested"
    | "approved"
    | "published";
  priority: "low" | "medium" | "high" | "urgent";
  assigneeId: string | null;
  dueDate: string | null;
  attachments: Array<{ name: string; url: string; size: number; type: string }>;
  createdAt: string;
  updatedAt: string;
}

interface TransitionPayload {
  toStatus: Brief["status"];
  comment?: string;
}
```

**Error Codes:**

| Code   | HTTP | Meaning                            |
| ------ | ---- | ---------------------------------- |
| CC_001 | 400  | Invalid asset type                 |
| CC_002 | 400  | Missing required field             |
| CC_003 | 404  | Asset not found                    |
| CC_004 | 409  | Version conflict (concurrent edit) |
| CC_005 | 422  | Validation failed                  |
| CC_006 | 429  | Rate limit exceeded                |
| CC_007 | 500  | Platform sync failure              |

## 6. Component Tree

```
App
└── ConversionCopyModule
    ├── CopyLayout (shared shell)
    │   ├── Sidebar (nav items: Library, Landing Pages, Email Sequences, Ads, A/B Tests, Analytics, Style Guide, Briefs)
    │   └── Breadcrumb
    │
    ├── AssetLibraryPage
    │   ├── AssetSearchBar
    │   ├── AssetFilterBar
    │   │   └── FilterDropdown { label, options, onChange }
    │   ├── AssetViewToggle (grid/table)
    │   ├── AssetGrid / AssetTable
    │   │   └── AssetCard / AssetRow
    │   │       ├── AssetStatusBadge { status }
    │   │       ├── AssetTypeIcon { type }
    │   │       └── AssetActionsDropdown (Edit, Duplicate, Archive)
    │   ├── BulkActionBar { selectedIds, actions[] }
    │   └── Pagination { page, totalPages, onChange }
    │
    ├── LandingPageEditor
    │   ├── EditorToolbar
    │   │   ├── AutoSaveIndicator { status }
    │   │   ├── VariantSelector { variants[], active, onChange }
    │   │   └── PublishButton
    │   ├── SplitPane
    │   │   ├── LivePreview { url, highlightedElements }
    │   │   └── CopyEditorPane
    │   │       ├── ContentTab
    │   │       │   ├── HeroSectionFields (headline, subheadline, ctaText, ctaSubtext)
    │   │       │   ├── ValuePropsEditor (repeating list)
    │   │       │   │   └── ValuePropRow (title, description, icon selector)
    │   │       │   ├── SocialProofEditor
    │   │       │   │   ├── StatRow (number, label)
    │   │       │   │   └── TestimonialRow (quote, author, title, photo, rating)
    │   │       │   ├── FAQEditor (repeating Q&A)
    │   │       │   └── FooterCTAFields
    │   │       ├── SeoTab
    │   │       │   ├── MetaTitleInput { maxChars: 70, counter }
    │   │       │   ├── MetaDescriptionInput { maxChars: 160, counter }
    │   │       │   ├── OGFields
    │   │       │   └── TwitterCardFields
    │   │       ├── SettingsTab
    │   │       │   ├── PixelConfig
    │   │       │   ├── ScarcityTimerConfig
    │   │       │   └── ExitIntentToggle
    │   │       └── VersionHistoryTab
    │   │           └── VersionTimeline
    │   │               └── VersionEntry { version, timestamp, editor, wordCount, onRestore }
    │   └── ConflictModal { onReload, onDiscard }
    │
    ├── EmailSequenceBuilder
    │   ├── SequenceList (sidebar)
    │   │   └── SequenceListItem { name, trigger, emailCount, status, activeToggle }
    │   ├── SequenceCanvas
    │   │   ├── SequenceNode (each email step)
    │   │   │   ├── NodeHeader (subject line preview, delay label)
    │   │   │   └── NodeConnector (drag handle)
    │   │   ├── AddStepButton
    │   │   └── SequenceActions (save, activate, pause)
    │   └── EmailEditorPanel
    │       ├── EmailHeaderFields (subject, preview, sender, reply-to)
    │       ├── EmailBodyEditor (rich text with variable inserter)
    │       ├── VariableInserter { variableGroups, onInsert }
    │       ├── SendConditionEditor (delay, conditional logic)
    │       └── ABTestConfigPanel
    │           ├── SubjectVariantManager
    │           └── BodyVariantManager
    │
    ├── AdCopyManager
    │   ├── PlatformFilterTabs
    │   ├── AdCopyTable
    │   │   └── AdCopyRow
    │   │       ├── PlatformIcon { platform }
    │   │       ├── AdStatusBadge { status }
    │   │       ├── PerformanceMetrics (CTR, CPC, CVR, Spend)
    │   │       └── RowActions
    │   └── AdCopyEditorModal
    │       ├── PlatformFieldFactory { platform } // renders platform-specific fields
    │       ├── VariantList
    │       └── AdPreview { platform, fields }
    │
    ├── ABTestDashboard
    │   ├── TestFilterTabs
    │   ├── TestCardGrid
    │   │   └── TestCard
    │   │       ├── TestStatusBadge
    │   │       ├── VariantPreviewStrip
    │   │       ├── MetricsSummary (sample, confidence, rates)
    │   │       └── ProgressBar
    │   ├── TestDetailModal
    │   │   ├── TestSetupSection
    │   │   ├── ResultsTable
    │   │   │   └── VariantResultRow { label, visitors, conversions, rate, lift, probBest }
    │   │   ├── ResultsChart (recharts line chart with confidence bands)
    │   │   └── DecisionActions (declare winner, stop, apply)
    │   └── NewTestWizard
    │       ├── StepHypothesis
    │       ├── StepVariantSetup
    │       ├── StepTrafficConfig
    │       └── StepReview
    │
    ├── ConversionAnalyticsPage
    │   ├── DateRangeSelector { presets[], onChange }
    │   ├── KpiRow
    │   │   └── KpiCard { label, value, change, trendIcon }
    │   ├── FunnelChart (recharts funnel)
    │   ├── AssetPerformanceTable
    │   │   └── AssetPerformanceRow
    │   ├── AttributionChart (bar chart: first-touch vs last-touch)
    │   └── ExportButton
    │
    ├── StyleGuidePage
    │   ├── StyleGuideSidebar (section nav)
    │   ├── StyleSectionRenderer
    │   │   ├── BrandVoiceSection
    │   │   ├── ToneMatrixSection
    │   │   │   └── ToneRow { situation, tone, directive }
    │   │   ├── TerminologyTable
    │   │   │   └── TermRow { term, allowed, preferred, notes }
    │   │   ├── GrammarRulesSection
    │   │   ├── DoDontExamples
    │   │   │   └── ExampleBlock { context, doEx, dontEx }
    │   │   ├── AccessibilitySection
    │   │   └── FormattingSection
    │   └── ExportPdfButton
    │
    └── BriefIntakePage
        ├── BriefList
        │   └── BriefRow
        │       ├── PriorityBadge { priority }
        │       ├── StatusBadge { status }
        │       ├── DueDateIndicator { date, isOverdue }
        │       └── RowActions
        ├── BriefDetailView
        │   ├── BriefHeaderFields
        │   ├── BriefContextSection
        │   ├── CreativeRequirementsSection
        │   ├── AttachmentsList
        │   ├── ReviewersSelector
        │   └── StatusTransitionButtons
        ├── NewBriefForm
        │   ├── CampaignSelector (linked to marketing_campaigns)
        │   ├── AssetTypeSelector
        │   ├── RichTextEditor
        │   ├── KeywordsInput (tag/chip input)
        │   ├── FileUploader { maxSize: 20MB, multiple }
        │   ├── UserSelect (assignee)
        │   └── DatePicker (deadline)
        └── BriefHistoryTimeline
            └── HistoryEntry { fromStatus, toStatus, changedBy, timestamp, comment }
```

## 7. Exhaustive User Journeys

### Journey 1: Create and Publish a Landing Page from a Brief

1. **Brief received:** Copywriter sees new brief in Brief Intake with status "New" and priority "High"
2. **Accept brief:** Clicks "Accept" → status changes to "In Progress", brief history logged
3. **Open Library:** Navigates to Copy Asset Library, clicks "➕ New Asset" → selects Landing Page
4. **Name asset:** Enters "Summer Tech Bootcamp 2026", sets project/campaign association
5. **Write copy:** Opens Landing Page Copy Editor
   - **Branch: Has brief →** Brief details visible in side panel (target audience, key message, USP, required keywords)
   - **Branch: No brief →** Works from scratch, may create a brief first or proceed directly
6. **Write Hero Section:** Headline "Launch Your Tech Career This Summer", Subheadline "12-week intensive bootcamp. No experience required. Job-ready guaranteed.", CTA "Apply Now →", CTA Subtext "Limited to 30 spots"
7. **Add Value Props:** 3 props — "Expert Instructors (industry professionals)", "Real Projects (build 5 portfolio projects)", "Career Support (interview prep + job matching)"
8. **Add Social Proof:** Stat "93% job placement rate", Testimonial from past student
9. **Write FAQ:** 5 questions covering cost, schedule, prerequisites, certification, refund policy
10. **Fill SEO Metadata:** Meta title "Summer Tech Bootcamp 2026 | Learn to Code | Cyber Elias Academy", Meta description "Join our 12-week summer intensive. Learn full-stack development, AI, or cybersecurity. Graduate job-ready. Enroll now — limited spots!"
11. **Save Draft:** Auto-save triggered on field blur, manual "Save Draft" click
12. **Preview:** Clicks "Preview" → system generates unique preview URL, opens new tab with rendered page
13. **Refine copy:** Reviews preview, makes 3 revisions to headline and CTA
14. **Request Review:** Changes status to "Review", assigns marketing manager as reviewer in modal
15. **Review Feedback:** Manager comments "Headline needs more urgency — add deadline" and requests revisions
16. **Revise:** Copies receive feedback notification, updates headline to "Your Tech Career Starts in 8 Weeks — Apply by July 15", adds scarcity timer
17. **Resubmit:** Submits for another review
18. **Approval:** Manager approves → status "Approved", version finalized
19. **Publish:** Clicks "Publish" → system deploys landing page, generates published URL, sets asset status to "Published"
20. **Post-publish:** Copies analytics URL, shares with marketing team for campaign launch

### Journey 2: Build an Email Nurture Sequence

1. **Goal:** Create 5-email nurture sequence for "Free Workshop" leads to convert to paid course enrollment
2. **Navigate to Email Sequences:** Clicks Email Sequences in sidebar
3. **Create Sequence:** "➕ New Sequence" → name "Free Workshop Follow-up", trigger type "Action: Workshop Registration"
4. **Add Emails (drag-and-drop):**
   - **Email 1 (Immediate):** Subject "Thanks for joining! Here's your workshop replay" + workshop replay link + "Next steps" teaser
   - **Email 2 (Day 1):** Subject "The #1 mistake beginners make (and how to avoid it)" — value-driven content with soft CTA to explore courses
   - **Email 3 (Day 3):** Subject "Meet Sarah — she went from beginner to developer in 6 months" — testimonial/social proof email
   - **Email 4 (Day 5):** Subject "Your exclusive workshop discount expires soon" — scarcity/urgency, limited-time discount
   - **Email 5 (Day 7):** Subject "What's holding you back?" — objection handling, FAQ, final CTA
5. **Configure send conditions:** Email 4 only sends if recipient hasn't enrolled (conditional logic)
6. **Set A/B test on Email 2 subject:** Variant A (control) vs Variant B "Stop making this mistake in your first week of coding"
7. **Configure daily sending cap:** 500/day, send window 8am-8pm EST
8. **Activate:** Toggle sequence to Active
9. **Monitor performance:** After 2 weeks, checks Sequence Performance — open rate 42%, click rate 12%, revenue attributed $3,450
10. **Declare A/B winner:** Variant B wins with 95% significance, applies winning subject line to Email 2 permanently

### Journey 3: Write and Manage Ad Copy Across Platforms

1. **Receives request:** PM requests ad copy for Facebook + Google for "AI Fundamentals course"
2. **Opens Ad Copy Manager:** Filters by campaign "AI Fundamentals Launch"
3. **Creates Facebook Ad:** Platform = Facebook
   - Primary Text (125 chars): "Want to master AI without a math degree? Our AI Fundamentals course takes you from zero to building real ML models in just 8 weeks. No PhD required."
   - Headline (40 chars): "AI Fundamentals — No Degree Needed"
   - Description (30 chars): "Learn AI in 8 weeks. Enroll now."
   - CTA: "Learn More"
4. **Creates 2 variants:** Variant A (benefit-led), Variant B (fear-of-missing-out)
5. **Creates Google Responsive Search Ad:** 5 headlines, 3 descriptions
6. **Submits for review:** Copy goes through approval workflow
7. **Launch:** Ad copy published, platform status syncs via API
8. **Monitor:** Views CTR, CPC from platform sync, identifies winning variant

## 8. Business Rules Engine

| Rule ID   | Rule Description                                                  | Priority | Error Message                                                                     |
| --------- | ----------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------- |
| CC-BR-001 | Headline must not exceed 100 characters                           | Error    | "Headline exceeds 100 character limit."                                           |
| CC-BR-002 | Meta title must be ≤ 70 characters                                | Error    | "Meta title should be 70 characters or fewer for optimal SEO."                    |
| CC-BR-003 | Meta description must be ≤ 160 characters                         | Warning  | "Meta description exceeds 160 characters. It may be truncated in search results." |
| CC-BR-004 | Facebook primary text max 125 characters                          | Error    | "Facebook primary text exceeds 125 character limit."                              |
| CC-BR-005 | Facebook headline max 40 characters                               | Error    | "Facebook headline exceeds 40 character limit."                                   |
| CC-BR-006 | Google RSA requires at least 3 headlines                          | Error    | "Google Responsive Search Ads require a minimum of 3 headlines."                  |
| CC-BR-007 | Google RSA requires at least 2 descriptions                       | Error    | "Google Responsive Search Ads require a minimum of 2 descriptions."               |
| CC-BR-008 | A/B test requires minimum 2 variants                              | Error    | "A/B tests must have at least 2 variants (A and B)."                              |
| CC-BR-009 | A/B test traffic split must sum to 100%                           | Error    | "Traffic allocation across variants must total 100%."                             |
| CC-BR-010 | Email sequence must have at least 1 email                         | Error    | "Email sequences must contain at least one email."                                |
| CC-BR-011 | Brief must specify at least one asset type                        | Error    | "Asset type is required for all briefs."                                          |
| CC-BR-012 | Version content must differ from previous version to save         | Warning  | "No changes detected since last save."                                            |
| CC-BR-013 | Published landing pages must have a headline and CTA              | Error    | "Published pages require both a headline and CTA button text."                    |
| CC-BR-014 | Ad copy with spend > $0 cannot be deleted (must be archived)      | Error    | "Active ad copy with spend cannot be deleted. Archive it instead."                |
| CC-BR-015 | Style guide version is read-only after publishing                 | Error    | "Published style guide versions cannot be edited. Create a new version."          |
| CC-BR-016 | Duplicate asset name auto-appends " (Copy)"                       | Info     | N/A (auto-handled)                                                                |
| CC-BR-017 | Brief over 7 days past due auto-escalates priority                | Warning  | "This brief is overdue. Priority has been escalated."                             |
| CC-BR-018 | A/B test requires significance threshold between 0.80 and 0.99    | Error    | "Significance threshold must be between 80% and 99%."                             |
| CC-BR-019 | Revenue attribution requires conversion tracking pixel configured | Warning  | "No pixel configured. Revenue attribution will not work."                         |
| CC-BR-020 | Only one landing page can be published per slug at a time         | Error    | "A published landing page already exists with this slug."                         |

## 9. Notification Specifications

| Trigger Event                    | Channel        | Template Variables                                                        | Delivery Rules                                |
| -------------------------------- | -------------- | ------------------------------------------------------------------------- | --------------------------------------------- |
| Brief assigned to copywriter     | In-app, Email  | `{{brief_title}}`, `{{campaign_name}}`, `{{due_date}}`, `{{assigned_by}}` | Immediate                                     |
| Brief status changed to "Review" | In-app, Email  | `{{brief_title}}`, `{{requested_by}}`, `{{due_date}}`                     | To assigned reviewers                         |
| Brief revisions requested        | In-app, Email  | `{{brief_title}}`, `{{reviewer_comment}}`, `{{requested_by}}`             | To assigned copywriter                        |
| Brief approved                   | In-app         | `{{brief_title}}`, `{{approved_by}}`                                      | To copywriter only                            |
| Brief overdue                    | In-app, Email  | `{{brief_title}}`, `{{days_overdue}}`                                     | Daily until resolved, to copywriter + manager |
| Landing page published           | In-app         | `{{page_name}}`, `{{published_url}}`                                      | To marketing team                             |
| A/B test reached significance    | In-app, Email  | `{{test_name}}`, `{{winning_variant}}`, `{{confidence_level}}`            | To test owner                                 |
| A/B test auto-stopped            | In-app         | `{{test_name}}`, `{{reason}}`                                             | Immediate                                     |
| Email sequence activated         | In-app         | `{{sequence_name}}`                                                       | To sequence owner                             |
| Email sequence daily cap hit     | In-app         | `{{sequence_name}}`, `{{cap}}`                                            | If cap is reached before send window ends     |
| Style guide version published    | In-app         | `{{version_number}}`, `{{published_by}}`                                  | To all content team members                   |
| Ad copy platform sync failed     | In-app, Email  | `{{ad_name}}`, `{{platform}}`, `{{error_message}}`                        | Immediate, to copywriter                      |
| Conflict detected on asset edit  | In-app (toast) | `{{asset_name}}`, `{{other_editor}}`                                      | Real-time via WebSocket                       |
| Copy export completed            | In-app         | `{{format}}`, `{{download_url}}`                                          | When export is ready                          |

## 10. Permission Matrix

| Entity           | Action                          | Conversion Copywriter | Marketing Manager | Director of Marketing | Admin |
| ---------------- | ------------------------------- | --------------------- | ----------------- | --------------------- | ----- |
| ccAssets         | Create                          | ✓                     | ✓                 | ✓                     | ✓     |
| ccAssets         | Read (own)                      | ✓                     | ✓                 | ✓                     | ✓     |
| ccAssets         | Read (all)                      | -                     | ✓                 | ✓                     | ✓     |
| ccAssets         | Update (own)                    | ✓                     | ✓                 | ✓                     | ✓     |
| ccAssets         | Update (any)                    | -                     | ✓                 | ✓                     | ✓     |
| ccAssets         | Archive                         | -                     | ✓                 | ✓                     | ✓     |
| ccAssets         | Delete                          | -                     | -                 | ✓                     | ✓     |
| ccAssets         | Publish                         | -                     | ✓                 | ✓                     | ✓     |
| ccLandingPages   | Full CRUD                       | ✓ (own)               | ✓                 | ✓                     | ✓     |
| ccEmailSequences | Create/Update                   | ✓                     | ✓                 | ✓                     | ✓     |
| ccEmailSequences | Activate/Pause                  | -                     | ✓                 | ✓                     | ✓     |
| ccEmailSequences | Delete                          | -                     | ✓                 | ✓                     | ✓     |
| ccAdCopy         | Create/Edit                     | ✓                     | ✓                 | ✓                     | ✓     |
| ccAdCopy         | Delete                          | -                     | ✓                 | ✓                     | ✓     |
| ccABTests        | Create                          | ✓                     | ✓                 | ✓                     | ✓     |
| ccABTests        | Declare Winner                  | -                     | ✓                 | ✓                     | ✓     |
| ccABTests        | Delete                          | -                     | -                 | ✓                     | ✓     |
| ccStyleGuide     | Read                            | ✓                     | ✓                 | ✓                     | ✓     |
| ccStyleGuide     | Edit                            | ✓ (draft)             | ✓                 | ✓                     | ✓     |
| ccStyleGuide     | Publish                         | -                     | ✓                 | ✓                     | ✓     |
| ccBriefs         | Create                          | ✓                     | ✓                 | ✓                     | ✓     |
| ccBriefs         | Read (own)                      | ✓                     | ✓                 | ✓                     | ✓     |
| ccBriefs         | Read (all)                      | -                     | ✓                 | ✓                     | ✓     |
| ccBriefs         | Transition (accept/in_progress) | ✓ (own)               | ✓                 | ✓                     | ✓     |
| ccBriefs         | Transition (approve)            | -                     | ✓                 | ✓                     | ✓     |
| ccBriefs         | Transition (publish)            | -                     | ✓                 | ✓                     | ✓     |
| ccAnalytics      | Read                            | ✓                     | ✓                 | ✓                     | ✓     |
| ccAnalytics      | Export                          | ✓                     | ✓                 | ✓                     | ✓     |

## 11. State Management

### Redux Slice: `conversionCopySlice`

```typescript
interface ConversionCopyState {
  assets: {
    items: Asset[];
    loading: boolean;
    error: string | null;
    filters: ListAssetsQuery;
    pagination: Pagination;
  };
  currentAsset: {
    data: Asset | null;
    content: LandingPage | null;
    loading: boolean;
    saving: boolean;
    error: string | null;
    lastSaved: string | null;
    hasUnsavedChanges: boolean;
  };
  emailSequences: {
    list: EmailSequence[];
    current: EmailSequence | null;
    performance: SequencePerformance | null;
    loading: boolean;
  };
  adCopy: {
    items: AdCopy[];
    loading: boolean;
    filters: { platform: string; status: string };
  };
  abTests: {
    items: ABTest[];
    current: ABTest | null;
    results: TestResults | null;
    loading: boolean;
    polling: boolean;
  };
  analytics: {
    summary: AnalyticsSummary | null;
    funnel: FunnelData | null;
    loading: boolean;
    dateRange: { from: string; to: string };
  };
  styleGuide: {
    current: StyleGuide | null;
    loading: boolean;
    saving: boolean;
  };
  briefs: {
    items: Brief[];
    current: Brief | null;
    loading: boolean;
  };
}
```

### RTK Query Endpoints

- `getAssets` - cache 30s, refetch on focus
- `getAsset` - cache 60s
- `updateAssetContent` - optimistic update, rollback on error
- `getEmailSequences` - cache 30s
- `getSequencePerformance` - cache 120s
- `getABTests` - cache 15s (polling when running)
- `getABTestResults` - cache 10s (polling)
- `getAnalyticsSummary` - cache 300s
- `getStyleGuide` - cache 300s
- `getBriefs` - cache 30s

### Optimistic Updates

- Updating landing page copy → immediately reflect in editor, background save with conflict detection
- Transitions on briefs → immediately change status in UI, rollback on API failure
- Variant A/B test updates → local state first, sync when test is running

## 12. Form Schemas (Zod)

```typescript
import { z } from "zod";

export const createAssetSchema = z.object({
  name: z.string().min(1, "Asset name is required").max(255),
  type: z.enum(["landing_page", "email", "ad", "sales_page", "onboarding", "sms", "social"]),
  projectId: z.string().uuid().optional(),
  campaignId: z.string().uuid().optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateLandingPageSchema = z.object({
  headline: z.string().max(100, "Headline must be 100 characters or fewer").optional(),
  subheadline: z.string().max(200).optional(),
  ctaText: z.string().max(40).optional(),
  ctaSubtext: z.string().max(80).optional(),
  valueProps: z
    .array(
      z.object({
        title: z.string().max(100),
        description: z.string().max(300),
        icon: z.string().max(50),
      }),
    )
    .max(6)
    .optional(),
  socialProof: z
    .array(
      z.object({
        type: z.enum(["stat", "testimonial"]),
        value: z.union([
          z.object({ number: z.string(), label: z.string() }),
          z.object({
            quote: z.string(),
            author: z.string(),
            title: z.string().optional(),
            photoUrl: z.string().optional(),
            rating: z.number().min(1).max(5).optional(),
          }),
        ]),
      }),
    )
    .max(15)
    .optional(),
  faq: z
    .array(
      z.object({
        question: z.string().min(1).max(300),
        answer: z.string().min(1).max(2000),
      }),
    )
    .max(20)
    .optional(),
  seoMetaTitle: z.string().max(70, "Meta title must be 70 characters or fewer").optional(),
  seoMetaDescription: z
    .string()
    .max(160, "Meta description must be 160 characters or fewer")
    .optional(),
  ogTitle: z.string().max(100).optional(),
  ogDescription: z.string().max(200).optional(),
  ogImageUrl: z.string().url().optional().or(z.literal("")),
  exitIntentEnabled: z.boolean().optional(),
  scarcityTimerEnabled: z.boolean().optional(),
  scarcityText: z.string().max(100).optional(),
});

export const createEmailSequenceSchema = z.object({
  name: z.string().min(1, "Sequence name is required").max(255),
  description: z.string().max(2000).optional(),
  triggerType: z.enum(["time_delay", "action", "date"]),
  triggerConfig: z.record(z.unknown()),
  dailySendingCap: z.number().int().positive().optional(),
  timezone: z.string().max(50).optional(),
});

export const createSequenceEmailSchema = z.object({
  subjectLine: z.string().max(200).optional(),
  previewText: z.string().max(150).optional(),
  senderName: z.string().max(100).optional(),
  replyToAddress: z.string().email().optional().or(z.literal("")),
  bodyContent: z.string().optional(),
  delayValue: z.number().int().min(0).optional(),
  delayUnit: z.enum(["minutes", "hours", "days", "weeks"]).optional(),
  conditionJson: z.record(z.unknown()).optional(),
  abTestEnabled: z.boolean().optional(),
});

export const createAdCopySchema = z
  .object({
    platform: z.enum(["facebook", "google", "linkedin", "tiktok", "twitter"]),
    campaignId: z.string().optional(),
    headline: z.string().max(200).optional(),
    primaryText: z.string().max(500).optional(),
    description: z.string().max(200).optional(),
    ctaButton: z.string().max(50).optional(),
    linkUrl: z.string().url().optional().or(z.literal("")),
    imageUrl: z.string().url().optional().or(z.literal("")),
    videoUrl: z.string().url().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.platform === "facebook") {
        return !data.primaryText || data.primaryText.length <= 125;
      }
      if (data.platform === "google") {
        return !data.headline || data.headline.length <= 30;
      }
      return true;
    },
    { message: "Platform-specific character limits exceeded" },
  );

export const createABTestSchema = z.object({
  name: z.string().min(1).max(255),
  hypothesis: z.string().max(2000).optional(),
  testType: z.enum(["headline", "cta", "body", "subject_line", "full_page"]),
  primaryMetric: z.enum(["conversion", "click", "open", "revenue"]),
  minimumDetectableEffect: z.number().min(0.01).max(0.5).optional(),
  significanceThreshold: z.number().min(0.8).max(0.99),
  trafficAllocation: z.record(z.number()).optional(),
  variants: z
    .array(
      z.object({
        label: z.enum(["A", "B", "C"]),
        isControl: z.boolean(),
        content: z.record(z.unknown()),
      }),
    )
    .min(2)
    .max(3),
});

export const createBriefSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().max(5000).optional(),
  campaignId: z.string().uuid().optional(),
  projectId: z.string().uuid().optional(),
  assetType: z.enum(["landing_page", "email", "ad", "sales_page", "onboarding", "sms", "social"]),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  assigneeId: z.string().uuid().optional(),
  dueDate: z.string().datetime().optional(),
  targetAudience: z.string().max(2000).optional(),
  desiredAction: z.string().max(500).optional(),
  keyMessage: z.string().max(2000).optional(),
  uniqueSellingPoints: z.array(z.string().max(500)).max(10).optional(),
  persuasionAngle: z
    .enum(["urgency", "authority", "social_proof", "scarcity", "benefit", "problem"])
    .optional(),
  wordCountTarget: z.number().int().positive().optional(),
  requiredKeywords: z.array(z.string().max(100)).max(20).optional(),
  ctaMandate: z.string().max(255).optional(),
  competitorExamples: z.array(z.string().url()).max(5).optional(),
  reviewerIds: z.array(z.string().uuid()).optional(),
});

export const briefTransitionSchema = z
  .object({
    toStatus: z.enum([
      "new",
      "accepted",
      "in_progress",
      "review",
      "revisions_requested",
      "approved",
      "published",
    ]),
    comment: z.string().max(2000).optional(),
  })
  .refine(
    (data) => {
      if (data.toStatus === "revisions_requested") {
        return !!data.comment && data.comment.length >= 10;
      }
      return true;
    },
    { message: "Revisions request requires a comment (min 10 characters)" },
  );
```

## 13. Analytics Events

| Event                         | Properties                                          | Destination             |
| ----------------------------- | --------------------------------------------------- | ----------------------- |
| copy_asset_created            | `{ assetId, type, projectId?, campaignId? }`        | PostHog + Amplitude     |
| copy_asset_updated            | `{ assetId, type, fieldChanged }`                   | PostHog                 |
| copy_asset_published          | `{ assetId, type, versionNumber }`                  | PostHog + GA4           |
| copy_asset_archived           | `{ assetId, type }`                                 | PostHog                 |
| copy_asset_duplicated         | `{ sourceAssetId, newAssetId, type }`               | PostHog                 |
| copy_brief_created            | `{ briefId, assetType, priority }`                  | PostHog                 |
| copy_brief_status_changed     | `{ briefId, fromStatus, toStatus }`                 | PostHog                 |
| copy_brief_overdue            | `{ briefId, daysOverdue }`                          | PostHog + Slack webhook |
| copy_email_sequence_created   | `{ sequenceId, triggerType, emailCount }`           | PostHog                 |
| copy_email_sequence_activated | `{ sequenceId, emailCount }`                        | PostHog                 |
| copy_email_sequence_paused    | `{ sequenceId }`                                    | PostHog                 |
| copy_ab_test_created          | `{ testId, testType, primaryMetric, variantCount }` | PostHog                 |
| copy_ab_test_started          | `{ testId }`                                        | PostHog                 |
| copy_ab_test_winner_declared  | `{ testId, winningVariant, confidenceLevel }`       | PostHog                 |
| copy_ab_test_stopped          | `{ testId, reason }`                                | PostHog                 |
| copy_ad_created               | `{ adId, platform, campaignId? }`                   | PostHog                 |
| copy_ad_edited                | `{ adId, platform, fieldsChanged[] }`               | PostHog                 |
| copy_style_guide_updated      | `{ sectionUpdated, versionNumber }`                 | PostHog                 |
| copy_analytics_exported       | `{ format, dateRange }`                             | PostHog                 |

## 14. Accessibility Requirements

| Requirement                           | Implementation                                                                                                             |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Rich text editor                      | Full WAI-ARIA toolbar pattern, keyboard shortcuts (Ctrl+B bold, Ctrl+I italic), arrow key navigation between toolbar items |
| Drag-and-drop (email sequence canvas) | Keyboard reorder via Alt+Up/Down arrows, drag handle has `role="button"` and `aria-grabbed` state                          |
| Live preview iframe                   | `title` attribute describing the preview, `aria-label="Landing page preview"`                                              |
| Auto-save indicator                   | `role="status"` with `aria-live="polite"` for "Saved" / "Unsaved changes" announcements                                    |
| A/B test results chart                | Accessible via `aria-label` with data summary table below as fallback for screen readers                                   |
| Rich text variable insertion          | `aria-haspopup="listbox"` on the variable button, `role="option"` on each variable                                         |
| Status badges                         | Use semantic color + icon + text (never color alone), `aria-label` includes status text                                    |
| Filter dropdowns                      | `aria-expanded`, `aria-controls` on filter buttons, `role="listbox"` on dropdown                                           |
| Async status notifications            | `role="alert"` with `aria-live="assertive"` for errors, `aria-live="polite"` for success toasts                            |
| Keyboard navigation                   | All interactive elements reachable via Tab, visible focus indicators with 3:1 contrast ratio                               |
| Focus management                      | On modal open → focus first input, on modal close → return focus to trigger element                                        |
| Error announcements                   | Form errors use `aria-describedby` on input fields, `role="alert"` on summary error list                                   |
| Skip link                             | "Skip to main content" link at top of every Conversion Copy page                                                           |
| Color contrast                        | All text meets WCAG AA (4.5:1 for normal text, 3:1 for large text), interactive elements have visible hover/focus states   |

## 15. Error & Edge Case Catalog

| Error Code | Scenario                                                                            | System Response                                                         | User Message                                                                                                                      | Recovery Action                                                   |
| ---------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| CC-ERR-001 | Landing page save fails due to network                                              | Content preserved in local Redux + localStorage backup                  | "Could not save changes. We've saved a local copy. [Retry]"                                                                       | Auto-retry on reconnection, manual "Retry" button                 |
| CC-ERR-002 | Concurrent edit conflict (two writers same asset)                                   | Server returns 409 with latest version diff                             | "Another editor has updated this page. [Reload] [Discard my changes]"                                                             | Reload loads server version, Discard reverts local changes        |
| CC-ERR-003 | Brief attachment exceeds 20MB                                                       | File upload validation rejects                                          | "File exceeds 20MB limit. Please compress and try again."                                                                         | Compress file or use cloud storage link instead                   |
| CC-ERR-004 | Email sequence activation fails because of invalid configuration                    | Server validates sequence rules (e.g., missing emails, invalid trigger) | "Sequence cannot be activated: [specific validation reason]"                                                                      | Fix validation errors listed in message                           |
| CC-ERR-005 | A/B test traffic allocation doesn't sum to 100%                                     | Front-end validation prevents submission                                | "Traffic allocation must total 100%. Currently: {sum}%."                                                                          | Adjust sliders until sum = 100%                                   |
| CC-ERR-006 | Publishing landing page with no CTA button from Approved state                      | Server rejects publish                                                  | "Cannot publish: Landing page must have a CTA button before publishing."                                                          | Add CTA text to the page                                          |
| CC-ERR-007 | Delete ad copy that has > $0 spend                                                  | Server rejects delete                                                   | "This ad copy has active spend ($X.XX). Archive it instead of deleting."                                                          | Use Archive action instead                                        |
| CC-ERR-008 | Database query timeout on asset library (large dataset)                             | Server returns 503, fallback to cached data                             | "Library is taking longer than expected. Showing cached results. [Retry]"                                                         | Retry with filters to narrow results                              |
| CC-ERR-009 | Style guide save when already published                                             | Server creates new draft version instead of editing published           | "Published versions cannot be edited. A new draft version has been created."                                                      | Continue editing in new draft version                             |
| CC-ERR-010 | Facebook/Google platform API rate limit when syncing ad status                      | Queue webhook for later, return accepted (202)                          | "Ad platform sync queued. Results may take a few minutes."                                                                        | Background job processes sync; user can refresh status manually   |
| CC-ERR-011 | A/B test has been running but no variant reaches significance after 30 days         | Auto-stop test with "Inconclusive" result                               | "This test did not reach statistical significance after 30 days. Consider increasing sample size or running a different variant." | Review hypothesis, adjust variants, restart                       |
| CC-ERR-012 | Brief status transition attempted to invalid status (e.g., new → approved directly) | Server rejects with 422, valid transitions documented                   | "Invalid status transition from {currentStatus} to {newStatus}."                                                                  | Follow defined workflow: New→Accepted→In Progress→Review→Approved |
| CC-ERR-013 | Variable `{{undefined_var}}` used in email body                                     | Validation on save identifies undefined variables                       | "Variable {{undefined_var}} is not defined. Check your variable list."                                                            | Replace with valid variable or remove                             |
| CC-ERR-014 | Rich text editor paste event with disallowed HTML                                   | Client-side sanitization strips unsafe tags                             | "Some formatting was removed from pasted content."                                                                                | Review and reapply formatting as needed                           |
| CC-ERR-015 | Asset slug collision on create                                                      | Server suggests slug with UUID suffix (e.g., "my-page-abc123")          | "A similar URL already exists. Using 'my-page-abc123' as the slug."                                                               | Accept or manually change slug                                    |
| CC-ERR-016 | Analytics data not yet available for current date                                   | Server returns empty dataset with message                               | "Analytics for today are still processing. Data typically available within 2 hours."                                              | Check back later or view yesterday's data                         |
| CC-ERR-017 | Review assignment to user who is no longer active in system                         | User selector filters only active users, or warns                       | "Selected reviewer is no longer active. Please choose another reviewer."                                                          | Select a different reviewer                                       |
| CC-ERR-018 | Image upload for landing page fails (invalid format)                                | Validation rejects non-image files                                      | "Only JPEG, PNG, WebP, and SVG files are supported."                                                                              | Upload correct file format                                        |
| CC-ERR-019 | Abandoned email sequence builder with unsaved changes                               | Before navigating away, browser `beforeunload` fires                    | "You have unsaved changes in your email sequence. Are you sure you want to leave?"                                                | Cancel navigation to save, or confirm to discard                  |
| CC-ERR-020 | Bulk archive of 100+ assets                                                         | Server processes in background, returns job ID                          | "Archiving {count} assets. You'll be notified when complete."                                                                     | Background job with notification on completion                    |
