"use client";

import { useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Inbox,
  Search,
  UserRound,
  Wallet,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useAdminEnrollments, useUpdateEnrollmentStage } from "@/lib/query/enrollments";
import type { AdminEnrollment, EnrollmentStage } from "@/lib/api/enrollments";
import { formatNaira } from "@/lib/api/enrollments";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admissions/registrations")({
  head: () => ({
    meta: [
      { title: "Registration funnel — CEA-OS" },
      {
        name: "description",
        content:
          "v2 registrations from the public apply funnel, with payment status and pipeline control.",
      },
    ],
  }),
  component: AdmissionsRegistrations,
});

const STAGE_ORDER: EnrollmentStage[] = [
  "submitted",
  "screening",
  "assessment",
  "interview",
  "offer",
  "enrolled",
];

const STAGE_LABELS: Record<string, string> = {
  submitted: "Received",
  screening: "Screening",
  assessment: "Assessment",
  interview: "Interview",
  offer: "Offer",
  enrolled: "Enrolled",
  declined: "Declined",
};

const stageTone: Record<string, string> = {
  submitted: "bg-learning/10 text-learning",
  screening: "bg-primary/10 text-primary",
  assessment: "bg-primary/10 text-primary",
  interview: "bg-warning/10 text-warning",
  offer: "bg-warning/10 text-warning",
  enrolled: "bg-success/10 text-success",
  declined: "bg-error/10 text-error",
};

const payTone: Record<string, string> = {
  paid: "bg-success/10 text-success",
  deposit_paid: "bg-primary/10 text-primary",
  unpaid: "bg-warning/10 text-warning",
  failed: "bg-error/10 text-error",
};

function formatApplied(date: string): string {
  return `Registered ${new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  })}`;
}

function AdmissionsRegistrations() {
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const registrations = useAdminEnrollments(stageFilter === "all" ? undefined : stageFilter);
  const advance = useUpdateEnrollmentStage();
  const items = registrations.data?.pages.flatMap((p) => p.items) ?? [];

  const total = items.length;
  const paidFull = items.filter((r) => r.payment.status === "paid").length;
  const depositPaid = items.filter((r) => r.payment.status === "deposit_paid").length;
  const awaiting = items.filter(
    (r) => r.payment.status === "unpaid" && r.stage === "submitted",
  ).length;

  const matches = (r: AdminEnrollment) =>
    `${r.student.fullName} ${r.student.email} ${r.student.phone} ${r.ref} ${r.programTitle}`
      .toLowerCase()
      .includes(query.toLowerCase());

  const nextStage = (r: AdminEnrollment): EnrollmentStage | null => {
    const idx = STAGE_ORDER.indexOf(r.stage as EnrollmentStage);
    if (idx === -1 || idx === STAGE_ORDER.length - 1) return null;
    return STAGE_ORDER[idx + 1];
  };

  return (
    <AppShell
      roleKey="admissions"
      title="Registration funnel"
      subtitle={
        total > 0
          ? `${total} registrations · ${paidFull} paid in full · ${awaiting} awaiting payment`
          : "v2 leads from the public apply form"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Live funnel</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admissions">
              <ArrowLeft className="size-4" /> Admissions hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Registrations",
            value: total,
            delta: "all time (v2 funnel)",
            icon: Inbox,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Paid in full",
            value: paidFull,
            delta: "fee confirmed",
            icon: Banknote,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Deposit paid",
            value: depositPaid,
            delta: "seat held",
            icon: Wallet,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Awaiting payment",
            value: awaiting,
            delta: "submitted, unpaid",
            icon: BadgeCheck,
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

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div className="bg-card shadow-soft flex min-w-0 flex-1 flex-wrap items-center gap-1.5 rounded-2xl border p-2">
          {["all", ...STAGE_ORDER, "declined"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStageFilter(s)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-bold transition-colors",
                stageFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              {s === "all" ? "All" : STAGE_LABELS[s]}
            </button>
          ))}
        </div>
        <div className="bg-card shadow-soft flex min-w-[220px] flex-1 items-center gap-2 rounded-2xl border px-3 py-2">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="placeholder:text-muted-foreground w-full bg-transparent text-sm font-medium outline-none"
            placeholder="Name, email, program, ref…"
          />
        </div>
      </div>

      <Card className="bg-card mt-4 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Inbox className="text-primary size-4" /> Leads
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<AdminEnrollment[]>
            query={registrations}
            error={{ title: "Registrations unavailable" }}
            empty={{
              title: "No registrations yet",
              description:
                "Leads from the new apply funnel (cea.ng/apply) appear here with payment status the moment they submit.",
            }}
            isEmpty={(rows) => rows.length === 0 || !rows.some(matches)}
          >
            {(rows) => (
              <>
                {rows.filter(matches).map((r) => {
                  const next = nextStage(r);
                  return (
                    <div key={r.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                          <UserRound className="size-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold">
                            {r.student.fullName}
                            <span className="text-muted-foreground font-medium">
                              {" "}
                              · {r.programTitle}
                            </span>
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {r.ref} · {r.student.phone} · {r.student.email} · {r.student.city}
                          </p>
                        </div>
                        <Badge
                          className={cn(
                            "h-5 border-0 text-[10px] font-bold",
                            r.programKind === "long"
                              ? "bg-success/10 text-success"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {r.programKind === "long" ? "Long-form" : "Short"}
                        </Badge>
                        <Badge
                          className={cn(
                            "h-5 border-0 text-[10px] font-bold",
                            payTone[r.payment.status],
                          )}
                        >
                          {r.payment.status === "paid"
                            ? "Paid in full"
                            : r.payment.status === "deposit_paid"
                              ? "Deposit paid"
                              : r.payment.status === "failed"
                                ? "Payment failed"
                                : "Unpaid"}
                        </Badge>
                        <Badge
                          className={cn(
                            "h-5 shrink-0 border-0 text-[10px] font-bold",
                            stageTone[r.stage],
                          )}
                        >
                          {STAGE_LABELS[r.stage] ?? r.stage}
                        </Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 pl-12">
                        <p className="text-muted-foreground text-xs">
                          {formatNaira(r.feeTotal)} · {r.payment.plan} ·{" "}
                          {r.payment.status === "paid"
                            ? "fully paid"
                            : `${formatNaira(r.payment.amountDue)} outstanding`}{" "}
                          · {formatApplied(r.createdAt)}
                          {r.student.goal
                            ? ` · “${r.student.goal.slice(0, 60)}${r.student.goal.length > 60 ? "…" : ""}”`
                            : ""}
                        </p>
                        <div className="ml-auto flex items-center gap-2">
                          {next && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 font-semibold"
                              disabled={advance.isPending}
                              onClick={() => advance.mutate({ ref: r.ref, stage: next })}
                            >
                              {STAGE_LABELS[next]}
                              <ArrowRight className="ml-1 size-3" />
                            </Button>
                          )}
                          {r.stage !== "declined" && r.stage !== "enrolled" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-error font-semibold hover:text-error"
                              disabled={advance.isPending}
                              onClick={() =>
                                advance.mutate({
                                  ref: r.ref,
                                  stage: "declined",
                                  note: "Declined by admissions",
                                })
                              }
                            >
                              <XCircle className="mr-1 size-3" /> Decline
                            </Button>
                          )}
                          <Button asChild variant="ghost" size="sm" className="h-7 font-semibold">
                            <a
                              href={`https://wa.me/${r.student.phone.replace(/\D/g, "").replace(/^0/, "234")}?text=${encodeURIComponent(
                                `Hello ${r.student.firstName}! This is Cyber Elias Academy — we received your registration for ${r.programTitle} (ref ${r.ref}).`,
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              WhatsApp
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
