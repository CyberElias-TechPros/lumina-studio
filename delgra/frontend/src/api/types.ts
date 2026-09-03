/** API response types. Money fields are integer kobo throughout. */

export type Role = "owner" | "manager" | "staff" | "viewer";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  capabilities?: string[];
}

export interface ListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ListResponse<T> {
  data: T[];
  meta: ListMeta;
}

export type InvoiceStatus = "draft" | "sent" | "partial" | "paid" | "void" | "overdue";
export type WaybillStatus = "pending" | "in_transit" | "delivered" | "exception" | "cancelled";

export interface Customer {
  id: string;
  name: string;
  contactPerson: string | null;
  email: string | null;
  phone: string | null;
  altPhone: string | null;
  addressLine1: string | null;
  city: string | null;
  state: string | null;
  rcNumber: string | null;
  taxId: string | null;
  customerType: "individual" | "company" | "government";
  notes: string | null;
  isActive: boolean;
  createdAt: string;
  stats: { invoiceCount: number; lastInvoiceDate: string | null; billed: number; paid: number; outstanding: number };
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  category: string | null;
  conditionGrade: "new" | "grade_a" | "grade_b" | "grade_c" | "grade_d";
  unit: string;
  costPrice: number;
  salePrice: number;
  quantity: number;
  reorderLevel: number;
  trackStock: boolean;
  isActive: boolean;
  lowStock: boolean;
  outOfStock: boolean;
  stockValue: number;
}

export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  status: Exclude<InvoiceStatus, "overdue">;
  displayStatus: InvoiceStatus;
  isOverdue: boolean;
  subtotal: number;
  discount: number;
  taxEnabled: boolean;
  taxRateBp: number;
  taxAmount: number;
  shipping: number;
  total: number;
  paidAmount: number;
  balance: number;
  currency: string;
  poNumber: string | null;
  notes: string | null;
  terms: string | null;
  voidReason: string | null;
  createdAt: string;
  createdByName: string | null;
}

export interface InvoiceItem {
  id?: string;
  productId: string | null;
  description: string;
  quantity: number;
  unitPrice: number;
  amount?: number;
}

export interface Payment {
  id: string;
  amount: number;
  method: string;
  reference: string | null;
  paidAt: string;
  note: string | null;
  createdByName: string | null;
}

export interface Waybill {
  id: string;
  number: string;
  invoiceId: string | null;
  invoiceNumber: string | null;
  customerId: string;
  customerName: string;
  waybillDate: string;
  carrier: string | null;
  trackingNumber: string | null;
  origin: string | null;
  destination: string | null;
  receiverName: string | null;
  receiverPhone: string | null;
  status: WaybillStatus;
  charges: number;
  chargesPaidBy: "sender" | "receiver";
  pieces: number;
  notes: string | null;
  deliveredAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdByName: string | null;
}

export interface WaybillItem {
  id?: string;
  productId: string | null;
  description: string;
  quantity: number;
  serialNumber?: string | null;
  weightKg?: number | null;
  note?: string | null;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  isActive: boolean;
  stats: { purchaseCount: number; lastOrderDate: string | null; spent: number; owed: number };
}

export interface Purchase {
  id: string;
  number: string;
  supplierId: string | null;
  supplierName: string | null;
  orderDate: string;
  dueDate: string | null;
  status: "draft" | "ordered" | "received" | "paid" | "cancelled";
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paidAmount: number;
  balance: number;
}

export interface Expense {
  id: string;
  expenseDate: string;
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  reference: string | null;
  supplierName: string | null;
}

export interface BusinessProfile {
  name: string;
  legalName: string | null;
  rcNumber: string | null;
  tin: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  country: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  currency: string;
  currencySymbol: string;
  invoicePrefix: string;
  invoiceSeries: string;
  waybillPrefix: string;
  waybillSeries: string;
  purchasePrefix: string;
  paymentTermsDays: number;
  taxEnabled: boolean;
  taxRateBp: number;
  taxLabel: string;
  bankName: string | null;
  bankAccountName: string | null;
  bankAccountNumber: string | null;
  invoiceNotes: string | null;
  invoiceFooter: string | null;
}

export interface Dashboard {
  business: { name: string; currency: string; currencySymbol: string };
  period: { monthStart: string; today: string };
  money: {
    monthBilled: number;
    monthCollected: number;
    monthInvoiceCount: number;
    outstanding: number;
    overdue: number;
    collected: number;
    payables: number;
    stockValue: number;
  };
  counts: {
    customers: number;
    drafts: number;
    openInvoices: number;
    inTransit: number;
    pendingWaybills: number;
    exceptions: number;
    lowStock: number;
    outOfStock: number;
  };
  lowStockItems: Array<{ id: string; sku: string; name: string; quantity: number; reorderLevel: number }>;
  activity: Array<{
    id: string;
    actorName: string;
    action: string;
    entityType: string | null;
    entityId: string | null;
    summary: string | null;
    createdAt: string;
  }>;
}

export interface UserRow {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  mustChangePassword: boolean;
  lastLoginAt: string | null;
  activeSessions: number;
}

export interface AuditRow {
  id: string;
  actorId: string | null;
  actorName: string;
  action: string;
  entityType: string | null;
  entityId: string | null;
  summary: string | null;
  ip: string | null;
  createdAt: string;
}

export interface DocumentRow {
  id: string;
  entityType: string;
  entityId: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
  createdAt: string;
  uploadedByName: string | null;
}

export type EntityType = "invoice" | "waybill" | "purchase" | "expense" | "product" | "business";
