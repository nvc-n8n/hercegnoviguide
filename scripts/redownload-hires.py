"""Re-download Pexels photos at ORIGINAL resolution (not 940px 'large').
Also download better hero + atrakcije images (sunny, colorful Herceg Novi).
"""
import json
import os
import sys
import urllib.request
import urllib.parse
import time

PEXELS_API_KEY = '9R77Byzzo5qgj3UT13zeRYrwnYEBpqTRjbnEOtP7vC8TZ4E6baz5Bh1r'
PHOTO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets', 'photos')


def safe_print(msg):
    try:
        print(msg)
    except UnicodeEncodeError:
        print(msg.encode('ascii', 'replace').decode('ascii'))


def pexels_search(query, per_page=3, orientation='landscape'):
    encoded = urllib.parse.quote(query)
    url = f"https://api.pexels.com/v1/search?query={encoded}&per_page={per_page}&orientation={orientation}"
    req = urllib.request.Request(url, headers={
        'Authorization': PEXELS_API_KEY,
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read())
    except Exception as e:
        safe_print(f"  Search error: {e}")
        return None


def download(url, filepath):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'HercegNoviGuide/1.0'})
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = resp.read()
        with open(filepath, 'wb') as f:
            f.write(data)
        return len(data)
    except Exception as e:
        safe_print(f"  Download error: {e}")
        return 0


def download_pexels_photo(query, local_name, pick_index=0):
    """Search Pexels and download at ORIGINAL resolution."""
    filepath = os.path.join(PHOTO_DIR, local_name)
    safe_print(f"  [{local_name}] Searching: '{query}'")

    data = pexels_search(query)
    if not data or not data.get('photos'):
        safe_print(f"  [{local_name}] FAIL - no results")
        return False

    photo = data['photos'][min(pick_index, len(data['photos']) - 1)]
    # Use 'original' for max quality, fall back to 'large2x' (1880px)
    url = photo['src'].get('original') or photo['src'].get('large2x') or photo['src']['large']

    size = download(url, filepath)
    if size > 50000:
        safe_print(f"  [{local_name}] OK ({size:,} bytes) by {photo['photographer']}")
        return True
    else:
        safe_print(f"  [{local_name}] FAIL ({size} bytes)")
        if os.path.exists(filepath):
            os.remove(filepath)
        return False


def main():
    os.makedirs(PHOTO_DIR, exist_ok=True)
    success = 0
    failed = 0

    # ── Photos that need re-downloading at higher resolution ──
    # These were originally downloaded at 940px 'large' quality
    REDOWNLOADS = {
        # Beaches
        'zalo-beach.jpg': 'Herceg Novi beach summer',
        'lazure-beach.jpg': 'Montenegro luxury beach resort',
        'savina-beach.jpg': 'Montenegro coast crystal water',
        'perla-beach.jpg': 'adriatic beach pebble clear water',
        'kalajza-beach.jpg': 'Montenegro rocky beach turquoise',
        'rafaello-beach.jpg': 'Montenegro beach turquoise water',
        'njivice-beach.jpg': 'Mediterranean small beach cove',

        # Restaurants
        'tri-lipe.jpg': 'Mediterranean restaurant terrace outdoor dining',
        'gradska-kafana.jpg': 'European town cafe restaurant terrace',
        'belveder-restoran.jpg': 'seaside restaurant panoramic view',
        'portofino-restoran.jpg': 'Italian restaurant Mediterranean evening',
        'konoba-aragosta.jpg': 'seafood restaurant traditional stone',
        'feral-restoran.jpg': 'seaside dining terrace coast',

        # Cafes
        'fabrika-coffee.jpg': 'specialty coffee shop modern interior',
        'koffein-cafe.jpg': 'European cafe espresso barista',
        'belavista-cafe.jpg': 'sea view cafe terrace Mediterranean',
        'nautica-cafe.jpg': 'nautical cafe marina waterfront',

        # Nightlife
        'la-bamba.jpg': 'beach bar nightlife Mediterranean summer',
        'tondo-bar.jpg': 'cocktail bar Mediterranean evening',
        'skuribanda.jpg': 'outdoor bar summer night crowd',
        'peoples-beach-bar.jpg': 'beach bar sunset party summer',

        # Festivals
        'festival-mimoze.jpg': 'mimosa yellow flower festival spring',
        'film-festival.jpg': 'open air cinema outdoor film night',
        'boka-noc.jpg': 'bay night fireworks celebration boats',
        'sunceane-skale.jpg': 'outdoor music concert stage summer',

        # Shopping
        'zelena-pijaca.jpg': 'farmers market fresh vegetables Mediterranean',
        'stari-grad-suveniri.jpg': 'souvenir shop old town Mediterranean',
        'hdi-centar.jpg': 'modern shopping center',

        # Viewpoints
        'tajno-brdo.jpg': 'Bay of Kotor viewpoint panorama sunny',

        # Nearby trips
        'gospa-od-skrpjela.jpg': 'Our Lady Rocks Perast Montenegro island church',
        'plava-spilja.jpg': 'blue cave grotto light water',
        'rimski-mozaici.jpg': 'Roman mosaic ancient floor detailed',
        'kotor-cable-car-view.jpg': 'Kotor bay aerial panoramic view sunny',

        # Town views
        'herceg-novi-walkway.jpg': 'Mediterranean stone walkway coastal promenade flowers',
        'kotor-old-town-view.jpg': 'Kotor old town Montenegro sunny',
        'bay-of-kotor-panorama.jpg': 'Bay of Kotor panoramic sunny view',
        'igalo-trail.jpg': 'Mediterranean seaside promenade palm trees',
        'topla-area.jpg': 'Herceg Novi waterfront sunny coastal',
        'kuca-iva-andrica.jpg': 'Mediterranean old town narrow street stone',
        'herceg-novi-old-town-gate.jpg': 'old town gate Mediterranean arch stone',
        'herceg-novi-square.jpg': 'Mediterranean town square sunny people',
        'crkva-sv-jeronima.jpg': 'stone church Mediterranean old',
    }

    # ── NEW: Better hero + atrakcije images (sunny, colorful) ──
    NEW_IMAGES = {
        # Better hero - sunny colorful Herceg Novi
        'viewpoint-bay-1.jpg': ('Herceg Novi sunny bay panorama colorful', 0),
        # Better atrakcije category image
        'herceg-novi-fortress-1.jpg': ('Herceg Novi fortress sunny palm tree sea', 0),
    }

    safe_print("=== Re-downloading Pexels images at ORIGINAL resolution ===\n")

    for local_name, query in REDOWNLOADS.items():
        ok = download_pexels_photo(query, local_name)
        if ok:
            success += 1
        else:
            failed += 1
        time.sleep(0.8)

    safe_print("\n=== Downloading better hero + atrakcije images ===\n")

    for local_name, (query, idx) in NEW_IMAGES.items():
        ok = download_pexels_photo(query, local_name, pick_index=idx)
        if ok:
            success += 1
        else:
            failed += 1
        time.sleep(0.8)

    safe_print(f"\nDone: {success} OK, {failed} failed")


if __name__ == '__main__':
    main()
