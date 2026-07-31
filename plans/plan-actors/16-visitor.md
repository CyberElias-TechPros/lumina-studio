# Actor: Visitor

## 1. Identity & Role Definition

- **Actor ID**: `visitor`
- **Display Name**: Visitor
- **Description**: An individual visiting the Cyber Elias Academy campus for tours, events, meetings, or other purposes. Visitors interact with the system primarily for check-in, campus information, and feedback. This actor includes prospective students, parents, guest speakers, vendor representatives, and community members.
- **User Type**: `visitor` in `users.role` enum (or unauthenticated for self-service check-in)
- **Auth Level**: Mixed — some functions require account (visit scheduling), others are public (campus map, brochure). QR check-in can be anonymous.
- **Onboarding**: Pre-registration via web form or on-site self-service kiosk.
- **Visit Purposes**: Campus tour, Event attendance, Meeting with staff, Guest lecture, Drop-in

---

## 2. Primary Goals & Success KPIs

| Goal                                 | KPI                           | Measurement                                      |
| ------------------------------------ | ----------------------------- | ------------------------------------------------ |
| Schedule a campus visit easily       | Visit booking completion rate | `visits_scheduled / visit_form_starts * 100`     |
| Quick and smooth check-in process    | Average check-in time         | Minutes from QR scan to badge print              |
| Navigate campus confidently          | Wayfinding success rate       | `arrivals_at_destination / total_visitors * 100` |
| Learn about the academy              | Brochure engagement rate      | `brochure_sections_viewed / total_sections`      |
| Provide feedback on visit experience | Feedback submission rate      | `feedbacks_submitted / visits_completed * 100`   |
| Feel welcomed and secure             | Satisfaction score            | Post-visit survey average (1–5)                  |

---

## 3. Complete Screen Inventory

### 3.1 Visit Request Screen

**Wireframe**: Multi-step form wizard. Step 1: Personal Details. Step 2: Visit Details. Step 3: Confirmation. Progress indicator at top.

**UI Fields / Components**:

- `StepIndicator` — 3-step progress bar with labels: "Your Info" → "Visit Details" → "Confirm"
- `PersonalDetailsStep` — Fields: `firstName` (text, required), `lastName` (text, required), `email` (email, required), `phone` (tel, required), `company` (text, optional), `idType` (dropdown: "Driver's License / Passport / Other"), `idNumber` (text, optional), `photoConsent` (checkbox: "I consent to having my photo taken for security purposes")
- `VisitDetailsStep` — Fields: `visitDate` (date picker, required, future dates only), `visitTime` (time picker, required, within campus hours 8am–6pm), `purpose` (dropdown: "Campus Tour / Event / Meeting / Guest Lecture / Drop-in / Other"), `purposeOther` (text, visible when Other selected), `hostName` (text, optional — who they're meeting), `hostDepartment` (dropdown, optional), `expectedDuration` (dropdown: "30min / 1hr / 2hr / 4hr / Full day"), `numberOfGuests` (number, min 1, max 20), `specialRequirements` (textarea, optional — accessibility, equipment, etc.)
- `ConfirmationStep` — Review display of all entered info, editable via "Edit" links per section
- `TermsCheckbox` — "I agree to the campus visitor policy and code of conduct" (required)
- `SubmitButton` — "Submit Visit Request"
- `SuccessState` — After submit: confirmation card with `visitReference`, `qrcode` (SVG for check-in), `confirmationEmail` indicator, `addToCalendar` button

**Data Bindings**:

- `POST /api/visitor/visits` — create visit request
- `GET /api/visitor/visits/:reference` — lookup visit by reference
- `POST /api/visitor/visits/:id/cancel` — cancel visit
- `POST /api/visitor/visits/:id/reschedule` — change date/time

**States**:

- **Loading**: Form skeleton with step indicator
- **Success**: Confirmation card with QR code, reference number, email sent notice
- **Error**: Validation errors inline, submission failed with retry
- **Edge — Date is holiday**: Show "Campus is closed on {date}. Please select another date."
- **Edge — Time outside hours**: "Visits are available between 8:00 AM and 6:00 PM."
- **Edge — Same-day booking cut-off**: "Same-day bookings must be made at least 2 hours before arrival."
- **Edge — Max guests exceeded**: "Maximum 20 guests per visit. For larger groups, contact events@cyberelias.academy"

### 3.2 QR Check-In Screen

**Wireframe**: Two views: (A) Pre-registered visitor scans QR from email → confirmation. (B) Walk-in visitor uses self-service kiosk with form. Camera scanner viewfinder.

**UI Fields / Components**:

- `CameraScanner` — Full-screen camera viewfinder with scanning overlay, `aria-label="QR Code Scanner"`, auto-detects QR code
- `ManualCodeInput` — Fallback: text input for 8-character reference code, "Look Up" button
- `CheckInResult` — On successful scan: `greeting` ("Welcome, {firstName}!"), `visitDetails` summary, `hostInfo` (name, department, location), `badgePrintButton` ("Print Visitor Badge"), `campusMapLink`, `wifiCredentials`, `emergencyProceduresLink`
- `WalkInForm` — For unregistered visitors: same fields as visit request but simplified (name, email, phone, purpose, host, photo capture)
- `PhotoCapture` — Webcam selfie capture for badge, with retake option
- `BadgePreview` — Digital preview of printed badge: photo, name, host, visit date, "VISITOR" label, expiry time
- `CheckInHistory` — List of past check-ins with date, host, duration
- `HostNotificationStatus` — "Your host has been notified" with SMS/email confirmation

**Data Bindings**:

- `GET /api/visitor/check-in/:reference` — lookup by reference
- `POST /api/visitor/check-in` — perform check-in (with reference or walk-in data)
- `POST /api/visitor/check-in/walk-in` — create + check-in in one step
- `POST /api/visitor/check-out` — check out
- `POST /api/visitor/badge/generate` — generate badge PDF
- `POST /api/visitor/photo` — upload visitor photo

**States**:

- **Loading (scanner)**: Camera permission request, "Accessing camera..."
- **Empty — No pending visits**: "No upcoming visits found. Would you like to schedule a visit?" with link
- **Success — Checked in**: "You're checked in! Your host has been notified."
- **Error — Invalid QR**: "Invalid QR code. Please try again or enter your reference code manually."
- **Error — Camera denied**: "Camera access denied. Please enter your reference code manually."
- **Error — Already checked in**: "You are already checked in for this visit."
- **Error — Visit cancelled**: "This visit has been cancelled. Please contact your host."
- **Edge — QR code expired (older than visit date)**: "This QR code has expired. Please schedule a new visit."
- **Edge — Early check-in (> 30 min early)**: "You're early! Please wait in the lobby or explore the campus map."
- **Edge — Late check-in (> 30 min late)**: Host notified of late arrival, badge still printed
- **Edge — No photo captured**: Badge prints with "NO PHOTO" placeholder

### 3.3 Digital Brochure / Campus Map Screen

**Wireframe**: Interactive campus map with labeled buildings, expandable sections. Brochure content in side panel.

**UI Fields / Components**:

- `CampusMap` — SVG/Canvas interactive map. Buildings as clickable polygons. Markers for: Reception, Classrooms, Labs, Library, Cafeteria, Parking, Restrooms, Emergency exits, AED locations
- `MapControls` — Zoom in/out buttons, fullscreen toggle, "Find my location" (GPS), floor selector (if multi-story)
- `BuildingInfoPanel` — Slide-in panel on building click: `buildingName`, `photo`, `description`, `departments housed`, `room numbers`, `amenities`, `photo gallery`
- `BrochureSidebar` — Accordion sections: `About CEA`, `Programs Offered`, `Faculty`, `Facilities`, `Student Life`, `Admissions`, `Contact`
- `BrochureSection` — Rich content: text, images, videos, stats, testimonials
- `SearchCampusInput` — Search buildings, rooms, departments by name
- `DirectionsPanel` — From current location (or selected start) to selected destination with text directions
- `EmergencyInfoBanner` — Sticky banner: emergency contact numbers, "In case of emergency dial 911, campus security: +1234567890"
- `LanguageSelector` — Dropdown: English / French / Spanish (content translations)
- `DownloadPDFButton` — Download campus map and brochure as PDF

**Data Bindings**:

- `GET /api/visitor/campus-map` — building + map data
- `GET /api/visitor/brochure` — brochure sections content
- `GET /api/visitor/brochure/:sectionId` — specific section
- `GET /api/visitor/directions?from=X&to=Y` — directions data
- `GET /api/visitor/brochure/download` — generate PDF download URL

**States**:

- **Loading**: Map skeleton with building outlines animating in
- **Empty**: Brochure content not available (rare — fallback message)
- **Error**: "Map unavailable. Please ask reception for a printed map." with fallback link
- **Edge — No GPS access**: Show "Enable location for directions" or manual start selection
- **Edge — Building under construction**: Label "Under Construction — Access restricted" on map, alternative routes
- **Edge — Very large campus**: Virtualized map loading with level-of-detail rendering

### 3.4 Feedback Screen

**Wireframe**: One-page feedback form with rating section, text fields, and submit. Optional photo upload.

**UI Fields / Components**:

- `VisitSelector` — Dropdown pre-filled with recent visits, or "General Feedback" option
- `OverallRating` — 5-star rating component with `aria-label="Overall rating"`
- `CategoryRatings` — Row of rating cards: `receptionExperience` (stars), `campusCleanliness` (stars), `staffFriendliness` (stars), `facilityQuality` (stars), `safety` (stars)
- `DetailedFeedback` — Textarea: "Tell us about your experience" (max 2000 chars)
- `HighlightsInput` — Text: "What did you enjoy most?" (max 500 chars)
- `ImprovementsInput` — Text: "What could we improve?" (max 500 chars)
- `PhotoUpload` — Dropzone for up to 3 photos (max 5MB each, JPG/PNG/HEIC)
- `RecommendToggle` — "Would you recommend CEA to others?" Yes/No toggle with follow-up text field if No
- `ContactPermission` — Checkbox: "May we contact you about your feedback?"
- `AnonymousToggle` — Switch: "Submit anonymously"
- `SubmitButton` — "Submit Feedback"
- `ThankYouScreen` — Post-submit: "Thank you for your feedback!" with "Visit Again" and "Learn More" CTAs

**Data Bindings**:

- `POST /api/visitor/feedback` — submit feedback
- `GET /api/visitor/feedback/visits` — list of completed visits for dropdown
- `POST /api/visitor/feedback/photo` — upload feedback photo (multipart)

**States**:

- **Loading**: Form skeleton
- **Empty — No completed visits**: "No completed visits to select. You can still leave general feedback."
- **Success**: "Thank you for your feedback!" with confetti animation
- **Error**: "Failed to submit feedback. Please try again." with retry
- **Edge — Already submitted for visit**: "Feedback already submitted for this visit. You can edit it below." with edit form
- **Edge — File too large**: "Photo exceeds 5MB limit. Please compress and retry."
- **Edge — Profanity detected**: Warning: "Please keep feedback respectful. Inappropriate language may be flagged."

---

## 4. Full Database Schema

```typescript
// ---- drizzle/schema/visitor.ts ----

import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./users";

// ──────────────────────────────────────────────
// VISITORS (for tracked/registered visitors)
// ──────────────────────────────────────────────
export const visitors = sqliteTable("visitors", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  idType: text("id_type", { enum: ["drivers_license", "passport", "other"] }),
  idNumber: text("id_number"),
  photoConsent: integer("photo_consent", { mode: "boolean" }).notNull().default(false),
  photoUrl: text("photo_url"),
  isBlacklisted: integer("is_blacklisted", { mode: "boolean" }).notNull().default(false),
  blacklistReason: text("blacklist_reason"),
  totalVisits: integer("total_visits").notNull().default(0),
  lastVisitDate: text("last_visit_date"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// VISIT REQUESTS
// ──────────────────────────────────────────────
export const visitRequests = sqliteTable("visit_requests", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  visitorId: text("visitor_id")
    .notNull()
    .references(() => visitors.id, { onDelete: "cascade" }),
  referenceCode: text("reference_code").notNull().unique(),
  visitDate: text("visit_date").notNull(),
  visitTime: text("visit_time").notNull(),
  purpose: text("purpose", {
    enum: ["campus_tour", "event", "meeting", "guest_lecture", "drop_in", "other"],
  }).notNull(),
  purposeOther: text("purpose_other"),
  hostName: text("host_name"),
  hostDepartment: text("host_department"),
  hostUserId: text("host_user_id").references(() => users.id),
  expectedDuration: text("expected_duration", { enum: ["30min", "1hr", "2hr", "4hr", "full_day"] })
    .notNull()
    .default("1hr"),
  numberOfGuests: integer("number_of_guests").notNull().default(1),
  specialRequirements: text("special_requirements"),
  status: text("status", {
    enum: ["pending", "confirmed", "checked_in", "checked_out", "cancelled", "no_show", "expired"],
  })
    .notNull()
    .default("pending"),
  qrCodeData: text("qr_code_data"),
  agreedToPolicy: integer("agreed_to_policy", { mode: "boolean" }).notNull().default(false),
  confirmationSent: integer("confirmation_sent", { mode: "boolean" }).notNull().default(false),
  reminderSent: integer("reminder_sent", { mode: "boolean" }).notNull().default(false),
  checkedInAt: text("checked_in_at"),
  checkedOutAt: text("checked_out_at"),
  cancelledAt: text("cancelled_at"),
  cancelReason: text("cancel_reason"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// CHECK-IN LOGS
// ──────────────────────────────────────────────
export const checkInLogs = sqliteTable("check_in_logs", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  visitRequestId: text("visit_request_id").references(() => visitRequests.id, {
    onDelete: "set null",
  }),
  visitorId: text("visitor_id")
    .notNull()
    .references(() => visitors.id, { onDelete: "cascade" }),
  method: text("method", {
    enum: ["qr_code", "manual_code", "walk_in_kiosk", "staff_check_in"],
  }).notNull(),
  badgePrinted: integer("badge_printed", { mode: "boolean" }).notNull().default(false),
  badgePrintTime: text("badge_print_time"),
  photoCaptured: integer("photo_captured", { mode: "boolean" }).notNull().default(false),
  hostNotified: integer("host_notified", { mode: "boolean" }).notNull().default(false),
  hostNotificationSentAt: text("host_notification_sent_at"),
  checkedInAt: text("checked_in_at")
    .notNull()
    .default(sql`current_timestamp`),
  checkedOutAt: text("checked_out_at"),
  checkOutMethod: text("check_out_method", { enum: ["automatic", "manual", "staff_override"] }),
  createdBy: text("created_by").references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// CAMPUS MAP / BUILDINGS
// ──────────────────────────────────────────────
export const campusBuildings = sqliteTable("campus_buildings", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  shortName: text("short_name"), // e.g., "Bldg A"
  description: text("description"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  mapPolygonCoords: text("map_polygon_coords"), // JSON array of lat/lng pairs
  floorCount: integer("floor_count").notNull().default(1),
  imageUrl: text("image_url"),
  amenities: text("amenities"), // JSON array
  departments: text("departments"), // JSON array
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  isUnderConstruction: integer("is_under_construction", { mode: "boolean" })
    .notNull()
    .default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const campusRooms = sqliteTable("campus_rooms", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  buildingId: text("building_id")
    .notNull()
    .references(() => campusBuildings.id, { onDelete: "cascade" }),
  name: text("name").notNull(), // e.g., "Room 204"
  floor: integer("floor").notNull().default(1),
  roomType: text("room_type", {
    enum: ["classroom", "lab", "office", "auditorium", "common_area", "restroom", "other"],
  }).notNull(),
  capacity: integer("capacity"),
  facilities: text("facilities"), // JSON array
  isAccessible: integer("is_accessible", { mode: "boolean" }).notNull().default(false),
  latitude: real("latitude"),
  longitude: real("longitude"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const campusAmenities = sqliteTable("campus_amenities", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type", {
    enum: [
      "parking",
      "entrance",
      "cafeteria",
      "restroom",
      "emergency_exit",
      "aed",
      "information",
      "atm",
      "water_fountain",
      "elevator",
      "staircase",
    ],
  }).notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  buildingId: text("building_id").references(() => campusBuildings.id),
  description: text("description"),
  iconName: text("icon_name"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// DIGITAL BROCHURE
// ──────────────────────────────────────────────
export const brochureSections = sqliteTable("brochure_sections", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(), // Rich HTML/markdown
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  sortOrder: integer("sort_order").notNull().default(0),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const brochureTranslations = sqliteTable("brochure_translations", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  sectionId: text("section_id")
    .notNull()
    .references(() => brochureSections.id, { onDelete: "cascade" }),
  language: text("language", { enum: ["en", "fr", "es"] }).notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// FEEDBACK
// ──────────────────────────────────────────────
export const visitorFeedback = sqliteTable("visitor_feedback", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  visitorId: text("visitor_id").references(() => visitors.id, { onDelete: "set null" }),
  visitRequestId: text("visit_request_id").references(() => visitRequests.id, {
    onDelete: "set null",
  }),
  overallRating: integer("overall_rating").notNull(), // 1-5
  receptionExperience: integer("reception_experience"), // 1-5
  campusCleanliness: integer("campus_cleanliness"), // 1-5
  staffFriendliness: integer("staff_friendliness"), // 1-5
  facilityQuality: integer("facility_quality"), // 1-5
  safety: integer("safety"), // 1-5
  detailedFeedback: text("detailed_feedback"),
  highlights: text("highlights"),
  improvements: text("improvements"),
  photoUrls: text("photo_urls"), // JSON array
  wouldRecommend: text("would_recommend", { enum: ["yes", "no", "unsure"] }),
  recommendReason: text("recommend_reason"),
  contactPermission: integer("contact_permission", { mode: "boolean" }).notNull().default(false),
  isAnonymous: integer("is_anonymous", { mode: "boolean" }).notNull().default(false),
  isFlagged: integer("is_flagged", { mode: "boolean" }).notNull().default(false),
  flagReason: text("flag_reason"),
  status: text("status", { enum: ["published", "archived", "flagged"] })
    .notNull()
    .default("published"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// VISITOR BLACKLIST
// ──────────────────────────────────────────────
export const visitorBlacklist = sqliteTable("visitor_blacklist", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  visitorId: text("visitor_id")
    .notNull()
    .references(() => visitors.id, { onDelete: "cascade" }),
  reason: text("reason").notNull(),
  flaggedBy: text("flagged_by")
    .notNull()
    .references(() => users.id),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  liftedAt: text("lifted_at"),
  liftedBy: text("lifted_by").references(() => users.id),
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

### 5.1 Visit Requests

```typescript
// POST /api/visitor/visits
// Auth: Optional (can be anonymous)
// Body:
interface CreateVisitRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  idType?: string;
  idNumber?: string;
  photoConsent: boolean;
  visitDate: string;
  visitTime: string;
  purpose: "campus_tour" | "event" | "meeting" | "guest_lecture" | "drop_in" | "other";
  purposeOther?: string;
  hostName?: string;
  hostDepartment?: string;
  expectedDuration: string;
  numberOfGuests: number;
  specialRequirements?: string;
  agreedToPolicy: boolean;
}
// Response 201:
interface CreateVisitResponse {
  id: string;
  referenceCode: string;
  qrCodeData: string; // Base64 SVG
  status: "pending";
  confirmationEmailSent: boolean;
  visitDate: string;
  visitTime: string;
}

// GET /api/visitor/visits/:reference
// Response 200: VisitRequest with visitor info
// 404: Visit not found

// POST /api/visitor/visits/:id/cancel
// Body: { reason?: string }
// Response 200: { status: 'cancelled'; cancelledAt: string }
// 400: Cannot cancel checked-in visit

// POST /api/visitor/visits/:id/reschedule
// Body: { visitDate: string; visitTime: string }
// Response 200: { status: 'confirmed'; visitDate: string; visitTime: string }
```

### 5.2 Check-In

```typescript
// GET /api/visitor/check-in/:reference
// Response 200:
interface CheckInLookupResponse {
  valid: boolean;
  visit: {
    id: string;
    referenceCode: string;
    firstName: string;
    lastName: string;
    visitDate: string;
    visitTime: string;
    purpose: string;
    hostName: string | null;
    hostDepartment: string | null;
    status: string;
    numberOfGuests: number;
  } | null;
  message: string | null;
}

// POST /api/visitor/check-in
// Body:
interface CheckInRequest {
  referenceCode: string;
  method: "qr_code" | "manual_code";
  photo?: string; // base64 image
}
// Response 200:
interface CheckInResponse {
  id: string;
  visitorName: string;
  visitDate: string;
  visitTime: string;
  hostName: string | null;
  hostDepartment: string | null;
  checkedInAt: string;
  badgeData: { printUrl: string; previewUrl: string };
  wifiCredentials: { ssid: string; password: string };
  emergencyContact: string;
}
// 404: Invalid reference
// 409: Already checked in
// 410: Visit expired

// POST /api/visitor/check-in/walk-in
// Body:
interface WalkInCheckInRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  purpose: string;
  hostName?: string;
  hostDepartment?: string;
  photo?: string;
  photoConsent: boolean;
}
// Response 201: CheckInResponse with new visitor + visit created

// POST /api/visitor/check-out
// Body: { visitId: string }
// Response 200: { checkedOutAt: string; duration: number }
```

### 5.3 Campus Map

```typescript
// GET /api/visitor/campus-map
// Response 200:
interface CampusMapResponse {
  buildings: Array<{
    id: string;
    name: string;
    shortName: string;
    description: string | null;
    latitude: number;
    longitude: number;
    mapPolygonCoords: number[][];
    floorCount: number;
    imageUrl: string | null;
    amenities: string[];
    departments: string[];
    isUnderConstruction: boolean;
  }>;
  amenities: Array<{
    id: string;
    name: string;
    type: string;
    latitude: number;
    longitude: number;
    iconName: string;
  }>;
  center: { latitude: number; longitude: number };
  zoom: number;
}

// GET /api/visitor/campus-map/buildings/:id
// Response 200: BuildingDetail with rooms, amenities, floor plan URLs

// GET /api/visitor/directions?fromLat=X&fromLng=Y&toBuildingId=Z
// Response:
interface DirectionsResponse {
  steps: Array<{
    instruction: string;
    distance: number;
    direction: string;
    waypoint: { lat: number; lng: number };
  }>;
  totalDistance: number;
  estimatedMinutes: number;
  routePolyline: number[][];
}
```

### 5.4 Brochure

```typescript
// GET /api/visitor/brochure?language=en
// Response:
interface BrochureResponse {
  sections: Array<{
    id: string;
    title: string;
    slug: string;
    content: string;
    imageUrl: string | null;
    videoUrl: string | null;
  }>;
}

// GET /api/visitor/brochure/:sectionId
// Response: { id: string; title: string; content: string; imageUrl: string | null; videoUrl: string | null }

// GET /api/visitor/brochure/download?language=en
// Response: PDF file (Content-Type: application/pdf)
// 500: PDF generation failed
```

### 5.5 Feedback

```typescript
// GET /api/visitor/feedback/visits
// Auth: JWT or visitor token
// Response: Array<{ id: string; visitDate: string; purpose: string; hasFeedback: boolean }>

// POST /api/visitor/feedback
// Body:
interface FeedbackRequest {
  visitRequestId?: string;
  overallRating: number;
  receptionExperience?: number;
  campusCleanliness?: number;
  staffFriendliness?: number;
  facilityQuality?: number;
  safety?: number;
  detailedFeedback?: string;
  highlights?: string;
  improvements?: string;
  photoUrls?: string[];
  wouldRecommend: "yes" | "no" | "unsure";
  recommendReason?: string;
  contactPermission: boolean;
  isAnonymous: boolean;
}
// Response 201: { id: string; message: string; moderated: boolean }
// 409: Feedback already exists for this visit

// POST /api/visitor/feedback/photo
// Content-Type: multipart/form-data
// Body: photo (file, max 5MB)
// Response 200: { url: string }
// 413: File too large
```

---

## 6. Component Tree

```
<PublicLayout> | <VisitorLayout>
  <VisitorHeader>
    <Logo />
    <LanguageSelector />
  </VisitorHeader>
  <main>{children}</main>
  <VisitorFooter>
    <ContactInfo />
    <EmergencyInfo />
  </VisitorFooter>
</PublicLayout>

<VisitRequestScreen>
  <StepIndicator currentStep={1|2|3} />
  <VisitFormWizard>
    <PersonalDetailsStep>
      <TextField name="firstName" required />
      <TextField name="lastName" required />
      <EmailField name="email" required />
      <PhoneField name="phone" />
      <TextField name="company" />
      <Dropdown name="idType" />
      <TextField name="idNumber" />
      <Checkbox name="photoConsent" />
    </PersonalDetailsStep>
    <VisitDetailsStep>
      <DatePicker name="visitDate" min={tomorrow} />
      <TimePicker name="visitTime" min="08:00" max="18:00" />
      <Dropdown name="purpose" />
      <TextField name="purposeOther" showIf={purpose==='other'} />
      <TextField name="hostName" />
      <Dropdown name="hostDepartment" />
      <Dropdown name="expectedDuration" />
      <NumberInput name="numberOfGuests" min={1} max={20} />
      <Textarea name="specialRequirements" />
    </VisitDetailsStep>
    <ConfirmationStep>
      <VisitSummaryCard editable />
      <Checkbox name="agreedToPolicy" />
    </ConfirmationStep>
  </VisitFormWizard>
  <SubmitButton />
  <VisitConfirmationCard>
    <QRCodeDisplay data={qrCodeData} />
    <ReferenceCode />
    <CalendarAddButton />
  </VisitConfirmationCard>
</VisitRequestScreen>

<QRCheckInScreen>
  <Tabs value="scan" | "manual" | "walk-in">
    <QRScannerTab>
      <CameraScanner onScan={handleScan} />
      <CameraPermissionPrompt />
    </QRScannerTab>
    <ManualEntryTab>
      <TextField name="referenceCode" maxLength={8} />
      <LookupButton />
    </ManualEntryTab>
    <WalkInTab>
      <WalkInForm>
        <TextField name="firstName" required />
        <TextField name="lastName" required />
        <EmailField name="email" required />
        <PhoneField name="phone" />
        <Dropdown name="purpose" />
        <TextField name="hostName" />
        <PhotoCapture />
      </WalkInForm>
    </WalkInTab>
  </Tabs>
  <CheckInResultCard>
    <VisitorGreeting />
    <VisitDetails />
    <HostInfo />
    <BadgePreview>
      <VisitorPhoto />
      <VisitorName />
      <VisitInfo />
      <BadgeActions>
        <PrintBadgeButton />
        <DownloadBadgeButton />
      </BadgeActions>
    </BadgePreview>
    <CampusMapLink />
    <WifiInfo />
    <EmergencyInfo />
  </CheckInResultCard>
</QRCheckInScreen>

<CampusMapScreen>
  <MapHeader>
    <SearchCampusInput />
    <MapControls />
  </MapHeader>
  <div className="flex">
    <InteractiveMap>
      <BuildingPolygon /> (repeated, clickable)
      <AmenityMarker /> (repeated)
      <UserLocationMarker />
      <RouteLine />
    </InteractiveMap>
    <BrochureSidebar>
      <BrochureAccordion>
        <BrochureSection /> (repeated)
      </BrochureAccordion>
    </BrochureSidebar>
  </div>
  <BuildingInfoPanel>
    <BuildingPhoto />
    <BuildingDetails />
    <RoomList>
      <RoomItem /> (repeated)
    </RoomList>
    <DirectionsButton />
  </BuildingInfoPanel>
  <EmergencyInfoBanner />
  <DownloadPDFButton />
</CampusMapScreen>

<FeedbackScreen>
  <FeedbackForm>
    <VisitSelector />
    <OverallRating />
    <CategoryRatings>
      <RatingRow label="Reception" />
      <RatingRow label="Cleanliness" />
      <RatingRow label="Friendliness" />
      <RatingRow label="Facilities" />
      <RatingRow label="Safety" />
    </CategoryRatings>
    <Textarea name="detailedFeedback" maxLength={2000} />
    <TextField name="highlights" />
    <TextField name="improvements" />
    <PhotoUploadDropzone maxFiles={3} />
    <RecommendToggle />
    <Checkbox name="contactPermission" />
    <Switch name="isAnonymous" />
    <SubmitButton />
  </FeedbackForm>
  <ThankYouScreen>
    <ConfettiAnimation />
    <FeedbackCTA />
  </ThankYouScreen>
</FeedbackScreen>
```

---

## 7. Exhaustive User Journeys

### Journey 1: Prospective Student Schedules Campus Tour

1. Jane (16, interested in cybersecurity) visits CEA website
2. Clicks "Schedule a Visit" → `/visitor/visits`
3. Step 1: Enters name, email, phone. Skips optional ID fields.
4. Step 2: Selects date (next Monday), time (10:00 AM), purpose "Campus Tour", 2 guests (brings parent), no special requirements
5. Step 3: Reviews info, checks policy agreement, clicks "Submit"
6. `POST /api/visitor/visits` → visit created with reference `VT-8A3F2B`
7. Confirmation page shows QR code, reference, "Confirmation sent to jane@email.com"
8. Jane adds to calendar, receives email with QR attachment
9. Day before visit: automated reminder SMS + email

### Journey 2: Pre-Registered Visitor Checks In via QR

1. Jane arrives at campus reception, opens email on phone
2. Clicks "Check In" link in email → camera scanner opens
3. Points camera at QR code (or QR in email) → auto-detected
4. `GET /api/visitor/check-in/VT-8A3F2B` → valid visit found
5. `POST /api/visitor/check-in` with QR method
6. Reception kiosk screen shows: "Welcome, Jane!" with badge preview
7. Badge auto-prints with photo placeholder, name, host "Admissions Office", date
8. Host receives notification: "Your visitor Jane has arrived"
9. Screen shows: WiFi credentials, campus map link, emergency contacts
10. Jane proceeds to campus

### Journey 3: Walk-In Visitor Checks In at Kiosk

1. Mark arrives at campus without prior booking
2. Reception directs him to self-service kiosk
3. Kiosk screen shows 3 options: "Scan QR", "Enter Code", "Walk-In"
4. Selects "Walk-In" → WalInForm appears
5. Enters first name, last name, email, purpose "Meeting with HR"
6. Host name "Sarah Connor" (auto-suggest from staff directory)
7. Camera captures photo for badge
8. Clicks "Check In" → `POST /api/visitor/check-in/walk-in`
9. Badge prints with photo, "VISITOR" label, host, 6-hour expiry
10. Host Sarah gets SMS: "Mark is waiting at reception for you"

### Journey 4: Explore Campus Map & Brochure

1. Visitor scans QR on badge → opens `/visitor/campus-map`
2. Interactive map loads with buildings highlighted
3. Zooms in on "Building B — Cyber Lab"
4. Clicks building → info panel slides in: 3 floors, 8 labs, departments "Digital Forensics"
5. Enters "Library" in search → map pans to library, highlights route from current position
6. Opens brochure sidebar, reads "Programs Offered" section
7. Downloads PDF brochure for offline reading

### Journey 5: Leave Post-Visit Feedback

1. Day after visit, Jane receives email: "How was your visit to CEA?"
2. Clicks link → `/visitor/feedback` with visit pre-selected
3. Rates overall 5 stars, reception 5, cleanliness 4, friendliness 5, facilities 4, safety 5
4. Writes detailed feedback: "Loved the lab facilities. The tour guide was very knowledgeable."
5. Uploads photo from tour
6. Toggles "Would recommend" → Yes
7. Checks "May contact you" box, leaves as non-anonymous
8. Submits → "Thank you for your feedback! We hope to see you again."
9. Internal analytics: feedback rating averaged into monthly report

### Journey 6: Visit Cancellation & Reschedule

1. Jane needs to change her visit date
2. Opens email confirmation, clicks "Reschedule"
3. Loads `/visitor/visits/VT-8A3F2B/reschedule`
4. Selects new date (Thursday instead of Monday), new time (2pm)
5. Submits → `POST /api/visitor/visits/:id/reschedule`
6. Confirmed: "Visit rescheduled to Thursday, 2:00 PM"
7. New QR code generated, new confirmation email sent
8. Old QR invalidated

### Journey 7: Emergency / Blacklist Scenario

1. Visitor causes disturbance on campus
2. Security reports incident → visitor flagged in system
3. `POST /api/visitor/blacklist` with reason
4. `visitors.isBlacklisted = true`
5. Next time this visitor tries to check in (even with valid QR):
6. `GET /api/visitor/check-in/:reference` returns `{ valid: false, message: "Visit cannot be processed. Please see reception." }`
7. Kiosk shows: "Please speak with reception staff."
8. Reception alerted with security notification

---

## 8. Business Rules Engine

| Rule ID  | Name                 | Condition                                                | Action                                                                |
| -------- | -------------------- | -------------------------------------------------------- | --------------------------------------------------------------------- |
| VIS-R001 | Same-day cut-off     | `visitDate = today AND now() > 2 hours before visitTime` | Block booking, show "Book at least 2 hours ahead"                     |
| VIS-R002 | Outside hours        | `visitTime < 08:00 OR visitTime > 18:00`                 | Reject, suggest valid time range                                      |
| VIS-R003 | Max guests           | `numberOfGuests > 20`                                    | Reject, show group booking alternative                                |
| VIS-R004 | Weekend closure      | `visitDate is Saturday OR Sunday`                        | Block unless special event, show "Weekend visits by appointment only" |
| VIS-R005 | Holiday closure      | `visitDate IN holidays`                                  | Block, show closure notice                                            |
| VIS-R006 | No duplicate booking | `visitor.hasActiveVisit(visitDate)`                      | Block, show existing booking                                          |
| VIS-R007 | QR expiry            | `visitDate < today() - 30 days`                          | Invalidate QR code                                                    |
| VIS-R008 | Auto check-out       | `checkedInAt + expectedDuration + 2h < now()`            | Auto check-out, log duration                                          |
| VIS-R009 | Blacklist check      | `visitor.isBlacklisted`                                  | Block all check-in, alert security                                    |
| VIS-R010 | Visit auto-expire    | `visitDate < today() AND status = pending`               | Auto-set to `expired`                                                 |
| VIS-R011 | Reminder schedule    | `visitDate = tomorrow AND status = confirmed`            | Send reminder email at 9am day before                                 |
| VIS-R012 | Feedback cooldown    | `feedback WHERE visitRequestId = X EXISTS`               | Block duplicate, show edit option                                     |
| VIS-R013 | Profanity filter     | `feedback.text MATCHES profanityList`                    | Flag feedback, set status to `flagged`                                |
| VIS-R014 | Badge expiry         | `checkedInAt + 6 hours < now()`                          | Badge invalid, require re-check-in                                    |
| VIS-R015 | Host notification    | `checkIn.success = true`                                 | Send notification to `hostUserId`                                     |

---

## 9. Notification Specifications

| Notification                  | Trigger                     | Channel                | Template Variables                                                    | Delivery Rules  |
| ----------------------------- | --------------------------- | ---------------------- | --------------------------------------------------------------------- | --------------- |
| Visit confirmation            | Visit created               | Email, SMS             | `{firstName}, {referenceCode}, {visitDate}, {visitTime}, {qrCodeUrl}` | Immediate       |
| Visit reminder                | 24h before visit            | Email, SMS             | `{firstName}, {visitDate}, {visitTime}, {qrCodeUrl}, {campusMapUrl}`  | 24 hours before |
| Host notified of check-in     | Check-in completed          | In-app, SMS, Email     | `{visitorName}, {purpose}, {expectedDuration}`                        | Immediate       |
| Host notified of late arrival | Check-in > 30 min late      | In-app, SMS            | `{visitorName}, {scheduledTime}, {actualTime}`                        | Immediate       |
| Check-out completed           | Check-out logged            | In-app (security)      | `{visitorName}, {duration}`                                           | Immediate       |
| Feedback thank you            | Feedback submitted          | Email                  | `{firstName}`                                                         | Immediate       |
| Visit cancelled               | Visitor cancels             | Email                  | `{firstName}, {referenceCode}`                                        | Immediate       |
| Visit rescheduled             | Reschedule completed        | Email, SMS             | `{firstName}, {newDate}, {newTime}, {newQR}`                          | Immediate       |
| Security alert                | Blacklist match on check-in | In-app, SMS (security) | `{visitorName}, {reason}`                                             | Immediate       |
| Feedback flagged              | Profanity detected          | In-app (admin)         | `{feedbackId}, {reason}`                                              | Immediate       |

---

## 10. Permission Matrix

| Entity          | Operation  | Visitor | Reception | Security | Admin | Public (anon)      |
| --------------- | ---------- | ------- | --------- | -------- | ----- | ------------------ |
| Visit Request   | Create     | ✓       | ✓         | ✗        | ✓     | ✓                  |
| Visit Request   | Read own   | ✓       | ✓         | ✓        | ✓     | ✗                  |
| Visit Request   | Cancel own | ✓       | ✓         | ✗        | ✓     | ✓ (with reference) |
| Visit Request   | Reschedule | ✓       | ✓         | ✗        | ✓     | ✗                  |
| Check-In        | Perform    | ✓       | ✓         | ✓        | ✓     | ✓ (kiosk)          |
| Check-In        | Read logs  | ✗       | ✓         | ✓        | ✓     | ✗                  |
| Visitor Profile | Read       | ✓ (own) | ✓         | ✓        | ✓     | ✗                  |
| Visitor Profile | Blacklist  | ✗       | ✗         | ✓        | ✓     | ✗                  |
| Campus Map      | View       | ✓       | ✓         | ✓        | ✓     | ✓                  |
| Brochure        | View       | ✓       | ✓         | ✓        | ✓     | ✓                  |
| Feedback        | Create     | ✓       | ✓         | ✗        | ✓     | ✓                  |
| Feedback        | Read all   | ✗       | ✗         | ✗        | ✓     | ✗                  |
| Feedback        | Moderate   | ✗       | ✗         | ✗        | ✓     | ✗                  |

---

## 11. State Management

### Redux Slice Structure

```typescript
interface VisitorState {
  currentVisit: VisitRequest | null;
  checkIn: {
    status: CheckInStatus;
    result: CheckInResult | null;
    error: string | null;
    loading: boolean;
  };
  campusMap: {
    buildings: Building[];
    amenities: Amenity[];
    selectedBuilding: Building | null;
    route: RouteInfo | null;
    userLocation: { lat: number; lng: number } | null;
  };
  brochure: {
    sections: BrochureSection[];
    loading: boolean;
    error: string | null;
  };
  feedback: {
    recentVisits: VisitSummary[];
    submittedFeedbackId: string | null;
    loading: boolean;
  };
  language: "en" | "fr" | "es";
}
```

### RTK Query Endpoints

```typescript
const visitorApi = createApi({
  reducerPath: "visitorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/visitor" }),
  tagTypes: ["Visit", "Map", "Brochure", "Feedback"],
  endpoints: (builder) => ({
    createVisit: builder.mutation<CreateVisitResponse, CreateVisitRequest>({
      query: (body) => ({ url: "/visits", method: "POST", body }),
      invalidatesTags: ["Visit"],
    }),
    lookupVisit: builder.query<CheckInLookupResponse, string>({
      query: (reference) => `/check-in/${reference}`,
      providesTags: (result) =>
        result?.visit ? [{ type: "Visit", id: result.visit.id }] : ["Visit"],
    }),
    checkIn: builder.mutation<CheckInResponse, CheckInRequest>({
      query: (body) => ({ url: "/check-in", method: "POST", body }),
      invalidatesTags: ["Visit"],
    }),
    walkInCheckIn: builder.mutation<CheckInResponse, WalkInCheckInRequest>({
      query: (body) => ({ url: "/check-in/walk-in", method: "POST", body }),
      invalidatesTags: ["Visit"],
    }),
    checkOut: builder.mutation<{ checkedOutAt: string; duration: number }, string>({
      query: (visitId) => ({ url: "/check-out", method: "POST", body: { visitId } }),
      invalidatesTags: ["Visit"],
    }),
    getCampusMap: builder.query<CampusMapResponse, void>({
      query: () => "/campus-map",
      providesTags: ["Map"],
    }),
    getDirections: builder.query<DirectionsResponse, DirectionsRequest>({
      query: (params) => ({ url: "/directions", params }),
    }),
    getBrochure: builder.query<BrochureResponse, string>({
      query: (language) => `/brochure?language=${language}`,
      providesTags: ["Brochure"],
    }),
    submitFeedback: builder.mutation<
      { id: string; message: string; moderated: boolean },
      FeedbackRequest
    >({
      query: (body) => ({ url: "/feedback", method: "POST", body }),
      invalidatesTags: ["Feedback"],
    }),
  }),
});
```

---

## 12. Form Schemas (Zod)

```typescript
import { z } from "zod";

export const personalDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Valid email is required"),
  phone: z
    .string()
    .regex(/^[\d\s\-+()]{7,20}$/, "Valid phone number required")
    .optional()
    .or(z.literal("")),
  company: z.string().max(200).optional(),
  idType: z.enum(["drivers_license", "passport", "other"]).optional(),
  idNumber: z.string().max(50).optional(),
  photoConsent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to photo for security purposes" }),
  }),
});

export const visitDetailsSchema = z.object({
  visitDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date")
    .refine((val) => new Date(val) > new Date(), "Date must be in the future"),
  visitTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Invalid time")
    .refine((val) => {
      const h = parseInt(val.split(":")[0]);
      return h >= 8 && h < 18;
    }, "Visits available 8:00 AM – 6:00 PM"),
  purpose: z.enum(["campus_tour", "event", "meeting", "guest_lecture", "drop_in", "other"], {
    errorMap: () => ({ message: "Select a purpose" }),
  }),
  purposeOther: z.string().max(200).optional(),
  hostName: z.string().max(200).optional(),
  hostDepartment: z.string().max(200).optional(),
  expectedDuration: z.enum(["30min", "1hr", "2hr", "4hr", "full_day"]),
  numberOfGuests: z.number().int().min(1, "At least 1 guest").max(20, "Max 20 guests"),
  specialRequirements: z.string().max(1000, "Max 1000 characters").optional(),
  agreedToPolicy: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the visitor policy" }),
  }),
});

export const walkInCheckInSchema = z.object({
  firstName: z.string().min(1, "First name required").max(100),
  lastName: z.string().min(1, "Last name required").max(100),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  purpose: z.string().min(1, "Purpose required"),
  hostName: z.string().optional(),
  hostDepartment: z.string().optional(),
  photoConsent: z.literal(true),
});

export const feedbackSchema = z.object({
  visitRequestId: z.string().optional(),
  overallRating: z.number().int().min(1, "Please rate").max(5),
  receptionExperience: z.number().int().min(1).max(5).optional(),
  campusCleanliness: z.number().int().min(1).max(5).optional(),
  staffFriendliness: z.number().int().min(1).max(5).optional(),
  facilityQuality: z.number().int().min(1).max(5).optional(),
  safety: z.number().int().min(1).max(5).optional(),
  detailedFeedback: z.string().max(2000, "Max 2000 characters").optional(),
  highlights: z.string().max(500).optional(),
  improvements: z.string().max(500).optional(),
  wouldRecommend: z.enum(["yes", "no", "unsure"]),
  recommendReason: z.string().max(500).optional(),
  contactPermission: z.boolean(),
  isAnonymous: z.boolean(),
});
```

---

## 13. Analytics Events

| Event Name              | Properties                       | Trigger              | Destination          |
| ----------------------- | -------------------------------- | -------------------- | -------------------- |
| visit_form_started      | `{source, referrer}`             | Visit form page load | PostHog              |
| visit_form_completed    | `{purpose, guests, duration}`    | Visit submitted      | PostHog              |
| visit_cancelled         | `{reason}`                       | Visit cancelled      | PostHog              |
| visit_rescheduled       | `{originalDate, newDate}`        | Rescheduled          | PostHog              |
| check_in_qr_scanned     | `{method}`                       | QR scanned           | PostHog              |
| check_in_manual         | `{}`                             | Manual code entry    | PostHog              |
| check_in_walk_in        | `{purpose}`                      | Walk-in check-in     | PostHog              |
| check_out_completed     | `{duration}`                     | Check-out            | PostHog              |
| badge_printed           | `{method}`                       | Badge print          | PostHog              |
| campus_map_opened       | `{source}`                       | Map page load        | PostHog              |
| campus_building_viewed  | `{buildingId}`                   | Building click       | PostHog              |
| brochure_section_viewed | `{sectionId, language}`          | Section expand       | PostHog              |
| brochure_downloaded     | `{language}`                     | PDF download         | PostHog              |
| directions_requested    | `{from, to}`                     | Directions lookup    | PostHog              |
| feedback_form_started   | `{hasVisit}`                     | Feedback page load   | PostHog              |
| feedback_submitted      | `{rating, recommend, anonymous}` | Feedback submit      | PostHog              |
| feedback_flagged        | `{reason}`                       | Profanity/flag       | PostHog, Admin alert |

---

## 14. Accessibility Requirements

- QR scanner: Focus on viewfinder when page loads, `aria-label="QR code scanner"`, keyboard alternative (manual code input)
- Camera permission: `aria-live="polite"` for permission status updates
- Kiosk touch targets: Minimum 48×48px, high contrast borders
- Map: All interactive buildings `role="button"`, `aria-label="Building {name}"`, keyboard navigable with Tab/Enter
- Map zoom: `aria-label="Zoom in"` / "Zoom out", accessible via keyboard
- Route directions: Text-based step list as alternative to visual map
- Form wizard: `aria-current="step"` on current step, `aria-label="Step {n} of {total}: {stepName}"`
- Date picker: Keyboard navigable with arrow keys, `aria-label="Choose visit date"`
- Rating stars: `role="radiogroup"`, each star `role="radio"`, `aria-checked`, `aria-label="{n} stars"`
- Photo capture: Camera preview `aria-label="Photo preview"`, retake button, countdown timer announced
- Badge preview: `aria-label="Visitor badge for {name}"`
- Emergency banner: `role="alert"`, `aria-live="assertive"`, prominently styled
- Language selector: `aria-label="Select language"`, current language announced
- File upload drag-and-drop: `aria-dropeffect="move"`, keyboard file picker
- Step navigation: Previous/Next buttons clearly labeled, form state preserved on back
- Focus management: On step change, focus moves to step heading
- Skip navigation: "Skip to main content" link
- Reduced motion: Respect `prefers-reduced-motion`, disable map animations, confetti
- Screen reader: Visit confirmation announced, QR code described as "QR code for check-in"

---

## 15. Error & Edge Case Catalog

| Error Code | Condition                        | HTTP Status | System Response     | User Message                                                                     | Recovery Action              |
| ---------- | -------------------------------- | ----------- | ------------------- | -------------------------------------------------------------------------------- | ---------------------------- |
| VIS-001    | Visit not found                  | 404         | Check reference     | "Visit not found. Check your reference code or schedule a new visit."            | New visit link               |
| VIS-002    | Visit already checked in         | 409         | Check status        | "You are already checked in for this visit."                                     | Show check-in details        |
| VIS-003    | Visit expired                    | 410         | Date check          | "This visit has expired. Please schedule a new visit."                           | New visit link               |
| VIS-004    | Visit cancelled                  | 410         | Status check        | "This visit was cancelled."                                                      | New visit link               |
| VIS-005    | Same-day too late                | 400         | Time check          | "Same-day bookings must be made at least 2 hours before arrival."                | Reschedule link              |
| VIS-006    | Outside visiting hours           | 400         | Time range          | "Visits are only available between 8:00 AM and 6:00 PM."                         | Suggest valid time           |
| VIS-007    | Weekend closure                  | 400         | Day check           | "Campus is closed on weekends. Please select a weekday."                         | Suggest weekdays             |
| VIS-008    | Holiday closure                  | 400         | Holiday list        | "Campus is closed on {date}. Please select another date."                        | Show next open date          |
| VIS-009    | Max guests exceeded              | 400         | Count check         | "Maximum 20 guests per visit. Contact events@ for larger groups."                | Provide contact              |
| VIS-010    | Visitor blacklisted              | 403         | Blacklist check     | "Your visit cannot be processed. Please see reception."                          | Security alerted             |
| VIS-011    | Invalid QR code                  | 400         | Decode fail         | "Invalid QR code. Please try again or enter your code manually."                 | Manual entry prompt          |
| VIS-012    | Camera denied                    | —           | Permission check    | "Camera access is needed for QR scanning. You can enter your code manually."     | Show manual input            |
| VIS-013    | Photo upload failed              | 500         | Upload error        | "Photo could not be saved."                                                      | Retry, or skip               |
| VIS-014    | Badge print error                | 500         | Printer queue       | "Badge could not be printed. Please see reception for a printed badge."          | Reception notified           |
| VIS-015    | Feedback duplicate               | 409         | Already exists      | "You've already submitted feedback for this visit. You can edit it."             | Load existing feedback       |
| VIS-016    | Profanity detected               | 422         | Content scan        | "Please keep feedback respectful. Inappropriate language may be flagged."        | Edit content                 |
| VIS-017    | File type not allowed            | 400         | MIME check          | "Only JPG, PNG, and HEIC photos are accepted."                                   | Convert file                 |
| VIS-018    | File too large                   | 413         | Size check          | "Photo exceeds 5MB limit."                                                       | Compress file                |
| VIS-019    | Map unavailable                  | 503         | Service down        | "Campus map is temporarily unavailable. Please ask reception for a printed map." | Fallback link                |
| VIS-020    | Directions unavailable           | 503         | Routing fail        | "Directions could not be calculated. Please ask reception for guidance."         | Show reception contact       |
| VIS-021    | Network offline                  | —           | Connectivity        | "You are offline. Some features may be unavailable."                             | Cache key resources          |
| VIS-022    | Session expired                  | 401         | JWT expired         | "Your session has expired. Please start again."                                  | Redirect to form start       |
| VIS-023    | Invalid reference code           | 400         | Format check        | "Reference code must be 8 characters (letters and numbers)."                     | Re-enter                     |
| VIS-024    | Host not found                   | 400         | Staff lookup        | "Host name not found. Please check the spelling or leave blank."                 | Continue without host        |
| VIS-025    | No pending visits                | 404         | Query result        | "No upcoming visits found."                                                      | Schedule a visit CTA         |
| VIS-026    | Visit reference expired          | 410         | Reference age > 30d | "This reference code has expired."                                               | Create new visit             |
| VIS-027    | Duplicate visit same day         | 409         | Same visitor+date   | "You already have a visit scheduled for this date."                              | View existing visit          |
| VIS-028    | Host unavailable that day        | 400         | Staff calendar      | "Your selected host is not available on {date}."                                 | Show alternative dates       |
| VIS-029    | Visit time outside host hours    | 400         | Staff availability  | "Host only available {start}–{end} on this date."                                | Adjust visit time            |
| VIS-030    | Group visit requires coordinator | 400         | Group size > 10     | "Groups larger than 10 require a coordinator. Contact events@."                  | Provide events contact       |
| VIS-031    | Kiosk offline                    | 503         | Hardware check      | "Self-service kiosk is offline. Please see reception."                           | Redirect to reception        |
| VIS-032    | Badge printer offline            | 503         | Printer check       | "Badge printer is offline. A temporary pass will be issued."                     | Reception issues manual pass |
| VIS-033    | Photo capture failed             | 500         | Camera error        | "Photo could not be captured. Badge will print without photo."                   | Proceed with no photo        |
| VIS-034    | Check-in method not allowed      | 403         | Method check        | "This check-in method is not available for this visit type."                     | Use alternative method       |
| VIS-035    | Visit already checked out        | 400         | Status check        | "This visit has already been checked out."                                       | View visit summary           |
| VIS-036    | Check-out already completed      | 400         | Status check        | "Check-out was already recorded at {time}."                                      | No action needed             |
| VIS-037    | Host not notified (system error) | 500         | Notification fail   | "Host could not be notified automatically. Please inform reception."             | Reception calls host         |

### Visitor Journey Decision Tree

```
Visitor Arrives at Campus
├── Has QR Code?
│   ├── Yes → Scan QR Code
│   │   ├── Valid → Check In → Badge Printed → Visit Host
│   │   └── Invalid/Expired → Manual Code Entry
│   │       ├── Found → Check In
│   │       └── Not Found → Walk-In Registration
│   └── No → Walk-In Kiosk
│       ├── Has Pre-Registration? → Enter Email/Phone → Check In
│       └── No Pre-Registration → Fill Walk-In Form → Check In
│
├── After Check-In
│   ├── Host Notified (SMS/Email)
│   ├── Badge Printed
│   ├── WiFi Credentials Provided
│   ├── Campus Map Available
│   └── Emergency Info Displayed
│
├── During Visit
│   ├── Explore Campus (Map + Brochure)
│   ├── Attend Meeting/Tour/Event
│   └── Check Out (Manual or Auto)
│
└── Post-Visit
    ├── Feedback Email Sent (24h later)
    ├── Submit Feedback → Thank You Screen
    └── Schedule Future Visit? → Return to Visit Request
```

### Visitor Notification Templates (Full Detail)

**Visit Confirmation Email:**

```
Subject: Your Visit to Cyber Elias Academy — Confirmed

Hi {firstName},

Your visit to Cyber Elias Academy is confirmed!

Visit Details:
  Date: {visitDate}
  Time: {visitTime}
  Purpose: {purpose}
  Host: {hostName}
  Guests: {numberOfGuests}

Your QR Code:
  [QR_IMAGE]

Your Reference Code: {referenceCode}

Please present your QR code at reception upon arrival.

Before your visit:
  - View our campus map: {campusMapUrl}
  - Read our digital brochure: {brochureUrl}
  - Review visitor policy: {policyUrl}

Need to make changes?
  Reschedule: {rescheduleUrl}
  Cancel: {cancelUrl}

We look forward to welcoming you!

— Cyber Elias Academy Reception Team
```

**Visit Reminder SMS:**

```
Reminder: Your visit to Cyber Elias Academy is tomorrow at {visitTime}.
Your QR code: {qrCodeUrl} | Reference: {referenceCode}
Campus map: {campusMapUrl}
To reschedule: {rescheduleUrl}
```

**Check-In Host Notification:**

```
Your visitor has arrived!
  Name: {visitorName}
  Purpose: {purpose}
  Check-in time: {checkInTime}
  Expected duration: {expectedDuration}

Please meet them at reception or direct them to your location.
```

**Feedback Thank You Email:**

```
Subject: Thank You for Your Feedback

Hi {firstName},

Thank you for taking the time to share your feedback about your visit to Cyber Elias Academy!

Your responses help us improve the visitor experience for future guests.

We hope to welcome you again soon!

— Cyber Elias Academy Team
```
