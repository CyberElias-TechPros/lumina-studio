import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Briefcase, CalendarCheck2, CheckCircle2, FileText, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/recruitment")({
  head: () => ({
    meta: [
      { title: "Recruitment — CEA-OS" },
      { name: "description", content: "Postings, applications, interviews and offers." },
    ],
  }),
  component: HrRecruitment,
});

const roles = [
  {
    r: "DevOps instructor",
    a: "38 applicants",
    d: "3 interviews booked",
    s: "Active",
    tone: "bg-primary/10 text-primary",
  },
  {
    r: "Frontend instructor",
    a: "24 applicants",
    d: "Offer stage",
    s: "Offer out",
    tone: "bg-success/10 text-success",
  },
  {
    r: "Admissions officer",
    a: "19 applicants",
    d: "Screening",
    s: "Active",
    tone: "bg-learning/10 text-learning",
  },
];

function HrRecruitment() {
  return (
    <AppShell
      roleKey="instructor"
      title="Recruitment"
      subtitle="6 open roles · 121 applications · 2 offers out"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">SLA met</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/hr">
              <ArrowLeft className="size-4" /> HR hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open roles",
            value: "6",
            delta: "3 critical",
            icon: Briefcase,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Applications",
            value: "121",
            delta: "20/role avg",
            icon: FileText,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Interviews",
            value: "9",
            delta: "this week",
            icon: CalendarCheck2,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Offers out",
            value: "2",
            delta: "1 accepted",
            icon: CheckCircle2,
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Users className="text-primary size-4" /> Active postings
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            Post role
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {roles.map((r) => (
            <div key={r.r} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.r}</p>
                <p className="text-muted-foreground text-xs">
                  {r.a} · {r.d}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", r.tone)}>{r.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Manage
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
