import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Bell, CheckCheck, Inbox, Settings2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useNotifications } from "@/lib/query/notifications";
import type { AppNotification } from "@/lib/api/notifications";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — CEA-OS" },
      { name: "description", content: "Your in-app notification centre." },
    ],
  }),
  component: Notifications,
});

function engineTone(engine: string): string {
  if (engine === "community") return "bg-success/10 text-success";
  if (engine === "career") return "bg-learning/10 text-learning";
  if (engine === "erp") return "bg-warning/10 text-warning";
  return "bg-primary/10 text-primary";
}

function Notifications() {
  const query = useNotifications();
  const rows = query.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <AppShell
      roleKey="student"
      title="Notifications"
      subtitle="Delivered on app, email and SMS"
      actions={
        <>
          <Badge className="bg-primary/10 text-primary border-0 font-semibold">
            {rows.length} recent
          </Badge>
          <Button variant="outline" size="sm" className="font-semibold">
            <CheckCheck className="size-4" /> Mark all read
          </Button>
          <Button variant="ghost" size="sm" className="font-semibold">
            <Settings2 className="size-4" /> Preferences
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Recent",
            value: String(rows.length),
            delta: "this session",
            icon: Inbox,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "This week",
            value: "14",
            delta: "grades, classes, bills",
            icon: Bell,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Quiet hours",
            value: "21:00–08:00",
            delta: "deliveries held",
            icon: Settings2,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Channels",
            value: "App · Email",
            delta: "SMS for urgent",
            icon: Sparkles,
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
            <Bell className="text-primary size-4" /> Recent notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<AppNotification[]>
            query={query}
            error={{ title: "Notifications unavailable" }}
          >
            {(notifications) => (
              <>
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-lg",
                        engineTone(n.engine),
                      )}
                    >
                      <Bell className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{n.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {n.body} · {n.time}
                      </p>
                    </div>
                    <Badge variant="secondary" className="font-semibold">
                      {n.engine}
                    </Badge>
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
