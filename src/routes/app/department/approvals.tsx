import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock, CheckCircle2, ClipboardCheck, Inbox, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { DepApproval } from "@/lib/api/department";
import { useDepApprovals } from "@/lib/query/department";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/department/approvals")({
  head: () => ({
    meta: [
      { title: "Approvals — CEA-OS" },
      { name: "description", content: "Curriculum, course and leave approvals." },
    ],
  }),
  component: DeptApprovals,
});

const approvalTones: Record<string, string> = {
  Pending: "bg-primary/10 text-primary",
  Approved: "bg-success/10 text-success",
  Rejected: "bg-warning/10 text-warning",
};

function DeptApprovals() {
  const approvalsQuery = useDepApprovals();

  return (
    <AppShell
      roleKey="department"
      title="Approvals"
      subtitle="6 pending · median decision 1.4 days"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On track</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/department-head">
              <ArrowLeft className="size-4" /> Dept head portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Pending",
            value: "6",
            delta: "2 over 48h",
            icon: Inbox,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Approved (30d)",
            value: "24",
            delta: "96% of requests",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Rejected (30d)",
            value: "1",
            delta: "with feedback",
            icon: ClipboardCheck,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Median time",
            value: "1.4d",
            delta: "target 2d",
            icon: Timer,
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
            <CalendarClock className="text-primary size-4" /> Queue
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<DepApproval[]>
            query={approvalsQuery}
            error={{ title: "Approvals unavailable" }}
            empty={{
              title: "No approvals yet",
              description: "Curriculum, course and leave approvals will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((a) => (
                  <div
                    key={a.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{a.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {a.requester} · {a.dateLabel}
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        approvalTones[a.status] ?? "bg-muted text-muted-foreground",
                      )}
                    >
                      {a.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Review
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
