import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  qty: number;
  unit: string;
  reorderPoint: number;
  autoReorder: number;
  unitPrice: number;
  location: string;
}

export interface PurchaseOrder {
  id: string;
  vendor: string;
  items: string;
  amount: number;
  eta: string;
  status: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  capacity: number;
  occupied: number;
  staffOnsite: number;
  costSeatDay: number;
  status: string;
}

export interface FacilityRoom {
  id: string;
  name: string;
  block: string;
  seats: number;
  nextEvent: string;
  status: string;
}

export interface MaintenanceJob {
  id: string;
  title: string;
  detail: string;
  status: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  status: string;
}

export interface VendorContract {
  id: string;
  title: string;
  renews: string;
  valueYr: number;
  status: string;
}

export interface OpsTask {
  id: string;
  title: string;
  assignee: string;
  detail: string;
  done: number;
}

export interface Workflow {
  id: string;
  name: string;
  triggerDetail: string;
  stats: string;
  status: string;
}

function fetchPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchInventory = fetchPage<InventoryItem>("/v1/ops/inventory");
export const fetchPurchaseOrders = fetchPage<PurchaseOrder>("/v1/ops/purchase-orders");
export const fetchBranches = fetchPage<Branch>("/v1/ops/branches");
export const fetchRooms = fetchPage<FacilityRoom>("/v1/ops/rooms");
export const fetchMaintenance = fetchPage<MaintenanceJob>("/v1/ops/maintenance");
export const fetchVendors = fetchPage<Vendor>("/v1/ops/vendors");
export const fetchContracts = fetchPage<VendorContract>("/v1/ops/contracts");
export const fetchOpsTasks = fetchPage<OpsTask>("/v1/ops/tasks");
export const fetchWorkflows = fetchPage<Workflow>("/v1/ops/workflows");
