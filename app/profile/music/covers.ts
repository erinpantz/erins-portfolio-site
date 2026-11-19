// Each album's cover file: covers/<name>.avif, next to albums.ts, with the
// name made from the album's title (“Preacher’s Daughter” → preachers-daughter).
// `npm run albums:covers` saves them under these names, and the page finds
// them by the same names, so the two always agree.
//
// Plain code with no imports, so the script (scripts/album-covers.js) can
// load it too.

/** The cover's file name for an album, like “preachers-daughter.avif” */
export function coverFileName(album: { title: string }): string {
  const name = album.title
    .toLowerCase()
    // Letters that don't break apart into a plain letter and an accent
    .replace(/æ/g, 'ae')
    .replace(/œ/g, 'oe')
    .replace(/ø/g, 'o')
    // Accents off (é → e), then apostrophes out (preacher’s → preachers)
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/['’]/g, '')
    // Anything else that isn't a letter or a number becomes one hyphen
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${name}.avif`;
}
