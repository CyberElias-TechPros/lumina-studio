"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Mail, MailCheck, MailOpen, Send, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useEmailCampaigns, useMarketingKpis } from "@/lib/query/marketing";
import type { EmailCampaign } from "@/lib/api/marketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/marketing/email")({
  head: () => ({
    meta: [
      { title: "Email Marketing — CEA-OS" },
      { name: "description", content: "Campaigns, lists, opens and clicks." },
    ],
  }),
  component: MarketingEmail,
});

function campaignTone(status: string, openRate: number): string {
  if (status === "Draft") return "bg-warning/10 text-warning";
  if (openRate >= 70) return "bg-primary/10 text-primary";
  return "bg-success/10 text-success";
}

function MarketingEmail() {
  const query = useEmailCampaigns();
  const kpis = useMarketingKpis();
  const kpiRows = kpis.data?.filter((k) => k.page === "email") ?? [];
  const subscribers = kpiRows.find((k) => k.label === "Subscribers");
  const openRate = kpiRows.find((k) => k.label === "Open rate");
  const clickRate = kpiRows.find((k) => k.label === "Click rate");

  return (
    <AppShell
      roleKey="marketing"
      title="Email marketing"
      subtitle="12k subscribers · 71% avg. open rate"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Deliverable</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/marketing">
              <ArrowLeft className="size-4" /> Marketing hub
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<EmailCampaign[]>
        query={query}
        error={{ title: "Email stats unavailable" }}
        empty={{ title: "No campaigns yet" }}
      >
        {(rows) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Subscribers",
                value: subscribers?.value ?? "—",
                delta: subscribers?.delta ?? "",
                icon: Users,
                tone: "bg-primary/10 text-primary",
              },
              {
                label: "Open rate",
                value: openRate?.value ?? "—",
                delta: openRate?.delta ?? "",
                icon: MailOpen,
                tone: "bg-success/10 text-success",
              },
              {
                label: "Click rate",
                value: clickRate?.value ?? "—",
                delta: clickRate?.delta ?? "",
                icon: MailCheck,
                tone: "bg-learning/10 text-learning",
              },
              {
                label: "Sent (30d)",
                value: String(rows.filter((c) => c.status === "Sent").length),
                delta: "24k emails",
                icon: Send,
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
        )}
      </QueryState>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Mail className="text-primary size-4" /> Campaigns
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            New email
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<EmailCampaign[]>
            query={query}
            error={{ title: "Campaigns unavailable" }}
            empty={{ title: "No email campaigns yet" }}
          >
            {(rows) => (
              <>
                {rows.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{c.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {c.recipients ? c.recipients.toLocaleString("en-US") : "—"} recipients ·{" "}
                        {c.openRate ? `${c.openRate}%` : "—"} opened
                      </p>
                    </div>
                    <Badge
                      className={cn("border-0 font-semibold", campaignTone(c.status, c.openRate))}
                    >
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
