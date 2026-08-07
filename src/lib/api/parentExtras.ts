import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface ParContact {
  id: string;
  name: string;
  role: string;
  kind: string;
}

export interface ParMeeting {
  id: string;
  title: string;
  dateLabel: string;
  status: string;
}

function parExtrasPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchParContacts = parExtrasPage<ParContact>("/v1/parent-extras-dashboard/contacts");
export const fetchParMeetings = parExtrasPage<ParMeeting>("/v1/parent-extras-dashboard/meetings");
