/*---------------------------------------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------------------------------------*/

import { Configuration, Palette, ThemeVariant } from "../interface";
import { baseWorkbench } from "./base";

export function materialWorkbench(
  palette: Palette,
  configuration: Configuration,
  variant: ThemeVariant,
) {
  return baseWorkbench(palette, configuration, variant, {
    "activityBar.border": `${palette.bg0}`,
    "sideBar.border": `${palette.bg0}`,
    "editorGroupHeader.tabsBorder": `${palette.bg0}`,
    "tab.border": `${palette.bg0}`,
    "panel.border": `${palette.bg0}`,
    "statusBar.border": `${palette.bg0}`,
    "statusBar.noFolderBorder": `${palette.bg0}`,
    "titleBar.border": `${palette.bg0}`,
  });
}

// vim: fdm=marker fmr={{{,}}}:
