import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Code2,
  Compass,
  Factory,
  Globe,
  GraduationCap,
  HeartHandshake,
  Layers,
  MapPin,
  Rocket,
  School,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CTASection,
  Eyebrow,
  PageHero,
  PageShell,
  SectionHeading,
} from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from "@/components/motion";
import { cn } from "@/lib/utils";

import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    getPageHead({
      title: "About — Cyber Elias Academy",
      description:
        "From practical IT roots in Port Harcourt to a vision for a complete skills-to-opportunity ecosystem: the story, philosophy and roadmap of Cyber Elias Academy.",
      path: "/about",
    }),
  component: About,
});

const beginningAreas = [
  "Computer hardware & maintenance",
  "Networking",
  "Wireless networking",
  "Network configuration",
  "Network security",
  "IT support",
  "Systems maintenance",
  "Web development",
  "Frontend development",
  "Backend technologies",
  "Database systems",
  "WordPress",
  "Mobile applications",
  "Business technology",
  "Digital marketing",
  "Automation",
  "AI integrations",
  "Software & digital solutions",
  "Technology deployment",
  "Technical consulting",
];

const educationDomains: { title: string; topics: string[] }[] = [
  {
    title: "ICT & Digital Literacy",
    topics: [
      "Computer fundamentals",
      "Microsoft Office",
      "Internet usage",
      "Digital productivity",
      "File management",
      "Digital communication",
      "Online safety",
      "Basic troubleshooting",
    ],
  },
  {
    title: "Web & Software Development",
    topics: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Databases",
      "Full-stack development",
      "Web applications",
    ],
  },
  {
    title: "Mobile Development",
    topics: [
      "Android development",
      "Java / Kotlin",
      "Android Studio",
      "App architecture",
      "API integration",
      "WebView apps",
    ],
  },
  {
    title: "Artificial Intelligence",
    topics: [
      "AI fundamentals",
      "Generative AI",
      "AI-assisted productivity",
      "AI APIs",
      "Automation",
      "Intelligent applications",
      "Business AI",
    ],
  },
  {
    title: "Cybersecurity",
    topics: [
      "Security fundamentals",
      "Network security",
      "Security awareness",
      "Vulnerability concepts",
      "Defensive security",
      "Security tools & practice",
    ],
  },
  {
    title: "Networking & Infrastructure",
    topics: [
      "LAN / WLAN",
      "Network configuration",
      "Routers & switches",
      "MikroTik",
      "Wireless systems",
      "Troubleshooting",
      "Infrastructure deployment",
    ],
  },
  {
    title: "Data & Analytics",
    topics: [
      "Data fundamentals",
      "Spreadsheet analytics",
      "SQL",
      "Databases",
      "Data visualisation",
      "Dashboards",
      "Data analysis",
    ],
  },
  {
    title: "UI/UX & Digital Design",
    topics: [
      "UI design",
      "UX principles",
      "Figma",
      "Design systems",
      "Prototyping",
      "Visual communication",
      "Product design",
    ],
  },
  {
    title: "Digital Marketing",
    topics: [
      "Marketing fundamentals",
      "Social media",
      "SEO",
      "Content strategy",
      "Digital advertising",
      "Analytics",
      "Business growth",
    ],
  },
];

const pillars = [
  {
    icon: GraduationCap,
    title: "Education & Training",
    body: "Practical technology education across nine domains — from computer literacy to full-stack development, AI, security, networking, data, design and marketing. This is the foundation everything else stands on.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Practical Experience",
    body: "Learning becomes valuable when it connects to real work. Instead of stopping at lesson → quiz → certificate, the model is learn → practise → build → review → improve → demonstrate → apply. The goal is evidence of ability.",
  },
  {
    icon: Users,
    title: "Talent Development & Employment",
    body: "A talent layer where learners and alumni build professional profiles — skills, certifications, projects, portfolio items, achievements and work preferences — forming a pipeline where businesses discover people by demonstrated capability, not certificates alone.",
  },
  {
    icon: Wrench,
    title: "Technology Solutions",
    body: "CEA serves organisations that need technology but can't justify large agencies: websites, web and mobile apps, automation, AI integration, IT support, networking, CCTV, hardware, marketing, databases and consulting — creating supervised real-world exposure for qualified learners.",
  },
  {
    icon: HeartHandshake,
    title: "Community Empowerment",
    body: "Technology shouldn't only benefit people who can afford expensive training. Digital literacy programmes, bootcamps, school programmes, workshops, scholarships, NGO and institutional partnerships, and rural initiatives widen access.",
  },
] as const;

const services = [
  "Website development",
  "Web applications",
  "Mobile applications",
  "Business automation",
  "AI integration",
  "Software solutions",
  "IT support",
  "Network installation",
  "Network configuration",
  "CCTV deployment",
  "Computer maintenance",
  "Hardware procurement",
  "Digital marketing",
  "SEO",
  "Database solutions",
  "Technology consulting",
  "Systems deployment",
];

const communityInitiatives = [
  "Digital literacy programmes",
  "Youth technology bootcamps",
  "School programmes",
  "Community workshops",
  "Sponsored training",
  "Scholarship programmes",
  "NGO partnerships",
  "Church partnerships",
  "Institutional partnerships",
  "Rural digital skills initiatives",
  "Mobile training programmes",
];

const centreRoles = [
  "A classroom",
  "A digital laboratory",
  "A project workspace",
  "A mentorship environment",
  "A technology support centre",
  "A community hub",
  "A meeting point for technology professionals",
  "A place where businesses access technology services",
];

const platformFeatures = [
  {
    icon: BookOpen,
    title: "Learning management",
    body: "Register, enrol, pay, access courses, follow learning paths, complete lessons, take assessments, submit assignments, track progress and earn certificates.",
  },
  {
    icon: Compass,
    title: "Career intelligence",
    body: "Assess interests, strengths, working preferences and digital aptitude to determine suitable learning paths.",
  },
  {
    icon: Layers,
    title: "Portfolio",
    body: "Build professional portfolios showing what learners have actually created.",
  },
  {
    icon: Search,
    title: "Jobs",
    body: "Discover employment and freelance opportunities across the ecosystem.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Talent marketplace",
    body: "A place where businesses discover qualified, demonstrated talent.",
  },
  {
    icon: Code2,
    title: "Projects",
    body: "Clients and teams manage technology projects end to end.",
  },
  {
    icon: Users,
    title: "Community",
    body: "Students, alumni, instructors and partners interact within the wider ecosystem.",
  },
  {
    icon: Building2,
    title: "Business operations",
    body: "Admissions, CRM, finance, operations, HR, student management, project management, reporting, marketing and automation.",
  },
];

const principles = [
  {
    icon: Zap,
    title: "Practicality over memorisation",
    body: "We care about whether someone can use knowledge — not just recall it.",
  },
  {
    icon: Target,
    title: "Skills over certificates",
    body: "A certificate demonstrates completion. A project demonstrates capability. We want both.",
  },
  {
    icon: TrendingUp,
    title: "Continuous learning",
    body: "Technology changes constantly, so learning cannot end at graduation.",
  },
  {
    icon: Users,
    title: "Accessibility",
    body: "Technology education should be open to people from every background and level of experience.",
  },
  {
    icon: Globe,
    title: "Industry relevance",
    body: "Courses should evolve as technology and employment requirements evolve.",
  },
  {
    icon: Rocket,
    title: "Entrepreneurship",
    body: "Not everyone becomes an employee. Freelancers, founders, product creators and consultants all have a path.",
  },
  {
    icon: HeartHandshake,
    title: "Community",
    body: "Technology becomes more powerful when people learn, build and grow together.",
  },
];

const journeySteps = [
  "Discover",
  "Assess",
  "Learn",
  "Practise",
  "Build",
  "Demonstrate",
  "Experience",
  "Earn",
  "Grow",
  "Give back",
];

const successOutcomes = [
  "How many students developed real skills?",
  "How many built meaningful projects?",
  "How many found employment?",
  "How many started businesses?",
  "How many became freelancers?",
  "How many businesses received useful technology?",
  "How many communities gained access to digital education?",
  "How many alumni returned to help others?",
];

const welcomeAudiences = [
  "A complete beginner",
  "A student",
  "A career changer",
  "A professional",
  "An aspiring developer",
  "A designer",
  "An entrepreneur",
  "A business owner",
  "An organisation seeking technology",
  "An employer looking for talent",
  "An instructor",
  "An intern",
  "An alumnus",
  "A community partner",
];

const buildingNow = [
  "The physical academy is being established",
  "The programmes are being structured",
  "The operational systems are being developed",
  "The digital platform is being designed",
  "The curriculum is being refined",
  "The community is being built",
  "The partnerships are being developed",
];

function About() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Cyber Elias Academy"
        art="community"
        title={
          <>
            From learning skills to <span className="text-gradient">building futures</span>
          </>
        }
        description="Cyber Elias Academy is a technology education, talent development and digital solutions company built to close the gap between learning technology and actually using it. We train people in practical digital skills, help them build real projects and professional portfolios, connect talent with opportunities, and provide technology solutions to businesses — starting from Port Harcourt, Rivers State."
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            "Digital Skills Factory",
            "Talent Pipeline",
            "Technology Solutions Hub",
            "Community Transformation Engine",
            "From Zero to Expert, Together",
          ].map((b) => (
            <Badge key={b} variant="secondary" className="font-medium">
              {b}
            </Badge>
          ))}
        </div>
      </PageHero>

      {/* The beginning */}
      <section className="container-page py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <SectionHeading
            eyebrow="The beginning"
            title="Born from years of doing real technology work"
            description=""
          />
          <div className="space-y-5">
            <Reveal>
              <p className="text-muted-foreground leading-relaxed">
                Cyber Elias Academy emerged from years of practical exposure to technology — working
                across many areas of IT rather than treating technology as a single discipline. That
                experience exposed an important reality:
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <blockquote className="border-primary/25 bg-primary/5 rounded-2xl border-l-4 p-5 text-base font-semibold">
                Knowing technology is not the same thing as knowing how to apply technology.
              </blockquote>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-muted-foreground leading-relaxed">
                Someone can complete a course and still struggle to solve an actual business
                problem. Someone can learn programming syntax but never ship a useful product.
                Someone can watch hundreds of hours of tutorials and have nothing meaningful to show
                an employer. And businesses can desperately need technology while struggling to find
                affordable people who can actually implement it. That gap is one of the fundamental
                reasons Cyber Elias Academy exists.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="flex flex-wrap gap-2">
                {beginningAreas.map((area) => (
                  <Badge key={area} variant="outline" className="font-medium">
                    {area}
                  </Badge>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="The problem we want to solve"
            title="Education separates learning from application. We exist to close that gap."
          />
          <StaggerGroup className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            <StaggerItem>
              <TiltCard intensity={3} className="h-full">
                <div className="bg-card shadow-soft h-full rounded-2xl border p-6 text-center">
                  <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                    Most programmes stop at
                  </p>
                  <p className="font-display mt-4 text-xl font-extrabold">
                    “I completed a course.”
                  </p>
                </div>
              </TiltCard>
            </StaggerItem>
            <StaggerItem>
              <TiltCard intensity={3} className="h-full">
                <div className="bg-gradient-brand text-primary-foreground shadow-glow h-full rounded-2xl border-0 p-6 text-center">
                  <p className="text-primary-foreground/70 text-xs font-bold tracking-widest uppercase">
                    We build until you can say
                  </p>
                  <p className="font-display mt-4 text-xl font-extrabold">
                    “I can actually do this.”
                  </p>
                </div>
              </TiltCard>
            </StaggerItem>
          </StaggerGroup>
          <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl">
            <p className="text-muted-foreground text-center leading-relaxed">
              We want students to understand what something is, why it matters, how it works, how to
              use it, how to troubleshoot it, how to build with it, how to deploy it, how to explain
              it, how to sell it — and ultimately, how to create value with it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why academy */}
      <section className="container-page py-20 md:py-24">
        <SectionHeading
          eyebrow="Why “Academy”?"
          title="Not a certificate shop — an environment for continuous development"
          description="The word Academy is intentional. Cyber Elias Academy is not envisioned as a place where someone pays, attends classes, receives notes and leaves with a certificate. The relationship does not have to end when the course ends."
        />
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-2">
            {[
              "Basic computer literacy",
              "Web development",
              "An interest in cybersecurity",
              "Real projects",
              "The community",
              "An internship",
              "Supervised client work",
              "Alumni",
              "Mentor · Instructor · Freelancer · Employee · Partner · Entrepreneur",
            ].map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <Badge className="bg-card shadow-soft text-foreground rounded-full border px-4 py-2 text-sm font-semibold">
                  {step}
                </Badge>
                {i < 8 && <ArrowRight className="text-muted-foreground size-4 shrink-0" />}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* The ecosystem */}
      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="The ecosystem"
            title="One ecosystem, five interconnected pillars"
            description="People need skills. Businesses need skilled people. Skilled people need opportunities. Communities need access. Instead of treating these as separate problems, Cyber Elias Academy is designed around connecting them."
          />
          <StaggerGroup className="mt-14 grid gap-5 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <StaggerItem key={p.title} className={cn(i === 0 && "lg:col-span-3")}>
                <TiltCard intensity={3} className="h-full">
                  <div className="bg-card shadow-soft h-full rounded-2xl border p-7">
                    <span className="bg-primary/10 text-primary grid size-11 place-items-center rounded-xl">
                      <p.icon className="size-5" />
                    </span>
                    <h3 className="font-display mt-5 text-base font-bold">{p.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{p.body}</p>
                    {p.title === "Education & Training" && (
                      <div className="mt-5 space-y-4 border-t pt-5">
                        {educationDomains.map((d) => (
                          <div key={d.title}>
                            <p className="text-xs font-bold tracking-wide uppercase">{d.title}</p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {d.topics.map((t) => (
                                <Badge key={t} variant="secondary" className="font-medium">
                                  {t}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                        <p className="text-muted-foreground text-xs italic">
                          …and additional technology disciplines as demand develops.
                        </p>
                      </div>
                    )}
                    {p.title === "Technology Solutions" && (
                      <div className="mt-5 border-t pt-5">
                        <div className="flex flex-wrap gap-1.5">
                          {services.map((s) => (
                            <Badge key={s} variant="secondary" className="font-medium">
                              {s}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-5 grid gap-2 sm:grid-cols-2">
                          {[
                            "Businesses receive technology solutions",
                            "CEA gains practical project experience",
                            "Learners gain supervised real-world exposure",
                            "The Academy develops stronger talent",
                          ].map((loop, j) => (
                            <p
                              key={loop}
                              className="text-muted-foreground flex items-start gap-2 text-xs leading-relaxed"
                            >
                              <span className="text-primary font-display font-bold">{j + 1}.</span>
                              {loop}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    {p.title === "Community Empowerment" && (
                      <div className="mt-5 flex flex-wrap gap-1.5 border-t pt-5">
                        {communityInitiatives.map((c) => (
                          <Badge key={c} variant="secondary" className="font-medium">
                            {c}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {p.title === "Talent Development & Employment" && (
                      <div className="mt-5 flex flex-wrap gap-1.5 border-t pt-5">
                        {[
                          "Skills",
                          "Certifications",
                          "Projects",
                          "Portfolio items",
                          "Experience",
                          "Achievements",
                          "Assessments",
                          "Interests",
                          "Work preferences",
                        ].map((f) => (
                          <Badge key={f} variant="secondary" className="font-medium">
                            {f}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Port Harcourt */}
      <section className="container-page py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="The beginning"
            title="Rooted in Port Harcourt"
            description="Cyber Elias Academy's physical journey starts in Port Harcourt, Rivers State. The learning centre provides what purely online platforms cannot: a physical environment where people meet, learn, collaborate, ask questions, practise and build together."
          />
          <Reveal delay={0.1}>
            <div className="bg-card shadow-soft rounded-3xl border p-8">
              <div className="flex items-center gap-3">
                <MapPin className="text-primary size-5" />
                <p className="font-display font-bold">Port Harcourt, Rivers State, Nigeria</p>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                The centre is intended to grow beyond a classroom into a place that serves the whole
                ecosystem.
              </p>
              <div className="my-6 h-px bg-border" />
              <div className="grid gap-3 text-sm">
                {centreRoles.map((r) => (
                  <p key={r} className="text-muted-foreground flex items-center gap-2">
                    <Compass className="text-primary size-4 shrink-0" /> {r}
                  </p>
                ))}
              </div>
              <Button asChild className="bg-gradient-brand shadow-glow mt-7 w-full border-0">
                <Link to="/visit">
                  Plan your visit <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Digital platform */}
      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Building the digital academy"
            title="A platform that brings the ecosystem together"
            description="A modern academy cannot rely on paper, spreadsheets, WhatsApp messages and disconnected systems. We are designing our own digital platform — CEA-OS — to run the whole institution, and to be increasingly system-driven rather than personality-driven."
          />
          <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {platformFeatures.map((f) => (
              <StaggerItem key={f.title}>
                <TiltCard intensity={3} className="h-full">
                  <div className="bg-card shadow-soft h-full rounded-2xl border p-6">
                    <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-xl">
                      <f.icon className="size-5" />
                    </span>
                    <h3 className="font-display mt-4 text-sm font-bold">{f.title}</h3>
                    <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">{f.body}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Philosophy */}
      <section className="container-page py-20 md:py-24">
        <SectionHeading
          align="center"
          eyebrow="The philosophy"
          title="Seven principles behind the Academy"
        />
        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((v) => (
            <StaggerItem key={v.title}>
              <TiltCard intensity={3} className="h-full">
                <div className="bg-card shadow-soft h-full rounded-2xl border p-7">
                  <span className="bg-primary/10 text-primary grid size-11 place-items-center rounded-xl">
                    <v.icon className="size-5" />
                  </span>
                  <h3 className="font-display mt-5 text-base font-bold">{v.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{v.body}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* The journey */}
      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="The journey"
            title="From student to professional"
            description="A person may enter unsure of which technology career to pursue — and that's fine. The ecosystem supports every stage of the journey."
          />
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {journeySteps.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <Badge
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold",
                    i === 0 && "bg-gradient-brand text-primary-foreground border-0",
                  )}
                >
                  {s}
                </Badge>
                {i < journeySteps.length - 1 && (
                  <ArrowRight className="text-muted-foreground size-4 shrink-0" />
                )}
              </span>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed">
              From assessment and discovery, through learning, practice and real projects, to
              supervised experience, income, continued growth — and eventually returning to help the
              next generation. That is the ecosystem we are building.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="container-page py-20 md:py-24">
        <StaggerGroup className="grid gap-5 lg:grid-cols-2">
          <StaggerItem>
            <div className="bg-gradient-ink text-ink-foreground shadow-elevated h-full rounded-3xl border-0 p-8">
              <span className="bg-ink-foreground/10 grid size-11 place-items-center rounded-xl">
                <Sparkles className="text-warning size-5" />
              </span>
              <h3 className="font-display mt-5 text-xl font-extrabold">Our vision</h3>
              <p className="text-ink-foreground/80 mt-3 text-sm leading-relaxed">
                To become a leading technology education and digital transformation ecosystem that
                equips people with practical skills, connects talent to opportunity, helps
                organisations adopt technology, and expands access to digital empowerment.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-card shadow-soft h-full rounded-3xl border p-8">
              <span className="bg-primary/10 text-primary grid size-11 place-items-center rounded-xl">
                <Target className="size-5" />
              </span>
              <h3 className="font-display mt-5 text-xl font-extrabold">Our mission</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                To transform learners into capable technology professionals, entrepreneurs and
                problem-solvers through practical education, real-world experience, mentorship,
                technology services and opportunity-driven community programmes.
              </p>
            </div>
          </StaggerItem>
        </StaggerGroup>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="What we are building"
            title="A school, a factory, a marketplace and a technology company"
            description="Four things at once — and a community surrounding all of them."
          />
          <StaggerGroup className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: School, title: "A school", body: "Where people learn." },
              {
                icon: Factory,
                title: "A factory",
                body: "Where skills are developed through practice.",
              },
              {
                icon: BriefcaseBusiness,
                title: "A marketplace",
                body: "Where skills meet opportunities.",
              },
              {
                icon: Code2,
                title: "A technology company",
                body: "Where technology is built and deployed for real organisations.",
              },
            ].map((t) => (
              <StaggerItem key={t.title}>
                <div className="bg-card shadow-soft h-full rounded-2xl border p-5">
                  <span className="bg-primary/10 text-primary grid size-9 place-items-center rounded-lg">
                    <t.icon className="size-4" />
                  </span>
                  <h3 className="font-display mt-3 text-sm font-bold">{t.title}</h3>
                  <p className="text-muted-foreground mt-1 text-xs">{t.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Honest framing */}
      <section className="container-page">
        <Reveal>
          <div className="bg-gradient-brand shadow-glow text-primary-foreground relative overflow-hidden rounded-3xl px-8 py-14 md:px-16">
            <div className="relative max-w-3xl">
              <Eyebrow className="border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground">
                The journey is still being written
              </Eyebrow>
              <p className="font-display mt-6 text-2xl font-extrabold text-balance md:text-3xl">
                We are not presenting ourselves as an organisation that has already achieved
                everything described in this vision. We are building toward it.
              </p>
              <p className="text-primary-foreground/80 mt-5 leading-relaxed">
                The physical academy is being established. The programmes are being structured. The
                operational systems are being developed. The digital platform is being designed. The
                curriculum is being refined. The community is being built. The partnerships are
                being developed. The goal is to build each layer properly rather than simply growing
                quickly.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* What success looks like */}
      <section className="container-page py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="What success looks like"
            title="Measured by what happens after enrolment"
            description="Not by the number of students who enrol — but by what they become, build and give back."
          />
          <Reveal delay={0.1}>
            <div className="bg-card shadow-soft rounded-3xl border p-8">
              <div className="grid gap-3">
                {successOutcomes.map((o) => (
                  <p key={o} className="text-muted-foreground flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="text-primary mt-0.5 size-4 shrink-0" /> {o}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Long-term ambition + why we exist */}
      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start">
          <SectionHeading
            eyebrow="The long-term ambition"
            title="From Port Harcourt to a global digital community"
            description="The ambition is to grow from a physical academy in Port Harcourt into a scalable digital ecosystem serving learners and organisations far beyond the local community. Physical expansion may follow where justified — digital expansion can happen much faster."
          />
          <div className="space-y-5">
            <Reveal>
              <div className="bg-card shadow-soft rounded-2xl border p-6">
                <p className="font-display text-sm font-bold">
                  Port Harcourt → Rivers State → Nigeria → West Africa → Global
                </p>
                <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                  Through technology, a learner does not need to be physically present in Port
                  Harcourt to participate in the CEA ecosystem.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="bg-card shadow-soft rounded-2xl border p-6">
                <p className="font-display text-sm font-bold">Why Cyber Elias Academy exists</p>
                <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                  The internet has made information abundant. What remains scarce is practical
                  competence, mentorship, experience, opportunity, professional networks,
                  accountability, direction, access to technology — and access to paying work. CEA
                  is being designed to bring those pieces together.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Welcome */}
      <section className="container-page py-20 md:py-24">
        <SectionHeading
          align="center"
          eyebrow="Welcome to Cyber Elias Academy"
          title="There is a place for you in this ecosystem"
          description="Because the ultimate objective is bigger than teaching someone how to use a computer. It is about helping people understand technology well enough to use it, build with it, work with it, earn from it, teach it — and use it to solve real problems."
        />
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
            {welcomeAudiences.map((a) => (
              <Badge key={a} variant="secondary" className="rounded-full px-4 py-2 font-medium">
                {a}
              </Badge>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="font-display text-gradient mx-auto mt-14 max-w-2xl text-center text-3xl font-extrabold text-balance">
            From Zero to Expert, Together.
          </p>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed">
            “From Zero” recognises that people can begin without technical experience. “To Expert”
            represents continuous growth and mastery. “Together” recognises that meaningful
            development rarely happens in isolation — students need instructors, instructors need
            students, businesses need talent, talent needs opportunities, communities need
            technology, and technology needs people capable of deploying it. CEA exists to connect
            these pieces.
          </p>
        </Reveal>
      </section>

      <CTASection
        title="Join us as we build it"
        description="Whether you're learning, hiring, building, funding or partnering — the journey from a training centre to an ecosystem is only just beginning, and there's a seat for you."
        primary={{ label: "Explore programs", to: "/programs" }}
        secondary={{ label: "Talk to us", to: "/contact" }}
      />
    </PageShell>
  );
}
