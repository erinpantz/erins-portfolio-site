import { useState, type KeyboardEvent } from 'react';
import { TextBlock, VerticalStack } from 'verity-design-system';
import type { Character, CharacterGroup } from './characters.server';
import styles from './CharacterSet.module.css';

// Imperfecto's character set: one group per kind of character, each a level 3
// heading (a TextBlock) over a grid of square cells with one character in
// each. The groups come from the font file (characters.server.ts).
//
// On hover or keyboard focus, a cell shows its character larger, with its code
// point (“U+00E9”) small underneath.
//
// Each group is a list, and one stop on the Tab key, not one per character:
// Tab moves into a group (at the character last looked at there), the arrow
// keys move between its characters (Home and End to the first and last), and
// Tab again moves on to the next group. Nothing holds on to focus. Screen
// readers can also read each list in browse mode, and every cell is named by
// its character and its code point (“é, U+00E9”).
export function CharacterSet({ groups }: { groups: CharacterGroup[] }) {
  return (
    <VerticalStack width="wide" gap="xl">
      {groups.map((group) => (
        <TextBlock key={group.heading} heading={group.heading} headingLevel={3}>
          <CharacterGrid characters={group.characters} />
        </TextBlock>
      ))}
    </VerticalStack>
  );
}

const NEXT_KEYS = ['ArrowRight', 'ArrowDown'];
const PREVIOUS_KEYS = ['ArrowLeft', 'ArrowUp'];

function CharacterGrid({ characters }: { characters: Character[] }) {
  // The cell that's in the Tab order: the first, until someone moves
  const [current, setCurrent] = useState(0);

  const move = (event: KeyboardEvent<HTMLUListElement>) => {
    const last = characters.length - 1;
    let next = current;
    if (NEXT_KEYS.includes(event.key)) next = Math.min(current + 1, last);
    else if (PREVIOUS_KEYS.includes(event.key)) next = Math.max(current - 1, 0);
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    else return;
    event.preventDefault();
    setCurrent(next);
    event.currentTarget.querySelectorAll<HTMLElement>('li')[next]?.focus();
  };

  return (
    // role="list" keeps it a list for VoiceOver, which drops list styling's
    // meaning when the bullets are hidden
    <ul role="list" className={styles.grid} onKeyDown={move}>
      {characters.map((item, index) => (
        <li
          key={item.codePoint}
          className={styles.cell}
          tabIndex={index === current ? 0 : -1}
          // Its name when focused: the character and its code point, since a
          // screen reader may skip a lone punctuation mark
          aria-label={`${item.character}, ${item.codePoint}`}
          onFocus={() => setCurrent(index)}
        >
          <span className={styles.character}>{item.character}</span>
          <span className={styles.codePoint}>{item.codePoint}</span>
        </li>
      ))}
    </ul>
  );
}
