import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import type { CalendarEvent } from "@/data/learning";

export function fetchCalendarEvents(): Promise<Paginated<CalendarEvent>> {
  return apiFetch<Paginated<CalendarEvent>>("/v1/calendar/events");
}
