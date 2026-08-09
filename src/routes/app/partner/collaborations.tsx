import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Megaphone, Sparkles, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { usePtnCollaborationItems, usePtnCollaborations } from "@/lib/query/supplierPartner";
import type { PtnCollaboration } from "@/lib/api/supplierPartner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/partner/collaborations")({
  head: () => ({
    meta: [
      { title: "Collaborations — CEA-OS" },
      { name: "description", content: "Co-branded events, programs and campaigns." },
    ],
  }),
  component: PartnerCollaborations,
});

const statusMeta: Record<string, { label: string; tone: string }> = {
  scheduled: { label: "Scheduled", tone: "bg-primary/10 text-primary" },
  confirmed: { label: "Confirmed", tone: "bg-success/10 text-success" },
  "in discussion": { label: "In discussion", tone: "bg-warning/10 text-warning" },
  completed: { label: "Completed", tone: "bg-muted text-muted-foreground" },
};

function PartnerCollaborations() {
  const collaborationsQuery = usePtnCollaborations();
  const collaborations = usePtnCollaborationItems();

  const confirmed = collaborations.filter((c) => c.status === "confirmed");
  const upcoming = collaborations.filter((c) => c.status === "scheduled");

  return (
    <AppShell
      roleKey="partner"
      title="Collaborations"
      subtitle={
        collaborations.length > 0
          ? `${collaborations.length} co-branded program${collaborations.length === 1 ? "" : "s"} this quarter`
          : "Co-branded programs"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {collaborations.length > 0 ? `${confirmed.length} confirmed` : "—"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/partner/hub">
              <ArrowLeft className="size-4" /> Partner hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "This quarter",
            value: collaborations.length > 0 ? String(collaborations.length) : "—",
            delta: `${confirmed.length} confirmed`,
            icon: CalendarDays,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Upcoming",
            value: collaborations.length > 0 ? String(upcoming.length) : "—",
            delta: upcoming[0]?.title ?? "none",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Reach (est.)",
            value: "1,400",
            delta: "prospects + alumni",
            icon: Megaphone,
            tone: "bg-success/10 text-success",
          },
          {
            label: "New leads (est.)",
            value: "85",
            delta: "attribution pending",
            icon: Sparkles,
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
            <Megaphone className="text-primary size-4" /> Co-branded programs
          </CardTitle>
          <Button variant="outline" size="sm" className="font-semibold">
            Propose event
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<PtnCollaboration[]>
            query={collaborationsQuery}
            error={{ title: "Collaborations unavailable" }}
            empty={{ title: "No programs", description: "Co-branded programs will appear here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((c) => {
                  const meta = statusMeta[c.status] ?? {
                    label: c.status,
                    tone: "bg-muted text-muted-foreground",
                  };
                  return (
                    <div
                      key={c.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{c.title}</p>
                        <p className="text-muted-foreground text-xs">{c.detail}</p>
                      </div>
                      <Badge className={cn("border-0 font-semibold", meta.tone)}>
                        {meta.label}
                      </Badge>
                      <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                        Details
                      </Button>
                    </div>
                  );
                })}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
