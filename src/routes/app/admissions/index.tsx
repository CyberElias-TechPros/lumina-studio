import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  FileText,
  Filter,
  MessagesSquare,
  UserRoundCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admissions/")({
  head: () => ({
    meta: [
      { title: "Admissions Hub — CEA-OS" },
      { name: "description", content: "Application volume, funnel and targets." },
    ],
  }),
  component: AdmissionsHub,
});

const screens = [
  {
    icon: Filter,
    label: "Applications",
    desc: "Filter by stage & program",
    path: "/app/admissions/applications",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: ClipboardCheck,
    label: "Review",
    desc: "Shortlist, reject, notes",
    path: "/app/admissions/review",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: UserRoundCheck,
    label: "Interviews",
    desc: "Schedule and track",
    path: "/app/admissions/interviews",
    tone: "bg-success/10 text-success",
  },
  {
    icon: FileText,
    label: "Documents",
    desc: "Verification checklists",
    path: "/app/admissions/documents",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: MessagesSquare,
    label: "Communication",
    desc: "Offers & templates",
    path: "/app/admissions/communication",
    tone: "bg-career/10 text-career",
  },
  {
    icon: ClipboardCheck,
    label: "Enrollment",
    desc: "Paid vs pending",
    path: "/app/admissions/enrollment",
    tone: "bg-community/10 text-community",
  },
];

function AdmissionsHub() {
  return (
    <AppShell
      roleKey="instructor"
      title="Admissions hub"
      subtitle="Fall intake · 118 applications · 15.5% conversion"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On target</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/admissions">
              <ArrowLeft className="size-4" /> Admissions portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Applications",
            value: "118",
            delta: "+21% vs last",
            icon: Filter,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Assessment sent",
            value: "89",
            delta: "75% of apps",
            icon: ClipboardCheck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Interviews booked",
            value: "31",
            delta: "this week",
            icon: UserRoundCheck,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Conversion",
            value: "15.5%",
            delta: "target 18%",
            icon: ArrowRight,
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
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <ClipboardCheck className="text-primary size-4" /> Workspace
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {screens.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
