import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface Employee {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: string;
  joined: string;
}

export interface LeaveRequest {
  id: string;
  employee: string;
  type: string;
  from: string;
  to: string;
  status: string;
}

export function fetchEmployees(): Promise<Paginated<Employee>> {
  return apiFetch<Paginated<Employee>>("/v1/hr/employees");
}

export function fetchLeaveRequests(): Promise<Paginated<LeaveRequest>> {
  return apiFetch<Paginated<LeaveRequest>>("/v1/hr/leave-requests");
}
