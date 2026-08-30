import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface VolOpportunity {
  id: string;
  title: string;
  dateLabel: string;
  locationLabel: string;
  slotsFilled: number;
  slotsTotal: number;
  priority: number;
}

export interface VolSignup {
  id: string;
  title: string;
  detail: string;
  hours: number | null;
  attended: number;
  upcoming: number;
}

export interface VolMetric {
  id: string;
  metric: string;
  valueLabel: string;
  detail: string;
}

export interface VolHour {
  id: string;
  title: string;
  dateLabel: string;
  hours: number;
  status: string;
}

export interface VolGroup {
  id: string;
  name: string;
  members: number;
  online: number;
}

export interface VolCert {
  id: string;
  title: string;
  detail: string;
}

export interface VolMonth {
  id: string;
  month: string;
  pct: number;
}

export interface RecAppointment {
  id: string;
  title: string;
  detail: string;
  who: string;
  status: string;
}

export interface RecQueueEntry {
  id: string;
  name: string;
  hostLabel: string;
  purpose: string;
  timeLabel: string;
  notified: number;
}

export interface RecInsideEntry {
  id: string;
  name: string;
  sinceLabel: string;
  badgeLabel: string;
  hostLabel: string;
  phone: string;
  purpose: string;
}

export interface CheckInVisitorInput {
  fullName: string;
  hostLabel: string;
  phone?: string;
  purpose: string;
}

export interface CheckInVisitorResult {
  visitor: RecInsideEntry;
}

export interface RecDelivery {
  id: string;
  carrier: string;
  item: string;
  timeLabel: string;
  status: string;
}

export interface RecInquiry {
  id: string;
  name: string;
  topic: string;
  timeLabel: string;
  stage: string;
}

export interface RecCall {
  id: string;
  name: string;
  topic: string;
  timeLabel: string;
  kind: string;
}

export interface RecStaffMember {
  id: string;
  name: string;
  role: string;
  extension: string;
  office: string;
}

export interface RecTask {
  id: string;
  title: string;
  timeLabel: string;
  done: number;
}

export interface RecHandoverNote {
  id: string;
  note: string;
}

function volPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchVolOpportunities = volPage<VolOpportunity>(
  "/v1/volunteer-dashboard/opportunities",
);
export const fetchVolSignups = volPage<VolSignup>("/v1/volunteer-dashboard/signups");
export const fetchVolMetrics = volPage<VolMetric>("/v1/volunteer-dashboard/impact");
export const fetchVolHours = volPage<VolHour>("/v1/volunteer-dashboard/hours");
export const fetchVolGroups = volPage<VolGroup>("/v1/volunteer-dashboard/groups");
export const fetchVolCerts = volPage<VolCert>("/v1/volunteer-dashboard/certs");
export const fetchVolMonths = volPage<VolMonth>("/v1/volunteer-dashboard/months");

export const fetchRecAppointments = volPage<RecAppointment>(
  "/v1/receptionist-dashboard/appointments",
);
export const fetchRecQueue = volPage<RecQueueEntry>("/v1/receptionist-dashboard/queue");
export const fetchRecInside = volPage<RecInsideEntry>("/v1/receptionist-dashboard/inside");
export const fetchRecDeliveries = volPage<RecDelivery>("/v1/receptionist-dashboard/deliveries");
export const fetchRecInquiries = volPage<RecInquiry>("/v1/receptionist-dashboard/inquiries");
export const fetchRecCalls = volPage<RecCall>("/v1/receptionist-dashboard/calls");
export const fetchRecStaff = volPage<RecStaffMember>("/v1/receptionist-dashboard/staff");
export const fetchRecTasks = volPage<RecTask>("/v1/receptionist-dashboard/tasks");
export const fetchRecHandover = volPage<RecHandoverNote>("/v1/receptionist-dashboard/handover");

export function checkInVisitor(input: CheckInVisitorInput): Promise<CheckInVisitorResult> {
  return apiFetch<CheckInVisitorResult>("/v1/receptionist-dashboard/check-in", {
    method: "POST",
    body: input,
  });
}

export function notifyQueueHost(id: string): Promise<{ ok: true; id: string; notified: 1 }> {
  return apiFetch<{ ok: true; id: string; notified: 1 }>(
    `/v1/receptionist-dashboard/queue/${encodeURIComponent(id)}/notify`,
    { method: "PATCH", body: {} },
  );
}

export function checkOutVisitor(id: string): Promise<{ ok: true; id: string }> {
  return apiFetch<{ ok: true; id: string }>(
    `/v1/receptionist-dashboard/inside/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );
}

export function updateRecTask(
  id: string,
  done: boolean,
): Promise<{ ok: true; id: string; done: number }> {
  return apiFetch<{ ok: true; id: string; done: number }>(
    `/v1/receptionist-dashboard/tasks/${encodeURIComponent(id)}`,
    { method: "PATCH", body: { done } },
  );
}

export interface LogHoursInput {
  title: string;
  hours: number;
  dateLabel?: string;
}

export interface LogHoursResult {
  ok: boolean;
  id: string;
  title: string;
  hours: number;
  status: string;
}

export function logVolunteerHours(input: LogHoursInput): Promise<LogHoursResult> {
  return apiFetch<LogHoursResult>("/v1/volunteer-dashboard/hours", {
    method: "POST",
    body: input,
  });
}

export interface SignupResult {
  ok: boolean;
  id: string;
  title: string;
  detail: string;
  upcoming: number;
}

export function signUpForOpportunity(opportunityId: string): Promise<SignupResult> {
  return apiFetch<SignupResult>("/v1/volunteer-dashboard/signups", {
    method: "POST",
    body: { opportunityId },
  });
}
