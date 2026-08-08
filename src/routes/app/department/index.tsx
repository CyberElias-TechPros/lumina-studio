import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  ClipboardList,
  FileText,
  GraduationCap,
  Settings2,
  Target,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useDepOverview } from "@/lib/query/department";
import type { DepKpi } from "@/lib/api/department";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/department/")({
  head: () => ({
    meta: [
      { title: "Department Hub — CEA-OS" },
      { name: "description", content: "Academic operations, curriculum and faculty oversight." },
    ],
  }),
  component: DepartmentHub,
});

const screens = [
  {
    icon: Building2,
    label: "Curriculum",
    desc: "Programs & versions",
    path: "/app/department/curriculum",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    label: "Faculty",
    desc: "Instructors & workload",
    path: "/app/department/instructors",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: FileText,
    label: "Reports",
    desc: "Academic summaries",
    path: "/app/department/reports",
    tone: "bg-career/10 text-career",
  },
  {
    icon: Settings2,
    label: "Approvals",
    desc: "Pending reviews",
    path: "/app/department/approvals",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: CalendarDays,
    label: "Calendar",
    desc: "Academic events",
    path: "/app/department/calendar",
    tone: "bg-community/10 text-community",
  },
  {
    icon: ClipboardList,
    label: "Quality",
    desc: "Quality tracking",
    path: "/app/department/quality",
    tone: "bg-success/10 text-success",
  },
  {
    icon: GraduationCap,
    label: "Enrollment",
    desc: "Enrollment & capacity",
    path: "/app/department/enrollment",
    tone: "bg-primary/10 text-primary",
  },
] as const;

function DepartmentHub() {
  const overview = useDepOverview();

  return (
    <AppShell
      roleKey="instructor"
      title="Department hub"
      subtitle="Academic operations, curriculum and faculty oversight"
      actions={
        <Button asChild variant="outline" size="sm" className="font-semibold">
          <Link to="/app/admin">
            <ArrowLeft className="size-4" /> Admin
          </Link>
        </Button>
      }
    >
      <QueryState<DepKpi[]> query={overview} empty={{ title: "No KPIs yet" }}>
        {(kpis) => (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {kpis.slice(0, 4).map((k) => (
                <Card key={k.id} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                      {k.metric}
                    </p>
                    <p className="font-display mt-2 text-2xl font-extrabold">{k.valueLabel}</p>
                    <p className="text-muted-foreground mt-1 text-xs font-semibold">{k.delta}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card mt-5 shadow-soft border">
              <CardHeader>
                <CardTitle className="font-display text-base font-bold">Department</CardTitle>
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
          </>
        )}
      </QueryState>
    </AppShell>
  );
}
