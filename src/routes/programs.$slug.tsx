import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  Clock,
  Globe,
  Laptop,
  MapPin,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { ProgramArt } from "@/components/art/program-art";
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from "@/components/motion";
import { engineMap, formatNaira, programs } from "@/data/site";

export const Route = createFileRoute("/programs/$slug")({
  head: () => ({
    meta: [
      { title: "Program — Cyber Elias Academy" },
      {
        name: "description",
        content: "Program detail at Cyber Elias Academy.",
      },
    ],
  }),
  component: ProgramDetail,
});

function ProgramDetail() {
  const { slug } = useParams({ from: "/programs/$slug" });
  const program = programs.find((p) => p.slug === slug) ?? programs[0];
  const engine = engineMap[program.engine];

  const totalLessons = program.modules.reduce((sum, m) => sum + m.lessons, 0);
  const totalHours = program.modules.reduce((sum, m) => sum + m.hours, 0);
  const related = programs
    .filter((p) => p.category === program.category && p.slug !== program.slug)
    .slice(0, 3);
  const moreRelated = related.length
    ? related
    : programs.filter((p) => p.slug !== program.slug).slice(0, 3);

  return (
    <PageShell>
      <section className="relative overflow-hidden border-b">
        <div
          className={`${engine?.gradient ?? "bg-gradient-brand"} absolute inset-x-0 top-0 h-1`}
        />
        <div className="container-page py-14 md:py-18">
          <Reveal>
            <Link
              to="/programs"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="size-4" /> All programs
            </Link>
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Reveal delay={0.05}>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="font-semibold">
                    {program.category}
                  </Badge>
                  <Badge
                    className={engine?.text ? `border-0 ${engine.text}` : ""}
                    variant="outline"
                  >
                    {engine?.name}
                  </Badge>
                  <Badge variant="outline">{program.level}</Badge>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-display mt-5 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-[3.4rem] md:leading-[1.05]">
                  {program.title}
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed text-pretty">
                  {program.blurb}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <Clock className="text-primary size-4" /> {program.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="text-primary size-4" /> {program.mode}
                  </span>
                  {program.learners > 0 && (
                    <span className="flex items-center gap-2">
                      <Users className="text-primary size-4" /> {program.learners.toLocaleString()}{" "}
                      learners
                    </span>
                  )}
                  {program.rating > 0 && (
                    <span className="flex items-center gap-2">
                      <Star className="fill-career text-career size-4" /> {program.rating} rating
                    </span>
                  )}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 sm:-inset-10"
              >
                <ProgramArt slug={program.slug} className="rounded-3xl" />
              </div>
              <TiltCard intensity={5} className="relative h-full">
                <div className="glass shadow-elevated h-full rounded-3xl border p-7">
                  <p className="text-muted-foreground text-xs font-bold tracking-[0.16em] uppercase">
                    Tuition
                  </p>
                  <p className="font-display mt-2 text-4xl font-extrabold">
                    {formatNaira(program.price)}
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Split into monthly instalments · ISAs for selected tracks
                  </p>
                  <div className="my-6 h-px bg-border" />
                  <ul className="space-y-3 text-sm">
                    {[
                      "Live cohort sessions, recorded within 2 hours",
                      "Practitioner-graded capstone project",
                      "Mentor matching & portfolio studio",
                      "Career Engine access: jobs, gigs & employer network",
                      "Verifiable certificate on completion",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="text-success mt-0.5 size-4 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-brand shadow-glow mt-7 w-full border-0"
                  >
                    <Link to="/apply" search={{ program: program.slug }}>
                      Apply for this program <ArrowRight className="ml-1.5 size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="mt-3 w-full">
                    <Link to="/scholarships">Explore scholarships</Link>
                  </Button>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="container-page py-20 md:py-24">
          <SectionHeading
            eyebrow="Outcomes"
            title="What you'll be able to do"
            description="Every outcome maps to a deliverable you can show an employer."
          />
          <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2">
            {program.outcomes.map((o) => (
              <StaggerItem key={o}>
                <div className="bg-card shadow-soft flex items-start gap-3 rounded-2xl border p-5">
                  <span className="bg-success/10 text-success grid size-8 shrink-0 place-items-center rounded-full">
                    <Check className="size-4" />
                  </span>
                  <p className="pt-1 text-sm leading-relaxed font-medium">{o}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Curriculum"
              title="Modules"
              description={`${totalLessons} lessons · ${totalHours} hours of guided work across ${program.modules.length} modules.`}
            />
            <div className="mt-10 space-y-4">
              {program.modules.map((m, i) => (
                <Reveal key={m.title} delay={i * 0.05}>
                  <div className="group bg-card shadow-soft hover:shadow-elevated rounded-2xl border p-6 transition-shadow">
                    <div className="flex items-center gap-4">
                      <span className="bg-gradient-brand text-primary-foreground font-display grid size-10 shrink-0 place-items-center rounded-xl text-sm font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-display text-base font-bold">{m.title}</h3>
                        <p className="text-muted-foreground mt-0.5 text-xs font-medium">
                          {m.lessons} lessons · {m.hours} hours
                        </p>
                      </div>
                      <PlayCircle className="text-muted-foreground/40 group-hover:text-primary size-5 transition-colors" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:pt-16">
            <Reveal>
              <div className="bg-gradient-ink text-ink-foreground shadow-elevated sticky top-28 overflow-hidden rounded-3xl p-8">
                <AuroraBg />
                <div className="relative">
                  <h3 className="font-display text-xl font-bold">Program snapshot</h3>
                  <dl className="mt-6 space-y-5 text-sm">
                    {[
                      { icon: Clock, label: "Duration", value: program.duration },
                      { icon: MapPin, label: "Delivery", value: program.mode },
                      { icon: Laptop, label: "Tools", value: program.tools.join(" · ") },
                      {
                        icon: Globe,
                        label: "Certificate",
                        value: "Verifiable · Industry-recognised",
                      },
                      { icon: Award, label: "Capstone", value: "Practitioner-graded" },
                    ].map((row) => (
                      <div key={row.label} className="flex items-start gap-3">
                        <row.icon className="text-ink-foreground/60 mt-0.5 size-4 shrink-0" />
                        <div>
                          <dt className="text-ink-foreground/60 text-[11px] font-bold tracking-[0.14em] uppercase">
                            {row.label}
                          </dt>
                          <dd className="mt-0.5 font-semibold">{row.value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Keep exploring"
            title="Related programs"
            description="Programs in the same family — or the next step on the roadmap."
          />
          <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {moreRelated.map((p) => (
              <StaggerItem key={p.slug}>
                <Link
                  to="/programs/$slug"
                  params={{ slug: p.slug }}
                  className="group bg-card shadow-soft hover:shadow-elevated flex h-full flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1"
                >
                  <Badge variant="secondary" className="w-fit font-semibold">
                    {p.category}
                  </Badge>
                  <h3 className="font-display group-hover:text-primary mt-4 text-lg font-bold">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
                    {p.blurb}
                  </p>
                  <div className="text-muted-foreground mt-4 text-xs font-medium">
                    {p.duration} · {p.level}
                  </div>
                  <span className="font-display mt-4 border-t pt-4 text-base font-bold">
                    {formatNaira(p.price)}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CTASection
        title={`Start ${program.title}`}
        description="Applications are reviewed weekly. The next cohort opens soon — reserve your seat and get the full curriculum pack by email."
        primary={{ label: "Apply now", to: "/apply" }}
        secondary={{ label: "Compare programs", to: "/programs/compare" }}
      />
    </PageShell>
  );
}

function AuroraBg() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_0%,oklch(0.55_0.15_330/0.25),transparent)]" />
  );
}
