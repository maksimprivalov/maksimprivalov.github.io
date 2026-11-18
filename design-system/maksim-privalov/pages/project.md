# Page override: Project (`/projects/[slug]`)

- **Layout:** `max-w-3xl` prose column; demo and diagram frames may break out to `max-w-5xl`.
- **Header:** breadcrumb (Home / Projects / Name, muted, mono 12px) → `h1.text-h1` → one-line summary (`.text-lead`)
  → tech tags → links (Repo as secondary button with GitHub icon, Live/Demo anchor as ghost).
- **Sections (h2):** Problem · Architecture (diagram) · Key decisions · Tech · Demo.
- **Demo frame:** `--radius-xl`, `border-line`, label above it in the eyebrow style stating honestly how it runs
  ("Runs in your browser via WebAssembly" / "Replay of real system outputs"). Reserve its height to avoid CLS.
  A static, readable fallback is rendered without JS.
