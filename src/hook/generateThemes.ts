/*---------------------------------------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------------------------------------*/

import { join } from "path";
import { UserConfiguration } from "../interface";
import { writeAllThemes } from "../theme";

(async () => {
  const user: UserConfiguration = {
    darkSelection: "grey",
    lightSelection: "grey",
    darkCursor: "white",
    lightCursor: "black",
    italicKeywords: false,
    italicComments: true,
    diagnosticTextBackgroundOpacity: "0%",
    highContrast: false,
    darkContrast: "medium",
    lightContrast: "medium",
    darkWorkbench: "material",
    lightWorkbench: "material",
    lightPalette: "pastel",
  };

  await writeAllThemes(join(__dirname, "..", "..", "themes"), user);
})().catch((error) => {
  console.error("Failed to generate themes:", error);
  process.exit(1);
});

// vim: fdm=marker fmr={{{,}}}:
