import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ClipboardList,
  Code2,
  Headset,
  MessageSquare,
  Rocket,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from "@/components/motion";
import { caseStudies, formatNaira, services } from "@/data/site";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    getPageHead({
      title: "Services",
      description:
        "Technology services for businesses: custom software, cybersecurity audits, cloud migration, corporate training, design and growth — delivered by senior-led student squads.",
      path: "/services",
    }),
  component: Services,
});

const process = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Brief & scoping",
    body: "A discovery call, a written brief and a fixed-cost proposal within five working days.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Plan & team",
    body: "A senior lead, a project manager and a hand-picked squad from our graduate talent pool.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Build in the open",
    body: "A live portal with milestones, deliverables and weekly demos. No black boxes.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Handover & support",
    body: "Documentation, training and a support retainer — with the codebase owned by you.",
  },
];

function Services() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Services Engine"
        art="design"
        title={
          <>
            The academy as <span className="text-gradient">your agency</span>
          </>
        }
        description="Senior-led squads of our best graduates deliver real client work under supervision — software, security, cloud, design, training and growth. You get agency quality at academy economics."
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            "Fixed-scope quotes",
            "Weekly demos",
            "Code ownership",
            "Student-built, senior-led",
          ].map((b) => (
            <Badge key={b} variant="secondary" className="font-medium">
              {b}
            </Badge>
          ))}
        </div>
      </PageHero>

      <section className="container-page py-20 md:py-24">
        <SectionHeading
          eyebrow="What we deliver"
          title="Six service lines, one standard"
          description="Every engagement runs through the same delivery playbook: scoped, measured and reviewed by a senior practitioner."
        />
        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.slug}>
              <TiltCard intensity={5} className="h-full">
                <div className="bg-card shadow-soft hover:shadow-elevated relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-shadow">
                  <div className="bg-gradient-services absolute inset-x-0 top-0 h-1" />
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="font-semibold">
                      {s.engine === "services"
                        ? "Services"
                        : s.engine === "career"
                          ? "Talent"
                          : "Institution"}
                    </Badge>
                    <span className="font-display text-muted-foreground text-sm font-bold">
                      from {formatNaira(s.from)}
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-xl font-bold">{s.title}</h3>
                  <p className="text-muted-foreground mt-2.5 flex-1 text-sm leading-relaxed">
                    {s.blurb}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm">
                        <Check className="text-services size-4 shrink-0" /> {d}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="text-primary mt-6 inline-flex items-center gap-1 border-t pt-4 text-sm font-semibold"
                  >
                    Request a quote <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
          <StaggerItem>
            <div className="bg-gradient-ink text-ink-foreground relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-7">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_0%,oklch(0.55_0.15_330/0.25),transparent)]" />
              <div className="relative">
                <Shield className="size-8" />
                <h3 className="font-display mt-4 text-xl font-bold">Not sure what you need?</h3>
                <p className="text-ink-foreground/70 mt-3 text-sm leading-relaxed">
                  Book a free 30-minute technical consult. We'll map your problem to the right
                  service — even if that means referring you elsewhere.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10 relative mt-6 w-fit bg-transparent"
              >
                <Link to="/contact">
                  Book a consult <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </section>

      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="How it works" title="From brief to handover in four steps" />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="bg-card shadow-soft relative h-full rounded-2xl border p-6">
                  <span className="font-display text-gradient text-4xl font-extrabold">
                    {p.step}
                  </span>
                  <div className="bg-primary/10 text-primary mt-4 grid size-10 place-items-center rounded-xl">
                    <p.icon className="size-5" />
                  </div>
                  <h3 className="font-display mt-4 text-base font-bold">{p.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Proof"
            title="Recent client work"
            description="Selected engagements with measurable outcomes."
          />
          <Reveal delay={0.1}>
            <Button asChild variant="outline">
              <Link to="/work">
                All case studies <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
        {caseStudies.length > 0 ? (
          <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {caseStudies.map((c) => (
              <StaggerItem key={c.slug}>
                <Link
                  to="/work"
                  className="group bg-card shadow-soft hover:shadow-elevated flex h-full flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1"
                >
                  <Badge variant="secondary" className="w-fit font-semibold">
                    {c.sector}
                  </Badge>
                  <p className="font-display text-muted-foreground mt-4 text-xs font-bold tracking-[0.14em] uppercase">
                    {c.client}
                  </p>
                  <h3 className="font-display group-hover:text-primary mt-1.5 flex-1 text-base leading-snug font-bold">
                    {c.title}
                  </h3>
                  <span className="text-services mt-4 inline-flex items-center gap-1 text-sm font-bold">
                    {c.result}{" "}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <div className="border-dashed bg-card/50 mt-12 flex flex-col items-center rounded-3xl border p-12 text-center">
            <p className="font-display text-xl font-extrabold">Case studies are on the way</p>
            <p className="text-muted-foreground mt-2 max-w-md text-sm">
              We publish engagements only after clients sign off on the numbers. The first ones land
              as the Services Engine goes live.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/work">
                See the portfolio <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        )}
      </section>

      <CTASection
        title="Tell us what you're building"
        description="Reply within one working day with a scoping call invite — no obligation, no pressure."
        primary={{ label: "Start a project", to: "/contact" }}
        secondary={{ label: "See our work", to: "/work" }}
      />
    </PageShell>
  );
}
