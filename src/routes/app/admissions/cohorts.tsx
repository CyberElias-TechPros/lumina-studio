import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  CalendarPlus,
  Clock3,
  Download,
  Loader2,
  MapPin,
  Trash2,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import {
  cohortIcsHref,
  deleteCohort,
  fetchCohorts,
  saveCohort,
  type Cohort,
} from "@/lib/api/operations";
import { ApiError } from "@/lib/errors";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admissions/cohorts")({
  head: () => ({
    meta: [
      { title: "Cohorts — CEA-OS" },
      {
        name: "description",
        content:
          "Start dates for every programme, with calendar invites. The site and the assistant read these dates.",
      },
    ],
  }),
  component: CohortsPage,
});

const statusTone: Record<Cohort["status"], string> = {
  scheduled: "bg-primary/10 text-primary",
  running: "bg-success/10 text-success",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-error/10 text-error",
};

function CohortsPage() {
  const queryClient = useQueryClient();
  const [showPast, setShowPast] = useState(false);
  const query = useQuery({
    queryKey: ["cohorts", showPast],
    queryFn: () => fetchCohorts({ includePast: showPast }),
  });
  const [form, setForm] = useState({
    label: "",
    programSlug: "",
    startDate: "",
    endDate: "",
    days: "Mon/Wed/Fri",
    timeSlot: "evening" as Cohort["timeSlot"],
    mode: "hybrid" as Cohort["mode"],
    capacity: "",
    notes: "",
  });
  const [error, setError] = useState("");

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["cohorts"] });
    void queryClient.invalidateQueries({ queryKey: ["next-cohort"] });
  };

  const create = useMutation({
    mutationFn: () =>
      saveCohort({
        label: form.label,
        programSlug: form.programSlug,
        startDate: form.startDate,
        endDate: form.endDate || undefined,
        days: form.days,
        timeSlot: form.timeSlot,
        mode: form.mode,
        capacity: form.capacity ? Number(form.capacity) : undefined,
        notes: form.notes || undefined,
      }),
    onSuccess: () => {
      setForm({ ...form, label: "", startDate: "", endDate: "", notes: "", capacity: "" });
      setError("");
      invalidate();
    },
    onError: (err) =>
      setError(err instanceof ApiError ? err.message : "Could not save the cohort."),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteCohort(id),
    onSuccess: invalidate,
  });

  const items = query.data?.items ?? [];
  const inputClass =
    "border-input bg-background focus-visible:ring-ring w-full rounded-lg border px-3 py-2 text-sm focus-visible:ring-1 focus-visible:outline-none";

  return (
    <AppShell
      roleKey="admissions"
      title="Cohorts & start dates"
      subtitle={
        items.length > 0
          ? `${items.length} upcoming · the site, the ICS invites and the assistant all read these dates`
          : "No start dates recorded — the site falls back to the published cohort text"
      }
      actions={
        <Button
          variant="outline"
          size="sm"
          className="font-semibold"
          onClick={() => setShowPast((v) => !v)}
        >
          {showPast ? "Show upcoming only" : "Show past too"}
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarDays className="text-primary size-4" /> Start dates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QueryState
              query={query}
              isEmpty={(data: { items: Cohort[] }) => data.items.length === 0}
              empty={{
                icon: "calendar",
                title: "No cohorts recorded",
                description:
                  "Add the next intake so applicants get the right date and a calendar invite.",
              }}
            >
              {(data: { items: Cohort[] }) =>
                data.items.map((cohort) => (
                  <div key={cohort.id} className="rounded-lg border p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold">{cohort.label}</p>
                      <Badge
                        className={cn(
                          "border-0 text-[11px] font-semibold",
                          statusTone[cohort.status],
                        )}
                      >
                        {cohort.status}
                      </Badge>
                      {cohort.programSlug && (
                        <Badge variant="secondary" className="font-mono text-[10px]">
                          {cohort.programSlug}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="size-3.5" /> {cohort.startDate}
                        {cohort.endDate ? ` → ${cohort.endDate}` : ""}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock3 className="size-3.5" /> {cohort.days} · {cohort.timeSlot}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5" /> {cohort.mode}
                      </span>
                      {cohort.capacity && (
                        <span className="flex items-center gap-1">
                          <Users className="size-3.5" /> {cohort.capacity} seats
                        </span>
                      )}
                    </p>
                    {cohort.notes && (
                      <p className="text-muted-foreground mt-1 text-xs">{cohort.notes}</p>
                    )}
                    <div className="mt-3 flex gap-2">
                      <Button asChild size="sm" variant="outline" className="font-semibold">
                        <a href={cohortIcsHref(cohort.id)} download>
                          <Download className="size-3.5" /> Calendar file
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-muted-foreground"
                        disabled={remove.isPending}
                        onClick={() => remove.mutate(cohort.id)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                ))
              }
            </QueryState>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CalendarPlus className="text-primary size-4" /> Add a cohort
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  create.mutate();
                }}
                className="space-y-3"
              >
                <label className="text-xs font-medium">
                  Label
                  <input
                    required
                    value={form.label}
                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                    placeholder="e.g. Data Analytics & AI — March 2027"
                    className={cn(inputClass, "mt-1")}
                  />
                </label>
                <label className="text-xs font-medium">
                  Programme slug (optional)
                  <input
                    value={form.programSlug}
                    onChange={(e) => setForm({ ...form, programSlug: e.target.value })}
                    placeholder="e.g. web-development-professional"
                    className={cn(inputClass, "mt-1 font-mono text-xs")}
                  />
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-xs font-medium">
                    First class day
                    <input
                      required
                      type="date"
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      className={cn(inputClass, "mt-1")}
                    />
                  </label>
                  <label className="text-xs font-medium">
                    Last day (optional)
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      className={cn(inputClass, "mt-1")}
                    />
                  </label>
                  <label className="text-xs font-medium">
                    Days
                    <input
                      value={form.days}
                      onChange={(e) => setForm({ ...form, days: e.target.value })}
                      className={cn(inputClass, "mt-1")}
                    />
                  </label>
                  <label className="text-xs font-medium">
                    Time
                    <select
                      value={form.timeSlot}
                      onChange={(e) =>
                        setForm({ ...form, timeSlot: e.target.value as Cohort["timeSlot"] })
                      }
                      className={cn(inputClass, "mt-1")}
                    >
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                      <option value="any">Any</option>
                    </select>
                  </label>
                  <label className="text-xs font-medium">
                    Mode
                    <select
                      value={form.mode}
                      onChange={(e) => setForm({ ...form, mode: e.target.value as Cohort["mode"] })}
                      className={cn(inputClass, "mt-1")}
                    >
                      <option value="onsite">Onsite</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="online">Online</option>
                    </select>
                  </label>
                  <label className="text-xs font-medium">
                    Seats (optional)
                    <input
                      type="number"
                      min={1}
                      value={form.capacity}
                      onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                      className={cn(inputClass, "mt-1")}
                    />
                  </label>
                </div>
                <label className="text-xs font-medium">
                  Notes
                  <input
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="e.g. one cohort per training"
                    className={cn(inputClass, "mt-1")}
                  />
                </label>
                {error && <p className="text-error text-xs">{error}</p>}
                <Button type="submit" className="w-full font-semibold" disabled={create.isPending}>
                  {create.isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <CalendarPlus className="size-4" />
                  )}
                  Add cohort
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-muted/40">
            <CardContent className="p-5">
              <p className="text-sm font-bold">Why this matters</p>
              <ul className="text-muted-foreground mt-2 space-y-1.5 text-xs leading-relaxed">
                <li>
                  • Applicants&rsquo; calendar invites are generated from the cohort row, so
                  changing a date here changes what the next student is told.
                </li>
                <li>
                  • The public <span className="font-mono">/v1/cohorts</span> endpoint and the site
                  assistant read the same rows.
                </li>
                <li>
                  • Add the short-course rolling intake as a cohort too, so it is visible in one
                  place.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
