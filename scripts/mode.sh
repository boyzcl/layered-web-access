#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
exec bash "$SCRIPT_DIR/lib/runtime-node.sh" "$SCRIPT_DIR/mode.mjs" "$@"
