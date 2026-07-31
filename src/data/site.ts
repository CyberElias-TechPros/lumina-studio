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
    mode: "Hybrid · Lagos + Online",
    price: 850000,
    rating: 4.9,
    learners: 1842,
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
    mode: "Hybrid · Lagos + Online",
    price: 920000,
    rating: 4.8,
    learners: 1120,
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
    rating: 4.8,
    learners: 964,
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
    mode: "Hybrid · Lagos + Online",
    price: 980000,
    rating: 4.9,
    learners: 1388,
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
    mode: "Hybrid · Lagos + Online",
    price: 640000,
    rating: 4.7,
    learners: 1526,
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
    rating: 4.7,
    learners: 2104,
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
    mode: "On-campus · Lagos",
    price: 520000,
    rating: 4.6,
    learners: 878,
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
    rating: 4.7,
    learners: 742,
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

export const caseStudies = [
  {
    slug: "sabi-logistics-platform",
    client: "Sabi Logistics",
    title: "A dispatch platform that cut delivery time by 38%",
    sector: "Logistics",
    engine: "services" as Engine,
    result: "38% faster deliveries",
    summary:
      "We rebuilt Sabi's dispatch operations around a realtime routing engine and a driver mobile app.",
    metrics: [
      { label: "Delivery time", value: "-38%" },
      { label: "Driver adoption", value: "94%" },
      { label: "Build time", value: "14 weeks" },
    ],
  },
  {
    slug: "arewa-microfinance-security",
    client: "Arewa Microfinance",
    title: "Zero-incident year after a full security overhaul",
    sector: "Financial Services",
    engine: "erp" as Engine,
    result: "0 breaches in 12 months",
    summary:
      "A red-team engagement, network segmentation programme and a trained internal SOC team.",
    metrics: [
      { label: "Critical findings closed", value: "41" },
      { label: "MTTR", value: "-62%" },
      { label: "Staff trained", value: "180" },
    ],
  },
  {
    slug: "greenfield-schools-erp",
    client: "Greenfield Schools",
    title: "One operating system for 9 campuses",
    sector: "Education",
    engine: "erp" as Engine,
    result: "9 campuses unified",
    summary:
      "Admissions, finance, HR and academics unified into a single multi-tenant platform.",
    metrics: [
      { label: "Manual hours saved", value: "1,400/mo" },
      { label: "Fee collection", value: "+27%" },
      { label: "Rollout", value: "5 months" },
    ],
  },
  {
    slug: "kaduna-talent-pipeline",
    client: "Kaduna State ICT",
    title: "Training 2,000 young Nigerians into tech roles",
    sector: "Public Sector",
    engine: "career" as Engine,
    result: "71% placement rate",
    summary:
      "A state-wide digital skills programme with employer partnerships and job placement tracking.",
    metrics: [
      { label: "Graduates", value: "2,043" },
      { label: "Placed", value: "71%" },
      { label: "Employers", value: "86" },
    ],
  },
];

export const stats = [
  { label: "Graduates trained", value: 12480, suffix: "+" },
  { label: "Job placement rate", value: 78, suffix: "%" },
  { label: "Hiring partners", value: 240, suffix: "+" },
  { label: "Learner satisfaction", value: 4.9, suffix: "/5", decimals: 1 },
];

export const partnersList = [
  "Andela",
  "Flutterwave",
  "Paystack",
  "MTN Nigeria",
  "Interswitch",
  "Microsoft ADC",
  "Cisco Networking Academy",
  "AWS Academy",
  "Google Africa",
  "Kuda",
];

export const testimonials = [
  {
    name: "Chiamaka Obi",
    role: "Frontend Engineer, Paystack",
    quote:
      "I came in with zero code. Fourteen months later I was shipping to production at one of Africa's best engineering teams.",
    program: "Full-Stack Software Development",
  },
  {
    name: "Tunde Adeyemi",
    role: "SOC Analyst, Interswitch",
    quote:
      "The SOC simulation was harder than my actual interview. That's exactly why I passed it.",
    program: "Cybersecurity Analyst",
  },
  {
    name: "Halima Yusuf",
    role: "Product Designer, Freelance",
    quote:
      "The portfolio studio changed everything — I left with four case studies and three client offers.",
    program: "Product & UI/UX Design",
  },
  {
    name: "Emeka Nwosu",
    role: "Cloud Engineer, Andela",
    quote:
      "Mentors who actually work in the field. That feedback loop is the whole product.",
    program: "Cloud Engineering & DevOps",
  },
];

export const events = [
  {
    slug: "lagos-tech-open-day",
    title: "Lagos Campus Open Day",
    date: "2026-08-15",
    time: "10:00 – 15:00 WAT",
    type: "On-campus",
    location: "Cyber Elias Academy, Ikeja, Lagos",
    engine: "community" as Engine,
    blurb: "Tour the labs, meet instructors and sit in on a live cohort session.",
  },
  {
    slug: "ai-builders-night",
    title: "AI Builders Night",
    date: "2026-08-27",
    time: "18:00 – 21:00 WAT",
    type: "Hybrid",
    location: "Lagos + Livestream",
    engine: "learning" as Engine,
    blurb: "Five teams demo agentic AI products built in eight weeks.",
  },
  {
    slug: "career-fair-q3",
    title: "Q3 Employer Career Fair",
    date: "2026-09-12",
    time: "09:00 – 17:00 WAT",
    type: "On-campus",
    location: "Landmark Centre, Lagos",
    engine: "career" as Engine,
    blurb: "60+ hiring partners interviewing graduating cohorts on the day.",
  },
  {
    slug: "alumni-summit",
    title: "Alumni Summit 2026",
    date: "2026-10-04",
    time: "11:00 – 20:00 WAT",
    type: "On-campus",
    location: "Eko Hotel, Lagos",
    engine: "community" as Engine,
    blurb: "The whole network in one room — talks, awards and the alumni fund announcement.",
  },
  {
    slug: "cloud-cost-clinic",
    title: "Cloud Cost Clinic for CTOs",
    date: "2026-10-22",
    time: "16:00 – 18:00 WAT",
    type: "Online",
    location: "Zoom",
    engine: "erp" as Engine,
    blurb: "Bring your bill. Leave with a plan to cut it.",
  },
  {
    slug: "design-systems-workshop",
    title: "Design Systems Workshop",
    date: "2026-11-08",
    time: "10:00 – 16:00 WAT",
    type: "Hybrid",
    location: "Lagos + Livestream",
    engine: "services" as Engine,
    blurb: "Build a production design system from tokens to documentation in one day.",
  },
];

export const blogPosts = [
  {
    slug: "nigeria-tech-talent-2026",
    title: "The state of Nigerian tech talent in 2026",
    excerpt:
      "Hiring has shifted from raw headcount to verified capability. Here's what employers now screen for.",
    category: "Industry",
    author: "Elias Okonkwo",
    role: "Founder & Director",
    date: "2026-07-18",
    readingTime: "8 min",
    engine: "career" as Engine,
    body: [
      "Two years ago, the fastest route into a Nigerian engineering team was a bootcamp certificate and enthusiasm. That door has narrowed. Employers now open with a portfolio review and a paid trial task.",
      "What changed is not the supply of talent — it is the cost of verifying it. AI-assisted applications made resumes cheap to produce and expensive to trust. The signal moved to artifacts: shipped products, code you can read, incident write-ups, design case studies with measured outcomes.",
      "This is why every CEA program ends in a capstone that is graded by a working practitioner rather than an internal rubric. The output is not a grade. It is evidence.",
      "For learners the implication is simple: optimise for the artifact, not the certificate. For employers: your interview loop should start where the artifact ends.",
    ],
  },
  {
    slug: "building-a-soc-on-a-budget",
    title: "Building a SOC on a Nigerian budget",
    excerpt:
      "You do not need a seven-figure SIEM licence to get real detection coverage. Start here.",
    category: "Cybersecurity",
    author: "Ngozi Bello",
    role: "Head of Cybersecurity",
    date: "2026-06-30",
    readingTime: "11 min",
    engine: "learning" as Engine,
    body: [
      "Most security programmes in mid-sized Nigerian firms fail for the same reason: they buy tooling before they define detections.",
      "Start with an asset inventory and the ten attack techniques most likely to touch your environment. Map each to a log source you already have. In practice this is Windows event logs, firewall logs, and your identity provider.",
      "Only then choose a platform. Open-source Elastic will carry you a long way at this stage, and the discipline of writing your own detection rules is the training your team actually needs.",
      "The best SOC we ever helped stand up ran for its first nine months on three analysts, a rules repository in Git, and a weekly purple-team hour.",
    ],
  },
  {
    slug: "portfolio-that-gets-you-hired",
    title: "The portfolio that gets you hired",
    excerpt: "Four case studies beat forty screenshots. A structure you can copy this week.",
    category: "Career",
    author: "Halima Yusuf",
    role: "Design Mentor",
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
    slug: "why-we-built-cea-os",
    title: "Why we built CEA-OS instead of buying an LMS",
    excerpt:
      "Admissions, learning, finance and careers were four disconnected systems. Now they are one.",
    category: "Product",
    author: "Elias Okonkwo",
    role: "Founder & Director",
    date: "2026-05-24",
    readingTime: "9 min",
    engine: "erp" as Engine,
    body: [
      "Every off-the-shelf LMS we evaluated treated a learner as a row in a course table. Our learners are applicants, then students, then alumni, then mentors, then sometimes clients.",
      "Modelling that lifecycle in one system means a mentor can see a mentee's actual attendance, and an admissions officer can see which channel produced graduates rather than just applications.",
      "CEA-OS is the result: five engines, one identity, one permission model.",
    ],
  },
  {
    slug: "cohort-vs-self-paced",
    title: "Cohort or self-paced: an honest comparison",
    excerpt: "Completion rates tell one story. Career outcomes tell a more complicated one.",
    category: "Learning",
    author: "Ifeanyi Duru",
    role: "Head of Learning",
    date: "2026-05-02",
    readingTime: "7 min",
    engine: "learning" as Engine,
    body: [
      "Our cohort completion rate is 81%. Our self-paced completion rate is 34%. That gap is real and it is mostly about accountability.",
      "But self-paced learners who do finish place at a similar rate, and they cost a third as much to serve. The answer is not one format — it is a placement engine that both formats feed into.",
    ],
  },
  {
    slug: "hiring-junior-engineers",
    title: "How to interview a junior engineer properly",
    excerpt: "Whiteboard puzzles select for practice, not potential. Try these three tasks instead.",
    category: "Employers",
    author: "Emeka Nwosu",
    role: "Employer Partnerships",
    date: "2026-04-19",
    readingTime: "5 min",
    engine: "career" as Engine,
    body: [
      "Give the candidate a small, broken codebase and one hour. What they choose to fix first tells you more than any algorithm question.",
      "Follow with a code reading exercise, then a short design conversation about a system they have actually built.",
    ],
  },
];

export const jobs = [
  {
    id: "job-1",
    title: "Frontend Engineer",
    company: "Paystack",
    location: "Lagos · Hybrid",
    type: "Full-time",
    salary: "₦9m – ₦14m",
    level: "Mid",
    posted: "2 days ago",
    skills: ["React", "TypeScript", "CSS"],
  },
  {
    id: "job-2",
    title: "SOC Analyst (Tier 1)",
    company: "Interswitch",
    location: "Lagos · On-site",
    type: "Full-time",
    salary: "₦6m – ₦9m",
    level: "Junior",
    posted: "4 days ago",
    skills: ["SIEM", "Incident Response", "Linux"],
  },
  {
    id: "job-3",
    title: "Cloud Engineer",
    company: "Kuda",
    location: "Remote (Nigeria)",
    type: "Full-time",
    salary: "₦12m – ₦18m",
    level: "Senior",
    posted: "1 week ago",
    skills: ["AWS", "Terraform", "Kubernetes"],
  },
  {
    id: "job-4",
    title: "Product Designer",
    company: "Moniepoint",
    location: "Lagos · Hybrid",
    type: "Full-time",
    salary: "₦8m – ₦12m",
    level: "Mid",
    posted: "1 week ago",
    skills: ["Figma", "Design Systems", "Research"],
  },
  {
    id: "job-5",
    title: "Data Analyst",
    company: "MTN Nigeria",
    location: "Lagos · On-site",
    type: "Full-time",
    salary: "₦7m – ₦10m",
    level: "Junior",
    posted: "3 days ago",
    skills: ["SQL", "Python", "Power BI"],
  },
  {
    id: "job-6",
    title: "IT Support Specialist",
    company: "Greenfield Schools",
    location: "Abuja · On-site",
    type: "Full-time",
    salary: "₦4m – ₦6m",
    level: "Junior",
    posted: "5 days ago",
    skills: ["Windows", "Networking", "Helpdesk"],
  },
];

export const gigs = [
  {
    id: "gig-1",
    title: "Landing page for a fintech launch",
    budget: "₦450,000",
    duration: "2 weeks",
    skills: ["React", "Tailwind", "Framer Motion"],
    proposals: 12,
  },
  {
    id: "gig-2",
    title: "Security review of a Node API",
    budget: "₦680,000",
    duration: "10 days",
    skills: ["AppSec", "Node.js", "OWASP"],
    proposals: 7,
  },
  {
    id: "gig-3",
    title: "Brand identity for an agritech startup",
    budget: "₦520,000",
    duration: "3 weeks",
    skills: ["Branding", "Illustration", "Figma"],
    proposals: 19,
  },
  {
    id: "gig-4",
    title: "Power BI dashboard for retail chain",
    budget: "₦380,000",
    duration: "12 days",
    skills: ["Power BI", "SQL", "DAX"],
    proposals: 9,
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

export const team = [
  { name: "Elias Okonkwo", role: "Founder & Director", focus: "Strategy" },
  { name: "Ifeanyi Duru", role: "Head of Learning", focus: "Curriculum" },
  { name: "Ngozi Bello", role: "Head of Cybersecurity", focus: "Security" },
  { name: "Halima Yusuf", role: "Design Lead", focus: "Design" },
  { name: "Emeka Nwosu", role: "Employer Partnerships", focus: "Careers" },
  { name: "Aisha Bakare", role: "Head of Operations", focus: "Operations" },
];

export const timeline = [
  { year: "2018", title: "A single classroom in Ikeja", body: "Twelve students, one instructor, one whiteboard." },
  { year: "2020", title: "Online delivery at scale", body: "Remote cohorts opened the academy to all 36 states." },
  { year: "2022", title: "The Services Engine", body: "Graduates began delivering real client work under supervision." },
  { year: "2024", title: "Employer network crosses 200", body: "Placement became a measured, managed pipeline." },
  { year: "2026", title: "CEA-OS goes live", body: "One operating system for every actor in the academy." },
];

export function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}
