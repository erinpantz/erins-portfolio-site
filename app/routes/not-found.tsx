import { NotFound } from '../NotFound';
import { pageMeta } from '../site';

// Every address that no other route matches. It's built to 404/index.html,
// the page a host sends for addresses that don't exist.
export const meta = () => pageMeta('Page not found');

export default NotFound;
