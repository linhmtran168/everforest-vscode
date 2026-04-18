/*---------------------------------------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------------------------------------*/

import { join } from "path";
import { Configuration } from "../interface";
import { getThemeData, writeThemeFiles } from "../theme";

(async () => {
  const configuration: Configuration = {
    darkContrast: "medium",
    lightContrast: "medium",
    darkWorkbench: "material",
    lightWorkbench: "material",
    darkSelection: "grey",
    lightSelection: "grey",
    darkCursor: "white",
    lightCursor: "black",
    italicKeywords: false,
    italicComments: true,
    diagnosticTextBackgroundOpacity: "0%",
    highContrast: false,
  };

  await writeThemeFiles(
    join(__dirname, "..", "..", "themes", "everforest-dark.json"),
    join(__dirname, "..", "..", "themes", "everforest-light.json"),
    getThemeData(configuration),
  );
})().catch((error) => {
  console.error("Failed to generate themes:", error);
  process.exit(1);
});

// vim: fdm=marker fmr={{{,}}}:
