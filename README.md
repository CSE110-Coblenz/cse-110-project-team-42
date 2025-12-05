# CSE-110 Project — Team 42

This repository contains the CSE-110 final project by Team 42. It's a browser-based game application built with TypeScript. The app includes multiple game screens (card, dice, roulette, story), simple game-state management, and unit tests.

## Key features

- Multiple interactive game screens (Card, Dice, Roulette, Graphs)
- TypeScript-based codebase
- Unit tests with Vitest and TypeScript type checking
- Static assets in `public/` (images, gifs, backgrounds)

## Tech stack

- TypeScript
- Vite
- Vitest (unit tests)
- Konva (graphics/canvas library used in the project)

## Requirements

- Node.js 
- npm

## Quick start

Clone the repository and install dependencies:

```bash
git clone <this-repo-url>
cd cse-110-project-team-42
npm install
```

Start the development server (Vite):

```bash
npm run dev
```

Open the app in the browser at the URL printed by Vite (usually http://localhost:5173).

## Build & tests

Useful scripts (from `package.json`):

- `npm run dev` — start the Vite dev server
- `npm run typecheck` — run TypeScript type checking (no emit)
- `npm run test` — alias for `typecheck` in this repo
- `npm run test:unit` — run unit tests with Vitest
- `npm run lint` — placeholder (not yet configured)

Run typechecking and unit tests:

```bash
npm run typecheck
npm run test:unit
```

## Project structure (high level)

- `index.html` — app entry
- `src/` — TypeScript source
	- `main.ts` — app bootstrap
	- `GameModel.ts`, `gamestate.ts` — game logic and state
	- `screens/` — per-screen controllers/models/views (CardGameScreen, DiceGameScreen, etc.)
- `public/` — static assets (images, gifs)
- `tests/` — unit tests (Vitest)
- `tsconfig.json`, `tsconfig.ci.json` — TypeScript configs
- `package.json` — scripts and dependencies

Fresh repository with main branch.
