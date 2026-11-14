"use client";

import { useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { AppShell } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  estimatePrice,
  parseAfkitSnapshot,
  parseNaira,
  type Observation,
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
  const [text, setText] = useState("");
  const [items, setItems] = useState<Observation[]>([]);
  const [costs, setCosts] = useState<string[]>([]);
  const [regularPrices, setRegularPrices] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [fee, setFee] = useState("1.5");
  const [fixed, setFixed] = useState("100");
  const [risk, setRisk] = useState("3");
  const [margin, setMargin] = useState("8");
  const [minProfit, setMinProfit] = useState("5000");
  const [extra, setExtra] = useState("");
  const [round, setRound] = useState("100");
  const [confirmed, setConfirmed] = useState(false);
  const feeBps = percentage(fee),
    riskBps = percentage(risk),
    marginBps = percentage(margin);
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
  function analyze() {
    try {
      const result = parseAfkitSnapshot(text);
      setItems(result.items);
      setCosts(result.items.map(() => ""));
      setRegularPrices(result.items.map(() => ""));
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
      setError(err instanceof Error ? err.message : "Could not review the snapshot.");
    }
  }
  return (
    <AppShell
      roleKey="admin"
      title="Supplier review"
      subtitle="Catalogue observations and pricing estimates"
    >
      <div className="space-y-5">
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
              className="border-input bg-background min-h-36 w-full rounded-md border p-3 text-sm"
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
                    onChange={(e) => field.set(e.target.value)}
                  />
                </label>
              ))}
            </div>
            <label className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />{" "}
              I have entered my estimated additional per-item costs, including delivery and
              applicable taxes, or deliberately entered zero.
            </label>
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
                  if (valid && cost !== null && cost > 0) {
                    try {
                      estimate = estimatePrice({
                        supplierCostKobo: cost,
                        extraCostKobo: extraKobo!,
                        fixedFeeKobo: fixedKobo!,
                        minProfitKobo: minKobo!,
                        feeBps: feeBps!,
                        riskBps: riskBps!,
                        targetMarginBps: marginBps!,
                        roundToKobo: roundKobo!,
                      });
                    } catch {
                      /* shown as unavailable */
                    }
                  }
                  return (
                    <div
                      key={`${item.imageUrl}-${index}`}
                      className="space-y-2 rounded-md border p-4 text-sm"
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
                        onChange={(e) =>
                          setCosts((previous) =>
                            previous.map((value, i) => (i === index ? e.target.value : value)),
                          )
                        }
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
                            onChange={(e) =>
                              setRegularPrices((previous) =>
                                previous.map((value, i) => (i === index ? e.target.value : value)),
                              )
                            }
                          />
                          {regular !== null &&
                            (regular >= estimate.floorKobo ? (
                              <p>
                                Maximum estimated discount: {money(regular - estimate.floorKobo)}.
                                Recheck current cost and eligibility before offering; no discount is
                                sent or applied.
                              </p>
                            ) : (
                              <p className="text-destructive">
                                The proposed price is below the estimated floor. Do not offer a
                                discount on these assumptions.
                              </p>
                            ))}
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
