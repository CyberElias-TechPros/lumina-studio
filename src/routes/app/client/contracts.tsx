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

const contracts = [
  {
    c: "Platform rebuild · MS-2026-014",
    v: "₦8.4m · ends Nov 30",
    s: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    c: "Support retainer · annual",
    v: "₦2.4m · renews Sep 01",
    s: "Renewing",
    tone: "bg-warning/10 text-warning",
  },
  {
    c: "Mobile app MVP · MS-2026-021",
    v: "₦12.0m · ends Mar 2027",
    s: "Active",
    tone: "bg-success/10 text-success",
  },
];

function ClientContracts() {
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
          {contracts.map((c) => (
            <div key={c.c} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.c}</p>
                <p className="text-muted-foreground text-xs">{c.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", c.tone)}>{c.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                View
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
