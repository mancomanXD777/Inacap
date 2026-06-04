### Purpose
Provide brief, actionable guidance for AI coding agents working in this workspace.

Overview
- This repository is a collection of small front-end and Python examples (not a single app):
  - `pr/` — React + Vite app (primary interactive project).
  - `candy/` — Deno/Vite experiments and assets.
  - `Front_End/` — static HTML/CSS/JS examples and exercises.
  - `Base de Datos/` — Python scripts and small database examples.

Key files
- `pr/package.json`: npm scripts and dependencies for the React app.
- `pr/src/main.jsx`: application entry — mounts `App` into `#root`.
- `pr/src/App.jsx`: intended router + top-level component (contains an incomplete router scaffold; run the dev server to reveal syntax issues).

Developer workflows (explicit)
- Start the React app:

  cd pr
  npm install
  npm run dev

- Build / preview:

  npm run build
  npm run preview

- Lint:

  npm run lint

Project-specific conventions & notes
- This workspace is structured as multiple independent examples rather than a monolithic app. Make edits only within the subproject you intend to change (e.g., `pr/` for React work).
- The `pr/` project uses Vite and the React Compiler (see `pr/README.md`) — expect the compile pipeline to run differently than old Create React App setups.
- ESLint is present in `pr/` via devDependencies. Follow the existing lint rules; the project favors modern React + hooks patterns.
- Some files appear incomplete or contain syntax errors (for example `pr/src/App.jsx`). Before making large refactors, run `npm run dev` to reproduce runtime/compile errors and use Vite's HMR to iterate.

Integration points and dependencies
- Frontend: `react`, `react-dom`, `vite`, `@vitejs/plugin-react`. See `pr/package.json` for exact versions.
- There are no centralized build/test pipelines across subfolders — each subproject (if any) handles its own tooling.

How an AI agent should approach changes
1. Identify the target subproject (e.g., `pr/`). Work only inside that folder unless cross-project changes are explicitly requested.
2. Install and run the local dev server to surface errors (`npm install && npm run dev` in the subproject).
3. Open the entry and router files first: `pr/src/main.jsx` and `pr/src/App.jsx` to understand mounting and routing.
4. Prefer tiny, iterative fixes with the dev server open to validate behavior. Use ESLint (`npm run lint`) as a quick static check.
5. When adding or renaming files, mirror the lightweight patterns used elsewhere (static HTML in `Front_End/`, single-file demos, minimal bundler config).

Examples from the repo (patterns to copy)
- Entry point pattern: `pr/src/main.jsx` uses `createRoot(...).render(<StrictMode><App/></StrictMode>)` — use the same mount style for new React demos.
- Routing skeleton: `pr/src/App.jsx` intends to use React Router — import and return a top-level router component and put routes into `Routes`.

When you cannot find guidance
- If a subfolder lacks `package.json` or README, treat it as a static resource collection. Ask the user whether to create a new package boundary before introducing new build tooling.

Please review and tell me any missing project areas or workflows to include.
