import { NotFound } from '../NotFound';
import { pageTitle } from '../site';

// Every address that no other route matches. It's built to 404/index.html,
// the page a host sends for addresses that don't exist.
export const meta = () => [{ title: pageTitle('Page not found') }];

export default NotFound;
