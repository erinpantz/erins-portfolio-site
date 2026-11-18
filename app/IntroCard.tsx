import { Button } from 'verity-design-system';
import styles from './IntroCard.module.css';
import { RESUME_HREF } from './site';

// The Portfolio's intro, as the first item in its Grid: a heading, a short
// paragraph about Erin, and a button to her resume, on a subtle card. It's the
// site's own markup because Verity's TextBlock only sets its text in
// body/default, and the intro is body/lg. Its styles are in
// IntroCard.module.css, using only Verity's CSS variables.
export function IntroCard() {
  return (
    <div className={styles.introCard}>
      <div className={styles.text}>
        <h2 className={styles.heading}>Why hello there!</h2>
        <p className={styles.body}>
          I’m a product and visual designer with 20+ years of experience. For the past 11 years, I’ve led design at
          four healthcare startups, most recently bringing AI into the tools care teams use every day. Now I’m designing
          in code too, building my own design system with AI as a collaborator.
        </p>
      </div>
      {/* The same address as the footer's Resume link, in the same tab */}
      <Button href={RESUME_HREF} startIcon="resume">
        Résumé
      </Button>
    </div>
  );
}
