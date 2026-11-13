/** Fail closed on Vercel production rather than publishing a disconnected app. */
if (process.env.VERCEL_ENV === "production") {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("Vercel production requires a valid NEXT_PUBLIC_API_URL.");
  }
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  ) {
    throw new Error(
      "NEXT_PUBLIC_API_URL must be an HTTPS API origin without credentials, path, query or fragment.",
    );
  }
  if (process.env.NEXT_PUBLIC_ENABLE_MOCKS === "true") {
    throw new Error("Mock mode must not be enabled in Vercel production.");
  }
}
