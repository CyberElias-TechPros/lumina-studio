import { useState } from "react";
import { PackagePlus, Search, SlidersHorizontal } from "lucide-react";
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
  MoneyInput,
  Select,
  Spinner,
  Table,
  Td,
  Textarea,
  statusTone,
  useToast,
} from "../components/ui.tsx";
import { invalidateAll, useApiMutation, useBusiness, useProducts } from "../api/hooks.ts";
import { formatMoney, koboToInput, parseAmountToKobo, titleCase } from "../lib/money.ts";
import { useListFilters } from "../lib/filters.ts";
import { Pagination } from "./Invoices.tsx";
import type { Product } from "../api/types.ts";

const GRADES = ["new", "grade_a", "grade_b", "grade_c", "grade_d"] as const;

interface FormState {
  sku: string;
  name: string;
  description: string;
  category: string;
  conditionGrade: (typeof GRADES)[number];
  unit: string;
  costPrice: string;
  salePrice: string;
  quantity: string;
  reorderLevel: string;
  trackStock: boolean;
  isActive: boolean;
}

const EMPTY: FormState = {
  sku: "",
  name: "",
  description: "",
  category: "",
  conditionGrade: "grade_a",
  unit: "unit",
  costPrice: "",
  salePrice: "",
  quantity: "0",
  reorderLevel: "1",
  trackStock: true,
  isActive: true,
};

export function ProductsPage() {
  const { filters, setFilter, page, limit, setPage } = useListFilters({ q: "", filter: "" });
  const { data, isLoading, error, refetch } = useProducts({
    q: filters.q,
    filter: filters.filter,
    page,
    limit,
  });
  const { data: businessData } = useBusiness();
  const symbol = businessData?.business.currencySymbol ?? "₦";

  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [stockFor, setStockFor] = useState<Product | null>(null);

  return (
    <>
      <PageHeader
        title="Stock"
        description="Used equipment you buy, grade, hold and resell."
        actions={
          <Button onClick={() => setCreating(true)}>
            <PackagePlus className="h-4 w-4" aria-hidden />
            Add item
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
              placeholder="Search name, SKU or description…"
              aria-label="Search stock"
              className="pl-9"
            />
          </div>
          <Select
            value={filters.filter ?? ""}
            onChange={(e) => setFilter("filter", e.target.value)}
            aria-label="Filter by stock level"
            className="w-44"
          >
            <option value="">All stock</option>
            <option value="low">At or below reorder level</option>
            <option value="out">Out of stock</option>
          </Select>
        </div>

        {isLoading ? (
          <Spinner label="Loading stock" />
        ) : error ? (
          <ErrorState error={error} onRetry={() => void refetch()} />
        ) : (data?.data.length ?? 0) === 0 ? (
          <EmptyState
            title="No stock items"
            description="Add the equipment you hold so invoicing can move quantities for you."
            action={<Button size="sm" onClick={() => setCreating(true)}>Add item</Button>}
          />
        ) : (
          <>
            <Table head={["SKU", "Item", "Grade", "Qty", "Cost", "Sale price", "Stock value", ""]}>
              {data!.data.map((product) => (
                <tr key={product.id} className="hover:bg-ink-50">
                  <Td className="font-mono text-xs">{product.sku}</Td>
                  <Td>
                    <p className="font-medium">{product.name}</p>
                    {product.category && <p className="text-xs text-ink-500">{product.category}</p>}
                  </Td>
                  <Td>{titleCase(product.conditionGrade)}</Td>
                  <Td>
                    {product.trackStock ? (
                      <Badge tone={product.outOfStock ? "red" : product.lowStock ? "amber" : "green"}>
                        <span className="tnum">{product.quantity}</span>
                      </Badge>
                    ) : (
                      <Badge tone={statusTone("draft")}>Untracked</Badge>
                    )}
                  </Td>
                  <Td className="tnum text-ink-600">{formatMoney(product.costPrice, symbol)}</Td>
                  <Td className="tnum">{formatMoney(product.salePrice, symbol)}</Td>
                  <Td className="tnum text-ink-600">{formatMoney(product.stockValue, symbol)}</Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-2">
                      {product.trackStock && (
                        <button
                          type="button"
                          onClick={() => setStockFor(product)}
                          className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline"
                        >
                          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
                          Stock
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setEditing(product)}
                        className="text-sm font-medium text-brand-700 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
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
        title={editing ? "Edit item" : "Add item"}
      >
        <ProductForm
          key={editing?.id ?? "new"}
          initial={editing ? toForm(editing) : EMPTY}
          productId={editing?.id}
          onDone={() => {
            setCreating(false);
            setEditing(null);
          }}
        />
      </Modal>

      <Modal open={stockFor !== null} onClose={() => setStockFor(null)} title={`Adjust stock — ${stockFor?.name ?? ""}`}>
        {stockFor && <StockForm product={stockFor} onDone={() => setStockFor(null)} />}
      </Modal>
    </>
  );
}

function toForm(product: Product): FormState {
  return {
    sku: product.sku,
    name: product.name,
    description: product.description ?? "",
    category: product.category ?? "",
    conditionGrade: product.conditionGrade,
    unit: product.unit,
    costPrice: koboToInput(product.costPrice),
    salePrice: koboToInput(product.salePrice),
    quantity: String(product.quantity),
    reorderLevel: String(product.reorderLevel),
    trackStock: product.trackStock,
    isActive: product.isActive,
  };
}

function ProductForm({
  initial,
  onDone,
  productId,
}: {
  initial: FormState;
  onDone: () => void;
  productId?: string;
}) {
  const toast = useToast();
  const [form, setForm] = useState<FormState>(initial);
  const save = useApiMutation<Record<string, unknown>, unknown>({
    path: productId ? `/products/${productId}` : "/products",
    method: productId ? "PATCH" : "POST",
    invalidate: invalidateAll,
    idempotent: !productId,
  });

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        save.mutate(
          {
            ...form,
            costPrice: parseAmountToKobo(form.costPrice) ?? 0,
            salePrice: parseAmountToKobo(form.salePrice) ?? 0,
            quantity: Number.parseInt(form.quantity, 10) || 0,
            reorderLevel: Number.parseInt(form.reorderLevel, 10) || 0,
          },
          {
            onSuccess: () => {
              toast.push("success", productId ? "Item updated." : "Item added.");
              onDone();
            },
            onError: (err) => toast.push("error", err instanceof Error ? err.message : "Could not save."),
          },
        );
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <Field label="SKU" htmlFor="p-sku" required hint="Letters, numbers, dots, dashes.">
          <Input id="p-sku" value={form.sku} onChange={(e) => set("sku", e.target.value)} required />
        </Field>
        <Field label="Category" htmlFor="p-cat">
          <Input id="p-cat" value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="UPS" />
        </Field>
      </div>
      <Field label="Name" htmlFor="p-name" required>
        <Input
          id="p-name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="45 kVA UPS, fairly used"
          required
        />
      </Field>
      <Field label="Description" htmlFor="p-desc">
        <Textarea id="p-desc" value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Condition grade" htmlFor="p-grade">
          <Select
            id="p-grade"
            value={form.conditionGrade}
            onChange={(e) => set("conditionGrade", e.target.value as FormState["conditionGrade"])}
          >
            {GRADES.map((grade) => (
              <option key={grade} value={grade}>
                {titleCase(grade)}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Unit" htmlFor="p-unit">
          <Input id="p-unit" value={form.unit} onChange={(e) => set("unit", e.target.value)} />
        </Field>
        <Field label="Cost price (₦)" htmlFor="p-cost">
          <MoneyInput id="p-cost" value={form.costPrice} onChange={(e) => set("costPrice", e.target.value)} />
        </Field>
        <Field label="Sale price (₦)" htmlFor="p-sale">
          <MoneyInput id="p-sale" value={form.salePrice} onChange={(e) => set("salePrice", e.target.value)} />
        </Field>
        <Field label="Opening quantity" htmlFor="p-qty" hint={productId ? "Use the stock button to move stock." : undefined}>
          <Input
            id="p-qty"
            value={form.quantity}
            onChange={(e) => set("quantity", e.target.value)}
            inputMode="numeric"
            className="tnum text-right"
            disabled={Boolean(productId)}
          />
        </Field>
        <Field label="Reorder level" htmlFor="p-reorder">
          <Input
            id="p-reorder"
            value={form.reorderLevel}
            onChange={(e) => set("reorderLevel", e.target.value)}
            inputMode="numeric"
            className="tnum text-right"
          />
        </Field>
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-ink-700">
          <input type="checkbox" checked={form.trackStock} onChange={(e) => set("trackStock", e.target.checked)} />
          Track stock for this item
        </label>
        {productId && (
          <label className="flex items-center gap-2 text-sm text-ink-700">
            <input type="checkbox" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)} />
            Active
          </label>
        )}
      </div>
      <Button type="submit" loading={save.isPending} className="w-full">
        {productId ? "Save changes" : "Add item"}
      </Button>
    </form>
  );
}

/** Every movement goes through the append-only ledger, never a direct edit. */
function StockForm({ product, onDone }: { product: Product; onDone: () => void }) {
  const toast = useToast();
  const [direction, setDirection] = useState<"in" | "out" | "adjust">("in");
  const [quantity, setQuantity] = useState("1");
  const [unitCost, setUnitCost] = useState(koboToInput(product.costPrice));
  const [note, setNote] = useState("");

  const adjust = useApiMutation<Record<string, unknown>, unknown>({
    path: `/products/${product.id}/stock`,
    invalidate: invalidateAll,
    idempotent: true,
  });

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        const qty = Number.parseInt(quantity, 10);
        if (!Number.isFinite(qty) || qty < 1) {
          toast.push("error", "Quantity must be at least 1.");
          return;
        }
        adjust.mutate(
          { direction, quantity: qty, unitCost: parseAmountToKobo(unitCost), note },
          {
            onSuccess: () => {
              toast.push("success", "Stock updated.");
              onDone();
            },
            onError: (err) => toast.push("error", err instanceof Error ? err.message : "Could not adjust stock."),
          },
        );
      }}
    >
      <p className="rounded-lg bg-ink-50 px-3 py-2 text-sm text-ink-700">
        Currently <span className="tnum font-semibold">{product.quantity}</span> in stock.
      </p>
      <Field label="Movement" htmlFor="s-dir">
        <Select id="s-dir" value={direction} onChange={(e) => setDirection(e.target.value as "in" | "out" | "adjust")}>
          <option value="in">Stock in (purchase, return)</option>
          <option value="out">Stock out (write-off, damage)</option>
          <option value="adjust">Set to an exact count</option>
        </Select>
      </Field>
      <Field label="Quantity" htmlFor="s-qty" required>
        <Input
          id="s-qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          inputMode="numeric"
          className="tnum text-right"
          required
        />
      </Field>
      <Field label="Unit cost (₦)" htmlFor="s-cost" hint="Used to value the movement.">
        <MoneyInput id="s-cost" value={unitCost} onChange={(e) => setUnitCost(e.target.value)} />
      </Field>
      <Field label="Note" htmlFor="s-note">
        <Input id="s-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Why?" />
      </Field>
      <Button type="submit" loading={adjust.isPending} className="w-full">
        Apply movement
      </Button>
    </form>
  );
}
