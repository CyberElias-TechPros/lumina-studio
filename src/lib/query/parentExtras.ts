import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchParContacts,
  fetchParMeetings,
  type ParContact,
  type ParMeeting,
} from "@/lib/api/parentExtras";

export const parExtrasKeys = {
  all: ["parent-extras-dashboard"] as const,
  contacts: ["parent-extras-dashboard", "contacts"] as const,
  meetings: ["parent-extras-dashboard", "meetings"] as const,
};

export function useParContacts() {
  return usePaginatedQuery<ParContact>(parExtrasKeys.contacts, fetchParContacts);
}
export function useParContactItems(): ParContact[] {
  return flattenPages(useParContacts().data?.pages);
}
export function useParMeetings() {
  return usePaginatedQuery<ParMeeting>(parExtrasKeys.meetings, fetchParMeetings);
}
export function useParMeetingItems(): ParMeeting[] {
  return flattenPages(useParMeetings().data?.pages);
}

export type { ParContact, ParMeeting } from "@/lib/api/parentExtras";
