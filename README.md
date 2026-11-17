# maksimprivalov/site

Personal website of Maksim Privalov (portfolio, blog, CV). Built with Astro, deployed to GitHub Pages.

Live: https://maksimprivalov.github.io/site/

## Run locally

Requires Node ≥ 22.12 and pnpm 10.

```sh
pnpm install
pnpm dev        # http://localhost:4321/site/
pnpm build      # static output in dist/
pnpm preview    # serve dist/ with the base path
pnpm check      # astro check + tsc
pnpm lint
pnpm format
```

## Base path and domain

`site` and `base` live in one place: `src/config.ts` (`SITE_URL`, `BASE_PATH`).
All internal links and assets go through `url()` from `src/lib/url.ts`; never hard-code a leading `/`.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`: it compiles `cv/cv.tex` to `public/cv.pdf`
(if present), builds the site with `withastro/action` and deploys with `actions/deploy-pages`.
In the repo settings, Settings → Pages → Source must be **GitHub Actions**.

<!-- TODO (later phases): adding a blog post, updating the CV, rebuilding demos, setting a custom domain. -->
