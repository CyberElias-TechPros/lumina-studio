"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { useState } from "react";
import { toast } from "sonner";
import { BarChart3, Download, FileBarChart2, FileText, Filter, Plus, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useStuReportKpis, useStuTemplates } from "@/lib/query/studentSelf";
import type { StuKpi, StuReportTemplate } from "@/lib/api/studentSelf";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/reports")({
  head: () => ({
    meta: [
      { title: "Report Builder — CEA-OS" },
      { name: "description", content: "Self-service reports across the academy." },
    ],
  }),
  component: ReportBuilder,
});

const kpiMeta = [
  { icon: FileBarChart2, tone: "bg-primary/10 text-primary" },
  { icon: BarChart3, tone: "bg-learning/10 text-learning" },
  { icon: FileText, tone: "bg-success/10 text-success" },
  { icon: Filter, tone: "bg-warning/10 text-warning" },
];

const templateTones = [
  "bg-primary/10 text-primary",
  "bg-learning/10 text-learning",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
];

function ReportBuilder() {
  const kpisQuery = useStuReportKpis();
  const templatesQuery = useStuTemplates();
  const [category, setCategory] = useState("All");

  const downloadReport = (template: StuReportTemplate) => {
    const csv = [
      ["Report", template.name],
      ["Category", template.category],
      ["Usage", template.usage],
      ["Generated", new Date().toISOString()],
    ]
      .map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${template.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("Report exported", { description: template.name });
  };

  const shareReport = async (template: StuReportTemplate) => {
    const shareUrl = `${window.location.origin}/app/reports#${template.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: template.name, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Report link copied");
      }
    } catch {
      // A cancelled native share is not an error worth surfacing.
    }
  };
  return (
    <AppShell
      roleKey="instructor"
      title="Report builder"
      subtitle="Self-service analytics across every module"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Scheduled: weekly
          </Badge>
          <Button
            size="sm"
            onClick={() => {
              setCategory("All");
              toast.info("Choose a template below to run a report");
            }}
          >
            <Plus className="size-4" /> New report
          </Button>
        </>
      }
    >
      <QueryState<StuKpi[]>
        query={kpisQuery}
        error={{ title: "Failed to load report metrics" }}
        empty={{ title: "No report metrics yet" }}
        isEmpty={(rows) => rows.length === 0}
      >
        {(kpis) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((k, i) => {
              const meta = kpiMeta[i % kpiMeta.length];
              return (
                <Card key={k.id} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        {k.metric}
                      </p>
                      <span className={cn("grid size-8 place-items-center rounded-lg", meta.tone)}>
                        <meta.icon className="size-4" />
                      </span>
                    </div>
                    <p className="font-display mt-3 text-2xl font-extrabold">{k.valueLabel}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </QueryState>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FileBarChart2 className="text-primary size-4" /> Popular templates
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="font-semibold"
            onClick={() =>
              setCategory(
                (current) =>
                  ({ All: "Academics", Academics: "Finance", Finance: "Career", Career: "All" })[
                    current as "All" | "Academics" | "Finance" | "Career"
                  ] ?? "All",
              )
            }
          >
            <Filter className="size-3.5" /> {category === "All" ? "All templates" : category}
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<StuReportTemplate[]>
            query={templatesQuery}
            error={{ title: "Failed to load templates" }}
            empty={{ title: "No templates yet" }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(items) =>
              items
                .filter((t) => category === "All" || t.category === category)
                .map((t, i) => (
                  <div
                    key={t.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                      <FileText className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{t.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {t.category} · {t.usage}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-semibold"
                        onClick={() => downloadReport(t)}
                      >
                        <Download className="size-3.5" /> Run & export
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary font-semibold"
                        onClick={() => void shareReport(t)}
                      >
                        <Share2 className="size-3.5" /> Share
                      </Button>
                    </div>
                  </div>
                ))
            }
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
