#!/usr/bin/env bash
# Rendered frames -> the web assets the page uses.
#   blender/encode.sh <loop-frames-dir> <macro.png>
# Frames are RGBA over a transparent film. Everything is laid on pure black
# here; the page blends the video with `lighten`, so codec blacks never show.
set -euo pipefail
cd "$(dirname "$0")/.."

FRAMES="${1:?usage: encode.sh <loop-frames-dir> <macro.png>}"
MACRO="${2:?usage: encode.sh <loop-frames-dir> <macro.png>}"
OUT=public/media/glass
FPS=30
SIZE=$(ffprobe -v error -select_streams v -show_entries stream=width -of csv=p=0 "$FRAMES/0000.png")
MACRO_SIZE=$(ffprobe -v error -select_streams v -show_entries stream=width,height -of csv=s=x:p=0 "$MACRO")
mkdir -p "$OUT"

LOOP_IN=(-framerate "$FPS" -i "$FRAMES/%04d.png" -f lavfi -i "color=c=black:s=${SIZE}x${SIZE}:r=${FPS}")
ON_BLACK="[1][0]overlay=format=auto:shortest=1,format=yuv420p"

ffmpeg -loglevel error -y "${LOOP_IN[@]}" -filter_complex "$ON_BLACK" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -an "$OUT/x-loop.webm"
ffmpeg -loglevel error -y "${LOOP_IN[@]}" -filter_complex "$ON_BLACK" \
  -c:v libx264 -preset slow -crf 23 -profile:v high -movflags +faststart -an "$OUT/x-loop.mp4"

# still <png> <WxH> <name>: a JPEG for every browser and an AVIF for the ones that can.
still() {
  ffmpeg -loglevel error -y -i "$1" -f lavfi -i "color=c=black:s=$2" \
    -filter_complex "[1][0]overlay=format=auto" -frames:v 1 -q:v 3 "$OUT/$3.jpg"
  ffmpeg -loglevel error -y -i "$1" -f lavfi -i "color=c=black:s=$2" \
    -filter_complex "[1][0]overlay=format=auto,format=yuv420p" -frames:v 1 \
    -c:v libsvtav1 -crf 30 "$OUT/$3.avif" 2>/dev/null \
    || { echo "AVIF encode failed: $3" >&2; exit 1; }
}
still "$FRAMES/0000.png" "${SIZE}x${SIZE}" x-poster
still "$MACRO" "$MACRO_SIZE" x-macro

# Favicon: the middle of the poster, where the x sits.
ffmpeg -loglevel error -y -i "$OUT/x-poster.jpg" -vf "crop=iw*0.72:ih*0.72,scale=512:512" app/icon.png

ls -la "$OUT" app/icon.png
