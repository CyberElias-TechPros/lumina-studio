import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText, LayoutTemplate, Plus, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const templates = [
  { t: "New starter — full setup", u: "12 uses this month", tone: "bg-primary/10 text-primary" },
  { t: "WiFi troubleshooting", u: "24 uses this month", tone: "bg-learning/10 text-learning" },
  { t: "Printer / peripheral fault", u: "9 uses this month", tone: "bg-success/10 text-success" },
];

function ItTemplates() {
  return (
    <AppShell
      roleKey="instructor"
      title="Ticket templates"
      subtitle="8 templates · 61 uses this month"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Saves 3 min/ticket
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
            value: "8",
            delta: "4 shared",
            icon: LayoutTemplate,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Uses (30d)",
            value: "61",
            delta: "44% of tickets",
            icon: Sparkles,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Time saved",
            value: "3h",
            delta: "estimated",
            icon: FileText,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Drafts",
            value: "2",
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
          {templates.map((t) => (
            <div key={t.t} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{t.t}</p>
                <p className="text-muted-foreground text-xs">{t.u}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Edit
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
