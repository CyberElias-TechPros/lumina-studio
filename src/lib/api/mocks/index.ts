/**
 * Mock-mode handlers. Each maps a method+path to a function returning the
 * data the real Worker endpoint will eventually return. Data comes from the
 * canonical mock collections in src/data/* — the future D1 seed source.
 */
import { registerMock, registerMockPattern } from "@/lib/api/client";
import type { ApiRequestInit } from "@/lib/api/client";
import type { Session } from "@/lib/schema";
import { ApiError } from "@/lib/errors";
import { registerRecruitmentMocks } from "@/lib/api/mocks/recruitment";
import { registerMarketingMocks } from "@/lib/api/mocks/marketing";
import { registerDesignMocks } from "@/lib/api/mocks/design";
import { registerLocalizationMocks } from "@/lib/api/mocks/localization";
import { registerRealtimeMocks } from "@/lib/api/mocks/realtime";
import { registerLiveMocks } from "@/lib/api/mocks/live";
import { registerUploadsMocks } from "@/lib/api/mocks/uploads";
import { registerAiMocks } from "@/lib/api/mocks/ai";
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
  payments,
} from "@/data/dashboard";
import type { StudentDashboard } from "@/lib/api/dashboard";
import type { AdminApplication } from "@/lib/api/applications";
import type { MentorProfile } from "@/lib/api/mentor";
import { libraryItems } from "@/data/library";
import { externalLinkItems } from "@/data/external-links";

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

const mockAdmissions: AdminApplication[] = [
  {
    id: "app-1",
    ref: "CEA-2026-TB7K2M",
    fullName: "Tola Bakare",
    email: "tola.bakare@mail.com",
    programSlug: "full-stack-software-development",
    programTitle: "Full-Stack Software Development",
    phone: null,
    city: "Lagos",
    experience: "2 years as a support engineer",
    status: "assessment",
    note: "",
    createdAt: "2026-08-01T09:30:00.000Z",
    updatedAt: "2026-08-02T10:00:00.000Z",
  },
  {
    id: "app-2",
    ref: "CEA-2026-MD9X4Q",
    fullName: "Musa Danjuma",
    email: "musa.danjuma@mail.com",
    programSlug: "cybersecurity",
    programTitle: "Cybersecurity",
    phone: null,
    city: "Kano",
    experience: null,
    status: "interview",
    note: "",
    createdAt: "2026-07-30T14:20:00.000Z",
    updatedAt: "2026-08-01T11:00:00.000Z",
  },
  {
    id: "app-3",
    ref: "CEA-2026-NE5P1W",
    fullName: "Ngozi Eze",
    email: "ngozi.eze@mail.com",
    programSlug: "data-science",
    programTitle: "Data Science",
    phone: null,
    city: "Enugu",
    experience: "Data analyst",
    status: "offer",
    note: "",
    createdAt: "2026-07-29T08:45:00.000Z",
    updatedAt: "2026-07-31T16:00:00.000Z",
  },
  {
    id: "app-4",
    ref: "CEA-2026-KN8R3T",
    fullName: "Kelechi Nwosu",
    email: "kelechi.nwosu@mail.com",
    programSlug: "devops",
    programTitle: "DevOps & Cloud",
    phone: null,
    city: "Port Harcourt",
    experience: null,
    status: "submitted",
    note: "",
    createdAt: "2026-07-28T12:10:00.000Z",
    updatedAt: "2026-07-28T12:10:00.000Z",
  },
];

const mockMentors: MentorProfile[] = [
  {
    id: "m-1",
    name: "Kemi Adeyemi",
    focus: "Backend & APIs",
    bio: "Backend engineer at Flutterwave. Helps learners reason about APIs, auth and production readiness.",
    skills: ["TypeScript", "Node.js", "PostgreSQL", "REST APIs"],
    areas: ["Backend", "System design", "Interview prep"],
    availability: "Wednesdays · 2 slots",
    rating: 4.9,
    sessionsCount: 24,
  },
  {
    id: "m-2",
    name: "Tunde Balogun",
    focus: "DevOps",
    bio: "Platform lead at Paystack. CI/CD, containers and cloud architecture for stressed demo-day teams.",
    skills: ["Kubernetes", "Terraform", "CI/CD", "AWS"],
    areas: ["DevOps", "Cloud", "Career switching"],
    availability: "Fridays · 1 slot",
    rating: 4.8,
    sessionsCount: 18,
  },
  {
    id: "m-3",
    name: "Zainab Yusuf",
    focus: "Product & UI/UX",
    bio: "Product designer at Andela. Accessibility and design systems are her strengths.",
    skills: ["Figma", "Design systems", "Accessibility", "UX research"],
    areas: ["Product design", "Portfolio review"],
    availability: "Weekends",
    rating: 4.7,
    sessionsCount: 15,
  },
  {
    id: "m-4",
    name: "Emeka Osei",
    focus: "Interview prep",
    bio: "Ex-Google engineer running a structured mock-interview track for final cohorts.",
    skills: ["DS&A", "System design", "Behavioural"],
    areas: ["Interview prep", "Career switching"],
    availability: "Tue & Thu",
    rating: 4.9,
    sessionsCount: 31,
  },
];

const mockParentStudents = [
  {
    studentId: "ada-okafor",
    name: "Ada Okafor",
    email: "ada.okafor@cea.ng",
    course: "Full-Stack Software Development",
    courseDetail: "Full-Stack Software Development · Cohort 15",
    pct: 78,
    gpa: "4.2",
    due: 140000,
    dueCount: 1,
  },
  {
    studentId: "emeka-okafor",
    name: "Emeka Okafor",
    email: "emeka.okafor@cea.ng",
    course: "Product & UI/UX Design",
    courseDetail: "Product & UI/UX Design · Cohort 16",
    pct: 42,
    gpa: "3.8",
    due: 160000,
    dueCount: 1,
  },
];

function parentChildDetail(id: string) {
  const summary = mockParentStudents.find((s) => s.studentId === id);
  if (!summary) throw new ApiError(404, "NOT_FOUND", "Student not found.");
  if (id === "emeka-okafor") {
    return {
      ...summary,
      courses: [
        { slug: "ui-ux-design", title: "Product & UI/UX Design", cohort: "16", pct: 42 },
        { slug: "career-readiness", title: "Career Readiness", cohort: "16", pct: 38 },
      ],
      gradebook: [
        {
          courseName: "Design Foundations",
          units: 3,
          letter: "B+",
          pct: 84,
          trend: "+",
          items: [],
        },
        { courseName: "Career Readiness", units: 1, letter: "B", pct: 78, trend: "+", items: [] },
      ],
    };
  }
  return {
    ...summary,
    courses: [
      {
        slug: "full-stack-software-development",
        title: "Full-Stack Software Development",
        cohort: "15",
        pct: 78,
      },
      { slug: "cloud-devops", title: "Cloud Engineering & DevOps", cohort: "15", pct: 54 },
      { slug: "ui-ux-design", title: "Product & UI/UX Design", cohort: "15", pct: 31 },
    ],
    gradebook: [
      { courseName: "Backend & APIs", units: 3, letter: "A", pct: 92, trend: "+", items: [] },
      { courseName: "DevOps Fundamentals", units: 2, letter: "B+", pct: 86, trend: "+", items: [] },
      { courseName: "Design Systems", units: 2, letter: "A-", pct: 89, trend: "-", items: [] },
      { courseName: "Career Readiness", units: 1, letter: "A", pct: 94, trend: "=", items: [] },
    ],
  };
}

export function registerAllMocks(): void {
  registerRecruitmentMocks();
  registerMarketingMocks();
  registerDesignMocks();
  registerLocalizationMocks();
  registerRealtimeMocks();
  registerLiveMocks();
  registerUploadsMocks();
  registerAiMocks();

  /* Applications (public apply flow) */
  registerMock("POST", "/v1/applications", async (init: ApiRequestInit) => {
    await delay();
    const input = (init.body ?? {}) as { fullName?: string; email?: string; programSlug?: string };
    if (!input.fullName || !input.email || !input.programSlug) {
      throw new ApiError(400, "VALIDATION_ERROR", "fullName, email and programSlug are required.");
    }
    return {
      application: {
        id: crypto.randomUUID(),
        ref: `CEA-${String(Math.floor(1000 + Math.random() * 9000))}`,
        status: "submitted",
      },
    };
  });

  /* Admissions admin (pipeline + hub stats) */
  registerMock("GET", "/v1/applications/admin", async (init: ApiRequestInit) => {
    await delay();
    const path = new URL(`https://mock.local${init.path ?? "/"}`);
    const stage = path.searchParams.get("stage");
    const items = stage ? mockAdmissions.filter((a) => a.status === stage) : mockAdmissions;
    return { items, total: items.length };
  });
  registerMock("GET", "/v1/applications/admin/stats", async () => {
    await delay();
    const counts = {
      submitted: 1,
      screening: 0,
      assessment: 1,
      interview: 1,
      offer: 1,
      enrolled: 0,
    };
    return {
      total: mockAdmissions.length,
      activeStages: counts.screening + counts.assessment + counts.interview,
      stages: [
        { key: "submitted", label: "Application received", value: counts.submitted },
        { key: "screening", label: "Screening", value: counts.screening },
        { key: "assessment", label: "Assessment", value: counts.assessment },
        { key: "interview", label: "Interview", value: counts.interview },
        { key: "offer", label: "Offer", value: counts.offer },
        { key: "enrolled", label: "Enrolled", value: counts.enrolled },
      ],
    };
  });
  registerMockPattern("PATCH", "/v1/applications/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const ref = segments[segments.length - 1] ?? "";
    const { status } = (init.body ?? {}) as { status?: string };
    return {
      ok: true,
      ref,
      status: status ?? "screening",
      note: "",
      updatedAt: new Date().toISOString(),
    };
  });

  /* Parent portal (linked learners + gradebook) */
  registerMock("GET", "/v1/parent/students", async () => {
    await delay();
    return { items: mockParentStudents, total: mockParentStudents.length };
  });
  registerMockPattern("GET", "/v1/parent/students/*/finance", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const id = segments[segments.length - 2] ?? "";
    const summary = mockParentStudents.find((s) => s.studentId === id);
    if (!summary) throw new ApiError(404, "NOT_FOUND", "Student not found.");
    return {
      studentId: id,
      items: [
        {
          id: "INV-P01",
          party: "Tuition — Term 2 2025/26",
          amount: 1650000,
          due: "2026-05-15",
          status: "paid",
        },
        {
          id: "INV-P02",
          party: "Tuition — Term 3 2025/26 instalment",
          amount: 820000,
          due: "2026-08-10",
          status: "sent",
        },
      ],
      totals: { paid: 1650000, outstanding: 820000, count: 1 },
    };
  });
  registerMockPattern("GET", "/v1/parent/students/*/attendance", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const id = segments[segments.length - 2] ?? "";
    const summary = mockParentStudents.find((s) => s.studentId === id);
    if (!summary) throw new ApiError(404, "NOT_FOUND", "Student not found.");
    const items = [
      { id: "att-1", date: "2026-07-30", status: "present", note: "Morning standup + cohort work" },
      { id: "att-2", date: "2026-07-31", status: "present", note: "Backend practicum" },
      { id: "att-3", date: "2026-08-01", status: "late", note: "Arrived 05:45 for review session" },
      { id: "att-4", date: "2026-08-02", status: "excused", note: "Exam absence, pre-approved" },
      { id: "att-5", date: "2026-08-03", status: "present", note: "Deployment workshop" },
    ];
    return {
      studentId: id,
      pct: 80,
      counts: { present: 3, late: 1, excused: 1, absent: 0 },
      total: items.length,
      items,
    };
  });
  registerMockPattern("GET", "/v1/parent/students/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const id = segments[segments.length - 1] ?? "";
    return parentChildDetail(id);
  });

  /* Mentor matching (profiles + keyword match) */
  registerMock("GET", "/v1/mentor/profiles", async () => {
    await delay();
    return { items: mockMentors, total: mockMentors.length };
  });
  registerMock("POST", "/v1/mentor/match", async (init: ApiRequestInit) => {
    await delay();
    const { program = "", goal = "" } = (init.body ?? {}) as {
      program?: string;
      goal?: string;
    };
    const keywords = `${program} ${goal}`
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2);
    const scored = mockMentors
      .map((m) => {
        const haystack = [m.focus, ...m.areas, ...m.skills].join(" ").toLowerCase();
        const hits = keywords.length > 0 ? keywords.filter((w) => haystack.includes(w)).length : 1;
        const raw = keywords.length > 0 ? Math.round((hits / keywords.length) * 100) : 100;
        const match = Math.min(99, Math.max(40, Math.round(raw * 0.8 + m.rating * 10)));
        return { ...m, match };
      })
      .sort((a, b) => b.match - a.match);
    return { program, goal, matches: scored.slice(0, 3) };
  });

  /* Certificates (public verify) */
  registerMock("GET", "/v1/certificates/verify", async (init: ApiRequestInit) => {
    await delay();
    const path = new URL(`https://mock.local${init.path ?? "/"}`);
    const code = (path.searchParams.get("code") ?? "").trim().toUpperCase();
    if (code.length < 8) {
      throw new ApiError(400, "VALIDATION_ERROR", "Enter a valid certificate code.");
    }
    if (code === "CEA-CERT-2026-8F3K2Q") {
      return {
        valid: true,
        certificate: {
          code,
          title: "Full-Stack Software Development",
          issuedAt: "2026-07-14T10:00:00.000Z",
        },
      };
    }
    return { valid: false, message: "No certificate matches this code." };
  });

  /* Certificates (mine + issuance) */
  registerMock("GET", "/v1/certificates/mine", async () => {
    await delay();
    return {
      items: [
        {
          id: "cert-1",
          courseSlug: "full-stack-software-development",
          title: "Full-Stack Software Development",
          code: "CEA-CERT-2026-8F3K2Q",
          issuedAt: "2026-07-14T10:00:00.000Z",
        },
        {
          id: "cert-2",
          courseSlug: "career-readiness",
          title: "Career Readiness Passport",
          code: "CEA-CERT-2026-2T9Q0X",
          issuedAt: "2026-03-02T09:00:00.000Z",
        },
      ],
      total: 2,
    };
  });
  registerMock("GET", "/v1/certificates/candidates", async () => {
    await delay();
    return {
      items: [
        {
          id: "00000000-0000-4000-8000-000000000001",
          name: "Chiamaka Obi",
          email: "student@cea.ng",
          roleKey: "student",
        },
        {
          id: "usr-2",
          name: "Ifeanyi Duru",
          email: "instructor@cea.ng",
          roleKey: "instructor",
        },
      ],
      total: 2,
    };
  });
  registerMock("POST", "/v1/certificates", async (init: ApiRequestInit) => {
    await delay();
    const input = (init.body ?? {}) as {
      userId?: string;
      courseSlug?: string;
      title?: string;
    };
    if (!input.userId || !input.courseSlug || !input.title) {
      throw new ApiError(400, "VALIDATION_ERROR", "userId, courseSlug and title are required.");
    }
    return {
      id: crypto.randomUUID(),
      courseSlug: input.courseSlug,
      title: input.title,
      code: `CEA-${Math.random().toString(16).slice(2, 10).toUpperCase()}-${Math.random()
        .toString(16)
        .slice(2, 10)
        .toUpperCase()}`,
      issuedAt: new Date().toISOString(),
    };
  });

  /* Contact (public lead capture) */
  registerMock("POST", "/v1/contact", async (init: ApiRequestInit) => {
    await delay();
    const input = (init.body ?? {}) as { name?: string; email?: string; message?: string };
    if (!input.name || !input.email || !input.message) {
      throw new ApiError(400, "VALIDATION_ERROR", "name, email and message are required.");
    }
    return { ok: true };
  });

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

  /* Push send */
  registerMock("POST", "/v1/push/send", async (init: ApiRequestInit) => {
    await delay();
    const input = (init.body ?? {}) as { title?: string; body?: string };
    if (!input.title || !input.body) {
      throw new ApiError(400, "VALIDATION_ERROR", "title and body are required.");
    }
    return { sent: 1, removed: 0 };
  });

  /* Admin */
  registerMock("GET", "/v1/admin/users", async () => {
    await delay();
    return {
      items: systemUsers.map((u, i) => ({ id: `usr-${i + 1}`, ...u })),
      total: systemUsers.length,
    };
  });
  registerMock("GET", "/v1/admin/accounts", async () => {
    await delay();
    return {
      items: systemUsers.map((u, i) => ({
        id: `acc-${i + 1}`,
        name: u.name,
        email: u.email,
        roleKey: u.role.toLowerCase(),
        status: u.status.toLowerCase(),
        createdAt: "2026-01-15T09:00:00.000Z",
      })),
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
  registerMockPattern("PATCH", "/v1/invoices/*", async (init) => {
    await delay();
    const id = (init.path ?? "").split("/").pop() ?? "";
    const { status } = (init.body ?? {}) as { status?: string };
    return { ok: true, id, status: status ?? "paid" };
  });
  registerMockPattern("PATCH", "/v1/expenses/*", async (init) => {
    await delay();
    const id = (init.path ?? "").split("/").pop() ?? "";
    const { status } = (init.body ?? {}) as { status?: string };
    return { ok: true, id, status: status ?? "approved" };
  });
  registerMock("POST", "/v1/payroll/run", async () => {
    await delay();
    const now = new Date();
    return {
      ok: true,
      processed: 4,
      batch: {
        id: `pb-${Date.now()}`,
        batch: `Payroll · ${now.toLocaleDateString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })}`,
        count: 4,
        date: now.toISOString().slice(0, 10),
        status: "paid",
        amount: 0,
      },
      ranAt: now.toISOString(),
    };
  });

  /* Payments (checkout + history) */
  const createdCheckouts = new Map<
    string,
    { reference: string; amount: number; description: string }
  >();
  registerMock("POST", "/v1/payments/checkout", async (init: ApiRequestInit) => {
    await delay();
    const input = (init.body ?? {}) as { amount?: number; description?: string };
    const reference = `cea_mock_${Math.random().toString(16).slice(2, 10)}`;
    createdCheckouts.set(reference, {
      reference,
      amount: input.amount ?? 0,
      description: input.description ?? "",
    });
    registerMock("GET", `/v1/payments/session/${reference}`, async () => {
      await delay();
      const c = createdCheckouts.get(reference);
      if (!c) throw new ApiError(404, "NOT_FOUND", "Payment not found.");
      return {
        id: `pay-${c.reference}`,
        reference: c.reference,
        email: "student@cea.ng",
        amount: c.amount,
        currency: "NGN",
        status: "pending",
        provider: "paystack",
        description: c.description,
      };
    });
    return {
      reference,
      authorizationUrl: `https://checkout.paystack.com/${reference}`,
      mock: true,
    };
  });
  registerMockPattern("GET", "/v1/payments/verify/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const reference = segments[segments.length - 1] ?? "";
    const c = createdCheckouts.get(reference);
    if (!c) throw new ApiError(404, "NOT_FOUND", "Payment not found.");
    return {
      id: `pay-${c.reference}`,
      reference: c.reference,
      email: "student@cea.ng",
      amount: c.amount,
      currency: "NGN",
      status: "success",
      provider: "paystack",
      description: c.description,
      paidAt: new Date().toISOString(),
      verified: true,
    };
  });
  registerMock("GET", "/v1/payments/history", async () => {
    await delay();
    const created = [...createdCheckouts.values()].map((c) => ({
      id: `pay-${c.reference}`,
      reference: c.reference,
      email: "student@cea.ng",
      amount: c.amount,
      currency: "NGN",
      status: "pending",
      provider: "paystack",
      description: c.description,
    }));
    return { items: [...payments, ...created], total: payments.length + created.length };
  });
  for (const seeded of payments) {
    registerMock("GET", `/v1/payments/session/${seeded.reference}`, async () => {
      await delay();
      return seeded;
    });
  }

  /* Library — catalog is public; full library returns everything */
  const allLibraryItems = [...libraryItems, ...externalLinkItems];
  registerMock("GET", "/v1/library/catalog", async () => {
    await delay();
    const publicItems = allLibraryItems.filter((i) => !i.isProtected);
    return {
      sources: [
        {
          key: "ba-library",
          name: "Business Analysis Library",
          itemCount: libraryItems.filter((i) => !i.isProtected).length,
        },
        {
          key: "external",
          name: "External Resources",
          itemCount: externalLinkItems.length,
        },
      ],
      items: publicItems,
      total: publicItems.length,
    };
  });
  registerMock("GET", "/v1/library", async () => {
    await delay();
    return { items: allLibraryItems, total: allLibraryItems.length };
  });
  registerMockPattern("GET", "/v1/library/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const id = segments[segments.length - 1] ?? "";
    const item = allLibraryItems.find((i) => i.id === id);
    if (!item) throw new ApiError(404, "NOT_FOUND", "Library item not found.");
    return item;
  });

  /* Flags */
  const flagDefaults: Record<string, boolean> = {
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
  const flagOverrides: Record<string, boolean> = {};
  registerMock("GET", "/v1/flags", async () => {
    await delay();
    return { ...flagDefaults, ...flagOverrides };
  });
  registerMockPattern("PUT", "/v1/flags/*", async (init: ApiRequestInit) => {
    await delay();
    const key = (init.path ?? "").split("/").pop() ?? "";
    const { enabled } = (init.body ?? {}) as { enabled?: boolean };
    if (typeof enabled !== "boolean") {
      throw new ApiError(400, "VALIDATION_ERROR", "enabled must be a boolean.");
    }
    flagOverrides[key] = enabled;
    return { key, enabled, mock: true };
  });
  registerMockPattern("DELETE", "/v1/flags/*", async (init: ApiRequestInit) => {
    await delay();
    const key = (init.path ?? "").split("/").pop() ?? "";
    delete flagOverrides[key];
    return { key, enabled: false };
  });

  /* Ops suite — mirrors backend seeds (migrations/0014_ops.sql) */
  const opsCollections: Record<string, Record<string, unknown>[]> = {
    inventory: [
      {
        id: "inv-01",
        name: "Printer toner · HP 62",
        category: "Consumables",
        qty: 3,
        unit: "unit",
        reorderPoint: 5,
        autoReorder: 1,
        unitPrice: 35000,
        location: "Ikeja store",
      },
      {
        id: "inv-02",
        name: "A4 paper (reams)",
        category: "Stationery",
        qty: 48,
        unit: "ream",
        reorderPoint: 20,
        autoReorder: 0,
        unitPrice: 4500,
        location: "Ikeja store",
      },
      {
        id: "inv-03",
        name: "Laptop charger 65W",
        category: "Equipment",
        qty: 12,
        unit: "unit",
        reorderPoint: 5,
        autoReorder: 0,
        unitPrice: 18000,
        location: "Ikeja store",
      },
      {
        id: "inv-04",
        name: "Cafeteria gas (cylinder)",
        category: "Cafeteria",
        qty: 2,
        unit: "cylinder",
        reorderPoint: 3,
        autoReorder: 1,
        unitPrice: 48000,
        location: "Block B",
      },
      {
        id: "inv-05",
        name: "Whiteboard markers (box)",
        category: "Stationery",
        qty: 22,
        unit: "box",
        reorderPoint: 8,
        autoReorder: 0,
        unitPrice: 6000,
        location: "Ikeja store",
      },
      {
        id: "inv-06",
        name: "Wi-Fi access point",
        category: "Equipment",
        qty: 6,
        unit: "unit",
        reorderPoint: 2,
        autoReorder: 0,
        unitPrice: 65000,
        location: "Block A",
      },
      {
        id: "inv-07",
        name: "Generator fuel (litres)",
        category: "Utilities",
        qty: 140,
        unit: "litre",
        reorderPoint: 60,
        autoReorder: 1,
        unitPrice: 1100,
        location: "Power room",
      },
      {
        id: "inv-08",
        name: "Fire extinguisher 6kg",
        category: "Safety",
        qty: 9,
        unit: "unit",
        reorderPoint: 3,
        autoReorder: 0,
        unitPrice: 24000,
        location: "Block C",
      },
    ],
    "purchase-orders": [
      {
        id: "PO-2413",
        vendor: "OfficeMate",
        items: "Toner + paper",
        amount: 185000,
        eta: "2026-08-05",
        status: "open",
      },
      {
        id: "PO-2412",
        vendor: "GasMaster",
        items: "Cafeteria gas",
        amount: 96000,
        eta: "2026-08-07",
        status: "open",
      },
      {
        id: "PO-2411",
        vendor: "Compton Power",
        items: "Generator servicing",
        amount: 120000,
        eta: "2026-07-28",
        status: "delivered",
      },
    ],
    branches: [
      {
        id: "br-01",
        name: "Ikeja HQ",
        location: "Lagos · Main campus",
        capacity: 400,
        occupied: 342,
        staffOnsite: 42,
        costSeatDay: 8200,
        status: "healthy",
      },
      {
        id: "br-02",
        name: "Victoria Island",
        location: "Lagos · Executive center",
        capacity: 150,
        occupied: 118,
        staffOnsite: 28,
        costSeatDay: 9600,
        status: "steady",
      },
      {
        id: "br-03",
        name: "Abeokuta",
        location: "Ogun · Satellite",
        capacity: 120,
        occupied: 64,
        staffOnsite: 12,
        costSeatDay: 11400,
        status: "underused",
      },
    ],
    rooms: [
      {
        id: "rm-01",
        name: "Lab 3 · 40 seats",
        block: "Block B",
        seats: 40,
        nextEvent: "DevOps class · 10:00",
        status: "available",
      },
      {
        id: "rm-02",
        name: "Seminar room · 60 seats",
        block: "Block A",
        seats: 60,
        nextEvent: "Workshop · 13:00",
        status: "available",
      },
      {
        id: "rm-03",
        name: "Studio · 24 seats",
        block: "Block C",
        seats: 24,
        nextEvent: "Design sprint · 09:30",
        status: "available",
      },
      {
        id: "rm-04",
        name: "Lab 1 · 32 seats",
        block: "Block A",
        seats: 32,
        nextEvent: "Free",
        status: "available",
      },
    ],
    maintenance: [
      { id: "mnt-01", title: "AC repair — Lab 2", detail: "Assigned · today", status: "open" },
      {
        id: "mnt-02",
        title: "Generator servicing — Block B",
        detail: "Scheduled · today 15:00",
        status: "open",
      },
      { id: "mnt-03", title: "Fire extinguisher inspection", detail: "Due Aug 12", status: "open" },
    ],
    vendors: [
      { id: "ven-01", name: "OfficeMate", category: "Stationery", rating: 4.8, status: "active" },
      { id: "ven-02", name: "GasMaster", category: "Cafeteria gas", rating: 4.6, status: "active" },
      {
        id: "ven-03",
        name: "Compton Power",
        category: "Generator servicing",
        rating: 3.9,
        status: "watch",
      },
    ],
    contracts: [
      {
        id: "con-01",
        title: "OfficeMate annual supply",
        renews: "Renews Nov 2026",
        valueYr: 2400000,
        status: "active",
      },
      {
        id: "con-02",
        title: "GasMaster delivery SLA",
        renews: "Renews Sep 2026",
        valueYr: 1100000,
        status: "active",
      },
    ],
    tasks: [
      {
        id: "op-01",
        title: "Weekend cleaning rota",
        assignee: "Facilities team",
        detail: "Today · 5/5 done",
        done: 1,
      },
      {
        id: "op-02",
        title: "ISP failover test",
        assignee: "IT support",
        detail: "Today · 17:00",
        done: 0,
      },
      {
        id: "op-03",
        title: "Store stock count — Block A",
        assignee: "Store keeper",
        detail: "Thu · 08:00",
        done: 0,
      },
      {
        id: "op-04",
        title: "Security patrol log review",
        assignee: "Security lead",
        detail: "Fri · 16:00",
        done: 0,
      },
    ],
    workflows: [
      {
        id: "wf-01",
        name: "Visitor badge → notify host",
        triggerDetail: "Trigger: visitor checks in",
        stats: "38 runs · 0 errors",
        status: "active",
      },
      {
        id: "wf-02",
        name: "Low stock → supplier PO",
        triggerDetail: "Trigger: SKU below reorder point",
        stats: "11 runs · 2 approvals",
        status: "active",
      },
      {
        id: "wf-03",
        name: "Room book → AC + lights",
        triggerDetail: "Trigger: booking confirmed",
        stats: "9 runs · sync OK",
        status: "active",
      },
    ],
  };
  registerMockPattern("GET", "/v1/ops/*", async (init: ApiRequestInit) => {
    await delay();
    const key = (init.path ?? "").split("/").filter(Boolean).pop() ?? "";
    const items = opsCollections[key] ?? [];
    return { items, total: items.length };
  });

  /* IT suite — mirrors backend seeds (migrations/0015_it.sql) */
  const itTickets = [
    {
      id: "TKT-1042",
      subject: "Projector fails in Lab 2",
      reporter: "Ms. Chidera",
      priority: "P1",
      sla: "SLA 2h",
      elapsed: "1h elapsed",
      status: "assigned",
    },
    {
      id: "TKT-1041",
      subject: "New starter laptop setup",
      reporter: "Admissions officer",
      priority: "P2",
      sla: "SLA 24h",
      elapsed: "3h elapsed",
      status: "in progress",
    },
    {
      id: "TKT-1040",
      subject: "WiFi dropouts — Block C",
      reporter: "Facilities",
      priority: "P1",
      sla: "SLA 2h",
      elapsed: "30m elapsed",
      status: "investigating",
    },
    {
      id: "TKT-1039",
      subject: "Printer toner request",
      reporter: "Store keeper",
      priority: "P3",
      sla: "SLA 72h",
      elapsed: "10h elapsed",
      status: "queued",
    },
    {
      id: "TKT-1038",
      subject: "Whiteboard camera pairing",
      reporter: "Mrs. Obi",
      priority: "P2",
      sla: "SLA 24h",
      elapsed: "5h elapsed",
      status: "solved",
    },
  ];
  const itCollections: Record<string, Record<string, unknown>[]> = {
    tickets: itTickets,
    articles: [
      {
        id: "art-01",
        title: "WiFi onboarding — staff",
        views: 412,
        helpfulPct: 96,
        category: "network",
      },
      {
        id: "art-02",
        title: "Printer setup guide",
        views: 318,
        helpfulPct: 91,
        category: "printers",
      },
      {
        id: "art-03",
        title: "Laptop provisioning checklist",
        views: 204,
        helpfulPct: 88,
        category: "hardware",
      },
    ],
    assets: [
      {
        id: "ast-01",
        name: "Laptop · HP EliteBook · #L-0142",
        assignedTo: "Ms. Chidera",
        category: "laptop",
        status: "in use",
      },
      {
        id: "ast-02",
        name: "Laptop · Dell Latitude · #L-0143",
        assignedTo: "New starter",
        category: "laptop",
        status: "provisioning",
      },
      {
        id: "ast-03",
        name: "Server · App node 2",
        assignedTo: "Infra",
        category: "server",
        status: "healthy",
      },
      {
        id: "ast-04",
        name: 'Monitor · Dell 24" · #M-0211',
        assignedTo: "Accounts",
        category: "peripheral",
        status: "in use",
      },
      {
        id: "ast-05",
        name: "Laptop · Lenovo ThinkPad · #L-0144",
        assignedTo: "J. Okonkwo",
        category: "laptop",
        status: "repair",
      },
    ],
    licenses: [
      {
        id: "lic-01",
        product: "Adobe Creative Cloud",
        seats: 24,
        inUse: 20,
        renews: "Renews Oct 2026",
        status: "active",
      },
      {
        id: "lic-02",
        product: "Microsoft 365",
        seats: 120,
        inUse: 96,
        renews: "Renews Jan 2027",
        status: "active",
      },
      {
        id: "lic-03",
        product: "Figma Pro",
        seats: 30,
        inUse: 18,
        renews: "Renews Sep 2026",
        status: "active",
      },
      {
        id: "lic-04",
        product: "Notion Team",
        seats: 40,
        inUse: 26,
        renews: "Renews Dec 2026",
        status: "active",
      },
    ],
    services: [
      {
        id: "svc-01",
        name: "Learning platform",
        uptime: "99.98%",
        latency: "23 ms",
        status: "healthy",
      },
      { id: "svc-02", name: "Portal + API", uptime: "99.95%", latency: "41 ms", status: "healthy" },
      { id: "svc-03", name: "Campus WiFi", uptime: "98.2%", latency: "—", status: "healthy" },
      {
        id: "svc-04",
        name: "Video conferencing",
        uptime: "99.1%",
        latency: "—",
        status: "degraded",
      },
    ],
    windows: [
      {
        id: "win-01",
        title: "Platform maintenance",
        windowText: "Aug 8 · 02:00–04:00",
        status: "scheduled",
      },
      {
        id: "win-02",
        title: "Backup infrastructure upgrade",
        windowText: "Aug 15 · 01:00–03:00",
        status: "scheduled",
      },
      {
        id: "win-03",
        title: "WiFi controller firmware",
        windowText: "Jul 26 · completed",
        status: "done",
      },
    ],
    sessions: [
      {
        id: "rs-01",
        name: "Ms. Chidera — Lab 2 projector",
        detail: "Active · 12 min",
        status: "live",
      },
      {
        id: "rs-02",
        name: "Mrs. Obi — Wi-Fi dropouts",
        detail: "Scheduled 14:30",
        status: "upcoming",
      },
      {
        id: "rs-03",
        name: "Registrar — printer queue",
        detail: "Completed · 8 min",
        status: "done",
      },
    ],
    templates: [
      { id: "tpl-01", title: "New starter — full setup", uses: 12, status: "active" },
      { id: "tpl-02", title: "WiFi troubleshooting", uses: 24, status: "active" },
      { id: "tpl-03", title: "Printer / peripheral fault", uses: 9, status: "active" },
      { id: "tpl-04", title: "Account access reset", uses: 5, status: "draft" },
    ],
    accounts: [
      { id: "usr-01", name: "Ms. Chidera", role: "Instructor · DevOps", status: "active" },
      { id: "usr-02", name: "New starter", role: "Admissions officer", status: "awaiting invite" },
      { id: "usr-03", name: "J. Okonkwo", role: "Data analyst", status: "offboarded" },
      { id: "usr-04", name: "Mrs. Obi", role: "Learning design", status: "active" },
    ],
  };
  registerMockPattern("GET", "/v1/it/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const key = segments[segments.length - 1] ?? "";
    const ticket = itTickets.find((t) => t.id === key);
    if (ticket) {
      return {
        ...ticket,
        events: [
          { event: "Ticket created", whenText: "Today 08:30" },
          { event: "Assigned to you", whenText: "Today 08:45" },
          { event: "Remote check — confirmed with reporter", whenText: "Today 09:10" },
        ],
      };
    }
    const items = itCollections[key] ?? [];
    return { items, total: items.length };
  });
}
