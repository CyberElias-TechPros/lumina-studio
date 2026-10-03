"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarClock,
  History,
  Landmark,
  MessageSquare,
  ScrollText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useGovOverview } from "@/lib/query/government";
import type { GovKpi } from "@/lib/api/government";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/")({
  head: () => ({
    meta: [
      { title: "Compliance Portal — CEA-OS" },
      { name: "description", content: "Secure government access to CEA compliance data." },
    ],
  }),
  component: GovernmentHub,
});

const kpiMeta: Record<string, { icon: LucideIcon; tone: string }> = {
  "Compliance score": { icon: ShieldCheck, tone: "bg-success/10 text-success" },
  "Open findings": { icon: CalendarClock, tone: "bg-warning/10 text-warning" },
  "Filings (year)": { icon: History, tone: "bg-primary/10 text-primary" },
  "Next review": { icon: Landmark, tone: "bg-learning/10 text-learning" },
};

const defaultKpiMeta: { icon: LucideIcon; tone: string } = {
  icon: ShieldCheck,
  tone: "bg-primary/10 text-primary",
};

const screens = [
  {
    icon: Building2,
    label: "Institutional data",
    desc: "Profile, enrolment, finances",
    path: "/app/government/institution",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: ScrollText,
    label: "Regulatory reports",
    desc: "Filings-ready exports",
    path: "/app/government/reports",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: ShieldCheck,
    label: "Documentation library",
    desc: "Policies, certificates",
    path: "/app/government/documents",
    tone: "bg-success/10 text-success",
  },
  {
    icon: CalendarClock,
    label: "Audit module",
    desc: "Schedule, findings",
    path: "/app/government/audit",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: History,
    label: "Filings & timeline",
    desc: "Submissions history",
    path: "/app/government/filings",
    tone: "bg-career/10 text-career",
  },
  {
    icon: MessageSquare,
    label: "Messaging",
    desc: "Secure comms with CEA",
    path: "/app/government/messaging",
    tone: "bg-services/10 text-services",
  },
];

function GovernmentHub() {
  const overviewQuery = useGovOverview();

  return (
    <AppShell
      roleKey="government"
      title="Compliance portal"
      subtitle="Registered company records · CAC & NRS deadlines tracked here"
      actions={
        <>
          <Badge className="bg-primary/10 text-primary border-0 font-semibold">
            Verify on portal
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/government">
              <ArrowLeft className="size-4" /> Government portal
            </Link>
          </Button>
        </>
      }
    >
      <Card className="bg-gradient-ink shadow-soft border-0 text-white">
        <CardContent className="flex flex-wrap items-center gap-4 p-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10">
            <Landmark className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold">
              Cyber Elias Academy Ltd — registered entity
            </p>
            <p className="mt-0.5 text-xs text-white/70">
              RC 8413776 · TIN 1086525399 · Port Harcourt. The academy holds no regulatory
              accreditation, and certificates are not a degree or a government licence — each one is
              verifiable at cea.ng/certificates/verify.
            </p>
          </div>
          <Badge className="border-0 bg-white/10 font-semibold text-white">Registered</Badge>
        </CardContent>
      </Card>

      <QueryState<GovKpi[]>
        query={overviewQuery}
        error={{ title: "Metrics unavailable" }}
        empty={{ title: "No metrics", description: "Compliance metrics will appear here." }}
        isEmpty={(rows) => rows.length === 0}
      >
        {(rows) => (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
            <Landmark className="text-primary size-4" /> Compliance modules
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {screens.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
