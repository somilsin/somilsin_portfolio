import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const basePath = process.env["GH_PAGES_BASE"] || "/";

export default defineConfig({
  base: basePath,
  plugins: [
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
        prerender: {
          crawlLinks: true,
        },
      },
      sitemap: {
        host: "https://somilsin.github.io/somilsin_portfolio",
      },
      prerender: {
        failOnError: false,
      },
    }),
    viteReact(),
    tsconfigPaths(),
  ],
});
