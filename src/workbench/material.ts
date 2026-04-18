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
  return baseWorkbench(palette, configuration, variant);
}

// vim: fdm=marker fmr={{{,}}}:
