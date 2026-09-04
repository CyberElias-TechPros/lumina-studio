# 6. PBKDF2-SHA256 instead of Argon2

**Status:** Accepted

## Context

Password hashing should be memory-hard. Argon2id is the current best practice
and is what this codebase's sibling project documents. But the runtime is a
Cloudflare Worker.

## Decision

PBKDF2-SHA256, **100 000 iterations**, 16-byte random salt, stored as:

```
pbkdf2-sha256$<iterations>$<salt-hex>$<hash-hex>
```

## Reasoning

Argon2 is not available inside the Workers runtime. The realistic choices were
bcrypt (needs a wasm build, and its 72-byte password ceiling is a real footgun)
or PBKDF2, which `crypto.subtle` provides natively.

100 000 iterations is the practical ceiling here. Workers enforce a CPU-time
limit per invocation; going higher makes login itself a denial-of-service vector
and starts failing under concurrent sign-ins.

## Making the ceiling survivable

The iteration count is **stored in the hash string**, and `needsRehash()`
compares it against the current configured value. On a successful login with an
outdated count, the password is rehashed with the new parameters and written
back.

That means raising the cost later is a config change plus normal usage — not a
forced password reset for every user.

## Compensating controls

Since the hash is weaker than Argon2 would be, the surrounding controls carry
more weight:

- **Generic error** for unknown-user and wrong-password, with a dummy hash burn
  on the unknown-user path so the two are not separable by timing.
- **Lockout** after 8 failures for 15 minutes.
- **Rate limiting** on login (10 / 5 min), register (5 / hour) and password
  reset (5 / 15 min), keyed by IP.
- **256-bit session tokens**, stored only as SHA-256 hashes, in `HttpOnly;
  Secure; SameSite=None` cookies.

## Consequences

**Good:** works on the target runtime with no wasm dependency, and the upgrade
path does not require user action.

**Cost:** a leaked database is more crackable than with Argon2id. The
compensating controls reduce but do not eliminate that. Worth revisiting if
Workers ever exposes a memory-hard primitive natively.
