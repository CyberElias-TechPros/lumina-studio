import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileDown, Plus, Printer, Save, Send, Share2, Trash2, X } from "lucide-react";
import { PageHeader } from "../components/Layout.tsx";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  ErrorState,
  Field,
  Input,
  Modal,
  MoneyInput,
  Select,
  Spinner,
  Table,
  Td,
  Textarea,
  statusTone,
  useToast,
} from "../components/ui.tsx";
import { invalidateAll, useApiMutation, useBusiness, useCustomers, useInvoice, useProducts } from "../api/hooks.ts";
import { apiUrl, apiFetch } from "../api/client.ts";
import { addDaysIso, formatDateTime, formatMoney, koboToInput, parseAmountToKobo, todayIso, titleCase } from "../lib/money.ts";
import { PaymentDialog } from "./Invoices.tsx";
import type { InvoiceItem } from "../api/types.ts";

interface DraftItem {
  productId: string;
  description: string;
  quantity: string;
  unitPrice: string;
}

const EMPTY_ITEM: DraftItem = { productId: "", description: "", quantity: "1", unitPrice: "" };

export function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";

  if (isNew) return <InvoiceEditor />;
  return <InvoiceView id={id!} />;
}

/* ------------------------------------------------------------------- editor */

function InvoiceEditor() {
  const navigate = useNavigate();
  const toast = useToast();
  const { data: businessData } = useBusiness();
  const customers = useCustomers({ limit: 200, active: "true" });
  const products = useProducts({ limit: 200 });
  const business = businessData?.business;

  const [customerId, setCustomerId] = useState("");
  const [issueDate, setIssueDate] = useState(todayIso());
  const [dueDate, setDueDate] = useState(addDaysIso(todayIso(), business?.paymentTermsDays ?? 14));
  const [items, setItems] = useState<DraftItem[]>([{ ...EMPTY_ITEM }]);
  const [discount, setDiscount] = useState("");
  const [shipping, setShipping] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [notes, setNotes] = useState(business?.invoiceNotes ?? "");
  const [status, setStatus] = useState<"draft" | "sent">("sent");
  const [error, setError] = useState<string | null>(null);

  // Once the business profile loads, seed the terms and default notes.
  useEffect(() => {
    if (!business) return;
    setDueDate((current) => (current === addDaysIso(todayIso(), 14) ? addDaysIso(todayIso(), business.paymentTermsDays) : current));
    setNotes((current) => (current ? current : (business.invoiceNotes ?? "")));
  }, [business]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      const qty = Number.parseInt(item.quantity, 10) || 0;
      const price = parseAmountToKobo(item.unitPrice) ?? 0;
      return sum + qty * price;
    }, 0);
    const discountKobo = Math.min(parseAmountToKobo(discount) ?? 0, subtotal);
    const shippingKobo = parseAmountToKobo(shipping) ?? 0;
    const taxKobo =
      business?.taxEnabled && subtotal - discountKobo > 0
        ? Math.round(((subtotal - discountKobo) * business.taxRateBp) / 10_000)
        : 0;
    const total = subtotal - discountKobo + taxKobo + shippingKobo;
    return { subtotal, discount: discountKobo, tax: taxKobo, shipping: shippingKobo, total };
  }, [items, discount, shipping, business]);

  const save = useApiMutation<Record<string, unknown>, { invoice: { id: string } }>({
    path: "/invoices",
    invalidate: invalidateAll,
    idempotent: true,
  });

  function updateItem(index: number, patch: Partial<DraftItem>) {
    setItems((current) => current.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  /** Choosing a catalogue product fills its description and price. */
  function applyProduct(index: number, productId: string) {
    const product = products.data?.data.find((p) => p.id === productId);
    updateItem(index, {
      productId,
      description: product ? `${product.name}${product.conditionGrade !== "new" ? ` (${titleCase(product.conditionGrade)})` : ""}` : "",
      unitPrice: product ? koboToInput(product.salePrice) : "",
    });
  }

  function submit() {
    setError(null);
    const payloadItems: InvoiceItem[] = items
      .filter((item) => item.description.trim())
      .map((item) => ({
        productId: item.productId || null,
        description: item.description.trim(),
        quantity: Number.parseInt(item.quantity, 10) || 1,
        unitPrice: parseAmountToKobo(item.unitPrice) ?? 0,
      }));

    if (!customerId) return setError("Choose a customer.");
    if (payloadItems.length === 0) return setError("Add at least one line item.");

    save.mutate(
      {
        customerId,
        issueDate,
        dueDate,
        items: payloadItems,
        discount: totals.discount,
        shipping: totals.shipping,
        taxEnabled: business?.taxEnabled ?? false,
        taxRateBp: business?.taxRateBp ?? 0,
        poNumber,
        notes,
        status,
      },
      {
        onSuccess: (result) => {
          toast.push("success", `Invoice created${status === "sent" ? " and marked sent" : " as a draft"}.`);
          navigate(`/invoices/${result.invoice.id}`, { replace: true });
        },
        onError: (err) => setError(err instanceof Error ? err.message : "Could not save the invoice."),
      },
    );
  }

  const symbol = business?.currencySymbol ?? "₦";

  return (
    <>
      <PageHeader
        title="New invoice"
        description="Line items, discount and terms. Stock moves when the invoice is sent."
        actions={
          <Link to="/invoices">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card className="p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Customer" htmlFor="customer" required>
                <Select id="customer" value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                  <option value="">Select a customer…</option>
                  {customers.data?.data.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Issue date" htmlFor="issue" required>
                  <Input id="issue" type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
                </Field>
                <Field label="Due date" htmlFor="due" required>
                  <Input id="due" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </Field>
              </div>
              <Field label="Customer PO reference" htmlFor="po">
                <Input id="po" value={poNumber} onChange={(e) => setPoNumber(e.target.value)} />
              </Field>
              <Field label="Status" htmlFor="status">
                <Select id="status" value={status} onChange={(e) => setStatus(e.target.value as "draft" | "sent")}>
                  <option value="sent">Send — commits stock</option>
                  <option value="draft">Save as draft</option>
                </Select>
              </Field>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Line items"
              action={
                <Button size="sm" variant="secondary" onClick={() => setItems((c) => [...c, { ...EMPTY_ITEM }])}>
                  <Plus className="h-4 w-4" aria-hidden />
                  Add line
                </Button>
              }
            />
            <div className="divide-y divide-ink-100">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 items-start gap-2 p-3">
                  <div className="col-span-12 sm:col-span-4">
                    <Select
                      value={item.productId}
                      onChange={(e) => applyProduct(index, e.target.value)}
                      aria-label={`Catalogue product for line ${index + 1}`}
                    >
                      <option value="">Free-text line…</option>
                      {products.data?.data.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.sku} — {product.name} ({product.quantity} in stock)
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-span-12 sm:col-span-4">
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(index, { description: e.target.value })}
                      placeholder="Description"
                      aria-label={`Description for line ${index + 1}`}
                    />
                  </div>
                  <div className="col-span-4 sm:col-span-1">
                    <Input
                      value={item.quantity}
                      onChange={(e) => updateItem(index, { quantity: e.target.value })}
                      inputMode="numeric"
                      className="tnum text-right"
                      aria-label={`Quantity for line ${index + 1}`}
                    />
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <MoneyInput
                      value={item.unitPrice}
                      onChange={(e) => updateItem(index, { unitPrice: e.target.value })}
                      placeholder="0.00"
                      aria-label={`Unit price for line ${index + 1}`}
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-1 flex items-center justify-end pt-2">
                    <button
                      type="button"
                      aria-label={`Remove line ${index + 1}`}
                      onClick={() => setItems((c) => c.filter((_, i) => i !== index))}
                      className="rounded p-1 text-ink-400 hover:bg-red-50 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <Field label="Notes on the invoice" htmlFor="notes">
              <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
            </Field>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h2 className="mb-3 text-sm font-semibold">Summary</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-600">Subtotal</dt>
                <dd className="tnum">{formatMoney(totals.subtotal, symbol)}</dd>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-600">Discount</dt>
                  <dd className="tnum">- {formatMoney(totals.discount, symbol)}</dd>
                </div>
              )}
              {totals.tax > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-600">{business?.taxLabel ?? "Tax"}</dt>
                  <dd className="tnum">{formatMoney(totals.tax, symbol)}</dd>
                </div>
              )}
              {totals.shipping > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-600">Shipping</dt>
                  <dd className="tnum">{formatMoney(totals.shipping, symbol)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-ink-200 pt-2 text-base font-semibold">
                <dt>Total</dt>
                <dd className="tnum">{formatMoney(totals.total, symbol)}</dd>
              </div>
            </dl>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Field label={`Discount (${symbol})`} htmlFor="discount">
                <MoneyInput id="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="0.00" />
              </Field>
              <Field label={`Shipping (${symbol})`} htmlFor="shipping">
                <MoneyInput id="shipping" value={shipping} onChange={(e) => setShipping(e.target.value)} placeholder="0.00" />
              </Field>
            </div>

            {error && (
              <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
                {error}
              </p>
            )}

            <Button onClick={submit} loading={save.isPending} className="mt-4 w-full">
              <Save className="h-4 w-4" aria-hidden />
              {status === "sent" ? "Create and send" : "Save draft"}
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}

/* --------------------------------------------------------------------- view */

function InvoiceView({ id }: { id: string }) {
  const { data, isLoading, error, refetch } = useInvoice(id);
  const { data: businessData } = useBusiness();
  const toast = useToast();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [voidOpen, setVoidOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [voidReason, setVoidReason] = useState("");
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const business = businessData?.business;
  const symbol = business?.currencySymbol ?? "₦";

  const update = useApiMutation<Record<string, unknown>, unknown>({
    path: `/invoices/${id}`,
    method: "PATCH",
    invalidate: invalidateAll,
  });
  const remove = useApiMutation<Record<string, never>, unknown>({
    path: `/invoices/${id}`,
    method: "DELETE",
    invalidate: invalidateAll,
  });

  if (isLoading) return <Spinner label="Loading invoice" />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data) return null;

  const invoice = data.invoice;
  const editable = invoice.status === "draft" || invoice.status === "sent";

  return (
    <>
      <PageHeader
        title={invoice.number}
        description={`${invoice.customerName} · issued ${formatDateTime(invoice.createdAt)}`}
        actions={
          <>
            <Badge tone={statusTone(invoice.displayStatus)}>{titleCase(invoice.displayStatus)}</Badge>
            <a href={apiUrl(`/invoices/${id}/pdf`)} target="_blank" rel="noreferrer">
              <Button variant="secondary" size="sm">
                <FileDown className="h-4 w-4" aria-hidden />
                PDF
              </Button>
            </a>
            <Button variant="secondary" size="sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4" aria-hidden />
              Print
            </Button>
            {invoice.status === "draft" && (
              <Button
                size="sm"
                loading={update.isPending}
                onClick={() =>
                  update.mutate(
                    { status: "sent" },
                    {
                      onSuccess: () => toast.push("success", "Invoice marked as sent."),
                      onError: (err) => toast.push("error", err instanceof Error ? err.message : "Failed"),
                    },
                  )
                }
              >
                <Send className="h-4 w-4" aria-hidden />
                Mark sent
              </Button>
            )}
            {invoice.status !== "paid" && invoice.status !== "void" && (
              <Button size="sm" onClick={() => setPaymentOpen(true)}>
                Record payment
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={() => setShareOpen(true)}>
              <Share2 className="h-4 w-4" aria-hidden />
              Share
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card className="print-sheet p-5">
            <div className="mb-4 flex flex-wrap justify-between gap-3 border-b border-ink-200 pb-4">
              <div>
                <p className="text-lg font-semibold">{business?.name}</p>
                <p className="text-sm text-ink-500">
                  {[business?.addressLine1, business?.city, business?.state].filter(Boolean).join(", ")}
                </p>
                <p className="text-sm text-ink-500">{[business?.phone, business?.email].filter(Boolean).join(" · ")}</p>
              </div>
              <div className="text-right text-sm">
                <p className="font-mono">{invoice.number}</p>
                <p className="text-ink-500">Issued {formatDateTime(invoice.issueDate)}</p>
                <p className="text-ink-500">Due {formatDateTime(invoice.dueDate)}</p>
              </div>
            </div>

            <Table head={["Description", "Qty", "Unit price", "Amount"]}>
              {data.items.map((item, index) => (
                <tr key={item.id ?? index}>
                  <Td>{item.description}</Td>
                  <Td className="tnum">{item.quantity}</Td>
                  <Td className="tnum">{formatMoney(item.unitPrice, symbol)}</Td>
                  <Td className="tnum text-right font-medium">{formatMoney(item.quantity * item.unitPrice, symbol)}</Td>
                </tr>
              ))}
            </Table>

            <dl className="ml-auto mt-4 w-full max-w-xs space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-600">Subtotal</dt>
                <dd className="tnum">{formatMoney(invoice.subtotal, symbol)}</dd>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-600">Discount</dt>
                  <dd className="tnum">- {formatMoney(invoice.discount, symbol)}</dd>
                </div>
              )}
              {invoice.taxAmount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-600">{business?.taxLabel}</dt>
                  <dd className="tnum">{formatMoney(invoice.taxAmount, symbol)}</dd>
                </div>
              )}
              {invoice.shipping > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-600">Shipping</dt>
                  <dd className="tnum">{formatMoney(invoice.shipping, symbol)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-ink-200 pt-1.5 text-base font-semibold">
                <dt>Total</dt>
                <dd className="tnum">{formatMoney(invoice.total, symbol)}</dd>
              </div>
              {invoice.paidAmount > 0 && (
                <>
                  <div className="flex justify-between text-brand-700">
                    <dt>Paid</dt>
                    <dd className="tnum">- {formatMoney(invoice.paidAmount, symbol)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-ink-200 pt-1.5 font-semibold text-red-700">
                    <dt>Balance due</dt>
                    <dd className="tnum">{formatMoney(invoice.balance, symbol)}</dd>
                  </div>
                </>
              )}
            </dl>

            {(business?.bankAccountNumber || invoice.notes) && (
              <div className="mt-5 grid grid-cols-1 gap-4 border-t border-ink-200 pt-4 text-sm sm:grid-cols-2">
                {business?.bankAccountNumber && (
                  <div>
                    <p className="font-semibold text-ink-700">Payment details</p>
                    <p className="text-ink-600">{business.bankName}</p>
                    <p className="text-ink-600">{business.bankAccountName}</p>
                    <p className="tnum font-mono text-ink-800">{business.bankAccountNumber}</p>
                  </div>
                )}
                {invoice.notes && (
                  <div>
                    <p className="font-semibold text-ink-700">Notes</p>
                    <p className="text-ink-600 whitespace-pre-line">{invoice.notes}</p>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>

        <div className="no-print space-y-4">
          <Card>
            <CardHeader title="Payments" />
            {data.payments.length === 0 ? (
              <p className="px-4 py-3 text-sm text-ink-500">No payments recorded yet.</p>
            ) : (
              <ul className="divide-y divide-ink-100 text-sm">
                {data.payments.map((payment) => (
                  <li key={payment.id} className="flex items-center justify-between gap-2 px-4 py-2.5">
                    <div>
                      <p className="tnum font-medium">{formatMoney(payment.amount, symbol)}</p>
                      <p className="text-xs text-ink-500">
                        {titleCase(payment.method)} · {payment.paidAt}
                        {payment.reference ? ` · ${payment.reference}` : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {data.waybills.length > 0 && (
            <Card>
              <CardHeader title="Linked waybills" />
              <ul className="divide-y divide-ink-100 text-sm">
                {data.waybills.map((waybill) => (
                  <li key={waybill.id} className="flex items-center justify-between px-4 py-2.5">
                    <Link to={`/waybills/${waybill.id}`} className="font-mono text-xs text-brand-700 hover:underline">
                      {waybill.number}
                    </Link>
                    <Badge tone={statusTone(waybill.status)}>{titleCase(waybill.status)}</Badge>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card>
            <CardHeader title="Actions" />
            <div className="flex flex-col gap-2 p-4">
              {editable && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setVoidOpen(true)}
                >
                  Void invoice
                </Button>
              )}
              {invoice.status === "draft" && (
                <Button
                  variant="secondary"
                  size="sm"
                  loading={remove.isPending}
                  onClick={() =>
                    remove.mutate(
                      {},
                      {
                        onSuccess: () => {
                          toast.push("success", "Draft deleted.");
                          window.location.assign("/invoices");
                        },
                        onError: (err) => toast.push("error", err instanceof Error ? err.message : "Failed"),
                      },
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                  Delete draft
                </Button>
              )}
              {invoice.status === "void" && (
                <p className="rounded-lg bg-ink-50 px-3 py-2 text-sm text-ink-600">
                  Voided{invoice.voidReason ? `: ${invoice.voidReason}` : ""}. Stock was returned.
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>

      <Modal open={paymentOpen} onClose={() => setPaymentOpen(false)} title="Record a payment">
        <PaymentDialog invoiceId={id} balance={invoice.balance} onClose={() => setPaymentOpen(false)} />
      </Modal>

      <Modal
        open={voidOpen}
        onClose={() => setVoidOpen(false)}
        title="Void this invoice"
        footer={
          <>
            <Button variant="secondary" onClick={() => setVoidOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              loading={update.isPending}
              onClick={() =>
                update.mutate(
                  { status: "void", voidReason },
                  {
                    onSuccess: () => {
                      toast.push("success", "Invoice voided and stock returned.");
                      setVoidOpen(false);
                    },
                    onError: (err) => toast.push("error", err instanceof Error ? err.message : "Failed"),
                  },
                )
              }
            >
              Void invoice
            </Button>
          </>
        }
      >
        <p className="mb-3 text-sm text-ink-600">
          Voiding keeps the record and its number, returns any stock, and stops it counting towards what you are owed.
        </p>
        <Field label="Reason" htmlFor="void-reason" required>
          <Textarea id="void-reason" value={voidReason} onChange={(e) => setVoidReason(e.target.value)} rows={2} />
        </Field>
      </Modal>

      <Modal open={shareOpen} onClose={() => setShareOpen(false)} title="Share with the customer">
        <p className="mb-3 text-sm text-ink-600">
          Creates a link that shows only this invoice — no login, and it can be revoked at any time.
        </p>
        {shareUrl ? (
          <div className="space-y-2">
            <Input readOnly value={shareUrl} onFocus={(e) => e.currentTarget.select()} />
            <Button
              className="w-full"
              onClick={() => {
                void navigator.clipboard.writeText(shareUrl);
                toast.push("success", "Link copied.");
              }}
            >
              Copy link
            </Button>
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={async () => {
              try {
                const result = await apiFetch<{ url: string }>("/share-links", {
                  method: "POST",
                  body: { entityType: "invoice", entityId: id, expiresInDays: 30 },
                });
                setShareUrl(result.url);
              } catch (err) {
                toast.push("error", err instanceof Error ? err.message : "Could not create the link.");
              }
            }}
          >
            Create link
          </Button>
        )}
      </Modal>
    </>
  );
}
