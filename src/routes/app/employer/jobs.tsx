import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BriefcaseBusiness, Eye, FileText, Pencil, Plus, Users, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/employer/jobs")({
  head: () => ({
    meta: [
      { title: "Job Management — CEA-OS" },
      { name: "description", content: "Post, edit and manage job openings." },
    ],
  }),
  component: EmployerJobs,
});

const jobs = [
  {
    t: "Junior Backend Engineer",
    apps: 14,
    views: 320,
    d: "Posted Jul 28",
    status: "Open",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Frontend Developer (React)",
    apps: 9,
    views: 210,
    d: "Posted Jul 20",
    status: "Open",
    tone: "bg-success/10 text-success",
  },
  {
    t: "DevOps Intern",
    apps: 22,
    views: 410,
    d: "Posted Jul 12",
    status: "Interviewing",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Product Designer",
    apps: 6,
    views: 180,
    d: "Posted Jun 30",
    status: "Closed",
    tone: "bg-muted-foreground/10 text-muted-foreground",
  },
];

function EmployerJobs() {
  return (
    <AppShell
      roleKey="instructor"
      title="Job management"
      subtitle="4 roles · 51 total applications"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">2 open roles</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/employer/hub">
              <ArrowLeft className="size-4" /> Employer hub
            </Link>
          </Button>
          <Button size="sm">
            <Plus className="size-4" /> Post a job
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active roles",
            value: "3",
            delta: "1 closing soon",
            icon: BriefcaseBusiness,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Applications",
            value: "51",
            delta: "+18 this week",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Interviews",
            value: "6",
            delta: "4 scheduled",
            icon: Eye,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Hires this year",
            value: "12",
            delta: "avg 34 days to hire",
            icon: FileText,
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
            <BriefcaseBusiness className="text-primary size-4" /> Your roles
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {jobs.map((j) => (
            <div key={j.t} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                <BriefcaseBusiness className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{j.t}</p>
                <p className="text-muted-foreground text-xs">
                  {j.apps} applications · {j.views} views · {j.d}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", j.tone)}>{j.status}</Badge>
              <div className="flex shrink-0 gap-1">
                <Button asChild variant="outline" size="sm" className="font-semibold">
                  <Link
                    to="/app/employer/pipeline/$jobId"
                    params={{ jobId: "junior-backend-engineer" }}
                  >
                    Pipeline
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Pencil className="size-3.5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <X className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
