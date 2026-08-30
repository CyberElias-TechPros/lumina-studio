import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  checkInAttendance,
  createAttendanceSession,
  type AttendanceCheckInResult,
  type AttendanceSession,
} from "@/lib/api/attendance";
import { stuKeys } from "@/lib/query/studentSelf";

export function useCheckInAttendance() {
  const queryClient = useQueryClient();
  return useMutation<AttendanceCheckInResult, Error, string>({
    mutationFn: checkInAttendance,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: stuKeys.attendance });
      void queryClient.invalidateQueries({ queryKey: stuKeys.records });
    },
  });
}

export function useCreateAttendanceSession() {
  return useMutation<AttendanceSession, Error, { course: string; durationMinutes?: number }>({
    mutationFn: createAttendanceSession,
  });
}
