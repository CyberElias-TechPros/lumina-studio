"use client";

import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { AppShell } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  fetchAdminGadgetOrders,
  updateAdminGadgetOrder,
  type AdminGadgetOrder,
  type GadgetOrderStatus,
} from "@/lib/api/gadgets";
import { getErrorMessage } from "@/lib/errors";
import {
  estimatePrice,
  estimateOfferLimits,
  parseAfkitSnapshot,
  parseNaira,
  type Observation,
  type PricingInputs,
} from "@/lib/dropshipping/review";

export const Route = createFileRoute("/app/admin/dropshipping")({
  head: () => ({
    meta: [
      { title: "Supplier review — CEA-OS" },
      { name: "description", content: "Private supplier catalogue and pricing review." },
    ],
  }),
  component: DropshippingReview,
});

const money = (value: number) =>
  `₦${(value / 100).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
function percentage(input: string): number | null {
  if (!/^(?:\d{1,2})(?:\.\d{1,2})?$/.test(input.trim())) return null;
  const [whole, fraction = ""] = input.trim().split(".");
  return Number(whole) * 100 + Number((fraction + "00").slice(0, 2));
}

function DropshippingReview() {
  const [orders, setOrders] = useState<AdminGadgetOrder[]>([]);
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("");
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");
  const [orderNotes, setOrderNotes] = useState<Record<string, string>>({});
  const [updatingRef, setUpdatingRef] = useState("");

  const loadOrders = useCallback(async (status: string) => {
    setOrdersLoading(true);
    setOrdersError("");
    try {
      const page = await fetchAdminGadgetOrders(status || undefined);
      setOrders(page.items);
      setOrderNotes((prev) => {
        const next = { ...prev };
        for (const item of page.items) {
          if (next[item.ref] === undefined) next[item.ref] = item.adminNote ?? "";
        }
        return next;
      });
    } catch (err) {
      setOrdersError(getErrorMessage(err));
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadOrders(orderStatusFilter);
  }, [loadOrders, orderStatusFilter]);

  async function handleOrderStatus(ref: string, status: GadgetOrderStatus) {
    setUpdatingRef(ref);
    try {
      await updateAdminGadgetOrder(ref, {
        status,
        adminNote: orderNotes[ref] ?? "",
      });
      await loadOrders(orderStatusFilter);
    } catch (err) {
      setOrdersError(getErrorMessage(err));
    } finally {
      setUpdatingRef("");
    }
  }

  const [text, setText] = useState("");
  const [items, setItems] = useState<Observation[]>([]);
  const [costs, setCosts] = useState<string[]>([]);
  const [regularPrices, setRegularPrices] = useState<string[]>([]);
  const [exceptionApprovals, setExceptionApprovals] = useState<boolean[]>([]);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [fee, setFee] = useState("1.5");
  const [fixed, setFixed] = useState("100");
  const [risk, setRisk] = useState("3");
  const [margin, setMargin] = useState("18");
  const [normalMargin, setNormalMargin] = useState("10");
  const [exceptionMargin, setExceptionMargin] = useState("8");
  const [minProfit, setMinProfit] = useState("5000");
  const [extra, setExtra] = useState("");
  const [round, setRound] = useState("100");
  const [confirmed, setConfirmed] = useState(false);
  const feeBps = percentage(fee),
    riskBps = percentage(risk),
    marginBps = percentage(margin),
    normalBps = percentage(normalMargin),
    exceptionBps = percentage(exceptionMargin);
  const fixedKobo = parseNaira(fixed),
    minKobo = parseNaira(minProfit),
    extraKobo = parseNaira(extra),
    roundKobo = parseNaira(round);
  const valid =
    confirmed &&
    feeBps !== null &&
    riskBps !== null &&
    marginBps !== null &&
    fixedKobo !== null &&
    minKobo !== null &&
    extraKobo !== null &&
    roundKobo !== null &&
    roundKobo > 0 &&
    feeBps + riskBps + marginBps < 10000;
  const offerValid =
    valid &&
    normalBps !== null &&
    exceptionBps !== null &&
    marginBps !== null &&
    exceptionBps >= 800 &&
    normalBps >= 1000 &&
    exceptionBps <= normalBps &&
    normalBps <= marginBps;
  function resetExceptionApprovals() {
    setExceptionApprovals((previous) => previous.map(() => false));
  }
  function analyze() {
    try {
      const result = parseAfkitSnapshot(text);
      setItems(result.items);
      setCosts(result.items.map(() => ""));
      setRegularPrices(result.items.map(() => ""));
      setExceptionApprovals(result.items.map(() => false));
      setError(
        result.items.length
          ? ""
          : "No recognizable product blocks. Use a markdown-rendered snapshot, not a URL, and review it manually.",
      );
      setWarning(result.warning ?? "");
    } catch (err) {
      setItems([]);
      setCosts([]);
      setRegularPrices([]);
      setExceptionApprovals([]);
      setError(err instanceof Error ? err.message : "Could not review the snapshot.");
    }
  }
  return (
    <AppShell
      roleKey="admin"
      title="Gadget orders & supplier review"
      subtitle="Customer gadget fulfillment queue and Afkit pricing workspace"
    >
      <div className="space-y-5">
        <Card className="border bg-card">
          <CardContent className="space-y-4 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-bold">Customer gadget orders</h2>
                <p className="text-muted-foreground text-xs">
                  Confirm stock, update delivery notes, and advance fulfillment status.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  aria-label="Filter gadget orders by status"
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-background border-input h-9 rounded-lg border px-3 text-xs font-semibold"
                >
                  <option value="">All statuses</option>
                  <option value="pending_confirmation">Pending confirmation</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="fulfilled">Fulfilled</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => void loadOrders(orderStatusFilter)}
                >
                  Refresh
                </Button>
              </div>
            </div>
            {ordersError && (
              <p role="alert" className="text-destructive text-xs font-semibold">
                {ordersError}
              </p>
            )}
            {ordersLoading ? (
              <p className="text-muted-foreground text-sm">Loading orders…</p>
            ) : orders.length === 0 ? (
              <p className="text-muted-foreground text-sm">No gadget orders found.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.ref} className="space-y-3 rounded-xl border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-display text-sm font-bold">
                          {order.ref} · {order.customerName}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {order.customerEmail} · {order.customerPhone}
                          {order.deliveryAddress ? ` · ${order.deliveryAddress}` : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="capitalize">
                          {order.status.replaceAll("_", " ")}
                        </Badge>
                        <span className="text-sm font-bold">{money(order.subtotalKobo)}</span>
                      </div>
                    </div>
                    <ul className="text-muted-foreground space-y-1 text-xs">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.quantity} × {item.title} ({money(item.lineTotalKobo)})
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-2">
                      <Input
                        value={orderNotes[order.ref] ?? ""}
                        onChange={(e) =>
                          setOrderNotes((prev) => ({ ...prev, [order.ref]: e.target.value }))
                        }
                        placeholder="Delivery quote or stock confirmation note…"
                        className="h-9 flex-1 text-xs"
                      />
                      {(
                        ["pending_confirmation", "confirmed", "fulfilled", "cancelled"] as const
                      ).map((statusOption) => (
                        <Button
                          key={statusOption}
                          type="button"
                          size="sm"
                          variant={order.status === statusOption ? "default" : "outline"}
                          disabled={updatingRef === order.ref}
                          onClick={() => void handleOrderStatus(order.ref, statusOption)}
                        >
                          {statusOption.replaceAll("_", " ")}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border bg-card">
          <CardContent className="space-y-3 p-5">
            <h2 className="font-display text-lg font-bold">Afkit review workspace</h2>
            <p className="text-sm">
              This is a local, read-only calculator. It does not connect to Afkit, save data,
              publish to the shop or Google, accept orders, send messages, or transfer money. Data
              stays in this browser tab and disappears on reload.
            </p>
            <p className="text-sm">
              Paste a <strong>markdown-rendered</strong> Afkit listing snapshot. The importer is
              experimental and may miss items; compare every page and total with the supplier.
              Counts and prices are historical observations, not current stock or confirmed
              wholesale prices. Images and titles are not stable supplier IDs.
            </p>
            <label htmlFor="supplier-snapshot" className="block text-sm font-semibold">
              Listing snapshot for review
            </label>
            <textarea
              id="supplier-snapshot"
              maxLength={1000000}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border-input bg-background min-h-36 w-full rounded-lg border p-3 text-sm"
              placeholder="Paste a markdown-rendered listing snapshot here"
            />
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={analyze}>
                Review snapshot
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setText("");
                  setItems([]);
                  setCosts([]);
                  setRegularPrices([]);
                  setExceptionApprovals([]);
                  setError("");
                  setWarning("");
                }}
              >
                Clear
              </Button>
            </div>
            {error && (
              <p role="alert" className="text-destructive text-sm">
                {error}
              </p>
            )}
            {warning && (
              <p role="alert" className="text-sm">
                {warning}
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="border bg-card">
          <CardContent className="space-y-4 p-5">
            <h2 className="font-display text-lg font-bold">Change the pricing assumptions</h2>
            <p className="text-sm">
              These are provisional estimates, not approved business terms. Enter all expected
              per-item shipping, packing, tax and other costs. The payment estimate conservatively
              ignores caps and waivers; actual transaction fees, returns and losses may differ.
              Review each item before pricing.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { id: "fee", label: "Payment fee (%)", value: fee, set: setFee },
                { id: "fixed", label: "Fixed payment fee (₦)", value: fixed, set: setFixed },
                { id: "risk", label: "Risk reserve (%)", value: risk, set: setRisk },
                { id: "margin", label: "Target net margin (%)", value: margin, set: setMargin },
                {
                  id: "normal-margin",
                  label: "Normal offer margin (%)",
                  value: normalMargin,
                  set: setNormalMargin,
                },
                {
                  id: "exception-margin",
                  label: "Exceptional offer margin (%)",
                  value: exceptionMargin,
                  set: setExceptionMargin,
                },
                {
                  id: "profit",
                  label: "Minimum net profit (₦)",
                  value: minProfit,
                  set: setMinProfit,
                },
                { id: "extra", label: "Other per-item costs (₦)", value: extra, set: setExtra },
                { id: "round", label: "Round up to nearest (₦)", value: round, set: setRound },
              ].map((field) => (
                <label
                  key={field.id}
                  htmlFor={`ds-${field.id}`}
                  className="space-y-1 text-sm font-semibold"
                >
                  <span>{field.label}</span>
                  <Input
                    id={`ds-${field.id}`}
                    inputMode="decimal"
                    value={field.value}
                    onChange={(e) => {
                      field.set(e.target.value);
                      resetExceptionApprovals();
                    }}
                  />
                </label>
              ))}
            </div>
            <label className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => {
                  setConfirmed(e.target.checked);
                  resetExceptionApprovals();
                }}
              />{" "}
              I have entered my estimated additional per-item costs, including delivery and
              applicable taxes, or deliberately entered zero.
            </label>
            {valid && !offerValid && (
              <p className="text-destructive text-sm">
                The normal offer margin must be at least 10% and the exceptional margin at least 8%.
                The exceptional margin cannot exceed normal, and normal cannot exceed the target.
              </p>
            )}
            {!valid && (
              <p className="text-muted-foreground text-sm">
                Enter valid values and confirm the additional costs to show an estimate. Combined
                percentages must be below 100%.
              </p>
            )}
          </CardContent>
        </Card>
        {items.length > 0 && (
          <Card className="border bg-card">
            <CardContent className="space-y-4 p-5">
              <h2 className="font-display text-lg font-bold">
                {items.length} observations for manual review
              </h2>
              <p className="text-sm">
                The displayed supplier price is only a reference from the pasted snapshot. Confirm
                your actual supplier cost and any defects directly with Afkit. A missing quantity is
                unknown, not available. Do not publish these observations.
              </p>
              <div className="space-y-3">
                {items.map((item, index) => {
                  const cost = parseNaira(costs[index] ?? "");
                  const regular = parseNaira(regularPrices[index] ?? "");
                  let estimate: ReturnType<typeof estimatePrice> | null = null;
                  let offer: ReturnType<typeof estimateOfferLimits> | null = null;
                  if (valid && cost !== null && cost > 0) {
                    try {
                      const inputs: PricingInputs = {
                        supplierCostKobo: cost,
                        extraCostKobo: extraKobo!,
                        fixedFeeKobo: fixedKobo!,
                        minProfitKobo: minKobo!,
                        feeBps: feeBps!,
                        riskBps: riskBps!,
                        targetMarginBps: marginBps!,
                        roundToKobo: roundKobo!,
                      };
                      estimate = estimatePrice(inputs);
                      if (offerValid && regular !== null && regular > 0) {
                        offer = estimateOfferLimits(
                          inputs,
                          regular,
                          normalBps!,
                          exceptionBps!,
                          exceptionApprovals[index] === true,
                        );
                      }
                    } catch {
                      /* shown as unavailable */
                    }
                  }
                  return (
                    <div
                      key={`${item.imageUrl}-${index}`}
                      className="space-y-2 rounded-lg border p-4 text-sm"
                    >
                      <h3 className="font-semibold">{item.title}</h3>
                      <p>
                        Observed condition: {item.condition} · Observed quantity:{" "}
                        {item.stock === null ? "unknown" : item.stock} · Snapshot price
                        {item.pricesKobo.length === 1 ? "" : "s"}:{" "}
                        {item.pricesKobo.length
                          ? item.pricesKobo.map(money).join(" / ")
                          : "unknown"}
                      </p>
                      <p className="text-muted-foreground">
                        Review: {item.needsReview.join("; ")}.
                      </p>
                      <label htmlFor={`cost-${index}`} className="block font-semibold">
                        Estimated supplier cost for this item (₦)
                      </label>
                      <Input
                        id={`cost-${index}`}
                        inputMode="decimal"
                        value={costs[index] ?? ""}
                        onChange={(e) => {
                          setCosts((previous) =>
                            previous.map((value, i) => (i === index ? e.target.value : value)),
                          );
                          resetExceptionApprovals();
                        }}
                      />
                      {estimate && (
                        <p>
                          Suggested minimum: <strong>{money(estimate.floorKobo)}</strong> ·
                          Estimated net after cost, fee and reserve:{" "}
                          {money(estimate.estimatedProfitKobo)}. Not a guarantee of profit.
                        </p>
                      )}
                      {estimate && (
                        <>
                          <label htmlFor={`regular-${index}`} className="block font-semibold">
                            Optional proposed regular price (₦)
                          </label>
                          <Input
                            id={`regular-${index}`}
                            inputMode="decimal"
                            value={regularPrices[index] ?? ""}
                            onChange={(e) => {
                              setRegularPrices((previous) =>
                                previous.map((value, i) => (i === index ? e.target.value : value)),
                              );
                              resetExceptionApprovals();
                            }}
                          />
                          {regular !== null && regular > 0 && regular < estimate.floorKobo && (
                            <p className="text-destructive">
                              The proposed regular price is below the target price; review it before
                              making an offer.
                            </p>
                          )}
                          {offer && (
                            <div className="space-y-2 rounded-lg bg-muted/40 p-3">
                              <p>
                                Normal offer floor: <strong>{money(offer.normalFloorKobo)}</strong>{" "}
                                ({normalMargin}% estimated net margin or minimum profit, whichever
                                is higher).
                              </p>
                              {offer.normalDiscountKobo !== null ? (
                                <p>
                                  Maximum normal estimated discount:{" "}
                                  {money(offer.normalDiscountKobo)}.
                                </p>
                              ) : (
                                <p>
                                  The regular price is at or below the normal floor; no normal
                                  discount is available.
                                </p>
                              )}
                              <label className="flex gap-2">
                                <input
                                  type="checkbox"
                                  checked={exceptionApprovals[index] === true}
                                  onChange={(e) =>
                                    setExceptionApprovals((previous) =>
                                      previous.map((value, i) =>
                                        i === index ? e.target.checked : value,
                                      ),
                                    )
                                  }
                                />
                                I explicitly approve an exceptional {exceptionMargin}% margin for
                                this item after verifying its current cost, stock and other
                                expenses.
                              </label>
                              {offer.exceptionalFloorKobo !== null && (
                                <p>
                                  Exceptional offer floor:{" "}
                                  <strong>{money(offer.exceptionalFloorKobo)}</strong>.{" "}
                                  {offer.exceptionalDiscountKobo !== null
                                    ? `Maximum exceptional estimated discount: ${money(offer.exceptionalDiscountKobo)}.`
                                    : "The regular price is at or below the exceptional floor; no exceptional discount is available."}
                                </p>
                              )}
                              <p className="text-muted-foreground">
                                Use a genuine current regular price. Recheck costs and availability
                                before any offer; this calculator does not send or apply discounts.
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
