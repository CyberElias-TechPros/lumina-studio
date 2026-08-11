export type RoleKey =
  | "student"
  | "instructor"
  | "department-head"
  | "admin"
  | "admissions"
  | "finance"
  | "hr"
  | "client"
  | "employer"
  | "mentor"
  | "marketing"
  | "director";

export const roles: {
  key: RoleKey;
  label: string;
  engine: "learning" | "career" | "services" | "erp" | "community";
  person: string;
  title: string;
  home: string;
}[] = [
  {
    key: "student",
    label: "Student",
    engine: "learning",
    person: "Chiamaka Obi",
    title: "Cohort 12 Â· Full-Stack",
    home: "/app/student",
  },
  {
    key: "instructor",
    label: "Instructor",
    engine: "learning",
    person: "Ifeanyi Duru",
    title: "Lead Instructor",
    home: "/app/instructor",
  },
  {
    key: "department-head",
    label: "Department Head",
    engine: "learning",
    person: "Ngozi Bello",
    title: "Head of Cybersecurity",
    home: "/app/department",
  },
  {
    key: "admin",
    label: "Admin / Ops",
    engine: "erp",
    person: "Aisha Bakare",
    title: "Head of Operations",
    home: "/app/admin",
  },
  {
    key: "admissions",
    label: "Admissions",
    engine: "erp",
    person: "Tolu Ajayi",
    title: "Admissions Officer",
    home: "/app/admissions",
  },
  {
    key: "finance",
    label: "Finance",
    engine: "erp",
    person: "Musa Ibrahim",
    title: "Accountant",
    home: "/app/finance",
  },
  {
    key: "hr",
    label: "HR",
    engine: "erp",
    person: "Grace Eze",
    title: "HR Officer",
    home: "/app/hr",
  },
  {
    key: "client",
    label: "Client",
    engine: "services",
    person: "Sabi Logistics",
    title: "Client Portal",
    home: "/app/client",
  },
  {
    key: "employer",
    label: "Employer",
    engine: "career",
    person: "Paystack",
    title: "Talent Partner",
    home: "/app/employer",
  },
  {
    key: "mentor",
    label: "Mentor & Alumni",
    engine: "community",
    person: "Emeka Nwosu",
    title: "Cloud Mentor",
    home: "/app/mentor",
  },
  {
    key: "marketing",
    label: "Marketing",
    engine: "career",
    person: "Zainab Lawal",
    title: "Marketing Officer",
    home: "/app/marketing",
  },
  {
    key: "director",
    label: "Director",
    engine: "erp",
    person: "Elias Okonkwo",
    title: "Founder & Director",
    home: "/app/director",
  },
];

export const roleMap = Object.fromEntries(roles.map((r) => [r.key, r])) as Record<
  RoleKey,
  (typeof roles)[number]
>;

/* ---------------- Student ---------------- */

export const studentCourses = [
  {
    id: "c1",
    title: "Frontend with React & TypeScript",
    instructor: "Ifeanyi Duru",
    progress: 78,
    nextLesson: "Server state with TanStack Query",
    due: "Today",
    engine: "learning",
  },
  {
    id: "c2",
    title: "Backend, APIs & Databases",
    instructor: "Samuel Ade",
    progress: 54,
    nextLesson: "Indexing strategies",
    due: "Thu",
    engine: "learning",
  },
  {
    id: "c3",
    title: "Cloud, CI/CD & DevOps Basics",
    instructor: "Emeka Nwosu",
    progress: 31,
    nextLesson: "Containerising a Node app",
    due: "Next week",
    engine: "learning",
  },
  {
    id: "c4",
    title: "Professional Practice",
    instructor: "Aisha Bakare",
    progress: 92,
    nextLesson: "Client communication clinic",
    due: "Fri",
    engine: "career",
  },
];

export const studentAssignments = [
  {
    id: "a1",
    title: "Build a typed data table",
    course: "Frontend with React",
    due: "2026-08-02",
    status: "In progress",
    score: null,
  },
  {
    id: "a2",
    title: "Design a normalised schema",
    course: "Backend & Databases",
    due: "2026-08-05",
    status: "Not started",
    score: null,
  },
  {
    id: "a3",
    title: "CI pipeline for the team repo",
    course: "Cloud & DevOps",
    due: "2026-08-09",
    status: "Not started",
    score: null,
  },
  {
    id: "a4",
    title: "Accessibility audit",
    course: "Frontend with React",
    due: "2026-07-24",
    status: "Graded",
    score: 92,
  },
  {
    id: "a5",
    title: "REST API v1",
    course: "Backend & Databases",
    due: "2026-07-18",
    status: "Graded",
    score: 86,
  },
  {
    id: "a6",
    title: "Team retrospective write-up",
    course: "Professional Practice",
    due: "2026-07-12",
    status: "Graded",
    score: 95,
  },
];

export const studentGrades = [
  { module: "Foundations", score: 88, weight: "15%" },
  { module: "Frontend", score: 92, weight: "25%" },
  { module: "Backend", score: 86, weight: "25%" },
  { module: "Cloud", score: 79, weight: "15%" },
  { module: "Professional Practice", score: 95, weight: "20%" },
];

export const progressSeries = [
  { week: "W1", hours: 6, score: 62 },
  { week: "W2", hours: 9, score: 68 },
  { week: "W3", hours: 8, score: 71 },
  { week: "W4", hours: 12, score: 79 },
  { week: "W5", hours: 11, score: 82 },
  { week: "W6", hours: 14, score: 87 },
  { week: "W7", hours: 13, score: 89 },
  { week: "W8", hours: 16, score: 92 },
];

export const attendanceRecords = [
  { date: "2026-07-27", session: "React state patterns", status: "Present" },
  { date: "2026-07-25", session: "Database indexing", status: "Present" },
  { date: "2026-07-23", session: "Docker fundamentals", status: "Late" },
  { date: "2026-07-21", session: "Design review", status: "Present" },
  { date: "2026-07-18", session: "API security", status: "Absent" },
  { date: "2026-07-16", session: "Testing workshop", status: "Present" },
];

export const certificates = [
  {
    id: "CEA-2026-0421",
    title: "Frontend Development Foundations",
    issued: "2026-04-12",
    status: "Issued",
  },
  {
    id: "CEA-2026-0733",
    title: "Version Control with Git",
    issued: "2026-02-28",
    status: "Issued",
  },
  {
    id: "CEA-2026-1180",
    title: "Full-Stack Software Development",
    issued: null,
    status: "In progress",
  },
];

export const paymentsHistory = [
  {
    id: "INV-2041",
    description: "Tuition instalment 3 of 4",
    amount: 212500,
    date: "2026-07-01",
    status: "Paid",
  },
  {
    id: "INV-1902",
    description: "Tuition instalment 2 of 4",
    amount: 212500,
    date: "2026-04-01",
    status: "Paid",
  },
  {
    id: "INV-1744",
    description: "Tuition instalment 1 of 4",
    amount: 212500,
    date: "2026-01-08",
    status: "Paid",
  },
  {
    id: "INV-2210",
    description: "Tuition instalment 4 of 4",
    amount: 212500,
    date: "2026-10-01",
    status: "Due",
  },
];

export const portfolioProjects = [
  {
    title: "Dispatch dashboard",
    stack: ["React", "TypeScript", "Recharts"],
    status: "Published",
    views: 412,
  },
  {
    title: "Inventory API",
    stack: ["Node", "PostgreSQL", "Docker"],
    status: "Published",
    views: 268,
  },
  { title: "Design system starter", stack: ["Figma", "Tailwind"], status: "Draft", views: 0 },
];

/* ---------------- Instructor ---------------- */

export const cohorts = [
  {
    id: "co-12",
    name: "Cohort 12 Â· Full-Stack",
    students: 42,
    progress: 68,
    attendance: 91,
    atRisk: 4,
  },
  {
    id: "co-09",
    name: "Cohort 9 Â· Cybersecurity",
    students: 31,
    progress: 74,
    attendance: 88,
    atRisk: 2,
  },
  {
    id: "co-14",
    name: "Cohort 14 Â· Cloud",
    students: 28,
    progress: 41,
    attendance: 84,
    atRisk: 6,
  },
];

export const gradebook = [
  { student: "Chiamaka Obi", a1: 92, a2: 86, a3: 88, avg: 89, trend: "up" },
  { student: "Tunde Adeyemi", a1: 78, a2: 84, a3: 81, avg: 81, trend: "up" },
  { student: "Halima Yusuf", a1: 95, a2: 91, a3: 97, avg: 94, trend: "flat" },
  { student: "Chidi Uche", a1: 61, a2: 55, a3: 58, avg: 58, trend: "down" },
  { student: "Fatima Sani", a1: 88, a2: 90, a3: 85, avg: 88, trend: "flat" },
  { student: "Segun Ola", a1: 72, a2: 79, a3: 83, avg: 78, trend: "up" },
];

export const submissions = [
  {
    student: "Chidi Uche",
    assignment: "Typed data table",
    submitted: "2026-07-30",
    status: "Pending",
  },
  {
    student: "Fatima Sani",
    assignment: "Typed data table",
    submitted: "2026-07-30",
    status: "Pending",
  },
  {
    student: "Segun Ola",
    assignment: "Normalised schema",
    submitted: "2026-07-29",
    status: "Pending",
  },
  {
    student: "Tunde Adeyemi",
    assignment: "CI pipeline",
    submitted: "2026-07-28",
    status: "Graded",
  },
];

/* ---------------- Admissions ---------------- */

export const applicationPipeline = [
  {
    stage: "New",
    items: [
      { name: "Blessing Eze", program: "Data Science & AI", days: 1 },
      { name: "Yusuf Bala", program: "Cybersecurity", days: 2 },
      { name: "Ada Nwoke", program: "UI/UX Design", days: 2 },
    ],
  },
  {
    stage: "Screening",
    items: [
      { name: "Peter Obi", program: "Full-Stack", days: 4 },
      { name: "Maryam Idris", program: "Cloud & DevOps", days: 5 },
    ],
  },
  {
    stage: "Interview",
    items: [
      { name: "Kelechi Anya", program: "Full-Stack", days: 7 },
      { name: "Sadiq Umar", program: "Networking", days: 6 },
      { name: "Joy Bassey", program: "Marketing", days: 8 },
    ],
  },
  {
    stage: "Offer",
    items: [
      { name: "Ifeoma Nnaji", program: "Data Science & AI", days: 10 },
      { name: "Tari George", program: "Mobile Dev", days: 11 },
    ],
  },
  {
    stage: "Enrolled",
    items: [
      { name: "Bola Salami", program: "Cybersecurity", days: 14 },
      { name: "Uche Kalu", program: "Full-Stack", days: 15 },
    ],
  },
];

export const admissionsFunnel = [
  { stage: "Applications", value: 1240 },
  { stage: "Screened", value: 880 },
  { stage: "Interviewed", value: 512 },
  { stage: "Offered", value: 348 },
  { stage: "Enrolled", value: 291 },
];

/* ---------------- Finance ---------------- */

export const revenueSeries = [
  { month: "Jan", tuition: 42, services: 18, expenses: 34 },
  { month: "Feb", tuition: 46, services: 22, expenses: 35 },
  { month: "Mar", tuition: 51, services: 26, expenses: 37 },
  { month: "Apr", tuition: 49, services: 31, expenses: 38 },
  { month: "May", tuition: 58, services: 29, expenses: 41 },
  { month: "Jun", tuition: 64, services: 35, expenses: 43 },
  { month: "Jul", tuition: 71, services: 38, expenses: 45 },
];

export const invoices = [
  { id: "INV-3301", party: "Sabi Logistics", amount: 4200000, due: "2026-08-10", status: "Sent" },
  {
    id: "INV-3298",
    party: "Arewa Microfinance",
    amount: 1850000,
    due: "2026-08-02",
    status: "Overdue",
  },
  {
    id: "INV-3290",
    party: "Greenfield Schools",
    amount: 6400000,
    due: "2026-07-20",
    status: "Paid",
  },
  { id: "INV-3288", party: "Kaduna State ICT", amount: 9100000, due: "2026-07-15", status: "Paid" },
  { id: "INV-3275", party: "Kuda", amount: 980000, due: "2026-08-22", status: "Draft" },
];

export const expenses = [
  { category: "Salaries", amount: 28400000 },
  { category: "Facilities", amount: 6200000 },
  { category: "Cloud & tooling", amount: 3100000 },
  { category: "Marketing", amount: 4800000 },
  { category: "Equipment", amount: 2600000 },
];

/* ---------------- HR ---------------- */

export const employees = [
  {
    name: "Ifeanyi Duru",
    role: "Lead Instructor",
    dept: "Learning",
    status: "Active",
    joined: "2021-03-01",
  },
  {
    name: "Ngozi Bello",
    role: "Head of Cybersecurity",
    dept: "Learning",
    status: "Active",
    joined: "2020-08-15",
  },
  {
    name: "Aisha Bakare",
    role: "Head of Operations",
    dept: "Operations",
    status: "Active",
    joined: "2019-11-04",
  },
  {
    name: "Musa Ibrahim",
    role: "Accountant",
    dept: "Finance",
    status: "Active",
    joined: "2022-01-10",
  },
  {
    name: "Zainab Lawal",
    role: "Marketing Officer",
    dept: "Growth",
    status: "On leave",
    joined: "2023-06-19",
  },
  {
    name: "Tolu Ajayi",
    role: "Admissions Officer",
    dept: "Admissions",
    status: "Active",
    joined: "2023-02-27",
  },
];

export const leaveRequests = [
  {
    name: "Zainab Lawal",
    type: "Annual",
    from: "2026-07-28",
    to: "2026-08-08",
    status: "Approved",
  },
  { name: "Samuel Ade", type: "Sick", from: "2026-08-03", to: "2026-08-05", status: "Pending" },
  { name: "Grace Eze", type: "Study", from: "2026-09-01", to: "2026-09-12", status: "Pending" },
];

export const headcountSeries = [
  { month: "Feb", staff: 38 },
  { month: "Mar", staff: 41 },
  { month: "Apr", staff: 43 },
  { month: "May", staff: 46 },
  { month: "Jun", staff: 49 },
  { month: "Jul", staff: 52 },
];

export const payrollChanges = [
  {
    title: "New starter â€” K. Okafor",
    detail: "Effective Aug 1",
    status: "sent",
  },
  {
    title: "Salary revision â€” 3 staff",
    detail: "Approved by director",
    status: "sent",
  },
  {
    title: "Leaver â€” J. Okonkwo",
    detail: "Effective Aug 15",
    status: "draft",
  },
  {
    title: "Stipend adjustment â€” interns",
    detail: "Pending director sign-off",
    status: "draft",
  },
  {
    title: "Payroll run #128 â€” July",
    detail: "Processed Jul 31",
    status: "sent",
  },
];

export const paymentBatches = [
  {
    batch: "Batch #204 â€” tuition instalments",
    amount: 4800000,
    count: 22,
    date: "Jul 30",
    status: "Reconciled",
  },
  {
    batch: "Batch #203 â€” supplier bills",
    amount: 1900000,
    count: 6,
    date: "Jul 26",
    status: "Reconciled",
  },
  {
    batch: "Batch #205 â€” stipends",
    amount: 620000,
    count: 8,
    date: "Aug 1",
    status: "Pending approval",
  },
];

export const payments = [
  {
    id: "pay-1",
    reference: "cea_demo_a1b2c3d4",
    email: "student@cea.ng",
    amount: 480000,
    currency: "NGN",
    status: "success",
    provider: "paystack",
    description: "Tuition â€” instalment 1 of 2",
    paidAt: "Jul 30, 2026",
  },
  {
    id: "pay-2",
    reference: "cea_demo_e5f6a7b8",
    email: "student@cea.ng",
    amount: 25000,
    currency: "NGN",
    status: "success",
    provider: "paystack",
    description: "Design tools add-on",
    paidAt: "Jul 22, 2026",
  },
  {
    id: "pay-3",
    reference: "cea_demo_c9d0e1f2",
    email: "student@cea.ng",
    amount: 120000,
    currency: "NGN",
    status: "success",
    provider: "paystack",
    description: "Bootcamp sprint 2 fee",
    paidAt: "Jul 14, 2026",
  },
  {
    id: "pay-4",
    reference: "cea_demo_3a4b5c6d",
    email: "student@cea.ng",
    amount: 320000,
    currency: "NGN",
    status: "pending",
    provider: "paystack",
    description: "Tuition â€” instalment 2 of 2",
  },
];

/* ---------------- Client / Projects ---------------- */

export const clientProjects = [
  {
    name: "Dispatch platform v2",
    progress: 72,
    phase: "Build",
    lead: "Squad Alpha",
    due: "2026-09-14",
  },
  {
    name: "Driver mobile app",
    progress: 45,
    phase: "Design",
    lead: "Squad Beta",
    due: "2026-10-02",
  },
  {
    name: "Analytics warehouse",
    progress: 18,
    phase: "Discovery",
    lead: "Squad Delta",
    due: "2026-11-20",
  },
];

export const deliverables = [
  { name: "Design system v1", status: "Approved", date: "2026-07-04" },
  { name: "Routing engine spec", status: "Approved", date: "2026-07-12" },
  { name: "Sprint 6 demo build", status: "In review", date: "2026-07-29" },
  { name: "Load test report", status: "Pending", date: "2026-08-08" },
];

export const tickets = [
  {
    id: "TK-882",
    subject: "Driver app crashes on cold start",
    priority: "High",
    status: "Open",
    updated: "2h ago",
  },
  {
    id: "TK-879",
    subject: "Export CSV missing columns",
    priority: "Medium",
    status: "In progress",
    updated: "6h ago",
  },
  {
    id: "TK-871",
    subject: "Add Yoruba language option",
    priority: "Low",
    status: "Backlog",
    updated: "2d ago",
  },
  {
    id: "TK-864",
    subject: "SSO login loop",
    priority: "High",
    status: "Resolved",
    updated: "4d ago",
  },
];

/* ---------------- Employer ---------------- */

export const jobPosts = [
  {
    title: "Frontend Engineer",
    applicants: 48,
    shortlisted: 9,
    stage: "Interviewing",
    posted: "2026-07-18",
  },
  {
    title: "Data Analyst",
    applicants: 31,
    shortlisted: 6,
    stage: "Screening",
    posted: "2026-07-24",
  },
  { title: "QA Engineer", applicants: 12, shortlisted: 2, stage: "Open", posted: "2026-07-29" },
];

export const candidates = [
  { name: "Chiamaka Obi", program: "Full-Stack", score: 94, stage: "Final interview", match: 96 },
  { name: "Segun Ola", program: "Full-Stack", score: 78, stage: "Technical", match: 81 },
  { name: "Fatima Sani", program: "Data Science", score: 88, stage: "Screening", match: 87 },
  { name: "Tunde Adeyemi", program: "Cybersecurity", score: 81, stage: "Offer", match: 90 },
];

/* ---------------- Mentor / Alumni ---------------- */

export const mentees = [
  {
    name: "Chidi Uche",
    program: "Cloud & DevOps",
    nextSession: "2026-08-02 17:00",
    progress: 42,
    flag: "At risk",
  },
  {
    name: "Joy Bassey",
    program: "Marketing",
    nextSession: "2026-08-04 18:30",
    progress: 71,
    flag: "On track",
  },
  {
    name: "Sadiq Umar",
    program: "Networking",
    nextSession: "2026-08-06 16:00",
    progress: 88,
    flag: "Ahead",
  },
];

export const alumniHighlights = [
  { name: "Chiamaka Obi", now: "Frontend Engineer, Paystack", year: 2024 },
  { name: "Tunde Adeyemi", now: "SOC Analyst, Interswitch", year: 2023 },
  { name: "Emeka Nwosu", now: "Cloud Engineer, Andela", year: 2022 },
  { name: "Halima Yusuf", now: "Independent Product Designer", year: 2024 },
];

/* ---------------- Marketing ---------------- */

export const campaigns = [
  {
    name: "Q3 Cohort Intake",
    channel: "Meta Ads",
    spend: 3200000,
    leads: 1840,
    cpl: 1739,
    status: "Live",
  },
  {
    name: "Cybersecurity Webinar",
    channel: "LinkedIn",
    spend: 980000,
    leads: 412,
    cpl: 2379,
    status: "Live",
  },
  {
    name: "Alumni Referral",
    channel: "Email",
    spend: 210000,
    leads: 306,
    cpl: 686,
    status: "Live",
  },
  {
    name: "Campus Open Day",
    channel: "Radio",
    spend: 640000,
    leads: 188,
    cpl: 3404,
    status: "Ended",
  },
];

export const leadSources = [
  { source: "Paid social", value: 42 },
  { source: "Organic search", value: 24 },
  { source: "Referral", value: 18 },
  { source: "Events", value: 10 },
  { source: "Direct", value: 6 },
];

/* ---------------- Director / Admin ---------------- */

export const directorKpis = [
  { label: "Monthly revenue", value: "â‚¦109m", delta: "+14.2%", positive: true },
  { label: "Active learners", value: "3,412", delta: "+8.6%", positive: true },
  { label: "Placement rate", value: "78%", delta: "+3.1%", positive: true },
  { label: "Churn", value: "4.2%", delta: "-0.8%", positive: true },
];

export const enrollmentSeries = [
  { month: "Feb", learning: 210, career: 88, services: 22 },
  { month: "Mar", learning: 248, career: 96, services: 26 },
  { month: "Apr", learning: 266, career: 112, services: 31 },
  { month: "May", learning: 302, career: 128, services: 29 },
  { month: "Jun", learning: 341, career: 141, services: 36 },
  { month: "Jul", learning: 388, career: 163, services: 42 },
];

export const systemUsers = [
  {
    name: "Chiamaka Obi",
    email: "chiamaka@cea.ng",
    role: "Student",
    status: "Active",
    lastSeen: "2m ago",
  },
  {
    name: "Ifeanyi Duru",
    email: "ifeanyi@cea.ng",
    role: "Instructor",
    status: "Active",
    lastSeen: "18m ago",
  },
  {
    name: "Musa Ibrahim",
    email: "musa@cea.ng",
    role: "Accountant",
    status: "Active",
    lastSeen: "1h ago",
  },
  {
    name: "Tolu Ajayi",
    email: "tolu@cea.ng",
    role: "Admissions",
    status: "Active",
    lastSeen: "3h ago",
  },
  {
    name: "Zainab Lawal",
    email: "zainab@cea.ng",
    role: "Marketing",
    status: "Suspended",
    lastSeen: "6d ago",
  },
];

export const auditLog = [
  {
    actor: "Aisha Bakare",
    action: "Updated role permissions for Instructor",
    time: "12 min ago",
    severity: "info",
  },
  { actor: "System", action: "Nightly backup completed", time: "5 h ago", severity: "info" },
  {
    actor: "Musa Ibrahim",
    action: "Voided invoice INV-3282",
    time: "9 h ago",
    severity: "warning",
  },
  {
    actor: "Unknown",
    action: "5 failed sign-in attempts",
    time: "yesterday",
    severity: "critical",
  },
];

export const departmentHealth = [
  { dept: "Software Development", learners: 986, completion: 82, satisfaction: 4.8 },
  { dept: "Cybersecurity", learners: 612, completion: 79, satisfaction: 4.7 },
  { dept: "Cloud & DevOps", learners: 488, completion: 74, satisfaction: 4.6 },
  { dept: "Data & AI", learners: 704, completion: 77, satisfaction: 4.9 },
  { dept: "Design", learners: 522, completion: 85, satisfaction: 4.8 },
];

export const approvals = [
  {
    item: "Cohort 15 curriculum update",
    requester: "Ifeanyi Duru",
    type: "Curriculum",
    age: "2 days",
  },
  {
    item: "Certificate issue â€” 34 graduates",
    requester: "Tolu Ajayi",
    type: "Certificates",
    age: "1 day",
  },
  { item: "Instructor contract renewal", requester: "Grace Eze", type: "HR", age: "4 days" },
];

export const notifications = [
  {
    title: "Assignment graded",
    body: "Accessibility audit scored 92%.",
    time: "10m",
    engine: "learning",
  },
  {
    title: "New mentor message",
    body: "Emeka sent feedback on your capstone.",
    time: "1h",
    engine: "community",
  },
  { title: "Invoice due soon", body: "Instalment 4 is due 1 October.", time: "3h", engine: "erp" },
  {
    title: "Job match",
    body: "Paystack Frontend Engineer â€” 96% match.",
    time: "1d",
    engine: "career",
  },
];
