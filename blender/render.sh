#!/usr/bin/env bash
# Render the glass x (Blender 5.0+, BlendLuxCore 2.11+ for luxcore).
#   blender/render.sh loop  <luxcore|cycles> [start] [end] [flags]
#   blender/render.sh still <luxcore|cycles> <frame> [flags]
#   blender/render.sh macro <luxcore|cycles> [flags]
# Flags go straight to x_scene.py: --res, --budget.
set -euo pipefail
cd "$(dirname "$0")/.."

BLENDER="${BLENDER:-/Applications/Blender.app/Contents/MacOS/Blender}"
MODE="${1:?usage: render.sh loop|still|macro <luxcore|cycles> ...}"
ENGINE="${2:?engine: luxcore or cycles}"
shift 2

run() { "$BLENDER" -b -P blender/x_scene.py -- --engine "$ENGINE" "$@"; }

case "$MODE" in
  loop)
    START="${1:-0}"
    END="${2:-180}"
    shift $(( $# < 2 ? $# : 2 ))
    run --mode loop --start "$START" --end "$END" --out "blender/out/loop-$ENGINE" "$@"
    ;;
  still)
    FRAME="${1:?usage: render.sh still <engine> <frame>}"
    shift
    run --mode still --frame "$FRAME" --out "blender/out/still-$ENGINE-$FRAME.png" "$@"
    ;;
  macro)
    run --mode macro --out "blender/out/macro-$ENGINE.png" "$@"
    ;;
  *)
    echo "unknown mode: $MODE" >&2
    exit 2
    ;;
esac
