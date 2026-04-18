/*---------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import { promises as fs } from "fs";
import { join } from "path";
import { ConfigurationChangeEvent, workspace, window, commands } from "vscode";
import { UserConfiguration } from "./interface";
import { writeAllThemes } from "./theme";

export default class Utils {
  detectConfigChanges(
    // {{{
    event: ConfigurationChangeEvent,
    onConfigChange: () => void,
  ): void {
    if (event.affectsConfiguration("everforest")) {
      onConfigChange();
    }
  } // }}}
  getUserConfiguration(): UserConfiguration {
    // {{{
    const workspaceConfiguration = workspace.getConfiguration("everforest");
    return {
      darkSelection: workspaceConfiguration.get<
        UserConfiguration["darkSelection"]
      >("darkSelection", "grey"),
      lightSelection: workspaceConfiguration.get<
        UserConfiguration["lightSelection"]
      >("lightSelection", "grey"),
      darkCursor: workspaceConfiguration.get<UserConfiguration["darkCursor"]>(
        "darkCursor",
        "white",
      ),
      lightCursor: workspaceConfiguration.get<UserConfiguration["lightCursor"]>(
        "lightCursor",
        "black",
      ),
      italicKeywords: workspaceConfiguration.get<
        UserConfiguration["italicKeywords"]
      >("italicKeywords", false),
      italicComments: workspaceConfiguration.get<
        UserConfiguration["italicComments"]
      >("italicComments", true),
      diagnosticTextBackgroundOpacity: workspaceConfiguration.get<
        UserConfiguration["diagnosticTextBackgroundOpacity"]
      >("diagnosticTextBackgroundOpacity", "0%"),
      highContrast: workspaceConfiguration.get<
        UserConfiguration["highContrast"]
      >("highContrast", false),
      darkContrast: workspaceConfiguration.get<
        UserConfiguration["darkContrast"]
      >("darkContrast", "medium"),
      lightContrast: workspaceConfiguration.get<
        UserConfiguration["lightContrast"]
      >("lightContrast", "medium"),
      darkWorkbench: workspaceConfiguration.get<
        UserConfiguration["darkWorkbench"]
      >("darkWorkbench", "material"),
      lightWorkbench: workspaceConfiguration.get<
        UserConfiguration["lightWorkbench"]
      >("lightWorkbench", "material"),
      lightPalette: workspaceConfiguration.get<
        UserConfiguration["lightPalette"]
      >("lightPalette", "pastel"),
    };
  } // }}}
  isDefaultUserConfiguration(user: UserConfiguration): boolean {
    // {{{
    return (
      user.italicKeywords === false &&
      user.italicComments === true &&
      user.darkCursor === "white" &&
      user.lightCursor === "black" &&
      user.darkSelection === "grey" &&
      user.lightSelection === "grey" &&
      user.diagnosticTextBackgroundOpacity === "0%" &&
      user.highContrast === false &&
      user.darkContrast === "medium" &&
      user.lightContrast === "medium" &&
      user.darkWorkbench === "material" &&
      user.lightWorkbench === "material" &&
      user.lightPalette === "pastel"
    );
  } // }}}
  async checkIfNewlyInstalled(): Promise<boolean> {
    // {{{
    const flagPath = join(__dirname, "..", ".flag");
    const exists = await this.hasFlagFile(flagPath);
    return !exists;
  } // }}}
  async markAsInstalled(): Promise<void> {
    // {{{
    const flagPath = join(__dirname, "..", ".flag");
    await fs.writeFile(flagPath, JSON.stringify("", null, 2));
  } // }}}
  private async hasFlagFile(path: string): Promise<boolean> {
    try {
      await fs.access(path);
      return true;
    } catch (error) {
      if (this.isNotFoundError(error)) {
        return false;
      }
      throw error;
    }
  }
  private isNotFoundError(error: unknown): error is NodeJS.ErrnoException {
    return (
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    );
  }
  private promptToReload() {
    // {{{
    const action = "Reload";
    window
      .showInformationMessage("Reload required.", action)
      .then((selectedAction) => {
        if (selectedAction === action) {
          commands.executeCommand("workbench.action.reloadWindow");
        }
      });
  } // }}}
  async generate(themesDir: string, user: UserConfiguration) {
    // {{{
    await writeAllThemes(themesDir, user);
    this.promptToReload();
  } // }}}
}

// vim: fdm=marker fmr={{{,}}}:
