// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Without this, the nitro plugin only runs inside Lovable's own dev sandbox.
  // On any other host (Vercel, etc.) it gets silently skipped, the build has
  // no server output, and every route 404s. `nitro: true` forces it on
  // everywhere; the actual deploy target (Vercel, Cloudflare, etc.) is still
  // auto-detected at build time via env vars, so this doesn't lock you to Cloudflare.
 
  nitro: true,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
