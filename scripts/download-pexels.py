"""Download place-specific photos from Pexels API for Herceg Novi Guide app."""
import json
import os
import sys
import urllib.request
import urllib.parse
import time

PEXELS_API_KEY = '9R77Byzzo5qgj3UT13zeRYrwnYEBpqTRjbnEOtP7vC8TZ4E6baz5Bh1r'
PHOTO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets', 'photos')

# Map: local filename -> Pexels search query
# We search for specific place names and nearby landmarks
DOWNLOADS = {
    # --- Attractions (ones we still need) ---
    'kuca-iva-andrica.jpg': 'Herceg Novi old town narrow street',
    'herceg-novi-old-town-gate.jpg': 'Herceg Novi old town gate',
    'herceg-novi-square.jpg': 'Herceg Novi square Mediterranean',

    # --- Religious (ones that failed) ---
    'crkva-sv-jeronima.jpg': 'Herceg Novi church stone',

    # --- Beaches ---
    'zalo-beach.jpg': 'Herceg Novi beach',
    'lazure-beach.jpg': 'Montenegro luxury beach',
    'savina-beach.jpg': 'Herceg Novi coast water',
    'perla-beach.jpg': 'Montenegro adriatic beach pebble',
    'kalajza-beach.jpg': 'Montenegro rocky beach blue water',
    'rafaello-beach.jpg': 'Montenegro beach turquoise',
    'njivice-beach.jpg': 'Montenegro small beach',

    # --- Nearby Trips (ones that failed) ---
    'gospa-od-skrpjela.jpg': 'Our Lady of the Rocks Perast Montenegro',
    'plava-spilja.jpg': 'blue cave Montenegro',
    'rimski-mozaici.jpg': 'Roman mosaic floor ancient',
    'kotor-cable-car-view.jpg': 'Kotor bay view aerial Montenegro',

    # --- Restaurants ---
    'tri-lipe.jpg': 'Mediterranean restaurant terrace outdoor',
    'gradska-kafana.jpg': 'European town cafe restaurant',
    'belveder-restoran.jpg': 'seaside restaurant view Montenegro',
    'portofino-restoran.jpg': 'Italian restaurant Mediterranean',
    'konoba-aragosta.jpg': 'seafood restaurant traditional stone',
    'feral-restoran.jpg': 'seaside dining Montenegro coast',

    # --- Cafes ---
    'fabrika-coffee.jpg': 'specialty coffee shop modern',
    'koffein-cafe.jpg': 'European cafe espresso',
    'belavista-cafe.jpg': 'sea view cafe terrace',
    'nautica-cafe.jpg': 'nautical cafe marina',

    # --- Nightlife ---
    'la-bamba.jpg': 'Montenegro nightlife bar beach',
    'tondo-bar.jpg': 'Mediterranean cocktail bar night',
    'skuribanda.jpg': 'outdoor bar night summer',
    'peoples-beach-bar.jpg': 'beach bar sunset party',

    # --- Festivals ---
    'festival-mimoze.jpg': 'mimosa flower yellow festival',
    'film-festival.jpg': 'open air cinema outdoor film',
    'boka-noc.jpg': 'boat night celebration bay fireworks',
    'sunceane-skale.jpg': 'outdoor music concert stage',

    # --- Shopping ---
    'zelena-pijaca.jpg': 'farmers market vegetables Mediterranean',
    'stari-grad-suveniri.jpg': 'souvenir shop old town',
    'hdi-centar.jpg': 'shopping center modern',

    # --- Viewpoints ---
    'tajno-brdo.jpg': 'bay of Kotor viewpoint panorama',

    # --- More town views ---
    'herceg-novi-walkway.jpg': 'Mediterranean stone walkway coastal promenade',
    'kotor-old-town-view.jpg': 'Kotor old town Montenegro',
    'bay-of-kotor-panorama.jpg': 'Bay of Kotor panoramic view',

    # --- Promenade ---
    'igalo-trail.jpg': 'Mediterranean seaside promenade walking path',
    'topla-area.jpg': 'Herceg Novi waterfront coastal',
}


def search_pexels(query, per_page=1):
    """Search Pexels API and return photo data."""
    encoded_query = urllib.parse.quote(query)
    api_url = f"https://api.pexels.com/v1/search?query={encoded_query}&per_page={per_page}&orientation=landscape"
    req = urllib.request.Request(api_url, headers={
        'Authorization': PEXELS_API_KEY,
        'User-Agent': 'HercegNoviGuide/1.0',
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read())
        if data.get('photos'):
            photo = data['photos'][0]
            return {
                'url': photo['src']['large'],  # 940px wide, good quality
                'photographer': photo['photographer'],
                'photographer_url': photo['photographer_url'],
                'pexels_url': photo['url'],
                'alt': photo.get('alt', ''),
            }
    except Exception as e:
        print(f"  API error for '{query}': {e}")
    return None


def download_file(url, filepath):
    """Download a file from URL."""
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'HercegNoviGuide/1.0',
        })
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
        with open(filepath, 'wb') as f:
            f.write(data)
        return len(data)
    except Exception as e:
        print(f"  Download error: {e}")
        return 0


def safe_print(msg):
    """Print with ASCII fallback for Windows console."""
    try:
        print(msg)
    except UnicodeEncodeError:
        print(msg.encode('ascii', 'replace').decode('ascii'))


def main():
    os.makedirs(PHOTO_DIR, exist_ok=True)
    manifest = {}
    success = 0
    failed = 0

    for local_name, query in DOWNLOADS.items():
        filepath = os.path.join(PHOTO_DIR, local_name)

        # Skip if already exists and has decent size
        if os.path.exists(filepath) and os.path.getsize(filepath) > 10000:
            print(f"  SKIP {local_name}")
            success += 1
            continue

        safe_print(f"  Search: '{query}' -> {local_name}")
        photo = search_pexels(query)

        if not photo:
            safe_print(f"  FAIL {local_name} (no results)")
            failed += 1
            time.sleep(0.5)
            continue

        size = download_file(photo['url'], filepath)
        if size > 10000:
            safe_print(f"  OK {local_name} ({size:,} bytes) by {photo['photographer']}")
            manifest[local_name] = {
                'source': 'Pexels',
                'photographer': photo['photographer'],
                'photographerUrl': photo['photographer_url'],
                'pexelsUrl': photo['pexels_url'],
                'alt': photo['alt'],
                'searchQuery': query,
                'license': 'Pexels License (free for commercial use)',
            }
            success += 1
        else:
            safe_print(f"  FAIL {local_name} ({size} bytes)")
            if os.path.exists(filepath):
                os.remove(filepath)
            failed += 1

        # Pexels rate limit: 200 requests/hour, be conservative
        time.sleep(1)

    # Save manifest
    manifest_path = os.path.join(PHOTO_DIR, '_pexels-new-manifest.json')
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    print(f"\nDone: {success} OK, {failed} failed")
    print(f"Manifest: {manifest_path}")


if __name__ == '__main__':
    main()
