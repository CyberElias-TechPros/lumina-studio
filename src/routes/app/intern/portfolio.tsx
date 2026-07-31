import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Briefcase, Code2, FolderGit2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/intern/portfolio")({
  head: () => ({
    meta: [
      { title: "Intern Portfolio — CEA-OS" },
      { name: "description", content: "Showcase your internship work." },
    ],
  }),
  component: InternPortfolio,
});

const projects = [
  { p: "CI pipeline modernization", d: "DevOps · 3 artifacts", tone: "bg-primary/10 text-primary" },
  { p: "Monitoring dashboard", d: "Data · 2 artifacts", tone: "bg-learning/10 text-learning" },
  { p: "Infra runbooks", d: "Docs · 5 artifacts", tone: "bg-success/10 text-success" },
];

function InternPortfolio() {
  return (
    <AppShell
      roleKey="student"
      title="Intern portfolio"
      subtitle="Linked to your learner portfolio · auto-synced tasks"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Visible to employers
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/intern">
              <ArrowLeft className="size-4" /> Intern hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Projects",
            value: "3",
            delta: "2 approved",
            icon: FolderGit2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Artifacts",
            value: "10",
            delta: "docs + code",
            icon: Code2,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Views (30d)",
            value: "86",
            delta: "by employers",
            icon: Briefcase,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Skills shown",
            value: "8",
            delta: "tagged",
            icon: Plus,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FolderGit2 className="text-primary size-4" /> Projects
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            <Plus className="size-4" /> Add project
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {projects.map((p) => (
            <div key={p.p} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{p.p}</p>
                <p className="text-muted-foreground text-xs">{p.d}</p>
              </div>
              <Button asChild variant="outline" size="sm" className="shrink-0 font-semibold">
                <Link to="/app/portfolio">
                  View <ArrowUpRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
