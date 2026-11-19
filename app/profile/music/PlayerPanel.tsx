import { useEffect, useRef, type MouseEvent } from 'react';
import { Heading, IconButton, Link } from 'verity-design-system';
import type { MusicAlbum } from './musicAlbums';
import styles from './PlayerPanel.module.css';

// The Music page's player: a panel that slides in from the right, over the
// page, with the chosen album's title and artist, a Close button, Spotify's
// player for the album, and a “Listen on Spotify” link for anyone whose
// player only plays previews.
//
// It's a modal <dialog>: focus moves into it (to Close) and stays there, the
// page behind can't be reached, and Escape closes it. A scrim covers the page
// behind it, and clicking the scrim closes it too. When it closes, focus goes
// back to the cover that opened it (the page does that, in onClosed).
//
// Spotify's player is an <iframe>, made only while the panel is open, so the
// page doesn't contact Spotify until someone chooses an album, and removed
// when it closes, so the music stops. A different album gets a new player.
//
// It slides like Verity's NavOverlay (its motion tokens and keyframes): in
// from the right, and back out before it closes. With reduce motion, it
// appears and disappears at once.
export function PlayerPanel({ album, onClosed }: { album: MusicAlbum | null; onClosed: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open when an album is chosen
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !album || dialog.open) return;
    delete dialog.dataset.closing;
    dialog.showModal();
  }, [album]);

  // Slide out, then close. With no animation (reduce motion), it closes at once.
  const close = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialog.dataset.closing !== undefined) return;
    dialog.dataset.closing = '';
    Promise.all(dialog.getAnimations().map((animation) => animation.finished))
      .catch(() => {})
      .finally(() => {
        if (dialog.dataset.closing === undefined) return;
        delete dialog.dataset.closing;
        dialog.close();
      });
  };

  // A click on the scrim: the dialog element itself, outside the panel's box
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    const box = event.currentTarget.getBoundingClientRect();
    const inside =
      event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
    if (!inside) close();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.panel}
      aria-labelledby="music-player-title"
      onClick={onClick}
      // Escape: slide out instead of closing at once
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={onClosed}
    >
      {album && (
        <>
          <div className={styles.header}>
            <div className={styles.names}>
              <Heading level={2} id="music-player-title">
                {album.title}
              </Heading>
              <p className={styles.artist}>{album.artist}</p>
            </div>
            {/* Verity has no close icon yet; forward points the way the panel leaves */}
            <IconButton icon="forward" label="Close" onClick={close} />
          </div>
          <iframe
            key={album.spotifyId}
            className={styles.player}
            src={`https://open.spotify.com/embed/album/${album.spotifyId}?utm_source=generator&theme=0`}
            title={`Spotify player: ${album.title} by ${album.artist}`}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
          <p className={styles.listen}>
            <Link href={album.spotifyUrl} opensInNewTab>
              Listen on Spotify
            </Link>
          </p>
        </>
      )}
    </dialog>
  );
}
