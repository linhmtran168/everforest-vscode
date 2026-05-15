#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const { existsSync } = require("node:fs");
const { join } = require("node:path");

const unsupportedNpmEnvKeys = new Set([
  "npm_config_globalconfig",
  "npm_config_verify_deps_before_run",
  "npm_config_ignored_built_dependencies",
  "npm_config_npm_globalconfig",
  "npm_config__jsr_registry",
]);

const [bin, ...args] = process.argv.slice(2);

if (!bin) {
  console.error("Usage: node scripts/run-with-clean-npm-env.cjs <bin> [...args]");
  process.exit(2);
}

const env = { ...process.env };

for (const key of Object.keys(env)) {
  if (unsupportedNpmEnvKeys.has(key.toLowerCase())) {
    delete env[key];
  }
}

const localBin = join(
  process.cwd(),
  "node_modules",
  ".bin",
  process.platform === "win32" ? `${bin}.cmd` : bin,
);
const command = existsSync(localBin) ? localBin : bin;
const result = spawnSync(command, args, {
  env,
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
