import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Briefcase, Code2, Eye, FolderGit2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useIntProjectItems, useIntProjects, useIntSkillItems } from "@/lib/query/internDashboard";
import type { IntProject } from "@/lib/api/internDashboard";
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

function InternPortfolio() {
  const projectsQuery = useIntProjects();
  const projects = useIntProjectItems();
  const skills = useIntSkillItems();

  const approved = projects.filter((p) => p.status === "approved");
  const artifacts = projects.reduce((n, p) => n + p.artifacts, 0);
  const views = projects.reduce((n, p) => n + p.views, 0);

  return (
    <AppShell
      roleKey="intern"
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
            value: projects.length > 0 ? String(projects.length) : "—",
            delta: `${approved.length} approved`,
            icon: FolderGit2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Artifacts",
            value: projects.length > 0 ? String(artifacts) : "—",
            delta: "docs + code",
            icon: Code2,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Views (30d)",
            value: projects.length > 0 ? String(views) : "—",
            delta: "by employers",
            icon: Briefcase,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Skills shown",
            value: skills.length > 0 ? String(skills.length) : "—",
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
          <QueryState<IntProject[]>
            query={projectsQuery}
            error={{ title: "Projects unavailable" }}
            empty={{ title: "No projects yet", description: "Submitted work will show here." }}
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
                      <p className="text-sm font-bold">{p.title}</p>
                      <p className="text-muted-foreground flex flex-wrap items-center gap-x-3 text-xs">
                        <span>{p.category}</span>
                        <span className="inline-flex items-center gap-1">
                          <Code2 className="size-3" /> {p.artifacts} artifacts
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Eye className="size-3" /> {p.views} views
                        </span>
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        p.status === "approved"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning",
                      )}
                    >
                      {p.status === "approved" ? "Approved" : "In review"}
                    </Badge>
                    <Button asChild variant="outline" size="sm" className="shrink-0 font-semibold">
                      <Link to="/app/portfolio">
                        View <ArrowUpRight className="ml-1 size-3.5" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
