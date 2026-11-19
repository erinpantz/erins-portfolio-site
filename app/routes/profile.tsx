import { Container, ExperienceItem, Hero, LayeredImage, Link, Section, VerticalStack } from 'verity-design-system';
import box from '../../assets/images/profile/layers/box.svg';
import glasses from '../../assets/images/profile/layers/glasses.svg';
import marker from '../../assets/images/profile/layers/marker.svg';
import photo from '../../assets/images/profile/layers/photo.avif';
import squiggle from '../../assets/images/profile/layers/squiggle.svg';
import { EXPERIENCE } from '../experience';
import { MUSIC_HREF, pageTitle } from '../site';

export const meta = () => [{ title: pageTitle('Profile') }];

// Between an emoji and its link: a space the line can't break at, so an
// emoji never ends one line with its link starting the next
const NO_BREAK_SPACE = '\u00A0';

// An emoji that only decorates: hidden from screen readers, so they read the
// sentence without “pencil” or “headphone” in the middle of it
function Emoji({ children }: { children: string }) {
  return <span aria-hidden="true">{children}</span>;
}

// Profile: a wide Hero on the default background. Its headline is the page's
// h1, with a three-paragraph intro and Erin's photo beside it (at most
// hero/media-width, wrapping under the text when they don't both fit). The
// photo is a LayeredImage: the photo and four shapes, exported from the
// Profile page in Figma (frame erin-profile-photo, 800 × 800), placed and
// sized in percent of that frame. As a mouse moves over it, each layer moves
// by its depth and the picture tilts toward the pointer; it stays still on
// touch and with reduce motion. Screen readers hear it as one image, named by
// alt. The intro links to two of Erin's side projects, her typeface
// (Imperfecto, in Playground) and her favorite albums (Music), each with an
// emoji before it. The links go through the site's router (LinkProvider), so
// they change the page in the app.
//
// Then Experience: a wide Section (its heading is the page's h2) holding a
// wide list, one ExperienceItem per role in app/experience.ts, most recent
// first. Each company is an h3 under “Experience.” The list is a ul with no
// gap: each item draws its own top border and padding. An item sits in a row
// when it's wide enough and stacks when it isn't; Verity decides where.
export default function Profile() {
  return (
    <>
      <Container>
        <Hero
          width="wide"
          heading="Hi, I’m Erin"
          intro={[
            'I’ve been learning new design skills and tools for over 20 years. Lately, that means designing in code, building my own design system with AI as a collaborator.',
            <>
              I still spend stupid amounts of time on craft, like <Emoji>✏️</Emoji>
              {NO_BREAK_SPACE}
              <Link href="/playground/imperfecto">my own typeface</Link> and hand-drawn illustrations, because craft,
              taste, and human creativity will always matter.
            </>,
            <>
              P.S. Music is life. Here are some of my <Emoji>🎧</Emoji>
              {NO_BREAK_SPACE}
              <Link href={MUSIC_HREF}>favorite albums of all time</Link>.
            </>,
          ]}
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
      <Section heading="Experience" width="wide">
        <VerticalStack as="ul" gap="none" width="wide">
          {EXPERIENCE.map((role) => (
            // “Freelance” appears twice, so the key is the company and the dates
            <li key={`${role.company} ${role.dates}`}>
              <ExperienceItem
                company={role.company}
                title={role.title}
                dates={role.dates}
                description={role.description}
                headingLevel={3}
              />
            </li>
          ))}
        </VerticalStack>
      </Section>
    </>
  );
}
