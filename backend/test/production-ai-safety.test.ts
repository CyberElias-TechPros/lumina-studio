import { env } from "cloudflare:workers";
import { beforeAll, expect, it } from "vitest";
import { app } from "../src/index";
import type { AppEnv } from "../src/types";
import { cookieHeaders, createTestSession, setupDb } from "./helpers";

let student: string;
let instructor: string;
beforeAll(async () => {
  await setupDb();
  student = (await createTestSession("student@cea.ng")).cookie;
  instructor = (await createTestSession("instructor@cea.ng")).cookie;
});

it.each([
  ["/v1/ai/grade", "POST", "instructor", { rubric: [{ criterion: "Accuracy", max: 5 }] }],
  ["/v1/ai/recommendations", "GET", "student", null],
  ["/v1/ai/ask", "POST", "student", { question: "What is a file?" }],
  ["/v1/ai/generate", "POST", "instructor", { kind: "quiz", topic: "Files" }],
] as const)(
  "does not return fabricated output from %s in production",
  async (path, method, role, body) => {
    const res = await app.request(
      `https://api.cea.test${path}`,
      {
        method,
        headers: {
          ...cookieHeaders(role === "student" ? student : instructor),
          "Content-Type": "application/json",
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      },
      { ...env, APP_ENV: "production", AI_API_KEY: "" } as AppEnv,
    );
    expect(res.status).toBe(503);
    expect(await res.json()).toMatchObject({ error: { code: "AI_UNAVAILABLE" } });
  },
);
