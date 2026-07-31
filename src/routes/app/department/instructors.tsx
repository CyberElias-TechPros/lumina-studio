import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CheckCircle2, ClipboardList, Users, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/department/instructors")({
  head: () => ({
    meta: [
      { title: "Instructor Management — CEA-OS" },
      { name: "description", content: "Workload, performance and development." },
    ],
  }),
  component: DepartmentInstructors,
});

const faculty = [
  {
    n: "Mr. Adeyemi",
    courses: 4,
    students: 62,
    load: 85,
    rating: 4.8,
    tone: "bg-primary/10 text-primary",
  },
  {
    n: "Ms. Chidera",
    courses: 3,
    students: 48,
    load: 70,
    rating: 4.6,
    tone: "bg-learning/10 text-learning",
  },
  {
    n: "Mr. Bello",
    courses: 3,
    students: 55,
    load: 78,
    rating: 4.7,
    tone: "bg-success/10 text-success",
  },
  {
    n: "Mrs. Eze",
    courses: 2,
    students: 34,
    load: 52,
    rating: 4.4,
    tone: "bg-warning/10 text-warning",
  },
];

function DepartmentInstructors() {
  return (
    <AppShell
      roleKey="instructor"
      title="Instructor management"
      subtitle="Software Engineering · 9 instructors"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Avg. rating 4.6
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
            label: "Instructors",
            value: "9",
            delta: "6 full-time",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Courses assigned",
            value: "23",
            delta: "12 active terms",
            icon: BookOpen,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg. workload",
            value: "71%",
            delta: "target 60–80%",
            icon: ClipboardList,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Observations due",
            value: "3",
            delta: "by Sep 15",
            icon: CheckCircle2,
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <UserRound className="text-primary size-4" /> Faculty snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {faculty.map((f) => (
            <div key={f.n} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-lg text-xs font-extrabold",
                  f.tone,
                )}
              >
                {f.n.split(" ")[1]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{f.n}</p>
                <p className="text-muted-foreground text-xs">
                  {f.courses} courses · {f.students} students · rating {f.rating}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-muted h-1.5 w-24 overflow-hidden rounded-full">
                  <div
                    className={cn("h-full rounded-full", f.load > 80 ? "bg-warning" : "bg-primary")}
                    style={{ width: `${f.load}%` }}
                  />
                </div>
                <span className="text-muted-foreground w-8 text-right text-xs font-semibold">
                  {f.load}%
                </span>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Profile
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
