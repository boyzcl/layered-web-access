#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
RUNTIME_DIR="$SKILL_ROOT/runtime"
AUDIT_DIR="$SKILL_ROOT/audit"

if [ "${1:-}" != "--yes" ]; then
  echo "This removes local runtime and audit state from the release tree." >&2
  echo "Re-run with --yes to continue." >&2
  exit 2
fi

rm -rf "$RUNTIME_DIR" "$AUDIT_DIR"
echo "Cleaned local state from release tree."
