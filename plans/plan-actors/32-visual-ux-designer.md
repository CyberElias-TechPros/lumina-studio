# Actor: Visual/UX Designer

## 1. Identity & Role Definition

**Actor ID:** `visual_ux_designer`
**Display Name:** Visual/UX Designer
**Description:** Designs the entire platform's visual identity, UI components, interaction patterns, user flows, prototypes, and design system. Owns the CEA-OS design system, ensures visual consistency across all screens, defines interaction specifications, and collaborates with developers to implement pixel-perfect designs. Covers all aspects of product design: UX research, information architecture, wireframing, prototyping, visual design, motion design, accessibility, and design system governance.
**System Role:** `designer`
**Hierarchy:** Reports to Director of Product / CTO
**Location:** Web dashboard only
**Session Timeout:** 60 minutes of inactivity
**Concurrent Sessions:** 3 max

## 2. Primary Goals & Success KPIs

| Goal                        | KPI                                  | Target   |
| --------------------------- | ------------------------------------ | -------- |
| Design system adoption      | Component usage rate across platform | > 90%    |
| Design consistency          | Visual consistency audit score       | > 95%    |
| Development handoff quality | Design-to-dev accuracy rate          | > 95%    |
| Design velocity             | Average design-to-approval cycle     | < 3 days |
| Accessibility compliance    | WCAG 2.1 AA compliance rate          | 100%     |
| User satisfaction           | Platform usability score (SUS)       | > 80     |
| Interaction quality         | Task success rate in user testing    | > 90%    |
| Design system documentation | Component documentation completeness | > 95%    |

## 3. Complete Screen Inventory

### 3.1 Design System Manager (`/design/system`)

**Wireframe:** Central hub for the CEA-OS design system — visualizes all design tokens, components, patterns, and guidelines in an interactive library.

**UI Fields/Components:**

- **Sidebar Navigation:** Design Tokens, Components, Patterns, Icons, Typography, Spacing, Colors, Shadows, Motion, Voice & Tone
- **Overview Dashboard:**
  - Design system version number, last updated, total components, total tokens
  - Usage statistics: Most used components, adoption rate per component
  - Recent changes feed
  - Health score: Token usage consistency, component adoption, documentation coverage
- **Token Viewer (by category):**
  - **Colors:** Brand palette (primary, secondary, accent), Neutral palette, Semantic colors (success, warning, error, info), Data visualization palette
    - Each: Color swatch, Hex value, RGB value, CSS variable name, Tailwind class, Usage guidelines
  - **Typography:** Font family stack, Type scale (xs through 8xl) with example text, Weight variants, Line height, Letter spacing
  - **Spacing:** 4px base grid, scale 0-20 with px/rem values, usage examples
  - **Shadows:** Elevation levels (0-5) with box-shadow CSS, usage context
  - **Motion:** Duration scale (50ms-1000ms), Easing curves (ease-in-out, spring, bounce), Animation examples
- **Token Editor:** Click token -> edit value, see live preview, save with version note, propagate changes confirmation
- **Export:** "Export Design Tokens" -> JSON / CSS variables / Tailwind config / SCSS variables

**Data Bindings:**

- `GET /api/design/system/summary`
- `GET /api/design/system/tokens`
- `PUT /api/design/system/tokens/{id}`
- `GET /api/design/system/tokens/export?format={format}`

**States:**

| State               | Behavior                                                               |
| ------------------- | ---------------------------------------------------------------------- |
| Loading             | Token skeleton with color swatch shimmer                               |
| Empty               | "Design system not yet configured. Set up your first design tokens."   |
| Token change impact | Modal: "Changing {token} will affect {N} components. [Apply] [Cancel]" |

### 3.2 Component Explorer (`/design/components`)

**Wireframe:** Interactive component library with live preview, code snippets, usage guidelines, props table, states (default, hover, active, disabled, loading, error), and accessibility notes.

**UI Fields/Components:**

- **Sidebar:** Component categories (Atoms / Molecules / Organisms / Templates), component list with search
- **Component Detail View:**
  - **Live Preview (interactive):** Rendered component with state toggles (default, hover, focus, active, disabled, loading, error, selected)
  - **Props Table:** Prop name, Type, Required, Default, Description
  - **Code Snippet:** Copyable JSX/TSX code with syntax highlighting — multiple framework variants (React, Vue, HTML/CSS)
  - **Design Specs:** Dimensions, spacing, typography, colors — auto-generated from tokens
  - **Variants:** Size variants (sm, md, lg), theme variants (light, dark), layout variants
  - **States Sandbox:** Interactive controls to toggle all possible states
  - **Accessibility:** ARIA roles/attributes, keyboard interactions, screen reader behavior, focus management
  - **Usage Guidelines:** Do/Don't examples, best practices, when to use this component vs alternatives
  - **Related Components:** Links to components commonly used together
  - **Version History:** Component changelog
  - **Feedback:** "Report Issue" link, "Request Enhancement" link
- **Add Component Form:**
  - Name, Category, Description, Preview URL, Code source URL
  - Props definition (JSON schema)
  - States configuration
  - Tags

**Data Bindings:**

- `GET /api/design/components`
- `GET /api/design/components/{id}`
- `POST /api/design/components`
- `PUT /api/design/components/{id}`
- `DELETE /api/design/components/{id}`

**States:**

| State         | Behavior                                                      |
| ------------- | ------------------------------------------------------------- |
| Loading       | Component skeleton with preview placeholder                   |
| Empty         | "No components in the library yet. Add your first component." |
| Preview error | "Could not render component preview. [Reload]"                |

### 3.3 Prototype Viewer (`/design/prototypes`)

**Wireframe:** View, share, and comment on interactive prototypes. Supports common design tool file imports (Figma, Sketch, Adobe XD) and native browser-based prototypes.

**UI Fields/Components:**

- **Prototype List (grid/table):** Name, Project, Status (Draft / Review / Approved / Archived), Last updated, Created by, Version
- **Prototype Viewer (full-screen):**
  - Canvas area: Interactive prototype rendered in iframe or native viewer
  - Toolbar: Zoom controls, Device frame toggle (Desktop, Tablet, Mobile), Hotspot visibility, Flow overlay, Comment mode
  - **Flow Map (sidebar):** Sitemap/flow diagram showing screen connections within prototype, clickable
  - **Comments Panel (sidebar):** Threaded comments on prototype — @mention collaborators, pin comments to specific elements, resolve comments
  - **Screen List:** Thumbnails of all screens in prototype, drag to reorder
  - **Version Selector:** Switch between prototype versions, compare mode
- **Share Dialog:** Generate share link with permissions (view/comment), password protection, expiration date
- **Export:** Export frames as PNG/SVG/PDF, export specs as CSS
- **"Create New Prototype" button:** Link to Figma/XD or upload

**Data Bindings:**

- `GET /api/design/prototypes`
- `POST /api/design/prototypes`
- `GET /api/design/prototypes/{id}`
- `PUT /api/design/prototypes/{id}`
- `DELETE /api/design/prototypes/{id}`
- `POST /api/design/prototypes/{id}/share`
- `POST /api/design/prototypes/{id}/comments`
- `GET /api/design/prototypes/{id}/export`

**States:**

| State       | Behavior                                                        |
| ----------- | --------------------------------------------------------------- |
| Loading     | Prototype skeleton + viewer placeholder                         |
| Empty       | "No prototypes yet. Upload a prototype to start collaborating." |
| Not found   | "Prototype not found or access denied."                         |
| Share error | "Could not generate share link. [Retry]"                        |

### 3.4 User Flow Diagrammer (`/design/flows`)

**Wireframe:** Visual tool for creating and editing user flow diagrams — showing how users navigate through screens with decision points, actions, and states.

**UI Fields/Components:**

- **Flow List:** Name, Project, Screen count, Last updated
- **Flow Editor (canvas):**
  - Node types: Screen (references a component/prototype screen), Decision (branching), Action (user action), System Action (background process), Page State (loading/empty/error)
  - Drag-and-drop canvas with connecting arrows
  - Node labels and annotations
  - Flow start/end markers
  - Swimlanes for multi-user flows (e.g., Student -> System -> Instructor)
  - Color coding by user type or action type
  - Mini-map for navigation
- **Node Properties Panel (right sidebar):**
  - Screen reference: Link to design system component or prototype screen
  - Description: What happens at this step
  - States: Which state of the screen (default, loading, empty, error)
  - Conditions: If/Then/Else logic for decision nodes
  - Annotations: Additional notes, edge case handling
- **Export:** "Export Flow" as image (PNG/SVG) or Mermaid/PlantUML
- **"Validate Flow" button:** Check for broken connections, incomplete paths, missing end nodes

**Data Bindings:**

- `GET /api/design/flows`
- `POST /api/design/flows`
- `GET /api/design/flows/{id}`
- `PUT /api/design/flows/{id}`
- `DELETE /api/design/flows/{id}`
- `POST /api/design/flows/{id}/validate`

**States:**

| State              | Behavior                                                    |
| ------------------ | ----------------------------------------------------------- |
| Loading            | Canvas skeleton                                             |
| Empty flow         | "Start by adding your first screen node to the flow."       |
| Validation warning | Yellow banner: "{N} potential issues found. [View Details]" |

### 3.5 Design Token Editor (`/design/tokens`)

**Wireframe:** Advanced token management with semantic naming, value editing, theme support (light/dark), and alias/reference chains.

**UI Fields/Components:**

- **Token Categories (tabs):** Colors, Typography, Spacing, Shadows, Borders, Motion, Breakpoints, Z-Index
- **Token Table:** Name, Value, CSS variable, Type, Aliases to, Used by (components count), Theme override (dark)
- **Token Editor (modal or inline):**
  - Token name (editable)
  - Token value: Color picker (colors), Font selector (typography), Slider (spacing/shadows), Duration picker (motion)
  - Alias/reference: Can reference another token (e.g., `--color-primary: var(--blue-500)`)
  - Dark theme override value (if different)
  - Description/usage notes
  - Tags
- **Theme Manager:** Create/edit themes (light, dark, high-contrast), bulk override values per theme, preview theme toggle
- **Token Search:** Search by name, value, type, component usage
- **Token Health Dashboard:** Unused tokens, duplicate tokens, missing dark mode values, broken references

**Data Bindings:**

- `GET /api/design/tokens`
- `PUT /api/design/tokens/{id}`
- `POST /api/design/tokens`
- `DELETE /api/design/tokens/{id}`
- `GET /api/design/tokens/themes`
- `PUT /api/design/tokens/themes/{id}`

**States:**

| State            | Behavior                                                          |
| ---------------- | ----------------------------------------------------------------- |
| Loading          | Token table skeleton                                              |
| Empty            | "No tokens defined. Create your first design token."              |
| Broken reference | Red highlight on token: "Reference to '{token}' not found. [Fix]" |

### 3.6 Asset Export Center (`/design/exports`)

**Wireframe:** Centralized asset export tool — export icons, images, illustrations, and design specs in multiple formats and resolutions.

**UI Fields/Components:**

- **Export Source Selector:** Select from Design System components, Prototype frames, Uploaded assets, All icons
- **Asset Preview Grid:** Thumbnails of selectable assets with multi-select
- **Export Settings:**
  - Format: PNG / SVG / WebP / JPEG / PDF / CSS
  - Scale/resolution: 1x, 2x, 3x (for PNG/WebP/JPEG)
  - SVG: Optimize (yes/no), Inline or file
  - CSS: With or without Tailwind classes
  - Include design specs: Dimensions, colors, typography (for component exports)
  - Naming convention: kebab-case / camelCase / PascalCase
- **Export Queue:** Background job processing for large exports, progress indicator, download link when ready
- **Export History:** Previous exports with date, asset count, format, download button
- **"Quick Export" from context menu:** Right-click any component/token to export directly

**Data Bindings:**

- `GET /api/design/exports/assets`
- `POST /api/design/exports`
- `GET /api/design/exports/{id}/status`
- `GET /api/design/exports/{id}/download`
- `GET /api/design/exports/history`

**States:**

| State              | Behavior                                                   |
| ------------------ | ---------------------------------------------------------- |
| Loading            | Asset grid skeleton                                        |
| Empty (no export)  | "Select assets and format to start an export."             |
| Export in progress | Progress bar: "Exporting {N} assets... {pct}%"             |
| Export complete    | "Export ready! {N} assets as {format}." with download link |
| Export failed      | "Export failed: {reason}. [Retry]"                         |

### 3.7 Collaboration/Feedback Hub (`/design/collaboration`)

**Wireframe:** Central hub for design reviews, feedback threads, design critiques, and async collaboration across the team.

**UI Fields/Components:**

- **Feedback Request List:** Inbox-like view of pending feedback requests — Design name, Requester, Status (Open / In Review / Addressed / Resolved), Priority, Due date, Comments count
- **Feedback Session (on design):**
  - Design viewer (component/prototype/flow)
  - Annotation tools: Pin comments to specific UI elements, draw arrows/boxes on canvas, highlight areas
  - Comment thread per annotation: @mention users, reply, attach screenshots, mark as resolved
  - Status tracking: Each annotation has status (Open / In Progress / Addressed / Verified)
  - Approval workflow: "Request Changes" / "Approve" / "Approve with Comments" buttons
  - Version diff: Compare current design with previous version to see changes
- **Review Settings:** Required reviewers (minimum number), auto-assign rules, deadline enforcement
- **Activity Feed:** Chronological log of all feedback activity across designs

**Data Bindings:**

- `GET /api/design/collaboration/requests`
- `POST /api/design/collaboration/requests`
- `GET /api/design/collaboration/requests/{id}`
- `POST /api/design/collaboration/requests/{id}/comments`
- `POST /api/design/collaboration/requests/{id}/resolve`
- `POST /api/design/collaboration/requests/{id}/approve`

**States:**

| State    | Behavior                                                                      |
| -------- | ----------------------------------------------------------------------------- |
| Loading  | Request list skeleton                                                         |
| Empty    | "No feedback requests. Request a design review to get started."               |
| Overdue  | Red badge: "Feedback due {date}. {N} comments unresolved."                    |
| Conflict | "Design version has been updated since feedback was requested. [View latest]" |

### 3.8 Version History (`/design/versions`)

**Wireframe:** Full version history across all design artifacts — design system, components, prototypes, flows, tokens — with compare, restore, and branch/merge capabilities.

**UI Fields/Components:**

- **Artifact Selector:** Select type (Design System / Component / Prototype / Flow / Tokens), then specific item
- **Version Timeline:** Vertical timeline showing versions with date, author, version number, change summary, tags (major/minor/patch)
- **Version Compare (side-by-side):**
  - For components: Visual diff (before/after), props diff, code diff
  - For tokens: Value changes highlighted
  - For flows: Node additions/removals highlighted
  - For prototypes: Screen diff, comment diff
- **Restore:** "Restore this version" button -> confirmation modal with impact analysis (which downstream artifacts affected)
- **Branching:** Create branch from any version for experimental changes, merge back later
- **Publish Release:** Create a design system release with version number, release notes, changelog
- **"Request Review" from version:** Send specific version for review
- **Export Changelog:** Generate release notes markdown

**Data Bindings:**

- `GET /api/design/versions?type={type}&id={id}`
- `GET /api/design/versions/compare?v1={id}&v2={id}`
- `POST /api/design/versions/{id}/restore`
- `POST /api/design/versions/branch`
- `POST /api/design/versions/release`

**States:**

| State          | Behavior                                                                           |
| -------------- | ---------------------------------------------------------------------------------- |
| Loading        | Timeline skeleton                                                                  |
| Empty          | "No version history for this artifact."                                            |
| Compare mode   | Side-by-side panels with diff highlighting                                         |
| Restore impact | Modal: "Restoring version {N} will affect {M} components. Proceed? [Yes] [Cancel]" |

## 4. Full Database Schema

```typescript
// --- Visual/UX Design Schema (design_) ---

export const designTokens = pgTable('design_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(), // color,typography,spacing,shadow,border,motion,breakpoint,zindex
  type: varchar('type', { length: 50 }), // color,font-size,font-family,font-weight,line-height,letter-spacing,spacing,shadow,border-radius,border-width,duration,easing
  value: text('value').notNull(), // raw value
  cssVariable: varchar('css_variable', { length: 100 }),
  tailwindClass: varchar('tailwind_class', { length: 100 }),
  referenceTokenId: uuid('reference_token_id').references(() => designTokens.id), // alias to another token
  description: text('description'),
  tags: text('tags').array(),
  themeOverrides: jsonb('theme_overrides').default('{}'), // { dark: value, highContrast: value }
  usageCount: integer('usage_count').default(0),
  deprecated: boolean('deprecated').default(false),
  replacedByTokenId: uuid('replaced_by_token_id').references(() => designTokens.id),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const designTokenThemes = pgTable('design_token_themes', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(), // light, dark, highContrast
  description: text('description'),
  tokenOverrides: jsonb('token_overrides').default('{}'), // { tokenId: value, ... }
  isDefault: boolean('is_default').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const designComponents = pgTable('design_components', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(), // atom,molecule,organism,template
  description: text('description'),
  props: jsonb('props').default('[]'), // [{ name, type, required, default, description }]
  states: jsonb('states').default('[]'), // [{ name, description }]
  variants: jsonb('variants').default('[]'), // [{ name, props }]
  codeSnippet: text('code_snippet'),
  previewUrl: varchar('preview_url', { length: 500 }),
  sourceUrl: varchar('source_url', { length: 500 }),
  designSpecs: jsonb('design_specs').default('{}'), // { dimensions, spacing, colors, typography }
  usageGuidelines: jsonb('usage_guidelines').default('{}'), // { do: [], dont: [], bestPractices: [] }
  accessibility: jsonb('accessibility').default('{}'), // { aria, keyboardInteractions, screenReader, focus }
  tokenReferences: uuid('token_references').array(), // tokens used by this component
  status: varchar('status', { length: 30 }).default('draft'), // draft,review,approved,deprecated
  version: integer('version').default(1).notNull(),
  usageCount: integer('usage_count').default(0),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const designComponentVersions = pgTable('design_component_versions', {
  id: uuid('id').defaultRandom().primaryKey(),
  componentId: uuid('component_id').references(() => designComponents.id).notNull(),
  versionNumber: integer('version_number').notNull(),
  snapshot: jsonb('snapshot').notNull(),
  changeNotes: text('change_notes'),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const designPrototypes = pgTable('design_prototypes', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  projectId: uuid('project_id'),
  status: varchar('status', { length: 30 }).default('draft'),
  screens: jsonb('screens').default('[]'), // [{ name, imageUrl, sortOrder }]
  connections: jsonb('connections').default('[]'), // [{ fromScreenId, toScreenId, hotspot }]
  sourceFile: varchar('source_file', { length: 500 }), // link to Figma/XD/Sketch file
  sourceType: varchar('source_type', { length: 30 }), // figma,sketch,xd,uploaded
  version: integer('version').default(1),
  publishedAt: timestamp('published_at'),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const designPrototypeComments = pgTable('design_prototype_comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  prototypeId: uuid('prototype_id').references(() => designPrototypes.id).notNull(),
  screenId: uuid('screen_id'),
  parentCommentId: uuid('parent_comment_id').references(() => designPrototypeComments.id),
  authorId: uuid('author_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  position: jsonb('position'), // { x, y } on screen
  resolved: boolean('resolved').default(false),
  resolvedAt: timestamp('resolved_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const designFlows = pgTable('design_flows', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  nodes: jsonb('nodes').default('[]'), // [{ id, type, label, componentRef, position, properties }]
  edges: jsonb('edges').default('[]'), // [{ id, sourceNodeId, targetNodeId, label, condition }]
  swimlanes: jsonb('swimlanes').default('[]'), // [{ name, color }]
  version: integer('version').default(1),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const designExportJobs = pgTable('design_export_jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }),
  assets: jsonb('assets').default('[]'), // [{ type, id }]
  format: varchar('format', { length: 20 }).notNull(), // png,svg,webp,jpg,pdf,css
  scale: varchar('scale', { length: 10 }).default('1x'),
  options: jsonb('options').default('{}'), // { optimize, namingConvention, includeSpecs }
  status: varchar('status', { length: 30 }).default('queued'), // queued,processing,completed,failed
  totalAssets: integer('total_assets').default(0),
  completedAssets: integer('completed_assets').default(0),
  resultUrl: varchar('result_url', { length: 500 }),
  errorMessage: text('error_message'),
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

export const designCollaborationRequests = pgTable('design_collaboration_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  artifactType: varchar('artifact_type', { length: 50 }).notNull(), // component,prototype,flow,design_system
  artifactId: uuid('artifact_id').notNull(),
  artifactVersion: integer('artifact_version'),
  status: varchar('status', { length: 30 }).default('open'), // open,in_review,addressed,resolved
  priority: varchar('priority', { length: 20 }).default('medium'),
  dueDate: timestamp('due_date'),
  requestorId: uuid('requestor_id').references(() => users.id).notNull(),
  reviewerIds: uuid('reviewer_ids').array(),
  minApprovals: integer('min_approvals').default(1),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const designSystemReleases = pgTable('design_system_releases', {
  id: uuid('id').defaultRandom().primaryKey(),
  version: varchar('version', { length: 30 }).notNull(), // semantic version
  releaseNotes: text('release_notes'),
  changelog: jsonb('changelog').default('[]'), // [{ type, description, artifactType, artifactId }]
  status: varchar('status', { length: 30 }).default('draft'), // draft,published
  publishedAt: timestamp('published_at'),
  publishedBy: uuid('published_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

CREATE INDEX idx_design_tokens_category ON designTokens(category);
CREATE INDEX idx_design_tokens_name ON designTokens(name);
CREATE INDEX idx_design_components_category ON designComponents(category);
CREATE INDEX idx_design_components_status ON designComponents(status);
CREATE INDEX idx_design_prototypes_status ON designPrototypes(status);
CREATE INDEX idx_design_prototype_comments_prototype ON designPrototypeComments(prototype_id);
CREATE INDEX idx_design_flows_name ON designFlows(name);
CREATE INDEX idx_design_export_jobs_status ON designExportJobs(status);
CREATE INDEX idx_design_collab_requests_status ON designCollaborationRequests(status);
```

## 5. Complete API Contract

### Endpoints

```
GET    /api/v1/design/system/summary
GET    /api/v1/design/system/tokens
POST   /api/v1/design/system/tokens
GET    /api/v1/design/system/tokens/{id}
PUT    /api/v1/design/system/tokens/{id}
DELETE /api/v1/design/system/tokens/{id}
GET    /api/v1/design/system/tokens/export
PUT    /api/v1/design/system/themes/{id}
POST   /api/v1/design/system/themes

GET    /api/v1/design/components
POST   /api/v1/design/components
GET    /api/v1/design/components/{id}
PUT    /api/v1/design/components/{id}
DELETE /api/v1/design/components/{id}
GET    /api/v1/design/components/{id}/versions
POST   /api/v1/design/components/{id}/versions

GET    /api/v1/design/prototypes
POST   /api/v1/design/prototypes
GET    /api/v1/design/prototypes/{id}
PUT    /api/v1/design/prototypes/{id}
DELETE /api/v1/design/prototypes/{id}
POST   /api/v1/design/prototypes/{id}/share
POST   /api/v1/design/prototypes/{id}/comments
PUT    /api/v1/design/prototypes/{id}/comments/{cid}
DELETE /api/v1/design/prototypes/{id}/comments/{cid}
GET    /api/v1/design/prototypes/{id}/export

GET    /api/v1/design/flows
POST   /api/v1/design/flows
GET    /api/v1/design/flows/{id}
PUT    /api/v1/design/flows/{id}
DELETE /api/v1/design/flows/{id}
POST   /api/v1/design/flows/{id}/validate

GET    /api/v1/design/exports/assets
POST   /api/v1/design/exports
GET    /api/v1/design/exports/{id}/status
GET    /api/v1/design/exports/{id}/download
GET    /api/v1/design/exports/history

GET    /api/v1/design/collaboration/requests
POST   /api/v1/design/collaboration/requests
GET    /api/v1/design/collaboration/requests/{id}
PUT    /api/v1/design/collaboration/requests/{id}
POST   /api/v1/design/collaboration/requests/{id}/comments
POST   /api/v1/design/collaboration/requests/{id}/approve
POST   /api/v1/design/collaboration/requests/{id}/resolve

GET    /api/v1/design/versions
GET    /api/v1/design/versions/compare
POST   /api/v1/design/versions/{id}/restore
POST   /api/v1/design/versions/branch
POST   /api/v1/design/versions/release
```

**Types:**

```typescript
interface DesignToken {
  id: string;
  name: string;
  category:
    "color" | "typography" | "spacing" | "shadow" | "border" | "motion" | "breakpoint" | "zindex";
  type: string;
  value: string;
  cssVariable: string | null;
  tailwindClass: string | null;
  referenceTokenId: string | null;
  description: string | null;
  tags: string[];
  themeOverrides: Record<string, string>;
  usageCount: number;
  deprecated: boolean;
}

interface DesignComponent {
  id: string;
  name: string;
  category: "atom" | "molecule" | "organism" | "template";
  description: string | null;
  props: ComponentProp[];
  states: ComponentState[];
  variants: ComponentVariant[];
  codeSnippet: string | null;
  previewUrl: string | null;
  accessibility: Record<string, unknown>;
  status: "draft" | "review" | "approved" | "deprecated";
  version: number;
  usageCount: number;
}

interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  default: unknown;
  description: string;
}

interface ComponentState {
  name: string;
  description: string;
}

interface ComponentVariant {
  name: string;
  props: Record<string, unknown>;
  previewUrl?: string;
}

interface Prototype {
  id: string;
  name: string;
  status: string;
  screens: PrototypeScreen[];
  connections: PrototypeConnection[];
  sourceType: string | null;
  version: number;
}

interface PrototypeScreen {
  id: string;
  name: string;
  imageUrl: string;
  sortOrder: number;
}

interface PrototypeConnection {
  fromScreenId: string;
  toScreenId: string;
  hotspot: { x: number; y: number; width: number; height: number } | null;
}

interface DesignFlow {
  id: string;
  name: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  swimlanes: Array<{ name: string; color: string }>;
}

interface FlowNode {
  id: string;
  type: "screen" | "decision" | "action" | "system_action" | "page_state" | "start" | "end";
  label: string;
  componentRef: string | null;
  position: { x: number; y: number };
  properties: Record<string, unknown>;
}

interface FlowEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  label: string | null;
  condition: string | null;
}

interface CollaborationRequest {
  id: string;
  title: string;
  artifactType: string;
  artifactId: string;
  status: "open" | "in_review" | "addressed" | "resolved";
  priority: string;
  dueDate: string | null;
  reviewComments: Comment[];
}

interface DesignSystemRelease {
  id: string;
  version: string;
  releaseNotes: string | null;
  changelog: Array<{ type: string; description: string; artifactType: string }>;
  status: string;
  publishedAt: string | null;
}
```

**Error Codes:**

| Code   | HTTP | Meaning                                |
| ------ | ---- | -------------------------------------- |
| DS_001 | 400  | Invalid token value                    |
| DS_002 | 400  | Component prop definition error        |
| DS_003 | 404  | Component/prototype/token not found    |
| DS_004 | 409  | Component version conflict             |
| DS_005 | 422  | Export format not supported            |
| DS_006 | 422  | Token reference cycle detected         |
| DS_007 | 422  | Prototype share link generation failed |
| DS_008 | 500  | Export processing failure              |

## 6. Component Tree

```
App
+-- DesignModule
    +-- DesignLayout (shell)
    |   +-- Sidebar (System, Components, Prototypes, Flows, Tokens, Exports, Collaboration, Versions)
    |   +-- Breadcrumb
    |
    +-- DesignSystemManager
    |   +-- SystemSummary (version, stats, health)
    |   +-- CategoryTabs (colors, typography, spacing, etc.)
    |   +-- TokenGrid / TokenTable
    |   |   +-- TokenCard { name, value, description, usage }
    |   |   +-- TokenColorSwatch { hex, cssVar }
    |   |   +-- TokenEditorModal
    |   |       +-- ColorPicker
    |   |       +-- FontSelector
    |   |       +-- SpacingSlider
    |   |       +-- TokenReferenceSelect
    |   |       +-- ThemeOverrideEditor
    |   +-- TokenExportButton
    |
    +-- ComponentExplorer
    |   +-- ComponentSidebar (categories)
    |   +-- ComponentDetail
    |   |   +-- ComponentPreview { component, states }
    |   |   |   +-- StateToggleBar { states[], active, onChange }
    |   |   +-- PropsTable
    |   |   +-- CodeSnippet { code, language }
    |   |   +-- DesignSpecsPanel
    |   |   +-- VariantSelector { variants[] }
    |   |   +-- AccessibilityPanel
    |   |   +-- UsageGuidelines
    |   |   +-- VersionHistory (compact)
    |   +-- AddComponentForm
    |       +-- NameDescription
    |       +-- PropDefinitionEditor
    |       +-- StateConfigurator
    |       +-- CodeEditor
    |
    +-- PrototypeViewer
    |   +-- PrototypeList (grid)
    |   |   +-- PrototypeCard { name, status, screens, version }
    |   +-- PrototypeViewerMain
    |   |   +-- ViewerToolbar { zoom, deviceFrame, flowOverlay }
    |   |   +-- PrototypeCanvas { iframe, interactive }
    |   |   +-- FlowMapSidebar
    |   |   +-- CommentsPanel
    |   |   |   +-- CommentThread { author, content, position, resolved }
    |   |   |   +-- CommentInput
    |   |   +-- ScreenThumbnailStrip
    |   +-- ShareDialog
    |
    +-- FlowDiagrammer
    |   +-- FlowList
    |   +-- FlowEditor
    |   |   +-- FlowCanvas
    |   |   |   +-- CanvasNode { type, label, selected }
    |   |   |   +-- CanvasEdge { label, condition }
    |   |   |   +-- MiniMap
    |   |   +-- NodePalette { nodeTypes, drag-handle }
    |   |   +-- NodePropertiesPanel
    |   |   |   +-- ScreenRefSelector
    |   |   |   +-- StateSelector
    |   |   |   +-- ConditionEditor
    |   |   |   +-- AnnotationEditor
    |   |   +-- SwimlaneEditor
    |   +-- ValidateButton
    |
    +-- TokenEditorPage
    |   +-- CategoryTabs
    |   +-- TokenTable
    |   |   +-- TokenRow { name, value, cssVar, usage, actions }
    |   +-- TokenEditorModal (reusable)
    |   +-- ThemeManager
    |   |   +-- ThemeCard { name, isDefault, tokenCount }
    |   |   +-- ThemeBulkEditor
    |   +-- TokenHealthDashboard
    |
    +-- ExportCenter
    |   +-- AssetSelector
    |   |   +-- AssetCategoryTabs
    |   |   +-- AssetGrid { selectable thumbnails }
    |   +-- ExportSettingsPanel
    |   |   +-- FormatSelector
    |   |   +-- ScaleSelector
    |   |   +-- OptionsCheckboxes
    |   +-- ExportQueue
    |   |   +-- ExportJobCard { name, progress, status }
    |   +-- ExportHistory
    |
    +-- CollaborationHub
    |   +-- RequestInbox
    |   |   +-- RequestCard { title, artifact, status, priority, comments }
    |   +-- ReviewSession
    |   |   +-- DesignViewer (component/prototype/flow)
    |   |   +-- AnnotationLayer { annotations[] }
    |   |   +-- CommentList { comments[] }
    |   |   |   +-- CommentItem { author, content, status, attachments }
    |   |   |   +-- CommentForm
    |   |   +-- ApprovalActions
    |   +-- ActivityFeed
    |
    +-- VersionHistoryPage
        +-- ArtifactSelector
        +-- VersionTimeline
        |   +-- VersionItem { number, author, date, tags }
        +-- VersionCompare (side-by-side)
        |   +-- VisualDiff
        |   +-- PropsDiff
        |   +-- CodeDiff
        +-- RestoreDialog
        +-- ReleaseManager
            +-- ReleaseForm
            +-- ChangelogEditor
            +-- PublishButton
```

## 7. Exhaustive User Journeys

### Journey 1: Create and Document a New Button Component

1. Designer opens Component Explorer, clicks "Add Component"
2. Names: "Primary Button", category: Atom, description: "Main call-to-action button used across all forms and CTAs"
3. Defines props:
   - `variant`: enum ('primary', 'secondary', 'ghost', 'danger'), default 'primary'
   - `size`: enum ('sm', 'md', 'lg'), default 'md'
   - `disabled`: boolean, default false
   - `loading`: boolean, default false
   - `icon`: ReactNode, optional
   - `children`: ReactNode, required
   - `onClick`: function, required
4. Configures states: default, hover, active, focus-visible, disabled, loading
5. Adds variants: Primary MD, Primary LG with icon, Secondary MD, Ghost MD, Danger MD
6. Writes code snippet with TypeScript and Tailwind classes
7. Selects tokens used: colors (primary-500, primary-600 for hover), spacing (px-4, py-2 for md), typography (button text style), shadows (focus ring)
8. Fills accessibility section:
   - ARIA: `role="button"` (if not a `<button>`), `aria-disabled` when disabled, `aria-busy` when loading
   - Keyboard: Enter/Space to activate, Tab to focus
   - Focus: Visible focus ring using `--focus-ring` token
9. Saves as "Draft", requests review from senior designer
10. Reviewer comments: "Add loading spinner state visual", "Ensure contrast ratio meets AA on all variants"
11. Addresses feedback: adds spinner animation, adjusts secondary variant contrast
12. Status changed to "Approved", version 1 published
13. Component usage tracked: appears in 47 places across platform after adoption

### Journey 2: Design a New User Flow for Certificate Download

1. Opens Flow Diagrammer, creates new flow "Certificate Download"
2. Adds swimlanes: Student, System, Instructor
3. Nodes:
   - Start node
   - Action (Student): "Navigate to Profile > Certificates"
   - Screen (reused from component library): "Certificate List" (state: with certificates)
   - Decision: "Has earned certificate?"
     - Yes -> Action: "Click 'Download' button"
     - No -> Screen: "Certificate List" (state: empty)
   - System Action: "Generate certificate PDF"
   - Page State: "Loading" with spinner
   - Action (Student): "Click 'Download' button"
   - Page State: "Success" with download starts
   - Decision: "Download complete?"
   - End node
4. Annotates: "Empty state should show 'Complete more courses to earn certificates' with CTA"
5. Validates flow -> no issues found
6. Links flow to prototype screens for each step
7. Shares flow with product team for feedback

### Journey 3: Release a New Design System Version

1. Designer reviews all pending changes across components and tokens
2. Opens Version History, selects "Design System" artifact
3. Reviews changelog of all changes since last release:
   - 3 new components added
   - 5 existing components updated
   - 12 tokens added (motion tokens)
   - 4 tokens deprecated
4. Creates new release: version "2.3.0"
5. Writes release notes: "Added motion tokens, 3 new form components, deprecated legacy button variants"
6. Publishes release -> system generates changelog markdown, notifies all developers
7. Developers see breaking changes warning for deprecated tokens

## 8. Business Rules Engine

| Rule ID   | Description                                                     | Priority | Message                                                          |
| --------- | --------------------------------------------------------------- | -------- | ---------------------------------------------------------------- |
| DS-BR-001 | Token name must be kebab-case                                   | Error    | "Token names must use kebab-case (e.g., 'color-primary-500')."   |
| DS-BR-002 | Token reference cycles are forbidden                            | Error    | "Token reference creates a cycle. Check alias chain."            |
| DS-BR-003 | Component must have at least a name and category                | Error    | "Component name and category are required."                      |
| DS-BR-004 | All component states must have documented keyboard interactions | Warning  | "State '{state}' is missing keyboard interaction documentation." |
| DS-BR-005 | Component props must have type defined                          | Error    | "Prop '{name}' is missing a type definition."                    |
| DS-BR-006 | Design token changes affect {N} components                      | Info     | "Changing this token will update {N} components. Review impact." |
| DS-BR-007 | Prototype screens must be connected for interactive flow        | Warning  | "{N} screens have no connections. Flows will be incomplete."     |
| DS-BR-008 | Flow validation checks for orphaned nodes                       | Error    | "Orphaned nodes detected: {nodes}. Connect or remove them."      |
| DS-BR-009 | Export job with 0 assets cannot be created                      | Error    | "Select at least one asset to export."                           |
| DS-BR-010 | Collaboration review requires min 1 approval                    | Error    | "Set minimum approvals to at least 1."                           |
| DS-BR-011 | Deprecated token must specify replacement                       | Warning  | "Deprecated tokens should specify a replacement token."          |
| DS-BR-012 | Design system release requires changelog entries                | Info     | "Add changelog entries describing what changed in this release." |

## 9. Notification Specifications

| Trigger Event                   | Channel       | Template Variables                                                       | Delivery Rules                       |
| ------------------------------- | ------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| Component review requested      | In-app, Email | `{{component_name}}`, `{{requested_by}}`, `{{priority}}`                 | To assigned reviewers                |
| Component approved              | In-app        | `{{component_name}}`, `{{approved_by}}`                                  | To component creator                 |
| Component deprecated            | In-app        | `{{component_name}}`, `{{replacement}}`                                  | To all developers                    |
| Design token changed            | In-app        | `{{token_name}}`, `{{old_value}}`, `{{new_value}}`, `{{affected_count}}` | To design team                       |
| Prototype shared with you       | In-app, Email | `{{prototype_name}}`, `{{shared_by}}`, `{{expires}}`                     | Immediate                            |
| Prototype comment added         | In-app        | `{{author}}`, `{{preview}}`, `{{prototype_name}}`                        | To prototype owner + mentioned users |
| Flow validation failed          | In-app        | `{{flow_name}}`, `{{error_count}}`                                       | On save/validate                     |
| Export job completed            | In-app        | `{{format}}`, `{{asset_count}}`, `{{download_url}}`                      | When processing finishes             |
| Export job failed               | In-app, Email | `{{format}}`, `{{asset_count}}`, `{{error}}`                             | Immediate                            |
| Design system release published | In-app, Email | `{{version}}`, `{{summary}}`                                             | To all developers + designers        |
| Version restore available       | In-app        | `{{artifact_name}}`, `{{version_number}}`, `{{impact_count}}`            | When restore is requested            |

## 10. Permission Matrix

| Entity              | Action          | Visual/UX Designer | Senior Designer | Developer | Admin |
| ------------------- | --------------- | ------------------ | --------------- | --------- | ----- |
| designTokens        | Create/Edit     | ✓                  | ✓               | -         | ✓     |
| designTokens        | Delete          | -                  | ✓               | -         | ✓     |
| designTokens        | Approve changes | -                  | ✓               | -         | ✓     |
| designComponents    | Create/Edit     | ✓                  | ✓               | -         | ✓     |
| designComponents    | Approve         | -                  | ✓               | -         | ✓     |
| designComponents    | Deprecate       | -                  | ✓               | -         | ✓     |
| designComponents    | View            | ✓                  | ✓               | ✓         | ✓     |
| designPrototypes    | Create/Edit     | ✓                  | ✓               | -         | ✓     |
| designPrototypes    | Share           | ✓                  | ✓               | -         | ✓     |
| designFlows         | Full CRUD       | ✓                  | ✓               | ✓         | ✓     |
| designExportJobs    | Create          | ✓                  | ✓               | ✓         | ✓     |
| designExportJobs    | Download        | ✓                  | ✓               | ✓         | ✓     |
| designCollaboration | Request reviews | ✓                  | ✓               | -         | -     |
| designCollaboration | Approve reviews | -                  | ✓               | -         | ✓     |
| designVersions      | View            | ✓                  | ✓               | ✓         | ✓     |
| designVersions      | Restore         | -                  | ✓               | -         | ✓     |
| designVersions      | Release         | -                  | ✓               | -         | ✓     |

## 11. State Management

### Redux Slice: `designSlice`

```typescript
interface DesignState {
  system: {
    summary: DesignSystemSummary | null;
    tokens: DesignToken[];
    themes: DesignTokenTheme[];
    loading: boolean;
  };
  components: {
    items: DesignComponent[];
    current: DesignComponent | null;
    loading: boolean;
    currentVersion: number;
  };
  prototypes: {
    items: Prototype[];
    current: Prototype | null;
    loading: boolean;
    comments: PrototypeComment[];
  };
  flows: {
    items: DesignFlow[];
    current: DesignFlow | null;
    loading: boolean;
    canvasState: { nodes: FlowNode[]; edges: FlowEdge[] };
  };
  exports: {
    assets: ExportAsset[];
    jobs: ExportJob[];
    settings: ExportSettings;
    loading: boolean;
  };
  collaboration: {
    requests: CollaborationRequest[];
    current: CollaborationRequest | null;
    loading: boolean;
  };
  versions: {
    items: VersionEntry[];
    compare: { old: unknown; new: unknown } | null;
    releases: DesignSystemRelease[];
    loading: boolean;
  };
}
```

### RTK Query Endpoints

- `getSystemSummary` - cache 300s
- `getToken` - cache 600s
- `updateToken` - optimistic update, recalculate affected components
- `getComponents` - cache 300s
- `getComponent` - cache 60s
- `getPrototypes` - cache 120s
- `getFlows` - cache 300s
- `createExportJob` - no cache
- `pollExportStatus` - polling every 5s when job processing
- `getCollaborationRequests` - cache 30s
- `getVersionHistory` - cache 300s

### Optimistic Updates

- Token value edit -> immediate preview update in all components using that token
- Flow canvas edits (drag, add, connect nodes) -> immediate local state, batch save
- Collaboration comment add -> immediate thread update

## 12. Form Schemas (Zod)

```typescript
import { z } from "zod";

export const createTokenSchema = z.object({
  name: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Must be kebab-case")
    .max(255),
  category: z.enum([
    "color",
    "typography",
    "spacing",
    "shadow",
    "border",
    "motion",
    "breakpoint",
    "zindex",
  ]),
  type: z.string().max(50).optional(),
  value: z.string().min(1, "Value is required"),
  cssVariable: z.string().max(100).optional(),
  tailwindClass: z.string().max(100).optional(),
  referenceTokenId: z.string().uuid().optional().nullable(),
  description: z.string().max(500).optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
  themeOverrides: z.record(z.string()).optional(),
});

export const createComponentSchema = z.object({
  name: z.string().min(1, "Component name is required").max(255),
  category: z.enum(["atom", "molecule", "organism", "template"]),
  description: z.string().max(2000).optional(),
  props: z
    .array(
      z.object({
        name: z.string().min(1),
        type: z.string().min(1, "Prop type required"),
        required: z.boolean().default(false),
        default: z.unknown().optional(),
        description: z.string().max(500).optional(),
      }),
    )
    .optional(),
  states: z
    .array(
      z.object({
        name: z.string().min(1),
        description: z.string().max(500).optional(),
      }),
    )
    .optional(),
  variants: z
    .array(
      z.object({
        name: z.string().min(1),
        props: z.record(z.unknown()),
      }),
    )
    .optional(),
  codeSnippet: z.string().optional(),
  previewUrl: z.string().url().optional().or(z.literal("")),
  sourceUrl: z.string().url().optional().or(z.literal("")),
  accessibility: z
    .object({
      aria: z.string().optional(),
      keyboardInteractions: z.string().optional(),
      screenReader: z.string().optional(),
      focusManagement: z.string().optional(),
    })
    .optional(),
  usageGuidelines: z
    .object({
      do: z.array(z.string()).optional(),
      dont: z.array(z.string()).optional(),
      bestPractices: z.array(z.string()).optional(),
    })
    .optional(),
  tokenReferences: z.array(z.string().uuid()).optional(),
});

export const createPrototypeSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  projectId: z.string().uuid().optional(),
  sourceFile: z.string().url().optional().or(z.literal("")),
  sourceType: z.enum(["figma", "sketch", "xd", "uploaded"]).optional(),
  screens: z
    .array(
      z.object({
        name: z.string().max(255),
        imageUrl: z.string().url(),
        sortOrder: z.number().int(),
      }),
    )
    .optional(),
  connections: z
    .array(
      z.object({
        fromScreenId: z.string(),
        toScreenId: z.string(),
        hotspot: z
          .object({
            x: z.number(),
            y: z.number(),
            width: z.number(),
            height: z.number(),
          })
          .optional(),
      }),
    )
    .optional(),
});

export const createFlowSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  swimlanes: z
    .array(
      z.object({
        name: z.string().max(100),
        color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      }),
    )
    .max(10)
    .optional(),
  nodes: z
    .array(
      z.object({
        id: z.string(),
        type: z.enum([
          "screen",
          "decision",
          "action",
          "system_action",
          "page_state",
          "start",
          "end",
        ]),
        label: z.string().max(255),
        componentRef: z.string().uuid().optional().nullable(),
        position: z.object({ x: z.number(), y: z.number() }),
        properties: z.record(z.unknown()).optional(),
      }),
    )
    .optional(),
  edges: z
    .array(
      z.object({
        id: z.string(),
        sourceNodeId: z.string(),
        targetNodeId: z.string(),
        label: z.string().max(255).optional().nullable(),
        condition: z.string().max(500).optional().nullable(),
      }),
    )
    .optional(),
});

export const createExportJobSchema = z.object({
  name: z.string().max(255).optional(),
  assets: z
    .array(
      z.object({
        type: z.enum(["component", "prototype_screen", "icon", "illustration", "token"]),
        id: z.string().uuid(),
      }),
    )
    .min(1, "Select at least one asset"),
  format: z.enum(["png", "svg", "webp", "jpg", "pdf", "css"]),
  scale: z.enum(["1x", "2x", "3x"]).default("2x"),
  options: z
    .object({
      optimize: z.boolean().default(true),
      namingConvention: z.enum(["kebab-case", "camelCase", "PascalCase"]).default("kebab-case"),
      includeSpecs: z.boolean().default(false),
    })
    .optional(),
});

export const createCollaborationRequestSchema = z.object({
  title: z.string().min(1).max(255),
  artifactType: z.enum(["component", "prototype", "flow", "design_system"]),
  artifactId: z.string().uuid(),
  artifactVersion: z.number().int().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  dueDate: z.string().datetime().optional().nullable(),
  reviewerIds: z.array(z.string().uuid()).min(1, "At least one reviewer required"),
  minApprovals: z.number().int().min(1).default(1),
});

export const createReleaseSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "Semantic version required (e.g., 1.2.3)"),
  releaseNotes: z.string().max(10000).optional(),
  changelog: z
    .array(
      z.object({
        type: z.enum(["added", "changed", "deprecated", "removed", "fixed", "security"]),
        description: z.string().max(500),
        artifactType: z.enum(["component", "token", "pattern", "prototype", "flow"]),
        artifactId: z.string().uuid().optional(),
      }),
    )
    .optional(),
});
```

## 13. Analytics Events

| Event                           | Properties                                      | Destination |
| ------------------------------- | ----------------------------------------------- | ----------- |
| design_token_created            | `{ tokenId, category }`                         | PostHog     |
| design_token_updated            | `{ tokenId, category, affectedComponentCount }` | PostHog     |
| design_token_deprecated         | `{ tokenId, replacementId }`                    | PostHog     |
| design_component_created        | `{ componentId, category }`                     | PostHog     |
| design_component_published      | `{ componentId, version }`                      | PostHog     |
| design_component_deprecated     | `{ componentId, replacementId }`                | PostHog     |
| design_component_usage_tracked  | `{ componentId, usageCount }`                   | PostHog     |
| design_prototype_created        | `{ prototypeId, sourceType, screenCount }`      | PostHog     |
| design_prototype_shared         | `{ prototypeId, shareType }`                    | PostHog     |
| design_prototype_comment_added  | `{ prototypeId, parentComment? }`               | PostHog     |
| design_flow_created             | `{ flowId, nodeCount, swimlaneCount }`          | PostHog     |
| design_flow_validated           | `{ flowId, isValid, issueCount }`               | PostHog     |
| design_export_job_created       | `{ format, assetCount }`                        | PostHog     |
| design_export_job_completed     | `{ format, assetCount, duration }`              | PostHog     |
| design_collab_request_created   | `{ artifactType, reviewerCount }`               | PostHog     |
| design_collab_request_approved  | `{ artifactType, artifactId }`                  | PostHog     |
| design_system_release_published | `{ version, componentChanges, tokenChanges }`   | PostHog     |
| design_version_restored         | `{ artifactType, artifactId, versionNumber }`   | PostHog     |

## 14. Accessibility Requirements

| Requirement                    | Implementation                                                                                                                                                                |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Token color picker             | Accessible form inputs, `aria-label="Color value"`, keyboard-accessible color swatches with `role="button"`, selected state via `aria-pressed`                                |
| Component preview              | Interactive preview with keyboard navigable state toggles, `role="tablist"` for state tabs                                                                                    |
| Prototype viewer               | `aria-label="Prototype preview"`, keyboard navigation between screens (arrow keys), `aria-live="polite"` on screen transitions                                                |
| Flow diagrammer canvas         | `role="application"`, every node/edge selectable via Tab, keyboard drag (Enter to pick up, arrow keys to move, Enter to drop), `aria-label` per node describing type and name |
| Design system health dashboard | `aria-live="polite"` for health score changes, accessible chart data as tables                                                                                                |
| Version timeline               | `role="list"`, timeline items `role="listitem"`, `aria-label="Version {number} by {author} on {date}"`                                                                        |
| Color contrast checker         | All token colors validated against WCAG AA (4.5:1 normal text, 3:1 large text), warning shown automatically                                                                   |
| Image export queue             | Progress bar `role="progressbar"`, `aria-valuenow`, job completion announced via `aria-live`                                                                                  |
| Collaboration annotations      | Annotations `role="note"`, `aria-label="Annotation by {author}"`, focus management on new comments                                                                            |
| Keyboard shortcuts             | Global shortcuts: `?` opens help, `g`+`c` -> Components, `g`+`t` -> Tokens, Arrow keys in canvas                                                                              |
| Focus indicators               | All interactive elements have visible 3:1 contrast ring using focus-ring token                                                                                                |
| Screen reader announcements    | Component state changes, token updates, export completions use `role="status"` with `aria-live="polite"`                                                                      |

## 15. Error & Edge Case Catalog

| Code       | Scenario                                            | Response            | User Message                                                                           | Recovery                |
| ---------- | --------------------------------------------------- | ------------------- | -------------------------------------------------------------------------------------- | ----------------------- |
| DS-ERR-001 | Token save with circular reference                  | Validation          | "Circular reference detected: {tokenA} references {tokenB} which references {tokenA}." | Break the cycle         |
| DS-ERR-002 | Component prop type is invalid                      | Validation error    | "Prop '{name}' has an invalid type '{type}'. Use a valid TypeScript type."             | Fix type                |
| DS-ERR-003 | Prototype preview fails to load                     | Fallback image      | "Interactive preview unavailable. Showing static image."                               | Reload or check source  |
| DS-ERR-004 | Flow has orphaned nodes                             | Validation warning  | "{N} nodes have no connections. They may be unreachable in the flow."                  | Connect or delete       |
| DS-ERR-005 | Export job with large asset count times out         | Async processing    | "Exporting {count} assets. You will be notified when complete."                        | Background job          |
| DS-ERR-006 | Collaboration feedback on deleted artifact          | Error               | "This artifact has been deleted. Feedback preserved in archive."                       | Archive reference       |
| DS-ERR-007 | Version restore conflicts with current changes      | Conflict warning    | "Restoring this version will overwrite {N} unsaved changes. Proceed?"                  | Confirm or cancel       |
| DS-ERR-008 | Token name already exists                           | Validation          | "A token named '{name}' already exists."                                               | Use unique name         |
| DS-ERR-009 | Design system release version already used          | Error               | "Version {version} already exists. Bump version number."                               | Increment version       |
| DS-ERR-010 | Flow canvas auto-save conflict                      | Conflict resolution | "Another designer edited this flow. [Reload] [Keep mine]"                              | Resolve conflict        |
| DS-ERR-011 | Export format unsupported for asset type            | Warning             | "Format {format} not supported for {assetType}. Using PNG fallback."                   | Choose different format |
| DS-ERR-012 | Component dependency cycle (component using itself) | Error               | "Component cannot reference itself as a sub-component."                                | Remove self-reference   |
| DS-ERR-013 | Prototype share link expired                        | Permission denied   | "This share link has expired. Request a new link from the owner."                      | Generate new link       |
| DS-ERR-014 | Design system health check fails (unused tokens)    | Warning             | "{N} tokens are defined but unused. Clean up deprecated tokens."                       | Archive unused tokens   |
