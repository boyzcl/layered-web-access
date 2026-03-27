import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

import { discoverBrowser } from "./lib/browser-discovery.mjs";
import { readManagedBrowserState, writeManagedBrowserState } from "./lib/managed-browser-state.mjs";
import { discoverNodeRuntime, writeRuntimeNodeLauncher } from "./lib/node-discovery.mjs";
import { assessReadiness } from "./lib/readiness.mjs";
import { ensureRuntimeLayout, getRuntimeLayout } from "./lib/paths.mjs";

function detectHost() {
  if (process.env.CODEX_HOME) {
    return "codex";
  }

  if (process.env.CLAUDE_PROJECT_DIR || process.env.CLAUDECODE === "1") {
    return "claude-code";
  }

  return "generic";
}

function readSkillVersion(layout) {
  const packageJson = JSON.parse(
    readFileSync(new URL("../package.json", import.meta.url), "utf8"),
  );

  return packageJson.version;
}

function makeInstallId(layout) {
  return createHash("sha256")
    .update(layout.skillRoot)
    .digest("hex")
    .slice(0, 12);
}

function main() {
  const layout = ensureRuntimeLayout(getRuntimeLayout());
  const browser = discoverBrowser();
  const managedBrowserState = readManagedBrowserState(layout);
  const nodeRuntime = discoverNodeRuntime();
  const runtimeNodeLauncher = writeRuntimeNodeLauncher(layout, nodeRuntime);
  const readiness = assessReadiness({
    nodeRuntime,
    browser,
    runtimeNodeLauncherExists: Boolean(runtimeNodeLauncher),
  });
  const now = new Date().toISOString();

  const state = {
    install_id: makeInstallId(layout),
    installed_at: now,
    updated_at: now,
    version: readSkillVersion(layout),
    host: detectHost(),
    node: {
      version: process.version,
      available: true,
      strategy: nodeRuntime.strategy,
      node_path: nodeRuntime.nodePath,
      managed_provision_required: nodeRuntime.managedProvisionRequired,
      runtime_launcher: runtimeNodeLauncher,
    },
    browser,
    managed_browser:
      browser.browserPath && browser.strategy !== "managed_chromium_required"
        ? {
            status: "ready",
            source: browser.strategy,
            browser_path: browser.browserPath,
            updated_at: now,
          }
        : managedBrowserState.status === "download_required"
          ? managedBrowserState
          : writeManagedBrowserState(layout, {
              status: "download_required",
              source: "managed_bundle",
              browser_path: null,
              updated_at: now,
              notes: ["Managed Chromium bundle is required when no supported local browser is available."],
            }),
    paths: {
      skill_root: layout.skillRoot,
      runtime_dir: layout.runtimeDir,
      runtime_bin_dir: layout.runtimeBinDir,
      runtime_managed_browser_dir: layout.runtimeManagedBrowserDir,
      state_file: layout.installStateFile,
      audit_dir: layout.auditDir,
    },
    advanced_mode: {
      supported: true,
      enabled_by_default: false,
      isolated_profile_required: true,
    },
    support_boundary: {
      public_content_only: true,
      logged_in_reading_supported: false,
    },
    readiness,
  };

  writeFileSync(layout.installStateFile, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  process.stdout.write(`${JSON.stringify(state, null, 2)}\n`);
}

main();
