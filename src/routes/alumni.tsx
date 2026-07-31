import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  HandHeart,
  Network,
  Quote,
  Search,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from "@/components/motion";
import { testimonials } from "@/data/site";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni Network — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Once an Elias, always an Elias. Join 12,000+ alumni across 36 states and 14 countries — network, mentor, hire and give back.",
      },
    ],
  }),
  component: Alumni,
});

const stats = [
  { value: "12,480+", label: "Alumni worldwide" },
  { value: "36", label: "Nigerian states" },
  { value: "14", label: "Countries" },
  { value: "78%", label: "Placement rate" },
];

const features = [
  {
    icon: Network,
    title: "Directory & networking",
    body: "Search by industry, company, skills or cohort. Connect, message and collaborate — the directory never expires.",
  },
  {
    icon: BookOpen,
    title: "Mentor the next cohort",
    body: "Sign up to mentor, get matched with students in your field and shape careers the way yours was shaped.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Jobs & referrals",
    body: "Browse the private job board, refer roles and get paid referral credits when hires stick.",
  },
  {
    icon: HandHeart,
    title: "Give back",
    body: "Fund scholarships, sponsor bootcamps, speak at open days or volunteer — every contribution is tracked to impact.",
  },
];

const alumni = [
  {
    name: "Chiamaka Obi",
    role: "Frontend Engineer, Paystack",
    program: "Full-Stack · 2024",
    emoji: "⚡",
  },
  {
    name: "Tunde Adeyemi",
    role: "SOC Analyst, Interswitch",
    program: "Cybersecurity · 2024",
    emoji: "🛡️",
  },
  {
    name: "Halima Yusuf",
    role: "Product Designer, Freelance",
    program: "UI/UX · 2023",
    emoji: "🎨",
  },
  {
    name: "Emeka Nwosu",
    role: "Cloud Engineer, Andela",
    program: "Cloud & DevOps · 2023",
    emoji: "☁️",
  },
  { name: "Fatima Sani", role: "Data Analyst, MTN", program: "Data Science · 2024", emoji: "📊" },
  { name: "David Okafor", role: "Founder, SwiftHire", program: "Full-Stack · 2022", emoji: "🚀" },
];

function Alumni() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Alumni"
        title={
          <>
            Once an Elias, <span className="text-gradient">always an Elias</span>
          </>
        }
        description="The alumni network is the academy's longest-running program. 12,000+ graduates across 36 states and 14 countries — connected, mentoring and hiring each other."
      >
        <StaggerGroup className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="bg-card shadow-soft rounded-2xl border p-4 text-center">
                <p className="font-display text-gradient text-2xl font-extrabold">{s.value}</p>
                <p className="text-muted-foreground mt-1 text-[11px] font-medium">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </PageHero>

      <section className="container-page py-20 md:py-24">
        <SectionHeading eyebrow="The network" title="What stays with you after graduation" />
        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <TiltCard intensity={4} className="h-full">
                <div className="bg-card shadow-soft hover:shadow-elevated flex h-full flex-col rounded-2xl border p-7 transition-shadow">
                  <div className="bg-primary/10 text-primary grid size-11 place-items-center rounded-xl">
                    <f.icon className="size-5" />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-bold">{f.title}</h3>
                  <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed">{f.body}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Success stories"
            title="The alumni spotlight"
            description="Promotions, launches and breakthroughs — shared by the people who lived them."
          />
          <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {alumni.map((a) => (
              <StaggerItem key={a.name}>
                <div className="bg-card shadow-soft hover:shadow-elevated h-full rounded-2xl border p-7 transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="bg-gradient-brand grid size-12 place-items-center rounded-2xl text-2xl">
                      {a.emoji}
                    </span>
                    <Badge variant="secondary" className="font-semibold">
                      {a.program}
                    </Badge>
                  </div>
                  <p className="font-display mt-5 text-base font-bold">{a.name}</p>
                  <p className="text-muted-foreground text-sm">{a.role}</p>
                  <div className="mt-4 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="fill-career text-career size-3.5" />
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal delay={0.1} className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to="/stories">
                All success stories <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <SectionHeading align="center" eyebrow="In their words" title="What alumni say" />
        <StaggerGroup className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="bg-card shadow-soft relative h-full rounded-2xl border p-7">
                <Quote className="text-primary/15 absolute -top-2 right-4 size-16" />
                <p className="relative text-base leading-relaxed font-medium text-pretty">
                  “{t.quote}”
                </p>
                <div className="relative mt-6 flex items-center gap-3">
                  <span className="bg-gradient-brand text-primary-foreground font-display grid size-10 place-items-center rounded-full text-xs font-bold">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="container-page pb-20">
        <Reveal>
          <div className="bg-gradient-ink text-ink-foreground shadow-elevated relative overflow-hidden rounded-3xl px-8 py-14 md:px-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_0%,oklch(0.55_0.15_330/0.3),transparent)]" />
            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-ink-foreground/60 text-xs font-bold tracking-[0.18em] uppercase">
                  Give back
                </p>
                <h2 className="font-display mt-2 text-3xl font-extrabold sm:text-4xl">
                  Fund the next seat
                </h2>
                <p className="text-ink-foreground/75 mt-3 max-w-xl leading-relaxed">
                  Every donation is matched to a specific student journey — you'll see exactly whose
                  tuition you covered and what they went on to build.
                </p>
              </div>
              <Button asChild size="lg" className="bg-gradient-brand shadow-glow border-0">
                <Link to="/scholarships">
                  Give today <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Your network starts on day one"
        description="Join the academy and you join the network for life — mentor circles, hiring pipelines and 12,000+ people who've walked your path."
        primary={{ label: "Start your application", to: "/admissions" }}
        secondary={{ label: "Browse programs", to: "/programs" }}
      />
    </PageShell>
  );
}
