import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  GraduationCap,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/apply/status/$id")({
  head: () => ({
    meta: [
      { title: "Application Status — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Track your CEA application. See exactly where it is and what happens next at every stage.",
      },
    ],
  }),
  component: ApplyStatusDetailPage,
});

const profiles: Record<
  string,
  { program: string; cohort: string; stage: string; badge: string; tone: string }
> = {
  "CEA-2026-0142": {
    program: "Full-Stack Software Development",
    cohort: "Cohort 01",
    stage: "Assessment pending",
    badge: "bg-warning/10 text-warning",
    tone: "warning",
  },
  "CEA-2026-0387": {
    program: "UI/UX Design",
    cohort: "Cohort 01",
    stage: "Interview scheduled",
    badge: "bg-primary/10 text-primary",
    tone: "primary",
  },
  "CEA-2026-0091": {
    program: "Backend Engineering",
    cohort: "Cohort 01",
    stage: "Offer sent",
    badge: "bg-success/10 text-success",
    tone: "success",
  },
};

const stages = [
  {
    label: "Submitted",
    desc: "We've received your application and program choice.",
    meta: "Done · Aug 12",
    icon: FileText,
    state: "done",
  },
  {
    label: "Screening",
    desc: "An admissions officer reviews your profile and background.",
    meta: "Done · Aug 13",
    icon: ShieldCheck,
    state: "done",
  },
  {
    label: "Assessment",
    desc: "Your 45-minute assessment link is sent by email. Complete it within 7 days.",
    meta: "Awaiting you · link sent",
    icon: ClipboardCheck,
    state: "active",
  },
  {
    label: "Interview",
    desc: "A 20-minute call with your future mentor to confirm fit and cohort.",
    meta: "Scheduled after assessment",
    icon: GraduationCap,
    state: "pending",
  },
  {
    label: "Decision",
    desc: "Offer letter, scholarship options and enrolment documents.",
    meta: "~5 working days after interview",
    icon: CheckCircle2,
    state: "pending",
  },
];

function ApplyStatusDetailPage() {
  const { id } = Route.useParams();
  const profile = profiles[id] ?? {
    program: "Full-Stack Software Development",
    cohort: "Cohort 01",
    stage: "Assessment pending",
    badge: "bg-warning/10 text-warning",
    tone: "warning",
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Application tracking"
        title={
          <>
            Where your application <span className="text-gradient">stands</span>
          </>
        }
        description={`Live status for ${id} — updated whenever our team moves your application.`}
      />

      <section className="container-page pb-20">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display text-lg font-extrabold">{id}</p>
                <p className="text-muted-foreground text-sm">
                  {profile.program} · {profile.cohort}
                </p>
              </div>
              <Badge className={cn("border-0 font-bold", profile.badge)}>{profile.stage}</Badge>
            </div>
          </Reveal>

          <ol className="mt-8 space-y-0">
            {stages.map((s, i) => (
              <Reveal key={s.label} delay={0.05 * i}>
                <li className="relative flex gap-4 pb-8 last:pb-0">
                  {i < stages.length - 1 && (
                    <span
                      className={cn(
                        "absolute top-10 left-[19px] h-[calc(100%-2.5rem)] w-px",
                        s.state === "done" ? "bg-primary" : "bg-border",
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "z-10 grid size-10 shrink-0 place-items-center rounded-full border-2 bg-background",
                      s.state === "done" && "border-primary bg-primary/10 text-primary",
                      s.state === "active" && "border-primary text-primary shadow-glow",
                      s.state === "pending" && "border-border text-muted-foreground",
                    )}
                  >
                    {s.state === "done" ? (
                      <CheckCircle2 className="size-4.5" />
                    ) : (
                      <s.icon className="size-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-sm font-extrabold">{s.label}</p>
                      {s.state === "active" && (
                        <Badge className="bg-primary/10 text-primary h-5 border-0 text-[10px] font-bold">
                          Current
                        </Badge>
                      )}
                      {s.state === "done" && (
                        <Badge className="bg-success/10 text-success h-5 border-0 text-[10px] font-bold">
                          Complete
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">{s.desc}</p>
                    <p className="text-muted-foreground/80 mt-1.5 flex items-center gap-1.5 text-xs font-semibold">
                      <Clock3 className="size-3.5" /> {s.meta}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <StaggerGroup className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: BadgeCheck, t: "No fees", d: "Applying is always free." },
              { icon: ShieldCheck, t: "Human review", d: "A person reads your file." },
              { icon: Mail, t: "Email updates", d: "We email every stage change." },
            ].map((f) => (
              <StaggerItem key={f.t}>
                <div className="bg-card flex items-center gap-3 rounded-xl border p-4">
                  <f.icon className="text-primary size-4.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold">{f.t}</p>
                    <p className="text-muted-foreground text-[11px]">{f.d}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.2}>
            <Card className="bg-gradient-ink text-ink-foreground shadow-elevated mt-10 border-0">
              <CardContent className="p-6">
                <p className="font-display flex items-center gap-2 text-base font-extrabold">
                  <Mail className="size-4" /> Need help?
                </p>
                <p className="text-ink-foreground/70 mt-1.5 text-sm">
                  Admissions replies within one working day. Quote your application ID for a faster
                  response.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button asChild size="sm" className="bg-gradient-brand shadow-glow border-0">
                    <Link to="/contact">Email admissions</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="bg-white/10 text-white border-white/30"
                  >
                    <Link to="/apply/status">Track another ID</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
