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
    meta: [{ title: "Payment — Cyber Elias Academy" }],
  }),
  component: PayReturnPage,
});

type PayState =
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
        if (result.status === "success" || result.enrollmentPaymentStatus === "paid") {
          setState({ status: "paid", amount: result.amount });
        } else if (result.enrollmentPaymentStatus === "deposit_paid") {
          setState({ status: "deposit", amount: result.amount });
        } else if (result.status === "failed") {
          setState({ status: "failed" });
        } else {
          setState({ status: "pending" });
        }
      } catch (err) {
        if (cancelled) return;
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

  return (
    <PageShell>
      <PageHero
        eyebrow="Payment"
        title="Checking your payment"
        description="We confirm with the bank in a few seconds. Keep this page open."
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
                    We received {formatNaira(state.amount)} for your enrollment. A receipt is on its
                    way to your email — your seat is held.
                  </p>
                </>
              )}

              {state.status === "deposit" && (
                <>
                  <span className="bg-success/10 text-success mx-auto grid size-14 place-items-center rounded-full">
                    <BadgeCheck className="size-7" />
                  </span>
                  <p className="font-display mt-5 text-lg font-bold">Deposit confirmed</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    We received your {formatNaira(state.amount)} deposit. Your seat is held while
                    admission confirms your dates — the balance plan is in your confirmation email.
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
                    Nothing was charged to you. You can try again any time from your tracking page.
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
