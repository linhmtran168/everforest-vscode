/*---------------------------------------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------------------------------------*/

import { Configuration, ThemeVariant } from "../interface";
import { getPalette } from "../palette";
import { getDefaultSyntax } from "./default";
import { getItalicSyntax } from "./italic";

export function getSyntax(configuration: Configuration, variant: ThemeVariant) {
  const palette = getPalette(configuration, variant);
  const italicComments = configuration.italicComments;
  return configuration.italicKeywords
    ? getItalicSyntax(palette, italicComments)
    : getDefaultSyntax(palette, italicComments);
}

// vim: fdm=marker fmr={{{,}}}:
