# Page override: Home (`/`)

Overrides MASTER.md for the home page only.

- **Pattern:** single page, anchored sections in this order: `#hero` → `#projects` → `#experience` → `#writing` → `#contact`.
  Section eyebrows are numbered `01 / Projects`, `02 / Experience`, `03 / Writing`, `04 / Contact`.
- **Hero:** `h1.text-display` (name), role line in mono muted, one-line pitch (`.text-lead`), CTAs:
  primary "See my projects" (→ `#projects`) + secondary "Email me". Status badge above the name.
  Two-column at `lg` (text left, Live Ledger canvas right); stacked on mobile with the canvas below the CTAs.
  The single permitted `.glow` of the page sits behind the hero.
- **Hero height:** content-driven (`min-h-[min(100svh,56rem)]` at most), not a full-screen video block.
  The first project cards must be reachable within one scroll on desktop.
- **Projects:** 2-column card grid at `md` (featured), "More projects" as a compact list below.
- **Experience:** vertical timeline; date column in mono muted on the left at `md`, stacked on mobile.
- **Writing:** latest 3 posts as rows (date mono muted · title · reading time), link "All posts".
- **Contact:** large `h2`, one primary button (email), secondary links (GitHub, LinkedIn, CV).
