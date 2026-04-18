/*---------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// To add a new configuration option:
// 1. Edit package.json
// 2. Add the configuration option in this interface
// 3. utils.getConfiguration()
// 4. utils.isDefaultConfiguration()
// 5. generateThemes.ts
export type ThemeVariant = "dark" | "light";
export type Contrast = "soft" | "medium" | "hard";
export type WorkbenchVariant = "material" | "flat" | "high-contrast";
export type CursorColor =
  | "black"
  | "white"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "aqua"
  | "blue"
  | "purple";
export type SelectionColor =
  | "grey"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "aqua"
  | "blue"
  | "purple";
export type DiagnosticTextBackgroundOpacity =
  | "0%"
  | "12.5%"
  | "25%"
  | "37.5%"
  | "50%";
export interface Configuration {
  darkContrast: Contrast;
  lightContrast: Contrast;
  darkWorkbench: WorkbenchVariant;
  lightWorkbench: WorkbenchVariant;
  darkSelection: SelectionColor;
  lightSelection: SelectionColor;
  darkCursor: CursorColor;
  lightCursor: CursorColor;
  italicKeywords: boolean;
  italicComments: boolean;
  diagnosticTextBackgroundOpacity: DiagnosticTextBackgroundOpacity;
  highContrast: boolean;
}

export interface Palette {
  bg0: string;
  bg1: string;
  bg: string;
  bg2: string;
  bg3: string;
  bg4: string;
  bg5: string;
  grey0: string;
  grey1: string;
  grey2: string;
  fg: string;
  red: string;
  orange: string;
  yellow: string;
  green: string;
  aqua: string;
  blue: string;
  purple: string;
  dimRed: string;
  dimOrange: string;
  dimYellow: string;
  dimGreen: string;
  dimAqua: string;
  dimBlue: string;
  dimPurple: string;
  shadow: string;
  badge: string;
}

// vim: fdm=marker fmr={{{,}}}:
