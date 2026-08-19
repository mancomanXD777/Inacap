## Purpose
Short, actionable guidance for AI coding agents working in this workspace.

## Overview
- This repository is a collection of small, mostly independent examples rather than one monolithic app:
  - `pr/` — React + Vite app (primary interactive project).
  - `candy/` — Deno + Vite experiments and assets.
  - `Front_End/` — static HTML/CSS/JS examples and exercises.
  - `Base de Datos/` and `Back End/` — small Python scripts and a Django app (sqlite).

## Key files to inspect
- `pr/package.json` — front-end npm scripts & deps.
- `pr/src/main.jsx` — React mount/entry.
- `pr/src/App.jsx` — top-level router (incomplete scaffold; run dev to reveal runtime errors).
- `Back End/1/holitas123/manage.py` — Django manage entry.
- `Back End/1/holitas123/db.sqlite3` — local sqlite DB for backend.

## Developer workflows (concrete commands)
- React app (`pr/`):

  cd pr
  npm install
  npm run dev

  Build / preview:

  npm run build
  npm run preview

  Lint:

  npm run lint

- Deno app (`candy/`):

  cd candy
  deno task dev
  deno task build

- Django backend (`Back End/1/holitas123`):

  cd "Back End/1/holitas123"
  python -m venv .venv
  .venv\Scripts\activate   # Windows
  pip install -r requirements.txt  # if present
  python manage.py migrate
  python manage.py runserver

  (Local DB file: `Back End/1/holitas123/db.sqlite3`)

If `requirements.txt` is missing, inspect `Back End/1/holitas123/holitas123/settings.py` for used packages (e.g., `django`).

## Project-specific conventions & patterns
- Work inside the targeted subproject. Most changes should be local to `pr/`, `candy/`, or `Back End/`.
- Front-end uses Vite with the React Compiler (see `pr/README.md`) — expect differences from CRA tooling.
- `pr/src/components` and `pr/src/pages` hold small, single-file React components; follow their lightweight patterns.
- Static examples in `Front_End/` are stand-alone single-file demos — use them as templates for non-bundled pages.

## Integration points & dependencies
- `pr/` depends on `react`, `react-dom`, `vite`, `@vitejs/plugin-react` (see `pr/package.json`).
- `candy/` uses Deno tasks (Deno v2+).
- Backend is a Django app using sqlite (`Back End/1/holitas123`).

## Editing guidance for AI agents
- Start with a focused change: run the dev server for the relevant subproject, reproduce the issue, then implement and validate.
- Open these files first for context: `pr/src/main.jsx`, `pr/src/App.jsx`, `pr/package.json`, `Back End/1/holitas123/manage.py`, `Back End/1/holitas123/holitas123/settings.py`.
- Keep changes minimal and consistent with existing style (no sweeping refactors without user approval).

## When in doubt
- If a subfolder lacks a `package.json` or `requirements.txt`, treat it as static/demo content and ask before adding new build tooling.
- If runtime errors appear, run the appropriate dev server (Vite/Deno/Django) to get actionable traces — don't guess at fixes without reproducing.

---

If anything here is unclear or you want more detail on a specific subproject (tests, CI, or deployment), tell me which one and I'll expand.
