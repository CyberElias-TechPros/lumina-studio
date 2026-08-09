# Grand Master Plan - Part 2: API, Components, Permissions, State

---

# 4. Unified API Surface

## 4.1 API Architecture

```
api.cea.ng/v1/
â”œâ”€â”€ auth/           â”€â”€ Authentication & authorization
â”œâ”€â”€ users/          â”€â”€ User management
â”œâ”€â”€ roles/          â”€â”€ Role & permission management
â”œâ”€â”€ learning/       â”€â”€ Courses, modules, lessons
â”œâ”€â”€ assessments/    â”€â”€ Quizzes, exams, assignments
â”œâ”€â”€ enrollments/    â”€â”€ Enrollment & progress
â”œâ”€â”€ grades/         â”€â”€ Gradebook
â”œâ”€â”€ attendance/     â”€â”€ Attendance tracking
â”œâ”€â”€ certificates/   â”€â”€ Certificate issuance & verification
â”œâ”€â”€ portfolio/      â”€â”€ Student portfolios
â”œâ”€â”€ marketplace/    â”€â”€ Jobs & freelance gigs
â”œâ”€â”€ crm/            â”€â”€ Contacts, deals, pipeline
â”œâ”€â”€ clients/        â”€â”€ Client portal
â”œâ”€â”€ projects/       â”€â”€ Project management
â”œâ”€â”€ tickets/        â”€â”€ Support tickets
â”œâ”€â”€ finance/        â”€â”€ Invoices, payments, accounting
â”œâ”€â”€ hr/             â”€â”€ HR & employee management
â”œâ”€â”€ inventory/      â”€â”€ Inventory & assets
â”œâ”€â”€ procurement/    â”€â”€ Purchase orders & suppliers
â”œâ”€â”€ admissions/     â”€â”€ Admissions pipeline
â”œâ”€â”€ community/      â”€â”€ Forums, events, groups
â”œâ”€â”€ partners/       â”€â”€ Partners & agreements
â”œâ”€â”€ mentorship/     â”€â”€ Mentorship program
â”œâ”€â”€ volunteer/      â”€â”€ Volunteer management
â”œâ”€â”€ alumni/         â”€â”€ Alumni network
â”œâ”€â”€ analytics/      â”€â”€ Analytics & reporting
â”œâ”€â”€ notifications/  â”€â”€ Notification management
â”œâ”€â”€ cms/            â”€â”€ Content management (public)
â”œâ”€â”€ config/         â”€â”€ System configuration
â””â”€â”€ integrations/   â”€â”€ Third-party integrations
```

## 4.2 Endpoint Conventions

Every endpoint follows these patterns:

| Pattern                    | Method | Description                            |
| -------------------------- | ------ | -------------------------------------- |
| `/{resource}`              | GET    | List (paginated, filterable, sortable) |
| `/{resource}/:id`          | GET    | Get single resource                    |
| `/{resource}`              | POST   | Create                                 |
| `/{resource}/:id`          | PATCH  | Partial update                         |
| `/{resource}/:id`          | DELETE | Soft delete                            |
| `/{resource}/:id/{action}` | POST   | Custom action                          |

### Common Query Parameters

```typescript
// Every list endpoint accepts:
interface ListParams {
  page?: number; // default: 1
  limit?: number; // default: 20, max: 100
  cursor?: string; // cursor-based pagination (optional)
  search?: string; // full-text search
  sortBy?: string; // field name
  sortOrder?: "asc" | "desc";
  status?: string | string[];
  dateFrom?: string; // ISO 8601
  dateTo?: string;
  // Resource-specific filters appended
  [key: string]: unknown;
}

// Every response uses this envelope:
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string; // 'VALIDATION_ERROR', 'NOT_FOUND', 'UNAUTHORIZED', 'FORBIDDEN'
    message: string;
    details?: FieldError[]; // field-level validation errors
  };
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextCursor?: string;
  };
}
```

### HTTP Status Codes

| Code | Usage                 | When                              |
| ---- | --------------------- | --------------------------------- |
| 200  | Success               | GET, PATCH, custom actions        |
| 201  | Created               | POST (resource created)           |
| 204  | No Content            | DELETE successful                 |
| 400  | Bad Request           | Validation error, malformed input |
| 401  | Unauthorized          | Missing/invalid auth token        |
| 403  | Forbidden             | RBAC check failed                 |
| 404  | Not Found             | Resource does not exist           |
| 409  | Conflict              | Duplicate unique constraint       |
| 422  | Unprocessable Entity  | Business rule violation           |
| 429  | Too Many Requests     | Rate limit exceeded               |
| 500  | Internal Server Error | Unexpected error                  |
| 503  | Service Unavailable   | Maintenance mode                  |

## 4.3 Common Patterns

### File Upload Flow

```
1. Client requests presigned URL:
   POST /v1/uploads/presign
   { fileName: "report.pdf", contentType: "application/pdf", size: 1048576 }

2. Server returns:
   { uploadUrl: "https://...", publicUrl: "https://cdn.cea.ng/...", key: "uploads/abc123.pdf" }

3. Client PUTs file directly to R2 uploadUrl

4. On success, client submits form with publicUrl/key
```

### Soft Delete Pattern

All entities use `deletedAt: timestamp` for soft delete. Queries automatically filter `WHERE deletedAt IS NULL` via Drizzle hooks. Admin queries can pass `includeDeleted: true` to see soft-deleted records.

### Audit Trail Integration

Every mutation endpoint automatically logs to `audit_logs` via middleware:

```typescript
// Auto-injected by AuditMiddleware
{
  userId: string;
  sessionId: string;
  action: string; // 'course.create', 'invoice.pay'
  resource: string; // 'courses', 'invoices'
  resourceId: string;
  details: {
    before: unknown;
    after: unknown;
  }
  ipAddress: string;
  userAgent: string;
}
```

## 4.4 Rate Limiting & Throttling

| Tier           | Rate Limit                | Applied To       | Storage |
| -------------- | ------------------------- | ---------------- | ------- |
| Public         | 100 req/min per IP        | Auth, public CMS | KV      |
| Authenticated  | 1,000 req/min per user    | All API          | KV      |
| Admin          | 5,000 req/min per user    | Admin endpoints  | KV      |
| Webhook        | 10,000 req/min per source | Integrations     | KV      |
| Login          | 5 attempts/min per IP     | Auth endpoints   | KV      |
| Password Reset | 3 attempts/hour per email | Auth endpoints   | KV      |

Exceeded limits return `429 Too Many Requests` with `Retry-After` header.

---

# 5. Unified Component Library

## 5.1 Design Tokens

```typescript
const tokens = {
  colors: {
    primary: { 50: "#eff6ff", 100: "#dbeafe", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8" },
    secondary: { 50: "#f8fafc", 100: "#f1f5f9", 500: "#64748b", 600: "#475569", 700: "#334155" },
    success: { 50: "#f0fdf4", 500: "#22c55e", 600: "#16a34a" },
    warning: { 50: "#fffbeb", 500: "#f59e0b", 600: "#d97706" },
    error: { 50: "#fef2f2", 500: "#ef4444", 600: "#dc2626" },
    info: { 50: "#f0f9ff", 500: "#0ea5e9", 600: "#0284c7" },
    surface: {
      light: { bg: "#ffffff", fg: "#0f172a", muted: "#f1f5f9", border: "#e2e8f0" },
      dark: { bg: "#0f172a", fg: "#f1f5f9", muted: "#1e293b", border: "#334155" },
    },
  },
  spacing: {
    0: "0px",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
    16: "64px",
  },
  radii: {
    none: "0px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  },
  typography: {
    sans: "Inter, system-ui, -apple-system, sans-serif",
    mono: "JetBrains Mono, Fira Code, monospace",
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    weights: { normal: "400", medium: "500", semibold: "600", bold: "700" },
  },
  animations: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
};
```

## 5.2 Primitive Components (shadcn/ui base)

| Component         | Variants                                             | States                                            | Slots                                            |
| ----------------- | ---------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------ |
| **Button**        | primary, secondary, ghost, outline, danger, link     | default, hover, active, disabled, loading         | leftIcon, rightIcon, spinner                     |
| **Input**         | default, error, success                              | default, focus, disabled, error, readonly         | prefix, suffix, helpText                         |
| **Textarea**      | default, error                                       | default, focus, disabled, error                   | helpText, charCount                              |
| **Select**        | default, error                                       | default, focus, disabled, error, empty            | placeholder, groups                              |
| **Checkbox**      | default, indeterminate                               | checked, unchecked, disabled                      | label                                            |
| **Radio**         | default                                              | selected, unselected, disabled                    | label, description                               |
| **Switch**        | default                                              | on, off, disabled                                 | label                                            |
| **Badge**         | default, success, warning, error, info, outline, dot | â€”                                                 | dot indicator                                    |
| **Avatar**        | sm, md, lg, xl                                       | image loaded, fallback (initials), offline/online | badge, status                                    |
| **Card**          | default, interactive, selected                       | hover, selected, disabled                         | header, body, footer                             |
| **Dialog**        | â€”                                                    | open, closed                                      | header, body, footer, backdrop                   |
| **Sheet**         | left, right, top, bottom                             | open, closed                                      | header, body, footer                             |
| **Popover**       | â€”                                                    | open, closed                                      | trigger, content, arrow                          |
| **Tooltip**       | top, bottom, left, right                             | â€”                                                 | delay, maxWidth                                  |
| **Dropdown Menu** | â€”                                                    | open, closed                                      | item, separator, icon, shortcut                  |
| **Tabs**          | underline, pill                                      | active, hover, disabled, focus                    | icon, badge                                      |
| **Accordion**     | single, multiple                                     | open, closed                                      | chevron animation                                |
| **Toast**         | success, error, warning, info                        | enter, exit, swipe                                | undo action, dismiss                             |
| **Progress**      | default, success, error                              | determinate, indeterminate                        | label, percentage                                |
| **Skeleton**      | text, circle, rect, card                             | shimmer animation                                 | â€”                                                |
| **Table**         | default, compact                                     | sortable, selectable, hover                       | sticky header                                    |
| **Pagination**    | â€”                                                    | â€”                                                 | page numbers, prev/next, ellipsis, size selector |
| **Alert**         | default, success, warning, error, info               | dismissible                                       | icon, action                                     |
| **Form**          | â€”                                                    | â€”                                                 | field-level errors via Zod                       |
| **Separator**     | horizontal, vertical                                 | â€”                                                 | â€”                                                |
| **ScrollArea**    | â€”                                                    | â€”                                                 | custom scrollbar                                 |

## 5.3 Composite Components

| Component             | Composition                                 | Props                                                                    | Used In                     |
| --------------------- | ------------------------------------------- | ------------------------------------------------------------------------ | --------------------------- |
| **DataTable**         | Table + Pagination + Search + Sort + Filter | columns, data, loading, onRowClick, toolbar, selectable                  | All list pages              |
| **FormField**         | Label + Input/Select + ErrorMessage         | name, label, control, rules, helpText                                    | All forms                   |
| **SearchInput**       | Input + Icon + Debounce                     | onSearch, placeholder, value, debounceMs                                 | All search bars             |
| **EmptyState**        | Icon + Text + Button                        | icon, title, description, action, illustration                           | All empty states            |
| **ErrorState**        | Alert + Button                              | error, onRetry, fullPage                                                 | All error states            |
| **LoadingState**      | Skeleton + Spinner                          | variant (table/card/list), rows, columns                                 | All loading states          |
| **StatusBadge**       | Badge + Tooltip                             | status, type, showTooltip, size                                          | Status indicators           |
| **ProgressRing**      | SVG + Text                                  | progress (0-100), size, strokeWidth, color                               | Course progress, KPIs       |
| **UserCard**          | Avatar + Text + Badge                       | user, showRole, showStatus, onClick, size                                | User listings, team         |
| **Timeline**          | Card + Icon + Separator                     | items (with icon, title, description, date), orientation                 | Activity, history, tracking |
| **MetricCard**        | Card + Text + Trend                         | label, value, trend (up/down/neutral), trendValue, icon, onClick, format | Dashboards                  |
| **ActivityFeed**      | Timeline + UserCard                         | activities, limit, onLoadMore, groupByDate                               | Dashboards, profiles        |
| **KanbanBoard**       | Drag + Drop + Card                          | columns, items, onDragEnd, onItemClick                                   | Tasks, admissions pipeline  |
| **FileUploader**      | Dropzone + Progress + Card                  | accept, maxSize, multiple, maxFiles, onUpload, preview                   | All file uploads            |
| **RichTextEditor**    | TipTap/Quill + Toolbar                      | value, onChange, toolbarOptions, placeholder, readOnly                   | Content creation            |
| **ConfirmDialog**     | Dialog + Button                             | title, message, confirmLabel, cancelLabel, variant, onConfirm, onCancel  | Destructive actions         |
| **NotificationBell**  | Popover + Badge + List                      | notifications, unreadCount, onMarkRead, onViewAll, onMarkAllRead         | Navbar                      |
| **CommandPalette**    | Dialog + Search + List                      | commands (with shortcut, category), onSelect, placeholder                | Global search (Cmd+K)       |
| **OnboardingTour**    | Popover + Step + Dots                       | steps (target, title, content, placement), onComplete, onSkip            | First-time user             |
| **ColorSchemeToggle** | Switch + Icon                               | mode, onChange                                                           | Theme toggle                |

## 5.4 Feature Components (Actor-Specific)

| Component               | Description                                                              | Primary Actor(s)       |
| ----------------------- | ------------------------------------------------------------------------ | ---------------------- |
| **CourseCard**          | Thumbnail, title, instructor, progress bar, tags, CTA                    | Student, Prospect      |
| **LessonViewer**        | Video player + text content + materials + prev/next nav                  | Student                |
| **AssignmentSubmitter** | File dropzone + text editor + code editor + plagiarism status            | Student                |
| **AssessmentPlayer**    | Timer + question navigator + options + proctoring overlay                | Student                |
| **GradeViewer**         | Scores table + distribution chart + feedback threads                     | Student, Instructor    |
| **CertificateViewer**   | PDF viewer + verification badge + social share                           | Student, Alumni        |
| **PortfolioBuilder**    | Drag-drop sections (projects, skills, experience) + preview + share link | Student                |
| **CourseBuilder**       | Tree view of modules/lessons + content editor + reorder                  | Instructor             |
| **GradebookTable**      | Matrix (students Ã— assignments) with inline edit + filters               | Instructor, Dept Head  |
| **AttendanceMarker**    | Student grid + QR scanner + bulk actions + geolocation                   | Instructor             |
| **ApplicationPipeline** | Kanban columns with drag-drop + bulk actions + filters                   | Admissions Officer     |
| **InvoiceBuilder**      | Line items table + tax/discount + preview + PDF                          | Accountant             |
| **ProjectBoard**        | Gantt + Kanban + Timeline views + milestone markers                      | Client, PM             |
| **ChatRoom**            | Real-time messages + typing indicators + reactions + files + search      | All                    |
| **JobBoard**            | Card list + filters + match score + quick apply                          | Student, Employer      |
| **AnalyticsDashboard**  | Chart grid + date range + filters + drill-down + export                  | Director, Management   |
| **WorkflowBuilder**     | Drag-drop step nodes + condition editor + trigger config                 | Operations, Sys Admin  |
| **CalendarView**        | Month/week/day + event blocks + drag-create                              | All                    |
| **DirectoryViewer**     | Search + filter + profile cards + connect button                         | Alumni, All            |
| **ReportBuilder**       | Drag-drop fields + filters + grouping + chart type + export              | All management         |
| **AdminPanel**          | User list + role editor + permission tree + config forms                 | System Administrator   |
| **VisitorCheckIn**      | ID scanner + badge preview + host notification                           | Receptionist           |
| **TicketQueue**         | List + priority badges + SLA timer + assignment                          | IT Support             |
| **LiveClass**           | Video stream + chat + whiteboard + polls + hand-raise                    | Student, Instructor    |
| **ChecklistWidget**     | Progress checklist with assignees + due dates                            | All (onboarding, etc.) |

## 5.5 Layout Components

| Component         | Description                                                        | Responsive                                |
| ----------------- | ------------------------------------------------------------------ | ----------------------------------------- |
| **AppShell**      | Sidebar + Topbar + Main content area                               | Sidebar collapses to overlay on mobile    |
| **Sidebar**       | Nav links + role-based sections + collapse toggle + user info      | Hidden on <1024px, triggered by hamburger |
| **Topbar**        | Breadcrumbs + search + notifications + profile menu + theme toggle | Stacks vertically on mobile               |
| **MobileNav**     | Bottom tab bar with icons                                          | Visible only on <768px                    |
| **DashboardGrid** | CSS Grid of MetricCards + widgets (dynamic layout)                 | 1-col â†’ 2-col â†’ 3-col â†’ 4-col             |
| **PageHeader**    | Title + description + breadcrumbs + action buttons                 | Actions collapse to dropdown on mobile    |
| **SplitPane**     | Resizable left/right panels + collapse                             | Stacks vertically on <768px               |
| **ModalLayout**   | Center modal + backdrop + header + body + footer                   | Full-screen sheet on mobile               |
| **WizardLayout**  | Step indicator + content + prev/next buttons                       | Steps become accordion on mobile          |

---

# 6. Permissions Cosmos

## 6.1 Role Hierarchy & Inheritance

```
System Administrator (level 0) â€” global access
  â””â”€â”€ Director (level 1) â€” cross-department read + approve
       â”œâ”€â”€ Department Head (level 2) â€” department scope
       â”‚    â”œâ”€â”€ Instructor (level 3) â€” own courses
       â”‚    â””â”€â”€ Mentor (level 3) â€” assigned mentees
       â”œâ”€â”€ Operations Manager (level 2) â€” all branches
       â”‚    â”œâ”€â”€ Receptionist (level 3) â€” front desk
       â”‚    â””â”€â”€ IT Support (level 3) â€” ticketing
       â”œâ”€â”€ Accountant (level 2) â€” financial
       â””â”€â”€ HR Officer (level 2) â€” people

  â”œâ”€â”€ Developer (level 2) â€” engineering access
  â”œâ”€â”€ Marketing Officer (level 2) â€” campaigns
  â””â”€â”€ Admissions Officer (level 2) â€” enrollment pipeline

Independent Roles (no hierarchy inheritance):
  Current Student, Prospective Student, Parent, Client,
  Employer, Partner, Volunteer, Intern, Alumni, Visitor,
  Supplier, Government Representative, NGO
```

## 6.2 ABAC Rules (Attribute-Based Access Control)

Beyond RBAC, these ABAC rules constrain data access dynamically:

| Rule                     | Resource                        | Condition                                           | Evaluated          |
| ------------------------ | ------------------------------- | --------------------------------------------------- | ------------------ |
| Self-only                | All personal data               | `resource.userId === auth.userId`                   | On every query     |
| Parent-child             | Grades, Attendance, Enrollments | `auth.userId IN student.parentIds`                  | On query           |
| Instructor-course        | Courses, Modules, Lessons       | `auth.userId IN course.instructors`                 | On query           |
| Department scope         | Department resources            | `resource.departmentId IN auth.departmentIds`       | On query           |
| Branch scope             | Branch resources                | `resource.branchId IN auth.managedBranchIds`        | On query           |
| Grade visibility         | Grades (student view)           | `grade.isPublished === true`                        | On student request |
| Attendance geo-fence     | Attendance check-in             | `checkInLocation within branch.geofence`            | On check-in        |
| Assignment deadline      | Submission                      | `now < assignment.dueDate OR lateSubmissionAllowed` | On submit          |
| Certificate verification | Public certificate              | `certificate.isVerified === true`                   | Public endpoint    |
| Invoice visibility       | Client invoices                 | `invoice.billToId === auth.contactId`               | On finance queries |

## 6.3 RBAC Matrix Summary (All Actors Ã— Key Resources)

Legend: `R`=Read (own), `R*`=Read (scope), `R**`=Read (global), `C`=Create, `U`=Update (own), `U*`=Update (scope), `D`=Delete, `A`=Approve, `â€”`=None

| Resource | Student | Parent | Instructor | Mentor | Dept Head | Ops Mgr | Director | Recpt | Client | Employer | Partner | Vol | Intern | Alumni | Supplier | Acct | HR | Admissions | Mktg | IT | Dev | Sys Admin | Gov Rep | NGO |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Users | RU | R | RU | RU | R* | R* | R** | R | R | R | R | RU | RU | RU | R | R* | R* | R* | R* | R* | R | CRUD | R | R |
| Courses | R | RW | CRUD | R | CRUD* | â€” | R** | R | â€” | â€” | â€” | â€” | R | R | â€” | â€” | â€” | â€” | â€” | â€” | R | R | R | â€” |
| Modules | R | RW | CRUD | R | CRUD* | â€” | R** | â€” | â€” | â€” | â€” | â€” | R | R | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” |
| Enrollments | R | RW | R** | R* | R* | â€” | R** | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | C | â€” | â€” | â€” | â€” | â€” |
| Assignments | R | RW | CRUD | â€” | R* | â€” | R** | â€” | â€” | â€” | â€” | â€” | R | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” |
| Submissions | CRU | RW | CRUD | â€” | R* | â€” | R** | â€” | â€” | â€” | â€” | â€” | CRU | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” |
| Assessments | R | â€” | CRUD | â€” | R* | â€” | R** | â€” | â€” | â€” | â€” | â€” | R | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” |
| Grades | R | RW | CRUD | â€” | R* | â€” | R** | â€” | â€” | â€” | â€” | â€” | R | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” |
| Attendance | R | RW | CRUD | â€” | R* | R* | R** | C | â€” | â€” | â€” | â€” | C | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” |
| Certificates | R | R | C | â€” | R* | â€” | R** | â€” | â€” | â€” | â€” | â€” | â€” | R | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” |
| Portfolio | CRUD | RW | R | R* | â€” | â€” | R** | â€” | â€” | R | â€” | â€” | CRU | CRU | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” |
| Jobs/Marketplace | RC | â€” | â€” | â€” | â€” | â€” | R** | â€” | â€” | CRUD | â€” | â€” | RC | RC | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” |
| CRM/Contacts | â€” | â€” | â€” | â€” | â€” | â€” | R** | C | R | â€” | R | â€” | â€” | â€” | â€” | â€” | â€” | CRUD | CRUD | â€” | â€” | R | â€” |
| Projects | â€” | â€” | R* | â€” | â€” | CRUD | R** | â€” | R | â€” | â€” | â€” | R* | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” |
| Tickets | C | C | C | â€” | â€” | â€” | R** | â€” | CRU | â€” | â€” | â€” | C | â€” | â€” | â€” | â€” | â€” | â€” | CRUD | â€” | R | â€” |
| Invoices | R | RW | â€” | â€” | R* | R* | R** | â€” | R | â€” | R | â€” | â€” | â€” | R | CRUD | â€” | â€” | â€” | â€” | â€” | R | â€” |
| Payments | C | C | â€” | â€” | â€” | â€” | R** | â€” | C | â€” | â€” | â€” | â€” | â€” | â€” | CRUD | â€” | â€” | â€” | â€” | â€” | â€” | â€” |
| HR Records | â€” | â€” | â€” | â€” | R* | R* | R** | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | CRUD | â€” | â€” | â€” | â€” | â€” | â€” |
| Leave Requests | C | â€” | C | C | A* | A* | R** | â€” | â€” | â€” | â€” | â€” | C | â€” | â€” | â€” | A | â€” | â€” | â€” | â€” | â€” | â€” |
| Admissions | â€” | â€” | â€” | â€” | â€” | â€” | R** | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | CRUD | â€” | â€” | â€” | R | â€” |
| Inventory | â€” | â€” | â€” | â€” | â€” | CRUD | R** | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | R | â€” | R | â€” |
| Procurement | â€” | â€” | â€” | â€” | â€” | CRUDA | R** | â€” | â€” | â€” | â€” | â€” | â€” | â€” | R | R | â€” | â€” | â€” | â€” | â€” | R | â€” |
| Community/Forum | CRUD | R | CRUD | CRUD | â€” | â€” | R** | â€” | â€” | â€” | CRUD | CRUD | CRUD | CRUD | â€” | â€” | â€” | â€” | CRUD | â€” | â€” | R | â€” | CRUD |
| Events | CR | R | CR | CR | â€” | â€” | R** | â€” | â€” | â€” | CR | CR | CR | CR | â€” | â€” | â€” | CR | CRUD | â€” | â€” | R | â€” | CRUD |
| Visitors | â€” | â€” | â€” | â€” | â€” | â€” | R** | CRUD | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” |
| Analytics | R | RW | R | R* | R* | R* | R** | â€” | R | R | R | R | R | R | â€” | R* | R* | R | R* | R* | R | R** | R | R |
| System Config | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | R | CRUD | â€” | â€” |
| Audit Logs | â€” | â€” | â€” | â€” | â€” | â€” | R** | â€” | â€” | â€” | â€” | â€” | â€” | â€” | â€” | R | â€” | â€” | â€” | â€” | â€” | CRUD | â€” | â€” |

---

# 7. Unified State Management

## 7.1 Redux Store Structure

```typescript
interface RootState {
  auth: {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: AuthError | null;
    sessionExpiresAt: number | null;
    mfaRequired: boolean;
    mfaChallenge: MFASession | null;
    permissions: string[];    // flattened effective permissions
    roles: Role[];
  };

  api: CombinedState<...>;   // RTK Query cache

  ui: {
    sidebar: { isOpen: boolean; isCollapsed: boolean; mobileOpen: boolean };
    theme: 'light' | 'dark' | 'system';
    modals: { id: string; props: unknown }[];
    toasts: Toast[];
    globalLoading: boolean;
    commandPalette: { isOpen: boolean };
    onboarding: { isActive: boolean; currentStep: number; steps: OnboardingStep[] };
    pageState: Record<string, {
      filters: Record<string, unknown>;
      sort: { field: string; direction: 'asc' | 'desc' };
      view: 'table' | 'grid' | 'kanban';
    }>;
  };

  context: {
    activeRole: string;               // which role they're acting as
    activeBranchId: string | null;
    activeDepartmentId: string | null;
    activeCourseId: string | null;
    activeSemesterId: string | null;
    currentPage: string;
    breadcrumbs: { label: string; href?: string }[];
  };

  // Feature slices (each detailed in actor files)
  notifications: NotificationState;
  messaging: MessagingState;
  calendar: CalendarState;
}
```

## 7.2 RTK Query Architecture

### Base API Configuration

```typescript
const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Course",
    "Module",
    "Lesson",
    "Enrollment",
    "Assignment",
    "Submission",
    "Assessment",
    "Attempt",
    "Grade",
    "Attendance",
    "Certificate",
    "Portfolio",
    "Job",
    "Application",
    "Contact",
    "Deal",
    "Project",
    "Task",
    "Ticket",
    "Invoice",
    "Payment",
    "Expense",
    "Payroll",
    "Employee",
    "Leave",
    "HrRecord",
    "Inventory",
    "PO",
    "Supplier",
    "Admission",
    "Interview",
    "Forum",
    "Event",
    "Group",
    "Notification",
    "Message",
    "Partner",
    "Agreement",
    "Scholarship",
    "Volunteer",
    "Analytics",
    "SystemConfig",
    "FeatureFlag",
    "Visitor",
  ],
  endpoints: () => ({}), // Extended per module
});
```

### Cache Invalidation Rules

```typescript
// Mutation â†’ Tags invalidated
const cacheInvalidation = {
  createSubmission: ["Submission", "Assignment", "Enrollment"],
  updateSubmission: ["Submission", "Grade"],
  gradeSubmission: ["Submission", "Grade", "Enrollment"],
  createEnrollment: ["Enrollment", "Course", "User"],
  updateEnrollment: ["Enrollment", "Course"],
  createInvoice: ["Invoice", "Contact"],
  recordPayment: ["Invoice", "Payment"],
  createTicket: ["Ticket", "Contact"],
  resolveTicket: ["Ticket"],
  postForumMessage: ["Forum"],
  createEvent: ["Event"],
  registerEvent: ["Event"],
  updateAttendance: ["Attendance", "Enrollment"],
  createLeaveRequest: ["Leave", "Employee"],
  approveLeave: ["Leave", "Employee"],
  createPO: ["PO", "Supplier", "Inventory"],
  updateInventory: ["Inventory"],
  processPayroll: ["Payroll", "Employee"],
  updatePermissions: ["User"], // broad invalidation
  createApplication: ["Admission"],
  updateApplication: ["Admission"],
};
```

### Optimistic Updates Pattern

```typescript
// Applied on high-frequency mutations for instant UI feedback
const optimisticUpdates = {
  likePost: {
    query: (postId) => ({ url: `/community/posts/${postId}/like`, method: "POST" }),
    optimisticUpdate: (draft, postId) => {
      const post = draft.find((p) => p.id === postId);
      if (post) {
        post.isLiked = true;
        post.likeCount = (post.likeCount || 0) + 1;
      }
    },
  },
  markNotificationRead: {
    query: (notifId) => ({ url: `/notifications/${notifId}/read`, method: "PATCH" }),
    optimisticUpdate: (draft, notifId) => {
      const notif = draft.find((n) => n.id === notifId);
      if (notif) notif.status = "read";
    },
  },
  updateTaskStatus: {
    query: ({ taskId, status }) => ({ url: `/tasks/${taskId}`, method: "PATCH", body: { status } }),
    optimisticUpdate: (draft, { taskId, status }) => {
      const task = draft.find((t) => t.id === taskId);
      if (task) task.status = status;
    },
  },
};
```

### Polling & Real-Time Sync

| Data Type               | Strategy                              | Interval / Trigger          |
| ----------------------- | ------------------------------------- | --------------------------- |
| Notifications           | Polling + WebSocket                   | Poll every 30s, push on new |
| Messages (chat)         | WebSocket (Durable Object)            | Real-time                   |
| Live class              | WebSocket                             | Real-time                   |
| Active enrollments      | Polling                               | Every 60s                   |
| Ticket status           | Polling                               | Every 30s                   |
| Payment status          | Polling (after payment action)        | Every 10s Ã— 10, then stop   |
| Analytics dashboards    | Manual refresh + auto every 5min      | On focus, every 5min        |
| Course catalog (public) | ISR (Incremental Static Regeneration) | Revalidate every 60s        |
| Other data              | Cache-then-network (RTK Query)        | On mutation invalidation    |

---

