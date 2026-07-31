import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, KeyRound, Search, UserRound, UserRoundCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const users = [
  {
    n: "Ms. Chidera",
    r: "Instructor · DevOps",
    s: "Active · SSO",
    tone: "bg-success/10 text-success",
  },
  {
    n: "New starter",
    r: "Admissions officer",
    s: "Awaiting invite",
    tone: "bg-warning/10 text-warning",
  },
  {
    n: "J. Okonkwo",
    r: "Data analyst",
    s: "Scheduled offboard",
    tone: "bg-primary/10 text-primary",
  },
];

function ItUsers() {
  return (
    <AppShell
      roleKey="instructor"
      title="User management"
      subtitle="214 accounts · 12 pending · 3 resets today"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Sync healthy</Badge>
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
            value: "214",
            delta: "all synced",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Pending invites",
            value: "12",
            delta: "new staff",
            icon: UserRound,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Resets (24h)",
            value: "3",
            delta: "self-service 2",
            icon: KeyRound,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Offboarded (30d)",
            value: "2",
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
          {users.map((u) => (
            <div key={u.n} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{u.n}</p>
                <p className="text-muted-foreground text-xs">{u.r}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", u.tone)}>{u.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Manage
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
