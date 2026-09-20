#!/usr/bin/env bash
# Copy founder + classroom photographs from an attachments/uploads folder
# into public/images. Safe to re-run.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST_CAMPUS="$ROOT/public/images/campus"
DEST_TEAM="$ROOT/public/images/team"
mkdir -p "$DEST_CAMPUS" "$DEST_TEAM"

search=(
  "$HOME/uploads"
  "$ROOT/uploads"
  /home/workdir/attachments
  /tmp/attachments
)

found=()
for d in "${search[@]}"; do
  if [ -d "$d" ]; then
    while IFS= read -r -d '' f; do
      found+=("$f")
    done < <(find "$d" -maxdepth 2 \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) -print0 2>/dev/null)
  fi
done

if [ "${#found[@]}" -eq 0 ]; then
  echo "No attached photographs found in uploads/attachments."
  exit 1
fi

echo "Found ${#found[@]} image(s):"
printf '  %s\n' "${found[@]}"

# Prefer the suit portrait as the founder photo (png or first portrait-like file).
founder=""
for f in "${found[@]}"; do
  base="$(basename "$f")"
  case "$base" in
    image-1.png|image.png) founder="$f"; break ;;
  esac
done
if [ -z "$founder" ]; then
  for f in "${found[@]}"; do
    case "$(basename "$f")" in
      image-2.png|image-2.jpg) founder="$f"; break ;;
    esac
  done
fi

if [ -n "$founder" ]; then
  convert "$founder" -resize '1200x1200>' -strip -quality 88 "$DEST_TEAM/ellis-dennis-graham.jpg"
  echo "Wrote $DEST_TEAM/ellis-dennis-graham.jpg"
fi

# Classroom WhatsApp shots, sorted by name so mapping is stable.
mapfile -t class < <(printf '%s\n' "${found[@]}" | grep -i 'WhatsApp\|12.27' | sort)
if [ "${#class[@]}" -eq 0 ]; then
  mapfile -t class < <(printf '%s\n' "${found[@]}" | grep -viE 'image-1|image-2|ellis' | sort)
fi

# Distinct enough mapping from the Sept 2026 Ebony Road set:
# 1 whiteboard+TV  2 fan/sofa  3 learners  4 whiteboard side
i=1
for f in "${class[@]}"; do
  if [ "$i" -gt 4 ]; then break; fi
  convert "$f" -resize '1800x1800>' -strip -quality 85 "$DEST_CAMPUS/lab-$i.jpg"
  echo "Wrote lab-$i.jpg from $(basename "$f")"
  i=$((i + 1))
done
