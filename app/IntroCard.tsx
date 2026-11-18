import { Button, NavIcon } from 'verity-design-system';
import styles from './IntroCard.module.css';
import { RESUME_HREF } from './site';

// The Portfolio's intro, as the first item in its Grid, on a subtle card that
// reads like the ProjectCards beside it: a picture at the top, words at the
// bottom. The picture is the Profile nav icon, still, in its hover pose (accent
// colors and tilt), the same one visitors see in the nav. It says “this is
// me” without another heading between the page's h1 and the cards' h2s, and
// it's decorative (NavIcon is hidden from screen readers): the paragraph says
// who Erin is. Then the paragraph in body/xl and a button to her résumé. It's
// the site's own markup because Verity's TextBlock only sets its text in
// body/default. Its styles are in IntroCard.module.css, using only Verity's
// CSS variables.
export function IntroCard() {
  return (
    <div className={styles.introCard}>
      <div className={styles.icon}>
        <NavIcon page="profile" pose="hover" fill />
      </div>
      <div className={styles.text}>
        <p className={styles.body}>
          I’m a product and visual designer with 20+ years of experience. For the past 11 years, I’ve led design at
          four healthcare startups, most recently bringing AI into the tools care teams use every day. Now I’m designing
          in code too, building my own design system with AI as a collaborator.
        </p>
        {/* The same address as the footer's Résumé link, in the same tab */}
        <Button href={RESUME_HREF} startIcon="resume">
          Résumé
        </Button>
      </div>
    </div>
  );
}
