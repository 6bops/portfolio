#!/usr/bin/env bash
# Re-encode every mp4 under public/videos to H.264, capping width at 1280px and
# stripping audio (the site plays them muted). Keeps the original if it was
# already smaller. Uses the bundled ffmpeg-static binary — no system ffmpeg needed.
# Run: bash scripts/optimize-videos.sh
set -euo pipefail

BIN="node_modules/ffmpeg-static/ffmpeg"
CRF=26
MAXW=1280

before=0
after=0

for f in public/videos/*.mp4; do
  tmp="${f%.mp4}.tmp.mp4"
  "$BIN" -y -loglevel error -i "$f" \
    -vf "scale='min(${MAXW},iw)':-2" \
    -c:v libx264 -crf "$CRF" -preset slow -pix_fmt yuv420p \
    -movflags +faststart -an "$tmp"

  o=$(stat -f%z "$f")
  n=$(stat -f%z "$tmp")
  if [ "$n" -lt "$o" ]; then
    mv "$tmp" "$f"
    kept=$n
  else
    rm "$tmp"
    kept=$o
  fi
  before=$((before + o))
  after=$((after + kept))
  printf "%-34s %5sK -> %5sK  (%s%% smaller)\n" \
    "$(basename "$f")" "$((o / 1024))" "$((kept / 1024))" "$(( (o - kept) * 100 / o ))"
done

printf "\n%d videos: %dMB -> %dMB  (%d%% smaller)\n" \
  "$(ls public/videos/*.mp4 | wc -l | tr -d ' ')" \
  "$((before / 1024 / 1024))" "$((after / 1024 / 1024))" "$(( (before - after) * 100 / before ))"
