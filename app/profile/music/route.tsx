import { useRef, useState } from 'react';
import { Section } from 'verity-design-system';
import { pageTitle } from '../../site';
import { AlbumGrid } from './AlbumGrid';
import { musicAlbums, type MusicAlbum } from './musicAlbums';
import { PlayerPanel } from './PlayerPanel';

export const meta = () => [{ title: pageTitle('Music') }];

// Music, below Profile: Erin's favorite albums. A wide Section, whose heading
// is the page's h1, with its intro and a grid of the albums' covers
// (AlbumGrid.tsx), in the order in albums.ts. Choosing a cover opens the
// player panel (PlayerPanel.tsx) with Spotify's player for that album. The
// covers are the site's own files, so the page doesn't contact Spotify until
// someone chooses an album.
export default function Music() {
  // Worked out while the page is pre-rendered, so an album missing its cover
  // stops the build, with the message in the output
  const albums = musicAlbums();
  const [playing, setPlaying] = useState<MusicAlbum | null>(null);
  // The cover that opened the panel, so focus can go back to it
  const openerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Section
        headingLevel={1}
        heading="Music"
        intro="These are some of my favorite albums of all time. It’s a dream to find a full album where you love every track, and these are mine."
        width="wide"
      >
        <AlbumGrid
          albums={albums}
          onChoose={(album, button) => {
            openerRef.current = button;
            setPlaying(album);
          }}
        />
      </Section>
      <PlayerPanel
        album={playing}
        onClosed={() => {
          setPlaying(null);
          openerRef.current?.focus();
        }}
      />
    </>
  );
}
