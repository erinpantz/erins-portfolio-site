import { Container, Hero, LayeredImage } from 'verity-design-system';
import box from '../../assets/images/profile/layers/box.svg';
import glasses from '../../assets/images/profile/layers/glasses.svg';
import marker from '../../assets/images/profile/layers/marker.svg';
import photo from '../../assets/images/profile/layers/photo.avif';
import squiggle from '../../assets/images/profile/layers/squiggle.svg';
import { pageTitle } from '../site';

export const meta = () => [{ title: pageTitle('Profile') }];

// Profile: a wide Hero on the default background. Its headline is the page's
// h1, with an intro and Erin's photo beside it (at most hero/media-width,
// wrapping under the text when they don't both fit). The photo is a
// LayeredImage: the photo and four shapes, exported from the Profile page in
// Figma (frame erin-profile-photo, 800 × 800), placed and sized in percent of
// that frame. As a mouse moves over it, each layer moves by its depth and the
// picture tilts toward the pointer; it stays still on touch and with reduce
// motion. Screen readers hear it as one image, named by alt. The rest of the
// page's sections are still to come.
export default function Profile() {
  return (
    <Container>
      <Hero
        width="wide"
        heading="Hi, I’m Erin"
        intro="For the past 11 years, I’ve led design at four healthcare startups, most recently bringing AI into the tools care teams use every day. Now I’m designing in code too, building my own design system with AI as a collaborator."
        media={
          <LayeredImage
            alt="Erin smiling in a bright yellow shirt and red glasses, in front of a wall of colorful illustrated portraits"
            aspectRatio="1:1"
            loading="eager"
            layers={[
              // The photo, with its rounded corners in the file
              { src: photo, x: 3, y: 3, width: 94, depth: -0.3 },
              { src: glasses, x: 26.15, y: 34.79, width: 42.25, depth: 0.3, color: '--verity-color-accent-red' },
              { src: squiggle, x: 73, y: 86.63, width: 27, depth: 2, color: '--verity-color-accent-blue' },
              { src: marker, x: -1, y: 8, width: 8, depth: 2, color: '--verity-color-accent-blue' },
              { src: box, x: 0.86, y: 17.61, width: 3.88, depth: 0.85, color: '--verity-color-accent-red' },
            ]}
          />
        }
      />
    </Container>
  );
}
