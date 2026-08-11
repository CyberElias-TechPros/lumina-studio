import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  HandHeart,
  Network,
  Quote,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from "@/components/motion";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/alumni")({
  head: () =>
    getPageHead({
      title: "Alumni Network",
      description:
        "Once an Elias, always an Elias. The network is built by every graduating cohort — mentor, hire and give back from day one.",
      path: "/alumni",
    }),
  component: Alumni,
});

const stats = [
  { value: "9", label: "Training domains" },
  { value: "5", label: "Ecosystem pillars" },
  { value: "30+", label: "CEA-OS workspaces" },
  { value: "10", label: "Journey stages" },
];

const features = [
  {
    icon: Network,
    title: "Directory & networking",
    body: "Search by industry, company, skills or cohort. Connect, message and collaborate — the directory is being built to never expire.",
  },
  {
    icon: BookOpen,
    title: "Mentor the next cohort",
    body: "Sign up to mentor, get matched with students in your field and shape careers the way yours was shaped.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Jobs & referrals",
    body: "The private job board, referral credits and hiring pipelines open with the first graduating cohorts.",
  },
  {
    icon: HandHeart,
    title: "Give back",
    body: "Fund scholarships, sponsor bootcamps, speak at open days or volunteer — every contribution tracked to impact.",
  },
];

function Alumni() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Alumni"
        art="community"
        title={
          <>
            Once an Elias, <span className="text-gradient">always an Elias</span>
          </>
        }
        description="The alumni network is the academy's longest-running program — it grows with every cohort, from the very first one."
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
            description="Promotions, launches and breakthroughs — shared by the people who live them, once they've lived them."
          />
          <div className="border-dashed bg-card/50 mt-12 flex flex-col items-center rounded-3xl border p-12 text-center">
            <Sparkles className="text-muted-foreground size-9" />
            <h3 className="font-display mt-5 text-xl font-extrabold">
              The first spotlights are being earned
            </h3>
            <p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed">
              We'd rather show you a real first cohort than a fictional highlight reel. When our
              graduates land their first roles, their stories appear here — with their permission.
            </p>
            <Button asChild variant="outline" className="mt-7">
              <Link to="/stories">
                How we'll tell those stories <ArrowUpRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <SectionHeading align="center" eyebrow="In their words" title="What alumni say" />
        <div className="mx-auto mt-12 max-w-3xl">
          <Reveal>
            <div className="bg-card shadow-soft relative rounded-3xl border p-8 text-center md:p-10">
              <Quote className="text-primary/15 absolute -top-2 right-6 size-16" />
              <p className="relative text-lg leading-relaxed font-medium text-pretty sm:text-xl">
                “The academy is a network, not a transaction. Alumni mentor students, students
                become alumni, and every cohort extends the ladder for the next one.”
              </p>
              <p className="text-muted-foreground relative mt-6 text-sm font-semibold">
                The alumni charter · written for cohort one
              </p>
            </div>
          </Reveal>
        </div>
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
        description="Join the academy and you join the network for life — mentor circles, hiring pipelines and a community of people who've walked your path."
        primary={{ label: "Start your application", to: "/admissions" }}
        secondary={{ label: "Browse programs", to: "/programs" }}
      />
    </PageShell>
  );
}
