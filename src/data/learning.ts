export type LessonType = "video" | "article" | "quiz" | "assignment";

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  status: "done" | "in-progress" | "locked" | "preview";
  body?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface LearningCourse {
  slug: string;
  title: string;
  subtitle: string;
  cohort: string;
  instructor: string;
  pct: number;
  tone: string;
  modules: Module[];
}

export const learningCourses: LearningCourse[] = [
  {
    slug: "full-stack",
    title: "Full-Stack Software Development",
    subtitle: "Node, React, PostgreSQL — build and ship production web apps.",
    cohort: "Cohort 15 · Week 12 of 38",
    instructor: "Prof. Adaeze Okafor",
    pct: 78,
    tone: "bg-gradient-learning",
    modules: [
      {
        id: "m1",
        title: "Foundations of the Web",
        lessons: [
          {
            id: "l1",
            title: "How the internet works",
            type: "video",
            duration: "18m",
            status: "done",
          },
          {
            id: "l2",
            title: "HTML & semantic structure",
            type: "article",
            duration: "25m",
            status: "done",
          },
          {
            id: "l3",
            title: "CSS layout & flexbox",
            type: "video",
            duration: "32m",
            status: "done",
          },
          {
            id: "l4",
            title: "JavaScript basics quiz",
            type: "quiz",
            duration: "20m",
            status: "done",
          },
        ],
      },
      {
        id: "m2",
        title: "Backend, APIs & Databases",
        lessons: [
          {
            id: "l5",
            title: "Node.js runtime & modules",
            type: "video",
            duration: "41m",
            status: "done",
          },
          {
            id: "l6",
            title: "REST design & Express routes",
            type: "video",
            duration: "38m",
            status: "done",
          },
          {
            id: "l7",
            title: "SQL & PostgreSQL fundamentals",
            type: "article",
            duration: "30m",
            status: "done",
          },
          {
            id: "l8",
            title: "Auth, sessions & JWT",
            type: "video",
            duration: "45m",
            status: "in-progress",
          },
          {
            id: "l9",
            title: "Build: REST API assignment",
            type: "assignment",
            duration: "3h",
            status: "preview",
          },
        ],
      },
      {
        id: "m3",
        title: "Frontend & Product Craft",
        lessons: [
          {
            id: "l10",
            title: "React fundamentals",
            type: "video",
            duration: "52m",
            status: "locked",
          },
          {
            id: "l11",
            title: "State & data fetching",
            type: "video",
            duration: "47m",
            status: "locked",
          },
          {
            id: "l12",
            title: "Unit tests & quality",
            type: "article",
            duration: "28m",
            status: "locked",
          },
        ],
      },
    ],
  },
  {
    slug: "cloud-devops",
    title: "Cloud Engineering & DevOps",
    subtitle: "AWS, containers, CI/CD — run infrastructure as code.",
    cohort: "Cohort 15 · Week 8 of 30",
    instructor: "Tunde Bakare",
    pct: 54,
    tone: "bg-gradient-erp",
    modules: [
      {
        id: "m1",
        title: "Cloud Foundations",
        lessons: [
          {
            id: "l1",
            title: "Cloud models & AWS global infrastructure",
            type: "video",
            duration: "35m",
            status: "done",
          },
          {
            id: "l2",
            title: "IAM & least-privilege",
            type: "article",
            duration: "22m",
            status: "done",
          },
          {
            id: "l3",
            title: "EC2, S3 & networking basics",
            type: "video",
            duration: "44m",
            status: "done",
          },
        ],
      },
      {
        id: "m2",
        title: "Containers & Kubernetes",
        lessons: [
          {
            id: "l4",
            title: "Docker images & registries",
            type: "video",
            duration: "39m",
            status: "in-progress",
          },
          {
            id: "l5",
            title: "Kubernetes pods & services",
            type: "video",
            duration: "51m",
            status: "locked",
          },
          { id: "l6", title: "Helm & GitOps", type: "article", duration: "26m", status: "locked" },
        ],
      },
      {
        id: "m3",
        title: "CI/CD & Reliability",
        lessons: [
          {
            id: "l7",
            title: "Pipelines with GitHub Actions",
            type: "video",
            duration: "42m",
            status: "locked",
          },
          {
            id: "l8",
            title: "Observability & SLOs",
            type: "article",
            duration: "31m",
            status: "locked",
          },
        ],
      },
    ],
  },
  {
    slug: "uiux-design",
    title: "Product & UI/UX Design",
    subtitle: "Research, wireframes, design systems and portfolios.",
    cohort: "Cohort 15 · Week 5 of 24",
    instructor: "Adaeze Okafor",
    pct: 31,
    tone: "bg-gradient-services",
    modules: [
      {
        id: "m1",
        title: "Design Foundations",
        lessons: [
          {
            id: "l1",
            title: "Design thinking process",
            type: "video",
            duration: "28m",
            status: "done",
          },
          {
            id: "l2",
            title: "Typography & spacing",
            type: "article",
            duration: "24m",
            status: "done",
          },
          {
            id: "l3",
            title: "Color & contrast",
            type: "video",
            duration: "33m",
            status: "in-progress",
          },
          {
            id: "l4",
            title: "Visual design critique",
            type: "assignment",
            duration: "2h",
            status: "preview",
          },
        ],
      },
      {
        id: "m2",
        title: "Research & Prototyping",
        lessons: [
          {
            id: "l5",
            title: "User interviews & synthesis",
            type: "video",
            duration: "37m",
            status: "locked",
          },
          {
            id: "l6",
            title: "Wireframes & flow maps",
            type: "article",
            duration: "29m",
            status: "locked",
          },
        ],
      },
    ],
  },
];

export const lessonsIn = (slug: string, lessonId: string) => {
  const course = learningCourses.find((c) => c.slug === slug);
  if (!course) return null;
  for (const mod of course.modules) {
    const idx = mod.lessons.findIndex((l) => l.id === lessonId);
    if (idx !== -1) return { course, module: mod, lesson: mod.lessons[idx], index: idx };
  }
  return null;
};

export interface GradebookCourse {
  name: string;
  units: number;
  items: {
    name: string;
    kind: "quiz" | "assignment" | "exam" | "lab";
    weight: number;
    score: number;
    max: number;
  }[];
  letter: string;
  pct: number;
  trend: "+" | "-" | "=";
}

export const gradebook: GradebookCourse[] = [
  {
    name: "Backend & APIs",
    units: 3,
    letter: "A",
    pct: 92,
    trend: "+",
    items: [
      { name: "REST design quiz", kind: "quiz", weight: 10, score: 46, max: 50 },
      { name: "SQL & modelling lab", kind: "lab", weight: 15, score: 88, max: 100 },
      { name: "REST API assignment", kind: "assignment", weight: 25, score: 94, max: 100 },
      { name: "Mid-term exam", kind: "exam", weight: 20, score: 91, max: 100 },
      { name: "Final project", kind: "assignment", weight: 30, score: 92, max: 100 },
    ],
  },
  {
    name: "DevOps Fundamentals",
    units: 2,
    letter: "B+",
    pct: 86,
    trend: "+",
    items: [
      { name: "Cloud models quiz", kind: "quiz", weight: 10, score: 42, max: 50 },
      { name: "CI/CD pipeline lab", kind: "lab", weight: 25, score: 85, max: 100 },
      { name: "Containerisation assignment", kind: "assignment", weight: 30, score: 88, max: 100 },
      { name: "Mid-term exam", kind: "exam", weight: 35, score: 84, max: 100 },
    ],
  },
  {
    name: "Design Systems",
    units: 2,
    letter: "A-",
    pct: 89,
    trend: "-",
    items: [
      { name: "Token audit quiz", kind: "quiz", weight: 10, score: 48, max: 50 },
      { name: "Component spec lab", kind: "lab", weight: 30, score: 90, max: 100 },
      { name: "Pattern library assignment", kind: "assignment", weight: 35, score: 87, max: 100 },
      { name: "Peer review", kind: "exam", weight: 25, score: 91, max: 100 },
    ],
  },
  {
    name: "Career Readiness",
    units: 1,
    letter: "A",
    pct: 94,
    trend: "=",
    items: [
      { name: "Portfolio review", kind: "assignment", weight: 50, score: 95, max: 100 },
      { name: "Mock interview", kind: "exam", weight: 50, score: 93, max: 100 },
    ],
  },
];

export const courseBuilder = {
  slug: "backend-apis",
  title: "Backend, APIs & Databases",
  status: "published" as const,
  cohort: "Cohort 15 · 42 learners",
  modules: [
    {
      id: "m1",
      title: "Node & HTTP",
      lessons: [
        { title: "Runtime & event loop", type: "video" as const, status: "published" as const },
        {
          title: "Express routing deep-dive",
          type: "video" as const,
          status: "published" as const,
        },
        {
          title: "Middleware & error handling",
          type: "article" as const,
          status: "published" as const,
        },
      ],
    },
    {
      id: "m2",
      title: "Data & SQL",
      lessons: [
        {
          title: "Modelling with PostgreSQL",
          type: "video" as const,
          status: "published" as const,
        },
        { title: "Migrations & seeds", type: "article" as const, status: "published" as const },
        { title: "ORM or raw SQL?", type: "quiz" as const, status: "draft" as const },
      ],
    },
    {
      id: "m3",
      title: "Auth & Security",
      lessons: [
        { title: "Session vs JWT", type: "article" as const, status: "draft" as const },
        { title: "RBAC implementation", type: "video" as const, status: "draft" as const },
      ],
    },
  ],
};

export interface StudentAssignment {
  id: string;
  title: string;
  course: string;
  description: string;
  due: string;
  status: "submitted" | "pending" | "draft" | "graded";
  score?: number;
  max: number;
  weight: number;
  submissions?: { file: string; size: string; uploaded: string }[];
  rubric: { criterion: string; detail: string; weight: number }[];
}

export const assignments: StudentAssignment[] = [
  {
    id: "a1",
    title: "Build: REST API assignment",
    course: "Backend & APIs",
    description:
      "Ship a production-ready REST API in Express with PostgreSQL, auth (JWT + refresh rotation), validation, and a test suite. Follow the starter repo and the acceptance criteria below.",
    due: "Today 23:59",
    status: "submitted",
    weight: 25,
    max: 100,
    submissions: [{ file: "api-submission.zip", size: "4.2 MB", uploaded: "Today 18:31" }],
    rubric: [
      {
        criterion: "API design & routes",
        detail: "REST conventions, status codes, error shapes",
        weight: 20,
      },
      { criterion: "Auth & security", detail: "JWT rotation, bcrypt, rate limiting", weight: 25 },
      { criterion: "Data layer", detail: "Postgres schema, migrations, indexes", weight: 25 },
      { criterion: "Tests & docs", detail: "Coverage > 70%, README with runbook", weight: 15 },
      { criterion: "Code quality", detail: "Linting, typing, no secrets in repo", weight: 15 },
    ],
  },
  {
    id: "a2",
    title: "Containerisation assignment",
    course: "DevOps Fundamentals",
    description:
      "Dockerise the REST API from the backend course: multi-stage build, health checks, docker-compose for the stack, and a CI workflow that builds and pushes images.",
    due: "Sun · 23:59",
    status: "draft",
    max: 100,
    weight: 30,
    submissions: [
      { file: "dockerfile-draft.Dockerfile", size: "8 KB", uploaded: "Yesterday 21:04" },
    ],
    rubric: [
      { criterion: "Dockerfile", detail: "Multi-stage, non-root user, pinned base", weight: 30 },
      { criterion: "Compose stack", detail: "App + db + reverse proxy with volumes", weight: 30 },
      { criterion: "CI pipeline", detail: "Build, scan, publish images", weight: 25 },
      { criterion: "Docs", detail: "Local run instructions", weight: 15 },
    ],
  },
  {
    id: "a3",
    title: "Capstone artifact #3 — portfolio piece",
    course: "Product & UI/UX Design",
    description:
      "Third capstone artifact: a polished case study of one project — problem, process, prototypes and outcome. Must be published to your portfolio page.",
    due: "Aug 9 · 23:59",
    status: "pending",
    max: 100,
    weight: 30,
    rubric: [
      { criterion: "Storytelling", detail: "Clear problem → process → outcome", weight: 30 },
      { criterion: "Craft", detail: "Visual polish, consistency", weight: 30 },
      { criterion: "Depth", detail: "Research and iteration shown", weight: 25 },
      { criterion: "Publishing", detail: "Live URL in portfolio", weight: 15 },
    ],
  },
  {
    id: "a4",
    title: "Pattern library assignment",
    course: "Design Systems",
    description:
      "Extend the cohort design system: document 5 new components with usage, anatomy and accessibility notes in Storybook.",
    due: "Graded",
    status: "graded",
    score: 87,
    max: 100,
    weight: 35,
    rubric: [
      { criterion: "Documentation", detail: "Usage, anatomy, do/don't", weight: 40 },
      { criterion: "Accessibility", detail: "Keyboard, contrast, ARIA", weight: 30 },
      { criterion: "Consistency", detail: "Tokens, naming, variants", weight: 30 },
    ],
  },
];

export const assignmentById = (id: string) => assignments.find((a) => a.id === id);

export interface Assessment {
  id: string;
  title: string;
  course: string;
  kind: "quiz" | "exam" | "test";
  questions: number;
  duration: string;
  due: string;
  status: "done" | "available" | "scheduled" | "overdue";
  score?: number;
  max?: number;
  attempts: number;
  attemptsLeft: number;
  window: string;
}

export const assessments: Assessment[] = [
  {
    id: "q1",
    title: "Auth & security knowledge check",
    course: "Backend & APIs",
    kind: "quiz",
    questions: 5,
    duration: "20 min",
    due: "Due Fri",
    status: "available",
    attempts: 1,
    attemptsLeft: 2,
    window: "Opens Thu 00:00 · closes Sun 23:59",
  },
  {
    id: "q2",
    title: "HTTP & REST fundamentals",
    course: "Backend & APIs",
    kind: "quiz",
    questions: 10,
    duration: "25 min",
    due: "Done · 46/50",
    status: "done",
    score: 46,
    max: 50,
    attempts: 1,
    attemptsLeft: 1,
    window: "Closed",
  },
  {
    id: "t1",
    title: "Mid-term test — Backend",
    course: "Backend & APIs",
    kind: "test",
    questions: 30,
    duration: "90 min",
    due: "Graded · 91%",
    status: "done",
    score: 91,
    max: 100,
    attempts: 1,
    attemptsLeft: 0,
    window: "Closed",
  },
  {
    id: "e1",
    title: "Term exam — Full-Stack capstone",
    course: "Full-Stack Software Development",
    kind: "exam",
    questions: 45,
    duration: "3 h",
    due: "Aug 20 · 09:00",
    status: "scheduled",
    attempts: 1,
    attemptsLeft: 0,
    window: "Opens Aug 20 09:00 · closes 12:00",
  },
];

export interface CalendarEvent {
  id: string;
  date: string;
  day: string;
  title: string;
  kind: "class" | "deadline" | "mentor" | "event" | "exam";
  time: string;
  location: string;
}

export const calendarEvents: CalendarEvent[] = [
  {
    id: "c1",
    date: "31",
    day: "Fri",
    title: "Backend live class — auth patterns",
    kind: "class",
    time: "10:00–12:00",
    location: "Hall A · hybrid",
  },
  {
    id: "c2",
    date: "31",
    day: "Fri",
    title: "REST API assignment due",
    kind: "deadline",
    time: "23:59",
    location: "Submit on portal",
  },
  {
    id: "c3",
    date: "1",
    day: "Sat",
    title: "Mentor circle — Adaeze",
    kind: "mentor",
    time: "14:00–15:00",
    location: "Room 2",
  },
  {
    id: "c4",
    date: "3",
    day: "Mon",
    title: "DevOps live class — Docker",
    kind: "class",
    time: "09:00–11:00",
    location: "Hall B",
  },
  {
    id: "c5",
    date: "4",
    day: "Tue",
    title: "Open day — volunteer shift",
    kind: "event",
    time: "09:00–13:00",
    location: "Lobby",
  },
  {
    id: "c6",
    date: "5",
    day: "Wed",
    title: "Design studio crit",
    kind: "class",
    time: "15:00–17:00",
    location: "Design lab",
  },
  {
    id: "c7",
    date: "6",
    day: "Thu",
    title: "Auth quiz window opens",
    kind: "deadline",
    time: "00:00",
    location: "Online",
  },
  {
    id: "c8",
    date: "8",
    day: "Sat",
    title: "Employer spotlight — Paystack",
    kind: "event",
    time: "11:00–13:00",
    location: "Hall A",
  },
  {
    id: "c9",
    date: "9",
    day: "Sun",
    title: "Capstone artifact #3 due",
    kind: "deadline",
    time: "23:59",
    location: "Portfolio",
  },
  {
    id: "c10",
    date: "20",
    day: "Thu",
    title: "Term exam — capstone",
    kind: "exam",
    time: "09:00–12:00",
    location: "Exam hall",
  },
];

export interface MessageThread {
  id: string;
  name: string;
  role: string;
  unread: number;
  last: { text: string; time: string; mine: boolean };
  messages: { text: string; time: string; mine: boolean }[];
}

export const threads: MessageThread[] = [
  {
    id: "t1",
    name: "Emeka Nwosu",
    role: "Instructor · Backend",
    unread: 2,
    last: { text: "Your API submission was the strongest in the cohort.", time: "2h", mine: false },
    messages: [
      { text: "Your API submission was the strongest in the cohort.", time: "2h", mine: false },
      { text: "Thank you! The refresh-token rotation part was tricky.", time: "1h", mine: true },
      {
        text: "That's what separates A work. Push the same standard into Docker.",
        time: "1h",
        mine: false,
      },
    ],
  },
  {
    id: "t2",
    name: "Career Services",
    role: "Adaeze · Placement lead",
    unread: 0,
    last: {
      text: "Employer spotlight: Paystack frontend role closes Friday.",
      time: "1d",
      mine: false,
    },
    messages: [
      {
        text: "Employer spotlight: Paystack frontend role closes Friday.",
        time: "1d",
        mine: false,
      },
    ],
  },
  {
    id: "t3",
    name: "Zainab K.",
    role: "Classmate · Cohort 15",
    unread: 1,
    last: { text: "Do you have the Docker starter repo handy?", time: "3h", mine: false },
    messages: [{ text: "Do you have the Docker starter repo handy?", time: "3h", mine: false }],
  },
  {
    id: "t4",
    name: "Mentor Circle — Adaeze",
    role: "Group · 6 members",
    unread: 0,
    last: { text: "Reminder: Saturday session moved to 14:00.", time: "1d", mine: false },
    messages: [{ text: "Reminder: Saturday session moved to 14:00.", time: "1d", mine: false }],
  },
];

export interface InstructorSubmission {
  id: string;
  student: string;
  title: string;
  submitted: string;
  status: "graded" | "pending";
  score?: number;
  late: boolean;
  file: string;
  size: string;
}

export const submissions: InstructorSubmission[] = [
  {
    id: "s1",
    student: "Amara Nwosu",
    title: "REST API assignment",
    submitted: "Today 18:31",
    status: "pending",
    late: false,
    file: "api-submission.zip",
    size: "4.2 MB",
  },
  {
    id: "s2",
    student: "Dapo Olu",
    title: "REST API assignment",
    submitted: "Today 17:02",
    status: "pending",
    late: false,
    file: "dapo-rest-api.zip",
    size: "3.8 MB",
  },
  {
    id: "s3",
    student: "Zainab K.",
    title: "REST API assignment",
    submitted: "Yesterday 23:41",
    status: "pending",
    late: true,
    file: "zainab-submission.zip",
    size: "5.1 MB",
  },
  {
    id: "s4",
    student: "Chidi Eze",
    title: "REST API assignment",
    submitted: "Yesterday 15:20",
    status: "graded",
    score: 88,
    late: false,
    file: "chidi-api.zip",
    size: "4.0 MB",
  },
  {
    id: "s5",
    student: "Halima Sani",
    title: "REST API assignment",
    submitted: "Mon 22:10",
    status: "graded",
    score: 94,
    late: false,
    file: "halima-api.zip",
    size: "3.6 MB",
  },
  {
    id: "s6",
    student: "Tunde Bakare",
    title: "REST API assignment",
    submitted: "Mon 09:05",
    status: "graded",
    score: 91,
    late: false,
    file: "tunde-api.zip",
    size: "4.7 MB",
  },
];

export const submissionById = (id: string) => submissions.find((s) => s.id === id);

export interface InstructorGradebookRow {
  student: string;
  quiz: number;
  lab: number;
  assignment: number;
  midterm: number;
  total: number;
  letter: string;
  atRisk: boolean;
}

export const instructorGradebook: InstructorGradebookRow[] = [
  {
    student: "Halima Sani",
    quiz: 94,
    lab: 96,
    assignment: 94,
    midterm: 91,
    total: 93.4,
    letter: "A",
    atRisk: false,
  },
  {
    student: "Amara Nwosu",
    quiz: 92,
    lab: 88,
    assignment: 94,
    midterm: 91,
    total: 91.9,
    letter: "A",
    atRisk: false,
  },
  {
    student: "Tunde Bakare",
    quiz: 88,
    lab: 90,
    assignment: 91,
    midterm: 86,
    total: 88.9,
    letter: "A-",
    atRisk: false,
  },
  {
    student: "Chidi Eze",
    quiz: 84,
    lab: 82,
    assignment: 88,
    midterm: 85,
    total: 85.2,
    letter: "B+",
    atRisk: false,
  },
  {
    student: "Zainab K.",
    quiz: 90,
    lab: 78,
    assignment: 76,
    midterm: 81,
    total: 80.8,
    letter: "B+",
    atRisk: true,
  },
  {
    student: "Dapo Olu",
    quiz: 72,
    lab: 70,
    assignment: 68,
    midterm: 74,
    total: 71.2,
    letter: "B-",
    atRisk: true,
  },
  {
    student: "Ngozi Umeh",
    quiz: 66,
    lab: 62,
    assignment: 58,
    midterm: 61,
    total: 61.4,
    letter: "C",
    atRisk: true,
  },
  {
    student: "Samuel Adebayo",
    quiz: 58,
    lab: 52,
    assignment: 47,
    midterm: 55,
    total: 53.1,
    letter: "C-",
    atRisk: true,
  },
];

export interface LiveSession {
  id: string;
  title: string;
  instructor: string;
  cohort: string;
  status: string;
  startsAt: string;
}

export const liveSessions: LiveSession[] = [
  {
    id: "live-1",
    title: "Web Fundamentals — weekly live class",
    instructor: "Chioma Eze",
    cohort: "Cohort 15",
    status: "live",
    startsAt: "Fri — 4:00 PM",
  },
  {
    id: "live-2",
    title: "JavaScript: arrays & objects deep dive",
    instructor: "Yusuf Bello",
    cohort: "Cohort 15",
    status: "scheduled",
    startsAt: "Mon — 10:00 AM",
  },
  {
    id: "live-3",
    title: "Portfolio review clinic",
    instructor: "Ada Obi",
    cohort: "Cohort 15",
    status: "ended",
    startsAt: "Jul 29 — 3:00 PM",
  },
];
