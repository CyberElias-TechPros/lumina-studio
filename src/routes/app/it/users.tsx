import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, KeyRound, Search, UserRound, UserRoundCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useItAccounts, useItAccountItems } from "@/lib/query/it";
import type { ItAccount } from "@/lib/api/it";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/users")({
  head: () => ({
    meta: [
      { title: "Users — CEA-OS" },
      { name: "description", content: "Account management and resets." },
    ],
  }),
  component: ItUsers,
});

const statusTone: Record<string, string> = {
  active: "bg-success/10 text-success",
  "awaiting invite": "bg-warning/10 text-warning",
  offboarded: "bg-primary/10 text-primary",
};

function ItUsers() {
  const query = useItAccounts();
  const accounts = useItAccountItems();

  const active = accounts.filter((a) => a.status === "active").length;
  const pending = accounts.filter((a) => a.status === "awaiting invite").length;
  const offboarded = accounts.filter((a) => a.status === "offboarded").length;

  return (
    <AppShell
      roleKey="instructor"
      title="User management"
      subtitle={
        accounts.length > 0
          ? `${accounts.length} accounts · ${pending} pending`
          : "Loading accounts…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {active} active
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
            label: "Accounts",
            value: accounts.length > 0 ? String(accounts.length) : "—",
            delta: "managed",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Pending invites",
            value: pending > 0 ? String(pending) : "0",
            delta: "new staff",
            icon: UserRound,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Active",
            value: active > 0 ? String(active) : "—",
            delta: "in good standing",
            icon: KeyRound,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Offboarded (30d)",
            value: offboarded > 0 ? String(offboarded) : "—",
            delta: "access revoked",
            icon: UserRoundCheck,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <UserRound className="text-primary size-4" /> Accounts
          </CardTitle>
          <Button variant="outline" size="sm" className="font-semibold">
            <Search className="size-3.5" /> Find user
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<ItAccount[]>
            query={query}
            error={{ title: "Accounts unavailable" }}
            empty={{
              title: "No accounts yet",
              description: "Managed accounts will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) =>
              rows.map((u) => (
                <div
                  key={u.id}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{u.name}</p>
                    <p className="text-muted-foreground text-xs">{u.role}</p>
                  </div>
                  <Badge
                    className={cn(
                      "border-0 font-semibold capitalize",
                      statusTone[u.status] ?? "bg-muted/20 text-muted-foreground",
                    )}
                  >
                    {u.status}
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
