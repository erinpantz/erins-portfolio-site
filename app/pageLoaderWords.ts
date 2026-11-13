import type { ShellProps } from 'verity-design-system';

/**
 * What PageLoader says while moving to each section. Written plain:
 * PageLoader shuffles them and adds the ellipsis.
 */
export const PAGE_LOADER_WORDS = {
  portfolio: ['Shuffling the deck', 'Framing the shots', 'Lining up the boxes', 'Polishing the pixels'],
  profile: ['Fixing my bun', 'Tilting my head', 'Finding my glasses', 'Trimming my bangs'],
  playground: ['Balancing the boxes', 'Tipping the seesaw', 'Finding the middle', 'Stacking blocks'],
  home: ['Warming up', 'Turning the e', 'Setting the stage', 'Opening the doors'],
} satisfies ShellProps['loaderWords'];
