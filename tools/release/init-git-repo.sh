#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: bash tools/release/init-git-repo.sh /absolute/path/to/standalone-repo" >&2
  exit 2
fi

TARGET="$1"

if [ ! -d "$TARGET" ]; then
  echo "Target repo path does not exist: $TARGET" >&2
  exit 2
fi

if [ -d "$TARGET/.git" ]; then
  echo "Git repository already initialized at: $TARGET"
  exit 0
fi

git -C "$TARGET" init -b main >/dev/null
echo "Initialized git repository at: $TARGET"
