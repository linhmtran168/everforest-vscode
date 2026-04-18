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
}

export interface Configuration extends UserConfiguration {
  darkContrast: Contrast;
  lightContrast: Contrast;
  darkWorkbench: WorkbenchVariant;
  lightWorkbench: WorkbenchVariant;
}

export interface ThemeSpec {
  variant: ThemeVariant;
  contrast: Contrast;
  workbench: WorkbenchVariant;
  name: string;
  fileName: string;
}

export const THEME_VARIANTS: readonly ThemeSpec[] = [
  {
    variant: "dark",
    contrast: "hard",
    workbench: "flat",
    name: "Everforest Dark Hard Flat",
    fileName: "everforest-dark-hard-flat.json",
  },
  {
    variant: "dark",
    contrast: "medium",
    workbench: "material",
    name: "Everforest Dark Medium Material",
    fileName: "everforest-dark-medium-material.json",
  },
  {
    variant: "dark",
    contrast: "soft",
    workbench: "high-contrast",
    name: "Everforest Dark Soft High Contrast",
    fileName: "everforest-dark-soft-high-contrast.json",
  },
  {
    variant: "light",
    contrast: "hard",
    workbench: "flat",
    name: "Everforest Light Hard Flat",
    fileName: "everforest-light-hard-flat.json",
  },
  {
    variant: "light",
    contrast: "medium",
    workbench: "material",
    name: "Everforest Light Medium Material",
    fileName: "everforest-light-medium-material.json",
  },
  {
    variant: "light",
    contrast: "soft",
    workbench: "high-contrast",
    name: "Everforest Light Soft High Contrast",
    fileName: "everforest-light-soft-high-contrast.json",
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
