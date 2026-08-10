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

  /* Public application status lookup by reference code */
  registerMockPattern("GET", "/v1/applications/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const ref = (segments[segments.length - 1] ?? "CEA-2026-0142").toUpperCase();
    const pipeline = [
      { key: "submitted", label: "Application received" },
      { key: "screening", label: "Screening" },
      { key: "assessment", label: "Assessment" },
      { key: "interview", label: "Interview" },
      { key: "offer", label: "Offer" },
      { key: "enrolled", label: "Enrolled" },
    ];
    const status = pipeline[(ref.length + ref.charCodeAt(0)) % pipeline.length]!.key;
    const idx = pipeline.findIndex((s) => s.key === status);
    const programs = [
      "Full-Stack Software Development",
      "UI/UX Design",
      "Backend Engineering",
      "Data Analytics",
    ];
    return {
      ref,
      status,
      programTitle: programs[ref.length % programs.length] ?? null,
      stages: pipeline.map((s, i) => ({ ...s, done: i < idx, active: i === idx })),
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
    registerMock("GET", `/v1/assignments/${assignment.id}/submission`, async () => {
      await delay();
      return {
        id: `sub-${assignment.id}`,
        status: assignment.status === "graded" ? "graded" : "submitted",
        score: assignment.score ?? null,
        feedback: assignment.status === "graded" ? "Rubric feedback attached." : "",
        submitted: "Jul 28, 9:14am",
        graded_at: assignment.status === "graded" ? "Aug 1, 2:00pm" : null,
        late: 0,
        file: "starter-repo-link",
        size: "GitHub",
      };
    });
    registerMock("POST", `/v1/assignments/${assignment.id}/submit`, async () => {
      await delay(300);
      return {
        id: `sub-${assignment.id}`,
        assignmentId: assignment.id,
        status: "submitted",
        submittedAt: new Date().toISOString(),
        late: false,
        file: "starter-repo-link",
        size: "GitHub",
      };
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
    registerMock("POST", `/v1/messages/threads/${thread.id}/messages`, async (init) => {
      await delay(150);
      const body = (init.body ?? {}) as { body?: string };
      return { text: body.body ?? "", time: "Just now", mine: true };
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
    registerMock("PATCH", `/v1/instructor/submissions/${submission.id}`, async (init) => {
      await delay(300);
      const body = (init?.body ?? {}) as { score?: number; feedback?: string };
      return {
        id: submission.id,
        score: body.score ?? 0,
        status: "graded",
        feedback: body.feedback,
        gradedBy: "instructor@cea.ng",
        gradedAt: new Date().toISOString(),
      };
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

  /* Mentor dashboard — mirrors backend seeds (migrations/0016_mentor_dashboard.sql) */
  const mntMentees = [
    {
      id: "mn-ada",
      name: "Ada Okafor",
      track: "Backend specialisation",
      cohort: "Cohort 15",
      sinceDate: "Feb 2026",
      status: "active",
    },
    {
      id: "mn-tobi",
      name: "Tobi Adeyemi",
      track: "DevOps",
      cohort: "Cohort 15",
      sinceDate: "Feb 2026",
      status: "active",
    },
    {
      id: "mn-zainab",
      name: "Zainab Yusuf",
      track: "Product design",
      cohort: "Cohort 16",
      sinceDate: "Jun 2026",
      status: "active",
    },
  ];
  const mntSessions = [
    {
      id: "ms-01",
      title: "Ada Okafor — goal review",
      datetimeText: "Fri, Aug 21 · 16:00",
      mode: "Video",
      status: "upcoming",
      notes: "Focus: NaijaEats demo-day checklist, EXPLAIN practice, follow-up booking.",
    },
    {
      id: "ms-02",
      title: "Tobi Adeyemi — exam prep",
      datetimeText: "Sat, Aug 22 · 11:00",
      mode: "On campus",
      status: "upcoming",
      notes: "Review CI/CD exam pattern and practice exercises.",
    },
    {
      id: "ms-03",
      title: "Zainab Yusuf — portfolio feedback",
      datetimeText: "Tue, Aug 25 · 14:30",
      mode: "Video",
      status: "upcoming",
      notes: "Portfolio v2 review — case study depth and copy.",
    },
    {
      id: "ms-04",
      title: "Ada Okafor — mock interview",
      datetimeText: "Thu, Jul 28 · 15:00",
      mode: "Video",
      status: "completed",
      notes: "Strong system design answers. Book follow-up on behavioural questions.",
    },
    {
      id: "ms-05",
      title: "Tobi Adeyemi — career check-in",
      datetimeText: "Mon, Jul 14 · 12:00",
      mode: "On campus",
      status: "completed",
      notes: "Confirmed path to DevOps cert. Shared study roadmap.",
    },
  ];
  const mntCollections: Record<string, Record<string, unknown>[]> = {
    mentees: mntMentees,
    sessions: mntSessions,
    goals: [
      {
        id: "mg-01",
        menteeId: "mn-ada",
        title: "NaijaEats demo day",
        progressPct: 90,
        dueDate: "Aug 30",
        status: "on track",
      },
      {
        id: "mg-02",
        menteeId: "mn-ada",
        title: "Backend certification",
        progressPct: 60,
        dueDate: "Oct 15",
        status: "on track",
      },
      {
        id: "mg-03",
        menteeId: "mn-ada",
        title: "Interview readiness",
        progressPct: 35,
        dueDate: "Nov 1",
        status: "needs focus",
      },
      {
        id: "mg-04",
        menteeId: "mn-tobi",
        title: "CI/CD certification",
        progressPct: 55,
        dueDate: "Sep 20",
        status: "on track",
      },
      {
        id: "mg-05",
        menteeId: "mn-zainab",
        title: "Portfolio launch",
        progressPct: 40,
        dueDate: "Sep 5",
        status: "needs focus",
      },
      {
        id: "mg-06",
        menteeId: "mn-ada",
        title: "First internship application",
        progressPct: 25,
        dueDate: "Oct 1",
        status: "new",
      },
    ],
    requests: [
      {
        id: "mr-01",
        requesterName: "Hauwa Bello",
        track: "Cloud & DevOps · Cohort 16",
        why: "Wants help planning her AWS certification path.",
        status: "pending",
      },
      {
        id: "mr-02",
        requesterName: "Seun Adeleke",
        track: "Full-Stack · Cohort 16",
        why: "Career switcher from civil engineering — needs a roadmap.",
        status: "pending",
      },
    ],
    availability: [
      { id: "av-01", day: "Mon", hours: "15:00 – 18:00", isOpen: 1 },
      { id: "av-02", day: "Tue", hours: "15:00 – 18:00", isOpen: 0 },
      { id: "av-03", day: "Wed", hours: "15:00 – 18:00", isOpen: 1 },
      { id: "av-04", day: "Thu", hours: "15:00 – 18:00", isOpen: 0 },
      { id: "av-05", day: "Fri", hours: "15:00 – 18:00", isOpen: 1 },
      { id: "av-06", day: "Sat", hours: "10:00 – 13:00", isOpen: 1 },
    ],
    resources: [
      {
        id: "res-01",
        groupTitle: "Session templates",
        items: ["Goal review · 45 min", "Mock interview · 60 min", "Portfolio critique · 30 min"],
      },
      {
        id: "res-02",
        groupTitle: "Career toolkit",
        items: ["CV rubric v3", "Interview question bank (120+)", "Salary guide 2026"],
      },
      {
        id: "res-03",
        groupTitle: "Learning support",
        items: ["SQL exercise pack", "Systems design scenarios", "Debugging drills"],
      },
      {
        id: "res-04",
        groupTitle: "Reports & feedback",
        items: ["Progress report template", "Endorsement guide", "Goal-setting worksheet"],
      },
    ],
    conversations: [
      {
        id: "mc-01",
        name: "Ada Okafor",
        track: "Backend specialisation",
        preview: "Thursday 18:00 works. I'll send the link.",
        timeLabel: "14:11",
        unread: 1,
      },
      {
        id: "mc-02",
        name: "Tobi Adeyemi",
        track: "DevOps",
        preview: "CI/CD cert material is ready for review",
        timeLabel: "09:45",
        unread: 0,
      },
      {
        id: "mc-03",
        name: "Zainab Yusuf",
        track: "Product design",
        preview: "Portfolio v2 — can we review on Friday?",
        timeLabel: "Yesterday",
        unread: 1,
      },
      {
        id: "mc-04",
        name: "Halima Bello",
        track: "Career switch",
        preview: "Welcome to the mentorship program!",
        timeLabel: "Jul 28",
        unread: 0,
      },
    ],
  };
  const mntPortfolio = [
    {
      id: "mp-01",
      projectName: "NaijaEats — food delivery API",
      status: "Featured",
      stars: 5,
      feedback: "REST API, 40+ endpoints, strong docs",
    },
    {
      id: "mp-02",
      projectName: "BudgetPadi — expense tracker",
      status: "Live",
      stars: 4,
      feedback: "Clean PWA, good offline UX",
    },
    {
      id: "mp-03",
      projectName: "ClassBoard — LMS UI",
      status: "In review",
      stars: 4,
      feedback: "Design system depth impressive",
    },
  ];
  const mntSkills = [
    { id: "msk-01", skillName: "Database design", endorsed: 1 },
    { id: "msk-02", skillName: "REST API development", endorsed: 1 },
    { id: "msk-03", skillName: "System design basics", endorsed: 0 },
    { id: "msk-04", skillName: "Technical writing", endorsed: 0 },
  ];
  const mntCareer = [
    {
      id: "map-01",
      role: "Junior Backend Engineer",
      company: "Paystack",
      stage: "Interview",
      appliedDate: "Aug 5",
    },
    {
      id: "map-02",
      role: "Backend Intern",
      company: "Kuda",
      stage: "Take-home",
      appliedDate: "Jul 28",
    },
    {
      id: "map-03",
      role: "Software Eng. Trainee",
      company: "Andela",
      stage: "Applied",
      appliedDate: "Jul 20",
    },
    {
      id: "map-04",
      role: "Junior Developer",
      company: "Flutterwave",
      stage: "Rejected",
      appliedDate: "Jul 12",
    },
  ];
  const mntThread = [
    {
      id: "mt-01",
      fromLabel: "You",
      body: "Great mock interview today. Let's book a goal review for next week.",
      timeLabel: "10:00",
    },
    {
      id: "mt-02",
      fromLabel: "Ada",
      body: "Thanks! Thursday 18:00 works for me.",
      timeLabel: "13:30",
    },
    {
      id: "mt-03",
      fromLabel: "You",
      body: "Let's do a goal review + demo-day checklist then.",
      timeLabel: "13:45",
    },
    {
      id: "mt-04",
      fromLabel: "Ada",
      body: "Perfect — I'll send the link before the session.",
      timeLabel: "14:11",
    },
  ];
  registerMockPattern("GET", "/v1/mentor-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const id = segments[3] ?? "";
    if (segments.length >= 5 && collection === "mentees") {
      const sub = segments[4] ?? "";
      if (sub === "portfolio") return { items: mntPortfolio, total: mntPortfolio.length };
      if (sub === "skills") return { items: mntSkills, total: mntSkills.length };
      if (sub === "career") return { items: mntCareer, total: mntCareer.length };
    }
    if (id) {
      if (collection === "sessions") {
        const session = mntSessions.find((s) => s.id === id);
        if (session) {
          return {
            ...session,
            actions: [
              { id: "ma-01", title: "Share demo-day checklist with Ada", done: 1 },
              { id: "ma-02", title: "Send EXPLAIN practice exercise", done: 1 },
              { id: "ma-03", title: "Book follow-up interview prep", done: 0 },
              { id: "ma-04", title: "Endorse Database Design skill", done: 0 },
            ],
          };
        }
      }
      if (collection === "mentees") {
        const mentee = mntMentees.find((m) => m.id === id);
        if (mentee) {
          return {
            ...mentee,
            goals: (mntCollections.goals ?? []).filter((g) => g.menteeId === id),
          };
        }
      }
      if (collection === "conversations") {
        const convo = mntCollections.conversations?.find((c) => c.id === id);
        if (convo) return { ...convo, thread: mntThread };
      }
    }
    const items = mntCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Intern dashboard — mirrors backend seeds (migrations/0017_intern.sql) */
  const intTasks = [
    {
      id: "it-task-01",
      title: "CI pipeline fix — Jenkins job",
      status: "in-progress",
      dueLabel: "Due Fri",
      category: "DevOps",
    },
    {
      id: "it-task-02",
      title: "Monitoring dashboard widgets",
      status: "assigned",
      dueLabel: "Due Aug 12",
      category: "Data",
    },
    {
      id: "it-task-03",
      title: "Infra docs update",
      status: "assigned",
      dueLabel: "Due Aug 15",
      category: "Docs",
    },
    {
      id: "it-task-04",
      title: "Load test report",
      status: "approved",
      dueLabel: "Done Jul 29",
      category: "QA",
    },
    {
      id: "it-task-05",
      title: "API rate-limit test results",
      status: "in-review",
      dueLabel: "Due today",
      category: "QA",
    },
    {
      id: "it-task-06",
      title: "Docker image audit",
      status: "assigned",
      dueLabel: "Due Aug 18",
      category: "DevOps",
    },
    {
      id: "it-task-07",
      title: "Staging env provisioning",
      status: "in-progress",
      dueLabel: "Due Aug 20",
      category: "Cloud",
    },
    {
      id: "it-task-08",
      title: "Alert threshold tuning",
      status: "assigned",
      dueLabel: "Due Aug 24",
      category: "Monitoring",
    },
    {
      id: "it-task-09",
      title: "Release notes for v2.4",
      status: "approved",
      dueLabel: "Done Jul 25",
      category: "Docs",
    },
    {
      id: "it-task-10",
      title: "Postgres backup verification",
      status: "approved",
      dueLabel: "Done Jul 22",
      category: "Data",
    },
    {
      id: "it-task-11",
      title: "New relic dashboard sync",
      status: "assigned",
      dueLabel: "Due Aug 28",
      category: "Monitoring",
    },
    {
      id: "it-task-12",
      title: "Incident post-mortem summary",
      status: "approved",
      dueLabel: "Done Jul 18",
      category: "Docs",
    },
  ];
  const intTimesheets = [
    { id: "its-01", weekLabel: "Jul 27 – Jul 31", hours: 38, status: "approved" },
    { id: "its-02", weekLabel: "Jul 20 – Jul 24", hours: 40, status: "approved" },
    { id: "its-03", weekLabel: "Jul 13 – Jul 17", hours: 36, status: "pending" },
    { id: "its-04", weekLabel: "Jul 6 – Jul 10", hours: 40, status: "approved" },
    { id: "its-05", weekLabel: "Jun 29 – Jul 3", hours: 28, status: "approved" },
  ];
  const intMentorSessions = [
    {
      id: "itm-01",
      title: "Sprint planning & career roadmap",
      dateText: "Wed 10:00",
      durationText: "60 min",
      status: "upcoming",
    },
    {
      id: "itm-02",
      title: "Career direction & growth plan",
      dateText: "Jul 24",
      durationText: "45 min",
      status: "completed",
    },
    {
      id: "itm-03",
      title: "CI/CD deep dive",
      dateText: "Jul 10",
      durationText: "60 min",
      status: "completed",
    },
    {
      id: "itm-04",
      title: "Onboarding & expectations",
      dateText: "Jun 26",
      durationText: "40 min",
      status: "completed",
    },
  ];
  const intMilestones = [
    { id: "itmst-01", title: "Onboarding & environment setup", progressPct: 100, status: "done" },
    { id: "itmst-02", title: "Linux & scripting fundamentals", progressPct: 100, status: "done" },
    {
      id: "itmst-03",
      title: "CI/CD pipeline fundamentals",
      progressPct: 65,
      status: "in progress",
    },
    { id: "itmst-04", title: "Monitoring & alerting", progressPct: 40, status: "in progress" },
    { id: "itmst-05", title: "Containerization basics", progressPct: 30, status: "in progress" },
    { id: "itmst-06", title: "Cloud provisioning basics", progressPct: 0, status: "not started" },
  ];
  const intSkills = [
    { id: "itsk-01", name: "Linux", mastery: "mastered" },
    { id: "itsk-02", name: "Git & branching", mastery: "mastered" },
    { id: "itsk-03", name: "Bash scripting", mastery: "mastered" },
    { id: "itsk-04", name: "Docker basics", mastery: "mastered" },
    { id: "itsk-05", name: "CI/CD fundamentals", mastery: "mastered" },
    { id: "itsk-06", name: "Incident response", mastery: "mastered" },
    { id: "itsk-07", name: "Jenkins", mastery: "learning" },
    { id: "itsk-08", name: "Terraform", mastery: "learning" },
    { id: "itsk-09", name: "Kubernetes", mastery: "learning" },
    { id: "itsk-10", name: "Prometheus", mastery: "learning" },
    { id: "itsk-11", name: "Grafana", mastery: "learning" },
    { id: "itsk-12", name: "PostgreSQL", mastery: "learning" },
    { id: "itsk-13", name: "AWS CLI", mastery: "learning" },
    { id: "itsk-14", name: "Python", mastery: "learning" },
    { id: "itsk-15", name: "CloudWatch", mastery: "learning" },
    { id: "itsk-16", name: "Helm", mastery: "learning" },
    { id: "itsk-17", name: "GitHub Actions", mastery: "learning" },
    { id: "itsk-18", name: "Nginx", mastery: "learning" },
  ];
  const intResources = [
    { id: "itr-01", title: "DevOps roadmap v2026", kind: "link" },
    { id: "itr-02", title: "Jenkins pipeline examples", kind: "link" },
    { id: "itr-03", title: "Terraform getting-started", kind: "guide" },
    { id: "itr-04", title: "Kubernetes in 3 hours", kind: "course" },
    { id: "itr-05", title: "Monitoring cheatsheet", kind: "guide" },
    { id: "itr-06", title: "Incident runbook template", kind: "template" },
    { id: "itr-07", title: "Bash scripting practice", kind: "exercises" },
    { id: "itr-08", title: "CI/CD anti-patterns", kind: "article" },
    { id: "itr-09", title: "Database backup playbook", kind: "guide" },
    { id: "itr-10", title: "Interview prep for SRE", kind: "guide" },
    { id: "itr-11", title: "AWS Cloud Practitioner notes", kind: "course" },
    { id: "itr-12", title: "Nginx base configs", kind: "reference" },
  ];
  const intEvaluations = [
    { id: "ite-01", kind: "self", score: 4.2, status: "submitted" },
    { id: "ite-02", kind: "supervisor", score: 4.0, status: "completed" },
    { id: "ite-03", kind: "final", score: 0, status: "due week 12" },
  ];
  const intProjects = [
    {
      id: "itp-01",
      title: "CI pipeline modernization",
      category: "DevOps",
      artifacts: 3,
      views: 36,
      status: "featured",
    },
    {
      id: "itp-02",
      title: "Monitoring dashboard",
      category: "Data",
      artifacts: 2,
      views: 28,
      status: "active",
    },
    {
      id: "itp-03",
      title: "Infra runbooks",
      category: "Docs",
      artifacts: 5,
      views: 22,
      status: "active",
    },
  ];
  const intConversations = [
    {
      id: "itc-01",
      name: "Ms. Chidera · Supervisor",
      preview: "Re: pipeline fix — looks good",
      timeLabel: "09:12",
      unread: 1,
    },
    {
      id: "itc-02",
      name: "DevOps team",
      preview: "Standup notes · 09:12",
      timeLabel: "09:14",
      unread: 0,
    },
    {
      id: "itc-03",
      name: "HR · Onboarding",
      preview: "Evaluation reminder · Jul 30",
      timeLabel: "Jul 30",
      unread: 2,
    },
  ];
  const intThread = [
    {
      id: "ith-01",
      fromLabel: "You",
      body: "CI pipeline fix is deployed to staging, tests green.",
      timeLabel: "Yesterday 17:20",
    },
    {
      id: "ith-02",
      fromLabel: "Ms. Chidera",
      body: "Nice work — I gave it a quick review, looks good.",
      timeLabel: "Yesterday 18:05",
    },
    {
      id: "ith-03",
      fromLabel: "Ms. Chidera",
      body: "Let us walk through the release checklist on Monday.",
      timeLabel: "Today 09:12",
    },
  ];
  registerMockPattern("GET", "/v1/intern-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const id = segments[3] ?? "";
    if (id) {
      if (collection === "conversations") {
        const convo = intConversations.find((c) => c.id === id);
        if (convo) return { ...convo, thread: intThread };
      }
    }
    const collections: Record<string, Record<string, unknown>[]> = {
      tasks: intTasks,
      timesheets: intTimesheets,
      "mentor-sessions": intMentorSessions,
      milestones: intMilestones,
      skills: intSkills,
      resources: intResources,
      evaluations: intEvaluations,
      projects: intProjects,
      conversations: intConversations,
    };
    const items = collections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Supplier + Partner dashboard suites — mirrors backend seeds (migrations/0018_supplier_partner.sql) */
  const supOrders = [
    {
      id: "sup-po-01",
      ref: "PO-2413",
      items: "Toner HP 62 x6, A4 paper x20",
      amount: 185000,
      dueLabel: "Due Aug 5",
      status: "confirmed",
    },
    {
      id: "sup-po-02",
      ref: "PO-2412",
      items: "Cafeteria gas cylinders x4",
      amount: 96000,
      dueLabel: "Due Aug 7",
      status: "pending confirm",
    },
    {
      id: "sup-po-03",
      ref: "PO-2408",
      items: "Desk chairs x10",
      amount: 310000,
      dueLabel: "Delivered Jul 24",
      status: "completed",
    },
    {
      id: "sup-po-04",
      ref: "PO-2405",
      items: "Whiteboard markers x40",
      amount: 85000,
      dueLabel: "Delivered Jul 10",
      status: "completed",
    },
    {
      id: "sup-po-05",
      ref: "PO-2402",
      items: "Printer drums x3",
      amount: 132000,
      dueLabel: "Delivered Jul 3",
      status: "completed",
    },
  ];
  const supDeliveries = [
    {
      id: "sup-dl-01",
      poLabel: "PO-2413 · Toner + paper",
      whenLabel: "Aug 5 · 10:00",
      toLabel: "Ikeja HQ · store",
      status: "scheduled",
    },
    {
      id: "sup-dl-02",
      poLabel: "PO-2412 · Gas cylinders",
      whenLabel: "Aug 7 · 09:00",
      toLabel: "Ikeja HQ · cafeteria",
      status: "scheduled",
    },
    {
      id: "sup-dl-03",
      poLabel: "PO-2408 · Chairs",
      whenLabel: "Jul 24 · 11:30",
      toLabel: "VI campus",
      status: "delivered",
    },
    {
      id: "sup-dl-04",
      poLabel: "PO-2405 · Markers",
      whenLabel: "Jul 10 · 14:00",
      toLabel: "Satellite lab",
      status: "delivered",
    },
  ];
  const supInvoices = [
    {
      id: "sup-inv-01",
      ref: "INV-8821",
      amount: 385000,
      issuedLabel: "Issued Jul 28 · net-30",
      paidLabel: "",
      status: "awaiting payment",
    },
    {
      id: "sup-inv-02",
      ref: "INV-8740",
      amount: 255000,
      issuedLabel: "Issued Jul 10",
      paidLabel: "Paid Jul 29",
      status: "paid",
    },
    {
      id: "sup-inv-03",
      ref: "INV-8695",
      amount: 310000,
      issuedLabel: "Issued Jun 28",
      paidLabel: "Paid Jul 15",
      status: "paid",
    },
    {
      id: "sup-inv-04",
      ref: "INV-8610",
      amount: 120000,
      issuedLabel: "Issued Jun 14",
      paidLabel: "Paid Jun 28",
      status: "paid",
    },
  ];
  const supPerformance = [
    { id: "sup-pf-01", metric: "Overall", valueLabel: "4.8" },
    { id: "sup-pf-02", metric: "Delivery on-time", valueLabel: "100%" },
    { id: "sup-pf-03", metric: "Quality of goods", valueLabel: "4.9 / 5" },
    { id: "sup-pf-04", metric: "Responsiveness", valueLabel: "4.7 / 5" },
    { id: "sup-pf-05", metric: "Pricing fairness", valueLabel: "4.6 / 5" },
  ];
  const supCerts = [
    { id: "sup-crt-01", title: "CAC registration", detail: "Verified 2024", verified: 1 },
    { id: "sup-crt-02", title: "Quality service cert", detail: "Renews Jan 2027", verified: 1 },
  ];
  const supConversations = [
    {
      id: "sup-conv-01",
      name: "CEA Procurement",
      preview: "Re: PO-2413 delivery window",
      timeLabel: "Today 08:40",
      unread: 1,
    },
    {
      id: "sup-conv-02",
      name: "CEA Accounts",
      preview: "INV-8821 processing · Jul 31",
      timeLabel: "Jul 31",
      unread: 0,
    },
    {
      id: "sup-conv-03",
      name: "CEA Store",
      preview: "Chairs received, thanks!",
      timeLabel: "Jul 24",
      unread: 0,
    },
  ];
  const supThread = [
    {
      id: "sup-th-01",
      fromLabel: "CEA Procurement",
      body: "Can we move the PO-2413 delivery to the morning window on Aug 5?",
      timeLabel: "Yesterday 16:20",
    },
    {
      id: "sup-th-02",
      fromLabel: "You",
      body: "Yes, 10:00 works for us — confirming now.",
      timeLabel: "Yesterday 17:05",
    },
    {
      id: "sup-th-03",
      fromLabel: "CEA Procurement",
      body: "Confirmed. Store will sign for it.",
      timeLabel: "Today 08:40",
    },
  ];
  registerMockPattern("GET", "/v1/supplier-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const id = segments[3] ?? "";
    if (id) {
      if (collection === "conversations") {
        const convo = supConversations.find((c) => c.id === id);
        if (convo) return { ...convo, thread: supThread };
      }
    }
    const collections: Record<string, Record<string, unknown>[]> = {
      orders: supOrders,
      deliveries: supDeliveries,
      invoices: supInvoices,
      performance: supPerformance,
      certs: supCerts,
      conversations: supConversations,
    };
    const items = collections[collection] ?? [];
    return { items, total: items.length };
  });

  const ptnAgreements = [
    {
      id: "ptn-agr-01",
      title: "Master partnership agreement",
      detail: "Signed Feb 2025",
      status: "active",
      renewLabel: "renews Feb 2027",
    },
    {
      id: "ptn-agr-02",
      title: "Revenue share addendum",
      detail: "Signed Jan 2026 · 12% share",
      status: "active",
      renewLabel: "",
    },
    {
      id: "ptn-agr-03",
      title: "Event co-branding MOU",
      detail: "Draft · review by Aug 10",
      status: "draft",
      renewLabel: "",
    },
  ];
  const ptnCollaborations = [
    {
      id: "ptn-coll-01",
      title: "Tech Skills Bootcamp",
      detail: "Aug 22 · Ikeja HQ",
      status: "scheduled",
    },
    {
      id: "ptn-coll-02",
      title: "Employer roundtable",
      detail: "Sep 10 · VI campus",
      status: "confirmed",
    },
    {
      id: "ptn-coll-03",
      title: "Hackathon sponsorship",
      detail: "Proposal with marketing",
      status: "in discussion",
    },
  ];
  const ptnReferrals = [
    { id: "ptn-ref-01", name: "Tola Bakare", status: "Enrolled", valueLabel: "₦120,000" },
    { id: "ptn-ref-02", name: "Musa Danjuma", status: "Applied", valueLabel: "Pending" },
    { id: "ptn-ref-03", name: "Ngozi Eze", status: "Contacted", valueLabel: "—" },
  ];
  const ptnResources = [
    {
      id: "ptn-res-01",
      title: "Co-branded logo kit",
      kind: "logo",
      detail: "PNG · SVG · 12 assets",
    },
    {
      id: "ptn-res-02",
      title: "Program flyer templates",
      kind: "flyer",
      detail: "Figma · 4 sizes",
    },
    {
      id: "ptn-res-03",
      title: "Partner brand guidelines",
      kind: "guidelines",
      detail: "PDF · v2.1",
    },
    { id: "ptn-res-04", title: "Email banner set", kind: "banner", detail: "PNG · 6 variants" },
  ];
  const ptnReports = [
    {
      id: "ptn-rep-01",
      title: "Q3 revenue share statement",
      detail: "Aug 2 · PDF",
      kind: "revenue-share",
      valueLabel: "₦1.9m",
    },
    {
      id: "ptn-rep-02",
      title: "Referral impact report",
      detail: "Jul 31 · PDF",
      kind: "referral-impact",
      valueLabel: "₦720k",
    },
    {
      id: "ptn-rep-03",
      title: "Co-branded event recap",
      detail: "Jul 20 · Slides",
      kind: "event-recap",
      valueLabel: "",
    },
  ];
  const ptnConversations = [
    {
      id: "ptn-conv-01",
      name: "CEA Partnerships team",
      preview: "Re: Hackathon sponsorship — sent today",
      timeLabel: "Today 09:15",
      unread: 2,
    },
    {
      id: "ptn-conv-02",
      name: "Marketing · co-branding",
      preview: "New banner set ready — Aug 1",
      timeLabel: "Aug 1",
      unread: 0,
    },
    {
      id: "ptn-conv-03",
      name: "Ops · procurement",
      preview: "PO-2413 confirmation — Jul 29",
      timeLabel: "Jul 29",
      unread: 0,
    },
  ];
  const ptnThread = [
    {
      id: "ptn-th-01",
      fromLabel: "CEA Partnerships team",
      body: "Following up on the hackathon sponsorship — the marketing team has a slot.",
      timeLabel: "Yesterday 15:02",
    },
    {
      id: "ptn-th-02",
      fromLabel: "You",
      body: "Great — sending our one-pager and budget ask today.",
      timeLabel: "Yesterday 16:45",
    },
    {
      id: "ptn-th-03",
      fromLabel: "CEA Partnerships team",
      body: "Received. Sending to the sponsorship committee.",
      timeLabel: "Today 09:15",
    },
  ];
  registerMockPattern("GET", "/v1/partner-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const id = segments[3] ?? "";
    if (id) {
      if (collection === "conversations") {
        const convo = ptnConversations.find((c) => c.id === id);
        if (convo) return { ...convo, thread: ptnThread };
      }
    }
    const collections: Record<string, Record<string, unknown>[]> = {
      agreements: ptnAgreements,
      collaborations: ptnCollaborations,
      referrals: ptnReferrals,
      resources: ptnResources,
      reports: ptnReports,
      conversations: ptnConversations,
    };
    const items = collections[collection] ?? [];
    return { items, total: items.length };
  });

  const volOpportunities = [
    {
      id: "vol-opp-01",
      title: "Career fair booth support",
      dateLabel: "Aug 20",
      locationLabel: "Ikeja HQ",
      slotsFilled: 4,
      slotsTotal: 6,
      priority: 0,
    },
    {
      id: "vol-opp-02",
      title: "Mentor hour for Cohort 15",
      dateLabel: "Weekly · online",
      locationLabel: "Online",
      slotsFilled: 2,
      slotsTotal: 5,
      priority: 1,
    },
    {
      id: "vol-opp-03",
      title: "Community outreach — Abeokuta",
      dateLabel: "Sep 5 · with NGO partner",
      locationLabel: "Abeokuta",
      slotsFilled: 10,
      slotsTotal: 15,
      priority: 0,
    },
  ];
  const volSignups = [
    {
      id: "vol-sg-01",
      title: "Career fair booth support",
      detail: "Jul 18 · 6h · attended",
      hours: 6,
      attended: 1,
      upcoming: 0,
    },
    {
      id: "vol-sg-02",
      title: "Community outreach — Ikeja",
      detail: "Jun 28 · 5h · attended",
      hours: 5,
      attended: 1,
      upcoming: 0,
    },
    {
      id: "vol-sg-03",
      title: "Mentor hour Cohort 15",
      detail: "Next · Aug 14",
      hours: null,
      attended: 0,
      upcoming: 1,
    },
  ];
  const volMetrics = [
    { id: "vol-mt-01", metric: "Learners mentored", valueLabel: "14", detail: "across 3 cohorts" },
    { id: "vol-mt-02", metric: "Outreach events", valueLabel: "6", detail: "640 people reached" },
    { id: "vol-mt-03", metric: "Hours served", valueLabel: "47", detail: "estimated ₦2.3m value" },
    { id: "vol-mt-04", metric: "Communities", valueLabel: "2", detail: "Ikeja + Abeokuta" },
  ];
  const volHours = [
    {
      id: "vol-hr-01",
      title: "Career fair booth",
      dateLabel: "Jul 18 · 10:00–16:00",
      hours: 6,
      status: "approved",
    },
    {
      id: "vol-hr-02",
      title: "Community outreach",
      dateLabel: "Jun 28 · 09:00–14:00",
      hours: 5,
      status: "approved",
    },
    {
      id: "vol-hr-03",
      title: "Alumni event support",
      dateLabel: "Jun 10 · 12:00–16:00",
      hours: 4,
      status: "pending",
    },
  ];
  const volGroups = [
    { id: "vol-gr-01", name: "Ikeja volunteers", members: 34, online: 3 },
    { id: "vol-gr-02", name: "Outreach squad", members: 18, online: 5 },
    { id: "vol-gr-03", name: "Mentor hours", members: 22, online: 2 },
  ];
  const volCerts = [
    {
      id: "vol-ct-01",
      title: "Volunteer appreciation — 40h",
      detail: "Issued Jul 31 · #CEA-VOL-042",
    },
    { id: "vol-ct-02", title: "Outreach champion", detail: "Issued Jun 30 · #CEA-VOL-031" },
  ];
  const volMonths = [
    { id: "vol-mo-01", month: "July", pct: 34 },
    { id: "vol-mo-02", month: "June", pct: 42 },
    { id: "vol-mo-03", month: "May", pct: 12 },
    { id: "vol-mo-04", month: "April", pct: 8 },
  ];
  registerMockPattern("GET", "/v1/volunteer-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const collections: Record<string, Record<string, unknown>[]> = {
      opportunities: volOpportunities,
      signups: volSignups,
      impact: volMetrics,
      hours: volHours,
      groups: volGroups,
      certs: volCerts,
      months: volMonths,
    };
    const items = collections[collection] ?? [];
    return { items, total: items.length };
  });

  const recAppointments = [
    {
      id: "rec-ap-01",
      title: "Mr. Adeyemi — meeting room 2",
      detail: "10:00 · 45 min",
      who: "Oluwaseun Adebayo",
      status: "arrived",
    },
    {
      id: "rec-ap-02",
      title: "Registrar — records room",
      detail: "10:30 · 30 min",
      who: "Mrs. Ngozi Eze",
      status: "confirmed",
    },
    {
      id: "rec-ap-03",
      title: "HR — interview room A",
      detail: "11:15 · 60 min",
      who: "Tobi Adeyemi",
      status: "confirmed",
    },
    {
      id: "rec-ap-04",
      title: "Career office — counselling",
      detail: "13:00 · 30 min",
      who: "Zainab Yusuf",
      status: "available",
    },
  ];
  const recQueue = [
    {
      id: "rec-qq-01",
      name: "Oluwaseun Adebayo",
      hostLabel: "Mr. Adeyemi",
      purpose: "Meeting 10:00",
      timeLabel: "Waiting",
    },
    {
      id: "rec-qq-02",
      name: "Mrs. Ngozi Eze",
      hostLabel: "Registrar",
      purpose: "Records 10:30",
      timeLabel: "Waiting",
    },
  ];
  const recInside = [
    {
      id: "rec-qn-01",
      name: "Oluwaseun Adebayo",
      sinceLabel: "In since 10:02 · 1h 12m",
      badgeLabel: "Green · visitor",
    },
    {
      id: "rec-qn-02",
      name: "Mrs. Ngozi Eze",
      sinceLabel: "In since 10:31 · 43m",
      badgeLabel: "Green · visitor",
    },
    {
      id: "rec-qn-03",
      name: "Ada Okafor",
      sinceLabel: "In since 09:00 · resident",
      badgeLabel: "Blue · student",
    },
  ];
  const recDeliveries = [
    {
      id: "rec-dl-01",
      carrier: "OfficeMate Ltd",
      item: "Printer toner ×6",
      timeLabel: "Aug 3 · 10:20",
      status: "awaiting pickup",
    },
    {
      id: "rec-dl-02",
      carrier: "Books2Africa",
      item: "Textbooks (42 cartons)",
      timeLabel: "Aug 3 · 09:10",
      status: "with library",
    },
    {
      id: "rec-dl-03",
      carrier: "DHL",
      item: "Server part",
      timeLabel: "Aug 2 · 16:30",
      status: "with IT",
    },
  ];
  const recInquiries = [
    {
      id: "rec-inq-01",
      name: "Bola Johnson",
      topic: "Full-Stack programme",
      timeLabel: "Aug 3 · 09:15",
      stage: "Follow-up booked",
    },
    {
      id: "rec-inq-02",
      name: "Femi Alabi",
      topic: "Scholarship eligibility",
      timeLabel: "Aug 2 · 14:40",
      stage: "Sent to admissions",
    },
    {
      id: "rec-inq-03",
      name: "Chiamaka Obi",
      topic: "Campus tour + brochure",
      timeLabel: "Aug 1 · 11:05",
      stage: "Tour booked",
    },
  ];
  const recCalls = [
    {
      id: "rec-cl-01",
      name: "Mrs. Okafor (parent)",
      topic: "Billing question",
      timeLabel: "10:12 · 6 min",
      kind: "answered",
    },
    {
      id: "rec-cl-02",
      name: "TechHub Ltd",
      topic: "Partnership inquiry",
      timeLabel: "09:40 · 4 min",
      kind: "answered",
    },
    {
      id: "rec-cl-03",
      name: "Unknown",
      topic: "Missed — voicemail",
      timeLabel: "09:05",
      kind: "missed",
    },
    {
      id: "rec-cl-04",
      name: "NGO partner",
      topic: "Program update",
      timeLabel: "08:30 · 8 min",
      kind: "answered",
    },
  ];
  const recStaff = [
    {
      id: "rec-st-01",
      name: "Mr. Adeyemi",
      role: "Instructor · Backend",
      extension: "Ext 210",
      office: "Block B, R12",
    },
    {
      id: "rec-st-02",
      name: "Ms. Chidera",
      role: "Instructor · DevOps",
      extension: "Ext 211",
      office: "Block B, R13",
    },
    {
      id: "rec-st-03",
      name: "Mrs. Obi",
      role: "Mentor coordinator",
      extension: "Ext 134",
      office: "Block A, R04",
    },
    {
      id: "rec-st-04",
      name: "Registrar's office",
      role: "Records & billing",
      extension: "Ext 100",
      office: "Block A, R01",
    },
  ];
  const recTasks = [
    {
      id: "rec-ts-01",
      title: "Morning mail to registrar",
      timeLabel: "08:30 · done",
      done: 1,
    },
    {
      id: "rec-ts-02",
      title: "Verify visitor badges after lunch",
      timeLabel: "13:00",
      done: 0,
    },
    {
      id: "rec-ts-03",
      title: "Update phone log follow-ups",
      timeLabel: "15:00",
      done: 0,
    },
    {
      id: "rec-ts-04",
      title: "Handover notes + desk report",
      timeLabel: "17:00",
      done: 0,
    },
  ];
  const recHandover = [
    { id: "rec-hv-01", note: "Oluwaseun waiting — remind Mr. Adeyemi" },
    { id: "rec-hv-02", note: "Printer toner at desk for IT pickup" },
    { id: "rec-hv-03", note: "Tour group booked 14:30 (12 people)" },
  ];
  registerMockPattern("GET", "/v1/receptionist-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const collections: Record<string, Record<string, unknown>[]> = {
      appointments: recAppointments,
      queue: recQueue,
      inside: recInside,
      deliveries: recDeliveries,
      inquiries: recInquiries,
      calls: recCalls,
      staff: recStaff,
      tasks: recTasks,
      handover: recHandover,
    };
    const items = collections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Government suite — mirrors backend seeds (migrations/0020_government.sql) */
  const govtCollections: Record<string, Record<string, unknown>[]> = {
    overview: [
      { id: "govt-ov-01", metric: "Compliance score", valueLabel: "92", delta: "of 100" },
      { id: "govt-ov-02", metric: "Open findings", valueLabel: "1", delta: "low priority" },
      { id: "govt-ov-03", metric: "Filings (year)", valueLabel: "14", delta: "0 overdue" },
      { id: "govt-ov-04", metric: "Next review", valueLabel: "2027", delta: "Feb · on track" },
    ],
    calendar: [
      {
        id: "govt-cl-01",
        title: "Audit inspection",
        dateLabel: "Sep 18 · on-site",
        status: "Scheduled",
      },
      {
        id: "govt-cl-02",
        title: "Tuition fee schedule filing",
        dateLabel: "Aug 30 · online",
        status: "Upcoming",
      },
      {
        id: "govt-cl-03",
        title: "Q3 enrolment census",
        dateLabel: "Oct 15 · online",
        status: "Upcoming",
      },
    ],
    changes: [
      {
        id: "govt-ch-01",
        title: "NDPR enforcement guidelines v2",
        detail: "Effective Aug 01 · CEA compliant",
        status: "Compliant",
      },
      {
        id: "govt-ch-02",
        title: "Tuition fee disclosure rules",
        detail: "Effective Jul 01 · CEA compliant",
        status: "Compliant",
      },
      {
        id: "govt-ch-03",
        title: "Student data retention policy",
        detail: "Effective Oct 01 · CEA reviewing",
        status: "In review",
      },
    ],
    documents: [
      {
        id: "govt-dc-01",
        title: "Academic policy handbook",
        versionLabel: "v4.2 · Jul 2026",
        status: "Current",
      },
      {
        id: "govt-dc-02",
        title: "Tuition & fees policy",
        versionLabel: "v2.1 · Jan 2026",
        status: "Current",
      },
      {
        id: "govt-dc-03",
        title: "Student conduct code",
        versionLabel: "v3.0 · Sep 2025",
        status: "Reviewing",
      },
    ],
    facts: [
      { id: "govt-ft-01", label: "Registration", value: "RC 1423784 · CAC" },
      { id: "govt-ft-02", label: "Licence", value: "MBBS/PC/2024/0142 · NUC" },
      { id: "govt-ft-03", label: "Branches", value: "3 · Lagos, Abuja, Port Harcourt" },
      { id: "govt-ft-04", label: "Academic board", value: "Constituted · 11 members" },
    ],
    reports: [
      {
        id: "govt-rp-01",
        title: "Annual compliance report — 2025/26",
        detail: "Fiscal year close · filed",
        status: "Filed",
      },
      {
        id: "govt-rp-02",
        title: "Student enrolment census — Q2",
        detail: "Due Aug 15 · ready",
        status: "Ready",
      },
      {
        id: "govt-rp-03",
        title: "Financial statement — audited",
        detail: "FY 2025 · approved",
        status: "Filed",
      },
    ],
    threads: [
      {
        id: "govt-th-01",
        title: "Re: accreditation evidence — awaiting 2 documents",
        fromLabel: "CEA compliance office",
        timeLabel: "Jul 30 · 14:02",
        status: "Open",
      },
      {
        id: "govt-th-02",
        title: "Q2 census filing confirmation",
        fromLabel: "Federal Ministry of Education",
        timeLabel: "Jul 14 · 09:30",
        status: "Closed",
      },
      {
        id: "govt-th-03",
        title: "Facilities audit scheduling",
        fromLabel: "CEA compliance office",
        timeLabel: "Jul 08 · 11:12",
        status: "Closed",
      },
    ],
    checks: [
      {
        id: "govt-ck-01",
        title: "Enrolment vs census",
        detail: "Matches filed Q2 census",
        status: "Pass",
      },
      {
        id: "govt-ck-02",
        title: "Financials vs audited",
        detail: "Matches audited FY25 statement",
        status: "Pass",
      },
      {
        id: "govt-ck-03",
        title: "Facilities register",
        detail: "1 of 18 pending re-certification",
        status: "Flagged",
      },
    ],
    audits: [
      {
        id: "govt-ad-01",
        title: "Institutional audit — FY 2025",
        detail: "Completed Mar 12 · 92/100",
        status: "Closed",
      },
      {
        id: "govt-ad-02",
        title: "Facilities compliance check",
        detail: "Scheduled Sep 18",
        status: "Planned",
      },
      {
        id: "govt-ad-03",
        title: "Financial record inspection",
        detail: "Finding #2 · remediation due Aug 30",
        status: "Open",
      },
    ],
    filings: [
      {
        id: "govt-fl-01",
        title: "Q2 enrolment census",
        detail: "Filed Jul 14 · ref FED-2026-0142",
        status: "Filed",
      },
      {
        id: "govt-fl-02",
        title: "Tuition fee schedule",
        detail: "Due Aug 30 · drafted",
        status: "Draft",
      },
      {
        id: "govt-fl-03",
        title: "Annual returns 2025",
        detail: "Filed Apr 02 · ref FED-2026-0089",
        status: "Filed",
      },
    ],
    courses: [
      {
        id: "govt-cr-01",
        title: "Data protection (NDPR)",
        detail: "88 staff certified",
        status: "Current",
      },
      {
        id: "govt-cr-02",
        title: "Child safeguarding",
        detail: "214 staff certified",
        status: "Current",
      },
      {
        id: "govt-cr-03",
        title: "Academic integrity",
        detail: "46 certified · 12 pending",
        status: "Renewing",
      },
    ],
  };
  registerMockPattern("GET", "/v1/government-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const items = govtCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Behavioral design suite — mirrors backend seeds (migrations/0021_behavioral.sql) */
  const bdCollections: Record<string, Record<string, unknown>[]> = {
    overview: [
      { id: "bd-hb-01", metric: "Live experiments", valueLabel: "7", delta: "2 winning" },
      { id: "bd-hb-02", metric: "Avg. lift", valueLabel: "+7.4%", delta: "across wins" },
      { id: "bd-hb-03", metric: "Funnels mapped", valueLabel: "11", delta: "2 to redesign" },
      { id: "bd-hb-04", metric: "Segments explored", valueLabel: "9", delta: "2 new this qtr" },
    ],
    interventions: [
      {
        id: "bd-in-01",
        title: "Streak & streak-saver",
        goal: "Daily lesson consistency",
        mechanism: "Loss-framed reminder after 6pm",
        effort: "Low",
        evidence: "RCT · 2025",
        testsRun: 100,
        status: "Live",
      },
      {
        id: "bd-in-02",
        title: "Commitment email before drop-off",
        goal: "Cut mid-course churn",
        mechanism: "Self-pledge + peer account",
        effort: "Low",
        evidence: "Quasi-exp · 2025",
        testsRun: 62,
        status: "In test",
      },
      {
        id: "bd-in-03",
        title: "Deadline anchoring in apply flow",
        goal: "Faster enrolment decisions",
        mechanism: "Cohort start-date anchor",
        effort: "Medium",
        evidence: "A/B · live",
        testsRun: 41,
        status: "Testing",
      },
    ],
    flows: [
      { id: "bd-fl-01", name: "New learner activation", stage: 6, status: "Live" },
      { id: "bd-fl-02", name: "Week-3 retention rescue", stage: 5, status: "Draft" },
      { id: "bd-fl-03", name: "Referral ask after cert", stage: 4, status: "Draft" },
    ],
    "flow-steps": [
      {
        id: "bd-fs-01",
        flowId: "activation",
        stepNo: 1,
        title: "Enrolment confirmed",
        subtitle: "Trigger · 5 min delay",
      },
      {
        id: "bd-fs-02",
        flowId: "activation",
        stepNo: 2,
        title: "Welcome message",
        subtitle: "WhatsApp + email",
      },
      {
        id: "bd-fs-03",
        flowId: "activation",
        stepNo: 3,
        title: "Set weekly goal",
        subtitle: "In-app prompt · 3 options",
      },
      {
        id: "bd-fs-04",
        flowId: "activation",
        stepNo: 4,
        title: "First lesson complete?",
        subtitle: "Branch on completion",
      },
    ],
    campaigns: [
      {
        id: "bd-cg-01",
        title: "Streak saver — evening",
        trigger: "Missed 2 lessons before 6pm",
        channel: "WhatsApp",
        sends: "1,240",
        optOut: "0.8%",
        status: "Live",
      },
      {
        id: "bd-cg-02",
        title: "Deadline anchor — cohort 17",
        trigger: "Viewed apply page twice",
        channel: "Email",
        sends: "860",
        optOut: "1.1%",
        status: "Live",
      },
      {
        id: "bd-cg-03",
        title: "Referral thank-you",
        trigger: "Successful referral paid",
        channel: "In-app",
        sends: "312",
        optOut: "0.4%",
        status: "Scheduled",
      },
    ],
    tests: [
      {
        id: "bd-ab-01",
        name: "Streak nudge wording",
        variants: 2,
        sampleLabel: "2,400",
        liftLabel: "+9%",
        sigLabel: "95.2%",
        status: "Winning",
      },
      {
        id: "bd-ab-02",
        name: "Deadline anchor position",
        variants: 3,
        sampleLabel: "3,100",
        liftLabel: "+6%",
        sigLabel: "91.4%",
        status: "Live",
      },
      {
        id: "bd-ab-03",
        name: "Goal-setting prompt",
        variants: 2,
        sampleLabel: "1,800",
        liftLabel: "+3%",
        sigLabel: "68.0%",
        status: "Running",
      },
    ],
    results: [
      {
        id: "bd-rl-01",
        metric: "Streak nudges — Weekly lessons",
        baseline: "+4.2%",
        changeLabel: "+9.1%",
        status: "Winning",
      },
      {
        id: "bd-rl-02",
        metric: "Deadline anchoring — Submissions",
        baseline: "+3.1%",
        changeLabel: "+6.4%",
        status: "Live",
      },
      {
        id: "bd-rl-03",
        metric: "Commitment emails — Churn",
        baseline: "−1.8%",
        changeLabel: "−4.0%",
        status: "Running",
      },
    ],
    stages: [
      { id: "bd-fu-01", name: "Signup", users: 8400, percent: 100, status: "Complete" },
      { id: "bd-fu-02", name: "First lesson started", users: 5376, percent: 64, status: "Opening" },
      { id: "bd-fu-03", name: "Week-2 active", users: 3864, percent: 46, status: "Losing" },
      { id: "bd-fu-04", name: "Week-4 still enrolled", users: 3024, percent: 36, status: "Open" },
      {
        id: "bd-fu-05",
        name: "First assessment passed",
        users: 2352,
        percent: 28,
        status: "Closed",
      },
    ],
    segments: [
      {
        id: "bd-sg-01",
        name: "Weekend warriors",
        size: 1120,
        traits: "Evening study · mobile-first · deadline-driven",
        status: "Mapped",
      },
      {
        id: "bd-sg-02",
        name: "Career switchers",
        size: 980,
        traits: "28-40 · low time budget · job-focused",
        status: "Mapped",
      },
      {
        id: "bd-sg-03",
        name: "Early adopters",
        size: 640,
        traits: "High streak · referral active · forum posters",
        status: "Mapped",
      },
      {
        id: "bd-sg-04",
        name: "At-risk lurkers",
        size: 520,
        traits: "Enrolled 30d+ · no lesson in 7d",
        status: "Flagged",
      },
    ],
    programs: [
      {
        id: "bd-pr-01",
        name: "Daily 15-minute lesson",
        goal: "30-day streak",
        streak: "12d avg",
        status: "Live",
      },
      {
        id: "bd-pr-02",
        name: "Weekly portfolio commit",
        goal: "8-week project cadence",
        streak: "5w avg",
        status: "Live",
      },
      {
        id: "bd-pr-03",
        name: "Peer accountability pair",
        goal: "Bi-weekly check-ins",
        streak: "3w avg",
        status: "Pilot",
      },
    ],
    checkins: [
      {
        id: "bd-ck-01",
        learner: "Ada Obi",
        cycle: "Daily lesson",
        streak: "21d",
        status: "Checked in",
      },
      {
        id: "bd-ck-02",
        learner: "Tunde Bakare",
        cycle: "Portfolio commit",
        streak: "6w",
        status: "Checked in",
      },
      {
        id: "bd-ck-03",
        learner: "Chiamaka Eze",
        cycle: "Daily lesson",
        streak: "9d",
        status: "Due soon",
      },
      {
        id: "bd-ck-04",
        learner: "Ngozi Adeyemi",
        cycle: "Peer pair",
        streak: "1w",
        status: "Due today",
      },
    ],
  };
  registerMockPattern("GET", "/v1/behavioral-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const items = bdCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Product marketing suite — mirrors backend seeds (migrations/0022_product_marketing.sql) */
  const pmCollections: Record<string, Record<string, unknown>[]> = {
    overview: [
      { id: "pm-hb-01", metric: "Launches in flight", valueLabel: "3", delta: "1 live now" },
      { id: "pm-hb-02", metric: "Positioning docs", valueLabel: "7", delta: "2 in review" },
      { id: "pm-hb-03", metric: "Competitors tracked", valueLabel: "9", delta: "2 new this qtr" },
      { id: "pm-hb-04", metric: "Win rate", valueLabel: "68%", delta: "+5 pts QoQ" },
    ],
    phases: [
      {
        id: "pm-ph-01",
        launch: "Parent app — Beta",
        phase: "Phase 1 — Discovery",
        pct: 100,
        status: "Complete",
      },
      {
        id: "pm-ph-02",
        launch: "Parent app — Beta",
        phase: "Phase 2 — Build & validate",
        pct: 64,
        status: "In progress",
      },
      {
        id: "pm-ph-03",
        launch: "Employer talent pass",
        phase: "Phase 3 — Launch",
        pct: 12,
        status: "Upcoming",
      },
    ],
    tasks: [
      { id: "pm-ts-01", title: "Beta waitlist page live", owner: "Chiamaka Eze", status: "Done" },
      {
        id: "pm-ts-02",
        title: "Pricing FAQ for beta cohort",
        owner: "Tunde Bakare",
        status: "In review",
      },
      { id: "pm-ts-03", title: "Store listing screenshots", owner: "Ada Obi", status: "Doing" },
      { id: "pm-ts-04", title: "Launch blog + social kit", owner: "Ngozi Adeyemi", status: "Todo" },
    ],
    gates: [
      {
        id: "pm-gt-01",
        phase: "Discovery",
        gate: "Market sizing sign-off",
        owner: "Emeka Okafor",
        dueLabel: "Jun 12",
        status: "Done",
      },
      {
        id: "pm-gt-02",
        phase: "Build",
        gate: "Beta waitlist ≥ 500",
        owner: "Ada Obi",
        dueLabel: "Jul 25",
        status: "On track",
      },
      {
        id: "pm-gt-03",
        phase: "Build",
        gate: "Onboarding walkthrough QA",
        owner: "Tunde Bakare",
        dueLabel: "Aug 02",
        status: "At risk",
      },
      {
        id: "pm-gt-04",
        phase: "Launch",
        gate: "Release approval",
        owner: "Chiamaka Eze",
        dueLabel: "Aug 14",
        status: "Planned",
      },
    ],
    statements: [
      {
        id: "pm-st-01",
        product: "CEA-OS core LMS",
        statement:
          "For ambitious Nigerians who want global careers, CEA-OS is the academy that pairs live Lagos classes with a portfolio employers trust.",
        audience: "Working adults 18-35 · Lagos, Abuja",
        pain: "Degrees don't convert to jobs",
        benefit: "Hire-ready in 9 months",
      },
      {
        id: "pm-st-02",
        product: "Employer talent pass",
        statement:
          "For HR teams hiring in Nigeria, the talent pass is a verified pipeline of job-ready graduates with recorded skills evidence.",
        audience: "HR leaders · 50+ employers",
        pain: "Entry-level hires are risky",
        benefit: "88% of pass hires stay 6mo",
      },
      {
        id: "pm-st-03",
        product: "Parent app",
        statement:
          "For parents funding education, the parent app turns fees into progress reports with weekly learner insights.",
        audience: "Parents · 35-55 · diaspora",
        pain: "Fees paid, outcomes unclear",
        benefit: "Weekly skill milestones",
      },
    ],
    messagehouse: [
      { id: "pm-mh-01", label: "Primary message", value: "From Lagos classroom to global job" },
      { id: "pm-mh-02", label: "Proof point", value: "92% placement within 6 months" },
      { id: "pm-mh-03", label: "Tone of voice", value: "Ambitious, concrete, proud" },
      { id: "pm-mh-04", label: "Avoid", value: "Get-rich-quick framing" },
    ],
    competitors: [
      {
        id: "pm-cp-01",
        name: "Skilledge NG",
        focus: "Coding bootcamps",
        strength: "Strong Lagos brand",
        weakness: "No employer pass",
        notes: "Won 2 of 3 deals Q3",
      },
      {
        id: "pm-cp-02",
        name: "Aptbridge",
        focus: "Corporate training",
        strength: "Enterprise sales team",
        weakness: "Dated LMS UX",
        notes: "Won 1 of 2 this month",
      },
      {
        id: "pm-cp-03",
        name: "GlobalPath",
        focus: "UK placement focus",
        strength: "Strong diaspora links",
        weakness: "Weak portfolio tooling",
        notes: "Active on parent app deal",
      },
    ],
    features: [
      { id: "pm-fv-01", capability: "Live Lagos classes", cea: 1, skilledge: 1, aptbridge: 0 },
      { id: "pm-fv-02", capability: "Employer talent pass", cea: 1, skilledge: 0, aptbridge: 1 },
      { id: "pm-fv-03", capability: "Portfolio builder", cea: 1, skilledge: 1, aptbridge: 0 },
      { id: "pm-fv-04", capability: "Diaspora financing", cea: 1, skilledge: 0, aptbridge: 0 },
      { id: "pm-fv-05", capability: "Data & AI track", cea: 1, skilledge: 1, aptbridge: 0 },
    ],
    launches: [
      {
        id: "pm-ln-01",
        name: "Parent app beta",
        dateLabel: "Aug 14, 2026",
        phase: "Phase 2 — Build",
        owner: "Ada Obi",
        status: "On track",
      },
      {
        id: "pm-ln-02",
        name: "Employer talent pass 2.0",
        dateLabel: "Sep 04, 2026",
        phase: "Phase 1 — Discovery",
        owner: "Tunde Bakare",
        status: "Discovery",
      },
      {
        id: "pm-ln-03",
        name: "Data & AI track",
        dateLabel: "Oct 09, 2026",
        phase: "Phase 1 — Discovery",
        owner: "Chiamaka Eze",
        status: "Planned",
      },
    ],
    readiness: [
      { id: "pm-rd-01", label: "Messaging & positioning", pct: 100, status: "Done" },
      { id: "pm-rd-02", label: "Beta onboarding flow", pct: 78, status: "Building" },
      { id: "pm-rd-03", label: "Support & FAQ", pct: 42, status: "In review" },
      { id: "pm-rd-04", label: "Store listing assets", pct: 15, status: "Queued" },
    ],
    studies: [
      {
        id: "pm-sd-01",
        title: "Employer hiring signals — Lagos",
        detail: "What 40 HR leaders screen for",
        sample: "n=40 interviews",
        method: "Interviews",
        status: "Published",
      },
      {
        id: "pm-sd-02",
        title: "Parent willingness to pay",
        detail: "Fee elasticity for parent app",
        sample: "n=320 survey",
        method: "Survey",
        status: "In field",
      },
      {
        id: "pm-sd-03",
        title: "Diaspora funding behaviour",
        detail: "UK diaspora monthly education spend",
        sample: "n=180 survey",
        method: "Survey + diary",
        status: "In review",
      },
    ],
    findings: [
      {
        id: "pm-fn-01",
        title: "88% of parents want weekly progress proof",
        tag: "Critical — parent app",
      },
      {
        id: "pm-fn-02",
        title: "HR screens for portfolio, not certificates",
        tag: "Critical — positioning",
      },
      { id: "pm-fn-03", title: "Diaspora parents pay ₦180k-₦250k per term", tag: "Pricing input" },
      { id: "pm-fn-04", title: "Referrals drive 18% of signups", tag: "Growth input" },
    ],
    matrix: [
      {
        id: "pm-mx-01",
        product: "Core LMS",
        audience: "Working adults",
        message: "Build skills that Lagos employers actually pay for.",
        proof: "92% placement in 6 months",
        status: "Approved",
      },
      {
        id: "pm-mx-02",
        product: "Core LMS",
        audience: "Parents",
        message: "Every naira of fees becomes a visible skill milestone.",
        proof: "4.8 rating from 2,100 parents",
        status: "In review",
      },
      {
        id: "pm-mx-03",
        product: "Talent pass",
        audience: "HR leaders",
        message: "Hire graduates whose skills were verified on the job.",
        proof: "88% stay past 6 months",
        status: "Approved",
      },
      {
        id: "pm-mx-04",
        product: "Talent pass",
        audience: "Students",
        message: "A job pass that comes with the portfolio to back it.",
        proof: "34 hires via pass in 2026",
        status: "Draft",
      },
    ],
    briefs: [
      {
        id: "pm-br-01",
        title: "Parent app beta launch",
        objective: "1,000 waitlist signups in 3 weeks",
        audience: "Diaspora parents 35-55",
        channels: "Meta + LinkedIn + Email",
        metric: "Waitlist CVR ≥ 12%",
        status: "Approved",
      },
      {
        id: "pm-br-02",
        title: "Talent pass employer outreach",
        objective: "20 new employer signups this quarter",
        audience: "HR leaders · Lagos tech",
        channels: "LinkedIn + Events",
        metric: "Demo requests ≥ 40",
        status: "In review",
      },
      {
        id: "pm-br-03",
        title: "Data & AI track teaser",
        objective: "Pre-launch awareness for Oct track",
        audience: "Working adults 22-35",
        channels: "TikTok + YouTube + SMS",
        metric: "CTR ≥ 3.5%",
        status: "Draft",
      },
    ],
    months: [
      { id: "pm-mo-01", month: "Feb", roi: "3.8x", winRate: "61%", pipeline: "₦48m", pct: 62 },
      { id: "pm-mo-02", month: "Mar", roi: "4.1x", winRate: "63%", pipeline: "₦52m", pct: 68 },
      { id: "pm-mo-03", month: "Apr", roi: "3.9x", winRate: "66%", pipeline: "₦57m", pct: 71 },
      { id: "pm-mo-04", month: "May", roi: "4.4x", winRate: "65%", pipeline: "₦61m", pct: 76 },
      { id: "pm-mo-05", month: "Jun", roi: "4.7x", winRate: "68%", pipeline: "₦66m", pct: 82 },
      { id: "pm-mo-06", month: "Jul", roi: "4.2x", winRate: "68%", pipeline: "₦71m", pct: 86 },
    ],
  };
  registerMockPattern("GET", "/v1/product-marketing-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const items = pmCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Alumni suite — mirrors backend seeds (migrations/0023_alumni.sql) */
  const aluCollections: Record<string, Record<string, unknown>[]> = {
    overview: [
      { id: "alu-hb-01", metric: "Connections", valueLabel: "86", delta: "+12 this month" },
      { id: "alu-hb-02", metric: "Events RSVP'd", valueLabel: "3", delta: "reunion Sep 6" },
      { id: "alu-hb-03", metric: "Jobs referred", valueLabel: "4", delta: "2 hired" },
      { id: "alu-hb-04", metric: "Lifetime giving", valueLabel: "₦480k", delta: "2 scholarships" },
    ],
    events: [
      {
        id: "alu-ev-01",
        title: "Cohort 12 reunion",
        dateLabel: "Sep 6 · 15:00",
        location: "Lagos campus courtyard",
        going: 74,
        status: "Going",
      },
      {
        id: "alu-ev-02",
        title: "Career day + hiring fair",
        dateLabel: "Sep 14 · 10:00",
        location: "Main hall + online",
        going: 210,
        status: "Interested",
      },
      {
        id: "alu-ev-03",
        title: "Alumni ↔ students: speed mentoring",
        dateLabel: "Sep 28 · 14:00",
        location: "Online",
        going: 56,
        status: "RSVP",
      },
      {
        id: "alu-ev-04",
        title: "Founder stories: fintech edition",
        dateLabel: "Oct 12 · 18:00",
        location: "Online",
        going: 88,
        status: "Save",
      },
    ],
    members: [
      {
        id: "alu-mb-01",
        name: "Amina Suleiman",
        cohort: "Cloud Eng. · 2023",
        roleLabel: "SRE @ Paystack",
        city: "Lagos",
        conn: 1,
      },
      {
        id: "alu-mb-02",
        name: "David Osei",
        cohort: "Full-Stack · 2024",
        roleLabel: "Frontend @ Andela",
        city: "Accra",
        conn: 0,
      },
      {
        id: "alu-mb-03",
        name: "Blessing Ade",
        cohort: "Data Science · 2022",
        roleLabel: "ML Eng @ Kuda",
        city: "Lagos",
        conn: 2,
      },
      {
        id: "alu-mb-04",
        name: "Ibrahim Musa",
        cohort: "DevOps · 2024",
        roleLabel: "Platform @ Flutterwave",
        city: "Abuja",
        conn: 0,
      },
    ],
    stories: [
      {
        id: "alu-sr-01",
        name: "Tunde Bakare",
        cohort: "Cohort 12",
        company: "Paystack",
        role: "Platform Engineer",
        excerpt:
          "Three months after demo day I had a Paystack offer. The mock interviews my mentor ran were harder than the real thing.",
        initials: "TB",
        tone: "bg-gradient-learning",
      },
      {
        id: "alu-sr-02",
        name: "Chiamaka Eze",
        cohort: "Cohort 10",
        company: "Flutterwave",
        role: "Product Designer",
        excerpt:
          "The portfolio sprint review caught everything I'd have missed. My design case study still opens doors two years later.",
        initials: "CE",
        tone: "bg-gradient-erp",
      },
      {
        id: "alu-sr-03",
        name: "Ibrahim Sule",
        cohort: "Cohort 11",
        company: "Andela",
        role: "DevOps Engineer",
        excerpt:
          "Cohort 11's CI/CD module was brutal — and it's exactly why I aced Andela's take-home in one weekend.",
        initials: "IS",
        tone: "bg-gradient-services",
      },
      {
        id: "alu-sr-04",
        name: "Funke Adeyemi",
        cohort: "Cohort 9",
        company: "Interswitch",
        role: "Backend Engineer",
        excerpt:
          "I went from working at a cyber café in Surulere to shipping payment rails. CEA's lab nights were everything.",
        initials: "FA",
        tone: "bg-gradient-career",
      },
      {
        id: "alu-sr-05",
        name: "Ngozi Umeh",
        cohort: "Cohort 12",
        company: "Kuda",
        role: "Data Analyst",
        excerpt:
          "The SQL mid-term humbled me. I retook it, passed, and now I query Kuda's core ledger every single day.",
        initials: "NU",
        tone: "bg-gradient-learning",
      },
      {
        id: "alu-sr-06",
        name: "Samuel Adebayo",
        cohort: "Cohort 8",
        company: "Terragon",
        role: "Data Engineer",
        excerpt:
          "My capstone on streaming ingestion is still in production at Terragon. Yes, the exact one from class.",
        initials: "SA",
        tone: "bg-gradient-erp",
      },
    ],
    milestones: [
      { id: "alu-ml-01", label: "Stories published", value: "214" },
      { id: "alu-ml-02", label: "Companies represented", value: "86" },
      { id: "alu-ml-03", label: "Readers this quarter", value: "38k" },
      { id: "alu-ml-04", label: "Graduates hired via stories", value: "47" },
    ],
    jobs: [
      {
        id: "alu-jb-01",
        role: "Frontend Engineer",
        company: "Kuda",
        period: "2025 – present",
        place: "Lekki, Lagos",
        current: 1,
        description: "Building onboarding flows and the design system used by 3.4m customers.",
      },
      {
        id: "alu-jb-02",
        role: "Junior Software Developer",
        company: "Interswitch",
        period: "2024 – 2025",
        place: "Victoria Island, Lagos",
        current: 0,
        description: "Shipped payment integrations for 14 partners in my first year.",
      },
      {
        id: "alu-jb-03",
        role: "Software Engineering Intern",
        company: "Zuri",
        period: "2024",
        place: "Remote",
        current: 0,
        description:
          "Full-stack internship; ended with a production dashboard for a Lagos logistics startup.",
      },
    ],
    achievements: [
      {
        id: "alu-ac-01",
        title: "Full-Stack Diploma — Distinction",
        org: "CEA · Cohort 12",
        year: "2024",
      },
      {
        id: "alu-ac-02",
        title: "AWS Cloud Practitioner",
        org: "Amazon Web Services",
        year: "2025",
      },
      {
        id: "alu-ac-03",
        title: "Cohort 12 Class Representative",
        org: "CEA Student Life",
        year: "2024",
      },
    ],
    skills: [
      { id: "alu-sk-01", name: "TypeScript" },
      { id: "alu-sk-02", name: "React" },
      { id: "alu-sk-03", name: "Node.js" },
      { id: "alu-sk-04", name: "Tailwind CSS" },
      { id: "alu-sk-05", name: "PostgreSQL" },
      { id: "alu-sk-06", name: "Docker" },
      { id: "alu-sk-07", name: "CI/CD" },
      { id: "alu-sk-08", name: "Design systems" },
      { id: "alu-sk-09", name: "REST APIs" },
    ],
    commitments: [
      {
        id: "alu-cm-01",
        mentee: "Ada Okafor",
        track: "Backend specialisation",
        cadence: "Fortnightly 1:1",
        nextLabel: "Aug 21 · 16:00",
        status: "Active",
      },
      {
        id: "alu-cm-02",
        mentee: "Tobi Adeyemi",
        track: "DevOps",
        cadence: "Weekly group session",
        nextLabel: "Aug 22 · 11:00",
        status: "Active",
      },
      {
        id: "alu-cm-03",
        mentee: "Zainab Yusuf",
        track: "Product design",
        cadence: "Async messaging",
        nextLabel: "Ongoing",
        status: "Active",
      },
    ],
    ways: [
      {
        id: "alu-wy-01",
        title: "Scholarship fund",
        detail: "Fund a student's term — ₦700k covers a full scholarship",
      },
      {
        id: "alu-wy-02",
        title: "Mentor a learner",
        detail: "2 hours a month, online or on campus",
      },
      {
        id: "alu-wy-03",
        title: "Host an internship",
        detail: "Open a seat in your team for a final-year learner",
      },
      {
        id: "alu-wy-04",
        title: "Speaker at career day",
        detail: "Share your journey at the Sep 14 event",
      },
    ],
    impact: [
      { id: "alu-im-01", value: "2", label: "scholarships funded" },
      { id: "alu-im-02", value: "3", label: "mentees guided to jobs" },
      { id: "alu-im-03", value: "1", label: "internship hosted" },
    ],
  };
  registerMockPattern("GET", "/v1/alumni-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const items = aluCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Dev suite — mirrors backend seeds (migrations/0024_dev.sql) */
  const devCollections: Record<string, Record<string, unknown>[]> = {
    overview: [
      { id: "dev-hb-01", metric: "Open PRs", valueLabel: "9", delta: "3 ready to merge" },
      { id: "dev-hb-02", metric: "Deploys (30d)", valueLabel: "18", delta: "100% success" },
      { id: "dev-hb-03", metric: "API uptime", valueLabel: "99.98%", delta: "30-day" },
      { id: "dev-hb-04", metric: "Open issues", valueLabel: "14", delta: "5 bugs" },
    ],
    endpoints: [
      { id: "dev-ep-01", endpoint: "GET /api/v1/students", description: "List students" },
      { id: "dev-ep-02", endpoint: "POST /api/v1/applications", description: "Create application" },
      { id: "dev-ep-03", endpoint: "GET /api/v1/finance/invoices", description: "List invoices" },
    ],
    deploys: [
      {
        id: "dev-dp-01",
        versionLabel: "v1.42.0 · prod",
        status: "Live",
        timeLabel: "Aug 1 · 06:12 · 4m 12s",
      },
      {
        id: "dev-dp-02",
        versionLabel: "v1.41.2 · prod",
        status: "Live",
        timeLabel: "Jul 28 · 05:58 · 3m 48s",
      },
      {
        id: "dev-dp-03",
        versionLabel: "v1.41.1 · staging",
        status: "Rolled back",
        timeLabel: "Jul 27 · 14:20",
      },
    ],
    prs: [
      {
        id: "dev-pr-01",
        title: "#142 · feat: invoice webhooks",
        branch: "main ← feat/invoice-webhooks",
        status: "Checks passed",
      },
      {
        id: "dev-pr-02",
        title: "#141 · fix: portal nav caching",
        branch: "main ← fix/nav-cache",
        status: "Review requested",
      },
      {
        id: "dev-pr-03",
        title: "#140 · chore: deps upgrade",
        branch: "main ← chore/deps",
        status: "CI running",
      },
    ],
    errors: [
      { id: "dev-er-01", title: "API · 500 on /invoices", countLabel: "2 in 24h", status: "New" },
      {
        id: "dev-er-02",
        title: "Web · JS error on dashboard",
        countLabel: "1.2% sessions",
        status: "Investigating",
      },
      {
        id: "dev-er-03",
        title: "Worker · timeout in email queue",
        countLabel: "3 in 24h",
        status: "Fixed",
      },
    ],
    tasks: [
      {
        id: "dev-ts-01",
        title: "CEA-214 · Invoice PDF regression",
        detail: "Sprint 14 · in progress",
        status: "Doing",
      },
      {
        id: "dev-ts-02",
        title: "CEA-218 · Webhook retry logic",
        detail: "Sprint 14 · ready",
        status: "Todo",
      },
      {
        id: "dev-ts-03",
        title: "CEA-205 · Portals nav caching",
        detail: "Sprint 13 · done",
        status: "Done",
      },
    ],
    deps: [
      { id: "dev-de-01", name: "lucide-react", version: "0.4xx", status: "Current" },
      { id: "dev-de-02", name: "tanstack-router", version: "1.9x", status: "Update avail." },
      { id: "dev-de-03", name: "axios (legacy)", version: "1.7", status: "1 vuln · patch" },
    ],
    reviews: [
      {
        id: "dev-rv-01",
        title: "PR #142 · invoice webhooks",
        detail: "2 comments · waiting on author",
        status: "Changes",
      },
      {
        id: "dev-rv-02",
        title: "PR #141 · portal nav caching",
        detail: "Approved by Segun A.",
        status: "Approved",
      },
      {
        id: "dev-rv-03",
        title: "PR #139 · auth refresh tokens",
        detail: "No comments yet",
        status: "Reviewing",
      },
    ],
    vars: [
      { id: "dev-vr-01", key: "VITE_API_URL", value: "https://api.cea.edu.ng", env: "Prod" },
      { id: "dev-vr-02", key: "VITE_PAYSTACK_PUBLIC_KEY", value: "pk_live_••••••••", env: "Prod" },
      { id: "dev-vr-03", key: "VITE_ANALYTICS_ID", value: "G-8QP2X4M9", env: "Staging" },
    ],
    queues: [
      {
        id: "dev-qq-01",
        name: "email",
        detail: "7 pending · 1.2k processed today",
        status: "Healthy",
      },
      {
        id: "dev-qq-02",
        name: "notifications",
        detail: "0 pending · backlog clear",
        status: "Healthy",
      },
      {
        id: "dev-qq-03",
        name: "exports",
        detail: "1 pending · running 2m 14s",
        status: "Processing",
      },
    ],
    docs: [
      { id: "dev-dc-01", title: "API reference v3", updatedLabel: "Updated Jul 30 · 84 endpoints" },
      { id: "dev-dc-02", title: "Onboarding runbook", updatedLabel: "Updated Jul 12 · 14 steps" },
      { id: "dev-dc-03", title: "Deploy playbook", updatedLabel: "Updated Jun 28 · 6 sections" },
    ],
  };
  registerMockPattern("GET", "/v1/dev-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const items = devCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Growth suite — mirrors backend seeds (migrations/0025_growth.sql) */
  const grwCollections: Record<string, Record<string, unknown>[]> = {
    overview: [
      { id: "grw-hb-01", metric: "New learners", valueLabel: "148", delta: "+22% MoM" },
      { id: "grw-hb-02", metric: "Activation", valueLabel: "64%", delta: "first lesson in 3d" },
      { id: "grw-hb-03", metric: "Referral signups", valueLabel: "27", delta: "18% of signups" },
      { id: "grw-hb-04", metric: "CAC", valueLabel: "₦64k", delta: "target ₦70k" },
    ],
    simulations: [
      {
        id: "grw-sm-01",
        name: "Base case",
        spend: "₦12m/qtr",
        conversionPct: 16,
        learners: 612,
        cac: "₦64k",
        revenue: "₦48.9m",
      },
      {
        id: "grw-sm-02",
        name: "Referral push",
        spend: "₦14.5m",
        conversionPct: 19,
        learners: 748,
        cac: "₦58k",
        revenue: "₦59.8m",
      },
      {
        id: "grw-sm-03",
        name: "Meta-heavy",
        spend: "₦16m",
        conversionPct: 14,
        learners: 712,
        cac: "₦71k",
        revenue: "₦56.9m",
      },
      {
        id: "grw-sm-04",
        name: "Radio + OOH push",
        spend: "₦13.5m",
        conversionPct: 13,
        learners: 580,
        cac: "₦82k",
        revenue: "₦46.4m",
      },
    ],
    funnel: [
      { id: "grw-fn-01", name: "Visitors", visitors: 14200, percentage: 100, delta: "—" },
      { id: "grw-fn-02", name: "Leads", visitors: 2270, percentage: 16, delta: "−84%" },
      { id: "grw-fn-03", name: "Activated", visitors: 1453, percentage: 64, delta: "−36%" },
      { id: "grw-fn-04", name: "Retained 30d", visitors: 1322, percentage: 91, delta: "−9%" },
      { id: "grw-fn-05", name: "Paying", visitors: 891, percentage: 67, delta: "−33%" },
    ],
    experiments: [
      {
        id: "grw-ex-01",
        title: "WhatsApp onboarding nudges",
        hypothesis: "WhatsApp nudges lift week-1 activation",
        variant: "A/B 50/50",
        result: "+9% activation",
        status: "Winning",
      },
      {
        id: "grw-ex-02",
        title: "Pay-later at checkout",
        hypothesis: "Flexible terms raise conversion",
        variant: "3 variants",
        result: "+6% conversion",
        status: "Live",
      },
      {
        id: "grw-ex-03",
        title: "Open-day reminder cadence",
        hypothesis: "2 reminders beat 3 reminders",
        variant: "A/B/C",
        result: "Running",
        status: "In test",
      },
      {
        id: "grw-ex-04",
        title: "Referral reward framing",
        hypothesis: "Cash beats credit for invites",
        variant: "Draft",
        result: "—",
        status: "Draft",
      },
    ],
    cohorts: [
      { id: "grw-ch-01", name: "W1", w1: 100, w2: 88, w3: 81, w4: 76, w5: 72, w6: 68 },
      { id: "grw-ch-02", name: "W2", w1: 100, w2: 91, w3: 84, w4: 79, w5: 74, w6: null },
      { id: "grw-ch-03", name: "W3", w1: 100, w2: 89, w3: 82, w4: 77, w5: null, w6: null },
      { id: "grw-ch-04", name: "W4", w1: 100, w2: 93, w3: 86, w4: null, w5: null, w6: null },
      { id: "grw-ch-05", name: "W5", w1: 100, w2: 90, w3: null, w4: null, w5: null, w6: null },
    ],
    channels: [
      {
        id: "grw-cn-01",
        name: "Referral",
        cac: "₦42k",
        ltv: "₦312k",
        roas: "7.4x",
        spend: "₦1.1m",
      },
      {
        id: "grw-cn-02",
        name: "Meta ads",
        cac: "₦68k",
        ltv: "₦256k",
        roas: "3.8x",
        spend: "₦4.2m",
      },
      {
        id: "grw-cn-03",
        name: "LinkedIn",
        cac: "₦84k",
        ltv: "₦284k",
        roas: "3.4x",
        spend: "₦2.6m",
      },
      {
        id: "grw-cn-04",
        name: "TikTok & reels",
        cac: "₦51k",
        ltv: "₦198k",
        roas: "3.9x",
        spend: "₦1.8m",
      },
      {
        id: "grw-cn-05",
        name: "Radio & OOH",
        cac: "₦92k",
        ltv: "₦241k",
        roas: "2.6x",
        spend: "₦1.4m",
      },
    ],
    referrals: [
      {
        id: "grw-rf-01",
        name: "Learner invites learner",
        reward: "₦50k credit",
        invites: 412,
        conversions: 27,
        paidOut: "₦1.2m",
        status: "Live",
      },
      {
        id: "grw-rf-02",
        name: "Alumni refer employer",
        reward: "₦100k cash",
        invites: 86,
        conversions: 6,
        paidOut: "₦540k",
        status: "Live",
      },
      {
        id: "grw-rf-03",
        name: "Open-day bring a friend",
        reward: "₦25k discount",
        invites: 0,
        conversions: 0,
        paidOut: "₦0",
        status: "Scheduled",
      },
    ],
    seo: [
      {
        id: "grw-se-01",
        keyword: "Bootcamps in Lagos",
        volume: 4800,
        rank: "#3",
        trend: "+2",
        priority: "High",
      },
      {
        id: "grw-se-02",
        keyword: "Data analytics courses Nigeria",
        volume: 2900,
        rank: "#7",
        trend: "+1",
        priority: "High",
      },
      {
        id: "grw-se-03",
        keyword: "UX design certification",
        volume: 1600,
        rank: "#11",
        trend: "−2",
        priority: "Medium",
      },
      {
        id: "grw-se-04",
        keyword: "Scholarships for tech in Nigeria",
        volume: 3200,
        rank: "#9",
        trend: "+4",
        priority: "Medium",
      },
      {
        id: "grw-se-05",
        keyword: "Employer talent programs",
        volume: 720,
        rank: "#5",
        trend: "0",
        priority: "Low",
      },
    ],
  };
  registerMockPattern("GET", "/v1/growth-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const items = grwCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Conversion copy suite — mirrors backend seeds (migrations/0026_conversion_copy.sql) */
  const ccpCollections: Record<string, Record<string, unknown>[]> = {
    overview: [
      { id: "ccp-hb-01", metric: "Assets", valueLabel: "214", delta: "112 email · 64 page" },
      { id: "ccp-hb-02", metric: "Variants", valueLabel: "38", delta: "A/B ready" },
      { id: "ccp-hb-03", metric: "Reused (30d)", valueLabel: "142", delta: "pull count" },
      { id: "ccp-hb-04", metric: "Drafts", valueLabel: "7", delta: "in progress" },
    ],
    assets: [
      {
        id: "ccp-as-01",
        title: "Enrolment page H1 set",
        category: "Page",
        variants: 12,
        lastUsed: "Jul 28",
        status: "Active",
      },
      {
        id: "ccp-as-02",
        title: "Cohort 17 launch email",
        category: "Email",
        variants: 4,
        lastUsed: "Jul 20",
        status: "Active",
      },
      {
        id: "ccp-as-03",
        title: "Scholarship hero copy",
        category: "Page",
        variants: 3,
        lastUsed: "review pending",
        status: "Draft",
      },
    ],
    rules: [
      {
        id: "ccp-rl-01",
        name: "Tone",
        category: "Voice",
        detail: "Confident, warm, zero hype…",
        status: "Enforced",
      },
      {
        id: "ccp-rl-02",
        name: "Formatting",
        category: "Grammar",
        detail: "Sentences ≤ 20 words…",
        status: "Enforced",
      },
      {
        id: "ccp-rl-03",
        name: "Localization",
        category: "Voice",
        detail: "English + pidgin variants…",
        status: "Draft",
      },
    ],
    sequences: [
      {
        id: "ccp-sq-01",
        title: "Application follow-up",
        emails: 5,
        openRate: "42%",
        clickRate: "9.1%",
        status: "Live",
      },
      {
        id: "ccp-sq-02",
        title: "Cohort 17 nurture",
        emails: 7,
        openRate: "38%",
        clickRate: "7.4%",
        status: "Live",
      },
      {
        id: "ccp-sq-03",
        title: "Scholarship reminder",
        emails: 3,
        openRate: "—",
        clickRate: "—",
        status: "Testing",
      },
    ],
    briefs: [
      {
        id: "ccp-br-01",
        title: "Cohort 17 landing refresh",
        requester: "Marketing",
        dateLabel: "Jul 31",
        status: "In progress",
      },
      {
        id: "ccp-br-02",
        title: "Scholarship campaign copy",
        requester: "NGO partner",
        dateLabel: "Jul 28",
        status: "In review",
      },
      {
        id: "ccp-br-03",
        title: "Alumni referral email",
        requester: "Career services",
        dateLabel: "Jul 25",
        status: "Done",
      },
    ],
    analytics: [
      {
        id: "ccp-an-01",
        stage: "Organic → application",
        visits: "18.4k",
        conversion: "5.4%",
        delta: "+0.8 pts",
      },
      {
        id: "ccp-an-02",
        stage: "Paid → application",
        visits: "22.1k",
        conversion: "3.1%",
        delta: "+0.4 pts",
      },
      {
        id: "ccp-an-03",
        stage: "Application → enrolment",
        visits: "1,612",
        conversion: "26.4%",
        delta: "−1.2 pts",
      },
    ],
    ads: [
      {
        id: "ccp-ad-01",
        name: "Cohort 17 launch",
        channel: "Meta",
        ctr: "2.1%",
        variants: 4,
        status: "Running",
      },
      {
        id: "ccp-ad-02",
        name: "Scholarship search",
        channel: "Google",
        ctr: "3.4%",
        variants: 3,
        status: "Running",
      },
      {
        id: "ccp-ad-03",
        name: "Day in the life",
        channel: "TikTok",
        ctr: "1.2%",
        variants: 2,
        status: "Paused",
      },
    ],
    tests: [
      {
        id: "ccp-tt-01",
        title: "Enrolment H1 · A vs B",
        result: "B wins +12% · deployed",
        status: "Winner",
      },
      {
        id: "ccp-tt-02",
        title: "Email subject · A vs B",
        result: "A wins +8% opens · deployed",
        status: "Winner",
      },
      {
        id: "ccp-tt-03",
        title: "Scholarship hero · A vs B",
        result: "Running · 4,200 visits",
        status: "Running",
      },
    ],
    sections: [
      {
        id: "ccp-sc-01",
        title: "Hero",
        copy: "Cohort 17 applications open — pay in installments",
        conversion: "6.2%",
        status: "Active",
      },
      {
        id: "ccp-sc-02",
        title: "Social proof",
        copy: "1,240+ alumni placed in tech roles",
        conversion: "4.8%",
        status: "Active",
      },
      {
        id: "ccp-sc-03",
        title: "FAQ",
        copy: "12 questions · updated by admissions",
        conversion: "Saves 31% of tickets",
        status: "Active",
      },
    ],
  };
  registerMockPattern("GET", "/v1/conversion-copy-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const items = ccpCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Department suite — mirrors backend seeds (migrations/0027_department.sql) */
  const depCollections: Record<string, Record<string, unknown>[]> = {
    overview: [
      { id: "dep-hb-01", metric: "Reports (year)", valueLabel: "12", delta: "4 per quarter" },
      { id: "dep-hb-02", metric: "Completion rate", valueLabel: "92%", delta: "+3 pts YoY" },
      { id: "dep-hb-03", metric: "Placement rate", valueLabel: "84%", delta: "within 6 months" },
      { id: "dep-hb-04", metric: "Exports (30d)", valueLabel: "6", delta: "by stakeholders" },
    ],
    reports: [
      {
        id: "dep-rp-01",
        title: "Student outcomes · Q2 2026",
        detail: "92% completion · 84% placement",
        status: "Published",
      },
      {
        id: "dep-rp-02",
        title: "Instructor performance · Q2",
        detail: "Avg score 4.6 · 14 observations",
        status: "Published",
      },
      {
        id: "dep-rp-03",
        title: "Curriculum audit · draft",
        detail: "Due Aug 20 · 3 programs",
        status: "Draft",
      },
    ],
    observations: [
      {
        id: "dep-ob-01",
        title: "Class observation — Mr. Adeyemi",
        detail: "Backend & APIs · Scheduled Aug 11",
        status: "Scheduled",
      },
      {
        id: "dep-ob-02",
        title: "Class observation — Ms. Chidera",
        detail: "DevOps Fundamentals · Scheduled Aug 13",
        status: "Scheduled",
      },
      {
        id: "dep-ob-03",
        title: "Course evaluation — Design Systems",
        detail: "Cohort 15 · Closed Jul 30 · 4.7★",
        status: "Completed",
      },
    ],
    faculty: [
      {
        id: "dep-fa-01",
        name: "Mr. Adeyemi",
        courses: 4,
        students: 62,
        workload: "85%",
        rating: "4.8",
      },
      {
        id: "dep-fa-02",
        name: "Ms. Chidera",
        courses: 3,
        students: 48,
        workload: "70%",
        rating: "4.6",
      },
      {
        id: "dep-fa-03",
        name: "Mr. Bello",
        courses: 3,
        students: 55,
        workload: "78%",
        rating: "4.7",
      },
      {
        id: "dep-fa-04",
        name: "Mrs. Eze",
        courses: 2,
        students: 34,
        workload: "52%",
        rating: "4.4",
      },
    ],
    cohorts: [
      {
        id: "dep-ch-01",
        name: "Cohort 15 — Full-Stack",
        enrolled: 48,
        capacity: 50,
        pct: 96,
        status: "Active",
      },
      {
        id: "dep-ch-02",
        name: "Cohort 16 — Full-Stack",
        enrolled: 42,
        capacity: 50,
        pct: 84,
        status: "Admitting",
      },
      {
        id: "dep-ch-03",
        name: "Cohort 14 — DevOps",
        enrolled: 36,
        capacity: 40,
        pct: 90,
        status: "Active",
      },
      {
        id: "dep-ch-04",
        name: "Cohort 16 — Product Design",
        enrolled: 30,
        capacity: 40,
        pct: 75,
        status: "Admitting",
      },
    ],
    programs: [
      {
        id: "dep-pg-01",
        name: "Full-Stack Software Development",
        version: "v3.1",
        year: "2026",
        status: "Active",
      },
      {
        id: "dep-pg-02",
        name: "Cloud Engineering & DevOps",
        version: "v2.4",
        year: "2026",
        status: "In review",
      },
      {
        id: "dep-pg-03",
        name: "Product & UI/UX Design",
        version: "v2.0",
        year: "2025",
        status: "Active",
      },
      { id: "dep-pg-04", name: "Data & AI", version: "v1.0", year: "draft", status: "Draft" },
    ],
    events: [
      {
        id: "dep-ev-01",
        title: "Mid-term assessments",
        dateLabel: "Aug 17–21 · all programs",
        status: "Upcoming",
      },
      {
        id: "dep-ev-02",
        title: "Industry guest lecture",
        dateLabel: "Aug 24 · 2:00 PM · Cloud track",
        status: "Scheduled",
      },
      {
        id: "dep-ev-03",
        title: "Graduation rehearsal",
        dateLabel: "Sep 05 · 10:00 AM · Main hall",
        status: "Scheduled",
      },
    ],
    approvals: [
      {
        id: "dep-ap-01",
        title: "Curriculum update · Frontend track",
        requester: "Instructor Adesuwa",
        dateLabel: "Jul 30",
        status: "Pending",
      },
      {
        id: "dep-ap-02",
        title: "New course · Cloud Fundamentals",
        requester: "Instructor Tobi",
        dateLabel: "Jul 29",
        status: "Pending",
      },
      {
        id: "dep-ap-03",
        title: "Leave request · Ngozi E.",
        requester: "Instructor",
        dateLabel: "Jul 28",
        status: "Approved",
      },
    ],
  };
  registerMockPattern("GET", "/v1/department-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const items = depCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* NGO partnership suite — mirrors backend seeds (migrations/0028_ngo.sql) */
  const ngoCollections: Record<string, Record<string, unknown>[]> = {
    overview: [
      {
        id: "ngo-hb-01",
        metric: "Scholarships funded",
        valueLabel: "38",
        delta: "₦12.4m disbursed",
      },
      { id: "ngo-hb-02", metric: "Programs", valueLabel: "3", delta: "2 ongoing" },
      { id: "ngo-hb-03", metric: "Volunteers", valueLabel: "86", delta: "14 active" },
      { id: "ngo-hb-04", metric: "Impact (2026)", valueLabel: "1,240", delta: "beneficiaries" },
    ],
    funds: [
      {
        id: "ngo-fd-01",
        name: "Girls in Tech · Cohort 16",
        scholars: "18 scholars",
        amount: "₦1.2m in tuition",
        status: "Active",
      },
      {
        id: "ngo-fd-02",
        name: "Merit scholar pool",
        scholars: "12 scholars",
        amount: "₦840k in tuition",
        status: "Active",
      },
      {
        id: "ngo-fd-03",
        name: "Refugee STEM fund",
        scholars: "8 applicants",
        amount: "selection in progress",
        status: "Selecting",
      },
    ],
    programs: [
      {
        id: "ngo-pr-01",
        name: "STEM Saturdays",
        location: "Lagos",
        beneficiaries: "480 beneficiaries",
        status: "Ongoing",
      },
      {
        id: "ngo-pr-02",
        name: "Girls Code Bootcamp",
        location: "Abuja",
        beneficiaries: "320 beneficiaries",
        status: "Ongoing",
      },
      {
        id: "ngo-pr-03",
        name: "Digital Literacy Drive",
        location: "Port Harcourt",
        beneficiaries: "planned Oct",
        status: "Planned",
      },
    ],
    expenses: [
      {
        id: "ngo-ex-01",
        title: "Facilitator stipends",
        amount: "₦1.8m",
        pct: "36%",
        status: "On track",
      },
      {
        id: "ngo-ex-02",
        title: "Learning materials",
        amount: "₦940k",
        pct: "19%",
        status: "On track",
      },
      {
        id: "ngo-ex-03",
        title: "Logistics & venues",
        amount: "₦720k",
        pct: "14%",
        status: "On track",
      },
      { id: "ngo-ex-04", title: "Contingency", amount: "₦240k", pct: "5%", status: "Unspent" },
    ],
    teams: [
      {
        id: "ngo-tm-01",
        name: "STEM Saturdays · facilitators",
        volunteers: 12,
        slots: "8 slots left",
        status: "Recruiting",
      },
      {
        id: "ngo-tm-02",
        name: "Girls Code · mentors",
        volunteers: 9,
        slots: "3 slots left",
        status: "Recruiting",
      },
      {
        id: "ngo-tm-03",
        name: "Digital Literacy · coordinators",
        volunteers: 6,
        slots: "full",
        status: "Filled",
      },
    ],
    transactions: [
      {
        id: "ngo-tr-01",
        title: "Global Giving grant",
        amount: "₦18.0m inbound",
        dateLabel: "Jul 14",
        status: "Received",
      },
      {
        id: "ngo-tr-02",
        title: "Scholarship disbursement",
        amount: "₦2.4m outbound",
        dateLabel: "Jul 02",
        status: "Disbursed",
      },
      {
        id: "ngo-tr-03",
        title: "Crowdfund · drive 2026",
        amount: "₦6.1m raised · 84% of target",
        dateLabel: "Ongoing",
        status: "Ongoing",
      },
    ],
    reports: [
      {
        id: "ngo-rp-01",
        title: "Impact report · H1 2026",
        detail: "740 beneficiaries · ₦8.2m deployed",
        status: "Published",
      },
      {
        id: "ngo-rp-02",
        title: "Girls Code Bootcamp report",
        detail: "320 graduates · 91% completion",
        status: "Published",
      },
      {
        id: "ngo-rp-03",
        title: "Q3 draft · STEM Saturdays",
        detail: "In review · due Aug 15",
        status: "Draft",
      },
    ],
    metrics: [
      { id: "ngo-mt-01", label: "Cost per beneficiary", value: "₦6,600", delta: "down 12% YoY" },
      { id: "ngo-mt-02", label: "Retention", value: "87%", delta: "of scholars re-engage" },
      { id: "ngo-mt-03", label: "Outcome rate", value: "91%", delta: "of goals met" },
    ],
    threads: [
      {
        id: "ngo-th-01",
        title: "Scholarship cohort 16 disbursement",
        fromLabel: "CEA finance",
        timeLabel: "Jul 29 · 11:02",
        status: "Open",
      },
      {
        id: "ngo-th-02",
        title: "Impact report H1 review",
        fromLabel: "CEA programs",
        timeLabel: "Jul 22 · 09:18",
        status: "Closed",
      },
      {
        id: "ngo-th-03",
        title: "STEM Saturdays venue change",
        fromLabel: "CEA ops",
        timeLabel: "Jul 18 · 15:44",
        status: "Closed",
      },
    ],
  };
  registerMockPattern("GET", "/v1/ngo-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const items = ngoCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Client engagement suite — mirrors backend seeds (migrations/0029_client.sql) */
  const cliCollections: Record<string, Record<string, unknown>[]> = {
    tickets: [
      {
        id: "cli-tk-01",
        title: "Can't access project repo",
        reference: "TK-2214",
        dateLabel: "Aug 3 · 09:12",
        sla: "SLA: 4h",
        status: "Open",
      },
      {
        id: "cli-tk-02",
        title: "Invoice PDF not loading",
        reference: "TK-2198",
        dateLabel: "Jul 29 · 14:40",
        sla: "SLA: 24h",
        status: "In progress",
      },
      {
        id: "cli-tk-03",
        title: "Add team member to portal",
        reference: "TK-2175",
        dateLabel: "Jul 22 · 11:05",
        sla: "SLA: 24h",
        status: "Resolved",
      },
    ],
    proposals: [
      {
        id: "cli-pr-01",
        title: "Learning platform rebuild",
        amount: "₦8.4m",
        scope: "12 weeks · scope v2",
        status: "Open",
      },
      {
        id: "cli-pr-02",
        title: "Mobile app MVP",
        amount: "₦12.0m",
        scope: "16 weeks · scope v1",
        status: "Negotiating",
      },
      {
        id: "cli-pr-03",
        title: "Data migration project",
        amount: "₦3.2m",
        scope: "6 weeks · completed",
        status: "Signed",
      },
    ],
    documents: [
      {
        id: "cli-dc-01",
        title: "SOW · Platform rebuild v2",
        type: "PDF",
        size: "2.4 MB",
        updated: "Jul 28",
        status: "Shared",
      },
      {
        id: "cli-dc-02",
        title: "Weekly status report · W31",
        type: "PDF",
        size: "1.1 MB",
        updated: "Jul 31",
        status: "New",
      },
      {
        id: "cli-dc-03",
        title: "Invoice + receipt archive",
        type: "Folder",
        size: "14 files",
        updated: "Q3",
        status: "Shared",
      },
    ],
    contracts: [
      {
        id: "cli-ct-01",
        name: "Platform rebuild · MS-2026-014",
        reference: "MS-2026-014",
        amount: "₦8.4m",
        dateLabel: "ends Nov 30",
        status: "Active",
      },
      {
        id: "cli-ct-02",
        name: "Support retainer · annual",
        reference: "SR-2026-002",
        amount: "₦2.4m",
        dateLabel: "renews Sep 01",
        status: "Renewing",
      },
      {
        id: "cli-ct-03",
        name: "Mobile app MVP · MS-2026-021",
        reference: "MS-2026-021",
        amount: "₦12.0m",
        dateLabel: "ends Mar 2027",
        status: "Active",
      },
    ],
    invoices: [
      {
        id: "cli-iv-01",
        title: "Deposit — OrderPadi build",
        reference: "INV-ST-0142-1",
        amount: "₦350k",
        status: "Paid",
      },
      {
        id: "cli-iv-02",
        title: "Milestone 2 — mockups approved",
        reference: "INV-ST-0142-2",
        amount: "₦175k",
        status: "Paid",
      },
      {
        id: "cli-iv-03",
        title: "Milestone 3 — core build",
        reference: "INV-ST-0142-3",
        amount: "₦175k",
        status: "Due Aug 25",
      },
    ],
    threads: [
      {
        id: "cli-th-01",
        title: "Landing page build — review needed",
        fromLabel: "Project manager · Simi",
        timeLabel: "Aug 2 · 16:20",
        status: "New",
      },
      {
        id: "cli-th-02",
        title: "API docs draft for sign-off",
        fromLabel: "Tech lead · Dayo",
        timeLabel: "Jul 31 · 11:08",
        status: "Open",
      },
      {
        id: "cli-th-03",
        title: "Weekly sync moved to Thursday",
        fromLabel: "Project manager · Simi",
        timeLabel: "Jul 28 · 09:45",
        status: "Closed",
      },
    ],
    milestones: [
      { id: "cli-ms-01", title: "Kickoff & discovery", dateLabel: "Jul 1", status: "Done" },
      { id: "cli-ms-02", title: "Design mockups", dateLabel: "Jul 15", status: "Done" },
      {
        id: "cli-ms-03",
        title: "Core build (API + UI)",
        dateLabel: "Aug 20",
        status: "In progress",
      },
      { id: "cli-ms-04", title: "QA & polish", dateLabel: "Sep 5", status: "Upcoming" },
      { id: "cli-ms-05", title: "Launch", dateLabel: "Sep 15", status: "Upcoming" },
    ],
    tasks: [
      {
        id: "cli-ts-01",
        title: "Design system handoff",
        kind: "Deliverable",
        detail: "v2 in review",
        status: "Approved",
      },
      {
        id: "cli-ts-02",
        title: "Landing page build",
        kind: "Deliverable",
        detail: "submitted Aug 2",
        status: "In review",
      },
      {
        id: "cli-ts-03",
        title: "API integration docs",
        kind: "In progress",
        detail: "60% done",
        status: "Doing",
      },
    ],
  };
  registerMockPattern("GET", "/v1/client-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const items = cliCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Admin systems suite — mirrors backend seeds (migrations/0030_admin_systems.sql) */
  const admCollections: Record<string, Record<string, unknown>[]> = {
    overview: [
      { id: "adm-hb-01", metric: "Users", valueLabel: "8,412", delta: "+214 this month" },
      { id: "adm-hb-02", metric: "Security alerts", valueLabel: "0", delta: "last 24h" },
      { id: "adm-hb-03", metric: "Uptime (30d)", valueLabel: "99.99%", delta: "two nines nine" },
      { id: "adm-hb-04", metric: "Backups", valueLabel: "12", delta: "all verified" },
    ],
    keys: [
      {
        id: "adm-ky-01",
        name: "ci-deploy",
        scope: "deploy:prod",
        lastUsed: "Rotated Jul 30",
        status: "Active",
      },
      {
        id: "adm-ky-02",
        name: "billing-worker",
        scope: "invoices:write",
        lastUsed: "Created Jul 12",
        status: "Active",
      },
      {
        id: "adm-ky-03",
        name: "legacy-cron",
        scope: "reports:read",
        lastUsed: "Created Jan 04",
        status: "Expiring",
      },
    ],
    backups: [
      {
        id: "adm-bk-01",
        name: "Production · nightly",
        detail: "Jul 31 · 02:00 · 8.4 GB",
        status: "Verified",
      },
      {
        id: "adm-bk-02",
        name: "Production · nightly",
        detail: "Jul 30 · 02:00 · 8.3 GB",
        status: "Verified",
      },
      {
        id: "adm-bk-03",
        name: "Pre-migration snapshot",
        detail: "Jul 15 · 14:00 · 7.9 GB",
        status: "Verified",
      },
      {
        id: "adm-bk-04",
        name: "Staging · nightly",
        detail: "Jul 31 · 02:15 · 2.1 GB",
        status: "Verified",
      },
      {
        id: "adm-bk-05",
        name: "Production · weekly",
        detail: "Jul 28 · 03:00 · 8.4 GB",
        status: "Verified",
      },
    ],
    integrations: [
      { id: "adm-in-01", name: "GitHub", detail: "3 repos · 12 workflows", status: "Connected" },
      {
        id: "adm-in-02",
        name: "Slack",
        detail: "cea-os workspace · 42 channels",
        status: "Connected",
      },
      {
        id: "adm-in-03",
        name: "Resend",
        detail: "Transactional email · 99.2% delivery",
        status: "Connected",
      },
      { id: "adm-in-04", name: "Sentry", detail: "cea-api project · 3 envs", status: "Connected" },
    ],
    rules: [
      { id: "adm-rl-01", name: "Global", valueLabel: "1,000 req/min", status: "Active" },
      { id: "adm-rl-02", name: "/v1/auth/sign-in", valueLabel: "5 req/min", status: "Active" },
      { id: "adm-rl-03", name: "/v1/applications", valueLabel: "10 req/min", status: "Active" },
      { id: "adm-rl-04", name: "/v1/admin/*", valueLabel: "100 req/min", status: "Active" },
      { id: "adm-rl-05", name: "ci-deploy key", valueLabel: "500 req/min", status: "Active" },
      { id: "adm-rl-06", name: "Custom", valueLabel: "200 req/min", status: "Pending" },
    ],
    services: [
      { id: 1, name: "web", detail: "cea.ng · edge delivery", status: "Healthy" },
      { id: 2, name: "api", detail: "cea-api worker · 42 suites", status: "Healthy" },
      { id: 3, name: "db", detail: "Cloudflare D1 · production", status: "Healthy" },
      { id: 4, name: "email", detail: "Resend · transactional", status: "Healthy" },
      { id: 5, name: "payments", detail: "Paystack · checkout + webhook", status: "Healthy" },
      { id: 6, name: "storage", detail: "Cloudflare R2 · uploads", status: "Healthy" },
    ],
  };
  registerMockPattern("GET", "/v1/admin-systems-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const items = admCollections[collection] ?? [];
    return { items, total: items.length };
  });
  registerMock("GET", "/v1/admin-systems-dashboard/metrics", async () => {
    await delay();
    return {
      cards: [
        { label: "Services", value: "6", delta: "6 healthy" },
        { label: "Healthy", value: "6", delta: "0 degraded" },
        { label: "Reported errors", value: "12", delta: "across all suites" },
        { label: "Database", value: "OK", delta: "D1 reachable" },
      ],
      services: [
        { name: "web", status: "Healthy" },
        { name: "api", status: "Healthy" },
        { name: "db", status: "Healthy" },
        { name: "email", status: "Healthy" },
        { name: "payments", status: "Healthy" },
        { name: "storage", status: "Healthy" },
      ],
      generatedAt: new Date().toISOString(),
    };
  });

  /* Parent invitations — token-based guardian links */
  registerMockPattern("GET", "/v1/invitations/*", async () => {
    await delay();
    return {
      status: "pending",
      studentName: "Ada Okafor",
      guardianName: "Chiamaka Okafor",
      note: "Primary guardian · admission 2026",
      expiresAt: "2026-08-30T23:59:59Z",
    };
  });
  registerMockPattern("POST", "/v1/invitations/*/accept", async () => {
    await delay();
    return {
      ok: true,
      studentId: "stu-ada",
      studentName: "Ada Okafor",
      roleUpdated: true,
      linked: true,
    };
  });
  registerMock("POST", "/v1/invitations", async () => {
    await delay();
    const token = "mock-invite-token";
    return {
      ok: true,
      token,
      url: `${window.location.origin}/app/parent/invitation/accept?token=${token}`,
      expiresAt: "2026-09-06T23:59:59Z",
    };
  });

  /* Director suite — mirrors backend seeds (migrations/0031_director.sql) */
  const dirCollections: Record<string, Record<string, unknown>[]> = {
    overview: [
      { id: "dir-hb-01", metric: "Objectives", valueLabel: "3", delta: "2 on track" },
      { id: "dir-hb-02", metric: "Key results", valueLabel: "9", delta: "6 on track" },
      { id: "dir-hb-03", metric: "Cycle progress", valueLabel: "62%", delta: "week 6 of 13" },
      { id: "dir-hb-04", metric: "Confidence", valueLabel: "High", delta: "1 flagged risk" },
    ],
    okrs: [
      {
        id: "dir-ok-01",
        objectiveLabel: "O1 · Hit 240 enrolled students",
        krLabel: "Complete fall admissions cycle",
        pct: 92,
      },
      {
        id: "dir-ok-02",
        objectiveLabel: "O1 · Hit 240 enrolled students",
        krLabel: "Referral program → 80 signups",
        pct: 64,
      },
      {
        id: "dir-ok-03",
        objectiveLabel: "O2 · 75% placement by Q4",
        krLabel: "Add 12 employer partners",
        pct: 75,
      },
      {
        id: "dir-ok-04",
        objectiveLabel: "O2 · 75% placement by Q4",
        krLabel: "Interview readiness pass rate 90%",
        pct: 68,
      },
      {
        id: "dir-ok-05",
        objectiveLabel: "O3 · 30% gross margin",
        krLabel: "Cut facilities cost 8%",
        pct: 52,
      },
      {
        id: "dir-ok-06",
        objectiveLabel: "O3 · 30% gross margin",
        krLabel: "Lift services revenue ₦2m",
        pct: 61,
      },
    ],
    branches: [
      {
        id: "dir-br-01",
        name: "Ikeja HQ",
        utilization: "86%",
        cost: "₦8.2/seat-day",
        status: "High",
      },
      {
        id: "dir-br-02",
        name: "Victoria Island",
        utilization: "79%",
        cost: "₦9.6/seat-day",
        status: "Normal",
      },
      {
        id: "dir-br-03",
        name: "Abeokuta",
        utilization: "53%",
        cost: "₦11.4/seat-day",
        status: "Low",
      },
    ],
    modules: [
      { id: "dir-mod-01", name: "Finance", detail: "P&L · cash flow · budget" },
      { id: "dir-mod-02", name: "Academic", detail: "Enrollment · grades · outcomes" },
      { id: "dir-mod-03", name: "Operations", detail: "Attendance · resources · uptime" },
      { id: "dir-mod-04", name: "People", detail: "Staff · performance · payroll" },
      { id: "dir-mod-05", name: "Marketing", detail: "Leads · campaigns · conversion" },
      { id: "dir-mod-06", name: "Quality", detail: "Reviews · audits · accreditation" },
    ],
    saved: [
      { id: "dir-sr-01", name: "Board pack — Q3", detail: "Generated Aug 1 · PDF" },
      { id: "dir-sr-02", name: "Cohort 14 placement deep-dive", detail: "Generated Jul 28 · CSV" },
      { id: "dir-sr-03", name: "Branch P&L comparison", detail: "Generated Jul 25 · XLSX" },
    ],
  };
  registerMockPattern("GET", "/v1/director-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const items = dirCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Instructor extras suite — mirrors backend seeds (migrations/0032_instructor_extras.sql) */
  const insCollections: Record<string, Record<string, unknown>[]> = {
    overview: [
      { id: "ins-hb-01", metric: "Active students", valueLabel: "128", delta: "+9 this week" },
      { id: "ins-hb-02", metric: "Pending grading", valueLabel: "23", delta: "4 due today" },
      {
        id: "ins-hb-03",
        metric: "Completion rate",
        valueLabel: "84%",
        delta: "+3.2% vs last term",
      },
      {
        id: "ins-hb-04",
        metric: "Avg class attendance",
        valueLabel: "91%",
        delta: "vs 85% target",
      },
    ],
    classes: [
      {
        id: "ins-cl-01",
        timeLabel: "09:00",
        title: "Backend & APIs · live lab",
        place: "Lab B3 · Yaba campus",
      },
      {
        id: "ins-cl-02",
        timeLabel: "12:00",
        title: "System design · mock interviews",
        place: "Zoom · link sent 08:00",
      },
      {
        id: "ins-cl-03",
        timeLabel: "16:00",
        title: "Office hours",
        place: "Room 12 · first come first served",
      },
    ],
    announcements: [
      {
        id: "ins-an-01",
        title: "Mid-term exam format & schedule",
        audience: "Cohort 15",
        dateLabel: "Aug 1 · 08:00",
        pinned: 1,
        status: "Published",
      },
      {
        id: "ins-an-02",
        title: "Lab B3 maintenance — next Friday",
        audience: "Backend & APIs",
        dateLabel: "Jul 30 · 14:30",
        pinned: 0,
        status: "Published",
      },
      {
        id: "ins-an-03",
        title: "Guest lecture: payments at scale",
        audience: "All cohorts",
        dateLabel: "Jul 28 · 10:15",
        pinned: 0,
        status: "Published",
      },
      {
        id: "ins-an-04",
        title: "Gradebook freeze reminder",
        audience: "Cohort 15",
        dateLabel: "Jul 25 · 17:00",
        pinned: 0,
        status: "Published",
      },
      {
        id: "ins-an-05",
        title: "Internship fair — early bird list",
        audience: "Frontend Foundations",
        dateLabel: "Jul 22 · 09:45",
        pinned: 0,
        status: "Archived",
      },
    ],
    queue: [
      {
        id: "ins-qu-01",
        student: "Chiamaka Eze",
        item: "REST API Assignment 3",
        course: "Backend & APIs",
        submitted: "Jul 31 · 09:12",
        due: "Due today",
      },
      {
        id: "ins-qu-02",
        student: "Ibrahim Sule",
        item: "SQL Fundamentals Quiz",
        course: "Backend & APIs",
        submitted: "Jul 30 · 18:40",
        due: "Due today",
      },
      {
        id: "ins-qu-03",
        student: "Funke Adeyemi",
        item: "Auth & JWT Lab",
        course: "Backend & APIs",
        submitted: "Jul 30 · 14:22",
        due: "Due Aug 1",
      },
      {
        id: "ins-qu-04",
        student: "Tunde Bakare",
        item: "Middleware Take-home",
        course: "Backend & APIs",
        submitted: "Jul 29 · 21:05",
        due: "Due Aug 1",
      },
      {
        id: "ins-qu-05",
        student: "Ngozi Umeh",
        item: "Data Modelling Brief",
        course: "Frontend Foundations",
        submitted: "Jul 29 · 10:30",
        due: "Overdue",
      },
    ],
    revisions: [
      {
        id: "ins-rv-01",
        version: "v3",
        title: "Fixed middleware demo bug",
        author: "Ada Obi",
        dateLabel: "Jul 30 · 16:42",
      },
      {
        id: "ins-rv-02",
        version: "v2",
        title: "Added JWT refresh section",
        author: "Ada Obi",
        dateLabel: "Jul 29 · 11:18",
      },
      {
        id: "ins-rv-03",
        version: "v1",
        title: "Initial draft from outline",
        author: "Ada Obi",
        dateLabel: "Jul 27 · 09:03",
      },
    ],
  };
  registerMockPattern("GET", "/v1/instructor-extras-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const items = insCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Admissions extras suite — mirrors backend seeds (migrations/0033_admissions_extras.sql) */
  const admExtrasCollections: Record<string, Record<string, unknown>[]> = {
    docOverview: [
      { id: "adh-dh-01", metric: "Verified", valueLabel: "1,206", delta: "of 1,322 docs" },
      { id: "adh-dh-02", metric: "Pending", valueLabel: "116", delta: "9 applicants" },
      { id: "adh-dh-03", metric: "Rejected", valueLabel: "14", delta: "re-upload sent" },
      { id: "adh-dh-04", metric: "Avg. verify", valueLabel: "1.8 days", delta: "target < 2" },
    ],
    checks: [
      {
        id: "adh-dc-01",
        name: "National ID verification",
        detail: "92% complete · 9 pending",
        status: "On track",
      },
      {
        id: "adh-dc-02",
        name: "Certificate checks",
        detail: "88% complete · 14 pending",
        status: "On track",
      },
      {
        id: "adh-dc-03",
        name: "Photo & consent forms",
        detail: "96% complete · 5 pending",
        status: "On track",
      },
    ],
    commOverview: [
      { id: "adh-ch-01", metric: "Sent (30d)", valueLabel: "412", delta: "10 templates" },
      { id: "adh-ch-02", metric: "Open rate", valueLabel: "71%", delta: "vs 45% bench" },
      { id: "adh-ch-03", metric: "Offers out", valueLabel: "24", delta: "11 accepted" },
      { id: "adh-ch-04", metric: "Templates", valueLabel: "10", delta: "3 drafts" },
    ],
    templates: [
      {
        id: "adh-ct-01",
        title: "Offer letter — full-time",
        usage: "Sent 24x this month",
        status: "Published",
      },
      {
        id: "adh-ct-02",
        title: "Assessment invitation",
        usage: "Sent 89x this month",
        status: "Published",
      },
      {
        id: "adh-ct-03",
        title: "Interview confirmation",
        usage: "Sent 64x this month",
        status: "Published",
      },
    ],
  };
  registerMockPattern("GET", "/v1/admissions-extras-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments.slice(2).join("/");
    const items = admExtrasCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Parent extras suite — mirrors backend seeds (migrations/0034_parent_extras.sql) */
  const parExtrasCollections: Record<string, Record<string, unknown>[]> = {
    contacts: [
      { id: "par-cn-01", name: "Mr. Adeyemi", role: "Full-Stack instructor", kind: "Message" },
      { id: "par-cn-02", name: "Ms. Chidera", role: "Cloud & DevOps instructor", kind: "Message" },
      { id: "par-cn-03", name: "Mrs. Obi", role: "Ada's mentor", kind: "Video" },
      { id: "par-cn-04", name: "Registrar's office", role: "Records & billing", kind: "Mail" },
    ],
    meetings: [
      {
        id: "par-mt-01",
        title: "Parent–teacher meeting",
        dateLabel: "Sep 5–9, 2026",
        status: "Booking open",
      },
      {
        id: "par-mt-02",
        title: "Mentor check-in (Mrs. Obi)",
        dateLabel: "Aug 21, 16:00",
        status: "Confirmed",
      },
      { id: "par-mt-03", title: "Career day webinar", dateLabel: "Sep 14, 18:00", status: "RSVP" },
    ],
  };
  registerMockPattern("GET", "/v1/parent-extras-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const items = parExtrasCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* HR training suite — mirrors backend seeds (migrations/0035_hr_training.sql) */
  const hrCollections: Record<string, Record<string, unknown>[]> = {
    overview: [
      { id: "hr-hb-01", metric: "Programs", valueLabel: "8", delta: "3 mandatory" },
      { id: "hr-hb-02", metric: "Completions", valueLabel: "142", delta: "this year" },
      { id: "hr-hb-03", metric: "Hours trained", valueLabel: "640h", delta: "staff-wide" },
      { id: "hr-hb-04", metric: "Due (90d)", valueLabel: "3", delta: "safety course" },
    ],
    programs: [
      {
        id: "hr-pr-01",
        name: "Instructor pedagogy bootcamp",
        detail: "18 enrolled · 12 complete",
        status: "Ongoing",
      },
      {
        id: "hr-pr-02",
        name: "Safety & first aid",
        detail: "All staff due Q4",
        status: "Scheduled",
      },
      {
        id: "hr-pr-03",
        name: "Cybersecurity awareness",
        detail: "94 enrolled · 80 complete",
        status: "Ongoing",
      },
    ],
  };
  registerMockPattern("GET", "/v1/hr-training-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments[2] ?? "";
    const items = hrCollections[collection] ?? [];
    return { items, total: items.length };
  });

  /* Student self-service suite — mirrors backend seeds (migrations/0036_student_self.sql) */
  const stuCollections: Record<string, Record<string, unknown>[]> = {
    attendance: [
      { id: "sah-hb-01", metric: "Present", valueLabel: "61", delta: "of 65 sessions" },
      { id: "sah-hb-02", metric: "Late arrivals", valueLabel: "3", delta: "avg 9m" },
      { id: "sah-hb-03", metric: "Excused", valueLabel: "1", delta: "medical" },
      { id: "sah-hb-04", metric: "Unexcused", valueLabel: "0", delta: "no strikes" },
    ],
    records: [
      {
        id: "sah-rd-01",
        dateLabel: "Mon, Jul 28",
        course: "Full-Stack Development",
        status: "Present",
      },
      { id: "sah-rd-02", dateLabel: "Thu, Jul 24", course: "Cloud & DevOps", status: "Present" },
      { id: "sah-rd-03", dateLabel: "Wed, Jul 23", course: "Product Design", status: "Late 12m" },
      {
        id: "sah-rd-04",
        dateLabel: "Mon, Jul 21",
        course: "Full-Stack Development",
        status: "Present",
      },
      { id: "sah-rd-05", dateLabel: "Thu, Jul 17", course: "Cloud & DevOps", status: "Excused" },
    ],
    policy: [
      { id: "sah-po-01", rule: "90% minimum per term", valueLabel: "You: 94%" },
      { id: "sah-po-02", rule: "Lates allowed", valueLabel: "3 per term" },
      { id: "sah-po-03", rule: "Check-in window", valueLabel: "QR · 10 min" },
    ],
    portfolio: [
      { id: "sph-hb-01", metric: "Projects", valueLabel: "3", delta: "2 featured" },
      { id: "sph-hb-02", metric: "Skills verified", valueLabel: "11", delta: "16 OSKM skills" },
      { id: "sph-hb-03", metric: "CV downloads", valueLabel: "27", delta: "this month" },
      { id: "sph-hb-04", metric: "Profile views", valueLabel: "142", delta: "+38% this week" },
    ],
    projects: [
      {
        id: "sph-pj-01",
        name: "NaijaEats — food delivery API",
        detail: "REST API + PostgreSQL, 40+ endpoints, rate limiting, Swagger docs.",
        tags: ["Node.js", "PostgreSQL", "Docker"],
        featured: 1,
      },
      {
        id: "sph-pj-02",
        name: "BudgetPadi — expense tracker",
        detail: "PWA with offline mode, charts and bank-format CSV export.",
        tags: ["React", "PWA", "Chart.js"],
        featured: 1,
      },
      {
        id: "sph-pj-03",
        name: "ClassBoard — LMS dashboard UI",
        detail: "Design system and component library in Figma, 60+ components.",
        tags: ["Figma", "Design system", "a11y"],
        featured: 0,
      },
    ],
    skills: [
      { id: "sph-sk-01", name: "JavaScript / TypeScript", pct: 92 },
      { id: "sph-sk-02", name: "Node.js & REST APIs", pct: 84 },
      { id: "sph-sk-03", name: "React & Tailwind", pct: 88 },
      { id: "sph-sk-04", name: "Docker & CI/CD", pct: 61 },
    ],
    cv: [
      { id: "sph-cv-01", filename: "CEA_Ada_Okafor_CV.pdf" },
      { id: "sph-cv-02", filename: "One-page resume (ATS)" },
    ],
    reportKpis: [
      { id: "srh-hb-01", metric: "Saved reports", valueLabel: "6", delta: "shared with 3 roles" },
      { id: "srh-hb-02", metric: "Runs this month", valueLabel: "42", delta: "avg 11 templates" },
      { id: "srh-hb-03", metric: "Scheduled", valueLabel: "3", delta: "weekly delivery" },
      { id: "srh-hb-04", metric: "Data sources", valueLabel: "12", delta: "all modules live" },
    ],
    templates: [
      {
        id: "sph-tpl-01",
        name: "Attendance summary — by cohort",
        category: "Academics",
        usage: "14 runs",
      },
      {
        id: "sph-tpl-02",
        name: "Grade distribution — by course",
        category: "Academics",
        usage: "9 runs",
      },
      {
        id: "sph-tpl-03",
        name: "Revenue by stream (tuition, services)",
        category: "Finance",
        usage: "11 runs",
      },
      {
        id: "sph-tpl-04",
        name: "Placement outcomes — by cohort",
        category: "Career",
        usage: "8 runs",
      },
    ],
  };
  registerMockPattern("GET", "/v1/student-self-dashboard/*", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const collection = segments.slice(2).join("/");
    const items = stuCollections[collection] ?? [];
    return { items, total: items.length };
  });
}
