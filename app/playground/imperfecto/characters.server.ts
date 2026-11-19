import { openSync, type Font } from 'fontkit';
import { resolve } from 'node:path';

// Imperfecto's character set, read from the font file itself, so the page
// shows whatever the font has: update the font in Verity, and the next build
// lists the new characters. It runs only while the site builds (from the
// page's loader); the ".server" in the name keeps it, and fontkit, out of the
// browser. The page gets the groups as plain data.

// The font Verity ships, the same file the site's styles load
const FONT_FILE = resolve('node_modules/verity-design-system/dist/fonts/Imperfecto-Bold.woff2');

export interface Character {
  /** The character itself */
  character: string;
  /** Its code point, like “U+00E9” */
  codePoint: string;
}

export interface CharacterGroup {
  heading: string;
  characters: Character[];
}

// The groups, in order. Each character goes in the first group it matches, by
// its Unicode category: accented letters go with their case, and everything
// that isn't a letter or a number goes in the last group.
const GROUPS: [heading: string, matches: RegExp][] = [
  ['Uppercase', /\p{Lu}/u],
  ['Lowercase', /\p{Ll}/u],
  ['Numbers', /\p{N}/u],
  ['Punctuation and symbols', /./su],
];

// Spaces (Z), and control, format, and unassigned code points (C)
const INVISIBLE = /[\p{Z}\p{C}]/u;

export function imperfectoCharacterGroups(): CharacterGroup[] {
  const font = openSync(FONT_FILE) as Font;
  const characters = [...font.characterSet]
    .sort((a, b) => a - b)
    // Leave out the space and anything else with nothing to see: invisible
    // code points, and any character whose glyph has no outline
    .filter((code) => !INVISIBLE.test(String.fromCodePoint(code)) && font.glyphForCodePoint(code).path.commands.length > 0)
    .map((code) => ({
      character: String.fromCodePoint(code),
      codePoint: `U+${code.toString(16).toUpperCase().padStart(4, '0')}`,
    }));
  const groups = GROUPS.map(([heading]) => ({ heading, characters: [] as Character[] }));
  for (const item of characters) {
    groups[GROUPS.findIndex(([, matches]) => matches.test(item.character))].characters.push(item);
  }
  return groups.filter((group) => group.characters.length > 0);
}
