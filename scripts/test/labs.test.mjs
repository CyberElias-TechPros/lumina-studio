import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

const { executeMiniSql } = await import("../../src/lib/labs/mini-sql.ts");
const { evaluateSheet } = await import("../../src/lib/labs/mini-spreadsheet.ts");
const { CEA_BUILT_IN_LABS, CEA_OPEN_LAB_FEASIBILITY } =
  await import("../../src/data/cea-lab-registry.ts");

test("mini-sql executes SELECT, JOIN, GROUP BY, HAVING, and LEFT JOIN IS NULL", () => {
  const tables = executeMiniSql("SHOW TABLES;");
  assert.equal(tables.ok, true);
  assert.equal(tables.rowCount, 4);

  const grouped = executeMiniSql(
    "SELECT city, COUNT(*) AS buyers FROM customers GROUP BY city HAVING COUNT(*) >= 2 ORDER BY buyers DESC;",
  );
  assert.equal(grouped.ok, true);
  assert.equal(grouped.rowCount, 2);
  assert.equal(grouped.rows[0].city, "Port Harcourt");
  assert.equal(grouped.rows[0].buyers, 3);

  const joined = executeMiniSql(
    "SELECT o.order_id, c.full_name, o.total_ngn FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id WHERE o.order_status = 'paid' ORDER BY o.total_ngn DESC LIMIT 2;",
  );
  assert.equal(joined.ok, true);
  assert.equal(joined.rowCount, 2);
  assert.equal(joined.rows[0].total_ngn, 680000);

  const unpaid = executeMiniSql(
    "SELECT o.order_id FROM orders o LEFT JOIN payments p ON o.order_id = p.order_id WHERE p.payment_id IS NULL;",
  );
  assert.equal(unpaid.ok, true);
  assert.equal(unpaid.rowCount, 2);
});

test("mini-spreadsheet evaluates SUM, AVERAGE, IF, SUMIF, COUNTIF, ROUND, and VLOOKUP", () => {
  const sheet = evaluateSheet({
    A1: "Course",
    B1: "Channel",
    C1: "Fee",
    D1: "Status",
    A2: "SQL Lab",
    B2: "POS",
    C2: "95000",
    D2: '=IF(C2>=50000, "Tier A", "Tier B")',
    A3: "Typing",
    B3: "Cash",
    C3: "30000",
    D3: '=IF(C3>=50000, "Tier A", "Tier B")',
    C4: "=SUM(C2:C3)",
    C5: "=AVERAGE(C2:C3)",
    C6: '=SUMIF(B2:B3, "POS", C2:C3)',
    C7: '=COUNTIF(D2:D3, "Tier A")',
    C8: '=VLOOKUP("Typing", A2:C3, 3)',
    C9: "=ROUND(C2*0.075, 0)",
  });

  assert.equal(sheet.D2.value, "Tier A");
  assert.equal(sheet.D3.value, "Tier B");
  assert.equal(sheet.C4.value, 125000);
  assert.equal(sheet.C5.value, 62500);
  assert.equal(sheet.C6.value, 95000);
  assert.equal(sheet.C7.value, 1);
  assert.equal(sheet.C8.value, 30000);
  assert.equal(sheet.C9.value, 7125);
});

test("CEA Lab registry entries resolve in sitemap.xml and exclude ads", async () => {
  const { adsAllowedOn } = await import("../../src/lib/ads/slots.ts");
  const sitemap = readFileSync(join(root, "public/sitemap.xml"), "utf8");
  for (const lab of CEA_BUILT_IN_LABS) {
    assert.ok(
      sitemap.includes(`https://www.cea.ng${lab.to}<`),
      `${lab.to} missing from sitemap.xml`,
    );
    assert.equal(adsAllowedOn(lab.to), false, `${lab.to} must stay ad-free`);
  }
  assert.ok(CEA_OPEN_LAB_FEASIBILITY.length >= 15);
});
