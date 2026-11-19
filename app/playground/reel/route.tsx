import { Container, Hero, Reel } from 'verity-design-system';
import reelMemberProfile from '../../../assets/images/home-reel/reel-01-member-profile.avif';
import reelCareCalendar from '../../../assets/images/home-reel/reel-02-care-calendar.avif';
import reelMammogramCampaign from '../../../assets/images/home-reel/reel-03-mammogram-campaign.avif';
import reelProductivityDashboard from '../../../assets/images/home-reel/reel-04-productivity-dashboard.avif';
import reelCallStoryboard from '../../../assets/images/home-reel/reel-05-call-storyboard.avif';
import { pageTitle } from '../../site';

export const meta = () => [{ title: pageTitle('Reel') }];

// Reel, a Playground project: the reel of Erin's work from her old home page,
// live. A Hero with its name (the page's h1), why she made it, and Verity's
// Reel beside it, with the same five screens in the same order and the same
// label as on Home. Reel handles its own motion: it pauses on hover, focus,
// and its pause button, stops off screen and in a hidden tab, and holds still
// with reduce motion.
export default function ReelProject() {
  return (
    <Container>
      <Hero
        heading="Reel"
        intro="A reel of my work for my old home page, built like a View-Master: each screen dips, swings up and away on an imaginary disc, and the next one rises from below. I tuned the bounce in a prototype until it felt like a spring."
        media={
          <Reel
            label="Examples of my design work"
            images={[
              { src: reelMemberProfile },
              { src: reelCareCalendar },
              { src: reelMammogramCampaign },
              { src: reelProductivityDashboard },
              { src: reelCallStoryboard },
            ]}
          />
        }
      />
    </Container>
  );
}
