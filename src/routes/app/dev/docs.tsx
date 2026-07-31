import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CheckCircle2, FileText, RefreshCcw, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dev/docs")({
  head: () => ({
    meta: [
      { title: "Developer Docs — CEA-OS" },
      { name: "description", content: "Internal API docs and runbooks." },
    ],
  }),
  component: DevDocs,
});

const docs = [
  { d: "API reference v3", u: "Updated Jul 30 · 84 endpoints", tone: "bg-primary/10 text-primary" },
  { d: "Onboarding runbook", u: "Updated Jul 12 · 14 steps", tone: "bg-learning/10 text-learning" },
  { d: "Deploy playbook", u: "Updated Jun 28 · 6 sections", tone: "bg-success/10 text-success" },
];

function DevDocs() {
  return (
    <AppShell
      roleKey="instructor"
      title="Developer docs"
      subtitle="24 pages · versioned · searchable"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Up to date</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/dev">
              <ArrowLeft className="size-4" /> Dev hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Pages",
            value: "24",
            delta: "6 new this month",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Runbooks",
            value: "8",
            delta: "all verified",
            icon: BookOpen,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Stale pages",
            value: "1",
            delta: "needs review",
            icon: RefreshCcw,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Search rate",
            value: "212",
            delta: "queries / week",
            icon: Search,
            tone: "bg-learning/10 text-learning",
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
            <CheckCircle2 className="text-primary size-4" /> Latest updates
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {docs.map((d) => (
            <div key={d.d} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm font-bold">{d.d}</p>
                <p className="text-muted-foreground text-xs">{d.u}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Read
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
