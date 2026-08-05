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
  ]) {
    const statements = sql
      .split("\n")
      .filter((line) => !line.trim().startsWith("--"))
      .join(" ")
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    for (const statement of statements) {
      await env.DB.exec(statement);
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
