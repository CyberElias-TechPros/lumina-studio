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
