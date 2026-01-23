/*---------------------------------------------------------------
 *  Homepage:   https://github.com/linhmtran168/everforest-vscode
 *  Copyright:  2020 Sainnhe Park <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import { promises as fs } from "fs";
import { join } from "path";
import { ConfigurationChangeEvent, workspace, window, commands } from "vscode";
import { Configuration } from "./interface";
import { getWorkbench } from "./workbench";
import { getSyntax } from "./syntax";
import { getSemantic } from "./semantic";

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
  async isNewlyInstalled(): Promise<boolean> {
    // {{{
    const flagPath = join(__dirname, "..", ".flag");
    const exists = await this.hasFlagFile(flagPath);
    if (exists) {
      return false;
    }
    await this.writeFile(flagPath, "");
    return true;
  } // }}}
  private async writeFile(path: string, data: unknown) {
    // {{{
    await fs.writeFile(path, JSON.stringify(data, null, 2));
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
    await Promise.all([
      this.writeFile(darkPath, data.dark),
      this.writeFile(lightPath, data.light),
    ]);
    this.promptToReload();
  } // }}}
}

// vim: fdm=marker fmr={{{,}}}:
