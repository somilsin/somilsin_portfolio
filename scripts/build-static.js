import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const clientDir = path.join(root, "dist/client");

const basePath = process.env["GH_PAGES_BASE"] || "/";

function clean() {
  if (fs.existsSync(clientDir)) {
    fs.rmSync(clientDir, { recursive: true, force: true });
  }
}

function normalizeShell() {
  const shellPath = path.join(clientDir, "_shell.html");
  const indexPath = path.join(clientDir, "index.html");
  if (fs.existsSync(shellPath) && !fs.existsSync(indexPath)) {
    fs.renameSync(shellPath, indexPath);
    console.log("Renamed _shell.html -> index.html");
  }
}

function copy404() {
  const indexPath = path.join(clientDir, "index.html");
  const notFoundPath = path.join(clientDir, "404.html");
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath);
    console.log("Copied index.html -> 404.html");
  }
}


function addCname() {
  // If a custom domain is configured via GH_PAGES_CNAME, write a CNAME file.
  const cname = process.env["GH_PAGES_CNAME"];
  if (cname) {
    fs.writeFileSync(path.join(clientDir, "CNAME"), cname + "\n");
    console.log("Created CNAME:", cname);
  }
}

function addNoJekyll() {
  // Prevent GitHub Pages from running Jekyll on the static files.
  fs.writeFileSync(path.join(clientDir, ".nojekyll"), "");
}


function main() {
  console.log("Building static site for GitHub Pages with base:", basePath);
  clean();

  // Build with the GitHub Pages Vite config.
  execSync("bunx vite build --config vite.github.config.ts", {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      VITE_BASE_PATH: basePath,
      GH_PAGES_BASE: basePath,
    },
  });

  // The SPA prerender emits _shell.html; rename it and add fallback routing.
  normalizeShell();
  copy404();
  addCname();
  addNoJekyll();

  console.log("Static site ready in dist/client");

  console.log("Deploy this folder to GitHub Pages.");
}

main();
