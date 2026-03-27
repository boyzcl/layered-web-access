import {
  chmodSync,
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
} from "node:fs";
import { basename, join, relative } from "node:path";

import { getSkillRoot } from "./lib/paths.mjs";

const EXCLUDED_TOP_LEVEL = new Set(["runtime", "audit", ".export", ".git", "node_modules"]);
const EXCLUDED_BASENAMES = new Set([".DS_Store"]);

function shouldSkip(root, entryPath) {
  const rel = relative(root, entryPath);
  if (!rel) {
    return false;
  }

  const top = rel.split("/")[0];
  if (EXCLUDED_TOP_LEVEL.has(top)) {
    return true;
  }

  return EXCLUDED_BASENAMES.has(basename(entryPath));
}

function copyTree(src, dest, root) {
  const stats = statSync(src);

  if (shouldSkip(root, src)) {
    return;
  }

  if (stats.isDirectory()) {
    mkdirSync(dest, { recursive: true });
    for (const entry of readdirSync(src)) {
      copyTree(join(src, entry), join(dest, entry), root);
    }
    chmodSync(dest, stats.mode);
    return;
  }

  copyFileSync(src, dest);
  chmodSync(dest, stats.mode);
}

function parseOutDir(skillRoot) {
  const outIndex = process.argv.indexOf("--out");
  if (outIndex >= 0 && process.argv[outIndex + 1]) {
    return process.argv[outIndex + 1];
  }

  return join(skillRoot, ".export", "layered-web-access");
}

function main() {
  const skillRoot = getSkillRoot();
  const outDir = parseOutDir(skillRoot);

  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  for (const entry of readdirSync(skillRoot)) {
    copyTree(join(skillRoot, entry), join(outDir, entry), skillRoot);
  }

  const result = {
    ok: true,
    source: skillRoot,
    output: outDir,
    excluded: [...EXCLUDED_TOP_LEVEL],
  };

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main();

