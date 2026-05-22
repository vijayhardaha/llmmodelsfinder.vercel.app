'use client';

import type { JSX } from 'react';

/**
 * Props for BulletList component.
 *
 * @interface BulletListProps
 * @property {string[]} items - Array of list item strings to render.
 * @property {string} [className] - Additional CSS classes for the list element.
 */
interface BulletListProps {
  items: string[];
  className?: string;
}

/**
 * A reusable unordered list component that renders items with bullet prefixes.
 * Styled with the project's neo-brutalist grid layout.
 *
 * @param {BulletListProps} props - Component props.
 * @param {string[]} props.items - Items to render as list entries.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} A styled unordered list.
 */
export function BulletList({ items, className = '' }: BulletListProps): JSX.Element {
  return (
    <ul className={`text-text-muted mt-2 grid grid-cols-2 gap-1 text-sm ${className}`}>
      {items.map((item) => (
        <li key={item}>• {item}</li>
      ))}
    </ul>
  );
}
