# Actor: Developer

## 1. Identity & Role Definition

**Actor ID:** `developer`  
**Display Name:** Developer  
**Description:** Internal software developer building and maintaining CEA-OS. Works with frontend (Next.js/React/TypeScript/Tailwind/shadcn) and backend (Cloudflare Workers/Hono/Drizzle/R2/KV/Queues/Durable Objects). Manages code, deployments, API documentation, monitoring, and peer reviews.  
**System Role:** `developer_staff`  
**Hierarchy:** Reports to Tech Lead (role: `tech_lead`)  
**Session Timeout:** 120 minutes of inactivity  
**Concurrent Sessions:** No limit

## 2. Primary Goals & Success KPIs

| Goal                      | KPI                          | Target             |
| ------------------------- | ---------------------------- | ------------------ |
| Ship quality code         | PR acceptance rate           | > 90%              |
| Maintain API reliability  | API error rate               | < 0.1%             |
| Keep dependencies current | Dependency freshness score   | > 80%              |
| Documentation coverage    | API endpoint documentation % | 100%               |
| Deployment success        | Deployment success rate      | > 99%              |
| Code review throughput    | Reviews completed per week   | > 5                |
| Test coverage             | Code coverage percentage     | > 80%              |
| Bug fix velocity          | Mean time to resolve (MTTR)  | < 24h for critical |

## 3. Complete Screen Inventory

### 3.1 Dev Hub (`/dev`)

**Wireframe:** Central developer dashboard with git stats, deployment status, recent activity, and quick links.

**Top Section — Status Cards:**

- **Deployments:** Last deploy status (success/failure), time since last deploy
- **Open PRs:** Count, awaiting review, changes requested, approved
- **Open Bugs:** Count by severity (critical/high/medium/low)
- **API Uptime:** Current status, 24h uptime %
- **Test Status:** Last test run (pass/fail), coverage percentage

**Middle — Activity Feed:**

- Recent commits, deployments, PR activity, error alerts
- Filterable by repository, type, actor
- Infinite scroll

**Quick Links Section:**

- API Playground, Deployments, Monitoring, Tasks, Git/PR Status, Documentation, Team/Code Review Queue

**Data Bindings:**

- `GET /api/dev/dashboard?t={timestamp}`

**States:**

| State          | Behavior                                                            |
| -------------- | ------------------------------------------------------------------- |
| Loading        | Card skeletons (5 blocks), activity shimmer                         |
| Empty          | "Welcome to Dev Hub. Connect your first repository to get started." |
| Error          | "Unable to load dashboard data. [Retry]"                            |
| Deploy failing | Red banner: "Last deployment failed. [View Deploy Logs]"            |

### 3.2 API Playground (`/dev/api-playground`)

**Wireframe:** Interactive Swagger/OpenAPI documentation with live endpoint testing.

**Left Panel — Endpoint List:**

- Grouped by tag/module: Admissions, Marketing, IT, System, Auth, Users, etc.
- Expandable: Method badge (GET=green, POST=blue, PATCH=orange, DELETE=red), Path, Summary
- Search: filter endpoints by name/path
- "Try It Out" toggle per endpoint

**Center Panel — Endpoint Detail:**

- **Path + Method:** Full URL, Method badge
- **Description:** Full description from OpenAPI spec
- **Parameters:** Table: Name, In (path/query/header), Type, Required, Description, Example
- **Request Body:** For POST/PATCH/PUT: Schema (JSON), Example value, "Generate Example" button
- **Authentication:** Badge showing required auth (Bearer, API Key, Cookie)
- **"Try It Out" Section:**
  - Parameter inputs (text fields, dropdowns for enums, file upload for multipart)
  - Body JSON editor (CodeMirror/Monaco with syntax highlighting)
  - "Send Request" button
  - Response: Status code, Headers, Body (JSON formatted), Response time, Size

**Right Panel — Code Snippets:**

- Language tabs: cURL, TypeScript/fetch, Python, Go, Java, Ruby
- Auto-generated from current request parameters
- Copy-to-clipboard button

**Data Bindings:**

- Spec: `GET /api/openapi.json` (served from backend)
- Try-it-out: Uses actual API endpoints with CORS

**States:**

| State             | Behavior                                                                      |
| ----------------- | ----------------------------------------------------------------------------- |
| Loading           | Swagger UI skeleton                                                           |
| Spec not loaded   | "Unable to load API specification. [Retry]"                                   |
| Request in flight | Loading spinner on Send button, response area shows "Waiting for response..." |
| Error response    | Response shows with red status code, error body formatted                     |
| Auth required     | "This endpoint requires authentication. [Login]" if session expired           |

### 3.3 Deployments (`/dev/deployments`)

**Wireframe:** Deployment history, pipeline status, and manual deploy triggers.

**Top Section — Current Status:**

- Environment tabs: Production, Staging, Development
- Per environment: Current version (commit hash), Deployed at, Status (Healthy/Degraded/Deploying/Failed), Rollback button

**Deploy History Table:**

- Columns: Version/Commit (short hash + message), Branch, Environment, Status (Success/Failed/Rolling back/Rolled back), Triggered By, Duration, Started, Actions
- Status badges with color: Green (success), Red (failed), Yellow (in progress), Gray (rolled back)
- Click row → deployment detail modal

**Deployment Detail Modal:**

- Git commit: full message, author, hash, branch, PR link
- Pipeline steps: Build, Test, Lint, Deploy, Health Check
  - Each step: name, status (pending/running/success/failed/skipped), duration, logs link
- Logs viewer: Real-time log streaming (if in progress), scrollable with search
- Artifacts: Build output, test reports, coverage report
- Rollback button (only for production, requires confirmation + reason)
- "Redeploy" button

**Manual Deploy Trigger:**

- Branch selector (dropdown, from git branches)
- Environment selector (staging/dev only — production deploys via CI only)
- Optional: Commit hash override, Deploy notes
- "Deploy" button → triggers pipeline

**Data Bindings:**

- Deployments: `GET /api/dev/deployments?env={env}&limit=20`
- Detail: `GET /api/dev/deployments/{id}`
- Trigger: `POST /api/dev/deployments/trigger`
- Rollback: `POST /api/dev/deployments/{id}/rollback`
- Pipeline logs: `GET /api/dev/deployments/{id}/logs` (SSE stream)

**States:**

| State                | Behavior                                              |
| -------------------- | ----------------------------------------------------- |
| Loading              | Table skeleton                                        |
| Empty                | "No deployments yet. Deploy your first build."        |
| Deploy in progress   | Real-time log streaming in modal, animated status     |
| Deploy failed        | Red status, error details in logs, "View Logs"        |
| Rollback in progress | Yellow status bar, service may be briefly unavailable |

### 3.4 Monitoring & Errors (`/dev/monitoring`)

**Wireframe:** Real-time error tracking, performance monitoring, and service health.

**Top Section — Alert Bar:**

- Current alerts: Count, highest severity
- "Acknowledge All" button

**Error Tracking Tab:**

- Error group list: Error message, Count (24h), Users affected, First seen, Last seen, Status (Unresolved/Resolved/Ignored)
- Click error group → error detail:
  - Stack trace with source maps (clickable file:line links)
  - Occurrences timeline chart
  - Recent events table: Timestamp, User, URL, Browser, OS, IP, Event ID
  - Metadata: Release version, Environment, Tags
  - Actions: Resolve, Ignore, Assign to developer, Create ticket
- Filter: Environment, Status, Severity, Date range, Search
- Real-time: New errors appear via WebSocket

**Performance Tab:**

- Page load times (P50, P95, P99) — time series chart
- API response times (P50, P95, P99) — per endpoint
- Error rate (5xx / total requests) — time series
- Slowest endpoints table: Endpoint, Method, Avg, P95, P99, Request count
- Database query performance: Slow queries, query count, avg execution time

**Services Tab:**

- Service dependency graph (shows internal/external service dependencies)
- Each node: Service name, Status, Error rate, Response time
- Latency indicators on edges
- Click node → service detail

**Data Bindings:**

- Errors: `GET /api/dev/monitoring/errors?env={env}&status={status}&limit=20`
- Error detail: `GET /api/dev/monitoring/errors/{id}`
- Performance: `GET /api/dev/monitoring/performance?period={period}`
- Services: `GET /api/dev/monitoring/services`
- Real-time: WebSocket `ws://{host}/dev/monitoring/live`

**States:**

| State             | Behavior                                                  |
| ----------------- | --------------------------------------------------------- |
| Loading           | Chart skeletons, error list shimmer                       |
| No errors         | "No errors in the selected period. 🎉"                    |
| Empty performance | "Insufficient data for this period."                      |
| Error spike       | Alert bar: "Error rate spike: {n}x normal. [Investigate]" |

### 3.5 Tasks (`/dev/tasks`)

**Wireframe:** Personal and team task board (Kanban or list view) integrated with GitHub issues.

**View Toggle:** Board (Kanban) / List / Calendar

**Kanban Columns:** Backlog, To Do, In Progress, In Review, Done

- Drag cards between columns
- Column WIP limits (configurable per project)

**Task Card:**

- Title, Issue # (linked to GitHub), Priority badge, Type (Bug/Feature/Chore/Improvement), Assignee avatar, Due date, Story points, Labels

**Task Detail Modal:**

- Title, Description (markdown)
- Type, Priority, Status, Story points, Due date
- Linked GitHub issue / PR
- Assignee, Reporter
- Comments thread
- Subtasks (checklist)
- Time tracking: Logged time, Estimate remaining
- Attachments
- Activity log

**Filters:**

- Status, Priority, Type, Assignee, Label, Milestone, Sprint
- Search by title/ID

**Quick Create Modal:**

- Title, Description, Type, Priority, Assignee, Labels
- "Create Issue on GitHub" checkbox

**Data Bindings:**

- Tasks: `GET /api/dev/tasks?sprint={id}&assignee={id}&status={status}`
- Create: `POST /api/dev/tasks`
- Update: `PATCH /api/dev/tasks/{id}`
- Reorder: `POST /api/dev/tasks/reorder` (kanban drag)

**States:**

| State             | Behavior                                                      |
| ----------------- | ------------------------------------------------------------- |
| Loading           | Board skeleton with column shimmers                           |
| Empty column      | "No tasks in this column" with ghost card placeholder         |
| Empty board       | "No tasks yet. Create your first task or sync with GitHub."   |
| WIP limit reached | Column header shows count in red, tooltip "WIP limit reached" |

### 3.6 Git/PR Status (`/dev/git`)

**Wireframe:** GitHub integration showing repositories, pull requests, and commit history.

**Repository Selector:** Dropdown of connected repos (current: cea-platform)

**PR Tab:**

- PR list: PR #, Title, Status (Open/Closed/Merged), Branch, Base, Author, Created, Updated, Review status (Approved/Changes Requested/Review Required), CI status (Pass/Fail/Pending)
- Filters: Status, Author, Label, Review status
- Click → PR detail (opens GitHub in new tab or inline viewer)
- "Create PR" button → branch selector, title, body (markdown), reviewers, labels, create (via API)

**Commits Tab:**

- Recent commits: Commit hash (short), Message, Author, Date, Branch, PR linked
- Click → commit detail (diff view)
- "Browse Files at Commit" link

**Branches Tab:**

- Branch table: Name, Last commit, Author, Updated, Ahead/Behind main, CI status
- Protected branch indicator (lock icon)
- Delete branch button (protected branches require confirmation)

**Data Bindings:**

- PRs: `GET /api/dev/git/prs?repo={repo}&status={status}`
- Commits: `GET /api/dev/git/commits?repo={repo}&branch={branch}`
- Branches: `GET /api/dev/git/branches?repo={repo}`
- Create PR: `POST /api/dev/git/prs`

**States:**

| State           | Behavior                                                      |
| --------------- | ------------------------------------------------------------- |
| Loading         | PR list skeleton                                              |
| No PRs          | "No open pull requests."                                      |
| CI failing      | Red CI icon on PR card, hover: "CI checks failed for this PR" |
| Merge conflicts | PR card shows "Conflicts" badge, "Resolve" link               |

### 3.7 Documentation (`/dev/docs`)

**Wireframe:** Internal developer documentation with markdown rendering, search, and edit capabilities.

**Layout:** Split panel: Table of Contents (left), Content (center), Right sidebar (On this page, metadata)

**Content Types:**

- Architecture docs
- API integration guides
- Development setup guide
- Deployment runbook
- Database schema documentation
- Coding standards
- Environment configuration
- Incident response runbook
- Third-party service integration docs

**Features:**

- Full-text search across all docs
- Markdown editing with live preview (edit toggle)
- Version history (git-based)
- "Edit this page" link → opens GitHub
- "Was this helpful?" feedback
- Related documents at bottom

**Data Bindings:**

- Docs: `GET /api/dev/docs?path={path}`
- Search: `GET /api/dev/docs/search?q={query}`

**States:**

| State           | Behavior                                           |
| --------------- | -------------------------------------------------- |
| Loading         | Document skeleton with TOC placeholders            |
| Not found       | "Documentation page not found. [Create this page]" |
| Edit mode       | Save/Cancel buttons, markdown toolbar              |
| Unsaved changes | Warning before navigating away                     |

### 3.8 Team / Code Review Queue (`/dev/reviews`)

**Wireframe:** Code review request queue with filtering and inline review capabilities.

**Review Queue:**

- Cards: PR Title, Repository, Author, Created, Size (lines changed: S/M/L/XL), Review status badge, Priority, Labels
- Sorted by: Priority (desc), Wait time (desc)
- Filters: Repository, Author, Size, Label, Status

**Review Workspace (when reviewing a PR):**

- **Left Panel:** Files changed tree view (expand/collapse, show added/deleted/changed count per file)
- **Center Panel:** Split diff view (old/new side by side or unified)
  - Syntax highlighting
  - Line numbers on both sides
  - Changed lines: green background (added), red background (deleted)
  - Inline comment button on each line
  - Resolved/unresolved comment indicators
- **Right Panel:** PR conversation
  - PR description
  - Review comments thread (per-line and general)
  - "Approve" / "Request Changes" / "Comment" buttons
  - Review summary textarea (markdown)
  - "Submit Review" button

**Inline Code Comments:**

- Click line number → comment box appears
- @mention teammates
- Markdown formatting
- "Start a Review" (adds to pending review) vs "Add single comment"
- Resolve conversation button

**Data Bindings:**

- Queue: `GET /api/dev/reviews?repo={repo}`
- PR detail: `GET /api/dev/reviews/{prId}`
- Submit review: `POST /api/dev/reviews/{prId}/review`
- Add comment: `POST /api/dev/reviews/{prId}/comments`

**States:**

| State                  | Behavior                                                               |
| ---------------------- | ---------------------------------------------------------------------- |
| Loading                | Queue skeleton cards                                                   |
| Empty                  | "No pending reviews. You're up to date!"                               |
| Large PR (1000+ lines) | Warning: "This PR is very large. Consider splitting into smaller PRs." |
| Merge conflicts in PR  | Banner: "This PR has merge conflicts that need to be resolved."        |
| CI failing             | Banner: "CI checks are failing. Review with caution."                  |

## 4. Full Database Schema

```typescript
// ============================================================
// schema/dev/index.ts
// ============================================================
import { sqliteTable, text, integer, real, uniqueIndex, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ─────────────────────────────────────────────
// 1. DEPLOYMENTS
// ─────────────────────────────────────────────
export const deployments = sqliteTable("dev_deployments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  version: text("version").notNull(), // semantic version or commit-based
  commitHash: text("commit_hash").notNull(),
  commitMessage: text("commit_message"),
  branch: text("branch").notNull(),
  environment: text("environment", { enum: ["production", "staging", "development"] }).notNull(),
  status: text("status", {
    enum: [
      "pending",
      "building",
      "testing",
      "deploying",
      "health_check",
      "success",
      "failed",
      "rolling_back",
      "rolled_back",
    ],
  })
    .notNull()
    .default("pending"),
  triggeredById: text("triggered_by_id").references(() => users.id),
  pipelineSteps: text("pipeline_steps", { mode: "json" }).$type<PipelineStep[]>().default([]),
  duration: integer("duration"), // seconds
  rollbackReason: text("rollback_reason"),
  rollbackFromId: text("rollback_from_id"), // deployment ID this rolls back to
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
// 2. ERROR GROUPS (aggregated)
// ─────────────────────────────────────────────
export const errorGroups = sqliteTable("dev_error_groups", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  message: text("message").notNull(),
  type: text("type"), // Error class name
  stackTrace: text("stack_trace"),
  sourceFile: text("source_file"),
  sourceLine: integer("source_line"),
  // Aggregation
  count: integer("count").default(0),
  usersAffected: integer("users_affected").default(0),
  firstSeen: text("first_seen")
    .notNull()
    .default(sql`(current_timestamp)`),
  lastSeen: text("last_seen")
    .notNull()
    .default(sql`(current_timestamp)`),
  environment: text("environment", {
    enum: ["production", "staging", "development", "all"],
  }).default("all"),
  status: text("status", { enum: ["unresolved", "resolved", "ignored"] })
    .notNull()
    .default("unresolved"),
  assignedToId: text("assigned_to_id").references(() => users.id),
  releaseVersion: text("release_version"),
  tags: text("tags", { mode: "json" }).$type<string[]>().default([]),
  resolvedAt: text("resolved_at"),
  resolvedById: text("resolved_by_id").references(() => users.id),
});

// ─────────────────────────────────────────────
// 3. ERROR EVENTS (individual occurrences)
// ─────────────────────────────────────────────
export const errorEvents = sqliteTable("dev_error_events", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  groupId: text("group_id")
    .notNull()
    .references(() => errorGroups.id, { onDelete: "cascade" }),
  message: text("message").notNull(),
  stackTrace: text("stack_trace"),
  url: text("url"),
  userId: text("user_id"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  browser: text("browser"),
  os: text("os"),
  device: text("device"),
  environment: text("environment"),
  releaseVersion: text("release_version"),
  metadata: text("metadata", { mode: "json" }).$type<Record<string, unknown>>().default({}),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 4. TASKS
// ─────────────────────────────────────────────
export const tasks = sqliteTable("dev_tasks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type", { enum: ["bug", "feature", "chore", "improvement"] })
    .notNull()
    .default("feature"),
  priority: text("priority", { enum: ["critical", "high", "medium", "low"] })
    .notNull()
    .default("medium"),
  status: text("status", { enum: ["backlog", "todo", "in_progress", "in_review", "done"] })
    .notNull()
    .default("backlog"),
  storyPoints: integer("story_points"),
  dueDate: text("due_date"),
  // Relationships
  assigneeId: text("assignee_id").references(() => users.id),
  reporterId: text("reporter_id").references(() => users.id),
  sprintId: text("sprint_id").references(() => sprints.id),
  // GitHub integration
  githubIssueNumber: integer("github_issue_number"),
  githubIssueUrl: text("github_issue_url"),
  githubPrNumber: integer("github_pr_number"),
  githubRepo: text("github_repo"),
  // Time tracking
  timeEstimate: integer("time_estimate"), // minutes
  timeLogged: integer("time_logged").default(0), // minutes
  // Metadata
  labels: text("labels", { mode: "json" }).$type<string[]>().default([]),
  sortOrder: integer("sort_order").default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 5. SPRINTS
// ─────────────────────────────────────────────
export const sprints = sqliteTable("dev_sprints", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(), // e.g., "Sprint 12"
  goal: text("goal"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  status: text("status", { enum: ["planning", "active", "completed"] })
    .notNull()
    .default("planning"),
  velocity: integer("velocity"), // completed story points, computed after sprint
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 6. TASK COMMENTS
// ─────────────────────────────────────────────
export const taskComments = sqliteTable("dev_task_comments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  taskId: text("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  authorId: text("author_id").references(() => users.id),
  body: text("body").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 7. DOCUMENTATION PAGES
// ─────────────────────────────────────────────
export const docPages = sqliteTable("dev_doc_pages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  path: text("path").notNull().unique(), // e.g., /architecture/overview
  content: text("content").notNull(), // markdown
  contentType: text("content_type", {
    enum: ["guide", "reference", "runbook", "standard", "architecture"],
  })
    .notNull()
    .default("guide"),
  parentId: text("parent_id").references((): typeof docPages => docPages.id),
  sortOrder: integer("sort_order").default(0),
  authorId: text("author_id").references(() => users.id),
  lastEditorId: text("last_editor_id").references(() => users.id),
  isPublished: integer("is_published", { mode: "boolean" }).default(true),
  viewCount: integer("view_count").default(0),
  helpfulCount: integer("helpful_count").default(0),
  notHelpfulCount: integer("not_helpful_count").default(0),
  publishedAt: text("published_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// 8. CODE REVIEWS (cached from GitHub)
// ─────────────────────────────────────────────
export const codeReviews = sqliteTable("dev_code_reviews", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  prNumber: integer("pr_number").notNull(),
  prTitle: text("pr_title").notNull(),
  repository: text("repository").notNull(),
  authorId: text("author_id").references(() => users.id),
  baseBranch: text("base_branch").notNull(),
  headBranch: text("head_branch").notNull(),
  status: text("status", { enum: ["open", "closed", "merged"] })
    .notNull()
    .default("open"),
  reviewStatus: text("review_status", {
    enum: ["review_required", "changes_requested", "approved"],
  }).default("review_required"),
  ciStatus: text("ci_status", { enum: ["pending", "pass", "fail", "unknown"] }).default("unknown"),
  additions: integer("additions").default(0),
  deletions: integer("deletions").default(0),
  changedFiles: integer("changed_files").default(0),
  labels: text("labels", { mode: "json" }).$type<string[]>().default([]),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// ─────────────────────────────────────────────
// Indexes
// ─────────────────────────────────────────────
export const deploymentsEnvIdx = index("idx_dev_deployments_env").on(deployments.environment);
export const deploymentsStatusIdx = index("idx_dev_deployments_status").on(deployments.status);
export const deploymentsCreatedIdx = index("idx_dev_deployments_created").on(deployments.createdAt);
export const errorGroupsStatusIdx = index("idx_dev_errors_status").on(errorGroups.status);
export const errorGroupsLastSeenIdx = index("idx_dev_errors_last_seen").on(errorGroups.lastSeen);
export const errorEventsGroupIdx = index("idx_dev_error_events_group").on(errorEvents.groupId);
export const errorEventsCreatedIdx = index("idx_dev_error_events_created").on(
  errorEvents.createdAt,
);
export const tasksStatusIdx = index("idx_dev_tasks_status").on(tasks.status);
export const tasksAssigneeIdx = index("idx_dev_tasks_assignee").on(tasks.assigneeId);
export const tasksSprintIdx = index("idx_dev_tasks_sprint").on(tasks.sprintId);
export const tasksPriorityIdx = index("idx_dev_tasks_priority").on(tasks.priority);
export const docPagesPathIdx = uniqueIndex("idx_dev_doc_pages_path").on(docPages.path);
export const docPagesSlugIdx = uniqueIndex("idx_dev_doc_pages_slug").on(docPages.slug);
export const codeReviewsRepoPrIdx = uniqueIndex("idx_dev_code_reviews_repo_pr").on(
  codeReviews.repository,
  codeReviews.prNumber,
);
export const codeReviewsStatusIdx = index("idx_dev_code_reviews_status").on(codeReviews.status);

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface PipelineStep {
  name: string;
  status: "pending" | "running" | "success" | "failed" | "skipped";
  startedAt?: string;
  completedAt?: string;
  duration?: number;
  logUrl?: string;
}
```

## 5. Complete API Contract

### 5.1 Deployment Endpoints

#### `GET /api/dev/deployments`

**Query:** `{ environment?: string; status?: string; limit?: number; offset?: number; }`

**Response `200`:**

```typescript
{ items: DeploymentListItem[]; total: number; hasMore: boolean; }
```

#### `POST /api/dev/deployments/trigger`

**Request:**

```typescript
{ branch: string; environment: "staging" | "development"; commitHash?: string; notes?: string; }
```

**Response `201`: `{ id: string; status: "pending"; }`**

#### `POST /api/dev/deployments/{id}/rollback`

**Request:**

```typescript
{
  reason: string;
}
```

**Auth:** `tech_lead` or `developer_staff` with deploy permissions

### 5.2 Error Monitoring Endpoints

#### `GET /api/dev/monitoring/errors`

**Query:** `{ environment?: string; status?: string; search?: string; limit?: number; offset?: number; }`

#### `PATCH /api/dev/monitoring/errors/{id}`

**Request:**

```typescript
{ status?: "resolved" | "ignored"; assignedToId?: string; }
```

### 5.3 Task Endpoints

#### `GET /api/dev/tasks`

**Query:** `{ status?: string; sprintId?: string; assigneeId?: string; type?: string; priority?: string; search?: string; }`

#### `POST /api/dev/tasks`

**Request:**

```typescript
{ title: string; description?: string; type: string; priority: string; assigneeId?: string; sprintId?: string; storyPoints?: number; dueDate?: string; labels?: string[]; createGithubIssue?: boolean; }
```

#### `POST /api/dev/tasks/reorder`

**Request:**

```typescript
{
  taskId: string;
  newStatus: string;
  newSortOrder: number;
}
```

### 5.4 Code Review Endpoints

#### `GET /api/dev/reviews`

**Query:** `{ repository?: string; status?: string; authorId?: string; size?: string; label?: string; }`

#### `POST /api/dev/reviews/{prId}/review`

**Request:**

```typescript
{
  action: "approve" | "request_changes" | "comment";
  body: string;
}
```

### 5.5 Documentation Endpoints

#### `GET /api/dev/docs/search`

**Query:** `{ q: string; }`

**Response `200`:**

```typescript
{
  results: {
    id: string;
    title: string;
    path: string;
    excerpt: string;
  }
  [];
}
```

## 6. Component Tree

```
<DevLayout>
  ├── <DevHub>
  │   ├── <DevStatusCards />
  │   ├── <DevActivityFeed />
  │   └── <QuickLinks />
  │
  ├── <ApiPlayground>
  │   ├── <EndpointList />
  │   ├── <EndpointDetail>
  │   │   ├── <EndpointHeader />
  │   │   ├── <ParametersTable />
  │   │   ├── <RequestBodyEditor />
  │   │   ├── <TryItOutSection>
  │   │   │   ├── <ParameterInputs />
  │   │   │   ├── <JsonEditor />
  │   │   │   ├── <SendButton />
  │   │   │   └── <ResponseViewer />
  │   │   └── <CodeSnippets />
  │   └── <AuthSelector />
  │
  ├── <DeploymentsPage>
  │   ├── <EnvironmentTabs />
  │   ├── <DeployHistoryTable />
  │   ├── <DeployDetailModal>
  │   │   ├── <CommitInfo />
  │   │   ├── <PipelineSteps />
  │   │   ├── <LogStream />
  │   │   └── <RollbackButton />
  │   └── <ManualDeployForm />
  │
  ├── <MonitoringPage>
  │   ├── <AlertBar />
  │   ├── <ErrorTrackingTab>
  │   │   ├── <ErrorGroupList />
  │   │   └── <ErrorDetail>
  │   │       ├── <StackTrace />
  │   │       ├── <OccurrencesChart />
  │   │       ├── <EventTable />
  │   │       └── <ErrorActions />
  │   ├── <PerformanceTab>
  │   │   ├── <PageLoadChart />
  │   │   ├── <ApiResponseChart />
  │   │   └── <SlowestEndpoints />
  │   └── <ServicesTab>
  │       ├── <ServiceDependencyGraph />
  │       └── <ServiceDetail />
  │
  ├── <TasksPage>
  │   ├── <ViewToggle />
  │   ├── <TaskFilters />
  │   ├── <KanbanBoard>
  │   │   └── <KanbanColumn *ngFor>
  │   │       └── <TaskCard *ngFor />
  │   ├── <TaskDetailModal>
  │   │   ├── <TaskMetadata />
  │   │   ├── <Description />
  │   │   ├── <Comments />
  │   │   ├── <Subtasks />
  │   │   └── <TimeTracking />
  │   └── <QuickCreateModal />
  │
  ├── <GitStatusPage>
  │   ├── <RepoSelector />
  │   ├── <PrList>
  │   │   └── <PrCard *ngFor />
  │   ├── <CommitsList />
  │   ├── <BranchesTable />
  │   └── <CreatePrModal />
  │
  ├── <DocumentationPage>
  │   ├── <DocTocSidebar />
  │   ├── <DocContentViewer>
  │   │   └── <MarkdownRenderer />
  │   ├── <DocEditToggle />
  │   └── <DocRightSidebar />
  │
  └── <CodeReviewQueue>
      ├── <ReviewFilters />
      ├── <ReviewCardGrid />
      └── <ReviewWorkspace>
          ├── <FileTree />
          ├── <DiffViewer />
          ├── <InlineCommentThread />
          └── <ReviewActions />
```

## 7-15. (Detailed specifications)

**Business Rules:**

1. Production deploys blocked on Friday after 2 PM (change freeze window)
2. Production deploys require at least 1 approval, all CI checks passing, no unresolved critical bugs
3. Staging auto-deploys from `main` branch after successful CI
4. Error grouping: same stack trace + message = same group; fuzzy matching for slight variations
5. Task WIP limits: In Progress max 3 per developer; In Review max 5 total
6. Code review requirements: 2 approvals for production, 1 for staging
7. Documentation review: every PR changing public API must include/update docs

**Permissions:**

| Feature                   | Developer | Tech Lead | Admin |
| ------------------------- | --------- | --------- | ----- |
| View deployments          | ✅        | ✅        | ✅    |
| Trigger staging deploy    | ✅        | ✅        | ✅    |
| Trigger production deploy | ❌        | ✅        | ✅    |
| Rollback                  | ❌        | ✅        | ✅    |
| View errors               | ✅        | ✅        | ✅    |
| Resolve/ignore errors     | ✅        | ✅        | ✅    |
| Tasks CRUD                | Own       | All       | All   |
| Code review (approve)     | ✅        | ✅        | ✅    |
| Code review (merge)       | ❌        | ✅        | ✅    |
| Edit docs                 | ✅        | ✅        | ✅    |
| Manage API keys           | ❌        | ✅        | ✅    |
| Manage repos              | ❌        | ✅        | ✅    |

**Notifications:**

- N-D01: Deploy started/failed/succeeded (in-app + Slack)
- N-D02: New error group created (critical: Slack + email; high: Slack only)
- N-D03: PR assigned for review (in-app)
- N-D04: @mention in PR comment (in-app + email)
- N-D05: Task assigned (in-app)
- N-D06: CI failure on your PR (in-app + Slack)
- N-D07: Security vulnerability found in dependencies (Slack + email, Critical)

**Error/Edge Cases:**

- E01: Deploy pipeline hangs > 30 min → auto-fail, notify tech lead
- E02: Error event volume > 1000/min → sample storage (1:10 rate), aggregate counters
- E03: GitHub API rate limit → cache PR data with 60s TTL, show stale indicator
- E04: OpenAPI spec out of sync with code → version mismatch warning on playground
- E05: Documentation page slug conflict → auto-suffix with `-2`
- E06: Merge conflict on PR → cannot merge via UI, requires local resolution
- E07: Large PR (>2000 lines) → warning, collapse unchanged files by default

### 3.9 Additional Screen: Environment Variables (`/dev/env`)

**Wireframe:** Manage environment-specific configuration variables across development, staging, and production.

**Environment Tabs:** Development / Staging / Production

- Color coded: Dev=green, Staging=orange, Production=red

**Variables Table:**

- Columns: Key, Value (masked for secrets), Last Updated, Updated By, Source (file/UI/secret manager)
- Search by key name
- "➕ Add Variable" button, "📥 Import from .env" button

**Add/Edit Variable Modal:**

- Key (UPPER_SNAKE_CASE validation), Value, Environment (single/all), Is Secret (masked by default), Description
- "Save" button

**Secret Management:**

- Integration with Cloudflare Workers Secrets
- List of secret names (values never displayed — only "Set" / "Rotate" actions)
- Last rotated date

**Data Bindings:**

- `GET /api/dev/env?environment={env}`
- `PUT /api/dev/env/{key}`
- `DELETE /api/dev/env/{key}`
- `POST /api/dev/env/import`

### 3.10 Additional Screen: Background Jobs / Queues (`/dev/queues`)

**Wireframe:** Cloudflare Queues management dashboard showing job status, retries, and failures.

**Queues List:**

- Table: Queue Name, Messages Processed, Messages Waiting, Messages Failed, Avg Processing Time, Last Activity
- Click → queue detail

**Queue Detail:**

- Real-time metrics chart: processed, failed, retried (time series)
- Failed messages table: Message ID, Payload (truncated), Error, Retry count, Last Attempt
- Actions: Retry (single/bulk), Purge, Send Test Message
- Consumer status: Active/Paused/Error, Last heartbeat

**Data Bindings:**

- `GET /api/dev/queues`
- `GET /api/dev/queues/{name}`
- `POST /api/dev/queues/{name}/retry`
- `POST /api/dev/queues/{name}/purge`

## 4.1 Extended Schema: Environment Variables

```typescript
export const envVariables = sqliteTable(
  "dev_env_variables",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    key: text("key").notNull(),
    value: text("value"), // encrypted at rest
    environment: text("environment", { enum: ["development", "staging", "production", "all"] })
      .notNull()
      .default("all"),
    isSecret: integer("is_secret", { mode: "boolean" }).default(false),
    description: text("description"),
    source: text("source", { enum: ["ui", "file_import", "secret_manager"] }).default("ui"),
    updatedById: text("updated_by_id").references(() => users.id),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(current_timestamp)`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`(current_timestamp)`)
      .$onUpdate(() => sql`(current_timestamp)`),
  },
  (table) => ({
    keyEnvIdx: uniqueIndex("idx_dev_env_key_env").on(table.key, table.environment),
  }),
);
```

## 5.1 Extended API Endpoints

#### `GET /api/dev/env?environment=staging` — List env variables

#### `PUT /api/dev/env/DB_HOST` — `{ value, environment, isSecret, description }`

#### `DELETE /api/dev/env/{key}?environment=staging` — Delete variable

#### `GET /api/dev/queues` — List queues with stats

#### `GET /api/dev/queues/{name}` — Queue detail with metrics

#### `POST /api/dev/queues/{name}/retry` — Retry failed messages (`{ messageIds: string[] }`)

## 7.1 Extended User Journeys

### Journey 4: Debug Production Error

1. Error spike alert triggers → **Dev** opens Monitoring → Error Tracking tab
2. Sees "TypeError: Cannot read property 'map' of undefined" — 342 occurrences in last 15 min
3. Clicks error group → stack trace shows `src/components/ApplicationCard.tsx:84`
4. Sees affected users, browser breakdown (Chrome 89%, Firefox 8%, Safari 3%)
5. Adds comment: "Likely caused by null program data from API" → assigns to self
6. Opens code in IDE, reproduces locally with mock data
7. Writes fix, pushes to branch `fix/null-program-card`
8. Opens PR via Git tab → Auto-fills from branch
9. Requests review from teammate
10. PR approved → merges to main → auto-deploys to staging
11. Verifies fix on staging → triggers production deploy
12. Error rate drops to 0 → marks error group as "resolved"
13. Writes post-mortem in docs → "Post-Mortem: ApplicationCard null pointer"

### Journey 5: API Documentation Update

1. **Dev** adds new endpoint `GET /api/admissions/enrollment/funnel`
2. Runs `npm run generate:openapi` → spec updated with new endpoint
3. Opens `/dev/api-playground` → searches for new endpoint → found
4. Verifies request/response schemas are correct
5. Adds code examples: cURL, TypeScript, Python
6. Commits spec changes to repo
7. Runbook docs auto-updated via CI

### Journey 6: Code Review Cycle

1. **Dev** receives notification: "Review requested: PR #342 — Add enrollment funnel API"
2. Opens `/dev/reviews` → sees PR in queue with size "M" (243 lines)
3. Opens PR → reviews files changed:
   - `schema/admissions.ts`: New table + migration — approved
   - `routes/admissions/enrollment.ts`: Route handlers — suggests error handling improvement
   - `validations/admissions.ts`: Zod schemas — approved
4. Adds inline comment: "Should we handle the case where intakeId is invalid?"
5. Submits review: "Changes requested" with summary
6. Author addresses feedback → re-requests review
7. **Dev** re-reviews → approves
8. PR merged → auto-deployed to staging

## 8.1 Extended Business Rules

| Rule                             | Detail                                                                             |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| RB01 — Commit Message Convention | Must follow `type(scope): description` pattern (conventional commits)              |
| RB02 — Branch Naming             | `feature/xxx`, `fix/xxx`, `chore/xxx`, `refactor/xxx`                              |
| RB03 — PR Size Limit             | Max 400 lines per PR (enforced by CI); >400 requires tech lead approval            |
| RB04 — Production Freeze         | No deployments Fri 2 PM - Mon 6 AM; exceptions via change request                  |
| RB05 — Staging Auto-Deploy       | Every merge to `main` triggers staging deploy via CI pipeline                      |
| RB06 — Secrets Rotation          | API keys rotated every 90 days; database credentials every 180 days                |
| RB07 — Error Ownership           | First seen error auto-assigns to last committer of affected file                   |
| RB08 — Code Coverage Gate        | PRs cannot decrease coverage by >2%; minimum 80% for new code                      |
| RB09 — Documentation Requirement | Every public API endpoint must have OpenAPI spec + doc page                        |
| RB10 — Dependency Updates        | Security patches within 7 days; minor updates within 30 days; major within 90 days |

## 9.1 Extended Notifications

| Code  | Trigger                           | Channel                     | Template           |
| ----- | --------------------------------- | --------------------------- | ------------------ |
| N-D08 | Deployment started                | In-app + Slack              | `deploy_started`   |
| N-D09 | Deployment succeeded              | Slack                       | `deploy_succeeded` |
| N-D10 | Deployment failed                 | In-app + Slack + SMS (prod) | `deploy_failed`    |
| N-D11 | New error group (critical)        | Slack + Email + SMS         | `error_critical`   |
| N-D12 | Error group resolved              | In-app                      | `error_resolved`   |
| N-D13 | PR review requested               | In-app + Email              | `review_requested` |
| N-D14 | PR approved                       | In-app                      | `review_approved`  |
| N-D15 | CI pipeline failed                | In-app + Slack              | `ci_failed`        |
| N-D16 | Security vulnerability found      | Email + Slack (urgent)      | `security_vuln`    |
| N-D17 | Dependency outdated (critical)    | Slack weekly digest         | `deps_outdated`    |
| N-D18 | Test suite performance regression | In-app + Slack              | `perf_regression`  |
| N-D19 | Task due today                    | In-app morning summary      | `task_due`         |
| N-D20 | Code freeze active                | In-app banner               | `code_freeze`      |

## 11.1 State Management — RTK Query (Extended)

```typescript
const devApi = createApi({
  reducerPath: "devApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/dev" }),
  tagTypes: [
    "Dashboard",
    "Deployments",
    "Deployment",
    "Errors",
    "Error",
    "Tasks",
    "Task",
    "Sprints",
    "PRs",
    "Reviews",
    "Docs",
    "Env",
    "Queues",
  ],
  endpoints: (builder) => ({
    getDashboard: builder.query<DevDashboard, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
    getDeployments: builder.query<DeploymentList, DeployQuery>({
      query: (params) => ({ url: "/deployments", params }),
      providesTags: ["Deployments"],
    }),
    triggerDeploy: builder.mutation<{ id: string }, TriggerDeployRequest>({
      query: (body) => ({ url: "/deployments/trigger", method: "POST", body }),
      invalidatesTags: ["Deployments"],
    }),
    rollbackDeploy: builder.mutation<void, { id: string; reason: string }>({
      query: ({ id, reason }) => ({
        url: `/deployments/${id}/rollback`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["Deployments", "Dashboard"],
    }),
    getErrorGroups: builder.query<ErrorGroupList, ErrorQuery>({
      query: (params) => ({ url: "/monitoring/errors", params }),
      providesTags: ["Errors"],
    }),
    updateErrorGroup: builder.mutation<
      void,
      { id: string; status?: string; assignedToId?: string }
    >({
      query: ({ id, ...body }) => ({ url: `/monitoring/errors/${id}`, method: "PATCH", body }),
      invalidatesTags: (result, error, { id }) => [{ type: "Error", id }, "Errors"],
    }),
    getTasks: builder.query<TaskList, TaskQuery>({
      query: (params) => ({ url: "/tasks", params }),
      providesTags: ["Tasks"],
    }),
    createTask: builder.mutation<{ id: string }, CreateTaskRequest>({
      query: (body) => ({ url: "/tasks", method: "POST", body }),
      invalidatesTags: ["Tasks"],
    }),
    reorderTask: builder.mutation<void, ReorderTaskRequest>({
      query: (body) => ({ url: "/tasks/reorder", method: "POST", body }),
      invalidatesTags: ["Tasks"],
    }),
    getEnvVariables: builder.query<EnvVar[], string>({
      query: (environment) => ({ url: "/env", params: { environment } }),
      providesTags: ["Env"],
    }),
    updateEnvVariable: builder.mutation<void, { key: string; body: UpdateEnvVarRequest }>({
      query: ({ key, body }) => ({ url: `/env/${key}`, method: "PUT", body }),
      invalidatesTags: ["Env"],
    }),
    getQueues: builder.query<QueueList, void>({
      query: () => "/queues",
      providesTags: ["Queues"],
    }),
    retryQueueMessages: builder.mutation<void, { name: string; messageIds: string[] }>({
      query: ({ name, messageIds }) => ({
        url: `/queues/${name}/retry`,
        method: "POST",
        body: { messageIds },
      }),
      invalidatesTags: ["Queues"],
    }),
  }),
});
```

## 12.1 Form Schemas (Zod) — Extended

```typescript
export const createTaskSchema = z.object({
  title: z.string().min(1, "Title required").max(200),
  description: z.string().max(10000).optional(),
  type: z.enum(["bug", "feature", "chore", "improvement"]),
  priority: z.enum(["critical", "high", "medium", "low"]),
  assigneeId: z.string().uuid().optional(),
  sprintId: z.string().uuid().optional(),
  storyPoints: z.number().int().min(1).max(40).optional(),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  labels: z.array(z.string().max(50)).max(10).optional(),
  createGithubIssue: z.boolean().default(false),
});

export const envVariableSchema = z.object({
  key: z
    .string()
    .regex(/^[A-Z][A-Z0-9_]*$/, "Must be UPPER_SNAKE_CASE")
    .min(1)
    .max(256),
  value: z.string().max(10000),
  environment: z.enum(["development", "staging", "production", "all"]),
  isSecret: z.boolean().default(false),
  description: z.string().max(500).optional(),
});

export const triggerDeploySchema = z
  .object({
    branch: z.string().min(1, "Branch required").max(200),
    environment: z.enum(["staging", "development"]),
    commitHash: z.string().length(40).optional(), // full SHA
    notes: z.string().max(1000).optional(),
  })
  .refine((d) => {
    // Only allow production deploy via API for tech leads
    return true; // RBAC handled at auth level
  });
```

## 13.1 Analytics Events — Extended

| Event                  | Properties                                  | Trigger                      |
| ---------------------- | ------------------------------------------- | ---------------------------- |
| `dev_deploy_triggered` | deployId, environment, branch, triggeredBy  | Manual deploy initiated      |
| `dev_deploy_rollback`  | deployId, environment, reason               | Rollback performed           |
| `dev_error_occurred`   | errorGroupId, type, environment, sourceFile | New error group created      |
| `dev_error_resolved`   | errorGroupId, resolvedBy, timeToResolve     | Error resolved               |
| `dev_task_created`     | taskId, type, priority, storyPoints         | Task created                 |
| `dev_task_completed`   | taskId, cycleTime                           | Task moved to done           |
| `dev_pr_created`       | prNumber, repo, size, filesChanged          | PR opened                    |
| `dev_pr_merged`        | prNumber, repo, timeToMerge                 | PR merged                    |
| `dev_pr_reviewed`      | prNumber, reviewerId, action                | Review submitted             |
| `dev_env_updated`      | key, environment                            | Env variable created/updated |
| `dev_queue_retry`      | queueName, count                            | Messages retried             |
| `dev_doc_edited`       | docPath, editorId                           | Documentation updated        |
| `dev_code_search`      | query, resultCount                          | Developer searched code/docs |

## 14.1 Accessibility — Extended

- **Code Editor (API Playground):** Monaco editor with `role="textbox"`, `aria-multiline="true"`, keyboard shortcuts for common actions (Ctrl+Enter to send). Syntax errors announced via `aria-live="assertive"`.
- **Diff Viewer (Code Review):** Line-level keyboard navigation using arrow keys; `aria-label` on each changed line with added/deleted context; Ctrl+Enter to submit inline comment.
- **Task Board (Kanban):** Cards draggable via keyboard (Tab to card, Space to pick up, Arrow keys to move, Space to drop). `aria-grabbed` and `aria-dropeffect` attributes.
- **Deployment Pipeline:** Each step has `role="status"` with live region for state changes; progress bar has `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- **Error Stack Traces:** Source file links have `aria-label="Open [file]:[line] in editor"`; stack frames navigable via Tab with expand/collapse.
- **Log Viewer:** Lines virtualized with `aria-rowindex`; search highlights have `aria-label="Match [n] of [total]"`.
- All loading states use `aria-busy="true"` on container elements.
- Toast notifications use `role="status"` with `aria-live="polite"`.

## 15.1 Error & Edge Case Catalog — Extended

| #   | Error                                      | Message                                                                          | Recovery                                   |
| --- | ------------------------------------------ | -------------------------------------------------------------------------------- | ------------------------------------------ |
| E08 | GitHub API rate limit exceeded             | "GitHub API rate limit reached. PR data may be stale. [Refresh in X seconds]"    | Auto-refresh when limit resets             |
| E09 | OpenAPI spec generation fails              | "API spec generation failed: [error]. [Regenerate] [View Last Valid Spec]"       | Fix validation errors and retry            |
| E10 | Deploy pipeline hangs > 30 min             | "Deploy [id] has been running for 30+ minutes. [View Logs] [Cancel]"             | Auto-cancel after 60 min, notify tech lead |
| E11 | Build artifact too large                   | "Build artifact exceeds 500MB limit. Current: [size]. [Optimize]"                | Check for unnecessary dependencies         |
| E12 | Test suite timeout ( > 10 min )            | "Test suite timed out. [View Partial Results] [Retry]"                           | Split tests or increase timeout            |
| E13 | ESLint or TypeScript errors in PR          | "PR has [n] linting/type errors. Fix before merge."                              | Fix errors in code                         |
| E14 | Concurrent env edit conflict               | "Variable [key] was modified by [user] at [time]. [Overwrite] [Cancel]"          | Compare and decide                         |
| E15 | Queue consumer not responding              | "Queue [name] consumer last heartbeat: [time]. [Restart Consumer]"               | Restart via Cloudflare dashboard           |
| E16 | Documentation page lock (another editor)   | "Page is being edited by [user]. [View Read-Only] [Request Edit]"                | Wait or contact editor                     |
| E17 | Dependency scan finds critical CVE         | "Critical CVE found: [CVE-ID] in [package]@[version]. [View Details] [Update]"   | Update package version                     |
| E18 | Migration conflict on deploy               | "Database migration conflict: [name]. [Rollback] [Manual Resolve]"               | Manual DB migration intervention           |
| E19 | Deploy rollback fails                      | "Rollback failed: [reason]. [Manual Intervention Required]"                      | Contact infrastructure team                |
| E20 | Branch protection rules prevent push       | "Branch [name] is protected. Use a feature branch."                              | Create feature branch and PR               |
| E21 | Secret decryption fails on deploy          | "Secret decryption failed. Environment may have stale secrets. [Rotate Secrets]" | Rotate and re-deploy                       |
| E22 | WebSocket connection lost for live metrics | "Live metrics disconnected. [Reconnect] [View Historical]"                       | Auto-reconnect with exponential backoff    |
| E23 | Code review: PR has merge conflicts        | "PR has merge conflicts. [Resolve Conflicts]"                                    | Resolve locally or via web editor          |
| E24 | Code coverage below threshold              | "Coverage: [actual]% (threshold: [required]%). [View Coverage Report]"           | Add tests to cover uncovered lines         |

### 3.11 Additional Screen: Service Dependencies (`/dev/dependencies`)

**Wireframe:** Interactive service dependency graph showing internal and external service relationships.

**Dependency Graph (Visual):**

- Nodes: Internal services (Worker A, Worker B, D1, KV, R2, Queues, DO) + External services (SES, Stripe, Twilio, GitHub, PostHog)
- Edges: Directional arrows showing call relationships
- Node color: Green (healthy), Yellow (degraded), Red (down), Gray (unknown)
- Click node → service detail modal

**Service Detail Modal:**

- Service name, type, status, uptime %, P95 latency
- Dependencies: Upstream services it calls + Downstream services that call it
- Error rate (last 1h/24h/7d)
- Deployment: Current version, last deployed
- "View Logs" link, "View Metrics" link
- Incident history for this service

**Dependency Health Table:**

- Table view of all dependencies: Service, Type, Status, Uptime %, Avg Latency, Error Rate, Last Incident, Dependencies count
- Sortable by all columns
- "Export Dependency Map" (PNG)

**Data Bindings:**

- `GET /api/dev/dependencies`
- `GET /api/dev/dependencies/{serviceName}`

### 3.12 Additional Screen: Feature Flags (`/dev/feature-flags`)

**Wireframe:** Feature flag management for gradual rollouts and A/B testing.

**Feature Flags Table:**

- Columns: Flag Name, Description, Status per Environment (Dev/Staging/Prod), Owner, Last Modified, Type (boolean/percentage/segment)
- "➕ Create Flag" button

**Create/Edit Flag Modal:**

- Name (snake_case, required), Description (required), Type (Boolean / Percentage / User Segment)
- Environment Toggles:
  - Development: On/Off
  - Staging: On/Off
  - Production: On/Off or Percentage (0-100)
- User Segment (for segment type): JSON conditions
- Owner (dropdown from team)
- Tags

**Flag Detail Modal:**

- Full flag config, usage history (when toggled, by whom), current status per env
- "Toggle" button per environment with confirmation
- Gradual rollout controls: Increase by 5%, Increase by 10%, Increase by 25%, Set to 100%

**Data Bindings:**

- `GET /api/dev/feature-flags`
- `POST /api/dev/feature-flags`
- `PATCH /api/dev/feature-flags/{name}`
- `POST /api/dev/feature-flags/{name}/toggle`
- `POST /api/dev/feature-flags/{name}/rollout` — `{ percentage: number }`

## 4.2 Extended Schema: Feature Flags

```typescript
export const devFeatureFlags = sqliteTable("dev_feature_flags", {
  name: text("name").primaryKey(),
  description: text("description").notNull(),
  type: text("type", { enum: ["boolean", "percentage", "segment"] })
    .notNull()
    .default("boolean"),
  enabledDev: integer("enabled_dev", { mode: "boolean" }).default(false),
  enabledStaging: integer("enabled_staging", { mode: "boolean" }).default(false),
  productionRollout: integer("production_rollout").default(0), // 0-100 percentage
  userSegment: text("user_segment", { mode: "json" }).$type<Record<string, unknown>>().default({}),
  ownerId: text("owner_id").references(() => users.id),
  tags: text("tags", { mode: "json" }).$type<string[]>().default([]),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

export const featureFlagAudit = sqliteTable("dev_feature_flag_audit", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  flagName: text("flag_name")
    .notNull()
    .references(() => devFeatureFlags.name, { onDelete: "cascade" }),
  action: text("action", { enum: ["created", "toggled", "rollout_changed", "deleted"] }).notNull(),
  environment: text("environment"),
  previousValue: text("previous_value"),
  newValue: text("new_value"),
  changedById: text("changed_by_id").references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});
```

## 5.2 Extended API: Feature Flags

#### `GET /api/dev/feature-flags` — List all feature flags

#### `POST /api/dev/feature-flags` — `{ name, description, type }`

#### `PATCH /api/dev/feature-flags/{name}` — Update flag metadata

#### `POST /api/dev/feature-flags/{name}/toggle` — `{ environment: string; enabled: boolean }`

#### `POST /api/dev/feature-flags/{name}/rollout` — `{ percentage: number }` (production only)

#### `DELETE /api/dev/feature-flags/{name}` — Delete flag

#### `GET /api/dev/feature-flags/{name}/audit` — Audit log for flag

## 7.2 Extended User Journeys

### Journey 7: Feature Flag Gradual Rollout

1. **Dev** creates flag `new_admissions_dashboard` → boolean type, enabled on dev + staging
2. Tests on staging → works well
3. Enables on production at 5% → monitors error rate via dashboard
4. After 1 hour with no errors → increases to 25%
5. After 24 hours → increases to 50%
6. After 48 hours → increases to 100%
7. Flag fully rolled out → changes type to permanent (removes toggle)
8. Cleans up flag code after next release

### Journey 8: Dependency Incident Response

1. Monitoring alert: "External dependency Stripe API — error rate spike"
2. **Dev** opens `/dev/dependencies` → Stripe node shows red
3. Clicks node → shows 15% error rate in last 5 minutes, P95 latency 3.2s (normally 200ms)
4. Checks Stripe status page → "Degraded Performance" confirmed
5. Triggers degraded mode in app: disables payment features, shows "Payment temporarily unavailable" message
6. Monitors for recovery → Stripe status → "Resolved" → re-enables payments
7. Clears incident, logs runbook update

## 8.2 Extended Business Rules

| Rule                             | Detail                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------- |
| RB11 — Feature Flag Naming       | Must follow `module_feature_name` pattern                                    |
| RB12 — Flag Cleanup              | Flags at 100% for > 30 days flagged for removal                              |
| RB13 — Production Percentage     | Cannot jump > 25% in single step; minimum 30 min between increases           |
| RB14 — Dependency Monitoring     | External dependency health checked every 60 seconds                          |
| RB15 — Degraded Mode             | When critical dependency fails, system enters degraded mode within 2 minutes |
| RB16 — Flag Audit                | Every flag toggle logged with actor, timestamp, previous/new values          |
| RB17 — Performance Budgets       | API endpoints must respond < 200ms P95; UI components < 100ms render         |
| RB18 — Migration Backward Compat | All DB migrations must support rollback for at least 1 release cycle         |

## 9.2 Extended Notifications

| Code  | Trigger                                   | Channel                |
| ----- | ----------------------------------------- | ---------------------- |
| N-D21 | Feature flag toggled in production        | Slack                  |
| N-D22 | Dependency status changed (degraded/down) | In-app + Slack + SMS   |
| N-D23 | Performance budget exceeded               | In-app + Slack         |
| N-D24 | Migration rollback required               | Email + Slack (urgent) |
| N-D25 | Feature flag cleanup due                  | In-app (weekly digest) |

---

_End of Actor Plan — Developer_
