import { Container, Image, MediaBlock } from 'verity-design-system';
import { pageMeta } from '../site';
import utilities from '../utilities.module.css';
import type { Route } from './+types/route';
import resume from './erin-tozour-resume.avif';

// The tab says “Résumé · Erin Tozour”
export const meta = ({ location }: Route.MetaArgs) => pageMeta('Résumé', location.pathname);

// The résumé page (/resume), opened from the Portfolio intro's Résumé button.
// It's a page of its own, not the PDF in a new tab, so visitors stay on the
// site with a way back, even in a Home Screen web app, which has no browser
// controls. It's in Shell's focused mode: the back link in the top-left
// corner, and Download in the top-right (both set in app/root.tsx).
//
// The résumé is one image, column width, like a case study's hero: exported
// from the résumé frame in the site's Figma file at 3× (1836 × 2448, 3:4,
// with white above and below so nothing is cropped), with a shadow so it reads
// as a sheet of paper. Its alt text points to the PDF for the same content as
// text.
//
// The résumé shows Erin's name, so the page's h1, “Résumé,” is visually
// hidden, like the Portfolio's: still there for screen readers, search
// engines, and focus after a page change. It's taken out of the layout, so the
// Container still holds one visible block.
export default function Resume() {
  return (
    <Container>
      <h1 className={utilities.visuallyHidden}>Résumé</h1>
      <MediaBlock>
        <Image
          src={resume}
          alt="Erin Tozour's résumé. Download the PDF for the same content as text."
          aspectRatio="3:4"
          shadow="lg"
          loading="eager"
        />
      </MediaBlock>
    </Container>
  );
}
