import { useApiQuery } from "@/lib/query/hooks";
import { fetchStudentDashboard, type StudentDashboard } from "@/lib/api/dashboard";

export const studentDashboardKeys = {
  all: ["dashboard", "student"] as const,
};

/** Student dashboard query (KPI cards, weekly goal, enrolled courses). */
export function useStudentDashboard(enabled = true) {
  return useApiQuery<StudentDashboard>(studentDashboardKeys.all, fetchStudentDashboard, {
    enabled,
  });
}
