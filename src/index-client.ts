/*---------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import * as vscode from "vscode";
import { join } from "path";
import Utils from "./utils";

export function activate(context: vscode.ExtensionContext) {
  const utils = new Utils();
  const themesDir = join(__dirname, "..", "themes");

  const disposable = vscode.workspace.onDidChangeConfiguration((event) => {
    utils.detectConfigChanges(event, () => {
      utils.generate(themesDir, utils.getUserConfiguration()).catch((error) => {
        console.error("Failed to regenerate themes.", error);
      });
    });
  });
  context.subscriptions.push(disposable);

  utils
    .checkIfNewlyInstalled()
    .then((isNewInstall) => {
      if (!isNewInstall) {
        return;
      }
      const user = utils.getUserConfiguration();
      if (utils.isDefaultUserConfiguration(user)) {
        return;
      }
      utils
        .generate(themesDir, user)
        .then(() => utils.markAsInstalled())
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
