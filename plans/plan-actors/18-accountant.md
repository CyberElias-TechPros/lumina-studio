# Actor: Accountant

## 1. Identity & Role Definition

- **Actor ID**: `accountant`
- **Display Name**: Accountant
- **Description**: Finance professional responsible for the academy's financial operations including invoicing, billing, accounts payable/receivable, expense management, payroll processing, budgeting, financial reporting, bank reconciliation, and audit compliance. The accountant ensures accurate financial records and regulatory compliance.
- **User Type**: `accountant` in `users.role` enum
- **Auth Level**: Authenticated (JWT), elevated session with financial data encryption
- **Sub-roles**: AP Clerk, AR Clerk, Payroll Specialist, Financial Controller, Auditor (read-only)
- **Scope**: Full access to all financial modules with mandatory audit logging

---

## 2. Primary Goals & Success KPIs

| Goal                                | KPI                            | Measurement                                              |
| ----------------------------------- | ------------------------------ | -------------------------------------------------------- |
| Process invoices within SLA         | Invoice processing time        | Average hours from receipt to approval                   |
| Ensure accurate and timely payments | On-time payment rate           | `payments_made_by_due_date / total_payments * 100`       |
| Reconcile bank statements monthly   | Reconciliation completion rate | `months_reconciled / total_months * 100`                 |
| Maintain accurate budgets           | Budget variance                | `abs(actual - budget) / budget * 100` per department     |
| Generate timely financial reports   | Report delivery SLA            | % of reports delivered by 5th business day of month      |
| Catch discrepancies and fraud       | Audit hit rate                 | `discrepancies_found / total_transactions_audited * 100` |
| Process payroll accurately          | Payroll accuracy rate          | `payrolls_without_errors / total_payrolls * 100`         |

---

## 3. Complete Screen Inventory

### 3.1 Finance Hub (Dashboard)

**Wireframe**: Financial command center with KPIs top row, cash flow sparkline, aging summaries, pending approvals, quick actions.

**UI Fields / Components**:

- `FinanceKPI` — 6 metric cards: `cashBalance` (current), `accountsReceivable` (total outstanding), `accountsPayable` (total owed), `monthlyRevenue` (MTD), `monthlyExpenses` (MTD), `netIncome` (MTD). Each with trend arrow vs last month.
- `CashFlowSparkline` — Mini area chart of daily cash balance over 30 days
- `AgingSummaryCards` — AR aging (0-30/31-60/61-90/90+) and AP aging columns
- `PendingApprovalsWidget` — List: `pendingInvoiceApprovals` (count + total $), `pendingExpenseReports`, `pendingPayrollApprovals`. Each clickable.
- `QuickActionsBar` — [New Invoice], [Record Payment], [Reconcile], [Run Report], [Process Payroll]
- `UpcomingPayments` — List of next 5 payments due: `payee`, `amount`, `dueDate`, `daysUntilDue`
- `BankBalanceSummary` — Connected bank accounts with balances and last sync time
- `AlertBanner` — Overdue AR, un-reconciled months, budget warnings
- `FinancialCalendar` — Month view with period-end close dates, payroll dates, tax deadlines

**Data Bindings**:

- `GET /api/accountant/dashboard` — aggregated financial data
- `GET /api/accountant/dashboard/cash-flow?days=30` — cash flow data points
- `GET /api/accountant/dashboard/pending-counts` — pending action counts

**States**:

- **Loading**: Skeleton KPI cards × 6, chart placeholder
- **Empty — First month**: "Welcome! Start by setting up your chart of accounts and connecting bank feeds."
- **Error**: Dashboard data unavailable with retry, cached last-known-good shown
- **Edge — Month-end close**: Banner "Month-end close in progress — reports are preliminary"
- **Edge — Negative cash balance**: Red alert banner, projected depletion date shown

### 3.2 Invoicing Screen

**Wireframe**: Full invoice lifecycle management: list view, create/edit form, detail view with payment tracking.

**UI Fields / Components**:

- `InvoiceFilterBar` — `status` (all/draft/sent/overdue/paid/cancelled), `type` (receivable/payable), `dateRange`, `customer`/`supplier` dropdown, `search` (invoice number)
- `InvoiceListView` — Table: `invoiceNumber`, `type` badge, `entityName` (customer/supplier), `issueDate`, `dueDate`, `totalAmount`, `balanceDue`, `status` badge, `daysOverdue`
- `InvoiceDetailPanel` — Header: `invoiceNumber`, `status`, `type`. Sections: `EntityInfo` (bill-to/ship-to), `LineItems` (description, qty, rate, amount), `TaxSummary`, `TotalAmount`, `PaymentHistory` (date, method, amount, reference), `Attachments`, `Notes`, `AuditLog`
- `CreateInvoiceForm` — Two types: Receivable (student/client billing) and Payable (from supplier). Fields: `entityId` (typeahead search), `invoiceDate`, `dueDate`, `paymentTerms`, `lineItems` (dynamic rows: description, quantity, unitPrice, taxRate), `notes`, `terms`, `attachments`
- `InvoiceTemplateSelector` — Choose from predefined invoice templates
- `BulkInvoiceActions` — Select multiple, batch send/print/export
- `InvoiceTimeline` — Visual milestone: Draft → Sent → Viewed → Paid
- `PaymentRecordingModal` — `amount`, `paymentDate`, `paymentMethod`, `referenceNumber`, `notes`

**Data Bindings**:

- `GET /api/accountant/invoices?page=1&limit=25&status=overdue&type=receivable`
- `GET /api/accountant/invoices/:id` — full detail
- `POST /api/accountant/invoices` — create invoice
- `PATCH /api/accountant/invoices/:id` — update (draft only)
- `DELETE /api/accountant/invoices/:id` — delete (draft only)
- `POST /api/accountant/invoices/:id/send` — send to customer
- `POST /api/accountant/invoices/:id/record-payment` — record payment
- `POST /api/accountant/invoices/:id/credit-note` — issue credit note
- `POST /api/accountant/invoices/:id/reminder` — send payment reminder
- `GET /api/accountant/invoices/:id/pdf` — download PDF
- `POST /api/accountant/invoices/bulk-action` — batch operations

**States**:

- **Loading**: Table skeleton (10 rows)
- **Empty**: "No invoices found. Create your first invoice to get started."
- **Error**: "Invoices failed to load" with retry
- **Edge — Overdue 90+ days**: Red highlight, "Send to Collections" action button
- **Edge — Invoice with credit note**: Shows "Partially Credited" or "Fully Credited" status
- **Edge — Recurring invoice**: Badge "Recurring", shows next invoice date

### 3.3 Billing / Accounts Payable Screen

**Wireframe**: AP-specific dashboard with aging, unpaid bills, payment scheduling, and batch payment processing.

**UI Fields / Components**:

- `APAgingSummary` — Summary bar: current, 1-30, 31-60, 61-90, 90+ buckets
- `APBillList` — Table: `supplierName`, `invoiceNumber`, `billDate`, `dueDate`, `amount`, `agingBucket`, `status` (unpaid/approved/scheduled/paid/overdue)
- `BillDetailPanel` — Supplier info, PO reference, line items, payment schedule, holds
- `PaymentScheduler` — Select bills → schedule payment date → payment method → batch submission
- `BatchPaymentModal` — Select multiple bills, choose payment method (ACH/wire/check), set payment date, submit for approval
- `PaymentMethodsConfig` — Bank accounts configured for AP disbursements
- `SupplierCreditTerms` — Table of supplier payment terms, credit limits, early payment discounts
- `PaymentRunHistory` — Table of past payment runs: `runDate`, `batchTotal`, `invoiceCount`, `status`, `approvedBy`

**Data Bindings**:

- `GET /api/accountant/ap/bills?page=1&limit=20&aging=over90&supplier=xxx`
- `GET /api/accountant/ap/bills/:id` — bill detail
- `POST /api/accountant/ap/payment-run` — create payment run
- `POST /api/accountant/ap/payment-run/:id/approve` — approve run
- `POST /api/accountant/ap/payment-run/:id/execute` — execute payments
- `GET /api/accountant/ap/aging` — aging summary
- `PATCH /api/accountant/ap/bills/:id/hold` — place/remove hold

**States**:

- **Loading**: Aging skeleton + list skeleton
- **Empty — No bills**: "No outstanding bills. All caught up!"
- **Error**: "AP data unavailable" with retry
- **Edge — Supplier on hold**: Warning icon, "Payment on hold — contact procurement"
- **Edge — Early payment discount available**: Green highlight, "Pay by {date} to save ${amount}"

### 3.4 Payments Screen

**Wireframe**: Central payment registry showing all outbound and inbound payments with reconciliation status.

**UI Fields / Components**:

- `PaymentFilterBar` — `direction` (inbound/outbound), `status` (pending/cleared/failed/returned), `dateRange`, `method` (cash/check/ACH/wire/credit_card/PayPal)
- `PaymentList` — Table: `paymentDate`, `direction` arrow icon, `entityName`, `amount`, `method`, `reference`, `status` badge, `reconciliationStatus` (unreconciled/partially/fully)
- `PaymentDetail` — `paymentId`, `relatedInvoice`, `payer/payee`, `amount`, `method`, `transactionId` (bank reference), `bankAccount`, `clearedDate`, `reconciliationEntries`
- `ReconciliationAction` — "Match to Invoice" / "Match to Bank Transaction" buttons
- `PaymentUpload` — Upload bank statement CSV/OFX for auto-matching
- `FailedPaymentAlert` — Red card with failure reason, retry/cancel options

**Data Bindings**:

- `GET /api/accountant/payments?page=1&limit=20&direction=outbound&status=cleared`
- `GET /api/accountant/payments/:id` — payment detail
- `POST /api/accountant/payments/:id/reconcile` — reconcile payment
- `POST /api/accountant/payments/:id/retry` — retry failed payment
- `POST /api/accountant/payments/upload-statement` — upload bank file
- `POST /api/accountant/payments/bank-transactions` — list fetched bank transactions

**States**:

- **Loading**: Payment list skeleton
- **Empty**: "No payments recorded yet."
- **Error**: "Payments data unavailable"
- **Edge — Payment returned (NSF)**: Red badge "Returned — NSF", auto-create receivable
- **Edge — Unmatched payment**: Tagged "Unidentified — needs review"
- **Edge — Duplicate payment suspected**: Warning "Similar payment already exists — verify before processing"

### 3.5 Expenses Screen

**Wireframe**: Employee expense report management with submission, approval workflow, and reimbursement processing.

**UI Fields / Components**:

- `ExpenseFilterBar` — `status` (draft/submitted/approved/reimbursed/rejected), `employee`, `category`, `dateRange`, `department`
- `ExpenseReportList` — Table: `reportTitle`, `employeeName`, `submittedDate`, `totalAmount`, `status` badge, `approvalProgress` (1/2 approved), `daysPending`
- `ExpenseReportDetail` — Header: report info, submitter, status. Sections: `LineItems` (date, category, description, amount, receipt image), `Approvals` (approver, status, date, comment), `Reimbursement` (payment method, date, reference)
- `ExpenseCategoryManagement` — Configurable categories: travel, meals, supplies, equipment, training, mileage, other
- `ExpensePolicyRules` — Display of per-category limits, required approvals, documentation requirements
- `ReceiptViewer` — Image viewer for uploaded receipts with zoom, rotate
- `ExpenseAnalytics` — Charts: spending by category, by department, by employee (monthly)
- `ReimbursementBatch` — Select approved reports → process reimbursement in batch

**Data Bindings**:

- `GET /api/accountant/expenses?page=1&limit=20&status=submitted&department=engineering`
- `GET /api/accountant/expenses/:id` — report detail
- `PATCH /api/accountant/expenses/:id/approve` — approve report
- `PATCH /api/accountant/expenses/:id/reject` — reject with reason
- `POST /api/accountant/expenses/batch-reimburse` — batch reimbursement
- `GET /api/accountant/expenses/analytics` — expense analytics data
- `GET /api/accountant/expenses/categories` — category list

**States**:

- **Loading**: Report list skeleton
- **Empty**: "No expense reports pending review."
- **Error**: "Expenses data unavailable"
- **Edge — Missing receipt**: Report flagged "Missing receipt — policy violation"
- **Edge — Over policy limit**: Red highlighted amount, "Exceeds {category} limit of ${limit}"
- **Edge — Duplicate expense**: Warning "Expense appears on another report"

### 3.6 Payroll Screen

**Wireframe**: Payroll processing center with employee compensation management, pay runs, and compliance reporting.

**UI Fields / Components**:

- `PayrollPeriodSelector` — Period dropdown: current/previous/next month, custom range
- `PayrollSummary` — Total payroll this period: `grossPay`, `deductions`, `netPay`, `employerTaxes`, `employeeCount`
- `EmployeePayList` — Table: `employeeName`, `department`, `payType` (salary/hourly), `basePay`, `hours` (if hourly), `overtime`, `bonuses`, `deductions`, `netPay`, `status` (pending/calculated/approved/paid)
- `EmployeeCompensationDetail` — Modal/panel: `baseSalary`/`hourlyRate`, `payFrequency`, `taxWithholdings`, `deductions` (benefits, retirement, garnishments), `ytdEarnings`, `ytdTaxes`, `directDepositInfo`
- `PayrollCalculator` — Auto-calculate all employees for the period, flag exceptions
- `PayrollApprovalWorkflow` — Calculated → Reviewed → Approved → Processed
- `PayRunExecution` — Submit approved payroll to payment system (ACH file generation)
- `PayrollTaxSummary` — Tax liabilities this period: federal, state, FICA, Medicare, FUTA, SUTA
- `YearToDateReport` — YTD earnings, deductions, taxes per employee
- `PayrollHistory` — Past pay runs with total amounts, dates, statuses
- `ComplianceDocuments` — W-2, 1099, pay stubs generation

**Data Bindings**:

- `GET /api/accountant/payroll/periods?year=2025` — list of pay periods
- `GET /api/accountant/payroll/period/:id` — payroll period detail
- `POST /api/accountant/payroll/calculate` — calculate period payroll
- `POST /api/accountant/payroll/approve` — approve calculated payroll
- `POST /api/accountant/payroll/process` — execute payroll
- `GET /api/accountant/payroll/employees` — employee compensation list
- `PATCH /api/accountant/payroll/employees/:id` — update comp details
- `GET /api/accountant/payroll/tax-summary` — tax liability summary
- `GET /api/accountant/payroll/ytd` — year-to-date by employee
- `POST /api/accountant/payroll/generate-paystubs` — generate pay stubs
- `GET /api/accountant/payroll/history?page=1&limit=12`

**States**:

- **Loading**: Summary skeleton + employee list skeleton
- **Empty — No pay period**: "Configure payroll periods to get started."
- **Empty — No employees in payroll**: "No active employees in this period."
- **Error**: "Payroll data unavailable"
- **Edge — Missing time data**: Warning "X employees missing timesheet data — estimated"
- **Edge — Overtime threshold exceeded**: Flag "Employee OT exceeds 20% of base — review"
- **Edge — Negative net pay**: Impossible state — must override with reason
- **Edge — Year-end processing**: Banner "Processing W-2s — verify year-to-date totals"

### 3.7 Budgets Screen

**Wireframe**: Budget creation, management, and tracking against actuals with variance analysis.

**UI Fields / Components**:

- `BudgetPeriodSelector` — Fiscal year dropdown, period type (monthly/quarterly/annual)
- `BudgetOverview` — Summary: `totalBudget`, `totalActual`, `totalVariance`, `variancePercent`
- `BudgetByDepartment` — Expandable tree: departments → account categories → line items
- `BudgetLineItemList` — Table per department: `accountCode`, `accountName`, `budgetAmount`, `actualAmount`, `encumberedAmount`, `availableBalance`, `variance`, `variancePercent`, status bar
- `BudgetCreationWizard` — Step 1: Select department/account structure. Step 2: Enter amounts (manual or based on prior year). Step 3: Add notes. Step 4: Review & submit.
- `BudgetAmendmentForm` — `lineItemId`, `requestedChange` (±$), `reason`, `effectiveDate`
- `BudgetVsActualChart` — Bar chart: budget vs actual by month for selected department
- `BudgetAlertConfig` — Configure threshold alerts (e.g., warn at 80% spend, critical at 95%)
- `BudgetRolloverConfig` — Settings for rollover of unspent budget to next period
- `BudgetApprovalFlow` — Draft → Department Head → Finance → Approved

**Data Bindings**:

- `GET /api/accountant/budgets?fiscalYear=2025`
- `GET /api/accountant/budgets/:id` — budget detail with line items
- `POST /api/accountant/budgets` — create budget
- `PATCH /api/accountant/budgets/:id/line-items` — update line items
- `POST /api/accountant/budgets/:id/amend` — submit amendment
- `PATCH /api/accountant/budgets/:id/approve` — approve budget
- `GET /api/accountant/budgets/:id/vs-actual` — budget vs actual data
- `GET /api/accountant/budgets/alerts` — active budget alerts
- `PATCH /api/accountant/budgets/alerts/:id/config` — update alert config

**States**:

- **Loading**: Budget tree skeleton
- **Empty — No budget**: "No budgets created for this fiscal year." with "Create Budget" CTA
- **Error**: "Budget data unavailable"
- **Edge — Overspent line item**: Red bar, "Over budget by ${amount} ({percent}%)"
- **Edge — Budget at 90%+**: Orange/amber bar, alert triggered
- **Edge — Budget amendment pending**: "Amendment pending approval — amounts are provisional"
- **Edge — Prior year comparison available**: Show "(+/- X% vs FY2024)" on each line

### 3.8 Reports Screen

**Wireframe**: Financial report center with pre-built reports (P&L, Balance Sheet, Cash Flow) and custom report builder.

**UI Fields / Components**:

- `ReportTypeSelector` — Grid of report cards: `ProfitAndLoss`, `BalanceSheet`, `CashFlowStatement`, `AccountsReceivableAging`, `AccountsPayableAging`, `BudgetVsActual`, `TrialBalance`, `GeneralLedger`, `TaxSummary`, `CustomReport`
- `DateRangeSelector` — Pre-sets: This Month, This Quarter, This Year, Custom Range
- `ComparisonPeriod` — Toggle: vs previous period, vs previous year
- `ReportViewer` — Full report display with expandable sections, totals, subtotals
- `ReportFilterPanel` — Filters per report: `department`, `accountType`, `costCenter`, `project`
- `ExportOptions` — Download buttons: PDF, Excel (XLSX), CSV
- `ReportScheduler` — Schedule recurring reports: `frequency` (daily/weekly/monthly), `recipients` (email list), `format`
- `CustomReportBuilder` — Drag-and-drop: select accounts, periods, columns, grouping, sorting
- `ReportHistory` — Previously generated reports with timestamps
- `PrintLayoutToggle` — Screen view vs print layout preview
- `ReportNotesSection` — Add notes/commentary to reports for distribution

**Report Details**:

- **P&L**: Revenue (tuition, grants, donations, other) − COGS = Gross Profit − Operating Expenses (salaries, facilities, technology, marketing, admin) = Operating Income ± Other Income/Expenses = Net Income
- **Balance Sheet**: Assets (Current: cash, AR, prepaids; Fixed: equipment, buildings; Intangible) = Liabilities (Current: AP, accrued expenses; Long-term: loans) + Equity (retained earnings, net income)
- **Cash Flow**: Operating Activities ± Investing Activities ± Financing Activities = Net Cash Change

**Data Bindings**:

- `GET /api/accountant/reports/available` — available report types
- `POST /api/accountant/reports/generate` — generate report with params
- `GET /api/accountant/reports/:id` — get generated report data
- `GET /api/accountant/reports/:id/export?format=pdf` — export URL
- `POST /api/accountant/reports/schedule` — create schedule
- `GET /api/accountant/reports/scheduled` — list scheduled reports
- `DELETE /api/accountant/reports/scheduled/:id` — remove schedule

**States**:

- **Loading**: Report type grid skeleton
- **Empty — No reports generated**: "Generate your first financial report."
- **Error**: "Report generation failed" with retry
- **Edge — Large data set**: "Report contains {count} rows — export recommended for full view"
- **Edge — Zero revenue month**: Report shows $0.00 revenue with note "No revenue recorded this period"
- **Edge — Negative net income**: Red colored net income line with warning icon

### 3.9 Banking Reconciliation Screen

**Wireframe**: Bank account management with transaction matching, reconciliation progress, and discrepancy resolution.

**UI Fields / Components**:

- `BankAccountList` — Cards for each connected bank account: `bankName`, `accountNumber` (masked), `currentBalance`, `asOfDate`, `lastReconciledDate`, `unreconciledCount`
- `ReconciliationWorkspace` — Split view: Left = Bank Statement transactions, Right = System transactions. Middle = Match zone.
- `BankTransactionList` — Table: `date`, `description`, `debit`, `credit`, `reference`, `matchedStatus`
- `SystemTransactionList` — Table: `date`, `description`, `amount`, `type`, `source`, `matchedStatus`
- `MatchSuggestionEngine` — Auto-suggested matches with confidence score, 1-click match
- `ManualMatchModal` — Select bank tx + system tx + confirm match
- `UnmatchedTransactionPanel` — List of unmatched items from both sides
- `DiscrepancyForm` — Create adjustment entry for differences (bank fees, interest, errors)
- `ReconciliationProgress` — Progress bar: "75% matched — ${unmatchedCount} remaining"
- `ReconciliationSummary` — Starting balance, additions, subtractions, ending balance, difference
- `BankStatementUpload` — Upload CSV/OFX/QBO statement files
- `StatementHistory` — Past reconciliation periods with status (balanced/unbalanced)

**Data Bindings**:

- `GET /api/accountant/banking/accounts` — connected accounts
- `POST /api/accountant/banking/accounts` — connect new account (Plaid/Stripe)
- `GET /api/accountant/banking/accounts/:id/transactions?page=1&limit=50`
- `POST /api/accountant/banking/accounts/:id/upload-statement` — upload statement
- `POST /api/accountant/banking/accounts/:id/reconcile` — start reconciliation
- `POST /api/accountant/banking/accounts/:id/match` — match transactions
- `POST /api/accountant/banking/accounts/:id/unmatch` — unmatch
- `POST /api/accountant/banking/accounts/:id/adjust` — create adjustment
- `POST /api/accountant/banking/accounts/:id/complete-reconciliation` — finalize
- `GET /api/accountant/banking/reconciliation-history`

**States**:

- **Loading**: Bank account skeletons
- **Empty — No accounts**: "Connect your first bank account using Plaid or manual setup."
- **Empty — No unreconciled transactions**: "All transactions are reconciled. Great job!"
- **Error**: "Bank data unavailable — check your connection"
- **Edge — Difference doesn't match**: Warning "Out of balance by ${amount} — find the discrepancy"
- **Edge — Duplicate transaction**: Suspected duplicate detected with "Ignore" or "Unmatch" options
- **Edge — Very old unreconciled items**: "X items from {date} remain unreconciled"
- **Edge — Bank feed disconnected**: "Bank feed last synced {date} ago — reconnect"

### 3.10 Audit Log Screen

**Wireframe**: Immutable audit trail of all financial transactions with search, filter, and export.

**UI Fields / Components**:

- `AuditLogSearch` — Full-text search across all audit entries
- `AuditLogFilter` — `action` (create/update/delete/approve/reject), `entityType` (invoice/payment/budget/expense/payroll), `userId`, `dateRange`, `ipAddress`
- `AuditLogTable` — Columns: `timestamp`, `userId` + `userName`, `action`, `entityType`, `entityId`, `entityReference`, `details` (changed fields), `ipAddress`, `userAgent`
- `AuditLogDetail` — Expanded view showing before/after values for changes
- `AuditExportButton` — Export filtered log to CSV/PDF
- `AuditRetentionBanner` — "Logs retained for 7 years per regulatory requirements"
- `IntegrityCheckBadge` — "Log integrity verified" with last verification timestamp
- `RealTimeMonitor` — Live feed of critical actions: payments, payroll, journal entries

**Data Bindings**:

- `GET /api/accountant/audit-log?page=1&limit=50&action=delete&entityType=invoice&startDate=2025-01-01`
- `GET /api/accountant/audit-log/:id` — detail with field changes
- `POST /api/accountant/audit-log/export` — export filtered results
- `GET /api/accountant/audit-log/verify-integrity` — check log hash chain

**States**:

- **Loading**: Table skeleton
- **Empty — No results**: "No audit log entries match your filters."
- **Error**: "Audit log unavailable" with retry
- **Edge — 100K+ entries**: "Showing 1-50 of 124,523 entries — narrow your search for faster results"
- **Edge — Tamper detected**: CRITICAL alert "Audit log integrity check failed — contact IT security immediately"

---

## 4. Full Database Schema

```typescript
// ---- drizzle/schema/accountant.ts ----

import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./users";

// ──────────────────────────────────────────────
// CHART OF ACCOUNTS
// ──────────────────────────────────────────────
export const chartOfAccounts = sqliteTable("chart_of_accounts", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  accountCode: text("account_code").notNull().unique(),
  accountName: text("account_name").notNull(),
  accountType: text("account_type", {
    enum: ["asset", "liability", "equity", "revenue", "expense", "contra_asset", "contra_revenue"],
  }).notNull(),
  accountSubType: text("account_sub_type"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  isControlAccount: integer("is_control_account", { mode: "boolean" }).notNull().default(false),
  parentId: text("parent_id"),
  normalBalance: text("normal_balance", { enum: ["debit", "credit"] }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  description: text("description"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// GENERAL LEDGER ENTRIES
// ──────────────────────────────────────────────
export const generalLedger = sqliteTable("general_ledger", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  entryDate: text("entry_date").notNull(),
  accountId: text("account_id")
    .notNull()
    .references(() => chartOfAccounts.id),
  debitAmount: real("debit_amount").notNull().default(0),
  creditAmount: real("credit_amount").notNull().default(0),
  description: text("description"),
  referenceType: text("reference_type", {
    enum: ["invoice", "payment", "expense", "payroll", "journal", "reconciliation", "budget"],
  }),
  referenceId: text("reference_id"),
  journalEntryId: text("journal_entry_id"),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const journalEntries = sqliteTable("journal_entries", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  journalNumber: text("journal_number").notNull().unique(),
  entryDate: text("entry_date").notNull(),
  description: text("description").notNull(),
  totalDebit: real("total_debit").notNull(),
  totalCredit: real("total_credit").notNull(),
  status: text("status", { enum: ["draft", "posted", "reversed"] })
    .notNull()
    .default("draft"),
  postedBy: text("posted_by").references(() => users.id),
  postedAt: text("posted_at"),
  reversedById: text("reversed_by_id").references(() => users.id),
  reversedAt: text("reversed_at"),
  reversalReason: text("reversal_reason"),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// INVOICES (receivable)
// ──────────────────────────────────────────────
export const invoices = sqliteTable("invoices", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  invoiceNumber: text("invoice_number").notNull().unique(),
  type: text("type", { enum: ["receivable", "payable"] }).notNull(),
  entityId: text("entity_id"), // customer or supplier ID
  entityName: text("entity_name").notNull(),
  entityAddress: text("entity_address"),
  entityTaxId: text("entity_tax_id"),
  invoiceDate: text("invoice_date").notNull(),
  dueDate: text("due_date").notNull(),
  paymentTerms: text("payment_terms"),
  poNumber: text("po_number"),
  subtotal: real("subtotal").notNull(),
  taxRate: real("tax_rate").notNull().default(0),
  taxAmount: real("tax_amount").notNull().default(0),
  totalAmount: real("total_amount").notNull(),
  amountPaid: real("amount_paid").notNull().default(0),
  balanceDue: real("balance_due").notNull(),
  currency: text("currency").notNull().default("USD"),
  status: text("status", {
    enum: ["draft", "sent", "partial", "paid", "overdue", "cancelled", "credited"],
  })
    .notNull()
    .default("draft"),
  invoicePdfUrl: text("invoice_pdf_url"),
  notes: text("notes"),
  terms: text("terms"),
  recurringSchedule: text("recurring_schedule"), // cron expression
  recurringNextDate: text("recurring_next_date"),
  sentAt: text("sent_at"),
  paidAt: text("paid_at"),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
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
    .references(() => invoices.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  quantity: real("quantity").notNull().default(1),
  unitPrice: real("unit_price").notNull(),
  taxRate: real("tax_rate").notNull().default(0),
  totalAmount: real("total_amount").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const creditNotes = sqliteTable("credit_notes", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  invoiceId: text("invoice_id")
    .notNull()
    .references(() => invoices.id),
  creditNoteNumber: text("credit_note_number").notNull().unique(),
  amount: real("amount").notNull(),
  reason: text("reason").notNull(),
  status: text("status", { enum: ["issued", "applied"] })
    .notNull()
    .default("issued"),
  appliedAt: text("applied_at"),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// PAYMENTS
// ──────────────────────────────────────────────
export const payments = sqliteTable("payments", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  invoiceId: text("invoice_id").references(() => invoices.id),
  direction: text("direction", { enum: ["inbound", "outbound"] }).notNull(),
  amount: real("amount").notNull(),
  currency: text("currency").notNull().default("USD"),
  paymentDate: text("payment_date").notNull(),
  paymentMethod: text("payment_method", {
    enum: [
      "cash",
      "check",
      "ach",
      "wire",
      "credit_card",
      "debit_card",
      "paypal",
      "stripe",
      "bank_transfer",
    ],
  }).notNull(),
  referenceNumber: text("reference_number"),
  transactionId: text("transaction_id"), // bank/provider reference
  bankAccountId: text("bank_account_id"),
  status: text("status", { enum: ["pending", "cleared", "failed", "returned", "cancelled"] })
    .notNull()
    .default("pending"),
  failureReason: text("failure_reason"),
  reconciliationStatus: text("reconciliation_status", {
    enum: ["unreconciled", "partially", "fully"],
  })
    .notNull()
    .default("unreconciled"),
  reconciledAt: text("reconciled_at"),
  notes: text("notes"),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// EXPENSE REPORTS
// ──────────────────────────────────────────────
export const expenseReports = sqliteTable("expense_reports", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  employeeId: text("employee_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  submittedDate: text("submitted_date"),
  totalAmount: real("total_amount").notNull().default(0),
  status: text("status", { enum: ["draft", "submitted", "approved", "reimbursed", "rejected"] })
    .notNull()
    .default("draft"),
  approvedById: text("approved_by_id").references(() => users.id),
  approvedAt: text("approved_at"),
  rejectionReason: text("rejection_reason"),
  reimbursementMethod: text("reimbursement_method"),
  reimbursedAt: text("reimbursed_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const expenseLineItems = sqliteTable("expense_line_items", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  reportId: text("report_id")
    .notNull()
    .references(() => expenseReports.id, { onDelete: "cascade" }),
  expenseDate: text("expense_date").notNull(),
  category: text("category", {
    enum: ["travel", "meals", "supplies", "equipment", "training", "mileage", "other"],
  }).notNull(),
  description: text("description").notNull(),
  amount: real("amount").notNull(),
  receiptUrl: text("receipt_url"),
  isBillable: integer("is_billable", { mode: "boolean" }).notNull().default(false),
  policyFlag: text("policy_flag"), // null if ok, otherwise reason
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// PAYROLL
// ──────────────────────────────────────────────
export const payrollPeriods = sqliteTable("payroll_periods", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  periodName: text("period_name").notNull(), // e.g., "July 2025 Semi-Monthly 1"
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  payDate: text("pay_date").notNull(),
  frequency: text("frequency", {
    enum: ["weekly", "biweekly", "semi_monthly", "monthly"],
  }).notNull(),
  status: text("status", { enum: ["open", "calculated", "approved", "processed", "closed"] })
    .notNull()
    .default("open"),
  totalGrossPay: real("total_gross_pay").notNull().default(0),
  totalDeductions: real("total_deductions").notNull().default(0),
  totalNetPay: real("total_net_pay").notNull().default(0),
  totalEmployerTaxes: real("total_employer_taxes").notNull().default(0),
  employeeCount: integer("employee_count").notNull().default(0),
  approvedBy: text("approved_by").references(() => users.id),
  approvedAt: text("approved_at"),
  processedAt: text("processed_at"),
  achFileUrl: text("ach_file_url"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const payrollEntries = sqliteTable("payroll_entries", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  periodId: text("period_id")
    .notNull()
    .references(() => payrollPeriods.id, { onDelete: "cascade" }),
  employeeId: text("employee_id")
    .notNull()
    .references(() => users.id),
  payType: text("pay_type", { enum: ["salary", "hourly", "commission"] }).notNull(),
  basePay: real("base_pay").notNull(),
  hoursWorked: real("hours_worked"),
  overtimeHours: real("overtime_hours").default(0),
  overtimePay: real("overtime_pay").default(0),
  bonuses: real("bonuses").default(0),
  commissions: real("commissions").default(0),
  grossPay: real("gross_pay").notNull(),
  deductions: real("deductions").notNull().default(0),
  netPay: real("net_pay").notNull(),
  employerTaxes: real("employer_taxes").notNull().default(0),
  status: text("status", { enum: ["pending", "calculated", "approved", "paid"] })
    .notNull()
    .default("pending"),
  directDepositAccount: text("direct_deposit_account"),
  payStubUrl: text("pay_stub_url"),
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const employeeCompensation = sqliteTable("employee_compensation", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  employeeId: text("employee_id")
    .notNull()
    .unique()
    .references(() => users.id),
  payType: text("pay_type", { enum: ["salary", "hourly"] }).notNull(),
  baseSalary: real("base_salary"),
  hourlyRate: real("hourly_rate"),
  payFrequency: text("pay_frequency", {
    enum: ["weekly", "biweekly", "semi_monthly", "monthly"],
  }).notNull(),
  federalWithholding: text("federal_withholding"), // JSON: filingStatus, allowances, extraWithholding
  stateWithholding: text("state_withholding"), // JSON
  deductions: text("deductions"), // JSON array: { type, amount, isPreTax }
  directDepositAccounts: text("direct_deposit_accounts"), // JSON array of bank accounts with allocation %
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  effectiveDate: text("effective_date"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// BUDGETS
// ──────────────────────────────────────────────
export const budgets = sqliteTable("budgets", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  fiscalYear: integer("fiscal_year").notNull(),
  departmentId: text("department_id"),
  name: text("name").notNull(),
  totalBudget: real("total_budget").notNull().default(0),
  totalActual: real("total_actual").notNull().default(0),
  totalEncumbered: real("total_encumbered").notNull().default(0),
  status: text("status", { enum: ["draft", "submitted", "approved", "active", "closed"] })
    .notNull()
    .default("draft"),
  version: integer("version").notNull().default(1),
  approvedBy: text("approved_by").references(() => users.id),
  approvedAt: text("approved_at"),
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const budgetLineItems = sqliteTable("budget_line_items", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  budgetId: text("budget_id")
    .notNull()
    .references(() => budgets.id, { onDelete: "cascade" }),
  accountId: text("account_id")
    .notNull()
    .references(() => chartOfAccounts.id),
  budgetAmount: real("budget_amount").notNull().default(0),
  actualAmount: real("actual_amount").notNull().default(0),
  encumberedAmount: real("encumbered_amount").notNull().default(0),
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const budgetAmendments = sqliteTable("budget_amendments", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  budgetId: text("budget_id")
    .notNull()
    .references(() => budgets.id),
  lineItemId: text("line_item_id")
    .notNull()
    .references(() => budgetLineItems.id),
  previousAmount: real("previous_amount").notNull(),
  newAmount: real("new_amount").notNull(),
  reason: text("reason").notNull(),
  status: text("status", { enum: ["pending", "approved", "rejected"] })
    .notNull()
    .default("pending"),
  reviewedBy: text("reviewed_by").references(() => users.id),
  reviewedAt: text("reviewed_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// BANK ACCOUNTS
// ──────────────────────────────────────────────
export const bankAccounts = sqliteTable("bank_accounts", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  bankName: text("bank_name").notNull(),
  accountName: text("account_name").notNull(),
  accountNumber: text("account_number").notNull(), // encrypted
  routingNumber: text("routing_number"), // encrypted
  accountType: text("account_type", {
    enum: ["checking", "savings", "credit_card", "money_market"],
  }).notNull(),
  currency: text("currency").notNull().default("USD"),
  currentBalance: real("current_balance").notNull().default(0),
  asOfDate: text("as_of_date"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  plaidAccessToken: text("plaid_access_token"), // encrypted
  lastSyncedAt: text("last_synced_at"),
  lastReconciledDate: text("last_reconciled_date"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const bankTransactions = sqliteTable("bank_transactions", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  bankAccountId: text("bank_account_id")
    .notNull()
    .references(() => bankAccounts.id, { onDelete: "cascade" }),
  transactionDate: text("transaction_date").notNull(),
  description: text("description").notNull(),
  debitAmount: real("debit_amount").default(0),
  creditAmount: real("credit_amount").default(0),
  reference: text("reference"),
  fitId: text("fit_id"), // bank's unique transaction ID
  reconciliationStatus: text("reconciliation_status", {
    enum: ["unmatched", "matched", "manually_matched", "ignored", "adjustment"],
  })
    .notNull()
    .default("unmatched"),
  matchedTransactionId: text("matched_transaction_id"), // references generalLedger.id
  matchedAt: text("matched_at"),
  importedAt: text("imported_at")
    .notNull()
    .default(sql`current_timestamp`),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

export const reconciliationPeriods = sqliteTable("reconciliation_periods", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  bankAccountId: text("bank_account_id")
    .notNull()
    .references(() => bankAccounts.id),
  periodStart: text("period_start").notNull(),
  periodEnd: text("period_end").notNull(),
  statementBalance: real("statement_balance").notNull(),
  systemBalance: real("system_balance").notNull(),
  difference: real("difference").notNull(),
  status: text("status", { enum: ["in_progress", "balanced", "unbalanced"] })
    .notNull()
    .default("in_progress"),
  completedBy: text("completed_by").references(() => users.id),
  completedAt: text("completed_at"),
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`current_timestamp`),
});

// ──────────────────────────────────────────────
// AUDIT LOG
// ──────────────────────────────────────────────
export const auditLogs = sqliteTable("audit_logs", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  timestamp: text("timestamp")
    .notNull()
    .default(sql`current_timestamp`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  action: text("action", {
    enum: [
      "create",
      "update",
      "delete",
      "view",
      "approve",
      "reject",
      "submit",
      "send",
      "export",
      "login",
      "logout",
    ],
  }).notNull(),
  entityType: text("entity_type", {
    enum: [
      "invoice",
      "payment",
      "expense",
      "payroll",
      "budget",
      "journal",
      "bank_account",
      "reconciliation",
      "report",
      "user",
      "settings",
    ],
  }).notNull(),
  entityId: text("entity_id"),
  entityReference: text("entity_reference"), // human-readable reference
  changes: text("changes"), // JSON: { field: { old, new } }
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  sessionId: text("session_id"),
  hash: text("hash"), // SHA-256 of previous hash + current entry for chain integrity
  previousHash: text("previous_hash"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`current_timestamp`),
});
```

---

## 5. Complete API Contract (Key Endpoints)

```typescript
// GET /api/accountant/dashboard
interface AccountantDashboard {
  kpis: {
    cashBalance: number;
    accountsReceivable: number;
    accountsPayable: number;
    monthlyRevenue: number;
    monthlyExpenses: number;
    netIncome: number;
  };
  cashFlow: Array<{ date: string; balance: number }>;
  arAging: {
    current: number;
    days1to30: number;
    days31to60: number;
    days61to90: number;
    over90: number;
  };
  apAging: {
    current: number;
    days1to30: number;
    days31to60: number;
    days61to90: number;
    over90: number;
  };
  pendingApprovals: { invoices: number; expenses: number; payroll: number };
  upcomingPayments: Array<{ payee: string; amount: number; dueDate: string; daysUntilDue: number }>;
  alerts: Array<{ type: string; message: string }>;
}

// POST /api/accountant/invoices
interface CreateInvoiceRequest {
  type: "receivable" | "payable";
  entityId?: string;
  entityName: string;
  entityAddress?: string;
  entityTaxId?: string;
  invoiceDate: string;
  dueDate: string;
  paymentTerms?: string;
  poNumber?: string;
  lineItems: Array<{ description: string; quantity: number; unitPrice: number; taxRate?: number }>;
  taxRate?: number;
  notes?: string;
  terms?: string;
}

// POST /api/accountant/payments
interface RecordPaymentRequest {
  invoiceId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  referenceNumber?: string;
  notes?: string;
}

// POST /api/accountant/payroll/calculate
interface PayrollCalculateRequest {
  periodId: string;
}
// Response: { periodId: string; totalGross: number; totalNet: number; employeeCount: number; errors: Array<{ employeeId: string; error: string }> }

// POST /api/accountant/payroll/process
interface ProcessPayrollRequest {
  periodId: string;
  approvalNotes?: string;
}
// Response: { status: 'processed'; payDate: string; achFileUrl: string; totalDisbursed: number }

// POST /api/accountant/reports/generate
interface GenerateReportRequest {
  reportType:
    | "pnl"
    | "balance_sheet"
    | "cash_flow"
    | "ar_aging"
    | "ap_aging"
    | "budget_vs_actual"
    | "trial_balance"
    | "general_ledger"
    | "tax_summary";
  startDate: string;
  endDate: string;
  departmentId?: string;
  comparisonPeriod?: "previous_period" | "previous_year";
  format?: "screen" | "pdf" | "xlsx" | "csv";
}
// Response: { reportId: string; downloadUrl: string; generatedAt: string }

// POST /api/accountant/banking/accounts/:id/reconcile
interface StartReconciliationRequest {
  periodStart: string;
  periodEnd: string;
  statementBalance: number;
}
// Response: { reconciliationId: string; unmatchedCount: number; suggestedMatches: Array<{ bankTxId: string; systemTxId: string; confidence: number }> }

// POST /api/accountant/banking/accounts/:id/match
interface MatchTransactionsRequest {
  reconciliationId: string;
  matches: Array<{
    bankTransactionId: string;
    systemTransactionId: string;
    type: "auto" | "manual";
  }>;
}

// GET /api/accountant/audit-log
interface AuditLogQuery {
  page?: number;
  limit?: number;
  action?: string;
  entityType?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}
```

---

## 6. Component Tree (Abbreviated)

```
<AccountantLayout>
  <Sidebar>
    <SidebarNavItem icon="layoutDashboard" label="Finance Hub" href="/accountant" />
    <SidebarNavItem icon="fileText" label="Invoicing" href="/accountant/invoices" badge={pendingCount} />
    <SidebarNavItem icon="creditCard" label="Billing / AP" href="/accountant/ap" />
    <SidebarNavItem icon="dollarSign" label="Payments" href="/accountant/payments" />
    <SidebarNavItem icon="receipt" label="Expenses" href="/accountant/expenses" />
    <SidebarNavItem icon="users" label="Payroll" href="/accountant/payroll" />
    <SidebarNavItem icon="pieChart" label="Budgets" href="/accountant/budgets" />
    <SidebarNavItem icon="barChart" label="Reports" href="/accountant/reports" />
    <SidebarNavItem icon="landmark" label="Banking" href="/accountant/banking" />
    <SidebarNavItem icon="shield" label="Audit Log" href="/accountant/audit" />
  </Sidebar>
  <main>{children}</main>
</AccountantLayout>

<FinancelHub> → kpi cards, sparkline, aging summaries, pending approvals
<InvoicingScreen> → filter bar, table, detail panel, create/edit form
<APScreen> → aging, bills table, payment scheduler, batch payment
<PaymentsScreen> → filter, payment list, reconciliation status
<ExpensesScreen> → filter, report list, detail, analytics
<PayrollScreen> → period selector, employee table, calculator, tax summary
<BudgetsScreen> → period selector, department tree, line items, vs-actual chart
<ReportsScreen> → report type grid, date range, viewer, export, scheduler
<BankingScreen> → account list, reconciliation workspace, match interface, statement upload
<AuditLogScreen> → search, filter, table, detail, export
```

---

## 7. User Journeys (Key)

### Journey 1: Month-End Close — Invoice to Payment

1. Accountant logs in, sees 12 overdue invoices on dashboard
2. Navigates to Invoicing, filters by overdue
3. Selects invoice INV-2025-089 for $45,230 (aged 45 days)
4. Sends payment reminder via email (automated template)
5. Later, customer submits payment — records via RecordPaymentModal
6. Payment matched to invoice, status → "Paid"
7. General ledger automatically updated with debit Cash, credit AR
8. Bank reconciliation later matches this payment to bank statement

### Journey 2: Process Payroll

1. Accountant navigates to Payroll, selects July 2025 Period
2. Clicks "Calculate" → system computes all active employees
3. Reviews employee list: 45 employees, $285K gross, $42K deductions, $243K net
4. Notes 2 employees missing timesheets — estimates based on prior period
5. Clicks "Approve" → enters approval notes, 2FA confirmation
6. Clicks "Process" → ACH file generated, submitted to bank
7. Pay stubs auto-generated and available in employee portal
8. GL entries created: debit Salary Expense, credit Cash

### Journey 3: Bank Reconciliation

1. Accountant navigates to Banking, selects checking account
2. Clicks "Upload Statement" → imports CSV from bank
3. 80 bank transactions loaded, reconciliation workspace opens
4. System auto-matches 72 of 80 (90% confidence)
5. Accountant manually matches 6 more
6. 2 unmatched: bank fee ($12.50) and interest income ($3.20)
7. Creates adjustment entries for these
8. Difference is $0.00 — clicks "Complete Reconciliation"
9. Period marked as balanced, report generated

### Journey 4: Budget vs Actual Analysis

1. Accountant navigates to Budgets, FY2025
2. Sees overall variance: 4.2% overspent
3. Drills into IT Department: Lab Equipment line 15% overspent
4. Reviews actual spend: emergency server replacement
5. Creates budget amendment: transfers $15K from Supplies
6. Amendment sent for approval to department head
7. Generates budget vs actual report for management review

---

## 8. Business Rules Engine

| Rule ID  | Name                             | Condition                                       | Action                                 |
| -------- | -------------------------------- | ----------------------------------------------- | -------------------------------------- |
| ACC-R001 | Debits = Credits                 | Journal entry totalDebit != totalCredit         | Block posting, show difference         |
| ACC-R002 | Invoice overdue                  | dueDate < today() AND status != paid            | Auto-set status overdue, send reminder |
| ACC-R003 | Payment exceeds balance          | payment.amount > invoice.balanceDue             | Warn, allow partial or reject          |
| ACC-R004 | Pay period overlap               | payrollPeriod.dateRange OVERLAPS another period | Block creation                         |
| ACC-R005 | Duplicate invoice number         | invoiceNumber EXISTS                            | Block creation                         |
| ACC-R006 | Budget threshold alert           | actualAmount > budgetAmount * 0.8               | Send alert to budget owner             |
| ACC-R007 | Budget overspent                 | actualAmount > budgetAmount                     | Flag, block further spending           |
| ACC-R008 | Bank reconciliation must balance | systemBalance != statementBalance after match   | Block finalize, show difference        |
| ACC-R009 | Payroll approval required        | totalNetPay > 0 AND NOT approved                | Block processing                       |
| ACC-R010 | Audit log immutability           | hash chain validation                           | Detect tampering, alert                |
| ACC-R011 | Month-end lock                   | date > periodEnd + 5 days                       | Lock period entries, require override  |
| ACC-R012 | Negative cash warning            | cashBalance < minimumRequired                   | Alert, block discretionary spending    |

---

## 9-15. Remaining Sections (Summarized for Length)

**Notifications**: Invoice due/overdue/paid, payment received/sent/failed, expense approved/rejected, payroll processed, budget alert, reconciliation complete, bank feed disconnected, audit integrity alert. Channels: In-app, Email. Priority levels: High for payments/overdue.

**Permissions**: Accountant has full CRUD on all financial entities. AP Clerk: limited to AP/payments. Payroll Specialist: payroll only. Auditor: read-only. Financial Controller: approve/override.

**State Management**: Redux slices per sub-module (invoices, payments, expenses, payroll, budgets, banking, audit). RTK Query with tag invalidation on mutations. Optimistic updates for payment recording, budget edits.

**Zod Schemas**: Invoice creation, payment recording, expense report, payroll calculation, journal entry, budget creation, bank reconciliation, audit log export.

**Analytics**: All financial events tracked (invoice create/send/pay, payment record/fail, payroll process, budget amend, reconcile, report generate, audit export). Destination: PostHog + audit log (immutable).

**Accessibility**: Financial tables with proper ARIA roles, sort indicators, keyboard navigation. Critical amounts announced via aria-live. Charts with data table fallbacks. High contrast for status indicators.

**Error Catalog** (40+): Duplicate invoice number, payment exceeds balance, bank connection lost, reconciliation out of balance, payroll calculation error, budget overspent, audit log tamper detected, report generation timeout, etc. Each with specific HTTP code, system response, user message, recovery action.

### Detailed Error & Edge Case Catalog

| Error Code | Condition                     | HTTP Status | System Response      | User Message                                           | Recovery Action        |
| ---------- | ----------------------------- | ----------- | -------------------- | ------------------------------------------------------ | ---------------------- |
| ACC-001    | Invoice not found             | 404         | Log warning          | "Invoice not found. It may have been deleted."         | Check invoice number   |
| ACC-002    | Duplicate invoice number      | 409         | Unique constraint    | "Invoice number {number} already exists."              | Use different number   |
| ACC-003    | Invoice already paid          | 400         | Status check         | "This invoice has already been paid in full."          | View payment details   |
| ACC-004    | Payment exceeds balance       | 400         | Amount check         | "Payment amount exceeds balance due of ${balance}."    | Adjust amount          |
| ACC-005    | Payment not found             | 404         | Check reference      | "Payment record not found."                            | Verify reference       |
| ACC-006    | Pay period overlapping        | 409         | Date range check     | "Period {name} overlaps with an existing period."      | Adjust dates           |
| ACC-007    | Pay period locked             | 403         | Status >= processed  | "This payroll period is locked for changes."           | Contact admin          |
| ACC-008    | Employee not in payroll       | 404         | Employee check       | "Employee is not active in the payroll system."        | Check employee status  |
| ACC-009    | Budget not found              | 404         | Fiscal year check    | "No budget found for FY2025."                          | Create budget first    |
| ACC-010    | Budget amendment overshoot    | 400         | Available balance    | "Amendment exceeds available budget by ${amount}."     | Reduce amendment       |
| ACC-011    | Budget already approved       | 400         | Status check         | "This budget is already approved."                     | Use amendment process  |
| ACC-012    | Bank account not found        | 404         | Account lookup       | "Bank account not found."                              | Check account ID       |
| ACC-013    | Bank feed disconnected        | 503         | Plaid status         | "Bank feed disconnected. Please reconnect."            | Reconnect via Plaid    |
| ACC-014    | Statement already imported    | 409         | Period+account check | "Statement for this period already imported."          | View reconciliation    |
| ACC-015    | Reconciliation out of balance | 400         | Difference != 0      | "Out of balance by ${amount}. Find the discrepancy."   | Review unmatched items |
| ACC-016    | Journal entry unbalanced      | 400         | Debit != Credit      | "Debits (${debit}) do not equal credits (${credit})."  | Balance the entry      |
| ACC-017    | Journal posted, cannot edit   | 400         | Status check         | "Cannot edit a posted journal entry."                  | Create reversing entry |
| ACC-018    | Report generation timeout     | 504         | Large dataset        | "Report too large to display. Download as Excel."      | Export instead         |
| ACC-019    | Report not found              | 404         | Expired cleanup      | "Report has been deleted or expired."                  | Regenerate report      |
| ACC-020    | Audit log tamper detected     | 500         | Hash mismatch        | "CRITICAL: Audit log integrity compromised."           | Contact IT security    |
| ACC-021    | Audit export too large        | 413         | Row count            | "Too many records to export. Narrow your filter."      | Add date range filter  |
| ACC-022    | Currency mismatch             | 400         | Currency check       | "Invoice currency does not match payment currency."    | Use same currency      |
| ACC-023    | Exchange rate not found       | 404         | Rate lookup          | "Exchange rate for {from}/{to} not available."         | Enter manually         |
| ACC-024    | Negative amount not allowed   | 400         | Amount validation    | "Amount cannot be negative."                           | Correct value          |
| ACC-025    | Session expired               | 401         | JWT check            | "Session expired. Please log in again."                | Redirect to login      |
| ACC-026    | Network offline               | —           | Connectivity         | "You are offline. Changes will sync when reconnected." | Queue changes locally  |
| ACC-027    | Data export failed            | 500         | Generation error     | "Failed to generate export. Try again later."          | Retry export           |
| ACC-028    | GL entry missing account      | 400         | Account validation   | "Each entry must have a valid account code."           | Add account            |
| ACC-029    | Fiscal year closed            | 403         | Year check           | "This fiscal year is closed for new entries."          | Open next year         |
| ACC-030    | Approval required (2FA)       | 403         | Security policy      | "High-value transaction requires 2FA approval."        | Complete 2FA prompt    |

### Notification Specifications (Complete)

| Notification                | Trigger                        | Channel                      | Template Variables                                       | Delivery Rules                  |
| --------------------------- | ------------------------------ | ---------------------------- | -------------------------------------------------------- | ------------------------------- |
| Invoice overdue             | dueDate passed, unpaid         | In-app, Email                | `{invoiceNumber}, {entityName}, {amount}, {daysOverdue}` | Daily for first 7d, then weekly |
| Invoice paid                | Payment recorded               | In-app, Email                | `{invoiceNumber}, {amount}, {paymentRef}`                | Immediate                       |
| Payment received            | Inbound payment                | In-app                       | `{entityName}, {amount}`                                 | Immediate                       |
| Payment failed              | Outbound payment failed        | In-app, Email, Push          | `{payeeName}, {amount}, {failureReason}`                 | Immediate                       |
| Payment returned (NSF)      | Bank returns payment           | In-app, Email                | `{entityName}, {amount}`                                 | Immediate                       |
| Expense approved            | Report approved                | In-app, Email                | `{employeeName}, {amount}`                               | Immediate                       |
| Expense rejected            | Report rejected                | In-app, Email                | `{employeeName}, {amount}, {reason}`                     | Immediate                       |
| Payroll processed           | Pay run completed              | In-app, Email                | `{periodName}, {totalAmount}, {payDate}`                 | Immediate                       |
| Payroll approval needed     | Payroll calculated, unapproved | In-app, Email                | `{periodName}, {totalNetPay}`                            | Immediate                       |
| Budget threshold warning    | Spend > 80%                    | In-app, Email                | `{department}, {accountName}, {percentUsed}`             | Once per threshold              |
| Budget overspent            | Spend > 100%                   | In-app, Email, Push          | `{department}, {accountName}, {overspentAmount}`         | Immediate                       |
| Reconciliation complete     | Period reconciled              | In-app                       | `{accountName}, {period}`                                | Immediate                       |
| Reconciliation unbalanced   | Difference > 0                 | In-app, Email                | `{accountName}, {difference}`                            | Immediate                       |
| Bank feed disconnected      | Plaid token expired            | In-app, Email, Push          | `{accountName}`                                          | Immediate                       |
| Month-end close reminder    | 5 days before close            | In-app, Email                | `{period}`                                               | 5d, 3d, 1d before               |
| Audit integrity alert       | Hash chain broken              | In-app, Email, Push (urgent) | `{lastVerifiedTimestamp}`                                | Immediate, escalate             |
| Report scheduled ready      | Recurring report gen           | Email                        | `{reportName}, {period}`                                 | Per schedule                    |
| Journal posted successfully | Entry posted                   | In-app                       | `{journalNumber}, {totalAmount}`                         | Immediate                       |

### Complete Permission Matrix

| Entity                | Operation            | Accountant | AP Clerk | Payroll Spec | Auditor | Controller | Admin |
| --------------------- | -------------------- | ---------- | -------- | ------------ | ------- | ---------- | ----- |
| Invoices (Receivable) | Create               | ✓          | ✓        | ✗            | ✗       | ✓          | ✓     |
| Invoices (Receivable) | Read                 | ✓          | ✓        | ✗            | ✓       | ✓          | ✓     |
| Invoices (Receivable) | Update               | ✓          | ✓        | ✗            | ✗       | ✓          | ✓     |
| Invoices (Receivable) | Delete (draft)       | ✓          | ✓        | ✗            | ✗       | ✓          | ✓     |
| Invoices (Receivable) | Send                 | ✓          | ✓        | ✗            | ✗       | ✓          | ✓     |
| Invoices (Receivable) | Record Payment       | ✓          | ✓        | ✗            | ✗       | ✓          | ✓     |
| Invoices (Receivable) | Credit Note          | ✓          | ✗        | ✗            | ✗       | ✓          | ✓     |
| AP Bills              | Create               | ✓          | ✓        | ✗            | ✗       | ✓          | ✓     |
| AP Bills              | Approve Payment      | ✓          | ✗        | ✗            | ✗       | ✓          | ✓     |
| AP Bills              | Hold/Unhold          | ✓          | ✓        | ✗            | ✗       | ✓          | ✓     |
| Payments              | Record               | ✓          | ✓        | ✗            | ✗       | ✓          | ✓     |
| Payments              | Approve (high value) | ✓          | ✗        | ✗            | ✗       | ✓          | ✓     |
| Payments              | Reconcile            | ✓          | ✗        | ✗            | ✗       | ✓          | ✓     |
| Expenses              | View                 | ✓          | ✓        | ✗            | ✓       | ✓          | ✓     |
| Expenses              | Approve              | ✓          | ✓        | ✗            | ✗       | ✓          | ✓     |
| Expenses              | Reimburse            | ✓          | ✓        | ✗            | ✗       | ✓          | ✓     |
| Payroll               | Calculate            | ✓          | ✗        | ✓            | ✗       | ✓          | ✓     |
| Payroll               | Approve              | ✓          | ✗        | ✓            | ✗       | ✓          | ✓     |
| Payroll               | Process              | ✓          | ✗        | ✗            | ✗       | ✓          | ✓     |
| Payroll               | View employee comp   | ✓          | ✗        | ✓            | ✓       | ✓          | ✓     |
| Budgets               | Create               | ✓          | ✗        | ✗            | ✗       | ✓          | ✓     |
| Budgets               | Approve              | ✗          | ✗        | ✗            | ✗       | ✓          | ✓     |
| Budgets               | Amend                | ✓          | ✗        | ✗            | ✗       | ✓          | ✓     |
| Budgets               | View                 | ✓          | ✓        | ✓            | ✓       | ✓          | ✓     |
| Banking               | Connect              | ✓          | ✗        | ✗            | ✗       | ✓          | ✓     |
| Banking               | Reconcile            | ✓          | ✗        | ✗            | ✗       | ✓          | ✓     |
| Banking               | View balances        | ✓          | ✓        | ✗            | ✓       | ✓          | ✓     |
| GL                    | Create Journal Entry | ✓          | ✗        | ✗            | ✗       | ✓          | ✓     |
| GL                    | Post Entry           | ✓          | ✗        | ✗            | ✗       | ✓          | ✓     |
| GL                    | View                 | ✓          | ✓        | ✓            | ✓       | ✓          | ✓     |
| Reports               | Generate             | ✓          | ✓        | ✓            | ✓       | ✓          | ✓     |
| Reports               | Export               | ✓          | ✓        | ✓            | ✓       | ✓          | ✓     |
| Audit Log             | View                 | ✓          | ✗        | ✗            | ✓       | ✓          | ✓     |
| Audit Log             | Export               | ✓          | ✗        | ✗            | ✓       | ✓          | ✓     |
| Chart of Accounts     | Create/Edit          | ✓          | ✗        | ✗            | ✗       | ✓          | ✓     |

### Comprehensive State Management: Redux Store Structure

```typescript
// Full accountant store shape
interface AccountantRootState {
  accountant: {
    dashboard: {
      data: AccountantDashboard | null;
      loading: "idle" | "pending" | "succeeded" | "failed";
      error: string | null;
      lastFetched: number | null;
    };
    invoices: {
      items: InvoiceSummary[];
      selectedInvoice: InvoiceDetail | null;
      filters: InvoiceFilters;
      pagination: PaginationState;
      loading: "idle" | "pending" | "succeeded" | "failed";
      saving: boolean;
      createForm: InvoiceCreateFormState;
    };
    payments: {
      items: PaymentSummary[];
      selectedPayment: PaymentDetail | null;
      filters: PaymentFilters;
      pagination: PaginationState;
      loading: "idle" | "pending" | "succeeded" | "failed";
    };
    expenses: {
      reports: ExpenseReportSummary[];
      selectedReport: ExpenseReportDetail | null;
      filters: ExpenseFilters;
      pagination: PaginationState;
      loading: "idle" | "pending" | "succeeded" | "failed";
    };
    payroll: {
      currentPeriod: PayrollPeriod | null;
      employeeEntries: PayrollEntrySummary[];
      periods: PayrollPeriodSummary[];
      filters: PayrollFilters;
      loading: "idle" | "pending" | "succeeded" | "failed";
      calculationStatus: "idle" | "calculating" | "calculated" | "error";
    };
    budgets: {
      budgets: BudgetSummary[];
      selectedBudget: BudgetDetail | null;
      fiscalYear: number;
      loading: "idle" | "pending" | "succeeded" | "failed";
    };
    banking: {
      accounts: BankAccountSummary[];
      selectedAccount: BankAccountDetail | null;
      reconciliation: ReconciliationState;
      transactions: BankTransaction[];
      loading: "idle" | "pending" | "succeeded" | "failed";
    };
    auditLog: {
      entries: AuditEntry[];
      filters: AuditFilters;
      pagination: PaginationState;
      loading: "idle" | "pending" | "succeeded" | "failed";
    };
    reports: {
      availableReports: ReportType[];
      generatedReport: ReportData | null;
      scheduledReports: ScheduledReport[];
      generating: boolean;
      error: string | null;
    };
    chartOfAccounts: {
      accounts: AccountNode[];
      loading: boolean;
    };
  };
}
```

### Optimistic Update Strategy

- **Payment recording**: Immediately apply payment to invoice balance, show pending indicator. On failure, revert and show error toast.
- **Expense approval**: Immediately move report to next status. On failure, revert.
- **Budget line edit**: Update local state immediately, debounce API save (1.5s).
- **Journal entry save**: Draft saves locally first, batch sync on idle.
- **Reconciliation match**: Show matched state instantly, queue unmatch if conflict.

### Accountant-Specific Analytics Events (Complete)

| Event Name                   | Properties                                | Trigger          | Destination    |
| ---------------------------- | ----------------------------------------- | ---------------- | -------------- |
| acc_dashboard_viewed         | `{arBalance, apBalance, cashBalance}`     | Dashboard load   | PostHog        |
| acc_invoice_created          | `{type, amount, paymentTerms}`            | Invoice created  | PostHog        |
| acc_invoice_sent             | `{invoiceId, type}`                       | Invoice sent     | PostHog        |
| acc_invoice_paid             | `{invoiceId, amount, daysToPay}`          | Payment recorded | PostHog        |
| acc_invoice_overdue          | `{invoiceId, daysOverdue}`                | Overdue trigger  | PostHog        |
| acc_payment_recorded         | `{direction, amount, method}`             | Payment created  | PostHog        |
| acc_payment_failed           | `{amount, method, reason}`                | Payment failure  | PostHog        |
| acc_payment_reconciled       | `{paymentId}`                             | Reconcile action | PostHog        |
| acc_expense_approved         | `{reportId, amount}`                      | Expense approved | PostHog        |
| acc_expense_reimbursed       | `{reportId, amount}`                      | Reimbursement    | PostHog        |
| acc_payroll_calculated       | `{period, totalGross, employeeCount}`     | Payroll calc     | PostHog        |
| acc_payroll_processed        | `{period, totalNet, achGenerated}`        | Payroll process  | PostHog        |
| acc_budget_created           | `{fiscalYear, totalBudget}`               | Budget create    | PostHog        |
| acc_budget_amended           | `{budgetId, lineItem, changeAmount}`      | Amendment        | PostHog        |
| acc_reconciliation_started   | `{accountId, period}`                     | Reconcile start  | PostHog        |
| acc_reconciliation_completed | `{accountId, balanced, transactionCount}` | Reconcile done   | PostHog        |
| acc_report_generated         | `{reportType, period, format}`            | Report gen       | PostHog        |
| acc_report_exported          | `{reportId, format}`                      | Report export    | PostHog        |
| acc_journal_posted           | `{journalNumber, amount}`                 | Journal posted   | PostHog        |
| acc_audit_log_viewed         | `{filterCount, dateRange}`                | Audit search     | PostHog        |
| acc_bank_account_connected   | `{accountType, bankName}`                 | Bank connect     | PostHog        |
| acc_bank_feed_disconnected   | `{accountId}`                             | Feed drop        | PostHog, Alert |

### Accountant Career Path & Job Evolution

- **AP Clerk** → Entry level. Manages bill entry, payment scheduling, vendor communication.
- **AR Clerk** → Entry level. Manages customer invoicing, payment application, collections.
- **Payroll Specialist** → Mid level. Processes payroll, manages tax filings, maintains comp records.
- **Staff Accountant** → Mid level. Full GL management, reconciliations, month-end close, financial statements.
- **Senior Accountant** → Experienced. Complex reconciliations, audit support, tax preparation, mentor juniors.
- **Financial Controller** → Senior leadership. Oversees all accounting functions, internal controls, financial reporting, team management.
- **CFO** → Executive. Strategic financial planning, investor relations, board reporting, risk management.

### Accountant Year-End Close Checklist

1. **Pre-Close (Month 12, Day 1-15)**
   - Confirm all invoices through month 11 are posted
   - Verify all bank reconciliations complete through month 11
   - Review prepaid expenses and accruals
   - Confirm fixed asset depreciation schedules
   - Send reminders to departments for outstanding purchase orders

2. **Close Month 12 (Day 16-20)**
   - Post all remaining month 12 invoices
   - Complete month 12 bank reconciliation
   - Review and post all expense reports
   - Calculate and post accrued expenses
   - Run trial balance and investigate variances

3. **Year-End Adjustments (Day 21-25)**
   - Post depreciation and amortization
   - Reconcile intercompany accounts
   - Review and post inventory adjustments
   - Calculate deferred revenue
   - Record income tax provisions
   - Post year-end closing entries

4. **Financial Statements (Day 26-30)**
   - Generate audited financial statements (P&L, Balance Sheet, Cash Flow)
   - Prepare board reporting package
   - Calculate and disclose financial ratios
   - Prepare audit support schedule
   - Lock fiscal year in system

5. **Post-Close (Day 31+)**
   - Open new fiscal year
   - Roll forward budget templates
   - Archive year-end documents
   - Conduct year-end review meeting
   - Submit regulatory filings
