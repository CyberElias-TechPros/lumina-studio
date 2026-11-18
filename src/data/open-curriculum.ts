/**
 * ─────────────────────────────────────────────────────────────────────────
 * CEA Open-Source Curriculum — the open textbooks CEA teaches from.
 *
 * Every entry was verified against the GitHub API on 2026-11-16 (licence,
 * stars, default branch). The verification snapshot lives at
 * docs/open-curriculum-verification.md.
 *
 * Two rules govern this file, both non-negotiable:
 *  1. Licence honesty. Permissive licences (MIT/BSD/Apache/CC0/CC-BY) may be
 *     adapted into CEA delivery *with attribution*. Share-alike (CC-BY-SA) is
 *     treated as link-only in practice. NonCommercial, unlicensed, copyleft
 *     code, proprietary texts and no-licence course repos are LINK-ONLY:
 *     CEA may teach with them, quote them briefly and point students at
 *     them — CEA may not copy or re-badge them as its own material.
 *  2. AdSense honesty. CEA pages add original delivery value (Nigerian
 *     projects, sequencing, assessments, mentoring) or they don't ship.
 *     No page here is a re-posted mirror of third-party prose.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const CURRICULUM_REVIEWED = "2026-11-16";

export const curriculumLevels = [
  {
    id: 1,
    name: "Level 1 — Digital Foundations",
    short: "Level 1",
    tagline: "Start from zero",
    body: "For absolute beginners: computer literacy, typing, internet safety, Office, files and email. The layer everything else stands on.",
    tone: "Ready when you have never touched a computer",
  },
  {
    id: 2,
    name: "Level 2 — Professional Skills",
    short: "Level 2",
    tagline: "Employment & freelancing ready",
    body: "For people preparing to work: web development, data analysis, digital marketing, networking, design and cybersecurity fundamentals — with projects to show.",
    tone: "The employment level",
  },
  {
    id: 3,
    name: "Level 3 — Advanced Specialization",
    short: "Level 3",
    tagline: "Build real systems",
    body: "For people ready to ship: full-stack engineering, AI/ML, data engineering, DevOps, cloud — paired with portfolio-grade capstone work.",
    tone: "The professional-engineer level",
  },
] as const;

export type CurriculumDepartment = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  levels: string;
  description: string;
  ceaCourseSlugs: string[];
};

export const curriculumDepartments: CurriculumDepartment[] = [
  {
    id: "01",
    slug: "digital-foundations",
    title: "Digital Foundations",
    tagline: "Zero → confident",
    levels: "Beginner",
    description:
      "Computer literacy, Microsoft Office, internet and digital productivity. The department that makes every other department possible.",
    ceaCourseSlugs: [
      "microsoft-office",
      "computer-basics-typing",
      "data-entry",
      "digital-productivity",
    ],
  },
  {
    id: "02",
    slug: "software-engineering",
    title: "Software Engineering",
    tagline: "Build & ship",
    levels: "Beginner → Advanced",
    description:
      "Web development, Python, JavaScript, full-stack delivery and mobile. The department that turns learners into producers.",
    ceaCourseSlugs: ["web-development", "web-design", "wordpress"],
  },
  {
    id: "03",
    slug: "ai",
    title: "Artificial Intelligence",
    tagline: "From tools to engineering",
    levels: "Beginner → Advanced",
    description:
      "AI literacy, machine learning, LLM applications and AI engineering — from prompt fluency to production systems.",
    ceaCourseSlugs: ["ai-productivity"],
  },
  {
    id: "04",
    slug: "data-analytics",
    title: "Data & Analytics",
    tagline: "Decide with evidence",
    levels: "Beginner → Advanced",
    description:
      "Data analysis, data science, SQL, business intelligence and data engineering for analysts, planners and reporting teams.",
    ceaCourseSlugs: ["data-analytics"],
  },
  {
    id: "05",
    slug: "networking-hardware",
    title: "Networking & Hardware",
    tagline: "The machines that carry it",
    levels: "Beginner → Advanced",
    description:
      "Hardware repair, networking, Linux administration and systems support — physical infrastructure for digital work.",
    ceaCourseSlugs: ["computer-networking", "computer-repairs", "it-support"],
  },
  {
    id: "06",
    slug: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Protect the business",
    levels: "Beginner → Advanced",
    description:
      "Security fundamentals, network security, governance and secure development — defending organisations, not just devices.",
    ceaCourseSlugs: ["cybersecurity"],
  },
  {
    id: "07",
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    tagline: "Run it in production",
    levels: "Intermediate → Advanced",
    description:
      "Cloud architecture, containers, CI/CD and infrastructure automation for learners who already understand programming or IT.",
    ceaCourseSlugs: [],
  },
  {
    id: "08",
    slug: "creative-design",
    title: "Creative & Digital Design",
    tagline: "Make it worth looking at",
    levels: "Beginner → Advanced",
    description:
      "Graphic design, UI/UX, product thinking, 3D and illustration — commercial creative skills for businesses and content creators.",
    ceaCourseSlugs: ["graphic-design"],
  },
  {
    id: "09",
    slug: "digital-business",
    title: "Digital Business & Marketing",
    tagline: "Get found, get paid",
    levels: "Beginner → Intermediate",
    description:
      "Digital marketing, SEO, content, e-commerce and digital entrepreneurship — the commercial layer of the academy.",
    ceaCourseSlugs: [
      "digital-marketing",
      "social-media-management",
      "content-creation",
      "business-freelancing",
    ],
  },
];

export type LicenseKind =
  | "cea-internal"
  | "mit"
  | "bsd3"
  | "apache2"
  | "cc0"
  | "cc-by"
  | "cc-by-sa"
  | "cc-by-nc-sa"
  | "gpl3"
  | "busl"
  | "proprietary"
  | "unlicensed"
  | "external-free";

export type CurriculumCourse = {
  slug: string;
  title: string;
  department: string;
  level: 1 | 2 | 3;
  sourceName: string;
  repo: string | null;
  sourceUrl: string;
  license: string;
  licenseKind: LicenseKind;
  canHostInApp: boolean;
  licenseNote: string;
  ceaWeeks: number;
  ceaFormat:
    | "Instructor-led"
    | "Self-paced"
    | "Self-paced + cohort"
    | "Self-paced + cohort review"
    | "Self-paced + mentorship"
    | "Cohort + self-study";
  skills: string[];
  projects: string[];
  summary: string;
  delivery: string;
  launchPriority: number | null;
  ceaCourseSlug?: string;
  hostedPath?: string;
};

export const curriculumCourses: CurriculumCourse[] = [
  /* ── 01 Digital Foundations ─────────────────────────────────────────── */
  {
    slug: "microsoft-office-mastery",
    title: "Microsoft Office Mastery",
    department: "digital-foundations",
    level: 1,
    sourceName: "CEA-built curriculum",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/microsoft-office",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course — notes, drills and certificates are ours.",
    ceaWeeks: 6,
    ceaFormat: "Instructor-led",
    skills: ["Word", "Excel", "PowerPoint", "Outlook", "Teams", "File management"],
    projects: [
      "Formatted business document set",
      "Working Excel budget with formulas",
      "Slide-deck pitch for a real brief",
    ],
    summary:
      "CEA's flagship beginner course. Students move from switching a computer on to producing professional documents, spreadsheets and presentations — the exact output Nigerian offices hire for.",
    delivery:
      "Two sessions a week at the centre with hands-on machines, plus take-home drills. Completion is assessed on produced artefacts, not attendance.",
    launchPriority: null,
    ceaCourseSlug: "microsoft-office",
  },
  {
    slug: "computer-basics-typing",
    title: "Computer Basics & Typing",
    department: "digital-foundations",
    level: 1,
    sourceName: "CEA-built curriculum",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/computer-basics-typing",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course — typed on our machines, marked by our teachers.",
    ceaWeeks: 4,
    ceaFormat: "Instructor-led",
    skills: ["Keyboarding", "Files & folders", "Email", "Web browsing", "Safety basics"],
    projects: [
      "40+ WPM typing certificate",
      "Organised personal file system",
      "First email written, sent and replied to",
    ],
    summary:
      "The true starting line for adults who need computers but never learned properly. Home-row typing, files, email and safer browsing — before any other department makes sense.",
    delivery:
      "Deliberately small groups. Progress is measured by weekly WPM tests and a file-organisation drill our assessors sign off.",
    launchPriority: null,
    ceaCourseSlug: "computer-basics-typing",
  },
  {
    slug: "data-entry-accuracy",
    title: "Data Entry & Accuracy",
    department: "digital-foundations",
    level: 1,
    sourceName: "CEA-built curriculum",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/data-entry",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course.",
    ceaWeeks: 3,
    ceaFormat: "Instructor-led",
    skills: ["Form filling", "Spreadsheets", "Speed + accuracy", "Verification"],
    projects: ["Timed data-entry benchmark", "100% accuracy verification drill"],
    summary:
      "Fast, verifiable data entry for students headed into admin, logistics, clinics and SMB back offices — the most common job description behind the phrase 'computer operator'.",
    delivery:
      "Timed benchmarks in week one establish a baseline; every later session is graded against accuracy targets, not just speed.",
    launchPriority: null,
    ceaCourseSlug: "data-entry",
  },
  {
    slug: "digital-productivity-ai",
    title: "Digital Productivity & AI Tools",
    department: "digital-foundations",
    level: 1,
    sourceName: "CEA-built curriculum, AI tooling module",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/digital-productivity",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course.",
    ceaWeeks: 3,
    ceaFormat: "Instructor-led",
    skills: ["AI assistants", "Search", "Automation basics", "Notes & knowledge work"],
    projects: ["Personal AI prompt library", "Automated weekly report workflow"],
    summary:
      "Modern office fluency: searching well, prompting AI tools properly and automating the repetitive half of desk work. The bridge between 'can use a computer' and 'works like a modern operator'.",
    delivery:
      "Built around each student's actual job tasks — teachers rewrite the drills around the class's most common work requests.",
    launchPriority: null,
    ceaCourseSlug: "digital-productivity",
  },

  /* ── 02 Software Engineering ────────────────────────────────────────── */
  {
    slug: "microsoft-web-dev-for-beginners",
    title: "Web Development for Beginners (Microsoft)",
    department: "software-engineering",
    level: 2,
    sourceName: "Microsoft Web Dev for Beginners",
    repo: "microsoft/Web-Dev-For-Beginners",
    sourceUrl: "https://github.com/microsoft/Web-Dev-For-Beginners",
    license: "MIT",
    licenseKind: "mit",
    canHostInApp: true,
    licenseNote: "MIT — Microsoft's 24-lesson course may be adapted with attribution.",
    ceaWeeks: 12,
    ceaFormat: "Cohort + self-study",
    skills: ["HTML", "CSS", "JavaScript", "Browser fundamentals", "Git"],
    projects: ["Business website relaunch", "Interactive landing page", "Accessible component set"],
    summary:
      "Microsoft's free 24-lesson, 12-week curriculum for people who have never written a line of code. The gentlest complete on-ramp from zero to a browser-ready developer — video-light, project-heavy.",
    delivery:
      "CEA re-sequences the lessons into twice-weekly studio sessions in Port Harcourt, swaps the example businesses for Nigerian ones, and assesses the projects live in class.",
    launchPriority: 1,
  },
  {
    slug: "freecodecamp-fullstack",
    title: "Full-Stack Development (freeCodeCamp)",
    department: "software-engineering",
    level: 2,
    sourceName: "freeCodeCamp",
    repo: "freeCodeCamp/freeCodeCamp",
    sourceUrl: "https://github.com/freeCodeCamp/freeCodeCamp",
    license: "BSD-3-Clause",
    licenseKind: "bsd3",
    canHostInApp: true,
    licenseNote:
      "BSD-3 — free with notice. Certificates remain freeCodeCamp's; CEA certificates are CEA's own.",
    ceaWeeks: 24,
    ceaFormat: "Self-paced + cohort review",
    skills: ["Semantic HTML/CSS", "JavaScript", "React", "APIs", "Node.js", "Databases"],
    projects: [
      "Tribute & survey pages",
      "Technical documentation site",
      "Product landing pages",
      "REST API project",
    ],
    summary:
      "The largest free coding curriculum on the internet — hundreds of anchored projects from semantic HTML up to full-stack apps and their certifications. Unmatched breadth; the challenge is finishing, which is exactly what a cohort solves.",
    delivery:
      "Students walk the curriculum at home; CEA provides structure — weekly build reviews, pair debugging, and a portfolio review at the end. freeCodeCamp certificates and CEA certificates stay clearly separate.",
    launchPriority: 1,
  },
  {
    slug: "the-odin-project",
    title: "Full-Stack JavaScript (The Odin Project)",
    department: "software-engineering",
    level: 2,
    sourceName: "The Odin Project",
    repo: "TheOdinProject/curriculum",
    sourceUrl: "https://github.com/TheOdinProject/curriculum",
    license: "CC BY-NC-SA 4.0",
    licenseKind: "cc-by-nc-sa",
    canHostInApp: false,
    licenseNote:
      "NonCommercial — may not be copied or distributed by CEA. Teach with it, link to it, never re-host it.",
    ceaWeeks: 26,
    ceaFormat: "Cohort + self-study",
    skills: ["JavaScript", "Git", "React", "Node.js", "PostgreSQL", "Deployment"],
    projects: [
      "Library app",
      "Inventory app with a database",
      "Full-stack booking system",
      "Capstone with auth",
    ],
    summary:
      "The most respected free full-stack curriculum in the world: JavaScript, Git, React, Node and PostgreSQL, taught the hard way — from files and terminals up to deployed apps. Brutal without a cohort; transformative with one.",
    delivery:
      "CEA runs it as a 6-month evening cohort: fixed pace, pair programming, weekly code review. Students use the Odin Project site directly — CEA supplies the structure, the feedback and the demo day.",
    launchPriority: 1,
  },
  {
    slug: "fullstack-open",
    title: "Advanced Full-Stack (Full Stack Open, Helsinki)",
    department: "software-engineering",
    level: 3,
    sourceName: "Full Stack Open — University of Helsinki",
    repo: "fullstack-hy2020/fullstack-hy2020.github.io",
    sourceUrl: "https://fullstackopen.com",
    license: "CC BY-NC-SA 3.0",
    licenseKind: "cc-by-nc-sa",
    canHostInApp: false,
    licenseNote: "NonCommercial — link-only; CEA may not redistribute the course text.",
    ceaWeeks: 20,
    ceaFormat: "Self-paced + mentorship",
    skills: ["React", "GraphQL", "TypeScript", "Node", "Testing", "CI/CD"],
    projects: ["Full-stack blog", "Phonebook with CI", "Redux-based app", "Phonebook + GraphQL"],
    summary:
      "The University of Helsinki's free university-grade engineering course: React, GraphQL, TypeScript, testing and deployment at a depth few paid programmes match. Ideal for CEA graduates who outgrew beginner material.",
    delivery:
      "For Level 3 alumni. CEA assigns a mentor per two students, runs bi-weekly code clinics, and certifies the capstone at a demo day with external reviewers.",
    launchPriority: null,
  },
  {
    slug: "30-days-of-python",
    title: "Python Programming & Automation (30 Days of Python)",
    department: "software-engineering",
    level: 2,
    sourceName: "30 Days of Python — Asabeneh Yetayeh",
    repo: "Asabeneh/30-Days-Of-Python",
    sourceUrl: "https://github.com/Asabeneh/30-Days-Of-Python",
    license: "No licence file — all rights reserved",
    licenseKind: "unlicensed",
    canHostInApp: false,
    licenseNote:
      "No licence granted — link-only. CEA may not copy the material; students work from the source site.",
    ceaWeeks: 12,
    ceaFormat: "Cohort + self-study",
    skills: ["Python", "Scripting", "APIs", "Data handling", "Automation"],
    projects: [
      "Invoice generator",
      "File organiser for office shares",
      "Automated report from a CSV",
      "WhatsApp broadcast helper",
    ],
    summary:
      "A 30-day, project-driven Python challenge used by hundreds of thousands of learners. Python is the language of automation, data and AI — the fastest honest route from zero to useful scripts.",
    delivery:
      "Twice-weekly classes at the centre. Each day becomes one lesson; students build the automation scripts employers actually ask for, not toy console games.",
    launchPriority: 2,
  },
  {
    slug: "30-days-of-javascript",
    title: "JavaScript in 30 Days (30 Days of JavaScript)",
    department: "software-engineering",
    level: 2,
    sourceName: "30 Days of JavaScript — Asabeneh Yetayeh",
    repo: "Asabeneh/30-Days-Of-JavaScript",
    sourceUrl: "https://github.com/Asabeneh/30-Days-Of-JavaScript",
    license: "No licence file — all rights reserved",
    licenseKind: "unlicensed",
    canHostInApp: false,
    licenseNote: "No licence granted — link-only.",
    ceaWeeks: 10,
    ceaFormat: "Cohort + self-study",
    skills: ["JavaScript", "DOM", "Async", "APIs", "Debugging"],
    projects: ["DOM project gallery", "Live search filter", "API dashboard", "Quiz app"],
    summary:
      "The JavaScript counterpart to the Python challenge — from variables to asynchronous code, built around 30 hands-on exercises. The language of the web, learned by doing, one day at a time.",
    delivery:
      "Scheduled as a daily-commit programme over one school term, with Friday demos where students present each week's mini-project.",
    launchPriority: null,
  },
  {
    slug: "algorithms-python",
    title: "Algorithms & Problem Solving in Python",
    department: "software-engineering",
    level: 3,
    sourceName: "The Algorithms — Python",
    repo: "TheAlgorithms/Python",
    sourceUrl: "https://github.com/TheAlgorithms/Python",
    license: "MIT",
    licenseKind: "mit",
    canHostInApp: true,
    licenseNote:
      "MIT — free to adapt with attribution. Large, well-tested reference implementations.",
    ceaWeeks: 8,
    ceaFormat: "Cohort + self-study",
    skills: ["Data structures", "Algorithms", "Complexity", "Testing"],
    projects: [
      "Annotated sorting visualiser",
      "Pathfinding demo on a grid",
      "Hash-map implementation with tests",
    ],
    summary:
      "A living, community-maintained catalogue of algorithms implemented in clean, commented Python. Not a course by itself — a reference and kata bank that turns CEA's third-years into rigorous problem solvers.",
    delivery:
      "Weekly kata sessions: every student implements, explains and then critiques an algorithm, in the style of a real interview or code review.",
    launchPriority: null,
  },
  {
    slug: "project-based-learning",
    title: "Project-Based Programming (Curated List)",
    department: "software-engineering",
    level: 2,
    sourceName: "Practical Tutorials — Project-Based Learning",
    repo: "practical-tutorials/project-based-learning",
    sourceUrl: "https://github.com/practical-tutorials/project-based-learning",
    license: "MIT",
    licenseKind: "mit",
    canHostInApp: true,
    licenseNote: "MIT — the list is licensed; the linked tutorials keep their own licences.",
    ceaWeeks: 4,
    ceaFormat: "Self-paced",
    skills: ["Scoping", "Reading docs", "Debugging", "Shipping"],
    projects: [
      "Three repos built and pushed to a personal GitHub",
      "One fully deployed project with a README",
    ],
    summary:
      "A meticulously curated list of build-it-from-scratch tutorials across every major language — games, compilers, databases, browsers. The antidote to tutorial paralysis: pick a project, build it, push it.",
    delivery:
      "Students choose three projects per term from the list; each must be on GitHub with a README that a stranger could follow.",
    launchPriority: null,
  },
  {
    slug: "algorithms-javascript",
    title: "Algorithms in JavaScript",
    department: "software-engineering",
    level: 3,
    sourceName: "The Algorithms — JavaScript",
    repo: "TheAlgorithms/JavaScript",
    sourceUrl: "https://github.com/TheAlgorithms/JavaScript",
    license: "GPL-3.0",
    licenseKind: "gpl3",
    canHostInApp: false,
    licenseNote:
      "GPL-3.0 — copyleft. Link-only for CEA; do not copy or adapt the code into CEA materials.",
    ceaWeeks: 8,
    ceaFormat: "Cohort + self-study",
    skills: ["Data structures", "Algorithms", "JavaScript internals"],
    projects: ["Sorting race benchmarks", "Graph traversal visualisation", "Interview-prep drills"],
    summary:
      "The JavaScript sibling of The Algorithms — interview-style problems, data structures and complexity, implemented and tested in JS. Best paired with the Python track for students targeting frontend roles.",
    delivery:
      "Interview-prep track. CEA mock interviews pair students against each other and against timed whiteboard-style prompts.",
    launchPriority: null,
  },
  {
    slug: "system-design-primer",
    title: "System Design Primer",
    department: "software-engineering",
    level: 3,
    sourceName: "The System Design Primer — Donne Martin",
    repo: "donnemartin/system-design-primer",
    sourceUrl: "https://github.com/donnemartin/system-design-primer",
    license: "NOASSERTION (personal repo licence)",
    licenseKind: "proprietary",
    canHostInApp: false,
    licenseNote:
      "Ambiguous personal-project licence — link-only. Do not copy text into CEA materials.",
    ceaWeeks: 6,
    ceaFormat: "Self-paced + mentorship",
    skills: ["Scalability", "Caching", "Load balancing", "Databases", "APIs"],
    projects: [
      "Design a rate limiter",
      "Design a URL shortener",
      "Design a news feed for 1M users",
    ],
    summary:
      "The internet's standard free primer on designing large-scale systems — caching, sharding, load balancers, queues and the vocabulary of senior engineering interviews.",
    delivery:
      "Read-aloud design reviews: each week one student designs a system on the whiteboard; the cohort attacks the weak points. Mentor sign-off required for capstone claims.",
    launchPriority: null,
  },
  {
    slug: "developer-roadmap",
    title: "Developer Roadmaps (roadmap.sh)",
    department: "software-engineering",
    level: 2,
    sourceName: "roadmap.sh — developer-roadmap",
    repo: "nilbuild/developer-roadmap",
    sourceUrl: "https://roadmap.sh",
    license: "Proprietary (all rights reserved)",
    licenseKind: "proprietary",
    canHostInApp: false,
    licenseNote:
      "Explicitly proprietary — link-only, never copied. Students use roadmap.sh directly.",
    ceaWeeks: 1,
    ceaFormat: "Self-paced",
    skills: ["Career navigation", "Specialisation planning"],
    projects: ["Personal 12-month learning plan, signed off by a CEA advisor"],
    summary:
      "Interactive, community-maintained roadmaps for every developer specialisation. Not a course — a compass. CEA uses it in admission interviews to place students in the right department and level.",
    delivery:
      "Used at the admissions desk, not as teaching material: every applicant picks their roadmap path with an advisor and receives a written plan.",
    launchPriority: null,
  },
  {
    slug: "web-development-cea",
    title: "CEA Web Development (Flagship)",
    department: "software-engineering",
    level: 2,
    sourceName: "CEA-built curriculum",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/web-development",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course and notes.",
    ceaWeeks: 24,
    ceaFormat: "Instructor-led",
    skills: ["HTML/CSS/JS", "WordPress", "Basic hosting", "Client briefs"],
    projects: ["Three client websites", "One e-commerce storefront", "Portfolio site"],
    summary:
      "CEA's original web development programme: classroom HTML/CSS/JS, WordPress delivery, hosting, and real client briefs worked in Port Harcourt businesses. The course we point our freelancers at first.",
    delivery:
      "Instructor-led twice a week with live client briefs. Graduates leave with three published sites, references from local businesses, and a portfolio page.",
    launchPriority: null,
    ceaCourseSlug: "web-development",
  },
  {
    slug: "wordpress-cea",
    title: "CEA WordPress & Site Management",
    department: "software-engineering",
    level: 2,
    sourceName: "CEA-built curriculum",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/wordpress",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course.",
    ceaWeeks: 6,
    ceaFormat: "Instructor-led",
    skills: ["WordPress", "Hosting", "Security basics", "Client handover"],
    projects: [
      "Two complete WordPress sites",
      "Client handover document",
      "Maintenance retainer proposal",
    ],
    summary:
      "The fastest commercial skill in Nigerian web work: a complete WordPress site, delivered end-to-end with hosting, security and client handover. The course behind most CEA freelancer first incomes.",
    delivery:
      "Studio format — every student ships two real sites to real domain names by week six, including backups and a handover walkthrough for the client.",
    launchPriority: null,
    ceaCourseSlug: "wordpress",
  },

  /* ── 03 Artificial Intelligence ─────────────────────────────────────── */
  {
    slug: "ai-engineering-from-scratch",
    title: "AI Engineering from Scratch (Hosted in-app)",
    department: "ai",
    level: 2,
    sourceName: "AI Engineering from Scratch — Rohit Ghumare",
    repo: "rohitg00/ai-engineering-from-scratch",
    sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch",
    license: "MIT",
    licenseKind: "mit",
    canHostInApp: true,
    licenseNote: "MIT — the full curriculum is hosted in-app at /ai-engineering with attribution.",
    ceaWeeks: 18,
    ceaFormat: "Cohort + self-study",
    skills: ["Python", "LLMs", "RAG", "Agents", "Evaluation", "Deployment basics"],
    projects: [
      "RAG assistant for CEA's notes",
      "Evaluation harness",
      "Single-task production agent",
    ],
    summary:
      "The MIT-licensed open curriculum for AI engineers: 542 lessons, 20 phases, from dev setup through LLMs, RAG, agents and production engineering. Hosted in full at /ai-engineering — CEA adds sequencing, quizzes and cohort structure.",
    delivery:
      "The flagship Level 2→3 bridge. Twice-weekly sessions mapping onto the in-app phases; artefacts are reviewed by CEA mentors and demoed in-cohort.",
    launchPriority: 4,
    hostedPath: "/ai-engineering",
  },
  {
    slug: "ai-for-beginners",
    title: "AI for Beginners (Microsoft)",
    department: "ai",
    level: 1,
    sourceName: "Microsoft AI for Beginners",
    repo: "microsoft/AI-For-Beginners",
    sourceUrl: "https://github.com/microsoft/AI-For-Beginners",
    license: "MIT",
    licenseKind: "mit",
    canHostInApp: true,
    licenseNote: "MIT — 24 lessons, 12 weeks. Adapt with attribution.",
    ceaWeeks: 12,
    ceaFormat: "Cohort + self-study",
    skills: ["ML concepts", "Neural networks", "Vision & text basics", "Ethics"],
    projects: ["Trained classifier demo", "Explain an AI system to a client", "Mini vision model"],
    summary:
      "Microsoft's 24-lesson introduction to AI — neural networks, computer vision and NLP, taught to absolute beginners with quizzes and labs. The on-ramp before AI Engineering from Scratch.",
    delivery:
      "The correct on-ramp for Level 1→2 learners. CEA teaches the labs in class, in Nigerian business scenarios, and uses it to decide who is ready for /ai-engineering.",
    launchPriority: null,
  },
  {
    slug: "ml-for-beginners",
    title: "ML for Beginners (Microsoft)",
    department: "ai",
    level: 2,
    sourceName: "Microsoft ML for Beginners",
    repo: "microsoft/ML-For-Beginners",
    sourceUrl: "https://github.com/microsoft/ML-For-Beginners",
    license: "MIT",
    licenseKind: "mit",
    canHostInApp: true,
    licenseNote: "MIT — 26 lessons, 52 quizzes, classic machine learning.",
    ceaWeeks: 14,
    ceaFormat: "Cohort + self-study",
    skills: ["Regression", "Classification", "Clustering", "Evaluation", "Scikit-learn"],
    projects: ["House-price predictor", "Churn model for an SME", "Customer segmentation"],
    summary:
      "Microsoft's classic machine-learning on-ramp: regression, classification and clustering with 52 quizzes — classical ML that every data-literate employee should understand before touching generative AI.",
    delivery:
      "Shared with the Data department — students sit in mixed cohorts with data-analytics, mirroring how real teams actually work.",
    launchPriority: null,
  },
  {
    slug: "data-science-for-beginners",
    title: "Data Science for Beginners (Microsoft)",
    department: "ai",
    level: 2,
    sourceName: "Microsoft Data Science for Beginners",
    repo: "microsoft/Data-Science-For-Beginners",
    sourceUrl: "https://github.com/microsoft/Data-Science-For-Beginners",
    license: "MIT",
    licenseKind: "mit",
    canHostInApp: true,
    licenseNote: "MIT — 20 lessons across 10 weeks.",
    ceaWeeks: 10,
    ceaFormat: "Cohort + self-study",
    skills: ["Statistics", "Python", "Visualisation", "Hypothesis testing"],
    projects: [
      "Analytical report on a public dataset",
      "A/B test readout",
      "Board-slide deck of findings",
    ],
    summary:
      "The gentlest complete data-science curriculum on GitHub: statistics, Python and visualisation in 10 weeks. Designed for people who want the thinking, not just the library calls.",
    delivery:
      "Used as the bridge into /ai-engineering for data-department students who want the AI specialisation.",
    launchPriority: null,
  },
  {
    slug: "llm-zoomcamp",
    title: "LLM Zoomcamp (DataTalks.Club)",
    department: "ai",
    level: 3,
    sourceName: "LLM Zoomcamp — DataTalks.Club",
    repo: "DataTalksClub/llm-zoomcamp",
    sourceUrl: "https://github.com/DataTalksClub/llm-zoomcamp",
    license: "No licence file — all rights reserved",
    licenseKind: "unlicensed",
    canHostInApp: false,
    licenseNote:
      "No licence granted — link-only. Course materials stay on the DataTalks.Club site.",
    ceaWeeks: 10,
    ceaFormat: "Self-paced + cohort",
    skills: ["Embeddings", "RAG", "Evaluation", "Vector DBs", "Deployment"],
    projects: [
      "Q&A bot over CEA policy documents",
      "RAG pipeline with evaluation",
      "Monitored LLM service",
    ],
    summary:
      "DataTalks.Club's free cohort course on building LLM applications for real life: embeddings, retrieval, evaluation and deployment. Runs on a fixed cohort cadence with homework and a final project.",
    delivery:
      "CEA aligns its advanced AI cohort to the Zoomcamp calendar — students join both; CEA mentors run the Nigeria-context project reviews.",
    launchPriority: null,
  },
  {
    slug: "mlops-zoomcamp",
    title: "MLOps Zoomcamp (DataTalks.Club)",
    department: "ai",
    level: 3,
    sourceName: "MLOps Zoomcamp — DataTalks.Club",
    repo: "DataTalksClub/mlops-zoomcamp",
    sourceUrl: "https://github.com/DataTalksClub/mlops-zoomcamp",
    license: "No licence file — all rights reserved",
    licenseKind: "unlicensed",
    canHostInApp: false,
    licenseNote: "No licence granted — link-only.",
    ceaWeeks: 10,
    ceaFormat: "Self-paced + cohort",
    skills: ["ML pipelines", "Docker", "Kubernetes", "Monitoring", "CI/CD for ML"],
    projects: [
      "Deployed model with monitoring",
      "Retraining pipeline",
      "Cost-monitored inference service",
    ],
    summary:
      "The production side of machine learning: pipelines, Docker, orchestration, model monitoring and retraining — free, cohort-based, heavily practical. Where graduates learn that training a model is 10% of the job.",
    delivery:
      "Level 3 capstone companion for data and AI graduates who want platform roles rather than notebook roles.",
    launchPriority: null,
  },
  {
    slug: "hands-on-machine-learning",
    title: "Hands-On Machine Learning (Aurélien Géron)",
    department: "ai",
    level: 3,
    sourceName: "Hands-On Machine Learning — ageron",
    repo: "ageron/handson-ml3",
    sourceUrl: "https://github.com/ageron/handson-ml3",
    license: "Apache-2.0",
    licenseKind: "apache2",
    canHostInApp: false,
    licenseNote:
      "Code Apache-2.0; the book's prose remains copyrighted. Link-only for the text; notebooks referenced only.",
    ceaWeeks: 14,
    ceaFormat: "Self-paced + mentorship",
    skills: ["Scikit-learn", "TensorFlow", "Neural networks", "Feature engineering"],
    projects: [
      "End-to-end ML project on a Nigerian SME dataset",
      "Notebook walkthrough with mentor sign-off",
    ],
    summary:
      "The companion notebooks to the standard machine-learning textbook: worked, runnable code for every chapter. The best code reference in classical ML and deep learning — the book itself is the course.",
    delivery:
      "Reference spine for the Level 3 ML mentorship track; mentors assign notebooks as weekly graded walkthroughs.",
    launchPriority: null,
  },
  {
    slug: "fastbook",
    title: "Deep Learning with fastai (fastbook)",
    department: "ai",
    level: 3,
    sourceName: "fastbook — fast.ai",
    repo: "fastai/fastbook",
    sourceUrl: "https://github.com/fastai/fastbook",
    license: "Code GPL-3.0; prose © the authors",
    licenseKind: "gpl3",
    canHostInApp: false,
    licenseNote: "Copyleft code, copyrighted prose — link-only.",
    ceaWeeks: 10,
    ceaFormat: "Self-paced + mentorship",
    skills: ["Deep learning", "Transfer learning", "Computer vision", "NLP"],
    projects: [
      "Image classifier for a local crop disease",
      "Text classifier for customer feedback",
    ],
    summary:
      "The fast.ai course book: deep learning taught top-down — train a state-of-the-art model in lesson one, then open the hood. The most pragmatic deep-learning path that exists.",
    delivery:
      "For students who already finished ML for Beginners. CEA's mentor reviews each chapter's notebooks before sign-off.",
    launchPriority: null,
  },
  {
    slug: "ai-productivity-cea",
    title: "AI for Productivity (CEA Flagship)",
    department: "ai",
    level: 1,
    sourceName: "CEA-built curriculum",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/ai-productivity",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course.",
    ceaWeeks: 4,
    ceaFormat: "Instructor-led",
    skills: ["Prompting", "Document AI", "Spreadsheet AI", "Meeting notes"],
    projects: ["Personal prompt library", "Automated weekly report", "AI-assisted inbox triage"],
    summary:
      "The working professional's AI course: the 20% of AI tools that deliver 80% of office value — documents, spreadsheets, email and research. No maths, no code, all output.",
    delivery:
      "Four intensive weeks. Every lab is a real office artefact; graduates demo a complete 'AI workday' at the final session.",
    launchPriority: null,
    ceaCourseSlug: "ai-productivity",
  },

  /* ── 04 Data & Analytics ────────────────────────────────────────────── */
  {
    slug: "data-analytics-cea",
    title: "Data Analytics & Business Intelligence (CEA Flagship)",
    department: "data-analytics",
    level: 2,
    sourceName: "CEA-built curriculum",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/data-analytics",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course.",
    ceaWeeks: 16,
    ceaFormat: "Instructor-led",
    skills: ["Excel/Sheets analysis", "SQL", "Power BI", "Reporting"],
    projects: [
      "Sales dashboard for a real SME",
      "Automated monthly report",
      "KPI pack for a finance team",
    ],
    summary:
      "CEA's most employable single course for working adults: from raw exports to decision-ready dashboards — Excel, SQL and Power BI taught against real Nigerian business data.",
    delivery:
      "Twice weekly at the centre. Final project: a dashboard and written readout for a real partner business in Port Harcourt.",
    launchPriority: 3,
    ceaCourseSlug: "data-analytics",
  },
  {
    slug: "ossu-data-science",
    title: "Data Science (OSSU — Full Self-Study Path)",
    department: "data-analytics",
    level: 3,
    sourceName: "Open Source Society University — Data Science",
    repo: "ossu/data-science",
    sourceUrl: "https://github.com/ossu/data-science",
    license: "CC BY-SA 4.0",
    licenseKind: "cc-by-sa",
    canHostInApp: false,
    licenseNote:
      "Share-alike — link-only in practice; keep CEA-derived material under CEA's or compatible terms.",
    ceaWeeks: 40,
    ceaFormat: "Self-paced",
    skills: ["Python", "Statistics", "ML", "Databases", "Communication"],
    projects: ["Portfolio of analysed datasets", "Capstone predictive model with write-up"],
    summary:
      "A complete, free, university-equivalent data science sequence assembled from open courses — maths, Python, statistics and ML, in the right order, with assessments. For the rare student with two years of discipline.",
    delivery:
      "Reference pathway for exceptional self-starters. CEA reviews progress monthly, not weekly, and pairs it with Level 2 work once employable.",
    launchPriority: null,
  },
  {
    slug: "data-engineering-zoomcamp",
    title: "Data Engineering Zoomcamp (DataTalks.Club)",
    department: "data-analytics",
    level: 3,
    sourceName: "Data Engineering Zoomcamp — DataTalks.Club",
    repo: "DataTalksClub/data-engineering-zoomcamp",
    sourceUrl: "https://github.com/DataTalksClub/data-engineering-zoomcamp",
    license: "No licence file — all rights reserved",
    licenseKind: "unlicensed",
    canHostInApp: false,
    licenseNote: "No licence granted — link-only.",
    ceaWeeks: 9,
    ceaFormat: "Self-paced + cohort",
    skills: ["SQL", "BigQuery/Spark", "Kafka", "Airflow", "Docker"],
    projects: [
      "Batch pipeline on public data",
      "Streaming pipeline with Kafka",
      "Warehouse with dbt transformations",
    ],
    summary:
      "DataTalks.Club's free nine-week engineering course: SQL, warehousing, orchestration, streaming and infrastructure — the skillset behind modern analytics teams. Homework-driven with a final open project.",
    delivery:
      "Level 3 pipeline cohort. Students join the global Zoomcamp cohort and the CEA mentor clinic; capstones target real Port Harcourt data at scale.",
    launchPriority: 12,
  },
  {
    slug: "machine-learning-zoomcamp",
    title: "Machine Learning Zoomcamp (DataTalks.Club)",
    department: "data-analytics",
    level: 3,
    sourceName: "Machine Learning Zoomcamp — DataTalks.Club",
    repo: "DataTalksClub/machine-learning-zoomcamp",
    sourceUrl: "https://github.com/DataTalksClub/machine-learning-zoomcamp",
    license: "No licence file — all rights reserved",
    licenseKind: "unlicensed",
    canHostInApp: false,
    licenseNote: "No licence granted — link-only.",
    ceaWeeks: 16,
    ceaFormat: "Self-paced + cohort",
    skills: ["Regression", "Classification", "Feature engineering", "Model serving"],
    projects: ["Churn model in production", "Batch scoring service", "Model monitoring report"],
    summary:
      "A 4-month, free, engineering-first ML course: regression through deployed services — the exact pipeline a working ML engineer owns end to end.",
    delivery:
      "Shared between AI and Data departments as the Level 3 cohort core; projects double as portfolio deployments.",
    launchPriority: null,
  },
  {
    slug: "power-bi-samples",
    title: "Power BI Dashboard Practice Files",
    department: "data-analytics",
    level: 2,
    sourceName: "Microsoft Power BI Desktop Samples",
    repo: "microsoft/powerbi-desktop-samples",
    sourceUrl: "https://github.com/microsoft/powerbi-desktop-samples",
    license: "MIT",
    licenseKind: "mit",
    canHostInApp: true,
    licenseNote: "MIT — practice files free to reuse with attribution.",
    ceaWeeks: 3,
    ceaFormat: "Instructor-led",
    skills: ["Power BI", "Data modelling", "DAX basics", "Report design"],
    projects: ["Recreated sales dashboard", "Finance variance report", "Executive one-pager"],
    summary:
      "Microsoft's official Power BI sample files — real .pbix models to dissect, rebuild and extend. The fastest way to learn report design is to take apart professional ones.",
    delivery:
      "Used weekly inside the CEA Data Analytics flagship; students rebuild samples blind, then build against live SME data.",
    launchPriority: null,
  },

  /* ── 05 Networking & Hardware ───────────────────────────────────────── */
  {
    slug: "networking-cea",
    title: "Computer Networking & Hardware (CEA Flagship)",
    department: "networking-hardware",
    level: 2,
    sourceName: "CEA-built curriculum, CCNA-grounded",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/computer-networking",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course — taught in our rack lab, not from a GitHub page.",
    ceaWeeks: 18,
    ceaFormat: "Instructor-led",
    skills: [
      "TCP/IP",
      "Subnetting",
      "VLANs",
      "Routing & switching",
      "Wi-Fi",
      "Firewalls",
      "Troubleshooting",
    ],
    projects: [
      "Wired + wireless office LAN build",
      "Timed subnetting exam",
      "Network documentation pack",
    ],
    summary:
      "CEA's infrastructure flagship: TCP/IP, subnetting, switching, wireless and firewalls taught on real hardware in our rack lab — plus hardware diagnosis and repair. No GitHub repo teaches this properly; ours is taught by hand.",
    delivery:
      "Two evenings a week in the hardware rack room. Every student wires a live LAN and troubleshoots vendor faults before week six.",
    launchPriority: 5,
    ceaCourseSlug: "computer-networking",
  },
  {
    slug: "linux-journey",
    title: "Linux for IT Professionals (Linux Journey)",
    department: "networking-hardware",
    level: 2,
    sourceName: "Linux Journey — LabEx",
    repo: "labex-labs/linuxjourney",
    sourceUrl: "https://linuxjourney.com",
    license: "No licence file — all rights reserved",
    licenseKind: "unlicensed",
    canHostInApp: false,
    licenseNote: "No licence granted — link-only. Students use the Linux Journey site directly.",
    ceaWeeks: 10,
    ceaFormat: "Cohort + self-study",
    skills: ["Linux CLI", "Users & permissions", "Processes", "Networking basics", "Shell"],
    projects: ["Hardened Ubuntu server", "Automated backup script", "Log-based incident write-up"],
    summary:
      "The friendliest structured path from zero to Linux-comfortable: filesystem, processes, permissions, shells and basic administration. Free, step-by-step, with instant practice sandboxes.",
    delivery:
      "Daily 30-minute drills between CEA sessions; every student leaves with a hardened Ubuntu box they built themselves.",
    launchPriority: 9,
  },
  {
    slug: "it-support-cea",
    title: "IT Support & Helpdesk",
    department: "networking-hardware",
    level: 2,
    sourceName: "CEA-built curriculum",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/it-support",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course.",
    ceaWeeks: 8,
    ceaFormat: "Instructor-led",
    skills: ["Troubleshooting", "Ticketing", "Windows/macOS", "User support", "Documentation"],
    projects: ["Ticket-to-resolution portfolio", "SOPs for common fixes", "Mock helpdesk week"],
    summary:
      "The job most Port Harcourt SMEs actually hire for: the person who fixes the printer, resets the password, documents the network and keeps the office running. The most direct route from CEA to a first IT salary.",
    delivery:
      "Mock helpdesk every Thursday — tickets arrive in batches, every fix is logged and peer-reviewed.",
    launchPriority: null,
    ceaCourseSlug: "it-support",
  },
  {
    slug: "computer-repairs-cea",
    title: "Computer Hardware & Repairs",
    department: "networking-hardware",
    level: 1,
    sourceName: "CEA-built curriculum",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/computer-repairs",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course.",
    ceaWeeks: 6,
    ceaFormat: "Instructor-led",
    skills: ["Component diagnosis", "Assembly", "OS installation", "Bench workflow"],
    projects: ["Three repaired machines", "Bench test logbook", "Service price list"],
    summary:
      "Physical repair for enterprising graduates: open, diagnose, fix and refurbish real machines. Pairs with networking to produce a complete hardware + network bench technician.",
    delivery:
      "Bench-based — students work on real donated machines and graduate with a repair logbook to show future customers.",
    launchPriority: null,
    ceaCourseSlug: "computer-repairs",
  },
  {
    slug: "moby-docker",
    title: "Containers with Docker (Moby Project)",
    department: "networking-hardware",
    level: 3,
    sourceName: "Moby Project — Docker open source",
    repo: "moby/moby",
    sourceUrl: "https://github.com/moby/moby",
    license: "Apache-2.0",
    licenseKind: "apache2",
    canHostInApp: false,
    licenseNote: "Apache-2.0 code — link-only for CEA materials; the Docker docs are the course.",
    ceaWeeks: 4,
    ceaFormat: "Cohort + self-study",
    skills: ["Images", "Containers", "Volumes", "Compose", "Registries"],
    projects: [
      "Containerised web app",
      "Compose stack with database",
      "CI build pipeline producing an image",
    ],
    summary:
      "The open container engine underneath Docker, Kubernetes and most of modern deployment. Not a course — the runtime every Level 3 student operates during DevOps modules.",
    delivery:
      "Labs run inside the networking rack room; students containerise the apps they built in the software department.",
    launchPriority: null,
  },
  {
    slug: "kubernetes",
    title: "Kubernetes (Container Orchestration)",
    department: "networking-hardware",
    level: 3,
    sourceName: "Kubernetes — CNCF",
    repo: "kubernetes/kubernetes",
    sourceUrl: "https://github.com/kubernetes/kubernetes",
    license: "Apache-2.0",
    licenseKind: "apache2",
    canHostInApp: false,
    licenseNote: "Apache-2.0 code — link-only for CEA materials.",
    ceaWeeks: 6,
    ceaFormat: "Self-paced + mentorship",
    skills: ["Pods", "Services", "Deployments", "Ingress", "kubectl"],
    projects: ["Deployed web app on K3s", "Rolling update demo", "Resource limit tuning"],
    summary:
      "The CNCF graduated orchestrator that runs most production containers on earth. CEA teaches it against K3s on students' own machines — real orchestration, no cloud bill required.",
    delivery:
      "Run in the Cloud & DevOps department; networking students take it as an elective once CCNA-level fundamentals are signed off.",
    launchPriority: null,
  },
  {
    slug: "terraform",
    title: "Terraform / OpenTofu (Infrastructure as Code)",
    department: "networking-hardware",
    level: 3,
    sourceName: "Terraform — HashiCorp (BUSL) / OpenTofu fork",
    repo: "hashicorp/terraform",
    sourceUrl: "https://github.com/hashicorp/terraform",
    license: "BUSL-1.1 (not open source)",
    licenseKind: "busl",
    canHostInApp: false,
    licenseNote:
      "BUSL — not open source. Link-only; CEA teaches IaC concepts with OpenTofu and Pulumi (Apache-2.0).",
    ceaWeeks: 4,
    ceaFormat: "Self-paced + mentorship",
    skills: ["IaC concepts", "State", "Modules", "Workspaces"],
    projects: [
      "Reproducible VPC module",
      "IaC teardown/rebuild drill",
      "Peer review of a Terraform plan",
    ],
    summary:
      "The definitive infrastructure-as-code tool. Terraform's licence changed to BUSL; CEA teaches the concepts and workflows with OpenTofu — the open-source fork — keeping everything we distribute genuinely open.",
    delivery:
      "Concepts-first: every student writes and tears down a reproducible environment twice, once guided, once blind.",
    launchPriority: null,
  },

  /* ── 06 Cybersecurity ───────────────────────────────────────────────── */
  {
    slug: "security-101",
    title: "Security 101 (Microsoft)",
    department: "cybersecurity",
    level: 1,
    sourceName: "Microsoft Security 101",
    repo: "microsoft/Security-101",
    sourceUrl: "https://github.com/microsoft/Security-101",
    license: "CC0-1.0",
    licenseKind: "cc0",
    canHostInApp: true,
    licenseNote:
      "CC0 — public domain dedication. Adapt freely, no attribution required (still given).",
    ceaWeeks: 8,
    ceaFormat: "Cohort + self-study",
    skills: [
      "Threat modelling",
      "Identity & access",
      "Network security",
      "Data protection",
      "AI security",
    ],
    projects: [
      "SMB security audit write-up",
      "Phishing simulation debrief",
      "2FA rollout for a real office",
    ],
    summary:
      "Microsoft's 8-lesson, plain-language introduction to security: threats, identity, networks, infrastructure, data and AI security. The correct first door into cybersecurity for non-engineers.",
    delivery:
      "The on-ramp for the CEA Cybersecurity flagship. Every IT-support and networking graduate takes this before touching security tooling.",
    launchPriority: 6,
  },
  {
    slug: "cybersecurity-cea",
    title: "Cybersecurity Fundamentals (CEA Flagship)",
    department: "cybersecurity",
    level: 2,
    sourceName: "CEA-built curriculum, grounded in Microsoft Security 101",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/cybersecurity",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course.",
    ceaWeeks: 12,
    ceaFormat: "Instructor-led",
    skills: [
      "Risk",
      "Controls",
      "Awareness training",
      "Incident response basics",
      "Policy writing",
    ],
    projects: [
      "Security policy for an SME",
      "Awareness training for a real staffroom",
      "Incident response tabletop",
    ],
    summary:
      "Defending the actual Nigerian small business: phishing defence, account hygiene, safe wallets, device policy, and the incident phone-call every SME dreads. Built from our own classroom incidents, not imported slides.",
    delivery:
      "Instructor-led with live phishing simulations and a tabletop exercise each cohort. Graduates can run an SME security baseline alone.",
    launchPriority: 6,
    ceaCourseSlug: "cybersecurity",
  },

  /* ── 07 Cloud & DevOps ──────────────────────────────────────────────── */
  {
    slug: "devops-study-hub",
    title: "DevOps Study Hub",
    department: "cloud-devops",
    level: 3,
    sourceName: "DevOps Study Hub",
    repo: "igalhub/devops-study-hub",
    sourceUrl: "https://github.com/igalhub/devops-study-hub",
    license: "MIT",
    licenseKind: "mit",
    canHostInApp: false,
    licenseNote:
      "MIT, but a young single-author project (1★) — link-only until it matures; quality read by a mentor first.",
    ceaWeeks: 8,
    ceaFormat: "Self-paced + cohort",
    skills: ["Linux", "Docker", "CI/CD", "Monitoring", "Incidents"],
    projects: [
      "CI pipeline for a CEA student project",
      "Monitored service with alerts",
      "Runbook for a failure mode",
    ],
    summary:
      "A structured, quiz-driven DevOps study repository: Linux, Docker, pipelines and incident practice. Young and small — CEA vets its content lesson-by-lesson before assigning it to cohorts.",
    delivery:
      "Used as a homework lattice between CEA's infrastructure sessions, not as the syllabus itself.",
    launchPriority: 11,
  },
  {
    slug: "github-skills",
    title: "GitHub Skills — Git & Open-Source Collaboration",
    department: "cloud-devops",
    level: 1,
    sourceName: "GitHub Skills",
    repo: "skills/introduction-to-github",
    sourceUrl: "https://github.com/skills",
    license: "MIT",
    licenseKind: "mit",
    canHostInApp: false,
    licenseNote: "MIT — interactive courses run on GitHub itself; link-only by design.",
    ceaWeeks: 2,
    ceaFormat: "Self-paced",
    skills: ["Git", "GitHub", "Pull requests", "Actions", "Markdown"],
    projects: [
      "First merged PR",
      "Issues + project board for a team repo",
      "README that passes review",
    ],
    summary:
      "GitHub's official interactive courses — learn Git, pull requests, Actions and Markdown inside real repositories. Two hours gets a graduate their first merged pull request.",
    delivery:
      "Mandatory week-one homework in every Level 2 course. CEA enforces a merged PR before a student may submit a final project.",
    launchPriority: null,
  },

  /* ── 08 Creative & Digital Design ───────────────────────────────────── */
  {
    slug: "ui-ux-product-design",
    title: "UI/UX & Product Design",
    department: "creative-design",
    level: 2,
    sourceName: "Product Design Path — inaki",
    repo: "inaki/product-design",
    sourceUrl: "https://github.com/inaki/product-design",
    license: "MIT",
    licenseKind: "mit",
    canHostInApp: false,
    licenseNote:
      "MIT, but a tiny single-author repo (0★) — link-only as a reference; CEA supplies the pedagogy.",
    ceaWeeks: 12,
    ceaFormat: "Instructor-led",
    skills: ["User research", "Wireframes", "Figma", "Prototyping", "Usability testing"],
    projects: [
      "Research-backed redesign of a local app",
      "Clickable Figma prototype",
      "Tested with 5 real users",
    ],
    summary:
      "Product thinking before pixels: research, wireframes, prototypes, testing. The open repo is a checklist — the CEA studio teaches the judgement: why one layout wins, taught on real Port Harcourt products.",
    delivery:
      "Studio crits every Friday. Students redesign real businesses' apps and defend every decision to the room.",
    launchPriority: 7,
  },
  {
    slug: "awesome-blender",
    title: "3D & Blender Production",
    department: "creative-design",
    level: 3,
    sourceName: "Awesome Blender — curated list",
    repo: "agmmnn/awesome-blender",
    sourceUrl: "https://github.com/agmmnn/awesome-blender",
    license: "CC0-1.0",
    licenseKind: "cc0",
    canHostInApp: false,
    licenseNote: "CC0 list — the linked tutorials have their own licences. Link-only directory.",
    ceaWeeks: 8,
    ceaFormat: "Cohort + self-study",
    skills: ["Blender", "Modelling", "Materials", "Lighting", "Rendering"],
    projects: [
      "Rendered product shot for a real vendor",
      "3D logo lockup",
      "30-second animated ident",
    ],
    summary:
      "A curated map of the Blender ecosystem — add-ons, tutorials, asset pipelines. The list orients; CEA's studio sessions are where the actual modelling gets done and critiqued.",
    delivery:
      "One guided project a fortnight; graduates leave with a vendor-ready 3D product shot and an animation ident.",
    launchPriority: null,
  },
  {
    slug: "graphic-design-cea",
    title: "Graphic Design & Brand Studio (CEA Flagship)",
    department: "creative-design",
    level: 2,
    sourceName: "CEA-built curriculum",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/graphic-design",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course.",
    ceaWeeks: 18,
    ceaFormat: "Instructor-led",
    skills: ["Layout", "Typography", "Brand identity", "Print production", "Digital assets"],
    projects: [
      "Full brand identity for a local business",
      "Social + print rollout",
      "Portfolio of 3 identities",
    ],
    summary:
      "The commercial core of the creative department: briefing, identity, typography, print and social rollout — the exact deliverables shops and SMEs pay for in Port Harcourt every single week.",
    delivery:
      "Brief-driven studio. Every project is a real client brief from a CEA partner business, reviewed at Friday crit.",
    launchPriority: null,
    ceaCourseSlug: "graphic-design",
  },
  {
    slug: "web-design-cea",
    title: "Web Design (CEA)",
    department: "creative-design",
    level: 1,
    sourceName: "CEA-built curriculum",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/web-design",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course.",
    ceaWeeks: 8,
    ceaFormat: "Instructor-led",
    skills: ["Layout", "Colour", "Type", "Canva/Figma", "Responsive thinking"],
    projects: ["3 page designs", "Mobile + desktop variants", "Client-ready handoff file"],
    summary:
      "Design-first introduction to websites: layout, colour, typography and responsive thinking. The on-ramp into both web development and UI/UX for visually inclined beginners.",
    delivery:
      "Figma-first studio. Every student leaves with three designs a real business could commission for real money.",
    launchPriority: null,
    ceaCourseSlug: "web-design",
  },

  /* ── 09 Digital Business & Marketing ────────────────────────────────── */
  {
    slug: "digital-marketing-cea",
    title: "Digital Marketing & SEO (CEA Flagship)",
    department: "digital-business",
    level: 2,
    sourceName: "CEA-built curriculum",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/digital-marketing",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course.",
    ceaWeeks: 10,
    ceaFormat: "Instructor-led",
    skills: ["SEO", "Social content", "Meta + Google Ads", "Analytics", "Email"],
    projects: [
      "90-day marketing plan for a real SME",
      "Ranked article",
      "Ad campaign with measured ROAS",
    ],
    summary:
      "Real digital marketing for Nigerian businesses: search, social, ads, analytics and the discipline of measuring all of it. Students run campaigns for actual partner businesses and report on them.",
    delivery:
      "Live-fire: every cohort manages a real ad budget in partnership with a local SME and defends the numbers at the final session.",
    launchPriority: 8,
    ceaCourseSlug: "digital-marketing",
  },
  {
    slug: "hubspot-academy",
    title: "HubSpot Academy (Free Certifications)",
    department: "digital-business",
    level: 2,
    sourceName: "HubSpot Academy",
    repo: null,
    sourceUrl: "https://academy.hubspot.com",
    license: "Free to access; content © HubSpot",
    licenseKind: "external-free",
    canHostInApp: false,
    licenseNote: "Free certifications, hosted by HubSpot — not open source; link-only by design.",
    ceaWeeks: 4,
    ceaFormat: "Self-paced",
    skills: ["Inbound marketing", "CRM", "Email marketing", "Marketing analytics"],
    projects: ["HubSpot Inbound Marketing certificate", "Campaign built in a free HubSpot portal"],
    summary:
      "HubSpot's free, rigorous certification tracks in inbound marketing, CRM and content. Globally recognised credentials that cost CEA nothing but the student's time — the quiet workhorse of marketing departments.",
    delivery:
      "Recommended parallel track for marketing students; CEA certificates remain the CEA's own, and we say so plainly on every certificate wall.",
    launchPriority: null,
  },
  {
    slug: "google-digital-garage",
    title: "Google Digital Garage (Free Certifications)",
    department: "digital-business",
    level: 1,
    sourceName: "Google Digital Garage",
    repo: null,
    sourceUrl: "https://learndigital.withgoogle.com",
    license: "Free to access; content © Google",
    licenseKind: "external-free",
    canHostInApp: false,
    licenseNote: "Free training, hosted by Google — link-only.",
    ceaWeeks: 3,
    ceaFormat: "Self-paced",
    skills: ["Digital marketing basics", "SEO", "Analytics", "Measurement"],
    projects: ["Google Fundamentals of Digital Marketing certificate"],
    summary:
      "Google's own free fundamentals certificate — the most recognised no-cost credential in Nigerian digital marketing job ads. Broad, shallow, genuinely useful as a first rung.",
    delivery:
      "Week-one orientation homework for the marketing department; the certificate is theirs, the marketing career is ours to build.",
    launchPriority: null,
  },
  {
    slug: "business-freelancing-cea",
    title: "Business, Freelancing & Entrepreneurship (CEA Flagship)",
    department: "digital-business",
    level: 2,
    sourceName: "CEA-built curriculum",
    repo: null,
    sourceUrl: "https://www.cea.ng/classes/business-freelancing",
    license: "CEA internal",
    licenseKind: "cea-internal",
    canHostInApp: true,
    licenseNote: "CEA's own course.",
    ceaWeeks: 6,
    ceaFormat: "Instructor-led",
    skills: ["Client acquisition", "Proposals", "Pricing", "Delivery", "Invoicing"],
    projects: [
      "Signed first paid contract",
      "Priced service menu",
      "Portfolio + 3 client references",
    ],
    summary:
      "The missing layer between 'knows the craft' and 'earns from the craft': positioning, pricing, proposals, first clients and delivery discipline. Every CEA graduate with a marketable skill should take this.",
    delivery:
      "Cohort programme culminating in each student landing one real paying client before graduation — not a simulation.",
    launchPriority: null,
    ceaCourseSlug: "business-freelancing",
  },

  /* ── Cross-department references referenced by departments ─────────── */
  {
    slug: "ebook-free-programming-books",
    title: "Free Programming Books (EbookFoundation)",
    department: "software-engineering",
    level: 1,
    sourceName: "EbookFoundation — Free Programming Books",
    repo: "EbookFoundation/free-programming-books",
    sourceUrl: "https://github.com/EbookFoundation/free-programming-books",
    license: "CC BY 4.0",
    licenseKind: "cc-by",
    canHostInApp: false,
    licenseNote:
      "The list is CC-BY; the books it indexes keep their own licences. Link-only directory.",
    ceaWeeks: 1,
    ceaFormat: "Self-paced",
    skills: ["Self-study", "Reading documentation"],
    projects: ["Reading list tailored to the student's department"],
    summary:
      "The internet's largest curated index of free, legally-hosted programming books, courses and documentation — CC-BY licensed, maintained by thousands. CEA prescribes from it, never re-hosts from it.",
    delivery:
      "Each department head curates one annotated reading list per term from this index; students receive it in week one.",
    launchPriority: null,
  },
  {
    slug: "awesome-python",
    title: "Awesome Python (Reference Index)",
    department: "software-engineering",
    level: 3,
    sourceName: "vinta — Awesome Python",
    repo: "vinta/awesome-python",
    sourceUrl: "https://github.com/vinta/awesome-python",
    license: "CC BY 4.0",
    licenseKind: "cc-by",
    canHostInApp: false,
    licenseNote: "CC-BY list — the indexed projects keep their own licences. Link-only directory.",
    ceaWeeks: 1,
    ceaFormat: "Self-paced",
    skills: ["Ecosystem literacy", "Library selection"],
    projects: ["Dependency survey for the student's capstone"],
    summary:
      "The canonical index of the Python ecosystem — frameworks, libraries, tools, in every domain. Not a course; the map that keeps graduates from reinventing what already exists.",
    delivery:
      "Referenced in capstone reviews when students need 'the thing that already solves this'.",
    launchPriority: null,
  },
  {
    slug: "ossu-computer-science",
    title: "Computer Science (OSSU — Full Path)",
    department: "software-engineering",
    level: 3,
    sourceName: "Open Source Society University — Computer Science",
    repo: "ossu/computer-science",
    sourceUrl: "https://github.com/ossu/computer-science",
    license: "MIT",
    licenseKind: "mit",
    canHostInApp: true,
    licenseNote:
      "MIT — the OSSU curriculum may be adapted with attribution; the linked courses keep their own terms.",
    ceaWeeks: 104,
    ceaFormat: "Self-paced",
    skills: ["Algorithms", "Systems", "Math", "Software engineering", "Networks"],
    projects: ["Complete OSSU core with certificates", "Capstone software project"],
    summary:
      "A free, complete, undergraduate-quality computer science sequence: algorithms, systems, maths and theory, assembled from university MOOCs with assessments. Two years, honest work, no tuition.",
    delivery:
      "The vertical track for the rare committed graduate — supported monthly. Most CEA students need Level 2; this is for the ones who want the whole mountain.",
    launchPriority: null,
  },
  {
    slug: "mobile-app-open-source",
    title: "Mobile App Development (Flutter, RN & Android)",
    department: "software-engineering",
    level: 3,
    sourceName: "Flutter samples · React Native · Android architecture samples",
    repo: "flutter/samples",
    sourceUrl: "https://github.com/flutter/samples",
    license: "BSD / MIT / Apache-2.0",
    licenseKind: "bsd3",
    canHostInApp: false,
    licenseNote:
      "Permissively licensed code — but code samples are not a course; link-only with CEA teaching structure around them.",
    ceaWeeks: 16,
    ceaFormat: "Instructor-led",
    skills: ["Dart/Flutter", "React Native", "Android basics", "State management", "Publishing"],
    projects: [
      "Published Play Store listing",
      "Cross-platform MVP for a real SME",
      "Offline-first field app",
    ],
    summary:
      "Native and cross-platform mobile from the strongest open codebases on GitHub: Flutter's samples, React Native (MIT) and Android's official architecture samples (Apache-2.0). Code is permissively licensed — the structure is CEA's.",
    delivery:
      "Studio format culminating in a published listing — graduates ship to the Play Store with a real SME as client. Open samples are dissected in class, never pasted.",
    launchPriority: 10,
    ceaCourseSlug: "mobile-app-development",
  },
  {
    slug: "openai-cookbook",
    title: "OpenAI Cookbook (Reference)",
    department: "ai",
    level: 2,
    sourceName: "OpenAI Cookbook",
    repo: "openai/openai-cookbook",
    sourceUrl: "https://github.com/openai/openai-cookbook",
    license: "MIT",
    licenseKind: "mit",
    canHostInApp: false,
    licenseNote: "MIT — recipes and notebooks, not a sequenced course; link-only reference.",
    ceaWeeks: 2,
    ceaFormat: "Self-paced",
    skills: ["API usage", "Prompting patterns", "Function calling", "RAG recipes"],
    projects: ["One recipe adapted into a CEA-context tool"],
    summary:
      "OpenAI's official recipe collection for building with their APIs — embeddings, function calling, RAG, evals. A reference library, not a curriculum; CEA uses it to keep the AI track's applied sessions current.",
    delivery:
      "Assigned reading inside /ai-engineering projects; recipes get rewritten against Nigerian use cases in class.",
    launchPriority: null,
  },
  {
    slug: "anthropic-cookbook",
    title: "Anthropic Cookbook (Reference)",
    department: "ai",
    level: 2,
    sourceName: "Anthropic Cookbook",
    repo: "anthropics/claude-cookbooks",
    sourceUrl: "https://github.com/anthropics/claude-cookbooks",
    license: "MIT",
    licenseKind: "mit",
    canHostInApp: false,
    licenseNote: "MIT — notebooks and recipes; link-only reference.",
    ceaWeeks: 2,
    ceaFormat: "Self-paced",
    skills: ["Claude API", "Tool use", "Agent patterns", "Prompt caching"],
    projects: ["One recipe adapted into a working CEA-context tool"],
    summary:
      "Anthropic's official recipe collection: tool use, agent patterns, prompt caching, multimodal workflows. The fastest way to see frontier practice applied, with runnable notebooks.",
    delivery:
      "Assigned reading inside the agents module of /ai-engineering; notebooks get run live in class with students' own keys.",
    launchPriority: null,
  },
  {
    slug: "prompt-engineering-guide",
    title: "Prompt Engineering Guide (dair-ai)",
    department: "ai",
    level: 2,
    sourceName: "Prompt Engineering Guide — dair-ai",
    repo: "dair-ai/Prompt-Engineering-Guide",
    sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide",
    license: "MIT",
    licenseKind: "mit",
    canHostInApp: false,
    licenseNote:
      "MIT — link-only as a reference; CEA's own prompt lab covers these patterns in-app.",
    ceaWeeks: 2,
    ceaFormat: "Self-paced",
    skills: ["Prompt design", "Evaluation", "RAG prompting", "Agent prompting"],
    projects: ["Prompt pattern cards for the CEA AI track"],
    summary:
      "The definitive open guide to prompting: techniques, papers, notebooks and applications. Dense, reference-quality — CEA distils its patterns into classroom materials with attribution.",
    delivery:
      "The source text behind the prompt-patterns lab on /ai-engineering; cited explicitly in the materials we adapt.",
    launchPriority: null,
  },
];

export type LaunchCourse = { priority: number; courseSlug: string; weeks: string; note: string };

export const launchPlan: LaunchCourse[] = [
  {
    priority: 1,
    courseSlug: "the-odin-project",
    weeks: "6 months",
    note: "Flagship full-stack evening cohort; CEA structure, Odin content, demo day.",
  },
  {
    priority: 2,
    courseSlug: "30-days-of-python",
    weeks: "3 months",
    note: "Automation-first Python; every script aimed at Nigerian office work.",
  },
  {
    priority: 3,
    courseSlug: "data-analytics-cea",
    weeks: "4 months",
    note: "CEA's own flagship — the most employable course we own.",
  },
  {
    priority: 4,
    courseSlug: "ai-engineering-from-scratch",
    weeks: "4–6 months",
    note: "Already hosted at /ai-engineering — CEA adds cohorts and mentorship.",
  },
  {
    priority: 5,
    courseSlug: "networking-cea",
    weeks: "3–6 months",
    note: "Rack-room teaching; no online substitute for hands-on networking.",
  },
  {
    priority: 6,
    courseSlug: "cybersecurity-cea",
    weeks: "3 months",
    note: "Paired with Security 101 as the on-ramp and assessment.",
  },
  {
    priority: 7,
    courseSlug: "ui-ux-product-design",
    weeks: "3 months",
    note: "Studio crits on real Port Harcourt products.",
  },
  {
    priority: 8,
    courseSlug: "digital-marketing-cea",
    weeks: "2–3 months",
    note: "Live ad budgets with partner businesses.",
  },
  {
    priority: 9,
    courseSlug: "linux-journey",
    weeks: "3 months",
    note: "Daily drills; the sysadmin on-ramp for the infrastructure department.",
  },
  {
    priority: 10,
    courseSlug: "mobile-app-open-source",
    weeks: "4 months",
    note: "Published Play Store listings are the graduation bar.",
  },
  {
    priority: 11,
    courseSlug: "devops-study-hub",
    weeks: "4–6 months",
    note: "Cloud & DevOps department; GitHub Skills as week-one homework.",
  },
  {
    priority: 12,
    courseSlug: "data-engineering-zoomcamp",
    weeks: "4–6 months",
    note: "Level 3 data engineering; joint with the AI department.",
  },
];

export const findCurriculumDepartment = (slug: string) =>
  curriculumDepartments.find((d) => d.slug === slug) ?? null;

export const findCurriculumCourse = (slug: string) =>
  curriculumCourses.find((c) => c.slug === slug) ?? null;

export const coursesInDepartment = (departmentSlug: string) =>
  curriculumCourses.filter((c) => c.department === departmentSlug);

export const hostedCount = curriculumCourses.filter((c) => c.canHostInApp).length;
export const launchCount = launchPlan.length;
export const courseCount = curriculumCourses.length;
