"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, Clock3, FileText, Loader2, Printer, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchReceipt } from "@/lib/api/operations";
import { formatNaira } from "@/lib/utils";

export const Route = createFileRoute("/apply/receipt/$ref")({
  head: () => ({
    meta: [
      { title: "Payment receipt — Cyber Elias Academy" },
      { name: "description", content: "Printable payment receipt." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReceiptPage,
});

function ReceiptPage() {
  const { ref } = Route.useParams();
  const query = useQuery({
    queryKey: ["receipt", ref],
    queryFn: () => fetchReceipt(ref),
    retry: false,
  });

  if (query.isPending) {
    return (
      <div className="container-page flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground flex items-center gap-2 text-sm">
          <Loader2 className="size-4 animate-spin" /> Loading receipt {ref}…
        </p>
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <div className="container-page flex min-h-[50vh] items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <XCircle className="text-error mx-auto size-8" />
            <h1 className="font-display mt-4 text-xl font-extrabold">Receipt not found</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Check the reference, or call the academy on 0905 862 8386 and we will resend it.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { receipt } = query.data;
  const hasPayments = receipt.payments.length > 0;

  return (
    <div className="container-page py-10 print:py-0">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Button asChild variant="ghost" size="sm" className="font-semibold">
            <Link to="/apply/status/$id" params={{ id: receipt.ref }}>
              ← Back to my application
            </Link>
          </Button>
          {hasPayments && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="font-semibold"
            >
              <Printer className="size-4" /> Print / save as PDF
            </Button>
          )}
        </div>

        <Card className="print:border-0 print:shadow-none">
          <CardContent className="p-6 sm:p-10">
            <div className="flex items-start justify-between gap-4 border-b pb-5">
              <div>
                <p className="font-display text-lg font-extrabold">Cyber Elias Academy Ltd</p>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  {receipt.issuedBy.address}
                  <br />
                  {receipt.issuedBy.rc} · {receipt.issuedBy.tin}
                  <br />
                  {receipt.issuedBy.email} · {receipt.issuedBy.phone}
                </p>
              </div>
              <Badge variant="secondary" className="shrink-0 font-mono text-[11px]">
                {receipt.ref}
              </Badge>
            </div>

            <h1 className="font-display mt-6 flex items-center gap-2 text-xl font-extrabold">
              <FileText className="text-primary size-5" /> Payment receipt
            </h1>

            <dl className="mt-5 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground text-xs">Student</dt>
                <dd className="font-semibold">{receipt.studentName}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">Programme</dt>
                <dd className="font-semibold">{receipt.programTitle}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">Reference</dt>
                <dd className="font-mono text-xs">{receipt.ref}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">Receipt number</dt>
                <dd className="font-mono text-xs font-semibold">
                  {receipt.latestReceiptNo ?? "—"}
                </dd>
              </div>
            </dl>

            {!hasPayments ? (
              <div className="mt-6 rounded-lg bg-warning/10 px-4 py-4">
                <p className="text-warning flex items-center gap-2 text-sm font-bold">
                  <Clock3 className="size-4" /> No confirmed payment yet
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  A receipt appears here the moment a payment is confirmed. If you have already
                  transferred, report it from your{" "}
                  <Link
                    to="/apply/status/$id"
                    params={{ id: receipt.ref }}
                    className="text-primary font-semibold underline-offset-2 hover:underline"
                  >
                    application page
                  </Link>{" "}
                  and finance will match it.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-6 overflow-hidden rounded-lg border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/60">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold">Date</th>
                        <th className="px-3 py-2 text-left font-semibold">Receipt no.</th>
                        <th className="px-3 py-2 text-left font-semibold">Method</th>
                        <th className="px-3 py-2 text-left font-semibold">Item</th>
                        <th className="px-3 py-2 text-right font-semibold">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receipt.payments.map((payment) => (
                        <tr key={payment.reference} className="border-t">
                          <td className="px-3 py-2">
                            {payment.paidAt
                              ? new Date(payment.paidAt).toLocaleDateString("en-GB")
                              : "—"}
                          </td>
                          <td className="px-3 py-2 font-mono text-xs">
                            {payment.receiptNo ?? "—"}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {payment.method.replace("-", " ")}
                          </td>
                          <td className="px-3 py-2 capitalize">{payment.kind}</td>
                          <td className="px-3 py-2 text-right font-semibold">
                            {formatNaira(payment.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <dl className="mt-5 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Fee</dt>
                    <dd>{formatNaira(receipt.feeTotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Paid to date</dt>
                    <dd className="text-success font-semibold">
                      {formatNaira(receipt.paidAmount)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t pt-1.5">
                    <dt className="font-semibold">
                      {receipt.balance > 0 ? "Balance due" : "Balance"}
                    </dt>
                    <dd className="font-bold">
                      {receipt.balance > 0 ? formatNaira(receipt.balance) : "₦0 — paid in full"}
                    </dd>
                  </div>
                </dl>

                <p className="text-muted-foreground mt-6 flex items-center gap-2 text-xs">
                  <BadgeCheck className="text-success size-4 shrink-0" />
                  Payments are confirmed against the academy's bank statement. Keep this receipt —
                  it is your proof of payment.
                </p>
              </>
            )}

            <p className="text-muted-foreground mt-6 border-t pt-4 text-[11px]">
              Computer-generated receipt · Cyber Elias Academy Ltd · cea.ng · help@cea.ng
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
