import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, AlertTriangle, CheckCircle2, FileText, History, Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/changelog")({
  head: () => ({
    meta: [
      { title: "Regulatory Change Log — CEA-OS" },
      { name: "description", content: "Changes to regulations and institutional response." },
    ],
  }),
  component: GovernmentChangelog,
});

const changes = [
  {
    c: "NDPR enforcement guidelines v2",
    d: "Effective Aug 01 · CEA compliant",
    s: "Compliant",
    tone: "bg-success/10 text-success",
  },
  {
    c: "Tuition fee disclosure rules",
    d: "Effective Jul 01 · CEA compliant",
    s: "Compliant",
    tone: "bg-success/10 text-success",
  },
  {
    c: "Student data retention policy",
    d: "Effective Oct 01 · CEA reviewing",
    s: "In review",
    tone: "bg-warning/10 text-warning",
  },
];

function GovernmentChangelog() {
  return (
    <AppShell
      roleKey="admin"
      title="Regulatory change log"
      subtitle="Tracked since 2022 · 34 regulations · auto-impact analysis"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Up to date</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/government">
              <ArrowLeft className="size-4" /> Compliance portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Tracked",
            value: "34",
            delta: "regulations",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Compliant",
            value: "31",
            delta: "of 34",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "In review",
            value: "3",
            delta: "impact analysis",
            icon: AlertTriangle,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Changed (30d)",
            value: "4",
            delta: "auto-tracked",
            icon: Megaphone,
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
            <History className="text-primary size-4" /> Recent changes
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {changes.map((c) => (
            <div
              key={c.c + c.d}
              className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.c}</p>
                <p className="text-muted-foreground text-xs">{c.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", c.tone)}>{c.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Details
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
