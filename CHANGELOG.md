# Change Log

All notable changes to the "everforest-lite" extension will be documented in this file.

## 0.6.0

- Renamed project to Everforest Lite.
- Fix `extensionKind` to `ui`-only for correct remote (SSH/WSL) support.
- Add `ExtensionContext` to `activate()` for proper disposable lifecycle management.
- Fix silent build failures with proper error propagation and `process.exit(1)`.
- Fix flag-file timing: `markAsInstalled()` only called after successful theme generation.
- Extract shared `src/theme.ts` module to eliminate code duplication between extension and build hook.
- Deduplicate workbench files via shared `src/workbench/base.ts` with override pattern.
- Fix dark red WCAG AA contrast: `#e67e80` → `#e88585`.
- Spread dark green/aqua/blue luminance for better syntax differentiation.
- Fix light theme accent colors: all darkened to pass WCAG AA (≥4.5:1) against light backgrounds.
- Fix light background progression: monotonic bg → bg1 → bg2 → bg3 → bg4 → bg5 with unique values.
- Fix terminal ANSI regular/bright color collapse: regular uses `dim*` palette, bright uses full colors.

## 0.3.0

- Change `activationEvents`.
- Update colors.

## 0.2.1

- Add badge.

## 0.2.0

- Enable this extension in vscode web.

## 0.1.6

- Add new option `everforest.highContrast`.
- Add some new theme tokens.

## 0.1.5

- Bigger icon size.
- Optimize diffEditor colors.
- Adjust grey.
- Support for native bracket colorization

## 0.1.4

- Support remote development by specifying extensionKind.

## 0.1.3

- `tab.lastPinnedBorder`
- Optimize button colors.
- Optimize extension `eamodio.gitlens`.
- Optimize extension `github.vscode-pull-request-github`.
- Optimize extension `matklad.rust-analyzer`.

## 0.1.2

- Use green as border color.

## 0.1.1

- Improve flat workbench style.
- Improve high-contrast workbench style.

## 0.1.0

- Initial release
