import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, Loader2, RefreshCw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useVerifyPayment } from "@/lib/query/payments";
import type { VerifyPaymentResult } from "@/lib/api/payments";
import { formatNaira } from "@/lib/utils";

export const Route = createFileRoute("/app/finance/pay-verify")({
  validateSearch: (search: Record<string, unknown>): { reference?: string } => ({
    reference: typeof search.reference === "string" ? search.reference : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Payment verification — CEA-OS" },
      { name: "description", content: "Confirming your payment status." },
    ],
  }),
  component: PayVerifyPage,
});

function PayVerifyPage() {
  const { reference } = Route.useSearch();
  const paymentQuery = useVerifyPayment(reference ?? "");

  return (
    <AppShell roleKey="finance" title="Payment verification" subtitle="Confirming your payment">
      <div className="mx-auto max-w-md">
        <Card className="bg-card shadow-soft border">
          <CardContent className="p-8 text-center">
            <QueryState<VerifyPaymentResult>
              query={paymentQuery}
              error={{ title: "Verification unavailable" }}
            >
              {(payment) =>
                payment.status === "success" ? (
                  <>
                    <span className="bg-success/10 text-success mx-auto grid size-14 place-items-center rounded-full">
                      <CheckCircle2 className="size-7" />
                    </span>
                    <h1 className="font-display mt-4 text-xl font-extrabold">Payment confirmed</h1>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {formatNaira(payment.amount)} received for{" "}
                      <strong className="text-foreground">
                        {payment.description || payment.reference}
                      </strong>
                      .
                    </p>
                    <p className="text-muted-foreground mt-1 font-mono text-xs">
                      {payment.reference}
                    </p>
                    <Button asChild className="bg-gradient-brand shadow-glow mt-6 border-0">
                      <Link to="/app/finance">
                        Back to finance <CreditCard className="ml-1.5 size-4" />
                      </Link>
                    </Button>
                  </>
                ) : payment.status === "failed" ? (
                  <>
                    <span className="bg-error/10 text-error mx-auto grid size-14 place-items-center rounded-full">
                      <XCircle className="size-7" />
                    </span>
                    <h1 className="font-display mt-4 text-xl font-extrabold">
                      Payment not received
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Your payment for{" "}
                      <strong className="text-foreground">
                        {payment.description || payment.reference}
                      </strong>{" "}
                      didn't go through.
                    </p>
                    <Button asChild variant="outline" className="mt-6">
                      <Link to="/app/finance">Try again</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="bg-warning/10 text-warning mx-auto grid size-14 place-items-center rounded-full">
                      <RefreshCw className="size-7" />
                    </span>
                    <h1 className="font-display mt-4 text-xl font-extrabold">Still pending</h1>
                    <p className="text-muted-foreground mt-2 text-sm">
                      We haven't seen confirmation for {reference} yet. It can take a few minutes —
                      check again shortly.
                    </p>
                    <Button asChild variant="outline" className="mt-6">
                      <Link to="/app/finance">Back to finance</Link>
                    </Button>
                  </>
                )
              }
            </QueryState>
            {!reference && (
              <p className="text-muted-foreground mt-6 flex items-center justify-center gap-2 text-sm">
                <Loader2 className="size-4 animate-spin" /> No payment reference in this link.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
