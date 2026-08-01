import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import { fetchCalendarEvents } from "@/lib/api/calendar";
import type { CalendarEvent } from "@/data/learning";

export const calendarKeys = {
  all: ["calendar", "events"] as const,
};

export function useCalendarEvents() {
  return usePaginatedQuery<CalendarEvent>(calendarKeys.all, fetchCalendarEvents);
}

export function useCalendarItems(): CalendarEvent[] {
  return flattenPages(useCalendarEvents().data?.pages);
}
