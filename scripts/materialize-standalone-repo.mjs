import { mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

function currentDir() {
  return dirname(fileURLToPath(import.meta.url));
}

function getSkillRoot() {
  return resolve(currentDir(), "..");
}

function getProjectRoot() {
  return resolve(getSkillRoot(), "..", "..");
}

function parseOutDir() {
  const outIndex = process.argv.indexOf("--out");
  if (outIndex >= 0 && process.argv[outIndex + 1]) {
    return process.argv[outIndex + 1];
  }

  return join(getProjectRoot(), "standalone-repos", "layered-web-access");
}

function main() {
  const skillRoot = getSkillRoot();
  const outDir = parseOutDir();
  const exportScript = join(skillRoot, "scripts", "export-standalone.mjs");

  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(dirname(outDir), { recursive: true });

  const result = spawnSync(process.execPath, [exportScript, "--out", outDir], {
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "materialize-standalone-repo failed");
  }

  const exportResult = JSON.parse(result.stdout);
  process.stdout.write(
    `${JSON.stringify(
      {
        ok: true,
        source: skillRoot,
        output: outDir,
        export_result: exportResult,
      },
      null,
      2,
    )}\n`,
  );
}

main();

