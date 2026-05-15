/*---------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import { promises as fs } from "fs";
import { join } from "path";
import { ThemeSpec, THEME_VARIANTS, UserConfiguration } from "./interface";
import { getWorkbench } from "./workbench";
import { getSyntax } from "./syntax";
import { getSemantic } from "./semantic";

export function buildTheme(user: UserConfiguration, spec: ThemeSpec) {
  return {
    name: spec.name,
    type: spec.variant,
    semanticHighlighting: true,
    semanticTokenColors: getSemantic(user, spec.variant),
    colors: getWorkbench(user, spec.variant),
    tokenColors: getSyntax(user, spec.variant),
  };
}

export async function writeAllThemes(
  themesDir: string,
  user: UserConfiguration,
) {
  await Promise.all(
    THEME_VARIANTS.map((spec) =>
      fs.writeFile(
        join(themesDir, spec.fileName),
        `${JSON.stringify(buildTheme(user, spec), null, 2)}\n`,
      ),
    ),
  );
}

// vim: fdm=marker fmr={{{,}}}:
