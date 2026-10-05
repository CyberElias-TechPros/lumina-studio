"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/lib/next-compat/router";
import {
  BadgeCheck,
  CalendarPlus,
  CheckCircle2,
  ClipboardCopy,
  Clock3,
  Loader2,
  Mail,
  MessageCircle,
  PartyPopper,
  Receipt,
  Landmark,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  startEnrollmentPayment,
  verifyEnrollmentPayment,
  formatNaira,
} from "@/lib/api/enrollments";
import { fetchNextCohort, type Cohort } from "@/lib/api/operations";
import { isMockMode } from "@/lib/env";
import { downloadCohortCalendar } from "@/lib/calendar";
import { BankTransferForm } from "./bank-transfer-form";
import { ApiError } from "@/lib/errors";
import { cn } from "@/lib/utils";
import { feeFor, formatFee, type ProgramMeta } from "./meta";

interface SuccessScreenProps {
  refCode: string;
  meta: ProgramMeta | null;
  plan: string;
  method: string;
  phone: string;
  /** Set when returning from the Paystack redirect (auto-verify on load). */
  payReference?: string;
  onPaidState?: (status: "unpaid" | "deposit_paid" | "paid") => void;
}

const ACADEMY_WA = "2349058628386";

function formatCohortDate(value: string): string {
  const date = new Date(`${value}T12:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Lagos",
  }).format(date);
}

export function SuccessScreen({
  refCode,
  meta,
  plan,
  method,
  phone,
  payReference,
  onPaidState,
}: SuccessScreenProps) {
  const [payState, setPayState] = useState<
    | { status: "idle" }
    | { status: "starting" }
    | { status: "checking" }
    | { status: "paid"; amount: number }
    | { status: "pending" }
    | { status: "error"; message: string }
  >({ status: "idle" });
  const [copied, setCopied] = useState(false);
  const [cohortLookup, setCohortLookup] = useState<
    | { status: "idle" | "loading" }
    | { status: "ready"; cohort: Cohort | null }
    | { status: "unavailable" }
  >(() =>
    meta?.kind === "long"
      ? isMockMode
        ? { status: "ready", cohort: null }
        : { status: "loading" }
      : { status: "idle" },
  );

  const { due } = meta ? feeFor(meta, plan) : { due: 0 };
  const deposit =
    meta && (plan === "50-50" || plan === "deposit-monthly")
      ? meta.kind === "short"
        ? Math.round(meta.fee / 2)
        : Math.round(meta.fee * 0.3)
      : null;

  const verifiedRef = useRef<string | null>(null);
  useEffect(() => {
    if (payReference && verifiedRef.current !== payReference) {
      verifiedRef.current = payReference;
      void checkPayment(payReference);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payReference]);

  useEffect(() => {
    if (meta?.kind !== "long") {
      setCohortLookup({ status: "idle" });
      return;
    }
    if (isMockMode) {
      setCohortLookup({ status: "ready", cohort: null });
      return;
    }

    let active = true;
    setCohortLookup({ status: "loading" });
    void fetchNextCohort(meta.slug)
      .then(({ cohort }) => {
        if (!active) return;
        const verifiedCohort =
          cohort &&
          cohort.programSlug === meta.slug &&
          cohort.kind === meta.kind &&
          cohort.status === "scheduled"
            ? cohort
            : null;
        setCohortLookup({ status: "ready", cohort: verifiedCohort });
      })
      .catch(() => {
        if (active) setCohortLookup({ status: "unavailable" });
      });

    return () => {
      active = false;
    };
  }, [meta?.kind, meta?.slug]);

  async function copyRef() {
    try {
      await navigator.clipboard.writeText(refCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  async function pay(kind: "deposit" | "full") {
    setPayState({ status: "starting" });
    try {
      const session = await startEnrollmentPayment(refCode, kind);
      // Production: Paystack hosted checkout. Mock: our own pay-return page,
      // which simulates a completed payment on verify.
      window.location.assign(session.authorizationUrl);
    } catch (err) {
      setPayState({
        status: "error",
        message:
          err instanceof ApiError
            ? err.message
            : "We could not start the payment. Try again or contact us on WhatsApp.",
      });
    }
  }

  async function checkPayment(reference: string) {
    setPayState({ status: "checking" });
    try {
      const result = await verifyEnrollmentPayment(refCode, reference);
      if (result.status === "success" || result.enrollmentPaymentStatus !== "unpaid") {
        const full = result.enrollmentPaymentStatus === "paid";
        setPayState({ status: "paid", amount: result.amount });
        onPaidState?.(full ? "paid" : "deposit_paid");
      } else if (result.status === "failed") {
        setPayState({
          status: "error",
          message: "That payment did not go through. You can try again.",
        });
      } else {
        setPayState({ status: "pending" });
      }
    } catch (err) {
      setPayState({
        status: "error",
        message: err instanceof ApiError ? err.message : "Could not verify the payment right now.",
      });
    }
  }

  const waText = encodeURIComponent(
    `Hello Cyber Elias Academy! I just registered for ${meta?.title ?? "a course"} (ref ${refCode}).`,
  );
  const waPersonal = phone
    ? `https://wa.me/${ACADEMY_WA}?text=${waText}&contact=${phone.replace(/\D/g, "")}`
    : `https://wa.me/${ACADEMY_WA}?text=${waText}`;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center">
        <span className="bg-success/10 text-success mx-auto grid size-14 place-items-center rounded-full">
          <PartyPopper className="size-7" />
        </span>
        <h1 className="font-display mt-5 text-2xl font-extrabold sm:text-3xl">
          Application received
        </h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-relaxed">
          We have your application for{" "}
          <strong className="text-foreground">{meta?.title ?? "your course"}</strong>. This is not
          confirmation of a class date or reserved seat; admissions will confirm course availability
          and next steps with you.
        </p>
        <div className="bg-muted mx-auto mt-6 inline-flex items-center gap-3 rounded-xl border px-5 py-3">
          <p className="text-muted-foreground text-sm">Your reference</p>
          <p className="font-mono text-base font-bold tracking-widest">{refCode}</p>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={copyRef}
            aria-label="Copy reference"
          >
            {copied ? (
              <CheckCircle2 className="text-success size-4" />
            ) : (
              <ClipboardCopy className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Payment card */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <p className="font-display flex items-center gap-2 text-base font-bold">
            <Wallet className="text-primary size-4.5" />
            {method === "bank-transfer" ? "Bank transfer details" : "Payment options"}
          </p>
          <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
            The application reference does not confirm a class date. Admissions will confirm course
            availability and schedule separately.
          </p>

          {payState.status === "checking" && (
            <p className="text-muted-foreground mt-4 flex items-center gap-2 text-sm">
              <Loader2 className="text-primary size-4 animate-spin" /> Checking your payment…
            </p>
          )}

          {payState.status === "paid" && (
            <div className="mt-4 rounded-lg bg-success/10 px-4 py-3">
              <p className="text-success flex items-center gap-2 text-sm font-bold">
                <BadgeCheck className="size-4.5" /> Payment confirmed
                {payState.amount ? ` — ${formatNaira(payState.amount)}` : ""}
              </p>
              <p className="text-success/90 mt-1 text-xs">
                Receipt sent to your email. Admissions will confirm course availability, your place
                and start date separately.
              </p>
            </div>
          )}

          {payState.status === "pending" && (
            <div className="mt-4 rounded-lg bg-warning/10 px-4 py-3">
              <p className="text-warning flex items-center gap-2 text-sm font-bold">
                <Clock3 className="size-4.5" /> Payment in progress
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                We usually confirm within a minute. Keep this page open — or track it any time with
                your reference.
              </p>
            </div>
          )}

          {(payState.status === "idle" ||
            payState.status === "starting" ||
            payState.status === "error") && (
            <>
              {payState.status === "error" && (
                <p className="text-error mt-3 text-sm">{payState.message}</p>
              )}
              {method === "paystack" ? (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {deposit !== null && (
                    <Button
                      onClick={() => pay("deposit")}
                      disabled={payState.status === "starting"}
                      className="h-11 font-semibold"
                    >
                      {payState.status === "starting" ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Wallet className="size-4" />
                      )}{" "}
                      Pay {formatFee(deposit)} deposit
                    </Button>
                  )}
                  <Button
                    onClick={() => pay("full")}
                    disabled={payState.status === "starting"}
                    variant={deposit !== null ? "outline" : "default"}
                    className={cn(
                      "h-11 font-semibold",
                      deposit !== null && "border-primary/40 text-primary",
                    )}
                  >
                    Pay {formatFee(due)} in full
                    {meta?.kind === "long" && plan === "full-10-off" ? " (10% off applied)" : ""}
                  </Button>
                </div>
              ) : (
                <BankTransferForm refCode={refCode} deposit={deposit} due={due} />
              )}
              <p className="text-muted-foreground mt-3 text-xs">
                Prefer to pay later? No problem — your details are safe. Use{" "}
                <a
                  href={`/apply/status/${refCode}`}
                  className="text-primary font-semibold underline-offset-2 hover:underline"
                >
                  track my application
                </a>{" "}
                to pay any time with your reference.
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* What happens next */}
      <Card className="mt-4">
        <CardContent className="p-6">
          <p className="font-display flex items-center gap-2 text-base font-bold">
            <Mail className="text-primary size-4.5" /> What happens next
          </p>
          <ol className="mt-4 space-y-4">
            {[
              {
                icon: Mail,
                title: "Keep your reference",
                desc: "Use it to track this application or contact admissions about your course.",
              },
              {
                icon: MessageCircle,
                title: "Admissions confirms availability",
                desc: "A team member will confirm the next available date and answer any questions about the schedule.",
              },
              {
                icon: Receipt,
                title: "Payment and your place",
                desc: "Payment is recorded against your application. Your place and start date are confirmed separately by admissions.",
              },
              {
                icon: CalendarPlus,
                title: "Details before class begins",
                desc: "Admissions will share the confirmed schedule, what to bring and the room or online-class details.",
              },
            ].map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span className="bg-primary/10 text-primary grid size-8 shrink-0 place-items-center rounded-full">
                  <s.icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-bold">
                    {i + 1}. {s.title}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          {meta?.kind === "long" && (
            <div className="mt-4">
              {cohortLookup.status === "loading" && (
                <p className="text-muted-foreground text-xs" role="status">
                  Checking the current cohort dates…
                </p>
              )}
              {cohortLookup.status === "ready" && cohortLookup.cohort && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="font-semibold"
                    onClick={() => downloadCohortCalendar(cohortLookup.cohort!)}
                  >
                    <CalendarPlus className="size-3.5" /> Add{" "}
                    {formatCohortDate(cohortLookup.cohort.startDate)}
                    to your calendar
                  </Button>
                  <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                    Based on the listed cohort: {cohortLookup.cohort.label} ·{" "}
                    {cohortLookup.cohort.days} · {cohortLookup.cohort.timeSlot}. Admissions can
                    confirm any schedule changes.
                  </p>
                </>
              )}
              {cohortLookup.status === "ready" && !cohortLookup.cohort && (
                <p className="text-muted-foreground text-xs leading-relaxed" role="status">
                  No upcoming cohort date is recorded yet. Admissions will confirm your start date;
                  a calendar invite will be available when it is set.
                </p>
              )}
              {cohortLookup.status === "unavailable" && (
                <p className="text-muted-foreground text-xs leading-relaxed" role="status">
                  Current cohort dates could not be loaded. Admissions will confirm your start date
                  and schedule directly.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <a href={waPersonal}>
            <MessageCircle className="size-4.5" /> Chat with us on WhatsApp
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={`/apply/status/${refCode}`}>
            <BadgeCheck className="size-4.5" /> Track my application
          </a>
        </Button>
        <Button asChild size="lg" variant="ghost">
          <Link to="/classes">Browse all courses</Link>
        </Button>
      </div>
    </div>
  );
}
