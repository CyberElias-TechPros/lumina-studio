import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Database,
  Eye,
  Globe,
  Languages,
  LineChart,
  MapPin,
  MessageSquareText,
  PenTool,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useLocalizationProjects, useLocalizationStats } from "@/lib/query/localization";
import type { LocalizationProject } from "@/lib/api/localization";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/localization/")({
  head: () => ({
    meta: [
      { title: "Localization Hub — CEA-OS" },
      {
        name: "description",
        content: "Market copy variants, translation memory, glossaries and locale analytics.",
      },
    ],
  }),
  component: LocalizationHub,
});

const PROJECT_ICONS: Record<string, LucideIcon> = {
  "project-1": Languages,
  "project-2": Database,
  "project-3": BookOpen,
  "project-4": PenTool,
  "project-5": Eye,
  "project-6": MessageSquareText,
  "project-7": LineChart,
};

function LocalizationHub() {
  const projects = useLocalizationProjects();
  const stats = useLocalizationStats();
  const hubStats = (stats.data?.items ?? []).filter((s) => s.page === "hub");

  return (
    <AppShell
      roleKey="localization"
      title="Localization hub"
      subtitle="4 markets · 3 languages · 38 localized pages · 1,240 strings"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Tone verified</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/global-copywriter">
              <ArrowLeft className="size-4" /> Copy portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Markets",
            icon: Globe,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Languages",
            icon: Languages,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Localized pages",
            icon: MapPin,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Cultural flags",
            icon: Sparkles,
            tone: "bg-success/10 text-success",
          },
        ].map((k) => {
          const stat = hubStats.find((s) => s.label === k.label);
          return (
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
                <p className="font-display mt-3 text-2xl font-extrabold">{stat?.value ?? "—"}</p>
                <p className="text-muted-foreground mt-0.5 text-xs font-semibold">
                  {stat?.delta ?? "—"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Globe className="text-primary size-4" /> Workspace
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <QueryState<LocalizationProject[]>
            query={projects}
            error={{ title: "Workspace unavailable" }}
          >
            {(rows) => (
              <>
                {rows.map((p) => {
                  const Icon = PROJECT_ICONS[p.id] ?? Languages;
                  return (
                    <Link
                      key={p.id}
                      to={p.path}
                      className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
                    >
                      <div className="flex items-start justify-between">
                        <span className={cn("grid size-9 place-items-center rounded-lg", p.tone)}>
                          <Icon className="size-4" />
                        </span>
                        <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                      </div>
                      <p className="font-display mt-3 text-sm font-extrabold">{p.name}</p>
                      <p className="text-muted-foreground mt-1 text-xs">{p.desc}</p>
                    </Link>
                  );
                })}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
