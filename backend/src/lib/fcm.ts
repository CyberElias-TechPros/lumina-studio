import { ApiError } from "./errors";
import { base64UrlToBytes, bytesToBase64Url } from "./push";

const PROJECT = "cyber-elias-academy-app";
const OAUTH = "https://oauth2.googleapis.com/token";
const SEND = `https://fcm.googleapis.com/v1/projects/${PROJECT}/messages:send`;
const encoder = new TextEncoder();
const unavailable = () =>
  new ApiError(
    503,
    "NATIVE_PUSH_UNAVAILABLE",
    "Phone notification delivery is temporarily unavailable.",
  );

interface GoogleReply {
  access_token?: unknown;
  token_type?: unknown;
  name?: unknown;
  error?: { details?: unknown };
}
async function boundedJson(response: Response): Promise<GoogleReply | null> {
  if (!response.body) throw unavailable();
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const part = await reader.read();
    if (part.done) break;
    size += part.value.length;
    if (size > 32768) {
      await reader.cancel();
      throw unavailable();
    }
    chunks.push(part.value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return JSON.parse(new TextDecoder().decode(bytes)) as GoogleReply | null;
}

/** No configurable URLs and no credential/error-body logging. One token per bounded batch. */
export async function fcmAccessToken(
  secret: string | undefined,
  sender: typeof fetch = fetch,
): Promise<string> {
  try {
    if (!secret || secret.length > 16384) throw unavailable();
    const account = JSON.parse(secret);
    if (
      account.type !== "service_account" ||
      account.project_id !== PROJECT ||
      typeof account.client_email !== "string" ||
      !/^[a-zA-Z0-9-]+@cyber-elias-academy-app\.iam\.gserviceaccount\.com$/.test(
        account.client_email,
      ) ||
      typeof account.private_key !== "string" ||
      !account.private_key.startsWith("-----BEGIN PRIVATE KEY-----")
    )
      throw unavailable();
    const key = await crypto.subtle.importKey(
      "pkcs8",
      base64UrlToBytes(
        account.private_key
          .replace("-----BEGIN PRIVATE KEY-----", "")
          .replace("-----END PRIVATE KEY-----", "")
          .replace(/\s/g, ""),
      ),
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const now = Math.floor(Date.now() / 1000);
    const encode = (value: unknown) => bytesToBase64Url(encoder.encode(JSON.stringify(value)));
    const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({
      iss: account.client_email,
      scope: "https://www.googleapis.com/auth/firebase.messaging",
      aud: OAUTH,
      iat: now,
      exp: now + 3600,
    })}`;
    const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, encoder.encode(unsigned));
    const response = await sender(OAUTH, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(10000),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: `${unsigned}.${bytesToBase64Url(new Uint8Array(signature))}`,
      }),
    });
    const data = await boundedJson(response);
    if (
      !response.ok ||
      typeof data?.access_token !== "string" ||
      !/^[A-Za-z0-9._~+/-]{1,8192}$/.test(data.access_token) ||
      data.token_type !== "Bearer"
    )
      throw unavailable();
    return data.access_token;
  } catch {
    throw unavailable();
  }
}

export interface FcmOutcome {
  accepted: boolean;
  unregistered: boolean;
}
/** Fixed data-only hint. No titles, URLs, account IDs or private records are accepted. */
export async function sendFcmHint(
  token: string,
  accessToken: string,
  sender: typeof fetch = fetch,
): Promise<FcmOutcome> {
  try {
    const response = await sender(SEND, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(10000),
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          token,
          data: { type: "inbox_update" },
          android: { priority: "NORMAL", ttl: "0s", collapse_key: "cea-inbox" },
        },
      }),
    });
    const data = await boundedJson(response);
    // A 404 alone can mean a misconfigured project. Only the documented FCM
    // UNREGISTERED detail is permission to prune this exact stale token.
    const unregistered =
      response.status === 404 &&
      Array.isArray(data?.error?.details) &&
      data.error.details.some(
        (detail: { "@type"?: string; errorCode?: string } | null) =>
          detail?.["@type"] === "type.googleapis.com/google.firebase.fcm.v1.FcmError" &&
          detail?.errorCode === "UNREGISTERED",
      );
    return {
      accepted:
        response.ok &&
        typeof data?.name === "string" &&
        data.name.startsWith(`projects/${PROJECT}/messages/`),
      unregistered,
    };
  } catch {
    return { accepted: false, unregistered: false };
  }
}
