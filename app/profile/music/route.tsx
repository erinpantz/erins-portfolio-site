import { Section } from 'verity-design-system';
import { pageTitle } from '../../site';
import { musicAlbums } from './musicAlbums';

export const meta = () => [{ title: pageTitle('Music') }];

// Music, below Profile: Erin's favorite albums. For now only its heading.
export default function Music() {
  // Worked out while the page is pre-rendered, so an album missing its cover
  // stops the build, with the message in the output
  musicAlbums();
  return <Section headingLevel={1} heading="Music" />;
}
