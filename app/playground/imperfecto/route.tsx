import { Section } from 'verity-design-system';
import { pageTitle } from '../../site';

export const meta = () => [{ title: pageTitle('Imperfecto') }];

// Imperfecto, a Playground project: for now only its name, as its heading
export default function Imperfecto() {
  return <Section headingLevel={1} heading="Imperfecto" />;
}
