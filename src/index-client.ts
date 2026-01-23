/*---------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import { workspace } from "vscode";
import { join } from "path";
import Utils from "./utils";

export function activate() {
  const utils = new Utils();

  // Regenerate theme files when user configuration changes.
  workspace.onDidChangeConfiguration((event) => {
    utils.detectConfigChanges(event, () => {
      utils
        .generate(
          join(__dirname, "..", "themes", "everforest-dark.json"),
          join(__dirname, "..", "themes", "everforest-light.json"),
          utils.getThemeData(utils.getConfiguration()),
        )
        .catch((error) => {
          console.error("Failed to regenerate themes.", error);
        });
    });
  });

  // Regenerate theme files if it's newly installed but the user settings are not the default.
  utils
    .isNewlyInstalled()
    .then((isNewInstall) => {
      if (!isNewInstall) {
        return;
      }
      if (utils.isDefaultConfiguration(utils.getConfiguration())) {
        return;
      }
      utils
        .generate(
          join(__dirname, "..", "themes", "everforest-dark.json"),
          join(__dirname, "..", "themes", "everforest-light.json"),
          utils.getThemeData(utils.getConfiguration()),
        )
        .catch((error) => {
          console.error("Failed to regenerate themes.", error);
        });
    })
    .catch((error) => {
      console.error("Failed to check installation status.", error);
    });
}

export function deactivate() {}

// vim: fdm=marker fmr={{{,}}}:
