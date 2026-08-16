export type Engine = "learning" | "career" | "services" | "erp" | "community";

export const engines: {
  key: Engine;
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  text: string;
  bullets: string[];
}[] = [
  {
    key: "learning",
    name: "Learning Engine",
    tagline: "From scratch to advanced",
    description:
      "Cohort courses, self-paced tracks, labs, assessments, gradebook and verifiable certificates.",
    gradient: "bg-gradient-learning",
    text: "text-learning",
    bullets: ["Live cohorts & labs", "Auto-graded assessments", "Verifiable certificates"],
  },
  {
    key: "career",
    name: "Career Engine",
    tagline: "Skills to income",
    description:
      "Portfolios, mentorship, job marketplace, freelance gigs and employer talent pipelines.",
    gradient: "bg-gradient-career",
    text: "text-career",
    bullets: ["Portfolio builder", "Mentor matching", "Job & gig marketplace"],
  },
  {
    key: "services",
    name: "Services Engine",
    tagline: "Academy as an agency",
    description:
      "Client portal, project delivery, tickets and proposals powered by student-built teams.",
    gradient: "bg-gradient-services",
    text: "text-services",
    bullets: ["Client portal", "Project delivery", "Support desk"],
  },
  {
    key: "erp",
    name: "ERP Engine",
    tagline: "Run the whole institution",
    description:
      "Finance, HR, inventory, procurement, admissions and analytics in one operating system.",
    gradient: "bg-gradient-erp",
    text: "text-erp",
    bullets: ["Finance & payroll", "Admissions pipeline", "Assets & procurement"],
  },
  {
    key: "community",
    name: "Community Engine",
    tagline: "Belonging that compounds",
    description:
      "Forums, events, alumni network, partners, volunteers and the culture layer of the academy.",
    gradient: "bg-gradient-community",
    text: "text-community",
    bullets: ["Forums & groups", "Events & meetups", "Alumni network"],
  },
];

export const engineMap = Object.fromEntries(engines.map((e) => [e.key, e]));

export type Program = {
  slug: string;
  title: string;
  category: string;
  engine: Engine;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  mode: string;
  price: number;
  rating: number;
  learners: number;
  blurb: string;
  outcomes: string[];
  modules: { title: string; lessons: number; hours: number }[];
  tools: string[];
};

export const programs: Program[] = [
  {
    slug: "full-stack-software-development",
    title: "Full-Stack Software Development",
    category: "Software Development",
    engine: "learning",
    level: "Beginner",
    duration: "9 months",
    mode: "Hybrid · Port Harcourt + Online",
    price: 850000,
    rating: 0,
    learners: 0,
    blurb:
      "Go from first line of code to shipping production apps with React, TypeScript, Node and cloud deployment.",
    outcomes: [
      "Build and deploy 6 production-grade applications",
      "Master TypeScript, React and Node fundamentals",
      "Work in agile teams on real client briefs",
      "Graduate with an interview-ready portfolio",
    ],
    modules: [
      { title: "Programming Foundations", lessons: 24, hours: 40 },
      { title: "Frontend with React & TypeScript", lessons: 32, hours: 68 },
      { title: "Backend, APIs & Databases", lessons: 28, hours: 60 },
      { title: "Cloud, CI/CD & DevOps Basics", lessons: 18, hours: 36 },
      { title: "Capstone Client Project", lessons: 12, hours: 80 },
    ],
    tools: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "GitHub Actions"],
  },
  {
    slug: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Cybersecurity",
    engine: "learning",
    level: "Intermediate",
    duration: "7 months",
    mode: "Hybrid · Port Harcourt + Online",
    price: 920000,
    rating: 0,
    learners: 0,
    blurb:
      "Defend real infrastructure. Blue-team operations, threat hunting, incident response and compliance.",
    outcomes: [
      "Run a SOC shift end to end",
      "Perform threat hunting and incident response",
      "Harden networks, endpoints and cloud workloads",
      "Prepare for CompTIA Security+ and BTL1",
    ],
    modules: [
      { title: "Security Fundamentals", lessons: 20, hours: 34 },
      { title: "Network & Endpoint Defense", lessons: 26, hours: 52 },
      { title: "SIEM, Detection & Threat Hunting", lessons: 24, hours: 56 },
      { title: "Incident Response & Forensics", lessons: 18, hours: 40 },
      { title: "GRC & Capstone SOC Simulation", lessons: 14, hours: 46 },
    ],
    tools: ["Wireshark", "Splunk", "Elastic", "Kali Linux", "MITRE ATT&CK"],
  },
  {
    slug: "cloud-engineering-devops",
    title: "Cloud Engineering & DevOps",
    category: "Cloud",
    engine: "learning",
    level: "Intermediate",
    duration: "8 months",
    mode: "Online",
    price: 890000,
    rating: 0,
    learners: 0,
    blurb:
      "Design, automate and operate resilient cloud platforms with infrastructure as code and observability.",
    outcomes: [
      "Architect multi-tier cloud systems",
      "Automate delivery with IaC and pipelines",
      "Operate Kubernetes in production",
      "Own cost, reliability and observability",
    ],
    modules: [
      { title: "Linux & Networking Core", lessons: 22, hours: 40 },
      { title: "Cloud Architecture", lessons: 26, hours: 54 },
      { title: "Containers & Kubernetes", lessons: 24, hours: 58 },
      { title: "IaC, CI/CD & GitOps", lessons: 20, hours: 44 },
      { title: "SRE Capstone", lessons: 10, hours: 40 },
    ],
    tools: ["AWS", "Terraform", "Kubernetes", "ArgoCD", "Prometheus", "Grafana"],
  },
  {
    slug: "data-science-ai",
    title: "Data Science & Applied AI",
    category: "AI & Data",
    engine: "learning",
    level: "Intermediate",
    duration: "9 months",
    mode: "Hybrid · Port Harcourt + Online",
    price: 980000,
    rating: 0,
    learners: 0,
    blurb:
      "Turn raw data into decisions. Analytics, machine learning, LLM applications and MLOps in production.",
    outcomes: [
      "Ship end-to-end ML products",
      "Build RAG and agent workflows with LLMs",
      "Communicate insight to executives",
      "Deploy and monitor models in production",
    ],
    modules: [
      { title: "Python & Statistics", lessons: 26, hours: 46 },
      { title: "Data Wrangling & Visualization", lessons: 22, hours: 42 },
      { title: "Machine Learning", lessons: 28, hours: 62 },
      { title: "LLMs & Applied AI", lessons: 20, hours: 48 },
      { title: "MLOps & Capstone", lessons: 14, hours: 52 },
    ],
    tools: ["Python", "pandas", "scikit-learn", "PyTorch", "LangChain", "MLflow"],
  },
  {
    slug: "product-ui-ux-design",
    title: "Product & UI/UX Design",
    category: "Design",
    engine: "learning",
    level: "Beginner",
    duration: "6 months",
    mode: "Hybrid · Port Harcourt + Online",
    price: 640000,
    rating: 0,
    learners: 0,
    blurb:
      "Research, systems thinking and interface craft — design products people actually finish using.",
    outcomes: [
      "Run discovery research and synthesis",
      "Build and maintain a design system",
      "Prototype and test high-fidelity flows",
      "Present work like a product designer",
    ],
    modules: [
      { title: "Design Foundations", lessons: 18, hours: 30 },
      { title: "UX Research & Strategy", lessons: 20, hours: 38 },
      { title: "Interface & Design Systems", lessons: 24, hours: 50 },
      { title: "Prototyping & Testing", lessons: 16, hours: 34 },
      { title: "Portfolio Studio", lessons: 10, hours: 40 },
    ],
    tools: ["Figma", "FigJam", "Maze", "Framer", "Notion"],
  },
  {
    slug: "digital-marketing-growth",
    title: "Digital Marketing & Growth",
    category: "Marketing",
    engine: "career",
    level: "Beginner",
    duration: "5 months",
    mode: "Online",
    price: 480000,
    rating: 0,
    learners: 0,
    blurb:
      "Performance marketing, content engines, funnels and analytics for Nigerian and global markets.",
    outcomes: [
      "Run profitable paid campaigns",
      "Build content and SEO engines",
      "Design funnels that convert",
      "Report on CAC, LTV and payback",
    ],
    modules: [
      { title: "Marketing Fundamentals", lessons: 16, hours: 26 },
      { title: "Paid Acquisition", lessons: 22, hours: 42 },
      { title: "Content, SEO & Social", lessons: 20, hours: 38 },
      { title: "Funnels & CRO", lessons: 16, hours: 30 },
      { title: "Analytics Capstone", lessons: 10, hours: 28 },
    ],
    tools: ["Meta Ads", "Google Ads", "GA4", "Semrush", "HubSpot"],
  },
  {
    slug: "networking-it-support",
    title: "Networking & IT Support",
    category: "Networking",
    engine: "learning",
    level: "Beginner",
    duration: "6 months",
    mode: "On-campus · Port Harcourt",
    price: 520000,
    rating: 0,
    learners: 0,
    blurb:
      "Hands-on hardware, routing, switching and enterprise support — the fastest route into tech employment.",
    outcomes: [
      "Build and troubleshoot LAN/WAN networks",
      "Support enterprise endpoints and users",
      "Configure routers, switches and firewalls",
      "Prepare for CCNA and CompTIA A+",
    ],
    modules: [
      { title: "Hardware & Operating Systems", lessons: 20, hours: 36 },
      { title: "Networking Essentials", lessons: 24, hours: 48 },
      { title: "Routing & Switching", lessons: 22, hours: 46 },
      { title: "Enterprise Support Desk", lessons: 16, hours: 32 },
      { title: "Field Practicum", lessons: 8, hours: 40 },
    ],
    tools: ["Cisco IOS", "Packet Tracer", "Windows Server", "Linux", "MikroTik"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "Mobile",
    engine: "learning",
    level: "Intermediate",
    duration: "6 months",
    mode: "Online",
    price: 700000,
    rating: 0,
    learners: 0,
    blurb:
      "Ship cross-platform apps to the store with React Native, offline-first data and native integrations.",
    outcomes: [
      "Publish apps to both stores",
      "Design offline-first architectures",
      "Integrate payments and push",
      "Instrument and grow mobile products",
    ],
    modules: [
      { title: "Mobile Foundations", lessons: 18, hours: 30 },
      { title: "React Native Core", lessons: 26, hours: 54 },
      { title: "Data, Offline & Sync", lessons: 18, hours: 36 },
      { title: "Native Modules & Release", lessons: 14, hours: 30 },
      { title: "Store Launch Capstone", lessons: 10, hours: 36 },
    ],
    tools: ["React Native", "Expo", "TypeScript", "Firebase", "Sentry"],
  },
];

export const services = [
  {
    slug: "custom-software",
    title: "Custom Software Development",
    engine: "services" as Engine,
    blurb: "Web platforms, internal tools and APIs delivered by senior-led academy squads.",
    from: 2500000,
    deliverables: ["Discovery & architecture", "Design system", "Build & QA", "Handover + support"],
  },
  {
    slug: "cybersecurity-audit",
    title: "Cybersecurity Audit & Hardening",
    engine: "services" as Engine,
    blurb: "Penetration testing, posture review and a prioritised remediation roadmap.",
    from: 1800000,
    deliverables: ["Scoping", "Testing", "Executive report", "Remediation support"],
  },
  {
    slug: "cloud-migration",
    title: "Cloud Migration & DevOps",
    engine: "services" as Engine,
    blurb: "Move workloads to the cloud with IaC, pipelines and observability from day one.",
    from: 2100000,
    deliverables: ["Assessment", "Landing zone", "Migration waves", "Runbooks"],
  },
  {
    slug: "corporate-training",
    title: "Corporate Training",
    engine: "career" as Engine,
    blurb: "Upskill teams with tailored cohorts, labs and measurable competency tracking.",
    from: 950000,
    deliverables: ["Skills audit", "Custom curriculum", "Live delivery", "Impact report"],
  },
  {
    slug: "brand-product-design",
    title: "Brand & Product Design",
    engine: "services" as Engine,
    blurb: "Identity, product UX and design systems that make your product feel inevitable.",
    from: 1200000,
    deliverables: ["Brand strategy", "Visual identity", "Product UX", "Design system"],
  },
  {
    slug: "growth-marketing",
    title: "Growth Marketing Retainer",
    engine: "career" as Engine,
    blurb: "Full-funnel acquisition run by our growth pod with weekly reporting.",
    from: 750000,
    deliverables: ["Growth audit", "Channel plan", "Creative production", "Weekly reporting"],
  },
];

export const engagements: {
  sector: string;
  title: string;
  description: string;
  capabilities: string[];
}[] = [
  {
    sector: "Education",
    title: "Digital operations for schools and institutions",
    description:
      "Admissions, fee management, attendance, and reporting — digitised into a single workspace that administrators, teachers, and parents can access.",
    capabilities: [
      "Enrollment management",
      "Fee collection portals",
      "Attendance tracking",
      "Reporting dashboards",
    ],
  },
  {
    sector: "Cybersecurity",
    title: "Building detection capability",
    description:
      "Training analyst teams and standing up practical security operations on existing infrastructure — without requiring new tooling investment.",
    capabilities: [
      "Analyst training",
      "Detection rule development",
      "SOC setup",
      "Incident response playbooks",
    ],
  },
  {
    sector: "Talent & Recruitment",
    title: "Verified hiring pipelines",
    description:
      "Connecting employers to job-ready graduates through graded capstones, trial tasks, and tracked placement — replacing CV screening with skills verification.",
    capabilities: [
      "Skills-based screening",
      "Trial task management",
      "Placement tracking",
      "Employer onboarding",
    ],
  },
  {
    sector: "Public Sector & NGOs",
    title: "Field operations and coordination",
    description:
      "Digitising field reporting, training logs, and escalations for distributed teams — with offline-tolerant tools that work on basic connectivity.",
    capabilities: [
      "Field data collection",
      "Team coordination",
      "Reporting automation",
      "Command dashboards",
    ],
  },
];

export const stats = [
  { label: "Training domains", value: 9, suffix: "" },
  { label: "Ecosystem pillars", value: 5, suffix: "" },
  { label: "CEA-OS workspaces", value: 30, suffix: "+" },
  { label: "Journey stages", value: 10, suffix: "" },
];

export const partnersList: string[] = [
  "Employers",
  "Schools & Colleges",
  "NGOs",
  "Government",
  "Churches",
  "Institutions",
  "Sponsors & Scholars",
  "Community groups",
];

export const events: {
  slug: string;
  title: string;
  date: string;
  time: string;
  type: string;
  location: string;
  engine: Engine;
  blurb: string;
}[] = [
  {
    slug: "career-talent-fair-2026",
    title: "Career & Talent Fair — August",
    date: "2026-08-22",
    time: "10:00 – 16:00 WAT",
    type: "Career Fair",
    location: "Port Harcourt Campus & Online",
    engine: "career",
    blurb:
      "Meet employers from the network, submit to live openings and get portfolio reviews from hiring practitioners.",
  },
  {
    slug: "build-night-soc",
    title: "Build Night: Stand up a mini-SOC in one evening",
    date: "2026-08-15",
    time: "17:00 – 20:00 WAT",
    type: "Build Night",
    location: "Online (Live)",
    engine: "learning",
    blurb:
      "Ship a detection lab on open-source tooling with the cybersecurity faculty. Bring a laptop and a free Elastic account.",
  },
  {
    slug: "cea-os-demo-day",
    title: "CEA-OS Demo Day: ERP suite for institutions",
    date: "2026-08-29",
    time: "11:00 – 13:00 WAT",
    type: "Demo",
    location: "Online (Live)",
    engine: "erp",
    blurb:
      "Admissions, finance, HR and programmes in one workspace — a live walkthrough of the ERP engine for school leaders.",
  },
  {
    slug: "client-showcase",
    title: "Services Engine: Client showcase & pitches",
    date: "2026-09-12",
    time: "12:00 – 15:00 WAT",
    type: "Showcase",
    location: "Port Harcourt Campus",
    engine: "services",
    blurb:
      "Student studios pitch real client briefs — brand sprints, security audits and web builds — in front of the employer network.",
  },
  {
    slug: "alumni-mixer-sep",
    title: "Alumni Mixer & Mentor Matching",
    date: "2026-09-26",
    time: "16:00 – 19:00 WAT",
    type: "Community",
    location: "Port Harcourt Campus & Online",
    engine: "community",
    blurb:
      "Meet the alumni cohort, hear five-minute career stories and get matched with a mentor before the next term.",
  },
];

import { newBlogPosts } from "./blog-posts-new";

export const blogPosts: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  role: string;
  date: string;
  readingTime: string;
  engine: Engine;
  body: string[];
}[] = [
  ...newBlogPosts,
  {
    slug: "nigeria-tech-talent-2026",
    title: "The state of Nigerian tech talent in 2026",
    excerpt:
      "Hiring has shifted from raw headcount to verified capability. Here's what employers now screen for.",
    category: "Industry",
    author: "Cyber Elias Academy",
    role: "Team CEA",
    date: "2026-07-18",
    readingTime: "8 min",
    engine: "career" as Engine,
    body: [
      "Two years ago, the fastest route into a Nigerian engineering team was a bootcamp certificate and enthusiasm. That door has narrowed. Employers now open with a portfolio review and a paid trial task.",
      "What changed is not the supply of talent — it is the cost of verifying it. AI-assisted applications made resumes cheap to produce and expensive to trust. The signal moved to artifacts: shipped products, code you can read, incident write-ups, design case studies with measured outcomes.",
      "This is why every CEA program is designed to end in a capstone graded by a working practitioner rather than an internal rubric. The output is not a grade. It is evidence.",
      "For learners the implication is simple: optimise for the artifact, not the certificate. For employers: your interview loop should start where the artifact ends.",
    ],
  },
  {
    slug: "building-a-soc-on-a-budget",
    title: "Building a SOC on a Nigerian budget",
    excerpt:
      "You do not need a seven-figure SIEM licence to get real detection coverage. Start here.",
    category: "Cybersecurity",
    author: "Cyber Elias Academy",
    role: "Team CEA",
    date: "2026-06-30",
    readingTime: "11 min",
    engine: "learning" as Engine,
    body: [
      "Most security programmes in mid-sized Nigerian firms fail for the same reason: they buy tooling before they define detections.",
      "Start with an asset inventory and the ten attack techniques most likely to touch your environment. Map each to a log source you already have. In practice this is Windows event logs, firewall logs, and your identity provider.",
      "Only then choose a platform. Open-source Elastic will carry you a long way at this stage, and the discipline of writing your own detection rules is the training your team actually needs.",
      "The best SOCs we've studied ran for their first months on a small analyst team, a rules repository in Git, and a weekly purple-team hour.",
    ],
  },
  {
    slug: "portfolio-that-gets-you-hired",
    title: "The portfolio that gets you hired",
    excerpt: "Four case studies beat forty screenshots. A structure you can copy this week.",
    category: "Career",
    author: "Cyber Elias Academy",
    role: "Team CEA",
    date: "2026-06-11",
    readingTime: "6 min",
    engine: "career" as Engine,
    body: [
      "Hiring managers spend roughly ninety seconds on a portfolio before deciding whether to read further. That budget should be spent on outcomes, not on process diagrams.",
      "Lead every case study with the result. Then the constraint. Then the two decisions you made that a weaker candidate would not have made. Everything else is an appendix.",
      "Four deep case studies outperform a gallery every time, because depth is the thing that cannot be faked.",
    ],
  },
  {
    slug: "why-we-are-building-cea-os",
    title: "Why we're building CEA-OS instead of buying an LMS",
    excerpt:
      "Admissions, learning, finance and careers are four disconnected systems in the typical institution. CEA-OS is being built to make them one.",
    category: "Product",
    author: "Cyber Elias Academy",
    role: "Team CEA",
    date: "2026-05-24",
    readingTime: "9 min",
    engine: "erp" as Engine,
    body: [
      "Every off-the-shelf LMS we evaluated treats a learner as a row in a course table. Our learners are applicants, then students, then alumni, then mentors, then sometimes clients.",
      "Modelling that lifecycle in one system means a mentor can see a mentee's actual attendance, and an admissions officer can see which channel produced graduates rather than just applications.",
      "That's the design brief CEA-OS is being built against: five engines, one identity, one permission model.",
    ],
  },
  {
    slug: "cohort-vs-self-paced",
    title: "Cohort or self-paced: an honest comparison",
    excerpt: "Completion rates tell one story. Career outcomes tell a more complicated one.",
    category: "Learning",
    author: "Cyber Elias Academy",
    role: "Team CEA",
    date: "2026-05-02",
    readingTime: "7 min",
    engine: "learning" as Engine,
    body: [
      "Cohort programmes typically see far higher completion rates than self-paced ones — the gap is real and it is mostly about accountability.",
      "But learners who do finish self-paced tracks often land similar outcomes. The answer is not one format — it is a placement engine that both formats feed into. That is the design we're building.",
    ],
  },
  {
    slug: "hiring-junior-engineers",
    title: "How to interview a junior engineer properly",
    excerpt:
      "Whiteboard puzzles select for practice, not potential. Try these three tasks instead.",
    category: "Employers",
    author: "Cyber Elias Academy",
    role: "Team CEA",
    date: "2026-04-19",
    readingTime: "5 min",
    engine: "career" as Engine,
    body: [
      "Give the candidate a small, broken codebase and one hour. What they choose to fix first tells you more than any algorithm question.",
      "Follow with a code reading exercise, then a short design conversation about a system they have actually built.",
    ],
  },
];

export const jobs: {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  level: string;
  posted: string;
  skills: string[];
}[] = [
  {
    id: "j-soc-1",
    title: "Security Operations Analyst",
    company: "Novon Energy",
    location: "Port Harcourt · Hybrid",
    type: "Full-time",
    salary: "₦650k–₦900k/mo",
    level: "Mid",
    posted: "Posted Aug 2, 2026",
    skills: ["SOC", "SIEM", "Incident response"],
  },
  {
    id: "j-fe-1",
    title: "Frontend Engineer (React)",
    company: "Kudia Fintech",
    location: "Lagos · Remote",
    type: "Full-time",
    salary: "₦1.2m–₦1.8m/mo",
    level: "Mid",
    posted: "Posted Jul 30, 2026",
    skills: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: "j-be-1",
    title: "Backend Engineer Intern",
    company: "Greenfield Schools",
    location: "Abuja · On-site",
    type: "Internship",
    salary: "₦150k/mo stipend",
    level: "Entry",
    posted: "Posted Jul 29, 2026",
    skills: ["Node.js", "SQL", "APIs"],
  },
  {
    id: "j-pd-1",
    title: "Product Designer",
    company: "Horizon Microfinance",
    location: "Port Harcourt · Remote",
    type: "Full-time",
    salary: "₦800k–₦1.1m/mo",
    level: "Mid",
    posted: "Posted Jul 26, 2026",
    skills: ["Figma", "Design systems", "Usability testing"],
  },
  {
    id: "j-soc-2",
    title: "Junior SOC Analyst",
    company: "Accellion Telecoms",
    location: "Lagos · Hybrid",
    type: "Full-time",
    salary: "₦380k–₦520k/mo",
    level: "Entry",
    posted: "Posted Jul 24, 2026",
    skills: ["SOC", "EDR", "Log analysis"],
  },
  {
    id: "j-gov-1",
    title: "Resident Engineer — GovTech",
    company: "Kaduna State ICT",
    location: "Kaduna · On-site",
    type: "Contract",
    salary: "₦900k/mo",
    level: "Senior",
    posted: "Posted Jul 20, 2026",
    skills: ["Cloud", "Data pipelines", "Procurement"],
  },
];

export const gigs: {
  id: string;
  title: string;
  budget: string;
  duration: string;
  skills: string[];
  proposals: number;
}[] = [
  {
    id: "g-lp-1",
    title: "Rebuild landing page for a fintech",
    budget: "₦850k",
    duration: "3 weeks",
    skills: ["React", "Tailwind", "Content"],
    proposals: 9,
  },
  {
    id: "g-sec-1",
    title: "Web security audit → report",
    budget: "₦640k",
    duration: "2 weeks",
    skills: ["Pen testing", "OWASP", "Reporting"],
    proposals: 6,
  },
  {
    id: "g-pay-1",
    title: "Set up payroll automation on CEA-OS",
    budget: "₦420k",
    duration: "5 days",
    skills: ["CEA-OS", "Finance ops", "Spreadsheets"],
    proposals: 12,
  },
  {
    id: "g-camp-1",
    title: "Awareness campaign for a primary school",
    budget: "₦380k",
    duration: "1 month",
    skills: ["Motion graphics", "Copywriting"],
    proposals: 7,
  },
  {
    id: "g-data-1",
    title: "Enrolment data pipeline",
    budget: "₦1.1m",
    duration: "4 weeks",
    skills: ["Python", "SQL", "Warehousing"],
    proposals: 4,
  },
];

export const faqs = [
  {
    q: "Do I need any prior experience?",
    a: "No. Our beginner tracks assume zero technical background and start from computer fundamentals. Intermediate and advanced tracks list their prerequisites on the program page.",
  },
  {
    q: "Can I study while working full time?",
    a: "Yes. Every program runs weekday-evening and weekend streams, and all live sessions are recorded and available in your dashboard within two hours.",
  },
  {
    q: "Is there a payment plan?",
    a: "Tuition can be split across the duration of the program, and income-share options are available for selected tracks after an eligibility review.",
  },
  {
    q: "What happens after I graduate?",
    a: "You join the Career Engine: portfolio review, mentor matching, interview preparation and access to our employer network and freelance marketplace.",
  },
  {
    q: "Are the certificates verifiable?",
    a: "Every certificate carries a unique verification code that any employer can check on our public verification page.",
  },
  {
    q: "Do you offer corporate training?",
    a: "Yes. We design custom cohorts for teams, from a two-day workshop to a six-month capability programme with competency tracking.",
  },
];

export const pricingTiers = [
  {
    name: "Foundation",
    price: 480000,
    period: "per program",
    blurb: "Short tracks to get you employable fast.",
    features: [
      "1 program of your choice",
      "Live weekly sessions",
      "Graded assignments",
      "Verifiable certificate",
      "Community access",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: 890000,
    period: "per program",
    blurb: "Our flagship cohort experience with career support.",
    features: [
      "Everything in Foundation",
      "1:1 mentor matching",
      "Capstone with a real client brief",
      "Portfolio studio",
      "Career Engine & employer network",
      "Lifetime alumni access",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 0,
    period: "custom",
    blurb: "Train a whole team on your terms.",
    features: [
      "Custom curriculum design",
      "Dedicated cohort & instructor",
      "Competency tracking dashboard",
      "On-site or private virtual delivery",
      "Quarterly impact reporting",
    ],
    highlighted: false,
  },
];

export function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}
