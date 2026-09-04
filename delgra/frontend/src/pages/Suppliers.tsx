import { useState } from "react";
import { Search, Truck } from "lucide-react";
import { PageHeader } from "../components/Layout.tsx";
import { Badge, Button, Card, EmptyState, ErrorState, Field, Input, Modal, Select, Spinner, Table, Td, Textarea, useToast } from "../components/ui.tsx";
import { invalidateAll, useApiMutation, useBusiness, useSuppliers } from "../api/hooks.ts";
import { formatDate, formatMoney } from "../lib/money.ts";
import { useListFilters } from "../lib/filters.ts";
import { Pagination } from "./Invoices.tsx";
import type { Supplier } from "../api/types.ts";

interface FormState {
  name: string; contactPerson: string; email: string; phone: string;
  addressLine1: string; city: string; state: string; notes: string; isActive: boolean;
}

const EMPTY: FormState = { name: "", contactPerson: "", email: "", phone: "", addressLine1: "", city: "", state: "", notes: "", isActive: true };

export function SuppliersPage() {
  const { filters, setFilter, page, limit, setPage } = useListFilters({ q: "", status: "active" });
  const { data, isLoading, error, refetch } = useSuppliers({
    q: filters.q, active: filters.status === "active" ? "true" : undefined, page, limit,
  });
  const { data: businessData } = useBusiness();
  const symbol = businessData?.business.currencySymbol ?? "₦";
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <>
      <PageHeader title="Suppliers" description="Where you buy used equipment from, and what you still owe them."
        actions={<Button onClick={() => setCreating(true)}><Truck className="h-4 w-4" aria-hidden />Add supplier</Button>} />

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-ink-200 p-3">
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-ink-400" aria-hidden />
            <Input value={filters.q ?? ""} onChange={(e) => setFilter("q", e.target.value)}
              placeholder="Search name, phone or email…" aria-label="Search suppliers" className="pl-9" />
          </div>
          <Select value={filters.status ?? "active"} onChange={(e) => setFilter("status", e.target.value)} aria-label="Filter by status" className="w-40">
            <option value="active">Active only</option>
            <option value="all">Including inactive</option>
          </Select>
        </div>

        {isLoading ? <Spinner label="Loading suppliers" /> : error ? (
          <ErrorState error={error} onRetry={() => void refetch()} />
        ) : (data?.data.length ?? 0) === 0 ? (
          <EmptyState title="No suppliers yet" description="Add the vendors you buy stock from."
            action={<Button size="sm" onClick={() => setCreating(true)}>Add supplier</Button>} />
        ) : (
          <>
            <Table head={["Supplier", "Contact", "Location", "Purchases", "Spent", "Owed", "Last order", ""]}>
              {data!.data.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-ink-50">
                  <Td className="font-medium">{supplier.name}</Td>
                  <Td className="text-ink-600">
                    {supplier.contactPerson && <p>{supplier.contactPerson}</p>}
                    <p className="text-xs">{supplier.phone ?? supplier.email ?? "—"}</p>
                  </Td>
                  <Td className="text-ink-600">{[supplier.city, supplier.state].filter(Boolean).join(", ") || "—"}</Td>
                  <Td className="tnum">{supplier.stats.purchaseCount}</Td>
                  <Td className="tnum">{formatMoney(supplier.stats.spent, symbol)}</Td>
                  <Td className={`tnum ${supplier.stats.owed > 0 ? "font-semibold text-red-700" : "text-ink-500"}`}>
                    {formatMoney(supplier.stats.owed, symbol)}
                  </Td>
                  <Td className="text-ink-600 whitespace-nowrap">{formatDate(supplier.stats.lastOrderDate)}</Td>
                  <Td className="text-right">
                    {!supplier.isActive ? <Badge>Inactive</Badge> : (
                      <button type="button" onClick={() => setEditing(supplier)} className="text-sm font-medium text-brand-700 hover:underline">Edit</button>
                    )}
                  </Td>
                </tr>
              ))}
            </Table>
            <Pagination page={data!.meta.page} totalPages={data!.meta.totalPages} total={data!.meta.total} onPage={setPage} />
          </>
        )}
      </Card>

      <Modal open={creating || editing !== null} onClose={() => { setCreating(false); setEditing(null); }}
        title={editing ? "Edit supplier" : "Add supplier"}>
        <SupplierForm key={editing?.id ?? "new"}
          initial={editing ? {
            name: editing.name, contactPerson: editing.contactPerson ?? "", email: editing.email ?? "",
            phone: editing.phone ?? "", addressLine1: "", city: editing.city ?? "", state: editing.state ?? "",
            notes: "", isActive: editing.isActive,
          } : EMPTY}
          supplierId={editing?.id}
          onDone={() => { setCreating(false); setEditing(null); }} />
      </Modal>
    </>
  );
}

function SupplierForm({ initial, onDone, supplierId }: { initial: FormState; onDone: () => void; supplierId?: string }) {
  const toast = useToast();
  const [form, setForm] = useState<FormState>(initial);
  const save = useApiMutation<Record<string, unknown>, unknown>({
    path: supplierId ? `/suppliers/${supplierId}` : "/suppliers",
    method: supplierId ? "PATCH" : "POST",
    invalidate: invalidateAll,
    idempotent: !supplierId,
  });
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((c) => ({ ...c, [key]: value }));

  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault();
      save.mutate({ ...form }, {
        onSuccess: () => { toast.push("success", supplierId ? "Supplier updated." : "Supplier added."); onDone(); },
        onError: (err) => toast.push("error", err instanceof Error ? err.message : "Could not save."),
      });
    }}>
      <Field label="Name" htmlFor="s-name" required><Input id="s-name" value={form.name} onChange={(e) => set("name", e.target.value)} required /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Contact person" htmlFor="s-contact"><Input id="s-contact" value={form.contactPerson} onChange={(e) => set("contactPerson", e.target.value)} /></Field>
        <Field label="Phone" htmlFor="s-phone"><Input id="s-phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
        <Field label="Email" htmlFor="s-email"><Input id="s-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="City" htmlFor="s-city"><Input id="s-city" value={form.city} onChange={(e) => set("city", e.target.value)} /></Field>
      </div>
      <Field label="Address" htmlFor="s-addr"><Input id="s-addr" value={form.addressLine1} onChange={(e) => set("addressLine1", e.target.value)} /></Field>
      <Field label="Notes" htmlFor="s-notes"><Textarea id="s-notes" value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={2} /></Field>
      {supplierId && (
        <label className="flex items-center gap-2 text-sm text-ink-700">
          <input type="checkbox" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)} />Active
        </label>
      )}
      <Button type="submit" loading={save.isPending} className="w-full">{supplierId ? "Save changes" : "Add supplier"}</Button>
    </form>
  );
}
