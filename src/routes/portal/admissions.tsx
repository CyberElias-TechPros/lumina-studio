import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Mail,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions Portal — CEA-OS" },
      {
        name: "description",
        content: "Application pipeline, assessments and offers for the admissions team.",
      },
    ],
  }),
  component: AdmissionsPortal,
});

const pipeline = [
  { stage: "Applications", count: 74 },
  { stage: "Screening", count: 41 },
  { stage: "Assessment", count: 28 },
  { stage: "Interviews", count: 12 },
  { stage: "Offers", count: 9 },
];

const offers = [
  {
    name: "Adaeze Okafor",
    program: "Full-Stack",
    type: "Offer · Merit 50%",
    status: "Sent",
    tone: "bg-primary/10 text-primary",
  },
  {
    name: "Yusuf Lawal",
    program: "Data & AI",
    type: "Offer · Full",
    status: "Accepted",
    tone: "bg-success/10 text-success",
  },
  {
    name: "Halima Sani",
    program: "Cybersecurity",
    type: "Waitlist",
    status: "Pending",
    tone: "bg-warning/10 text-warning",
  },
];

function AdmissionsPortal() {
  return (
    <AppShell
      roleKey="student"
      title="Admissions office"
      subtitle="Cohort 16 · applications close Aug 22"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">74 applicants</Badge>
          <Button asChild variant="outline" size="sm" className="ml-auto">
            <Link to="/admissions">Public admissions page</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Applications",
            value: "74",
            delta: "+12 this week",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Assessment sent",
            value: "53",
            delta: "61% completion",
            icon: ClipboardCheck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Interviews booked",
            value: "12",
            delta: "this week",
            icon: CalendarDays,
            tone: "bg-career/10 text-career",
          },
          {
            label: "Conversion",
            value: "22%",
            delta: "target 25%",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
        ].map((k) => (
          <Card key={k.label} className="bg-card shadow-soft border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                  {k.label}
                </p>
                <span className={cn("grid size-8 place-items-center rounded-lg", k.tone)}>
                  <k.icon className="size-4" />
                </span>
              </div>
              <p className="font-display mt-3 text-2xl font-extrabold">{k.value}</p>
              <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Users className="text-primary size-4" /> Pipeline · Cohort 16
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {pipeline.map((p, i) => (
                  <div key={p.stage} className="text-center">
                    <div
                      className={cn(
                        "rounded-xl border p-3",
                        i === 4 && "border-primary bg-primary/5",
                      )}
                    >
                      <p className="font-display text-lg font-extrabold">{p.count}</p>
                      <p className="text-muted-foreground mt-0.5 text-[10px] font-bold tracking-wide uppercase">
                        {p.stage}
                      </p>
                    </div>
                    {i < 4 && <div className="bg-border mx-auto mt-2 h-px w-1/2" />}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary" className="font-semibold">
                  Top channels: WhatsApp 34% · Referrals 22% · Google 18%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CheckCircle2 className="text-primary size-4" /> Recent offers
              </CardTitle>
              <Badge variant="secondary" className="font-semibold">
                Decision target: 5 days
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {offers.map((o) => (
                <div
                  key={o.name}
                  className="flex flex-wrap items-center gap-3 rounded-xl border p-3.5"
                >
                  <span className="bg-gradient-brand text-white font-display grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold">
                    {o.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{o.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {o.program} · {o.type}
                    </p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", o.tone)}>{o.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Mail className="text-primary size-4" /> Email sequences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  t: "Assessment reminder (auto)",
                  d: "Sent to 12 applicants · 9 completed",
                  tone: "bg-learning/10 text-learning",
                },
                {
                  t: "Interview scheduling",
                  d: "Open slots: 8 this week",
                  tone: "bg-primary/10 text-primary",
                },
                {
                  t: "Scholarship follow-up",
                  d: "27 need-based applicants in review",
                  tone: "bg-warning/10 text-warning",
                },
              ].map((x) => (
                <div key={x.t} className="rounded-xl border p-3.5">
                  <p className="text-sm font-bold">{x.t}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{x.d}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <ClipboardCheck className="text-career size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Assessment integrity</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Proctoring flagged 2 sessions this week. Both verified manually — no action needed.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/apply/status">
                  Applicant tracker <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
