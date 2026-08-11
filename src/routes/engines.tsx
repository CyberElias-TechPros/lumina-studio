import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  CircleDollarSign,
  Gauge,
  GraduationCap,
  Heart,
  Layers,
  MessageSquare,
  Rocket,
  Users,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import {
  Aurora,
  Reveal,
  Spotlight,
  StaggerGroup,
  StaggerItem,
  TiltCard,
} from "@/components/motion";
import { engines, engineMap } from "@/data/site";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/engines")({
  head: () =>
    getPageHead({
      title: "The Five Engines",
      description:
        "One platform, five engines: Learning, Career, Services, ERP and Community. Every actor in the academy connected on a single operating system.",
      path: "/engines",
    }),
  component: Engines,
});

const engineLinks = {
  learning: { label: "Browse programs", to: "/programs" },
  career: { label: "Explore the marketplace", to: "/marketplace" },
  services: { label: "See client work", to: "/work" },
  erp: { label: "Meet the institution", to: "/about" },
  community: { label: "Join the community", to: "/community" },
} as const;

const actorGroups = [
  {
    icon: GraduationCap,
    title: "Learners",
    actors: ["Prospective Student", "Current Student", "Intern", "Alumni", "Parent"],
  },
  {
    icon: Users,
    title: "Educators",
    actors: ["Instructor", "Mentor", "Department Head"],
  },
  {
    icon: Building2,
    title: "Business",
    actors: ["Client", "Employer", "Partner", "Supplier"],
  },
  {
    icon: Boxes,
    title: "Institution",
    actors: ["Director", "Operations", "Accountant", "HR", "Admissions", "Receptionist"],
  },
  {
    icon: Layers,
    title: "Platform",
    actors: ["IT Support", "Developer", "System Admin", "Marketing", "Growth", "Design"],
  },
  {
    icon: Rocket,
    title: "Ecosystem",
    actors: ["Volunteer", "NGO", "Government Rep", "Visitor"],
  },
];

function EngineSection({ index, engine }: { index: number; engine: (typeof engines)[number] }) {
  const link = engineLinks[engine.key];
  const EngineIcon = [BookOpen, BriefcaseIcon, WrenchIcon, GaugeIcon, HeartIcon][index];
  return (
    <section className="border-t">
      <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <div
              className={`${engine.gradient} grid size-14 place-items-center rounded-2xl text-white shadow-lg`}
            >
              <EngineIcon className="size-7" />
            </div>
            <p className="text-muted-foreground mt-6 text-sm font-bold tracking-[0.18em] uppercase">
              Engine 0{index + 1}
            </p>
            <h2 className="font-display mt-2 text-3xl font-extrabold text-balance sm:text-4xl">
              {engine.name}
            </h2>
            <p className={`${engine.text} mt-2 text-sm font-bold tracking-[0.14em] uppercase`}>
              {engine.tagline}
            </p>
            <p className="text-muted-foreground mt-5 text-base leading-relaxed text-pretty">
              {engine.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {engine.bullets.map((b) => (
                <Badge key={b} variant="secondary" className="font-medium">
                  {b}
                </Badge>
              ))}
            </div>
            <Button asChild className="bg-gradient-brand shadow-glow mt-8 h-11 border-0">
              <Link to={link.to}>
                {link.label} <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <StaggerGroup className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: CalendarDays, title: "What runs here", body: engine.bullets[0] },
            { icon: CircleDollarSign, title: "Who it pays", body: engine.bullets[1] },
            { icon: MessageSquare, title: "How it connects", body: engine.bullets[2] },
            {
              icon: Check,
              title: "Where it shows up",
              body:
                engine.key === "learning"
                  ? "Programs, lessons, labs, gradebook and certificates"
                  : engine.key === "career"
                    ? "Portfolios, jobs, gigs and mentor sessions"
                    : engine.key === "services"
                      ? "Client projects, proposals and support tickets"
                      : engine.key === "erp"
                        ? "Finance, HR, inventory and admissions pipelines"
                        : "Forums, events, alumni and partner programs",
            },
          ].map((f, i) => (
            <StaggerItem key={f.title}>
              <div className="bg-card shadow-soft h-full rounded-2xl border p-6">
                <f.icon className="text-primary size-5" />
                <h3 className="font-display mt-3 text-base font-bold">{f.title}</h3>
                <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{f.body}</p>
                <div className="bg-muted mt-4 h-1.5 w-full overflow-hidden rounded-full">
                  <div
                    className={`${engine.gradient} h-full rounded-full`}
                    style={{ width: `${78 - i * 13}%` }}
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
          <StaggerItem className="sm:col-span-2">
            <div className="bg-gradient-ink text-ink-foreground relative overflow-hidden rounded-2xl p-6">
              <Aurora className="opacity-50" />
              <p className="relative text-sm leading-relaxed">
                Every engine shares one identity, one permission model and one data layer — a
                student's attendance, portfolio and invoice live in the same system as the
                director's dashboard.
              </p>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}

function Engines() {
  return (
    <PageShell>
      <PageHero
        eyebrow="CEA-OS"
        art="network"
        title={
          <>
            Five engines. <span className="text-gradient">One academy.</span>
          </>
        }
        description="Cyber Elias Academy runs on a single digital operating system. Every course, client, invoice, hire and event connects through five engines designed to work as one."
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {engines.map((e) => (
            <Link
              key={e.key}
              to="/engines"
              className={`${e.text} bg-card shadow-soft hover:shadow-elevated flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-shadow`}
            >
              <span className={`${e.gradient} size-2 rounded-full`} />
              {e.name}
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="bg-muted/40 border-b">
        <div className="container-page py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {engines.map((e, i) => (
              <Reveal key={e.key} delay={i * 0.06}>
                <div className="bg-card shadow-soft rounded-2xl border p-5 text-center">
                  <div
                    className={`${e.gradient} mx-auto grid size-10 place-items-center rounded-xl`}
                  >
                    <span className="size-3.5 rounded-sm bg-white/85" />
                  </div>
                  <p className="font-display mt-3 text-sm font-bold">{e.name}</p>
                  <p className="text-muted-foreground mt-1 text-xs">{e.tagline}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {engines.map((engine, i) => (
        <EngineSection key={engine.key} index={i} engine={engine} />
      ))}

      <section className="border-t">
        <div className="container-page py-20 md:py-28">
          <SectionHeading
            align="center"
            eyebrow="Every actor"
            title={
              <>
                Built for <span className="text-gradient">32 actors</span>, one operating system
              </>
            }
            description="From a walk-in visitor to the director's command centre, everyone gets a role-aware dashboard over the same data."
          />
          <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {actorGroups.map((g) => (
              <StaggerItem key={g.title}>
                <TiltCard intensity={4} className="h-full">
                  <div className="bg-card shadow-soft h-full rounded-2xl border p-7">
                    <div className="flex items-center gap-3">
                      <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-xl">
                        <g.icon className="size-5" />
                      </span>
                      <h3 className="font-display text-lg font-bold">{g.title}</h3>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {g.actors.map((a) => (
                        <Badge key={a} variant="secondary" className="font-medium">
                          {a}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CTASection
        title="See the operating system in action"
        description="Start as a learner, a client, an employer or a partner — every journey lands in the same connected platform."
        primary={{ label: "Start your application", to: "/admissions" }}
        secondary={{ label: "Preview the dashboards", to: "/app" }}
      />
    </PageShell>
  );
}

function BriefcaseIcon(props: { className?: string }) {
  return <Briefcase {...props} />;
}
function WrenchIcon(props: { className?: string }) {
  return <Wrench {...props} />;
}
function GaugeIcon(props: { className?: string }) {
  return <Gauge {...props} />;
}
function HeartIcon(props: { className?: string }) {
  return <Heart {...props} />;
}
