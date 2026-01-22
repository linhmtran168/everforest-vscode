/*---------------------------------------------------------------------------------------------
 *  Homepage:   https://github.com/sainnhe/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------------------------------------*/

import { Configuration } from "../interface";
import { getPalette } from "../palette";
import { getDefaultSyntax } from "./default";
import { getItalicSyntax } from "./italic";

export function getSyntax(configuration: Configuration, variant: string) {
  const palette = getPalette(configuration, variant);
  const italicComments = configuration.italicComments ?? true;
  let syntax;
  if (configuration.italicKeywords === true) {
    syntax = getItalicSyntax(palette, italicComments);
  } else {
    syntax = getDefaultSyntax(palette, italicComments);
  }
  return syntax;
}

// vim: fdm=marker fmr={{{,}}}:
