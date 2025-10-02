#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG_DIR="/workspaces/.logs"
PREVIEW_LOG="${LOG_DIR}/preview.log"
DEV_LOG="${LOG_DIR}/dev.log"

mkdir -p "${LOG_DIR}"

cd "${REPO_ROOT}"

ensure_pnpm() {
  if ! command -v pnpm >/dev/null 2>&1; then
    echo "pnpm is not available on PATH; skipping workspace automation."
    return 1
  fi
  return 0
}

start_preview() {
  local preview_port="${PREVIEW_PORT:-${PORT:-4173}}"
  if pgrep -f "scripts/preview-server.mjs" >/dev/null 2>&1; then
    echo "Static preview already running (PID $(pgrep -f "scripts/preview-server.mjs" | tr '\n' ' '))."
    return 0
  fi
  echo "Starting Birch static preview on port ${preview_port} (logs -> ${PREVIEW_LOG})."
  nohup pnpm preview -- --host 0.0.0.0 --port "${preview_port}" >>"${PREVIEW_LOG}" 2>&1 &
}

start_dev() {
  if pgrep -f "pnpm dev" >/dev/null 2>&1; then
    echo "pnpm dev already running (PID $(pgrep -f "pnpm dev" | tr '\n' ' '))."
    return 0
  fi
  echo "Starting pnpm dev in background (logs -> ${DEV_LOG})."
  nohup pnpm dev >>"${DEV_LOG}" 2>&1 &
}

if [[ "${AUTO_PREVIEW:-0}" == "1" ]] && ensure_pnpm; then
  start_preview
fi

if [[ "${AUTO_DEV:-0}" == "1" ]] && ensure_pnpm; then
  start_dev
fi

if [[ "${AUTO_PREVIEW:-0}" != "1" && "${AUTO_DEV:-0}" != "1" ]]; then
  echo "Codespace ready. Set AUTO_PREVIEW=1 or AUTO_DEV=1 to launch background services."
  echo "Logs directory: ${LOG_DIR}"
fi
