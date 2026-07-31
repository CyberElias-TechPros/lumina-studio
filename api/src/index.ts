import { Hono } from "hono";
import { cors } from "hono/cors";
import { sendError } from "./lib/errors";
import type { AppEnv } from "./types";
import { flags } from "./routes/flags";
import { auth } from "./routes/auth";
import { programs } from "./routes/programs";
import { applications } from "./routes/applications";
import { courses } from "./routes/courses";
import { dashboard } from "./routes/dashboard";

const app = new Hono<{ Bindings: AppEnv }>();

app.use(
  "*",
  cors({
    origin: (origin, c) => {
      const allowed = (c.env.FRONTEND_ORIGINS ?? "")
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
      if (allowed.length === 0) return origin ?? "";
      return allowed.includes(origin) ? origin : "";
    },
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    maxAge: 86_400,
  }),
);

const v1 = new Hono<{ Bindings: AppEnv }>();
v1.route("/auth", auth);
v1.route("/programs", programs);
v1.route("/applications", applications);
v1.route("/courses", courses);
v1.route("/dashboard", dashboard);
v1.route("/flags", flags);

app.route("/v1", v1);

app.notFound((c) => c.json({ error: { code: "NOT_FOUND", message: "Not found." } }, 404));
app.onError((err, c) => sendError(c, err));

export default app;
