import { existsSync, readFileSync } from "node:fs";

import { discoverBrowser } from "./lib/browser-discovery.mjs";
import { readManagedBrowserState } from "./lib/managed-browser-state.mjs";
import { discoverNodeRuntime } from "./lib/node-discovery.mjs";
import { assessReadiness } from "./lib/readiness.mjs";
import { getRuntimeLayout } from "./lib/paths.mjs";

function main() {
  const layout = getRuntimeLayout();
  const browser = discoverBrowser();
  const managedBrowser = readManagedBrowserState(layout);
  const nodeRuntime = discoverNodeRuntime();
  const installStateExists = existsSync(layout.installStateFile);
  const runtimeNodeLauncher = `${layout.runtimeBinDir}/node`;
  const installState = installStateExists
    ? JSON.parse(readFileSync(layout.installStateFile, "utf8"))
    : null;
  const readiness = assessReadiness({
    nodeRuntime,
    browser,
    runtimeNodeLauncherExists: existsSync(runtimeNodeLauncher),
  });

  const result = {
    ok: readiness.default_mode_ready,
    install_state_exists: installStateExists,
    runtime_node_launcher_exists: existsSync(runtimeNodeLauncher),
    node: {
      ...nodeRuntime,
      runtime_launcher: existsSync(runtimeNodeLauncher) ? runtimeNodeLauncher : null,
    },
    browser,
    managed_browser: managedBrowser,
    mode_support: {
      default_mode: readiness.default_mode_ready,
      advanced_mode: readiness.advanced_mode_ready,
      explicit_enable_required: true,
    },
    readiness,
    install_state: installState,
  };

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main();
