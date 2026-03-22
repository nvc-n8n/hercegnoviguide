#!/usr/bin/env node
/**
 * Download curated Herceg Novi photos — NO API key needed.
 * Uses Wikimedia Commons (CC-licensed) and Unsplash (free).
 *
 * Run: node scripts/download-photos-simple.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PHOTOS_DIR = path.join(__dirname, '..', 'assets', 'photos');

// Curated photo URLs — all free-to-use, verified beautiful Herceg Novi / Montenegro shots
const PHOTOS = [
  // ── Herceg Novi panoramas & old town ─────────────────────
  {
    name: 'hn-panorama-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Herceg_Novi.JPG/1280px-Herceg_Novi.JPG',
    category: 'panorama',
    desc: 'Herceg Novi panorama from the bay',
  },
  {
    name: 'hn-panorama-2.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Herceg_Novi_Primorje.JPG/1280px-Herceg_Novi_Primorje.JPG',
    category: 'panorama',
    desc: 'Herceg Novi coastline Primorje',
  },
  {
    name: 'hn-old-town-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Herceg_Novi_-_old_city.JPG/1280px-Herceg_Novi_-_old_city.JPG',
    category: 'attractions',
    desc: 'Herceg Novi old city view',
  },

  // ── Forte Mare ────────────────────────────────────────────
  {
    name: 'forte-mare-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/2024-02-04_Forte_Mare%2C_Herceg_Novi.jpg/1280px-2024-02-04_Forte_Mare%2C_Herceg_Novi.jpg',
    category: 'attractions',
    desc: 'Forte Mare fortress, Herceg Novi',
  },

  // ── Kanli Kula / Spanjola ─────────────────────────────────
  {
    name: 'spanjola-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/D01.30_Zitadelle_Herceg_Novi.jpg/1280px-D01.30_Zitadelle_Herceg_Novi.jpg',
    category: 'attractions',
    desc: 'Spanjola fortress (Zitadelle)',
  },
  {
    name: 'city-walls-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Herceg_Novi_city_walls-05.JPG/1280px-Herceg_Novi_city_walls-05.JPG',
    category: 'attractions',
    desc: 'Herceg Novi city walls',
  },

  // ── Churches & Monastery ──────────────────────────────────
  {
    name: 'savina-monastery-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Bw306_-_Manastir_Savina.jpg/1280px-Bw306_-_Manastir_Savina.jpg',
    category: 'religious',
    desc: 'Savina Monastery',
  },
  {
    name: 'church-ascension-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Herceg_Novi_-_Church_of_the_Ascention_Day.JPG/1280px-Herceg_Novi_-_Church_of_the_Ascention_Day.JPG',
    category: 'religious',
    desc: 'Church of the Ascension, Herceg Novi',
  },
  {
    name: 'hn-church-color-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Herceg_Novi%2C_2014-04-25_-_panoramio_%287%29.jpg/1280px-Herceg_Novi%2C_2014-04-25_-_panoramio_%287%29.jpg',
    category: 'religious',
    desc: 'Colorful Herceg Novi church scene',
  },

  // ── Promenade ─────────────────────────────────────────────
  {
    name: 'promenade-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Herceg_Novi._Promenade_Pet_Danica_-_panoramio_%281%29.jpg/1280px-Herceg_Novi._Promenade_Pet_Danica_-_panoramio_%281%29.jpg',
    category: 'promenade',
    desc: 'Pet Danica promenade, Herceg Novi',
  },

  // ── Viewpoints ────────────────────────────────────────────
  {
    name: 'viewpoint-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/2024-02-04_A_view_from_Gru%C4%8Dalica_Peak%2C_Herceg_Novi_1.jpg/1280px-2024-02-04_A_view_from_Gru%C4%8Dalica_Peak%2C_Herceg_Novi_1.jpg',
    category: 'viewpoints',
    desc: 'View from Gručalica Peak, Herceg Novi',
  },
  {
    name: 'viewpoint-2.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/2024-02-04_A_vewi_from_Tajno_Brdo_fortress%2C_Herceg_Novi.jpg/1280px-2024-02-04_A_vewi_from_Tajno_Brdo_fortress%2C_Herceg_Novi.jpg',
    category: 'viewpoints',
    desc: 'View from Tajno Brdo fortress',
  },

  // ── Bay of Kotor scenic ───────────────────────────────────
  {
    name: 'boka-bay-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Bay_of_Kotor%2C_Montenegro_-_Oct_2014_-_%2802%29.jpg/1280px-Bay_of_Kotor%2C_Montenegro_-_Oct_2014_-_%2802%29.jpg',
    category: 'nearbyTrips',
    desc: 'Bay of Kotor panoramic view',
  },
  {
    name: 'boka-bay-2.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/20090719_Crkva_Gospa_od_Skrpjela.jpg/1280px-20090719_Crkva_Gospa_od_Skrpjela.jpg',
    category: 'nearbyTrips',
    desc: 'Our Lady of the Rocks, Bay of Kotor',
  },

  // ── Beaches ───────────────────────────────────────────────
  {
    name: 'beach-zanjice-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/%C5%BDanjice_beach.jpg/1280px-%C5%BDanjice_beach.jpg',
    category: 'beaches',
    desc: 'Žanjice beach, crystal clear water',
  },
  {
    name: 'beach-montenegro-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Plavi_Horizonti_%28Blue_Horizons%29_beach_02.jpg/1280px-Plavi_Horizonti_%28Blue_Horizons%29_beach_02.jpg',
    category: 'beaches',
    desc: 'Plavi Horizonti (Blue Horizons) beach',
  },

  // ── Herceg Novi scenes ────────────────────────────────────
  {
    name: 'hn-scene-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/05_-_Herceg_Novi.jpg/1280px-05_-_Herceg_Novi.jpg',
    category: 'general',
    desc: 'Herceg Novi scenic view',
  },
  {
    name: 'hn-scene-2.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Herceg_Novi%2C_Montenegro_-_panoramio_%2810%29.jpg/1280px-Herceg_Novi%2C_Montenegro_-_panoramio_%2810%29.jpg',
    category: 'general',
    desc: 'Herceg Novi, Montenegro scenic',
  },
  {
    name: 'hn-old-town-scene-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Herceg_-_Novi%2C_old_town_-_panoramio.jpg/1280px-Herceg_-_Novi%2C_old_town_-_panoramio.jpg',
    category: 'general',
    desc: 'Herceg Novi old town',
  },

  // ── Mamula fortress ───────────────────────────────────────
  {
    name: 'mamula-1.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Mamula_Island.jpg/1280px-Mamula_Island.jpg',
    category: 'nearbyTrips',
    desc: 'Mamula Island fortress',
  },
];

function download(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, { headers: { 'User-Agent': 'HercegNoviGuideApp/1.0' } }, (res) => {
      // Follow redirects
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
        return download(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(filepath);
        resolve(stats.size);
      });
    }).on('error', reject);
  });
}

async function main() {
  if (!fs.existsSync(PHOTOS_DIR)) {
    fs.mkdirSync(PHOTOS_DIR, { recursive: true });
  }

  console.log('📸 Downloading curated Herceg Novi photos...\n');
  console.log(`📁 Saving to: ${PHOTOS_DIR}\n`);

  let success = 0;
  let failed = 0;

  for (const photo of PHOTOS) {
    const filepath = path.join(PHOTOS_DIR, photo.name);

    // Skip if already downloaded
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  ${photo.name} — already exists, skipping`);
      success++;
      continue;
    }

    try {
      const size = await download(photo.url, filepath);
      const sizeKB = Math.round(size / 1024);
      console.log(`✅ ${photo.name} (${sizeKB}KB) — ${photo.desc}`);
      success++;
    } catch (err) {
      console.error(`❌ ${photo.name} — ${err.message}`);
      failed++;
    }

    // Small delay
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n🎉 Done! ${success} downloaded, ${failed} failed`);
  console.log('\nAll photos are from Wikimedia Commons (CC-licensed).');
  console.log('Now update heroImages.ts to use require() for local assets.\n');
}

main().catch(console.error);
