import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchInventory,
  fetchPurchaseOrders,
  fetchBranches,
  fetchRooms,
  fetchMaintenance,
  fetchVendors,
  fetchContracts,
  fetchOpsTasks,
  fetchWorkflows,
  type InventoryItem,
  type PurchaseOrder,
  type Branch,
  type FacilityRoom,
  type MaintenanceJob,
  type Vendor,
  type VendorContract,
  type OpsTask,
  type Workflow,
} from "@/lib/api/ops";

export const opsKeys = {
  all: ["ops"] as const,
  inventory: ["ops", "inventory"] as const,
  "purchase-orders": ["ops", "purchase-orders"] as const,
  branches: ["ops", "branches"] as const,
  rooms: ["ops", "rooms"] as const,
  maintenance: ["ops", "maintenance"] as const,
  vendors: ["ops", "vendors"] as const,
  contracts: ["ops", "contracts"] as const,
  tasks: ["ops", "tasks"] as const,
  workflows: ["ops", "workflows"] as const,
};

function useOps<T>(key: readonly unknown[], fetchFn: (cursor?: string) => Promise<{ items: T[] }>) {
  return usePaginatedQuery<T>(key, fetchFn);
}

export function useInventory() {
  return useOps<InventoryItem>(opsKeys.inventory, fetchInventory);
}
export function useInventoryItems(): InventoryItem[] {
  return flattenPages(useInventory().data?.pages);
}

export function usePurchaseOrders() {
  return useOps<PurchaseOrder>(opsKeys["purchase-orders"], fetchPurchaseOrders);
}
export function usePurchaseOrderItems(): PurchaseOrder[] {
  return flattenPages(usePurchaseOrders().data?.pages);
}

export function useBranches() {
  return useOps<Branch>(opsKeys.branches, fetchBranches);
}
export function useBranchItems(): Branch[] {
  return flattenPages(useBranches().data?.pages);
}

export function useRooms() {
  return useOps<FacilityRoom>(opsKeys.rooms, fetchRooms);
}
export function useRoomItems(): FacilityRoom[] {
  return flattenPages(useRooms().data?.pages);
}

export function useMaintenance() {
  return useOps<MaintenanceJob>(opsKeys.maintenance, fetchMaintenance);
}
export function useMaintenanceItems(): MaintenanceJob[] {
  return flattenPages(useMaintenance().data?.pages);
}

export function useVendors() {
  return useOps<Vendor>(opsKeys.vendors, fetchVendors);
}
export function useVendorItems(): Vendor[] {
  return flattenPages(useVendors().data?.pages);
}

export function useContracts() {
  return useOps<VendorContract>(opsKeys.contracts, fetchContracts);
}
export function useContractItems(): VendorContract[] {
  return flattenPages(useContracts().data?.pages);
}

export function useOpsTasks() {
  return useOps<OpsTask>(opsKeys.tasks, fetchOpsTasks);
}
export function useOpsTaskItems(): OpsTask[] {
  return flattenPages(useOpsTasks().data?.pages);
}

export function useWorkflows() {
  return useOps<Workflow>(opsKeys.workflows, fetchWorkflows);
}
export function useWorkflowItems(): Workflow[] {
  return flattenPages(useWorkflows().data?.pages);
}
