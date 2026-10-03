"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { useMemo, useState } from "react";
import { ArrowLeft, Phone, Search, UserRound, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useRecStaff, useRecStaffItems } from "@/lib/query/volunteerReceptionist";
import type { RecStaffMember } from "@/lib/api/volunteerReceptionist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/receptionist/directory")({
  head: () => ({
    meta: [
      { title: "Staff Directory — CEA-OS" },
      { name: "description", content: "Find staff, extensions and offices." },
    ],
  }),
  component: ReceptionistDirectory,
});

const tones = [
  "bg-primary/10 text-primary",
  "bg-learning/10 text-learning",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
];

function ReceptionistDirectory() {
  const staffQuery = useRecStaff();
  const staff = useRecStaffItems();
  const [search, setSearch] = useState("");
  const visibleStaff = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return staff;
    return staff.filter((member) =>
      [member.name, member.role, member.extension, member.office].some((value) =>
        value.toLowerCase().includes(term),
      ),
    );
  }, [search, staff]);

  return (
    <AppShell
      roleKey="receptionist"
      title="Staff directory"
      subtitle="94 staff · 6 departments · all extensions live"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Updated today</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/receptionist">
              <ArrowLeft className="size-4" /> Front desk
            </Link>
          </Button>
        </>
      }
    >
      <form
        className="bg-card shadow-soft flex flex-wrap items-center gap-2 rounded-2xl border p-3"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="bg-muted flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="placeholder:text-muted-foreground w-full bg-transparent text-sm font-medium outline-none"
            placeholder="Name, department, extension…"
            aria-label="Search staff directory"
          />
        </div>
        <Button type="submit" size="sm" className="font-semibold">
          Search
        </Button>
      </form>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Users className="text-primary size-4" /> Frequently needed
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<RecStaffMember[]>
            query={staffQuery}
            error={{ title: "Directory unavailable" }}
            empty={{ title: "No staff found", description: "Directory entries will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {() => (
              <>
                {visibleStaff.length === 0 ? (
                  <p className="text-muted-foreground py-6 text-center text-sm font-semibold">
                    No staff match “{search}”.
                  </p>
                ) : (
                  visibleStaff.map((s, i) => (
                    <div
                      key={s.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-lg",
                          tones[i % tones.length],
                        )}
                      >
                        <UserRound className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{s.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {s.role} · {s.office}
                        </p>
                      </div>
                      <Badge variant="secondary" className="font-semibold">
                        {s.extension}
                      </Badge>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="shrink-0 font-semibold"
                      >
                        <a href={`tel:${s.extension}`}>
                          <Phone className="size-3.5" /> Call
                        </a>
                      </Button>
                    </div>
                  ))
                )}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
