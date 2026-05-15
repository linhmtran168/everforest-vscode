#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const pkg = require(path.join(root, "package.json"));
const { buildTheme } = require(path.join(root, "dist", "theme"));
const { THEME_VARIANTS } = require(path.join(root, "dist", "interface"));

const defaultConfiguration = {
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
  lightPalette:
    pkg.contributes.configuration.properties["everforest.lightPalette"].default,
};

const failures = [];

function fail(message) {
  failures.push(message);
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function hexToRgb(hex) {
  return hex
    .replace("#", "")
    .slice(0, 6)
    .match(/../g)
    .map((channel) => Number.parseInt(channel, 16) / 255);
}

function linearize(channel) {
  return channel <= 0.03928
    ? channel / 12.92
    : Math.pow((channel + 0.055) / 1.055, 2.4);
}

function luminance(hex) {
  const [red, green, blue] = hexToRgb(hex).map(linearize);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground, background) {
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

function labColor(hex) {
  const [red, green, blue] = hexToRgb(hex).map((channel) =>
    channel <= 0.04045
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4),
  );
  const x = (red * 0.4124 + green * 0.3576 + blue * 0.1805) / 0.95047;
  const y = red * 0.2126 + green * 0.7152 + blue * 0.0722;
  const z = (red * 0.0193 + green * 0.1192 + blue * 0.9505) / 1.08883;
  const f = (value) =>
    value > 0.008856 ? Math.cbrt(value) : 7.787 * value + 16 / 116;

  return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
}

function colorDistance(first, second) {
  const firstLab = labColor(first);
  const secondLab = labColor(second);
  return Math.hypot(
    firstLab[0] - secondLab[0],
    firstLab[1] - secondLab[1],
    firstLab[2] - secondLab[2],
  );
}

function assertHexValues(value, location) {
  if (typeof value === "string") {
    if (
      value.startsWith("#") &&
      !/^#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value)
    ) {
      fail(`${location}: invalid hex color ${value}`);
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => assertHexValues(item, `${location}.${index}`));
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      assertHexValues(item, `${location}.${key}`);
    }
  }
}

function uniqueTokenForegrounds(theme) {
  return new Map(
    theme.tokenColors
      .filter((token) => token.settings && token.settings.foreground)
      .map((token) => [
        token.settings.foreground,
        token.name || String(token.scope || "<unnamed>"),
      ]),
  );
}

function auditCodingPalette(theme, label) {
  const editorBackground = theme.colors["editor.background"];
  const tokenForegrounds = uniqueTokenForegrounds(theme);
  const scoreIssues = [];

  // Everforest is an aesthetic, eye-comfort-first palette: many tokens sit in
  // the 3.5–4.5:1 range by design. We enforce the 3:1 illegibility floor here
  // and rely on accent-distance below to catch genuinely indistinguishable hues.
  for (const [foreground, name] of tokenForegrounds) {
    const ratio = contrastRatio(foreground, editorBackground);
    if (ratio < 3) {
      scoreIssues.push(
        `token ${name} (${foreground}) has ${ratio.toFixed(
          2,
        )}:1 contrast against ${editorBackground}`,
      );
    }
  }

  for (const token of theme.tokenColors) {
    if (token.name !== "Comment" || !token.settings?.foreground) {
      continue;
    }
    const ratio = contrastRatio(token.settings.foreground, editorBackground);
    if (ratio < 3) {
      scoreIssues.push(
        `comments (${token.settings.foreground}) have ${ratio.toFixed(
          2,
        )}:1 contrast against ${editorBackground}`,
      );
    }
  }

  const accentForegrounds = [
    ...new Set(
      theme.tokenColors
        .filter((token) =>
          /^(Keyword|Storage|String|Function|Preproc|Type|Number)$/.test(
            token.name || "",
          ),
        )
        .map((token) => token.settings?.foreground)
        .filter(Boolean),
    ),
  ];

  for (let index = 0; index < accentForegrounds.length; index += 1) {
    for (
      let comparison = index + 1;
      comparison < accentForegrounds.length;
      comparison += 1
    ) {
      const distance = colorDistance(
        accentForegrounds[index],
        accentForegrounds[comparison],
      );
      if (distance < 12) {
        scoreIssues.push(
          `syntax accents ${accentForegrounds[index]} and ${accentForegrounds[
            comparison
          ]} are too close (${distance.toFixed(1)} DeltaE)`,
        );
      }
    }
  }

  if (scoreIssues.length > 0) {
    const score = Math.max(0, 100 - scoreIssues.length * 10);
    fail(`${label}: coding palette score ${score}/100`);
    for (const issue of scoreIssues) {
      fail(`${label}: ${issue}`);
    }
  }
}

function assertVisibleSeparator(theme, label, separatorKey, backgroundKey) {
  const separator = theme.colors[separatorKey];
  const background = theme.colors[backgroundKey];

  if (!separator) {
    fail(`${label}: missing ${separatorKey}`);
    return;
  }

  if (separator.endsWith("00")) {
    fail(`${label}: ${separatorKey} is transparent (${separator})`);
    return;
  }

  if (separator === background) {
    fail(
      `${label}: ${separatorKey} (${separator}) matches ${backgroundKey} (${background})`,
    );
  }
}

for (const spec of THEME_VARIANTS) {
  const generated = readText(`themes/${spec.fileName}`);
  if (!generated.endsWith("\n")) {
    fail(`${spec.fileName}: generated JSON must end with a newline`);
  }

  const theme = JSON.parse(generated);
  assertHexValues(theme, spec.fileName);

  const rebuilt = `${JSON.stringify(buildTheme(defaultConfiguration, spec), null, 2)}\n`;
  if (generated !== rebuilt) {
    fail(`${spec.fileName}: generated JSON does not match buildTheme output`);
  }

  const editorBackground = theme.colors["editor.background"];
  const isPastelLight =
    spec.variant === "light" && defaultConfiguration.lightPalette === "pastel";

  for (const [foreground, name] of uniqueTokenForegrounds(theme)) {
    const ratio = contrastRatio(foreground, editorBackground);
    if (ratio < 3 && !isPastelLight) {
      fail(
        `${spec.fileName}: token ${name} (${foreground}) has ${ratio.toFixed(
          2,
        )}:1 contrast against ${editorBackground}`,
      );
    }
  }

  // Pastel light is the soft official Everforest palette and is intentionally
  // below WCAG body-text AA. Users who need AA should opt into `lightPalette: strong`.
  if (!isPastelLight) {
    auditCodingPalette(theme, spec.variant);
  }
}

for (const contrast of ["soft", "medium", "hard"]) {
  auditCodingPalette(
    buildTheme(
      {
        ...defaultConfiguration,
        darkContrast: contrast,
      },
      THEME_VARIANTS.find((spec) => spec.variant === "dark"),
    ),
    `dark ${contrast}`,
  );
  auditCodingPalette(
    buildTheme(
      {
        ...defaultConfiguration,
        lightContrast: contrast,
        lightPalette: "strong",
      },
      THEME_VARIANTS.find((spec) => spec.variant === "light"),
    ),
    `light strong ${contrast}`,
  );
}

for (const spec of THEME_VARIANTS) {
  const theme = buildTheme(defaultConfiguration, spec);
  const label = `${spec.variant} material`;

  for (const [separatorKey, backgroundKey] of [
    ["activityBar.border", "activityBar.background"],
    ["sideBar.border", "sideBar.background"],
    ["editorGroup.border", "editor.background"],
    ["editorGroupHeader.tabsBorder", "editorGroupHeader.tabsBackground"],
    ["tab.border", "tab.activeBackground"],
    ["panel.border", "panel.background"],
    ["statusBar.border", "statusBar.background"],
    ["titleBar.border", "titleBar.activeBackground"],
  ]) {
    assertVisibleSeparator(theme, label, separatorKey, backgroundKey);
  }
}

const lightSpec = THEME_VARIANTS.find((spec) => spec.variant === "light");
for (const lightPalette of ["pastel", "strong"]) {
  const theme = buildTheme(
    {
      ...defaultConfiguration,
      lightPalette,
    },
    lightSpec,
  );

  for (const [foregroundKey, backgroundKey] of [
    ["button.foreground", "button.background"],
    ["badge.foreground", "badge.background"],
    ["activityBarBadge.foreground", "activityBarBadge.background"],
    ["extensionButton.prominentForeground", "extensionButton.prominentBackground"],
    ["extensionBadge.remoteForeground", "extensionBadge.remoteBackground"],
  ]) {
    const foreground = theme.colors[foregroundKey];
    const background = theme.colors[backgroundKey];
    const ratio = contrastRatio(foreground, background);
    if (ratio < 4.5) {
      fail(
        `light ${lightPalette}: ${foregroundKey}/${backgroundKey} has ${ratio.toFixed(
          2,
        )}:1 contrast (${foreground} on ${background})`,
      );
    }
  }
}

const claudeMd = readText("CLAUDE.md");
if (
  claudeMd.includes("Contrast and workbench style are NOT user settings") ||
  claudeMd.includes("6 shipped combinations") ||
  claudeMd.includes("buildConfiguration(user, spec)")
) {
  fail("CLAUDE.md contains stale configuration-flow documentation");
}

if (failures.length > 0) {
  console.error("Theme validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Theme validation passed.");
