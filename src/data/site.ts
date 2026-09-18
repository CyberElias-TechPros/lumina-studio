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
  about: string[];
  outcomes: string[];
  modules: { title: string; lessons: number; hours: number }[];
  tools: string[];
  faqs: { q: string; a: string }[];
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
    about: [
      "This is our flagship track for people who want to build software for a living. Over nine months you move from writing your first lines of JavaScript to deploying full-stack applications with authentication, databases, payments and CI/CD — the complete skill set Nigerian product teams actually interview for. The stack (TypeScript, React, Node.js, PostgreSQL) is deliberately mainstream: it dominates local job adverts, global remote roles and the open-source ecosystem you will rely on professionally.",
      "The programme is project-driven from week one. Every module ends in something deployed: a personal site, an interactive frontend, a REST API with real data, a containerised service behind automated deployments. By mid-programme you are working in small agile teams on briefs modelled on real client work — standups, code review, sprint planning — because those collaboration habits are what separate employees from tutorial-followers in employers' eyes.",
      "The final third is your capstone: a substantial client-style project scoped, built, tested and presented to a panel of working engineers. Past capstones have included logistics tracking dashboards, school management systems and fintech payment flows. You leave with six deployed projects, a polished portfolio, interview preparation, and access to CEA's employer network through the Career Engine.",
    ],
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
    faqs: [
      {
        q: "Do I need prior coding experience to join?",
        a: "No. The Programming Foundations module assumes zero experience and runs at a deliberate pace. What we do assess at admission is commitment: this is an intensive nine-month programme, and successful students protect 15–20 hours weekly for it.",
      },
      {
        q: "How much time should I plan per week?",
        a: "Plan for 15–20 hours: live sessions, lab work and project time combined. Hybrid delivery means evening and weekend sessions from the Port Harcourt campus or online, so full-time workers complete this track successfully every cohort.",
      },
      {
        q: "Can I pay tuition in instalments?",
        a: "Yes. Fees are split into monthly instalments at no extra cost, and selected applicants qualify for Income Share Agreement options where you defer part of tuition until after employment. Talk to admissions during your interview about what fits your situation.",
      },
      {
        q: "What happens after graduation?",
        a: "You keep access to the Career Engine: the jobs marketplace, employer introductions, gig board and alumni community. Capstone projects are shared with hiring partners, and our team reviews your portfolio and runs mock interviews before you start applying.",
      },
      {
        q: "Will this prepare me for remote international roles?",
        a: "The stack and practices (Git-based teamwork, code review, English-language documentation) match global expectations, and several graduates now work remotely. We coach specifically on remote-ready habits: written communication, async updates and timezone management.",
      },
    ],
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
    about: [
      "Nigeria's cybersecurity job market is growing faster than its talent pool: NDPA enforcement, CBN's risk-based cybersecurity framework for financial institutions, and a wave of ransomware and business email compromise have made security hires non-negotiable for banks, telcos, fintechs and energy companies. This seven-month track trains you into that gap with genuinely practical blue-team skills rather than certification-exam trivia.",
      "You learn by defending real infrastructure. The programme runs its own lab environment — Windows and Linux endpoints, a simulated corporate network, deliberately vulnerable services — where you configure logging, write detection rules in a SIEM, investigate alerts, and run full incident response exercises including forensic triage. Every technique maps to MITRE ATT&CK so you learn the industry vocabulary employers use.",
      "The curriculum covers the working analyst's day: monitoring queues, triaging alerts, escalating genuine incidents, writing reports stakeholders can act on, and hardening systems so incidents do not recur. Later modules add governance, risk and compliance — the NDPA obligations, ISO 270001 concepts and audit support work that mid-level roles demand. The capstone is a multi-day SOC simulation: you run shifts against a live attack scenario, then defend your detection coverage and decisions to practising security leads.",
    ],
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
    faqs: [
      {
        q: "Is this track beginner-friendly?",
        a: "It is marked Intermediate because basic IT literacy helps — comfort with operating systems, networking concepts and the command line. If you are starting from zero, our Networking & IT Support track is the recommended on-ramp, and many students take both back to back.",
      },
      {
        q: "Does the programme include certification prep?",
        a: "Yes. The curriculum aligns with CompTIA Security+ and Blue Team Level 1 objectives, and dedicated revision sessions run in the final module. Exam fees are not included in tuition; we advise on scheduling and many students sit these exams within two months of graduating.",
      },
      {
        q: "What equipment do I need?",
        a: "A laptop with at least 8GB RAM (16GB preferred) capable of running virtual machines. Lab environments are cloud-hosted so heavy workloads do not depend on your hardware. Reliable internet is required for live sessions.",
      },
      {
        q: "What roles do graduates step into?",
        a: "SOC analyst (tier 1), security analyst, incident response support, GRC analyst and IT security officer roles. Nigerian banks, telcos and fintechs hire continuously for these titles, and our careers team connects graduates to employers in the CEA network.",
      },
      {
        q: "How hands-on is it really?",
        a: "Roughly 70% of contact hours are lab or simulation work. You will write detection rules that fire against real attack traffic, investigate staged incidents end to end, and present findings — not watch slides about doing so.",
      },
    ],
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
    about: [
      "Cloud engineering is the infrastructure backbone of modern software, and Nigerian companies are hiring for it aggressively as they migrate from on-premise servers — banks moving core systems, telcos re-architecting billing platforms, startups building on AWS from day one. This eight-month online track takes you from Linux fundamentals to operating containerised production platforms with the automation practices that distinguish cloud engineers from server administrators.",
      "The learning arc is deliberate. You start with Linux administration and networking because every cloud service abstracts these foundations and debugging requires understanding what is underneath. Cloud architecture follows: compute, storage, networking, IAM and cost management on AWS, taught through scenarios like designing a highly available architecture for a Nigerian fintech within a realistic budget. Then containers and Kubernetes — where most of the industry's complexity and most of its salaries live — followed by infrastructure as code with Terraform, CI/CD pipelines, GitOps delivery with ArgoCD, and observability with Prometheus and Grafana.",
      "Everything is assessed through doing. You build environments, break them on purpose, restore them, write post-incident reviews, and finish with an SRE capstone: operate a small production platform end to end — deploy releases, define SLOs, respond to injected incidents, manage costs — while documenting decisions the way a real platform team would. Graduates leave with a portfolio of infrastructure code on GitHub, not screenshots of consoles.",
    ],
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
    faqs: [
      {
        q: "Do I need AWS certification exam prep included?",
        a: "The curriculum covers the objective domains of AWS Solutions Architect Associate, and we advise on exam scheduling — but our focus is operational competence over exam drilling. Graduates typically pass the certification comfortably after building real systems; the reverse order rarely works.",
      },
      {
        q: "Is this track fully online?",
        a: "Yes. All live sessions run online with recordings available within two hours, and labs use cloud environments you can reach from anywhere. Office hours and mentor sessions give you the accountability of a cohort without requiring campus attendance.",
      },
      {
        q: "How much do cloud accounts cost during the programme?",
        a: "We provide lab environments through the academy's accounts for structured exercises. For personal projects you use AWS free tier plus a modest personal budget (typically ₦10,000–₦25,000 across the programme), and we teach cost monitoring early so surprises never happen.",
      },
      {
        q: "What background do I need?",
        a: "Comfort with computers beyond casual use — file systems, installing software, basic troubleshooting. Prior scripting or IT support experience accelerates you but is not required; the Linux & Networking Core module brings motivated beginners up to speed.",
      },
      {
        q: "What salary should I expect after graduating?",
        a: "Entry cloud/DevOps roles in Nigeria commonly start around ₦300,000–₦600,000 monthly at local companies, rising quickly with production experience; remote international roles pay multiples of that. We prepare you for both markets.",
      },
    ],
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
    about: [
      "Every Nigerian industry now drowns in data it cannot use: banks with millions of transactions, telcos with call records, hospitals with patient files, retailers with point-of-sale history. This nine-month track trains you to turn that raw material into decisions — and unlike most data programmes, it goes beyond notebooks into production: deploying, monitoring and maintaining models where real users depend on them.",
      "The first third builds genuine foundations — Python, statistics, probability and the unglamorous craft of data wrangling, because 70% of real data work is cleaning inconsistent, incomplete records. Machine learning follows with classical algorithms taught properly (regression, trees, ensembles, evaluation) before deep learning with PyTorch. Then the applied AI module covers what the market is actually hiring for right now: working with large language models, building retrieval-augmented generation pipelines, prompt engineering, agents, and evaluating AI systems honestly.",
      "The distinguishing final third is MLOps and your capstone. You version datasets and models, track experiments with MLflow, deploy a model behind an API, set up monitoring for drift, and ship a complete end-to-end product — past capstones include credit-scoring prototypes, churn prediction for telecom data and document-intelligence tools for Nigerian-language text. You present to a panel of practising data scientists and leave with proof you can carry ML from idea to production, which is precisely what separates hired candidates from certificate holders.",
    ],
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
    faqs: [
      {
        q: "Do I need a mathematics background?",
        a: "Mathematical thinking helps — comfort with reasoning, numbers and logic is essential. The Statistics module covers what you need from linear algebra, probability and calculus at a working level; a degree in mathematics is not required but genuine comfort with quantitative reasoning is.",
      },
      {
        q: "What is the difference between this and the analytics track?",
        a: "Analytics (available standalone) covers SQL, Excel and Power BI — the skills for immediate business analysis roles. Data Science adds Python programming, machine learning, deep learning, LLMs and MLOps — preparing you for analyst, ML engineer and data science roles. Many students do analytics first and continue into data science.",
      },
      {
        q: "Will I have GPU access for deep learning work?",
        a: "Yes. Structured exercises run on cloud GPU instances provided through the academy, and we teach cost-efficient cloud workflows so students are comfortable managing real compute budgets.",
      },
      {
        q: "How much Python do I need to know before starting?",
        a: "Zero. The Python & Statistics module assumes no programming experience and moves methodically. What matters is willingness to practise daily; technical skill comes from repetition, not prior knowledge.",
      },
      {
        q: "Are there roles specific to the AI/LLM part of the curriculum?",
        a: "AI engineer, ML engineer and applied AI roles are growing fast locally and remotely. The capstone portfolio — deployed models, RAG systems, production monitoring — is exactly what these roles interview around, and we coach specifically on presenting technical work to hiring managers.",
      },
    ],
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
      "Research, systems thinking and interface craft - design products people actually finish using.",
    about: [
      "Product design is one of the few tech careers where your portfolio speaks louder than your degree — and one of the most misunderstood. This six-month track teaches design as a discipline of evidence: understanding users through research, translating findings into decisions, and crafting interfaces with the polish that separates professional work from tutorials. Nigerian fintechs, health startups and agencies hire continuously for these skills, and remote design roles are among the most accessible international opportunities.",
      "You begin with foundations — visual hierarchy, typography, colour, layout — because taste can be trained and employers can tell. UX research follows: planning studies, interviewing users (including real sessions with people outside your bubble), synthesising findings into insights, and mapping journeys. The interface module is the heart of the programme: building components and a coherent design system in Figma, designing for accessibility, handling edge cases and error states, and understanding how engineers implement what you draw.",
      "Prototyping and testing turn static screens into validated flows — you will run usability tests, watch real users struggle with your designs, and iterate. The programme closes with Portfolio Studio: every project you produced gets refined into case studies that present your process and outcomes the way hiring managers actually read them, followed by presentation coaching and mock design critiques. You leave able to defend every decision on every screen — which is precisely what design interviews test.",
    ],
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
    faqs: [
      {
        q: "Do I need drawing skills or an art background?",
        a: "No. Product design is problem-solving with visual tools, not illustration. If you can arrange a shop display, plan a party or explain an idea clearly to someone, you have the raw material — we train the rest systematically.",
      },
      {
        q: "What equipment and software do I need?",
        a: "A laptop (8GB RAM minimum) that runs Figma comfortably, and a reliable internet connection. Figma's core tools are free for individual use; every tool in the curriculum has a free tier adequate for learning.",
      },
      {
        q: "Will my portfolio be ready for job applications?",
        a: "That is the explicit goal of Portfolio Studio. You graduate with three to four polished case studies covering research, systems thinking and interface craft — presented in the format hiring managers at Nigerian startups and agencies expect.",
      },
      {
        q: "How does this differ from graphic design courses?",
        a: "Graphic design produces visuals; product design produces usable software informed by research. This track covers visual craft as one module among five — the differentiating skills are research, interaction design, design systems and working within product teams.",
      },
      {
        q: "Can I freelance while studying?",
        a: "Many students do — small business branding and landing-page projects are realistic from module three onward. The programme teaches enough client-facing practice that supervised early freelancing reinforces rather than derails your studies.",
      },
    ],
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
    about: [
      "Digital marketing is the most immediately employable tech-adjacent skill in Nigeria: every business needs customers, and someone who can reliably acquire them profitably writes their own ticket. This five-month online track teaches marketing as a numbers discipline — campaigns with budgets, funnels with conversion rates, content with distribution strategy — rather than the posting-and-praying approach that wastes so many businesses' money.",
      "Paid acquisition is the core skill: planning, launching and optimising Meta and Google campaigns against real objectives, taught with live ad accounts and actual budgets (included in tuition) so you feel what a wasted ₦20,000 teaches before your employer trusts you with theirs. Content and SEO modules cover building compounding organic channels — keyword research, editorial planning, repurposing across formats. Funnels and conversion rate optimisation teach you to diagnose where prospects drop off and fix it, using landing pages, A/B tests and analytics.",
      "Everything reports upward in business language: customer acquisition cost, lifetime value, payback period, channel-level return on spend. Your capstone is a complete growth plan for a real Nigerian business — research, channel strategy, budget allocation, campaign assets and projected unit economics — defended before practising marketers. Graduates leave able to say not just 'I run ads' but 'I acquired customers at ₦X each who were worth ₦Y', which is the sentence that gets marketers hired.",
    ],
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
    faqs: [
      {
        q: "Is the ad spend for campaigns included in tuition?",
        a: "Yes — a live campaign budget is included so you run real campaigns with real stakes during the Paid Acquisition module. There is no substitute for spending actual money and being accountable for results.",
      },
      {
        q: "I already run social media for a business. Will this be too basic?",
        a: "The Marketing Fundamentals module will feel familiar, but most self-taught marketers discover their gaps in paid acquisition economics, measurement and CRO. If you can already explain your CAC and payback period by channel, talk to admissions about advanced placement.",
      },
      {
        q: "What roles does this prepare me for?",
        a: "Performance marketer, digital marketing executive, growth associate, SEO specialist and social/ads manager roles — in-house at Nigerian companies or agency-side, plus freelance client work. The capstone doubles as your first case study.",
      },
      {
        q: "How technical is the analytics content?",
        a: "Comfortably practical rather than engineering-level: GA4 configuration, UTM discipline, spreadsheet modelling and dashboard building. No coding required, though we show you where SQL would extend your career.",
      },
      {
        q: "Can I study while working full-time?",
        a: "Yes — the track is designed for it. Live sessions run evenings and weekends online with recordings, and weekly workload is calibrated around 10–12 hours.",
      },
    ],
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
      "Hands-on hardware, routing, switching and enterprise support - the fastest route into tech employment.",
    about: [
      "Every office, school, hospital, bank branch and hotel in Nigeria runs on networks that break — and someone gets paid to fix them. Networking and IT support remains the fastest route from zero to employed in tech: entry requirements are lower than software roles, demand exists in every city, and the skills compound into cybersecurity, cloud and systems administration careers. This six-month on-campus track teaches the physical, hands-on craft that online-only courses cannot.",
      "You work with real equipment from week one: disassembling and assembling machines, crimping and testing cables, configuring routers and switches in our lab racks. The curriculum follows the working technician's world — hardware repair and operating systems, networking fundamentals (IP addressing, subnetting, protocols), routing and switching configuration with Cisco IOS and MikroTik gear, then enterprise support practices: ticketing systems, Active Directory, user management, documentation and the communication skills that separate tolerated IT staff from valued ones.",
      "The final module is a field practicum: supervised placements supporting real organisations' IT environments, because the difference between lab competence and workplace confidence is real users with real deadlines. Alongside practical skills you prepare for CompTIA A+ and CCNA certification objectives — the credentials Nigerian employers still ask for in infrastructure roles. Graduates step into IT support officer, network technician, NOC analyst and systems administrator roles, or continue into our Cybersecurity Analyst track with a strong foundation.",
    ],
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
    faqs: [
      {
        q: "Why is this track on-campus only?",
        a: "Because the skills are physical. Crimping cable, racking switches, replacing components and troubleshooting hardware require equipment and supervised practice that cannot be delivered through a screen. The Port Harcourt lab is where this programme lives.",
      },
      {
        q: "Do I need technical experience to start?",
        a: "No — it is our designated beginner on-ramp into tech. If you can use a computer, we take you from there. What we look for at admission is reliability and willingness to work with your hands as well as your head.",
      },
      {
        q: "Which certifications does the programme map to?",
        a: "CompTIA A+ objectives in the hardware module, Network+ concepts throughout networking essentials, and CCNA objectives in routing and switching. Exam fees sit outside tuition; our instructors advise on timing and many students certify within three months of finishing.",
      },
      {
        q: "What does the field practicum involve?",
        a: "Four weeks of supervised placement with partner organisations — schools, SMEs, service providers — handling real support tickets under mentorship. Placements frequently convert into job offers, and every one becomes portfolio evidence of workplace readiness.",
      },
      {
        q: "Where can this career go long-term?",
        a: "Support technician to systems administrator, network engineer, cloud engineer or security analyst — each step adds specialisation and salary. Several of our cybersecurity instructors began exactly here; infrastructure fundamentals never stop paying dividends.",
      },
    ],
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
    about: [
      "Nigeria is a mobile-first market — most users will never open your product on a desktop — and businesses everywhere need engineers who can build for the device in every pocket. This six-month online track teaches cross-platform mobile development with React Native and Expo: one TypeScript codebase shipping to both Android and iOS, which is exactly how startups and agencies in Lagos, Port Harcourt and remote teams actually ship.",
      "The programme assumes basic programming familiarity (our Full-Stack track is the recommended on-ramp if you have none) and moves fast into craft: React Native's component model and navigation, native device capabilities — camera, location, notifications, biometrics — and the discipline of building for low-end Android hardware and unreliable networks. The offline-first module is where this track differentiates: local persistence with sync strategies, conflict handling and queueing actions so your app works in airplane mode and reconciles gracefully when connectivity returns.",
      "The capstone is a real store launch: you take an app through production release end to end — Play Store and App Store accounts, signing and release pipelines, crash reporting with Sentry, analytics instrumentation, payment integration (Paystack or Flutterwave), and a staged rollout plan. You finish having published an app under your own name, which is the single most convincing artifact a mobile developer can show an employer or client.",
    ],
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
    faqs: [
      {
        q: "What should I already know before joining?",
        a: "Basic programming in any language — variables, functions, loops, and ideally some JavaScript. If you are starting from zero, complete our Full-Stack Foundations first; students who do find the mobile track's pace comfortable.",
      },
      {
        q: "Can I build for iOS without a Mac?",
        a: "Yes for learning and testing: Expo's cloud build service compiles iOS apps remotely, and we teach the workflow. Publishing to the App Store requires Apple's developer account ($99/year) which you can share costs on or defer until you have an iOS client — Android publishing alone is fully covered by the capstone.",
      },
      {
        q: "Do I need my own developer accounts?",
        a: "For the capstone, yes — a Google Play developer account (one-time $25). We walk through setup, and the fee is a genuine business expense you will carry as a professional publisher.",
      },
      {
        q: "Why React Native instead of native Android or iOS?",
        a: "One codebase shipping to both platforms is how most product teams and agencies actually work, and it makes your single skill set employable everywhere. Native specialisation remains valuable later; cross-platform is the highest-leverage first skill and matches the Nigerian job market's demand shape.",
      },
      {
        q: "Will I learn backend skills too?",
        a: "The track covers Firebase and backend-as-a-service patterns deeply enough to ship complete products, plus consuming REST APIs properly. Full backend engineering is the Full-Stack track's domain — many students take both, and they pair naturally.",
      },
    ],
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
  imageUrl?: string;
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
      "Look at what the strongest hiring teams now do differently. They ask for a GitHub link before a CV. They give candidates a small paid task — two to four hours of realistic work, compensated — instead of unpaid take-home marathons that select for desperation rather than skill. They interview around the candidate's actual work: walk me through this commit, why this architecture, what broke in production and how did you know? The interview becomes evidence-based rather than vibes-based, which is good news for anyone who can genuinely build.",
      "The AI shift cuts both ways. On one side, AI tools have made average developers dramatically more productive, so teams need fewer juniors doing mechanical work — the pure 'code monkey' entry role is shrinking everywhere. On the other side, engineers who can orchestrate AI tools, review generated code critically, and own outcomes end up more valuable than before. The lesson for entrants is not 'AI took the jobs'; it is that the floor moved: you must arrive able to use these tools responsibly, and strong fundamentals matter more precisely because generated code still needs human judgment.",
      "Remote work remains a genuine ladder, but expectations have matured. The first remote wave hired on potential; the current one hires on demonstrated reliability — people who communicate proactively across time zones, document their work, and deliver without supervision. Nigerian developers competing globally should treat written communication as a technical skill and invest in it deliberately: clear updates, honest blockers, thorough PR descriptions. The engineers earning international rates from Lagos or Port Harcourt are rarely the flashiest coders; they are the most dependable communicators.",
      "For employers reading this: the verification problem runs both directions. Candidates are verifying you too, and companies with ghost job postings, unpaid trial tasks, or months-long silent processes get filtered out in community group chats long before they realise it. Publish real salary ranges. Give feedback within two weeks. Pay for trial work. In a talent market this connected, your hiring process is public product marketing whether you planned it or not.",
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
      "Let's size that team realistically, because 'SOC' makes people imagine a room of analysts in Lagos at midnight. Start with two or three trained people covering business hours, an on-call rotation for escalations, and honest automation for the rest. One person can run a functioning detection programme for a mid-sized firm if the tooling is disciplined — what you cannot do is sustain 24/7 coverage with one hire. Managed detection providers fill the overnight gap affordably; the hybrid model (in-house detection engineering, outsourced out-of-hours triage) is where most Nigerian budgets land.",
      "On tooling costs, build a realistic ladder. Tier zero is free: Sysmon on endpoints with a sane configuration, Windows Event Forwarding into a single collector, Wazuh as your open-source SIEM, and MISP for threat intelligence feeds — total spend near zero beyond hardware. Tier one adds Elastic's free basic tier properly tuned, plus commercial email security which pays for itself immediately given how much Nigerian incident response starts with phishing. Tier two, reached only when volume demands it, is the paid SIEM conversation. Teams fail by starting at tier two; successful ones earn their way up while building the muscle each tier requires.",
      "Detection content is where your team actually compounds value. Begin with mappings that matter here: BEC patterns (impossible-travel logins to mailboxes followed by forwarding-rule creation), invoice-fraud indicators (new payee changes followed by payment), insider risk on finance systems, and lateral movement basics (Pass-the-Hash detections from event IDs 4624/4625 anomalies). Write each rule with its rationale in your repository, test it against atomic red-team techniques before deploying, and review quarterly against MITRE ATT&CK coverage gaps. Ten well-tested rules beat two hundred noisy ones — alert fatigue kills more SOC programmes than attackers do.",
      "Measure the programme honestly from week one. Mean time to detect and respond, false-positive rate per rule, coverage percentage against your chosen technique list, and hours of analyst time per investigation. These numbers do two jobs: they justify budget to management in language finance understands, and they show junior analysts their work matters — retention of trained security staff is its own crisis in this market, and people stay where progress is visible.",
      "Finally, grow your own analysts rather than importing them. The Nigerian market has far more motivated juniors than mid-level practitioners, and the gap between them closes fastest inside a working SOC: pair juniors with seniors on real investigations, fund certifications selectively after probation, and rotate people through detection engineering so knowledge never lives in one head. The firms we see running durable security programmes treated them as talent development engines first and cost centres never.",
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
      "Here is the exact structure to copy. Title each case study with the outcome: 'Cut invoice processing from 3 days to 4 hours for a Lagos distributor' — not 'Invoice Processing App'. Then three short sections. The situation: two or three sentences on who had the problem and what it cost them. Your decisions: the two or three genuine trade-off calls you made, each with the alternative you rejected and why — this is where hiring managers assess judgment, the thing interviews struggle to test. The result: numbers where you have them (users, time saved, revenue, error rates), and honest limitations ('with more time I would add offline support').",
      "Choose projects that mirror the job you want. Applying for fintech backend roles? A payments reconciliation tool with proper idempotency handling says more than another social media clone. Data roles? An end-to-end analysis of real Nigerian data — power generation figures, exchange rate movements, Jumia pricing — with your methodology written up. Frontend? Build something that handles the ugly realities: flaky networks, low-end Android devices, offline states. Recruiters pattern-match instantly; make the match effortless for them.",
      "Include one collaborative project if you possibly can, because almost every portfolio we review is solo work and teams hire team players. Contribute to an open-source project — even documentation fixes count, because they demonstrate you can navigate an unfamiliar codebase, follow conventions, and handle code review gracefully. Or build something with classmates where you can honestly describe what you owned versus what others owned; knowing the boundary of your own contribution is itself a signal of maturity.",
      "Then close the loop most candidates forget: measure your portfolio like a product. Add a simple analytics counter so you know which case studies people actually read. Ask three working engineers to critique it and fix the top complaint. Put a current 'now' section at the top saying what you are learning and building this month — staleness kills otherwise-good portfolios. And update the whole thing every quarter without exception; the market moves, and a portfolio frozen in time quietly argues that you did too.",
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
      "The practical failures we kept hitting with off-the-shelf systems were small individually and crushing together. A student pays an instalment and finance records it in one system while the learning platform still shows them as owing — so they get locked out of a lesson they paid for. An employer asks 'which of your graduates actually completed the cloud track?' and nobody can answer without exporting three CSVs. An admissions officer wants to know which marketing channel produced students who stayed past month two, not just which produced applications — impossible when the CRM, LMS and payment ledger are strangers to each other.",
      "Building rather than buying also let us make decisions that matter specifically here. Instalment-based fee tracking is a first-class concept, not a plugin. Offline-tolerant design assumes connectivity drops mid-lesson. Naira amounts, Nigerian phone formats, bank-transfer reconciliation flows — all native. Data residency and the NDPA shape architecture from day one instead of arriving as a compliance retrofit. None of these would survive a vendor's roadmap prioritisation for a global market; all of them are non-negotiable for running a school in Nigeria well.",
      "There is an honest trade-off we accept: building software is slower and more expensive than subscribing to it, especially early on. We judged it worth it because the academy itself is the product — CEA-OS encodes how admissions, grading, mentoring and placement actually work at CEA, and every improvement compounds across every future cohort. It also became a teaching asset: our engineering learners read real production code (with real history) rather than toy examples, and some of its best contributors started as students.",
      "Where is it now? The core runs daily: admissions pipeline, learning delivery with attendance and grading, payments and receipts, the careers marketplace connecting graduates to employers, and role-scoped admin for staff. Each engine ships independently behind feature flags, which means improvements reach students weekly rather than waiting for monolithic releases. The long arc is simple: every process a real institution runs should live in one coherent system where identity, permissions and history follow the person — applicant to alumnus — without a single re-entry of their name.",
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
      "Understand what each format actually buys you. A cohort buys structure: fixed start dates, weekly deadlines, peers watching your progress, instructors expecting you at live sessions, and a graduation date that forces decisions. That scaffolding is why completion rates differ so dramatically — not because cohort learners are more talented, but because the environment removes the daily negotiation with your own willpower. Self-paced buys flexibility: learn at 5am before work or midnight after the kids sleep, pause during busy seasons, move faster through familiar material. For someone with an unpredictable job or caregiving duties, that flexibility is not laziness — it is the only schedule that exists.",
      "Be honest about which failure mode matches your personality. Cohort people fail by falling behind silently: miss two weeks, feel embarrassed, ghost the programme entirely. If you choose the cohort path, commit to the communication norm from day one — when life happens (it will), tell your instructor and group immediately; every good programme has catch-up mechanisms that only work if you use them. Self-paced people fail by drifting: no deadline means 'eventually' becomes 'never', and six months pass with four modules half-watched. If you choose self-paced, manufacture the missing structure deliberately: a study partner expecting weekly demos, a public build log, or artificial deadlines you announce to someone who will check.",
      "The money question deserves its own honesty. Cohorts typically cost more upfront because you are paying for humans — mentors grading work, instructors answering questions, coordinators keeping rhythm. Self-paced is cheaper but has a hidden cost: the majority of subscribers never finish, so effective cost per completed skill can be higher than the sticker price suggests. Calculate it that way: not what you pay per course, but what you pay per actual outcome. An ₦800,000 cohort that gets you hired may be cheaper than ₦50,000 of courses you abandoned.",
      "Who should pick which? Choose a cohort if you are switching careers and need momentum, thrive with external accountability, value the network as much as the curriculum, or have struggled to finish solo learning before (that history is data about you — believe it). Choose self-paced if you are already technical and adding a skill, genuinely cannot attend fixed sessions, or are disciplined enough to finish what you start alone. And hybrid models — structured content with flexible timing plus optional live community — exist precisely because most people sit between these poles.",
      "Whichever format you choose, remember the format is maybe twenty percent of the outcome. The variables that predict success across both: hours per week sustained over months (consistency beats intensity), projects actually finished rather than watched, feedback sought and applied, and community participation. Pick the container that protects those habits for you specifically — then show up and do unglamorous work repeatedly. There is no format that substitutes for that.",
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
      "Why the broken codebase works: juniors rehearse greenfield puzzles endlessly, but real jobs are maintenance. Seed the exercise with three planted issues — a straightforward bug, a missing input validation, and a misleading comment that contradicts the code. Watch what they do first. Strong candidates read before editing, run the code to reproduce the bug, fix the highest-impact item, and say out loud what they are deprioritising. That narration is the real signal: engineers who think aloud are teachable, and teachability outranks current knowledge at this level every time.",
      "The code reading exercise needs no special materials — hand them a genuine file from your codebase (sanitised) and ask three questions: what does this do, what would you change, where could this break? You learn whether they can navigate unfamiliar conventions, whether their critique shows taste or trivia, and how they respond when they don't understand something. Do they guess silently, ask a clarifying question, or bluff? The second behaviour predicts success; the third predicts incidents.",
      "For the design conversation, let them choose a project from their own portfolio and go deep rather than wide. Ask why, then why again, then what broke: 'You chose Postgres — why not Mongo? What did that cost you? What failed at demo time?' Candidates discussing work they actually did reveal honest depth; candidates reciting tutorials reveal shallow layers quickly. Do not punish gaps in knowledge — probe how they'd close them. 'I'd read the docs and build a spike' is exactly what you want to hear.",
      "Structure the whole loop around fairness to both sides. One hour of practical work maximum, paid if it exceeds an hour. Tell candidates the format in advance so preparation reflects the job. Give written feedback within two weeks either way — in a market as networked as Nigerian tech, candidates who felt respected become applicants again later and referrers always; candidates who felt used become cautionary tales in group chats. Your interview process is employer branding whether you designed it that way or not.",
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
    a: "Not for beginner courses. Computer Basics and Microsoft Office start from the beginning. Other courses list what you should already be able to do on the course page.",
  },
  {
    q: "Can I study while working?",
    a: "Yes. Courses run two sessions a week. Ask for the current timetable when you apply — evenings and Saturdays are used when there is demand.",
  },
  {
    q: "Is there a payment plan?",
    a: "Fees are listed in naira on each course page. Monthly instalments can be arranged for the length of the course. Ask when you apply.",
  },
  {
    q: "What do I get at the end?",
    a: "A named piece of work — a document, a spreadsheet, a design, a website, a serviced machine — and a certificate awarded for that work, not for attendance. Certificates can be checked on our public verification page.",
  },
  {
    q: "Where is the academy?",
    a: "26 Ebony Road, off Rumuola Road, Port Harcourt, Rivers State. Some courses can also be followed online.",
  },
  {
    q: "How do I apply?",
    a: "Use the application form, or visit or call during opening hours. There is no application fee. We reply with dates, the fee, and what to bring.",
  },
  {
    q: "Is CEA accredited?",
    a: "Cyber Elias Academy Ltd is a registered Nigerian company (RC 8413776). Certificates are issued by the academy and can be verified on this site. They are not a university degree or a government licence.",
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
