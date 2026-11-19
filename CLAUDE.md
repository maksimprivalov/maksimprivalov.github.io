# Personal Website: Maksim Privalov

## Goal
Build my personal website (portfolio + blog + CV) and host it on GitHub Pages. It should do three things:
1. Show recruiters and engineers, within seconds, that I'm a **backend engineer focused on FinTech**.
2. Rank well in search for my name and for my blog topics (strong SEO).
3. Look premium and memorable: a dark, minimal design with one small interactive FinTech animation and interactive project demos.

Structure reference (layout and sections, not visuals): https://dragomirbozoki.github.io/
Visual reference (look and feel, motion, cards, typography): https://coffer.so/. Open it and study it before you design anything.

**Rule:** don't spend weeks polishing. Ship a working site early, then improve it phase by phase.

---

## About me (source of truth for content)
- **Name:** Maksim Privalov
- **Role:** Backend Engineer, FinTech (Java/Kotlin, Spring Boot, Rust, Go)
- **Location:** Novi Sad, Serbia
- **Email:** mprivalovs@gmail.com
- **GitHub:** https://github.com/maksimprivalov
- **LinkedIn:** https://www.linkedin.com/in/maksim-privalov-1479a1263

Take all experience, project and skills content from my CV (`cv/main.tex`) and from my GitHub repos and READMEs. **Do not invent facts, numbers, technologies or dates.** If something is missing, leave a clearly marked `TODO` and ask me.

Main items, for orientation only (verify them against the CV and repos):
- **Faculty of Technical Sciences, Novi Sad, Software Engineer (Feb 2026 – present):** took a Windows-only document-signing system cross-platform with Java PKCS#11; built a multi-tenant architecture that cut server RAM by ~86%.
- **Digital Access Logic, Software Engineer (Oct 2024 – Feb 2025):** payment processing through a bank API broker, fiscal receipts, microservice ticketing system.
- **Projects:**
  - Payment Processing Service (Rust, Axum, PostgreSQL, Docker): 6 microservices, saga orchestration, idempotency, double-entry ledger, audit log. Repo: `maksimprivalov/payment-processing-service`
  - Fraud Detection System (Java, Spring Boot, Drools): real-time rule-based scoring, CEP, explainable decisions. Repo: `maksimprivalov/credit-card-fraud-detection`
  - LSM key-value store (Go): WAL → memtable → SSTable, Bloom filters, compaction
  - RL Trading Agent (Python, stable-baselines3, Gymnasium): PPO agent benchmarked against Buy & Hold
  - progress-bot (Go, SQLite, Telegram Bot API): deployed habit-tracking bot
  - Cloud Music App (AWS Lambda, DynamoDB, S3, Cognito, Angular; team project). Repo: `maksimprivalov/awscloudmusicapp`
  - CopyBot (Java Spring; commercial Telegram cross-posting bot)

---

## Tech stack (decided)
| Layer | Choice |
|---|---|
| Framework | **Astro** (static output, zero JS by default, islands for interactivity) |
| Language | TypeScript, strict mode |
| Content | Astro Content Collections + **MDX** for blog posts and project pages |
| Styling | **Tailwind CSS**, with design tokens as CSS custom properties |
| Fonts | Self-hosted through Fontsource (no Google Fonts CDN). Sans: Geist or Inter. Mono: JetBrains Mono, with tabular numbers for amounts and code |
| Animation | Hand-written **Canvas 2D + TypeScript**, no animation library unless clearly justified |
| Demos | **WebAssembly** where possible (Go → WASM via TinyGo or standard Go; Rust → WASM via `wasm-pack`) |
| Hosting | **GitHub Pages**, repo `maksimprivalov/maksimprivalov.github.io` (a user site, see "Domain and base path") |
| CI/CD | GitHub Actions: build Astro and deploy to Pages on push to `main`; compile `cv/main.tex` to PDF in the same pipeline |
| Package manager | pnpm |

Keep dependencies minimal. Before adding any dependency, explain why it's needed.

---

## Domain and base path
The repo is `maksimprivalov/maksimprivalov.github.io`, so on GitHub Pages it's a **user site** served from the root:
- **Until a custom domain is set**, the site lives at `https://maksimprivalov.github.io/`. Astro uses `site: 'https://maksimprivalov.github.io'` and `base: '/'`.
- **After a custom domain is set**, only `site` changes to the domain (`base` stays `/`).

The final domain is **not decided yet** (likely `maksimprivalov.dev` / `.com` / `.me`).
- Keep `site` and `base` in **one place** (`src/config.ts`, read by `astro.config.mjs`), so the switch is a one-line change.
- **Every internal link and asset path must respect the base path** (`import.meta.env.BASE_URL` or a small `url()` helper). This includes nav links, images, fonts, OG images, `/cv.pdf`, `.wasm` files, RSS, sitemap and canonical URLs. Never hard-code a leading `/`, so the site keeps working if it's ever served from a sub-path. To verify, temporarily build with a non-root `base` (e.g. `/site`), preview, and check that nothing 404s.
- When I give you the domain: switch the config, add `public/CNAME`, and tell me exactly which DNS records to set (GitHub Pages A/AAAA records for the apex domain, CNAME for `www` → `maksimprivalov.github.io`), and remind me to set the custom domain in repo Settings → Pages and enable "Enforce HTTPS".

---

## Design system

### Colors (fixed, do not change)
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#161616` | Page background |
| `--line` | `#262626` | Dividers, card borders, tags, subtle surfaces |
| `--muted` | `#8A8A8A` | Descriptions, dates, navigation |
| `--text` | `#EDEDED` | Headings and body text |
| `--accent` | `#10B981` | Status dot, link underlines, hover, buttons (emerald) |
| `--accent-hover` | `#34D399` | Lighter emerald on hover |

Contrast notes:
- `--muted` on `--bg` is ≈ 5.2:1 and `--accent` on `--bg` is ≈ 7:1, so both pass WCAG AA.
- **Text on emerald buttons must be `#161616`, never white.** White on `#10B981` is only ≈ 2.5:1 and fails.

### Using the ui-ux-pro-max skill
The skill is installed as a Claude Code plugin (`ui-ux-pro-max@ui-ux-pro-max-skill`, requires Python 3).

> **Binding design system:** [`design-system/maksim-privalov/MASTER.md`](design-system/maksim-privalov/MASTER.md),
> with per-page overrides in `design-system/maksim-privalov/pages/` (`home.md`, `project.md`, `blog-post.md`).
> Read MASTER.md (and the page override, if any) before any UI work. Tokens and component classes are
> implemented in `src/styles/global.css` and `src/components/ui/`; live specimen at `/styleguide`.
1. **Before writing any UI code**, use ui-ux-pro-max to generate a design system for a *"dark minimal fintech developer portfolio"* and persist it to files (master file + per-page overrides).
2. In that design system, **replace the generated colors with the palette above**. Keep its guidance on typography scale, spacing, radii, shadows/glow, motion and components where it fits the coffer.so-style look.
3. Treat the persisted master design-system file as binding for all UI work, in every session. Reference it from this file once it exists.
4. At the end of every phase, review the pages against the ui-ux-pro-max checklist (contrast, spacing, hierarchy, focus states, mobile, motion) and fix the issues.

### Visual direction
- Dark, calm, lots of whitespace, thin `--line` borders, at most one subtle emerald glow per view.
- Small "status" element in the header: emerald dot + "Open to opportunities" (text configurable).
- Subtle motion only: fade/translate on scroll reveal, hover underlines in emerald, nothing bouncy.
- Fully responsive (mobile first) and keyboard-accessible, with visible focus rings in `--accent`.
- Respect `prefers-reduced-motion` everywhere.

---

## Site structure
```
/                     Home: single page with anchored sections
  #hero               Name, role, one-line pitch, CTA buttons ("See my projects", "Email me"), ledger animation
  #projects           Featured projects (cards linking to /projects/[slug]) + "More projects"
  #experience         Timeline
  #writing            Latest 3 posts + link to /blog
  #contact            Email, GitHub, LinkedIn, CV
/projects/[slug]      Project page: problem, architecture (diagram), key decisions, tech, links, interactive demo
/blog                 Post list (tags, dates, reading time)
/blog/[slug]          Post (MDX)
/blog/tags/[tag]      Tag pages
/cv                   HTML version of the CV + "Download PDF" (/cv.pdf, built from cv/main.tex)
/404                  Custom 404 in the same style
/rss.xml              RSS feed
```
Header navigation: Projects · Experience · Writing · CV · Contact.

---

## Hero animation: "Live Ledger"
> **Status (2026-11-18):** at my request the hero currently shows `src/components/BinaryCoin.astro`
> (a coin drawn in 0s and 1s with $, €, £ and ₿ faces, drag to spin, Canvas 2D, ~2 KB gzip). Whether the Live Ledger replaces it, sits
> next to it, or moves to the Payment Processing project page is still open.

A small interactive canvas next to (or behind) the hero text that visualizes **double-entry bookkeeping**. It teases my Payment Processing project.

- **Nodes:** 5–6 accounts (e.g. `wallet_a`, `wallet_b`, `merchant`, `fees`, `settlement`), drawn as small rounded nodes with labels in the mono font.
- **Transactions:** emerald particles travel along edges from the debited to the credited account(s). One payment can split, e.g. 120.00 → merchant 118.50 + fees 1.50.
- **Journal panel:** a scrolling list of postings, e.g. `DEBIT wallet_a 120.00` / `CREDIT merchant 118.50` / `CREDIT fees 1.50`, with tabular numbers.
- **Invariant counter**, always visible: `Σ debit − Σ credit = 0.00 ✓`.
- **Interaction:** hovering a node highlights its balance; clicking a node sends a payment from it. A hint label reads "click an account".
- **Saga moment:** occasionally a step fails. The edge briefly turns muted red, then a compensating transaction reverses it (label `COMPENSATE`), and the invariant stays at 0.00.
- **Performance:** ≤ 15 KB of gzipped JS, `devicePixelRatio`-aware, pauses when off-screen (IntersectionObserver) or when the tab is hidden, loaded with `client:visible`.
- **Reduced motion:** render a static snapshot with the journal and invariant, no particles.
- **Accessibility:** the canvas has `aria-hidden="true"`, and a visually hidden text description is next to it.

---

## Interactive project demos
GitHub Pages is static hosting only, so every demo runs in the browser. Label each one honestly ("runs in your browser via WebAssembly" or "replay of real system outputs"). Build them one at a time, in this order:

1. **LSM key-value store (Go → WASM).** In-browser terminal (`PUT k v`, `GET k`, `DELETE k`, `FLUSH`, `COMPACT`) plus a live visualization: memtable filling up → flush to SSTable → levels → compaction, with Bloom-filter hits and misses shown. Try TinyGo first for bundle size and report the resulting `.wasm` size.
2. **Payment Processing (Rust → WASM, or TS fallback).** Transfer simulator: create a transfer, step through the saga (reserve → debit → credit → confirm), inject a failure to see the compensation, and resend the same idempotency key to show nothing gets duplicated. Live ledger entries and balances. First check whether the domain logic in the repo is separable from Axum/Postgres. If it is, compile it with `wasm-pack`; if not, write a faithful TS simulation and say so on the page.
3. **Fraud Detection (replay).** Drools can't run in the browser. Build a "playground": pick one of ~8 preset transactions and see which rules fired, the risk score and the explanation. The data is **real outputs recorded from the actual system**, saved as JSON fixtures in the repo. I will provide or generate these; give me a script or instructions for recording them.
4. **RL Trading Agent (precomputed).** Interactive chart: PPO equity curve vs Buy & Hold on the test period, with a time slider, hover tooltips and key metrics (return, max drawdown, Sharpe), from a JSON/CSV exported at build time. Dark theme with the emerald accent; no heavy chart library unless justified.
5. **progress-bot.** "Try it on Telegram" button plus a short GIF/video.
6. **Cloud Music App.** Architecture diagram plus screenshots (no live AWS).

Each demo is lazy-loaded (`client:visible`), and its project page must still be fully readable and indexable without JavaScript.

---

## SEO requirements
- English is the primary language (`<html lang="en">`). Structure the code so Serbian can be added later with `hreflang`.
- Unique `<title>` and meta description on every page. Home title: **"Maksim Privalov: Backend Engineer, FinTech"**.
- Canonical URL on every page, built from the single `site` config.
- `@astrojs/sitemap`, `robots.txt` (pointing to the sitemap), and `@astrojs/rss`.
- **Open Graph and Twitter cards** on every page, with OG images **generated at build time** for each post and project (e.g. Satori or `astro-og-canvas`), in the site's style.
- **JSON-LD:** `Person` on the home page (name, jobTitle, url, `sameAs` → GitHub and LinkedIn), `BlogPosting` on posts, `BreadcrumbList` on nested pages.
- Semantic HTML (one `h1` per page, landmarks, proper heading order), descriptive alt text, clean URL slugs.
- Blog posts support a `canonical` frontmatter field (for cross-posting to dev.to/Medium with the canonical pointing here).
- Leave a placeholder for the Google Search Console and Bing verification meta tags in config.
- **Performance budget:** Lighthouse ≥ 95 in all four categories on mobile; no layout shift from fonts (`font-display: swap` plus a size-adjusted fallback); responsive images through `astro:assets`.

---

## Blog
- MDX posts in `src/content/blog/`. Frontmatter: `title`, `description`, `pubDate`, `updatedDate?`, `tags[]`, `draft`, `canonical?`, `ogImage?`.
- Code blocks with syntax highlighting (Shiki) in a theme matching the palette, plus a copy button.
- Reading time, tags, previous/next links, and a table of contents for long posts.
- Drafts are excluded from production builds, the sitemap and RSS.
- Create **one example post** (clearly marked as a placeholder) so I can see the layout. I will write the real posts myself. My niche is payments engineering: idempotency, sagas, ledger design.

---

## CV
- `cv/main.tex` (LaTeX, pdfLaTeX, needs `cv/photo.jpg`) is compiled in GitHub Actions and published as `/cv.pdf`. It is the source of truth for CV content.
- The `/cv` page is an HTML version of the same content, styled with the site's design system. Keep its content in a data file (`src/data/cv.ts` or YAML) so it's easy to update. Tell me whenever the HTML and LaTeX versions drift apart.
- Implemented: `src/data/cv.ts` mirrors `cv/main.tex`; `pnpm cv:check` (part of `pnpm check` and the CI build) fails on any drift. The phone number and photo are intentionally left out of the HTML version.

---

## Repository and quality
- Repo: `maksimprivalov/maksimprivalov.github.io`. Pages source: **GitHub Actions** (official `withastro/action` + `actions/deploy-pages`).
- Demo sources (Go/Rust → WASM) live in `demos/<name>/`. Built `.wasm` files go to `public/demos/`, built either in CI or by a documented script.
- Scripts: `dev`, `build`, `preview`, `check` (astro check + type check), `lint`, `format` (Prettier).
- `README.md` covering how to run it locally, how to add a blog post, how to update the CV, how to rebuild the demos and how to set the custom domain.
- Commit in small logical steps with clear messages.
- After every phase, run `build` and `check`, look at the result in the browser (desktop and mobile widths), and give me a short summary: what's done, what I should check, and open TODOs.

---

## Phases (work in this order; stop after each phase for my review)
1. **Skeleton and deploy.** Astro + TS + Tailwind + MDX scaffold, the deploy workflow, a minimal home page live on `https://maksimprivalov.github.io/`, with base-path handling working from day one.
2. **Design system.** ui-ux-pro-max design system with my palette, persisted to files; base layout, header/footer, typography, buttons, cards, tags.
3. **Content.** Home sections, project pages (without demos yet), experience timeline, `/cv` + PDF pipeline, contact, 404.
4. **Hero "Live Ledger" animation.**
5. **Blog and SEO.** Collections, post layout, tags, RSS, sitemap, OG image generation, JSON-LD, meta tags, Lighthouse pass.
6. **Demos**, one at a time, in the order listed above.
7. **Polish.** ui-ux-pro-max review pass, accessibility audit, performance, final README.

Start with phase 1. Before you write code, briefly confirm the plan and list any questions you need answered.
