import test from "node:test";
import assert from "node:assert/strict";
import data from "../../src/data/supplier/afkit-observations.json" with { type: "json" };

test("Afkit inquiry snapshot uses unique supplier images and no invented prices or stock", () => {
  assert.equal(data.source, "https://afkit.ng/shop/listing");
  assert.equal(data.reportedTotal, 88);
  assert.equal(data.observations.length, 87);
  assert.equal(new Set(data.observations.map((item) => item.image)).size, data.observations.length);
  for (const item of data.observations) {
    const url = new URL(item.image);
    assert.equal(url.protocol, "https:");
    assert.equal(url.hostname, "images.afkit.ng");
    assert.ok(item.title.length > 0);
    assert.ok(["new", "used"].includes(item.condition));
    assert.deepEqual(Object.keys(item).sort(), ["condition", "image", "title"]);
  }
  assert.match(
    data.observations.find((item) => item.image.includes("qylovnpjrcc9g76yg1aa")).title,
    /Keyboard is bad/,
  );
});
