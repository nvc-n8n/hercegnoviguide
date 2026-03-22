#!/bin/bash
# Download place-specific photos from Wikimedia Commons
# All images are CC-licensed or public domain
set -e
export PYTHONIOENCODING=utf-8

PHOTO_DIR="assets/photos"
cd "$(dirname "$0")/.."

get_thumb_url() {
  local filename="$1"
  local width="${2:-1200}"
  curl -s "https://commons.wikimedia.org/w/api.php?action=query&titles=File:${filename}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=${width}&format=json" | python -c "
import sys, json
d = json.load(sys.stdin)
pages = d['query']['pages']
for p in pages.values():
    if 'imageinfo' in p:
        info = p['imageinfo'][0]
        url = info.get('thumburl', info.get('url', ''))
        meta = info.get('extmetadata', {})
        artist = meta.get('Artist', {}).get('value', 'Unknown')
        lic = meta.get('LicenseShortName', {}).get('value', 'Unknown')
        print(f'{url}|||{artist}|||{lic}')
" 2>/dev/null
}

download_photo() {
  local wiki_filename="$1"
  local local_filename="$2"
  local width="${3:-1200}"

  if [ -f "$PHOTO_DIR/$local_filename" ]; then
    echo "  SKIP $local_filename (exists)"
    return
  fi

  echo "  Downloading $local_filename..."
  local result
  result=$(get_thumb_url "$wiki_filename" "$width")
  local url=$(echo "$result" | cut -d'|||' -f1)

  if [ -n "$url" ] && [ "$url" != "" ]; then
    curl -sL -o "$PHOTO_DIR/$local_filename" "$url"
    if [ -f "$PHOTO_DIR/$local_filename" ] && [ -s "$PHOTO_DIR/$local_filename" ]; then
      echo "  OK $local_filename"
    else
      echo "  FAIL $local_filename (empty file)"
      rm -f "$PHOTO_DIR/$local_filename"
    fi
  else
    echo "  FAIL $local_filename (no URL found)"
  fi
}

echo "=== Downloading place-specific photos from Wikimedia Commons ==="
echo ""

echo "--- Attractions ---"
download_photo "Twierdza_Forte_Mare_w_Herceg_Novi.jpg" "forte-mare.jpg"
download_photo "Kanli_kula_panorama.jpg" "kanli-kula.jpg"
download_photo "Widoki_z_twierdzy_Forte_Mare_na_Herceg_Novi_03_(cropped).jpg" "fort-spanjola-view.jpg"
download_photo "Herceg_Novi_-_kralj_Tvrtko_I_(cropped).jpg" "spomenik-tvrtku.jpg"
download_photo "Herceg_Novi,_Montenegro_-_old_town_gate.jpg" "herceg-novi-gate.jpg"

echo ""
echo "--- Religious ---"
download_photo "Manastir_Savina_01.jpg" "manastir-savina.jpg" 1200
download_photo "Herceg_Novi_-_Church_of_the_Ascention_Day.JPG" "crkva-herceg-novi.jpg"

echo ""
echo "--- Nearby Trips ---"
download_photo "Mamula_island.jpg" "mamula-island.jpg"
download_photo "Our_Lady_of_the_Rocks,_Bay_of_Kotor,_Montenegro.jpg" "gospa-od-skrpjela.jpg"
download_photo "Miriste.jpg" "miriste-beach.jpg"

echo ""
echo "--- Town views ---"
download_photo "Herceg_Novi_from_sea_1.jpg" "herceg-novi-from-sea.jpg"
download_photo "Herceg_Novi_Sunset.JPG" "herceg-novi-sunset.jpg"
download_photo "Walkway_in_Herceg_Novi.JPG" "herceg-novi-walkway.jpg"

echo ""
echo "=== Done ==="
