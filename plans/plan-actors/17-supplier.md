# Actor: Supplier

## 1. Identity & Role Definition

- **Actor ID**: `supplier`
- **Display Name**: Supplier
- **Description**: External vendor or supplier providing goods and services to Cyber Elias Academy. Suppliers interact with the system to manage purchase orders, track deliveries, submit invoices, manage company profiles, communicate with procurement staff, and view performance ratings.
- **User Type**: `supplier` in `users.role` enum
- **Auth Level**: Authenticated (JWT). Company-level accounts with multiple user sub-accounts.
- **Categories**: IT Hardware, Software, Office Supplies, Lab Equipment, Catering, Cleaning, Security, Consulting, Training Materials, Furniture
- **Onboarding**: Supplier registration → background check → approval → account activation

---

## 2. Primary Goals & Success KPIs

| Goal                                     | KPI                           | Measurement                                           |
| ---------------------------------------- | ----------------------------- | ----------------------------------------------------- |
| Manage purchase orders efficiently       | PO fulfillment rate           | `pos_fulfilled_on_time / total_pos * 100`             |
| Track and complete deliveries            | On-time delivery rate         | `deliveries_on_time / total_deliveries * 100`         |
| Submit and get invoices paid             | Invoice-to-payment cycle time | Average days from invoice submission to payment       |
| Maintain accurate company information    | Profile completeness          | % of required fields filled                           |
| Communicate effectively with procurement | Response time                 | Average hours to reply to procurement messages        |
| Maintain high performance rating         | Supplier performance score    | Average across quality/timeliness/communication (1–5) |

---

## 3. Complete Screen Inventory

### 3.1 Supplier Hub (Dashboard)

**Wireframe**: Dashboard with key metrics row, pending actions list, recent activity feed, and quick links.

**UI Fields / Components**:

- `SupplierWelcomeBanner` — "Welcome, {companyName}" with account status badge
- `MetricsRow` — 4 cards: `activePOs` (count), `pendingDeliveries` (count with overdue highlight), `unpaidInvoices` (count + total amount), `overallRating` (star display)
- `PendingActionsList` — Prioritized list: "3 POs awaiting confirmation", "2 deliveries due today", "1 invoice requires revision"
- `RecentActivityFeed` — Timeline: PO issued, delivery scheduled, invoice paid, message received
- `QuickActions` — Buttons: [View POs], [Schedule Delivery], [Submit Invoice], [Message Procurement], [Update Profile]
- `PerformanceScoreCard` — Gauge chart: Overall rating with breakdown (Quality/Timeliness/Communication)
- `UpcomingDeadlines` — Calendar mini-view with delivery/PO deadline markers
- `AlertBanner` — For expired POs, rejected invoices, or compliance document expiry

**Data Bindings**:

- `GET /api/supplier/dashboard` — aggregated payload
- `GET /api/supplier/activity?limit=10` — recent activity

**States**:

- **Loading**: 4 metric skeleton cards + activity skeleton list
- **Empty — New supplier**: "Welcome! Your account is active. Procurement will send you purchase orders soon."
- **Error**: Dashboard unavailable with retry
- **Edge — Account suspended**: Banner with reason and reactivation instructions
- **Edge — No activity in 90 days**: "It's been quiet. Contact procurement about upcoming opportunities."

### 3.2 Orders / Purchase Orders Screen

**Wireframe**: Table view of all purchase orders with filters, search, and detail panel. Status kanban board toggle.

**UI Fields / Components**:

- `POFilterBar` — Filters: `status` (all/draft/issued/confirmed/in_transit/delivered/cancelled), `dateRange` (date picker), `search` (PO number or item), `category` (dropdown), `amountRange` (min/max inputs)
- `POListView` — Table with columns: `poNumber`, `issuedDate`, `category`, `totalAmount`, `status` (colored badge), `deliveryDeadline`, `itemCount`, `actions` (View/Confirm/Flag)
- `POKanbanBoard` — Alternative view: columns by status with draggable cards
- `PODetailPanel` — Sections: `POHeader` (PO number, status, dates), `SupplierInfo`, `LineItems` (table: item, description, quantity, unit, unit price, total), `DeliverySchedule`, `TermsAndConditions`, `Attachments` (downloadable files from procurement), `Notes` (internal + supplier visible), `StatusHistory` (timeline)
- `POConfirmButton` — "Confirm PO" button (changes status from `issued` to `confirmed`)
- `POFlagButton` — "Flag Issue" button with reason modal
- `POPrintButton` — Print/download PDF of PO
- `PaginationBar` — Page controls

**Data Bindings**:

- `GET /api/supplier/orders?page=1&limit=20&status=issued&search=PO-2025`
- `GET /api/supplier/orders/:id` — full PO detail
- `PATCH /api/supplier/orders/:id/confirm` — confirm PO
- `PATCH /api/supplier/orders/:id/flag` — flag issue
- `GET /api/supplier/orders/:id/pdf` — download PDF

**States**:

- **Loading**: Table skeleton (10 rows)
- **Empty — No POs**: "No purchase orders yet. Contact procurement to get started." with procurement contact
- **Empty — Filter no results**: "No POs match your filters" with clear filters button
- **Error**: "Failed to load orders" with retry
- **Edge — PO rejected**: Status badge "Rejected" with reason tooltip, action to contact procurement
- **Edge — PO amount zero**: "Amount to be determined" displayed
- **Edge — Delivery past deadline**: Row highlighted red, overdue badge

### 3.3 Deliveries Screen

**Wireframe**: Calendar/schedule view of upcoming deliveries with list of past deliveries. Delivery detail and status update functionality.

**UI Fields / Components**:

- `DeliveryCalendar` — Month view with delivery date markers, color-coded by status
- `DeliveryListView` — Table: `scheduledDate`, `poReference`, `items` (summary), `destination` (campus location), `status` (scheduled/in_transit/delivered/partial/ delayed/cancelled), `actions` (Mark Delivered / Reschedule / Report Issue)
- `DeliveryDetailPanel` — `poReference` (link to PO), `scheduledDate`, `actualDeliveryDate`, `deliveryWindow` (time range), `carrier` (name + tracking number), `items` (list with quantities), `destination` (building + room), `receivingNotes`, `photos` (uploaded at delivery), `signature` (digital), `statusTimeline`
- `DeliveryUpdateModal` — Fields: `status` (dropdown), `actualDeliveryDate` (date), `receivedBy` (text), `signature` (canvas/sign pad), `photos` (upload up to 5), `notes` (textarea), `itemsDelivered` (per-line quantity adjustment for partial deliveries)
- `ScheduleDeliveryModal` — For scheduling new delivery: `suggestedDates` (3 date options from calendar), `deliveryWindow`, `notes`
- `DeliveryIssueReport` — Form: `issueType` (damaged/missing/late/incorrect/other), `description`, `photos`, `affectedItems`

**Data Bindings**:

- `GET /api/supplier/deliveries?page=1&limit=20&status=scheduled&startDate=2025-06-01&endDate=2025-06-30`
- `GET /api/supplier/deliveries/:id` — delivery detail
- `PATCH /api/supplier/deliveries/:id/status` — update delivery status
- `POST /api/supplier/deliveries/:id/issues` — report issue
- `POST /api/supplier/deliveries/schedule` — propose delivery schedule
- `PATCH /api/supplier/deliveries/:id/reschedule` — change scheduled date

**States**:

- **Loading**: Calendar skeleton + list skeleton
- **Empty — No scheduled deliveries**: "No deliveries scheduled. Confirm a PO to schedule delivery." with link to orders
- **Empty — No past deliveries**: "No delivery history yet."
- **Error**: "Deliveries unavailable" with retry
- **Edge — Partial delivery**: Status shows "Partial (3 of 5 items)", remaining items in new delivery
- **Edge — Delivery delayed**: Auto-notify procurement, update status to `delayed`, input new ETA
- **Edge — Damaged goods**: Issue report required, photos mandatory

### 3.4 Invoices Screen

**Wireframe**: Invoice list with filtering by status, amounts, dates. Invoice detail view with payment status and history.

**UI Fields / Components**:

- `InvoiceFilterBar` — Filters: `status` (draft/submitted/under_review/approved/paid/rejected), `dateRange`, `poReference`, `amountRange`
- `InvoiceListView` — Table: `invoiceNumber`, `poReference`, `invoiceDate`, `dueDate`, `totalAmount`, `balanceDue`, `status` badge, `daysUntilDue`/`daysOverdue`, `actions`
- `InvoiceDetailPanel` — `invoiceNumber`, `poReference` (link), `supplierInfo` (company, address, tax ID), `billingAddress` (CEA's), `items` (table: description, qty, unit price, amount), `subtotal`, `tax` (rate + amount), `totalAmount`, `currency`, `paymentTerms`, `dueDate`, `statusHistory`, `paymentReference` (if paid), `remittanceAdvice` (link)
- `InvoiceUploadButton` — Upload invoice PDF/electronic file
- `InvoiceCreateForm` — For creating invoice from PO: auto-populates from PO, editable fields: `invoiceNumber`, `invoiceDate`, `lineItemAdjustments`, `taxRate`, `notes`
- `PaymentStatusBadge` — Visual indicator: `unpaid` (red), `partial` (orange), `paid` (green), `overdue` (dark red)
- `RemittanceAdviceDownload` — Download remittance PDF

**Data Bindings**:

- `GET /api/supplier/invoices?page=1&limit=20&status=unpaid&poReference=PO-2025-001`
- `GET /api/supplier/invoices/:id` — invoice detail
- `POST /api/supplier/invoices` — create invoice
- `PATCH /api/supplier/invoices/:id` — update invoice (if under_review)
- `DELETE /api/supplier/invoices/:id` — delete draft invoice only
- `POST /api/supplier/invoices/:id/submit` — submit for approval
- `GET /api/supplier/invoices/:id/pdf` — download invoice PDF

**States**:

- **Loading**: Table skeleton (8 rows)
- **Empty — No invoices**: "No invoices submitted. Create your first invoice from a confirmed PO."
- **Empty — Filter no results**: "No invoices match your filters."
- **Error**: "Failed to load invoices" with retry
- **Edge — Invoice overdue > 30 days**: Badge "Overdue", interest/late fee note shown
- **Edge — Invoice partially paid**: Shows paid amount vs total, "Partial Payment" status
- **Edge — Invoice rejected**: Shows rejection reason, "Edit and Resubmit" button
- **Edge — Invoice without PO**: Flag "No PO Reference" for manual review

### 3.5 Company Profile Screen

**Wireframe**: Tabbed profile page: Company Info, Contacts, Compliance Documents, Banking Details, Settings.

**UI Fields / Components**:

- `CompanyInfoSection` — `companyName`, `registrationNumber` (text), `taxId` (text), `companyType` (dropdown: sole_proprietorship/llc/corporation/partnership), `industry` (text), `website` (url), `description` (textarea, max 1000), `yearEstablished` (number), `employeeCount` (number), `address` (street, city, state, zip, country), `phone`, `email`
- `ContactList` — Table of company contacts: `firstName`, `lastName`, `email`, `phone`, `role` (primary/billing/shipping/technical), `isPrimary` toggle
- `ComplianceDocuments` — Uploaded documents: `businessLicense` (PDF, required), `insuranceCertificate` (PDF, required, with expiry date), `taxClearance` (PDF), `safetyCompliance` (PDF), `ndas` (PDF list). Each with upload date, expiry date, status (valid/expiring/expired) badge
- `BankingDetailsSection` — `bankName`, `accountName`, `accountNumber`, `routingNumber`, `iban`, `swiftCode`, `currency`, `isVerified` badge. Encrypted storage.
- `CertificationsSection` — Tag list: `certificationName`, `issuingBody`, `expiryDate` (e.g., ISO 9001, SOC 2)
- `ProfileCompletenessBar` — "Profile X% complete — complete to receive POs faster"
- `SettingsTab` — `emailNotificationPreferences` (toggles per event), `passwordChange`, `twoFactorAuth`, `deactivateAccount`

**Data Bindings**:

- `GET /api/supplier/profile`
- `PUT /api/supplier/profile` — update company info
- `POST /api/supplier/profile/contacts` — add contact
- `PATCH /api/supplier/profile/contacts/:id` — update contact
- `DELETE /api/supplier/profile/contacts/:id` — remove contact
- `POST /api/supplier/profile/documents` — upload compliance doc (multipart)
- `DELETE /api/supplier/profile/documents/:id` — remove document
- `PUT /api/supplier/profile/banking` — update banking details
- `POST /api/supplier/profile/certifications` — add certification

**States**:

- **Loading**: Full form skeleton
- **Empty — New company**: "Complete your company profile to start receiving purchase orders."
- **Error**: Save failed with field-level errors
- **Edge — Compliance document expiring in 30 days**: Warning banner "Your insurance certificate expires in 15 days. Please upload a new one."
- **Edge — Banking verification pending**: "Bank details submitted for verification. This usually takes 1-2 business days."

### 3.6 Messaging Screen

**Wireframe**: Same structure as intern messaging but scoped to procurement department communications.

**UI Fields / Components**:

- `ConversationList` — Procurement contacts, PO-specific threads
- `MessageThread` — Standard chat with message bubbles, file attachments
- `Composer` — Textarea, file upload, send
- `POReferenceChip` — Each conversation shows related PO number (if applicable)
- `UrgentFlag` — Messages from procurement with high priority highlighted

**Data Bindings**:

- Same messaging API structure as intern (scoped to supplier ↔ procurement)
- `GET /api/supplier/messages/conversations`
- `POST /api/supplier/messages/conversations`
- `POST /api/supplier/messages/conversations/:id/messages`

### 3.7 Performance Ratings Screen

**Wireframe**: Scorecards for each completed contract period. Detailed breakdown by category with trend chart.

**UI Fields / Components**:

- `OverallScoreGauge` — Circular gauge showing overall rating (1–5) with color coding
- `ScoreBreakdownChart` — Horizontal bar chart: quality, timeliness, communication, flexibility, compliance
- `RatingHistoryChart` — Line chart showing score per quarter over time
- `PeriodScorecards` — Table: `period`, `overallScore`, `posFulfilled`, `deliveriesOnTime`, `avgResponseTime`, `detailedFeedback`, `ratingAwardedBy`
- `FeedbackDetails` — Expandable section per period: procurement comments, areas of improvement, commendations
- `RankingBadge` — Supplier tier badge: Bronze/Silver/Gold/Platinum based on cumulative score
- `RatingCriteria` — Info section explaining how each category is scored

**Data Bindings**:

- `GET /api/supplier/ratings` — all rating data
- `GET /api/supplier/ratings/periods?page=1&limit=12` — period scorecards
- `GET /api/supplier/ratings/trend` — chart data points

**States**:

- **Loading**: Gauge skeleton + chart skeleton
- **Empty — No ratings yet**: "No ratings available yet. Ratings are issued after completed contracts."
- **Error**: "Ratings unavailable" with retry
- **Edge — First rating received**: "Your first performance rating is in! Check your score."
- **Edge — Score dropped**: "Your rating dropped this period. Review feedback for improvement areas."

---

## 4. Full Database Schema

```typescript
// ---- drizzle/schema/supplier.ts ----

import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./users";

// ──────────────────────────────────────────────
// SUPPLIER COMPANIES
// ──────────────────────────────────────────────
export const supplierCompanies = sqliteTable("supplier_companies", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  registrationNumber: text("registration_number"),
  taxId: text("tax_id"),
  companyType: text("company_type", {
    enum: ["sole_proprietorship", "llc", "corporation", "partnership", "nonprofit"],
  })
    .notNull()
    .default("corporation"),
  industry: text("industry"),
  website: text("website"),
  description: text("description"),
  yearEstablished: integer("year_established"),
  employeeCount: integer("employee_count"),
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  country: text("country").notNull().default("US"),
  phone: text("phone"),
  email: text("email").notNull(),
  logoUrl: text("logo_url"),
  status: text("status", { enum: ["pending", "active", "suspended", "inactive"] })
    .notNull()
    .default("pending"),
  approvalDate: text("approval_date"),
  category: text("category").notNull(), // JSON array of categories
  profileCompleteness: integer("profile_completeness").notNull().default(0),
  overallRating: real("overall_rating"),
  tier: text("tier", { enum: ["bronze", "silver", "gold", "platinum"] })
    .notNull()
    .default("bronze"),
  totalOrdersFulfilled: integer("total_orders_fulfilled").notNull().default(0),
  totalRevenue: real("total_revenue").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// SUPPLIER USER ACCOUNTS (sub-users)
// ──────────────────────────────────────────────
export const supplierUsers = sqliteTable("supplier_users", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  companyId: text("company_id")
    .notNull()
    .references(() => supplierCompanies.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  role: text("role", { enum: ["admin", "manager", "viewer"] })
    .notNull()
    .default("manager"),
  isPrimary: integer("is_primary", { mode: "boolean" }).notNull().default(false),
  jobTitle: text("job_title"),
  phone: text("phone"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// PURCHASE ORDERS
// ──────────────────────────────────────────────
export const purchaseOrders = sqliteTable("purchase_orders", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  poNumber: text("po_number").notNull().unique(),
  companyId: text("company_id")
    .notNull()
    .references(() => supplierCompanies.id, { onDelete: "cascade" }),
  issuedBy: text("issued_by")
    .notNull()
    .references(() => users.id),
  category: text("category").notNull(),
  status: text("status", {
    enum: ["draft", "issued", "confirmed", "in_transit", "delivered", "cancelled", "rejected"],
  })
    .notNull()
    .default("draft"),
  issuedDate: text("issued_date")
    .notNull()
    .default(sql`current_date`),
  confirmedDate: text("confirmed_date"),
  deliveryDeadline: text("delivery_deadline"),
  subtotal: real("subtotal").notNull().default(0),
  taxAmount: real("tax_amount").notNull().default(0),
  taxRate: real("tax_rate").notNull().default(0),
  totalAmount: real("total_amount").notNull().default(0),
  currency: text("currency").notNull().default("USD"),
  paymentTerms: text("payment_terms"), // e.g., "Net 30"
  shippingAddress: text("shipping_address"),
  billingAddress: text("billing_address"),
  notes: text("notes"),
  termsAndConditions: text("terms_and_conditions"),
  supplierNotes: text("supplier_notes"),
  rejectionReason: text("rejection_reason"),
  flagReason: text("flag_reason"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const poLineItems = sqliteTable("po_line_items", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  poId: text("po_id")
    .notNull()
    .references(() => purchaseOrders.id, { onDelete: "cascade" }),
  itemName: text("item_name").notNull(),
  description: text("description"),
  quantity: integer("quantity").notNull(),
  unit: text("unit"), // e.g., "each", "kg", "hour", "license"
  unitPrice: real("unit_price").notNull(),
  totalPrice: real("total_price").notNull(),
  deliveryStatus: text("delivery_status", { enum: ["pending", "partial", "delivered"] })
    .notNull()
    .default("pending"),
  deliveredQuantity: integer("delivered_quantity").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const poAttachments = sqliteTable("po_attachments", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  poId: text("po_id")
    .notNull()
    .references(() => purchaseOrders.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size").notNull(),
  fileType: text("file_type").notNull(),
  uploadedBy: text("uploaded_by")
    .notNull()
    .references(() => users.id),
  uploadedAt: text("uploaded_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const poStatusHistory = sqliteTable("po_status_history", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  poId: text("po_id")
    .notNull()
    .references(() => purchaseOrders.id, { onDelete: "cascade" }),
  fromStatus: text("from_status"),
  toStatus: text("to_status").notNull(),
  changedBy: text("changed_by")
    .notNull()
    .references(() => users.id),
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// DELIVERIES
// ──────────────────────────────────────────────
export const deliveries = sqliteTable("deliveries", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  poId: text("po_id")
    .notNull()
    .references(() => purchaseOrders.id, { onDelete: "cascade" }),
  companyId: text("company_id")
    .notNull()
    .references(() => supplierCompanies.id),
  scheduledDate: text("scheduled_date").notNull(),
  scheduledTimeStart: text("scheduled_time_start"),
  scheduledTimeEnd: text("scheduled_time_end"),
  actualDeliveryDate: text("actual_delivery_date"),
  actualDeliveryTime: text("actual_delivery_time"),
  carrier: text("carrier"),
  trackingNumber: text("tracking_number"),
  status: text("status", {
    enum: ["scheduled", "in_transit", "delivered", "partial", "delayed", "cancelled"],
  })
    .notNull()
    .default("scheduled"),
  destinationBuilding: text("destination_building"),
  destinationRoom: text("destination_room"),
  receivedBy: text("received_by"),
  receiverSignature: text("receiver_signature"), // Base64 or URL
  deliveryNotes: text("delivery_notes"),
  photos: text("photos"), // JSON array of URLs
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const deliveryItems = sqliteTable("delivery_items", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  deliveryId: text("delivery_id")
    .notNull()
    .references(() => deliveries.id, { onDelete: "cascade" }),
  lineItemId: text("line_item_id")
    .notNull()
    .references(() => poLineItems.id),
  quantityDelivered: integer("quantity_delivered").notNull(),
  quantityAccepted: integer("quantity_accepted"),
  quantityDamaged: integer("quantity_damaged").notNull().default(0),
  notes: text("notes"),
});

export const deliveryIssues = sqliteTable("delivery_issues", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  deliveryId: text("delivery_id")
    .notNull()
    .references(() => deliveries.id, { onDelete: "cascade" }),
  issueType: text("issue_type", {
    enum: ["damaged", "missing", "late", "incorrect", "other"],
  }).notNull(),
  description: text("description").notNull(),
  photoUrls: text("photo_urls"), // JSON array
  status: text("status", { enum: ["open", "investigating", "resolved", "closed"] })
    .notNull()
    .default("open"),
  resolution: text("resolution"),
  resolvedAt: text("resolved_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// INVOICES
// ──────────────────────────────────────────────
export const supplierInvoices = sqliteTable("supplier_invoices", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  companyId: text("company_id")
    .notNull()
    .references(() => supplierCompanies.id, { onDelete: "cascade" }),
  poId: text("po_id").references(() => purchaseOrders.id),
  invoiceNumber: text("invoice_number").notNull(),
  invoiceDate: text("invoice_date").notNull(),
  dueDate: text("due_date").notNull(),
  subtotal: real("subtotal").notNull(),
  taxRate: real("tax_rate").notNull().default(0),
  taxAmount: real("tax_amount").notNull().default(0),
  totalAmount: real("total_amount").notNull(),
  amountPaid: real("amount_paid").notNull().default(0),
  balanceDue: real("balance_due").notNull(),
  currency: text("currency").notNull().default("USD"),
  status: text("status", {
    enum: [
      "draft",
      "submitted",
      "under_review",
      "approved",
      "paid",
      "partial",
      "rejected",
      "cancelled",
    ],
  })
    .notNull()
    .default("draft"),
  paymentDate: text("payment_date"),
  paymentReference: text("payment_reference"),
  paymentMethod: text("payment_method"),
  rejectionReason: text("rejection_reason"),
  notes: text("notes"),
  invoicePdfUrl: text("invoice_pdf_url"),
  remittanceAdviceUrl: text("remittance_advice_url"),
  submittedAt: text("submitted_at"),
  approvedAt: text("approved_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const invoiceLineItems = sqliteTable("invoice_line_items", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  invoiceId: text("invoice_id")
    .notNull()
    .references(() => supplierInvoices.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: real("unit_price").notNull(),
  totalPrice: real("total_price").notNull(),
});

// ──────────────────────────────────────────────
// SUPPLIER COMPLIANCE DOCUMENTS
// ──────────────────────────────────────────────
export const supplierDocuments = sqliteTable("supplier_documents", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  companyId: text("company_id")
    .notNull()
    .references(() => supplierCompanies.id, { onDelete: "cascade" }),
  documentType: text("document_type", {
    enum: [
      "business_license",
      "insurance_certificate",
      "tax_clearance",
      "safety_compliance",
      "nda",
      "other",
    ],
  }).notNull(),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size").notNull(),
  issueDate: text("issue_date"),
  expiryDate: text("expiry_date"),
  status: text("status", { enum: ["valid", "expiring", "expired", "rejected"] })
    .notNull()
    .default("valid"),
  uploadedAt: text("uploaded_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// SUPPLIER BANKING DETAILS
// ──────────────────────────────────────────────
export const supplierBanking = sqliteTable("supplier_banking", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  companyId: text("company_id")
    .notNull()
    .unique()
    .references(() => supplierCompanies.id, { onDelete: "cascade" }),
  bankName: text("bank_name").notNull(),
  accountName: text("account_name").notNull(),
  accountNumber: text("account_number").notNull(),
  routingNumber: text("routing_number"),
  iban: text("iban"),
  swiftCode: text("swift_code"),
  currency: text("currency").notNull().default("USD"),
  isVerified: integer("is_verified", { mode: "boolean" }).notNull().default(false),
  verifiedAt: text("verified_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// SUPPLIER PERFORMANCE RATINGS
// ──────────────────────────────────────────────
export const supplierRatings = sqliteTable("supplier_ratings", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  companyId: text("company_id")
    .notNull()
    .references(() => supplierCompanies.id, { onDelete: "cascade" }),
  period: text("period").notNull(), // e.g., "2025-Q2"
  overallScore: real("overall_score").notNull(),
  qualityScore: real("quality_score").notNull(),
  timelinessScore: real("timeliness_score").notNull(),
  communicationScore: real("communication_score").notNull(),
  flexibilityScore: real("flexibility_score").notNull(),
  complianceScore: real("compliance_score").notNull(),
  feedback: text("feedback"),
  strengths: text("strengths"),
  areasForImprovement: text("areas_for_improvement"),
  ratedBy: text("rated_by")
    .notNull()
    .references(() => users.id),
  posFulfilled: integer("pos_fulfilled").notNull().default(0),
  deliveriesOnTime: integer("deliveries_on_time").notNull().default(0),
  totalDeliveries: integer("total_deliveries").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// SUPPLIER CERTIFICATIONS
// ──────────────────────────────────────────────
export const supplierCertifications = sqliteTable("supplier_certifications", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  companyId: text("company_id")
    .notNull()
    .references(() => supplierCompanies.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  issuingBody: text("issuing_body").notNull(),
  certificationDate: text("certification_date"),
  expiryDate: text("expiry_date"),
  certificateUrl: text("certificate_url"),
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
// GET /api/supplier/dashboard
// Auth: JWT (role: supplier)
interface SupplierDashboardResponse {
  company: {
    id: string;
    companyName: string;
    logoUrl: string | null;
    status: string;
    tier: string;
    overallRating: number | null;
  };
  metrics: {
    activePOs: number;
    pendingDeliveries: number;
    overdueDeliveries: number;
    unpaidInvoices: number;
    unpaidAmount: number;
    totalRevenue: number;
  };
  pendingActions: Array<{
    id: string;
    type: string;
    description: string;
    priority: "high" | "medium" | "low";
    link: string;
  }>;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    link: string | null;
  }>;
  upcomingDeadlines: Array<{
    date: string;
    title: string;
    type: "delivery" | "po_confirmation" | "document_expiry";
  }>;
  alerts: Array<{
    type: "warning" | "error" | "info";
    message: string;
    actionLabel: string | null;
    actionUrl: string | null;
  }>;
}
```

### 5.2 Purchase Orders

```typescript
// GET /api/supplier/orders
interface POListResponse {
  data: Array<{
    id: string;
    poNumber: string;
    issuedDate: string;
    category: string;
    totalAmount: number;
    currency: string;
    status: string;
    deliveryDeadline: string | null;
    itemCount: number;
    isConfirmed: boolean;
  }>;
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

// GET /api/supplier/orders/:id
interface PODetailResponse {
  id: string;
  poNumber: string;
  status: string;
  issuedDate: string;
  confirmedDate: string | null;
  deliveryDeadline: string | null;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  paymentTerms: string | null;
  shippingAddress: string | null;
  billingAddress: string | null;
  notes: string | null;
  termsAndConditions: string | null;
  supplierNotes: string | null;
  rejectionReason: string | null;
  flagReason: string | null;
  lineItems: Array<{
    id: string;
    itemName: string;
    description: string | null;
    quantity: number;
    unit: string | null;
    unitPrice: number;
    totalPrice: number;
    deliveryStatus: string;
    deliveredQuantity: number;
  }>;
  attachments: Array<{ id: string; fileName: string; fileUrl: string; fileSize: number }>;
  statusHistory: Array<{
    fromStatus: string | null;
    toStatus: string;
    changedBy: string;
    notes: string | null;
    createdAt: string;
  }>;
  company: { id: string; companyName: string };
}

// PATCH /api/supplier/orders/:id/confirm
// Body: { supplierNotes?: string }
// Response 200: PODetailResponse
// 400: Order not in 'issued' status

// PATCH /api/supplier/orders/:id/flag
// Body: { reason: string }
// Response 200: { message: 'Issue flagged'; flagReason: string }
```

### 5.3 Deliveries

```typescript
// GET /api/supplier/deliveries
interface DeliveryListResponse {
  data: Array<{
    id: string;
    scheduledDate: string;
    poNumber: string;
    poId: string;
    status: string;
    itemSummary: string;
    destination: string;
    isOverdue: boolean;
    hasIssues: boolean;
  }>;
  pagination: Pagination;
}

// PATCH /api/supplier/deliveries/:id/status
// Body: { status: string; actualDeliveryDate?: string; actualDeliveryTime?: string; receivedBy?: string; signature?: string; photos?: string[]; notes?: string; itemsDelivered?: Array<{ lineItemId: string; quantity: number }> }
// Response 200: DeliveryDetailResponse
// 400: Invalid status transition, missing required fields for 'delivered'

// POST /api/supplier/deliveries/:id/issues
// Body: { issueType: string; description: string; photos?: string[]; affectedItems?: string[] }
// Response 201: DeliveryIssue

// POST /api/supplier/deliveries/schedule
// Body: { poId: string; suggestedDate: string; suggestedTimeStart?: string; suggestedTimeEnd?: string; notes?: string }
// Response 201: { id: string; status: 'scheduled' }
```

### 5.4 Invoices

```typescript
// GET /api/supplier/invoices
interface InvoiceListResponse {
  data: Array<{
    id: string;
    invoiceNumber: string;
    poNumber: string | null;
    invoiceDate: string;
    dueDate: string;
    totalAmount: number;
    balanceDue: number;
    currency: string;
    status: string;
    daysOverdue: number | null;
    isOverdue: boolean;
  }>;
  pagination: Pagination;
}

// POST /api/supplier/invoices
// Body: { poId: string; invoiceNumber: string; invoiceDate: string; dueDate: string; lineItems: Array<{ description: string; quantity: number; unitPrice: number }>; taxRate?: number; notes?: string; invoicePdf?: string (base64) }
// Response 201: InvoiceDetailResponse
// 400: PO not found, duplicate invoice number, invalid amounts

// PATCH /api/supplier/invoices/:id
// Body: Partial<InvoiceRequest>
// 400: Cannot edit if status is not 'draft' or 'under_review'

// POST /api/supplier/invoices/:id/submit
// Response 200: { status: 'submitted'; submittedAt: string }
// 400: Invoice incomplete, missing PO reference
```

### 5.5 Profile

```typescript
// GET /api/supplier/profile
interface SupplierProfileResponse {
  company: {
    id: string;
    companyName: string;
    registrationNumber: string | null;
    taxId: string | null;
    companyType: string;
    industry: string | null;
    website: string | null;
    description: string | null;
    yearEstablished: number | null;
    employeeCount: number | null;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string | null;
    email: string;
    logoUrl: string | null;
    status: string;
    category: string[];
    profileCompleteness: number;
  };
  contacts: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    role: string;
    isPrimary: boolean;
  }>;
  documents: Array<{
    id: string;
    documentType: string;
    fileName: string;
    status: string;
    expiryDate: string | null;
  }>;
  banking: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    routingNumber: string | null;
    iban: string | null;
    swiftCode: string | null;
    currency: string;
    isVerified: boolean;
  } | null;
  certifications: Array<{
    id: string;
    name: string;
    issuingBody: string;
    expiryDate: string | null;
  }>;
}

// PUT /api/supplier/profile
// Body: { companyName?: string; description?: string; website?: string; phone?: string; email?: string; addressLine1?: string; city?: string; state?: string; zipCode?: string; country?: string; category?: string[] }
// Response 200: SupplierProfileResponse

// PUT /api/supplier/profile/banking
// Body: { bankName: string; accountName: string; accountNumber: string; routingNumber?: string; iban?: string; swiftCode?: string; currency: string }
// Response 200: { status: 'updated'; isVerified: false; message: 'Submitted for verification' }
```

### 5.6 Ratings

```typescript
// GET /api/supplier/ratings
interface SupplierRatingsResponse {
  overallRating: number | null;
  tier: string;
  currentPeriod: {
    period: string;
    overallScore: number;
    qualityScore: number;
    timelinessScore: number;
    communicationScore: number;
    flexibilityScore: number;
    complianceScore: number;
  } | null;
  trend: Array<{ period: string; overallScore: number }>;
  periodHistory: Array<{
    period: string;
    overallScore: number;
    posFulfilled: number;
    deliveriesOnTime: number;
    totalDeliveries: number;
    feedback: string | null;
  }>;
}
```

---

## 6. Component Tree

```
<SupplierLayout>
  <Sidebar>
    <SidebarNavItem icon="home" label="Hub" href="/supplier" />
    <SidebarNavItem icon="shoppingCart" label="Orders" href="/supplier/orders" badge={pendingPOs} />
    <SidebarNavItem icon="truck" label="Deliveries" href="/supplier/deliveries" badge={pendingDeliveries} />
    <SidebarNavItem icon="fileText" label="Invoices" href="/supplier/invoices" badge={unpaidCount} />
    <SidebarNavItem icon="building" label="Company Profile" href="/supplier/profile" />
    <SidebarNavItem icon="messageCircle" label="Messaging" href="/supplier/messages" badge={unreadCount} />
    <SidebarNavItem icon="star" label="Performance" href="/supplier/ratings" />
  </Sidebar>
  <main>{children}</main>
</SupplierLayout>

<SupplierHub>
  <SupplierWelcomeBanner />
  <MetricsRow>
    <MetricCard icon="shoppingCart" value={activePOs} label="Active POs" />
    <MetricCard icon="truck" value={pendingDeliveries} label="Pending Deliveries" overdue={overdueDeliveries} />
    <MetricCard icon="dollarSign" value={unpaidAmount} label="Unpaid" formatCurrency />
    <MetricCard icon="star" value={overallRating} label="Rating" formatStars />
  </MetricsRow>
  <div className="grid grid-cols-2 gap-4">
    <PendingActionsList />
    <UpcomingDeadlines />
  </div>
  <RecentActivityFeed />
  <QuickActionBar />
</SupplierHub>

<OrdersScreen>
  <POFilterBar />
  <div className="flex gap-4">
    <TabSelect value="list" | "kanban">
      <POListView>
        <POTableRow /> (virtualized, repeated)
      </POListView>
      <POKanbanBoard>
        <KanbanColumn /> (per status)
      </POKanbanBoard>
    </TabSelect>
    <PODetailPanel>
      <POHeader />
      <LineItemsTable />
      <DeliverySchedule />
      <TermsAndConditions />
      <AttachmentList />
      <StatusHistoryTimeline />
      <POActions>
        <ConfirmPOButton />
        <FlagIssueButton />
        <PrintPOButton />
      </POActions>
    </PODetailPanel>
  </div>
</OrdersScreen>

<DeliveriesScreen>
  <DeliveryCalendar />
  <DeliveryTabs value="upcoming" | "past" | "issues">
    <DeliveryListView>
      <DeliveryRow /> (repeated)
    </DeliveryListView>
    <DeliveryDetailPanel>
      <DeliveryHeader />
      <POReferenceLink />
      <ItemList />
      <DeliveryTimeline />
      <DeliveryActions>
        <MarkDeliveredButton />
        <RescheduleButton />
        <ReportIssueButton />
      </DeliveryActions>
    </DeliveryDetailPanel>
  </DeliveryTabs>
  <DeliveryUpdateModal />
  <DeliveryIssueModal />
  <ScheduleDeliveryModal />
</DeliveriesScreen>

<InvoicesScreen>
  <InvoiceFilterBar />
  <InvoiceListView>
    <InvoiceRow /> (repeated)
  </InvoiceListView>
  <InvoiceDetailPanel>
    <InvoiceHeader />
    <POReference />
    <SupplierInfo />
    <InvoiceLineItems />
    <TotalsSection />
    <PaymentStatusBadge />
    <StatusHistory />
    <InvoiceActions>
      <CreateInvoiceButton />
      <SubmitInvoiceButton />
      <DownloadPDFButton />
    </InvoiceActions>
  </InvoiceDetailPanel>
  <InvoiceCreateForm />
</InvoicesScreen>

<CompanyProfileScreen>
  <Tabs value="info" | "contacts" | "documents" | "banking" | "settings">
    <CompanyInfoSection>
      <TextField name="companyName" />
      <TextField name="registrationNumber" />
      <TextField name="taxId" />
      <Dropdown name="companyType" />
      <TextField name="website" />
      <Textarea name="description" />
      <AddressForm />
    </CompanyInfoSection>
    <ContactList>
      <ContactRow /> (repeated)
      <AddContactButton />
    </ContactList>
    <ComplianceDocuments>
      <DocumentCard /> (repeated, with upload/delete)
    </ComplianceDocuments>
    <BankingDetailsSection>
      <BankingForm />
      <VerificationBadge />
    </BankingDetailsSection>
    <SettingsTab>
      <NotificationPreferences />
      <ChangePasswordForm />
      <TwoFactorAuth />
    </SettingsTab>
  </Tabs>
  <ProfileCompletenessBar />
</CompanyProfileScreen>

<PerformanceScreen>
  <OverallScoreGauge />
  <ScoreBreakdownChart />
  <RatingHistoryChart />
  <PeriodScorecards>
    <ScorecardRow /> (repeated)
  </PeriodScorecards>
  <RankingBadge />
</PerformanceScreen>
```

---

## 7. Exhaustive User Journeys

### Journey 1: Receive and Confirm Purchase Order

1. Supplier logs in, sees dashboard with "1 PO awaiting confirmation" alert
2. Clicks alert → navigates to `/supplier/orders` filtered to `issued`
3. PO-2025-0423 appears in list, status "Issued"
4. Clicks PO → detail panel opens with line items: 20 laptops, 30 monitors
5. Reviews delivery deadline, terms (Net 30), shipping address
6. Clicks "Confirm PO" → `PATCH /api/supplier/orders/:id/confirm`
7. Modal: adds note "We can deliver by June 20. Confirming pricing as quoted."
8. Confirms → status changes to "Confirmed", procurement notified
9. PO moves to "Confirmed" kanban column
10. Supplier can now schedule delivery

### Journey 2: Schedule and Complete Delivery

1. From confirmed PO, supplier clicks "Schedule Delivery"
2. `ScheduleDeliveryModal` opens with calendar, suggests 3 dates
3. Selects June 20, 9:00–11:00 AM window
4. Adds notes: "Deliver to loading dock B"
5. Submits → delivery created with status "Scheduled"
6. On delivery day, supplier marks "In Transit" → `PATCH /api/supplier/deliveries/:id/status`
7. Arrives at campus, checks in at reception
8. Completes delivery: updates status to "Delivered", enters received-by name
9. Uploads delivery photos, captures digital signature
10. For each line item, enters delivered quantity (20/20, 30/30)
11. Submits → procurement notified, PO line items updated to "Delivered"

### Journey 3: Submit Invoice for Payment

1. After delivery confirmed, supplier navigates to `/supplier/invoices`
2. Clicks "Create Invoice" → form auto-populated from PO-2025-0423
3. Verifies line items, unit prices match PO
4. Enters invoice number "INV-2025-089", invoice date, due date (Net 30)
5. Tax rate auto-calculated at 8.25%
6. Attaches invoice PDF
7. Clicks "Save Draft" → invoice created in "Draft" status
8. Reviews totals: $45,230.00
9. Clicks "Submit" → `POST /api/supplier/invoices/:id/submit`
10. Status → "Submitted", procurement finance notified
11. Invoice moves to "Under Review" → "Approved" → "Paid" over next days
12. When paid, status badge turns green, payment reference shown

### Journey 4: Update Company Profile & Compliance

1. Supplier gets notification: "Insurance certificate expiring in 15 days"
2. Navigates to `/supplier/profile/documents`
3. Sees insurance certificate with "Expiring" badge
4. Clicks "Upload New" → file picker for PDF
5. Selects new insurance certificate, enters expiry date
6. Uploads → document replaces old one, status "Valid" with new expiry
7. Profile completeness updates from 75% to 80%
8. Switches to "Banking" tab, verifies bank details are correct
9. Adds SWIFT code for international payments
10. Banking marked as "Submitted for verification"

### Journey 5: Report Delivery Issue

1. Supplier delivers 20 laptops, but 2 are damaged in transit
2. In delivery update, enters: quantity delivered 20, quantity damaged 2
3. Clicks "Report Issue" → issue form with `issueType: damaged`
4. Adds description: "Two units have cracked screens"
5. Uploads photos of damaged units
6. Submits → `POST /api/supplier/deliveries/:id/issues`
7. Issue status "Open", procurement notified
8. Procurement reviews, marks "Investigating"
9. After agreement, resolution: "Return damaged units, supplier will replace within 5 days"
10. Issue status → "Resolved"

### Journey 6: View Performance Rating

1. After end of quarter, supplier receives notification: "New performance rating available"
2. Navigates to `/supplier/ratings`
3. Overall gauge shows 4.2/5 — "Silver Tier"
4. Breakdown: Quality 4.5, Timeliness 3.8, Communication 4.3, Flexibility 4.0, Compliance 4.2
5. Trend chart shows improvement from 3.8 → 4.0 → 4.2 over 3 quarters
6. Reads feedback: "Excellent product quality. Improve delivery timeliness for Platinum tier."
7. Downloads scorecard PDF for internal records

---

## 8. Business Rules Engine

| Rule ID  | Name                           | Condition                                                                      | Action                                                        |
| -------- | ------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| SUP-R001 | PO auto-expire                 | `status = 'issued' AND issuedAt > 30 days`                                     | Auto-cancel PO, notify both parties                           |
| SUP-R002 | Duplicate invoice              | `invoiceNumber EXISTS AND companyId = X`                                       | Block creation, show existing invoice                         |
| SUP-R003 | Invoice-PO mismatch            | `invoice.totalAmount > PO.totalAmount * 1.1`                                   | Flag for manual review, warn supplier                         |
| SUP-R004 | Delivery auto-overdue          | `scheduledDate < today() AND status IN (scheduled,in_transit)`                 | Auto-set `delayed`, notify procurement                        |
| SUP-R005 | Document expiry alert          | `expiryDate < now() + 30 days`                                                 | Send warning notification weekly until replaced               |
| SUP-R006 | Document expired block         | `expiryDate < now()` AND required doc type                                     | Block new PO issuance, show compliance hold                   |
| SUP-R007 | Banking verification           | `banking.updatedAt AND NOT isVerified`                                         | Mark for manual verification, 2-day SLA                       |
| SUP-R008 | Tier calculation               | `averageRating >= 4.5 → platinum, >= 4.0 → gold, >= 3.5 → silver, else bronze` | Recalculate at each rating period                             |
| SUP-R009 | Payment term calculation       | `invoice.approvedAt + paymentTermDays = dueDate`                               | Auto-calculate due date                                       |
| SUP-R010 | PO confirmation window         | `status = 'issued' AND now() > issuedAt + 7 days`                              | Escalate to procurement if not confirmed                      |
| SUP-R011 | Max flag count                 | `flags IN last 90 days > 5`                                                    | Auto-suspend supplier, notify procurement                     |
| SUP-R012 | Partial delivery handling      | `deliveredQuantity < quantity AND deliveredQuantity > 0`                       | Auto-create remainder delivery, update PO status to 'partial' |
| SUP-R013 | Invoice auto-approve threshold | `invoice.totalAmount < 1000 AND documentStatus = valid`                        | Auto-approve invoice, skip manual review                      |
| SUP-R014 | Supplier deactivation          | `no activity > 365 days`                                                       | Auto-set status to inactive, archive                          |

---

## 9. Notification Specifications

| Notification       | Trigger                         | Channel                     | Template Variables                              | Delivery Rules             |
| ------------------ | ------------------------------- | --------------------------- | ----------------------------------------------- | -------------------------- |
| PO issued          | PO created with status 'issued' | In-app, Email               | `{poNumber}, {totalAmount}, {deliveryDeadline}` | Immediate                  |
| PO confirmed       | Supplier confirms PO            | In-app (procurement)        | `{poNumber}, {companyName}`                     | Immediate                  |
| PO cancelled       | PO cancelled by procurement     | In-app, Email               | `{poNumber}, {reason}`                          | Immediate                  |
| PO flagged         | Supplier flags issue            | In-app, Email (procurement) | `{poNumber}, {reason}`                          | Immediate                  |
| Delivery due today | Scheduled date = today          | In-app, Email, Push         | `{poNumber}, {timeWindow}, {destination}`       | 8:00 AM day of             |
| Delivery overdue   | Status delayed                  | In-app, Email               | `{poNumber}, {scheduledDate}`                   | Immediate                  |
| Delivery completed | Status changed to delivered     | In-app (procurement)        | `{poNumber}, {itemsCount}`                      | Immediate                  |
| Issue reported     | New delivery issue              | In-app, Email (procurement) | `{issueType}, {poNumber}`                       | Immediate                  |
| Issue resolved     | Issue status resolved           | In-app, Email               | `{issueType}, {resolution}`                     | Immediate                  |
| Invoice submitted  | Supplier submits invoice        | In-app, Email (accounting)  | `{invoiceNumber}, {amount}, {poNumber}`         | Immediate                  |
| Invoice approved   | Invoice approved                | In-app, Email               | `{invoiceNumber}, {amount}, {dueDate}`          | Immediate                  |
| Invoice paid       | Payment processed               | In-app, Email               | `{invoiceNumber}, {amount}, {paymentReference}` | Immediate                  |
| Invoice rejected   | Invoice rejected                | In-app, Email               | `{invoiceNumber}, {reason}`                     | Immediate with reason      |
| Invoice overdue    | Due date passed, unpaid         | In-app, Email               | `{invoiceNumber}, {amount}, {daysOverdue}`      | Daily after 7 days overdue |
| Document expiring  | Within 30 days of expiry        | In-app, Email               | `{docType}, {expiryDate}, {companyName}`        | 30, 15, 7, 1 day before    |
| Performance rating | New rating published            | In-app, Email               | `{period}, {overallScore}, {tier}`              | Immediate                  |

---

## 10. Permission Matrix

| Entity         | Operation     | Supplier | Procurement | Accountant | Admin |
| -------------- | ------------- | -------- | ----------- | ---------- | ----- |
| Purchase Order | View own      | ✓        | ✓           | ✓          | ✓     |
| Purchase Order | Confirm       | ✓        | ✓           | ✗          | ✓     |
| Purchase Order | Flag          | ✓        | ✓           | ✗          | ✓     |
| Purchase Order | Create        | ✗        | ✓           | ✗          | ✓     |
| Purchase Order | Cancel        | ✗        | ✓           | ✓          | ✓     |
| Delivery       | View own      | ✓        | ✓           | ✗          | ✓     |
| Delivery       | Schedule      | ✓        | ✓           | ✗          | ✓     |
| Delivery       | Update status | ✓        | ✓           | ✗          | ✓     |
| Delivery       | Report issue  | ✓        | ✓           | ✗          | ✓     |
| Invoice        | Create        | ✓        | ✗           | ✓          | ✓     |
| Invoice        | Submit        | ✓        | ✗           | ✓          | ✓     |
| Invoice        | View own      | ✓        | ✓           | ✓          | ✓     |
| Invoice        | Approve/Pay   | ✗        | ✗           | ✓          | ✓     |
| Profile        | Update own    | ✓        | ✗           | ✗          | ✓     |
| Profile        | View          | ✓        | ✓           | ✓          | ✓     |
| Banking        | Create/Update | ✓        | ✗           | ✓          | ✓     |
| Banking        | Verify        | ✗        | ✗           | ✓          | ✓     |
| Documents      | Upload        | ✓        | ✗           | ✗          | ✓     |
| Documents      | View          | ✓        | ✓           | ✓          | ✓     |
| Ratings        | View own      | ✓        | ✓           | ✓          | ✓     |
| Ratings        | Create        | ✗        | ✓           | ✓          | ✓     |

---

## 11. State Management

### Redux Slice Structure

```typescript
interface SupplierState {
  company: SupplierCompany | null;
  dashboard: SupplierDashboard | null;
  orders: {
    items: PurchaseOrder[];
    selectedId: string | null;
    filters: POFilterState;
    pagination: PaginationState;
    viewMode: "list" | "kanban";
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
  deliveries: {
    items: Delivery[];
    selectedId: string | null;
    filters: DeliveryFilterState;
    calendarView: Date;
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
  invoices: {
    items: Invoice[];
    selectedId: string | null;
    filters: InvoiceFilterState;
    pagination: PaginationState;
    loading: "idle" | "pending" | "succeeded" | "failed";
  };
  profile: SupplierProfile | null;
  ratings: SupplierRatingData | null;
}
```

### RTK Query Endpoints

```typescript
const supplierApi = createApi({
  reducerPath: "supplierApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/supplier", credentials: "include" }),
  tagTypes: ["Dashboard", "Orders", "Deliveries", "Invoices", "Profile", "Ratings"],
  endpoints: (builder) => ({
    getDashboard: builder.query<SupplierDashboardResponse, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
    getOrders: builder.query<POListResponse, POFilterState>({
      query: (params) => ({ url: "/orders", params }),
      providesTags: ["Orders"],
    }),
    getOrder: builder.query<PODetailResponse, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (r, e, id) => [{ type: "Orders", id }],
    }),
    confirmOrder: builder.mutation<PODetailResponse, { id: string; notes?: string }>({
      query: ({ id, notes }) => ({
        url: `/orders/${id}/confirm`,
        method: "PATCH",
        body: { supplierNotes: notes },
      }),
      invalidatesTags: ["Orders", "Dashboard"],
    }),
    flagOrder: builder.mutation<
      { message: string; flagReason: string },
      { id: string; reason: string }
    >({
      query: ({ id, reason }) => ({ url: `/orders/${id}/flag`, method: "PATCH", body: { reason } }),
      invalidatesTags: ["Orders"],
    }),
    getDeliveries: builder.query<DeliveryListResponse, DeliveryFilterState>({
      query: (params) => ({ url: "/deliveries", params }),
      providesTags: ["Deliveries"],
    }),
    updateDeliveryStatus: builder.mutation<DeliveryDetailResponse, DeliveryStatusUpdate>({
      query: (body) => ({ url: `/deliveries/${body.id}/status`, method: "PATCH", body }),
      invalidatesTags: ["Deliveries", "Orders", "Dashboard"],
    }),
    reportDeliveryIssue: builder.mutation<DeliveryIssue, DeliveryIssueRequest>({
      query: ({ id, ...body }) => ({ url: `/deliveries/${id}/issues`, method: "POST", body }),
      invalidatesTags: ["Deliveries"],
    }),
    getInvoices: builder.query<InvoiceListResponse, InvoiceFilterState>({
      query: (params) => ({ url: "/invoices", params }),
      providesTags: ["Invoices"],
    }),
    createInvoice: builder.mutation<InvoiceDetailResponse, CreateInvoiceRequest>({
      query: (body) => ({ url: "/invoices", method: "POST", body }),
      invalidatesTags: ["Invoices", "Dashboard"],
    }),
    submitInvoice: builder.mutation<{ status: string; submittedAt: string }, string>({
      query: (id) => ({ url: `/invoices/${id}/submit`, method: "POST" }),
      invalidatesTags: ["Invoices"],
    }),
    getProfile: builder.query<SupplierProfileResponse, void>({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<SupplierProfileResponse, Partial<SupplierCompany>>({
      query: (body) => ({ url: "/profile", method: "PUT", body }),
      invalidatesTags: ["Profile", "Dashboard"],
    }),
    getRatings: builder.query<SupplierRatingsResponse, void>({
      query: () => "/ratings",
      providesTags: ["Ratings"],
    }),
  }),
});
```

---

## 12. Form Schemas (Zod)

```typescript
import { z } from "zod";

export const poConfirmationSchema = z.object({
  supplierNotes: z.string().max(2000).optional(),
});

export const deliveryStatusUpdateSchema = z
  .object({
    status: z.enum(["in_transit", "delivered", "partial", "delayed"]),
    actualDeliveryDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    actualDeliveryTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .optional(),
    receivedBy: z.string().max(100).optional(),
    signature: z.string().optional(),
    photos: z.array(z.string()).max(5).optional(),
    notes: z.string().max(2000).optional(),
    itemsDelivered: z
      .array(
        z.object({
          lineItemId: z.string().uuid(),
          quantity: z.number().int().min(0),
        }),
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (data.status === "delivered" || data.status === "partial") {
        return !!data.receivedBy;
      }
      return true;
    },
    { message: "Received by name is required for delivery confirmation" },
  );

export const deliveryIssueSchema = z.object({
  issueType: z.enum(["damaged", "missing", "late", "incorrect", "other"]),
  description: z.string().min(10, "Please provide details").max(2000),
  photos: z.array(z.string()).max(5).optional(),
  affectedItems: z.array(z.string()).optional(),
});

export const createInvoiceSchema = z.object({
  poId: z.string().uuid("Valid PO required"),
  invoiceNumber: z.string().min(1, "Invoice number required").max(50),
  invoiceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  lineItems: z
    .array(
      z.object({
        description: z.string().min(1).max(500),
        quantity: z.number().int().min(1),
        unitPrice: z.number().min(0.01, "Price must be > 0"),
      }),
    )
    .min(1, "At least one line item required"),
  taxRate: z.number().min(0).max(100).optional().default(0),
  notes: z.string().max(1000).optional(),
  invoicePdf: z.string().optional(),
});

export const companyProfileSchema = z.object({
  companyName: z.string().min(1, "Company name required").max(200),
  description: z.string().max(1000).optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  phone: z.string().optional(),
  email: z.string().email("Valid email required"),
  addressLine1: z.string().min(1, "Address required").max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(1, "City required").max(100),
  state: z.string().min(1, "State required").max(100),
  zipCode: z.string().min(5, "Valid ZIP required").max(20),
  country: z.string().min(2, "Country required").max(100),
  category: z.array(z.string()).min(1, "Select at least one category"),
});

export const bankingDetailsSchema = z.object({
  bankName: z.string().min(1, "Bank name required").max(200),
  accountName: z.string().min(1, "Account name required").max(200),
  accountNumber: z.string().min(4, "Valid account number required").max(50),
  routingNumber: z.string().max(50).optional(),
  iban: z.string().max(50).optional(),
  swiftCode: z.string().max(20).optional(),
  currency: z.string().min(1, "Currency required").max(3),
});
```

---

## 13. Analytics Events

| Event Name                  | Properties                                      | Trigger            | Destination |
| --------------------------- | ----------------------------------------------- | ------------------ | ----------- |
| supplier_dashboard_viewed   | `{companyId, status, tier}`                     | Dashboard load     | PostHog     |
| supplier_po_viewed          | `{companyId, poId, status, amount}`             | PO detail opened   | PostHog     |
| supplier_po_confirmed       | `{companyId, poId, amount, responseTime}`       | PO confirmed       | PostHog     |
| supplier_po_flagged         | `{companyId, poId, reason}`                     | PO flagged         | PostHog     |
| supplier_delivery_scheduled | `{companyId, poId, date}`                       | Delivery scheduled | PostHog     |
| supplier_delivery_status    | `{companyId, deliveryId, status, onTime}`       | Status update      | PostHog     |
| supplier_delivery_issue     | `{companyId, deliveryId, issueType}`            | Issue reported     | PostHog     |
| supplier_invoice_created    | `{companyId, invoiceId, amount, hasPDF}`        | Invoice created    | PostHog     |
| supplier_invoice_submitted  | `{companyId, invoiceId, amount}`                | Invoice submitted  | PostHog     |
| supplier_invoice_status     | `{companyId, invoiceId, status, daysToProcess}` | Status change      | PostHog     |
| supplier_profile_updated    | `{companyId, section, completenessAfter}`       | Profile saved      | PostHog     |
| supplier_document_uploaded  | `{companyId, docType, hasExpiry}`               | Document uploaded  | PostHog     |
| supplier_banking_updated    | `{companyId, currency}`                         | Banking saved      | PostHog     |
| supplier_rating_viewed      | `{companyId, overallScore, tier}`               | Ratings page       | PostHog     |
| supplier_login              | `{companyId, userId}`                           | Login              | PostHog     |

---

## 14. Accessibility Requirements

- Data tables: `<table>` with `<caption>`, `scope="col"`/`scope="row"`, `aria-sort` on sortable columns
- PO kanban: `role="list"` per column, cards `role="listitem"`, drag `aria-grabbed`
- Status badges: `role="status"`, color + text indicator, icon for color-blind users
- Dashboard metrics: `aria-live="polite"` for auto-updating values
- Delivery calendar: `role="grid"`, date cells `role="gridcell"`, `aria-label="June 20, 2025 — 2 deliveries"`
- File upload: `role="button"`, keyboard accessible, progress `role="progressbar"`
- Signature pad: `aria-label="Sign here"`, keyboard fallback text input
- Form validation: `aria-invalid="true"`, error messages with `aria-describedby`
- Modal dialogs: Focus trap, `aria-modal="true"`, Escape to close
- Pagination: `nav aria-label="Pagination"`, `aria-current="page"`
- Charts (gauge, bar, line): `role="img"`, `aria-label` with data summary, data table fallback
- Invoice amount: `aria-label="Total amount: $45,230.00"`
- Collaboration: Real-time updates announced via `aria-live="polite"` region
- Skip navigation: "Skip to main content" link
- Reduced motion: Respect `prefers-reduced-motion`, disable gauge animation, card transitions
- Focus management: On detail panel open, focus on panel heading; on close, return to trigger

---

## 15. Error & Edge Case Catalog

| Error Code | Condition                    | HTTP Status | System Response       | User Message                                                                         | Recovery Action         |
| ---------- | ---------------------------- | ----------- | --------------------- | ------------------------------------------------------------------------------------ | ----------------------- |
| SUP-001    | PO not found                 | 404         | Check existence       | "Purchase order not found."                                                          | Go to orders list       |
| SUP-002    | PO not in confirmable status | 400         | Status check          | "This PO cannot be confirmed in its current state."                                  | Refresh status          |
| SUP-003    | PO already confirmed         | 409         | Duplicate action      | "This PO has already been confirmed."                                                | View PO detail          |
| SUP-004    | Delivery schedule conflict   | 409         | Date check            | "A delivery is already scheduled for this time and location."                        | Choose different slot   |
| SUP-005    | Delivery status invalid      | 400         | Transition check      | "Invalid status change from '{current}' to '{requested}'."                           | Valid transitions shown |
| SUP-006    | Invoice number duplicate     | 409         | Company+number unique | "Invoice number {number} already exists for your company."                           | Use unique number       |
| SUP-007    | Invoice PO mismatch          | 400         | Amount validation     | "Invoice total exceeds PO amount by more than 10%."                                  | Adjust or add note      |
| SUP-008    | Invoice not editable         | 400         | Status check          | "Invoice cannot be edited after submission."                                         | Contact accounting      |
| SUP-009    | Document expired             | 400         | Expiry check          | "Your insurance certificate has expired. Upload a new one to continue."              | Upload document         |
| SUP-010    | Document type required       | 400         | Missing required      | "Business license is required before receiving new POs."                             | Upload required doc     |
| SUP-011    | Banking verification pending | 403         | Verification flag     | "Banking details are pending verification. Payouts will be processed once verified." | Wait or contact         |
| SUP-012    | File too large               | 413         | Size check            | "Document exceeds 10MB limit."                                                       | Compress or split       |
| SUP-013    | File type not accepted       | 400         | MIME check            | "Accepted formats: PDF, JPG, PNG, DOCX."                                             | Convert file            |
| SUP-014    | Account suspended            | 403         | Status check          | "Your account has been suspended. Contact procurement for details."                  | Show support contact    |
| SUP-015    | Rate limit exceeded          | 429         | Throttle              | "Too many requests. Please wait before retrying."                                    | Retry after shown time  |
| SUP-016    | Session expired              | 401         | JWT check             | "Session expired. Please log in again."                                              | Redirect to login       |
| SUP-017    | Network offline              | —           | Connectivity          | "You are offline. Changes saved locally."                                            | Queue and sync          |
| SUP-018    | Rating not found             | 404         | Empty period          | "No rating available for this period."                                               | Check other periods     |
| SUP-019    | Max contacts reached         | 400         | Count check           | "Maximum of 10 contacts per company."                                                | Remove contact first    |
| SUP-020    | Duplicate certification      | 409         | Name+body unique      | "This certification is already recorded."                                            | Edit existing           |
