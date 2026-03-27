import { existsSync } from "node:fs";
import { join } from "node:path";

function parseRoot() {
  const rootIndex = process.argv.indexOf("--root");
  if (rootIndex >= 0 && process.argv[rootIndex + 1]) {
    return process.argv[rootIndex + 1];
  }

  throw new Error("Missing --root <path>");
}

function main() {
  const root = parseRoot();
  const requiredFiles = [
    "README.md",
    "SKILL.md",
    "package.json",
    "LICENSE",
    "CONTRIBUTING.md",
    ".gitignore",
    "SECURITY.md",
    "PRIVACY.md",
    "SUPPORT_MATRIX.md",
    "agents/openai.yaml",
    "scripts/install.sh",
    "scripts/doctor.sh",
    "scripts/mode.sh",
    ".github/workflows/ci.yml",
  ];

  const missing = requiredFiles.filter((file) => !existsSync(join(root, file)));
  const hasRuntime = existsSync(join(root, "runtime"));
  const hasAudit = existsSync(join(root, "audit"));

  const result = {
    ok: missing.length === 0 && !hasRuntime && !hasAudit,
    root,
    missing,
    checks: {
      runtime_dir_present: hasRuntime,
      audit_dir_present: hasAudit,
    },
  };

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main();
