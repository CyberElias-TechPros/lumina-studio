import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText, Search, UserRound, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useEmployees } from "@/lib/query/hr";
import type { Employee } from "@/lib/api/hr";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/employees")({
  head: () => ({
    meta: [
      { title: "Employees — CEA-OS" },
      { name: "description", content: "Employee database, contracts and documents." },
    ],
  }),
  component: HrEmployees,
});

function HrEmployees() {
  const query = useEmployees();
  const rows = query.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <AppShell
      roleKey="hr"
      title="Employee database"
      subtitle={`${rows.length} records · 96% docs complete`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Compliance OK</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/hr">
              <ArrowLeft className="size-4" /> HR hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="bg-card shadow-soft flex flex-wrap items-center gap-2 rounded-2xl border p-3">
        <div className="bg-muted flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <input
            className="placeholder:text-muted-foreground w-full bg-transparent text-sm font-medium outline-none"
            placeholder="Name, role, department…"
          />
        </div>
        <Button size="sm" className="font-semibold">
          Search
        </Button>
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Users className="text-primary size-4" /> Staff directory
          </CardTitle>
          <Badge variant="secondary" className="font-semibold">
            {rows.length} total
          </Badge>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<Employee[]> query={query} error={{ title: "Directory unavailable" }}>
            {(staff) => (
              <>
                {staff.map((s) => (
                  <div
                    key={s.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                      <UserRound className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{s.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {s.role} · {s.dept} · joined {s.joined}
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        s.status === "Active"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning",
                      )}
                    >
                      {s.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      <FileText className="size-3.5" /> File
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
