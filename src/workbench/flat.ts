/*---------------------------------------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------------------------------------*/

import { Configuration, Palette, ThemeVariant } from "../interface";
import { baseWorkbench } from "./base";

export function flatWorkbench(
  palette: Palette,
  configuration: Configuration,
  variant: ThemeVariant,
) {
  return baseWorkbench(palette, configuration, variant, {
    "list.activeSelectionBackground": `${palette.bg3}80`,
    "list.inactiveSelectionBackground": `${palette.bg3}80`,
    "list.focusBackground": `${palette.bg3}80`,
    "list.inactiveFocusBackground": `${palette.bg3}80`,
    "sideBar.background": `${palette.bg1}`,
    "sideBarSectionHeader.background": `${palette.bg}`,
    "sideBarSectionHeader.border": `${palette.bg}`,
    "editorGroupHeader.tabsBackground": `${palette.bg1}`,
    "editorGroupHeader.noTabsBackground": `${palette.bg1}`,
    "tab.border": `${palette.bg1}`,
    "tab.activeBorder": `${palette.bg}`,
    "tab.inactiveBackground": `${palette.bg1}`,
    "tab.hoverBorder": `${palette.bg}`,
    "tab.unfocusedActiveBorder": `${palette.bg}`,
    "tab.unfocusedInactiveModifiedBorder": `${palette.bg}`,
    "tab.unfocusedActiveModifiedBorder": `${palette.bg}`,
    "tab.inactiveModifiedBorder": `${palette.bg}`,
    "tab.activeModifiedBorder": `${palette.bg}`,
    "tab.unfocusedHoverBackground": `${palette.bg}`,
    "tab.activeBorderTop": `${palette.badge}d0`,
    "tab.unfocusedActiveBorderTop": `${palette.grey1}`,
    "tab.lastPinnedBorder": `${palette.bg0}`,
    "panel.border": `${palette.bg0}`,
    "panelSection.border": `${palette.bg0}`,
    "statusBar.background": `${palette.bg1}`,
    "statusBar.border": `${palette.bg1}`,
    "statusBar.debuggingBackground": `${palette.bg1}`,
    "statusBar.noFolderBackground": `${palette.bg1}`,
    "statusBar.noFolderBorder": `${palette.bg1}`,
    "statusBarItem.prominentBackground": `${palette.bg1}`,
    "statusBarItem.remoteBackground": `${palette.bg1}`,
    "statusBarItem.errorBackground": `${palette.bg1}`,
    "statusBarItem.warningBackground": `${palette.bg1}`,
    "titleBar.activeBackground": `${palette.bg1}`,
    "titleBar.inactiveBackground": `${palette.bg1}`,
    "titleBar.border": `${palette.bg1}`,
    "menu.background": `${palette.bg1}`,
    "menu.selectionBackground": `${palette.bg}`,
  });
}

// vim: fdm=marker fmr={{{,}}}:
