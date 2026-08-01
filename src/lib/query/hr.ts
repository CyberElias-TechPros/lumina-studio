import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import { fetchEmployees, fetchLeaveRequests, type Employee, type LeaveRequest } from "@/lib/api/hr";

export const hrKeys = {
  employees: ["hr", "employees"] as const,
  leave: ["hr", "leave-requests"] as const,
};

export function useEmployees() {
  return usePaginatedQuery<Employee>(hrKeys.employees, fetchEmployees);
}

export function useEmployeeItems(): Employee[] {
  return flattenPages(useEmployees().data?.pages);
}

export function useLeaveRequests() {
  return usePaginatedQuery<LeaveRequest>(hrKeys.leave, fetchLeaveRequests);
}

export function useLeaveRequestItems(): LeaveRequest[] {
  return flattenPages(useLeaveRequests().data?.pages);
}
