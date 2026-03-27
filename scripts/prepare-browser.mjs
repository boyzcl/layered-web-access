import { existsSync } from "node:fs";

import { discoverBrowser } from "./lib/browser-discovery.mjs";
import {
  readManagedBrowserState,
  writeManagedBrowserState,
} from "./lib/managed-browser-state.mjs";
import { ensureRuntimeLayout, getRuntimeLayout } from "./lib/paths.mjs";

function now() {
  return new Date().toISOString();
}

function buildStatus(layout) {
  const browser = discoverBrowser(layout);
  const stored = readManagedBrowserState(layout);

  return {
    managed_browser_state: stored,
    browser_discovery: browser,
    next_action:
      browser.browserPath
        ? "none"
        : "provision_managed_browser_or_install_supported_local_browser",
  };
}

function registerPath(layout, candidatePath) {
  if (!candidatePath) {
    throw new Error("Missing browser path. Usage: prepare-browser.mjs register --path /abs/path/to/browser");
  }

  if (!existsSync(candidatePath)) {
    throw new Error(`Browser path does not exist: ${candidatePath}`);
  }

  return writeManagedBrowserState(layout, {
    status: "ready",
    source: "registered_path",
    browser_path: candidatePath,
    updated_at: now(),
    notes: ["Registered external managed browser path."],
  });
}

function markDownloadRequired(layout) {
  return writeManagedBrowserState(layout, {
    status: "download_required",
    source: "managed_bundle",
    browser_path: null,
    updated_at: now(),
    notes: ["Managed Chromium bundle is required but automatic download is not implemented yet."],
  });
}

function main() {
  const layout = ensureRuntimeLayout(getRuntimeLayout());
  const command = process.argv[2] || "status";

  if (command === "status") {
    process.stdout.write(`${JSON.stringify(buildStatus(layout), null, 2)}\n`);
    return;
  }

  if (command === "mark-download-required") {
    process.stdout.write(`${JSON.stringify(markDownloadRequired(layout), null, 2)}\n`);
    return;
  }

  if (command === "register") {
    const pathFlagIndex = process.argv.indexOf("--path");
    const candidatePath = pathFlagIndex >= 0 ? process.argv[pathFlagIndex + 1] : null;
    process.stdout.write(`${JSON.stringify(registerPath(layout, candidatePath), null, 2)}\n`);
    return;
  }

  throw new Error(`Unsupported prepare-browser command: ${command}`);
}

main();

