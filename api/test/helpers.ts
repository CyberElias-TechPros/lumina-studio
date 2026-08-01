import { env, exports } from "cloudflare:workers";
import initSql from "../migrations/0000_init.sql?raw";
import lmsSql from "../migrations/0001_lms.sql?raw";
import studentLmsSql from "../migrations/0002_student_lms.sql?raw";
import domainSql from "../migrations/0003_domain.sql?raw";
import payrollSql from "../migrations/0004_payroll_payments.sql?raw";
import paymentsSql from "../migrations/0005_payments.sql?raw";
import phase4Sql from "../migrations/0006_phase4.sql?raw";
import { seedContentSql } from "../seeds/content";
import { seedLmsSql } from "../seeds/lms";
import { seedDomainSql } from "../seeds/domain";
import type { Session } from "../src/schema/api";

export const SESSION_COOKIE = "cea_session";

export async function setupDb(): Promise<void> {
  for (const sql of [
    initSql,
    lmsSql,
    studentLmsSql,
    domainSql,
    payrollSql,
    paymentsSql,
    phase4Sql,
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
  for (const line of seedContentSql.split("\n")) {
    const statement = line.trim();
    if (statement.length === 0) continue;
    await env.DB.exec(statement);
  }
  for (const line of seedLmsSql.split("\n")) {
    const statement = line.trim();
    if (statement.length === 0) continue;
    await env.DB.exec(statement);
  }
  for (const line of seedDomainSql.split("\n")) {
    const statement = line.trim();
    if (statement.length === 0) continue;
    await env.DB.exec(statement);
  }
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
