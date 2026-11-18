# maksimprivalov.github.io

Personal website of Maksim Privalov (portfolio, blog, CV). Built with Astro, deployed to GitHub Pages.

Live: https://maksimprivalov.github.io/

## Run locally

Requires Node ≥ 22.12 and pnpm 10.

```sh
pnpm install
pnpm dev        # http://localhost:4321/
pnpm build      # static output in dist/
pnpm preview    # serve dist/ with the base path
pnpm check      # astro check + tsc + CV drift check
pnpm lint
pnpm format
```

## Where things live

| What                        | Where                                                             |
| --------------------------- | ----------------------------------------------------------------- |
| Site config, nav, status    | `src/config.ts`                                                   |
| Design system (binding)     | `design-system/maksim-privalov/MASTER.md`, specimen `/styleguide` |
| Tokens and component styles | `src/styles/global.css`, `src/components/ui/`                     |
| Project pages               | `src/content/projects/*.mdx`                                      |
| "More projects" list        | `src/data/more-projects.ts`                                       |
| CV (source of truth)        | `cv/main.tex` + `cv/photo.jpg`                                    |
| CV (HTML version)           | `src/data/cv.ts`                                                  |

## Update the CV

1. Edit `cv/main.tex` (source of truth; compiled to `/cv.pdf` in CI).
2. Mirror the change in `src/data/cv.ts`.
3. Run `pnpm cv:check`. It lists every difference between the two and fails CI if they drift.

## Add a project

Create `src/content/projects/<slug>.mdx` with the frontmatter defined in `src/content.config.ts`
(`title`, `summary`, `kind`, `tech`, `order`, optional `repo`, `live`, `demo`, `featured`, `team`).
Sections: Problem, Architecture (use `Figure`, `Flow`, `Modules` from `src/components/diagram/`),
Key decisions, Tech. Featured projects appear as cards on the home page; the rest go into "More projects".

## Base path and domain

`site` and `base` live in one place: `src/config.ts` (`SITE_URL`, `BASE_PATH`).
All internal links and assets go through `url()` from `src/lib/url.ts`; never hard-code a leading `/`.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`: it compiles `cv/main.tex` to `public/cv.pdf`,
runs the CV drift check, builds the site with `withastro/action` and deploys with `actions/deploy-pages`.
In the repo settings, Settings → Pages → Source must be **GitHub Actions**.

<!-- TODO (later phases): adding a blog post, rebuilding demos, setting a custom domain. -->
