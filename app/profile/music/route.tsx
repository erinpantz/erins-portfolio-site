import { Section } from 'verity-design-system';
import { pageTitle } from '../../site';

export const meta = () => [{ title: pageTitle('Music') }];

// Music, below Profile: Erin's favorite albums. For now only its heading.
export default function Music() {
  return <Section headingLevel={1} heading="Music" />;
}
