# Actor: Volunteer

## 1. Identity & Role Definition

- **ID:** `actor:volunteer`
- **Display Name:** Volunteer
- **Description:** Community volunteer who contributes time and skills to CEA initiatives including mentoring, event support, content creation, technical assistance, tutoring, and community outreach. Tracks hours, earns certificates, and monitors their community impact.
- **System Persona:** Altruistic contributor motivated by community impact, skill development, and recognition. Values flexible scheduling, clear expectations, visible impact metrics, and a supportive community. Many are students, alumni, or professionals donating expertise.
- **Authentication Level:** Tier 1 — Email + password or social login (Google/GitHub). MFA optional.
- **Session Timeout:** 60 minutes.
- **Default Landing:** `/volunteer/opportunities`

## 2. Primary Goals & Success KPIs

| Goal                                    | KPI                              | Target      | Measurement      |
| --------------------------------------- | -------------------------------- | ----------- | ---------------- |
| Find meaningful volunteer opportunities | Opportunities viewed per session | >3          | Analytics        |
| Contribute effectively                  | Hours logged per month           | >10         | Hours tracker    |
| Develop skills through volunteering     | Skill certificates earned        | >2/year     | Certificates     |
| Build community connections             | Community interactions           | >5/month    | Community system |
| Track personal impact                   | Impact score                     | >500 points | Impact dashboard |
| Flexible commitment                     | Session completion rate          | >80%        | Hours tracker    |
| Recognition & advancement               | Badges earned                    | >3          | Gamification     |

## 3. Complete Screen Inventory

### 3.1 Opportunities — `/volunteer/opportunities`

**Wireframe:** Search bar at top with filter chips: Category (Mentoring, Tutoring, Events, Content, Technical, Admin, Outreach), Commitment (One-time, Short-term, Ongoing), Location (Remote, On-site, Hybrid), Skills (multi-select from taxonomy). Results shown as card grid (default) or list. Each card: title, organisation, category, commitment type, location, date/time (for events), skills needed, slot availability (e.g., "5 spots left"), match score badge, [Apply] [View Details].

**Opportunity Detail Modal:**

- Header: title, category, organisation, status (Open/Closed/Filled)
- Description: what you'll do, impact, requirements, time commitment
- Skills needed / preferred
- Location with map embed if on-site
- Date/time details (start, end, recurring schedule)
- Required qualifications/certifications
- Volunteer team size
- [Apply Now] [Save for Later] [Share] buttons
- Related opportunities carousel at bottom

**States:**

- **Loading:** Skeleton card grid
- **Empty (no results):** "No opportunities match your filters. Try broadening your search or check back later."
- **Empty (no opportunities at all):** "No volunteer opportunities available at the moment. New opportunities are added regularly."
- **Error:** "Unable to load opportunities. [Retry]"

### 3.2 My Volunteering — `/volunteer/my-volunteering`

**Wireframe:** Tabs — [Upcoming] [In Progress] [Completed] [Saved]. Each tab shows cards: volunteer activity title, category, organisation, status, commitment, date range, hours logged, progress ring (for ongoing), [Log Hours] [Start] [Complete] [View Details] actions depending on status.

**Upcoming:**

- Programmes you've applied to and been accepted
- Upcoming events you've signed up for
- Countdown to next commitment
- [Confirm Attendance] [Cancel] buttons

**In Progress:**

- Active ongoing commitments
- Hours logged this week / total target
- Progress bar towards commitment goal
- [Log Hours] [Mark Session Complete] [Report Issue]

**Completed:**

- Volunteering history with dates, hours, organisation
- Rating/review prompt if not yet submitted
- Certificate download link (if awarded)
- [Leave Review] [Share on LinkedIn]

**Saved:**

- Bookmarked opportunities for later
- [Apply Now] [Remove] buttons

**States:**

- **Loading:** Skeleton list
- **Empty (upcoming):** "No upcoming volunteer activities. Browse opportunities to find your next contribution."
- **Empty (completed):** "No completed volunteering yet. Start your journey by applying to an opportunity."
- **Empty (saved):** "No saved opportunities. Browse and save opportunities you're interested in."
- **Error:** "Your volunteering data unavailable. [Retry]"

### 3.3 Hours Tracker — `/volunteer/hours`

**Wireframe:** Top: summary card — This Week (hours), This Month (hours), Total (hours), Current Streak (weeks). Below: calendar view (monthly) with days highlighted where hours were logged. Click day → see log entries for that day. Below calendar: log table — Date | Activity | Organisation | Hours | Description | Status (Pending/Approved/Rejected). [Log Hours] button.

**Log Hours Modal:**

- Activity selector (dropdown of your active volunteer activities)
- Date (default today)
- Start time / End time or Duration (hours/minutes)
- Description of work done (required, min 20 chars)
- [Submit] [Cancel]

**Hours Approval Detail:**

- Pending hours show as yellow; approved as green; rejected as red
- Rejected entries show admin feedback/reason
- [Edit Pending Entry] [Remove]

**States:**

- **Loading:** Skeleton calendar + table
- **Empty:** "No hours logged yet. Start tracking your volunteer hours by logging your first session."
- **Error:** "Hours tracker unavailable. [Retry]"

### 3.4 Community — `/volunteer/community`

**Wireframe:** Three sections — [Discussion Board] [Events] [Volunteer Directory].

**Discussion Board:**

- Categories: General, Mentoring Tips, Technical Help, Events, Recognition
- Threaded posts with title, author, date, reply count, last activity
- [New Post] button
- Post detail: title, content (rich text), replies with author, likes

**Events (Community):**

- Community-organised events (socials, workshops, meetups)
- Calendar view + list view
- RSVP button
- Event detail: description, date/time, location, attendees count, organiser

**Volunteer Directory:**

- Grid of volunteer profiles: photo, name, skills, badges, total hours, interests
- Click → profile: about, volunteering history, badges, impact stats
- [Send Message] [Connect]

**States:**

- **Loading:** Skeleton per section
- **Empty:** "The community is growing. Be the first to start a discussion!"
- **Error:** "Community unavailable. [Retry]"

### 3.5 Certificates — `/volunteer/certificates`

**Wireframe:** Grid of certificate cards: certificate title, organisation, date earned, hours completed, badge preview, [View] [Download PDF] [Share on LinkedIn] actions. Filters: category, date range. Each certificate: full-page view with details, verification code, QR code for verification.

**Certificate Detail:**

- Full certificate design (digital)
- Volunteer name
- Programme/activity name
- Organisation (CEA logo)
- Hours contributed
- Date issued
- Certificate ID / verification code
- QR code for instant verification
- Skills endorsed
- [Download PDF] [Share on LinkedIn] [Share via Email] [Verify]

**States:**

- **Loading:** Skeleton grid
- **Empty:** "No certificates yet. Complete volunteer commitments to earn certificates."
- **Error:** "Certificates unavailable. [Retry]"

### 3.6 Impact Dashboard — `/volunteer/impact`

**Wireframe:** Top: hero card — total impact score, overall volunteer rank (e.g., "Top 15% of volunteers"), level/badge. Below: stat cards — Total Hours, People Helped, Events Attended, Skills Developed, Community Points. Next row: time-series chart (hours per month, 12-month view) + category breakdown pie chart. Bottom: achievements/badges section (grid of earned + locked badges) + leaderboard (top 10 volunteers this month) + progress towards next level.

**Impact Sections:**

- `HeroCard`: impact score with circular progress to next level
- `StatCards` × 5: metric with icon, value, trend
- `HoursTrendChart`: line chart, hours per month, comparison to previous year
- `CategoryBreakdown`: donut chart — hours by category (mentoring, tutoring, events, etc.)
- `BadgesGrid`: earned badges (colour) and locked (grey), count
- `Leaderboard`: rank, avatar, name, hours this month, points
- `LevelProgress`: current level, XP to next level, benefits unlocked at next level

**States:**

- **Loading:** Skeleton hero + cards + charts
- **Empty:** "Start volunteering to see your impact dashboard come to life!"
- **Error:** "Impact dashboard unavailable. [Retry]"

## 4. Full Database Schema

### Table: `volunteer_profiles`

```sql
CREATE TABLE volunteer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth_users(id) ON DELETE CASCADE,
  headline VARCHAR(255),
  bio TEXT,
  avatar_key VARCHAR(500),
  phone VARCHAR(50),
  timezone VARCHAR(50) DEFAULT 'UTC',
  availability VARCHAR(100) CHECK (availability IN ('weekdays','weekends','evenings','flexible')),
  max_commitment_hours_week INT CHECK (max_commitment_hours_week >= 1 AND max_commitment_hours_week <= 80),
  is_active BOOLEAN DEFAULT true,
  total_hours DECIMAL(10,2) DEFAULT 0,
  total_hours_approved DECIMAL(10,2) DEFAULT 0,
  impact_score INT DEFAULT 0,
  level INT DEFAULT 1 CHECK (level >= 1),
  xp INT DEFAULT 0,
  streak_weeks INT DEFAULT 0,
  rank_position INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_volunteer_profiles_user (user_id),
  INDEX idx_volunteer_profiles_active (is_active),
  INDEX idx_volunteer_profiles_score (impact_score DESC)
);
```

### Table: `volunteer_skills`

```sql
CREATE TABLE volunteer_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID NOT NULL REFERENCES volunteer_profiles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skill_taxonomy(id),
  proficiency INT CHECK (proficiency >= 1 AND proficiency <= 5),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(volunteer_id, skill_id),
  INDEX idx_volunteer_skills_volunteer (volunteer_id)
);
```

### Table: `volunteer_interests`

```sql
CREATE TABLE volunteer_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID NOT NULL REFERENCES volunteer_profiles(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL CHECK (category IN (
    'mentoring','tutoring','events','content','technical','admin','outreach','research','fundraising','other'
  )),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(volunteer_id, category),
  INDEX idx_volunteer_interests_volunteer (volunteer_id)
);
```

### Table: `volunteer_opportunities`

```sql
CREATE TABLE volunteer_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  organisation VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN (
    'mentoring','tutoring','events','content','technical','admin','outreach','research','fundraising','other'
  )),
  commitment_type VARCHAR(30) NOT NULL CHECK (commitment_type IN ('one_time','short_term','ongoing')),
  location_type VARCHAR(20) NOT NULL CHECK (location_type IN ('remote','onsite','hybrid')),
  location_address VARCHAR(500),
  location_city VARCHAR(100),
  location_lat DECIMAL(10,7),
  location_lng DECIMAL(10,7),
  start_date DATE,
  end_date DATE,
  recurring_schedule VARCHAR(255),
  total_slots INT,
  filled_slots INT DEFAULT 0,
  skills_needed JSONB DEFAULT '[]',
  skills_preferred JSONB DEFAULT '[]',
  requirements TEXT,
  qualifications TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open','closed','filled','cancelled')),
  created_by UUID NOT NULL REFERENCES auth_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_volunteer_opps_category (category),
  INDEX idx_volunteer_opps_status (status),
  INDEX idx_volunteer_opps_date (start_date),
  INDEX idx_volunteer_opps_created (created_at DESC)
);
```

### Table: `volunteer_applications`

```sql
CREATE TABLE volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID NOT NULL REFERENCES volunteer_opportunities(id) ON DELETE CASCADE,
  volunteer_id UUID NOT NULL REFERENCES volunteer_profiles(id) ON DELETE CASCADE,
  status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','accepted','rejected','cancelled','completed')),
  motivation_statement TEXT,
  skills_offered JSONB DEFAULT '[]',
  availability_notes TEXT,
  accepted_at TIMESTAMPTZ,
  rejected_at TIMESTAMPTZ,
  rejection_reason TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(opportunity_id, volunteer_id),
  INDEX idx_volunteer_apps_opportunity (opportunity_id),
  INDEX idx_volunteer_apps_volunteer (volunteer_id),
  INDEX idx_volunteer_apps_status (status)
);
```

### Table: `volunteer_hours`

```sql
CREATE TABLE volunteer_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID NOT NULL REFERENCES volunteer_profiles(id) ON DELETE CASCADE,
  application_id UUID REFERENCES volunteer_applications(id),
  opportunity_id UUID REFERENCES volunteer_opportunities(id),
  activity_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  duration_hours DECIMAL(5,2) NOT NULL CHECK (duration_hours > 0 AND duration_hours <= 24),
  description TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  reviewed_by UUID REFERENCES auth_users(id),
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_volunteer_hours_volunteer (volunteer_id),
  INDEX idx_volunteer_hours_date (activity_date),
  INDEX idx_volunteer_hours_status (status),
  INDEX idx_volunteer_hours_opportunity (opportunity_id)
);
```

### Table: `volunteer_certificates`

```sql
CREATE TABLE volunteer_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_number VARCHAR(50) NOT NULL UNIQUE,
  volunteer_id UUID NOT NULL REFERENCES volunteer_profiles(id) ON DELETE CASCADE,
  application_id UUID REFERENCES volunteer_applications(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  hours_completed DECIMAL(10,2) NOT NULL,
  skills_endorsed JSONB DEFAULT '[]',
  certificate_key VARCHAR(500),
  verification_code VARCHAR(100) NOT NULL UNIQUE,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_volunteer_certs_volunteer (volunteer_id),
  INDEX idx_volunteer_certs_verification (verification_code)
);
```

### Table: `volunteer_badges`

```sql
CREATE TABLE volunteer_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(30) NOT NULL CHECK (category IN ('hours','impact','skills','community','milestone','special')),
  icon_key VARCHAR(500),
  tier INT DEFAULT 1 CHECK (tier >= 1 AND tier <= 5),
  criteria JSONB NOT NULL,
  xp_reward INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Table: `volunteer_earned_badges`

```sql
CREATE TABLE volunteer_earned_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID NOT NULL REFERENCES volunteer_profiles(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES volunteer_badges(id),
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_featured BOOLEAN DEFAULT false,
  UNIQUE(volunteer_id, badge_id),
  INDEX idx_earned_badges_volunteer (volunteer_id)
);
```

### Table: `volunteer_community_posts`

```sql
CREATE TABLE volunteer_community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES volunteer_profiles(user_id),
  category VARCHAR(30) NOT NULL CHECK (category IN ('general','mentoring_tips','technical_help','events','recognition','other')),
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  like_count INT DEFAULT 0,
  reply_count INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_community_posts_category (category),
  INDEX idx_community_posts_created (created_at DESC)
);
```

### Table: `volunteer_community_replies`

```sql
CREATE TABLE volunteer_community_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES volunteer_community_posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES volunteer_community_replies(id),
  author_id UUID NOT NULL REFERENCES volunteer_profiles(user_id),
  content TEXT NOT NULL,
  like_count INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_community_replies_post (post_id)
);
```

### Table: `volunteer_community_events`

```sql
CREATE TABLE volunteer_community_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  event_type VARCHAR(30) NOT NULL CHECK (event_type IN ('social','workshop','meetup','webinar','other')),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  location_type VARCHAR(20) NOT NULL CHECK (location_type IN ('remote','onsite','hybrid')),
  location_url VARCHAR(500),
  location_address VARCHAR(500),
  max_attendees INT,
  created_by UUID NOT NULL REFERENCES auth_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_community_events_date (start_date)
);
```

### Table: `volunteer_event_attendees`

```sql
CREATE TABLE volunteer_event_attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES volunteer_community_events(id) ON DELETE CASCADE,
  volunteer_id UUID NOT NULL REFERENCES volunteer_profiles(id) ON DELETE CASCADE,
  rsvp_status VARCHAR(20) NOT NULL CHECK (rsvp_status IN ('going','maybe','not_going')),
  attended BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(event_id, volunteer_id)
);
```

### Table: `volunteer_impact_log`

```sql
CREATE TABLE volunteer_impact_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID NOT NULL REFERENCES volunteer_profiles(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL,
  points INT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  INDEX idx_impact_log_volunteer (volunteer_id),
  INDEX idx_impact_log_created (created_at DESC)
);
```

### Table: `volunteer_levels`

```sql
CREATE TABLE volunteer_levels (
  level INT PRIMARY KEY CHECK (level >= 1),
  title VARCHAR(100) NOT NULL,
  xp_required INT NOT NULL,
  benefits JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## 5. Complete API Contract

### 5.1 Opportunities

```
GET /api/v1/volunteer/opportunities
Query: category?, commitment_type?, location_type?, skills (csv), status?, search, page, limit, sort_by
Auth: Volunteer
Response: { data: Array<{
  id, title, organisation, category, commitmentType, locationType,
  startDate, endDate, totalSlots, filledSlots, skillsNeeded, skillsPreferred,
  status, matchScore, createdAt
}>, pagination }

GET /api/v1/volunteer/opportunities/:id
Response: Full opportunity detail

POST /api/v1/volunteer/opportunities/:id/apply
Body: { motivationStatement?: string, skillsOffered?: string[], availabilityNotes?: string }
Response: { id, status: 'pending', createdAt }

POST /api/v1/volunteer/opportunities/:id/save
Response: { saved: true }

DELETE /api/v1/volunteer/opportunities/:id/save
Response: { saved: false }
```

### 5.2 My Volunteering

```
GET /api/v1/volunteer/my-activities
Query: status (upcoming|in_progress|completed|saved), page, limit
Auth: Volunteer
Response: { data: Array<{
  id, opportunity: { id, title, organisation, category }, applicationStatus,
  commitmentType, startDate, endDate, hoursLogged, totalHoursTarget,
  progressPercentage, nextSession, certificateAvailable, rating
}>, pagination }

GET /api/v1/volunteer/my-activities/:id
Response: Full activity detail with sessions, hours breakdown

POST /api/v1/volunteer/my-activities/:id/confirm
Response: { status: 'confirmed' }

POST /api/v1/volunteer/my-activities/:id/cancel
Body: { reason: string }
Response: { status: 'cancelled' }

POST /api/v1/volunteer/my-activities/:id/complete
Response: { status: 'completed', completedAt, certificateAvailable: boolean }

POST /api/v1/volunteer/my-activities/:id/rate
Body: { rating: 1-5, review?: string }
Response: { success: true }
```

### 5.3 Hours

```
GET /api/v1/volunteer/hours
Query: from, to, status?, page, limit
Auth: Volunteer
Response: { summary: { thisWeek, thisMonth, total, streak }, data: Array<{
  id, activityDate, startTime, endTime, durationHours, description,
  opportunity: { id, title }, status, rejectionReason, createdAt
}>, pagination }

GET /api/v1/volunteer/hours/calendar
Query: month, year
Response: Array<{ date, hours, entries: Array<{ id, duration, status }> }>

POST /api/v1/volunteer/hours
Body: { opportunityId, applicationId?, activityDate, startTime?, endTime?, durationHours, description }
Auth: Volunteer
Response: { id, status: 'pending', createdAt }

PUT /api/v1/volunteer/hours/:id
Body: Partial<HoursUpdate>
Response: { id, updatedAt }

DELETE /api/v1/volunteer/hours/:id
Response: { success: true } (only if status = 'pending')
```

### 5.4 Community

```
GET /api/v1/volunteer/community/posts
Query: category?, sort_by (latest|popular), page, limit
Auth: Volunteer
Response: { data: Array<{
  id, title, category, author: { id, name, avatarUrl }, likeCount, replyCount, isPinned, createdAt, lastActivity
}>, pagination }

POST /api/v1/volunteer/community/posts
Body: { category, title, content }
Response: { id, createdAt }

GET /api/v1/volunteer/community/posts/:id
Response: Full post with replies (paginated)

POST /api/v1/volunteer/community/posts/:id/reply
Body: { content, parentId? }
Response: { id, createdAt }

POST /api/v1/volunteer/community/posts/:id/like
Response: { liked: boolean, likeCount }

GET /api/v1/volunteer/community/events
Query: from, to, page, limit
Response: { data: Array<{ id, title, eventType, startDate, endDate, locationType, attendeeCount, maxAttendees, rsvpStatus }>, pagination }

POST /api/v1/volunteer/community/events/:id/rsvp
Body: { status: 'going' | 'maybe' | 'not_going' }
Response: { status, updatedAt }

GET /api/v1/volunteer/community/directory
Query: skills?, search, page, limit
Auth: Volunteer
Response: { data: Array<{
  id, userId, name, avatarUrl, headline, skills: Array<{ name, proficiency }>,
  totalHours, badges: Array<{ code, name }>, interests: string[]
}>, pagination }
```

### 5.5 Certificates

```
GET /api/v1/volunteer/certificates
Query: page, limit, category?, from, to
Auth: Volunteer
Response: { data: Array<{
  id, certificateNumber, title, hoursCompleted, skillsEndorsed: string[],
  issuedAt, downloadUrl, shareLinkedInUrl
}>, pagination }

GET /api/v1/volunteer/certificates/:id
Response: Full certificate with verification data

GET /api/v1/volunteer/certificates/verify/:code
Auth: None (public)
Response: { valid: boolean, certificate: { title, volunteerName, hours, issuedAt, organisation } }

POST /api/v1/volunteer/certificates/:id/regenerate
Response: { downloadUrl, regeneratedAt }
```

### 5.6 Impact Dashboard

```
GET /api/v1/volunteer/impact
Auth: Volunteer
Response: {
  impactScore: number;
  rank: { position: number, percentile: number, totalVolunteers: number };
  level: { current: number, title: string, xp: number, xpToNext: number };
  stats: { totalHours, peopleHelped, eventsAttended, skillsDeveloped, communityPoints };
  hoursTrend: Array<{ month: string, hours: number, previousYearHours: number }>;
  categoryBreakdown: Array<{ category: string, hours: number }>;
  badges: Array<{ id, code, name, description, iconUrl, earnedAt: string | null, isLocked: boolean }>;
  leaderboard: Array<{ rank, volunteerId, name, avatarUrl, hoursThisMonth, points }>;
  nextLevelBenefits: string[];
}

GET /api/v1/volunteer/impact/history
Query: from, to
Response: Array<{ date, eventType, points, description }>
```

## 6. Component Tree

```
VolunteerShell
 ├── VolunteerSidebar
 │   ├── SidebarLogo
 │   ├── SidebarNav (Opportunities, My Volunteering, Hours, Community, Certificates, Impact)
 │   └── SidebarProfileCard (avatar, name, level, XP bar)
 ├── VolunteerTopbar
 │   ├── SearchBar (global: opportunities, community, volunteers)
 │   ├── NotificationBell
 │   └── UserMenu
 └── MainContent

Pages:
 ├── OpportunitiesPage
 │   ├── SearchFiltersBar
 │   │   ├── CategoryFilterChips
 │   │   ├── CommitmentFilter
 │   │   ├── LocationFilter
 │   │   ├── SkillsFilter
 │   │   └── SearchInput
 │   ├── ResultsToolbar (count, sort, view toggle)
 │   ├── OpportunityCardGrid / List
 │   │   └── OpportunityCard
 │   │       ├── TitleOrganisation
 │   │       ├── CategoryBadge
 │   │       ├── CommitmentIndicator
 │   │       ├── SlotsAvailability
 │   │       ├── SkillsTags
 │   │       ├── MatchScoreBadge
 │   │       └── Actions (Apply, Save, Share)
 │   └── OpportunityDetailModal
 │       ├── DetailHeader (title, org, category, status)
 │       ├── DetailBody (description, requirements, location, schedule)
 │       ├── SkillsSection
 │       ├── TeamSize
 │       ├── ApplyButton / SavedIndicator
 │       └── RelatedOpportunitiesCarousel

 ├── MyVolunteeringPage
 │   ├── ActivityTabs (Upcoming, In Progress, Completed, Saved)
 │   ├── ActivityList
 │   │   └── ActivityCard
 │   │       ├── ActivityHeader (title, org, category)
 │   │       ├── StatusBadge
 │   │       ├── CommitmentInfo (dates, hours, progress)
 │   │       ├── NextSessionInfo
 │   │       └── Actions (Log Hours, Complete, Cancel, Review)
 │   └── ActivityDetailView
 │       ├── ActivityHeader
 │       ├── ProgressSection
 │       ├── SessionsTable
 │       ├── HoursSummary
 │       ├── CertificateLink (if completed)
 │       └── ReviewForm

 ├── HoursTrackerPage
 │   ├── HoursSummaryBar (this week, month, total, streak)
 │   ├── CalendarView (monthly, with activity dots)
 │   │   └── DayDetailPopover (entries for selected day)
 │   ├── HoursLogTable (sortable, filterable)
 │   │   └── HoursRow (date, activity, hours, status, actions)
 │   ├── LogHoursModal
 │   │   ├── ActivitySelect
 │   │   ├── DatePicker
 │   │   ├── TimeRange or DurationInput
 │   │   ├── DescriptionField (required, min 20)
 │   │   └── SubmitButton
 │   └── HoursStatusLegend

 ├── CommunityPage
 │   ├── CommunityTabs (Discussion, Events, Directory)
 │   ├── DiscussionSection
 │   │   ├── CategoryNav
 │   │   ├── PostList
 │   │   │   └── PostCard (title, author, category, likes, replies, date)
 │   │   ├── PostDetailView
 │   │   │   ├── PostContent (title, body, author with profile)
 │   │   │   ├── ReplyList
 │   │   │   │   └── ReplyItem (author, content, likes, date, reply button)
 │   │   │   └── ReplyForm (rich text, submit)
 │   │   └── NewPostModal (category, title, content)
 │   ├── EventsSection
 │   │   ├── EventCalendar / EventList
 │   │   │   └── EventCard (title, type, date, location, attendees, RSVP button)
 │   │   └── EventDetailModal (description, RSVP, attendees list)
 │   └── DirectorySection
 │       ├── DirectorySearch (skills, name)
 │       ├── VolunteerCardGrid
 │       │   └── VolunteerCard (photo, name, headline, skills, badges, hours, connect)
 │       └── VolunteerProfileModal
 │           ├── ProfileHeader (photo, name, headline, location)
 │           ├── BioSection
 │           ├── SkillsSection (with proficiency)
 │           ├── BadgesGrid
 │           ├── ImpactStats
 │           ├── Volunteering History
 │           └── Actions (Send Message, Connect)

 ├── CertificatesPage
 │   ├── CertificateFilters (category, date)
 │   ├── CertificateGrid
 │   │   └── CertificateCard (title, org, date, hours, badge preview, actions)
 │   ├── CertificateDetailView
 │   │   ├── CertificateDisplay (full digital certificate)
 │   │   ├── VerificationSection (code, QR code)
 │   │   ├── SkillsEndorsed
 │   │   └── Actions (Download, Share LinkedIn, Share Email, Verify)
 │   └── ShareModal (LinkedIn, Twitter, Email, Copy Link)

 └── ImpactDashboardPage
     ├── HeroCard
     │   ├── ImpactScore (large number with ring)
     │   ├── RankBadge (percentile)
     │   └── LevelDisplay (current level, XP bar to next)
     ├── StatCardsRow × 5 (icon, value, label)
     ├── HoursTrendChart (line chart, 12m)
     ├── CategoryBreakdownChart (donut)
     ├── BadgesSection
     │   ├── BadgesList (earned + locked)
     │   └── BadgeDetailPopover (name, description, earned date)
     ├── LeaderboardPanel
     │   ├── LeaderboardTable (rank, avatar, name, hours, points)
     │   └── CurrentUserHighlight
     ├── ActivityHistoryList (impact log)
     └── NextLevelCard (benefits preview)

Shared Components:
 ├── StatusBadge
 ├── Modal
 ├── ConfirmDialog
 ├── Toast
 ├── Skeleton
 ├── EmptyState
 ├── ErrorBoundary
 ├── DataTable
 ├── Pagination
 ├── SearchBar
 ├── Avatar
 ├── ProgressBar (linear + ring)
 ├── BadgeDisplay (icon + name)
 ├── LeaderboardRow
 ├── StatsCard
 ├── CalendarView
 └── LevelBadge (number + title)
```

## 7. Exhaustive User Journeys

### Journey 1: Volunteer Signs Up & Sets Up Profile

1. User navigates to `app.cea.io/volunteer/register`
2. Options: Sign up with email, Google, GitHub, or LinkedIn
3. Fills/imports: name, email, password, timezone, availability
4. Onboarding wizard:
   - Step 1: Tell us about you — headline, bio, phone (optional)
   - Step 2: Your skills — search and add from taxonomy, rate proficiency 1-5
   - Step 3: Your interests — select categories (mentoring, tutoring, events, etc.)
   - Step 4: How much time? — weekly max hours, availability pattern
   - Step 5: Browse recommended opportunities (based on skills + interests)
5. Completes → lands on `/volunteer/opportunities` with personalised recommendations
6. Welcome notification: "Welcome to the CEA Volunteer Community! Here are 5 opportunities matched to your skills."
7. **Branch: Social login** → profile fields pre-filled from provider

### Journey 2: Volunteer Finds & Applies to Opportunity

1. Volunteer browses opportunities on landing page
2. Uses filters: Category = "Mentoring", Commitment = "Ongoing", adds skill "Python"
3. 8 results → sorts by "Best Match"
4. Sees "Code Mentor — Python for Data Science" with match score 92%
5. Clicks card → OpportunityDetail:
   - Title: "Code Mentor — Python for Data Science"
   - Organisation: "CEA Data Science Programme"
   - Category: Mentoring
   - Commitment: Ongoing, 2 hours/week for 12 weeks
   - Location: Remote (video calls)
   - Description: "Help data science students debug code, review assignments, and provide career guidance"
   - Skills needed: Python (Advanced), Pandas (Intermediate), SQL (Intermediate)
   - Slots: 3 of 8 filled — "5 spots left"
6. Clicks [Apply Now]
7. Application form:
   - Motivation: "I've been a data scientist for 5 years and want to give back by helping the next generation."
   - Skills offered: selects Python (5), Pandas (4), SQL (4), Communication (5)
   - Availability: "Available Tuesday and Thursday evenings EST"
8. Submits → application status "Pending"
9. CEA reviews application → status → "Accepted" (in-app + email notification)
10. Opportunity appears in "My Volunteering" → "Upcoming" tab with welcome message and next steps

### Journey 3: Volunteer Logs Hours

1. Volunteer completes first mentoring session (2 hours)
2. Navigates to `/volunteer/hours`
3. Clicks [Log Hours]
4. Form:
   - Activity: "Code Mentor — Python for Data Science" (pre-selected from active)
   - Date: today (pre-filled)
   - Start time: 19:00, End time: 21:00
   - Duration: auto-calculated as 2.0 hours
   - Description: "Helped student debug pandas dataframe merge issue. Reviewed group project architecture. Discussed career path in data engineering."
5. Clicks [Submit] → hours logged with status "Pending"
6. Status indicator: yellow (pending approval)
7. Later, CEA admin approves → status → "Approved" (green)
8. If rejected → status "Rejected" with admin feedback: "Please provide more detail on mentoring topics covered" → volunteer edits entry and resubmits
9. Points awarded: 10 XP per approved hour logged

### Journey 4: Volunteer Engages in Community

1. Volunteer navigates to `/volunteer/community`
2. Browses Discussion Board → sees "Python debugging tips" post
3. Reads post → sees 5 replies → adds: "Great tips! I'd add that using breakpoints with pdb is much more efficient than print statements."
4. Clicks like on 2 useful replies
5. Then clicks [New Post] in "General" category:
   - Title: "Looking for co-mentors for advanced ML students"
   - Content: "I have 3 students ready to start ML projects. Looking for 2 more mentors with ML experience to join."
6. Posts → appears on board → other volunteers reply expressing interest
7. Checks [Events] tab → sees "Volunteer Social — End of Summer Celebration" on calendar
8. Clicks RSVP → "Going"
9. Checks [Directory] → searches "ML" → finds other ML-skilled volunteers
10. Clicks profile → sees common interests → sends connection request

### Journey 5: Volunteer Earns Certificate & Shares

1. Volunteer completes 12-week mentoring programme (24 hours total)
2. Marks activity as [Complete] → system checks hours requirement met
3. Certificate auto-generated:
   - Title: "Code Mentor — Python for Data Science"
   - Volunteer: "Alex Chen"
   - Hours: 24
   - Date: Aug 15, 2026
   - Certificate ID: `CERT-VOL-2026-0042`
   - Verification code: `VCEA-8X9M2K`
4. Notification: "Congratulations! You've earned a certificate for 'Code Mentor — Python for Data Science'."
5. Navigates to `/volunteer/certificates` → sees new certificate card
6. Clicks → CertificateDetail:
   - Beautiful digital certificate with CEA logo, volunteer name, hours, date
   - QR code for verification
   - Skills endorsed: Mentoring, Python, Communication
7. Clicks [Share on LinkedIn] → pre-populated post: "I'm proud to have completed 24 hours of mentoring with Cyber Elias Academy! #Volunteer #Mentoring #CEA"
8. Clicks [Share] → LinkedIn opens with post → publishes
9. Verifies certificate at `/volunteer/certificates/verify/VCEA-8X9M2K` → shows valid with details

### Journey 6: Volunteer Checks Impact Dashboard

1. Volunteer navigates to `/volunteer/impact`
2. Hero card:
   - Impact Score: 2,450
   - Rank: Top 22% of volunteers
   - Level: 4 "Community Contributor" — XP bar 450/800 to next level
3. Stats:
   - Total Hours: 48
   - People Helped: 12
   - Events Attended: 5
   - Skills Developed: 4
   - Community Points: 320
4. Hours Trend Chart: shows steady increase over 6 months, 48h total
5. Category Breakdown: 60% Mentoring, 25% Events, 15% Technical
6. Badges:
   - Earned: "First 10 Hours" (bronze), "Mentor Badge" (silver), "Community Connector" (gold)
   - Locked: "100 Hours Club" (platinum - 52 more hours needed), "Super Mentor" (10 mentees - 8 more needed)
7. Leaderboard: sees self at #18 this month, top volunteer has 32 hours
8. Next Level Benefits: "Level 5 unlocks: Priority opportunity matching, Exclusive volunteer events, Mentor badge upgrade"
9. Scrolls to Activity History: chronological log of all impact events with point values

### Journey 7: Volunteer Receives Badge & Levels Up

1. Volunteer crosses 50 total hours → system checks badge criteria
2. Notification: "New badge earned! 'Dedicated Volunteer' — Silver Tier. 50 hours of contribution."
3. Badge appears on Impact Dashboard with animation
4. XP is added → volunteer crosses XP threshold for Level 5
5. Celebration modal: "Congratulations! You've reached Level 5: Community Champion. New benefits unlocked!"
6. Level 5 benefits activate: priority matching, exclusive events access
7. Badge appears on profile, visible to others in directory

## 8. Business Rules Engine

### Rule Set 1: Opportunities & Applications

- **R1.1:** Opportunities with `filled_slots >= total_slots` auto-close (status = "filled")
- **R1.2:** One-time events with past `start_date` auto-close
- **R1.3:** Volunteers can apply to max 5 pending opportunities at a time
- **R1.4:** Match score = (skill overlap × 0.5) + (interest match × 0.3) + (availability match × 0.2)
- **R1.5:** Volunteers cannot apply to the same opportunity twice
- **R1.6:** Cancelled applications count toward the 5-application limit for 30 days

### Rule Set 2: Hours Tracking

- **R2.1:** Hours logged must be for activities with accepted application (except general hours)
- **R2.2:** Max 24 hours per entry; max 80 hours per week across all activities
- **R2.3:** Hours in the future cannot be logged (date must be ≤ today)
- **R2.4:** Hours > 7 days old cannot be edited (admin override possible)
- **R2.5:** Pending hours auto-approve after 72h if no admin action (for trusted volunteers)
- **R2.6:** Rejected hours can be edited and resubmitted within 14 days

### Rule Set 3: Certificates

- **R3.1:** Certificate auto-issued when volunteer completes required hours for an activity
- **R3.2:** Certificate verification codes are valid indefinitely
- **R3.3:** Certificate PDF includes: name, activity, hours, date, certificate ID, QR code
- **R3.4:** Minimum 10 hours required for a certificate (unless activity specifies otherwise)
- **R3.5:** Certificates can be regenerated (updated design) but verification code stays same

### Rule Set 4: Impact Score & Gamification

- **R4.1:** Impact score = (total approved hours × 10) + (badges × 50) + (community points) + (events attended × 20)
- **R4.2:** XP per action: log hour = 10, badge earned = 100, community post = 15, reply = 5, event attend = 20, complete programme = 50
- **R4.3:** XP required for level N = 100 × N × (1 + N × 0.1)
- **R4.4:** Streak: consecutive weeks with ≥ 2 hours logged. Resets after 2 weeks inactivity
- **R4.5:** Badge criteria are checked on every hour approval and every programme completion
- **R4.6:** Leaderboard resets monthly; rankings based on current month hours + points

### Rule Set 5: Community

- **R5.1:** Posts must be approved by community manager if user has < 50 impact score (anti-spam)
- **R5.2:** Reported posts (3+ reports) auto-hidden, reviewed by admin
- **R5.3:** Directory only shows active volunteers (hours logged in last 90 days)
- **R5.4:** Direct messages limited to connected volunteers or common activity participants

### Rule Set 6: Profile & Availability

- **R6.1:** Profile must have at least 3 skills and 1 interest to be visible in directory
- **R6.2:** Inactive volunteers (no hours in 6 months) are auto-set to inactive
- **R6.3:** Reactivation requires profile review and skill update

## 9. Notification Specifications

### N1: New Opportunity Match

- **Trigger:** New opportunity posted matching volunteer's skills/interests
- **Channel:** In-app + Email (weekly digest) or Push (if enabled)
- **Template:** "New opportunity matched: {{title}} at {{organisation}} — {{skills_needed}}"
- **Delivery:** Immediate for high match (>80%), weekly digest otherwise

### N2: Application Status Change

- **Trigger:** Volunteer's application accepted or rejected
- **Channel:** In-app + Email
- **Template (accepted):** "You've been accepted for {{opportunity_title}}! Check your dashboard for next steps."
- **Template (rejected):** "Your application for {{opportunity_title}} was not selected. Don't give up — explore other opportunities."
- **Delivery:** Immediate

### N3: Upcoming Session Reminder

- **Trigger:** 24 hours before scheduled volunteer session
- **Channel:** In-app + Email + Push
- **Template:** "Reminder: {{opportunity_title}} session tomorrow at {{time}}."
- **Delivery:** 24h and 1h before

### N4: Hours Approved

- **Trigger:** Logged hours approved by admin
- **Channel:** In-app
- **Template:** "{{duration_hours}} hours for {{opportunity_title}} approved! +{{xp}} XP"
- **Delivery:** Immediate

### N5: Hours Rejected

- **Trigger:** Logged hours rejected
- **Channel:** In-app + Email
- **Template:** "Your hours entry for {{date}} was rejected: {{reason}}. Please edit and resubmit."
- **Delivery:** Immediate

### N6: Certificate Earned

- **Trigger:** Certificate issued
- **Channel:** In-app + Email
- **Template:** "Congratulations! You've earned a certificate: {{certificate_title}}. [View Certificate]"
- **Delivery:** Immediate

### N7: Badge Earned

- **Trigger:** Badge criteria met
- **Channel:** In-app (modal)
- **Template:** "New badge: {{badge_name}}! {{description}}"
- **Delivery:** Immediate with celebration animation

### N8: Level Up

- **Trigger:** XP threshold crossed for next level
- **Channel:** In-app (celebration modal)
- **Template:** "Level Up! You're now Level {{level}}: {{title}}. New benefits unlocked!"
- **Delivery:** Immediate

### N9: Community Post Reply

- **Trigger:** Someone replies to volunteer's post
- **Channel:** In-app
- **Template:** "{{replier_name}} replied to your post '{{post_title}}'."
- **Delivery:** Immediate

### N10: Streak Milestone

- **Trigger:** Volunteer reaches 4, 8, 12, 26, 52 week streak
- **Channel:** In-app
- **Template:** "{{weeks}}-week volunteer streak! You've been consistently making a difference."
- **Delivery:** On milestone

## 10. Permission Matrix

| Entity                   | Volunteer          | Volunteer Admin (CEA) | Community Manager (CEA) | System Admin |
| ------------------------ | ------------------ | --------------------- | ----------------------- | ------------ |
| **Volunteer Profile**    | CRUD own           | CRUD                  | R                       | CRUD         |
| **Skills & Interests**   | CRUD own           | CRUD                  | R                       | CRUD         |
| **Opportunities**        | R                  | CRUD                  | CRUD                    | CRUD         |
| **Applications**         | CRUD own           | CRUD                  | CRUD                    | CRUD         |
| **Hours**                | CRUD own (pending) | CRUD                  | CRUD                    | CRUD         |
| **Hours Approval**       | —                  | CRUD                  | CRUD                    | CRUD         |
| **Certificates**         | R own              | CRUD                  | R                       | CRUD         |
| **Badges**               | R own              | CRUD                  | CRUD                    | CRUD         |
| **Community Posts**      | CRUD own           | CRUD                  | CRUD                    | CRUD         |
| **Community Moderation** | —                  | CRUD                  | CRUD                    | CRUD         |
| **Community Events**     | R, RSVP            | CRUD                  | CRUD                    | CRUD         |
| **Impact Dashboard**     | R own              | R                     | R                       | R            |
| **Leaderboard**          | R                  | R                     | R                       | R            |
| **Directory**            | R                  | R                     | R                       | R            |
| **Messages**             | CRUD own           | CRUD                  | CRUD                    | CRUD         |

## 11. State Management

```typescript
const volunteerApi = createApi({
  reducerPath: "volunteerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/volunteer" }),
  tagTypes: ["Opportunities", "MyActivities", "Hours", "Community", "Certificates", "Impact"],
  endpoints: (builder) => ({
    getOpportunities: builder.query<OpportunityListResponse, OpportunityListQuery>({
      query: (params) => ({ url: "/opportunities", params }),
      providesTags: ["Opportunities"],
    }),
    getOpportunity: builder.query<OpportunityDetail, string>({
      query: (id) => `/opportunities/${id}`,
    }),
    applyToOpportunity: builder.mutation<CreatedResponse, { id: string; body: ApplyBody }>({
      query: ({ id, body }) => ({ url: `/opportunities/${id}/apply`, method: "POST", body }),
      invalidatesTags: ["Opportunities", "MyActivities"],
    }),
    getMyActivities: builder.query<ActivityListResponse, ActivityListQuery>({
      query: (params) => ({ url: "/my-activities", params }),
      providesTags: ["MyActivities"],
    }),
    getHours: builder.query<HoursListResponse, HoursListQuery>({
      query: (params) => ({ url: "/hours", params }),
      providesTags: ["Hours"],
    }),
    logHours: builder.mutation<CreatedResponse, LogHoursBody>({
      query: (body) => ({ url: "/hours", method: "POST", body }),
      invalidatesTags: ["Hours", "Impact"],
      optimisticUpdate: true,
    }),
    getImpact: builder.query<ImpactResponse, void>({
      query: () => "/impact",
      providesTags: ["Impact"],
    }),
    getCertificates: builder.query<CertificateListResponse, CertificateListQuery>({
      query: (params) => ({ url: "/certificates", params }),
      providesTags: ["Certificates"],
    }),
    getCommunityPosts: builder.query<CommunityPostListResponse, CommunityPostListQuery>({
      query: (params) => ({ url: "/community/posts", params }),
      providesTags: ["Community"],
    }),
    createPost: builder.mutation<CreatedResponse, CreatePostBody>({
      query: (body) => ({ url: "/community/posts", method: "POST", body }),
      invalidatesTags: ["Community"],
    }),
    replyToPost: builder.mutation<CreatedResponse, { id: string; body: { content: string } }>({
      query: ({ id, body }) => ({ url: `/community/posts/${id}/reply`, method: "POST", body }),
      invalidatesTags: ["Community"],
    }),
    rsvpEvent: builder.mutation<{ status: string }, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/community/events/${id}/rsvp`,
        method: "POST",
        body: { status },
      }),
      invalidatesTags: ["Community"],
    }),
    completeActivity: builder.mutation<{ status: string }, string>({
      query: (id) => ({ url: `/my-activities/${id}/complete`, method: "POST" }),
      invalidatesTags: ["MyActivities", "Certificates", "Impact"],
    }),
  }),
});
```

## 12. Form Schemas (Zod)

### Volunteer Profile Setup

```typescript
export const volunteerProfileSchema = z.object({
  headline: z.string().max(255).optional(),
  bio: z.string().max(2000).optional(),
  phone: z.string().optional(),
  timezone: z.string().default("UTC"),
  availability: z.enum(["weekdays", "weekends", "evenings", "flexible"]).optional(),
  maxCommitmentHoursWeek: z.number().int().min(1).max(80).optional(),
  skills: z
    .array(
      z.object({
        skillId: z.string().uuid(),
        proficiency: z.number().int().min(1).max(5),
        isFeatured: z.boolean().default(false),
      }),
    )
    .min(3, "Add at least 3 skills"),
  interests: z
    .array(
      z.enum([
        "mentoring",
        "tutoring",
        "events",
        "content",
        "technical",
        "admin",
        "outreach",
        "research",
        "fundraising",
        "other",
      ]),
    )
    .min(1, "Select at least 1 interest"),
});
```

### Volunteer Application

```typescript
export const volunteerApplicationSchema = z.object({
  motivationStatement: z
    .string()
    .min(20, "Share why you want to volunteer (min 20 chars)")
    .max(2000),
  skillsOffered: z.array(z.string()).min(1, "Select at least 1 skill you can offer"),
  availabilityNotes: z.string().max(500).optional(),
});
```

### Log Hours

```typescript
export const logHoursSchema = z
  .object({
    opportunityId: z.string().uuid(),
    applicationId: z.string().uuid().optional(),
    activityDate: z.string().datetime("Select a date"),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    durationHours: z.number().positive("Hours must be positive").max(24, "Max 24 hours per entry"),
    description: z.string().min(20, "Describe what you did (min 20 chars)").max(2000),
  })
  .refine(
    (data) => {
      if (data.startTime && data.endTime) {
        return data.startTime < data.endTime;
      }
      return true;
    },
    { message: "End time must be after start time", path: ["endTime"] },
  );
```

### Community Post

```typescript
export const communityPostSchema = z.object({
  category: z.enum([
    "general",
    "mentoring_tips",
    "technical_help",
    "events",
    "recognition",
    "other",
  ]),
  title: z.string().min(5, "Title required (min 5 chars)").max(500),
  content: z.string().min(20, "Content too short (min 20 chars)").max(10000),
});
```

### Community Reply

```typescript
export const communityReplySchema = z.object({
  content: z.string().min(1, "Reply cannot be empty").max(5000),
  parentId: z.string().uuid().optional(),
});
```

### Activity Review/Rating

```typescript
export const activityReviewSchema = z.object({
  rating: z.number().int().min(1, "Rate 1-5").max(5),
  review: z.string().max(2000).optional(),
});
```

## 13. Analytics Events

| Event                     | Properties                                         | Destination         |
| ------------------------- | -------------------------------------------------- | ------------------- |
| `volunteer_register`      | `{ signup_method, skills_count, interests_count }` | Amplitude           |
| `profile_completed`       | `{ skills_count, has_bio, has_photo }`             | Amplitude           |
| `opportunity_browsed`     | `{ filters_applied, result_count }`                | Amplitude           |
| `opportunity_viewed`      | `{ opportunity_id, category, match_score }`        | Amplitude           |
| `opportunity_applied`     | `{ opportunity_id, category, commitment_type }`    | Amplitude           |
| `opportunity_saved`       | `{ opportunity_id }`                               | Amplitude           |
| `application_accepted`    | `{ opportunity_id, response_time_hours }`          | Amplitude           |
| `hours_logged`            | `{ hours, opportunity_id, status: 'pending' }`     | Amplitude           |
| `hours_approved`          | `{ hours, opportunity_id }`                        | Amplitude           |
| `hours_rejected`          | `{ hours, reason_category }`                       | Amplitude           |
| `session_completed`       | `{ opportunity_id, hours_total }`                  | Amplitude           |
| `certificate_earned`      | `{ certificate_id, hours_completed }`              | Amplitude, LinkedIn |
| `certificate_shared`      | `{ platform: 'linkedin'                            | 'twitter'           | 'email' }` | Amplitude |
| `badge_earned`            | `{ badge_code, badge_tier }`                       | Amplitude           |
| `level_up`                | `{ new_level, total_xp }`                          | Amplitude           |
| `impact_dashboard_viewed` | `{ current_level, total_hours }`                   | Amplitude           |
| `community_post_created`  | `{ category, has_image }`                          | Amplitude           |
| `community_reply_created` | `{ is_thread_reply }`                              | Amplitude           |
| `community_event_rsvp`    | `{ event_type, status: 'going'                     | 'maybe' }`          | Amplitude  |
| `profile_viewed`          | `{ viewer_is_connected }`                          | Amplitude           |
| `message_sent`            | `{ recipient_type: 'volunteer'                     | 'admin' }`          | Amplitude  |
| `directory_searched`      | `{ search_query, result_count }`                   | Amplitude           |

## 14. Accessibility Requirements

### Screen Reader

- Impact score: `role="meter"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax`
- Progress bars: `role="progressbar"` with `aria-valuenow` and `aria-valuetext`
- Badge grid: `role="list"`, each badge `role="listitem"` with `aria-label="Badge: {{name}}"` and `aria-label="{{status}}"` (earned/locked)
- Leaderboard: `role="table"`, `aria-label="Volunteer leaderboard"`
- Calendar: `role="grid"`, `aria-label="Hours calendar"`
- Hours log: table with proper `<th>` scopes
- Community posts: `role="article"` per post

### Keyboard Navigation

- Opportunity cards: Tab to card → Enter to view detail
- Calendar: Arrow keys to navigate days, Enter to select day, Esc to close popover
- Hours log: Tab to row → Enter to edit
- Community: Tab between posts, Enter to open, Arrow keys in reply tree
- Badge grid: Arrow keys to navigate, Enter to show detail popover
- All modals: Esc to close, Tab cycle

### Focus Management

- Page nav → focus to page title `<h1>`
- Modal open → focus to first interactive element (close button or primary action)
- Modal close → return focus to trigger element
- Toast: `role="alert"`, non-intrusive
- Application submit: focus to confirmation message
- Level up/badge earned: focus to celebration modal close button

### Colour & Contrast

- Badge tiers distinguishable by icon variations + tier number + colour
- Impact score uses patterns + labels
- Status colours have text labels (pending = "Pending", approved = "Approved", rejected = "Rejected")
- WCAG 2.1 AA contrast throughout

## 15. Error & Edge Case Catalog

### E1: Opportunity No Longer Available

- **Condition:** Volunteer clicks [Apply] on opportunity that was filled or closed
- **Response:** "This opportunity is no longer accepting applications ({{status}})."
- **Recovery:** Show similar opportunities; auto-search with same filters

### E2: Duplicate Application

- **Condition:** Volunteer tries to apply to same opportunity twice
- **Response:** "You've already applied to this opportunity. Current status: {{status}}."
- **Recovery:** Show existing application status; link to My Volunteering

### E3: Max Pending Applications Reached

- **Condition:** Volunteer has 5 pending applications, tries to apply to another
- **Response:** "You have 5 pending applications. Please wait for responses or cancel a pending application before applying to more."
- **Recovery:** List pending applications with cancel option

### E4: Hours Logged in Future

- **Condition:** Volunteer enters a future date for hours
- **Response:** "Cannot log hours for future dates. Please select today or a past date."
- **Recovery:** Reset date to today

### E5: Hours Exceed Max

- **Condition:** Volunteer enters > 24 hours in single entry
- **Response:** "Maximum 24 hours per entry."
- **Recovery:** Clamp at 24, show warning

### E6: Hours Edit Window Expired

- **Condition:** Volunteer tries to edit hours entry > 7 days old
- **Response:** "Hours entries cannot be edited after 7 days. Contact support if you need to make changes."
- **Recovery:** Show contact support link; admin override available

### E7: Certificate Generation Failed

- **Condition:** PDF generation service fails
- **Response:** "Certificate generation in progress. You'll be notified when it's ready."
- **Recovery:** Background retry; push notification when complete

### E8: Community Post Pending Approval

- **Condition:** Volunteer with low impact score posts to community
- **Response:** "Your post has been submitted and will be visible once approved by a community manager."
- **Recovery:** Show pending badge; notify when approved

### E9: Community Event Full

- **Condition:** Volunteer tries to RSVP "Going" to full event
- **Response:** "This event is at full capacity. You've been added to the waitlist."
- **Recovery:** Waitlist position shown; notification if spot opens

### E10: Directory Profile Hidden

- **Condition:** Volunteer has < 3 skills, not visible in directory
- **Response:** "Your profile is not yet visible in the volunteer directory. Add at least 3 skills to become discoverable."
- **Recovery:** Link to profile edit with skill section highlighted

### E11: Session Reminder Not Sent

- **Condition:** Volunteer has no upcoming sessions scheduled
- **Response:** No reminder needed
- **Recovery:** Show "No upcoming sessions" with link to opportunities

### E12: Impact Data Stale

- **Condition:** Impact dashboard data > 1 hour old
- **Response:** Subtle badge: "Data may be delayed. Last updated: {{time}}."
- **Recovery:** Auto-refresh on focus

### E13: Login Without Complete Profile

- **Condition:** Volunteer logs in but hasn't completed onboarding
- **Response:** Redirect to onboarding wizard with progress indicator "Step X of 4"
- **Recovery:** Can dismiss for 24h, but limited access to certain features until complete

### E14: Streak Lost

- **Condition:** Volunteer misses 2 consecutive weeks
- **Response:** Notification: "Your {{weeks}}-week streak has ended. But every hour counts — start a new streak today!"
- **Recovery:** Reset streak counter; show longest streak for motivation

### E15: Badge Criteria Not Met

- **Condition:** Volunteer views locked badge requirements
- **Response:** "{{badge_name}} — {{criteria_description}}. You're {{progress}}% there. Keep going!"
- **Recovery:** Show specific progress toward each criterion
