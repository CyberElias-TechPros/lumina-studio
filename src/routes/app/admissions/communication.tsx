import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Mail,
  MailCheck,
  MessagesSquare,
  Send,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useAdmCommOverview, useAdmTemplates } from "@/lib/query/admissionsExtras";
import type { AdmCommKpi, AdmCommTemplate } from "@/lib/api/admissionsExtras";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admissions/communication")({
  head: () => ({
    meta: [
      { title: "Communication — CEA-OS" },
      { name: "description", content: "Offer letters and communication templates." },
    ],
  }),
  component: AdmissionsCommunication,
});

function templateTone(status: string) {
  if (/active|sent|published|live/i.test(status)) return "bg-success/10 text-success";
  if (/draft|pending|review/i.test(status)) return "bg-warning/10 text-warning";
  return "bg-primary/10 text-primary";
}

const kpiMeta: Record<string, { icon: LucideIcon; tone: string }> = {
  "Sent (30d)": { icon: Mail, tone: "bg-primary/10 text-primary" },
  "Open rate": { icon: MailCheck, tone: "bg-success/10 text-success" },
  "Offers out": { icon: Send, tone: "bg-learning/10 text-learning" },
  Templates: { icon: MessagesSquare, tone: "bg-warning/10 text-warning" },
};

const defaultKpiMeta: { icon: LucideIcon; tone: string } = {
  icon: Mail,
  tone: "bg-primary/10 text-primary",
};

function AdmissionsCommunication() {
  const overviewQuery = useAdmCommOverview();
  const templatesQuery = useAdmTemplates();
  return (
    <AppShell
      roleKey="instructor"
      title="Communication center"
      subtitle="Email + in-app · 98% delivery rate"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Deliveries OK</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admissions">
              <ArrowLeft className="size-4" /> Admissions hub
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<AdmCommKpi[]>
        query={overviewQuery}
        error={{ title: "Metrics unavailable" }}
        empty={{ title: "No metrics", description: "Communication metrics will appear here." }}
        isEmpty={(rows) => rows.length === 0}
      >
        {(rows) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {rows.map((k) => {
              const meta = kpiMeta[k.metric] ?? defaultKpiMeta;
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
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <UserRound className="text-primary size-4" /> Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<AdmCommTemplate[]>
            query={templatesQuery}
            error={{ title: "Failed to load templates" }}
            empty={{
              title: "No templates",
              description: "Communication templates will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(items) =>
              items.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{t.title}</p>
                    <p className="text-muted-foreground text-xs">{t.usage}</p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", templateTone(t.status))}>
                    {t.status}
                  </Badge>
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
