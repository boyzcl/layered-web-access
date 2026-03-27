#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
exec "$SCRIPT_DIR/lib/runtime-node.sh" "$SCRIPT_DIR/advanced-preflight.mjs"

