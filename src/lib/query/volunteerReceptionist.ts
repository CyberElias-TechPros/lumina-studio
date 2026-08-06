import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchVolOpportunities,
  fetchVolSignups,
  fetchVolMetrics,
  fetchVolHours,
  fetchVolGroups,
  fetchVolCerts,
  fetchVolMonths,
  fetchRecAppointments,
  fetchRecQueue,
  fetchRecInside,
  fetchRecDeliveries,
  fetchRecInquiries,
  fetchRecCalls,
  fetchRecStaff,
  fetchRecTasks,
  fetchRecHandover,
  type VolOpportunity,
  type VolSignup,
  type VolMetric,
  type VolHour,
  type VolGroup,
  type VolCert,
  type VolMonth,
  type RecAppointment,
  type RecQueueEntry,
  type RecInsideEntry,
  type RecDelivery,
  type RecInquiry,
  type RecCall,
  type RecStaffMember,
  type RecTask,
  type RecHandoverNote,
} from "@/lib/api/volunteerReceptionist";

export const volKeys = {
  all: ["volunteer-dashboard"] as const,
  opportunities: ["volunteer-dashboard", "opportunities"] as const,
  signups: ["volunteer-dashboard", "signups"] as const,
  metrics: ["volunteer-dashboard", "impact"] as const,
  hours: ["volunteer-dashboard", "hours"] as const,
  groups: ["volunteer-dashboard", "groups"] as const,
  certs: ["volunteer-dashboard", "certs"] as const,
  months: ["volunteer-dashboard", "months"] as const,
};

export const recKeys = {
  all: ["receptionist-dashboard"] as const,
  appointments: ["receptionist-dashboard", "appointments"] as const,
  queue: ["receptionist-dashboard", "queue"] as const,
  inside: ["receptionist-dashboard", "inside"] as const,
  deliveries: ["receptionist-dashboard", "deliveries"] as const,
  inquiries: ["receptionist-dashboard", "inquiries"] as const,
  calls: ["receptionist-dashboard", "calls"] as const,
  staff: ["receptionist-dashboard", "staff"] as const,
  tasks: ["receptionist-dashboard", "tasks"] as const,
  handover: ["receptionist-dashboard", "handover"] as const,
};

export function useVolOpportunities() {
  return usePaginatedQuery<VolOpportunity>(volKeys.opportunities, fetchVolOpportunities);
}
export function useVolOpportunityItems(): VolOpportunity[] {
  return flattenPages(useVolOpportunities().data?.pages);
}

export function useVolSignups() {
  return usePaginatedQuery<VolSignup>(volKeys.signups, fetchVolSignups);
}
export function useVolSignupItems(): VolSignup[] {
  return flattenPages(useVolSignups().data?.pages);
}

export function useVolMetrics() {
  return usePaginatedQuery<VolMetric>(volKeys.metrics, fetchVolMetrics);
}
export function useVolMetricItems(): VolMetric[] {
  return flattenPages(useVolMetrics().data?.pages);
}

export function useVolHours() {
  return usePaginatedQuery<VolHour>(volKeys.hours, fetchVolHours);
}
export function useVolHourItems(): VolHour[] {
  return flattenPages(useVolHours().data?.pages);
}

export function useVolGroups() {
  return usePaginatedQuery<VolGroup>(volKeys.groups, fetchVolGroups);
}
export function useVolGroupItems(): VolGroup[] {
  return flattenPages(useVolGroups().data?.pages);
}

export function useVolCerts() {
  return usePaginatedQuery<VolCert>(volKeys.certs, fetchVolCerts);
}
export function useVolCertItems(): VolCert[] {
  return flattenPages(useVolCerts().data?.pages);
}

export function useVolMonths() {
  return usePaginatedQuery<VolMonth>(volKeys.months, fetchVolMonths);
}
export function useVolMonthItems(): VolMonth[] {
  return flattenPages(useVolMonths().data?.pages);
}

export function useRecAppointments() {
  return usePaginatedQuery<RecAppointment>(recKeys.appointments, fetchRecAppointments);
}
export function useRecAppointmentItems(): RecAppointment[] {
  return flattenPages(useRecAppointments().data?.pages);
}

export function useRecQueue() {
  return usePaginatedQuery<RecQueueEntry>(recKeys.queue, fetchRecQueue);
}
export function useRecQueueItems(): RecQueueEntry[] {
  return flattenPages(useRecQueue().data?.pages);
}

export function useRecInside() {
  return usePaginatedQuery<RecInsideEntry>(recKeys.inside, fetchRecInside);
}
export function useRecInsideItems(): RecInsideEntry[] {
  return flattenPages(useRecInside().data?.pages);
}

export function useRecDeliveries() {
  return usePaginatedQuery<RecDelivery>(recKeys.deliveries, fetchRecDeliveries);
}
export function useRecDeliveryItems(): RecDelivery[] {
  return flattenPages(useRecDeliveries().data?.pages);
}

export function useRecInquiries() {
  return usePaginatedQuery<RecInquiry>(recKeys.inquiries, fetchRecInquiries);
}
export function useRecInquiryItems(): RecInquiry[] {
  return flattenPages(useRecInquiries().data?.pages);
}

export function useRecCalls() {
  return usePaginatedQuery<RecCall>(recKeys.calls, fetchRecCalls);
}
export function useRecCallItems(): RecCall[] {
  return flattenPages(useRecCalls().data?.pages);
}

export function useRecStaff() {
  return usePaginatedQuery<RecStaffMember>(recKeys.staff, fetchRecStaff);
}
export function useRecStaffItems(): RecStaffMember[] {
  return flattenPages(useRecStaff().data?.pages);
}

export function useRecTasks() {
  return usePaginatedQuery<RecTask>(recKeys.tasks, fetchRecTasks);
}
export function useRecTaskItems(): RecTask[] {
  return flattenPages(useRecTasks().data?.pages);
}

export function useRecHandover() {
  return usePaginatedQuery<RecHandoverNote>(recKeys.handover, fetchRecHandover);
}
export function useRecHandoverItems(): RecHandoverNote[] {
  return flattenPages(useRecHandover().data?.pages);
}

export type {
  VolOpportunity,
  VolSignup,
  VolMetric,
  VolHour,
  VolGroup,
  VolCert,
  VolMonth,
  RecAppointment,
  RecQueueEntry,
  RecInsideEntry,
  RecDelivery,
  RecInquiry,
  RecCall,
  RecStaffMember,
  RecTask,
  RecHandoverNote,
} from "@/lib/api/volunteerReceptionist";
