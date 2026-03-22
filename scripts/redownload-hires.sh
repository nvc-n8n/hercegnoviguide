#!/bin/bash
# Re-download Pexels photos at ORIGINAL resolution using curl
set -e
cd "$(dirname "$0")/.."

API_KEY="9R77Byzzo5qgj3UT13zeRYrwnYEBpqTRjbnEOtP7vC8TZ4E6baz5Bh1r"
PHOTO_DIR="assets/photos"

dl_pexels() {
  local query="$1" local_name="$2"
  echo "[$local_name] Searching: '$query'"

  local encoded=$(python -c "import urllib.parse; print(urllib.parse.quote('$query'))" 2>/dev/null)
  local json=$(curl -s -H "Authorization: $API_KEY" \
    "https://api.pexels.com/v1/search?query=${encoded}&per_page=1&orientation=landscape")

  local url=$(echo "$json" | python -c "
import sys, json
d = json.load(sys.stdin)
if d.get('photos'):
    print(d['photos'][0]['src']['original'])
" 2>/dev/null)

  if [ -z "$url" ]; then
    echo "  FAIL (no results)"
    return 1
  fi

  curl -sL -o "$PHOTO_DIR/$local_name" "$url"
  local sz=$(wc -c < "$PHOTO_DIR/$local_name")
  if [ "$sz" -gt 50000 ]; then
    echo "  OK ($sz bytes)"
  else
    echo "  FAIL ($sz bytes)"
    rm -f "$PHOTO_DIR/$local_name"
    return 1
  fi
  sleep 0.5
}

echo "=== Re-downloading at ORIGINAL resolution ==="

# Beaches
dl_pexels "Herceg Novi beach summer sunny" "zalo-beach.jpg"
dl_pexels "Montenegro luxury beach resort crystal" "lazure-beach.jpg"
dl_pexels "Montenegro coast crystal clear water" "savina-beach.jpg"
dl_pexels "adriatic beach pebble clear water sunny" "perla-beach.jpg"
dl_pexels "Montenegro rocky beach turquoise water" "kalajza-beach.jpg"
dl_pexels "Montenegro beach turquoise water aerial" "rafaello-beach.jpg"
dl_pexels "Mediterranean small beach cove turquoise" "njivice-beach.jpg"

# Restaurants
dl_pexels "Mediterranean restaurant terrace outdoor dining evening" "tri-lipe.jpg"
dl_pexels "European town cafe restaurant terrace sunny" "gradska-kafana.jpg"
dl_pexels "seaside restaurant panoramic view sunset" "belveder-restoran.jpg"
dl_pexels "Italian restaurant Mediterranean evening elegant" "portofino-restoran.jpg"
dl_pexels "seafood restaurant traditional stone wall" "konoba-aragosta.jpg"
dl_pexels "seaside dining terrace coast sunset" "feral-restoran.jpg"

# Cafes
dl_pexels "specialty coffee shop modern bright" "fabrika-coffee.jpg"
dl_pexels "European cafe espresso barista latte art" "koffein-cafe.jpg"
dl_pexels "sea view cafe terrace Mediterranean sunny" "belavista-cafe.jpg"
dl_pexels "marina cafe waterfront boats sunny" "nautica-cafe.jpg"

# Nightlife
dl_pexels "beach bar nightlife Mediterranean summer evening" "la-bamba.jpg"
dl_pexels "cocktail bar Mediterranean evening lights" "tondo-bar.jpg"
dl_pexels "outdoor bar summer night crowd party" "skuribanda.jpg"
dl_pexels "beach bar sunset party summer golden" "peoples-beach-bar.jpg"

# Festivals
dl_pexels "mimosa yellow flower spring festival bouquet" "festival-mimoze.jpg"
dl_pexels "open air cinema outdoor film night screen" "film-festival.jpg"
dl_pexels "bay night fireworks celebration boats water" "boka-noc.jpg"
dl_pexels "outdoor music concert stage summer night" "sunceane-skale.jpg"

# Shopping
dl_pexels "farmers market fresh vegetables Mediterranean colorful" "zelena-pijaca.jpg"
dl_pexels "souvenir shop old town Mediterranean gifts" "stari-grad-suveniri.jpg"
dl_pexels "modern shopping center bright" "hdi-centar.jpg"

# Viewpoints & nearby
dl_pexels "Bay of Kotor viewpoint panorama sunny" "tajno-brdo.jpg"
dl_pexels "Our Lady Rocks Perast Montenegro island" "gospa-od-skrpjela.jpg"
dl_pexels "blue cave grotto sunlight water" "plava-spilja.jpg"
dl_pexels "Roman mosaic ancient floor colorful" "rimski-mozaici.jpg"
dl_pexels "Kotor bay aerial panoramic view sunny" "kotor-cable-car-view.jpg"

# Town views
dl_pexels "Mediterranean coastal promenade flowers sunny" "herceg-novi-walkway.jpg"
dl_pexels "Kotor old town Montenegro sunny square" "kotor-old-town-view.jpg"
dl_pexels "Bay of Kotor panoramic sunny blue" "bay-of-kotor-panorama.jpg"
dl_pexels "Mediterranean seaside promenade palm sunny" "igalo-trail.jpg"
dl_pexels "Mediterranean waterfront sunny coastal town" "topla-area.jpg"
dl_pexels "Mediterranean old town narrow street stone sunny" "kuca-iva-andrica.jpg"
dl_pexels "old town gate arch stone Mediterranean" "herceg-novi-old-town-gate.jpg"
dl_pexels "Mediterranean town square sunny fountain" "herceg-novi-square.jpg"
dl_pexels "stone church old Mediterranean sunny" "crkva-sv-jeronima.jpg"

echo ""
echo "=== Downloading BETTER hero + atrakcije images ==="

dl_pexels "Herceg Novi sunny bay panorama blue colorful" "viewpoint-bay-1.jpg"
dl_pexels "Herceg Novi fortress palm tree sunny Mediterranean sea" "herceg-novi-fortress-1.jpg"

echo ""
echo "=== DONE ==="
