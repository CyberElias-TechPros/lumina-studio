import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarClock,
  FileSignature,
  FileText,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { CliContract } from "@/lib/query/clientEngagement";
import { useCliContracts } from "@/lib/query/clientEngagement";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/client/contracts")({
  head: () => ({
    meta: [
      { title: "Contracts — CEA-OS" },
      { name: "description", content: "View terms and renewals." },
    ],
  }),
  component: ClientContracts,
});

function statusTone(s: string) {
  const l = s.toLowerCase();
  if (l.includes("active")) return "bg-success/10 text-success";
  if (l.includes("renew")) return "bg-warning/10 text-warning";
  return "bg-muted-foreground/10 text-muted-foreground";
}

function ClientContracts() {
  const contractsQuery = useCliContracts();

  return (
    <AppShell
      roleKey="instructor"
      title="Contracts"
      subtitle="3 active · digital signatures · auto-renewals"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Signed</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/client">
              <ArrowLeft className="size-4" /> Client portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active",
            value: "3",
            delta: "₦22.8m value",
            icon: FileSignature,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Renewing < 60d",
            value: "1",
            delta: "Sep 01",
            icon: RefreshCcw,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Signatures",
            value: "100%",
            delta: "e-signed",
            icon: ShieldCheck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Expiring (year)",
            value: "2",
            delta: "both planned",
            icon: CalendarClock,
            tone: "bg-primary/10 text-primary",
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
            <FileText className="text-primary size-4" /> Contracts
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<CliContract[]>
            query={contractsQuery}
            error={{ title: "Contracts unavailable" }}
            empty={{
              title: "No contracts",
              description: "Your contracts will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{c.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {c.reference} · {c.amount} · {c.dateLabel}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", statusTone(c.status))}>
                      {c.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      View
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
