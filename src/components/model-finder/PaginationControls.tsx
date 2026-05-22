import type { JSX } from 'react';

import { Button } from '@/components/ui/Button';
import { getVisiblePages } from '@/utils';

/**
 * Props for PaginationControls component.
 *
 * @interface PaginationControlsProps
 * @property {number} currentPage - Current page number.
 * @property {number} totalPages - Total pages.
 * @property {number} startDisplay - Starting result index.
 * @property {number} endDisplay - Ending result index.
 * @property {number} totalCount - Total result count.
 * @property {(page: number) => void} onPageChange - Callback for page change.
 */
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  startDisplay: number;
  endDisplay: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

/**
 * Bottom sticky pagination controls.
 *
 * @param {PaginationControlsProps} props - Component props.
 *
 * @returns {JSX.Element} Pagination controls.
 */
export function PaginationControls({
  currentPage,
  totalPages,
  startDisplay,
  endDisplay,
  totalCount,
  onPageChange,
}: PaginationControlsProps): JSX.Element {
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex flex-col gap-3 bg-black px-4 py-2 text-white md:flex-row md:items-center md:justify-between md:gap-4">
      <div className="text-xs font-semibold md:text-sm">
        Showing <span className="text-primary">{startDisplay}</span>-<span className="text-primary">{endDisplay}</span>{' '}
        of <span className="text-primary">{totalCount}</span> models
      </div>

      <div className="flex flex-wrap items-center gap-1 md:gap-2">
        <Button variant="white" size="sm" onClick={() => onPageChange(1)} disabled={isFirstPage}>
          First
        </Button>

        <Button
          variant="white"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={isFirstPage}
        >
          Prev
        </Button>

        <div className="flex items-center gap-1 md:gap-2">
          {visiblePages.map((pageItem, index) => {
            if (pageItem === 'ellipsis') {
              return (
                <span key={`ellipsis-${index}`} className="px-2 text-xs font-bold text-white/70">
                  ...
                </span>
              );
            }

            return (
              <button
                key={pageItem}
                onClick={() => onPageChange(pageItem)}
                className={`flex h-8 min-w-8 shrink-0 cursor-pointer items-center justify-center border-2 px-1 text-xs font-bold tracking-wider uppercase transition-all ${
                  currentPage === pageItem
                    ? 'border-primary bg-primary text-black'
                    : 'hover:border-primary hover:bg-primary border-white bg-black text-white hover:text-black'
                }`}
              >
                {pageItem}
              </button>
            );
          })}
        </div>

        <Button
          variant="white"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={isLastPage}
        >
          Next
        </Button>

        <Button variant="white" size="sm" onClick={() => onPageChange(totalPages)} disabled={isLastPage}>
          Last
        </Button>
      </div>
    </div>
  );
}
