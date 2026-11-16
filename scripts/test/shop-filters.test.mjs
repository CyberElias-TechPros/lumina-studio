import test from "node:test";
import assert from "node:assert/strict";
import { gadgetCategory, compareShopItems } from "../../src/lib/shop-filters.ts";

test("classifies recognisable supplier titles without losing unknown items", () => {
  for (const [title, category] of [
    ["HP Elitebook 1040 G6 x360", "laptops"], ["Dell Precision 5560", "laptops"],
    ["iPhone 15 Pro 256GB", "phones"], ["Google Pixel 9 Pro", "phones"],
    ["AOC 27G2", "monitors"], ["Dell P2419H", "monitors"], ["HP 24-inch", "monitors"],
    ["iPhone Silicone Pouch for All iPhones", "accessories"], ["T628G Laptop Stand V5.1", "accessories"],
    ["Unrecognised item", "other"],
  ]) assert.equal(gadgetCategory(title), category, title);
});

test("price sorting puts unknown prices last in both directions", () => {
  const items = [{name: "B", price: 30}, {name: "C", price: null}, {name: "A", price: 10}];
  const sorted = (sort) => [...items].sort((a,b) => compareShopItems(a,b,sort,x=>x.name,x=>x.price)).map(x=>x.name);
  assert.deepEqual(sorted("featured"), ["B", "C", "A"]);
  assert.deepEqual(sorted("name"), ["A", "B", "C"]);
  assert.deepEqual(sorted("price-low"), ["A", "B", "C"]);
  assert.deepEqual(sorted("price-high"), ["B", "A", "C"]);
});
