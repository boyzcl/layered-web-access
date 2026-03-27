export function assessReadiness({ nodeRuntime, browser, runtimeNodeLauncherExists }) {
  const defaultModeReady = Boolean(runtimeNodeLauncherExists || nodeRuntime.nodePath);
  const advancedModeReady = Boolean(defaultModeReady && browser.browserPath);
  const blockers = [];
  const recommendations = [];

  if (!defaultModeReady) {
    blockers.push("no_node_runtime");
    recommendations.push("Provide a local Node executable or wait for automatic Node provisioning support.");
  }

  if (!browser.browserPath) {
    blockers.push("no_browser_binary");
    if (browser.managedChromiumRequired) {
      recommendations.push("Run `bash scripts/prepare-browser.sh status` and then provision a managed Chromium bundle or install a supported local browser.");
    }
  }

  if (defaultModeReady && !advancedModeReady) {
    recommendations.push("Default mode is ready, but advanced mode remains unavailable until a browser binary is ready.");
  }

  return {
    default_mode_ready: defaultModeReady,
    advanced_mode_ready: advancedModeReady,
    blockers,
    recommendations,
  };
}
