import test from "node:test";
import assert from "node:assert/strict";
import { readBasket, BASKET_LIMIT } from "../../src/lib/gadget-basket.ts";

test("basket stores only bounded, unique supplier image references and quantities", () => {
  const image = "https://images.afkit.ng/item.jpg";
  const raw = JSON.stringify([
    { image, quantity: 2, priceKobo: 1 },
    { image, quantity: 3 },
    { image: "not-a-url", quantity: 1 },
    { image: "https://evil.example/item.jpg", quantity: 1 },
    { image: "https://images.afkit.ng/other.jpg", quantity: 11 },
    { image: "https://images.afkit.ng/good.jpg", quantity: 1 },
  ]);
  assert.deepEqual(readBasket(raw), [
    { image, quantity: 2 },
    { image: "https://images.afkit.ng/good.jpg", quantity: 1 },
  ]);
  assert.deepEqual(readBasket("not json"), []);
  assert.deepEqual(readBasket("x".repeat(10001)), []);
  const entries = Array.from({ length: 15 }, (_, i) => ({
    image: `https://images.afkit.ng/${i}.jpg`,
    quantity: 1,
  }));
  assert.equal(readBasket(JSON.stringify(entries)).length, BASKET_LIMIT);
});
