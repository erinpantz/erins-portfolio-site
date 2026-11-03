import { Section } from 'verity-design-system';
import { pageTitle } from '../site';

export const meta = () => [{ title: pageTitle('Profile') }];

// Empty for now: only the page's name, as its heading
export default function Profile() {
  return <Section headingLevel={1} heading="Profile" />;
}
