import { Link } from 'react-router';
import { Grid } from 'verity-design-system';
import styles from './PlaygroundGrid.module.css';

export interface PlaygroundItem {
  slug: string;
  href: string;
  heading: string;
  thumbnail: string;
}

// The Playground page's projects, a site component: a square thumbnail for
// each, with its title under it, laid out like the Music page's covers
// (AlbumGrid.tsx). Verity's ProjectCard puts its title on a card beside a 3:2
// image, so this is the site's own markup, from Verity's tokens.
//
// A list (so screen readers hear how many there are), laid out by Verity's
// Grid with items at least md wide (grid/item-min-width/md), spaced with
// gap="xl" (spacing/xl, the space Section puts between blocks), so each
// thumbnail and its title read as one item with room around it. Each item is
// a link to the project's page, through React Router, like the site's other
// links. The title is a level 2 heading, under the page's h1. The thumbnail
// is decorative: the link's name is the title. On hover (with a real pointer)
// and keyboard focus it lifts like a ProjectCard, with Verity's focus ring;
// with reduce motion it doesn't move.
export function PlaygroundGrid({ items }: { items: PlaygroundItem[] }) {
  return (
    <Grid as="ul" width="wide" itemWidth="md" gap="xl">
      {items.map((item) => (
        <li key={item.slug}>
          <Link to={item.href} prefetch="intent" className={styles.project}>
            <img className={styles.thumbnail} src={item.thumbnail} alt="" width={800} height={800} decoding="async" />
            <h2 className={styles.title}>{item.heading}</h2>
          </Link>
        </li>
      ))}
    </Grid>
  );
}
