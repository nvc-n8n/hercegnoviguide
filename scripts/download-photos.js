#!/usr/bin/env node
/**
 * Download beautiful Herceg Novi photos from Pexels (free API).
 *
 * SETUP:
 *   1. Go to https://www.pexels.com/api/ and get a free API key (takes 30 seconds)
 *   2. Run: node scripts/download-photos.js YOUR_PEXELS_API_KEY
 *
 * This will download curated photos to assets/photos/ for use in the app.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.argv[2];
if (!API_KEY) {
  console.error('\n❌ Missing Pexels API key!\n');
  console.error('1. Go to https://www.pexels.com/api/ and sign up (free)');
  console.error('2. Copy your API key');
  console.error('3. Run: node scripts/download-photos.js YOUR_API_KEY\n');
  process.exit(1);
}

const PHOTOS_DIR = path.join(__dirname, '..', 'assets', 'photos');

// Searches to run — each produces photos for specific categories
const SEARCHES = [
  // Herceg Novi specific
  { query: 'Herceg Novi Montenegro', filename: 'herceg-novi-panorama', count: 3 },
  { query: 'Herceg Novi old town', filename: 'herceg-novi-old-town', count: 2 },
  { query: 'Herceg Novi fortress sea', filename: 'herceg-novi-fortress', count: 2 },

  // Bay of Kotor / Boka
  { query: 'Bay of Kotor Montenegro', filename: 'boka-kotorska', count: 3 },
  { query: 'Kotor old town Montenegro', filename: 'kotor-old-town', count: 2 },

  // Montenegro beaches & coast
  { query: 'Montenegro beach turquoise', filename: 'montenegro-beach', count: 4 },
  { query: 'Montenegro coast adriatic sunny', filename: 'montenegro-coast', count: 3 },

  // Mediterranean food & cafes
  { query: 'Mediterranean seafood restaurant outdoor', filename: 'restaurant-mediterranean', count: 3 },
  { query: 'european cafe outdoor sunny', filename: 'cafe-outdoor', count: 2 },
  { query: 'cocktail bar evening mediterranean', filename: 'nightlife-bar', count: 2 },

  // Mediterranean old town / churches
  { query: 'mediterranean stone church old town', filename: 'church-old-town', count: 3 },
  { query: 'monastery mediterranean', filename: 'monastery', count: 2 },

  // Viewpoints / scenic
  { query: 'mediterranean bay viewpoint panorama sunny', filename: 'viewpoint-bay', count: 3 },

  // Market / shopping
  { query: 'mediterranean farmers market outdoor', filename: 'market', count: 2 },

  // Festival / promenade
  { query: 'mediterranean coastal promenade sunset', filename: 'promenade', count: 2 },
  { query: 'outdoor festival lights mediterranean', filename: 'festival', count: 2 },

  // Family
  { query: 'family beach mediterranean sunny', filename: 'family-beach', count: 2 },
];

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Authorization: API_KEY } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error: ${data.slice(0, 200)}`)); }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(filepath);
        return downloadFile(res.headers.location, filepath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

async function main() {
  // Create photos directory
  if (!fs.existsSync(PHOTOS_DIR)) {
    fs.mkdirSync(PHOTOS_DIR, { recursive: true });
  }

  console.log('📸 Downloading Herceg Novi & Montenegro photos from Pexels...\n');

  const manifest = {};
  let totalDownloaded = 0;

  for (const search of SEARCHES) {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(search.query)}&per_page=${search.count}&orientation=landscape&size=large`;

    try {
      const result = await fetchJSON(url);

      if (!result.photos || result.photos.length === 0) {
        console.log(`⚠️  No results for: "${search.query}"`);
        continue;
      }

      for (let i = 0; i < result.photos.length; i++) {
        const photo = result.photos[i];
        const filename = `${search.filename}-${i + 1}.jpg`;
        const filepath = path.join(PHOTOS_DIR, filename);

        // Download the "large" size (good quality, not huge)
        const imageUrl = photo.src.large2x || photo.src.large;

        console.log(`⬇️  ${filename} — "${photo.alt || search.query}" by ${photo.photographer}`);
        await downloadFile(imageUrl, filepath);

        manifest[filename] = {
          query: search.query,
          photographer: photo.photographer,
          photographerUrl: photo.photographer_url,
          pexelsUrl: photo.url,
          alt: photo.alt || '',
          width: photo.width,
          height: photo.height,
        };

        totalDownloaded++;
      }
    } catch (err) {
      console.error(`❌ Error searching "${search.query}": ${err.message}`);
    }

    // Small delay to respect rate limits
    await new Promise(r => setTimeout(r, 200));
  }

  // Write manifest for reference
  const manifestPath = path.join(PHOTOS_DIR, '_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\n✅ Downloaded ${totalDownloaded} photos to assets/photos/`);
  console.log(`📋 Manifest saved to assets/photos/_manifest.json`);
  console.log('\nNow run the app and the photos will be used as local assets!');
  console.log('Credit: All photos from Pexels (https://www.pexels.com) — free for commercial use.');
}

main().catch(console.error);
