"use client";

import { useEffect, useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { z } from "zod";
import { BadgeCheck, Clock3, Loader2, MessageCircle, RefreshCw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero } from "@/components/marketing/shell";
import { verifyEnrollmentPayment, formatNaira } from "@/lib/api/enrollments";
import { tuitionPaymentResult } from "@/data/academy/tuition-policy";
import { ApplicantAccess } from "@/components/enrollment/applicant-access";
import { ApiError } from "@/lib/errors";

export const Route = createFileRoute("/apply/pay")({
  validateSearch: (search: Record<string, unknown>) =>
    z
      .object({
        reference: z.string().optional(),
        enrollment: z.string().optional(),
        mock: z.string().optional(),
      })
      .parse(search),
  head: () => ({
    meta: [
      { title: "Payment — Cyber Elias Academy" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PayReturnPage,
});

type PayState =
  | { status: "access" }
  | { status: "loading" }
  | { status: "paid"; amount: number }
  | { status: "deposit"; amount: number }
  | { status: "pending" }
  | { status: "failed" }
  | { status: "error"; message: string };

function PayReturnPage() {
  const { reference, enrollment } = Route.useSearch();
  const [state, setState] = useState<PayState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!reference || !enrollment) {
      setState({
        status: "error",
        message: "We could not find your payment details on this page.",
      });
      return;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const result = await verifyEnrollmentPayment(enrollment, reference);
        if (cancelled) return;
        const paymentState = tuitionPaymentResult(result.status, result.enrollmentPaymentStatus);
        if (paymentState === "paid") {
          setState({ status: "paid", amount: result.amount });
        } else if (paymentState === "deposit") {
          setState({ status: "deposit", amount: result.amount });
        } else if (paymentState === "failed") {
          setState({ status: "failed" });
        } else {
          setState({ status: "pending" });
        }
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && [401, 403].includes(err.status)) {
          setState({ status: "access" });
          return;
        }
        setState({
          status: "error",
          message:
            err instanceof ApiError
              ? err.message
              : "We could not verify your payment right now. It usually confirms within a minute.",
        });
      }
    }, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reference, enrollment, attempt]);

  const tracking = enrollment ? `/apply/status/${enrollment}` : "/apply/status";

  if (state.status === "access" && enrollment)
    return (
      <PageShell>
        <section className="container-page max-w-2xl py-12">
          <ApplicantAccess reference={enrollment} />
        </section>
      </PageShell>
    );
  return (
    <PageShell>
      <PageHero
        eyebrow="Payment"
        title="Checking your payment"
        description="Only verified transactions count as payment. You can return securely using your application email."
      />
      <section className="container-page pb-20">
        <div className="mx-auto max-w-xl">
          <Card className="border-card shadow-soft">
            <CardContent className="p-8 text-center">
              {state.status === "loading" && (
                <>
                  <Loader2 className="text-primary mx-auto size-10 animate-spin" />
                  <p className="font-display mt-5 text-lg font-bold">Confirming with the bank…</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    This usually takes a few seconds. Do not press pay again.
                  </p>
                </>
              )}

              {state.status === "paid" && (
                <>
                  <span className="bg-success/10 text-success mx-auto grid size-14 place-items-center rounded-full">
                    <BadgeCheck className="size-7" />
                  </span>
                  <p className="font-display mt-5 text-lg font-bold">Payment confirmed</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    We received {formatNaira(state.amount)} for your application. Your secure
                    application page shows your receipt, remaining balance and learner access.
                  </p>
                </>
              )}

              {state.status === "deposit" && (
                <>
                  <span className="bg-success/10 text-success mx-auto grid size-14 place-items-center rounded-full">
                    <BadgeCheck className="size-7" />
                  </span>
                  <p className="font-display mt-5 text-lg font-bold">Partial payment recorded</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    We received {formatNaira(state.amount)} toward your tuition. Your application
                    page shows your accepted timetable, remaining balance and exact due date.
                  </p>
                </>
              )}

              {state.status === "pending" && (
                <>
                  <span className="bg-warning/10 text-warning mx-auto grid size-14 place-items-center rounded-full">
                    <Clock3 className="size-7" />
                  </span>
                  <p className="font-display mt-5 text-lg font-bold">Payment in progress</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    The bank has not confirmed yet. Check back in a minute — or verify manually.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-5"
                    onClick={() => setAttempt((a) => a + 1)}
                  >
                    <RefreshCw className="size-4" /> Check again
                  </Button>
                </>
              )}

              {state.status === "failed" && (
                <>
                  <span className="bg-error/10 text-error mx-auto grid size-14 place-items-center rounded-full">
                    <XCircle className="size-7" />
                  </span>
                  <p className="font-display mt-5 text-lg font-bold">Payment did not go through</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    This attempt was not confirmed. If your bank shows a debit, ask CEA to reconcile
                    it before paying again. Your earlier confirmed payments remain recorded.
                  </p>
                </>
              )}

              {state.status === "error" && (
                <>
                  <span className="bg-warning/10 text-warning mx-auto grid size-14 place-items-center rounded-full">
                    <Clock3 className="size-7" />
                  </span>
                  <p className="font-display mt-5 text-lg font-bold">Just a moment</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {state.message}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-5"
                    onClick={() => setAttempt((a) => a + 1)}
                  >
                    <RefreshCw className="size-4" /> Check again
                  </Button>
                </>
              )}

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="sm">
                  <Link to={tracking}>Track my application</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href="https://wa.me/2349058628386">
                    <MessageCircle className="size-4" /> WhatsApp us
                  </a>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link to="/">Back to home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
