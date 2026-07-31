import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, FileText, Filter, Search, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admissions/applications")({
  head: () => ({
    meta: [
      { title: "Applications — CEA-OS" },
      {
        name: "description",
        content: "Application pipeline filtered by status, stage and program.",
      },
    ],
  }),
  component: AdmissionsApplications,
});

const apps = [
  {
    n: "Tola Bakare",
    p: "Full-Stack",
    d: "Applied Aug 1",
    s: "Assessment sent",
    tone: "bg-primary/10 text-primary",
  },
  {
    n: "Musa Danjuma",
    p: "Cybersecurity",
    d: "Applied Jul 30",
    s: "Interview booked",
    tone: "bg-warning/10 text-warning",
  },
  {
    n: "Ngozi Eze",
    p: "Data Science",
    d: "Applied Jul 29",
    s: "Offer sent",
    tone: "bg-success/10 text-success",
  },
  {
    n: "Kelechi Nwosu",
    p: "DevOps",
    d: "Applied Jul 28",
    s: "New",
    tone: "bg-learning/10 text-learning",
  },
];

function AdmissionsApplications() {
  return (
    <AppShell
      roleKey="instructor"
      title="Applications"
      subtitle="118 total · 64 in active stages"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Funnel healthy
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admissions">
              <ArrowLeft className="size-4" /> Admissions hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="bg-card shadow-soft flex flex-wrap items-center gap-2 rounded-2xl border p-3">
        <div className="bg-muted flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <input
            className="placeholder:text-muted-foreground w-full bg-transparent text-sm font-medium outline-none"
            placeholder="Name, email, program…"
          />
        </div>
        <Button variant="outline" size="sm" className="font-semibold">
          <Filter className="size-3.5" /> Filters
        </Button>
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FileText className="text-primary size-4" /> Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {apps.map((a) => (
            <div key={a.n} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                <UserRound className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">
                  {a.n} · {a.p}
                </p>
                <p className="text-muted-foreground text-xs">{a.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", a.tone)}>{a.s}</Badge>
              <Button asChild variant="outline" size="sm" className="shrink-0 font-semibold">
                <Link to="/app/admissions/applications/$id" params={{ id: "tola-bakare" }}>
                  Open <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
