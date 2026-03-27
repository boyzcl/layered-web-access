import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

function parseRoot() {
  const rootIndex = process.argv.indexOf("--root");
  if (rootIndex >= 0 && process.argv[rootIndex + 1]) {
    return process.argv[rootIndex + 1];
  }

  throw new Error("Missing --root <path>");
}

function git(args, cwd) {
  const result = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8" });
  return {
    status: result.status,
    stdout: result.stdout.trim(),
    stderr: result.stderr.trim(),
  };
}

function main() {
  const root = parseRoot();
  const hasGitDir = existsSync(join(root, ".git"));
  const statusResult = hasGitDir ? git(["status", "--short"], root) : null;
  const branchResult = hasGitDir ? git(["branch", "--show-current"], root) : null;
  const cleanWorktree = statusResult?.status === 0 && statusResult.stdout === "";

  const result = {
    ok:
      hasGitDir &&
      branchResult?.status === 0 &&
      branchResult.stdout === "main" &&
      cleanWorktree,
    root,
    checks: {
      git_dir_present: hasGitDir,
      branch: branchResult?.stdout || null,
      status_short: statusResult?.stdout || "",
    },
    recommendation: !hasGitDir
      ? "run `bash tools/release/init-git-repo.sh <repo-path>`"
      : branchResult?.stdout !== "main"
        ? "switch the standalone repository to branch `main` before pushing"
        : !cleanWorktree
          ? "commit or discard local changes before pushing"
          : "repo_candidate_ready_for_manual_git_review",
  };

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main();
