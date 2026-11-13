import { Container, Hero, Image } from 'verity-design-system';
import erinProfilePhoto from '../../assets/images/profile/erin-profile-photo.avif';
import { pageTitle } from '../site';

export const meta = () => [{ title: pageTitle('Profile') }];

// Profile: a wide Hero on the default background, built like Home's, so the
// two pages line up. Its headline is the page's h1, with an intro and Erin's
// photo beside it (at most hero/media-width, wrapping under the text when they
// don't both fit). The rest of the page's sections are still to come.
export default function Profile() {
  return (
    <Container>
      <Hero
        width="wide"
        heading="Hi, I’m Erin"
        intro="For the past 11 years, I’ve led design at four healthcare startups, most recently bringing AI into the tools care teams use every day. Now I’m designing in code too, building my own design system with AI as a collaborator."
        media={
          <Image
            src={erinProfilePhoto}
            alt="Erin smiling in a bright yellow shirt and red glasses, in front of a wall of colorful illustrated portraits"
            aspectRatio="1:1"
            loading="eager"
          />
        }
      />
    </Container>
  );
}
