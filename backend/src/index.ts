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
import { mentorDashboard } from "./routes/mentorDashboard";
import { internDashboard } from "./routes/internDashboard";
import { supplierDashboard, partnerDashboard } from "./routes/supplierPartner";
import { volunteerDashboard, receptionistDashboard } from "./routes/volunteerReceptionist";
import { governmentDashboard } from "./routes/governmentDashboard";
import { behavioralDashboard } from "./routes/behavioralDashboard";
import { productMarketingDashboard } from "./routes/productMarketingDashboard";
import { alumniDashboard } from "./routes/alumniDashboard";
import { devDashboard } from "./routes/devDashboard";
import { growthDashboard } from "./routes/growthDashboard";
import { conversionCopyDashboard } from "./routes/conversionCopyDashboard";
import { departmentDashboard } from "./routes/departmentDashboard";
import { ngoDashboard } from "./routes/ngoDashboard";
import { clientDashboard } from "./routes/clientDashboard";
import { adminSystemsDashboard } from "./routes/adminSystemsDashboard";
import { directorDashboard } from "./routes/directorDashboard";
import { instructorExtrasDashboard } from "./routes/instructorExtrasDashboard";
import { admissionsExtrasDashboard } from "./routes/admissionsExtrasDashboard";
import { parentExtrasDashboard } from "./routes/parentExtrasDashboard";
import { hrTrainingDashboard } from "./routes/hrTrainingDashboard";
import { studentSelfDashboard } from "./routes/studentSelfDashboard";
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
v1.route("/mentor-dashboard", mentorDashboard);
v1.route("/intern-dashboard", internDashboard);
v1.route("/supplier-dashboard", supplierDashboard);
v1.route("/partner-dashboard", partnerDashboard);
v1.route("/volunteer-dashboard", volunteerDashboard);
v1.route("/receptionist-dashboard", receptionistDashboard);
v1.route("/government-dashboard", governmentDashboard);
v1.route("/behavioral-dashboard", behavioralDashboard);
v1.route("/product-marketing-dashboard", productMarketingDashboard);
v1.route("/alumni-dashboard", alumniDashboard);
v1.route("/dev-dashboard", devDashboard);
v1.route("/growth-dashboard", growthDashboard);
v1.route("/conversion-copy-dashboard", conversionCopyDashboard);
v1.route("/department-dashboard", departmentDashboard);
v1.route("/ngo-dashboard", ngoDashboard);
v1.route("/client-dashboard", clientDashboard);
v1.route("/admin-systems-dashboard", adminSystemsDashboard);
v1.route("/director-dashboard", directorDashboard);
v1.route("/instructor-extras-dashboard", instructorExtrasDashboard);
v1.route("/admissions-extras-dashboard", admissionsExtrasDashboard);
v1.route("/parent-extras-dashboard", parentExtrasDashboard);
v1.route("/hr-training-dashboard", hrTrainingDashboard);
v1.route("/student-self-dashboard", studentSelfDashboard);
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
