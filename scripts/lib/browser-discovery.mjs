import { existsSync } from "node:fs";
import { readManagedBrowserState } from "./managed-browser-state.mjs";
import { getRuntimeLayout } from "./paths.mjs";

const MACOS_BROWSER_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Arc.app/Contents/MacOS/Arc",
];

export function discoverBrowser(layout = getRuntimeLayout()) {
  const managedBrowserState = readManagedBrowserState(layout);

  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return {
      strategy: "env_override",
      browserPath: process.env.CHROME_PATH,
      managedChromiumRequired: false,
    };
  }

  for (const candidate of MACOS_BROWSER_CANDIDATES) {
    if (existsSync(candidate)) {
      return {
        strategy: "local_browser",
        browserPath: candidate,
        managedChromiumRequired: false,
      };
    }
  }

  if (existsSync(layout.managedChromiumExecutable)) {
    return {
      strategy: "managed_chromium",
      browserPath: layout.managedChromiumExecutable,
      managedChromiumRequired: false,
    };
  }

  if (managedBrowserState.browser_path && existsSync(managedBrowserState.browser_path)) {
    return {
      strategy: "managed_browser_registered",
      browserPath: managedBrowserState.browser_path,
      managedChromiumRequired: false,
    };
  }

  return {
    strategy: "managed_chromium_required",
    browserPath: null,
    managedChromiumRequired: true,
  };
}
