import { useEffect, useRef, useState, type RefObject } from 'react';
import { Link as RouterLink } from 'react-router';
import { Button, NavIcon } from 'verity-design-system';
import styles from './IntroCard.module.css';
import { NAV_HREFS, RESUME_HREF } from './site';

// How often the idle Profile icon tips the other way, and how long it stays
// tipped. Verity has no tokens for times this long, so they're named here.
const IDLE_TIP_EVERY_MS = 4000;
const IDLE_TIP_HOLD_MS = 900;

// The Portfolio's intro, as the first item in its Grid, on a subtle card that
// reads like the ProjectCards beside it: a picture at the top, words at the
// bottom. The picture is the Profile nav icon, the same one visitors see in
// the nav, and a link to Profile (named “Profile”; the icon itself is
// decorative). It says “this is me” without another heading between the
// page's h1 and the cards' h2s. At rest it's in NavIcon's hover pose (tipped
// right); now and then it tips left (hover-mirrored) and back, and on hover or
// keyboard focus it tips left and stays there. NavIcon animates each switch.
// Then the paragraph in body/xl and a button to her résumé. It's the site's
// own markup because Verity's TextBlock only sets its text in body/default.
// Its styles are in IntroCard.module.css, using only Verity's CSS variables.
export function IntroCard() {
  const linkRef = useRef<HTMLAnchorElement>(null);
  // Hovered with a mouse or pen, or focused from the keyboard
  const [engaged, setEngaged] = useState(false);
  const idleTipped = useIdleTip(linkRef, !engaged);
  return (
    <div className={styles.introCard}>
      {/* Through React Router's Link, like the nav's links (SiteLink in
          root.tsx), so following it changes the page in the app */}
      <RouterLink
        ref={linkRef}
        to={NAV_HREFS.profile}
        prefetch="intent"
        aria-label="Profile"
        className={styles.icon}
        onPointerEnter={(event) => event.pointerType !== 'touch' && setEngaged(true)}
        onPointerLeave={() => setEngaged(document.activeElement === linkRef.current && isFocusVisible(linkRef))}
        onFocus={() => isFocusVisible(linkRef) && setEngaged(true)}
        onBlur={() => setEngaged(false)}
      >
        <NavIcon page="profile" pose={engaged || idleTipped ? 'hover-mirrored' : 'hover'} fill />
      </RouterLink>
      <div className={styles.text}>
        <p className={styles.body}>
          I’m a product and visual designer with 20+ years of experience. For the past 11 years, I’ve led design at
          healthcare startups, most recently bringing AI into the tools care teams use every day.
        </p>
        {/* The same address as the footer's Résumé link, in the same tab */}
        <Button href={RESUME_HREF} startIcon="resume">
          Résumé
        </Button>
      </div>
    </div>
  );
}

function isFocusVisible(ref: RefObject<HTMLElement | null>) {
  return !!ref.current?.matches(':focus-visible');
}

// Whether the icon is in its idle tip right now: every IDLE_TIP_EVERY_MS it
// tips for IDLE_TIP_HOLD_MS. It only runs while `running` (not hovered or
// focused), the element is on screen, the tab is visible, and reduce motion
// is off; when any of those changes, it stops at rest and starts its timing
// again from the beginning. Everything is cleaned up when the page changes.
function useIdleTip(ref: RefObject<HTMLElement | null>, running: boolean) {
  const [tipped, setTipped] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  // On screen
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  // The browser tab is showing
  useEffect(() => {
    const update = () => setTabVisible(document.visibilityState === 'visible');
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  // Reduce motion, kept up to date if it changes
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // The timing
  const active = running && onScreen && tabVisible && !reduceMotion;
  useEffect(() => {
    setTipped(false);
    if (!active) return;
    let timer: ReturnType<typeof setTimeout>;
    const rest = () => {
      timer = setTimeout(tip, IDLE_TIP_EVERY_MS);
    };
    const tip = () => {
      setTipped(true);
      timer = setTimeout(() => {
        setTipped(false);
        rest();
      }, IDLE_TIP_HOLD_MS);
    };
    rest();
    return () => clearTimeout(timer);
  }, [active]);

  return active && tipped;
}
