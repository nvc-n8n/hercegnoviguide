"""Download place-specific photos from Wikimedia Commons for Herceg Novi Guide app."""
import json
import os
import sys
import urllib.request
import urllib.parse
import time

PHOTO_DIR = os.path.join(os.path.dirname(__file__), '..', 'assets', 'photos')

# Map: local filename -> Wikimedia Commons filename
DOWNLOADS = {
    # --- Attractions ---
    'forte-mare.jpg': 'Twierdza_Forte_Mare_w_Herceg_Novi.jpg',
    'kanli-kula.jpg': 'Kanli_kula_panorama.jpg',
    'fort-spanjola.jpg': '2024-02-04_Fortress_Spanjola,_Herceg_Novi_3.jpg',
    'sahat-kula.jpg': 'HercegNovi,_hodinova_vez_z_18._stol.jpg',
    'gradski-muzej.jpg': 'Herceg_Novi,_Old_Town.jpg',
    'spomenik-tvrtku.jpg': 'Herceg_Novi_-_kralj_Tvrtko_I_(cropped).jpg',
    'kuca-iva-andrica.jpg': 'Herceg_Novi,_Montenegro_-_old_town_gate.jpg',

    # --- Religious ---
    'manastir-savina.jpg': 'Savina_Monastery_Herceg_Novi_Montenegro.jpg',
    'crkva-sv-mihaila.jpg': 'Herceg_Novi_-_Church_of_the_Ascention_Day.JPG',
    'crkva-sv-jeronima.jpg': 'Hercegnovi,_crkva_(2).jpg',

    # --- Beaches ---
    'zanjice-beach.jpg': 'Žanjice_beach_in_Montenegro.jpg',
    'miriste-beach.jpg': 'Miriste.jpg',
    'topla-beach.jpg': 'Topla,_Herceg_-_Novi,_Montenegro_-_panoramio.jpg',
    'igalo-beach.jpg': 'Herceg_-_Novi._Igalo,_Montenegro_-_panoramio.jpg',

    # --- Nearby Trips ---
    'mamula-island.jpg': 'Fort_Mamula_01.jpg',
    'gospa-od-skrpjela.jpg': 'Church_of_Our_Lady_of_the_Rocks,_Perast.jpg',
    'plava-spilja.jpg': 'Blue_Cave_(Plava_špilja),_Bay_of_Kotor,_Montenegro_06.jpg',
    'rimski-mozaici.jpg': 'Risan-Montenegro.RomanMosaics.jpg',
    'kotor-cable-car-view.jpg': 'Kotor_and_Boka_kotorska_-_view_from_city_wall.jpg',

    # --- Town views ---
    'herceg-novi-from-sea.jpg': 'Herceg_Novi_from_sea_1.jpg',
    'herceg-novi-sunset.jpg': 'Herceg_Novi_Sunset.JPG',
    'herceg-novi-walkway.jpg': 'Walkway_in_Herceg_Novi.JPG',
    'herceg-novi-old-town-gate.jpg': 'Herceg_Novi_-_old_town_gate_by_Pudelek.JPG',
    'herceg-novi-square.jpg': '2024-02-04_Herceg_Stjepana_Square,_Herceg_Novi_Old_Town_1.jpg',

    # --- Kotor ---
    'kotor-old-town-view.jpg': 'View_of_Kotor_old_town.jpg',
    'bay-of-kotor-panorama.jpg': 'Bay_of_Kotor_Panorama.jpg',

    # --- Promenade / Views ---
    'topla-area.jpg': 'Topla,_Herceg_-_Novi,_Montenegro_-_panoramio_(2).jpg',
    'igalo-trail.jpg': 'Trail_from_Igalo_to_Herceg_Novi,_Montenegro_01.jpg',
}


def get_thumb_url(wiki_filename, width=1200):
    """Get thumbnail URL from Wikimedia Commons API."""
    encoded = urllib.parse.quote(wiki_filename)
    api_url = (
        f"https://commons.wikimedia.org/w/api.php?"
        f"action=query&titles=File:{encoded}&prop=imageinfo"
        f"&iiprop=url|extmetadata&iiurlwidth={width}&format=json"
    )
    try:
        req = urllib.request.Request(api_url, headers={
            'User-Agent': 'HercegNoviGuideApp/1.0 (educational project)'
        })
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read())
        for page in data['query']['pages'].values():
            if 'imageinfo' in page:
                info = page['imageinfo'][0]
                thumb = info.get('thumburl', info.get('url', ''))
                meta = info.get('extmetadata', {})
                artist = meta.get('Artist', {}).get('value', 'Unknown')
                license_name = meta.get('LicenseShortName', {}).get('value', 'Unknown')
                return thumb, artist, license_name
    except Exception as e:
        print(f"  API error: {e}")
    return None, None, None


def download_file(url, filepath):
    """Download a file from URL."""
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'HercegNoviGuideApp/1.0 (educational project)'
        })
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
        with open(filepath, 'wb') as f:
            f.write(data)
        return len(data)
    except Exception as e:
        print(f"  Download error: {e}")
        return 0


def main():
    os.makedirs(PHOTO_DIR, exist_ok=True)
    manifest_entries = {}
    success = 0
    failed = 0

    for local_name, wiki_name in DOWNLOADS.items():
        filepath = os.path.join(PHOTO_DIR, local_name)

        # Skip if already downloaded (and non-empty)
        if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
            print(f"  SKIP {local_name} (already exists)")
            success += 1
            continue

        print(f"  Fetching {local_name} <- {wiki_name}")
        url, artist, license_name = get_thumb_url(wiki_name)

        if not url:
            print(f"  FAIL {local_name} (no URL)")
            failed += 1
            continue

        size = download_file(url, filepath)
        if size > 1000:
            print(f"  OK {local_name} ({size:,} bytes) [{license_name}]")
            manifest_entries[local_name] = {
                'source': 'Wikimedia Commons',
                'sourceFile': wiki_name,
                'artist': artist,
                'license': license_name,
                'url': f"https://commons.wikimedia.org/wiki/File:{urllib.parse.quote(wiki_name)}",
            }
            success += 1
        else:
            print(f"  FAIL {local_name} (too small: {size} bytes)")
            if os.path.exists(filepath):
                os.remove(filepath)
            failed += 1

        time.sleep(0.3)  # Be nice to the API

    # Save manifest
    manifest_path = os.path.join(PHOTO_DIR, '_wikimedia-manifest.json')
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest_entries, f, indent=2, ensure_ascii=False)

    print(f"\nDone: {success} OK, {failed} failed")
    print(f"Manifest saved to {manifest_path}")


if __name__ == '__main__':
    main()
