/**
 * Mock-mode handlers. Each maps a method+path to a function returning the
 * data the real Worker endpoint will eventually return. Data comes from the
 * canonical mock collections in src/data/* — the future D1 seed source.
 */
import { registerMock } from "@/lib/api/client";
import type { ApiRequestInit } from "@/lib/api/client";
import type { Session } from "@/lib/schema";
import {
  learningCourses,
  gradebook,
  assignments,
  assessments,
  calendarEvents,
  threads,
  courseBuilder,
  submissions,
  instructorGradebook,
} from "@/data/learning";
import {
  invoices,
  notifications,
  systemUsers,
  employees,
  leaveRequests,
  expenses,
  auditLog,
  payrollChanges,
  paymentBatches,
} from "@/data/dashboard";
import type { StudentDashboard } from "@/lib/api/dashboard";

const MOCK_USER = {
  id: "00000000-0000-4000-8000-000000000001",
  name: "Adaeze Okafor",
  email: "student@cea.ng",
  roleKey: "student",
  permissions: ["lms:read", "lms:enroll", "lms:submit"],
};

const MOCK_SESSION: Session = {
  user: MOCK_USER,
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

function delay(milliseconds = 120): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function registerAllMocks(): void {
  /* Auth */
  registerMock("GET", "/v1/auth/session", async () => {
    await delay();
    return MOCK_SESSION;
  });
  registerMock("POST", "/v1/auth/refresh", async () => {
    await delay();
    return MOCK_SESSION;
  });
  registerMock("POST", "/v1/auth/sign-in", async (_init: ApiRequestInit) => {
    await delay();
    return MOCK_SESSION;
  });
  registerMock("POST", "/v1/auth/sign-out", async () => {
    await delay(60);
    return { ok: true };
  });
  registerMock("POST", "/v1/auth/magic-link", async () => {
    await delay();
    return { ok: true };
  });
  registerMock("GET", "/v1/auth/magic-link/verify", async () => {
    await delay();
    return MOCK_SESSION;
  });

  /* LMS */
  registerMock("GET", "/v1/courses", async () => {
    await delay();
    return { items: learningCourses, total: learningCourses.length };
  });
  for (const course of learningCourses) {
    registerMock("GET", `/v1/courses/${course.slug}`, async () => {
      await delay();
      return course;
    });
  }
  registerMock("GET", "/v1/courses/gradebook", async () => {
    await delay();
    return { items: gradebook, total: gradebook.length };
  });

  /* Assignments */
  registerMock("GET", "/v1/assignments", async () => {
    await delay();
    return { items: assignments, total: assignments.length };
  });
  for (const assignment of assignments) {
    registerMock("GET", `/v1/assignments/${assignment.id}`, async () => {
      await delay();
      return assignment;
    });
  }

  /* Assessments */
  registerMock("GET", "/v1/assessments", async () => {
    await delay();
    return { items: assessments, total: assessments.length };
  });
  for (const assessment of assessments) {
    registerMock("GET", `/v1/assessments/${assessment.id}`, async () => {
      await delay();
      return assessment;
    });
  }

  /* Calendar */
  registerMock("GET", "/v1/calendar/events", async () => {
    await delay();
    return { items: calendarEvents, total: calendarEvents.length };
  });

  /* Messages */
  registerMock("GET", "/v1/messages/threads", async () => {
    await delay();
    return { items: threads, total: threads.length };
  });
  for (const thread of threads) {
    registerMock("GET", `/v1/messages/threads/${thread.id}`, async () => {
      await delay();
      return thread;
    });
  }

  /* Student dashboard — derived live from src/data so it stays honest */
  registerMock("GET", "/v1/dashboard/student", async (): Promise<StudentDashboard> => {
    await delay(400);
    const allLessons = learningCourses.flatMap((c) => c.modules.flatMap((m) => m.lessons));
    const doneLessons = allLessons.filter((l) => l.status === "done").length;
    const overallProgress = Math.round((doneLessons / Math.max(allLessons.length, 1)) * 100);
    const courses = learningCourses.map((course) => {
      const nextUp = course.modules
        .flatMap((m) => m.lessons)
        .find((l) => l.status === "in-progress");
      return { ...course, ...(nextUp ? { nextUp: nextUp.title } : {}) };
    });
    const nextAssignment = assignments.find((a) => a.status === "pending" || a.status === "draft");
    return {
      kpis: {
        enrolled: learningCourses.length,
        overallProgress,
        lessonsThisWeek: 5,
        lessonsGoal: 8,
        studyHours: "18.5h",
        streakDays: 9,
      },
      summary: { doneLessons, totalLessons: allLessons.length },
      weeklyGoal: {
        done: 5,
        goal: 8,
        note: "You're 2 lessons behind this week's goal of 8. A 40-minute block this evening closes the gap before Friday's live class.",
      },
      nextDeadline: nextAssignment
        ? { due: nextAssignment.due, title: nextAssignment.title }
        : null,
      courses,
    };
  });

  /* Finance */
  registerMock("GET", "/v1/invoices", async () => {
    await delay();
    return { items: invoices, total: invoices.length };
  });

  /* Notifications */
  registerMock("GET", "/v1/notifications", async () => {
    await delay();
    return {
      items: notifications.map((n, i) => ({ id: `nt-${i + 1}`, ...n })),
      total: notifications.length,
    };
  });

  /* Admin */
  registerMock("GET", "/v1/admin/users", async () => {
    await delay();
    return {
      items: systemUsers.map((u, i) => ({ id: `usr-${i + 1}`, ...u })),
      total: systemUsers.length,
    };
  });
  registerMock("GET", "/v1/admin/audit-log", async () => {
    await delay();
    return {
      items: auditLog.map((e, i) => ({ id: `al-${i + 1}`, ...e })),
      total: auditLog.length,
    };
  });

  /* Instructor */
  const instructorCourses = [
    ...learningCourses.map((c) => ({
      id: c.slug,
      title: c.title,
      cohort: c.cohort,
      status: "published",
      modules: c.modules,
    })),
    {
      id: courseBuilder.slug,
      title: courseBuilder.title,
      cohort: courseBuilder.cohort,
      status: courseBuilder.status,
      modules: courseBuilder.modules,
    },
  ];
  registerMock("GET", "/v1/instructor/gradebook", async () => {
    await delay();
    return { items: instructorGradebook, total: instructorGradebook.length };
  });
  registerMock("GET", "/v1/instructor/courses", async () => {
    await delay();
    return { items: instructorCourses, total: instructorCourses.length };
  });
  for (const course of instructorCourses) {
    registerMock("GET", `/v1/instructor/courses/${course.id}`, async () => {
      await delay();
      return course;
    });
  }
  registerMock("GET", "/v1/instructor/assignments", async () => {
    await delay();
    return { items: submissions, total: submissions.length };
  });
  for (const submission of submissions) {
    registerMock("GET", `/v1/instructor/assignments/${submission.id}`, async () => {
      await delay();
      return submission;
    });
  }

  /* HR */
  registerMock("GET", "/v1/hr/employees", async () => {
    await delay();
    return {
      items: employees.map((e, i) => ({ id: `emp-${i + 1}`, ...e })),
      total: employees.length,
    };
  });
  registerMock("GET", "/v1/hr/leave-requests", async () => {
    await delay();
    return {
      items: leaveRequests.map((r, i) => ({
        id: `lv-${i + 1}`,
        employee: r.name,
        type: r.type,
        from: r.from,
        to: r.to,
        status: r.status,
      })),
      total: leaveRequests.length,
    };
  });
  registerMock("GET", "/v1/hr/payroll-changes", async () => {
    await delay();
    return {
      items: payrollChanges.map((p, i) => ({ id: `pc-${i + 1}`, ...p })),
      total: payrollChanges.length,
    };
  });

  /* Finance */
  registerMock("GET", "/v1/expenses", async () => {
    await delay();
    return {
      items: expenses.map((e, i) => ({ id: `exp-${i + 1}`, ...e })),
      total: expenses.length,
    };
  });
  registerMock("GET", "/v1/payments", async () => {
    await delay();
    return {
      items: paymentBatches.map((b, i) => ({ id: `pb-${i + 1}`, ...b })),
      total: paymentBatches.length,
    };
  });

  /* Flags */
  registerMock("GET", "/v1/flags", async () => {
    await delay();
    return {
      "ai.grading": false,
      "ai.recommendations": false,
      "ai.assistant": false,
      "ai.content-gen": false,
      "realtime.chat": false,
      "realtime.live-class": false,
      "payments.paystack": false,
      "uploads.r2": false,
      "pwa.push": false,
      "onboarding.tours": true,
    };
  });
}
