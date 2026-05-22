import type { JSX } from 'react';

import { EMPTY_VALUE, NO_TEXT, YES_TEXT } from '@/components/table/constants/table';

/**
 * Props for BooleanBadgeCell component.
 *
 * @interface BooleanBadgeCellProps
 * @property {boolean | null | undefined} value - Boolean value to render.
 */
interface BooleanBadgeCellProps {
  value: boolean | null | undefined;
}

/**
 * Renders a boolean value as a badge.
 *
 * @param {BooleanBadgeCellProps} props - Component props.
 * @param {boolean | null | undefined} props.value - Boolean value to render.
 *
 * @returns {JSX.Element} Rendered boolean badge cell.
 */
export function BooleanBadgeCell({ value }: BooleanBadgeCellProps): JSX.Element {
  if (value === null || value === undefined) return <span>{EMPTY_VALUE}</span>;

  return (
    <span
      className={`inline-block w-10 border px-2 py-1 text-center text-xs font-bold uppercase ${
        value ? 'border-black bg-black text-white' : 'border-black bg-white text-black'
      }`}
    >
      {value ? YES_TEXT : NO_TEXT}
    </span>
  );
}
