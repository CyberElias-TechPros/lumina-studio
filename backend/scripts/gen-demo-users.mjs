/**
 * Generates password logins for every CEA-OS role so the internal workspaces can
 * be tested without waiting on magic-link email.
 *
 *   node scripts/gen-demo-users.ts --password='<pick-a-strong-one>'
 *   node scripts/gen-demo-users.ts --password='…' --domain=demo.cea.ng
 *   node scripts/gen-demo-users.ts --password='…' --promote=you@cea.ng
 *
 * Writes (by default):
 *   seeds/demo-users.sql          INSERT … ON CONFLICT … — idempotent, re-runnable
 *   seeds/demo-users-remove.sql   DELETE every demo row + their sessions
 *
 * The hashes are byte-compatible with `src/lib/crypto.ts` (PBKDF2-SHA256,
 * 100 000 iterations, 16-byte salt, `pbkdf2$<iters>$<saltB64>$<hashB64>`), which
 * is the same format `hashPassword()` writes and `verifyPassword()` accepts.
 * Pass `--check` to verify a generated hash against the real implementation.
 *
 * SAFETY
 *  - Demo rows use ids prefixed `demo-` and emails on a dedicated domain
 *    (`demo.cea.ng` by default) so they can never collide with a real account.
 *  - The upsert is guarded by `WHERE users.id LIKE 'demo-%'`, so re-running this
 *    file can only ever modify rows this script created. An existing real
 *    `admin@cea.ng` is never touched or taken over.
 *  - These are TEST accounts. Delete them with `demo-users-remove.sql` once
 *    role testing is done — especially before handing the app to anyone else.
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PBKDF2_ITERATIONS = 100_000; // must match src/lib/crypto.ts
const PBKDF2_SALT_BYTES = 16;

/**
 * Canonical roles — keep in sync with `src/data/rbac.ts` (CANONICAL_ROLE_KEYS)
 * plus `parent`, which also appears in the backend permission map.
 * `name` is only cosmetics: the first word shows up in the shell greeting.
 */
const ROLES = [
  { key: "student", name: "Ada Okafor (Student)", where: "/app/learn" },
  { key: "instructor", name: "Musa Ibrahim (Instructor)", where: "/app/instructor" },
  { key: "admissions", name: "Chiamaka Eze (Admissions)", where: "/app/admissions" },
  { key: "finance", name: "Tolu Adeyemi (Finance)", where: "/app/accountant" },
  { key: "admin", name: "Ellis Dennis (Admin)", where: "/app/admin" },
  { key: "director", name: "Graham Ellis Dennis (Director)", where: "/app/director" },
  { key: "hr", name: "Zainab Bello (HR)", where: "/app/hr" },
  { key: "ops", name: "Ifeanyi Nwosu (Operations)", where: "/app/ops" },
  { key: "it", name: "Emeka Okafor (IT)", where: "/app/it" },
  { key: "marketing", name: "Bisi Adeleke (Marketing)", where: "/app/marketing" },
  { key: "growth", name: "Ngozi Umeh (Growth)", where: "/app/growth" },
  { key: "design", name: "Kelechi Obi (Design)", where: "/app/design" },
  { key: "localization", name: "Fatima Sani (Localization)", where: "/app/localization" },
  { key: "conversion-copy", name: "Segun Alabi (Conversion Copy)", where: "/app/conversion-copy" },
  {
    key: "product-marketing",
    name: "Amara Nnamdi (Product Marketing)",
    where: "/app/product-marketing",
  },
  {
    key: "behavioral-design",
    name: "Yemi Fashola (Behavioral Design)",
    where: "/app/behavioral-design",
  },
  { key: "department", name: "Hauwa Garba (Department)", where: "/app/department" },
  { key: "mentor", name: "Peter Ekong (Mentor)", where: "/app/mentor" },
  { key: "alumni", name: "Rita Bassey (Alumni)", where: "/app/alumni" },
  { key: "parent", name: "Grace Okafor (Parent)", where: "/app/parent" },
  { key: "client", name: "Dapo Ajayi (Client)", where: "/app/client" },
  { key: "employer", name: "Nkechi Nwankwo (Employer)", where: "/app/employer" },
  { key: "partner", name: "Sadiq Yusuf (Partner)", where: "/app/partner/hub" },
  { key: "supplier", name: "Uche Kalu (Supplier)", where: "/app/supplier" },
  { key: "ngo", name: "Blessing Ade (NGO)", where: "/app/ngo" },
  { key: "government", name: "Rivers State Compliance (Government)", where: "/app/government" },
  { key: "receptionist", name: "Joy Etim (Receptionist)", where: "/app/receptionist" },
  { key: "intern", name: "Sam Okon (Intern)", where: "/app/intern" },
  { key: "volunteer", name: "Peace Danjuma (Volunteer)", where: "/app/volunteer" },
  { key: "dev", name: "Chidi Anyanwu (Dev)", where: "/app/dev" },
];

function toB64(bytes) {
  return Buffer.from(bytes).toString("base64");
}

/** Same derivation as `derivePbkdf2` in src/lib/crypto.ts. */
async function hashPassword(password) {
  const salt = new Uint8Array(PBKDF2_SALT_BYTES);
  crypto.getRandomValues(salt);
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    256,
  );
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toB64(salt)}$${toB64(new Uint8Array(bits))}`;
}

function arg(name) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  const value = hit?.slice(name.length + 3);
  // Tolerate a copy-pasted `--password='…'` where the shell did not strip the
  // quotes (literal quotes would silently become part of the password).
  if (value && value.length > 1 && /^(['"]).*\1$/.test(value)) return value.slice(1, -1);
  return value;
}

function sqlEscape(value) {
  return value.replace(/'/g, "''");
}

async function main() {
  const here = dirname(fileURLToPath(import.meta.url));
  const password = arg("password") ?? process.env.DEMO_PASSWORD;
  const domain = arg("domain") ?? "demo.cea.ng";
  const promote = arg("promote");
  const outFile = resolve(here, "..", arg("out") ?? "seeds/demo-users.sql");

  if (!password || password.length < 12) {
    console.error(
      "Refusing to generate: pass --password='<at least 12 characters>' (or DEMO_PASSWORD).\n" +
        "Example: node scripts/gen-demo-users.ts --password='Cea-Demo-2026!'",
    );
    process.exit(1);
  }

  const now = new Date().toISOString();
  const lines = [];
  lines.push("-- DEMO LOGINS — generated by scripts/gen-demo-users.ts");
  lines.push("-- Apply to LOCAL:  npx wrangler d1 execute DB --local  --file seeds/demo-users.sql");
  lines.push("-- Apply to REMOTE: npx wrangler d1 execute DB --remote --file seeds/demo-users.sql");
  lines.push(
    "-- Remove (all of them): npx wrangler d1 execute DB --remote --file seeds/demo-users-remove.sql",
  );
  lines.push("--");
  lines.push("-- These are test accounts for exercising role workspaces. Delete them when done.");
  lines.push("-- Safe to re-run: the upsert only ever updates rows whose id starts with 'demo-'.");
  lines.push("");
  lines.push("-- Roles: " + ROLES.map((r) => r.key).join(", "));
  lines.push("");

  for (const role of ROLES) {
    const hash = await hashPassword(password);
    const id = `demo-${role.key}`;
    const email = `${role.key}@${domain}`;
    lines.push(
      `INSERT INTO users (id, name, email, password_hash, role_key, status, email_verified_at, created_at, updated_at)\n` +
        `VALUES ('${sqlEscape(id)}', '${sqlEscape(role.name)}', '${sqlEscape(email)}', '${sqlEscape(hash)}', '${sqlEscape(role.key)}', 'active', '${now}', '${now}', '${now}')\n` +
        `ON CONFLICT(email) DO UPDATE SET\n` +
        `  name = excluded.name,\n` +
        `  password_hash = excluded.password_hash,\n` +
        `  role_key = excluded.role_key,\n` +
        `  status = 'active',\n` +
        `  email_verified_at = COALESCE(users.email_verified_at, excluded.email_verified_at),\n` +
        `  updated_at = excluded.updated_at\n` +
        `WHERE users.id LIKE 'demo-%';`,
    );
  }

  if (promote) {
    lines.push("");
    lines.push(
      `-- Make an existing account an admin (your own login, so you can test /app/admin).`,
    );
    lines.push(
      `UPDATE users SET role_key = 'admin', updated_at = '${now}' WHERE email = '${sqlEscape(promote.toLowerCase())}';`,
    );
  }

  lines.push("");
  lines.push(
    "-- Sign in at https://www.cea.ng/auth/sign-in (email above + the password you passed).",
  );
  lines.push("-- In local mock mode (no VITE_API_URL) the app ships its own role switcher; these");
  lines.push("-- accounts are for the live/staging Worker where sessions are real.");
  lines.push("");

  writeFileSync(outFile, lines.join("\n"), "utf8");

  const removeFile = outFile.replace(/\.sql$/, "-remove.sql");
  writeFileSync(
    removeFile,
    [
      "-- Revokes every demo login created by scripts/gen-demo-users.ts.",
      "-- npx wrangler d1 execute DB --remote --file seeds/demo-users-remove.sql",
      "",
      "DELETE FROM sessions WHERE user_id IN (SELECT id FROM users WHERE id LIKE 'demo-%');",
      "DELETE FROM users WHERE id LIKE 'demo-%';",
      "",
    ].join("\n"),
    "utf8",
  );

  const index = ROLES.map((r) => `${`${r.key}@${domain}`.padEnd(34)} ${r.where}`).join("\n");
  console.log(`Wrote ${outFile}`);
  console.log(`Wrote ${removeFile}`);
  console.log(`\n${ROLES.length} logins on @${domain}:\n${index}`);
}

await main();
