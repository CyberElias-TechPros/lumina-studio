import { env, exports } from "cloudflare:workers";
import initSql from "../migrations/0000_init.sql?raw";
import lmsSql from "../migrations/0001_lms.sql?raw";
import studentLmsSql from "../migrations/0002_student_lms.sql?raw";
import domainSql from "../migrations/0003_domain.sql?raw";
import payrollSql from "../migrations/0004_payroll_payments.sql?raw";
import paymentsSql from "../migrations/0005_payments.sql?raw";
import phase4Sql from "../migrations/0006_phase4.sql?raw";
import realtimeLiveSql from "../migrations/0007_realtime_live.sql?raw";
import pushSql from "../migrations/0008_push.sql?raw";
import accountSql from "../migrations/0009_account_security_and_actions.sql?raw";
import librarySql from "../migrations/0010_library.sql?raw";
import parentSql from "../migrations/0011_parent.sql?raw";
import mentorshipSql from "../migrations/0012_mentorship.sql?raw";
import attendanceSql from "../migrations/0013_attendance.sql?raw";
import opsSql from "../migrations/0014_ops.sql?raw";
import itSql from "../migrations/0015_it.sql?raw";
import mentorDashboardSql from "../migrations/0016_mentor_dashboard.sql?raw";
import internSql from "../migrations/0017_intern.sql?raw";
import supplierPartnerSql from "../migrations/0018_supplier_partner.sql?raw";
import volunteerReceptionistSql from "../migrations/0019_volunteer_receptionist.sql?raw";
import governmentSql from "../migrations/0020_government.sql?raw";
import behavioralSql from "../migrations/0021_behavioral.sql?raw";
import productMarketingSql from "../migrations/0022_product_marketing.sql?raw";
import alumniSql from "../migrations/0023_alumni.sql?raw";
import devSql from "../migrations/0024_dev.sql?raw";
import growthSql from "../migrations/0025_growth.sql?raw";
import conversionCopySql from "../migrations/0026_conversion_copy.sql?raw";
import departmentSql from "../migrations/0027_department.sql?raw";
import ngoSql from "../migrations/0028_ngo.sql?raw";
import clientSql from "../migrations/0029_client.sql?raw";
import adminSystemsSql from "../migrations/0030_admin_systems.sql?raw";
import directorSql from "../migrations/0031_director.sql?raw";
import instructorExtrasSql from "../migrations/0032_instructor_extras.sql?raw";
import admissionsExtrasSql from "../migrations/0033_admissions_extras.sql?raw";
import parentExtrasSql from "../migrations/0034_parent_extras.sql?raw";
import hrTrainingSql from "../migrations/0035_hr_training.sql?raw";
import studentSelfSql from "../migrations/0036_student_self.sql?raw";
import adminMetricsSql from "../migrations/0037_admin_system_metrics.sql?raw";
import parentInvitationsSql from "../migrations/0038_parent_invitations.sql?raw";
import ownershipSql from "../migrations/0039_ownership.sql?raw";
import submissionsColumnsSql from "../migrations/0040_submissions_columns.sql?raw";
import notificationReadsSql from "../migrations/0041_notification_reads.sql?raw";
import studentActionsSql from "../migrations/0042_student_actions.sql?raw";
import notificationPreferencesSql from "../migrations/0043_notification_preferences.sql?raw";
import volunteerSignupsSql from "../migrations/0044_volunteer_signups.sql?raw";
import volunteerSignupConstraintsSql from "../migrations/0045_volunteer_signup_constraints.sql?raw";
import receptionistActionsSql from "../migrations/0046_receptionist_actions.sql?raw";
import clientTicketOwnershipSql from "../migrations/0047_client_ticket_ownership.sql?raw";
import adminKeyRotationsSql from "../migrations/0048_admin_key_rotations.sql?raw";
import alumniEventRsvpsSql from "../migrations/0049_alumni_event_rsvps.sql?raw";
import alumniMentorshipSql from "../migrations/0050_alumni_mentorship_availability.sql?raw";
import mentorRequestTargetsSql from "../migrations/0051_mentor_request_targets.sql?raw";
import alumniConnectionsSql from "../migrations/0052_alumni_connections.sql?raw";
import backupRestoreRequestsSql from "../migrations/0053_backup_restore_requests.sql?raw";
import assessmentAttemptsSql from "../migrations/0054_assessment_attempts.sql?raw";
import enrollmentsSql from "../migrations/0055_enrollments.sql?raw";
import productionOpsSql from "../migrations/0056_production_ops.sql?raw";
import { seedContentSql } from "../seeds/content";
import { seedLmsSql } from "../seeds/lms";
import { seedDomainSql } from "../seeds/domain";
import { seedLibrarySql } from "../seeds/library";
import { seedExternalLinksSql } from "../seeds/external-links";
import { seedParentSql } from "../seeds/parent";
import { seedMentorSql } from "../seeds/mentor";
import { seedAttendanceSql } from "../seeds/attendance";
import { seedOpsSql } from "../seeds/ops";
import { seedItSql } from "../seeds/it";
import { seedMentorDashboardSql } from "../seeds/mentor-dashboard";
import { seedInternSql } from "../seeds/intern";
import { seedSupplierPartnerSql } from "../seeds/supplier-partner";
import { seedVolunteerReceptionistSql } from "../seeds/volunteer-receptionist";
import { seedGovernmentSql } from "../seeds/government";
import { seedBehavioralSql } from "../seeds/behavioral";
import { seedProductMarketingSql } from "../seeds/product-marketing";
import { seedAlumniSql } from "../seeds/alumni";
import { seedDevSql } from "../seeds/dev";
import { seedGrowthSql } from "../seeds/growth";
import { seedConversionCopySql } from "../seeds/conversion-copy";
import { seedDepartmentSql } from "../seeds/department";
import { seedNgoSql } from "../seeds/ngo";
import { seedClientSql } from "../seeds/client";
import { seedAdminSystemsSql } from "../seeds/admin-systems";
import { seedDirectorSql } from "../seeds/director";
import { seedInstructorExtrasSql } from "../seeds/instructor-extras";
import { seedAdmissionsExtrasSql } from "../seeds/admissions-extras";
import { seedParentExtrasSql } from "../seeds/parent-extras";
import { seedHrTrainingSql } from "../seeds/hr-training";
import { seedStudentSelfSql } from "../seeds/student-self";
import { seedAdminMetricsSql } from "../seeds/admin-metrics";
import type { Session } from "../src/schema/api";

export const SESSION_COOKIE = "cea_session";

const BATCH_SIZE = 100;

async function execStatements(sql: string): Promise<void> {
  const statements = sql
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("--"));
  for (let i = 0; i < statements.length; i += BATCH_SIZE) {
    await env.DB.exec(statements.slice(i, i + BATCH_SIZE).join("\n"));
  }
}

export async function setupDb(): Promise<void> {
  for (const sql of [
    initSql,
    lmsSql,
    studentLmsSql,
    domainSql,
    payrollSql,
    paymentsSql,
    phase4Sql,
    realtimeLiveSql,
    pushSql,
    accountSql,
    librarySql,
    parentSql,
    mentorshipSql,
    attendanceSql,
    opsSql,
    itSql,
    mentorDashboardSql,
    internSql,
    supplierPartnerSql,
    volunteerReceptionistSql,
    governmentSql,
    behavioralSql,
    productMarketingSql,
    alumniSql,
    devSql,
    growthSql,
    conversionCopySql,
    departmentSql,
    ngoSql,
    clientSql,
    adminSystemsSql,
    directorSql,
    instructorExtrasSql,
    admissionsExtrasSql,
    parentExtrasSql,
    hrTrainingSql,
    studentSelfSql,
    adminMetricsSql,
    parentInvitationsSql,
    ownershipSql,
    submissionsColumnsSql,
    notificationReadsSql,
    studentActionsSql,
    notificationPreferencesSql,
    volunteerSignupsSql,
    volunteerSignupConstraintsSql,
    receptionistActionsSql,
    clientTicketOwnershipSql,
    adminKeyRotationsSql,
    alumniEventRsvpsSql,
    alumniMentorshipSql,
    mentorRequestTargetsSql,
    alumniConnectionsSql,
    backupRestoreRequestsSql,
    assessmentAttemptsSql,
    enrollmentsSql,
    productionOpsSql,
  ]) {
    const statements = sql
      .split("\n")
      .filter((line) => !line.trim().startsWith("--"))
      .join(" ")
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    for (const statement of statements) {
      try {
        await env.DB.exec(statement);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (!message.includes("duplicate column name") && !message.includes("already exists")) {
          throw err;
        }
      }
    }
  }
  await execStatements(seedContentSql);
  await execStatements(seedLmsSql);
  await execStatements(seedDomainSql);
  await execStatements(seedLibrarySql);
  await execStatements(seedExternalLinksSql);
  await execStatements(seedParentSql);
  await execStatements(seedMentorSql);
  await execStatements(seedAttendanceSql);
  await execStatements(seedOpsSql);
  await execStatements(seedItSql);
  await execStatements(seedMentorDashboardSql);
  await execStatements(seedInternSql);
  await execStatements(seedSupplierPartnerSql);
  await execStatements(seedVolunteerReceptionistSql);
  await execStatements(seedGovernmentSql);
  await execStatements(seedBehavioralSql);
  await execStatements(seedProductMarketingSql);
  await execStatements(seedAlumniSql);
  await execStatements(seedDevSql);
  await execStatements(seedGrowthSql);
  await execStatements(seedConversionCopySql);
  await execStatements(seedDepartmentSql);
  await execStatements(seedNgoSql);
  await execStatements(seedClientSql);
  await execStatements(seedAdminSystemsSql);
  await execStatements(seedDirectorSql);
  await execStatements(seedInstructorExtrasSql);
  await execStatements(seedAdmissionsExtrasSql);
  await execStatements(seedParentExtrasSql);
  await execStatements(seedHrTrainingSql);
  await execStatements(seedStudentSelfSql);
  await execStatements(seedAdminMetricsSql);
}

export function api(path: string, init?: RequestInit): Promise<Response> {
  return exports.default.fetch(`https://api.cea.test${path}`, init);
}

/** Reads the session cookie value from a Set-Cookie header. */
export function sessionCookieFrom(response: Response): string | null {
  const setCookies = response.headers.getSetCookie();
  for (const header of setCookies) {
    const [pair = "", ...rest] = header.split(";");
    const [name = "", ...value] = pair.split("=");
    if (name.trim() === SESSION_COOKIE) return value.join("=").trim();
  }
  return null;
}

export async function createTestSession(
  email: string,
): Promise<{ session: Session; cookie: string }> {
  const magic = await api("/v1/auth/magic-link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (magic.status !== 201) throw new Error(`magic-link failed: ${magic.status}`);
  const { devToken } = (await magic.json()) as { devToken: string };
  if (!devToken) throw new Error("devToken missing — APP_ENV must not be production");

  const verify = await api(`/v1/auth/magic-link/verify?token=${encodeURIComponent(devToken)}`);
  if (verify.status !== 200) throw new Error(`verify failed: ${verify.status}`);
  const session = (await verify.json()) as Session;
  const cookie = sessionCookieFrom(verify);
  if (!cookie) throw new Error("verify did not set the session cookie");
  return { session, cookie };
}

export function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

export function cookieHeaders(cookie: string): HeadersInit {
  return { Cookie: `${SESSION_COOKIE}=${cookie}` };
}
