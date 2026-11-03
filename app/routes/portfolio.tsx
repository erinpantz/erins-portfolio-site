import { Section } from 'verity-design-system';
import { pageTitle } from '../site';

export const meta = () => [{ title: pageTitle('Portfolio') }];

// Empty for now: only the page's name, as its heading
export default function Portfolio() {
  return <Section headingLevel={1} heading="Portfolio" />;
}
