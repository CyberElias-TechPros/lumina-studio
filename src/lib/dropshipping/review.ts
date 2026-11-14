/** Private, read-only catalogue observations and conservative pricing estimates.
 * This module never fetches, publishes, sells, sends data, or claims live stock. */

export type Observation = {
  title: string;
  imageUrl: string;
  condition: "used" | "new" | "unknown";
  stock: number | null;
  pricesKobo: number[];
  needsReview: string[];
};

const MAX_TEXT = 1_000_000;
const MAX_ITEMS = 500;

/** Parse a markdown-rendered Afkit listing snapshot, NOT supplier API data.
 * Unknown counts stay unknown, sale prices are never guessed, and image URLs
 * are observations only—not stable SKU identities or rights to use them. */
export function parseAfkitSnapshot(text: string): { items: Observation[]; warning: string | null } {
  if (text.length > MAX_TEXT) throw new Error("Snapshot is too large; use at most one megabyte.");
  const matches = [
    ...text.matchAll(
      /!\[([^\]]*)\]\((https:\/\/images\.afkit\.ng\/[^\s)]+)\)([\s\S]*?)(?=\n\s*!\[|$)/gi,
    ),
  ];
  if (matches.length > MAX_ITEMS) throw new Error("Too many items; use at most 500 per review.");
  const items: Observation[] = [];
  let rejected = 0;
  for (const match of matches) {
    const body = match[3] ?? "";
    const end = body.search(/\bAdd to cart\b/i);
    if (end < 0) {
      rejected++;
      continue;
    }
    // Keep the footer and later content out of the product observation.
    const card = body.slice(0, end);
    const heading = card.match(/^##\s+(.+)$/m)?.[1]?.trim();
    if (!heading) {
      rejected++;
      continue;
    }
    const quantities = [...card.matchAll(/^\s*(\d+)\s+left\s*$/gim)];
    const conditionLines = [...card.matchAll(/^\s*(UK Used|Brand New)\s*$/gim)];
    const priceTokens = [...card.matchAll(/₦\s*([\d,]+(?:\.\d+)?)/g)].map((m) => m[1]!);
    const prices = priceTokens
      .map((value) =>
        /^(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?$/.test(value)
          ? parseNaira(value.replace(/,/g, ""))
          : null,
      )
      .filter((n): n is number => n !== null && n > 0);
    const stock = quantities.length === 1 ? Number(quantities[0]![1]) : null;
    const rawCondition = conditionLines.length === 1 ? conditionLines[0]![1]!.toLowerCase() : "";
    const condition =
      rawCondition === "uk used" ? "used" : rawCondition === "brand new" ? "new" : "unknown";
    const needsReview: string[] = [];
    if (stock === null || !Number.isSafeInteger(stock)) needsReview.push("Stock unknown");
    if (condition === "unknown") needsReview.push("Condition unknown");
    if (prices.length !== 1 || prices.length !== priceTokens.length)
      needsReview.push(
        prices.length ? "Ambiguous prices: confirm current price" : "Price missing or invalid",
      );
    if (heading.endsWith("...")) needsReview.push("Title truncated");
    needsReview.push("Confirm SKU, cost, condition details and permission");
    items.push({
      title: heading,
      imageUrl: match[2]!,
      condition,
      stock: stock !== null && Number.isSafeInteger(stock) ? stock : null,
      pricesKobo: prices,
      needsReview,
    });
  }
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.imageUrl))
      item.needsReview.push("Repeated image: possible duplicate, not a SKU");
    seen.add(item.imageUrl);
  }
  return {
    items,
    warning: rejected
      ? `${rejected} image blocks could not be read; review the source manually.`
      : null,
  };
}

/** Parse exact decimal naira into integer kobo, capped to keep all math safe. */
export function parseNaira(value: string): number | null {
  if (!/^(?:0|[1-9]\d{0,8})(?:\.\d{1,2})?$/.test(value.trim())) return null;
  const [whole, fraction = ""] = value.trim().split(".");
  const result = Number(whole) * 100 + Number((fraction + "00").slice(0, 2));
  return Number.isSafeInteger(result) ? result : null;
}

export type PricingInputs = {
  supplierCostKobo: number;
  extraCostKobo: number;
  fixedFeeKobo: number;
  minProfitKobo: number;
  feeBps: number;
  riskBps: number;
  targetMarginBps: number;
  roundToKobo: number;
};
export type PriceEstimate = {
  floorKobo: number;
  estimatedProfitKobo: number;
  estimatedFeeKobo: number;
  riskReserveKobo: number;
};
const ceilDiv = (a: bigint, b: bigint) => (a + b - 1n) / b;

/** Conservative estimate. Ignores provider fee caps/waivers; actual fees,
 * taxes, losses, currency changes, shipping and returns can differ. */
export function estimatePrice(p: PricingInputs): PriceEstimate {
  const values = Object.values(p);
  if (
    values.some((n) => !Number.isSafeInteger(n) || n < 0 || n > 100_000_000_000) ||
    p.supplierCostKobo < 1 ||
    p.roundToKobo < 1 ||
    p.feeBps + p.riskBps + p.targetMarginBps >= 10000
  )
    throw new Error("Check the amounts and percentages. Combined percentage must be below 100%.");
  const B = 10000n;
  const base = BigInt(p.supplierCostKobo) + BigInt(p.extraCostKobo) + BigInt(p.fixedFeeKobo);
  const variable = BigInt(p.feeBps + p.riskBps);
  // Per-component ceiling can consume up to two extra kobo. Reserve those
  // before solving so the final rounded price never slips below either floor.
  const buffer = 2n;
  const byMargin = ceilDiv((base + buffer) * B, B - variable - BigInt(p.targetMarginBps));
  const byMinimum = ceilDiv((base + buffer + BigInt(p.minProfitKobo)) * B, B - variable);
  const raw = byMargin > byMinimum ? byMargin : byMinimum;
  const step = BigInt(p.roundToKobo);
  const sale = ceilDiv(raw, step) * step;
  const fee = ceilDiv(sale * BigInt(p.feeBps), B) + BigInt(p.fixedFeeKobo);
  const risk = ceilDiv(sale * BigInt(p.riskBps), B);
  const profit = sale - BigInt(p.supplierCostKobo) - BigInt(p.extraCostKobo) - fee - risk;
  if (sale > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error("Calculated price is too large.");
  return {
    floorKobo: Number(sale),
    estimatedProfitKobo: Number(profit),
    estimatedFeeKobo: Number(fee),
    riskReserveKobo: Number(risk),
  };
}
