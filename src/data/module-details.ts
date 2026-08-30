export interface ModuleDetail {
  overview: string[];
  topics: string[];
  projects: { name: string; description: string }[];
  assessment: string;
}

export const moduleDetails: Record<string, ModuleDetail> = {
  "full-stack-software-development--programming-foundations": {
    overview: [
      "Every engineer who writes code you have used once sat where you are sitting now: staring at a blank editor, wondering if they are smart enough for this. This module answers that question by getting you productive fast. You learn JavaScript properly — not framework-flavoured snippets, but the language itself: values, types, functions, objects, arrays, control flow, asynchronous behaviour with promises and async/await.",
      "Alongside JavaScript you pick up professional workflow from day one: Git for version control, GitHub for collaboration, the command line as your primary tool, and VS Code configured the way working developers use it. You also learn HTML and CSS well enough to structure and style real interfaces, because even backend-heavy engineers debug markup weekly.",
      "The module closes with DOM manipulation and small interactive projects — a calculator, a todo app, a weather widget consuming a public API — that cement fundamentals before frameworks add their own abstractions on top.",
    ],
    topics: [
      "JavaScript syntax, types and operators",
      "Functions, scope, closures and this",
      "Arrays, objects and higher-order methods (map/filter/reduce)",
      "Control flow and error handling",
      "Promises, async/await and fetch",
      "DOM manipulation and browser events",
      "HTML5 semantic structure",
      "CSS layout: flexbox, grid, responsive units",
      "Git branching, merging and pull requests",
      "Command line fluency",
    ],
    projects: [
      {
        name: "Personal portfolio site",
        description:
          "Semantic, responsive HTML/CSS site deployed to a live URL — your first public artefact.",
      },
      {
        name: "Interactive quiz app",
        description: "Vanilla JavaScript app with state, scoring and localStorage persistence.",
      },
      {
        name: "API-driven dashboard",
        description:
          "Fetch and display live data from a public API with loading and error states handled properly.",
      },
    ],
    assessment:
      "Weekly auto-graded coding challenges plus two instructor-reviewed project checkpoints. Passing requires functional deployed projects, not just quizzes.",
  },
  "full-stack-software-development--frontend-with-react-typescript": {
    overview: [
      "React dominates Nigerian frontend hiring, and this module takes you from your first component to production-grade interfaces. You start with JSX, components, props and state, then move through hooks (useState, useEffect, useContext, custom hooks), client-side routing, forms and validation, and data fetching patterns including caching with TanStack Query.",
      "TypeScript is taught alongside React rather than after it, because that is how professional teams work. You learn interfaces, generics, union types and utility types while building — catching bugs at compile time instead of in production, which is exactly why local companies have migrated.",
      "The second half covers what separates hobby React from professional React: component architecture for scale, state management strategy (when Context suffices, when Zustand earns its place), performance optimisation with memoisation and code splitting, testing components with Vitest and Testing Library, and styling systems with Tailwind CSS and shadcn/ui-style composition.",
    ],
    topics: [
      "Components, JSX and rendering model",
      "State management with hooks",
      "Effects, refs and lifecycle thinking",
      "Context API and prop drilling avoidance",
      "React Router: nested routes, loaders, protected routes",
      "Forms: controlled inputs, validation, accessibility",
      "Data fetching with TanStack Query",
      "TypeScript: typing props, events, generics",
      "Tailwind CSS design systems",
      "Testing Library fundamentals",
      "Performance: memo, useMemo, lazy loading",
    ],
    projects: [
      {
        name: "Multi-page dashboard application",
        description:
          "Authenticated dashboard with routing, role-based views and cached server state — the pattern most Nigerian product interviews probe.",
      },
      {
        name: "E-commerce storefront UI",
        description:
          "Product listing, filtering, cart state and checkout flow built against a mock API.",
      },
      {
        name: "Component library contribution",
        description:
          "Build and document reusable components with tests, mirroring how team design systems evolve.",
      },
    ],
    assessment:
      "Code reviews on every project (the same review process you will face at work), a written TypeScript exam, and a timed build challenge where you ship a small feature from a ticket.",
  },
  "full-stack-software-development--backend-apis-databases": {
    overview: [
      "Frontend gets attention; backend pays salaries. This module teaches server-side engineering with Node.js and Express (graduating to NestJS structure), PostgreSQL as your primary database, and the discipline of designing APIs other developers enjoy consuming.",
      "You begin with HTTP itself — methods, status codes, headers, authentication — then build REST APIs with proper resource modelling, validation, error handling and pagination. SQL is taught seriously: schema design, normalisation trade-offs, indexes, transactions, joins and query planning, because 'I know SQL' in an interview means writing a three-table join without flinching.",
      "Authentication gets a full week: sessions vs JWTs, password hashing, refresh token rotation and OAuth flows. You also cover the operational realities Nigerian backends face daily — idempotency keys for payment webhooks, rate limiting, request logging, environment configuration — and integrate Paystack payments end to end, since payment integration appears in nearly every Nigerian product job description.",
    ],
    topics: [
      "Node.js runtime, modules and the event loop",
      "Express routing, middleware and error handling",
      "RESTful API design and versioning",
      "PostgreSQL schema design and migrations",
      "SQL: joins, aggregates, indexes, transactions",
      "Authentication: hashing, JWTs, sessions, OAuth",
      "Authorization: roles and permissions",
      "Validation with Zod",
      "Payment integration with Paystack webhooks",
      "Rate limiting, logging and monitoring hooks",
      "Testing APIs with supertest",
    ],
    projects: [
      {
        name: "Multi-tenant SaaS API",
        description:
          "Organisations, users, roles and billing-ready endpoints with full test coverage.",
      },
      {
        name: "Payment-enabled booking system",
        description:
          "Reserve, pay via Paystack test mode, handle webhook verification and idempotent confirmation.",
      },
      {
        name: "Database optimisation exercise",
        description:
          "Take a slow realistic dataset, profile queries, add indexes and document the improvement — interview gold.",
      },
    ],
    assessment:
      "APIs are assessed by automated test suites hitting your live endpoints (does it actually work?) plus manual code review covering security, structure and error handling.",
  },
  "full-stack-software-development--cloud-ci-cd-devops-basics": {
    overview: [
      "Code that only runs on your laptop has no market value. This module bridges development and operations: you containerise applications with Docker, write CI pipelines that test and build automatically, deploy to cloud infrastructure, and monitor what you shipped.",
      "Docker comes first — images, layers, volumes, docker-compose for local stacks — because containers are now the default deployment unit everywhere. Then GitHub Actions: linting, testing, building and deploying on every push, with secrets management done properly. You deploy a full-stack application to a cloud provider with HTTPS, environment separation and database backups.",
      "The final stretch covers observability basics (structured logs, uptime checks, error tracking with Sentry) and the deployment patterns interviews ask about: zero-downtime deploys, rollback strategy, environment variables across environments. Graduates leave able to take any repo from git push to live URL — a capability many self-taught developers never acquire.",
    ],
    topics: [
      "Docker: images, containers, compose",
      "GitHub Actions workflows and secrets",
      "Deployment to cloud platforms (Vercel, Railway, AWS EC2)",
      "HTTPS, domains and DNS for deployments",
      "Environment configuration and secret management",
      "Database backup and restore strategies",
      "Structured logging and error tracking",
      "Zero-downtime deployment concepts",
      "Monitoring and basic alerting",
    ],
    projects: [
      {
        name: "Fully automated pipeline",
        description:
          "Push to main triggers tests, builds Docker images, deploys staging then production on approval.",
      },
      {
        name: "Production deployment of your capstone preview",
        description:
          "Your full-stack app live on a custom domain with monitoring and a documented rollback procedure.",
      },
    ],
    assessment:
      "Pipeline must demonstrably run green from a fresh clone; deployment is verified by instructors hitting your live URL and intentionally breaking things to watch recovery.",
  },
  "full-stack-software-development--capstone-client-project": {
    overview: [
      "The capstone is where everything converges into proof. Working in small teams under CEA's Services Engine, you build a real product for a real client — a business, NGO or internal stakeholder with actual requirements, feedback cycles and a launch date.",
      "Past capstones include inventory systems for retailers, booking platforms for clinics, school management portals and fintech dashboards. You run the full lifecycle: discovery meetings, scoping documentation, sprint planning with Agile ceremonies, weekly demos, code review, UAT and handover. Clients sign off; some become references on your CV.",
      "Technical expectations are deliberately high: authentication, role-based access, payment integration where relevant, tests, CI/CD, documentation and a deployment that survives real usage. Teams get mentor oversight but own their decisions — including living with the consequences, which is the point.",
    ],
    topics: [
      "Client discovery and requirements gathering",
      "Scoping, estimation and proposals",
      "Agile ceremonies: standups, planning, retrospectives",
      "Branch strategy and PR-based collaboration",
      "Feature delivery under real deadlines",
      "User acceptance testing",
      "Documentation and handover",
      "Post-launch support and iteration",
    ],
    projects: [
      {
        name: "Client product delivery",
        description:
          "A production application delivered to a paying or institutional client, from kickoff meeting to launch.",
      },
      {
        name: "Portfolio case study",
        description:
          "A written case study documenting decisions, trade-offs and outcomes — the artefact that wins interviews.",
      },
    ],
    assessment:
      "Assessment combines client satisfaction, technical review of the codebase, individual contribution tracking and your capstone defence presentation to an industry panel.",
  },
  "cybersecurity-analyst--security-fundamentals": {
    overview: [
      "Security careers are built on fundamentals that never expire: understanding how systems fail and how attackers exploit those failures. This module establishes that base — the CIA triad, threat actors and their motivations, attack surfaces, and the defensive mindset that distinguishes security professionals from general IT staff.",
      "You get hands-on immediately: setting up a home lab with virtual machines, learning Linux and Windows internals that matter for security (processes, services, permissions, logging), and using foundational tools like Nmap for network discovery and Wireshark for packet analysis. Cryptography is covered practically — symmetric vs asymmetric encryption, hashing, certificates and TLS handshake analysis.",
      "The module closes with web application security basics mapped to the OWASP Top 10, because web exploitation skills compound into everything from pentesting to secure development. By the end you can think like an attacker and document like a defender.",
    ],
    topics: [
      "CIA triad and risk concepts",
      "Threat landscape: actors, motivations, common attacks",
      "Home lab construction with VirtualBox/VMware",
      "Linux and Windows security-relevant internals",
      "Networking for security professionals",
      "Nmap reconnaissance and service enumeration",
      "Wireshark traffic analysis",
      "Cryptography: encryption, hashing, PKI, TLS",
      "OWASP Top 10 vulnerabilities",
      "Security policy and awareness fundamentals",
    ],
    projects: [
      {
        name: "Personal security lab",
        description:
          "Documented multi-VM lab environment you will use throughout the programme — and throughout your career.",
      },
      {
        name: "Network assessment report",
        description:
          "Reconnaissance exercise on lab infrastructure with a professional findings report.",
      },
      {
        name: "Web vulnerability walkthrough",
        description:
          "Exploit deliberately vulnerable apps (DVWA-style), then write remediation guidance for each finding.",
      },
    ],
    assessment:
      "Lab practicals checked by instructors, a written foundations exam, and report quality graded against industry standards for clarity and actionability.",
  },
  "cybersecurity-analyst--network-endpoint-defense": {
    overview: [
      "Detection starts at the network edge and the endpoint. This module teaches you to harden, monitor and defend both: firewalls and segmentation on the network side, EDR and hardening baselines on the endpoint side.",
      "Network defence covers firewall rule design (not just enabling one), VLAN segmentation, VPN technologies, IDS/IPS concepts with Snort/Suricata, and network monitoring architectures. Endpoint defence covers hardening Windows and Linux to CIS benchmark standards, application allowlisting, patch management discipline, and EDR deployment — you configure Microsoft Defender for Endpoint and an open-source alternative in the lab.",
      "Throughout, you practise the analyst loop: baseline normal behaviour, notice deviation, investigate efficiently. The skills map directly to tier-1 SOC responsibilities and network security engineer roles that Nigerian banks and MSSPs hire for constantly.",
    ],
    topics: [
      "Firewall architecture and rule engineering",
      "Network segmentation and VLAN security",
      "VPN technologies: WireGuard, IPsec, SSL VPN",
      "IDS/IPS with Suricata",
      "Windows and Linux hardening to CIS benchmarks",
      "Patch and vulnerability management workflows",
      "EDR deployment and tuning",
      "Endpoint log sources and collection",
      "Network monitoring architecture",
    ],
    projects: [
      {
        name: "Segmented lab network",
        description:
          "Design and implement a segmented network with firewall policies between zones, documented to enterprise standard.",
      },
      {
        name: "Hardened golden images",
        description:
          "Windows and Linux builds hardened to benchmark with compliance evidence generated by script.",
      },
      {
        name: "EDR detection lab",
        description:
          "Deploy EDR, execute simulated attack techniques, tune noisy detections and document tuning rationale.",
      },
    ],
    assessment:
      "Configuration audits against benchmarks, detection exercises scored on true-positive rate, and a mid-programme practical where you defend an already-hardened environment against red-team attempts.",
  },
  "cybersecurity-analyst--siem-detection-threat-hunting": {
    overview: [
      "This is the module that defines SOC analysts: turning raw telemetry into detections and hunts. You build a SIEM from the ground up — ingesting Windows Event Logs, Linux syslog, firewall and DNS logs into Elastic Security (and exploring Wazuh as an open-source alternative) — then learn the craft of writing detections that catch real attacks without drowning in false positives.",
      "Detection engineering follows MITRE ATT&CK: mapping adversary tactics to log sources, writing Sigma rules, translating them to your SIEM's query language, and testing them against Atomic Red Team simulations. Threat hunting complements automation: hypothesis-driven searches through data, frequency analysis, anomaly identification and the documentation habits that turn hunts into permanent detections.",
      "By module end you operate a functioning mini-SOC pipeline: logs flowing in, alerts firing on simulated attacker techniques, dashboards your manager could read, and hunt reports demonstrating analytical rigour. These are precisely the daily tasks of the roles this programme targets.",
    ],
    topics: [
      "SIEM architecture and log pipeline design",
      "Log sources: Windows Event IDs, sysmon, syslog, DNS, proxy",
      "Elastic Security and Wazuh operation",
      "MITRE ATT&CK mapping",
      "Sigma rule authoring and conversion",
      "Detection tuning and false positive management",
      "Atomic Red Team attack simulation",
      "Hypothesis-driven threat hunting methodology",
      "Dashboarding and analyst reporting",
    ],
    projects: [
      {
        name: "Home SOC build",
        description:
          "Complete SIEM deployment ingesting multiple log source types from your lab machines.",
      },
      {
        name: "Detection rule library",
        description:
          "Author and validate 15+ detections mapped to ATT&CK techniques, each tested against simulation.",
      },
      {
        name: "Threat hunt report",
        description:
          "Executive-readable hunt document: hypothesis, method, findings and resulting detection improvements.",
      },
    ],
    assessment:
      "Live detection exercises (attacks are simulated against your SIEM; did yours catch them?), peer review of detection rules, and a graded hunt report defending methodology choices.",
  },
  "cybersecurity-analyst--incident-response-forensics": {
    overview: [
      "When prevention fails — and it always eventually does — response quality determines whether an organisation experiences an incident or a catastrophe. This module trains the responder's discipline: structured triage, containment decisions under pressure, eradication, recovery and the forensic rigor that supports legal follow-through.",
      "You follow the NIST incident response lifecycle through tabletop exercises and live labs: preparation playbooks, detection and analysis, containment strategy (short-term vs long-term), forensically sound acquisition, malware triage basics, memory and disk forensics with Autopsy and Volatility, and lessons-learned reporting that actually improves defences.",
      "Nigerian regulatory context is woven throughout: NDPA breach notification timelines, CBN incident reporting requirements for financial institutions, and evidence-handling standards that hold up if matters go legal. Every exercise ends with a written report, because in real incidents the documentation outlives the adrenaline.",
    ],
    topics: [
      "NIST IR lifecycle and playbook development",
      "Triage and severity classification",
      "Containment, eradication and recovery strategy",
      "Evidence acquisition and chain of custody",
      "Disk forensics with Autopsy",
      "Memory forensics with Volatility",
      "Malware triage fundamentals",
      "Log timeline reconstruction",
      "NDPA and sectoral reporting obligations",
      "Post-incident review facilitation",
    ],
    projects: [
      {
        name: "Full IR simulation",
        description:
          "Respond to a staged multi-stage intrusion: contain it, investigate it, recover, report — against the clock.",
      },
      {
        name: "Forensic examination",
        description:
          "Acquire and analyse a disk image, reconstruct attacker activity, produce court-ready findings documentation.",
      },
      {
        name: "Playbook authorship",
        description:
          "Write response playbooks for scenarios Nigerian organisations actually face: BEC, ransomware, insider data theft.",
      },
    ],
    assessment:
      "Timed IR exercises scored on decision quality and completeness, forensic accuracy verified against ground truth, and report writing graded to professional standard.",
  },
  "cybersecurity-analyst--grc-capstone-soc-simulation": {
    overview: [
      "Careers stall when technologists cannot speak governance. This closing module pairs governance, risk and compliance literacy with a capstone SOC simulation that ties every prior skill together.",
      "GRC coverage includes risk assessment methodology, control frameworks (ISO 27001, NIST CSF, CIS Controls), audit basics, policy writing, and Nigeria's specific regulatory landscape: NDPC enforcement, CBN cybersecurity frameworks, NITDA guidelines. You learn to translate technical reality into board-level language — the skill that moves senior engineers into management tracks.",
      "The capstone runs your cohort as a functioning SOC for two weeks: shift schedules, alert triage queues, escalation paths, incident response drills, metrics reporting to 'leadership' (played by instructors and guest practitioners). You rotate through analyst tiers and lead incidents, finishing with the operational confidence that separates programme graduates from certificate holders.",
    ],
    topics: [
      "Risk assessment and treatment planning",
      "ISO 27001 and NIST CSF implementation basics",
      "Policy and standard authorship",
      "Audit preparation and evidence collection",
      "Nigeria regulatory landscape: NDPA, CBN, NITDA",
      "Security metrics and executive reporting",
      "SOC operations: shifts, queues, escalations",
      "Incident command and communication",
    ],
    projects: [
      {
        name: "Risk assessment for a real organisation",
        description:
          "Scoped assessment of a partner SME or nonprofit, delivered as a professional consulting artefact.",
      },
      {
        name: "SOC capstone rotation",
        description:
          "Two weeks operating the cohort SOC: triage, escalate, respond, document, brief leadership.",
      },
    ],
    assessment:
      "Capstone performance is assessed on operational metrics (alert handling quality, response times), leadership during your rotation, and the professional polish of your final portfolio.",
  },
  "cloud-engineering-devops--linux-networking-core": {
    overview: [
      "Cloud platforms abstract servers, but debugging still happens at the layer underneath. This module makes you fluent in Linux administration and networking — the foundation every cloud certification assumes and every production incident demands.",
      "Linux coverage is practical and deep: filesystem hierarchy, permissions and ownership, processes and systemd services, package management, shell scripting for automation, SSH hardening, user management and journalctl/log inspection. You spend most of your time in a terminal until it feels like home.",
      "Networking follows: the OSI and TCP/IP models applied practically, IP addressing and subnetting (taught to CCNA-level comfort), routing fundamentals, DNS resolution chains, DHCP, and troubleshooting with tcpdump and dig. The module ends with you building and troubleshooting a multi-network virtual topology — the exact muscle memory cloud VPC design requires.",
    ],
    topics: [
      "Linux filesystem, permissions and ACLs",
      "Process management and systemd",
      "Bash scripting for automation",
      "SSH key management and hardening",
      "Package management across distributions",
      "Logging with journald and rsyslog",
      "IP addressing and subnetting",
      "Routing, NAT and firewalls (iptables/nftables)",
      "DNS resolution and troubleshooting",
      "Packet capture with tcpdump",
    ],
    projects: [
      {
        name: "Automated server provisioning script",
        description:
          "Bash script that provisions a hardened web server from bare install — parameterised and idempotent.",
      },
      {
        name: "Virtual network lab",
        description:
          "Multi-subnet topology with routing and firewall rules, plus a troubleshooting scenario set you exchange with peers.",
      },
    ],
    assessment:
      "Terminal-based practical exams (no GUI crutches), script review for correctness and safety, and subnetting speed drills that mirror certification exam conditions.",
  },
  "cloud-engineering-devops--cloud-architecture": {
    overview: [
      "This module teaches AWS the way architects think about it: not as a console of services but as composable building blocks with cost, reliability and security trade-offs. You cover compute (EC2, Lambda, ECS), storage (S3 storage classes, EBS, EFS), databases (RDS, DynamoDB selection criteria), networking (VPC design, subnets, route tables, peering), IAM done properly, and the Well-Architected Framework as a decision lens.",
      "Cost management is treated as a first-class engineering concern — Nigerian budgets demand it. You learn pricing models, tagging strategies, budgets and alerts, and the habit of estimating before building. High availability patterns (multi-AZ, load balancing, auto-scaling) are practised through scenarios like keeping a fintech API alive through salary-day traffic spikes.",
      "Labs run continuously: you build a three-tier web architecture in week one, refactor it repeatedly as new services appear, and finish designing a full architecture for a realistic Nigerian business within a defined budget — defended in front of practising engineers.",
    ],
    topics: [
      "EC2, AMIs, auto-scaling groups",
      "Lambda and event-driven compute",
      "S3 storage classes and lifecycle policies",
      "RDS vs DynamoDB selection",
      "VPC design: subnets, NAT, security groups",
      "IAM users, roles, policies and boundaries",
      "Load balancing and Route 53",
      "CloudWatch metrics, alarms, logs",
      "Well-Architected review practice",
      "Cost estimation, budgets and optimisation",
    ],
    projects: [
      {
        name: "Three-tier production architecture",
        description:
          "Highly available web application with separated tiers, monitoring and cost dashboard — rebuilt twice as you learn.",
      },
      {
        name: "Architecture design defence",
        description:
          "Design a complete solution for a realistic brief within budget constraints; defend choices to a panel.",
      },
    ],
    assessment:
      "Hands-on labs verified in your own AWS account (we check the resources exist and work), scenario-based exams mirroring SA Associate difficulty, and the design defence.",
  },
  "cloud-engineering-devops--containers-kubernetes": {
    overview: [
      "Kubernetes commands premium salaries because it orchestrates complexity most teams cannot manage manually. This module takes you from container fundamentals to operating Kubernetes with confidence — not memorising kubectl commands, but understanding what the control plane actually does.",
      "Docker depth comes first: image optimisation, multi-stage builds, registry workflows and compose orchestration. Then Kubernetes fundamentals progressively: pods, Deployments, Services, ConfigMaps, Secrets, Ingress, StatefulSets, Jobs — each taught by breaking it and fixing it. You run clusters locally (kind/minikube) and managed (EKS) to feel the operational difference.",
      "Production concerns dominate the final third: resource requests and limits, horizontal pod autoscaling, liveness/readiness probes, rolling update strategy, NetworkPolicies, RBAC, and Helm for packaging applications. Troubleshooting drills run weekly — CrashLoopBackOff, pending pods, service discovery failures — because diagnosis under pressure is the actual job.",
    ],
    topics: [
      "Docker images, layers and registries",
      "Multi-stage builds and image security scanning",
      "Kubernetes architecture: control plane and nodes",
      "Workloads: Deployments, StatefulSets, Jobs, CronJobs",
      "Services, Ingress and cluster networking",
      "ConfigMaps, Secrets and configuration strategy",
      "Resource management and autoscaling",
      "Probes and application health",
      "RBAC and namespace isolation",
      "Helm packaging and templating",
      "Cluster troubleshooting methodology",
    ],
    projects: [
      {
        name: "Microservices platform on EKS",
        description:
          "Deploy a multi-service application with Ingress, autoscaling, secrets management and monitoring — production-shaped.",
      },
      {
        name: "Helm chart library",
        description:
          "Package your applications as reusable charts with values files per environment.",
      },
      {
        name: "Break-fix marathon",
        description:
          "Twelve broken cluster scenarios diagnosed and repaired under time pressure, documented as a runbook.",
      },
    ],
    assessment:
      "Practical cluster exams (fix this, deploy that), CKA-style timed exercises, and review of your Helm charts for reusability and correctness.",
  },
  "cloud-engineering-devops--iac-cicd-gitops": {
    overview: [
      "Manual infrastructure does not scale and cannot be audited. This module makes automation your default: Terraform for provisioning, GitHub Actions for pipelines, ArgoCD for GitOps delivery — the stack Nigerian platform teams have converged on.",
      "Terraform coverage goes beyond tutorials: provider configuration, state management (remote backends, locking), modules and composition, workspaces vs directory-per-environment, plan review discipline, import of existing resources and drift detection. You provision complete environments — networks, clusters, databases, DNS — from code alone.",
      "CI/CD builds on your pipeline foundations: multi-stage workflows, environment promotion, image tagging strategy, deployment safety gates. Then GitOps with ArgoCD: declarative continuous delivery where Git is truth, sync policies, progressive delivery concepts and rollback. The module culminates in a complete push-to-production pipeline: merge a PR, and infrastructure and application updates flow through automatically, safely, observably.",
    ],
    topics: [
      "Terraform providers, resources and data sources",
      "Remote state, locking and collaboration",
      "Module design and environment composition",
      "Drift detection and resource imports",
      "Advanced GitHub Actions: matrices, OIDC, reusable workflows",
      "Artifact management and image tagging",
      "Environment promotion strategies",
      "ArgoCD installation, applications and sync policies",
      "Progressive delivery and canary concepts",
      "Pipeline security: secrets, least privilege, supply chain",
    ],
    projects: [
      {
        name: "Terraform module collection",
        description:
          "Reusable, documented modules for networking, compute and databases published for cohort use.",
      },
      {
        name: "End-to-end GitOps platform",
        description:
          "Merge-to-deploy platform: Terraform provisions, Actions builds, ArgoCD delivers, monitoring observes.",
      },
    ],
    assessment:
      "Infrastructure code review (would a teammate thank you?), live pipeline demonstrations from clean clones, and disaster drills — destroy part of your platform, restore it from code.",
  },
  "cloud-engineering-devops--sre-capstone": {
    overview: [
      "Site Reliability Engineering is where cloud careers compound: applying software methods to operations. The capstone module embeds SRE practice directly — you operate a production platform for six weeks with real SLOs, real incidents and real consequences.",
      "You begin by defining service level objectives for the cohort-run platform: availability and latency targets with error budgets that govern release pace. Observability is built out properly: Prometheus metrics, Grafana dashboards that answer questions, alerting tuned to page on symptoms rather than causes, and distributed tracing across services.",
      "Then the platform lives. Incident response rotations put you on call (against injected failures and occasional genuine surprises): acknowledge, diagnose, mitigate, communicate, write the postmortem. Capacity reviews, cost reviews and reliability reviews run on a cadence, and the module closes with each engineer presenting their operational tenure — the strongest possible interview material for SRE and platform roles.",
    ],
    topics: [
      "SLIs, SLOs and error budget policy",
      "Prometheus metric design and recording rules",
      "Grafana dashboard engineering",
      "Alert philosophy: symptom-based paging",
      "On-call practice and escalation",
      "Incident command and communications",
      "Blameless postmortems and follow-through",
      "Capacity and cost review rhythms",
      "Toil identification and automation",
    ],
    projects: [
      {
        name: "Six-week production tenure",
        description:
          "Operational responsibility for a live platform with rotating on-call, documented in shift logs.",
      },
      {
        name: "Postmortem portfolio",
        description:
          "Three blameless postmortems from real (or realistically injected) incidents, with completed actions.",
      },
      {
        name: "Reliability review presentation",
        description:
          "Present your tenure: SLO attainment, incidents handled, toil reduced, costs managed.",
      },
    ],
    assessment:
      "Operational metrics during your tenure, postmortem quality reviewed by practising SREs, and the final review defence.",
  },
  "data-science-ai--python-statistics": {
    overview: [
      "Data science stands on two legs: computational fluency and statistical reasoning. This module builds both simultaneously — Python as your working language and statistics as your thinking framework.",
      "Python coverage moves from syntax through the data-science stack: NumPy arrays and vectorised thinking, pandas DataFrames for real-world messy data, matplotlib and seaborn for exploratory visualisation, and Jupyter workflows that keep analysis reproducible. You write functions early and often, because copy-paste analysis collapses at the first requirement change.",
      "Statistics is taught for intuition before formula: descriptive statistics and distribution shapes, probability foundations, sampling and the central limit theorem made visual, confidence intervals, hypothesis testing with honest p-value interpretation, and correlation versus causation drilled through examples where confusing them costs money. Every concept lands in code the same week it is introduced.",
    ],
    topics: [
      "Python fundamentals for data work",
      "NumPy arrays and vectorisation",
      "pandas: indexing, grouping, joining, reshaping",
      "Exploratory data analysis workflow",
      "Visualisation with matplotlib and seaborn",
      "Descriptive statistics and distributions",
      "Probability and sampling",
      "Confidence intervals",
      "Hypothesis testing done honestly",
      "Correlation, causation and confounders",
    ],
    projects: [
      {
        name: "Exploratory analysis of Nigerian open data",
        description:
          "Pick a public dataset (power, health, prices), clean it and tell the story it holds — presented to the cohort.",
      },
      {
        name: "A/B test analysis",
        description:
          "Given experiment results with traps planted, determine significance correctly and communicate recommendation.",
      },
    ],
    assessment:
      "Weekly notebook reviews, a statistics exam focused on interpretation over computation, and peer-reviewed analysis presentations.",
  },
  "data-science-ai--data-wrangling-visualization": {
    overview: [
      "Seventy percent of real data work is cleaning inconsistent, incomplete, badly-shaped records — and the analysts who do it well are worth their weight in gold to any organisation. This module makes wrangling your superpower and visualisation your voice.",
      "Wrangling coverage: missing data strategies beyond dropna(), deduplication logic, string cleaning and normalisation (names, phone numbers, addresses — Nigerian data realities), date/time handling, categorical encoding, reshaping between wide and long formats, merging fuzzy-matched sources, and building repeatable cleaning pipelines instead of one-off fixes.",
      "Visualisation then turns clean data into influence: grammar-of-graphics thinking with seaborn and Plotly, chart selection matched to question type, colour and accessibility, dashboard principles with Streamlit, and the storytelling arc that carries executives from question to insight to action. The module's mantra: if a chart needs explaining, redesign the chart.",
    ],
    topics: [
      "Missing data diagnosis and treatment",
      "Duplicate and consistency resolution",
      "String and address normalisation",
      "Datetime handling and time zones",
      "Wide/long reshaping and pivots",
      "Join strategies and fuzzy matching",
      "Reproducible cleaning pipelines",
      "Chart grammar and selection",
      "Colour, accessibility and honesty in viz",
      "Streamlit quick dashboards",
    ],
    projects: [
      {
        name: "Messy-to-analysis pipeline",
        description:
          "Take a deliberately ruined real-world dataset from raw chaos to analysis-ready, fully scripted and documented.",
      },
      {
        name: "Insight dashboard",
        description:
          "Interactive Streamlit dashboard answering a business question for a partner organisation.",
      },
    ],
    assessment:
      "Pipeline reproducibility tested on unseen data variants, dashboard review by classmates playing executives, and wrangling speed rounds on fresh messy datasets.",
  },
  "data-science-ai--machine-learning": {
    overview: [
      "Machine learning is taught here the way practitioners wish they had learned it: classical algorithms understood deeply before neural networks are touched, evaluation treated as seriously as modelling, and every technique anchored to problems it actually solves.",
      "Supervised learning anchors the module: linear and logistic regression interpreted properly, regularisation, decision trees, random forests and gradient boosting (XGBoost/LightGBM — the workhorses of tabular ML), plus support vector machines and k-nearest neighbours for conceptual breadth. Unsupervised learning covers clustering, dimensionality reduction and anomaly detection.",
      "Model craft gets sustained attention: train/validation/test discipline, cross-validation, leakage hunting, feature engineering, class imbalance strategies, hyperparameter tuning, and metric selection matched to business cost (precision vs recall is not academic when fraud is involved). Deep learning introduces neural networks and PyTorch fundamentals, closing with CNNs for image tasks — enough depth to continue confidently in the LLM module and beyond.",
    ],
    topics: [
      "Regression and classification fundamentals",
      "Regularisation and model complexity",
      "Tree ensembles: random forests, XGBoost",
      "Clustering and dimensionality reduction",
      "Anomaly detection approaches",
      "Cross-validation and leakage prevention",
      "Feature engineering craft",
      "Imbalanced data strategies",
      "Metrics aligned to business costs",
      "Neural networks and PyTorch basics",
      "CNNs for image classification",
    ],
    projects: [
      {
        name: "Churn prediction for telecom data",
        description:
          "Full cycle: framing, features, model comparison, threshold selection, business recommendation.",
      },
      {
        name: "Fraud/anomaly detection",
        description:
          "Imbalanced-data problem solved with appropriate metrics and honest uncertainty communication.",
      },
      {
        name: "Image classifier with PyTorch",
        description:
          "Transfer-learning CNN solving a locally relevant recognition task, trained on cloud GPU.",
      },
    ],
    assessment:
      "Kaggle-style cohort competition (leaderboard position matters less than methodology), model interpretation interviews, and reproducibility checks — can your results regenerate from your repo?",
  },
  "data-science-ai--llms-applied-ai": {
    overview: [
      "Large language models have rewritten what AI teams build, and this module puts you inside that shift: not calling APIs blindly, but engineering reliable LLM systems and knowing where they break.",
      "Foundations first: how transformers and attention work conceptually, tokens and context windows, embedding spaces and semantic similarity. Then the applied core — prompt engineering as systematic craft, structured outputs, function/tool calling, retrieval-augmented generation built end to end (chunking, embeddings, vector search with pgvector or FAISS, generation grounded in retrieved context), and agentic workflows with LangChain/LangGraph.",
      "Evaluation and safety receive unusual emphasis because they separate professionals from tutorial-followers: building eval sets, judging outputs systematically, hallucination measurement, guardrails, cost/latency optimisation, and when NOT to use an LLM. You finish by building a RAG-powered assistant over Nigerian-relevant documents (regulations, policies, product manuals) — a portfolio piece with immediate commercial resonance.",
    ],
    topics: [
      "Transformer and attention intuitions",
      "Tokens, embeddings, context windows",
      "Prompt engineering as systematic craft",
      "Structured output and function calling",
      "RAG: chunking, embeddings, vector search",
      "Vector databases (pgvector, FAISS)",
      "Agents and tool use with LangGraph",
      "Evaluation sets and systematic judging",
      "Hallucination measurement and mitigation",
      "Guardrails and safe deployment",
      "Cost and latency engineering",
    ],
    projects: [
      {
        name: "Document intelligence RAG system",
        description:
          "Question-answering assistant over a substantial document corpus, with citations and eval scores reported.",
      },
      {
        name: "Agent workflow",
        description:
          "Tool-using agent automating a realistic multi-step task with human-in-the-loop checkpoints.",
      },
    ],
    assessment:
      "System demos scored on reliability (not demo magic), eval harness quality reviewed, and a technical viva probing your understanding of failure modes.",
  },
  "data-science-ai--mlops-capstone": {
    overview: [
      "Models create value in production, not notebooks. This closing module teaches MLOps — the discipline of deploying, monitoring and maintaining ML systems — and channels it into your capstone: a complete ML product owned end to end.",
      "MLOps coverage: experiment tracking with MLflow, dataset and model versioning with DVC, reproducible training pipelines, model serving behind APIs (FastAPI) with containerised deployment, batch vs real-time inference trade-offs, and monitoring for the failures that silently kill ML systems — data drift, concept drift, pipeline breakage.",
      "The capstone consumes the rest: frame a problem (ideally with a real partner), acquire and version data, build and evaluate models, deploy behind an API, wrap a usable interface around it, instrument monitoring, and document everything. Past capstones include credit-scoring prototypes with fairness analysis, churn prediction wired to telco-shaped data, document-intelligence for Nigerian-language text and demand forecasting for retail partners. You defend it before practising data scientists — the final bridge between programme and profession.",
    ],
    topics: [
      "Experiment tracking with MLflow",
      "Data and model versioning with DVC",
      "Reproducible training pipelines",
      "FastAPI model serving",
      "Containerised ML deployment",
      "Batch vs streaming inference",
      "Data and concept drift monitoring",
      "ML alerting and retraining triggers",
      "Model cards and documentation",
      "Capstone scoping and delivery",
    ],
    projects: [
      {
        name: "End-to-end ML product",
        description:
          "Deployed, monitored, documented ML system solving a real problem — your definitive portfolio centrepiece.",
      },
      {
        name: "Capstone defence",
        description: "Present architecture, results, limitations and roadmap to an industry panel.",
      },
    ],
    assessment:
      "Deployment verified live by panel members, monitoring demonstrated by injecting drift, code review, and the defence presentation.",
  },
  "product-ui-ux-design--design-foundations": {
    overview: [
      "Great interfaces rest on fundamentals older than software: typography, colour, spacing, hierarchy and composition. This module builds your visual foundation so later tools amplify judgment rather than mask its absence.",
      "Typography leads: typeface anatomy and selection, scales and rhythm, readability across devices and low-literacy contexts, pairing strategies and the licensing realities designers actually navigate. Colour theory follows with cultural nuance — colour meanings shift across Nigerian audiences, and contrast ratios are accessibility law, not decoration.",
      "Layout and composition teach the grid, whitespace as an active element, visual hierarchy through size/weight/position, and consistent spacing systems. You practise in Figma from day one — frames, auto-layout, components, styles — reaching fluency with the tool Nigerian product teams live in. The module closes with critique culture: presenting work, receiving structured feedback, iterating without ego.",
    ],
    topics: [
      "Typographic systems and pairing",
      "Readability and inclusive legibility",
      "Colour theory with cultural context",
      "Contrast, WCAG and accessible palettes",
      "Grid systems and layout composition",
      "Spacing systems and visual rhythm",
      "Hierarchy through scale, weight, position",
      "Figma mastery: auto-layout, components, styles",
      "Design critique and iteration practice",
    ],
    projects: [
      {
        name: "Brand poster series",
        description:
          "Typographic posters demonstrating hierarchy and restraint — printed and critiqued.",
      },
      {
        name: "Accessible palette study",
        description:
          "Build and document an AA-compliant palette for a Nigerian brand, including culturally-informed choices.",
      },
      {
        name: "Landing page recreation",
        description:
          "Pixel-faithful Figma recreation of a quality landing page, then a redesigned variant defending improvements.",
      },
    ],
    assessment:
      "Critique participation graded on both giving and receiving feedback, project rubrics emphasising fundamentals, and a Figma efficiency practical.",
  },
  "product-ui-ux-design--ux-research-strategy": {
    overview: [
      "Design without research is decoration. This module teaches you to ground decisions in evidence: understanding users through structured inquiry, translating findings into strategy, and measuring whether designs actually work.",
      "Research methods come first: user interviews that avoid leading questions, contextual observation, competitive analysis, surveys designed to survive statistical scrutiny, and usability testing moderated without contamination. Recruiting Nigerian participants, compensating them fairly and running sessions in mixed-language contexts get specific treatment.",
      "Synthesis turns raw data into direction: affinity mapping, persona construction that avoids stereotype, journey mapping revealing friction and emotion, jobs-to-be-done framing, and problem definition sharp enough to design against. Strategy closes the module — opportunity sizing, prioritisation frameworks, and the research-to-roadmap translation product managers expect designers to contribute to. Throughout, you work on real briefs from local businesses and NGOs.",
    ],
    topics: [
      "Interview craft and bias avoidance",
      "Contextual inquiry and field observation",
      "Survey design and analysis",
      "Usability testing moderation",
      "Participant recruitment in Nigerian contexts",
      "Affinity mapping and thematic synthesis",
      "Personas and journey maps that earn their keep",
      "Jobs-to-be-done framing",
      "Problem definition and opportunity sizing",
      "Prioritisation frameworks",
    ],
    projects: [
      {
        name: "Full research cycle",
        description:
          "Interviews, synthesis and insights for a real local business, delivered as an actionable findings report.",
      },
      {
        name: "Usability test programme",
        description:
          "Plan, moderate, analyse and report a five-participant usability study with prioritised fixes.",
      },
    ],
    assessment:
      "Research artifacts reviewed against rigour criteria, moderation observed and scored live, and a strategy presentation defending recommendations with evidence.",
  },
  "product-ui-ux-design--interface-design-systems": {
    overview: [
      "Products outgrow ad-hoc screens; mature teams run design systems. This module takes you from designing single interfaces to architecting the component libraries and patterns that keep products coherent as they scale.",
      "Interaction design foundations come first — affordances, feedback, constraints, mental models — applied to the patterns users meet daily: navigation, forms, tables, empty states, errors, onboarding. Mobile-first responsive layouts are designed for real device ranges, including the low-end Android reality of most Nigerian users, with offline states and constrained bandwidth treated as first-class scenarios.",
      "Design systems form the module's spine: design tokens (colour, type, spacing, radius, elevation), component anatomy with variants and states, documentation that engineers actually read, accessibility baked into specifications, and handoff workflows with versioned libraries. You build a small but complete system in Figma — tokens through components through documented patterns — then apply it across a multi-screen product, experiencing firsthand why systems beat screen-by-screen design.",
    ],
    topics: [
      "Interaction principles and heuristics",
      "Common patterns: navigation, forms, tables",
      "Empty, error and loading states",
      "Mobile-first responsive layout",
      "Low-bandwidth and offline UX",
      "Design tokens architecture",
      "Component variants and interaction states",
      "Accessibility specification (WCAG in practice)",
      "Documentation and handoff workflow",
      "Versioned Figma libraries",
    ],
    projects: [
      {
        name: "Mini design system",
        description:
          "Tokenised, componentised, documented system covering 12+ components across states.",
      },
      {
        name: "Multi-screen product design",
        description:
          "A complete product flow (8–12 screens) built entirely from your system, responsive across breakpoints.",
      },
    ],
    assessment:
      "System review for completeness and consistency, accessibility audit of your screens, and handoff simulation with a developer teammate grading your specs.",
  },
  "product-ui-ux-design--prototyping-testing": {
    overview: [
      "Ideas earn belief through prototypes and survive contact with users through testing. This module makes both loops fast, rigorous and habitual.",
      "Prototyping progresses from wireframe flows through high-fidelity interactive prototypes in Figma to code-based micro-interactions. You learn fidelity matching — choosing the cheapest prototype that answers the current question — plus animation principles that guide attention rather than decorate, prototyped in Figma smart-animate and basic CSS motion.",
      "Testing then interrogates the prototypes: unmoderated and moderated usability tests, first-click and five-second tests, A/B concept comparisons, heuristic evaluations, and accessibility testing with screen readers and keyboard-only navigation. Metrics close the loop: task success rates, time-on-task, System Usability Scale, and converting findings into ranked, actionable revisions. The iteration rhythm — prototype, test, revise, repeat — runs weekly until it feels like breathing.",
    ],
    topics: [
      "Fidelity selection and rapid wireframing",
      "High-fidelity interactive prototypes",
      "Animation principles and purposeful motion",
      "Unmoderated testing platforms",
      "Moderated test facilitation",
      "First-click and five-second methods",
      "Heuristic evaluation",
      "Accessibility testing: screen readers, keyboards",
      "Usability metrics and SUS",
      "Findings-to-revision workflow",
    ],
    projects: [
      {
        name: "Tested product redesign",
        description:
          "Redesign a flawed local product interface, validated through three rounds of user testing.",
      },
      {
        name: "Motion prototype",
        description:
          "Animated interaction sequence demonstrating purposeful motion guiding a critical user flow.",
      },
    ],
    assessment:
      "Testing rigour audited from session recordings, revision quality measured against original findings, and a final usability benchmark showing measurable improvement.",
  },
  "product-ui-ux-design--portfolio-studio": {
    overview: [
      "Clients and employers hire portfolios, not certificates. This studio-format module converts your four modules of work into a portfolio that wins opportunities — and rehearses you presenting it under pressure.",
      "Case study craft dominates: selecting projects strategically, structuring narratives around problem–process–outcome, showing iteration honestly (including failed directions and why), quantifying impact credibly, and writing for skimming executives. Visual presentation receives equal force — layout, pacing and the polish signals that separate considered portfolios from template dumps.",
      "Portfolio infrastructure follows: personal site options weighed honestly (custom domain expected, platform tradeoffs explained), SEO basics for discoverability, and tailoring variants for different audiences (fintech product roles vs agency gigs). Studio sessions run like design critiques with stakes: present your case studies, face practitioner panels, handle objections and questions, and refine until your story lands in five minutes. Mock interviews with working designers close the module.",
    ],
    topics: [
      "Project selection and narrative strategy",
      "Case study structure and storytelling",
      "Showing process without padding",
      "Quantifying impact credibly",
      "Portfolio site architecture",
      "Audience-tailored portfolio variants",
      "Presentation rehearsal and delivery",
      "Interview questioning and objection handling",
    ],
    projects: [
      {
        name: "Portfolio site launch",
        description:
          "Live portfolio with 3–4 polished case studies, custom domain, reviewed by practitioners.",
      },
      {
        name: "Panel defence",
        description:
          "Formal presentation of your portfolio to an industry panel with Q&A — rehearsed to competence.",
      },
    ],
    assessment:
      "Portfolio reviewed against hiring-manager rubrics, presentation scored on clarity and poise, and completion of at least two mock interviews with recorded feedback.",
  },
  "digital-marketing-growth--marketing-fundamentals": {
    overview: [
      "Marketing careers collapse when practitioners chase tactics without strategy. This module installs the strategic layer: positioning, segmentation, messaging and the economics that determine whether growth is real or vanity.",
      "You start with markets: segmentation and targeting applied to Nigerian consumer diversity, competitor analysis, positioning statements that survive contact with sales conversations, and value propositions tested against real customer language. Messaging architecture follows — benefit ladders, message-market fit, and tone calibration across Nigeria's multilingual, status-conscious consumer landscape.",
      "Unit economics anchor everything: LTV, CAC, payback periods and channel-level profitability, taught with Nigerian price points and payment behaviours. Channel landscape surveying covers what each channel (search, social, WhatsApp, email, influencers, radio remnant) genuinely does and costs locally. The module closes with your first full campaign plan for a real local business — strategy, channels, budget, measurement — defended before the cohort.",
    ],
    topics: [
      "Segmentation, targeting, positioning",
      "Competitive analysis frameworks",
      "Value proposition and message-market fit",
      "Messaging architecture and tone",
      "Nigerian consumer behaviour drivers",
      "LTV, CAC and unit economics",
      "Channel economics and selection",
      "Campaign planning and budgeting",
    ],
    projects: [
      {
        name: "Positioning teardown",
        description:
          "Analyse and reposition a real Nigerian brand, with revised messaging tested on actual consumers.",
      },
      {
        name: "Go-to-market campaign plan",
        description:
          "Full campaign plan for a local business: research, strategy, channel mix, budget and KPIs.",
      },
    ],
    assessment:
      "Campaign plan reviewed against unit-economics rigour, consumer-testing evidence required, and plan defence before cohort and invited business owners.",
  },
  "digital-marketing-growth--paid-acquisition": {
    overview: [
      "Paid media rewards precision and punishes guesswork. This module makes you dangerous on Meta and Google Ads — and honest about what paid traffic can and cannot fix.",
      "Meta Ads receives the deepest treatment given its dominance in Nigerian digital spending: account structure, pixel and Conversions API setup, audience strategy (broad vs detailed targeting in the post-targeting-signal era), creative testing frameworks, budget scaling rules, retargeting architecture and the measurement discipline (attribution windows, lift reading) that keeps spend accountable.",
      "Google Ads follows: search intent capture with keyword match types, negative keyword hygiene, Shopping campaigns for retail, Performance Max with feed quality, and Quality Score economics. Landing page conversion gets dedicated attention because sending paid traffic to weak pages is burning money politely. Throughout, you manage real small budgets (provided by the academy for structured exercises) on real accounts — because simulated campaigns teach nothing about the emotional discipline of spending actual naira.",
    ],
    topics: [
      "Meta Ads account architecture",
      "Pixel, Conversions API and event setup",
      "Audience strategy and broad targeting",
      "Creative testing frameworks",
      "Budget pacing and scaling rules",
      "Retargeting and funnel sequencing",
      "Google Search: keywords, match types, negatives",
      "Quality Score and auction dynamics",
      "Performance Max and feed quality",
      "Attribution and incrementality basics",
      "Landing page conversion alignment",
    ],
    projects: [
      {
        name: "Live campaign management",
        description:
          "Run a real ₦50,000+ campaign on academy-funded accounts with weekly optimisation reviews.",
      },
      {
        name: "Full-funnel retargeting build",
        description:
          "Architect and launch a complete cold-warm-hot funnel with creative sequenced by temperature.",
      },
    ],
    assessment:
      "Campaign results reviewed for learning velocity (what did you test and kill?), optimisation log quality, and a live account audit by a practising media buyer.",
  },
  "digital-marketing-growth--content-seo-social": {
    overview: [
      "Content compounds; interruption decays. This module teaches organic growth as an engineered system: SEO built technically sound, content planned strategically, social distribution designed natively per platform.",
      "SEO coverage spans the three pillars: technical (site architecture, crawlability, Core Web Vitals, schema), on-page (search intent matching, title/meta craft, internal linking architecture, content depth standards) and off-page (digital PR, local citations for Nigerian businesses, link earning vs link buying with Google's enforcement reality explained honestly). Keyword research is taught as demand archaeology — finding questions Nigerians actually search.",
      "Content strategy connects search to brand: topic clusters, editorial calendars tied to business goals, repurposing systems that multiply reach from single efforts. Social gets platform-native treatment — Instagram, TikTok, X, LinkedIn, YouTube Shorts — with format-specific craft and community-building over follower-count vanity. WhatsApp Business, arguably Nigeria's most commercially important channel, receives dedicated coverage: catalogues, broadcast ethics, community management and commerce flows.",
    ],
    topics: [
      "Technical SEO essentials",
      "Search intent and on-page optimisation",
      "Keyword research for the Nigerian market",
      "Internal linking architecture",
      "Local SEO and citations",
      "Digital PR and ethical link earning",
      "Topic clusters and content calendars",
      "Platform-native social craft",
      "WhatsApp Business commerce",
      "Repurposing systems",
    ],
    projects: [
      {
        name: "SEO audit and remediation",
        description:
          "Audit a real Nigerian SME site, implement fixes, track ranking movement over eight weeks.",
      },
      {
        name: "Content engine launch",
        description:
          "Build and run a month of content for a partner business: cluster plan, four assets, social distribution, measured outcomes.",
      },
    ],
    assessment:
      "Audit quality benchmarked against professional tools' findings, content performance tracked against baselines, and strategy documentation reviewed for repeatability.",
  },
  "digital-marketing-growth--funnels-cro": {
    overview: [
      "Traffic is expensive; conversion is leverage. This module teaches you to multiply results from existing traffic through funnel architecture and disciplined experimentation — the highest-paid specialisation in growth marketing.",
      "Funnel design starts the module: mapping customer journeys from first touch to repeat purchase, identifying leak stages with analytics, and architecting intentional funnels (lead magnets, nurture sequences, offer laddering) suited to Nigerian buying behaviour — WhatsApp-heavy communication, trust-deficient environments, mobile-first everything.",
      "Conversion rate optimisation forms the technical core: quantitative analysis in GA4 and heatmapping tools, qualitative research (session recordings, polls, exit surveys), hypothesis prioritisation frameworks (ICE/PIE), A/B testing with statistical honesty (sample sizes, peeking, false positives), and the craft knowledge of what typically moves conversion: friction removal, trust signals, urgency ethics, form simplification, checkout flow repair. You run real experiments on cohort properties and partner sites, accumulating wins and instructive failures alike.",
    ],
    topics: [
      "Journey mapping and funnel mathematics",
      "Leak analysis with GA4",
      "Lead magnets and nurture sequences",
      "Offer laddering",
      "Heatmaps, recordings, polls, surveys",
      "Hypothesis frameworks and backlog management",
      "Statistical honesty in A/B testing",
      "Friction, trust and urgency levers",
      "Form and checkout optimisation",
    ],
    projects: [
      {
        name: "Funnel rebuild",
        description:
          "Diagnose and rebuild a leaking funnel for a real business, documenting each intervention's reasoning.",
      },
      {
        name: "Experimentation programme",
        description:
          "Four-plus A/B tests run to conclusion with statistically sound readouts, win or lose.",
      },
    ],
    assessment:
      "Experiment rigour audited (sample sizes, test durations, conclusions drawn), funnel metrics before/after, and a CRO playbook documenting your repeatable process.",
  },
  "digital-marketing-growth--analytics-capstone": {
    overview: [
      "Marketers who measure well outrun marketers who spend well. This closing module builds your analytics spine — GA4 mastery, dashboard craft, attribution literacy — then consolidates the entire programme into a growth capstone for a real business.",
      "GA4 receives practitioner-depth treatment: property architecture and events, enhanced conversions, exploration reports, audience building and the honest handling of its known limitations. Dashboard engineering follows in Looker Studio: metrics hierarchies, scorecards executives read, channel deep-dives analysts need, and the automation that keeps reporting alive after you move on. Attribution gets philosophical grounding — last-click lies, model comparisons, incrementality thinking — calibrated to what Nigerian businesses can actually act on.",
      "The capstone then runs the full programme's arc: take a partner business from audit through strategy, execution across paid/content/CRO, measurement infrastructure, and a final growth review presenting results, learnings and a forward roadmap. It is simultaneously your best portfolio artefact and the closest simulation of the actual job.",
    ],
    topics: [
      "GA4 architecture, events, conversions",
      "Exploration and segment analysis",
      "Looker Studio dashboard engineering",
      "Reporting automation",
      "Attribution models and their limits",
      "Incrementality thinking",
      "KPI trees and metric hierarchy",
      "Growth review presentations",
    ],
    projects: [
      {
        name: "Measurement system implementation",
        description:
          "Full GA4 + Looker Stack installed, validated and documented for a partner business.",
      },
      {
        name: "Growth capstone",
        description:
          "Quarter-long growth engagement: strategy, execution, measurement and boardroom-grade final review.",
      },
    ],
    assessment:
      "Implementation validated against QA checklist, dashboard adoption judged by the actual business owner, and capstone defence scored by practising growth leads.",
  },
  "networking-it-support--hardware-operating-systems": {
    overview: [
      "IT support careers begin with hardware you can fix and operating systems you can command. This module delivers both, oriented toward CompTIA A+ competency and the daily realities of supporting Nigerian offices.",
      "Hardware coverage moves from component recognition through genuine repair skills: PC assembly and upgrades, laptop disassembly, RAM/storage replacement, printer mechanics, mobile device repair basics, BIOS/UEFI configuration, and systematic hardware troubleshooting with the replace-and-isolate method. Sourcing parts in Nigerian markets — genuine vs counterfeit components, warranty realities — gets honest treatment.",
      "Operating systems split between Windows administration (installation, driver management, user accounts, Group Policy basics, registry literacy, recovery environments, Active Directory introduction) and Linux desktop/server fundamentals (installation, package management, terminal confidence, systemd services). Preventive maintenance discipline — imaging, backup regimes, patch cadence, asset documentation — closes the module, because the best support technicians prevent tickets rather than heroically resolve them.",
    ],
    topics: [
      "PC components, assembly and upgrades",
      "Laptop repair and component replacement",
      "BIOS/UEFI and firmware updates",
      "Printer and peripheral servicing",
      "Windows installation, drivers and recovery",
      "Active Directory and domain basics",
      "Registry and system configuration",
      "Linux installation and administration",
      "Backup, imaging and preventive maintenance",
      "Asset and documentation practices",
    ],
    projects: [
      {
        name: "Build-and-document a workstation",
        description:
          "Source components locally, assemble, configure and document a complete workstation within a budget.",
      },
      {
        name: "OS deployment lab",
        description:
          "Automate Windows and Linux installations with drivers and baseline config, imaged for reuse.",
      },
      {
        name: "Repair clinic rotation",
        description:
          "Real devices from the community diagnosed and repaired under supervision, logged professionally.",
      },
    ],
    assessment:
      "Timed hardware practicals (diagnose this dead machine), OS administration exams, and repair-log quality review.",
  },
  "networking-it-support--networking-essentials": {
    overview: [
      "Networks connect everything; support technicians who understand them deeply rise fastest. This module builds networking fundamentals to CompTIA Network+ depth, taught through labs you build yourself.",
      "Conceptual grounding covers OSI and TCP/IP models as diagnostic frameworks, IPv4 addressing and subnetting to fluency, IPv6 essentials, and the protocols carrying daily work: TCP/UDP behaviour, DNS resolution chains, DHCP leases, ARP, ICMP diagnostics, HTTP(S) and mail flows. Packet analysis with Wireshark makes the abstract visible — you watch handshakes happen.",
      "Practical skills dominate lab time: crimping and testing cable, configuring SOHO routers and wireless APs properly (channels, bands, security modes, guest isolation), VLAN-aware switch configuration, network documentation with diagrams, and structured troubleshooting methodology — physical, logical, protocol layers in order. Nigerian context threads throughout: unreliable ISP links, load-balancing dual-WAN setups common in local offices, and power-resilient network closet design.",
    ],
    topics: [
      "OSI/TCP-IP models as troubleshooting maps",
      "IPv4 subnetting to fluency",
      "IPv6 fundamentals",
      "TCP/UDP, DNS, DHCP, ARP, ICMP in practice",
      "Wireshark packet analysis",
      "Cabling, termination and testing",
      "SOHO router and wireless configuration",
      "Switch and VLAN basics",
      "Network documentation and diagramming",
      "Layered troubleshooting methodology",
    ],
    projects: [
      {
        name: "Office network build",
        description:
          "Design, cable, configure and document a complete small-office network including wireless and guest access.",
      },
      {
        name: "Protocol investigation portfolio",
        description:
          "Capture-and-explain dossier: ten protocols analysed live in Wireshark with annotated packets.",
      },
    ],
    assessment:
      "Subnetting exams under time pressure, hands-on network configuration assessments, and troubleshooting stations where broken networks await diagnosis.",
  },
  "networking-it-support--routing-switching": {
    overview: [
      "Beyond the office LAN lies the routed enterprise — and the CCNA-level skills Nigerian enterprises, ISPs and banks require for network roles. This module takes you there with Cisco gear and its vendor-neutral concepts.",
      "Switching depth arrives first: VLANs and trunking, STP operation and convergence, ether-channel, inter-VLAN routing, port security and switch hardening. Routing follows: static routing discipline, dynamic protocols with OSPF as the deep dive, route summarisation, first-hop redundancy (HSRP), ACLs as both security and traffic tools, and NAT at scale.",
      "WAN and infrastructure services complete the picture: serial and ethernet WAN connectivity concepts, PPP, GRE tunnels, QoS fundamentals, DHCP relay, NTP, Syslog, SNMP monitoring and basic network automation exposure (REST APIs, Ansible introduction) reflecting where the industry is heading. Labs run on physical Cisco switches/routers and Packet Tracer/SIM alternatives, with configuration verified against working topologies rather than paper designs.",
    ],
    topics: [
      "VLANs, trunks and inter-VLAN routing",
      "STP and convergence tuning",
      "Ether-channel and link aggregation",
      "Static and dynamic routing (OSPF deep dive)",
      "Route summarisation",
      "HSRP and first-hop redundancy",
      "ACLs: security and traffic management",
      "NAT architectures",
      "WAN concepts and tunnels",
      "QoS fundamentals",
      "Network monitoring and management",
      "Automation exposure: APIs, Ansible intro",
    ],
    projects: [
      {
        name: "Enterprise campus topology",
        description:
          "Multi-building campus network with redundancy, segmentation and full documentation — built and defended.",
      },
      {
        name: "CCNA practice battery",
        description:
          "Timed configuration and troubleshooting labs mirroring certification exam conditions.",
      },
    ],
    assessment:
      "Configuration practicals graded on working outcomes, troubleshooting challenges against sabotaged networks, and readiness checkpoint aligned to CCNA domains.",
  },
  "networking-it-support--enterprise-support-desk": {
    overview: [
      "Technical skill without service discipline caps careers at junior levels. This module builds the enterprise support professional: structured ticketing, SLA awareness, escalation judgment and the communication craft that turns frustrated users into allies.",
      "ITIL-informed service management comes first: incident vs problem vs change management, priority matrices, SLAs and what breaching them actually means, knowledge-base authoring that colleagues genuinely use, and asset/configuration management basics. Ticket systems are mastered hands-on — you live in a helpdesk platform processing realistic queues.",
      "Communication receives deliberate coaching: intake questioning that diagnoses without condescension, expectation-setting in plain language, status updates that pre-empt frustration, de-escalation with angry stakeholders, and documentation readable by non-technical readers. Remote support tooling, password/identity management workflows, MFA rollouts and endpoint management (Intune/MDM exposure) round out the modern support stack. Role-played scenarios run throughout — difficult users, executive escalations, ambiguous reports — because soft skills decay without reps.",
    ],
    topics: [
      "ITIL service management concepts",
      "Priority, SLA and escalation frameworks",
      "Helpdesk platform operations",
      "Knowledge-base authorship",
      "Diagnostic interviewing",
      "De-escalation and difficult conversations",
      "Status communication and expectation management",
      "Remote support tooling",
      "Identity, MFA and password workflows",
      "Endpoint management exposure (Intune/MDM)",
    ],
    projects: [
      {
        name: "Live desk rotation",
        description:
          "Staff the academy's real support queue for two weeks under mentor supervision, with metrics.",
      },
      {
        name: "KB article portfolio",
        description: "Ten knowledge-base articles published and rated by actual colleague usage.",
      },
      {
        name: "Escalation simulation suite",
        description:
          "Role-played difficult scenarios recorded, reviewed and coached to competence.",
      },
    ],
    assessment:
      "Ticket quality metrics from your rotation (first-contact resolution, CSAT, SLA adherence), KB article usefulness ratings, and observed communication assessments.",
  },
  "networking-it-support--field-practicum": {
    overview: [
      "Employers hire proven performers, and this practicum manufactures proof: four weeks embedded in real support environments — partner businesses, schools, clinics and NGOs around Port Harcourt — doing the actual job under professional supervision.",
      "Placement matching considers your strengths and interests: SMB IT departments needing versatile generalists, MSPs running multi-client queues, school/clinic environments with constrained budgets and creative fixes, or NGO operations with donor-reporting discipline. You work real tickets on real systems with real consequences, supervised by host-site mentors and visited fortnightly by CEA faculty.",
      "Deliverables structure the experience: a reflective log connecting daily work to curriculum concepts, a capstone improvement project (document something, automate something, fix a recurring problem systematically), and a professional reference from your host supervisor. Weekly cohort debriefs surface lessons across placements — the collective learning exceeds any single site's view. Graduates leave with work history, references and the settled confidence of someone who has done the job, not just studied it.",
    ],
    topics: [
      "Professional workplace conduct",
      "Host-site onboarding and systems literacy",
      "Real-ticket resolution under supervision",
      "Capstone improvement project scoping",
      "Reflective practice and logging",
      "Reference cultivation",
    ],
    projects: [
      {
        name: "Four-week placement",
        description:
          "Embedded support work at a partner organisation with documented contributions.",
      },
      {
        name: "Improvement capstone",
        description:
          "Identify, propose and implement a durable improvement to host-site IT operations.",
      },
    ],
    assessment:
      "Host supervisor evaluation weighted primarily, capstone project review, reflective log quality, and completion of placement hours.",
  },
  "mobile-app-development--mobile-foundations": {
    overview: [
      "Mobile development rewards engineers who understand the platform beneath the framework. This module grounds you in how phones actually work — and how Nigerians actually use them — before React Native adds its abstraction layer.",
      "Mobile platform fundamentals cover Android and iOS architecture, the touch-first interaction model, screen density and fragmentation realities, permission systems and privacy expectations, app lifecycle and state restoration, and mobile-specific constraints: battery, memory, thermal throttling and the intermittent connectivity that defines much of the Nigerian user experience.",
      "JavaScript-for-mobile refresher transitions into React Native's mental model: how RN bridges JavaScript and native, the component tree rendered to native widgets, Expo versus bare workflow trade-offs, and your first running apps on real devices via Expo Go. Development environment setup gets careful attention because emulator pain kills motivation early. The module closes with a small complete app — several screens, navigation, persistent local state — shipped to your own phone and your classmates': the emotional milestone of holding software you made.",
    ],
    topics: [
      "Android and iOS platform architecture",
      "Touch interaction and platform conventions",
      "Screen density and device fragmentation",
      "Permissions and privacy models",
      "App lifecycle and state",
      "Battery, memory and thermal constraints",
      "Offline-first thinking for Nigerian users",
      "React Native bridging concepts",
      "Expo workflow and device testing",
      "Navigation fundamentals",
    ],
    projects: [
      {
        name: "First complete app",
        description:
          "Multi-screen app with navigation and persistence, running on your own device.",
      },
      {
        name: "Device matrix report",
        description:
          "Test your app across classmates' devices; document and fix fragmentation issues found.",
      },
    ],
    assessment:
      "Working-app demonstrations on real hardware, platform-concept quizzes, and code review focused on mobile-appropriate patterns.",
  },
  "mobile-app-development--react-native-core": {
    overview: [
      "This module is the heart of the programme: React Native development to employable depth. You build the interfaces, state management and native integrations that real apps demand.",
      "Core UI comes first: RN's primitive components (View, Text, ScrollView, FlatList), StyleSheet and Flexbox mastery for adaptive layouts, responsive strategies across phone sizes, and platform-adaptive behaviour where Android and iOS conventions diverge. Lists receive special attention — FlatList performance, optimisation, pull-to-refresh and infinite scroll — because list screens dominate real apps and interview questions alike.",
      "Application architecture follows: navigation patterns (stack, tabs, drawer) with typed routing, state management scaled appropriately (local state → Context → Zustand), forms with validation, and animations with Reanimated for the interactions users judge quality by. Native integration covers camera, location, notifications and haptics through Expo SDK. Testing closes the module: Jest unit tests, Testing Library component tests, and Detox/E2E exposure. Throughout, TypeScript is mandatory — matching how serious RN teams work.",
    ],
    topics: [
      "RN primitives and styling systems",
      "Flexbox layouts for adaptive screens",
      "FlatList performance and patterns",
      "Typed navigation (stack/tabs/drawer)",
      "State architecture at scale",
      "Forms and validation",
      "Reanimated animations and gestures",
      "Camera, location, notifications (Expo SDK)",
      "Platform-specific code",
      "Jest and Testing Library",
    ],
    projects: [
      {
        name: "Consumer-grade app build",
        description:
          "A polished multi-flow app (auth, lists, detail, settings) with animations and tests.",
      },
      {
        name: "Performance audit",
        description:
          "Profile and optimise a janky app: render reduction, list virtualisation, animation offloading.",
      },
    ],
    assessment:
      "Code review against production RN standards, app performance benchmarks on low-end devices specifically, and feature-build practicals from written specs.",
  },
  "mobile-app-development--data-offline-sync": {
    overview: [
      "Nigerian users live on intermittent connections, and apps that handle that reality win loyal markets. This module makes offline-first your instinct: local databases, sync engines and conflict resolution that keep apps useful when networks fail.",
      "Local persistence progresses from simple storage through SQLite (via expo-sqlite/WatermelonDB) with proper schema design and migrations, to reactive local databases driving UI directly. Key-value storage, secure storage for tokens/secrets, and cache strategies each get correct-use guidance.",
      "Sync architecture is the module's summit: optimistic updates with rollback, queue-and-retry patterns for mutations, background sync scheduling within OS constraints, conflict detection and resolution strategies (last-write-wins vs CRDT-lite merges vs user-prompted), and partial/failure-state UX that keeps users informed without alarming them. You build a notes/task app that works flawlessly in airplane mode and reconciles gracefully on reconnect — then stress-test it with throttled and dropping connections. Data synchronisation bugs sink real products; engineers who prevent them are rare and valued.",
    ],
    topics: [
      "Storage options and selection criteria",
      "SQLite schemas and migrations",
      "Reactive local databases",
      "Secure storage for credentials",
      "Cache invalidation strategies",
      "Optimistic updates with rollback",
      "Mutation queues and retry semantics",
      "Background sync within OS limits",
      "Conflict resolution strategies",
      "Offline-state UX patterns",
    ],
    projects: [
      {
        name: "Offline-first notes app",
        description:
          "Full CRUD app surviving airplane mode, syncing bidirectionally with conflict-safe reconciliation.",
      },
      {
        name: "Chaos testing suite",
        description:
          "Scripted network degradation tests proving your sync survives drops, duplicates and clock skew.",
      },
    ],
    assessment:
      "Chaos-suite survival is binary (your app handles it or it doesn't), code review of sync logic, and a written architecture defence of your conflict-resolution choices.",
  },
  "mobile-app-development--native-modules-release": {
    overview: [
      "Serious apps eventually need what frameworks don't provide — and shipping to stores is its own discipline. This module covers both: native module development and the complete release pipeline.",
      "Native modules first: when escaping to native is justified, Swift/Kotlin fundamentals sufficient for bridge work, Turbo Modules architecture, exposing native APIs to JS, and integrating existing native SDKs (payment SDKs, Bluetooth libraries) that Nigerian fintech apps routinely require. You build a working custom module end to end.",
      "Release engineering dominates the remainder: app signing and keystores managed safely, iOS App Store guidelines and review navigation (including rejection-avoidance patterns), Google Play Console operations, build flavours and environment separation (dev/staging/prod), over-the-air updates with Expo Updates within store rules, crash reporting with Sentry, and release choreography — phased rollouts, feature flags, monitoring dashboards and rollback plans. You ship a real app to both stores' test tracks, experiencing review feedback firsthand in a controlled setting.",
    ],
    topics: [
      "Native module justification and architecture",
      "Swift/Kotlin bridging essentials",
      "Turbo Modules and JS-Native contracts",
      "Third-party SDK integration",
      "Signing, keystores and secrets",
      "App Store / Play Store submission craft",
      "Build flavours and environments",
      "OTA updates and their constraints",
      "Crash reporting with Sentry",
      "Phased rollout and release choreography",
    ],
    projects: [
      {
        name: "Custom native module",
        description:
          "Bridge a native capability to JS with proper typing, error handling and documentation.",
      },
      {
        name: "Store-track release",
        description:
          "Ship an app through internal/closed testing tracks on both stores, responding to real review feedback.",
      },
    ],
    assessment:
      "Working native module demonstrated on device, successful store-track submissions verified, and release-process documentation quality reviewed.",
  },
  "mobile-app-development--store-launch-capstone": {
    overview: [
      "The capstone asks everything of you: conceive, validate, build and launch a production mobile app to public stores — the complete founder-developer experience compressed into one supported sprint.",
      "Ideation begins with validation discipline: identifying a genuine problem (marketplace projects and community partners provide briefs, or bring your own for approval), scoping an MVP ruthlessly, and defining success metrics before writing code. A launch-readiness review gates development: designs, architecture, offline strategy, monetisation approach and analytics plan approved by faculty before major investment begins.",
      "Development runs in sprints with mentor code review, followed by the launch phase this programme uniquely emphasizes: store listings crafted for conversion (screenshots, descriptions, ASO keywords), beta testing with real Nigerian users recruited from the community, crash-free stability targets met, phased public rollout executed with monitoring, and post-launch iteration driven by actual usage data. Launch day is celebrated properly — then the retention numbers become your teacher. Graduates finish with a public store presence bearing their name, which no certificate can match.",
    ],
    topics: [
      "Problem validation and MVP scoping",
      "Launch-readiness review discipline",
      "Sprint development with mentorship",
      "App Store Optimisation (ASO)",
      "Beta testing programmes",
      "Stability and quality gates",
      "Phased rollout execution",
      "Analytics-driven post-launch iteration",
    ],
    projects: [
      {
        name: "Public store launch",
        description:
          "Your app, live on Google Play (and App Store where feasible), with real users and analytics.",
      },
      {
        name: "Launch retrospective",
        description:
          "Data-backed review of launch outcomes, user feedback themes and the next iteration plan.",
      },
    ],
    assessment:
      "Public launch achieved (hard requirement), retrospective quality, store-listing conversion craft, and the app's stability metrics in its first weeks.",
  },
};

export function getModuleKey(programSlug: string, moduleSlug: string): string {
  return `${programSlug}--${moduleSlug}`;
}

export function slugifyModuleTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
