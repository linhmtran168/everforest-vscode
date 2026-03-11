/*---------------------------------------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------------------------------------*/

import { Configuration, Palette, ThemeVariant } from "../interface";
import { baseWorkbench } from "./base";

export function highContrastWorkbench(
  palette: Palette,
  configuration: Configuration,
  variant: ThemeVariant,
) {
  return baseWorkbench(palette, configuration, variant, {
    "list.activeSelectionBackground": `${palette.bg3}80`,
    "list.inactiveSelectionBackground": `${palette.bg3}80`,
    "list.focusBackground": `${palette.bg3}80`,
    "list.inactiveFocusBackground": `${palette.bg3}80`,
    "activityBar.border": `${palette.bg0}`,
    "activityBar.background": `${palette.bg0}`,
    "sideBar.background": `${palette.bg1}`,
    "panel.background": `${palette.bg2}`,
    "panel.border": `${palette.bg2}`,
    "panelSectionHeader.background": `${palette.bg2}`,
    "statusBar.background": `${palette.bg0}`,
    "statusBar.border": `${palette.bg0}`,
    "statusBar.debuggingBackground": `${palette.bg0}`,
    "statusBar.noFolderBackground": `${palette.bg0}`,
    "statusBar.noFolderBorder": `${palette.bg0}`,
    "statusBarItem.prominentBackground": `${palette.bg0}`,
    "statusBarItem.remoteBackground": `${palette.bg0}`,
    "statusBarItem.errorBackground": `${palette.bg0}`,
    "statusBarItem.warningBackground": `${palette.bg0}`,
    "titleBar.activeBackground": `${palette.bg0}`,
    "titleBar.inactiveBackground": `${palette.bg0}`,
    "titleBar.border": `${palette.bg0}`,
    "menu.background": `${palette.bg0}`,
    "menu.selectionBackground": `${palette.bg}`,
  });
}

// vim: fdm=marker fmr={{{,}}}:
