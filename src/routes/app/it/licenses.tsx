"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, CalendarClock, KeyRound, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useItLicenses, useItLicenseItems } from "@/lib/query/it";
import type { ItLicense } from "@/lib/api/it";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/licenses")({
  head: () => ({
    meta: [
      { title: "Licenses — CEA-OS" },
      { name: "description", content: "Software license management." },
    ],
  }),
  component: ItLicenses,
});

function ItLicenses() {
  const query = useItLicenses();
  const licenses = useItLicenseItems();

  const seats = licenses.reduce((sum, l) => sum + l.seats, 0);
  const used = licenses.reduce((sum, l) => sum + l.inUse, 0);
  const utilization = seats > 0 ? Math.round((used / seats) * 100) : 0;
  const renewing = licenses.filter((l) => l.status === "active").length;

  return (
    <AppShell
      roleKey="it"
      title="Software licenses"
      subtitle={
        licenses.length > 0
          ? `${licenses.length} products · ${utilization}% utilization`
          : "Loading licenses…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {used}/{seats} seats used
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
            label: "Products",
            value: licenses.length > 0 ? String(licenses.length) : "—",
            delta: "under management",
            icon: ShieldCheck,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Seats used",
            value: utilization > 0 ? `${utilization}%` : "—",
            delta: `of ${seats}`,
            icon: KeyRound,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Seats total",
            value: seats > 0 ? String(seats) : "—",
            delta: "across products",
            icon: CalendarClock,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Active",
            value: renewing > 0 ? String(renewing) : "—",
            delta: "licenses in use",
            icon: CalendarClock,
            tone: "bg-success/10 text-success",
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
            <KeyRound className="text-primary size-4" /> Key products
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<ItLicense[]>
            query={query}
            error={{ title: "Licenses unavailable" }}
            empty={{
              title: "No licenses yet",
              description: "Managed products will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) =>
              rows.map((l) => (
                <div
                  key={l.id}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{l.product}</p>
                    <p className="text-muted-foreground text-xs">
                      {l.seats} seats · {l.inUse} used
                    </p>
                  </div>
                  <Badge variant="secondary" className="font-semibold">
                    {l.renews}
                  </Badge>
                  <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                    Manage
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
