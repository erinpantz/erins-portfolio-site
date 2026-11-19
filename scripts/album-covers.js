// Saves a cover for every album on the Music page that doesn't have one yet.
// Run `npm run albums:covers` after adding albums to app/profile/music/albums.ts,
// then commit the new files in app/profile/music/covers/.
//
// It asks Spotify's public oEmbed endpoint for each album's cover (no account
// or keys), takes the largest version Spotify serves (1,500 px, or 640, or
// the 300 oEmbed names), resizes it to COVER_SIZE, and saves it as AVIF. The
// site serves these files itself, so visitors' browsers don't contact Spotify
// until they choose to play something. Covers already saved are left alone:
// to replace one, delete its file and run this again.

import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { ALBUMS } from '../app/profile/music/albums.ts';
import { coverFileName } from '../app/profile/music/covers.ts';

const COVERS_DIR = 'app/profile/music/covers';

// Covers show at most about 400 px wide on the Music page, so 800 px is
// enough for sharp 2× screens without making the page heavy
const COVER_SIZE = 800;

// Spotify's cover sizes: the code in each image address that picks the size,
// largest first
const SIZES = [
  { code: 'ab67616d000082c1', px: 1500 },
  { code: 'ab67616d0000b273', px: 640 },
];

// A plain name for the requests, so Spotify can tell what's asking
const HEADERS = { 'User-Agent': 'erintozour-site album-covers script' };

async function largestCover(spotifyUrl) {
  const oembed = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyUrl)}`, {
    headers: HEADERS,
  });
  if (!oembed.ok) throw new Error(`Spotify's oEmbed said ${oembed.status} for ${spotifyUrl}`);
  const { thumbnail_url: thumbnail, thumbnail_width: thumbnailSize } = await oembed.json();
  if (!thumbnail) throw new Error(`Spotify's oEmbed has no cover for ${spotifyUrl}`);
  // Try each larger size in the same address, then the one oEmbed named
  const tries = [
    ...SIZES.map(({ code, px }) => ({ url: thumbnail.replace(/ab67616d[0-9a-f]{8}/, code), px })),
    { url: thumbnail, px: thumbnailSize },
  ];
  for (const { url, px } of tries) {
    const image = await fetch(url, { headers: HEADERS });
    if (image.ok) return { data: Buffer.from(await image.arrayBuffer()), px };
  }
  throw new Error(`Couldn't download a cover for ${spotifyUrl}`);
}

mkdirSync(COVERS_DIR, { recursive: true });
let saved = 0;
for (const album of ALBUMS) {
  const file = join(COVERS_DIR, coverFileName(album));
  if (existsSync(file)) continue;
  const { data, px } = await largestCover(album.spotifyUrl);
  // sharp leaves out the original's metadata
  await sharp(data).resize(COVER_SIZE, COVER_SIZE, { fit: 'cover' }).avif({ quality: 60, effort: 6 }).toFile(file);
  console.log(`Saved ${file} (from Spotify's ${px} px cover, at ${COVER_SIZE} px)`);
  saved++;
}
console.log(saved ? `Saved ${saved} cover${saved === 1 ? '' : 's'}.` : 'Every album already has a cover.');
