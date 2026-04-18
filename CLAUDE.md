# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Everforest is a VS Code color theme extension with dark and light variants. This is a fork of [sainnhe/everforest-vscode](https://github.com/sainnhe/everforest-vscode). It generates theme JSON files from TypeScript source at build time and regenerates them at runtime when user settings change.

## Commands

- **Build**: `pnpm run compile` (cleans dist, compiles TS, then generates theme JSON files)
- **Lint**: `pnpm run lint`
- **Package extension**: `pnpm run package`
- **Test in browser**: `pnpm run browser`

There is no test suite. The compile step (`compile:themes`) generates theme files and serves as validation — if it produces valid JSON, the theme definitions are correct.

## Architecture

The theme generation pipeline flows through three layers, each parameterized by a `Configuration` and `ThemeVariant` ("dark" | "light"):

1. **Palette** (`src/palette/`) — Raw hex color values. Background colors vary by contrast level (soft/medium/hard); foreground colors are fixed per variant. `getPalette()` assembles a full `Palette` object.

2. **Workbench** (`src/workbench/`) — VS Code UI colors (editor, sidebar, tabs, etc.). Three styles: `material`, `flat`, `high-contrast`. Each returns a colors object keyed by VS Code's `colors` API.

3. **Syntax** (`src/syntax/`) — TextMate token colors. Two variants: `default` and `italic` (for italic keywords). Controls `tokenColors` in the theme JSON.

4. **Semantic** (`src/semantic.ts`) — Semantic token colors for VS Code's semantic highlighting API.

**Entry points:**

- `src/index-client.ts` — VS Code desktop extension entry. Listens for config changes and regenerates `themes/*.json` at runtime.
- `src/index-web.ts` — VS Code web extension entry (no-op, web doesn't support runtime theme regeneration).
- `src/hook/generateThemes.ts` — Build-time script run by `compile:themes`. Generates theme JSON with default configuration.

**Configuration flow:** User-facing settings are defined in `package.json` under `contributes.configuration` and typed as `UserConfiguration` in `src/interface.ts`. Contrast and workbench style are NOT user settings — they are fixed per published theme variant (see `THEME_VARIANTS` in `src/interface.ts`, which lists the 6 shipped combinations). At build/runtime, `buildConfiguration(user, spec)` merges user settings with a variant's fixed contrast/workbench into the internal `Configuration` passed to palette/workbench/syntax. When adding a new user-facing option, follow the checklist in `src/interface.ts`.

## Key Conventions

- Color palette files export plain objects with hex color strings — no logic, just data.
- The `themes/` directory contains generated JSON files; do not edit them manually.
- Vim fold markers (`{{{`/`}}}`) are used throughout — preserve them when editing.
- Package manager is pnpm (pinned version in `packageManager` field).
- Pre-commit hooks run via husky + lint-staged (eslint fix on `.ts`, prettier on `.json`/`.md`).
