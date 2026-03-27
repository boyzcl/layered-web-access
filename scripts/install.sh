#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
RUNTIME_NODE="$SKILL_ROOT/runtime/bin/node"
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

if [ -x "$RUNTIME_NODE" ]; then
  exec "$RUNTIME_NODE" "$SCRIPT_DIR/bootstrap.mjs"
fi

if command -v node >/dev/null 2>&1; then
  exec node "$SCRIPT_DIR/bootstrap.mjs"
fi

echo "layered-web-access bootstrap requires an internal Node runtime or a local node executable." >&2
echo "Current status: local Node capture is implemented, but automatic Node download/provision is not finished yet." >&2
exit 2
