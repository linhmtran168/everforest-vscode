/*---------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import { promises as fs } from "fs";
import { join } from "path";
import {
  Configuration,
  ThemeSpec,
  THEME_VARIANTS,
  UserConfiguration,
} from "./interface";
import { getWorkbench } from "./workbench";
import { getSyntax } from "./syntax";
import { getSemantic } from "./semantic";

function buildConfiguration(
  user: UserConfiguration,
  spec: ThemeSpec,
): Configuration {
  return {
    ...user,
    darkContrast: spec.variant === "dark" ? spec.contrast : "medium",
    lightContrast: spec.variant === "light" ? spec.contrast : "medium",
    darkWorkbench: spec.variant === "dark" ? spec.workbench : "material",
    lightWorkbench: spec.variant === "light" ? spec.workbench : "material",
  };
}

export function buildTheme(user: UserConfiguration, spec: ThemeSpec) {
  const configuration = buildConfiguration(user, spec);
  return {
    name: spec.name,
    type: spec.variant,
    semanticHighlighting: true,
    semanticTokenColors: getSemantic(configuration, spec.variant),
    colors: getWorkbench(configuration, spec.variant),
    tokenColors: getSyntax(configuration, spec.variant),
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
        JSON.stringify(buildTheme(user, spec), null, 2),
      ),
    ),
  );
}

// vim: fdm=marker fmr={{{,}}}:
