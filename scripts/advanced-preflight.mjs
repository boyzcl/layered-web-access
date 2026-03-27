import { existsSync, readFileSync } from "node:fs";

import { discoverBrowser } from "./lib/browser-discovery.mjs";
import { readManagedBrowserState } from "./lib/managed-browser-state.mjs";
import { discoverNodeRuntime } from "./lib/node-discovery.mjs";
import { assessReadiness } from "./lib/readiness.mjs";
import { getRuntimeLayout } from "./lib/paths.mjs";

function main() {
  const layout = getRuntimeLayout();
  const browser = discoverBrowser(layout);
  const managedBrowser = readManagedBrowserState(layout);
  const nodeRuntime = discoverNodeRuntime();
  const runtimeNodeLauncher = `${layout.runtimeBinDir}/node`;
  const installStateExists = existsSync(layout.installStateFile);
  const installState = installStateExists
    ? JSON.parse(readFileSync(layout.installStateFile, "utf8"))
    : null;
  const readiness = assessReadiness({
    nodeRuntime,
    browser,
    runtimeNodeLauncherExists: existsSync(runtimeNodeLauncher),
  });

  const preparationSteps = [];

  if (!readiness.default_mode_ready) {
    preparationSteps.push("Default mode is not ready. Provide a local Node runtime or wait for a future packaged runtime path.");
  }

  if (!readiness.advanced_mode_ready) {
    if (!browser.browserPath) {
      preparationSteps.push("Run `bash scripts/prepare-browser.sh status` and prepare a supported local browser or managed Chromium path.");
    }
  }

  if (readiness.advanced_mode_ready) {
    preparationSteps.push("Advanced mode dependencies are ready. You can explicitly enable advanced mode for this session.");
  }

  const result = {
    policy: {
      default_mode_dep_strategy: "avoid_agent_side_dependency_install",
      advanced_mode_dep_strategy: "guided_dependency_preparation_allowed",
    },
    readiness,
    node: {
      ...nodeRuntime,
      runtime_launcher: existsSync(runtimeNodeLauncher) ? runtimeNodeLauncher : null,
    },
    browser,
    managed_browser: managedBrowser,
    install_state_exists: installStateExists,
    install_state: installState,
    preparation_steps: preparationSteps,
  };

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main();

