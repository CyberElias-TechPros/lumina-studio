import { expect } from "@playwright/test";
import { test } from "./helpers";

/**
 * Engine-wide walk: sign in as admin (backend dashboards are requireAnyRole)
 * and verify every engine's role hubs and drill-downs render with the right
 * document titles. Covers the full 30-role actor map.
 */

async function walk(page: import("@playwright/test").Page, routes: [string, RegExp][]) {
  for (const [path, title] of routes) {
    await page.goto(path);
    await expect(page).toHaveTitle(title, { timeout: 20_000 });
  }
}

test.describe("Engine 1 — Learning (students, instructors, interns)", () => {
  test("student + instructor surfaces load for every hub", async ({ page, signIn }) => {
    await signIn("admin");
    await walk(page, [
      ["/app/learn", /Learning Hub/],
      ["/app/assignments", /Assignments/],
      ["/app/grades", /Gradebook/],
      ["/app/assessments", /Assessments/],
      ["/app/library", /Library/],
      ["/app/certificates", /Certificates/],
      ["/app/attendance", /Attendance/],
      ["/app/live", /Live Classes/],
      ["/app/instructor", /Instructor Dashboard/],
      ["/app/instructor/courses", /Course Builder/],
      ["/app/instructor/classes", /Class Schedule/],
      ["/app/instructor/grading-queue", /Grading Queue/],
    ]);
  });

  test("intern hub and tools load", async ({ page, signIn }) => {
    await signIn("admin");
    await walk(page, [
      ["/app/intern", /Intern Hub/],
      ["/app/intern/tasks", /Intern Tasks/],
      ["/app/intern/skills", /Skills Tracker/],
      ["/app/intern/timesheet", /Timesheet/],
      ["/app/intern/learning-plan", /Learning Plan/],
    ]);
  });
});

test.describe("Engine 2 — Career (employers, alumni, mentors)", () => {
  test("employer + alumni + mentor surfaces load", async ({ page, signIn }) => {
    await signIn("admin");
    await walk(page, [
      ["/app/employer/hub", /Employer Hub/],
      ["/app/employer/jobs", /Job Management/],
      ["/app/employer/talent", /Talent Search/],
      ["/app/alumni/hub", /Alumni Hub/],
      ["/app/alumni/jobs", /Alumni Job Board/],
      ["/app/alumni/network", /Alumni Network/],
      ["/app/mentor", /Mentor Dashboard/],
      ["/app/mentor/sessions", /Session Hub/],
      ["/app/mentor/requests", /Mentorship Requests/],
    ]);
  });
});

test.describe("Engine 3 — Services (client, dev, marketing, design, growth)", () => {
  test("services agency role surfaces load", async ({ page, signIn }) => {
    await signIn("admin");
    await walk(page, [
      ["/app/client", /Client Portal/],
      ["/app/client/support", /Support Tickets/],
      ["/app/client/projects/00000000-0000-4000-8000-000000000001", /Project Dashboard/],
      ["/app/dev", /Dev Hub/],
      ["/app/dev/deployments", /Deployments/],
      ["/app/dev/tasks", /Dev Tasks/],
      ["/app/marketing", /Marketing Hub/],
      ["/app/marketing/campaigns", /Campaigns/],
      ["/app/marketing/seo", /SEO/],
      ["/app/design", /Design Hub/],
      ["/app/design/tokens", /Design Tokens/],
      ["/app/design/prototypes", /Prototype Viewer/],
      ["/app/conversion-copy/analytics", /Conversion Analytics/],
      ["/app/growth", /Growth Hub/],
      ["/app/product-marketing", /Product Marketing Hub/],
      ["/app/behavioral-design", /Behavioral Design Hub/],
      ["/app/localization", /Localization Hub/],
    ]);
  });
});

test.describe("Engine 4 — ERP (admin, finance, HR, admissions, ops, IT, leadership)", () => {
  test("ERP admin + finance + HR + admissions surfaces load", async ({ page, signIn }) => {
    await signIn("admin");
    await walk(page, [
      ["/app/admin", /Admin Hub/],
      ["/app/admin/users", /User Management/],
      ["/app/admin/roles", /Roles & Permissions/],
      ["/app/accountant", /Finance Hub/],
      ["/app/finance/pay-verify", /Payment verification/],
      ["/app/hr", /HR Hub/],
      ["/app/hr/employees", /Employees/],
      ["/app/hr/payroll-input", /Payroll Input/],
      ["/app/admissions", /Admissions Hub/],
      ["/app/admissions/applications", /Applications/],
      ["/app/admissions/enrollment", /Enrollment/],
      ["/app/department", /Department Hub/],
      ["/app/department/curriculum", /Curriculum Manager/],
    ]);
  });

  test("ERP ops + IT + reception + supplier + leadership surfaces load", async ({ page, signIn }) => {
    await signIn("admin");
    await walk(page, [
      ["/app/ops", /Ops Hub/],
      ["/app/ops/inventory", /Inventory/],
      ["/app/ops/vendors", /Vendors/],
      ["/app/ops/facilities", /Facilities/],
      ["/app/it", /IT Hub/],
      ["/app/it/tickets", /Ticket Hub/],
      ["/app/it/assets", /Assets/],
      ["/app/it/monitoring", /Monitoring/],
      ["/app/receptionist", /Reception Hub/],
      ["/app/receptionist/check-in", /Visitor Check-In/],
      ["/app/receptionist/directory", /Staff Directory/],
      ["/app/supplier", /Supplier Hub/],
      ["/app/supplier/orders", /Orders/],
      ["/app/director", /Director Hub/],
      ["/app/director/command-center", /Command Center/],
      ["/app/director/okrs", /OKRs/],
    ]);
  });
});

test.describe("Engine 5 — Community (volunteers, NGOs, government, partners, parents)", () => {
  test("community role surfaces load", async ({ page, signIn }) => {
    await signIn("admin");
    await walk(page, [
      ["/app/volunteer", /Volunteer Hub/],
      ["/app/volunteer/opportunities", /Opportunities/],
      ["/app/volunteer/hours", /Hours Tracker/],
      ["/app/ngo", /Partnership Hub/],
      ["/app/ngo/programs", /Community Programs/],
      ["/app/ngo/scholarships", /Scholarships/],
      ["/app/government", /Compliance Portal/],
      ["/app/government/filings", /Filings/],
      ["/app/government/training", /Compliance Training/],
      ["/app/partner/hub", /Partner Hub/],
      ["/app/partner/agreements", /Agreements/],
      ["/app/partner/referrals", /Referrals/],
      ["/app/parent", /Parent Dashboard/],
    ]);
  });
});
