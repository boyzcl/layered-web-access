import { existsSync } from "node:fs";
import { join } from "node:path";

import { getSkillRoot } from "./lib/paths.mjs";

function parseRoot() {
  const rootIndex = process.argv.indexOf("--root");
  if (rootIndex >= 0 && process.argv[rootIndex + 1]) {
    return process.argv[rootIndex + 1];
  }

  return getSkillRoot();
}

function main() {
  const skillRoot = parseRoot();
  const runtimeDir = join(skillRoot, "runtime");
  const auditDir = join(skillRoot, "audit");
  const rootExists = existsSync(skillRoot);

  const result = {
    ok: rootExists && !existsSync(runtimeDir) && !existsSync(auditDir),
    checks: {
      root_present: rootExists,
      runtime_dir_present: existsSync(runtimeDir),
      audit_dir_present: existsSync(auditDir),
    },
    recommendation: !rootExists
      ? "export root is missing; run `bash scripts/export-standalone.sh` first"
      : !existsSync(runtimeDir) && !existsSync(auditDir)
        ? "release_tree_clean"
        : "run `bash scripts/clean-local-state.sh --yes` before publishing the standalone repository",
  };

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main();
