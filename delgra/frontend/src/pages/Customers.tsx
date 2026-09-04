import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { PageHeader } from "../components/Layout.tsx";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  ErrorState,
  Field,
  Input,
  Modal,
  Select,
  Spinner,
  Table,
  Td,
  Textarea,
  useToast,
} from "../components/ui.tsx";
import { invalidateAll, useApiMutation, useBusiness, useCustomers } from "../api/hooks.ts";
import { formatDate, formatMoney, titleCase } from "../lib/money.ts";
import { useListFilters } from "../lib/filters.ts";
import { Pagination } from "./Invoices.tsx";
import type { Customer } from "../api/types.ts";

interface FormState {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  altPhone: string;
  addressLine1: string;
  city: string;
  state: string;
  rcNumber: string;
  taxId: string;
  customerType: "individual" | "company" | "government";
  notes: string;
  isActive: boolean;
}

const EMPTY: FormState = {
  name: "",
  contactPerson: "",
  email: "",
  phone: "",
  altPhone: "",
  addressLine1: "",
  city: "",
  state: "",
  rcNumber: "",
  taxId: "",
  customerType: "individual",
  notes: "",
  isActive: true,
};

export function CustomersPage() {
  const { filters, setFilter, page, limit, setPage } = useListFilters({ q: "", status: "active" });
  const { data, isLoading, error, refetch } = useCustomers({
    q: filters.q,
    active: filters.status === "active" ? "true" : undefined,
    page,
    limit,
  });
  const { data: businessData } = useBusiness();
  const symbol = businessData?.business.currencySymbol ?? "₦";

  const [editing, setEditing] = useState<Customer | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <>
      <PageHeader
        title="Customers"
        description="Everyone you invoice, with what they owe at a glance."
        actions={
          <Button onClick={() => setCreating(true)}>
            <UserPlus className="h-4 w-4" aria-hidden />
            Add customer
          </Button>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-ink-200 p-3">
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-ink-400" aria-hidden />
            <Input
              value={filters.q ?? ""}
              onChange={(e) => setFilter("q", e.target.value)}
              placeholder="Search name, phone or email…"
              aria-label="Search customers"
              className="pl-9"
            />
          </div>
          <Select
            value={filters.status ?? "active"}
            onChange={(e) => setFilter("status", e.target.value)}
            aria-label="Filter by status"
            className="w-40"
          >
            <option value="active">Active only</option>
            <option value="all">Including inactive</option>
          </Select>
        </div>

        {isLoading ? (
          <Spinner label="Loading customers" />
        ) : error ? (
          <ErrorState error={error} onRetry={() => void refetch()} />
        ) : (data?.data.length ?? 0) === 0 ? (
          <EmptyState
            title="No customers yet"
            description="Add the first one and you can start invoicing straight away."
            action={<Button size="sm" onClick={() => setCreating(true)}>Add customer</Button>}
          />
        ) : (
          <>
            <Table head={["Customer", "Contact", "Type", "Invoices", "Billed", "Outstanding", "Last invoice", ""]}>
              {data!.data.map((customer) => (
                <tr key={customer.id} className="hover:bg-ink-50">
                  <Td>
                    <p className="font-medium">{customer.name}</p>
                    {customer.city && <p className="text-xs text-ink-500">{[customer.city, customer.state].filter(Boolean).join(", ")}</p>}
                  </Td>
                  <Td className="text-ink-600">
                    {customer.contactPerson && <p>{customer.contactPerson}</p>}
                    <p className="text-xs">{customer.phone ?? customer.email ?? "—"}</p>
                  </Td>
                  <Td>{titleCase(customer.customerType)}</Td>
                  <Td className="tnum">{customer.stats.invoiceCount}</Td>
                  <Td className="tnum">{formatMoney(customer.stats.billed, symbol)}</Td>
                  <Td className={`tnum ${customer.stats.outstanding > 0 ? "font-semibold text-red-700" : "text-ink-500"}`}>
                    {formatMoney(customer.stats.outstanding, symbol)}
                  </Td>
                  <Td className="text-ink-600 whitespace-nowrap">{formatDate(customer.stats.lastInvoiceDate)}</Td>
                  <Td className="text-right">
                    {!customer.isActive ? (
                      <Badge>Inactive</Badge>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditing(customer)}
                        className="text-sm font-medium text-brand-700 hover:underline"
                      >
                        Edit
                      </button>
                    )}
                  </Td>
                </tr>
              ))}
            </Table>
            <Pagination page={data!.meta.page} totalPages={data!.meta.totalPages} total={data!.meta.total} onPage={setPage} />
          </>
        )}
      </Card>

      <Modal
        open={creating || editing !== null}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
        title={editing ? "Edit customer" : "Add customer"}
      >
        <CustomerForm
          key={editing?.id ?? "new"}
          initial={editing ? toForm(editing) : EMPTY}
          onDone={() => {
            setCreating(false);
            setEditing(null);
          }}
          customerId={editing?.id}
        />
      </Modal>
    </>
  );
}

function toForm(customer: Customer): FormState {
  return {
    name: customer.name,
    contactPerson: customer.contactPerson ?? "",
    email: customer.email ?? "",
    phone: customer.phone ?? "",
    altPhone: customer.altPhone ?? "",
    addressLine1: customer.addressLine1 ?? "",
    city: customer.city ?? "",
    state: customer.state ?? "",
    rcNumber: customer.rcNumber ?? "",
    taxId: customer.taxId ?? "",
    customerType: customer.customerType,
    notes: customer.notes ?? "",
    isActive: customer.isActive,
  };
}

function CustomerForm({
  initial,
  onDone,
  customerId,
}: {
  initial: FormState;
  onDone: () => void;
  customerId?: string;
}) {
  const toast = useToast();
  const [form, setForm] = useState<FormState>(initial);
  const save = useApiMutation<Record<string, unknown>, unknown>({
    path: customerId ? `/customers/${customerId}` : "/customers",
    method: customerId ? "PATCH" : "POST",
    invalidate: invalidateAll,
    idempotent: !customerId,
  });

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        save.mutate(
          { ...form },
          {
            onSuccess: () => {
              toast.push("success", customerId ? "Customer updated." : "Customer added.");
              onDone();
            },
            onError: (err) => toast.push("error", err instanceof Error ? err.message : "Could not save."),
          },
        );
      }}
    >
      <Field label="Name" htmlFor="c-name" required>
        <Input id="c-name" value={form.name} onChange={(e) => set("name", e.target.value)} required />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Contact person" htmlFor="c-contact">
          <Input id="c-contact" value={form.contactPerson} onChange={(e) => set("contactPerson", e.target.value)} />
        </Field>
        <Field label="Type" htmlFor="c-type">
          <Select
            id="c-type"
            value={form.customerType}
            onChange={(e) => set("customerType", e.target.value as FormState["customerType"])}
          >
            <option value="individual">Individual</option>
            <option value="company">Company</option>
            <option value="government">Government</option>
          </Select>
        </Field>
        <Field label="Email" htmlFor="c-email">
          <Input id="c-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field label="Phone" htmlFor="c-phone">
          <Input id="c-phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        </Field>
        <Field label="Alt. phone" htmlFor="c-alt">
          <Input id="c-alt" value={form.altPhone} onChange={(e) => set("altPhone", e.target.value)} />
        </Field>
        <Field label="RC number" htmlFor="c-rc">
          <Input id="c-rc" value={form.rcNumber} onChange={(e) => set("rcNumber", e.target.value)} />
        </Field>
      </div>
      <Field label="Address" htmlFor="c-addr">
        <Input id="c-addr" value={form.addressLine1} onChange={(e) => set("addressLine1", e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="City" htmlFor="c-city">
          <Input id="c-city" value={form.city} onChange={(e) => set("city", e.target.value)} />
        </Field>
        <Field label="State" htmlFor="c-state">
          <Input id="c-state" value={form.state} onChange={(e) => set("state", e.target.value)} />
        </Field>
      </div>
      <Field label="Notes" htmlFor="c-notes">
        <Textarea id="c-notes" value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={2} />
      </Field>
      {customerId && (
        <label className="flex items-center gap-2 text-sm text-ink-700">
          <input type="checkbox" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)} />
          Active
        </label>
      )}
      <Button type="submit" loading={save.isPending} className="w-full">
        {customerId ? "Save changes" : "Add customer"}
      </Button>
    </form>
  );
}
