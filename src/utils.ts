/*---------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import { promises as fs } from "fs";
import { join } from "path";
import { ConfigurationChangeEvent, workspace, window, commands } from "vscode";
import { Configuration } from "./interface";
import { getThemeData, writeThemeFiles } from "./theme";

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
  getConfiguration(): Configuration {
    // {{{
    const workspaceConfiguration = workspace.getConfiguration("everforest");
    return {
      darkContrast: workspaceConfiguration.get<Configuration["darkContrast"]>(
        "darkContrast",
        "medium",
      ),
      lightContrast: workspaceConfiguration.get<Configuration["lightContrast"]>(
        "lightContrast",
        "medium",
      ),
      darkWorkbench: workspaceConfiguration.get<Configuration["darkWorkbench"]>(
        "darkWorkbench",
        "material",
      ),
      lightWorkbench: workspaceConfiguration.get<
        Configuration["lightWorkbench"]
      >("lightWorkbench", "material"),
      darkSelection: workspaceConfiguration.get<Configuration["darkSelection"]>(
        "darkSelection",
        "grey",
      ),
      lightSelection: workspaceConfiguration.get<
        Configuration["lightSelection"]
      >("lightSelection", "grey"),
      darkCursor: workspaceConfiguration.get<Configuration["darkCursor"]>(
        "darkCursor",
        "white",
      ),
      lightCursor: workspaceConfiguration.get<Configuration["lightCursor"]>(
        "lightCursor",
        "black",
      ),
      italicKeywords: workspaceConfiguration.get<
        Configuration["italicKeywords"]
      >("italicKeywords", false),
      italicComments: workspaceConfiguration.get<
        Configuration["italicComments"]
      >("italicComments", true),
      diagnosticTextBackgroundOpacity: workspaceConfiguration.get<
        Configuration["diagnosticTextBackgroundOpacity"]
      >("diagnosticTextBackgroundOpacity", "0%"),
      highContrast: workspaceConfiguration.get<Configuration["highContrast"]>(
        "highContrast",
        false,
      ),
    };
  } // }}}
  isDefaultConfiguration(configuration: Configuration): boolean {
    // {{{
    return (
      configuration.italicKeywords === false &&
      configuration.italicComments === true &&
      configuration.lightWorkbench === "material" &&
      configuration.darkWorkbench === "material" &&
      configuration.lightContrast === "medium" &&
      configuration.darkContrast === "medium" &&
      configuration.darkCursor === "white" &&
      configuration.lightCursor === "black" &&
      configuration.darkSelection === "grey" &&
      configuration.lightSelection === "grey" &&
      configuration.diagnosticTextBackgroundOpacity === "0%" &&
      configuration.highContrast === false
    );
  } // }}}
  getThemeData(configuration: Configuration) {
    // {{{
    return getThemeData(configuration);
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
  async generate(
    darkPath: string,
    lightPath: string,
    data: { dark: unknown; light: unknown },
  ) {
    // {{{
    await writeThemeFiles(darkPath, lightPath, data);
    this.promptToReload();
  } // }}}
}

// vim: fdm=marker fmr={{{,}}}:
