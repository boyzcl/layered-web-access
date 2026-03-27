#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
RUNTIME_NODE="$SKILL_ROOT/runtime/bin/node"
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

if [ -x "$RUNTIME_NODE" ]; then
  exec "$RUNTIME_NODE" "$@"
fi

if command -v node >/dev/null 2>&1; then
  exec node "$@"
fi

echo "No usable Node runtime was found for layered-web-access." >&2
echo "Run scripts/install.sh after making a local node executable available, or wait for automatic Node provisioning support." >&2
exit 2

