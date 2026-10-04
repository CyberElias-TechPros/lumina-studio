/**
 * Long-form trainings — 3 days/week cohort programmes priced at the
 * average Nigerian market rate for part-time (non-immersive) tech
 * training, 2026.
 *
 * Market anchor (researched Sep 2026):
 *  - Lagos bootcamps (Decagon, Semicolon, AltSchool): ₦300k–₦1.5M, 3–12 months
 *  - 6-month immersive bootcamps: up to ₦1.2M (full-time, 24/7 campus)
 *  - Structured online courses: ₦20k–₦300k
 *  - CEA long-form sits in the affordable middle: 3 practical days/week,
 *    part-time friendly, no boarding, Port Harcourt base.
 */

export interface LongformProgram {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  /** Total fee in NGN (before plan discounts). */
  fee: number;
  /** Programme length in months. */
  months: number;
  weeks: number;
  /** Long-form runs 3 days a week. */
  daysPerWeek: 3;
  /** Contact hours per week (3 × 1.5–2h sessions). */
  hoursPerWeek: [number, number];
  level: string;
  whatYouGet: string;
  whatYouGetDetail: string;
  modules: { title: string; weeks: string; summary: string }[];
  careers: string[];
  includes: string[];
}

export const longformPrograms: LongformProgram[] = [
  {
    slug: "it-professional-diploma",
    title: "IT Professional Diploma",
    tagline:
      "The job-ready IT generalist: office systems, hardware, networks, security basics and web fundamentals in one diploma.",
    category: "IT & Support",
    fee: 300000,
    months: 6,
    weeks: 24,
    daysPerWeek: 3,
    hoursPerWeek: [9, 12],
    level: "Beginner",
    whatYouGet: "An IT portfolio + diploma certificate",
    whatYouGetDetail:
      "Six documented service projects: a repaired and re-imaged machine, a configured small office network, a security assessment, a working website, a disaster-recovery plan and an IT support playbook. The diploma is awarded for the documented work, not for attendance.",
    modules: [
      {
        title: "Professional Office Systems",
        weeks: "1–4",
        summary: "Advanced Word, Excel, PowerPoint and email discipline beyond the short course.",
      },
      {
        title: "Hardware, Repairs & Networking",
        weeks: "5–10",
        summary:
          "Diagnose, service and build machines; cable, configure and troubleshoot small networks.",
      },
      {
        title: "Security Fundamentals",
        weeks: "11–15",
        summary:
          "Threats, hardening, backups, incident handling and writing a security assessment for a real business.",
      },
      {
        title: "Web & Data Fundamentals",
        weeks: "16–19",
        summary:
          "Build and publish a business site; clean and report on real datasets in Excel and SQL basics.",
      },
      {
        title: "Support Craft & Capstone",
        weeks: "20–24",
        summary:
          "Helpdesk discipline, documentation, client communication, and a full end-to-end IT support capstone.",
      },
    ],
    careers: [
      "IT support officer",
      "Computer technician",
      "Office systems administrator",
      "Junior network technician",
    ],
    includes: [
      "3 practical days/week at 24/26 Ebony Road (or online where noted)",
      "All class notes published online from week one",
      "Diploma certificate awarded on the documented capstone",
      "Career Engine: CV review, portfolio and employer introductions",
    ],
  },
  {
    slug: "web-development-professional",
    title: "Web Development Professional",
    tagline:
      "From first line of code to deploying full projects: HTML to React, Node APIs, databases and live deployment.",
    category: "Web & Code",
    fee: 320000,
    months: 6,
    weeks: 24,
    daysPerWeek: 3,
    hoursPerWeek: [9, 12],
    level: "Beginner",
    whatYouGet: "5 deployed projects + professional certificate",
    whatYouGetDetail:
      "A personal site, a responsive marketing site, an interactive frontend in React, a REST API with a real database, and a full-stack capstone you scope, build and deploy yourself — version-controlled on GitHub and live on a URL you can send to clients or interviewers.",
    modules: [
      {
        title: "Web Foundations",
        weeks: "1–4",
        summary:
          "HTML, CSS, responsive layout, accessibility and the browser as it actually behaves.",
      },
      {
        title: "JavaScript & React",
        weeks: "5–10",
        summary:
          "The language properly, then React components, state, data fetching and a real frontend project.",
      },
      {
        title: "Backend, APIs & Databases",
        weeks: "11–16",
        summary:
          "Node.js, REST design, authentication and PostgreSQL — an API with real data behind it.",
      },
      {
        title: "Deployment & Professional Practice",
        weeks: "17–20",
        summary:
          "Git workflows, environments, deployment, monitoring basics and reading someone else's code.",
      },
      {
        title: "Full-Stack Capstone",
        weeks: "21–24",
        summary: "A client-brief full-stack application, deployed live and presented to a panel.",
      },
    ],
    careers: [
      "Junior web developer",
      "Freelance web developer",
      "Frontend developer",
      "Web maintenance & upgrades",
    ],
    includes: [
      "3 practical days/week at 24/26 Ebony Road (or online where noted)",
      "All class notes published online from week one",
      "Professional certificate awarded on the deployed capstone",
      "Career Engine: CV review, portfolio and employer introductions",
    ],
  },
  {
    slug: "data-analytics-ai",
    title: "Data Analytics & AI",
    tagline:
      "Excel to SQL to Python: clean messy data, build dashboards people act on, and use AI tools without leaking data.",
    category: "Data & Analytics",
    fee: 300000,
    months: 6,
    weeks: 24,
    daysPerWeek: 3,
    hoursPerWeek: [9, 12],
    level: "Beginner–Intermediate",
    whatYouGet: "A data portfolio with 4 live dashboards",
    whatYouGetDetail:
      "Cleaned and validated datasets, SQL analysis on real business data, Power BI/Excel dashboards with narrative, a Python analysis pipeline, and an applied-AI project (RAG or LLM workflow) with an honest evaluation write-up. You leave with dashboards hosted where a client or employer can open them.",
    modules: [
      {
        title: "Analytics Foundations",
        weeks: "1–4",
        summary:
          "The data mindset, Excel as a serious tool, statistics that survive contact with real data.",
      },
      {
        title: "SQL & Data Warehouses",
        weeks: "5–9",
        summary:
          "Query, join and aggregate real datasets; model data the way businesses actually store it.",
      },
      {
        title: "Dashboards & Storytelling",
        weeks: "10–14",
        summary:
          "Power BI and advanced Excel: dashboards with a narrative, not charts nobody reads.",
      },
      {
        title: "Python for Analytics",
        weeks: "15–19",
        summary: "pandas, visualisation, a repeatable cleaning pipeline and a scheduled analysis.",
      },
      {
        title: "Applied AI Capstone",
        weeks: "20–24",
        summary:
          "An LLM/RAG workflow on business data with an evaluation write-up, presented to a panel.",
      },
    ],
    careers: [
      "Data analyst",
      "Business intelligence analyst",
      "Operations analyst",
      "AI-augmented office professional",
    ],
    includes: [
      "3 practical days/week at 24/26 Ebony Road (or online where noted)",
      "All class notes published online from week one",
      "Certificate awarded on the hosted dashboards and capstone",
      "Career Engine: CV review, portfolio and employer introductions",
    ],
  },
  {
    slug: "cybersecurity-foundations",
    title: "Cybersecurity Foundations",
    tagline:
      "Defensive and practical: threats, networks, hardening and incident handling — with labs on real machines.",
    category: "Security",
    fee: 160000,
    months: 3,
    weeks: 12,
    daysPerWeek: 3,
    hoursPerWeek: [9, 12],
    level: "Beginner",
    whatYouGet: "A security assessment portfolio + certificate",
    whatYouGetDetail:
      "Hands-on labs: a hardening project, a network capture you analyse, a phishing simulation you run (and defuse), and a full written security assessment of a real local business with prioritised recommendations — the exact document SMEs pay for.",
    modules: [
      {
        title: "How Attacks Work",
        weeks: "1–3",
        summary: "Threat models, social engineering, malware and the anatomy of an incident.",
      },
      {
        title: "Network Defence",
        weeks: "4–7",
        summary: "Firewalls, segmentation, Wi-Fi hardening, and reading packet captures.",
      },
      {
        title: "Endpoint & Identity",
        weeks: "8–10",
        summary: "Hardening Windows/Android, password and MFA strategy, email security.",
      },
      {
        title: "Assessment Capstone",
        weeks: "11–12",
        summary: "Full security assessment of a live business, delivered as a board-ready report.",
      },
    ],
    careers: [
      "Junior security analyst",
      "IT security officer",
      "Security-aware IT support",
      "Compliance assistant",
    ],
    includes: [
      "3 practical days/week at 24/26 Ebony Road",
      "All class notes published online from week one",
      "Certificate awarded on the delivered assessment",
      "Career Engine: CV review, portfolio and employer introductions",
    ],
  },
  {
    slug: "digital-business-bootcamp",
    title: "Digital Business Bootcamp",
    tagline:
      "Marketing, social media, content and freelancing — run one real digital business while you learn it.",
    category: "Business & Digital",
    fee: 150000,
    months: 3,
    weeks: 12,
    daysPerWeek: 3,
    hoursPerWeek: [9, 12],
    level: "Beginner",
    whatYouGet: "A live digital business + portfolio",
    whatYouGetDetail:
      "You launch (or upgrade) a real digital presence: a 30-day content calendar executed publicly, a campaign with a measured result, a client-ready portfolio of designed and written work, and a freelance pricing proposal. The bootcamp is graded on the business, not the notebook.",
    modules: [
      {
        title: "Positioning & Strategy",
        weeks: "1–3",
        summary:
          "Audience, offer and value proposition — what you sell, to whom, and why they pay.",
      },
      {
        title: "Content & Social",
        weeks: "4–7",
        summary:
          "A 30-day content system: planning, design, captions, posting cadence and community management.",
      },
      {
        title: "Campaigns & Ads",
        weeks: "8–10",
        summary:
          "A small paid campaign run for real: budget, targeting, creative, measurement and reporting.",
      },
      {
        title: "Freelancing Capstone",
        weeks: "11–12",
        summary: "Proposal, pricing and first-client playbook, presented with your live results.",
      },
    ],
    careers: [
      "Freelance marketer",
      "Social media manager",
      "Content creator",
      "Small-business digital lead",
    ],
    includes: [
      "3 practical days/week at 24/26 Ebony Road (or online where noted)",
      "All class notes published online from week one",
      "Certificate awarded on the live business results",
      "Career Engine: portfolio review and client-introduction network",
    ],
  },
];

export function findLongformProgram(slug: string): LongformProgram | undefined {
  return longformPrograms.find((p) => p.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Schedule + payment plan options shared by the apply wizard          */
/* ------------------------------------------------------------------ */

export interface ScheduleOption {
  value: string;
  label: string;
  detail: string;
}

export const longScheduleOptions: ScheduleOption[] = [
  { value: "mwf", label: "Mon · Wed · Fri", detail: "Daytime 10:00–12:00 or evening 17:00–19:00" },
  { value: "tss", label: "Tue · Thu · Sat", detail: "Daytime 10:00–12:00 or Saturday 09:00–11:00" },
];

export const shortScheduleOptions: ScheduleOption[] = [
  {
    value: "standard",
    label: "Two sessions a week",
    detail: "As published — 1.5–2h practical sessions at the centre",
  },
];

export const timeSlotOptions: ScheduleOption[] = [
  { value: "morning", label: "Morning", detail: "10:00–12:00" },
  { value: "afternoon", label: "Afternoon", detail: "14:00–16:00" },
  { value: "evening", label: "Evening", detail: "17:00–19:00" },
  { value: "any", label: "Any / flexible", detail: "Wherever the timetable fits" },
];

export const modeOptions: ScheduleOption[] = [
  { value: "onsite", label: "Onsite", detail: "24/26 Ebony Road, Port Harcourt" },
  {
    value: "online",
    label: "Online",
    detail: "Live classes on Google Meet (where the course supports it)",
  },
  { value: "hybrid", label: "Hybrid", detail: "Some days onsite, some online" },
];

export interface PaymentPlanOption {
  value: string;
  label: string;
  detail: string;
  depositPct: number | null;
}

export const shortPaymentPlans: PaymentPlanOption[] = [
  {
    value: "full",
    label: "Pay in full",
    detail:
      "Pay the full fee before the course starts; admissions confirms availability and dates separately.",
    depositPct: null,
  },
  {
    value: "50-50",
    label: "50% now · 50% at mid-course",
    detail:
      "Pay half now; the balance is due at week 2 (or the midpoint). Admissions confirms availability and dates separately.",
    depositPct: 0.5,
  },
];

export const longPaymentPlans: PaymentPlanOption[] = [
  {
    value: "deposit-monthly",
    label: "30% deposit · monthly balance",
    detail: "Pay a 30% deposit; the balance is due in equal monthly instalments.",
    depositPct: 0.3,
  },
  {
    value: "full-10-off",
    label: "Pay in full — 10% off",
    detail: `Pay the whole fee up front and save 10%`,
    depositPct: null,
  },
];

export const NEXT_COHORTS = {
  short:
    "No course-specific short-course start date is published yet. Admissions will confirm availability.",
  long: "A cohort date is confirmed only when it appears in the admissions cohort register. Contact admissions if no date is listed.",
} as const;

export const WHAT_TO_BRING = [
  "A laptop or reliable access to one (Typing & Computer Basics can run entirely on academy machines)",
  "A small notebook for assignments — most practice happens at the machine",
  "Data or an eSIM if you'll need internet between sessions",
  "Arrive 10 minutes before your first session so setup takes two minutes, not twenty",
];

export const FEE_NOTES = [
  "No application fee — applying costs nothing.",
  "Fees cover all class materials and the published class notes.",
  "A deposit is recorded against your application; admissions confirms course availability, your place and start date separately.",
  "Deposit is refundable up to 7 days before the start date, and can be transferred once to a friend or the next cohort.",
];
