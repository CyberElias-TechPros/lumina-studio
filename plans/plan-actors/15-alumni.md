# Actor: Alumni

## 1. Identity & Role Definition

- **Actor ID**: `alumni`
- **Display Name**: Alumni
- **Description**: A past student who has graduated or completed their program at Cyber Elias Academy. Alumni maintain a lifelong connection to the academy through the network directory, mentorship opportunities, job board, events, and giving back programs. Alumni are key to the academy's reputation, recruitment pipeline, and community growth.
- **User Type**: `alumni` in `users.role` enum
- **Auth Level**: Authenticated (JWT). Can also browse limited public areas without auth.
- **Statuses**: `active`, `inactive`, `suspended`
- **Graduation Requirements**: Must have completed program and have `intern_profiles.status = 'graduated'` to be converted to alumni

---

## 2. Primary Goals & Success KPIs

| Goal                                        | KPI                           | Measurement                                                          |
| ------------------------------------------- | ----------------------------- | -------------------------------------------------------------------- |
| Stay connected with the academy community   | Network engagement score      | `logins_per_month + messages_sent + events_attended`                 |
| Mentor current students                     | Mentorship participation rate | `mentorship_sessions_completed / mentorship_requests_accepted * 100` |
| Find career opportunities via job board     | Job application success rate  | `applications_submitted / interviews_secured`                        |
| Attend alumni events                        | Event attendance rate         | `events_attended / events_rsvped * 100`                              |
| Give back through donations or volunteering | Contribution value            | `total_donated + hours_volunteered * hourly_rate`                    |
| Maintain and showcase professional profile  | Profile completeness          | % of profile fields filled                                           |
| Refer prospective students                  | Referral conversion rate      | `referrals_made / referrals_enrolled * 100`                          |
| Grow professional network                   | Network size growth           | `new_connections_per_month`                                          |

---

## 3. Complete Screen Inventory

### 3.1 Alumni Hub (Dashboard)

**Wireframe**: Full-screen dashboard with personalized greeting, stats row, recent activity feed, quick actions, and highlights section. Top nav with alumni-specific links.

**UI Fields / Components**:

- `AlumniWelcomeBanner` — Personalised greeting: "Welcome back, {firstName}!" with graduation year, program, random alumni quote
- `StatsRow` — 4 metric cards in horizontal row: `profileViews` (this month), `messages`, `upcomingEvents`, `connections`
- `RecentActivityFeed` — Scrollable timeline: profile update, event RSVP, mentorship session, donation, job application. Each: `icon`, `description`, `timestamp`, `link`
- `QuickActions` — Buttons: [Update Profile], [Browse Jobs], [Find a Mentor/Mentee], [Register for Event], [Make a Donation]
- `UpcomingEventsPreview` — Next 3 events with date, title, location, RSVP status
- `SuggestedConnections` — Horizontal scroll of 5 suggested alumni/staff to connect with
- `AchievementWall` — Badges earned post-graduation (e.g., "1 Year Alumni", "Mentor Champion", "Donor")

**Data Bindings**:

- `GET /api/alumni/dashboard` — aggregated payload
- `GET /api/alumni/activity?limit=10` — recent activity
- `GET /api/alumni/stats` — profile views, message count, etc.

**States**:

- **Loading**: 4 skeleton stat cards + 3 skeleton activity items
- **Empty (fresh alumni)**: "Welcome to the Alumni Network! Complete your profile to get started."
- **Error**: Dashboard unavailable with retry
- **Edge — Inactive > 6 months**: Banner "We miss you! Check out what's new at CEA."

### 3.2 Network Directory Screen

**Wireframe**: Searchable, filterable directory of all alumni, staff, and current students. Card grid view (default) and table list view toggle. Left panel for filters.

**UI Fields / Components**:

- `DirectorySearchBar` — Text input with search icon, debounced 300ms, searching name, company, skills
- `FilterPanel` — Expandable sidebar: `graduationYear` (range slider), `program` (multi-select checkboxes), `industry` (multi-select), `location` (text), `skills` (tag input), `isMentor` (toggle), `company` (text)
- `DirectoryViewToggle` — Toggle buttons: `grid` (cards) | `list` (table rows)
- `ProfileCardGrid` — Responsive grid. Each card: `avatar` (photo), `fullName`, `headline`, `graduationYear`, `program`, `company`, `location`, `skills` (top 3 tags), `connectButton` / `messageButton`, `mutualConnections` count
- `ProfileTableList` — Table columns: photo, name, headline, graduation year, company, location, actions
- `PaginationBar` — Page numbers + "Showing X of Y alumni"
- `ConnectionBadge` — "Connected" / "Pending" / "Not Connected" indicator on each card

**Data Bindings**:

- `GET /api/alumni/directory?page=1&limit=24&search=john&program=cybersecurity&graduationYear=2024&industry=tech&isMentor=true`
- `GET /api/alumni/directory/:id` — full public profile
- `POST /api/alumni/connections` — send connection request
- `PATCH /api/alumni/connections/:id/accept` — accept request
- `DELETE /api/alumni/connections/:id` — remove connection

**States**:

- **Loading**: Skeleton grid (12 card skeletons)
- **Empty — No results**: "No alumni match your filters. Try broadening your search." with "Clear All" button
- **Empty — No directory loaded (initial)**: "Loading the alumni directory..."
- **Error**: "Directory temporarily unavailable" with retry
- **Edge — 1000+ results**: "Showing 1-24 of 1,247 alumni" with efficient pagination (page numbers truncated with ellipsis)
- **Edge — No photo uploaded**: Default avatar with initials

### 3.3 Mentorship Sign-Up Screen

**Wireframe**: Two-column layout: left shows "Become a Mentor" info/badge, right shows "Find a Mentor". Tabs for active mentorships and past mentorships.

**UI Fields / Components**:

- `MentorRegistrationForm` — Fields: `expertiseAreas` (multi-select tags from predefined list), `bio` (textarea, max 500), `mentorshipPhilosophy` (textarea, max 1000), `availability` (weekday checkboxes + time range picker), `maxMentees` (number, min 1, max 10), `preferredPrograms` (multi-select), `meetingPreferences` (checkboxes: in-person/video/phone)
- `MentorProfilePreview` — Live preview of how mentor profile looks on intern side
- `MentorMatchingSection` — "Potential Mentees" list: interns matched by program/skills with compatibility %
- `MentorshipHistoryTab` — Table of past/current mentorship relationships: `internName`, `program`, `startDate`, `endDate`, `sessionsCompleted`, `rating`, `status`
- `MentorshipRequestsList` — Incoming requests from interns: `internName`, `topic`, `dateRequested`, [Accept] [Decline] buttons
- `MentorBadge` — "You are a Mentor" badge displayed on profile

**Data Bindings**:

- `POST /api/alumni/mentorship/register` — become a mentor
- `PATCH /api/alumni/mentorship/profile` — update mentor profile
- `GET /api/alumni/mentorship/requests?status=pending`
- `POST /api/alumni/mentorship/requests/:id/accept`
- `POST /api/alumni/mentorship/requests/:id/decline`
- `GET /api/alumni/mentorship/history?page=1&limit=10`
- `GET /api/alumni/mentorship/matches` — suggested mentees

**States**:

- **Loading**: Form skeleton
- **Empty — Not a mentor yet**: "Become a mentor and give back to the next generation of cyber experts!" with prominent CTA
- **Empty — No requests**: "No mentorship requests yet. Make sure your mentor profile is complete to attract mentees."
- **Error**: Failed to save mentor profile with inline field errors
- **Edge — Max mentees reached**: "You've reached your maximum of 5 mentees. Complete existing mentorships before accepting new ones."

### 3.4 Job Board Screen

**Wireframe**: Full job board with search bar, filter sidebar, and job card list. Right panel detail view on job selection.

**UI Fields / Components**:

- `JobSearchBar` — Text input with search icon, placeholder "Search jobs by title, company, keyword..."
- `JobFilterSidebar` — `category` (dropdown: cybersecurity/IT/business/other), `employmentType` (checkboxes: full-time/part-time/contract/internship/remote), `location` (text), `salaryRange` (range slider: 0–200k), `postedWithin` (radio: 24h/3d/7d/30d/any), `experienceLevel` (checkboxes: entry/mid/senior/lead)
- `JobCardList` — Each card: `companyLogo`, `title`, `companyName`, `location`, `salary` (formatted), `employmentType` badge, `postedAt` (relative), `skills` (tags), `bookmarkButton` toggle, `applicantCount`
- `JobDetailPanel` — Sections: `JobHeader` (title, company, location, salary), `Description` (markdown), `Requirements` (bullet list), `Responsibilities` (bullet list), `HowToApply` (text), `CompanyInfo` (logo, name, description, website), `ApplyButton` (external link or internal application form)
- `ApplicationForm` — If internal: `coverLetter` (textarea, max 2000, optional), `resume` (file upload, PDF, max 10MB), `additionalDocs` (multiple file upload), `linkedInProfile` (URL), `portfolioUrl` (URL), `notes` (textarea, max 500)
- `SavedJobsList` — Bookmarked jobs in collapsible section
- `ApplicationHistory` — Table: `jobTitle`, `company`, `appliedDate`, `status` (applied/reviewing/interviewed/offered/rejected/withdrawn), `followUpDate`

**Data Bindings**:

- `GET /api/alumni/jobs?page=1&limit=20&search=cybersecurity&location=remote&salaryMin=50000&salaryMax=150000&type=full-time`
- `GET /api/alumni/jobs/:id` — job detail
- `POST /api/alumni/jobs/:id/apply` — submit application
- `POST /api/alumni/jobs/:id/bookmark` — save job
- `DELETE /api/alumni/jobs/:id/bookmark` — remove bookmark
- `GET /api/alumni/jobs/applications?page=1&limit=10` — my applications
- `POST /api/alumni/jobs` — (staff only) post new job
- `PATCH /api/alumni/jobs/:id` — (staff only) edit job listing

**States**:

- **Loading**: Skeleton job cards (8)
- **Empty — No jobs matching filters**: "No jobs match your criteria. Try expanding your filters." with "Clear Filters" button
- **Empty — No saved jobs**: "Save jobs to track them here." with "Browse Jobs" CTA
- **Error**: Failed to load jobs with retry
- **Edge — Job already applied**: Show "Applied" badge instead of "Apply" button
- **Edge — Job expired**: Greyed out card with "Expired" badge
- **Edge — Application deadline passed**: Show "Deadline passed" on detail view

### 3.5 Events Screen

**Wireframe**: Calendar view (month/week) on top, event list below. Toggle between "Upcoming", "Past", "My RSVPs", "All Events".

**UI Fields / Components**:

- `EventCalendar` — Month view calendar with event dots on dates. Click date to see day's events
- `EventListView` — List of event cards: `eventImage` (banner), `title`, `date`, `time`, `location` (or virtual link), `eventType` badge (workshop/webinar/networking/social/panel/graduation), `description` (two-line truncation), `rsvpStatus` (going/maybe/not-going/none), `attendeeCount`, `price` (free or ticket price)
- `EventDetailPanel` — Full event page: banner image, title, date/time/duration, location/map embed, description (markdown), agenda (timeline), speakers (cards with photos/bios), `rsvpButton` with status toggle, `shareButton`, `addToCalendarButton` (.ics download)
- `EventRSVPModal` — RSVP form: `status` (going/maybe/not-going), `plusOne` (number, max 2), `dietaryRequirements` (text), `notes` (text)
- `PastEventsGallery` — Grid of previous event photos with captions, `viewRecording` button if available
- `EventFeedbackForm` — Post-event: `rating` (1–5), `feedback` (textarea), `topicsForFuture` (multi-select)

**Data Bindings**:

- `GET /api/alumni/events?page=1&limit=20&type=upcoming&category=networking`
- `GET /api/alumni/events/:id` — event detail
- `POST /api/alumni/events/:id/rsvp` — set RSVP status
- `DELETE /api/alumni/events/:id/rsvp` — cancel RSVP
- `GET /api/alumni/events/my-rsvps`
- `POST /api/alumni/events/:id/feedback`

**States**:

- **Loading**: Calendar skeleton + 4 event card skeletons
- **Empty — No upcoming events**: "No upcoming events. Check back soon or suggest an event!" with suggestion link
- **Empty — No past events**: "No past events to show."
- **Error**: Events unavailable with retry
- **Edge — Event at capacity**: "Event is full. Join the waitlist?" button with waitlist count
- **Edge — RSVP deadline passed**: RSVP button disabled, "RSVP closed" label

### 3.6 Give Back / Donations Screen

**Wireframe**: One-page scroll with giving options: donate money, donate time (volunteer), donate resources, sponsor a student. Progress bars for fundraising campaigns.

**UI Fields / Components**:

- `DonationHero` — Hero section with compelling copy, CTA "Make a Donation", campaign thermometer showing progress toward annual goal
- `DonationForm` — `amount` (preset buttons: $25/$50/$100/$250/$500/`custom` number input), `frequency` (one-time/monthly/annual), `designation` (dropdown: general fund/scholarship fund/program fund/infrastructure), `isAnonymous` (toggle), `dedication` (optional: "In honor of {name}"), `paymentMethod` (card/bank transfer/PayPal/Apple Pay), `billingInfo` (name, email, address, city, state, zip, country)
- `VolunteerSection` — Opportunities list: `role`, `description`, `timeCommitment`, `skillsNeeded`, `signUpButton`
- `SponsorAStudentForm` — Fields: `studentLevel` (dropdown: foundation/intermediate/advanced), `contributionAmount` (number), `messageToStudent` (textarea, max 500), `anonymity` (toggle)
- `DonationHistory` — Table: `date`, `amount`, `designation`, `frequency`, `status` (completed/pending/failed/receipted), `receiptDownload` link
- `TaxReceiptDownload` — Button to download tax receipt PDF for each donation
- `ImpactStats` — "Your donations have helped X students", "Y scholarships funded", "Z lab equipment purchased"

**Data Bindings**:

- `POST /api/alumni/donations` — create donation intent
- `POST /api/alumni/donations/confirm` — confirm payment
- `GET /api/alumni/donations/history?page=1&limit=10`
- `GET /api/alumni/donations/receipt/:id` — download PDF receipt
- `GET /api/alumni/volunteer/opportunities`
- `POST /api/alumni/volunteer/signup` — sign up for volunteer role
- `POST /api/alumni/sponsor` — sponsor a student
- `GET /api/alumni/giving/campaigns` — active campaigns with progress

**States**:

- **Loading**: Campaign skeleton + form skeleton
- **Empty — No donation history**: "No donations yet. Your first contribution can make a difference!"
- **Error**: Payment processing error with clear message, retry option
- **Edge — Failed payment**: "Payment failed. Please verify your card details and try again." with retry button
- **Edge — Recurring donation active**: Show "Active recurring donation of $50/month" badge with modify/cancel options
- **Edge — Tax year-end**: Banner "Maximize your tax deduction — donate before Dec 31"

### 3.7 Success Stories Screen

**Wireframe**: Featured story hero at top, grid of success story cards below, categorized by industry/program. Submit your story button.

**UI Fields / Components**:

- `FeaturedStoryHero` — Large card with alumni photo, headline, excerpt, "Read Full Story" link
- `StoryCategoryTabs` — Tabs: All | Career | Education | Entrepreneurship | Community Impact
- `StoryCardGrid` — Masonry grid. Each card: `alumniPhoto`, `alumniName`, `graduationYear`, `headline`, `storyExcerpt` (truncated 150 chars), `tags` (industry/company/achievement), `readTime`, `likeCount`, `commentCount`
- `StoryDetailPage` — Full story: cover image, title, author, date, body (rich text), related stories sidebar, social share buttons, comments section
- `SubmitStoryForm` — Fields: `title` (required, max 200), `body` (rich text editor, required), `coverImage` (image upload, max 5MB), `categories` (multi-select), `tags` (tag input), `allowComments` (toggle)
- `StorySearchInput` — Search stories by keyword
- `MyStoriesTab` — List of alumni's own submitted stories with status (draft/published/rejected)

**Data Bindings**:

- `GET /api/alumni/stories?page=1&limit=12&category=career&search=keyword`
- `GET /api/alumni/stories/:id` — story detail
- `POST /api/alumni/stories` — create story
- `PATCH /api/alumni/stories/:id` — edit story
- `DELETE /api/alumni/stories/:id` — delete story
- `POST /api/alumni/stories/:id/like` — toggle like
- `POST /api/alumni/stories/:id/comments` — add comment
- `GET /api/alumni/stories/my-stories` — user's stories

**States**:

- **Loading**: Hero skeleton + 6 card skeletons in masonry
- **Empty — No stories**: "No success stories yet. Be the first to share your journey!"
- **Empty — No search results**: "No stories match your search. Try different keywords."
- **Error**: Stories failed to load with retry
- **Edge — Story under review**: "Your story is pending review by the alumni team." badge
- **Edge — Story rejected**: Show rejection reason, "Edit and Resubmit" button

### 3.8 Profile Screen

**Wireframe**: Full profile page with cover image, avatar, info sections. Split into "Public Profile" (what others see) and "Account Settings" tabs.

**UI Fields / Components**:

- `ProfilePhotoUpload` — Avatar image upload, circular crop, max 5MB
- `CoverImageUpload` — Banner image upload, 16:9 ratio, max 10MB
- `BasicInfoSection` — `firstName`, `lastName`, `headline` (text, max 150), `bio` (textarea, max 1000), `pronouns` (text), `location` (text), `timezone` (dropdown)
- `ContactSection` — `email` (verified badge), `phone` (optional), `linkedInUrl`, `githubUrl`, `personalWebsite`, `twitterHandle`, `discordUsername`
- `EducationSection` — List of entries: `institution`, `degree`, `program`, `startYear`, `endYear`, `gpa` (optional), `activities` (text)
- `EmploymentSection` — List of entries: `company`, `position`, `startDate`, `endDate` (or "Present"), `description` (textarea), `isCurrent` (toggle)
- `SkillsSection` — Tag list with endorsement count, `addSkill` input
- `CertificationsSection` — Same as portfolio certifications
- `ProfileVisibilitySettings` — Toggles per section: public / alumni-only / private
- `AccountSettingsTab` — `emailPreferences` (notification toggles), `changePassword` form, `twoFactorAuth` toggle, `deleteAccount` (with confirmation modal)
- `ProfileCompletenessBar` — "Your profile is X% complete — complete it to appear in more searches"

**Data Bindings**:

- `GET /api/alumni/profile` — my full profile
- `PUT /api/alumni/profile` — update profile
- `POST /api/alumni/profile/photo` — upload photo (multipart)
- `POST /api/alumni/profile/cover` — upload cover (multipart)
- `POST /api/alumni/profile/education` — add education entry
- `PATCH /api/alumni/profile/education/:id`
- `DELETE /api/alumni/profile/education/:id`
- `POST /api/alumni/profile/employment` — add employment
- `PATCH /api/alumni/profile/employment/:id`
- `DELETE /api/alumni/profile/employment/:id`
- `POST /api/alumni/profile/skills`
- `DELETE /api/alumni/profile/skills/:id`
- `POST /api/alumni/profile/certifications`
- `DELETE /api/alumni/profile/certifications/:id`
- `PATCH /api/alumni/profile/visibility` — update section visibility

**States**:

- **Loading**: Full page skeleton with avatar circle + 5 content lines
- **Empty — Fresh profile**: "Build your profile to connect with the alumni community!" with guided wizard
- **Error**: Save failed with field-level error messages
- **Edge — Email not verified**: Warning banner "Please verify your email address" with resend verification button
- **Edge — Profile photo rejected**: "Photo must be a face photo, max 5MB, JPG/PNG" with re-upload prompt
- **Edge — Duplicate skill**: "Skill already added" inline message

---

## 4. Full Database Schema

```typescript
// ---- drizzle/schema/alumni.ts ----

import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./users";
import { programs } from "./programs";

// ──────────────────────────────────────────────
// ALUMNI PROFILE
// ──────────────────────────────────────────────
export const alumniProfiles = sqliteTable("alumni_profiles", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  graduationDate: text("graduation_date"),
  graduationYear: integer("graduation_year"),
  programId: text("program_id").references(() => programs.id),
  cohortId: text("cohort_id"),
  headline: text("headline"),
  bio: text("bio"),
  pronouns: text("pronouns"),
  location: text("location"),
  timezone: text("timezone"),
  phone: text("phone"),
  linkedInUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  personalWebsite: text("personal_website"),
  twitterHandle: text("twitter_handle"),
  discordUsername: text("discord_username"),
  photoUrl: text("photo_url"),
  coverImageUrl: text("cover_image_url"),
  isProfilePublic: integer("is_profile_public", { mode: "boolean" }).notNull().default(true),
  isMentor: integer("is_mentor", { mode: "boolean" }).notNull().default(false),
  status: text("status", { enum: ["active", "inactive", "suspended"] })
    .notNull()
    .default("active"),
  lastActiveAt: text("last_active_at"),
  profileCompleteness: integer("profile_completeness").notNull().default(0),
  networkSize: integer("network_size").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// NETWORK CONNECTIONS
// ──────────────────────────────────────────────
export const networkConnections = sqliteTable("network_connections", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  requesterId: text("requester_id")
    .notNull()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  targetId: text("target_id")
    .notNull()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  status: text("status", { enum: ["pending", "accepted", "blocked"] })
    .notNull()
    .default("pending"),
  message: text("message"),
  connectedAt: text("connected_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// ALUMNI EDUCATION HISTORY
// ──────────────────────────────────────────────
export const alumniEducation = sqliteTable("alumni_education", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  alumniId: text("alumni_id")
    .notNull()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  program: text("program"),
  startYear: integer("start_year").notNull(),
  endYear: integer("end_year"),
  gpa: real("gpa"),
  activities: text("activities"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// ALUMNI EMPLOYMENT HISTORY
// ──────────────────────────────────────────────
export const alumniEmployment = sqliteTable("alumni_employment", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  alumniId: text("alumni_id")
    .notNull()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  company: text("company").notNull(),
  position: text("position").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  isCurrent: integer("is_current", { mode: "boolean" }).notNull().default(false),
  description: text("description"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// ALUMNI SKILLS
// ──────────────────────────────────────────────
export const alumniSkills = sqliteTable("alumni_skills", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  alumniId: text("alumni_id")
    .notNull()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  endorsements: integer("endorsements").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// MENTORSHIP (ALUMNI AS MENTOR)
// ──────────────────────────────────────────────
export const alumniMentors = sqliteTable("alumni_mentors", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  alumniId: text("alumni_id")
    .notNull()
    .unique()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  expertiseAreas: text("expertise_areas").notNull(), // JSON array
  mentorshipBio: text("mentorship_bio"),
  mentorshipPhilosophy: text("mentorship_philosophy"),
  availability: text("availability"), // JSON: { days: string[], timeRange: { start, end } }
  maxMentees: integer("max_mentees").notNull().default(3),
  currentMentees: integer("current_mentees").notNull().default(0),
  preferredPrograms: text("preferred_programs"), // JSON array
  meetingPreferences: text("meeting_preferences"), // JSON array ['in_person','video','phone']
  isAvailable: integer("is_available", { mode: "boolean" }).notNull().default(true),
  totalSessionsCompleted: integer("total_sessions_completed").notNull().default(0),
  averageRating: real("average_rating"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const mentorshipRequests = sqliteTable("mentorship_requests", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  internId: text("intern_id")
    .notNull()
    .references(() => internProfiles.id, { onDelete: "cascade" }),
  alumniMentorId: text("alumni_mentor_id")
    .notNull()
    .references(() => alumniMentors.id, { onDelete: "cascade" }),
  topic: text("topic"),
  message: text("message"),
  status: text("status", { enum: ["pending", "accepted", "declined", "cancelled"] })
    .notNull()
    .default("pending"),
  respondedAt: text("responded_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// JOB BOARD
// ──────────────────────────────────────────────
export const jobListings = sqliteTable("job_listings", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  postedBy: text("posted_by").references(() => users.id),
  companyName: text("company_name").notNull(),
  companyLogoUrl: text("company_logo_url"),
  companyDescription: text("company_description"),
  companyWebsite: text("company_website"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements"), // JSON array
  responsibilities: text("responsibilities"), // JSON array
  category: text("category", { enum: ["cybersecurity", "it", "business", "other"] }).notNull(),
  employmentType: text("employment_type", {
    enum: ["full_time", "part_time", "contract", "internship", "remote"],
  }).notNull(),
  location: text("location"),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  salaryCurrency: text("salary_currency").default("USD"),
  experienceLevel: text("experience_level", { enum: ["entry", "mid", "senior", "lead"] }).notNull(),
  skills: text("skills"), // JSON array
  applicationUrl: text("application_url"),
  applicationMethod: text("application_method", { enum: ["internal", "external"] })
    .notNull()
    .default("external"),
  status: text("status", { enum: ["active", "paused", "expired", "filled", "cancelled"] })
    .notNull()
    .default("active"),
  expiresAt: text("expires_at"),
  applicantCount: integer("applicant_count").notNull().default(0),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const jobApplications = sqliteTable("job_applications", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  jobId: text("job_id")
    .notNull()
    .references(() => jobListings.id, { onDelete: "cascade" }),
  alumniId: text("alumni_id")
    .notNull()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  coverLetter: text("cover_letter"),
  resumeUrl: text("resume_url"),
  additionalDocUrls: text("additional_doc_urls"), // JSON array
  linkedInProfile: text("linkedin_profile"),
  portfolioUrl: text("portfolio_url"),
  notes: text("notes"),
  status: text("status", {
    enum: ["submitted", "reviewing", "interviewed", "offered", "rejected", "withdrawn"],
  })
    .notNull()
    .default("submitted"),
  appliedAt: text("applied_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const savedJobs = sqliteTable("saved_jobs", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  alumniId: text("alumni_id")
    .notNull()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  jobId: text("job_id")
    .notNull()
    .references(() => jobListings.id, { onDelete: "cascade" }),
  savedAt: text("saved_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// EVENTS
// ──────────────────────────────────────────────
export const events = sqliteTable("events", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  eventType: text("event_type", {
    enum: [
      "workshop",
      "webinar",
      "networking",
      "social",
      "panel",
      "graduation",
      "career_fair",
      "other",
    ],
  }).notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  startTime: text("start_time").notNull(),
  endTime: text("end_time"),
  timezone: text("timezone").notNull().default("UTC"),
  location: text("location"),
  virtualLink: text("virtual_link"),
  isVirtual: integer("is_virtual", { mode: "boolean" }).notNull().default(false),
  bannerImageUrl: text("banner_image_url"),
  capacity: integer("capacity"),
  attendeeCount: integer("attendee_count").notNull().default(0),
  waitlistCount: integer("waitlist_count").notNull().default(0),
  price: real("price").default(0),
  currency: text("currency").default("USD"),
  isFree: integer("is_free", { mode: "boolean" }).notNull().default(true),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(false),
  createdBy: text("created_by").references(() => users.id),
  recordingUrl: text("recording_url"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const eventRSVPs = sqliteTable("event_rsvps", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  eventId: text("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  alumniId: text("alumni_id")
    .notNull()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  status: text("status", { enum: ["going", "maybe", "not_going", "waitlisted"] })
    .notNull()
    .default("going"),
  plusOne: integer("plus_one").notNull().default(0),
  dietaryRequirements: text("dietary_requirements"),
  notes: text("notes"),
  checkedIn: integer("checked_in", { mode: "boolean" }).notNull().default(false),
  feedbackRating: integer("feedback_rating"),
  feedbackText: text("feedback_text"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// DONATIONS
// ──────────────────────────────────────────────
export const donations = sqliteTable("donations", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  alumniId: text("alumni_id")
    .notNull()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  amount: real("amount").notNull(),
  currency: text("currency").notNull().default("USD"),
  frequency: text("frequency", { enum: ["one_time", "monthly", "annual"] })
    .notNull()
    .default("one_time"),
  designation: text("designation", {
    enum: ["general", "scholarship", "program", "infrastructure"],
  })
    .notNull()
    .default("general"),
  isAnonymous: integer("is_anonymous", { mode: "boolean" }).notNull().default(false),
  dedication: text("dedication"),
  paymentMethod: text("payment_method", {
    enum: ["card", "bank_transfer", "paypal", "apple_pay"],
  }).notNull(),
  paymentProvider: text("payment_provider", { enum: ["stripe", "paypal", "bank"] }).notNull(),
  paymentIntentId: text("payment_intent_id"),
  status: text("status", { enum: ["pending", "completed", "failed", "refunded", "cancelled"] })
    .notNull()
    .default("pending"),
  receiptUrl: text("receipt_url"),
  transactionFee: real("transaction_fee"),
  netAmount: real("net_amount"),
  donorEmail: text("donor_email"),
  donorName: text("donor_name"),
  isRecurringActive: integer("is_recurring_active", { mode: "boolean" }).notNull().default(false),
  recurringId: text("recurring_id"),
  completedAt: text("completed_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const volunteerOpportunities = sqliteTable("volunteer_opportunities", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  timeCommitment: text("time_commitment"),
  skillsNeeded: text("skills_needed"), // JSON array
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  maxVolunteers: integer("max_volunteers"),
  currentVolunteers: integer("current_volunteers").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const volunteerSignups = sqliteTable("volunteer_signups", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  alumniId: text("alumni_id")
    .notNull()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  opportunityId: text("opportunity_id")
    .notNull()
    .references(() => volunteerOpportunities.id, { onDelete: "cascade" }),
  status: text("status", { enum: ["signed_up", "confirmed", "completed", "cancelled"] })
    .notNull()
    .default("signed_up"),
  hoursLogged: real("hours_logged").default(0),
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const sponsorships = sqliteTable("sponsorships", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  alumniId: text("alumni_id")
    .notNull()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  studentLevel: text("student_level", {
    enum: ["foundation", "intermediate", "advanced"],
  }).notNull(),
  contributionAmount: real("contribution_amount").notNull(),
  messageToStudent: text("message_to_student"),
  isAnonymous: integer("is_anonymous", { mode: "boolean" }).notNull().default(false),
  matchedStudentId: text("matched_student_id").references(() => internProfiles.id),
  status: text("status", { enum: ["pending", "active", "completed", "cancelled"] })
    .notNull()
    .default("pending"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const fundraisingCampaigns = sqliteTable("fundraising_campaigns", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  goalAmount: real("goal_amount").notNull(),
  raisedAmount: real("raised_amount").notNull().default(0),
  donorCount: integer("donor_count").notNull().default(0),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// SUCCESS STORIES
// ──────────────────────────────────────────────
export const successStories = sqliteTable("success_stories", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  alumniId: text("alumni_id")
    .notNull()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  body: text("body").notNull(),
  coverImageUrl: text("cover_image_url"),
  categories: text("categories"), // JSON array
  tags: text("tags"), // JSON array
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  status: text("status", { enum: ["draft", "published", "rejected"] })
    .notNull()
    .default("draft"),
  rejectionReason: text("rejection_reason"),
  likeCount: integer("like_count").notNull().default(0),
  readCount: integer("read_count").notNull().default(0),
  publishedAt: text("published_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const storyLikes = sqliteTable("story_likes", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  storyId: text("story_id")
    .notNull()
    .references(() => successStories.id, { onDelete: "cascade" }),
  alumniId: text("alumni_id")
    .notNull()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const storyComments = sqliteTable("story_comments", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  storyId: text("story_id")
    .notNull()
    .references(() => successStories.id, { onDelete: "cascade" }),
  alumniId: text("alumni_id")
    .notNull()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  parentId: text("parent_id"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});
```

---

## 5. Complete API Contract

### 5.1 Dashboard

```typescript
// GET /api/alumni/dashboard
// Auth: JWT (role: alumni)
interface AlumniDashboardResponse {
  alumni: {
    id: string;
    fullName: string;
    photoUrl: string | null;
    headline: string;
    graduationYear: number;
  };
  stats: { profileViews: number; messages: number; upcomingEvents: number; connections: number };
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    link: string | null;
  }>;
  upcomingEvents: Array<{
    id: string;
    title: string;
    date: string;
    location: string | null;
    rsvpStatus: string;
  }>;
  suggestedConnections: Array<{
    id: string;
    fullName: string;
    headline: string;
    photoUrl: string | null;
  }>;
  unreadMessages: number;
  badges: Array<{ id: string; name: string; iconUrl: string }>;
}
```

### 5.2 Directory

```typescript
// GET /api/alumni/directory
// Query: page, limit, search, graduationYear, program, industry, location, skills, isMentor, company, sortBy
interface DirectoryResponse {
  data: Array<{
    id: string;
    fullName: string;
    photoUrl: string | null;
    headline: string;
    graduationYear: number;
    program: string;
    company: string | null;
    location: string | null;
    skills: string[];
    connectionStatus: "connected" | "pending" | "none";
    isMentor: boolean;
  }>;
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

// POST /api/alumni/connections
// Body: { targetId: string; message?: string }
// Response 201: { id: string; status: 'pending' }
// 409: Connection already exists

// PATCH /api/alumni/connections/:id/accept
// Response 200: { status: 'accepted'; connectedAt: string }
```

### 5.3 Mentorship

```typescript
// POST /api/alumni/mentorship/register
// Body: {
//   expertiseAreas: string[];
//   mentorshipBio?: string;
//   mentorshipPhilosophy?: string;
//   availability: { days: string[]; timeRange: { start: string; end: string } };
//   maxMentees: number;
//   preferredPrograms?: string[];
//   meetingPreferences: string[];
// }
// Response 201: AlumniMentorProfile

// GET /api/alumni/mentorship/requests?status=pending
interface MentorshipRequestsResponse {
  data: Array<{
    id: string;
    internName: string;
    internProgram: string;
    topic: string;
    message: string;
    createdAt: string;
  }>;
  pagination: { page: number; limit: number; total: number };
}

// POST /api/alumni/mentorship/requests/:id/accept
// 200: { message: 'Request accepted', internContact: { email: string; messaging: string } }
// 400: Max mentees reached

// GET /api/alumni/mentorship/matches
interface MentorMatchesResponse {
  data: Array<{
    internId: string;
    internName: string;
    program: string;
    compatibilityPercent: number;
    skills: string[];
  }>;
}
```

### 5.4 Jobs

```typescript
// GET /api/alumni/jobs
// Query: page, limit, search, category, employmentType, location, salaryMin, salaryMax, postedWithin, experienceLevel, sortBy
interface JobListResponse {
  data: Array<{
    id: string;
    title: string;
    companyName: string;
    companyLogoUrl: string | null;
    location: string | null;
    salaryMin: number | null;
    salaryMax: number | null;
    employmentType: string;
    category: string;
    experienceLevel: string;
    skills: string[];
    postedAt: string;
    isBookmarked: boolean;
    applicantCount: number;
    hasApplied: boolean;
    expiresAt: string | null;
  }>;
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

// POST /api/alumni/jobs/:id/apply
// Content-Type: multipart/form-data
// Body: coverLetter (text), resume (file), additionalDocs (files[]), linkedInProfile (url), portfolioUrl (url), notes (text)
// Response 201: { applicationId: string; status: 'submitted' }
// 400: Already applied, job expired
// 413: Resume too large

// POST /api/alumni/jobs/:id/bookmark
// 201: { bookmarked: true }

// DELETE /api/alumni/jobs/:id/bookmark
// 200: { bookmarked: false }

// GET /api/alumni/jobs/applications
interface ApplicationsResponse {
  data: Array<{
    id: string;
    jobTitle: string;
    companyName: string;
    appliedDate: string;
    status: string;
    followUpDate: string | null;
  }>;
}
```

### 5.5 Events

```typescript
// GET /api/alumni/events
// Query: page, limit, type (upcoming|past|my), category, search
interface EventListResponse {
  data: Array<{
    id: string;
    title: string;
    eventType: string;
    startDate: string;
    startTime: string;
    location: string | null;
    virtualLink: string | null;
    isVirtual: boolean;
    bannerImageUrl: string | null;
    rsvpStatus: string | null;
    attendeeCount: number;
    capacity: number | null;
    isFree: boolean;
    price: number | null;
  }>;
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

// POST /api/alumni/events/:id/rsvp
// Body: { status: 'going' | 'maybe' | 'not_going'; plusOne?: number; dietaryRequirements?: string; notes?: string }
// Response 200: { rsvpId: string; status: string }
// 409: Event at capacity -> { status: 'waitlisted'; waitlistPosition: number }

// POST /api/alumni/events/:id/feedback
// Body: { rating: number; feedback?: string; topicsForFuture?: string[] }
// Response 200: { message: 'Feedback recorded' }
```

### 5.6 Donations

```typescript
// POST /api/alumni/donations
// Body: { amount: number; currency?: string; frequency: string; designation: string; isAnonymous?: boolean; dedication?: string; paymentMethodId: string; donorName: string; donorEmail: string; billingAddress: Address }
// Response 201: { donationId: string; clientSecret: string; status: 'pending' }

// POST /api/alumni/donations/confirm
// Body: { donationId: string; paymentIntentId: string }
// Response 200: { status: 'completed'; receiptUrl: string }

// GET /api/alumni/donations/history
interface DonationHistoryResponse {
  data: Array<{
    id: string;
    amount: number;
    currency: string;
    frequency: string;
    designation: string;
    status: string;
    completedAt: string | null;
    receiptUrl: string | null;
    isRecurringActive: boolean;
  }>;
  totalDonated: number;
  totalDonations: number;
}

// GET /api/alumni/giving/campaigns
interface CampaignsResponse {
  data: Array<{
    id: string;
    name: string;
    goalAmount: number;
    raisedAmount: number;
    donorCount: number;
    percentComplete: number;
    endDate: string | null;
  }>;
}
```

### 5.7 Success Stories

```typescript
// GET /api/alumni/stories
// Query: page, limit, category, search
interface StoryListResponse {
  data: Array<{
    id: string;
    title: string;
    excerpt: string;
    coverImageUrl: string | null;
    alumniName: string;
    alumniPhotoUrl: string | null;
    graduationYear: number;
    categories: string[];
    tags: string[];
    likeCount: number;
    commentCount: number;
    readTime: number;
    publishedAt: string;
    isFeatured: boolean;
  }>;
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

// POST /api/alumni/stories
// Body: { title: string; body: string; coverImageUrl?: string; categories: string[]; tags?: string[]; allowComments?: boolean }
// Response 201: StoryDetailResponse

// POST /api/alumni/stories/:id/like
// Response 200: { liked: boolean; likeCount: number }

// POST /api/alumni/stories/:id/comments
// Body: { content: string; parentId?: string }
// Response 201: Comment
```

### 5.8 Profile

```typescript
// GET /api/alumni/profile
interface AlumniProfileResponse {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  graduationDate: string | null;
  graduationYear: number | null;
  program: { id: string; name: string } | null;
  headline: string | null;
  bio: string | null;
  pronouns: string | null;
  location: string | null;
  timezone: string;
  phone: string | null;
  emailVerified: boolean;
  linkedInUrl: string | null;
  githubUrl: string | null;
  personalWebsite: string | null;
  twitterHandle: string | null;
  discordUsername: string | null;
  photoUrl: string | null;
  coverImageUrl: string | null;
  isProfilePublic: boolean;
  isMentor: boolean;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    program: string | null;
    startYear: number;
    endYear: number | null;
  }>;
  employment: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
    isCurrent: boolean;
    description: string | null;
  }>;
  skills: Array<{ id: string; name: string; endorsements: number }>;
  certifications: Array<{
    id: string;
    name: string;
    issuingOrg: string;
    issueDate: string;
    expiryDate: string | null;
    credentialUrl: string | null;
  }>;
  profileCompleteness: number;
}

// PUT /api/alumni/profile
// Body: { headline?: string; bio?: string; pronouns?: string; location?: string; timezone?: string; phone?: string; linkedInUrl?: string; githubUrl?: string; personalWebsite?: string; twitterHandle?: string; discordUsername?: string }
// Response 200: AlumniProfileResponse
```

---

## 6. Component Tree

```
<AlumniLayout>
  <Sidebar>
    <SidebarNavItem icon="home" label="Hub" href="/alumni" />
    <SidebarNavItem icon="users" label="Directory" href="/alumni/directory" />
    <SidebarNavItem icon="graduationCap" label="Mentorship" href="/alumni/mentorship" />
    <SidebarNavItem icon="briefcase" label="Job Board" href="/alumni/jobs" />
    <SidebarNavItem icon="calendar" label="Events" href="/alumni/events" />
    <SidebarNavItem icon="gift" label="Give Back" href="/alumni/give-back" />
    <SidebarNavItem icon="bookOpen" label="Stories" href="/alumni/stories" />
    <SidebarNavItem icon="user" label="Profile" href="/alumni/profile" />
  </Sidebar>
  <main>{children}</main>
</AlumniLayout>

<AlumniHub>
  <AlumniWelcomeBanner />
  <StatsRow>
    <StatCard icon="eye" value={profileViews} label="Profile Views" />
    <StatCard icon="messageCircle" value={messages} label="Messages" />
    <StatCard icon="calendar" value={upcomingEvents} label="Upcoming Events" />
    <StatCard icon="userPlus" value={connections} label="Connections" />
  </StatsRow>
  <div className="grid grid-cols-2 gap-4">
    <RecentActivityFeed />
    <UpcomingEventsPreview />
  </div>
  <SuggestedConnections />
  <AchievementWall />
</AlumniHub>

<DirectoryScreen>
  <DirectorySearchBar />
  <div className="flex gap-4">
    <FilterPanel>
      <GraduationYearRange />
      <ProgramFilter />
      <IndustryFilter />
      <LocationFilter />
      <SkillsFilter />
      <MentorToggle />
    </FilterPanel>
    <div className="flex-1">
      <DirectoryViewToggle />
      <ProfileCardGrid> | <ProfileTableList>
        <ProfileCard /> (repeated)
      </ProfileCardGrid>
      <PaginationBar />
    </div>
  </div>
</DirectoryScreen>

<MentorshipScreen>
  <Tabs value="register" | "requests" | "history">
    <MentorRegistrationForm>
      <ExpertiseTagsInput />
      <RichTextEditor name="mentorshipBio" />
      <RichTextEditor name="mentorshipPhilosophy" />
      <AvailabilityPicker />
      <NumberInput name="maxMentees" min={1} max={10} />
      <ProgramMultiSelect />
      <MeetingPreferencesCheckboxes />
    </MentorRegistrationForm>
    <MentorshipRequestsList>
      <MentorshipRequestCard /> (repeated)
    </MentorshipRequestsList>
    <MentorshipHistoryTable />
    <MentorMatchingSection />
  </Tabs>
</MentorshipScreen>

<JobBoardScreen>
  <JobSearchBar />
  <div className="flex gap-4">
    <JobFilterSidebar>
      <CategoryDropdown />
      <EmploymentTypeCheckboxes />
      <LocationInput />
      <SalaryRangeSlider />
      <PostedWithinRadio />
      <ExperienceLevelCheckboxes />
    </JobFilterSidebar>
    <div className="flex-1">
      <JobCardList>
        <JobCard /> (repeated, virtualized)
      </JobCardList>
      <JobDetailPanel>
        <JobHeader />
        <JobDescription />
        <JobRequirements />
        <ApplyButton />
      </JobDetailPanel>
    </div>
  </div>
</JobBoardScreen>

<EventsScreen>
  <EventCalendar />
  <EventTabs value="upcoming" | "past" | "my-rsvps">
    <EventListView>
      <EventCard /> (repeated)
    </EventListView>
  </EventTabs>
  <EventDetailPanel />
  <EventRSVPModal />
  <EventFeedbackForm />
</EventsScreen>

<GiveBackScreen>
  <DonationHero />
  <DonationForm>
    <AmountSelector />
    <FrequencySelector />
    <DesignationDropdown />
    <AnonymousToggle />
    <PaymentMethodSelector />
    <BillingAddressForm />
  </DonationForm>
  <VolunteerSection>
    <VolunteerOpportunityCard /> (repeated)
  </VolunteerSection>
  <SponsorAStudentForm />
  <DonationHistory />
  <ImpactStats />
  <CampaignProgressBar />
</GiveBackScreen>

<SuccessStoriesScreen>
  <FeaturedStoryHero />
  <StoryCategoryTabs />
  <StorySearchInput />
  <StoryCardGrid>
    <StoryCard /> (repeated, masonry)
  </StoryCardGrid>
  <SubmitStoryButton />
</SuccessStoriesScreen>

<ProfileScreen>
  <Tabs value="public" | "settings">
    <PublicProfileTab>
      <CoverImageUpload />
      <ProfilePhotoUpload />
      <BasicInfoSection />
      <ContactSection />
      <EducationSection>
        <EducationEntry /> (repeated)
        <AddEducationButton />
      </EducationSection>
      <EmploymentSection>
        <EmploymentEntry /> (repeated)
        <AddEmploymentButton />
      </EmploymentSection>
      <SkillsSection />
      <CertificationsSection />
      <ProfileCompletenessBar />
    </PublicProfileTab>
    <AccountSettingsTab>
      <EmailPreferences />
      <ChangePasswordForm />
      <TwoFactorAuth />
      <DeleteAccountSection />
    </AccountSettingsTab>
  </Tabs>
</ProfileScreen>
```

---

## 7. Exhaustive User Journeys

### Journey 1: Post-Graduation Alumni Onboarding

1. Intern graduates → `intern_profiles.status` changed to `graduated`
2. Automated workflow creates `alumni_profiles` record from intern data
3. Welcome email sent: "Congratulations graduate! Your alumni profile is ready."
4. Alumni logs in, sees onboarding wizard: Step 1/4 — Update contact info, Step 2/4 — Add employment, Step 3/4 — Set profile visibility, Step 4/4 — Explore features
5. Completes wizard, profile completeness = 45%
6. Redirected to alumni hub with "Your profile is live" success banner

### Journey 2: Connect with Fellow Alumni

1. Alumni navigates to `/alumni/directory`
2. Searches "cybersecurity" in search bar, 200 results shown
3. Filters by graduation year 2024 (range slider), gets 45 results
4. Scrolls through grid, sees classmate from same cohort
5. Clicks "Connect" → `POST /api/alumni/connections` called
6. Optional message modal appears, adds "Great to see you here!"
7. Request sent, status shows "Pending" on card
8. Target alumni receives notification, accepts → connection established
9. Both can now message each other

### Journey 3: Become a Mentor

1. Alumni with 3+ years experience navigates to `/alumni/mentorship`
2. "Become a Mentor" CTA prominently displayed
3. Clicks → mentorship registration form opens
4. Fills expertise: ["Penetration Testing", "SOC Operations", "Threat Intelligence"]
5. Writes mentorship bio, selects availability (Mon/Wed/Fri evenings)
6. Sets max mentees: 3, selects preferred program: "Ethical Hacking"
7. Submits → `POST /api/alumni/mentorship/register`
8. Profile reviewed by alumni coordinator (automated if criteria met)
9. Mentor badge added to profile, appears in mentor directory
10. Notification: "You're now a mentor! Students can request you."

### Journey 4: Apply for a Job

1. Alumni navigates to `/alumni/jobs`
2. Browses featured jobs at top, scrolls through list
3. Filters: Cybersecurity, Full-time, Remote, $80k-$120k
4. Clicks job card "Senior SOC Analyst at SecureTech"
5. Detail panel opens: reads description, requirements
6. Clicks "Apply Now" → internal application form opens
7. Uploads resume (PDF, 2.4MB), writes cover letter
8. Adds LinkedIn profile URL, checks "My portfolio"
9. Clicks Submit → `POST /api/alumni/jobs/:id/apply`
10. Confirmation: "Application submitted! The company will review your profile."
11. Job card updates to show "Applied" badge
12. Application appears in "My Applications" table with "Submitted" status

### Journey 5: RSVP to Event

1. Alumni sees event notification on dashboard: "Annual Cybersecurity Summit — March 15"
2. Clicks → `/alumni/events` with event detail open
3. Reads agenda, sees speaker list including former instructor
4. Clicks "RSVP" → selects "Going", adds +1 guest
5. Dietary requirement: "Vegetarian"
6. Submits → `POST /api/alumni/events/:id/rsvp` → status "going"
7. Calendar invite downloaded (.ics)
8. 24h before event: push notification reminder
9. At event: QR code check-in scanned
10. Post-event: feedback form appears, rates 5/5

### Journey 6: Make a Donation

1. Alumni navigates to `/alumni/give-back`
2. Sees campaign progress: "$45,000 raised of $100,000 goal — Scholarship Fund"
3. Clicks "Make a Donation" → donation form
4. Selects $250, one-time, designation: Scholarship Fund
5. Checks "Dedicate to mentor Jane Smith"
6. Enters card details via Stripe Elements
7. Clicks "Donate" → `POST /api/alumni/donations` → payment intent created
8. 3D Secure authentication if needed
9. Success: "Thank you! Your donation will provide lab equipment for 5 students."
10. Receipt PDF available for download, tax receipt emailed
11. Impact stats update: "Your donations have helped fund 3 scholarships"

### Journey 7: Share Success Story

1. Alumni lands on `/alumni/stories`, sees featured story from classmate
2. Inspired, clicks "Share Your Story"
3. Story submission form opens: title "From Intern to Security Engineer at Google"
4. Writes body using rich text editor with images
5. Adds categories: "Career", tags: ["Google", "Cloud Security", "Career Growth"]
6. Uploads cover image
7. Saves as draft first, reviews preview
8. Publishes → `POST /api/alumni/stories`
9. Status "pending review" — alumni team moderates
10. Approved within 48h, notification sent
11. Story appears in "Career" category, gets 23 likes, 5 comments

### Journey 8: Update Profile & Settings

1. Alumni navigates to `/alumni/profile`
2. Profile completeness shows 65% — "Add your current employment to reach 80%"
3. Adds employment: Company "CloudDefense Inc", Position "Security Analyst", Start Date "Jan 2025", Current toggle ON
4. Saves → profile completeness jumps to 80%
5. Switches to "Settings" tab
6. Updates email preferences: weekly digest ON, marketing OFF
7. Changes password
8. Toggles 2FA — scans QR code with authenticator app
9. Confirms 2FA with verification code

---

## 8. Business Rules Engine

| Rule ID  | Name                      | Condition                                                           | Action                                                |
| -------- | ------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------- |
| ALU-R001 | Alumni auto-creation      | `intern_profiles.status = 'graduated'`                              | Create alumni profile, send welcome email             |
| ALU-R002 | Profile completeness calc | Sum of filled fields with weights                                   | Update `profileCompleteness` on every save            |
| ALU-R003 | Mentor eligibility        | `graduationYear <= currentYear - 1` AND employed                    | Allow mentor registration                             |
| ALU-R004 | Max mentees               | `currentMentees >= maxMentees`                                      | Block new mentorship requests                         |
| ALU-R005 | Connection mutual limit   | `mutualConnections > 10`                                            | Show "X mutual connections" on profile card           |
| ALU-R006 | Job expiry                | `expiresAt < now()`                                                 | Auto-set status to `expired`, hide from active list   |
| ALU-R007 | Duplicate application     | `jobApplications WHERE alumniId=X AND jobId=Y`                      | Block second application, show "Already applied"      |
| ALU-R008 | Event capacity            | `attendeeCount >= capacity`                                         | Auto-waitlist new RSVPs                               |
| ALU-R009 | RSVP deadline             | `event.startDate - 24h < now()`                                     | Close RSVP, show "RSVP closed"                        |
| ALU-R010 | Recurring donation        | `frequency IN ('monthly','annual') AND status = 'completed'`        | Set `isRecurringActive = true`, schedule next payment |
| ALU-R011 | Donation receipt          | `status = 'completed'`                                              | Auto-generate receipt PDF, store URL                  |
| ALU-R012 | Story moderation          | `status = 'published'` AFTER review                                 | Auto-notify alumni, feature if high quality           |
| ALU-R013 | Inactive alumni           | `lastActiveAt < now() - 180 days`                                   | Send re-engagement email sequence                     |
| ALU-R014 | Network growth            | New connection accepted                                             | Update `networkSize`, notify both parties             |
| ALU-R015 | Referral tracking         | `referrals WHERE referrerId = X AND referredId.status = 'enrolled'` | Award referral badge, notify alumni                   |

---

## 9. Notification Specifications

| Notification                | Trigger                    | Channel             | Template Variables                 | Delivery Rules         |
| --------------------------- | -------------------------- | ------------------- | ---------------------------------- | ---------------------- |
| Alumni welcome              | Profile created            | Email               | `{firstName}, {graduationYear}`    | Immediate, single send |
| Connection request          | New connection pending     | In-app, Email       | `{requesterName}`                  | Immediate              |
| Connection accepted         | Connection confirmed       | In-app, Email       | `{accepterName}`                   | Immediate              |
| Mentorship request          | Intern requests mentorship | In-app, Email, Push | `{internName}, {program}, {topic}` | Immediate              |
| Mentorship accepted         | Request accepted           | In-app, Email       | `{mentorName}`                     | Immediate              |
| Mentorship session reminder | 1h before session          | In-app, Email, Push | `{internName}, {time}`             | 1 hour before          |
| Job posted                  | New job matching skills    | Email (digest)      | `{jobTitle}, {company}`            | Daily digest           |
| Job application received    | Application submitted      | In-app, Email       | `{jobTitle}, {company}`            | Immediate              |
| Application status change   | Status updated             | In-app, Email       | `{jobTitle}, {newStatus}`          | Immediate              |
| Event reminder              | 24h before event           | In-app, Email, Push | `{eventTitle}, {date}, {location}` | 24h and 1h before      |
| Event feedback request      | Event ended                | In-app, Email       | `{eventTitle}`                     | 1 hour post-event      |
| Donation receipt            | Donation completed         | In-app, Email       | `{amount}, {designation}`          | Immediate with PDF     |
| Recurring donation alert    | 3 days before charge       | Email               | `{amount}, {frequency}`            | 3 days before          |
| Story published             | Story approved             | In-app, Email       | `{storyTitle}`                     | Immediate              |
| Story commented             | New comment on story       | In-app, Email       | `{commenterName}, {storyTitle}`    | Immediate              |
| Profile view                | Someone views profile      | In-app              | `{viewerName}`                     | Daily digest           |
| Re-engagement               | 180 days inactive          | Email               | `{firstName}`                      | Day 180, 200, 240      |
| Birthday                    | Date matches               | In-app, Email       | `{firstName}`                      | On the day             |
| Alumni anniversary          | 1 year post-graduation     | In-app, Email       | `{firstName}, {years}`             | On anniversary date    |

---

## 10. Permission Matrix

| Entity          | Operation          | Alumni | Intern | Staff | Admin | Public              |
| --------------- | ------------------ | ------ | ------ | ----- | ----- | ------------------- |
| Alumni Profile  | Read own           | ✓      | ✓      | ✓     | ✓     | ✗                   |
| Alumni Profile  | Read public        | ✓      | ✓      | ✓     | ✓     | ✓                   |
| Alumni Profile  | Update own         | ✓      | ✗      | ✓     | ✓     | ✗                   |
| Directory       | Search             | ✓      | ✓      | ✓     | ✓     | ✓ (limited)         |
| Connections     | Create             | ✓      | ✓      | ✓     | ✓     | ✗                   |
| Connections     | Accept/Decline     | ✓      | ✓      | ✓     | ✓     | ✗                   |
| Mentorship      | Register as mentor | ✓      | ✗      | ✓     | ✓     | ✗                   |
| Mentorship      | Accept requests    | ✓      | ✗      | ✓     | ✓     | ✗                   |
| Job Board       | View               | ✓      | ✓      | ✓     | ✓     | ✓                   |
| Job Board       | Apply              | ✓      | ✓      | ✗     | ✓     | ✗                   |
| Job Board       | Post               | ✗      | ✗      | ✓     | ✓     | ✗                   |
| Events          | View               | ✓      | ✓      | ✓     | ✓     | ✓                   |
| Events          | RSVP               | ✓      | ✓      | ✓     | ✓     | ✗                   |
| Events          | Create             | ✗      | ✗      | ✓     | ✓     | ✗                   |
| Donations       | Make               | ✓      | ✗      | ✗     | ✓     | ✓ (unauthenticated) |
| Donations       | View history       | ✓      | ✗      | ✗     | ✓     | ✗                   |
| Success Stories | Create             | ✓      | ✓      | ✓     | ✓     | ✗                   |
| Success Stories | Read               | ✓      | ✓      | ✓     | ✓     | ✓                   |
| Success Stories | Moderate           | ✗      | ✗      | ✓     | ✓     | ✗                   |

---

## 11. State Management

### Redux Slice Structure

```typescript
interface AlumniState {
  profile: AlumniProfile | null;
  dashboard: AlumniDashboard | null;
  directory: {
    profiles: DirectoryProfile[];
    filters: DirectoryFilters;
    pagination: PaginationState;
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
  mentorship: {
    mentorProfile: AlumniMentorProfile | null;
    requests: MentorshipRequest[];
    history: MentorshipHistory[];
  };
  jobs: {
    listings: JobListing[];
    selectedJob: JobDetail | null;
    applications: JobApplication[];
    savedJobIds: string[];
    filters: JobFilters;
    pagination: PaginationState;
  };
  events: {
    list: Event[];
    selectedEvent: EventDetail | null;
    myRsvps: RSVP[];
  };
  donations: {
    history: Donation[];
    campaigns: Campaign[];
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
  stories: {
    list: Story[];
    myStories: Story[];
    selectedStory: StoryDetail | null;
    filters: StoryFilters;
  };
}
```

### RTK Query Endpoints

```typescript
const alumniApi = createApi({
  reducerPath: "alumniApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/alumni", credentials: "include" }),
  tagTypes: [
    "Dashboard",
    "Directory",
    "Mentorship",
    "Jobs",
    "Events",
    "Donations",
    "Stories",
    "Profile",
  ],
  endpoints: (builder) => ({
    getDashboard: builder.query<AlumniDashboard, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
    getDirectory: builder.query<DirectoryResponse, DirectoryFilters>({
      query: (params) => ({ url: "/directory", params }),
      providesTags: ["Directory"],
    }),
    sendConnectionRequest: builder.mutation<
      { id: string; status: string },
      { targetId: string; message?: string }
    >({
      query: (body) => ({ url: "/connections", method: "POST", body }),
      invalidatesTags: ["Directory"],
    }),
    acceptConnection: builder.mutation<{ status: string; connectedAt: string }, string>({
      query: (id) => ({ url: `/connections/${id}/accept`, method: "PATCH" }),
      invalidatesTags: ["Directory", "Dashboard"],
    }),
    getJobs: builder.query<JobListResponse, JobFilters>({
      query: (params) => ({ url: "/jobs", params }),
      providesTags: ["Jobs"],
    }),
    applyForJob: builder.mutation<
      { applicationId: string; status: string },
      { jobId: string; formData: FormData }
    >({
      query: ({ jobId, formData }) => ({
        url: `/jobs/${jobId}/apply`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Jobs"],
    }),
    bookmarkJob: builder.mutation<{ bookmarked: boolean }, string>({
      query: (id) => ({ url: `/jobs/${id}/bookmark`, method: "POST" }),
      invalidatesTags: ["Jobs"],
    }),
    getEvents: builder.query<EventListResponse, EventFilters>({
      query: (params) => ({ url: "/events", params }),
      providesTags: ["Events"],
    }),
    rsvpEvent: builder.mutation<
      { rsvpId: string; status: string },
      { eventId: string; rsvp: RSVPRequest }
    >({
      query: ({ eventId, rsvp }) => ({
        url: `/events/${eventId}/rsvp`,
        method: "POST",
        body: rsvp,
      }),
      invalidatesTags: ["Events", "Dashboard"],
    }),
    createDonation: builder.mutation<{ donationId: string; clientSecret: string }, DonationRequest>(
      {
        query: (body) => ({ url: "/donations", method: "POST", body }),
        invalidatesTags: ["Donations"],
      },
    ),
    getDonationHistory: builder.query<DonationHistoryResponse, PaginationParams>({
      query: (params) => ({ url: "/donations/history", params }),
      providesTags: ["Donations"],
    }),
    getStories: builder.query<StoryListResponse, StoryFilters>({
      query: (params) => ({ url: "/stories", params }),
      providesTags: ["Stories"],
    }),
    createStory: builder.mutation<StoryDetail, StoryCreateRequest>({
      query: (body) => ({ url: "/stories", method: "POST", body }),
      invalidatesTags: ["Stories"],
    }),
    getProfile: builder.query<AlumniProfile, void>({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<AlumniProfile, Partial<AlumniProfile>>({
      query: (body) => ({ url: "/profile", method: "PUT", body }),
      invalidatesTags: ["Profile", "Dashboard"],
    }),
  }),
});
```

---

## 12. Form Schemas (Zod)

```typescript
import { z } from "zod";

export const mentorRegistrationSchema = z.object({
  expertiseAreas: z.array(z.string()).min(1, "Select at least one expertise area").max(10),
  mentorshipBio: z.string().max(500, "Max 500 characters").optional(),
  mentorshipPhilosophy: z.string().max(1000).optional(),
  availability: z.object({
    days: z.array(z.string()).min(1, "Select at least one day"),
    timeRange: z.object({
      start: z.string().regex(/^\d{2}:\d{2}$/),
      end: z.string().regex(/^\d{2}:\d{2}$/),
    }),
  }),
  maxMentees: z.number().int().min(1, "Min 1").max(10, "Max 10"),
  preferredPrograms: z.array(z.string()).optional(),
  meetingPreferences: z
    .array(z.enum(["in_person", "video", "phone"]))
    .min(1, "Select at least one"),
});

export const jobApplicationSchema = z.object({
  coverLetter: z.string().max(2000, "Max 2000 characters").optional(),
  resume: z
    .instanceof(File)
    .refine((f) => f.size <= 10 * 1024 * 1024, "Max 10MB")
    .refine((f) => ["application/pdf"].includes(f.type), "PDF only"),
  additionalDocs: z.array(z.instanceof(File)).max(3).optional(),
  linkedInProfile: z.string().url("Invalid URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  notes: z.string().max(500).optional(),
});

export const eventRSVPSchema = z.object({
  status: z.enum(["going", "maybe", "not_going"]),
  plusOne: z.number().int().min(0).max(2).optional(),
  dietaryRequirements: z.string().max(500).optional(),
  notes: z.string().max(500).optional(),
});

export const donationSchema = z.object({
  amount: z.number().min(1, "Minimum donation is $1"),
  currency: z.string().default("USD"),
  frequency: z.enum(["one_time", "monthly", "annual"]),
  designation: z.enum(["general", "scholarship", "program", "infrastructure"]),
  isAnonymous: z.boolean().default(false),
  dedication: z.string().max(200).optional(),
  donorName: z.string().min(1, "Name is required").max(100),
  donorEmail: z.string().email("Valid email required"),
  billingAddress: z.object({
    line1: z.string().min(1, "Address required"),
    line2: z.string().optional(),
    city: z.string().min(1, "City required"),
    state: z.string().min(1, "State required"),
    zip: z.string().min(5, "Valid ZIP required"),
    country: z.string().min(2, "Country required"),
  }),
});

export const successStorySchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Max 200 characters"),
  body: z
    .string()
    .min(50, "Story must be at least 50 characters")
    .max(10000, "Max 10,000 characters"),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  tags: z.array(z.string()).max(10).optional(),
  allowComments: z.boolean().default(true),
});

export const alumniProfileSchema = z.object({
  headline: z.string().max(150).optional(),
  bio: z.string().max(1000).optional(),
  pronouns: z.string().max(20).optional(),
  location: z.string().max(100).optional(),
  timezone: z.string().optional(),
  phone: z.string().max(20).optional(),
  linkedInUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  personalWebsite: z.string().url().optional().or(z.literal("")),
  twitterHandle: z.string().max(50).optional(),
  discordUsername: z.string().max(50).optional(),
});

export const educationEntrySchema = z.object({
  institution: z.string().min(1, "Institution required").max(200),
  degree: z.string().min(1, "Degree required").max(200),
  program: z.string().max(200).optional(),
  startYear: z.number().int().min(1950).max(2099),
  endYear: z.number().int().min(1950).max(2099).optional(),
  gpa: z.number().min(0).max(4.0).optional(),
  activities: z.string().max(500).optional(),
});

export const employmentEntrySchema = z.object({
  company: z.string().min(1, "Company required").max(200),
  position: z.string().min(1, "Position required").max(200),
  startDate: z.string().regex(/^\d{4}-\d{2}$/, "Use YYYY-MM format"),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "Use YYYY-MM format")
    .optional(),
  isCurrent: z.boolean().default(false),
  description: z.string().max(2000).optional(),
});
```

---

## 13. Analytics Events

| Event Name                     | Properties                                    | Trigger                  | Destination     |
| ------------------------------ | --------------------------------------------- | ------------------------ | --------------- |
| alumni_dashboard_viewed        | `{alumniId, graduationYear, programId}`       | Dashboard load           | PostHog         |
| alumni_directory_searched      | `{alumniId, query, resultCount, filterCount}` | Search executed          | PostHog         |
| alumni_connection_sent         | `{alumniId, targetId, hasMessage}`            | Connection request       | PostHog         |
| alumni_connection_accepted     | `{alumniId, requesterId}`                     | Connection accept        | PostHog         |
| alumni_mentor_registered       | `{alumniId, expertiseCount, maxMentees}`      | Mentor registration      | PostHog         |
| alumni_mentor_request_accepted | `{alumniId, internId}`                        | Request accepted         | PostHog         |
| alumni_job_viewed              | `{alumniId, jobId, company, category}`        | Job detail opened        | PostHog         |
| alumni_job_applied             | `{alumniId, jobId, company, hasCoverLetter}`  | Application submit       | PostHog         |
| alumni_job_bookmarked          | `{alumniId, jobId}`                           | Bookmark toggle          | PostHog         |
| alumni_event_rsvp              | `{alumniId, eventId, eventType, status}`      | RSVP submission          | PostHog         |
| alumni_event_attended          | `{alumniId, eventId}`                         | QR check-in              | PostHog         |
| alumni_donation_started        | `{alumniId, amount, frequency, designation}`  | Donation form submit     | PostHog         |
| alumni_donation_completed      | `{alumniId, amount, paymentMethod}`           | Payment confirmed        | PostHog, Stripe |
| alumni_donation_failed         | `{alumniId, amount, errorCode}`               | Payment failure          | PostHog         |
| alumni_story_created           | `{alumniId, categories, hasCoverImage}`       | Story created            | PostHog         |
| alumni_story_published         | `{alumniId, storyId}`                         | Story approved           | PostHog         |
| alumni_story_liked             | `{alumniId, storyId}`                         | Like toggled             | PostHog         |
| alumni_story_commented         | `{alumniId, storyId, commentLength}`          | Comment added            | PostHog         |
| alumni_profile_updated         | `{alumniId, section, completenessAfter}`      | Profile save             | PostHog         |
| alumni_profile_viewed          | `{alumniId, viewerId}`                        | Other user views profile | PostHog         |
| alumni_referral_made           | `{alumniId, referredEmail}`                   | Referral form submit     | PostHog         |
| alumni_referral_converted      | `{alumniId, referredId}`                      | Referred enrolls         | PostHog         |

---

## 14. Accessibility Requirements

- Directory cards: `role="article"`, `aria-label="{name} — {headline}"`
- Filter panel: `role="region"`, `aria-label="Filters"`, collapsible with `aria-expanded`
- Job card list: `role="listbox"`, each card `role="option"` with `aria-selected`
- Search inputs: `aria-label="Search directory"`, results updates with `aria-live="polite"`
- Donation amount buttons: `role="radio"`, `aria-checked`, grouped by `role="radiogroup"`
- Event calendar: `role="grid"`, `aria-label="Event calendar"`, date cells `role="gridcell"`
- Form validation: Inputs with `aria-invalid="true"`, errors with `aria-describedby`
- Profile completeness bar: `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- RSVP toggle: `role="switch"`, `aria-checked`
- Story rich text editor: `role="textbox"`, `aria-multiline="true"`, `aria-label="Story content"`
- Cover image upload: `role="button"`, `aria-label="Upload cover image"`, keyboard accessible
- Pagination: `nav` with `aria-label="Pagination"`, `aria-current="page"` on active
- Mentor registration: Multi-step form with `aria-current="step"`, progress indicator
- File upload: Drag-and-drop zone with `aria-dropeffect="move"`, keyboard file picker
- Toast: `role="alert"`, `aria-live="assertive"` for success/error, `polite` for info
- Keyboard shortcuts: `?` opens keyboard shortcut help modal, `j/k` navigate job list, `s` save job, `Enter` open detail
- Focus trap in modals, focus returns to trigger on close
- Skip navigation: "Skip to main content" link at top
- Reduced motion: Respect `prefers-reduced-motion`, disable all animations
- High contrast: Ensure 4.5:1 contrast ratio for all text

---

## 15. Error & Edge Case Catalog

| Error Code | Condition                 | HTTP Status | System Response         | User Message                                                                | Recovery Action               |
| ---------- | ------------------------- | ----------- | ----------------------- | --------------------------------------------------------------------------- | ----------------------------- |
| ALU-001    | Profile not found         | 404         | Check user role         | "Profile not found. Ensure you are registered as alumni."                   | Contact support               |
| ALU-002    | Connection to self        | 400         | Reject                  | "You cannot connect with yourself."                                         | —                             |
| ALU-003    | Connection already exists | 409         | Check existing          | "Connection request already sent or you are already connected."             | View connection status        |
| ALU-004    | Mentor already registered | 409         | Check mentor flag       | "You are already registered as a mentor."                                   | Edit mentor profile           |
| ALU-005    | Max mentees reached       | 400         | Count check             | "You have reached your maximum mentee capacity."                            | Complete existing mentorships |
| ALU-006    | Mentor minimum XP not met | 403         | Check grad year         | "Mentorship requires at least 1 year post-graduation experience."           | Show eligibility criteria     |
| ALU-007    | Job already applied       | 409         | Check applications      | "You have already applied for this position."                               | View application status       |
| ALU-008    | Job expired               | 400         | Check expiresAt         | "This job listing has expired."                                             | Show similar jobs             |
| ALU-009    | Event at capacity         | 409         | Count check             | "This event is full. You've been added to the waitlist."                    | Show waitlist position        |
| ALU-010    | RSVP deadline passed      | 400         | Date check              | "RSVP is closed for this event."                                            | —                             |
| ALU-011    | Donation amount invalid   | 400         | Min/max check           | "Minimum donation is $1. Maximum is $50,000 per transaction."               | Adjust amount                 |
| ALU-012    | Payment failed            | 402         | Stripe error            | "Payment failed. Please verify your card details."                          | Show error detail, retry      |
| ALU-013    | Recurring donation active | 409         | Check existing          | "You already have an active recurring donation."                            | Modify or cancel existing     |
| ALU-014    | Story too short           | 400         | Min length              | "Your story must be at least 50 characters."                                | Expand content                |
| ALU-015    | Story rejected            | 403         | Moderation status       | "Your story was not approved: {rejectionReason}"                            | Edit and resubmit             |
| ALU-016    | File type not allowed     | 400         | MIME check              | "Only JPG, PNG, and PDF files are accepted."                                | Convert file                  |
| ALU-017    | File exceeds size         | 413         | Size check              | "File exceeds maximum size of 10MB."                                        | Compress file                 |
| ALU-018    | Email not verified        | 403         | Check verified flag     | "Please verify your email address to access this feature."                  | Resend verification           |
| ALU-019    | Rate limit exceeded       | 429         | Throttle                | "Too many requests. Please wait before trying again."                       | Retry after shown duration    |
| ALU-020    | Network offline           | —           | navigator.onLine        | "You are offline. Changes will be saved when reconnected."                  | Queue, sync on reconnect      |
| ALU-021    | Session expired           | 401         | JWT expired             | "Session expired. Please log in again."                                     | Redirect to login             |
| ALU-022    | Account suspended         | 403         | Status check            | "Your alumni account has been suspended. Contact alumni@cea.ng" | Show support contact          |
| ALU-023    | Duplicate education entry | 409         | Same institution+degree | "This education entry already exists."                                      | Edit existing entry           |
| ALU-024    | Graduation year in future | 400         | Year > current          | "Graduation year cannot be in the future."                                  | Correct year                  |
| ALU-025    | Story already liked       | 409         | Check existing like     | "You have already liked this story."                                        | Toggle off                    |
