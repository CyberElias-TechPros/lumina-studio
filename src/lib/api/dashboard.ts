import { apiFetch } from "@/lib/api/client";
import type { LearningCourse } from "@/data/learning";

/**
 * Student dashboard contract — what GET /v1/dashboard/student returns.
 * One dashboard endpoint per role; KPI card chrome (icons/tones) stays in
 * the UI layer, this payload is pure data.
 */
export interface StudentDashboardKpis {
  enrolled: number;
  /** 0–100, aggregate across enrolled courses. */
  overallProgress: number;
  lessonsThisWeek: number;
  lessonsGoal: number;
  studyHours: string;
  streakDays: number;
}

export interface NextDeadline {
  due: string;
  title: string;
}

export interface StudentDashboard {
  kpis: StudentDashboardKpis;
  summary: { doneLessons: number; totalLessons: number };
  weeklyGoal: { done: number; goal: number; note: string };
  /** Next assignment due; null when nothing is outstanding. */
  nextDeadline: NextDeadline | null;
  courses: (LearningCourse & { nextUp?: string })[];
}

export function fetchStudentDashboard(): Promise<StudentDashboard> {
  return apiFetch<StudentDashboard>("/v1/dashboard/student");
}
