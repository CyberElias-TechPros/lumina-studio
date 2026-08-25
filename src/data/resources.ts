export interface Resource {
  slug: string;
  title: string;
  tagline: string;
  category: "templates" | "checklists" | "guides" | "cheat-sheets";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeToComplete: string;
  overview: string[];
  whatYouGet: string[];
  steps: { title: string; description: string; tips?: string[] }[];
  relatedSlugs?: string[];
}

export const resources: Resource[] = [
  {
    slug: "tech-resume-template",
    title: "Tech Resume Template",
    tagline: "A clean, ATS-friendly resume template designed for Nigerian tech roles — frontend, backend, cloud, security, data and design.",
    category: "templates",
    difficulty: "Beginner",
    timeToComplete: "30 minutes",
    overview: [
      "Most tech resumes in Nigeria fail because they either follow generic templates that ignore technical hiring conventions or list technologies without demonstrating competence. This template solves both problems: it is structured the way engineering managers actually screen candidates and formatted to pass ATS systems.",
      "The template includes sections for technical skills (grouped by relevance, not alphabetically), project experience (with measurable outcomes, not just technology lists), work history (focused on impact, not responsibilities) and education (placed where it belongs for experienced candidates). Each section includes instructions for what to write and examples specific to Nigerian tech roles.",
      "Instructions are included for tailoring the template to specific role types: frontend, backend, full-stack, cloud, security, data and design. The guide also covers common mistakes that cause resumes to be discarded and how to position experience from non-tech backgrounds.",
    ],
    whatYouGet: [
      "ATS-friendly resume template (Google Docs, Notion and PDF formats)",
      "Role-specific examples for 8 specialisations",
      "Before/after rewrites showing improvement",
      "Cover letter template included",
      "LinkedIn headline formulas for Nigerian tech market",
    ],
    steps: [
      {
        title: "Choose your role template",
        description: "Select the template variant matching your target role (frontend, backend, cloud, security, data, design, full-stack or mobile). Each variant pre-fills relevant skills and project examples.",
      },
      {
        title: "Write your technical skills section",
        description: "List technologies grouped by category (Languages, Frameworks, Tools, Cloud). Order by proficiency and relevance to the target role — never alphabetically. Include version numbers for key tools.",
        tips: [
          "Put the technologies mentioned in the job description first",
          "Include only technologies you can discuss confidently in an interview",
          "Group into Languages, Frameworks, Databases, Tools, Cloud",
        ],
      },
      {
        title: "Document your projects",
        description: "For each project, write: what it does, what technologies you used, what your specific contribution was and what measurable outcome resulted. Use the formula: 'Built [X] using [Y] that [Z result]'.",
        tips: [
          "Include links to live deployments and GitHub repos",
          "Quantify outcomes: 'reduced load time by 40%', 'handles 10,000 daily users'",
          "Focus on projects that demonstrate the skills the job requires",
        ],
      },
      {
        title: "Position your work history",
        description: "For each role, list 3-5 bullet points starting with strong verbs (Built, Deployed, Reduced, Led, Automated). Focus on outcomes and scale, not daily tasks. Include team size and technology stack context.",
      },
      {
        title: "Add education and certifications",
        description: "Place education after work experience if you have 2+ years of professional experience. List certifications relevant to the target role. Include expected completion dates for in-progress qualifications.",
      },
      {
        title: "Format and export",
        description: "Keep to 1-2 pages. Use consistent formatting: same font, same heading sizes, same spacing. Export as PDF with the filename format: firstname-lastname-role-resume.pdf.",
        tips: [
          "Test ATS compatibility by copying text from the PDF — it should paste cleanly",
          "Remove graphics, columns and text boxes that confuse ATS parsers",
          "Ensure all links are clickable in the PDF",
        ],
      },
    ],
  },
  {
    slug: "github-profile-readme",
    title: "GitHub Profile README Template",
    tagline: "Stand out to hiring managers with a professional GitHub profile that showcases your work and communicates your skills clearly.",
    category: "templates",
    difficulty: "Beginner",
    timeToComplete: "45 minutes",
    overview: [
      "Your GitHub profile is often the first technical artefact hiring managers examine. A well-crafted profile README communicates professionalism, clarity of thought and technical competence — three qualities that influence hiring decisions before an interview happens.",
      "This template provides a structure that highlights your strongest projects, communicates your technical interests clearly and demonstrates the communication skills that employers value. It includes sections for your introduction, featured projects, current learning, tech stack badges and contact information.",
      "The guide explains how to choose which projects to feature (hint: not all your repos matter equally), how to write project descriptions that demonstrate understanding rather than listing technologies, and how to keep the profile updated without it becoming a maintenance burden.",
    ],
    whatYouGet: [
      "README.md template with sections and formatting",
      "Technology badge collection for common Nigerian tech stacks",
      "Project description formulas that demonstrate competence",
      "GitHub Actions workflow for auto-updating stats",
      "Examples from 5 strong Nigerian developer profiles",
    ],
    steps: [
      {
        title: "Create your profile repository",
        description: "Create a repository with the exact same name as your GitHub username. This special repository renders its README.md on your profile page. Enable it by creating any repository with your username.",
      },
      {
        title: "Write your introduction",
        description: "Write 2-3 sentences about who you are, what you build and what you are currently learning. Avoid generic phrases like 'passionate developer'. Be specific about your domain and current focus.",
        tips: [
          "Start with your role and domain: 'Backend engineer building payment APIs for Nigerian fintechs'",
          "Mention your current learning focus to show growth mindset",
          "Include your location and preferred work arrangement",
        ],
      },
      {
        title: "Add featured projects",
        description: "Select 3-5 projects that best represent your skills. For each project, write a one-line description of what it does (not what technologies it uses), include a screenshot or demo link, and link to the repository.",
        tips: [
          "Choose projects with good READMEs and recent commit history",
          "Include at least one project deployed to production",
          "Show variety: different technologies, different problem domains",
        ],
      },
      {
        title: "Add tech stack badges",
        description: "Use shields.io badges to display your technology stack visually. Group by category: Languages, Frameworks, Databases, Tools, Cloud. Keep to technologies you use regularly — not everything you have touched.",
      },
      {
        title: "Add GitHub stats (optional)",
        description: "Include GitHub contribution stats using github-readme-stats or similar tools. These provide visual proof of consistent activity, which matters more than total commit count.",
      },
      {
        title: "Add contact and links",
        description: "Include links to your LinkedIn, portfolio site, blog and preferred contact method. Make it easy for interested hiring managers to reach you.",
      },
    ],
  },
  {
    slug: "portfolio-checklist",
    title: "Portfolio Site Checklist",
    tagline: "The complete checklist for building a portfolio site that actually helps you get hired — covering content, design, technical and SEO requirements.",
    category: "checklists",
    difficulty: "Intermediate",
    timeToComplete: "1-2 weeks",
    overview: [
      "A portfolio site that does not convert visitors into interviews is a hobby project. This checklist ensures your portfolio accomplishes its one job: getting you hired. Every item is derived from what hiring managers at Nigerian tech companies actually look for when evaluating candidates.",
      "The checklist covers four dimensions: content (what to include and how to present it), design (visual quality signals that communicate professionalism), technical (performance, accessibility, deployment) and SEO (making yourself discoverable). Each item includes why it matters and how to implement it.",
      "Most portfolios fail because they either over-design (prioritising animation over content) or under-document (showing screenshots without explaining decisions). This checklist balances both — your portfolio should be visually polished AND substantive enough to demonstrate your competence.",
    ],
    whatYouGet: [
      "40-item checklist organised by category",
      "Priority marking (must-have, should-have, nice-to-have)",
      "Implementation guidance for each item",
      "Common mistakes and how to avoid them",
      "Portfolio review rubric (self-assessment)",
    ],
    steps: [
      {
        title: "Content audit",
        description: "Review every page against these content requirements: clear role statement, 3-5 detailed case studies, about page with personality, contact information, GitHub links. Remove anything that does not demonstrate competence.",
        tips: [
          "Every case study must include: problem, process, outcome, what you learned",
          "Include at least one project deployed to production with real users",
          "Show process artifacts: wireframes, architecture diagrams, code snippets",
        ],
      },
      {
        title: "Case study documentation",
        description: "For each case study, document: the problem context, your specific role, technologies used and why, design/architecture decisions, challenges overcome, measurable outcomes and lessons learned. Aim for 300-500 words per case study.",
      },
      {
        title: "Design consistency check",
        description: "Verify consistent typography (2 fonts maximum), colour palette (3-5 colours), spacing system and component styles across all pages. Use a design tool or browser inspector to measure — eyeballing is not enough.",
      },
      {
        title: "Technical requirements",
        description: "Verify: loads in under 3 seconds on mobile, passes Lighthouse performance audit (90+), works on Chrome, Firefox and Safari, responsive on mobile/tablet/desktop, all links functional, custom domain configured.",
        tips: [
          "Test on a throttled 3G connection — this simulates real Nigerian mobile conditions",
          "Use real devices for testing, not just browser responsive mode",
          "Configure HTTPS and ensure no mixed content warnings",
        ],
      },
      {
        title: "SEO setup",
        description: "Configure: descriptive page title, meta description, Open Graph tags for social sharing, structured data for person/article schema, sitemap.xml, robots.txt. Make yourself discoverable.",
      },
      {
        title: "Pre-launch review",
        description: "Before sharing your portfolio: proofread all content, verify all links work, test contact form, check analytics are tracking, review on real mobile devices, ask two people to review for clarity and impact.",
      },
    ],
  },
  {
    slug: "technical-interview-cheat-sheet",
    title: "Technical Interview Cheat Sheet",
    tagline: "The systems, patterns and strategies for passing technical interviews at Nigerian and remote tech companies.",
    category: "cheat-sheets",
    difficulty: "Intermediate",
    timeToComplete: "2-3 hours study",
    overview: [
      "Technical interviews test three things: whether you can solve problems under pressure, whether you can communicate your thinking clearly and whether you know the fundamentals well enough to adapt when the problem changes. This cheat sheet prepares you for all three.",
      "The guide covers the most common interview formats in the Nigerian tech market: live coding (algorithmic problems and practical tasks), system design (architecture discussions), code review (reading and critiquing code) and portfolio review (explaining your past work). Each format gets specific preparation strategies.",
      "The cheat sheet also addresses the behavioural questions that Nigerian companies ask frequently: why this company, where do you see yourself, describe a difficult technical decision and how do you handle disagreements. These questions are not afterthoughts — they influence hiring decisions as much as technical performance.",
    ],
    whatYouGet: [
      "Interview format guide for 5 common types",
      "Problem-solving framework for live coding",
      "System design template for architecture discussions",
      "Portfolio presentation script",
      "Behavioural question responses framework",
    ],
    steps: [
      {
        title: "Know your interview formats",
        description: "Research the specific interview formats the company uses: live coding (HackerRank, Codility or pair programming), system design, code review, portfolio walkthrough, behavioural. Prepare differently for each.",
        tips: [
          "Ask the recruiter about interview format in advance — this is expected and professional",
          "For remote roles, verify your setup: stable internet, quiet environment, working camera",
        ],
      },
      {
        title: "Prepare your problem-solving framework",
        description: "For coding interviews: (1) Restate the problem, (2) Ask clarifying questions, (3) Work through examples, (4) Discuss approach before coding, (5) Start with a brute force solution, (6) Optimise, (7) Test with edge cases. Practice this framework until it is automatic.",
        tips: [
          "Think out loud — interviewers evaluate your process, not just your answer",
          "If stuck, break the problem into smaller parts and solve one at a time",
          "Mention time and space complexity before moving to the next question",
        ],
      },
      {
        title: "Prepare your system design template",
        description: "For architecture interviews: (1) Requirements and constraints, (2) High-level architecture, (3) Data model, (4) API design, (5) Key algorithms, (6) Scaling strategy, (7) Trade-offs. Practice with common Nigerian scenarios: payment processing, content delivery, notification systems.",
      },
      {
        title: "Prepare your portfolio walkthrough",
        description: "Prepare 3-minute presentations for your strongest projects: problem context, your role, technical decisions and trade-offs, what went well, what you would change. Practice until you can present without notes.",
      },
      {
        title: "Prepare behavioural responses",
        description: "Prepare STAR-format responses for: biggest technical challenge, time you disagreed with a decision, how you learn new technologies, dealing with tight deadlines, and why you want this role. Keep responses to 2 minutes each.",
      },
    ],
  },
  {
    slug: "salary-negotiation-guide",
    title: "Salary Negotiation Guide",
    tagline: "How to research, present and negotiate your salary in the Nigerian tech market — with scripts and email templates.",
    category: "guides",
    difficulty: "Intermediate",
    timeToComplete: "1-2 hours study",
    overview: [
      "Most Nigerian tech professionals leave money on the table because they either do not negotiate, negotiate poorly or accept the first offer without understanding their market value. This guide fixes all three problems with practical frameworks, scripts and templates.",
      "The guide covers market research (where to find salary data for Nigerian tech roles), framing (how to position your ask), timing (when to negotiate and when to accept), specific scripts (what to say in the conversation) and email templates (for written negotiation). Everything is calibrated for the Nigerian market where cultural dynamics affect negotiation differently than in Western contexts.",
      "The guide also covers total compensation beyond salary: equity/stock options (increasingly common in Nigerian startups), remote work allowances, learning budgets, equipment allowances and flexible working arrangements. These non-salary elements often add 20-40% to your total compensation.",
    ],
    whatYouGet: [
      "Market salary data sources for Nigerian tech roles",
      "Negotiation framework with conversation scripts",
      "Email templates for offer negotiation",
      "Total compensation checklist",
      "Counter-offer response strategies",
    ],
    steps: [
      {
        title: "Research your market value",
        description: "Use multiple sources to triangulate your market value: job board listings (WhereeWork, Jobberman, LinkedIn), salary surveys (Andela Talent, MVP Stack, TechCabal reports), peer conversations and recruiter feedback. Document the range.",
        tips: [
          "Talk to at least 3 people in similar roles about compensation",
          "Check job listings — many now include salary ranges",
          "Consider company size, stage and funding when comparing offers",
        ],
      },
      {
        title: "Determine your minimum and target",
        description: "Set three numbers: (1) your walk-away minimum (the lowest you would accept), (2) your realistic target (based on market research) and (3) your aspirational ask (10-20% above target). Never share your minimum.",
      },
      {
        title: "Prepare your negotiation script",
        description: "Use this framework: 'Thank you for the offer. I am excited about [specific aspect of the role]. Based on my research and the value I will bring [specific contribution], I was hoping we could discuss a base salary of [target]. I am open to other components of the compensation package as well.'",
        tips: [
          "Practice the script out loud before the conversation",
          "Maintain a collaborative tone — you are solving a problem together, not making demands",
          "Be specific about your ask — vague requests get vague responses",
        ],
      },
      {
        title: "Negotiate total compensation",
        description: "If the company cannot move on base salary, negotiate: signing bonus, equity/stock options, remote work allowance, learning budget (₦200,000-₦500,000/year is common), equipment allowance, flexible start date, additional leave days, title upgrade.",
      },
      {
        title: "Get the final offer in writing",
        description: "Whatever is agreed verbally, request written confirmation before accepting. Review the written offer against what was discussed. If anything is different, address it before signing.",
      },
    ],
  },
  {
    slug: "freelance-contract-template",
    title: "Freelance Contract Template",
    tagline: "A professional freelance contract template designed for Nigerian tech freelancers — covering scope, payments, IP and dispute resolution.",
    category: "templates",
    difficulty: "Intermediate",
    timeToComplete: "30 minutes customisation",
    overview: [
      "Freelancing without a contract is the most common financial mistake Nigerian tech freelancers make. A contract protects both you and the client by setting clear expectations before work begins. This template covers every clause that matters for tech freelance engagements in the Nigerian context.",
      "The template includes: scope of work (with change request process), payment terms (milestone-based with Nigerian banking details), intellectual property transfer, confidentiality, revision limits, timeline with buffer, termination clauses and dispute resolution through Nigerian arbitration. Each clause includes explanation of why it matters and when to modify it.",
      "The guide also covers: how to present the contract professionally, what to do when clients push back on terms, when to walk away from a project and how to handle scope creep without damaging the relationship.",
    ],
    whatYouGet: [
      "Freelance contract template (Google Docs and PDF)",
      "Clause-by-clause explanation and customisation guide",
      "Payment milestone calculator",
      "Scope change request template",
      "Email templates for contract delivery and follow-up",
    ],
    steps: [
      {
        title: "Customise the scope of work",
        description: "Replace the scope template with specific deliverables. Use the format: 'The Contractor will deliver [specific deliverable] by [date], meeting [acceptance criteria]. Any changes to scope require written agreement and may affect timeline and budget.'",
        tips: [
          "Be specific enough that both parties agree on what 'done' means",
          "Include acceptance criteria for each deliverable",
          "List what is explicitly NOT included to prevent scope creep",
        ],
      },
      {
        title: "Set payment terms",
        description: "Configure the payment structure: milestone-based (recommended: 40% upfront, 30% at midpoint, 30% on completion), payment method (bank transfer details), payment timeline (Net 7 or Net 14) and late payment terms (1.5% monthly interest after 14 days).",
      },
      {
        title: "Configure IP and confidentiality",
        description: "Set the intellectual property transfer terms: IP transfers to the client upon full payment. Until full payment, you retain IP rights. Include a mutual non-disclosure agreement covering project details and business information.",
      },
      {
        title: "Set timeline and revision limits",
        description: "Establish the project timeline with buffer: estimated completion date plus 2 weeks buffer for revisions. Include revision limits: [number] rounds of revisions included, additional revisions billed at [rate]/hour.",
      },
      {
        title: "Review dispute resolution",
        description: "The template defaults to arbitration under Nigerian law. For international clients, consider specifying jurisdiction. Ensure both parties understand the dispute resolution process before signing.",
      },
    ],
  },
  {
    slug: "ci-cd-pipeline-checklist",
    title: "CI/CD Pipeline Checklist",
    tagline: "The complete checklist for building production-grade CI/CD pipelines — covering testing, security, deployment and monitoring.",
    category: "checklists",
    difficulty: "Intermediate",
    timeToComplete: "1-2 days implementation",
    overview: [
      "A CI/CD pipeline that only runs tests is a missed opportunity. Production-grade pipelines validate code quality, enforce security, manage deployments and provide audit trails. This checklist ensures your pipeline covers every concern that matters.",
      "The checklist is organised by pipeline stage: pre-commit hooks, build stage, test stage, security scanning, deployment stages and post-deployment validation. Each item includes the implementation approach, recommended tools and the failure scenario it prevents.",
      "The guide is framework-agnostic but uses GitHub Actions as the primary example because it dominates the Nigerian market. The principles apply equally to GitLab CI, Jenkins or any other CI/CD platform.",
    ],
    whatYouGet: [
      "25-item pipeline checklist by stage",
      "GitHub Actions workflow template",
      "Security scanning configuration guide",
      "Deployment strategy comparison (blue-green, canary, rolling)",
      "Pipeline monitoring and alerting setup",
    ],
    steps: [
      {
        title: "Set up pre-commit hooks",
        description: "Configure pre-commit hooks for: linting (ESLint, Prettier), type checking (TypeScript), secret detection (gitleaks) and commit message validation (conventional commits). These catch issues before they reach CI.",
        tips: [
          "Use husky + lint-staged for JavaScript/TypeScript projects",
          "Include a secret scanning hook to prevent accidental credential commits",
          "Validate commit messages match conventional format: type(scope): description",
        ],
      },
      {
        title: "Configure the build stage",
        description: "Set up: dependency installation with caching, build step with error reporting, build artifact generation and caching for faster subsequent builds. Ensure builds are reproducible.",
      },
      {
        title: "Configure the test stage",
        description: "Set up: unit tests with coverage threshold (minimum 70%), integration tests, end-to-end tests (Playwright/Cypress) and test reporting. Fail the pipeline if coverage drops below threshold.",
        tips: [
          "Run tests in parallel to reduce pipeline time",
          "Use matrix builds to test across Node.js versions or browsers",
          "Generate coverage reports and upload to a tracking service",
        ],
      },
      {
        title: "Add security scanning",
        description: "Configure: dependency vulnerability scanning (npm audit, Snyk), SAST (CodeQL, SonarQube), secret scanning (gitleaks) and container scanning if using Docker. Fail on critical and high severity findings.",
      },
      {
        title: "Configure deployment stages",
        description: "Set up: staging deployment on merge to main, production deployment on release tag, database migration execution, environment variable validation and rollback capability. Implement deployment protection rules.",
      },
      {
        title: "Add post-deployment validation",
        description: "Set up: health check endpoint verification, smoke tests against production, Lighthouse performance audit, uptime monitoring alerts and deployment notification to team channel.",
      },
    ],
  },
  {
    slug: "postmortem-template",
    title: "Blameless Postmortem Template",
    tagline: "A structured template for conducting blameless post-incident reviews that actually improve your systems and processes.",
    category: "templates",
    difficulty: "Intermediate",
    timeToComplete: "1-2 hours per incident",
    overview: [
      "Postmortems are the most valuable document your team produces after an incident — if they are done well. Bad postmortems assign blame and generate action items nobody follows up on. Good postmortems identify systemic improvements and change team behaviour.",
      "This template follows the blameless postmortem framework used by SRE teams globally, adapted for Nigerian tech teams. It covers: incident timeline reconstruction, root cause analysis (using the 5 Whys), impact assessment, action items with owners and deadlines, and follow-up tracking.",
      "The guide explains why blameless does not mean consequence-less, how to run a postmortem meeting effectively, how to write action items that actually get completed and how to track postmortem follow-through over time.",
    ],
    whatYouGet: [
      "Postmortem document template",
      "Meeting facilitation guide",
      "5 Whys analysis framework",
      "Action item tracking spreadsheet",
      "Postmortem review meeting agenda",
    ],
    steps: [
      {
        title: "Document the timeline",
        description: "Reconstruct the incident timeline: when the first alert fired, when someone started investigating, when the incident was declared, key actions taken, when the incident was resolved and when the all-clear was sent. Use UTC timestamps.",
        tips: [
          "Gather timeline data from monitoring tools, chat logs and calendar invites",
          "Include decision points — when did someone choose action X over action Y?",
          "Mark when communication happened and to whom",
        ],
      },
      {
        title: "Assess the impact",
        description: "Quantify the impact: duration of user-facing impact, number of affected users, revenue impact (if measurable), SLA/SLO breach consequences and downstream effects. Use concrete numbers, not qualitative descriptions.",
      },
      {
        title: "Conduct root cause analysis",
        description: "Use the 5 Whys technique: ask 'why' five times to move from symptoms to systemic causes. Document the causal chain. Identify contributing factors — rarely is there a single root cause.",
        tips: [
          "Focus on process and system failures, not individual mistakes",
          "Ask 'why did the system allow this to happen?' not 'why did person X do this?'",
          "Document every contributing factor, even if it seems minor",
        ],
      },
      {
        title: "Write action items",
        description: "For each improvement: write a specific, measurable action, assign an owner, set a deadline and classify priority (P0: must complete before next incident, P1: complete within 2 weeks, P2: complete within 6 weeks).",
      },
      {
        title: "Schedule follow-up",
        description: "Schedule a postmortem review meeting 2-4 weeks after the incident to verify all action items are completed. Track postmortem completion rate as a team metric.",
      },
    ],
  },
  {
    slug: "api-documentation-template",
    title: "API Documentation Template",
    tagline: "A professional API documentation template with OpenAPI/Swagger spec, authentication guides and interactive examples.",
    category: "templates",
    difficulty: "Intermediate",
    timeToComplete: "2-3 hours setup",
    overview: [
      "Poor API documentation is the most common reason Nigerian API consumers give up and switch to a competitor. Good documentation is not about comprehensive coverage — it is about answering the questions developers actually ask, in the order they ask them.",
      "This template provides: OpenAPI 3.0 specification skeleton, authentication guide, error handling reference, rate limiting documentation, pagination guide, webhook documentation, code examples in 4 languages and a changelog format. Each section follows developer documentation best practices.",
      "The guide explains how to structure documentation for different audiences (quick start for new users, reference for experienced developers), how to write code examples that actually work, how to maintain documentation alongside code changes and how to measure documentation quality.",
    ],
    whatYouGet: [
      "OpenAPI 3.0 specification template",
      "Authentication guide template",
      "Error handling reference",
      "Code example templates (JavaScript, Python, cURL, Go)",
      "Documentation maintenance checklist",
    ],
    steps: [
      {
        title: "Define your API structure",
        description: "Organise endpoints by resource: /users, /payments, /notifications. For each resource, document: GET (list), GET/:id (retrieve), POST (create), PUT/:id (update), DELETE/:id (delete). Group related endpoints together.",
      },
      {
        title: "Write the quick start guide",
        description: "Write a 5-minute quick start: get an API key, make your first request, see the response. This should work without reading any other documentation. Include a complete working example.",
        tips: [
          "Use a real API key in examples (test/sandbox mode)",
          "Show both the request and the expected response",
          "Include error examples so developers know what failure looks like",
        ],
      },
      {
        title: "Document authentication",
        description: "Explain: how to get API keys, where to include them (headers vs query params), token lifecycle, refresh process and common authentication errors. Include examples for each auth method.",
      },
      {
        title: "Add code examples",
        description: "For each endpoint, provide working code examples in at least 3 languages: JavaScript (fetch/axios), Python (requests) and cURL. Test every example before publishing — broken examples destroy trust.",
        tips: [
          "Use realistic request bodies, not placeholder data",
          "Include error handling in examples",
          "Show both success and error responses",
        ],
      },
      {
        title: "Document error handling",
        description: "Create a comprehensive error reference: HTTP status codes used, error response format, specific error codes and their meanings, common error scenarios and troubleshooting steps. Use consistent error response format across all endpoints.",
      },
      {
        title: "Set up documentation hosting",
        description: "Choose a documentation platform: Redoc (free, OpenAPI-native), Stripe-style custom docs, GitBook or Notion for quick setup. Ensure the docs are searchable, have version history and can be updated without code deployment.",
      },
    ],
  },
  {
    slug: "sprint-retrospective-guide",
    title: "Sprint Retrospective Guide",
    tagline: "How to run sprint retrospectives that your team actually looks forward to — with facilitation scripts and action tracking.",
    category: "guides",
    difficulty: "Beginner",
    timeToComplete: "1-1.5 hours per sprint",
    overview: [
      "Most sprint retrospectives die a slow death: attendance drops, participants disengage and the same issues resurface sprint after sprint. This guide revives retrospectives by changing how they are structured, facilitated and followed up.",
      "The guide includes three retrospective formats (Start/Stop/Continue, 4Ls and Sailboat) with facilitation scripts for each, plus follow-up frameworks to ensure action items actually get completed. Each format works best for different team dynamics and maturity levels.",
      "The guide also covers the facilitator role: how to create psychological safety, how to handle dominant personalities, how to address sensitive issues productively and how to track improvement over time with retrospective effectiveness metrics.",
    ],
    whatYouGet: [
      "3 retrospective format templates",
      "Facilitation scripts with timing",
      "Action item tracking framework",
      "Psychological safety guidelines",
      "Retrospective effectiveness measurement",
    ],
    steps: [
      {
        title: "Prepare the retrospective",
        description: "Set up the session: book 60-90 minutes, prepare the format template, send a brief pre-retro survey (3 questions max) to gather initial thoughts, and prepare the space (physical or virtual board).",
        tips: [
          "Send the pre-retro survey 24 hours before — not earlier or later",
          "Ensure the facilitator is not the team lead (power dynamics inhibit honesty)",
          "Prepare a parking lot for issues that need separate discussion",
        ],
      },
      {
        title: "Open with safety and context",
        description: "Start with: 'This is a safe space. We focus on processes and systems, not individuals. Everything discussed stays in this room.' Then provide sprint context: velocity, completed stories, any notable events.",
      },
      {
        title: "Run the format",
        description: "Execute the chosen format: Start/Stop/Continue (what should we start doing, stop doing, continue doing), 4Ls (Liked, Learned, Lacked, Longed for) or Sailboat (anchors holding us back, winds pushing us forward). Allow 10 minutes silent writing, then 20 minutes discussion.",
      },
      {
        title: "Prioritise action items",
        description: "From the discussion, select 2-3 action items. For each: assign an owner, set a specific deadline (next sprint), define how success will be measured, and add to the sprint backlog. Do not exceed 3 action items — more will not get done.",
      },
      {
        title: "Follow up",
        description: "At the start of the next retrospective, review action item completion before starting new discussion. Track completion rate over time. If completion rate drops below 70%, investigate why and address the systemic issue.",
      },
    ],
  },
  {
    slug: "cover-letter-template",
    title: "Tech Cover Letter Template",
    tagline: "A concise, impactful cover letter template that shows you understand the company and can solve their specific problems.",
    category: "templates",
    difficulty: "Beginner",
    timeToComplete: "20 minutes per application",
    overview: [
      "Most cover letters are ignored because they say nothing specific. A cover letter that demonstrates you understand the company's problem and can solve it gets read. This template ensures every cover letter you write is specific, concise and compelling.",
      "The template follows a proven structure: opening that shows research (not 'I am writing to apply for...'), evidence of relevant competence (not a resume repeat), demonstration of company understanding and a confident close with specific next steps. Each section is calibrated for Nigerian tech companies.",
      "The guide covers: how to research a company quickly (15 minutes max), how to identify the specific problem you can solve, how to tailor the same template for different roles without rewriting everything, and when NOT to send a cover letter (some applications do not benefit from one).",
    ],
    whatYouGet: [
      "Cover letter template with fill-in sections",
      "Company research checklist (15-minute version)",
      "Before/after examples for 3 role types",
      "Email cover letter format",
      "LinkedIn message template for direct outreach",
    ],
    steps: [
      {
        title: "Research the company (15 minutes)",
        description: "Spend 15 minutes researching: company product, recent news/funding, team size and tech stack (from job posting and LinkedIn), specific challenges mentioned in the job description. Note one specific thing you can contribute.",
        tips: [
          "Check the company blog, LinkedIn page and recent press coverage",
          "Look at the engineering team on LinkedIn to understand their stack",
          "Read the job description twice — the second time for unstated needs",
        ],
      },
      {
        title: "Write the opening",
        description: "Open with a specific connection to the company, not a generic application statement. Example: 'Your recent launch of [product feature] suggests you are scaling [specific area], and my experience building [specific skill] at [context] aligns with that direction.'",
      },
      {
        title: "Present your evidence",
        description: "Provide 2-3 specific examples of relevant work. Use the format: 'At [company], I [specific action] that resulted in [measurable outcome].' Match each example to a requirement from the job description.",
      },
      {
        title: "Demonstrate company understanding",
        description: "Show you understand their challenge: 'I noticed [specific observation about their product/market/technical challenge]. My experience with [relevant skill] would help address this because [specific reasoning].'",
        tips: [
          "Be specific — generic statements about 'innovation' or 'excellence' add nothing",
          "Show you have thought about their problems, not just read the job description",
          "If possible, reference something from your research that others would miss",
        ],
      },
      {
        title: "Close with confidence",
        description: "End with: 'I would welcome the opportunity to discuss how my [specific skill] experience can contribute to [specific company goal]. I am available for a conversation this week and can be reached at [phone/email].'",
      },
    ],
  },
  {
    slug: "design-system-starter",
    title: "Design System Starter Kit",
    tagline: "Figma tokens, components and documentation patterns to kickstart your team's design system — built for Nigerian product teams.",
    category: "templates",
    difficulty: "Advanced",
    timeToComplete: "1-2 weeks setup",
    overview: [
      "Most Nigerian product teams know they need a design system but do not know where to start. This starter kit provides the foundation: design tokens (colour, type, spacing, elevation), core components (buttons, inputs, cards, navigation), documentation templates and governance processes.",
      "The kit is built for Figma and uses the token architecture that scales: primitive tokens (raw values) → semantic tokens (purpose-based) → component tokens (specific applications). This three-layer system means changing your brand colour updates every component automatically.",
      "The guide also covers the organisational side: how to introduce a design system to a team resistant to change, how to prioritise which components to build first, how to handle contributions from multiple designers and how to measure design system adoption over time.",
    ],
    whatYouGet: [
      "Figma file with design tokens and 15 core components",
      "Documentation template for each component",
      "Contribution guidelines template",
      "Adoption measurement framework",
      "Migration guide from ad-hoc design to system",
    ],
    steps: [
      {
        title: "Define your design tokens",
        description: "Set up three layers of tokens: Primitives (raw colour values, type scale, spacing units), Semantic (primary, secondary, success, error mapped to primitives), Component (button-primary-bg, input-border-focus mapped to semantic). Start with 5 colours, 3 font sizes, 4 spacing units.",
      },
      {
        title: "Build core components",
        description: "Start with the 15 components that cover 80% of use cases: Button (6 variants), Input (text, select, checkbox, radio), Card, Badge, Avatar, Alert, Modal, Toast, Tabs, Tooltip. Each component needs: variants, states, accessibility labels, usage guidelines.",
      },
      {
        title: "Document components",
        description: "For each component, document: when to use it, when NOT to use it, all variants and their use cases, accessibility requirements, code implementation reference and do/don't examples. Keep documentation in the Figma file alongside the components.",
        tips: [
          "Show real product examples, not abstract shapes",
          "Include negative examples (when NOT to use the component)",
          "Document responsive behaviour explicitly",
        ],
      },
      {
        title: "Set up governance",
        description: "Define: who can contribute to the system, how contributions are reviewed, how changes are communicated, version numbering scheme and deprecation process. Assign a design system owner.",
      },
      {
        title: "Plan adoption",
        description: "Create a migration plan: audit existing screens against the new system, prioritise migration by screen usage frequency, set adoption targets (80% compliance in 3 months) and track component usage metrics.",
      },
    ],
  },
];

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getResources(): Resource[] {
  return resources;
}
