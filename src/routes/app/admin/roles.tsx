"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, KeyRound, ShieldCheck, SlidersHorizontal, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useAdminAccountItems, useAdminUserItems } from "@/lib/query/admin";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin/roles")({
  head: () => ({
    meta: [
      { title: "Roles & Permissions — CEA-OS" },
      { name: "description", content: "RBAC configuration and audits." },
    ],
  }),
  component: AdminRoles,
});

const roleDescriptions: Record<string, string> = {
  director: "Global access · approvals",
  accountant: "Finance suite",
  admin: "Platform administration",
  instructor: "Teaching & gradebook",
  hr: "People & leave",
  employer: "Recruitment & talent",
};

function AdminRoles() {
  const accounts = useAdminAccountItems();
  const users = useAdminUserItems();

  const byRole = new Map<string, number>();
  for (const a of accounts) byRole.set(a.roleKey, (byRole.get(a.roleKey) ?? 0) + 1);

  const roles = Array.from(byRole.entries()).map(([roleKey, count], i) => ({
    r: roleKey.charAt(0).toUpperCase() + roleKey.slice(1),
    m: roleDescriptions[roleKey] ?? "Scoped access",
    s: `${count} member${count === 1 ? "" : "s"}`,
    tone:
      i % 4 === 0
        ? "bg-primary/10 text-primary"
        : i % 4 === 1
          ? "bg-learning/10 text-learning"
          : i % 4 === 2
            ? "bg-success/10 text-success"
            : "bg-warning/10 text-warning",
  }));

  return (
    <AppShell
      roleKey="admin"
      title="Roles & permissions"
      subtitle={`${roles.length} roles · ${accounts.length} accounts · least privilege enforced`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Audited</Badge>
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
            label: "Roles",
            value: String(roles.length),
            delta: "with members",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Accounts",
            value: String(accounts.length),
            delta: "signed-up users",
            icon: KeyRound,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Staff records",
            value: String(users.length),
            delta: "HR directory",
            icon: SlidersHorizontal,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Compliance",
            value: "100%",
            delta: "last audit",
            icon: ShieldCheck,
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
            <ShieldCheck className="text-primary size-4" /> Roles
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {roles.map((r) => (
            <div key={r.r} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.r}</p>
                <p className="text-muted-foreground text-xs">{r.m}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", r.tone)}>{r.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Edit
              </Button>
            </div>
          ))}
          {roles.length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              No accounts yet — roles appear once staff sign in.
            </p>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
