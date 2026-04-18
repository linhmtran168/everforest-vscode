/*---------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import { promises as fs } from "fs";
import { Configuration } from "./interface";
import { getWorkbench } from "./workbench";
import { getSyntax } from "./syntax";
import { getSemantic } from "./semantic";

export function getThemeData(configuration: Configuration) {
  // {{{
  return {
    dark: {
      name: "Everforest Dark",
      type: "dark",
      semanticHighlighting: true,
      semanticTokenColors: getSemantic(configuration, "dark"),
      colors: getWorkbench(configuration, "dark"),
      tokenColors: getSyntax(configuration, "dark"),
    },
    light: {
      name: "Everforest Light",
      type: "light",
      semanticHighlighting: true,
      semanticTokenColors: getSemantic(configuration, "light"),
      colors: getWorkbench(configuration, "light"),
      tokenColors: getSyntax(configuration, "light"),
    },
  };
} // }}}

export async function writeThemeFiles(
  darkPath: string,
  lightPath: string,
  data: { dark: unknown; light: unknown },
) {
  // {{{
  await Promise.all([
    fs.writeFile(darkPath, JSON.stringify(data.dark, null, 2)),
    fs.writeFile(lightPath, JSON.stringify(data.light, null, 2)),
  ]);
} // }}}

// vim: fdm=marker fmr={{{,}}}:
