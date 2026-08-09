import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  ClipboardList,
  FileText,
  LineChart,
  Settings2,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useDirOverview } from "@/lib/query/director";
import type { DirKpi } from "@/lib/api/director";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/director/")({
  head: () => ({
    meta: [
      { title: "Director Hub — CEA-OS" },
      { name: "description", content: "Strategy, operations and campus-wide oversight." },
    ],
  }),
  component: DirectorHub,
});

const screens = [
  {
    icon: Target,
    label: "OKRs",
    desc: "Objectives & key results",
    path: "/app/director/okrs",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Briefcase,
    label: "Operations",
    desc: "Branches & utilization",
    path: "/app/director/operations",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: FileText,
    label: "Reports",
    desc: "Saved reports & exports",
    path: "/app/director/reports",
    tone: "bg-career/10 text-career",
  },
  {
    icon: LineChart,
    label: "Academic",
    desc: "Academic performance",
    path: "/app/director/academic",
    tone: "bg-success/10 text-success",
  },
  {
    icon: ClipboardList,
    label: "Approvals",
    desc: "Pending approvals",
    path: "/app/director/approvals",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: Settings2,
    label: "Command center",
    desc: "Campus command center",
    path: "/app/director/command-center",
    tone: "bg-community/10 text-community",
  },
] as const;

function DirectorHub() {
  const overview = useDirOverview();

  return (
    <AppShell
      roleKey="director"
      title="Director hub"
      subtitle="Strategy, operations and campus-wide oversight"
      actions={
        <Button asChild variant="outline" size="sm" className="font-semibold">
          <Link to="/app/admin">
            <ArrowLeft className="size-4" /> Admin
          </Link>
        </Button>
      }
    >
      <QueryState<DirKpi[]> query={overview} empty={{ title: "No KPIs yet" }}>
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
                <CardTitle className="font-display text-base font-bold">Director</CardTitle>
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
