import { existsSync, readFileSync, writeFileSync } from "node:fs";

export function readJsonFile(path, fallback = null) {
  if (!existsSync(path)) {
    return fallback;
  }

  return JSON.parse(readFileSync(path, "utf8"));
}

export function writeJsonFile(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

