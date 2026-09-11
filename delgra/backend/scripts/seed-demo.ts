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
 *
 *   # local (default target http://127.0.0.1:8787/v1):
 *   npm run dev            # in one shell (wrangler dev --local on :8787)
 *   npm run seed:local     # in another
 *
 *   # a deployed Worker (migrations must already be applied -- see preflight):
 *   SEED_BASE_URL=https://<worker>.workers.dev/v1 \
 *   SEED_EMAIL=you@example.com \
 *   SEED_PASSWORD='<a real password, min 10 chars>' \
 *   npm run seed:remote -- --yes
 *
 *   # same, but let Cloudflare Workers AI write the catalog (customers,
 *   # suppliers, products, expenses) instead of the built-in one:
 *   SEED_USE_AI=1 \
 *   CLOUDFLARE_ACCOUNT_ID=<from the Cloudflare dashboard> \
 *   CLOUDFLARE_API_TOKEN=<token with the "Workers AI:Edit" permission> \
 *   SEED_EMAIL=... SEED_PASSWORD=... \
 *   npm run seed:remote -- --yes
 *
 * Environment variables (flags in brackets):
 *   SEED_BASE_URL     default http://127.0.0.1:8787/v1     (--base)
 *   SEED_EMAIL        default owner@delgra.test             (--email)
 *   SEED_PASSWORD     default Str0ngPass!2026               (--password)
 *   SEED_USE_AI       "1" to generate the catalog with Workers AI (--ai)
 *   CLOUDFLARE_ACCOUNT_ID                                 (--account)
 *   CLOUDFLARE_API_TOKEN  token with Workers AI:Edit       (--token)
 *   SEED_AI_MODEL     default @cf/meta/llama-3.3-70b-instruct-fp8-fast
 *   SEED_AI_BASE_URL  default https://api.cloudflare.com   (REST root, for tests)
 *   --yes             skip the confirmation prompt on remote targets
 *
 * Safety rails for remote targets: the seeder refuses the demo credentials
 * that ship in this repository (they are public) and asks before writing.
 *
 * Idempotent-ish: registration is skipped when the workspace already has an
 * owner, and customers/products are only created when the name/SKU is not
 * present yet. AI mode invents a fresh catalog on every run, so re-running it
 * adds a second batch rather than skipping.
 */

import { createInterface } from "node:readline/promises";
import process from "node:process";

/* ------------------------------------------------------------------ config */

function parseFlags(argv: string[]): Record<string, string | boolean> {
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg || !arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (next !== undefined && !next.startsWith("--")) {
      flags[key] = next;
      i += 1;
    } else {
      flags[key] = true;
    }
  }
  return flags;
}

const flags = parseFlags(process.argv.slice(2));

const BASE = String(flags.base ?? process.env.SEED_BASE_URL ?? "http://127.0.0.1:8787/v1").replace(/\/+$/, "");
const EMAIL = String(flags.email ?? process.env.SEED_EMAIL ?? "owner@delgra.test");
const PASSWORD = String(flags.password ?? process.env.SEED_PASSWORD ?? "Str0ngPass!2026");
const USE_AI = flags.ai === true || process.env.SEED_USE_AI === "1" || process.env.SEED_USE_AI === "true";
const AI_ACCOUNT = String(flags.account ?? process.env.CLOUDFLARE_ACCOUNT_ID ?? "");
const AI_TOKEN = String(flags.token ?? process.env.CLOUDFLARE_API_TOKEN ?? "");
const AI_MODEL = String(process.env.SEED_AI_MODEL ?? "@cf/meta/llama-3.3-70b-instruct-fp8-fast");
const AI_REST_ROOT = String(process.env.SEED_AI_BASE_URL ?? "https://api.cloudflare.com").replace(/\/+$/, "");

/** Credentials that ship in this repository — never acceptable on a remote. */
const PUBLIC_PASSWORDS = new Set(["Str0ngPass!2026", "demo-password-123"]);

function isLocalBase(base: string): boolean {
  try {
    const host = new URL(base).hostname;
    return host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "[::1]";
  } catch {
    return false;
  }
}

const REMOTE = !isLocalBase(BASE);

let created = 0;
let skipped = 0;

/* --------------------------------------------------------------- transport */

interface ApiResponse<T> {
  ok: boolean;
  status: number;
  body: T & { error?: { code: string; message: string; fields?: Record<string, string> } };
}

let cookie = "";

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

  // Capture the session cookie the Worker sends back on login/register.
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
      ? `${result.body.error.message}${result.body.error.fields ? ` ${JSON.stringify(result.body.error.fields)}` : ""}`
      : JSON.stringify(result.body);
    throw new Error(`${label} failed (HTTP ${result.status}): ${detail}`);
  }
  return result.body;
}

/* ----------------------------------------------------------------- catalog */

interface CustomerSeed {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  customerType: "individual" | "company" | "government";
  addressLine1: string;
  city: string;
  state: string;
}

interface SupplierSeed {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  state: string;
}

interface ProductSeed {
  sku: string;
  name: string;
  category: string;
  conditionGrade: "new" | "grade_a" | "grade_b" | "grade_c" | "grade_d";
  unit: string;
  costPrice: number; // kobo
  salePrice: number; // kobo
  quantity: number;
  reorderLevel: number;
}

interface ExpenseSeed {
  category: string;
  description: string;
  amount: number; // kobo
}

interface Catalog {
  customers: CustomerSeed[];
  suppliers: SupplierSeed[];
  products: ProductSeed[];
  expenses: ExpenseSeed[];
}

/**
 * Deterministic opening stock for the first six products. The transaction plan
 * below consumes indexes 0–5 in known quantities, so stock must be guaranteed
 * regardless of what the catalog generator produced — an AI-generated quantity
 * of 1 on a product the demo sells 3 of would fail mid-seed.
 */
const STOCK_PATTERN = [3, 6, 2, 4, 12, 1, 5, 8];

function builtinCatalog(): Catalog {
  return {
    customers: [
      {
        name: "TechFarms",
        contactPerson: "",
        email: "",
        phone: "",
        customerType: "company",
        addressLine1: "",
        city: "",
        state: "",
      },
      {
        name: "Delta Power Systems Ltd",
        contactPerson: "Amina Bello",
        email: "accounts@deltapower.ng",
        phone: "+234 803 123 4567",
        customerType: "company",
        addressLine1: "12 Awolowo Road",
        city: "Ikeja",
        state: "Lagos",
      },
      {
        name: "Grace Okoye",
        contactPerson: "Grace Okoye",
        email: "grace.okoye@gmail.com",
        phone: "+234 706 555 8890",
        customerType: "individual",
        addressLine1: "",
        city: "Lekki",
        state: "Lagos",
      },
      {
        name: "Kaduna State Water Board",
        contactPerson: "Engr. Musa Danladi",
        email: "procurement@kswb.gov.ng",
        phone: "+234 802 441 7788",
        customerType: "government",
        addressLine1: "",
        city: "Kaduna",
        state: "Kaduna",
      },
    ],
    suppliers: [
      {
        name: "Alaba International Traders",
        contactPerson: "Chief Emeka",
        email: "",
        phone: "+234 805 220 1144",
        city: "Lagos",
        state: "Lagos",
      },
      {
        name: "Delta Imports UK",
        contactPerson: "Sam Whitfield",
        email: "sales@deltaimports.co.uk",
        phone: "+44 20 7946 0100",
        city: "London",
        state: "",
      },
    ],
    products: [
      { sku: "DL-UPS-45KVA", name: "45 kVA UPS, fairly used", category: "UPS", conditionGrade: "grade_a", unit: "unit", costPrice: 12_500_00, salePrice: 45_000_00, quantity: 3, reorderLevel: 1 },
      { sku: "DL-UPS-10KVA", name: "10 kVA UPS, fairly used", category: "UPS", conditionGrade: "grade_b", unit: "unit", costPrice: 3_800_00, salePrice: 12_500_00, quantity: 6, reorderLevel: 2 },
      { sku: "DL-GEN-100KVA", name: "100 kVA diesel generator", category: "Generators", conditionGrade: "grade_a", unit: "unit", costPrice: 48_000_00, salePrice: 79_500_00, quantity: 2, reorderLevel: 1 },
      { sku: "DL-INV-5KVA", name: "5 kVA inverter + battery set", category: "Inverters", conditionGrade: "grade_b", unit: "set", costPrice: 2_100_00, salePrice: 5_900_00, quantity: 4, reorderLevel: 2 },
      { sku: "DL-BATT-200AH", name: "200 Ah tubular battery", category: "Batteries", conditionGrade: "grade_c", unit: "unit", costPrice: 950_00, salePrice: 1_750_00, quantity: 12, reorderLevel: 4 },
      { sku: "DL-SRV-R720", name: "Dell PowerEdge R720 server", category: "Servers", conditionGrade: "grade_a", unit: "unit", costPrice: 2_600_00, salePrice: 6_400_00, quantity: 1, reorderLevel: 1 },
    ],
    expenses: [
      { category: "transport", description: "Diesel — generator delivery to Ikeja", amount: 285_00 },
      { category: "logistics", description: "GIG Logistics freight, Alaba to Ikeja", amount: 410_00 },
      { category: "tools", description: "Load-bank testing leads and multimeter", amount: 1_850_00 },
      { category: "repairs", description: "Fan and capacitor replacement, 10 kVA UPS", amount: 760_00 },
      { category: "rent", description: "Workshop rent, September", amount: 2_500_00 },
      { category: "customs", description: "Clearing duty, Delta Imports container", amount: 6_200_00 },
    ],
  };
}

/* ------------------------------------------- Workers AI catalog generation */

const AI_SYSTEM_PROMPT =
  "You generate realistic seed data for business software demos. " +
  "Reply with a single valid JSON object and nothing else — no markdown fences, no commentary.";

const AI_USER_PROMPT = `DELGRA LTD is a Nigerian trading company in Ikeja, Lagos that buys and resells fairly-used industrial and IT power equipment: UPS units, diesel generators, inverters, tubular batteries, and refurbished rack servers.

Generate seed data for its ledger as JSON with exactly these keys:

"customers": 6 entries — plausible Nigerian organisations and one individual, including one government body outside Lagos and one company named "TechFarms".
  Fields: name, contactPerson, email, phone (format "+234 803 123 4567"), customerType ("company" | "individual" | "government"), addressLine1, city, state.

"suppliers": 2 entries — one Lagos electronics-market trader, one overseas exporter.
  Fields: name, contactPerson, email, phone, city, state.

"products": 6 entries — one 45 kVA UPS, one 10 kVA UPS, one 100 kVA diesel generator, one inverter-and-battery set, one 200 Ah tubular battery, one refurbished rack server.
  Fields: name (say "fairly used" where apt), category, conditionGrade ("grade_a" | "grade_b" | "grade_c"), costPriceNaira (integer), salePriceNaira (integer, 2 to 4 times cost), description (one sentence).

"expenses": 6 entries — realistic running costs for this business in Nigeria.
  Fields: category (one of transport, logistics, rent, utilities, salaries, tools, repairs, marketing, bank-charges, customs, maintenance, other), description, amountNaira (integer).

Reply with the JSON object only.`;

interface AiChatResponse {
  success?: boolean;
  result?: { response?: unknown };
  errors?: unknown;
}

/** One Workers AI text-generation call, returning the parsed JSON payload. */
async function aiRun(model: string): Promise<unknown> {
  const response = await fetch(
    `${AI_REST_ROOT}/client/v4/accounts/${encodeURIComponent(AI_ACCOUNT)}/ai/run/${model}`,
    {
      method: "POST",
      headers: { authorization: `Bearer ${AI_TOKEN}`, "content-type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: AI_SYSTEM_PROMPT },
          { role: "user", content: AI_USER_PROMPT },
        ],
        max_tokens: 4096,
        temperature: 0.7,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from ${model}: ${(await response.text()).slice(0, 300)}`);
  }
  const body = (await response.json()) as AiChatResponse;
  const text = body.result?.response;
  if (!body.success || typeof text !== "string") {
    throw new Error(`no text from ${model}: ${JSON.stringify(body.errors ?? body).slice(0, 300)}`);
  }
  return extractJson(text, model);
}

/** Models wrap JSON in prose or fences often enough that exact parsing is naive. */
function extractJson(text: string, model: string): unknown {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) {
    throw new Error(`${model} replied without a JSON object: ${text.slice(0, 200)}`);
  }
  return JSON.parse(text.slice(start, end + 1));
}

/* --------------------------------------------- AI output validation/clamps */

const GRADES = new Set(["new", "grade_a", "grade_b", "grade_c", "grade_d"]);
const CUSTOMER_TYPES = new Set(["individual", "company", "government"]);
const EXPENSE_CATEGORIES = new Set([
  "transport", "logistics", "rent", "utilities", "salaries", "tools",
  "repairs", "marketing", "bank-charges", "customs", "maintenance", "other",
]);

function asRecord(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Naira in → kobo out, tolerant of "₦45,000" style strings. */
function kobo(value: unknown): number | null {
  const n =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value.replace(/[₦,\s]/g, ""))
        : Number.NaN;
  return Number.isFinite(n) && n > 0 ? Math.round(n * 100) : null;
}

function clampKobo(value: number, min: number, max: number): number {
  return Math.min(Math.max(Math.round(value), min), max);
}

function slugify(value: string): string {
  const slug = value.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 12);
  return slug || "ITEM";
}

/**
 * Turn whatever the model produced into a Catalog the rest of the seeder can
 * trust. Every free-text field is sanitised, every number clamped, every enum
 * defaulted — the model contributes realism, never arithmetic: quantities,
 * dates and which line item lands on which invoice stay deterministic so the
 * money and the stock ledger reconcile exactly as they do with the built-ins.
 */
function catalogFromAi(raw: unknown): Catalog {
  const root = asRecord(raw);

  const customersRaw = Array.isArray(root.customers) ? root.customers : [];
  if (customersRaw.length < 4) throw new Error(`expected at least 4 customers, got ${customersRaw.length}`);
  const customers: CustomerSeed[] = customersRaw.slice(0, 8).map((entry) => {
    const c = asRecord(entry);
    const name = text(c.name, 160);
    if (name.length < 2) throw new Error(`customer name missing or too short: ${JSON.stringify(c.name)}`);
    const email = text(c.email, 160);
    return {
      name,
      contactPerson: text(c.contactPerson, 120),
      email: /^\S+@\S+\.\S+$/.test(email) ? email : "",
      phone: text(c.phone, 32),
      customerType: (CUSTOMER_TYPES.has(String(c.customerType)) ? c.customerType : "company") as CustomerSeed["customerType"],
      addressLine1: text(c.addressLine1, 200),
      city: text(c.city, 80),
      state: text(c.state, 80),
    };
  });

  const suppliersRaw = Array.isArray(root.suppliers) ? root.suppliers : [];
  if (suppliersRaw.length < 1) throw new Error("expected at least 1 supplier");
  const suppliers: SupplierSeed[] = suppliersRaw.slice(0, 4).map((entry) => {
    const s = asRecord(entry);
    const name = text(s.name, 160);
    if (name.length < 2) throw new Error(`supplier name missing or too short: ${JSON.stringify(s.name)}`);
    const email = text(s.email, 160);
    return {
      name,
      contactPerson: text(s.contactPerson, 120),
      email: /^\S+@\S+\.\S+$/.test(email) ? email : "",
      phone: text(s.phone, 32),
      city: text(s.city, 80),
      state: text(s.state, 80),
    };
  });

  // The transaction plan consumes products 0–5, so six is the floor.
  const productsRaw = Array.isArray(root.products) ? root.products : [];
  if (productsRaw.length < 6) throw new Error(`expected at least 6 products, got ${productsRaw.length}`);
  const usedSkus = new Set<string>();
  const products: ProductSeed[] = productsRaw.slice(0, 8).map((entry, index) => {
    const p = asRecord(entry);
    const name = text(p.name, 180);
    if (name.length < 2) throw new Error(`product name missing or too short: ${JSON.stringify(p.name)}`);

    const category = text(p.category, 80) || "Equipment";
    let sku = `DL-${slugify(category)}-${String(index + 1).padStart(2, "0")}`;
    while (usedSkus.has(sku)) sku = `${sku}-X`;
    usedSkus.add(sku);

    // Cost: ₦500 – ₦50m (a 100 kVA generator is tens of millions). Sale: at
    // least cost + ₦10, at most 8× cost — the model contributes realism, the
    // clamp keeps the margin and magnitude sane.
    const cost = clampKobo(kobo(p.costPriceNaira) ?? 250_000_00, 50_000, 5_000_000_000);
    const proposedSale = kobo(p.salePriceNaira);
    const sale = proposedSale === null ? Math.round(cost * 2.5) : clampKobo(proposedSale, cost + 1_000, cost * 8);

    return {
      sku,
      name,
      category,
      conditionGrade: (GRADES.has(String(p.conditionGrade)) ? p.conditionGrade : "grade_b") as ProductSeed["conditionGrade"],
      unit: text(p.unit, 24) === "set" ? "set" : "unit",
      costPrice: cost,
      salePrice: sale,
      quantity: STOCK_PATTERN[index % STOCK_PATTERN.length] ?? 3,
      reorderLevel: Math.max(1, Math.ceil((STOCK_PATTERN[index % STOCK_PATTERN.length] ?? 3) / 3)),
    };
  });

  const expensesRaw = Array.isArray(root.expenses) ? root.expenses : [];
  if (expensesRaw.length < 4) throw new Error(`expected at least 4 expenses, got ${expensesRaw.length}`);
  const expenses: ExpenseSeed[] = expensesRaw.slice(0, 10).map((entry) => {
    const e = asRecord(entry);
    const description = text(e.description, 500);
    if (description.length < 2) throw new Error(`expense description missing: ${JSON.stringify(e.description)}`);
    const amount = clampKobo(kobo(e.amountNaira) ?? 15_000_00, 100_00, 1_000_000_000); // ₦100 – ₦10m
    return {
      category: EXPENSE_CATEGORIES.has(String(e.category)) ? String(e.category) : "other",
      description,
      amount: Math.round(amount / 100) * 100, // whole naira
    };
  });

  return { customers, suppliers, products, expenses };
}

/**
 * The catalog to seed: Workers AI when asked (falling back to the built-ins on
 * any failure — a demo that seeds with fixed data beats one that doesn't run),
 * the built-ins otherwise.
 */
async function buildCatalog(): Promise<{ catalog: Catalog; source: string }> {
  if (!USE_AI) return { catalog: builtinCatalog(), source: "built-in" };

  try {
    let parsed: unknown;
    try {
      parsed = await aiRun(AI_MODEL);
    } catch {
      // One retry on a smaller, universally available model — the default may
      // not be enabled on every account.
      parsed = await aiRun("@cf/meta/llama-3.1-8b-instruct");
    }
    const catalog = catalogFromAi(parsed);
    return {
      catalog,
      source:
        `Workers AI (${AI_MODEL}) — ` +
        `${catalog.customers.length} customers, ${catalog.suppliers.length} suppliers, ` +
        `${catalog.products.length} products, ${catalog.expenses.length} expenses`,
    };
  } catch (err) {
    console.warn(
      `⚠ Workers AI did not produce a usable catalog (${err instanceof Error ? err.message : String(err)}); ` +
        `using the built-in catalog instead.`,
    );
    return { catalog: builtinCatalog(), source: "built-in (Workers AI failed)" };
  }
}

/* ------------------------------------------------------------------- owner */

async function preflight(): Promise<{ needsOwner: boolean }> {
  try {
    await api("/health");
  } catch {
    throw new Error(
      `Cannot reach ${BASE}. Start the Worker first (\`npm run dev\` locally), ` +
        `or check the URL and that the Worker is deployed.`,
    );
  }

  const bootstrap = await api<{ needsOwner: boolean }>("/bootstrap");
  if (!bootstrap.ok) {
    throw new Error(
      `/bootstrap answered HTTP ${bootstrap.status} — the database behind this Worker is ` +
        `usually not migrated yet (\`wrangler deploy\` publishes code, never schema). ` +
        `Run \`npx wrangler d1 migrations apply DB --remote\` first ` +
        `(or \`npm run db:migrate:local\` against a local Worker), then re-run the seeder. ` +
        `Server said: ${bootstrap.body.error?.message ?? JSON.stringify(bootstrap.body).slice(0, 200)}`,
    );
  }
  return { needsOwner: bootstrap.body.needsOwner };
}

async function ensureOwner(bootstrap: { needsOwner: boolean }): Promise<void> {
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
        `Pass SEED_EMAIL/SEED_PASSWORD for the existing account, or seed a fresh workspace.`,
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

/* --------------------------------------------------------------- directory */

interface Named {
  id: string;
}

async function seedDirectory(catalog: Catalog): Promise<{ customers: Named[]; products: Named[]; suppliers: Named[] }> {
  const customers: Named[] = [];
  for (const customer of catalog.customers) {
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
  for (const supplier of catalog.suppliers) {
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
  for (const product of catalog.products) {
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

/* ------------------------------------------------------------ transactions */

/** ISO date `daysAgo` days before today, in local time. */
function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  const offset = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 10);
}

async function seedTransactions(
  catalog: Catalog,
  ctx: { customers: Named[]; products: Named[]; suppliers: Named[] },
): Promise<void> {
  const productAt = (index: number) => {
    const spec = catalog.products[index];
    const createdProduct = ctx.products[index];
    if (!spec || !createdProduct) throw new Error(`Seed product index out of range: ${index}`);
    return { ...spec, id: createdProduct.id };
  };

  // (customer index, line items — product index or free text, issued N days ago,
  // share of the total to pay on issue). Products are referenced by *index into
  // the catalog*, not SKU, so an AI-generated catalog drops straight in.
  const invoices: Array<{
    customer: number;
    issued: number;
    lines: Array<{ product?: number; text?: string; quantity: number }>;
    payShare?: number;
    status?: "draft" | "sent";
  }> = [
    {
      customer: 0, // TechFarms — reproduces the real invoice DEL-2026-TF-01
      issued: 40,
      lines: [
        { product: 0, quantity: 1 },
        { text: "Installation and load testing", quantity: 1 },
      ],
      payShare: 1,
    },
    {
      customer: 2,
      issued: 22,
      lines: [
        { product: 3, quantity: 1 },
        { product: 4, quantity: 4 },
      ],
      payShare: 1,
    },
    {
      customer: 3,
      issued: 16,
      lines: [{ product: 2, quantity: 1 }],
      payShare: 0.4,
    },
    {
      customer: 1,
      issued: 6,
      lines: [{ product: 1, quantity: 3 }],
    },
    {
      customer: 2,
      issued: 0,
      lines: [{ product: 5, quantity: 1 }],
      status: "draft",
    },
  ];

  // The first spec is the TechFarms invoice — the waybill below attaches to it.
  let firstInvoice: { id: string; number: string; customerId: string } | null = null;

  for (const spec of invoices) {
    const customer = ctx.customers[spec.customer];
    if (!customer) throw new Error(`Seed customer index out of range: ${spec.customer}`);

    const items = spec.lines.map((line) => {
      if (line.product !== undefined) {
        const product = productAt(line.product);
        return {
          productId: product.id,
          // Every seeded product is used stock, so the grade always belongs on the line.
          description: `${product.name} (${product.conditionGrade.replace("_", " ").toUpperCase()})`,
          quantity: line.quantity,
          unitPrice: product.salePrice,
        };
      }
      // Installation / load testing — 10% of the flagship product's price, but
      // never below the built-in demo's flat ₦15,000.
      const installation = Math.max(15_000_00, Math.round(productAt(0).salePrice * 0.1));
      return {
        productId: null,
        description: line.text ?? "Service",
        quantity: line.quantity,
        unitPrice: installation,
      };
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
          discount: 0,
          shipping: 0,
          status: spec.status ?? "sent",
        },
      }),
    );
    created += 1;
    if (!firstInvoice) {
      firstInvoice = { id: result.invoice.id, number: result.invoice.number, customerId: customer.id };
    }

    if (spec.payShare && spec.status !== "draft" && result.invoice.total > 0) {
      expect(
        `payment on ${result.invoice.number}`,
        await api(`/invoices/${result.invoice.id}/payments`, {
          method: "POST",
          body: {
            amount: Math.min(Math.round(result.invoice.total * spec.payShare), result.invoice.total),
            method: "transfer",
            reference: `SEED-${result.invoice.number}`,
            paidAt: issueDate,
          },
        }),
      );
    }
    console.log(`  • ${result.invoice.number} — total ₦${(result.invoice.total / 100).toLocaleString("en-NG")}`);
  }

  // A delivered waybill against the first invoice — the TechFarms delivery.
  // (Picking it out of the creation loop rather than re-querying: the list
  // endpoint's `status=sent` filter matches the *derived* status, so a paid
  // invoice no longer answers that query and the waybill used to land on
  // whatever invoice happened to still be unpaid.)
  if (firstInvoice) {
    const first = productAt(0);
    const firstCustomer = catalog.customers[0];
    const destination = `${firstCustomer?.name ?? "Customer"}, ${firstCustomer?.city || "Lagos"}`;
    const waybill = await api<{ waybill: { id: string; number: string } }>("/waybills", {
      method: "POST",
      body: {
        customerId: firstInvoice.customerId,
        invoiceId: firstInvoice.id,
        waybillDate: daysAgo(38),
        carrier: "GIG Logistics",
        destination,
        pieces: 2,
        items: [
          { description: first.name, quantity: 1, serialNumber: `${first.sku}-88213`, weightKg: 180 },
        ],
      },
    });
    if (waybill.ok) {
      await api(`/waybills/${waybill.body.waybill.id}/status`, { method: "POST", body: { status: "in_transit" } });
      await api(`/waybills/${waybill.body.waybill.id}/status`, {
        method: "POST",
        body: { status: "delivered", note: "Signed for at reception" },
      });
      created += 1;
      console.log(`  • ${waybill.body.waybill.number} — delivered against ${firstInvoice.number}`);
    }
  }

  // A purchase order and its supplier payment.
  const supplier = ctx.suppliers[0];
  const supplierName = catalog.suppliers[0]?.name ?? "the supplier";
  if (supplier) {
    const batteries = productAt(4);
    const po = expect(
      "purchase",
      await api<{ purchase: { id: string; number: string; total: number } }>("/purchases", {
        method: "POST",
        body: {
          supplierId: supplier.id,
          orderDate: daysAgo(30),
          dueDate: daysAgo(16),
          status: "received",
          items: [
            { productId: batteries.id, description: batteries.name, quantity: 12, unitCost: batteries.costPrice },
          ],
        },
      }),
    );
    created += 1;
    if (po.purchase.total > 0) {
      await api(`/purchases/${po.purchase.id}/payments`, {
        method: "POST",
        body: {
          amount: Math.min(Math.round(po.purchase.total * 0.45), po.purchase.total),
          method: "transfer",
          paidAt: daysAgo(20),
          reference: "SEED-PO",
        },
      });
    }
    console.log(`  • ${po.purchase.number} — received from ${supplierName}`);
  }

  for (const expense of catalog.expenses) {
    expect(
      `expense ${expense.description}`,
      await api("/expenses", {
        method: "POST",
        body: { expenseDate: daysAgo(Math.floor(Math.random() * 28)), ...expense },
      }),
    );
    created += 1;
  }
  console.log(`  • ${catalog.expenses.length} expenses recorded`);
}

/* -------------------------------------------------------------------- main */

async function confirmRemoteTarget(): Promise<void> {
  if (flags.yes === true) return;
  if (!process.stdin.isTTY) {
    throw new Error(
      `${BASE} is a remote Worker. Pass --yes to seed it (the script writes demo data to a live workspace).`,
    );
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(
    `About to seed demo data against the REMOTE Worker ${BASE}.\nContinue? Type "yes" to proceed: `,
  );
  rl.close();
  if (answer.trim().toLowerCase() !== "yes") {
    throw new Error("Aborted — nothing was written.");
  }
}

async function main(): Promise<void> {
  console.log(`Seeding DELGRA LTD demo data against ${BASE}${REMOTE ? "  [REMOTE]" : ""}\n`);

  if (REMOTE) {
    if (EMAIL === "owner@delgra.test" || PUBLIC_PASSWORDS.has(PASSWORD)) {
      throw new Error(
        "Refusing to seed a remote Worker with credentials that ship in this repository " +
          "(owner@delgra.test / the demo passwords are public). Set SEED_EMAIL and SEED_PASSWORD " +
          "to the real owner account — or credentials for the owner you want to create.",
      );
    }
    await confirmRemoteTarget();
  }

  if (USE_AI) {
    if (!AI_ACCOUNT || !AI_TOKEN) {
      throw new Error(
        "SEED_USE_AI=1 needs CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN. " +
          "Create a token with the \"Workers AI:Edit\" permission at " +
          "https://dash.cloudflare.com/profile/api-tokens and find the account id " +
          "on the Workers & Pages overview (or `npx wrangler whoami`).",
      );
    }
    console.log("Asking Cloudflare Workers AI to write the catalog…\n");
  }

  const bootstrap = await preflight();
  const { catalog, source } = await buildCatalog();
  console.log(`Catalog: ${source}\n`);

  await ensureOwner(bootstrap);
  await configureBusiness();
  const directory = await seedDirectory(catalog);
  await seedTransactions(catalog, directory);

  console.log(`\nDone. ${created} records created, ${skipped} already existed.`);
  console.log(`Sign in at the frontend with ${EMAIL} and the password you set.`);
}

main().catch((error: unknown) => {
  console.error(`\n✗ ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
