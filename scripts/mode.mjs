import { join } from "node:path";

import { readJsonFile, writeJsonFile } from "./lib/json-state.mjs";
import { ensureRuntimeLayout, getRuntimeLayout } from "./lib/paths.mjs";

const VALID_COMMANDS = new Set(["status", "enable-advanced", "disable-advanced"]);

function getModeStatePath(layout) {
  return join(layout.runtimeStateDir, "mode-state.json");
}

function defaultState() {
  return {
    mode: "default",
    advanced_mode_enabled: false,
    explicit_enable_required: true,
    public_content_only: true,
    logged_in_reading_supported: false,
    updated_at: null,
  };
}

function loadState(layout) {
  return readJsonFile(getModeStatePath(layout), defaultState());
}

function saveState(layout, state) {
  writeJsonFile(getModeStatePath(layout), state);
}

function enableAdvanced(layout) {
  const nextState = {
    ...loadState(layout),
    mode: "advanced",
    advanced_mode_enabled: true,
    updated_at: new Date().toISOString(),
  };

  saveState(layout, nextState);
  return nextState;
}

function disableAdvanced(layout) {
  const nextState = {
    ...loadState(layout),
    mode: "default",
    advanced_mode_enabled: false,
    updated_at: new Date().toISOString(),
  };

  saveState(layout, nextState);
  return nextState;
}

function main() {
  const command = process.argv[2] || "status";
  const layout = ensureRuntimeLayout(getRuntimeLayout());

  if (!VALID_COMMANDS.has(command)) {
    process.stderr.write(
      `Unsupported mode command: ${command}. Use one of: ${[...VALID_COMMANDS].join(", ")}\n`,
    );
    process.exit(2);
  }

  let result;

  if (command === "enable-advanced") {
    result = enableAdvanced(layout);
  } else if (command === "disable-advanced") {
    result = disableAdvanced(layout);
  } else {
    result = loadState(layout);
  }

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main();

