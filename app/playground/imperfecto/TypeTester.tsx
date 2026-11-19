import { useId, useLayoutEffect, useRef, useState } from 'react';
import { Heading } from 'verity-design-system';
import utilities from '../../utilities.module.css';
import styles from './TypeTester.module.css';

// What the field starts with, and its limit
const START_TEXT = 'Hand-drawn, imperfect, and all mine.';
const MAX_LENGTH = 80;

// The size slider's range and starting point, in px
const MIN_SIZE = 24;
const MAX_SIZE = 200;
const START_SIZE = 96;

// Imperfecto's type tester, on a subtle surface: its heading, “Try it” (a
// level 2 heading in the page's outline), then a size slider above a large
// text field set in Imperfecto Bold. People type their own text to see it.
//
// The typed text stays in the visitor's browser. It's only ever the
// textarea's value, so React treats it as plain text and never renders it as
// HTML. It isn't saved anywhere (not in storage, not in the URL), and it's
// gone when the page closes.
//
// The field is a textarea with no box of its own: the text sits right on the
// surface, wraps onto as many lines as it needs (long words break rather than
// scroll sideways), and the field grows to fit it. Its label, “Text to
// preview,” is for screen readers only.
//
// While the field isn't focused, a blinking cursor sits at the end of its
// text, so people can see it's a place to type. The browser only draws a real
// cursor in a focused field, and focusing it when the page loads would skip
// screen reader users past the intro and open the keyboard on phones. So the
// cursor is drawn: a copy of the text, laid out exactly like the field's but
// invisible, with the cursor after it, on top of the field. It's hidden from
// screen readers and lets clicks through to the field, and once the field has
// focus, it hides and the real cursor takes over. With reduce motion, it holds
// still instead of blinking. The count under it is quiet; screen
// readers hear about it only once the limit is reached. The slider's value
// shows beside it and is read as “96 px”.
export function TypeTester() {
  const [text, setText] = useState(START_TEXT);
  const [size, setSize] = useState(START_SIZE);
  const fieldRef = useRef<HTMLTextAreaElement>(null);
  const textId = useId();
  const sizeId = useId();
  const atLimit = text.length >= MAX_LENGTH;

  // Grow (or shrink) the field to fit its text, whenever the text or the size
  // changes, or the window's width does
  useLayoutEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    const fit = () => {
      field.style.height = 'auto';
      field.style.height = `${field.scrollHeight}px`;
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [text, size]);

  return (
    <div className={styles.tester}>
      <Heading level={2}>Try it</Heading>
      <div className={styles.size}>
        <label htmlFor={sizeId} className={styles.label}>
          Size
        </label>
        <input
          id={sizeId}
          className={styles.slider}
          type="range"
          min={MIN_SIZE}
          max={MAX_SIZE}
          step={1}
          value={size}
          aria-valuetext={`${size} px`}
          onChange={(event) => setSize(Number(event.target.value))}
        />
        {/* Shown, not read: the slider's own value says it */}
        <span className={styles.value} aria-hidden="true">
          {size} px
        </span>
      </div>
      <label htmlFor={textId} className={utilities.visuallyHidden}>
        Text to preview
      </label>
      <div className={styles.fieldArea}>
        <textarea
          ref={fieldRef}
          id={textId}
          className={styles.field}
          // The size from the slider; the line height follows it (in the CSS)
          style={{ fontSize: `${size}px` }}
          value={text}
          maxLength={MAX_LENGTH}
          rows={1}
          spellCheck={false}
          autoComplete="off"
          onChange={(event) => setText(event.target.value)}
        />
        {/* The drawn cursor, at the end of a hidden copy of the text */}
        <div className={styles.idleCursor} style={{ fontSize: `${size}px` }} aria-hidden="true">
          <span className={styles.hiddenText}>{text}</span>
          <span className={styles.cursor} />
        </div>
      </div>
      <p className={styles.count} aria-hidden="true">
        {text.length} / {MAX_LENGTH}
      </p>
      {/* Said politely, once, when the text reaches the limit */}
      <p className={utilities.visuallyHidden} aria-live="polite">
        {atLimit ? `Limit reached: ${MAX_LENGTH} characters` : ''}
      </p>
    </div>
  );
}
