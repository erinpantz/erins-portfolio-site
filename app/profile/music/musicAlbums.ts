import { ALBUMS, type Album } from './albums';
import { coverFileName } from './covers';

// Every cover in covers/, by its file name
const coverFiles = import.meta.glob<string>('./covers/*.avif', { eager: true, import: 'default' });

export interface MusicAlbum extends Album {
  /** The album's Spotify ID, from its link, for the player */
  spotifyId: string;
  /** The URL of its cover in the site's build */
  cover: string;
}

/**
 * The albums in ALBUMS, in order, each with its cover and Spotify ID. The page
 * calls this while it's pre-rendered, so an album without a cover file (or
 * with a link that isn't an album's) stops the build with a message saying
 * which one and what to do.
 */
export function musicAlbums(): MusicAlbum[] {
  return ALBUMS.map((album) => {
    const fileName = coverFileName(album);
    const cover = coverFiles[`./covers/${fileName}`];
    if (!cover) {
      throw new Error(
        `“${album.title}” by ${album.artist} has no cover: app/profile/music/covers/${fileName} is missing. Run \`npm run albums:covers\` to save it.`,
      );
    }
    const spotifyId = album.spotifyUrl.match(/^https:\/\/open\.spotify\.com\/album\/([A-Za-z0-9]+)/)?.[1];
    if (!spotifyId) {
      throw new Error(
        `“${album.title}” by ${album.artist} has a Spotify link that isn't an album's: ${album.spotifyUrl}. It should look like https://open.spotify.com/album/<id>.`,
      );
    }
    return { ...album, spotifyId, cover };
  });
}
