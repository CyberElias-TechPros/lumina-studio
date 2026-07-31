import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Search,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/employer/hub")({
  head: () => ({
    meta: [
      { title: "Employer Hub — CEA-OS" },
      { name: "description", content: "Jobs, talent search and hiring analytics." },
    ],
  }),
  component: EmployerHub,
});

const tiles = [
  {
    to: "/app/employer/jobs",
    label: "Job management",
    desc: "Post roles, track applications",
    icon: BriefcaseBusiness,
    tone: "text-primary bg-primary/10",
  },
  {
    to: "/app/employer/talent",
    label: "Talent search",
    desc: "Browse verified portfolios",
    icon: Search,
    tone: "text-learning bg-learning/10",
  },
  {
    to: "/app/employer/pipeline/$jobId",
    label: "Candidate pipeline",
    desc: "Shortlist and interview",
    icon: Users,
    tone: "text-success bg-success/10",
  },
  {
    to: "/app/employer/interviews",
    label: "Interviews",
    desc: "Schedule and feedback",
    icon: CalendarDays,
    tone: "text-warning bg-warning/10",
  },
  {
    to: "/app/employer/analytics",
    label: "Analytics",
    desc: "Time-to-hire, retention",
    icon: BarChart3,
    tone: "text-erp bg-erp/10",
  },
  {
    to: "/app/employer/brand",
    label: "Brand page",
    desc: "Your company profile",
    icon: Building2,
    tone: "text-services bg-services/10",
  },
];

function EmployerHub() {
  return (
    <AppShell
      roleKey="instructor"
      title="Employer hub"
      subtitle="Paystack Technologies · 3 open roles"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Featured employer
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            <Star className="text-warning mr-1 size-3" /> 4.8 rating
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open roles",
            value: "3",
            delta: "51 applications",
            icon: BriefcaseBusiness,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Hires this year",
            value: "12",
            delta: "from CEA-OS",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Interviews",
            value: "6",
            delta: "4 scheduled",
            icon: CalendarDays,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Time to hire",
            value: "34d",
            delta: "−6d vs last yr",
            icon: BarChart3,
            tone: "bg-warning/10 text-warning",
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

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tiles.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            params={t.to.includes("$jobId") ? { jobId: "junior-backend-engineer" } : undefined}
            className="group bg-card shadow-soft hover:shadow-elevated flex h-full flex-col rounded-2xl border p-5 transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <span className={cn("grid size-10 place-items-center rounded-xl", t.tone)}>
                <t.icon className="size-5" />
              </span>
              <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
            </div>
            <p className="font-display mt-4 text-sm font-extrabold">{t.label}</p>
            <p className="text-muted-foreground mt-1 flex-1 text-xs leading-relaxed">{t.desc}</p>
          </Link>
        ))}
      </div>

      <Card className="bg-gradient-ink mt-5 text-ink-foreground shadow-elevated border-0">
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <span className="bg-ink-foreground/10 grid size-10 place-items-center rounded-xl">
            <Star className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold">Next career day: Sep 14</p>
            <p className="text-ink-foreground/70 text-xs">
              Book a demo table and interview slots before the event — spaces go to the fastest.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="bg-transparent text-ink-foreground border-ink-foreground/30 font-semibold hover:bg-ink-foreground/10"
          >
            <Link to="/events">RSVP</Link>
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
