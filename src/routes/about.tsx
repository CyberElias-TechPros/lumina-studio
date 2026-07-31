import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Compass,
  HeartHandshake,
  Lightbulb,
  MapPin,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CTASection,
  PageHero,
  PageShell,
  SectionHeading,
  StatBand,
} from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from "@/components/motion";
import { team, timeline } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "From one classroom in Ikeja in 2018 to a five-engine digital operating system: the story, mission and people of Cyber Elias Academy.",
      },
    ],
  }),
  component: About,
});

const values = [
  {
    icon: Target,
    title: "Outcomes over certificates",
    body: "Every program is graded by what you can do — shipped projects, measured results, verifiable skills.",
  },
  {
    icon: Lightbulb,
    title: "Scratch to advanced",
    body: "No gatekeeping. If you're willing to work, there's a path that starts exactly where you are.",
  },
  {
    icon: HeartHandshake,
    title: "Network first",
    body: "The academy is a network, not a transaction. Alumni hire, mentor and fund the next cohort.",
  },
  {
    icon: Building2,
    title: "Built on our own stack",
    body: "We run the institution on CEA-OS — the same platform we teach on, invoice with and hire through.",
  },
];

function About() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title={
          <>
            From a whiteboard in Ikeja to a{" "}
            <span className="text-gradient">five-engine platform</span>
          </>
        }
        description="Cyber Elias Academy started in 2018 with twelve students, one instructor and a single classroom. Today it's a digital operating system connecting learners, employers, clients and staff."
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {["Founded 2018", "12,480+ graduates", "240+ hiring partners", "5 engines"].map((b) => (
            <Badge key={b} variant="secondary" className="font-medium">
              {b}
            </Badge>
          ))}
        </div>
      </PageHero>

      <StatBand />

      <section className="container-page py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <SectionHeading
            eyebrow="The story"
            title="Twelve students, one whiteboard, no shortcuts"
            description=""
          />
          <div className="space-y-5">
            <Reveal>
              <p className="text-muted-foreground leading-relaxed">
                In 2018, Elias Okonkwo ran a single evening class in Ikeja teaching web development
                to twelve students — with a borrowed projector and a stubborn belief that Nigerian
                talent needed only a real path into tech, not another certificate factory.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-muted-foreground leading-relaxed">
                The first cohort's placement rate changed everything. Employers began asking for
                graduates; students began asking for more tracks. Over eight years the academy grew
                into nine programs across software, security, cloud, data, design, marketing,
                networking and mobile — delivered online to all 36 states.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-muted-foreground leading-relaxed">
                In 2026, the academy runs on CEA-OS: one operating system where admissions,
                learning, finance, client work, hiring and community live in a single connected
                platform.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Milestones" title="The road so far" />
          <div className="relative mt-14 space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-border">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <div className="relative pl-10">
                  <span className="bg-gradient-brand absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full ring-4 ring-background">
                    <span className="size-[5px] rounded-full bg-white" />
                  </span>
                  <div className="bg-card shadow-soft rounded-2xl border p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-display text-gradient text-lg font-extrabold">
                        {t.year}
                      </span>
                      <h3 className="font-display text-base font-bold">{t.title}</h3>
                    </div>
                    <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{t.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <SectionHeading
          align="center"
          eyebrow="What we believe"
          title="Four values, zero exceptions"
        />
        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <TiltCard intensity={4} className="h-full">
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

      <section className="border-t">
        <div className="container-page py-20 md:py-24">
          <SectionHeading
            eyebrow="The people"
            title="Leadership"
            description="Operators first, executives second — every leader at the academy still ships, teaches or closes deals."
          />
          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <StaggerItem key={m.name}>
                <div className="group bg-card shadow-soft hover:shadow-elevated h-full rounded-2xl border p-7 transition-shadow">
                  <span className="bg-gradient-brand text-primary-foreground font-display grid size-14 place-items-center rounded-2xl text-lg font-bold">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <h3 className="font-display group-hover:text-primary mt-5 text-lg font-bold transition-colors">
                    {m.name}
                  </h3>
                  <p className="text-primary mt-0.5 text-sm font-semibold">{m.role}</p>
                  <p className="text-muted-foreground mt-2 text-sm">{m.focus}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-muted/40 border-y py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="The campus"
            title="Come see the labs in person"
            description="Located in Ikeja, Lagos — with live cohorts, a hardware lab, a design studio and a SOC simulation room. Tours run every first Saturday."
          />
          <Reveal delay={0.1}>
            <div className="bg-card shadow-soft rounded-3xl border p-8">
              <div className="flex items-center gap-3">
                <MapPin className="text-primary size-5" />
                <p className="font-display font-bold">Cyber Elias Academy</p>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                21 Awolowo Road, Ikeja, Lagos, Nigeria
              </p>
              <div className="my-6 h-px bg-border" />
              <div className="grid gap-3 text-sm">
                {[
                  "Labs open Mon–Sat, 8:00–20:00 WAT",
                  "Open day: first Saturday of every month",
                  "Virtual tours available on request",
                ].map((r) => (
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

      <CTASection
        title="Write the next chapter with us"
        description="Whether you're learning, hiring, building or funding — there's a seat for you at the academy."
        primary={{ label: "Start your application", to: "/admissions" }}
        secondary={{ label: "Meet the team", to: "/contact" }}
      />
    </PageShell>
  );
}
