import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FileDown, ShieldCheck } from "lucide-react";
import { apiFetch, apiUrl } from "../api/client.ts";
import { Badge, Button, ErrorState, Spinner, Table, Td, statusTone } from "../components/ui.tsx";
import { formatDate, formatMoney, titleCase } from "../lib/money.ts";

interface SharedBusiness {
  name: string;
  addressLines: string[];
  phone: string | null;
  email: string | null;
  currencySymbol: string;
  bankName: string | null;
  bankAccountName: string | null;
  bankAccountNumber: string | null;
}

interface SharedItem {
  description: string;
  quantity: number;
  unitPrice?: number;
  amount?: number;
  serialNumber?: string | null;
  weightKg?: number | null;
}

interface SharedDocument {
  type: "invoice" | "waybill";
  number: string;
  title: string;
  status: string;
  issueDate: string;
  dueDate: string | null;
  customerName: string;
  contactPerson?: string | null;
  addressLine1?: string | null;
  city?: string | null;
  state?: string | null;
  phone?: string | null;
  email?: string | null;
  carrier?: string | null;
  trackingNumber?: string | null;
  origin?: string | null;
  destination?: string | null;
  receiverPhone?: string | null;
  pieces?: number;
  charges?: number;
  chargesPaidBy?: string;
  items: SharedItem[];
  subtotal?: number;
  discount?: number;
  taxLabel?: string;
  taxAmount?: number;
  shipping?: number;
  total?: number;
  paidAmount?: number;
  balance?: number;
  notes?: string | null;
  terms?: string | null;
}

/**
 * The only signed-in-free screen. It renders whatever the token resolves to and
 * nothing else — the Worker decides what a given link is allowed to reveal.
 */
export function SharePage() {
  const { token = "" } = useParams<{ token: string }>();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["share", token],
    queryFn: () => apiFetch<{ business: SharedBusiness; document: SharedDocument }>(`/share/${token}`),
    retry: false,
    staleTime: 60_000,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner label="Loading your document" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <ErrorState error={error} onRetry={() => void refetch()} />
          <p className="mt-2 text-center text-sm text-ink-500">
            This link may have expired or been revoked. Ask the sender for a fresh one.
          </p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { business, document } = data;
  const symbol = business.currencySymbol;

  return (
    <div className="min-h-screen bg-ink-100 py-6">
      <div className="mx-auto w-full max-w-3xl px-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-sm text-ink-600">
            <ShieldCheck className="h-4 w-4 text-brand-700" aria-hidden />
            Shared by {business.name}
          </p>
          <a href={apiUrl(`/share/${token}/pdf`)} target="_blank" rel="noreferrer">
            <Button variant="secondary" size="sm">
              <FileDown className="h-4 w-4" aria-hidden />
              Download PDF
            </Button>
          </a>
        </div>

        <div className="card p-6">
          <div className="mb-5 flex flex-wrap justify-between gap-4 border-b border-ink-200 pb-5">
            <div>
              <p className="text-lg font-semibold">{business.name}</p>
              {business.addressLines.length > 0 && (
                <p className="text-sm text-ink-500">{business.addressLines.join(", ")}</p>
              )}
              <p className="text-sm text-ink-500">
                {[business.phone, business.email].filter(Boolean).join(" · ")}
              </p>
            </div>
            <div className="text-right text-sm">
              <p className="text-base font-semibold">{document.title}</p>
              <p className="font-mono">{document.number}</p>
              <p className="mt-1">
                <Badge tone={statusTone(document.status)}>{titleCase(document.status)}</Badge>
              </p>
            </div>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="font-semibold text-ink-700">{document.type === "waybill" ? "Receiver" : "Bill to"}</p>
              <p className="text-ink-800">{document.customerName}</p>
              {document.contactPerson && <p className="text-ink-500">{document.contactPerson}</p>}
              <p className="text-ink-500">
                {[document.addressLine1, document.city, document.state].filter(Boolean).join(", ")}
              </p>
              <p className="text-ink-500">{[document.phone, document.email].filter(Boolean).join(" · ")}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-ink-500">
                {document.type === "waybill" ? "Dated" : "Issued"} {formatDate(document.issueDate)}
              </p>
              {document.dueDate && <p className="text-ink-500">Due {formatDate(document.dueDate)}</p>}
              {document.carrier && <p className="text-ink-500">Carrier {document.carrier}</p>}
              {document.trackingNumber && <p className="text-ink-500">Tracking {document.trackingNumber}</p>}
            </div>
          </div>

          {document.type === "waybill" && (document.origin || document.destination) && (
            <div className="mb-5 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div>
                <p className="font-semibold text-ink-700">From</p>
                <p className="text-ink-600 whitespace-pre-line">{document.origin || "—"}</p>
              </div>
              <div>
                <p className="font-semibold text-ink-700">To</p>
                <p className="text-ink-600 whitespace-pre-line">{document.destination || "—"}</p>
              </div>
            </div>
          )}

          <Table head={document.type === "waybill" ? ["Item", "Serial", "Weight", "Qty"] : ["Description", "Qty", "Unit price", "Amount"]}>
            {document.items.map((item, index) =>
              document.type === "waybill" ? (
                <tr key={index}>
                  <Td>{item.description}</Td>
                  <Td className="font-mono text-xs">{item.serialNumber ?? "—"}</Td>
                  <Td className="tnum">{item.weightKg != null ? `${item.weightKg} kg` : "—"}</Td>
                  <Td className="tnum">{item.quantity}</Td>
                </tr>
              ) : (
                <tr key={index}>
                  <Td>{item.description}</Td>
                  <Td className="tnum">{item.quantity}</Td>
                  <Td className="tnum">{formatMoney(item.unitPrice, symbol)}</Td>
                  <Td className="tnum text-right font-medium">{formatMoney(item.amount, symbol)}</Td>
                </tr>
              ),
            )}
          </Table>

          {document.type === "invoice" && (
            <dl className="ml-auto mt-4 w-full max-w-xs space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-600">Subtotal</dt>
                <dd className="tnum">{formatMoney(document.subtotal, symbol)}</dd>
              </div>
              {(document.discount ?? 0) > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-600">Discount</dt>
                  <dd className="tnum">- {formatMoney(document.discount, symbol)}</dd>
                </div>
              )}
              {(document.taxAmount ?? 0) > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-600">{document.taxLabel ?? "Tax"}</dt>
                  <dd className="tnum">{formatMoney(document.taxAmount, symbol)}</dd>
                </div>
              )}
              {(document.shipping ?? 0) > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-600">Shipping</dt>
                  <dd className="tnum">{formatMoney(document.shipping, symbol)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-ink-200 pt-1.5 text-base font-semibold">
                <dt>Total</dt>
                <dd className="tnum">{formatMoney(document.total, symbol)}</dd>
              </div>
              {(document.paidAmount ?? 0) > 0 && (
                <>
                  <div className="flex justify-between text-brand-700">
                    <dt>Paid</dt>
                    <dd className="tnum">- {formatMoney(document.paidAmount, symbol)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-ink-200 pt-1.5 font-semibold text-red-700">
                    <dt>Balance due</dt>
                    <dd className="tnum">{formatMoney(document.balance, symbol)}</dd>
                  </div>
                </>
              )}
            </dl>
          )}

          {document.type === "waybill" && (
            <dl className="ml-auto mt-4 w-full max-w-xs space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-600">Pieces</dt>
                <dd className="tnum">{document.pieces}</dd>
              </div>
              {(document.charges ?? 0) > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-600">Charges</dt>
                  <dd className="tnum">
                    {formatMoney(document.charges, symbol)} · {document.chargesPaidBy}
                  </dd>
                </div>
              )}
            </dl>
          )}

          {(business.bankAccountNumber || document.notes || document.terms) && (
            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-ink-200 pt-5 text-sm sm:grid-cols-2">
              {business.bankAccountNumber && (
                <div>
                  <p className="font-semibold text-ink-700">Payment details</p>
                  <p className="text-ink-600">{business.bankName}</p>
                  <p className="text-ink-600">{business.bankAccountName}</p>
                  <p className="tnum font-mono text-ink-800">{business.bankAccountNumber}</p>
                </div>
              )}
              {(document.notes || document.terms) && (
                <div>
                  {document.notes && (
                    <>
                      <p className="font-semibold text-ink-700">Notes</p>
                      <p className="text-ink-600 whitespace-pre-line">{document.notes}</p>
                    </>
                  )}
                  {document.terms && (
                    <>
                      <p className="mt-2 font-semibold text-ink-700">Terms</p>
                      <p className="text-ink-600 whitespace-pre-line">{document.terms}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-ink-500">
          This page shows only this document. Nothing else from {business.name} is accessible through this link.
        </p>
      </div>
    </div>
  );
}
