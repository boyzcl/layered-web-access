import { existsSync, readFileSync } from "node:fs";
import { writeJsonFile } from "./json-state.mjs";

export function getManagedBrowserStatePath(layout) {
  return `${layout.runtimeStateDir}/managed-browser.json`;
}

export function readManagedBrowserState(layout) {
  const statePath = getManagedBrowserStatePath(layout);
  if (!existsSync(statePath)) {
    return {
      status: "uninitialized",
      source: null,
      browser_path: null,
      updated_at: null,
      notes: [],
    };
  }

  return JSON.parse(readFileSync(statePath, "utf8"));
}

export function writeManagedBrowserState(layout, state) {
  writeJsonFile(getManagedBrowserStatePath(layout), state);
  return state;
}

