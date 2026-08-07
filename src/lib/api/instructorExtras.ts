import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface InsKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface InsClass {
  id: string;
  timeLabel: string;
  title: string;
  place: string;
}

export interface InsAnnouncement {
  id: string;
  title: string;
  audience: string;
  dateLabel: string;
  pinned: number;
  status: string;
}

export interface InsQueueItem {
  id: string;
  student: string;
  item: string;
  course: string;
  submitted: string;
  due: string;
}

export interface InsRevision {
  id: string;
  version: string;
  title: string;
  author: string;
  dateLabel: string;
}

function insPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchInsOverview = insPage<InsKpi>("/v1/instructor-extras-dashboard/overview");
export const fetchInsClasses = insPage<InsClass>("/v1/instructor-extras-dashboard/classes");
export const fetchInsAnnouncements = insPage<InsAnnouncement>(
  "/v1/instructor-extras-dashboard/announcements",
);
export const fetchInsQueue = insPage<InsQueueItem>("/v1/instructor-extras-dashboard/queue");
export const fetchInsRevisions = insPage<InsRevision>("/v1/instructor-extras-dashboard/revisions");
