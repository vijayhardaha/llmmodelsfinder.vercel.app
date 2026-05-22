import type { JSX } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

/**
 * Props for ResultsSummaryBar component.
 *
 * @interface ResultsSummaryBarProps
 * @property {number} startDisplay - Starting result index.
 * @property {number} endDisplay - Ending result index.
 * @property {number} totalCount - Total result count.
 * @property {number} perPage - Results per page.
 * @property {(value: number) => void} onPerPageChange - Callback for per-page change.
 */
interface ResultsSummaryBarProps {
  startDisplay: number;
  endDisplay: number;
  totalCount: number;
  perPage: number;
  onPerPageChange: (value: number) => void;
}

/**
 * Top summary bar with result count and page size selector.
 *
 * @param {ResultsSummaryBarProps} props - Component props.
 *
 * @returns {JSX.Element} Summary bar.
 */
export function ResultsSummaryBar({
  startDisplay,
  endDisplay,
  totalCount,
  perPage,
  onPerPageChange,
}: ResultsSummaryBarProps): JSX.Element {
  return (
    <div className="bg-surface-alt text-text-muted border-b-2 border-black px-4 py-2 text-xs font-semibold md:text-sm">
      <div className="flex items-center justify-between">
        <div>
          Showing <span className="font-mono font-bold text-black">{startDisplay}</span>-
          <span className="font-mono font-bold text-black">{endDisplay}</span> of{' '}
          <span className="font-mono font-bold text-black">{totalCount}</span> models
        </div>
        <div className="w-32">
          <Select value={String(perPage)} onValueChange={(value) => onPerPageChange(parseInt(value, 10))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="35">35</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="75">75</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
