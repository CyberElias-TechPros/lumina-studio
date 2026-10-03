"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, FileText, Filter, Search, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useAdminApplications } from "@/lib/query/admissions";
import { PIPELINE_STAGE_LABELS, type PipelineStage } from "@/lib/api/applications";
import type { AdminApplication } from "@/lib/api/applications";
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

const stageTone: Record<string, string> = {
  submitted: "bg-learning/10 text-learning",
  screening: "bg-primary/10 text-primary",
  assessment: "bg-primary/10 text-primary",
  interview: "bg-warning/10 text-warning",
  offer: "bg-success/10 text-success",
  enrolled: "bg-success/10 text-success",
};

function formatApplied(date: string): string {
  return `Applied ${new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  })}`;
}

function AdmissionsApplications() {
  const applications = useAdminApplications();
  const items = applications.data?.pages.flatMap((p) => p.items) ?? [];
  const [query, setQuery] = useState("");

  const matches = (a: AdminApplication) =>
    `${a.fullName} ${a.email} ${a.ref} ${a.programTitle ?? ""}`
      .toLowerCase()
      .includes(query.toLowerCase());

  return (
    <AppShell
      roleKey="admissions"
      title="Applications"
      subtitle={`${items.length} total · ${PIPELINE_STAGE_LABELS.submitted} → ${PIPELINE_STAGE_LABELS.enrolled}`}
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
          <QueryState<AdminApplication[]>
            query={applications}
            error={{ title: "Applications unavailable" }}
            empty={{
              title: "No applications yet",
              description: "New applications appear here as they come in.",
            }}
            isEmpty={(rows) => rows.length === 0 || !rows.some(matches)}
          >
            {(rows) => (
              <>
                {rows.filter(matches).map((a) => (
                  <div
                    key={a.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                      <UserRound className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">
                        {a.fullName}
                        {a.programTitle ? ` · ${a.programTitle}` : ""}
                      </p>
                      <p className="text-muted-foreground text-xs">{formatApplied(a.createdAt)}</p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", stageTone[a.status])}>
                      {PIPELINE_STAGE_LABELS[a.status as PipelineStage] ?? a.status}
                    </Badge>
                    <Button asChild variant="outline" size="sm" className="shrink-0 font-semibold">
                      <Link to="/app/admissions/applications/$id" params={{ id: a.ref }}>
                        Open <ArrowRight className="ml-1 size-3.5" />
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
