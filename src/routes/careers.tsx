import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Coffee,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Laptop,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero, CTASection, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at CEA — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Build the platform that builds careers. Open roles at Cyber Elias Academy — engineering, teaching, design, operations and more.",
      },
    ],
  }),
  component: CareersPage,
});

const roles = [
  {
    dept: "Academy",
    title: "Instructor — Full-Stack Development",
    type: "Full-time · Lagos or Remote",
    tags: ["React", "Node.js", "Teaching"],
  },
  {
    dept: "Academy",
    title: "Cybersecurity Mentor",
    type: "Part-time · Lagos",
    tags: ["SIEM", "Incident Response", "Mentoring"],
  },
  {
    dept: "Engineering",
    title: "Platform Engineer — CEA-OS",
    type: "Full-time · Remote (Nigeria)",
    tags: ["TypeScript", "TanStack", "Postgres"],
  },
  {
    dept: "Engineering",
    title: "Frontend Engineer — Learner Experience",
    type: "Full-time · Hybrid",
    tags: ["React", "Design Systems", "Accessibility"],
  },
  {
    dept: "Design",
    title: "Product Designer",
    type: "Full-time · Hybrid",
    tags: ["Figma", "Design Systems", "Research"],
  },
  {
    dept: "Career Services",
    title: "Employer Partnerships Lead",
    type: "Full-time · Lagos",
    tags: ["BD", "HR Tech", "Networking"],
  },
  {
    dept: "Operations",
    title: "Student Success Officer",
    type: "Full-time · Lagos",
    tags: ["Support", "Empathy", "Organised"],
  },
  {
    dept: "Marketing",
    title: "Content & Community Manager",
    type: "Full-time · Remote",
    tags: ["Writing", "Community", "Video"],
  },
];

const culture = [
  {
    icon: GraduationCap,
    title: "Learn on the job",
    desc: "Every staff member gets a seat in any program — free. Your growth is part of the product.",
  },
  {
    icon: HeartPulse,
    title: "Health & wellbeing",
    desc: "HMO for you and dependants, plus mental-health days that don't count against leave.",
  },
  {
    icon: Laptop,
    title: "Remote-friendly",
    desc: "Work from Lagos, Abuja or anywhere with good internet. We optimise for output, not seat-time.",
  },
  {
    icon: Handshake,
    title: "Ownership",
    desc: "Small teams, real decisions. Engineers ship to learners in their first month.",
  },
  {
    icon: Coffee,
    title: "The café",
    desc: "Free coffee, lunch on Fridays, and a corner that always has an open seat for a learner.",
  },
  {
    icon: Globe,
    title: "Mission-driven",
    desc: "You'll see graduates get hired because of work you shipped. That feeling doesn't fade.",
  },
];

function CareersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Careers at CEA"
        title={
          <>
            Help us build the platform that <span className="text-gradient">builds careers</span>
          </>
        }
        description="We're a small, senior team running a single product with one obsession: making sure CEA graduates get hired. If that sounds like your kind of mission, read on."
      />

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Open roles"
          title={`${roles.length} positions, one mission`}
          description="Remote-first across Nigeria. We hire for craft and curiosity — not certificates."
        />
        <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-2">
          {roles.map((r) => (
            <StaggerItem key={r.title}>
              <Card className="group bg-card shadow-soft hover:shadow-elevated h-full border transition-all hover:-translate-y-0.5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="font-semibold">
                      {r.dept}
                    </Badge>
                    <span className="text-muted-foreground flex items-center gap-1 text-xs font-semibold">
                      <MapPin className="size-3.5" /> {r.type}
                    </span>
                  </div>
                  <h3 className="font-display group-hover:text-primary mt-4 text-base leading-snug font-extrabold">
                    {r.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.tags.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="text-muted-foreground font-semibold"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-primary mt-5 inline-flex items-center gap-1 text-sm font-bold">
                    View role <ArrowUpRight className="size-4" />
                  </span>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal className="mt-10 text-center">
          <p className="text-muted-foreground text-sm">
            Don't see your role? We're always open to exceptional people —{" "}
            <Link
              to="/contact"
              className="text-primary font-semibold underline-offset-2 hover:underline"
            >
              introduce yourself
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <section className="bg-muted/40 border-y">
        <div className="container-page py-16 md:py-20">
          <SectionHeading
            eyebrow="Life at CEA"
            title="Why people stay"
            description="The perks people actually talk about in our internal channel."
          />
          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {culture.map((c) => (
              <StaggerItem key={c.title}>
                <div className="bg-card shadow-soft h-full rounded-2xl border p-6">
                  <span className="bg-primary/10 text-primary grid size-11 place-items-center rounded-xl">
                    <c.icon className="size-5" />
                  </span>
                  <h3 className="font-display mt-4 text-base font-extrabold">{c.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-12">
            <div className="bg-gradient-ink text-ink-foreground shadow-elevated mx-auto max-w-3xl rounded-3xl p-8 text-center sm:p-10">
              <Sparkles className="text-career mx-auto size-6" />
              <h3 className="font-display mt-3 text-xl font-extrabold">Our hiring promise</h3>
              <p className="text-ink-foreground/70 mx-auto mt-2 max-w-md text-sm leading-relaxed">
                Every applicant hears back within 5 working days. Every interview ends with
                feedback. If you're not the right fit now, we'll tell you exactly why — and what to
                work on.
              </p>
              <Button asChild size="lg" className="bg-gradient-brand shadow-glow mt-6 border-0">
                <Link to="/contact">
                  Apply or ask questions <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
