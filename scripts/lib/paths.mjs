import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

function currentDir() {
  return dirname(fileURLToPath(import.meta.url));
}

export function getSkillRoot() {
  return resolve(currentDir(), "..", "..");
}

export function getRuntimeLayout(skillRoot = getSkillRoot()) {
  const runtimeDir = join(skillRoot, "runtime");
  const auditDir = join(skillRoot, "audit");
  const stateDir = join(runtimeDir, "state");
  const runtimeBinDir = join(runtimeDir, "bin");
  const runtimeManagedBrowserDir = join(runtimeDir, "browser", "managed");
  const managedChromiumExecutable = join(
    runtimeManagedBrowserDir,
    "Chromium.app",
    "Contents",
    "MacOS",
    "Chromium",
  );

  return {
    skillRoot,
    runtimeDir,
    runtimeBinDir,
    runtimeManagedBrowserDir,
    managedChromiumExecutable,
    runtimeBrowserDir: join(runtimeDir, "browser"),
    runtimeBrowserProfilesDir: join(runtimeDir, "browser", "profiles"),
    runtimeBrowserEphemeralProfilesDir: join(runtimeDir, "browser", "profiles", "ephemeral"),
    runtimeBrowserAdvancedProfilesDir: join(runtimeDir, "browser", "profiles", "advanced"),
    runtimeSocketDir: join(runtimeDir, "socket"),
    runtimeTmpDir: join(runtimeDir, "tmp"),
    runtimeStateDir: stateDir,
    installStateFile: join(stateDir, "install-state.json"),
    auditDir,
    incidentsDir: join(auditDir, "incidents"),
  };
}

export function ensureRuntimeLayout(layout = getRuntimeLayout()) {
  [
    layout.runtimeDir,
    layout.runtimeBinDir,
    layout.runtimeManagedBrowserDir,
    layout.runtimeBrowserDir,
    layout.runtimeBrowserProfilesDir,
    layout.runtimeBrowserEphemeralProfilesDir,
    layout.runtimeBrowserAdvancedProfilesDir,
    layout.runtimeSocketDir,
    layout.runtimeTmpDir,
    layout.runtimeStateDir,
    layout.auditDir,
    layout.incidentsDir,
  ].forEach((dir) => mkdirSync(dir, { recursive: true }));

  return layout;
}
