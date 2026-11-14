import test from "node:test";
import assert from "node:assert/strict";
import {
  parseAfkitSnapshot,
  parseNaira,
  estimatePrice,
} from "../../src/lib/dropshipping/review.ts";

const first = `![Example](https://images.afkit.ng/example.jpg)

2 left

UK Used

## Test laptop with a casing scratch

₦175,000

Add to cart`;
const second = `![Another](https://images.afkit.ng/other.webp)

Brand New

## Test accessory...

₦12,000₦9,000

Add to cart`;
test("snapshot parser keeps unknown stock and ambiguous sale amounts instead of inventing data", () => {
  const result = parseAfkitSnapshot(`${first}\n\n${second}\n\n# Footer\n₦100`);
  assert.equal(result.items.length, 2);
  assert.equal(result.items[0].stock, 2);
  assert.equal(result.items[0].condition, "used");
  assert.deepEqual(result.items[0].pricesKobo, [17500000]);
  assert.equal(result.items[1].stock, null);
  assert.equal(result.items[1].condition, "new");
  assert.deepEqual(result.items[1].pricesKobo, [1200000, 900000]);
  assert.ok(result.items[1].needsReview.some((x) => x.includes("Ambiguous")));
  assert.ok(result.items[1].needsReview.includes("Title truncated"));
});
test("invalid prices, duplicate images and unrelated images never silently become valid catalog data", () => {
  const malformed = first.replace("₦175,000", "₦1,00");
  const data = parseAfkitSnapshot(
    `${malformed}\n${first}\n![Unrelated](https://images.afkit.ng/footer.jpg)\nhello`,
  );
  assert.equal(data.items.length, 2);
  assert.deepEqual(data.items[0].pricesKobo, []);
  assert.ok(data.items[1].needsReview.some((x) => x.includes("Repeated image")));
  assert.match(data.warning, /1 image blocks/);
  assert.equal(
    parseAfkitSnapshot(first.replace("images.afkit.ng", "evil.example")).items.length,
    0,
  );
  assert.throws(() => parseAfkitSnapshot("x".repeat(1_000_001)), /too large/);
});
test("naira conversion is exact and rejects bad values", () => {
  assert.equal(parseNaira("175000.25"), 17500025);
  for (const invalid of ["-2", "NaN", "2e3", "1.234", "", "1000000000"])
    assert.equal(parseNaira(invalid), null);
});
test("estimated floor covers fixed minimum and margin, including per-component rounding", () => {
  const base = {
    supplierCostKobo: 17500000,
    extraCostKobo: 300000,
    fixedFeeKobo: 10000,
    minProfitKobo: 500000,
    feeBps: 150,
    riskBps: 300,
    targetMarginBps: 800,
    roundToKobo: 10000,
  };
  const result = estimatePrice(base);
  assert.ok(result.floorKobo % base.roundToKobo === 0);
  assert.ok(result.estimatedProfitKobo >= base.minProfitKobo);
  assert.ok(result.estimatedProfitKobo * 10000 >= result.floorKobo * base.targetMarginBps);
  assert.equal(
    result.floorKobo -
      base.supplierCostKobo -
      base.extraCostKobo -
      result.estimatedFeeKobo -
      result.riskReserveKobo,
    result.estimatedProfitKobo,
  );
  assert.throws(() => estimatePrice({ ...base, targetMarginBps: 10000 }), /below 100%/);
  assert.throws(() => estimatePrice({ ...base, supplierCostKobo: 0 }), /Check/);
});
test("rounding safeguards maintain floors across varied costs and percentages", () => {
  for (let n = 1; n < 2000; n += 37) {
    const p = {
      supplierCostKobo: n * 101,
      extraCostKobo: n * 3,
      fixedFeeKobo: 101,
      minProfitKobo: n,
      feeBps: 137,
      riskBps: 293,
      targetMarginBps: 731,
      roundToKobo: 7,
    };
    const r = estimatePrice(p);
    assert.ok(r.estimatedProfitKobo >= p.minProfitKobo);
    assert.ok(r.estimatedProfitKobo * 10000 >= r.floorKobo * p.targetMarginBps);
  }
});

test("offer limits honor normal 10% floor and require explicit approval for 8% exception", async () => {
  const { estimateOfferLimits } = await import("../../src/lib/dropshipping/review.ts");
  const base = {
    supplierCostKobo: 17500000,
    extraCostKobo: 500000,
    fixedFeeKobo: 10000,
    minProfitKobo: 500000,
    feeBps: 150,
    riskBps: 300,
    targetMarginBps: 1800,
    roundToKobo: 10000,
  };
  const regular = estimatePrice(base).floorKobo;
  assert.equal(regular, 23240000);
  const normal = estimateOfferLimits(base, regular, 1000, 800, false);
  assert.equal(normal.normalFloorKobo, 21070000);
  assert.equal(normal.normalDiscountKobo, 2170000);
  assert.equal(normal.exceptionalFloorKobo, null);
  assert.equal(normal.exceptionalDiscountKobo, null);
  const approved = estimateOfferLimits(base, regular, 1000, 800, true);
  assert.equal(approved.exceptionalFloorKobo, 20590000);
  assert.equal(approved.exceptionalDiscountKobo, 2650000);
  assert.equal(estimateOfferLimits(base, 20000000, 1000, 800, true).normalDiscountKobo, null);
  assert.equal(estimateOfferLimits(base, 20000000, 1000, 800, true).exceptionalDiscountKobo, null);
  assert.throws(() => estimateOfferLimits(base, regular, 1000, 799, true), /margin/i);
  assert.throws(() => estimateOfferLimits(base, regular, 900, 800, true), /margin/i);
  assert.throws(() => estimateOfferLimits(base, regular, 700, 800, true), /margin/i);
  assert.throws(
    () => estimateOfferLimits({ ...base, targetMarginBps: 10000 }, regular, 1000, 800, true),
    /percentage/i,
  );
  assert.throws(() => estimateOfferLimits(base, regular, 1900, 800, true), /margin/i);
  assert.throws(() => estimateOfferLimits(base, 0, 1000, 800, true), /price/i);
});

test("offer tiers retain minimum profit and cost, fee and reserve safeguards", async () => {
  const { estimateOfferLimits } = await import("../../src/lib/dropshipping/review.ts");
  for (const supplierCostKobo of [10000, 100000, 17500000, 100000000]) {
    const inputs = {
      supplierCostKobo,
      extraCostKobo: 76543,
      fixedFeeKobo: 10203,
      minProfitKobo: 500000,
      feeBps: 157,
      riskBps: 317,
      targetMarginBps: 1800,
      roundToKobo: 10000,
    };
    const limits = estimateOfferLimits(inputs, 500000000, 1000, 800, true);
    for (const [floor, margin] of [
      [limits.normalFloorKobo, 1000],
      [limits.exceptionalFloorKobo, 800],
    ]) {
      const fee = Math.ceil((floor * inputs.feeBps) / 10000) + inputs.fixedFeeKobo;
      const reserve = Math.ceil((floor * inputs.riskBps) / 10000);
      const profit = floor - supplierCostKobo - inputs.extraCostKobo - fee - reserve;
      assert.ok(profit >= inputs.minProfitKobo);
      assert.ok(profit * 10000 >= floor * margin);
      assert.equal(floor % inputs.roundToKobo, 0);
    }
    assert.equal(
      estimateOfferLimits(inputs, limits.normalFloorKobo, 1000, 800, true).normalDiscountKobo,
      null,
    );
    assert.equal(
      estimateOfferLimits(inputs, limits.exceptionalFloorKobo, 1000, 800, true)
        .exceptionalDiscountKobo,
      null,
    );
  }
});
