import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CheckCircle2, Clock, FileText, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { DepProgram } from "@/lib/api/department";
import { useDepPrograms } from "@/lib/query/department";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/department/curriculum")({
  head: () => ({
    meta: [
      { title: "Curriculum Manager — CEA-OS" },
      { name: "description", content: "Program versions, course approvals and reviews." },
    ],
  }),
  component: DepartmentCurriculum,
});

const programTones: Record<string, string> = {
  Active: "bg-success/10 text-success",
  "In review": "bg-warning/10 text-warning",
  Draft: "bg-primary/10 text-primary",
};

const pending = [
  {
    t: "Backend & APIs — assessment v2",
    from: "Mr. Adeyemi",
    d: "Submitted Aug 2",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "DevOps Fundamentals — lesson reorder",
    from: "Ms. Chidera",
    d: "Submitted Jul 29",
    tone: "bg-warning/10 text-warning",
  },
];

function DepartmentCurriculum() {
  const programsQuery = useDepPrograms();

  return (
    <AppShell
      roleKey="instructor"
      title="Curriculum manager"
      subtitle="Software Engineering department · 4 programs"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            2 programs active
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/department-head">
              <ArrowLeft className="size-4" /> Department overview
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Programs",
            value: "4",
            delta: "2 active · 1 draft",
            icon: BookOpen,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Courses",
            value: "23",
            delta: "across programs",
            icon: FileText,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Pending approvals",
            value: "2",
            delta: "oldest 5 days",
            icon: Clock,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Version history",
            value: "11",
            delta: "revisions tracked",
            icon: History,
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
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <BookOpen className="text-primary size-4" /> Programs
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            <QueryState<DepProgram[]>
              query={programsQuery}
              error={{ title: "Programs unavailable" }}
              empty={{
                title: "No programs yet",
                description: "Program versions and reviews will appear here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((p) => (
                    <div
                      key={p.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{p.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {p.version} · {p.year}
                        </p>
                      </div>
                      <Badge
                        className={cn(
                          "border-0 font-semibold",
                          programTones[p.status] ?? "bg-muted text-muted-foreground",
                        )}
                      >
                        {p.status}
                      </Badge>
                      <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                        Open
                      </Button>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Clock className="text-primary size-4" /> Approvals queue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pending.map((p) => (
              <div key={p.t} className="rounded-xl border p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{p.t}</p>
                  <Badge className={cn("border-0 font-semibold", p.tone)}>Pending</Badge>
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  {p.from} · {p.d}
                </p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" className="font-semibold">
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="font-semibold">
                    Feedback
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
