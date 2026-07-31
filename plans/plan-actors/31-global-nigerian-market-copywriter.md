# Actor: Global/Nigerian-market Copywriter

## 1. Identity & Role Definition

**Actor ID:** `global_nigerian_copywriter`
**Display Name:** Global/Nigerian-market Copywriter
**Description:** Writes culturally-adapted copy for both global (English) and Nigerian/West African markets, handling multilingual/multidialect content, localization, and cultural nuance for all marketing and product copy at Cyber Elias Academy. Specializes in Nigerian Pidgin English, Yoruba, Igbo, Hausa linguistic adaptation, and pan-African cultural resonance — ensuring the brand speaks authentically to diverse audiences across Nigeria and the broader African continent while maintaining global quality standards.
**System Role:** `content_creator`
**Hierarchy:** Reports to Director of Marketing / Head of Growth
**Location:** Web dashboard only
**Session Timeout:** 60 minutes of inactivity
**Concurrent Sessions:** 3 max

## 2. Primary Goals & Success KPIs

| Goal                                 | KPI                                       | Target                                     |
| ------------------------------------ | ----------------------------------------- | ------------------------------------------ |
| Market-specific copy quality         | Localization accuracy score               | > 95%                                      |
| Nigerian market engagement           | CTR on Naija-market copy vs generic       | > 40% higher                               |
| Cultural relevance                   | Cultural nuance approval rate             | > 90%                                      |
| Language coverage                    | Languages/dialects supported              | > 5 (English, Pidgin, Yoruba, Igbo, Hausa) |
| Translation turn-around              | Average localization time per asset       | < 24 hours                                 |
| Style guide adherence per market     | Market-specific style guide completeness  | 100%                                       |
| A/B test win rate for localized copy | Localized variant win rate                | > 70%                                      |
| Content coverage                     | % of assets with market-specific variants | > 80% of top content                       |

## 3. Complete Screen Inventory

### 3.1 Content Localization Dashboard (`/localization`)

**Wireframe:** Central dashboard showing localization pipeline, coverage statistics, pending translations, and quality scores per market.

**UI Fields/Components:**

- **Header:** "Content Localization Dashboard" with market selector (Global / Nigeria / Ghana / Kenya / South Africa / Custom)
- **KPI Cards:** Languages Supported, Assets Localized, Pending Translation, Quality Score (%), Active Localization Projects, Avg Turnaround Time
- **Coverage Map:** Geographic heatmap showing which regions have localized content, with coverage percentage per market
- **Recent Activity Feed:** Assets recently localized, published, updated — showing from/to language, asset name, editor
- **Localization Pipeline:** Table of assets in translation queue — Source asset, Source language, Target language, Status (Queued / In Progress / Review / Completed), Priority, Assignee, Due date
- **Quick Actions:** "New Localization Project", "Translate Asset", "Update Glossary", "View Style Guides"

**Data Bindings:**

- `GET /api/localization/dashboard/summary`
- `GET /api/localization/dashboard/coverage`
- `GET /api/localization/dashboard/pipeline`

**States:**

| State              | Behavior                                                             |
| ------------------ | -------------------------------------------------------------------- |
| Loading            | Dashboard skeleton with KPI cards                                    |
| Empty (first time) | "Welcome! Start by defining your markets and adding glossary terms." |
| Error              | "Could not load localization data. [Retry]"                          |

### 3.2 Market-Specific Copy Variants (`/localization/variants`)

**Wireframe:** Side-by-side editor showing the source (global English) copy and its variants across different markets/languages, with market-specific field editing.

**UI Fields/Components:**

- **Asset Selector:** Search and select source asset (from any asset library)
- **Variant Table/Grid:**
  - Columns/Rows per market: Language, Variant status (Up to Date / Out of Sync / Missing / Draft), Last updated, Updated by, Quality score
  - Click row -> opens variant editor
- **Variant Editor (side-by-side or split):**
  - Left pane: Source copy (read-only, highlighted by section)
  - Right pane: Target market copy (editable by section)
  - Section mapping: Each source section mapped to its translated/adapted version
  - Per-section indicators: Auto-translated (AI), Human-translated, Needs review, Approved
  - Variables: `{{variable}}` preserved from source, can be overridden with market-specific variable values
  - Cultural notes panel: Context about idioms, references, images, colors, symbols that need adaptation
- **Variant Actions:** "Save", "Mark as Complete", "Request Review", "Sync from Source" (propagate source changes to existing translations), "View History"
- **Bulk Operations:** Select multiple markets, "Apply Source Changes", "Request Translations"

**Data Bindings:**

- `GET /api/localization/variants?assetId={id}`
- `GET /api/localization/variants/{id}`
- `PUT /api/localization/variants/{id}`
- `POST /api/localization/variants/{id}/sync`
- `POST /api/localization/variants/bulk-sync`

**States:**

| State             | Behavior                                                                  |
| ----------------- | ------------------------------------------------------------------------- |
| Loading           | Split editor skeleton                                                     |
| No variant        | "No {market} variant for this asset. [Create]"                            |
| Out of sync       | Yellow badge: "Source has changed since this variant was updated. [Sync]" |
| Missing variables | Red highlight: `{{variable}}` missing in translation                      |

### 3.3 Translation Memory (`/localization/translation-memory`)

**Wireframe:** Searchable database of previously translated strings/segments with match scoring to accelerate future translations.

**UI Fields/Components:**

- **Search Bar:** Full-text search across source and target strings, filter by language pair, asset type, date range
- **Translation Memory Table:**
  - Columns: Source string (English), Target string, Language pair, Asset type, Match count, Last used, Created by
  - Exact matches and fuzzy matches (90%+, 75-89%, < 75%)
- **Add Entry Form:** Source text, Target text, Language pair, Context/notes, Asset type tag
- **Bulk Import:** Upload TMX file or CSV
- **Statistics:** Total entries by language pair, match rate, reuse rate
- **"Use in Translation" button** — copies matched string to clipboard or opens in variant editor

**Data Bindings:**

- `GET /api/localization/translation-memory`
- `POST /api/localization/translation-memory`
- `POST /api/localization/translation-memory/import`
- `GET /api/localization/translation-memory/search`
- `DELETE /api/localization/translation-memory/{id}`

**States:**

| State          | Behavior                                                             |
| -------------- | -------------------------------------------------------------------- |
| Loading        | Table skeleton                                                       |
| Empty          | "Translation memory is empty. Add entries as you translate content." |
| Search results | "Found {count} matches ({exact} exact, {fuzzy} fuzzy)"               |

### 3.4 Cultural Glossary (`/localization/glossary`)

**Wireframe:** Living glossary of culturally-significant terms, idioms, references, taboos, and their appropriate handling across markets.

**UI Fields/Components:**

- **Sidebar:** Term categories (Idioms / Colors / Symbols / Gestures / Holidays / Taboos / Slang / Measurements / Date Formats / Number Formats / Currency)
- **Glossary Table:** Term (English), Market, Approved translation/adaptation, Usage notes, Cultural context, Status (Approved / Draft / Needs Research)
- **Glossary Entry Detail/Form:**
  - Term (English), Market(s) applicable
  - Approved adaptation(s) per market
  - Context/usage example sentence
  - Cultural notes (what to avoid, what to emphasize, connotations)
  - Related terms
  - Source/reference
  - Category tags
  - Status
- **Search:** Search across terms, markets, notes
- **Export:** "Export Glossary" as CSV or PDF
- **Import:** "Import Glossary" CSV

**Data Bindings:**

- `GET /api/localization/glossary`
- `POST /api/localization/glossary`
- `GET /api/localization/glossary/{id}`
- `PUT /api/localization/glossary/{id}`
- `DELETE /api/localization/glossary/{id}`
- `GET /api/localization/glossary/export`

**States:**

| State          | Behavior                                                               |
| -------------- | ---------------------------------------------------------------------- |
| Loading        | Table skeleton                                                         |
| Empty          | "Glossary is empty. Add culturally significant terms for each market." |
| Needs research | Tag: "Cultural validation required" for unverified entries             |

### 3.5 Style Guide Per Market (`/localization/style-guides`)

**Wireframe:** Market-specific brand voice, tone, formatting, and linguistic rules — separate from the global style guide but inheriting base rules.

**UI Fields/Components:**

- **Market Selector:** Dropdown of defined markets
- **Style Guide Sections (per market):**
  - **Brand Voice — Localized:** How brand personality translates (e.g., "Authoritative but approachable" in English vs "E get level but we sabi greet" in Pidgin)
  - **Tone Matrix (per market/situation):** Same situations as global, but market-specific tone directives
  - **Language Rules:**
    - Pidgin English: Standardized orthography rules (e.g., "sabi" not "saw-bee", "dey" not "deh"), common phrases approved list, code-switching rules (when to use Pidgin vs Standard English)
    - Yoruba: Tone marks rules (do/don't), loanword handling, formal vs informal address
    - Igbo: Dialectal variations (Nsukka vs Owerri vs Onitsha), vowel harmony rules
    - Hausa: Gender-specific address, honorifics, religious context sensitivity
  - **Localization-Specific Rules:**
    - Date format (DD/MM/YYYY for Nigeria)
    - Currency formatting (NGN, ₦, kobo)
    - Phone number format (+234 XXX XXX XXXX)
    - Address format rules
    - Units of measurement (metric)
  - **Do/Don't by Market:** Culturally sensitive topics, advertising regulations, religious considerations
  - **Examples:** Before/after localization examples
  - **"Inherit from Global" toggle** — per section, inherit global style guide rules with overrides
- **Status per market:** Draft / In Review / Published

**Data Bindings:**

- `GET /api/localization/style-guides?market={marketId}`
- `PUT /api/localization/style-guides/{id}`
- `POST /api/localization/style-guides/{id}/publish`

**States:**

| State    | Behavior                                                                |
| -------- | ----------------------------------------------------------------------- |
| Loading  | Document skeleton                                                       |
| Empty    | "No style guide for this market. Create one by inheriting from global." |
| Outdated | Badge: "Last updated {date}. Global style guide has changed."           |

### 3.6 Localized Landing Page Preview (`/localization/preview`)

**Wireframe:** Side-by-side or overlay preview of how a landing page renders in each market — showing translated copy, localized images, currency, dates, and culturally-adapted layout.

**UI Fields/Components:**

- **Asset Selector:** Select landing page
- **Market Preview Tabs:** Tabs for each market variant (Global English, Naija English, Pidgin, Yoruba, Igbo, Hausa)
- **Preview Pane (main):** Full rendered page with market-specific content — copy, images, CTA buttons with market text, currency symbols, date formats
- **Sidebar (differences):** Annotated list of what changed for this market variant:
  - Copy: {section} changed from "{source}" to "{localized}"
  - Images: "{global-image.jpg}" replaced with "{naija-image.jpg}"
  - Offers: Currency converted, pricing localized
- **Validation Panel:** Checks for completeness — missing translations, untranslated variables, image alt text missing in target language, character overflow warnings
- **"Publish Variant" button:** Publish this market-specific version
- **"Preview on Mobile" toggle:** Mobile-responsive preview

**Data Bindings:**

- `GET /api/localization/preview?assetId={id}&market={marketId}`
- `POST /api/localization/preview/{id}/publish`

**States:**

| State              | Behavior                                                                |
| ------------------ | ----------------------------------------------------------------------- |
| Loading            | Full-page preview skeleton                                              |
| Missing sections   | Red highlight on untranslated sections with "Not yet localized" overlay |
| Image missing      | Placeholder with "Localized image needed" note                          |
| Validation warning | Yellow banner: "3 sections need attention before publishing"            |

### 3.7 Dialect Variant Manager (`/localization/dialects`)

**Wireframe:** Manage dialectal variations within a language — e.g., different Pidgin variants (Lagos Pidgin vs Port Harcourt Pidgin vs Abuja Pidgin) or Igbo dialects.

**UI Fields/Components:**

- **Language Selector:** Select language with dialect variations
- **Dialect Variant Table:** Dialect name, Region, Estimated speakers, Variant status (Active / Deprecated / Research), Completion % (how many assets have this dialect variant), Last updated
- **Dialect Comparison Tool:** Side-by-side comparison of the same copy in different dialects — highlights vocabulary, grammar, and pronunciation differences
- **Dialect Editor (per asset):** Similar to Market Variant Editor but specific to dialect
- **Map View:** Geographic distribution of dialects (if map data available)
- **Dialect Mapping Rules:** Rules for auto-converting between dialects (e.g., standard Pidgin -> Lagos Pidgin rules)
- **Speaker Notes:** Cultural context about when to use each dialect

**Data Bindings:**

- `GET /api/localization/dialects?language={lang}`
- `GET /api/localization/dialects/{id}`
- `PUT /api/localization/dialects/{id}`
- `POST /api/localization/dialects`
- `GET /api/localization/dialects/{id}/compare`

**States:**

| State          | Behavior                                                      |
| -------------- | ------------------------------------------------------------- |
| Loading        | Table skeleton                                                |
| Empty          | "No dialect variants defined for this language."              |
| Research phase | Badge: "Under research — not yet approved for production use" |

### 3.8 Market Performance Analytics (`/localization/analytics`)

**Wireframe:** Performance comparison of localized copy vs generic/English copy across markets — showing conversion rates, engagement metrics, and market-specific ROI.

**UI Fields/Components:**

- **Market Selector:** Select one or more markets to compare
- **Performance KPIs per Market:**
  - Impressions, Clicks, CTR, Conversions, Conversion Rate, Revenue, ROAS
  - Each compared to: generic English version (baseline), other markets
- **Localization Impact Chart:** Bar/line chart showing KPI before localization vs after
- **Asset-Level Performance:** Table of localized assets with performance compared to their English source
  - Columns: Asset name, Market, Localized version CTR, English CTR, Lift %, Localized Conversion Rate, English Conversion Rate, Lift %
  - Sortable, filterable
- **A/B Test Results:** If A/B tests were run (localized vs global), show test results per market
- **Funnel Comparison:** Compare localized vs non-localized user journey through signup/enrollment funnel
- **Heatmap:** Market-level engagement heatmap overlay on geographic map
- **Export:** "Export Market Report" PDF/CSV

**Data Bindings:**

- `GET /api/localization/analytics/summary?markets={ids}`
- `GET /api/localization/analytics/asset-performance`
- `GET /api/localization/analytics/localization-impact`
- `GET /api/localization/analytics/funnel-comparison`

**States:**

| State             | Behavior                                                               |
| ----------------- | ---------------------------------------------------------------------- |
| Loading           | Chart skeletons + table shimmer                                        |
| No data           | "Deploy localized content to see performance data."                    |
| Insufficient data | "Insufficient data for statistical significance. More traffic needed." |

## 4. Full Database Schema

```typescript
// --- Localization Schema (loc_) ---

export const locMarkets = pgTable('loc_markets', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  code: varchar('code', { length: 10 }).unique().notNull(), // ng, gh, ke, za, us, uk, global
  displayName: varchar('display_name', { length: 255 }),
  region: varchar('region', { length: 100 }), // west_africa,east_africa,southern_africa,north_america,europe,asia
  defaultLanguage: varchar('default_language', { length: 50 }), // en, pidgin, yo, ig, ha
  currency: varchar('currency', { length: 10 }), // NGN, USD, GBP, KES, GHS, ZAR
  dateFormat: varchar('date_format', { length: 30 }).default('DD/MM/YYYY'),
  timezone: varchar('timezone', { length: 50 }),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const locLanguages = pgTable('loc_languages', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(), // English, Nigerian Pidgin, Yoruba, Igbo, Hausa
  code: varchar('code', { length: 10 }).unique().notNull(), // en, pcm, yo, ig, ha
  script: varchar('script', { length: 50 }), // Latin, Latin-extended, Arabic (for Ajami)
  direction: varchar('direction', { length: 10 }).default('ltr'), // ltr, rtl
  family: varchar('family', { length: 50 }), // germanic, niger-congo, afro-asiatic
  nativeSpeakerCount: varchar('native_speaker_count', { length: 100 }),
  hasDialects: boolean('has_dialects').default(false),
  active: boolean('active').default(true),
});

export const locDialects = pgTable('loc_dialects', {
  id: uuid('id').defaultRandom().primaryKey(),
  languageId: uuid('language_id').references(() => locLanguages.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(), // Lagos Pidgin, Port Harcourt Pidgin, Onitsha Igbo
  region: varchar('region', { length: 255 }),
  description: text('description'),
  status: varchar('status', { length: 30 }).default('research'), // research,active,deprecated
  priority: integer('priority').default(0), // for ranking dialect importance
  conversionRules: jsonb('conversion_rules').default('{}'),
});

export const locAssetVariants = pgTable('loc_asset_variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  assetId: uuid('asset_id').notNull(), // references any asset type table
  assetType: varchar('asset_type', { length: 50 }).notNull(), // landing_page,email,ad,etc
  marketId: uuid('market_id').references(() => locMarkets.id).notNull(),
  languageId: uuid('language_id').references(() => locLanguages.id).notNull(),
  dialectId: uuid('dialect_id').references(() => locDialects.id),
  status: varchar('status', { length: 30 }).default('draft'), // draft,completed,review,approved,published,out_of_sync
  sourceVersion: integer('source_version').default(1),
  variantVersion: integer('variant_version').default(1),
  content: jsonb('content').notNull(),
  qualityScore: integer('quality_score'), // 0-100
  localizationMethod: varchar('localization_method', { length: 30 }).default('manual'), // manual,ai_translated,ai_reviewed,machine
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  reviewedAt: timestamp('reviewed_at'),
  publishedAt: timestamp('published_at'),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  unique(['asset_id', 'asset_type', 'market_id', 'language_id']),
});

export const locTranslationMemory = pgTable('loc_translation_memory', {
  id: uuid('id').defaultRandom().primaryKey(),
  sourceText: text('source_text').notNull(),
  targetText: text('target_text').notNull(),
  sourceLanguage: varchar('source_language', { length: 10 }).notNull(),
  targetLanguage: varchar('target_language', { length: 10 }).notNull(),
  context: text('context'),
  assetType: varchar('asset_type', { length: 50 }),
  matchCount: integer('match_count').default(0),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const locGlossary = pgTable('loc_glossary', {
  id: uuid('id').defaultRandom().primaryKey(),
  term: varchar('term', { length: 255 }).notNull(),
  marketIds: uuid('market_ids').array(),
  approvedTranslation: varchar('approved_translation', { length: 500 }),
  alternativeTranslations: text('alternative_translations').array(),
  usageExample: text('usage_example'),
  culturalContext: text('cultural_context'),
  connotations: varchar('connotations', { length: 50 }), // positive,negative,neutral,varies
  category: varchar('category', { length: 50 }), // idiom,color,symbol,holiday,taboo,slang,measurement
  status: varchar('status', { length: 30 }).default('draft'), // draft,approved,needs_research
  source: varchar('source', { length: 255 }),
  relatedTermIds: uuid('related_term_ids').array(),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const locStyleGuides = pgTable('loc_style_guides', {
  id: uuid('id').defaultRandom().primaryKey(),
  marketId: uuid('market_id').references(() => locMarkets.id).notNull().unique(),
  languageId: uuid('language_id').references(() => locLanguages.id).notNull(),
  status: varchar('status', { length: 30 }).default('draft'),
  brandVoice: jsonb('brand_voice').default('{}'), // localized brand voice description
  toneMatrix: jsonb('tone_matrix').default('[]'), // market-specific tones per situation
  languageRules: jsonb('language_rules').default('{}'),
  localizationRules: jsonb('localization_rules').default('{}'),
  doDontExamples: jsonb('do_dont_examples').default('[]'),
  formattingRules: jsonb('formatting_rules').default('{}'),
  inheritFromGlobal: boolean('inherit_from_global').default(true),
  version: integer('version').default(1),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const locLocalizationProjects = pgTable('loc_localization_projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  sourceLanguageId: uuid('source_language_id').references(() => locLanguages.id).notNull(),
  targetLanguages: uuid('target_languages').array().notNull(),
  assetIds: jsonb('asset_ids').default('[]'), // [{ assetId, assetType }]
  status: varchar('status', { length: 30 }).default('planning'), // planning,in_progress,review,completed
  priority: varchar('priority', { length: 20 }).default('medium'),
  dueDate: timestamp('due_date'),
  totalAssets: integer('total_assets').default(0),
  completedAssets: integer('completed_assets').default(0),
  projectManagerId: uuid('project_manager_id').references(() => users.id),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const locCulturalNotes = pgTable('loc_cultural_notes', {
  id: uuid('id').defaultRandom().primaryKey(),
  assetVariantId: uuid('asset_variant_id').references(() => locAssetVariants.id).notNull(),
  note: text('note').notNull(),
  category: varchar('category', { length: 50 }), // idiom,reference,image,color,symbol,religion,taboo
  suggestedAction: text('suggested_action'),
  resolved: boolean('resolved').default(false),
  resolvedBy: uuid('resolved_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

CREATE INDEX idx_loc_variants_asset ON locAssetVariants(asset_id, asset_type);
CREATE INDEX idx_loc_variants_market ON locAssetVariants(market_id);
CREATE INDEX idx_loc_variants_language ON locAssetVariants(language_id);
CREATE INDEX idx_loc_variants_status ON locAssetVariants(status);
CREATE INDEX idx_loc_tm_source ON locTranslationMemory(source_text);
CREATE INDEX idx_loc_tm_languages ON locTranslationMemory(source_language, target_language);
CREATE INDEX idx_loc_glossary_term ON locGlossary(term);
CREATE INDEX idx_loc_glossary_category ON locGlossary(category);
CREATE INDEX idx_loc_projects_status ON locLocalizationProjects(status);
```

## 5. Complete API Contract

### Endpoints

```
GET    /api/v1/localization/dashboard/summary
GET    /api/v1/localization/dashboard/coverage
GET    /api/v1/localization/dashboard/pipeline

GET    /api/v1/localization/markets
POST   /api/v1/localization/markets
GET    /api/v1/localization/markets/{id}
PUT    /api/v1/localization/markets/{id}

GET    /api/v1/localization/languages
POST   /api/v1/localization/languages

GET    /api/v1/localization/dialects
POST   /api/v1/localization/dialects
GET    /api/v1/localization/dialects/{id}
PUT    /api/v1/localization/dialects/{id}
GET    /api/v1/localization/dialects/{id}/compare

GET    /api/v1/localization/variants?assetId={id}&assetType={type}
POST   /api/v1/localization/variants
GET    /api/v1/localization/variants/{id}
PUT    /api/v1/localization/variants/{id}
POST   /api/v1/localization/variants/{id}/sync
POST   /api/v1/localization/variants/{id}/publish
POST   /api/v1/localization/variants/bulk-sync

GET    /api/v1/localization/translation-memory
POST   /api/v1/localization/translation-memory
DELETE /api/v1/localization/translation-memory/{id}
GET    /api/v1/localization/translation-memory/search
POST   /api/v1/localization/translation-memory/import

GET    /api/v1/localization/glossary
POST   /api/v1/localization/glossary
GET    /api/v1/localization/glossary/{id}
PUT    /api/v1/localization/glossary/{id}
DELETE /api/v1/localization/glossary/{id}
GET    /api/v1/localization/glossary/export
POST   /api/v1/localization/glossary/import

GET    /api/v1/localization/style-guides?marketId={id}
PUT    /api/v1/localization/style-guides/{id}
POST   /api/v1/localization/style-guides/{id}/publish

GET    /api/v1/localization/preview?assetId={id}&marketId={mid}
POST   /api/v1/localization/preview/{id}/publish

GET    /api/v1/localization/projects
POST   /api/v1/localization/projects
GET    /api/v1/localization/projects/{id}
PUT    /api/v1/localization/projects/{id}
POST   /api/v1/localization/projects/{id}/complete

GET    /api/v1/localization/analytics/summary
GET    /api/v1/localization/analytics/asset-performance
GET    /api/v1/localization/analytics/localization-impact
GET    /api/v1/localization/analytics/funnel-comparison
```

**Types:**

```typescript
interface Market {
  id: string;
  name: string;
  code: string;
  region: string;
  defaultLanguage: string;
  currency: string;
  dateFormat: string;
  timezone: string | null;
  active: boolean;
}

interface Language {
  id: string;
  name: string;
  code: string;
  script: string;
  direction: "ltr" | "rtl";
  family: string;
  hasDialects: boolean;
}

interface Dialect {
  id: string;
  languageId: string;
  name: string;
  region: string;
  status: "research" | "active" | "deprecated";
  priority: number;
}

interface AssetVariant {
  id: string;
  assetId: string;
  assetType: string;
  marketId: string;
  languageId: string;
  dialectId: string | null;
  status: string;
  content: Record<string, unknown>;
  qualityScore: number | null;
  localizationMethod: string;
  sourceVersion: number;
  variantVersion: number;
  createdAt: string;
}

interface TranslationMemoryEntry {
  id: string;
  sourceText: string;
  targetText: string;
  sourceLanguage: string;
  targetLanguage: string;
  matchCount: number;
}

interface GlossaryEntry {
  id: string;
  term: string;
  marketIds: string[];
  approvedTranslation: string | null;
  culturalContext: string | null;
  category: string;
  status: string;
}

interface LocalizationProject {
  id: string;
  name: string;
  targetLanguages: string[];
  status: "planning" | "in_progress" | "review" | "completed";
  totalAssets: number;
  completedAssets: number;
  dueDate: string | null;
}
```

**Error Codes:**

| Code    | HTTP | Meaning                                   |
| ------- | ---- | ----------------------------------------- |
| LOC_001 | 400  | Invalid language/dialect combination      |
| LOC_002 | 400  | Variant content missing required sections |
| LOC_003 | 404  | Market not found                          |
| LOC_004 | 404  | Source asset not found                    |
| LOC_005 | 409  | Variant version conflict (source updated) |
| LOC_006 | 422  | Translation memory import format error    |
| LOC_007 | 422  | Glossary term already exists              |
| LOC_008 | 500  | Localization generation failure           |

## 6. Component Tree

```
App
+-- LocalizationModule
    +-- LocalizationLayout (shell)
    |   +-- Sidebar (Dashboard, Variants, Translation Memory, Glossary, Style Guides, Preview, Dialects, Projects, Analytics)
    |   +-- Breadcrumb
    |
    +-- LocalizationDashboard
    |   +-- KpiCards
    |   +-- CoverageMap
    |   +-- ActivityFeed
    |   +-- PipelineTable
    |   |   +-- PipelineRow { asset, source, target, status, assignee }
    |   +-- QuickActions
    |
    +-- MarketVariantPage
    |   +-- AssetSelector (search + recent assets)
    |   +-- VariantTable
    |   |   +-- VariantRow { market, language, status, lastUpdated, actions }
    |   +-- VariantEditor (split pane)
    |   |   +-- SourcePane { content, read-only, highlightedSections }
    |   |   +-- TargetPane
    |   |   |   +-- SectionEditor { sectionKey, sourceText, targetText, status }
    |   |   |   +-- VariablePreserver { variables[] }
    |   |   |   +-- CulturalNotesPanel { notes[], onAdd }
    |   |   +-- VariantToolbar { save, complete, requestReview, sync }
    |   +-- BulkActionsBar
    |
    +-- TranslationMemoryPage
    |   +-- SearchBar
    |   +-- TMTable
    |   |   +-- TMEntryRow { source, target, languages, matchCount }
    |   +-- AddEntryForm
    |   +-- BulkImportModal
    |   +-- StatisticsPanel
    |
    +-- GlossaryPage
    |   +-- GlossarySidebar { categories }
    |   +-- GlossaryTable
    |   |   +-- GlossaryEntryRow { term, translation, market, category, status }
    |   +-- GlossaryEntryModal
    |   |   +-- TermField
    |   |   +-- MarketMultiSelect
    |   |   +-- TranslationField
    |   |   +-- CulturalContextEditor
    |   |   +-- CategorySelector
    |   +-- ExportImportButtons
    |
    +-- MarketStyleGuidesPage
    |   +-- MarketSelector
    |   +-- StyleGuideContent
    |   |   +-- BrandVoiceSection
    |   |   +-- ToneMatrixSection
    |   |   +-- LanguageRulesSection
    |   |   |   +-- LanguageRuleGroup { ruleCategory, rules[] }
    |   |   +-- LocalizationRulesSection
    |   |   +-- DoDontSection
    |   |   +-- InheritToggle { sectionName, enabled }
    |   +-- PublishButton
    |
    +-- LocalizedPreviewPage
    |   +-- AssetSelector
    |   +-- MarketTabBar { tabs }
    |   +-- PreviewPane { iframe }
    |   +-- DiffPanel { differences[] }
    |   |   +-- DiffItem { section, source, localized, status }
    |   +-- ValidationPanel { warnings[], errors[] }
    |   +-- PublishControls
    |
    +-- DialectManager
    |   +-- LanguageSelector
    |   +-- DialectList
    |   |   +-- DialectCard { name, region, status, coverage }
    |   +-- DialectDetail
    |   |   +-- DialectInfo { name, region, description }
    |   |   +-- ConversionRulesEditor
    |   |   +-- ComparisonTool
    |   |   |   +-- ComparisonRow { standard, dialect, diff }
    |   +-- AddDialectForm
    |
    +-- LocalizationProjectsPage
    |   +-- ProjectList
    |   |   +-- ProjectCard { name, languages, progress, dueDate }
    |   +-- ProjectDetail
    |       +-- ProjectHeader
    |       +-- AssetAssignmentList
    |       +-- ProgressTracker
    |       +-- TeamView
    |
    +-- LocalizationAnalyticsPage
        +-- MarketSelector (multi-select)
        +-- KpiRow
        +-- LocalizationImpactChart
        +-- AssetPerformanceTable
        |   +-- AssetPerformanceRow { asset, market, localizedCTR, globalCTR, lift }
        +-- FunnelComparison
        +-- ExportButton
```

## 7. Exhaustive User Journeys

### Journey 1: Localize a Landing Page for Nigerian Market (Pidgin English)

1. Copywriter receives brief: Localize "Full-Stack Bootcamp" landing page for Nigerian market
2. Opens Market Variant Page, selects source landing page "full-stack-bootcamp"
3. Creates new variant: Market = Nigeria, Language = Nigerian Pidgin English
4. Opens Variant Editor with split pane
5. **Hero Section:**
   - Source: "Launch Your Tech Career in 12 Weeks"
   - Localized: "Launch Your Tech Career for 12 Weeks — No Experience Needed"
   - Pidgin: "Get Your Tech Career Dey Go for 12 Weeks"
   - Cultural note: "For Nigerian audience, use 'dey go' (in progress) to convey momentum and progress. Avoid 'launch' which sounds too corporate."
6. **Value Props:**
   - Source: "Expert Instructors"
   - Pidgin: "Oga Instructors Wey Sabi Well Well" (using "Oga" for boss/expert + "Wey Sabi Well Well" for very knowledgeable)
7. **CTA:**
   - Source: "Apply Now"
   - Pidgin: "Apply Now" (kept in English as Nigerian Pidgin commonly code-switches for CTAs — per style guide)
8. **Social Proof:**
   - Source: "93% job placement rate"
   - Pidgin: "93% of our students don land job within 6 months" ("don land job" = have gotten jobs)
9. **Glossary Check:** Checks Pidgin style guide for approved terms. "Sabi" is preferred over "know" in this context.
10. **Translation Memory:** Searches TM for "launch your career" - finds 3 previous translations, reuses "Make Your Career Dey Go"
11. Adds cultural note: "The Naira equivalent pricing and local payment options (USSD, bank transfer) should be highlighted prominently in a banner for Nigerian viewers."
12. Saves variant, marks as Complete, requests review from Nigerian market specialist
13. Specialist reviews, approves. Quality score: 94%
14. Opens Localized Preview, sees full rendered page in Pidgin
15. Publishes variant -> serves to Nigerian traffic segment

### Journey 2: Create a Yoruba Style Guide

1. Opens Market Style Guides, selects market = Nigeria, language = Yoruba
2. Inherits from Global style guide
3. Customizes Brand Voice: "The CEA voice in Yoruba should be 'Alaigbọran ṣùgbọ́n ọ̀rẹ́' (Authoritative but friendly). Use 'Ẹ kú' for formal plural, 'O kú' for informal singular."
4. Sets Tone Matrix:
   - Onboarding: "Warm and encouraging — 'Ẹ káàbọ̀ sí ilé ẹ̀kọ́!' (Welcome to the school of learning!)"
   - Error: "Apologetic and helpful — 'Ẹ dákun, àṣìṣe kan wa. Ẹ tún gbìyànjú.' (Sorry, there is an error. Try again.)"
5. Language Rules:
   - Tone marks: Required for all Yoruba text — "Ẹ kú iṣẹ́" not "E ku ise"
   - Loanwords: Use Yoruba adaptations over English where possible — "kọ̀ǹpútà" over "computer"
   - Numbers: Use Yoruba number system for localized feel — "ẹ̀ẹ́dógún" (15) over "mẹ́ẹ̀ẹ́dógún"
6. Localization Rules:
   - Currency: "₦5,000" (NGN)
   - Date: "Ọjọ́ 25 Oṣù Keje 2026" (25 July 2026)
   - Phone: "+234 803 XXX XXXX"
7. Publish style guide for Yoruba -> available to all copywriters

### Journey 3: Set Up Dialect Variant for Port Harcourt Pidgin

1. Notices Lagos Pidgin and Port Harcourt Pidgin have significant differences in vocabulary
2. Opens Dialect Manager, creates new dialect: "Port Harcourt Pidgin" under Nigerian Pidgin
3. Defines region: "Rivers State, South-South Nigeria"
4. Sets conversion rules:
   - "abi" (Lagos) -> "shebi" (PH)
   - "how far" (Lagos) -> "how na" (PH)
   - "wetin" (Lagos) -> "watin" (PH)
   - "dem dey" (Lagos) -> "dem dey" (same)
5. Creates comparison: side-by-side view of "Standard Pidgin" vs "Port Harcourt Pidgin"
6. Status = Active
7. Assigns asset variants for high-traffic landing pages to also produce PH variant

## 8. Business Rules Engine

| Rule ID    | Description                                           | Priority | Message                                                                     |
| ---------- | ----------------------------------------------------- | -------- | --------------------------------------------------------------------------- |
| LOC-BR-001 | All localized variants must preserve source variables | Error    | "Variable {{var}} is missing from translation."                             |
| LOC-BR-002 | Pidgin English must follow approved orthography       | Warning  | "Use 'sabi' not 'saw-bee'. Check style guide."                              |
| LOC-BR-003 | Tone marks required for Yoruba and Igbo               | Error    | "Yoruba text missing tone marks on word(s): {words}"                        |
| LOC-BR-004 | Market-specific currency must be used                 | Warning  | "Variant uses USD for Nigeria market. Should use NGN."                      |
| LOC-BR-005 | Date format must match market standard                | Error    | "Use DD/MM/YYYY for Nigeria market (not MM/DD/YYYY)."                       |
| LOC-BR-006 | Phone number must use country code                    | Warning  | "Nigerian numbers should use +234 format."                                  |
| LOC-BR-007 | Glossary term must be used for banned/approved terms  | Error    | "Term '{term}' has a glossary entry. Use approved translation."             |
| LOC-BR-008 | Localized variant must be reviewed by native speaker  | Error    | "Variant requires review by a native {language} speaker before publishing." |
| LOC-BR-009 | Image alt text must exist in target language          | Warning  | "Image alt text missing in {language} variant."                             |
| LOC-BR-010 | Code-switching allowed only per style guide rules     | Info     | "Code-switching {source} -> {target} follows approved pattern."             |
| LOC-BR-011 | Variant out of sync when source updated               | Warning  | "Source has been updated. Sync required before publishing variant."         |
| LOC-BR-012 | Translation memory reuse tracked for attribution      | Info     | "90% match from TM entry #{id}. Reuse logged."                              |
| LOC-BR-013 | Dialect must be linked to a parent language           | Error    | "Dialect must be associated with a parent language."                        |

## 9. Notification Specifications

| Trigger Event                        | Channel       | Template Variables                                                            | Delivery Rules                    |
| ------------------------------------ | ------------- | ----------------------------------------------------------------------------- | --------------------------------- |
| New localization project assigned    | In-app, Email | `{{project_name}}`, `{{target_languages}}`, `{{asset_count}}`, `{{due_date}}` | Immediate                         |
| Variant out of sync (source updated) | In-app        | `{{asset_name}}`, `{{market}}`, `{{language}}`                                | When source asset is updated      |
| Translation ready for review         | In-app        | `{{asset_name}}`, `{{market}}`, `{{language}}`                                | To assigned reviewer              |
| Review completed (approved)          | In-app        | `{{asset_name}}`, `{{market}}`, `{{quality_score}}`                           | To translator                     |
| Review completed (revisions needed)  | In-app, Email | `{{asset_name}}`, `{{feedback_summary}}`                                      | To translator                     |
| Glossary term proposed               | In-app        | `{{term}}`, `{{proposed_by}}`                                                 | To glossary admin                 |
| Cultural note flagged                | In-app        | `{{asset_name}}`, `{{market}}`, `{{note_preview}}`                            | To market specialist              |
| Style guide published                | In-app        | `{{market}}`, `{{language}}`, `{{version}}`                                   | To copywriting team               |
| Market performance benchmark crossed | In-app        | `{{market}}`, `{{metric}}`, `{{value}}`                                       | When localized outperforms global |
| Localization project completed       | In-app        | `{{project_name}}`, `{{completed_assets}}`, `{{total_assets}}`                | To project manager                |

## 10. Permission Matrix

| Entity               | Action         | Global/Nigerian Copywriter | Conversion Copywriter | Market Specialist | Admin |
| -------------------- | -------------- | -------------------------- | --------------------- | ----------------- | ----- |
| locMarkets           | Manage         | -                          | -                     | ✓                 | ✓     |
| locLanguages         | Manage         | -                          | -                     | -                 | ✓     |
| locDialects          | Create         | ✓                          | -                     | ✓                 | ✓     |
| locAssetVariants     | Create/Edit    | ✓ (assigned)               | -                     | ✓                 | ✓     |
| locAssetVariants     | Review/Approve | -                          | -                     | ✓                 | ✓     |
| locAssetVariants     | Publish        | ✓ (after review)           | -                     | ✓                 | ✓     |
| locAssetVariants     | View All       | ✓                          | ✓                     | ✓                 | ✓     |
| locTranslationMemory | Create/Edit    | ✓                          | ✓                     | ✓                 | ✓     |
| locGlossary          | Create/Edit    | ✓                          | ✓                     | ✓                 | ✓     |
| locGlossary          | Approve        | -                          | -                     | ✓                 | ✓     |
| locStyleGuides       | Edit (draft)   | ✓                          | ✓                     | ✓                 | ✓     |
| locStyleGuides       | Publish        | -                          | -                     | ✓                 | ✓     |
| locProjects          | Create/Manage  | -                          | -                     | ✓                 | ✓     |
| locAnalytics         | View           | ✓                          | ✓                     | ✓                 | ✓     |

## 11. State Management

### Redux Slice: `localizationSlice`

```typescript
interface LocalizationState {
  dashboard: { summary: LocSummary | null; pipeline: PipelineItem[]; loading: boolean };
  variants: {
    items: AssetVariant[];
    current: AssetVariant | null;
    loading: boolean;
    sourceContent: Record<string, unknown> | null;
  };
  tm: { entries: TranslationMemoryEntry[]; searchResults: TMSearchResult[]; loading: boolean };
  glossary: {
    items: GlossaryEntry[];
    current: GlossaryEntry | null;
    loading: boolean;
    filters: Record<string, unknown>;
  };
  styleGuides: { current: StyleGuide | null; loading: boolean; markets: Market[] };
  preview: {
    content: Record<string, unknown> | null;
    loading: boolean;
    validation: PreviewValidation[];
  };
  dialects: { items: Dialect[]; current: Dialect | null; loading: boolean };
  projects: { items: LocalizationProject[]; current: LocalizationProject | null; loading: boolean };
  analytics: { summary: LocAnalytics | null; assetPerformance: AssetPerf[]; loading: boolean };
}
```

### RTK Query Endpoints

- `getDashboardSummary` - cache 60s
- `getVariants` - cache 30s
- `getTranslationMemory` - cache 300s
- `searchTranslationMemory` - no cache
- `getGlossary` - cache 300s
- `getStyleGuide` - cache 600s
- `getPreview` - cache 30s
- `getLocalizationAnalytics` - cache 600s

### Optimistic Updates

- Variant save -> immediate content update, sync status check in background
- Glossary entry add -> immediate list update
- Translation memory search -> debounced 300ms

## 12. Form Schemas (Zod)

```typescript
import { z } from "zod";

export const createMarketSchema = z.object({
  name: z.string().min(1).max(255),
  code: z.string().min(2).max(10),
  region: z.string().max(100).optional(),
  defaultLanguage: z.string().max(50).optional(),
  currency: z.string().max(10).optional(),
  dateFormat: z.string().max(30).optional(),
  timezone: z.string().max(50).optional(),
});

export const createLanguageSchema = z.object({
  name: z.string().min(1).max(255),
  code: z.string().min(2).max(10),
  script: z.string().max(50).optional(),
  direction: z.enum(["ltr", "rtl"]).default("ltr"),
  family: z.string().max(50).optional(),
  hasDialects: z.boolean().default(false),
});

export const createVariantSchema = z.object({
  assetId: z.string().uuid(),
  assetType: z.string().max(50),
  marketId: z.string().uuid(),
  languageId: z.string().uuid(),
  dialectId: z.string().uuid().optional().nullable(),
  content: z.record(z.unknown()),
  localizationMethod: z
    .enum(["manual", "ai_translated", "ai_reviewed", "machine"])
    .default("manual"),
});

export const updateVariantContentSchema = z.object({
  content: z.record(z.unknown()),
  qualityScore: z.number().int().min(0).max(100).optional(),
});

export const createGlossaryEntrySchema = z.object({
  term: z.string().min(1, "Term is required").max(255),
  marketIds: z.array(z.string().uuid()).min(1, "At least one market required"),
  approvedTranslation: z.string().max(500).optional(),
  alternativeTranslations: z.array(z.string().max(500)).max(10).optional(),
  usageExample: z.string().max(500).optional(),
  culturalContext: z.string().max(2000).optional(),
  connotations: z.enum(["positive", "negative", "neutral", "varies"]).optional(),
  category: z.enum([
    "idiom",
    "color",
    "symbol",
    "holiday",
    "taboo",
    "slang",
    "measurement",
    "number",
    "currency",
    "other",
  ]),
  source: z.string().max(255).optional(),
});

export const createTranslationMemorySchema = z.object({
  sourceText: z.string().min(1).max(2000),
  targetText: z.string().min(1).max(2000),
  sourceLanguage: z.string().min(2).max(10),
  targetLanguage: z.string().min(2).max(10),
  context: z.string().max(500).optional(),
  assetType: z.string().max(50).optional(),
});

export const createLocalizationProjectSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  sourceLanguageId: z.string().uuid(),
  targetLanguages: z.array(z.string().uuid()).min(1),
  assetIds: z
    .array(
      z.object({
        assetId: z.string().uuid(),
        assetType: z.string().max(50),
      }),
    )
    .min(1),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  dueDate: z.string().datetime().optional().nullable(),
  projectManagerId: z.string().uuid().optional().nullable(),
});

export const createCulturalNoteSchema = z.object({
  note: z.string().min(1).max(2000),
  category: z.enum([
    "idiom",
    "reference",
    "image",
    "color",
    "symbol",
    "religion",
    "taboo",
    "other",
  ]),
  suggestedAction: z.string().max(500).optional(),
});

export const dialectConversionRuleSchema = z.object({
  sourceTerm: z.string().min(1).max(200),
  targetTerm: z.string().min(1).max(200),
  context: z.string().max(500).optional(),
  isWord: z.boolean().default(true),
  notes: z.string().max(500).optional(),
});
```

## 13. Analytics Events

| Event                         | Properties                                             | Destination |
| ----------------------------- | ------------------------------------------------------ | ----------- |
| loc_market_created            | `{ marketId, code, region }`                           | PostHog     |
| loc_variant_created           | `{ assetId, assetType, marketId, languageId, method }` | PostHog     |
| loc_variant_published         | `{ assetId, marketId, languageId, qualityScore }`      | PostHog     |
| loc_variant_synced            | `{ variantId, sourceVersion, variantVersion }`         | PostHog     |
| loc_translation_memory_added  | `{ languagePair, source }`                             | PostHog     |
| loc_translation_memory_reused | `{ entryId, matchPercentage }`                         | PostHog     |
| loc_glossary_created          | `{ term, category, marketCount }`                      | PostHog     |
| loc_style_guide_published     | `{ marketId, languageId, version }`                    | PostHog     |
| loc_project_created           | `{ projectId, targetLanguagesCount, assetCount }`      | PostHog     |
| loc_project_completed         | `{ projectId, totalAssets, avgQualityScore }`          | PostHog     |
| loc_cultural_note_added       | `{ variantId, category }`                              | PostHog     |
| loc_preview_viewed            | `{ assetId, marketId }`                                | PostHog     |
| loc_analytics_exported        | `{ format, marketsCount }`                             | PostHog     |

## 14. Accessibility Requirements

| Requirement                | Implementation                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Split-pane variant editor  | Left/right panes have `aria-label="Source content"` / `aria-label="Target content"`, resizable divider with `role="separator"`, `aria-orientation="vertical"` |
| Language/dialect selectors | `aria-label` for language name and code, `aria-describedby` for speaker count info                                                                            |
| Cultural notes panel       | `role="complementary"`, `aria-label="Cultural adaptation notes"`, each note has `aria-label`                                                                  |
| Style guide sections       | Semantic headings (h2-h4), `aria-label` per section, collapsible with `aria-expanded`                                                                         |
| Preview iframe             | `title="Localized preview for {market} - {language}"`, `aria-label`                                                                                           |
| Translation memory search  | Results with `role="listbox"`, `aria-live="polite"` for result updates                                                                                        |
| Glossary table             | Sortable columns with `aria-sort`, keyboard navigation                                                                                                        |
| Localization projects      | Progress bar with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`                                                                                           |
| Color coding for status    | Icons + text labels, never color alone                                                                                                                        |
| Keyboard navigation        | Tab through all interactive elements, visible focus indicators                                                                                                |
| Language direction support | RTL layout support for Hausa/Arabic script, `dir="rtl"` attribute                                                                                             |

## 15. Error & Edge Case Catalog

| Code        | Scenario                                             | Response          | User Message                                                                   | Recovery                 |
| ----------- | ---------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------ | ------------------------ |
| LOC-ERR-001 | Variant save with missing required sections          | Validation        | "Complete all required sections before saving."                                | Fill missing sections    |
| LOC-ERR-002 | Source asset changed since last variant sync         | Out-of-sync flag  | "Source asset has been updated. Sync before editing variant."                  | Sync from source         |
| LOC-ERR-003 | Translation memory import file format invalid        | Parse error       | "Could not import: {X} rows had errors. Check format."                         | Fix and re-import        |
| LOC-ERR-004 | Glossary term already exists for same market         | Duplicate warning | "Term '{term}' already exists for this market. Edit existing entry?"           | Edit or create different |
| LOC-ERR-005 | Pidgin orthography validation fails                  | Warning           | "Word '{word}' does not follow approved Pidgin orthography. Use '{approved}'." | Use approved spelling    |
| LOC-ERR-006 | Yoruba text missing tone marks                       | Warning           | "Tone marks detected as missing. Add tone marks for accuracy."                 | Add tone marks           |
| LOC-ERR-007 | Preview generation fails for complex content         | Partial preview   | "Preview could not fully render. Showing available sections."                  | Check console for errors |
| LOC-ERR-008 | Dialect conversion rule conflicts with existing rule | Conflict error    | "Rule conflicts with existing rule for '{term}'. Override?"                    | Confirm override         |
| LOC-ERR-009 | Localization project with 0 assets created           | Validation        | "Add at least one asset to the localization project."                          | Add assets               |
| LOC-ERR-010 | Market-specific style guide publish fails validation | Error             | "Style guide has {count} incomplete sections. Complete before publishing."     | Fill missing sections    |
| LOC-ERR-011 | Variant published without native speaker review      | Warning           | "Variant published without native speaker review. Quality may vary."           | Schedule review          |
| LOC-ERR-012 | Variable placeholder altered in translation          | Error             | "Variable {{var}} was changed to '{{changed}}'. Restore original variable."    | Restore correct variable |
| LOC-ERR-013 | Unicode normalization issue (Yoruba/Igbo characters) | Warning           | "Some characters may not render correctly on all devices."                     | Verify encoding          |
