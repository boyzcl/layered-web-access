#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
exec bash "$SCRIPT_DIR/../../scripts/lib/runtime-node.sh" "$SCRIPT_DIR/materialize-standalone-repo.mjs" "$@"
