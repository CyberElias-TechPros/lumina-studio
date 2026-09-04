/**
 * Demo data seeder.
 *
 * This drives the **public HTTP API** of a running Worker rather than writing
 * SQL directly. That is deliberate: seeding through the API means the demo data
 * is produced by the same numbering, validation, totals and stock-ledger code
 * that real users hit. A raw-SQL seeder would happily insert an invoice whose
 * total does not match its items, and the demo would then contradict the app.
 *
 * Usage:
 *   npm run dev            # in one shell (wrangler dev --local --port 8787)
 *   npm run seed:local     # in another
 *
 * Environment:
 *   SEED_BASE_URL   default http://127.0.0.1:8787/v1
 *   SEED_EMAIL      default owner@delgra.test
 *   SEED_PASSWORD   default Str0ngPass!2026  (must satisfy the password policy)
 *
 * Idempotent-ish: registration is skipped when the workspace already has an
 * owner, and customers/products are only created when the SKU or name is not
 * present yet.
 */

const BASE = process.env.SEED_BASE_URL ?? "http://127.0.0.1:8787/v1";
const EMAIL = process.env.SEED_EMAIL ?? "owner@delgra.test";
const PASSWORD = process.env.SEED_PASSWORD ?? "Str0ngPass!2026";

let cookie = "";
let created = 0;
let skipped = 0;

interface ApiResponse<T> {
  ok: boolean;
  status: number;
  body: T & { error?: { code: string; message: string; fields?: Record<string, string> } };
}

async function api<T>(
  path: string,
  init: { method?: string; body?: unknown } = {},
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {};
  if (init.body !== undefined) headers["content-type"] = "application/json";
  if (cookie) headers.cookie = cookie;

  const response = await fetch(`${BASE}${path}`, {
    method: init.method ?? "GET",
    headers,
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });

  // Capture the session cookie wrangler sends back on login/register.
  const setCookie = response.headers.getSetCookie?.() ?? [];
  for (const value of setCookie) {
    const pair = value.split(";")[0];
    if (pair) cookie = cookie ? `${cookie}; ${pair}` : pair;
  }

  const text = await response.text();
  let body: unknown = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }
  return { ok: response.ok, status: response.status, body: body as ApiResponse<T>["body"] };
}

/** Fails loudly. A seeder that quietly skips errors produces a broken demo. */
function expect<T>(label: string, result: ApiResponse<T>): T {
  if (!result.ok) {
    const detail = result.body.error
      ? `${result.body.error.message}${
          result.body.error.fields ? ` ${JSON.stringify(result.body.error.fields)}` : ""
        }`
      : JSON.stringify(result.body);
    throw new Error(`${label} failed (HTTP ${result.status}): ${detail}`);
  }
  return result.body;
}

async function ensureOwner(): Promise<void> {
  const bootstrap = expect("bootstrap", await api<{ needsOwner: boolean }>("/bootstrap"));

  const login = await api("/auth/login", {
    method: "POST",
    body: { email: EMAIL, password: PASSWORD },
  });
  if (login.ok) {
    skipped += 1;
    console.log(`✓ signed in as existing owner (${EMAIL})`);
    return;
  }

  if (!bootstrap.needsOwner) {
    throw new Error(
      `The workspace already has an owner but ${EMAIL} could not sign in. ` +
        `Pass SEED_EMAIL/SEED_PASSWORD for the existing account, or reset the local database ` +
        `with \`npm run db:reset:local\`.`,
    );
  }

  expect(
    "register",
    await api("/auth/register", {
      method: "POST",
      body: { businessName: "DELGRA LTD", name: "Elias Okon", email: EMAIL, password: PASSWORD },
    }),
  );
  created += 1;
  console.log(`✓ registered owner ${EMAIL}`);
}

async function configureBusiness(): Promise<void> {
  // Numbering mirrors the owner's own documents: DEL-2026-TF-01.
  expect(
    "settings",
    await api("/settings/business", {
      method: "PATCH",
      body: {
        name: "DELGRA LTD",
        legalName: "DELGRA LTD",
        rcNumber: "RC-1884320",
        addressLine1: "14 Computer Village Road",
        city: "Ikeja",
        state: "Lagos",
        country: "Nigeria",
        phone: "+234 803 000 0000",
        email: "hello@delgra.ng",
        currency: "NGN",
        currencySymbol: "₦",
        invoicePrefix: "DEL",
        invoiceSeries: "TF",
        waybillPrefix: "WB",
        waybillSeries: "TF",
        purchasePrefix: "PO",
        paymentTermsDays: 14,
        taxEnabled: false,
        bankName: "Guaranty Trust Bank",
        bankAccountName: "DELGRA LTD",
        bankAccountNumber: "0123456789",
        invoiceNotes: "Goods are sold as tested, fairly used units. Warranty: 7 days on functionality.",
      },
    }),
  );
  console.log("✓ configured business profile and DEL-{year}-TF-{seq} numbering");
}

const CUSTOMERS = [
  {
    name: "TechFarms",
    contactPerson: "",
    email: "",
    phone: "",
    customerType: "company" as const,
    addressLine1: "",
    city: "",
    state: "",
  },
  {
    name: "Delta Power Systems Ltd",
    contactPerson: "Amina Bello",
    email: "accounts@deltapower.ng",
    phone: "+234 803 123 4567",
    customerType: "company" as const,
    addressLine1: "12 Awolowo Road",
    city: "Ikeja",
    state: "Lagos",
  },
  {
    name: "Grace Okoye",
    contactPerson: "Grace Okoye",
    email: "grace.okoye@gmail.com",
    phone: "+234 706 555 8890",
    customerType: "individual" as const,
    city: "Lekki",
    state: "Lagos",
  },
  {
    name: "Kaduna State Water Board",
    contactPerson: "Engr. Musa Danladi",
    email: "procurement@kswb.gov.ng",
    phone: "+234 802 441 7788",
    customerType: "government" as const,
    city: "Kaduna",
    state: "Kaduna",
  },
];

const SUPPLIERS = [
  { name: "Alaba International Traders", contactPerson: "Chief Emeka", phone: "+234 805 220 1144", city: "Lagos", state: "Lagos" },
  { name: "Delta Imports UK", contactPerson: "Sam Whitfield", email: "sales@deltaimports.co.uk", phone: "+44 20 7946 0100", city: "London", state: "" },
];

const PRODUCTS = [
  { sku: "DL-UPS-45KVA", name: "45 kVA UPS, fairly used", category: "UPS", conditionGrade: "grade_a" as const, unit: "unit", costPrice: 12_500_00, salePrice: 45_000_00, quantity: 3, reorderLevel: 1 },
  { sku: "DL-UPS-10KVA", name: "10 kVA UPS, fairly used", category: "UPS", conditionGrade: "grade_b" as const, unit: "unit", costPrice: 3_800_00, salePrice: 12_500_00, quantity: 6, reorderLevel: 2 },
  { sku: "DL-GEN-100KVA", name: "100 kVA diesel generator", category: "Generators", conditionGrade: "grade_a" as const, unit: "unit", costPrice: 48_000_00, salePrice: 79_500_00, quantity: 2, reorderLevel: 1 },
  { sku: "DL-INV-5KVA", name: "5 kVA inverter + battery set", category: "Inverters", conditionGrade: "grade_b" as const, unit: "set", costPrice: 2_100_00, salePrice: 5_900_00, quantity: 4, reorderLevel: 2 },
  { sku: "DL-BATT-200AH", name: "200 Ah tubular battery", category: "Batteries", conditionGrade: "grade_c" as const, unit: "unit", costPrice: 950_00, salePrice: 1_750_00, quantity: 12, reorderLevel: 4 },
  { sku: "DL-SRV-R720", name: "Dell PowerEdge R720 server", category: "Servers", conditionGrade: "grade_a" as const, unit: "unit", costPrice: 2_600_00, salePrice: 6_400_00, quantity: 1, reorderLevel: 1 },
];

const EXPENSES = [
  { category: "transport", description: "Diesel — generator delivery to Ikeja", amount: 285_00 },
  { category: "logistics", description: "GIG Logistics freight, Alaba to Ikeja", amount: 410_00 },
  { category: "tools", description: "Load-bank testing leads and multimeter", amount: 1_850_00 },
  { category: "repairs", description: "Fan and capacitor replacement, 10 kVA UPS", amount: 760_00 },
  { category: "rent", description: "Workshop rent, September", amount: 2_500_00 },
  { category: "customs", description: "Clearing duty, Delta Imports container", amount: 6_200_00 },
];

interface Named {
  id: string;
}

async function seedDirectory(): Promise<{ customers: Named[]; products: Named[]; suppliers: Named[] }> {
  const customers: Named[] = [];
  for (const customer of CUSTOMERS) {
    const existing = await api<{ data: Array<{ id: string; name: string }> }>(
      `/customers?q=${encodeURIComponent(customer.name)}&limit=5&active=false`,
    );
    const hit = existing.ok ? existing.body.data.find((c) => c.name === customer.name) : undefined;
    if (hit) {
      customers.push({ id: hit.id });
      skipped += 1;
      continue;
    }
    const result = expect(`customer ${customer.name}`, await api<{ id: string }>("/customers", { method: "POST", body: customer }));
    customers.push({ id: result.id });
    created += 1;
  }

  const suppliers: Named[] = [];
  for (const supplier of SUPPLIERS) {
    const existing = await api<{ data: Array<{ id: string; name: string }> }>(
      `/suppliers?q=${encodeURIComponent(supplier.name)}&limit=5&active=false`,
    );
    const hit = existing.ok ? existing.body.data.find((s) => s.name === supplier.name) : undefined;
    if (hit) {
      suppliers.push({ id: hit.id });
      skipped += 1;
      continue;
    }
    const result = expect(`supplier ${supplier.name}`, await api<{ id: string }>("/suppliers", { method: "POST", body: supplier }));
    suppliers.push({ id: result.id });
    created += 1;
  }

  const products: Named[] = [];
  for (const product of PRODUCTS) {
    const existing = await api<{ data: Array<{ id: string; sku: string }> }>(
      `/products?q=${encodeURIComponent(product.sku)}&limit=5`,
    );
    const hit = existing.ok ? existing.body.data.find((p) => p.sku === product.sku) : undefined;
    if (hit) {
      products.push({ id: hit.id });
      skipped += 1;
      continue;
    }
    const result = expect(`product ${product.sku}`, await api<{ id: string }>("/products", { method: "POST", body: product }));
    products.push({ id: result.id });
    created += 1;
  }

  console.log(`✓ directory: ${customers.length} customers, ${suppliers.length} suppliers, ${products.length} products`);
  return { customers, products, suppliers };
}

/** ISO date `daysAgo` days before today, in local time. */
function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  const offset = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 10);
}

async function seedTransactions(ctx: {
  customers: Named[];
  products: Named[];
  suppliers: Named[];
}): Promise<void> {
  const productAt = (sku: string) => {
    const index = PRODUCTS.findIndex((p) => p.sku === sku);
    const spec = index >= 0 ? PRODUCTS[index] : undefined;
    const created = index >= 0 ? ctx.products[index] : undefined;
    if (!spec || !created) throw new Error(`Seed product not found: ${sku}`);
    return { ...spec, id: created.id };
  };

  // (customer index, line items, issued N days ago, optional payment in kobo)
  const invoices: Array<{
    customer: number;
    issued: number;
    lines: Array<{ sku?: string; text?: string; quantity: number; unitPrice: number }>;
    discount?: number;
    pay?: number;
    status?: "draft" | "sent";
  }> = [
    {
      customer: 0,   // TechFarms — matches the real invoice DEL-2026-TF-01
      issued: 40,
      lines: [
        { sku: "DL-UPS-45KVA", quantity: 1, unitPrice: 45_000_00 },
        { text: "Installation and load testing", quantity: 1, unitPrice: 15_000_00 },
      ],
      discount: 0,
      pay: 60_000_00,
    },
    {
      customer: 2,
      issued: 22,
      lines: [{ sku: "DL-INV-5KVA", quantity: 1, unitPrice: 5_900_00 }, { sku: "DL-BATT-200AH", quantity: 4, unitPrice: 1_750_00 }],
      pay: 12_900_00,
    },
    {
      customer: 3,
      issued: 16,
      lines: [{ sku: "DL-GEN-100KVA", quantity: 1, unitPrice: 79_500_00 }],
      pay: 30_000_00,
    },
    {
      customer: 1,   // Delta Power Systems Ltd
      issued: 6,
      lines: [{ sku: "DL-UPS-10KVA", quantity: 3, unitPrice: 12_500_00 }],
    },
    {
      customer: 2,
      issued: 0,
      lines: [{ sku: "DL-SRV-R720", quantity: 1, unitPrice: 6_400_00 }],
      status: "draft",
    },
  ];

  for (const spec of invoices) {
    const customer = ctx.customers[spec.customer];
    if (!customer) throw new Error(`Seed customer index out of range: ${spec.customer}`);

    const items = spec.lines.map((line) => {
      if (line.sku) {
        const product = productAt(line.sku);
        return {
          productId: product.id,
          // Every seeded product is used stock, so the grade always belongs on the line.
          description: `${product.name} (${product.conditionGrade.replace("_", " ").toUpperCase()})`,
          quantity: line.quantity,
          unitPrice: line.unitPrice,
        };
      }
      return { productId: null, description: line.text ?? "Service", quantity: line.quantity, unitPrice: line.unitPrice };
    });

    const issueDate = daysAgo(spec.issued);
    const dueDate = daysAgo(spec.issued - 14);

    const result = expect(
      "invoice",
      await api<{ invoice: { id: string; number: string; total: number } }>("/invoices", {
        method: "POST",
        body: {
          customerId: customer.id,
          issueDate,
          dueDate,
          items,
          discount: spec.discount ?? 0,
          shipping: 0,
          status: spec.status ?? "sent",
        },
      }),
    );
    created += 1;

    if (spec.pay && spec.status !== "draft") {
      expect(
        `payment on ${result.invoice.number}`,
        await api(`/invoices/${result.invoice.id}/payments`, {
          method: "POST",
          body: {
            amount: Math.min(spec.pay, result.invoice.total),
            method: "transfer",
            reference: `SEED-${result.invoice.number}`,
            paidAt: issueDate,
          },
        }),
      );
    }
    console.log(`  • ${result.invoice.number} — total ₦${(result.invoice.total / 100).toLocaleString("en-NG")}`);
  }

  // A waybill against the oldest *sent* invoice, already delivered. A draft has
  // not been issued yet, so shipping goods against one would be nonsense.
  const firstInvoice = await api<{ data: Array<{ id: string; customerId: string; number: string }> }>(
    "/invoices?status=sent&limit=1&sort=issue_date&dir=asc",
  );
  if (firstInvoice.ok && firstInvoice.body.data[0]) {
    const invoice = firstInvoice.body.data[0];
    const waybill = await api<{ waybill: { id: string; number: string } }>("/waybills", {
      method: "POST",
      body: {
        customerId: invoice.customerId,
        invoiceId: invoice.id,
        waybillDate: daysAgo(38),
        carrier: "GIG Logistics",
        destination: "12 Awolowo Road, Ikeja, Lagos",
        pieces: 2,
        items: [
          { description: "45 kVA UPS, fairly used", quantity: 2, serialNumber: "UPS-45-88213", weightKg: 180 },
        ],
      },
    });
    if (waybill.ok) {
      await api(`/waybills/${waybill.body.waybill.id}/status`, { method: "POST", body: { status: "in_transit" } });
      await api(`/waybills/${waybill.body.waybill.id}/status`, {
        method: "POST",
        body: { status: "delivered", note: "Signed by Amina Bello" },
      });
      created += 1;
      console.log(`  • ${waybill.body.waybill.number} — delivered against ${invoice.number}`);
    }
  }

  // A purchase order and its supplier payment.
  const supplier = ctx.suppliers[0];
  const supplierName = SUPPLIERS[0]?.name ?? "the supplier";
  if (supplier) {
    const po = expect(
      "purchase",
      await api<{ purchase: { id: string; number: string } }>("/purchases", {
        method: "POST",
        body: {
          supplierId: supplier.id,
          orderDate: daysAgo(30),
          dueDate: daysAgo(16),
          status: "received",
          items: [
            { productId: productAt("DL-BATT-200AH").id, description: "200 Ah tubular battery", quantity: 12, unitCost: 950_00 },
          ],
        },
      }),
    );
    created += 1;
    await api(`/purchases/${po.purchase.id}/payments`, {
      method: "POST",
      body: { amount: 5_000_00, method: "transfer", paidAt: daysAgo(20), reference: "SEED-PO" },
    });
    console.log(`  • ${po.purchase.number} — received from ${supplierName}`);
  }

  for (const expense of EXPENSES) {
    expect(
      `expense ${expense.description}`,
      await api("/expenses", {
        method: "POST",
        body: { expenseDate: daysAgo(Math.floor(Math.random() * 28)), ...expense },
      }),
    );
    created += 1;
  }
  console.log(`  • ${EXPENSES.length} expenses recorded`);
}

async function main(): Promise<void> {
  console.log(`Seeding DELGRA LTD demo data against ${BASE}\n`);
  try {
    await api("/health");
  } catch {
    throw new Error(`Cannot reach ${BASE}. Start the Worker first with \`npm run dev\`.`);
  }

  await ensureOwner();
  await configureBusiness();
  const directory = await seedDirectory();
  await seedTransactions(directory);

  console.log(`\nDone. ${created} records created, ${skipped} already existed.`);
  console.log(`Sign in at the frontend with ${EMAIL} / ${PASSWORD}`);
}

main().catch((error: unknown) => {
  console.error(`\n✗ ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
