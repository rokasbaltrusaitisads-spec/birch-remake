#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG_FILE="${REPO_ROOT}/.devcontainer/.preview.log"

if pgrep -f "scripts/preview-server.mjs" >/dev/null 2>&1; then
  echo "Birch preview server already running"
  exit 0
fi

cd "${REPO_ROOT}"

# Ensure pnpm is available when postStart runs before a shell loads the profile
if ! command -v pnpm >/dev/null 2>&1; then
  if command -v corepack >/dev/null 2>&1; then
    corepack enable pnpm
  fi
fi

echo "Starting Birch static preview on port ${PORT:-4173}"
nohup pnpm preview -- --host 0.0.0.0 >>"${LOG_FILE}" 2>&1 &

echo "Logs: ${LOG_FILE}"
