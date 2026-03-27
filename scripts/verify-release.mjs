import { accessSync, constants, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

import { getRuntimeLayout, getSkillRoot } from "./lib/paths.mjs";

function runNodeScript(scriptPath, args = []) {
  const result = spawnSync(process.execPath, [scriptPath, ...args], {
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `failed: ${scriptPath}`);
  }

  return JSON.parse(result.stdout);
}

function main() {
  const skillRoot = getSkillRoot();
  const layout = getRuntimeLayout(skillRoot);
  const installSh = join(skillRoot, "scripts", "install.sh");
  const doctorSh = join(skillRoot, "scripts", "doctor.sh");
  const modeSh = join(skillRoot, "scripts", "mode.sh");
  const advancedPreflightSh = join(skillRoot, "scripts", "advanced-preflight.sh");
  const prepareBrowserSh = join(skillRoot, "scripts", "prepare-browser.sh");
  const bootstrapScript = join(skillRoot, "scripts", "bootstrap.mjs");
  const selfCheckScript = join(skillRoot, "scripts", "self-check.mjs");
  const modeScript = join(skillRoot, "scripts", "mode.mjs");

  accessSync(installSh, constants.X_OK);
  accessSync(doctorSh, constants.X_OK);
  accessSync(modeSh, constants.X_OK);
  accessSync(advancedPreflightSh, constants.X_OK);
  accessSync(prepareBrowserSh, constants.X_OK);

  const bootstrap = runNodeScript(bootstrapScript);
  const selfCheck = runNodeScript(selfCheckScript);
  const enableAdvanced = runNodeScript(modeScript, ["enable-advanced"]);
  const disableAdvanced = runNodeScript(modeScript, ["disable-advanced"]);

  const result = {
    ok: true,
    checks: {
      install_entry_executable: true,
      doctor_entry_executable: true,
      mode_entry_executable: true,
      advanced_preflight_entry_executable: true,
      prepare_browser_entry_executable: true,
      install_state_exists: existsSync(layout.installStateFile),
      bootstrap_ok: Boolean(bootstrap.paths?.state_file),
      self_check_ok: Boolean(selfCheck.ok),
      runtime_node_launcher_exists: Boolean(selfCheck.runtime_node_launcher_exists),
      default_mode_ready: Boolean(selfCheck.readiness?.default_mode_ready),
      advanced_mode_ready: Boolean(selfCheck.readiness?.advanced_mode_ready),
      advanced_mode_enable_ok: enableAdvanced.mode === "advanced",
      advanced_mode_disable_ok: disableAdvanced.mode === "default",
    },
    product_boundary: {
      public_content_only: true,
      logged_in_reading_supported: false,
      challenge_heavy_sites_supported: false,
    },
  };

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main();
