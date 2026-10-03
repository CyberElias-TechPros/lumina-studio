"use client";

import { useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import {
  createDeadline,
  deleteDeadline,
  fetchDeadlines,
  updateDeadline,
  type Deadline,
} from "@/lib/api/operations";
import { ApiError } from "@/lib/errors";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/deadlines")({
  head: () => ({
    meta: [
      { title: "Compliance deadlines — CEA-OS" },
      {
        name: "description",
        content: "The real CAC, FIRS and licence deadlines, with reminders at 30/14/7/3/1/0 days.",
      },
    ],
  }),
  component: DeadlinesPage,
});

const urgencyTone: Record<Deadline["urgency"], string> = {
  overdue: "bg-error/10 text-error",
  critical: "bg-warning/10 text-warning",
  soon: "bg-primary/10 text-primary",
  scheduled: "bg-muted text-muted-foreground",
  closed: "bg-success/10 text-success",
};

const AUTHORITIES = ["CAC", "FIRS", "NRS", "Rivers State", "other"] as const;
const CATEGORIES = ["annual_return", "tax", "licence", "report", "other"] as const;

function DeadlinesPage() {
  const queryClient = useQueryClient();
  const [showAll, setShowAll] = useState(false);
  const [form, setForm] = useState({
    title: "",
    authority: "CAC",
    category: "annual_return",
    dueOn: "",
    recurrence: "annual" as "none" | "annual" | "quarterly" | "monthly",
    notes: "",
  });
  const [error, setError] = useState("");

  const deadlines = useQuery({
    queryKey: ["deadlines", showAll ? "all" : "open"],
    queryFn: () => fetchDeadlines(showAll ? "all" : "open"),
  });

  const create = useMutation({
    mutationFn: () =>
      createDeadline({
        title: form.title,
        authority: form.authority,
        category: form.category,
        dueOn: form.dueOn,
        recurrence: form.recurrence,
        notes: form.notes || undefined,
      }),
    onSuccess: () => {
      setForm({ ...form, title: "", dueOn: "", notes: "" });
      setError("");
      void queryClient.invalidateQueries({ queryKey: ["deadlines"] });
    },
    onError: (err) =>
      setError(err instanceof ApiError ? err.message : "Could not save that deadline."),
  });

  const complete = useMutation({
    mutationFn: (id: string) => updateDeadline(id, { status: "done" }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["deadlines"] }),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteDeadline(id),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["deadlines"] }),
  });

  const items = deadlines.data?.items ?? [];
  const overdue = items.filter((d) => d.overdue).length;
  const critical = items.filter((d) => d.urgency === "critical" && !d.overdue).length;

  const inputClass =
    "border-input bg-background focus-visible:ring-ring w-full rounded-lg border px-3 py-2 text-sm focus-visible:ring-1 focus-visible:outline-none";

  return (
    <AppShell
      roleKey="admin"
      title="Compliance deadlines"
      subtitle={
        items.length === 0
          ? "No deadlines recorded yet — add the dates the CAC/FIRS portals give you"
          : `${items.length} tracked · ${overdue} overdue · ${critical} due within a week`
      }
      actions={
        <Badge
          className={cn(
            "border-0 font-semibold",
            overdue > 0 ? "bg-error/10 text-error" : "bg-success/10 text-success",
          )}
        >
          {overdue > 0 ? `${overdue} overdue` : "Nothing overdue"}
        </Badge>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarClock className="text-primary size-4" />
              {showAll ? "All deadlines" : "Open deadlines"}
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="font-semibold"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? "Show open only" : "Show all"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <QueryState
              query={deadlines}
              isEmpty={(data: { items: Deadline[] }) => data.items.length === 0}
              empty={{
                icon: "calendar",
                title: "Nothing tracked yet",
                description:
                  "Add the first deadline from what the CAC portal actually shows — we never invent compliance dates.",
              }}
            >
              {(data: { items: Deadline[] }) =>
                data.items.map((deadline: Deadline) => (
                  <div
                    key={deadline.id}
                    className="flex flex-wrap items-start justify-between gap-3 rounded-lg border p-4"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          className={cn("border-0 font-semibold", urgencyTone[deadline.urgency])}
                        >
                          {deadline.overdue
                            ? `${Math.abs(deadline.daysRemaining)} days overdue`
                            : deadline.daysRemaining === 0
                              ? "Due today"
                              : `${deadline.daysRemaining} days left`}
                        </Badge>
                        <Badge variant="secondary" className="text-[11px]">
                          {deadline.authority}
                        </Badge>
                        {deadline.recurrence !== "none" && (
                          <Badge variant="outline" className="text-[11px]">
                            {deadline.recurrence}
                          </Badge>
                        )}
                        {deadline.status !== "open" && (
                          <Badge className="bg-success/10 text-success border-0 text-[11px] font-semibold">
                            {deadline.status === "done" ? "Filed" : "Waived"}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-2 text-sm font-semibold">{deadline.title}</p>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        Due {deadline.dueOn}
                        {deadline.completedOn
                          ? ` · completed ${deadline.completedOn.slice(0, 10)} by ${deadline.completedBy ?? "—"}`
                          : ""}
                      </p>
                      {deadline.notes && (
                        <p className="text-muted-foreground mt-1 text-xs">{deadline.notes}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {deadline.status === "open" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="font-semibold"
                          disabled={complete.isPending}
                          onClick={() => complete.mutate(deadline.id)}
                        >
                          {complete.isPending ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <BadgeCheck className="size-3.5" />
                          )}
                          Mark filed
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-muted-foreground font-semibold"
                          onClick={() => remove.mutate(deadline.id)}
                          disabled={remove.isPending}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      )}
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
                <Plus className="text-primary size-4" /> Add a deadline
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
                  What is it?
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. CAC annual return — accounts to 15 Oct 2025"
                    className={cn(inputClass, "mt-1")}
                  />
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-xs font-medium">
                    Authority
                    <select
                      value={form.authority}
                      onChange={(e) => setForm({ ...form, authority: e.target.value })}
                      className={cn(inputClass, "mt-1")}
                    >
                      {AUTHORITIES.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs font-medium">
                    Type
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className={cn(inputClass, "mt-1")}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs font-medium">
                    Due date
                    <input
                      required
                      type="date"
                      value={form.dueOn}
                      onChange={(e) => setForm({ ...form, dueOn: e.target.value })}
                      className={cn(inputClass, "mt-1")}
                    />
                  </label>
                  <label className="text-xs font-medium">
                    Repeats
                    <select
                      value={form.recurrence}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          recurrence: e.target.value as typeof form.recurrence,
                        })
                      }
                      className={cn(inputClass, "mt-1")}
                    >
                      <option value="none">Once</option>
                      <option value="annual">Every year</option>
                      <option value="quarterly">Every quarter</option>
                      <option value="monthly">Every month</option>
                    </select>
                  </label>
                </div>
                <label className="text-xs font-medium">
                  Notes (what the portal said)
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="e.g. AGM held 15 Apr 2026; return due within 42 days."
                    className={cn(inputClass, "mt-1 resize-y")}
                  />
                </label>
                {error && <p className="text-error text-xs">{error}</p>}
                <Button type="submit" className="w-full font-semibold" disabled={create.isPending}>
                  {create.isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Plus className="size-4" />
                  )}
                  Add deadline
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-warning/30 bg-warning/5">
            <CardContent className="p-5">
              <p className="flex items-center gap-2 text-sm font-bold">
                <AlertTriangle className="text-warning size-4" /> How reminders work
              </p>
              <ul className="text-muted-foreground mt-2 space-y-1.5 text-xs leading-relaxed">
                <li>
                  • The daily job emails <strong className="text-foreground">help@cea.ng</strong> at
                  30, 14, 7, 3, 1 and 0 days before each open deadline.
                </li>
                <li>• An annual deadline rolls itself forward a year when you mark it filed.</li>
                <li>
                  • Nothing here is pre-filled with guesses: the date must come from the
                  CAC/FIRS/NRS portal. Mark it filed once you have the acknowledgement.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
