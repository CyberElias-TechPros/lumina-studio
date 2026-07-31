import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  FileText,
  MessageSquare,
  Search,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/employer")({
  head: () => ({
    meta: [
      { title: "Employer Portal — CEA-OS" },
      {
        name: "description",
        content:
          "Post jobs, search verified talent, run interview pipelines and track hiring outcomes with CEA's employer workspace.",
      },
    ],
  }),
  component: EmployerPortal,
});

const pipeline = [
  { stage: "Applied", count: 48 },
  { stage: "Shortlisted", count: 12 },
  { stage: "Interviews", count: 5 },
  { stage: "Offers", count: 2 },
];

const candidates = [
  {
    name: "Adaeze Okafor",
    match: 96,
    skill: "Full-Stack · C15",
    stage: "Interview",
    tone: "bg-primary/10 text-primary",
  },
  {
    name: "Tunde Bakare",
    match: 91,
    skill: "DevOps · C11",
    stage: "Offer sent",
    tone: "bg-success/10 text-success",
  },
  {
    name: "Rita Adeyemi",
    match: 88,
    skill: "Product Design · C9",
    stage: "Shortlist",
    tone: "bg-warning/10 text-warning",
  },
];

function EmployerPortal() {
  return (
    <AppShell
      roleKey="employer"
      title="Employer hub"
      subtitle="Paystack · Talent partner since 2023"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Silver partner
          </Badge>
          <Button asChild variant="outline" size="sm" className="ml-auto">
            <Link to="/marketplace">Job marketplace</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active roles",
            value: "6",
            delta: "2 new this month",
            icon: BriefcaseBusiness,
            tone: "bg-career/10 text-career",
          },
          {
            label: "Candidates in pipeline",
            value: "48",
            delta: "+12 this week",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Interviews booked",
            value: "5",
            delta: "this week",
            icon: CalendarDays,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Hired from CEA",
            value: "14",
            delta: "avg. retention 18 mo",
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <BriefcaseBusiness className="text-primary size-4" /> Candidate pipeline — Frontend
                Engineer
              </CardTitle>
              <Badge variant="secondary" className="font-semibold">
                Posted 2 days ago
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {pipeline.map((p, i) => (
                  <div key={p.stage} className="text-center">
                    <div
                      className={cn(
                        "rounded-xl border p-3",
                        i === 2 && "border-primary bg-primary/5",
                      )}
                    >
                      <p className="font-display text-lg font-extrabold">{p.count}</p>
                      <p className="text-muted-foreground mt-0.5 text-[10px] font-bold tracking-wide uppercase">
                        {p.stage}
                      </p>
                    </div>
                    {i < 3 && <div className="bg-border mx-auto mt-2 h-px w-1/2" />}
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-3">
                {candidates.map((c) => (
                  <div
                    key={c.name}
                    className="flex flex-wrap items-center gap-3 rounded-xl border p-3.5"
                  >
                    <span className="bg-gradient-career text-white font-display grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold">
                      {c.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{c.name}</p>
                      <p className="text-muted-foreground text-xs">{c.skill}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="text-career size-3.5" />
                      <span className="text-xs font-extrabold">{c.match}%</span>
                      <span className="text-muted-foreground text-xs">match</span>
                    </div>
                    <Badge className={cn("border-0 font-semibold", c.tone)}>{c.stage}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Search className="text-primary size-4" /> Talent search
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
                <Link to="/marketplace">
                  Full search <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "TypeScript",
                  "Node.js",
                  "AWS",
                  "Terraform",
                  "Figma",
                  "SQL",
                  "3+ years",
                ].map((t) => (
                  <Badge key={t} variant="outline" className="font-semibold">
                    {t}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { v: 124, l: "Matching profiles" },
                  { v: 41, l: "Available now" },
                  { v: 96, l: "Avg. skill match" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border p-3.5 text-center">
                    <p className="text-gradient font-display text-xl font-extrabold">{s.v}</p>
                    <p className="text-muted-foreground mt-0.5 text-[11px] font-semibold">{s.l}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CalendarDays className="text-primary size-4" /> Interviews
              </CardTitle>
              <Badge className="bg-error/10 text-error h-5 border-0 text-[10px] font-bold">
                3 today
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  d: "14:00",
                  c: "Adaeze Okafor",
                  tag: "Technical",
                  tone: "bg-primary/10 text-primary",
                },
                { d: "16:30", c: "Yusuf Lawal", tag: "System design", tone: "bg-erp/10 text-erp" },
                {
                  d: "Thu 10:00",
                  c: "Chidinma Eze",
                  tag: "Culture fit",
                  tone: "bg-community/10 text-community",
                },
              ].map((i) => (
                <div key={i.c} className="flex items-center gap-3 rounded-xl border p-3">
                  <span className="font-display text-muted-foreground w-16 text-xs font-bold">
                    {i.d}
                  </span>
                  <p className="min-w-0 flex-1 truncate text-sm font-semibold">{i.c}</p>
                  <Badge className={cn("border-0 font-semibold", i.tone)}>{i.tag}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MessageSquare className="text-primary size-4" /> Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  from: "CEA Career Services",
                  msg: "Cohort 15 placement calls start next week — book your employer slot.",
                  time: "1d",
                },
                {
                  from: "Tunde Bakare",
                  msg: "Delighted to accept the offer — excited to join the team!",
                  time: "2d",
                },
              ].map((m) => (
                <div key={m.from} className="flex items-start gap-3 rounded-xl border p-3">
                  <span className="bg-gradient-brand text-white font-display grid size-9 shrink-0 place-items-center rounded-full text-[10px] font-bold">
                    {m.from
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center justify-between text-xs font-bold">
                      {m.from} <span className="text-muted-foreground font-medium">{m.time}</span>
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">{m.msg}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <CheckCircle2 className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Hiring outcomes report</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Last quarter: 9 hires, 83% passed probation, median time-to-hire 23 days.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Progress value={83} className="h-1.5 flex-1 bg-ink-foreground/15" />
                <span className="text-success text-xs font-extrabold">83%</span>
              </div>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/partners">
                  Partner programme <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FileText className="text-primary size-4" /> Upcoming: career fair
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                CEA Career Fair — September 12, Landmark Centre. Claim your booth before cohort 15
                graduates.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-4">
                <Link to="/events">
                  Fair details <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
