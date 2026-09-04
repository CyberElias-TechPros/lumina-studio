import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * The frontend is a static SPA. In development the Vite server proxies `/api`
 * to the local Worker so the session cookie stays same-origin and no CORS dance
 * is needed; in production the browser talks to the Worker directly using
 * VITE_API_URL and the Worker's CORS allowlist.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    // Dev only: the app is served through a sandbox preview hostname, so the
    // default localhost-only host check would reject it.
    allowedHosts: true,
    proxy: {
      "/api": {
        target: process.env.VITE_DEV_WORKER ?? "http://127.0.0.1:8787",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/v1"),
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    target: "es2022",
  },
});
