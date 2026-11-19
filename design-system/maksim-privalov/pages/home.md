# Page override: Home (`/`)

Overrides MASTER.md for the home page only.

- **Pattern:** single page, anchored sections in this order: `#hero` → `#about` → `#projects` → `#experience` → `#writing` → `#contact`.
  Section eyebrows are numbered `01 / About`, `02 / Projects`, `03 / Experience`, `04 / Writing`, `05 / Contact`.
- **About:** short bio (3 paragraphs, facts from the CV only) with a key-facts card on the right at `lg`.
- **Hero:** `h1.text-display` (name), role line in mono muted, one-line pitch (`.text-lead`), CTAs:
  primary "See my projects" (→ `#projects`) + secondary "Email me". Status badge above the name.
  Two-column at `lg` (text left, hero visual right); stacked on mobile with the visual below the CTAs.
  Current hero visual: `src/components/BinaryCoin.astro`, a spinning coin drawn in 0/1 digits
  (rim + currency symbol in `--accent`, face bits in `--text` at ~10%, faint bit field around it).
  Faces cycle $, €, £, ₿ (₿ is drawn, not typeset: Geist and Arial lack the glyph). Drag to spin, with
  inertia; a small "drag to spin" hint fades after the first drag.
  The single permitted `.glow` of the page sits behind the visual.
- **Hero height:** content-driven (`min-h-[min(100svh,56rem)]` at most), not a full-screen video block.
  The first project cards must be reachable within one scroll on desktop.
- **Projects:** 2-column card grid at `md` (featured), "More projects" as a compact list below.
- **Experience:** vertical timeline; date column in mono muted on the left at `md`, stacked on mobile.
- **Writing:** latest 3 posts as rows (date mono muted · title · reading time), link "All posts".
- **Contact:** large `h2`, one primary button (email), secondary links (GitHub, LinkedIn, CV).
