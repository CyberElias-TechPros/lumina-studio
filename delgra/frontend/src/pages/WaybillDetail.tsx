import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { FileDown, MapPin, Printer, Upload } from "lucide-react";
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
  Spinner,
  Table,
  Td,
  statusTone,
  useToast,
} from "../components/ui.tsx";
import { invalidateAll, useApiMutation, useBusiness, useDocuments, useWaybill } from "../api/hooks.ts";
import { apiFetch, apiUrl } from "../api/client.ts";
import { formatDate, formatDateTime, formatMoney, titleCase } from "../lib/money.ts";

/**
 * Mirrors `WAYBILL_TRANSITIONS` in the Worker's `lib/totals.ts`.
 *
 * The server is the authority — it re-checks every move — but the UI offers only
 * legal next states so a click cannot produce a 409.
 */
const NEXT: Record<string, string[]> = {
  pending: ["in_transit", "cancelled"],
  in_transit: ["delivered", "exception", "cancelled"],
  exception: ["in_transit", "delivered", "cancelled"],
  delivered: [],
  cancelled: ["pending"],
};

export function WaybillDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data, isLoading, error, refetch } = useWaybill(id);
  const documents = useDocuments("waybill", id);
  const { data: businessData } = useBusiness();
  const toast = useToast();
  const [note, setNote] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);

  const changeStatus = useApiMutation<{ status: string; note?: string }, unknown>({
    path: `/waybills/${id}/status`,
    invalidate: invalidateAll,
  });

  if (isLoading) return <Spinner label="Loading waybill" />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data) return null;

  const waybill = data.waybill;
  const business = businessData?.business;
  const symbol = business?.currencySymbol ?? "₦";
  const transitions = NEXT[waybill.status] ?? [];

  function move(next: string) {
    changeStatus.mutate(
      { status: next, note: note || undefined },
      {
        onSuccess: () => {
          toast.push("success", `Marked ${titleCase(next)}.`);
          setNote("");
        },
        onError: (err) => toast.push("error", err instanceof Error ? err.message : "Could not update the waybill."),
      },
    );
  }

  return (
    <>
      <PageHeader
        title={waybill.number}
        description={`${waybill.customerName} · dated ${formatDate(waybill.waybillDate)}`}
        actions={
          <>
            <Badge tone={statusTone(waybill.status)}>{titleCase(waybill.status)}</Badge>
            <a href={apiUrl(`/waybills/${id}/pdf`)} target="_blank" rel="noreferrer">
              <Button variant="secondary" size="sm">
                <FileDown className="h-4 w-4" aria-hidden />
                PDF
              </Button>
            </a>
            <Button variant="secondary" size="sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4" aria-hidden />
              Print
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="print-sheet p-5 lg:col-span-2">
          <div className="mb-4 flex flex-wrap justify-between gap-3 border-b border-ink-200 pb-4 text-sm">
            <div>
              <p className="text-lg font-semibold">{business?.name}</p>
              <p className="text-ink-500">Waybill / consignment note</p>
            </div>
            <div className="text-right">
              <p className="font-mono">{waybill.number}</p>
              <p className="text-ink-500">Dated {formatDate(waybill.waybillDate)}</p>
              {waybill.deliveredAt && <p className="text-ink-500">Delivered {formatDateTime(waybill.deliveredAt)}</p>}
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="font-semibold text-ink-700">Customer</p>
              <p>{waybill.customerName}</p>
            </div>
            <div>
              <p className="font-semibold text-ink-700">Receiver</p>
              <p className="text-ink-600">{waybill.receiverName ?? "—"}</p>
              {waybill.receiverPhone && <p className="text-ink-500">{waybill.receiverPhone}</p>}
            </div>
            <div>
              <p className="font-semibold text-ink-700">Origin</p>
              <p className="text-ink-600 whitespace-pre-line">{waybill.origin || business?.addressLine1 || "—"}</p>
            </div>
            <div>
              <p className="flex items-center gap-1 font-semibold text-ink-700">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                Destination
              </p>
              <p className="text-ink-600 whitespace-pre-line">{waybill.destination || "—"}</p>
            </div>
            <div>
              <p className="font-semibold text-ink-700">Carrier</p>
              <p className="text-ink-600">{waybill.carrier || "In-house"}</p>
              {waybill.trackingNumber && <p className="text-ink-500">Tracking {waybill.trackingNumber}</p>}
            </div>
            <div>
              <p className="font-semibold text-ink-700">Pieces</p>
              <p className="tnum text-ink-600">{waybill.pieces}</p>
              {waybill.charges > 0 && (
                <p className="text-ink-500">
                  {formatMoney(waybill.charges, symbol)} · paid by {waybill.chargesPaidBy}
                </p>
              )}
            </div>
          </div>

          <Table head={["Item", "Serial", "Weight", "Qty"]}>
            {data.items.map((item, index) => (
              <tr key={item.id ?? index}>
                <Td>
                  {item.description}
                  {item.note && <span className="block text-xs text-ink-500">{item.note}</span>}
                </Td>
                <Td className="font-mono text-xs">{item.serialNumber ?? "—"}</Td>
                <Td className="tnum">{item.weightKg != null ? `${item.weightKg} kg` : "—"}</Td>
                <Td className="tnum">{item.quantity}</Td>
              </tr>
            ))}
          </Table>

          {waybill.notes && (
            <div className="mt-4 border-t border-ink-200 pt-3 text-sm">
              <p className="font-semibold text-ink-700">Notes</p>
              <p className="text-ink-600 whitespace-pre-line">{waybill.notes}</p>
            </div>
          )}

          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-ink-200 pt-6 text-xs text-ink-500">
            <div>
              <div className="mb-2 h-8 border-b border-ink-300" />
              <p>Received by (name &amp; signature)</p>
            </div>
            <div>
              <div className="mb-2 h-8 border-b border-ink-300" />
              <p>Dispatched by</p>
            </div>
          </div>
        </Card>

        <div className="no-print space-y-4">
          <Card>
            <CardHeader title="Status" subtitle="Delivered waybills are final." />
            <div className="space-y-3 p-4">
              <Field label="Note for this update" htmlFor="wb-note">
                <Input
                  id="wb-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Left with site security"
                />
              </Field>
              <div className="flex flex-wrap gap-2">
                {transitions.length === 0 && <p className="text-sm text-ink-500">No further changes.</p>}
                {transitions.map((next) => (
                  <Button
                    key={next}
                    size="sm"
                    variant={next === "cancelled" ? "danger" : "secondary"}
                    loading={changeStatus.isPending}
                    onClick={() => move(next)}
                  >
                    Mark {titleCase(next)}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Documents"
              action={
                <Button size="sm" variant="secondary" onClick={() => setUploadOpen(true)}>
                  <Upload className="h-4 w-4" aria-hidden />
                  Upload
                </Button>
              }
            />
            <div className="p-4">
              {documents.isLoading ? (
                <Spinner label="" />
              ) : (documents.data?.data.length ?? 0) === 0 ? (
                <p className="text-sm text-ink-500">Nothing attached yet.</p>
              ) : (
                <ul className="divide-y divide-ink-100 text-sm">
                  {documents.data!.data.map((doc) => (
                    <li key={doc.id} className="flex items-center justify-between gap-2 py-2">
                      <span className="min-w-0 truncate text-ink-700">{doc.filename}</span>
                      <a
                        href={apiUrl(`/documents/${doc.id}/download`)}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 shrink-0 text-brand-700 hover:underline"
                      >
                        Open
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>

          {waybill.invoiceNumber && (
            <Card>
              <CardHeader title="Linked invoice" />
              <div className="p-4">
                <Link to={`/invoices/${waybill.invoiceId}`} className="font-mono text-sm text-brand-700 hover:underline">
                  {waybill.invoiceNumber}
                </Link>
              </div>
            </Card>
          )}

          <Card>
            <CardHeader title="Record" />
            <dl className="divide-y divide-ink-100 text-sm">
              <div className="flex justify-between px-4 py-2.5">
                <dt className="text-ink-600">Created</dt>
                <dd>{formatDateTime(waybill.createdAt)}</dd>
              </div>
              <div className="flex justify-between px-4 py-2.5">
                <dt className="text-ink-600">Created by</dt>
                <dd>{waybill.createdByName ?? "—"}</dd>
              </div>
              <div className="flex justify-between px-4 py-2.5">
                <dt className="text-ink-600">Last updated</dt>
                <dd>{formatDateTime(waybill.updatedAt)}</dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>

      <Modal open={uploadOpen} onClose={() => setUploadOpen(false)} title="Attach a document">
        <UploadForm entityId={id} entityType="waybill" onDone={() => setUploadOpen(false)} />
      </Modal>
    </>
  );
}

/**
 * Multipart upload to `POST /v1/documents`.
 *
 * The Worker validates the MIME type against an allowlist and picks the stored
 * extension itself, so the browser's guess is never trusted.
 */
export function UploadForm({
  entityId,
  entityType,
  onDone,
}: {
  entityId: string;
  entityType: "invoice" | "waybill" | "purchase" | "expense" | "product" | "business";
  onDone: () => void;
}) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="space-y-3"
      onSubmit={async (event) => {
        event.preventDefault();
        if (!file) return;
        const body = new FormData();
        body.append("file", file);
        body.append("entityType", entityType);
        body.append("entityId", entityId);
        setBusy(true);
        try {
          await apiFetch("/documents", { method: "POST", body });
          await queryClient.invalidateQueries({ queryKey: ["documents", entityType, entityId] });
          toast.push("success", "Attached.");
          onDone();
        } catch (err) {
          toast.push("error", err instanceof Error ? err.message : "Upload failed.");
        } finally {
          setBusy(false);
        }
      }}
    >
      <Field label="File" htmlFor="upload-file" hint="PDF, PNG, JPEG, WebP, CSV or Office — up to 10 MB.">
        <Input
          id="upload-file"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp,.csv,.xlsx,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          required
        />
      </Field>
      <Button type="submit" loading={busy} className="w-full">
        Upload
      </Button>
    </form>
  );
}
