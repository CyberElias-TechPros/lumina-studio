# Actor: Prospective Student

## 1. Identity & Role Definition

**Actor Name:** Prospective Student  
**System Role ID:** `role_prospective_student`  
**Description:** An individual who is not yet enrolled but is exploring, researching, or actively applying to join Cyber Elias Academy. This actor may be at any stage of the admissions funnel — from first awareness through application submission and decision.

**Key Characteristics:**

- Unauthenticated or pre-enrollment authenticated (post-registration)
- Exploring program catalog, tuition, scholarships, campus culture
- May return multiple times across weeks/months before committing
- Sensitive to application friction, status transparency, and communication cadence

**Funnel Stages:**

1. **Awareness** — First visit, typically via organic/referral/ad
2. **Interest** — Browsing programs, comparing, watching virtual tour
3. **Consideration** — Starting application, checking requirements
4. **Intent** — Submitting application, checking scholarship eligibility
5. **Decision** — Awaiting admission decision, evaluating offer
6. **Conversion** — Accepting offer, onboarding (transitions to Current Student)

---

## 2. Primary Goals & Success KPIs

**Goal 1: Discover Programs & Value Proposition**

- KPI: Avg session depth (pages/session ≥ 6)
- KPI: Video tour completion rate ≥ 40%
- KPI: Program comparison tool usage rate ≥ 15%

**Goal 2: Complete Application with Minimal Friction**

- KPI: Application start-to-submit conversion rate ≥ 60%
- KPI: Avg application completion time ≤ 25 min
- KPI: Form field abandonment rate ≤ 8%

**Goal 3: Understand Financial Options**

- KPI: Scholarship inquiry tool usage ≥ 20% of applicants
- KPI: Tuition calculator engagement ≥ 30%

**Goal 4: Track Application Status Transparently**

- KPI: Application status page revisit rate ≥ 70%
- KPI: Status check satisfaction (post-application CSAT) ≥ 4.5/5

**Goal 5: Make Informed Enrollment Decision**

- KPI: Offer acceptance rate (conversion goal) ≥ 35%
- KPI: Time from offer to decision ≤ 14 days avg

---

## 3. Complete Screen Inventory

### Screen 3.1: Landing / Home Page (`/`)

**Purpose:** First impression, value proposition, clear CTA to explore programs.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────┐
│  [Logo]  Programs  Admissions  Tuition  About  │
│  [🔍] [Apply Now]                              │
├─────────────────────────────────────────────────┤
│  Hero: "Launch Your Cyber Career"              │
│  Subtitle: "Industry-aligned programs..."       │
│  [CTA: Explore Programs →] [CTA: Apply Now →]  │
├─────────────────────────────────────────────────┤
│  Trust Bar: 500+ Students | 95% Placement       │
├─────────────────────────────────────────────────┤
│  Featured Programs (3 cards, horizontal scroll) │
│  [Card] [Card] [Card]  ← swipe on mobile       │
├─────────────────────────────────────────────────┤
│  Stats Section: Graduation Rate, Avg Salary     │
├─────────────────────────────────────────────────┤
│  Testimonials Carousel                          │
├─────────────────────────────────────────────────┤
│  Partner Logos                                  │
├─────────────────────────────────────────────────┤
│  CTA Banner: "Start Your Journey"              │
│  Footer: Links, Address, Social, Newsletter     │
└─────────────────────────────────────────────────┘
```

**UI Fields / Components:**

| Component              | Type                  | Source                            | States                                                               |
| ---------------------- | --------------------- | --------------------------------- | -------------------------------------------------------------------- |
| Navigation bar         | `NavBar`              | Layout                            | Scrolled/transparent, mobile hamburger                               |
| Hero section           | `HeroSection`         | Static CMS                        | Loading (skeleton), loaded                                           |
| Trust bar              | `TrustBar`            | Static CMS                        | Always loaded                                                        |
| Featured program cards | `ProgramCard[]`       | `GET /api/programs?featured=true` | Loading (shimmer cards), empty (no featured programs), error (retry) |
| Stats row              | `StatsRow`            | `GET /api/site/stats`             | Loading (pulsing numbers), loaded, error (hide)                      |
| Testimonial carousel   | `TestimonialCarousel` | `GET /api/testimonials`           | Loading (placeholder), empty (hide section), error (hide)            |
| Partner logo strip     | `PartnerStrip`        | `GET /api/partners`               | Loading (logo placeholders), empty (hide)                            |
| Footer                 | `Footer`              | Layout                            | Loaded                                                               |

**States:**

- **Loading:** Skeleton shimmer for program cards, stats, testimonials. Hero and nav render immediately (static).
- **Empty:** No featured programs → show "Browse all programs" link instead. No testimonials → hide section.
- **Error:** Featured programs fetch fails → show inline error banner with retry button. Stats fail → gracefully degrades (hide stats row).
- **Edge Cases:** Slow network (3G) → show persistent loading with "We're loading awesome content..." text. Offline → show offline indicator with cached content. Viewport changes → responsive grid reflow.

### Screen 3.2: Program Catalog / Browse (`/programs`)

**Purpose:** Browse all programs with filtering, searching, and sorting.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────┐
│  [Logo] ...  [🔍 Search programs]              │
├─────────────────────────────────────────────────┤
│  Breadcrumb: Home > Programs                    │
├─────────────────────────────────────────────────┤
│  Filters Sidebar (desktop) / Top Filter Bar     │
│  □ Cybersecurity Fundamentals                   │
│  □ Penetration Testing                          │
│  □ Network Defense                              │
│  □ Digital Forensics                            │
│  □ Cloud Security                               │
│  □ Governance & Compliance                      │
│                                                 │
│  Format: □ Online  □ In-Person  □ Hybrid        │
│  Duration: □ <3mo □ 3-6mo □ 6-12mo □ 12+mo    │
│  Level: □ Beginner □ Intermediate □ Advanced    │
│  Price Range: [Min] [Max]  [Apply Filters]      │
├─────────────────────────────────────────────────┤
│  Results [Showing X of Y] [Sort: ▼]            │
│  ┌─────────────┐ ┌─────────────┐ ┌────────────┐│
│  │ Program Card │ │ Program Card │ │ Program... ││
│  │ Name, desc,  │ │              │ │            ││
│  │ duration,    │ │              │ │            ││
│  │ price, badge │ │              │ │            ││
│  │ [View →]     │ │              │ │            ││
│  └─────────────┘ └─────────────┘ └────────────┘│
│                                                 │
│  Pagination: < 1 2 3 ... 12 >                  │
└─────────────────────────────────────────────────┘
```

**UI Fields / Components:**

| Component         | Type              | Source                                                                    | States                                                                                                           |
| ----------------- | ----------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Filter checkboxes | `FilterGroup`     | Client-side + URL params                                                  | All loaded with catalog                                                                                          |
| Search input      | `SearchInput`     | Local state + URL query param                                             | Empty, typing, results                                                                                           |
| Sort dropdown     | `SortSelect`      | Options: Popularity, Price (low-high), Price (high-low), Duration, Newest | Selected                                                                                                         |
| Program card grid | `ProgramCardGrid` | `GET /api/programs?filters...`                                            | Loading (12 skeleton cards), empty ("No programs match your filters" + clear filters CTA), error (retry section) |
| Pagination        | `Pagination`      | Computed from total count                                                 | First page, middle page, last page, single page (hidden)                                                         |
| Result count      | `ResultCount`     | `total` from API                                                          | Hidden when 0 results                                                                                            |

**States:**

- **Loading:** 12 skeleton cards with shimmer animation. Filters are interactive immediately.
- **Empty:** "No programs match your filters. Try adjusting your search or [clear all filters]." Shows popular alternatives.
- **Error:** API returns 500 → "Something went wrong loading programs. [Retry]" button. Network offline → detected via navigator.onLine → show offline-specific message.
- **Edge Cases:** URL with invalid filter params → ignore and load defaults. Zero search results → show "Can't find what you're looking for?" with contact CTA. API timeout (30s) → abort, show error.

### Screen 3.3: Program Detail Page (`/programs/[slug]`)

**Purpose:** Full program overview, curriculum, instructor info, pricing, CTA to apply.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────┐
│  Breadcrumb: Home > Programs > [Program Name]   │
├─────────────────────────────────────────────────┤
│  Hero: Program Name | Badge | Duration | Format │
│  [Apply Now] [Download Brochure] [Save]         │
├─────────────────────────────────────────────────┤
│  Overview                                        │
│  ● What You'll Learn (bullet list)              │
│  ● Prerequisites                                 │
│  ● Career Outcomes                               │
├─────────────────────────────────────────────────┤
│  Curriculum Tab:                                │
│  ┌─────────────┬──────────────────────────────┐  │
│  │ Module 1    │ Lessons (6) · Est. 2 weeks   │  │
│  │   → Lesson  │ Duration 45 min              │  │
│  │   → Lesson  │ Duration 30 min              │  │
│  │ Module 2    │ Lessons (8) · Est. 3 weeks   │  │
│  └─────────────┴──────────────────────────────┘  │
├─────────────────────────────────────────────────┤
│  Instructors                                     │
│  [Avatar] Name, Title, Bio, Rating              │
├─────────────────────────────────────────────────┤
│  Pricing & Payment Options                      │
│  ● Tuition: $X,XXX                             │
│  ● Payment plans available                     │
│  ● Scholarships up to 50%                      │
│  [Check Scholarship Eligibility →]             │
├─────────────────────────────────────────────────┤
│  FAQ (accordion)                                │
├─────────────────────────────────────────────────┤
│  Sticky bottom CTA: [Apply Now] (scrolls)      │
└─────────────────────────────────────────────────┘
```

**Data Bindings:**

- URL param `slug` → `GET /api/programs/:slug`
- Curriculum → `GET /api/programs/:slug/curriculum`
- Instructors → `GET /api/programs/:slug/instructors`
- FAQs → `GET /api/programs/:slug/faqs`

**States:**

- **Loading:** Full page skeleton with hero placeholder, curriculum lines, instructor placeholders.
- **Error (404):** "Program not found" with link to catalog.
- **Error (500):** "Couldn't load program details." with retry.
- **Edge Cases:** No instructors assigned → hide section. No curriculum published yet → "Curriculum coming soon" placeholder. Program not accepting applications → disable CTA button with "Applications closed" tooltip.

### Screen 3.4: Application Form (`/apply` and `/apply/[step]`)

**Purpose:** Multi-step application with save-as-you-go progress.

**Steps:**

1. **Personal Information** — Name, DOB, Contact, Address, SSN (last 4), Demographics
2. **Academic History** — High school/GED, Previous college, Transcripts upload
3. **Program Selection** — Choose program, start date, format preference
4. **Supporting Documents** — Resume, Statement of purpose, Recommendation letters (2), Portfolio links
5. **Financial Information** — Scholarship application toggle, Payment plan selection, FAFSA/other aid
6. **Review & Submit** — Summary of all info, e-signature, submission

**Wireframe (Step 1 Example):**

```
┌─────────────────────────────────────────────────┐
│  Apply to Cyber Elias Academy                   │
│  Step 1 of 6: Personal Information              │
│  [████████░░░░░░░░░░░░░░░] 16%                  │
├─────────────────────────────────────────────────┤
│  Legal Name *                                   │
│  [First] [Middle] [Last]                       │
│                                                 │
│  Date of Birth * [📅] [mm/dd/yyyy]             │
│                                                 │
│  Email * [________________]                     │
│  Confirm Email * [________________]             │
│                                                 │
│  Phone * [_______________]                     │
│                                                 │
│  Address *                                      │
│  [Street]                                       │
│  [City] [State ▼] [ZIP]                        │
│                                                 │
│  SSN (last 4 digits) [____]                    │
│  (optional, required for financial aid)         │
│                                                 │
│  How did you hear about us? [▼ Select]         │
│                                                 │
│  [← Back] [Save & Continue →]                  │
└─────────────────────────────────────────────────┘
```

**Form Fields (Full Zod Schema in Section 12):**

**Data Source / Persistence:**

- Auto-save every 30 seconds to `POST /api/applications/:id/step`
- Load saved progress from `GET /api/applications/:id`
- Image/file uploads to `POST /api/upload` → returns signed URL → stored in R2

**States:**

- **Loading:** Step skeleton while fetching saved data. File upload progress bars.
- **Empty:** Fresh start — all fields empty.
- **Error:** Validation errors inline per field. Save failure → yellow banner "Progress not saved. [Retry]". Submit failure → error summary at top.
- **Edge Cases:** Session timeout → modal "Your session expired. [Continue where you left off]" → restore via saved app ID in localStorage. Browser refresh mid-step → restore from auto-save. File too large (>10MB) → inline error. Wrong file type → "Accepted formats: PDF, DOC, DOCX, JPG, PNG". Duplicate email check → async validation "This email is already associated with an application".

### Screen 3.5: Application Status Tracker (`/apply/status/[id]`)

**Purpose:** Real-time visibility into where the application stands in the review pipeline.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────┐
│  Application Status                             │
│  Reference #: CEA-2026-00421                   │
├─────────────────────────────────────────────────┤
│  Timeline (vertical stepper)                    │
│  ✅ Submitted                    Jan 15, 2026   │
│     "Your application has been received."       │
│  ✅ Documents Verified          Jan 18, 2026   │
│     "All documents are in order."               │
│  🔄 Under Review                Since Jan 20    │
│     "An admissions officer is reviewing..."     │
│  ⏳ Decision                    Estimated: Feb 5│
│     "You'll be notified via email."             │
│  ⏳ Enrollment Prep             If accepted     │
├─────────────────────────────────────────────────┤
│  Missing Items Alert (if any)                   │
│  ⚠ Transcripts not yet received                │
│  [Upload Now →]                                 │
├─────────────────────────────────────────────────┤
│  Communication History                          │
│  "We received your application" - Jan 15        │
│  "Reminder: Upload transcript" - Jan 16         │
├─────────────────────────────────────────────────┤
│  [Withdraw Application] [Contact Admissions]   │
└─────────────────────────────────────────────────┘
```

**API Source:** `GET /api/applications/:id/status` (WebSocket or polling every 30s for live updates)

**States:**

- **Loading:** Stepper skeleton with 5 placeholder circles.
- **No Application:** Redirect to `/apply` with message "Start your application".
- **Error:** Status fetch fails → "Unable to load status. [Refresh]". Show cached snapshot if available.
- **Edge Cases:** Application withdrawn → show final status with "Withdrawn" badge, archived view. Decision rendered → confetti animation when status changes to "Accepted" or "Waitlisted". Estimated date passed → "Decision is taking longer than expected. We apologize for the delay."

### Screen 3.6: Scholarship Inquiry & Estimator (`/scholarships`)

**Purpose:** Browse scholarships, check eligibility, estimate award amount.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────┤
│  Scholarships & Financial Aid                   │
├─────────────────────────────────────────────────┤
│  Scholarship Estimator                          │
│  ┌─────────────────────────────────────────┐   │
│  │ Household Income: [▼ Range]            │   │
│  │ Academic GPA: [▼ Range]                │   │
│  │ Program of Interest: [▼ Select]        │   │
│  │ Military/Veteran: [Yes/No]             │   │
│  │ First Generation: [Yes/No]             │   │
│  │ [Estimate My Eligibility →]            │   │
│  │                                         │   │
│  │ Estimated Award: $X,XXX - $X,XXX       │   │
│  │ "You may qualify for N scholarships"   │   │
│  └─────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│  Available Scholarships (list/cards)            │
│  ┌──────────────────────────────────────┐      │
│  │ 🏆 Merit Scholarship                │      │
│  │ Up to $5,000 | Based on GPA         │      │
│  │ Eligibility: GPA 3.5+               │      │
│  │ [Learn More] [Apply]                │      │
│  └──────────────────────────────────────┘      │
│  ┌──────────────────────────────────────┐      │
│  │ 🏆 Need-Based Grant                 │      │
│  │ Up to $10,000 | Income-based        │      │
│  │ [Learn More] [Apply]                │      │
│  └──────────────────────────────────────┘      │
├─────────────────────────────────────────────────┤
│  FAQ: Financial Aid, Payment Plans, Deadlines  │
└─────────────────────────────────────────────────┘
```

**API:** `POST /api/scholarships/estimate` (private calculation), `GET /api/scholarships` (public list)

### Screen 3.7: Virtual Tour (`/virtual-tour`)

**Purpose:** 360° interactive experience of campus facilities, labs, classrooms.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────┤
│  Virtual Tour - Cyber Elias Academy            │
│  [Gallery View] [360° View] [Video Tour]       │
├─────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐   │
│  │  [360° Interactive Panorama]            │   │
│  │  Drag to look around                    │   │
│  │  [Hotspots: Click to learn more]        │   │
│  │  🔵 Cybersecurity Lab                   │   │
│  │  🔵 Classroom A                         │   │
│  │  🔵 Student Lounge                     │   │
│  ├─────────────────────────────────────────┤   │
│  │  Scene: Cybersecurity Lab              │   │
│  │  "State-of-the-art penetration testing  │   │
│  │   environment with 50 workstations..."   │   │
│  └─────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│  Scene Navigator: [Lab] [Library] [Lounge] ...  │
├─────────────────────────────────────────────────┤
│  Schedule a physical tour: [Book Now →]        │
└─────────────────────────────────────────────────┘
```

**Technical Implementation:** Pannellum or custom Three.js viewer. Hotspots render as clickable overlays with tooltip popovers.

**States:**

- **Loading:** 360° viewer spinner, low-res placeholder image first, then high-res swap.
- **Error:** Browser not supported → fallback to photo gallery. Tour fails to load → "Unable to load virtual tour. [View photo gallery]" CTA.
- **Edge Cases:** Mobile → hide 360° (performance), show photo gallery + YouTube tour video instead. Slow connection → progressive loading (low → medium → high res).

### Screen 3.8: Comparison Tool (`/programs/compare?ids=a,b,c`)

**Purpose:** Side-by-side comparison of 2-4 programs.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────┤
│  Compare Programs                               │
├─────────────────────────────────────────────────┤
│       │  Program A  │  Program B  │  Program C  │
│ Price │ $X,XXX     │ $Y,YYY     │ $Z,ZZZ     │
│ Dur.  │ 6 months   │ 12 months  │ 8 months    │
│ Format│ Online     │ Hybrid     │ In-Person   │
│ Level │ Intermediate│ Advanced  │ Beginner    │
│ Rating│ ⭐⭐⭐⭐    │ ⭐⭐⭐⭐⭐   │ ⭐⭐⭐      │
│ Modules│ 8          │ 14         │ 10          │
│ Cert. │ Yes        │ Yes        │ Yes         │
│ ...   │ ...        │ ...        │ ...         │
│ [Apply]│ [Apply]   │ [Apply]    │ [Apply]     │
└─────────────────────────────────────────────────┘
```

**API:** `GET /api/programs/compare?ids=id1,id2,id3`

**States:**

- **Loading:** 3 column skeleton with shimmer rows.
- **Empty/Error:** Invalid IDs → "One or more programs not found."
- **Edge Cases:** Only 1 ID → encourage "Add at least 2 programs to compare". 4+ IDs → limit to first 4. Mobile → horizontal scroll table.

---

## 4. Full Database Schema

### Table: `prospective_students`

| Column              | Type           | Constraints      | Default             | Description                                                              |
| ------------------- | -------------- | ---------------- | ------------------- | ------------------------------------------------------------------------ |
| `id`                | `UUID`         | PK, NOT NULL     | `gen_random_uuid()` | Primary identifier                                                       |
| `email`             | `VARCHAR(255)` | UNIQUE, NOT NULL | —                   | Login / contact email                                                    |
| `password_hash`     | `VARCHAR(255)` | NULLABLE         | —                   | Argon2 hash (null if OAuth-only)                                         |
| `auth_provider`     | `VARCHAR(50)`  | NULLABLE         | —                   | `google`, `github`, `microsoft`, `null`                                  |
| `auth_provider_id`  | `VARCHAR(255)` | NULLABLE         | —                   | External user ID                                                         |
| `first_name`        | `VARCHAR(100)` | NULLABLE         | —                   | —                                                                        |
| `middle_name`       | `VARCHAR(100)` | NULLABLE         | —                   | —                                                                        |
| `last_name`         | `VARCHAR(100)` | NULLABLE         | —                   | —                                                                        |
| `phone`             | `VARCHAR(20)`  | NULLABLE         | —                   | E.164 format                                                             |
| `date_of_birth`     | `DATE`         | NULLABLE         | —                   | —                                                                        |
| `street_address`    | `VARCHAR(255)` | NULLABLE         | —                   | —                                                                        |
| `city`              | `VARCHAR(100)` | NULLABLE         | —                   | —                                                                        |
| `state`             | `VARCHAR(50)`  | NULLABLE         | —                   | ISO 3166-2                                                               |
| `zip_code`          | `VARCHAR(20)`  | NULLABLE         | —                   | —                                                                        |
| `country`           | `VARCHAR(100)` | NULLABLE         | —                   | —                                                                        |
| `ssn_last_four`     | `VARCHAR(4)`   | NULLABLE         | —                   | Encrypted at rest                                                        |
| `hear_about_us`     | `VARCHAR(100)` | NULLABLE         | —                   | Referral source                                                          |
| `funnel_stage`      | `VARCHAR(50)`  | NOT NULL         | `'awareness'`       | One of: awareness, interest, consideration, intent, decision, conversion |
| `lead_score`        | `INTEGER`      | DEFAULT 0        | `0`                 | 0-100 predictive lead score                                              |
| `lead_source`       | `VARCHAR(100)` | NULLABLE         | —                   | utm_source, referral, direct, etc.                                       |
| `last_activity_at`  | `TIMESTAMPTZ`  | NOT NULL         | `NOW()`             | Last interaction timestamp                                               |
| `consent_marketing` | `BOOLEAN`      | NOT NULL         | `false`             | Marketing email opt-in                                                   |
| `consent_sms`       | `BOOLEAN`      | NOT NULL         | `false`             | SMS communication opt-in                                                 |
| `data_consent_at`   | `TIMESTAMPTZ`  | NULLABLE         | —                   | When privacy consent was given                                           |
| `created_at`        | `TIMESTAMPTZ`  | NOT NULL         | `NOW()`             | —                                                                        |
| `updated_at`        | `TIMESTAMPTZ`  | NOT NULL         | `NOW()`             | Auto-updated                                                             |

**Indexes:**

- `idx_ps_email` ON `email`
- `idx_ps_funnel_stage` ON `funnel_stage`
- `idx_ps_lead_score` ON `lead_score`
- `idx_ps_created_at` ON `created_at`
- `idx_ps_last_activity` ON `last_activity_at`
- `idx_ps_auth_provider` ON `auth_provider`, `auth_provider_id`

### Table: `programs`

| Column              | Type            | Constraints      | Default | Description                             |
| ------------------- | --------------- | ---------------- | ------- | --------------------------------------- |
| `id`                | `UUID`          | PK, NOT NULL     | —       | —                                       |
| `slug`              | `VARCHAR(200)`  | UNIQUE, NOT NULL | —       | URL-friendly identifier                 |
| `title`             | `VARCHAR(255)`  | NOT NULL         | —       | Display name                            |
| `subtitle`          | `VARCHAR(500)`  | NULLABLE         | —       | Short tagline                           |
| `description`       | `TEXT`          | NOT NULL         | —       | Full program description                |
| `short_description` | `VARCHAR(300)`  | NOT NULL         | —       | Card-level description                  |
| `category`          | `VARCHAR(100)`  | NOT NULL         | —       | Cybersecurity, Network, Forensics, etc. |
| `level`             | `VARCHAR(50)`   | NOT NULL         | —       | beginner, intermediate, advanced        |
| `format`            | `VARCHAR(50)`   | NOT NULL         | —       | online, in_person, hybrid               |
| `duration_weeks`    | `INTEGER`       | NOT NULL         | —       | Total program duration                  |
| `duration_label`    | `VARCHAR(100)`  | NOT NULL         | —       | "6 months", "12 weeks"                  |
| `price`             | `DECIMAL(10,2)` | NOT NULL         | —       | Full tuition in USD                     |
| `price_label`       | `VARCHAR(100)`  | NULLABLE         | —       | "$3,999" or "Contact for pricing"       |
| `currency`          | `VARCHAR(3)`    | NOT NULL         | `'USD'` | ISO 4217                                |
| `featured`          | `BOOLEAN`       | NOT NULL         | `false` | Show on homepage                        |
| `active`            | `BOOLEAN`       | NOT NULL         | `true`  | Is currently accepting applications     |
| `max_students`      | `INTEGER`       | NULLABLE         | —       | Cohort size limit (null = unlimited)    |
| `enrolled_count`    | `INTEGER`       | NOT NULL         | `0`     | Current enrollment count                |
| `thumbnail_url`     | `VARCHAR(500)`  | NULLABLE         | —       | Card image                              |
| `banner_url`        | `VARCHAR(500)`  | NULLABLE         | —       | Detail page hero                        |
| `video_url`         | `VARCHAR(500)`  | NULLABLE         | —       | Promotional video                       |
| `rating`            | `DECIMAL(2,1)`  | NULLABLE         | —       | 1.0-5.0                                 |
| `review_count`      | `INTEGER`       | NOT NULL         | `0`     | —                                       |
| `prerequisites`     | `JSONB`         | NULLABLE         | —       | Array of prerequisite descriptions      |
| `career_outcomes`   | `JSONB`         | NULLABLE         | —       | Array of career titles with salaries    |
| `what_you_learn`    | `JSONB`         | NULLABLE         | —       | Array of learning outcome strings       |
| `meta_title`        | `VARCHAR(200)`  | NULLABLE         | —       | SEO meta title                          |
| `meta_description`  | `VARCHAR(300)`  | NULLABLE         | —       | SEO meta description                    |
| `created_at`        | `TIMESTAMPTZ`   | NOT NULL         | `NOW()` | —                                       |
| `updated_at`        | `TIMESTAMPTZ`   | NOT NULL         | `NOW()` | —                                       |

**Indexes:**

- `idx_programs_slug` ON `slug`
- `idx_programs_category` ON `category`
- `idx_programs_active` ON `active` WHERE `active = true`
- `idx_programs_featured` ON `featured` WHERE `featured = true`
- `idx_programs_price` ON `price`

### Table: `program_modules`

| Column            | Type           | Constraints                | Default | Description       |
| ----------------- | -------------- | -------------------------- | ------- | ----------------- |
| `id`              | `UUID`         | PK                         | —       | —                 |
| `program_id`      | `UUID`         | FK → programs.id, NOT NULL | —       | —                 |
| `sort_order`      | `INTEGER`      | NOT NULL                   | —       | Module ordering   |
| `title`           | `VARCHAR(255)` | NOT NULL                   | —       | Module name       |
| `description`     | `TEXT`         | NULLABLE                   | —       | Module overview   |
| `lesson_count`    | `INTEGER`      | NOT NULL                   | `0`     | Number of lessons |
| `estimated_weeks` | `DECIMAL(3,1)` | NOT NULL                   | —       | Time to complete  |
| `created_at`      | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()` | —                 |

### Table: `program_lessons`

| Column             | Type           | Constraints                       | Default | Description                               |
| ------------------ | -------------- | --------------------------------- | ------- | ----------------------------------------- |
| `id`               | `UUID`         | PK                                | —       | —                                         |
| `module_id`        | `UUID`         | FK → program_modules.id, NOT NULL | —       | —                                         |
| `sort_order`       | `INTEGER`      | NOT NULL                          | —       | Lesson ordering                           |
| `title`            | `VARCHAR(255)` | NOT NULL                          | —       | Lesson name                               |
| `duration_minutes` | `INTEGER`      | NOT NULL                          | —       | Estimated completion time                 |
| `content_type`     | `VARCHAR(50)`  | NOT NULL                          | —       | video, article, quiz, project, assignment |
| `is_preview`       | `BOOLEAN`      | NOT NULL                          | `false` | Available before enrollment               |
| `created_at`       | `TIMESTAMPTZ`  | NOT NULL                          | `NOW()` | —                                         |

### Table: `applications`

| Column                   | Type           | Constraints                            | Default             | Description                                                                                                                 |
| ------------------------ | -------------- | -------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `id`                     | `UUID`         | PK                                     | `gen_random_uuid()` | —                                                                                                                           |
| `reference_number`       | `VARCHAR(20)`  | UNIQUE, NOT NULL                       | —                   | Human-readable: CEA-YYYY-NNNNN                                                                                              |
| `prospective_student_id` | `UUID`         | FK → prospective_students.id, NOT NULL | —                   | —                                                                                                                           |
| `program_id`             | `UUID`         | FK → programs.id, NOT NULL             | —                   | Selected program                                                                                                            |
| `status`                 | `VARCHAR(50)`  | NOT NULL                               | `'draft'`           | draft, submitted, under_review, documents_pending, interview_scheduled, accepted, waitlisted, rejected, withdrawn, enrolled |
| `current_step`           | `INTEGER`      | NOT NULL                               | `1`                 | 1-6 form step                                                                                                               |
| `completion_percentage`  | `INTEGER`      | NOT NULL                               | `0`                 | 0-100                                                                                                                       |
| `submitted_at`           | `TIMESTAMPTZ`  | NULLABLE                               | —                   | When formally submitted                                                                                                     |
| `decision_at`            | `TIMESTAMPTZ`  | NULLABLE                               | —                   | When decision was rendered                                                                                                  |
| `decision_notes`         | `TEXT`         | NULLABLE                               | —                   | Internal notes (not exposed to applicant)                                                                                   |
| `enrollment_term`        | `VARCHAR(50)`  | NULLABLE                               | —                   | Fall 2026, Spring 2027, etc.                                                                                                |
| `preferred_format`       | `VARCHAR(50)`  | NULLABLE                               | —                   | online, in_person, hybrid                                                                                                   |
| `withdrawn_at`           | `TIMESTAMPTZ`  | NULLABLE                               | —                   | If withdrawn                                                                                                                |
| `withdrawn_reason`       | `VARCHAR(500)` | NULLABLE                               | —                   | —                                                                                                                           |
| `created_at`             | `TIMESTAMPTZ`  | NOT NULL                               | `NOW()`             | —                                                                                                                           |
| `updated_at`             | `TIMESTAMPTZ`  | NOT NULL                               | `NOW()`             | —                                                                                                                           |

**Indexes:**

- `idx_applications_student` ON `prospective_student_id`
- `idx_applications_status` ON `status`
- `idx_applications_reference` ON `reference_number`
- `idx_applications_program` ON `program_id`
- `idx_applications_submitted` ON `submitted_at` WHERE `submitted_at IS NOT NULL`

### Table: `application_step_data`

| Column           | Type          | Constraints                    | Default | Description     |
| ---------------- | ------------- | ------------------------------ | ------- | --------------- |
| `id`             | `UUID`        | PK                             | —       | —               |
| `application_id` | `UUID`        | FK → applications.id, NOT NULL | —       | —               |
| `step_number`    | `INTEGER`     | NOT NULL                       | —       | 1-6             |
| `data`           | `JSONB`       | NOT NULL                       | —       | Step form data  |
| `completed`      | `BOOLEAN`     | NOT NULL                       | `false` | Step fully done |
| `completed_at`   | `TIMESTAMPTZ` | NULLABLE                       | —       | —               |
| `created_at`     | `TIMESTAMPTZ` | NOT NULL                       | `NOW()` | —               |
| `updated_at`     | `TIMESTAMPTZ` | NOT NULL                       | `NOW()` | —               |

**Constraints:** UNIQUE(application_id, step_number)

### Table: `application_documents`

| Column               | Type           | Constraints                    | Default     | Description                                                                                      |
| -------------------- | -------------- | ------------------------------ | ----------- | ------------------------------------------------------------------------------------------------ |
| `id`                 | `UUID`         | PK                             | —           | —                                                                                                |
| `application_id`     | `UUID`         | FK → applications.id, NOT NULL | —           | —                                                                                                |
| `document_type`      | `VARCHAR(50)`  | NOT NULL                       | —           | transcript, resume, statement_of_purpose, recommendation_letter, portfolio, test_score, id_proof |
| `file_name`          | `VARCHAR(255)` | NOT NULL                       | —           | Original filename                                                                                |
| `file_size_bytes`    | `INTEGER`      | NOT NULL                       | —           | —                                                                                                |
| `mime_type`          | `VARCHAR(100)` | NOT NULL                       | —           | —                                                                                                |
| `r2_key`             | `VARCHAR(500)` | NOT NULL                       | —           | R2 object key                                                                                    |
| `r2_bucket`          | `VARCHAR(100)` | NOT NULL                       | —           | —                                                                                                |
| `status`             | `VARCHAR(50)`  | NOT NULL                       | `'pending'` | pending, verified, rejected                                                                      |
| `verification_notes` | `TEXT`         | NULLABLE                       | — —         |
| `created_at`         | `TIMESTAMPTZ`  | NOT NULL                       | `NOW()`     | —                                                                                                |

### Table: `scholarships`

| Column                 | Type            | Constraints | Default | Description                                       |
| ---------------------- | --------------- | ----------- | ------- | ------------------------------------------------- |
| `id`                   | `UUID`          | PK          | —       | —                                                 |
| `name`                 | `VARCHAR(255)`  | NOT NULL    | —       | Display name                                      |
| `description`          | `TEXT`          | NOT NULL    | —       | —                                                 |
| `type`                 | `VARCHAR(50)`   | NOT NULL    | —       | merit, need_based, military, first_gen, diversity |
| `max_amount`           | `DECIMAL(10,2)` | NOT NULL    | —       | Maximum award in USD                              |
| `min_amount`           | `DECIMAL(10,2)` | NOT NULL    | `0`     | Minimum award                                     |
| `eligibility_criteria` | `JSONB`         | NOT NULL    | —       | Machine-readable criteria rules                   |
| `active`               | `BOOLEAN`       | NOT NULL    | `true`  | —                                                 |
| `deadline`             | `DATE`          | NULLABLE    | —       | Application deadline                              |
| `slots_available`      | `INTEGER`       | NULLABLE    | —       | Number of awards                                  |
| `created_at`           | `TIMESTAMPTZ`   | NOT NULL    | `NOW()` | —                                                 |

### Table: `scholarship_applications`

| Column           | Type            | Constraints                    | Default     | Description                        |
| ---------------- | --------------- | ------------------------------ | ----------- | ---------------------------------- |
| `id`             | `UUID`          | PK                             | —           | —                                  |
| `scholarship_id` | `UUID`          | FK → scholarships.id, NOT NULL | —           | —                                  |
| `application_id` | `UUID`          | FK → applications.id, NOT NULL | —           | —                                  |
| `status`         | `VARCHAR(50)`   | NOT NULL                       | `'pending'` | pending, approved, denied, awarded |
| `award_amount`   | `DECIMAL(10,2)` | NULLABLE                       | —           | If awarded                         |
| `decision_at`    | `TIMESTAMPTZ`   | NULLABLE                       | —           | —                                  |
| `created_at`     | `TIMESTAMPTZ`   | NOT NULL                       | `NOW()`     | —                                  |

### Table: `application_status_events`

| Column            | Type           | Constraints                    | Default | Description                              |
| ----------------- | -------------- | ------------------------------ | ------- | ---------------------------------------- |
| `id`              | `UUID`         | PK                             | —       | —                                        |
| `application_id`  | `UUID`         | FK → applications.id, NOT NULL | —       | —                                        |
| `from_status`     | `VARCHAR(50)`  | NULLABLE                       | —       | Previous status                          |
| `to_status`       | `VARCHAR(50)`  | NOT NULL                       | —       | New status                               |
| `notes`           | `TEXT`         | NULLABLE                       | —       | Internal staff notes                     |
| `display_message` | `VARCHAR(500)` | NULLABLE                       | —       | Public-facing message shown to applicant |
| `triggered_by`    | `VARCHAR(100)` | NOT NULL                       | —       | system, staff_user_id, applicant         |
| `created_at`      | `TIMESTAMPTZ`  | NOT NULL                       | `NOW()` | —                                        |

### Table: `virtual_tour_scenes`

| Column          | Type           | Constraints | Default | Description                                    |
| --------------- | -------------- | ----------- | ------- | ---------------------------------------------- |
| `id`            | `UUID`         | PK          | —       | —                                              |
| `title`         | `VARCHAR(255)` | NOT NULL    | —       | "Cybersecurity Lab"                            |
| `description`   | `TEXT`         | NULLABLE    | —       | —                                              |
| `sort_order`    | `INTEGER`      | NOT NULL    | —       | —                                              |
| `panorama_url`  | `VARCHAR(500)` | NOT NULL    | —       | High-res 360 image URL                         |
| `thumbnail_url` | `VARCHAR(500)` | NOT NULL    | —       | Scene thumbnail                                |
| `hotspots`      | `JSONB`        | NULLABLE    | —       | Array of {x,y,title,description,linkedSceneId} |
| `active`        | `BOOLEAN`      | NOT NULL    | `true`  | —                                              |
| `created_at`    | `TIMESTAMPTZ`  | NOT NULL    | `NOW()` | —                                              |

### Table: `site_stats`

| Column       | Type           | Constraints      | Default | Description                                                 |
| ------------ | -------------- | ---------------- | ------- | ----------------------------------------------------------- |
| `id`         | `UUID`         | PK               | —       | —                                                           |
| `key`        | `VARCHAR(100)` | UNIQUE, NOT NULL | —       | total_students, graduation_rate, avg_salary, placement_rate |
| `label`      | `VARCHAR(200)` | NOT NULL         | —       | "Total Students"                                            |
| `value`      | `VARCHAR(100)` | NOT NULL         | —       | "500+"                                                      |
| `suffix`     | `VARCHAR(50)`  | NULLABLE         | —       | "+", "%", "$"                                               |
| `sort_order` | `INTEGER`      | NOT NULL         | 0       | —                                                           |
| `updated_at` | `TIMESTAMPTZ`  | NOT NULL         | `NOW()` | —                                                           |

### Table: `testimonials`

| Column       | Type           | Constraints | Default | Description                   |
| ------------ | -------------- | ----------- | ------- | ----------------------------- |
| `id`         | `UUID`         | PK          | —       | —                             |
| `name`       | `VARCHAR(200)` | NOT NULL    | —       | Full name                     |
| `title`      | `VARCHAR(200)` | NULLABLE    | —       | "Cybersecurity Graduate 2025" |
| `avatar_url` | `VARCHAR(500)` | NULLABLE    | —       | —                             |
| `content`    | `TEXT`         | NOT NULL    | —       | Testimonial text              |
| `rating`     | `INTEGER`      | NULLABLE    | —       | 1-5                           |
| `featured`   | `BOOLEAN`      | NOT NULL    | `false` | Show on homepage              |
| `sort_order` | `INTEGER`      | NOT NULL    | `0`     | —                             |
| `active`     | `BOOLEAN`      | NOT NULL    | `true`  | —                             |
| `created_at` | `TIMESTAMPTZ`  | NOT NULL    | `NOW()` | —                             |

### Table: `partners`

| Column        | Type           | Constraints | Default | Description  |
| ------------- | -------------- | ----------- | ------- | ------------ |
| `id`          | `UUID`         | PK          | —       | —            |
| `name`        | `VARCHAR(200)` | NOT NULL    | —       | Company name |
| `logo_url`    | `VARCHAR(500)` | NOT NULL    | —       | —            |
| `website_url` | `VARCHAR(500)` | NULLABLE    | —       | —            |
| `sort_order`  | `INTEGER`      | NOT NULL    | `0`     | —            |
| `active`      | `BOOLEAN`      | NOT NULL    | `true`  | —            |
| `created_at`  | `TIMESTAMPTZ`  | NOT NULL    | `NOW()` | —            |

### Table: `faqs`

| Column       | Type           | Constraints | Default | Description                                          |
| ------------ | -------------- | ----------- | ------- | ---------------------------------------------------- |
| `id`         | `UUID`         | PK          | —       | —                                                    |
| `section`    | `VARCHAR(100)` | NOT NULL    | —       | admissions, tuition, scholarships, programs, general |
| `question`   | `TEXT`         | NOT NULL    | —       | —                                                    |
| `answer`     | `TEXT`         | NOT NULL    | —       | —                                                    |
| `sort_order` | `INTEGER`      | NOT NULL    | `0`     | —                                                    |
| `active`     | `BOOLEAN`      | NOT NULL    | `true`  | —                                                    |
| `created_at` | `TIMESTAMPTZ`  | NOT NULL    | `NOW()` | —                                                    |

---

## 5. Complete API Contract

### `GET /api/programs`

**Auth:** Public (no auth required)  
**Purpose:** List all active programs with optional filtering.

**Query Parameters:**

```typescript
interface GetProgramsQuery {
  search?: string; // Full-text search on title, description
  category?: string; // Filter by category
  level?: "beginner" | "intermediate" | "advanced";
  format?: "online" | "in_person" | "hybrid";
  featured?: boolean; // Only featured
  minPrice?: number;
  maxPrice?: number;
  duration_max?: number; // Max duration in weeks
  sort?: "popularity" | "price_asc" | "price_desc" | "duration" | "newest";
  page?: number; // Default: 1
  limit?: number; // Default: 12, Max: 50
}
```

**Response:**

```typescript
interface GetProgramsResponse {
  data: ProgramSummary[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface ProgramSummary {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  shortDescription: string;
  category: string;
  level: string;
  format: string;
  durationLabel: string;
  durationWeeks: number;
  price: number;
  priceLabel: string | null;
  currency: string;
  thumbnailUrl: string | null;
  rating: number | null;
  reviewCount: number;
  enrolledCount: number;
  maxStudents: number | null;
  isAcceptingApplications: boolean; // active && enrolledCount < maxStudents
}
```

**Error Codes:**

| Code                  | HTTP Status | Message                               |
| --------------------- | ----------- | ------------------------------------- |
| `INVALID_PAGE`        | 400         | "Page must be a positive integer"     |
| `INVALID_LIMIT`       | 400         | "Limit must be between 1 and 50"      |
| `INVALID_SORT`        | 400         | "Invalid sort parameter"              |
| `INVALID_PRICE_RANGE` | 400         | "minPrice must be less than maxPrice" |
| `INTERNAL_ERROR`      | 500         | "An unexpected error occurred"        |

### `GET /api/programs/:slug`

**Auth:** Public

**Response:**

```typescript
interface GetProgramDetailResponse {
  program: ProgramDetail;
  curriculum: ProgramModule[];
  instructors: ProgramInstructor[];
  faqs: FAQ[];
}

interface ProgramDetail extends ProgramSummary {
  description: string;
  bannerUrl: string | null;
  videoUrl: string | null;
  prerequisites: string[];
  careerOutcomes: { title: string; salary: string; description: string }[];
  whatYouLearn: string[];
  metaTitle: string | null;
  metaDescription: string | null;
}

interface ProgramModule {
  id: string;
  title: string;
  description: string | null;
  sortOrder: number;
  lessonCount: number;
  estimatedWeeks: number;
  lessons: ProgramLesson[];
}

interface ProgramLesson {
  id: string;
  title: string;
  durationMinutes: number;
  contentType: "video" | "article" | "quiz" | "project" | "assignment";
  isPreview: boolean;
}

interface ProgramInstructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  rating: number | null;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}
```

**Error Codes:**

| Code               | HTTP Status | Message                             |
| ------------------ | ----------- | ----------------------------------- |
| `NOT_FOUND`        | 404         | "Program not found"                 |
| `INACTIVE_PROGRAM` | 404         | "Program not found" (hide inactive) |

### `POST /api/auth/register`

**Auth:** Public

**Request:**

```typescript
interface RegisterRequest {
  email: string; // Valid email, max 255
  password?: string; // Min 8, max 128, at least 1 uppercase + 1 number. Null if OAuth.
  authProvider?: "google" | "github" | "microsoft";
  authProviderId?: string;
  firstName?: string;
  lastName?: string;
  consentMarketing: boolean;
  consentSms: boolean;
}
```

**Response:**

```typescript
interface RegisterResponse {
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
  sessionToken: string; // JWT, expires in 7 days
  expiresAt: string; // ISO 8601
}
```

**Error Codes:**

| Code               | HTTP Status | Message                                                                |
| ------------------ | ----------- | ---------------------------------------------------------------------- |
| `EMAIL_EXISTS`     | 409         | "An account with this email already exists"                            |
| `WEAK_PASSWORD`    | 400         | "Password must be at least 8 characters with 1 uppercase and 1 number" |
| `INVALID_EMAIL`    | 400         | "Please provide a valid email address"                                 |
| `INVALID_PROVIDER` | 400         | "Unsupported authentication provider"                                  |

### `POST /api/auth/login`

**Auth:** Public

**Request:**

```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

**Response:**

```typescript
interface LoginResponse {
  user: UserProfile;
  sessionToken: string;
  expiresAt: string;
}
```

### `POST /api/auth/oauth`

**Auth:** Public

**Request:**

```typescript
interface OAuthRequest {
  provider: "google" | "github" | "microsoft";
  code: string; // OAuth authorization code
}
```

### `POST /api/auth/logout`

**Auth:** Required (session token)

### `POST /api/auth/forgot-password`

**Request:**

```typescript
interface ForgotPasswordRequest {
  email: string;
}
```

**Response:** `{ message: "If an account exists, a reset link has been sent" }` (always 200, do not reveal if email exists)

### `POST /api/auth/reset-password`

**Request:**

```typescript
interface ResetPasswordRequest {
  token: string;
  password: string;
}
```

### `GET /api/applications/current`

**Auth:** Required (prospective student)

**Response:**

```typescript
interface GetCurrentApplicationResponse {
  application: ApplicationSummary | null;
}

interface ApplicationSummary {
  id: string;
  referenceNumber: string;
  status: ApplicationStatus;
  currentStep: number;
  completionPercentage: number;
  programId: string;
  programTitle: string;
  submittedAt: string | null;
  decisionAt: string | null;
  enrollmentTerm: string | null;
  createdAt: string;
  updatedAt: string;
}

type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "documents_pending"
  | "interview_scheduled"
  | "accepted"
  | "waitlisted"
  | "rejected"
  | "withdrawn"
  | "enrolled";
```

### `POST /api/applications`

**Auth:** Required

**Request:**

```typescript
interface CreateApplicationRequest {
  programId: string;
  enrollmentTerm: string;
  preferredFormat: "online" | "in_person" | "hybrid";
}
```

**Response:** `201 { application: ApplicationSummary }`

### `PUT /api/applications/:id/step/:stepNumber`

**Auth:** Required (owner of application)

**Request:**

```typescript
interface SaveStepRequest {
  data: Record<string, any>; // Validated per step schema
  completed?: boolean;
}
```

**Response:**

```typescript
interface SaveStepResponse {
  step: {
    stepNumber: number;
    completed: boolean;
    updatedAt: string;
  };
  application: {
    currentStep: number;
    completionPercentage: number;
  };
  validationErrors?: Record<string, string[]>; // Server-side validation messages
}
```

### `POST /api/applications/:id/submit`

**Auth:** Required (owner)

**Response:**

```typescript
interface SubmitResponse {
  application: ApplicationSummary;
  message: string;
  estimatedDecisionDate: string;
}
```

**Error Codes:**

| Code                | Condition             | Message                                                |
| ------------------- | --------------------- | ------------------------------------------------------ |
| `INCOMPLETE`        | Not all steps done    | "Please complete all required steps before submitting" |
| `MISSING_DOCS`      | Required docs missing | "Please upload all required documents"                 |
| `ALREADY_SUBMITTED` | Already submitted     | "This application has already been submitted"          |
| `PROGRAM_FULL`      | Program at capacity   | "This program is currently full"                       |

### `GET /api/applications/:id/status`

**Auth:** Required (owner or admin)

**Response:**

```typescript
interface GetApplicationStatusResponse {
  application: ApplicationSummary;
  timeline: StatusEvent[];
  missingItems: MissingItem[];
  communications: Communication[];
  estimatedDecisionDate: string | null;
  daysSinceSubmission: number;
}

interface StatusEvent {
  id: string;
  status: string;
  displayMessage: string;
  notes: string | null;
  createdAt: string;
}

interface MissingItem {
  type: string;
  label: string;
  description: string;
  uploadEndpoint: string;
}

interface Communication {
  id: string;
  subject: string;
  preview: string;
  sentAt: string;
  read: boolean;
}
```

### `POST /api/applications/:id/documents`

**Auth:** Required (owner)

**Request:** `multipart/form-data`

```typescript
interface UploadDocumentRequest {
  file: File;
  documentType: string;
}
```

**Response:**

```typescript
interface UploadDocumentResponse {
  document: {
    id: string;
    documentType: string;
    fileName: string;
    fileSizeBytes: number;
    status: "pending";
    createdAt: string;
  };
}
```

### `DELETE /api/applications/:id/documents/:docId`

**Auth:** Required (owner)

### `POST /api/applications/:id/withdraw`

**Auth:** Required (owner)

**Request:**

```typescript
interface WithdrawRequest {
  reason?: string;
}
```

### `GET /api/scholarships`

**Auth:** Public

**Query:** `type?: string`

**Response:**

```typescript
interface GetScholarshipsResponse {
  scholarships: ScholarshipSummary[];
}

interface ScholarshipSummary {
  id: string;
  name: string;
  description: string;
  type: string;
  maxAmount: number;
  minAmount: number;
  deadline: string | null;
  slotsAvailable: number | null;
  eligibilitySummary: string; // Human readable
}
```

### `POST /api/scholarships/estimate`

**Auth:** Public

**Request:**

```typescript
interface EstimateRequest {
  householdIncome?: string; // '<30k', '30k-50k', '50k-75k', '75k-100k', '100k-150k', '150k+'
  gpa?: string; // '<2.5', '2.5-3.0', '3.0-3.5', '3.5-4.0'
  programId?: string;
  isVeteran?: boolean;
  isFirstGeneration?: boolean;
}
```

**Response:**

```typescript
interface EstimateResponse {
  estimatedRange: { min: number; max: number };
  eligibleScholarships: {
    id: string;
    name: string;
    estimatedAmount: { min: number; max: number };
    confidence: "high" | "medium" | "low";
  }[];
  disclaimer: string;
}
```

### `GET /api/virtual-tour/scenes`

**Auth:** Public

**Response:**

```typescript
interface GetTourScenesResponse {
  scenes: TourScene[];
}

interface TourScene {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string;
  panoramaUrl: string;
  sortOrder: number;
  hotspots: {
    id: string;
    x: number; // 0-1 normalized
    y: number; // 0-1 normalized
    title: string;
    description: string;
    linkedSceneId: string | null;
  }[];
}
```

### `GET /api/programs/compare`

**Auth:** Public

**Query:** `ids: string` (comma-separated UUIDs, 2-4 values)

**Response:**

```typescript
interface CompareProgramsResponse {
  programs: ProgramCompareData[];
  sharedFields: string[]; // Fields to compare across all
}

interface ProgramCompareData extends ProgramSummary {
  description: string;
  modules: { title: string; lessonCount: number }[];
  instructors: string[]; // Instructor names
  prerequisites: string[];
  rating: number | null;
  reviewCount: number;
}
```

### `GET /api/testimonials`

**Auth:** Public  
**Query:** `featured?: boolean`  
**Response:** `{ testimonials: Testimonial[] }`

### `GET /api/partners`

**Auth:** Public  
**Response:** `{ partners: Partner[] }`

### `GET /api/site/stats`

**Auth:** Public  
**Response:** `{ stats: { key: string; label: string; value: string; suffix: string | null }[] }`

### `GET /api/faqs`

**Auth:** Public  
**Query:** `section?: string`  
**Response:** `{ faqs: FAQ[] }`

### `POST /api/newsletter/subscribe`

**Auth:** Public

**Request:**

```typescript
interface NewsletterSubscribeRequest {
  email: string;
  name?: string;
  consentMarketing: true; // Must be explicitly true
}
```

**Response:** `201 { message: "Subscribed successfully" }`

---

## 6. Component Tree

```
Layout
├── NavBar
│   ├── Logo (Link to /)
│   ├── NavLinks (desktop)
│   │   ├── Link → /programs
│   │   ├── Link → /admissions
│   │   ├── Link → /tuition
│   │   ├── Link → /about
│   │   └── Link → /virtual-tour
│   ├── SearchTrigger → opens SearchModal
│   ├── MobileMenuToggle (hamburger)
│   │   └── MobileMenu (slide-out drawer)
│   │       └── MobileNavLinks
│   ├── AuthButtons (login/register) OR UserMenu (if authenticated)
│   └── ApplyNowButton (prominent CTA)
│
├── Footer
│   ├── FooterLogo
│   ├── FooterNavColumns
│   │   ├── FooterLinkGroup("Programs")
│   │   ├── FooterLinkGroup("Admissions")
│   │   ├── FooterLinkGroup("Resources")
│   │   └── FooterLinkGroup("Connect")
│   ├── NewsletterSignup (inline form + submit)
│   ├── SocialLinks (icons → LinkedIn, Twitter, YouTube, GitHub, Discord)
│   └── CopyrightBar
│
├── HomePage
│   ├── HeroSection
│   │   ├── HeroHeadline
│   │   ├── HeroSubtitle
│   │   ├── CTAButton("Explore Programs")
│   │   └── CTAButton("Apply Now")
│   ├── TrustBar (animated counter section)
│   ├── FeaturedPrograms
│   │   ├── SectionHeader
│   │   ├── ProgramCard[] (horizontal scroll / grid)
│   │   │   ├── ProgramThumbnail
│   │   │   ├── ProgramBadge (category/level)
│   │   │   ├── ProgramTitle
│   │   │   ├── ProgramMeta (duration, format, price)
│   │   │   └── ViewDetailsLink
│   │   └── ScrollButtons (mobile: dots indicator)
│   ├── StatsRow
│   │   └── StatCard[] (animated number counters)
│   ├── TestimonialCarousel
│   │   ├── TestimonialCard
│   │   └── CarouselNav (dots / arrows)
│   ├── PartnerStrip (scrolling logo banner)
│   └── CTABanner ("Start Your Journey")
│
├── ProgramCatalogPage
│   ├── PageHeader (title + subtitle)
│   ├── SearchFilters
│   │   ├── SearchInput (with debounce)
│   │   ├── FilterGroup("Category") → CheckboxGroup
│   │   ├── FilterGroup("Format") → CheckboxGroup
│   │   ├── FilterGroup("Level") → CheckboxGroup
│   │   ├── FilterGroup("Duration") → CheckboxGroup
│   │   ├── PriceRangeFilter (Min/Max inputs)
│   │   ├── ActiveFilterTags (click to remove)
│   │   └── ClearFiltersButton
│   ├── SortSelect
│   ├── ResultCount
│   ├── ProgramCardGrid (responsive grid)
│   │   └── ProgramCard[] (reused from hero)
│   └── Pagination
│
├── ProgramDetailPage
│   ├── Breadcrumb
│   ├── ProgramHero
│   │   ├── ProgramBanner
│   │   ├── ProgramTitle
│   │   ├── ProgramMetaRow (badge, duration, format, price)
│   │   ├── ApplyNowButton
│   │   ├── DownloadBrochureButton
│   │   └── SaveProgramButton (heart icon)
│   ├── ProgramOverview (rich text)
│   ├── WhatYouLearnList
│   ├── PrerequisitesList
│   ├── CurriculumAccordion
│   │   └── ModuleAccordion[]
│   │       ├── ModuleHeader (title, lesson count, duration)
│   │       └── LessonItem[] (title, duration, content type icon, preview badge)
│   ├── InstructorsSection
│   │   └── InstructorCard[]
│   │       ├── Avatar
│   │       ├── Name
│   │       ├── Title
│   │       ├── Bio (truncated with "read more")
│   │       └── Rating
│   ├── PricingSection
│   │   ├── PriceDisplay
│   │   ├── PaymentPlanInfo
│   │   └── ScholarshipLink
│   ├── FAQAccordion
│   └── StickyCTABar (scroll-triggered)
│
├── ApplicationFormPage
│   ├── ProgressStepper (6 steps)
│   ├── StepRenderer
│   │   ├── StepPersonalInfo
│   │   │   ├── FormField("First Name")
│   │   │   ├── FormField("Middle Name")
│   │   │   ├── FormField("Last Name")
│   │   │   ├── DatePicker("Date of Birth")
│   │   │   ├── FormField("Email")
│   │   │   ├── FormField("Confirm Email")
│   │   │   ├── FormField("Phone")
│   │   │   ├── AddressForm (street, city, state, zip composite)
│   │   │   ├── FormField("SSN Last 4")
│   │   │   └── SelectField("How did you hear about us?")
│   │   ├── StepAcademicHistory
│   │   │   ├── EducationEntry("High School")
│   │   │   ├── EducationEntry("College") (repeatable)
│   │   │   └── FileUpload("Transcript")
│   │   ├── StepProgramSelection
│   │   │   ├── ProgramSelect (radio cards)
│   │   │   ├── TermSelect
│   │   │   └── FormatSelect
│   │   ├── StepDocuments
│   │   │   ├── FileUpload("Resume")
│   │   │   ├── TextArea("Statement of Purpose")
│   │   │   ├── RecommenderForm[] (2 entries)
│   │   │   │   ├── FormField("Name")
│   │   │   │   ├── FormField("Email")
│   │   │   │   ├── FormField("Relationship")
│   │   │   │   └── FileUpload("Letter") OR sendEmail toggle
│   │   │   └── FormField("Portfolio URL")
│   │   ├── StepFinancialInfo
│   │   │   ├── ScholarshipToggle
│   │   │   ├── ScholarshipSelector
│   │   │   ├── PaymentPlanSelect
│   │   │   └── FormField("FAFSA Info")
│   │   └── StepReview
│   │       ├── ReviewSection("Personal Info")
│   │       ├── ReviewSection("Academic History")
│   │       ├── ReviewSection("Program")
│   │       ├── ReviewSection("Documents")
│   │       ├── ReviewSection("Financial")
│   │       ├── SignatureField (typed name)
│   │       └── SubmitButton
│   ├── NavButtons (Back / Save & Continue)
│   └── AutoSaveIndicator ("Saved just now" / "Saving..." / "Save failed")
│
├── ApplicationStatusPage
│   ├── StatusHeader (ref number + overall status badge)
│   ├── StatusTimeline
│   │   └── TimelineStep[] (icon, label, date, description)
│   ├── MissingItemsAlert
│   │   └── MissingItem[] (with upload button)
│   ├── CommunicationHistory
│   │   └── CommunicationCard[]
│   ├── WithdrawButton (with confirmation modal)
│   └── ContactAdmissionsButton
│
├── ScholarshipPage
│   ├── EstimatorForm
│   │   ├── IncomeSelect
│   │   ├── GPASelect
│   │   ├── ProgramSelect
│   │   ├── YesNoField("Veteran")
│   │   ├── YesNoField("First Generation")
│   │   ├── EstimateButton
│   │   └── EstimateResult (animated card)
│   ├── ScholarshipCardList
│   │   └── ScholarshipCard[]
│   └── FAQAccordion (financial aid section)
│
├── VirtualTourPage
│   ├── TourModeTabs (Gallery / 360° / Video)
│   ├── ThreeSixtyViewer
│   │   ├── PanoramaCanvas (Three.js / Pannellum)
│   │   ├── HotspotMarker[] (clickable)
│   │   │   └── HotspotTooltip
│   │   ├── SceneInfo (title + description panel)
│   │   └── LoaderSpinner
│   ├── SceneNavigator (thumbnails strip)
│   ├── PhotoGallery (fallback for mobile/unsupported)
│   └── BookVisitCTA
│
└── ComparePage
    ├── CompareHeader
    ├── AddProgramButton (modal to search/select)
    ├── ComparisonTable (responsive scrollable)
    │   ├── CompareRow("Price")
    │   ├── CompareRow("Duration")
    │   ├── CompareRow("Format")
    │   ├── CompareRow("Level")
    │   ├── CompareRow("Rating")
    │   ├── CompareRow("Modules")
    │   ├── CompareRow("Prerequisites")
    │   └── CompareRow("Instructors")
    └── CompareCTAButtons (Apply per program)
```

---

## 7. Exhaustive User Journeys

### Journey 7.1: First Visit → Program Discovery

**Actor:** Unauthenticated prospective student  
**Entry:** Direct URL, organic search, social media ad

```
Step 1: User lands on homepage (/) via Google search "cybersecurity courses"
  → System loads: Hero, featured programs (API), stats (API), testimonials (API)
  → State: Loading skeleton for dynamic sections

Step 2: User scrolls through hero, sees "Explore Programs" CTA
  → Branch Option A: Clicks "Explore Programs"
    → Navigate to /programs
    → System loads all active programs (GET /api/programs)
  → Branch Option B: Clicks "Apply Now"
    → Navigate to /apply
    → System checks auth → user not logged in → redirect to /auth/login?redirect=/apply
  → Branch Option C: Clicks a featured program card
    → Navigate to /programs/{slug}
    → System loads program details (GET /api/programs/:slug)

Step 3: User is on /programs page
  → System displays 12 program cards with pagination
  → User sees "Cybersecurity Fundamentals" program
  → User clicks program card → navigates to /programs/cybersecurity-fundamentals

Step 4: Program detail page loaded
  → User reads overview, scrolls through curriculum accordion
  → User opens Module 1 → sees lesson list
    → Lesson with isPreview=true → user clicks "Preview"
      → System opens lesson preview modal (embedded video/article excerpt)
  → User scrolls to pricing → "Check Scholarship Eligibility" link
    → Navigate to /scholarships
  → User scrolls to instructors → sees credentials
  → User clicks "Apply Now" in sticky CTA bar
    → Redirect to /apply → not logged in → /auth/login

Step 5: User logs in (or registers)
  → Branch: New user → fills registration form → POST /api/auth/register
    → Redirect to /apply
  → Branch: Existing user → enters email/password → POST /api/auth/login
    → Redirect to /apply

Alternative Paths:
  - Step 2 Branch B: User clicks "Apply Now" → goes to auth → after login, checks if draft application exists
    → If no draft: redirect to application step 1
    → If draft: resume from last incomplete step
  - Step 4: User loses interest on detail page → navigates away without applying
    → Track as "bounced consideration" event → maybe retarget via email
  - Error Path: Program detail fails to load (500) → show error state with retry
    → Retry succeeds → continue journey
    → Retry fails → show "Please try again later" with contact support link
```

### Journey 7.2: Application Submission

**Actor:** Registered prospective student  
**Prerequisite:** Logged in, no existing submitted application

```
Step 1: User navigates to /apply
  → System checks GET /api/applications/current
    → No existing application → show step 1 empty form
    → Existing draft → show "Resume Application" prompt

Step 2: User fills Step 1 — Personal Information
  → Auto-save timer starts (30s debounce)
  → User fills first name, last name, email, phone, etc.
  → Email field: onBlur → async validation POST /api/validate/email-exists
    → If exists: show inline error "This email is already in use"
  → User clicks "Save & Continue"
  → POST /api/applications/:id/step/1 { data, completed: true }
    → On success: advance to step 2, update progress bar to 33%
    → On error: show toast "Failed to save. [Retry]"

Step 3: User fills Step 2 — Academic History
  → User adds high school entry → clicks "Add College" → duplicate form appears
  → File upload: User selects transcript PDF
    → POST /api/upload → returns R2 signed URL → stores in application_documents
    → Show upload progress bar (percentage)
    → On success: green checkmark + file name
    → On error: "Upload failed. [Try again]"
    → Edge: File >10MB → rejected before upload "File must be under 10MB"
    → Edge: Wrong format → "Accepted: PDF, DOC, DOCX, JPG, PNG"
  → User clicks "Save & Continue"

Step 4: User fills Step 3 — Program Selection
  → Radio card group: user clicks desired program
  → Term select: user picks "Fall 2026"
  → Format select: user picks "Online"
  → Save & Continue

Step 5: User fills Step 4 — Supporting Documents
  → Resume upload (optional)
  → Statement of Purpose text area (500-2000 char required)
    → Character counter: "You have X characters remaining"
    → Edge: <500 chars → "Statement must be at least 500 characters"
  → Recommender 1: name, email, relationship
    → Option A: Upload letter directly
    → Option B: Send email request to recommender
  → Recommender 2: same
  → Portfolio URL (optional, must be valid URL)
  → Save & Continue

Step 6: User fills Step 5 — Financial Information
  → Toggle "Apply for scholarships" → ON
    → Shows scholarship selection checkboxes
    → User checks "Merit Scholarship" and "Need-Based Grant"
  → Payment plan: selects "4-month installment plan"
  → FAFSA info: "I have submitted FAFSA" checkbox
  → Save & Continue

Step 7: User reviews — Step 6
  → System loads all saved data into read-only review cards
  → User scrolls through each section
    → Can click "Edit" on any section → jumps to that step
  → User reads declaration: "I certify that all information is true..."
  → User types full name in signature field (e-signature)
  → User clicks "Submit Application"
  → Confirmation modal: "Are you sure? You won't be able to edit after submission."
    → User clicks "Confirm Submit"
    → POST /api/applications/:id/submit
      → On success (201):
        → System transitions status to 'submitted'
        → Generates reference number CEA-2026-XXXXX
        → Redirect to /apply/status/{id}
        → Show confetti animation
        → Send email notification
      → On error: validation fails → "Please fix X errors" → scroll to field
      → On error: program full → "This program is now full. [Browse other programs]"

Step 8: User sees status page
  → Timeline shows Step 1: "Submitted" with timestamp
  → Estimated decision date displayed (14 business days from now)
  → User sees "We'll notify you at {email}"

Alternative Paths:
  - User saves and leaves at Step 3 → returns 2 days later
    → System loads draft → resume at step 3 (or step 4 if step 3 was completed)
  - User abandons at Step 2 for 7 days → automated email reminder sent
  - User hits browser back during form → confirm dialog "Leave without saving?"
  - Network drops during submit → queued via service worker → sync when online
```

### Journey 7.3: Application Status Checking

**Actor:** Prospective student who has submitted  
**Prerequisite:** Application submitted, not yet decided

```
Step 1: User receives email: "Application Received" with status link
  → Clicks link → /apply/status/{id}
  → System loads GET /api/applications/:id/status
    → Status: 'submitted'

Step 2: User sees timeline:
  ✅ Submitted — Jan 15
  ⏳ Documents Verified — Pending
  ⏳ Under Review — Pending
  ⏳ Decision — Pending

Step 3: User checks back daily
  → Day 3: Status changes to 'documents_pending'
    → Missing item alert: "Transcript not yet received"
    → User uploads transcript → status updates
    → Timeline updates: ✅ Documents Verified — Jan 18
  → Day 7: Status changes to 'under_review'
    → Timeline: 🔄 Under Review — Since Jan 20
    → Estimated decision: Feb 5
  → Day 14: Status polling triggers
    → Decision ready! (status changes to 'accepted' or 'rejected')

Branch: ACCEPTED
  → Confetti animation on status page
  → Timeline: ✅ Decision — "Congratulations! You've been accepted."
  → Next steps section appears:
    → "Review your offer letter" [Download PDF]
    → "Accept Offer" [Button] → POST /api/applications/:id/accept
    → "Schedule a call with advisor" [Calendar link]
    → "Enrollment checklist" [Link to onboarding]
  → Email notification sent: "You're in! 🎉"
  → User clicks "Accept Offer"
    → Modal: "By accepting, you agree to the terms..."
    → User accepts → status changes to 'enrolled'
    → User transitions to Current Student actor
      → System creates student record (role: student)
      → Welcome email with next steps
      → Redirect to student dashboard

Branch: WAITLISTED
  → Timeline: ⏳ Decision — Waitlisted
  → Message: "You've been waitlisted for this program."
  → Options:
    → "Remain on waitlist" (default)
    → "Consider alternative program" [Browse programs]
    → "Appeal decision" → form submission
  → Email: "Update on your application"

Branch: REJECTED
  → Timeline: ❌ Decision — Not Accepted
  → Message: "We're sorry, but we're unable to offer you admission at this time."
  → Options:
    → "Review feedback" → constructive notes
    → "Apply again next term" → link
    → "Consider alternative programs" → browse
    → "Contact admissions for discussion"
  → Email: "Decision on your application"
  → Analytics: Track rejection → potentially retarget in 6 months

Alternative Paths:
  - User can't find status link → searches email → uses "Forgot application ID?"
  - Status page fails to load → show cached snapshot from localStorage
  - Decision takes longer than estimated → show "We apologize for the delay" banner
  - User withdraws → timeline shows withdrawn, archive mode
```

### Journey 7.4: Scholarship Exploration

```
Step 1: User navigates to /scholarships
  → Page loads scholarship list and estimator form
  → User sees "Merit Scholarship: up to $5,000"

Step 2: User fills estimator:
  - Income: "30k-50k"
  - GPA: "3.5-4.0"
  - Program: "Penetration Testing"
  - Veteran: No
  - First Gen: Yes
  → Clicks "Estimate My Eligibility"
  → POST /api/scholarships/estimate
  → Result shows: "Estimated award: $3,000 - $7,500"
  → "You may qualify for 3 scholarships"

Step 3: User scrolls to scholarship cards
  → Clicks "Learn More" on Merit Scholarship
    → Expands with full details, eligibility criteria, deadline
  → Clicks "Apply" → redirected to application form (or resume if already applying)

Step 4: User decides to apply for scholarship
  → Checks scholarship checkbox in application Step 5
  → Submits application with scholarship request

Alternative Paths:
  - Estimator can't estimate (insufficient data) → "Complete more fields for a better estimate"
  - No scholarships available → "No scholarships currently match your profile"
```

### Journey 7.5: Virtual Tour Experience

```
Step 1: User clicks "Virtual Tour" in nav → /virtual-tour

Step 2: 360° viewer loads
  → Initially low-res placeholder → high-res swap
  → User drags to look around
  → Clicks hotspot "Cybersecurity Lab" → tooltip appears with details
  → User clicks hotspot → transitions to lab scene

Step 3: User navigates through scenes
  → Lab → Library → Student Lounge → Classroom

Step 4: User clicks "Schedule a Visit"
  → Opens booking modal → form:
    - Name, Email, Phone
    - Preferred date (date picker, weekday only)
    - Preferred time slot
    - Program interest
  → Submission → POST /api/visit-requests

Alternative:
  - Browser doesn't support WebGL → fallback to photo gallery
  - Mobile → show video tour instead of 360°
```

### Journey 7.6: Comparison Tool

```
Step 1: User is browsing /programs
  → Sees "Compare" button on program card (or nav link)
  → Clicks → /programs/compare?ids=

Step 2: Empty compare page → "Add programs to compare"
  → Clicks "Add Program" → search modal
  → Searches "cyber" → selects Cybersecurity Fundamentals
  → Searches "penetration" → adds Penetration Testing
  → Searches "cloud" → adds Cloud Security

Step 3: Table renders with 3 columns
  → User compares: price, duration, format, modules
  → User sees Cybersecurity Fundamentals is cheapest
  → Clicks "Apply" on that column → navigates to /apply

Alternative:
  - User adds only 1 → "Add at least 2 programs"
  - User tries to add 5th → "Maximum 4 programs to compare"
  - Mobile → horizontal scroll table with sticky first column
```

---

## 8. Business Rules Engine

### Rule BR-PS-001: Lead Scoring

**Formula:** `lead_score = (page_visits * 5) + (program_detail_views * 10) + (application_starts * 25) + (scholarship_checks * 15) + (tour_views * 8) + CTA_clicks * 3`
**Cap:** Max 100  
**Trigger:** Computed nightly via cron job + real-time increment on key events

### Rule BR-PS-002: Application Auto-Save

- Auto-save triggers 30 seconds after last keystroke change
- Auto-save only if form data has changed since last save
- Show "Saved just now" indicator on save success
- Show "Save failed" with retry button on failure
- If user navigates away without saving for >5 min → background save attempt

### Rule BR-PS-003: Application Deadline Enforcement

- Applications cannot be submitted after program deadline
- Before deadline (30 days): normal flow
- Within 14 days of deadline: show "Deadline approaching" banner
- After deadline: disable submission with "Applications for this term are closed"
- Exception: rolling admissions programs have no deadline (deadline = NULL)

### Rule BR-PS-004: Document Requirements

- Transcript: required for all applicants
- Statement of Purpose: required, 500-2000 characters
- Recommendation letters: 2 required, at least 1 from academic source
- Resume: optional but recommended
- Portfolio: required only for certain programs (per program config)

### Rule BR-PS-005: Duplicate Application Prevention

- One active application per student per term
- If user tries to start second application → "You already have an application for {term}"
- Option: "Start application for different term"
- Withdrawn applications don't count toward limit

### Rule BR-PS-006: Decision Timeline SLAs

- Under Review → Decision: max 14 business days
- If >14 business days → auto-escalate to admissions supervisor
- Display estimated date = submission + 14 business days
- If date passed without decision → show delay notice + apology

### Rule BR-PS-007: Scholarship Eligibility

- Merit: GPA 3.5+, no income requirement
- Need-Based: Income <$75k, any GPA
- Military: Veteran or active duty, any GPA
- First Generation: No parent with college degree, any income
- Diversity: Underrepresented in tech, any GPA/income
- Multi-scholarship stacking allowed up to 100% of tuition

### Rule BR-PS-008: Offer Acceptance Window

- Accepted students have 14 calendar days to accept offer
- Auto-reminder at day 7 and day 12
- If not accepted by day 14 → offer expires → status reverts to 'waitlisted' or 'rejected'

### Rule BR-PS-009: Program Capacity

- If `enrolled_count >= max_students` → program shows "Full"
- Waitlist available when full
- If a spot opens (someone declines), next waitlisted applicant gets offer
- Waitlist priority: lead_score DESC, submitted_at ASC

### Rule BR-PS-010: Minimum Age

- Applicant must be 16+ years old by program start date
- Under 18: requires parent/guardian co-signature on enrollment agreement

---

## 9. Notification Specifications

### N-PS-01: Application Received

| Field              | Value                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| **Trigger**        | Application submitted successfully                                                                |
| **Channel**        | Email + In-app (status page)                                                                      |
| **Template ID**    | `app_received`                                                                                    |
| **To**             | Applicant email                                                                                   |
| **Subject**        | "We've received your application — CEA-2026-XXXXX"                                                |
| **Body Variables** | `{{firstName}}`, `{{refNumber}}`, `{{programName}}`, `{{estimatedDecisionDate}}`, `{{statusUrl}}` |
| **Delivery Rules** | Send immediately on submission                                                                    |
| **Frequency Cap**  | Once per application                                                                              |

### N-PS-02: Application Status Change

| Field              | Value                                                                             |
| ------------------ | --------------------------------------------------------------------------------- |
| **Trigger**        | Application status transitions (any status change)                                |
| **Channel**        | Email + In-app toast + Push (if opted in)                                         |
| **Template ID**    | `status_change`                                                                   |
| **To**             | Applicant email                                                                   |
| **Subject**        | "Your application status has changed"                                             |
| **Body Variables** | `{{firstName}}`, `{{refNumber}}`, `{{newStatus}}`, `{{message}}`, `{{statusUrl}}` |
| **Delivery Rules** | Immediate, max 1 per hour per application (dedup window)                          |
| **Frequency Cap**  | Max 5 per application lifecycle                                                   |

### N-PS-03: Missing Documents Reminder

| Field              | Value                                                                 |
| ------------------ | --------------------------------------------------------------------- |
| **Trigger**        | Application in 'documents_pending' for >48 hours                      |
| **Channel**        | Email                                                                 |
| **Template ID**    | `missing_docs`                                                        |
| **To**             | Applicant email                                                       |
| **Subject**        | "Action needed: Upload your documents"                                |
| **Body Variables** | `{{firstName}}`, `{{missingItems}}`, `{{uploadLink}}`, `{{deadline}}` |
| **Delivery Rules** | Day 2, Day 5, Day 10 (max 3 reminders)                                |
| **Frequency Cap**  | 3 total                                                               |

### N-PS-04: Decision Rendered

| Field              | Value                                                                                |
| ------------------ | ------------------------------------------------------------------------------------ |
| **Trigger**        | Decision made (accepted/waitlisted/rejected)                                         |
| **Channel**        | Email + In-app (status page + confetti if accepted)                                  |
| **Template ID**    | `decision_accepted`, `decision_waitlisted`, `decision_rejected`                      |
| **To**             | Applicant email                                                                      |
| **Subject**        | "Your application decision is ready"                                                 |
| **Body Variables** | `{{firstName}}`, `{{programName}}`, `{{decision}}`, `{{nextSteps}}`, `{{statusUrl}}` |
| **Delivery Rules** | Immediate                                                                            |

### N-PS-05: Offer Expiring Soon

| Field              | Value                                                               |
| ------------------ | ------------------------------------------------------------------- |
| **Trigger**        | Accepted, day 7 of 14-day acceptance window                         |
| **Channel**        | Email + SMS (if opted in)                                           |
| **Template ID**    | `offer_expiring`                                                    |
| **To**             | Applicant email                                                     |
| **Subject**        | "Don't lose your spot — accept by {{deadline}}"                     |
| **Body Variables** | `{{firstName}}`, `{{programName}}`, `{{deadline}}`, `{{acceptUrl}}` |
| **Delivery Rules** | Day 7 and Day 12                                                    |

### N-PS-06: Application Abandonment

| Field              | Value                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------- |
| **Trigger**        | Application started but no activity for 7 days                                        |
| **Channel**        | Email                                                                                 |
| **Template ID**    | `abandonment_1`                                                                       |
| **To**             | Applicant email                                                                       |
| **Subject**        | "Finish your application to Cyber Elias Academy"                                      |
| **Body Variables** | `{{firstName}}`, `{{progressPercent}}`, `{{resumeUrl}}`                               |
| **Delivery Rules** | Day 7: first reminder, Day 14: second reminder, Day 30: final reminder + auto-archive |

### N-PS-07: Scholarship Awarded

| Field              | Value                                                                    |
| ------------------ | ------------------------------------------------------------------------ |
| **Trigger**        | Scholarship application approved                                         |
| **Channel**        | Email + In-app                                                           |
| **Template ID**    | `scholarship_awarded`                                                    |
| **Subject**        | "You've been awarded a scholarship!"                                     |
| **Body Variables** | `{{firstName}}`, `{{scholarshipName}}`, `{{amount}}`, `{{nextStepsUrl}}` |

### N-PS-08: Newsletter Confirmation

| Field              | Value                                    |
| ------------------ | ---------------------------------------- |
| **Trigger**        | Newsletter signup                        |
| **Channel**        | Email                                    |
| **Template ID**    | `newsletter_confirm`                     |
| **Subject**        | "Welcome to Cyber Elias Academy updates" |
| **Body Variables** | `{{firstName}}`                          |

### N-PS-09: Password Reset

| Field              | Value                                 |
| ------------------ | ------------------------------------- |
| **Trigger**        | Password reset requested              |
| **Channel**        | Email                                 |
| **Template ID**    | `password_reset`                      |
| **Subject**        | "Reset your password"                 |
| **Body Variables** | `{{resetLink}}`, `{{expiresMinutes}}` |
| **Delivery Rules** | Link expires in 60 minutes            |

---

## 10. Permission Matrix

| Entity       | Action               | Prospective Student | Anonymous Visitor | Admin/Staff    |
| ------------ | -------------------- | ------------------- | ----------------- | -------------- |
| Programs     | Read (list)          | ✅                  | ✅                | ✅             |
| Programs     | Read (detail)        | ✅                  | ✅                | ✅             |
| Programs     | Create/Update/Delete | ❌                  | ❌                | ✅             |
| Applications | Create (own)         | ✅                  | ❌ (must auth)    | ✅ (on behalf) |
| Applications | Read (own)           | ✅                  | ❌                | ✅ (all)       |
| Applications | Update (own steps)   | ✅ (if draft)       | ❌                | ✅             |
| Applications | Submit (own)         | ✅                  | ❌                | ✅             |
| Applications | Withdraw (own)       | ✅                  | ❌                | ✅             |
| Applications | Accept offer (own)   | ✅                  | ❌                | ✅             |
| Applications | Read others          | ❌                  | ❌                | ✅             |
| Documents    | Upload (own)         | ✅                  | ❌                | ✅             |
| Documents    | Delete (own)         | ✅                  | ❌                | ✅             |
| Scholarships | Read list            | ✅                  | ✅                | ✅             |
| Scholarships | Estimate             | ✅                  | ✅                | ✅             |
| Scholarships | Apply                | ✅ (if has app)     | ❌                | ✅             |
| Virtual Tour | Read                 | ✅                  | ✅                | ✅             |
| Site Stats   | Read                 | ✅                  | ✅                | ✅             |
| Testimonials | Read                 | ✅                  | ✅                | ✅             |
| Profile      | Read (own)           | ✅                  | N/A               | ✅ (any)       |
| Profile      | Update (own)         | ✅                  | N/A               | ✅             |

---

## 11. State Management

### Redux Slice: `prospectiveStudentSlice`

```typescript
interface ProspectiveStudentState {
  profile: {
    data: UserProfile | null;
    loading: boolean;
    error: string | null;
  };
  currentApplication: {
    data: ApplicationSummary | null;
    steps: Record<number, StepData>;
    loading: boolean;
    saving: boolean;
    saveError: string | null;
    submitLoading: boolean;
    submitError: string | null;
  };
  applicationStatus: {
    data: GetApplicationStatusResponse | null;
    loading: boolean;
    error: string | null;
    polling: boolean;
  };
  scholarshipEstimate: {
    data: EstimateResponse | null;
    loading: boolean;
    error: string | null;
  };
}

// Async thunks
-fetchCurrentApplication() -
  saveStep({ applicationId, stepNumber, data, completed }) -
  submitApplication(applicationId) -
  fetchApplicationStatus(applicationId) -
  fetchScholarshipEstimate(params) -
  withdrawApplication({ applicationId, reason }) -
  acceptOffer(applicationId);
```

### RTK Query Endpoints

```typescript
const prospectiveStudentApi = createApi({
  reducerPath: "prospectiveStudentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Programs", "Application", "Status", "Scholarships", "Documents"],
  endpoints: (builder) => ({
    // Public
    getPrograms: builder.query<GetProgramsResponse, GetProgramsQuery>({
      query: (params) => ({ url: "/programs", params }),
      providesTags: ["Programs"],
      keepUnusedDataFor: 300, // 5 min cache
    }),
    getProgramDetail: builder.query<GetProgramDetailResponse, string>({
      query: (slug) => `/programs/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Programs", id: slug }],
    }),
    getTestimonials: builder.query<Testimonial[], boolean | void>({
      query: (featured) => `/testimonials${featured ? "?featured=true" : ""}`,
    }),
    getSiteStats: builder.query<SiteStat[], void>({ query: () => "/site/stats" }),
    getPartners: builder.query<Partner[], void>({ query: () => "/partners" }),
    getFAQs: builder.query<FAQ[], string | void>({
      query: (section) => `/faqs${section ? `?section=${section}` : ""}`,
    }),
    getScholarships: builder.query<Scholarship[], string | void>({
      query: (type) => `/scholarships${type ? `?type=${type}` : ""}`,
    }),
    estimateScholarship: builder.mutation<EstimateResponse, EstimateRequest>({
      query: (body) => ({ url: "/scholarships/estimate", method: "POST", body }),
    }),
    getTourScenes: builder.query<TourScene[], void>({ query: () => "/virtual-tour/scenes" }),
    comparePrograms: builder.query<CompareProgramsResponse, string[]>({
      query: (ids) => `/programs/compare?ids=${ids.join(",")}`,
    }),

    // Auth
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    oauthLogin: builder.mutation<LoginResponse, OAuthRequest>({
      query: (body) => ({ url: "/auth/oauth", method: "POST", body }),
    }),

    // Application
    getCurrentApplication: builder.query<ApplicationSummary | null, void>({
      query: () => "/applications/current",
      providesTags: ["Application"],
    }),
    createApplication: builder.mutation<ApplicationSummary, CreateApplicationRequest>({
      query: (body) => ({ url: "/applications", method: "POST", body }),
      invalidatesTags: ["Application"],
    }),
    saveStep: builder.mutation<SaveStepResponse, SaveStepParams>({
      query: ({ id, stepNumber, ...body }) => ({
        url: `/applications/${id}/step/${stepNumber}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Application"],
    }),
    submitApplication: builder.mutation<SubmitResponse, string>({
      query: (id) => ({ url: `/applications/${id}/submit`, method: "POST" }),
      invalidatesTags: ["Application", "Status"],
    }),
    getApplicationStatus: builder.query<GetApplicationStatusResponse, string>({
      query: (id) => `/applications/${id}/status`,
      providesTags: ["Status"],
      pollingInterval: 30000, // Poll every 30s when active
    }),
    uploadDocument: builder.mutation<UploadDocumentResponse, FormData>({
      query: (formData) => ({ url: "/applications/documents", method: "POST", body: formData }),
      invalidatesTags: ["Documents"],
    }),
    deleteDocument: builder.mutation<void, string>({
      query: (docId) => ({ url: `/applications/documents/${docId}`, method: "DELETE" }),
      invalidatesTags: ["Documents"],
    }),
    withdrawApplication: builder.mutation<ApplicationSummary, { id: string; reason?: string }>({
      query: ({ id, ...body }) => ({ url: `/applications/${id}/withdraw`, method: "POST", body }),
      invalidatesTags: ["Application", "Status"],
    }),
  }),
});
```

**Cache Policies:**

- Programs list: cached 5 min, stale-while-revalidate
- Application status: polled every 30s when page is focused, stop polling when status is terminal (accepted/rejected/withdrawn)
- Scholarships: cached 10 min
- Virtual tour scenes: cached 1 hour (static content)
- Application step data: never cached (fresh always)

**Optimistic Updates:**

- Save step: immediately update local state before API response, rollback on failure
- Upload document: show optimistic file entry with progress bar, replace on success
- Withdraw: immediately show withdrawn state, rollback if API fails

---

## 12. Form Schemas (Zod)

### Step 1: Personal Information

```typescript
import { z } from "zod";

export const PersonalInfoSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(100, "First name must be under 100 characters")
      .regex(/^[a-zA-Z\s'-]+$/, "First name contains invalid characters"),
    middleName: z
      .string()
      .max(100, "Middle name must be under 100 characters")
      .regex(/^[a-zA-Z\s'-]*$/, "Middle name contains invalid characters")
      .optional()
      .or(z.literal("")),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(100, "Last name must be under 100 characters")
      .regex(/^[a-zA-Z\s'-]+$/, "Last name contains invalid characters"),
    dateOfBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .refine((val) => {
        const date = new Date(val);
        const now = new Date();
        const age = now.getFullYear() - date.getFullYear();
        return (
          age >= 16 ||
          (age === 15 && now.getMonth() >= date.getMonth() && now.getDate() >= date.getDate())
        );
      }, "You must be at least 16 years old"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .max(255, "Email must be under 255 characters"),
    confirmEmail: z.string().email(),
    phone: z.string().regex(/^\+?1?\d{10,15}$/, "Please enter a valid phone number (10-15 digits)"),
    streetAddress: z
      .string()
      .min(1, "Street address is required")
      .max(255, "Address must be under 255 characters"),
    city: z.string().min(1, "City is required").max(100, "City must be under 100 characters"),
    state: z.string().min(2, "State is required").max(50),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
    country: z.string().min(1, "Country is required").default("US"),
    ssnLastFour: z
      .string()
      .regex(/^\d{0,4}$/, "Must be 4 digits")
      .optional()
      .or(z.literal("")),
    hearAboutUs: z.string().optional(),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails do not match",
    path: ["confirmEmail"],
  });
```

### Step 2: Academic History

```typescript
export const EducationEntrySchema = z.object({
  institutionName: z.string().min(1, "Institution name is required").max(255),
  institutionType: z.enum(["high_school", "college", "university", "vocational", "other"]),
  attendedFrom: z.string().regex(/^\d{4}$/, "Enter a valid year"),
  attendedTo: z.string().regex(/^\d{4}$/, "Enter a valid year"),
  degree: z.string().optional(),
  graduated: z.boolean(),
  gpa: z
    .string()
    .regex(/^\d\.\d$/, "GPA must be in format X.X")
    .optional(),
});

export const AcademicHistorySchema = z.object({
  educationEntries: z.array(EducationEntrySchema).min(1, "Add at least one education entry"),
  hasGed: z.boolean().optional(),
  transcripts: z.array(z.string()).optional(), // UUIDs of uploaded files
});
```

### Step 3: Program Selection

```typescript
export const ProgramSelectionSchema = z.object({
  programId: z.string().uuid("Please select a program"),
  enrollmentTerm: z.string().min(1, "Please select a term"),
  preferredFormat: z.enum(["online", "in_person", "hybrid"], {
    errorMap: () => ({ message: "Please select a format" }),
  }),
});
```

### Step 4: Supporting Documents

```typescript
export const RecommenderSchema = z.object({
  name: z.string().min(1, "Recommender name is required").max(255),
  email: z.string().email("Valid email required"),
  relationship: z.enum(["teacher", "professor", "employer", "mentor", "other"]),
  uploadMethod: z.enum(["direct", "email_request"]),
  letterFileId: z.string().optional(),
});

export const SupportingDocumentsSchema = z.object({
  resume: z.string().optional(), // File UUID
  statementOfPurpose: z
    .string()
    .min(500, "Statement must be at least 500 characters")
    .max(2000, "Statement must be under 2000 characters"),
  recommenders: z.array(RecommenderSchema).length(2, "Exactly 2 recommendations required"),
  portfolioUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});
```

### Step 5: Financial Information

```typescript
export const FinancialInfoSchema = z.object({
  applyForScholarships: z.boolean(),
  scholarshipIds: z.array(z.string().uuid()).optional(),
  paymentPlan: z.enum(["full", "4_month", "8_month", "12_month"]).optional(),
  fafsaSubmitted: z.boolean().optional(),
  fafsaEfc: z.string().optional(),
  additionalAid: z.string().optional(),
});
```

### Step 6: Review & Submit

```typescript
export const ReviewSubmitSchema = z.object({
  signature: z.string().min(1, "Please type your full name to sign").max(255),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
  agreeToPrivacyPolicy: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the privacy policy" }),
  }),
  confirmAccuracy: z.literal(true, {
    errorMap: () => ({ message: "You must confirm the information is accurate" }),
  }),
});
```

### Registration Form

```typescript
export const RegistrationSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be under 128 characters")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(/[0-9]/, "Password must contain at least 1 number"),
    confirmPassword: z.string(),
    firstName: z.string().min(1).max(100).optional(),
    lastName: z.string().min(1).max(100).optional(),
    consentMarketing: z.boolean(),
    consentSms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
```

---

## 13. Analytics Events

| Event Name                   | Properties                                                     | Trigger                     | Destination            |
| ---------------------------- | -------------------------------------------------------------- | --------------------------- | ---------------------- |
| `page_view`                  | `path`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign` | Every page load             | PostHog + GA4          |
| `program_search`             | `query`, `result_count`                                        | Search submitted            | PostHog                |
| `program_filter`             | `filters: { category, level, format, price }`                  | Filter applied              | PostHog                |
| `program_view`               | `program_id`, `program_name`, `program_category`               | Program detail page loaded  | PostHog                |
| `program_compare`            | `program_ids: string[]`                                        | Comparison page loaded      | PostHog                |
| `apply_start`                | `program_id` (optional)                                        | Clicks "Apply Now"          | PostHog                |
| `application_step_view`      | `step_number`, `application_id`                                | Step loads                  | PostHog                |
| `application_step_complete`  | `step_number`, `completion_time_ms`                            | Step completed              | PostHog                |
| `application_field_focus`    | `field_name`, `step_number`                                    | Field focused (sampled 10%) | PostHog                |
| `application_field_error`    | `field_name`, `error_type`, `step_number`                      | Validation error shown      | PostHog                |
| `application_save`           | `application_id`, `step_number`, `auto_or_manual`              | Save triggered              | PostHog                |
| `application_save_error`     | `application_id`, `error`                                      | Save failed                 | PostHog                |
| `application_submit`         | `application_id`, `program_id`, `completion_time_total`        | Submitted                   | PostHog                |
| `application_submit_error`   | `application_id`, `error_code`                                 | Submit failed               | PostHog                |
| `application_status_view`    | `application_id`, `status`                                     | Status page loaded          | PostHog                |
| `application_withdraw`       | `application_id`, `reason`                                     | Withdrawn                   | PostHog                |
| `offer_view`                 | `application_id`, `decision`                                   | Decision viewed             | PostHog                |
| `offer_accept`               | `application_id`                                               | Offer accepted              | PostHog + CRM webhook  |
| `offer_decline`              | `application_id`, `reason`                                     | Offer declined              | PostHog                |
| `scholarship_estimate`       | `income_range`, `gpa_range`, `eligible_count`                  | Estimate submitted          | PostHog                |
| `scholarship_apply`          | `scholarship_id`                                               | Applied to scholarship      | PostHog                |
| `virtual_tour_start`         | —                                                              | Tour loaded                 | PostHog                |
| `virtual_tour_hotspot_click` | `scene_id`, `hotspot_name`                                     | Hotspot clicked             | PostHog                |
| `virtual_tour_scene_change`  | `from_scene`, `to_scene`                                       | Scene changed               | PostHog                |
| `newsletter_signup`          | `source` (footer, popup, etc.)                                 | Subscribed                  | PostHog + Mailchimp    |
| `lead_captured`              | `email`, `source`, `program_interest`                          | Any capture event           | PostHog → CRM pipeline |

---

## 14. Accessibility Requirements

### ARIA Labels & Landmarks

| Element             | ARIA Attribute                                                                    | Value |
| ------------------- | --------------------------------------------------------------------------------- | ----- |
| Navigation          | `role="navigation"` + `aria-label="Main navigation"`                              | —     |
| Search input        | `aria-label="Search programs"`                                                    | —     |
| Program card grid   | `role="list"` + `aria-label="Program listings"`                                   | —     |
| Each program card   | `role="listitem"`                                                                 | —     |
| Pagination          | `aria-label="Pagination"` + `aria-current="page"` on active                       | —     |
| Form steps          | `aria-label="Step {{n}} of 6: {{step name}}"`                                     | —     |
| Form error messages | `role="alert"` + `aria-describedby` on field                                      | —     |
| Progress bar        | `role="progressbar"` + `aria-valuenow` + `aria-valuemin` + `aria-valuemax`        | —     |
| Modal dialogs       | `role="dialog"` + `aria-modal="true"` + `aria-labelledby`                         | —     |
| Status timeline     | `role="list"` + `aria-label="Application timeline"`                               | —     |
| Comparison table    | `role="table"` + `aria-label="Program comparison"`                                | —     |
| Carousel            | `role="region"` + `aria-roledescription="carousel"` + `aria-label`                | —     |
| File upload         | `aria-label="Upload {{document type}}"` + `aria-describedby` for accepted formats | —     |
| Sort dropdown       | `aria-label="Sort programs by"`                                                   | —     |

### Keyboard Navigation

- All interactive elements focusable via Tab in logical order
- Filter checkboxes: Space to toggle, arrow keys in group
- Program cards: Enter/Space to navigate to detail
- Pagination: Tab to buttons, Enter to navigate
- Form: Tab through fields, Enter on submit button
- Modal: Trap focus, Escape to close, Tab/Shift+Tab within modal
- Carousel: Arrow keys to navigate slides
- Accordion: Enter/Space to toggle, Arrow Up/Down between items
- 360° tour: Arrow keys to rotate (when focused)
- Comparison table: Arrow keys to navigate cells
- Skip to content: First focusable element on page

### Screen Reader Considerations

- Program cards: `aria-label="Program: {{name}}, {{duration}}, {{price}}"`
- Loading states: `aria-busy="true"` on container, announce "Loading..." via `aria-live="polite"`
- Error states: Announce "Error: {{message}}" via `aria-live="assertive"`
- Progress stepper: Announce "Step {{n}} of 6: {{name}}" on step change
- File upload: Announce progress percentage updates
- Status changes: Announce new status via `aria-live="polite"` region
- Toast notifications: `role="status"` + `aria-live="polite"`
- Confetti animation: `aria-hidden="true"` on canvas, announce "Congratulations!"
- Auto-save indicator: Announce "Application saved" via `aria-live="polite"`

### Focus Management

- Route changes: Focus heading at top of main content area
- Modal opens: Focus first focusable element or close button
- Modal closes: Return focus to triggering element
- Form step changes: Focus step heading or first field
- Error summary: Focus the error summary container
- Pagination: Focus first card after page change
- Filter applied: Focus first result card
- File upload complete: Focus the uploaded file entry

---

## 15. Error & Edge Case Catalog

| #   | Scenario                               | System Behavior                                               | User Message                                                                                      | Recovery Action                                 |
| --- | -------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| E1  | API returns 500 on catalog load        | Show error state with retry button                            | "Something went wrong loading programs. Please try again."                                        | Retry button → re-fetches API                   |
| E2  | Network offline                        | Detect via navigator.onLine, show cached content if available | "You're offline. Showing cached information."                                                     | Auto-retry when back online                     |
| E3  | Session token expired                  | 401 on API call → redirect to login with redirect param       | —                                                                                                 | Redirect to /auth/login?redirect={originalPath} |
| E4  | Form auto-save fails (network)         | Local save to localStorage, retry queue                       | "Progress not saved. Will retry automatically."                                                   | Retry every 30s via background sync             |
| E5  | File upload exceeds size limit         | Reject before upload                                          | "File is too large. Maximum size is 10MB."                                                        | Show accepted size limit next to upload button  |
| E6  | File upload wrong type                 | Frontend validation + backend validation                      | "Accepted formats: PDF, DOC, DOCX, JPG, PNG."                                                     | File input reset, user selects new file         |
| E7  | Duplicate email registration           | Check on blur + server check on submit                        | "An account with this email already exists. [Login]"                                              | Link to login page, prefill email               |
| E8  | Application submission after deadline  | Server rejects submission                                     | "Applications for this term closed on {{date}}. [Browse future terms]"                            | Show alternative terms                          |
| E9  | Program full during submission         | Server checks capacity                                        | "This program is currently full. [Join waitlist] [Browse programs]"                               | Waitlist signup or browse alternatives          |
| E10 | Application not found (bad ID)         | 404 on status page                                            | "Application not found. Please check your reference number."                                      | Link to support or search by email              |
| E11 | Video tour WebGL not supported         | Feature detection → fallback to gallery                       | "Your browser doesn't support the 360° viewer. View our photo gallery."                           | Show photo gallery with navigation              |
| E12 | Slow network (3G)                      | Detect via navigator.connection                               | (Implicit) Show persistent loading skeletons                                                      | Progressive content loading                     |
| E13 | Concurrent save conflict               | Last write wins, show warning                                 | "Someone may have edited this form elsewhere. Latest version loaded."                             | Refresh with server data                        |
| E14 | Invalid URL params for filters         | Ignore invalid params, load defaults                          | (Silent) — show valid results                                                                     | N/A                                             |
| E15 | OAuth provider failure                 | Catch auth code error                                         | "Unable to sign in with {{provider}}. Please try again or use email."                             | Retry or switch to email login                  |
| E16 | Recommender email bounces              | System detects bounce                                         | (Notification to applicant) "We couldn't reach {{name}} at {{email}}. Please update their email." | Edit recommender email in application           |
| E17 | Scholarship estimate incomplete fields | Partial results with disclaimer                               | "Estimate is based on limited information. Add more fields for accuracy."                         | N/A — partial results shown                     |
| E18 | Application withdrawal confirm         | Modal with reason input                                       | "Are you sure? This cannot be undone. Optionally tell us why:"                                    | Confirm withdraws, cancel returns               |
| E19 | 360° image fails to load               | Timeout on image load → fallback                              | "This scene couldn't load. [Try again] [Skip to next]"                                            | Retry individual scene                          |
| E20 | Race condition: double submit          | Disable submit button immediately, idempotent backend         | "Application already submitted. View status."                                                     | Redirect to status page                         |

---

_End of Prospective Student Actor Plan — 01_
