import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { PageHeader } from "../components/Layout.tsx";
import { Button, Card, EmptyState, ErrorState, Field, Input, Modal, MoneyInput, Select, Spinner, Table, Td, useToast } from "../components/ui.tsx";
import { invalidateAll, useApiMutation, useBusiness, useExpenseCategories, useExpenses } from "../api/hooks.ts";
import { formatDate, formatMoney, parseAmountToKobo, titleCase, todayIso } from "../lib/money.ts";
import { useListFilters } from "../lib/filters.ts";
import { Pagination } from "./Invoices.tsx";

const METHODS = ["transfer", "cash", "card", "pos", "cheque", "mobile", "other"];

export function ExpensesPage() {
  const { filters, setFilter, page, limit, setPage } = useListFilters({ q: "", category: "", from: "", to: "" });
  const { data, isLoading, error, refetch } = useExpenses({
    q: filters.q, category: filters.category, from: filters.from, to: filters.to, page, limit,
  });
  const categories = useExpenseCategories();
  const { data: businessData } = useBusiness();
  const symbol = businessData?.business.currencySymbol ?? "₦";
  const [creating, setCreating] = useState(false);

  return (
    <>
      <PageHeader title="Expenses" description="Running costs, so the profit report tells the truth."
        actions={<Button onClick={() => setCreating(true)}><Plus className="h-4 w-4" aria-hidden />Add expense</Button>} />

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-ink-200 p-3">
          <div className="relative min-w-52 flex-1">
            <Search className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-ink-400" aria-hidden />
            <Input value={filters.q ?? ""} onChange={(e) => setFilter("q", e.target.value)}
              placeholder="Search description or reference…" aria-label="Search expenses" className="pl-9" />
          </div>
          <Select value={filters.category ?? ""} onChange={(e) => setFilter("category", e.target.value)} aria-label="Filter by category" className="w-40">
            <option value="">All categories</option>
            {(categories.data?.categories ?? []).map((c) => (<option key={c.name} value={c.name}>{titleCase(c.name)}</option>))}
          </Select>
          <Input type="date" value={filters.from ?? ""} onChange={(e) => setFilter("from", e.target.value)} aria-label="From date" className="w-36" />
          <Input type="date" value={filters.to ?? ""} onChange={(e) => setFilter("to", e.target.value)} aria-label="To date" className="w-36" />
        </div>

        {isLoading ? <Spinner label="Loading expenses" /> : error ? (
          <ErrorState error={error} onRetry={() => void refetch()} />
        ) : (data?.data.length ?? 0) === 0 ? (
          <EmptyState title="No expenses here" description="Record fuel, rent, repairs and the rest to see real margins."
            action={<Button size="sm" onClick={() => setCreating(true)}>Add expense</Button>} />
        ) : (
          <>
            <Table head={["Date", "Category", "Description", "Method", "Reference", "Amount"]}>
              {data!.data.map((expense) => (
                <tr key={expense.id} className="hover:bg-ink-50">
                  <Td className="text-ink-600 whitespace-nowrap">{formatDate(expense.expenseDate)}</Td>
                  <Td>{titleCase(expense.category)}</Td>
                  <Td>
                    <p className="font-medium">{expense.description}</p>
                    {expense.supplierName && <p className="text-xs text-ink-500">{expense.supplierName}</p>}
                  </Td>
                  <Td className="text-ink-600">{titleCase(expense.paymentMethod)}</Td>
                  <Td className="text-ink-500">{expense.reference ?? "—"}</Td>
                  <Td className="tnum font-medium">{formatMoney(expense.amount, symbol)}</Td>
                </tr>
              ))}
            </Table>
            <div className="flex items-center justify-between border-t border-ink-200 px-4 py-2.5 text-sm">
              <p className="font-semibold">Filtered total</p>
              <p className="tnum font-semibold">{formatMoney(data!.totals.amount, symbol)}</p>
            </div>
            <Pagination page={data!.meta.page} totalPages={data!.meta.totalPages} total={data!.meta.total} onPage={setPage} />
          </>
        )}
      </Card>

      <Modal open={creating} onClose={() => setCreating(false)} title="Add expense">
        <ExpenseForm categories={(categories.data?.categories ?? []).map((c) => c.name)} onDone={() => setCreating(false)} />
      </Modal>
    </>
  );
}

function ExpenseForm({ categories, onDone }: { categories: string[]; onDone: () => void }) {
  const toast = useToast();
  const [expenseDate, setExpenseDate] = useState(todayIso());
  const [category, setCategory] = useState(categories[0] ?? "other");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [reference, setReference] = useState("");

  const save = useApiMutation<Record<string, unknown>, unknown>({
    path: "/expenses", invalidate: invalidateAll, idempotent: true,
  });

  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault();
      const kobo = parseAmountToKobo(amount);
      if (kobo === null || kobo <= 0) { toast.push("error", "Enter an amount greater than zero."); return; }
      save.mutate({ expenseDate, category, description, amount: kobo, paymentMethod, reference }, {
        onSuccess: () => { toast.push("success", "Expense recorded."); onDone(); },
        onError: (err) => toast.push("error", err instanceof Error ? err.message : "Could not save."),
      });
    }}>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date" htmlFor="e-date" required>
          <Input id="e-date" type="date" value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} required />
        </Field>
        <Field label="Category" htmlFor="e-cat" required>
          <Select id="e-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (<option key={c} value={c}>{titleCase(c)}</option>))}
          </Select>
        </Field>
      </div>
      <Field label="Description" htmlFor="e-desc" required>
        <Input id="e-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Diesel for Ikeja delivery" required />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Amount (₦)" htmlFor="e-amount" required>
          <MoneyInput id="e-amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </Field>
        <Field label="Method" htmlFor="e-method">
          <Select id="e-method" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            {METHODS.map((m) => (<option key={m} value={m}>{titleCase(m)}</option>))}
          </Select>
        </Field>
      </div>
      <Field label="Reference" htmlFor="e-ref"><Input id="e-ref" value={reference} onChange={(e) => setReference(e.target.value)} /></Field>
      <Button type="submit" loading={save.isPending} className="w-full">Add expense</Button>
    </form>
  );
}
