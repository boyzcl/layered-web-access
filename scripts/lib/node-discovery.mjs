import { chmodSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const NODE_CANDIDATES = [
  process.execPath,
  "/opt/homebrew/bin/node",
  "/usr/local/bin/node",
  "/usr/bin/node",
];

export function discoverNodeRuntime() {
  for (const candidate of NODE_CANDIDATES) {
    if (candidate && existsSync(candidate)) {
      return {
        strategy: candidate === process.execPath ? "process_exec_path" : "local_node",
        nodePath: candidate,
        managedProvisionRequired: false,
      };
    }
  }

  return {
    strategy: "managed_node_required",
    nodePath: null,
    managedProvisionRequired: true,
  };
}

export function writeRuntimeNodeLauncher(layout, nodeRuntime) {
  const launcherPath = join(layout.runtimeBinDir, "node");

  if (!nodeRuntime.nodePath) {
    return null;
  }

  const content = [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    `exec "${nodeRuntime.nodePath}" "$@"`,
    "",
  ].join("\n");

  writeFileSync(launcherPath, content, "utf8");
  chmodSync(launcherPath, 0o755);
  return launcherPath;
}

