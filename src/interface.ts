/*---------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// To add a new user-facing configuration option:
// 1. Edit package.json (contributes.configuration)
// 2. Add the field to UserConfiguration below
// 3. utils.getUserConfiguration()
// 4. utils.isDefaultUserConfiguration()
// 5. generateThemes.ts default
export type ThemeVariant = "dark" | "light";
export type Contrast = "soft" | "medium" | "hard";
export type WorkbenchVariant = "material" | "flat" | "high-contrast";
export type LightPalette = "pastel" | "strong";
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
export interface UserConfiguration {
  darkSelection: SelectionColor;
  lightSelection: SelectionColor;
  darkCursor: CursorColor;
  lightCursor: CursorColor;
  italicKeywords: boolean;
  italicComments: boolean;
  diagnosticTextBackgroundOpacity: DiagnosticTextBackgroundOpacity;
  highContrast: boolean;
  darkContrast: Contrast;
  lightContrast: Contrast;
  darkWorkbench: WorkbenchVariant;
  lightWorkbench: WorkbenchVariant;
  lightPalette: LightPalette;
}

export type Configuration = UserConfiguration;

export interface ThemeSpec {
  variant: ThemeVariant;
  name: string;
  fileName: string;
}

export const THEME_VARIANTS: readonly ThemeSpec[] = [
  {
    variant: "dark",
    name: "Everforest Dark",
    fileName: "everforest-dark.json",
  },
  {
    variant: "light",
    name: "Everforest Light",
    fileName: "everforest-light.json",
  },
];

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
