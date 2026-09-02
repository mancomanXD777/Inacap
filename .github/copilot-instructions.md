### Purpose
Provide brief, actionable guidance for AI coding agents working in this workspace.

## Overview
- **Multi-project workspace** (not a monolithic app):
  - `pr/` — React 19 + Vite SPA (primary interactive project)
  - `Back End/1/holitas123/` — Django 5.1 project with two apps (holitas, holi)
  - `Front_End/` — static HTML/CSS/JS examples and learning exercises
  - `candy/` — Deno/Vite experiments
  - `Base de Datos/`, `POOS/` — standalone Python scripts and examples

## Key Architecture & Patterns

### React App (`pr/`)
- **React 19 + Vite + React Compiler** — uses Babel plugin for automatic component memoization
- **Core routing** (React Router v7):
  - `/` → Landing (intro page)
  - `/login` → Login (user authentication, stores user in localStorage)
  - `/home` → Home (scrollable carousel of "lore" items from hardcoded array)
  - `/lore/:id` → Lore detail page (displays specific lore story)
  - `/terminal` → Terminal emulator page
- **Accessibility is built-in** — floating `♿` button reveals panel to adjust:
  - Brightness (50-150%, via `document.documentElement.style.filter`)
  - Font size (12-24px, via `document.documentElement.style.fontSize`)
  - Settings persist to localStorage as `global_brightness` and `global_font_size`
- **State management**: localStorage-based (user session: `usuarioActivo`, accessibility: brightness/fontSize)
- **CSS per-page**: `Home.css`, `Landing.css`, `Login.css`, `Lore.css`, `Terminal.css` alongside `.jsx` files
- **Components**: `contacto.jsx`, `home.jsx` (note: `home.jsx` differs from `pages/Home.jsx`)

### Django Backend (`Back End/1/holitas123/`)
- Two apps: `holitas` (with template `ejemplo1.html`) and `holi`
- URL routes: `/admin/`, `/holitas/`, `/holitas/datetime/`, `/holi/`, `/render/`
- SQLite database (`db.sqlite3`)
- No API integration visible with React app yet

## Essential Workflows

### React App
```bash
cd pr
npm install          # First time only
npm run dev          # Start Vite dev server (HMR enabled)
npm run build        # Production build → dist/
npm run preview      # Preview build output
npm run lint         # ESLint check (no --fix by default)
```

### Django Backend
```bash
cd "Back End/1/holitas123"
python manage.py runserver
python manage.py migrate
```

## Project-Specific Conventions

- **Scope isolation**: Only modify files within the subproject you're working on (e.g., don't change `pr/` files when working on Django)
- **Accessibility-first**: New React pages should inherit brightness/fontSize from App's context or respect localStorage values
- **Route naming**: Use kebab-case in paths, PascalCase for component names (existing: `Landing`, `Login`, `Home`, `Lore`, `Terminal`)
- **Page exports**: All page components are default exports in `pr/src/pages/`
- **Styling**: Local CSS files per page (not CSS-in-JS or Tailwind)
- **No TypeScript**: Use plain `.jsx` and `.py`; no type annotations required

## Common Edit Patterns

1. **Add new route**: 
   - Create new page in `pr/src/pages/NewPage.jsx`
   - Import in `App.jsx` and add `<Route path="/new" element={<NewPage />}/>`
   - Add corresponding `.css` file

2. **Modify accessibility controls**: 
   - Edit the panel DOM and state logic in App.jsx lines 50-110 (Brightness and Font Size sections)

3. **Update carousel items**: 
   - Edit `CAROUSEL_ITEMS` array in `pr/src/pages/Home.jsx` (add id, title, description, image)

4. **Backend route**: 
   - Add path to `Back End/1/holitas123/holitas123/urls.py` and corresponding view in app's `views.py`

## Dependencies
- **Frontend**: `react@^19.2.6`, `react-dom@^19.2.6`, `react-router-dom@^7.17.0`, Vite, React Compiler
- **Backend**: Django 5.1.4, sqlite3
- **No cross-project API bridge**: Each subproject runs independently

## Before Large Changes
1. Run the dev server first (`npm run dev` in `pr/`) to catch real errors
2. Lint incrementally (`npm run lint`) while editing
3. Use Vite HMR for fast iteration — single file edits reload in browser instantly
4. Test accessibility: use the floating panel on every new page element
