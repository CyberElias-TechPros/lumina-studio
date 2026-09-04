import { SELF, env } from "cloudflare:test";
import schema from "../migrations/0001_init.sql?raw";

/**
 * Test harness.
 *
 * Migrations are applied to the real Miniflare D1 instance the Workers pool
 * provisions, so every test exercises the actual schema, constraints and SQL —
 * nothing is stubbed. `?raw` pulls the migration file in as text, which means a
 * schema change breaks the suite immediately instead of drifting silently.
 *
 * Requests go through `SELF.fetch`, i.e. the real Worker entry point including
 * CORS, the session gate, RBAC and the error boundary.
 */
export async function migrate(): Promise<void> {
  for (const statement of splitSql(schema)) {
    await env.DB.prepare(statement).run();
  }
}

/**
 * Split a migration file into statements.
 *
 * Full-line comments are stripped *before* splitting on semicolons — splitting
 * first would attach a `-- banner` comment to the following statement, and then
 * filtering out chunks that begin with `--` silently deletes the table that
 * followed it. Inline trailing comments are left alone; SQLite terminates them at
 * the newline.
 */
export function splitSql(sql: string): string[] {
  const withoutComments = sql
    .split(/\r?\n/)
    .filter((line) => !/^\s*--/.test(line))
    .join("\n");

  return withoutComments
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/** Wipe every table so each suite starts from a known state. */
export async function reset(): Promise<void> {
  const tables = [
    "audit_log", "share_links", "documents", "expenses", "purchase_payments", "purchase_items",
    "purchases", "waybill_items", "waybills", "payments", "invoice_items", "invoices",
    "stock_movements", "products", "suppliers", "customers", "sessions", "users", "counters",
  ];
  for (const table of tables) {
    await env.DB.prepare(`DELETE FROM ${table}`).run();
  }
  await env.DB.prepare(`DELETE FROM business`).run();
  await env.DB.prepare(
    `INSERT INTO business (id, name, created_at, updated_at) VALUES ('business', 'DELGRA LTD', ?, ?)`,
  )
    .bind(new Date().toISOString(), new Date().toISOString())
    .run();
}

/**
 * Convert naira to kobo for request bodies.
 *
 * The API speaks **integer kobo** in both directions; this helper keeps test
 * literals readable ("NGN(4500)") while making the unit explicit at every call
 * site, so a test cannot silently pass a naira value where kobo is expected.
 */
export const NGN = (naira: number): number => Math.round(naira * 100);

export const DEMO_EMAIL = "demo@delgra.test";
export const DEMO_PASSWORD = "demo-password-123";

export interface ApiOptions {
  body?: unknown;
  headers?: Record<string, string>;
}

/** Issue a request to the Worker as an anonymous caller. */
export async function call(path: string, init: { method?: string } & ApiOptions = {}): Promise<Response> {
  const headers: Record<string, string> = {
    origin: "http://localhost:5173",
    ...(init.headers ?? {}),
  };
  // FormData is passed through untouched so multipart uploads are exercised for
  // real; anything else is JSON-encoded.
  let payload: string | FormData | undefined;
  if (init.body instanceof FormData) {
    payload = init.body;
  } else if (init.body !== undefined) {
    headers["content-type"] = "application/json";
    payload = JSON.stringify(init.body);
  }
  return SELF.fetch(`http://localhost${path}`, { method: init.method ?? "GET", headers, body: payload });
}

/** Issue a request carrying a session cookie. */
export async function authed(
  cookie: string,
  path: string,
  init: { method?: string } & ApiOptions = {},
): Promise<Response> {
  return call(path, { ...init, headers: { cookie, ...(init.headers ?? {}) } });
}

/**
 * Sign in and return the session cookie.
 *
 * The demo-login shortcut is gated on APP_ENV !== "production"; the test config
 * pins APP_ENV="test", so this exercises the real password verification and
 * session issuance paths rather than a bypass.
 */
export async function signIn(email = DEMO_EMAIL, password = DEMO_PASSWORD): Promise<string> {
  const res = await call("/v1/auth/login", {
    method: "POST",
    body: { email, password },
  });
  if (res.status !== 200) throw new Error(`sign in failed: ${res.status} ${await res.text()}`);
  const cookie = res.headers.get("set-cookie") ?? "";
  const value = cookie.split(";")[0];
  if (!value) throw new Error("sign in returned no session cookie");
  return value;
}

/** Register a fresh workspace owner and return the session cookie. */
export async function registerOwner(
  input: { businessName?: string; name?: string; email?: string; password?: string } = {},
): Promise<string> {
  const res = await call("/v1/auth/register", {
    method: "POST",
    body: {
      businessName: input.businessName ?? "DELGRA LTD",
      name: input.name ?? "Elias Okon",
      email: input.email ?? `owner+${Math.random().toString(36).slice(2, 9)}@delgra.test`,
      password: input.password ?? "correct-horse-battery",
    },
  });
  if (res.status !== 201) throw new Error(`register failed: ${res.status} ${await res.text()}`);
  const cookie = (res.headers.get("set-cookie") ?? "").split(";")[0];
  if (!cookie) throw new Error("register returned no session cookie");
  return cookie;
}

export async function body<T = Record<string, any>>(res: Response): Promise<T> {
  return (await res.json()) as T;
}

/** Create a customer, returning its id. */
export async function makeCustomer(cookie: string, name = "Acme Ltd"): Promise<string> {
  const res = await authed(cookie, "/v1/customers", {
    method: "POST",
    body: { name, phone: "08030000000", city: "Lagos", customerType: "company" },
  });
  if (res.status !== 201) throw new Error(`create customer failed: ${res.status} ${await res.text()}`);
  return (await body<{ id: string }>(res)).id;
}

/** Create a tracked product, returning its id. */
export async function makeProduct(
  cookie: string,
  opts: { sku?: string; quantity?: number; salePrice?: number; costPrice?: number; trackStock?: boolean } = {},
): Promise<string> {
  const res = await authed(cookie, "/v1/products", {
    method: "POST",
    body: {
      sku: opts.sku ?? `UPS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      name: "Fairly Used UPS 45kVA",
      category: "Power",
      conditionGrade: "grade_a",
      costPrice: opts.costPrice ?? NGN(300_000),
      salePrice: opts.salePrice ?? NGN(450_000),
      quantity: opts.quantity ?? 5,
      reorderLevel: 2,
      trackStock: opts.trackStock ?? true,
    },
  });
  if (res.status !== 201) throw new Error(`create product failed: ${res.status} ${await res.text()}`);
  return (await body<{ id: string }>(res)).id;
}

/** Create an invoice in one call, returning the serialised invoice. */
export async function makeInvoice(
  cookie: string,
  overrides: Record<string, unknown> = {},
): Promise<Record<string, any>> {
  const customerId = (overrides.customerId as string) ?? (await makeCustomer(cookie));
  const today = new Date().toISOString().slice(0, 10);
  const res = await authed(cookie, "/v1/invoices", {
    method: "POST",
    body: {
      customerId,
      issueDate: today,
      dueDate: today,
      items: [{ description: "Fairly Used UPS 45kVA", quantity: 1, unitPrice: NGN(450_000) }],
      status: "sent",
      ...overrides,
    },
  });
  if (res.status !== 201) throw new Error(`create invoice failed: ${res.status} ${await res.text()}`);
  return (await body<{ invoice: Record<string, any> }>(res)).invoice;
}
