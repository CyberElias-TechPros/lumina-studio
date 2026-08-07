import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchInsOverview,
  fetchInsClasses,
  fetchInsAnnouncements,
  fetchInsQueue,
  fetchInsRevisions,
  type InsKpi,
  type InsClass,
  type InsAnnouncement,
  type InsQueueItem,
  type InsRevision,
} from "@/lib/api/instructorExtras";

export const insExtrasKeys = {
  all: ["instructor-extras-dashboard"] as const,
  overview: ["instructor-extras-dashboard", "overview"] as const,
  classes: ["instructor-extras-dashboard", "classes"] as const,
  announcements: ["instructor-extras-dashboard", "announcements"] as const,
  queue: ["instructor-extras-dashboard", "queue"] as const,
  revisions: ["instructor-extras-dashboard", "revisions"] as const,
};

export function useInsOverview() {
  return usePaginatedQuery<InsKpi>(insExtrasKeys.overview, fetchInsOverview);
}
export function useInsOverviewItems(): InsKpi[] {
  return flattenPages(useInsOverview().data?.pages);
}
export function useInsClasses() {
  return usePaginatedQuery<InsClass>(insExtrasKeys.classes, fetchInsClasses);
}
export function useInsClassItems(): InsClass[] {
  return flattenPages(useInsClasses().data?.pages);
}
export function useInsAnnouncements() {
  return usePaginatedQuery<InsAnnouncement>(insExtrasKeys.announcements, fetchInsAnnouncements);
}
export function useInsAnnouncementItems(): InsAnnouncement[] {
  return flattenPages(useInsAnnouncements().data?.pages);
}
export function useInsQueue() {
  return usePaginatedQuery<InsQueueItem>(insExtrasKeys.queue, fetchInsQueue);
}
export function useInsQueueItems(): InsQueueItem[] {
  return flattenPages(useInsQueue().data?.pages);
}
export function useInsRevisions() {
  return usePaginatedQuery<InsRevision>(insExtrasKeys.revisions, fetchInsRevisions);
}
export function useInsRevisionItems(): InsRevision[] {
  return flattenPages(useInsRevisions().data?.pages);
}

export type {
  InsKpi,
  InsClass,
  InsAnnouncement,
  InsQueueItem,
  InsRevision,
} from "@/lib/api/instructorExtras";
