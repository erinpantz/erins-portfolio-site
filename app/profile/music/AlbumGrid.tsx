import { Grid } from 'verity-design-system';
import type { MusicAlbum } from './musicAlbums';
import styles from './AlbumGrid.module.css';

// The Music page's albums: a list (so screen readers hear how many there
// are) laid out by Verity's Grid, one cover per item, with the album's title
// and artist under it. Each is a button, since it opens the player rather
// than going to another page, named “Play Ctrl by SZA”. The cover is
// decorative: the button's name says what it is. On hover (with a real
// pointer) and keyboard focus it lifts like a ProjectCard, with Verity's
// focus ring; with reduce motion it doesn't move.
//
// Items are at least md wide (grid/item-min-width/md, 280): 5 across at 1920,
// 4 at 1600, 3 at 1280, 2 at 768, and 1 on a phone. That's the closest
// Verity's Grid comes to 5, 4, 3, and 2: its smallest item width (sm, 200)
// gives 7 at 1920 and still only 1 on a phone.
export function AlbumGrid({
  albums,
  onChoose,
}: {
  albums: MusicAlbum[];
  /** Called with the album, and the button that chose it */
  onChoose: (album: MusicAlbum, button: HTMLButtonElement) => void;
}) {
  return (
    <Grid as="ul" width="wide" itemWidth="md" gap="md">
      {albums.map((album) => (
        <li key={album.spotifyId}>
          <button
            type="button"
            className={styles.album}
            aria-label={`Play ${album.title} by ${album.artist}`}
            onClick={(event) => onChoose(album, event.currentTarget)}
          >
            <img className={styles.cover} src={album.cover} alt="" width={800} height={800} loading="lazy" decoding="async" />
            <span className={styles.text}>
              <span className={styles.title}>{album.title}</span>
              <span className={styles.artist}>{album.artist}</span>
            </span>
          </button>
        </li>
      ))}
    </Grid>
  );
}
