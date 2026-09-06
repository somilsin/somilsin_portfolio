# Somil Singh — Portfolio

AI & Computer Vision Engineer portfolio built with TanStack Start, React, Tailwind CSS, and canvas-driven particle effects.

## Live URLs

- **GitHub Pages:** https://somilsin.github.io/somilsin_portfolio/

## Running locally

```bash
bun install
bun run dev
```

## Deploy to GitHub Pages

### Recommended setup — user/org site at `https://somilsin.github.io`

1. Create a new empty repository on GitHub named **`somilsin.github.io`**.
2. Add it as a remote and push this project:

   ```bash
   git remote add github https://github.com/somilsin/somilsin.github.io.git
   git push github main
   ```

3. On the GitHub repo, go to **Settings → Pages → Build and deployment**.
4. Select **GitHub Actions** as the source.
5. The included `.github/workflows/deploy.yml` will build and deploy automatically.

The site will be live at `https://somilsin.github.io/`.

### Project page (`https://somilsin.github.io/<repo-name>/`)

If your repository is not named `<username>.github.io`, update the build command in `.github/workflows/deploy.yml`:

```yaml
env:
  GH_PAGES_BASE: "/<repo-name>/"
```

and in your local build:

```bash
GH_PAGES_BASE="/<repo-name>/" bun run build:static
```

### Deploy manually with `gh-pages`

```bash
bun run deploy:gh-pages
```

This builds the static site and pushes `dist/client` to the `gh-pages` branch. You still need push access to the GitHub repository.

## Build configurations

- `vite.config.ts` — default Lovable/Cloudflare SSR build.
- `vite.github.config.ts` — static SPA build used only for GitHub Pages.
- `scripts/build-static.js` — runs the static build, renames `_shell.html` to `index.html`, copies a `404.html` fallback, and writes `.nojekyll`.

## Notes

- The static build pre-renders the home route (`/`) and relies on the SPA fallback for client-side navigation.
- The `404.html` file ensures that deep links work when GitHub Pages serves a missing route.
