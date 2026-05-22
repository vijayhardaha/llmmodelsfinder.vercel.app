import type { JSX } from 'react';

import { EMPTY_VALUE } from '@/components/table/constants/table';
import { formatCost } from '@/utils';

/**
 * Props for CostCell component.
 *
 * @interface CostCellProps
 * @property {number} value - Cost value.
 */
interface CostCellProps {
  value: number;
}

/**
 * Renders cost value in formatted currency.
 *
 * @param {CostCellProps} props - Component props.
 * @param {number} props.value - Cost value.
 *
 * @returns {JSX.Element} Rendered cost cell.
 */
export function CostCell({ value }: CostCellProps): JSX.Element {
  if (value === null || value === undefined) return <span>{EMPTY_VALUE}</span>;
  return <span className="font-mono font-bold text-black">{formatCost(value)}</span>;
}

/**
 * Props for CostHeader component.
 *
 * @interface CostHeaderProps
 * @property {string} title - Header title.
 */
interface CostHeaderProps {
  title: string;
}

/**
 * Renders table header for cost columns.
 *
 * @param {CostHeaderProps} props - Component props.
 * @param {string} props.title - Header title.
 *
 * @returns {JSX.Element} Cost header.
 */
export function CostHeader({ title }: CostHeaderProps): JSX.Element {
  return (
    <div>
      <div>{title}</div>
      <div className="text-xs font-normal text-white/70">per 1M tokens</div>
    </div>
  );
}
