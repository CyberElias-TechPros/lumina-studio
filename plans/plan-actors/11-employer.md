# Actor: Employer

## 1. Identity & Role Definition

- **ID:** `actor:employer`
- **Display Name:** Employer
- **Description:** Company representative who hires CEA students and graduates for internships, apprenticeships, and full-time roles. Manages job postings, talent discovery, candidate pipelines, interviews, feedback, and employer brand presence on the CEA platform.
- **System Persona:** Recruiter / HR professional / Hiring manager. Goal-oriented, efficiency-focused. Wants fast access to qualified candidates and streamlined hiring workflows. Values data-driven hiring decisions.
- **Authentication Level:** Tier 2 — TOTP MFA. Enterprise SSO (SAML/OIDC) for partner employers.
- **Session Timeout:** 30 minutes.
- **Default Landing:** `/employer/hub`

## 2. Primary Goals & Success KPIs

| Goal                                  | KPI                          | Target     | Measurement |
| ------------------------------------- | ---------------------------- | ---------- | ----------- |
| Find qualified candidates quickly     | Time-to-first-offer          | <14 days   | ATS         |
| Efficient hiring pipeline             | Candidate-to-hire conversion | >15%       | ATS         |
| Fill internship/graduate positions    | Positions filled rate        | >80%       | ATS         |
| Employer brand visibility on platform | Profile views                | >500/month | Analytics   |
| Quality of candidate matches          | Retention after 6 months     | >85%       | Feedback    |
| Streamlined interview scheduling      | Interview scheduling time    | <48h       | Calendar    |
| Campus partnership satisfaction       | Repeat hiring rate           | >60%       | CRM         |

## 3. Complete Screen Inventory

### 3.1 Employer Hub — `/employer/hub`

**Wireframe:** Top dashboard bar: 4 KPI cards — Active Job Postings, Candidates in Pipeline, Interviews Scheduled This Week, Hires This Month. Below: three-column layout — Left (activity feed), Center (top candidate matches via AI), Right (quick stats + upcoming interviews mini-list + recent messages).

**UI Fields / Components:**

- `EmployerStatCard` × 4 — icon, count, label, trend, link
- `ActivityFeed` — events: new candidate match, application received, interview completed, feedback due, hire made
- `AICandidateMatches` — carousel of top 5 candidate cards matched by AI (photo, name, skill match %, programme, graduation date, [View Profile] [Shortlist] [Message])
- `UpcomingInterviewsList` — next 5 interviews: candidate name, time, type (video/in-person), [Join] link
- `RecentMessages` — last 3 conversation previews with candidates
- `QuickActions` — [Post a Job] [Search Talent] [View Company Profile] [Schedule Interview] [Give Feedback]
- `EmployerBrandCard` — your company page stats: views, applications generated, hires from CEA

**States:**

- **Loading:** Skeleton grid
- **Empty (new employer):** "Welcome to CEA Employer Hub! Post your first job to start connecting with top talent."
- **Empty (no matches):** "No matching candidates yet. Adjust your job requirements or post new openings."
- **Error:** "Hub data unavailable. [Retry]"

### 3.2 Job Management — `/employer/jobs`

**Wireframe:** Top toolbar: [New Job Posting], search bar, filter chips (status: Draft, Published, Paused, Closed, Filled). Tab toggle: [Active] [Drafts] [Archived]. Table view: Job Title | Department | Type | Location | Applicants | Status | Posted Date | Actions. Click row → JobDetail.

**Job Detail View:**

- Header: title, status badge, reference number
- Job details: department, employment type (full-time/part-time/internship/apprenticeship/contract), location (remote/onsite/hybrid), salary range, currency, experience level, posted date, closing date
- Description (rich text): role overview, responsibilities, requirements, benefits, about CEA
- Skills & qualifications: skill tags (from CEA taxonomy), minimum GPA, education level, certifications
- Applications section: list of applicants with status, match score, date applied, [View] [Shortlist] [Reject] [Message]
- [Edit] [Pause] [Close] [Duplicate] [View Public Page] buttons

**New/Edit Job Form:**

- Title (required)
- Department (dropdown)
- Employment type (required)
- Location type + address if onsite
- Salary min/max + currency
- Experience level: entry / intermediate / senior
- Description (rich text, required)
- Required skills (multi-select from CEA taxonomy)
- Preferred skills (multi-select)
- Minimum GPA (optional)
- Education requirement (dropdown)
- Closing date (required)
- Auto-match candidates toggle (on by default)
- [Save Draft] [Publish] [Cancel]

**States:**

- **Loading:** Skeleton table
- **Empty:** "No job postings yet. Click 'New Job Posting' to create your first opening."
- **Empty (filtered):** "No jobs match your filters. [Clear Filters]"
- **Error:** "Job management unavailable. [Retry]"

### 3.3 Talent Search — `/employer/talent`

**Wireframe:** Full search page with left filter panel and right results grid/list. Filter panel: Skills (multi-select), Programmes, Graduation Year Range, GPA Range, Experience Level, Location, Availability (immediate/1 month/3 months/upon graduation), Certifications, Languages. Results: candidate cards with photo, name, programme, graduation date, GPA, skill tags with proficiency levels, match score badge, [View Profile] [Shortlist] [Message] buttons.

**Candidate Profile Modal (full):**

- Header: photo, name, headline, location
- Contact section (if visible): email, phone, portfolio URL, LinkedIn
- Education: programme name, institution (CEA), graduation date, GPA, honours
- Skills: categorized (technical, soft, language) with self-rated proficiency (1-5) and endorsements count
- Experience: work history table (company, role, duration, description)
- Projects: name, description, technologies used, link
- Certifications: name, issuer, date
- Resume/CV: [View] [Download]
- Portfolio: links to GitHub, Dribbble, personal site
- Cover letter (if applying to specific job)
- Actions: [Shortlist] [Message] [Schedule Interview] [Add to Pipeline] [Share with Team]

**Saved Searches:**

- Save current filters as named search
- Toggle email alerts: "Notify me when new candidates match this search"

**States:**

- **Loading:** Skeleton card grid
- **Empty:** "No candidates match your search criteria. Try broadening your filters."
- **Empty (no saved searches):** "Save your searches to quickly access them later."
- **Error:** "Talent search unavailable. [Retry]"

### 3.4 Candidate Pipeline — `/employer/pipeline/[jobId]`

**Wireframe:** Kanban-style pipeline: columns — New Applicants → Screened → Shortlisted → Interview Scheduled → Interviewed → Offer Sent → Hired → Rejected. Each card: candidate name, photo, match score, applied date, current stage duration, tags (fast-track, internal referral, etc.). Drag & drop to move stage. Column header shows count.

**Pipeline Detail (click candidate card):**

- Candidate info card (mini profile)
- Application details: cover letter, answers to screening questions, attachments
- Interview history: round, date, interviewer, rating, feedback (collapsible)
- Actions: [Move to Stage] [Schedule Interview] [Send Message] [Give Feedback] [Reject]
- Notes (private to employer team)

**Pipeline Actions:**

- Bulk actions: select multiple → [Shortlist] [Reject] [Move to Stage] [Export to CSV]
- Stage time tracking: average time per stage shown in column header
- Drop zone highlight on drag

**States:**

- **Loading:** Skeleton kanban columns
- **Empty:** "No applicants yet. Share your job posting to attract candidates."
- **Empty (no candidates in stage):** Column shows "Drop candidates here"
- **Error:** "Pipeline unavailable. [Retry]"

### 3.5 Interview Scheduler — `/employer/interviews`

**Wireframe:** Monthly/weekly/daily calendar view. Left: calendar with interview slots highlighted. Right: upcoming interviews list. Top: [Schedule Interview] button + filters (date range, interviewer, status).

**Schedule Interview Modal:**

- Select candidate (from pipeline)
- Select job posting
- Interview type: Phone, Video (Zoom/Google Meet/Teams), In-person, Technical Assessment, Panel
- Duration: 15/30/45/60/90 minutes
- Proposed times: employer selects 3 time slots
- Interviewers: add CEA team members (internal) or external interviewers (email)
- Location/Room or Video link
- Instructions for candidate (text)
- [Send Invitation] — candidate receives email to confirm one of the proposed slots

**Interview Detail (click interview):**

- Candidate, job, type, date/time, duration
- Interviewer(s) list
- Location / video link
- Status: Awaiting Confirmation, Confirmed, Completed, Cancelled, No Show
- Feedback form (completed after interview)
- Reschedule / Cancel buttons

**Interview Feedback Form:**

- Rating: 1-5 overall score
- Skill assessments: technical skills, communication, problem-solving, cultural fit (each 1-5)
- Strengths (text)
- Areas for improvement (text)
- Hiring recommendation: Strong Yes / Yes / Maybe / No
- [Submit Feedback]

**States:**

- **Loading:** Skeleton calendar
- **Empty:** "No interviews scheduled. Shortlist candidates to start scheduling interviews."
- **Error:** "Calendar unavailable. [Retry]"

### 3.6 Feedback & Reviews — `/employer/feedback`

**Wireframe:** Two sections: [Pending Feedback] — interviews awaiting feedback, [Feedback History] — all submitted feedback. Each card: candidate name, job title, interview date, type, feedback status (pending/submitted), rating summary, due date indicator.

**Feedback Form (full page or modal):**

- Candidate info header
- Interview details (read-only)
- Rating scale (1-5) for: overall, technical competence, communication, teamwork, problem-solving, leadership potential, cultural fit
- Open-ended: What went well? What could be improved? Would you recommend hiring? Notes for CEA (anonymized for candidate development)
- [Submit] [Save Draft] [Cancel]

**States:**

- **Loading:** Skeleton
- **Empty (no pending):** "All feedback submitted! You're all caught up."
- **Empty (no history):** "No feedback history yet. Submit feedback after interviews."
- **Error:** "Feedback service unavailable. [Retry]"

### 3.7 Analytics — `/employer/analytics`

**Wireframe:** Tabbed view: [Hiring Funnel] [Source Analysis] [Time Metrics] [Diversity] [Comparative Benchmarks].

**Hiring Funnel:**

- Funnel chart: Impressions → Applications → Screened → Interviewed → Offered → Hired
- Conversion rates between each stage
- Historical trend (line chart, 12m)

**Source Analysis:**

- Bar chart: candidates by source (CEA direct, job board, referral, career fair, social media, etc.)
- Table: Source | Applications | Shortlisted | Hired | Conversion Rate

**Time Metrics:**

- Time-to-hire trend line chart (avg days by month)
- Time-in-stage breakdown (stacked bar)
- Interview scheduling time trend

**Diversity:**

- Demographics of pipeline: gender, ethnicity (where available), programme type
- Comparison to market benchmarks
- Diversity score over time

**Benchmarks:**

- Your metrics vs. other employers on CEA platform
- Industry averages (anonymized)
- Best-in-class comparisons

**States:**

- **Loading:** Skeleton charts
- **Empty:** "Not enough data yet. Post more jobs and hire candidates to generate analytics."
- **Error:** "Analytics unavailable. [Retry]"

### 3.8 Brand Page — `/employer/brand`

**Wireframe:** Preview of your public employer brand page. Edit mode toggle. Sections: Company Logo, Banner Image, About Us (rich text), Culture & Values, Benefits, Office Photos (gallery), Video (embed), Jobs at Your Company (auto-populated from job postings), Student Reviews (read-only — from candidates), Contact Info.

**Edit Brand Page:**

- Logo upload (square, min 400×400)
- Banner image upload (1200×400, 16:9)
- Company name, tagline (max 100 chars)
- About us (rich text, max 5000 chars)
- Industry, company size, location, website
- Social links: LinkedIn, Twitter, Facebook, Instagram, Glassdoor
- Culture & values (rich text, max 3000 chars)
- Benefits highlights (bulleted list)
- Photo gallery (up to 10 images, drag to reorder)
- Video embed URL (YouTube/Vimeo)
- Contact for candidates: name, email, phone (optional)
- [Save] [Preview] [Publish]

**States:**

- **Loading:** Skeleton
- **Empty:** "Complete your brand page to attract more candidates."
- **Error:** "Brand page service unavailable. [Retry]"

## 4. Full Database Schema

### Table: `employers`

```sql
CREATE TABLE employers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255) NOT NULL,
  legal_name VARCHAR(500),
  industry VARCHAR(100),
  company_size VARCHAR(20) CHECK (company_size IN ('1-10','11-50','51-200','201-1000','1000+','5000+')),
  website VARCHAR(500),
  linkedin_url VARCHAR(500),
  glassdoor_url VARCHAR(500),
  twitter_url VARCHAR(500),
  facebook_url VARCHAR(500),
  instagram_url VARCHAR(500),
  logo_key VARCHAR(500),
  banner_key VARCHAR(500),
  tagline VARCHAR(200),
  about_us TEXT,
  culture_values TEXT,
  benefits TEXT,
  location_city VARCHAR(100),
  location_state VARCHAR(100),
  location_country VARCHAR(100),
  contact_name VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  is_brand_page_published BOOLEAN DEFAULT false,
  brand_page_views INT DEFAULT 0,
  total_hires INT DEFAULT 0,
  rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','inactive','suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_employers_industry (industry),
  INDEX idx_employers_status (status)
);
```

### Table: `employer_users`

```sql
CREATE TABLE employer_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL DEFAULT 'recruiter' CHECK (role IN ('admin','hiring_manager','recruiter','interviewer','viewer')),
  can_post_jobs BOOLEAN DEFAULT true,
  can_review_candidates BOOLEAN DEFAULT true,
  can_schedule_interviews BOOLEAN DEFAULT true,
  can_view_analytics BOOLEAN DEFAULT true,
  can_edit_brand BOOLEAN DEFAULT false,
  department VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(employer_id, user_id),
  INDEX idx_employer_users_employer (employer_id)
);
```

### Table: `job_postings`

```sql
CREATE TABLE job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  reference_number VARCHAR(50) NOT NULL UNIQUE,
  department VARCHAR(100),
  employment_type VARCHAR(30) NOT NULL CHECK (employment_type IN ('full_time','part_time','internship','apprenticeship','contract','temporary')),
  location_type VARCHAR(20) NOT NULL CHECK (location_type IN ('remote','onsite','hybrid')),
  location_address VARCHAR(500),
  location_city VARCHAR(100),
  location_state VARCHAR(100),
  location_country VARCHAR(100),
  salary_min DECIMAL(12,2),
  salary_max DECIMAL(12,2),
  salary_currency VARCHAR(3) DEFAULT 'USD',
  experience_level VARCHAR(30) NOT NULL CHECK (experience_level IN ('entry','intermediate','senior','lead','executive')),
  description TEXT NOT NULL,
  responsibilities TEXT,
  requirements TEXT,
  benefits_description TEXT,
  min_gpa DECIMAL(3,2) CHECK (min_gpa >= 0 AND min_gpa <= 4),
  education_requirement VARCHAR(50) CHECK (education_requirement IN ('high_school','associate','bachelor','master','phd','any')),
  closing_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','paused','closed','filled')),
  positions_count INT NOT NULL DEFAULT 1,
  positions_filled INT DEFAULT 0,
  auto_match_enabled BOOLEAN DEFAULT true,
  view_count INT DEFAULT 0,
  application_count INT DEFAULT 0,
  created_by UUID NOT NULL REFERENCES auth_users(id),
  published_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_job_postings_employer (employer_id),
  INDEX idx_job_postings_status (status),
  INDEX idx_job_postings_type (employment_type),
  INDEX idx_job_postings_created (created_at DESC)
);
```

### Table: `job_required_skills`

```sql
CREATE TABLE job_required_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skill_taxonomy(id),
  is_required BOOLEAN DEFAULT true,
  min_proficiency INT CHECK (min_proficiency >= 1 AND min_proficiency <= 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(job_id, skill_id),
  INDEX idx_job_skills_job (job_id)
);
```

### Table: `applications`

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES student_profiles(user_id),
  status VARCHAR(30) NOT NULL DEFAULT 'new' CHECK (status IN (
    'new','screened','shortlisted','interview_scheduled','interviewed',
    'offer_sent','offer_accepted','hired','rejected','withdrawn'
  )),
  match_score DECIMAL(5,2) CHECK (match_score >= 0 AND match_score <= 100),
  cover_letter TEXT,
  screening_answers JSONB,
  referral_source VARCHAR(50),
  current_stage_entered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  rejected_at TIMESTAMPTZ,
  rejection_reason TEXT,
  hired_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_applications_job (job_id),
  INDEX idx_applications_candidate (candidate_id),
  INDEX idx_applications_status (status),
  INDEX idx_applications_created (created_at DESC)
);
```

### Table: `application_stage_history`

```sql
CREATE TABLE application_stage_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  from_status VARCHAR(30),
  to_status VARCHAR(30) NOT NULL,
  changed_by UUID REFERENCES auth_users(id),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_app_stage_history_application (application_id)
);
```

### Table: `interviews`

```sql
CREATE TABLE interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id),
  job_id UUID NOT NULL REFERENCES job_postings(id),
  candidate_id UUID NOT NULL REFERENCES student_profiles(user_id),
  employer_id UUID NOT NULL REFERENCES employers(id),
  interview_type VARCHAR(30) NOT NULL CHECK (interview_type IN ('phone','video','in_person','technical','panel','assessment')),
  status VARCHAR(30) NOT NULL DEFAULT 'awaiting_confirmation' CHECK (status IN ('awaiting_confirmation','confirmed','completed','cancelled','no_show')),
  duration_minutes INT NOT NULL CHECK (duration_minutes IN (15,30,45,60,90)),
  location VARCHAR(500),
  video_link VARCHAR(500),
  instructions TEXT,
  proposed_slots JSONB,
  confirmed_slot TIMESTAMPTZ,
  interviewers JSONB NOT NULL DEFAULT '[]',
  created_by UUID NOT NULL REFERENCES auth_users(id),
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_interviews_application (application_id),
  INDEX idx_interviews_candidate (candidate_id),
  INDEX idx_interviews_employer (employer_id),
  INDEX idx_interviews_status (status),
  INDEX idx_interviews_date (confirmed_slot)
);
```

### Table: `interview_feedback`

```sql
CREATE TABLE interview_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id UUID NOT NULL REFERENCES interviews(id) ON DELETE CASCADE,
  interviewer_id UUID NOT NULL REFERENCES auth_users(id),
  overall_rating INT NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  technical_skill INT CHECK (technical_skill >= 1 AND technical_skill <= 5),
  communication INT CHECK (communication >= 1 AND communication <= 5),
  teamwork INT CHECK (teamwork >= 1 AND teamwork <= 5),
  problem_solving INT CHECK (problem_solving >= 1 AND problem_solving <= 5),
  leadership_potential INT CHECK (leadership_potential >= 1 AND leadership_potential <= 5),
  cultural_fit INT CHECK (cultural_fit >= 1 AND cultural_fit <= 5),
  strengths TEXT,
  areas_for_improvement TEXT,
  recommendation VARCHAR(20) NOT NULL CHECK (recommendation IN ('strong_yes','yes','maybe','no')),
  notes_for_cea TEXT,
  is_draft BOOLEAN DEFAULT false,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(interview_id, interviewer_id),
  INDEX idx_interview_feedback_interview (interview_id),
  INDEX idx_interview_feedback_interviewer (interviewer_id)
);
```

### Table: `employer_saved_searches`

```sql
CREATE TABLE employer_saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  filters JSONB NOT NULL,
  email_alerts_enabled BOOLEAN DEFAULT true,
  last_matched_count INT DEFAULT 0,
  last_run_at TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES auth_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_saved_searches_employer (employer_id)
);
```

### Table: `employer_shortlists`

```sql
CREATE TABLE employer_shortlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
  job_id UUID REFERENCES job_postings(id),
  name VARCHAR(255) NOT NULL,
  created_by UUID NOT NULL REFERENCES auth_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_shortlists_employer (employer_id)
);
```

### Table: `employer_shortlist_candidates`

```sql
CREATE TABLE employer_shortlist_candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shortlist_id UUID NOT NULL REFERENCES employer_shortlists(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES student_profiles(user_id),
  note TEXT,
  added_by UUID NOT NULL REFERENCES auth_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(shortlist_id, candidate_id),
  INDEX idx_shortlist_candidates_shortlist (shortlist_id)
);
```

### Table: `employer_messages`

```sql
CREATE TABLE employer_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth_users(id),
  recipient_id UUID NOT NULL REFERENCES auth_users(id),
  subject VARCHAR(500),
  content TEXT NOT NULL,
  application_id UUID REFERENCES applications(id),
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_employer_messages_employer (employer_id),
  INDEX idx_employer_messages_recipient (recipient_id),
  INDEX idx_employer_messages_created (created_at DESC)
);
```

### Table: `employer_analytics_events`

```sql
CREATE TABLE employer_analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
  event_type VARCHAR(100) NOT NULL,
  properties JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_employer_analytics_employer (employer_id),
  INDEX idx_employer_analytics_type (event_type),
  INDEX idx_employer_analytics_created (created_at DESC)
);
```

### Table: `employer_brand_gallery`

```sql
CREATE TABLE employer_brand_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
  image_key VARCHAR(500) NOT NULL,
  caption VARCHAR(255),
  sort_order INT DEFAULT 0,
  uploaded_by UUID NOT NULL REFERENCES auth_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_brand_gallery_employer (employer_id)
);
```

### Table: `candidate_endorsements`

```sql
CREATE TABLE candidate_endorsements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES skill_taxonomy(id),
  candidate_id UUID NOT NULL REFERENCES student_profiles(user_id),
  employer_id UUID NOT NULL REFERENCES employers(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(skill_id, candidate_id, employer_id)
);
```

### Table: `skill_taxonomy`

```sql
CREATE TABLE skill_taxonomy (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('technical','soft','language','domain','tool')),
  parent_id UUID REFERENCES skill_taxonomy(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(name),
  INDEX idx_skill_taxonomy_category (category)
);
```

## 5. Complete API Contract

### 5.1 Employer Hub

```
GET /api/v1/employer/hub
Auth: Employer (all roles)
Response: {
  stats: { activeJobs, candidatesInPipeline, interviewsThisWeek, hiresThisMonth };
  activityFeed: Array<{ id, type, summary, entityType, entityId, createdAt }>;
  topMatches: Array<CandidateCard>;
  upcomingInterviews: Array<{ id, candidateName, time, type, joinLink }>;
  recentMessages: Array<{ id, senderName, preview, createdAt }>;
  brandStats: { profileViews, totalApplications, totalHires };
}
```

### 5.2 Jobs

```
GET /api/v1/employer/jobs
Query: status?, type?, department?, page, limit, sort_by, search
Auth: Employer (admin, hiring_manager, recruiter)
Response: { data: Array<{
  id, title, referenceNumber, department, employmentType, locationType,
  salaryMin, salaryMax, currency, status, applicationCount, viewCount,
  positionsCount, positionsFilled, closingDate, publishedAt, createdAt
}>, pagination }

GET /api/v1/employer/jobs/:id
Response: Full job with required skills, applications summary

POST /api/v1/employer/jobs
Body: JobPostingCreate (full type)
Response: { id, referenceNumber, createdAt }

PUT /api/v1/employer/jobs/:id
Body: Partial<JobPostingUpdate>
Response: { id, updatedAt }

PATCH /api/v1/employer/jobs/:id/status
Body: { status: 'publish'|'pause'|'close'|'fill' }
Response: { status, updatedAt }

DELETE /api/v1/employer/jobs/:id
Response: { success: true } (soft delete, status = 'closed')

GET /api/v1/employer/jobs/:id/applications
Query: status?, sort_by, page, limit
Response: { data: Array<{
  id, candidate: { id, name, photoUrl, programme, graduationDate, gpa },
  status, matchScore, coverLetterExcerpt, appliedAt, currentStageDuration
}>, pagination }
```

### 5.3 Talent Search

```
GET /api/v1/employer/talent/search
Query: skills (csv), programmes (csv), grad_year_from, grad_year_to, gpa_min, gpa_max,
  experience_level, location, availability, certifications (csv), languages (csv),
  sort_by (match|graduation|gpa|name), order, page, limit
Auth: Employer (all roles)
Response: { data: Array<CandidateCard>, pagination, totalCount, searchId (for analytics) }

GET /api/v1/employer/talent/candidates/:id
Auth: Employer (all roles)
Response: Full candidate profile with education, experience, skills, projects, certifications

POST /api/v1/employer/talent/saved-searches
Body: { name, filters, emailAlertsEnabled }
Response: { id, createdAt }

GET /api/v1/employer/talent/saved-searches
Response: Array<{ id, name, filters, lastMatchedCount, lastRunAt, emailAlertsEnabled }>

DELETE /api/v1/employer/talent/saved-searches/:id
Response: { success: true }
```

### 5.4 Pipeline

```
GET /api/v1/employer/pipeline/:jobId
Auth: Employer (admin, hiring_manager, recruiter)
Response: {
  job: { id, title, referenceNumber };
  stages: {
    new: Array<CandidateCard>;
    screened: Array<CandidateCard>;
    shortlisted: Array<CandidateCard>;
    interview_scheduled: Array<CandidateCard>;
    interviewed: Array<CandidateCard>;
    offer_sent: Array<CandidateCard>;
    hired: Array<CandidateCard>;
    rejected: Array<CandidateCard>;
  };
  stageTiming: { new: { avgDays: number }, screened: { avgDays: number }, ... };
}

PUT /api/v1/employer/pipeline/:jobId/candidates/:applicationId/stage
Body: { status: string, note?: string }
Response: { success: true, newStatus: string }

POST /api/v1/employer/pipeline/:jobId/candidates/:applicationId/reject
Body: { reason: string, note?: string }
Response: { success: true }

POST /api/v1/employer/pipeline/:jobId/candidates/:applicationId/offer
Body: { offerDetails?: string }
Response: { success: true, status: 'offer_sent' }
```

### 5.5 Interviews

```
GET /api/v1/employer/interviews
Query: status?, from, to, page, limit
Auth: Employer (admin, hiring_manager, recruiter, interviewer)
Response: { data: Array<{
  id, candidate: { id, name, photoUrl }, job: { id, title },
  interviewType, status, confirmedSlot, durationMinutes,
  interviewers: Array<{ id, name }>, location, videoLink,
  feedbackStatus: 'pending' | 'submitted'
}>, pagination }

POST /api/v1/employer/interviews
Body: { applicationId, jobId, candidateId, interviewType, durationMinutes,
  proposedSlots: string[], interviewers: Array<{ id, name, email }>,
  location?, videoLink?, instructions? }
Response: { id, status: 'awaiting_confirmation', createdAt }

PUT /api/v1/employer/interviews/:id/confirm
Body: { confirmedSlot: string }
Response: { status: 'confirmed' }

PUT /api/v1/employer/interviews/:id/cancel
Body: { reason: string }
Response: { status: 'cancelled' }

PUT /api/v1/employer/interviews/:id/complete
Body: {}
Response: { status: 'completed', completedAt }

POST /api/v1/employer/interviews/:id/feedback
Body: InterviewFeedbackCreate
Response: { id, submittedAt }
```

### 5.6 Feedback

```
GET /api/v1/employer/feedback/pending
Auth: Employer (admin, hiring_manager, recruiter, interviewer)
Response: Array<{ interviewId, candidateName, jobTitle, interviewDate, type, status, dueDate }>

GET /api/v1/employer/feedback/history
Query: page, limit, from, to
Response: { data: Array<{ id, interviewId, candidateName, jobTitle, overallRating, recommendation, submittedAt }>, pagination }

GET /api/v1/employer/feedback/:id
Response: Full feedback form

PUT /api/v1/employer/feedback/:id
Body: Partial<InterviewFeedbackUpdate>
Response: { id, updatedAt }
```

### 5.7 Analytics

```
GET /api/v1/employer/analytics/funnel
Query: from, to
Auth: Employer (admin, can_view_analytics)
Response: { stages: Array<{ name, count, conversionRate }>, trend: Array<{ month, stage, count }> }

GET /api/v1/employer/analytics/sources
Query: from, to
Response: Array<{ source, applications, shortlisted, hired, conversionRate }>

GET /api/v1/employer/analytics/time-metrics
Query: from, to
Response: { timeToHire: Array<{ month, avgDays }>, timeInStage: Array<{ stage, avgDays }>, interviewSchedulingTime: Array<{ month, avgHours }> }

GET /api/v1/employer/analytics/diversity
Query: from, to
Response: { gender: Array<{ label, pct }>, ethnicity: Array<{ label, pct }>, programme: Array<{ label, pct }>, score: number }

GET /api/v1/employer/analytics/benchmarks
Query: metric
Response: { yourValue, industryAvg, bestInClass, percentile }
```

### 5.8 Brand Page

```
GET /api/v1/employer/brand
Auth: Employer (all roles)
Response: Full brand page data

PUT /api/v1/employer/brand
Body: BrandPageUpdate
Response: { id, updatedAt }

POST /api/v1/employer/brand/gallery
Body: multipart/form-data with image
Response: { id, imageUrl }

DELETE /api/v1/employer/brand/gallery/:id
Response: { success: true }

POST /api/v1/employer/brand/publish
Response: { isBrandPagePublished: true, publishedAt }

GET /api/v1/employer/brand/preview
Response: Public-facing HTML render of brand page
```

### 5.9 Shortlists & Messages

```
GET /api/v1/employer/shortlists
Query: job_id?
Response: Array<{ id, name, jobId, jobTitle, candidateCount, createdAt }>

POST /api/v1/employer/shortlists
Body: { name, jobId? }
Response: { id, createdAt }

POST /api/v1/employer/shortlists/:shortlistId/candidates
Body: { candidateId, note? }
Response: { id, createdAt }

DELETE /api/v1/employer/shortlists/:shortlistId/candidates/:candidateId
Response: { success: true }

GET /api/v1/employer/messages
Query: page, limit, unread_only?
Response: { data: Array<{ id, sender: { id, name, photoUrl }, subject, content, createdAt, isRead, applicationId }>, pagination }

POST /api/v1/employer/messages
Body: { recipientId, subject?, content, applicationId? }
Response: { id, createdAt }

PUT /api/v1/employer/messages/:id/read
Response: { isRead: true, readAt }
```

## 6. Component Tree

```
EmployerShell
 ├── EmployerSidebar
 │   ├── SidebarLogo
 │   ├── SidebarNav (Hub, Jobs, Talent, Pipeline, Interviews, Feedback, Analytics, Brand)
 │   └── SidebarEmployerInfo (company name, logo mini, role badge)
 ├── EmployerTopbar
 │   ├── SearchBar (global: candidates, jobs)
 │   ├── NotificationBell
 │   └── UserMenu (profile, company settings, logout)
 └── MainContent

Pages:
 ├── EmployerHubPage
 │   ├── StatCardRow
 │   ├── ActivityFeed
 │   ├── TopCandidatesCarousel
 │   │   └── CandidateMatchCard (photo, name, match %, programme, actions)
 │   ├── UpcomingInterviewsList
 │   ├── RecentMessagesWidget
 │   └── QuickActionGrid

 ├── JobListPage
 │   ├── JobToolbar (New Job, Search, Filters)
 │   ├── JobTabs (Active, Drafts, Archived)
 │   ├── JobTable (sortable rows, status badges, actions dropdown)
 │   │   └── JobRow (title, type, applicants, status, date, [Edit] [View] [More])
 │   └── JobDetailPage
 │       ├── JobHeader (title, ref, status badge, action buttons)
 │       ├── JobDetailsCard (department, type, location, salary, dates)
 │       ├── JobDescriptionSection (rich text rendered)
 │       ├── SkillsSection (required/preferred tags)
 │       ├── ApplicantsSection
 │       │   └── ApplicantRow (photo, name, score, status, date, actions)
 │       └── JobFormModal (create/edit — full form with sections)

 ├── TalentSearchPage
 │   ├── SearchFiltersPanel
 │   │   ├── SkillsFilter (multi-select searchable)
 │   │   ├── ProgrammeFilter
 │   │   ├── GraduationYearRange
 │   │   ├── GPARange
 │   │   ├── ExperienceLevelFilter
 │   │   ├── LocationFilter
 │   │   ├── AvailabilityFilter
 │   │   ├── CertificationFilter
 │   │   └── LanguageFilter
 │   ├── SearchResultsToolbar (result count, sort, view toggle, save search)
 │   ├── SearchResultsGrid / List
 │   │   └── CandidateCard (photo, name, programme, gpa, skills, match score, actions)
 │   ├── CandidateProfileModal
 │   │   ├── ProfileHeader (photo, name, headline, location, contact)
 │   │   ├── EducationSection
 │   │   ├── SkillsSection (with proficiency bars, endorse button)
 │   │   ├── ExperienceSection (timeline)
 │   │   ├── ProjectsSection
 │   │   ├── CertificationsSection
 │   │   ├── ResumeViewer
 │   │   └── ProfileActions (Shortlist, Message, Schedule Interview, Share)
 │   └── SaveSearchModal (name, email alerts toggle)

 ├── PipelinePage
 │   ├── PipelineHeader (job title, ref number, stage timing summary)
 │   ├── KanbanBoard
 │   │   ├── KanbanColumn × 8 (header with count + time, drop zone)
 │   │   │   └── PipelineCard (photo, name, score, duration, tags)
 │   │   │       └── CardActions (drag handle, quick actions dropdown)
 │   ├── PipelineDetailPanel (slide-over on card click)
 │   │   ├── CandidateMiniProfile
 │   │   ├── ApplicationDetail (cover letter, questions, attachments)
 │   │   ├── InterviewHistory
 │   │   ├── PrivateNotes
 │   │   └── StageActions (Move to, Schedule Interview, Message, Reject)
 │   └── BulkActionBar (select mode: count badge, Move, Reject, Export)

 ├── InterviewPage
 │   ├── InterviewCalendar (month/week/day views)
 │   ├── UpcomingList (scrollable list)
 │   ├── ScheduleInterviewModal
 │   │   ├── CandidateSelect
 │   │   ├── JobSelect
 │   │   ├── InterviewTypeSelect
 │   │   ├── DurationSelect
 │   │   ├── ProposedTimeSlots (3x date-time pickers)
 │   │   ├── InterviewersAdd (search + add)
 │   │   ├── LocationOrLink
 │   │   └── InstructionsField
 │   ├── InterviewDetailModal
 │   │   ├── InterviewHeader (candidate, job, type, status badge)
 │   │   ├── DateTimeDisplay
 │   │   ├── InterviewerList
 │   │   ├── Location/Link
 │   │   ├── FeedbackSummary (if completed)
 │   │   └── Actions (Confirm, Reschedule, Cancel, Complete, Add Feedback)

 ├── FeedbackPage
 │   ├── PendingFeedbackTab
 │   │   └── FeedbackCard (candidate, job, date, rating placeholder, due badge, [Submit])
 │   ├── FeedbackHistoryTab
 │   │   └── FeedbackCard (candidate, job, rating stars, recommendation, date)
 │   └── FeedbackFormModal
 │       ├── CandidateInfo (read-only)
 │       ├── InterviewInfo (read-only)
 │       ├── RatingFields × 7 (star click or numeric)
 │       ├── StrengthsField (rich text)
 │       ├── ImprovementField (rich text)
 │       ├── RecommendationSelect
 │       ├── NotesForCEA (rich text, optional)
 │       └── Actions (Save Draft, Submit, Cancel)

 ├── AnalyticsPage
 │   ├── AnalyticsTabs (Funnel, Sources, Time, Diversity, Benchmarks)
 │   │   ├── FunnelChart
 │   │   ├── ConversionRateCards
 │   │   ├── FunnelTrendChart
 │   │   ├── SourceBarChart
 │   │   ├── SourceTable
 │   │   ├── TimeToHireTrendLine
 │   │   ├── TimeInStageStackedBar
 │   │   ├── DiversityPieCharts
 │   │   ├── DiversityScoreGauge
 │   │   └── BenchmarkComparisonTable
 │   └── DateRangeSelector

 └── BrandPage
     ├── BrandPreviewPane (public view iframe)
     ├── BrandEditForm
     │   ├── LogoUploader (drag-drop, crop)
     │   ├── BannerUploader
     │   ├── BasicInfoFields (name, tagline, industry, size, location)
     │   ├── SocialLinksFields
     │   ├── RichTextEditors (about, culture, benefits)
     │   ├── PhotoGalleryManager (upload, caption, reorder, delete)
     │   ├── VideoEmbedField
     │   └── ContactFields
     ├── BrandPagePreview (toggle)
     └── PublishButton

Shared Components:
 ├── CandidateCard (photo, name, programme, skills, match badge, actions)
 ├── StatusBadge
 ├── Modal
 ├── ConfirmDialog
 ├── Toast
 ├── Skeleton
 ├── EmptyState
 ├── ErrorBoundary
 ├── DataTable
 ├── Pagination
 ├── SearchBar (with suggestions)
 ├── FileUpload
 ├── RichTextEditor
 ├── Avatar
 ├── TagInput (skill tags)
 ├── StarRating
 ├── DatePicker
 └── KanbanBoard (generic with drag-drop)
```

## 7. Exhaustive User Journeys

### Journey 1: Employer Signs Up & Sets Up Company Profile

1. Employer navigates to `app.cea.io/employer/register`
2. Fills: full name, work email, password, company name, industry, company size
3. Clicks [Create Account] → `POST /api/v1/auth/register` → verification email sent
4. Verifies email → sets up MFA (TOTP)
5. Redirected to onboarding wizard:
   - Step 1: Company details (legal name, website, location, tax ID)
   - Step 2: Team members (invite colleagues by email + role: recruiter, hiring manager, interviewer)
   - Step 3: Brand page setup (optional — upload logo, tagline, about us)
   - Step 4: First job posting (optional — guided form)
6. Onboarding complete → lands on `/employer/hub`
7. **Branch: Already registered** → login instead
8. **Branch: Verification link expired** → request new link

### Journey 2: Employer Posts a Job

1. On Employer Hub, clicks [Post a Job]
2. Job form loads:
   - Title: "Software Engineering Intern — Summer 2026"
   - Department: "Engineering"
   - Employment Type: "Internship"
   - Location: "Remote (US)"
   - Salary: $30/hr - $40/hr, USD
   - Experience Level: "Entry"
   - Description: writes rich text about role, responsibilities, who they're looking for
   - Skills: starts typing "Python" → auto-completes from taxonomy → selects "Python (Advanced)", "React (Intermediate)", "AWS (Intermediate)", "Docker (Beginner)"
   - Min GPA: 3.0
   - Education: "Bachelor" (in progress)
   - Closing Date: Sep 15, 2026
   - Auto-match candidates: ON
3. Clicks [Save Draft] → job saved with status "draft"
4. Later returns → clicks [Edit] → reviews → clicks [Publish]
5. Job is published → visible to candidates on platform
6. Email sent to matched candidates: "New internship at {{company}}: {{title}}"
7. Employer sees view count and application count start populating on job detail

### Journey 3: Employer Searches & Shortlists Candidates

1. Employer navigates to `/employer/talent`
2. Filters:
   - Skills: Python, React, AWS
   - Programme: "Computer Science", "Software Engineering"
   - Graduation Year: 2026-2027
   - GPA: Min 3.0
   - Availability: "Immediate", "Upon Graduation"
3. Clicks [Search] → results load with 23 candidates
4. Sorts by "Match Score" descending
5. Scans cards → clicks candidate card → CandidateProfileModal opens
6. Reviews:
   - Education: BSc Computer Science, GPA 3.7, graduating June 2026
   - Skills: Python 5/5, React 4/5, AWS 3/5, Docker 3/5, TypeScript 4/5
   - Experience: 2 previous internships, 1 project featured
   - Portfolio: GitHub with 15 repos, personal website
   - Resume: [View] — scans quickly
7. Clicks [Shortlist] → select "Summer 2026 Interns" shortlist (or create new)
8. Then clicks [Message] → sends: "Hi Alex, we were impressed by your profile. Would you be interested in our Software Engineering Internship?" — message sent via platform
9. Saves search: "Python + React Interns 2026" with email alerts ON
10. Future: when new matching candidates join platform, employer receives email notification

### Journey 4: Employer Manages Pipeline & Schedules Interview

1. New application comes in → employer sees notification
2. Navigates to `/employer/pipeline/[jobId]` → sees candidate in "New" column
3. Drags candidate card from "New" to "Screened"
4. Click candidate card → slide-out panel opens → reviews cover letter
5. Clicks [Move to Shortlisted] → adds note: "Strong candidate, good communication"
6. Clicks [Schedule Interview] → form:
   - Interview Type: "Video"
   - Duration: "45 min"
   - Proposed times: [Jun 5, 10:00-10:45], [Jun 6, 14:00-14:45], [Jun 7, 09:00-09:45]
   - Interviewers: adds "Sarah (Tech Lead)" from team
   - Video link: auto-generates Zoom link via integration
   - Instructions: "Please have a project demo ready (5 min). Technical questions to follow."
7. Clicks [Send Invitation] → candidate receives email with 3 time slots to pick from
8. Candidate confirms Jun 5, 10:00 AM → interview status → "Confirmed"
9. Interview appears on calendar and upcoming list
10. **Branch: Candidate doesn't respond in 48h** → reminder sent automatically
11. **Branch: Candidate declines** → employer notified → can suggest new slots

### Journey 5: Employer Conducts Interview & Submits Feedback

1. Interview time arrives → employer clicks [Join] from interview detail → Zoom opens
2. After interview, employer navigates to `/employer/feedback`
3. Sees interview under "Pending Feedback" with due date indicator (due in 24h)
4. Clicks [Submit Feedback] → FeedbackFormModal:
   - Overall: 4/5
   - Technical Skills: 4/5
   - Communication: 5/5
   - Teamwork: 4/5
   - Problem Solving: 4/5
   - Cultural Fit: 5/5
   - Strengths: "Strong problem-solving approach, good communication, asked thoughtful questions"
   - Areas for improvement: "Could deepen AWS knowledge, recommended relevant courses"
   - Recommendation: "Yes"
   - Notes for CEA: "Great candidate, would be excellent fit for our team. Keep up the good training!"
5. Clicks [Submit] → feedback saved → interview status → "Completed"
6. Application moves to "Interviewed" stage in pipeline
7. **Branch: Employer wants to extend offer** → clicks [Send Offer] on candidate → form: "Enter offer details" → offer sent to candidate
8. Candidate accepts → status → "Hired" → position_filled incremented

### Journey 6: Employer Reviews Analytics

1. Employer navigates to `/employer/analytics`
2. Sees hiring funnel:
   - 450 impressions → 120 applications (26.7% conversion)
   - 120 → 80 screened (66.7%)
   - 80 → 45 shortlisted (56.3%)
   - 45 → 30 interviewed (66.7%)
   - 30 → 12 offers sent (40%)
   - 12 → 8 hired (66.7%)
   - Overall: 8/450 = 1.8% impression-to-hire
3. Compares to industry benchmarks → sees they're above average in screening but below in offer acceptance
4. Checks time metrics: avg time-to-hire = 18 days (vs industry avg 22 days)
5. Reviews diversity metrics: pipeline is 40% female, 35% underrepresented minorities
6. Shares analytics with team via [Export] → PDF report generated and emailed

### Journey 7: Employer Optimises Brand Page

1. Employer navigates to `/employer/brand`
2. Sees current page in preview mode → "Your page is not published yet"
3. Clicks [Edit] → fills:
   - Tagline: "Building the future of fintech"
   - About: rich text describing mission, team, tech stack, impact
   - Culture: "Remote-first, async communication, 4-day work week"
   - Benefits: "Health insurance, unlimited PTO, $5K learning budget, equity"
   - Uploads 6 office photos with captions
   - Embeds company culture video from YouTube
   - Sets contact: "talent@company.com"
4. Clicks [Preview] → sees how page looks to candidates
5. Clicks [Publish] → brand page live at `app.cea.io/employers/[company-name]`
6. Brand page starts accumulating views → shown on the Employer Hub stat card

## 8. Business Rules Engine

### Rule Set 1: Job Postings

- **R1.1:** Job postings auto-close after `closing_date` passes
- **R1.2:** Filled positions (positions_filled >= positions_count) auto-close
- **R1.3:** Jobs can be paused (hidden from candidates) and resumed
- **R1.4:** Auto-match candidates feature uses weighted skill matching + GPA filter + programme filter
- **R1.5:** Match score = (skill match weight × 0.6) + (GPA score × 0.2) + (programme relevance × 0.1) + (experience score × 0.1)
- **R1.6:** Duplicate job detection: same employer + same title + same type within 30 days flagged

### Rule Set 2: Candidate Pipeline

- **R2.1:** Pipeline stages are sequential; candidates can move forward but not backward (except rejected → new)
- **R2.2:** Rejected candidates cannot be re-added to same job within 90 days
- **R2.3:** Stage time tracking: average days per stage calculated weekly
- **R2.4:** Pipeline auto-advances: when interview completed with feedback score ≥ 3, candidate auto-moves to "interviewed"
- **R2.5:** Candidates idle in stage > 14 days receive automated follow-up message

### Rule Set 3: Interviews

- **R3.1:** Interview must be scheduled within 7 days of shortlisting or candidate is flagged as "stale"
- **R3.2:** Proposed time slots must be at least 48h in the future for video, 72h for in-person
- **R3.3:** Reminder notifications sent 24h and 1h before interview to both parties
- **R3.4:** Feedback must be submitted within 72h of interview completion
- **R3.5:** No-show interview: after 15 min past start time, employer can mark "no-show", candidate notified

### Rule Set 4: Feedback

- **R4.1:** Feedback is confidential to the employer team (not shared with candidate)
- **R4.2:** `notes_for_cea` is anonymized and shared with CEA faculty for curriculum improvement
- **R4.3:** Average rating < 2.5 triggers CEA review of candidate's programme readiness
- **R4.4:** Feedback cannot be edited after 7 days

### Rule Set 5: Analytics & Data

- **R5.1:** Analytics data is aggregated and anonymized for benchmarking
- **R5.2:** Employer can only see their own data + anonymized industry benchmarks
- **R5.3:** Diversity data is optional for candidates (self-reported); missing data excluded from calculations
- **R5.4:** Analytics calculated in real-time through materialized views refreshed every 6 hours

### Rule Set 6: Brand Page

- **R6.1:** Brand page must have logo + tagline + about us to be published
- **R6.2:** Brand page photos have max resolution 3840×2160, max file size 10MB
- **R6.3:** Embedded videos must be HTTPS URLs from supported providers (YouTube, Vimeo, Loom)
- **R6.4:** Employer reviews from candidates cannot be deleted by employer (for authenticity)

## 9. Notification Specifications

### N1: New Application Received

- **Trigger:** Candidate applies to employer's job
- **Channel:** In-app + Email + Push
- **Template:** "New application from {{candidate_name}} for {{job_title}} — Match score: {{match_score}}%"
- **Delivery:** Immediate

### N2: Interview Invitation

- **Trigger:** Employer sends interview invitation to candidate
- **Channel:** Email (candidate), In-app (employer confirmation)
- **Template (candidate):** "You've been invited to interview for {{job_title}} at {{company}}. Please select your preferred time."
- **Delivery:** Immediate

### N3: Interview Confirmed

- **Trigger:** Candidate confirms interview slot
- **Channel:** In-app + Email (employer)
- **Template:** "{{candidate_name}} confirmed interview for {{job_title}} on {{date}} at {{time}}."
- **Delivery:** Immediate

### N4: Interview Reminder

- **Trigger:** 24h and 1h before interview
- **Channel:** In-app + Email + Push (both parties)
- **Template:** "Reminder: Interview with {{candidate_name}} for {{job_title}} at {{time}}."
- **Delivery:** Scheduled

### N5: Feedback Due Reminder

- **Trigger:** 24h after interview, feedback not submitted
- **Channel:** In-app + Email
- **Template:** "Feedback due for {{candidate_name}} ({{job_title}}) — please submit within {{remaining_hours}}h."
- **Delivery:** Once at 24h and again at 72h (escalated)

### N6: Candidate Hired

- **Trigger:** Offer accepted by candidate
- **Channel:** In-app + Email (employer team)
- **Template:** "{{candidate_name}} has accepted your offer for {{job_title}}!"
- **Delivery:** Immediate

### N7: New Candidate Match (Saved Search)

- **Trigger:** New candidate matches employer's saved search criteria
- **Channel:** Email (daily digest) or In-app
- **Template:** "{{count}} new candidates match your saved search '{{search_name}}'. [View Matches]"
- **Delivery:** Daily at 9 AM, or immediate if `email_alerts_enabled` is true

### N8: Job Closing Soon

- **Trigger:** 7 days before job closing_date
- **Channel:** In-app + Email
- **Template:** "Your job posting '{{job_title}}' closes in 7 days. {{application_count}} applications received."
- **Delivery:** Once

### N9: Brand Page Published

- **Trigger:** Brand page published
- **Channel:** In-app
- **Template:** "Your brand page is now live! View it at {{page_url}}."
- **Delivery:** Immediate

## 10. Permission Matrix

| Entity                 | Employer Admin | Hiring Manager | Recruiter | Interviewer | Employer Viewer | CEA Admin |
| ---------------------- | -------------- | -------------- | --------- | ----------- | --------------- | --------- |
| **Job Postings**       | CRUD           | CRUD           | CRUD      | R           | R               | CRUD      |
| **Applications**       | CRUD           | CRUD           | CRUD      | R           | R               | R         |
| **Pipeline**           | CRUD           | CRUD           | CRUD      | R           | R               | R         |
| **Interviews**         | CRUD           | CRUD           | CRUD      | R (own)     | R               | R         |
| **Interview Feedback** | CRUD           | CRUD           | CRUD      | CRUD (own)  | R               | R         |
| **Talent Search**      | CRUD           | CRUD           | CRUD      | CRUD        | CRUD            | CRUD      |
| **Shortlists**         | CRUD           | CRUD           | CRUD      | CRUD        | R               | R         |
| **Saved Searches**     | CRUD           | CRUD           | CRUD      | CRUD        | R               | R         |
| **Messages**           | CRUD           | CRUD           | CRUD      | CRUD        | R               | R         |
| **Analytics**          | R              | R              | R         | R (basic)   | —               | R         |
| **Brand Page**         | CRUD           | R              | R         | R           | —               | CRUD      |
| **Company Profile**    | CRUD           | R              | R         | —           | —               | CRUD      |
| **Team Members**       | CRUD           | R              | R         | —           | —               | CRUD      |

## 11. State Management

```typescript
const employerApi = createApi({
  reducerPath: "employerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/employer" }),
  tagTypes: ["Hub", "Jobs", "Pipeline", "Interviews", "Feedback", "Analytics", "Brand", "Talent"],
  endpoints: (builder) => ({
    getHub: builder.query<EmployerHubResponse, void>({
      query: () => "/hub",
      providesTags: ["Hub"],
      pollingInterval: 30000,
    }),
    getJobs: builder.query<JobListResponse, JobListQuery>({
      query: (params) => ({ url: "/jobs", params }),
      providesTags: ["Jobs"],
    }),
    createJob: builder.mutation<CreatedResponse, CreateJobBody>({
      query: (body) => ({ url: "/jobs", method: "POST", body }),
      invalidatesTags: ["Jobs"],
    }),
    updateJobStatus: builder.mutation<{ status: string }, { id: string; status: string }>({
      query: ({ id, status }) => ({ url: `/jobs/${id}/status`, method: "PATCH", body: { status } }),
      invalidatesTags: ["Jobs"],
    }),
    getPipeline: builder.query<PipelineResponse, string>({
      query: (jobId) => `/pipeline/${jobId}`,
      providesTags: ["Pipeline"],
      pollingInterval: 15000,
    }),
    moveCandidateStage: builder.mutation<
      { success: boolean },
      { jobId: string; applicationId: string; status: string }
    >({
      query: ({ jobId, applicationId, status }) => ({
        url: `/pipeline/${jobId}/candidates/${applicationId}/stage`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Pipeline"],
      optimisticUpdate: true,
    }),
    searchTalent: builder.query<TalentSearchResponse, TalentSearchQuery>({
      query: (params) => ({ url: "/talent/search", params }),
      providesTags: ["Talent"],
      keepUnusedDataFor: 300,
    }),
    getCandidateProfile: builder.query<CandidateProfile, string>({
      query: (id) => `/talent/candidates/${id}`,
    }),
    createInterview: builder.mutation<CreatedResponse, CreateInterviewBody>({
      query: (body) => ({ url: "/interviews", method: "POST", body }),
      invalidatesTags: ["Interviews", "Pipeline"],
    }),
    submitFeedback: builder.mutation<CreatedResponse, SubmitFeedbackBody>({
      query: (body) => ({ url: "/interviews/feedback", method: "POST", body }),
      invalidatesTags: ["Feedback", "Interviews"],
    }),
    getAnalytics: builder.query<AnalyticsResponse, AnalyticsQuery>({
      query: (params) => ({ url: "/analytics/funnel", params }),
      providesTags: ["Analytics"],
    }),
    getBrand: builder.query<BrandPageResponse, void>({
      query: () => "/brand",
      providesTags: ["Brand"],
    }),
    updateBrand: builder.mutation<{ id: string }, BrandPageUpdate>({
      query: (body) => ({ url: "/brand", method: "PUT", body }),
      invalidatesTags: ["Brand"],
    }),
    getMessages: builder.query<MessageListResponse, MessageListQuery>({
      query: (params) => ({ url: "/messages", params }),
      providesTags: (result) => ["Messages"],
      pollingInterval: 10000,
    }),
    sendMessage: builder.mutation<CreatedResponse, SendMessageBody>({
      query: (body) => ({ url: "/messages", method: "POST", body }),
      invalidatesTags: ["Messages"],
    }),
  }),
});
```

## 12. Form Schemas (Zod)

### Job Posting Form

```typescript
export const jobPostingSchema = z
  .object({
    title: z.string().min(5, "Job title required (min 5 chars)").max(255),
    department: z.string().max(100).optional(),
    employmentType: z.enum(
      ["full_time", "part_time", "internship", "apprenticeship", "contract", "temporary"],
      {
        errorMap: () => ({ message: "Select employment type" }),
      },
    ),
    locationType: z.enum(["remote", "onsite", "hybrid"]),
    locationAddress: z.string().optional(),
    locationCity: z.string().optional(),
    locationState: z.string().optional(),
    locationCountry: z.string().optional(),
    salaryMin: z.number().positive("Min salary must be positive").optional().nullable(),
    salaryMax: z.number().positive("Max salary must be positive").optional().nullable(),
    salaryCurrency: z.enum(["USD", "EUR", "GBP", "CAD", "AUD"]).default("USD"),
    experienceLevel: z.enum(["entry", "intermediate", "senior", "lead", "executive"]),
    description: z.string().min(50, "Job description must be at least 50 characters").max(50000),
    requiredSkills: z
      .array(
        z.object({
          skillId: z.string().uuid(),
          minProficiency: z.number().min(1).max(5).optional(),
        }),
      )
      .min(1, "Add at least 1 required skill"),
    preferredSkills: z
      .array(
        z.object({
          skillId: z.string().uuid(),
        }),
      )
      .optional(),
    minGpa: z.number().min(0).max(4).optional().nullable(),
    educationRequirement: z
      .enum(["high_school", "associate", "bachelor", "master", "phd", "any"])
      .optional(),
    closingDate: z
      .string()
      .datetime("Select a closing date")
      .refine((date) => new Date(date) > new Date(), {
        message: "Closing date must be in the future",
      }),
    positionsCount: z.number().int().positive("At least 1 position").max(100),
    autoMatchEnabled: z.boolean().default(true),
  })
  .refine((data) => !data.salaryMax || !data.salaryMin || data.salaryMax >= data.salaryMin, {
    message: "Max salary must be >= min salary",
    path: ["salaryMax"],
  });
```

### Talent Search Filters

```typescript
export const talentSearchSchema = z.object({
  skills: z.array(z.string()).optional(),
  programmes: z.array(z.string()).optional(),
  gradYearFrom: z.number().int().min(2020).max(2035).optional(),
  gradYearTo: z.number().int().min(2020).max(2035).optional(),
  gpaMin: z.number().min(0).max(4).optional(),
  gpaMax: z.number().min(0).max(4).optional(),
  experienceLevel: z.enum(["entry", "intermediate", "senior"]).optional(),
  location: z.string().optional(),
  availability: z.enum(["immediate", "1_month", "3_months", "upon_graduation"]).optional(),
  certifications: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  sortBy: z.enum(["match", "graduation", "gpa", "name"]).default("match"),
  order: z.enum(["asc", "desc"]).default("desc"),
  page: z.number().int().positive().default(1),
  limit: z.number().int().min(1).max(100).default(20),
});
```

### Interview Feedback Form

```typescript
export const interviewFeedbackSchema = z.object({
  interviewId: z.string().uuid(),
  overallRating: z.number().int().min(1).max(5, "Rate 1-5"),
  technicalSkill: z.number().int().min(1).max(5).optional(),
  communication: z.number().int().min(1).max(5).optional(),
  teamwork: z.number().int().min(1).max(5).optional(),
  problemSolving: z.number().int().min(1).max(5).optional(),
  leadershipPotential: z.number().int().min(1).max(5).optional(),
  culturalFit: z.number().int().min(1).max(5).optional(),
  strengths: z.string().max(2000).optional(),
  areasForImprovement: z.string().max(2000).optional(),
  recommendation: z.enum(["strong_yes", "yes", "maybe", "no"]),
  notesForCea: z.string().max(2000).optional(),
  isDraft: z.boolean().default(false),
});
```

### Schedule Interview Form

```typescript
export const scheduleInterviewSchema = z.object({
  applicationId: z.string().uuid(),
  jobId: z.string().uuid(),
  candidateId: z.string().uuid(),
  interviewType: z.enum(["phone", "video", "in_person", "technical", "panel", "assessment"]),
  durationMinutes: z.enum([15, 30, 45, 60, 90]),
  proposedSlots: z.array(z.string().datetime()).min(1, "At least 1 time slot required").max(5),
  interviewers: z
    .array(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().min(1),
        email: z.string().email(),
      }),
    )
    .min(1, "Add at least 1 interviewer"),
  location: z.string().max(500).optional(),
  videoLink: z.string().url().optional(),
  instructions: z.string().max(2000).optional(),
});
```

### Brand Page Form

```typescript
export const brandPageSchema = z.object({
  companyName: z.string().min(1).max(255),
  tagline: z.string().max(200).optional(),
  aboutUs: z.string().max(5000).optional(),
  cultureValues: z.string().max(3000).optional(),
  benefits: z.string().max(3000).optional(),
  locationCity: z.string().optional(),
  locationState: z.string().optional(),
  locationCountry: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  glassdoorUrl: z.string().url().optional().or(z.literal("")),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactPhone: z.string().optional(),
});
```

## 13. Analytics Events

| Event                       | Properties                                              | Destination |
| --------------------------- | ------------------------------------------------------- | ----------- |
| `employer_login`            | `{ employer_id, user_role }`                            | Amplitude   |
| `job_created`               | `{ job_id, employment_type, experience_level }`         | Amplitude   |
| `job_published`             | `{ job_id, required_skills_count }`                     | Amplitude   |
| `job_paused`                | `{ job_id, application_count_at_pause }`                | Amplitude   |
| `job_closed`                | `{ job_id, reason }`                                    | Amplitude   |
| `candidate_search_executed` | `{ filters_count, result_count, has_saved_search }`     | Amplitude   |
| `candidate_profile_viewed`  | `{ candidate_id, source: 'search'                       | 'pipeline'  | 'match' }`                   | Amplitude   |
| `candidate_shortlisted`     | `{ candidate_id, job_id, shortlist_name }`              | Amplitude   |
| `candidate_messaged`        | `{ candidate_id, has_subject }`                         | Amplitude   |
| `candidate_stage_changed`   | `{ application_id, from_stage, to_stage, method: 'drag' | 'click' }`  | Amplitude                    |
| `candidate_rejected`        | `{ application_id, stage, reason_category }`            | Amplitude   |
| `offer_sent`                | `{ application_id, job_id }`                            | Amplitude   |
| `interview_scheduled`       | `{ job_id, interview_type, duration }`                  | Amplitude   |
| `interview_confirmed`       | `{ interview_id }`                                      | Amplitude   |
| `interview_completed`       | `{ interview_id }`                                      | Amplitude   |
| `interview_cancelled`       | `{ interview_id, reason }`                              | Amplitude   |
| `interview_no_show`         | `{ interview_id }`                                      | Amplitude   |
| `feedback_submitted`        | `{ interview_id, overall_rating, recommendation }`      | Amplitude   |
| `feedback_draft_saved`      | `{ interview_id }`                                      | Amplitude   |
| `analytics_viewed`          | `{ tab: 'funnel'                                        | 'sources'   | 'time'                       | 'diversity' | 'benchmarks' }` | Amplitude |
| `brand_page_edited`         | `{ section_edited }`                                    | Amplitude   |
| `brand_page_published`      | `{}`                                                    | Amplitude   |
| `saved_search_created`      | `{ search_name, filter_count, email_alerts }`           | Amplitude   |
| `pipeline_bulk_action`      | `{ action: 'reject'                                     | 'move'      | 'export', candidate_count }` | Amplitude   |

## 14. Accessibility Requirements

### Screen Reader

- Pipeline: `role="list"` for columns with `aria-label="Stage: {{name}}"`
- Kanban cards: `role="listitem"`, `aria-grabbed="false"`, `aria-roledescription="draggable candidate"`
- Drag and drop: announces "{{candidate}} moved to {{stage}}" on completion
- Tables: `<th>`, `aria-sort`, `aria-rowindex`
- Charts: `role="img"` with descriptive `aria-label` summarizing data
- Candidate cards: `aria-label="{{name}}, {{programme}}, Match {{score}}%"`

### Keyboard Navigation

- Kanban: Tab to column → Arrow keys between cards → Space to pick up → Arrow keys between columns → Space to drop
- Tables: Arrow keys to navigate rows/cols, Enter to open detail, Esc to close
- Search filters: Tab through, Enter to apply, Escape to close dropdowns
- All modals: Esc to close, Tab cycle, Shift+Tab reverse
- Star ratings: Arrow keys to change, Enter to select

### Focus Management

- Page navigation → focus to `<h1>` page title
- Modal open → focus to first input or close button
- Modal close → focus back to trigger element
- Toast: `role="alert"`, non-intrusive, focus stays on task
- Error state: focus to error banner with message

## 15. Error & Edge Case Catalog

### E1: Duplicate Job Title

- **Condition:** Employer creates job with same title + type within 30 days
- **Response:** Warning "You have a similar job posting already. [View Existing]"
- **Recovery:** User can choose to close existing and create new, or reactivate existing

### E2: Candidate Already Applied

- **Condition:** Employer tries to add candidate to pipeline who already applied
- **Response:** "This candidate has already applied to this position."
- **Recovery:** Show existing application status

### E3: Interview Time Conflict

- **Condition:** Interviewer already has interview at proposed time
- **Response:** "{{interviewer_name}} already has an interview scheduled at this time."
- **Recovery:** Suggest alternative times; show calendar preview

### E4: Candidate Unavailable

- **Condition:** Candidate rejects all proposed interview slots
- **Response:** "Candidate is unavailable for all proposed times. [Suggest New Times]"
- **Recovery:** Open scheduling modal with new proposed slots

### E5: Feedback Submission Window Expired

- **Condition:** Employer tries to submit feedback > 7 days after interview
- **Response:** "Feedback window has closed (7 days). Please contact CEA support for exceptions."
- **Recovery:** Show read-only view of any draft; contact support link

### E6: Job Closing Date Passed

- **Condition:** Employer tries to publish job with past closing date
- **Response:** "Closing date must be in the future."
- **Recovery:** Pre-fill with date 30 days from today

### E7: Salary Range Invalid

- **Condition:** Max salary < min salary
- **Response:** "Maximum salary must be greater than minimum salary."
- **Recovery:** Swap values if clearly reversed, otherwise highlight both fields

### E8: Brand Page Image Too Large

- **Condition:** Uploaded image > 10MB
- **Response:** "Image too large. Maximum file size is 10MB."
- **Recovery:** Show current size; offer automatic compression option

### E9: Candidate Withdrawn Application

- **Condition:** Candidate withdraws after being in pipeline
- **Response:** Candidate card shows "Withdrawn" badge, automatically removed from active pipeline
- **Recovery:** Archived under "Withdrawn" stage with withdrawal reason visible

### E10: Pipeline Concurrent Edit

- **Condition:** Two employer users move same candidate simultaneously
- **Response:** "This candidate was moved by {{other_user}} to {{stage}}. Refreshing..."
- **Recovery:** Auto-refresh pipeline data, show updated state

### E11: Message Send to Unavailable Candidate

- **Condition:** Candidate has disabled messaging
- **Response:** "This candidate has disabled direct messages. Shortlist them and they may apply directly."
- **Recovery:** Show alternative contact methods if available

### E12: Analytics Insufficient Data

- **Condition:** Employer has < 5 hires in period
- **Response:** "Not enough data for meaningful analytics. Benchmarks will appear as you hire more candidates."
- **Recovery:** Show available data points; hide benchmark comparisons

### E13: Saved Search Results Zero

- **Condition:** Saved search returns 0 results
- **Response:** "No candidates currently match your saved search '{{name}}'."
- **Recovery:** Suggest broadening filters; offer to notify when matches appear

### E14: Video Link Integration Failure

- **Condition:** Auto-generated Zoom/Teams link fails
- **Response:** "Could not generate video link. Please enter a meeting link manually."
- **Recovery:** Show manual URL input field with validation

### E15: Offer Acceptance Beyond Positions Count

- **Condition:** More offers accepted than positions_count
- **Response:** Still allowed (waitlist mode), but job auto-closes and shows "Overfilled" badge
- **Recovery:** Employer can increase positions_count or create new job for extra hires
