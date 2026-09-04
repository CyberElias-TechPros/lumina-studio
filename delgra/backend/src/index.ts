import { Hono } from "hono";
import { corsMiddleware, idempotency, requestId, securityHeaders } from "./lib/http.ts";
import { AppError, zodFields } from "./lib/errors.ts";
import { requireSession } from "./lib/auth.ts";
import { isProduction, type Env } from "./lib/env.ts";
import { z } from "zod";
import { isoNow } from "./lib/ids.ts";

import authRoutes from "./routes/auth.ts";
import dashboardRoutes from "./routes/dashboard.ts";
import customerRoutes from "./routes/customers.ts";
import productRoutes from "./routes/products.ts";
import supplierRoutes from "./routes/suppliers.ts";
import invoiceRoutes from "./routes/invoices.ts";
import waybillRoutes from "./routes/waybills.ts";
import purchaseRoutes from "./routes/purchases.ts";
import expenseRoutes from "./routes/expenses.ts";
import reportRoutes from "./routes/reports.ts";
import settingsRoutes from "./routes/settings.ts";
import userRoutes from "./routes/users.ts";
import documentRoutes from "./routes/documents.ts";
import shareRoutes, { shareLinks } from "./routes/share.ts";
import auditRoutes from "./routes/audit.ts";
import { scheduled } from "./cron.ts";

type AppEnv = { Bindings: Env; Variables: { user: import("./lib/env.ts").SessionUser; requestId: string } };

const app = new Hono<AppEnv>();

app.use("*", requestId());
app.use("*", securityHeaders());
app.use("/v1/*", corsMiddleware());

/* ------------------------------------------------------------------ public */

app.get("/", (c) =>
  c.json({
    name: "Delgra Ledger API",
    version: "1.0.0",
    docs: "/v1/health",
  }),
);

// Liveness + the schema version, so an operator can confirm migrations applied.
app.get("/v1/health", async (c) => {
  const started = Date.now();
  try {
    const row = await c.env.DB.prepare(
      `SELECT COUNT(*) AS tables FROM sqlite_master WHERE type = 'table'`,
    ).first<{ tables: number }>();
    return c.json({
      status: "ok",
      database: "connected",
      tables: row?.tables ?? 0,
      env: c.env.APP_ENV ?? "production",
      latencyMs: Date.now() - started,
      time: isoNow(),
    });
  } catch (err) {
    return c.json(
      { status: "degraded", database: "unreachable", env: c.env.APP_ENV ?? "production" },
      503,
    );
  }
});

/**
 * Public bootstrap probe: tells the frontend whether the workspace still needs
 * its first owner account, so signup can be offered instead of a dead login.
 */
app.get("/v1/bootstrap", async (c) => {
  const row = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM users WHERE is_active = 1`).first<{
    n: number;
  }>();
  const business = await c.env.DB.prepare(
    `SELECT name, currency_symbol AS currencySymbol FROM business WHERE id = 'business'`,
  ).first<{ name: string; currencySymbol: string }>();
  return c.json({
    needsOwner: (row?.n ?? 0) === 0,
    business: { name: business?.name ?? "DELGRA LTD", currencySymbol: business?.currencySymbol ?? "₦" },
    signupOpen: (row?.n ?? 0) === 0,
  });
});

// Auth endpoints and tokenised share links are the only other unauthenticated
// surface. Everything below the gate requires a live session.
app.route("/v1/auth", authRoutes);
app.route("/v1/share", shareRoutes);

/* -------------------------------------------------------------- protected */

const api = new Hono<AppEnv>();
api.use("*", requireSession());
api.use("*", idempotency());

api.route("/dashboard", dashboardRoutes);
api.route("/customers", customerRoutes);
api.route("/products", productRoutes);
api.route("/suppliers", supplierRoutes);
api.route("/invoices", invoiceRoutes);
api.route("/waybills", waybillRoutes);
api.route("/purchases", purchaseRoutes);
api.route("/expenses", expenseRoutes);
api.route("/reports", reportRoutes);
api.route("/settings", settingsRoutes);
api.route("/users", userRoutes);
api.route("/documents", documentRoutes);
api.route("/share-links", shareLinks);
api.route("/audit", auditRoutes);

app.route("/v1", api);

/* -------------------------------------------------------------- not found */

app.notFound((c) =>
  c.json({ error: { code: "not_found", message: "That endpoint does not exist.", requestId: c.get("requestId") } }, 404),
);

/* ----------------------------------------------------------- error handler */

/**
 * Single error boundary. Known AppErrors map to their status; Zod failures are
 * flattened to per-field messages; everything else becomes an opaque 500 whose
 * only client-visible detail is the request id (logged server-side).
 */
app.onError((err, c) => {
  const reqId = c.get("requestId");

  if (err instanceof z.ZodError) {
    return c.json(
      { error: { code: "validation_failed", message: "Some fields need attention.", fields: zodFields(err), requestId: reqId } },
      422,
    );
  }

  if (err instanceof AppError) {
    const body: Record<string, unknown> = {
      code: err.code,
      message: err.message,
      requestId: reqId,
    };
    if (err.fields) body.fields = err.fields;
    if (err.code === "rate_limited" && err.details) body.retryAfterSeconds = (err.details as { retryAfterSeconds?: number }).retryAfterSeconds;
    if (err.code === "rate_limited") {
      c.header("retry-after", String((err.details as { retryAfterSeconds?: number })?.retryAfterSeconds ?? 60));
    }
    return c.json({ error: body }, err.status as 400);
  }

  console.error(`[${reqId}] unhandled`, { name: err.name, message: err.message, stack: err.stack });
  return c.json(
    {
      error: {
        code: "internal_error",
        message: isProduction(c.env)
          ? "Something went wrong on our side."
          : `${err.name}: ${err.message}`,
        requestId: reqId,
      },
    },
    500,
  );
});

export default {
  fetch: app.fetch,
  scheduled,
};
