import { env, exports } from "cloudflare:workers";
import initSql from "../migrations/0000_init.sql?raw";
import { seedContentSql } from "../seeds/content";
import type { Session } from "../src/schema/api";

export async function setupDb(): Promise<void> {
  const statements = initSql
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join(" ")
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  for (const statement of statements) {
    await env.DB.exec(statement);
  }
  for (const line of seedContentSql.split("\n")) {
    const statement = line.trim();
    if (statement.length === 0) continue;
    await env.DB.exec(statement);
  }
}

export function api(path: string, init?: RequestInit): Promise<Response> {
  return exports.default.fetch(`https://api.cea.test${path}`, init);
}

export async function createTestSession(
  email: string,
): Promise<{ token: string; session: Session }> {
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
  const body = (await verify.json()) as Session & { token: string };
  return { token: body.token, session: body };
}

export function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}
