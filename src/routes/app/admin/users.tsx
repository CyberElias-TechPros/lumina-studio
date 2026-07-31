import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck, UserCheck, UserPlus, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin/users")({
  head: () => ({
    meta: [
      { title: "User Management — CEA-OS" },
      { name: "description", content: "Accounts, access and status." },
    ],
  }),
  component: AdminUsers,
});

const users = [
  { u: "Adaeze Okafor", r: "Director", s: "Active", tone: "bg-success/10 text-success" },
  { u: "Tunde Balogun", r: "Accountant", s: "Active", tone: "bg-success/10 text-success" },
  { u: "Grace Oyelaran", r: "Receptionist", s: "Invited", tone: "bg-warning/10 text-warning" },
  { u: "Ibrahim Musa", r: "Mentor", s: "Suspended", tone: "bg-destructive/10 text-destructive" },
];

function AdminUsers() {
  return (
    <AppShell
      roleKey="admin"
      title="User management"
      subtitle="8,412 accounts · 64 staff · 19 roles"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">2 pending</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admin">
              <ArrowLeft className="size-4" /> Admin hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total users",
            value: "8,412",
            delta: "+214 this month",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Staff",
            value: "64",
            delta: "across 19 roles",
            icon: UserCheck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Active today",
            value: "1,208",
            delta: "14.4% of users",
            icon: ShieldCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Pending invites",
            value: "2",
            delta: "sent 3+ days ago",
            icon: UserPlus,
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
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Users className="text-primary size-4" /> Accounts
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {users.map((u) => (
            <div key={u.u} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-brand font-display text-xs font-extrabold text-white">
                {u.u
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{u.u}</p>
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
