import { apiFetch } from "@/lib/api/client";

export interface AttendanceSession {
  id: string;
  course: string;
  code: string;
  startsAt: string;
  closesAt: string;
}

export interface AttendanceCheckInResult {
  ok: true;
  alreadyCheckedIn: boolean;
  attendance: { id: string; date: string; status: string; note: string };
  course: string;
  closesAt: string;
}

export function createAttendanceSession(input: {
  course: string;
  durationMinutes?: number;
}): Promise<AttendanceSession> {
  return apiFetch<AttendanceSession>("/v1/attendance/sessions", {
    method: "POST",
    body: input,
  });
}

export function checkInAttendance(sessionCode: string): Promise<AttendanceCheckInResult> {
  return apiFetch<AttendanceCheckInResult>("/v1/attendance/check-in", {
    method: "POST",
    body: { sessionCode },
  });
}
