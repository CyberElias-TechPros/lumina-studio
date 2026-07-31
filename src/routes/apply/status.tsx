import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileText,
  GraduationCap,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/apply/status")({
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
  component: ApplyStatusPage,
});

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

function ApplyStatusPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Application tracking"
        title={
          <>
            Where your application <span className="text-gradient">stands</span>
          </>
        }
        description="Enter your application ID (e.g. CEA-2026-0142) or use the email you applied with. We'll show you exactly where things are."
      />

      <section className="container-page pb-20">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <Card className="bg-card shadow-soft border">
              <CardContent className="p-6">
                <Label htmlFor="appId">Application ID or email</Label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <Input id="appId" placeholder="CEA-2026-0142" className="flex-1" />
                  <Button className="bg-gradient-brand shadow-glow border-0">
                    Track application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display text-lg font-extrabold">CEA-2026-0142</p>
                <p className="text-muted-foreground text-sm">
                  Full-Stack Software Development · Cohort 16
                </p>
              </div>
              <Badge className="bg-warning/10 text-warning border-0 font-bold">
                Assessment pending
              </Badge>
            </div>
          </Reveal>

          <ol className="mt-6 space-y-0">
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
                      <Clock className="size-3.5" /> {s.meta}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

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
                <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                  <Link to="/contact">Email admissions</Link>
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
