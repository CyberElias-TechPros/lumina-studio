import { Hono } from "hono";
import { cors } from "hono/cors";
import { sendError } from "./lib/errors";
import type { AppEnv } from "./types";
import { rbacGuard } from "./lib/rbac";
import { flags } from "./routes/flags";
import { contact } from "./routes/contact";
import { auth } from "./routes/auth";
import { programs } from "./routes/programs";
import { applications } from "./routes/applications";
import { courses } from "./routes/courses";
import { dashboard } from "./routes/dashboard";
import { assignments } from "./routes/assignments";
import { assessments } from "./routes/assessments";
import { calendar } from "./routes/calendar";
import { messages } from "./routes/messages";
import { instructor } from "./routes/instructor";
import { hr } from "./routes/hr";
import { finance } from "./routes/finance";
import { admin } from "./routes/admin";
import { notifications } from "./routes/notifications";
import { certificates } from "./routes/certificates";
import { payments } from "./routes/payments";
import { recruitment } from "./routes/recruitment";
import { marketing } from "./routes/marketing";
import { design } from "./routes/design";
import { localization } from "./routes/localization";
import { realtime } from "./routes/realtime";
import { live } from "./routes/live";
import { uploads } from "./routes/uploads";
import { ai } from "./routes/ai";
import { push } from "./routes/push";
import { library } from "./routes/library";
import { parent } from "./routes/parent";
import { mentor } from "./routes/mentor";
import { ops } from "./routes/ops";
import { it } from "./routes/it";
import { RealtimeRoom } from "./durable/realtime-room";

export { RealtimeRoom };

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
v1.use("*", rbacGuard);
v1.route("/auth", auth);
v1.route("/programs", programs);
v1.route("/applications", applications);
v1.route("/courses", courses);
v1.route("/dashboard", dashboard);
v1.route("/assignments", assignments);
v1.route("/assessments", assessments);
v1.route("/calendar", calendar);
v1.route("/messages", messages);
v1.route("/instructor", instructor);
v1.route("/hr", hr);
v1.route("/", finance);
v1.route("/admin", admin);
  v1.route("/notifications", notifications);
  v1.route("/certificates", certificates);
v1.route("/payments", payments);
v1.route("/recruitment", recruitment);
v1.route("/marketing", marketing);
v1.route("/design", design);
v1.route("/localization", localization);
v1.route("/realtime", realtime);
v1.route("/live", live);
v1.route("/uploads", uploads);
v1.route("/ai", ai);
v1.route("/push", push);
v1.route("/flags", flags);
v1.route("/contact", contact);
v1.route("/library", library);
  v1.route("/parent", parent);
  v1.route("/mentor", mentor);
  v1.route("/ops", ops);
  v1.route("/it", it);

/** Uptime + DB reachability check for deployment probes. */
v1.get("/health", async (c) => {
  await c.env.DB.prepare("SELECT 1").first();
  return c.json({ ok: true, time: new Date().toISOString(), db: "ok" });
});

app.route("/v1", v1);

app.notFound((c) => c.json({ error: { code: "NOT_FOUND", message: "Not found." } }, 404));
app.onError((err, c) => sendError(c, err));

export default app;
