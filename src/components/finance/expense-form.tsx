import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pnlCsvHref } from "@/lib/api/finance";
import { useRecordExpense } from "@/lib/query/finance";
import { ApiError } from "@/lib/errors";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Rent",
  "Power & generator",
  "Internet & data",
  "Training materials",
  "Instructor fees",
  "Marketing",
  "Transport",
  "Bank charges",
  "Software & subscriptions",
  "Maintenance",
  "Other",
] as const;

const METHODS = ["transfer", "cash", "card", "paystack", "other"] as const;

/**
 * One-line expense entry for the ledger the monthly P&L reads.
 *
 * Kept deliberately short — the operator types this between classes, so the
 * defaults (today, transfer) carry the common case.
 */
export function ExpenseForm({ onDone }: { onDone?: () => void }) {
  const record = useRecordExpense();
  const [spentOn, setSpentOn] = useState(() => new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [amount, setAmount] = useState("");
  const [vendor, setVendor] = useState("");
  const [description, setDescription] = useState("");
  const [method, setMethod] = useState<(typeof METHODS)[number]>("transfer");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const inputClass =
    "border-input bg-background focus-visible:ring-ring mt-1 w-full rounded-lg border px-3 py-2 text-sm focus-visible:ring-1 focus-visible:outline-none";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      setError("Enter the amount in naira, e.g. 25000.");
      return;
    }
    record.mutate(
      {
        spentOn,
        category,
        amount: value,
        vendor: vendor || undefined,
        description: description || undefined,
        method,
      },
      {
        onSuccess: () => {
          setAmount("");
          setVendor("");
          setDescription("");
          setNotice("Recorded — it now shows in the ledger and the monthly P&L.");
          onDone?.();
        },
        onError: (err) =>
          setError(err instanceof ApiError ? err.message : "Could not record the expense."),
      },
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-medium">
          Date
          <input
            required
            type="date"
            value={spentOn}
            onChange={(e) => setSpentOn(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="text-xs font-medium">
          Amount (₦)
          <input
            required
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="25000"
            className={inputClass}
          />
        </label>
        <label className="text-xs font-medium">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-medium">
          Paid by
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as (typeof METHODS)[number])}
            className={inputClass}
          >
            {METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-medium">
          Paid to (optional)
          <input
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            placeholder="e.g. PHED, MTN, landlord"
            className={inputClass}
          />
        </label>
        <label className="text-xs font-medium">
          Note (optional)
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. diesel for the generator"
            className={inputClass}
          />
        </label>
      </div>
      {error && <p className="text-error text-xs">{error}</p>}
      {notice && <p className="text-success text-xs">{notice}</p>}
      <Button type="submit" size="sm" className="font-semibold" disabled={record.isPending}>
        {record.isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Plus className="size-4" />
        )}
        Record expense
      </Button>
    </form>
  );
}

/** Month picker + CSV download for the P&L the accountant files each month. */
export function PnlDownload({ className }: { className?: string }) {
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  return (
    <div className={cn("flex flex-wrap items-end gap-2", className)}>
      <label className="text-xs font-medium">
        Month
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border-input bg-background focus-visible:ring-ring mt-1 block rounded-lg border px-3 py-2 text-sm focus-visible:ring-1 focus-visible:outline-none"
        />
      </label>
      <Button asChild size="sm" className="font-semibold">
        <a href={pnlCsvHref(month)} download>
          Download P&L (CSV)
        </a>
      </Button>
    </div>
  );
}
