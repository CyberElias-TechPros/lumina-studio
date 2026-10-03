"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, FileText, LayoutTemplate, Plus, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useItTemplates, useItTemplateItems } from "@/lib/query/it";
import type { ItTemplate } from "@/lib/api/it";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/templates")({
  head: () => ({
    meta: [
      { title: "Templates — CEA-OS" },
      { name: "description", content: "Reusable ticket templates." },
    ],
  }),
  component: ItTemplates,
});

function ItTemplates() {
  const query = useItTemplates();
  const templates = useItTemplateItems();

  const uses = templates.reduce((sum, t) => sum + t.uses, 0);
  const active = templates.filter((t) => t.status === "active").length;
  const drafts = templates.filter((t) => t.status === "draft").length;

  return (
    <AppShell
      roleKey="it"
      title="Ticket templates"
      subtitle={
        templates.length > 0
          ? `${templates.length} templates · ${uses} uses this month`
          : "Loading templates…"
      }
      actions={
        <>
          <Badge className="bg-learning/10 text-learning border-0 font-semibold">
            {uses} total uses
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/it-support">
              <ArrowLeft className="size-4" /> IT Support portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Templates",
            value: templates.length > 0 ? String(templates.length) : "—",
            delta: `${active} active`,
            icon: LayoutTemplate,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Uses (30d)",
            value: uses > 0 ? String(uses) : "—",
            delta: "across templates",
            icon: Sparkles,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Active",
            value: active > 0 ? String(active) : "—",
            delta: "in circulation",
            icon: FileText,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Drafts",
            value: drafts > 0 ? String(drafts) : "0",
            delta: "in review",
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
            <LayoutTemplate className="text-primary size-4" /> Templates
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            <Plus className="size-4" /> New template
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<ItTemplate[]>
            query={query}
            error={{ title: "Templates unavailable" }}
            empty={{
              title: "No templates yet",
              description: "Reusable templates will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) =>
              rows.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{t.title}</p>
                    <p className="text-muted-foreground text-xs">{t.uses} uses this month</p>
                  </div>
                  {t.status === "draft" && (
                    <Badge className="bg-warning/10 text-warning border-0 font-semibold">
                      Draft
                    </Badge>
                  )}
                  <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                    Edit
                  </Button>
                </div>
              ))
            }
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
