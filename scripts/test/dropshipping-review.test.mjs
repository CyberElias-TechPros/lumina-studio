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
