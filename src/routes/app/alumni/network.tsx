import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, BriefcaseBusiness, MapPin, Search, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { AluMember } from "@/lib/api/alumni";
import { useAluMembers, useConnectToAluMember } from "@/lib/query/alumni";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/alumni/network")({
  head: () => ({
    meta: [
      { title: "Alumni Network — CEA-OS" },
      { name: "description", content: "Search the alumni directory and reconnect." },
    ],
  }),
  component: AlumniNetwork,
});

function AlumniNetwork() {
  const membersQuery = useAluMembers();
  const connect = useConnectToAluMember();
  const [search, setSearch] = useState("");
  const [connectedIds, setConnectedIds] = useState<Set<string>>(() => new Set());
  const normalizedSearch = search.trim().toLowerCase();

  const connectMember = (member: AluMember) => {
    if (connect.isPending || connectedIds.has(member.id)) return;
    connect.mutate(member.id, {
      onSuccess: (result) => {
        setConnectedIds((current) => new Set(current).add(member.id));
        toast.success(
          result.alreadyConnected
            ? `Your connection with ${result.member} is already pending`
            : `Connection request sent to ${result.member}`,
        );
      },
    });
  };

  return (
    <AppShell
      roleKey="alumni"
      title="Alumni network"
      subtitle="1,247 members · 32 countries · 640 in tech"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            86 connections
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/alumni/hub">
              <ArrowLeft className="size-4" /> Alumni hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="bg-card shadow-soft flex flex-wrap items-center gap-2 rounded-2xl border p-3">
        <div className="bg-muted flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="placeholder:text-muted-foreground w-full bg-transparent text-sm font-medium outline-none"
            placeholder="Name, cohort, company, city…"
            aria-label="Search alumni"
          />
        </div>
        <Button
          type="button"
          size="sm"
          className="font-semibold"
          onClick={() => setSearch(search.trim())}
        >
          Search
        </Button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <QueryState<AluMember[]>
          query={membersQuery}
          error={{ title: "Directory unavailable" }}
          empty={{
            title: "No members yet",
            description: "Alumni profiles will appear here.",
          }}
          isEmpty={(rows) => rows.length === 0}
        >
          {(rows) => {
            const visibleRows = normalizedSearch
              ? rows.filter((member) =>
                  [member.name, member.cohort, member.roleLabel, member.city]
                    .join(" ")
                    .toLowerCase()
                    .includes(normalizedSearch),
                )
              : rows;
            if (visibleRows.length === 0) {
              return (
                <p className="text-muted-foreground col-span-full py-8 text-center text-sm font-medium">
                  No alumni match “{search}”.
                </p>
              );
            }
            return visibleRows.map((m) => (
              <Card key={m.id} className="bg-card shadow-soft border">
                <CardContent className="flex flex-wrap items-center gap-4 p-5">
                  <span className="bg-primary/10 text-primary font-display grid size-11 shrink-0 place-items-center rounded-full text-sm font-extrabold">
                    {m.name
                      .split(" ")
                      .map((x) => x[0])
                      .join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-extrabold">{m.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {m.cohort} · {m.roleLabel}
                    </p>
                    <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-[11px]">
                      <MapPin className="size-3" /> {m.city}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {m.conn > 0 && (
                      <Badge className="bg-success/10 text-success border-0 font-semibold">
                        <Users className="size-3" /> {m.conn}
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant={m.conn || connectedIds.has(m.id) ? "outline" : "default"}
                      className="font-semibold"
                      onClick={() => connectMember(m)}
                      disabled={connect.isPending || connectedIds.has(m.id)}
                    >
                      {connectedIds.has(m.id) ? "Request sent" : "Connect"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ));
          }}
        </QueryState>
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <BriefcaseBusiness className="text-primary size-4" /> Find by industry
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {[
            "Fintech (410)",
            "Edtech (180)",
            "Healthtech (95)",
            "Dev tools (120)",
            "Startups (540)",
            "Global tech (230)",
          ].map((t) => (
            <Badge key={t} variant="secondary" className="cursor-pointer font-semibold">
              {t}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
