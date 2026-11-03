import { Section } from 'verity-design-system';
import { pageTitle } from '../site';

export const meta = () => [{ title: pageTitle() }];

// Empty for now: only the page's name, as its heading
export default function Home() {
  return <Section headingLevel={1} heading="Home" />;
}
