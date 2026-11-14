import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeCards,
  validateCompleteObservation,
  collectSnapshot,
} from "../lib/afkit-sync-logic.mjs";
const card = (i) => ({
  imageUrl: `https://images.afkit.ng/${i}.jpg`,
  title: `Item ${i}`,
  condition: "UK Used",
  quantity: "1",
  prices: ["175,000"],
});
test("source count tolerance is bounded; missing pages and duplicates fail closed", () => {
  const cards = Array.from({ length: 87 }, (_, i) => card(i));
  assert.doesNotThrow(() => validateCompleteObservation(cards, 88, true));
  assert.throws(() => validateCompleteObservation(cards, 90, true), /Incomplete/);
  assert.throws(() => validateCompleteObservation(cards, 88, false), /Incomplete/);
  assert.throws(() => validateCompleteObservation([card(1), card(1)], 2, true), /duplicate/);
  assert.throws(() => validateCompleteObservation([card(1)], 3, true), /Incomplete/);
});
test("prices are exact integer kobo, multiple prices remain distinct and invalid tokens fail", () => {
  const [item] = normalizeCards([
    { ...card(1), prices: ["175,000.25", "149,000"], quantity: null },
  ]);
  assert.deepEqual(item.pricesKobo, [17500025, 14900000]);
  assert.equal(item.quantity, null);
  assert.throws(() => normalizeCards([{ ...card(1), prices: ["1,00"] }]), /Invalid/);
});

test("collector reads to an empty page, rechecks boundaries and fails on change", async () => {
  const pages = [[card(1), card(2)], [card(3)], []];
  const reads = [];
  const read = async (n) => {
    reads.push(n);
    return { total: 3, cards: pages[n - 1] ?? [] };
  };
  const out = await collectSnapshot(read, async () => {});
  assert.equal(out.cards.length, 3);
  assert.deepEqual(reads, [1, 2, 3, 1, 2]);
  let firstReads = 0;
  await assert.rejects(
    collectSnapshot(
      async (n) => {
        const original = pages[n - 1] ?? [];
        if (n === 1 && ++firstReads === 2)
          return { total: 3, cards: [{ ...original[0], title: "Changed" }, original[1]] };
        return { total: 3, cards: original };
      },
      async () => {},
    ),
    /changed/,
  );
});
