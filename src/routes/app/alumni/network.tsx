import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BriefcaseBusiness, MapPin, Search, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const members = [
  { n: "Amina Suleiman", c: "Cloud Eng. · 2023", r: "SRE @ Paystack", l: "Lagos", conn: 1 },
  { n: "David Osei", c: "Full-Stack · 2024", r: "Frontend @ Andela", l: "Accra", conn: 0 },
  { n: "Blessing Ade", c: "Data Science · 2022", r: "ML Eng @ Kuda", l: "Lagos", conn: 2 },
  { n: "Ibrahim Musa", c: "DevOps · 2024", r: "Platform @ Flutterwave", l: "Abuja", conn: 0 },
];

function AlumniNetwork() {
  return (
    <AppShell
      roleKey="instructor"
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
            className="placeholder:text-muted-foreground w-full bg-transparent text-sm font-medium outline-none"
            placeholder="Name, cohort, company, city…"
          />
        </div>
        <Button size="sm" className="font-semibold">
          Search
        </Button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {members.map((m) => (
          <Card key={m.n} className="bg-card shadow-soft border">
            <CardContent className="flex flex-wrap items-center gap-4 p-5">
              <span className="bg-primary/10 text-primary font-display grid size-11 shrink-0 place-items-center rounded-full text-sm font-extrabold">
                {m.n
                  .split(" ")
                  .map((x) => x[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-extrabold">{m.n}</p>
                <p className="text-muted-foreground text-xs">
                  {m.c} · {m.r}
                </p>
                <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-[11px]">
                  <MapPin className="size-3" /> {m.l}
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
                  variant={m.conn ? "outline" : "default"}
                  className="font-semibold"
                >
                  {m.conn ? "Message" : "Connect"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
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
