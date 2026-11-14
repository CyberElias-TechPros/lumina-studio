import { sha256Hex } from "./crypto";

/** Unpredictable tokens are returned only at issuance; persist a one-way lookup key. */
export async function invitationTokenKey(token: string): Promise<string> {
  return `sha256:${await sha256Hex(token)}`;
}
